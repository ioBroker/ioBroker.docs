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

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/hombach/iobroker.tibberlink/test-and-release.yml?branch=master&logo=github&style=flat-square)
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
New Feature: The adapter now supports direct local reading of the Tibber Pulse Sensor through your home network, allowing for real-time monitoring and data collection without relying solely on the cloud API.

If you're not currently a Tibber user, I would greatly appreciate it if you could use my referral link: [Tibber Referral Link](https://invite.tibber.com/mu8c82n5).

## Standard Configuration

- Begin by creating a new instance of the adapter.
- You'll also require an API token from Tibber, which you can obtain here: [Tibber Developer API](https://developer.tibber.com).
- Enter your Tibber API token in the standard settings and configure at least one line for live feed settings (select "None available").
- Save the settings and exit the configuration to restart the adapter; this step allows your home(s) to be queried the first time from the Tibber server.
- Return to the configuration screen and select the homes from which you wish to fetch real-time data using your Tibber Pulse. You can also select homes and disable the feed (Note: This works only if the hardware is installed and the Tibber server has verified the connection to Pulse).
- Note: If you have more than one home actively in your Tibber account you have to add all of them to get rid of error message caused by potentially not needed homes. Add them all and disable the options.
- You have the option to deactivate the retrieval of price data for today and tomorrow, for instance, if you only intend to utilize Pulse live feeds
- Optionally, you can enable the retrieval of historical consumption data. Please specify the number of datasets for hours, days, weeks, months, and years. You can use "0" to disable one or more of these intervals based on your preferences.
- Note: It's essential to be mindful of the dataset size, as excessively large requests may result in a lack of response from the Tibber Server. We recommend experimenting with the dataset size to ensure optimal functionality. Adjusting the intervals and dataset numbers can help strike the right balance between obtaining insightful data and maintaining server responsiveness. E.g. 48 is a quite good amount for hours.
- Save the settings.

## Calculator Configuration

- Now that the Tibber connection is up and running, you can also leverage the Calculator to incorporate additional automation features into the TibberLink adapter.
- The Calculator operates using channels, with each channel linked to a selected home.
- These channels can be activated or deactivated based on corresponding states.
- These states are designed to serve as external, dynamic inputs for TibberLink, allowing you to, for example, adjust the marginal cost ("TriggerPrice") from an external source or disable the calculator channel ("Active").
- The states of a calculator channel are positioned adjacent to the home states and named according to the channel number. Hereby the channelname choosen in admin screen is shown here to better identify your configurations.  
  ![Calculator States](docu/calculatorStates.png)
- The behavior of each channel is determined by its type: "best cost (LTF)", "best single hours (LTF)", "best hours block (LTF)" or "smart battery buffer".
- Each channel populates one or two external states as output, which has to be selected in the settings tab. For instance, this state might be "0_userdata.0.example_state" or any other writeable external state.
- If no external output state is selected, an internal state within the channel's range will be created.
- The values to be written to the output state can be defined in "value YES" and "value NO," e.g., "true" for boolean states or a number or text to be written.
- Outputs:
    - "Best cost": Utilizes the "TriggerPrice" state as input, producing a "YES" output every hour when the current Tibber energy cost is below the trigger price.
    - "Best single hours": Generates a "YES" output during the least expensive hours, with the number defined in the "AmountHours" state.
    - "Best hours block": Outputs "YES" during the most cost-effective block of hours, with the number of hours specified in the "AmountHours" state.  
      Additionally, the average total cost in the determined block is written to a state "AverageTotalCost" nearby the input states of this channel. Also start and end hour of the block is written to "BlockStartFullHour" and "BlockEndFullHour" as a result of the calculation.
    - "Best cost LTF": "Best cost" within a Limited Time Frame (LTF).
    - "Best single hours LTF": "Best single hours" within a Limited Time Frame (LTF).
    - "Best hours block LTF": "Best hours block" within a Limited Time Frame (LTF).
    - "Smart Battery Buffer": Utilize the "EfficiencyLoss" parameter to specify the efficiency loss of the battery system. The "EfficiencyLoss" parameter can range from 0 to 1, where 0 represents no efficiency loss and 1 represents complete efficiency loss. For example, a value of 0.25 indicates a 25% efficiency loss for a charge/discharge cycle.  
      Use the "AmountHours" parameter to input the desired number of hours for battery charging. The calculator will activate battery charging ("value YES") and deactivate battery feed ("value 2 NO") during the specified "AmountHours" cheapest hours. Conversely, it will deactivate battery charging ("value NO") and activate battery feed ("value 2 YES") during hours with the highest cost, provided the cost is higher than the highest total price among the cheap hours. In the remaining normal hours where energy buffering by the battery is not economically viable, both outputs will be switched off.
    - "Best percentage": Outputs "YES" during the least expensive hour and any other hours where the price falls within the percentage range specified in the "Percentage" settings state.
    - "Best percentage LTF": "Best percentage" within a Limited Time Frame (LTF).
- LTF channels: These operate similarly to standard channels but are active only within a time frame defined by the 'StartTime' and 'StopTime' state objects. After 'StopTime,' the channel automatically deactivates. 'StartTime' and 'StopTime' can span two calendar days, as Tibber does not provide data beyond a 48-hour window. Both states require a date-time string in ISO-8601 format with a timezone offset, e.g., '2024-12-24T18:00:00.000+01:00'." Additionally, the LTF channels feature a new state parameter called 'RepeatDays,' which defaults to 0. When 'RepeatDays' is set to a positive integer, the channel will repeat its cycle by incrementing both 'StartTime' and 'StopTime' by the specified number of days after 'StopTime' is reached. For example, set 'RepeatDays' to 1 for daily repetition.

### Hints

#### Inverse Usage

To obtain, for example, peak hours instead of optimal hours, simply invert the usage and parameters:
![Calculator States Inverse](docu/calculatorStatesInverse.png)
By swapping true <-> false, you will receive a true at a low cost in the first line and a true at a high cost in the second line (Channel names are not triggers and are still free to choose).

Attention: For peak single hours, such as in the example, you also need to adjust the number of hours. Original: 5 -> Inverse (24-5) = 19 -> You will obtain a true result during the 5 peak hours.

#### LTF channels

The calculation is performed for "multiday" data. As we only have information for "today" and "tomorrow" (available after approximately 13:00), the time scope is effectively limited to a maximum of 35 hours. However, it's crucial to be mindful of this behavior because the calculated result may/will change around 13:00 when new data for tomorrow's prices becomes available.

To observe this dynamic change in the time scope for a standard channel, you may opt for a Limited Time Frame (LTF) spanning several years. This is particularly useful for the "Best Single Hours LTF" scenario.

## Direct local poll of Pulse data

To make it work, you need to modify the web interface of the Bridge to remain permanently enabled.
marq24 has described how to do this excellently for his HomeAssistant integration here:

https://github.com/marq24/ha-tibber-pulse-local

If everything works correctly, the meter data will be written to IoBroker states every 2 seconds.

## Sentry

This adapter employs Sentry libraries to automatically report exceptions and code errors to the developers. For more details and information on how to disable error reporting, please consult the [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is initiated starting with js-controller 3.0.

## Donate

<a href="https://www.paypal.com/donate/?hosted_button_id=F7NM9R2E2DUYS"><img src="https://raw.githubusercontent.com/Hombach/ioBroker.tibberlink/master/docu/bluePayPal.svg" height="40"></a>  
If you enjoyed this project — or just feeling generous, consider buying me a beer. Cheers! :beers:

## Changelog

### 4.2.0 (2024-12-xx)

- (HombachC) add new calculator channels 'BestPercentage' and 'BestPercentageLTF' (#616)
- (HombachC) WIP add outputJSON for 'BestSingleHours' and 'BestSingleHoursLTF' (#592)
- (HombachC) code optimization

### 4.1.1 (2024-12-21)

- (HombachC) code cleanup
- (HombachC) fix translations
- (HombachC) fix chai-as-promised

### 4.1.0 (2024-12-15)

- (HombachC) enable local poll also without Token (#613)
- (HombachC) split jsonConfig.json to multiple files
- (HombachC) fix typo in translation handling
- (HombachC) bump cron

### 4.0.0 (2024-12-08)

- (HombachC) BREAKING: dropped support for ioBroker.admin < 7.0.0 because of ioBroker Responsive Design Initiative (#544)
- (HombachC) redesigned admin tab for calculator
- (HombachC) optimize translations, added more tooltips
- (HombachC) fix repeated calculation of LTF channels (#593)
- (HombachC) added BlockStart / BlockEnd as date string (#516)
- (HombachC) throttle sentry messaging
- (HombachC) add prices yesterday (#600)

### 3.5.4 (2024-12-01)

- (HombachC) add warning when LTF stop time isn't same or next day and provide docu
- (HombachC) fix error in calculator channel 'best single hours' (#594)
- (HombachC) intruduce 'iobroker/eslint-config' (#591)
- (HombachC) performance optimizations
- (HombachC) dependency updates

### 3.5.3 (2024-11-23)

- (HombachC) fix edge case in output state setup and usage
- (HombachC) optimzed state subscription
- (HombachC) update deprecated state calls
- (HombachC) add await to delObjectAsync
- (HombachC) harmonize project tools
- (HombachC) dependency updates

### 3.5.2 (2024-10-30)

- (HombachC) add verification for YES/NO 2 values in calculator (#547)
- (HombachC) optimized responsive design (#544)
- (HombachC) migrate eslint to >9.x
- (HombachC) switch to ES2022 code
- (HombachC) adapted to new API constraints (#546)
- (HombachC) replace deprecated setStateAsync by setState

### 3.5.1 (2024-10-05)

- (HombachC) changed to less feed disconnection warnings in log (#445)
- (HombachC) fix error in output2 of smart battery buffer (#538)
- (HombachC) update deprecated state calls
- (HombachC) dependency updates

### 3.5.0 (2024-10-02)

- (HombachC) update adapter core
- (HombachC) fix error in SML decoder
- (HombachC) add 2 new SML scale factor codes (#535)
- (HombachC) dependency updates

### 3.4.10 (2024-09-16)

- (HombachC) add verification of poll interval (#518)
- (HombachC) bumb date-fns to 4.0.0

### 3.4.9 (2024-09-15)

- (HombachC) add adjustable Bridge poll intervall (#518)
- (HombachC) add node.js 22 to the adapter testing (#519)
- (HombachC) add docu link to config screen (#504)
- (HombachC) repository cleanup
- (HombachC) dependency updates

### 3.4.8 (2024-08-16)

- (HombachC) updated axios because of vulnerability
- (HombachC) added tests for Node.js 22

### 3.4.7 (2024-08-10)

- (HombachC) adapter checker detected optimizations (#493)
- (HombachC) improved error message (#490)

### 3.4.6 (2024-08-07)

- (HombachC) Catch wrong OBIS Codes, probably caused by Pulse communication errors
- (HombachC) code cleanup

### 3.4.5 (2024-07-31)

- (HombachC) decode meter mode 4 for local Tipper Pulse poll (#477)
- (HombachC) decode meter mode 1 for local Tipper Pulse poll (#478)
- (HombachC) fixed wrong Pulse local status names (voltage)
- (HombachC) add docu on local Pulse poll config screen (#479)
- (HombachC) code cleanup
- (HombachC) bump dependencies

### 3.4.4 (2024-07-28)

- (HombachC) local poll of data - change units Wh to kWh and round to 0,1kWh (#469)

### 3.4.3 (2024-07-14)

- (HombachC) added unit to Pulse temperature and round to 0,1°C
- (HombachC) added unit to Pulse battery voltage and round to 100mV
- (HombachC) added unit to Pulse uptime
- (HombachC) added state with Pulse uptime as human readable string
- (HombachC) reinitialize some TibberLocal states upon adapter startup
- (HombachC) code optimisation
- (HombachC) bump dependencies

### 3.4.2 (2024-07-13)

- (HombachC) fix typos in units
- (HombachC) fix type mismatch for state objects (#455)
- (HombachC) code optimisation

### 3.4.1 (2024-07-13)

- (HombachC) fix logging error
- (HombachC) bump dependencies

### 3.4.0 (2024-07-12)

- (HombachC) add mode for local poll of Pulse data (#201)

### 3.3.3 (2024-07-04)

- (HombachC) fix sentry notified possible error
- (HombachC) try to fix startup error (#444)

### 3.3.2 (2024-06-21)

- (HombachC) fix 2 security issues in dependencies
- (HombachC) fix sentry notified possible error

### 3.3.1 (2024-06-13)

- (HombachC) fix small sentry discovered error (#418)
- (HombachC) added note for multihomes to documentation (#422)

### 3.3.0 (2024-06-05)

- (HombachC) implements optional, obsolete api call for total historical cost, incl. grid fees (#405)
- (HombachC) Updates @iobroker/adapter-core from 3.1.6
- (HombachC) Updates @iobroker/types from 5.0.19 to 6.0.0

### 3.2.1 (2024-06-03)

- (HombachC) added unique endpoint string

### 3.2.0 (2024-06-03)

- (HombachC) IMPORTANT: adapter components had been blocked by Tibber - you have to update!
- (HombachC) bump base dependencies
- (HombachC) adapter will use internal output states for calculator if none defined in configuration (#325)
- (HombachC) implement first run mode in calculator to reduce system load
- (HombachC) internal optimisations

### 3.1.2 (2024-05-20)

- (HombachC) deleting unused temp home objects after adapter config (#393)
- (HombachC) bump dependencies

### 3.1.1 (2024-05-16)

- (HombachC) throttle down reconnection speed
- (HombachC) logging optimizations (#396; #217)
- (HombachC) adaptations to newer environment (#394; #395)

### 3.1.0 (2024-05-07)

- (HombachC) enable manual control of configured outputs when automation is deactivated (#334)
- (HombachC) fix not working LTF Channel when using too short LTF (#383)
- (HombachC) code optimisations
- (HombachC) update adapter-core to 3.1.4
- (HombachC) bump dependencies

### 3.0.1 (2024-04-20)

- (HombachC) updated adapter testing
- (HombachC) bump dependencies

### 3.0.0 (2024-04-15)

- (HombachC) BREAKING: dropped support for node.js 16 (#368)
- (HombachC) BREAKING: js-controller >= 5 is required
- (HombachC) changed to tier 2 as data provider
- (HombachC) corrected io-package.json according to new schema (#368)
- (HombachC) update typescript to 5.4.5
- (HombachC) update adapter-core to 3.0.6

### Old Changes see [CHANGELOG OLD](CHANGELOG_OLD.md)

## License

GNU General Public License v3.0 only

Copyright (c) 2023-2024 C.Hombach <TibberLink@homba.ch>
