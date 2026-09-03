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
- BleBox
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
- Homepilot
- HomeWizard Energy
- Hoymiles HMS inverters (hoymiles)
- HP-lio
- Huawei SUN2000 (sun2000, sun2000-modbus)
- Hue extended
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
- Landroid
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
- Mikrotik
- MiLight bridge (v6)
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
- Z-Wave USB (Tested with Aeon Labs)
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
