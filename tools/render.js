#!/usr/bin/env node
// Renders a story sequence's HTML frames to 1080x1920 PNGs.
//
//   node tools/render.js sequences/<name>
//
// Reads   sequences/<name>/frames/*.html   (sorted by name: 01.html, 02.html, ...)
// Writes  sequences/<name>/export/<frame>.png  plus  export/_preview.png (contact sheet)

const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

function loadPlaywright() {
  const candidates = ['playwright', '/opt/node-tools/node_modules/playwright'];
  for (const c of candidates) {
    try { return require(c); } catch (_) { /* try next */ }
  }
  console.error('Playwright not found. Install it with:\n  npm i -D playwright && npx playwright install chromium');
  process.exit(1);
}

const W = 1080;
const H = 1920;

async function main() {
  const dir = process.argv[2];
  if (!dir) {
    console.error('Usage: node tools/render.js sequences/<name>');
    process.exit(1);
  }
  const seqDir = path.resolve(dir);
  const framesDir = path.join(seqDir, 'frames');
  const exportDir = path.join(seqDir, 'export');
  if (!fs.existsSync(framesDir)) {
    console.error(`No frames/ folder in ${seqDir}`);
    process.exit(1);
  }
  const frames = fs.readdirSync(framesDir)
    .filter((f) => f.toLowerCase().endsWith('.html'))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  if (frames.length === 0) {
    console.error(`No .html files in ${framesDir}`);
    process.exit(1);
  }
  fs.mkdirSync(exportDir, { recursive: true });

  const { chromium } = loadPlaywright();
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  const problems = [];
  page.on('requestfailed', (r) => problems.push(`  failed to load: ${r.url()}`));

  const outputs = [];
  for (const f of frames) {
    const before = problems.length;
    await page.goto(pathToFileURL(path.join(framesDir, f)).href, { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all([...document.images].map((img) => (img.decode ? img.decode().catch(() => {}) : null)));
    });
    const broken = await page.evaluate(() =>
      [...document.images].filter((img) => !img.naturalWidth).map((img) => img.getAttribute('src')));
    broken.forEach((src) => problems.push(`  broken image: ${src}`));

    const out = path.join(exportDir, f.replace(/\.html$/i, '.png'));
    await page.screenshot({ path: out, clip: { x: 0, y: 0, width: W, height: H } });
    outputs.push(out);
    console.log(`rendered ${path.relative(process.cwd(), out)}`);
    if (problems.length > before) console.warn(`warnings in ${f}:\n${problems.slice(before).join('\n')}`);
  }

  // Contact sheet so the whole sequence can be reviewed at a glance.
  const cols = outputs.length <= 6 ? outputs.length : Math.ceil(outputs.length / 2);
  const thumbW = 300;
  const cells = outputs.map((o, i) => `
    <figure><img src="${pathToFileURL(o).href}"><figcaption>${String(i + 1).padStart(2, '0')}</figcaption></figure>`).join('');
  const sheet = `<!doctype html><html><head><meta charset="utf-8"><style>
    body { margin: 0; padding: 40px; background: #111; display: inline-block; font: 600 22px Inter, sans-serif; color: #999; }
    .grid { display: grid; grid-template-columns: repeat(${cols}, ${thumbW}px); gap: 24px; }
    figure { margin: 0; }
    img { width: ${thumbW}px; height: ${Math.round((thumbW * H) / W)}px; display: block; border-radius: 14px; }
    figcaption { margin-top: 10px; text-align: center; }
  </style></head><body><div class="grid">${cells}</div></body></html>`;
  const sheetPath = path.join(exportDir, '_preview.html');
  fs.writeFileSync(sheetPath, sheet);
  await page.setViewportSize({ width: 800, height: 600 });
  await page.goto(pathToFileURL(sheetPath).href, { waitUntil: 'load' });
  const previewOut = path.join(exportDir, '_preview.png');
  await page.locator('body').screenshot({ path: previewOut });
  fs.unlinkSync(sheetPath);
  console.log(`rendered ${path.relative(process.cwd(), previewOut)}`);

  await browser.close();
  if (problems.length) process.exitCode = 2;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
