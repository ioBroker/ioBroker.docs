---
chapters: {"pages":{"en/adapterref/iobroker.tibberlink/README.md":{"title":{"en":"ioBroker.tibberlink"},"content":"en/adapterref/iobroker.tibberlink/README.md"},"en/adapterref/iobroker.tibberlink/docu/CalculatorConfiguration.md":{"title":{"en":"Calculator Configuration"},"content":"en/adapterref/iobroker.tibberlink/docu/CalculatorConfiguration.md"},"en/adapterref/iobroker.tibberlink/docu/GraphOutput.md":{"title":{"en":"Graph Output Configuration"},"content":"en/adapterref/iobroker.tibberlink/docu/GraphOutput.md"},"en/adapterref/iobroker.tibberlink/docu/VehiclesAndChargers.md":{"title":{"en":"Vehicles & Chargers Configuration"},"content":"en/adapterref/iobroker.tibberlink/docu/VehiclesAndChargers.md"},"en/adapterref/iobroker.tibberlink/docu/LocalPulse.md":{"title":{"en":"Direct local poll of Pulse data"},"content":"en/adapterref/iobroker.tibberlink/docu/LocalPulse.md"},"en/adapterref/iobroker.tibberlink/docu/TemplateFlexChart01.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.tibberlink/docu/TemplateFlexChart01.md"},"en/adapterref/iobroker.tibberlink/info/TibberDataAPI.md":{"title":{"en":"Tibber Data API — research notes"},"content":"en/adapterref/iobroker.tibberlink/info/TibberDataAPI.md"},"en/adapterref/iobroker.tibberlink/info/PulseMeterModes.md":{"title":{"en":"Tibber Pulse — supported meter modes"},"content":"en/adapterref/iobroker.tibberlink/info/PulseMeterModes.md"}}}
---
# Tibber Data API — research notes

Reference notes for the vehicle/charger integration in [`src/lib/tibberDataAPI.ts`](https://github.com/Hombach/ioBroker.tibberlink/blob/master/src/lib/tibberDataAPI.ts).
Collected from the official docs and the interactive playground (schema not fully retrievable without login,
so device examples below come from real adapter debug output).

## The two Tibber APIs (they are separate!)

| API | Host | Purpose | Auth |
| --- | --- | --- | --- |
| **Developer / GraphQL API** | `api.tibber.com` (docs: [developer.tibber.com](https://developer.tibber.com)) | Energy prices, consumption history, Pulse live feed | Personal API token |
| **Data API** | `data-api.tibber.com` (docs: [data-api.tibber.com/docs](https://data-api.tibber.com/docs/)) | IoT device data: vehicles, chargers, heat pumps, inverters, batteries | OAuth2 (PKCE) client |

The Developer/GraphQL API does **not** expose charger/vehicle device data — that is exclusively the Data API.

## Useful links

- Docs overview: <https://data-api.tibber.com/docs/>
- Get started: <https://data-api.tibber.com/docs/get-started/>
- Authentication: <https://data-api.tibber.com/docs/auth/>
- Scopes: <https://data-api.tibber.com/docs/scopes/>
- Manage clients (create client id/secret): <https://data-api.tibber.com/clients/manage/>
- Supported devices: <https://data-api.tibber.com/docs/devices/supported/>
- Live events: <https://data-api.tibber.com/docs/devices/live-events/>
- Device history: <https://data-api.tibber.com/docs/devices/device-history/>
- Rate limiting: <https://data-api.tibber.com/docs/api-usage/rate-limiting/>
- Interactive playground: <https://data-api.tibber.com/playground/>

## Authentication (OAuth2 PKCE)

- Authorize URL: `https://thewall.tibber.com/connect/authorize`
- Token URL: `https://thewall.tibber.com/connect/token`
- Redirect URI used by the adapter: `http://localhost/` (must match the client config exactly, trailing slash)
- Scopes requested: `openid offline_access data-api-homes-read data-api-vehicles-read data-api-chargers-read`
- The adapter uses a fixed PKCE verifier/challenge pair (security comes from the client secret); the refresh
  token is persisted in the state `info.tibberDataApiRefreshToken`.

## Endpoints used by the adapter

Base: `https://data-api.tibber.com/v1`

| Method | Path | Notes |
| --- | --- | --- |
| GET | `/homes` | List homes (may return an array or `{ homes: [...] }`). |
| GET | `/homes/{homeId}/devices` | Device **list** — basic info only, **no capabilities**. |
| GET | `/homes/{homeId}/devices/{deviceId}` | Device **detail** — includes `capabilities` (the live values). |

> Roaming devices such as electric vehicles are included under **all** of the user's homes.
> Because the list endpoint carries no capabilities, the adapter must call the detail endpoint per device
> to read values and to classify the device type.

## Device schema (from the playground)

### `GET /v1/homes/{homeId}/devices` (list)

```json
{
  "devices": [
    {
      "id": "string",
      "externalId": "string",
      "info": { "name": "string", "brand": "string", "model": "string" },
      "supportedHistory": { "resolutions": [], "maxRetentionDays": 1 }
    }
  ]
}
```

### `GET /v1/homes/{homeId}/devices/{deviceId}` (detail)

```json
{
  "id": "string",
  "externalId": "string",
  "info": { "name": "string", "brand": "string", "model": "string" },
  "supportedHistory": { "resolutions": [], "maxRetentionDays": 1 },
  "status": { "lastSeen": "2026-07-30T06:25:23.770Z" },
  "attributes": [
    { "id": "string", "status": "string", "ssid": "string", "bssid": "string", "ipAddress": "string" }
  ],
  "capabilities": [
    { "id": "string", "description": "string", "value": "...", "unit": "string", "availableValues": ["..."] }
  ]
}
```

Field notes:

- `info.name` and `info.brand` are **required**; `info.model` is optional (best-effort values).
- `externalId` = external third-party identifier (for a Pulse this is often its QR code); `id` is the
  publicly addressable id that only exists in this API.
- `status.lastSeen` = timestamp the device was last seen by Tibber (written by the adapter as `LastSeen`).
- `attributes[]` = connectivity info (Wi-Fi ssid/bssid, ip address, …). Not currently written by the adapter.
- **There is no top-level `type`/`category` field** — the device type must be inferred from the capabilities
  (see classification below).

## Device categories (per the docs)

The Data API currently exposes:

1. Vehicles (OEM-connected electric vehicles)
2. EV chargers (EVSE)
3. Thermostats / climate devices (thermostats, heat pumps, space heaters)
4. Solar inverters (production metrics)
5. Home batteries / hybrid energy systems
6. Legacy inverters

> The docs explicitly warn: *"New categories may appear without breaking changes"* and recommend to
> *"handle unknown attributes/capabilities defensively."* This is why the adapter writes charger
> capabilities generically and **skips** device types it does not explicitly recognize.

## Capability examples (real debug output)

### Vehicle — BMW i3

```json
[
  { "id": "storage.stateOfCharge",       "description": "state of charge",                 "value": 0,   "unit": "%" },
  { "id": "storage.targetStateOfCharge", "description": "target state of charge",           "value": 100, "unit": "%" },
  { "id": "range.remaining",             "description": "estimated remaining driving range","value": 0,   "unit": "m" },
  { "id": "connector.status",            "description": "vehicle plug status",              "value": "unknown", "availableValues": ["connected","disconnected","unknown"] },
  { "id": "charging.status",             "description": "vehicle charging status",          "value": "unknown", "availableValues": ["charging","idle","unknown"] }
]
```

### Charger — go-e

```json
[
  { "id": "grid.phaseCount",                  "description": "number of phases being used for charging", "value": 1, "unit": "" },
  { "id": "connector.status",                 "description": "charger connector status",                 "value": "connected", "availableValues": ["connected","disconnected","unknown"] },
  { "id": "charging.status",                  "description": "charger charging status",                  "value": "idle",      "availableValues": ["charging","idle","unknown"] },
  { "id": "charging.current.max",             "description": "maximum allowed charge current",           "value": 8, "unit": "A" },
  { "id": "charging.current.offlineFallback", "description": "fallback current if charger goes offline", "value": 0, "unit": "A" }
]
```

Note: `range.remaining` is given in **metres** (`m`) — the adapter converts it to km for vehicles.

## Device classification in the adapter

Since there is no device `type` field, classification is capability-based and **positive** (no catch-all):

| Type | Detected by | Rationale |
| --- | --- | --- |
| Vehicle | has capability `range.remaining` | Only a car has a driving range. `storage.stateOfCharge` is **not** used because home batteries / inverters report it too. |
| Charger | has a capability id starting with `charging.current.` | Only an EVSE controls the charge current. `connector.status`/`charging.status` are shared with vehicles and therefore insufficient. |
| Anything else | — | Deliberately skipped (debug-logged) so future categories (inverters, heat pumps, batteries) can be added consciously. |

Charger states are written generically: one state per capability, named after the sanitized capability id
(`charging.current.max` → `charging_current_max`), typed from the value (number / boolean / string), with the
API-provided `description` as the state description.