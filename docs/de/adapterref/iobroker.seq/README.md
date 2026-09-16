---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.seq/README.md
title: ioBroker.seq
hash: LxFVjAQEAdn40wowoJhw7ayYk1LpN8tbgG0EgRNPtco=
---
![Logo](../../../en/adapterref/iobroker.seq/admin/seq.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.seq.svg?dummy=unused)
![Downloads](https://img.shields.io/npm/dm/iobroker.seq.svg?dummy=unused)
![Anzahl der Installationen (aktuell)](https://iobroker.live/badges/seq-installed.svg?dummy=0.2.7)
![Anzahl der Installationen (stabil)](https://iobroker.live/badges/seq-stable.svg?dummy=0.2.7)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/seq/svg-badge.svg)
![NPM](https://nodei.co/npm/iobroker.seq.png?downloads=true)

# ioBroker.seq

## Seq-Adapter für ioBroker

Dieser Adapter ermöglicht es Ihnen, Ihr ioBroker-Log in das System von [Seq](https://datalust.co/seq) zu übertragen.\
&#x20;Es ist außerdem möglich, einen Filter auf die Protokollierungsstufen und auch auf die Adapter anzuwenden.

## Konfiguration

1. Erstellen Sie eine neue Instanz des Adapters.
2. Geben Sie die URL/IP-Adresse und den Port der [Seq-](https://datalust.co/seq) Instanz ein.
3. Geben Sie an, welche Protokollereignisse an [Seq](https://datalust.co/seq) gesendet werden sollen.
4. Einstellungen speichern

## Changelog
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now

### 1.0.2 (2026-04-06)
* (arteck) back to seq-logging 2.2.0

### 1.0.1 (2026-04-06)
* (arteck) Dependencies have been updated

### 1.0.0 (2026-04-05)
* (arteck) new admin

[Older changelogs can be found there](https://github.com/arteck/ioBroker.seq/blob/master/CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 Arthur Rupp <arteck@outlook.com>,

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