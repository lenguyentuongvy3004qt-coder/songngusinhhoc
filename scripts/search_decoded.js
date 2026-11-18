import fs from 'fs';

const layout = fs.readFileSync('scripts/decoded_layout.js', 'utf-8');
const page = fs.readFileSync('scripts/decoded_page.js', 'utf-8');

console.log('=== BRAND & LOGO IN LAYOUT ===');
const logoMatches = layout.match(/<span className="site-logo"[^>]*>[\s\S]*?<\/div>/g) || layout.match(/site-logo[\s\S]{0,300}/g);
console.log('Logo matches:', logoMatches ? logoMatches.slice(0, 3) : 'none');

console.log('=== NAV ITEMS IN LAYOUT ===');
// Search for text in nav
const navItems = layout.match(/className="nav-item[^"]*"[\s\S]{0,200}/g);
console.log('Nav item samples:', navItems ? navItems.slice(0, 8) : 'none');

// Search for streak, theme toggle, user card in layout
const actions = layout.match(/header-actions[\s\S]{0,500}/g);
console.log('Header actions:', actions ? actions[0] : 'none');

// Search for footer in layout
const footer = layout.match(/<footer[\s\S]{0,500}/g);
console.log('Footer:', footer ? footer[0] : 'none');

console.log('=== HOME / PAGE SECTIONS IN DECODED PAGE ===');
const headings = page.match(/<h[1-4][^>]*>[\s\S]*?<\/h[1-4]>/g) || page.match(/"h[1-4]",\{[^}]+\}/g);
console.log('Headings sample:', headings ? headings.slice(0, 10) : 'none');

// Find all Vietnamese text strings in page.js
const vnStrings = [...page.matchAll(/["']([A-ZÀ-Ỹa-zà-ỹ0-9\s—–:.,!?()/%]{5,60})["']/g)].map(m => m[1]);
console.log('VN strings sample:', [...new Set(vnStrings)].slice(0, 30));
