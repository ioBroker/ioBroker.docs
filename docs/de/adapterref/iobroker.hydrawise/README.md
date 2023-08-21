---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.hydrawise/README.md
title: ioBroker.hydrawise
hash: lSaTJihtfkiz26nPnWiPzoMyHT1HFOHgpSQj8fBk818=
---
![Logo](../../../en/adapterref/iobroker.hydrawise/admin/hydrawise.jpg)

![NPM-Version](https://img.shields.io/npm/v/iobroker.hydrawise.svg?style=flat-square)
![Downloads](https://img.shields.io/npm/dm/iobroker.hydrawise.svg?label=npm%20downloads&style=flat-square)
![Knoten-lts](https://img.shields.io/node/v-lts/iobroker.hydrawise?style=flat-square)
![Libraries.io-Abhängigkeitsstatus für die neueste Version](https://img.shields.io/librariesio/release/npm/iobroker.hydrawise?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/sentiq/iobroker.hydrawise?style=flat-square)
![GitHub-Repo-Größe](https://img.shields.io/github/repo-size/sentiq/iobroker.hydrawise?logo=github&style=flat-square)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/sentiq/iobroker.hydrawise?logo=github&style=flat-square)
![GitHub letzter Commit](https://img.shields.io/github/last-commit/sentiq/iobroker.hydrawise?logo=github&style=flat-square)
![GitHub-Probleme](https://img.shields.io/github/issues/sentiq/iobroker.hydrawise?logo=github&style=flat-square)
![GitHub-Workflow-Status](https://img.shields.io/github/actions/workflow/status/sentiq/iobroker.hydrawise/test-and-release.yml?branch=master&logo=github&style=flat-square)
![Beta](https://img.shields.io/npm/v/iobroker.hydrawise.svg?color=red&label=beta)
![Stabil](http://iobroker.live/badges/hydrawise-stable.svg)
![Eingerichtet](http://iobroker.live/badges/hydrawise-installed.svg)

# IoBroker.hydrawise
## Versionen
Integrieren Sie Ihren Hydrawise-Controller in iobroker.
Sie können alle Controller-Informationen, Zeitpläne und Sensoren sehen. Es ist auch möglich, die geplante Bewässerung um x Sekunden zu unterbrechen.

## Dokumentation
- Melden Sie sich bei https://app.hydrawise.com/config/account-details an
- Generieren Sie einen API-Schlüssel, indem Sie unter „Kontoeinstellungen“ auf „API-Schlüssel generieren“ klicken.
- Schlüssel in die Adaptereinstellungen einfügen

> **Hinweis** > Nach dem Update von 0.0.15 müssen Sie Ihren API-Schlüssel erneut eingeben

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.0.19 (2023-08-05)

-   (SentiQ) fixed button roles

### 0.0.18 (2023-08-05)

-   (SentiQ) fixed timeout

### 0.0.17 (2023-08-03)

-   (SentiQ) fixed adapter crash

### 0.0.16 (2023-08-02)

-   (SentiQ) added more information to README
-   (SentiQ) encrypted apiKey
-   (SentiQ) removed logging of apiKey
-   (SentiQ) added filtering of invalid characters in ids
-   (SentiQ) added check of ack flag
-   (SentiQ) fixed roles
-   (SentiQ) fixed error message
-   (SentiQ) removed usage of clearTimeout

### 0.0.15 (2023-06-29)

-   (SentiQ) updated dependencies

### 0.0.14 (2023-06-29)

-   (SentiQ) fixing version

### 0.0.12 (2023-06-29)

-   (SentiQ) changed value of `last_contact` to date string format

### 0.0.11 (2023-06-28)

-   (SentiQ) raised timeouts
-   (SentiQ) fixed types

### 0.0.10 (2023-06-27)

-   (SentiQ) fixed adapter crash
-   (SentiQ) changed value of `timestr` to date string format

### 0.0.9 (2023-05-25)

-   (SentiQ) added more translations

### 0.0.8 (2023-05-25)

-   (SentiQ) improved log messages

### 0.0.7 (2023-05-25)

-   (SentiQ) fixed author

### 0.0.6 (2023-05-24)

-   (SentiQ) lowered min node version to 14.5.0

### 0.0.5 (2023-05-24)

-   (SentiQ) updated packages

### 0.0.4 (2023-05-24)

-   (SentiQ) testing

### 0.0.3 (2023-05-24)

-   (SentiQ) added zone controls and Ukrainian language

### 0.0.2 (2023-05-23)

-   (SentiQ) refactoring code

### 0.0.1 (2023-01-26)

-   (aDabbelju) Initial commit by adapter creator

## License

MIT License

Copyright (c) 2023 SentiQ <fischer.yves@web.de>

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