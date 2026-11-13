# ioBroker Adapter: DuoFern Stick

This adapter connects a local **Rademacher DuoFern USB Stick** to ioBroker. It is designed for installations where DuoFern devices should be integrated locally without an additional cloud service.

## Features

- Serial connection to the Rademacher DuoFern USB Stick
- Configuration of serial port, baud rate and dongle serial in ioBroker Admin
- Reception and parsing of DuoFern telegrams
- Automatic creation of detected devices below `devices.*`
- Device and capability catalogue for many DuoFern device classes
- State handling for shutters, tubular motors, actuators, dimmers, sensors, remotes and thermostats
- Control states for pairing, unpairing, status broadcast and raw telegrams
- Partial state updates to avoid overwriting existing values with incomplete telegram data
- Protection against unintended reset of `runningTime` to `0`
- Optional raw telegram logging for diagnostics

## Supported device classes

The adapter contains a device and capability catalogue for several DuoFern device classes, including:

| Device class | Examples |
| --- | --- |
| Shutters / belt winders | RolloTron Standard, RolloTron Comfort Master/Slave |
| Tubular motors | Tubular motor, tubular motor actuator, tubular motor controller |
| Venetian blinds | Troll Comfort, Troll Basis, Connect actuator |
| Actuators | Universal actuator, socket actuator, light and switching actuators |
| Dimmers | Dimming actuator, dimmer |
| Sensors | Sun/wind sensor, environmental sensor, motion detector, smoke detector, window/door contact |
| Remotes / transmitters | Hand transmitter, wall switch, HomeTimer, flush-mounted transmitter |
| Heating | Room thermostat, radiator actuator |
| Gate / special devices | SX5 / gate controller |

Depending on the detected device type, only suitable or observed states are created. This avoids showing every theoretical state for every device.

## Requirements

- ioBroker with js-controller 6.0.11 or newer
- Node.js 22 or newer
- ioBroker Admin 7.6.20 or newer
- Rademacher DuoFern USB Stick
- Access to the serial device of the USB stick

On Linux, the ioBroker process must have permission to access the serial device. Common paths are:

```text
/dev/ttyUSB0
/dev/serial/by-id/usb-Rademacher_DuoFern_USB-Stick-if00-port0
```

Using the stable `/dev/serial/by-id/` path is recommended because it normally stays the same after rebooting or reconnecting the USB stick.

## Installation

Install the adapter through ioBroker Admin using the custom adapter installation from a GitHub URL or from an uploaded package file.

After installation:

1. Create an adapter instance named `duofernstick.0`.
2. Open the adapter configuration.
3. Enter the correct serial port of the DuoFern USB Stick.
4. Start the adapter.
5. Check the connection state at `duofernstick.0.info.connection`.

## Configuration

The main settings are available in the Admin configuration page of the adapter instance.

| Setting | Description |
| --- | --- |
| `port` | Serial port of the DuoFern USB Stick (selectable from a list of detected ports) |
| `baudRate` | Baud rate, default: `115200` |
| `dongleSerial` | 6 digit DuoFern radio code of the stick, starting with `6F` (not the USB serial number) |
| `deviceCodes` | Known device codes (comma separated or FHEM `define` lines) |
| `autoCreate` | Automatically create detected devices |
| `initOnStart` | Send the DuoFern init sequence on start |
| `statusOnStart` | Request device status when the adapter starts |
| `statusAfterCommand` | Request device status after movement/control commands |
| `periodicStatusPoll` / `periodicStatusPollMs` | Cyclic status polling of all known actuators, default every 5 minutes |
| `externalActivityPollAll` | Poll known actuators after remote control or sensor telegrams |
| `invertPosition` | Use the ioBroker convention for blinds (0 % = closed, 100 % = open) instead of the DuoFern convention (0 % = open) |
| `debugRaw` | Log raw telegrams for diagnostics |

DuoFern uses the 868 MHz band with a 1 % duty cycle. Very short polling intervals with many devices can exceed the allowed airtime; status requests are therefore queued with low priority, deduplicated and limited, while user commands are always sent first.

## Object structure

The adapter creates the following main object tree:

```text
duofernstick.0
├── info
│   ├── connection          (true after successful stick init)
│   ├── dongleSerial
│   ├── rawRx / rawTx
│   ├── lastParsed / lastStatusDecode
│   └── lastError
├── status.state
├── queue.pending / queue.active
├── pair.mode
├── commands
│   ├── pair / unpair
│   ├── statusBroadcast
│   ├── reopen
│   ├── raw
│   ├── remotePair
│   ├── addDeviceCode
│   └── cleanupUnusedDeviceStates
└── devices
    └── <deviceCode>
        ├── raw, lastSeen, deviceClass, deviceProfile, stateText
        ├── command
        ├── up, down, stop, position, ...
        └── control.*
```

The exact number of states depends on the detected device type.

## Central control states

### Start pairing

```text
duofernstick.0.commands.pair = true
```

Starts pairing mode of the stick.

### Start unpairing

```text
duofernstick.0.commands.unpair = true
```

Starts unpairing mode of the stick.

### Send status broadcast

```text
duofernstick.0.commands.statusBroadcast = true
```

Requests status information from known or reachable devices.

### Send raw telegram

```text
duofernstick.0.commands.raw = <HEX_TELEGRAM>
```

Sends a raw telegram as a hexadecimal string. This is mainly intended for diagnostics and development.

## Device control

Depending on the device type, the following writable states may be available:

| State | Meaning |
| --- | --- |
| `up` | Move shutter or blind up |
| `down` | Move shutter or blind down |
| `stop` | Stop current movement |
| `toggle` | Toggle command |
| `position` | Target position in percent |
| `getStatus` | Request device status |
| `manualMode` | Manual mode |
| `timeAutomatic` | Time automation |
| `sunAutomatic` | Sun automation |
| `duskAutomatic` | Dusk automation |
| `dawnAutomatic` | Dawn automation |
| `windAutomatic` | Wind automation |
| `rainAutomatic` | Rain automation |
| `level` | Dimming or switching level |
| `state` | Switch state |

Example state IDs:

```text
duofernstick.0.devices.<deviceId>.up
duofernstick.0.devices.<deviceId>.down
duofernstick.0.devices.<deviceId>.stop
duofernstick.0.devices.<deviceId>.position
```

## Status values

Typical read-only status values are:

| State | Description |
| --- | --- |
| `position` | Current position in percent |
| `moving` | Movement direction: `up`, `down`, `stop` or `moving` |
| `runningTime` | Runtime in seconds |
| `lastSeen` | Timestamp of the last received telegram |
| `raw` | Last telegram received from this device |
| `deviceClass` | Detected DuoFern device class |
| `deviceProfile` | Command/state profile used for this device |

Incoming telegrams are handled as partial state updates. If a telegram does not contain a runtime value, an already existing runtime value is not automatically reset to `0`.

## Troubleshooting

### The adapter does not connect to the stick

Check the following points:

- The configured serial port exists.
- The ioBroker user has permission to access the serial device.
- The USB stick is passed through to the correct host, container or virtual machine.
- No other process blocks the serial port.
- The baud rate is configured correctly.

Useful Linux commands:

```text
ls -l /dev/ttyUSB*
ls -l /dev/serial/by-id/
dmesg | grep -i tty
```

### No devices are created

Check the following points:

- `autoCreate` is enabled.
- Raw telegrams appear in `info.rawRx`.
- `debugRaw` is enabled for diagnostics.
- A DuoFern device or remote control action has been triggered.

### Values look unstable or implausible

Check the following points:

- Whether several devices are detected with the same or an incorrect ID.
- Whether raw telegrams are received completely.
- Whether the correct device type is detected.
- Whether the device actively sends status values or only answers once after startup.

For diagnostics, the following information is useful:

- Adapter version
- ioBroker version
- Node.js version
- Operating system, Docker, VM or Proxmox setup
- Serial device path of the USB stick
- DuoFern device type
- Relevant raw telegrams
- ioBroker log output during startup and device actions

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.1.32 (2026-10-16)

- (FreeProgrammer1) All object names are now available in all 11 ioBroker languages (new `lib/i18n.js`).
- (FreeProgrammer1) Roles now match read/write access: `targetPosition` → `value.blind`, `targetLevel` → `value.dimmer`, running times → `level.timer`, writable weather station settings → `level`.
- (FreeProgrammer1) Existing objects are corrected automatically on the next adapter start.

### 0.1.31 (2026-10-02)

- (FreeProgrammer1) Received serial data is now processed strictly in order (no parallel frame handling).
- (FreeProgrammer1) Removed a hard-coded stick radio code that was applied for one specific USB path.
- (FreeProgrammer1) Fixed lost status refresh timers after the init sequence.
- (FreeProgrammer1) `info.connection` is only `true` after a successful stick init.
- (FreeProgrammer1) Device objects are created once per runtime instead of on every telegram (far fewer object database writes).
- (FreeProgrammer1) Command queue: user commands before status polls, duplicate telegrams are skipped, status polls are limited.
- (FreeProgrammer1) Default polling interval raised to 5 minutes (existing instances keep their setting).
- (FreeProgrammer1) New option `invertPosition` for the ioBroker blind convention (100 % = open).
- (FreeProgrammer1) Serial port can be selected from a list in the admin UI.
- (FreeProgrammer1) Buttons are now `read: false`; instance objects moved to `instanceObjects`.
- (FreeProgrammer1) Removed unused modules, standard package/integration tests, release-script, full MIT license, i18n short format.

### 0.1.30

- (FreeProgrammer1) Fixes responsive jsonConfig sizes, admin translations and CI metadata for the repository checker.

### 0.1.29

- (FreeProgrammer1) Fix GitHub workflow requirements for Node.js 22/24 adapter tests, restore the recommended concurrency configuration and document the current release for the ioBroker checker.

### 0.1.28

- (FreeProgrammer1) Fix jsonConfig layout, node.js workflows and translations.

### 0.1.27

- (FreeProgrammer1) Added jsonConfig i18n files for all required ioBroker languages.
- (FreeProgrammer1) Removed legacy Materialize admin page because jsonConfig is used.
- (FreeProgrammer1) Replaced plain timers with adapter timers for ioBroker checker compliance.

Older changelog entries are kept in CHANGELOG_OLD.md.

## License

MIT License
This project is licensed under the terms of the [LICENSE](https://github.com/FreeProgrammer1/ioBroker.duofernstick/blob/main/LICENSE) file.

Copyright (c) 2026 FreeProgrammer1 freeprogrammer1@mail.de