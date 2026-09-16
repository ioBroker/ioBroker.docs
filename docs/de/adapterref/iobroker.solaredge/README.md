---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.solaredge/README.md
title: ioBroker.soledge
hash: dNkc+63yZjGYGNeDnfd3YA4g6AoqX2O9HARX+BN3KCo=
---
![Logo](../../../en/adapterref/iobroker.solaredge/admin/solaredge.png)

![GitHub-Lizenz](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.solaredge)
![Downloads](https://img.shields.io/npm/dm/iobroker.solaredge.svg)
![GitHub-Repository-Größe](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.solaredge)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/solaredge/svg-badge.svg)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.solaredge)
![GitHub-Commits seit der letzten Veröffentlichung (nach Datum)](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.solaredge/latest)
![Letzter Commit auf GitHub](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.solaredge)
![GitHub-Probleme](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.solaredge)
![NPM-Version](http://img.shields.io/npm/v/iobroker.solaredge.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/solaredge-stable.svg)
![Anzahl der Installationen](https://iobroker.live/badges/solaredge-installed.svg)
![Test und Freigabe](https://github.com/iobroker-community-adapters/ioBroker.solaredge/actions/workflows/test-and-release.yml/badge.svg)
![CodeQL](https://github.com/iobroker-community-adapters/ioBroker.solaredge/actions/workflows/codeql.yml/badge.svg)

# ioBroker.soledge

</br>
**Version:** </br>
</br>
**Tests:** </br>

<!--
## Sentry
**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.**
For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.
-->

## Solaredge-Adapter für ioBroker

Rufen Sie Daten vom SolarEdge-Überwachungsportal ab. Derzeit wird nur der Datenpunkt „/overview“ verwendet, um die aktuelle Leistung sowie die Energiewerte für Tag, Monat, Jahr und die gesamte Lebensdauer zu erhalten.

Sie können auch Modbus auf Ihrem SolarEdge-Gerät aktivieren, sofern es sich um ein neueres Modell handelt, und die Daten direkt auslesen.

Sie benötigen Ihre Website-ID und Ihren API-Schlüssel, um diesen Adapter zu verwenden. Diese erhalten Sie unter <https://monitoring.solaredge.com>

- Website-ID: Nach dem Einloggen wird die Website-ID als „ID“ rechts angezeigt, z. B. 12345.
- API-Schlüssel: Melden Sie sich an, gehen Sie zu den Administratoreinstellungen und aktivieren Sie dort den API-Zugriff. Falls die Administratoreinstellungen nicht angezeigt werden, senden Sie eine E-Mail an SolarEdge, um die Administratorrechte für Ihr Konto freizuschalten.

## Credits

Dieser Adapter wäre ohne die großartige Arbeit von @92lleo ( <https://github.com/92lleo> ) nicht möglich gewesen, der den Code für die ersten Versionen geschrieben und ihn an ioborker-community-adapters veröffentlicht hat.

<!--
	### **WORK IN PROGRESS**
-->

## Changelog

### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now
- (iobroker-bot) Adapter requires node.js >= 20 now.
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (copilot) Adapter requires admin >= 7.6.17 now

### 1.4.1 (2024-04-28)
* (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 1.3.0 (2024-02-15)
* (mcm1957) BREAKING: adapter requires node.js 18 or newer now.
* (mcm1957) Adapter translations have been linked to weblate.
* (mcm1957) Dependencies have been updated.

### 1.2.2 (2023-12-14)
* (bluefox) Added random seconds to the schedule
* (bluefox) Updated packages
* (bluefox) Allowed adapter execution by restart

### 1.2.0 (2023-12-06)
* (mcm1957) Adapter did not terminate in case of an exception. This has been fixed.
* (mcm1957) A response timeout has been added to network calls.
* (mcm1957) Adapter has been moved to iobroker-community-adapters organization
* (mcm1957) Dependencies have been updated

### 1.1.0 (2023-11-16)
* (bluefox) Added the current power flow data

### 1.0.1 (2023-08-18)
* (bluefox) Added JSON config and replaced `require` module with `axios`

### 0.3.0
* (Apollon77) Address review feedback from adapter review (see #19)

### 0.2.0
* (92lleo) Add default values for native config vars
* (92lleo) Set schedule to 15s to match api update rate
* (92lleo) Fix updating already created states (broken since new js-controller, see #9)
* (92lleo) Update dependencies
* (92lleo) Clear timer on unload
* (92lleo) Add a connection type and dataSource

### 0.1.1
* (92lleo) fix "object data is invalid" issue, now works with new js-controller
* (92lleo) update dependencies

### 0.1.0
* (92lleo) first beta release. overview data from inteverters are available

### 0.0.1
* (92lleo) initial release

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/ioBroker.solaredge/blob/master/CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>
Copyright (c) 2019-2023 Leonhard Kuenzler <leonhard@kuenzler.io>

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