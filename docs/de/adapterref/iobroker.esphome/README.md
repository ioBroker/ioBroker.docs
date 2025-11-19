---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.esphome/README.md
title: ioBroker.esphome
hash: /o7CXk8dOKe5XtHXCkPUvdn9eNbmGkhJZBI+32OMr9E=
---
![NPM-Version](http://img.shields.io/npm/v/iobroker.esphome.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.esphome.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/esphome-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/esphome-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/DrozmotiX/iobroker.esphome.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/DrozmotiX/ioBroker.esphome/badge.svg)
![NPM](https://nodei.co/npm/iobroker.esphome.png?downloads=true)

<img src="./admin/esphome.png" width="10%" height="10%" align="center">

# IoBroker.esphome
[![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/ESPHome/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Tests:** ![Test und Freigabe](https://github.com/DrozmotiX/ioBroker.esphome/workflows/Test%20and%20Release/badge.svg)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in Abschnitt [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## ESPHome-Adapter für ioBroker
Steuern Sie Ihren ESP8266/ESP32 mit einfachen, aber leistungsstarken Konfigurationsdateien, die von ESPHome erstellt und verwaltet werden. Die native Integration von ESPHome-Geräten (inklusive Dashboard) über die native API gewährleistet die Synchronisierung aller Daten (Live-Ereignisverarbeitung, kein Daten-Polling!).

![Logo](../../../en/adapterref/iobroker.esphome/admin/img/dashboard.png)

**Schnelllinks:**

- 📋 [FAQ - Häufig gestellte Fragen](#frequently-asked-questions-faq)
- ⚙️ [Voraussetzungen & Einrichtung](#prerequisites)
- 🎛️ [Dashboard-Integration](#esphome-dashboard-integration-optional)
- 📱 [Geräteverwaltung](#device-management)
- 🔧 [Konfigurationsbeispiele](#example-config)

Dieser Adapter verwendet [esphome-native-api](https://github.com/twocolors/esphome-native-api#readme) mit allen Credits an @twocolors zur Interaktion mit der [ESPHome API](https://esphome.io/components/api.html?highlight=api)!

## Häufig gestellte Fragen (FAQ)
### Worin besteht der Unterschied zwischen dem ioBroker ESPHome Adapter und dem ESPHome Dashboard?
**ioBroker ESPHome Adapter:**

- Integriert Ihre ESPHome-Geräte in ioBroker zur Steuerung der Hausautomation.
- Kommuniziert direkt mit ESP-Geräten über die native API von ESPHome.
- Erstellt ioBroker-Zustände/Objekte zur Gerätesteuerung und -überwachung
- Verarbeitet Echtzeit-Aktualisierungen des Gerätestatus (kein Polling erforderlich)
- Verwaltet die Gerätekonfiguration innerhalb von ioBroker

**ESPHome-Dashboard:**

- Eine Weboberfläche zum Erstellen, Bearbeiten und Verwalten von ESPHome-Gerätekonfigurationen
- Wird zum Schreiben von YAML-Konfigurationen, zum Kompilieren von Firmware und zum Flashen von Geräten verwendet.
- Kann als optionale Funktion in die Admin-Oberfläche von ioBroker integriert werden.
- Kann entweder in den Adapter integriert oder als externe Installation (Docker, Standalone) ausgeführt werden.

**Zusammenfassend:** Der Adapter steuert Ihre Geräte innerhalb von ioBroker, während das Dashboard Gerätekonfigurationen und Firmware verwaltet.

### Wie konfiguriere ich die IP-Auswahl im Dashboard?
Die Dashboard-IP-Einstellung in der Adapterkonfiguration dient verschiedenen Zwecken:

**Für den integrierten Dashboard-Tab in ioBroker Admin:**

1. Geben Sie die IP-Adresse und den Port ein, unter dem Ihr ESPHome Dashboard läuft.
2. **Integriertes Dashboard:** Verwenden Sie `127.0.0.1:6052` (Standard für integriertes Dashboard)
3. **Externes Dashboard:** Verwenden Sie die IP-Adresse und den Port Ihrer externen ESPHome-Installation (z. B. Docker-Container).
4. **HTTPS-Einrichtung:** Für HTTPS-Umgebungen beachten Sie bitte den unten stehenden Abschnitt zur detaillierten HTTPS-Konfiguration.

**Dashboard-IP-Beispiele:**

- Eingebaut: `127.0.0.1:6052`
- Externer Docker: `192.168.1.100:6052`
- Externer Host: `esphome.local:6052`
- HTTPS-Proxy: `https://192.168.1.50:8082/proxy.0/esphome/`

![ESPHome Dashboard IP-Konfiguration](../../../en/adapterref/iobroker.esphome/admin/img/ESPhomeDashboardIP.png)

**Hinweis:** Mit diesem Adapter können Sie ESPHome-Geräte steuern, ohne die Dashboard-IP konfigurieren zu müssen. Die Dashboard-IP wird nur benötigt, wenn Sie die ESPHome-Dashboard-Oberfläche in das Admin-Panel von ioBroker integrieren möchten.

### Benötige ich das ESPHome Dashboard, um diesen Adapter zu verwenden?
**Nein, das Dashboard ist optional.** Sie können diesen Adapter auf verschiedene Arten verwenden:

1. **Nur Adapter:** Steuern Sie vorkonfigurierte ESPHome-Geräte ohne Dashboard-Integration.
2. **Adapter + Externes Dashboard:** Nutzen Sie Ihre bestehende ESPHome-Installation (Docker, Standalone) und integrieren Sie diese optional in die ioBroker-Oberfläche.
3. **Adapter + Integriertes Dashboard:** Aktivieren Sie die integrierte ESPHome-Dashboard-Funktion für eine Komplettlösung.

Der Adapter funktioniert unabhängig und benötigt nur Geräte, bei denen die ESPHome-API in der Konfiguration aktiviert ist.

### Wie füge ich Geräte zum Adapter hinzu?
1. **Stellen Sie sicher, dass die ESPHome-API in der YAML-Konfiguration Ihres Geräts aktiviert ist** (siehe Abschnitt Voraussetzungen).
2. **Öffnen Sie den Geräte-Tab des Adapters** in ioBroker Admin (der Adapter muss ausgeführt werden).
3. **Geräte manuell hinzufügen:** Geben Sie die IP-Adresse des Geräts und die Anmeldeinformationen ein.
4. **Automatische Erkennung:** Derzeit deaktiviert (siehe Problem #175)

Der Adapter stellt eine Verbindung her und erstellt alle notwendigen ioBroker-Objekte zur Gerätesteuerung.

## [Dokumentation](https://DrozmotiX.github.io/languages/en/Adapter/ESPHome/)

## [Dokumentation](https://DrozmotiX.github.io/languages/en/Adapter/ESPHome/)
Unsere gesamte Adapterdokumentation finden Sie unter [Die DrozmotiX-Dokumentationsseite](https://DrozmotiX.github.io/languages/en/Adapter/ESPHome/) -->

## Voraussetzungen
* NodeJS >= 18.x
* Die API ist in YAML aktiviert.
* Für Admin-Registerkarten (optional)
Die IP-Adresse des ESPHome-Dashboards wird in den Instanzeinstellungen angegeben.

## ESPHome Dashboard-Integration (optional)
Dieser Adapter ermöglicht optional die Integration des ESPHome-Dashboards in die Administrationsoberfläche von ioBroker. Sie haben mehrere Optionen:

**Option 1: Integriertes Dashboard (Empfohlen für Anfänger)**

- Aktivieren Sie die Option „Native Integration des ESPHome Dashboards“ in den Adaptereinstellungen.
- Nutzt eine integrierte Python-Umgebung (keine externe Einrichtung erforderlich)
Das Dashboard läuft standardmäßig auf Port 6052.
- Legen Sie die Dashboard-IP für die Admin-Integration auf `127.0.0.1:6052` fest.

**Option 2: Externes Dashboard**

- Verwenden Sie eine bestehende ESPHome-Installation (Docker, Standalone usw.).
- Geben Sie die IP-Adresse und den Port des externen Dashboards in den Adaptereinstellungen ein.
- Beispiel: `192.168.1.100:6052` für einen Docker-Container

**Option 3: Keine Dashboard-Integration**

- Dashboard-Konfiguration komplett überspringen
- Verwenden Sie externe ESPHome-Tools zur Gerätekonfiguration
Der Adapter steuert die Geräte weiterhin normal.

![Dashboard-IP-Konfiguration](../../../en/adapterref/iobroker.esphome/admin/img/ESPhomeDashboardIP.png)

> **💡 Siehe die oben stehenden FAQs** für detaillierte Erläuterungen zur Dashboard-IP-Konfiguration und zu den Unterschieden zwischen Adapter und Dashboard.

### Verwendung von HTTPS
Ein Grund für die Verwendung von HTTPS ist die Möglichkeit, Geräte, die an Ihren PC angeschlossen sind, direkt zu flashen, da ESPHome dies mit HTTP nicht zulässt (wahrscheinlich eine Browserbeschränkung bei WebSerial).

![flashFromThisComputer.png](../../../en/adapterref/iobroker.esphome/admin/img/flashFromThisComputer.png)

Die Nutzung des integrierten Dashboards erfordert derzeit einige zusätzliche Schritte, wenn iobroker HTTPS verwendet:

1. Installieren Sie – falls noch nicht geschehen – den Webadapter und konfigurieren Sie HTTPS. Weitere Informationen finden Sie in der Webdokumentation: [ioBroker.web](https://github.com/ioBroker/ioBroker.web)
2. Installieren Sie den [Proxy](https://github.com/ioBroker/ioBroker.proxy)-Adapter.
3. Konfigurieren Sie den Pfad in den Proxy-Adaptereinstellungen:
1. Kontext: `esphome/`
2. URL: `http://localhost:6052`

![proxy.png](../../../en/adapterref/iobroker.esphome/admin/img/proxy.png)

4. Konfigurieren Sie die vollständige Dashboard-URL im erweiterten Abschnitt der ESPHome-Adaptereinstellungen – ESPHome-Dashboard:
1. Beispiel: `https://<iobrokerIP>:<webAdapterPort>/proxy.0/esphome/`
2. wobei `<iobrokerIP>` die IP-Adresse des Hosts ist, auf dem Ihr iobroker ausgeführt wird (genau wie oben)
3. und `<webAdapterPort>` ist der Port des Webadapters (Standardwert ist 8082).
4. Es sollte ungefähr so aussehen:

   ![ESPHomeDashboardUrl.png](../../../en/adapterref/iobroker.esphome/admin/img/ESPHomeDashboardUrl.png)

5. Wenn Sie das Dashboard auf einem externen Host ausführen, können Sie hier auch die URL zu einer externen Dashboard-Instanz verwenden.

## So verwenden Sie diesen Adapter
### API in YAML aktivieren
> [!IMPORTANT] > ioBroker ESPHome ermöglicht die Integration von Geräten per Verschlüsselungsschlüssel (empfohlen) oder API-Passwort (ältere Version). > Sie müssen Ihre Authentifizierungseinstellungen entsprechend festlegen, > siehe [ESPHome-Dokumentation](https://esphome.io/components/api.html?highlight=api) > Bitte konfigurieren Sie nur den Verschlüsselungsschlüssel (bevorzugt) oder das API-Passwort (ältere Version).

#### Beispiel für einen Eintrag in der Konfiguration des Verschlüsselungsschlüssels
```
api:
  encryption:
    key: "DyDfEgDzmA9GlK6ZuLkj3qgFcjXiZUzUf4chnIcjQto="
```

#### Beispiel für einen API-Konfigurationseintrag
```
api:
  password: 'MyPassword'
```

## Geräteverwaltung
### ESPHome-Geräte zu ioBroker hinzufügen / ändern / entfernen
[!WICHTIG] Dieser Adapter ermöglicht die Kommunikation mit ESPHome-fähigen Geräten und (falls aktiviert) eine integrierte Version des ESPHome-Dashboards.

Sie müssen Ihre ESP-Konfiguration selbst konfigurieren und hochladen, entweder über das integrierte Dashboard oder eine externe Alternative (z. B. Docker), bevor diese in ioBroker integriert werden kann.

> **💡 Siehe die oben stehenden FAQs** für eine Schritt-für-Schritt-Anleitung zum Hinzufügen von Geräten zum Adapter.

Im Geräte-Tab werden alle aktuell bekannten Geräte angezeigt. Sie können entweder warten, bis Geräte automatisch erkannt werden (derzeit deaktiviert, siehe #175), oder sie manuell hinzufügen, indem Sie deren IP-Adresse und Zugangsdaten angeben.

![Geräte-Registerkarte](../../../en/adapterref/iobroker.esphome/admin/img/deviceTabEmpty.png)

[!HINWEIS] Die Schaltflächen zum Hinzufügen, Ändern und Entfernen von Geräten sowie zum Laden der Gerätetabelle sind nur verfügbar, wenn der Adapter läuft! Sie müssen die Gerätetabelle manuell aktualisieren, indem Sie auf „Geräteübersicht aktualisieren“ klicken. Anschließend werden alle Geräte und deren Verbindungsstatus angezeigt.

Bitte geben Sie die IP-Adresse ein (falls das Gerät bereits bekannt ist, können Sie es aus der Dropdown-Liste auswählen) und wählen Sie die gewünschten Aktionen aus:

- Geräte hinzufügen / ändern
- Sendet IP-Adresse und Anmeldeinformationen an den Backend-Server und versucht, eine Verbindung herzustellen
- Wenn ein Verschlüsselungsschlüssel angegeben wird, wird das API-Passwort ignoriert. Bitte stellen Sie eine korrekte YAML-Konfiguration sicher!

- Gerät löschen
- Es wird eine Nachricht an den Backend-Server gesendet, um dieses Gerät zu entfernen.

> [!WARNUNG] > Diese Aktion entfernt ein ausgewähltes Gerät und alle zugehörigen Zustände aus ioBroker!

> [!HINWEIS] > Nach dem Hinzufügen eines Geräts wird eine Meldung angezeigt, ob dies erfolgreich war oder ein Fehler aufgetreten ist. > Sie können die Tabelle aktualisieren, um die aktuellen Geräte und deren Verbindungsstatus anzuzeigen.

![Gerätefehler](admin/img/connectionIssue.png) ![GeräteOK](../../../en/adapterref/iobroker.esphome/admin/img/connectionOK.png)

Bei erfolgreicher Verbindung wird das Gerät initialisiert und alle zugehörigen Zustände zur Steuerung seiner Attribute erstellt.
Bei Änderungen an Ihrer YAML-Konfiguration wird durch einen Neustart des ESP die Verbindung getrennt und eine neue Verbindung hergestellt. Dabei werden Zustände, die nicht mehr zur YAML-Konfiguration gehören, automatisch entfernt.

![GeräteOK](../../../en/adapterref/iobroker.esphome/admin/img/deviceTree.png)

### Beispielkonfiguration
Beispielkonfiguration, weitere Beispiele finden Sie in [Die DrozmotiX-Dokumentationsseite (https://DrozmotiX.github.io) oder die ESPHome-Dokumentation](https://esphome.io/index.html)

<details><summary>Beispielkonfiguration anzeigen</summary>

esphome: Name: sensor_badkamer Plattform: ESP32 Board: esp-wrover-kit

WLAN: use_address: 192.168.10.122 ssid: "xxxxx" password: "xxxxxx"

# ESPHome-API aktivieren
API: Passwort: 'MeinPasswort'

# Aktiviere den I2C-Bus i2c: sda: 21 scl: 22 scan: True id: bus_a
# Beispielkonfiguration für bh1750
Sensor:

- Plattform: bh1750

Name: "Hal_Illuminance" Adresse: 0x23 Messzeit: 69 Aktualisierungsintervall: 10s

# Beispielkonfiguration für einen GPIO-Ausgang
    Ausgabe:

- Plattform: GPIO

Pin: 12 invertiert: true ID: gpio_12

# Beispielkonfiguration zur Verknüpfung eines Schalters mit dem zuvor definierten Ausgang
    schalten:

- Plattform: Ausgabe

Name: "Generische Ausgabe" Ausgabe: 'gpio_12' </details>

## Tasmota / ESPEasy Migration
Die Migration von früheren Sonoff Tasmota- oder ESPEasy-Installationen ist sehr einfach. Sie müssen lediglich ESPHome eine Binärdatei erstellen lassen und diese anschließend über die Weboberfläche hochladen.

Weitere Details finden Sie in unserem Abschnitt [Dokumentenseite](https://DrozmotiX.github.io/languages/en/Adapter/ESPHome/06.migration.html).

**_HINWEIS:_** Die generierten YAML-Dateien werden unter ```/opt/iobroker/iobroker-data/iobroker.esphome.>instance</>device<.yaml gespeichert.

## Unterstützt mich
Wenn Ihnen meine Arbeit gefällt, erwägen Sie bitte eine persönliche Spende (dies ist ein persönlicher Spendenlink für DutchmanNL, er steht in keiner Verbindung zum ioBroker-Projekt!). [![Spenden](https://raw.githubusercontent.com/DrozmotiX/ioBroker.sourceanalytix/main/admin/button.png)](http://paypal.me/DutchmanNL)

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
    * (DutchmanNL) 
-->
### __WORK IN PROGRESS__
* (@SimonFischer04) fix readme link to lib
* (@SimonFischer04) fix connection status #311
* (@SimonFischer04) remove unneeded node-fetch dependency

### 0.6.3 (2025-09-16)
* (@DutchmanNL) Fixed an admin error related to `jsonConfig` validation. #287
* (@DutchmanNL) Various general fixes and dependency updates to improve stability.
* (@DutchmanNL) Improved responsive design for better usability across devices. #284
* (@DutchmanNL) Introduced GitHub Actions to automatically verify the ESPHome Dashboard. #290
* (@DutchmanNL) Added a comprehensive FAQ section to the README to help users with common questions. #286
* (@DutchmanNL) Updated the `esphome-native-api` library to V1.3.3, which may resolve connection issues. #201

### 0.6.2 (2025-08-08)
* (@SimonFischer04) add support for text device type #141, displays #103
* (@SimonFischer04) fix cover device type #156
* (@SimonFischer04) workaround: downgrade python for now. fixes #259

### 0.6.1 (2025-05-24)
* (@SimonFischer04) Update esphome
* (@ticaki) Optimize admin configuration interface
* (@DutchmanNL) Optimize backend handling of device discovery
* (@DutchmanNL) Capability to select ESPHome Dashboard version added, resolves #118

### 0.5.0-beta.8 (2023-11-24)
* (DutchmanNL) Capability to automatically detect new devices added
* (DutchmanNL) Ensures a compatible pillow version is used (10.0.1)
* (SimonFischer04) Add pillow python package by default, resolves #188

### 0.5.0-beta.4 (2023-11-15)
* (DutchmanNL) Refactor memory caching of device data, resolves #189

## License
MIT License

Copyright (c) 2023-2025 DutchmanNL <rdrozda86@gmail.com>

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