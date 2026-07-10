---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.alarm/README.md
title: ioBroker.alarm
hash: A7EFoEodD4sa1G3hTwHnBhNGO9xRkNYfb5k4n4lxhy0=
---
![标识](../../../en/adapterref/iobroker.alarm/admin/alarm.png)

![安装数量](http://iobroker.live/badges/alarm-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.alarm.svg)
![下载](https://img.shields.io/npm/dm/iobroker.alarm.svg)
![已知漏洞](https://snyk.io/test/github/misanorot/ioBroker.alarm/badge.svg)
![NPM](https://nodei.co/npm/iobroker.alarm.png?downloads=true)

# IoBroker.alarm
**GitHub Actions**：

![GitHub Actions](https://github.com/misanorot/ioBroker.alarm/workflows/Test%20and%20Release/badge.svg)

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=ZYHW84XXF5REJ&source=url)

## IoBroker 的报警系统
**[英文描述](docs/en/alarm_en.md)** **[德语描述](docs/de/alarm.md)**

这款适配器让您无需丰富的编程知识即可设置家庭报警系统。它支持配置 3 个安全回路，并在夜间休息、激活或停用期间对其进行监控。此外，适配器内部状态可直接与外部状态关联。这些关联在“快捷方式”选项卡中进行配置。您可以轻松配置简单的模拟有人在场功能，以增强防盗保护。系统还支持各种事件通知，并可通过 Telegram 或电子邮件等多种渠道发送。（前提是已安装相应的适配器！）

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 4.0.6 (2026-07-07)
* (@GermanBluefox) Packages were updated
* (@GermanBluefox) Some compiler errors were fixed

### 4.0.5 (2026-06-23)
* (@misanorot) fixed checker issues

### 4.0.4 (2026-05-17)
* (@misanorot) fixed little JSON Ui issues

### 4.0.3 (2026-05-11)
* (@misanorot) fixed checker issues
- (copilot) Adapter requires node.js >= 22 now
* (@GermanBluefox) fixed JSON config issues
* (@GermanBluefox) packages were updated

### 4.0.2 (2026-04-07)
* (@GermanBluefox) fixed #368

[Older changes](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2019-2026 misanorot <audi16v@gmx.de>