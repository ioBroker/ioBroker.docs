---
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.hoymiles-ms.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.hoymiles-ms.svg
BADGE-Number of Installations (latest): http://iobroker.live/badges/hoymiles-ms-installed.svg
BADGE-Number of Installations (stable): http://iobroker.live/badges/hoymiles-ms-stable.svg
BADGE-License: https://img.shields.io/github/license/mcm4iob/ioBroker.hoymiles-ms?style=flat
BADGE-Donate: https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg
BADGE-: https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86
---
# ioBroker.hoymiles-ms Documentation

## Overview

The **ioBroker.hoymiles-ms** adapter integrates **Hoymiles MicroStorage systems** (currently supporting the Hoymiles MS-A2 model) into ioBroker. This adapter enables monitoring and control of your Hoymiles MS-A2 energy storage system through the ioBroker platform.

The Hoymiles MS-A2 is a MicroStorage unit that combines solar inverter and battery storage capabilities. More information about the device can be found [here](https://www.hoymiles.com/de/products/micro-storage).

**Note:** This adapter is not affiliated with Hoymiles and is an independent community project.

## Features

- **Real-time monitoring**: Battery status, power consumption, grid interaction
- **Energy tracking**: Monitor energy production, consumption, and storage
- **Grid monitoring**: Track grid-connected and off-grid operations
- **System statistics**: Comprehensive overview of system performance
- **Power control**: Set and control power output levels
- **Multiple device support**: Handle multiple MS-A2 units simultaneously
- **MQTT communication**: Reliable communication via MQTT protocol

## Prerequisites

Before setting up the adapter, ensure you have:

1. **ioBroker system** running (Node.js >= 20)
2. **Hoymiles MS-A2** MicroStorage unit
3. **S-Miles Home App** installed on your mobile device
4. **Network connectivity** between ioBroker and MS-A2 unit
5. **Free TCP port** for MQTT communication (default: 1881)

## Adapter Setup and Configuration

### Step 1: Install the Adapter

Install the adapter through the ioBroker admin interface:

1. Open the ioBroker admin interface in your web browser
2. Navigate to the "Adapters" tab
3. Search for "hoymiles-ms" in the adapter repository
4. Click the "Install" button next to the adapter

**Important:** Never install ioBroker adapters using npm directly. Always use the ioBroker admin interface for proper installation and dependency management.

### Step 2: Configure the Adapter

1. Open the ioBroker admin interface
2. Navigate to "Adapters" and find "hoymiles-ms"
3. Click on the configuration (gear) icon
4. Configure the following settings:

#### MQTT Server Configuration

| Parameter | Description | Default Value | Notes |
|-----------|-------------|---------------|-------|
| **Client Mode** | Enable MQTT client mode | `false` | Currently not implemented |
| **MQTT Network** | Network interface to bind to | `0.0.0.0` | Listen on all interfaces |
| **MQTT Port** | TCP port for MQTT server | `1881` | Avoid conflicts with other MQTT services |

**Important Notes:**
- The adapter currently operates only in **MQTT server mode**
- **Authentication is not yet supported** - ensure your network is secure
- Port 1881 is chosen to avoid conflicts with ioBroker.mqtt (1883) and ioBroker.shelly (1882)

### Step 3: Save and Start the Adapter

1. Click "Save & Close" in the configuration dialog
2. Enable the adapter instance
3. The adapter will start and begin listening for MQTT connections

## Hoymiles MS-A2 Device Setup

To connect your MS-A2 unit to the ioBroker adapter, you need to configure it using the S-Miles Home App.

### Step 1: Open S-Miles Home App

1. Launch the S-Miles Home App on your mobile device
2. Ensure you're connected to the same network as your MS-A2 unit

### Step 2: Access MQTT Configuration

1. Navigate to the **Configuration** page (gear icon in upper right corner)
2. Scroll down to find the **"MQTT-Service"** section
3. **Enable** the MQTT Service

### Step 3: Configure MQTT Settings

| Setting | Value | Description |
|---------|-------|-------------|
| **Server Address** | `<ioBroker-IP>` | IP address of your ioBroker system |
| **Port** | `1881` | Port configured in the adapter (default: 1881) |
| **Client Prefix** | `MSA` | Optional identifier prefix (default: MSA) |
| **Authentication** | `Disabled` | Must be disabled (not yet supported) |

**Example Configuration:**
- Server Address: `192.168.1.100` (replace with your ioBroker IP)
- Port: `1881`
- Client Prefix: `MSA`
- Username: *(leave empty)*
- Password: *(leave empty)*

### Step 4: Apply Settings

1. Save the MQTT configuration in the S-Miles Home App
2. The MS-A2 unit will restart its MQTT service
3. Check the ioBroker logs for connection confirmation

## Operation and Data Flow

### Data Update Intervals

The MS-A2 unit sends data at different intervals (these are defined by the Hoymiles API and cannot be configured):

- **Configuration data**: Sent once upon connection establishment
- **Real-time data**: Updated every **1 second**
- **System statistics**: Updated every **5 minutes**

### Device Connection Status

- The adapter monitors device connectivity automatically
- Devices are considered **offline** if no data is received for 30 seconds
- Connection status is displayed in the `info.online` state

## States Created by the Adapter

The adapter dynamically creates states based on the data received from your MS-A2 unit. States are organized in a hierarchical structure:

### Device Information States

| State | Type | Unit | Role | Description |
|-------|------|------|------|-------------|
| `device.manufacturer` | string | - | text | Device manufacturer |
| `device.model` | string | - | info.model | Device model |
| `device.name` | string | - | info.name | Device name |
| `device.sw_version` | string | - | info.firmware | Software version |
| `device.identifiers` | array | - | list | Device identifiers |

### Battery States

| State | Type | Unit | Role | Description |
|-------|------|------|------|-------------|
| `device.bat_i` | number | A | value.current | Battery current |
| `device.bat_p` | number | W | value.power | Battery power |
| `device.bat_temp` | number | °C | value.temperature | Battery temperature |
| `device.bat_v` | number | V | value.voltage | Battery voltage |
| `device.bat_sts` | string | - | text | Battery status |
| `device.soc` | number | % | value | State of charge |

### Grid Connection States (Grid On)

| State | Type | Unit | Role | Description |
|-------|------|------|------|-------------|
| `device.grid_on.v` | number | V | value.voltage | Grid voltage (on-grid) |
| `device.grid_on.i` | number | A | value.current | Grid current (on-grid) |
| `device.grid_on.f` | number | Hz | value.frequency | Grid frequency (on-grid) |
| `device.grid_on.p` | number | W | value.power.active | Active power (on-grid) |
| `device.grid_on.q` | number | Var | value.power.reactive | Reactive power (on-grid) |
| `device.grid_on.ein` | number | Wh | value.energy.consumed | Energy consumed (on-grid) |
| `device.grid_on.eout` | number | Wh | value.energy.produced | Energy produced (on-grid) |
| `device.grid_on.etin` | number | Wh | value.energy.consumed | Total energy consumed (on-grid) |
| `device.grid_on.etout` | number | Wh | value.energy.produced | Total energy produced (on-grid) |

### Grid Connection States (Grid Off)

| State | Type | Unit | Role | Description |
|-------|------|------|------|-------------|
| `device.grid_off.v` | number | V | value.voltage | Grid voltage (off-grid) |
| `device.grid_off.i` | number | A | value.current | Grid current (off-grid) |
| `device.grid_off.f` | number | Hz | value.frequency | Grid frequency (off-grid) |
| `device.grid_off.p` | number | W | value.power.active | Active power (off-grid) |
| `device.grid_off.q` | number | Var | value.power.reactive | Reactive power (off-grid) |
| `device.grid_off.ein` | number | Wh | value.energy.consumed | Energy consumed (off-grid) |
| `device.grid_off.eout` | number | Wh | value.energy.produced | Energy produced (off-grid) |
| `device.grid_off.etin` | number | Wh | value.energy.consumed | Total energy consumed (off-grid) |
| `device.grid_off.etout` | number | Wh | value.energy.produced | Total energy produced (off-grid) |

### Inverter States

| State | Type | Unit | Role | Description |
|-------|------|------|------|-------------|
| `device.inv.v` | number | V | value.voltage | Inverter voltage |
| `device.inv.i` | number | A | value.current | Inverter current |
| `device.inv.p` | number | W | value.power.active | Inverter active power |
| `device.inv.q` | number | Var | value.power.reactive | Inverter reactive power |
| `device.inv.ein` | number | Wh | value.energy.consumed | Inverter energy consumed |
| `device.inv.eout` | number | Wh | value.energy.produced | Inverter energy produced |
| `device.inv.etin` | number | Wh | value.energy.consumed | Inverter total energy consumed |
| `device.inv.etout` | number | Wh | value.energy.produced | Inverter total energy produced |

### Real-time Data States

| State | Type | Unit | Role | Description |
|-------|------|------|------|-------------|
| `realtime.bat_p` | number | W | value.power | Real-time battery power |
| `realtime.bat_sts` | string | - | text | Real-time battery status |
| `realtime.grid_on_p` | number | W | value.power | Real-time grid power (on-grid) |
| `realtime.grid_off_p` | number | W | value.power | Real-time grid power (off-grid) |
| `realtime.soc` | number | % | value | Real-time state of charge |
| `realtime.sys_bat_p` | number | W | value.power | Real-time system battery power |
| `realtime.sys_grid_p` | number | W | value.power | Real-time system grid power |
| `realtime.sys_load_p` | number | W | value.power | Real-time system load power |
| `realtime.sys_plug_p` | number | W | value.power | Real-time system plug power |
| `realtime.sys_pv_p` | number | W | value.power | Real-time system PV power |
| `realtime.sys_soc` | number | % | value | Real-time system state of charge |
| `realtime.sys_sp_p` | number | W | value.power | Real-time system setpoint power |

### System Statistics States

| State | Type | Unit | Role | Description |
|-------|------|------|------|-------------|
| `system.bat_p` | number | W | value.power | System battery power |
| `system.chg_e` | number | Wh | value.energy.consumed | System charge energy |
| `system.dchg_e` | number | Wh | value.energy.produced | System discharge energy |
| `system.grid_p` | number | W | value.power | System grid power |
| `system.ems_mode` | string | - | state | Energy management system mode |
| `system.plug_in_e` | number | Wh | value.energy.consumed | System plug input energy |
| `system.plug_out_e` | number | Wh | value.energy.produced | System plug output energy |
| `system.pv_e` | number | Wh | value.energy.produced | System PV energy |
| `system.pv_p` | number | W | value.power | System PV power |
| `system.soc` | number | % | value | System state of charge |
| `system.sp_p` | number | W | value.power | System setpoint power |

### Power Control States

| State | Type | Unit | Role | Access | Description |
|-------|------|------|------|--------|-------------|
| `power_ctrl.min` | number | W | value.power | Read | Minimum power setting |
| `power_ctrl.max` | number | W | value.power | Read | Maximum power setting |
| `power_ctrl.set` | number | W | level.power | Read/Write | **Power setpoint (controllable)** |
| `power_ctrl.step` | number | W | value.power | Read | Power adjustment step size |

### Information States

| State | Type | Unit | Role | Description |
|-------|------|------|------|-------------|
| `info.online` | boolean | - | indicator.reachable | Device online status |
| `info.ip` | string | - | info.ip | Device IP address |
| `info.timestamp` | number | - | date | Last data timestamp |
| `device.rssi` | number | db | value | Wi-Fi signal strength |

### EMS Control States

| State | Type | Role | Access | Values | Description |
|-------|------|------|--------|--------|-------------|
| `ems_mode.command` | string | state | Read/Write | `general`, `mqtt_ctrl` | **EMS mode control** |

## Power Control Functionality

The adapter provides power control capabilities through specific writable states:

### Setting Power Output

To control the power output of your MS-A2 unit:

1. **Set EMS Mode**: First set `ems_mode.command` to `mqtt_ctrl`
2. **Set Power Level**: Write desired power value to `power_ctrl.set`
3. **Valid Range**: Power value must be between `power_ctrl.min` and `power_ctrl.max`
4. **Step Size**: Use `power_ctrl.step` for appropriate increments

### Example Power Control

```javascript
// Enable MQTT control mode
setState('hoymiles-ms.0.MSA_12345.ems_mode.command', 'mqtt_ctrl');

// Set power output to 500W (example)
setState('hoymiles-ms.0.MSA_12345.power_ctrl.set', 500);
```

### Power Control Notes

- Power control is only available when the device is in `mqtt_ctrl` mode
- Power settings are applied immediately by the MS-A2 unit
- Monitor the real-time states to verify power changes
- Return to `general` mode to restore automatic operation

## Multiple Device Support

The adapter automatically handles multiple MS-A2 units:

- Each device is identified by its unique client ID
- States are created dynamically for each connected device
- Device objects are organized under separate folders
- Online status is tracked individually for each device

## Troubleshooting

### Common Issues

**Device Not Connecting:**
1. Verify network connectivity between ioBroker and MS-A2
2. Check MQTT server configuration in adapter settings
3. Ensure port 1881 is not blocked by firewall
4. Verify MQTT settings in S-Miles Home App

**States Not Updating:**
1. Check device online status (`info.online`)
2. Verify timestamp updates (`info.timestamp`)
3. Check adapter logs for error messages
4. Restart adapter if necessary

**Power Control Not Working:**
1. Ensure EMS mode is set to `mqtt_ctrl`
2. Verify power value is within min/max range
3. Check that device is online and responding
4. Monitor real-time states for changes

### Log Analysis

Enable detailed logging by setting the adapter log level to "debug" or "silly":

- **Info level**: Connection events and basic operations
- **Debug level**: Detailed MQTT communication
- **Silly level**: All MQTT messages and state updates

### Network Requirements

- **Port 1881/TCP**: Must be accessible from MS-A2 to ioBroker
- **Firewall**: Ensure MQTT traffic is allowed
- **Network stability**: Stable connection required for reliable operation

## FAQ

**Q: Can I use a different MQTT port?**
A: Yes, configure any free port in the adapter settings and update the MS-A2 configuration accordingly.

**Q: Does the adapter support authentication?**
A: Not yet. Authentication support is planned for future releases.

**Q: Can I monitor multiple MS-A2 units?**
A: Yes, each unit will appear as a separate device with its own states.

**Q: How often is data updated?**
A: Real-time data updates every second, system statistics every 5 minutes (controlled by Hoymiles API).

**Q: Can I control charge/discharge schedules?**
A: Currently, only power output control is supported. Advanced scheduling may be added in future versions.

**Q: What happens if the network connection is lost?**
A: The adapter will detect offline devices and mark them accordingly. Data will resume when connection is restored.

**Q: Are there any limitations?**
A: The adapter is currently limited to read-only monitoring and basic power control. Advanced features depend on Hoymiles API capabilities.

## Support and Contributing

For issues, questions, or contributions:

- **GitHub Issues**: [Report issues here](https://github.com/mcm4iob/ioBroker.hoymiles-ms/issues)
- **ioBroker Forum**: [Community support and discussions](https://forum.iobroker.net/topic/81667/test-adapter-hoymiles-ms-v0-2-x)
- **Documentation**: This document and inline code comments

**If you like this adapter, please consider a donation:**
  
[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mcm1957atIoBroker)

---

*This adapter is an independent community project and is not affiliated with Hoymiles.*

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.2.2 (2026-01-10)
* (mcm1957) Subscription code has been fixed to allow operation with hoymiles mqtt v3.0
* (mcm1957) NOTE: TOU topics are not yet supported and raising warnings currently.

### 0.2.1 (2026-01-09)
* (mcm1957) ignore empty and invalid payloads. [#90]
* (mcm1957) Dependencies have been updated

### 0.2.0 (2025-08-23)
* (mcm1957) States are created dynamically now. So no states should be created if a system does not provide data for it (i.e slave micro storage).
* (mcm1957) State values are reset during startup now to prevent stale information.
* (mcm1957) Support to control power consumption and delivery has been added.
* (mcm1957) Dependencies have been updated

### 0.1.2 (2025-08-03)
* (mcm1957) Warnings raised from slave systems have been removed
* (mcm1957) Dependencies have been updated

### 0.1.1 (2025-07-27)
* (mcm1957) Handling of configuration has been corrected
* (mcm1957) Translations have been adapted

### 0.1.0 (2025-07-26)
* (mcm1957) initial release

## License
MIT License

Copyright (c) 2025-2026 mcm1957 <mcm57@gmx.at>

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