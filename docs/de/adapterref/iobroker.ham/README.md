---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ham/README.md
title: ioBroker Homebridge Zubehörmanager
hash: pMfY20qhyweXxVD4Pwdxei1KsWwHl58UGm1QU5h/IVQ=
---
![Logo](../../../en/adapterref/iobroker.ham/admin/ham.png)

![Anzahl der Installationen](http://iobroker.live/badges/ham-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.ham.svg)
![Test und Freigabe](https://github.com/ioBroker/iobroker.ham/workflows/Test%20and%20Release/badge.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/ham/svg-badge.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.ham.svg)

# IoBroker Homebridge Zubehörmanager
Nutzen Sie Homebridge-Plugins in ioBroker oder verwenden Sie eine global installierte Homebridge-Instanz als ioBroker-Adapter.
Alle Zustände von Homebridge sind auch in ioBroker verfügbar und können dort gesteuert werden.

## Beschreibung
Dieser Adapter bietet drei verschiedene Modi:

### Standardmodus (Wrapper-Modus)
Im Standardmodus ermöglicht der Adapter die direkte Verwendung von Homebridge-Plugin-Modulen.
Sie können alle verfügbaren Plugins auf der NPM-Website unter [Suche nach dem Schlüsselwort `homebridge-plugin`](https://www.npmjs.com/search?q=homebridge-plugin) erkunden.

Sie fügen einfach die Modulliste zur Adapterkonfiguration hinzu und geben die Konfiguration im JSON-Editor an (siehe Plugin-Beschreibungen).
Anschließend werden alle Homebridge-Objekte auch in ioBroker erstellt und alle beschreibbaren Objekte können geändert werden.

**WICHTIG: In diesem Modus können die Geräteintegrationen der bereitgestellten Homebridge-Plugins genutzt werden. Es wird keine „Bridge“ bereitgestellt, die von der Home-App verwendet werden kann!**

Hier finden Sie einen Link zu erfolgreich getesteten Plugins mit Beispielen: https://forum.iobroker.net/viewtopic.php?f=20&t=15021

### Lokaler Homebridge-Modus
Wenn Sie eine veröffentlichte Bridge haben möchten, die von der Home App verwendet werden soll, und auch über ioBroker mit ihr interagieren und die Daten abrufen möchten, aber Homebridge noch nicht installiert haben, dann verwenden Sie diesen Modus.

Im lokalen Modus wird die aktuelle kompatible Version von Homebridge installiert und als ioBroker-Benutzer ausgeführt. Die vollständige Homebridge-Konfiguration erfolgt über ioBroker.
Die Installation der Homebridge-Module wird ebenfalls über ioBroker durchgeführt.

**WICHTIG: Bei Verwendung von Child-Bridges (neue Homebridge-Funktion seit Version 1.3.x) kann der Adapter NICHT auf die von diesen Child-Bridges bereitgestellten Daten zugreifen! Nur die Haupt-Bridge ist erreichbar!**

### Globaler Heimbrückenmodus
Wenn Sie Homebridge (Apple OpenSource SmartHome) bereits global auf dem Host installiert haben, auf dem auch ioBroker läuft, können Sie diese bestehende Homebridge-Installation nutzen und sie als ioBroker-Prozess starten. **In diesem Fall wird der Homebridge-Server von ioBroker gestartet.**

**WICHTIG: Der globale Dienst darf NICHT vom System oder Ähnlichem gestartet werden. ioBroker selbst übernimmt den Start! Details zur optimalen Einrichtung finden Sie weiter unten.**

**WICHTIG: Da ioBroker Homebridge startet, erfolgt auch die Protokollierung über ioBroker. Sie können den Protokollierungsgrad der Instanz auf „silly“ setzen, um alle Homebridge-Protokolle anzuzeigen. Andernfalls werden nur die wichtigen Informationen gefiltert.**

Darüber hinaus sind alle Zustände von Homebridge als Zustände in ioBroker verfügbar und können von ioBroker aus gesteuert werden.

Damit dies funktioniert, müssen Sie den Pfad zum globalen Node-Modules-Ordner des Systems angeben. Rufen Sie dazu **npm root -g** auf. Zusätzlich benötigen Sie den Pfad zum Homebridge-Konfigurationsverzeichnis (normalerweise .homebridge im Benutzerverzeichnis).

**WICHTIG: ioBroker läuft als Benutzer "iobroker", Homebridge hingegen normalerweise als Root- oder Homebridge-Benutzer (je nach Installationsmethode). Stellen Sie sicher, dass der Homebridge-Ordner "persistance" für den Benutzer "ioBroker" zugänglich ist. Andernfalls erhalten Sie Fehlermeldungen, dass die Datei nicht gespeichert werden kann (was zum Absturz des Adapters führen kann!).**

**WICHTIG: Bei Verwendung von Child-Bridges (neue Homebridge-Funktion seit Version 1.3.x) kann der Adapter NICHT auf die von diesen Child-Bridges bereitgestellten Daten zugreifen! Nur die Haupt-Bridge ist erreichbar!**

#### Details zur Installation als Global Bridge
Vielen Dank an @Anzic23 für die Details zur optimalen Einrichtung von Homebridge im globalen Modus:

1. `sudo npm install -g --unsafe-perm homebridge homebridge-config-ui-x`
2. Installieren Sie hb-service (sudo hb-service install --user homebridge). Dieser Schritt ist erforderlich, um die notwendigen Dateien und Verzeichnisse zu erstellen.
3. Deinstallieren Sie hb-service (sudo hb-service uninstall)
4. Nach der Installation von Homebridge

```
sudo chmod 777 -R /var/lib/homebridge/
sudo chmod 777 -R /usr/lib/node_modules/homebridge
```

Globaler Homebridge-Pfad in iobroker: /usr/lib/node_modules/homebridge

Globaler Homebridge-Konfigurationsverzeichnispfad: /var/lib/homebridge

## Die folgenden Plugins wurden im Standardmodus getestet
* homebridge-chamberlain v1.0.1 - Plugin für Chamberlain-Garagentoröffner mit MyQ
* homebridge-doorbird v0.0.4 - Plugin für Doorbird
* homebridge-dyson-link v2.2.2 - Dyson Link-Geräte
* homebridge-edomoticz v2.1.11 - Ein vollwertiges, aktuelles Plugin für Domoticz
* homebridge-Fibaro-HC2 v2.1.5 - Fibaro HomeCenter-Integration
* homebridge-homee v0.2.4 - Ein vollwertiges, aktuelles Plugin für Homee
* homebridge-ikea-tradfri-gateway v1.0.26 - Tradfri
* homebridge-noolite v0.0.29 - Noolite über USB MTRF-64 oder MTRF-64 Module
* homebridge-platform-wemo v1.0.1 - Belkin WeMo Platform-Plugin
* homebridge-seasons v1.0.1 - Ein Plugin zur Anzeige der aktuellen Jahreszeit.
* homebridge-vera v0.8.2 - VeraLink ist eine Anwendung für Z-Wave-Zubehör von Vera (Node.js 8.11.3)

... und viele mehr

## TODO
* Tests
* Mehr Dokumentation?!
* Testen und herausfinden, ob ESM-Module in welchem Modus funktionieren (ich erwarte keinen).

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **IN BEARBEITUNG** -->

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