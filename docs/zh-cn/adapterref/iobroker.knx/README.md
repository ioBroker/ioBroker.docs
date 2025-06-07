---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.knx/README.md
title: ioBroker.knx
hash: psMXPXYoWBisaqJRGhSeYCBctm1G2h7R+P/So598MDI=
---
![标识](../../../en/adapterref/iobroker.knx/admin/knx.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.knx.svg)
![下载](https://img.shields.io/npm/dm/iobroker.knx.svg)
![新公共管理](https://nodei.co/npm/iobroker.knx.png?downloads=true)

# IoBroker.knx
#### 目录
* [描述](#description)
* [要求](#requirements)
* [功能](#features)
* [安装](#installation)
* [适配器配置](#adapter-configuration)
* [安装许可证](#install-the-license)
* [配置接口](#configuration-interface)
* [对象](#objects)
* [用法](#usage)
* [数据点类型 (DPT)](#data-point-types-dpt)
* [导入的工作原理](#how-the-import-works)
* [避免问题](#avoidance-of-problems)
* [GA 工具](#ga-tool)
* [将非 KNX 状态直接链接到 KNX 状态，反之亦然](#direct-link-non-knx-state-to-knx-vice-verse)
* [计划的功能](#planned-features)
* [变更日志](#changelog)

＃＃ 描述
此适配器允许从 ETS 导入 `knxproj` 文件。它生成 KNX 组地址和 ioBroker 之间的转换，并将设备放入房间（尤其适用于 MobileUI）。

ru：[Установка и базовая настройка адаптера](docs/ru/README.md)

它连接到标准 KNX/LAN 网关。

**注意：升级至 KNX-Adapter 2.x 版本后，许可证已更改。您可以从 [https://iobroker.net](https://iobroker.net/) 获取新的许可证**

**您还应该将 iobroker js-controller 和 admin 更新到最新版本。**

开始之前：您的 ETS 项目中应设置 com.Objects 的每个 DPT。每个设备都应按设施结构进行分类。

＃＃ 要求
* 节点版本 >= 14.15.4
* 管理员版本 >= 5.2.0
* js-controller 版本 >=3.3.20

如果没有此要求，适配器将无法安装或无法正常工作。

＃＃ 特征
* 导入 `knxproj` 文件
* 生成类似 ETS 的对象结构
* 寻找并结合行为通道和状态通道（启发式）
* 开始时更新所有状态
* 无需云或互联网
* 向 KNX 总线发出读取操作，同时在状态对象上进行写入
* 使用 GA-Tools 编辑和修改 GA 对象
* 使用 GA-Tools 编辑和修改状态-行为关系
* 新功能：允许非 KNX 状态直接链接（反之亦然）
* 新功能：适配器对 GroupValueRead 的响应与 directLink 连接的对象
* 新功能：导入受密码保护的项目文件（感谢 aKzenT）

＃＃＃安装
此适配器只能通过 npm 安装。通过 GitHub 安装**无效**。

适配器配置
安装此适配器后，打开适配器配置。

安装许可证
第一步是应用许可证。如果您尚未安装许可证，则将应用 500 个数据点。

* (1) 显示您的系统 ID，您需要此 ID 才能获取许可证
* (2) 点击此处申请您的许可证

![knxV2-首次启动模式](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-first-start-mod.jpg)

如果您已经根据[https://iobroker.net](https://iobroker.net/)创建了新的许可证，则可以将其粘贴到 (2) 中，或者您可以通过点击 (1) 直接在线获取。

![knxV2-2-1-安装-许可证-修改](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-2-1-Install-License-mod.jpg)

如果您点击了（1），请输入您的 iobroker.net 账户登录信息。

![knxV2-2-2-安装-许可证-在线修改](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-2-2-Install-License-online-mod.jpg)

如果您的数据正确，您将看到您获得的所有许可证。选择您想要使用的许可证。

![knxV2-2-3-安装-许可证-在线修改](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-2-3-Install-License-online-mod.jpg)

如果成功，请保存。

![knxV2-2-4-安装-许可证-在线修改](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-2-4-Install-License-online-mod.jpg)

就这样。点击本页面底部的保存按钮。

### 配置接口
![knxV2-2-5-安装-许可证-在线应用-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-2-5-Install-License-online-applied-mod.jpg)

1. KNX-网关 IP：KNX-LAN 网关的 IPv4。
2. KNX-Gateway 端口：默认为端口 3671。
3. 物理地址：iobroker knx 实例的物理地址。**重要提示：这不是 LAN 网关的物理地址！**并且不能以 0 结尾。
4. 每秒 KNX 数据包数：此项限制数据包速率。如果 KNX Lan 网关重新连接次数过多或暂时无法访问，则降低此速率。
5. 本地 iobroker IP：选择适配器将绑定的 IP / 接口
6.loglevel：通常为“Info”级别，为了调试可以增加该级别。
7. 仅导入新数据点：默认启用。禁用后，将生成新的 GA，并重新创建现有的 GA。
8. 上传文件按钮：可在此处或点击文件选择器对话框进行拖放。您可以在此处上传“knxproj”格式的 ETS 导出文件。

导入成功后，会显示一个对话框，显示已导入对象的数量。现在点击“保存并关闭”，适配器即可启动。
启动时，适配器会读取所有带有读取标志和写入标志的组地址。这可能需要一段时间，并且可能会对您的 KNX 总线造成高负载。但启动后，vis 中的值会更新。
目前尚不支持上传密码保护的文件。

9. 主机 ID：这是 iobroker 主机的特殊 ID。此 ID 是生成和验证许可证所必需的。
10. GA-Tools：快速变化的GA工具箱

### 对象
这是 knx.0 下的组地址树，类似于您的 ETS 项目中的组地址树。要修改属性，请使用 GA-Tool。

＃＃＃ 用法
如果适配器成功启动，您的数据点将可用于您喜欢做的所有事情。

### 数据点类型 (DPT)
所有符合 KNX 协会“系统规范、互通、数据点类型”的 DPT 均可用。这意味着您可以获取两种类型的信息：1) 值或字符串 2) 逗号分隔的值或值数组（目前我不知道哪种处理方式更好）。

例如，DPT5.001 编码为 8 位无符号整数。这会产生一个值。DPT3.007（控制调光）编码为 1 位（布尔值）+3 位（无符号整数）。
例如，这些结果会得到类似“0,5”的值，其中“0”表示“减少”，“5”表示间隔数。

### 导入的工作原理
1. 读取所有通信对象引用（COR）：

将 groupadressreference ID 与相应 COR 的 DPT 相结合（如果存在）。

2. 组地址结构（GAS）的生成：

根据 GAR ID 生成 GAS 并设置 DPT（如果尚未完成）

3. 认定某项法案涉及：

ets-exports 中没有关于状态 (state) 和行为 (act) 地址的信息。适配器会解析所有“status”或“state”类型的 GA。如果有两个 GA 的相似度超过 90%，则一个地址将作为行为者 (actor)，另一个地址将作为状态 (state)。此外，还会检查 DPT 是否相似。因此，如果 GA 命名不一致，则很难找到一对。

4.设备配置中的标志检查：

标志处理如下：

| KNX | KNX | KNX | ioBroker | ioBroker | |
    |-------|-------|----------|----------|----------|----------------------------------------------------------|
| 读 | 写 | 传输 | 读 | 写 | 解释 |
| - | - | - | - | - | 该值将由 GroupValueRead 更新 |
| x | - | - | x | x | 在此状态下发送任何值都会触发 GroupValueRead |
| - | x | - | - | x | 使用 GroupValueWrite 将值写入 KNX |
| - | - | x | x | - | 状态值将由 GroupValueResponse 更新 |
| x | - | x | x | x | 在此状态下发送任何值都会触发 GroupValueRead |

6.创建数据点对等体（DPP）：

如果 GA、GAR 和 DPT 有效，则会创建 DPP。这些是适配器正在使用的 DPP。
如果 GA 中缺少 DPT（因为找不到），则不会创建 DPP。这可以使用 GA-Tool 完成。

7. 适配器启动时：

所有标有“已读”标志的 GA 都会在启动时进行检查。这可能会影响更高的总线流量。最终所有状态均已更新。

### 避免问题
* 清洁 ETS 编程，更重要的是清洁 ETS 编程，最重要的是清洁 ETS 编程
* 分配 DPT！！
* GA 名称的统一标签（例如“EG Wohnen Decke Licht schalten”和“EG Wohnen Decke Licht schalten status”）
* 避免使用特殊字符“,./;&%$§[]”（可能会导致气体产生问题）
* 检查 KNX/LAN 网关是否可达。如果不可连接，适配器将持续尝试连接。
* 正确选择物理地址（使用线路耦合器时很重要）。!!! 注意：此处输入的物理地址不是 LAN 网关的地址，并且不能以 0 结尾 !!!
* LAN接口的端口通常为3671
* 由于存在状态查询的可能性，必须注意一件事：必须确保ioBroker每秒生成的请求不超过40个，因为这些请求随后可能会在物理上生成

无法再通过适配器传递给网关。

## GA工具
GA-Tool 可以轻松更改 GA 的属性。

![knxV2-3-6-GA工具-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-6-GATools-mod.jpg)

1. 显示 GA 树和选定的 GA
2. 在属性部分，选定 GA 的名称
3. 设置 iobroker 标志
4. 设置GA DPT
5. 认可法案 GA
6. 认可的州 GA

![knxV2-3-2-GA工具-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-2-GATools-mod.jpg)

1. 展示状态-行为关系
2. 如果关系存在，则可以删除

如果不存在关系，则可以通过点击 (2) 为选定的 GA (1) 创建新关系。
在对话框 (3) 中，可以选择对等体

![knxV2-3-5-GA工具-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-5-GATools-mod.jpg)

如果有多个 GA 需要更改属性，请使用多选功能。此功能仅适用于无关联的 GA。

![knxV2-3-4-GA工具-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-4-GATools-mod.jpg)

1. 选定的 GA
2. 要更改的属性
3. 不可能改变

### 将非 KNX 状态直接链接到 KNX 状态，反之亦然
自适配器版本 2.0.6 起，可以将非 KNX ioBroker 状态直接链接到 GA。这可用于将时间、日期、任何状态或信息应用于 KNX。（小提示：您可以将任何物联网组件直接链接到 KNX 中的 GA（例如，将 Homematic 按钮链接到 KNX GA，或将 KNX 按钮传感器链接到 Sonos 播放器））。可以使用 GroupValueRead 读取状态，如果状态发生变化，它将自动在 KNX 上更新。此外，如果您在 KNX 上进行更改，它将更新链接的非 KNX 物联网设备。

![knxV2-3-7-GATools-Directlink-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-7-GATools-DirectLink-mod.jpg)

1. 选择要连接的 GA
2. 显示选定的 GA
3. 此 GA 必须具有 **write** 属性
4.选择有效的数据点类型（如果不匹配，则不起作用）
5. 不允许存在行为-状态关系
6. 按钮选择要链接的非 KNX 对象

![knxV2-3-8-GATools-Directlink-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-8-GATools-DirectLink-mod.jpg)

1. 选择要链接的非KNX对象
2.完成后点击“确定”

![knxV2-3-9-GATools-Directlink-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-9-GATools-DirectLink-mod.jpg)

现在，KNX-GA **(1)** 直接与非 KNX iobroker **(2)** 链接。使用 **(3)** 可以删除此关系。

## 计划的功能
* esf-导入
* GA-Mon 总线监控工具

<!-- 下一个版本的占位符（在行首）：

### **工作正在进行** -->
## 版本
### 2.0.31（2025年5月22日）
* 更新了 ETS 6.3.1 的适配器导入模式
* 需要 nodejs >= 22

### 2.0.30（2024年12月22日）
* 修复 GUI 错误，开始重新设计 GA-Tools

### 2.0.29（2024年11月12日）
* 更新了 ETS 6.3.0 的适配器导入模式
* 需要 nodejs >= 20

### 2.0.28
* 更新许可证相关数据并修复软件包版本

### 2.0.27（2024年2月5日）
* 更新了 ETS 6.2.2 的适配器导入模式
* 修复 UTF-8 错误

### 2.0.26（2024年3月28日）
* 更新了 ETS 6.2.1 的适配器导入模式
* 需要 nodejs >= 18

### 2.0.25（2024年3月3日）
* 更新了 ETS 6.2.0 的适配器导入模式
* 修复一些小错误

### 2.0.24（2023年11月24日）
* 更新了 ETS 6.1.1 的适配器导入模式

### 2.0.23（2023年11月10日）
* 更正适配器升级后错误的 GW 端口
* 允许自定义最小值和最大值
* 其他一些小的修复

### 2.0.22（2023年7月4日）
* 添加了导入规范，解决了 GaTools 中的问题

### 2.0.21（2023年6月17日）
* 修复许可证处理

### 2.0.20（2023年6月16日）
* 修复了 js-controller 版本 > 5 的许可证处理问题

### 2.0.19（2023年5月29日）
* 添加 ETS V6.1.0 导入
* 所需节点版本 >= 16.13.1

### 2.0.18（2023年8月4日）
* 修复发送延迟
* 小变化

### 2.0.17（2022年10月14日）
* 添加 ETSv6.0.6 导入
* 适配器配置 UI 发生重大变化
* 修复 LAN-GW 端口设置的更改

### 2.0.16（2022年9月4日）
* 添加 ETSv6.0.5 导入

### 2.0.15（2022年2月6日）
* 修复了极大型 KNX 目录文件的导入错误
* 修复无法识别的连接中断

### 2.0.14（2022年8月4日）
* 添加了 ETSv6.0.4（覆盖 6.0.3）
* 修复一些小错误

### 2.0.13（2022年3月12日）
* 添加 ETSv5.7.7 导入
* 修复“未知值”错误
* 其他一些小修复

### 2.0.12（2022年2月25日）
* 修复未定义 DP 的处理
* 更新了数据点类型
* 修复将来不兼容 DPT 的警告
* 最大的问题是：乌克兰的战争让我震惊。我的心与乌克兰人民同在，我对他们和他们的国家所遭受的一切深感遗憾。这真是非人的耻辱。
* 无法解决，但我呼吁大家：做邻居，不要与人为敌。尊重他人，不要自相残杀。

### 2.0.11
* 修复了升级 ETS 后项目的密码处理问题

### 2.0.10
* 导入 ETS6.0.2 项目 **ETS6.0.1 无法导入**
* 错误修复

### 2.0.9
* 导入受密码保护的项目文件
* 修复错误

### 2.0.8
* 修复 unackn 写入错误
* 修复 linkedState 中的错误

### 2.0.7
* 修复无法在 KNX 上写入的错误

### 2.0.6
* 修复了 ETSv6 导入的问题
* 修复了许多小错误
* 实现 GA-Tools 直接链接功能

### 2.0.5
* 修复了 ETSv4 导入的问题
* 修正了一些信息
* 修正了 DPT14.x 最小和最大范围

### 2.0.4
* 修复 DPT9.xxx 计算
* 实施日期和时间 DPT19.00x
* 修复令人困惑的“无许可证错误”
* 修复一些小错误

### 2.0.3 (2021-12-04)
* 修复第一个数据点的计数
* 自动删除旧的 V1 许可证”，防止从 V1 升级到 V2 后出现混淆

### 2.0.1
* 修复许可证接受问题

### 2.0.0 (2021-11-15) **主要版本**
* 重大变更！=> 需要新许可证 V1 许可证将不起作用 => V1 商业许可证可以更改为 V2
* 完全重构 knx-admin
* 在 knx-admin 中添加了处理 GA 的工具
* 修复了许多错误（在 knx-stack 中，导入 ETS 项目、重新连接和超时）
* 添加了新的数据点类型
* 添加导入至 ETS V6
* 更改了许可证管理

### 1.0.46 (2021-03-23)
* 新的管理界面

### 1.0.45 (2021_03_22)
* 导入 ETS v5.7.5 项目

### 1.0.44 (2021_01_22)
* 修复行为和状态处理
* 添加了一些新的数据点类型
* 修复设施和房间识别以及设备分配

### 1.0.42 (2020_09_03)
* 修复缺少 index_m.html 的问题

### 1.0.41
* 修复 GroupValue_Response 事件的错误
* 修正与 Gira GW 的连接

### 1.0.40
* 修复了 ETS 5.7.x 的一些导入错误
* 修复 GroupValue_Response 事件的错误

### 1.0.39
* 修复导入错误

### 1.0.38
* 修复导入时的一些错误
* 如果导入文件受密码保护，则显示警告

### 1.0.37（2010-01-31）
* 更新 ETS 5.7.3 导入

### 1.0.36（2019-10-16）
* 修复了一些错误

### 1.0.35（2019-09-15）
* 修复当 knx-bus 上没有流量时永久重新连接的问题

### 1.0.34（2019-09-15）
* 导入器检测项目 ID 的变更

### 1.0.33（2019-09-12）
* 修复写入总线时的错误
* 为各州添加单位
* 修复“读/写未定义”错误

### 1.0.32（2019-09-03）
* 更新了 ETS V5.7.2 的导入器，对 KNX-stack 状态机进行了一些更改

### 1.0.31
* 对 ETS5.7.2 导入器进行一些修复
* knx-stack 状态机中的小改动
* 再次添加物理地址到管理配置对话框
* 修复设备树生成中的错误

### 1.0.30
* 新的 ETS5.7.2 knxproj 文件导入器
* 扩展了可接受的数据点类型
* 新的适配器配置菜单
* 实现了一个开关，让用户决定使用“真”和“假”或“0”或“1”作为二进制值
* 修复 GroupValue_Read 中的错误
* 实现了用于 KNX 到网关通信的本地网络接口选择器
* 扩展状态对象以实现后续功能
* 修复了一些其他小错误

### 1.0.20
* 修复了处理 KNX 数据包时发生定期重新连接的错误
* 修复了 KNX 项目文件上传过程中的错误

### 1.0.19
* 恢复为 DPT1.x 的真/假处理

### 1.0.18
* 修复了 ETS5.6.x 项目文件的上传问题
* 将“boolean”的值从 1 和 0 切换为 true false
* 修复了 DPT1.x 角色集识别切换问题
* 修复了 DPT16.xxx 将值写入 KNX-Bus 且值小于 14Byte 的问题

### 1.0.17（2018-08-16）
* 更好的状态处理
* 添加可配置的套餐费率
* 修正“仅导入新对象”中的错误

### 1.0.15（2018-07-18）
* 重新连接时更改 ChID
* 启动时读取等待状态通道的响应或超时

### 1.0.13（2018-07-04）
* 消除导入时的特殊符号
* 修复一些小错误

### 1.0.12（2018-06-19）
* 减少并排序日志输出
* 修复一些小错误
* 新功能：从 KNX-Bus 请求 stateObject 的 State/Val

### 1.0.11（2018-05-27）
* 修复DPT1校正值问题
* 修复重新连接问题
* 其他小的优化和修复

### 1.0.10（2018-05-04）
* 如果连接状态未定义，则关闭本地端口
* 通过适配器配置添加高级调试级别
* 多项修复

### 1.0.9（2018-04-29）
* 更改为按状态处理
* 修复“断开连接请求”
* 更改了使用 knxd 的连接处理
* 修复了许多小问题

### 1.0.8（2018-04-04）
* 修改了包队列
* 修复发送至 KNX-Bus 时的 ACK
* 修复了许多小问题

### 1.0.7（2018-03-16）
* 修复上传项目时适配器锁定的问题

### 1.0.6（2018-03-11）
* 修复连接问题
* 修正包裹计数器

### 1.0.5（2018-03-01）
* 修复与 DPT1 相关的空对象（错误消息 \[object Object\] 未知输入值）
* 固定路径变量
* 修复了 GA 名称中包含“/”的错误（在项目导入时）
* 开始在相应的 DPT 上实施横向属性更新（在项目导入时）

### 1.0.4（2018-02-27）
* ETS 5.6 即将推出房间枚举的架构更新

### 1.0.2（2018-02-27）
* 小故障

### 1.0.1（2018-02-26）
* 修复证书错误

### 1.0.0（2018-02-25）
* 使用自己从头构建的堆栈替换已使用的 KNX 堆栈
* 根据 KNX 协会的“系统规范、互通、数据点类型”实施全面的 DPT
* 强化隧道连接的连接处理
* 升级适配器配置接口以与 Admin3 配合使用
* 由于新的 knx-stack，删除了“延迟滑块”
* 许多其他小变化
* 将逗号后的值固定为 DPT 的比例值
* 为 knx 项目上传实现了“添加”模式（现有对象保持原样，仅添加新对象）

### 0.8.6（2017-06-17）
* 修复一些小错误
* 插入滑块以设置慢速 KNX/LAN 网关的发送延迟，以防止连接丢失

### 0.8.5（2017-06-05）
* 项目加载器重建，dpt13-fix

### 0.8.3（2017-04-24）
* 增加act通道对应状态的更新
* 修复状态可视化更新中的错误
* 优化 knxproj 上传

### 0.8.2（2017-02-26）
* 实现从 knxproj 解析设备配置
* 更好地选择 DP 对象的状态/值

### 0.8.1（2017-02-06）
* 修复 DPT1 开关问题

### 0.8.0（2017-02-xx）即将推出
### 0.7.3（2016-12-22）
* (chefkoch009) 支持更多 DPT
* 启动速度更快
* 实现了具有设备依赖关系的房间列表的生成

### 0.7.2（2016-11-20）
*（chefkoch009）添加了必要的依赖项

### 0.7.1（2016-11-19）
*（chefkoch009）支持标准 KNX/LAN 网关。

### 0.7.0（2016-10-13）
*（chefkoch009）支持项目导出

### 0.6.0（2016-07-20）
*（chefkoch009）重新设计

### 0.5.0
*（vegetto）包括 vis 小部件

#### 0.4.0
*（bluefox）使用 grunt 修复错误

#### 0.2.0
*（bluefox）初始版本

## 异常和错误
**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-Plugin 文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用 Sentry 报告。

开发人员无法获取有关系统/配置/用户/环境的任何其他特殊信息。如果未找到许可证，还会报告适配器版本和主机 ID。

##非常感谢您的支持和帮助
* 蓝狐
* foxriver76

## License

For less than 500 data points, there is no need for registration or adding a license key.
If you have more than 500 data points, you need a license.
You can choose between yearly and permanent license.

To use this adapter in ioBroker, you need to accept the source code license of the adapter.
The source code of this adapter is available under the CC-NC-BY license.

Additionally, you need a license to use the adapter. The license editions are available on [https://iobroker.net/www/pricing](https://iobroker.net/www/pricing)

## License
The CC-NC-BY License (CC-NC-BY)

Copyright (c) 2016-2024 K.Ringmann <info@punktnetzwerk.net>

THE WORK IS PROVIDED UNDER THE TERMS OF THIS CREATIVE
COMMONS PUBLIC LICENSE ("CCPL" OR "LICENSE"). THE WORK IS PROTECTED BY
COPYRIGHT AND/OR OTHER APPLICABLE LAW. ANY USE OF THE WORK OTHER THAN AS
AUTHORIZED UNDER THIS LICENSE OR COPYRIGHT LAW IS PROHIBITED.

BY EXERCISING ANY RIGHTS TO THE WORK PROVIDED HERE, YOU ACCEPT AND AGREE
TO BE BOUND BY THE TERMS OF THIS LICENSE. TO THE EXTENT THIS LICENSE MAY
BE CONSIDERED TO BE A CONTRACT, THE LICENSOR GRANTS YOU THE RIGHTS
CONTAINED HERE IN CONSIDERATION OF YOUR ACCEPTANCE OF SUCH TERMS AND
CONDITIONS.

Read full license text in [LICENSE](LICENSE)