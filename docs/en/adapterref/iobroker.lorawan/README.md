![Logo](admin/lorawan.png)
# ioBroker.lorawan

[![NPM version](https://img.shields.io/npm/v/iobroker.lorawan.svg)](https://www.npmjs.com/package/iobroker.lorawan)
[![Downloads](https://img.shields.io/npm/dm/iobroker.lorawan.svg)](https://www.npmjs.com/package/iobroker.lorawan)
![Number of Installations](https://iobroker.live/badges/lorawan-installed.svg)
![Number of Installations](https://iobroker.live/badges/lorawan-stable.svg)
![Test and Release](https://github.com/BenAhrdt/ioBroker.lorawan/workflows/Test%20and%20Release/badge.svg)
[![Donate](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)](https://paypal.me/besc83)

[![NPM](https://nodei.co/npm/iobroker.lorawan.png?downloads=true)](https://nodei.co/npm/iobroker.lorawan/)

## lorawan adapter for ioBroker
The adapter communicates bidirectionally with LoraWan devices via LoRaWAN Network Server via MQTT protocol.
“The Thinks Network” and “Chirpstack” are supported now, more could follow later. 
Adapter was created in collaboration with Joerg Froehner LoraWan@hafenmeister.com

The documentation Wiki is here: https://github.com/BenAhrdt/ioBroker.lorawan/wiki
<br/>
For now there is documentation in English here: https://wiki.hafenmeister.de

### Home Assistant sensor discovery

For numeric sensor entities, the bridge assigns Home Assistant `device_class` and `state_class` attributes according to the adapter's counter-first convention. Current measurements use `measurement`. Wind direction states with the ioBroker role `value.direction.wind` use the device class `wind_direction` and state class `measurement_angle`; an existing unit is retained, while `°` is added if no unit is defined. Energy values in `Wh`, `kWh`, or `MWh`, as well as values identified by an ioBroker energy or consumption role, are treated as consumption counters and use `total_increasing` for Home Assistant energy statistics. If a quantity cannot be distinguished reliably from a consumption reading, the bridge prefers counter semantics: `m³` and `ft³` are published as `gas` with `total_increasing`, and `L` as `water` with `total_increasing`. `mL` and `gal` remain generic `volume` values. Ambiguous concentration units such as `ppm`, `ppb`, or `µg/m³` do not imply a specific substance. `L/min`, `L/s`, and `m³/h` use `volume_flow_rate`.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.22.40 (2026-10-25)
- (BenAhrdt) Do not add a self-referencing `via_device` to the internal bridge device when its identifier equals the adapter namespace.

### 1.22.39 (2026-10-24)
- (BenAhrdt) Add the `button.mode.getInfo` role for `GetInfos` downlink states and display them as buttons in device manager cards.
- (BenAhrdt) declareUsedResources added in io-package.json
- (BenAhrdt) Update the development test framework dependency `@iobroker/testing` to version `6.3.1`.

### 1.22.38 (2026-10-13)
- (BenAhrdt) Ignore adapter-internal and generated virtual bridge IDs when reporting missing foreign objects.

### 1.22.37 (2026-10-13)
- (BenAhrdt) Keep bridge configurations when referenced foreign objects are deleted and report missing IDs with device and attribute context.

### 1.22.36 (2026-10-12)
- (BenAhrdt) Add the Home Assistant `json_attributes_topic` discovery attribute for states with the ioBroker role `json`.

## DISCLAIMER
The rights of the trademarks and company names, remain with their owners and have no relation to this adapter. The fairuse policy must continue to be adhered to by the operator of the adapter. If this repository is forked, it must be cited as the source.

LoRa® is a registered trademark or service mark of Semtech Corporation or its affilantes.

LoRaWAN® is a licensed mark.

I have no affiliation with the mentioned brands or their subsidiaries, logos, or trademarks, nor am I endorsed by them.

## License
MIT License

Copyright (c) 2025-2026 BenAhrdt <bsahrdt@gmail.com>  
Copyright (c) 2025-2026 Joerg Froehner <LoraWan@hafenmeister.com>

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