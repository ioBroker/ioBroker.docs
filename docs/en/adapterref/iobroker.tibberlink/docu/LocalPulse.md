---
chapters: {"pages":{"en/adapterref/iobroker.tibberlink/README.md":{"title":{"en":"ioBroker.tibberlink"},"content":"en/adapterref/iobroker.tibberlink/README.md"},"en/adapterref/iobroker.tibberlink/docu/CalculatorConfiguration.md":{"title":{"en":"Calculator Configuration"},"content":"en/adapterref/iobroker.tibberlink/docu/CalculatorConfiguration.md"},"en/adapterref/iobroker.tibberlink/docu/GraphOutput.md":{"title":{"en":"Graph Output Configuration"},"content":"en/adapterref/iobroker.tibberlink/docu/GraphOutput.md"},"en/adapterref/iobroker.tibberlink/docu/VehiclesAndChargers.md":{"title":{"en":"Vehicles & Chargers Configuration"},"content":"en/adapterref/iobroker.tibberlink/docu/VehiclesAndChargers.md"},"en/adapterref/iobroker.tibberlink/docu/LocalPulse.md":{"title":{"en":"Direct local poll of Pulse data"},"content":"en/adapterref/iobroker.tibberlink/docu/LocalPulse.md"},"en/adapterref/iobroker.tibberlink/docu/TemplateFlexChart01.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.tibberlink/docu/TemplateFlexChart01.md"},"en/adapterref/iobroker.tibberlink/info/TibberDataAPI.md":{"title":{"en":"Tibber Data API — research notes"},"content":"en/adapterref/iobroker.tibberlink/info/TibberDataAPI.md"},"en/adapterref/iobroker.tibberlink/info/PulseMeterModes.md":{"title":{"en":"Tibber Pulse — supported meter modes"},"content":"en/adapterref/iobroker.tibberlink/info/PulseMeterModes.md"}}}
---
# Direct local poll of Pulse data

_Part of the [ioBroker.tibberlink documentation](/#/adapters/tibberlink)._

To make it work, you need to modify the web interface of the Bridge to remain permanently enabled.
marq24 provides an excellent description of how to do this for his Home Assistant integration here:

https://github.com/marq24/ha-tibber-pulse-local

If everything works correctly, the meter data will be written to ioBroker states every 2 seconds.

## Bridge firmware endpoints

Tibber Bridge firmware around `1794-…` renamed the local HTTP JSON paths:

| Purpose | Legacy | New (FW ≥1794) |
| --- | --- | --- |
| Raw meter telegram | `/data.json?node_id=N` | `/node_data.json?node_id=N` |
| Metrics / meter_mode | `/metrics.json?node_id=N` | `/node_metrics.json?node_id=N` |

The adapter tries the new paths first and falls back to the legacy ones on HTTP 404, so both firmware generations keep working. See also [ha-tibber-pulse-local#129](https://github.com/marq24/ha-tibber-pulse-local/discussions/129) and issue #947.

## Supported meter modes

The Tibber Bridge reports a `meter_mode` for the attached grid meter. The adapter supports both telegram
encodings used by common meters:

| `meter_mode` | Encoding | Example meters |
| --- | --- | --- |
| 1 | Plain OBIS text | ZPA GH305 |
| 3 | Binary SML | ISKRA, EasyMeter, EMH, EFR |
| 4 | Plain OBIS text (or binary SML on some EMH meters) | eBZ DD3 |
| 5 | Plain OBIS text | eBZ |

If your meter reports a different mode or does not update, please open an issue with the raw HEX telegram
from the debug log. Full technical details: [../info/PulseMeterModes.md](/#/docs/adapterref/iobroker.tibberlink/info/PulseMeterModes.md).