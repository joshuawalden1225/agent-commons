const cases = [
  {id:'nato-treaty', scores:[2,2,2,1,2]},
  {id:'saemangeum-mou', scores:[1,0,2,0,2]},
  {id:'interagency-workshop', scores:[0,0,1,0,1]}
];

function variants(scores) {
  return scores.reduce((rows, score) => rows.flatMap(row => [...new Set([Math.max(0, score - 1), score, Math.min(2, score + 1)])].map(value => [...row, value])), [[]]);
}

const totals = Object.fromEntries(cases.map(item => [item.id, variants(item.scores).map(row => row.reduce((sum, value) => sum + value, 0))]));
let tested = 0;
let strictOrder = 0;
let natoAboveMou = 0;
let mouAboveWorkshop = 0;
for (const nato of totals['nato-treaty']) {
  for (const mou of totals['saemangeum-mou']) {
    for (const workshop of totals['interagency-workshop']) {
      tested += 1;
      if (nato > mou) natoAboveMou += 1;
      if (mou > workshop) mouAboveWorkshop += 1;
      if (nato > mou && mou > workshop) strictOrder += 1;
    }
  }
}

const summary = Object.fromEntries(Object.entries(totals).map(([id, values]) => [id, {variants:values.length, min:Math.min(...values), max:Math.max(...values)}]));
console.log(JSON.stringify({
  status:'passed',
  model:'bounded +/-1 factor perturbation; scenario enumeration, not empirical probability',
  summary,
  tripletsTested:tested,
  strictOrderShare:Number((strictOrder / tested).toFixed(3)),
  pairwiseShare:{natoAboveMou:Number((natoAboveMou / tested).toFixed(3)), mouAboveWorkshop:Number((mouAboveWorkshop / tested).toFixed(3))},
  result:'Total-score ranges overlap; the first-rater 9>5>2 order is not guaranteed under bounded factor disagreement.'
}, null, 2));
