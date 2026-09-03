![Logo](admin/pimatic.png)
# ioBroker.pimatic

![Number of Installations](http://iobroker.live/badges/pimatic-installed.svg) 
![Number of Installations](http://iobroker.live/badges/pimatic-stable.svg) 

This adapter connects ioBroker with [pimatic](https://pimatic.org/).

It exports devices and groups from pimatic and then monitors updates of variables.

## Changelog
### 1.0.0 (2026-08-27)
* (bluefox) The adapter was refactored to TypeScript and the configuration dialog to JsonConfig
* (bluefox) **Breaking:** requires node.js >= 22, js-controller >= 6.0.11 and admin >= 7.0.0 now
* (bluefox) Fixed the password: it was stored under a different name than the one the adapter read
* (bluefox) Fixed the update of already existing states, they were written to an undefined ID
* (bluefox) `request` was replaced by `axios`, the unused `sqlite3` dependency was removed

### 0.3.3 (2026.08.27)
* (fennsen64) Fixed the writing of pimatic variables: the required `common.type` was missing (js-controller 4.x and newer)
* (bluefox) Read-only pimatic variables are synchronized now too
* (bluefox) Fixed the ID of variables with spaces in the name
* (ioBroker-Bot) Adapter requires js-controller >= 6.0.11 now

### 0.3.2 (2023.03.22)
* (Apollon77) Prepare for future js-controller versions

### 0.3.0 (2020.04.12)
* (Apollon77) make auto decrypt compatible with js-controller 3.0
* (Apollon77) Remove Admin 2 support

### 0.2.1 (2020.03.08)
* (tehmilcho) Added Variables with Readonly false to the Sync
* (bluefox) Refactoring (compact mode, ES6)

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
The MIT License (MIT)

Copyright (c) 2017-2026 bluefox <dogafox@gmail.com>

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
