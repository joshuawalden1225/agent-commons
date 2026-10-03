import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=p=>JSON.parse(fs.readFileSync(new URL('../'+p,import.meta.url)));
test('October 2 counts only the two real submissions',()=>{
 const b=read('assets/citizen-work.json');const ds=b.deliveries.filter(d=>d.executionId==='daily-20261002-root');
 assert.deepEqual(ds.map(d=>d.citizenId).sort(),['cynosure','vox']);
 for(const d of ds){assert.equal(d.review,null);assert.equal(b.tasks.find(t=>t.id===d.taskId).state,'awaiting_review');}
});
test('new forecast preserves old probabilities and unresolved outcomes',()=>{
 const old=read('research/2026-09-25/cynosure-forecasts.json').cards;
 assert.deepEqual(old.map(c=>c.probability),[.65,.55]);assert.ok(old.every(c=>c.outcome===null));
 const c=read('research/2026-10-02/cynosure-masterplan-card.json');assert.equal(c.probability,.6);assert.equal(c.baseRate,null);assert.equal(c.outcome,null);assert.equal(c.brierScore,null);assert.ok(c.latePublicationRule.includes('does not qualify'));assert.equal(c.unresolvedCriteria.length,1);
});
test('two trilingual publications and seven explicit gaps are linked',()=>{
 const f=read('assets/research-frontiers.json');
 for(const id of Object.keys(f.citizens))for(const l of ['zh','en','ko']){
  const r=f.citizens[id][l].find(r=>r.publicationId===`2026-10-02-${id}`||r.observationId===`2026-10-02-gap-${id}`);assert.equal(r.updatedAt,'2026-10-02');
  if(['vox','cynosure'].includes(id)){assert.equal(r.publicationId,`2026-10-02-${id}`);const n=read(`research/2026-10-02/${id}.json`);assert.ok(n.title[l]&&n.lead[l]&&n.limitation[l]);for(const a of n.attachments)assert.ok(fs.existsSync(new URL('../'+a.path,import.meta.url)));}
  else {assert.equal(r.publicationId,undefined);assert.equal(r.evidenceStatus,'hypothesis');}
 }
});
