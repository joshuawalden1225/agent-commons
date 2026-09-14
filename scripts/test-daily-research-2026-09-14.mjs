import assert from 'node:assert/strict';
import fs from 'node:fs';

const load = path => JSON.parse(fs.readFileSync(path, 'utf8'));
const tri = load('experiments/saemangeum-tricheck-2026-09-14.json');
assert.equal(tri.checks.length, 3);
assert.equal(tri.tracks.length, 11);
assert.equal(tri.evidenceStatus, 'no_verified_change');

const contracts = load('experiments/contract-sample-acquisition-schema.json');
assert.deepEqual(contracts.gates.map(g => g.id), ['C0','C1','C2','C3','C4']);
assert.equal(contracts.observations.length, 0);

const materiality = load('experiments/materiality-decision-card.json');
assert.equal(materiality.candidates.length, 3);
assert.ok(materiality.candidates.every(c => c.ownerSignoff === null));

const codebook = load('experiments/stage-annotation-codebook.json');
assert.equal(codebook.stages.length, 6);
assert.equal(codebook.raters.length, 0);

const user = load('experiments/anonymous-user-result-schema.json');
assert.equal(user.liveResponses.length, 0);
assert.equal(user.syntheticFixture.synthetic, true);
assert.equal(user.privacy.collectName, false);

const glossary = load('experiments/trilingual-stage-glossary.json');
assert.equal(glossary.terms.length, 4);
assert.ok(glossary.terms.every(t => t.zh && t.en && t.ko && t.forbidden));

const disagreement = load('experiments/disagreement-preservation-schema.json');
assert.equal(disagreement.raters.length, 2);
assert.ok(disagreement.raters.every(r => r.rawScores === null));

const weekly = load('experiments/weekly-candidate-evaluation-2026-09-14.json');
assert.equal(weekly.candidates.length, 3);
assert.ok(weekly.candidates.every(c => c.status === 'expired_not_met'));

console.log('2026-09-14 daily research artifacts: PASS (8 schemas, unresolved evidence preserved)');
