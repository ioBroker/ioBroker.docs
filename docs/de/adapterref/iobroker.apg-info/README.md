---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.apg-info/README.md
title: ioBroker.apg-info
hash: fFIEBJshLTild/XRsvL+mjDspkm5nmMAICvK5lMkaVE=
---
![Logo](../../../en/adapterref/iobroker.apg-info/admin/apg-info.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.apg-info.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/apg-info-stable.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.apg-info.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/apg-info-installed.svg)
![Abhängigkeitsstatus](https://img.shields.io/librariesio/release/npm/iobroker.apg-info)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/HGlab01/ioBroker.apg-info/badge.svg)
![NPM](https://nodei.co/npm/iobroker.apg-info.png?downloads=true)

# IoBroker.apg-info
[![FOSSA-Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.apg-info.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.apg-info?ref=badge_shield) ![Testen und Freigeben](https://github.com/HGlab01/ioBroker.apg-info/workflows/Test%20and%20Release/badge.svg)

## Apg-info-Adapter für ioBroker
Dieser Adapter liefert die Spitzenzeiten für das österreichische Stromnetz (nur österreichische Werte!), in denen Stromverbrauch vermieden werden soll. Zusätzlich liefert der Adapter die PHELIX Day-Ahead (EPEX Spot)-Preise für Österreich, die Schweiz und Deutschland (Konfiguration in den Adaptereinstellungen). Anbietergebühren, Steuern und Netzkosten können optional in der Konfiguration (Registerkarte „Berechnung“) hinzugefügt werden.

`[..].marketprice.today.jsonChart` und `[..].marketprice.tomorrow.jsonChart` können mit https://github.com/Scrounger/ioBroker.vis-materialdesign#json-chart verwendet werden.

In der Standardkonfiguration läuft der Adapter um 00:00, 13:00 und 15:00 Uhr. Es wird dringend empfohlen, den Betrieb um 00:00 Uhr nicht zu entfernen, da sonst der Tageswechsel (morgen -> heute) nicht ordnungsgemäß funktioniert.

**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!

## Erfordert
* Node.js 20 oder höher
* ioBroker-Host (js-Controller) 5.0 oder höher

## Schweizer Markt
Für den Schweizer Markt wird ein Token von entsoe.eu benötigt. Bitte fügen Sie Ihren Token in der Adapterkonfiguration im Reiter &quot;ENTSOE TOKEN&quot; hinzu. Registrieren Sie sich auf der Seite https://transparency.entsoe.eu/ und senden Sie anschließend eine E-Mail an transparency@entsoe.eu mit der Bitte um RESTFUL-API-Zugriff für die registrierte E-Mail-Adresse.<br> Weitere Einzelheiten finden Sie unter https://transparency.entsoe.eu/content/static_content/Static%20content/web%20api/Guide.html#_authentication_and_authorisation

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### 0.1.17 (2025-06-03)
* (HGlab01) Add retry mechanism for Entsoe

### 0.1.16 (2025-05-18)
* (HGlab01) Optimize Entsoe (Swiss market) requests
* (HGlab01) Extend timeout for Api calls to 30 seconds 
* (HGlab01) Bump axios to 1.9.0

### 0.1.15 (2025-04-17)
* (HGlab01) fix 'Cannot read properties of undefined (reading 'price_amount')'

### 0.1.14 (2025-03-30)
* (HGlab01) Fix switch to summer time begin issue
* (HGlab01) Bump axios to 1.8.4
* (HGlab01) Fix warning "State attribute definition missing for 'item xx' 
* (HGlab01) Fix provider-fee% calculation if base price is negative ([#354](https://github.com/HGlab01/ioBroker.apg-info/issues/354))

### 0.1.13 (2025-03-12)
* (HGlab01) Bump axios to 1.8.3

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