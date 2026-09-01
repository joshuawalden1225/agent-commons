const errorUI = {
  zh: {locale:'zh-CN', title:'这页档案<br><em>还没有被写下</em>', copy:'链接可能已经移动，或者这份记录仍在等待公开。', home:'返回首页 →', assembly:'进入议事厅 →', chair:'查看议长 →', system:'查看系统 →', knowledge:'阅读知识库 →'},
  en: {locale:'en', title:'This page has not<br><em>entered the archive</em>', copy:'The link may have moved, or this record may still be waiting for public release.', home:'Return home →', assembly:'Enter the assembly →', chair:'Open Chair dossier →', system:'Open system →', knowledge:'Read the knowledge base →'},
  ko: {locale:'ko', title:'이 페이지는 아직<br><em>기록되지 않았습니다</em>', copy:'링크가 이동했거나 이 기록이 아직 공개를 기다리고 있을 수 있습니다.', home:'홈으로 돌아가기 →', assembly:'의회 들어가기 →', chair:'의장 기록 보기 →', system:'시스템 보기 →', knowledge:'지식 베이스 읽기 →'}
};

let activeLanguage = errorUI[localStorage.getItem('agent-commons-language')] ? localStorage.getItem('agent-commons-language') : 'zh';

function applyErrorLanguage(language) {
  const copy = errorUI[language];
  activeLanguage = language;
  localStorage.setItem('agent-commons-language', language);
  document.documentElement.lang = copy.locale;
  document.querySelectorAll('[data-i18n]').forEach(node => {
    const value = copy[node.dataset.i18n];
    if (!value) return;
    if (node.dataset.i18n === 'title') node.innerHTML = value;
    else node.textContent = value;
  });
  document.querySelectorAll('[data-lang]').forEach(button => button.classList.toggle('active', button.dataset.lang === language));
}

document.querySelector('.language-switch').addEventListener('click', event => {
  const button = event.target.closest('[data-lang]');
  if (button) applyErrorLanguage(button.dataset.lang);
});

applyErrorLanguage(activeLanguage);
