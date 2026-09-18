---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.elero-usb-transmitter/README.md
title: ioBroker.elero-usb-transmitter
hash: dbtCfAzLwhx75Bh5Qzq9vqCcnyHahwTpKweS8O/cphM=
---
# ioBroker.elero-usb-transmitter

![NPM-Version](http://img.shields.io/npm/v/iobroker.elero-usb-transmitter.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.elero-usb-transmitter.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/elero-usb-transmitter-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/elero-usb-transmitter-stable.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/marc2016/ioBroker.elero-usb-transmitter/badge.svg)
![NPM](https://nodei.co/npm/iobroker.elero-usb-transmitter.png?downloads=true)

![Logo](../../../en/adapterref/iobroker.elero-usb-transmitter/admin/elero-usb-transmitter.png)

## elero-usb-transmitter-Adapter für ioBroker

Adapter zur Steuerung von Elero-Geräten mit dem Elero USB-Transmitter-Stick. Sie benötigen den USB-Transmitter-Stick und müssen die vorhandenen Rollladenmotoren daran anschließen. Der Adapter erkennt automatisch die aktiven Kanäle und fügt die Geräte hinzu. In den Einstellungen können Sie die Gerätenamen und das Aktualisierungsintervall festlegen.

## Konfiguration

1. **USB-Stick-Gerätepfad** : Pfad zu Ihrem USB-Transmitter-Stick (z. B. `/dev/ttyUSB0` oder `COM3`).
2. **Aktualisierungsintervall** : Zeit in Minuten, um den Gerätestatus zu aktualisieren.
3. **Gerätekonfigurationen** : In den Adaptereinstellungen können Sie Kanalnummern benutzerdefinierten Namen zuordnen.

## Verwendung

Der Adapter erstellt für jeden aktiven Kanal des Sticks ein Gerät. Jedes Gerät enthält die folgenden Zustände:

| Zustand          | Rolle    | Beschreibung                                                                           |
| :--------------- | :------- | :------------------------------------------------------------------------------------- |
| `channel`        | Text     | Die Kanalnummer des Geräts.                                                            |
| `info`           | Text     | Aktuelle Statusinformationen, die vom Stick zurückgegeben werden.                      |
| `open`           | schalten | Hauptsteuerung. Einstellen auf `true` zum ÖFFNEN, `false` zum SCHLIESSEN (ABSCHLIESSEN). |
| `controlCommand` | Zustand  | Sende spezifische Befehle direkt.                                                      |

### Steuerbefehle

Sie können die folgenden Werte in die `controlCommand` Zustand:

- `16`: STOPPEN
- `32`: HOCH
- `36` Belüftung/Neigung
- `64`: RUNTER
- `68` Zwischenposition

### Einfache Befehle

- `74`: EASY\_CHECK
- `75`: EASY\_CONFIRM
- `76`: EASY\_SEND
- `77`: EASY\_ACK
- `78`: EASY\_INFO

### Statuswerte

Der `info` Der Status zeigt den aktuellen Status des Geräts an. Gängige Werte sind:

| Wert                                 | Beschreibung                                           |
| :----------------------------------- | :----------------------------------------------------- |
| `INFO_UNKNOWN`                       | Unbekannter Status (-1).                               |
| `INFO_NO_INFORMATION`                | Keine Informationen verfügbar (0).                     |
| `INFO_TOP_POSITION_STOP`             | Auf dem ersten Platz (1) gestoppt.                     |
| `INFO_BOTTOM_POSITION_STOP`          | An der unteren Position (2) angehalten.                |
| `INFO_INTERMEDIATE_POSITION_STOP`    | An der Zwischenposition (3) angehalten.                |
| `INFO_TILT_VENTILATION_POS_STOP`     | Angehalten in der Kipp-/Belüftungsposition (4).        |
| `INFO_BLOCKING`                      | Blockierung erkannt (5).                               |
| `INFO_OVERHEATED`                    | Motor obenliegend (6).                                 |
| `INFO_TIMEOUT`                       | Zeitüberschreitung (7).                                |
| `INFO_START_TO_MOVE_UP`              | Beginnt nach oben (8).                                 |
| `INFO_START_TO_MOVE_DOWN`            | Beginnt, sich nach unten zu bewegen (9).               |
| `INFO_MOVING_UP`                     | Aufstieg (10).                                         |
| `INFO_MOVING_DOWN`                   | Abwärtsbewegung (11).                                  |
| `INFO_STOPPED_IN_UNDEFINED_POSITION` | An einer undefinierten Position angehalten (13).       |
| `INFO_TOP_POS_STOP_WICH_TILT_POS`    | Anschlag in oberer Position mit Neigungsposition (14). |
| `INFO_BOTTOM_POS_STOP_WICH_INT_POS`  | Untere Position mit Zwischenstellung (15).             |
| `INFO_SWITCHING_DEVICE_SWITCHED_OFF` | Gerät ausschalten (16).                                |
| `INFO_SWITCHING_DEVICE_SWITCHED_ON`  | Gerät einschalten (17).                                |

## Beispiele

### JavaScript / Blockly

Zum Öffnen eines Rollladens (Kanal 1):

```javascript
setState('elero-usb-transmitter.0.channel_1.open', true); // Moves UP
```

Um einen sich bewegenden Verschluss anzuhalten:

```javascript
setState('elero-usb-transmitter.0.channel_1.controlCommand', 16); // STOP command
```

## Changelog
### 1.0.7 (2026-07-25)
- (ioBroker-Bot) Adapter requires js-controller >= 6.0.11 now.

### 1.0.6 (2026-05-24)

- Serialize USB access (`runExclusive`) for `getInfo` and control commands
- Retry control commands and reconnect the stick on failure; update `info.connection`
- Adjust burst polling after commands (10s interval, 6 runs)
- Update dependencies

### 1.0.5 (2025-12-31)

-   Fixed reliability issue with fast polling (burst mode)

### 1.0.4 (2025-12-30)

-   Adjusted release configuration
-   Implemented fast polling after command execution

### 1.0.3 (2025-12-30)

- Release script configuration improved (added missing plugins)
- Bug fix: Status update handling (async + validation)
- Improvement: Connection retry logic implemented
- Improvement: All tests converted to TypeScript

Older changelogs can be found there## License

MIT License

Copyright (c) 2025-2026 marc <marc@lammers.dev>

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