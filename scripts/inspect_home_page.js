import fs from 'fs';

const page = fs.readFileSync('scripts/decoded_page.js', 'utf-8');

console.log('Page length:', page.length);

// Search for exported components or functions in page.js
const functionNames = [...page.matchAll(/function\s+([A-Z][a-zA-Z0-9]+)\s*\(/g)].map(m => m[1]);
console.log('React function components in page.js:', [...new Set(functionNames)]);

// Search for Vietnamese section titles or headers
const vnMatches = [...page.matchAll(/["']([A-ZÀ-Ỹ][a-zà-ỹ0-9\s—–:.,!?()%]{4,60})["']/g)].map(m => m[1]);
const uniqueVn = [...new Set(vnMatches)].filter(s => 
  s.includes('Sinh học') || s.includes('tế bào') || s.includes('thuật ngữ') || 
  s.includes('Chương') || s.includes('chương') || s.includes('Khám phá') ||
  s.includes('tập') || s.includes('Thư viện') || s.includes('Bảng') || s.includes('Flashcard')
);
console.log('Unique VN Titles/Sections in page.js:');
console.log(uniqueVn);
