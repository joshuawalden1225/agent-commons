import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const d=JSON.parse(read('assets/energy-observatory.json'));
test('energy programme is additional and trilingual',()=>{
 assert.equal(d.ownerId,'saeon');assert.equal(d.reviewStatus,'awaiting_review');
 for(const l of ['zh','en','ko']){
  for(const k of ['title','subtitle','intro','mandate','reference','method','next'])assert.ok(d[k][l]);
  const a=JSON.parse(read(`assets/agents${l==='zh'?'':'.'+l}.json`));assert.equal(a.length,9);const owner=a.find(x=>x.id==='saeon');assert.equal(owner.order,'01');assert.ok(owner.works.some(w=>w.publicationId===d.programId&&w.url===`energy.html?lang=${l}`));
  const f=JSON.parse(read('assets/research-frontiers.json')).citizens.saeon[l];assert.ok(f.some(x=>x.programId===d.programId));assert.notEqual(f[0].programId,d.programId);
 }
});
test('observations and events have sources and translations',()=>{
 const ids=new Set(d.sources.map(s=>s.id));assert.equal(ids.size,d.sources.length);
 for(const s of d.sources){assert.match(s.url,/^https:\/\//);assert.match(s.checkedAt,/^\d{4}-\d{2}-\d{2}$/);assert.ok(['page_read','search_excerpt'].includes(s.access));}
 for(const [list,keys] of [[d.history,['title','text']],[d.frontiers,['title','fact','next']],[d.events,['note']]])for(const row of list){assert.ok(ids.has(row.source));for(const key of keys)for(const l of ['zh','en','ko'])assert.ok(row[key][l]);}
 for(const e of d.events){assert.ok(e.start<=e.end);assert.ok(['US','EU','JP','KR'].includes(e.region));assert.ok(Number.isFinite(Date.parse(e.start)));}
 for(const e of d.editions){const archive=JSON.parse(read(e.path));assert.equal(archive.updatedAt,e.date);}
 assert.ok(d.nextUpdate>d.updatedAt);assert.doesNotMatch(JSON.stringify(d),/\/Users\//);
});
