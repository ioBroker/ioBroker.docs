---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.discovery/README.md
title: ioBroker Discover Adapter
hash: 8ZC7Dm35Xlje6vXUX0PcjjVgWk0L6sXeaxRpbl3uHyM=
---
![Logo](../../../en/adapterref/iobroker.discovery/admin/discovery.png)

![Anzahl der Installationen](http://iobroker.live/badges/discovery-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.discovery.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.discovery.svg)

# IoBroker Discover Adapter
![Testen und Freigeben](https://github.com/ioBroker/iobroker.discovery/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/discovery/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget) **Geräte mit allen bekannten Methoden erkennen.**

Dies ist ein spezieller Adapter, der versucht, alle möglichen Geräte zu finden, die vom iobroker-Host aus erreichbar sind.
Im Moment kann er die Erkennung über Ping und UPnP durchführen (seriell geplant).

**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Tatsächlich unterstützt
### Automatisch erkannt
- Luft-Q
- Beckhoff SPS
- Bosch Smart Home
Bose Soundtouch
- Breitlink
- BSBLan
- Chromecast
- Daikin-Klimaautomatik
- deConz
Denon /Marantz
- DoorBird
- e3dc-rscp
- E-Bus
- eSchlüssel
- Energiemanager (E.ON/Solarwatt)
- enet (Jung)
Epson Stylus PX830
- Fakeroku (Harmonie)
- FHEM
- FireTV
- Fritzdect
- Fronius
- Frontier_silicon
- G-Homa-Stecker
- Harmonie
- Heos
Heimassistent
- Homematic Zentraleinheit (hm-rpc, hm-rega)
- Homepilot
- HP lio
Philips HUE
Plex
- InfluxDB
- KLF-200
- KNX (aktuell deaktiviert)
- Keba KeContact P30
- Kodi
- LaMetric
- Landroid
- LGTV
- Erleuchten
- Loxone
- Lupusec
- MAX! Würfel
- McBeleuchtung
- MegaD
- Miele
- Miele Cloud Service
- Mi Home Smarthome
- Mikrotik
- MiLight-Brücke (v6)
- MPD
- Musiksendung
- meinDlink
- Mysensors USB/Seriell (9600, 38400, 57600, 115200)
- meinVbus
- Nanoleaf-Lichtpaneele / -Leinwand
- Netzwerkzeuge
- Nuki2
- Nuss
- Onkyo
- OpenHAB
- OpenKNX
- Klingeln
Plex
- Proxmox
- RFLink (Seriell 57600 Baud)
SamsungTV
- Schmach sie
- Smappee
- Solarlog
- Sonnen
Sonos
- Stiebel-Eltron/Tecalor ISG (plus)
- SQL (MySQL, MSSQL, PostgreSQL)
- Quetschbox
- SqueezeboxRPC
Synologie
- TR-064
- Region Trådfri
UPnP
- ValloxMV
WLAN-Licht
- WLED
- Yamaha
- Yeelight
- Z-Wave USB (getestet mit Aeon Labs)

### Als Zusatzadapter angeboten
- Wolke
- Verlauf (wenn kein SQL oder InfluxDB gefunden wurde)
- Internet der Dinge
- ich kontrolliere
- eCharts (angeboten, wenn ein History-Adapter vorhanden ist)
- JavaScript
- Die Info
- Region Vis
- Netz

## Wenn der Adapter keine IPs finden kann ...
Der Adapter pingt das Netzwerk der IP des aktuellen Hosts (x.y.z.1..255). Zusätzlich werden UPnP und mDNS zur Erkennung von IPs verwendet.
Wenn nicht alle IPs gefunden werden, überprüfen Sie bitte, ob der iobroker-Benutzer `/bin/ping` ausführen kann.
Sie können `sudo setcap cap_net_raw+p /bin/ping` ausführen, um fehlende Fähigkeiten/Berechtigungen hinzuzufügen.

## Machen
- artnet? (Bluefox)
- B-Kontrolliere sie? (Bluefox)
- cul / maxcul (Bluefox)
- Foobar200 (Installateur)
- Fritzbox (Ruhr70)
- km200 (offener Witz)
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
- xs1 (Frankwitz)

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **IN ARBEIT** -->

## Changelog
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

### 4.1.0 (2023-09-25)
* (pdbjjens) Added detection of myvbus and resol

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