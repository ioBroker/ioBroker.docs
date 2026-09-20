---
chapters: {"pages":{"en/adapterref/iobroker.lovelace/README.md":{"title":{"en":"ioBroker.lovelace"},"content":"en/adapterref/iobroker.lovelace/README.md"},"en/adapterref/iobroker.lovelace/docs/en/README.md":{"title":{"en":"ioBroker.lovelace — Documentation"},"content":"en/adapterref/iobroker.lovelace/docs/en/README.md"},"en/adapterref/iobroker.lovelace/docs/en/entities.md":{"title":{"en":"Entities"},"content":"en/adapterref/iobroker.lovelace/docs/en/entities.md"},"en/adapterref/iobroker.lovelace/docs/en/cards_and_ui.md":{"title":{"en":"Custom cards, themes & UI tips"},"content":"en/adapterref/iobroker.lovelace/docs/en/cards_and_ui.md"},"en/adapterref/iobroker.lovelace/docs/en/features.md":{"title":{"en":"Features"},"content":"en/adapterref/iobroker.lovelace/docs/en/features.md"},"en/adapterref/iobroker.lovelace/docs/en/theme_migration.md":{"title":{"en":"Migrating themes (2026 frontend update)"},"content":"en/adapterref/iobroker.lovelace/docs/en/theme_migration.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.lovelace/README.md
title: ioBroker.lovelace
hash: rGZelXk3DQUggqhf0BudzWrVmQ0Zb67GftaUymW+MtM=
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

Verwendete Version von home-assistant-frontend\@20260826.7; Browser-Mod-Version: 3.2.3

### So erstellen Sie die neue Lovelace-Version

Zunächst muss der eigentliche Branch <https://github.com/home-assistant/frontend> (dev branch) **manuell** in den [Branch https://github.com/GermanBluefox/home-assistant-polymer.git](https://github.com/GermanBluefox/home-assistant-polymer.git) ( _**iob**_ branch!) zusammengeführt werden.

Alle Änderungen für ioBroker sind mit einem Kommentar versehen. `// IoB` Bis zum 26.08.2026 wurden folgende Dateien geändert:

- `build-scripts/gulp/app.js` - Füge die neue Gulp-Aufgabe develop-iob hinzu
- `build-scripts/gulp/rspack.js` - Neue Gulp-Aufgabe rspack-dev-app hinzufügen
- `build-scripts/rspack.cjs` - Deaktivieren Sie Source Maps im Produktions-Build, um die Anzahl der erzeugten Dateien zu reduzieren.
- `src/data/icons.ts` - Behaltet vorerst die alten Icons bei.
- `src/data/weather.ts` - Unterstützung für die Anzeige eines Wettersymbols aus einer URL hinzufügen.
- `src/dialogs/more-info/const.ts` - Wetterstatus und -verlauf entfernen, falls es sich um ein Bild handelt
- `src/dialogs/more-info/ha-more-info-dialog.ts` - Schaltfläche und Registerkarte „Entitätseinstellungen“ entfernen
- `src/dialogs/more-info/ha-more-info-history.ts` - entfernen `show more` Verbindung zur Geschichte
- `src/dialogs/more-info/ha-more-info-logbook.ts` - entfernen `show more` Link im Logbuch
- `src/dialogs/more-info/controls/more-info-weather.ts` - Unterstützung für die Anzeige eines Wettersymbols aus einer URL hinzufügen.
- `src/dialogs/voice-command-dialog/ha-voice-command-dialog.ts` - Konfiguration von Sprachassistenten deaktivieren
- `src/entrypoints/core.ts` - Option "Keine Authentifizierung" hinzufügen
- `src/panels/lovelace/cards/hui-weather-forecast-card.ts` - Unterstützung für die Anzeige eines Wettersymbols aus einer URL hinzufügen.
- `src/panels/lovelace/entity-rows/hui-weather-entity-row.ts` - Unterstützung für die Anzeige eines Wettersymbols per URL mit Authentifizierung hinzufügen.
- `src/panels/lovelace/hui-root.ts` - Benachrichtigungsschaltfläche hinzugefügt, Link „Dashboards verwalten“ deaktiviert, Schaltfläche „Hinzufügen“ (Gerät/Automatisierung/Bereich/Person) ausgeblendet, Bearbeitungsdialog für Lovelace-Boards geöffnet, Live-Dashboard-Titel aus hass.panels
- `src/layouts/hass-router-page.ts` - Schutz von updatePageEl vor undefinierten Routen während des Neuaufbaus (Absturz durch Umbenennung des Panels).
- `src/panels/config/dashboard/ha-config-dashboard.ts` - Ausblenden der Einstellungsabschnitte (Automatisierungen, Apps, Sprachassistenten, System, Personen, Tipp).
- `src/panels/config/config-sections.ts` - Die Registerkarte „Integrationen“ unter „Geräte & Dienste“ ausblenden und die Kachel „Geräte & Dienste“ unter /config/devices platzieren.
- `src/panels/config/tools/ha-panel-tools.ts` - Entfernen der Registerkarten YAML, Ereignisse und Unterstützung aus den Entwicklertools.
- `src/panels/config/tools/tools-router.ts` - Standardmäßig wird die Registerkarte "Status" angezeigt (YAML entfernt).
- `src/panels/config/info/ha-config-info.ts` - Die Links zu Dokumentation/Credits/Community/Lizenz im Info-Bereich ausblenden (Tastenkombinationen beibehalten).
- `src/panels/config/lovelace/dashboards/ha-config-lovelace-dashboards.ts` - feste Panels (inkl. Browser-Mod) in der Liste der integrierten Dashboards anzeigen.
- `src/panels/profile/ha-panel-profile.ts` - Sicherheits-Tab im Benutzerprofil ausblenden.
- `src/util/documentation-url.ts` - für einen Link zur ioBroker-Hilfe anstelle von Home Assistant.
- `src/html/index.html.template` - Entfernen des Safari Smart App Banners (apple-itunes-app meta) für die HA iOS App (#418).
- `.husky/pre-commit` - Git-Commit-Hooks entfernen.

Danach checken Sie die geänderte Version aus. `./build` Ordner. Dann.

1. Wechseln Sie in das Verzeichnis ./build.
2. `git clone https://github.com/GermanBluefox/home-assistant-polymer.git` Es handelt sich um eine Abspaltung von <https://github.com/home-assistant/frontend.git> , allerdings wurden einige Dinge geändert (siehe die Dateiliste weiter oben).
3. `cd home-assistant-polymer`
4. `git checkout master`
5. `yarn install`
6. `gulp build-app` zur Veröffentlichung oder `gulp develop-iob` für die Debugging-Version. Um die Webseite nach Änderungen neu zu erstellen, können Sie Folgendes aufrufen: `webpack-dev-app` für einen schnelleren Build, aber Sie müssen anrufen `build-app` jedenfalls sobald die Version einsatzbereit ist.
7. Skript ausführen `hass_frontend/static_cards/newFrontend.sh` im Adapter-Repository, um das Frontend zu aktualisieren (es wird davon ausgegangen, dass sich die beiden Repositories im selben Ordner befinden; falls nicht, passen Sie bitte das Skript an, vorzugsweise mit Parameterbehandlung, und erstellen Sie einen Pull Request, danke :smile: ).
8. Laufen `npm run rename` (Benennt das kopierte Frontend für ioBroker um und überarbeitet es; es ersetzte das vorherige) `gulp rename` Aufgabe).
9. Aktualisieren Sie die Version in `README.md` Die

## Changelog

<!--
	PLACEHOLDER for the next version:
	### **WORK IN PROGRESS**
    ### for next frontend update, update of auto entities card will be necessary!
-->
### 7.0.0 (2026-09-18)
* (Garfonso/Claude) Fixed custom cards that fetch history directly (e.g. the windrose card) crashing with "TypeError: t.callback is not a function": a one-shot history request was answered like a subscription. (#722)
* (Garfonso/Claude) `instances.hideSidebar` / `hideHeader` no longer fall back to the default on an adapter restart. (#733)
* (Garfonso/Claude) User names from ioBroker (person list, logbook user list) are resolved like every other name, so a multilingual `common.name` cannot break those views. (#731)
* (Garfonso/Claude) The dashboard now uses the configured adapter language instead of the browser language. A language picked in the frontend profile still wins.
* (Garfonso/Claude) Custom entities: new expert table at the end of the custom dialog that fills any attribute from a freely picked state.
* (@GermanBluefox) Security: fixed a path traversal in the card and icon routes (`/cards/`, `/hacsfiles/`, `/local/custom_ui/`, `/static/icons/`) that allowed reading arbitrary files without authentication. All static file routes now verify that the resolved path stays inside the served folder.
* (Garfonso/Claude) The map no longer shows an "API KEY REQUIRED" watermark: CARTO now requires a key for its tiles, so the base map comes from OpenStreetMap through the adapter (which caches the tiles).
* (Garfonso/Claude) Expert attributes: a state of type `array`/`object` now arrives as an array/object instead of its JSON string, so cards like flex-table-card can iterate it.
* (Garfonso/Claude) Custom cards: uploading a new version of a card over the old file works now. Their url carries the file's timestamp, so the browser loads the new one instead of its cached copy.
* (Garfonso/Claude) Custom cards: the admin page shows the version a card reports about itself.
* (Garfonso/Claude) The frontend is served precompressed (brotli) and cached for good, its entry points (index, service worker) are revalidated instead. This cuts the traffic of a remote connection (e.g. ioBroker.pro) roughly to a quarter and no longer hides a frontend update.
* (Garfonso/Claude) Everything else (custom cards, the index page, api answers) is compressed on the fly now.
* (Garfonso/Claude) The instance settings were rebuilt with jsonConfig: a real YAML editor for the themes, working theme dropdowns, upload/delete of custom cards with their version, and a searchable entity list. Needs admin 7.9.11 or newer. (#587)
* (Garfonso/Claude) The new frontend draws its map with vector tiles: the adapter serves them, together with the TileJSON, the label fonts and the icon sprites, and answers the access-token request the frontend makes for them.
* (Garfonso/Claude) Vacuums no longer claim the battery feature Home Assistant removed. A manually configured vacuum now gets the same battery sensor entity as an auto-detected one, so the charge level stays visible.
* (Garfonso/Claude) Updated Browser Mod to 3.2.3 (from 2.13.5). Its settings are split in two pages now: the sidebar entry holds the settings of this browser, the registered browsers and the global/user settings moved to a page of their own behind it.
* (Garfonso/Claude) Fixed global and per-user Browser Mod settings never being stored: those requests carry no browser id and were dropped.
* (Garfonso/Claude) A default dashboard set in Browser Mod is honored now, for a user, for one browser or globally.
* (Garfonso/Claude) Energy dashboard: the costs of import and export are calculated from the price configured for a source, so a fixed price (or a price entity) no longer shows 0.00.
* (Garfonso/Claude) Custom cards: the adapter watches its cards folder, so a card added, replaced or deleted anywhere (file browser, settings page, command line) is picked up without pressing anything - a browser reload still imports a brand new card.
* (Garfonso/Claude) Updated the dependencies (TypeScript 6, type-detector 6, webserver 3, suncalc 2, …) and replaced gulp with a plain node script.
* (Garfonso/Claude) New device types of type-detector 6 become entities: fans and air purifiers (`fan`), pumps (a switch plus its measurements), air quality monitors (one sensor per value), contact sensors, CO alarms, pressure and flow sensors.
* (Garfonso/Claude) Thermostats that only heat or only cool keep their target temperature: type-detector 6 reports that setpoint as `SET_HEATING` / `SET_COOLING` instead of `SET`.
* (Garfonso/Claude) Fixed the sun entity's elevation and azimuth with suncalc 2, which answers in degrees and measures the azimuth from north.
* (Garfonso/Claude) Custom cards: the file selector deletes a card now, the table is titled as the overview of the installed cards, and a link leads to the cards folder in the ioBroker file browser.
* (Garfonso/Claude) Updated the Home Assistant frontend to 20260826.7: new alert card, date on the clock card, search in the media browser, more tile features (vacuum fan speed, light effects, thermostat humidity) and the map now uses sharper vector tiles.
* (Garfonso/Claude) Statistics are converted into the unit the frontend asks for: an energy meter counting in Wh is no longer drawn as if it counted kWh, and the same for a power sensor in W. (#741)
* (Garfonso/Claude) Repository checker: the missing translations of the expert attribute settings were added in all languages, the license section links to the LICENSE file, and the history timeout uses the adapter's own timer. (#725)

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

## License

The full license text is in [LICENSE](https://github.com/ioBroker/ioBroker.lovelace/blob/master/LICENSE).

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