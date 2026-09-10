import fs from 'node:fs';
import crypto from 'node:crypto';

const manifestPath = new URL('../assets/provenance.json', import.meta.url);
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const frontiersPath = new URL('../assets/research-frontiers.json', import.meta.url);
const weeklyPath = new URL('../assets/weekly-learning.json', import.meta.url);
const linkBaselinePath = new URL('../assets/provenance-link-baseline.json', import.meta.url);

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

const baseResult = {live: 'passed', records: Object.keys(manifest.records).length, fixtures: results};

function collectPublicUrls() {
  const frontiers = JSON.parse(fs.readFileSync(frontiersPath, 'utf8'));
  const weekly = JSON.parse(fs.readFileSync(weeklyPath, 'utf8'));
  const values = [];
  for (const record of Object.values(manifest.records)) values.push(...record.evidence);
  for (const citizen of Object.values(frontiers.citizens)) {
    for (const locale of ['zh', 'en', 'ko']) {
      for (const item of citizen[locale] || []) values.push(...(item.sourceUrls || []));
    }
  }
  for (const entry of weekly.entries || []) values.push(entry.url);
  return [...new Set(values.filter(value => /^https?:\/\//.test(value)))].sort();
}

async function checkLink(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  const started = performance.now();
  try {
    const response = await fetch(url, {
      redirect: 'follow',
      signal: controller.signal,
      headers: {'user-agent': 'Agent-Commons-Provenance-Audit/1.0'}
    });
    const bytes = new Uint8Array(await response.arrayBuffer());
    return {
      url,
      ok: response.ok,
      status: response.status,
      finalUrl: response.url,
      redirected: response.url !== url,
      contentType: response.headers.get('content-type'),
      bytes: bytes.byteLength,
      sha256: crypto.createHash('sha256').update(bytes).digest('hex'),
      elapsedMs: Math.round(performance.now() - started)
    };
  } catch (error) {
    return {
      url,
      ok: false,
      status: null,
      finalUrl: null,
      redirected: false,
      error: error.name === 'AbortError' ? 'timeout' : error.message,
      elapsedMs: Math.round(performance.now() - started)
    };
  } finally {
    clearTimeout(timeout);
  }
}

function compareWithBaseline(links) {
  if (!fs.existsSync(linkBaselinePath)) {
    return {available: false, reason: 'no_persisted_baseline'};
  }
  const baseline = JSON.parse(fs.readFileSync(linkBaselinePath, 'utf8'));
  const previous = new Map((baseline.links || []).map(link => [link.url, link]));
  const current = new Map(links.map(link => [link.url, link]));
  const added = links.filter(link => !previous.has(link.url)).map(link => link.url);
  const removed = (baseline.links || []).filter(link => !current.has(link.url)).map(link => link.url);
  const changed = links.filter(link => {
    const before = previous.get(link.url);
    return before && (before.sha256 !== link.sha256 || before.finalUrl !== link.finalUrl || before.status !== link.status);
  }).map(link => ({
    url: link.url,
    statusChanged: previous.get(link.url).status !== link.status,
    finalUrlChanged: previous.get(link.url).finalUrl !== link.finalUrl,
    hashChanged: previous.get(link.url).sha256 !== link.sha256,
    disposition: 'manual_review'
  }));
  return {
    available: true,
    baselineGeneratedAt: baseline.generatedAt,
    added,
    removed,
    changed,
    unchanged: links.length - added.length - changed.length,
    rule: 'Hash or dynamic-page changes never auto-invalidate a claim; route them to the responsible citizen.'
  };
}

if (process.argv.includes('--online')) {
  const urls = collectPublicUrls();
  const links = [];
  for (const url of urls) links.push(await checkLink(url));
  const summary = {
    checked: links.length,
    reachable: links.filter(link => link.ok).length,
    redirected: links.filter(link => link.redirected).length,
    failed: links.filter(link => !link.ok).length
  };
  console.log(JSON.stringify({...baseResult, linkAudit: {
    summary,
    claimValidity: 'not_assessed',
    contentStored: false,
    baselineComparison: compareWithBaseline(links),
    links
  }}, null, 2));
  if (summary.failed) process.exitCode = 2;
} else {
  console.log(JSON.stringify(baseResult, null, 2));
}
