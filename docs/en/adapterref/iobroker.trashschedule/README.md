---
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.trashschedule.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.trashschedule.svg
BADGE-Stable: http://iobroker.live/badges/trashschedule-stable.svg
BADGE-installed: http://iobroker.live/badges/trashschedule-installed.svg
BADGE-Dependency Status: https://img.shields.io/david/klein0r/iobroker.trashschedule.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/klein0r/ioBroker.trashschedule/badge.svg
BADGE-NPM: https://nodei.co/npm/iobroker.trashschedule.png?downloads=true
chapters: {"pages":{"en/adapterref/iobroker.trashschedule/README.md":{"title":{"en":"ioBroker.trashschedule"},"content":"en/adapterref/iobroker.trashschedule/README.md"},"en/adapterref/iobroker.trashschedule/blockly.md":{"title":{"en":"ioBroker.trashschedule"},"content":"en/adapterref/iobroker.trashschedule/blockly.md"},"en/adapterref/iobroker.trashschedule/faq.md":{"title":{"en":"ioBroker.trashschedule"},"content":"en/adapterref/iobroker.trashschedule/faq.md"}}}
---
![Logo](../../admin/trashschedule.png)

# ioBroker.trashschedule

## Preconditions

1. Create a new instance of the **ical adapter**
2. Configure url of your calendar (e.g. google calendar)
3. Set "Preview days" to a range which includes every trash type at least twice (e.g. 30 days)
4. If you use the "events" tab, ensure to enable the "display" checkbox for each event type which should also be used in your trash schedule (otherwise the event will be hidden by the ical instance)

![ical](./img/ical.png)

## Configuration

1. Create a ```trashschedule``` instance and choose the ical instance as source
2. Go to the trash types tab and add as many types as you have trash types
3. Define a name for each new trash type and configure the matching events
4. Start the instance

**Questions?** Check the [FAQ](./faq.md)

![trashschedule](./img/trashschedule.png)

![trashschedule_types](./img/trashschedule_types.png)

## VIS Widget

![VIS widget](./img/vis.png)

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 1.4.4 (2022-03-14)

* (klein0r) Updated dependencies

### 1.4.3 (2022-02-21)

* (klein0r) Updated state roles
* (klein0r) Added hint for Admin 4 configuration

### 1.4.2 (2022-02-07)

* (klein0r) Added check for ical configuration

### 1.4.1 (2021-12-23)

* (klein0r) Updated dependencies

### 1.4.0 (2021-12-10)

* (klein0r) Allow to hide "not found" warnings for single trash types (like christmas tree pickup)
* (klein0r) Added limit option for VIS widget
* (klein0r) Added option for VIS widget to hide the name

## License

MIT License

Copyright (c) 2022 Matthias Kleine <info@haus-automatisierung.com>

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