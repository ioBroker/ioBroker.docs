---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.lovelace/README.md
title: ioBroker.lovelace
hash: 9eNN5XG2Hc1qnapPKKoFNt8cDNC4UlPz7A/DJ7N8NBQ=
---
![Logo](../../../en/adapterref/iobroker.lovelace/admin/lovelace.png)

![Anzahl der Installationen](http://iobroker.live/badges/lovelace-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.lovelace.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.lovelace.svg)

# IoBroker.lovelace
![Testen und Freigeben](https://github.com/ioBroker/iobroker.lovelace/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/lovelace/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

## Lovelace-Adapter für ioBroker
Mit diesem Adapter können Sie eine Visualisierung für ioBroker mit der Home Assistant Lovelace-Benutzeroberfläche erstellen.

[Deutsche Dokumentation](docs/de/README.md)

## Instanzobjekte
In den Ordnerinstanzen befinden sich Objekte, die zur Steuerung der Benutzeroberfläche verwendet werden können. Für jeden Browser wird ein neuer Unterordner mit einer zufälligen ID erstellt. Diese ID wird im Webspeicher des Client-Browsers gespeichert. Wenn Sie den Webspeicher löschen, wird eine neue Instanz erstellt. Wenn Sie den Fully Kiosk Browser verwenden, stellen Sie sicher, dass die Funktion `Delete webstorage on reload` **deaktiviert** ist.

Diese Funktion verwendet browser_mod, das vom Adapter installiert und aktualisiert wird. Fügen Sie keine eigene Version von browser_mod als benutzerdefinierte Karte hinzu.

## Konfiguration
Es gibt zwei Möglichkeiten, wie die Entitäten konfiguriert werden können:

- Auto
- Handbuch

### Auto
Im Auto-Modus wird der gleiche Vorgang wie für `google home` oder `material adapter` angewendet.

***Es werden nur Objekte und Kanäle erkannt, für die die Kategorien `function` und `room` definiert sind.***

Sie können Anzeigenamen definieren, die in Entitäten verwendet werden.

### Handbuch
Die Objekte können manuell in einem Objektbaum wie `sql` oder `history` definiert werden. Der Entitätstyp muss angegeben werden, optional der Name des Objekts.
Mit dieser Methode können nur einfache Entitäten wie input_number, input_text oder input_boolean erstellt werden. Es dürfen nicht mehr als ein Status oder Attribut vorhanden sein.

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

oder Sie verwenden dafür einfach `lovelace.X.control.alarm (entity_id = alarm_control_panel.defaultAlarm)`.

### Zahleneingabe
Dies kann manuell erfolgen, wenn im benutzerdefinierten Dialogfeld der Entitätstyp „input_number“ ausgewählt ist.
Dieser Typ erfordert die Werte `min` und `max` in `common`. Optional kann `step` hinzugefügt werden.
Wenn Sie die Auf- und Abwärtspfeile sehen möchten, sollten Sie im benutzerdefinierten `mode` „Nummer“ festlegen:

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

### Eingang auswählen
Dies kann manuell erfolgen, wenn der Entitätstyp `input_select` im benutzerdefinierten Dialogfeld ausgewählt ist.
Die Liste der zur Auswahl stehenden Optionen sollte in einem Standardobjekt `common.states` bereitgestellt werden:

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

mit anderen Worten, es sollte auch eine Auswahleingabe in IoB geben.

### Zeitgeber
Der Timer kann durch das folgende Skript simuliert werden:

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
Getestet mit `yr` und `daswetter`. Für eines oder mehrere der folgenden Objekte müssen `Function=Weather` und `Room=Any` gesetzt sein, damit sie in der Konfiguration verfügbar sind:

- `daswetter.0.NextDays.Location_1`
- `yr.0.forecast`

Getestet mit `AccuWeather` Treiber v1.1.0 https://github.com/iobroker-community-adapters/ioBroker.accuweather.
Benutzerdefinierte Lovelace-Karte zur Unterstützung der Accuweather-Vorhersage erstellt - https://github.com/algar42/IoB.lovelace.accuweather-card

### Einkaufsliste
Einkaufsliste schreibt die Werte in Form:

```json
[
   {"summary": "Task 1", "uid": "1234222", "status": "needs_action"},
   {"summary": "Task 2", "uid": "1234223", "status": "completed"}
]
```

in den Zustand `lovelace.X.control.shopping_list`.

Sie können auch Ihre eigenen Aufgaben- oder Einkaufslisten hinzufügen, indem Sie manuelle Entitäten mit dem Typ `todo` erstellen.

### Karte
Die Objekte müssen wie dieses aussehen:

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
Sie können dafür ein statisches Bild verwenden oder einen beliebigen Status, der eine URL als Status liefert.
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

oder setzen Sie den Entitätstyp einfach manuell auf `camera` und schreiben Sie die URL hinein.

### Markdown
Sie können Bindungen in Markdown wie in [iobroker.vis](https://github.com/ioBroker/ioBroker.vis#bindings-of-objects) verwenden.

Beispielsweise erzeugt der Text `Admin adapter is {a:system.adapter.admin.0.alive;a === true || a === 'true' ? ' ' : 'not '} *alive*.` den Text `Admin adapter is alive` in einem Markdown-Panel.

## Benutzerdefinierte Karten
### Hochladen von benutzerdefinierten Karten
Um die benutzerdefinierte Karte hochzuladen, schreiben Sie Folgendes:

```iobroker file write PATH_TO_FILE\bignumber-card.js /lovelace.0/cards/```

Nach dem Neustart des Lovelace-Adapters werden alle Dateien aus dem Verzeichnis `cards` automatisch eingeschlossen.

Folgende Custom-Karten konnten erfolgreich getestet werden:

- `bignumber-card`: https://github.com/custom-cards/bignumber-card/blob/master/bignumber-card.js
- `simple-thermostat`: https://github.com/nervetattoo/simple-thermostat/releases (nehmen Sie die neueste Version)
- `thermostat`: https://github.com/ciotlosm/custom-lovelace/tree/master/thermostat-card (beide Dateien .js und .lib.js werden benötigt)

Ich habe diesen Link https://github.com/jimz011/homeassistant als interessante Ressource für benutzerdefinierte Karten gefunden.

Oftmals werden die benutzerdefinierten Karten als Quellen auf GitHub gespeichert und müssen vor der Verwendung kompiliert werden.
Sie sollten das Menü `Releases` auf GitHub überprüfen und versuchen, dort kompilierte Dateien zu finden.
Wie diese: [https://github.com/kalkih/mini-graph-card/releases](https://github.com/kalkih/mini-graph-card/releases) (Suchen Sie nach der Datei `mini-graph-card-bundle.js`)

## Eigene Bilder
Die benutzerdefinierten Bilder (z. B. für einen Hintergrund) können über denselben Konfigurationsdialog wie die benutzerdefinierten Karten geladen werden. Und so funktioniert es:

`background: center / cover no-repeat url("/cards/background.jpg") fixed`

oder

`background: center / cover no-repeat url("/local/custom_ui/background.jpg") fixed`

in der Lovelace-Konfigurationsdatei. Lesen Sie mehr über den Hintergrund in Lovelace [Hier](https://www.home-assistant.io/lovelace/views/#background).

## Themen
Die Themen können im Konfigurationsdialog von ioBroker definiert werden.
Fügen Sie etwas wie Folgendes ein:

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
Verwenden Sie Symbole in der Form `mdi:NAME`, z. B. `mdi:play-network`. Die Namen können hier entnommen werden: https://materialdesignicons.com/

## Benachrichtigungen
Sie können Benachrichtigungen über die Funktion `sendTo` hinzufügen oder indem Sie den Status in `lovelace.X.notifications.add` schreiben:

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
Alle Befehle aus der Weboberfläche werden mit `ack=false` in den Status lovelace.X.conversation geschrieben.
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
Wenn Sie den YAML-Code durcheinandergebracht haben und eine leere Seite sehen, das Hauptmenü aber weiterhin angezeigt wird, können Sie den Bearbeitungsmodus (falls nicht bereits aktiviert) über das Menü aktivieren und anschließend das Menü erneut öffnen, um auf den „RAW Yaml Editor“ zuzugreifen. Dort sehen Sie den vollständigen YAML-Code und können ihn bereinigen.

Wenn das nicht hilft, können Sie das Objekt `lovelace.*.configuration` im Raw-Editor in ioBroker öffnen und dort nachsehen.

Sie können dieses Objekt auch aus einer Sicherung wiederherstellen. Es enthält die vollständige Konfiguration Ihrer Visualisierung.

## Originalquellen für Lovelace
Verwendete Quellen finden Sie hier https://github.com/GermanBluefox/home-assistant-polymer .

## Aufgaben
Die Sicherheit muss vom aktuellen Benutzer übernommen werden und nicht vom Standardbenutzer.

## Entwicklung
### Version
Verwendete Version von home-assistant-frontend@20250306.0 Version des Browser-Mods: 2.3.3

### So erstellen Sie die neue Lovelace-Version
Zunächst muss das eigentliche https://github.com/home-assistant/frontend (Entwicklungszweig) **manuell** in https://github.com/GermanBluefox/home-assistant-polymer.git (***iob***-Zweig!) integriert werden.

Alle Änderungen für ioBroker sind mit dem Kommentar `// IoB` gekennzeichnet.
Vorläufig (20250401.0) wurden folgende Dateien geändert:

- `build-scripts/gulp/app.js` - Neue Gulp-Aufgabe „develop-iob“ hinzufügen
- `build-scripts/gulp/rspack.js` - Neue Gulp-Aufgabe rspack-dev-app hinzufügen
- `src/data/icons.ts` – alte Symbole vorerst behalten.
- `src/data/weather.ts` – Unterstützung für die Anzeige des Wettersymbols aus der URL hinzufügen.
- `src/dialogs/more-info/const.ts` – Wetterstatus und -verlauf entfernen
- `src/dialogs/more-info/ha-more-info-dialog.ts` - Schaltfläche und Registerkarte „Entitätseinstellungen entfernen“
- `src/dialogs/more-info/ha-more-info-history.ts` – Link „Mehr anzeigen“ im Verlauf entfernen
- `src/dialogs/more-info/ha-more-info-logbook.ts` - Link „Mehr anzeigen“ im Logbuch entfernen
- `src/dialogs/more-info/controls/more-info-weather.ts` – Unterstützung für die Anzeige des Wettersymbols aus der URL hinzufügen.
- `src/dialogs/voice-command-dialog/ha-voice-command-dialog.ts` – Konfiguration von Sprachassistenten deaktivieren
- `src/entrypoints/core.ts` – keine Authentifizierungsoption hinzufügen
- `src/panels/lovelace/cards/hui-weather-forecast-card.ts` – Unterstützung für die Anzeige des Wettersymbols aus der URL hinzufügen.
- `src/panels/lovelace/entity-rows/hui-weather-entity-row.ts` – Unterstützung für die Anzeige von Wettersymbolen von URLs mit Authentifizierung hinzufügen.
- `src/panels/lovelace/hui-root.ts` – Benachrichtigungsschaltfläche hinzugefügt, Link zum Verwalten von Dashboards deaktiviert
- `src/util/documentation-url.ts` – für den Link zur Iobroker-Hilfe anstelle des Home Assistant.
- `.husky/pre-commit` – Git-Commit-Hooks entfernen.

Checken Sie anschließend die geänderte Version im Ordner `./build` aus. Dann.

1. Gehen Sie zum Verzeichnis ./build.
2. `git clone https://github.com/GermanBluefox/home-assistant-polymer.git` ist ein Fork von https://github.com/home-assistant/frontend.git, aber einige Dinge wurden geändert (siehe die Dateiliste weiter oben).
3. `cd home-assistant-polymer`
4. `git checkout master`
5. `Garn installieren`
6. `gulp build-app` für die Veröffentlichung oder `gulp develop-iob` für die Debug-Version. Um das Web nach Änderungen zu erstellen, können Sie `webpack-dev-app` für einen schnelleren Build aufrufen. Sie müssen jedoch trotzdem `build-app` aufrufen, nachdem die Version einsatzbereit ist.
7. Führen Sie das Skript „hass_frontend/static_cards/newFrontend.sh“ im Adapter-Repo aus, um das Frontend zu aktualisieren (es wird davon ausgegangen, dass sich die beiden Repositories nebeneinander im selben Ordner befinden. Wenn nicht, passen Sie das Skript bitte an, vorzugsweise mit etwas Parameterbehandlung, und erstellen Sie einen PR, danke :smile:)
8. Führen Sie die Aufgabe „gulp rename“ aus.
9. Aktualisieren Sie die Version in „README.md“

## Changelog

<!--
	PLACEHOLDER for the next version:
	### **WORK IN PROGRESS**
-->
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

### 4.1.15 (2025-03-10)
* (Garfonso) repaired image loading, again.

### 4.1.14 (2025-03-10)
* (Garfonso) repaired image loading. Fixes #577

### 4.1.13 (2025-03-06)
* (Garfonso) reworked image sending. Now weather icons work for normal users, too. Also, weather images are transferred from our server, so no access to admin is needed anymore.

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