---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.scenes/README.md
title: ioBroker Szenenadapter
hash: k3/P+FkPdljPf5ebiZYtZ6rSz00yPV7EhgYy9Th0yLU=
---
![Logo](../../../en/adapterref/iobroker.scenes/admin/scenes.png)

![Anzahl der Installationen](https://iobroker.live/badges/scenes-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.scenes.svg)
![Test und Freigabe](https://github.com/ioBroker/ioBroker.scenes/workflows/Test%20and%20Release/badge.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/scenes/svg-badge.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.scenes.svg)

# ioBroker Szenenadapter

_Der Szenen-Adapter_ kann Szenen erstellen und diese in der ioBroker-Umgebung ausführen.

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

Dieser Adapter kann drei Arten von Szenen erstellen:

- **Szenen**
- **Gruppen**
- **virtuelle Gruppen**

## Szenen

**Szenen** werden erstellt, wenn die Einstellung „set on false“ nicht verwendet wird. Jede Szene kann individuell konfiguriert werden, sodass Sie **Szenen** und **Gruppen** in einer Adapterinstanz haben können. Die **Szene** ist lediglich eine Liste von Zustands-IDs und -Werten, die diese Zustände bei Aktivierung der Szene aufweisen müssen. Beispiel: Wir haben die Szene erstellt. `scene.allLightInBath`:

```
  scene.allLightInBath
  |- hm-rpc.0.BOTTOM_LIGHT.STATE  - true
  +- hm-rpc.0.TOP_LIGHT.STATE     - true
```

Um die Szene zu aktivieren, müssen wir Folgendes einstellen: `scene.allLightInBath` auf „true“ gesetzt (z. B. über ein Skript oder eine Visualisierung). Dann werden beide Zustände auf die gewünschten Werte gesetzt. `true` Der Wert von `scene.allLightInBath` wird sein `true` Auch wenn wir manuell auf das obere Licht umschalten, ändert sich der Wert von `scene.allLightInBath` wird gehen zu `false` Und wieder zu `true` wenn wir das Licht manuell einschalten.

Fügen wir der **Szene** noch den Ventilator hinzu:

```
  scene.allLightInBath
  |- hm-rpc.0.BOTTOM_LIGHT.STATE  - true
  |- hm-rpc.0.TOP_LIGHT.STATE     - true
  |- hm-rpc.0.FAN.STATE          - true
  |- hm-rpc.0.FAN.STATE          - false (delay 60000ms)
```

In diesem Fall wird der Ventilator bei Aktivierung der **Szene** eingeschaltet und nach einer Minute wieder ausgeschaltet. Nachdem der Ventilator ausgeschaltet wurde, wird der Wert von `scene.allLightInBath` wird gehen zu `false` Da nicht alle Zustände den gewünschten Werten entsprechen, werden Zustände mit Verzögerung nicht in die Berechnungen einbezogen.

Sie können die Szene mit einer „Wiedergabe“-Schaltfläche testen. Außerdem können Sie diese **Szene** direkt mit einer anderen Szenen-ID verknüpfen. Wenn Sie beispielsweise einen Sensor an der Tür haben, können Sie diesen als Auslöser auswählen:

```
  trigger
    id:        hm-rpc.0.DOOR_SENSOR.STATE
    condition: ==
    value:     true
```

Und jedes Mal, wenn Sie die Badezimmertür öffnen, schalten sich alle Lampen und der Ventilator ein.

## Gruppen

**Gruppen** funktionieren wie virtuelle Kanäle. Mithilfe von **Gruppen** können Sie aus mehreren Aktoren ein virtuelles Gerät erstellen und diese gemeinsam wie ein einziges Gerät steuern. Ändern wir unser Beispiel mit der Badezimmerbeleuchtung.

```
  scene.allLightInBath             "set on true"    "set on false" 
  |- hm-rpc.0.BOTTOM_LIGHT.STATE  - true             false
  +- hm-rpc.0.TOP_LIGHT.STATE     - true             false
```

Wenn Sie diese **Gruppe** mit dem Türsensor verknüpfen, etwa so:

```
  trigger on true
    id:        hm-rpc.0.DOOR_SENSOR.STATE
    condition: ==
    value:     true

  trigger on false
    id:        hm-rpc.0.DOOR_SENSOR.STATE
    condition: ==
    value:     false
```

Jedes Mal, wenn Sie die Tür öffnen, werden alle Lichter im Badezimmer eingeschaltet. Der Wert des `scene.allLightInBath` wird auf **„wahr“** gesetzt. Wenn Sie die Tür schließen, werden die Lichter ausgeschaltet und der Wert von `scene.allLightInBath` wird auf **„false“** gesetzt.

Es ist nutzlos, aber als Beispiel taugt es gut.

Wenn Sie eine Lampe manuell einschalten, ändert sich der Wert von `scene.allLightInBath` wird **ungewiss** sein.

Verzögerungen können auch innerhalb der **Gruppe** verwendet werden, jedoch werden die Zustände mit Verzögerung nicht in die Berechnung des aktuellen **Gruppenwerts** einbezogen.

## Virtuelle Gruppen

**Virtuelle Gruppen** funktionieren ähnlich wie virtuelle Kanäle und Gruppen, können aber beliebige Werte enthalten: Zahlen, Zeichenketten usw. Sie können beispielsweise eine virtuelle Gruppe erstellen, um alle Rollläden im Wohnzimmer zu steuern. Wenn Sie in einer virtuellen Gruppe 40 % eingeben, werden alle Rollläden auf 40 % eingestellt.

Darüber hinaus können Sie festlegen, welches Verhalten für die Gruppe gelten soll, wenn nicht alle Zustände der Gruppe denselben Wert haben.

Sie können die folgenden Aggregationen angeben (nur im erweiterten Modus verfügbar):

- `uncertain` - (Standard) - Der Wert der Gruppe enthält den Text `uncertain` Die
- `any` - erster Wert ungleich Null aller Zustände in einer Gruppe.
- `min` - Minimalwert aller Zustände in einer Gruppe.
- `max` - Maximalwert aller Zustände in einer Gruppe.
- `avg` - Durchschnittswert aller Zustände in einer Gruppe.

## Mitglieder aus Kategorien (Räume und Funktionen)

Anstatt einzelner Zustände können Sie alle Geräte eines Raums und/oder einer Funktion als ein Element einer Szene hinzufügen. Die Geräteliste wird beim Start des Adapters berechnet, sodass neue Geräte in diesem Raum oder dieser Funktion automatisch hinzugefügt werden.

Mit dem „Namensfilter (RegEx)“ können Sie nur bestimmte Geräte einer Kategorie auswählen. Der Filter ist ein regulärer Ausdruck, der die Groß-/Kleinschreibung ignoriert und mit der ID und den Namen (in allen Sprachen) der Geräte abgeglichen wird. Beispiel: Der Filter `left` Aus dem Raum „Küche“ werden nur die Glühbirnen entnommen. `CL left 01`... `CL left 05` und der Filter `^CL (left|right) 0[1-3]$` nur die ersten drei Glühbirnen beider Lampen.

## Speichern Sie die aktuellen Zustände als Szene

Um aktuelle Zustände in einer Szene zu speichern, können Sie eine Nachricht an den Adapter senden:

```js
sendTo(
    'scenes.0', 
    'save', 
    {sceneId: 
        'scene.0.SCENE_ID', // scene ID 
        isForTrue: true     // true if actual values must be saved for `true` state and `false` if for false 
    }, 
    result => result.err && console.error(result.error) // optional
);
```

Der Adapter liest alle Istwerte für die in dieser Szene definierten IDs und speichert sie als konfigurierte Werte.

## Eine Szene per Nachricht deaktivieren oder aktivieren

Um eine Szene zu deaktivieren oder zu aktivieren, können Sie eine Nachricht an den Adapter senden:

```js
// enable
sendTo(
    'scenes.0', 
    'enable', 
    'scene.0.SCENE_ID', 
    result => result.err && console.error(result.error) // optional
);
// disable
sendTo(
    'scenes.0', 
    'disable', 
    'scene.0.SCENE_ID', 
    result => result.err && console.error(result.error) // optional
);
// or
sendTo(
    'scenes.0', 
    'disable', // 'enable' to enable
    {sceneId: 'scene.0.SCENE_ID'}, 
    result => result.err && console.error(result.error) // optional
);
```

## Eine laufende Szene stoppen

Wenn eine Szene Elemente mit einer Verzögerung oder einem Intervall enthält, läuft sie eine gewisse Zeit. Um sie zu stoppen, schreiben Sie `stop` in den Szenenstatus (z. B. aus der Vis-Ansicht oder einem Skript):

```js
setState('scene.0.SCENE_ID', 'stop');
```

oder eine Nachricht an den Adapter senden:

```js
sendTo(
    'scenes.0', 
    'stop', 
    'scene.0.SCENE_ID', 
    result => result.error ? console.error(result.error) : console.log(result.result) // optional
);
```

Alle verzögerten Befehle dieser Szene, die noch nicht ausgeführt wurden, werden abgebrochen. Die bereits geschriebenen Werte bleiben unverändert, und die Szene behält ihren Wert. Virtuelle Gruppen werden durch das Schreiben nicht gestoppt. `stop` Sie leiten diesen Wert wie gewohnt an ihre Mitglieder weiter.

## Nachrichten für Skripte und KI-Agenten

Die Botschaft `help` Gibt eine Beschreibung des Adapters, seiner Meldungen und der Aktivierung von Szenen zurück, die für KI-Agenten (z. B. pi-agent) und Skriptautoren geschrieben ist. Die Antwort `{help, commands}` listet außerdem alle Befehle auf, jeweils mit `write: true` Wenn es etwas ändert:

```js
sendTo('scenes.0', 'help', {}, result => console.log(result.help));
```

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 5.4.0 (2026-11-19)
* (@GermanBluefox) Added the message "help": a description of all messages and of the scene states for AI agents (e.g. pi-agent), and `common.supportedMessages.help`
* (@GermanBluefox) Added the short form of the web component manifests (tag, name, icon, size) to `common.webComponents`, so that hosts like Aura can list the components before the adapter is installed; the build writes it with `iob-web-components sync-io-package`

### 5.3.0 (2026-11-09)
* (@GermanBluefox) Added the web component `iob-scenes-scene` - the devices widget "Scene Button" for Aura and other hosts (`common.webComponents`); the name and the description of the devices widget are translated into all languages now
* (copilot) Adapter requires node.js >= 22.19.0 now

### 5.2.0 (2026-10-24)
* (reloxx13) Recognize uppercase and mixed-case boolean scene commands, so nested scenes receive FALSE correctly (#475)
* (@GermanBluefox) The state of a scene, that controls other scenes with "TRUE"/"FALSE", is now detected correctly and is not "uncertain" anymore (#475)
* (@GermanBluefox) Scenes as members of another scene now get the TRUE/FALSE selector, so the desired values are stored as booleans (#475)
* (@GermanBluefox) A scene, whose members match TRUE and FALSE at the same time, does not jump from FALSE to TRUE anymore (#267)
* (@GermanBluefox) The search in the scene list is now case-insensitive (#364)
* (@GermanBluefox) Updated "@iobroker/testing" to 6.3.1 and removed the direct "mocha" dependency
* (@GermanBluefox) A running scene can be stopped by writing "stop" into the scene state or with the message "stop". All delayed commands of the scene are cancelled (#42)
* (@GermanBluefox) Added the name filter (regular expression) for members from categories, e.g., to take only some lamps of a room (#457)

### 5.1.0 (2026-09-03)
* (@GermanBluefox) Added the option "Only on change" for the triggers, so a state that is written again with the same value does not activate the scene anymore. It is enabled by default and can be switched off for every trigger
* (@GermanBluefox) The trigger value is now selected from a list if the trigger state is boolean or has "common.states"
* (@GermanBluefox) Added the loop protection: if a scene is activated too often in a short time, it will be disabled automatically

### 5.0.2 (2026-08-08)
* (ioBroker-Bot) Adapter requires js-controller >= 6.0.11 now.
* (@SimonFischer04) Corrected the virtual group aggregation for the "any" mode
* (@SimonFischer04) Added "sum" as a virtual group function

## License
The MIT License (MIT)

Copyright (c) 2015-2026, Bluefox (dogafox@gmail.com)

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