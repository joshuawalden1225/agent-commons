import fs from 'node:fs';

const packet = JSON.parse(fs.readFileSync(new URL('../experiments/independent-review-packets.json', import.meta.url), 'utf8'));
const modules = ['translation','riskReview','multilingual','commitment'];
const moduleChecks = Object.fromEntries(modules.map(name => [name, Boolean(packet[name]?.owner && packet[name]?.responseFields?.length >= 8)]));
const translationCodes = packet.translation.items.map(item => item.code);
const riskSequence = packet.riskReview.sequence;
const checks = {
  fourModules:Object.values(moduleChecks).every(Boolean),
  translationABCD:translationCodes.join('') === 'ABCD',
  riskOrder:riskSequence.length === 15 && riskSequence.slice(-3).join(',') === 'R1,R2,R3',
  threeNativeLanguages:new Set(packet.multilingual.reviewerLanguages).size === 3,
  fourMetrics:packet.multilingual.metrics.length === 4,
  fiveCommitmentFactors:packet.commitment.factors.length === 5,
  blindRules:packet.commonRules.authorMayNotActAsReviewer && packet.commonRules.firstJudgmentMustBeLocked && packet.commitment.blindFromFirstRating,
  noInventedResponses:Array.isArray(packet.responses) && packet.responses.length === 0
};
const passed = Object.values(checks).every(Boolean);

console.log(JSON.stringify({
  status:passed ? 'passed' : 'failed',
  moduleChecks,
  checks,
  state:packet.status,
  conclusion:'Four review packets are structurally ready, while independent results remain explicitly absent.'
}, null, 2));

if (!passed) process.exit(1);
