---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.discovergy/README.md
title: ioBroker.discovergy
hash: JrTgb6QHbY0ilsnijYvzoCe9QUeb4wCl0Zi3TKn78kc=
---
![替代文本](https://raw.githubusercontent.com/DrozmotiX/ioBroker.discovergy/master/admin/Discovergy_logo.png)

![替代文本](https://travis-ci.org/DrozmotiX/ioBroker.discovergy.svg?branch=master)
![安装数量](http://iobroker.live/badges/discovergy-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.discovergy.svg)
![下载](https://img.shields.io/npm/dm/iobroker.discovergy.svg)

# IoBroker.发现
这是适用于您的 Discovergy 电力测量仪表的 ioBroker 适配器。
它使用 Discovergy API 读取您的仪表数据，并将其当前值同步到 ioBroker。

https://api.discovergy.com/docs/

请随意添加您想要的功能或您看到的问题，以便我可以查看！

备注：我没有所有可能的设备，并且模拟账户也没有提供设备可以提供的所有现有值。
如果您收到以下错误：

从 Discovergy 收到的信息尚不属于此适配器的一部分” “将此信息发送给开发人员：xxxxx

请前往您的日志文件并下载，然后使用提供的值在 GitHub 上创建一个问题。
请勿从管理员网页界面复制粘贴，这里缺少我需要的信息！

您可以使用 discovergy 的演示凭证（或您自己的 :-)）测试此适配器：用户名 = demo@inexogy.com 密码 = demo

## 支持我
如果您喜欢我的作品，请随时提供个人捐赠（这是 DutchmanNL 的个人捐赠链接，与 ioBroker 项目无关！）[![捐赠]（https://raw.githubusercontent.com/DrozmotiX/ioBroker.wled/master/admin/button.png）](http://paypal.me/DutchmanNL)

## 贡献者
* AlCalzone
* 佐尔纳特

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### __WORK IN PROGRESS__
* (DutchmanNL) **ENHANCED**: Updated GitHub Copilot instructions to latest template version 0.4.0 with comprehensive testing framework patterns and enhanced development guidelines. Fixes #287
* (DutchmanNL) **FIXED**: Repository checker issues - deprecated methods replaced and VSCode configuration improved
* (DutchmanNL) **ENHANCED**: VSCode IntelliSense support for io-package.json and package.json validation
* (DutchmanNL) **NEW**: Added comprehensive API testing with demo credentials to ensure adapter reliability
* (DutchmanNL) **FIXED**: Critical bug where adapter would always show "credentials missing" even with valid credentials - now properly validates user login
* (DutchmanNL) **ENHANCED**: Demo testing now includes proper password encryption matching ioBroker admin interface behavior
* (DutchmanNL) **TESTING**: New `npm run test:integration-demo` command validates full API connectivity with working demo credentials (`demo@inexogy.com` / `demo`)
* (DutchmanNL) **CI/CD**: Automated testing ensures adapter connects properly to Discovergy/Inexogy API and initializes meters successfully

### 0.6.0 (2024-12-04) - API change to Inexogy
* (DutchmanNL) Bugfix: API change to Inexogy. Fixes #249
* (DutchmanNL) Migrate admin settings to JSON config. Fixes #211

### 0.5.13 (2023-10-31)
* (sbeh) Support more characters in login credentials fixes #117, #227

### 0.5.12 (2023-10-29)
* (DutchmanNL) Ignore meters not providing any data (like removed devices) fixes #84

### 0.5.11 (2023-10-27) - Bugfixes
* (DutchmanNL) Error handling improved in cases data processing fails
* (DutchmanNL) Fixes #214 #215 #200 #219 #220 #224 #229 #235 #236 #237 #238 #506 #507

### 0.5.8 (2021-08-17)
* (DutchmanNL) Minor dependency & configuration updates, stable release candidate

## License
MIT License

Copyright (c) 2025 DutchmanNL

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