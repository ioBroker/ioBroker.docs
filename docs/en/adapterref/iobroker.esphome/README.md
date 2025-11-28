<img src="./admin/esphome.png" width="10%" height="10%" align="center">

# ioBroker.esphome

[![NPM version](http://img.shields.io/npm/v/iobroker.esphome.svg)](https://www.npmjs.com/package/iobroker.esphome)
[![Downloads](https://img.shields.io/npm/dm/iobroker.esphome.svg)](https://www.npmjs.com/package/iobroker.esphome)
![Number of Installations (latest)](http://iobroker.live/badges/esphome-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/esphome-stable.svg)
[![Dependency Status](https://img.shields.io/david/DrozmotiX/iobroker.esphome.svg)](https://david-dm.org/DrozmotiX/iobroker.esphome)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/ESPHome/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Known Vulnerabilities](https://snyk.io/test/github/DrozmotiX/ioBroker.esphome/badge.svg)](https://snyk.io/test/github/DrozmotiX/ioBroker.esphome)

[![NPM](https://nodei.co/npm/iobroker.esphome.png?downloads=true)](https://nodei.co/npm/iobroker.esphome/)

**Tests:** ![Test and Release](https://github.com/DrozmotiX/ioBroker.esphome/workflows/Test%20and%20Release/badge.svg)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## ESPHome adapter for ioBroker

Control your ESP8266/ESP32 with simple yet powerful configuration files created and managed by ESPHome.
Native integration of ESPHome managed device (Including Dashboard) by its native API and ensures all data is synchronized (live-event handling, no data polling ! :)

![Logo](admin/img/dashboard.png)

**Quick Links:**
- 📋 [FAQ - Common Questions](#frequently-asked-questions-faq)
- ⚙️ [Prerequisites & Setup](#prerequisites)
- 🎛️ [Dashboard Integration](#esphome-dashboard-integration-optional)
- 📱 [Device Management](#device-management)
- 🔧 [Configuration Examples](#example-config)

This adapter uses the [esphome-native-api](https://github.com/twocolors/esphome-native-api#readme) with all credits to @twocolors to interact with [ESPHome API](https://esphome.io/components/api.html?highlight=api)!

## Frequently Asked Questions (FAQ)

### What's the difference between the ioBroker ESPHome Adapter and ESPHome Dashboard?

**ioBroker ESPHome Adapter:**
- Integrates your ESPHome devices into ioBroker for home automation control
- Communicates directly with ESP devices via ESPHome's native API
- Creates ioBroker states/objects for device control and monitoring
- Handles real-time device status updates (no polling required)
- Manages device configuration within ioBroker

**ESPHome Dashboard:**
- A web interface for creating, editing, and managing ESPHome device configurations
- Used for writing YAML configs, compiling firmware, and flashing devices
- Can be integrated into ioBroker's admin interface as an optional feature
- Can be run either integrated with this adapter or as an external installation (Docker, standalone)

**In Summary:** The adapter controls your devices within ioBroker, while the dashboard manages device configurations and firmware.

### How do I configure the Dashboard IP selector?

The Dashboard IP setting in the adapter configuration serves different purposes:

**For Integrated Dashboard Tab in ioBroker Admin:**
1. Enter the IP address and port where your ESPHome Dashboard is running
2. **Built-in Dashboard:** Use `127.0.0.1:6052` (default for integrated dashboard)
3. **External Dashboard:** Use the IP:port of your external ESPHome installation (e.g., Docker container)
4. **HTTPS Setup:** For HTTPS environments, see the detailed HTTPS configuration section below

**Dashboard IP Examples:**
- Built-in: `127.0.0.1:6052`
- External Docker: `192.168.1.100:6052`
- External Host: `esphome.local:6052`
- HTTPS Proxy: `https://192.168.1.50:8082/proxy.0/esphome/`

![ESPHome Dashboard IP Configuration](admin/img/ESPhomeDashboardIP.png)

**Note:** You can use this adapter to control ESPHome devices without configuring the Dashboard IP. The Dashboard IP is only needed if you want to integrate the ESPHome Dashboard interface into ioBroker's admin panel.

### Do I need the ESPHome Dashboard to use this adapter?

**No, the Dashboard is optional.** You can use this adapter in several ways:

1. **Adapter Only:** Control pre-configured ESPHome devices without any dashboard integration
2. **Adapter + External Dashboard:** Use your existing ESPHome installation (Docker, standalone) and optionally integrate it into ioBroker's interface
3. **Adapter + Built-in Dashboard:** Enable the integrated ESPHome Dashboard feature for a complete solution

The adapter works independently and only requires devices with ESPHome API enabled in their configuration.

### How do I add devices to the adapter?

1. **Ensure ESPHome API is enabled** in your device's YAML configuration (see Prerequisites section)
2. **Open the adapter's device tab** in ioBroker Admin (adapter must be running)
3. **Add devices manually:** Enter device IP address and authentication credentials
4. **Automatic discovery:** Currently disabled (see issue #175)

The adapter will establish a connection and create all necessary ioBroker objects for device control.

<!--
## [Documentation](https://DrozmotiX.github.io/languages/en/Adapter/ESPHome/)

All our adapter documentation can be found at [The DrozmotiX Docu Page](https://DrozmotiX.github.io/languages/en/Adapter/ESPHome/) 
-->

## Prerequisites

    * NodeJS >= 18.x
    * API is activated in YAML
    * For admin tabs (optional)
        * ESPHome Dashboard IP is provided in instance settings

## ESPHome Dashboard Integration (Optional)

This adapter can optionally integrate the ESPHome Dashboard into ioBroker's admin interface. You have several options:

**Option 1: Built-in Dashboard (Recommended for beginners)**
- Enable "Native Integration of ESPHome Dashboard" in adapter settings
- Uses integrated Python environment (no external setup required)
- Dashboard runs on port 6052 by default
- Set Dashboard IP to `127.0.0.1:6052` for admin integration

**Option 2: External Dashboard**
- Use existing ESPHome installation (Docker, standalone, etc.)
- Enter the external dashboard's IP:port in adapter settings
- Example: `192.168.1.100:6052` for Docker container

**Option 3: No Dashboard Integration**
- Skip dashboard configuration entirely
- Use external ESPHome tools for device configuration
- Adapter still controls devices normally

![Dashboard IP Configuration](admin/img/ESPhomeDashboardIP.png)

> **💡 See FAQ above** for detailed explanations about Dashboard IP configuration and adapter vs. dashboard differences.

### Using HTTPS

One reason to use HTTPS is to be able to flash directly to devices plugged into you pc, because esphome will not allow this with http (probably browser limitation with WebSerial).

![flashFromThisComputer.png](admin/img/flashFromThisComputer.png)

Using the integrated dashboard when the iobroker is using https currently requires some more steps:

1. install - if you don't have it already - web adapter and configure https. see web documentation for further information: [ioBroker.web](https://github.com/ioBroker/ioBroker.web)
2. install [proxy](https://github.com/ioBroker/ioBroker.proxy) adapter
3. configure the path in the proxy adapter settings:
   1. context: `esphome/`
   2. url: `http://localhost:6052`
![proxy.png](admin/img/proxy.png)
4. configure the full dashboard url in the advanced section of the esphome adapter settings - esphome dashboard:
   1. like: `https://<iobrokerIP>:<webAdapterPort>/proxy.0/esphome/`
   2. where `<iobrokerIP>` is the ip of the host where you iobroker is running (same as above)
   3. and `<webAdapterPort>` is the port of the web adapter (default is 8082)
   4. it should look something like this:
   ![ESPHomeDashboardUrl.png](admin/img/ESPHomeDashboardUrl.png)
   5. if you run the dashboard on an external host, you can also use the url to an external dashboard instance here

## How to use this adapter

### Activate API in YAML
> [!IMPORTANT]
> ioBroker ESPHome allows to integrate Devices by Encryption Key (recommended) or API-Password (legacy), 
> you must specify your authentication settings accordingly, 
> see [ESPHome Documentation](https://esphome.io/components/api.html?highlight=api)
> Please only configure Encryption Key (preferable) or API-Password (legacy)

#### Example Encryption Key configuration entry
```
api:
  encryption:
    key: "DyDfEgDzmA9GlK6ZuLkj3qgFcjXiZUzUf4chnIcjQto="
```

#### Example API configuration entry
```
api:
  password: 'MyPassword'
```

## Device Management

### Add / Modify / Remove ESPHome devices to ioBroker
> [!IMPORTANT]
> This adapter integrates communication with ESPHome capable devices and 
> (if activated) an integrated version of ESPHome Dashboard.
> You must configure and upload your ESP configuration by yourself, 
> either by using the integrated Dashboard or an external alternative 
> (like Docker) before they can be integrated to ioBroker

> **💡 See FAQ above** for step-by-step guidance on adding devices to the adapter.

The device Tab will show all current known devices; you can either wait for Devices to be autodetect
(currently disabled, see #175) or add them manually by providing their IP-Address and credentials

![DevicesTab](admin/img/deviceTabEmpty.png)

> [!NOTE]
> Buttons to add/modify/remove devices and load device table are only available if adapter is running!
> You must refresh the device table manually by pressing "Refresh device Overview", all devices and their connection state will be shown

Please enter IP-Address (if a device is already known, you can select it from the dropdown) and choose the proper actions:
- ADD / Modify Devices
  - Will send IP address and credentials to the backend and try to establish a connection
  - When an encryption Key is provided, API-Password is ignored, please ensure proper YAML configuration!

- Delete Device
  - Will send a message to the backend to remove this device

> [!WARNING]
> This action will remove a selected device and all its related states from ioBroker!

> [!NOTE]
> After a device has been added, a message will be indicated if successfully or error, 
> you can refresh the table to show current devices and their connection status

![DevicesError](admin/img/connectionIssue.png)
![DevicesOK](admin/img/connectionOK.png)

If connection was successfully, the Device will be initiated and all related states created to control their attributes.  
When making any changes to your YAML configuration, reboot of the ESP will disconnect and initiate a new connection.  
During this process, states not part anymore of YAML configuration will be automatically removed.

![DevicesOK](admin/img/deviceTree.png)

### Example config
Example config, for more examples see [The DrozmotiX Docu Page](https://DrozmotiX.github.io) or [ESPHome Documentation](https://esphome.io/index.html)

<details><summary>Show example config
</summary>

    esphome:
      name: sensor_badkamer
      platform: ESP32
      board: esp-wrover-kit
    
    wifi:
      use_address: 192.168.10.122
      ssid: "xxxxx"
      password: "xxxxxx"
              
    # Enable ESPHome API
    api:
        password: 'MyPassword'
    # Activate i2c bus  
    i2c:
      sda: 21
      scl: 22
      scan: True
      id: bus_a
      
    # Example configuration for bh1750
    sensor:
      - platform: bh1750
        name: "Hal_Illuminance"
        address: 0x23
        measurement_time: 69
        update_interval: 10s
        
    # Example configuration for an GPIO output    
    output:
      - platform: gpio
        pin: 12
        inverted: true
        id: gpio_12
        
    # Example configuration linking a switch to the previous defined output
    switch:
      - platform: output
        name: "Generic Output"
        output: 'gpio_12'
</details>

## Tasmota / ESPEasy migration

Migrating from previous Sonoff Tasmota or ESPEasy setups is very easy. You just need to have ESPHome create a binary for you and then upload that in the web interface.  
See for more details on our [Docu Page](https://DrozmotiX.github.io/languages/en/Adapter/ESPHome/06.migration.html)

**_NOTE:_** Generated yaml files are stored at ```/opt/iobroker/iobroker-data/iobroker.esphome.>instance</>device<.yaml


## Support me
If you like my work, please consider a personal donation  
(this is a personal Donate link for DutchmanNL, no relation to the ioBroker Project !)  
[![Donate](https://raw.githubusercontent.com/DrozmotiX/ioBroker.sourceanalytix/main/admin/button.png)](http://paypal.me/DutchmanNL)

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
    * (DutchmanNL) 
-->
### __WORK IN PROGRESS__
* (@SimonFischer04) fix readme link to lib
* (@SimonFischer04) fix connection status #311
* (@SimonFischer04) remove unneeded node-fetch dependency

### 0.6.3 (2025-09-16)
* (@DutchmanNL) Fixed an admin error related to `jsonConfig` validation. #287
* (@DutchmanNL) Various general fixes and dependency updates to improve stability.
* (@DutchmanNL) Improved responsive design for better usability across devices. #284
* (@DutchmanNL) Introduced GitHub Actions to automatically verify the ESPHome Dashboard. #290
* (@DutchmanNL) Added a comprehensive FAQ section to the README to help users with common questions. #286
* (@DutchmanNL) Updated the `esphome-native-api` library to V1.3.3, which may resolve connection issues. #201

### 0.6.2 (2025-08-08)
* (@SimonFischer04) add support for text device type #141, displays #103
* (@SimonFischer04) fix cover device type #156
* (@SimonFischer04) workaround: downgrade python for now. fixes #259

### 0.6.1 (2025-05-24)
* (@SimonFischer04) Update esphome
* (@ticaki) Optimize admin configuration interface
* (@DutchmanNL) Optimize backend handling of device discovery
* (@DutchmanNL) Capability to select ESPHome Dashboard version added, resolves #118

### 0.5.0-beta.8 (2023-11-24)
* (DutchmanNL) Capability to automatically detect new devices added
* (DutchmanNL) Ensures a compatible pillow version is used (10.0.1)
* (SimonFischer04) Add pillow python package by default, resolves #188

### 0.5.0-beta.4 (2023-11-15)
* (DutchmanNL) Refactor memory caching of device data, resolves #189

## License
MIT License

Copyright (c) 2023-2025 DutchmanNL <rdrozda86@gmail.com>

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
