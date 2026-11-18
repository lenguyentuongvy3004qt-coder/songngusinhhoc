import fs from 'fs';

const html = fs.readFileSync('scripts/target_index.html', 'utf-8');

const linkMatches = [...html.matchAll(/<link[^>]+>/g)].map(m => m[0]);
console.log('All links in index.html:');
console.log(linkMatches);

const styleMatches = [...html.matchAll(/<style[^>]*>[\s\S]*?<\/style>/g)].map(m => m[0]);
console.log('Style tags count:', styleMatches.length);
if (styleMatches.length > 0) {
  console.log(styleMatches[0].slice(0, 500));
}
