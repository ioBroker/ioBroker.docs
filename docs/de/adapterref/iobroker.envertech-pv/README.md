---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.envertech-pv/README.md
title: ioBroker.envertech-pv
hash: Vq7iar6NNmmjOdsLJp1/JylkdRzeQf6X9aAzZplySno=
---
![Logo](../../../en/adapterref/iobroker.envertech-pv/admin/envertech-pv.png)

![GitHub-Lizenz](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.envertech-pv)
![Downloads](https://img.shields.io/npm/dm/iobroker.envertech-pv.svg)
![GitHub-Repo-Größe](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.envertech-pv)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.envertech-pv)
![GitHub-Commits seit der letzten Veröffentlichung (nach Datum)](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.envertech-pv/latest)
![Letzter GitHub-Commit](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.envertech-pv)
![GitHub-Probleme](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.envertech-pv)
![NPM-Version](http://img.shields.io/npm/v/iobroker.envertech-pv.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/envertech-pv-stable.svg)
![Anzahl der Installationen](https://iobroker.live/badges/envertech-pv-installed.svg)
![Spenden](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)

# IoBroker.envertech-pv
**Allgemeine Informationen:**<br> [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/envertech-pv/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)</br></br> **Version:**</br></br> **Tests:**</br> [![Testen und Freigeben](https://github.com/iobroker-community-adapters/ioBroker.envertech-pv/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.envertech-pv/actions/workflows/test-and-release.yml) [![CodeQL](https://github.com/iobroker-community-adapters/ioBroker.envertech-pv/actions/workflows/codeql.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.envertech-pv/actions/workflows/codeql.yml)<br> **Spende:**</br>

**************************************************************************************************************

## Sentry **Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.
**************************************************************************************************************

## Envertech-pv-Adapter für ioBroker
Mit dem ioBroker.envertech-pv-Adapter können Sie problemlos auf Daten von [Envertech Cloud-Service](www.envertecportal.com) zugreifen und diese erfassen. Durch regelmäßige Abfragen des Webdienstes stellt dieser Adapter sicher, dass alle wertvollen Informationen umgehend abgerufen und in leicht zugänglichen Zuständen gespeichert werden.

**************************************************************************************************************

## Haftungsausschluss
**Alle Produkt- und Firmennamen oder Logos sind Warenzeichen™ oder eingetragene Warenzeichen® ihrer jeweiligen Inhaber. Ihre Verwendung impliziert keine Zugehörigkeit zu oder Billigung durch diese oder verbundene Tochtergesellschaften! Dieses persönliche Projekt wird in der Freizeit gepflegt und verfolgt kein Geschäftsziel.** **Envertech® ist ein eingetragenes Warenzeichen der Zhejiang Envertech Corporation Limited**

**************************************************************************************************************

## Dokumentation
[**Englische** Dokumentation](docs/en/envertech.md) [**Deutsche** Dokumentation](docs/de/envertech.md)

## Credits
Dieser Adapter wäre ohne die großartige Arbeit von @adcrafter27 (https://github.com/adcrafter27) nicht möglich gewesen, der die REST-API analysiert und dokumentiert hat, die für den Zugriff auf den Envertech-Cloud-Dienst verwendet wird.

## So melden Sie Probleme und Funktionsanfragen
Idealerweise verwenden Sie hierfür GitHub-Probleme. Die beste Methode ist, den Adapter in den Debug-Protokollmodus zu versetzen (Instanzen -> Expertenmodus -> Spaltenprotokollebene). Rufen Sie dann die Protokolldatei über das ioBroker-Unterverzeichnis „log“ von der Festplatte ab, **nicht** über den Administrator, da dies Zeilen spart. Wenn Sie die Datei nicht in einem GitHub-Problem bereitstellen möchten, senden Sie mir eine E-Mail (mcm57@gmx.at). Bitte verweisen Sie auf das entsprechende **GitHub-Problem**, fügen Sie einen entsprechenden **beschreibenden Kommentar** hinzu und fügen Sie gegebenenfalls **Protokollzeitstempel** hinzu.

**************************************************************************************************************

**Wenn Ihnen dieser Adapter gefällt, denken Sie bitte über eine Spende nach:**

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mcm1957atIoBroker)

**************************************************************************************************************

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.5.0 (2025-08-16)
-   (mcm1957) Adapter requires node.js 20, js-controller 6.0.11 and admin 7.6.17 now.
-   (mcm1957) Dependencies have been updated.

### 1.4.0 (2024-11-14)
-   (mcm1957) Adapter has been changes to meet Responsive Design Rules.
-   (mcm1957) Adapter requires js-controller 5.0.19 and admin 6.17.14 now.
-   (mcm1957) Dependencies have been updated.

### 1.3.2 (2024-03-28)
-   (mcm1957) Adapter supports multiple pages returned from Envertech now. This will allow more than 20 inverters per station.
-   (mcm1957) Adapter requires js-controller >= 5 now.
-   (mcm1957) Dependencies have been updated.

### 1.2.0 (2024-03-21)
-   (mcm1957) New states GridPower and LoadPower have been added [#147].
-   (mcm1957) Processing of strIncome has been fixed [#46].
-   (mcm1957) Incorrect description has been corrected [#50].
-   (mcm1957) State roles have been checked and adapter [#75].
-   (mcm1957) Dependencies have been updated.

### 1.1.0 (2023-11-12)
-   (mcm1957) Adapter requires nodejs 18 now.
-   (mcm1957) Incorrect energy units have been corrected. [#113]
-   (mcm1957) New internal information returned by api is no longer reported as unknown. [#110]
-   (mcm1957) Dependencies have been updated.

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

Copyright (c) 2023-2025 mcm1957 <mcm57@gmx.at>, adcrafter27 <adcrafter27@gmail.com>

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