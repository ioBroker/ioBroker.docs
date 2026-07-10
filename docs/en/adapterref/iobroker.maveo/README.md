![Logo](admin/maveo.png)
# ioBroker.maveo

[![NPM version](https://img.shields.io/npm/v/iobroker.maveo.svg)](https://www.npmjs.com/package/iobroker.maveo)
[![Downloads](https://img.shields.io/npm/dm/iobroker.maveo.svg)](https://www.npmjs.com/package/iobroker.maveo)
![Number of Installations](https://iobroker.live/badges/maveo-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/maveo-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.maveo.png?downloads=true)](https://nodei.co/npm/iobroker.maveo/)

**Tests:** ![Test and Release](https://github.com/TA2k/ioBroker.maveo/workflows/Test%20and%20Release/badge.svg)

## maveo adapter for ioBroker

Adapter for the maveo garage door systems by Marantec. Two operating modes:

- **Cloud mode (default)** — login against the Marantec cloud (Amazon Cognito),
  control through the Nymea tunnel `wss://remoteproxy.nymea.io`.
  Requires the box to be paired **via Bluetooth onboarding** in the maveo app
  (the app writes the Cognito Identity ID into the box during onboarding).
  If the box was only added locally, the cloud device list is empty; in that
  case the adapter tells you so in the log and you can switch to LAN mode.
- **LAN mode** — direct JSON-RPC connection to the box (`<boxIp>:2222` over
  TLS by default). On first start push-button authentication is performed:
  press the yellow button on the back of the maveo box within 60 s. The
  resulting token is stored in the adapter. Works independently of the
  Cognito account and is the reliable option when the box is reachable on
  the local network.

State updates (position, movement, sensors) arrive as push notifications in
both modes via `Integrations.StateChanged`; open/close is issued via
`Integrations.ExecuteAction`.

## Configuration

| Field | Meaning | Default |
|---|---|---|
| `App Email` / `App Password` | Credentials of the maveo app (cloud mode only) | — |
| `Region` | `eu` (Europe) or `us` (USA) | `eu` |
| `IoT wake topic` | Optional AWS IoT topic used to wake the box | empty |
| `Maveo box IP` | Enables LAN mode when set | empty |
| `Port` | JSON-RPC port | 2222 |
| `TLS` | SSL for the JSON-RPC socket | on |

The Cognito pool/client IDs and IoT endpoints are hard-coded from the maveo
app 2.6.1 and region-dependent. The local push-button token is stored
encrypted in `native.localToken`.

## Control

For each thing the adapter creates writable states under
`maveo.<inst>.<thingId>.remote.<action>` (for example `open`, `close`).
Writing any value to such a state issues `Integrations.ExecuteAction`.
State changes come in automatically as push updates in
`maveo.<inst>.<thingId>.<stateTypeId>`.

## Discussion

https://forum.iobroker.net/topic/48101/test-adapter-maveo-v-0-0-x

## Changelog

### 0.1.0

* Two operating modes: cloud (Cognito + Nymea tunnel) and LAN (direct
  connection to the box with push-button auth). Region selectable (EU/US).
  Cognito pool/client IDs and cloud endpoints verified against the maveo app
  2.6.1 (Ghidra decompile). Thing/action discovery over Nymea, push-based
  state updates, working remote control, message buffering and exponential
  reconnect back-off.

### 0.0.5

* (TA2k) update login keys

### 0.0.4

* (TA2k) fix status

### 0.0.1

* (TA2k) initial release

## Sentry

This adapter uses the Sentry libraries to automatically report exceptions and
code errors to the developer. For more details and for information on how to
disable the error reporting see
[Sentry Plugin Documentation](https://github.com/ioBroker/plugin-sentry).

## License

MIT License

Copyright (c) 2021-2026 TA2k <tombox2020@gmail.com>

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
