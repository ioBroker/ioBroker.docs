---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.cloudless-homeconnect.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.cloudless-homeconnect.svg
BADGE-Number of Installations: https://iobroker.live/badges/cloudless-homeconnect-installed.svg
BADGE-GitHub: https://img.shields.io/github/license/eifel-tech/iobroker.cloudless-homeconnect?style=flat-square
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/eifel-tech/iobroker.cloudless-homeconnect?logo=github&style=flat-square
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/eifel-tech/iobroker.cloudless-homeconnect?logo=github&style=flat-square
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/eifel-tech/iobroker.cloudless-homeconnect?logo=github&style=flat-square
BADGE-GitHub issues: https://img.shields.io/github/issues/eifel-tech/iobroker.cloudless-homeconnect?logo=github&style=flat-square
BADGE-GitHub Workflow Status: https://img.shields.io/github/actions/workflow/status/eifel-tech/iobroker.cloudless-homeconnect/test-and-release.yml?branch=master&logo=github&style=flat-square
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.cloudless-homeconnect/README.md
title: ioBroker.cloudless-homeconnect
hash: gTEKnhfULkMsk/QaAj1SYVnLstOinSeDmSlxwLZ0lDg=
---
![标识](../../../de/admin/cloudless-homeconnect-880x800.png)

# IoBroker.cloudless-homeconnect
不具备云通信功能的 Homeconnect 设备适配器

## 没有云访问的 Homeconnect 适配器
该适配器不需要 Homeconnect 的 API（https://api-docs.home-connect.com/），该 API 需要设备连接到互联网。在此适配器中，一旦创建配置，设备的通信和控制就在本地进行。因此，这些设备在 Homeconnect 应用程序中注册后，就可以永久断开与互联网的连接。为了加载正确的配置，需要互联网连接。

该适配器的基本思想来自https://github.com/osresearch/hcpy。那里的 Python 代码被移植到 Javascript 并适用于 ioBroker。

## 安装前的先决条件
至少必须安装 Node.js **版本 18**。

对于适配器，与使用官方 API 相比<ins>不</ins>需要ClientID，仅Homeconnect应用程序中使用的用户名和密码。设备必须通过 Homeconnect 应用程序注册一次。

必须在本地网络中的设备上启用端口 443。

加载配置后，可能会出现无法寻址设备的情况。那么本地网络中没有该设备域的 DNS 条目。除了在网络中进行此项设置之外，还可以简单地在`host` 的数据点`info.config` 中输入设备的本地 IP。

第一步
通常情况下，根据[当适配器启动时，从 Homeconnect 服务器检索已注册设备的适配器配置](#configuration) 配置文件。某些服务器的登录流程已发生改变，因此不再自动下载配置文件，需要手动下载。为此，外部工具**[Homeconnect 配置文件下载器](https://github.com/bruestel/homeconnect-profile-downloader/tags)** 是建议的。

因此，如果无法自动检索，ioBroker 日志中将出现 **警告**，**_如果没有出现任何警告且适配器正常启动，则无需采取进一步行动，可以忽略后续步骤！_**

```
warn: Login not successful. Please put the zip from homeconnect-profile-downloader as described in docs manually into path <<Pfad zum Ablageort heruntergeladener Geräteprofile>> and restart adapter. See https://github.com/bruestel/homeconnect-profile-downloader also.
```

如果发出警告，则必须在本地安装 **Homeconnect 配置文件下载器**。为此，请点击链接，下载适用于您的操作系统的最新版本并[安装](https://github.com/bruestel/homeconnect-profile-downloader?tab=readme-ov-file#run-it)：![Homeconnect 配置文件下载器的版本](../../../de/adapterref/profile_git.png)

然后启动已安装的应用程序并在开始页上选择区域：![Homeconnect 配置文件下载器主页](../../../de/adapterref/profile_start.png)

点击`FETCH APPLIANCE PROFILE DATA`，您将被重定向到 Homeconnect 登录页面，您必须使用 Homeconnect 应用程序中的访问数据登录：![登录 Homeconnect](../../../de/adapterref/profile_login.png)

如果成功，将显示通过 Homeconnect 应用程序注册的每个设备的 zip 文件概览。现在必须下载 zip 文件并将其**不加改变**地移动到 ioBroker 日志中警告中显示的文件夹。

然后必须重新启动适配器。现在根据这些文件创建适配器的配置。

＃＃ 配置
必须在适配器配置中输入 Homeconnect 应用程序用户名和密码。

解析后的配置存储在数据点`info.config`中。这不应该改变。如果在网络中添加或移除设备，则必须通过 Homeconnect 应用程序进行注册，并删除上述数据点的内容。然后适配器重新启动，连接到配置的帐户并重新加载配置。此后，与设备的通信将再次纯粹是本地的。

如果随着时间的推移出现连接错误，则会尝试与设备建立新的连接。默认情况下会发生 15 次，但可以为实例进行配置。如果尝试永不中止，即如果应该一次又一次地尝试建立连接，则必须设置`0`。

数据点
这里描述了最重要的数据点。该名称包含相应设备知道并使用的 UID。如果某个值发生了改变，而这对于当时的设备来说是难以置信的，则会以调试模式写入日志条目。例如，即使当前没有处于活动状态的程序，如果 `AbortProgram` 发生更改，也会发生这种情况。例如，其结构如下：

```
<cloudless-homeconnect.0>
|
└── info
│       └── config
│
└── <Geräte-ID>
│       └── Command
│       |       └── AbortProgram
│       |       └── PauseProgram
│       |       └── ...
│       └── Event
│       |       └── ProgramFinished
│       |       └── CavityTemperatureTooHigh
│       |       └── ...
│       └── Option
│       |       └── ElapsedProgramTime
│       |       └── ProgramProgress
│       |       └── ...
│       └── Program
│       |       └── KeepWarm
|       |       |       └── Start
|       |       |       └── Duration
|       |       |       └── ...
│       |       └── Hot_Air
|       |       |       └── Start
|       |       |       └── Duration
|       |       |       └── ...
│       |       └── ...
│       └── Setting
│       |       └── ChildLock
│       |       └── PowerState
│       |       └── ...
│       └── Status
│       |       └── BackendConnected
│       |       └── CurrentTemperature
│       |       └── ...
|       └── ActiveProgram
|       └── SelectedProgram
|       └── sendOptionsSeperately
```

### 信息.连接
如果无法与**至少**一个设备建立连接，即发生套接字错误，则该数据点变为`false`。这也会导致适配器在实例概览中变成黄色。将自动尝试重新连接设备 15 次，最长等待时间为 5 分钟。然后必须手动重新启动适配器才能重新建立连接。但是，可以在实例设置中更改新连接的数量（参见[配置](#configuration)) 为什么无法连接设备以及哪个设备包含在日志中的警告条目中。这里您必须“手动”查看如何解决问题。数据点仅针对适配器监控的设备设置（参见[观察](#observe)）。

###信息.配置
此处配置保存为 JSON。如果需要再次读取（例如因为添加了新设备），则必须删除内容并重新启动适配器（如有必要）。

### `ActiveProgram` 和 `SelectedProgram`
数据点包含当前正在运行的程序的 UID 作为值。 `ActiveProgram` 是 `readonly`。

＃＃＃ 观察
使用数据点`observe`，当更改为`false`时，设备可以被排除在适配器监控之外。例如，在发生错误时，可以进行设置，使得适配器只考虑一个设备，而不考虑其他设备“干扰”。

### 单独发送选项
通常，要启动一个程序，必要的选项会作为一个整体发送到设备。然而，有些设备希望这些选项单独传输而不是作为一个块传输。

> [!NOTE] > > 如果启动程序没有按预期进行或者调试日志包含类似`resource":"/ro/activeProgram","version":1,"action":"RESPONSE","code":400}`的内容，则可以在尝试再次启动程序之前将此数据点更改为`true`。

＃＃＃ 命令
在`Command`下，收集角色`button`的数据点，设备可使用这些数据点进行远程控制。只有当命令合理时，才会期待对方做出反应：只有当程序也处于活动状态时，才会执行`AbortProgram`。

＃＃＃ 事件
如果发生某个事件，例如“某个程序完成”，则会触发文件夹`Event` 中的相应数据点。

＃＃＃ 选项
在选项下，您将找到影响程序的只读数据点。可写选项位于文件夹`Program`下。由于一次只能激活一个程序，因此可读选项始终引用当前正在运行的程序。

＃＃＃ 程序
可以通过数据点`Start`启动相应的程序。此外，还读出并传输程序支持的设置选项。因此，在点击`Start`之前设置选项非常重要。当程序运行时，它会显示在`ActiveProgram`中。

如果启动一个程序时另一个程序已经处于活动状态，则适配器将首先终止活动程序。

＃＃＃ 环境
可以在这里进行设备的常规设置。例如，设置`Light_Cavity_001_Power`可用于打开或关闭烤箱的灯。 `Status` 下的数据点`InteriorIlluminationActive` 是只读的，仅显示照明的状态。

＃＃＃ 地位
`Status` 包含设备状态概述。这些是只读的。

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

### 1.6.0 (2025-02-27)

- (eifel-tech) Datapoint to send program options seperately (Issue #208)

> [!CAUTION]
>
> See [english](./docs/en/README.md#sendoptionsseperately) or [german docu](./docs/de/README.md#sendoptionsseperately)

### 1.5.0 (2025-02-24)

- (eifel-tech) Admin-Version >= 7.4.10
- (eifel-tech) Handling to start program for dishwasher S255HVX15E (Issue #201)

### 1.4.3 (2025-02-18)

- (eifel-tech) Handling to start program for dishwasher SN53ES02CE (Issue #194)

### 1.4.2 (2025-02-13)

- (eifel-tech) Error message after sending to /ro/selectedProgram on hood devices (Issue #193)

### 1.4.1 (2025-01-16)

- (eifel-tech) Creating instance directory if absent

### 1.4.0 (2025-01-15)

- (eifel-tech) Dependency updates
- (eifel-tech) Changed login process for getting device information by homeconnect (Issue #170)

### 1.3.0 (2024-12-02)

- (eifel-tech) Dependency updates
- (eifel-tech) common.min is only set if it is also present in the config (Issue #149)
- (eifel-tech) Password in admin will be stored encrypted natively

> [!CAUTION]
>
> You have to reenter your password in admin config!

### 1.2.10 (2024-11-20)

- (eifel-tech) Handle missing enums during parsing (Issue #148)

### 1.2.9 (2024-11-14)

- (eifel-tech) Bugfix while reading program options (Issue #143)

### 1.2.8 (2024-11-05)

- (eifel-tech) Prevent forbidden signs
- (eifel-tech) More resolutions considered in instance settings
- (eifel-tech) Number of connection attempts configurable (Issue #135)

### 1.2.7 (2024-10-24)

- (eifel-tech) Notes from adapter checker

### 1.2.6 (2024-10-24)

- (eifel-tech) Added translations

### 1.2.5 (2024-10-23)

- (eifel-tech) Instance remains yellow when first started (Issue #129)

### 1.2.4 (2024-10-23)

- (eifel-tech) Prevent message `undefined` from being sent

### 1.2.3

- (eifel-tech) Added datapoint to indicate whether a socket connection exists

### 1.2.2

- (eifel-tech) Using a persistent websocket connection

### 1.2.1

- (eifel-tech) Abort the connection if errors occur in the socket connection to the device

### 1.2.0

- (eifel-tech) Ability to exclude individual devices from control (Issue #117)

> [!CAUTION]
>
> The configuration had to be expanded for this, so the contents of the `info.config` data point have to be deleted and the adapter has to be restarted. Also delete the `General` object tree.

### 1.1.2

- (eifel-tech) Washing machine: Program options are sent separately and not including the program to be started

### 1.1.1

- (eifel-tech) Parsing the configuration simplified

### 1.1.0

- (eifel-tech) Parsing of configuration for multiple devices revised

### 1.0.4

- (eifel-tech) Dishwasher support

### 1.0.3

- (eifel-tech) New socket connection after timeout

### 1.0.2

- (eifel-tech) If a new program is started, any program that may be running will first be terminated

### 1.0.1

- (eifel-tech) Increasing security with TLS

### 1.0.0

- (eifel-tech) initial release

## License

MIT License

Copyright (c) 2025 eifel-tech <hikaso@gmx.net>

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