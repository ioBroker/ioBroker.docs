---
chapters: {"pages":{"en/adapterref/iobroker.cec2/README.md":{"title":{"en":"ioBroker.cec2"},"content":"en/adapterref/iobroker.cec2/README.md"},"en/adapterref/iobroker.cec2/doc/ExampleScripts.md":{"title":{"en":"Some script examples"},"content":"en/adapterref/iobroker.cec2/doc/ExampleScripts.md"}}}
---
![Logo](admin/cec2.png)
# ioBroker.cec2

[![NPM version](https://img.shields.io/npm/v/iobroker.cec2.svg)](https://www.npmjs.com/package/iobroker.cec2)
[![Downloads](https://img.shields.io/npm/dm/iobroker.cec2.svg)](https://www.npmjs.com/package/iobroker.cec2)
![Number of Installations](https://iobroker.live/badges/cec2-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/cec2-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.cec2.png?downloads=true)](https://nodei.co/npm/iobroker.cec2/)

**Tests:** ![Test and Release](https://github.com/iobroker-community-adapters/ioBroker.cec2/workflows/Test%20and%20Release/badge.svg)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

Adapter for HDMI CEC

You can monitor / control devices using HDMI CEC. Most modern TVs and multimedia devices support CEC to some extent.

## Info

On start this adapter runs cec-client and polls all devices on the HDMI bus. For every CEC device a device in ioBroker
is created. The OSDName of a device will become its id in ioBroker (because it should not change and is nicely readable).
If devices show up during runtime they will be added to ioBroker, too.

#### CEC Adresses 

Short introduction about CEC addresses, you can skip this, but might want to read here, if you get confused by the description
below. 

In CEC there are two types of addresses. Both are important.

##### Logical Address

The logical address is a number between 0 and 15 (or F in Hex which is normally used). The number defines what kind of 
device it is: 
* 0 = TV
* 5 = Audiosystem
* 4,8,11 = Playback
* 1,2,9 = Recording
* 3,6,7,10 = Tuner

The others are reserved (12,13), Freeuse (14) and unregistered/broadcast (15). The devices that use these addresses are 
restricted in there communication.

The logical address is dynamically assigned. That means on one day you can have the situation that Playback A is assigned
address 4 and Playback B 8. But on the next day they are switched on in a different order and then A gets 8 and B 4. (Some devices
are always active on the CEC bus though and therefore cling to their addresses). If there are too many devices of one type
(i.e. 4 playback devices), then the logical addresses have to be reused and that will happen. The adapter tries to manage this case.

The logical address is used to address messages and reports to.
ioBroker needs a logical address, too, in order to receive reports from the bus. Therefore configure the adapter to a device type
that you know you have free logical addresses (for example recording). 

##### Physical Address

The physical address is based on the HDMI ports involved for the device. It is basically a path of port numbers towards 
the device. It is composed from 4 numbers seperated by dots. Some examples:
* 0.0.0.0 = TV
* 1.0.0.0 = 1. HDMI port of the TV
* 2.0.0.0 = 2. HDMI port of the TV
* 2.2.0.0 = 2. HDMI port of the TV, 2. HDMI port of a Switch / AV-Receiver
* 4.1.2.0 = 4. HDMI port of the TV, 1. HDMI port of a AV-Reciever / Switch, 2. HDMI port of the next AV-Receiver/Switch

That should give a basic idea. A 0 means the path is ending.

The physical address is fix for a device unless it is replugged into a different HDMI Port (or any devices before it seen from TV).

#### States per device 

For every device there are the following states created:

* info.active = device was seen recently and logical address should be correct
* info.cecVersion = should be 1.4, determines features
* info.lastSeen = last message from device on CEC bus
* info.logicalAddress = logical address as number
* info.logicalAddressHex = logical address as hex number (needed for own commands)
* info.Name = name the device sets in CEC Bus
* info.physicalAddress = physical address
* info.Vendor = vendor of the device
* activeSource = is the device the active source? Set to true to switch the TV input to this device (setting false is not possible, switch another device active instead)
* menuStatus = lets device be controlled by TV remote
* state = power state of device (lets you switch it on/off, if supported)
* createButtons = press here to generate states for buttons in .buttons subfolder.
* buttons.time = time to hold a button (default 500ms). While held, the button press is repeated every 450ms as required by CEC.

## Buttons
Button presses do not work for all devices and some might need to have 
an active connection with the ioBroker device to be controlled via CEC bus.
For FireTV it works quite ok. 
To test button presses, press `createButtons` button in a device and test some of the
created buttons in some situations. Power works for quite a lot devices. 

#### Global States

There are the following global states:

* active-source = physical address of the current active source (can be set to switch inputs)
* arc = Audio Return Channel is (in)active (read only, ARC can only be controlled by the audio system)
* mute = mute Audiosystem
* osdMessage = show a message on the TV (max. 13 characters, not supported by all TVs)
* raw-command = send commands to cec-client directly (for example 'scan' or tx + CEC Command from http://www.cec-o-matic.com/) 
* standbyAll = send all devices to standby
* systemAudio = Audiosystem is/is not in use. Informs devices that they should send volume/mute commands to Audiosystem
* volume = volume of Audiosystem, 0 = mute 
* volumeUp/Down = change volume of Audiosystem

#### Poll States

There is a subfolder "poll" with button-states for most states. If the button is triggered, the adapter will issue a 
command on CEC Bus to poll the value and set the state accordingly (sadly not all devices react to poll messages, though).

#### Requirements
cec-client have to be installed. Usually can be installed using:
```
sudo apt install cec-utils
```

The user running iobroker (nowadays "iobroker") needs access to the CEC device. On current Raspberry Pi OS (and other
Linux systems using the kernel CEC driver) that is `/dev/cec0` (`/dev/cec1` for the second HDMI port), on old Raspberry Pi
firmware `/dev/vchiq`, for Pulse-Eight USB adapters `/dev/ttyACM0`. You may need to add the iobroker user to the
video group (or dialout group for USB adapters):
```
sudo usermod -a -G video iobroker
```

## Configuration

* osd name: this name will reported to other devices, for example your TV. You might need to select ioBroker there to receive remote controls in ioBroker.
* device type: You can set the device type, see discussion of logical address above to get an idea what that means. Use a device type that you have not many of. Default is playback, some TVs (i.e. LG) have problems with recording devices.
* poll power states / interval: poll the power state of the TV every interval milliseconds (default 60000).
* CEC device: device of the CEC adapter, for example `/dev/cec1` to use the second HDMI port of a Raspberry Pi 4/5. Empty for autodetect.
* HDMI port: HDMI port of the TV (or receiver) the adapter is connected to. Only needed if the physical address can not be detected automatically. 0 for autodetect.
* prevent unnamed devices: Sometimes devices are not reporting their name in certain situations (for example Nintendo Switch won't report its name when in standby but announce itself). In this situations the adapter might create a duplicate of the device under it's physical address (i.e. for numbers). You can enable this option to prevent it.  

## Script examples:

See [example Scripts](/#/docs/adapterref/iobroker.cec2/doc/ExampleScripts.md) for some example scripts that help with / repair multimedia setups.

## Changelog

<!--
	PLACEHOLDER for next version:
	### __WORK IN PROGRESS__
-->

### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (mcm1957) Adapter requires node.js >= 20 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (copilot) Adapter requires admin >= 7.6.17 now
- (mcm1957) Dependencies have been updated
- (Garfonso) Node.js 26 has been added to the test matrix
- (Garfonso) Size attributes and i18n flag have been added to jsonConfig
- (Garfonso) Dependencies have been updated
- (Garfonso) Adapter timers (setTimeout/setInterval) are used now, so timers are cleaned up on unload
- (Garfonso) Type checking errors have been fixed
- (Garfonso) Translations have been converted to the short i18n format
- (Garfonso) Fixed: button presses restarted the adapter, buttons are now held and repeated according to CEC spec
- (Garfonso) Fixed: volume was parsed wrong, deck status was never parsed, power on/off did not work for logical addresses above 9
- (Garfonso) Fixed: commands for inactive devices were broadcast to all devices
- (Garfonso) Fixed: activeSource of other devices was not reset, OSD messages longer than 13 characters
- (Garfonso) Messages are no longer sent with logical addresses of other devices (not supported by kernel CEC driver), arc is read only now
- (Garfonso) CEC version emulation was removed
- (Garfonso) cec-client is restarted if it stops, malformed messages no longer restart the adapter
- (Garfonso) New options for CEC device and HDMI port, default device type is playback, default poll interval is 60s
- (Garfonso) CEC communication is now behind an interface to allow other backends (libCEC binding) later

### 0.1.3 (2024-07-04)
* remove unnecessary files from npm package

### 0.1.2 (2024-06-04)
* prevent crash
* try restart in case of error with cec-client

### 0.1.1 (2023-09-06)
* dependency updates.
* sending commands is now more reliable.
* more error handling

### 0.1.0 (2021-02-18)
* add more translations.
* add more options (poll TV power).

### 0.0.8 (2021-02-14)
* Switched from unmaintained dependency to own code to control cec-monitor binary.
* Swtiched from event-stream to readline.
* Probably fixed missed incomming events.

## License
MIT License

Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2020-2024 Garfonso <garfonso@mobo.info>

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