import fs from 'fs';

const css = fs.readFileSync('scripts/layout.css', 'utf-8');
const layoutJs = fs.readFileSync('scripts/layout.js', 'utf-8');
const pageJs = fs.readFileSync('scripts/page.js', 'utf-8');

console.log('=== CSS OVERVIEW ===');
console.log('Total CSS length:', css.length);

// Let's print out all major class blocks or selectors in CSS
const selectors = [...css.matchAll(/([.#][a-zA-Z0-9_-]+(?:\s*,\s*[.#][a-zA-Z0-9_-]+)*)\s*\{/g)].map(m => m[1]);
console.log('Total CSS selectors:', selectors.length);
fs.writeFileSync('scripts/extracted_selectors.txt', selectors.join('\n'));

// Let's write the formatted CSS to a file so we can view and copy its design system
fs.writeFileSync('scripts/formatted_layout.css', css);

// Let's search layout.js for the header, navigation, footer, brand, etc.
// In Webpack/Next.js bundles, strings are usually preserved in UTF-8 or \x escapes.
function decodeUnicode(str) {
  return str.replace(/\\x([0-9A-Fa-f]{2})/g, (match, hex) => String.fromCharCode(parseInt(hex, 16)))
            .replace(/\\u([0-9A-Fa-f]{4})/g, (match, hex) => String.fromCharCode(parseInt(hex, 16)));
}

const decodedLayout = decodeUnicode(layoutJs);
fs.writeFileSync('scripts/decoded_layout.js', decodedLayout);

const decodedPage = decodeUnicode(pageJs);
fs.writeFileSync('scripts/decoded_page.js', decodedPage);

console.log('Saved decoded layout and page.');
