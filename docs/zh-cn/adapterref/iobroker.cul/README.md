---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.cul/README.md
title: ioBroker.cul
hash: jmRF5YMscwGBaQJSz+/IKr05+JCBED1Py+hhuQa6JFQ=
---
![标识](../../../en/adapterref/iobroker.cul/admin/busware.jpg)

![安装数量](http://iobroker.live/badges/cul-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.cul.svg)
![下载](https://img.shields.io/npm/dm/iobroker.cul.svg)

# IoBroker.cul
![测试与发布](https://github.com/ioBroker/ioBroker.cul/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/cul/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用 Sentry 库自动向开发者报告异常和代码错误。** 更多详情以及如何禁用错误报告，请参阅 [Sentry插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！Sentry 报告功能从 js-controller 3.0 开始使用。

ioBroker 适配器，用于通过 [库尔](http://busware.de/tiki-index.php?page=CUL) / [卡尔夫](http://culfw.de) 控制 FS20、Max!、HMS 和其他设备。依赖于 https://github.com/hobbyquaker/cul

## 支持的设备
- *EM* - EM1000WZ，EMWZ
- *FS20*，包括 ESA1000/2000
- *HMS* - HMS100-TF、HMS100-T、HMS100-WD、RM100-2、HMS100-TFK、HMS100-MG、HMS100-CO、HMS100-FIT
- *莫里茨* - MAX！
- *WS* - KS300TH、S300TH、WS2000/WS7000

## 操作指南
### 向 FS20 设备发送命令，例如使用 JavaScript
```sendTo("cul.0", "send", {"protocol":"FS20", "housecode":"A1B2", "address":"01", "command":"00"});```

### 使用 JavaScript 发送原始命令（例如，发送到 InterTechno 设备）。
```sendTo("cul.0", "sendraw", {"command": 'is0FFFFF0FFFFF'});```

这些命令使用此适配器的 CUL 库向设备发送命令。

基于 Javascript/Node.js 的 `Busware CUL USB / culfw` 适配器

<!-- 下一版本的占位符（位于行首）：

### **正在进行中** -->
### 3.0.1 (2026-08-25)
* (bluefox) 现在可以手动输入串口号，因此可以使用 `/dev/serial/by-id` 下的符号链接 (#150)
* (bluefox) 端口列表除了提供 Linux 上的 `/dev/ttyUSBx` 设备外，还提供了 `/dev/serial/by-id` 符号链接。它们不再隐藏在实验性选项之后，也不会再替换设备路径。

### 3.0.0 (2026-08-25)
* (bluefox) 重要提示：适配器现在需要 node.js >= 22、js-controller >= 6.0.11 和 admin >= 7.0.0。
* (bluefox) 适配器已用 TypeScript 重写。源代码位于 `src/` 目录下，已发布的代码位于 `build/` 目录下。
* (bluefox) 已将 `cul` 软件包更新至 1.0.0 版本。它使用串口 13，因此安装不再需要构建工具。
* (bluefox) 重要更新：`cul` 1.0.0 版本重命名了一些数据点：`battery` 现为 `batteryLow`/`batteryState`，`window`/`isopen` 现为 `open`，`valveposition` 现为 `valvePosition`。旧状态不再写入，可以删除。
* (bluefox) 修复了配置对话框中“模式”和“类型”标签互换的问题
* (bluefox) 修复了实验模式下的端口列表：`/dev/serial/by-id` 条目是由未定义的值构建的
* (bluefox) HTML 配置对话框和 gulpfile 文件已被移除
* (bluefox) 当环境变量 `DEBUG` 设置时，会重放 `lib/rawData.txt` 的调试驱动程序已被移除。

### 2.2.0 (2023-04-17)
* (jpk) 可选择按端口 ID 而非名称选择端口
* (bluefox) 管理员 6 的 GUI 已更新

### 2.0.2 (2022-05-11)
* 重要提示：现在至少需要 Nodejs 12.x 版本！
* (Apollon77/achimmm) 添加对地址为 0 的设备的支持
* (bluefox) 更新了串口包

### 1.3.5 (2021-04-12)
* (Apollon77) 确保在接受状态更改之前 cul 已连接 (Sentry IOBROKER-CUL-R)

[更早的更新日志可以在这里找到。](CHANGELOG_OLD.md)

## License

[Licensed under GPLv2](LICENSE) Copyright (c) 2014-2026 hobbyquaker