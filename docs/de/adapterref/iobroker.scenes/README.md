---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.scenes/README.md
title: ioBroker Szenenadapter
hash: W+Jc+R/8QT/FJXCVFhTA+mTndHRZvVFGRJT1uWPAwGk=
---
![Logo](../../../en/adapterref/iobroker.scenes/admin/scenes.png)

![Anzahl der Installationen](http://iobroker.live/badges/scenes-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.scenes.svg)
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

**Szenen** werden erstellt, wenn die Einstellung „set on false“ nicht verwendet wird. Jede Szene kann individuell konfiguriert werden, sodass Sie **Szenen** und **Gruppen** in einer Adapterinstanz haben können. Die **Szene** ist lediglich eine Liste von Zustands-IDs und -Werten, die diese Zustände bei Aktivierung der Szene aufweisen müssen. Beispiel: Wir haben die Szene erstellt.`scene.allLightInBath` :

```
  scene.allLightInBath
  |- hm-rpc.0.BOTTOM_LIGHT.STATE  - true
  +- hm-rpc.0.TOP_LIGHT.STATE     - true
```

Um die Szene zu aktivieren, müssen wir Folgendes einstellen:`scene.allLightInBath` auf „true“ gesetzt (z. B. über ein Skript oder eine Visualisierung). Dann werden beide Zustände auf die gewünschten Werte gesetzt.`true` Der Wert von`scene.allLightInBath` wird sein`true` Auch wenn wir manuell auf das obere Licht umschalten, ändert sich der Wert von`scene.allLightInBath` wird gehen zu`false` Und wieder zu`true` wenn wir das Licht manuell einschalten.

Fügen wir der **Szene** noch den Ventilator hinzu:

```
  scene.allLightInBath
  |- hm-rpc.0.BOTTOM_LIGHT.STATE  - true
  |- hm-rpc.0.TOP_LIGHT.STATE     - true
  |- hm-rpc.0.FAN.STATE          - true
  |- hm-rpc.0.FAN.STATE          - false (delay 60000ms)
```

In diesem Fall wird der Ventilator bei Aktivierung der **Szene** eingeschaltet und nach einer Minute wieder ausgeschaltet. Nachdem der Ventilator ausgeschaltet wurde, wird der Wert von`scene.allLightInBath` wird gehen zu`false` Da nicht alle Zustände den gewünschten Werten entsprechen, werden Zustände mit Verzögerung nicht in die Berechnungen einbezogen.

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

Jedes Mal, wenn Sie die Tür öffnen, werden alle Lichter im Badezimmer eingeschaltet. Der Wert des`scene.allLightInBath` wird auf **„wahr“** gesetzt. Wenn Sie die Tür schließen, werden die Lichter ausgeschaltet und der Wert von`scene.allLightInBath` wird auf **„false“** gesetzt.

Es ist nutzlos, aber als Beispiel taugt es gut.

Wenn Sie eine Lampe manuell einschalten, ändert sich der Wert von`scene.allLightInBath` wird **ungewiss** sein.

Verzögerungen können auch innerhalb der **Gruppe** verwendet werden, jedoch werden die Zustände mit Verzögerung nicht in die Berechnung des aktuellen **Gruppenwerts** einbezogen.

## Virtuelle Gruppen

**Virtuelle Gruppen** funktionieren ähnlich wie virtuelle Kanäle und Gruppen, können aber beliebige Werte enthalten: Zahlen, Zeichenketten usw. Sie können beispielsweise eine virtuelle Gruppe erstellen, um alle Rollläden im Wohnzimmer zu steuern. Wenn Sie in einer virtuellen Gruppe 40 % eingeben, werden alle Rollläden auf 40 % eingestellt.

Darüber hinaus können Sie festlegen, welches Verhalten für die Gruppe gelten soll, wenn nicht alle Zustände der Gruppe denselben Wert haben.

Sie können die folgenden Aggregationen angeben (nur im erweiterten Modus verfügbar):

- `uncertain` - (Standard) - Der Wert der Gruppe enthält den Text`uncertain` Die
- `any` - erster Wert ungleich Null aller Zustände in einer Gruppe.
- `min` - Minimalwert aller Zustände in einer Gruppe.
- `max` - Maximalwert aller Zustände in einer Gruppe.
- `avg` - Durchschnittswert aller Zustände in einer Gruppe.

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

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 5.1.0 (2026-09-03)
* (@GermanBluefox) Added the option "Only on change" for the triggers, so a state that is written again with the same value does not activate the scene anymore. It is enabled by default and can be switched off for every trigger
* (@GermanBluefox) The trigger value is now selected from a list if the trigger state is boolean or has "common.states"
* (@GermanBluefox) Added the loop protection: if a scene is activated too often in a short time, it will be disabled automatically

### 5.0.2 (2026-08-08)
* (ioBroker-Bot) Adapter requires js-controller >= 6.0.11 now.
* (@SimonFischer04) Corrected the virtual group aggregation for the "any" mode
* (@SimonFischer04) Added "sum" as a virtual group function

### 5.0.1 (2026-08-06)
* (@GermanBluefox) Updated packages
* (@GermanBluefox) Added widget for "devices" adapter
* (@GermanBluefox) GUI migrated to React 19 + MUI 9

### 4.0.4 (2025-10-20)
* (@GermanBluefox) Corrected the selection of multiple IDs in the scene editor

### 4.0.3 (2025-07-20)
* (agross) Canceled the cron tasks on the instance stop

[Older changelogs can be found there](https://github.com/ioBroker/ioBroker.scenes/blob/master/CHANGELOG_OLD.md)

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