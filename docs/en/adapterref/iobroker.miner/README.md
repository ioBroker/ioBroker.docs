![Logo](admin/miner.png)
# ioBroker.miner

[![NPM version](https://img.shields.io/npm/v/iobroker.miner.svg)](https://www.npmjs.com/package/iobroker.miner)
[![Downloads](https://img.shields.io/npm/dm/iobroker.miner.svg)](https://www.npmjs.com/package/iobroker.miner)
![Number of Installations](https://iobroker.live/badges/miner-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/miner-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.miner.png?downloads=true)](https://nodei.co/npm/iobroker.miner/)

**Tests:** ![Test and Release](https://github.com/SimonFischer04/ioBroker.miner/workflows/Test%20and%20Release/badge.svg)

## miner adapter for ioBroker

Interact with different crypto miner apis

## Roadmap
- [X] v0.1: device management, trm implementation
- [X] more miners support: bos+, xmrig, avalon, ...?
- [ ] implement more features (controls + info from devices)
- [ ] pools support
- [ ] device discover
- [ ] sentry
- [ ] more: see Todo.md / issues 
- [ ] fix license plugin in .releaseconfig

## Usage
When adding a new device inside the instance settings (or inside the Admin DeviceManager Tab) you should get a dialog like this:

![AddDevice.png](docs/AddDevice.png)

The options should be pretty self-explanatory. All of them also have tooltips with more details. If anything is still unclear feel free to ask in an issue, discussion or the forum. 

## Object model

All objects are created under:

`miner.<instance>.miner.<minerId>`

`<minerId>` is the stable ID from the device configuration (`settings.id`). This allows multiple miner processes on the same host.

### Groups (channels)
- `info`: identity/config/firmware/connection meta
- `stats`: live performance metrics (hashrate, shares, power, temps, ...)
- `control`: writable controls (start/stop, reboot, ...)
- `raw`: raw API payloads (expert)

### Entities (optional subtrees)
Some miners expose sub-entities. If available, they are placed below the miner:
- `pools.<index>...`
- `hardware.gpus.<index>...`
- `hardware.hashboards.<index>...`

### Examples
- `miner.0.miner.<minerId>.control.running`
- `miner.0.miner.<minerId>.stats.totalHashrate`
- `miner.0.miner.<minerId>.hardware.gpus.0.stats.temp`
- `miner.0.miner.<minerId>.raw.stats`

### Example tree
This is just an overview / idea / plan. Not all of them are implemented yet, but it should give you an idea of the intended structure and naming. The actual implementation may differ in some details, but the general structure should be similar to this.
```
miner.0
  miner
    <minerId>                        (device)
      info                           (channel)
        minerType                    (string)   e.g. xmRig / teamRedMiner / bosMiner
        host                         (string)
        version                      (string)   (maps to feature: version)
        online                        (boolean)  derived from lastSeen
        lastSeen                     (number)   unix ms
      stats                          (channel)
        totalHashrate                (number)   H/s (maps to feature: totalHashrate)
        power                        (number)   W
        efficiency                   (number)   H/W
        acceptedShares               (number)
        rejectedShares               (number)
      control                        (channel)  (writable states only here, top-level)
        running                      (boolean)  start/stop (maps to feature: running)
        reboot                       (boolean)  "button"
        profile                      (string)   performance profile (e.g. low/medium/high)
      pools                          (channel)
        0                            (channel)
          info
            url                      (string)
            user                     (string)
          stats
            status                   (string)
            acceptedShares           (number)
            rejectedShares           (number)
        1 ...
      hardware                       (channel)
        gpus                         (channel)
          0                          (channel)
            info
              name                   (string)
            stats
              hashrate               (number)
              temp                   (number)   °C
              fanRpm                 (number)
              power                  (number)
          1 ...
        hashboards                   (channel)  (ASICs)
          0
            stats
              hashrate               (number)
              temp                   (number)
      raw                            (channel)
        stats                        (object/string) raw miner payload (maps to feature: rawStats)
```

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now
* (SimonFischer04) **FIXED**: Removed example configuration (option1, option2) from native section and code (fixes #126 / E5040)

### 1.0.4 (2026-04-07)
* (SimonFischer04) fix repo url in package-json

### 1.0.3 (2026-04-07)
* (SimonFischer04) increase admin requirement to fix DM (does not work at all with current stable 7.7.22)

### 1.0.2 (2026-04-07)
* (SimonFischer04) **CI/CD**: Migrated deploy workflow from NPM classic tokens to Trusted Publishing (OIDC) (fixes #80)
* (SimonFischer04) cleanup readme

### 1.0.1 (2026-04-06)
* (SimonFischer04) fix release

### 1.0.0 (2026-04-06)
* (SimonFischer04) **FIXED**: Added missing size attributes (xs, xl) to admin configuration fields
* (SimonFischer04) **ENHANCED**: Updated dependencies to recommended versions (admin 7.6.17, js-controller 6.0.11)
* (SimonFischer04) **ENHANCED**: Added copyright notice to README
* (SimonFischer04) **NEW**: Added support for Avalon (Canaan) devices via CGMiner-compatible socket API (port 4028), including start/stop (softon/softoff) and stats polling
* (SimonFischer04) **ENHANCED**: Restructured object model with dedicated channels for control, info, stats, and raw data (**breaking change** – legacy state paths are auto-cleaned on startup)
* (SimonFischer04) **NEW**: Added info states (minerType, host, online, lastSeen) and stats states (power, efficiency, acceptedShares, rejectedShares) to match the documented object model
* (SimonFischer04) **NEW**: Added reboot control state (button) with wiring in state change handler
* (SimonFischer04) **NEW**: Added running switch control to Device Manager for devices supporting the running feature
* (SimonFischer04) **NEW**: Added performance profile feature with control.profile state and Device Manager dropdown (low/medium/high) — initially for Avalon miners via ascset workmode command
* (SimonFischer04) **ENHANCED**: Renamed SGMiner to CGMiner throughout the codebase to better reflect the underlying API
* (SimonFischer04) **FIXED**: Fixed copyright formatting in README to satisfy ioBroker repository checker (fixes #95)

### 0.0.1 (2026-02-15)
* (SimonFischer04) initial release

[Older changelogs can be found there](CHANGELOG_OLD.md)

## Credits
- the logo was created using ChatGPT

## License

Copyright (c) 2026 SimonFischer04 <simi.fischa@gmail.com>  

This project is licensed under the GNU General Public License v3.0 - see [LICENSE](https://github.com/SimonFischer04/ioBroker.miner/blob/main/LICENSE) for details.
