---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.fronius-wattpilot/README.md
title: ioBroker.fronius-wattpilot
hash: /eSzdIpYtnNkZHhPmFlG2qootBGdQGbo1HJUOH6hYA4=
---
![Logo](../../../en/adapterref/iobroker.fronius-wattpilot/admin/fronius-wattpilot.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.fronius-wattpilot.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.fronius-wattpilot.svg)
![Anzahl der Installationen](https://iobroker.live/badges/fronius-wattpilot-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/fronius-wattpilot-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/tim2zg/iobroker.fronius-wattpilot.svg)
![NPM](https://nodei.co/npm/iobroker.fronius-wattpilot.png?downloads=true)

# IoBroker.fronius-wattpilot
**Tests:** ![Testen und freigeben](https://github.com/tim2zg/ioBroker.fronius-wattpilot/workflows/Test%20and%20Release/badge.svg)

Barebones-Implementierung der inoffiziellen Fronius Watt Pilot (https://www.fronius.com/de-ch/switzerland/solarenergie/installateure-partner/technische-daten/alle-produkte/l%C3%B6sungen/fronius-wattpilot) API . Basierend auf https://github.com/joscha82/wattpilot.

## Wie installiert man:
**Ich übernehme keine Verantwortung für Ihr Gerät. Mit dieser API können Sie direkt auf das Gerät zugreifen, seien Sie vorsichtig.**

### **Anforderungen**
- Beenden Sie Ihre normale Installation der Fronius Wattpilot App. Merken Sie sich das Passwort!
- Gehen Sie zur Registerkarte Internet und verbinden Sie Ihren Pilot mit Ihrem Wi-Fi.
- Finden Sie die IP-Adresse Ihres WattPilot heraus.
  - Möglichkeit 1: Über die Web-GUI Ihres Routers.
  - Option 2: Via Wattpilot App: Nach dem Verbindungsaufbau auf den WLAN-Namen klicken.

  Sie sehen eine Seite mit weiteren Informationen zu Ihrer WLAN-Verbindung. Notieren Sie sich die IP-Adresse.

### **iobroker.fronuis-wattpilot Adapter**
- Über die „Adapter“-Seite können Sie nun regelmäßig eine Instanz des iobroker.fronius-wattpilot installieren.
- Nachdem Sie die Instanz erstellt haben, werden Sie aufgefordert, die IP-Adresse und das Passwort Ihres WattPilot einzugeben. Füllen Sie die Werte aus, die Ihnen zuvor aufgefallen sind, und speichern Sie die Konfiguration. Wenn Sie alles richtig gemacht haben, wird der Adapter nach einer Weile grün und Sie können die eingehenden Daten im Reiter Objekte sehen.

**Es wird dringend empfohlen, deinem WattPilot eine statische IP zuzuweisen.**

## Wie kann ich den Adapter verwenden...
Sie können die Datenpunkte dieses Adapters wie jeden anderen Datenpunkt in Ihrem Broker verwenden.
Um einige Ideen zu bekommen, siehe "Beispiele".

Es gibt einen [Blockly-Beispiel](https://github.com/tim2zg/ioBroker.fronius-wattpilot/blob/develop/examples/example-Blockly.xml), wie Sie Ihre Solarnetzleistung messen können und der Pilot automatisch auf den richtigen Stromwert (Amp) eingestellt wird, um Ihren internen Energieverbrauch zu verbessern.
Du kannst es einfach importieren, indem du den Inhalt des Beispiels kopierst und über das „Import blocks“-Icon in der oberen rechten Ecke deines Blockly-Skripts einfügst.

## Was macht der Adapter?
Der Adapter verbindet sich mit dem WattPilots WebSocket und trennt eingehende Daten in ioBroker-Datenpunkte, die Sie ganz bequem verwenden können.

## Zustände abrufen
Standardmäßig schreibt der Adapter nur die Eckdaten des Wattpilot. Wenn Sie alle möglichen Werte wünschen, die die API liefern kann, deaktivieren Sie das Kontrollkästchen in den Instanzeinstellungen.
Eine Dokumentation der Datapoints ist hier verfügbar: https://github.com/joscha82/wattpilot/blob/main/API.md (Danke an joscha82)

## Zustände setzen?
Ja, schreiben Sie einfach den Zustandsnamen gefolgt von einem Semikolon und dann den Wert in den Zustand set_state.
Zum Beispiel:

    Ampere;6

**Sie können den Zustand „amp“ und „lmo“ direkt über die Zustände set_power und set_mode steuern.**

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

### v0.0.5 (2020-01-01)
- Better Code

### v0.0.4 (2020-01-01)
- Parser option added

### v0.0.3 (2020-01-01)
- Parser added

### v0.0.2 (2020-01-01)
- Bug fixed

### v0.0.1 (2020-01-01)
- Initial release

## License
MIT License

Copyright (c) 2022 tim2zg <tim2zg@protonmail.com>

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