---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.daikin-cloud/README.md
title: ioBroker.daikin-cloud
hash: cSKtpMuG2tBxU9KOMdGSFWUyWjlyg0ikhHEA6FvDiO0=
---
![Logo](../../../en/adapterref/iobroker.daikin-cloud/admin/daikin-cloud.jpg)

![Anzahl der Installationen](http://iobroker.live/badges/daikin-cloud-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.daikin-cloud.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.daikin-cloud.svg)

# IoBroker.daikin-cloud
![Test und Freigabe](https://github.com/Apollon77/iobroker.daikin-cloud/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/daikin-cloud/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

## Daikin-Cloud-Adapter für ioBroker
Steuern Sie Daikin-Geräte, die nur mit der Daikin Cloud/der Onecta-App verbunden sind. Der Adapter verbindet sich mit der Daikin-Cloud und fragt die Daten von dort ab.

## Haftungsausschluss
**Alle Produkt- und Firmennamen oder Logos sind Marken™ oder eingetragene® Marken ihrer jeweiligen Inhaber. Deren Nutzung impliziert keinerlei Zugehörigkeit zu oder Billigung durch sie oder verbundene Tochtergesellschaften! Dieses persönliche Projekt wird in der Freizeit gepflegt und hat kein geschäftliches Ziel.** **Daikin ist eine Marke von DAIKIN INDUSTRIES, LTD.**

## Kompatibilität
Dieser Adapter sollte mit Geräten mit den Daikin WLAN-Adaptern **BRP069C4x** kompatibel sein, die über die Daikin Onecta App gesteuert werden können. Eine lokale Verbindung zu diesen Geräten ist nicht möglich!

Hinweis: Für Geräte mit älteren WLAN-Adaptern wie **BRP069A4x**, die nur von der Daikin Controller App verwendet werden können, verwenden Sie bitte stattdessen den [Daikin](https://github.com/Apollon77/ioBroker.daikin)-Adapter.

## Funktionalität
Die neueren Daikin-Geräte, die seit 2020 verkauft werden, enthalten einen neueren WLAN-Adapter (z. B. BRP069C4x), der nur eine Verbindung zur Daikin-Cloud herstellt und nicht mehr lokal erreichbar ist. Diese Geräte sind nur mit der Daikin Onecta App steuerbar.

Mit diesem Adapter können Sie zunächst (hoffentlich einmal) Token abrufen, indem Sie einen Proxy verwenden, um sich bei der Daikin Cloud anzumelden. Danach können diese Token verwendet und aktualisiert werden, um mit den Geräten zu interagieren.

Nach der Verbindung mit dem Daikin Cloud-Konto erstellt der Adapter automatisch ein neues Gerät für jedes Gerät, das mit der Daikin Cloud verbunden ist. Alle verfügbaren Daten werden angezeigt und mehrere Zustände ermöglichen die Steuerung des Geräts.
**Bitte beachten Sie, dass die Befehlsgeschwindigkeit der Daikin-Cloud nicht besonders hoch ist, was bedeutet, dass es bis zu 3 Minuten dauern kann, bis der Befehl tatsächlich ausgeführt oder Zustände aktualisiert werden!**

### Anmeldung per E-Mail/Passwort
Wenn Sie die Daikin Cloud-Anmeldeinformationen angeben möchten, kann der Adapter versuchen, sich automatisch bei der Cloud anzumelden. E-Mail und Passwort werden verschlüsselt in der Konfiguration gespeichert.

Es kann vorkommen, dass dieser Vorgang nicht funktioniert, da die Daikin-Website Sie zum Lösen eines Captchas auffordert. In dieser Dose können Sie folgenden Trick anwenden:

* Starten Sie den Proxy über die Adapterkonfiguration im Admin
* Klicken Sie im Proxy-Popup auf den QR-Code
* Sie müssen das Zertifikat **nicht** importieren!
* Klicken Sie einfach auf den Link „Bei der Daikin Cloud anmelden, um die Token abzurufen“ am Ende der Anleitungsseite, melden Sie sich dort einmal an und lösen Sie das Captcha.
* Schließen Sie das Browserfenster und starten Sie den Adapter neu

### Anmeldung über Proxy
**Weitere Informationen zum Proxy-Fortschritt für Endbenutzer – da Sie Zertifikaten und Ähnlichem vertrauen und sie auf die Whitelist setzen müssen – finden Sie in [PROXY.md](PROXY.md)!** Info: Dieses Projekt ergreift keinen Benutzernamen oder kein Passwort, sondern nur die Nachdem Sie sich angemeldet haben, werden Token erstellt. Dies bedeutet auch, dass Sie diesen Vorgang erneut durchführen müssen, wenn Daikin Token zurücksetzt oder diese ablaufen!

## Haftungsausschluss
**Daikin ist eine Marke von DAIKIN INDUSTRIES, LTD. Ich werde in keiner Weise von DAIKIN INDUSTRIES, LTD. oder damit verbundenen Tochtergesellschaften, Logos oder Marken unterstützt oder bin mit ihnen verbunden. Dieses persönliche Projekt wird in der Freizeit gepflegt.**

## Changelog

### __WORK IN PROGRESS__
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

Copyright (c) 2022-2023 Apollon77 <iobroker@fischer-ka.de>

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