---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.daikin-cloud/README.md
title: ioBroker.daikin-cloud
hash: fc+lDvniOI9v/PO4rz0DAdRWjY9t8XW07zgPlvQiPIU=
---
![Logo](../../../en/adapterref/iobroker.daikin-cloud/admin/daikin-cloud.jpg)

![Anzahl der Installationen](http://iobroker.live/badges/daikin-cloud-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.daikin-cloud.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.daikin-cloud.svg)

# IoBroker.daikin-cloud
![Testen und Freigeben](https://github.com/Apollon77/iobroker.daikin-cloud/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/daikin-cloud/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 5.0 verwendet.

## Daikin-Cloud-Adapter für ioBroker
Steuern Sie Daikin-Geräte, die nur mit der Daikin-Cloud / der Onecta-App verbunden sind. Der Adapter verbindet sich mit der Daikin-Cloud und fragt die Daten von dort ab. Damit dies funktioniert, müssen Sie sich einen „Daikin Europe Developer Account“ besorgen und dort eine Anwendung erstellen. Der Adapter verwendet dann die Anmeldeinformationen dieser Anwendung, um sich mit der Daikin-Cloud zu verbinden.

## Haftungsausschluss
**Alle Produkt- und Firmennamen oder Logos sind Warenzeichen™ oder eingetragene® Warenzeichen ihrer jeweiligen Inhaber. Ihre Verwendung impliziert keine Zugehörigkeit oder Billigung durch sie oder verbundene Tochtergesellschaften! Dieses persönliche Projekt wird in der Freizeit gepflegt und verfolgt kein Geschäftsziel.** **Daikin ist ein Warenzeichen von DAIKIN INDUSTRIES, LTD.**

## Kompatibilität
Dieser Adapter soll zu Geräten mit dem Daikin WLAN-Adapter **BRP069C4x** kompatibel sein, die über die Daikin Onecta App gesteuert werden können. Eine lokale Verbindung zu diesen Geräten ist nicht möglich!

Hinweis: Für Geräte mit älteren WLAN-Adaptern wie **BRP069A4x**, die nur von der Daikin Controller App genutzt werden können, verwenden Sie bitte stattdessen den Adapter [Daikin](https://github.com/Apollon77/ioBroker.daikin).

## Funktionalität
Die neueren Daikin-Geräte, die seit 2020 verkauft wurden, enthalten einen neueren WLAN-Adapter (z. B. BRP069C4x), der sich nur mit der Daikin-Cloud verbindet und lokal nicht mehr erreichbar ist. Diese Geräte sind nur mit der Daikin Onecta App steuerbar.

Dieser Adapter ermöglicht es, zunächst (hoffentlich einmalig) Token mithilfe des persönlichen Entwicklerkontos und eines einmaligen Login-Flows abzurufen. Danach können diese Token verwendet und aktualisiert werden, um mit den Geräten zu interagieren.

Nach der Verbindung mit dem Daikin Cloud-Konto erstellt der Adapter automatisch ein neues Gerät für jedes Gerät, das mit der Daikin Cloud verbunden ist. Alle verfügbaren Daten werden angezeigt und verschiedene Zustände ermöglichen die Steuerung des Geräts.
**Bitte beachten Sie, dass die Befehlsgeschwindigkeit der Daikin Cloud nicht megaschnell ist, was bedeutet, dass es bis zu 3 Minuten dauern kann, bis der Befehl tatsächlich ausgeführt wird oder Zustände aktualisiert werden!**

Darüber hinaus gibt es für die Daikin Cloud API eine Ratenbegrenzung von 200 Anfragen pro Tag. Beachten Sie deshalb die folgenden Best Practices:

* Ein Standardabfrageintervall von 15 Minuten sollte für die meisten Anwendungsfälle ausreichend sein und gleichzeitig etwas Spielraum für die Steuerung der Geräte lassen. Bedenken Sie, dass jede Steuerungsaktion zwei Anfragen erfordert (eine zur Steuerung, eine zum Aktualisieren der Daten 1 Minute nach dem Steuerungsaufruf). Insbesondere bei vielen Geräten kann dies wirklich problematisch werden.
* Der Adapter unterstützt auch „Slow Polling“, wobei Sie ein eigenes Intervall definieren können. Verwenden Sie den Status „useSlowPolling“, um das langsame Polling je nach Bedarf zu aktivieren oder zu deaktivieren (z. B. nachts nur stündlich abfragen ...)
* Idealerweise sollten zwischen dem Umschalten des Gerätestromzustands mindestens 10 Minuten vergehen, da dies sonst die beweglichen Teile des Geräts schädigt.

Die aktuellen Ratenbegrenzungsdetails sind in den Ifo-Zuständen des Adapters enthalten und werden jedes Mal aktualisiert, wenn der Adapter eine Anfrage an die Daikin Cloud sendet.

## Haftungsausschluss
**Daikin ist eine Marke von DAIKIN INDUSTRIES, LTD. Ich werde in keiner Weise von DAIKIN INDUSTRIES, LTD. oder zugehörigen Tochtergesellschaften, Logos oder Marken unterstützt oder bin mit diesen verbunden. Dieses persönliche Projekt wird in meiner Freizeit gepflegt.**

## Changelog
### 0.4.10 (2024-07-20)
* (Apollon77) Fixes some error cases reported by Sentry

### 0.4.9 (2024-07-19)
* (Apollon77) Optimized write handling

### 0.4.8 (2024-07-12)
* (Apollon77) Optimized handling of rate limits, block maximum 24h and retry then
* (Apollon77) Added option to prevent sending the same values again (prevented by default!)

### 0.4.7 (2024-07-09)
* (Apollon77) Handles initialization issue where objects could be deleted wrongly
* (Apollon77) Also check for HTTPS usage when returning the redirect URL

### 0.4.6 (2024-07-07)
* (Apollon77) Update dependencies with optimizations and second blocking layer for rate limiting

### 0.4.5 (2024-07-06)
* (Apollon77) Block communication when rate limited according to Daikin response

### 0.4.4 (2024-07-06)
* (Apollon77) Fix initialization retry schedule

### 0.4.3 (2024-07-05)
* IMPORTANT: Minimum Node.js version is 18.2
* (Apollon77) BREAKING: Adjusted to new Daiking Cloud API - You need to reauthenticate!
* (Apollon77) BREAKING: New rate limit of new API is 200 requests per day!! Adjust your usage!
* (Apollon77) Added option to set "slow polling" interval
* (Apollon77) Make electrical data available as states (arrays for now)
* (Apollon77) Restore last data updated timestamp
* (Apollon77) Make sure cloudConnection always contains a boolean
* (Apollon77) Refresh token also when error is "Refresh Token has expired"

### 0.3.0 (2023-08-23)
* (Apollon77) Make compatible with Node.js 18+ too
* (Apollon77) Adjust name fallback

### 0.2.3 (2022-09-12)
* (Apollon77) Clear the tokenset when email or password is changed in config

### 0.2.2 (2022-08-13)
* (Apollon77) Add naming support for devices using old WLAN adapters but updated for Onecta

### 0.2.1 (2022-07-03)
* (Apollon77) Fix the device info and count for connected devices in Admin UI

### 0.2.0 (2022-06-30)
* (Apollon77) Add name lookup for Altherma devices
* (Apollon77) Send data to Sentry on unknown device types

### 0.1.4 (2022-06-28)
* (Apollon77) Adjust logging on Login to be more clear

### 0.1.3 (2022-06-03)
* (Apollon77/Garfonso) Optimizations and fixes

### 0.1.2 (2022-05-27)
* (Apollon77) Prevent crash reported by Sentry

### 0.1.1 (2022-05-23)
* (Apollon77) Add Sentry for crash reporting

### 0.1.0 (2022-05-23)
* (Apollon77) initial release

## License
MIT License

Copyright (c) 2022-2024 Apollon77 <iobroker@fischer-ka.de>

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