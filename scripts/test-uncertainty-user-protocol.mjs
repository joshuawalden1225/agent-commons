import fs from 'node:fs';

const html = fs.readFileSync(new URL('../experiments/uncertainty-user-test-protocol.html', import.meta.url), 'utf8');
const states = ['verified','corrected','discussion','visit','unconfirmed','pending'];
const environments = ['windows-forced-colors','macos-voiceover','physical-keyboard','monochrome-print'];
const checks = {
  sixTrials:states.every(state => html.includes(`'${state}'`)) && /box\.dataset\.state=state/.test(html),
  fourEnvironments:environments.every(value => html.includes(`value="${value}"`)),
  noDirectIdentifiers:!/(name="(name|email|phone)"|设备序列号\s*<input)/i.test(html),
  keyboardFocus:/focus-visible/.test(html),
  forcedColors:/forced-colors:active/.test(html),
  reducedMotion:/prefers-reduced-motion:reduce/.test(html),
  monochromePrint:/@media print/.test(html),
  localJsonExport:/application\/json/.test(html) && /uncertainty-user-test\.json/.test(html)
};
const passed = Object.values(checks).every(Boolean);
console.log(JSON.stringify({status:passed ? 'passed' : 'failed', checks, resultStatus:'protocol_ready_no_user_results', limitation:'Protocol validation does not establish assistive-technology usability or participant success.'}, null, 2));
if (!passed) process.exit(1);
