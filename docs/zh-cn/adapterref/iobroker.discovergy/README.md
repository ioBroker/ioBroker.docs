---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.discovergy/README.md
title: ioBroker.discovergy
hash: roGuB5x3KGimTK00m/5ItkGhDBupE5vGzTG4diF/2kw=
---
![替代文字](https://raw.githubusercontent.com/DrozmotiX/ioBroker.discovergy/master/admin/Discovergy_logo.png)

![替代文字](https://travis-ci.org/DrozmotiX/ioBroker.discovergy.svg?branch=master)
![安装数量](http://iobroker.live/badges/discovergy-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.discovergy.svg)
![下载](https://img.shields.io/npm/dm/iobroker.discovergy.svg)

# IoBroker.discovergy
这是适用于 Discovergy 电表的 ioBroker 适配器。

它使用 Discovergy API 读取电表数据，并将当前值同步到 ioBroker。

https://api.discovergy.com/docs/

## 哨兵
**此适配器使用 Sentry 库自动向开发者报告异常和代码错误。** 更多详情以及如何禁用错误报告，请参阅 [Sentry插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！Sentry 报告功能从 js-controller 3.0 开始使用。

如果您希望添加某些功能或遇到任何问题，请随时提出，以便我查看！

备注：我没有所有可能的设备，而且演示账户也没有提供所有设备可用的功能。

如果您收到以下错误：

从 Discovergy 收到的信息尚未包含在此适配器中。“请将此信息发送给开发者：xxxxx

请前往您的日志文件并下载，然后将提供的值提交到 GitHub 上创建一个 issue。

请勿从管理后台界面复制粘贴，那里缺少我需要的信息！

您可以使用 Discovery 的演示凭据（或者您自己的凭据 :-)) 来测试此适配器：username = demo@inexogy.com pass = demo

## 支持我
如果您喜欢我的作品，欢迎您进行个人捐赠（这是 DutchmanNL 的个人捐赠链接，与 ioBroker 项目无关！）[![捐赠](https://raw.githubusercontent.com/DrozmotiX/ioBroker.wled/master/admin/button.png)](http://paypal.me/DutchmanNL)

## 贡献者
* 阿尔卡尔佐内
* 佐恩纳特

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### __WORK IN PROGRESS__
* (DutchmanNL) Maintenance: raise Node.js to 22, modernise CI and release tooling, update dependencies, resolve repository checker findings
* (DutchmanNL) **FIXED**: Removed non-existent version 0.6.1 from changelog to comply with ioBroker repository checker requirements (E2004)
* (DutchmanNL) **ENHANCED**: Cleaned up common.news entries in io-package.json to maintain only published versions

### 0.7.0 (2026-02-15)
* (DutchmanNL) release fixes and improvements in 0.7.0, resolved #316 #313

### 0.6.0 (2024-12-04) - API change to Inexogy
* (DutchmanNL) Bugfix: API change to Inexogy. Fixes #249
* (DutchmanNL) Migrate admin settings to JSON config. Fixes #211

### 0.5.13 (2023-10-31)
* (sbeh) Support more characters in login credentials fixes #117, #227

### 0.5.12 (2023-10-29)
* (DutchmanNL) Ignore meters not providing any data (like removed devices) fixes #84

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2025-2026 DutchmanNL

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