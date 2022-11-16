---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.rct/README.md
title: ioBroker.rct
hash: 5zS18euTcTWgxurLHr8gj7RbqPnHqk68qY3n67jVDCk=
---
![Logo](../../../en/adapterref/iobroker.rct/admin/rct.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.rct.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.rct.svg)
![Anzahl der Installationen (neueste)](https://iobroker.live/badges/rct-installed.svg)
![Anzahl der Installationen (stabil)](https://iobroker.live/badges/rct-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/lauff/iobroker.rct.svg)
![NPM](https://nodei.co/npm/iobroker.rct.png?downloads=true)

# IoBroker.rct
**Tests:** ![Testen und freigeben](https://github.com/lauff/ioBroker.rct/workflows/Test%20and%20Release/badge.svg)

## RCT-Adapter für ioBroker
Bitte beachten Sie, dass dies ein privates Projekt ist und dass ich (Markus Lauff) in keiner Weise mit RCT verwandt bin.

Werte eines Photovoltaik-Stromrichters von RCT Power anzeigen

## BEMERKUNGEN
### Erste Produktivversion
Dies ist eine erste produktive Version, nachdem sich die vorherige Version als stabil erwiesen hat und den minimal realisierbaren Umfang erfüllt.

Die Konfiguration ist noch begrenzt und ziemlich technisch. Über das „RCT ELemente“ kann ausgewählt werden, welche Daten aus dem Stromrichter gelesen werden sollen. Standard ist "battery.bat_status,battery.soc,battery.soc_target,battery.soc_target_high,battery.soc_target_low,dc_conv.dc_conv_struct[0].enabled,dc_conv.dc_conv_struct[0].p_dc_lp,dc_conv.dc_conv_struct[1].enabled, dc_conv.dc_conv_struct[1].p_dc_lp,fault[0].flt,fault[1].flt,fault[2].flt,fault[3].flt,g_sync.p_ac_grid_sum_lp,g_sync.p_ac_load_sum_lp,g_sync.p_ac_sum_lp,g_sync .p_acc_lp,g_sync.u_sg_avg[0],g_sync.u_sg_avg[1],io_board.s0_external_power,power_mng.battery_type,power_mng.is_grid,power_mng.is_heiphoss,power_mng.state,power_mng.use_grid_power_enable,power_mng.u_acc_mix_lp,prim_mng,.islandsflag,.islandsm .Zustand". Weitere Elemente finden sich im Code (Datei „rct/rc_core.js“). Aber das ist überhaupt nicht selbstbeschreibend (auch nicht wirklich getestet).

## Bekannte Probleme
### Falsche Kanäle / Zustände
Eine neue Version kann möglicherweise nicht die richtigen ioBroker-Kanäle / -Zustände erstellen. In den meisten Fällen ist dies daran zu erkennen, dass der Knoten "Batterie" als einzelnes Element anstelle eines Ordners angezeigt wird.

Stoppen Sie in diesem Fall den Adapter und löschen Sie den Knoten „rct.0“ manuell.

## Changelog

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

Copyright (c) 2022 Markus Lauff <ioBroker.rct@markus.lauff.com>