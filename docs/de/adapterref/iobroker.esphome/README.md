---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.esphome/README.md
title: ioBroker.esphome
hash: brop47b6AkIPnnPCn7pqlRZ51YIu/FdYQHtS4QKGH4g=
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

**_HINWEIS:_** Generierte Yaml-Dateien werden unter „/opt/iobroker/iobroker-data/iobroker.esphome.>instance</>device<.yaml“ gespeichert

## Unterstütze mich
Wenn Ihnen meine Arbeit gefällt, ziehen Sie bitte eine persönliche Spende in Betracht (dies ist ein persönlicher Spendenlink für DutchmanNL, kein Bezug zum ioBroker-Projekt!) [![Spenden](https://raw.githubusercontent.com/DrozmotiX/ioBroker.sourceanalytix/main/admin/button.png)](http://paypal.me/DutchmanNL)

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
    * (DutchmanNL) 
-->
### 0.4.1 (2023-11-05)
* (DutchmanNL) Bugfix: Password / connection issues in previous beta resolves #179
* (DutchmanNL) Bugfix: Allow individual API password or encryption keys for devices, resolves #174
* (DutchmanNL) Support ESPHome device Encryption Key (you should migrate from API password to Encryption Key ! resolves #152)

### 0.4.0 (2023-11-03)
* (DutchmanNL) Added cleanup capability for unused channels & states after initialisation of device, resolves #39
* (DutchmanNL) Added button to info channel which allows to delete all offline devices from adapter tree. resolves #39
* (DutchmanNL) [Breaking] Backup strategy changed, requires [BackitUp v2.9.1](https://github.com/simatec/ioBroker.backitup) and activate option for ESPHome, fixes #129

### 0.3.2 (2023-11-01)
* (DutchmanNL) Improved error handling if devices are not reachable/disconnected
* (DutchmanNL) Bugfix: Allow control of brightness and color for light component, resolves #173

### 0.3.1 (2023-10-31)
* (DutchmanNL) Bugfix: Show online state of ESP Device correctly, resolves #106

### 0.3.0 (2023-10-31) - Bugfixes & Improvements
* (Dutchman & SimonFischer04) Several Bugfixes
* (SimonFischer04) Support type "select device"
* (DutchmanNL) ESPHome dashboard default disabled
* (SimonFischer04) Migrate to @2colors/esphome-native-api
* (DutchmanNL) Automatically create needed directories, resolves #168
* (SimonFischer04) Migrate usage of python to new structure, should solve all ESPHome Dashboard related installation issues

## License
MIT License

Copyright (c) 2023 DutchmanNL <rdrozda86@gmail.com>

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