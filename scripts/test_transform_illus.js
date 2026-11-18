import fs from 'fs';

let code = fs.readFileSync('scripts/bio_illustration.js', 'utf-8');

// Replace webpack jsxDEV calls with React.createElement
// Notice jsxDEV(type, props, key, isStatic, source, self)
// props can contain `children` as array or single element, or props without children
// Let's see the structure of a jsxDEV call in bio_illustration.js
console.log('Sample jsxDEV call:');
const sample = code.match(/\/\*#__PURE__\*\/[\s\S]{0,300}/);
console.log(sample ? sample[0] : 'not found');
