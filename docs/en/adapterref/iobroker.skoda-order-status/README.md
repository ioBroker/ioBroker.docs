![Logo](admin/skoda-order-status.png)
# ioBroker.skoda-order-status

[![NPM version](https://img.shields.io/npm/v/iobroker.skoda-order-status.svg)](https://www.npmjs.com/package/iobroker.skoda-order-status)
[![Downloads](https://img.shields.io/npm/dm/iobroker.skoda-order-status.svg)](https://www.npmjs.com/package/iobroker.skoda-order-status)
![Number of Installations](https://iobroker.live/badges/skoda-order-status-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/skoda-order-status-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.skoda-order-status.png?downloads=true)](https://nodei.co/npm/iobroker.skoda-order-status/)

**Tests:** ![Test and Release](https://github.com/SentiQ/ioBroker.skoda-order-status/workflows/Test%20and%20Release/badge.svg)

## skoda-order-status adapter for ioBroker

Poll the status of a **pending Škoda vehicle order** via the unofficial MyŠkoda API.

This fills the gap left by vehicle adapters such as `vw-connect`: order tracking in the MyŠkoda app ("Track & Explore") works **before** a VIN exists.

Manufacturer site: [Škoda Auto](https://www.skoda-auto.com/)

## Features

- Login with MyŠkoda email and password
- Automatic discovery of all open orders in the account
- English status labels and checkpoint dates
- Configurable polling interval (default: 1 hour)
- Refresh token stored encrypted on the instance

## Configuration

1. Install the adapter and create an instance.
2. Enter your **MyŠkoda email** and **password**.
3. Optionally change the **poll interval** (900–86400 seconds, default 3600).
4. Save. The adapter logs in, discovers open orders and creates one device per commission ID.

## Objects

Each open order is a device under `skoda-order-status.0.<commissionId>`:

| State | Description |
| --- | --- |
| `orderStatus` | Raw status (`ORDER_CONFIRMED`, `IN_PRODUCTION`, `IN_DELIVERY`, `TO_HANDOVER`) |
| `orderStatusLabel` | English label (Confirmed, In production, In delivery, To handover) |
| `model` / `trimLevel` | Vehicle model and trim |
| `exteriorColour` / `interiorColour` | Colours |
| `batteryKwh` / `maxPerformanceKw` | Battery and power (if provided) |
| `commissionId` | Order commission ID |
| `dealerId` / `activationState` | Dealer and activation |
| `orderConfirmedDate` / `inProductionDate` / `inDeliveryDate` / `toHandoverDate` | Checkpoint dates |
| `checkpointsReached` / `checkpointsPending` | JSON lists of checkpoints |
| `lastPoll` | Last successful poll (ISO timestamp) |

`info.connection` is `true` while the MyŠkoda API login works.

## Disclaimer

This adapter uses an **unofficial, reverse-engineered** MyŠkoda API. It is not affiliated with Škoda Auto. Use at your own risk.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.1.9 (2026-09-11)
* (SentiQ) HTTP timeouts, sequential polling, English state labels

### 0.1.8 (2026-09-03)
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 0.1.7 (2026-09-02)
* (SentiQ) repository PR checker error

### 0.1.6 (2026-09-02)
* (SentiQ) fix fr news translation

### 0.1.5 (2026-09-02)
* (SentiQ) fix state roles and connection i18n

## License
MIT License

Copyright (c) 2026 SentiQ <yves@nuesser.digital>

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
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.