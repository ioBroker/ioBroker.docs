![Logo](admin/cometvisu.png)

# ioBroker.cometvisu

[![NPM version](https://img.shields.io/npm/v/iobroker.cometvisu.svg)](https://www.npmjs.com/package/iobroker.cometvisu)
[![Downloads](https://img.shields.io/npm/dm/iobroker.cometvisu.svg)](https://www.npmjs.com/package/iobroker.cometvisu)
![Number of Installations](https://iobroker.live/badges/cometvisu-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/cometvisu-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.cometvisu.png?downloads=true)](https://nodei.co/npm/iobroker.cometvisu/)

**Tests:** ![Test and Release](https://github.com/joltcoke/ioBroker.cometvisu/workflows/Test%20and%20Release/badge.svg)

## cometvisu adapter for ioBroker

Serves the CometVisu visualization through the ioBroker web adapter

[CometVisu](https://www.cometvisu.org) is a web based visualisation for home automation. It runs
in the browser, is configured through XML and is developed at
[CometVisu/CometVisu](https://github.com/CometVisu/CometVisu). This adapter delivers a CometVisu
build from an ioBroker installation and connects it to ioBroker as its backend.

## Requirements

The visualisation is delivered by [iobroker.web](https://github.com/ioBroker/ioBroker.web) (7.0.3
or newer), which also provides the login, the session and the socket connection. This adapter has
no web server of its own.

For charts and history data an ioBroker history adapter is needed, for example `iobroker.sql`
(4.1.1 or newer).

## Setup

1. Install the adapter and create an instance.
2. Pick a **CometVisu version**. The list offers the official releases from GitHub as well as any
   archive you upload yourself; the selected one is unpacked when you save.
3. Pick the **web instance** that should serve it.

The visualisation is then reachable under `http://<host>:<web port>/cometvisu/`.

## How it works

The adapter keeps the selected build on disk and registers itself as an extension of the web
adapter (`common.webExtension`), which mounts it under `/cometvisu`. Every release is unpacked into
a directory of its own, so switching back to one that was used before costs no unpacking, and
whatever is no longer referenced is removed at startup.

CometVisu learns where to connect through the `X-CometVisu-Backend-*` response headers, so no
backend has to be configured in the visualisation itself. It loads the matching socket client
library from the very server that serves it, which is why both socket modes of the web adapter
work.

## Uploading your own build

Any `CometVisu-*.tar.gz` can be uploaded in the settings. Uploads are kept apart by file name, so
several of them can exist side by side and be switched between. Uploading the same name again
replaces that entry.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.0.7 (2026-09-14)

- (joltcoke) a CometVisu build is downloaded and unpacked when it is chosen in the settings, so starting the adapter no longer needs GitHub at all
- (joltcoke) setting the version outside the settings dialog no longer fetches anything: pick it there once and save, which a newly created instance now needs as well
- (joltcoke) an archive uploaded again under the same name is unpacked right away instead of only after a manual restart of the instance
- (joltcoke) the settings dialog shows how far the preparation of a build has come, and marks the selected version once it lies ready on the server
- (joltcoke) releases that were only tried out are removed when the settings dialog is closed instead of lying around until the next start
- (joltcoke) the settings dialog says when the release list is missing because GitHub rate limited the browser, and from when it will work again
- (joltcoke) the texts of the settings dialog are translated into all eleven adapter languages
- (joltcoke) the two version fields in the settings take the width they need instead of most of the panel
- (joltcoke) the settings component requires admin 8.0.11, which is the first version that can load it
- (joltcoke) updated @iobroker/json-config to 10.0.0, @iobroker/gui-components to 10.2.3 and @module-federation/vite to 1.21.3

### 0.0.6 (2026-09-12)

- (joltcoke) the settings dialog no longer makes the admin log a failed i18n request and a missing mf-manifest.json
- (joltcoke) updated @iobroker/testing to 6.2.1, which the adapter checker asks for

### 0.0.5 (2026-09-07)

- (joltcoke) the configuration manager and the editor of CometVisu now work, the adapter answers their API
- (joltcoke) editing requires a login on the web instance unless it is explicitly allowed without one
- (joltcoke) the editor completes addresses from the ioBroker states
- (joltcoke) files can be uploaded through the manager again

### 0.0.4 (2026-09-06)

- (joltcoke) the adapter now requires node.js 22 and is tested on 22 and 24
- (joltcoke) the admin page is available in all eleven languages ioBroker ships
- (joltcoke) updated express to 5, TypeScript to 6 in both packages, axios and tar to their current releases
- (joltcoke) dependabot updates are scheduled by cron, wait seven days and use the ioBroker automerge action

### 0.0.3 (2026-09-05)

- (joltcoke) "ioBroker" is no longer listed in "common.keywords", where the adapter checker rejects it

Older entries are in CHANGELOG_OLD.md.

## License

MIT License

Copyright (c) 2026 Florian Schirmer <jolt@tuxbox.org>

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