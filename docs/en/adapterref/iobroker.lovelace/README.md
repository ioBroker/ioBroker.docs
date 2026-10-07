---
chapters: {"pages":{"en/adapterref/iobroker.lovelace/README.md":{"title":{"en":"ioBroker.lovelace"},"content":"en/adapterref/iobroker.lovelace/README.md"},"en/adapterref/iobroker.lovelace/docs/en/README.md":{"title":{"en":"ioBroker.lovelace — Documentation"},"content":"en/adapterref/iobroker.lovelace/docs/en/README.md"},"en/adapterref/iobroker.lovelace/docs/en/entities.md":{"title":{"en":"Entities"},"content":"en/adapterref/iobroker.lovelace/docs/en/entities.md"},"en/adapterref/iobroker.lovelace/docs/en/cards_and_ui.md":{"title":{"en":"Custom cards, themes & UI tips"},"content":"en/adapterref/iobroker.lovelace/docs/en/cards_and_ui.md"},"en/adapterref/iobroker.lovelace/docs/en/features.md":{"title":{"en":"Features"},"content":"en/adapterref/iobroker.lovelace/docs/en/features.md"},"en/adapterref/iobroker.lovelace/docs/en/theme_migration.md":{"title":{"en":"Migrating themes (2026 frontend update)"},"content":"en/adapterref/iobroker.lovelace/docs/en/theme_migration.md"}}}
---
![Logo](admin/lovelace.png)
# ioBroker.lovelace

![Number of Installations](http://iobroker.live/badges/lovelace-installed.svg)
![Number of Installations](http://iobroker.live/badges/lovelace-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.lovelace.svg)](https://www.npmjs.com/package/iobroker.lovelace)

![Test and Release](https://github.com/ioBroker/iobroker.lovelace/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/lovelace/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.lovelace.svg)](https://www.npmjs.com/package/iobroker.lovelace)

## lovelace adapter for ioBroker

With this adapter, you can build visualization for ioBroker with Home Assistant Lovelace UI.

## Documentation

* 📘 [English documentation](/#/docs/adapterref/iobroker.lovelace/docs/en/README.md)
* 📗 [Deutsche Dokumentation](https://github.com/ioBroker/ioBroker.lovelace/blob/master/docs/de/README.md)

The documentation covers configuration (auto / manual entities), panels & special entities (alarm, timer, weather, map, video, …), custom cards, themes, icons, notifications, voice control and troubleshooting.

## Development

### Original sources for lovelace
Used sources are here https://github.com/GermanBluefox/home-assistant-polymer .

### Todo
Security must be taken from the current user and not from default_user.

### Version
Used version of home-assistant-frontend@20260826.7
Version of Browser Mod: 3.2.3

### How to build the new Lovelace version
First of all, the actual https://github.com/home-assistant/frontend (dev branch) must be **manually** merged into https://github.com/GermanBluefox/home-assistant-polymer.git (***iob*** branch!).

All changes for ioBroker are marked with comment `// IoB`.
For now (20260826.7) following files were modified:
- `build-scripts/gulp/app.js` - Add new gulp task develop-iob
- `build-scripts/gulp/rspack.js` - Add new gulp task rspack-dev-app
- `build-scripts/rspack.cjs` - disable source maps in prod build to reduce emitted file count.
- `src/data/icons.ts` - keep old icons, for now.
- `src/data/weather.ts` - add support to display weather icon from url.
- `src/dialogs/more-info/const.ts` - remove weather state & history, if is image
- `src/dialogs/more-info/ha-more-info-dialog.ts` - remove entity settings button and tab
- `src/dialogs/more-info/ha-more-info-history.ts` - remove `show more` link in history
- `src/dialogs/more-info/ha-more-info-logbook.ts` - remove `show more` link in logbook
- `src/dialogs/more-info/controls/more-info-weather.ts` - add support to display weather icon from url.
- `src/dialogs/voice-command-dialog/ha-voice-command-dialog.ts` - disable configuration of voice assistants
- `src/entrypoints/core.ts` - add no auth option
- `src/panels/lovelace/cards/hui-weather-forecast-card.ts` - add support to display weather icon from url.
- `src/panels/lovelace/entity-rows/hui-weather-entity-row.ts` - add support to display weather icon from url with auth.
- `src/panels/lovelace/hui-root.ts` - added notification button, disable manage dashboards link, hide add (device/automation/area/person) button, open edit-panel dialog for lovelace boards, live dashboard title from hass.panels
- `src/layouts/hass-router-page.ts` - guard updatePageEl against undefined route during rebuild (panel rename crash).
- `src/panels/config/dashboard/ha-config-dashboard.ts` - hide settings sections (automations, apps, voice assistants, system, people, tip).
- `src/panels/config/config-sections.ts` - hide integrations tab in devices & services, land devices & services tile on /config/devices.
- `src/panels/config/tools/ha-panel-tools.ts` - remove yaml, events and assist tabs from developer tools.
- `src/panels/config/tools/tools-router.ts` - default to states tab (yaml removed).
- `src/panels/config/info/ha-config-info.ts` - hide doc/credits/community/license links in about (keep keyboard shortcuts).
- `src/panels/config/lovelace/dashboards/ha-config-lovelace-dashboards.ts` - show fixed panels (incl. browser-mod) in built-in dashboards list.
- `src/panels/profile/ha-panel-profile.ts` - hide security tab in user profile.
- `src/util/documentation-url.ts` - for link to iobroker help instead of home assistant.
- `src/html/index.html.template` - remove Safari smart app banner (apple-itunes-app meta) for HA iOS app (#418).
- `.husky/pre-commit` - remove git commit hooks.

After that checkout modified version in `./build` folder. Then.

1. go to ./build directory.
2. `git clone https://github.com/GermanBluefox/home-assistant-polymer.git` it is a fork of https://github.com/home-assistant/frontend.git, but some things are modified (see the file list earlier).
3. `cd home-assistant-polymer`
4. `git checkout master`
5. `yarn install`
6. `gulp build-app` for release or `gulp develop-iob` for the debugging version. To build web after changes you can call `webpack-dev-app` for faster build, but you need to call `build-app` anyway after the version is ready for use.
7. run script `hass_frontend/static_cards/newFrontend.sh` in adapter repo to update frontend (it assumes that the two repositories are next to each other in the same folder, if not, please adjust script, preferably with some parameter handling and make a PR, thanks :smile: )
8. Run `npm run rename` (renames and rewrites the copied frontend for ioBroker; it replaced the former `gulp rename` task).
9. Update the version in `README.md`.

## Changelog

<!--
	PLACEHOLDER for the next version:
	### **WORK IN PROGRESS**
    ### for next frontend update, update of auto entities card will be necessary!
-->
### 7.2.2 (2026-10-07)
* (Garfonso/Claude) The energy dashboard calculates the costs from a price entity again; they stayed at 0.00. (#749)
* (Garfonso/Claude) The calendar REST endpoint answers with start/end as objects, the way Home Assistant does, so cards like Calendar Card Pro show the events. (#756)
* (Garfonso/Claude) An unregistered browser_mod browser no longer comes back after a restart of the adapter.
* (Garfonso/Claude) Settings page: the responsive sizes of all fields are complete, and six texts are translated in every language. (#725)
* (Garfonso/Claude) Dependencies updated; a secure web server speaks HTTP/2 now (@iobroker/webserver 3.2).
* (Garfonso/Claude) The adapter reports the port it listens on to js-controller 8, so a new instance can be given a free one.

### 7.2.0 (2026-09-30)
* (Garfonso/Claude) The energy dashboard works with a currency symbol in the ioBroker settings; it stayed on "loading" before. (#749)
* (Garfonso/Claude) The user settings and browser_mod offer the ioBroker users again instead of the adapters. The logbook names the user of a change, or the adapter that made it - the setting which of both to show is gone. (#751)
* (Garfonso/Claude) browser_mod settings (sidebar title, default dashboard, per browser settings) survive a restart of the adapter. (#751)
* (Garfonso/Claude) The browser_mod configuration page shows the browsers again ("last connected" broke it).
* (Garfonso/Claude) The http settings the frontend asks an administrator for are answered, instead of logging an unknown request.

### 7.1.1 (2026-09-27)
* (Garfonso/Claude) The /state/ url serves the value of a state again, instead of answering with an error. (#723)

### 7.1.0 (2026-09-21)
* (Garfonso/Claude) Removed endpoints and services that neither the frontend nor Home Assistant offer any more (camera_thumbnail, conversation/agent/info, /api/person, sensor/numeric_device_classes, image/list, fan.set_speed).
* (Garfonso/Claude) The action picker only offers services the adapter can really execute.
* (Garfonso/Claude) Removed the old shopping list api, the shopping list has been a todo list for a long time.
* (Garfonso/Claude) The buttons of a timer entity work now (start, cancel, finish, change).
* (Garfonso/Claude) Energy costs of a meter counting Wh are no longer a thousand times too high.
* (Garfonso/Claude) Weather icons of daswetter 4 are shown again.
* (Garfonso/Claude) Weather cards set up in the editor show the forecast (weather/subscribe_forecast).
* (Garfonso/Claude) Browser Mod no longer asks to reload because of a version mismatch.
* (Garfonso/Claude) Shipped cards (browser_mod) get the adapter version in their url, so an update is loaded instead of the cached copy.
* (Garfonso/Claude) Service calls that fail now always answer, instead of leaving the frontend waiting.
* (Garfonso/Claude) homeassistant.update_entity rereads the states of the entity instead of failing.

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