import fs from 'fs';

const rawCss = fs.readFileSync('scripts/formatted_layout.css', 'utf-8');

// Strip webpack comment banner at top
const cleanCss = rawCss.replace(/^\/\*![\s\S]*?\*\/\s*/, '');

fs.writeFileSync('src/bio-theme.css', cleanCss);
console.log('Written src/bio-theme.css, length:', cleanCss.length);
