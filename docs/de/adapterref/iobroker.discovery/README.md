---
chapters: {"pages":{"en/adapterref/iobroker.discovery/README.md":{"title":{"en":"ioBroker Discover Adapter"},"content":"en/adapterref/iobroker.discovery/README.md"},"en/adapterref/iobroker.discovery/DEVELOPMENT.md":{"title":{"en":"Extending discovery"},"content":"en/adapterref/iobroker.discovery/DEVELOPMENT.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.discovery/README.md
title: ioBroker Discover Adapter
hash: CSNs/AJbLv5ql9g/W6QdQW4TzEo0C7fgs/Ov6YOAgLw=
---
![Logo](../../../en/adapterref/iobroker.discovery/admin/discovery.png)

![Anzahl der Installationen](https://iobroker.live/badges/discovery-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.discovery.svg)
![Test und Freigabe](https://github.com/ioBroker/iobroker.discovery/workflows/Test%20and%20Release/badge.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/discovery/svg-badge.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.discovery.svg)

# ioBroker Discover Adapter

**Geräte mit allen bekannten Methoden aufspüren.**

Dies ist ein spezieller Adapter, der versucht, alle vom iobroker-Host aus erreichbaren Geräte zu finden. Aktuell unterstützt er die Erkennung per Ping und UPnP (seriell ist geplant).

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) . Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Tatsächlich unterstützt

### Automatisch erkannt

- Agent DVR
- Air-Q
- Autodarts
- Awtrix 3 / Awtrix Light
- Bambu Lab 3D-Drucker
- Beckhoff PLC
- Blackmagic ATEM-Switcher
- BleBox
- Blustream Präsentationsumschalter, HDBaseT/HDMI-Matrizen und Videowandprozessoren (blustream-mfp)
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
- openccu-lite (hm-rpc im openccu-lite-Modus, eine Instanz pro Schnittstelle; in den Einstellungen koppeln)
- Homepilot
- HomeWizard Energie
- Hoymiles HMS Wechselrichter (Hoymiles)
- HP-lio
- Huawei SUN2000 (sun2000, sun2000-modbus)
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
- LGTV
- Lightify
- Loxone
- Lupusec
- Luxtronik Wärmepumpensteuerung
- Matter
- MAX! Würfel
- MAX! CUL (Seriennummer)
- McLighting
- MegaD
- Mi Home Smarthome
- Miele
- Miele Cloud-Service
- Miele\@Haushaltsgeräte, lokal (miele-lokal)
- Mikrotik
- MiLight-Brücke (v6)
- Möhlenhoff Alpha 2 Fußbodenheizungs-Basisstation (alpha2)
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
- SIKU / Oxxify Intelligente Belüftung (RV V2 UDP-Protokoll, nur Werks-PIN)
- Sky Q / Sky+HD Set-Top-Boxen (Sky-Fernbedienung)
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
&#x20;Falls nicht alle IPs gefunden werden, überprüfen Sie bitte, ob der iobroker-Benutzer ausführen kann. `/bin/ping` Sie können ausführen `sudo setcap cap_net_raw+p /bin/ping` um fehlende Funktionen/Berechtigungen hinzuzufügen.

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

Die Instanz verfügt über einen Einstellungsdialog mit zwei Registerkarten. **Die Registerkarte „Einstellungen“** enthält eine Schaltfläche _„Jetzt scannen“_ , den Live-Status eines laufenden Scans (Fortschritt, gefundene Geräte, vorgeschlagene Adapter) und alle darunter stehenden Informationen; die Registerkarte **„Geräte“** listet die vom letzten Scan gefundenen Geräte auf.

Der Dialog ist neu. Eine Installation, die eingerichtet wurde, bevor er existierte, behält ihn bei. `adminUI.config: "none"` Da js-controller dieses verschachtelte Feld bei einer Aktualisierung nicht übernimmt, werden die Objekte des Adapters beim Start selbst repariert und protokolliert. Sollte die Schaltfläche „Einstellungen“ danach immer noch fehlen, laden Sie die Admin-Seite neu.

## Geplanter Scan

Standardmäßig sucht der Adapter nur, wenn er im Admin-Dialog dazu aufgefordert wird. In den Instanzeinstellungen kann er stattdessen selbstständig suchen: Aktivieren Sie **„Scan nach Zeitintervall ausführen“** , legen Sie das Intervall fest und wählen Sie die zu verwendenden Methoden aus. Wenn Sie keine Methode auswählen, werden alle Methoden verwendet. Fünf Minuten ist das kürzeste zulässige Intervall. Der erste geplante Scan startet zwei Minuten nach dem Start des Adapters, sodass ein Host während des Bootvorgangs nicht gescannt wird.

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

## Entwicklung

Ihr Gerät wurde nicht gefunden? Wie Sie die Erkennung für einen Adapter hinzufügen, ist in [DEVELOPMENT.md](/#/docs/adapterref/iobroker.discovery/DEVELOPMENT.md) beschrieben.

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### 5.4.1 (2026-11-19)
* (@GermanBluefox) The build checks that every adapter discovery can propose exists in the latest repository, and a weekly workflow opens an issue when one leaves it (#508). The detections for hue-extended, landroid and zwave are removed: none of these adapters exists any more
* (@GermanBluefox) A scan runs the detection for an adapter only when the adapter is in the active repository. With several active repositories their adapters now add up (before, every detection ran), a change of the active repository applies from the next scan on, and "Propose only adapters that are installed here" also holds while the repository has not been downloaded yet

### 5.4.0 (2026-11-19)
* (hobbyquaker) Detect openccu-lite from its open version answer and propose hm-rpc instances in openccu-lite mode instead of the classic ones - it has no ReGa and does not forward `init`, so neither hm-rega nor an init-based hm-rpc instance is proposed for it, even when its classic RPC ports are switched on. One instance is proposed per interface the system names in its version answer (on older systems: the interfaces its classic ports show, else HmIP-RF and BidCos-RF); the instance is then paired in its settings
* (SmarthomeElektroniker) Detect Miele@home appliances from their `_mieleathome._tcp` mDNS announcement and propose one miele-local instance for the household, with the appliance addresses in its device list
* (AlanSRU) Detect Blustream presentation switchers, matrices and video-wall processors from their `STATUS` header on telnet port 23 and propose the blustream-mfp adapter with the matching device model
* (djlex83) Detect the Möhlenhoff Alpha 2 floor heating base station from the `<TYPE>EZRCTRL…</TYPE>` of its `/data/static.xml` and propose the alpha2 adapter

### 5.3.0 (2026-11-09)
* (AlanSRU) Detect Sky Q and Sky+HD boxes from the greeting on their remote-control port 49160 and propose the sky-remote adapter
* (AlanSRU) Detect Blackmagic ATEM switchers from their `_switcher_ctrl._udp` mDNS announcement and propose the blackmagic-atem adapter
* (@GermanBluefox) The WLED detection no longer logs an error for every device with a single mDNS PTR record, finds a WLED that announces only its own service, and proposes one instance for all WLEDs, which is how the adapter works
* (@GermanBluefox) The ping on Windows no longer reads `process.env`, which does not go with compact mode
* (@GermanBluefox) `npm run test:integration` now runs every test file on Linux and macOS too - the shell had been expanding the pattern to `test/adapters` only

### 5.2.0 (2026-10-08)
* (nograx) Detect Zendure SolarFlow, Hyper and AIO devices with the local zenSDK API via mDNS and propose the zendure-solarflow adapter
* (@GermanBluefox) The Zendure proposal sets `connectionMode: local` - in the default cloud mode the instance stops at the missing cloud key and never looks for devices

### 5.1.2 (2026-10-02)
* (ChrMaass) Detect SIKU / Oxxify Smart fans with a read-only UDP broadcast and propose one siku instance for all fans
* (@GermanBluefox) The SIKU probe no longer demands both identifying parameters - the siku adapter does not either, and a fan that answers only one was being hidden from it
* (@GermanBluefox) The SIKU probe asks from a free port when UDP 4000 is taken, instead of dropping the whole detection

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