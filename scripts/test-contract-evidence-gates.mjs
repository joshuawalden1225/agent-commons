import fs from 'node:fs';
import assert from 'node:assert/strict';
const schema = JSON.parse(fs.readFileSync(new URL('../experiments/contract-sample-acquisition-schema.json', import.meta.url)));
const gates = schema.gates.map(g=>[g.id,g.field]);
assert.deepEqual(gates, [['C0','contractIdentifier'],['C1','parties'],['C2','specification'],['C3','deliveryOrAcceptanceDate'],['C4','responsibilityOrDefaultTerms']]);

const cases = [
  {id:'agency-anniversary', kind:'observed', isTransaction:false, identifier:null, specification:null, deliveryOrAcceptanceDate:null, responsibilityOrDefaultTerm:null},
  {id:'investment-delegation', kind:'observed', isTransaction:false, identifier:null, specification:null, deliveryOrAcceptanceDate:null, responsibilityOrDefaultTerm:null},
  {id:'hyundai-investment-plan', kind:'observed', isTransaction:true, identifier:null, specification:'investment themes and indicative amount', deliveryOrAcceptanceDate:'planned milestones only', responsibilityOrDefaultTerm:null},
  {id:'lease-inspection-plan', kind:'observed', isTransaction:false, identifier:null, specification:'17 firms', deliveryOrAcceptanceDate:'2026-09-14 inspection start', responsibilityOrDefaultTerm:null},
  {id:'fixture-complete-contract', kind:'synthetic_fixture', isTransaction:true, identifier:'FIXTURE-001', specification:'10 MW test capacity', deliveryOrAcceptanceDate:'2027-06-30', responsibilityOrDefaultTerm:'fixture acceptance and default clause'},
  {id:'fixture-missing-acceptance-date', kind:'synthetic_fixture', isTransaction:true, identifier:'FIXTURE-002', specification:'10 MW test capacity', deliveryOrAcceptanceDate:null, responsibilityOrDefaultTerm:'fixture default clause'}
];

function evaluate(item) {
  const failed = gates.filter(([, field]) => !item[field] || (field === 'parties' && (!Array.isArray(item[field]) || item[field].length < 2))).map(([code]) => code);
  return {...item, passed:failed.length === 0, failed};
}

// Legacy observations are preserved above; adapt aliases explicitly, never fabricate parties.
const results = cases.map(item => evaluate({...item,contractIdentifier:item.identifier,
  parties:item.kind === 'synthetic_fixture' ? ['Fixture buyer','Fixture seller'] : null,
  deliveryOrAcceptanceDate:item.kind === 'synthetic_fixture' ? item.deliveryOrAcceptanceDate : null,
  responsibilityOrDefaultTerms:item.responsibilityOrDefaultTerm}));
const full=results.find(x=>x.id==='fixture-complete-contract');
for(const [code,field] of gates) assert.deepEqual(evaluate({...full,[field]:null}).failed,[code]);
assert.deepEqual(evaluate({...full,parties:['Only buyer']}).failed,['C1']);
const observed=JSON.parse(fs.readFileSync(new URL('../research/2026-09-26/nullroute-award.json',import.meta.url)));
assert.deepEqual(evaluate(observed).failed,['C3','C4']);
assert.equal(observed.contractConclusionDate,'2026-08-27');
assert.equal(observed.deliveryOrAcceptanceDate,null);
results.push(evaluate({...observed,kind:'observed'}));
const observedPositive = results.filter(item => item.kind === 'observed' && item.passed).length;
const fixturePositive = results.filter(item => item.kind === 'synthetic_fixture' && item.passed).length;
const passed = observedPositive === 0 && fixturePositive === 1 && results.find(item => item.id === 'fixture-missing-acceptance-date').failed.includes('C3');

console.log(JSON.stringify({
  status:passed ? 'passed' : 'failed',
  gateOrder:gates.map(([code, field]) => ({code, field})),
  cases:results,
  observedPositive,
  fixturePositive,
  conclusion:'The gate logic detects a complete synthetic fixture, but no observed document is a five-gate contract positive.',
  limitation:'A synthetic fixture validates rule behavior; it is not evidence that a real contract exists.'
}, null, 2));

if (!passed) process.exit(1);
