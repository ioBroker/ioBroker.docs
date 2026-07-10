# ioBroker.oasecontrol
**Tests:** ![Test and Release](https://github.com/mr-suw/ioBroker.oasecontrol/workflows/Test%20and%20Release/badge.svg)

## oasecontrol adapter for ioBroker
ioBroker.oasecontrol controls outdoor devices from OASE. 
Supported devices are the InScenio FM-Master EGC series.

Current devices under test:
- FM-Master WLAN EGC Home with 4 power outlets

Current supported features:
- switchable power outlets
- dimmable power outlet
- new object elements for making an outlet switch read only

Could also work with
- [InScenio FM-Master Cloud series](https://www.oase.com/en/products-a-z/family/product/p/70788-inscenio-fm-master-cloud-int.html)

## Compatibility
compatibel to OASE FW: 51.25

tested with 51.25

make sure to add io.broker MAC address to the broadcast whitelist of your WLAN access point.

## Setup in ioBroker
**IP OASE device:** static IPv4 address of your OASE device

**IP TCP server:** static IPv4 address of your ioBroker instance

**OASE device password**: that's the tough part; sniff it during app-login; it is a crypted string of 74 characters derived from http://app-oasecloud-prod.azurewebsites.net/User/Inventory. Characters \\\u should be replaced by \u

**Polling [s]:** how often in seconds the OASE device should be polled for new data

## Setup Check
You did successfully setup this adapter when the log sequence is as follows:
```
authenticated to device
Starting TCP server with TLS...
Detected device:FM-Master EGC Home
```

oasecontrol object are present as follows:
```
info.connection = true
...
serial-number = < device serial number >
```

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.1.4 (2026-05-31)
* Fix errors reported by checker

### 0.1.3 (2026-05-16)
* Fix deploy issue

### 0.1.0 (2026-05-16)
* Adapter requires node.js >= 22 now

### 0.0.8
* NPM release

## License
MIT license

Copyright (c) 2026 mrsuw mrsuw@icloud.com
