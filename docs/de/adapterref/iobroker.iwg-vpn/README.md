---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.iwg-vpn/README.md
title: ioBroker.iwg-vpn
hash: i6vSK/HmGFbQgNeBSkKeERf+Vs/B8unO9hjK+QuqoFw=
---
![Logo](../../../en/adapterref/iobroker.iwg-vpn/admin/iwg-vpn-sm.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.iwg-vpn.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.iwg-vpn.svg)
![NPM](https://nodei.co/npm/iobroker.iwg-vpn.png?downloads=true)

# IoBroker.iwg-vpn
WireGuard ist eine eingetragene Marke von Jason A. Donenfeld. (https://www.wireguard.com)

## Iwg-vpn-Adapter für ioBroker
DER Adapter zum Aufbau einer sicheren Verbindung von Remote-Geräten zum ioBroker und lokalen Netzwerk unter Nutzung des [WireGuard](https://www.wireguard.com) VPN und Steuerung lokaler Geräte über Alexa.

Eine detaillierte Beschreibung finden Sie im Adapterkonfigurationsbildschirm oder folgen Sie dem Link: https://htmlpreview.github.io/?https://github.com/iwg-vpn/iobroker.iwg-vpn/blob/main/howto/ read-me.html.

## Voraussetzungen
* Knoten: >= 14.17.x
* js-Controller: >=2.0.0
* Administrator: >=5.1.0

## Changelog

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