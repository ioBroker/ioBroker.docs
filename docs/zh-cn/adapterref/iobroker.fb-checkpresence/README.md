---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.fb-checkpresence/README.md
title: ioBroker.fb-checkpresence
hash: hg7iuPPe4NXcmnQfrvXCrazfTU4pd774cCmOJKkuGuA=
---
![标识](../../../en/adapterref/iobroker.fb-checkpresence/admin/fb-checkpresence.png)

![GitHub 许可证](https://img.shields.io/github/license/afuerhoff/iobroker.fb-checkpresence)
![下载](https://img.shields.io/npm/dm/iobroker.fb-checkpresence.svg)
![GitHub 仓库大小](https://img.shields.io/github/repo-size/afuerhoff/iobroker.fb-checkpresence)
![GitHub提交活动](https://img.shields.io/github/commit-activity/m/afuerhoff/iobroker.fb-checkpresence)
![自最新版本发布以来的 GitHub 提交记录（按日期排序）](https://img.shields.io/github/commits-since/afuerhoff/iobroker.fb-checkpresence/latest)
![GitHub 最新提交](https://img.shields.io/github/last-commit/afuerhoff/iobroker.fb-checkpresence)
![GitHub 问题](https://img.shields.io/github/issues/afuerhoff/iobroker.fb-checkpresence)
![已知漏洞](https://snyk.io/test/github/afuerhoff/ioBroker.fb-checkpresence/badge.svg)
![NPM](https://nodei.co/npm/iobroker.fb-checkpresence.png?downloads=true)
![安装数量（最新）](https://iobroker.live/badges/fb-checkpresence-installed.svg)
![稳定版](https://iobroker.live/badges/fb-checkpresence-stable.svg)
![最新 NPM 版本](https://img.shields.io/npm/v/iobroker.fb-checkpresence.svg)

# IoBroker.fb-checkpresence
**测试：** ![测试与发布](https://github.com/afuerhoff/ioBroker.fb-checkpresence/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 fb-checkpresence 适配器
适配器会通过 Fritzbox 检测家庭成员是否在线。

您必须填写家庭成员的姓名以及所用设备的 MAC 地址（或 IP 地址）。

备注为可选，您可以启用或禁用该家庭成员。

数据点基于家庭成员姓名。

### 使用了开源代码
#### Npm dateformat v4.5.3
(c) 2007-2009 Steven Levithan <stevenlevithan.com> npm：https://www.npmjs.com/package/dateformat github：https://github.com/felixge/node-dateformat 许可证：MIT

### 适配器前置条件
要使用此功能，您需要安装历史记录适配器。您可以选择以下适配器之一：

* 历史
* SQL
* InfluxDB

## 已使用设备
此适配器使用 AVM Fritzbox。您可以在这里找到有关 Fritzbox 的信息：https://avm.de/produkte/fritzbox/。

Fritzbox 服务通过 TR-064 协议传输。

### Fritzbox 条件
Fritzbox 使用的 TR-064 接口的详细说明请参见此处：https://avm.de/service/schnittstellen/。

使用的 TR-064 服务和操作如下：

* 主机：1 - X_AVM-DE_GetHostListPath（自 2017 年 1 月 9 日起支持）
* 主机：1 - X_AVM-DE_GetMeshListPath
* Hosts:1 - 获取特定主机条目
* 主机：1 - X_AVM-DE_GetSpecificHostEntryByIP（自 2016 年 5 月 18 日起支持）
* DeviceInfo:1 - 获取安全端口
* DeviceInfo:1 - 获取信息
* WANPPP连接：1 - 获取信息
* WANIP连接：1 - 获取信息
* WLAN配置3 - 设置启用
* WLAN配置3 - 获取信息
* WLAN配置3 - 获取安全密钥
* X_AVM-DE_HostFilter - 禁止通过 IP 访问 WAN
* X_AVM-DE_HostFilter - GetWANAccessByIP
* 设备配置：1 - 重启
* LANConfigSecurity1 - X_AVM-DE_GetCurrentUser

默认情况下，TR-064 接口未激活。不过，您可以通过 FritzBox 的 Web 界面轻松更改此设置。为此，请登录您的 FritzBox 并确保已激活专家视图。

然后，您会在“家庭网络 » 家庭网络概览 » 网络设置”下方找到“允许应用程序访问”选项。选中该选项，然后重启 FritzBox 一次。

提示：更改选项后，不要忘记重启 Fritzbox！<img src="doc/access_settings_network.JPG"/>

## 配置对话框
＃＃＃ 一般的
配置值经过验证，只有正确的值才能保存。否则，保存按钮将处于禁用状态。

### Fritzbox IP 地址、用户名和密码
要从 Fritzbox 获取设备数据，需要配置 IP 地址、用户名和密码。

因此，需要在 Fritzbox 中创建一个用户。对于较新固件版本（>= 7.25）的 Fritzbox，此操作是必需的。详情请参见：https://avm.de/fileadmin/user_upload/Global/Service/Schnittstellen/Empfehlungen%20zur%20Benutzerfu%CC%88hrung%20bei%20der%20Anmeldung%20an%20einer%20FRITZ%21Box_v1.1.pdf 密码已加密，不会以明文形式保存。用户名和密码最多可包含 32 个字符。更多信息请参见：https://service.avm.de/help/de/FRITZ-Box-Fon-WLAN-7490/014/hilfe_zeichen_fuer_kennwoerter#:~:text=Namen%20f%C3%BCr%20Benutzer,Kennwortfeld%20darf%20nicht%20leer%20sein

提示：在某些情况下，如果密码输入不正确，Fritzbox 可能会阻止用户访问。

日志中通常会显示超时消息。请检查您是否输入了正确的用户名和密码。然后，您需要重启 Fritzbox。

### SSL选项
在某些情况下，适配器可能无法连接到 Fritzbox。禁用此选项或许可以解决问题。

在这种情况下，适配器会尝试在不使用 HTTPS 的情况下进行连接。

＃＃＃ 间隔
您可以为家庭成员和 Fritzbox 设备分别设置不同的时间间隔。

Fritzbox 设备的时间间隔可以配置为 10 秒到 3600 秒。通常，60 秒到 300 秒之间的间隔是读取 Fritzbox 数据的最佳间隔。家庭成员的时间间隔可以配置为 10 秒到 600 秒。每个新周期在前一个周期结束后开始。

### 过滤时间
如果过滤时间大于 0 秒，则在家庭成员状态变为 false 时，会检查该成员的状态两次（过滤时间之后）。如果状态为 true，则立即设置该状态。

### 历史记录适配器
通过历史记录适配器计算某些值。您可以选择使用历史记录适配器、SQL适配器还是InfluxDB适配器进行这些计算。历史记录适配器必须预先安装，然后才能在配置对话框中选择。

如果禁用历史记录配置，则某些值的计算将无法实现。

### 日期格式
日期格式掩码选项的详细说明请参见此网页：https://www.npmjs.com/package/dateformat。

格式掩码用于格式化 HTML 和 JSON 表格对象。

### 创建 FB 设备
如果选中此选项，则会为 Fritzbox 设备列表中的每个设备创建对象。

如果禁用此选项，则网状网络信息也会被禁用。

### 重新同步 Facebook 设备对象（一次）
如果选中此选项，则 FB 设备对象将与 Fritzbox 中的设备列表重新同步一次。

### 重新同步 Facebook 设备对象（自动）
如果选中此选项，则 FB 设备对象将每隔 x 天与 Fritzbox 的设备列表重新同步。

### 创建网格信息
如果允许创建 FB 设备，则可以选中此选项。选中此选项后，将为 Fritzbox 设备列表中的每个设备创建网状对象。

### 宾客信息
如果选中此选项，则会创建访客状态。

### 二维码生成
选中此选项后，系统将生成访客 WLAN 的二维码。您可以使用“基本布尔 SVG”小部件在可视化界面 (VIS) 中显示此二维码。请使用以下设置：<img src="doc/QRCode.png"/>

### 家庭成员设置
对于已配置的家庭成员，您需要输入成员姓名、主机名、MAC 地址和 IP 地址、备注，并启用或禁用该成员。组是可选的。

如果将组留空并将兼容性标志设置为 true，则其行为类似于旧版本的适配器。您可以使用家庭成员的在线状态，也可以使用直接映射到家庭成员姓名的状态。在未来的版本中，您必须使用在线状态。此行为可以通过兼容性复选框启用/禁用：-> 兼容性 = true：行为类似于旧版本，组为空。

-> 兼容性 = true 且组不为空：新行为。所有状态都位于 familymembers 文件夹下。

-> 兼容性 = false：新行为。所有状态都位于 familymembers 文件夹下。

对于每个成员，适配器都会创建一个在线状态，并检查该成员是在线还是离线。如果在线状态发生变化，则状态也会随之改变。

您还可以为成员启用筛选功能。如果在线状态为真，则状态会立即变为真。如果在线状态为假，则会在筛选后再次检查该值。

如果在线状态在两种情况下均为假，则状态会变为假。否则，状态保持不变。

要获取对象的速度信息，您必须选择 fb-devices 选项。

### 手动触发在线状态
在 JavaScript 中，您可以手动触发在线状态检查。当您向适配器发送消息时，所有新消息都会被阻止 10 秒。如果消息被阻止，您将收到否定结果（false）。

如果适配器接收到消息，则返回 true。

`sendTo('fb-checkpresence.0', 'triggerPresence', {} , function (result) { log(result, 'info'); });`

### 白名单设置
白名单中可以添加所有已知设备。任何未知设备都会被列入黑名单。

如果选中表格标题中的复选框，则会选中所有设备。

在 JavaScript 中，您可以向白名单发送条目。

发送的数据（主机名、MAC 地址）将与 Fritzbox 设备列表进行比较。如果条目存在于列表中，则会检查它是否已保存在白名单中。如果未保存，则将该条目保存到白名单配置表中。

sendTo('fb-checkpresence.0', 'addDeviceToWhitelist', { hostname: 'devicename', mac: '00:00:00:00:00:00' } , function (result) { log(result, 'info'); });

＃＃ 特征
### AVM 支持检查
该函数检查已使用的 Fritzbox 功能的可用性。可用性信息会记录在日志中。如果遇到问题，请检查所有功能是否都已设置为 true。此外，该函数还会检查用户的访问权限，如果访问权限不正确，则该功能会被设置为 false。

### 打开/关闭访客无线网络
在 guest 文件夹下，您可以将 wlan 状态设置为 true 或 false，然后访客 WLAN 将打开或关闭。

### 访客无线网络二维码
访客 WLAN 的二维码保存在访客文件夹下的 wlanQR 状态中。该二维码可以在 vis 的基本布尔 SVG 小部件中显示。

### 打开/关闭 Fritzbox 设备的互联网连接
在 FB-devices 文件夹下，您可以将禁用状态设置为 true 或 false，这样 Fritzbox 就会阻止此设备的互联网访问。

### 获取访客，黑名单
此函数会检查是否有用户以访客身份登录，以及是否有设备不在白名单中。

如有设备不在白名单中，则会将其添加到黑名单。

### 积极行动起来
如果选择了历史记录适配器，则会计算并保存每个家庭成员的在场情况、出入日期以及其他一些信息到成员对象中。

### 主机数量，活动设备
设备数量和活跃设备数量均来自 Fritzbox。

## 对象
### 对象存在全部
如果所有家庭成员都在场，则该命题成立。

### 物体存在
如果至少有一位家庭成员在场，则该命题成立。

### 物体设备
这些都是Fritzbox上列出的设备。

### 对象 activeDevices
这是 Fritzbox 中所有活跃设备的数量。

### 对象 html、json
这些对象是包含所有家庭成员出入信息的表格（json 和 html）。

### 对象信息
这里列出了适配器的上次更新和连接状态信息。

### 客座对象
这里列出了有关活跃客人数量和包含设备信息的餐桌对象数量的信息。

### 对象黑名单
这里列出了未知设备的数量以及包含未知设备信息的表对象数量。

### 对象成员.present
在这里，您可以找到有关成员在当天是否在线以及自上次更改以来该成员状态为真的时长的信息。

### 对象成员缺失
在这里，您可以找到有关当天成员缺席的信息，以及自上次更改以来该成员状态为“false”的时长。

### 对象成员的到来、离开
您可以在这里找到家庭成员到达或离开家的信息。

### 对象 member.history、member.historyHtml
在这里，您将找到有关当今历史的信息。

## Changelog
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now
* (afuerhoff) dependencies updated
* (afuerhoff) dependabot.yml fixed [#358](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/358)
* (afuerhoff) new fb-devices sync option integrated
* (afuerhoff) readme updated
* (softwarecrash) PR398 fixes a crash in newfilter mode

### 1.4.2 (2025-10-30)
* (afuerhoff) dependencies updated
* (afuerhoff) package.json issues fixed [#350](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/350)
* (afuerhoff) npm security changes
* (afuerhoff) filter time extended to 300s
* (afuerhoff) guest wlan bug fixed [#353](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/353)
* (afuerhoff) deprecated functions changed

### 1.4.1 (2025-09-19)
* (afuerhoff) dependencies updated
* (afuerhoff) repository checker & code scanning issues fixed

### 1.4.0 (2025-05-28)
* (afuerhoff) dependencies updated
* (afuerhoff) error handling optimized
* (afuerhoff) enhancement  [#336](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/336)
* (afuerhoff) issue [#337](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/337)
* (afuerhoff) issue [#335](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/335)

### 1.3.1 (2025-03-02)
* (afuerhoff) dependencies updated
* (afuerhoff) bug fixed [#333](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/333)
* (afuerhoff) bug fixed [#305](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/305)

### 1.3.0 (2025-02-14)
* (afuerhoff) dependencies updated
* (afuerhoff) eslint setup changed
* (afuerhoff) ipv6 ip-address and prefix added

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2019-2026 Achim Fürhoff <achim.fuerhoff@outlook.de>

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