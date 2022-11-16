---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.schoolfree/README.md
title: ioBroker.schoolfree
hash: EDRalLyqtcqnMYBrpn9kGAWs7VLjq92b1NumytrTEAI=
---
![Logo](../../../en/adapterref/iobroker.schoolfree/admin/schoolfree.png)

![Anzahl der Installationen](http://iobroker.live/badges/schoolfree-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.schoolfree.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.schoolfree.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/simatec/ioBroker.schoolfree/badge.svg)
![Lizenz](https://img.shields.io/github/license/simatec/ioBroker.schoolfree?style=flat)
![Spenden](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)

# IoBroker.schoolfree
![Testen und freigeben](https://github.com/simatec/ioBroker.schoolfree/workflows/Test%20and%20Release/badge.svg)

Dieser Adapter verwendet den Dienst Sentry.io, um Ausnahmen und Codefehler sowie neue Geräteschemas automatisch an mich als Entwickler zu melden. Näheres siehe unten!

## Schulfreier Adapter für ioBroker
**Wenn es Ihnen gefällt, denken Sie bitte über eine Spende nach:**

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=Q4EEXQ6U96ZTQ&source=url)

### Deutsche Beschreibung:
Schoolfree ist ein Adapter für iobroker Installationen.
Mit dem Adapter lassen sich die Schulferien auswerten und in Datenpunkte übergeben.
Die Datenpunkte können somit für weitere Funktionen wie Heizungssteuerungen, Rolladen- und Anwesenheitssteuerungen ausgewertet und verarbeitet werden.

Der aktuelle Bezug von Terminen für die Schulferien erfolgt über die API von https://www.mehr-schulferien.de

Aktuell werden die Schulferien und freien Tage für Deutschland unterstützt.

Folgende Datenpunkte stehen mit Schoolfree für die weitere Verarbeitung zur Verfügung:

* info.current.end: Datum für das Ende der aktuellen Ferien
* info.aktueller.name: Bezeichnung der aktuellen Schulferien
* info.aktueller.start: Startdatum der aktuellen Ferien
* info.next.end: Datum für das Ende der nächsten Ferien
* info.next.name: Bezeichnung der nächsten Schulferien
* info.nächster.start: Startdatum der nächsten Ferien
* info.today: Switch für den aktuellen Status heute (true/false)
* info.tomorrow: Schalter für den aktuellen Status morgen (true/false)

*************************************************************************************************************************************

### Englische Beschreibung:
Schoolfree ist ein Adapter für iobroker-Installationen.
Mit dem Adapter können die Schulferien ausgewertet und in Datenpunkte übertragen werden.
Die Datenpunkte können somit für weitere Funktionen wie Heizungssteuerungen, Rollladen- und Anwesenheitssteuerungen ausgewertet und verarbeitet werden.

Das aktuelle Abonnement für die Schulferien erfolgt über die API von https://www.mehr-schulferien.de

Aktuell werden die Schulferien und freien Tage für Deutschland unterstützt.

Zur Weiterverarbeitung mit Schoolfree stehen folgende Datenpunkte zur Verfügung:

* info.current.end: Datum für das Ende der aktuellen Ferien
* info.current.name: Name der aktuellen Schulferien
* info.current.start: Startdatum des aktuellen Urlaubs
* info.next.end: Datum für das Ende der nächsten Ferien
* info.next.name: Name der nächsten Schulferien
* info.next.start: Startdatum des nächsten Urlaubs
* info.today: Schalter für den aktuellen Stand heute (true/false)
* info.tomorrow: Schalter für den aktuellen Status morgen (true / false)

### Was ist Sentry.io und was wird an die Server dieser Firma gemeldet?
Sentry.io ist ein Dienst für Entwickler, um sich einen Überblick über Fehler in ihren Anwendungen zu verschaffen. Und genau das ist in diesem Adapter umgesetzt.

Wenn der Adapter abstürzt oder ein anderer Codefehler auftritt, wird diese Fehlermeldung, die auch im ioBroker-Protokoll erscheint, an Sentry übermittelt. Wenn Sie der iobroker GmbH erlaubt haben, Diagnosedaten zu sammeln, dann ist auch Ihre Installations-ID (dies ist nur eine eindeutige ID **ohne** zusätzliche Informationen über Sie, E-Mail, Name oder ähnliches) enthalten. Dadurch kann Sentry Fehler gruppieren und anzeigen, wie viele einzelne Benutzer von einem solchen Fehler betroffen sind. All dies hilft mir, fehlerfreie Adapter bereitzustellen, die im Grunde nie abstürzen.

*************************************************************************************************************************************

## Changelog
<!--### __WORK IN PROGRESS__-->
### 1.1.0 (2022-11-01)
(simatec) Dependencies updated
(simatec) test and release updated

### 1.0.1 (2021-11-18)
(simatec) Dependencies updated
(simatec) test and release updated

### 1.0.0 (06.05.2021)
* (simatec) GUI revised
* (simatec) Added support for admin5
* (simatec) code cleaned
* (simatec) dependencies updated
* (simatec) Github Test and Release added

### 0.7.0 (27.10.2020)
* (simatec) Changeover from request to axios for data retrieval
* (simatec) Conversion of the code structure
* (simatec) code cleaned
* (simatec) dependencies updated

### 0.6.4 (06.07.2020)
* (simatec) small Bugfixes

### 0.6.3 (02.07.2020)
* (simatec) Bugfix API Request error

### 0.6.2 (27.05.2020)
* (simatec) small Bugfixes at locations settings

### 0.6.1 (11.05.2020)
* (simatec) added errorhandling for sentry.io
* (simatec) added node 14 support

### 0.6.0 (04.05.2020)
* (simatec) added new features
* (simatec) Bugfix next day schoolfree
* (simatec) added sentry.io
* (simatec) added translations
* (simatec) added error handling

### 0.5.1 (25.03.2020)
* (simatec) added new features

### 0.5.0 (23.03.2020)
* (simatec) added public holidays
* (simatec) Bugfix next schoolfree for API 2.0
* (simatec) Bugfix schoolfree-name for API 2.0

### 0.4.1 (22.03.2020)
* (simatec) new query as adaptation to API v2.0
* (simatec) Adjustment of the federal state IDs"
* (simatec) Code fix for autochecker
* (simatec) update Dependencies

### 0.4.0 (21.03.2020)
* (simatec) added new api v2.0 from www.mehr-schulferien.de

### 0.3.1 (28.10.2019)
* (simatec) Fix start after install

### 0.3.0 (18.10.2019)
* (simatec) end of node 6 support
* (simatec) changed dateformat

### 0.2.2 (04.06.2019)
* (simatec)new object structure

### 0.2.1 (14.05.2019)
* (simatec) fix travis and appveyor

### 0.2.0 (13.05.2019)
* (simatec) Add Objects for next school holiday
* (simatec) cleaned code

### 0.1.0 (10.05.2019)
* (simatec) First Beta

### 0.0.1 (08.05.2019)
* (simatec) initial release

*************************************************************************************************************************************

## License
MIT License

Copyright (c) 2019 - 2022 simatec

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