![Logo](admin/iwg-vpn-sm.png)


# ioBroker.iwg-vpn

[![NPM version](http://img.shields.io/npm/v/iobroker.iwg-vpn.svg)](https://www.npmjs.com/package/iobroker.iwg-vpn)
[![Downloads](https://img.shields.io/npm/dm/iobroker.iwg-vpn.svg)](https://www.npmjs.com/package/iobroker.iwg-vpn)

[![NPM](https://nodei.co/npm/iobroker.iwg-vpn.png?downloads=true)](https://nodei.co/npm/iobroker.iwg-vpn/)

WireGuard is a registered trademark of Jason A. Donenfeld. (https://www.wireguard.com)

## iwg-vpn adapter for ioBroker

THE adapter for setting up a secure connection from remote devices to the ioBroker and local network leveraging the [WireGuard](https://www.wireguard.com) VPN and controlling local devices via Alexa.

For detailed VPN setup description please refer to the adapter configuration screen or follow the
link: https://htmlpreview.github.io/?https://github.com/iwg-vpn/iobroker.iwg-vpn/blob/main/howto/read-me.html.

Once the VPN is set up, it can be used as a communication channel for controlling local devices via Alexa voice assistant. The already existing device configuration (i.e. ioBroker.iot devices) is just taken, no changes on existing configuration needed.

For detailed Alexa setup description please follow the link: https://htmlpreview.github.io/?https://raw.githubusercontent.com/iwg-vpn/iobroker.iwg-vpn/main/howto/alexa-config.html.

## Prerequisites
* node: >= 14.17.x
* js-controller: >=2.0.0
* admin: >=5.1.0

## Changelog

### v2.0.5
* objects API introduced

### v2.0.4
* Code review feedback of Apollon77 incorportated

### v2.0.3
* Drop-in replacement for iobroker.iot for Alexa integration

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

## License
Creative Commons Attribution-NonCommercial (CC BY-NC)

Copyright (c) 2022 iwg-vpn <iwg.vpn@gmail.com>

http://creativecommons.org/licenses/by-nc/4.0/

Short content:
Licensees may copy, distribute, display and perform the work and make derivative works based on it only if they give the author or licensor the credits in the manner specified by these.
Licensees may copy, distribute, display, and perform the work and make derivative works based on it only for noncommercial purposes.
(Free for non-commercial use).