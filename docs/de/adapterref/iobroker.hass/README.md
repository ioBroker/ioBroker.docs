---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.hass/README.md
title: ioBroker.hass
hash: DTMrMvmhDjW3snxD6Sxstww2gJf/X7BwdV54R2ogU0M=
---
![Logo](../../../en/adapterref/iobroker.hass/admin/hass.png)

![Anzahl der Installationen](http://iobroker.live/badges/hass-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.hass.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.hass.svg)

# IoBroker.hass
![Test und Freigabe](https://github.com/ioBroker/ioBroker.hass/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/hass/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in Abschnitt [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

Dieser Adapter ermöglicht die Verbindung von Home Assistant mit ioBroker.

## Verwendung
Erstellen Sie in HASS ein Langzeittoken und verwenden Sie es als Passwort (kopieren Sie es auch in das Wiederholungsfeld).

Anschließend sollten alle Attribute aller Geräte ausgelesen werden. Dienste können steuerbar sein (z. B. „turn_on“). Zur Steuerung von Diensten haben Sie zwei Möglichkeiten:

### Einen direkten Wert festlegen
Setzen Sie den Status auf einen Wert namens „ack=false“, der kein String ist (z. B. „true“). Dann wird der Befehl auch in HASS ohne zusätzliche Dienstdaten ausgelöst. Dies funktioniert nur, wenn der Dienst genau ein zu sendendes Feld hat – in diesem Fall wird der Wert als dieses Feld gesendet! Hat der Dienst mehrere Felder, finden Sie im Log eine Warnung mit weiteren Details zu den möglichen Feldern.

```
Please make sure to provide a stringified JSON as value to set relevant fields! Please refer to the Readme for details!
Allowed field keys are: temperature, target_temp_high, target_temp_low, hvac_mode
```

### Legen Sie einen JSON-String fest, um ein oder mehrere Felder anzugeben
Setzen Sie den Status auf einen String-Wert ack=false, der ein serialisiertes JSON-Objekt ist, um den Dienst aufzurufen und das JSON-Objekt als Dienstdaten zu verwenden.

Bei der letzten Option für light.turn_off mit z. B. `{"transition":10,"flash":"short"}` werden diese beiden Servicedaten mit dem Aufruf an HASS gesendet. Die verfügbaren Felder mit ihrer genauen Datendefinition finden Sie in der JSON-Definition des ioBroker-Objekts im Abschnitt `native` der Felder. Im obigen Beispiel sähen sie wie folgt aus:

```json5
{
    // ...
    native: {
        "fields": {
            "transition": {
                "name": "Transition",
                "description": "Duration it takes to get to next state.",
                "selector": {
                    "number": {
                        "min": 0,
                        "max": 300,
                        "unit_of_measurement": "seconds"
                    }
                }
            },
            "flash": {
                "name": "Flash",
                "description": "If the light should flash.",
                "advanced": true,
                "selector": {
                    "select": {
                        "options": [
                            "long",
                            "short"
                        ]
                    }
                }
            }
        },
        "entity_id": "light.mi_control_hub_light",
        "attr": "turn_off",
        "type": "light"
    }
    //...
}
```

Für einige Dienste wie set_speed ist es erforderlich, ein JSON-Objekt wie beispielsweise `{speed: "high"}` aufzurufen, um die benötigten Werte anzugeben. In diesem Fall sieht die Felddefinition beispielsweise wie folgt aus:

```json5
{
    //...
    native: {
        "fields": {
            "speed": {
                "name": "Speed",
                "description": "Speed setting.",
                "required": true,
                "example": "low",
                "selector": {
                    "text": null
                }
            }
        }
        // ...
    }
    // ...
}
```

## Konfiguration
Es gibt einen guten Artikel über Verbindung.

Bitte schauen Sie hier nach: https://www.smarthomejetzt.de/mit-iobroker-auf-eine-home-assistant-hass-io-installation-und-die-geraete-zugreifen/

**Leider nur auf Deutsch, aber die [Google Translate funktioniert recht gut.](https://translate.google.com/translate?hl=en&sl=de&tl=en&u=https%3A%2F%2Fwww.smarthomejetzt.de%2Fmit-iobroker-auf-eine-home-assistant-hass-io-installation-und-die-geraete-zugreifen%2F)**

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **IN BEARBEITUNG** -->

## Changelog
### 2.0.3 (2026-04-02)
* (@GermanBluefox) Adapter was updated and migrated to TypeScript
* (@Titanium177) Added roles for states and added debouncing for reading states from hass

### 1.4.0 (2023-01-03)
* (Apollon77) Added more guidance logging when setting services incorrectly
* (Apollon77) Prevent crashes when attributes contain "." at the end of their names
* (Apollon77) Added logging for state updates for unknown objects

### 1.3.0 (2022-07-01)
* (Apollon77) Further optimize sending data to HASS and allow setting values like numbers as normal states if the service has one attribute and it can be mapped

### 1.2.0 (2022-06-17)
* (Apollon77) IMPORTANT: Replace special characters in entity attribute names with an underscore! Object IDs might change!
* (Apollon77) make sure a "null" value in state changes is not crashing

### 1.1.2 (2022-03-29)
* (Apollon77) Fix crash cases reported by Sentry

### 1.1.1 (2022-03-25)
* (Apollon77) Show password fields masked again in config

### 1.1.0 (2022-03-24)
* IMPORTANT: You need to re-enter the password once after installing this version!
* (Apollon77) Implement Service triggers to use any value to trigger or stringified JSON to call with fields
* (Apollon77) Optimize unload handling
* (Apollon7) Add Sentry for crash reporting

### 1.0.1 (2021-09-04)
* IMPORTANT: js-controller 2.0 is needed at least!
* (Apollon77) Fix start issue
* (Apollon77/Garfonso) Fix issue where value could not be set in hass

### 1.0.0 (2020-12-13)
* (bluefox) added the support of compact mode

### 0.1.0
* (bluefox) initial release

## License
The MIT License (MIT)

Copyright (c) 2018-2026 bluefox <dogafox@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.