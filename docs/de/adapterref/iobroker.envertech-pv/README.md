---
chapters: {"pages":{"en/adapterref/iobroker.envertech-pv/README.md":{"title":{"en":"ioBroker.envertech-pv"},"content":"en/adapterref/iobroker.envertech-pv/README.md"},"en/adapterref/iobroker.envertech-pv/docs/en/envertech.md":{"title":{"en":"Envertech-PV Adapter Information"},"content":"en/adapterref/iobroker.envertech-pv/docs/en/envertech.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.envertech-pv/README.md
title: ioBroker.envertech-pv
hash: xd5v5kZ1c8YC1CszAMlF5/wsyGTUuJlBzefSs3+qwNA=
---
![Logo](../../../en/adapterref/iobroker.envertech-pv/admin/envertech-pv.png)

![GitHub-Lizenz](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.envertech-pv)
![Downloads](https://img.shields.io/npm/dm/iobroker.envertech-pv.svg)
![GitHub-Repository-Größe](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.envertech-pv)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/envertech-pv/svg-badge.svg)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.envertech-pv)
![GitHub-Commits seit der letzten Veröffentlichung (nach Datum)](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.envertech-pv/latest)
![Letzter Commit auf GitHub](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.envertech-pv)
![GitHub-Probleme](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.envertech-pv)
![NPM-Version](http://img.shields.io/npm/v/iobroker.envertech-pv.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/envertech-pv-stable.svg)
![Anzahl der Installationen](https://iobroker.live/badges/envertech-pv-installed.svg)
![Test und Freigabe](https://github.com/iobroker-community-adapters/ioBroker.envertech-pv/actions/workflows/test-and-release.yml/badge.svg)
![CodeQL](https://github.com/iobroker-community-adapters/ioBroker.envertech-pv/actions/workflows/codeql.yml/badge.svg)
![Spenden](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)

# ioBroker.envertech-pv

**Allgemeine Informationen:**<br></br> **Version:**</br></br> **Tests:**</br><br> **Spende:**</br>

---

## Posten

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

---

## envertech-pv-Adapter für ioBroker

Der ioBroker.envertech-pv-Adapter ermöglicht Ihnen den einfachen Zugriff auf und die Erfassung von Daten aus dem [Envertech-Cloud-Service](https://github.com/iobroker-community-adapters/ioBroker.envertech-pv/blob/master/www.envertecportal.com) . Durch regelmäßiges Abfragen des Webdienstes stellt dieser Adapter sicher, dass alle relevanten Informationen umgehend abgerufen und in leicht zugänglichen Formaten gespeichert werden.

---

## Haftungsausschluss

**Alle Produkt- und Firmennamen sowie Logos sind Marken™ oder eingetragene® Marken ihrer jeweiligen Inhaber. Ihre Verwendung impliziert weder eine Zugehörigkeit zu noch eine Unterstützung durch diese oder verbundene Tochtergesellschaften! Dieses private Projekt wird in der Freizeit betrieben und verfolgt keine geschäftlichen Ziele.** **Envertech® ist eine eingetragene Marke der Zhejiang Envertech Corporation Limited**

---

## Dokumentation

[**Englische** Dokumentation](/#/docs/adapterref/iobroker.envertech-pv/docs/en/envertech.md)\
&#x20;[**Deutsche** Dokumentation](https://github.com/iobroker-community-adapters/ioBroker.envertech-pv/blob/master/docs/de/envertech.md)

## Credits

Dieser Adapter wäre ohne die großartige Arbeit von @adcrafter27 ( <https://github.com/adcrafter27> ) nicht möglich gewesen, der die REST-API, die zum Zugriff auf den Envertech-Cloud-Dienst verwendet wird, analysiert und dokumentiert hat.

## Wie man Probleme und Funktionswünsche meldet

Idealerweise verwenden Sie hierfür GitHub-Issues. Die beste Methode hierfür ist, den Adapter in den Debug-Log-Modus zu versetzen (Instanzen → Expertenmodus → Spaltenprotokollierung). Laden Sie die Logdatei anschließend von der Festplatte aus dem Unterverzeichnis „log“ des ioBrokers herunter, **nicht** aus dem Admin-Bereich, da dort Zeilen abgeschnitten werden. Falls Sie die Logdatei nicht in einem GitHub-Issue bereitstellen möchten, senden Sie mir bitte eine E-Mail ( <mcm57@gmx.at> ). Geben Sie dabei bitte das entsprechende **GitHub-Issue** an, fügen Sie **eine beschreibende Beschreibung** hinzu und ergänzen Sie gegebenenfalls **die Log-Zeitstempel** .

---

**Wenn Ihnen dieser Adapter gefällt, erwägen Sie bitte eine Spende:**

[![PayPal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mcm1957atIoBroker)

---

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now

### 1.5.1 (2026-02-14)
-   (mcm1957) Dependencies have been updated.

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

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/ioBroker.envertech-pv/blob/master/CHANGELOG_OLD.md)

## License

MIT License


Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
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