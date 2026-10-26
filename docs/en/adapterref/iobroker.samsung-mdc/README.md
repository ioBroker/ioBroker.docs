![Logo](admin/samsung-mdc.png)
# ioBroker.samsung-mdc

[![NPM version](https://img.shields.io/npm/v/iobroker.samsung-mdc.svg)](https://www.npmjs.com/package/iobroker.samsung-mdc)
[![Downloads](https://img.shields.io/npm/dm/iobroker.samsung-mdc.svg)](https://www.npmjs.com/package/iobroker.samsung-mdc)
![Number of Installations](https://iobroker.live/badges/samsung-mdc-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/samsung-mdc-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.samsung-mdc.png?downloads=true)](https://nodei.co/npm/iobroker.samsung-mdc/)

**Tests:** ![Test and Release](https://github.com/AlanSRU/ioBroker.samsung-mdc/workflows/Test%20and%20Release/badge.svg)

## samsung-mdc adapter for ioBroker

Control [Samsung commercial signage displays](https://www.samsung.com/business/displays/) (the
QBC/QMC/QEC/QHC families and other panels with MDC) over the Multiple Display Control (MDC)
protocol on TCP 1515: power, input source, volume, mute and status.

## What it does

One instance drives any number of displays. MDC is out-of-band: it needs no app on the display
and no pairing, and a panel keeps answering in standby when Network Standby is on. The adapter
opens a fresh TCP connection per request, so a dead panel cannot stall the others.

This adapter is for **commercial signage** panels. Consumer Samsung TVs do not speak MDC.

## Requirements

- Node.js 22 or newer
- js-controller 6.0.11 or newer
- Admin 7.6.20 or newer
- On every display:
  - **System → Power Control → Network Standby: On** (and Max Power Saving: Off). Without it the
    panel stops answering about a minute after it is switched off, and it cannot be switched on
    over MDC.
  - MDC control over the network enabled, and the display's set ID known (0 for a panel on its
    own address).

## Configuration

| Setting | |
|---|---|
| Displays | One row per display: name, IP address, port (1515), display ID (the MDC set ID) and an optional MAC address for Wake-on-LAN. The name becomes the object folder; leave it empty to use the IP address. A row that is switched off keeps its objects. |
| Search for displays | Probes an address range for panels that answer MDC on port 1515 with set ID 0 and adds them to the table. See [Discovery](#discovery). |
| Polling interval | How often each display is polled, 5 to 3600 seconds (default 30); 0 disables polling. Displays are polled 250 ms apart so a fleet is not polled in one burst. |
| Default volume on power on | Optional volume (0-100) sent after each power-on command. |
| Use Wake-on-LAN for power on | Sends a magic packet to the display's MAC address before the power-on command. Only needed for a panel that is fully off; with Network Standby on it is not required. It only reaches panels on the same network segment as the ioBroker host. |

## States

```
info.connection                     true if any display answered its last poll
<display>.info.connection           this display is answering
<display>.control.power    (rw)     power on/off
<display>.control.input    (rw)     input source: 33 HDMI1, 35 HDMI2, 37 DisplayPort, 96 MagicInfo
<display>.media.volume     (rw)     volume 0-100
<display>.media.mute       (rw)     mute
```

Input codes vary by model. On a QB43C only HDMI1, HDMI2 and MagicInfo are accepted; DisplayPort
is listed for the larger panels that have the connector.

### Display behaviour to know about

- **Power-on takes about 30 seconds on the control channel.** After a power-on command the MDC
  service restarts and does not answer for about 30 seconds, although the picture is back much
  sooner. The adapter expects this: it does not report the display as unreachable during that
  time.
- **Mute is not updated while a display is in standby.** A panel in standby always reports
  mute on, which says nothing about its audio, so the last value is kept.
- **A command that times out may still have been carried out.** The adapter reads the display
  back shortly after every command, so the states show what the display really did.

## Commands from scripts (sendTo)

Every command takes `device`: the display's folder id, its configured name or its IP address.
It may be left out when only one display is configured.

```javascript
sendTo('samsung-mdc.0', 'getStatus', { device: 'pitch_west' }, result => log(JSON.stringify(result)));
sendTo('samsung-mdc.0', 'power', { device: 'pitch_west', value: true });
sendTo('samsung-mdc.0', 'input', { device: 'pitch_west', value: 0x21 });
sendTo('samsung-mdc.0', 'volume', { device: 'pitch_west', value: 20 });
sendTo('samsung-mdc.0', 'mute', { device: 'pitch_west', value: false });
```

The reply is `{ ok: true }` (or the status for `getStatus`), or `{ error: '...' }`.

## Discovery

MDC has no announcement or broadcast, so displays cannot be discovered passively. **Search**
connects to port 1515 on every address in the range and sends a status request; a display that
acknowledges is added to the table with an empty name. The range accepts `192.168.230.0/24`,
`192.168.230.10-60`, `192.168.230.10-192.168.231.20` or single addresses, comma separated, up to
4096 addresses (a /24 takes about 12 seconds). The search works across routed subnets as long as
the ioBroker host can reach them.

Search merges into the **saved** configuration, so save pending changes first. Displays that are
daisy-chained behind another panel on a different set ID are not found and must be added by hand.

## Commissioning a display without ioBroker

`test-mdc.js` in the repository is a standalone probe (Node.js only, no dependencies) that reads
and writes a panel directly and prints the raw frames:

```bash
node test-mdc.js 192.168.230.200            # status, power, volume, mute, input
node test-mdc.js 192.168.230.200 power on
node test-mdc.js 192.168.230.200 discover   # try set IDs 0, 1 and 254
```

## Disclaimer

Samsung is a trademark of Samsung Electronics Co., Ltd. This adapter is not affiliated with or
endorsed by Samsung.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.1.0 (2026-09-25)
* (Alan Paris) First public release: any number of displays per instance, discovery by address range, Wake-on-LAN
* (Alan Paris) A display is reported unreachable only after two failed polls in a row, and not while it restarts after a power-on
* (Alan Paris) Switched-off display rows keep their objects

### 0.0.1 (2026-09-25)
* (Alan Paris) initial release

Older changes can be found in CHANGELOG_OLD.md

## License
MIT License

Copyright (c) 2026 Alan Paris <alan.paris@scottish.rugby>

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