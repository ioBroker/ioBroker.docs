---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.nibeuplink/README.md
title: ioBroker.nibeuplink
hash: bFO4J2oEmtx4GO7FlT9xZuyTC9CdV29rY+k1Hy8OIqQ=
---
# IoBroker.nibeuplink

![NPM 版本](https://img.shields.io/npm/v/iobroker.nibeuplink.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/nibeuplink-stable.svg)
![下载](https://img.shields.io/npm/dm/iobroker.nibeuplink.svg)
![安装数量](https://iobroker.live/badges/nibeuplink-installed.svg)
![新平台](https://nodei.co/npm/iobroker.nibeuplink.png?downloads=true)

[![构建状态]（https://github.com/sebilm/ioBroker.nibeuplink/workflows/Test%20and%20Release/badge.svg）](https://github.com/sebilm/ioBroker.nibeuplink/actions/workflows/test-and-release.yml)

## Nibeuplink 适配器用于 ioBroker
**nibeuplink API 已正式停用！因此，此 ioBroker 适配器将不再进一步开发！请使用 myUplink 适配器！**

此 ioBroker 适配器从 Nibe Uplink 的 Nibe 热泵接收数据。
此适配器不适用于 Nibe myUplink！因此，它不适用于 S 系列热泵，例如 Nibe VVM S320。

## 使用此适配器
1. 您需要一个 Nibe 热泵 - 如果没有，请购买一个 ;-)
2. 您需要在 Nibe Uplink 拥有一个账户：https://www.nibeuplink.com/
3. 登录后，您将获得以下形式的 URL：https://www.nibeuplink.com/System/XXXXX/Status/Overview
4. XXXXX 后面有一个数字。这是您的系统 ID。我们需要这个 ID。
5. 前往 Nibe Uplink Api：https://api.nibeuplink.com/Account/LogIn 并登录
6. 点击“我的应用程序”，然后点击“创建应用程序”
7. 填写：名称和描述可以是任意内容，例如 ioBroker
8.回调URL很重要。您可以使用https://sebilm.github.io/ioBroker.nibeuplink/nibe.html
9.接受NIBE Uplink API服务协议，点击“创建应用”
10.然后你会得到一个标识符和一个秘密——我们需要它们
11. 在 ioBroker 中安装此适配器
12. 在适配器设置页面填写标识符和密钥。
13. 点击链接“单击此处在 NIBE Uplink 上生成授权码”。
14. 按照说明操作。最后您将获得 nibe-fetcher 代码
15. 复制此代码并将其粘贴到适配器设置的“Auth Code”中。
16. 从 Nibe Uplink URL 中填写您的系统 ID。
17. 选择您的语言。
18.单击保存并关闭

如果您（稍后）在日志中收到“400 错误请求”错误，则必须获取新的 Auth Code - 数字 13 至 15 和 18 也是如此。

## 管理/编写支持
似乎您只能更改以下网页上列出的参数：

https://api.nibeuplink.com/docs/v1/Parameters（设置部分）

参数“hot_water_boost”是参数 ID 48132。

您可以读取其他值，但我认为您不能写入其他值。其他值列在这里：

https://github.com/sebilm/ioBroker.nibeuplink/blob/master/nibe-fetcher.js#L41

## Changelog
### 1.3.2 (2024-11-10)
- The nibeuplink API has been officially discontinued! For this reason, this ioBroker adapter will not be developed any further! Please use the myUplink adapter!
- Dependencies have been updated

### 1.3.1 (2023-12-23)
- Bump dependencies

### 1.3.0 (2023-08-27)
- Remove NodeJS 14 support
- Support strings as parameters in the management #241
- Bump dependencies

### 1.2.2 (2023-04-07)
- Bump dependencies

### 1.2.1 (2022-10-03)
- Fix getting data directory

### 1.2.0 (2022-10-02)
- Requires js-controller >= 3.3.22 and admin >= 5.0.0
- Update some files from up-to-date adapter creator
- Bump dependencies

### 1.1.1 - 2022-04-02
- Fix write support (does not send zero) #6 #128
- Bump dependencies

### 1.1.0 - 2022-02-06

- Switch to TypeScript
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

Copyright (c) 2024 Sebastian Häßelbarth <seb@sebmail.de>

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