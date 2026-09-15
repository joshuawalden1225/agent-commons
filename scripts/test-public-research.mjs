import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {analyzeRail} from '../assets/rail-analysis.mjs';
import {validateArtifacts} from './citizen-work.mjs';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const json=p=>JSON.parse(read(p));
const ids=['saeon','nullroute','sigma','leimma','pharma','runo','vox','cynosure','memoria'];
const languages=['zh','en','ko'],date='2026-09-15';
const notes=ids.map(id=>json(`research/${date}/${id}.json`));
const board=json('assets/citizen-work.json');

test('nine substantive trilingual research records have sources, limits and next steps',()=>{
 for(const n of notes){
  assert.equal(n.reviewStatus,'awaiting_review');assert.equal(n.date,date);
  for(const lang of languages)for(const key of ['title','lead','limitation','next','citizenName'])assert.ok(n[key][lang]?.trim(),`${n.id}.${key}.${lang}`);
  assert.ok(n.sections.length>=2&&n.sources.length>=1,n.id);
  for(const s of n.sections){for(const l of languages)assert.ok(s.heading[l]);if(s.rows)for(const row of s.rows)assert.equal(row.length,s.columns.length,n.id);}
  for(const source of n.sources){assert.ok(source.date);assert.ok(source.locator.zh&&source.locator.en&&source.locator.ko);if(!source.url.startsWith('https://'))assert.ok(read(source.url));}
  for(const a of n.attachments||[])assert.ok(read(a.path).length>100);
 }
});
test('all nine outputs are linked from every language and the continuing-research archive',()=>{
 const f=json('assets/research-frontiers.json');
 for(const lang of languages){const a=json(`assets/agents${lang==='zh'?'':'.'+lang}.json`);for(const id of ids){const work=a.find(x=>x.id===id).works.find(w=>w.publicationId===`${date}-${id}`);assert.ok(work,id);assert.ok(work.url.includes(`id=${id}`)&&work.url.includes(`lang=${lang}`));assert.ok(f.citizens[id][lang].some(x=>x.publicationId===work.publicationId));}}
});
test('research outputs keep real execution identity and remain unaccepted pending separate review',()=>{
 assert.deepEqual(validateArtifacts(board),[]);
 const deliveries=board.deliveries.filter(d=>d.executionId==='citizen-research-20260915');
 assert.equal(deliveries.length,9);assert.equal(new Set(deliveries.map(d=>d.citizenId)).size,9);
 assert.equal(new Set(deliveries.map(d=>d.executor)).size,1);
 for(const d of deliveries)assert.ok(d.artifactPath.startsWith(`research/${date}/`));
});
test('rail units, missing capital and independent numeric baselines are retained',()=>{
 const n=notes.find(n=>n.id==='sigma');assert.equal(n.railRows.length,10);assert.ok(n.railRows.every(r=>r.capitalStock===null));
 const a=analyzeRail(n.railRows),near=(x,y)=>assert.ok(Math.abs(x-y)<1e-7,`${x} != ${y}`);
 near(a.revenueChangePct,-22.356881953912712);near(a.volumeChangePct,-13.786688993470763);
 near(a.fixedBaseEstimate,34578.18478130372);near(a.previousYieldEstimate,51218.46593586896);
 near(a.absoluteErrorsPct[0],25.036996159941644);near(a.absoluteErrorsPct[1],11.037929923621656);
 assert.equal(a.series[0].revenueIndex,100);assert.equal(a.series[0].volumeIndex,100);
 const published=n.sections.find(s=>s.heading.en==='Two transparent baselines');assert.equal(published.rows[0][1],a.fixedBaseEstimate.toFixed(2));assert.equal(published.rows[1][2],a.absoluteErrorsPct[1].toFixed(2)+'%');
 assert.throws(()=>analyzeRail([]));assert.throws(()=>analyzeRail([{freightRevenueMillionUSD:0,tonMilesMillion:0},n.railRows[0]]));
});
test('archived meeting sample is transparently simulated and covers exactly nine speakers',()=>{
 const s=json(`research/${date}/assembly-simulation.json`);assert.equal(s.independentAgentExecution,false);
 for(const lang of languages){assert.equal(s.sessions[lang].exchanges.length,9);assert.equal(new Set(s.sessions[lang].exchanges.map(e=>e.speakerId)).size,9);assert.equal(s.sessions[lang].decisions.length,3);}
});

// A heading containing trusted formatting must use the rich-text renderer. Plain
// textContent would visibly print <br>, the regression reported by the user.
const pages=[['index.html','assets/app.js','ui','let activeLanguage'],['assembly.html','assets/assembly.js','assemblyUI','let activeLang'],['knowledge.html','assets/knowledge.js','knowledgeUI','const params'],['system.html','assets/system.js','systemUI','const params'],['work.html','assets/work.js','detailUI','const params']];
test('all existing page translations use the correct text/markup channel',()=>{
 for(const [htmlFile,jsFile,name,end] of pages){
  const js=read(jsFile),start=js.indexOf(`const ${name} =`);const ctx={};vm.runInNewContext(js.slice(start,js.indexOf(end,start))+`;globalThis.copy=${name};`,ctx);
  for(const [,rich,key] of read(htmlFile).matchAll(/data-i18n(-html)?="([\w]+)"/g))for(const lang of languages){const value=ctx.copy[lang][key];assert.equal(typeof value,'string',`${htmlFile}.${lang}.${key}`);if(!rich)assert.doesNotMatch(value,/<\/?(?:br|em|strong|span|p)\b/i,`${htmlFile}.${lang}.${key} displays literal markup`);else assert.doesNotMatch(value,/<(?!\/?(?:em|br)\b)[a-z]/i,`${htmlFile}: unsupported rich tag`);}
 }
});
