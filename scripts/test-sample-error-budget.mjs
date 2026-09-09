const ROWS = 96;
const baseline = Array.from({length: ROWS}, (_, index) => ({
  index,
  mw: 100 + 20 * Math.sin((2 * Math.PI * index) / ROWS) + 8 * Math.sin((4 * Math.PI * index) / ROWS)
}));

const mean = rows => rows.reduce((sum, row) => sum + row.mw, 0) / rows.length;
const trueMean = mean(baseline);

function deterministicSpread(count) {
  const selected = [];
  let cursor = 7;
  while (selected.length < count) {
    if (!selected.includes(cursor)) selected.push(cursor);
    cursor = (cursor + 19) % ROWS;
  }
  return selected;
}

function peakTargeted(count) {
  return [...baseline]
    .sort((a, b) => b.mw - a.mw)
    .slice(0, count)
    .map(row => row.index);
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
  return {
    label,
    missingRows: missing.length,
    missingRatePct: Number(((missing.length / ROWS) * 100).toFixed(2)),
    tier: classify(missing.length),
    observedMeanMw: Number(observedMean.toFixed(3)),
    biasPct: Number((((observedMean - trueMean) / trueMean) * 100).toFixed(3))
  };
}

const counts = [1, 5, 10];
const scenarios = counts.flatMap(count => [
  evaluate(`spread-${count}`, deterministicSpread(count)),
  evaluate(`peak-targeted-${count}`, peakTargeted(count))
]);

const grouped = counts.map(count => {
  const pair = scenarios.filter(item => item.missingRows === count);
  return {
    missingRows: count,
    tier: pair[0].tier,
    biasSpreadPct: pair[0].biasPct,
    biasPeakTargetedPct: pair[1].biasPct,
    absoluteBiasGapPctPoints: Number(Math.abs(pair[0].biasPct - pair[1].biasPct).toFixed(3))
  };
});

const sameTierDifferentBias = grouped.every(item => item.absoluteBiasGapPctPoints > 0);
if (!sameTierDifferentBias) {
  console.error(JSON.stringify({status: 'failed', reason: 'mechanism did not change bias', trueMean, scenarios}, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  status: 'passed',
  experiment: 'Synthetic missingness-mechanism stress test',
  rows: ROWS,
  trueMeanMw: Number(trueMean.toFixed(3)),
  result: 'Missing-rate tier alone does not identify bias; missingness mechanism must be recorded.',
  grouped,
  scenarios
}, null, 2));
