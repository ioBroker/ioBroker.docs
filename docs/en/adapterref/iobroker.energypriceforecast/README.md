![Logo](admin/energypriceforecast.png)

# ioBroker.energypriceforecast

[![NPM version](https://img.shields.io/npm/v/iobroker.energypriceforecast.svg)](https://www.npmjs.com/package/iobroker.energypriceforecast)
[![Test and Release](https://github.com/BackupBaTTerY/ioBroker.energypriceforecast/workflows/Test%20and%20Release/badge.svg)](https://github.com/BackupBaTTerY/ioBroker.energypriceforecast/actions/workflows/test-and-release.yml)

## Energy Price Forecast EU adapter for ioBroker

Electricity price and CO2 forecast for 34 European bidding zones from
[energypriceforecast.eu](https://energypriceforecast.eu/).

Day-ahead prices are only published for the next day. This adapter continues
the series with a forecast of up to 120 hours, so an automation can already
decide today whether to charge the car tonight or wait for tomorrow's cheaper
hours. For every market it also reports the CO2 intensity of the grid.

What you get:

- the current price and CO2 intensity
- the cheapest and the greenest window of a length you choose (e.g. the 3 hours
  your dishwasher runs), with a flag that is `true` while the window is running
- a combined score that ranks the present hour against the coming 24 hours
- the whole price series in 15-minute slots as JSON, for charts and your own logic
- how well the forecast did in the last 30 days, so you can decide how much to trust it

All calculation happens on the server. The adapter polls, maps and writes states.

### Markets

AT, BE, BG, CH, CZ, DE, DK1, DK2, ES, FI, FR, GB, GR, the seven Italian zones (NORD,
CNOR, CSUD, SUD, CALA, SICI, SARD), NL, NO1–NO5, PL, PT, RO, SE1–SE4, SK.

Prices are in the market's currency per kWh as the API reports it (EUR, DKK,
NOK, SEK, GBP, ...). By default they are wholesale prices; see
[Household price](#household-price) for what you actually pay.

### Great Britain (GB, beta)

Choose GB in the instance settings. Price states use `GBP/kWh`: 0.10 means
10 p/kWh, not 0.10 p/kWh. GB is hourly wholesale data, not the exact half-hourly
Agile tariff. Quarter-hour output repeats the hourly price and does not add
measured half-hour data. There is no GB household-price estimate. Own-tariff
formulas use surcharges in GBP/kWh. Quality remains unavailable until enough
history has been collected; an empty quality state is not a zero error.

## Configuration

| Setting | Meaning |
|---|---|
| Market | Bidding zone. Germany and Luxembourg share one zone. |
| Forecast horizon | 24, 48, 72 or 120 hours. Public access serves up to 48 h. |
| Window length | Hours the cheapest and greenest window should cover, 1–24. |
| Update interval | 15–120 minutes, default 30. Prices change at most every 15 minutes. |
| Prices show | Wholesale price, household price estimate, or own tariff, see below. |
| Postal code | For the estimate in Germany (required) and the Netherlands (optional). |
| Factor, surcharge | For the own tariff. |
| API key | Optional. Only needed for a horizon beyond 48 h. Stored encrypted. |

## Household price

The exchange price is only part of the bill. Three settings decide what the
price states show:

| Setting | What the price states contain | Markets |
|---|---|---|
| Wholesale price | Day-ahead price and its forecast, without any fees or taxes | all |
| Household price estimate | Wholesale price + supplier markup + grid fee + levies, then VAT. In Germany the grid fee comes from the grid operator found by your postal code. | DE, AT, NL, DK1, DK2, NO1–NO5 |
| Own tariff | Wholesale price × factor + surcharge, with your own numbers | all |

For the own tariff, take your contract: the factor is usually 1 + VAT (1.19 in
Germany), the surcharge everything your supplier charges per kWh on top of the
exchange price, including VAT - grid fee, levies and margin. Example for a
German dynamic tariff with 20 ct/kWh on top: factor `1.19`, surcharge `0.20`.

Either way the cheapest window stays the same hours, because every hour gets
the same markup; only the amounts change. Fixed monthly charges are never
included, and the forecast-quality states always stay on the wholesale basis.
A setting that cannot work (e.g. the German estimate without a postal code)
falls back to the wholesale price and says so in the log.

## States

| State | Meaning |
|---|---|
| `price.current` | Price of the current slot |
| `price.currentSource` | `day_ahead` (published) or `forecast` |
| `price.bestWindow.start` / `.end` | Cheapest window in the horizon (ISO 8601, UTC) |
| `price.bestWindow.average` | Average price in that window |
| `price.bestWindow.active` | `true` while the cheapest window is running |
| `price.bestWindow.remainingMinutes` | Minutes left while it runs, otherwise `0` |
| `price.bestWindow.status` | `upcoming`, `active` or `passed` |
| `co2.current`, `co2.bestWindow.*` | The same for CO2 intensity (gCO2/kWh) |
| `combined.scoreNow` | Share of the coming 24 h that are worse on price and CO2 than now; 100 = now is the best time |
| `combined.bestWindow.start` / `.end` | Best compromise between cheap and clean |
| `forecast.json` | Price series as `[{start, end, value, source}]` in 15-minute slots |
| `forecast.lastDayAheadSlot` | Where published prices end and the forecast begins |
| `forecast.end` | End of the series |
| `quality.windowExactHitDays` / `.windowEvaluatedDays` | Days in the last 30 on which the forecast found exactly the cheapest window |
| `quality.windowWithinOneHourDays` | Days on which it was at most one hour off |
| `quality.windowMeanExtraCost` | What following the forecast window cost on average compared with the true cheapest one |
| `quality.hourlyMeanAbsError`, `quality.hourlyCorrelation` | Hourly accuracy over 30 days |
| `retail.basis` | `base`, `estimate` or `formula` - what the price states contain |
| `retail.gridArea`, `retail.gridFee`, `retail.supplierMarkup`, `retail.leviesAndTaxes`, `retail.vatPercent` | What the estimate is built from (ct/kWh, øre/kWh in DK and NO); only with the estimate |
| `retail.factor`, `retail.surcharge` | Your own tariff; only with the own tariff |
| `info.connection` | Last update succeeded |
| `info.apiKeyState` | `missing` for public access, `valid` with a key, otherwise why the key was refused |

Forecast values for a whole hour are repeated over its four quarters, never
interpolated: the model forecasts hours, and inventing values in between
would change what an automation sees.

## Example: start the dishwasher in the cheapest window

```js
on({ id: 'energypriceforecast.0.price.bestWindow.active', val: true }, () => {
    setState('shelly.0.dishwasher.Relay0.Switch', true);
});
```

## Feedback

The adapter is in testing. Feedback is collected in the
[official ioBroker tester thread](https://forum.iobroker.net/topic/85729/test-adapter-energypriceforecast.eu-v0.1.x)
(German); bugs are best reported as a
[GitHub issue](https://github.com/BackupBaTTerY/ioBroker.energypriceforecast/issues).

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.1.3 (2026-10-31)

- Great Britain (GB, beta): hourly wholesale prices in GBP/kWh, own tariff with surcharges in GBP/kWh
- README in English only
- Updated test tooling (`@iobroker/testing` 6.3)

### 0.1.2 (2026-10-05)

- State and channel names in all eleven admin languages
- The retail component states only exist for the price basis in use; switching the basis removes the others
- `remainingMinutes` is 0 outside a window and `active` is `false` when there is no window, instead of empty values

Older releases are documented in CHANGELOG_OLD.md.

## License

MIT License

Copyright (c) 2026 BackupBaTTerY <StrompreisVorhersage@proton.me>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.