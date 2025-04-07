---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.shrdzm/README.md
title: ioBroker.shrdzm
hash: 9AY/wLITY5pqDIwSAGzussok/Igv+9FISL3AMBBNmjE=
---
![Logo](../../../en/adapterref/iobroker.shrdzm/admin/shrdzm.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.shrdzm.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.shrdzm.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/shrdzm-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/shrdzm-stable.svg)
![Lizenz](https://img.shields.io/github/license/mcm4iob/ioBroker.shrdzm?style=flat)
![Spenden](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)

# IoBroker.shrdzm
![Testen und Freigeben](https://github.com/mcm4iob/ioBroker.shrdzm/workflows/Test%20and%20Release/badge.svg)

**************************************************************************************************************

## Sentry **Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.
**************************************************************************************************************

## Shrdzm-Adapter für ioBroker
Dieser Adapter integriert die SHRDZM-Smartmeter-Schnittstelle des Anbieters *SHRDZM IT Services e.U.* in ioBroker. Eine Beschreibung der Schnittstelle finden Sie unter [Hier](https://cms.shrdzm.com/produkt/smartmeter-modul/).

Beachten Sie, dass dieser Adapter in keiner Weise mit dem oben genannten Unternehmen verbunden ist und keinerlei Geschäftsbeziehung besteht.

**************************************************************************************************************

## Haftungsausschluss
**Alle Produkt- und Firmennamen sowie Logos sind Warenzeichen™ oder eingetragene Warenzeichen® ihrer jeweiligen Inhaber. Ihre Verwendung impliziert keine Zugehörigkeit zu oder Billigung durch diese oder verbundene Tochterunternehmen! Dieses persönliche Projekt wird in meiner Freizeit gepflegt und verfolgt kein Geschäftsziel.**

**************************************************************************************************************

## Konfiguration
Installieren und richten Sie Ihre SHRZDM-Schnittstelle gemäß der Herstellerdokumentation ein. Dieser Adapter verbindet sich über eine UDP-Verbindung (IPv4) mit der Schnittstelle. Zur Inbetriebnahme sind folgende Schritte erforderlich:

- Installieren Sie den iobroker Adapter wie gewohnt
- Öffnen Sie die ioBroker-AdminUI-Schnittstelle, um den Adapter zu konfigurieren
- Wählen Sie in der AdminUI einen freien Port aus. Der Standardwert ist Port 9000, es kann jedoch jeder beliebige freie Port verwendet werden.

- Öffnen Sie die SHRZDM-Konfigurationsoberfläche (mit einem Webbrowser)

![Alternativtext](../../../en/adapterref/iobroker.shrdzm/doc/shrzdm-cloud.pgn)

- Cloud-Konfiguration auswählen
- Geben Sie die IP-Adresse (nur IPv4) Ihres ioBroker-Hosts und die ausgewählte Portnummer in das Feld „Server“ ein.
- 'UDP senden' aktivieren
- Cloud-Einstellungen speichern

Das SHRDZM-Gerät sollte sofort mit der Datenübertragung in dem auf der Seite „Einstellungen“ konfigurierten Intervall beginnen.

## Betrieb
Der Adapter erstellt Status für alle von allen Geräten empfangenen OBO-Daten. Wenn Sie mehrere SHRZDM-Geräte installiert haben und die Anzahl der akzeptierten Geräte einschränken möchten, können Sie in der Adapterkonfiguration eine Liste zulässiger Geräte angeben. Wenn keine Geräte konfiguriert sind, werden Daten von allen Absendern akzeptiert.

## Häufig gestellte Fragen
#### Updates erfolgen zu oft
Die Live-Daten werden aktualisiert, sobald neue Daten vom SHRDZM-Gerät empfangen werden. Um die vom Gerät gesendete Datenmenge zu reduzieren, passen Sie den Intervallparameter auf der Geräteeinstellungsseite an.

**************************************************************************************************************

**Wenn es Ihnen gefällt, denken Sie bitte über eine Spende nach:**

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mcm1957atIoBroker)

**************************************************************************************************************

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.2.0 (2025-04-06)
* (mcm1957) Online indicator has been added to objectview.
* (mcm1957) Translations have been updated.
* (mcm1957) Descriptions have been added to all states and at adminUI.
* (mcm1957) Raw data received from devices can be stored for analyses now.
* (mcm1957) Adapter can handle multiple networks now. 
* (mcm1957) Dependencies have been updated.

### 0.1.1 (2025-03-17)
* (mcm1957) translations have been reviewed and fixed

### 0.1.0 (2025-03-15)
* (mcm1957) initial release

## License
MIT License

Copyright (c) 2025 mcm1957 <mcm57@gmx.at>

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