---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.schedule-switcher.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.schedule-switcher.svg
BADGE-Number of Installations: https://iobroker.live/badges/schedule-switcher-installed.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/schedule-switcher-stable.svg
BADGE-NPM: https://nodei.co/npm/iobroker.schedule-switcher.png?downloads=true
---
![Logo](../../admin/schedule-switcher.png)

# ioBroker.schedule-switcher

[Zurück zur README](/README.md)

# Einleitung

Dieser Adapter ermöglicht es dem Benutzer, Geräte mithilfe von Zeitplänen ein-/auszuschalten oder 100/0.
Die Zeitpläne können vollständig über ein Vis- oder Vis-2-Widget konfiguriert werden.
Ein Zeitplan wechselt einen oder mehrere ioBroker-Zustände und besteht aus einem oder mehreren Auslösern, die definieren, wann und wie der Zustand gewechselt werden soll.
Es kann konfiguriert werden, zu welcher Uhrzeit und an welchen Wochentagen der Trigger ausgelöst werden soll. Es können auch Astro-Trigger oder Countdowns erstellt werden.

# Zusammenfassung

-   [Instanz Einstellungen](#instanz-einstellung-schedule-switcher)
-   [Objekte](#states)
-   [Beispiel Trigger Events als JSON](#beispiel-triggerevents-json)
-   [Beispiel Trigger als JSON](#beispiel-auslöser-json)
-   [Beispiel sendTo Trigger nur Experten](#beispiel-auslöser-mit-sendto-anlegen-oder-editieren-experten)
-   [Beispiel Widget als JSON](#beispiel-widgets-json)
-   [Beispiel Historie als JSON](#beispiel-historie-json)
-   [Widget anlegen](#widget-anlegen)
-   [Namen ändern](#namen-ändern)
-   [Bedingungen hinzufügen](#bedingung-hinzufügen)
-   [Text ersetzen](#text-ersetzen)
-   [CSS Einstellungen](#css-anwenden-beschreibung-siehe-css)
-   [Trigger anlegen](#trigger)
-   [Astrotrigger anlegen](#astro-trigger)
-   [Einmaltrigger anlegen](#one-time-trigger)
-   [CSS](#css)

### Instanz Einstellung schedule-switcher

[Zusammenfassung](#zusammenfassung)

-   `+ Zeichen`: Neuen Zeitplan hinzufügen
-   `Schaltplandaten Id`: Erstellte Objekte
-   `Name`: Name vom Widget
-   `Anzahl Auslöser`: Anzahl der Auslöser
-   `Aktiv`: Aktiv
-   `Löschen`: Zeitplan löschen
-   `Verzögerung zwischen 2 Schaltvorgängen in ms`: Verhindert zeitgleiches setzen von States
-   `Historie Umschaltung als JSON (max. 100/0 für Aus)` Max. Speicherung der Historie

    ![instance_settings.png](img/instance_settings.png)

### States

[Zusammenfassung](#zusammenfassung)

-   onoff
-   `schedule-switcher.0.onoff.6.data` Alle Auslöser als JSON
-   `schedule-switcher.0.onoff.6.enabled` Aktiv oder Inaktiv
-   `schedule-switcher.0.onoff.6.views` Wo wurden Widgets für die Objekte angelegt
-   Status
-   `schedule-switcher.0.counterTrigger` Anzahl Trigger (aktive und inaktive)
-   `schedule-switcher.0.history` Histerie der Schaltungen
-   `schedule-switcher.0.nextEvents` Nächste Schaltvorgänge als JSON Table
-   `schedule-switcher.0.sendto` Bei VIS-2 werden Änderungen über dieses Objekt an den Adapter übergeben

![101_remote.png](img/view_states.png)

# Beispiel Triggerevents JSON

[Zusammenfassung](#zusammenfassung)

```json
[
    {
        "type": "TimeTrigger", // TimeTrigger, AstroTrigger oder OneTimeTrigger
        "name": "Rollloade Wohn", // Name
        "triggerid": 0, // Trigger ID
        "action": "OnOffStateAction", // OnOffStateAction oder Condition
        "states": ["0_userdata.0.test", "0_userdata.0.test5"], // States
        "active": true, // enabled true oder false
        "hour": 16, // Stunde
        "minute": 22, // Minute
        "day": 9, // Tag
        "dateISO": "2024-11-09T15:22:00.000Z", // Zeit ohne Zeitzone
        "timestamp": 1731165720000, // Timestamp ohne Zeitzone
        "objectId": 1 // ObejektId schedule-switcher.0.onoff.<objectid>.data
    }
]
```

# Beispiel Auslöser JSON

[Zusammenfassung](#zusammenfassung)

```json
{
    "type": "OnOffSchedule",
    "name": "Rolllade Wohn", // Name vom letzten erstellte Widget
    "onAction": {
        // Action für On
        "type": "OnOffStateAction",
        "valueType": "number",
        "onValue": 0,
        "offValue": 100,
        "booleanValue": true,
        "idsOfStatesToSet": ["0_userdata.0.test4"] // States max. 10
    },
    "offAction": {
        // Action für Off
        "type": "OnOffStateAction",
        "valueType": "number",
        "onValue": 0,
        "offValue": 100,
        "booleanValue": false,
        "idsOfStatesToSet": ["0_userdata.0.test4"] // States max. 10
    },
    "triggers": [
        {
            "type": "AstroTrigger", // Trigger - AstroTrigger - OneTimeTrigger
            "astroTime": "sunrise",
            "shiftInMinutes": 0,
            "weekdays": [1, 2, 3, 4, 5, 6],
            "id": "0",
            "action": {
                "type": "ConditionAction",
                "condition": {
                    "type": "StringStateAndConstantCondition",
                    "constant": "true",
                    "stateId": "0_userdata.0.test",
                    "sign": "=="
                },
                "action": {
                    "type": "OnOffStateAction",
                    "name": "On"
                }
            }
        }
    ]
}
```

# Beispiel Widgets JSON

[Zusammenfassung](#zusammenfassung)

```json
{
    "vis-2.0": {
        // Welche VIS Version
        "main": {
            // Projekt
            "w000005": {
                // Widget ID
                "prefix": "main", // Projekt
                "namespace": "vis-2.0", // Welche VIS Version
                "view": "Rollladen", // Welche View
                "widgetId": "w000005", // Widget ID
                "newId": "schedule-switcher.0.onoff.6.data", // Neues Objekt
                "oldId": "timer-switch.0.onoff.1.data", // Altes Objekt
                "enabled": "schedule-switcher.0.onoff.6.enabled", // Enabled Objekt
                "stateCount": 1, // Counter Zustände
                "state": [
                    // Zustände
                    {
                        "oid-stateId1": "0_userdata.0.test5"
                    }
                ],
                "conditionCount": 1, // Counter Bedingung
                "condition": [
                    // Zustände Bedingungen
                    {
                        "oid-conditionStateId1": "0_userdata.0.test"
                    }
                ]
            },
            "w000006": {
                // Widget ID
                "prefix": "main", // Projekt
                "namespace": "vis-2.0", // Welche VIS Version
                "view": "Test", // Welche View
                "widgetId": "w000006", // Widget ID
                "newId": "schedule-switcher.0.onoff.6.data", // Neues Objekt
                "oldId": "timer-switch.0.onoff.1.data", // Altes Objekt
                "enabled": "schedule-switcher.0.onoff.6.enabled", // Enabled Objekt
                "stateCount": 1, // Counter Zustände
                "state": [
                    // Zustände
                    {
                        "oid-stateId1": "0_userdata.0.test4"
                    }
                ],
                "conditionCount": 1, // Counter Bedingung
                "condition": [] // Zustände Bedingungen
            }
        }
    }
}
```

# Beispiel Auslöser mit sendTo anlegen oder editieren (Experten)

[Zusammenfassung](#zusammenfassung)

```JSON
sendTo("schedule-switcher.0", "add-trigger", { // Neuen Auslöser anlegen
    "dataId":"schedule-switcher.0.onoff.6.data",
    "triggerType":"TimeTrigger",
    "actionType":"OnOffStateAction"
});

sendTo("schedule-switcher.0", "update-trigger", { // Aktion für den neuen Auslöser festlegen
    "dataId":"schedule-switcher.0.onoff.6.data",
    "trigger":{
        "type":"TimeTrigger",
        "hour":12,
        "minute":32,
        "weekdays":[1,2,3,4,5],
        "id":"0", // ID abgleichen
        "action":{
            "type":"OnOffStateAction",
            "name":"On"
        }
    }
});

sendTo("schedule-switcher.0", "add-trigger", { // Neuen Astrotrigger anlegen
    "dataId":"schedule-switcher.0.onoff.6.data",
    "triggerType":"AstroTrigger",
    "actionType":"OnOffStateAction"
});

sendTo("schedule-switcher.0", "update-trigger", { // Aktion für den neuen Auslöser festlegen
    "dataId":"schedule-switcher.0.onoff.6.data",
    "trigger":{
        "type":"AstroTrigger",
        "astroTime":"sunrise", // sunrise, sunset or solarNoon
        "shiftInMinutes":0,
        "weekdays":[1,2,3,4,5],
        "id":"0", // ID abgleichen
        "action":{
            "type":"OnOffStateAction",
            "name":"On"
        }
    }
});

sendTo("schedule-switcher.0", "disable-schedule", { // Auslöser deaktivieren
    "dataId":"schedule-switcher.0.onoff.6.data"
});

sendTo("schedule-switcher.0", "enable-schedule", { // Auslöser aktivieren
    "dataId":"schedule-switcher.0.onoff.6.data"
});

sendTo("schedule-switcher.0", "add-one-time-trigger", { // Einmalauslöser anlegen
    "dataId":"schedule-switcher.0.onoff.6.data",
    "trigger":"{\"type\":\"OneTimeTrigger\",\"date\":\"2024-10-17T06:14:22.660Z\",\"timedate\":false,\"action\":{\"type\":\"OnOffStateAction\",\"name\":\"On\"}}"
});

sendTo("schedule-switcher.0", "delete-trigger", { // Auslöser mit bekannter ID löschen
    "dataId":"schedule-switcher.0.onoff.6.data",
    "triggerId":"0"
});
```

# Beispiel Historie JSON

[Zusammenfassung](#zusammenfassung)

```JSON
[
  {
    "setObjectId": "0_userdata.0.test4",
    "objectId": 0,
    "value": "true",
    "object": "0_userdata.0.test4",
    "trigger": "TimeTrigger",
    "astroTime": "unknown",
    "shift": 0,
    "date": 0,
    "hour": 20,
    "minute": 48,
    "weekdays": [
      [
        1,
        2,
        3,
        4,
        5,
        6,
        0
      ]
    ],
    "time": 1729622880040
  },
  {
    "setObjectId": "0_userdata.0.test4",
    "objectId": 0,
    "value": "true",
    "object": "0_userdata.0.test4",
    "astroTime": "unknown",
    "shift": 0,
    "date": 0,
    "hour": 20,
    "minute": 47,
    "weekdays": [
      [
        1,
        2,
        3,
        4,
        5,
        6,
        0
      ]
    ],
    "time": 1729622820071
  }
]
```

# Beispiel Widget View JSON

[Zusammenfassung](#zusammenfassung)

```json
{
    "vis-2.0": {
        "main": {
            "w000004": {
                "prefix": "main", // Projekt
                "namespace": "vis-2.0", // VIS
                "view": "default", // View
                "widgetId": "w000004", // Widget ID
                "newId": "schedule-switcher.0.onoff.3.data" // Objekt ID
            }
        }
    },
    "vis.0": {
        "main": {
            "w00001": {
                "prefix": "main",
                "namespace": "vis.0",
                "view": "Rollo",
                "widgetId": "w00001",
                "newId": "schedule-switcher.0.onoff.3.data"
            }
        }
    }
}
```

### Widget anlegen

[Zusammenfassung](#zusammenfassung)

-   Widget in einer View einfügen

![create_widget.png](img/create_widget.png)

-   ID für Schaltplandaten auswählen
-   Zeitplan Aktivierungs ID auswählen
-   ID vom geschaltenen State auswählen (max. 10 möglich)

![create_widget_stateid.png](img/create_widget_stateid.png)

-   Wertetype festlegen und die Werte die gesetzt werden sollen

![create_widget_stateid_1.png](img/create_widget_stateid_1.png)

-   Nun einen Schaltplan erstellen

![create_widget_select.png](img/create_widget_select.png)

### Namen ändern

[Zusammenfassung](#zusammenfassung)

-   Namen ändern - Wird in den Objekten auch übernommen

![create_widget_name.png](img/create_widget_name.png)

### Bedingung hinzufügen

[Zusammenfassung](#zusammenfassung)

-   Eine Bedingung festellen.

![create_widget_select_condition.png](img/create_widget_select_condition.png)

### Text ersetzen

[Zusammenfassung](#zusammenfassung)

-   Text an/aus und alles an/alles aus ändern

![create_widget_rename_1.png](img/create_widget_rename_1.png)
![create_widget_rename_2.png](img/create_widget_rename_2.png)

### CSS anwenden [Beschreibung siehe css](#css)

[Zusammenfassung](#zusammenfassung)

-   Verwende CSS aktivieren um den Style anzupassen</br>
    ![create_widget_css.png](img/create_widget_css.png)</br>
    ![create_widget_css_1.png](img/create_widget_css_1.png)</br>
    ![create_widget_css_2.png](img/create_widget_css_2.png)</br>
    ![create_widget_css_3.png](img/create_widget_css_3.png)</br>
    ![widget_switched.png](img/widget_switched.png)</br>
    ![widget_manual.png](img/widget_manual.png)</br>
    ![widget_astro_icon.png](img/widget_astro_icon.pngg)</br>
    ![widget_condition_1.png](img/widget_condition_1.png)</br>
    ![widget_condition_2.png](img/widget_condition_2.png)

### Trigger

[Zusammenfassung](#zusammenfassung)

-   Den Stift anklicken um die Zeit einzutragen oder die Mülltonne um den Trigger zu löschen

![create_widget_select_time.png](img/create_widget_select_time.png)

-   Schaltzustand auswählen
-   Eine Bedingung auswählen (optional)
-   Zeit eintragen (hh:mm)

```:warning:
 ⚠ Zeigt in Firefox kein Uhrzeit-Feld an!
```

![create_widget_select_time_add_1.png](img/create_widget_select_time_add_1.png)

-   Wochentag auswählen
-   Oben rechts speichern anklicken

![create_widget_select_time_add_2.png](img/create_widget_select_time_add_2.png)

-   Fertig

![create_widget_select_time_done.png](img/create_widget_select_time_done.png)

### Astro Trigger

[Zusammenfassung](#zusammenfassung)

-   Den Stift anklicken um die Astrozeit auszuwählen oder die Mülltonne um den Trigger zu löschen

![create_widget_select_astro.png](img/create_widget_select_astro.png)

-   Schaltzustand auswählen
-   Eine Bedingung auswählen (optional)
-   Astrozeit auswählen (Sonnenaufgang, Sonnenuntergang oder Mittag)

![create_widget_select_astro_add_1.png](img/create_widget_select_astro_add_1.png)

-   Offset in Minuten eintragen (optional)
-   Wochentag auswählen
-   Oben rechts speichern anklicken

![create_widget_select_astro_add_2.png](img/create_widget_select_astro_add_2.png)

-   Fertig

![create_widget_select_astro_done.png](img/create_widget_select_astro_done.png)

### One Time Trigger

[Zusammenfassung](#zusammenfassung)

-   Schaltzustand auswählen
-   Eine Bedingung auswählen (optional)
-   Zeit eintragen (hh:mm:ss)
-   Oben rechts speichern anklicken

![create_widget_select_onetime.png](img/create_widget_select_onetime.png)

-   Fertig

![create_widget_select_onetime_done.png](img/create_widget_select_onetime_done.png)

-   Schaltzustand auswählen
-   Eine Bedingung auswählen (optional)
-   Zeit eintragen/auswählen (dd.mm.yyyy hh:mm:ss)
-   Oben rechts speichern anklicken

```:warning:
 ⚠ Zeigt in Firefox kein Uhrzeit-Feld an!
```

![create_widget_select_onetime_date.png](img/create_widget_select_onetime_date.png)</br>
![create_widget_select_onetime_date_calendar.png](img/create_widget_select_onetime_date_calendar.png)

-   Fertig

![create_widget_select_onetime_date_done.png](img/create_widget_select_onetime_date_done.png)

### CSS

[Zusammenfassung](#zusammenfassung)

```
app-on-off-schedules-widget {
    /* Primary color (button background, toggle switch color) */
    --ts-widget-primary-color: #337ab7;

    /* Background color of the widget */
    --ts-widget-bg-color: #424242;
    /* Background color of the triggers */
    --ts-widget-trigger-bg-color: #272727;

    /* Foreground color (font color and scrollbar color) */
    --ts-widget-fg-color: white;
    /* Font color of the switched states id */
    --ts-widget-oid-fg-color: #a5a5a5;
    /* Font color in buttons */
    --ts-widget-btn-fg-color: white;
    /* Font color of a disabled weekday */
    --ts-widget-weekdays-disabled-fg-color: #5D5D5D;
    /* Font color of an enabled weekday */
    --ts-widget-weekdays-enabled-fg-color: white;
    /* Font color of the name of the widget (defaults to --ts-widget-fg-color) */
    --ts-widget-name-fg-color: white;
    /* Font color of switched time (defaults to --ts-widget-fg-color) */
    --ts-widget-switched-time-fg-color: white;
    /* Font color of switched value (defaults to --ts-widget-fg-color)*/
    --ts-widget-switched-value-fg-color: white;
    /* Font color of the astro time (defaults to --ts-widget-fg-color) */
    --ts-widget-astro-time-fg-color: black;
    /* Font color of the astro time's shift */
    --ts-widget-astro-shift-fg-color: #5d5d5d;
    /* Font color of condition (defaults to --ts-widget-fg-color) */
    --ts-widget-condition-fg-color: white;
    /* Font color of toogle button off */
    --ts-widget-off-color: #c0c0c0;
    /* Color background toogle button off */
    --ts-widget-off-color-container: #808080;
    /* Color of next astro switching time */
    --ts-widget-astro-next-fg-color: white;

    /* Font family used in the whole widget */
    --ts-widget-font-family: 'Roboto', 'Segoe UI', BlinkMacSystemFont, system-ui, -apple-system;
    /* Font size of the name of the widget */
    --ts-widget-name-font-size: 2em;
    /* Font size of the switched oid */
    --ts-widget-oid-font-size: 30px;
    /* Font size of switch text */
    --ts-widget-state-action-width: 65px;
    /* Font size of next astro switching time */
    --ts-widget-astro-next-font-size: 2em;
    /* Width of date time input */
    --ts-widget-datetime-width: 230px;

    /* Display of edit name button. Use 'none' to hide the button and 'block' to show it
    --ts-widget-edit-name-button-display: block;
    /* Display of condition. Use 'none' to hide the condition and 'block' to show it
    -ts-widget-condition-display: block;
    /* Display of time icon. Use 'none' to hide the button and 'block' to show it
    --ts-widget-time-icon-display: none;

    /* Applies a filter to icons used in buttons (safe, edit, remove, cancel), for
       white use invert(1) and for black invert(0) */
    --ts-widget-img-btn-filter: invert(1);

    /* Add trigger dropdown background color */
    --ts-widget-add-trigger-dropdown-bg-color: #f1f1f1;
    /* Add trigger dropdown font color */
    --ts-widget-add-trigger-dropdown-fg-color: black;
    /* Add trigger dropdown hover background color */
    --ts-widget-add-trigger-dropdown-hover-bg-color: #ddd;

    /* ! Changing these may break the layout, change at your own risk */

    /* Font size of weekdays */
    --ts-widget-weekdays-font-size: 23px;
    /* Font size of switched value (on/off) */
    --ts-widget-switched-value-font-size: 2em;
    /* Font size of switched time */
    --ts-widget-switched-time-font-size: 2em;
    /* Font size of the astro time (e.g. Sunrise, ...) */
    --ts-widget-astro-time-font-size: 1.5em;
    /* Font size of the astro time's shift */
    --ts-widget-astro-shift-font-size: 1em;
    /* Font size of condition */
    --ts-widget-condition-font-size: 1em;
}
```

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.0.6 (2024-11-16)

-   (Lucky_ESA) Put value of state correctly
-   (Lucky_ESA) Added next triggers as JSON
-   (Lucky_ESA) Added counter trigger
-   (Lucky_ESA) Updating astro time fixed

### 0.0.5 (2024-11-06)

-   (Lucky_ESA) Crash when updating astro time fixed
-   (Lucky_ESA) Fixed some bugs

### 0.0.4 (2024-11-04)

-   (Lucky_ESA) Temporary function removed
-   (Lucky_ESA) Creation of objects adjusted
-   (Lucky_ESA) Validation check of the states
-   (Lucky_ESA) Validation check for 2 widgets with one object

### 0.0.3 (2024-10-30)

-   (Lucky_ESA) Fixed VIS translate
-   (Lucky_ESA) Added astro time in trigger
-   (Lucky_ESA) Fixed OneTimeTrigger
-   (Lucky_ESA) Added date for OneTimeTrigger
-   (Lucky_ESA) Fixed some bugs

### 0.0.2 (2024-10-22)

-   (Lucky_ESA) Fix translate
-   (Lucky_ESA) Fix background color disable Weekdays
-   (Lucky_ESA) Fix sendTo
-   (Lucky_ESA) Added jsonConfig
-   (Lucky_ESA) Added history

### 0.0.1 (2024-10-19)

-   (Lucky_ESA) initial release

## License

MIT License

Copyright (c) 2024 Lucky_ESA <github@luckyskills.de>

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