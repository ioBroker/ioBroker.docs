---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.discovery/README.md
title: ioBroker Discover Adapter
hash: 6ok/8gHo/LmqFgaUETlvmL5NNRcfJ2GM28xRwxy/2c4=
---
![Logo](../../../en/adapterref/iobroker.discovery/admin/discovery.png)

![Anzahl der Installationen](http://iobroker.live/badges/discovery-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.discovery.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.discovery.svg)

# ioBroker Discover Adapter

![Test und Freigabe](https://github.com/ioBroker/iobroker.discovery/workflows/Test%20and%20Release/badge.svg)
[![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/discovery/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
**Geräte mit allen bekannten Methoden aufspüren.**

Dies ist ein spezieller Adapter, der versucht, alle vom iobroker-Host aus erreichbaren Geräte zu finden. Aktuell unterstützt er die Erkennung per Ping und UPnP (seriell ist geplant).

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.**
Weitere Einzelheiten und Informationen zur Deaktivierung der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

## Tatsächlich unterstützt

### Automatisch erkannt

- Agent DVR
- Air-Q
- Autodarts
- Awtrix 3 / Awtrix Light
- Bambu Lab 3D-Drucker
- Beckhoff PLC
- BleBox
- Bosch Smart Home
- Bose Soundtouch
- Broadlink
- BSBLan
- CAN-Bus (SocketCAN-Schnittstelle)
- Chromecast
- Creality 3D-Drucker
- CUL / culfw (Seriennummer)
- Daikin Klimaanlage
- deConz
- Denon /Marantz
- Deye Wechselrichter-Datensammler
- DoorBird
- DS18B20 1-Wire-Sensoren
- Dune HD
- e3dc-rscp
- ebus
- ekey
- Elero USB-Transmitter (Serielle 38400)
- Elgato Key Light
- Embryo
- Energiemanager (E.ON/Solarwatt)
- enet (Jung)
- Enigma2 / OpenWebif
- EnOcean-Gateway (Seriennummer 57600)
- Epson Stylus PX830
- ESPHome
- evcc
- Fakeroku (Harmonie)
- Feller Zeptrion
- FHEM
- FireTV
- Fregatte
- Fritzdect
- Fronius
- Frontier\_silicon
- Vollständiger Kiosk-Browser
- G-Homa-Stecker
- GoodWe Wechselrichter
- Govee (LAN-API)
- Harmonie
- Heos
- Home Assistant
- Homematic CCU (hm-rpc, hm-rega)
- Homepilot
- HomeWizard Energie
- Hoymiles HMS Wechselrichter (Hoymiles)
- HP-lio
- Huawei SUN2000 (sun2000, sun2000-modbus)
- Farbton erweitert
- Hyperion.NG
- iiyama ProLite-Displays
- InfluxDB
- Iometer
- Janitza GridVis
- Keba KeContact P30
- KLF-200
- KNX (derzeit deaktiviert)
- Kodi
- LaMetric
- Landroid
- LGTV
- Lightify
- Loxone
- Lupusec
- Luxtronik Wärmepumpensteuerung
- Gegenstand
- MAX! Würfel
- MAX! CUL (Seriennummer)
- McLighting
- MegaD
- Mi Home Smarthome
- Miele
- Miele Cloud-Service
- Mikrotik
- MiLight-Brücke (v6)
- MPD
- Musiccast
- myDlink
- Mysensors USB/Seriell (9600, 38400, 57600, 115200)
- myvbus
- nanoleaf Lichtpaneele / Leinwand
- Netzwerkwerkzeuge
- NSPanel Lovelace-Benutzeroberfläche
- Nuki erweitert
- Nuki2
- Nuss
- Onkyo
- ONVIF-Kameras
- OpenHAB
- OpenKNX
- Philips Hue
- Pi-hole
- Klingeln
- PlayStation 4 / 5
- Plex
- Proxmox
- Pylontech / Pytes Batterien (Seriennummer 115200)
- Reolink-Kameras
- Resol / VBus
- RFLink (Seriell 57600 Baud)
- Samsung TV
- Schwörer VentCube
- Shelly
- Siegenia
- Sigenergy
- SMA SEMP-Gateway (Sunny Home Manager)
- Sma-em
- Smappee
- Intelligente Zählerleseköpfe (SML)
- Solakon ONE
- Solarlog
- Sonnen
- sonnenCharger
- Sonoff / Tasmota
- Sonos
- Sony Bravia
- SQL (MySQL, MSSQL, PostgreSQL)
- SqueezeboxRPC
- Stiebel-Eltron/Tecalor ISG (plus)
- Synology
- TP-Link Tapo
- TR-064
- Trådfri
- UPnP
- ValloxMV
- Victron GX
- VictronCerbo
- Viessmann (via vcontrold)
- Volumio
- Wifilight
- Drahtloser M-Bus (Amber Stick)
- WLED
- Yamaha
- Yeelight
- Z-Wave USB (Getestet mit Aeon Labs)
- Zigbee-Koordinatoren (Serie)
- Zigbee2MQTT

### Werden als zusätzliche Adapter angeboten

- Wolke
- eCharts (werden angeboten, wenn ein Verlaufsadapter vorhanden ist)
- Verlauf (falls keine SQL- oder InfluxDB-Datenbank gefunden wurde)
- Info (iQontrol)
- IoT
- Jarvis
- JavaScript
- SQL (SQLite)
- Vis 2
- Web

## Wenn der Adapter keine IPs findet ...

Der Adapter pingt das Netzwerk der IP-Adresse des aktuellen Hosts (xyz1..255) an. Zusätzlich werden UPnP und mDNS zur IP-Adresserkennung verwendet.\
Falls nicht alle IPs gefunden werden, überprüfen Sie bitte, ob der iobroker-Benutzer ausführen kann. `/bin/ping`Sie können ausführen `sudo setcap cap_net_raw+p /bin/ping` um fehlende Funktionen/Berechtigungen hinzuzufügen.

## Todo

- artnet? (Bluefox)
- B-Control-Em? (Bluefox)
- cul / maxcul (Bluefox)
- Foobar200 (Installateur)
- Fritzbox (ruhr70)
- km200 (frankjoke)
- megaesp (ausHaus)
- modbus (Bluefox)
- mqtt/mqtt-client (Bluefox)
- owfs (Bluefox)
- rpi2 (falls ioBroker auf dem Raspberry Pi läuft)
- rwe-smarthome (PArns)
- s7 (Bluefox)
- Smartmeter (Apollon77)
- unifi (jens-maus)
- Wolf (lächelnder Jack)
- xs1 (frankjoke)

## Instanzeinstellungen

Die Instanz verfügt über einen Einstellungsdialog mit zwei Registerkarten. **Einstellungen** trägt ein _Jetzt einen Scan starten_ Schaltfläche, der aktuelle Status eines laufenden Scans (Fortschritt, gefundene Geräte, vorgeschlagene Adapter) und alles darunter; **Geräte** listet auf, was der letzte Scan ergeben hat.

Der Dialog ist neu. Eine Installation, die eingerichtet wurde, bevor er existierte, behält ihn bei. `adminUI.config: "none"` Da js-controller dieses verschachtelte Feld bei einer Aktualisierung nicht übernimmt, werden die Objekte des Adapters beim Start selbst repariert und protokolliert. Sollte die Schaltfläche „Einstellungen“ danach immer noch fehlen, laden Sie die Admin-Seite neu.

## Geplanter Scan

Standardmäßig sucht der Adapter nur, wenn er im Admin-Dialog dazu aufgefordert wird. In den Instanzeinstellungen kann er jedoch so konfiguriert werden, dass er selbstständig sucht: Aktivieren Sie die entsprechende Option. **Führe einen Scan zeitgesteuert durch**Legen Sie das Intervall fest und wählen Sie die zu verwendenden Methoden aus. Wenn Sie keine Methode auswählen, werden alle Methoden verwendet. Fünf Minuten ist das kürzeste zulässige Intervall. Der erste geplante Scan startet zwei Minuten nach dem Start des Adapters, sodass ein gerade hochfahrender Host nicht beeinträchtigt wird.

Ein Scan, der über den Entdeckungsdialog gestartet wird, gewinnt immer – wenn gerade ein Scan läuft, wenn der Timer auslöst, wird dieser Durchgang übersprungen und der nächste erfolgt im regulären Intervall.

## Geräte im Objektbaum

Nach jedem abgeschlossenen Scan wird unten angezeigt, was gefunden wurde. `discovery.0.devices`, ein Kanal pro Gerät:

| Zustand     | Bedeutung                                                         |
| ----------- | ----------------------------------------------------------------- |
| `address`   | IP-Adresse oder serielle Schnittstelle                            |
| `name`      | Hostname, mDNS-Name oder was auch immer das Gerät angekündigt hat |
| `type`      | Wie es gefunden wurde: `ip`, `upnp`, `mdns`, `serial`, ...        |
| `source`    | Die Methode, die dies gemeldet hat                                |
| `suggested` | Die Adapter, die dieses Gerät erkannten                           |
| `lastSeen`  | Zeitpunkt des Scans, der es gefunden hat                          |

`discovery.0.lastScan` Speichert den Zeitpunkt des letzten abgeschlossenen Scans. Die Baumstruktur zeigt diesen Scan und nicht den Verlauf: Geräte, die nicht wieder auftauchen, werden entfernt, sodass keine veralteten Daten zurückbleiben. Das vollständige Ergebnis, einschließlich der vorgeschlagenen Instanzkonfigurationen, bleibt an seinem ursprünglichen Ort. `system.discovery` Objekt.

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### 5.1.1 (2026-08-31)
* (bluefox) The ping scan says so when this host may not send ICMP and sweeps the range over TCP instead (#247)
* (bluefox) The scan can now run on a timer, with a selectable set of methods - mdns, ping, udp and upnp by default
* (bluefox) Every finished scan writes the devices it found below `discovery.0.devices`
* (bluefox) The instance has settings again: two tabs with a start button, the live scan state and the device list
* (bluefox) The device tab is a real table now: sortable, filterable, and it fills itself from `system.discovery`
* (bluefox) The device table shows the icon of every proposed adapter that is installed on this host
* (bluefox) A scheduled scan raises a notification when it proposes something that was not proposed before
* (bluefox) The texts of the settings dialog moved into `admin/i18n`, complete in all eleven languages
* (bluefox) `adminUI.config` is repaired at start-up, js-controller does not update that field on an upgrade
* (bluefox) The adapter was refactored to TypeScript: sources moved to `src/`, the build output to `build/`
* (bluefox) Minimum node.js version is 22.19.0 now

### 5.0.1 (2026-07-03)
* (ioBroker-Bot) Adapter requires js-controller >= 6.0.11 now.
* (Eistee82) Fix Hoymiles HMS discovery: correct a require path and align native config with hoymiles 0.3.4 device-array schema
* (iobroker-bot) Adapter requires node.js >= 20 now.
* (UncleSamSwiss) Remove obsolete squeezebox adapter
* (GermanBluefox) Packages were updated
* (GermanBluefox) Added victron-cerbo

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

[Older changelogs can be found there](CHANGELOG_OLD.md)

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