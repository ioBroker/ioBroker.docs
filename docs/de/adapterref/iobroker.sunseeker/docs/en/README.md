---
chapters: {"pages":{"en/adapterref/iobroker.sunseeker/README.md":{"title":{"en":"ioBroker.sunseeker"},"content":"en/adapterref/iobroker.sunseeker/README.md"},"en/adapterref/iobroker.sunseeker/docs/en/README.md":{"title":{"en":"ioBroker.sunseeker"},"content":"en/adapterref/iobroker.sunseeker/docs/en/README.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sunseeker/docs/en/README.md
title: ioBroker.sunseeker
hash: qWdVgpwtfo4l22OCV9drGzmzek8WDjswvHtPmFC3wpQ=
---
![Logo](../../../../../en/adapterref/iobroker.sunseeker/admin/sunseeker.png)

# ioBroker.sunseeker

[Zurück zur README-Datei](/#/adapters/sunseeker)

## Konfiguration

Die Adaptereinstellungen enthalten die folgenden Felder:

| Feld                          | Beschreibung                                                  |
| ----------------------------- | ------------------------------------------------------------- |
| Benutzername / E-Mail-Adresse | Sunseeker-App-Anmeldung                                       |
| Passwort                      | Sunseeker-App-Passwort (verschlüsselt gespeichert)            |
| Region                        | `EU` oder `US` (nur relevant für die `New` API)                 |
| API                           | `New` für aktuelle Modelle (S/X/V/V1), `Old` für ältere Geräte |
| Abstimmungsintervall          | REST-Abfrageintervall in Sekunden (mindestens 30)             |
| Sprache                       | UI- und Ereigniscodesprache, z. B. `de-DE`, `en-EN`            |

Welche API ausgewählt wird, hängt vom Modell ab:

- `New`: alle Rasenmäher der Serien S, X, V und V1 (Server) `wirefree-specific.sk-robot.com` /`wirefree-specific-us.sk-robot.com`)
- `Old`: ältere Geräte ohne Wirefree-Branding (Server `server.sk-robot.com`)

## Merkmale

- REST-Login (OAuth2-Passwort-Grant) mit automatischer Token-Aktualisierung bei einem einzigen `setInterval` Die
- Geräteliste und Status/Einstellungen pro Konto im konfigurierten Intervall abrufen.
- MQTT-Push:
  - `New` API: TLS MQTT (Port 1884 für SXV, 32884 für V1) mit einem RSA-verschlüsselten Passwort. Nach der Verbindung löst der Adapter Folgendes aus: `getDevAllProperties`, `getSelectRegionID`, `getAllPath`, `getConsumableItems` Und `getFcState` über `get_property` POST, damit der vollständige Status sofort verfügbar ist.
  - `Old` API: Einfaches MQTT aktiviert `mqtts.sk-robot.com:1883` mit dem fest codierten App-Benutzer.
- Modellklassifizierung in `S`, `X`, `V` (inkl. V18/V3) und `V1`. Endpunkte und Parameter (`cmdurl`, border mode, set-property path) werden automatisch ausgewählt.
- Übersetzte Ereigniscodes: 12 Sprachvarianten aus den Home Assistant-Sprachdateien sind enthalten. `lib/eventcodes.json` und beigefügt als `common.states` Zu `event_code` Und `errortype` (modellbewusst), sodass die ioBroker-Benutzeroberfläche lesbare Beschriftungen anzeigt.

## Objektbaum

Für jeden Rasenmäher (Seriennummer) `<sn>`) Der Adapter erzeugt diese Kanäle:

- `<sn>.mower_raw` — Mäherstatus (Abfrage **und** MQTT-Push-Schreibvorgang in denselben Ordner)
- `<sn>.settings` — Geräteeinstellungen
- `<sn>.remote` — Befehlsschaltflächen
- `<sn>.schedule` — Wochenplan (ausfüllbar, siehe unten)
- `<sn>.events` — Mähereignisprotokoll als JSON und manuelle Aktualisierungsschaltfläche
- `<sn>.map` — Kartendaten (nur für S/X-Modelle, sofern verfügbar):
  - `info` — Rohantwort von `/wireless_map/wireless_device/get` (Größen, Vergrößerung, `mapModifyTime`, …)
  - `zones` — Zoneninformationen
    - `change_active_map_name`
    - `delete_active_map_select`
    - `delete_active_map`
    - `save_active_map`
    - `merge_zone`
      - `xx.start_mowing_selected_area`
      - `xx.name`
      - `xx.split_zones`
  - `image` — Heatmap (PNG-Daten-URL; oft leer, wenn die Cloud keine gerendert hat)
  - `wifi` — Heatmap des WLAN-Signals (PNG-Daten-URL)
  - `net` — 4G-Signal-Heatmap (PNG-Daten-URL)
  - `texture` — Rohtexturkarte des Arbeitsbereichs (WebP-Daten-URL)
  - `mapData` — Kartengeometrie als rohe JSON-Zeichenfolge (Zonen, Polygone — dieselbe Quelle, die HA zum Rendern seiner Livekarte verwendet)
  - `pathData` — aufgezeichneter Mähpfad als roher JSON-String
  - `backup` — Backup-Map-JSON (von `/wireless_map/backup_map/get`)
  - `livemap` — vom Adapter gerenderte PNG-Daten-URL (Zonen, Hindernisse, aufgezeichneter Pfad, Ladeposition; gerendert mit `pureimage`)
  - `livemap_update` - Livemap aktivieren/deaktivieren (Aktivieren = +80 MB RAM)
  - `map_settings` - Livemap-Einstellungen
    - `region_channel_fill` -
    - `region_channel_stroke` -
    - `region_channel_lineWidth` -
    - `region_work_fill` -
    - `region_work_stroke` -
    - `region_work_lineWidth` -
    - `region_forbidden_fill` -
    - `region_forbidden_stroke` -
    - `region_forbidden_lineWidth` -
    - `region_placed_blank_fill` -
    - `region_placed_blank_stroke` -
    - `region_placed_blank_lineWidth` -
    - `region_obstacle_fill` -
    - `region_obstacle_stroke` -
    - `region_obstacle_lineWidth` -
    - `divide_area_work_stroke` -
    - `divide_area_work_lineWidth` -
    - `polyline_color` -
    - `polyline_lineWidth` -
    - `robot_path` -
    - `charger_path` -
    - `robot_charger_scale` -
  - `maps` - Alle Backup-Karten
    - `mapName` — Kartennamen ändern
    - `useThisMap` — Karte wiederherstellen
    - `delete_select` — Wählen Sie diese Option, um die Sicherungskarte zu löschen
    - `delete` — Backup-Karte löschen

Rohdaten (REST und MQTT) werden geschrieben durch `json2iob` direkt — es wird kein paralleles Datenmodell auf der Adapterseite gepflegt.

## Befehle (`<sn>.remote.*`)

| Zustand             | Wirkung                                           |
| ------------------- | ------------------------------------------------- |
| `start`             | Beginnen Sie mit dem Mähen.                       |
| `pause`             | Pause                                             |
| `dock`              | Rückkehr zur Ladestation                          |
| `stop_find_charger` | Rückgabe ans Dock abbrechen                       |
| `border`            | Randschnitt (V-Modelle: Modus 5 mit `value:true`) |
| `stop`              | Stoppen                                           |
| `stop_task`         | Aktuelle Aufgabe abbrechen                        |
| `restart`           | Aufgabe neu starten                               |
| `refresh`           | Status jetzt neu laden                            |
| `refresh_property`  | Eigenschaften jetzt neu laden                     |

## Schreibbare Einstellungen

Diese Einstellungen können direkt unter beschrieben werden `<sn>.settings.*`. Ihnen zu schreiben, sendet eine `set_property` /`setProperty` (modellabhängige) Anfrage an die Cloud:

| Zustand                        | Reichweite                                                                    | Einheit | Anmerkungen     |
| ------------------------------ | ----------------------------------------------------------------------------- | ------- | --------------- |
| `bladeSpeed`                   | 2800 – 3000 (Schritt 100)                                                     | U/min   | Neue API        |
| `bladeHeight`                  | 20 – 100 (Schritt 5)                                                          | mm      | Neue API        |
| `rainFlag`                     | boolescher Wert                                                               | —       | Alte + Neue API |
| `rainDelayDuration`            | 0 – 720 (Schritt 1)                                                           | min     | Alte + Neue API |
| `night_work`                   | boolescher Wert                                                               | —       | Neue API        |
| `recharge_mode`                | 0 = direkter Weg<br> 1 = klug<br> 2 = entlang der Kante                       | —       | Neue API        |
| `work_touch_mode`              | 0 = keine Berührung<br> 1 = langsame Berührung                                | —       | Neue API        |
| `auto_ride_edge_map_m`         | 0 = nicht aktiviert<br> 1 = aktiviert                                         | —       | Neue API        |
| `dis_along_border`             | 0 = schließen<br> 1 = weit                                                    | —       | Neue API        |
| `first_along_border`           | boolescher Wert                                                               | —       | Neue API        |
| `follow_border_freq`           | 1 = jedes Mal<br> 2 = jedes zweite Mal<br> 3 = jedes dritte Mal               | —       | Neue API        |
| `plan_mode`                    | 0 = Standardwert<br> 1 = spurlos<br> 4 = Mehrwinkel                           | —       | Neue API        |
| `gap`                          | 1 = schmal<br> 2 = Standard<br> 3 = breit                                     | —       | Neue API        |
| `workSpeed`                    | 1 = langsam<br> 2 = Standard<br> 3 = schnell                                  | —       | Neue API        |
| `ai_sensitivity`               | 0 = niedrig<br> 1 = hoch                                                      | —       | Neue API        |
| `dev_name`                     | Gerätenamen ändern                                                            | —       | Neue API        |
| `energy_saving_mode`           | boolescher Wert                                                               | —       | Neue API        |
| `pin_old`                      | PIN-Code ändern -> Alte PIN                                                   | —       | Neue API        |
| `pin_new`                      | Neue PIN (Zuerst die alte PIN festlegen)                                      | —       | Neue API        |
| `firmware_current`             | verfügbare Firmware (schreibgeschützt)                                        | —       | Alte + Neue API |
| `firmware_description`         | Beschreibung der aktuellen oder neuen Firmware (schreibgeschützt)             | —       | Alte + Neue API |
| `firmware_update_available`    | Verfügbare Firmware (Automatische Prüfung alle 24 Stunden - schreibgeschützt) | —       | Alte + Neue API |
| `firmware_update_start`        | Starten Sie das Upgrade, sobald es verfügbar ist.                             | —       | Alte + Neue API |
| `firmware_update_check_manual` | Manuelle Prüfung                                                              | —       | Alte + Neue API |
| `custom_flag`                  | Benutzerdefiniertes Flag setzen                                               | —       | Neue API        |
| `auto_upgrade`                 |                                                                               | —       | Neue API        |
| `reset_bladeplate`             |                                                                               | —       | Neue API        |
| `reset_blade`                  |                                                                               | —       | Neue API        |
| `reset_smal_bladeplate`        |                                                                               | —       | Neue API        |
| `reset_smal_blade`             |                                                                               | —       | Neue API        |

Beim Schreiben von Klingenwerten werden die Adapteranschlüsse `{ id: "setDevBlade", key: "blade", method: "set_property", speed|height: <int> }` Nach 1,5 Sekunden wird eine Aktualisierung des SA-Status geplant; normalerweise werden die Werte auch per MQTT-Push aktualisiert.

Schreiben `rainFlag` oder `rainDelayDuration` Es werden immer beide Werte an die Cloud gesendet (der fehlende Wert wird aus dem aktuellen Zustand gelesen). Der Endpunkt hängt vom Modell ab:

- `Old`: `POST /app_mower/device/setRain/{sn}/{appId}` mit `rainFlag` +`rainDelayDuration` Die
- `New` V1: `POST {cmdurl}setProperty` mit `method: "setRain"`, `rainFlag`, `rainDelayDuration` Die
- `New` S/X/V: `POST {cmdurl}set_property` mit `id: "setDevRain"`, `key: "rain"`, `rain_flag`, `delay` Die

## Zeitplan (`<sn>.schedule.*`)

Ein einfacher Wochenplan mit einem Zeitfenster pro Tag. Die Zustände sind beschreibbar, die Cloud wird jedoch nur aktualisiert, wenn…`set` wird ausgelöst.

| Zustand                     | Typ                                                                         | Format                                                                              |
| --------------------------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `1_monday_1` …`0_sunday_1`  | Zeichenkette                                                                | `"HH:MM-HH:MM"` Für das aktive Fenster deaktiviert eine leere Zeichenkette den Tag. |
| `1_monday_2` …`0_sunday_2`  | Zeichenkette                                                                | `"HH:MM-HH:MM"` Für das aktive Fenster deaktiviert eine leere Zeichenkette den Tag. |
| `pauseSchedule`             | boolescher Wert                                                             | Den Zeitplan anhalten, ohne die Fenster zu leeren                                   |
| `setSchedule`               | Taste                                                                       | Sendet die aktuellen Werte an die Cloud                                             |
| `getSchedule`               | Taste                                                                       | Aktuellen Ladeplan laden                                                            |
| `schedule_time_work_repeat` | Taste                                                                       | Mähzyklus mit Zeitplan                                                              |
| `schedule_mode`             | 0 = kein Zeitplan</br> 1 = empfohlen</br> 1 = benutzerdefiniert (nur X & S) | Sendet die aktuellen Werte an die Cloud                                             |
| `schedule_time_zone`        | Nummer                                                                      | Zeitzone                                                                            |

Die versendete Nutzlast hängt vom Modell ab:

- `Old` API: `POST /app_mower/device-schedule/setScheduling` mit `deviceScheduleBOS` für alle 7 Tage; `autoFlag` ist das Umkehrende von `pause` Die
- `New` V1: `POST {cmdurl}setProperty` mit `method: "setSchedule"` Und `deviceScheduleBOS` enthält nur die aktiven Tage.
- `New` S/X/V: `POST {cmdurl}set_property` mit `id: "setTimeTactics"`, `key: "time_tactics"` und ein `time` Array (ein Eintrag pro aktivem Tag, Tagesindex Mo=1…Sa=6, So=0; Start/Ende als Sekunden seit Mitternacht).

## Bekannte Einschränkungen

Die Sunseeker-API stellt deutlich mehr Felder bereit, als der Adapter derzeit schreibt. Alle Einstellungen sind als Rohdaten schreibgeschützt verfügbar unter `<sn>.settings` Folgende Zustände sind **noch nicht** als beschreibbar verfügbar:

- Zoneneinstellungen (Geschwindigkeit/Höhe der Klingen pro Zone, Reihenfolge)
- OTA-Update
- Arbeitsnachweise / Mähhistorie
- V1-spezifische Einstellungen: Rückweg, Bildschirmsperre, Randabstand, Zeitplan ein/aus
- Gen2-Einstellungen: auto\_ride\_edge, energy\_save, night\_work
- KI-Empfindlichkeit, PIN-Code, Kartenfunktionen