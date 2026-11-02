![Logo](admin/solarviewdatareader.png)
# ioBroker.solarviewdatareader

[![NPM version](https://img.shields.io/npm/v/iobroker.solarviewdatareader.svg)](https://www.npmjs.com/package/iobroker.solarviewdatareader)
[![Downloads](https://img.shields.io/npm/dm/iobroker.solarviewdatareader.svg)](https://www.npmjs.com/package/iobroker.solarviewdatareader)
![Number of Installations (latest)](https://iobroker.live/badges/solarviewdatareader-installed.svg)
![Number of Installations (stable)](https://iobroker.live/badges/solarviewdatareader-stable.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/afuerhoff/ioBroker.solarviewdatareader/badge.svg)](https://snyk.io/test/github/afuerhoff/ioBroker.solarviewdatareader)

[![NPM](https://nodei.co/npm/iobroker.solarviewdatareader.png?downloads=true)](https://nodei.co/npm/iobroker.solarviewdatareader/)

**Tests:** ![Test and Release](https://github.com/afuerhoff/ioBroker.solarviewdatareader/workflows/Test%20and%20Release/badge.svg)

## ioBroker SolarView Data Reader

This adapter reads measurement data from a SolarView data logger over its TCP
interface. For information about SolarView and compatible hardware, see the
[SolarView website](https://www.solarview.info/solarlogger.aspx).

The adapter uses an unencrypted TCP connection. SSL/TLS and certificate
verification are not supported.

## Requirements

- Node.js 22 or newer
- ioBroker js-controller 6.0.11 or newer
- ioBroker Admin 7.6.20 or newer

## Configuration

### Connection

Enter the IP address or hostname of the SolarView data logger and its TCP port.
The default port is `15000`.

### Polling interval and time window

Set how often the adapter requests data, from 10 to 3600 seconds. The time
window controls polling of PV and inverter data, including D0 supply data when
the D0 converter is enabled. Self-consumption meter data and D0 consumption
data continue to be polled outside this window.

For a full-day time window, use `00:00` to `23:59`.

### Devices

In the **Devices and CCU** tab, enable only the devices configured in SolarView:

- **D0 converter**: creates `d0supply` and `d0consumption` data.
- **Self-consumption meters**: enable the total meter and/or meters 1 to 4.
- **Inverters**: enable inverters 1 to 4 individually.

### Homematic CCU system variable

Enable **Set system variable CCU** to write the current PV power to a
Homematic CCU system variable. Enter its ioBroker state ID, for example
`hm-rega.0.12345`.

## States

The adapter creates a `pvig` channel for overall PV data. Depending on the
configuration, it also creates `pvi1` to `pvi4`, `d0supply`, `d0consumption`,
and `scm0` to `scm4` channels.

PV and inverter channels provide:

| State | Description | Unit |
| --- | --- | --- |
| `current` | Current PV power | W |
| `daily` | Daily yield | kWh |
| `monthly` | Monthly yield | kWh |
| `yearly` | Yearly yield | kWh |
| `total` | Total yield | kWh |

Enabled inverter channels also provide DC voltage and current per MPP tracker:
`udc`/`idc`, `udcb`/`idcb`, `udcc`/`idcc`, and `udcd`/`idcd` (V/A).
Depending on the SolarView protocol version, they can also include grid voltage
and current per phase (`ul1`/`il1` to `ul3`/`il3`, V/A) and inverter
temperature (`tkk`, °C).

The `info` channel contains the connection status (`info.connection`) and the
timestamp of the last successful update (`info.lastUpdate`).

## Changelog
### 1.3.0 (2026-10-26)
* (afuerhoff) legacy polling intervals are migrated from minutes to seconds
* (afuerhoff) socket error handling and connection status reporting improved
* (afuerhoff) configuration organized into tabs with improved validation and help texts
* (afuerhoff) configuration translations updated

### 1.2.6 (2026-09-13)
* (afuerhoff) dependencies updated
* (afuerhoff) issues detected by repository checker fixed [#289], [#305]

### 1.2.5 (2026-05-16)
* (copilot) Adapter requires node.js >= 22 now
* (afuerhoff) dependencies updated
* (afuerhoff) dependabot.yml fixed [#246](https://github.com/afuerhoff/ioBroker.solarviewdatareader/issues/246)
* (afuerhoff) license information updated

### 1.2.4 (2025-10-24)
* (afuerhoff) dependencies updated
* (afuerhoff) npm security changes
* (afuerhoff) repository checker warnings fixed

### 1.2.3 (2025-09-19)
* (afuerhoff) dependencies updated
* (afuerhoff) repository checker issues fixed
* (afuerhoff) typescript error fixed

## License
MIT License

Copyright (c) 2019-2026 Achim Fürhoff <achim.fuerhoff@outlook.de>

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