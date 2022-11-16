---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ham/README.md
title: ioBroker Homebridge-Zubehörmanager
hash: YWFx1PvhxXq7iwHc0gKP5lLvYFgwg1b+x09oPZ8cidA=
---
![Logo](../../../en/adapterref/iobroker.ham/admin/ham.png)

![Anzahl der Installationen](http://iobroker.live/badges/ham-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.ham.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.ham.svg)

# IoBroker Homebridge-Zubehörmanager
![Testen und freigeben](https://github.com/ioBroker/iobroker.ham/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/ham/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

Verwenden Sie Homebridge-Plugins in ioBroker oder führen Sie eine global installierte Homebridge als ioBroker-Adapter aus.
Alle Zustände von Homebridge werden auch in ioBroker verfügbar sein und können dort auch kontrolliert werden.

## Beschreibung
Dieser Adapter bietet drei verschiedene Modi:

### Standardmodus (Wrapper).
Im Standardmodus ermöglicht der Adapter die direkte Verwendung von Homebridge-Plugin-Modulen.
Sie können alle verfügbaren Plugins auf der NPM-Website unter [nach dem Schlüsselwort `homebridge-plugin` suchen](https://www.npmjs.com/search?q=homebridge-plugin) erkunden.

Sie fügen einfach die Liste der Module zur Adapterkonfiguration hinzu und stellen die Konfiguration im JSON-Editor bereit (siehe Plugin-Beschreibungen).
Danach werden alle Homebridge-Objekte auch in ioBroker erstellt und alle beschreibbaren Objekte können ebenfalls geändert werden.

**WICHTIG: Dieser Modus ermöglicht die Nutzung der Geräteintegrationen der bereitgestellten Homebridge-Plugins. Es wird keine „Brücke“ bereitgestellt, die von der Home-App verwendet werden kann!**

Einen Link erfolgreich erprobter Plugins mit Beispielen finden Sie hier: https://forum.iobroker.net/viewtopic.php?f=20&t=15021

### Local-Homebridge-Modus
Wenn Sie eine veröffentlichte Bridge haben möchten, die von der Home-App verwendet werden soll, und auch mit ihr von ioBroker interagieren und die Daten abrufen möchten, aber Homebridge noch nicht installiert haben, verwenden Sie diesen Modus.

Der lokale Modus installiert die aktuelle kompatible Version von Homebridge und führt sie als ioBroker-Benutzer aus. Sie stellen die vollständige Homebridge-Konfiguration mit ioBroker bereit.
Die Installation der Homebridge-Module erfolgt ebenfalls über ioBroker.

**WICHTIG: Bei Verwendung von Child-Bridges (neues Homebridge-Feature seit 1.3.x) kann der Adapter NICHT auf die von diesen Child-Bridges bereitgestellten Daten zugreifen! Nur die Hauptbrücke ist zugänglich!**

### Global-Homebridge-Modus
Wenn Sie Homebridge (Apple OpenSource SmartHome) bereits als globale Installation auf dem Host verwenden, auf dem auch ioBroker läuft, dann können Sie diese vorhandene Homebridge-Installation verwenden und diese Homebridge-Installation als ioBroker-Prozess starten. **In diesem Fall wird der Homebridge-Server von ioBroker gestartet.**

**WICHTIG: Sie müssen sicherstellen, dass der globale Dienst NICHT vom System oder dergleichen gestartet wird. ioBroker selbst macht den Anfang! Siehe unten für Best-Practice-Einrichtungsdetails.**

**WICHTIG: Da ioBroker die Homebridge startet, wird auch das Logging von ioBroker durchgeführt. Sie können den Loglevel der Instanz auf albern setzen, um auch alle Homebridge-Logs zu sehen, sonst wird nach den wichtigen Sachen gefiltert.**

Außerdem sind alle Zustände von Homebridge als Zustände in ioBroker verfügbar und können von ioBroker aus gesteuert werden.

Damit dies funktioniert, müssen Sie den Speicherort des globalen Knotenmodulordners des Systems angeben. Rufen Sie dazu **npm root -g** auf. Außerdem müssen Sie den Pfad des Homebridge-Konfigurationsverzeichnisses angeben (normalerweise .homebridge im Ordner „users“).

**WICHTIG: ioBroker läuft als Benutzer „iobroker“, aber Homebridge normalerweise als Root- oder Homebridge-Benutzer (je nachdem, wie Sie es installiert haben). Sie müssen sicherstellen, dass der Homebride-Ordner „Persistance“ vom ioBroker-Benutzer aufgerufen werden kann, sonst sehen Sie Fehler, dass die Datei nicht gespeichert werden kann (was den Adapter zum Absturz bringen kann!)**

**WICHTIG: Bei Verwendung von Child-Bridges (neues Homebridge-Feature seit 1.3.x) kann der Adapter NICHT auf die von diesen Child-Bridges bereitgestellten Daten zugreifen! Nur die Hauptbrücke ist zugänglich!**

#### Als Global Bridge-Details installieren
Dank @Anzic23 hier einige Details, wie man Homebridge ideal für den globalen Modus einrichtet:

1. `sudo npm install -g --unsafe-perm homebridge homebridge-config-ui-x`
2. hb-service installieren (sudo hb-service install --user homebridge) Dieser Schritt ist erforderlich, um die erforderlichen Dateien und Verzeichnisse zu erstellen
3. hb-service deinstallieren (sudo hb-service deinstallieren)
4. nach der Installation von Homebridge

```
sudo chmod 777 -R /var/lib/homebridge/
sudo chmod 777 -R /usr/lib/node_modules/homebridge
```

im globalen Homebridge-Pfad von iobroker: /usr/lib/node_modules/homebridge

Pfad des globalen Homebridge-Konfigurationsverzeichnisses: /var/lib/homebridge

## Folgende Plugins wurden im Standardmodus getestet
* homebridge-chamberlain v1.0.1 - Plugin für Chamberlain Garagentoröffner mit MyQ
* homebridge-doorbird v0.0.4 - Plugin für Doorbird
* homebridge-dyson-link v2.2.2 - Dyson Link-Geräte
* homebridge-edomoticz v2.1.11 - Ein vollwertiges aktuelles Plugin für Domoticz
* homebridge-Fibaro-HC2 v2.1.5 - Fibaro HomeCenter-Integration
* homebridge-homee v0.2.4 - Ein vollwertiges aktuelles Plugin für Homee
* homebridge-ikea-tradfri-gateway v1.0.26 - Tradfri
* homebridge-noolite v0.0.29 - Noolite über USB MTRF-64- oder МТRF-64-Module
* homebridge-platform-wemo v1.0.1 – Belkin WeMo-Plattform-Plugin
* homebridge-seasons v1.0.1 - Ein Plugin zur Anzeige der aktuellen Jahreszeit.
* homebridge-vera v0.8.2 - VeraLink ist eine Anwendung für Z-Wave-Zubehör von Vera (Node.js 8.11.3)

... und viele mehr

## MACHEN
* Prüfungen
* Mehr Dokumentation?!
* Testen und herausfinden, ob ESM-Module in welchem Modus funktionieren (ich erwarte keinen)

<!-- Platzhalter für die nächste Version (am Zeilenanfang):

### **IN ARBEIT** -->

## Changelog

### __WORK IN PROGRESS__
* (Apollon77) Optimize value determination on accessory initialization

### 5.3.1 (2022-09-28)
* (bluefox) Updated GUI packages

### 5.3.0 (2022-09-15)
* (Apollon77) Add option to enable homebridge debug logging

### 5.2.4 (2022-09-15)
* (Apollon77) Prevent crash when accessing a state which is not controllable anymore

### 5.2.3 (2022-09-14)
* (Apollon77) Optimize Accessory processing

### 5.2.2 (2022-09-14)
* (Apollon77) make compatible to more plugins

### 5.2.1 (2022-09-12)
* (Apollon77) make compatible to more plugins

### 5.1.0 (2022-08-17)
* IMPORTANT update homebridge and wrapper to 1.5.0 (latest as of today). IMPORTANT: Requires also homebridge 1.5.x installed when using global mode and local mode will update to 1.5.x too! Check your plugins for updates!

### 5.0.2 (2022-07-20)
* (bluefox) Update tab GUI

### 5.0.1 (2022-06-28)
* (Apollon77) Make sure values are set after objects were created

### 5.0.0 (2022-06-27)
* IMPORTANT update homebridge and wrapper to 1.4.1 (latest as of today). IMPORTANT: Requires also homebridge 1.4.x installed when using global mode and local mode will update to 1.4.x too! Check your plugins for updates!
* (Apollon77) Sync forbidden characters with ioBroker standard - Object IDs might change with this version!
* (Apollon77) Basically allow to specify http URLS as plugins in the main configuration list (not the tab!)
* (Apollon77) Also try to register on external accessories like cameras (experimental)
* (Apollon77) Fix loading issues with the tab

### 4.0.4 (2022-06-07)
* (bluefox) Corrected configuration in dark theme

### 4.0.3 (2022-03-20)
* (bluefox) Update packages

### 4.0.2 (2021-05-08)
* (Apollon77) prevent warnings in js-controller 3.3

### 4.0.1 (2021-03-24)
* (Apollon77) update homebridge and wrapper to 1.3.4 (latest as of today). IMPORTANT: Requires also homebridge 1.3.x installed when using global mode and local mode will update to 1.3.x too! Check your plugins for updates!
* (UncleSamSwiss) Add an experimental version of new plugin selection and configuration tab - TRY IT OUT!
* (Apollon77) IMPORTANT: Configurations in local/global mode with child bridges will NOT work because ioBroker can not access the data on the child bridge processes!

### 3.0.2 (2020-11-29)
* (Apollon77) update homebridge in wrapper to 1.1.6 (latest as of today)

### 3.0.1 (2020-08-08)
* (Apollon77) set a very high limit (again) on allowed accessories and services because irrelevant

### 3.0.0 (2020-08-04)
* (Apollon77) BREAKING: ONLY WORKS WITH HOMEBRIDGE 1.1.x+ AND Node JS >=10.17.0!! Make sure plugins support it AND homebridge is updated to 1.1.x when you use the Global Mode!

### 1.1.2 (2019-07-08)
* (Apollon77) Allow more than 149 accessories in wrapper mode

### 1.1.1 (2019-07-05)
* (Apollon77) Add option to update NPM modules in Admin. Reinstall will happen after saving settings
* (Apollon77) Enhance NPM installation handling
* (Apollon77) Allow to specify special version of homebridge NPM packages using name@version
* (Apollon77) Allow to specify homebridge command line options. They will be added to the command line arguments (Some plugins need that or special features are only available with it)
* (Apollon77) Add "Local" mode that installs an own homebridge and run it as bridge

### 1.0.1 (2019-01-16)
* (SchumyHao) Add Chinese support

### 1.0.0 (WIP)
* (Apollon77) add polling interval to global mode
* (Apollon77) add option to use insecure flag in wrapper mode

### 0.4.5 (2018.08.21)
* (Apollon77) issues fixed

### 0.4.4 (2018.08.07)
* (Apollon77) corrected automatic role determination and bugs fixed

### 0.4.2 (2018.06.25)
* (Apollon77) Fix for global mode

### 0.4.1 (2018.06.21)
* (Apollon77) option to poll values from the plugins added and other optimizations

### 0.3.1 (2018.06.20)
* (kirovilya) Fixed a bug in global mode that values were not reported back to iOS devices

### 0.3.0 (2018.06.20)
* (bluefox) Support of ham plugins was added

### 0.2.6 (2018.06.19)
* (Apollon77) Updates for Homebridge-Wrapper

### 0.2.5 (2018.06.18)
* (Apollon77) Catch all console logs from Homebridge and make available as debug log

### 0.2.4 (2018.06.18)
* (Apollon77) Updates for Homebridge-Wrapper

### 0.2.3 (2018.06.17)
* (Apollon77) Updates for Homebridge-Wrapper

### 0.2.2 (2018.06.17)
* (Bluefox) Fixes for JSON editor in Firefox and Chrome

### 0.2.0/0.2.1 (2018.06.17)
* (Apollon77) Public test version with both modes
* (Bluefox) Admin3

### 0.1.0 (2018.06.09)
* (Apollon77) Update for working mode 1

### 0.0.1 (2018.03.24)
* (kirovilya) initial commit

## License
The MIT License (MIT)

Copyright (c) 2018-2022 Apollon77 <ingo@fischer-ka.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.