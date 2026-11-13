![Logo](admin/ewelink.png)
# ioBroker.ewelink

[![NPM version](https://img.shields.io/npm/v/iobroker.ewelink.svg)](https://www.npmjs.com/package/iobroker.ewelink)
[![Downloads](https://img.shields.io/npm/dm/iobroker.ewelink.svg)](https://www.npmjs.com/package/iobroker.ewelink)
![Number of Installations](https://iobroker.live/badges/ewelink-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/ewelink-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.ewelink.png?downloads=true)](https://nodei.co/npm/iobroker.ewelink/)

**Tests:** ![Test and Release](https://github.com/AlanSRU/ioBroker.ewelink/workflows/Test%20and%20Release/badge.svg)

## ewelink adapter for ioBroker

Control [Sonoff](https://sonoff.tech/) / eWeLink switches on the local network. The adapter talks to
each device directly on TCP port 8081 and receives its state changes as mDNS announcements, so
switching works without internet access and without the eWeLink cloud.

This version supports **single-channel switches** — devices with one relay that report a `switch`
value, e.g. Sonoff MICRO, BASIC R2/R3/R4, MINI R2/R3/R4, RF R3 and S26 plugs.

Two kinds of device are supported:

- **eWeLink LAN control** (the normal mode of devices set up in the eWeLink app). Requests to these
  devices are encrypted with a per-device key that only the eWeLink cloud knows. The adapter fetches
  the keys **once**, when you sign in to your eWeLink account from the instance settings, and stores
  them encrypted. After that it does not contact the cloud.
- **[DIY mode](https://sonoff.tech/diy-developer/)** (an open, unencrypted LAN API that some models
  offer). No eWeLink account is needed for these.

## Requirements

- Node.js 22 or newer, js-controller 6.0.11 or newer, admin 7.6.20 or newer
- The ioBroker host on the **same network (subnet)** as the switches: devices announce themselves
  and their state by mDNS, which does not cross routers. (DIY mode devices with a configured IP
  address can also be polled across subnets.)
- For eWeLink LAN control: *LAN control* enabled for the device in the eWeLink app, and either a
  free developer account at the [eWeLink developer centre](https://dev.ewelink.cc/) or the device
  keys from elsewhere (see below).

## Fetching your devices from eWeLink

Apps created in the eWeLink developer centre may only sign in with OAuth 2.0, so the adapter cannot
take your eWeLink password. Instead:

1. Register at the [eWeLink developer centre](https://dev.ewelink.cc/) (approval can take a few days)
   and create an app. Give it the redirect URL shown in the adapter settings
   (`http://127.0.0.1:8000/callback` by default — nothing needs to run there).
2. In the instance settings, tab **eWeLink account**, enter the app's **App ID** and **App Secret**.
3. Click **Sign in with eWeLink** and sign in on eWeLink's page. Your browser then opens the redirect
   URL, which shows an error page — that is expected.
4. Copy the complete address from the browser's address bar into **Address after sign-in** and click
   **Fetch devices** within a few minutes.

Single-channel switches of the account are added to the device table, and the keys of devices
already in the table are updated. Repeat this when you add a device to your account.

## Entering a device key by hand

Without a developer account you can enter keys you already have, for example from the Sonoff LAN
integration of Home Assistant: in tab **eWeLink account**, enter the **Device ID** and **Device key**
and click **Save device key**. The key is stored encrypted like a fetched one, and a device that is
not in the device table yet is added. A wrong key shows up as "cannot decrypt the device data" in
the log. A device's key changes when it is re-paired in the eWeLink app.

## Configuration

| Setting | Meaning |
|---|---|
| **Devices** | One row per switch: active, name, IP address, port (8081) and device ID. The name becomes the object-tree folder (`ewelink.0.<name>`). Devices fetched from eWeLink need only the device ID — the IP address is learned from their mDNS announcements and kept up to date when it changes. A DIY mode device needs its IP address; its device ID is optional. |
| **Poll interval** | 5–3600 s (default 10 s). DIY mode devices are polled over HTTP at this interval. eWeLink LAN control devices push their state; at this interval the adapter asks them to announce themselves. A device that misses an announcement is asked over HTTP instead, since WiFi drops the odd multicast packet; it is marked unreachable when that fails twice, or when no announcement arrives for more than five intervals (state changes made in the app or at the device would then go unseen). |
| **App ID / App Secret / Redirect URL** | The developer-centre app used to fetch the device keys. |
| **Device ID / Device key** | A device key entered by hand instead of fetched; cleared once saved. |

Deactivating a row keeps the device's objects (and their history/alias settings); deleting the row
removes them at the next start.

## States

| State | Type | Meaning |
|---|---|---|
| `info.connection` | boolean | At least one device is reachable |
| `<device>.control.power` | boolean, writable | Relay on/off. Write `true`/`false` to switch; acknowledged once the device has accepted the command |
| `<device>.info.reachable` | boolean | The device answers or announces itself |
| `<device>.info.firmware` | string | Firmware version, where the device reports it |
| `<device>.info.deviceId` | string | eWeLink device ID |
| `<device>.info.signalStrength` | number (dBm) | WiFi signal strength, where the device reports it |

## Disclaimer

Sonoff and eWeLink are trademarks of their respective owners (ITEAD Intelligent Systems Co., Ltd. and
CoolKit Technologies). This adapter is not affiliated with or endorsed by them.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.1.0 (2026-10-20)
* (Alan Paris) Initial release: single-channel switches in eWeLink LAN control mode (device keys fetched once via eWeLink sign-in, or entered by hand) and DIY mode

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