import puppeteer from 'puppeteer-core';
import { existsSync, mkdirSync } from 'fs';
import { readdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const ROOT = fileURLToPath(new URL('.', import.meta.url));
const OUT_DIR = join(ROOT, 'temporary screenshots');

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

function nextFilename(label) {
  const existing = existsSync(OUT_DIR) ? readdirSync(OUT_DIR) : [];
  const nums = existing
    .map(f => f.match(/^screenshot-(\d+)/))
    .filter(Boolean)
    .map(m => parseInt(m[1], 10));
  const n = nums.length ? Math.max(...nums) + 1 : 1;
  return label
    ? `screenshot-${n}-${label}.png`
    : `screenshot-${n}.png`;
}

const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || '';

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
  headless: true,
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

const filename = nextFilename(label);
const outPath = join(OUT_DIR, filename);
await page.screenshot({ path: outPath, fullPage: true });
await browser.close();

console.log(`Saved: temporary screenshots/${filename}`);
