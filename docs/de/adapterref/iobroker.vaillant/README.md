---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vaillant/README.md
title: ioBroker.vaillant
hash: xtCiRiPy2F+sc6R0qHkOVGNVjmBV7hz2yzhJ+Xt9u/0=
---
![Logo](../../../en/adapterref/iobroker.vaillant/admin/vaillant.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.vaillant.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.vaillant.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/vaillant-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/vaillant-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/TA2k/iobroker.vaillant.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/TA2k/ioBroker.vaillant/badge.svg)
![NPM](https://nodei.co/npm/iobroker.vaillant.png?downloads=true)

# IoBroker.vaillant
## Vaillant-Adapter für ioBroker
Vaillant multiMatic und myVaillant Adapter

### Erste Schritte
Geben Sie in den Instanzoptionen die E-Mail-Adresse und das Passwort der Multimatic/Senso- oder MyVaillant-App ein.

Die Anmeldung bei myVAILLANT erfolgt automatisch, inklusive des Anmeldeschutzes von Vaillant – Sie benötigen lediglich Ihre E-Mail-Adresse und Ihr Passwort. Die Sitzung bleibt auch nach einem Neustart erhalten, sodass sich der Adapter nicht jedes Mal neu anmelden muss.

Die Konfigurationen können über den entsprechenden Unterpunkt „Konfiguration“ angepasst werden. Einige Konfigurationen gelten nur im Modus „EIN“ oder „MANUELL“, nicht jedoch im Modus „AUTO“ oder „ZEITGESETZT“.

## **Beispiel für Multimatik:**
**Warmwasser**: vaillant.0.serialnummer.systemcontrol/tli.dhw.hotwater.configuration.hotwater_temperature_setpoint **Heizung**: Zuerst auf MANUELL stellen: vaillant.0.serialnummer.systemcontrol/tli.zones03.heating.configuration.operation_mode MANUAL. Dann die Temperatur einstellen: vaillant.0.serial.systemcontrol/tli.zones03.heating.configuration.manual_mode_temperature_setpoint. Und schließlich den Betriebsmodus auf ZEITGESETZT stellen.

Die Parameter können über das Element „parameterValue“ angepasst werden. Beachten Sie, welche Werte im Definitionsobjekt zulässig sind.

## **Beispiel myVaillant:**
vaillant.0.id.systemControlState.controlState.domesticHotWater01.boost auf true/false setzen, um die Boost-Funktion zu aktivieren oder zu deaktivieren. vaillant.0.id.systemControlState.controlState.zones01.desiredRoomTemperatureSetpoint, um die Raumtemperatur einzustellen. vaillant.0.id.systemControlState.controlState.zones01.setBackTemperature. vaillant.0.id.systemControlState.controlState.zones01.heatingOperationMode OFF MANUAL TIME_CONTROLLED. vaillant.0.id.systemControlState.controlState.domesticHotWater01.operationMode OFF MANUAL TIME_CONTROLLED.

## Fernbefehle
Für Aktualisierung und vordefinierte `vaillant.0.id.remote`

Vordefinierte Remote-Zustände gemäß `vaillant.0.id.remote`:

- `Refresh` / `RefreshStats` - Datenaktualisierung auslösen
- `boost` - Warmwasser-Boost (ein/aus)
- `quickVeto` + `duration` - Temperatur der Schnellvetozone (0 zum Deaktivieren)
- `ventilationBoost` - Belüftungsverstärkung (ein/aus)
- `coolingForDays` - Kühlung für N Tage (0 = abbrechen)
- `eebusEnabled` - EEBUS-Schnittstelle aktivieren/deaktivieren
- `holiday` – Urlaubs-/Abwesenheitsmodus als JSON, z. B. `{"startDateTime":"2024-01-01T00:00:00.000Z","endDateTime":"2024-01-07T23:59:59.999Z","setpoint":10}`. Senden Sie einen leeren Wert (oder `{}`), um den Vorgang abzubrechen. `setpoint` ist für VRC700-Controller erforderlich und wird für TLI abgelehnt. Fehlerhaftes JSON wird ignoriert (es wird keine Anfrage gesendet).
- `ventilationOperationMode` / `ventilationFanStage` - werden zusammen mit `ventilationIndex` verwendet, um die Lüftungseinheit anzusprechen. `ventilationFanStage` verwendet außerdem `ventilationFanStageType` (TAG oder NACHT).
- `customCommand` - siehe unten

Zusätzliche, schreibgeschützte Daten (übernommen von mypyllant) befinden sich unter: `vaillant.0.id.troubleCodes`, `.rts`, `.mpc`, `.energyManagement`, `.eebus`

## Benutzerdefinierter Befehl
Sie können benutzerdefinierte Befehlsfernbedienungen für nicht vordefinierte Fernbedienungen verwenden `vaillant.0.id.remotes.customCommand`

### Beispiele:
## Die Zone kann von 0 bis X reichen. Bitte testen Sie Zone/0/ oder Zone/2/.
Zone/0/xxxx

Zone/1/xxxx

Zone/2/xxxx

```json
{
  "url": "zone/0/heating/comfort-room-temperature",
  "data": { "comfortRoomTemperature": 10.5 }
}
```

```json
{
  "url": "zone/1/heating/comfort-room-temperature",
  "data": { "comfortRoomTemperature": 10.5 }
}
```

```json
{
  "url": "domestic-hot-water/255/operation-mode",
  "data": { "operationMode": "OFF" }
}
```

```json
{
  "url": "domestic-hot-water/255/temperature",
  "data": { "setpoint": 55 }
}
```

```json
{
  "url": "zone/1/heating/operation-mode",
  "data": { "operationMode": "DAY" }
}
```

```json
{
  "url": "zone/1/heating/set-back-temperature",
  "data": { "setBackTemperature": 20 }
}
```

```json
{
  "url": "zone/1/cooling/operation-mode",
  "data": { "operationMode": "DAY" }
}
```

```json
{
  "url": "zone/1/cooling/setpoint",
  "data": { "setpoint": 20 }
}
```

```json
{
  "url": "ventilation/0/operation-mode",
  "data": { "operationMode": "DAY" }
}
```

```json
{
  "url": "ventilation/0/operation-mode",
  "data": { "operationMode": "SET_BACK" }
}
```

```json
{
  "url": "ventilation/0/day-fan-stage",
  "data": { "maximumDayFanStage": 3 }
}
```

```json
{
  "url": "ventilation/0/night-fan-stage",
  "data": { "maximumNightFanStage": 2 }
}
```

```json
{
  "url": "zone/1/heating/quick-veto",
  "data": { "desiredRoomTemperatureSetpoint": 11, "duration": 3 },
  "method": "POST"
}
```

```json
{
  "url": "domestic-hot-water/255/boost",
  "data": {},
  "method": "POST"
}
```

```json
{
  "url": "domestic-hot-water/255/boost",
  "data": {},
  "method": "DELETE"
}
```

```json
{
  "url": "domestic-hot-water/255/circulation-pump/time-windows",
  "data": {
    "friday": [
      {
        "endTime": 540,
        "startTime": 360
      }
    ],
    "monday": [],
    "saturday": [],
    "sunday": [],
    "thursday": [],
    "tuesday": [],
    "wednesday": []
  }
}
```

```json
{
  "url": "domestic-hot-water/255/time-windows",
  "data": {
    "friday": [],
    "monday": [
      {
        "endTime": 1320,
        "startTime": 330
      }
    ],
    "saturday": [
      {
        "endTime": 1320,
        "startTime": 330
      }
    ],
    "sunday": [
      {
        "endTime": 1320,
        "startTime": 330
      }
    ],
    "thursday": [
      {
        "endTime": 1320,
        "startTime": 330
      }
    ],
    "tuesday": [
      {
        "endTime": 1320,
        "startTime": 330
      }
    ],
    "wednesday": [
      {
        "endTime": 1320,
        "startTime": 330
      }
    ]
  }
}
```

```json
{
  "url": "cooling-for-days",
  "data": {"value": 7},
  "method": "POST"
}
```

```json
{
  "url": "cooling-for-days",
  "method": "DELETE"
}
```

## Changelog
### 1.0.3 (2026-07-28)
 - fix writing hot water (dhw), circuit and ventilation settings from the objects (VRC700)
 - clearer log message with a customCommand example when a value is not directly writable

### 1.0.2 (2026-07-26)
 - fix changing values like temperature and operation mode from the objects (VRC700). Zone and hot water settings now write to the correct endpoint

### 1.0.1 (2026-07-24)
 - replaced the deprecated request library with axios
 - migrated to @iobroker/eslint-config and updated dependencies
 - require Node.js 22 and various repository fixes

### 1.0.0 (2026-07-24)
 - fix myVAILLANT login. Please enter your password again
 - stay logged in after a restart
 - new settings page - please open the settings and enter your password again
 - new data: fault codes, energy and EEBUS info
 - new controls: ventilation, cooling days and holiday mode

### 0.7.5 (2025-07-09)
 - revert change to fix save issue

### 0.7.2 (2024-04-18)

- fix month stats period

### 0.3.0

- add boost

### 0.1.2

- fix refresh token

### 0.1.1

- add myvaillant support and stats

### 0.0.15

- bugfixes

### 0.0.14

- add rooms support

### 0.0.13

- fix livereport order

### 0.0.11

- fix issue with js-controller 3.2

### 0.0.10

- fix issue with js-controller 3

### 0.0.8

- (TA2k) Fix Authorization problem and missing configuration states

### 0.0.6

- (TA2k) initial release

## License

MIT License

Copyright (c) 2020-2026 TA2k <tombox2020@gmail.com>

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