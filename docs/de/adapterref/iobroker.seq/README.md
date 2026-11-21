---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.seq/README.md
title: ioBroker.seq
hash: PxhapoTidY3J2W9Y23wrURuG6eNmqwkHKOxYVzgIpjA=
---
![Logo](../../../en/adapterref/iobroker.seq/admin/seq.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.seq.svg?dummy=unused)
![Downloads](https://img.shields.io/npm/dm/iobroker.seq.svg?dummy=unused)
![Anzahl der Installationen (aktuell)](https://iobroker.live/badges/seq-installed.svg?dummy=0.2.7)
![Anzahl der Installationen (stabil)](https://iobroker.live/badges/seq-stable.svg?dummy=0.2.7)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/seq/svg-badge.svg)
![NPM](https://nodei.co/npm/iobroker.seq.png?downloads=true)

# ioBroker.seq

## Seq-Adapter für ioBroker

Dieser Adapter ermöglicht es Ihnen, Ihre ioBroker-Protokolle in das [Seq](https://datalust.co/seq) -System zu übertragen. Es ist möglich, nach Protokollierungsstufe und nach exakten Quell-IDs zu filtern.

## Konfiguration

1. Erstellen Sie eine neue Instanz des Adapters.
2. Geben Sie die URL/IP-Adresse und den Port der [Seq-](https://datalust.co/seq) Instanz ein.
3. Geben Sie an, welche Protokollereignisse an [Seq](https://datalust.co/seq) gesendet werden sollen.
4. Optional können Sie im **Quellfilter** durch Kommas getrennte Quell-IDs eingeben (zum Beispiel, `mqtt.0, javascript.0` Lassen Sie dieses Feld leer, um Protokolle von allen Quellen zu senden.
5. Einstellungen speichern

## Changelog
### 1.0.4 (2026-11-15)
* (arteck) Dependencies have been updated

### 1.0.3 (2026-10-17)
* (arteck) Dependencies have been updated
- (copilot) Adapter requires node.js >= 22 now

### 1.0.2 (2026-04-06)
* (arteck) back to seq-logging 2.2.0

### 1.0.1 (2026-04-06)
* (arteck) Dependencies have been updated

### 1.0.0 (2026-04-05)
* (arteck) new admin

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