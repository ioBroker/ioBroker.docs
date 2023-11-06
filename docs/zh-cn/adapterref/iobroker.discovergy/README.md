---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.discovergy/README.md
title: ioBroker.discovergy
hash: 1Nr1cgwlVRa80FxerZJGSIxk11/GXMQFME3TV9m0Z0U=
---
![替代文本](https://raw.githubusercontent.com/DrozmotiX/ioBroker.discovergy/master/admin/Discovergy_logo.png)

![替代文本](https://travis-ci.org/DrozmotiX/ioBroker.discovergy.svg?branch=master)
![安装数量](http://iobroker.live/badges/discovergy-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.discovergy.svg)
![下载](https://img.shields.io/npm/dm/iobroker.discovergy.svg)

# IoBroker.discovergy
这是一款适用于 Discovery Power 测量仪的 ioBroker 适配器。
它使用 Discovergy API 读取仪表数据并将其当前值同步到 ioBroker。

https://api.discovergy.com/docs/

请随时添加您想要的功能或您看到的问题的问题，以便我可以查看！

备注：我没有所有可能的设备，而且演示帐户也没有提供设备可以提供的所有现有值。
如果您收到以下错误：

从 Discovery 收到的信息尚未属于此适配器”“将此信息发送给开发人员：xxxxx

请转到您的日志文件并下载它，并使用提供的值在 github 上创建一个问题。
不要从管理网络界面复制粘贴，这里缺少我需要的信息！

您可以使用 discoverygy 的演示凭证（或您自己的:-)）来测试此适配器： username = demo@discovergy.com pass = demo

＃＃ 支持我
如果您喜欢我的工作，请随时提供个人捐赠（这是 DutchmanNL 的个人捐赠链接，与 ioBroker 项目无关！） [![捐赠](https://raw.githubusercontent.com/DrozmotiX/ioBroker.wled/master/admin/button.png)](http://paypal.me/DutchmanNL)

## 贡献者
* 铝卡尔佐内
*佐尔纳特

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->

### __WORK IN PROGRESS__
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

### 0.5.7 (2021-03-19)
* (DutchmanNL) Change why of password encryption, you my need to re-enter your credentials !
* (DutchmanNL) Bugfix : State "system.this.discovergy.0.alive" has no existing object, this might lead to an error in future versions

## License
MIT License

Copyright (c) 2023 DutchmanNL

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