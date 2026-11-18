import fs from 'fs';

const code = fs.readFileSync('scripts/bio_illustration.js', 'utf-8');

const regex = /(\/[^\/]+\/i\.test\(key\))/g;
const matches = [...code.matchAll(regex)].map(m => m[1]);
console.log('Tested regexes in BioIllustration:');
console.log(matches);
