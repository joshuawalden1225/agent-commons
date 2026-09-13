const cases = [
  ['zh', '2373', {actor:'新万金开发厅', object:'媒体清单条目', stage:'清单新增两条机构治理稿', eventDate:'2026-09-11', source:'官方媒体清单', boundary:'不构成产业投资或执行升级'}],
  ['en', '2373', {actor:'Saemangeum agency', object:'media-register items', stage:'two institutional-governance items added', eventDate:'2026-09-11', source:'official media register', boundary:'not an industrial investment or execution upgrade'}],
  ['ko', '2373', {actor:'새만금개발청', object:'보도 목록 항목', stage:'기관 운영 자료 2건 추가', eventDate:'2026-09-11', source:'공식 보도 목록', boundary:'산업 투자·집행 단계 상승 아님'}],
  ['zh', '203', {actor:'新万金开发厅', object:'法定公告清单', stage:'无新增', eventDate:'2026-09-13', source:'官方公告清单', boundary:'没有新执行文件'}],
  ['en', '203', {actor:'Saemangeum agency', object:'statutory register', stage:'no addition', eventDate:'2026-09-13', source:'official notice register', boundary:'no new execution instrument'}],
  ['ko', '203', {actor:'새만금개발청', object:'고시공고 목록', stage:'추가 없음', eventDate:'2026-09-13', source:'공식 고시공고', boundary:'새 집행 문서 없음'}],
  ['zh', '17', {actor:'新万金开发厅', object:'长租企业', stage:'计划检查', eventDate:'2026-09-14', source:'2026-09-10官方稿', boundary:'尚无企业级结果'}],
  ['en', '17', {actor:'Saemangeum agency', object:'long-term tenants', stage:'inspection planned', eventDate:'2026-09-14', source:'official 2026-09-10 release', boundary:'no firm-level result yet'}],
  ['ko', '17', {actor:'새만금개발청', object:'장기임대 기업', stage:'점검 예정', eventDate:'2026-09-14', source:'2026-09-10 공식 자료', boundary:'기업별 결과 없음'}],
  ['zh', '2027-03', {actor:'现代汽车集团与新万金开发厅', object:'AI数据中心', stage:'计划开工', eventDate:'2027-03', source:'2026-08-21官方实施时间表', boundary:'截至2026-09-13尚未开工'}],
  ['en', '2027-03', {actor:'Hyundai Motor Group and the Saemangeum agency', object:'AI data centre', stage:'groundbreaking planned', eventDate:'2027-03', source:'official implementation timeline dated 2026-08-21', boundary:'not yet under construction as of 2026-09-13'}],
  ['ko', '2027-03', {actor:'현대차그룹과 새만금개발청', object:'AI 데이터센터', stage:'착공 예정', eventDate:'2027-03', source:'2026-08-21 공식 이행 일정', boundary:'2026-09-13 현재 미착공'}]
];

const required = ['actor', 'object', 'stage', 'eventDate', 'source', 'boundary'];
const failures = cases.flatMap(([language, metric, fields]) => required
  .filter(field => !fields[field] || !String(fields[field]).trim())
  .map(field => ({language, metric, field})));
const passed = failures.length === 0 && new Set(cases.map(([language, metric]) => `${language}:${metric}`)).size === cases.length;
console.log(JSON.stringify({status: passed ? 'passed' : 'failed', records: cases.length, languages: 3, metrics: 4, required, failures, limitation:'Structural completeness does not establish native-language equivalence or reader comprehension.'}, null, 2));
if (!passed) process.exit(1);
