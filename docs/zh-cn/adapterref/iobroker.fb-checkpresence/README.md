---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.fb-checkpresence/README.md
title: ioBroker.fb-checkpresence
hash: jMiJjfk5hvvWoF25noxAKL/RGnHjS+4UWLO49qZgXDU=
---
![标识](../../../en/adapterref/iobroker.fb-checkpresence/admin/fb-checkpresence.png)

![GitHub 许可证](https://img.shields.io/github/license/afuerhoff/iobroker.fb-checkpresence)
![下载](https://img.shields.io/npm/dm/iobroker.fb-checkpresence.svg)
![GitHub 仓库大小](https://img.shields.io/github/repo-size/afuerhoff/iobroker.fb-checkpresence)
![GitHub 提交活动](https://img.shields.io/github/commit-activity/m/afuerhoff/iobroker.fb-checkpresence)
![GitHub 自最新版本以来的提交情况（按日期）](https://img.shields.io/github/commits-since/afuerhoff/iobroker.fb-checkpresence/latest)
![GitHub 上次提交](https://img.shields.io/github/last-commit/afuerhoff/iobroker.fb-checkpresence)
![GitHub 问题](https://img.shields.io/github/issues/afuerhoff/iobroker.fb-checkpresence)
![已知漏洞](https://snyk.io/test/github/afuerhoff/ioBroker.fb-checkpresence/badge.svg)
![新平台](https://nodei.co/npm/iobroker.fb-checkpresence.png?downloads=true)
![安装数量（最新）](https://iobroker.live/badges/fb-checkpresence-installed.svg)
![稳定版本](https://iobroker.live/badges/fb-checkpresence-stable.svg)
![最新 NPM 版本](https://img.shields.io/npm/v/iobroker.fb-checkpresence.svg)

# IoBroker.fb-检查存在性
**测试：**![测试与发布](https://github.com/afuerhoff/ioBroker.fb-checkpresence/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 fb-checkpresence 适配器
适配器通过 fritzbox 检查家庭成员的存在情况。
您必须填写家庭成员的姓名和所用设备的 mac 地址（或 ip 地址）。
注释是可选的，您可以启用或禁用家庭成员。
数据点基于成员名称。

### 使用开源代码
#### Npm dateformat v4.5.3
（c）2007-2009 Steven Levithan <stevenlevithan.com> npm：https://www.npmjs.com/package/dateformat github：https://github.com/felixge/node-dateformat 许可证：MIT

### 适配器先决条件
为了正确使用此功能，您必须安装历史适配器。您可以选择以下适配器之一：

* 历史
* SQL
* 流入数据库

## 使用的设备
此适配器使用 AVM Fritzbox。您可以在此处找到有关 Fritzbox 的信息 https://avm.de/produkte/fritzbox/。
fritzbox 服务通过 TR-064 协议使用。

### Fritzbox 条件
fritzbox 使用的 TR-064 接口在此处描述：https://avm.de/service/schnittstellen/。
使用以下 TR-064 服务和操作：

* 主机：1 - X_AVM-DE_GetHostListPath（自 2017-01-09 起支持）
* 主机：1 - X_AVM-DE_GetMeshListPath
* 主机：1 - GetSpecificHostEntry
* 主机：1 - X_AVM-DE_GetSpecificHostEntryByIP（自 2016-05-18 起支持）
* 设备信息：1-获取安全端口
* 设备信息:1 - 获取信息
* WANPPP连接:1 - GetInfo
* WANIPConnection:1 - GetInfo
* WLAN配置3-设置启用
* WLAN配置3-获取信息
* WLAN配置3-获取安全密钥
* X_AVM-DE_HostFilter - 禁止 WANAccessByIP
* X_AVM-DE_HostFilter - 获取 WAN 访问 IP
* 设备配置：1-重启
* LANConfigSecurity1-X_AVM-DE_GetCurrentUser

默认情况下，TR-064 接口未激活。但是，可以通过 FritzBox Web 界面轻松更改。为此，请登录 FritzBox 并确保专家视图已激活。
然后，您将在“家庭网络»家庭网络概览»网络设置”下找到“允许应用程序访问”点。您必须在那里激活复选框，然后重新启动 FritzBox 一次。

提示：更改选项后，不要忘记重新启动 Fritzbox！<img src="doc/access_settings_network.JPG"/>

## 配置对话框
＃＃＃ 一般的
配置值经过验证，只有正确的值才能保存。否则保存按钮将被禁用。

### Fritzbox IP 地址、用户和密码
需要配置 ip 地址、用户和密码才能从 fritzbox 获取设备数据。
因此，必须在 fritzbox 中创建用户。这是 fritzbox 较新固件版本 (>= 7.25) 所必需的。有关信息，请参阅此处：https://avm.de/fileadmin/user_upload/Global/Service/Schnittstellen/Empfehlungen%20zur%20Benutzerfu%CC%88hrung%20bei%20der%20Anmeldung%20an%20einer%20FRITZ%21Box_v1.1.pdf 密码已加密，未以明文形式保存。用户名和密码最多可包含 32 个字符。请参阅以下信息：https://service.avm.de/help/de/FRITZ-Box-Fon-WLAN-7490/014/hilfe_zeichen_fuer_kennwoerter#:~:text=Namen%20f%C3%BCr%20Benutzer,Kennwortfeld%20darf%20nicht%20leer%20sein。
提示：在某些情况下，如果密码输入不正确，fritzbox 可能会阻止用户。
日志中通常会显示超时消息。请检查您是否输入了正确的用户名和密码。然后您必须重新启动 fritzbox。

### Ssl 选项
在某些情况下，适配器无法连接到 fritzbox。禁用此选项可能会有所帮助。
在这种情况下，适配器会尝试不使用 https 进行连接。

＃＃＃ 间隔
家庭成员和 Fritzbox 设备有单独的间隔。
Fritzbox 设备的间隔可以配置为 10 秒到 3600 秒。通常，60 到 300 秒之间的值是读取 fritzbox 数据的最佳间隔。家庭成员可以配置为 10 秒到 600 秒。如果上一个周期完成，则每个新周期都会开始。

### 过滤时间
如果过滤时间大于 0 秒，则检查家庭成员的状态两次（过滤时间之后），看状态是否变为假。如果状态为真，则立即设置状态。

### 历史适配器
通过历史适配器计算一些值。您可以选择使用历史、sql 或 influxdb 适配器进行此计算。必须先安装历史适配器，然后可以在配置对话框中选择。
如果禁用历史配置，则无法实现某些值的计算。

＃＃＃ 日期格式
日期格式掩码选项在此网页上描述：https://www.npmjs.com/package/dateformat。
格式掩码用于格式化 html 和 json 表对象。

### 创建 FB 设备
如果选中此选项，则会创建 Fritzbox 设备列表中的每个设备的对象。
如果禁用此选项，则网格信息也会被禁用。

### 重新同步 FB 设备对象
如果选中此选项，则 FB 设备对象将与 Fritzbox 的设备列表重新同步。

### 创建网格信息
如果允许创建 FB 设备，则可以选中此选项。如果选中此选项，则会创建 Fritzbox 设备列表中的每个设备的网格对象。

### 客人信息
如果选中此选项，则会创建客人的状态。

### 二维码生成
如果选中此选项，则会生成来自访客 wlan 的二维码。您可以使用小部件“Basic Boolesches SVG”在您的 VIS 中显示此二维码。请使用以下设置：<img src="doc/QRCode.png"/>

### 家庭成员设置
对于已配置的家庭成员，您应输入成员名称、主机名、mac 地址和 ip 地址、注释，并且可以启用或禁用该成员。组是可选的。
如果您将组留空并将兼容性标志设置为 true，则行为类似于旧版本的适配器。您可以使用来自家庭成员的存在状态或直接映射到家庭成员名称的状态。在未来版本中，您必须使用存在状态。可以使用兼容性复选框打开/关闭此行为：-> 兼容性 = true：行为与具有空组的旧版本相同。
-> 兼容性 = true 且组不为空：新行为。家庭成员文件夹下的所有状态。
-> 兼容性 = false：新行为。家庭成员文件夹下的所有状态。

对于每个成员，适配器都会创建一个存在状态并检查该成员是否存在。如果存在状态发生变化，则状态也会发生变化。
您还可以为成员启用过滤。如果状态为真，则状态会立即更改为真。如果为假，则过滤时间后将再次检查该值。
如果两种情况下的状态均为假，则状态更改为假。否则不会改变。

要获取对象中的速度信息，您必须选择 fb-devices 选项。

### 手动触发存在
在 javascript 中，您可以手动触发状态。当您将消息发送到适配器时，每条新消息都会被阻止 10 秒。如果消息被阻止，您将收到否定结果 (false)。
如果从适配器收到消息，则为 True。
` sendTo('fb-checkpresence.0', 'triggerPresence', {} , function (result) { log(result, 'info'); });`

### 白名单设置
在白名单中，您可以插入每个已知设备。任何未知设备都列在黑名单对象中。
如果您选中表格标题中的复选框，则所有设备都将被选中。

＃＃ 特征
### AVM 支持检查
该函数检查已使用的 fritzbox 功能的可用性。可用性记录为信息。如果您遇到问题，请查看所有功能是否都设置为 true。此外，还会检查用户的访问权限，如果访问权限不正确，则将功能设置为 false。

### 打开/关闭访客 wlan
在文件夹 guest 下，您可以将状态 wlan 设置为 true 或 false，然后打开或关闭访客 wlan。

### 访客无线局域网的二维码
访客 wlan 的二维码保存在访客文件夹中的状态 wlanQR 中。二维码可以在 basic - Bool SVG 小部件的 vis 中显示。

### 打开/关闭 Fritzbox 设备的互联网访问
在 FB-devices 文件夹下，您可以将禁用状态设置为 true 或 false，并且该设备的互联网访问在 Fritzbox 中被阻止。

### 获取客人、黑名单
在此函数中，将检查是否有任何用户以访客身份登录。还会检查是否有任何设备不在白名单中。
这些设备将被添加到黑名单中。

### 积极行动起来
如果选择了历史记录适配器，则会计算每个家庭成员的存在情况、来去日期和其他一些信息，并将其保存在成员对象中。

### 主机数，活跃设备数
设备的数量和活跃设备数可以从 fritzbox 中获取。

## 对象
### 对象存在全部
如果所有家庭成员都在场则该对象为真。

### 物体存在
如果有一个家庭成员在场，那么该对象就是真实的。

### 对象设备
这些都是 fritzbox 中列出的设备

### 对象 activeDevices
这些是 fritzbox 中所有活跃设备的数量

### 对象 html、json
这些对象是表格（json 和 html），其中包含所有家庭成员的来去信息。

### 对象信息
这里列出了有关适配器的最新更新和连接状态的信息。

### 对象访客
这里列出了活跃客人数量和桌面对象以及设备信息。

### 对象黑名单
这里列出了未知设备的数量以及包含未知设备信息的表对象的信息。

### 对象成员.present
在这里您可以找到有关成员当天的出席情况以及自上次更改以来该成员状态保持多长时间的信息。

### 对象成员.缺失
在这里您可以找到有关当天成员缺席的信息，以及自上次更改以来该成员状态为 false 的时间。

### 对象成员.comming，成员.going
您可以在这里找到家庭成员到达或离开家时的信息。

### 对象成员.history，成员.historyHtml
您将在这里找到有关当天历史的信息。

## Changelog
### **WORK IN PROGRESS**
* (afuerhoff) new filter function implemented
* (afuerhoff) node >=18
* (afuerhoff) dependencies updated

### 1.2.4 (2024-02-09)
* (afuerhoff) test code deleted [#257](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/257)
* (afuerhoff) dependencies updated

### 1.2.3 (2024-01-18)
* (afuerhoff) Readme updated
* (afuerhoff) function jsontables optimized
* (afuerhoff) non existent members set to false [#253](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/253)
* (afuerhoff) optimization of log message [#240](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/240)

### 1.2.2 (2023-07-28)
* (afuerhoff) bug fixed json tables [#215](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/215)
* (afuerhoff) link feature optimized. See #206

### 1.2.1 (2023-07-14)
* (afuerhoff) bug fixed property link

### 1.2.0 (2023-07-13)
* (afuerhoff) dependencies updated
* (afuerhoff) mesh link added to family members [#206](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/206)

## License
MIT License

Copyright (c) 2019-2024 Achim Fürhoff <achim.fuerhoff@outlook.de>

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