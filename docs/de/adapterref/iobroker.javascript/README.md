---
BADGE-Number of Installations: http://iobroker.live/badges/javascript-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.javascript.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.javascript.svg
chapters: {"pages":{"de/adapterref/iobroker.javascript/README.md":{"title":{"de":"ioBroker.javascript"},"content":"de/adapterref/iobroker.javascript/README.md"},"de/adapterref/iobroker.javascript/blockly.md":{"title":{"de":"Inhalt"},"content":"de/adapterref/iobroker.javascript/blockly.md"},"de/adapterref/iobroker.javascript/usage.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.javascript/usage.md"}}}
---
![Logo](../../admin/javascript.png)

# ioBroker.javascript

## Inhaltsverzeichnis

- [Blockly](blockly.md)
- [Benutzung](usage.md)

## Changelog
<!--
	### **WORK IN PROGRESS**
-->
### 8.4.3 (2024-06-04)

* (klein0r) Added response time to httpGet and httpPost result
* (klein0r) Added trigger block to ack new values
* (bluefox) Allowed selecting different ChatGPT models for AI code generator

### 8.4.2 (2024-05-28)

* (klein0r) Fixed createState (removed redundant native attributes)
* (winnyschuster) Fixed astro custom component

### 8.4.1 (2024-05-26)

* (klein0r) Fixed httpPost block
* (klein0r) Just raise deprecated warnings once per script start/usage

### 8.4.0 (2024-05-25)

* (klein0r) Added checks/warnings for more incorrect blockly connections
* (klein0r) Added option to disable certificate validation in httpGet
* (klein0r) Added expire option to Blockly block
* (klein0r) Fixed variables.astro times when date is not available
* (klein0r) Fixed jsonConfig for libraries and library typings
* (klein0r) Implemented new js-controller 6.x functions for package handling
* (klein0r) Updated to ChatGPT-4o

### 8.3.1 (2024-05-13)

* (paul53) Allow negative values in formatTimeDiff
* (klein0r) Updated tests and fixed Blockly translations

## License
The MIT License (MIT)

Copyright (c) 2014-2024 bluefox <dogafox@gmail.com>,

Copyright (c) 2014      hobbyquaker

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