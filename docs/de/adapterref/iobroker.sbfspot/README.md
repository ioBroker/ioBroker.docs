---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sbfspot/README.md
title: ioBroker.sbfspot
hash: aRPjSp2Uew4cSHXWSMkuPbHNj+wFJqEN6ZNnuXQmpJQ=
---
![Logo](../../../en/adapterref/iobroker.sbfspot/admin/sbfspot.png)

![Anzahl der Installationen](http://iobroker.live/badges/sbfspot-stable.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.sbfspot.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.sbfspot.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/rg-engineering/ioBroker.sbfspot/badge.svg)
![GitHub Actions](https://github.com/rg-engineering/ioBroker.sbfspot/workflows/Test%20and%20Release/badge.svg)
![NPM](https://nodei.co/npm/iobroker.sbfspot.png?downloads=true)
![node-lts](https://img.shields.io/node/v-lts/iobroker.sbfspot?style=flat-square)
![Libraries.io-Abhängigkeitsstatus für die neueste Version](https://img.shields.io/librariesio/release/npm/iobroker.sbfspot?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/rg-engineering/ioBroker.sbfspot?style=flat-square)
![GitHub-Repository-Größe](https://img.shields.io/github/repo-size/rg-engineering/ioBroker.sbfspot?logo=github&style=flat-square)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/rg-engineering/ioBroker.sbfspot?logo=github&style=flat-square)
![Letzter Commit auf GitHub](https://img.shields.io/github/last-commit/rg-engineering/ioBroker.sbfspot?logo=github&style=flat-square)
![GitHub-Probleme](https://img.shields.io/github/issues/rg-engineering/ioBroker.sbfspot?logo=github&style=flat-square)

# ioBroker.sbfspot

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

**Wenn es Ihnen gefällt, erwägen Sie bitte eine Spende:**

[![PayPal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=34ESBMJ932QZC)

Dieser Adapter liest Daten von SMA-Wechselrichtern mithilfe von sbfspot. Nun werden beide Datenbanktypen (MySQL und SQLite) unterstützt. Seit Version 0.2.3 steht ein eigenes, auf Flot basierendes VIS-Widget zur Anzeige historischer Daten zur Verfügung.

## Installation / Aktualisierung

Bitte folgen Sie den Installationsanweisungen für SBFSpot unter <https://github.com/SBFspot/SBFspot/wiki>

In /opt/iobroker/node\_modules/iobroker.sbfspot/lib/scripts finden Sie Skripte zur Installation und Aktualisierung von SBFspot auf Debian-basierten Systemen.

## Hinweise

- Verwenden Sie die neueste Version von sbfspot von <https://github.com/SBFspot/SBFspot>
- Adapter, sbfspot und Datenbanken (MySQL oder SQLite) müssen auf demselben System laufen, z. B. einem Raspberry Pi.
- Die Installationsanleitung für sbfspot auf Raspberry Pi (oder ähnlichen Systemen) finden Sie unter <https://github.com/SBFspot/SBFspot/wiki/Installation-Linux-SQLite> oder <https://www.rg-engineering.eu/index.php/produkte/software/plugin-fuer-iobroker-sbfspot>
- Für Raspberry Pi ist ein halbautomatisches Konfigurationstool unter <https://github.com/SBFspot/sbfspot-config> verfügbar.

## bekannte Probleme

- Bitte erstellt Issues auf [GitHub](https://github.com/rg-engineering/ioBroker.sbfspot/issues) , wenn ihr Fehler findet oder neue Funktionen wünscht.

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 5.0.7 (2026-07-09)
* (copilot) Adapter requires node.js >= 22 now
* (René) update dependencies
* (René) changes based on adapter checker

### 5.0.6 (2026-04-06)
* (René) changes based on adapter checker

### 5.0.5 (2026-03-17)
* (René) update dependencies + changes based on adapter checker

### 5.0.4 (2025-10-26)
* (René) bug fix sentry

### 5.0.3 (2025-10-21)
* (René) see issue #510: read interval minimum reduced to 1 minute
* (René) update dependencies + changes based on adapter checker

[Older changelogs can be found there](https://github.com/rg-engineering/ioBroker.sbfspot/blob/master/CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2017-2026 René G. <info@rg-engineering.eu>

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