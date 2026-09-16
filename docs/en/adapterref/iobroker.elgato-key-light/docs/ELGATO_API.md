---
chapters: {"pages":{"en/adapterref/iobroker.elgato-key-light/README.md":{"title":{"en":"ioBroker.elgato-key-light"},"content":"en/adapterref/iobroker.elgato-key-light/README.md"},"en/adapterref/iobroker.elgato-key-light/README_DE.md":{"title":{"en":"ioBroker.elgato-key-light"},"content":"en/adapterref/iobroker.elgato-key-light/README_DE.md"},"en/adapterref/iobroker.elgato-key-light/docs/ELGATO_API.md":{"title":{"en":"Elgato local API evidence"},"content":"en/adapterref/iobroker.elgato-key-light/docs/ELGATO_API.md"},"en/adapterref/iobroker.elgato-key-light/docs/MIGRATION.md":{"title":{"en":"Migration guide"},"content":"en/adapterref/iobroker.elgato-key-light/docs/MIGRATION.md"}}}
---
# Elgato local API evidence

The adapter uses Elgato's local unauthenticated HTTP protocol and discovers service type `_elg._tcp.local.`. Endpoint support is deliberately evidence-based and response-driven.

| Endpoint | Method | Adapter use | Confidence |
| --- | --- | --- | --- |
| `/elgato/accessory-info` | GET | Identity, product, firmware, features and Wi-Fi metadata | Verified by existing adapter and public clients |
| `/elgato/accessory-info` | PUT | Display name | Implemented; hardware verification pending |
| `/elgato/lights` | GET/PUT | Power, brightness, temperature, hue and saturation | Verified by existing adapter and public clients |
| `/elgato/lights/settings` | GET/PUT | Startup/transition settings and Mini battery bypass | Shape verified publicly; mutation needs full hardware matrix |
| `/elgato/battery-info` | GET | Mini battery, charging and voltage/current | Verified from Mini response evidence/public client |
| `/elgato/identify` | POST | Identify action | Verified by public clients |

The parser accepts optional fields and preserves `hardwareRevision` as a string. Capabilities are inferred from actual light/settings/battery response fields. Temperature is transported in mired and exposed in Kelvin; RGB values are converted through HSV for the native API.

## Deliberate exclusions

- Restart is not exposed by the adapter UI/state contract.
- Light Strip scenes and effects remain undocumented/experimental and are not mutated.
- No cloud API, credentials or telemetry are used.

## Hardware evidence workflow

Run `npm run elgato:probe -- <private-host> [port]` against each available model. Attach the sanitized JSON plus firmware version to a test record. Before promoting optional mutations, test GET, one bounded change, read-back, restart persistence where relevant, rollback and adapter shutdown. The intended matrix is one Key Light, one Light Strip and two Key Light Mini units. Hardware tests remain opt-in and must never run in CI.

## Sources

- Elgato communication protocol: https://help.elgato.com/hc/en-us/articles/360060048331-What-Communication-Protocol-Is-Used-by-Elgato-Wi-Fi-Products
- Elgato Key Light API overview: https://help.elgato.com/hc/en-us/articles/4413403384845
- Home Assistant integration: https://www.home-assistant.io/integrations/elgato
- Python Elgato client: https://github.com/frenck/python-elgato
- NickParks API client: https://github.com/NickParks/elgato-light-api
- Homebridge implementation: https://github.com/derjayjay/homebridge-keylights