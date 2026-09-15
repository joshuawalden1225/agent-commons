import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { validateWork, planWork, localize } from '../assets/research-model.mjs';

const root = path.resolve(import.meta.dirname, '..');
const filename = path.join(root, 'assets/citizen-work.json');
const digest = text => createHash('sha256').update(text).digest('hex');
export function safeArtifactPath(relative, workspace = root) {
  if (typeof relative !== 'string' || !/^(research|experiments)\/[a-zA-Z0-9_./-]+\.(md|json|html|csv|svg)$/.test(relative) || relative.split('/').includes('..')) throw Error('Use a public research/ or experiments/ artifact path');
  const actual = fs.realpathSync(path.join(workspace, relative));
  if (!actual.startsWith(fs.realpathSync(workspace) + path.sep)) throw Error('Artifact escapes the workspace');
  return actual;
}

export function recordDelivery(board, input, workspace = root, now = new Date().toISOString()) {
  const task = board.tasks.find(t => t.id === input.taskId);
  if (!task) throw Error('Unknown task');
  if (!['analysis','dataset','reproduction','artwork','translation'].includes(input.kind)) throw Error('Template-only work does not count as a research delivery');
  if (!input.executionId || !input.executor || !input.findings?.length || !input.sourceUrls?.length) throw Error('Delivery requires an execution, findings, and sources');
  if (input.findings.some(f => !f.observation?.trim() || !f.evidenceLocator?.trim())) throw Error('Every finding needs an observation and evidence locator');
  for (const key of ['summary','limitation']) if (['zh','en','ko'].some(l => !input[key]?.[l]?.trim())) throw Error(`Missing localized ${key}`);
  const source = fs.readFileSync(safeArtifactPath(input.artifactPath, workspace));
  if (source.toString('utf8').trim().length < 160) throw Error('Artifact contains too little material to review');
  if (input.kind === 'dataset') {
    if (!input.artifactPath.endsWith('.json')) throw Error('Dataset submissions use JSON rows for validation');
    const data = JSON.parse(source);
    const rows = Array.isArray(data) ? data : data.rows;
    if (!rows?.length || rows.every(row => Object.values(row).every(v => v == null || v === ''))) throw Error('An empty dataset does not count as research');
  }
  const sha256 = digest(source);
  const prior = board.deliveries.find(d => d.sha256 === sha256);
  if (prior) {
    if (prior.taskId === task.id && prior.executionId === input.executionId) return {duplicate:true, delivery:prior};
    throw Error('This artifact was already counted; cite it as reuse instead of new delivery');
  }
  if (!['ready','active'].includes(task.state)) throw Error('Task is not ready for delivery; finish the pending review first');
  if (task.dependsOn.some(id => board.tasks.find(t => t.id === id)?.state !== 'done')) throw Error('Task prerequisites are not complete');
  const delivery = {id:`${task.id}-${sha256.slice(0,12)}`,taskId:task.id,citizenId:task.ownerId,kind:input.kind,
    artifactPath:input.artifactPath,sha256,executionId:input.executionId,executor:input.executor,recordedAt:now,
    summary:input.summary,limitation:input.limitation,findings:input.findings,sourceUrls:input.sourceUrls,review:null};
  board.deliveries.push(delivery); task.state = 'awaiting_review';
  board.events.push({id:`delivery-${delivery.id}`,type:'artifact_recorded',taskId:task.id,citizenId:task.ownerId,deliveryId:delivery.id,date:now});
  board.updatedAt = now.slice(0,10);
  return {duplicate:false,delivery};
}

export function recordReview(board, input, workspace = root, now = new Date().toISOString()) {
  const delivery = board.deliveries.find(d => d.id === input.deliveryId);
  const task = delivery && board.tasks.find(t => t.id === delivery.taskId);
  if (!task || task.state !== 'awaiting_review' || delivery.review) throw Error('No pending delivery to review');
  if (input.reviewerId !== task.reviewerId || !input.executionId || input.executionId === delivery.executionId || !input.executor || input.executor === delivery.executor) throw Error('A separately executed review is required; role renaming is insufficient');
  if (!['accept','revise'].includes(input.decision)) throw Error('Review decision must be accept or revise');
  if (!Array.isArray(input.checks) || input.checks.length !== task.acceptance.length ||
    new Set(input.checks.map(c => c.criterionIndex)).size !== task.acceptance.length ||
    input.checks.some(c => !Number.isInteger(c.criterionIndex) || c.criterionIndex < 1 || c.criterionIndex > task.acceptance.length || !c.criterion?.trim() || !c.evidence?.trim() || typeof c.passed !== 'boolean')) throw Error('Review must address every numbered acceptance criterion exactly once with evidence');
  if (input.decision === 'accept' && input.checks.some(c => !c.passed)) throw Error('Failed checks require revision');
  const evidence = fs.readFileSync(safeArtifactPath(input.artifactPath, workspace));
  if (evidence.toString('utf8').trim().length < 160) throw Error('Review evidence is empty');
  delivery.review = {reviewerId:input.reviewerId,executionId:input.executionId,executor:input.executor,decision:input.decision,
    checks:input.checks,artifactPath:input.artifactPath,sha256:digest(evidence),recordedAt:now};
  task.state = input.decision === 'accept' ? 'done' : 'active';
  board.events.push({id:`review-${delivery.id}`,type:'review_recorded',taskId:task.id,deliveryId:delivery.id,date:now});
  board.updatedAt=now.slice(0,10);
}

export function validateArtifacts(board, workspace = root) {
  const errors = validateWork(board);
  for (const d of board.deliveries || []) for (const item of [d,d.review].filter(Boolean)) {
    try { if (digest(fs.readFileSync(safeArtifactPath(item.artifactPath, workspace))) !== item.sha256) errors.push(`Changed archived artifact: ${item.artifactPath}`); }
    catch (error) { errors.push(error.message); }
  }
  return errors;
}

function save(board) {
  const errors = validateArtifacts(board);
  if (errors.length) throw Error(errors.join('\n'));
  const temporary = `${filename}.tmp`;
  fs.writeFileSync(temporary, JSON.stringify(board,null,2)+'\n');
  fs.renameSync(temporary,filename);
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try {
    const [command='plan', argument] = process.argv.slice(2);
    const board = JSON.parse(fs.readFileSync(filename,'utf8'));
    const errors = validateArtifacts(board);
    if (errors.length) throw Error(errors.join('\n'));
    if (command === 'validate') console.log(JSON.stringify({status:'passed',citizens:board.citizens.length,tasks:board.tasks.length,deliveries:board.deliveries.length}));
    else if (command === 'plan') {
      const date=argument || new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Shanghai'}).format(new Date());
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw Error('Expected date YYYY-MM-DD');
      console.log(JSON.stringify({date,items:planWork(board,date).map(item => { const t=board.tasks.find(t=>t.id===item.taskId); return {...item,title:localize(t?.title),nextAction:localize(t?.nextAction),deliverable:localize(t?.deliverable),acceptance:t?.acceptance,sourceLeads:t?.sourceUrls}; })},null,2));
    } else if (command === 'record' || command === 'review') {
      if (!argument) throw Error('A submission JSON file is required');
      const input=JSON.parse(fs.readFileSync(argument,'utf8'));
      const result=command==='record'?recordDelivery(board,input):recordReview(board,input);
      if (!result?.duplicate) save(board);
      console.log(JSON.stringify({status:result?.duplicate?'already_recorded':'recorded',deliveryId:result?.delivery.id}));
    } else throw Error('Use plan [YYYY-MM-DD], validate, record <submission.json>, or review <review.json>');
  } catch(error) { console.error(error.message); process.exitCode=1; }
}
