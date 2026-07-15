---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.rct/README.md
title: ioBroker.rct
hash: ja4Xq840nSnlef0NHoGnS79lIeVqxLbZfTt6SRPqMA0=
---
![NPM-Version](https://img.shields.io/npm/v/iobroker.rct.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.rct?label=npm%20downloads&style=flat-square)
![node-lts](https://img.shields.io/node/v-lts/iobroker.rct?style=flat-square)
![Libraries.io-Abhängigkeitsstatus für die neueste Version](https://img.shields.io/librariesio/release/npm/iobroker.rct?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/aruttkamp/iobroker.rct?style=flat-square)
![GitHub-Repository-Größe](https://img.shields.io/github/repo-size/aruttkamp/iobroker.rct?logo=github&style=flat-square)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/aruttkamp/iobroker.rct?logo=github&style=flat-square)
![Letzter Commit auf GitHub](https://img.shields.io/github/last-commit/aruttkamp/iobroker.rct?logo=github&style=flat-square)
![GitHub-Probleme](https://img.shields.io/github/issues/aruttkamp/iobroker.rct?logo=github&style=flat-square)
![Stabil](http://iobroker.live/badges/rct-stable.svg)
![Installiert](https://iobroker.live/badges/rct-installed.svg)
![NPM](https://nodei.co/npm/iobroker.rct.png?downloads=true)

[![Logo](admin/rct.png)](https://www.rct-power.com/de)

# IoBroker.rct
## Versionen
## RCT-Adapter für ioBroker
Bitte beachten Sie, dass es sich hierbei um ein privates Projekt handelt und ich (Andreas Ruttkamp) in keiner Weise mit RCT verbunden bin.
Werte eines Photovoltaik-Leistungswandlers von RCT Power ablesen.

## ANMERKUNGEN
**WICHTIG: Der RCT-Wechselrichter kann nicht zwischen verschiedenen Clients unterscheiden, die Daten anfordern.** Wenn Sie die „RCT Power App“ auf einem Smartphone/Tablet öffnen oder andere Adapter (z. B. EVCC) verwenden, die Anfragen an den Wechselrichter senden, empfängt der Adapter stets nicht angeforderte Daten (im Debug-Modus sichtbar).

Diese Daten werden verworfen, und nur die angeforderten Daten werden verarbeitet.

Im Feld „RCT-Elemente“ kann ausgewählt werden, welche Daten vom Stromrichter gelesen werden sollen.
Wenn hier nichts eingegeben wird, werden die Standardwerte verwendet.

"battery.bat_status,battery.soc,battery.soc_target,battery.soc_target_high,battery.soc_target_low,dc_conv.dc_conv_struct[0].p_dc_lp,dc_conv.dc_conv_struct[1].p_dc_lp,fault[0].flt,fault[1].flt,fault[2].flt,fault[3].flt,g_syn c.p_ac_grid_sum_lp,g_sync.p_ac_load_sum_lp,g_sync.p_ac_sum_lp,g_sync.p_acc_lp,g_sync.u_sg_avg[0],g_sync.u_sg_avg[1],io_board.s0_external_power,power_mng.is_heiphoss,power_mng.state,power_mng.u_acc_mix_lp,prim_sm.island_flag"

Weitere Elemente finden sich im Code (Datei „rct/rc_core2.js“). Da dieser nicht selbsterklärend ist, erfolgt die Verwendung auf eigene Gefahr!

Das Objekt "battery.bat_status" gibt den Status einer angeschlossenen Batterie an:

* 0 -> Laden/Entladen (Normalbetrieb)
* 1 -> Leerlauf (keine CAN-Verbindung Wechselrichter -> Batterie)
* 3 -> Verbindung (Wechselrichter -> Batterie)
* 5 -> Synchronisierung (Wechselrichter -> Batterie)
* 8 -> Kalibrierung - Ladephase (0 % --> 100 %)
* 1024 -> Kalibrierung - Entladephase (xx% --> 0%)
* 2048 -> Ausgleich

Das Objekt „prim_sm.state“ gibt den Status des Wechselrichters an.

* 0 -> 'Standby'
* 1 -> 'Initialisierung'
* 2 -> 'Standby'
* 3 -> 'Effizienz (Debug-Zustand für Entwicklungszwecke)'
* 4 -> 'Isolierprüfung'
* 5 -> 'Inselprüfung (Entscheidung, wohin die Reise gehen soll - netzgebunden oder Insel)'
* 6 -> 'Energieprüfung (Entscheidung, ob genügend Energie zum Starten vorhanden ist oder nicht)'
* 7 -> 'Symmetrie (DC-Link-Ausrichtung)'
* 8 -> 'Relaistest'
* 9 -> 'Netzpassiv (Wechselrichter bezieht Strom aus dem Netz ohne Brückentaktung)'
* 10 -> 'Batterie passiv vorbereiten'
* 11 -> 'Batterie passiv (netzunabhängig)'
* 12 -> 'Hardwaretest'
* 13 -> 'Netzeinspeisung'

## Bekannte Probleme
Keiner

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 1.2.28 (2026-06-18)
Improve Logging Consistency and Debug Handling
#320

### 1.2.27 (2026-05-19)
- (copilot) Adapter requires node.js >= 22 now
- (Andreas Ruttkamp) dependencies updated
- (Andreas Ruttkamp) minimum version for admin now 7.6.20

### 1.2.26 (2026-02-22)
* (Andreas Ruttkamp) correct handling for parameter without "." ( grid_offset / android_description ) [#262](https://github.com/aruttkamp/ioBroker.rct/issues/262)

### 1.2.25 (2025-10-16)
* (Andreas Ruttkamp) repro checker issues resolved
* (Andreas Ruttkamp) npm trusted publishing integrated

### 1.2.24 (2025-09-01)
* (Andreas Ruttkamp) dev dependencies updated
* (Andreas Ruttkamp) minimum version for admin now 7.6.17
* (Andreas Ruttkamp) minimum version for js controller now 6.0.11

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Copyright (c) 2025-2026 Andreas Ruttkamp ioBroker.rct@ruttkamp.com