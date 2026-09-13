const gates = [
  ['C0', 'isTransaction'],
  ['C1', 'identifier'],
  ['C2', 'specification'],
  ['C3', 'deliveryOrAcceptanceDate'],
  ['C4', 'responsibilityOrDefaultTerm']
];

const cases = [
  {id:'agency-anniversary', kind:'observed', isTransaction:false, identifier:null, specification:null, deliveryOrAcceptanceDate:null, responsibilityOrDefaultTerm:null},
  {id:'investment-delegation', kind:'observed', isTransaction:false, identifier:null, specification:null, deliveryOrAcceptanceDate:null, responsibilityOrDefaultTerm:null},
  {id:'hyundai-investment-plan', kind:'observed', isTransaction:true, identifier:null, specification:'investment themes and indicative amount', deliveryOrAcceptanceDate:'planned milestones only', responsibilityOrDefaultTerm:null},
  {id:'lease-inspection-plan', kind:'observed', isTransaction:false, identifier:null, specification:'17 firms', deliveryOrAcceptanceDate:'2026-09-14 inspection start', responsibilityOrDefaultTerm:null},
  {id:'fixture-complete-contract', kind:'synthetic_fixture', isTransaction:true, identifier:'FIXTURE-001', specification:'10 MW test capacity', deliveryOrAcceptanceDate:'2027-06-30', responsibilityOrDefaultTerm:'fixture acceptance and default clause'},
  {id:'fixture-missing-acceptance-date', kind:'synthetic_fixture', isTransaction:true, identifier:'FIXTURE-002', specification:'10 MW test capacity', deliveryOrAcceptanceDate:null, responsibilityOrDefaultTerm:'fixture default clause'}
];

function evaluate(item) {
  const failed = gates.filter(([, field]) => !item[field]).map(([code]) => code);
  return {...item, passed:failed.length === 0, failed};
}

const results = cases.map(evaluate);
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
