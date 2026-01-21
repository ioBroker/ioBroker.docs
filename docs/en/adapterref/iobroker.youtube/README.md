---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.youtube?style=flat-square
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.youtube?label=npm%20downloads&style=flat-square
BADGE-node-lts: https://img.shields.io/node/v-lts/iobroker.youtube?style=flat-square
BADGE-Libraries.io dependency status for latest release: https://img.shields.io/librariesio/release/npm/iobroker.youtube?label=npm%20dependencies&style=flat-square
BADGE-GitHub: https://img.shields.io/github/license/klein0r/iobroker.youtube?style=flat-square
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/klein0r/iobroker.youtube?logo=github&style=flat-square
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/klein0r/iobroker.youtube?logo=github&style=flat-square
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/klein0r/iobroker.youtube?logo=github&style=flat-square
BADGE-GitHub issues: https://img.shields.io/github/issues/klein0r/iobroker.youtube?logo=github&style=flat-square
BADGE-GitHub Workflow Status: https://img.shields.io/github/actions/workflow/status/klein0r/iobroker.youtube/test-and-release.yml?branch=master&logo=github&style=flat-square
BADGE-Beta: https://img.shields.io/npm/v/iobroker.youtube.svg?color=red&label=beta
BADGE-Stable: http://iobroker.live/badges/youtube-stable.svg
BADGE-Installed: http://iobroker.live/badges/youtube-installed.svg
---
![Logo](../../admin/youtube.png)

# ioBroker.youtube

## Requirements

- nodejs 18.0 (or later)
- js-controller 5.0.0 (or later)
- Admin Adapter 6.0.0 (or later)

## Configuration

To get an API-Key you have to go to [console.developers.google.com](https://console.developers.google.com/apis/dashboard).

1. Create a new Project
2. Create a new API key
3. Add "YouTube Data API v3" of the library
4. Use that API-Key in the instance configuration
5. Add multiple channels in the channels tab by using the id and a custom name

## Log all statistics to InfluxDB

```javascript
// v0.2

const targetDb = 'influxdb.0';
const currentInstance = `javascript.${instance}`;

on({ id: 'youtube.0.summary.json', change: 'any' }, async (obj) => {
    try {
        const youtubeJson = obj.state.val;
        const channels = JSON.parse(youtubeJson);
        const ts = Date.now();

        for (const channel of channels) {
            const alias = channel.customUrl.substr(1); // remove leading @

            await this.sendToAsync(targetDb, 'storeState', {
                id: `youtube.0.channels.${alias}.subscribers`,
                state: {
                    ts,
                    val: channel.subscriberCount,
                    ack: true,
                    from: `system.adapter.${currentInstance}.${scriptName}`,
                }
            });

            await this.sendToAsync(targetDb, 'storeState', {
                id: `youtube.0.channels.${alias}.views`,
                state: {
                    ts,
                    val: channel.viewCount,
                    ack: true,
                    from: `system.adapter.${currentInstance}.${scriptName}`,
                }
            });
        }
    } catch (err) {
        console.error(err);
    }
});
```

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 6.1.0 (2025-12-11)

* (@klein0r) Update channel icons every week
* (@klein0r) admin 7.6.17 and js-controller 6.0.11 (or later) are required
* (@klein0r) Updated dependencies

### 6.0.0 (2025-03-16)

NodeJS >= 20.x and js-controller >= 6 is required

### 5.1.1 (2024-11-12)

* (@klein0r) Added video list (yesterday)

### 5.1.0 (2024-11-11)

* (klein0r) Added groups
* (klein0r) Added icons of channels to object list

### 5.0.0 (2024-04-03)

NodeJS >= 18.x and js-controller >= 5 is required

* (klein0r) Better way to get channel id by alias

## License

The MIT License (MIT)

Copyright (c) 2025-2026 Matthias Kleine <info@haus-automatisierung.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.