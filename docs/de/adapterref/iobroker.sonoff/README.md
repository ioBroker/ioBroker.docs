---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sonoff/README.md
title: ioBroker Sonoff
hash: wPAup01SFAbWUNZvoOWrvxxZqchVQG19zEZZKPS8SAk=
---
![Logo](../../../en/adapterref/iobroker.sonoff/admin/sonoff.png)

![Anzahl der Installationen](http://iobroker.live/badges/sonoff-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.sonoff.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.sonoff.svg)

# IoBroker Sonoff
![Test und Freigabe](https://github.com/ioBroker/ioBroker.sonoff/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/sonoff/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

## Vergleich von ioBroker-Adaptern mit MQTT-Protokoll
Wenn Sie nur über Tasmotas sprechendes MQTT-Protokoll verfügen, wählen Sie `ioBroker.sonoff`.
Erwägen Sie für andere Szenarien die verschiedenen Optionen:

| Funktion | ioBroker.sonoff | [ioBroker.mqtt](https://github.com/ioBroker/ioBroker.mqtt/) (im Broker-Modus) | [ioBroker.mqtt](https://github.com/ioBroker/ioBroker.mqtt/) (im Client-Modus) | [ioBroker.mqtt-client](https://github.com/Pmant/ioBroker.mqtt-client/) |
|-----------------------------------------------|------------------|-------------------------------------------------------------------------------|------------------------------------------------------------------------------|------------------------------------------------------------------------|
| Verfügt über einen integrierten MQTT-Broker | ja | ja | nein | nein |
| Leitet Nachrichten an andere MQTT-Abonnenten weiter | NEIN!!! | ja | nicht anwendbar | nicht anwendbar |
| Externer MQTT-Broker | nicht unterstützt | nicht unterstützt | erforderlich | erforderlich |
| Tasmota MQTT-Nachrichten an ioBroker-Objekte | intelligente Verarbeitung | 1:1 Verarbeitung aller Nachrichten | 1:1-Verarbeitung abonnierter Nachrichten | 1:1-Verarbeitung abonnierter Nachrichten |
| Nicht-Tasmota-MQTT-Nachrichten an ioBroker-Objekte | keine Bearbeitung | 1:1 Verarbeitung aller Nachrichten | 1:1-Verarbeitung abonnierter Nachrichten | 1:1-Verarbeitung abonnierter Nachrichten |
| ioBroker-Werte als MQTT-Nachrichten veröffentlichen | Keine             | konfigurierte Teilbäume | konfigurierte Teilbäume | individuell konfigurierte Werte |

## Verwendung
Dieser Adapter kommuniziert mit Sonoff-Geräten mit Tasmota-Firmware oder ESP-Geräten über MQTT.

Folgende Themen werden erwartet:

- `tele/DeviceNAME/STATE`
- `tele/DeviceNAME/SENSOR`
- `tele/DeviceNAME/INFOx`
- `tele/DeviceNAME/ENERGY`
- „cmnd/DeviceNAME/POWERx“.
- `stat/DeviceNAME/POWERx`
- `/DeviceNAME/BM280/Temperature`
- „/DeviceNAME/BM280/Humidity“.
- `/DeviceNAME/BM280/Temperatur`
- `/DeviceNAME/BM280/Feuchtigkeit`
- `/GeräteNAME/BM280/Vcc`
- `/GeräteNAME/BM280/VCC`
- `/DeviceNAME/BM280/Laufzeit`
- `/GeräteNAME/BM280/RSSI`
- `/GeräteNAME/BM280/POWER`
- `/GeräteNAME/BM280/POWER1`
- `/GeräteNAME/BM280/POWER2`
- `/GeräteNAME/BM280/POWER3`
- `/GeräteNAME/BM280/POWER4`
- `/DeviceNAME/BM280/Switch1`
- `/GeräteNAME/BM280/Switch2`
- `/DeviceNAME/BM280/Total`
- `/DeviceNAME/BM280/Today`
- `/GeräteNAME/BM280/heute`
- `/DeviceNAME/BM280/Yesterday`
- `/DeviceNAME/BM280/gestern`
- `/GeräteNAME/BM280/Faktor`
- `/DeviceNAME/BM280/Factor`
- `/DeviceNAME/BM280/Power`
- `/DeviceNAME/BM280/Leistung`
- `/DeviceNAME/BM280/Voltage`
- `/DeviceNAME/BM280/Spannung`
- `/DeviceNAME/BM280/Current`
- `/GeräteNAME/BM280/Strom`
- `/DeviceNAME/BM280/Punkt`
- `/DeviceNAME/BM280/Counter1`
- `/DeviceNAME/BM280/Counter2`
- `/DeviceNAME/BM280/Counter3`
- `/DeviceNAME/BM280/Counter4`
- `/DeviceNAME/BM280/Pressure`
- `/DeviceNAME/BM280/SeaPressure`
- `/DeviceNAME/BM280/Druck`
- `/DeviceNAME/BM280/Approx. Höhe`
- `/DeviceNAME/BM280/Module`
- `/GeräteNAME/BM280/Version`
- `/GeräteNAME/BM280/Hostname`
- `/DeviceNAME/BM280/IPAddress`
- `/DeviceNAME/BM280/IPaddress`
- `/DeviceNAME/BM280/RestartReason`
- `/DeviceNAME/BM280/CarbonDioxide`
- `/DeviceNAME/DHT11/Illuminance`
- `/DeviceNAME/SonoffSC/Light`
- `/DeviceNAME/SonoffSC/Noise`
- `/DeviceNAME/SonoffSC/AirQuality`
- `/DeviceNAME/SDS0X1/PM2.5`
- `/DeviceNAME/SDS0X1/PM10`
- `/DeviceNAME/SDS0X1/UvLevel`
- `/DeviceNAME/SDS0X1/Latitude`
- `/DeviceNAME/SDS0X1/Longitude`
- `/DeviceNAME/SR04/Distance`

**Hinweis**: Die Liste könnte leicht erweitert werden. Bitte senden Sie `Pull Requests` oder *Debug-Daten* für unbekannte Zustände an den Entwickler (per Issue).

## Automatische Erstellung von Objekten
In der Webkonfiguration können Sie festlegen, welche MQTT-Telegramme die neuen Objekte nicht in Standarddatenpunkten erstellen:

* „TELE_SENSOR“ – erstellt Objekte aus „tele/xxx/SENSOR“-Telegrammen
* „TELE_STATE“ – erstellt Objekte aus „tele/xxx/STATE“-Telegrammen
* „STAT_RESULT“ – erstellt Objekte aus „stat/xxx/RESULT“-Telegrammen

Normalerweise sollte TELE_SENSOR für die meisten Benutzer ausreichend sein.

* „Objektbaum erstellen“ erstellt Objekte als Baumstruktur

**Warnung!** Diese Option wird Ihren Sonoff-Objektbaum durcheinander bringen! Sie müssen alle Einstellungen für die Speicherung erneut vornehmen...
Speichern Sie die Objektstruktur als JSON-Datei, damit Sie Ihre alte Struktur wiederherstellen können.
Am besten stoppen Sie den Adapter, löschen alle Objekte unter sonoff und starten den Adapter erneut.

## Flags für LED-Controller
Die Moduszustände werden nur erstellt, wenn das Gerät einen der folgenden Zustände hat:

- „Rot“, „Grün“, „Blau“, „WW“, „CW“, „Farbe“, „RGB_POWER“, „WW_POWER“, „CW_POWER“, „Farbton“, „Sättigung“.

Zustände:

* `modeLedExor` - exor für weiße LEDs und Farb-LEDs => wenn die weißen LEDs eingeschaltet sind, werden Farb-LEDs ausgeschaltet und umgekehrt (Standard true)
* „modeReadColors“ – ermöglicht das Lesen von Farben aus MQTT (Standard: falsch)

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **ARBEIT IN ARBEIT** -->

## Changelog
### 2.5.7 (2023-07-07)
* (mcm1957) Disabled the logging of username and password during connection errors
* (bluefox) added json config

### 2.5.3 (2023-03-30)
* (GreatSUN) Implemented potential `.STATE.POWER` update

### 2.5.1 (2022-04-23)
* (Apollon77) Fixed the crash case reported by Sentry

### 2.5.0 (2022-03-21)
* (GreatSUN) Implement writing of NSPanel Widget changes
* (Apollon77) Fixed the crash case reported by Sentry

### 2.4.7 (2021-11-14)
* (Apollon77) Fix crash case (Sentry IOBROKER-SONOFF-1S)

### 2.4.6 (2021-11-13)
* (Apollon77) Fix some crash cases reported by Sentry (IOBROKER-SONOFF-B, IOBROKER-SONOFF-R, IOBROKER-SONOFF-4, IOBROKER-SONOFF-1, IOBROKER-SONOFF-13, IOBROKER-SONOFF-1J, IOBROKER-SONOFF-16, IOBROKER-SONOFF-3, IOBROKER-SONOFF-H)
* (Apollon77) Adjust Uptime to mixed because it seems that it can be number or string

### 2.4.5 (2021-07-21)
* (Apollon77) Fix some crash cases reported by Sentry

### 2.4.4 (2021-07-19)
* (bluefox) Added UvaIntensity and UvbIntensity

### 2.4.3 (2021-07-18)
* (bluefox) Better type detection for non-described states

### 2.4.2 (2021-07-17)
* (bluefox) Optimize for js-controller 3.3

### 2.4.1 (2021-07-17)
* (Apollon77/bluefox) Optimize for js-controller 3.3
* (Apollon77) Add Sentry for error reporting with js-controller 3.x+

### 2.4.0 (2021-02-04)
* (anwa) add several data points
* (anwa) Fix translation for 'ignorePings'
* (anwa) Fixed the wrong unit for humidity
* (anwa) Config option to create a complete object tree instead of a flat structure
* (anwa) Change Action type to string
* (Apollon77) js-controller 2.0 is required at least

### 2.3.3 (2019-11-27)
* (bluefox) Error with the empty packet was caught

### 2.3.2 (2019-10-23)
* (bluefox) Fixed the password input in the configuration
* (bluefox) Allowed setting the IP interface for server
* (bluefox) Fixed tests for js-controller 2.0
* (bluefox) Fixed the monitoring of the client connection
* (bluefox) Changed "indicator.connected" to "indicator.reachable" for clients
* (bluefox) Supported `{POWERn: "true"}`
* (bluefox) Correct processing of `{temp: nan}`

### 2.2.3 (2019-01-10)
* (simatec) Support for compact mode

### 2.2.2 (2018-06-22)
* (bluefox) Configuration was fixed

### 2.2.1 (2018-06-20)
* (bluefox) '-' in names was allowed again

### 2.2.0 (2018-05-22)
* (gemu2015) auto generate objects, support for arrays (channel), led-controllers improved

### 2.1.3 (2018-05-08)
* (bluefox) Added HC-SR04 Ultrasonic Sensor

### 2.1.2 (2018-04-23)
* (bluefox) Added support of UvLight, Longitude and Latitude

### 2.1.1 (2018-04-13)
* (bluefox) Support of the particle concentration sensor

### 2.1.0 (2018-03-30)
* (gemu2015) Support of the devices control (many thanks :)
* (gemu2015) Support of many new values
* (modmax) Update alive status of the clients
* (modmax) Added POWER5-8 and Switch3-4

### 2.0.2 (2018-03-19)
* (modmax) Fixing reconnection of clients
* (bluefox) Add SeaPressure

### 2.0.1 (2018-03-17)
* (bluefox) Replace stream handler
* (bluefox) Add timeout for clients
* (bluefox) Add Light/Noise/AirQuality
* (bluefox) Do not send pingresp for invalid clients

### 1.0.3 (2018-03-03)
* (bluefox) Add Analog0/1/2/3 sensor

### 1.0.2 (2018-02-17)
* (Apollon77) Add Illuminance sensor

### 1.0.1 (2018-02-05)
* (bluefox) Ready for admin3
* (bluefox) Added CO2 sensor

### 1.0.0 (2017-11-27)
* (AlZiBa) typo @ alive
* (AlZiBa) add Today's power consumption for Sonoff POW
* (AlZiBa) unit of power consumption is kWh

### 0.3.3 (2017-11-03)
* (bluefox) Add counters

### 0.3.2 (2017-10-22)
* (Tan-DE) Small change for Switch1. Switch2 and additional IPaddress added.

### 0.3.1 (2017-10-12)
* (bluefox) Fix tests and LWT

### 0.3.0 (2017-10-06)
* (bluefox) Add INFO and ESP

### 0.2.0 (2017-10-05)
* (bluefox) Add ENERGY and DS18x20

### 0.1.0 (2017-10-01)
* (bluefox) initial commit

## License

The MIT License (MIT)

Copyright (c) 2017-2023, bluefox <dogafox@gmail.com>

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