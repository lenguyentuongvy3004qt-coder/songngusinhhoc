import fs from 'fs';

const code = fs.readFileSync('src/components/Home/HomePage.jsx', 'utf-8');

const matches = [...code.matchAll(/chap\.[a-zA-Z0-9_]+/g)].map(m => m[0]);
console.log('chap properties used in HomePage:', [...new Set(matches)]);
