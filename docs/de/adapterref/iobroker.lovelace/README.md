---
chapters: {"pages":{"en/adapterref/iobroker.lovelace/README.md":{"title":{"en":"ioBroker.lovelace"},"content":"en/adapterref/iobroker.lovelace/README.md"},"en/adapterref/iobroker.lovelace/docs/en/README.md":{"title":{"en":"ioBroker.lovelace — Documentation"},"content":"en/adapterref/iobroker.lovelace/docs/en/README.md"},"en/adapterref/iobroker.lovelace/docs/en/entities.md":{"title":{"en":"Entities"},"content":"en/adapterref/iobroker.lovelace/docs/en/entities.md"},"en/adapterref/iobroker.lovelace/docs/en/cards_and_ui.md":{"title":{"en":"Custom cards, themes & UI tips"},"content":"en/adapterref/iobroker.lovelace/docs/en/cards_and_ui.md"},"en/adapterref/iobroker.lovelace/docs/en/features.md":{"title":{"en":"Features"},"content":"en/adapterref/iobroker.lovelace/docs/en/features.md"},"en/adapterref/iobroker.lovelace/docs/en/theme_migration.md":{"title":{"en":"Migrating themes (2026 frontend update)"},"content":"en/adapterref/iobroker.lovelace/docs/en/theme_migration.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.lovelace/README.md
title: ioBroker.lovelace
hash: VC1XPNU05i1xpFKeOVE4onp8DHpqPco7kok22QNOj9I=
---
![Logo](../../../en/adapterref/iobroker.lovelace/admin/lovelace.png)

![Anzahl der Installationen](https://iobroker.live/badges/lovelace-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.lovelace.svg)
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

Verwendete Version von home-assistant-frontend\@20260930.3, Version des Browser-Mods: 3.3.0

### So erstellen Sie die neue Lovelace-Version

Zunächst muss der eigentliche Branch <https://github.com/home-assistant/frontend> (dev branch) **manuell** in den [Branch https://github.com/GermanBluefox/home-assistant-polymer.git](https://github.com/GermanBluefox/home-assistant-polymer.git) ( _**iob**_ branch!) zusammengeführt werden.

Alle Änderungen für ioBroker sind mit einem Kommentar versehen. `// IoB` Bis zum 30.09.2026 wurden folgende Dateien geändert:

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
- `src/panels/profile/ha-profile-dashboard.ts` - Sicherheits-Tab im Benutzerprofil ausblenden.
- `src/util/documentation-url.ts` - für einen Link zur ioBroker-Hilfe anstelle von Home Assistant.
- `src/html/index.html.template` - Entfernen des Safari Smart App Banners (apple-itunes-app meta) für die HA iOS App (#418).
- `.husky/pre-commit` - Git-Commit-Hooks entfernen.

Danach checken Sie die geänderte Version aus. `./build` Ordner. Dann.

1. Wechseln Sie in das Verzeichnis ./build.
2. `git clone https://github.com/GermanBluefox/home-assistant-polymer.git` Es handelt sich um eine Abspaltung von <https://github.com/home-assistant/frontend.git> , allerdings wurden einige Dinge geändert (siehe die Dateiliste weiter oben).
3. `cd home-assistant-polymer`
4. `git checkout master`
5. `pnpm install` (Das Frontend wurde von Yarn auf pnpm migriert; falls pnpm fehlt, `corepack enable` oder `npm i -g pnpm@11.28.0`).
6. `pnpm exec gulp build-app` zur Veröffentlichung oder `pnpm exec gulp develop-iob` für die Debugging-Version. Um die Webseite nach Änderungen neu zu erstellen, können Sie Folgendes aufrufen: `pnpm exec gulp webpack-dev-app` für einen schnelleren Build, aber Sie müssen anrufen `build-app` jedenfalls sobald die Version einsatzbereit ist.
7. Skript ausführen `hass_frontend/static_cards/newFrontend.sh` im Adapter-Repository, um das Frontend zu aktualisieren (es wird davon ausgegangen, dass sich die beiden Repositories im selben Ordner befinden; falls nicht, passen Sie bitte das Skript an, vorzugsweise mit Parameterbehandlung, und erstellen Sie einen Pull Request, danke :smile: ).
8. Laufen `npm run rename` (Benennt das kopierte Frontend für ioBroker um und überarbeitet es; es ersetzte das vorherige) `gulp rename` Aufgabe).
9. Aktualisieren Sie die Version in `README.md` Die

## Changelog

<!--
	PLACEHOLDER for the next version:
	### **WORK IN PROGRESS**
    ### for next frontend update, update of auto entities card will be necessary!
-->
### 7.4.1 (2026-10-22)
* (Garfonso/Claude) Conditional cards and the `visibility` of cards, badges, sections and views work again: the new frontend asks the server to evaluate the conditions (`subscribe_condition`), which the adapter answered with "Unknown request" before, so everything conditional stayed hidden.

### 7.4.0 (2026-10-21)
* (Garfonso/Claude) A manually mapped `binary_sensor` has a checkbox next to the device class to invert its state, for an ioBroker state that is true when the device is not in the shown state.
* (Garfonso/Claude) A manually mapped `binary_sensor` on a state whose role ends in `.unreach` is inverted, not only on the old role `indicator.unreach`.
* (Garfonso/Claude) The extra entities of a detected device (connectivity, battery, error, maintenance, working, power, energy) are named after the device, so they are no longer all called "UNREACH" or similar.
* (Garfonso/Claude) The labels of those extra entities are translated, and a name you wrote on the ioBroker object yourself is kept.
* (Garfonso/Claude) An `input_datetime` on a state without a date (null) is unknown instead of a dummy date, and no longer warns about it. (#768)

### 7.3.0 (2026-10-18)
* (Garfonso/Claude) Updated the Home Assistant frontend to 20260930.3: the map no longer flickers while loading history and its tiles stay cached, and the digital-clock card can take its font from the theme.
* (Garfonso/Claude) The map tile proxy now checks the access token the frontend sends, instead of serving anyone who can reach the port.
* (Garfonso/Claude) Static files are found again when the frontend asks for them with a cache buster, so the map keeps its style and its icons.
* (Garfonso/Claude) Dropped the map sprite proxy: since the new map style the frontend brings the map icons along itself.
* (Garfonso/Claude) New entity type `image`: an ioBroker state holding a picture can be mapped to it, and the picture can then be picked as a card or view background.
* (Garfonso/Claude) A unit typed into the object settings is kept, and defaults are only filled in for the entity type that uses them.
* (Garfonso/Claude) Blinds that only have up, down and stop buttons keep both arrows usable, and after a stop they report an unknown position instead of staying "opening".
* (Garfonso/Claude) Templates are rendered with the variables a card sends along (needed by `custom:template-entity-row`) and know the area and device functions.
* (Garfonso/Claude) Updated the type detector: a device that is assigned to a function enum as a whole now also detects its channels (a dimmer in the function "Light", for example), and consumption is read from the documented role `value.energy.consumed`.
* (Garfonso/Claude) Updated Browser Mod to 3.3.0: the profile page shows again which browser-specific default dashboard Browser Mod manages.
* (Garfonso/Claude) Templates can format dates: `now()` behaves like a datetime (`strftime`, `hour`, `timestamp()`), plus `as_datetime`, `today_at` and the `timestamp_*` filters.

### 7.2.5 (2026-10-16)
* (Garfonso/Claude) Editing the themes no longer loses the selected theme, and broken theme YAML cannot be saved any more.
* (Garfonso/Claude) Custom cards are cached again, so a dashboard in the ioBroker app loads them without asking the server every time. (#755)

### 7.2.4 (2026-10-09)
* (Garfonso/Claude) Custom cards that consist of several files (like refreshable-picture-card) work again. (#755)

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