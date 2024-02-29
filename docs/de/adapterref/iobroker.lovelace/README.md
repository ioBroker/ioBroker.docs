---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.lovelace/README.md
title: ioBroker.lovelace
hash: jauHsiL93iAoVR1jApfIbb+5knn1hL0iz07N5kwQSxY=
---
![Logo](../../../en/adapterref/iobroker.lovelace/admin/lovelace.png)

![Anzahl der Installationen](http://iobroker.live/badges/lovelace-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.lovelace.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.lovelace.svg)

# IoBroker.lovelace
![Test und Freigabe](https://github.com/ioBroker/iobroker.lovelace/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/lovelace/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

## Lovelace-Adapter für ioBroker
Mit diesem Adapter können Sie eine Visualisierung für ioBroker mit der Home Assistant Lovelace-Benutzeroberfläche erstellen.

[Deutsche Dokumentation](docs/de/README.md)

## Instanzobjekte
In den Ordnerinstanzen gibt es einige Objekte, die zur Steuerung der Benutzeroberfläche verwendet werden können. Für jeden Browser wird ein neuer Unterordner mit einer zufälligen ID erstellt. Diese ID wird im Webspeicher des Client-Browsers gespeichert. Wenn Sie den Webspeicher löschen, wird eine neue Instanz erstellt. Wenn Sie den Fully Kiosk Browser verwenden, stellen Sie sicher, dass die Funktion `Delete webstorage on reload` **deaktiviert** ist.

Diese Funktionalität verwendet browser_mod, der vom Adapter installiert und aktualisiert wird. Fügen Sie nicht Ihre eigene Version von browser_mod als benutzerdefinierte Karte hinzu.

## Aufbau
Es gibt zwei Möglichkeiten, wie die Entitäten konfiguriert werden können:

- automatisch
- Handbuch

### Automatisch
Im Auto-Modus wird der ähnliche Vorgang wie für `google home` oder `material adapter` angewendet.

***Es werden nur Objekte und Kanäle erkannt, für die die Kategorien `function` und `room` definiert sind***

Sie können benutzerfreundliche Namen definieren, die in Entitäten verwendet werden.

### Handbuch
Die Objekte können manuell in einem Objektbaum wie SQL oder Historie definiert werden. Der Typ der Entität muss angegeben werden und optional der Name des Objekts.
Mit dieser Methode können nur einfache Entitäten wie input_number, input_text oder input_boolean erstellt werden. Es darf nicht mehr als einen Status oder ein Attribut haben.

## Panels
### Alarmtafel
ioBroker unterstützt ein solches Gerät noch nicht, es kann aber simuliert werden. Wenn Sie ein solches Skript erstellen:

```
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
Dies kann manuell erfolgen, wenn der Entitätstyp „input_number“ im benutzerdefinierten Dialogfeld ausgewählt ist.
Für diesen Typ sind die Werte `min` und `max` in `common` erforderlich und optional können `step` hinzugefügt werden.
Wenn Sie die Aufwärts- und Abwärtspfeile sehen möchten, sollten Sie in benutzerdefinierten `mode` auf „Nummer“ setzen:

```
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
Dies kann manuell erfolgen, wenn der Entitätstyp `input_select` im benutzerdefinierten Dialog ausgewählt ist.
Die Liste der Optionen zur Auswahl sollte in einem Standardobjekt `common.states` bereitgestellt werden:

```
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

Mit anderen Worten, es sollte auch eine ausgewählte Eingabe in IoB geben.

### Timer
Der Timer könnte durch das folgende Skript simuliert werden:

```
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
Getestet mit `yr` und `daswetter`. Für eines oder mehrere der folgenden Objekte müssen `Function=Weather` und `Room=Any` festgelegt sein, damit sie in der Konfiguration verfügbar sind:

- `daswetter.0.NextDays.Location_1`
- `yr.0.forecast`

Getestet mit `AccuWeather` Treiber v1.1.0 https://github.com/iobroker-community-adapters/ioBroker.accuweather.
Benutzerdefinierte Lovelace-Karte zur Unterstützung der Accuweather-Vorhersage – https://github.com/algar42/IoB.lovelace.accuweather-card

### Einkaufsliste
Einkaufsliste schreibt die Werte in der Form:

```
[
   {"summary": "Task 1", "uid": "1234222", "status": "needs_action"},
   {"summary": "Task 2", "uid": "1234223", "status": "completed"}
]
```

in den `lovelace.X.control.shopping_list`-Zustand.

Sie können auch Ihre eigenen Aufgaben- oder Einkaufslisten hinzufügen, indem Sie manuelle Entitäten mit dem Typ `todo` erstellen.

### Karte
Die Objekte müssen wie folgt aussehen:

```
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

```
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

### Bildobjekt
Sie können dafür ein statisches Bild verwenden oder einen beliebigen Staat verwenden, der eine URL als Staat liefert.
Z.B.:

```
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

Oder setzen Sie den Entitätstyp einfach manuell auf `camera` und schreiben Sie die URL hinein.

### Abschlag
Sie können Bindungen im Markdown wie in [iobroker.vis](https://github.com/ioBroker/ioBroker.vis#bindings-of-objects) verwenden.

Beispielsweise erzeugt Text `Admin adapter is {a:system.adapter.admin.0.alive;a === true || a === 'true' ? ' ' : 'not '} *alive*.` den Text `Admin adapter is alive` in einem Markdown-Panel.

## Benutzerdefinierte Karten
### Hochladen benutzerdefinierter Karten
Um die benutzerdefinierte Karte hochzuladen, schreiben Sie Folgendes:

```iobroker file write PATH_TO_FILE\bignumber-card.js /lovelace.0/cards/```

Nach dem Neustart des Lovelace-Adapters werden alle Dateien aus dem Verzeichnis `cards` automatisch eingebunden.

Folgende Custom-Karten konnten erfolgreich getestet werden:

- „bignumber-card“: https://github.com/custom-cards/bignumber-card/blob/master/bignumber-card.js
- „simple-thermostat“: https://github.com/nervetattoo/simple-thermostat/releases (nehmen Sie die neueste Version)
- „Thermostat“: https://github.com/ciotlosm/custom-lovelace/tree/master/thermostat-card (beide Dateien .js und .lib.js sind erforderlich)

Ich habe diesen Link https://github.com/jimz011/homeassistant als interessante Ressource für benutzerdefinierte Karten gefunden.

Oft sind die benutzerdefinierten Karten auf GitHub als Quellen gespeichert und müssen vor der Verwendung kompiliert werden.
Sie sollten das Menü `Releases` auf GitHub überprüfen und versuchen, dort kompilierte Dateien zu finden.
Wie dieser: [https://github.com/kalkih/mini-graph-card/releases](https://github.com/kalkih/mini-graph-card/releases) (Suchen Sie nach der Datei `mini-graph-card-bundle.js`)

## Eigene Bilder
Die benutzerdefinierten Bilder (z. B. für einen Hintergrund) können über denselben Konfigurationsdialog geladen werden wie die benutzerdefinierten Karten. Und verwenden Sie es so:

`background: center / cover no-repeat url("/cards/background.jpg") fixed`

oder

`background: center / cover no-repeat url("/local/custom_ui/background.jpg") fixed`

in der Lovelace-Konfigurationsdatei. Lesen Sie mehr über die Hintergründe in lovelace [Hier](https://www.home-assistant.io/lovelace/views/#background).

## Themen
Die Themes können im Konfigurationsdialog von ioBroker definiert werden.
Fügen Sie etwas ein wie:

```
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
Verwenden Sie Symbole in der Form `mdi:NAME`, wie `mdi:play-network`. Namen können hier entnommen werden: https://materialdesignicons.com/

## Benachrichtigungen
Sie können Benachrichtigungen über die `sendTo`-Funktionalität hinzufügen oder indem Sie den Status in `lovelace.X.notifications.add` schreiben:

```
sendTo('lovelace.0', 'send', {message: 'Message text', title: 'Title'}); // full version
sendTo('lovelace.0', 'send', 'Message text'); // short version
```

oder

```
setState('lovelace.0.notifications.add', '{"message": "Message text", "title": "Title"}'); // full version
setState('lovelace.0.notifications.add', 'Message text'); // short version
```

## Stimmenkontrolle
Alle Befehle vom Webinterface werden mit `ack=false` in den Status lovelace.X.conversation geschrieben.
Sie können ein Skript schreiben, das auf Anfrage reagiert und antwortet:

```
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
Wenn Sie den YAML-Code durcheinander gebracht haben und eine leere Seite sehen, aber immer noch das obere Menü haben, können Sie den Bearbeitungsmodus (falls nicht bereits aktiviert) über das Menü aktivieren und dann das Menü erneut öffnen, um auf den „RAW Yaml Editor“ zuzugreifen, in dem Sie sich befinden Sehen Sie sich den vollständigen YAML-Code an und können Sie ihn bereinigen.
Wenn das nicht hilft, können Sie das Objekt `lovelace.*.configuration` im Raw-Editor in ioBroker öffnen und dort nachschauen.
Sie können dieses Objekt auch aus einer Sicherung wiederherstellen. Es enthält die komplette Konfiguration Ihrer Visualisierung.

## Originalquellen für Lovelace
Verwendete Quellen finden Sie hier https://github.com/GermanBluefox/home-assistant-polymer .

## Machen
Die Sicherheit muss vom aktuellen Benutzer und nicht vom Standardbenutzer übernommen werden

## Entwicklung
### Ausführung
Verwendete Version von home-assistant-frontend@20231208.2 Version von Browser Mod: 2.3.0

### So erstellen Sie die neue Lovelace-Version
Zunächst muss das eigentliche https://github.com/home-assistant/frontend (Dev-Zweig) **manuell** in https://github.com/GermanBluefox/home-assistant-polymer.git zusammengeführt werden ( ***iob*** Zweig!).

Alle Änderungen für ioBroker sind mit dem Kommentar `// IoB` gekennzeichnet.
Derzeit (20231208.2) wurden folgende Dateien geändert:

- „build-scripts/gulp/app.js“ – Neue Gulp-Aufgabe „develop-iob“ hinzufügen
- „build-scripts/gulp/webpack.js“ – Neue Gulp-Aufgabe „Webpack-Dev-App“ hinzufügen
- `src/data/weather.ts` – Unterstützung für die Anzeige des Wettersymbols über die URL hinzufügen.
- `src/dialogs/more-info/const.ts` – Wetterstatus und -verlauf entfernen
- `src/dialogs/more-info/ha-more-info-dialog.ts` – Schaltfläche und Registerkarte für Entitätseinstellungen entfernen
- `src/dialogs/more-info/ha-more-info-history.ts` – Link „Mehr anzeigen“ im Verlauf entfernen
- `src/dialogs/more-info/controls/more-info-weather.ts` – Unterstützung für die Anzeige des Wettersymbols über die URL hinzufügen.
- `src/dialogs/voice-command-dialog/ha-voice-command-dialog.ts` – Konfiguration von Sprachassistenten deaktivieren
- `src/entrypoints/core.ts` – geänderter Authentifizierungsprozess
- `src/panels/lovelace/cards/hui-weather-forecast-card.ts` – Unterstützung für die Anzeige des Wettersymbols aus der URL hinzufügen.
- `src/panels/lovelace/entity-rows/hui-weather-entity-row.ts` – Unterstützung für die Anzeige des Wettersymbols von der URL mit Authentifizierung hinzufügen.
- `src/panels/lovelace/hui-root.ts` – Benachrichtigungen und Sprachsteuerung hinzugefügt
- `src/util/documentation-url.ts` – für Link zur iobroker-Hilfe anstelle von Home Assistant.
- „.gitignore“ – „.idea“ hinzufügen, ignorieren
- „.husky/pre-commit“ – Git-Commit-Hooks entfernen.
- „package.json“ – Husky-Commit-Hook entfernen

Danach die geänderte Version im Ordner `./build` auschecken. Dann.

1. Gehen Sie zum Verzeichnis ./build.
2. `git clone https://github.com/GermanBluefox/home-assistant-polymer.git` ist ein Fork von https://github.com/home-assistant/frontend.git, aber einige Dinge wurden geändert ( siehe Dateiliste weiter oben).
3. „cd home-assistant-polymer“.
4. „git checkout master“.
5. „Garn installieren“.
6. „gulp build-app“ für die Veröffentlichung oder „gulp Develop-iob“ für die Debug-Version. Um das Web nach Änderungen zu erstellen, können Sie „webpack-dev-app“ aufrufen, um die Erstellung zu beschleunigen. Sie müssen jedoch „build-app“ trotzdem aufrufen, nachdem die Version einsatzbereit ist.
7. Kopieren Sie alle Dateien von „./build/home-assistant-polymer/hass_frontend“ nach „./hass_frontend“ in diesem Repo
8. Führen Sie die Aufgabe „gulp rename“ mehrmals aus (bis keine Änderungen auftreten).
9. Aktualisieren Sie die Version in „README.md“ und auch in „server.js“ die Konstante „VERSION“.

## Changelog

<!--
	PLACEHOLDER for the next version:
	### **WORK IN PROGRESS**
-->
### 4.1.4 (2024-02-10)
* (Garfonso) improved fix: lamp icons now turn gray on switch off.

### 4.1.3 (2024-02-10)
* (Garfonso) prevent warning for browser_mod/recall_id service call
* (Garfonso) fix: lamp icons now turn gray on switch off.
* (Garfonso) fix: notifications via sendTo work again.

### 4.1.2 (2024-01-09)
* (Garfonso) fix: time in timestamp display

### 4.1.1 (2024-01-02)
* (Garfonso) changed: determining user id
* (Garfosno) changed: history attributes handling
* (Garfonso) added: handle browser_mod/recall_id service call.
* (Garfonso) changed: all states are strings (fixes #483)

### 4.1.0 (2023-12-18)
* (Garfons) add an option to show users on login screen (off by default)

## License

Copyright 2019-2024, bluefox <dogafox@gmail.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.