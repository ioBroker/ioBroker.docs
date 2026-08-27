![Logo](admin/elgato-key-light.png)

# ioBroker.elgato-key-light

[![NPM version](https://img.shields.io/npm/v/iobroker.elgato-key-light.svg)](https://www.npmjs.com/package/iobroker.elgato-key-light)
[![Downloads](https://img.shields.io/npm/dm/iobroker.elgato-key-light.svg)](https://www.npmjs.com/package/iobroker.elgato-key-light)
![Installations](https://iobroker.live/badges/elgato-key-light-installed.svg)
![Stable](https://iobroker.live/badges/elgato-key-light-stable.svg)

English | [Deutsch](README_DE.md)

## Disclaimer

All product and company names, logos and trademarks mentioned in this project belong to their respective owners. Their use is solely for identification and does not imply any affiliation with, sponsorship by or endorsement from those owners or their associated companies. This is a private, non-commercial project developed for recreational purposes. Elgato is a trademark of Corsair GmbH.

## Error reporting with Sentry

This adapter uses the Sentry integration provided by ioBroker to automatically report unexpected exceptions and code errors to the developers. Error reporting has been available through js-controller since version 3.0 and helps identify and resolve defects that might otherwise go unnoticed.

For details about the transmitted information and instructions for disabling error reporting, see the [official ioBroker Sentry documentation](https://github.com/ioBroker/ioBroker.js-controller#error-reporting-via-iobroker-sentry).

Control supported Elgato Wi-Fi lights locally from ioBroker, without an Elgato cloud account. The adapter discovers lights through Bonjour/mDNS or connects to a manually configured private IP address or local hostname. It makes device controls and status information available as ioBroker states and provides a convenient dashboard in the Admin interface.

## What the adapter is for

The adapter connects Elgato lights to ioBroker so that they can be used from the Admin object view, scripts, scenes, visualizations and other ioBroker adapters. Typical uses include:

- switching studio lights together with a streaming or recording setup;
- adjusting brightness and color temperature according to the time of day;
- controlling an Elgato Light Strip by RGB/HSV color;
- monitoring whether a light is reachable and when it will next be polled;
- displaying the battery and charging state of a Key Light Mini;
- operating lights manually from the dedicated Elgato Lights dashboard.

Communication stays on the local network. The adapter polls each configured device, publishes its current state and sends user changes back to the device. Failed requests use a bounded retry/backoff strategy so an offline light does not overload the network.

## Supported devices and capabilities

Controls are created from the actual API response rather than from a hard-coded product name. This allows compatible firmware and related Elgato light models to expose all capabilities they report.

| Capability | Key Light / Air / Ring | Key Light Mini | Light Strip |
| --- | --- | --- | --- |
| Power and brightness | Yes | Yes | Yes |
| Color temperature | Yes | Yes | If reported |
| Hue, saturation, RGB and hex | If reported | If reported | Yes |
| Battery and charging information | No | Yes | No |
| Studio mode / battery bypass | No | If reported | No |
| Identify | Yes | Yes | Yes |

Light Strip scenes/effects and device restart are deliberately not exposed because their behavior has not yet been verified across the supported hardware and firmware matrix.

## Requirements

- Node.js 22.18 or newer
- js-controller 7.2.2 or newer
- Admin 7.8.23 or newer
- Network access from the ioBroker host to the lights, normally TCP port 9123
- Bonjour/mDNS UDP port 5353 when automatic discovery is used

The Elgato light and the ioBroker host normally need to be in the same local network. Discovery across VLANs may require an mDNS reflector; manual configuration can be used when multicast discovery is unavailable.

## Installation and setup

1. Install the adapter and create an instance.
2. Open the instance configuration.
3. Select **Scan network** to find `_elg._tcp.local.` services, then add the required results. Alternatively, enter a private IP address or `.local` hostname and port manually. The default Elgato API port is `9123`.
4. Use **Test** to check a manual address before adding it.
5. Enable the configured devices and save the configuration.
6. Open the **Elgato Key Light** tab in the Admin sidebar for live control.

Network scans only show available devices. Add the required scan results explicitly so devices remain assigned to the intended adapter instance.

### Runtime options

| Option | Default | Purpose |
| --- | ---: | --- |
| Polling | 60 s | Normal interval for reading current device data |
| Request timeout | 3000 ms | Maximum duration of one device request |
| Maximum backoff | 300 s | Upper limit for delayed retries after failures |
| Write debounce | 200 ms | Combines rapid slider changes into fewer API requests |
| Discovery timeout | 5000 ms | Duration of one Bonjour/mDNS scan |

A shorter polling interval updates states faster but creates more network and device load. Dashboard switches and sliders update optimistically, so successful actions are visible immediately while the next device response confirms the value.

## Using the dashboard

The adapter tab displays one card for each device configured in the selected instance. A card only shows controls supported by that device:

- **Power** switches the light on or off.
- **Brightness** sets the output from 0 to 100 percent.
- **Temperature** controls white color temperature from 2900 K to 7000 K when supported.
- **Color** opens the browser color picker for RGB-capable devices.
- **Studio mode** controls battery bypass on a Key Light Mini when its firmware reports the setting.
- **Identify** makes the selected device identify itself.
- **Reconnect** immediately reads the device again.

The card also shows online/offline status, response latency, firmware version, battery information where available and a live countdown to the next poll. **All on** and **All off** operate all reachable lights in the current adapter instance. **Refresh** reloads the dashboard data, while **Diagnostics** displays runtime and device information useful for troubleshooting.

Changing the Light Strip color preserves its separate brightness setting. The `hex` and `rgb` state values represent the currently emitted color and therefore include the current brightness. For example, the same blue hue can appear as `#000080` at 50% brightness and `#0000FF` at 100% brightness.

## Controlling devices with ioBroker states

Each successfully contacted device gets a root object based on its serial number:

```text
elgato-key-light.<instance>.<serial>
```

Most devices contain one light at `light.lights.0`. Only states supported by the device are created.

| Relative state | Type / range | Description |
| --- | --- | --- |
| `reachable` | boolean, read-only | Device is currently reachable |
| `identify` | boolean button, write-only | Trigger device identification by writing `true` |
| `info.displayName` | string | Read or change the device display name |
| `light.numberOfLights` | number, read-only | Number of light elements reported by the API |
| `light.lights.0.on` | boolean | Switch power |
| `light.lights.0.brightness` | number, 0–100% | Set brightness |
| `light.lights.0.temperature` | number, 2900–7000 K | Set white color temperature |
| `light.lights.0.hue` | number, 0–360° | Set color hue |
| `light.lights.0.saturation` | number, 0–100% | Set color saturation |
| `light.lights.0.hex` | string | Set color as `#RRGGBB` |
| `light.lights.0.rgb` | string | Set color in legacy `R,G,B` format, for example `255,0,0` |
| `battery.level` | number, 0–100%, read-only | Key Light Mini battery charge |
| `battery.status` | string, read-only | Charging status reported by the device |
| `battery.powerSource` | string, read-only | Current power source |
| `battery.studioMode` | boolean | Enable or disable Studio mode when supported |
| `health.reachable` | boolean, read-only | Detailed reachability state |
| `health.latency` | number in ms, read-only | Duration of the latest API request |
| `health.lastSuccess` | date string, read-only | Time of the last successful contact |
| `health.lastError` | string, read-only | Most recent communication error |
| `health.consecutiveFailures` | number, read-only | Number of consecutive failed polls |
| `health.nextPoll` | date string, read-only | Scheduled time of the next poll |

Additional read-only `info`, Wi-Fi, battery voltage/current and device settings states may be created when the corresponding data is reported.

### Script examples

Replace the instance number and serial number with the IDs from your ioBroker object tree. Writable states must be written with `ack = false` so the adapter recognizes them as commands.

```javascript
const light = 'elgato-key-light.0.EW40K1A09882.light.lights.0';

// Switch on and set brightness to 65%.
setState(`${light}.on`, true, false);
setState(`${light}.brightness`, 65, false);

// Set a warm white color temperature.
setState(`${light}.temperature`, 3200, false);

// Set an RGB-capable light to blue without changing its brightness.
setState(`${light}.hex`, '#0000FF', false);
```

The same writable states can be used from Blockly, Scenes, VIS and other ioBroker components. Rapid slider writes are coalesced per device; the last value wins.

## Multiple instances and removing devices

Every adapter instance has its own authoritative device list. Its configuration page, object tree and dashboard only use devices assigned to that instance. If you run multiple instances, add each light only to the instance that should control it.

Removing a device with the trash icon removes it from the running instance, the persisted instance configuration and that instance's device object tree. Saving the Admin page after configuration changes is still recommended. Devices assigned to another instance are not affected.

## Troubleshooting

### A device is not found

- Confirm that ioBroker and the light can reach each other on the local network.
- For discovery, check multicast DNS/UDP 5353 and `_elg._tcp.local.` forwarding.
- Add the private IP address or `.local` hostname manually if discovery cannot cross a VLAN.
- Confirm that TCP port 9123 is reachable and the device is not isolated by a guest Wi-Fi policy.

### A device is offline in the dashboard

The card shows the latest error and the countdown to the next retry. Use **Reconnect** for an immediate read. Check `health.lastError`, `health.consecutiveFailures` and `health.nextPoll` for automations or monitoring.

### Controls are missing

The adapter creates controls from fields returned by the device. Update the device firmware if appropriate, reconnect it and inspect `info.capabilities` or the dashboard diagnostics. A missing control normally means the API did not report that capability.

### Collecting diagnostics

The dashboard diagnostic dialog includes the adapter/runtime version and current device views. SSID values are omitted, but device serial numbers and local network addresses can be present because they are useful for diagnosis. Review the output before sharing it publicly.

Developers and hardware testers can use the GET-only probe:

```shell
npm run elgato:probe -- 192.168.1.50 9123
```

The probe redacts serial number, MAC address and SSID. Protocol details are documented in [docs/ELGATO_API.md](docs/ELGATO_API.md).

## Network and privacy

Device communication uses the local unauthenticated Elgato HTTP API. Host validation accepts private/link-local addresses and local hostnames only; URL schemes, embedded credentials, paths and public IP addresses are rejected. The adapter does not require an Elgato cloud account and does not add telemetry.

Because the local device API has no authentication, keep lights and the ioBroker host on a trusted network and do not expose TCP port 9123 to the internet.

## Updating from an older version

Serial-number device roots and the established writable paths below `<serial>.light.lights.0` are retained. See [docs/MIGRATION.md](docs/MIGRATION.md) for metadata corrections, configuration migration and rollback information. Create an ioBroker backup before a major update.

## Development

```shell
npm run install:all
npm run lint
npm run typecheck
npm test
npm run test:integration
npm run build
```

Hardware tests are opt-in, GET-only by default and must not run in CI.

## Changelog
### **WORK IN PROGRESS**

### 2.0.0 (2026-08-16)

- (xXBJXx) Reworked the backend with a validated HTTP client, capability detection, resilient polling and bounded Bonjour/mDNS discovery.
- (xXBJXx) Added reliable controls for supported lights, including RGB, temperature, battery and studio mode, with strict instance isolation and clean device removal.
- (xXBJXx) Modernized the configuration and dashboard UIs with responsive device cards, health data, diagnostics and device/API details.
- (xXBJXx) Addressed repository checker findings for managed timers and repository metadata.
- (xXBJXx) Requires Node.js >= 22.18, js-controller >= 7.2.2 and Admin >= 7.8.23.
- (xXBJXx) Fixes issues [#116](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/issues/116), [#117](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/issues/117), [#130](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/issues/130), [#152](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/issues/152) and [#159](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/issues/159); supersedes PRs [#39](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/pull/39), [#129](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/pull/129), [#181](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/pull/181), [#185](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/pull/185), [#186](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/pull/186), [#209](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/pull/209) and [#250](https://github.com/iobroker-community-adapters/ioBroker.elgato-key-light/pull/250).

Older entries: [CHANGELOG_OLD.md](CHANGELOG_OLD.md)

## License

Created by xXBJXx and maintained by ioBroker Community Adapters. Elgato is a trademark of Corsair GmbH; this project is not affiliated with or endorsed by Elgato/Corsair.

Copyright (c) 2024-2026 iobroker-community-adapters mcm57@gmx.at  
Copyright (c) 2023 xXBJXx issi.dev.iobroker@gmail.com

Released under the MIT License. See [LICENSE](LICENSE).
