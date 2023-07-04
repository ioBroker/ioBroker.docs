---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.worx.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.worx.svg
BADGE-Number of Installations: https://iobroker.live/badges/worx-installed.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/worx-stable.svg
BADGE-NPM: https://nodei.co/npm/iobroker.worx.png?downloads=true
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.worx/README.md
title: ioBroker.worx-Adapter
hash: Uhw8niNCQQPen2x6WAmPDxAcOcsubHLP63T3Jrd+I7U=
---
![Logo](../../../en/admin/worx.png)

# IoBroker.worx-Adapter
## Beschreibung
### Instanzeinstellungen
- „App-E-Mail“: Ihr APP-Benutzername
- „App-Passwort“: Ihr APP-Passwort
- „App-Name“: Wählen Sie Ihr Gerät
- „Verzögerung für EdgeCut“: Wann soll EdgeCut starten (Beispiel: 5 Sekunden bis zum Rasen)

![Instanzeinstellungen img/instance_1.png](../../../en/adapterref/iobroker.worx/img/instance_1.png)

- „Entfernung und Zeit in Minuten und Metern“: Standardmäßig in Stunden und Kilometern
- „MQTT-Verbindung alle 10 Minuten anpingen.“: Nur zum Testen. Bitte nicht länger als 1 Stunde!

![Instanzeinstellungen img/instance_2.png](../../../en/adapterref/iobroker.worx/img/instance_2.png)

### Ordner
- „activityLog“: Ihr Aktivitätsprotokoll (Kontrolle möglich)
- „Bereiche“: Bereiche (Steuerung möglich)
- „Kalender“: Zeitplan (Steuerung möglich)
- „Module“: Ihr(e) Modul(e) (Steuerung möglich)
- „Mäher“: Ihr Mäher (Steuerung möglich)
- „Produkt“: Alle Eigenschaften Ihrer Geräte (schreibgeschützt)
- „rawMqtt“: Alle Daten aus der Cloud (schreibgeschützt)

![Ordner img/all_folders.png](../../../en/adapterref/iobroker.worx/img/all_folders.png)

### Aktivitätsprotokoll (Wire und Vision)
- „last_update“: Letzte Aktualisierung als Zeitstempel
- `manuell_update`: Lädt das aktuelle Aktivitätsprotokoll
- „Payload“: Aktivitätsprotokoll als JSON-Tabelle (für VIS oder Blockly)

![Aktivität img/activity.png](../../../en/adapterref/iobroker.worx/img/activity.png)

### Bereiche (ohne Vision)
- „actualArea“: Aktuell
- „actualAreaIndicator“: Nächster Array-Zonenstart
- `area_0`: Beginn der Zone 1 in Metern (veränderbar)
- `area_1`: Beginn der Zone 2 in Metern (veränderbar)
- `area_2`: Beginn der Zone 3 in Metern (veränderbar)
- `area_3`: Beginn der Zone 4 in Metern (veränderbar)
- „startSequence“: Array-Zonenstart (0-9 Ereignisse), z.B. Start nur in Zone 2 [2,2,2,2,2,2,2,2,2,2] (veränderbar)
- „zoneKeeper“: Sicheres Fahren in engen Zonenübergängen (ab Firmware 3.30) (veränderbar)

![Bereich img/areas.png](../../../en/adapterref/iobroker.worx/img/areas.png)

### Kalender (Wire und Vision)
-   Z.B. Zeiteinstellung für Mittwoch

    - „wednesday.borderCut“: Mit oder ohne Randschnitt (Wert ohne Verzögerung ändern)
    - „wednesday.startTime“: Startzeit hh:mm (0-23/0-59), z.B. 09:00 (Wert ohne Verzögerung ändern)
    - `wednesday.workTime`: Arbeitszeit in Minuten (180 min = 3h) z.B. 30 (Wert ohne Verzögerung ändern)
    - „calJson_sendto“: Wenn alle Datenpunkte festgelegt sind, drücken Sie die Taste zum Senden (mit einer Verzögerung von 1,1 Sekunden). Der Mäher mäht nun 30 Minuten lang
    - „calJson_tosend“: Diese Daten werden an Mqtt gesendet (sowohl der Mähplan als auch der Mähplan werden automatisch festgelegt). Sie können dieses JSON auch selbst erstellen.
    - „calendar.calJson“: Name des Mähplans für den Wochentag ohne Nummer (Mähplan 1/wird automatisch eingestellt – nur für Kabel)
    - „calendar.calJson2“: Mähplan-Wochentagsname mit Nummer (Mähplan 2/wird automatisch eingestellt – nur für Draht)

![Ordner img/calendar.png](../../../en/adapterref/iobroker.worx/img/calendar.png)

### Module (Wire und Vision)
- Off-Limit-Modul (Draht und Vision)

    - „DF.OLMSwitch_Cutting“: Verbotene Zonen wahr-ein/falsch-aus
    - `DF.OLMSwitch_FastHoming`: Schnelle Rückkehr zur Ladestation true-on/false-off

- ACS-Modul (nur Kabel)
    - „US.ACS“: 1-an/0-aus

![Modul img/module.png](../../../en/adapterref/iobroker.worx/img/module.png)

### Mäher (Wire und Vision)
- „AutoLock“: Automatische Sperre True-On/False-Off (Draht & Vision/veränderbar)
- „AutoLockTimer“: Timer-Autosperre max. 10 Minuten in 30-Sekunden-Schritten (Draht & Vision/veränderbar)
- „batteryChargeCycle“: Batterieladezyklus (Kabel & Vision/schreibgeschützt)
- „batteryCharging“: Batterieladung false->no/true->yes (wire & Vision/readonly)
- „batteryState“: Batteriestatus in % (Kabel & Vision/schreibgeschützt)
- „batteryTemperature“: Batterietemperatur in Celsius (Kabel & Vision/schreibgeschützt)
- „batteryVoltage“: Batteriespannung in Volt (Kabel & Vision/schreibgeschützt)
- `direction`: Richtung in grad (wire & Vision/readonly)
- `edgecut`: EdgeCut starten (Draht & Vision/veränderbar)
- „Fehler“: Fehlermeldung vom Mäher (Kabel & Vision/schreibgeschützt)

```json
{
    "states": {
        "0": "No error", //(wire & Vision)
        "1": "Trapped", //(wire & Vision unknown)
        "2": "Lifted", //(wire & Vision)
        "3": "Wire missing", //(wire & Vision unknown)
        "4": "Outside wire", //(wire & Vision unknown)
        "5": "Raining", //(wire & Vision)
        "6": "Close door to mow", //(wire & Vision)
        "7": "Close door to go home", //(wire & Vision)
        "8": "Blade motor blocked", //(wire & Vision)
        "9": "Wheel motor blocked", //(wire & Vision)
        "10": "Trapped timeout", //(wire & Vision)
        "11": "Upside down", //(wire & Vision)
        "12": "Battery low", //(wire & Vision)
        "13": "Reverse wire", //(wire & Vision unknown)
        "14": "Charge error", //(wire & Vision)
        "15": "Timeout finding home", //(wire & Vision)
        "16": "Mower locked", //(wire & Vision)
        "17": "Battery over temperature", //(wire & Vision)
        "18": "dummy model", //(wire & Vision)
        "19": "Battery trunk open timeout", //(wire & Vision)
        "20": "wire sync", //(wire & Vision unknown)
        "21": "msg num" //(wire & Vision)
    }
}
```

![Mäher img/mower_1.png](../../../en/adapterref/iobroker.worx/img/mower_1.png)

- „Firmware“: Aktuell installierte Firmware (Wire & Vision/schreibgeschützt)
- „firmware_available“: Verfügbare Firmware (drahtgebunden/schreibgeschützt)
- „firmware_available_all“: Alle verfügbaren Firmware (wire/readonly)
- „firmware_available_date“: Datum der verfügbaren Firmware (wire/readonly)
- „Gradient“: Gradient in Grad (Wire & Vision/readonly)
- „Neigung“: Neigung in Grad (wire & Vision/readonly)
- „last_command“: Letzte Anfrage von iobroker oder APP als JSON-Tabelle (wire & Vision/readonly)
- „mowTimeExtend“: Mähzeitverlängerung in % Bereich: -100 % -> 100 % (kabelgebunden/veränderbar)
- „mowerActive“: Mähplan pausieren (kabelgebunden/veränderbar)
- „mqtt_update“: Mqtt-Daten max. aktualisieren. 150/Tag (Kabel & Vision/veränderbar)
- „mqtt_update_count“: Counter Update Mqtt-Daten (Wire & Vision/readonly)

![Mäher img/mower_2.png](../../../en/adapterref/iobroker.worx/img/mower_2.png)

- „oneTimeJson“: Einmalige Mähung als JSON

```json
{
    "wtm": 60, //Minutes
    "bc": 0 //0=w/o bordercut 1=with bordercut or use the next datapoints
}
```

- `oneTimeStart`: Einmaliger Mähstart „zuerst oneTimeWithBorder und oneTimeWorkTime füllen“ – mit 1,1 Sekunden Verzögerung (Draht & Vision/veränderbar)
- `oneTimeWithBorder`: Mit Bordercut - Wert ohne Verzögerung ändern (Draht & Vision/veränderbar)
- `oneTimeWorkTime`: Arbeitszeitmax. 8h in 30-Minuten-Schritten - Wert ohne Verzögerung ändern (Kabel & Vision/veränderbar)
- „online“: Mäher online (Kabel & Vision/schreibgeschützt)
- „partyModus“: Partymodus ein-/ausschalten (Kabel & Vision/veränderbar)
- „Pause“: Ein-/Ausschalten der Mäherpause (Kabel und Sicht/veränderbar)
- „sendCommand“: CMD-Befehl senden (Draht & Vision/veränderbar)

```json
{
    "states": {
        "1": "Start", //(wire & Vision)
        "2": "Stop", //(wire & Vision)
        "3": "Home", //(wire & Vision)
        "4": "Start Zone Taining", //(wire & Vision unknown)
        "5": "Lock", //(wire & Vision unknown)
        "6": "Unlock", //(wire & Vision unknown)
        "7": "Restart Robot", //(wire & Vision unknown)
        "8": "pause when follow wire", //(wire & Vision unknown)
        "9": "safe homing" //(wire & Vision unknown)
    }
}
```

- „Zustand“: True für Mäher starten und False für Mäher stoppen (Kabel & Sicht/veränderbar)
- „Status“: Status Mäher (Kabel & Vision/schreibgeschützt)

```json
{
    "states": {
        "0": "IDLE", //(wire & Vision)
        "1": "Home", //(wire & Vision)
        "2": "Start sequence", //(wire & Vision)
        "3": "Leaving home", //(wire & Vision)
        "4": "Follow wire", //(wire & Vision unknown)
        "5": "Searching home", //(wire & Vision)
        "6": "Searching wire", //(wire & Vision unknown)
        "7": "Mowing", //(wire & Vision)
        "8": "Lifted", //(wire & Vision)
        "9": "Trapped", //(wire & Vision)
        "10": "Blade blocked", //(wire & Vision)
        "11": "Debug", //(wire & Vision)
        "12": "Remote control", //(wire & Vision)
        "13": "escape from off limits", //(wire & Vision)
        "30": "Going home", //(wire & Vision)
        "31": "Zone training", //(wire & Vision)
        "32": "Border Cut", //(wire & Vision)
        "33": "Searching zone", //(wire & Vision)
        "34": "Pause" //(wire & Vision)
    }
}
```

![Mäher img/mower_3.png](../../../en/adapterref/iobroker.worx/img/mower_3.png)

- „Drehmoment“: Raddrehmomentbereich -50->50 (Draht und Sicht/veränderbar)
- „totalBladeTime“: Gesamtklingenzeit (Wire & Vision/schreibgeschützt)
- „totalDistance“: Gesamtdistanz (Draht & Sicht/schreibgeschützt)
- „totalTime“: Gesamtarbeitszeit (wire & Vision/readonly)
- „waitRain“: Regenverzögerung max. 12h in 30-Minuten-Schritten (Kabel & Vision/veränderbar)
- „wifiQuality“: WLAN-Qualität (Kabel & Vision/schreibgeschützt)

![Mäher img/mower_4.png](../../../en/adapterref/iobroker.worx/img/mower_4.png)

### Zusätzlich zum Sehen
-   Bereich
    - `rfid`: Gesamtflächen (schreibgeschützt)

![Vision img/areas_vision.png](../../../en/adapterref/iobroker.worx/img/areas_vision.png)

- Mäher
    - „log_improvement“: Verbesserungsprotokoll an Worx senden/aktivieren (änderbar)
    - „log_troubleshooting“: Fehlerbehebungsprotokoll an Worx senden/aktivieren (änderbar)

![Vision img/logs_vision.png](../../../en/adapterref/iobroker.worx/img/logs_vision.png)

- Mäher
    - „pausiert“: Pausierter Zeitplan in Minuten (änderbar)

![Vision img/paused_vision.png](../../../en/adapterref/iobroker.worx/img/paused_vision.png)

## Changelog

### **WORK IN PROGRESS**

-   (Lucky-ESA) Fix unique mqtt clientid
-   (Lucky-ESA) Fix [#704](https://github.com/iobroker-community-adapters/ioBroker.worx/issues/704)
-   (Lucky-ESA) readme.md translated [#703](https://github.com/iobroker-community-adapters/ioBroker.worx/issues/703)
-   (Lucky-ESA) Preparation new Mqtt connection Fix [#590](https://github.com/iobroker-community-adapters/ioBroker.worx/issues/590)

### 2.2.0 (2023-06-27)

-   (Lucky-ESA) Removed mowerActive for Vision
-   (Lucky-ESA) Add Vision paused schedule
-   (Lucky-ESA) Add Vision partyModus
-   (Lucky-ESA) Fix ping request Vision
-   (Lucky-ESA) Fix send message inheritance
-   (Lucky-ESA) Fix [#684](https://github.com/iobroker-community-adapters/ioBroker.worx/issues/684)
-   (Lucky-ESA) Fix deviceArray inheritance
-   (Lucky-ESA) Add Vision mowers w/o Status & Error message
-   (Lucky-ESA) Add ZoneKeeper for previous mowers

### 2.1.3

-   (TA2k) Add ping option in the instance settings

### 2.1.2

-   (TA2k) Improve reconnection for multiple mower

### 2.1.1

-   (TA2k) Change reconnection times

### 2.1.0

-   (TA2k) Move Calendar setState to one Json and other fixes to prevent blocking because of too many sending requests

### 2.0.3

-   (TA2k) Add manual refresh. Fix empty status and firmware format. Reduce info logs.

### 2.0.1

-   (TA2k) Adapter rewritten. Added product info and activity log. rawMqtt values improved and compatible with Node v18.

### 1.7.0 (2022-09-28)

-   (TA2k) fix login

### 1.6.6 (2022-06-25)

-   (MeisterTR) fix edgecut

### 1.6.5 (2022-06-19)

-   (Apollon77) Remove logic to set a 0/0/0 nutrition level when deactivated again as it was in pre 1.6 versions also on second place

### 1.6.4 (2022-06-18)

-   (Apollon77) Remove logic to set a 0/0/0 nutrition level when deactivated again as it was in pre 1.6 versions
-   (Apollon77) fix error cases reported by Sentry

### 1.6.3 (2022-06-17)

-   (Apollon77) fix some error cases reported by Sentry

### 1.6.2 (2022-06-17)

-   (TA2k) fix issues introduced in 1.6.0

### 1.6.1 (2022-06-17)

-   (Apollon77) fix some error cases reported by Sentry

### 1.6.0 (2022-06-16)

-   (Apollon77) fix some error cases reported by Sentry

### 1.5.5 (2021-09-29)

-   (MeisterTR) fix error

### 1.5.0 (2021-09-26)

-   (MeisterTR) many fixes
-   (MeisterTR) add torque control
-   (MeisterTR) fixed States

### 1.4.3 (2021-07-25)

-   (MeisterTR) fix Partymode detection

### 1.4.2 (2021-07-24)

-   (MeisterTR) fix bug with OLMSwitch_Cutting
-   (MeisterTR) fix bug with PartyMode
-   (TA2k) fix error with wrong serialnumber (please delete all objects manually)
-   (MeisterTR) fix bug in autolock function

### 1.4.1 (2021-07-06)

-   (MeisterTR) fix bug in sendCommand (please remove state manually)

### 1.4.0 (2021-07-05)

-   update testing
-   add gps coordinates
-   add new status states
-   add new Autolock states
-   add new OffLinits states

### 1.3.7 (03.06.2021)

-   (TA2k) type fixes

### 1.3.6 (27.05.2021)

-   (MeisterTR) bugfixes
-   (MeisterTR) better errorhandling

### 1.2.9 (02.12.2020)

-   (MeisterTR) add sentry
-   (MeisterTR) Bugfix (error type of sc... again) (IOBROKER-WORX-3)

### 1.2.4 (15.11.2020)

-   (MeisterTR) Bugfix (error type of sc...)
-   (MeisterTR) change Testing to git

### 1.2.3 (29.08.2020)

-   (MeisterTR) add option to crate a Json Obj to set mowtime with scripts
-   (MeisterTR) add option to disable weather
-   (MeisterTR) add double Shedule, oneTimeShedule, PartyMode
-   (MeisterTR) fix setIntervall => setTimeout
-   (MeisterTR) fix error with Meter and Min. in Config
-   (MeisterTR) add Kress and Landxcape

### 1.0.0 (03.12.2019)

-   (MeisterTR) bump Version
-   (MeisterTR) transfer to community

### 0.4.0 (03.08.2019)

-   (MeisterTR) fix multimower
-   (MeisterTR) change loglevel
-   (MeisterTR) fix online Status

### 0.3.1 (12.06.2019)

-   (MeisterTR) add delay for edgecut in config
-   (MeisterTR) fix mowtime error

### 0.2.0 (01.06.2019)

-   (MeisterTR) add border
-   (MeisterTR) fix small errors
-   (MeisterTR) code cleanup

### 0.0.1

-   (MeisterTR) initial release

## License

MIT License

Copyright (c) 2023 TA2k <tombox2020@gmail.com>

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