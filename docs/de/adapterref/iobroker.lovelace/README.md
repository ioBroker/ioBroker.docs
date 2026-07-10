---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.lovelace/README.md
title: ioBroker.lovelace
hash: 4G4upW+1HwUgzb8VJT9mbK15u5J0x90mW5PcDJEzVQs=
---
![Logo](../../../en/adapterref/iobroker.lovelace/admin/lovelace.png)

![Anzahl der Installationen](http://iobroker.live/badges/lovelace-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.lovelace.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.lovelace.svg)

# IoBroker.lovelace
![Test und Freigabe](https://github.com/ioBroker/iobroker.lovelace/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/lovelace/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

## Lovelace-Adapter für ioBroker
Mit diesem Adapter können Sie Visualisierungen für ioBroker mit der Home Assistant Lovelace-Benutzeroberfläche erstellen.

## Dokumentation
* 📘 [Englische Dokumentation](docs/en/README.md)
* 📗 [Deutsche Dokumentation](docs/de/README.md)

Die Dokumentation umfasst Konfiguration (automatische/manuelle Elemente), Bedienfelder und spezielle Elemente (Alarm, Timer, Wetter, Karte, Video, …), benutzerdefinierte Karten, Designs, Symbole, Benachrichtigungen, Sprachsteuerung und Fehlerbehebung.

## Entwicklung
### Originalquellen für Lovelace
Die verwendeten Quellen finden Sie hier: https://github.com/GermanBluefox/home-assistant-polymer.

### Todo
Die Sicherheitseinstellungen müssen vom aktuellen Benutzer und nicht vom Standardbenutzer übernommen werden.

### Version
Verwendete Version von home-assistant-frontend@20260527.7; Browser-Mod-Version: 2.13.5

### So erstellen Sie die neue Lovelace-Version
Zunächst muss der eigentliche Branch https://github.com/home-assistant/frontend (dev branch) **manuell** in den Branch https://github.com/GermanBluefox/home-assistant-polymer.git (***iob*** branch!) zusammengeführt werden.

Alle Änderungen für ioBroker sind mit dem Kommentar `// IoB` gekennzeichnet.
Bis zum 27.05.2026 wurden folgende Dateien geändert:

- `build-scripts/gulp/app.js` - Neue Gulp-Aufgabe „develop-iob“ hinzufügen
- `build-scripts/gulp/rspack.js` - Neue Gulp-Aufgabe rspack-dev-app hinzufügen
- `build-scripts/rspack.cjs` - Source Maps im Produktions-Build deaktivieren, um die Anzahl der erzeugten Dateien zu reduzieren.
- `src/data/icons.ts` - Alte Icons vorerst beibehalten.
- `src/data/weather.ts` - Unterstützung zum Anzeigen eines Wettersymbols aus einer URL hinzufügen.
- `src/dialogs/more-info/const.ts` - Wetterstatus und -verlauf entfernen, falls es sich um ein Bild handelt
- `src/dialogs/more-info/ha-more-info-dialog.ts` - Schaltfläche und Registerkarte für Entitätseinstellungen entfernen
- `src/dialogs/more-info/ha-more-info-history.ts` - Entfernt den Link „Mehr anzeigen“ in der Historie
- `src/dialogs/more-info/ha-more-info-logbook.ts` - Link „Mehr anzeigen“ im Logbuch entfernen
- `src/dialogs/more-info/controls/more-info-weather.ts` - Unterstützung zum Anzeigen eines Wettersymbols über eine URL hinzufügen.
- `src/dialogs/voice-command-dialog/ha-voice-command-dialog.ts` - Konfiguration von Sprachassistenten deaktivieren
- `src/entrypoints/core.ts` - Option "Keine Authentifizierung" hinzufügen
- `src/panels/lovelace/cards/hui-weather-forecast-card.ts` - Unterstützung zum Anzeigen eines Wettersymbols aus einer URL hinzufügen.
- `src/panels/lovelace/entity-rows/hui-weather-entity-row.ts` - Unterstützung für die Anzeige des Wettersymbols per URL mit Authentifizierung hinzufügen.
- `src/panels/lovelace/hui-root.ts` - Benachrichtigungsschaltfläche hinzugefügt, Link „Dashboards verwalten“ deaktiviert, Schaltfläche „Hinzufügen“ (Gerät/Automatisierung/Bereich/Person) ausgeblendet, Bearbeitungsdialog für Lovelace-Boards geöffnet, Live-Dashboard-Titel aus hass.panels
- `src/layouts/hass-router-page.ts` - Schutz von updatePageEl vor undefinierter Route während des Neuaufbaus (Absturz beim Umbenennen von Panels).
- `src/panels/config/dashboard/ha-config-dashboard.ts` - Einstellungsabschnitte ausblenden (Automatisierungen, Apps, Sprachassistenten, System, Personen, Tipp).
- `src/panels/config/ha-panel-config.ts` - Registerkarte „Integrationen“ in „Geräte & Dienste“ ausblenden, Kachel „Geräte & Dienste“ unter „/config/devices“ platzieren.
- `src/panels/config/developer-tools/ha-panel-developer-tools.ts` - Entfernt die Registerkarten YAML, Ereignisse und Unterstützung aus den Entwicklertools.
- `src/panels/config/developer-tools/developer-tools-router.ts` - Standardmäßig wird die Registerkarte "states" angezeigt (YAML entfernt).
- `src/panels/config/info/ha-config-info.ts` - Links zu Dokumentation/Credits/Community/Lizenz in der Info-Seite ausblenden (Tastenkombinationen beibehalten).
- `src/panels/config/lovelace/dashboards/ha-config-lovelace-dashboards.ts` - zeigt feste Panels (inkl. browser-mod) in der Liste der integrierten Dashboards an.
- `src/panels/profile/ha-panel-profile.ts` - Sicherheits-Tab im Benutzerprofil ausblenden.
- `src/util/documentation-url.ts` - für einen Link zur iobroker-Hilfe anstelle der Home Assistant-Hilfe.
- `src/html/index.html.template` - Entfernen des Safari Smart App Banners (apple-itunes-app meta) für die HA iOS App (#418).
- `.husky/pre-commit` - Git-Commit-Hooks entfernen.

Anschließend die geänderte Version im Ordner `./build` auschecken. Dann.

1. Wechseln Sie in das Verzeichnis ./build.
2. `git clone https://github.com/GermanBluefox/home-assistant-polymer.git` Es handelt sich um einen Fork von https://github.com/home-assistant/frontend.git, aber einige Dinge wurden geändert (siehe die Dateiliste weiter oben).
3. `cd home-assistant-polymer`
4. `git checkout master`
5. `yarn install`
6. Verwenden Sie `gulp build-app` für die Release-Version oder `gulp develop-iob` für die Debugging-Version. Um die Webanwendung nach Änderungen zu erstellen, können Sie `webpack-dev-app` für einen schnelleren Build aufrufen. Sie müssen jedoch in jedem Fall `build-app` ausführen, sobald die Version einsatzbereit ist.
7. Führe das Skript `hass_frontend/static_cards/newFrontend.sh` im Adapter-Repository aus, um das Frontend zu aktualisieren (es wird davon ausgegangen, dass sich die beiden Repositories im selben Ordner befinden; falls nicht, passe das Skript bitte an, vorzugsweise mit Parameterbehandlung, und erstelle einen Pull Request, danke :smile: ).
8. Führe den `gulp rename`-Task aus.
9. Aktualisieren Sie die Versionsangabe in der Datei `README.md`.

## Changelog

<!--
	PLACEHOLDER for the next version:
	### **WORK IN PROGRESS**
    ### for next frontend update, update of auto entities card will be necessary!
-->
### **WORK IN PROGRESS**
* (Garfonso/Claude) History and logbook no longer show duplicate adjacent entries when the history backend re-logs unchanged values (e.g. InfluxDB "still record the same values"). (#711)
* (Garfonso/Claude) Docs: added a complete near-default theme example that removes the bell. (#705)
* (Garfonso/Claude) Energy/statistics graphs no longer draw a phantom line into the future when the requested range ends after now (e.g. InfluxDB carrying the last value forward).
* (Garfonso/Claude) Use the adapter's own timers (auto-cleaned on stop) and added the missing Russian translation for one setting. (#712)

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

### 6.0.3 (2026-06-18)
* (Garfonso/Claude) Manually mapped objects outside `alias.0` no longer disappear after a restart when "only generate from alias" is active. (#704)
* (Garfonso/Claude) Limit concurrent history requests to avoid overloading the states database connection.
* (Garfonso/Claude) Fixed a crash in the map card caused by history updates without attributes.
* (Garfonso/Claude) Removed the browser tab title setting; set the dashboard title instead.
* (Garfonso/Claude) Calendar card no longer flickers/reloads in a loop when the calendar source updates frequently.

### 6.0.2 (2026-06-17)
* (Garfonso/Claude) Reduced object-database load (skip our own internal objects, yield during processing) and removed leftover debug logging.
* (Garfonso/Claude) browser_mod re-applies its settings (e.g. hidden sidebar) after a browser registers, so it no longer needs an F5 (hopefully).
* (Garfonso/Claude) Above ~50 referenced states the adapter subscribes to all states at once and filters itself, to reduce database load.
* (Garfonso/Claude) Statistics history is fetched in pages, so a large energy/history request can no longer overload the states database.

[Older changelogs can be found there](CHANGELOG_OLD.md)

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