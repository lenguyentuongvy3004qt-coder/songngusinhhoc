import fs from 'fs';

const css = fs.readFileSync('scripts/formatted_layout.css', 'utf-8');

// Let's find all CSS comments like /* ... */
const comments = [...css.matchAll(/\/\*([^*]+)\*\//g)].map(m => m[1].trim());
console.log('CSS Section comments:');
console.log(comments.filter(c => c.length > 5 && !c.includes('tailwind')).slice(0, 40));

// Let's find major class clusters
const flashcardStyles = css.match(/\.flash[a-zA-Z0-9_-]+/g);
console.log('Flashcard classes:', [...new Set(flashcardStyles)]);

const dictStyles = css.match(/\.dict[a-zA-Z0-9_-]+/g) || css.match(/\.search[a-zA-Z0-9_-]+/g);
console.log('Dict classes:', dictStyles ? [...new Set(dictStyles)] : 'none');

const quizStyles = css.match(/\.quiz[a-zA-Z0-9_-]+/g);
console.log('Quiz classes:', quizStyles ? [...new Set(quizStyles)] : 'none');

const practiceStyles = css.match(/\.prac[a-zA-Z0-9_-]+/g);
console.log('Practice classes:', practiceStyles ? [...new Set(practiceStyles)] : 'none');
