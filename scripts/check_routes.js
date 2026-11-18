import fs from 'fs';

async function checkRoutes() {
  const base = 'https://antiques-partial-retailer-gtk.trycloudflare.com';
  const routes = ['/', '/dictionary', '/flashcards', '/practice', '/leaderboard', '/progress', '/about', '/terms', '/quiz'];

  for (const r of routes) {
    try {
      const res = await fetch(base + r);
      console.log(`${r}: status ${res.status}`);
      if (res.status === 200) {
        const text = await res.text();
        fs.writeFileSync(`scripts/route_${r.replace('/', '') || 'home'}.html`, text);
        console.log(`  Saved route_${r.replace('/', '') || 'home'}.html, length: ${text.length}`);
      }
    } catch (e) {
      console.log(`${r}: error`, e.message);
    }
  }
}

checkRoutes();
