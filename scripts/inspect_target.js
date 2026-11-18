import fs from 'fs';

async function main() {
  const base = 'https://antiques-partial-retailer-gtk.trycloudflare.com';
  console.log('Fetching', base);
  const html = await fetch(base).then(r => r.text());
  fs.writeFileSync('scripts/target_index.html', html);
  console.log('Saved target_index.html, length:', html.length);

  const cssUrls = [...html.matchAll(/href="(\/_next\/static\/css\/[^"]+)"/g)].map(m => m[1]);
  const jsUrls = [...html.matchAll(/src="(\/_next\/static\/chunks\/[^"]+)"/g)].map(m => m[1]);

  console.log('CSS files:', cssUrls);
  console.log('JS files:', jsUrls);

  for (const c of cssUrls) {
    const css = await fetch(base + c).then(r => r.text());
    const fname = 'scripts/' + c.split('/').pop().split('?')[0];
    fs.writeFileSync(fname, css);
    console.log('Saved CSS:', fname, 'length:', css.length);
  }

  for (const j of jsUrls) {
    const js = await fetch(base + j).then(r => r.text());
    const fname = 'scripts/' + j.split('/').pop().split('?')[0];
    fs.writeFileSync(fname, js);
    console.log('Saved JS:', fname, 'length:', js.length);
  }
}

main().catch(console.error);
