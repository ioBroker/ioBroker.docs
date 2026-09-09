---
chapters: {"pages":{"en/adapterref/iobroker.lovelace/README.md":{"title":{"en":"ioBroker.lovelace"},"content":"en/adapterref/iobroker.lovelace/README.md"},"en/adapterref/iobroker.lovelace/docs/en/README.md":{"title":{"en":"ioBroker.lovelace — Documentation"},"content":"en/adapterref/iobroker.lovelace/docs/en/README.md"},"en/adapterref/iobroker.lovelace/docs/en/entities.md":{"title":{"en":"Entities"},"content":"en/adapterref/iobroker.lovelace/docs/en/entities.md"},"en/adapterref/iobroker.lovelace/docs/en/cards_and_ui.md":{"title":{"en":"Custom cards, themes & UI tips"},"content":"en/adapterref/iobroker.lovelace/docs/en/cards_and_ui.md"},"en/adapterref/iobroker.lovelace/docs/en/features.md":{"title":{"en":"Features"},"content":"en/adapterref/iobroker.lovelace/docs/en/features.md"},"en/adapterref/iobroker.lovelace/docs/en/theme_migration.md":{"title":{"en":"Migrating themes (2026 frontend update)"},"content":"en/adapterref/iobroker.lovelace/docs/en/theme_migration.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.lovelace/README.md
title: ioBroker.lovelace
hash: EO9cuJNYuYhGtpkqPzs1wp8nO+IqMqv+/1dMMVu4GZM=
---
![Logo](../../../en/adapterref/iobroker.lovelace/admin/lovelace.png)

![Anzahl der Installationen](http://iobroker.live/badges/lovelace-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.lovelace.svg)
![Test und Freigabe](https://github.com/ioBroker/iobroker.lovelace/workflows/Test%20and%20Release/badge.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/lovelace/svg-badge.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.lovelace.svg)

# ioBroker.lovelace

## Lovelace-Adapter für ioBroker

Mit diesem Adapter können Sie Visualisierungen für ioBroker mit der Home Assistant Lovelace-Benutzeroberfläche erstellen.

## Dokumentation

- 📘 [Englische Dokumentation](/#/docs/adapterref/iobroker.lovelace/docs/en/README.md)
- 📗 [Deutsche Dokumentation](https://github.com/ioBroker/ioBroker.lovelace/blob/master/docs/de/README.md)

Die Dokumentation umfasst Konfiguration (automatische/manuelle Elemente), Bedienfelder und spezielle Elemente (Alarm, Timer, Wetter, Karte, Video, …), benutzerdefinierte Karten, Designs, Symbole, Benachrichtigungen, Sprachsteuerung und Fehlerbehebung.

## Entwicklung

### Originalquellen für Lovelace

Die verwendeten Quellen finden Sie hier: <https://github.com/GermanBluefox/home-assistant-polymer> .

### Todo

Die Sicherheitseinstellungen müssen vom aktuellen Benutzer und nicht vom Standardbenutzer übernommen werden.

### Version

Verwendete Version von home-assistant-frontend\@20260527.7; Browser-Mod-Version: 2.13.5

### So erstellen Sie die neue Lovelace-Version

Zunächst muss der eigentliche Branch <https://github.com/home-assistant/frontend> (dev branch) **manuell** in den [Branch https://github.com/GermanBluefox/home-assistant-polymer.git](https://github.com/GermanBluefox/home-assistant-polymer.git) ( _**iob**_ branch!) zusammengeführt werden.

Alle Änderungen für ioBroker sind mit einem Kommentar gekennzeichnet.`// IoB` Bis zum 27.05.2026 wurden folgende Dateien geändert:

- `build-scripts/gulp/app.js` - Füge die neue Gulp-Aufgabe develop-iob hinzu
- `build-scripts/gulp/rspack.js` - Neue Gulp-Aufgabe rspack-dev-app hinzufügen
- `build-scripts/rspack.cjs` - Deaktivieren Sie Source Maps im Produktions-Build, um die Anzahl der erzeugten Dateien zu reduzieren.
- `src/data/icons.ts` - Behaltet vorerst die alten Icons bei.
- `src/data/weather.ts` - Unterstützung für die Anzeige eines Wettersymbols aus einer URL hinzufügen.
- `src/dialogs/more-info/const.ts` - Wetterstatus und -verlauf entfernen, falls es sich um ein Bild handelt
- `src/dialogs/more-info/ha-more-info-dialog.ts` - Schaltfläche und Registerkarte „Entitätseinstellungen“ entfernen
- `src/dialogs/more-info/ha-more-info-history.ts` - entfernen`show more` Verbindung zur Geschichte
- `src/dialogs/more-info/ha-more-info-logbook.ts` - entfernen`show more` Link im Logbuch
- `src/dialogs/more-info/controls/more-info-weather.ts` - Unterstützung für die Anzeige eines Wettersymbols aus einer URL hinzufügen.
- `src/dialogs/voice-command-dialog/ha-voice-command-dialog.ts` - Konfiguration von Sprachassistenten deaktivieren
- `src/entrypoints/core.ts` - Option "Keine Authentifizierung" hinzufügen
- `src/panels/lovelace/cards/hui-weather-forecast-card.ts` - Unterstützung für die Anzeige eines Wettersymbols aus einer URL hinzufügen.
- `src/panels/lovelace/entity-rows/hui-weather-entity-row.ts` - Unterstützung für die Anzeige eines Wettersymbols per URL mit Authentifizierung hinzufügen.
- `src/panels/lovelace/hui-root.ts` - Benachrichtigungsschaltfläche hinzugefügt, Link „Dashboards verwalten“ deaktiviert, Schaltfläche „Hinzufügen“ (Gerät/Automatisierung/Bereich/Person) ausgeblendet, Bearbeitungsdialog für Lovelace-Boards geöffnet, Live-Dashboard-Titel aus hass.panels
- `src/layouts/hass-router-page.ts` - Schutz von updatePageEl vor undefinierten Routen während des Neuaufbaus (Absturz durch Umbenennung des Panels).
- `src/panels/config/dashboard/ha-config-dashboard.ts` - Ausblenden der Einstellungsabschnitte (Automatisierungen, Apps, Sprachassistenten, System, Personen, Tipp).
- `src/panels/config/ha-panel-config.ts` - Die Registerkarte „Integrationen“ unter „Geräte & Dienste“ ausblenden und die Kachel „Geräte & Dienste“ unter /config/devices platzieren.
- `src/panels/config/developer-tools/ha-panel-developer-tools.ts` - Entfernen der Registerkarten YAML, Ereignisse und Unterstützung aus den Entwicklertools.
- `src/panels/config/developer-tools/developer-tools-router.ts` - Standardmäßig wird die Registerkarte "Status" angezeigt (YAML entfernt).
- `src/panels/config/info/ha-config-info.ts` - Die Links zu Dokumentation, Credits, Community und Lizenz im Info-Bereich ausblenden (Tastenkombinationen beibehalten).
- `src/panels/config/lovelace/dashboards/ha-config-lovelace-dashboards.ts` - feste Panels (inkl. Browser-Mod) in der Liste der integrierten Dashboards anzeigen.
- `src/panels/profile/ha-panel-profile.ts` - Sicherheits-Tab im Benutzerprofil ausblenden.
- `src/util/documentation-url.ts` - für einen Link zur ioBroker-Hilfe anstelle von Home Assistant.
- `src/html/index.html.template` - Entfernen des Safari Smart App Banners (apple-itunes-app meta) für die HA iOS App (#418).
- `.husky/pre-commit` - Git-Commit-Hooks entfernen.

Danach checken Sie die geänderte Version aus.`./build` Ordner. Dann.

1. Wechseln Sie in das Verzeichnis ./build.
2. `git clone https://github.com/GermanBluefox/home-assistant-polymer.git` Es handelt sich um eine Abspaltung von <https://github.com/home-assistant/frontend.git> , allerdings wurden einige Dinge geändert (siehe die Dateiliste weiter oben).
3. `cd home-assistant-polymer`
4. `git checkout master`
5. `yarn install`
6. `gulp build-app` zur Veröffentlichung oder`gulp develop-iob` für die Debugging-Version. Um die Webseite nach Änderungen neu zu erstellen, können Sie Folgendes aufrufen:`webpack-dev-app` für einen schnelleren Build, aber Sie müssen anrufen`build-app` jedenfalls sobald die Version einsatzbereit ist.
7. Skript ausführen`hass_frontend/static_cards/newFrontend.sh` im Adapter-Repository, um das Frontend zu aktualisieren (es wird davon ausgegangen, dass sich die beiden Repositories im selben Ordner befinden; falls nicht, passen Sie bitte das Skript an, vorzugsweise mit Parameterbehandlung, und erstellen Sie einen Pull Request, danke :smile: ).
8. Laufen`gulp rename` Aufgabe.
9. Aktualisieren Sie die Version in`README.md` Die

## Changelog

<!--
	PLACEHOLDER for the next version:
	### **WORK IN PROGRESS**
    ### for next frontend update, update of auto entities card will be necessary!
-->
### **WORK IN PROGRESS**
* (Garfonso/Claude) Fixed custom cards that fetch history directly (e.g. the windrose card) crashing with "TypeError: t.callback is not a function": a one-shot history request was answered like a subscription. (#722)

### 6.1.3 (2026-09-01)
* (Garfonso/Claude) Fixed auto-generated entity_ids growing longer and longer within a single start for devices sharing a generated display name and having no own readable state (e.g. several buttons named the same): they no longer collapse onto the same internal registry key and overwrite each other's name.
* (Garfonso/Claude) Fixed the energy dashboard's power graph showing "no data" for the whole day on some history backends: the "5minute" statistics period used a 30-second bucket step instead of 5 minutes, requesting 10x more buckets than needed.
* (Garfonso/Claude) Fixed the current power missing in the energy dashboard ("Stromquellen" on the summary tab and the "Jetzt" tab) while all other cards showed it: the power sensor picked for a grid/battery source was not passed on to those cards. Existing configurations are fixed automatically on start.
* (Garfonso/Claude) Devices that report a battery level (`value.battery`) now get a battery sensor entity, so the charge level is visible and can be graphed - previously only the low-battery warning was used. This also removes the "Unknown state BATTERY" log message. (#718)

### 6.1.2 (2026-07-20)
* (Garfonso/Claude) History and logbook no longer show duplicate adjacent entries when the history backend re-logs unchanged values (e.g. InfluxDB "still record the same values"). (#711)
* (Garfonso/Claude) Energy/statistics graphs no longer draw a phantom line into the future when the requested range ends after now (e.g. History carrying the last value forward).
* (Garfonso/Claude) A browser with a broken browser_mod id (e.g. `[object Object]` in its localStorage) no longer spams "Used invalid characters" warnings: the id is sanitized, the client is asked to pick a fresh id, and leftover invalid instance objects are cleaned up on start.
* (Garfonso/Claude) Fixed simple on/off lights with a separate read-only state (`ON_ACTUAL`): the real device state is subscribed again and pushed to the UI.

### 6.1.1 (2026-06-25)
* (Garfonso/Claude) Fixed a crash (adapter restart loop) when a room enum has no name; the area list no longer brings the adapter down.
* (Garfonso/Claude) Custom dialog: device classes are sorted with clearer labels (id + unit), missing classes were added, device/state class can be cleared, and `has_time`/`has_date` no longer cause spurious "unsaved changes".
* (Garfonso/Claude) Auto-detected temperature/humidity/illuminance sensors now report `state_class: measurement` (for HA statistics).
* (Garfonso/Claude) Custom dialog: device class is suggested from the state's unit, and state class from the unit, when unambiguous.

### 6.1.0 (2026-06-23)
* (Garfonso/Claude) Remove HA-App Banner on iPhone (#418).
* (Garfonso/Claude) New manual entity types `device_tracker` and `person` to show presence/GPS on the map, with object pickers for the presence and location states.
* (Garfonso/Claude) Manual `cover` entities can now be configured with object pickers (e.g. an automatic window), reusing the full cover logic.
* (Garfonso/Claude) Reorganized the user documentation into matching English and German pages under `docs/en` / `docs/de` (entities, cards & UI, features), linked from the README; development/build notes stay in the README.
* (Garfonso/Claude) Fixed history/logbook stopping to load after a while (a hung history request could permanently block all following ones).
* (Garfonso/Claude) Manual `lock` and `media_player` entities can now be configured with object pickers for their states.
* (Garfonso/Claude) Vacuum cleaners are now supported (auto-detection + manual object pickers): start/stop/pause, fan speed and battery.
* (Garfonso/Claude) New manual entity types `humidifier` and `water_heater`, configurable with object pickers.
* (Garfonso/Claude) Manual `light` and `climate` (thermostat) entities can now be configured with object pickers (brightness/colour/temperature, target/mode/…), reusing the full converters.
* (Garfonso/Claude) Fixed room and function being swapped in the auto-generated name of advanced lights.
* (Garfonso/Claude) Manual `device_tracker`/`person` entities can get a picture (entity_picture) from a fixed URL or a state, plus a battery level and (device_tracker) a source type.
* (Garfonso/Claude) More manual-entity options: cover tilt open/close/stop, light white/RGBW/CIE colour states, sensor state class, humidifier device class.
* (Garfonso/Claude) Manual `fan` entities now have object pickers (on/off, speed/preset, oscillation, direction).
* (Garfonso/Claude) Vacuum can show its map (URL or base64 state) as the entity picture.
* (Garfonso/Claude) Removed `plant`, `weblink` and `history_graph` from the manual entity types (no longer Home Assistant entity domains).

### 6.0.4 (2026-06-18)
* (Garfonso/Claude) Bound the number of history points fetched per request, so a large history graph can no longer overload the states database.
* (Garfonso/Claude) Manual entities on `system.*`/`script.*` objects (e.g. a JavaScript adapter state) no longer disappear after a restart. (#709)
* (Garfonso/Claude) Manual entities now honor the friendly name and icon set via the frontend's entity settings, and editing them no longer briefly reverts the change.

[Older changelogs can be found there](https://github.com/ioBroker/ioBroker.lovelace/blob/master/CHANGELOG_OLD.md)

## License

Copyright (c) 2019-2026, bluefox <dogafox@gmail.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.