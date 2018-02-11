#!/usr/bin/env node

const puppeteer = require('puppeteer');
const EOL       = '\n';

const argsDef = [
  { name: 'url',         alias: 'u', type: String,  description: 'URL to navigate page to. The url should include scheme, e.g. https://.' + EOL, defaultOption: true },
  { name: 'output',      alias: 'o', type: String,  description: 'A path to write the trace file to.' + EOL },
  { name: 'screenshots', alias: 's', type: Boolean, description: 'Captures screenshots in the trace. \n[italic]{Default: false}' + EOL},
  { name: 'width',       alias: 'w', type: Number,  description: 'Viewport width in pixels \n[italic]{Default: 800}' + EOL },
  { name: 'height',      alias: 'h', type: Number,  description: 'Viewport height in pixels \n[italic]{Default: 600}' + EOL },
  // { name: 'headless',                type: Boolean, description: 'Whether to run browser in headless mode. \n[italic]{Default: true}' + EOL},
  { name: 'help',        alias: '?', type: Boolean, description: 'This help'  + EOL },
];

const args  = require('command-line-args')(argsDef);
const usage = require('command-line-usage')({ header: 'Headless screenshot with Puppeteer', optionList: argsDef });

const doCapture = async function ({
  url,
  screenshots,
  output,
  width    = 800,
  height   = 600,
  headless = true,
}) {


  const browser = await puppeteer.launch({headless});
  const page    = await browser.newPage();
  let toStdout  = false;

  if (!output || output === '-') {
    output   = require('tmp').fileSync().name;
    toStdout = true;
  }

  await page.setViewport({ width, height });

  await page.tracing.start({
    screenshots,
    path: output
  });

  await page.goto(url, { waitUntil: [ 'load', 'networkidle0' ] });

  await page.tracing.stop();

  if (toStdout) {
    const trace = require('fs').readFileSync(output);
    process.stdout.write(trace);
  }

  await browser.close();
};


if (args.help || !args.url) {
  !args.help && process.stderr.write('No url provided.' + EOL);
  process.stderr.write(usage);
  process.exitCode = 1;
} else {
  doCapture(args);
}
