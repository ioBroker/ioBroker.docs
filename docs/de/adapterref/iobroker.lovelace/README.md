---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.lovelace/README.md
title: ioBroker.lovelace
hash: Vsarg6AJFBh+tqIfiMJeA5EbUjdOYQHNNYLyi3W0cW8=
---
![Logo](../../../en/adapterref/iobroker.lovelace/admin/lovelace.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.lovelace.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.lovelace.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/ioBroker/iobroker.lovelace.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/ioBroker/ioBroker.lovelace/badge.svg)
![NPM](https://nodei.co/npm/iobroker.lovelace.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/ioBroker/ioBroker.lovelace/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/ioBroker/ioBroker.lovelace?branch=master&svg=true)

#ioBroker.lovelace
## Lovelace-Adapter für ioBroker
Mit diesem Adapter können Sie eine Visualisierung für ioBroker mit Home Assistant Lovelace UI erstellen.

[Deutsche Dokumentation](docs/de/README.md)

## Aufbau
Es gibt zwei Möglichkeiten, wie die Entitäten konfiguriert werden können:

- automatisch
- Handbuch

###Auto
Im Auto-Modus wird das ähnliche Verfahren wie bei `google home` oder `material adapter` angewendet.

***Es werden nur Objekte und Kanäle erkannt, für die die Kategorien `function`und `room` definiert sind***

Sie können Anzeigenamen definieren, die in Entitäten verwendet werden.

### Handbuch
Die Objekte können manuell im Objektbaum wie sql oder histroy definiert werden. Der Typ der Entität muss angegeben werden und optional der Name des Objekts.
Mit dieser Methode können nur einfache Entitäten wie input_number, input_text oder input_boolean erstellt werden. Es darf nicht mehr als einen Zustand oder ein Attribut haben.

## Panels
### Alarmzentrale
ioBroker unterstützt ein solches Gerät noch nicht, aber es kann simuliert werden. Wenn Sie ein solches Skript erstellen:

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

oder Sie verwenden einfach `lovelace.X.control.alarm (entity_id = alarm_control_panel.defaultAlarm)` dafür.

### Zahleneingabe
Dies kann manuell erfolgen, wenn der Entitätstyp input_number im benutzerdefinierten Dialogfeld ausgewählt ist.
Für diesen Typ können erforderliche `min` und `max` Werte in `common` und optional `step` hinzugefügt werden.
Wenn Sie die Aufwärts- und Abwärtspfeile sehen möchten, sollten Sie in den benutzerdefinierten `mode` auf 'Nummer' setzen:

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
Dies kann manuell erfolgen, wenn der Entitätstyp input_select im benutzerdefinierten Dialogfeld ausgewählt ist.
Die Liste der zur Auswahl stehenden Optionen sollte im Standardobjekt commom.states bereitgestellt werden:

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

mit anderen Worten, in sollte auch die Eingabeauswahl in IoB sein.

### Timer
Timer könnte durch folgendes Skript simuliert werden:

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

###Wetter
Getestet mit yr und daswetter. Bei einem oder mehreren der folgenden Objekte müssen `Function=Weather` und `Room=Any` in der Konfiguration verfügbar sein:

- daswetter.0.NextDays.Location_1
- Jahr.0.Vorhersage

Getestet mit AccuWeather-Treiber v1.1.0 https://github.com/iobroker-community-adapters/ioBroker.accuweather.
Benutzerdefinierte Lovelace-Karte zur Unterstützung der Accuweather-Vorhersage - https://github.com/algar42/IoB.lovelace.accuweather-card

### Einkaufsliste
Einkaufsliste schreibt die Werte in Form:

```
[
   {name: 'Task 1', id: 1234222, complete: false},
   {name: 'Task 2', id: 1234223, complete: true}
]
```

in den `lovelace.X.control.shopping_list` Zustand.

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

###Bildentität
Sie können dafür ein statisches Bild verwenden oder einen beliebigen Zustand verwenden, der eine URL als Zustand liefert.
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

oder einfach manuell den Entitätstyp auf `camera` setzen und URL hineinschreiben.

### Werkzeugleiste verstecken
Um die Symbolleiste auszublenden, können Sie das Kontrollkästchen im ioBroker-Konfigurationsdialog auf der Registerkarte Themen aktivieren.
Um es anzuzeigen, können Sie es im Dialog wieder deaktivieren oder einfach die URL mit `?toolbar=true` Parameter aufrufen.

### Abschlag
Sie können Bindungen im Markdown wie in [iobroker.vis](https://github.com/ioBroker/ioBroker.vis#bindings-of-objects) verwenden.

Z.B. Text `Admin adapter is {a:system.adapter.admin.0.alive;a === true || a === 'true' ? ' ' : 'not '} *alive*.` erzeugt Text `Admin adapter is alive` im Markdown-Panel.

## Benutzerdefinierte Karten
###Hochladen von benutzerdefinierten Karten
Um die benutzerdefinierte Karte hochzuladen, schreiben Sie Folgendes:

```iobroker file write PATH_TO_FILE\bignumber-card.js /lovelace.0/cards/```

Nach dem Neustart des Lovelace-Adapters werden automatisch alle Dateien aus dem `cards` Verzeichnis übernommen.

Folgende benutzerdefinierte Karten konnten erfolgreich getestet werden:

- bignumber-card: https://github.com/custom-cards/bignumber-card/blob/master/bignumber-card.js
- simple-thermostat: https://github.com/nervetattoo/simple-thermostat/releases (nehmen Sie die neueste Version)
- Thermostat: https://github.com/ciotlosm/custom-lovelace/tree/master/thermostat-card (beide Dateien .js und .lib.js werden benötigt)

Ich habe diesen Link https://github.com/jimz011/homeassistant als interessante Ressource für benutzerdefinierte Karten gefunden.

Oft werden die benutzerdefinierten Karten als Quellen auf github gespeichert und müssen vor der Verwendung kompiliert werden.
Sie sollten das `Releases`-Menü auf github überprüfen und versuchen, dort kompilierte Dateien zu finden.
Wie diese hier: [https://github.com/kalkih/mini-graph-card/releases](https://github.com/kalkih/mini-graph-card/releases) (Suche nach der Datei `mini-graph-card-bundle.js`)

## Eigene Bilder
Die benutzerdefinierten Bilder (z. B. für den Hintergrund) könnten über den gleichen Konfigurationsdialog wie die benutzerdefinierten Karten geladen werden. Und benutze es so:

`background: center / cover no-repeat url("/cards/background.jpg") fixed`

oder

`background: center / cover no-repeat url("/local/custom_ui/background.jpg") fixed`

in der Lovelace-Konfigurationsdatei. Lesen Sie mehr über Hintergrund in Lovelace [Hier](https://www.home-assistant.io/lovelace/views/#background).

##Themen
Die Themen können im Konfigurationsdialog von ioBroker definiert werden.
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

##Symbole
Verwenden Sie Symbole in der Form `mdi:NAME`, wie 'mdi:play-network'. Namen können hier entnommen werden: https://materialdesignicons.com/

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
Alle Befehle vom Webinterface werden in den lovelace.X.conversation State mit `ack=false` geschrieben.
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
Wenn Sie den YAML-Code durcheinander gebracht haben und eine leere Seite sehen, aber immer noch das obere Menü haben, können Sie den Bearbeitungsmodus (falls nicht bereits aktiviert) über das Menü aktivieren und dann das Menü erneut öffnen, um auf den "RAW Yaml Editor" zuzugreifen, in dem Sie Sehen Sie sich den vollständigen YAML-Code an und können Sie ihn bereinigen.
Wenn das nicht hilft, können Sie das Objekt lovelace.*.configuration im Raw-Editor in ioBroker öffnen und dort nachsehen.
Sie können dieses Objekt auch aus einer Sicherung wiederherstellen. Es enthält die komplette Konfiguration Ihrer Visualisierung.

##Originalquellen für Lovelace
Verwendete Quellen sind hier https://github.com/GermanBluefox/home-assistant-polymer .

## Machen
Die Sicherheit muss vom aktuellen Benutzer übernommen werden und nicht von default_user

## Entwicklung
### Ausführung
Verwendete Version von home-assistant-frontend@20201021.4

### So erstellen Sie die neue Lovelace-Version
Zunächst muss das eigentliche https://github.com/home-assistant/frontend (dev branch) **manuell** in https://github.com/GermanBluefox/home-assistant-polymer.git (* **iob***-Zweig!).

Alle Änderungen für ioBroker sind mit dem Kommentar `// IoB` gekennzeichnet.
Für den Moment (20201021.4) wurden folgende Dateien geändert:

- `build-scripts/gulp/app.js` - Neue gulp-Aufgabe hinzufügen
- `build-scripts/gulp/webpack.js` - Neue gulp-Aufgabe hinzufügen
- `src/data/lovelace.ts` - Option zum Ausblenden der Symbolleiste hinzufügen
- `src/data/weather.ts` - Unterstützung für die Anzeige des Wettersymbols von der URL hinzufügen.
- `src/dialogs/more-info/ha-more-info-dialog.ts` - Schaltfläche für Entitätseinstellungen entfernen und Wetterstatus und -verlauf entfernen
- `src/dialogs/more-info/controls/more-info-climate.ts` - Druckmodusname für nicht unterstützte Modi
- `src/dialogs/more-info/controls/more-info-weather.ts` - Unterstützung für die Anzeige des Wettersymbols von der URL hinzufügen.
- `src/entrypoints/core.ts` - geänderter Authentifizierungsprozess
- `src/layouts/home-assistant-main.ts` - App-Sidebar entfernen
- `src/panels/lovelace/cards/hui-weather-forecast-card.ts` - Unterstützung für die Anzeige des Wettersymbols von der URL hinzufügen.
- `src/panels/lovelace/entity-rows/hui-weather-entity-row.ts` - Unterstützung für die Anzeige des Wettersymbols von der URL mit auth.
- `src/panels/lovelace/hui-root.ts` - Benachrichtigungen und Sprachsteuerung hinzugefügt
- `src/util/documentation-url.ts` - für einen Link zur iobroker-Hilfe anstelle von Homeassistant.
- `.gitignore` - `.idea` hinzufügen ignorieren
- `package.json` - Husky-Commit-Hook entfernen

Danach die geänderte Version im `./build` Ordner auschecken. Dann.

1. Gehen Sie zum Verzeichnis ./build.
2. `git clone https://github.com/GermanBluefox/home-assistant-polymer.git` Es ist ein Fork von https://github.com/home-assistant/frontend.git, aber einige Dinge wurden geändert ( siehe Dateiliste weiter oben).
3. `cd heimassistent-polymer`
4. `git checkout master`
5. `npm installieren`
6. `gulp build-app` für die Veröffentlichung oder `gulp developer-iob` für die Debugging-Version. Um das Web nach Änderungen zu erstellen, können Sie `webpack-dev-app` für einen schnelleren Build aufrufen, aber Sie müssen `build-app` trotzdem aufrufen, nachdem die Version einsatzbereit ist.
7. kopiere alle Dateien von `./build/home-assistant-polymer/hass_frontend` nach `./hass_frontend` in diesem Repo
8. Starten Sie die Aufgabe `gulp rename`.

## Changelog

<!--
	PLACEHOLDER for next version:
	### **WORK IN PROGRESS**
-->
### 2.0.0 (2021-06-17)
* (Garfonso) Changed: !Breaking! Battery warning is now binary_sensor instead of sensor (now ui sets icon and  translates ok)
* (Garfonso) Fixed:   !Breaking! entity_id conflict for low_bat / humidity when part of another device
* (Garfonso) Updated frontend to 20210603.0 (changed light entity to not convert color anymore)
* (Garfonso) Changed: increased file size limit to 5 MB during upload in config.
* (Garfonso) Added: Support for input_datetime
* (Garfonso) Added: Support for manual complex light entities
* (Garfonso) Added: Support for images from base64 data in iobroker states 
* (Garfonso) Added: Support for additional alarm states.
* (Garfonso) Added: Parameter to only enter code when disarming alarm
* (Garfonso) Added: Support for admin 5 (jsonCustom)
* (Garfonso) Added: Support for airCondition / rework thermostat
* (Garfonso) Added: manual entities can be more complex now (needs documentation)
* (Garfonso) Added: darkMode control

### 1.5.0 (2021-02-15)
* (Garfonso) Changed: defaultTheme and control.theme were in conflict. Now control.theme is set when selecting a new default theme.
* (Garfonso) Added: control.themeDark to control devices in dark mode, too.
* (Garfonso) Fixed: Device Icons with authentication now work
* (Garfonso) Changed: previously only admin user could change the UI. Now also the owner of the configuration object and members of the owner group are allowed to change the UI.
* (Garfonso) Internal code cleanup / breaking dependency update.
* (Garfonso) Added: Support for pure humidity sensors.
* (Garfonso) Added: Support for URL as entity_image
* (Garfonso) Fixed: Adjust user-name/user-id handling to changes in js-controller 3.2.*
* (Garfonso) Fixed: default themes do not show as selected
* (Garfonso) Fixed: Loading themes / custom cards / image-proxy

### 1.4.3 (2021-02-01)
* (bluefox) Support of lovelace via ioBroker.pro

### 1.4.2 (2021-01-08)
* (thost96) Fixed: set Theme state type to string instead of text

### 1.4.1 (2021-01-08)
* (bluefox) Support of new Let's Encrypt (only with js-controller 3.2.x)

## License

Copyright 2019-2021, bluefox <dogafox@gmail.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.