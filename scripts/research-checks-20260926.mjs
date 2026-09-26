import fs from 'node:fs';import {execFileSync} from 'node:child_process';import assert from 'node:assert/strict';
const write=(name,obj)=>fs.writeFileSync(`research/2026-09-26/${name}.json`,JSON.stringify(obj,null,2)+'\n');
const prior=JSON.parse(execFileSync(process.execPath,['scripts/rail-hindsight-2026-09-23.mjs'],{encoding:'utf8'}));
const summarize=rows=>({n:rows.length,naiveMAPE:rows.reduce((s,r)=>s+r.naiveAPE,0)/rows.length,trendMAPE:rows.reduce((s,r)=>s+r.trendAPE,0)/rows.length});
const all=summarize(prior.rows),pre=summarize(prior.rows.filter(r=>r.year<2009));
const drops=prior.rows.map(r=>({omittedYear:r.year,...summarize(prior.rows.filter(x=>x.year!==r.year))}));
assert.equal(all.n,8);assert.equal(pre.n,7);assert(drops.every(x=>x.n===7));
write('sigma-sensitivity',{date:'2026-09-26',executor:'Codex / root',executionId:'daily-20260926-root',reviewStatus:'awaiting_review',source:'https://www.bts.gov/archive/publications/national_transportation_statistics/table_rail_profile',sourcePublicationDate:null,sourceVintage:'2012 archived vintage, reused from 2026-09-15 transcription; not a fresh source retrieval',eventRange:'2000-2009',units:'nominal million USD; percentage errors',rows:prior.rows,all,without2009:pre,leaveOneYearOut:drops,conclusion:`Trend has lower mean APE in ${drops.filter(x=>x.trendMAPE<x.naiveMAPE).length}/8 leave-one-out summaries; 2009 is a counterexample with worse trend APE.`,limitation:'Leave-one-year-out here changes the evaluation set only, not the fitted forecasts. No causal inference, independent validation, real-time vintage, capital stock or inflation correction. Small dependent annual sample.',next:'Acquire unrevised contemporaneous series before claiming real-time forecasting performance.'});
const forecast=JSON.parse(fs.readFileSync('research/2026-09-25/cynosure-forecasts.json'));
const classify=(s)=>s.explicitMilestone&&s.official&&s.onTime?'yes':!s.afterDeadline||!s.completeCoverage?'unresolved':'no';
const scenarios=[
 {id:'future-plan',explicitMilestone:false,official:true,onTime:true,afterDeadline:false,completeCoverage:true,expected:'unresolved'},
 {id:'official-issued-on-time',explicitMilestone:true,official:true,onTime:true,afterDeadline:true,completeCoverage:true,expected:'yes'},
 {id:'archive-outage',explicitMilestone:false,official:true,onTime:false,afterDeadline:true,completeCoverage:false,expected:'unresolved'},
 {id:'complete-no-milestone',explicitMilestone:false,official:true,onTime:false,afterDeadline:true,completeCoverage:true,expected:'no'},
 {id:'late-report-only',explicitMilestone:true,official:true,onTime:false,afterDeadline:true,completeCoverage:true,expected:'no'},
 {id:'unofficial-claim-incomplete-search',explicitMilestone:true,official:false,onTime:true,afterDeadline:true,completeCoverage:false,expected:'unresolved'}
];
for(const s of scenarios)assert.equal(classify(s),s.expected);
const scores=forecast.cards.map(c=>({id:c.id,probability:c.probability,ifYes:(c.probability-1)**2,ifNo:c.probability**2,ifUnresolved:null}));
assert(Math.abs(scores[0].ifYes-0.1225)<1e-12);assert(Math.abs(scores[1].ifNo-0.3025)<1e-12);
write('cynosure-resolution-tests',{date:'2026-09-26',executor:'Codex / root',executionId:'daily-20260926-root',reviewStatus:'awaiting_review',kind:'synthetic resolution rehearsal, NOT actual settlement',source:'research/2026-09-25/cynosure-forecasts.json',rows:scenarios.map(s=>({...s,actual:classify(s)})),conditionalBrierScores:scores,actualOutcomes:forecast.cards.map(c=>({id:c.id,outcome:null,brier:null})),limitation:'Six hand-constructed scenarios verify explicit boolean rules only. Automatic language recognition and archive completeness are not implemented or validated. Original probabilities remain immutable.',next:'Inspect actual dated official evidence on 2026-11-01 and 2027-01-01; preserve unresolved when evidence is incomplete.'});
console.log(JSON.stringify({sigma:{all,pre,trendWins:drops.filter(x=>x.trendMAPE<x.naiveMAPE).length},cynosure:{syntheticCases:6,actualResolved:0}},null,2));
