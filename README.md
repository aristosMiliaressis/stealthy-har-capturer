stealthy-har-capturer
==

**Installation**
```bash
npm install -g stealthy-har-capturer
```

**Help Page**
```
Usage: stealthy-har-capturer [options] <url>

Arguments:
  url                      The url to navigate.

Options:
  -H, --header <header>    Additional headers (default: [])
  -o, --output <filename>  Output HAR filename (default: "out.har")
  -g, --grace <msecs>      time to wait after the load event (default: 1000)
  -t, --timeout <msecs>    time to wait before giving up with a URL (default: 5000)
  -h, --help               display help for command
```

**Usage**
```bash
google-chrome --no-sandbox --remote-debugging-port=9222 --headless &

stealthy-har-capturer -d 4 -H 'X-Random-Header: sdfghjsdf' https://example.com
```
