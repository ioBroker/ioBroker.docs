---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.google-sharedlocations2/README.md
title: ioBroker.google-sharedlocations2
hash: DTkZ92AZjg2X5mWJoJQzvZyBBenXVOdUKxa/c9+Qqi8=
---
![标识](../../../en/adapterref/iobroker.google-sharedlocations2/admin/google-sharedlocations2.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.google-sharedlocations2.svg)
![下载](https://img.shields.io/npm/dm/iobroker.google-sharedlocations2.svg)
![安装数量](https://iobroker.live/badges/google-sharedlocations2-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/google-sharedlocations2-stable.svg)
![NPM](https://nodei.co/npm/iobroker.google-sharedlocations2.png?downloads=true)

# IoBroker.google-sharedlocations2
**测试：** ![测试与发布](https://github.com/Garfonso/ioBroker.google-sharedlocations2/workflows/Test%20and%20Release/badge.svg)

## 适用于 ioBroker 的 google-sharedlocations2 适配器
通过 Google 地图与 ioBroker 分享您的位置。您需要为此创建一个单独的 Google 帐户，即用于 ioBroker 安装的帐户。请勿使用您的个人帐户。

＃＃＃ 配置
在配置界面，您可以输入为 ioBroker 创建的 Google 帐户凭据，适配器将自动完成所有操作。**切勿**输入您的**个人**帐户数据。

然后，通过您的移动设备（和帐户）将您的位置信息共享给此 iobroker-google-account。适配器将读取共享的位置信息，并在 ioBroker 中为每个通过 Google 帐户共享位置信息的人创建状态。

您可以配置轮询间隔。但为了避免被谷歌屏蔽，系统会忽略低于 1 分钟的值。

如果您不想输入用户名和密码，这是可以的，请阅读[以下](#use-a-cookie)。

### 使用 Cookie
有时登录会出现问题。由于适配器只是打开浏览器并尝试登录（但它基本上是“盲操作”，依赖于已有的信息），因此可能会失败，对此我无能为力。有时您可能会收到新登录的警告。有时您需要使用双重验证重新登录。如果您遇到此类问题，请从真实浏览器中复制一个有效的 google.com Cookie 到状态 `google-sharedlocations2.0.info.currentCookies` 中。

您甚至可以在配置中将用户名和密码留空，然后适配器将尝试尽可能保持 cookie 正常工作（类似于我对旧版 google-sharedlocations-Adapter 的分支），而无需尝试登录（但时不时地使用浏览器加载整个页面似乎有助于保持登录状态）。

此适配器与谷歌没有任何关联。使用此适配器可能违反谷歌的服务条款。请自行承担风险。

Google 的版权和商标归 Google 所有。

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.4.0 (2026-07-03)
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.
* (Garfonso) minor fixes and improvements.
* (Garfonso/Claude) added self heal if wrong chrome version is installed (e.g. after update of puppeteer).

### 0.3.6 (2026-04-25)
* (Garfonso) somehow the old improve cookie call does not work anymore (since switch to fetch). Don't see why. -> So we just run the browser once a day.
* (Garfonso) Login with browser no tries to clear cookies in browser, if normal login does not work.

### 0.3.5 (2026-04-22)
* (Garfonso) resize logo.

### 0.3.4 (2026-04-22)
* (Garfonso) replaced axios dependency. Tried to make login more robust.

### 0.3.3 (2026-02-17)
* (Garfonso) if deleting cookies, also delete cookies in Browser to force login with username & password.

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2026 Garfonso <garfonso@mobo.info>

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