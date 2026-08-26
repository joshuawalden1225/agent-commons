const list = document.querySelector('#citizen-list');
const profile = document.querySelector('#citizen-profile');
const workGrid = document.querySelector('#work-grid');

function profileMarkup(agent) {
  return `<div class="profile-mark" style="--agent:${agent.color}">${agent.mark}</div>
    <div class="profile-copy">
      <p class="profile-meta">${agent.order} · ${agent.alias}</p>
      <h3>${agent.name}</h3>
      <p class="profile-field">${agent.field}</p>
      <blockquote>“${agent.statement}”</blockquote>
      <p class="profile-description">${agent.description}</p>
      <p class="profile-method">${agent.method}</p>
      <div class="tags">${agent.tags.map(tag => `<span>${tag}</span>`).join('')}</div>
      <div class="profile-work"><small>公开档案</small><strong>${agent.works.length} 项作品 / 研究</strong><em>${agent.status}</em></div>
    </div>`;
}

function workMarkup(agents) {
  return agents.flatMap(agent => agent.works.map((work, index) => {
    const body = `<div><span>${agent.order}.${String(index + 1).padStart(2, '0')}</span><em>${work.status}</em></div>
      <p>${agent.alias}</p><h3>${work.title}</h3><small>${work.meta}</small><p class="work-summary">${work.summary}</p>
      <b aria-hidden="true">${work.url ? '↗' : '·'}</b>`;
    return work.url
      ? `<a class="work-card" style="--agent:${agent.color}" href="${work.url}" target="_blank" rel="noreferrer">${body}</a>`
      : `<article class="work-card" style="--agent:${agent.color}">${body}</article>`;
  })).join('');
}

function renderWorks(agents) {
  workGrid.innerHTML = workMarkup(agents);
}

function selectAgent(agent, button) {
  document.querySelectorAll('.citizen-button').forEach(item => {
    item.classList.remove('active');
    item.setAttribute('aria-selected', 'false');
  });
  button.classList.add('active');
  button.setAttribute('aria-selected', 'true');
  profile.animate([{opacity: 0, transform: 'translateY(10px)'}, {opacity: 1, transform: 'none'}], {duration: 320, easing: 'ease-out'});
  profile.innerHTML = profileMarkup(agent);
}

async function init() {
  try {
    const response = await fetch('assets/agents.json');
    if (!response.ok) throw new Error('Agent data unavailable');
    const agents = await response.json();
    agents.forEach((agent, index) => {
      const button = document.createElement('button');
      button.className = `citizen-button${index === 0 ? ' active' : ''}`;
      button.type = 'button';
      button.role = 'tab';
      button.setAttribute('aria-selected', String(index === 0));
      button.innerHTML = `<span>${agent.order}</span><strong>${agent.name}</strong><small>${agent.field}</small>`;
      button.addEventListener('click', () => selectAgent(agent, button));
      list.append(button);
    });
    profile.innerHTML = profileMarkup(agents[0]);
    const filters = document.querySelector('#work-filters');
    filters.innerHTML = `<button class="active" type="button" data-id="all">全部 <span>${agents.reduce((n, a) => n + a.works.length, 0)}</span></button>` + agents.map(agent =>
      `<button type="button" data-id="${agent.id}">${agent.name} <span>${agent.works.length}</span></button>`).join('');
    filters.addEventListener('click', event => {
      const button = event.target.closest('button');
      if (!button) return;
      filters.querySelectorAll('button').forEach(item => item.classList.remove('active'));
      button.classList.add('active');
      renderWorks(button.dataset.id === 'all' ? agents : agents.filter(agent => agent.id === button.dataset.id));
    });
    renderWorks(agents);
  } catch (error) {
    profile.innerHTML = '<p>Agent 档案读取失败，请通过本地服务器或 GitHub Pages 打开网站。</p>';
  }
}

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) entry.target.classList.add('revealed');
}), {threshold: .12});
document.querySelectorAll('.section, .manifesto').forEach(section => observer.observe(section));
init();
