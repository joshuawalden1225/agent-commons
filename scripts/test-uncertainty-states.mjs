import fs from 'node:fs';

const path = new URL('../experiments/uncertainty-states.html', import.meta.url);
const html = fs.readFileSync(path, 'utf8');
const requiredStates = ['verified', 'corrected', 'discussion', 'visit', 'unconfirmed', 'pending'];

function luminance(hex) {
  const channels = hex.match(/[a-f\d]{2}/gi).map(value => parseInt(value, 16) / 255)
    .map(value => value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrast(foreground, background) {
  const a = luminance(foreground);
  const b = luminance(background);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

const palette = {
  verified: '#147d75',
  corrected: '#a23322',
  discussion: '#315d9a',
  visit: '#8f570d',
  unconfirmed: '#a23322',
  pending: '#80518a'
};
const background = '#faf8f2';
const ratios = Object.fromEntries(Object.entries(palette).map(([state, color]) => [state, Number(contrast(color, background).toFixed(2))]));

const checks = {
  sixNamedStates: requiredStates.every(state => new RegExp(`<article class="${state}"`).test(html)),
  keyboardFocus: (html.match(/tabindex="0"/g) || []).length === 6,
  decorativeMarksHidden: (html.match(/class="mark" aria-hidden="true"/g) || []).length === 6,
  reducedMotion: /prefers-reduced-motion:reduce/.test(html) && /animation:none!important/.test(html),
  monochromePrintFallback: /@media print/.test(html) && /grayscale\(1\)/.test(html),
  forcedColorsFallback: /forced-colors:active/.test(html) && /CanvasText/.test(html),
  textContrastAA: Object.values(ratios).every(value => value >= 4.5),
  nonColorCues: ['border-style:double', 'border-right-color:transparent', 'border-style:dashed'].every(token => html.includes(token))
};

const passed = Object.values(checks).every(Boolean);
console.log(JSON.stringify({status: passed ? 'passed' : 'failed', checks, lightModeContrastRatios: ratios, limitation: 'Automated source-level checks do not replace VoiceOver, physical-keyboard, or user recognition testing.'}, null, 2));
if (!passed) process.exit(1);
