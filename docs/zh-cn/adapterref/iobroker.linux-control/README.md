---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.linux-control/README.md
title: ioBroker.linux-control
hash: 4OAFdJPUvwnqs54swKDBI/2TA0hF6FiD0QjY3+lPw6I=
---
![标识](../../../en/adapterref/iobroker.linux-control/admin/linux-control.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.linux-control.svg)
![下载](https://img.shields.io/npm/dm/iobroker.linux-control.svg)
![安装数量（最新）](http://iobroker.live/badges/linux-control-installed.svg)
![安装数量（稳定版）](http://iobroker.live/badges/linux-control-stable.svg)
![依赖状态](https://img.shields.io/david/Scrounger/iobroker.linux-control.svg)
![已知漏洞](https://snyk.io/test/github/Scrounger/ioBroker.linux-control/badge.svg)
![NPM](https://nodei.co/npm/iobroker.linux-control.png?downloads=true)
![特拉维斯-CI](http://img.shields.io/travis/Scrounger/ioBroker.linux-control/master.svg)

# IoBroker.linux-control
## IoBroker 的 Linux 控制适配器
[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=VWAXSTS634G88&source=url)

控制 Linux 设备并获取系统信息

**此适配器使用 Sentry 库自动向开发者报告异常和代码错误。** 更多详情以及如何禁用错误报告，请参阅 [Sentry插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！Sentry 报告功能从 js-controller 3.0 开始使用。

＃＃ 配置
＃＃＃ 一般的
![一般的](../../../en/adapterref/iobroker.linux-control/docs/en/img/general.png)

|设置|描述|
|-------|-----------|
|启用|启用或禁用主机更新|
|数据点 ID|所有数据点将存储在此 ID 下|
|IP|您的Linux设备的IP地址|
|端口|Linux 设备的 SSH 端口|
|轮询间隔|轮询间隔（分钟）。<br>要取消轮询，您可以使用“0”或将其留空。 |
|user|ssh 用户登录|
|密码/口令|SSH登录密码，或使用RSA密钥时的口令|
| 使用 sudo |
|旧版 SSH|为旧设备/交换机启用旧版/已弃用的 SSH 密钥交换和加密算法（例如，`diffie-hellman-group1-sha1`、`3des-cbc`、`ssh-rsa`）|
|rsa密钥|您的rsa密钥的路径和文件名。必须具有访问权限！|
|超时|连接超时|

### 数据点
![数据点](../../../en/adapterref/iobroker.linux-control/docs/en/img/datapoints.gif)

该适配器会创建预定义的数据点，其中包含信息并可用于控制 Linux 设备。您可以在此处选择这些数据点。

此外，对于每个主机，您可以通过拖放操作将单个数据点或整个通道添加到黑名单中，从而阻止为该主机创建这些数据点或通道。

注意：如果您想将整个频道添加到黑名单，必须将频道节点拖放到黑名单中。只有这样，整个频道才会被忽略——请参见下面的屏幕截图：

![数据点](../../../en/adapterref/iobroker.linux-control/docs/en/img/all_to_blacklist.gif)

**由于 Linux 发行版众多，此功能仅在 Debian 10 和 Ubuntu 18/20 LTS 上测试过！**

### 服务
![服务](../../../en/adapterref/iobroker.linux-control/docs/en/img/services.png)

如果启用了数据点下的服务检索，您可以在此处为每个主机定义仅应检索哪些服务的信息。

**由于 Linux 发行版众多，此功能仅在 Debian 10 和 Ubuntu 18/20 LTS 上测试过！**

### 文件夹
![文件夹](../../../en/adapterref/iobroker.linux-control/docs/en/img/folders.png)

在这里，您可以获取有关文件夹大小、这些文件夹中包含的文件数量以及此文件夹中上次更改的时间戳的信息。

**由于 Linux 发行版众多，此功能仅在 Debian 10 和 Ubuntu 18/20 LTS 上测试过！**

|设置|描述|
|-------|-----------|
|启用|启用或禁用文件夹更新|
|主机|应该使用的主机|
|数据点 ID|所有数据点将存储在此 ID 下|
|路径|文件夹路径|
|文件名模式|用于识别文件名的模式。|
|单位|尺寸单位|
| 小数位数|小数位数|
|文件计数|创建文件计数数据点|
|上次更改|为该文件夹中上次更改的时间戳创建数据点|

### 我的命令
![自定义命令](../../../en/adapterref/iobroker.linux-control/docs/en/img/myCommands.png)

在这里，您可以定义非常个性化的命令，并将其写入您自定义的数据点。

务必确保检索到的数据以正确的类型传输！因此，必须相应地配置数据类型。

|设置|描述|
|-------|-----------|
|启用|启用或禁用命令更新|
|主机|应该使用的主机|
|数据点 ID|存储数据点的 ID|
|轮询间隔|仅针对该命令设置不同的轮询间隔（以秒为单位）。要禁用此功能，请使用`0`，或将此字段留空，则使用主机提供的轮询间隔。 |
|命令|应该使用的命令<br><br>如果您使用的用户需要 `sudo`，则必须在您自己的命令中添加 `sudo -S`！ |
|命令|应该使用的命令<br><br>如果你使用的用户需要 `sudo` 权限，那么你必须在自己的命令中添加 `sudo -S`！ |
|数据点类型|
|单位|数据点的单位|

## 已知问题
如果无法连接到您的 Linux 客户端，请检查客户端上是否正确安装了 `iputils-ping`。

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->

### **WORK IN PROGRESS**
* (meistermopper) add optional legacy SSH algorithms support for older devices (closes #90)
* (meistermopper) add Biome linter, `npm run test:local` workflow and align with harvia-fenix quality standard
* (meistermopper) fix invalid common.states type for `command.host` object
* (meistermopper) update dependencies, adminUI configuration and repochecker compliance

### 1.1.6 (2022-09-06)
* (Scrounger) global interval for update informations added
* (Scrounger) fix invalid object host

### 1.1.6 (2026-07-23)
* (meistermopper) Improved timer resource cleanup on unload using adapter-core safe timeouts
* (meistermopper) Enforced state ack handling filter in onStateChange
* (meistermopper) Added legacy SSH key exchange and cipher algorithm support

### 1.1.5 (2022-05-03)
* (Scrounger) Dependencies updated

### 1.1.4 (2021-12-18)
* (Scrounger) always create my command datapoint

### 1.1.3 (2021-10-04)
* (Scrounger) show warn message if permission denied
* (xCruziX) preformance improvment

### 1.1.2 (2021-01-08)
* (Scrounger) show error if user is not in sudoers file
* (Scrounger) bug fix if response has no result optimized
* (Scrounger) myCommands: bug fix sudo is no longer mandatory

Older changelogs can be found in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License
MIT License

Copyright (c) 2020-2026 Scrounger <scrounger@gmx.net>

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