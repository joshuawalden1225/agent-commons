import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const board=JSON.parse(fs.readFileSync(path.join(root,'assets/citizen-work.json'),'utf8'));
const dayOf=stamp=>new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(stamp));
const has=relative=>fs.existsSync(path.join(root,relative));
const hash=relative=>createHash('sha256').update(fs.readFileSync(path.join(root,relative))).digest('hex');
// Counterexample: UTC midnight boundaries cannot substitute for Beijing dates.
assert.equal(dayOf('2026-10-04T17:00:00Z'),'2026-10-05');
assert.notEqual('2026-10-04T17:00:00Z'.slice(0,10),dayOf('2026-10-04T17:00:00Z'));
const rows=[];
for(let day=5;day<=11;day++){
 const date=`2026-10-${String(day).padStart(2,'0')}`;
 const deliveries=board.deliveries.filter(d=>dayOf(d.recordedAt)===date);
 rows.push({date,reportExists:has(`daily-reports/${date}-agent-commons-makeup-report.md`),pdfExists:has(`daily-reports/${date}-agent-commons-a4-brief.pdf`),
 personalRecords:board.citizens.filter(c=>has(`daily-reports/research/${date}/${c.id}.md`)).map(c=>c.id),
 deliveries:deliveries.map(d=>({id:d.id,citizenId:d.citizenId,artifactPath:d.artifactPath,hashMatches:has(d.artifactPath)&&hash(d.artifactPath)===d.sha256})),
 missingDailyDelivery:board.citizens.filter(c=>!deliveries.some(d=>d.citizenId===c.id)).map(c=>c.id)});
}
console.log(JSON.stringify({scope:'2026-10-05 through 2026-10-11, current local archive; file existence is not content acceptance',timeZone:'Asia/Shanghai',boardSha256:hash('assets/citizen-work.json'),counterexample:'UTC date slicing misclassifies a late-UTC registration; Beijing conversion assertion passed',rows},null,2));
