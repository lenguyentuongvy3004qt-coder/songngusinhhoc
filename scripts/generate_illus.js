import fs from 'fs';

let code = fs.readFileSync('scripts/bio_illustration.js', 'utf-8');

let transformed = code.replace(/\(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__\.jsxDEV\)/g, 'h');

const fileContent = `import React from 'react';

function h(type, props) {
  if (!props) return React.createElement(type);
  const { children, ...rest } = props;
  if (Array.isArray(children)) {
    return React.createElement(type, rest, ...children);
  } else if (children !== undefined) {
    return React.createElement(type, rest, children);
  }
  return React.createElement(type, rest);
}

export default ${transformed}
`;

fs.mkdirSync('src/components/common', { recursive: true });
fs.writeFileSync('src/components/common/BioIllustration.jsx', fileContent);
console.log('Saved src/components/common/BioIllustration.jsx, length:', fileContent.length);
