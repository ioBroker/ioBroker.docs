![Logo](admin/tractive-gps.png)

# ioBroker.tractive-gps

[![GitHub license](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.tractive-gps)](https://github.com/iobroker-community-adapters/ioBroker.tractive-gps/blob/main/LICENSE)
[![Downloads](https://img.shields.io/npm/dm/iobroker.tractive-gps.svg)](https://www.npmjs.com/package/iobroker.tractive-gps)
![GitHub repo size](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.tractive-gps)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/tractive-gps/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)</br>
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.tractive-gps)
![GitHub commits since latest release (by date)](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.tractive-gps/latest)
![GitHub last commit](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.tractive-gps)
![GitHub issues](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.tractive-gps)

**Version:**

[![NPM version](https://img.shields.io/npm/v/iobroker.tractive-gps.svg)](https://www.npmjs.com/package/iobroker.tractive-gps)
![Current version in stable repository](https://iobroker.live/badges/tractive-gps-stable.svg)
![Number of Installations](https://iobroker.live/badges/tractive-gps-installed.svg)

## Disclaimer

All product and company names, logos, and trademarks mentioned in this project belong to their respective owners. Tractive and its associated names, logos, and trademarks are the property of Tractive GmbH or their respective owners. Their use is solely for identification and does not imply any affiliation with, sponsorship by, or endorsement from Tractive GmbH or its associated companies. This is a private, non-commercial project developed for recreational purposes.

## Sentry

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and instructions on disabling error reporting, please refer to the [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Use of Sentry reporting starts with js-controller 3.0.

## Description

The adapter connects ioBroker to a Tractive account and makes the current information about pets and GPS trackers available as ioBroker states. This enables locations, battery levels, connection states, pet information, and supported tracker functions to be used in automations and visualizations.

The adapter uses an unofficial Tractive service interface. A working Tractive account and an active subscription for the trackers are required. This community adapter is not affiliated with or supported by Tractive.

> [Deutsche Dokumentation](README_DE.md)

## Requirements

- Node.js 22.13 or newer
- js-controller 7.2.2 or newer
- Admin 7.8.23 or newer
- VIS 1, or VIS 2 version 2.12.8 or newer, when using an included widget
- A Tractive account with at least one associated tracker

## Features

- Retrieves the actual names and details of pets associated with the account.
- Provides current GPS coordinates, altitude, speed, position accuracy, distance from the configured ioBroker location, and last update time.
- Optionally resolves coordinates to a readable address.
- Provides battery level, charging state, used position source (`KNOWN_WIFI`/`GPS`), home/away status, online state, and power-saving status.
- Provides model, firmware, hardware version, capabilities, gender, birthday, height, weight, and other available information.
- Supports live tracking, LED, and buzzer commands when the tracker reports the corresponding capability.
- Stores all retrieved account, subscription, share, pet, tracker, position, and hardware data as a logical local state tree and as one complete JSON snapshot.
- Includes responsive cards for VIS 1 and VIS 2 with a pet image, interactive map, range display, tracker status, and command controls.
- Supports an image supplied by Tractive or a custom image uploaded to ioBroker.
- Detects missing or stale tracker data without automatically deleting existing objects.

## Configuration

Open the adapter instance and configure the following settings:

| Setting                           | Description                                                                                              |
| --------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Email                             | Email address of the Tractive account.                                                                   |
| Password                          | Password of the Tractive account. It is stored using ioBroker's standard encrypted configuration format. |
| Update interval                   | Time between regular position updates. Values between 2 and 60 minutes are available.                    |
| Resolve coordinates to an address | Requests a readable address for the current coordinates. Disable this option if no address is needed.    |

Use **Test connection** to verify the entered credentials. Save all settings with the normal ioBroker **Save** button at the bottom of the configuration page.

The password remains unchanged if the password field is left empty after the configuration has already been saved. Existing passwords using the older ioBroker encryption format are converted to the current AES format the next time the configuration is saved.

### Data update schedule

- Positions are refreshed according to the configured update interval.
- Battery and hardware information are refreshed every 15 minutes.
- Pet profiles, images, and other static details are refreshed during the daily full synchronization.
- A full synchronization is also performed after the adapter starts.

Tractive may temporarily limit requests with HTTP 429. The adapter spaces requests, pauses all requests when such a limit is reported, and retries automatically. A successful update is shown in `info.lastSuccessfulSync` and `info.dataFresh`.

## Objects and states

The most important objects are grouped as follows:

```text
tractive-gps.0
├── info
│   ├── connection
│   ├── dataFresh
│   ├── lastSync
│   ├── lastSuccessfulSync
│   ├── currentApi
│   ├── refresh
│   └── status
├── account.*
├── subscriptions.<subscription-id>.*
├── pets.<pet-id>
│   ├── info.*
│   ├── activity.*
│   └── media.*
├── trackers.<tracker-id>
│   ├── info.*
│   ├── status.*
│   ├── location.*
│   ├── hardware.*
│   └── commands.*
```

### Adapter information

- `info.connection`: Indicates whether the last synchronization was successful.
- `info.dataFresh`: Indicates whether current usable data is available.
- `info.lastSync`: Time of the last synchronization attempt.
- `info.lastSuccessfulSync`: Time of the last successful synchronization.
- `info.refresh`: Button for manually starting a complete synchronization.
- `info.status`: Current adapter status.
- `info.currentApi`: Complete JSON snapshot of the currently available Tractive data.

### Pets

The states below `pets.<pet-id>.*` contain useful pet profile information, tracker assignment, activity goals, and the profile picture. Empty and internal API fields are omitted.

### Trackers

The states below `trackers.<tracker-id>.*` contain tracker identification, operational and online status, position, position source, distance from the ioBroker system location, address, battery information, and supported commands. `location.sensorUsed` contains the Tractive position source. `status.home` is derived from `KNOWN_WIFI` or `GPS`. There is no duplicate `connectionType` state. The ioBroker latitude and longitude are configured in the system settings.

### Complete API data

Only values useful for scripts, automations, and visualizations are created as individual states. Empty values, API metadata, internal version fields, and duplicate representations are omitted. The complete unmodified combined response remains available as one JSON value in `info.currentApi`. Login passwords and access tokens are never added to it.

## Tracker commands

The following writable states are created only when supported by the selected tracker:

- `trackers.<tracker-id>.commands.liveTracking`
- `trackers.<tracker-id>.commands.led`
- `trackers.<tracker-id>.commands.buzzer`

Set the desired state to `true` or `false`. The state is acknowledged after Tractive accepts the command.

## VIS widgets

The adapter includes a classic `PetTrackerCard` for VIS 1 and a native React `PetTrackerCard` for VIS 2. Add one widget for each pet or tracker and assign the requested states in the widget settings.

The card can display:

- pet name, type, gender, age, and weight,
- tracker name and online state,
- pet image from the local `media.localProfilePictureUrl` state,
- interactive Leaflet/OpenStreetMap map,
- reported or manually configured position radius,
- battery level, position source, home/away status, and distance from ioBroker,
- last update, address, power-saving state, charging state, speed, altitude, and position accuracy,
- switches for buzzer, LED, and live tracking on supported trackers.

For the Tractive image, select `pets.<pet-id>.media.localProfilePictureUrl` as the image state. It contains the URL of the copy stored in the local ioBroker file storage. If no image is returned or it cannot be loaded, select or upload a custom image in the widget's **Appearance** section.

The map can automatically fit the complete accuracy or range circle. Minimum and maximum zoom, interaction, range source, and a manual radius can be configured in the widget. Displaying the map downloads map tiles from OpenStreetMap.

To use the command switches, assign the corresponding `trackers.<tracker-id>.commands.*` states in the widget's **Commands** section. Commands are disabled while editing the VIS view and become active in runtime mode.

## Privacy and security

- The password is stored using ioBroker's encrypted configuration mechanism.
- Access tokens are kept in memory and are refreshed automatically.
- Selected account and subscription information is stored in the logical object tree. The complete retrieved API data is stored locally in `info.currentApi`. Protect access to the ioBroker object tree accordingly.
- Passwords and access tokens are never added to the API state tree and remain protected by the encrypted configuration or in memory.
- Precise positions are stored locally in ioBroker states because they are required for the adapter's purpose.
- Reverse geocoding is optional and sends coordinates to Tractive's address service when enabled.
- Sentry error reporting follows the global ioBroker Sentry configuration.
- API response bodies and the complete local snapshot are not written to the adapter log or explicitly submitted to Sentry.

## Troubleshooting

- **Connection test fails:** Check the email address, password, internet connection, and outbound HTTPS access.
- **No pets or trackers appear:** Verify that the trackers are assigned to the configured Tractive account, then restart the adapter instance.
- **Data is not updated:** Check `info.status`, `info.dataFresh`, and `info.lastSuccessfulSync`.
- **HTTP 429 is reported:** Leave the instance running. The adapter pauses requests and retries automatically after the Tractive limit expires.
- **No address is shown:** Enable reverse geocoding in the adapter configuration.
- **A command is missing:** The tracker did not report the required capability.
- **The pet image is missing:** Assign `localProfilePictureUrl` to the widget or select a custom image.

## Developer documentation

Information for contributors is available in [Developer documentation](docs/DEVELOPMENT.md).

## Changelog
### 3.1.0 (2026-08-25)

- (xXBJXx) Addressed repository-checker findings for dependencies, metadata, documentation, and adapter-managed timers (#319).
- (xXBJXx) Added and correctly registered a classic VIS 1 pet tracker card alongside the native VIS 2 widget, including the pet image, Leaflet map, location and tracker details, automatic theme colors, and tracker command controls.

### 3.0.0 (2026-08-24)

- (xXBJXx) BREAKING: rewritten for Node.js 22, js-controller 7.2.2, and Admin 8.
- (xXBJXx) Configured Sentry through ioBroker's adapter integration (#4).
- (xXBJXx) Replaced stored authorization data with in-memory authentication, automatic token renewal, request validation, retry handling, and account-wide rate limiting (#16, #115, #213, #231).
- (xXBJXx) Added the `pets.*`, `trackers.*`, and health object structures.
- (xXBJXx) Fixed pet names and added all available pet profile states with corrected height and weight units.
- (xXBJXx) Fixed missing state definitions for API fields that were not known in advance (#81, #113, #305; supersedes #114 and #175).
- (xXBJXx) Replaced the duplicate API hierarchy with a curated account, subscription, pet, tracker, position, and hardware state tree while retaining the complete JSON snapshot.
- (xXBJXx) Restored `sensor_used` and distance-from-ioBroker information based on PR #3, added home/away information, and removed the duplicate `connectionType` state.
- (xXBJXx) Fixed Tractive CDN profile-picture URLs and added home/away status and distance to the VIS 2 card.
- (xXBJXx) Cached Tractive profile pictures in ioBroker so VIS 2 can display CDN files delivered as binary downloads.
- (xXBJXx) Fixed profile-picture storage by using a dedicated ioBroker `meta` file container.
- (xXBJXx) Added the local profile-picture URL, textual charging state, speed, and altitude to the curated states and VIS 2 card.
- (xXBJXx) Fixed recognition of relative ioBroker file URLs in `localProfilePictureUrl`.
- (xXBJXx) Added live tracking, LED, and buzzer commands for supported trackers.
- (xXBJXx) Added buzzer, LED, and live-tracking controls to the VIS 2 card.
- (xXBJXx) Reorganized the VIS 2 card into compact command, location, tracker, and pet sections.
- (xXBJXx) Updated the release tooling and added fixed-version Lerna support for the private npm workspaces.
- (xXBJXx) Rebuilt the adapter configuration for Admin 8 and removed the invalid jsonConfig configuration (#176).
- (xXBJXx) Added the VIS 2 `PetTrackerCard` widget with pet image, Leaflet/OpenStreetMap map, range display, and tracker information.
- (xXBJXx) Added support for Tractive profile images and custom ioBroker images.
- (xXBJXx) Added automatic light and dark theme colors to the VIS 2 widget.
- (xXBJXx) Added configurable map interaction, automatic range fitting, and minimum and maximum zoom.
- (xXBJXx) Switched password storage to ioBroker's server-side AES encryption and automatic migration of older passwords.
- (xXBJXx) Reduced recurring API traffic and added separate update intervals for positions, battery information, and static profile data.
- (xXBJXx) Added adaptive HTTP 429 handling, global request pauses, conservative retries, and cached address lookup.
- (xXBJXx) Migrated linting to ESLint 9 and `@iobroker/eslint-config` (#45).
- (xXBJXx) Added Node.js 24 to the CI test matrix (#116).
- (xXBJXx) Migrated automated npm releases to Trusted Publishing with GitHub OIDC (#169).
- (xXBJXx) Updated repository metadata and schema configuration, superseding maintenance PRs #214, #215, #216, and #291.
- (xXBJXx) Updated dependencies and workspace tooling, superseding PRs #91, #140, #147, #203, #211, #220, #256, #281, #298, #301, and #303.
- (xXBJXx) Updated tests, documentation, and privacy safeguards.

### 2.1.0 (2024-11-12)

- (mcm1957) Adapter requires Node.js 20 now.
- (mcm1957) Adapter requires js-controller 5.0.19 and Admin 6.17.14 now.
- (simatec) Adapter changed to meet responsive design rules.
- (mcm1957) Corrected an error in the jsonConfig reauthorization command.
- (mcm1957) Dependencies have been updated.

### 2.0.1 (2024-08-20)

- (bluefox) Fixed encryption of the access token.

### 2.0.0 (2024-08-18)

- (bluefox) BREAKING: credentials must be entered again.
- (bluefox) Removed old code and rewrote the GUI.
- (bluefox) Updated dependencies.

Earlier changes are documented in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## Credits

Originally created by [xXBJXx](https://github.com/xXBJXx) and maintained by the ioBroker community adapters organization.

## License

Copyright (c) 2023-2026 ioBroker Community Developers <iobroker-community-adapters@gmx.de>  
Copyright (c) 2023 xXBJXx <issi.dev.iobroker@gmail.com>

MIT License. See [LICENSE](LICENSE).
