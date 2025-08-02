---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.foobar2000/README.md
title: iobroker.foobar2000
hash: FHzzUUNQWfab64uspZV5k99ssaQCOnUV9MNaunZnp2s=
---
![Logo](../../../en/adapterref/iobroker.foobar2000/admin/foobar2000.png)

![GitHub-Lizenz](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.foobar2000)
![Downloads](https://img.shields.io/npm/dm/iobroker.foobar2000.svg)
![GitHub-Repo-Größe](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.foobar2000)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.foobar2000)
![GitHub-Commits seit der letzten Veröffentlichung (nach Datum)](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.foobar2000/latest)
![GitHub letzter Commit](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.foobar2000)
![GitHub-Probleme](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.foobar2000)
![NPM-Version](http://img.shields.io/npm/v/iobroker.foobar2000.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/foobar2000-stable.svg)
![Anzahl der Installationen](https://iobroker.live/badges/foobar2000-installed.svg)

# Iobroker.foobar2000
[![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/foobar2000/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)</br> </br> **Version:** </br> </br> **Tests:** </br> [![Test und Veröffentlichung](https://github.com/iobroker-community-adapters/ioBroker.foobar2000/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.foobar2000/actions/workflows/test-and-release.yml) [![CodeQL](https://github.com/iobroker-community-adapters/ioBroker.foobar2000/actions/workflows/codeql.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.foobar2000/actions/workflows/codeql.yml)

<!--

## Sentry **Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.
->
## Foobar2000-Adapter für iobroker
![Admin-Einstellungen.](../../../en/adapterref/iobroker.foobar2000/admin/admin.png)

## Verwenden
Um den Player zu steuern, müssen Sie das Plugin [foo_httpcontrol](https://bitbucket.org/oblikoamorale/foo_httpcontrol/downloads/) installieren.
Um das Cover als Link zu einer Datei anzuzeigen, ändern Sie in der Datei ```c:\Users\{USER}\AppData\Roaming\foobar2000\foo_httpcontrol_data\foobar2000controller\config``` den Parameter ```albumart_prefer_embedded = 0```

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.1.0 (2023-11-07)
* (mcm1957) Adapter requires nodejs16 or newer now.
* (mcm1957) Adapter has been moved to iobroker-community-adapters organization.
* (mcm1957) Dependencies have been updated.

### 2.0.4
* (instalator) fixed error

### 2.0.3
* (instalator) fixed admin error

### 2.0.2
* (instalator) fixed error

### 2.0.0
* (instalator) Completely rewritten

### 1.0.0
* (instalator) Up to stable

### 0.2.0
* (instalator) Change for widgets vis-players

### 0.1.2
* (instalator) del widgets folders
* (instalator) change log level
* (instalator) add news object

### 0.1.1
* (instalator) fix start, exit for local

### 0.1.0
* (instalator) beta (20.10.2016)

### 0.0.1
* (instalator) initial (12.10.2016)

## License
The MIT License (MIT)

Copyright (c) 2023 iobroker-community-adapters <mcm57@gmx.at>
Copyright (c) 2021 instalator <vvvalt@mail.ru>

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