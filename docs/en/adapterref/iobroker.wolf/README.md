---
BADGE-Number of Installations: https://iobroker.live/badges/wolf-stable.svg
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.wolf.svg
BADGE-Test and Release: https://github.com/ioBroker/ioBroker.wolf/workflows/Test%20and%20Release/badge.svg
BADGE-Translation status: https://weblate.iobroker.net/widgets/adapters/-/wolf/svg-badge.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.wolf.svg
---
# iobroker.wolf
## Areas of application: heating / solar / domestic ventilation
The adapter can evaluate a maximum of 4 of the following heaters via the ISM8i:
   * Gas condensing unit: CGB-2 (includes: CGW-2, CGS-2, CSZ-2), MGK-2
   * Oil condensing boiler: TOB
   * Split heat pump: BWL-1-S
   * Living room ventilation CWL Excellent
   A system control module BM-2 or display module AM is always required.
   Furthermore, additional components such as mixer module MM, cascade module KM, solar module SM1 or SM2, may be present in the eBus system.
   
Maximum number of individual modules:
   * Max. 4 heaters hg (1) -hg (4)
   * Max. 3 mixers mm (1) - mm (3)
   * Max. 4 operator panels (BM-2) bm (1) -bm (4)
   * Max. 1 cascade module km (1)
   * Max. 1 solar module (SM1 or SM2) sm (1)
   * Max. 1 Split air/water heatpump (BWL-1-S) hg (0)
   A residential ventilation unit of the CWL Excellent series can also be evaluated and operated with the ISM8i.

## Writing values
Writable datapoints are sent to the ISM8i when their value is set without acknowledge (`ack = false`).
The adapter limits and rounds the value to the allowed range (ISM8i manual, chapter 8.8) and acknowledges the state with the sent value.
Invalid values are not sent, an error is logged instead.

| Datapoint                          | Values                                                                        |
|------------------------------------|-------------------------------------------------------------------------------|
| Programmwahl Heizkreis / Mischer   | `0` / `Standby`, `1` / `Automatikbetrieb`, `2` / `Heizbetrieb`, `3` / `Sparbetrieb` |
| Programmwahl Warmwasser            | `0` / `Standby`, `1` / `Automatikbetrieb`, `2` / `Dauerbetrieb`               |
| Programmwahl CWL                   | `0` / `Automatikbetrieb`, `1` / `Nennlüftung`, `3` / `Reduzierte Lüftung`, `4` / `Feuchteschutz` |
| Warmwassersolltemperatur           | 20...80 °C in steps of 1 °C                                                   |
| Sollwertkorrektur                  | -4...4 K in steps of 0.5 K                                                    |
| Sparfaktor                         | 0...10 K in steps of 0.5 K                                                    |
| Leistungsvorgabe, Gesamtmodulationsgradvorgabe | 0...100 %                                                         |
| Kessel-/Sammlersolltemperaturvorgabe | 0...90 °C (the device limits it to TKmin/TKmax)                             |
| Date (Intensivlüftung, Feuchteschutz) | `YYYY-MM-DD`, `DD.MM.YYYY` or any format that JavaScript `Date` can parse   |
| Time (Intensivlüftung, Feuchteschutz) | `HH:MM`, `HH:MM:SS` or any format that JavaScript `Date` can parse          |
| Switches (Zeitprogramme etc.)      | `On`, `1`, `true` = on, everything else = off                                 |

The numbers of Programmwahl Heizkreis/Mischer/Warmwasser are the numbering of the Wolf control unit (ISM8i manual, chapter 8.7), not the KNX values.

## Connection
The adapter is a TCP server, the ISM8i connects to it (default port 12004).
`info.connection` shows whether an ISM8i is connected.
If the ISM8i connects again, the old connection from this address is closed.

## Changelog
### 2.0.0 (2026-11-23)
* (GermanBluefox) Breaking change: Node.js >= 22 and admin >= 7.0.0 are required now
* (GermanBluefox) The adapter was refactored to TypeScript, the configuration dialog to JsonConfig
* (GermanBluefox) Configurations of older versions are converted when the adapter starts (before: when the configuration dialog was opened)
* (GermanBluefox) Added unit tests for the protocol and the value conversion, and an integration test with a simulated ISM8i
* (ioBroker-Bot) Adapter requires js-controller >= 6.0.11 now.
* (GermanBluefox) Updated @iobroker/adapter-core to 3.x (#132)
* (GermanBluefox) Fixed boolean handling for DPT_Bool and type update of existing objects when the boolean option changes (#98)
* (GermanBluefox) Unknown mode values of ISM8i are written as raw values instead of logging parse errors, telegrams without a value are skipped (#92, #124)
* (GermanBluefox) Removed min/max from read-only states to avoid range warnings, min/max of writable states are updated to the real limits (#102, #109)
* (GermanBluefox) Migrated deploy workflow to npm Trusted Publishing (#139)
* (GermanBluefox) Fixed crash when a telegram was split over several TCP packets. All datapoints of a telegram are processed now (#107)
* (GermanBluefox) Fixed connection handling: closed connections are removed, an old connection is closed when the ISM8i reconnects, polling and writing only use open connections (#154, #123)
* (GermanBluefox) Added state `info.connection`
* (GermanBluefox) An object of a datapoint at a path of an older version does not block creating the object at the current path anymore (#96)
* (GermanBluefox) Added missing datapoints: 211 (Betriebsart Heizen/Kühlen, Kaskadenmodul), 365 (Kesselsolltemperatur HG2) and 372 (Zuletzt aktiver Störcode)
* (GermanBluefox) Fixed writing: temperatures above 81.9 °C (e.g. Kesselsolltemperaturvorgabe 90 °C) were sent wrong, Leistungsvorgabe/Gesamtmodulationsgradvorgabe sent 40 % of the value, values were sent without limits, Sollwertkorrektur below -4 became +4, dates were sent with the weekday as day, writing a date or time terminated the adapter (#125)
* (GermanBluefox) Sammlersolltemperaturvorgabe (DP 210) can be written now
* (GermanBluefox) Invalid values for Programmwahl are not sent anymore (before: Automatikbetrieb or Sparbetrieb was sent). The numbers are unchanged (numbering of the Wolf control unit), see documentation
* (GermanBluefox) Warmwassersolltemperatur can be set from 20 to 80 °C as described in the ISM8i manual (before: 0 to 65 °C)
* (GermanBluefox) Percent values (DPT_Scaling) are calculated with 100/255 as described in the ISM8i manual, so 100 % is shown as 100 % (before: 102 %)
* (GermanBluefox) Fixed decoding of the device detection: "Erkennung verfügbarer Geräte 2" (DP 356) was always empty, DP 355 showed wrong devices, DP 251 and 358 were empty if more than one circuit is available, "Zuletzt aktiver Störcode" (DP 372) had no value
* (GermanBluefox) Unknown values of "Betriebsart" are shown with their KNX name or number instead of logging parse errors. "Programmwahl" shows "Permanent Kühlen"

### 1.7.0 (2023-01-26)
* (fred0815) added missing ISM8i states
* (fred0815) optimized channel object naming
* (fred0815) fixed configuration of polling interval
* (Apollon77) Adjust some temperature states to allow to go negative

### 1.6.1 (2023-01-16)
* (Apollon77) Fixed some crash cases with unknown datapoints

### 1.6.0 (2022-12-30)
* (Apollon77) Add DPT10 Encoding (TimeofDay) - but ignores weekday!
* (Apollon77) Adjust some temperature states to allow to go negative
* (Apollon77) Add additional polling of all values to ensure that all values are updated
* (Apollon77) Fix configuration issue with Mixing modules

### 1.5.0 (2022-05-30)
* (Apollon77) make sure datapoints are created correctly and resolve name-mixup since 1.2.0 (all states now be names with _t!)
* (Apollon77) Drop support for Admin <3.0.0
* (Apollon77) Fix crash cases reported by Sentry

## License

The MIT License (MIT)

Copyright (c) 2019-2026 ioBroker-Community
              2015-2019 Smiling Jack

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.