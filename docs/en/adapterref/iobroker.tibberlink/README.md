![Logo](admin/tibberlink.png)

# ioBroker.tibberlink

[![NPM version](https://img.shields.io/npm/v/iobroker.tibberlink?style=flat-square)](https://www.npmjs.com/package/iobroker.tibberlink)
[![Downloads](https://img.shields.io/npm/dm/iobroker.tibberlink?label=npm%20downloads&style=flat-square)](https://www.npmjs.com/package/iobroker.tibberlink)
![node-lts](https://img.shields.io/node/v-lts/iobroker.tibberlink?style=flat-square)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/iobroker.tibberlink?label=npm%20dependencies&style=flat-square)

![GitHub](https://img.shields.io/github/license/hombach/iobroker.tibberlink?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/hombach/iobroker.tibberlink?logo=github&style=flat-square)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/hombach/iobroker.tibberlink?logo=github&style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/hombach/iobroker.tibberlink?logo=github&style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/hombach/iobroker.tibberlink?logo=github&style=flat-square)

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/hombach/iobroker.tibberlink/test-and-release.yml?branch=main&logo=github&style=flat-square)
[![CodeQL](https://github.com/hombach/ioBroker.tibberlink/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/hombach/ioBroker.tibberlink/actions/workflows/codeql-analysis.yml)
[![Appveyor-CI](https://ci.appveyor.com/api/projects/status/github/hombach/ioBroker.tibberlink?branch=master&svg=true)](https://ci.appveyor.com/project/hombach/iobroker-tibberlink)
[![SNYK Known Vulnerabilities](https://snyk.io/test/github/hombach/ioBroker.tibberlink/badge.svg)](https://snyk.io/test/github/hombach/ioBroker.tibberlink)

## Versions

![Beta](https://img.shields.io/npm/v/iobroker.tibberlink.svg?color=red&label=beta)
![Stable](https://iobroker.live/badges/tibberlink-stable.svg)
![Installed](https://iobroker.live/badges/tibberlink-installed.svg)

[![NPM](https://nodei.co/npm/iobroker.tibberlink.png?downloads=true)](https://nodei.co/npm/iobroker.tibberlink/)

## Adapter for Utilizing TIBBER energy data in ioBroker

This adapter facilitates the connection of data from your Tibber account's API to be used within ioBroker, whether for a single home or multiple residences.

If you're not currently a Tibber user, I would greatly appreciate it if you could use my referral link: [Tibber Referral Link](https://invite.tibber.com/mu8c82n5).

## Standard Configuration

-   Begin by creating a new instance of the adapter.
-   You'll also require an API token from Tibber, which you can obtain here: [Tibber Developer API](https://developer.tibber.com).
-   Enter your Tibber API token in the standard settings and configure at least one line for live feed settings (select "None available").
-   Save the settings and exit the configuration to restart the adapter; this step allows your home(s) to be queried from the Tibber server.
-   Return to the configuration screen and select the homes from which you wish to fetch real-time data using your Tibber Pulse. You can also select homes and disable the feed (Note: This works only if the hardware is installed and the Tibber server has verified the connection to Pulse).
-   Save the settings.

## Calculator Configuration

-   Now that the Tibber connection is up and running, you can also leverage the Calculator to incorporate additional automation features into the TibberLink adapter.
-   The Calculator operates using channels, with each channel linked to a selected home.
-   These channels can be activated or deactivated based on corresponding states.
-   These states are designed to serve as external, dynamic inputs for TibberLink, allowing you to, for example, adjust the marginal cost ("TriggerPrice") from an external source or disable the calculator channel ("Active").
-   The states of a calculator channel are positioned adjacent to the home states and named according to the channel number.
    ![Calculator States](admin/calculatorStates.png)
-   The behavior of each channel is determined by its type: "best cost," "best single hours," or "best hours block".
-   Each channel populates an external state as output, which has to be selected in the settings tab. For instance, this state might be "0_userdata.0.example_state" or any other writable external state.
-   The values to be written to the output state can be defined in "value YES" and "value NO," e.g., "true" for boolean states or a number or text to be written.
-   Outputs:
    -   "Best cost": Utilizes the "TriggerPrice" state as input, and the output is "YES" every hour when the current Tibber energy cost is below the trigger price.
    -   "Best single hours": The output is "YES" during the cheapest number of hours, with the number defined in the "AmountHours" state.
    -   "Best hours block": The output is "YES" during the best block of hours, with the number of hours defined in the "AmountHours" state.

## Notes

This adapter employs Sentry libraries to automatically report exceptions and code errors to the developers. For more details and information on how to disable error reporting, please consult the [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is initiated starting with js-controller 3.0.

## Changelog

! Note that missing version entries are typically dependency updates for improved security.

### 1.4.3 (2023-11-xx) WORK in PROGRESS

-   (HombachC) fix possible type error in first calculator calls notified by Sentry
-   (HombachC) preparations for other calculator channel times than 24h (#153)
-   (HombachC) bump dependencies

### 1.4.2 (2023-11-03)

-   (HombachC) complete rework of task scheduling for more precise pull timing (#149)
-   (HombachC) critical vulnerability fix for axios
-   (HombachC) fix debug message typos, code optimisations in calculator
-   (HombachC) fix type error in price average calculation notified by Sentry
-   (HombachC) fix error in update prices tomorrow - possible false positive

### 1.4.1 (2023-10-25)

-   (HombachC) implement forced update of all data after adapter restart (#155)
-   (HombachC) Bump actions/setup-node from 3.8.1 to 4.0.0 (#157)
-   (HombachC) remove node.js 16 actions - dependency updates

### 1.4.0 (2023-10-24)

-   (HombachC) implement min/max states (#131)
-   (HombachC) fix error with ignored calculator channel deaktivations (#143)
-   (HombachC) optimize translation handling, code cleanup

### 1.3.1 (2023-10-21)

-   (HombachC) fix initialisiation of channel states (#141)
-   (HombachC) change message "reconnect successful" to level info (#80)
-   (HombachC) documentation tweaks - dependency updates

### 1.3.0 (2023-10-20)

-   (HombachC) implement tibber calculator mode "best hours block" (#16)
-   (HombachC) handle empty calculator destination states - detected by sentry

### 1.2.0 (2023-10-18)

-   (HombachC) implement tibber calculator mode "best single hours" (#16)
-   (HombachC) changed i18n files to inline translations, single files aren't update compatible (#128)
-   (HombachC) fixed error in initial read of calculator states (#129)

### 1.1.2 (2023-10-15)

-   (HombachC) fix timing error in calculator

### 1.1.1 (2023-10-14)

-   (HombachC) fix error in startup of additional channels

### 1.1.0 (2023-10-14)

-   (HombachC) implement tibber calculator mode "best price" (#16)
-   (HombachC) precised pull times of current cost
-   (HombachC) reduced error messages (#80)
-   (HombachC) extend documentation
-   (HombachC) update adapter-core

### 1.0.0 (2023-10-05)

-   (HombachC) Increase to the first major release, as now a stable level is reached
-   (HombachC) Code cleanup

### 0.4.2 (2023-10-03)

-   (HombachC) fixed error with polling multiple homes live data (#108)
-   (HombachC) Lots of dependency updates; code optimizations

### 0.4.1 (2023-09-24)

-   (HombachC) Hardened 2 typeerrors uppon sentry recognition
-   (HombachC) Fix error with not deleted averages of tomorrow pricing (#95)
-   (HombachC) preparations for tibber calculator

### 0.4.0 (2023-09-20)

-   (HombachC) Added daily average price values (#89)

### 0.3.3 (2023-09-17)

-   (HombachC) Fixed false positive connection message (#87)
-   (HombachC) Updated translations with ChatGPT
-   (HombachC) preparations for tibber calculator

### 0.3.2 (2023-09-14)

-   (HombachC) Fixed error when starting adapter first time (#82)
-   (HombachC) Fixed error in admin config from 0.3.0 (#81)

### 0.3.1 (2023-09-13)

-   (HombachC) Mitigate error in admin config from 0.3.0 (#81)
-   (HombachC) Change logging of TibberFeed errors from type error to type warn - because of too many downtimes of Tibber server (#80)

### 0.3.0 (2023-09-12)

-   (HombachC) BREAKING: change Pulse usage to be configurable for all homes seperately (#41)
-   (HombachC) optimize code again to mitigate set state timing for long JSON states (#68)
-   (HombachC) preparations for tibber calculator

### 0.2.7 (2023-09-07)

-   (HombachC) reducing polls at Tibber server by precheck of current price data
-   (HombachC) preparations for tibber calculator

### 0.2.6 (2023-09-04)

-   (HombachC) fix error with boolean states

### 0.2.5 (2023-09-03)

-   (HombachC) optimize code to mitigate set state timing for long JSON states (#68)

### 0.2.4 (2023-08-30)

-   (HombachC) enable correct price poll also for adapter running in different timezones (#63)

### 0.2.3 (2023-08-27)

-   (HombachC) fix error in 0.2.2 in start conditions of adapter

### 0.2.2 (2023-08-24)

-   (HombachC) reducing polls at Tibber server by precheck of known data
-   (HombachC) code optimizations
-   (HombachC) fix config screen (#55)

### 0.2.1 (2023-08-21)

-   (HombachC) double timeout for Tibber server queries

### 0.2.0 (2023-08-18)

-   (HombachC) introduces JSONs for prices sorted by price ascending
-   (HombachC) fix stupid error for obsolete next day pricing (#23, #50)

### 0.1.10 (2023-08-15)

-   (HombachC) bump dependencies, code cleanups
-   (HombachC) preparations for tibber calculator
-   (HombachC) mitigate multi homes & pulse problems (#41)
-   (HombachC) add documentation to config screen (#47)

### 0.1.9 (2023-08-14)

-   (HombachC) optimizing fetching homes list (#32) after Tibber server error, restart adapter in case of trouble

### 0.1.8 (2023-08-12)

-   (HombachC) bump dev-dependencies, fix eslint/prettier issue

### 0.1.7 (2023-08-11)

-   (HombachC) code cleanup, fix error for obsolete next day pricing (#23)
-   (HombachC) add another try/catch while fetching homes list (#32)

### 0.1.6 (2023-07-30)

-   (HombachC) add units for live data, bump adapter-core to 3.x

### 0.1.5 (2023-07-18)

-   (HombachC) fix error in sentry logging

### 0.1.4 (2023-07-17)

-   (HombachC) BREAKING: encrypted API-Token in ioBroker
-   (HombachC) rearranged configuration options
-   (HombachC) fixed bug in state generation

### 0.1.3 (2023-07-17)

-   (HombachC) all log messages in English
-   (HombachC) remove unused state change handler
-   (HombachC) fixed state roles

### 0.1.2 (2023-07-17)

-   (HombachC) round grid consumption meter values to Wh accuracy
-   (HombachC) hide unused checkboxes in config
-   (HombachC) fix snyc and appveyor

### 0.1.1 (2023-07-16)

-   (HombachC) remove release script and dev-server

### 0.1.0 (2023-07-14)

-   (HombachC) initial version

## License

GNU General Public License v3.0 only

Copyright (c) 2023 Hombach <TibberLink@homba.ch>
