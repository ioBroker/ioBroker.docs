---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.apg-info/README.md
title: ioBroker.apg-info
hash: b8YIDN5UrVOEjnNuFYJ5RH86vGY42dQtaDnYBja3ul4=
---
![Logo](../../../en/adapterref/iobroker.apg-info/admin/apg-info.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.apg-info.svg)
![Anzahl Installationen (stabil)](http://iobroker.live/badges/apg-info-stable.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.apg-info.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/apg-info-installed.svg)
![Abhängigkeitsstatus](https://img.shields.io/librariesio/release/npm/iobroker.apg-info)
![Bekannte Schwachstellen](https://snyk.io/test/github/HGlab01/ioBroker.apg-info/badge.svg)
![NPM](https://nodei.co/npm/iobroker.apg-info.png?downloads=true)

# IoBroker.apg-info
[![FOSSA-Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.apg-info.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.apg-info?ref=badge_shield) ![Testen und Freigeben](https://github.com/HGlab01/ioBroker.apg-info/workflows/Test%20and%20Release/badge.svg)

## Apg-info-Adapter für ioBroker
Dieser Adapter liefert die Spitzenzeiten für das österreichische Stromnetz (nur österreichische Werte!), in denen Stromverbrauch vermieden werden soll. Zusätzlich liefert der Adapter die PHELIX Day-Ahead (EPEX Spot) Preise für Österreich, die Schweiz und Deutschland (Konfiguration in den Adaptereinstellungen). Anbietergebühren, Steuern und Netzkosten können optional in der Konfiguration hinzugefügt werden (Registerkarte Berechnung).

`[..].marketprice.today.jsonChart` und `[..].marketprice.tomorrow.jsonChart` können mit https://github.com/Scrounger/ioBroker.vis-materialdesign#json-chart verwendet werden.

Mit der Standardkonfiguration läuft der Adapter um 00:00, 13:00 und 15:00 Uhr. Es wird dringend empfohlen, den Lauf um 00:00 Uhr nicht zu entfernen, da sonst der Tageswechsel (morgen --> heute) nicht richtig funktioniert.

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!

## Erfordert
* Node.js 18 oder höher
* ioBroker-Host (js-Controller) 5.0 oder höher

## Schweizer Markt
Für den Schweizer Markt wird ein Token von entsoe.eu benötigt. Bitte fügen Sie Ihren Token der Adapterkonfiguration im Reiter &quot;ENTSOE TOKEN&quot; hinzu. Registrieren Sie sich auf der Seite https://transparency.entsoe.eu/ und senden Sie anschließend eine E-Mail an transparency@entsoe.eu mit der Bitte um RESTFUL API-Zugriff für die von Ihnen registrierte E-Mail-Adresse.<br> Weitere Einzelheiten finden Sie unter https://transparency.entsoe.eu/content/static_content/Static%20content/web%20api/Guide.html#_authentication_and_authorisation

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### 0.1.11 (2024-10-20)
* (HGlab01) improve UI config (#296)

### 0.1.10 (2024-10-04)
* (HGlab01) fix issue #290
* (HGlab01) bump axios to 1.7.7

### 0.1.9 (2024-08-21)
* (HGlab01) Support eslint9

### 0.1.8 (2024-07-31)
* (HGlab01) Swiss market support; Token needed! Check readme!
* (HGlab01) Bump json-explorer to 0.1.16

### 0.1.7 (2024-05-27)
* (HGlab01) Add date to today and tomorrow to make the date of today and tomorrow clear
* (HGlab01) bump axios to 1.7.2

## License
MIT License

Copyright (c) 2024 HGlab01 <myiobrokeradapters@gmail.com>

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