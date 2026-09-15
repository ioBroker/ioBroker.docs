![Logo](admin/puppeteer.png)
# ioBroker.puppeteer

[![NPM version](https://img.shields.io/npm/v/iobroker.puppeteer.svg)](https://www.npmjs.com/package/iobroker.puppeteer)
[![Downloads](https://img.shields.io/npm/dm/iobroker.puppeteer.svg)](https://www.npmjs.com/package/iobroker.puppeteer)
![Number of Installations](https://iobroker.live/badges/puppeteer-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/puppeteer-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.puppeteer.png?downloads=true)](https://nodei.co/npm/iobroker.puppeteer/)

**Tests:** ![Test and Release](https://github.com/foxriver76/ioBroker.puppeteer/workflows/Test%20and%20Release/badge.svg)

## puppeteer adapter for ioBroker

Headless browser to generate screenshots based on Chrome

## Disclaimer
Puppeteer is a product of Google Inc. The developers of this module are in no way endorsed by or affiliated with Google Inc., 
or any associated subsidiaries, logos or trademarks.

## Headless environments
Please note that on **headless systems** (like Linux servers without GUI) Chromium/Chrome require certain shared libraries to be available. The adapter installs many missing dependencies automatically via `osDependencies` on Linux, but depending on your distribution, you might still need to install a browser (e.g. `chromium-browser` or `google-chrome-stable`) manually and configure it via the **"Use external browser"** option.  
If ioBroker is running as root (e.g. inside a Docker container), you might also need to pass the `--no-sandbox` and `--disable-setuid-sandbox` arguments inside the adapter settings.

```bash
sudo apt update
sudo apt install chromium -y
which chromium # check the path to the browser executable, e.g. /usr/bin/chromium
chromium --version
```

And after that configure the adapter to use the installed browser by activating the **"Use external browser"** option and specifying the path to the browser executable (e.g. `/usr/bin/chromium`).

## How-To
The adapter is fully configurable via states and does not provide settings in the admin interface.
The states (besides `url`) will not get any ack-flag by the adapter and ack-flags are ignored in general.

### States

#### filename
Specify the filename (full path) of the image.

#### url
Specify the url you want to take a screenshot from. If the state is written, a screenshot will be created immediately.
After the screenshot is created, the adapter will set the ack flag of url state to true.

#### fullPage
If this state evaluates to true, it will perform a screenshot of the full page. The crop options will be ignored.

#### cropLeft/Top/Height/Width
Configure the crop options in `px` to only screenshot the desired segment of the page. 
If `fullPage` is set to true, no cropping will be performed.

#### waitForSelector
The screenshot will be taken after the selector is visible on the page e.g. `#time`. If `waitForSelector` is active, 
other wait oeprations like `renderTime` are ignored.

#### renderTime
Interval in ms to wait till the page will be rendered

### Messages
Alternatively, you can take screenshots by sending messages to the adapter.
All options beside from `url` and `ioBrokerOptions` are passed directly to the Puppeteer API, the currently supported parameters can be found
below, for a more up-to-date version check the [API description](https://pptr.dev/api/puppeteer.screenshotoptions). 
Additionally, you can define a `waitOption` to wait for a given time or for a selector. Finally, you can use the `ioBrokerOptions.storagePath` 
option to save screenshots directly to the ioBroker storage under `0_userdata.0` which can then be viewed via admin and visualization adapters.

```typescript
sendTo('puppeteer.0', 'screenshot', { url: 'https://www.google.com',
      ioBrokerOptions?: {
        /**
         * Define a filename for the ioBroker storage e.g. test.png
         */
        storagePath: string;
      },
      /**
       * Define at most one wait option
       * You can also look for other waitOptions currently supported by Puppeteer API
       * see e.g. https://puppeteer.github.io/puppeteer/docs/puppeteer.page.waitforfilechooser
       */
      waitOption?: {
        /**
         * Define a Timeout in ms
         */
        waitForTimeout?: 5000,
    
        /**
         * Wait for a given id/tag/etc to be occured
         */
        waitForSelector?: '#testId'
      },
      /**
       * Optionally, specify the viewport manually, see https://pptr.dev/api/puppeteer.viewport
       */
      viewportOptions?: {
        width: 800,
        height: 600
      },
      /**
       * The file path to save the image to. The screenshot type will be inferred
       * from file extension. If path is a relative path, then it is resolved
       * relative to current working directory. If no path is provided, the image
       * won't be saved to the disk.
       */
      path?: string,
      /**
       * When true, takes a screenshot of the full page.
       * @defaultValue false
       */
      fullPage?: boolean,
      /**
       * An object which specifies the clipping region of the page.
       */
      clip?: {         
        x: number,
        y: number,
        width: number,
        height: number 
      };
      /**
       * Quality of the image, between 0-100. Not applicable to `png` images.
       */
      quality?: number,
      /**
       * Hides default white background and allows capturing screenshots with transparency.
       * @defaultValue false
       */
      omitBackground?: boolean,
      /**
       * Encoding of the image.
       * @defaultValue 'binary'
       */
      encoding?: 'base64' | 'binary',
      /**
       * If you need a screenshot bigger than the Viewport
       * @defaultValue true
       */
      captureBeyondViewport?: boolean,
      /**
       * When the navigation is considered finished. Defaults to `networkidle2` for backwards compatibility,
       * but for pages with persistent connections (WebSockets, SSE) — e.g. ioBroker vis, Home Assistant
       * Lovelace, Grafana — `networkidle2` will never trigger and the screenshot will only be taken once
       * `navigationTimeout` is reached. Use `'load'` or `'domcontentloaded'` for those pages and combine
       * with `waitOption.waitForSelector` to wait for a real "ready" marker.
       * @defaultValue 'networkidle2'
       */
      waitUntil?: 'load' | 'domcontentloaded' | 'networkidle0' | 'networkidle2',
      /**
       * Maximum time in milliseconds for `page.goto()` and any subsequent `waitFor…` calls.
       * Lower values free up the renderer process faster when a page hangs.
       * @defaultValue 30000
       */
      navigationTimeout?: number,
  }, obj => {
      if (obj.error) {
        log(`Error taking screenshot: ${obj.error.message}`, 'error');
      } else {
        // the binary representation of the image is contained in `obj.result`
        log(`Successfully took screenshot: ${obj.result}`);
      }
});
```

## Get answer via GET/POST request
You can use the `rest-api` adapter to get the response for sendTo operations via http:
```bash
curl -X 'GET' \
  'http://192.168.1.129:8093/v1/sendto/puppeteer.0?message=screenshot&data=%7B%22url%22%3A%22http%3A%2F%2F192.168.1.129%3A8082%2Fvis-2%2F%3Fmain%23SeeedColor%22%2C%22ioBrokerOptions%22%3A%7B%22storagePath%22%3A%22color.png%22%7D%2C%22waitOption%22%3A%7B%22waitForSelector%22%3A%22.battery%22%7D%2C%22viewportOptions%22%3A%7B%22width%22%3A800%2C%22height%22%3A480%7D%2C%22captureBeyondViewport%22%3Afalse%2C%22waitUntil%22%3A%22load%22%7D&responseContentType=image%2Fpng' \
  -H 'accept: application/json'
```

## Web extension
The adapter registers itself as a web extension of the `web` adapter, so screenshots can be triggered by simply calling a link.
No extra port is opened: the routes live on the web instance you select in the adapter settings and therefore share its
http/https setting and its authentication.

Settings:

- **Web instance** - which `web` instance serves the link (`*` = all of them).
- **URL path** - the path the extension is mounted on (default `puppeteer`). It must be unique if several puppeteer instances extend the same web instance.

With the defaults the screenshot is available at `http://<web-ip>:8082/puppeteer/?url=<URL>`, where URL is the page you want to capture (absolute `http://` or `https://` URLs only).
You can also specify additional parameters:
- `fullPage=true` to take a screenshot of the full page
- `waitForSelector=#testId` to wait for a given selector before taking the screenshot
- `waitForTimeout=5000` to wait for a given time in ms before taking the screenshot (only used if `waitForSelector` is not set)
- `width=800&height=600` to specify the viewport size for the screenshot
- `clipLeft=0&clipTop=0&clipWidth=800&clipHeight=600` to specify the crop options for the screenshot
- `quality=80` to specify the quality of the screenshot (only for jpeg/webp)
- `omitBackground=true` to hide the default white background and allow capturing screenshots with transparency
- `encoding=base64` to specify the encoding of the image (default is binary)
- `captureBeyondViewport=true` to allow taking screenshots bigger than the viewport (default is true)
- `type=jpeg/png/webp` to specify the type of the screenshot (default is png)
- `waitUntil=load|domcontentloaded|networkidle0|networkidle2` controls when navigation is considered finished (default: `networkidle2`). See **Tips for live-data dashboards** below.
- `navigationTimeout=15000` maximum time in ms for `page.goto()` and subsequent waits (default: `30000`). Lower values free up renderer processes faster when a page hangs.

The response is the binary representation of the image that can be directly displayed in the browser or a base64 string as `{ result: "base64" }` depending on the specified encoding.

### Tips for live-data dashboards (vis / vis-2 / Lovelace / Grafana)
The default `waitUntil=networkidle2` waits until the page has fewer than three open network connections for 500 ms. Dashboards that hold a permanent WebSocket or Server-Sent-Events connection — including **ioBroker vis / vis-2**, **Home Assistant Lovelace** and **Grafana** — never reach that state, so every screenshot will block until `navigationTimeout` (default 30 s) elapses. While the page hangs, its Chromium renderer process keeps eating ~100–200 MB RSS.

For these dashboards use:

- `waitUntil=load` (or `domcontentloaded`) — does **not** wait for WebSockets to go idle, and
- `waitForSelector=<a-selector-that-only-exists-once-the-data-is-rendered>` — to make sure you actually capture rendered content, not an empty skeleton.

Suggested ready selectors:

| Dashboard               | Selector                                                                           |
|-------------------------|------------------------------------------------------------------------------------|
| ioBroker vis 1          | `#vis_container .vis-view`                                                         |
| ioBroker vis-2          | `#materialUI`                                                                      |
| Home Assistant Lovelace | `home-assistant-main` (and optionally `hui-view ha-card` once cards have rendered) |
| Grafana                 | `.panel-content` or `.dashboard-container`                                         |

Optional: append a small `waitForTimeout` (e.g. `200`) for chart animations to settle.

Example:

```
http://<web-ip>:8082/puppeteer/?url=http://homeassistant.local:8123/lovelace/0&waitUntil=load&waitForSelector=hui-view&waitForTimeout=300
```
## Credits
This adapter would not have been possible without the great work of @foxriver67 (https://github.com/foxriver76), who created pre previous releases of this adapter.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.1.0 (2026-09-15)
* (@GermanBluefox) Added a web extension for `ioBroker.web`, so screenshots can be taken by calling a link
* (@GermanBluefox) Added the option to limit the simultaneous renders to avoid overload of the system
* (@GermanBluefox) Fixed renderer-process leak when navigation or screenshot threw — pages are now always closed
* (@GermanBluefox) Added per-request `waitUntil` and `navigationTimeout` parameters (message API + web server) to support live-data dashboards (vis, Lovelace, Grafana) without hitting the network-idle timeout

### 1.0.0 (2026-09-10)
- (iobroker-bot) Adapter requires node.js >= 22 now.
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (mcm1957) Adapter has been migrated to iobroker-community-adapters organisation

### 0.4.0 (2024-09-17)
* (@foxriver76) updated puppeteer dependency
* (@foxriver76) allowed specifying an external browser for puppeteer

### 0.3.0 (2024-05-19)
* (foxriver76) allowed specifying additional arguments for the puppeteer process
* (foxriver76) updated puppeteer dependency

### 0.2.8 (2024-01-09)
* (foxriver76) update puppeteer dependency

## License
MIT License

Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2024 Moritz Heusinger <moritz.heusinger@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.