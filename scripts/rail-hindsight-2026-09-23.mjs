// Reproduce from the immutable September 15 transcription, not a historical data vintage.
import assert from 'node:assert/strict';
const revenue=[33083,33533,34110,35413,39131,44457,50315,52932,59409,46127];
const rows=revenue.slice(2).map((actual,j)=>{const i=j+2; const naive=revenue[i-1],trend=2*revenue[i-1]-revenue[i-2];return {year:2000+i,inputThrough:1999+i,actual,naive,trend,naiveAPE:100*Math.abs(naive-actual)/actual,trendAPE:100*Math.abs(trend-actual)/actual};});
assert.equal(rows.length,8); assert(rows.every(r=>r.inputThrough<r.year));
assert.equal(rows.at(-1).naive,59409); assert.equal(rows.at(-1).trend,65886);
const mean=k=>rows.reduce((s,r)=>s+r[k],0)/rows.length;
const oracle=1532214*59409/1777236;
console.log(JSON.stringify({units:'nominal million USD; APE percent',source:'research/2026-09-15/sigma.json',rows,naiveMAPE:mean('naiveAPE'),trendMAPE:mean('trendAPE'),conditional2009:{estimate:oracle,APE:100*Math.abs(oracle-46127)/46127,usesFutureVolume:true},limitation:'2012 archived vintage; not a real-time backtest. No capital stock or inflation adjustment.'},null,2));
