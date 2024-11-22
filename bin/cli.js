#!/usr/bin/env node
'use strict';

import puppeteer from 'puppeteer-extra';
import { Command } from 'commander';
import puppeteerExtraStealth from 'puppeteer-extra-plugin-stealth';
import PuppeteerHar from '../lib/PuppeteerHar.js';

const program = new Command();
program.name('stealthy-har-capturer');

function collect(value, previous) {
  return previous.concat([value]);
}

program
  .option('-H, --header <header>', 'Additional headers', collect, [])
  .option('-d, --delay <seconds>', 'Delay in seconds to wait', 5)
  .argument('<url>', 'url')
  .parse(process.argv);

if (program.args.length === 0) {
  program.outputHelp();
  process.exit(1);
}

puppeteer.use(puppeteerExtraStealth())

const url = program.args[0];
const options = program.opts();

let sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    headless: true
  })
  const page = await browser.newPage();

  const pageUrl = new URL(url)
  if (options.header) {
    let headers = {};
    for (const header of options.header) {
      const name = header.split(':')[0];
      const value = header.split(':')[1].trimStart();
      headers[name] = value;
    }
    await page.setExtraHTTPHeaders(headers);
  }

  const har = new PuppeteerHar(page);
  await har.start({
    path: pageUrl.hostname + '.har',
    saveResponse: true
  });

  await page.goto(url);

  await sleep(options.delay * 1000)

  await har.stop();
  await browser.close();
})();
