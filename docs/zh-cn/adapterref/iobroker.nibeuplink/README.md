---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.nibeuplink/README.md
title: ioBroker.nibeuplink
hash: VoorQpTrmlLGbtmRSTvil1uTJ+KdYkB7d6w66wMQ9AI=
---
# IoBroker.nibeuplink

![NPM 版本](https://img.shields.io/npm/v/iobroker.nibeuplink.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/nibeuplink-stable.svg)
![下载](https://img.shields.io/npm/dm/iobroker.nibeuplink.svg)
![安装数量](https://iobroker.live/badges/nibeuplink-installed.svg)
![新PM](https://nodei.co/npm/iobroker.nibeuplink.png?downloads=true)

[![构建状态](https://github.com/sebilm/ioBroker.nibeuplink/workflows/Test%20and%20Release/badge.svg)](https://github.com/sebilm/ioBroker.nibeuplink/actions/workflows/test-and-release.yml)

## IoBroker 的 nibeuplink 适配器
此 ioBroker 适配器从 Nibe Uplink 接收来自 Nibe 热泵的数据。

## 使用这个适配器
1. 你需要一个 Nibe 热泵 - 如果你没有，再见 ;-)
2.您需要一个Nibe Uplink账号：https://www.nibeuplink.com/
3. 登录后，您有一个此表单中的 URL：https://www.nibeuplink.com/System/XXXXX/Status/Overview
4. 代替 XXXXX 有一个数字。这是您的系统 ID。我们需要这个 ID。
5. 前往Nibe Uplink Api：https://api.nibeuplink.com/Account/LogIn 并登录
6. 点击“我的应用程序”，然后点击“创建应用程序”
7. 填写：名称和描述可以是所有内容，例如ioBroker
8. 回调 URL 很重要。您可以使用 https://sebilm.github.io/ioBroker.nibeuplink/nibe.html
9.接受NIBE上行API服务协议并点击“创建应用”
10. 然后你得到一个标识符和一个秘密——我们需要它们
11.在ioBroker中安装这个适配器
12. 在适配器设置页面填写 Identifier 和 Secret。
13. 单击链接“单击此处在 NIBE 上行链路上生成验证码”。
14. 按照说明进行操作。最后你会得到你的 nibe-fetcher 代码
15. 复制此代码并将其粘贴到“Auth Code”处的适配器设置中。
16. 从 Nibe Uplink URL 填写您的系统 ID。
17. 选择您的语言。
18.点击保存并关闭

如果您（后来）在日志中收到“400 bad request”错误，您必须获得一个新的 Auth Code - 数字 13 到 15 和 18 也是如此。

## 管理/编写支持
看来您只能在以下网页上更改参数列表：

https://api.nibeuplink.com/docs/v1/Parameters（设置部分）

参数“hot_water_boost”是参数 ID 48132。

您可以读取其他值，但我认为您不能写入其他值。此处列出了其他值：

https://github.com/sebilm/ioBroker.nibeuplink/blob/master/nibe-fetcher.js#L41

## Changelog

### 1.1.0 - 2022-02-06:

- Switch to TypeSctipt
- Use axios instead of wreck

### 1.0.1 - 2021-12-31

- Fix write support #6

### 1.0.0 - 2021-12-30

- Support to manage Nibe heat pump (write support #6)
  - To manage your Nibe heat pump you must pay for it on Nibe Uplink website!
  - You need to run the new version 30 minutes and then get a new AuthCode in the settings to use it!

### 0.5.3 - 2021-11-21

- Bump dependencies

### 0.5.2 - 2021-07-04

- Change default callback URL to own GitHub Pages
- Bump dependencies

### 0.5.1 - 2021-05-14

- Store 'no current connection error' as empty string, not null
- Bump dependencies

### 0.5.0 - 2021-05-13

- Add new connection types (cloud, poll)
- Set supported node.js versions to >=12.0.0 <17
- Do not log errors immediately after installation

### 0.4.0 - 2020-12-24

- Set required js-controller to >=2.0.0
- Test for Node 8 removed
- Support for compact mode enabled
- Support for more than one unit added
  - There is a new object structure - one level more for the unit.
  - The old objects will be updated if they are found - so don't panic.
  - If you don't need the old objects, you can remove them. They will not be created again.
- Devide by 10 added to external flow temperature
- Hundreds of missing parameters were added
  - The old fallback objects are no longer supported and updated. So check your objects update time.
  - You can remove the old objects. They will not be created again.
- Fallback names for unknown parameters changed (id added at the beginning)
  - The old fallback objects are no longer supported and updated. So check your objects update time.
  - You can remove the old objects. They will not be created again.
  - If you have objects with numbers at the beginning, then these are fallback names. Please email me and I can add them.
- Store session in iobroker data directory
  - After the adapter update you always had to get a new AuthCode and set it in the adapter settings.
  - This is no longer necessary from the next version.
  - But after the update to this version (0.4.0) it is necessary once again.
- Translate object keys of serial number, version and product in english for all languages (section SYSTEM_INFO)
  - The old objects are no longer supported and updated. So check your objects update time.
- Norwegian added
- Code refactoring

### 0.3.0 - 2019-10-31

- Compact mode disabled
- Support for Node 6 removed
- Trim whitespaces from setting parameters
- Bugfix: Customs disabled

### 0.2.2 - 2019-03-24

- Internal clean-up

### 0.2.1 - 2019-03-21

- Dependencies updated
- Fix problem with nodejs 6 and the spread operator and async

### 0.2.0 - 2019-03-16

- Code change to new template
- Support for Compact mode (js-Controller 2.0 Feature) added (#1)
- Translations in settings page
- Type moved from general to climate control

### 0.1.1 - 2019-02-19

- Do not create deprecated sub path objects - only update them if present (if you have them and don't use them, you can delete them)
- info.connection added

### 0.1.0 - 2019-02-17

- Objects tree changed: New, more readable objects added

### 0.0.2 - 2019-02-17

- Language support for objects tree

### 0.0.1 - 2018-12-09

- Initial release

## License

MIT License

Copyright (c) 2022 Sebastian Häßelbarth <seb@sebmail.de>

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