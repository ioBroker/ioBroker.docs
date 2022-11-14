---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.iwg-vpn/README.md
title: ioBroker.iwg-vpn
hash: VXYj6ivvl9Q6NnrUTnADlnhHcc0ucpoJMprAx8I5dNI=
---
![标识](../../../en/adapterref/iobroker.iwg-vpn/admin/iwg-vpn.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.iwg-vpn.svg)
![下载](https://img.shields.io/npm/dm/iobroker.iwg-vpn.svg)
![新PM](https://nodei.co/npm/iobroker.iwg-vpn.png?downloads=true)

#ioBroker.iwg-vpn
WireGuard 是 Jason A. Donenfeld 的注册商标。 (https://www.wireguard.com)

## IoBroker 的 iwg-vpn 适配器
用于设置从远程设备到 ioBroker 和本地网络的安全连接的适配器，利用 [线卫](https://www.wireguard.com) VPN 并通过 Alexa 控制本地设备。

详细说明请参考适配器配置界面或点击链接：https://htmlpreview.github.io/?https://github.com/iwg-vpn/iobroker.iwg-vpn/blob/main/howto/自述文件.html。

## 先决条件
* 节点：>= 14.17.x
* js 控制器：>=2.0.0
* 管理员：>=5.1.0

## Changelog

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