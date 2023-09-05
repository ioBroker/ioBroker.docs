---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.iwg-vpn/README.md
title: ioBroker.iwg-vpn
hash: busbgtYocktxzrv8Dn+9zYER6zcQzA8Sg/OYgA5pyeY=
---
![Logo](../../../en/adapterref/iobroker.iwg-vpn/admin/iwg-vpn-sm.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.iwg-vpn.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.iwg-vpn.svg)
![NPM](https://nodei.co/npm/iobroker.iwg-vpn.png?downloads=true)

# IoBroker.iwg-vpn
WireGuard ist eine eingetragene Marke von Jason A. Donenfeld. (https://www.wireguard.com)

## Iwg-VPN-Adapter für ioBroker
DER Adapter zum Aufbau einer sicheren Verbindung von Remote-Geräten zum ioBroker und zum lokalen Netzwerk unter Nutzung des [WireGuard](https://www.wireguard.com) VPN und zur Steuerung lokaler Geräte über Alexa.

Eine detaillierte Beschreibung der VPN-Einrichtung finden Sie im Adapterkonfigurationsbildschirm oder folgen Sie dem Link: https://htmlpreview.github.io/?https://github.com/iwg-vpn/iobroker.iwg-vpn/blob/main/ howto/read-me.html.

Sobald das VPN eingerichtet ist, kann es als Kommunikationskanal zur Steuerung lokaler Geräte über den Sprachassistenten Alexa genutzt werden. Die bereits vorhandene Gerätekonfiguration (d. h. ioBroker.iot-Geräte) wird einfach übernommen, es sind keine Änderungen an der vorhandenen Konfiguration erforderlich.

Für eine detaillierte Beschreibung der Alexa-Einrichtung folgen Sie bitte dem Link: https://htmlpreview.github.io/?https://raw.githubusercontent.com/iwg-vpn/iobroker.iwg-vpn/main/howto/alexa-config.html .

## Voraussetzungen
* Knoten: >= 14.17.x
* js-controller: >=2.0.0
* Admin: >=5.1.0

## License
Creative Commons Attribution-NonCommercial (CC BY-NC)

Copyright (c) 2022 iwg-vpn <iwg.vpn@gmail.com>

http://creativecommons.org/licenses/by-nc/4.0/

Short content:
Licensees may copy, distribute, display and perform the work and make derivative works based on it only if they give the author or licensor the credits in the manner specified by these.
Licensees may copy, distribute, display, and perform the work and make derivative works based on it only for noncommercial purposes.
(Free for non-commercial use).