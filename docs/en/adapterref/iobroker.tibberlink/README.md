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
-   Save the settings and exit the configuration to restart the adapter; this step allows your home(s) to be queried the first time from the Tibber server.
-   Return to the configuration screen and select the homes from which you wish to fetch real-time data using your Tibber Pulse. You can also select homes and disable the feed (Note: This works only if the hardware is installed and the Tibber server has verified the connection to Pulse).
-   You have the option to deactivate the retrieval of price data for today and tomorrow, for instance, if you only intend to utilize Pulse live feeds
-   Optionally, you can enable the retrieval of historical consumption data. Please specify the number of datasets for hours, days, weeks, months, and years. You can use "0" to disable one or more of these intervals based on your preferences.
-   Note: It's essential to be mindful of the dataset size, as excessively large requests may result in a lack of response from the Tibber Server. We recommend experimenting with the dataset size to ensure optimal functionality. Adjusting the intervals and dataset numbers can help strike the right balance between obtaining insightful data and maintaining server responsiveness. E.g. 48 is a quite good amount for hours.
-   Save the settings.

## Calculator Configuration

-   Now that the Tibber connection is up and running, you can also leverage the Calculator to incorporate additional automation features into the TibberLink adapter.
-   The Calculator operates using channels, with each channel linked to a selected home.
-   These channels can be activated or deactivated based on corresponding states.
-   These states are designed to serve as external, dynamic inputs for TibberLink, allowing you to, for example, adjust the marginal cost ("TriggerPrice") from an external source or disable the calculator channel ("Active").
-   The states of a calculator channel are positioned adjacent to the home states and named according to the channel number. Hereby the channelname choosen in admin screen is shown here to better identify your configurations.  
    ![Calculator States](docu/calculatorStates.png)
-   The behavior of each channel is determined by its type: "best cost," "best single hours," or "best hours block".
-   Each channel populates an external state as output, which has to be selected in the settings tab. For instance, this state might be "0_userdata.0.example_state" or any other writeable external state.
-   The values to be written to the output state can be defined in "value YES" and "value NO," e.g., "true" for boolean states or a number or text to be written.
-   Outputs:
    -   "Best cost": Utilizes the "TriggerPrice" state as input, producing a "YES" output every hour when the current Tibber energy cost is below the trigger price.
    -   "Best single hours": Generates a "YES" output during the least expensive hours, with the number defined in the "AmountHours" state.
    -   "Best hours block": Outputs "YES" during the most cost-effective block of hours, with the number of hours specified in the "AmountHours" state.
    -   "Best cost LTF": "Best cost" within a Limited Time Frame (LTF).
    -   "Best single hours LTF": "Best single hours" within a Limited Time Frame (LTF).
    -   "Best hours block LTF": "Best hours block" within a Limited Time Frame (LTF).
    -   "Smart Battery Buffer": Utilize the "EfficiencyLoss" parameter to specify the efficiency loss of the battery system. Use the "AmountHours" parameter to input the desired number of hours for battery charging. The calculator will activate battery charging ("value YES") and deactivate battery feed ("value 2 NO") during the specified "AmountHours" cheapest hours. Conversely, it will deactivate battery charging ("value NO") and activate battery feed ("value 2 YES") during hours with the highest cost, provided the cost is higher than the highest total price among the cheap hours. In the remaining normal hours where energy buffering by the battery is not economically viable, both outputs will be switched off.
-   LTF channels: Function similarly to standard channels but only operate within a time frame defined by the "StartTime" and "StopTime" state objects. After "StopTime," the channel deactivates itself. "StartTime" and "StopTime" may span over several days. The states must be filled with a date-time string in ISO-8601 format with a timezone offset, such as: "2023-11-17T21:00:00.000+01:00".

### Hints

#### Inverse Usage:

To obtain, for example, peak hours instead of optimal hours, simply invert the usage and parameters:
![Calculator States Inverse](docu/calculatorStatesInverse.png)
By swapping true <-> false, you will receive a true at a low cost in the first line and a true at a high cost in the second line (Channel names are not triggers and are still free to choose).

Attention: For peak single hours, such as in the example, you also need to adjust the number of hours. Original: 5 -> Inverse (24-5) = 19 -> You will obtain a true result during the 5 peak hours.

#### LTF channels:

The calculation is performed for "multiday" data. As we only have information for "today" and "tomorrow" (available after approximately 13:00), the time scope is effectively limited to a maximum of 35 hours. However, it's crucial to be mindful of this behavior because the calculated result may/will change around 13:00 when new data for tomorrow's prices becomes available.

To observe this dynamic change in the time scope for a standard channel, you may opt for a Limited Time Frame (LTF) spanning several years. This is particularly useful for the "Best Single Hours LTF" scenario.

## Notes

This adapter employs Sentry libraries to automatically report exceptions and code errors to the developers. For more details and information on how to disable error reporting, please consult the [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is initiated starting with js-controller 3.0.

## Donate

<a href="https://www.paypal.com/donate/?hosted_button_id=F7NM9R2E2DUYS"><img src="https://raw.githubusercontent.com/Hombach/ioBroker.tibberlink/main/docu/bluePayPal.svg" height="40"></a>  
If you enjoyed this project — or just feeling generous, consider buying me a beer. Cheers! :beers:

## Changelog

! Note that missing version entries are typically dependency updates for improved security.

### 1.8.0 (2023-12-14)

-   (HombachC) implement optional disable of price pull (#232)
-   (HombachC) implement price categorization algorithm for battery buffer applications (#193)
-   (HombachC) Fix 2 errors in pull of prices tomorrow (#235, #232)
-   (HombachC) changed Tibber link in config

### 1.7.2 (2023-12-07)

-   (HombachC) implemented dynamic raise of feed reconnect (#225)
-   (HombachC) small bugfix in pricecalls
-   (HombachC) first changes for "smart battery buffer" (#193)
-   (HombachC) update typescript to 5.3.3

### 1.7.1 (2023-12-04)

-   (HombachC) added hint for consumption data in documentation (#223)
-   (HombachC) mitigate error handling (#217)
-   (HombachC) added description to object Features/RealTimeConsumptionEnabled (#224)
-   (HombachC) bump dependencies

### 1.7.0 (2023-11-30)

-   (HombachC) implement getting historical consumption data from Tibber Server (#163)
-   (HombachC) fix error in adapter unload
-   (HombachC) some code optimisations

### 1.6.1 (2023-11-26)

-   (HombachC) cleanup in documentation and translation handling

### 1.6.0 (2023-11-26)

-   (HombachC) fixed major bug in 1.5.0, not working calculator channels (#212)
-   (HombachC) implement limit calculations to a time frame (#153)
-   (HombachC) fix error of missing price data upon not working tibber server connect at adapter start (#204)
-   (HombachC) fixed possible error with wrong price date in multi home systems
-   (HombachC) fixed possible type error, notified by Sentry
-   (HombachC) added some documentation for inverse use of channels (#202)
-   (HombachC) added Sentry statistics
-   (HombachC) optimize translation handling
-   (HombachC) bump dependencies

### 1.5.0 (2023-11-13)

-   (HombachC) implement calculator channel names (#186)
-   (HombachC) fix error in cron jobs (#190)
-   (HombachC) remove not used calculator channel state objects (#188)
-   (HombachC) code optimizations
-   (HombachC) optimize translation handling

### 1.4.3 (2023-11-08)

-   (HombachC) fix possible type error in first calculator calls notified by Sentry
-   (HombachC) change state object description of production values (#167)
-   (HombachC) optimize pulse feed error message in case of error as object (#176)
-   (HombachC) preparations for calculator object names (#186)
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

### Old Changes see [CHANGELOG OLD](CHANGELOG_OLD.md)

## License

GNU General Public License v3.0 only

Copyright (c) 2023 Hombach <TibberLink@homba.ch>
