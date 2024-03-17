---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.uv-protect/README.md
title: ioBroker.uv-protect
hash: oJGzwHOEJDJyVKj9Xs2iXkHpz8Z1N9WYYteeHKPEEYY=
---
![Logo](../../../en/adapterref/iobroker.uv-protect/admin/uv-protect.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.uv-protect.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.uv-protect.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/uv-protect-installed.svg)
![Anzahl Installationen (stabil)](http://iobroker.live/badges/uv-protect-stable.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/simatec/ioBroker.uv-protect/badge.svg)
![Lizenz](https://img.shields.io/github/license/simatec/ioBroker.uv-protect?style=flat)
![Spenden](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)

# IoBroker.uv-protect
![Test und Freigabe](https://github.com/simatec/ioBroker.uv-protect/workflows/Test%20and%20Release/badge.svg)

## UV-Protect-Adapter für ioBroker
UV-Protect von openUV-API

**************************************************************************************************************

## Unterstützen Sie die Adapterentwicklung **Wenn es Ihnen gefällt, denken Sie bitte über eine Spende nach:**
[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mk1676)

**************************************************************************************************************

### Was ist Sentry.io und was wird an die Server dieses Unternehmens gemeldet?
Sentry.io ist ein Dienst für Entwickler, um einen Überblick über Fehler in ihren Anwendungen zu erhalten. Und genau das ist in diesem Adapter umgesetzt.

Wenn der Adapter abstürzt oder ein anderer Codefehler auftritt, wird diese Fehlermeldung, die auch im ioBroker-Protokoll erscheint, an Sentry übermittelt. Wenn Sie der iobroker GmbH erlaubt haben, Diagnosedaten zu sammeln, ist auch Ihre Installations-ID (dies ist nur eine eindeutige ID **ohne** zusätzliche Informationen über Sie, E-Mail, Name oder ähnliches) enthalten. Dadurch kann Sentry Fehler gruppieren und anzeigen, wie viele einzelne Benutzer von einem solchen Fehler betroffen sind. All dies hilft mir, fehlerfreie Adapter bereitzustellen, die praktisch nie abstürzen.

**************************************************************************************************************

## Changelog
<!-- ### __WORK IN PROGRESS__ -->
### __WORK IN PROGRESS__
* (simatec) Dependencies updated

### 0.6.0 (2024-02-05)
* (simatec) Dependencies updated
* (simatec) gulp deleted
* (simatec) @iobroker/adapter-dev
* (simatec) Translation updated

### 0.5.1 (2023-11-02)
* (simatec) Dependencies updated

### 0.5.0 (2023-10-11)
* (simatec) Dependencies updated
* (simatec) Fix units
* (simatec) Code clean

### 0.4.2 (2023-09-05)
* (simatec) Dependencies updated
* (simatec) test and release updated
* (simatec) Translation updated

### 0.4.1 (2023-06-19)
* (simatec) Dependencies updated
* (simatec) Fix Adapter Stop

### 0.4.0 (2023-03-18)
* (simatec) Dependencies updated
* (simatec) Repo updated

### 0.3.7 (2022-11-01)
* (simatec) Fix Axios Request
* (simatec) Dependencies updated

### 0.3.6 (2022-07-11)
* (simatec) Fix Request
* (simatec) timeout added
* (simatec) Dependencies updated

### 0.3.5 (2022-02-08)
* (simatec) Fix value types
* (simatec) Fix Axios Request
* (simatec) Dependencies updated

### 0.3.4 (2021-11-17)
* (simatec) Dependencies updated
* (simatec) test and release updated

### 0.3.3 (31.07.2021)
* (simatec) Bugfix async/await function

### 0.3.2 (28.07.2021)
* (simatec) Bugfix

### 0.3.1 (28.06.2021)
* (simatec) Date / time formatted

### 0.3.0 (24.06.2021)
* (simatec) code cleaning
* (simatec) added translate to system language for states
* (simatec) Bugfix Timestamp
* (simatec) value formating
* (simatec) Dependencies updated
* (simatec) name for states updated

### 0.2.3 
* (simatec) apiKey auto encrypted

### 0.2.2
* (simatec) apiKey encrypted
* (simatec) fix async function

### 0.2.1
* (simatec) Fix for latest Repo

### 0.2.0
* (simatec) jsonConfig for Admin5 added

### 0.1.0
* (simatec) First Beta

### 0.0.1
* (simatec) initial release

## License
MIT License

Copyright (c) 2021 - 2024 simatec

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