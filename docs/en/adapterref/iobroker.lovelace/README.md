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

* 📘 [English documentation](docs/en/README.md)
* 📗 [Deutsche Dokumentation](docs/de/README.md)

The documentation covers configuration (auto / manual entities), panels & special entities (alarm, timer, weather, map, video, …), custom cards, themes, icons, notifications, voice control and troubleshooting.

## Development

### Original sources for lovelace
Used sources are here https://github.com/GermanBluefox/home-assistant-polymer .

### Todo
Security must be taken from the current user and not from default_user.

### Version
Used version of home-assistant-frontend@20260527.7
Version of Browser Mod: 2.13.5

### How to build the new Lovelace version
First of all, the actual https://github.com/home-assistant/frontend (dev branch) must be **manually** merged into https://github.com/GermanBluefox/home-assistant-polymer.git (***iob*** branch!).

All changes for ioBroker are marked with comment `// IoB`.
For now (20260527.1) following files were modified:
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
- `src/panels/config/ha-panel-config.ts` - hide integrations tab in devices & services, land devices & services tile on /config/devices.
- `src/panels/config/developer-tools/ha-panel-developer-tools.ts` - remove yaml, events and assist tabs from developer tools.
- `src/panels/config/developer-tools/developer-tools-router.ts` - default to states tab (yaml removed).
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
8. Run `gulp rename` task.
9. Update the version in `README.md`.

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
