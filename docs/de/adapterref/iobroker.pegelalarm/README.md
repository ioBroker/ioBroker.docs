---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.pegelalarm/README.md
title: ioBroker.pegelalarm
hash: lh7ryTYAwsoPCu2btnWIobQJah/PjOGwzqUPfNmYxrI=
---
![Logo](../../../en/adapterref/iobroker.pegelalarm/admin/pegelalarm.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.pegelalarm.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.pegelalarm.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/pegelalarm-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/pegelalarm-stable.svg)
![Test und Freigabe](https://github.com/simatec/ioBroker.pegelalarm/workflows/Test%20and%20Release/badge.svg)
![Lizenz](https://img.shields.io/github/license/simatec/ioBroker.pegelalarm?style=flat)
![Spenden](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)

# ioBroker.pegelalarm

## Pegelalarm-Adapter für ioBroker

Stellt Daten von Pegelalarm-API (v1.0) bereit

Die API-Dokumentation für API 1.1 finden Sie hier: <https://github.com/SOBOS-GmbH/pegelalarm_public_pas_doc/wiki/Download-current-water-data>

---

### Was ist Sentry.io und was wird an die Server dieses Unternehmens gemeldet?

Sentry.io ist ein Dienst, der Entwicklern einen Überblick über Fehler in ihren Anwendungen bietet. Genau dies wird in diesem Adapter implementiert.

Wenn der Adapter abstürzt oder ein anderer Codefehler auftritt, wird diese Fehlermeldung, die auch im ioBroker-Protokoll erscheint, an Sentry übermittelt. Wenn Sie der iobroker GmbH die Erlaubnis erteilt haben, Diagnosedaten zu erfassen, wird auch Ihre Installations-ID (eine eindeutige ID **ohne** weitere Informationen wie E-Mail-Adresse, Name usw.) übermittelt. Dadurch kann Sentry Fehler gruppieren und die Anzahl der betroffenen Benutzer anzeigen. All dies hilft mir, fehlerfreie Adapter bereitzustellen, die praktisch nie abstürzen.

---

**Wenn es Ihnen gefällt, erwägen Sie bitte eine Spende:**

[![PayPal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mk1676)

---

## Changelog
<!--### __WORK IN PROGRESS__-->
### 1.5.0 (2026-08-19)
* (copilot) Adapter requires node.js >= 22 now
* (simatec) dependencies updated
* (simatec) Fix setTimeout

### 1.4.0 (2026-04-22)
* (simatec) dependencies updated
* (simatec) Request Fix
* (simatec) Timeout Fix
* (simatec) Source code rewritten,
* (simatec) Source code improved
* (simatec) Station names fixed
* (simatec) Header added

### 1.3.13 (2026-03-29)
* (simatec) Fix License
* (simatec) dependencies updated

### 1.3.12 (2025-11-23)
* (simatec) dependencies updated

### 1.3.11 (2025-11-02)
* (simatec) dependencies updated
* (simatec) Fix npm publish

[Older changelogs can be found there](https://github.com/simatec/ioBroker.pegelalarm/blob/master/CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2020 - 2026 simatec

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