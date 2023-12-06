---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.solaredge/README.md
title: ioBroker.solaredge
hash: Uv/BNDX4bW4701AQMXPQLGoV5zYgoXQHED+G7shQuY0=
---
![Logo](../../../en/adapterref/iobroker.solaredge/admin/solaredge.png)

![GitHub-Lizenz](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.solaredge)
![Downloads](https://img.shields.io/npm/dm/iobroker.solaredge.svg)
![GitHub-Repo-Größe](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.solaredge)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.solaredge)
![GitHub-Commits seit der letzten Veröffentlichung (nach Datum)](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.solaredge/latest)
![GitHub letzter Commit](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.solaredge)
![GitHub-Probleme](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.solaredge)
![NPM-Version](http://img.shields.io/npm/v/iobroker.solaredge.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/solaredge-stable.svg)
![Anzahl der Installationen](https://iobroker.live/badges/solaredge-installed.svg)

# IoBroker.solaredge
[![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/solaredge/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)</br> </br> **Version:** </br> </br> **Tests:** </br> [![Test und Veröffentlichung](https://github.com/iobroker-community-adapters/ioBroker.solaredge/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.solaredge/actions/workflows/test-and-release.yml) [![CodeQL](https://github.com/iobroker-community-adapters/ioBroker.solaredge/actions/workflows/codeql.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.solaredge/actions/workflows/codeql.yml)

<!--

## Sentry **Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.
->
## Solaredge-Adapter für ioBroker
Erhalten Sie Daten vom Solaredge-Überwachungsportal.
Derzeit wird nur der Datenpunkt /overview verwendet, um die aktuellen Leistungs- und Tages-/Monats-/Jahres-/Lebensenergiewerte abzurufen.

Sie können Modbus auch auf Ihrem Solaredge-Gerät aktivieren, wenn es neuer ist, und die Daten direkt auslesen.

Sie benötigen Ihre Site-ID und Ihren API-Schlüssel, um diesen Adapter verwenden zu können. Um diese zu erhalten, gehen Sie zu https://monitoring.solaredge.com

- Site-ID: Melden Sie sich an, Site-ID ist die „ID“ auf der rechten Seite, z. B. 12345.
- API-Schlüssel: Melden Sie sich an, gehen Sie zu den Admin-Einstellungen und aktivieren Sie dort den API-Zugriff. Wenn Sie keine Administratoreinstellungen sehen, senden Sie eine E-Mail an Solaredge, um den Administrator für Ihr Konto zu aktivieren.

## Credits
Dieser Adapter wäre ohne die großartige Arbeit von @92lleo (https://github.com/92lleo) nicht möglich gewesen, der den Code für die ersten Versionen geschrieben und ihn für ioborker-community-adapters freigegeben hat.

<!--

### **ARBEIT IN ARBEIT** -->

## Changelog
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

## License
MIT License

Copyright (c) 2023 iobroker-community-adapters <mcm57@gmx.at>
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