import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('home sections remain readable before scroll animation or script execution',()=>{
  const css=read('assets/styles.css');
  const section=css.match(/\.section\{([^}]+)\}/)[1];
  assert.match(section,/opacity:1(?:;|$)/);
  assert.doesNotMatch(section,/translate|transition/);
  assert.doesNotMatch(css.match(/\.citizen-archive\.loading\{([^}]+)\}/)[1],/opacity|filter/);
  assert.doesNotMatch(read('assets/app.js'),/threshold:\s*\.08/);
});
