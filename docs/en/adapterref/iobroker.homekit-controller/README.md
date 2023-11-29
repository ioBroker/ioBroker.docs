![Logo](admin/homekit-controller.png)
# ioBroker.homekit-controller

![Number of Installations (latest)](https://iobroker.live/badges/homekit-controller-installed.svg)
![Number of Installations (stable)](https://iobroker.live/badges/homekit-controller-stable.svg)
[![NPM version](https://img.shields.io/npm/v/iobroker.homekit-controller.svg)](https://www.npmjs.com/package/iobroker.homekit-controller)

![Test and Release](https://github.com/Apollon77/ioBroker.homekit-controller/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/homekit-controller/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.homekit-controller.svg)](https://www.npmjs.com/package/iobroker.homekit-controller)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## homekit-controller adapter for ioBroker
This adapter allows you to pair and directly control devices with the "works with HomeKit" Logo that cna be used with Apple Home. The adapter supports IP/WLAN devices and also BLE (Bluetooth LE) devices. The adapter works completely local in your network.

### The adapter is not ...
... offering ioBroker devices or states to be controlled by an Apple Home app/system. If you want this direction please use the [yahka](https://github.com/jensweigele/ioBroker.yahka) adapter.

... supporting Thread "only" based devices. The Homekit Thread specifications are not yet publicly available. From the current knowledge all devices on the market also support BLE or WLAN, so the adapter will simply not use Thread but other ways to communicate.

### How to use the adapter
The adapter listens for available devices in your network.

There are three "types" of detected devices:
* **Unpaired devices** are devices that are discovered and available to pair. Some basic states are generated for these devices in ioBroker which contains some informational and administrative states. By providing the PIN you can pair these devices to this adapter instance (see "pairing" section below)
* **Paired with this instance** devices can be fully controlled, will update state values in "real time" using subscriptions (IP devices only) and data polling interval. The device can also be "unpaired" from this instance (see section below).
* **Paired with someone else** devices are devices that are discovered but already paired with some other controller. These are logged in debug mode but no states are created for them. If you want to use them with ioBroker you first need to unpair them from their current controller (sometimes only possible with a hard reset or such - refer to manual) and after this they should be shown as "unpaired device".

After pairing the supported states are read out from the device and objects and states are created. All known data points defined in the HomeKit standard should be named in a human-readable way. If you see UUIDs as names then the device manufacturer added self-defined data. If it is known what they provide this could be added to the adapter (e.g. as the ones added for Elgato devices) to show up as named in next version.

The data points are created with proper states and, if available, also correct roles. Else generic roles are used.

### Identify information
Devices that are not paired with any controller have an `admin.identify` state that can be triggered with `true`. In this case the relevant device should identify itself (e.g. a lamp should blink or such, so that it can be identified). This function is only available as long as the device is not paired with an controller.

#### Pairing information
To pair the device with this adapter instance you need to provide the pin which is shown on the device, or a lable or such. The PIN is 8 numbers beside a QR-Code. The numbers need to be entered in the format 123-45-678 (also when the dashes are not printed on the label or shown on screen!)

Right now the PIN needs to be entered into the admin.pairWithPin state - an Admin UI will follow soon.

After pairing the device to this instance it is NOT possible to also add the device to Apple Home app or such in parallel.

There might be cases that are still problematic for pairing because I was only able to test with a very few devices, so please report issues, and I will support with instructions to get the needed debugging data.

#### Unpairing information
To unpair just trigger the `admin.unpair` state with "true" and the unpair process will be executed - an Admin UI will follow soon.

#### Special notes for use of IP devices
IP devices are discovered using UDP packages, so your host need to be in the same network as the devices. There is currently no real way around it because the MDNS record used contains important information for the pairing process.
Especially when using Docker you need to find ways (host mode, macvlan, ...) to see the UDP packages.

The main challenge for WLAN based IP devices without controls or a screen is to get them into your WLAN network. Most likely there is a manufacturer specific Mobile app to add the devices initially to your network. If this initial process also pairs the device with Apple Home you might need to unpair it afterwards (e.g. https://www.macrumors.com/how-to/delete-homekit-device/). After this it should be in your WLAN and available to pair with this adapter.

Once an IP device is paired and the IP stays the same the adapter directly connects to the device on start. SO best pin the IP in your router. If the IP has changed then the connection should be established on next discovery and the IP should be updated.

#### Special notes for use of BLE devices
By default, BLE is disabled in the adapter settings. After enabling the devices that are reachable can be discovered.

Because of the limitations of Bluetooth devices no "real-time updates" of state changes are available. The devices will report "important state changes" (e.g. the "On" state changes) by special packages that will trigger an immediate data refresh. Additionally, data are refreshed in the defined data polling intervals. Do not set them too short!

After a restart of the adapter bluetooth devices can not be connected directly - the system needs to receive at least one discovery package from the device to get the needed connection details. This mean BLE devices might be available a bit delayed.

### Troubleshooting

#### Known incompatible devices
If you have issues pairing the device with this adapter please try to pair it with the normal iOS Apple Home App. If this does not work then something is weird with the device and then also this adapter can not help. Pot try a reset, but else there is not chance.

This is currently that way for some `Tado Door Locks` as example. They need to be paired using the `Tado App` which is somehow registering the device into Apple Home, but not via an official pair process.

Additional also `Nuki 3 Locks (BLE)` are not possible to pair because they use Hardware Authentication components that are not publicly documented by Apple.

For Netatmo a user found out how pairing could be possible when it had issue. See https://github.com/Apollon77/ioBroker.homekit-controller/issues/233#issuecomment-1311983379

#### Other potential issues to check before opening a ticket

##### for BLE devices
* If you have issues that the BLE connection do not work our you get Errors when the adapter tries to initialize the BluetoothLE connection, please first run `iobroker fix` to make sure that all permissions and needed capabilities are set correctly.
* If this do not help please check https://github.com/noble/noble#running-on-linux
* Please make sure that your system is up-to-date including kernel `apt update && apt dist-upgrade`
* Try to reset the relevant BLE device with e.g. `sudo hciconfig hci0 reset`
* For issues also provide the output of `uname -a` and `lsusb`
* Low level BLE device log can be obtained using `sudo hcidump -t -x >log.txt` (in a second shell additionally to run the adapter)

##### General advices
* Does the device have a Pairing Mode or such that needs to be activated first? But also read the manual careful, maybe the Pairing mode is for some other legacy protocol or bridge but not Apple Home.
* Basically if the error "pair-setup characteristic not found" pops up while trying to pair then the device do not support pairing via Homekit in its current state. The adapter cn not do anything then!
* Please make sure to enter the PIN mit Dashes in the form "XXX-XX-XXX". Other formats should be declined by the library already by an error, but just to make sure

## Debugging
When you have issues and want to report an Issue (see below) then enhanced debug log is always helpful.

* Please stop the adapter instance in iobBroker Admin
* Open a shell on the relevant server
* Manually start the adapter using `DEBUG=hap* node /opt/iobroker/node_modules/iobroker.homekit-controller/build/main.js 0 --debug --logs`
* Then do whatever produces the error and grab the log from the  shell and post with the Issue.
* post the console log also in the issue. This will generate a log on protocol level.
* Additionally, find the relevant object in Admin "Objects" tab and click the pencil on right and provide the JSON of the object.

### Resources and Links
* Resource that tries to decode `Elgato` special states: https://gist.github.com/simont77/3f4d4330fa55b83f8ca96388d9004e7d

### TODO
* check how the adapter works with buttons (they do not have a state, and I do not own such a device. need support for this)
* look into supporting video devices
* look into support devices that offer images (method is there but never saw it in action)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.5.9 (2023-11-23)
* (Apollon77) Prevent crash when a single value is returned as error status
* (Apollon77) send booleans always as 0/1 to make sure all devices handle it correctly
* (Apollon77) Update dependencies

### 0.5.8 (2023-02-27)
* (Apollon77) Update Noble to address CPU/RAM issues

### 0.5.7 (2023-01-27)
* (Apollon77) Added support for Ikea Dirigera Hubs and other devices with very log Accessory IDs
* (Apollon77) Optimize handling of configuration changes
* (Apollon77) Optimize connection state handling

### 0.5.6 (2023-01-05)
* (Apollon77) Upgrade noble library

### 0.5.5 (2022-12-31)
* (Apollon77) Downgrade noble library again

### 0.5.3 (2022-12-22)
* (bluefox) Corrected active TAB Background

### 0.5.2 (2022-12-22)
* (bluefox) Updated GUI packages
* (Apollon77) Upgraded noble BLE library

### 0.5.1 (2022-06-10)
* (Apollon77) Optimizations for BLE connections

### 0.5.0 (2022-06-08)
* (Apollon77) Add Connection identifier for Admin object list
* (Apollon77) Count polling errors and reinitialize device connection when too many errors occur
* (Apollon77) Optimize adapter startup to prevent double initialization of devices

### 0.4.4 (2022-05-06)
* (Apollon77) Add Host header to HTTP devices to prevent issues with some devices
* (Apollon77) Fix several edge case issues

### 0.4.3 (2022-01-25)
* (Apollon77) make sure all connections get closed on reconnect

### 0.4.2 (2022-01-25)
* (Apollon77) Reset HTTP connection if timeouts happen on data polling

### 0.4.1 (2022-01-21)
* (Apollon77) Optimize close of connections on adapter stop

### 0.4.0 (2022-01-21)
* (Apollon77) performance increase by using persistent connections to IP devices and many more optimizations
* (Apollon77) Only use one queue for all BLE devices
* (Apollon77) Store pairing data directly after pair
* (Apollon77) Optimize handing of concurrent requests
* (Apollon77) Optimize value update handling and better detect stale data to force an update on next polling

### 0.3.3 (2021-10-26)
* (bluefox) Fix the Discovery checkboxes

### 0.3.1 (2021-10-25)
* (Apollon77) Fix datatype of lastDiscovered state

### 0.3.0 (2021-10-24)
* (Apollon77) BREAKING CHANGE: All channel names will be changed and a number gets added at the end of the name. Please manually delete the ones without such a number

### 0.2.0 (2021-10-23)
* (bluefox) Add Admin UI
* (Apollon77) Store pairing data additionally in an instance directory and retry them on start if objects where deleted or such
* (Apollon77) Add info.lastDiscovered state with a timestamp to allow manual cleanup of devices that are paired somewhere else then with the adapter instance (because such objects would currently not be deleted)
* (Apollon77) Add missing device and channel objects
* (Apollon77) Always convert bool-type to boolean because it might be numbers coming from the devices
* (Apollon77) sort devices for Admin UI to have those with available actions on top
* (Apollon77) Enhance error messages
* (Apollon77) Adjust some roles

### 0.1.0 (2021-10-19)
* (Apollon77) Optimizations and added some Elgato states
* (Apollon77) Initial GitHub release

### 0.0.x
* (Apollon77) Initial commit and Alpha GitHub testing

## License
MIT License

Copyright (c) 2021-2023 Ingo Fischer <github@fischer-ka.de>

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
