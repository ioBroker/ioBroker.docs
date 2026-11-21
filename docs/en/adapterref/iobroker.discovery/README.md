---
chapters: {"pages":{"en/adapterref/iobroker.discovery/README.md":{"title":{"en":"ioBroker Discover Adapter"},"content":"en/adapterref/iobroker.discovery/README.md"},"en/adapterref/iobroker.discovery/DEVELOPMENT.md":{"title":{"en":"Extending discovery"},"content":"en/adapterref/iobroker.discovery/DEVELOPMENT.md"}}}
---
![Logo](admin/discovery.png)
# ioBroker Discover Adapter

![Number of Installations](http://iobroker.live/badges/discovery-installed.svg)
![Number of Installations](http://iobroker.live/badges/discovery-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.discovery.svg)](https://www.npmjs.com/package/iobroker.discovery)

![Test and Release](https://github.com/ioBroker/iobroker.discovery/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/discovery/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.discovery.svg)](https://www.npmjs.com/package/iobroker.discovery)
**Detect devices with all known methods.**

This is a special adapter that tries to find all possible devices that can be reachable from the iobroker host.
Just now it can detect via ping, UPnP (serial planned).

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** 
For more details and for information on how to disable the error reporting, see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## Actually supported

### Automatically Discovered

- Agent DVR
- Air-Q
- Autodarts
- Awtrix 3 / Awtrix Light
- Bambu Lab 3D printers
- Beckhoff PLC
- Blackmagic ATEM switchers
- BleBox
- Blustream presentation switchers, HDBaseT/HDMI matrices and video-wall processors (blustream-mfp)
- Bosch Smart Home
- Bose Soundtouch
- Broadlink
- BSBLan
- CAN bus (SocketCAN interface)
- Chromecast
- Creality 3D printers
- CUL / culfw (Serial)
- Daikin climate control
- deConz
- Denon /Marantz
- Deye inverter data collector
- DoorBird
- DS18B20 1-Wire sensors
- Dune HD
- e3dc-rscp
- ebus
- ekey
- Elero USB Transmitter (Serial 38400)
- Elgato Key Light
- Emby
- energymanager (E.ON/Solarwatt)
- enet (Jung)
- Enigma2 / OpenWebif
- EnOcean gateway (Serial 57600)
- Epson Stylus PX830
- ESPHome
- evcc
- Fakeroku (harmony)
- Feller zeptrion
- FHEM
- FireTV
- Frigate
- Fritzdect
- Fronius
- Frontier_silicon
- Fully Kiosk Browser
- G-Homa plugs
- GoodWe inverters
- Govee (LAN API)
- Harmony
- Heos
- Home Assistant
- Homematic CCU (hm-rpc, hm-rega)
- openccu-lite (hm-rpc in openccu-lite mode, one instance per interface; pair it in its settings)
- Homepilot
- HomeWizard Energy
- Hoymiles HMS inverters (hoymiles)
- HP-lio
- Huawei SUN2000 (sun2000, sun2000-modbus)
- Hyperion.NG
- iiyama ProLite displays
- InfluxDB
- IOmeter
- Janitza GridVis
- Keba KeContact P30
- KLF-200
- KNX (disabled actually)
- Kodi
- LaMetric
- LGTV
- Lightify
- Loxone
- Lupusec
- Luxtronik heat pump controller
- Matter
- MAX! Cube
- MAX! CUL (Serial)
- McLighting
- MegaD
- Mi Home Smarthome
- Miele
- Miele Cloud Service
- Miele@home appliances, local (miele-local)
- Mikrotik
- MiLight bridge (v6)
- Möhlenhoff Alpha 2 floor heating base station (alpha2)
- Mpd
- Musiccast
- myDlink
- Mysensors USB/Serial (9600, 38400, 57600, 115200)
- myvbus
- nanoleaf Light Panels / Canvas
- Net Tools
- NSPanel Lovelace UI
- Nuki extended
- Nuki2
- Nut
- Onkyo
- ONVIF cameras
- OpenHAB
- OpenKNX
- Philips HUE
- Pi-hole
- Ping
- PlayStation 4 / 5
- Plex
- Proxmox
- Pylontech / Pytes batteries (Serial 115200)
- Reolink cameras
- Resol / VBus
- RFLink (Serial 57600baud)
- SamsungTV
- Schwörer VentCube
- Shelly
- Siegenia
- Sigenergy
- SIKU / Oxxify Smart ventilation (RV V2 UDP protocol, factory PIN only)
- Sky Q / Sky+HD set-top boxes (sky-remote)
- SMA SEMP gateway (Sunny Home Manager)
- Sma-em
- Smappee
- Smart meter reading heads (SML)
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
- Wireless M-Bus (Amber stick)
- WLED
- Yamaha
- Yeelight
- Zigbee coordinators (Serial)
- Zigbee2MQTT

### Offered as additional adapters

- Cloud
- eCharts (offered when a History adapter is present)
- History (if no SQL or InfluxDB found)
- Info (iQontrol)
- IoT
- Jarvis
- JavaScript
- SQL (SQLite)
- Vis 2
- Web

## If the adapter cannot find IPs ...

The adapter pings the network of the IP of the current host (x.y.z.1..255). Additionally, UPnP and mDNS are used to detect IPs.  
If not all IPs are found then please check that the iobroker user can execute `/bin/ping`. 
You can execute `sudo setcap cap_net_raw+p /bin/ping` to add missing capabilities/permissions.

## Todo

- artnet? (Bluefox)
- B-Control-Em? (Bluefox)
- cul / maxcul (Bluefox)
- Foobar200 (Instalator)
- fritzbox (ruhr70)
- km200 (frankjoke)
- megaesp (ausHaus)
- modbus (Bluefox)
- mqtt/mqtt-client (Bluefox)
- owfs (Bluefox)
- rpi2 (if ioBroker runs on Raspberry)
- rwe-smarthome (PArns)
- s7 (Bluefox)
- smartmeter (Apollon77)
- unifi (jens-maus)
- wolf (smiling-jack)
- xs1 (frankjoke)

## Instance settings

The instance has a settings dialog with two tabs. **Settings** carries a *Start a scan now* button, the live state of
a running scan (progress, devices found, adapters proposed) and everything below; **Devices** lists what the last scan
found.

The dialog is new. An installation that was set up before it existed keeps `adminUI.config: "none"` in its objects,
because js-controller does not carry that nested field over on an update - the adapter repairs it itself at start-up
and logs it. If the settings button is still missing afterwards, reload the admin page.

## Scheduled scan

By default, the adapter only searches when the discovery dialog in admin asks it to. In the
instance settings it can be told to search on its own instead: switch on **Run a scan on a
timer**, set the interval and pick the methods it should use. Nothing picked means every
method. Five minutes is the shortest interval accepted, and the first scheduled scan starts
two minutes after the adapter does, so a booting host is left alone.

A scan started from the discovery dialog always wins - if one is running when the timer fires,
that turn is skipped and the next one comes at the regular interval.

## Devices in the object tree

Every finished scan writes what it found below `discovery.0.devices`, one channel per device:

| State        | Meaning                                                       |
|--------------|---------------------------------------------------------------|
| `address`    | IP address or serial port                                     |
| `name`       | Host name, mDNS name or whatever the device announced         |
| `type`       | How it was found: `ip`, `upnp`, `mdns`, `serial`, ...         |
| `source`     | The method that reported it                                   |
| `suggested`  | The adapters that recognised this device                      |
| `lastSeen`   | Time of the scan that found it                                |

`discovery.0.lastScan` holds the time of the last finished scan. The tree shows that scan and
not a history: a device that does not turn up again is removed, so nothing stale is left
behind. The full result, including the proposed instance configurations, stays where it was -
in the `system.discovery` object.

## Development

Your device is not found? How to add the detection for an adapter is described in [DEVELOPMENT.md](/#/docs/adapterref/iobroker.discovery/DEVELOPMENT.md).

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