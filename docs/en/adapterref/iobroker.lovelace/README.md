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
Used version of home-assistant-frontend@20260930.3
Version of Browser Mod: 3.3.0

### How to build the new Lovelace version
First of all, the actual https://github.com/home-assistant/frontend (dev branch) must be **manually** merged into https://github.com/GermanBluefox/home-assistant-polymer.git (***iob*** branch!).

All changes for ioBroker are marked with comment `// IoB`.
For now (20260930.3) following files were modified:
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
- `src/panels/profile/ha-profile-dashboard.ts` - hide security tab in user profile.
- `src/util/documentation-url.ts` - for link to iobroker help instead of home assistant.
- `src/html/index.html.template` - remove Safari smart app banner (apple-itunes-app meta) for HA iOS app (#418).
- `.husky/pre-commit` - remove git commit hooks.

After that checkout modified version in `./build` folder. Then.

1. go to ./build directory.
2. `git clone https://github.com/GermanBluefox/home-assistant-polymer.git` it is a fork of https://github.com/home-assistant/frontend.git, but some things are modified (see the file list earlier).
3. `cd home-assistant-polymer`
4. `git checkout master`
5. `pnpm install` (the frontend migrated from Yarn to pnpm; if pnpm is missing, `corepack enable` or `npm i -g pnpm@11.28.0`).
6. `pnpm exec gulp build-app` for release or `pnpm exec gulp develop-iob` for the debugging version. To build web after changes you can call `pnpm exec gulp webpack-dev-app` for faster build, but you need to call `build-app` anyway after the version is ready for use.
7. run script `hass_frontend/static_cards/newFrontend.sh` in adapter repo to update frontend (it assumes that the two repositories are next to each other in the same folder, if not, please adjust script, preferably with some parameter handling and make a PR, thanks :smile: )
8. Run `npm run rename` (renames and rewrites the copied frontend for ioBroker; it replaced the former `gulp rename` task).
9. Update the version in `README.md`.

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