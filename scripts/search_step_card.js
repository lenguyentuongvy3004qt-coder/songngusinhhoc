import fs from 'fs';

const page = fs.readFileSync('scripts/page.js', 'utf-8');

const idx = page.indexOf('step-card');
if (idx !== -1) {
  console.log(page.substring(idx - 200, idx + 800));
}

// Let's also search for CSS in page.js
const styleMatches = page.match(/<style[^>]*>[\s\S]*?<\/style>/g) || page.match(/\.step-card[\s\S]{0,300}/g);
console.log('CSS in page.js:', styleMatches);
