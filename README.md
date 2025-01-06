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
  url                             The url to navigate.

Options:
  -H, --header <header>           Additional headers (default: [])
  -A, --chrome-args <argument>    Additional chrome arguments (default: [])
  -o, --output <filename>         Output HAR filename (default: "out.har")
  -g, --grace <msecs>             time to wait after the load event (default: 1000)
  -t, --timeout <msecs>           time to wait before giving up with a URL (default: 5000)
  -S, --inject-script <filename>  Inject a content-script (default: 5000)
  -h, --help                      display help for command

```

**Usage**
```bash
stealthy-har-capturer -t 5000 -g 4000 -H 'X-Random-Header: sdfghjsdf' -o example.har https://example.com
```
