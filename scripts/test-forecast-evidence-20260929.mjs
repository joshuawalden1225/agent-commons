import test from 'node:test';import assert from 'node:assert/strict';
import {classifyEvidence} from '../experiments/forecast-evidence-gate-2026-09-29.mjs';
const card={board:'SDA-news',projectId:'Hyundai-Saemangeum-AIDC',milestone:'review-result',deadline:'2026-10-31T23:59:00+09:00'};
const item={officialBoard:'SDA-news',projectId:card.projectId,milestone:card.milestone,completed:true,attachmentRead:true,publishedAt:'2026-10-30T10:00:00+09:00'};
export const cases=[
 ['same-project-result',{},'2026-11-01T00:00:00+09:00',true,'yes'],
 ['wrong-project',{projectId:'different-AIDC'},'2026-11-01T00:00:00+09:00',true,'no'],
 ['wrong-milestone',{milestone:'application'},'2026-11-01T00:00:00+09:00',true,'no'],
 ['headline-only',{attachmentRead:false},'2026-10-30T12:00:00+09:00',false,'unresolved'],
 ['future-record',{},'2026-09-29T17:00:00+08:00',true,'unresolved'],
 ['ambiguous-time',{publishedAt:'2026-10-31 23:30'},'2026-11-01T00:00:00+09:00',true,'unresolved'],
 ['late-by-korean-cutoff',{publishedAt:'2026-10-31T23:30:00+08:00'},'2026-11-02T00:00:00+09:00',true,'no'],
 ['archive-incomplete',{completed:false},'2026-11-01T00:00:00+09:00',false,'unresolved'],
 ['plan-not-result',{completed:false},'2026-10-30T12:00:00+09:00',true,'unresolved']
];
for(const [id,patch,now,completeCoverage,expected] of cases)test('forecast evidence gate: '+id,()=>assert.equal(classifyEvidence(card,{items:[{...item,...patch}],completeCoverage},now),expected));
test('older boolean rule misses project identity',()=>{const legacy=s=>s.explicitMilestone&&s.official&&s.onTime?'yes':'unresolved';assert.equal(legacy({explicitMilestone:true,official:true,onTime:true,projectId:'different-AIDC'}),'yes');assert.equal(classifyEvidence(card,{items:[{...item,projectId:'different-AIDC'}],completeCoverage:false},'2026-11-01T00:00:00+09:00'),'unresolved');});
