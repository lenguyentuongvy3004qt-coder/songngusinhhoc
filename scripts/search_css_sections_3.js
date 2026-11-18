import fs from 'fs';

const css = fs.readFileSync('scripts/formatted_layout.css', 'utf-8');

const comments = [...css.matchAll(/\/\*([^*]+)\*\//g)].map(m => m[1].trim());
console.log(comments.slice(50, 90));
