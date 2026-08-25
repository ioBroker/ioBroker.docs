---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.maxcul/README.md
title: ioBroker.maxcul
hash: EcdEsDmLFDTrbUWEx3Iu+S5kSFQwwzE9BSuDcaVl+TI=
---
![标识](../../../en/adapterref/iobroker.maxcul/admin/maxcul.png)

![安装数量](http://iobroker.live/badges/maxcul-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.maxcul.svg)
![下载](https://img.shields.io/npm/dm/iobroker.maxcul.svg)
![测试](https://travis-ci.org/ioBroker/ioBroker.maxcul.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.maxcul.png?downloads=true)

# IoBroker.maxcul
ioBroker 适配器通过 [库尔](http://busware.de/tiki-index.php?page=CUL) 控制 Max！

适配器派生自 [皮马蒂克-马克斯库尔](https://github.com/fbeek/pimatic-maxcul)

## 支持的设备
- 恒温器
- 门/窗传感器
- 按钮
- 壁式恒温器

＃＃ 用法
使用前，您必须先将设备与 ioBroker 配对。

例如，对于恒温器，请长按“增强”按钮，直到倒计时开始。

＃＃ 联系
适配器通过串口或网络与运行 [卡尔夫](http://culfw.de/) 的 CUL 通信：

- **CUL 棒（串口）** - 通过 USB 连接的 CUL/COC。选择串口和波特率。
- **CUN/CUNO（网络）** - 可通过 TCP 访问的 CUN、CUNO 或任何其他 culfw 设备，

例如，使用 culfw 固件重新刷写的 MAX! Cube 或 ESP8266/CC1101 桥接器。输入主机名或 IP 地址以及 culfw 监听的 TCP 端口（默认为 2323）。

不再需要使用 `ser2net`/`socat` 的变通方案。

如果连接了多个串口设备，请优先选择端口列表中的 `/dev/serial/by-id/...` 条目之一。哪个设备会成为 `/dev/ttyUSB0` 或 `/dev/ttyUSB1` 取决于它们的检测顺序，并且可能在重启后发生变化，而 `by-id` 名称始终指向同一个串口设备。

其他路径可以手动输入。

如果连接中断，适配器将每隔 10 秒自动重新连接。在此期间无法发送的命令将保留在队列中，并在 CUL 恢复连接后发送。

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 2.1.0 (2026-08-13)
* (@GermanBluefox) Added support for CUN/CUNO devices which are connected over the network (TCP)
* (@GermanBluefox) The connection is now re-established automatically if it was lost
* (@GermanBluefox) Fixed the crash on a communication error and the missing cause in the connection error message
* (@GermanBluefox) The serial port list now also offers the stable device links below `/dev/serial`, so a stick can be selected by a name which does not change after a reboot
* (@GermanBluefox) Fixed the CI workflow, which was not triggered by pushes to the master branch
* (@GermanBluefox) Fixed the issues reported by the repository checker

### 2.0.1 (2026-08-06)
* (ioBroker-Bot) Adapter requires js-controller >= 6.0.11 now.
* (9Mad-Max5) Updating serialport to version 12.0.0 to support Node.js 20
* (9Mad-Max5) Updating serialport to version 13.0.0 to stop support for Node.js 20
* (@GermanBluefox) Migrated the sources to TypeScript
* (@GermanBluefox) Fixed the message counter, which was sent as `01` for every packet
* (@GermanBluefox) Refactoring and code cleanup

### 1.3.1 (2020-07-26)
* (bowao) Fix unhandled exception
* (bowao) Fix serial port selection
* (Apollon77) Update dependencies

### 1.3.0 (2020-05-12)
* (Apollon77) Support nodejs 12+14
* (Apollon77) Prevent warnings in js-controller 3

### 1.2.0 (2020-01-23)
* (bluefox) Refactoring

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

[Licensed under GPLv2](LICENSE)

Copyright (c) 2017-2026 bluefox <dogafox@gmail.com>