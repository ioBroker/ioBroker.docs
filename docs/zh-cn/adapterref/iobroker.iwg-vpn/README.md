---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.iwg-vpn/README.md
title: ioBroker.iwg-VPN
hash: ft3EJbN2lQjjwwCEdMFs3xtzTH0KoXztT/1Cr1wjdYQ=
---
![标识](../../../en/adapterref/iobroker.iwg-vpn/admin/iwg-vpn-sm.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.iwg-vpn.svg)
![下载](https://img.shields.io/npm/dm/iobroker.iwg-vpn.svg)
![国家公共管理](https://nodei.co/npm/iobroker.iwg-vpn.png?downloads=true)

# IoBroker.iwg-vpn
WireGuard 是 Jason A. Donenfeld 的注册商标。 （https://www.wireguard.com）

## IoBroker 的 iwg-vpn 适配器
该适配器用于利用 [线卫](https://www.wireguard.com) VPN 建立从远程设备到 ioBroker 和本地网络的安全连接，并通过 Alexa 控制本地设备。

有关详细的 VPN 设置说明，请参阅适配器配置屏幕或点击链接：https://htmlpreview.github.io/?https://github.com/iwg-vpn/iobroker.iwg-vpn/blob/main/ howto/read-me.html。

VPN 设置完成后，即可用作通过 Alexa 语音助手控制本地设备的通信通道。仅采用现有的设备配置（即 ioBroker.iot 设备），无需对现有配置进行任何更改。

有关详细的 Alexa 设置说明，请点击链接：https://htmlpreview.github.io/?https://raw.githubusercontent.com/iwg-vpn/iobroker.iwg-vpn/main/howto/alexa-config.html 。

## 先决条件
* 节点：>= 16.x
* js 控制器: >=2.0.0
* 管理员：>=5.1.0

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