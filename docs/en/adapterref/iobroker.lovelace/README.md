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
### 7.2.4 (2026-10-09)
* (Garfonso/Claude) Custom cards that consist of several files (like refreshable-picture-card) work again. (#755)

### 7.2.3 (2026-10-08)
* (Garfonso/Claude) common.states written as a string ("Inland:Inland;Ausland:Ausland") is understood again, so such an input_select offers its options.
* (Garfonso/Claude) Writing lovelace.0.notifications.add creates one notification, not two.

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