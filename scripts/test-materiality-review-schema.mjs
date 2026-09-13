import fs from 'node:fs';

const schema = JSON.parse(fs.readFileSync(new URL('../experiments/materiality-review-schema.json', import.meta.url), 'utf8'));
const required = ['id','unit','candidateThresholds','decisionChanged','falsePositiveCost','falseNegativeCost','selectedThreshold','domainOwner','signoffDate'];
const ids = schema.options.map(item => item.id);
const missing = schema.options.flatMap(item => required.filter(field => !(field in item)).map(field => `${item.id}.${field}`));
const unansweredFields = ['decisionChanged','falsePositiveCost','falseNegativeCost','selectedThreshold','domainOwner','signoffDate'];
const fabricatedAnswers = schema.options.flatMap(item => unansweredFields.filter(field => item[field] !== null).map(field => `${item.id}.${field}`));
const passed = schema.blindBeforeRealData === true && schema.options.length === 3 && new Set(ids).size === 3 && missing.length === 0 && fabricatedAnswers.length === 0 && schema.stoppingConditions.length >= 4;

console.log(JSON.stringify({
  status:passed ? 'passed' : 'failed',
  options:ids,
  requiredFields:required,
  missing,
  fabricatedAnswers,
  stoppingConditions:schema.stoppingConditions.length,
  conclusion:'The preregistration form is structurally ready and intentionally contains no invented domain decision or threshold.'
}, null, 2));

if (!passed) process.exit(1);
