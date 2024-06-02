---
BADGE-Number of Installations: http://iobroker.live/badges/javascript-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.javascript.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.javascript.svg
chapters: {"pages":{"de/adapterref/iobroker.javascript/README.md":{"title":{"de":"ioBroker.javascript"},"content":"de/adapterref/iobroker.javascript/README.md"},"de/adapterref/iobroker.javascript/blockly.md":{"title":{"de":"Inhalt"},"content":"de/adapterref/iobroker.javascript/blockly.md"},"de/adapterref/iobroker.javascript/usage.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.javascript/usage.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.javascript/README.md
title: ioBroker.javascript
hash: k6V2KtvlPSRrmHV0UCtITj03N9QMfCpNbNX+49On33w=
---
![标识](../../../de/admin/javascript.png)

# IoBroker.javascript
＃＃ 目录
- [Blockly](blockly.md)
- [用法](usage.md)

## Changelog
<!--
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**

* (klein0r) Added response time to httpGet and httpPost result
* (klein0r) Added trigger block to ack new values

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

### 8.3.0 (2024-05-09)

* (klein0r) Added createTempFile to sandbox
* (klein0r) Fixed log message on script start
* (klein0r) Added instance/from to log window (like in admin)

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