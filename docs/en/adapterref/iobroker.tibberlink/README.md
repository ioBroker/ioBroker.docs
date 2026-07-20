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

## Sentry

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information on how to disable error reporting, see <a href="https://github.com/ioBroker/plugin-sentry#plugin-sentry">Sentry-Plugin Documentation</a>!

## Adapter for Utilizing Tibber Energy Data in ioBroker

This adapter connects your Tibber account's API data to ioBroker, whether for a single home or multiple residences.
It also supports direct local reading of the Tibber Pulse sensor via your home network, enabling real-time monitoring and data collection without relying solely on the cloud API.

If you're not currently a Tibber user, I would greatly appreciate it if you could use my referral link: [Tibber Referral Link](https://invite.tibber.com/mu8c82n5).

## Standard Configuration

- Begin by creating a new instance of the adapter.
- You'll also require an API token from Tibber, which you can obtain here: [Tibber Developer API](https://developer.tibber.com).
- Enter your Tibber API token in the standard settings and configure at least one line for live feed settings (select "None available").
- Save the settings and exit the configuration to restart the adapter; this step allows your home(s) to be queried for the first time from the Tibber server.
- Return to the configuration screen and select the homes from which you wish to fetch real-time data using your Tibber Pulse. You can also select homes and disable the feed (Note: This works only if the hardware is installed and the Tibber server has verified the connection to Pulse).
- Note: If you have more than one home in your Tibber account, you must add all of them to avoid error messages caused by homes that may not be needed. Add them all and disable the unwanted ones.
- You have the option to deactivate the retrieval of price data for today and tomorrow, for instance, if you only intend to use the Pulse live feed.
- Optionally, you can enable the retrieval of historical consumption data. Please specify the number of datasets for hours, days, weeks, months, and years. You can use "0" to disable one or more of these intervals based on your preferences.
- Note: It's essential to be mindful of the dataset size, as excessively large requests may result in no response from the Tibber Server. We recommend experimenting with the dataset size to ensure optimal functionality. Adjusting the intervals and dataset numbers can help strike the right balance between obtaining insightful data and maintaining server responsiveness. For example, 48 is a recommended value for hours.
- Save the settings.

## Consumption Data Documentation

When daily historical consumption is enabled, the adapter provides an aggregated state for the current month:

- `Homes.<HOME-ID>.Consumption.currentMonthConsumption`

This state is the total consumption for the current calendar month in `kWh`, calculated from the daily consumption data returned by Tibber. If too few days are configured, the value will only reflect that number of days — not a complete month.

## Calculator Configuration

- Now that the Tibber connection is up and running, you can also leverage the Calculator to incorporate additional automation features into the TibberLink adapter.
- The Calculator operates using channels, with each channel linked to a selected home.
- These states are designed to serve as external, dynamic inputs for TibberLink, allowing you to, for example, adjust the marginal cost ("TriggerPrice") from an external source or enable the calculator channel ("Active").
- These channels have to be activated or deactivated based on corresponding states.
- The states of a calculator channel are positioned adjacent to the home states and named according to the channel number. The channel name entered in the admin screen is displayed here to help identify your configurations.  
  <img src="docu/calculatorStates.png" width="938" alt="Calculator States">
- The behavior of each channel is determined by its type: "best cost (LTF)", "best single hours (LTF)", "best hours block (LTF)" or "smart battery buffer".
- Each channel populates one or two external states as output, which have to be selected in the settings tab. For instance, this state might be "0_userdata.0.example_state" or any other writeable external state.
- If no external output state is selected, an internal state within the channel's range will be created.
- The values to be written to the output state can be defined in "value YES" and "value NO," e.g., "true" for boolean states or a number or text to be written.
- Outputs:
    - "Best cost": Utilizes the "TriggerPrice" state as input, producing a "YES" output every hour when the current Tibber energy cost is below the trigger price.
    - "Best single hours": Generates a "YES" output during the least expensive hours, with the number defined in the "AmountHours" state.
    - "Best hours block": Outputs "YES" during the most cost-effective block of hours, with the number of hours specified in the "AmountHours" state.  
      Additionally, the average total cost in the determined block is written to a state "AverageTotalCost" nearby the input states of this channel. Also start and end hour of the block is written to "BlockStartFullHour" and "BlockEndFullHour" as a result of the calculation.
    - "Best percentage": Outputs "YES" during the least expensive hour and any other hours where the price falls within the percentage range specified in the "Percentage" settings state.
    - "Best cost LTF": "Best cost" within a Limited Time Frame (LTF).
    - "Best single hours LTF": "Best single hours" within a Limited Time Frame (LTF).
    - "Best hours block LTF": "Best hours block" within a Limited Time Frame (LTF).
    - "Best percentage LTF": "Best percentage" within a Limited Time Frame (LTF).
    - "Smart Battery Buffer":
        - The "EfficiencyLoss" parameter defines the efficiency loss of the battery system. Its value ranges from 0 to 1, where 0 means no efficiency loss and 1 represents complete energy loss. For example, a value of 0.25 indicates a 25% efficiency loss per charge/discharge cycle.
        - The "AmountHours" parameter specifies the maximum number of hours the system may use for battery charging, rounded to quarter hours. Important: this is an upper limit, not a guaranteed number of hours. The actual number of charging timeslots is determined dynamically based on energy prices and the efficiency loss. Only timeslots where charging is economically worthwhile (i.e., price is sufficiently below the most expensive slot, considering EfficiencyLoss) will be selected.
        - The calculator works as follows:
            - Cheap timeslots: Battery charging is enabled (value YES) and feed into the home energy system is disabled (value 2 NO). These are the slots with the lowest prices that pass the efficiency filter, up to AmountHours.
            - Expensive timeslots: Battery charging is disabled (value NO) and feed into the home energy system is enabled (value 2 YES). These slots have the highest prices, above the dynamically calculated threshold based on the cheapest timeslot prices and efficiency loss.
            - Normal timeslots: Where charging is not economically viable, both outputs are disabled.
        - This approach ensures that the battery is only used when it is economically beneficial, rather than strictly adhering to a fixed number of hours.
- LTF channels: These operate similarly to standard channels but are active only within a time frame defined by the 'StartTime' and 'StopTime' state objects. After 'StopTime,' the channel automatically deactivates. 'StartTime' and 'StopTime' can span two calendar days, as Tibber does not provide data beyond a 48-hour window. Both states require a date-time string in ISO-8601 format with a timezone offset, e.g., '2024-12-24T18:00:00.000+01:00'. Additionally, the LTF channels feature a new state parameter called 'RepeatDays,' which defaults to 0. When 'RepeatDays' is set to a positive integer, the channel will repeat its cycle by incrementing both 'StartTime' and 'StopTime' by the specified number of days after 'StopTime' is reached. For example, set 'RepeatDays' to 1 for daily repetition.

## Graph Output Configuration

The adapter helps visualize price trends and calculator results. It provides three levels of complexity — from a simple JSON-based approach to a fully customized JavaScript solution.

### 1. **(Under Development) Visualization using the "E-Charts" Adapter**

This method requires the "E-Charts" adapter to be installed separately.

- JSON data generated in the Calculator States section (`Output-E-Charts`) can be used.
- The capabilities are limited by the constraints of the E-Charts adapter.

### 2. **Using the "FlexCharts" (or "Fully Featured eCharts") Adapter with JSON**

This method requires the "FlexCharts" adapter to be installed separately.

- The TibberLink adapter creates a state called `jsonFlexCharts`.

                      <img src="docu/jsonFlexChartsState.png" width="938" alt="jsonFlexCharts State">

- The FlexCharts adapter renders this state via the following URL:
    ```
    http://[YOUR IP of FLEXCHARTS]:8082/flexcharts/echarts.html?source=state&id=tibberlink.0.Homes.[TIBBER-HOME-ID].PricesTotal.jsonFlexCharts
    ```
- Starting with V0.7.0, FlexCharts supports automatic chart updates via SSE (Server-Sent Events). To use this add `&sse` to the URL:
    ```
    http://[YOUR IP of FLEXCHARTS]:8082/flexcharts/echarts.html?source=state&id=tibberlink.0.Homes.[TIBBER-HOME-ID].PricesTotal.jsonFlexCharts&sse=30
    ```
- Refer to the [FlexCharts adapter documentation](https://github.com/MyHomeMyData/ioBroker.flexcharts) for more details.

#### **JSON Template Usage**

- The `jsonFlexCharts` state is generated based on a template configured via the JSON editor in the adapter settings.
- The built-in JSON editor uses JSON5 mode, so comments and trailing commas are permitted.
- A sample template can be downloaded from: [TemplateFlexChart01.md](docu/TemplateFlexChart01.md).
- Copy and paste the template into the JSON editor.
- The template contains the placeholders:
    - `%%seriesData%%` (populated with the time-series price data at runtime).
    - `%%CalcChannelsData%%` (populated with selected calculator channel data).
- The rest of the template follows the Apache ECharts configuration. For reference, see [Apache ECharts Examples](https://echarts.apache.org/examples/en/index.html).
- **Recommendation:** Test the TibberLink adapter without a real template using the default string:
    ```
    %%seriesData%%\n\n%%CalcChannelsData%%
    ```
    This helps understand its functionality.
- Template adjustments can be tested on Apache ECharts examples pages using the "Output-E-Charts" state data.
- Good templates will be shared within the TibberLink adapter community.

### 3. **Using "FlexCharts" with Custom JavaScript Code**

For maximum flexibility and customization, the FlexCharts adapter can be used with custom JavaScript.

- Both the "FlexCharts" and "JavaScript" adapters need to be installed separately.
- This approach allows the creation of multiple customized graphs.
- For more details, refer to the [FlexCharts Adapter Discussion](https://github.com/MyHomeMyData/ioBroker.flexcharts/discussions/67).

## Hints

### Inverse Usage

To obtain, for example, peak hours instead of optimal hours, simply invert the usage and parameters:

<img src="docu/calculatorStatesInverse.png" width="938" alt="Calculator States Inverse">

By swapping true <-> false, you will receive a true at a low cost in the first line and a true at a high cost in the second line (channel names are just examples and can be freely chosen).

Attention: For peak single hours, such as in the example, you also need to adjust the number of hours. Original: 5 -> Inverse (24-5) = 19 -> You will obtain a 'true' output during the 5 peak hours.

### LTF channels

The calculation is performed for "multiday" data. As we only have information for "today" and "tomorrow" (available after approximately 13:00), the time scope covers up to 48 hours, though typically around 35 hours immediately after the 13:00 price update. However, it's crucial to be mindful of this behavior because the calculated result may/will change around 13:00 when new data for tomorrow's prices becomes available.

To observe this dynamic change in the time scope for a standard channel, you may opt for a Limited Time Frame (LTF) spanning several years. This is particularly useful for the "Best Single Hours LTF" scenario.

## Direct local poll of Pulse data

To make it work, you need to modify the web interface of the Bridge to remain permanently enabled.
marq24 provides an excellent description of how to do this for his Home Assistant integration here:

https://github.com/marq24/ha-tibber-pulse-local

If everything works correctly, the meter data will be written to ioBroker states every 2 seconds.

## Vehicles & Chargers Configuration

Tibber operates two separate APIs with different purposes:

- **Developer GraphQL API** (`api.tibber.com`) — energy prices, consumption history, and the Pulse live feed. This is what the standard Tibber API token (from [developer.tibber.com](https://developer.tibber.com)) gives access to.
- **Tibber Data API** (`data-api.tibber.com`) — IoT device data for paired vehicles, chargers, heat pumps, and inverters. This is a newer, separate REST API that requires its own OAuth2 client registration.

Neither API replaces the other — they complement each other. The vehicle and charger feature described here uses the Data API and therefore needs its own credentials in addition to the main API token.

### Prerequisites

1. Open [https://data-api.tibber.com/clients/manage](https://data-api.tibber.com/clients/manage) and click **+ New client**.

 <img src="docu/dataApi1.png" width="938" alt="Tibber Data API Client Management">

2. Give the client a name (e.g. `ioBrokerTibber`), set the **Redirect URI** to exactly `http://localhost/` (with trailing slash), and enable at least these scopes:
    - `data-api-homes-read`
    - `data-api-vehicles-read`
    - `data-api-chargers-read`

    <img src="docu/dataApi2.png" width="938" alt="Create client form with scopes">

3. Click **Create**. Copy the **Client ID** and **Client Secret** immediately — the secret is only shown once.

 <img src="docu/dataApi3.png" width="938" alt="Client created with ID and Secret">

4. Open the **Vehicles & Chargers** tab in the adapter configuration, enter both values, and save.
5. Restart the adapter. It will log a **warning** containing the ready-to-use authorization URL with your Client ID already filled in:
    ```
    [tibberDataAPI]: no auth code configured — please authorize. URL: https://thewall.tibber.com/connect/authorize?client_id=<your-id>&...
    ```
6. Open that URL in a browser and log in with your Tibber account to grant access.
7. The browser will redirect to `http://localhost/` and show a connection error — this is **expected and correct**. Copy the full URL from the address bar (it contains `?code=...`).

 <img src="docu/dataApi4.png" width="938" alt="Browser showing localhost connection refused with code in URL">

8. Paste the complete URL into the **Auth Code** field in the adapter configuration and save.
9. The adapter exchanges the code for tokens and begins polling. The Auth Code field is cleared automatically.

The adapter stores the refresh token internally and renews the access token automatically, so this one-time authorization step does not need to be repeated.

### Available States

Vehicle data is written to `Vehicles.<VIN>.*`:

| State                 | Description                       |
| --------------------- | --------------------------------- |
| `ChargingStatus`      | Current charging status           |
| `HomeId`              | Associated Tibber home ID         |
| `LastUpdated`         | Timestamp of the last data update |
| `PlugStatus`          | Plug connection status            |
| `Range`               | Remaining range in km             |
| `StateOfCharge`       | Battery state of charge in %      |
| `TargetStateOfCharge` | Target state of charge in %       |

### Poll Interval

The poll interval can be configured in the **Vehicles & Chargers** tab (1–60 minutes, default: 5 minutes).

## Donate

<a href="https://www.paypal.com/donate/?hosted_button_id=F7NM9R2E2DUYS"><img src="https://raw.githubusercontent.com/Hombach/ioBroker.tibberlink/master/docu/bluePayPal.svg" height="40"></a>  
If you enjoyed this project — or just feeling generous, consider buying me a beer. Cheers! :beers:

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**

- (HombachC) removed redundant test devDependencies (chai, chai-as-promised, sinon-chai, proxyquire) and switched unit tests to Node's built-in assert

### 7.1.4 (2026-07-09)

- (HombachC) fixed regression where smart battery buffer ignored the EfficiencyLoss parameter (#918)

### 7.1.3 (2026-06-27)

- (HombachC) updated axios
- (HombachC) fixed local SML parsing for EMH meters reporting meter_mode 4 but sending binary SML data (#912)
- (HombachC) fixed false warn log for SBB when no price slot matches current quarter (#912)

### 7.1.2 (2026-06-19)

- (HombachC) fixed adapter crash on null liveMeasurement from Tibber feed (#910)
- (HombachC) improved vehicles & chargers OAuth2 setup documentation
- (HombachC) fixed setInterval/clearInterval to use adapter-managed variants
- (HombachC) removed yarn dependency, replaced with npm in release script
- (HombachC) updated adapter-core
- (HombachC) fixed adapter checker warnings
- (HombachC) updated dependencies

### 7.1.1 (2026-06-07)

- (HombachC) optimized vehicle states
- (HombachC) fixed adapter checker warnings

### 7.1.0 (2026-06-07)

- (claude) added integration for vehicles(#67)
- (HombachC) optimized documentation
- (claude) added code documentation
- (claude) performance optimization of event listeners
- (HombachC) added current month consumption docu
- (HombachC) updated release-script
- (HombachC) fixed adapter checker warnings

### Old Changes see [CHANGELOG OLD](CHANGELOG_OLD.md)

## License

GNU General Public License v3.0 only

Copyright (c) 2023-2026 C.Hombach <TibberLink@homba.ch>
