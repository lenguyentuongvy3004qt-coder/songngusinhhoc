import fs from 'fs';

const css = fs.readFileSync('scripts/layout.css', 'utf-8');
const layoutJs = fs.readFileSync('scripts/layout.js', 'utf-8');
const pageJs = fs.readFileSync('scripts/page.js', 'utf-8');

console.log('=== HEADER & NAV IN LAYOUT.JS ===');
// Let's find jsx or string matches in layoutJs
const headerParts = layoutJs.match(/(?:site-header|site-logo|header-brand|site-nav|nav-item|mobile-nav)[^`"'{};]{0,100}/g);
console.log('Header elements:', headerParts ? [...new Set(headerParts)].slice(0, 30) : 'none');

// Let's search for the navigation links in layoutJs
const navItems = layoutJs.match(/href="([^"]+)"[^>]*>([^<]+)</g);
console.log('Nav links:', navItems);

// Look for route names or tab names
const routes = layoutJs.match(/href:\s*["'][^"']+["'],\s*label:\s*["'][^"']+["']/g) || layoutJs.match(/\/dictionary|\/flashcards|\/practice|\/progress|\/leaderboard|\/about/g);
console.log('Routes in layout:', routes ? [...new Set(routes)] : 'none');

// Let's inspect the site-header CSS in layout.css
console.log('=== CSS SITE-HEADER ===');
const headerCss = css.match(/\.site-header[\s\S]*?(?=\n\.[a-z]|\n@media)/);
if (headerCss) {
  console.log(headerCss[0].slice(0, 1500));
}

// Let's extract all CSS rules around header, nav, hero, cards
const navCss = css.match(/\.site-nav[\s\S]*?(?=\n\.[a-z]|\n@media)/);
if (navCss) {
  console.log('=== SITE-NAV CSS ===\n', navCss[0]);
}

// Let's inspect pageJs to see what views exist
console.log('=== PAGE VIEWS / SECTIONS ===');
const sectionMatches = pageJs.match(/(?:section|tab|view|modal|card)[-_a-zA-Z0-9]{2,30}/g);
console.log('Sections/cards in page.js:', sectionMatches ? [...new Set(sectionMatches)].slice(0, 30) : 'none');
