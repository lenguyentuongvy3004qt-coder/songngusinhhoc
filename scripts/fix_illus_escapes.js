import fs from 'fs';

let code = fs.readFileSync('src/components/common/BioIllustration.jsx', 'utf-8');

// Replace any backslash before non-ascii or Vietnamese characters
code = code.replace(/\\([àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÈÉẺẼẸÊỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰỲÝỶỸỴĐ])/g, '$1');

// Also replace unescaped \n with actual newlines in code
code = code.replace(/\\n/g, '\n');

// Remove fileName, lineNumber, columnNumber metadata from webpack jsxDEV
code = code.replace(/,\s*\{[^}]*fileName:[^}]*\}/g, '');
code = code.replace(/,\s*void 0,\s*(?:true|false)/g, '');
code = code.replace(/,\s*this\s*\)/g, ')');

fs.writeFileSync('src/components/common/BioIllustration.jsx', code);
console.log('Fixed src/components/common/BioIllustration.jsx');
