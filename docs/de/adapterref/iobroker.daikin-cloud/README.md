---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.daikin-cloud/README.md
title: ioBroker.daikin-cloud
hash: +kV8LTrPXAR0CekzsC6vm/FTs5gQp256z/f2UT5NCZE=
---
![Logo](../../../en/adapterref/iobroker.daikin-cloud/admin/daikin-cloud.jpg)

![Anzahl der Installationen](http://iobroker.live/badges/daikin-cloud-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.daikin-cloud.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.daikin-cloud.svg)

# IoBroker.daikin-cloud
![Testen und freigeben](https://github.com/Apollon77/iobroker.daikin-cloud/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/daikin-cloud/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry-Berichte werden ab js-controller 3.0 verwendet.

## Daikin-Cloud-Adapter für ioBroker
Steuern Sie Daikin-Geräte, die nur mit der Daikin-Cloud / der Onecta-App verbunden sind. Der Adapter verbindet sich mit der Daikin-Cloud und fragt dort die Daten ab.

**Dieser Adapter kann mit den folgenden Node.js-Versionen installiert werden:**

* 12.19.0+
* 14.15.0+
* 16.13.0+
* Node.js 18 wird derzeit NICHT unterstützt, da die verwendete OAuth-Bibliothek dies nicht unterstützt!

## Haftungsausschluss
**Alle Produkt- und Firmennamen oder Logos sind Warenzeichen™ oder eingetragene® Warenzeichen ihrer jeweiligen Inhaber. Ihre Verwendung impliziert keine Zugehörigkeit zu oder Billigung durch sie oder verbundene Tochtergesellschaften! Dieses persönliche Projekt wird in der Freizeit betrieben und hat kein geschäftliches Ziel.** **Daikin ist eine Marke von DAIKIN INDUSTRIES, LTD.**

## Kompatibilität
Dieser Adapter sollte mit Geräten mit den Daikin WLAN-Adaptern **BRP069C4x** kompatibel sein, die über die Daikin Onecta App gesteuert werden können. Eine lokale Verbindung zu diesen Geräten ist nicht möglich!

Hinweis: Für Geräte mit älteren WLAN-Adaptern wie **BRP069A4x**, die nur von der Daikin Controller App verwendet werden können, verwenden Sie bitte stattdessen den Adapter [Daikin](https://github.com/Apollon77/ioBroker.daikin).

## Funktionalität
Die seit 2020 verkauften neueren Daikin-Geräte enthalten einen neueren WLAN-Adapter (z. B. BRP069C4x), der nur eine Verbindung zur Daikin-Cloud herstellt und lokal nicht mehr erreichbar ist. Diese Geräte können nur mit der Daikin Onecta App gesteuert werden.

Dieser Adapter ermöglicht es, zunächst (hoffentlich einmal) Token abzurufen, indem ein Proxy verwendet wird, um sich bei der Daikin Cloud anzumelden. Danach können diese Token verwendet und aktualisiert werden, um mit den Geräten zu interagieren.

Nach dem Verbinden mit dem Daikin Cloud-Konto erstellt der Adapter automatisch ein neues Gerät für jedes Gerät, das mit der Daikin Cloud verbunden ist. Alle verfügbaren Daten werden angezeigt und mehrere Zustände ermöglichen die Steuerung des Geräts.
**Bitte beachten Sie, dass die Befehlsgeschwindigkeit der Daikin-Cloud nicht mega schnell ist, was bedeutet, dass es bis zu 3 Minuten dauern kann, bis der Befehl wirklich ausgeführt wird oder Zustände aktualisiert werden!**

### Anmeldung per E-Mail/Passwort
Wenn Sie die Daikin Cloud-Anmeldeinformationen bereitstellen möchten, kann der Adapter versuchen, sich automatisch bei der Cloud anzumelden. Die E-Mail und das Passwort werden verschlüsselt in der Konfiguration gespeichert.

Es kann vorkommen, dass dieser Vorgang nicht funktioniert, weil Sie auf der Daikin Website ein Captcha lösen müssen. In dieser Dose können Sie den folgenden Trick anwenden:

* Starten Sie den Proxy über die Adapter-Konfiguration im Admin
* Klicken Sie im Proxy-Popup auf den QR-Code
* Sie müssen das Zertifikat **nicht** importieren!
* Klicken Sie einfach auf den Link „Anmelden bei der Daikin Cloud, um die Token abzurufen“ am Ende der Anleitungsseite, melden Sie sich dort einmal an und lösen Sie das Captcha.
* Schließen Sie das Browserfenster und starten Sie den Adapter neu

### Anmeldung über Proxy
**Weitere Informationen zum Proxy-Fortschritt für Endbenutzer - weil Sie Zertifikaten und dergleichen vertrauen und auf die Whitelist setzen müssen - finden Sie in [PROXY.md](PROXY.md)!** Info: Dieses Projekt greift nicht auf Benutzernamen oder Passwörter zu, sondern nur auf die Token erstellt, nachdem Sie sich angemeldet haben. Das bedeutet auch, dass Sie diesen Vorgang erneut durchführen müssen, wenn Daikin Token zurücksetzt oder abläuft!

## Haftungsausschluss
**Daikin ist ein Warenzeichen von DAIKIN INDUSTRIES, LTD. Ich werde in keiner Weise von DAIKIN INDUSTRIES, LTD. oder verbundenen Tochtergesellschaften, Logos oder Marken unterstützt oder bin mit ihnen verbunden. Dieses persönliche Projekt wird in der Freizeit gepflegt.**

## Changelog
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

Copyright (c) 2022 Apollon77 <iobroker@fischer-ka.de>

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