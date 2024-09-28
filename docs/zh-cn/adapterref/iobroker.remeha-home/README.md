---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.remeha-home/README.md
title: ioBroker.remeha-首页
hash: uRi77+bePrsWGCD5xccnBWjbelxfrurWjfa1VJBWsxM=
---
![标识](../../../en/adapterref/iobroker.remeha-home/admin/remeha-home.png)

![安装数量](http://iobroker.live/badges/remeha-home-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.remeha-home.svg)
![下载](https://img.shields.io/npm/dm/iobroker.remeha-home.svg)
![已知漏洞](https://snyk.io/test/github/simatec/ioBroker.remeha-home/badge.svg)
![执照](https://img.shields.io/github/license/simatec/ioBroker.remeha-home?style=flat)
![捐](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)

# IoBroker.remeha-主页
![测试与发布](https://github.com/simatec/ioBroker.remeha-home/workflows/Test%20and%20Release/badge.svg)

此适配器使用服务`Sentry.io`自动向我（开发人员）报告异常和代码错误以及新的设备架构。更多详情见下文！

---

## 支持适配器开发
**如果您喜欢 ioBroker.remeha-home，请考虑捐款：**

[![贝宝]（https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif）](https://paypal.me/mk1676)

---

## Remeha Home ioBroker 适配器
---

＃＃ 描述
ioBroker.remeha-home 适配器可通过 [Remeha Home平台](https://www.remeha.de/produkte/speicher-und-zubehoer/regelungen/home-app) 集成和控制 Remeha 供暖系统。该适配器持续连接到 Remeha Home API 并检索当前数据，使其在 ioBroker 系统中可用。这样可以对供暖系统进行最佳监控和控制。

## 函数
* 数据检索：连续检索室温、室外温度、供暖状态等供暖数据。
* 控制区域模式：激活和停用加热区域（例如针对不同的房间或楼层）。
* 设定目标温度：设置不同区域所需的房间温度。
* 切换壁炉模式：激活壁炉模式来调节壁炉等外部热源的加热。

## 适配器配置
适配器的配置非常简单。
只需要 Remeha Home 帐户的用户名（电子邮件地址）和密码。

您必须在适配器的配置中输入这些内容。

--- <!-- ### **正在进行中** -->

## Changelog
### 0.2.3 (2024-09-26)
* (simatec) Fix jsonConfig
* (simatec) Fix for Admin 7.1.5

### 0.2.2 (2024-09-19)
* (simatec) small State Fix

### 0.2.1 (2024-09-18)
* (simatec) States Fix
* (simatec) Readme Fix
* (simatec) Test & Release Fix

### 0.2.0 (2024-09-16)
* (simatec) Translation Fix
* (simatec) Code cleaning
* (simatec) Ready for Betatest

### 0.1.3 (2024-09-12)
* (simatec) Fix Zonemode
* (simatec) Translation added

### 0.1.2 (2024-09-11)
* (simatec) Fix Zonemode

### 0.1.1 (2024-09-10)
* (simatec) Fix Release Script

### 0.1.0 (2024-09-10)
* (simatec) First Beta

### 0.0.1 (2024-09-09)
* (simatec) First Commit
---

## License

MIT License

Copyright (c) 2024 simatec

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.