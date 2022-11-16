---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.youtube/README.md
title: ioBroker.youtube
hash: IOhfJ47zSLRGKRWKjC9AATMBzCvbkfs3GYWxcqohtHc=
---
![Logo](../../../en/adapterref/iobroker.youtube/admin/youtube.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.youtube?style=flat-square)
![Downloads](https://img.shields.io/npm/dm/iobroker.youtube?label=npm%20downloads&style=flat-square)
![Snyk-Schwachstellen für das npm-Paket](https://img.shields.io/snyk/vulnerabilities/npm/iobroker.youtube?label=npm%20vulnerabilities&style=flat-square)
![Knoten-lts](https://img.shields.io/node/v-lts/iobroker.youtube?style=flat-square)
![Libraries.io-Abhängigkeitsstatus für die neueste Version](https://img.shields.io/librariesio/release/npm/iobroker.youtube?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/klein0r/iobroker.youtube?style=flat-square)
![GitHub-Repo-Größe](https://img.shields.io/github/repo-size/klein0r/iobroker.youtube?logo=github&style=flat-square)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/klein0r/iobroker.youtube?logo=github&style=flat-square)
![GitHub letzter Commit](https://img.shields.io/github/last-commit/klein0r/iobroker.youtube?logo=github&style=flat-square)
![GitHub-Probleme](https://img.shields.io/github/issues/klein0r/iobroker.youtube?logo=github&style=flat-square)
![GitHub-Workflow-Status](https://img.shields.io/github/workflow/status/klein0r/iobroker.youtube/Test%20and%20Release?label=Test%20and%20Release&logo=github&style=flat-square)
![Snyk-Schwachstellen für GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/klein0r/iobroker.youtube?label=repo%20vulnerabilities&logo=github&style=flat-square)
![Beta](https://img.shields.io/npm/v/iobroker.youtube.svg?color=red&label=beta)
![Stabil](http://iobroker.live/badges/youtube-stable.svg)
![Eingerichtet](http://iobroker.live/badges/youtube-installed.svg)

# IoBroker.youtube
## Versionen
Statistiken wie Aufrufe, Abonnenten und Videos

## Gefördert durch
[![ioBroker Master Kurs](https://haus-automatisierung.com/images/ads/ioBroker-Kurs.png)](https://haus-automatisierung.com/iobroker-kurs/?refid=iobroker-youtube)

## Installation
Bitte verwenden Sie die "Adapterliste" in ioBroker, um eine stabile Version dieses Adapters zu installieren. Sie können diesen Adapter auch über die CLI installieren:

```
iobroker add youtube
```

## Aufbau
Um einen API-Key zu erhalten, müssen Sie zu [console.developers.google.com](https://console.developers.google.com/apis/dashboard) gehen.

1. Erstellen Sie ein neues Projekt
2. Erstellen Sie einen neuen API-Schlüssel
3. Fügen Sie „YouTube Data API v3“ der Bibliothek hinzu
4. Verwenden Sie diesen API-Schlüssel im Optionsfeld
5. Fügen Sie auf der Registerkarte „Kanäle“ mehrere Kanäle hinzu, indem Sie die ID und einen benutzerdefinierten Namen verwenden

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**

* (klein0r) Dropped Admin 5 support

### 4.0.0 (2022-05-29)

NodeJS 14.x is required (NodeJS 12.x is EOL)

* (klein0r) Fixed last update time

### 3.0.1 (2022-03-17)

* (klein0r) Just perform video info request if previous request was successful
* (klein0r) Improved error handling when API key is missing
* (klein0r) Updated logging

### 3.0.0 (2022-02-12)

* (klein0r) Updated state roles
* (klein0r) Added hint for Admin 4 configuration

### 2.0.4 (2021-12-23)

* (klein0r) Translated all objects
* (klein0r) Updated dependencies

### 2.0.3 (2021-11-07)

* (klein0r) Fixed missing VIS widget

## License

The MIT License (MIT)

Copyright (c) 2022 Matthias Kleine <info@haus-automatisierung.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.