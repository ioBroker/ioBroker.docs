---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.soliscloud/README.md
title: kein Titel
hash: TLCd97ICrx+ZHSrHnS8taRGxSkQwXK/Sx7cgHziilyE=
---
![Logo](../../../en/adapterref/iobroker.soliscloud/admin/solis.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.soliscloud)
![Bekannte Schwachstellen](https://snyk.io/test/github/Trixx34/ioBroker.soliscloud/badge.svg)

## SolisCloud-Adapter für IOBroker

Diese Integration basiert auf dieser Home-Assistant-Integration: <https://github.com/hultenvp/solis-sensor>

Die Schritte zur Gewinnung der für die Integration benötigten Daten sind wie folgt:

Erstellen Sie ein Ticket bei Ginlong, um die Freischaltung des API-Zugriffs für Ihr Konto zu beantragen, und warten Sie auf die Bestätigung. Die Kontaktinformationen für Ihre Region finden Sie hier: <https://www.solisinverters.com/global/contactus.html>

- Gehen Sie zu <https://www.soliscloud.com/#/apiManage> .
- Aktivieren Sie die API-Verwaltung und stimmen Sie den Nutzungsbedingungen zu.
- Nach der Aktivierung klicken Sie auf „Schlüssel anzeigen“, um ein Popup-Fenster zu öffnen, in dem Sie nach dem Bestätigungscode gefragt werden.
- Klicken Sie zuerst auf „Bestätigungscode“. Anschließend erscheint ein Bild mit zwei Puzzleteilen, die Sie mithilfe des Schiebereglers darunter übereinanderlegen müssen.
- Anschließend erhalten Sie innerhalb von 60 Sekunden eine E-Mail mit dem Bestätigungscode, den Sie eingeben müssen.
- Nach der Bestätigung erhalten Sie die API-ID, das API-Geheimnis und die API-URL.
- Die Pflanzen-ID, die Sie in den Einstellungen eingeben müssen, ist die ID **,** die Sie nach dem Einloggen in der URL finden. Beispiel: soliscloud.com/#/station/stationdetail\_1?id=123486816843454864

Dieser Adapter liest mehrere Werte aus der SolisCloud-API und speichert sie zur Verwendung in ioBroker. Um weitere Werte anzufordern, haben Sie folgende Möglichkeiten:

- Kommentieren Sie hier im ioBroker-Forum: <https://forum.iobroker.net/topic/69026/new-adapter-soliscloud/37>
- Schreiben Sie mir eine E-Mail an <trixxdev034@gmail.com>
- Erstelle ein Problem auf GitHub.

Die API liefert weitere Werte, die hinzugefügt werden können, aber im Moment reichen diese für meine Zwecke aus.

## Credits

Dieser Adapter wäre ohne die großartige Arbeit von Trixx <trixxdev034@gmail.com> , der frühere Versionen dieses Adapters erstellt hat, nicht möglich gewesen.

## Changelog

### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now

### 1.4.2 (2024-01-24)

- Adjustment in logging.

### 1.4.1 (2024-01-21)

- Removed test code that logged (lots of) errors.

### 1.4.0 (2024-01-11)

- Switched to ioBrokers sentry plugin instead of own implementation.
- Removed setting for own implementation of Sentry.
- All informational logging can now be turned off in settings.

### 1.3.5 (2023-12-28)

- Added option to send stacktraces
- improved errorhandling

### 1.3.4 (2023-12-27)

- Allow for EPM debug logging to be turned off.

### 1.3.3 (2023-12-27)

- Added settings to test EPM API Call. Result is logged, not processed at the moment.

### 1.3.1 (2023-11-10)

- Plant_state wasn't processed correctly

### 1.3.0 (2023-11-02)

- Added more values

### 1.2.5 (2023-11-01)

- attempt 2 to fix values

### 1.2.4 (2023-11-01)

- 2 values weren't updated correctly

### 1.2.3 (2023-11-01)

- Typo in main which caused application crashes

### 1.2.2 (2023-11-01)

- Typo in main which caused application crashes

### 1.2.1 (2023-11-01)

- added ack to value updates.

### 1.2.0 (2023-11-01)

- Adjusted processing of inverter API call.
- Fixed logging for API calls
- improved error handling
- write attribute set to false for all objects.

### 1.1.6 (2023-31-10)

- Added new values:
  from the Power Station List:
  batteryTodayDischargeEnergy
  batteryTodayChargeEnergy
  homeLoadTodayEnergy
  state
  oneSelf

  from the Inverter List:
  eToday
  etodayStr
  state

### 1.1.5 (2023-30-10)

- Updated minimum node version.
- Limited input to numerical values only for the plantID.
- removed some unneeded settings.
- updated translations.

### 1.1.4 (2023-24-10)

- Fixed issues with translations.

### 1.1.3 (2023-15-10)

- Switched to setInterval -> https://github.com/Trixx34/ioBroker.soliscloud/issues/12

### 1.0.3 (2023-15-10)

- Removed console logging
- Removed unused onStateChange handler
- Adjusted state-id naming
- Added units to values
- Added plant ID as root folder for objects

### 1.0.2 (2023-11-10)

- Translations
- Removed some unneeded files.

### 1.0.1 (2023-10-09)

- Fixed issue where pollinterval wasn't checked/used

### 1.0.0 (2023-10-09)

- Split api logic in separate files
- various updates to comply with publishing rules
- Initial release!

## License

MIT License

Copyright (c) 2025-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2024 Trixx trixxdev034@gmail.com

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