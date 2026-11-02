![Logo](admin/device-monitoring.png)
# ioBroker.device-monitoring

[![NPM version](https://img.shields.io/npm/v/iobroker.device-monitoring.svg)](https://www.npmjs.com/package/iobroker.device-monitoring)
[![Downloads](https://img.shields.io/npm/dm/iobroker.device-monitoring.svg)](https://www.npmjs.com/package/iobroker.device-monitoring)
![Number of Installations](https://iobroker.live/badges/device-monitoring-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/device-monitoring-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.device-monitoring.png?downloads=true)](https://nodei.co/npm/iobroker.device-monitoring/)

**Tests:** ![Test and Release](https://github.com/BenAhrdt/ioBroker.device-monitoring/workflows/Test%20and%20Release/badge.svg)

## device-monitoring adapter for ioBroker

Watches your defined device states and build warnings and alerts

<img width="1037" height="899" alt="image" src="https://github.com/user-attachments/assets/8ae6d145-90eb-437f-89b5-ce823d63f210" />

## Standard output categories

The standard output categories are mapped as follows:

| Event | Category |
| --- | --- |
| Warning limit reached | `warnung` |
| Alarm limit reached | `alarm` |
| Source update timeout | `alarm` |
| Source missing or invalid | `warnung` |
| State returned to normal | `info` |

## Per-state notification levels
This offers the possibility to deviate from the standard notification (for example, temporarily)

Each monitored state has six writable level states under `devices.<deviceId>.<stateId>.level`:

| State | Event |
| --- | --- |
| `warning` | Warning limit reached |
| `alarm` | Alarm limit reached |
| `timeout` | Source update timeout |
| `invalid` | Source ID missing or deleted |
| `invalidValue` | Source exists but provides an invalid value |
| `recovered` | State returned to normal |

Each level state accepts these values:

| Value | Meaning |
| --- | --- |
| `0` — Standard | Use the event's standard notification category |
| `1` — Disabled | Suppress this event |
| `2` — Info | Send the event with the `info` category |
| `3` — Warning | Send the event with the `warnung` category |
| `4` — Alarm | Send the event with the `alarm` category |

The adapter acknowledges recognized values from `0` to `4` by writing the selected value back with `ack = true`.

## `info.message` state

The read-only `info.message` state contains a JSON string for the latest notification event. Each new event replaces the previous one; this state is not a history. Events are written here even when sending notifications via `notify` is disabled. A level set to `Disabled` suppresses the event entirely.

The JSON object contains these fields:

| Field | Description |
| --- | --- |
| `type` | Original event type: `warning`, `alarm`, `timeout`, `invalidSource`, `invalidValue` or `recovered`; recurring summaries use `summary` |
| `category` | Output notification category after applying the level: `info`, `warnung` or `alarm` |
| `title` | Rendered notification title |
| `message` | Rendered notification message |
| `deviceId`, `deviceName` | Device identifier and display name |
| `stateId`, `stateName` | Monitored state identifier and display name |
| `function` | Configured monitoring function name; empty when no function is assigned |
| `sourceId` | Source state ID |
| `remark` | Configured remark for the monitored state |
| `value`, `unit` | Current source value and its unit |
| `previousValue` | Previous numeric value for a change-based warning or alarm; omitted for other events |
| `triggeredAt` | Event time as a Unix timestamp in milliseconds |
| `lastUpdate` | Last source update time as a Unix timestamp in milliseconds, or `null` |
| `timeoutMinutes` | Configured timeout duration; present for timeout events only |

The `type` field remains the original event type when its notification category is changed by a level. The `info.message` state is acknowledged (`ack = true`) by the adapter.

## Recurring reminders

The Notifications section can enable recurring reminders. The schedule is configured with a Cron selector, and the selected `info`, `warnung` or `alarm` category is used for the summary. At each scheduled time, the adapter checks all monitored states and sends one summary for every currently non-normal state (`warning`, `alarm`, `timeout`, `invalid` or `invalidValue`). If all states are normal, no reminder is sent. If the adapter starts after a scheduled collection start but while its configured duration is still running, that missed collection start is restored with its original end time. The summary stored in `info.message` contains only `type`, `category`, `title` and `message`.

## Limit response time

Warning and alarm limits can optionally have a response time in minutes. The corresponding status and notification become active only when the limit remains violated for the configured duration. If the value returns to normal before that, no warning or alarm is generated. The adapter schedules the activation for the exact due time instead of waiting for the periodic refresh. The start of a pending violation is stored below the monitored state's expert data and survives adapter restarts. If a source state changes while the adapter is stopped and is still active at restart, the change is caught up and can be added to an active notification collection.

Warning and alarm message templates can use `{{warningResponseTime}}` and `{{alarmResponseTime}}`. Each placeholder contains an optional localized suffix such as ` (Ansprechzeit 5 Minuten)` and is empty when no positive response time is configured. Change-based warning and alarm messages also provide `{{previousValue}}` and `{{changeFrom}}`; the latter is an optional localized suffix such as ` (vorheriger Wert: 1 °C)` and is empty for other event types. The default appends the previous-value suffix at the very end of the message, for example: `... ({{remark}}){{warningResponseTime}}{{changeFrom}}`.

Invalid sources and invalid values use the global `invalidResponseTimeSeconds` setting (default: 10 seconds). The invalid status and its notification become active only after this duration; set it to `0` for immediate activation. Invalid-source and invalid-value templates can use `{{invalidResponseTime}}` for the localized response-time suffix.

### Example
`http://192.168.0.222:8081/#tab-objects/select/device-monitoring.0.info.message`

```

{
  "type": "timeout",
  "category": "alarm",
  "title": "Aktualisierungs-Timeout: Timmerflotte Schlafzimmer - Temperatur",
  "deviceId": "device_002",
  "deviceName": "Timmerflotte Schlafzimmer",
  "stateId": "timmerflotte_schlafzimmer",
  "stateName": "Temperatur",
  "sourceId": "lorawan.0.bridge.devices.70c0cc1b11042a812825444dc65d04f5.sensor.schlafzimmer_timmerflotte_temperatur",
  "remark": "",
  "value": 21.39,
  "unit": "°C",
  "triggeredAt": 1790071578722,
  "lastUpdate": 1790071509083,
  "timeoutMinutes": 1,
  "message": "Der State Temperatur vom Gerät Timmerflotte Schlafzimmer hat sich mindestens 1 Minuten nicht gemeldet. Letzte Aktualisierung: 2026-09-22 12:05:09.083"
}

```
### Use Notify Levels in the Notification Manager

<img width="797" height="331" alt="image" src="https://github.com/user-attachments/assets/1772680b-68ab-45d3-947e-4d43610c92b4" />

### Use Notify Levels in (Blockly) Scripts

<img width="1232" height="725" alt="image" src="https://github.com/user-attachments/assets/2d1229ec-ed2b-4974-9625-3be823a8f392" />

### Result (Example)

<img width="591" height="1280" alt="image" src="https://github.com/user-attachments/assets/f6c94e61-a233-4c17-8792-f898b34e80e3" />

### Adapter wiki
[Link to Adapter wiki](https://github.com/BenAhrdt/ioBroker.device-monitoring/wiki)

## ioBroker Forum Link
[https://forum.iobroker.net/test-adapter-device-monitoring](https://forum.iobroker.net/topic/85477/test-adapter-device-monitoring?_=1791737589435)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):	### **WORK IN PROGRESS**
-->
### 0.0.45 (2026-10-14)
* (BenAhrdt) Rebuild card details on startup, ignore rapid source duplicates, and display sub-second intervals as `<1s`.

### 0.0.44 (2026-10-14)
* (BenAhrdt) Rebuild device-card details during the initial refresh even when the current source event is an already processed acknowledgement duplicate.

### 0.0.43 (2026-10-14)
* (BenAhrdt) Restore persisted device-card details after adapter restarts when unchanged source events are skipped as acknowledgement duplicates.

### 0.0.42 (2026-10-14)
* (BenAhrdt) Also suppress same-value acknowledgement events within one second when the preceding source event is only available in persisted monitoring data.

### 0.0.41 (2026-10-12)
* (BenAhrdt) Ignore same-value acknowledgement duplicates in update intervals; provide the standard functions `value.battery (standard)` (warning below 15, alarm below 10, 15-minute timeout), `indicator.alarm (standard)`, and `indicator.maintenance (standard)`, including role-based defaults for bulk state search. Function templates can be explicitly applied to all assigned monitored states.

## Collaboration
The adapter was developed in collaboration with Joerg Froehner

## License
MIT License

Copyright (c) 2026 BenAhrdt <github@ben-schmidt.net>

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