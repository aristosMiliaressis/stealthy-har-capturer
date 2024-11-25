stealthy-har-capturer
==

**Installation**
```bash
npm install -g @arist0phanes/stealthy-har-capturer
```

**Help Page**
```
Usage: stealthy-har-capturer [options] <url>

Arguments:
  url                      The url to navigate.

Options:
  -H, --header <header>    Additional headers (default: [])
  -o, --output <filename>  Output HAR filename (default: "out.har")
  -d, --delay <seconds>    Delay in seconds to wait (default: 5)
  -h, --help               display help for command
```

**Usage**
```bash
google-chrome --no-sandbox --remote-debugging-port=9222 --headless &

stealthy-har-capturer -d 4 -H 'X-Random-Header: sdfghjsdf' https://example.com
```