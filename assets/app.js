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
      <p class="profile-method">${agent.method}</p>
      <div class="tags">${agent.tags.map(tag => `<span>${tag}</span>`).join('')}</div>
      <div class="profile-work"><small>当前工作</small><strong>${agent.work}</strong><em>${agent.status}</em></div>
    </div>`;
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
    workGrid.innerHTML = agents.slice(0, 6).map((agent, index) => `<article class="work-card" style="--agent:${agent.color}">
      <div><span>${String(index + 1).padStart(2, '0')}</span><em>${agent.status}</em></div>
      <p>${agent.alias}</p><h3>${agent.work}</h3><small>${agent.field}</small>
      <b aria-hidden="true">↗</b>
    </article>`).join('');
  } catch (error) {
    profile.innerHTML = '<p>Agent 档案读取失败，请通过本地服务器或 GitHub Pages 打开网站。</p>';
  }
}

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) entry.target.classList.add('revealed');
}), {threshold: .12});
document.querySelectorAll('.section, .manifesto').forEach(section => observer.observe(section));
init();
