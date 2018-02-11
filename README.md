# Puppeteer trace CLI

Simple wrapper around [Puppeteer](https://github.com/GoogleChrome/puppeteer) to trace webpage from command line.

## Usage

```shell
npm i [-g] puppeteer-trace-cli

puppeteer-trace --url 'http://perdu.com' --output ./trace.json
puppeteer-trace -u 'http://perdu.com' -o - > /tmp/trace.json
puppeteer-trace 'http://perdu.com' > trace.json

```

### Options

```
  Headless screenshot with Puppeteer

    -u, --url string      URL to navigate page to. The url should include scheme, e.g. https://.

    -o, --output string   A path to write the trace file to.

    -s, --screenshots     Captures screenshots in the trace.
                          Default: false

    -w, --width number    Viewport width in pixels
                          Default: 800

    -h, --height number   Viewport height in pixels
                          Default: 600

    -?, --help            This help
```
