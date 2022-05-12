---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.cul/README.md
title: ioBroker.cul
hash: n9cyFwlOacKrFgHp1ZG0tbJEH41ecpP68CZekcZTAks=
---
![标识](../../../en/adapterref/iobroker.cul/admin/busware.jpg)

![安装数量](http://iobroker.live/badges/cul-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.cul.svg)
![下载](https://img.shields.io/npm/dm/iobroker.cul.svg)

# IoBroker.cul
![测试和发布](https://github.com/ioBroker/ioBroker.cul/workflows/Test%20and%20Release/badge.svg)[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/cul/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry 插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用哨兵报告。

ioBroker 适配器通过[文化部](http://busware.de/tiki-index.php?page=CUL)/[阴阳师](http://culfw.de)控制 FS20、Max!、HMS 和其他设备。取决于 https://github.com/hobbyquaker/cul

## 支持的设备
- *EM* - EM1000WZ、EMWZ
- *FS20*，包括。 ESA1000/2000
- *HMS* - HMS100-TF、HMS100-T、HMS100-WD、RM100-2、HMS100-TFK、HMS100-MG、HMS100-CO、HMS100-FIT
- *莫里茨* - 最大！
- *WS* - KS300TH、S300TH、WS2000/WS7000

＃＃ 如何
### 向 FS20 设备发送命令，例如JavaScript
```sendTo("cul.0", "send", {"protocol":"FS20", "housecode":"A1B2", "address":"01", "command":"00"});```

### 使用 JavaScript 发送原始命令（例如到 InterTechno 设备）
```sendTo("cul.0", "sendraw", {"command": 'is0FFFFF0FFFFF'});```

这些命令使用此适配器的 CUL 库向设备发送命令。
基于 Javascript/Node.js 的 `Busware CUL USB / culfw` 适配器

<!-- 下一个版本的占位符（在行首）：

### **正在进行中** -->

## Changelog
### 2.0.2 (2022-05-11)
* IMPORTANT: Nodejs 12.x is now needed at least!
* (Apollon77/achimmm) Add support for devices with address 0
* (bluefox) Updated serialport package

### 1.3.5 (2021-04-12)
* (Apollon77) Make sure that cul is connected before accepting state changes (Sentry IOBROKER-CUL-R)

### 1.3.4 (2020-12-02)
* (Apollon77) prevent crash case (Sentry IOBROKER-CUL-D)

### 1.3.3 (2020-09-25)
* (EvilEls) Added raw command support with cul.write()

### 1.3.2 (2020-08-23)
* (Apollon77) check that all needed objects are existing on start (Sentry IOBROKER-CUL-C)
* (Apollon77) fix Moritz device crash case (Sentry IOBROKER-CUL-7)

### 1.3.1 (2020-07-26)
* (Apollon77) make sure connection check do not crash adapter (Sentry IOBROKER-CUL-3)
* (Apollon77) crashes prevented (Sentry IOBROKER-CUL-5, IOBROKER-CUL-8)

### 1.3.0 (2020-07-20)
* (Apollon77) Really update dependencies and Serialport

### 1.2.2 (2020-04-30)
* (Apollon77) Update dependencies/Serialport

### 1.2.1 (2020-03-18)
* (bluefox) Changed license from non SPDX conform 
    "GPL-2.0" to "GPL-2.0-or-later"

### 1.2.0 (2020-02-10)
* (MK-2001) Sending of FS20 cmdRAW possible or via sendTo as described in the readme
* (Bluefox) Refactoring

### 1.1.0 (2020-01-04)
* (foxriver76) removed usage of adapter.objects

### 1.0.0 (2019-05-15)
* (Apollon77) Support for nodejs 12 added, nodejs 4 is no longer supported!

### 0.4.0 (2018-03-07)
* (Apollon77/Michael Lorenz) Optimizations for nanoCul, Support for ESA devices

### 0.3.0 (2018-01-23)
* (Apollon77) Upgrade Serialport Library

### 0.2.2 (2017-01-23)
* (bluefox) use new npm cul module

### 0.2.0 (2017-01-21)
* (bluefox) Add raw data state

### 0.1.1 (2017-01-14)
* (bluefox) Use newer version of cul module

### 0.1.0 (2016-11-01)
* (bluefox) Update cul package

### 0.0.4 (2015-04-16)
* (bluefox) update package.json

### 0.0.3 (2015-03-03)
* (bluefox) try to bring the adapter to state of the art

## License

[Licensed under GPLv2](LICENSE) Copyright (c) 2014-2022 hobbyquaker