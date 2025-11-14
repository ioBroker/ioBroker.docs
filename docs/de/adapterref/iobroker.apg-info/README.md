---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.apg-info/README.md
title: ioBroker.apg-info
hash: /jy4O1qaZHoOv/kGR7OZoKXOSS2F1t7QxxflAn4JrX0=
---
![Logo](../../../en/adapterref/iobroker.apg-info/admin/apg-info.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.apg-info.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/apg-info-stable.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.apg-info.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/apg-info-installed.svg)
![Abhängigkeitsstatus](https://img.shields.io/librariesio/release/npm/iobroker.apg-info)
![Bekannte Schwachstellen](https://snyk.io/test/github/HGlab01/ioBroker.apg-info/badge.svg)
![NPM](https://nodei.co/npm/iobroker.apg-info.png?downloads=true)

# IoBroker.apg-info
[![FOSSA-Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.apg-info.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.apg-info?ref=badge_shield) ![Test und Freigabe](https://github.com/HGlab01/ioBroker.apg-info/workflows/Test%20and%20Release/badge.svg)

## Apg-info-Adapter für ioBroker
Dieser Adapter liefert die Spitzenzeiten des österreichischen Stromnetzes (nur österreichische Werte!), in denen der Stromverbrauch vermieden werden soll. Zusätzlich stellt er die PHELIX Day-Ahead-Preise (EPEX Spot) für Österreich, die Schweiz und Deutschland bereit (konfigurierbar in den Adaptereinstellungen). Providergebühren, Steuern und Netzkosten können optional in der Konfiguration (Registerkarte „Berechnung“) hinzugefügt werden.

`[..].marketprice.today.jsonChart` und `[..].marketprice.tomorrow.jsonChart` können mit https://github.com/Scrounger/ioBroker.vis-materialdesign#json-chart verwendet werden.

In der Standardkonfiguration läuft der Adapter um 00:00, 13:00 und 15:00 Uhr. Es wird dringend empfohlen, den Lauf um 00:00 Uhr nicht zu deaktivieren, da sonst der Tageswechsel (morgen → heute) nicht korrekt funktioniert.

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!

## Erfordert
* Node.js 20 oder höher
* ioBroker-Host (js-Controller) 5.0 oder höher

## Viertelstündliche Marktpreise
Diese Marktpreise werden von Exaa erfasst und zur Sicherung von Entsoe bereitgestellt. Daher wird empfohlen, *ein Entsoe-Token anzufordern*, wenn viertelstündliche Preise konfiguriert sind.

## Schweizer Markt
Für den Schweizer Markt wird ein Token von entsoe.eu benötigt. Bitte fügen Sie Ihren Token in der Adapterkonfiguration auf der Registerkarte „ENTSOE TOKEN“ hinzu.

## Wie man ein Entsoe-Token erhält
Registrieren Sie sich auf der Seite https://transparency.entsoe.eu/ und senden Sie anschließend eine E-Mail an transparency@entsoe.eu, in der Sie um RESTFUL-API-Zugriff für die von Ihnen registrierte E-Mail-Adresse bitten.<br> Weitere Details finden Sie unter https://transparency.entsoe.eu/content/static_content/Static%20content/web%20api/Guide.html#_authentication_and_authorisation

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### 0.1.24 (2025-11-05)
* (HGlab01) Provider Entsoe is used as backup for quarter-hourly market prices. Request a token to be on the safe side
* (HGlab01) Bump axios to 1.13.1
* (HGlab01) Bump iobroker-jsonexplorer to 0.2.2

### 0.1.23 (2025-10-29)
* (HGlab01) extend to two market data providers for quarter-hourly market prices
* (HGlab01) add turn on/off quarter-hourly and hourly market prices
* (HGlab01) refactorings

### 0.1.22 (2025-10-21)
* (HGlab01) Implement retry mechanism for API calls
* (HGlab01) add turn on/off for peak hours and market prices

### 0.1.21 (2025-10-13)
* (HGlab01) Support quater-hourly tarifs
* (HGlab01) Bump iobroker-jsonexplorer to 0.2.1

### 0.1.20 (2025-10-06)
* (HGlab01) prepeare iobroker-jsonexplorer readiness for v0.2.0
* (HGlab01) Bump axios to 1.12.2

## License
MIT License

Copyright (c) 2025 HGlab01 <myiobrokeradapters@gmail.com>

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

#### Disclaimer apg-powermonitor
More about the security of supply & all data, facts and figures regarding the world of electricity and the energy transition can be found at www.apg-powermonitor.at.


[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.apg-info.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.apg-info?ref=badge_large)