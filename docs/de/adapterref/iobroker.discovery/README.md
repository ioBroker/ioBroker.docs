---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.discovery/README.md
title: ioBroker Discover Adapter
hash: D/72x86GmJCeDJxyqlcj3Bp2mAh8a6fxHgt7E6LOgpM=
---
![Logo](../../../en/adapterref/iobroker.discovery/admin/discovery.png)

![Anzahl der Installationen](http://iobroker.live/badges/discovery-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.discovery.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.discovery.svg)

# IoBroker Discover Adapter
![Test und Freigabe](https://github.com/ioBroker/iobroker.discovery/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/discovery/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget) **Geräte mit allen bekannten Methoden erkennen.**

Dies ist ein spezieller Adapter, der versucht, alle vom iobroker-Host aus erreichbaren Geräte zu finden.
Aktuell unterstützt er die Erkennung per Ping und UPnP (seriell ist geplant).

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in Abschnitt [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Tatsächlich unterstützt
### Automatisch erkannt
- Air-Q
Beckhoff PLC
Bosch Smart Home
- Bose Soundtouch
- Broadlink
- BSBLan
- Chromecast
- Daikin Klimaanlage
- deConz
- Denon /Marantz
- DoorBird
- e3dc-rscp
- ebus
- ekey
- Energiemanager (E.ON/Solarwatt)
- enet (Jung)
- Epson Stylus PX830
- Fakeroku (Harmonie)
- FHEM
- FireTV
- Fritzdect
- Fronius
- Frontier_silicon
- G-Homa-Stecker
- Harmonie
- Heos
- Home Assistant
- Homematic CCU (hm-rpc, hm-rega)
- Hoymiles HMS Wechselrichter (hoymiles)
- Homepilot
- HP-lio
- Philips Hue
- Plex
- InfluxDB
- KLF-200
- KNX (derzeit deaktiviert)
- Keba KeContact P30
- Kodi
- LaMetric
- Landroid
- LGTV
- Lightify
- Loxone
- Lupusec
- MAX! Würfel
- McLighting
- MegaD
- Miele
- Miele Cloud-Service
- Mi Home Smarthome
- Mikrotik
- MiLight-Brücke (v6)
- Mpd
- Musiccast
- myDlink
- Mysensors USB/Seriell (9600, 38400, 57600, 115200)
- myvbus
- nanoleaf Lichtpaneele / Leinwand
- Net Tools
- Nuki2
- Nuss
- Onkyo
- OpenHAB
- OpenKNX
- Ping
- Plex
- Proxmox
- RFLink (Seriell 57600 Baud)
- SamsungTV
- Sma-em
- Smappee
- Solarlog
- Sonnen
- Sonos
- Stiebel-Eltron/Tecalor ISG (plus)
- SQL (MySQL, MSSQL, PostgreSQL)
- SqueezeboxRPC
- Synology
- TR-064
- Trådfri
- UPnP
- ValloxMV
- Wifilight
- WLED
- Yamaha
- Yeelight
- Z-Wave USB (Getestet mit Aeon Labs)

### Als zusätzliche Adapter angeboten
- Wolke
- Verlauf (falls keine SQL- oder InfluxDB-Datenbank gefunden wurde)
- IoT
- iControl
- eCharts (wird angeboten, wenn ein History-Adapter vorhanden ist)
- JavaScript
- Info
- Vis
- Web

## Wenn der Adapter keine IPs findet ...
Der Adapter pingt das Netzwerk der IP-Adresse des aktuellen Hosts (x.y.z.1..255) an. Zusätzlich werden UPnP und mDNS zur IP-Adresserkennung verwendet.
Falls nicht alle IP-Adressen gefunden werden, überprüfen Sie bitte, ob der Benutzer „iobroker“ die Berechtigung `/bin/ping` ausführen kann.
Sie können `sudo setcap cap_net_raw+p /bin/ping` ausführen, um fehlende Berechtigungen hinzuzufügen.

## Todo
- artnet? (Bluefox)
- B-Control-Em? (Bluefox)
- cul / maxcul (Bluefox)
- Foobar200 (Installateur)
- Fritzbox (ruhr70)
- km200 (frankjoke)
- megaesp (ausHaus)
- Modbus (Bluefox)
- mqtt/mqtt-client (Bluefox)
- owfs (Bluefox)
- rpi2 (falls ioBroker auf dem Raspberry Pi läuft)
- rwe-smarthome (PArns)
- s7 (Bluefox)
- Smartmeter (Apollon77)
- unifi (jens-maus)
- Wolf (lächelnder Jack)
- xs1 (frankjoke)

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **IN BEARBEITUNG** -->

## Changelog
### **WORK IN PROGRESS**
* (iobroker-bot) Adapter requires node.js >= 20 now.
* (UncleSamSwiss) Remove obsolete squeezebox adapter
* (GermanBluefox) Packages were updated

### 5.0.0 (2024-07-21)
* (bluefox) Packages updated
* (bluefox) Minimum node.js version is 18.x
* (bluefox) Updated licenses for knx and jarvis

### 4.5.0 (2024-04-21)
* (pr0crstntr) Added Air-Q

### 4.4.0 (2024-02-23)
* (klein0r) Added WLED
* (klein0r) Added LaMetric
* (Jey-Cee) Removed net-tools from proposals

### 4.3.0 (2024-02-21)
* (bluefox) Replaced vis with vis-2

### 4.2.0 (2023-10-09)
* (pdbjjens) Changed detection of myvbus and resol

## License

The MIT License (MIT)

Copyright (c) 2017-2026, Denis Haev ak Bluefox <dogafox@gmail.com>

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