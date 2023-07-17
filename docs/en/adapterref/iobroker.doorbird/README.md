![Logo](admin/doorbird.png)

# ioBroker.doorbird

[![NPM version](https://img.shields.io/npm/v/iobroker.doorbird.svg)](https://www.npmjs.com/package/iobroker.doorbird)
[![Downloads](https://img.shields.io/npm/dm/iobroker.doorbird.svg)](https://www.npmjs.com/package/iobroker.doorbird)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/iobroker.doorbird?label=npm%20dependencies&style=flat-square)

![GitHub](https://img.shields.io/github/license/iobroker-community-adapters/iobroker.doorbird?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/iobroker-community-adapters/iobroker.doorbird?logo=github&style=flat-square)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/iobroker.doorbird?logo=github&style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/iobroker-community-adapters/iobroker.doorbird?logo=github&style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/iobroker-community-adapters/iobroker.doorbird?logo=github&style=flat-square)

![Test and Release](https://github.com/iobroker-community-adapters/ioBroker.doorbird/workflows/Test%20and%20Release/badge.svg)

[![NPM](https://nodei.co/npm/iobroker.doorbird.png?downloads=true)](https://nodei.co/npm/iobroker.doorbird/)

## Versions

![Beta](https://img.shields.io/npm/v/iobroker.doorbird.svg?color=red&label=beta)
![Stable](http://iobroker.live/badges/doorbird-stable.svg)
![Installed](http://iobroker.live/badges/doorbird-installed.svg)

## What is Doorbird?

DoorBird is a door intercom that functions both as a doorbell and security system. The product goes on the outside of a house, where a doorbell would typically be, and features a doorbell push button with a camera above.

## Configuration

1. Enter the IP on which the Adapter should listen to Events from the Doorbird Device.
   (This is normally the IP of your ioBroker Host).
   The adapter tries to prefill the field with the correct IP for you. If the prefilled IP is not the IP of your ioBroker Host please change it to the correct IP.
2. The Port is predefined to `8100`. You can change it if the Port is already used by another service.
   Just try to run the Adapter with this Port. If the Port is not available you will get an error while starting the adapter. Then just get back here and change the port.
3. Enter the IP of your Doorbird device. You can click on the "search icon" left to the input field. After you clicked the icon a message at the top of the config screen will appear. Now you have 60 Seconds to press the ring button on your Doorbird device. The Adapter tries to detect the IP and fill all fields for you.
4. The Device ID (NOT IP!) of your Doorbird.
5. The Username which needs to have the API Permission on the Doorbird device.
6. The password for the Username entered in field 5.

![Screenshot](img/configscreen.png)

After you entered all required information to the config dialog click "Save & Close".
The Adapter should now restart, and you are ready to go!

## Access to the Snapshots of Motion and DoorBell

Use the following URL to get the current snapshot:

```
http://<ioBroker-IP>:<Port>/files/doorbird.<instance>.Doorbell<number>_1.jpg
http://<ioBroker-IP>:<Port>/files/doorbird.<instance>.Motion_1.jpg
```

Exampble:

```
http://192.168.0.2:8081/files/doorbird.0/Doorbell1_1.jpg
```

## Compatible Devices

| Device                           | Hardware version | Firmware version |
| -------------------------------- | ---------------- | ---------------- |
| DoorBird Video Door Station D10x | 1.00 and above   | 000099 and above |
| DoorBird Video Door Station D20x | 1.00 and above   | 000099 and above |
| DoorBird Video Door Station D21x | 1.00 and above   | 000108 and above |
| BirdGuard B10x                   | 1.00 and above   | 000099 and above |
| DoorBird Video Door Station D11x | 1.00 and above   | 000130 and above |

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.0.5 (2023-07-05)

-   (Schmakus) Fixed AxiosError (deletion of duplicates) [#55]

### 1.0.4 (2023-07-05)

-   (Schmakus) Interim solution because deletion of duplicate favorites

### 1.0.2 (2023-07-04)

-   (Schmakus) Hotfix because dev-mode was active

### 1.0.1 (2023-07-04)

-   (Schmakus) remove unused packages
-   (Schmakus) added migration from older versions to delete unused snapshot states
-   (Schmakus) some code improvements

### 1.0.0 (2023-07-04)

-   (Schmakus) Re-new with adapter creator
-   (Schmakus) Changed snapshot handling! Find snapshot at ioBroker Files now!
-   (Schmakus) Support take snapshot manually has been added
-   (Schmakus) Support for light-On has been added

## License

The MIT License (MIT)

Copyright (c) 2023 iobroker-community-adapters <>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
