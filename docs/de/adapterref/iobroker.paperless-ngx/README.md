---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.paperless-ngx/README.md
title: ioBroker.paperless-ngx
hash: xVGPbaWQnYogxZ9fGb7KYF8lxLOigORxys84f9cMmZo=
---
![Logo](../../../en/adapterref/iobroker.paperless-ngx/admin/paperless-ngx.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.paperless-ngx.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.paperless-ngx.svg)
![Anzahl der Installationen](https://iobroker.live/badges/paperless-ngx-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/paperless-ngx-stable.svg)
![Test und Freigabe](https://github.com/BenAhrdt/ioBroker.paperless-ngx/workflows/Test%20and%20Release/badge.svg)
![Spenden](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![NPM](https://nodei.co/npm/iobroker.paperless-ngx.png?downloads=true)

# ioBroker.paperless-ngx

- Offizielle Paperless-ngx-Website: <https://docs.paperless-ngx.com/>

## paperless-ngx-Adapter für ioBroker

Die paperless-ngx-API ermöglicht den Abruf von Informationen zu laufenden paperless-ngx-Instanzen. Beispielsweise können Sie die Tags, Dokumente, Dokumenttypen, Benutzer oder Korrespondenten der jeweiligen paperless-Instanz auslesen.

Um sich bei der Instanz anzumelden, müssen Sie folgende Daten festlegen:![Alternativtext](../../../en/adapterref/iobroker.paperless-ngx/image.png)

Wählen Sie den Aktualisierungszyklus und die Art der gelesenen Daten: (ohne, einfach oder detailliert)![Alternativtext](../../../en/adapterref/iobroker.paperless-ngx/image-1.png)

## HAFTUNGSAUSSCHLUSS

Dieses Projekt steht in keiner offiziellen Verbindung zu Paperless-ngx, d.h. Paperless-ngx betreut dieses Projekt nicht.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.0.2 (2026-08-05)
- (BenAhrdt) Prevent adapter startup failure when no Paperless server is configured

### 1.0.1 (2026-08-05)
- (copilot) Adapter requires node.js >= 22 now
- (BenAhrdt) Add HTTPS and reverse proxy URL support while keeping existing HTTP configurations compatible

### 1.0.0 (2026-04-03)
* (BenAhrdt) change axios to fetch

### 0.5.1 (2026-02-28)
* (BenAhrdt) update dependencies

### 0.5.0 (2025-10-19)
* (BenAhrdt) update Authentication NPM
* (BenAhrdt) update test to resolve conflicts
* (BenAhrdt) update testing 5.1.1
* (BenAhrdt) update dependencie core
* (BenAhrdt) update dependencie to node >= 20
* (BenAhrdt) update testing to 24.x

[Older changelogs can be found there](https://github.com/BenAhrdt/ioBroker.paperless-ngx/blob/main/CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2025-2026 BenAhrdt <bsahrdt@gmail.com>

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