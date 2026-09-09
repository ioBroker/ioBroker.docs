---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.schoolfree/README.md
title: ioBroker.schoolfree
hash: 67AQu/EYqp/i98++GIaelTrcgFWmRUrmvH88/cr7twA=
---
![Logo](../../../en/adapterref/iobroker.schoolfree/admin/schoolfree.png)

![Anzahl der Installationen](http://iobroker.live/badges/schoolfree-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.schoolfree.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.schoolfree.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/simatec/ioBroker.schoolfree/badge.svg)
![Test und Freigabe](https://github.com/simatec/ioBroker.schoolfree/workflows/Test%20and%20Release/badge.svg)
![Lizenz](https://img.shields.io/github/license/simatec/ioBroker.schoolfree?style=flat)
![Spenden](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)

# ioBroker.schoolfree

Dieser Adapter nutzt den Dienst Sentry.io, um mir als Entwickler automatisch Ausnahmen, Codefehler und neue Geräteschemata zu melden. Weitere Details finden Sie unten!

## schoolfree-Adapter für ioBroker

**Wenn es Ihnen gefällt, erwägen Sie bitte eine Spende:**

[![PayPal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mk1676)

---

### Beschreibung:

Schoolfree ist ein Adapter für iobroker-Installationen. Mit diesem Adapter lassen sich die Schulferien auswerten und in Datenpunkte übertragen. Diese Datenpunkte können anschließend für weitere Funktionen wie Heizungs-, Rollladen- und Anwesenheitssteuerung ausgewertet und verarbeitet werden.

Das aktuelle Abonnement für die Schulferien erfolgt über die API von <https://www.mehr-schulferien.de>

Aktuell werden die Schulferien und freien Tage in Deutschland unterstützt.

Folgende Datenpunkte stehen für die Weiterverarbeitung mit Schoolfree zur Verfügung:

- info.current.end: Datum des Endes der aktuellen Feiertage
- info.current.name: Name der aktuellen Schulferien
- info.current.start: Startdatum des aktuellen Feiertags
- info.next.end: Datum für das Ende der nächsten Feiertage
- info.next.name: Name der nächsten Schulferien
- info.next.start: Startdatum des nächsten Feiertags
- info.today: Schalter für den heutigen Status (wahr / falsch)
- info.tomorrow: Schalter für den aktuellen Status morgen (wahr / falsch)

### Was ist Sentry.io und was wird an die Server dieses Unternehmens gemeldet?

Sentry.io ist ein Dienst, der Entwicklern einen Überblick über Fehler in ihren Anwendungen bietet. Genau dies wird in diesem Adapter implementiert.

Wenn der Adapter abstürzt oder ein anderer Codefehler auftritt, wird diese Fehlermeldung, die auch im ioBroker-Protokoll erscheint, an Sentry übermittelt. Wenn Sie der iobroker GmbH die Erlaubnis erteilt haben, Diagnosedaten zu erfassen, wird auch Ihre Installations-ID (eine eindeutige ID **ohne** weitere Informationen wie E-Mail-Adresse, Name usw.) übermittelt. Dadurch kann Sentry Fehler gruppieren und die Anzahl der betroffenen Benutzer anzeigen. All dies hilft mir, fehlerfreie Adapter bereitzustellen, die praktisch nie abstürzen.

---

## Changelog
<!--### __WORK IN PROGRESS__-->
### 2.1.0 (2026-08-18)
* (copilot) Adapter requires node.js >= 22 now
* (simatec) dependencies updated

### 2.0.0 (2026-04-06)
* (simatec) Breaking Changes - API Update to v2.1
* (simatec) Update locations
* (simatec) Fix Test & Release

### 1.1.14 (2026-03-29)
* (simatec) Readme updated
* (simatec) Fix License
* (simatec) dependencies updated

### 1.1.13 (2025-11-18)
* (simatec) dependencies updated
* (simatec) update npm publish

### 1.1.12 (2025-08-31)
* (simatec) small fix
* (simatec) dependencies updated

[Older changelogs can be found there](https://github.com/simatec/ioBroker.schoolfree/blob/master/CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2019 - 2026 simatec

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