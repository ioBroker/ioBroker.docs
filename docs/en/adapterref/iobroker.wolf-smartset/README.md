![Logo](admin/wolf-smartset.png)
# ioBroker.wolf-smartset

[![NPM version](http://img.shields.io/npm/v/iobroker.wolf-smartset.svg)](https://www.npmjs.com/package/iobroker.wolf-smartset)
[![Downloads](https://img.shields.io/npm/dm/iobroker.wolf-smartset.svg)](https://www.npmjs.com/package/iobroker.wolf-smartset)
![Number of Installations (latest)](http://iobroker.live/badges/wolf-smartset-installed.svg)
[![Dependency Status](https://img.shields.io/david/iobroker-community-adapters/iobroker.wolf-smartset.svg)](https://david-dm.org/iobroker-community-adapters/iobroker.wolf-smartset)
[![Known Vulnerabilities](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.wolf-smartset/badge.svg)](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.wolf-smartset)
![Test and Release](https://github.com/iobroker-community-adapters/ioBroker.wolf-smartset/workflows/Test%20and%20Release/badge.svg)
<!-- ![Number of Installations (stable)](http://iobroker.live/badges/wolf-smartset-stable.svg) -->
[![NPM](https://nodei.co/npm/iobroker.wolf-smartset.png?downloads=true)](https://nodei.co/npm/iobroker.wolf-smartset/)

## wolf-smartset adapter for ioBroker
Connect your Wolf Heating to iobroker.

This adapter connects to the the Wolf Smartset server (https://wolf-smartset.com) to monitor and manage your Wolf heating device. This is not a local connection. The benefit is that you can use the Wolf Smartset app or [Wolf Smartset Portal](https://wolf-smartset.com) and also receive or set param values in ioBroker in parallel.

## Requirements

You need a Wolf heating/climate device equipped with a ISM7i WLAN/LAN module (aka Link Home) connected to the Wolf Smartset server and a Wolf Smartset account authorized for your device.

## Adapter Instance Settings

### Tab: Main Settings

#### Wolf Smartset Account
To connect to the Wolf Smartset server you need your 
- `Username` and 
- `Password`

which you also use to log in to the Wolf Smartset app or the [Wolf Smartset Portal](https://wolf-smartset.com). 

#### Wolf Device

Your Wolf account is associated with one ore more Wolf devices. Each device requires an individual ioBroker adapter instance.

After first-time install you have to select a specific 
- `Device` for each instance. 

As soon as you entered a valid `Username` and `Password` the 
- `List of Wolf Devices` will be filled with the devices assigned to your account. 

After selecting the device from the list, click on  
- `USE THIS DEVICE` to confirm your selection.

### Tab: Advanced Settings

Advanced settings allow you to adapt the adpater's operation to your needs. Typically, you can leave all advanced settings on their default.

#### Poll Cycle Intervals and Parameter Lists

The adapter will - after connecting to the Wolf Smartset server - periodically poll parameter values from the server.
- `Poll all Parameters`: the adapter will always poll all parameters found on the server. This poll strategy is backward compatible with adapter version 1.x

The adapter also supports a more sophisticated poll strategy based on two independent poll cycles with different cycle intervals.
- `Short Poll Cycle Interval`: enter the interval in __seconds__. The Wolf Smartset server defines an absolute minimum poll interval (currently 60 sec) which you should not undercut. If you configure a value below this minimum interval the server will not respond in the expected way or may even disconnect your session. The adapter requests the current minimum poll interval from the server periodically. If the configured poll interval is below the minimum poll interval indicated by the server, you will get a warning log from the adapter and you should adjust your poll interval accordingly.
- `Long Poll Cycle Interval`: enter the interval in __minutes__ for the second poll cycle.

The Wolf Smartset server groups the various device parameters into different bundles, identified by a numeric BundleId. In the __ioBroker Admin__ UI  you will find the BundleIds for the different parameter groups in the __Object__ view below the __wolf-smartset__ instance at the channel level. 

- `Parameters of Bundle`: Within this table you can define which parameter value group should be polled in which poll cycle. It is a good idea to:
	- `Include in Short Poll Cycle` all fast changing parameter values (e.g. operational states) and to 
	- `Include in Long Poll Cycle` rarely changing parameter values (e.g. device configuration parameters).

The Wolf Smartset API requires each poll request to include - besides a list of parameters to poll - also a BundleId. It's not quite clear how the BundleId relates to the actual parameter list, but in most cases 'Default' should be OK: it maps to the largest selected BundleId for the given poll cycle. Any other setting here is for experimental use. Configure the BundleId to be used as:
- `BundleId for Short Poll Cycle`
- `BundleId for Long Poll Cycle` 

If you configured `Poll all Parameters`, the BundleId used in the poll requests is set to 1000. This will likely exclude some Expert parameters (see below) from the result. So, if you intend to poll Expert parameters, you should probably not use `Poll all Parameters`.

#### Expert Login

Wolf Smartset API defines two access levels for device parameters: __User__ and __Expert__. Accordingly, you will find in the __Object__ view of the __ioBroker Admin__ UI the corresponding two  subtrees: __Benutzer__ and __Fachmann__. Afer initial authentication the adapter is in User mode and will receive only once during initialization all available parameter values. After that, during periodic polls it will receive only updates for User level parameter values (i.e. value in the __Benutzer__ tree). 

If you check
- `Do Expert Login` and enter the correct
- `Expert Password`, 

the adapter will perform an Expert Login during initialization and receive also periodic updates of expert level parameter values (as shown in the __Fachmann__ tree) during the poll cylce they are associated with.

__!!! Important Note on Expert Level: Start !!!__

Expert level seems to be behave like Pandora's box! Tests showed, that it was quite hard to leave the Expert level once you enabled it. Although the adapter will completely logout and remove all locally cached authentication data (openId tokens and session id) when disabling `Do Expert Login` setting and restarting the instance, it looks like this is not good enough for the Wolf Smartset server. 

```
In fact, only a change of the adapter's public IP address in combination with an adapter instance reload might get the adapter back to User level.
```

While it doesn't  look too problematic to stay in Expert mode at first sight, there is at least one side effect that might be a real issue for you: 

```
In Expert mode some pre-period statistics might not be updated reliably from Wolf Smartset server!
```

This affects in particular the following ParameterIds and probably also other ones:
```
- wolf-smartset.0.Benutzer.Heizung.212_Statistik_Wärmeerzeuger 1.27017500001
- wolf-smartset.0.Benutzer.Heizung.212_Statistik_Wärmeerzeuger 1.27017600001
- wolf-smartset.0.Benutzer.Heizung.212_Statistik_Wärmeerzeuger 1.27017700001
```

So, if you rely on a constant and precise delivery of such pre-period statistic values, you should think twice whether to check `Do Expert Login`. Don't complain, if you are in trouble to get back to User level, you have been warned!

__!!! Important Note on Expert Level: End !!!__

#### Check for Public IP Changes

The Wolf Smartset server is Client IP address aware. This means, it associates some application state information with the public IP address of the client application. So, if you configured `Do Expert Login` and the adapter's public IP changes (e.g. after a router reload), the adapter will have to re-authenticate to the Wolf Smartset server in order to enable the Expert mode again. Since the adapter will do a re-authentication only every hour, it may take up to __one hour until the adapter is in Expert mode again__. 

If this is too long for you, you can check 
- `Enable Public IP Checking`: In this case, the adapter will check your public IP address via [ipify.org](https://ipify.org) __every 4th Short Poll Cycle__ and will trigger re-authentication on change. That way, the adapter will be back in Expert mode __the latest after 4 Short Poll Cycles__.

#### API Profiling

API Profiling allows you to track the Wolf Smartset API usage of the adapter. if you 
- `Enable API Profiling`, the adaptert will update the following objects in the __adapter instance object tree__ for each poll request:
	- info_api
		- poll_req_bundle_id: the BundleId used in the poll request
		- poll_req_num_params: the number of parameters requested by the adapter
		- poll_resp_num_params: the number of parameters returned from the server
		- poll_resp_num_params: the number of parameters values returned from the server (returned parameters may or may not have an associated value)

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (mcm1957) Dependencies have been updated.

### 2.1.2 (2025-08-14)
- (mcm1957) Adapter requires admin 7.6.17 now.
- (mcm1957) Dependencies have been updated.

### 2.1.1 (2025-08-05)
- (mcm1957) Dependencies have been updated.

### 2.1.0 (2025-08-05)
- (flingo64) Change: Log periodic message '_refreshAuthToken(): ERROR ...' with level info
- (flingo64) Bugfix (#458): set instance state to connected only if initialization went fine
- (flingo64) Bugfix: if configured BundleId for poll requests is not available on server, use default BundleId
- (flingo64) Enhancement: option 'Poll all Parameters' implements backward compatible poll strategy
- (flingo64) Enhancement(#459, #465): added more BundleIds (4300, 10000, 10700, 14000, 14700, 15600, 15700, 15800) for AdminUI as found on different Wolf device configurations

### 2.0.1 (2025-04-18)
- (flingo64) Bugfix: fixed various typos in Readme and translations
- (flingo64) Bugfix: Fixed an AdminUI issue (#450 - 'No device selected') when the device information contained line break (e.g. in ContactInformation, Description or Comment )
- (flingo64) Enhancement for AdminUI: support for more than one device in list of devices returned from Wolf Smartset server

### 2.0.0 (2025-04-02)
- (flingo64) BREAKING CHANGE: Please reenter your login credentials.
- (mcm1957) Adapter requires node.js 20, js-controller 6 and admin 7 now.
- (flingo64) A general code cleanup and partial rewrite has been done.
- (flingo64) Trigger re-initalization has been added, if api returns an error (server might be down temporarily).
- (flingo64) Expert login and periodic re-login have been added (#242).
- (flingo64) Support for level 3 objects `time programs` / `party mode` / `vacation mode` has been added.
- (flingo64) Request UserInfo from Wolf server, check whether adapter instance's poll interval meets requirements (60 sec) added.
- (flingo64) ParameterId lists for each Wolf BundleId created and show `BundleIds` for each channel added
- (flingo64) Support for two sepearate poll cycles to avoid server abuse reactions has been added. 
- (flingo64) Switched AdminUI to `jsconConfig`.

## License
MIT License

Copyright (c) 2024-2025 iobroker-community-adapters <iobroker-community-adapters@gmx.de>
Copyright (c) 2021-2023 MeisterTR <meistertr.smarthome@gmail.com>

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
