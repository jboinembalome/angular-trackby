// Counts the DOM work Angular does in each list of the demo when you click a button.
// Run `npm run build` first, then `npm run dom-changes`.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { chromium } from 'playwright';

const root = join(import.meta.dirname, '..', 'dist', 'angular-trackby', 'browser');
const types = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.ico': 'image/x-icon',
};

const server = createServer(async (req, res) => {
  const path = req.url === '/' ? '/index.html' : req.url.split('?')[0];
  try {
    const body = await readFile(join(root, path));
    res.writeHead(200, { 'content-type': types[extname(path)] ?? 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((resolve) => server.listen(0, resolve));
const url = `http://localhost:${server.address().port}/`;

const browser = await chromium.launch();
const page = await browser.newPage();
const lists = ['by-id', 'by-index', 'by-identity'];

async function measure(button) {
  await page.goto(url);
  await page.waitForSelector('#by-id li');
  await page.evaluate((ids) => {
    window.counts = {};
    for (const id of ids) {
      const counts = (window.counts[id] = { created: 0, removed: 0, textWrites: 0 });
      new MutationObserver((records) => {
        for (const record of records) {
          if (record.type === 'characterData') counts.textWrites++;
          for (const node of record.addedNodes) if (node.nodeName === 'LI') counts.created++;
          for (const node of record.removedNodes) if (node.nodeName === 'LI') counts.removed++;
        }
      }).observe(document.getElementById(id), {
        childList: true,
        characterData: true,
        subtree: true,
      });
    }
  }, lists);
  await page.getByRole('button', { name: button }).click();
  await page.waitForTimeout(100);
  return page.evaluate(() => window.counts);
}

for (const button of ['Refresh', 'Add a user at the top']) {
  const counts = await measure(button);
  console.log(`\n${button}`);
  console.table(
    Object.fromEntries(
      lists.map((id) => [
        { 'by-id': 'track user.id', 'by-index': 'track $index', 'by-identity': 'track user' }[id],
        counts[id],
      ]),
    ),
  );
}

await browser.close();
server.close();
