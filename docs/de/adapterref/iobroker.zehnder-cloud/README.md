---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.zehnder-cloud/README.md
title: ioBroker.zehnder-cloud
hash: z0/lwnjDgEIGsMR6+GhY2Zd6+AuHWZdbdc2+Btfrr08=
---
![Logo](../../../en/adapterref/iobroker.zehnder-cloud/admin/zehnder-cloud.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.zehnder-cloud.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.zehnder-cloud.svg)
![Anzahl der Installationen (aktuell)](https://iobroker.live/badges/zehnder-cloud-installed.svg)
![Anzahl Installationen (stabil)](https://iobroker.live/badges/zehnder-cloud-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/TA2k/iobroker.zehnder-cloud.svg)
![NPM](https://nodei.co/npm/iobroker.zehnder-cloud.png?downloads=true)

# IoBroker.zehnder-cloud
**Tests:** ![Test und Freigabe](https://github.com/TA2k/ioBroker.zehnder-cloud/workflows/Test%20and%20Release/badge.svg)

## Zehnder-Cloud-Adapter für ioBroker
Adapter für Zehnder Cloud API

## Loginablauf
1. https://developer.beta.zehnder.cloud/profile

   Registrieren Sie sich in der zehnder Cloud und erstellen Sie ein Abonnement. Kopieren Sie den Primärschlüssel in die Adaptereinstellungen

2. https://mydevices.beta.zehnder.cloud/customer/settings/application

API-Schlüssel erstellen Geben Sie den API-Namen und den API-Schlüssel in den Adaptereinstellungen ein

## Diskussion und Fragen
<https://forum.iobroker.net/topic/47856/test-adapter-zehnder-cloud-v-0-0-1>

## Changelog

### 2.0.0

- (TA2k) switch to new api from zehnder

### 0.0.8

- (TA2k) improve error messages

### 0.0.3

- (TA2k) initial release

## License

MIT License

Copyright (c) 2022 TA2k <tombox2020@gmail.com>

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