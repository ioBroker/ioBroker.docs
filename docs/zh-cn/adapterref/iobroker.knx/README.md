---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.knx/README.md
title: ioBroker.knx
hash: q5y0ine8XUEAhBDAHSwdI++t8DShZsZvp0kzdLX+hu4=
---
![标识](../../../en/adapterref/iobroker.knx/admin/knx.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.knx.svg)
![下载](https://img.shields.io/npm/dm/iobroker.knx.svg)
![NPM](https://nodei.co/npm/iobroker.knx.png?downloads=true)

# IoBroker.knx
#### 目录
* [描述](#description)
* [要求](#requirements)
* [功能](#features)
* [安装](#installation)
* [适配器配置](#adapter-configuration)
* [安装许可证](#install-the-license)
* [配置接口](#configuration-interface)
* [对象](#对象)
* [用法](#usage)
* [数据点类型 (DPT)](#data-point-types-dpt)
* [导入工作原理](#how-the-import-works)
* [回避问题](#回避问题)
* [GA-Tool](#ga-tool)
* [直接链接非 KNX 状态到 KNX 状态，反之亦然](#direct-link-non-knx-state-to-knx-vice-verse)
* [计划功能](#planned-features)
* [更新日志](#changelog)

＃＃ 描述
en: 此适配器允许从 ETS 导入 `knxproj` 文件。它生成 KNX 组地址和 ioBroker 之间的转换，并将设备放入房间（尤其适用于 MobileUI）。

ru: [Установка и базовая настройка адаптера](docs/ru/README.md)

它可连接到标准 KNX/LAN 网关。

**注意：KNX适配器版本升级至2.x后，许可方式已更改。您可以从[https://iobroker.net](https://iobroker.net/)获取新许可证。**

您还应该将 iobroker js-controller 和 admin 更新到最新版本。

开始之前：所有 com.Objects 的 DPT 都应在您的 ETS 项目中设置。所有设备都应按您的设施结构进行分类。

＃＃ 要求
* Node 版本 >= 14.15.4
* 管理员版本 >= 5.2.0
* js-controller 版本 >=3.3.20

如果没有这个要求，适配器将无法安装或无法正常工作。

＃＃ 特征
* 导入 `knxproj` 文件
* 生成类似 ETS 的对象结构
* 查找并组合行为通道和状态通道（启发式方法）
* 启动时更新所有状态
无需云端或互联网
* 在写入状态对象的同时，向 KNX 总线发出读取请求
* 使用 GA 工具编辑和修改 GA 对象
* 使用 GA-Tools 编辑和修改州与法案之间的关系
* 新增：允许非 KNX 状态的直接链接（反之亦然）
* 新增：适配器响应对通过 directLink 连接的对象的 GroupValueRead 读取操作
* 新增：导入受密码保护的项目文件（感谢 aKzenT）

＃＃＃安装
此适配器只能通过 npm 安装。通过 GitHub 安装**无效**。

##适配器配置
安装好适配器后，打开适配器配置。

###安装许可证
第一步是应用许可证。如果您尚未安装许可证，则默认应用 500 个数据点。

* (1) 显示您的系统 ID，您需要此 ID 才能获取许可证。
* (2) 点击此处申请您的许可证

![knxV2-首次启动-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-first-start-mod.jpg)

如果您已在 [https://iobroker.net](https://iobroker.net/) 下创建了新的许可证，则可以将其粘贴到 (2) 中，或者您可以点击 (1) 直接在线获取。

![knxV2-2-1-安装许可证模块](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-2-1-Install-License-mod.jpg)

如果您点击了（1），请输入您的 iobroker.net 帐户登录信息。

![knxV2-2-2-在线安装许可证模组](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-2-2-Install-License-online-mod.jpg)

如果您的数据正确，您将看到您获得的所有许可证。选择您想要使用的许可证。

![knxV2-2-3-在线安装许可证模组](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-2-3-Install-License-online-mod.jpg)

如果成功了，请保存。

![knxV2-2-4-在线安装许可证模组](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-2-4-Install-License-online-mod.jpg)

就这些。点击页面底部的按钮保存。

### 配置接口
![knxV2-2-5-在线安装许可证-已应用-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-2-5-Install-License-online-applied-mod.jpg)

1. KNX-Gateway IP：KNX-LAN 网关的 IPv4。
2. KNX 网关端口：默认端口为 3671。
3. 物理地址：iobroker knx 实例的物理地址。**重要提示：这不是局域网的物理地址。

网关！** 且可能不以 0 结尾。

4. 每秒 KNX 数据包数量：此设置限制数据包传输速率。如果 KNX LAN 网关重连次数过多或暂时无法连接，则可能会出现此问题。

如果价格合适，那就降低价格。

5. 本地 iobroker IP：选择适配器将绑定的 IP 地址/接口。
6. 日志级别：通常为“Info”级别，如需调试，请提高级别。
7. 仅导入新数据点：默认启用。如果禁用此选项，则会生成新的 GA 数据点。

现有的通用架构将被重新创建。

8. 文件上传按钮：支持拖放上传，也可点击文件选择对话框上传文件。您可以在这里上传您的 ETS 文件。

以 `knxproj` 格式导出。

导入成功后，对话框会显示导入的对象数量。现在点击“保存并关闭”，适配器应该会启动。

启动时，适配器会读取所有带有读取标志和写入标志的组地址。这可能需要一些时间，并且可能会给您的 KNX 总线带来较高的负载。但启动后，您的 VIS 中的值将会更新。

目前尚不支持上传密码保护的文件。

9. 主机 ID：这是 iobroker 主机的特殊 ID。此 ID 对于生成和验证许可证至关重要。
10. GA-Tools：适用于快速变化的 GA 的工具箱

### 对象
这里是 knx.0 下的组地址树，类似于您的 ETS 项目中的地址树。要修改属性，请使用 GA 工具。

＃＃＃ 用法
如果适配器启动成功，您的数据点将可用于您想做的任何操作。

### 数据点类型 (DPT)
所有符合 KNX 协会“系统规范、互操作性、数据点类型”标准的 DPT 均可用。这意味着您可以获取两种类型的信息：

1）一个值或一个字符串；2）以逗号分隔的值或一个值数组（目前我还不清楚哪种处理方式更好）。

例如，DPT5.001 被编码为 8 位无符号整数，得到一个单一值。DPT3.007（控制调光）被编码为 1 位（布尔值）+ 3 位（无符号整数）。

例如，其结果类似于“0,5”，其中“0”表示“减少”，“5”表示间隔数。

### 导入过程
1. 读取所有通信对象引用 (COR)：

将 groupadressreference ID 与相应 COR 的 DPT（如果存在）进行合并。

2. 生成组地址结构（GAS）：

根据 GAR ID 生成 GAS 并设置 DPT（如果尚未完成）

3. 寻找一项法案所针对的州：

ets-exports 文件中没有关于状态和行为地址的信息。适配器会解析所有名为“status”或“state”的 GA。

如果两个 GA 的相似度超过 90%，则其中一个地址将作为 Actor，另一个地址将作为状态。此外，还会检查 DPT 是否相似。因此，如果 GA 命名不一致，就很难找到匹配的地址对。

4. 设备配置中的标志检查：

标志的处理方式如下：

| KNX | KNX | KNX | ioBroker | ioBroker | |
       |-------|-------|----------|----------|----------|----------------------------------------------------------|
| 阅读 | 写入 | 发送 | 阅读 | 写入 | 说明 |
| - | - | - | - | - | 该值将由 GroupValueRead 更新 |
| x | - | - | x | x | 在此状态下发送任何值都会触发 GroupValueRead |
| - | x | - | - | x | 使用 GroupValueWrite 将值写入 KNX |
| - | - | x | x | - | 状态值将由 GroupValueResponse 更新 |
| x | - | x | x | x | 在此状态下发送任何值都会触发 GroupValueRead |

6. 创建数据点对等体 (DPP)：

如果 GA、GAR 和 DPT 都有效，则会创建 DPP。这些是适配器正在使用的 DPP。

如果 GA 中缺少 DPT（因为找不到），则不会创建 DPP。这可以通过 GA 工具完成。

7. 适配器启动时：

所有标记为“已读”的 GA 都会在开始时进行检查。这可能会影响较高的公交车流量。最终所有状态都会更新。

### 避免问题
* 干净的 ETS 编程，更重要的是干净的 ETS 编程，最重要的是干净的 ETS 编程
* 分配DPT！
* GA 名称的统一标签（例如“EG Wohnen Decke Licht schalten”和“EG Wohnen Decke Licht schalten status”）
* 避免使用特殊字符“,./;&%$§[]”（可能会导致气体生成问题）
* 检查KNX/LAN网关是否可达。如果无法访问，适配器会持续尝试连接。
* 正确选择物理地址（使用线路耦合器时尤为重要）。！！！注意：输入的物理地址

这里不是局域网网关的地址，而且地址不能以0结尾！！！

* LAN接口的端口通常是3671。
* 由于存在状态查询的可能性，必须注意一点：必须确保每个请求不超过 40 个。

第二个是由 ioBroker 生成的，因为这些是物理生成的，不能再通过适配器传递给网关。

## GA工具
GA 工具使更改 GA 的属性变得容易。

![knxV2-3-6-GATools-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-6-GATools-mod.jpg)

1. 显示了遗传算法树和选定的遗传算法
2. 在属性部分，选择 GA 的名称
3. 设置 iobroker 标志
4. 设置 GA DPT
5. 公认法案
6. 佐治亚州认可

![knxV2-3-2-GATools-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-2-GATools-mod.jpg)

1. 展示状态-行为关系
2. 如果关系存在，则可以将其删除

如果不存在关联关系，则可以通过单击 (2) 为选定的 GA (1) 创建新关联关系。

在对话框 (3) 中，可以选择对等方。

![knxV2-3-5-GATools-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-5-GATools-mod.jpg)

如果需要更改多个 GA 的属性，请使用多选功能。此功能仅适用于没有关联的 GA。

![knxV2-3-4-GATools-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-4-GATools-mod.jpg)

1. 选定的 GA
2. 要更改的属性
3. 没有改变的可能

### 非KNX状态到KNX状态的直接链接，反之亦然
自适配器版本 2.0.6 起，可以将非 KNX ioBroker 的状态直接链接到 GA。这可用于将时间、日期、任何状态或信息应用到 KNX。（提示：您可以将任何 IoT 组件直接链接到 KNX 中的 GA，例如，将 Homematic 按钮链接到 KNX GA，或将 KNX 按钮传感器链接到 Sonos 播放器）。可以使用 GroupValueRead 读取状态，如果状态发生变化，KNX 将自动更新。此外，如果您在 KNX 上更改状态，它也会更新已链接的非 KNX IoT 设备。

![knxV2-3-7-GATools-Directlink-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-7-GATools-DirectLink-mod.jpg)

1. 选择要连接的 GA
2. 显示所选的遗传算法
3. 此 GA 必须具有**写入**属性
4. 选择有效的数据点类型（如果类型不匹配，则无法正常工作）
5. 不允许存在行为与国家之间的关系
6. 用于选择要链接的非 KNX 对象的按钮

![knxV2-3-8-GATools-Directlink-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-8-GATools-DirectLink-mod.jpg)

1. 选择要链接的非 KNX 对象
2. 完成后，点击“确定”。

![knxV2-3-9-GATools-Directlink-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-9-GATools-DirectLink-mod.jpg)

现在 KNX-GA **(1)** 已与非 KNX iobroker **(2)** 直接关联。使用 **(3)** 可以删除此关联。

## 计划功能
* esf-import
* GA-Mon 总线监控工具

<!-- 下一版本的占位符（位于行首）：

### **正在进行中** -->
## 版本
### 2.0.38 (2026年3月1日)
* 新增对 ETS 6.4.0 的支持

### 2.0.37 (2026年2月20日)
* 依赖项更新
* 修复适配器配置中的错误

### 2.0.35 (2026年2月5日)
* 依赖项更新
* 修复 GA-Tools 中的错误
* GA-Tools 的功能增强

### 2.0.33 (2025年6月22日)
* 不稳定的 KNX 连接问题已解决

### 2.0.31 (2025年5月22日)
* 更新了 ETS 6.3.1 的适配器导入架构
* 需要 Node.js 版本 >= 22

### 2.0.30 (2024年12月22日)
* 修复了 GUI 错误，开始重新设计 GA 工具

### 2.0.29 (2024年12月11日)
* 更新了 ETS 6.3.0 的适配器导入架构
* 需要 Node.js 版本 >= 20。

### 2.0.28
* 更新许可证相关数据并修复软件包版本

### 2.0.27 (2024年5月2日)
* 更新了 ETS 6.2.2 的适配器导入架构
* 修复了 UTF-8 错误

### 2.0.26 (2024年3月28日)
* 更新了 ETS 6.2.1 的适配器导入架构
* 需要 Node.js 版本 >= 18。

### 2.0.25 (2024年3月3日)
* 更新了 ETS 6.2.0 的适配器导入架构
* 修复了一些小错误

### 2.0.24 (2023年11月24日)
* 更新了 ETS 6.1.1 的适配器导入架构

### 2.0.23 (2023年10月11日)
* 适配器升级后修正了错误的网关端口
* 允许自定义最小值和最大值
* 其他一些小修复

### 2.0.22 (2023年7月4日)
* 添加了导入规范，解决了 GaTools 中的问题。

### 2.0.21 (2023年6月17日)
* 固定许可证处理

### 2.0.20 (2023年6月16日)
* 修复了 js-controller 版本 > 5 的许可证处理问题

### 2.0.19 (2023年5月29日)
* 添加了 ETS V6.1.0 导入
* 需要 Node 版本 >= 16.13.1

### 2.0.18 (2023年4月8日)
* 修复了发送延迟
* 小幅改动

### 2.0.17 (2022年10月14日)
* 添加了 ETSv6.0.6 导入
* 适配器配置界面发生重大变化
* 修复了 LAN-GW 端口设置的更改

### 2.0.16 (2022年9月4日)
* 添加了 ETSv6.0.5 导入

### 2.0.15 (2022年6月2日)
* 修复了导入超大型 KNX 目录文件时出现的错误
* 修复了无法识别的连接中断问题

### 2.0.14 (2022年4月8日)
* 添加了 ETSv6.0.4（覆盖 6.0.3 版本）
* 修复了一些小错误

### 2.0.13 (2022年3月12日)
* 添加了 ETSv5.7.7 导入
* 修复了“未知值”错误
* 其他一些小修复

### 2.0.12 (2022年2月25日)
* 修复了对未定义DP的处理
* 更新了数据点类型
* 修复未来版本中与不兼容的 DPT 相关的警告
* 最让我震惊的是：乌克兰战争让我感到无比痛心。我与乌克兰人民同在，我

我对他们和他们的国家所遭受的一切感到无比痛心。这简直是惨无人道的耻辱。

我无法解决这个问题，但我呼吁大家：要做邻居，不要做敌人。尊重他人，不要自相残杀。

### 2.0.11
* 修复了升级后的 ETS 项目中的密码处理问题

### 2.0.10
* 可导入 ETS6.0.2 项目 **不支持 ETS6.0.1 项目**
* 修复错误

### 2.0.9
* 导入受密码保护的项目文件
* 修复漏洞

### 2.0.8
* 修复了未确认写入的错误
* 修复了 linkedState 中的错误

### 2.0.7
* 修复了无法在 KNX 上写入的错误

### 2.0.6
* 修复了 ETSv6 导入问题
* 修复了许多小错误
* 实现了 GA-Tools directLink 功能

### 2.0.5
* 修复了 ETSv4 导入问题
* 更正了一些信息
* 修正了 DPT14.x 的最小和最大范围

### 2.0.4
* 修复了 DPT9.xxx 计算
* 已实施日期和时间 DPT19.00x
* 修复了令人困惑的“无许可证错误”
* 修复了一些小错误

### 2.0.3 (2021-12-04)
* 固定计数第一个数据点
* 自动移除旧的 V1 许可证”，防止从 V1 升级到 V2 后出现混乱。

### 2.0.1
* 修复了许可证接受问题

### 2.0.0 (2021-11-15) **重大版本更新**
* 重大变更！=> 需要新的许可证，V1 许可证将无法使用 => V1 企业许可证可以升级到 V2
* 对 knx-admin 进行全面重构
* 添加了用于在 knx-admin 中处理 GA 的工具
* 修复了许多错误（在 knx-stack 中，导入 ETS 项目时出现错误，以及重新连接和超时问题）
* 新增数据点类型
* 已添加导入功能，直至 ETS V6
* 更改了许可证管理

### 1.0.46 (2021-03-23)
* 新的管理员图形用户界面

### 1.0.45 (2021_03_22)
* 导入 ETS v5.7.5 项目

### 1.0.44 (2021_01_22)
* 固定行为和状态处理
* 新增了一些数据点类型
* 修复设施和房间识别以及设备分配问题

### 1.0.42 (2020_09_03)
* 修复了 index_m.html 文件缺失的问题

### 1.0.41
* 修复了 GroupValue_Response 事件的错误
* 已修正与 Gira GW 的连接

### 1.0.40
* 修复了 ETS 5.7.x 的一些导入错误
* 修复了 GroupValue_Response 事件的错误

### 1.0.39
* 修复了导入错误

### 1.0.38
* 修复了一些导入错误
* 如果导入文件受密码保护，则显示警告

### 1.0.37 (2010-01-31)
* 更新以支持 ETS 5.7.3 导入

### 1.0.36 (2019-10-16)
* 修复了一些错误

### 1.0.35 (2019-09-15)
* 如果 KNX 总线上没有流量，则进行永久性重连。

### 1.0.34 (2019-09-15)
* 导入器中用于检测项目 ID 的更改

### 1.0.33 (2019-09-12)
* 修复了写入总线时出现的错误
* 向各州添加了单位
* 修复了“读取/写入未定义对象”错误

### 1.0.32 (2019-09-03)
* 更新了 ETS V5.7.2 的导入器，KNX 堆栈状态机也进行了一些更改。

### 1.0.31
* 修复了 ETS5.7.2 导入器的一些问题
* knx-stack 状态机的小改动
* 已（再次）将物理地址添加到管理配置对话框中
* 修复了设备树生成中的错误

### 1.0.30
* 新增 ETS5.7.2 knxproj 文件导入器
* 扩展接受的数据点类型
* 新的适配器配置菜单
* 实现了一个开关，允许用户选择使用“true”和“false”或“0”或“1”来表示二进制值
* 修复了 GroupValue_Read 中的错误
* 为 KNX 到网关通信的本地网络接口实现了选择器
* 为后续功能扩展了状态对象
* 修复了一些其他小错误。

### 1.0.20
* 修复了处理 KNX 数据包时出现的周期性重连错误
* 修复了 KNX 项目文件上传过程中的错误

### 1.0.19
* 已恢复 DPT1.x 的真/假处理方式

### 1.0.18
* 修复了 ETS5.6.x 项目文件的上传问题
* 将“boolean”的值从1和0切换为true和false
* 修复了 DPT1.x 角色集切换的识别问题
* 修复了 DPT16.xxx 向 KNX 总线写入小于 14 字节的值的问题

### 1.0.17 (2018-08-16)
* 更佳的状态处理
* 添加可配置的套餐费率
* 修复了“仅导入新对象”中的错误

### 1.0.15 (2018-07-18)
* 重新连接时更改 ChID
* 启动时等待状态通道的响应或超时

### 1.0.13 (2018-07-04)
* 进口时取消特殊标志
* 修复了一些小错误

### 1.0.12 (2018-06-19)
* 减少并排序日志输出
* 修复了一些小错误
* 新功能：从 KNX 总线请求 stateObject 的状态/值

### 1.0.11 (2018-05-27)
* 修复了 DPT1 校正值问题
* 修复了重新连接问题
其他一些小的优化和修复

### 1.0.10 (2018-05-04)
* 如果连接状态未定义，则关闭本地端口
* 通过适配器配置添加了高级调试级别
* 多项修复

### 1.0.9 (2018-04-29)
* 改为按状态处理
* 修复了“断开连接请求”
* 更改了与 knxd 的连接处理方式
* 许多小的修复

### 1.0.8 (2018-04-04)
* 修改后的包裹队列
* 如果发送到 KNX 总线，则固定发送 ACK。
* 许多小的修复

### 1.0.7 (2018-03-16)
* 修复了上传项目时适配器锁定的问题

### 1.0.6 (2018-03-11)
* 修复了连接问题
* 更正后的包裹计数器

### 1.0.5 (2018-03-01)
* 修复了与 DPT1 相关的空对象（错误消息“[对象 对象] 未知输入值”）
* 固定路径变量
* 修复了 GA 名称中包含“/”的错误（在 proj-import 中）
* 开始在相应的 DPT（在项目导入时）上实施交叉属性更新

### 1.0.4 (2018-02-27)
* ETS 5.6 版本将对房间枚举进行架构更新

### 1.0.2 (2018-02-27)
* kleine Fehler beseitigt

### 1.0.1 (2018-02-26)
* 修复了证书错误

### 1.0.0 (2018-02-25)
* 用自行构建的堆栈替换现有的 KNX 堆栈。
* 根据 KNX 协会的“系统规范、互操作、数据点类型”全面实施了 DPT
* 加强隧道连接的连接处理
* 升级适配器配置接口，使其与 Admin3 兼容。
* 由于新的 knx-stack，已移除“延迟滑块”。
* 以及其他许多细微的变化
* 将逗号后的值固定为 DPT 的比例值
* 为 KNX 项目上传实现了“添加”模式（现有对象保持不变，仅添加新对象）

### 0.8.6 (2017-06-17)
* 修复了一些小错误
* 插入滑块以设置慢速 KNX/LAN 网关的发送延迟，防止连接丢失

### 0.8.5 (2017-06-05)
* 项目加载器重建，dpt13修复

### 0.8.3 (2017-04-24)
* 添加了相应状态的行动通道更新
* 修复状态可视化更新中的错误
* 优化了 knxproj 上传

### 0.8.2 (2017-02-26)
* 实现了从 knxproj 解析设备配置
* 更好地选择DP对象的状态/值

### 0.8.1 (2017-02-06)
* 修复了 DPT1 开关问题

### 0.8.0 (2017-02-xx) 即将发布
### 0.7.3 (2016-12-22)
* (chefkoch009) 支持更多 DPT
启动速度更快
* 实现了基于设备依赖关系的房间列表生成

### 0.7.2 (2016-11-20)
* (chefkoch009) 添加了必要的依赖项

### 0.7.1 (2016-11-19)
* (chefkoch009) 支持标准 KNX/LAN 网关。

### 0.7.0 (2016-10-13)
* (chefkoch009) 支持项目出口

### 0.6.0 (2016-07-20)
* (chefkoch009) 重新设计

### 0.5.0
* (vegetto) 包含 vis 小部件

#### 0.4.0
* (bluefox) 修复 grunt 错误

#### 0.2.0
* (bluefox) 初始版本

## 异常和错误
**此适配器使用 Sentry 库自动向开发者报告异常和代码错误。** 更多详情以及如何禁用错误报告，请参阅 [Sentry插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！Sentry 报告功能从 js-controller 3.0 开始使用。

开发者无法获取有关系统/配置/用户/环境的任何其他特殊信息。如果未找到许可证，还会报告适配器版本和主机 ID。

非常感谢您的支持和帮助
* 蓝狐
* foxriver76

## Changelog

## License

For less than 500 data points, there is no need for registration or adding a license key.
If you have more than 500 data points, you need a license.
You can choose between yearly and permanent license.

To use this adapter in ioBroker, you need to accept the source code license of the adapter.
The source code of this adapter is available under the CC-NC-BY license.

Additionally, you need a license to use the adapter. The license editions are available
on [https://iobroker.net/www/pricing](https://iobroker.net/www/pricing)

## License

The CC-NC-BY License (CC-NC-BY)

Copyright (c) 2016-2026 K.Ringmann <info@punktnetzwerk.net>

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