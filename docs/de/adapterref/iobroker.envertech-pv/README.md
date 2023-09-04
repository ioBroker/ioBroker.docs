---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.envertech-pv/README.md
title: ioBroker.envertech-pv
hash: xG56N3m6+kR6XQ+Q1LSIUu0M2pWfv1Ff71XnwNdqliI=
---
![Logo](../../../en/adapterref/iobroker.envertech-pv/admin/envertech-pv.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.envertech-pv.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/envertech-pv-stable.svg)
![Anzahl der Installationen](https://iobroker.live/badges/envertech-pv-installed.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.envertech-pv.svg)
![NPM](https://nodei.co/npm/iobroker.envertech-pv.png?downloads=true)

# IoBroker.envertech-pv
![Test und Freigabe](https://github.com/iobroker-community-adapters/ioBroker.envertech-pv/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/envertech-pv/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

<!-- **Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.
->

## IoBroker.envertech-pv
Mit dem ioBroker.envertech-pv-Adapter können Sie problemlos auf Daten aus [Envertech-Cloud-Service](www.envertecportal.com) zugreifen und diese sammeln. Durch regelmäßige Abfragen des Webdienstes stellt dieser Adapter sicher, dass alle wertvollen Informationen umgehend abgerufen und in leicht zugänglichen Zuständen gespeichert werden.

## Haftungsausschluss
**Alle Produkt- und Firmennamen oder Logos sind Marken™ oder eingetragene® Marken ihrer jeweiligen Inhaber. Deren Nutzung impliziert keinerlei Zugehörigkeit zu oder Billigung durch sie oder verbundene Tochtergesellschaften! Dieses persönliche Projekt wird in der Freizeit gepflegt und hat kein geschäftliches Ziel.** **Envertech® ist eine eingetragene Marke der Zhejiang Envertech Corporation Limited**

## Dokumentation
[**Englische** Dokumentation](docs/en/envertech.md) [**Deutsche** Dokumentation](docs/de/envertech.md)

## Credits
Dieser Adapter wäre ohne die großartige Arbeit von @adcrafter27 (https://github.com/adcrafter27) nicht möglich gewesen, der die REST-API analysiert und dokumentiert hat, die für den Zugriff auf den Envertech-Cloud-Service verwendet wird.

## So melden Sie Probleme und Funktionswünsche
Verwenden Sie dazu im Idealfall GitHub Issues. Die beste Methode erreichen Sie, indem Sie den Adapter auf den Debug-Protokollmodus einstellen (Instanzen -> Expertenmodus -> Spaltenprotokollebene). Rufen Sie dann die Protokolldatei über das ioBroker-Unterverzeichnis „log“ von der Festplatte ab, **nicht** über Admin, wodurch Zeilen abgeschnitten werden. Wenn Sie es lieber vermeiden möchten, es in einer GitHub-Ausgabe bereitzustellen, senden Sie mir eine E-Mail (mcm57@gmx.at). Bitte verweisen Sie auf das entsprechende **GitHub-Problem**, geben Sie einen entsprechenden **beschreibenden Kommentar** ab und fügen Sie gegebenenfalls **Protokollzeitstempel** hinzu.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.0.2 (2023-03-31)

-   (mcm1957) changed: Handling of statuscode '2' has been added (#44).
-   (mcm1957) changed: Unload code has been fixed.
-   (mcm1957) changed: Some translations have been updated.
-   (mcm1957) changed: Dependencies have been updated.

### 1.0.1 (2023-03-23)

-   (mcm1957) NEW: Support to retrieve station-id by username and password has been added.
-   (mcm1957) NEW: Support to check multiple stations within one instance has been added.
-   (mcm1957) changed: Units and roles for states have been reconfigured.
-   (mcm1957) changed: State structure has been changed to support multiple stations (and for future local access).
-   (mcm1957) changed: Userinterface has been migrated to jsonConfig (admin5).
-   (mcm1957) changed: The adapter is running as daemon.
-   (mcm1957) changed: The communication has been changed from deprecated "request" to "axios" package.
-   (mcm1957) changed: The adapter has been moved to iobroker-community-adapters organisation.

### 0.0.8

-   (adcrafter27) add setting for more log output

### 0.0.7

-   (adcrafter27) add more functions

### 0.0.6

-   (adcrafter27) code fix

### 0.0.5

-   (adcrafter27) release

### 0.0.3

-   (adcrafter27) Update new functions

### 0.0.2

-   (adcrafter27) First test release

### 0.0.1

-   (adcrafter27) initial release

## License

MIT License

Copyright (c) 2023 mcm1957 <mcm57@gmx.at>, adcrafter27 <adcrafter27@gmail.com>

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