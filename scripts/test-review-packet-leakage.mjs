import assert from 'node:assert/strict';
import fs from 'node:fs';

const packet = JSON.parse(fs.readFileSync('experiments/independent-review-packets.json', 'utf8'));
const serialized = JSON.stringify(packet).toLowerCase();
assert.ok(!serialized.includes('answerkey'));
assert.ok(!serialized.includes('firstscore'));
const responseArrays = [];
const visit = value => {
  if (Array.isArray(value)) return value.forEach(visit);
  if (!value || typeof value !== 'object') return;
  for (const [key, child] of Object.entries(value)) {
    if (/^(responses?|reviews?|annotations?)$/i.test(key) && Array.isArray(child)) responseArrays.push(child);
    visit(child);
  }
};
visit(packet);
assert.ok(responseArrays.every(a => a.length === 0));
console.log(`independent review leakage: PASS (${responseArrays.length} response arrays remain empty)`);
