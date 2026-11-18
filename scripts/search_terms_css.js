import fs from 'fs';

const css = fs.readFileSync('scripts/formatted_layout.css', 'utf-8');

console.log('step-card in css:', css.indexOf('step-card'));
console.log('section-badge in css:', css.indexOf('section-badge'));
console.log('how-it-works in css:', css.indexOf('how-it-works'));
console.log('bio-highlight in css:', css.indexOf('bio-highlight'));
console.log('bio-cta in css:', css.indexOf('bio-cta'));

// Find lines around them if found
['step-card', 'section-badge', 'how-it-works', 'bio-highlight', 'bio-cta'].forEach(word => {
  const i = css.indexOf(word);
  if (i !== -1) {
    console.log(`=== ${word} ===`);
    console.log(css.substring(i - 50, i + 350));
  }
});
