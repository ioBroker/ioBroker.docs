---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.iwg-vpn/README.md
title: ioBroker.iwg-vpn
hash: ft3EJbN2lQjjwwCEdMFs3xtzTH0KoXztT/1Cr1wjdYQ=
---
![Логотип](../../../en/adapterref/iobroker.iwg-vpn/admin/iwg-vpn-sm.png)

![НПМ-версия](http://img.shields.io/npm/v/iobroker.iwg-vpn.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.iwg-vpn.svg)
![НПМ](https://nodei.co/npm/iobroker.iwg-vpn.png?downloads=true)

# IoBroker.iwg-vpn
WireGuard является зарегистрированной торговой маркой Джейсона А. Доненфельда. (https://www.wireguard.com)

## Адаптер iwg-vpn для ioBroker
Адаптер для настройки безопасного соединения удаленных устройств с ioBroker и локальной сетью с использованием [WireGuard](https://www.wireguard.com) VPN и управления локальными устройствами через Alexa.

Подробное описание настройки VPN см. на экране конфигурации адаптера или перейдите по ссылке: https://htmlpreview.github.io/?https://github.com/iwg-vpn/iobroker.iwg-vpn/blob/main/ Howto/read-me.html.

После настройки VPN его можно использовать в качестве канала связи для управления локальными устройствами с помощью голосового помощника Alexa. Уже существующая конфигурация устройства (т. е. устройства ioBroker.iot) просто берется, никаких изменений в существующей конфигурации не требуется.

Подробное описание настройки Alexa можно найти по ссылке: https://htmlpreview.github.io/?https://raw.githubusercontent.com/iwg-vpn/iobroker.iwg-vpn/main/howto/alexa-config.html. .

## Предварительные условия
* узел: >= 16.x
* js-контроллер: >=2.0.0
* администратор: >=5.1.0

## Changelog

### v3.0.0
* bug fixes
* dependencies' updates
* @iobroker/adapter-core is bumped up to 3.x
* BREAKING: requires npm >=7 and Node.js >=16

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
