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
  .option('-A, --chrome-args <argument>', 'Additional chrome arguments', collect, [])
  .option('-o, --output <filename>', 'Output HAR filename', "out.har")
  .option('-g, --grace <msecs>', 'time to wait after the load event', 1000)
  .option('-t, --timeout <msecs>', 'time to wait before giving up with a URL', 5000)
  .option('-S, --inject-script <filename>', 'Inject a content-script', 5000)
  .argument('<url>', 'The url to navigate.')
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
  let chrome_args = ['--no-sandbox'];

  if (options.chromeArgs) {
    for (const arg of options.chromeArgs) {
      chrome_args.push(arg)
    }
  }

  const browser = await puppeteer.launch({
    args: chrome_args,
    headless: true
  })
  const page = await browser.newPage();

  if (options.header) {
    let headers = {};
    for (const header of options.header) {
      if (!header.includes(':')) continue;
      const name = header.split(':')[0];
      const value = header.split(':')[1].trimStart();
      headers[name] = value;
    }
    await page.setExtraHTTPHeaders(headers);
  }

  const har = new PuppeteerHar(page);
  await har.start({
    path: options.output,
    saveResponse: true
  });

  await page.goto(url, {timeout: options.timeout});

  if (options.injectScript) {
    await page.setBypassCSP(true);
    await page.addScriptTag({ path: options.injectScript });
  }

  await sleep(options.grace)

  await har.stop();
  await browser.close();
})();
