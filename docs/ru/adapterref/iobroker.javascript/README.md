---
BADGE-Number of Installations: http://iobroker.live/badges/javascript-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.javascript.svg
BADGE-Test and Release: https://github.com/ioBroker/ioBroker.javascript/workflows/Test%20and%20Release/badge.svg
BADGE-Translation status: https://weblate.iobroker.net/widgets/adapters/-/javascript/svg-badge.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.javascript.svg
chapters: {"pages":{"ru/adapterref/iobroker.javascript/README.md":{"title":{"ru":"ioBroker.javascript"},"content":"ru/adapterref/iobroker.javascript/README.md"},"ru/adapterref/iobroker.javascript/blockly.md":{"title":{"ru":"Содержание"},"content":"ru/adapterref/iobroker.javascript/blockly.md"}}}
---
<img src="../../admin/javascript.svg" alt="ioBroker.javascript" width="100" />

# ioBroker.javascript

## Содержание

- [Blockly](/#/docs/adapterref/iobroker.javascript/blockly.md)

## Changelog
### **WORK IN PROGRESS**
* (@GermanBluefox) Added: OpenRouter, if it is chosen in the system-wide AI settings of admin (`@iobroker/ai-core` 0.0.6, `@iobroker/ai-gui` 0.0.5)

### 10.4.8 (2026-10-27)
* (GermanBluefox) Fixed: setting scriptEnabled to true restarts an already running script again (#2417)
* (@GermanBluefox) Fixed: a script that stopped itself with `stopScript()` (or was restarted with `runScript()`) kept running and `scriptEnabled` stayed `true`
* (@GermanBluefox) Added: the AI uses the AI settings of the system that are set up once in admin (System settings → AI) - for new instances and for instances without own keys
* (@GermanBluefox) Fixed: a script started via the `execute` message wrote `scriptEnabled.__execute_<n>` without object, when the instance stopped or the setState limit stopped the script before the output was collected

### 10.4.7 (2026-10-23)
* (@GermanBluefox) Fixed: the AI chat did not see the open script when it was a Blockly script, and an outdated version of it after unsaved edits; the open script is now always the context when no other script is mentioned
* (@GermanBluefox) Fixed: the code mode of the AI chat ignored the open script and wrote an unrelated new script for a request like "turn on the logs in the script"

### 10.4.6 (2026-10-19)
* (@GermanBluefox) Fixed: false "Cannot redeclare block-scoped variable" (TS2451) warnings for `const`s that are declared in several scripts
* (@GermanBluefox) Fixed: `subscribeObject()`/`onObject()` and the rule trigger "On object change" never fired for a pattern with `*`
* (@GermanBluefox) Fixed: a change of a TypeScript script could be ignored after its compilation result could not be stored

### 10.4.5 (2026-10-18)
* (@GermanBluefox) Fixed: a script that did not handle a rejected `setStateAsync` (e.g. of a missing state) or another asynchronous function terminated the adapter
* (@agross) Fixed: TypeScript scripts that import the same module as a global script failed with "Identifier has already been declared"
* (@GermanBluefox) Fixed: the @-mention list of the AI chat showed only the first 13 scripts
* (@GermanBluefox) Fixed: selection of state if predefined

### 10.4.4 (2026-10-16)
* (@GermanBluefox) Fixed: a script that did not handle a rejected `setStateAsync` (e.g. of a missing state) or another asynchronous function terminated the adapter
* (@GermanBluefox) Fixed: instances of different versions
* (@GermanBluefox) Fixed: the AI chat stopped with "m.default is not a constructor"

## License
The MIT License (MIT)

Copyright (c) 2014-2026 bluefox <dogafox@gmail.com>  
Copyright (c) 2014 hobbyquaker

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