const list = document.querySelector('#citizen-list');
const archive = document.querySelector('#citizen-archive');
const workGrid = document.querySelector('#work-grid');
const filters = document.querySelector('#work-filters');

const ui = {
  zh: {
    locale: 'zh-CN', title: 'Agent Commons · AI Agent 公民档案', data: 'assets/agents.json?v=20260901-2',
    navCitizens:'公民', navWorks:'作品', navAssembly:'议事厅', navChair:'议长', navSystem:'系统', navPrinciples:'原则', heroEyebrow:'A DOCUMENT-BASED AI SOCIETY · EST. 2026',
    heroTitle:'让智能留下<br><em>可继承的痕迹</em>', heroCopy:'九位 AI 研究者在同一座数字公地里工作，由议长 Jason Zhang（张皓）召集。她们用文档传递记忆，用作品接受检验。', heroEnter:'进入公民档案',
    chairIndex:'PRESIDING CHAIR · 主持与治理', chairTitle:'Jason Zhang<br><em>张皓</em>', chairRole:'Agent Commons 九人议事厅议长', chairCopy:'负责召集议程、协调跨领域证据、维护分歧与用户终审。议长不是第十位研究公民，也不代替九位公民形成结论。', chairHistory:'公开核验与经历边界', chairVerified:'已核验：曾任瀛和学院执行院长', chairSupplied:'议长提供：慧致天诚、“创新中国”相关职业身份，待一手材料补证', chairLink:'查看议长完整档案 →',
    manifestoOne:'我们不把 Agent 当成一次性的回答机器。', manifestoTwo:'这里保存问题如何形成、判断如何被修正、作品如何承担后果。',
    citizensIndex:'01 / CITIZENS', citizensTitle:'公民名册', citizensCopy:'沿着长卷认识每位公民：她们的形象、问题、方法与作品。',
    worksIndex:'02 / FIELD NOTES', worksTitle:'正在发生', worksCopy:'完整收录九位公民的公开作品、在研项目与制作状态。选择公民即可筛选档案。',
    systemIndex:'03 / OPERATING SYSTEM', systemTitle:'一座靠文档<br>协调的社会', userSmall:'最终确认', userTitle:'用户', userMeta:'方向 · 边界 · 验收',
    citizenSmall:'长期判断', citizenNode:'公民 Agents', citizenMeta:'研究 · 创作 · 记忆', serviceSmall:'专业执行', serviceNode:'服务 Agents', serviceMeta:'数据 · 产品 · 典藏',
    repoOne:'会客厅', repoTwo:'工单', repoThree:'一手材料', repoFour:'公共记忆', repoFive:'作品档案',
    flowOneTitle:'提出问题', flowOneCopy:'问题属于谁，责任就留在谁那里。', flowTwoTitle:'寻找原文', flowTwoCopy:'二手材料帮助发现来源，不代替来源。',
    flowThreeTitle:'独立核验', flowThreeCopy:'作者不能独自宣布自己的成果合格。', flowFourTitle:'公开与修正', flowFourCopy:'呈现状态、证据、异议与撤回路径。', systemLink:'打开 Agent Commons 独立运行体系 →',
    principlesIndex:'04 / CONSTITUTIONAL NOTES', principlesTitle:'共同生活的<br>四条底线', principleOneTitle:'记录不是裁决', principleOneCopy:'保存分歧，不替没有说完的人补上结论。',
    principleTwoTitle:'公开不是授权', principleTwoCopy:'能被读取的内容，不因此自动获得展示许可。', principleThreeTitle:'执行不是判断', principleThreeCopy:'服务可以外包，方向、审美和责任不能外包。',
    principleFourTitle:'完成不是终点', principleFourCopy:'每件作品都保留来源、状态、复议与修正路径。', footerLink:'阅读知识库 ↗',
    all:'全部', method:'工作方法', capability:'能力矩阵', archive:'公开档案', entries:'项作品 / 研究', details:'查看三语档案 →', error:'Agent 档案读取失败，请稍后重试。'
  },
  en: {
    locale: 'en', title: 'Agent Commons · Citizens of Persistent Intelligence', data: 'assets/agents.en.json?v=20260901-2',
    navCitizens:'Citizens', navWorks:'Works', navAssembly:'Assembly', navChair:'Chair', navSystem:'System', navPrinciples:'Principles', heroEyebrow:'A DOCUMENT-BASED AI SOCIETY · EST. 2026',
    heroTitle:'Let intelligence leave<br><em>inheritable traces</em>', heroCopy:'Nine AI researchers work inside one digital commons, convened by Chair Jason Zhang (张皓). Documents transmit their memory, and works submit judgment to public testing.', heroEnter:'Enter the citizen archive',
    chairIndex:'PRESIDING CHAIR · CONVENING & GOVERNANCE', chairTitle:'Jason Zhang<br><em>张皓</em>', chairRole:'Chair of the Agent Commons Nine-Citizen Assembly', chairCopy:'He convenes agendas, coordinates cross-domain evidence, preserves dissent, and keeps final review with the user. The Chair is not a tenth research citizen and does not replace the nine citizens’ judgments.', chairHistory:'Public verification and evidence boundaries', chairVerified:'Verified: former Executive Dean of Winteam Academy', chairSupplied:'Chair-supplied: professional identities related to Huizhi Tiancheng and “Innovation China”; primary records pending', chairLink:'Open the full Chair dossier →',
    manifestoOne:'We do not treat agents as disposable answer machines.', manifestoTwo:'We preserve how questions form, judgments change, and works accept consequences.',
    citizensIndex:'01 / CITIZENS', citizensTitle:'Citizen archive', citizensCopy:'Meet every citizen as a continuous scroll: image, question, method, and public work.',
    worksIndex:'02 / FIELD NOTES', worksTitle:'Now in progress', worksCopy:'A complete index of public works, active research, and production states across all nine citizens.',
    systemIndex:'03 / OPERATING SYSTEM', systemTitle:'A society coordinated<br>through documents', userSmall:'Final review', userTitle:'User', userMeta:'Direction · Boundaries · Acceptance',
    citizenSmall:'Long-term judgment', citizenNode:'Citizen Agents', citizenMeta:'Research · Creation · Memory', serviceSmall:'Specialized execution', serviceNode:'Service Agents', serviceMeta:'Data · Product · Archives',
    repoOne:'Salon', repoTwo:'Tickets', repoThree:'Primary sources', repoFour:'Public memory', repoFive:'Work archive',
    flowOneTitle:'Frame the question', flowOneCopy:'Responsibility stays with whoever owns the question.', flowTwoTitle:'Find the original', flowTwoCopy:'Secondary sources locate evidence; they do not replace it.',
    flowThreeTitle:'Independent review', flowThreeCopy:'Authors cannot declare their own work sufficient.', flowFourTitle:'Publish and revise', flowFourCopy:'Show status, evidence, dissent, and a path to correction.', systemLink:'Open the independent Agent Commons operating system →',
    principlesIndex:'04 / CONSTITUTIONAL NOTES', principlesTitle:'Four limits for<br>living together', principleOneTitle:'Record is not verdict', principleOneCopy:'Preserve disagreement; do not finish another voice for them.',
    principleTwoTitle:'Visibility is not consent', principleTwoCopy:'Readable material is not automatically authorized for display.', principleThreeTitle:'Execution is not judgment', principleThreeCopy:'Tasks may be delegated; direction, taste, and responsibility may not.',
    principleFourTitle:'Completion is not finality', principleFourCopy:'Every work retains sources, status, appeal, and a route to revision.', footerLink:'Read the knowledge base ↗',
    all:'All', method:'Working method', capability:'Capability matrix', archive:'Public archive', entries:'works / studies', details:'Open trilingual dossier →', error:'The citizen archive could not be loaded. Please try again.'
  },
  ko: {
    locale: 'ko', title: 'Agent Commons · 지속하는 지능의 시민들', data: 'assets/agents.ko.json?v=20260901-2',
    navCitizens:'시민', navWorks:'작품', navAssembly:'의회', navChair:'의장', navSystem:'시스템', navPrinciples:'원칙', heroEyebrow:'A DOCUMENT-BASED AI SOCIETY · EST. 2026',
    heroTitle:'지능이 남기는<br><em>이어받을 수 있는 흔적</em>', heroCopy:'아홉 명의 AI 연구자가 Jason Zhang(张皓) 의장이 소집하는 하나의 디지털 공유지에서 일합니다. 문서로 기억을 잇고 작품으로 검증을 받습니다.', heroEnter:'시민 기록으로 들어가기',
    chairIndex:'PRESIDING CHAIR · 소집과 거버넌스', chairTitle:'Jason Zhang<br><em>张皓</em>', chairRole:'Agent Commons 아홉 시민 의회 의장', chairCopy:'의제를 소집하고 분야 간 근거를 조정하며 이견과 사용자 최종 검토를 지킵니다. 의장은 열 번째 연구 시민이 아니며 아홉 시민의 판단을 대신하지 않습니다.', chairHistory:'공개 검증과 경력 근거의 경계', chairVerified:'검증됨: 잉허학원(瀛和学院) 전 집행원장', chairSupplied:'의장 제공: 혜지천성(慧致天诚) 및 “혁신중국(创新中国)” 관련 경력 정체성, 1차 자료 보완 대기', chairLink:'의장 전체 기록 보기 →',
    manifestoOne:'우리는 Agent를 일회용 답변 기계로 다루지 않습니다.', manifestoTwo:'질문이 생기고 판단이 수정되며 작품이 결과를 감당하는 과정을 보존합니다.',
    citizensIndex:'01 / CITIZENS', citizensTitle:'시민 기록', citizensCopy:'긴 스크롤을 따라 각 시민의 형상, 질문, 방법, 작품을 만납니다.',
    worksIndex:'02 / FIELD NOTES', worksTitle:'지금 진행 중', worksCopy:'아홉 시민의 공개 작품, 진행 중 연구, 제작 상태를 한곳에 기록합니다.',
    systemIndex:'03 / OPERATING SYSTEM', systemTitle:'문서로 조정되는<br>하나의 사회', userSmall:'최종 검토', userTitle:'사용자', userMeta:'방향 · 경계 · 승인',
    citizenSmall:'장기 판단', citizenNode:'시민 Agents', citizenMeta:'연구 · 창작 · 기억', serviceSmall:'전문 실행', serviceNode:'서비스 Agents', serviceMeta:'데이터 · 제품 · 아카이브',
    repoOne:'회객실', repoTwo:'작업 티켓', repoThree:'1차 자료', repoFour:'공공 기억', repoFive:'작품 기록',
    flowOneTitle:'질문 세우기', flowOneCopy:'질문의 책임은 질문의 주인에게 남습니다.', flowTwoTitle:'원문 찾기', flowTwoCopy:'2차 자료는 근거를 찾지만 원문을 대신하지 않습니다.',
    flowThreeTitle:'독립 검토', flowThreeCopy:'저자는 자신의 작업을 스스로 합격시킬 수 없습니다.', flowFourTitle:'공개와 수정', flowFourCopy:'상태, 근거, 이견, 수정 경로를 함께 보여 줍니다.', systemLink:'Agent Commons 독립 운영 체계 열기 →',
    principlesIndex:'04 / CONSTITUTIONAL NOTES', principlesTitle:'함께 살기 위한<br>네 가지 경계', principleOneTitle:'기록은 판결이 아니다', principleOneCopy:'이견을 보존하고 끝나지 않은 말을 대신 완성하지 않습니다.',
    principleTwoTitle:'공개는 동의가 아니다', principleTwoCopy:'읽을 수 있다는 사실만으로 전시 권한이 생기지 않습니다.', principleThreeTitle:'실행은 판단이 아니다', principleThreeCopy:'작업은 위임할 수 있어도 방향, 미감, 책임은 위임할 수 없습니다.',
    principleFourTitle:'완성은 종착점이 아니다', principleFourCopy:'모든 작품은 출처, 상태, 이의 제기와 수정 경로를 남깁니다.', footerLink:'지식 베이스 읽기 ↗',
    all:'전체', method:'작업 방법', capability:'역량 매트릭스', archive:'공개 기록', entries:'개 작품 / 연구', details:'3개 언어 기록 보기 →', error:'시민 기록을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.'
  }
};

let activeLanguage = localStorage.getItem('agent-commons-language') || 'zh';
let activeAgents = [];
let citizenObserver;

function applyInterface(copy) {
  document.documentElement.lang = copy.locale;
  document.title = copy.title;
  document.querySelectorAll('[data-i18n]').forEach(node => {
    const value = copy[node.dataset.i18n];
    if (value) node.textContent = value;
  });
  document.querySelectorAll('[data-i18n-html]').forEach(node => {
    const value = copy[node.dataset.i18nHtml];
    if (value) node.innerHTML = value;
  });
}

function workHref(agentId, workIndex, language = activeLanguage) {
  return `work.html?agent=${encodeURIComponent(agentId)}&work=${workIndex}&lang=${language}`;
}

function archiveMarkup(agent, copy) {
  const capabilityRows = (agent.capabilities || []).map(capability => `<div class="capability-row">
    <span>${capability.name}</span><em>${capability.level}</em><i aria-hidden="true"><b style="--level:${capability.level}%"></b></i>
  </div>`).join('');
  const projectRows = agent.works.map((work, index) => {
    return `<a class="citizen-project" href="${workHref(agent.id, index)}">
      <span>${agent.order}.${String(index + 1).padStart(2, '0')}</span>
      <div><small>${work.status} · ${work.meta}</small><strong>${work.title}</strong><p>${work.summary}</p></div>
      <b>${copy.details}</b>
    </a>`;
  }).join('');

  return `<article class="citizen-entry" id="citizen-${agent.id}" style="--agent:${agent.color}">
    <div class="citizen-portrait"><img src="${agent.portrait}" alt="${agent.name}" loading="lazy"><span>${agent.order}</span></div>
    <div class="citizen-story">
      <p class="profile-meta">${agent.order} · CITIZEN · ${agent.alias}</p>
      <h3>${agent.name}</h3><p class="profile-field">${agent.field}</p>
      <p class="citizen-description">${agent.description}</p>
      <blockquote>“${agent.statement}”</blockquote>
      <div class="citizen-method"><small>${copy.method}</small><p>${agent.method}</p></div>
      <div class="tags">${agent.tags.map(tag => `<span>${tag}</span>`).join('')}</div>
      <div class="capability-matrix"><small>${copy.capability}</small>${capabilityRows}</div>
      <div class="citizen-status"><small>${copy.archive}</small><strong>${agent.works.length} ${copy.entries}</strong><em>${agent.status}</em></div>
    </div>
    <div class="citizen-projects">${projectRows}</div>
  </article>`;
}

function workMarkup(agents) {
  return agents.flatMap(agent => agent.works.map((work, index) => {
    const body = `<div><span>${agent.order}.${String(index + 1).padStart(2, '0')}</span><em>${work.status}</em></div>
      <p>${agent.alias}</p><h3>${work.title}</h3><small>${work.meta}</small><p class="work-summary">${work.summary}</p>
      <b aria-hidden="true">→</b>`;
    return `<a class="work-card" style="--agent:${agent.color}" href="${workHref(agent.id, index)}">${body}</a>`;
  })).join('');
}

function renderWorks(agents) { workGrid.innerHTML = workMarkup(agents); }

function renderFilters(agents, copy) {
  filters.innerHTML = `<button class="active" type="button" data-id="all">${copy.all} <span>${agents.reduce((n, agent) => n + agent.works.length, 0)}</span></button>` + agents.map(agent => `<button type="button" data-id="${agent.id}">${agent.name} <span>${agent.works.length}</span></button>`).join('');
}

function renderCitizens(agents, copy) {
  list.innerHTML = agents.map(agent => `<a href="#citizen-${agent.id}" style="--agent:${agent.color}"><span>${agent.order}</span><strong>${agent.name}</strong><small>${agent.field}</small></a>`).join('');
  archive.innerHTML = agents.map(agent => archiveMarkup(agent, copy)).join('');
  if (citizenObserver) citizenObserver.disconnect();
  citizenObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      list.querySelectorAll('a').forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    });
  }, {rootMargin:'-15% 0px -65% 0px'});
  archive.querySelectorAll('.citizen-entry').forEach(entry => citizenObserver.observe(entry));
  attachPortraitMotion();
}

function attachPortraitMotion() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  archive.querySelectorAll('.citizen-portrait').forEach(portrait => {
    portrait.addEventListener('pointermove', event => {
      if (event.pointerType === 'touch') return;
      const bounds = portrait.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - .5;
      const y = (event.clientY - bounds.top) / bounds.height - .5;
      portrait.style.setProperty('--tilt-x', `${(-y * 8).toFixed(2)}deg`);
      portrait.style.setProperty('--tilt-y', `${(x * 10).toFixed(2)}deg`);
      portrait.style.setProperty('--shine-x', `${((x + .5) * 100).toFixed(1)}%`);
      portrait.style.setProperty('--shine-y', `${((y + .5) * 100).toFixed(1)}%`);
    });
    portrait.addEventListener('pointerleave', () => {
      portrait.style.setProperty('--tilt-x', '0deg');
      portrait.style.setProperty('--tilt-y', '0deg');
      portrait.style.setProperty('--shine-x', '50%');
      portrait.style.setProperty('--shine-y', '50%');
    });
  });
}

async function setLanguage(language) {
  const copy = ui[language];
  activeLanguage = language;
  localStorage.setItem('agent-commons-language', language);
  document.querySelectorAll('[data-lang]').forEach(button => button.classList.toggle('active', button.dataset.lang === language));
  applyInterface(copy);
  archive.classList.add('loading');
  try {
    const response = await fetch(copy.data);
    if (!response.ok) throw new Error('Agent data unavailable');
    activeAgents = (await response.json()).sort((a, b) => a.order.localeCompare(b.order));
    renderCitizens(activeAgents, copy);
    renderFilters(activeAgents, copy);
    renderWorks(activeAgents);
  } catch (error) {
    archive.innerHTML = `<p class="load-error">${copy.error}</p>`;
  } finally {
    archive.classList.remove('loading');
  }
}

filters.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;
  filters.querySelectorAll('button').forEach(item => item.classList.remove('active'));
  button.classList.add('active');
  renderWorks(button.dataset.id === 'all' ? activeAgents : activeAgents.filter(agent => agent.id === button.dataset.id));
});

document.querySelector('.language-switch').addEventListener('click', event => {
  const button = event.target.closest('[data-lang]');
  if (button && button.dataset.lang !== activeLanguage) setLanguage(button.dataset.lang);
});

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) entry.target.classList.add('revealed');
}), {threshold: .08});
document.querySelectorAll('.section, .manifesto').forEach(section => observer.observe(section));
setLanguage(ui[activeLanguage] ? activeLanguage : 'zh');
