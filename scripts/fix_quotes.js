import fs from 'fs';

let code = fs.readFileSync('src/components/common/BioIllustration.jsx', 'utf-8');

// Replace all \" with "
code = code.replace(/\\"/g, '"');

fs.writeFileSync('src/components/common/BioIllustration.jsx', code);
console.log('Fixed quotes in BioIllustration.jsx');
