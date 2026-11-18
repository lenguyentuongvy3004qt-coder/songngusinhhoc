import fs from 'fs';

const css = fs.readFileSync('src/bio-theme.css', 'utf-8');

const idx = css.indexOf('.section-header-block');
if (idx !== -1) {
  console.log(css.substring(idx, idx + 2500));
} else {
  console.log('.section-header-block not found in css');
}
