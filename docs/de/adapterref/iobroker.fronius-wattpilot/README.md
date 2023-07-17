---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.fronius-wattpilot/README.md
title: ioBroker.fronius-wattpilot
hash: VThBtaXu8zxIYDcu3tGJ7tXYDXlk1fBEOw3hRsEn3a0=
---
![Logo](../../../en/adapterref/iobroker.fronius-wattpilot/admin/fronius-wattpilot.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.fronius-wattpilot.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.fronius-wattpilot.svg)
![Anzahl der Installationen](https://iobroker.live/badges/fronius-wattpilot-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/fronius-wattpilot-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/tim2zg/iobroker.fronius-wattpilot.svg)
![NPM](https://nodei.co/npm/iobroker.fronius-wattpilot.png?downloads=true)

# IoBroker.fronius-wattpilot
**Tests:** ![Test und Freigabe](https://github.com/tim2zg/ioBroker.fronius-wattpilot/workflows/Test%20and%20Release/badge.svg)

Barebone-Implementierung der inoffiziellen Fronius Watt Pilot (https://www.fronius.com/de-ch/switzerland/solarenergie/installateure-partner/technische-daten/alle-produkte/l%C3%B6sungen/fronius-wattpilot) API . Basierend auf https://github.com/joscha82/wattpilot.

## Wie installiert man:
**Ich übernehme keine Verantwortung für Ihr Gerät. Mit dieser API können Sie direkt auf das Gerät zugreifen, seien Sie vorsichtig.**

### **Anforderungen**
- Schließen Sie Ihre normale Installation der Fronius Watt Pilot-App ab. Merken Sie sich das Passwort!
- Gehen Sie zur Registerkarte „Internet“ und verbinden Sie Ihren Pilot mit Ihrem WLAN.
- Finden Sie die IP-Adresse Ihres WattPilot heraus.
  - Option 1: Über die Web-GUI Ihres Routers.
  - Option 2: Über die Wattpilot-App: Klicken Sie nach dem Verbindungsaufbau auf den WLAN-Namen.

  Sie sehen eine Seite mit weiteren Informationen zu Ihrer WLAN-Verbindung. Notieren Sie sich die IP-Adresse.

### **iobroker.fronuis-wattpilot-Adapter**
- Jetzt können Sie über die „Adapter“-Seite regulär eine Instanz von iobroker.fronius-wattpilot installieren.
- Nachdem Sie die Instanz erstellt haben, werden Sie aufgefordert, die IP-Adresse und das Passwort Ihres WattPilot einzugeben. Geben Sie die Werte ein, die Sie zuvor bemerkt haben, und speichern Sie die Konfiguration. Wenn Sie alles richtig gemacht haben, wird der Adapter nach einer Weile grün und Sie können die eingehenden Daten im Reiter „Objekte“ sehen.

**Es wird dringend empfohlen, Ihrem WattPilot eine statische IP zuzuweisen.**

## Wie kann ich den Adapter verwenden...
Sie können die Datenpunkte dieses Adapters wie jeden anderen Datenpunkt in Ihrem Broker verwenden.
Einige Anregungen finden Sie unter „Beispiele“.

Es gibt eine [Blockly-Beispiel](https://github.com/tim2zg/ioBroker.fronius-wattpilot/blob/develop/examples/example-Blockly.xml) Möglichkeit, die Leistung Ihres Solarnetzes zu messen und den Piloten automatisch auf den richtigen Stromwert (Ampere) einzustellen, um Ihren internen Energieverbrauch zu verbessern.
Sie können es einfach importieren, indem Sie den Inhalt des Beispiels kopieren und über das „Import Blocks“-Symbol in der oberen rechten Ecke Ihres Blockly-Skripts einfügen.

## Was leistet der Adapter?
Der Adapter verbindet sich mit dem WattPilots WebSocket und trennt eingehende Daten in ioBroker-Datenpunkte, die Sie ganz komfortabel nutzen können.

## Zustände abrufen
Standardmäßig schreibt der Adapter nur die Eckpunkte des Wattpiloten. Wenn Sie alle möglichen Werte wünschen, die die API liefern kann, deaktivieren Sie das Kontrollkästchen in den Instanzeinstellungen.
Eine Dokumentation der Datenpunkte finden Sie hier: https://github.com/joscha82/wattpilot/blob/main/API.md (Danke an joscha82)

## Zustände festlegen?
Die wichtigsten Zustände, die Sie direkt setzen können, sind AccessState, amp, CableLock, cae und mode.

**AccessState**: „Offen“ oder „Warten“

**Verstärker**: 6-16

**cableLock**: „Normal“ oder „AutoUnlock“ oder „AlwaysLock“

**cae**: „true“ oder „false“ (Achtung: Dadurch wird die Cloud-Funktionalität Ihres WattPilot deaktiviert, möglicherweise muss ein Neustart erfolgen)

Ja, schreiben Sie einfach den Statusnamen, gefolgt von einem Semikolon und dann den Wert im Status set_state.
Zum Beispiel:

    Amp;6

**Sie können den „amp“- und den „lmo“-Zustand direkt über die set_power- und set_mode-Zustände steuern.**

## Was bedeutet dieses Durcheinander?
Dank joscha82 wissen wir: https://github.com/joscha82/wattpilot/blob/main/API.md

## Entwickler
- [SebastianHanz](https://github.com/SebastianHanz)
- [tim2zg](https://github.com/tim2zg)
- [derHaubi](https://github.com/derHaubi)

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 4.6.0 (2023-07-15)
- Fixed timeout issue in normal parser mode (#36), still exist in dynamic parser mode --> use no timeout (0)
- Fixed a number of issues concerning the static parser mode
- Quality of life improvements --> you can now set the common states directly! (set_power, set_mode) are still available for compatibility reasons and for the dynamic parser mode

### 4.5.1 (2023-03-02)
- Fixed issue #29 (custom states not working)

### 4.5.0 (2023-02-19)
- Fixed random log messages
- Fixed a type conflict at the set_state state
- Commits from now on should be signed

### 4.4.0 (2023-02-16)
- known states will now be updated even if the dynamic parser is enabled

### 4.3.0 (2023-01-14)
- dependency updates
- state updates

### 4.2.1 (2023-01-05)
- Fixed bug in the all values mode / parser

### 4.2.0 (2023-01-01)
- Some QoL improvements

### 4.1.0 (2022-12-30)
- Added the possibility to add states manually via the instance-settings
- Fixed the bug where the adapter didn't set the correct value types
- Added some quality of life improvements

### 4.0.0 (2022-11-30)
- Fixed timing issue 
- Added set_power and set_mode states

### 3.3.1 (2022-11-17)
- Fixed a bug where set_state was not writable

### 3.3.0 (2022-11-17)
- Fixed a bug where the adapter would not set the correct labels for the states
- Performance improvements
- Fixed dependencies

### 3.2.5 (2022-10-14)
- Small changes to the package.json and io-package.json

### 3.2.4 (2022-10-11) 
- Fiexed cool down timer for normal values

### 3.2.3 (2022-10-08)
- Bug fixed where the adapter would not respect the timout timer and would try to constantly reconnect to the WattPilot
- Bug fixed where the adapter would send a wrong disconnect message to the WattPilot

### 3.2.2 (2022-10-06)
- Fixed reconnecting frequency
- Fixed multiple Websocket connections
- Added frequency handler

### 3.2.1 (2022-10-02)
- Fixed reconnecting to the WebSocket
- Restructured the code

### 3.2.0 (2022-09-29)
- Implemented reconnecting
- Shrank code down

### 3.1.0 (2022-09-07)
- Added the option to use the cloud as a datasource
- Updated GitHub workflows

### 3.0.0 (2022-09-04)
- Updated README.md
- Created "examples"-directory for sample applications
- Added some translations
- Renamed checkbox "Parser" to something more intuitive
- Fixxed #4: Datapoint "map" now gets created correctly
- Fixxed #5: Password-characters are no longer visible
- Fixxed type conflict of cableType

### 2.2.4 (2022-09-01)
- SebastianHanz fixed infinite RAM-usage
- added some description

### 2.2.3 (2022-08-30)
- SebastianHanz fixed type-conflicts. Thank you!

### 2.2.2 (2022-08-25)
- Bug fixes

### 2.2.1 (2022-08-22)
- Bug fixes

### 2.2.0 (2022-08-21)
- Fixed Bugs

### 2.1.0 (2022-08-19)
- Min Node Version 16

### 2.0.3 (2022-07-20)
- Updated Readme

### 2.0.2 (2022-07-12)
-   Bug fixed

### 2.0.1 (2022-07-10)
-   Added a how to install. Not to detail because currently not in stable repo.

### 2.0.0 (2022-07-10)
-   Fixed NPM Versions hopefully

### 1.1.0 (2022-07-10)
-   Added UselessPV and TimeStamp Parser, did some testing.

### 1.0.1 (2022-06-02)
- Tests

### 1.0.0 (2022-06-02)

- Did some changes
- Did some more changes

### 0.0.5 (2020-01-01)
- Better Code

### 0.0.4 (2020-01-01)
- Parser option added

### 0.0.3 (2020-01-01)
- Parser added

### 0.0.2 (2020-01-01)
- Bug fixed

### 0.0.1 (2020-01-01)
- Initial release

## License
MIT License

Copyright (c) 2023 tim2zg <tim2zg@protonmail.com>

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