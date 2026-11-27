---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.statechart.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.statechart.svg
BADGE-Number of Installations: https://iobroker.live/badges/statechart-installed.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/statechart-stable.svg
BADGE-NPM: https://nodei.co/npm/iobroker.statechart.png?downloads=true
BADGE-Test and Release: https://github.com/IggePop/ioBroker.statechart/workflows/Test%20and%20Release/badge.svg
chapters: {"pages":{"de/adapterref/iobroker.statechart/README.md":{"title":{"de":"ioBroker.statechart"},"content":"de/adapterref/iobroker.statechart/README.md"},"de/adapterref/iobroker.statechart/reference.md":{"title":{"de":"ioBroker.statechart: Referenz"},"content":"de/adapterref/iobroker.statechart/reference.md"},"de/adapterref/iobroker.statechart/development.md":{"title":{"de":"ioBroker.statechart: Entwicklung"},"content":"de/adapterref/iobroker.statechart/development.md"}}}
---
![Logo](../../admin/statechart.png)
# ioBroker.statechart

[English](https://github.com/IggePop/ioBroker.statechart/blob/main/README.md) | **Deutsch**

## Zustandsautomaten-Adapter für ioBroker

Bilde deine Automatisierungen als **Zustandsautomaten** (Statecharts) in einem grafischen Editor ab,
ähnlich den Chart-Editoren aus der modellbasierten Entwicklung. Zustände, Übergänge mit Events,
Bedingungen und Aktionen, Timer und Funktionsblöcke werden im ioBroker-Admin gezeichnet und vom
Adapter ausgeführt.

![Der Editor mit einer Alarmanlage: verschachtelte und parallele Zustände, Timer, ein Funktionsblock, eine Notiz und die Live-Werte](../screenshot_main.png)

*Eine Alarmanlage als Beispiel: Ausgangs- und Eingangsverzögerung, Alarm mit Sirene und Benachrichtigung parallel,
oben links die Live-Werte des laufenden Charts, rechts die Variablen.*

### Funktionen

- Grafischer Editor als eigener Eintrag in der Seitenleiste des Admins
- Zustände mit `entry`-, `during`- und `exit`-Aktionen, verschachtelte und parallele Zustände (UND), History-Junction
- Übergänge mit Beschriftungen in der bekannten Syntax `event[bedingung]{aktion}`
- Zeitlogik wie bei Stateflow: `after(5, sec)`, `before`, `at`, `every`, Zählen von Eingängen, `after(5, min, bedingung)`, `elapsed()`, `duration()`, und jeden Tag zu einer Uhrzeit oder einem Astro-Ereignis: `at("sunset", -30)`
- Funktionsblöcke mit eigenen JavaScript-Funktionen, nutzbar in allen Bedingungen und Aktionen
- Eingänge und Ausgänge, die mit beliebigen ioBroker-Datenpunkten verbunden sind
- Live-Ansicht: Der aktive Zustand wird im Editor hervorgehoben, die aktuellen Werte der Variablen werden angezeigt,
  genommene Übergänge leuchten auf, und ein Verlauf zeigt, wann welcher Übergang genommen wurde und warum
- Simulation: das Chart aus dem Editor laufen lassen, ohne dass etwas geschaltet wird, Eingänge von Hand setzen, Zeit
  vorspulen, Haltepunkte und Einzelschritte
- Code-Editor mit Syntax-Hervorhebung, Fehlerprüfung (z.B. unbekannte Variablen) und Autovervollständigung
- Statische Prüfung des Charts: Zustände, die nie aktiv werden, Übergänge, die nie genommen werden, ungenutzte Variablen
- Mehrere unabhängige Charts pro Instanz, die sich über Datenpunkte anhalten, zurücksetzen und wecken lassen (z.B. aus vis)
- Import und Export von Charts als JSON-Dateien, Export des ganzen Charts als PNG-Bild (z.B. fürs Forum)
- Die letzten 10 Versionen jedes Charts werden beim Speichern aufbewahrt und lassen sich wiederherstellen
- Kommentare zu Zuständen, Übergängen und Funktionsblöcken, Notizen auf der Zeichenfläche und eine Farbe pro Zustand
- Zustände und Übergänge lassen sich deaktivieren, wie auskommentiert: Sie bleiben im Chart, werden aber nicht ausgeführt
- Pro Eingang: Aufwecken bei jeder Aktualisierung oder nur bei Änderung, Filter nach ack, Entprellen
- Hilfsfunktionen: getState (beliebige Datenpunkte), setState, setStateDelayed, sendTo, isTimeBetween, isDaytime, astroTime, Änderungserkennung (hasChanged...)
- Ausgewählte Elemente ausrichten und verteilen, auf gleiche Breite oder Höhe bringen, Einrasten am Raster
  (abschaltbar, das Raster lässt sich ausblenden), das ganze Chart mit einem Klick anzeigen
- Die Chart-Liste und die Eigenschaften lassen sich in der Breite ändern und einklappen, für mehr Platz für das Chart
- Rückgängig/Wiederholen (Strg+Z, Strg+Y), Ausschneiden/Kopieren/Einfügen/Löschen von Zuständen, Funktionsblöcken und Notizen (Strg+X, Strg+C, Strg+V, Entf), auch zwischen Charts, Speichern mit Strg+S und eine Warnung bei ungespeicherten Änderungen
- **Code anzeigen**: das aus dem Chart generierte JavaScript, das genau zeigt, wie der Adapter es ausführt

### Installation

Der Adapter ist im Beta-Repository (latest). Wähle es im Admin unter **Einstellungen** → **Repositories** aus,
installiere dann den Adapter **Statechart** im Reiter **Adapter** und füge eine Instanz hinzu. Bis zur 1.0 kann sich
das Format der Charts noch ändern.

Voraussetzungen: Node.js 22 oder neuer, js-controller 6.0.11 oder neuer, Admin 7.6.20 oder neuer.

### Erste Schritte

1. In der Seitenleiste des Admins **Statechart** öffnen.
2. Links in der Liste mit **+** ein Chart anlegen. Mit einer **Vorlage** beginnst du mit einem funktionierenden Beispiel
   (Licht mit Bewegungsmelder, Heizung mit Fensterkontakt, Alarmanlage, Waschmaschine fertig, Rollladen mit Automatik
   und Handbetrieb, Taster mit kurzem, langem und doppeltem Druck, Anwesenheit), oder du wählst ein leeres Chart.
3. Rechts im Reiter **Variablen** die Variablen festlegen, mit **+** neben ihrer Gruppe. Die Variablen sind nach Art
   gruppiert, jede ist eine Zeile mit ihrem Datenpunkt und aktuellen Wert, ein Klick darauf zeigt ihre Einstellungen:
   - **Eingang**: wird aus einem ioBroker-Datenpunkt gelesen, jede Änderung weckt das Chart auf
   - **Ausgang**: wird in einen ioBroker-Datenpunkt geschrieben, wenn eine Aktion ihn ändert
   - **Lokal**: gibt es nur im Chart, mit einem Startwert
4. Mit **Zustand hinzufügen** Zustände anlegen. Der Zustand mit Punkt und Pfeil ist der Startzustand
   (änderbar in den Eigenschaften eines Zustands).
5. Übergänge zeichnen: vom Rand eines Zustands zu einem anderen Zustand (oder zu sich selbst) ziehen. Die Pfeile
   beginnen und enden dort, wo sich die Zustände gegenüberliegen, und folgen ihnen beim Verschieben. Um ein Ende
   an einer anderen Stelle festzulegen, den Übergang auswählen und den runden Griff am Ende am Rand entlang ziehen
   (Doppelklick: wieder automatisch). Um einen Übergang an einen anderen Zustand umzuhängen, den Griff auf diesen
   Zustand ziehen: Beschriftung und alle anderen Eigenschaften bleiben erhalten. Eine Beschriftung lässt sich
   verschieben, z.B. wenn sie eine andere verdeckt; eine verschobene Beschriftung bleibt durch eine dünne Linie mit
   ihrem Pfeil verbunden.
6. Einen Zustand oder Übergang anklicken (oder doppelklicken), um rechts seine Aktionen bzw. seine
   Beschriftung zu bearbeiten.
7. **Speichern** klicken. Neue Charts sind angehalten: Starte das Chart mit ▶ in der Chart-Liste oder in der
   Werkzeugleiste. Nach dem Speichern startet der Adapter ein laufendes Chart sofort neu.

### Beispiel: Licht mit Bewegungsmelder

| Variable | Art | Datenpunkt |
|---|---|---|
| `motion` | Eingang | z.B. `hm-rpc.0.ABC123.1.MOTION` |
| `light` | Ausgang | z.B. `hue.0.flur.on` |

| Zustand | entry |
|---|---|
| Aus (Startzustand) | `light = false;` |
| An | `light = true;` |

| Übergang | Beschriftung |
|---|---|
| Aus → An | `motion[motion == true]` |
| An → Aus | `after(2, min, !motion)` |

Das Licht geht bei Bewegung an und nach 2 Minuten ohne Bewegung aus: `after(2, min, !motion)` wartet, bis
`motion` 2 Minuten lang falsch ist, jede neue Bewegung startet die Zeit neu.

### Dokumentation

- [Referenz](/#/docs/adapterref/iobroker.statechart/reference.md): der Editor und seine Werkzeugleiste, Beschriftung von Übergängen und Zeitlogik, wann Eingänge das Chart aufwecken, Aktionen,
  verschachtelte und parallele Zustände, Hilfsfunktionen, Funktionsblöcke, ein laufendes Chart beobachten,
  Simulation, Import und Export, vom Adapter angelegte Datenpunkte, Neustart, Ausführung und Einschränkungen
- [Entwicklung](/#/docs/adapterref/iobroker.statechart/development.md): Build, Dev-Server, Tests und Aufbau des Projekts

### Hinweis

MATLAB und Stateflow sind eingetragene Marken von The MathWorks, Inc. Dieser Adapter steht in keiner Verbindung
zu The MathWorks, Inc. und wird von ihr weder unterstützt noch gesponsert.

Den Changelog gibt es im [englischen README](https://github.com/IggePop/ioBroker.statechart/blob/main/README.md#changelog).

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.7.2 (2026-11-24)
* (IggePop) saving a chart in the editor without changing its logic, e.g. after moving states or editing comments, no longer restarts it in its initial state: it continues where it was, like after a restart of the adapter
* (IggePop) the points to drag a new transition from only appear over a state, while it is selected or while a transition is dragged, and they are larger, like the handles to resize

### 0.7.1 (2026-11-22)
* (IggePop) the adapter and its tab in the admin are called "Statechart" in all languages
* (IggePop) fixed: a state of the adapter which could not be written, e.g. while it stops, caused an unhandled rejection
* (IggePop) unused translations removed, a missing Polish translation added

### 0.7.0 (2026-11-21)
* (IggePop) four new templates: washing machine done, shutter with automatic and manual mode, push button with short, long and double press, presence
* (IggePop) a paused chart keeps showing its last active states and values in the editor, gray and with their time, to help with debugging. The states `activeStateIds` and `values` keep the last values when a chart is paused, `activeState` is still cleared
* (IggePop) menu "View" in the toolbar: show or hide the grid, the minimap and the zoom buttons
* (IggePop) Ctrl+S saves the chart, also while typing in a field or code editor
* (IggePop) larger fields for transition labels (5 lines) and the actions of states (3 lines)
* (IggePop) the name of the adapter in all languages without translation errors, documentation of branching with priorities

### 0.6.0 (2026-11-19)
* (IggePop) the details of a variable list where it is used (states, transitions, function blocks), a click shows the element
* (IggePop) the wake up options of an input are always collapsed at first, the button shows if they are customized
* (IggePop) a chart whose code does not finish within the time limit of 1 s (e.g. an endless loop) is stopped, so it cannot block the other charts again and again
* (IggePop) a chart which writes more than 1000 times per minute (e.g. a feedback loop) is stopped
* (IggePop) the explanation of the transition label shows conditions with variables and a complete example
* (IggePop) new state `charts.<id>.error` with the last error or warning of a chart, e.g. to show it in vis
* (IggePop) the longer explanations behind the ⓘ icons are split into paragraphs, so they are easier to read
* (IggePop) fixed: an exception in a promise of the code of a chart restarted the adapter, and an endless loop in a promise was not aborted
* (IggePop) fixed: with the modern themes of admin 8 (also with the automatic theme), the editor stayed light instead of following the theme of the admin

### 0.5.1 (2026-11-15)
* (IggePop) documentation updated: active states, tooltips on tap, start and pause in the toolbar, the new layout functions
* (IggePop) the types of ioBroker are a direct development dependency (finding W048 of the repository checker)

Older changes: CHANGELOG_OLD.md

## License
MIT License

Copyright (c) 2026 IggePop <mail@igge.org>

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