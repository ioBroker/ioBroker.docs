---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.esphome/README.md
title: ioBroker.esphome
hash: TP7UtprFwQisnYhIGzA8GNiWmbFtPlXUvyKmsBAB5XI=
---
![NPM-Version](http://img.shields.io/npm/v/iobroker.esphome.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.esphome.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/esphome-installed.svg)
![Anzahl Installationen (stabil)](http://iobroker.live/badges/esphome-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/DrozmotiX/iobroker.esphome.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/DrozmotiX/ioBroker.esphome/badge.svg)
![NPM](https://nodei.co/npm/iobroker.esphome.png?downloads=true)

<img src="./admin/esphome.png" width="10%" height="10%" align="center">

# IoBroker.esphome
[![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/ESPHome/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Tests:** ![Test und Freigabe](https://github.com/DrozmotiX/ioBroker.esphome/workflows/Test%20and%20Release/badge.svg)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

## ESPHome-Adapter für ioBroker
Steuern Sie Ihren ESP8266/ESP32 mit einfachen, aber leistungsstarken Konfigurationsdateien, die von ESPHome erstellt und verwaltet werden.
Native Integration des von ESPHome verwalteten Geräts (einschließlich Dashboard) über seine native API und stellt sicher, dass alle Daten synchronisiert sind (Live-Event-Verarbeitung, keine Datenabfrage! :)

![Logo](../../../en/adapterref/iobroker.esphome/admin/img/dashboard.png)

Dieser Adapter nutzt die [esphome-native-api](https://github.com/Nafaya/esphome-native-api#readme) mit allen Dank an @Nafaya für die Interaktion mit der [ESPHome-API](https://esphome.io/components/api.html?highlight=api)!

## [Dokumentation](https://DrozmotiX.github.io/languages/en/Adapter/ESPHome/)
Unsere gesamte Adapterdokumentation finden Sie unter [Die DrozmotiX-Dokuseite](https://DrozmotiX.github.io/languages/en/Adapter/ESPHome/)

## Voraussetzungen
    * NodeJS >= 18.x
    * API ist in YAML aktiviert
    * Für Admin-Registerkarten (optional)
        * Die ESPHome Dashboard-IP wird in den Instanzeinstellungen bereitgestellt

### API in YAML aktivieren
```
api:
  password: 'MyPassword'
```

### Beispielkonfiguration
Beispielkonfiguration, weitere Beispiele finden Sie unter [Die DrozmotiX-Dokumentationsseite](https://DrozmotiX.github.io) oder [ESPHome-Dokumentation](https://esphome.io/index.html)

<details><summary>Beispielkonfiguration anzeigen</summary>

esphome: Name: sensor_badkamer Plattform: ESP32-Board: esp-wrover-kit

WLAN: use_address: 192.168.10.122 SSID: „xxxxx“ Passwort: „xxxxxx“

    # Aktivieren Sie die ESPHome-API
API: Passwort: 'MyPassword'

# I2c-Bus aktivieren i2c: sda: 21 scl: 22 scan: True id: bus_a
    # Beispielkonfiguration für bh1750
    Sensor:

      - Plattform: bh1750

Name: „Hal_Illuminance“ Adresse: 0x23 Messzeit: 69 Aktualisierungsintervall: 10s

    # Beispielkonfiguration für einen GPIO-Ausgang
    Ausgabe:

      - Plattform: GPIO

Pin: 12 invertiert: wahr ID: gpio_12

    # Beispielkonfiguration, die einen Schalter mit dem zuvor definierten Ausgang verknüpft
    schalten:

      - Plattform: Ausgabe

Name: „Generische Ausgabe“ Ausgabe: „gpio_12“ </details>

## Tasmota / ESPEinfache Migration
Die Migration von früheren Sonoff Tasmota- oder ESPEasy-Setups ist sehr einfach. Sie müssen lediglich ESPHome eine Binärdatei für Sie erstellen lassen und diese dann in die Weboberfläche hochladen.
Weitere Einzelheiten finden Sie in unseren [Doku-Seite](https://DrozmotiX.github.io/languages/en/Adapter/ESPHome/06.migration.html)

.. Notiz::

    Generierte Yaml-Dateien werden unter ```/opt/iobroker/node_modules/iobroker.esphome/config/>device<.yaml``` gespeichert.

## Unterstütze mich
Wenn Ihnen meine Arbeit gefällt, denken Sie bitte über eine persönliche Spende nach (dies ist ein persönlicher Spendenlink für DutchmanNL, kein Bezug zum ioBroker-Projekt!) [![Spenden](https://raw.githubusercontent.com/DrozmotiX/ioBroker.sourceanalytix/main/admin/button.png)](http://paypal.me/DutchmanNL)

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
    * (DutchmanNL) 
-->

### 0.2.4 (2021-08-24)
* (DutchmanNL) Version of ESPHome Dashboard updated to 2021.8
* (DutchmanNL) Add option if config of ESPHome device should be shown as states (default = FALSE, safes 8 states for each sensor) 

### 0.2.3 (2021-06-29)
* (Jey-Cee) Bugfix : Light component state not changed [#74](https://github.com/DrozmotiX/ioBroker.esphome/issues/74)
* (DutchmanNL) Update compatibility to version 1.19.4 of ESPHome Dashboard

### 0.2.2 (2021-06-24)
* (DutchmanNL) [!!! Breaking !!!] Make YAML file persistent, backup your configuration before updating ! solves [#57](https://github.com/DrozmotiX/ioBroker.esphome/issues/57)
* (DutchmanNL) Update ESPHome Dashboard to 1.18.0, requires  Python >=3.7 (and ensure <4.0!)
* (DutchmanNL) Bugfix : Reconnect to devices without autodiscovery / MDNS-Broadcast in network, solves [#66](https://github.com/DrozmotiX/ioBroker.esphome/issues/66)

### 0.2.1-1 (2021-03-30)
* (DutchmanNL) add cover component
* (DutchmanNL) add transitionLength for lights

### 0.2.1-0 (2021-03-30)
* (DutchmanNL) Logging improved, solves [#48](https://github.com/DrozmotiX/ioBroker.esphome/issues/48)
* (DutchmanNL) Name of states changed, solves [#49](https://github.com/DrozmotiX/ioBroker.esphome/issues/49)

### 0.2.0 (2021-03-29)
* (DutchmanNL) Translations updated
* (DutchmanNL) Configuration page updated
* (DutchmanNL) Added to sentry error reporting
* (DutchmanNL) Native integration of ESPHome Dashboard added

### 0.1.5 (2021-03-21)
* (DutchmanNL) Add Translations

### 0.1.4 (2021-03-19)
* (DutchmanNL) Implemented RGBW
* (DutchmanNL) Ensure correct encryption and storage of passwords
* (DutchmanNL) Proper value ranges for type light (255 instead 100)
* (DutchmanNL) Implemented hex color state for type light (if RGB is available)

### 0.1.2 (2021-03-02)
* (DutchmanNL) Type Fan added
* (DutchmanNL) Type Light added
* (DutchmanNL) Error messages optimized
* (DutchmanNL) Device reconnect handling improved
* (DutchmanNL) [Breaking!] Change state name to default "state" for type BinarySensor / Climate / Sensor / TextSensor & Switch  
* (DutchmanNL) Autodiscovery improved, non-ESPHome devices excluded

### 0.1.0 (2021-02-27)
* (DutchmanNL) Autodiscovery implemented
* (DutchmanNL) Type Climat added
* (DutchmanNL) Type TextSensor added
* (DutchmanNL) Solved reconnection issues
* (DutchmanNL) Optimized error messages for unknown types
* (DutchmanNL & @xXBJXx) Adapter configuration page optimized

### 0.0.1
* (DutchmanNL) initial release

## License
MIT License

Copyright (c) 2021 DutchmanNL <rdrozda86@gmail.com>

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