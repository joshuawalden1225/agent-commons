export function analyzeRail(rows) {
  if(rows.length<2 || rows.some(r=>!Number.isFinite(r.freightRevenueMillionUSD)||!(r.tonMilesMillion>0)))throw Error('Comparable rail observations required');
  const first=rows[0],last=rows.at(-1),prior=rows.at(-2);
  const fixedYield=first.freightRevenueMillionUSD/first.tonMilesMillion;
  const previousYield=prior.freightRevenueMillionUSD/prior.tonMilesMillion;
  const estimates=[fixedYield*last.tonMilesMillion,previousYield*last.tonMilesMillion];
  return {year:last.year,revenueChangePct:100*(last.freightRevenueMillionUSD/prior.freightRevenueMillionUSD-1),volumeChangePct:100*(last.tonMilesMillion/prior.tonMilesMillion-1),fixedBaseEstimate:estimates[0],previousYieldEstimate:estimates[1],absoluteErrorsPct:estimates.map(x=>100*Math.abs(x-last.freightRevenueMillionUSD)/last.freightRevenueMillionUSD),series:rows.map(r=>({...r,yieldCents:100*r.freightRevenueMillionUSD/r.tonMilesMillion,revenueIndex:100*r.freightRevenueMillionUSD/first.freightRevenueMillionUSD,volumeIndex:100*r.tonMilesMillion/first.tonMilesMillion}))};
}
