---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.daikin-cloud/README.md
title: ioBroker.daikin-cloud
hash: F6mYvo4E6aBpGyEDB6JdzQjWJ0imE9aKjcNATYTRNBk=
---
![Logo](../../../en/adapterref/iobroker.daikin-cloud/admin/daikin-cloud.jpg)

![Anzahl der Installationen](http://iobroker.live/badges/daikin-cloud-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.daikin-cloud.svg)
![Test und Freigabe](https://github.com/Apollon77/iobroker.daikin-cloud/workflows/Test%20and%20Release/badge.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/daikin-cloud/svg-badge.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.daikin-cloud.svg)

# ioBroker.daikin-cloud

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Die Sentry-Berichterstattung wird ab js-controller 5.0 verwendet.

## daikin-cloud adapter for ioBroker

Steuern Sie Daikin-Geräte, die ausschließlich mit der Daikin Cloud bzw. der Onecta App verbunden sind. Der Adapter verbindet sich mit der Daikin Cloud und ruft die Daten von dort ab. Hierfür benötigen Sie ein „Daikin Europe Developer Account“ und müssen dort eine Anwendung erstellen. Der Adapter verwendet dann die Anmeldeinformationen dieser Anwendung, um eine Verbindung zur Daikin Cloud herzustellen.

## Haftungsausschluss

**Alle Produkt- und Firmennamen sowie Logos sind Marken™ oder eingetragene® Marken ihrer jeweiligen Inhaber. Ihre Verwendung impliziert weder eine Zugehörigkeit zu noch eine Unterstützung durch diese oder verbundene Tochtergesellschaften! Dieses private Projekt wird in der Freizeit betrieben und verfolgt keine geschäftlichen Ziele.** **Daikin ist eine Marke der DAIKIN INDUSTRIES, LTD.**

## Kompatibilität

Dieser Adapter ist kompatibel mit Geräten, die über den Daikin WLAN-Adapter **BRP069C4x** verfügen und mit der Daikin Onecta App gesteuert werden können. Eine lokale Verbindung zu diesen Geräten ist nicht möglich!

Hinweis: Bei Geräten mit älteren WLAN-Adaptern wie dem **BRP069A4x** , die nur mit der Daikin Controller App kompatibel sind, verwenden Sie bitte stattdessen den [Daikin-](https://github.com/Apollon77/ioBroker.daikin) Adapter.

## Funktionalität

Die seit 2020 verkauften neueren Daikin-Geräte verfügen über einen neueren WLAN-Adapter (z. B. BRP069C4x), der ausschließlich mit der Daikin Cloud verbunden ist und nicht mehr lokal erreichbar ist. Diese Geräte lassen sich nur mit der Daikin Onecta App steuern.

Dieser Adapter ermöglicht es, Tokens (hoffentlich einmalig) über das persönliche Entwicklerkonto und einen einmaligen Anmeldevorgang abzurufen. Anschließend können diese Tokens verwendet und aktualisiert werden, um mit den Geräten zu interagieren.

Nach der Verbindung mit dem Daikin Cloud-Konto erstellt der Adapter automatisch für jedes mit der Daikin Cloud verbundene Gerät ein neues Gerät. Alle verfügbaren Daten werden angezeigt, und verschiedene Zustände ermöglichen die Steuerung des Geräts. **Bitte beachten Sie, dass die Befehlsgeschwindigkeit der Daikin Cloud nicht extrem hoch ist. Es kann daher bis zu 3 Minuten dauern, bis ein Befehl ausgeführt oder Zustände aktualisiert werden.**

Darüber hinaus gilt für die Daikin Cloud API eine Beschränkung auf 200 Anfragen pro Tag. Bitte beachten Sie daher die folgenden Best Practices:

- Ein Standard-Abfrageintervall von 15 Minuten sollte für die meisten Anwendungsfälle ausreichend sein und gleichzeitig genügend Spielraum für die Gerätesteuerung lassen. Beachten Sie, dass jede Steuerungsaktion zwei Anfragen erfordert (eine zur Steuerung selbst, eine zur Datenaktualisierung eine Minute nach der Steuerungsanfrage). Insbesondere bei einer großen Anzahl von Geräten kann dies problematisch werden.
- Der Adapter unterstützt auch „Slow Polling“, bei dem Sie ein eigenes Intervall definieren können. Verwenden Sie den Status.`useSlowPolling` Je nach Bedarf können Sie die langsame Abfrage aktivieren oder deaktivieren (z. B. nachts nur stündlich abfragen ...).
- Idealerweise sollten zwischen dem Umschalten des Geräte-Ein-/Ausschaltstatus mindestens 10 Minuten vergehen, da dies sonst den beweglichen Teilen der Geräte schaden kann.

Die aktuellen Ratenbegrenzungsdetails sind in den Adapter-i-fo-Zuständen enthalten und werden jedes Mal aktualisiert, wenn der Adapter eine Anfrage an die Daikin Cloud sendet.

## Haftungsausschluss

**Daikin ist eine Marke der Daikin Industries, Ltd. Ich stehe in keiner Verbindung zu Daikin Industries, Ltd. oder deren Tochtergesellschaften, Logos oder Marken und werde von ihnen auch nicht unterstützt. Dieses private Projekt betreibe ich in meiner Freizeit.**

## Changelog
### 0.4.12 (2025-05-24)
* (@JeroenVdb) Always send writable entries to the device, irrelevant of status, always update local values
* (@Apollon77) Optimize role detection for some states
* (@Apollon77) Tried to prevent too luch logging of the same error in a short time on Wifi issues

### 0.4.11 (2024-10-04)
* (Apollon77) Increase communication timeout to 10s to prevent refresh issues

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

Copyright (c) 2022-2025 Apollon77 <iobroker@fischer-ka.de>

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