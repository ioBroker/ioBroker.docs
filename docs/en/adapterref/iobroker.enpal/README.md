![Logo](admin/enpal_logo.svg)

## ioBroker adapter for Enpal Solar

![Number of Installations](https://iobroker.live/badges/enpal-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/enpal-stable.svg)
[![NPM Version](https://nodei.co/npm/iobroker.enpal.svg?style=shields&data=v,u,d&color=orange)](https://www.npmjs.com/package/iobroker.enpal)
[![Downloads](https://img.shields.io/npm/dm/iobroker.enpal.svg)](https://www.npmjs.com/package/iobroker.enpal)

[![Paypal Donation](https://img.shields.io/badge/paypal-donate%20|%20spenden-green.svg)](https://www.paypal.com/donate/?hosted_button_id=7W6M3TFZ4W9LW)

## What this adapter does

Reads energy data from the local InfluxDB 2.x instance provided by Enpal solar systems and exposes ioBroker states for home automation:

- Monitor solar power production
- Track battery state of charge (SoC)
- Analyze grid consumption and feed-in power
- Automate based on power generation
- Visualize energy flows in ioBroker dashboard

## Features

The adapter connects directly to the **local InfluxDB** that the Enpal box writes to — no cloud account or internet access required.

- Automatic discovery of all measurements, devices, and fields stored in your InfluxDB bucket
- Dynamic state creation under `enpal.0.<measurement>.<device>.<field>`
- Configurable polling interval (default: 60 seconds)
- Connection status via `info.connection` — the adapter instance turns red when the database is unreachable

## Data Points

Data points are created dynamically based on the content of your InfluxDB bucket. The structure follows the pattern:

```
enpal.0.<measurement>.<device>.<field>
```

Typical examples (depending on your inverter and Enpal configuration):

- `enpal.0.solar.inverter.power` — Current PV power (W)
- `enpal.0.solar.inverter.energy` — Energy produced today (Wh)
- `enpal.0.battery.storage.soc` — Battery state of charge (%)
- `enpal.0.grid.meter.power` — Grid import/export power (W)
- `enpal.0.info.connection` — Connection status to InfluxDB

> The actual field names depend on your Enpal system version and hardware configuration.

## Installation

1. Install the adapter from the ioBroker admin interface
2. Create a new instance
3. Configure the following settings:
   - **InfluxDB URL**: Address of your local InfluxDB (e.g. `http://192.168.1.100:8086`)
   - **API Token**: Your InfluxDB API token (read access is sufficient)
   - **Organisation ID**: Your InfluxDB organisation
   - **Bucket**: The bucket Enpal writes to (typically `enpal` or similar)
   - **Update Interval**: Data refresh interval in seconds (default: `60`)
4. Save and start the instance

### How to find your InfluxDB credentials

1. Log in to your Enpal box web interface or connect to it via SSH
2. Open the InfluxDB UI at `http://<enpal-box-ip>:8086`
3. Go to **Data → API Tokens** and create a read-only token
4. Note the organisation name and bucket under **Data → Buckets**

## Privacy & Data Handling

- This adapter only connects to your **local InfluxDB** — no data is sent to any cloud service
- Your API token is stored encrypted in the ioBroker database
- No external servers are contacted

## Changelog
<!--
	### **WORK IN PROGRESS**
-->
### 0.2.0 (2026-04-06)
- (skvarel) Updated minimum Node.js version requirement to >=22
- (skvarel) Normalize unit display: "Percent" is now shown as "%"

### 0.1.10 (2026-04-04)
- (skvarel) Fix prettier formatting in main.js

### 0.1.9 (2026-04-04)
- (skvarel) Update node version to 24.x for check-and-lint workflow

### 0.1.8 (2026-04-04)
- (skvarel) Fixed display of unit "None" in data points - now hidden for cleaner UI

### 0.1.7 (2026-04-04)
- (skvarel) Title and description edited

## License
MIT License

Copyright (c) 2026 skvarel <skvarel@inventwo.com>

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