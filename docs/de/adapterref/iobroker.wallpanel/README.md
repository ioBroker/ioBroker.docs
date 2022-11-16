---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.wallpanel/README.md
title: ioBroker.wallpanel
hash: 8IZ7RZ71Bv/GJK63UmHbo/Z6E+HDKyBuHNYmO+/1duM=
---
![Logo](../../../en/adapterref/iobroker.wallpanel/admin/wallpanel.png)

![GitHub-Veröffentlichung](https://img.shields.io/github/v/release/xXBJXx/ioBroker.wallpanel?include_prereleases&label=GitHub%20release&logo=github)
![NPM-Version](https://img.shields.io/npm/v/iobroker.wallpanel.svg?logo=npm)
![NPM-Downloads](https://img.shields.io/npm/dm/iobroker.wallpanel.svg?logo=npm)
![Eingerichtet](https://iobroker.live/badges/wallpanel-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/wallpanel-stable.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/xXBJXx/ioBroker.wallpanel/badge.svg)
![NPM](https://nodei.co/npm/iobroker.wallpanel.png?downloads=true)

# IoBroker.wallpanel
![Testen und freigeben](https://github.com/xXBJXx/ioBroker.wallpanel/workflows/Test%20and%20Release/badge.svg)

**Dieser Adapter verwendet den Dienst Sentry.io, um Ausnahmen und Codefehler sowie neue Geräteschemas automatisch an mich als Entwickler zu melden.
Näheres siehe unten! [Posten](#sentry)**

## Der Adapter erfordert eine Node.js-Version >= 16.x
## **Eine ausführliche Beschreibung finden Sie in [Adapterdokumentation](https://xxbjxx.github.io/wallpanel/)**
# Adapterbeschreibung
![WandpaneelAdapter](../../../en/adapterref/iobroker.wallpanel/admin/media/wallpanelAdapter.png)

Mit dem Adapter kann man ein paar Werte wie Helligkeit und über MQTT dann noch zusätzlich Akkustand abfragen und noch ein paar Sachen mehr,<br> Abfrage dieser Werte in Zuständen geschrieben und verfügbar sind.<br> Man kann auch ein paar Steuerbefehle an das Tablet schicken, es kann zB die Helligkeit oder die aktuelle URL ändern.

In den Adapter können gleichzeitig mehrere Tablets gesetzt werden, die dann nacheinander abgefragt und natürlich auch angesteuert werden können.

Die App ist nicht mehr im Play Store verfügbar, kann aber weiterhin von GitHub über eine APK + Original (Play Store Version) installiert werden ⇨ [alte Version](https://github.com/thecowan/wallpanel-android/releases) wird nicht weiterentwickelt + neue Version derzeit nur auf GitHub ⇨ § §LLLLL_1§§ befindet sich in der Weiterentwicklung.

### **Achtung, wenn Sie eine App von GitHub installieren, dann installieren Sie diese „von unbekannter Quelle“ dies kann unter Umständen gefährlich sein, da die App von keiner offiziellen Quelle auf Malware geprüft wurde.**
Hier noch der Forenthread zu diesem Adapter: [Forumsbeitrag](https://forum.iobroker.net/topic/36438/test-adapter-wallpanel)

##Wache
### Was ist Sentry.io und was wird an die Server dieser Firma gemeldet?
Sentry.io ist ein Dienst für Entwickler, um sich einen Überblick über Fehler in ihren Anwendungen zu verschaffen. Und genau das ist in diesem Adapter umgesetzt.

Wenn der Adapter abstürzt oder ein anderer Codefehler auftritt, wird diese Fehlermeldung, die auch im ioBroker-Protokoll erscheint, an Sentry gesendet. Wenn Sie der iobroker GmbH erlaubt haben, Diagnosedaten zu sammeln, dann ist auch Ihre Installations-ID (dies ist nur eine eindeutige ID ohne zusätzliche Informationen über Sie, E-Mail-Name oder dergleichen) enthalten. Dadurch kann Sentry Fehler gruppieren und anzeigen, wie viele einzelne Benutzer von einem solchen Fehler betroffen sind.
All dies hilft mir, fehlerfreie Adapter bereitzustellen, die im Grunde nie abstürzen.

Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in den [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)<br> Sentry Reporting wird ab js-controller 3.0 verwendet.

## Changelog
 <!--
 Placeholder for the next version (at the beginning of the line):
 ### __WORK IN PROGRESS__ (- falls nicht benötigt löschen sonst klammern entfernen und nach dem - dein text schreiben)
 -->
### 0.3.9 (2022-10-02)
* (xXBJXx) dependencies updated 
* (xXBJXx) Moved global variable to constructor

### 0.3.8 (2022-07-02)
* (xXBJXx) removed the play Store Link and added the GitHub Link to the new version and add a Warning for the Installer from GitHub.
* (xXBJXx) optimized the code
* (xXBJXx) dependencies updated
* (xXBJXx) Leave the device switched off when creating Problem solved

### 0.3.7 (2022-06-06)
* (xXBJXx) Node version support set to >= v16.x because of new features of Node.js that are needed.
* (xXBJXx) fixed mqtt topic Display Direction

### 0.3.6 (2022-05-30)
* (xXBJXx) preparation for release in ioBroker Repo. Adapter-Check issues processed

### 0.3.5 (2022-05-30)
* (xXBJXx) update Changelog and fixed type issues

## License
MIT License

Copyright (c) 2020-2022 xXBJXx <issi.dev.iobroker@gmail.com>

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