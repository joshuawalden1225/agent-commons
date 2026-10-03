import fs from 'node:fs';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
// Transcribed from BTS Financial/Freight and Performance/Revenue ton-miles rows.
// Directory labels are not original release dates; both pages display 2012-11-21.
const revenues=[33083,33533,34110,35413,39131,44457,50315,52932,59409];
const volumes=[1465960,1495472,1507011,1551438,1662598,1696425,1771897,1770545,1777236];
const old=JSON.parse(fs.readFileSync(path.join(root,'research/2026-09-15/sigma.json'))).railRows;
export function calculate(){
 const rows=revenues.map((v,i)=>({year:2000+i,freightRevenueMillionUSD:v,tonMilesMillion:volumes[i],capitalStock:null,presentIn2009Directory:i<7,presentIn2010Directory:true}));
 assert.equal(new Set(rows.map(r=>r.year)).size,9);assert.ok(rows.every(r=>r.freightRevenueMillionUSD>0&&r.tonMilesMillion>0));
 const reconciliation=rows.map(r=>({year:r.year,revenueDifference:r.freightRevenueMillionUSD-old.find(o=>o.year===r.year).freightRevenueMillionUSD,tonMilesDifference:r.tonMilesMillion-old.find(o=>o.year===r.year).tonMilesMillion}));
 const folds=rows.slice(2).map((r,j)=>{let i=j+2,naive=rows[i-1].freightRevenueMillionUSD,trend=2*naive-rows[i-2].freightRevenueMillionUSD;return {year:r.year,inputThrough:r.year-1,actual:r.freightRevenueMillionUSD,naive,trend,naiveAPE:100*Math.abs(naive-r.freightRevenueMillionUSD)/r.freightRevenueMillionUSD,trendAPE:100*Math.abs(trend-r.freightRevenueMillionUSD)/r.freightRevenueMillionUSD};});
 const summarize=xs=>({n:xs.length,naiveMAPE:xs.reduce((s,r)=>s+r.naiveAPE,0)/xs.length,trendMAPE:xs.reduce((s,r)=>s+r.trendAPE,0)/xs.length});
 return {date:'2026-10-03',executor:'Codex / root',executionId:'daily-20261003-root',reviewStatus:'awaiting_review',grain:'US Class I freight rail, calendar-year observations; excludes Amtrak/non-Class I',units:{freightRevenueMillionUSD:'nominal million USD',tonMilesMillion:'million revenue ton-miles',capitalStock:'not available in selected measures; null'},sourceUrls:[2009,2010].map(y=>`https://www.bts.gov/archive/publications/national_transportation_statistics/${y}/table_rail_profile`),sourceDisplayedDate:'2012-11-21',originalReleaseDate:null,eventRange:'2000-2008',rows,reconciliation,folds,summaries:{directory2009:summarize(folds.filter(r=>r.year<=2006)),directory2010:summarize(folds)},missing2009Outcome:true,quality:{duplicateYears:0,missingSelectedRevenue:0,missingSelectedVolume:0,capitalMissing:9,overlappingRevenueDifferences:reconciliation.filter(r=>r.revenueDifference!==0).length,overlappingVolumeDifferences:reconciliation.filter(r=>r.tonMilesDifference!==0).length},revisionCounterexample:{measure:'Miles of road owned',unit:'miles',rows:[{year:2005,directory2009:95830,directory2010:95664,delta:-166},{year:2006,directory2009:94614,directory2010:94801,delta:187}],note:'2010 marks both values R. Agreement of freight revenue does not imply absence of revisions elsewhere.'},limitation:'Historical replication, not real-time backtesting: original availability is unknown. Missing 2009 in both selected tables cannot be zero-filled or used to score the crisis year. No causal claim, capital stock or inflation correction.'};
}
const result=calculate();
if(process.argv.includes('--write')){const p=path.join(root,'research/2026-10-03/sigma-vintages.json');if(fs.existsSync(p))throw Error('Do not overwrite an archived output');fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,JSON.stringify(result,null,2)+'\n');}
console.log(JSON.stringify(result.summaries));
