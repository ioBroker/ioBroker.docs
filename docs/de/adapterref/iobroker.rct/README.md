---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.rct/README.md
title: ioBroker.rct
hash: /FJxK40wsnYUSmjAQZ5tOicr+cJTX2Eux8jbnhDDMqo=
---
![NPM-Version](https://img.shields.io/npm/v/iobroker.rct.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.rct.svg)
![Anzahl der Installationen (aktuell)](https://iobroker.live/badges/rct-installed.svg)
![Anzahl Installationen (stabil)](https://iobroker.live/badges/rct-stable.svg)
![Libraries.io-Abhängigkeitsstatus für GitHub-Repo](https://img.shields.io/librariesio/release/npm/ioBroker.rct)
![NPM](https://nodei.co/npm/iobroker.rct.png?downloads=true)

[![Logo](admin/rct.png)](https://www.rct-power.com/de)

# IoBroker.rct
**Tests:** ![Test und Freigabe](https://github.com/aruttkamp/ioBroker.rct/workflows/Test%20and%20Release/badge.svg)

## Besitzerwechsel
Nachdem Lauff zum Home Assistant gewechselt ist, wird das Projekt von aruttkamp weitergeführt

## RCT-Adapter für ioBroker
Bitte beachten Sie, dass es sich um ein privates Projekt handelt und ich (Andreas Ruttkamp) in keinerlei Zusammenhang mit RCT stehe.

Lesen Sie Werte eines RCT Power Photovoltaik-Stromrichters.

## BEMERKUNGEN
### Produktive Veröffentlichung
Diese Produktivversion hat sich als stabil erwiesen.

Über das Feld „RCT Elements“ kann ausgewählt werden, welche Daten vom Stromrichter gelesen werden sollen.
Wenn hier nichts eingegeben wird, wird die Standardeinstellung verwendet:

"battery.bat_status,battery.soc,battery.soc_target,battery.soc_target_high,battery.soc_target_low,dc_conv.dc_conv_struct[0].p_dc_lp,dc_conv.dc_conv_struct[1].p_dc_lp,fault[0].flt,fault[1] .flt,fault[2].flt,fault[3].flt,g_sync.p_ac_grid_sum_lp,g_sync.p_ac_load_sum_lp,g_sync.p_ac_sum_lp,g_sync.p_acc_lp,g_sync.u_sg_avg[0],g_sync.u_sg_avg[1],io_board.s0_external_power ,power_mng.is_heiphoss,power_mng.state,power_mng.use_grid_power_enable,power_mng.u_acc_mix_lp,prim_sm.island_flag"

Weitere Elemente finden Sie im Code (Datei „rct/rc_core2.js“). Da dies nicht selbstbeschreibend ist, erfolgt die Verwendung auf eigene Gefahr!

Das Objekt „battery.bat_status“ zeigt den Status einer angeschlossenen Batterie an:

* 0 -> Laden/Entladen (Normalbetrieb)
* 8 -> Aufladen (Kalibrierung)
* 1024 -> Entladung (Kalibrierung)
* 2048 -> Balancieren

## Bekannte Probleme
### Falsche Kanäle/Zustände
Eine neue Version ist möglicherweise nicht in der Lage, die richtigen ioBroker-Kanäle/-Zustände zu erstellen. In den meisten Fällen ist dies daran zu erkennen, dass der Knoten „Batterie“ als einzelnes Element und nicht als Ordner angezeigt wird.

Stoppen Sie in diesem Fall den Adapter und löschen Sie den Knoten „rct.0“ manuell.

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 1.2.4 (2024-02-09)
* (Andreas Ruttkamp) adapter not running in 1.2.3 - fixed

### 1.2.3 (2024-02-09)
* (Andreas Ruttkamp) prim_sm.state added
* (Andreas Ruttkamp) states for battery added
* (Andreas Ruttkamp) output of data points power_mng.soc_min and soc_min_island corrected

### 1.2.2 (2023-09-13)
* (Andreas Ruttkamp) data type for power_mng.bat_next_calib_date corrected
* (Andreas Ruttkamp) data type for battery.stack_cycles[x] corrected

### 1.2.1 (2023-09-13)
* (Andreas Ruttkamp) configured rct elements will now be used correctly ( in 1.2.0 only power_mng.bat_next_calib_date was read)

### 1.2.0 (2023-09-11)
* (Andreas Ruttkamp) connection state corrected when adapter is stopped
* (Andreas Ruttkamp) dependancies updated

### 1.1.7 (2023-08-30)
* (Andreas Ruttkamp) connection state corrected

### 1.1.6 (2023-08-23)
* (Andreas Ruttkamp) rct_core.js deleted (now rct_core2 is used)
* (Andreas Ruttkamp) parameters in default setting deleted 
* (Andreas Ruttkamp) min. Node 18

### 1.1.5 (2023-08-18)
* (Andreas Ruttkamp) Fix: crash reading UInt8 corrected
* (Andreas Ruttkamp) some cleaning actions

### 1.1.4 (2023-08-18)
* (Andreas Ruttkamp) Fix: proofments corrected.

### 1.1.3 (2023-08-18)
* (Andreas Ruttkamp) Fix: more data checks implemented

### 1.1.2 (2023-08-17)
* (Andreas Ruttkamp) Fix: adapter crashes

### 1.1.1 (2023-08-17)
* (Andreas Ruttkamp) data for g_sync.p_ac_load[0-2] / dc_conv.dc_conv_struct[0-1].u_sg_lp added
* (Andreas Ruttkamp) more parameters added 
* (Andreas Ruttkamp) date conversions fixed
* (Andreas Ruttkamp) conversions of percentages fixed
* (Andreas Ruttkamp) instance crash if data failure fixed

### 1.0.5 (2023-07-29)
* (Andreas Ruttkamp) some internal work
* (Andreas Ruttkamp) preparation for new admin
* (Andreas Ruttkamp) dependecies update

### 1.0.4 (2023-04-24)
* (Andreas Ruttkamp) Release Script added and update dev-components
* (Andreas Ruttkamp) Preparation of new backend

### 1.0.3 (2023-03-30)
* (Andreas Ruttkamp) Release Script added and update dev-components

### 1.0.1
* (Markus Lauff) fixing review comments - thanks to Apollon77

### 1.0.0
* (Markus Lauff) 0.0.6 version proved stable and fulfilling minimal functional requirements, so releasing it as version 1.0.0 for productive usage

### 0.0.6
* (Markus Lauff) adding further channels/states, major stability improvements

### 0.0.5
* (Markus Lauff) some fixes / minor improvements

### 0.0.1
* (Markus Lauff) initially bare minimum working release

## License
MIT License

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

Copyright (c) 2024 Andreas Ruttkamp <ioBroker.rct@ruttkamp.com>