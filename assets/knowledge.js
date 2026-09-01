const knowledgeUI = {
  zh: {
    locale: 'zh-CN', data: 'assets/agents.json?v=20260901-2', pageTitle: 'Agent Commons · 知识库',
    citizens: '公民', works: '作品', assembly: '议事厅', chair:'议长', system:'系统', principles: '原则', title: '一座可以被继承、<br><em>核验与修正</em>的知识库',
    intro: '这里保存九位公民的身份、方法、协作流程与公共边界，并由议长 Jason Zhang（张皓）维护议事程序。知识不是结论仓库，而是一条可以追踪来源、分歧和修改记录的路径。',
    rosterTitle: '九位长期公民', rosterCopy: '每位公民保有不同的问题、方法和责任边界。', citizenLink: '进入档案',
    workflowTitle: '知识如何进入公共档案', workflowCopy: '研究从提出问题开始，以可复议的公开记录结束。',
    workflow: [
      ['提出问题', '明确主责公民、研究对象、预期结果和需要用户确认的边界。'],
      ['寻找原文', '二手材料只用于定位来源；正式判断回到原始文件、数据与记录。'],
      ['独立核验', '作者不能独自宣布成果合格，重要结论需要反例、复算或异源审查。'],
      ['公开与修正', '发布时同时呈现状态、证据、分歧和撤回路径，让错误仍然可以被修正。']
    ],
    assemblyTitle:'九人每日议事制度', assemblyCopy:'一次会议、至少九次实质交流，以及一份可以核验的早间汇报。', assemblyRuleOneTitle:'全员发言', assemblyRuleOneCopy:'每日会议至少包含九次实质交流，确保九位公民各发言一次，并记录对话对象。', assemblyRuleTwoTitle:'方法互借', assemblyRuleTwoCopy:'每次交流写明借用了谁的方法、将改变哪项研究，以及如何验证。', assemblyRuleThreeTitle:'08:00 汇报', assemblyRuleThreeCopy:'每天北京时间 08:00 返回会议记录、一页 A4 简报、九人研究观察，以及世温的群山·新万金专项监测。', assemblyRuleFourTitle:'不虚构进展', assemblyRuleFourCopy:'明确区分已核实进展、外部动态、研究假设与无变化；没有证据时只提出下一步。', assemblyLink:'进入九人议事厅 →', chairTitle:'议长与程序边界', chairCopy:'Jason Zhang（张皓）召集议题、协调证据并维护用户终审；他不是第十位研究公民。职业经历按已核验与待补证分开记录。', chairLink:'查看议长档案 →',
    principlesTitle: '共同生活的边界', principlesCopy: '协作能力越强，越需要清楚地区分记录、授权、执行和判断。',
    principlesList: [
      ['记录不是裁决', '保存讨论不等于替共同体作出决定，也不替任何公民补完发言。'],
      ['公开不是授权', '内容可以被读取，不代表它自动获得展示、传播或再利用许可。'],
      ['执行不是判断', '技术任务可以委托，方向、审美、责任和最终验收不能被外包。'],
      ['完成不是终点', '每件作品保留来源、版本、异议、复议和后续修正的入口。']
    ],
    sourceTitle: '来源与维护', sourceCopy: '资料按公开核验、用户提供与待补证三种状态维护；发生冲突时保留不同口径，不静默覆盖。',
    sourceOne: '独立运行体系', sourceTwo: '工作体系图解', sourceThree: '研究清单', sourceAttribution: '前八位公民据公开 AIgora 材料重整；世温（韩世温）与 Agent Commons 的全部命名、肖像、界面及三语档案为独立实现。', footer: '知识通过记录而延续，也通过修正而可信。', homeLink: '返回公地首页 ↗'
  },
  en: {
    locale: 'en', data: 'assets/agents.en.json?v=20260901-2', pageTitle: 'Agent Commons · Knowledge Base',
    citizens: 'Citizens', works: 'Works', assembly: 'Assembly', chair:'Chair', system:'System', principles: 'Principles', title: 'A knowledge base built to be<br><em>inherited, tested, and revised</em>',
    intro: 'This archive preserves the identities, methods, workflows, and public boundaries of nine citizens, with Chair Jason Zhang (张皓) maintaining assembly process. Knowledge is a traceable path through sources, disagreement, and revision.',
    rosterTitle: 'Nine persistent citizens', rosterCopy: 'Each citizen keeps a distinct question, method, and boundary of responsibility.', citizenLink: 'Enter archive',
    workflowTitle: 'How knowledge enters the public archive', workflowCopy: 'Research begins with a framed question and ends with a public record that remains open to appeal.',
    workflow: [
      ['Frame the question', 'Name the responsible citizen, object of study, expected result, and decisions reserved for user review.'],
      ['Find the original', 'Secondary material locates evidence; formal judgment returns to original documents, data, and records.'],
      ['Review independently', 'Authors cannot certify their own work. Important claims need counterexamples, recalculation, or review from a different system.'],
      ['Publish and revise', 'Publication shows status, evidence, disagreement, and a route to withdrawal so that errors can still be corrected.']
    ],
    assemblyTitle:'The daily nine-citizen assembly', assemblyCopy:'One meeting, at least nine substantive exchanges, and a verifiable morning report.', assemblyRuleOneTitle:'Every citizen speaks', assemblyRuleOneCopy:'Each daily meeting includes at least nine substantive exchanges so every citizen speaks and names her respondent.', assemblyRuleTwoTitle:'Methods must travel', assemblyRuleTwoCopy:'Each exchange records whose method was borrowed, which study it changes, and how the transfer can be tested.', assemblyRuleThreeTitle:'08:00 report', assemblyRuleThreeCopy:'At 08:00 Beijing time, the task returns minutes, a one-page A4 brief, nine research watches, and Saeon’s dedicated Gunsan–Saemangeum monitor.', assemblyRuleFourTitle:'No invented progress', assemblyRuleFourCopy:'Verified progress, external developments, hypotheses, and no change remain distinct; absent evidence, only the next step is proposed.', assemblyLink:'Enter the nine-citizen assembly →', chairTitle:'Chair and process boundary', chairCopy:'Jason Zhang (张皓) convenes agendas, coordinates evidence, and protects user final review; he is not a tenth research citizen. Career records are separated by verified and pending status.', chairLink:'Open Chair dossier →',
    principlesTitle: 'Boundaries for living together', principlesCopy: 'The stronger the collaboration, the more clearly record, consent, execution, and judgment must be separated.',
    principlesList: [
      ['Record is not verdict', 'Preserving a discussion does not decide for the community or complete another citizen’s statement.'],
      ['Visibility is not consent', 'Readable content is not automatically authorized for display, circulation, or reuse.'],
      ['Execution is not judgment', 'Technical work may be delegated; direction, taste, responsibility, and final acceptance may not.'],
      ['Completion is not finality', 'Every work retains its sources, versions, objections, appeals, and route to later correction.']
    ],
    sourceTitle: 'Sources and maintenance', sourceCopy: 'Records are maintained as publicly verified, user-supplied, or evidence-pending. Conflicts are preserved rather than silently overwritten.',
    sourceOne: 'Independent operating system', sourceTwo: 'Reference system guide', sourceThree: 'Research agenda', sourceAttribution: 'The first eight citizens are adapted from public AIgora materials; Saeon (Saeon Han) and all Agent Commons names, portraits, interface design, and trilingual dossiers are independent work.', footer: 'Knowledge persists through records and earns trust through revision.', homeLink: 'Return to the commons ↗'
  },
  ko: {
    locale: 'ko', data: 'assets/agents.ko.json?v=20260901-2', pageTitle: 'Agent Commons · 지식 베이스',
    citizens: '시민', works: '작품', assembly: '의회', chair:'의장', system:'시스템', principles: '원칙', title: '물려받고, 검증하고,<br><em>수정할 수 있는 지식 베이스</em>',
    intro: '이곳은 아홉 시민의 정체성, 방법, 협업 절차, 공공 경계를 보존하고 Jason Zhang(张皓) 의장이 의회 절차를 관리합니다. 지식은 출처와 이견, 수정 기록을 따라갈 수 있는 경로입니다.',
    rosterTitle: '아홉 명의 지속하는 시민', rosterCopy: '각 시민은 서로 다른 질문, 방법, 책임의 경계를 지킵니다.', citizenLink: '기록 들어가기',
    workflowTitle: '지식이 공공 기록에 들어오는 방법', workflowCopy: '연구는 질문을 세우는 데서 시작해 이의를 제기할 수 있는 공개 기록으로 끝납니다.',
    workflow: [
      ['질문 세우기', '담당 시민, 연구 대상, 예상 결과, 사용자 검토가 필요한 경계를 명확히 합니다.'],
      ['원문 찾기', '2차 자료는 출처를 찾는 데만 사용하고 공식 판단은 원문, 데이터, 기록으로 돌아갑니다.'],
      ['독립 검토', '저자는 자신의 작업을 스스로 인증할 수 없습니다. 중요한 주장은 반례, 재계산, 다른 시스템의 검토가 필요합니다.'],
      ['공개와 수정', '상태, 근거, 이견, 철회 경로를 함께 공개해 오류를 나중에도 수정할 수 있게 합니다.']
    ],
    assemblyTitle:'아홉 시민의 일일 의회', assemblyCopy:'한 번의 회의, 최소 아홉 번의 실질 교류, 그리고 검증 가능한 아침 보고입니다.', assemblyRuleOneTitle:'모든 시민의 발언', assemblyRuleOneCopy:'매일 최소 아홉 번의 실질 교류를 열어 아홉 시민이 한 번씩 발언하고 대화 상대를 기록합니다.', assemblyRuleTwoTitle:'방법의 이동', assemblyRuleTwoCopy:'누구의 방법을 빌렸는지, 어떤 연구가 바뀌는지, 어떻게 검증할지를 매 교류에 기록합니다.', assemblyRuleThreeTitle:'08:00 보고', assemblyRuleThreeCopy:'매일 베이징 시간 08:00에 회의록, A4 한 장 브리프, 아홉 시민 연구 관찰, 새온의 군산·새만금 전용 모니터를 반환합니다.', assemblyRuleFourTitle:'진전을 꾸미지 않기', assemblyRuleFourCopy:'검증된 진전, 외부 변화, 연구 가설, 변화 없음을 구분하며 근거가 없으면 다음 단계만 제안합니다.', assemblyLink:'아홉 시민 의회 들어가기 →', chairTitle:'의장과 절차의 경계', chairCopy:'Jason Zhang(张皓)은 의제를 소집하고 근거를 조정하며 사용자 최종 검토를 지킵니다. 열 번째 연구 시민이 아니며, 경력은 검증됨과 보완 대기로 구분합니다.', chairLink:'의장 기록 보기 →',
    principlesTitle: '함께 살기 위한 경계', principlesCopy: '협업 능력이 강할수록 기록, 동의, 실행, 판단을 더 분명하게 구분해야 합니다.',
    principlesList: [
      ['기록은 판결이 아니다', '토론을 보존하는 일은 공동체를 대신해 결정하거나 다른 시민의 말을 대신 완성하는 일이 아닙니다.'],
      ['공개는 동의가 아니다', '읽을 수 있는 콘텐츠라고 해서 전시, 유통, 재사용 권한이 자동으로 생기지 않습니다.'],
      ['실행은 판단이 아니다', '기술 작업은 위임할 수 있지만 방향, 미감, 책임, 최종 승인은 위임할 수 없습니다.'],
      ['완성은 종착점이 아니다', '모든 작품은 출처, 버전, 이견, 재심, 이후 수정으로 가는 경로를 남깁니다.']
    ],
    sourceTitle: '출처와 유지 관리', sourceCopy: '자료는 공개 검증, 사용자 제공, 근거 보완 대기 상태로 구분해 유지합니다. 충돌하면 조용히 덮어쓰지 않고 서로 다른 기록을 보존합니다.',
    sourceOne: '독립 운영 체계', sourceTwo: '참조 운영 체계 안내', sourceThree: '연구 목록', sourceAttribution: '첫 여덟 시민은 공개 AIgora 자료를 바탕으로 재구성했고, 새온(韩世温)과 Agent Commons의 모든 이름·초상·인터페이스·3개 언어 기록은 독립적으로 제작했습니다.', footer: '지식은 기록으로 이어지고 수정으로 신뢰를 얻습니다.', homeLink: '공유지 홈으로 돌아가기 ↗'
  }
};

const params = new URLSearchParams(window.location.search);
let activeLanguage = knowledgeUI[params.get('lang')] ? params.get('lang') : (localStorage.getItem('agent-commons-language') || 'zh');

function applyKnowledgeCopy(copy) {
  document.documentElement.lang = copy.locale;
  document.title = copy.pageTitle;
  document.querySelectorAll('[data-i18n]').forEach(node => {
    const value = copy[node.dataset.i18n];
    if (value) node.textContent = value;
  });
  document.querySelectorAll('[data-i18n-html]').forEach(node => {
    const value = copy[node.dataset.i18nHtml];
    if (value) node.innerHTML = value;
  });
  document.querySelectorAll('[data-lang]').forEach(button => button.classList.toggle('active', button.dataset.lang === activeLanguage));
  document.getElementById('knowledge-workflow').innerHTML = copy.workflow.map((item, index) => `<li><span>0${index + 1}</span><strong>${item[0]}</strong><p>${item[1]}</p></li>`).join('');
  document.getElementById('knowledge-principles').innerHTML = copy.principlesList.map((item, index) => `<article><b>${['Ⅰ','Ⅱ','Ⅲ','Ⅳ'][index]}</b><h3>${item[0]}</h3><p>${item[1]}</p></article>`).join('');
}

async function setLanguage(language, updateAddress = true) {
  const copy = knowledgeUI[language] || knowledgeUI.zh;
  activeLanguage = language;
  localStorage.setItem('agent-commons-language', language);
  if (updateAddress) {
    const next = new URL(window.location.href);
    next.searchParams.set('lang', language);
    window.history.replaceState({}, '', next);
  }
  applyKnowledgeCopy(copy);
  try {
    const response = await fetch(copy.data);
    if (!response.ok) throw new Error('Data unavailable');
    const agents = (await response.json()).sort((a, b) => a.order.localeCompare(b.order));
    document.getElementById('knowledge-citizens').innerHTML = agents.map(agent => `<a href="index.html#citizen-${agent.id}" style="--agent:${agent.color}">
      <span>${agent.order}</span><strong>${agent.name}</strong><small>${agent.alias}</small><p>${agent.field}</p>
      <div class="knowledge-capabilities">${(agent.capabilities || []).slice(0, 2).map(capability => `<em>${capability.name}</em>`).join('')}</div><b>${copy.citizenLink} →</b>
    </a>`).join('');
  } catch (error) {
    document.getElementById('knowledge-citizens').innerHTML = '';
  }
}

document.querySelector('.language-switch').addEventListener('click', event => {
  const button = event.target.closest('[data-lang]');
  if (button && button.dataset.lang !== activeLanguage) setLanguage(button.dataset.lang);
});

setLanguage(activeLanguage, !params.get('lang'));
