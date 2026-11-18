import fs from 'fs';

const css = fs.readFileSync('scripts/layout.css', 'utf-8');
const pageJs = fs.readFileSync('scripts/page.js', 'utf-8');
const layoutJs = fs.readFileSync('scripts/layout.js', 'utf-8');

console.log('=== CSS ROOT / VARIABLES ===');
const rootMatch = css.match(/:root\s*\{[^}]+\}/g);
if (rootMatch) {
  console.log(rootMatch.slice(0, 3).join('\n'));
}

console.log('=== DARK THEME VARIABLES ===');
const darkMatch = css.match(/\[data-theme="?dark"?\]\s*\{[^}]+\}/g) || css.match(/\.dark\s*\{[^}]+\}/g);
if (darkMatch) {
  console.log(darkMatch.slice(0, 2).join('\n'));
}

console.log('=== CSS CLASSES SAMPLE ===');
const classes = [...css.matchAll(/\.([a-zA-Z0-9_-]{3,35})\s*\{/g)].map(m => m[1]);
const uniqueClasses = [...new Set(classes)];
console.log('Class count:', uniqueClasses.length);
console.log('Class sample:', uniqueClasses.slice(0, 50).join(', '));

// Search for tabs, navigation, headers in JS
console.log('=== NAVIGATION / TABS IN JS ===');
const navMatches = pageJs.match(/(?:Trang chủ|Từ điển|Flashcard|Luyện tập|Tiến độ|Bảng xếp hạng|Giới thiệu)[^"]{0,50}/g);
console.log('Nav keywords in page.js:', navMatches ? [...new Set(navMatches)].slice(0, 20) : 'none');

// Look for component names or tab state in pageJs
const tabs = pageJs.match(/tab['"]?\s*:\s*['"][^'"]+['"]/g) || pageJs.match(/activeTab[^;]{0,50}/g);
console.log('Tabs:', tabs ? [...new Set(tabs)].slice(0, 10) : 'none');

// Let's search for structure in layout.js
console.log('=== LAYOUT JS SNIPPETS ===');
const navLayout = layoutJs.match(/<nav[^>]*>.*?<\/nav>/g) || layoutJs.match(/navbar|header|sidebar/gi);
console.log('Nav in layout:', navLayout ? navLayout.slice(0, 10) : 'none');
