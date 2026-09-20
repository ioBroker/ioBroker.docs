---
chapters: {"pages":{"en/adapterref/iobroker.tibberlink/README.md":{"title":{"en":"ioBroker.tibberlink"},"content":"en/adapterref/iobroker.tibberlink/README.md"},"en/adapterref/iobroker.tibberlink/docu/CalculatorConfiguration.md":{"title":{"en":"Calculator Configuration"},"content":"en/adapterref/iobroker.tibberlink/docu/CalculatorConfiguration.md"},"en/adapterref/iobroker.tibberlink/docu/GraphOutput.md":{"title":{"en":"Graph Output Configuration"},"content":"en/adapterref/iobroker.tibberlink/docu/GraphOutput.md"},"en/adapterref/iobroker.tibberlink/docu/VehiclesAndChargers.md":{"title":{"en":"Vehicles & Chargers Configuration"},"content":"en/adapterref/iobroker.tibberlink/docu/VehiclesAndChargers.md"},"en/adapterref/iobroker.tibberlink/docu/LocalPulse.md":{"title":{"en":"Direct local poll of Pulse data"},"content":"en/adapterref/iobroker.tibberlink/docu/LocalPulse.md"},"en/adapterref/iobroker.tibberlink/docu/TemplateFlexChart01.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.tibberlink/docu/TemplateFlexChart01.md"},"en/adapterref/iobroker.tibberlink/info/TibberDataAPI.md":{"title":{"en":"Tibber Data API — research notes"},"content":"en/adapterref/iobroker.tibberlink/info/TibberDataAPI.md"},"en/adapterref/iobroker.tibberlink/info/PulseMeterModes.md":{"title":{"en":"Tibber Pulse — supported meter modes"},"content":"en/adapterref/iobroker.tibberlink/info/PulseMeterModes.md"}}}
---
# Tibber Pulse — supported meter modes

Reference notes for the local Pulse telegram parsing in [`src/lib/tibberLocal.ts`](https://github.com/Hombach/ioBroker.tibberlink/blob/master/src/lib/tibberLocal.ts).

When the adapter polls the Tibber Bridge locally (`/metrics.json`), the Bridge reports a numeric
`meter_mode` in its `node_status` block. This value tells the Bridge (and the adapter) how the attached
grid meter encodes its telegram. The adapter reads it into `this.meterMode` and routes the raw HEX payload
to the matching parser.

There are two fundamentally different telegram encodings:

- **Binary SML** (Smart Message Language, IEC 62056-5-3) — a binary structure that starts with the escape
  sequence `1b1b1b1b`. Parsed by `extractAndParseSMLMessages()`.
- **Plain OBIS text** (IEC 62056-21, "Mode D" ASCII) — human-readable lines like
  `1-0:1.8.0*255(007459.78471652*kWh)`. Parsed by `extractAndParseAsciiMessages()`.

## Mode → parser mapping

| `meter_mode` | Encoding | Parser | Example meters |
| --- | --- | --- | --- |
| **1** | Plain OBIS text | `extractAndParseAsciiMessages()` | ZPA GH305 |
| **2** | *not observed* | falls through to SML parser + warning | — |
| **3** | Binary SML | `extractAndParseSMLMessages()` | ISKRA ISK00 7034, EasyMeter Q3AA2064, EMH eHZB, EFR |
| **4** | Plain OBIS text (¹) | `extractAndParseAsciiMessages()` | eBZ DD3 |
| **5** | Plain OBIS text | `extractAndParseAsciiMessages()` | eBZ (EBZ5DD32R06…) |
| *other* | *unknown* | falls through to SML parser + `Potential problems with Pulse meter mode X` warning | — |

¹ Some meters report `meter_mode=4` but actually send **binary SML** (observed on EMH meters, issue
[#912](https://github.com/hombach/ioBroker.tibberlink/issues/912)). Modes 4 and 5 therefore include a
defensive check: if the payload starts with `1b1b1b1b`, the SML parser is used regardless of the reported
mode.

## History

- Mode 5 support added for eBZ meters sending plain OBIS text
  ([#931](https://github.com/hombach/ioBroker.tibberlink/issues/931)). Before the fix, mode 5 fell through
  to the SML parser, which cannot read plain-text telegrams, so all Pulse states froze at their last value.
- Mode 4 binary-SML guard added for EMH meters
  ([#912](https://github.com/hombach/ioBroker.tibberlink/issues/912)).

## Notes for adding a new mode

1. Grab the raw telegram from the debug log line `got HEX data from local pulse: <hex>`.
2. Decode it (e.g. paste into <https://tasmota-sml-parser.dicp.net> for SML, or hex-decode to ASCII for
   OBIS text) to determine the encoding.
3. Add the mode number to the `switch (this.meterMode)` in `tibberLocal.ts` (SML → `extractAndParseSMLMessages`,
   OBIS text → `extractAndParseAsciiMessages`) and to the allow-list `[1, 3, 4, 5]` that suppresses the
   "Potential problems" warning.
4. Add a regression test in [`src/lib/tibberLocal.test.ts`](https://github.com/Hombach/ioBroker.tibberlink/blob/master/src/lib/tibberLocal.test.ts) using the real
   telegram, and update the table above.