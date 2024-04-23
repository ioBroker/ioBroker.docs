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
For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## Actually supported

### Automatically Discovered

- Air-Q
- Beckhoff PLC
- Bosch Smart Home
- Bose Soundtouch
- Broadlink
- BSBLan
- Chromecast
- Daikin climate control
- deConz
- Denon /Marantz
- DoorBird
- e3dc-rscp
- ebus
- ekey
- energymanager (E.ON/Solarwatt)
- enet (Jung)
- Epson Stylus PX830
- Fakeroku (harmony)
- FHEM
- FireTV
- Fritzdect
- Fronius
- Frontier_silicon
- G-Homa plugs
- Harmony
- Heos
- Home Assistant
- Homematic CCU (hm-rpc, hm-rega)
- Homepilot
- HP-lio
- Philips HUE
- Plex
- InfluxDB
- KLF-200
- KNX (disabled actually)
- Keba KeContact P30
- Kodi
- LaMetric
- Landroid
- LGTV
- Lightify
- Loxone
- Lupusec
- MAX! Cube
- McLighting
- MegaD
- Miele
- Miele Cloud Service
- Mi Home Smarthome
- Mikrotik
- MiLight bridge (v6)
- Mpd
- Musiccast
- myDlink
- Mysensors USB/Serial (9600, 38400, 57600, 115200)
- myvbus
- nanoleaf Light Panels / Canvas
- Net Tools
- Nuki2
- Nut
- Onkyo
- OpenHAB
- OpenKNX
- Ping
- Plex
- Proxmox
- RFLink (Serial 57600baud)
- SamsungTV
- Sma-em
- Smappee
- Solarlog
- Sonnen
- Sonos
- Stiebel-Eltron/Tecalor ISG (plus)
- SQL (MySQL, MSSQL, PostgreSQL)
- Squeezebox
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
- Z-wave USB (Tested with Aeon Labs)

### Offered as additional adapters

- Cloud
- History (if no SQL or InfluxDB found) 
- IoT
- iControl
- eCharts (offered when a History-Adapter is present)
- JavaScript
- Info
- Vis
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

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
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
