---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.roadtraffic/README.md
title: ioBroker.roadtraffic
hash: YmnxW7ZtzsG+u0IO1fpwJZaBmGWFwiFcPvcI1jn7j5Q=
---
![标识](../../../en/adapterref/iobroker.roadtraffic/admin/roadtraffic.png)

![GitHub 许可证](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.roadtraffic)
![下载](https://img.shields.io/npm/dm/iobroker.roadtraffic.svg)
![GitHub 存储库大小](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.roadtraffic)
![GitHub 提交活动](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.roadtraffic)
![GitHub 自最新版本以来提交的内容（按日期）](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.roadtraffic/latest)
![GitHub 最后一次提交](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.roadtraffic)
![GitHub 问题](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.roadtraffic)
![NPM版本](http://img.shields.io/npm/v/iobroker.roadtraffic.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/roadtraffic-stable.svg)
![安装数量](https://iobroker.live/badges/roadtraffic-installed.svg)

# IoBroker.roadtraffic
[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/roadtraffic/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)</br> </br> **版本：** </br> </br> **测试：** </br> [![测试和发布](https://github.com/iobroker-community-adapters/ioBroker.roadtraffic/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.roadtraffic/actions/workflows/test-and-release.yml) [![CodeQL](https://github.com/iobroker-community-adapters/ioBroker.roadtraffic/actions/workflows/codeql.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.roadtraffic/actions/workflows/codeql.yml)

<!--

## Sentry **此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!从 js-controller 3.0 开始使用 Sentry 报告。
-->
## 关于此适配器
该适配器使用 HERE.com API 来检查您路线上的流量。您可以配置多条路线，适配器会检查实际交通情况并显示您的旅程需要多长时间。
适配器有一个闹钟 - 因此您可以告诉适配器您必须在什么时间工作 - 适配器开始播放广播并在 Alexa 上发布公告（需要 Alexa2 适配器） - 或者您可以使用自己的脚本来做出反应关于适配器的警报..

＃＃ 入门
那么让我们开始吧：

1. 转至 https://developer.here.com/sign-up?create=Freemium-Basic&keepState=true&step=account 并创建一个 HERE.com 免费开发者帐户 (Freemium)。

![这里1](../../../en/adapterref/iobroker.roadtraffic/img/Here1.png)

2. 确保选择免费增值并填写左侧的表格..（名字、姓氏、电子邮件......）

![这里2](../../../en/adapterref/iobroker.roadtraffic/img/Here2.png)

3. 单击“注册此处帐户...”，不要忘记勾选复选框（同意服务条款等...）。

![这里3](../../../en/adapterref/iobroker.roadtraffic/img/Here3.png)

4. 再一次 - 同意条款和条件并单击“开始编码”按钮。

![这里4](../../../en/adapterref/iobroker.roadtraffic/img/Here4.png)

5. 在下一页，您已进入 HERE.com 仪表板。查找 REST 部分并单击“生成应用程序”。

![这里5](../../../en/adapterref/iobroker.roadtraffic/img/Here5.png)

6. 单击“创建 API 密钥” - 您将获得一个 API 密钥。. 在 ioBroker 中打开道路交通适配器的实例设置，并将 API 密钥粘贴到配置字段中。

![这里6](../../../en/adapterref/iobroker.roadtraffic/img/Here6.png)

7. 单击“实例设置”中的加号图标并创建您的第一个路线。

在配置对话框中输入所有信息后，单击“保存并关闭”。
适配器现在应该重新启动，您就可以开始了！

## 闹钟
在实例设置中，您可以通过选中“启用闹钟功能”来启用闹钟。
您应该安装 Alexa2 适配器并在 Alexa2 实例设置中设置为使用推送连接。
选择您想要由适配器控制的 Alexa 设备，然后输入您想要在触发闹钟时播放的 TuneIn StationID。
警报音量的范围是 0-100。
使用 Speak 字符串，您可以控制 Alexa 的公告。
默认为：Guten Morgen %name。 Bei aktueller Verkehrslage benötigst du %dur zur Arbeit。

Alexa 开始播放指定的 TuneIn Station 15 秒后，将宣布该字符串。
例如，如果您有一条名为“Daniel”的路线，并且警报触发，Alexa 会说：Guten Morgen Daniel。 Bei aktueller Verkehrslage benötigst du 29 Minuten zur Arbeit。

如果您只想让适配器开始播放 TuneIn Station 并且不收到任何通知，请将 Speak 字符串留空。

每条路线有 7 个报警通道（周一至周日）。
在每个频道中，您有以下状态：

* 到达时间：输入您想要到达目的地的时间（例如：07:30 是早上七点半）。
* 洗澡时间：输入您想要添加到旅行持续时间中的时间。 （示例：45 是 45 分钟。假设您将到达时间设置为 10:00，沐浴时间设置为 30 分钟，当前旅行持续时间为 1 小时。那么适配器将在 08:30（到达时间 - 沐浴时间 - 旅行持续时间）触发。
* 启用：如果您想启用当天的闹钟，则设置为 true
*已触发：当警报被触发时，适配器将将此状态设置为true。 （例如，您可以将其与自己的脚本一起使用......）触发状态将在相应日期的 00:00 重置为 false。 （周六触发将在周六 00:00 设置为 false）。

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.0.2 (2023-10-27)
* (mcm1957) Error logging has been corrected.

### 1.0.1 (2023-10-26)
* (mcm1957) Issues reported by ioBroker adapter checker and lint have been fixed.

### 1.0.0 (2023-10-26)
* (mcm1957) This adapter has been moved into iobroker-community-organization.
* (mcm1957) Adapter requires nodejs 18.x or newer now.
* (mcm1957) Dependencies have been updated.

### 0.2.0 (2019-12-21)
* (BuZZy1337) Alarm-Clock implemented. (See Readme "Alarm-Clock" section for details)

### 0.1.1 (2019-12-13)
* (BuZZy1337) HERE.com changed the Authentication.
* (BuZZy1337) Prepare for Alarm.. (NOT WORKING YET!!! - But needed to push this version because of authentication changes)

### 0.1.0 (2019-12-08)
* (BuZZy1337) Using HERE.com instead of Google API (READ THE UPDATED README!!)

### 0.0.2 (2019-02-27)
* (BuZZy1337) Release to latest repository

### 0.0.1
* (BuZZy1337) initial release

## License
The MIT License (MIT)

Copyright (c) 2023 iobroker-community-adapters <mcm57@gmx.at>
Copyright (c) 2019 BuZZy1337 <buzzy1337@outlook.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.