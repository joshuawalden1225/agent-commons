import fs from 'node:fs';

const manifestPath = new URL('../assets/provenance.json', import.meta.url);
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

function validate(input) {
  const errors = [];
  const required = ['claim', 'location', 'evidence', 'status', 'reviewer', 'nextReview'];
  if (!input || !input.records || typeof input.records !== 'object') return ['records'];

  for (const [id, record] of Object.entries(input.records)) {
    for (const field of required) {
      if (record[field] === undefined || record[field] === null || record[field] === '') errors.push(`${id}.${field}`);
    }
    for (const language of ['zh', 'en', 'ko']) {
      if (!record.claim?.[language]) errors.push(`${id}.claim.${language}`);
    }
    if (!Array.isArray(record.evidence) || !record.evidence.length) errors.push(`${id}.evidence`);
  }

  const rehearsal = input.withdrawalRehearsal;
  if (rehearsal) {
    for (const field of ['recordId', 'status', 'withdrawnAt', 'reason', 'supersededBy']) {
      if (rehearsal[field] === undefined || rehearsal[field] === null || rehearsal[field] === '') errors.push(`withdrawalRehearsal.${field}`);
    }
    if (rehearsal.publicClaim !== false) errors.push('withdrawalRehearsal.publicClaim');
    if (rehearsal.supersededBy && !input.records[rehearsal.supersededBy]) errors.push('withdrawalRehearsal.supersededBy');
  }
  return [...new Set(errors)];
}

const clone = value => JSON.parse(JSON.stringify(value));
const fixtures = [
  {
    id: 'missing-evidence',
    expected: 'AC-PUB-ASSEMBLY-01.evidence',
    mutate(copy) { copy.records['AC-PUB-ASSEMBLY-01'].evidence = []; }
  },
  {
    id: 'withdrawal-marked-public',
    expected: 'withdrawalRehearsal.publicClaim',
    mutate(copy) { copy.withdrawalRehearsal.publicClaim = true; }
  },
  {
    id: 'broken-superseded-by',
    expected: 'withdrawalRehearsal.supersededBy',
    mutate(copy) { copy.withdrawalRehearsal.supersededBy = 'AC-PUB-MISSING-01'; }
  }
];

const liveErrors = validate(manifest);
if (liveErrors.length) {
  console.error(JSON.stringify({live: 'failed', errors: liveErrors}, null, 2));
  process.exit(1);
}

const results = fixtures.map(fixture => {
  const copy = clone(manifest);
  fixture.mutate(copy);
  const errors = validate(copy);
  return {id: fixture.id, expected: fixture.expected, errors, passed: errors.includes(fixture.expected)};
});

if (results.some(result => !result.passed)) {
  console.error(JSON.stringify({live: 'passed', fixtures: results}, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({live: 'passed', records: Object.keys(manifest.records).length, fixtures: results}, null, 2));
