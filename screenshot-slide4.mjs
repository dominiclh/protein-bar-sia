import puppeteer from 'puppeteer-core';
import { existsSync, readdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const ROOT = fileURLToPath(new URL('.', import.meta.url));
const OUT  = join(ROOT, 'temporary screenshots');

function nextN() {
  const existing = existsSync(OUT) ? readdirSync(OUT) : [];
  const nums = existing.map(f => f.match(/^screenshot-(\d+)/)).filter(Boolean).map(m => parseInt(m[1], 10));
  return nums.length ? Math.max(...nums) + 1 : 1;
}

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  args: ['--no-sandbox'], headless: true,
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });

let n = nextN();

// Slide 4
await page.evaluate(() => goToSlide(3));
await new Promise(r => setTimeout(r, 800));
await page.screenshot({ path: join(OUT, `screenshot-${n}-slide4.png`), fullPage: false });
console.log(`Saved: screenshot-${n}-slide4.png`);

await browser.close();
