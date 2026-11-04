import fs from 'node:fs';
import {createHash} from 'node:crypto';
const b=JSON.parse(fs.readFileSync('assets/citizen-work.json'));
const dates=['2026-10-26','2026-10-27','2026-10-28','2026-10-29','2026-10-30','2026-10-31','2026-11-01'];
const rows=dates.map(date=>({date,recorded:b.deliveries.filter(d=>d.recordedAt.slice(0,10)===date).map(d=>({citizen:d.citizenId,id:d.id,path:d.artifactPath})),reports:fs.readdirSync('daily-reports').filter(n=>n.startsWith(date)&&n.endsWith('.md'))}));
const hashes=b.deliveries.map(d=>({id:d.id,ok:fs.existsSync(d.artifactPath)&&createHash('sha256').update(fs.readFileSync(d.artifactPath)).digest('hex')===d.sha256}));
const result={checkedAt:new Date().toISOString(),executionId:'daily-20261103-root',executor:'Codex / root',scope:'UTC recordedAt day, not Beijing work date; reports counted by filename, not semantic completion',rows,hashes,failures:hashes.filter(h=>!h.ok),independentAcceptances:b.deliveries.filter(d=>d.review?.decision==='accept').length};
fs.writeFileSync('research/2026-11-03/memoria-audit.json',JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({rows,checked:hashes.length,failures:result.failures,independentAcceptances:result.independentAcceptances}));
