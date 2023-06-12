![Logo](admin/iwg-vpn-sm.png)


# ioBroker.iwg-vpn

[![NPM version](http://img.shields.io/npm/v/iobroker.iwg-vpn.svg)](https://www.npmjs.com/package/iobroker.iwg-vpn)
[![Downloads](https://img.shields.io/npm/dm/iobroker.iwg-vpn.svg)](https://www.npmjs.com/package/iobroker.iwg-vpn)

[![NPM](https://nodei.co/npm/iobroker.iwg-vpn.png?downloads=true)](https://nodei.co/npm/iobroker.iwg-vpn/)

WireGuard is a registered trademark of Jason A. Donenfeld. (https://www.wireguard.com)

## iwg-vpn adapter for ioBroker

THE adapter for setting up a secure connection from remote devices to the ioBroker and local network leveraging the [WireGuard](https://www.wireguard.com) VPN and controlling local devices via Alexa.

For detailed description please refer to the adapter configuration screen or follow the
link: https://htmlpreview.github.io/?https://github.com/iwg-vpn/iobroker.iwg-vpn/blob/main/howto/read-me.html.

## Prerequisites
* node: >= 14.17.x
* js-controller: >=2.0.0
* admin: >=5.1.0


## Changelog

### v1.0.2
* reconfiguration (re-scanning of QR-Codes) on Peers required
* required review changes in io-package

### v1.0.1
* bug fixes

### v1.0.0
* IP ranges are released after a long inactivity period
* additional checks for NAT functionality
* logo fixed
* dependencies updated


### v0.11.4
* icons in settings fixed
* dependencies updated
* orphan keys clean up added

### v0.11.3
* a way to allow write operations on whitelisted variables added
* bug fixes

### v0.11.2
* warnings while writing a state fixed

### v0.11.1
* http communication over VPN additionally secured by means of asymmetric keys
* bug fixes

### v0.11.0
* improved http communication
* percentage controller capability added
* relative changes support added

### v0.10.7
* bug fixes

### v0.10.6
* http server enhancements
* bug fixes
* doorbell capability support added

### v0.10.5
* Change reporting on ack=true only
* Local keys storage moved to iobroker-data

### Previous versions
* Change reporting and motion sensor support added
* Bug fixes
* Config screen enhancements
* Control your real and virtual devices via Alexa
* Adapter starts own HTTP server to support configuration via QR Codes
* Remote access support for ioBroker windows hosts
* Peer configuration as QR Code to import into a WireGuard App on a mobile peer
* Auto generation of key pairs for configured peers
* Adapter review feedback incorporated
* Validate your configuration before applying it
* Information about latest handshake and sent/received bytes via the WireGuard network interface
* Support of NAT between VPN and the ioBroker host's local network

## License
Creative Commons Attribution-NonCommercial (CC BY-NC)

Copyright (c) 2022 iwg-vpn <iwg.vpn@gmail.com>

http://creativecommons.org/licenses/by-nc/4.0/

Short content:
Licensees may copy, distribute, display and perform the work and make derivative works based on it only if they give the author or licensor the credits in the manner specified by these.
Licensees may copy, distribute, display, and perform the work and make derivative works based on it only for noncommercial purposes.
(Free for non-commercial use).