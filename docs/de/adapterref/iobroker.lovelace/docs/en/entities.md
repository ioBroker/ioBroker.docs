---
chapters: {"pages":{"en/adapterref/iobroker.lovelace/README.md":{"title":{"en":"ioBroker.lovelace"},"content":"en/adapterref/iobroker.lovelace/README.md"},"en/adapterref/iobroker.lovelace/docs/en/README.md":{"title":{"en":"ioBroker.lovelace — Documentation"},"content":"en/adapterref/iobroker.lovelace/docs/en/README.md"},"en/adapterref/iobroker.lovelace/docs/en/entities.md":{"title":{"en":"Entities"},"content":"en/adapterref/iobroker.lovelace/docs/en/entities.md"},"en/adapterref/iobroker.lovelace/docs/en/cards_and_ui.md":{"title":{"en":"Custom cards, themes & UI tips"},"content":"en/adapterref/iobroker.lovelace/docs/en/cards_and_ui.md"},"en/adapterref/iobroker.lovelace/docs/en/features.md":{"title":{"en":"Features"},"content":"en/adapterref/iobroker.lovelace/docs/en/features.md"},"en/adapterref/iobroker.lovelace/docs/en/theme_migration.md":{"title":{"en":"Migrating themes (2026 frontend update)"},"content":"en/adapterref/iobroker.lovelace/docs/en/theme_migration.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.lovelace/docs/en/entities.md
title: Entitäten
hash: n0ZuDa2MK1jlpz0UFm+ldG6Jvv69B1gxsca1iAFBkFo=
---
![Logo](../../../../../en/adapterref/iobroker.lovelace/admin/lovelace.png)

# Entitäten

Es gibt zwei Möglichkeiten, ioBroker-Objekte in Home Assistant zu integrieren.`entities` :

1. [Automatische Erkennung](#automatic-detection) (bevorzugt)
2. [Manuelle Konfiguration](#manual-configuration)

Nachfolgend finden Sie außerdem die [unterstützten Entitätstypen](#supported-entity-types) und einige [spezielle Entitäten](#special-entities) (Alarm, Timer, Wetter, Karte, …).

## Automatische Erkennung

Dies ist, wenn möglich, stets die bevorzugte Methode. Die Erkennung nutzt die ioBroker-Bibliothek.`type-detector` , das auch von anderen Adaptern wie z. B. verwendet wird`iot` oder`material` Wenn Ihre Geräte also für einen dieser Adapter korrekt konfiguriert sind, profitieren mehrere von ihnen gleichzeitig.

Es gibt auch eine Benutzeroberfläche für die`type-detector` Der [Geräteadapter](https://github.com/iobroker/iobroker.devices) . Es wird dringend empfohlen, ihn zu installieren und den zugehörigen Tab in der Administration zu aktivieren – dort werden alle erkannten Geräte angezeigt und können potenziell in Lovelace verwendet werden.

![Geräteadapter](../../../../../en/adapterref/iobroker.lovelace/docs/de/media/devices-overview.JPG)

Für die Erkennung ist es wichtig, dass die Zustände eines Geräts die richtigen Rollen und Typen (Zahl, Zeichenkette, boolescher Wert usw.) aufweisen. Trifft dies bei einem Ihrer Geräte nicht zu, erstellen Sie ein Gerät mithilfe der Alias-Funktion des JS-Controllers. Am einfachsten geht dies über den _Geräte-Tab_ im Adminbereich: Dort können Sie für jeden Zustand eines Geräts ein vorhandenes Objekt auswählen. Die Rollen und andere Eigenschaften werden im Alias korrekt gesetzt, sodass die Erkennung funktioniert.

Nachdem Ordner, Typ, Raum und Funktion festgelegt wurden, werden die einzelnen Zustände wie folgt zugewiesen:![Zustandskonfiguration](../../../../../en/adapterref/iobroker.lovelace/docs/de/media/devices-create.JPG)

Lovelace erkennt alle Geräte im Geräte-Tab, denen **sowohl** ein Raum **als auch** eine Funktion zugewiesen sind. Geräte, denen eines von beidem fehlt, werden ignoriert.

In den Instanzeinstellungen können Sie bei komplexeren Objekten sehen, dass mehrere Zustände zu einem einzigen Zustand zusammengefasst werden.`entity` , Zum Beispiel:![Lichtwesen](../../../../../en/adapterref/iobroker.lovelace/docs/de/media/light-entity.JPG)

Dies ist ein Licht (`light` ) Unterstützung von Farbe, Farbtemperatur und Dimmung — 4 ioBroker-Zustände in einem Objekt.

## Manuelle Konfiguration

In der Objektansicht (der`custom` Einstellungen eines ioBroker-Objekts) Lovelace kann für einzelne Objekte aktiviert werden. Sie legen die Entität fest`domain` (`light` ,`input_boolean` , …) und ein Name.

Einfache Entitäten mit einem einzigen Zustand (z. B.`input_number` ,`input_text` ,`input_boolean` ) direkt funktionieren. Darüber hinaus können mehrstufige Entitäten über Objektauswahlfelder im benutzerdefinierten Dialogfeld konfiguriert werden – z. B. ein`cover` (wie zum Beispiel ein automatisches Fenster),`device_tracker` Und`person` Für diese Typen wählen Sie die ioBroker-Zustände für jede Rolle aus (z. B. Abdeckung).`SET` /`ACTUAL` /`OPEN` /`CLOSE` /`STOP` , oder Tracker-Präsenz / GPS) und der Adapter verwendet die gesamte Entitätslogik wieder.

Bei komplexen Geräten (z. B. dimmbaren und farbveränderlichen Leuchten) ist die automatische Erkennung dringend zu empfehlen. Auch bei (binären) Sensoren ist die automatische Erkennung vorzuziehen.`device_class` Anschließend wird das Attribut ausgefüllt und die Darstellung besser an das Gerät angepasst (z. B. wird ein binärer Sensor vom Typ „Tür“ als „Tür“ angezeigt und Ein/Aus wird in Offen/Geschlossen übersetzt).

#### Wo können die Einstellungen aktiviert werden und wie lautet der Entitätsstatus?

Für **einfache** Einzelzustandstypen (`input_number` ,`input_text` ,`input_boolean` ,`input_select` ,`switch` ,`sensor` ,`binary_sensor` ,`camera` ,`timer` ,`alarm_control_panel` ) Aktivieren Sie die benutzerdefinierten Einstellungen **für den Zustand selbst** – der Wert dieses Objekts _ist_ der Entitätszustand.

Bei den **mehrstufigen** Typen wählen Sie die ioBroker-Zustände pro Rolle im benutzerdefinierten Dialogfeld aus. Das Objekt, für das Sie die Einstellungen aktivieren, dient lediglich als **Anker** (es weist der Entität ihre ID und ihren Anzeigenamen zu); sein eigener Wert wird **nicht** gelesen – ordnen Sie jeden Funktionszustand den Auswahlfeldern zu. So können Sie die Einstellungen für jeden beliebigen Zustand des Geräts festlegen (z. B. den Zieltemperaturzustand eines Thermostats).

`SET` Es handelt sich immer um den **Zielwert** (ein Sollwert, ein Deckungsgrad), nicht um den Zustand des Objekts. Der Zustand des Objekts (der Hauptwert, der auf der Karte angezeigt wird) pro Typ:

| Domain                     | Kommissioniererrollen                                                                                                                                                                                            | Entitätszustand                                               |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `light`                    | `ON` (ein/aus),`ON_ACTUAL` ,`DIMMER` (Helligkeit),`TEMPERATURE` (Farbtemperatur),`RGB` ,`HUE` ,`SATURATION` ,`EFFECT`                                                                                            | `on` / `off`                                                  |
| `cover`                    | `SET` (Ebene),`ACTUAL` ,`OPEN` /`CLOSE` /`STOP` ,`TILT_SET` /`TILT_ACTUAL`                                                                                                                                       | `open` /`closed` /`opening` /`closing`                        |
| `climate`                  | `SET`(Zieltemperatur),`ACTUAL` (aktuelle Temperatur),`MODE` (HVAC-Modus),`POWER` (ein/aus),`HUMIDITY` ,`SPEED` ,`SWING` ,`BOOST` ,`PARTY` Die Option „ _Heizen/Kühlen“_ erscheint, wenn keine`MODE` ist kartiert | der HVAC-Modus:`heat` /`cool` / `off`                         |
| `lock`                     | `SET` (Sperren/Entsperren),`ACTUAL` ,`OPEN` (verriegeln)                                                                                                                                                         | `locked` / `unlocked`                                         |
| `media_player`             | `STATE` ,`POWER` ,`PLAY` /`PAUSE` /`STOP` /`NEXT` /`PREV` ,`VOLUME` /`VOLUME_ACTUAL` /`MUTE` ,`SEEK` /`REPEAT` /`SHUFFLE` ,`TITLE` /`ARTIST` /`COVER` /`DURATION` /`ELAPSED`                                     | `playing` /`paused` / `idle`                                  |
| `vacuum`                   | `STATE` (Status),`POWER` (Start/Stopp),`PAUSE` ,`BATTERY` ,`WORK_MODE` (Lüftergeschwindigkeit)                                                                                                                   | `cleaning` /`docked` /`paused` /`returning` /`idle` / `error` |
| `humidifier`               | `POWER` (ein/aus),`SET` (Ziel-Luftfeuchtigkeit),`ACTUAL` (aktuelle Luftfeuchtigkeit),`MODE`                                                                                                                      | `on` / `off`                                                  |
| `water_heater`             | `SET` (Zieltemperatur),`ACTUAL` (aktuelle Temperatur),`POWER` (ein/aus),`MODE` (Betrieb)                                                                                                                         | der Betriebsmodus                                             |
| `device_tracker` /`person` | Anwesenheit, GPS (`"lat;lon"` oder separate Breiten-/Längengradangaben), GPS-Genauigkeit, Akku, Bild (URL oder Status), Quelltyp                                                                                 | `home` /`not_home` / ein Zonenname                            |

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
                "name": "simulateAlarm" // entity name -> "alarm_control_panel.simulateAlarm"
            }
        }
    },
    {
        "alarm_code": 1234 // alarm code that must be entered
    },
    function () {
        on({id: 'javascript.' + instance + '.alarmSimple', change: 'any'}, function (obj) {
            console.log('Control here the real device: ' + obj.state.val);
        });
    }
);
```

oder Sie verwenden einfach`lovelace.X.control.alarm (entity_id = alarm_control_panel.defaultAlarm)` Die

### Zahleneingabe

Wählen Sie die`input_number` Entitätstyp im benutzerdefinierten Dialogfeld. Erfordert`min` Und`max` In`common` ; eine optionale`step` kann hinzugefügt werden. Für Auf-/Abwärtspfeile anstelle eines Schiebereglers.`mode` Zu`number` :

```json5
common: {
    custom: {
        "lovelace.0": {
            "enabled": true,
            "entity": "input_number",
            "name": "Shutter", // entity name -> "input_number.Shutter"
            "mode": "number" // default presentation is slider
        }
    }
}
```

### Eingabe auswählen

Wählen Sie die`input_select` Entitätstyp im benutzerdefinierten Dialogfeld. Die Liste der Optionen stammt aus dem Standard`common.states` Objekt:

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

### Timer

Ein Timer kann mit folgendem Skript simuliert werden:

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
                "name": "simulateTimer" // entity name -> "timer.simulateTimer"
            }
        }
    },
    {},
    function () {
        let interval;
        let id = 'javascript.' + instance + '.timerSimple';
        on({id, change: 'any'}, function (obj) {
            if (!obj.state.ack) {
                if (obj.state.val) {
                    if (obj.state.val === obj.oldState.val) {
                        if (interval) {
                            setState(id, state.val, true);
                            clearInterval(interval);
                            interval = null;
                        } else {
                            interval = setInterval(() => {
                                getState(id, (err, state) => {
                                    state.val--;
                                    if (state.val <= 0) { clearInterval(interval); interval = null; state.val = 0; }
                                    setState(id, state.val, true);
                                });
                            }, 1000);
                        }
                    } else {
                        interval && clearInterval(interval);
                        interval = setInterval(() => {
                            getState(id, (err, state) => {
                                state.val--;
                                if (state.val <= 0) { clearInterval(interval); interval = null; state.val = 0; }
                                setState(id, state.val, true);
                            });
                        }, 1000);
                    }
                } else {
                    interval && clearInterval(interval);
                    interval = null;
                }
            }
        });
        setTimeout(() => setState(id, 20));
    }
);
```

## Unterstützte Entitätstypen

Die folgenden Entitätstypen werden vom Adapter erstellt oder können manuell konfiguriert werden. Gegeben ist die`domain` (der Teil, mit dem die entity\_id beginnt, z. B.`light` für`light.kitchen` ) und die ioBroker-Geräte, die zu dieser Entität bei automatischer Erkennung führen.

### Licht

Domain:`light`

ioBroker-Geräte: Light (`light` ), Dimmer (`dimmer` ), Farbtemperatur (`ct` ), RGB-Licht (`rgb` ), RGB-Einzeln (`rgbSingle` ), HUE-Licht (`hue` ).

ioBroker sortiert Lampen je nach ihren Fähigkeiten in verschiedene Geräteklassen ein – drei davon für farbiges Licht (`rgb` ,`rgbSingle` ,`hue` Optional mit Dimmfunktion und Farbtemperaturregelung. Es wird die Klasse mit den meisten Funktionen verwendet. Die manuelle Konfiguration unterstützt derzeit nur Ein/Aus und optionales Dimmen; Leuchten mit erweiterten Funktionen benötigen eine automatische Erkennung.

![Lichtwesen](../de/media/light-entity.JPG)![Lichtwesen in Lovelace](../../../../../en/adapterref/iobroker.lovelace/docs/de/media/light-entity-lovelace.JPG)

### Sensoren

Domain:`sensor`

ioBroker-Geräte: Fensterneigung (`windowTilt` ), Luftfeuchtigkeit (`humidity` ), Temperatur (`temperature` ).

Obwohl Sensoren üblicherweise aus einem einzigen ioBroker-Zustand bestehen (eine manuelle Konfiguration wäre also möglich), wird die automatische Erkennung dennoch empfohlen, damit die`device_class` Das Attribut wird ausgefüllt und Lovelace setzt das richtige Symbol und die richtige Einheit.

### Klima

Domain:`climate`

ioBroker-Geräte: Thermostat (`thermostat` ), Klimaanlage (`airCondition` ).

![Klimakarte](../../../../../en/adapterref/iobroker.lovelace/docs/de/media/climate-entity-full.JPG)

Die Temperatur wird in Lovelace über einen runden Schieberegler gesteuert. Darunter befinden sich Tasten zur Auswahl des Modus (nur für bekannte Modi). Die Modi sind Zahlen zugeordnet.`states` im ioBroker-Zustand. Lovelace weiß`auto` ,`heat` ,`cool` ,`heat_cool` ,`dry` ,`fan_only` Und`off` Diese werden als übersetzte Schaltflächen angezeigt. Weitere Zustände werden als Dropdown-Menü im Dialogfeld „Mehr Informationen“ angezeigt, das auch Dropdown-Menüs für Voreinstellungen enthält (falls vorhanden).`boost` oder`party` im ioBroker-Gerät vorhanden) und Lüfter / Schwingung, falls erkannt (ihre Zustände werden 1:1 angezeigt).

![Klima – mehr Infos](../de/media/climate-entity-full-moreinfo.JPG)![Klimaeigenschaften](../../../../../en/adapterref/iobroker.lovelace/docs/de/media/climate-entity-full-attributes.JPG)

## Spezielle Einrichtungen

### Wetter

Getestet mit`yr` Und`daswetter` Mindestens eines der folgenden Objekte muss vorhanden sein`Function=Weather` Und`Room=Any` In der Konfiguration verfügbar machen:

- `daswetter.0.NextDays.Location_1`
- `yr.0.forecast`

Getestet mit dem`AccuWeather` Treiberversion 1.1.0 ( <https://github.com/iobroker-community-adapters/ioBroker.accuweather> ). Benutzerdefinierte Lovelace-Karte zur Unterstützung der AccuWeather-Vorhersage: <https://github.com/algar42/IoB.lovelace.accuweather-card>

### Einkaufsliste

Die Einkaufsliste schreibt ihre Werte in die`lovelace.X.control.shopping_list` Geben Sie den Status in dieser Form an:

```json
[
   {"summary": "Task 1", "uid": "1234222", "status": "needs_action"},
   {"summary": "Task 2", "uid": "1234223", "status": "completed"}
]
```

Sie können auch Ihre eigenen Aufgaben- oder Einkaufslisten hinzufügen, indem Sie manuelle Entitäten vom Typ erstellen.`todo` Die

### Karte / Präsenz

Die Karte zeigt Objekte wie dieses hier:

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

oder zwei separate Objekte mit Rollen`value.gps.longitude` Und`value.gps.latitude` Die

Um eine Person/Anwesenheitsmarkierung auf der Karte anzuzeigen, ordnen Sie ein ioBroker-Objekt einem manuellen`device_tracker` oder`person` Entität (siehe [Manuelle Konfiguration](#manual-configuration) ).

### Bildobjekt

Verwenden Sie ein statisches Bild oder einen beliebigen Zustand, der eine URL liefert:

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

oder legen Sie den Entitätstyp einfach manuell fest auf`camera` und geben Sie die URL dort ein. Informationen zu Video-/Livestreams finden Sie unter [Funktionen → Video](/#/docs/adapterref/iobroker.lovelace/docs/en/features.md#video--live-streams) .