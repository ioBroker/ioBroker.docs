---
chapters: {"pages":{"en/adapterref/iobroker.bluetti/README.md":{"title":{"en":"ioBroker.bluetti"},"content":"en/adapterref/iobroker.bluetti/README.md"},"en/adapterref/iobroker.bluetti/docs/research/bluetti-ha-api-notes.md":{"title":{"en":"BLUETTI Home Assistant API Notes"},"content":"en/adapterref/iobroker.bluetti/docs/research/bluetti-ha-api-notes.md"},"en/adapterref/iobroker.bluetti/docs/auth-flow.md":{"title":{"en":"BLUETTI Auth, Token and Device Selection Flow"},"content":"en/adapterref/iobroker.bluetti/docs/auth-flow.md"}}}
---
# BLUETTI Home Assistant API Notes

Status: source-researched from the official BLUETTI Home Assistant integration.

Research source:

- Repository: <https://github.com/bluetti-official/bluetti-home-assistant>
- Local research clone: `/home/pascal/work/iobroker-bluetti-work/sources/bluetti-home-assistant`
- Source commit inspected: `64aa1f85e2eea9c6621cc80d390d7252cd13a83c`

These notes intentionally record only source-backed details. Real Elite 30 V2 payload values still need validation with a sanitized account/device response.

## Source files inspected

- `README.md`
- `custom_components/bluetti/config_flow.py`
- `custom_components/bluetti/application_credentials.py`
- `custom_components/bluetti/profile/application.yaml`
- `custom_components/bluetti/oauth.py`
- `custom_components/bluetti/__init__.py`
- `custom_components/bluetti/api/bluetti.py`
- `custom_components/bluetti/api/product_client.py`
- `custom_components/bluetti/api/websocket.py`
- `custom_components/bluetti/api/unify_response.py`
- `custom_components/bluetti/model/product.py`
- `custom_components/bluetti/models.py`
- `custom_components/bluetti/sensor.py`
- `custom_components/bluetti/switch.py`
- `custom_components/bluetti/select.py`
- `custom_components/bluetti/icon_config.py`

## Official integration scope

The upstream README states that the integration is officially supported by BLUETTI and connects BLUETTI smart power station devices to Home Assistant (`README.md:6-11`).

The upstream feature list includes:

- power switch
- inverter status
- battery SOC
- AC/DC switches
- AC/DC ECO
- work mode switch
- sleep mode
- PV input power
- grid input power
- AC output power
- DC output power

Source: `README.md:13-28`.

The upstream model matrix lists `PR30V2,EL30V2` / "Premium 30 V2, Elite 30 V2, AORA 30 V2" with support for battery SOC, AC switch, DC switch, AC ECO, DC ECO, work mode switch, sleep mode, PV input power, grid input power, AC output power, and DC output power (`README.md:36-50`).

This confirms official integration support for the Elite 30 V2 model family at feature-matrix level. It does **not** yet verify actual field names or example values from a real EL30V2 account.

## Configuration and OAuth flow

The upstream README describes a Home Assistant configuration flow where the user adds the `bluetti` integration, proceeds with OAuth authorization, agrees that Home Assistant can access the BLUETTI account/cloud, logs into the BLUETTI account, links it to Home Assistant, and selects devices (`README.md:105-135`).

The integration uses Home Assistant's OAuth/application-credentials framework:

- `config_flow.py:15-19` imports a default OAuth client credential. The adapter uses the same built-in defaults for Admin login and still allows expert overrides via direct native-object edits.
- `application_credentials.py:13-16` constructs the authorization and token URLs from the configured SSO base URL.
- `oauth.py:24-38` implements an `OAuth2FlowHandler`; after OAuth callback it continues to device selection.
- `oauth.py:93-102` uses `self._oauth_data['token']['access_token']` to create a `ProductClient` and call `get_user_products()`.
- `oauth.py:137-149` presents the available devices as a Home Assistant multi-select.
- `oauth.py:42-90` calls `bind_devices()` for the selected device serials and stores `auth_implementation`, `token`, and selected `products` in the config entry.

### OAuth endpoints

The profile file contains these base URLs (`profile/application.yaml:1-5`):

| Purpose | URL |
|---|---|
| SSO base | `https://sso.bluettipower.com` |
| API gateway base | `https://gw.bluettipower.com` |
| WebSocket base | `wss://gw.bluettipower.com/api/edgeiotgw/ws-coordination/` |

The authorization server is assembled as (`application_credentials.py:13-16`):

| Purpose | URL |
|---|---|
| OAuth authorize | `https://sso.bluettipower.com/oauth2/grant` |
| OAuth token | `https://sso.bluettipower.com/oauth2/token` |

### Token handling

- REST requests send the access token as a bare `Authorization` header value, without a `Bearer ` prefix in the upstream code (`api/bluetti.py:63-65`).
- WebSocket/STOMP connection headers also send the access token as `Authorization` (`api/websocket.py:20-25`).
- `AsyncConfigEntryAuth.async_get_access_token()` calls Home Assistant's `async_ensure_token_valid()` before returning the access token (`oauth.py:172-175`).
- `AuthTokenRefresh` checks token expiry once at startup and on a daily interval (`oauth.py:191-205`).
- Token validity is calculated from either `expires_at` or `created_at + expires_in`, with a 30-second safety margin (`oauth.py:209-225`).
- If a token has less than seven days remaining, the integration calls Home Assistant's OAuth implementation `async_refresh_token(...)`, throttled to at most once per hour after a previous refresh attempt (`oauth.py:241-267`).
- Token-expired handling uses event `onTokenExpired` and persistent notification `notifyTokenExpire` (`const.py:7-8`, `oauth.py:178-239`).
- WebSocket `ERROR` frames with `msgCode == 805` are treated as token expiry and stop the WebSocket connection (`api/websocket.py:153-161`).

Source quirk to verify before implementation: REST token-expiry handling checks `data['code'] == 805` in `api/bluetti.py:93-101`, while the response model is `msgCode` (`api/unify_response.py:7-20`). This may be an upstream bug or a response-shape inconsistency.

## Verified REST endpoints

All REST endpoints are called through `_request(...)`, which prefixes the path with `APPLICATION_PROFILE.config["server"]["gateway"]` (`api/bluetti.py:76-81`). With the production profile this means `https://gw.bluettipower.com` (`profile/application.yaml:1-5`).

| Purpose | Method | Full URL | Source |
|---|---:|---|---|
| List user devices/products | GET | `https://gw.bluettipower.com/api/bluiotdata/ha/v1/devices` | `api/product_client.py:30-39` |
| Poll device status | GET | `https://gw.bluettipower.com/api/bluiotdata/ha/v1/deviceStates?sns=<serial>` | `api/product_client.py:41-50` |
| Control device function | POST | `https://gw.bluettipower.com/api/bluiotdata/ha/v1/fulfillment` | `api/product_client.py:52-61` |
| Bind selected devices | POST | `https://gw.bluettipower.com/api/bluiotdata/ha/v1/bindDevices` | `api/product_client.py:62-70` |

For this ioBroker adapter's first versions, the control endpoint is documented only as upstream behavior. It should not be exposed while the adapter remains read-only.

## WebSocket / push update flow

The upstream integration also opens a STOMP-over-WebSocket connection:

- WebSocket URL is built by appending `/websocket` to the configured WSS base (`api/websocket.py:19-25`), resulting in `wss://gw.bluettipower.com/api/edgeiotgw/ws-coordination//websocket` with the current profile string. The double slash should be verified but is likely tolerated or normalized by the server/client.
- On open, the client sends a STOMP `CONNECT` frame with `accept-version`, `Host`, `Authorization`, and `heart-beat` headers (`api/websocket.py:75-85`).
- After a `CONNECTED` frame, it subscribes to `/ws-subscribe/user/<user-name>/notify` (`api/websocket.py:162-168`).
- On `MESSAGE`, the frame body is passed to the handler (`api/websocket.py:169-170`).
- `BluettiData.web_socket_message_handler()` expects JSON where `data.deviceSn` identifies the changed device, then triggers `device.async_update()` for that serial (`models.py:46-56`).

For a first ioBroker implementation, polling `deviceStates` is the simpler validated path. WebSocket can be deferred unless latency or rate limits require it.

## Response and device data model

### API wrapper

The upstream response wrapper is `UnifyResponse` with these fields (`api/unify_response.py:7-20`):

- `msgId: str`
- `msgCode: int`
- `data: T | None`

`msgCode == 0` is considered success.

### User product / device object

`UserProduct` is modeled with (`model/product.py:6-15`):

- `sn: str`
- `stateList: list`
- `online: str`
- `model: Optional[str]`
- `name: Optional[str]`
- `isBindByCurUser: Optional[str]`

### State list entries

Each `stateList` entry is mapped in `models.py:104-114` into:

- `fnCode` → `BluettiState.fn_code`
- `fnName` → `BluettiState.fn_name`
- `fnValue` → `BluettiState.fn_value`
- `fnType` → `BluettiState.fn_type`
- `supportModeValues` → mode/select values
- `sensorInfo` → sensor metadata

Device status polling updates the existing states by matching each incoming entry's `fnCode` and replacing `fnValue` (`models.py:201-229`).

### Entity mapping behavior in Home Assistant

- Sensors are created when `fnType == 'SENSOR'` and `sensorInfo` is present (`sensor.py:87-96`).
- Binary connectivity is special-cased for `fnCode == 'onLine'` (`sensor.py:59-65`, `sensor.py:97-98`).
- Switch entities are created when `fnType == 'SWITCH'` (`switch.py:24-29`).
- Select entities are created when `fnType == 'SELECT'` and `supportModeValues` is present (`select.py:24-28`).
- `InvWorkState` is treated as read-only diagnostic select (`select.py:55-64`, `select.py:89-93`).

Sensor metadata maps upstream `sensorInfo.sensorType` values to Home Assistant device classes (`sensor.py:36-57`):

| Upstream sensor type | HA device class | Default unit |
|---|---|---|
| `SensorDeviceClass.BATTERY` | battery | `%` |
| `SensorDeviceClass.ENUM` | enum | — |
| `SensorDeviceClass.DURATION` | duration | `min` |
| `SensorDeviceClass.POWER` | power | `W` |

Icon mappings mention these relevant `fnCode` values (`icon_config.py:4-28`):

| `fnCode` | Meaning inferred from upstream name/icon |
|---|---|
| `SOC` | battery SOC |
| `InvWorkState` | inverter/work state |
| `ChgFullTime` | full-charge time |
| `ACLoadAllTotalPower` | AC load/output total power |
| `DCLoadAllTotalPower` | DC load/output total power |
| `PVAllTotalPower` | PV input total power |
| `GridAllTotalPower` | grid input total power |
| `SetCtrlWorkMode` | work mode select |
| `SetDCECO` | DC ECO select/control |
| `SetACECO` | AC ECO select/control |
| `SetCtrlAc` | AC switch |
| `SetCtrlDc` | DC switch |
| `SetCtrlPowerOn` | main power switch |
| `Storm_Mode_Cloud_Ctrl` | storm mode cloud control |
| `SetCtrlPowerOn-2` | sleep/power-related control |
| `onLine` | connectivity |

These names are useful hints, but real EL30V2 `stateList` entries must still be validated before exposing an ioBroker state as verified.

## Verified Elite 30 V2 fields

Source-verified for the `PR30V2,EL30V2` model family at README matrix level (`README.md:36-50`):

| Capability | Verified source status |
|---|---|
| Battery SOC | listed as supported |
| AC switch | listed as supported |
| DC switch | listed as supported |
| AC ECO | listed as supported |
| DC ECO | listed as supported |
| Work mode switch | listed as supported |
| Sleep mode | listed as supported |
| PV input power | listed as supported |
| Grid input power | listed as supported |
| AC output power | listed as supported |
| DC output power | listed as supported |

## Verified Elite 30 V2 payload

Captured 2026-07-05 from a live `GET /api/bluiotdata/ha/v1/deviceStates` response
for a real Elite 30 V2 (`msgCode == 0`, serial redacted). The `stateList` held
exactly these 12 entries; `fnValue` is delivered as a string in every entry:

| `fnCode` | `fnName` | `fnType` | Example `fnValue` | ioBroker state |
|---|---|---|---|---|
| `SOC` | Battery Level | SENSOR | `79` | `battery.soc` |
| `DsgFullTime` | Battery Time In Minutes | SENSOR | `2592` | `battery.dischargeRemaining` |
| `ChgFullTime` | Full Charge Time In Minutes | SENSOR | `0` | `battery.chargeRemaining` |
| `PVAllTotalPower` | Photovoltaics Input Power | SENSOR | `0` | `power.pvInput` |
| `GridAllTotalPower` | Grid Input Power | SENSOR | `241` | `power.gridInput` |
| `ACLoadAllTotalPower` | Alternating Current Out Power | SENSOR | `241` | `power.acOutput` |
| `DCLoadAllTotalPower` | Direct Current Out Power | SENSOR | `0` | `power.dcOutput` |
| `SetCtrlAc` | AC | SWITCH | `1` | `power.acOutputActive` (read-only) |
| `SetCtrlDc` | DC | SWITCH | `0` | `power.dcOutputActive` (read-only) |
| `SetACECO` | AC ECO | SWITCH | `0` | `power.acEco` (read-only) |
| `SetDCECO` | DC ECO | SWITCH | `1` | `power.dcEco` (read-only) |
| `SetCtrlWorkMode` | Working mode | SELECT | `workmode_3` | `device.workMode` |

Confirmed by this capture:

- The generic power fnCodes (`PVAllTotalPower`, `GridAllTotalPower`,
  `ACLoadAllTotalPower`, `DCLoadAllTotalPower`) **are** the real EL30V2 names.
- `fnValue` is string-typed for both sensors and switches; the adapter converts
  per the target state's declared type.
- The `SWITCH`/`SELECT` entries report current state; exposed read-only only.

Not present in this payload, therefore **not** exposed (must not be invented):

- remaining energy in Wh (`battery.remainingWh`)
- battery temperature (`battery.temperature`)
- explicit UPS bypass flag (`ups.bypassActive`)
- `sensorInfo` metadata (absent from the EL30V2 `stateList` entries)

Still open for other models / firmware:

- exact `fnCode` set for non-EL30V2 devices
- the full `SetCtrlWorkMode` enum value range and human labels

## Error handling and status signals

Verified source-backed behavior:

- Non-2xx REST responses raise `ApplicationRuntimeException` with HTTP status and response text (`api/bluetti.py:86-88`).
- WebSocket token expiry is detected as `ERROR` frame `msgCode == 805` (`api/websocket.py:153-161`).
- Token expiry triggers a Home Assistant notification rather than silent retry forever (`oauth.py:227-239`).
- Device online state is exposed as `BluettiDevice.online`, true when `online == '1'` (`models.py:172-174`).
- If a polled device returns `isBindByCurUser == '0'`, upstream starts a device-unbind cleanup path (`models.py:201-229` and later cleanup logic in the same file).

Open for ioBroker design:

- Map HTTP 401/403 and token-expiry code 805 to explicit auth/config status, not outage suspicion.
- Map gateway/network timeouts to provider/cloud reachability status.
- Map `online != '1'` to device offline status, separate from cloud/API failure.
- Keep `info.connection` conservative: true only when the provider can authenticate and return usable telemetry/status for at least one selected device.

## Security and redaction requirements

The following must never be logged by the ioBroker adapter:

- BLUETTI account password
- access token
- refresh token
- `Authorization` header
- full raw account identifiers
- full device serials unless explicitly redacted
- raw telemetry payloads before redaction

Upstream has at least one commented debug line that would have logged the access token (`api/websocket.py:31-33`), and REST request logging can include request bodies (`api/bluetti.py:67-74`). The ioBroker implementation should use an explicit sanitizer rather than copying those logging patterns.

## Decision: direct cloud provider feasibility

A direct BLUETTI cloud provider is feasible enough to proceed with an ioBroker adapter scaffold, with caveats.

Source-backed reasons:

- Official integration exists and is maintained by `bluetti-official` (`README.md:6-11`).
- Production SSO, gateway, and WebSocket hosts are present in source (`profile/application.yaml:1-5`).
- Device list and device status REST endpoints are present and clearly wrapped (`api/product_client.py:30-50`).
- EL30V2/PR30V2 is listed as supported by the official integration (`README.md:36-50`).

Required implementation caveats:

- First implementation should be cloud-only and read-only.
- Do not implement control states in v0.1, even though upstream exposes a fulfillment endpoint.
- Scaffold should leave room for an OAuth-capable admin/auth flow. A plain username/password JSON config is not source-verified as sufficient.
- Polling via `deviceStates` should be the first telemetry path; WebSocket can be added later.
- Real sanitized EL30V2 payloads are still required before marking fields beyond the README support matrix as verified.

## Unknowns / blockers

- Exact OAuth grant details and redirect requirements outside Home Assistant's helper abstraction.
- Whether BLUETTI supports a safe non-HA OAuth flow suitable for ioBroker admin UI.
- Token response fields in practice (`expires_at`, `expires_in`, refresh token presence, scopes).
- Exact EL30V2 `stateList` payload shape and `fnCode` values.
- Whether EL30V2 telemetry includes UPS mode, bypass, remaining Wh, temperature, or other richer diagnostics.
- Rate limits for `deviceStates` polling.
- Whether cloud status distinguishes BLUETTI API outage, internet outage, device offline, and account/auth failure cleanly.
- Whether WebSocket URL double-slash behavior is intentional or tolerated.
- Whether REST token-expiry code is `code == 805` or `msgCode == 805` in live responses.