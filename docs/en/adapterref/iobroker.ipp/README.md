# ioBroker Internet Printing Protocol

![Network printer monitoring illustration](admin/ipp-banner.jpg)

[![NPM version](https://img.shields.io/npm/v/iobroker.ipp.svg)](https://www.npmjs.com/package/iobroker.ipp)
[![Downloads](https://img.shields.io/npm/dm/iobroker.ipp.svg)](https://www.npmjs.com/package/iobroker.ipp)

## ioBroker Internet Printing Protocol Adapter

The adapter polls configured network printers using the Internet Printing Protocol (IPP) and publishes read-only availability, printer state, toner or ink levels, and supported page counters. It uses `Get-Printer-Attributes` over IPP/2.0; device and firmware support varies, so optional attributes may not be reported by every printer. Compatibility depends on each printer’s IPP implementation; no particular device has been verified against this implementation.

For the protocol model and attribute definitions, see [RFC 8011](https://www.rfc-editor.org/rfc/rfc8011.html).

Node.js 22 or newer, Admin 8.2.0 or newer, and js-controller 7.2.2 or newer are required.

## Configuration

Configure polling interval and request timeout at the top of the adapter configuration page. Add and manage printers below using the Device Manager. Use its **Add printer**, **Edit**, and **Remove** actions; printer cards show the configured host, live connection state, and model when reported. During printer removal or legacy cleanup, the adapter preserves an object subtree if any descendant state has `common.custom` settings and logs a warning. A removed printer is no longer polled, so retained values may become stale; after transferring or removing the custom settings, delete the retained objects manually if desired.

Printer configurations are stored in backed-up file storage per adapter instance (for example, at `ipp.0/printer-config.json`) so saving other instance settings in Admin cannot overwrite concurrent Device Manager changes. Existing `native.printers` configurations and per-instance legacy configurations stored at `ipp.0.info.printerConfig/printers.json` are migrated automatically on first startup. The former shared `ipp/printer-config.json` file is not migrated automatically because its owning instance cannot be determined safely; restore its printer list through the appropriate instance's Device Manager. Existing printers with the legacy ID `info` remain usable regardless of capitalization; new printers cannot use `info` in any capitalization.

| Setting | Description |
| --- | --- |
| ID | Stable object-tree identifier; use 1-32 letters, digits, underscores, or hyphens. German umlauts are transliterated (`ä` to `ae`, `ö` to `oe`, `ü` to `ue`, `ß` to `ss`). The ID cannot be changed after creation because it determines the printer's state IDs. |
| Label | Display name for the printer. |
| Host | Printer hostname or IP address without a scheme, port, credentials, path, query, fragment, or embedded whitespace. IPv6 literals must be enclosed in brackets. |
| Port | IPP port; defaults to `631`. |
| IPP resource path | Absolute resource path without `..`, whitespace, query, or fragment; defaults to `/ipp/print`. |
| Use TLS | Use IPPS over TLS. |
| Verify TLS certificate | Validate the printer's TLS certificate; disabled by default for self-signed printer certificates. |

The polling interval defaults to 60 seconds and is limited to 10 seconds through 24 hours. The request timeout defaults to 5000 ms and is limited to 500-30000 ms; it is a hard deadline for the complete request and response, including slow or incomplete responses. The adapter only sends the read-only `Get-Printer-Attributes` operation; it does not submit print jobs or change printer settings. Configure only printers that expose an IPP endpoint at the selected host, port, and resource path.

Empty placeholder rows are ignored during startup and migration. Other invalid printer rows are skipped with a warning that identifies the invalid fields. Debug logging reports configured field names and value types without printing configured values.

When a printer is switched off or temporarily unreachable, the adapter marks it offline without a warning-level log; connection and timeout details are available at debug level. IPP protocol, TLS, and configuration errors remain warnings.

## States

Each configured printer gets a device with `status`, `supplies`, `counters`, and `details` channels. Supplementary scalar numeric, boolean, and string IPP attributes are created directly under `details` (for example, `details.printer_up_time`); string values are exposed as returned and may contain printer-localized text. Arrays and structured values are omitted, and attributes already represented by canonical status, model, and counter states are not duplicated. The adapter requests all IPP attributes and creates states for returned values except explicitly excluded capabilities, verbose attribute families, and raw marker values; selected capability/default attributes are retained. Canonical lower-case attribute names made of alphanumeric segments separated by single hyphens keep their normalized IDs; other source names receive deterministic suffixes. Previously published IDs can change if a source name was non-canonical or if collision handling had assigned a numeric suffix; old detail states are cleared after a successful poll, so automations using those IDs may need updating. `status.online` is always present; `status.model`, `status.message`, and numeric `status.state` are published when supported. The complete trimmed `printer-make-and-model` value is exposed as `status.model`. Status messages use English labels derived from IPP reason keywords, including recognized `-report`, `-warning`, and `-error` suffixes, or from the canonical printer state; the device-provided `printer-state-message` is not published. The state value is `0` (`off`) while the printer is unreachable, and returns to the reported IPP state when it reconnects. Previously read measurements remain available while offline, and the last toner readings are retained if a poll does not include valid supply data. Supply names use recognized English marker color/type labels instead of raw `marker-names`; an English generic name is used when those labels are unavailable. IPP `marker-levels` are already percentage values and are used directly; optional low/high marker levels do not rescale them. Invalid, reserved, or out-of-range values are skipped, while a supply keeps its original position in the printer's marker arrays. `pages_completed`, `impressions_completed`, and `media_sheets_completed` are created only when the printer reports them. Missing counter and detail values are cleared rather than replaced with zero during successful polls, including after adapter restarts. Request details are not logged.

For supply reporting, the adapter combines each `marker-names` entry with the same-position `marker-levels` entry; recognized `marker-types` and `marker-colors` provide an English display name, while the original marker name is retained for the existing state ID. If no recognized type is available, the display name is `Supply N`. A supply is skipped if its name or percentage value is missing, invalid, or outside 0-100. Counters map from `pages-completed`, `impressions-completed`, and `media-sheets-completed` to `pages_completed`, `impressions_completed`, and `media_sheets_completed`. When reporting missing values, include the printer model and firmware, which of these IPP attributes the printer returns, and the raw values or state IDs that are absent.

[![Donate with PayPal](https://camo.githubusercontent.com/ef8c60305542390406855547e32850909812a73c4abada236de22a6dc88b313f/68747470733a2f2f7777772e70617970616c6f626a656374732e636f6d2f64655f44452f44452f692f62746e2f62746e5f646f6e61746543435f4c472e676966)](https://www.paypal.com/donate/?hosted_button_id=3RJQGSJNRSHUJ)

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.3.0 (2026-11-19)

- (Voodoo2man) Exposed printer online/offline status in ioBroker Admin.
- (Voodoo2man) Preserved custom states in printer objects during cleanup.
- (Voodoo2man) Prevented empty legacy printer rows from causing startup warnings.

### 0.2.1 (2026-11-11)

- (Voodoo2man) Hardened printer configuration storage with normalized request timeouts, safer migration, per-instance file isolation, and cleanup of owned orphaned legacy roots.
- (Voodoo2man) Treated temporary printer gateway errors as offline states without warning-level logs.
- (Voodoo2man) Improved published printer data with stable detail IDs, English IPP reason labels, complete model names, and scalar text details that may retain printer-localized wording.
- (Voodoo2man) Combined basic settings and printer management on one configuration page.

### 0.2.0 (2026-11-08)

- (Voodoo2man) Hardened IPP response handling, corrected supply percentages and state clearing, preserved legacy printer configurations, normalized printer IDs, refreshed state metadata, localized Device Manager actions, scheduled polls after each completed cycle, and isolated Device Manager storage from Admin saves.
- (Voodoo2man) Aligned saved endpoint validation with polling, made colliding dynamic detail IDs unique, and removed unused UI translation entries.

### 0.1.1 (2026-11-07)

- (Voodoo2man) Kept the last toner readings when printers temporarily omit supply data.

### 0.1.0 (2026-11-03)

- (Voodoo2man) Replaced the printer list with Device Manager configuration and split basic settings into a separate tab.

Older release notes are available in CHANGELOG_OLD.md.

## License
MIT License

Copyright (c) 2026 Voodoo2man <Voodoo2man@outlook.de>

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