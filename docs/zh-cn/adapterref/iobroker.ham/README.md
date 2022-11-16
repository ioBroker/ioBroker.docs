---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.ham/README.md
title: ioBroker Homebridge 配件经理
hash: YWFx1PvhxXq7iwHc0gKP5lLvYFgwg1b+x09oPZ8cidA=
---
![标识](../../../en/adapterref/iobroker.ham/admin/ham.png)

![安装数量](http://iobroker.live/badges/ham-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.ham.svg)
![下载](https://img.shields.io/npm/dm/iobroker.ham.svg)

# IoBroker Homebridge 配件经理
![测试和发布](https://github.com/ioBroker/iobroker.ham/workflows/Test%20and%20Release/badge.svg)[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/ham/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

在 ioBroker 中使用 Homebridge 插件或运行全局安装的 Homebridge 作为 ioBroker 适配器。
来自 Homebridge 的所有州也将在 ioBroker 中可用，也可以在那里进行控制。

＃＃ 描述
此适配器提供三种不同的模式：

### 默认（包装）模式
在默认模式下，适配器允许您直接使用 homebridge 插件模块。
您可以通过[搜索关键字“homebridge-plugin”](https://www.npmjs.com/search?q=homebridge-plugin)浏览 NPM 网站上的所有可用插件。

您只需将模块列表添加到适配器配置并在 JSON 编辑器中提供配置（请参阅插件描述）。
在此之后，所有 Homebridge 对象也将在 ioBroker 中创建，并且所有可写对象也可以更改。

**重要提示：此模式允许使用提供的 homebridge 插件的设备集成。没有提供 Home App 可以使用的“桥梁”！**

可以在此处找到成功尝试的带有示例的插件的链接：https://forum.iobroker.net/viewtopic.php?f=20&t=15021

### 本地家庭桥模式
如果您希望 Home 应用程序使用已发布的网桥，并且还想从 ioBroker 与之交互并获取数据，但尚未安装 homebridge，请使用此模式。

本地模式安装当前兼容版本的 homebridge 并以 ioBroker 用户身份运行。您使用 ioBroker 提供完整的 homebridge 配置。
homebridge 模块的安装也是通过 ioBroker 完成的。

**重要提示：使用子网桥（自 1.3.x 以来的新 homebridge 功能）时，适配器无法访问这些子网桥提供的数据！只有主桥可以进入！**

### 全球家庭桥模式
如果您已经在运行 ioBroker 的主机上使用 Homebridge (Apple OpenSource SmartHome) 作为全局安装，那么您可以使用这个现有的 Homebridge 安装并将这个 Homebridge 安装作为 ioBroker 进程启动。 **在这种情况下，Homebridge 服务器由 ioBroker 启动。**

**重要提示：您需要确保系统等未启动全局服务。 ioBroker 本身将开始！有关最佳实践设置详细信息，请参见下文。**

**重要提示：因为 ioBroker 启动 Homebridge，所以日志记录也是由 ioBroker 完成的。您可以将实例的 loglevel 设置为 silly 以查看所有 Homebridge 日志，否则它将被过滤掉重要的东西。**

此外，来自 Homebridge 的所有状态都可以作为 ioBroker 中的状态使用，并允许从 ioBroker 进行控制。

为此，您需要提供系统全局节点模块文件夹的位置。对于这个调用 **npm root -g**。此外，您需要提供 homebridge 配置目录的路径（通常是“users”文件夹中的 .homebridge）。

**重要提示：ioBroker 以用户“iobroker”身份运行，但 homebridge 通常以 root 或 homebridge 用户身份运行（取决于您的安装方式）。您需要确保 ioBroker 用户可以访问 homebride “persistance”文件夹，否则您将看到无法保存文件的错误（这可能会导致适配器崩溃！）**

**重要提示：使用子网桥（自 1.3.x 以来的新 homebridge 功能）时，适配器无法访问这些子网桥提供的数据！只有主桥可以进入！**

#### 安装为 Global Bridge 详细信息
感谢@Anzic23，这里有一些关于如何为全局模式理想地设置 homebridge 的详细信息：

1.`sudo npm install -g --unsafe-perm homebridge homebridge-config-ui-x`
2.安装hb-service (sudo hb-service install --user homebridge) 这一步是需要创建必要的文件和目录
3.卸载hb-service（sudo hb-service卸载）
4.安装homebridge后

```
sudo chmod 777 -R /var/lib/homebridge/
sudo chmod 777 -R /usr/lib/node_modules/homebridge
```

在 iobroker 全局 Homebridge 路径：/usr/lib/node_modules/homebridge

全局 Homebridge 配置目录路径：/var/lib/homebridge

## 以下插件在默认模式下进行了测试
* homebridge-chamberlain v1.0.1 - 带有 MyQ 的张伯伦车库开门器插件
* homebridge-doorbird v0.0.4 - Doorbird 插件
* homebridge-dyson-link v2.2.2 - Dyson Link 设备
* homebridge-edomoticz v2.1.11 - 一个成熟的 Domoticz 插件
* homebridge-Fibaro-HC2 v2.1.5 - Fibaro HomeCenter 集成
* homebridge-homee v0.2.4 - 一个成熟的、最新的 Homee 插件
* homebridge-ikea-tradfri-gateway v1.0.26 - Tradfri
* homebridge-noolite v0.0.29 - Noolite 通过 USB MTRF-64 或 МТRF-64 模块
* homebridge-platform-wemo v1.0.1 - Belkin WeMo 平台插件
* homebridge-seasons v1.0.1 - 显示当前季节的插件。
* homebridge-vera v0.8.2 - VeraLink 是 Vera 的 Z-Wave 配件应用程序（Node.js 8.11.3）

... 还有很多

＃＃ 去做
* 测试
* 更多文档？！
* 测试并确定 ESM 模块是否可以在哪种模式下工作（我希望没有）

<!-- 下一个版本的占位符（在行首）：

### **正在进行中** -->

## Changelog

### __WORK IN PROGRESS__
* (Apollon77) Optimize value determination on accessory initialization

### 5.3.1 (2022-09-28)
* (bluefox) Updated GUI packages

### 5.3.0 (2022-09-15)
* (Apollon77) Add option to enable homebridge debug logging

### 5.2.4 (2022-09-15)
* (Apollon77) Prevent crash when accessing a state which is not controllable anymore

### 5.2.3 (2022-09-14)
* (Apollon77) Optimize Accessory processing

### 5.2.2 (2022-09-14)
* (Apollon77) make compatible to more plugins

### 5.2.1 (2022-09-12)
* (Apollon77) make compatible to more plugins

### 5.1.0 (2022-08-17)
* IMPORTANT update homebridge and wrapper to 1.5.0 (latest as of today). IMPORTANT: Requires also homebridge 1.5.x installed when using global mode and local mode will update to 1.5.x too! Check your plugins for updates!

### 5.0.2 (2022-07-20)
* (bluefox) Update tab GUI

### 5.0.1 (2022-06-28)
* (Apollon77) Make sure values are set after objects were created

### 5.0.0 (2022-06-27)
* IMPORTANT update homebridge and wrapper to 1.4.1 (latest as of today). IMPORTANT: Requires also homebridge 1.4.x installed when using global mode and local mode will update to 1.4.x too! Check your plugins for updates!
* (Apollon77) Sync forbidden characters with ioBroker standard - Object IDs might change with this version!
* (Apollon77) Basically allow to specify http URLS as plugins in the main configuration list (not the tab!)
* (Apollon77) Also try to register on external accessories like cameras (experimental)
* (Apollon77) Fix loading issues with the tab

### 4.0.4 (2022-06-07)
* (bluefox) Corrected configuration in dark theme

### 4.0.3 (2022-03-20)
* (bluefox) Update packages

### 4.0.2 (2021-05-08)
* (Apollon77) prevent warnings in js-controller 3.3

### 4.0.1 (2021-03-24)
* (Apollon77) update homebridge and wrapper to 1.3.4 (latest as of today). IMPORTANT: Requires also homebridge 1.3.x installed when using global mode and local mode will update to 1.3.x too! Check your plugins for updates!
* (UncleSamSwiss) Add an experimental version of new plugin selection and configuration tab - TRY IT OUT!
* (Apollon77) IMPORTANT: Configurations in local/global mode with child bridges will NOT work because ioBroker can not access the data on the child bridge processes!

### 3.0.2 (2020-11-29)
* (Apollon77) update homebridge in wrapper to 1.1.6 (latest as of today)

### 3.0.1 (2020-08-08)
* (Apollon77) set a very high limit (again) on allowed accessories and services because irrelevant

### 3.0.0 (2020-08-04)
* (Apollon77) BREAKING: ONLY WORKS WITH HOMEBRIDGE 1.1.x+ AND Node JS >=10.17.0!! Make sure plugins support it AND homebridge is updated to 1.1.x when you use the Global Mode!

### 1.1.2 (2019-07-08)
* (Apollon77) Allow more than 149 accessories in wrapper mode

### 1.1.1 (2019-07-05)
* (Apollon77) Add option to update NPM modules in Admin. Reinstall will happen after saving settings
* (Apollon77) Enhance NPM installation handling
* (Apollon77) Allow to specify special version of homebridge NPM packages using name@version
* (Apollon77) Allow to specify homebridge command line options. They will be added to the command line arguments (Some plugins need that or special features are only available with it)
* (Apollon77) Add "Local" mode that installs an own homebridge and run it as bridge

### 1.0.1 (2019-01-16)
* (SchumyHao) Add Chinese support

### 1.0.0 (WIP)
* (Apollon77) add polling interval to global mode
* (Apollon77) add option to use insecure flag in wrapper mode

### 0.4.5 (2018.08.21)
* (Apollon77) issues fixed

### 0.4.4 (2018.08.07)
* (Apollon77) corrected automatic role determination and bugs fixed

### 0.4.2 (2018.06.25)
* (Apollon77) Fix for global mode

### 0.4.1 (2018.06.21)
* (Apollon77) option to poll values from the plugins added and other optimizations

### 0.3.1 (2018.06.20)
* (kirovilya) Fixed a bug in global mode that values were not reported back to iOS devices

### 0.3.0 (2018.06.20)
* (bluefox) Support of ham plugins was added

### 0.2.6 (2018.06.19)
* (Apollon77) Updates for Homebridge-Wrapper

### 0.2.5 (2018.06.18)
* (Apollon77) Catch all console logs from Homebridge and make available as debug log

### 0.2.4 (2018.06.18)
* (Apollon77) Updates for Homebridge-Wrapper

### 0.2.3 (2018.06.17)
* (Apollon77) Updates for Homebridge-Wrapper

### 0.2.2 (2018.06.17)
* (Bluefox) Fixes for JSON editor in Firefox and Chrome

### 0.2.0/0.2.1 (2018.06.17)
* (Apollon77) Public test version with both modes
* (Bluefox) Admin3

### 0.1.0 (2018.06.09)
* (Apollon77) Update for working mode 1

### 0.0.1 (2018.03.24)
* (kirovilya) initial commit

## License
The MIT License (MIT)

Copyright (c) 2018-2022 Apollon77 <ingo@fischer-ka.de>

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