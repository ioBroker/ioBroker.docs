---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.lovelace/README.md
title: ioBroker.lovelace
hash: iOLJBj8VhAtGULmPmWfEajoHu7deNPqQv2WNJT4La+w=
---
![Logo](../../../en/adapterref/iobroker.lovelace/admin/lovelace.png)

![Anzahl der Installationen](http://iobroker.live/badges/lovelace-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.lovelace.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.lovelace.svg)

# IoBroker.lovelace
![Test und Freigabe](https://github.com/ioBroker/iobroker.lovelace/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/lovelace/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

## Lovelace-Adapter für ioBroker
Mit diesem Adapter können Sie Visualisierungen für ioBroker mit der Home Assistant Lovelace-Benutzeroberfläche erstellen.

[Deutsche Dokumentation](docs/de/README.md)

## Instanzobjekte
In den Ordnerinstanzen befinden sich Objekte, mit denen die Benutzeroberfläche gesteuert werden kann. Für jeden Browser wird ein neuer Unterordner mit einer zufälligen ID erstellt. Diese ID wird im Webspeicher des Client-Browsers gespeichert. Wenn Sie den Webspeicher löschen, wird eine neue Instanz erstellt. Wenn Sie den Fully Kiosk Browser verwenden, stellen Sie sicher, dass die Funktion `Delete webstorage on reload` **deaktiviert** ist.

Diese Funktionalität nutzt browser_mod, das vom Adapter installiert und aktualisiert wird. Fügen Sie keine eigene Version von browser_mod als benutzerdefinierte Karte hinzu.

## Konfiguration
Es gibt zwei Möglichkeiten, wie die Entitäten konfiguriert werden können:

- Auto
- Handbuch

### Auto
Im Automatikmodus wird ein ähnlicher Prozess wie für `google home` oder `material adapter` angewendet.

***Es werden nur Objekte und Kanäle erkannt, für die die Kategorien `function` und `room` definiert sind.***

Sie können benutzerfreundliche Namen definieren, die dann in Entitäten verwendet werden.

### Handbuch
Die Objekte können manuell in einer Objektstruktur wie `sql` oder `history` definiert werden. Der Entitätstyp und optional der Objektname müssen angegeben werden.
Mit dieser Methode lassen sich nur einfache Entitäten wie input_number, input_text oder input_boolean erstellen. Sie dürfen jeweils nur einen Zustand oder ein Attribut besitzen.

## Paneele
### Alarmzentrale
ioBroker unterstützt ein solches Gerät noch nicht, es kann aber simuliert werden. Wenn Sie ein solches Skript erstellen:

```js
createState(
    'alarmSimple',
    false,
    false,
    {
        "name": "alarmSimple",
        "role": "alarm",
        "type": "boolean",
        "read": true,
        "write": true,
        "desc": "Arm or disarm with code",
        "def": false,
        "custom": {
            "lovelace.0": {
                "enabled": true,
                "entity": "alarm_control_panel",
                "name": "simulateAlarm" // this is a name how the entity will be called. In this case "alarm_control_panel.simulateAlarm"
            }
        }
    },
    {
        "alarm_code": 1234 // this is a alarm code, that must be entered
    },
    function () {
        // react on changes
        on({id: 'javascript.' + instance + '.alarmSimple', change: 'any'}, function (obj) {
            console.log('Control here the real device: ' + obj.state.val);
        });
    }
);
```

Oder Sie verwenden einfach `lovelace.X.control.alarm (entity_id = alarm_control_panel.defaultAlarm)` dafür.

### Zahleneingabe
Dies kann manuell erfolgen, wenn im benutzerdefinierten Dialogfeld der Entitätstyp „Zahl“ ausgewählt ist.
Für diesen Typ sind die Werte `min` und `max` in `common` erforderlich; optional kann `step` hinzugefügt werden.
Um die Auf- und Abwärtspfeile anzuzeigen, muss in `mode` der Wert „Zahl“ festgelegt werden.

```json5
common: {
    custom: {
        "lovelace.0": {
            "enabled": true,
            "entity": "input_number",
            "name": "Shutter" // this is a name how the entity will be called. In this case "alarm_control_panel.simulateAlarm"
            "mode": "number", // default presentation is slider
        }
    }
}
```

### Eingabe auswählen
Dies kann manuell erfolgen, wenn der Entitätstyp `input_select` im benutzerdefinierten Dialogfeld ausgewählt ist.
Die Auswahlliste sollte in einem Standardobjekt `common.states` bereitgestellt werden.

```json
"common": {
    "type": "string",
    "states": {
      "1": "select 1",
      "2": "Select 2",
      "3": "select 3"
    },
    "custom": {
      "lovelace.0": {
        "enabled": true,
        "entity": "input_text",
        "name": "test_input_select"
      }
    }
```

Mit anderen Worten, es sollte auch eine Auswahleingabe in IoB geben.

### Timer
Der Timer könnte durch folgendes Skript simuliert werden:

```js
createState(
    'timerSimple',
    false,
    false,
    {
        "name": "timerSimple",
        "role": "level.timer",
        "type": "number",
        "read": true,
        "write": true,
        "unit": "sec",
        "desc": "Start/Stop Timer",
        "def": 0,
        "custom": {
            "lovelace.0": {
                "enabled": true,
                "entity": "timer",
                "name": "simulateTimer" // this is a name how the entity will be called. In this case "timer.simulateTimer"
            }
        }
    },
    {
        "alarm_code": 1234 // this is a alarm code, that must be entered
    },
    function () {
        let interval;
        let id = 'javascript.' + instance + '.timerSimple';
        // react on changes
        on({id, change: 'any'}, function (obj) {
            // If command
            if (!obj.state.ack) {
                // If start or pause timer
                if (obj.state.val) {
                    // If pause (the same value was written)
                    if (obj.state.val === obj.oldState.val) {
                        if (interval) {
                            setState(id, state.val, true);
                            clearInterval(interval);
                            interval = null;
                        } else {
                            interval = setInterval(() => {
                                getState(id, (err, state) => {
                                    state.val--;
                                    if (state.val <= 0) {
                                        clearInterval(interval);
                                        interval = null;
                                        state.val = 0;
                                    }
                                    setState(id, state.val, true);
                                });
                            }, 1000);
                        }
                    } else {
                        interval && clearInterval(interval);
                        // update value every second
                        interval = setInterval(() => {
                            getState(id, (err, state) => {
                                state.val--;
                                if (state.val <= 0) {
                                    clearInterval(interval);
                                    interval = null;
                                    state.val = 0;
                                }
                                setState(id, state.val, true);
                            });
                        }, 1000);
                    }
                } else {
                    // stop interval
                    interval && clearInterval(interval);
                    interval = null;
                }
            }
        });
        // test timer. Disable it later
        setTimeout(() => setState(id, 20));
    }
);
```

### Wetter
Getestet mit `yr` und `daswetter`. Mindestens eines der folgenden Objekte muss die Optionen `Function=Weather` und `Room=Any` in der Konfiguration aktiviert haben:

- `daswetter.0.NextDays.Location_1`
- `yr.0.forecast`

Getestet mit dem Treiber `AccuWeather` v1.1.0 (https://github.com/iobroker-community-adapters/ioBroker.accuweather).
Benutzerdefinierte Lovelace-Karte zur Unterstützung der AccuWeather-Vorhersage: https://github.com/algar42/IoB.lovelace.accuweather-card

### Einkaufsliste
Die Einkaufsliste schreibt die Werte in folgender Form:

```json
[
   {"summary": "Task 1", "uid": "1234222", "status": "needs_action"},
   {"summary": "Task 2", "uid": "1234223", "status": "completed"}
]
```

in den Zustand `lovelace.X.control.shopping_list`.

Sie können auch Ihre eigenen Aufgaben- oder Einkaufslisten hinzufügen, indem Sie manuelle Entitäten vom Typ `todo` erstellen.

### Karte
Die Objekte müssen so aussehen:

```js
createState('location', '39.5681295;2.6432632', false, {
    "name": "location",
    "role": "value.gps",
    "type": "string",
    "read": true,
    "write": false,
    "desc": "Gps Coordinates"
});
```

oder diese beiden Objekte:

```js
createState('location.longitude', 2.6432632, false, {
    "name": "location longitude",
    "role": "value.gps.longitude",
    "type": "number",
    "read": true,
    "write": false,
    "desc": "Gps Coordinates"
});
createState('location.latitude', 39.5681295, false, {
    "name": "location latitude",
    "role": "value.gps.latitude",
    "type": "number",
    "read": true,
    "write": false,
    "desc": "Gps Coordinates"
});
```

### Bildentität
Sie können dafür ein statisches Bild verwenden oder einen beliebigen Zustand, der eine URL als Zustand liefert.

Beispiel:

```json
{
  "_id": "daswetter.0.NextDays.Location_1.Day_1.iconURL",
  "type": "state",
  "common": {
    "name": "Weather icon URL",
    "type": "string",
    "role": "weather.icon.forecast.0",
    "read": true,
    "write": false
  },
  "native": {}
}
```

oder man setzt den Entitätstyp einfach manuell auf `camera` und schreibt die URL hinein.

### Markdown
In Markdown können Sie Bindungen wie in [iobroker.vis](https://github.com/ioBroker/ioBroker.vis#bindings-of-objects) verwenden.

Beispiel: Der Text `Admin adapter is {a:system.adapter.admin.0.alive;a === true || a === 'true' ? ' ' : 'not '} *alive*.` erzeugt den Text `Admin adapter is alive` in einem Markdown-Panel.

## Benutzerdefinierte Karten
### Hochladen von benutzerdefinierten Karten
Um die benutzerdefinierte Karte hochzuladen, verwenden Sie entweder die Registerkarte `Files` im Adminbereich, ziehen Sie sie per Drag & Drop in die Instanzeinstellungen oder geben Sie Folgendes in der Befehlszeile ein, in der iobroker installiert ist:

```iobroker file write PATH_TO_FILE\bignumber-card.js /lovelace.0/cards/```

Nach einem Neustart des Lovelace-Adapters werden automatisch alle Dateien aus dem Verzeichnis `cards` eingebunden.

Falls die Karte zusätzliche Ressourcen (CSS- oder JS-Dateien) benötigt, müssen Sie die Ordnerstruktur im Verzeichnis `cards` wiederherstellen und die Dateien dort ablegen.
Der Adapter erkennt URLs, die mit `/hacsfiles/` beginnen, und leitet sie an das Verzeichnis `cards` weiter. Sollten Sie also `404`-Fehler für URLs mit `/hacsfiles/` erhalten, passen Sie die Ordnerstruktur im Verzeichnis `cards` entsprechend an.

Wenn beispielsweise eine benutzerdefinierte Karte die folgende Datei `/hacsfiles/folder1/folder2/file3.json` benötigt, müssen Sie diese unter `/lovelace.0/cards/folder1/folder2/file3.json` ablegen.

Die benutzerdefinierten Karten werden oft als Quellcode auf GitHub gespeichert und müssen vor der Verwendung kompiliert werden.
Schauen Sie im Menü `Releases` auf GitHub nach und suchen Sie dort nach kompilierten Dateien.
Zum Beispiel: [https://github.com/kalkih/mini-graph-card/releases](https://github.com/kalkih/mini-graph-card/releases) (Suchen Sie nach der Datei `mini-graph-card-bundle.js`).

## Eigene Bilder
Die benutzerdefinierten Bilder (z. B. für einen Hintergrund) können über denselben Konfigurationsdialog wie die benutzerdefinierten Karten geladen werden. Die Verwendung erfolgt folgendermaßen:

`background: center / cover no-repeat url("/cards/background.jpg") fixed`

oder

`background: center / cover no-repeat url("/local/custom_ui/background.jpg") fixed`

in der Lovelace-Konfigurationsdatei. Lesen Sie mehr über den Hintergrund in Lovelace [Hier](https://www.home-assistant.io/lovelace/views/#background).

## Themen
Die Designs können im Konfigurationsdialog von ioBroker definiert werden.
Fügen Sie beispielsweise Folgendes ein:

```yaml
midnight:
  # Main colors
  primary-color: '#5294E2'                                                        # Header
  accent-color: '#E45E65'                                                         # Accent color
  dark-primary-color: 'var(--accent-color)'                                       # Hyperlinks
  light-primary-color: 'var(--accent-color)'                                      # Horizontal line in about

  # Text colors
  primary-text-color: '#FFFFFF'                                                   # Primary text colour, here is referencing dark-primary-color
  text-primary-color: 'var(--primary-text-color)'                                 # Primary text colour
  secondary-text-color: '#5294E2'                                                 # For secondary titles in more info boxes etc.
  disabled-text-color: '#7F848E'                                                  # Disabled text colour
  label-badge-border-color: 'green'                                               # Label badge border, just a reference value

  # Background colors
  primary-background-color: '#383C45'                                             # Settings background
  secondary-background-color: '#383C45'                                           # Main card UI background
  divider-color: 'rgba(0, 0, 0, .12)'                                             # Divider

  # Table rows
  table-row-background-color: '#353840'                                           # Table row
  table-row-alternative-background-color: '#3E424B'                               # Table row alternative

  # Nav Menu
  paper-listbox-color: 'var(--primary-color)'                                     # Navigation menu selection hoover
  paper-listbox-background-color: '#2E333A'                                       # Navigation menu background
  paper-grey-50: 'var(--primary-text-color)'
  paper-grey-200: '#414A59'                                                       # Navigation menu selection

  # Paper card
  paper-card-header-color: 'var(--accent-color)'                                  # Card header text colour
  paper-card-background-color: '#434954'                                          # Card background colour
  paper-dialog-background-color: '#434954'                                        # Card dialog background colour
  paper-item-icon-color: 'var(--primary-text-color)'                              # Icon color
  paper-item-icon-active-color: '#F9C536'                                         # Icon color active
  paper-item-icon_-_color: 'green'
  paper-item-selected_-_background-color: '#434954'                               # Popup item select
  paper-tabs-selection-bar-color: 'green'

  # Labels
  label-badge-red: 'var(--accent-color)'                                          # References the brand colour label badge border
  label-badge-text-color: 'var(--primary-text-color)'                             # Now same as label badge border but that's a matter of taste
  label-badge-background-color: '#2E333A'                                         # Same, but can also be set to transparent here

  # Switches
  paper-toggle-button-checked-button-color: 'var(--accent-color)'
  paper-toggle-button-checked-bar-color: 'var(--accent-color)'
  paper-toggle-button-checked-ink-color: 'var(--accent-color)'
  paper-toggle-button-unchecked-button-color: 'var(--disabled-text-color)'
  paper-toggle-button-unchecked-bar-color: 'var(--disabled-text-color)'
  paper-toggle-button-unchecked-ink-color: 'var(--disabled-text-color)'

  # Sliders
  paper-slider-knob-color: 'var(--accent-color)'
  paper-slider-knob-start-color: 'var(--accent-color)'
  paper-slider-pin-color: 'var(--accent-color)'
  paper-slider-active-color: 'var(--accent-color)'
  paper-slider-container-color: 'linear-gradient(var(--primary-background-color), var(--secondary-background-color)) no-repeat'
  paper-slider-secondary-color: 'var(--secondary-background-color)'
  paper-slider-disabled-active-color: 'var(--disabled-text-color)'
  paper-slider-disabled-secondary-color: 'var(--disabled-text-color)'

  # Google colors
  google-red-500: '#E45E65'
  google-green-500: '#39E949'
```

entnommen aus [Hier](https://community.home-assistant.io/t/midnight-theme/28598/2).

## Symbole
Verwenden Sie Icons im Format `mdi:NAME`, z. B. `mdi:play-network`. Namen finden Sie hier: https://materialdesignicons.com/

## Benachrichtigungen
Benachrichtigungen können Sie über die Funktionalität `sendTo` oder durch Schreiben des Status in `lovelace.X.notifications.add` hinzufügen:

```js
sendTo('lovelace.0', 'send', {message: 'Message text', title: 'Title'}); // full version
sendTo('lovelace.0', 'send', 'Message text'); // short version
```

oder

```js
setState('lovelace.0.notifications.add', '{"message": "Message text", "title": "Title"}'); // full version
setState('lovelace.0.notifications.add', 'Message text'); // short version
```

## Sprachsteuerung
Alle Befehle der Weboberfläche werden mit `ack=false` in den Status lovelace.X.conversation geschrieben.

Sie können ein Skript schreiben, das auf Anfragen reagiert und antwortet:

```js
on({id: 'lovelace.0.conversation', ack: false, change: 'any'}, obj => {
   console.log('Question: ' + obj.state.val);
   if (obj.state.val.includes('time')) {
      setState('lovelace.0.conversation', new Date().toString(), true); // true is important. It will say, that this is answer.
   } else {
      setState('lovelace.0.conversation', 'Sorry I don\'t know, what do you want', true); // true is important. It will say, that this is answer.
   }
});
```

## Fehlerbehebung
Falls Sie den YAML-Code beschädigt haben und eine leere Seite sehen, das obere Menü aber noch vorhanden ist, können Sie den Bearbeitungsmodus (falls noch nicht geschehen) über das Menü aktivieren und anschließend das Menü erneut öffnen, um auf den „RAW YAML Editor“ zuzugreifen. Dort sehen Sie den vollständigen YAML-Code und können ihn korrigieren.
Sollte dies nicht helfen, können Sie das Objekt `lovelace.*.configuration` im Rohdaten-Editor von ioBroker öffnen und es dort überprüfen. Sie können dieses Objekt auch aus einer Sicherung wiederherstellen. Es enthält die vollständige Konfiguration Ihrer Visualisierung.

## Originalquellen für Lovelace
Die verwendeten Quellen finden Sie hier: https://github.com/GermanBluefox/home-assistant-polymer.

## Todo
Die Sicherheit muss vom aktuellen Benutzer und nicht vom Standardbenutzer übernommen werden.

## Entwicklung
### Version
Verwendete Version von home-assistant-frontend@20250306.0. Browser-Mod-Version: 2.3.3

### So erstellen Sie die neue Lovelace-Version
Zunächst muss der eigentliche Branch https://github.com/home-assistant/frontend (dev branch) **manuell** in den Branch https://github.com/GermanBluefox/home-assistant-polymer.git (***iob*** branch!) zusammengeführt werden.

Alle Änderungen für ioBroker sind mit dem Kommentar `// IoB` gekennzeichnet.
Bis zum 01.04.2025 wurden folgende Dateien geändert:

- `build-scripts/gulp/app.js` - Neue Gulp-Aufgabe „develop-iob“ hinzufügen
- `build-scripts/gulp/rspack.js` - Neue Gulp-Aufgabe rspack-dev-app hinzufügen
- `src/data/icons.ts` - Alte Icons vorerst beibehalten.
- `src/data/weather.ts` - Unterstützung zum Anzeigen eines Wettersymbols aus einer URL hinzufügen.
- `src/dialogs/more-info/const.ts` - Wetterstatus und -verlauf entfernen
- `src/dialogs/more-info/ha-more-info-dialog.ts` - Schaltfläche und Registerkarte für Entitätseinstellungen entfernen
- `src/dialogs/more-info/ha-more-info-history.ts` - Entfernt den Link „Mehr anzeigen“ in der Historie
- `src/dialogs/more-info/ha-more-info-logbook.ts` - Link „Mehr anzeigen“ im Logbuch entfernen
- `src/dialogs/more-info/controls/more-info-weather.ts` - Unterstützung zum Anzeigen eines Wettersymbols über eine URL hinzufügen.
- `src/dialogs/voice-command-dialog/ha-voice-command-dialog.ts` - Konfiguration von Sprachassistenten deaktivieren
- `src/entrypoints/core.ts` - Option "Keine Authentifizierung" hinzufügen
- `src/panels/lovelace/cards/hui-weather-forecast-card.ts` - Unterstützung zum Anzeigen eines Wettersymbols aus einer URL hinzufügen.
- `src/panels/lovelace/entity-rows/hui-weather-entity-row.ts` - Unterstützung für die Anzeige des Wettersymbols per URL mit Authentifizierung hinzufügen.
- `src/panels/lovelace/hui-root.ts` - Benachrichtigungsschaltfläche hinzugefügt, Link „Dashboards verwalten“ deaktiviert
- `src/util/documentation-url.ts` - für einen Link zur iobroker-Hilfe anstelle der Home Assistant-Hilfe.
- `.husky/pre-commit` - Git-Commit-Hooks entfernen.

Anschließend die geänderte Version im Ordner `./build` auschecken. Dann.

1. Wechseln Sie in das Verzeichnis ./build.
2. `git clone https://github.com/GermanBluefox/home-assistant-polymer.git` Es handelt sich um einen Fork von https://github.com/home-assistant/frontend.git, allerdings wurden einige Dinge geändert (siehe die Dateiliste weiter oben).
3. `cd home-assistant-polymer`
4. `git checkout master`
5. `yarn install`
6. Verwenden Sie `gulp build-app` für die Release-Version oder `gulp develop-iob` für die Debugging-Version. Um die Webanwendung nach Änderungen zu erstellen, können Sie `webpack-dev-app` für einen schnelleren Build aufrufen. Sie müssen jedoch in jedem Fall `build-app` ausführen, sobald die Version einsatzbereit ist.
7. Führe das Skript `hass_frontend/static_cards/newFrontend.sh` im Adapter-Repository aus, um das Frontend zu aktualisieren (es wird davon ausgegangen, dass sich die beiden Repositories im selben Ordner befinden; falls nicht, passe das Skript bitte an, vorzugsweise mit Parameterbehandlung, und erstelle einen Pull Request, danke :smile: ).
8. Führe den `gulp rename`-Task aus.
9. Aktualisieren Sie die Versionsangabe in der `README.md`-Datei.

## Changelog

<!--
	PLACEHOLDER for the next version:
	### **WORK IN PROGRESS**
-->
### 5.0.4 (2025-12-17)
* (Garfonso) added missing roles to instance objects
* (Garfonso) manual entities should not vanish anymore because of automatic entities
* (Garfonso) add support for cover images from static urls

### 5.0.3 (2025-10-10)
* (Garfonso) make sure only existing themes are selectable in control.theme states.
* (Garfonso) bring back support for frontend_es5.

### 5.0.2 (2025-10-02)
* (Garfonso) some light entities did not restore their proper state on switch on. Fixed.
* (Garfonso) process folders-Objects for auto entities, too. (pirate-weather support)
* (Garfonso) prepare support for effects in light entities (will need new type-detector version).

### 5.0.1 (2025-09-09)
* (Garfonso) settings from entity registry are now loaded on startup
* (Garfonso) logbook: prevent entries from the future
* (Garfonso) icons should now work as before, again.
* (Garfonso) script entities now can be used again.
* (Garfonso) subscribe to all object ids in a template.
* (Garfonso) Update dependencies.

### 5.0.0 (2025-04-10)
* (Garfonso) Updated frontend to 20250401.0
* (Garfonso) Updated browser_mod to 2.3.3
* (Garfonso) Add statistics recorder
* (Garfonso) Add entity registry, use it to solve id clashes. In the future, store entity settings here.
* (Garfonso) Limit the number of stored browser instances
* (Garfonso) Improved caching behavior. Might solve iobroker.pro issue... hopefully?
* (Garfonso) Prevent crash with some edge cases with light entities
* (Garfonso) experimental dashboard support.
* (Garfonso) Allow to show sidebar via object in instances. VERY experimental. A lot of stuff does not yet work. But allows to configure dashboards and also browser mod.

## License

Copyright 2019-2025, bluefox <dogafox@gmail.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.