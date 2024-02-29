---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.discovery/README.md
title: ioBroker Discover-Adapter
hash: 9q9hk+XosZMUV7Kv3DKTr9Qi0BuHcX5rQtJlRBo/RRg=
---
![Logo](../../../en/adapterref/iobroker.discovery/admin/discovery.png)

![Anzahl der Installationen](http://iobroker.live/badges/discovery-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.discovery.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.discovery.svg)

# IoBroker Discover Adapter
![Test und Freigabe](https://github.com/ioBroker/iobroker.discovery/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/discovery/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget) **Geräte mit allen bekannten Methoden erkennen.**

Hierbei handelt es sich um einen speziellen Adapter, der versucht, alle möglichen Geräte zu finden, die vom iobroker-Host aus erreichbar sind.
Gerade jetzt kann es per Ping, UPnP (seriell geplant) erkennen.

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

## Tatsächlich unterstützt
### Automatisch erkannt
- Beckhoff-SPS
- Bosch Smart Home
- Bose Soundtouch
- Broadlink
- BSBLan
- Chromecast
- Daikin-Klimaautomatik
- deConz
- Denon/Marantz
- Türvogel
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
- Heimassistent
- Homematic CCU (hm-rpc, hm-rega)
- Homepilot
- HP-lio
- Philips HUE
- Plex
- InfluxDB
- KLF-200
- KNX (eigentlich deaktiviert)
- Keba KeContact P30
- Kodi
- LaMetric
- Landroid
- LGTV
- Erhellen
- Loxone
- Lupusec
- MAX! Würfel
- McLighting
- MegaD
- Miele
- Miele Cloud Service
- Mi Home Smarthome
- Mikrotik
- MiLight-Brücke (v6)
- Mpd
- Musikcast
- myDlink
- Mysensors USB/Seriell (9600, 38400, 57600, 115200)
- myvbus
- Nanoleaf-Lichtpaneele / Leinwand
- Netzwerkzeuge
- Nuki2
- Nuss
- Onkyo
- OpenHAB
- OpenKNX
- Ping
- Plex
- Proxmox
- RFLink (seriell 57600 Baud)
- SamsungTV
- Sma-em
- Smappee
- Solarlog
- Sonnen
- Sonos
- Stiebel-Eltron/Tecalor ISG (plus)
- SQL (MySQL, MSSQL, PostgreSQL)
- Quetschbox
- SqueezeboxRPC
- Synologie
- TR-064
- Trådfri
- UPnP
- ValloxMV
- Wifilight
- WLED
- Yamaha
- Yeelight
- Z-Wave-USB (getestet mit Aeon Labs)

### Wird als zusätzlicher Adapter angeboten
- Wolke
- Verlauf (wenn kein SQL oder InfluxDB gefunden wurde)
- IoT
- ich kontrolliere
- eCharts (wird angeboten, wenn ein History-Adapter vorhanden ist)
- JavaScript
- Die Info
- Vis
- Netz

## Wenn der Adapter keine IPs finden kann ...
Der Adapter pingt das Netzwerk der IP des aktuellen Hosts (x.y.z.1..255). Zusätzlich werden UPnP und mDNS zur Erkennung von IPs verwendet.
Wenn nicht alle IPs gefunden werden, prüfen Sie bitte, ob der iobroker-Benutzer `/bin/ping` ausführen kann.
Sie können `sudo setcap cap_net_raw+p /bin/ping` ausführen, um fehlende Fähigkeiten/Berechtigungen hinzuzufügen.

## Machen
- artnet? (Blauer Fuchs)
- B-Kontrolle-Em? (Blauer Fuchs)
- cul / maxcul (Bluefox)
- Foobar200 (Installateur)
- Fritzbox (ruhr70)
- km200 (offener Scherz)
- megaesp (ausHaus)
- Modbus (Bluefox)
- mqtt/mqtt-client (Bluefox)
- owfs (Bluefox)
- rpi2 (wenn ioBroker auf Raspberry läuft)
- rwe-smarthome (PArns)
- s7 (Bluefox)
- Smartmeter (Apollon77)
- unifi (jens-maus)
- Wolf (lächelnder Jack)
- xs1 (Frankjoke)

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **ARBEIT IN ARBEIT** -->

## Changelog
### 4.4.0 (2024-02-23)
* (klein0r) Added WLED
* (klein0r) Added LaMetric
* (Jey-Cee) Removed net-tools from proposals

### 4.3.0 (2024-02-21)
* (bluefox) Replaced vis with vis-2

### 4.2.0 (2023-10-09)
* (pdbjjens) Changed detection of myvbus and resol

### 4.1.0 (2023-09-25)
* (pdbjjens) Added detection of myvbus and resol

### 4.0.0 (2023-09-04)
* (pdbjjens) Added: frontier_silicon, sma-em, and speedwire
* (bluefox) Dropped node14 support, refactoring

## License

The MIT License (MIT)

Copyright (c) 2017-2024, Denis Haev ak Bluefox <dogafox@gmail.com>

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