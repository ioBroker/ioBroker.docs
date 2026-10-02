# ioBroker.blackmagic-atem

[![NPM version](https://img.shields.io/npm/v/iobroker.blackmagic-atem.svg)](https://www.npmjs.com/package/iobroker.blackmagic-atem)
[![Downloads](https://img.shields.io/npm/dm/iobroker.blackmagic-atem.svg)](https://www.npmjs.com/package/iobroker.blackmagic-atem)
![Number of Installations](https://iobroker.live/badges/blackmagic-atem-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/blackmagic-atem-stable.svg)
[![License](https://img.shields.io/npm/l/iobroker.blackmagic-atem.svg)](LICENSE)

**Tests:** ![Test and Release](https://github.com/AlanSRU/ioBroker.blackmagic-atem/workflows/Test%20and%20Release/badge.svg)

Control Blackmagic ATEM video mixers from ioBroker — supports all 21+ ATEM models from Mini to Constellation 4K+.

## Description

This adapter controls [Blackmagic Design ATEM](https://www.blackmagicdesign.com/products/atem) video mixers over the network. It uses the reverse-engineered ATEM UDP protocol via the [atem-connection](https://github.com/Sofie-Automation/sofie-atem-connection) library, and supports 21+ model variants — from ATEM Mini through Television Studio to Constellation 4K+ — with capability-based state creation that adapts to the connected device.

## Features

- **Program/Preview switching** — change program and preview inputs
- **Transitions** — Cut, Auto, manual T-bar; Mix / Dip / Wipe / DVE / Sting styles with per-style rates
- **Fade to Black** — toggle and configure FTB rate
- **Upstream Keyers** (up to 4 per M/E) — on air, type, fill/key source, mask, fly
- **Downstream Keyers** (up to 4) — on air, tie, auto, rate, fill/key source
- **Aux outputs** (up to 48) — source routing
- **Audio Mixer** — master gain/balance, monitor, per-input gain/balance/mix (Classic + Fairlight)
- **Color Generators** — hue/saturation/luminance
- **Streaming** — start/stop, status, cache used (supported models)
- **Recording** — start/stop, switch disk, duration, remaining space (supported models)
- **Media Players** — source type, still/clip index, playback control
- **Tally** — program/preview tally state
- **Macros** — run, stop, continue, loop, named slots (up to 100)
- **Input metadata** — short/long names, port type
- **Auto model detection** — capabilities discovered from the connected device

## Requirements

- js-controller >= 6.0.11
- ioBroker Admin >= 7.8.23
- Node.js >= 22
- Blackmagic ATEM switcher with network connectivity

## Installation

Install via the ioBroker Admin UI: **Adapters → search for `blackmagic-atem` → install**.

## Configuration

1. Open the adapter instance configuration in ioBroker Admin
2. Enter the IP address of your ATEM device
3. Choose the model (or leave on Auto Detect)
4. Adjust the reconnect interval if needed
5. Save and start the adapter

## State Tree

```
info.connection
device.{modelName, productId, videoMode, capabilities}
me[0-3].{programInput, previewInput, inTransition, transitionPosition}
me[0-3].transition.{style, mixRate, dipRate, wipeRate, dveRate, wipePattern}
me[0-3].fadeToBlack.{isFullyBlack, inTransition, rate}
me[0-3].usk[0-3].{onAir, type, fillSource, keySource, maskEnabled, flyEnabled}
commands.{cut, auto, ftb}
dsk[0-3].{onAir, tie, inTransition, rate, fillSource, keySource, auto}
aux[0-47].source
audio.master.{gain, balance, afv}
audio.monitor.{enabled, gain, mute, solo, dim}
audio.inputs.input[N].{gain, balance, mixOption}
audio.commands.resetPeaks
colorGenerator[0-1].{hue, saturation, luminance}
streaming.{status, start, stop, duration, cacheUsed}
recording.{status, start, stop, switchDisk, duration, remainingDiskSpace}
mediaPlayer[0-3].{sourceType, stillIndex, clipIndex, playing, loop, atBeginning}
tally.{programInputs, previewInputs}
macros.{run, stop, continue, isRunning, isWaiting, loop, runningIndex, recordedCount}
macros.slots[0-99].{name, isUsed, trigger}
inputs.input[N].{shortName, longName, inputId, portType}
```

States are created conditionally based on detected/selected model capabilities. Orphans are cleaned up when the model changes.

## Example Usage

```javascript
// Switch program to camera 1
setState('blackmagic-atem.0.me0.programInput', 1);

// Perform a cut
setState('blackmagic-atem.0.commands.cut', true);

// Start streaming (supported models only)
setState('blackmagic-atem.0.streaming.start', true);

// Run macro 5
setState('blackmagic-atem.0.macros.run', 5);
```

## Input ID Reference

| ID            | Source                  |
| ------------- | ----------------------- |
| 1–8           | Camera inputs           |
| 0             | Black                   |
| 1000          | Color Bars              |
| 2001–2002     | Color Generators 1, 2   |
| 3010, 3011    | Media Player 1, 2       |
| 3020, 3021    | Media Player 1, 2 Key   |
| 7001–7002     | Clean Feed 1, 2         |
| 10010, 10011  | Program, Preview        |

## Protocol Notes

This adapter uses the reverse-engineered ATEM UDP protocol (port 9910), as documented by the open-source community:

- [OpenSwitcher Documentation](https://docs.openswitcher.org/)
- [atem-connection library](https://github.com/Sofie-Automation/sofie-atem-connection)

The ATEM protocol has no authentication — keep ATEM devices on a trusted, private network.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### 0.2.10 (2026-09-27)
- (Alan Paris) Fixed live updates on 2 M/E and 4 M/E switchers: changes to M/E 2-4 (program, preview, keyers, transitions) were not reflected until the next reconnect
- (Alan Paris) Fixed live updates when one packet changes several areas at once, and classic-audio input gain/balance/mix option now update live
- (Alan Paris) Fixed a connection leak: each network drop left the previous ATEM connection running, taking an extra switcher session
- (Alan Paris) Object definitions (roles, names, ranges) are now updated on existing installations, not only on fresh installs
- (Alan Paris) With model auto-detect, restarting the adapter no longer deletes states (and their history settings) that the connected model supports, e.g. M/E 2-4 or classic-audio monitor states
- (Alan Paris) device.modelName now shows the product name (e.g. "ATEM Mini Pro") and device.productId the numeric model ID; previously they were swapped
- (Alan Paris) Transition and fade-to-black rate states no longer default to 0, below their minimum of 1
- (Alan Paris) Adapter now requires admin >= 7.8.23
- (Alan Paris) Node.js 26 added to the test matrix
- (Alan Paris) Updated dependencies (@iobroker/adapter-core 3.4.3, @iobroker/testing 6.2.2)

### 0.2.9 (2026-07-12)
- (Alan Paris) Made macros.run write-only (it no longer retains the last-triggered index); use macros.runningIndex to read the active macro
- (Alan Paris) Renamed recording.remainingDiskSpace to "Remaining Recording Time" and documented that its value is seconds of available recording capacity, not bytes
- (Alan Paris) Stopped writing audio.master.afvCrossfade on Fairlight models, where the state does not exist

### 0.2.8 (2026-07-05)
- (Alan Paris) Fixed upstream-keyer mask/fly enable and downstream-key pre-multiplied controls, which were writable but ignored, so they now apply to the switcher
- (Alan Paris) Master audio gain now controls Fairlight mixers correctly (previously it sent a Classic-audio command that Fairlight models ignored)
- (Alan Paris) Hid Classic-only audio controls (master balance/AFV crossfade, monitor enable/solo/dim) on Fairlight models, where they had no effect
- (Alan Paris) Added default values to all dynamically created states

### 0.2.7 (2026-07-04)
- (Alan Paris) Added a link to the Blackmagic Design ATEM product page in the README
- (Alan Paris) Clamp the reconnect interval in code so out-of-range config values cannot break the timer
- (Alan Paris) Removed the unused `pollInterval` config option (the adapter is fully push-based)
- (Alan Paris) Removed the unused `audio.master.programOutGain` state

### 0.2.6 (2026-07-04)
- (Alan Paris) Updated atem-connection to 3.9.0 and dev dependencies (@iobroker/types, rimraf)
- (Alan Paris) Extended tsconfig from @tsconfig/node22 for standardized type checking
- (Alan Paris) Switched Dependabot to cron schedules to distribute update load

## License

MIT License — see [LICENSE](https://github.com/AlanSRU/ioBroker.blackmagic-atem/blob/main/LICENSE) for details.

Copyright (c) 2024-2026 Alan Paris <alan.paris@scottish.rugby>