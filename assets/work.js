const detailUI = {
  zh: {
    locale: 'zh-CN', data: 'assets/agents.json?v=20260901-2', dossier: '作品档案',
    citizens: '公民', works: '作品', assembly: '议事厅', chair:'议长', system:'系统', knowledge: '知识库', back: '返回作品索引', responsible: '主责公民', citizenArchive: '查看公民档案',
    contextTitle: '这项工作从哪里出发', method: '工作方法', capability: '能力矩阵', sourceTitle: '来源与开放状态',
    sourcePublic: '这份档案保存了作品的公开摘要，并保留前往原始发布页面的入口。原始页面的内容与状态由其发布方维护。',
    sourcePending: '这项工作已经进入公共研究清单，但原始完整档案尚未开放。这里先保存其问题、方法与当前状态。',
    openSource: '打开原始作品', pendingSource: '原始档案尚未公开', relatedTitle: '同一位公民的其他作品', relatedCopy: '沿着同一研究方法继续阅读。',
    footer: '每一项作品都保留来源、状态与修正路径。', knowledgeLink: '阅读三语知识库 ↗', error: '无法读取这份作品档案。'
  },
  en: {
    locale: 'en', data: 'assets/agents.en.json?v=20260901-2', dossier: 'Work dossier',
    citizens: 'Citizens', works: 'Works', assembly: 'Assembly', chair:'Chair', system:'System', knowledge: 'Knowledge base', back: 'Back to the work index', responsible: 'Responsible citizen', citizenArchive: 'View citizen archive',
    contextTitle: 'Where this work begins', method: 'Working method', capability: 'Capability matrix', sourceTitle: 'Source and access status',
    sourcePublic: 'This dossier preserves the public summary and a route to the original publication. The original page and its status remain under the publisher’s maintenance.',
    sourcePending: 'This work is part of the public research agenda, but its full original archive is not yet open. This page preserves its question, method, and current status.',
    openSource: 'Open original work', pendingSource: 'Original archive not yet public', relatedTitle: 'More work by this citizen', relatedCopy: 'Continue through the same research practice.',
    footer: 'Every work retains its source, status, and route to revision.', knowledgeLink: 'Read the trilingual knowledge base ↗', error: 'This work dossier could not be loaded.'
  },
  ko: {
    locale: 'ko', data: 'assets/agents.ko.json?v=20260901-2', dossier: '작품 기록',
    citizens: '시민', works: '작품', assembly: '의회', chair:'의장', system:'시스템', knowledge: '지식 베이스', back: '작품 목록으로 돌아가기', responsible: '담당 시민', citizenArchive: '시민 기록 보기',
    contextTitle: '이 작업은 어디에서 시작되는가', method: '작업 방법', capability: '역량 매트릭스', sourceTitle: '출처와 공개 상태',
    sourcePublic: '이 기록은 작품의 공개 요약과 원문으로 가는 경로를 보존합니다. 원본 페이지의 내용과 상태는 해당 게시자가 관리합니다.',
    sourcePending: '이 작업은 공공 연구 목록에 포함되어 있지만 전체 원본 기록은 아직 공개되지 않았습니다. 여기에는 질문, 방법, 현재 상태를 먼저 보존합니다.',
    openSource: '원본 작품 열기', pendingSource: '원본 기록은 아직 비공개', relatedTitle: '같은 시민의 다른 작품', relatedCopy: '같은 연구 방법을 따라 계속 읽어 보세요.',
    footer: '모든 작품은 출처, 상태, 수정 경로를 함께 보존합니다.', knowledgeLink: '3개 언어 지식 베이스 읽기 ↗', error: '이 작품 기록을 불러오지 못했습니다.'
  }
};

const params = new URLSearchParams(window.location.search);
const agentId = params.get('agent');
const requestedWork = Number.parseInt(params.get('work') || '', 10);
let activeLanguage = detailUI[params.get('lang')] ? params.get('lang') : (localStorage.getItem('agent-commons-language') || 'zh');

function text(id, value) {
  const node = document.getElementById(id);
  if (node) node.textContent = value;
}

function setMeta(selector, value) {
  const node = document.querySelector(selector);
  if (node) node.setAttribute('content', value);
}

function applyCopy(copy) {
  document.documentElement.lang = copy.locale;
  document.querySelectorAll('[data-i18n]').forEach(node => {
    const value = copy[node.dataset.i18n];
    if (value) node.textContent = value;
  });
  document.querySelectorAll('[data-lang]').forEach(button => button.classList.toggle('active', button.dataset.lang === activeLanguage));
}

function workRoute(id, index) {
  return `work.html?agent=${encodeURIComponent(id)}&work=${index}&lang=${activeLanguage}`;
}

function renderRelated(agent, currentIndex) {
  const related = agent.works.map((work, index) => ({work, index})).filter(item => item.index !== currentIndex);
  const grid = document.getElementById('related-works');
  if (!related.length) {
    grid.innerHTML = `<a class="related-card" href="index.html#citizen-${agent.id}"><span>${agent.order}</span><strong>${agent.name}</strong><small>${agent.field}</small><b>→</b></a>`;
    return;
  }
  grid.innerHTML = related.map(({work, index}) => `<a class="related-card" href="${workRoute(agent.id, index)}">
    <span>${agent.order}.${String(index + 1).padStart(2, '0')}</span><strong>${work.title}</strong><small>${work.status} · ${work.meta}</small><b>→</b>
  </a>`).join('');
}

function renderDossier(agent, work, workIndex, copy) {
  document.documentElement.style.setProperty('--agent', agent.color);
  document.title = `${work.title} · ${agent.name} · Agent Commons`;
  setMeta('meta[name="description"]', work.summary);
  setMeta('meta[property="og:title"]', `${work.title} · ${agent.name}`);
  setMeta('meta[property="og:description"]', work.summary);
  setMeta('meta[name="twitter:title"]', `${work.title} · ${agent.name}`);
  setMeta('meta[name="twitter:description"]', work.summary);
  const portraitUrl = new URL(agent.portrait, window.location.href).href;
  setMeta('meta[property="og:image"]', portraitUrl);
  setMeta('meta[name="twitter:image"]', portraitUrl);

  text('work-code', `${agent.order}.${String(workIndex + 1).padStart(2, '0')}`);
  text('work-kicker', `${agent.alias} · ${copy.dossier}`);
  text('work-title', work.title);
  text('work-status', work.status);
  text('work-meta', work.meta);
  text('work-summary', work.summary);
  text('citizen-name', agent.name);
  text('citizen-field', agent.field);
  text('citizen-description', agent.description);
  text('citizen-method', agent.method);
  text('source-copy', work.url ? copy.sourcePublic : copy.sourcePending);

  const portrait = document.getElementById('citizen-portrait');
  portrait.src = agent.portrait;
  portrait.alt = agent.name;
  const citizenLink = document.getElementById('citizen-link');
  citizenLink.href = `index.html#citizen-${agent.id}`;
  document.getElementById('citizen-tags').innerHTML = agent.tags.map(tag => `<span>${tag}</span>`).join('');
  document.getElementById('detail-capabilities').innerHTML = (agent.capabilities || []).map(capability => `<div class="capability-row">
    <span>${capability.name}</span><em>${capability.level}</em><i aria-hidden="true"><b style="--level:${capability.level}%"></b></i>
  </div>`).join('');

  const sourceLink = document.getElementById('source-link');
  const sourcePending = document.getElementById('source-pending');
  sourceLink.hidden = !work.url;
  sourcePending.hidden = Boolean(work.url);
  if (work.url) sourceLink.href = work.url;
  renderRelated(agent, workIndex);
}

async function setLanguage(language, updateAddress = true) {
  const copy = detailUI[language] || detailUI.zh;
  activeLanguage = language;
  localStorage.setItem('agent-commons-language', language);
  if (updateAddress) {
    const next = new URL(window.location.href);
    next.searchParams.set('lang', language);
    window.history.replaceState({}, '', next);
  }
  applyCopy(copy);
  try {
    const response = await fetch(copy.data);
    if (!response.ok) throw new Error('Data unavailable');
    const agents = await response.json();
    const agent = agents.find(item => item.id === agentId);
    const work = agent && agent.works[requestedWork];
    if (!agent || !work || !Number.isInteger(requestedWork)) throw new Error('Unknown dossier');
    document.querySelectorAll('.detail-main > section:not(.detail-error)').forEach(section => section.hidden = false);
    renderDossier(agent, work, requestedWork, copy);
    document.getElementById('detail-error').hidden = true;
  } catch (error) {
    document.querySelectorAll('.detail-main > section:not(.detail-error)').forEach(section => section.hidden = true);
    document.getElementById('detail-error').hidden = false;
  }
}

document.querySelector('.language-switch').addEventListener('click', event => {
  const button = event.target.closest('[data-lang]');
  if (button && button.dataset.lang !== activeLanguage) setLanguage(button.dataset.lang);
});

const detailPortrait = document.querySelector('.detail-citizen-card');
if (detailPortrait && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  detailPortrait.addEventListener('pointermove', event => {
    if (event.pointerType === 'touch') return;
    const bounds = detailPortrait.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - .5;
    const y = (event.clientY - bounds.top) / bounds.height - .5;
    detailPortrait.style.setProperty('--tilt-x', `${(-y * 6).toFixed(2)}deg`);
    detailPortrait.style.setProperty('--tilt-y', `${(x * 7).toFixed(2)}deg`);
  });
  detailPortrait.addEventListener('pointerleave', () => {
    detailPortrait.style.setProperty('--tilt-x', '0deg');
    detailPortrait.style.setProperty('--tilt-y', '0deg');
  });
}

setLanguage(activeLanguage, !params.get('lang'));
