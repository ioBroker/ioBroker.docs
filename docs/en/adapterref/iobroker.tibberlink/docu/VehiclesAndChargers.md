---
chapters: {"pages":{"en/adapterref/iobroker.tibberlink/README.md":{"title":{"en":"ioBroker.tibberlink"},"content":"en/adapterref/iobroker.tibberlink/README.md"},"en/adapterref/iobroker.tibberlink/docu/CalculatorConfiguration.md":{"title":{"en":"Calculator Configuration"},"content":"en/adapterref/iobroker.tibberlink/docu/CalculatorConfiguration.md"},"en/adapterref/iobroker.tibberlink/docu/GraphOutput.md":{"title":{"en":"Graph Output Configuration"},"content":"en/adapterref/iobroker.tibberlink/docu/GraphOutput.md"},"en/adapterref/iobroker.tibberlink/docu/VehiclesAndChargers.md":{"title":{"en":"Vehicles & Chargers Configuration"},"content":"en/adapterref/iobroker.tibberlink/docu/VehiclesAndChargers.md"},"en/adapterref/iobroker.tibberlink/docu/LocalPulse.md":{"title":{"en":"Direct local poll of Pulse data"},"content":"en/adapterref/iobroker.tibberlink/docu/LocalPulse.md"},"en/adapterref/iobroker.tibberlink/docu/TemplateFlexChart01.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.tibberlink/docu/TemplateFlexChart01.md"}}}
---
# Vehicles & Chargers Configuration

_Part of the [ioBroker.tibberlink documentation](/#/adapters/tibberlink)._

Tibber operates two separate APIs with different purposes:

- **Developer GraphQL API** (`api.tibber.com`) — energy prices, consumption history, and the Pulse live feed. This is what the standard Tibber API token (from [developer.tibber.com](https://developer.tibber.com)) gives access to.
- **Tibber Data API** (`data-api.tibber.com`) — IoT device data for paired vehicles, chargers, heat pumps, and inverters. This is a newer, separate REST API that requires its own OAuth2 client registration.

Neither API replaces the other — they complement each other. The vehicle and charger feature described here uses the Data API and therefore needs its own credentials in addition to the main API token.

> Developer/research notes on the Data API (endpoints, device schema, capabilities) live in [../Info/TibberDataAPI.md](https://github.com/Hombach/ioBroker.tibberlink/blob/master/Info/TibberDataAPI.md).

## Prerequisites

1. Open [https://data-api.tibber.com/clients/manage](https://data-api.tibber.com/clients/manage) and click **+ New client**.

 <img src="dataApi1.png" width="938" alt="Tibber Data API Client Management">

2. Give the client a name (e.g. `ioBrokerTibber`), set the **Redirect URI** to exactly `http://localhost/` (with trailing slash), and enable at least these scopes:
    - `data-api-homes-read`
    - `data-api-vehicles-read`
    - `data-api-chargers-read`

    <img src="dataApi2.png" width="938" alt="Create client form with scopes">

3. Click **Create**. Copy the **Client ID** and **Client Secret** immediately — the secret is only shown once.

 <img src="dataApi3.png" width="938" alt="Client created with ID and Secret">

4. Open the **Vehicles & Chargers** tab in the adapter configuration, enter both values, and save.
5. Restart the adapter. It will log a **warning** containing the ready-to-use authorization URL with your Client ID already filled in:
    ```
    [tibberDataAPI]: no auth code configured — please authorize. URL: https://thewall.tibber.com/connect/authorize?client_id=<your-id>&...
    ```
6. Open that URL in a browser and log in with your Tibber account to grant access.
7. The browser will redirect to `http://localhost/` and show a connection error — this is **expected and correct**. Copy the full URL from the address bar (it contains `?code=...`).

 <img src="dataApi4.png" width="938" alt="Browser showing localhost connection refused with code in URL">

8. Paste the complete URL into the **Auth Code** field in the adapter configuration and save.
9. The adapter exchanges the code for tokens and begins polling. The Auth Code field is cleared automatically.

The adapter stores the refresh token internally and renews the access token automatically, so this one-time authorization step does not need to be repeated.

## Available States

Vehicle data is written to `Vehicles.<VIN>.*`:

| State                 | Description                                  |
| --------------------- | -------------------------------------------- |
| `ChargingStatus`      | Current charging status                      |
| `HomeId`              | Associated Tibber home ID                    |
| `LastSeen`            | Timestamp the device was last seen by Tibber |
| `LastUpdated`         | Timestamp of the last data update            |
| `PlugStatus`          | Plug connection status                       |
| `Range`               | Remaining range in km                        |
| `StateOfCharge`       | Battery state of charge in %                 |
| `TargetStateOfCharge` | Target state of charge in %                  |

Charger data is written to `Chargers.<id>.*`. Because charger capabilities might differ between brands (e.g. go-e, Wallbox Pulsar Plus), each reported capability is written generically as its own state, named after the Data API capability id (dots replaced by underscores) and labelled with the API-provided description. Typical states include:

| State                              | Description                                      |
| ---------------------------------- | ------------------------------------------------ |
| `connector_status`                 | Charger connector status                         |
| `charging_status`                  | Charger charging status                          |
| `charging_current_max`             | Maximum allowed charge current (A)               |
| `charging_current_offlineFallback` | Fallback current if the charger goes offline (A) |
| `grid_phaseCount`                  | Number of phases used for charging               |
| `HomeId`                           | Associated Tibber home ID                        |
| `LastSeen`                         | Timestamp the device was last seen by Tibber     |
| `LastUpdated`                      | Timestamp of the last data update                |

## Poll Interval

The poll interval can be configured in the **Vehicles & Chargers** tab (1–60 minutes, default: 5 minutes).