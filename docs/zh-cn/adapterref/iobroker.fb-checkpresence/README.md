---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.fb-checkpresence/README.md
title: ioBroker.fb-检查状态
hash: OdugxapAS9iewTmrgIl680zXsFjafz4WonR+ow1+Uag=
---
![标识](../../../en/adapterref/iobroker.fb-checkpresence/admin/fb-checkpresence.png)

![GitHub 许可证](https://img.shields.io/github/license/afuerhoff/iobroker.fb-checkpresence)
![下载](https://img.shields.io/npm/dm/iobroker.fb-checkpresence.svg)
![GitHub 存储库大小](https://img.shields.io/github/repo-size/afuerhoff/iobroker.fb-checkpresence)
![GitHub 提交活动](https://img.shields.io/github/commit-activity/m/afuerhoff/iobroker.fb-checkpresence)
![GitHub 自最新版本以来提交的内容（按日期）](https://img.shields.io/github/commits-since/afuerhoff/iobroker.fb-checkpresence/latest)
![GitHub 最后一次提交](https://img.shields.io/github/last-commit/afuerhoff/iobroker.fb-checkpresence)
![GitHub 问题](https://img.shields.io/github/issues/afuerhoff/iobroker.fb-checkpresence)
![已知漏洞](https://snyk.io/test/github/afuerhoff/ioBroker.fb-checkpresence/badge.svg)
![国家公共管理](https://nodei.co/npm/iobroker.fb-checkpresence.png?downloads=true)
![安装数量（最新）](https://iobroker.live/badges/fb-checkpresence-installed.svg)
![稳定版](https://iobroker.live/badges/fb-checkpresence-stable.svg)
![最新NPM版本](https://img.shields.io/npm/v/iobroker.fb-checkpresence.svg)

# IoBroker.fb-检查存在
**测试：** ![测试与发布](https://github.com/afuerhoff/ioBroker.fb-checkpresence/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 fb-checkpresence 适配器
适配器通过 fritzbox 检查家庭成员是否存在。
您必须填写家庭成员的姓名和所用设备的 MAC 地址（或 IP 地址）。
该评论是可选的，您可以启用或禁用家庭成员。
数据点基于成员名称。

### 使用开源代码
#### Npm 日期格式 v4.5.3
(c) 2007-2009 Steven Levithan <stevenlevithan.com> npm：https://www.npmjs.com/package/dateformat github：https://github.com/felixge/node-dateformat 许可证：MIT

### 适配器先决条件
为了获得正确的功能，您必须安装历史适配器。您可以选择以下适配器之一：

* 历史
* SQL
* 流入数据库

## 使用的设备
该适配器使用 AVM Fritzbox。在这里您可以找到有关 Fritzbox 的信息 https://avm.de/produkte/fritzbox/。
fritzbox 服务通过 TR-064 协议使用。

### Fritzbox 条件
fritzbox 使用的 TR-064 接口如下所述：https://avm.de/service/schnittstellen/。
使用以下 TR-064 服务和操作：

* 主机：1 - X_AVM-DE_GetHostListPath（自 2017-01-09 起支持）
* 主机：1 - X_AVM-DE_GetMeshListPath
* 主机：1 - GetSpecificHostEntry
* 主机：1 - X_AVM-DE_GetSpecificHostEntryByIP（自 2016 年 5 月 18 日起支持）
* 设备信息：1 - 获取安全端口
* 设备信息：1 - 获取信息
* WANPPP 连接：1 - GetInfo
* WANIP 连接：1 - GetInfo
* WLAN 配置 3 - 设置启用
* WLAN配置3 - 获取信息
* WLANConfiguration3 - 获取安全密钥
* X_AVM-DE_HostFilter - 禁止通过 IP 进行 WAN 访问
* X_AVM-DE_HostFilter - GetWANAccessByIP
* 设备配置：1 - 重新启动
* LANConfigSecurity1 - X_AVM-DE_GetCurrentUser

缺省情况下，TR-064 接口未激活。然而，这可以通过 FritzBox Web 界面轻松更改。为此，请登录 FritzBox 并确保激活专家视图。
然后您将在“家庭网络»家庭网络概述»网络设置”下方找到“允许应用程序访问”点。您必须激活该复选框，然后重新启动 FritzBox 一次。

提示：更改选项后，不要忘记重新启动Fritzbox！<img src="doc/access_settings_network.JPG"/>

## 配置对话框
＃＃＃ 一般的
配置值经过验证，并且只能保存正确的值。否则保存按钮将被禁用。

### Fritzbox IP 地址、用户名和密码
要从 fritzbox 获取设备数据，需要配置 IP 地址、用户和密码。
因此，必须在 fritzbox 中创建一个用户。这是 fritzbox 较新固件版本 (>= 7.25) 所必需的。请参阅此处的信息：https://avm.de/fileadmin/user_upload/Global/Service/Schnittstellen/Empfehlungen%20zur%20Benutzerfu%CC%88hrung%20bei%20der%20Anmeldung%20an%20einer%20FRITZ%21Box_v1.1.pdf密码已加密且未以明文形式保存。用户名和密码最多可包含 32 个字符。信息请参阅：https://service.avm.de/help/de/FRITZ-Box-Fon-WLAN-7490/014/hilfe_zeichen_fuer_kennwoerter#:~:text=Namen%20f%C3%BCr%20Benutzer,Kennwortfeld%20darf %20nicht%20leer%20sein。
提示：在某些情况下，如果密码插入不正确，fritzbox 可能会阻止用户。
日志中通常会出现超时消息。请检查您是否插入了正确的用户名和密码。然后您必须重新启动 fritzbox。

### SSL 选项
在某些情况下，适配器无法连接到 fritzbox。禁用此选项可能会有所帮助。
在这种情况下，适配器会尝试在不使用 https 的情况下进行连接。

＃＃＃ 间隔
您可以为家庭成员和 Fritzbox 设备设置单独的时间间隔。
Fritzbox 设备的间隔可以配置为 10 秒到 3600 秒。通常，读取 fritzbox 数据的最佳间隔是 60 到 300 秒之间的值。家庭成员可配置为 10 到 600 人。如果前一个周期完成，则每个新周期都会开始。

### 过滤时间
如果过滤时间大于 0 秒，如果状态更改为 false，则家庭成员的状态将被检查两次（在过滤时间之后）。如果状态为真，则立即设置状态。

### 历史适配器
通过历史适配器计算一些值。您可以选择是否使用历史记录、sql 或 influxdb 适配器来进行此计算。历史适配器必须预先安装，然后可以在配置对话框中选择。
如果禁用历史配置，则无法实现某些值的计算。

＃＃＃ 日期格式
此网页上描述了日期格式掩码选项：https://www.npmjs.com/package/dateformat。
格式掩码用于格式化 html 和 json 表对象。

### 创建FB设备
如果选中此选项，则会创建 Fritzbox 设备列表中每个设备的对象。
如果禁用此选项，则网格信息也会被禁用。

### FB 设备对象的重新同步
如果选中此选项，则 FB 设备对象将与 Fritzbox 中的设备列表重新同步。

### 创建网格信息
如果允许创建 FB 设备，可以勾选此选项。如果选中此选项，则会为 Fritzbox 设备列表中的每个设备创建网格对象。

### 宾客信息
如果选中此选项，则会创建客人的状态。

### 二维码生成
如果选中此选项，则会生成来自访客 wlan 的二维码。

### 家庭成员设置
对于已配置的家庭成员，您应该输入成员名称、主机名、mac 和 ip 地址、注释，然后您可以启用或禁用该成员。组是可选的。
如果将组留空并将兼容性标志设置为 true，则行为就像旧版本的适配器。您可以使用家庭成员的在线状态或直接映射到家庭成员姓名的状态。在未来的版本中，您必须使用存在状态。可以使用兼容性复选框打开/关闭此行为： -> 兼容性 = true：行为与具有空组的旧版本相同。
-> 兼容性 = true 且组不为空：新行为。家庭成员文件夹下的所有状态。
-> 兼容性= false：新行为。家庭成员文件夹下的所有状态。

对于每个成员，适配器都会创建一个存在状态并检查该成员是否存在。如果存在状态改变，则状态也改变。
您还可以启用成员过滤。如果状态为 true，则状态立即更改为 true。如果为 false，则将在过滤时间后再次检查该值。
如果两种情况下状态均为 false，则状态更改为 false。否则它不会改变。

要获取对象中的速度信息，您必须选择 fb-devices 选项。

### 手动触发存在
在 javascript 中，您可以手动触发存在。当您将消息发送到适配器时，每条新消息都会被阻止 10 秒。如果消息被阻止，您会收到否定结果 (false)。
如果从适配器接收到消息，则为 True。
` sendTo('fb-checkpresence.0', 'triggerPresence', {} , function (result) { log(result, 'info'); }); `

### 白名单设置
在白名单中，您可以插入每个已知设备。任何未知设备都会列在黑名单对象中。
如果选中表格标题中的复选框，则会选择所有设备。

＃＃ 特征
### AVM 支持检查
该函数检查所使用的 fritzbox 功能的可用性。可用性被记录为信息。如果遇到问题，请查看这些功能是否全部设置为 true。此外，还会检查用户的访问权限，如果访问权限不正确，则该功能将设置为 false。

### 打开/关闭访客 WLAN
在 guest 文件夹下，您可以将 wlan 状态设置为 true 或 false，然后打开或关闭 guest wlan。

###访客WLAN二维码
访客wlan的二维码保存在访客文件夹中的状态wlanQR中。二维码可以在基本的 Bool SVG 小部件中显示在 vis 中。

### 打开/关闭 Fritzbox 设备的互联网访问
在 FB-devices 文件夹下，您可以将禁用状态设置为 true 或 false，并在 Fritzbox 中阻止该设备的互联网访问。

###获取客人，列入黑名单
在此函数中，检查是否有任何用户以访客身份登录。还会检查是否有任何设备不在列出的白名单中。
该设备已添加至黑名单。

### 活跃起来
如果选择了历史适配器，则对于每个家庭成员的存在、来去日期以及其他一些信息都会被计算并保存在成员对象中。

### 主机数量，活动设备
从 fritzbox 获取设备数量和活动数量。

## 对象
### 对象存在全部
如果所有家庭成员都在场，则该对象为真。

### 对象存在
如果一名家庭成员在场，则该对象为真。

### 对象设备
这些都是 fritzbox 中列出的设备

### 对象活动设备
这些是 fritzbox 中所有活动设备的数量

### 对象 html、json
这些对象是表格（json 和 html），其中包含所有家庭成员的出入信息。

### 对象信息
以下列出了有关适配器的上次更新和连接状态的信息。

### 客体对象
以下列出了有关活动访客数量和表对象（其中包含设备信息）的信息。

### 对象黑名单
以下列出了有关未知设备数量以及其中包含未知设备信息的表对象的信息。

### 对象成员.present
在这里，您可以找到有关会员当天的存在情况以及自上次更改以来该会员状态保持多久的信息。

### 对象成员.absent
在这里，您可以找到有关会员当天缺席的信息，以及自上次更改以来会员状态为 false 的时间有多长。

### 对象member.comming、member.going
您可以在此处找到家庭成员到达或离开家时的信息。

### 对象member.history、member.historyHtml
在这里您可以找到有关当前历史的信息。

## Changelog
### **WORK IN PROGRESS**
* (afuerhoff) Readme updated
* (afuerhoff) function jsontables optimized

### 1.2.2 (2023-07-28)
* (afuerhoff) bug fixed json tables [#215](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/215)
* (afuerhoff) link feature optimized. See #206

### 1.2.1 (2023-07-14)
* (afuerhoff) bug fixed property link

### 1.2.0 (2023-07-13)
* (afuerhoff) dependencies updated
* (afuerhoff) mesh link added to family members [#206](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/206)

### 1.1.26 (2023-04-06)
* (afuerhoff) Wrong default settings in io-package.json [#188](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/188)
* (afuerhoff) Wrong Axios parameter in getMeshList [#197](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/197)
* (afuerhoff) dependencies updated

### 1.1.25 (2023-01-21)
* (afuerhoff) Warning message empty hostname optimized. Issue [#180](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/180)

## License
MIT License

Copyright (c) 2019-2023 Achim Fürhoff <achim.fuerhoff@outlook.de>

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