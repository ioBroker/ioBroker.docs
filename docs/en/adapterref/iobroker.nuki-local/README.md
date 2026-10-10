# ioBroker.nuki-local

Local Nuki Smart Lock integration for ioBroker using an integrated MQTT broker.

Manufacturer and product information: [Nuki](https://nuki.io/).

The adapter is designed for direct local communication with compatible Nuki Smart Locks over MQTT.
Optionally, the Nuki Web API can be enabled to enrich the local MQTT data with authorization names and activity information.

## Features

- Integrated MQTT broker
- Local communication with Nuki Smart Locks
- No separate MQTT broker required
- MQTT authentication with username and password
- Persistent retained MQTT data using LevelDB
- Automatic restore of retained Nuki states after adapter restart
- Automatic device creation
- Lock status
- Door sensor status
- Battery information
- Firmware information
- Device type
- Online status
- Lock / unlock / unlatch commands
- Lock'n'Go commands
- Fingerprint detection
- Keypad code detection
- Configurable Code-ID to user-name mapping
- Optional Nuki Web API integration
- Activity information
- Dynamic status icons
- Local operation remains available even when the Nuki Web API is disabled

## Installation

Install the adapter from the ioBroker Admin interface once it is available in the ioBroker repository.

## MQTT configuration

Default MQTT port:

```text
1883
```

Default MQTT username:

```text
nuki
```

Configure the same MQTT username and password in the Nuki app.

Use the IP address of the ioBroker server as MQTT broker.

Example:

```text
Broker: 192.168.178.124
Port: 1883
Username: nuki
Password: your configured password
```

## MQTT persistence

Retained MQTT states are stored using LevelDB.

Example persistence directory:

```text
/opt/iobroker/iobroker-data/nuki-local.0/mqtt-leveldb
```

The adapter restores retained Nuki states automatically after a restart.

## Object structure

Each Nuki device is created below:

```text
nuki-local.0.<NUKI-ID>
```

Structure:

```text
<NUKI-ID>
├── activity
├── advanced
├── battery
├── commands
├── device
├── keypad
├── status
└── raw
```

## Status

Available states include:

```text
status.lockState
status.lockStateText
status.locked
status.doorState
status.doorStateText
status.doorOpen
status.timestamp
status.iconState
status.icon
```

## Battery

```text
battery.percent
battery.critical
battery.charging
battery.keypadCritical
battery.doorSensorCritical
```

## Device information

```text
device.name
device.firmware
device.deviceType
device.mode
device.online
```

## Commands

Commands are available below:

```text
nuki-local.0.<NUKI-ID>.commands
```

### Lock

```text
commands.lock
```

Internally:

```text
lockAction = 2
```

### Unlock

```text
commands.unlock
```

Internally:

```text
lockAction = 1
```

This unlocks the lock without intentionally pulling the latch.

### Unlatch

```text
commands.unlatch
```

Internally:

```text
lockAction = 3
```

### Lock'n'Go

```text
commands.lockNgo
```

Internally:

```text
lockAction = 4
```

### Lock'n'Go with unlatch

```text
commands.lockNgoUnlatch
```

Internally:

```text
lockAction = 5
```

### Full lock

```text
commands.fullLock
```

Internally:

```text
lockAction = 6
```

## Keypad and fingerprint

The adapter processes `lockActionEvent` messages.

Example:

```text
3,0,195249,8193,2
```

Fields:

```text
action
trigger
authId
codeId
source
```

Keypad source:

```text
0 = Back button
1 = Keypad code
2 = Fingerprint
```

Relevant ioBroker states:

```text
keypad.lastType
keypad.lastUser
keypad.lastTimestamp
```

## Configurable keypad users

Users can map a Nuki `codeId` to a custom name in the adapter configuration.

Example:

```text
Code ID   Name
8193      User 1
8192      User 2
```

The names are not hard-coded into the adapter.

Resolution priority:

```text
1. Configured Code-ID mapping
2. Nuki Web API authorization name
3. Technical fallback
```

## Activity

```text
activity.lastAction
activity.lastActionText
activity.lastUser
activity.lastDate
```

## Advanced data

```text
advanced.authId
advanced.codeId
advanced.source
advanced.trigger
advanced.smartlockId
advanced.serverState
advanced.authorizations
```

## Raw MQTT data

Unknown MQTT topics are stored below:

```text
raw
```

This helps with debugging and future topic support.

## Nuki Web API

The Web API integration is optional.

MQTT remains the primary local communication method.

The Web API can provide additional information such as:

- authorization names
- activity logs
- cloud-side device information

The adapter continues operating locally if the Web API is unavailable.

## Dynamic icons

Available states:

```text
status.iconState
status.icon
```

Possible values:

```text
locked
unlocked
door_open
door_closed
charging
pairing
unknown
```

Icon files are stored under:

```text
admin/icons/Nuki_Vis/
```

Files:

```text
nuki_locked.png
nuki_unlocked.png
nuki_door_open.png
nuki_door_closed.png
nuki_charging.png
nuki_pairing.png
nuki_unknown.png
```

Example icon path:

```text
/adapter/nuki-local/icons/Nuki_Vis/nuki_locked.png
```

## Security

Use a strong MQTT password.

Do not expose the integrated MQTT broker directly to the public internet.

Treat the Nuki Web API token as a secret.

Keypad PIN codes are intentionally not stored by the adapter.

## Troubleshooting

Show adapter logs:

```bash
iobroker logs nuki-local.0 --watch
```

Upload adapter files:

```bash
iobroker upload nuki-local
```

Restart:

```bash
iobroker restart nuki-local.0
```

## Changelog

### 0.1.4 (2026-10-10)

- (helfi9999) Added readable fingerprint and keypad access logs with device name, user name and action.

- (helfi9999) Moved raw MQTT messages to debug logging.
- (helfi9999) Added readable lock and door state change logs using the device name, suppressing duplicate and initial states.

### 0.1.3 (2026-10-04)

- (helfi9999) Replaced the default adapter icon with a custom Nuki icon.
- (helfi9999) Limited the Web API polling interval to 60–86400 seconds and prevented overlapping updates.
- (helfi9999) Corrected access and activity date roles and removed an unused translation key.
- (helfi9999) Reset the code ID when importing Web API activity data.

- (helfi9999) Changed state texts to English and completed configuration label translations.
- (helfi9999) Corrected command button, authorization JSON and timestamp roles.
- (helfi9999) Added a Web API request timeout and MQTT device ID validation.
- (helfi9999) Updated Aedes, Node.js types, testing tools and transitive dependencies.
- (helfi9999) Added Node.js 26 testing and updated the workflow check action.
- (helfi9999) Updated documentation, keywords and maintainer contact information.
- (helfi9999) Adapter requires admin >= 7.8.23 now.

### 0.1.2

- Improved publishing workflow
- Added npm trusted publishing support
- Updated package metadata and repository checks

### 0.1.0

Initial functional development version.

- Integrated MQTT broker
- MQTT authentication
- LevelDB persistence
- Retained state restore
- Smart Lock status
- Door sensor support
- Battery information
- Explicit lock actions
- Keypad code detection
- Fingerprint detection
- Configurable Code-ID user mapping
- Optional Nuki Web API
- Activity information
- Dynamic status icons

## License

[MIT License](https://github.com/helfi9999/ioBroker.nuki-local/blob/main/LICENSE)

Copyright (c) 2026 helfi9999 <helfi9999@gmail.com>