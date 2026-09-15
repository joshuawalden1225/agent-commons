// Shared navigation follows the language selected on each existing page.
(() => {
  const nav=document.querySelector('.site-header nav');
  if(!nav||nav.querySelector('[data-work-navigation]'))return;
  const link=document.createElement('a');link.dataset.workNavigation='true';nav.append(link);
  const update=()=>{const lang=document.documentElement.lang.startsWith('ko')?'ko':document.documentElement.lang.startsWith('en')?'en':'zh';link.textContent={zh:'研究工作台',en:'Research',ko:'연구실'}[lang];link.href=`research.html?lang=${lang}`;};
  update();new MutationObserver(update).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
})();
