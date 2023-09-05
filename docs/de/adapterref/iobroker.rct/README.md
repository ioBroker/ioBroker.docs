---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.rct/README.md
title: ioBroker.rct
hash: dKOLwGLUrES+/onbfQwzxVAzlZbq1/kxHEkiJSe7nTI=
---
![Logo](../../../en/adapterref/iobroker.rct/admin/rct.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.rct.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.rct.svg)
![Anzahl der Installationen (aktuell)](https://iobroker.live/badges/rct-installed.svg)
![Anzahl Installationen (stabil)](https://iobroker.live/badges/rct-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/aruttkamp/iobroker.rct.svg)
![NPM](https://nodei.co/npm/iobroker.rct.png?downloads=true)

# IoBroker.rct
**Tests:** ![Test und Freigabe](https://github.com/aruttkamp/ioBroker.rct/workflows/Test%20and%20Release/badge.svg)

## Besitzerwechsel
Nachdem Lauff zum Home Assistant gewechselt ist, wird das Projekt von aruttkamp weitergeführt

## RCT-Adapter für ioBroker
Bitte beachten Sie, dass es sich um ein privates Projekt handelt und ich (Andreas Ruttkamp) in keinerlei Zusammenhang mit RCT stehe.

Werte eines RCT Power Photovoltaik-Stromrichters anzeigen

## BEMERKUNGEN
### Erste produktive Veröffentlichung
Dies ist eine erste produktive Version, nachdem sich die vorherige Version als stabil erwiesen hat und den minimal realisierbaren Umfang erfüllt.

Die Konfiguration ist immer noch begrenzt und eher technisch. Über „RCT ELemente“ kann ausgewählt werden, welche Daten vom Stromrichter gelesen werden sollen. Der Standardwert ist „battery.bat_status,battery.soc,battery.soc_target,battery.soc_target_high,battery.soc_target_low,dc_conv.dc_conv_struct[0].p_dc_lp,dc_conv.dc_conv_struct[1].p_dc_lp,fault[0].flt,fault[ 1].flt,fault[2].flt,fault[3].flt,g_sync.p_ac_grid_sum_lp,g_sync.p_ac_load_sum_lp,g_sync.p_ac_sum_lp,g_sync.p_acc_lp,g_sync.u_sg_avg[0],g_sync.u_sg_avg[1],io_board .s0_external_power,power_mng.is_heiphoss,power_mng.state,power_mng.use_grid_power_enable,power_mng.u_acc_mix_lp,prim_sm.island_flag,prim_sm.state". Weitere Elemente finden Sie im Code (Datei „rct/rc_core2.js“). Aber das ist überhaupt nicht selbsterklärend (auch nicht wirklich getestet).

## Bekannte Probleme
### Falsche Kanäle/Zustände
Eine neue Version ist möglicherweise nicht in der Lage, die richtigen ioBroker-Kanäle/-Zustände zu erstellen. In den meisten Fällen ist dies daran zu erkennen, dass der Knoten „Batterie“ als einzelnes Element und nicht als Ordner angezeigt wird.

Stoppen Sie in diesem Fall den Adapter und löschen Sie den Knoten „rct.0“ manuell.

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
* (Andreas Ruttkamp) Connection state bei Stop des Adapters zurückgesetzt
* (Andreas Ruttkamp) Connection state bei Start des Adapters nochmals angepasst

### 1.1.7 (2023-08-30)
* (Andreas Ruttkamp) Connection state korrigiert

### 1.1.6 (2023-08-23)
* (Andreas Ruttkamp) rct_core.js entfernt (wurde durch rct_core2 ersetzt)
* (Andreas Ruttkamp) Parameter die nicht unterstützt werden aus Defaultbelegung entfernt.
* (Andreas Ruttkamp) min. Node 18

### 1.1.5 (2023-08-18)
* (Andreas Ruttkamp) Fix: Abbruch bei lesen von UInt8 Datentypen behoben
* (Andreas Ruttkamp) Verzeichnisse aufgeräumt

### 1.1.4 (2023-08-18)
* (Andreas Ruttkamp) Fix: Rückgabewerte nochmals angepasst.

### 1.1.3 (2023-08-18)
* (Andreas Ruttkamp) Fix: Weitere Datenprüfungen eingbaut

### 1.1.2 (2023-08-17)
* (Andreas Ruttkamp) Fix: Abbruch des Adapters

### 1.1.1 (2023-08-17)
* (Andreas Ruttkamp) Daten für g_sync.p_ac_load[0-2] / dc_conv.dc_conv_struct[0-1].u_sg_lp hinzugefügt
* (Andreas Ruttkamp) Weitere Parameter ergänzt. 
* (Andreas Ruttkamp) Konvertierungsproblem mit Datumswerten behoben
* (Andreas Ruttkamp) Konvertierungsfehler bei % Werten behoben
* (Andreas Ruttkamp) Abbruch der Instanz bei Übertragungsfehlern behoben

### 1.0.5 (2023-07-29)
* (Andreas Ruttkamp) interne Arbeiten
* (Andreas Ruttkamp) Umgebung für Neuen Admin aktualisiert
* (Andreas Ruttkamp) Abhängigkeiten aktualisiert

### 1.0.4 (2023-04-24)
* (Andreas Ruttkamp) Release Script added and update dev-components
* (Andreas Ruttkamp) Vorbereitung neues Backend

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

Copyright (c) 2023 Andreas Ruttkamp <ioBroker.rct@ruttkamp.com>