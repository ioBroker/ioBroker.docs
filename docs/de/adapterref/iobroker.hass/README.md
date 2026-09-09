---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.hass/README.md
title: ioBroker.hass
hash: hiED5qt/Lw4CJo48ZAgHS6GMO5usP5cGZjlEeJ4Bosk=
---
![Logo](../../../en/adapterref/iobroker.hass/admin/hass.png)

![Anzahl der Installationen](http://iobroker.live/badges/hass-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.hass.svg)
![Test und Freigabe](https://github.com/ioBroker/ioBroker.hass/workflows/Test%20and%20Release/badge.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/hass/svg-badge.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.hass.svg)

# ioBroker.hass

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) . Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

Dieser Adapter ermöglicht die Verbindung von Home Assistant mit ioBroker.

## Verwendung

Erstellen Sie in HASS ein Langzeittoken und verwenden Sie es als Passwort (kopieren Sie es auch in das Wiederholungsfeld).

Anschließend sollten alle Attribute aller Geräte ausgelesen werden. Dienste können steuerbar sein (z. B. „turn\_on“). Zur Steuerung von Diensten haben Sie zwei Möglichkeiten:

### Legen Sie einen direkten Wert fest.

Setzen Sie den Status auf einen Wert namens ack=false, der kein String ist (z. B. Boolean true). Dann wird der Befehl auch in HASS ohne zusätzliche Dienstdaten ausgelöst. Dies funktioniert nur, wenn der Dienst genau ein zu sendendes Feld hat – in diesem Fall wird der Wert als dieses Feld gesendet! Hat der Dienst mehrere Felder, finden Sie im Log eine Warnung mit weiteren Details zu den möglichen Feldern.

```
Please make sure to provide a stringified JSON as value to set relevant fields! Please refer to the Readme for details!
Allowed field keys are: temperature, target_temp_high, target_temp_low, hvac_mode
```

### Legen Sie einen JSON-String fest, um ein oder mehrere Felder anzugeben.

Setzen Sie den Status auf einen String-Wert ack=false, der ein serialisiertes JSON-Objekt ist, um den Dienst aufzurufen und das JSON-Objekt als Dienstdaten zu verwenden.

Für die letzte Option bei light.turn\_off mit z.B.`{"transition":10,"flash":"short"}` Diese beiden Servicedaten werden mit dem Aufruf an HASS gesendet. Die verfügbaren Felder mit ihren genauen Datendefinitionen finden Sie in der JSON-Definition des ioBroker-Objekts.`native` Der Abschnitt "Felder" würde im obigen Beispiel wie folgt aussehen:

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

Für einige Dienste wie set\_speed ist es erforderlich, sie mit einem JSON-Objekt aufzurufen, wie zum Beispiel`{speed: "high"}` Im Allgemeinen müssen die erforderlichen Werte bereitgestellt werden. In diesem Fall sieht die Felddefinition beispielsweise so aus:

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

Es gibt einen guten Artikel über diesen Zusammenhang.

Bitte schauen Sie hier nach: <https://www.smarthomejetzt.de/mit-iobroker-auf-eine-home-assistant-hass-io-installation-und-die-geraete-zugreifen/>

**Leider nur auf Deutsch, aber [Google Translate funktioniert recht gut.](https://translate.google.com/translate?hl=en\&sl=de\&tl=en\&u=https%3A%2F%2Fwww.smarthomejetzt.de%2Fmit-iobroker-auf-eine-home-assistant-hass-io-installation-und-die-geraete-zugreifen%2F)**

## Entitätsausschlussfilter

Optional kann eingeschränkt werden, welche Home Assistant-Entitäten mit ioBroker synchronisiert werden.

Jede nicht leere Zeile ohne Kommentar im Feld **„Ausschlussmuster“** ist ein Glob (nur`*` ist ein Platzhalter und entspricht jeder beliebigen Zeichenfolge, einschließlich`.` Die Muster werden unter Berücksichtigung der Groß- und Kleinschreibung mit dem vollständigen Muster abgeglichen.`entity_id` (z.B`switch.living_room` Eine Entität, die einem beliebigen Muster entspricht, ist:

- wird übersprungen, wenn Objekte erstellt oder aktualisiert werden (erste Synchronisierung und erneute Synchronisierungen).
- Wird bei Zustandsänderungen in HASS ignoriert (es werden keine Zustandsschreibvorgänge in ioBroker ausgelöst)

Zeilen, die mit beginnen`#` werden als Kommentare behandelt.

Beispiele:

```
# Drop every entity whose name starts with `iob_`, regardless of domain:
*.iob_*

# Drop sensors only:
sensor.iob_*
```

Aktivieren Sie die **Option „Ausführliche Filterprotokollierung“** , um alle ausgeschlossenen Elemente zu protokollieren.`entity_id` einzeln während der ersten Synchronisierung (erfordert Adapter-Protokollierungsstufe)`info` oder`debug` Bei nachfolgenden Synchronisierungen wird nur die Gesamtzahl ausgegeben, um das Protokoll übersichtlich zu halten.

Eine leere Musterliste führt dazu, dass sich der Adapter genauso verhält wie in früheren Versionen.

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now

### 2.1.0 (2026-05-16)
* (mokusone) Added optional entity exclude filter with glob patterns, configurable via the admin UI, plus a verbose-logging toggle for inspecting matches
* (@klein0r) Use `/core/` instead of `/api/` when connecting to supervisor directly (e.g., in ha app)
* (@klein0r) Use ENV var SUPERVISOR_TOKEN as fallback for password

### 2.0.4 (2026-05-05)
* (@GermanBluefox) Tried to keep the custom settings of the objects when updating them with new data from HASS

### 2.0.3 (2026-04-02)
* (@GermanBluefox) Adapter was updated and migrated to TypeScript
* (@Titanium177) Added roles for states and added debouncing for reading states from hass

### 1.4.0 (2023-01-03)
* (Apollon77) Added more guidance logging when setting services incorrectly
* (Apollon77) Prevent crashes when attributes contain "." at the end of their names
* (Apollon77) Added logging for state updates for unknown objects

### 1.3.0 (2022-07-01)
* (Apollon77) Further optimize sending data to HASS and allow setting values like numbers as normal states if the service has one attribute and it can be mapped

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