const ROWS = 96;
const baseline = Array.from({length: ROWS}, (_, index) => ({
  index,
  mw: 100 + 20 * Math.sin((2 * Math.PI * index) / ROWS) + 8 * Math.sin((4 * Math.PI * index) / ROWS)
}));

const mean = rows => rows.reduce((sum, row) => sum + row.mw, 0) / rows.length;
const trueMean = mean(baseline);

function peakTargeted(count) {
  return [...baseline]
    .sort((a, b) => b.mw - a.mw)
    .slice(0, count)
    .map(row => row.index);
}

function contiguousBlock(count) {
  const start = 20;
  return Array.from({length: count}, (_, offset) => (start + offset) % ROWS);
}

function deterministicRandom(count) {
  const selected = [];
  let state = 20260910;
  while (selected.length < count) {
    state = (state * 1664525 + 1013904223) >>> 0;
    const index = state % ROWS;
    if (!selected.includes(index)) selected.push(index);
  }
  return selected;
}

function classify(count) {
  const missingRate = (count / ROWS) * 100;
  if (missingRate <= 2) return 'A';
  if (missingRate <= 10) return 'B';
  return 'C';
}

function evaluate(label, missing) {
  const observed = baseline.filter(row => !missing.includes(row.index));
  const observedMean = mean(observed);
  const ranked = [...baseline].sort((a, b) => a.mw - b.mw);
  const percentiles = missing.map(index => ranked.findIndex(row => row.index === index) / (ROWS - 1));
  const ordered = [...missing].sort((a, b) => a - b);
  let maxRun = ordered.length ? 1 : 0;
  let run = maxRun;
  for (let i = 1; i < ordered.length; i += 1) {
    run = ordered[i] === ordered[i - 1] + 1 ? run + 1 : 1;
    maxRun = Math.max(maxRun, run);
  }
  const averageLoadPercentile = percentiles.reduce((sum, value) => sum + value, 0) / percentiles.length;
  const mechanismAlert = averageLoadPercentile >= 0.8 || maxRun >= 8
    ? 'high'
    : averageLoadPercentile >= 0.65 || maxRun >= 4
      ? 'medium'
      : 'low';
  return {
    label,
    missingRows: missing.length,
    missingRatePct: Number(((missing.length / ROWS) * 100).toFixed(2)),
    tier: classify(missing.length),
    observedMeanMw: Number(observedMean.toFixed(3)),
    biasPct: Number((((observedMean - trueMean) / trueMean) * 100).toFixed(3)),
    maxGapRun: maxRun,
    averageLoadPercentile: Number(averageLoadPercentile.toFixed(3)),
    mechanismAlert
  };
}

const counts = [1, 5, 10];
const scenarios = counts.flatMap(count => [
  evaluate(`random-${count}`, deterministicRandom(count)),
  evaluate(`contiguous-${count}`, contiguousBlock(count)),
  evaluate(`load-related-${count}`, peakTargeted(count))
]);

const grouped = counts.map(count => {
  const group = scenarios.filter(item => item.missingRows === count);
  return {
    missingRows: count,
    tier: group[0].tier,
    biasByMechanismPct: Object.fromEntries(group.map(item => [item.label.split(`-${count}`)[0], item.biasPct])),
    biasRangePctPoints: Number((Math.max(...group.map(item => item.biasPct)) - Math.min(...group.map(item => item.biasPct))).toFixed(3)),
    alerts: Object.fromEntries(group.map(item => [item.label.split(`-${count}`)[0], item.mechanismAlert]))
  };
});

const sensitivityGrid = [
  {id: 'strict', loadPercentile: 0.9, gapRun: 8},
  {id: 'balanced', loadPercentile: 0.8, gapRun: 6},
  {id: 'sensitive', loadPercentile: 0.7, gapRun: 4}
].map(rule => {
  const predictions = scenarios.map(item => ({
    actual: Math.abs(item.biasPct) >= 1,
    predicted: item.averageLoadPercentile >= rule.loadPercentile || item.maxGapRun >= rule.gapRun
  }));
  const tp = predictions.filter(item => item.actual && item.predicted).length;
  const fp = predictions.filter(item => !item.actual && item.predicted).length;
  const tn = predictions.filter(item => !item.actual && !item.predicted).length;
  const fn = predictions.filter(item => item.actual && !item.predicted).length;
  return {
    ...rule,
    syntheticMaterialBiasDefinition: 'absolute bias >= 1%',
    confusion: {tp, fp, tn, fn},
    precision: Number((tp / Math.max(tp + fp, 1)).toFixed(3)),
    recall: Number((tp / Math.max(tp + fn, 1)).toFixed(3))
  };
});

const sameTierDifferentBias = grouped.every(item => item.biasRangePctPoints > 0);
if (!sameTierDifferentBias) {
  console.error(JSON.stringify({status: 'failed', reason: 'mechanism did not change bias', trueMean, scenarios}, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  status: 'passed',
  experiment: 'Synthetic missingness-mechanism stress test',
  rows: ROWS,
  trueMeanMw: Number(trueMean.toFixed(3)),
  alertRuleStatus: 'candidate_not_empirically_calibrated',
  result: 'Random, contiguous, and load-related gaps at the same rate produce different bias and alert states; mechanism features must accompany the missing-rate tier.',
  grouped,
  sensitivityGrid,
  scenarios
}, null, 2));
