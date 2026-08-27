---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.ai-energy-manager.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.ai-energy-manager.svg
BADGE-Number of Installations: https://iobroker.live/badges/ai-energy-manager-installed.svg
BADGE-GitHub license: https://img.shields.io/github/license/blabond/ioBroker.ai-energy-manager?style=flat-square
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.ai-energy-manager/README.md
title: ioBroker AI能源管理器
hash: X4R+mLyKSnIN91oz0DQexQ4fyTr23Lk8M8HHJSvZ3Tg=
---
# IoBroker AI能源管理器

![NPM 版本](https://img.shields.io/npm/v/iobroker.ai-energy-manager.svg)
![下载](https://img.shields.io/npm/dm/iobroker.ai-energy-manager.svg)
![安装](https://iobroker.live/badges/ai-energy-manager-installed.svg)

[![测试和发布](https://github.com/blabond/ioBroker.ai-energy-manager/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/blabond/ioBroker.ai-energy-manager/actions/workflows/test-and-release.yml)

AI 能源管理器适配器将 ioBroker 连接到 SmartEnergy 后端，以实现动态电价、光伏预测、遥测、电池控制、壁挂式储能箱集成和受控可写数据点。

该适配器持续向后端发送标准化的能量数据，接收用户特定的系统配置，并且仅对用户在ioBroker中明确选择的数据点执行控制命令。它支持家用电表、光伏系统、阳台电站、电池储能、通用储能系统、电能表和壁挂式储能箱。

## 文档
[英文文档](https://github.com/blabond/ioBroker.ai-energy-manager/blob/main/README.md)

## 函数
- 基于令牌与 SmartEnergy 后端连接
服务器控制的适配器配置与实际用户系统相匹配
- 遥测数据传输，包括能耗、并网发电量、光伏发电量、电池电量、电池液位和壁挂式充电桩数值。
- 自动检测和归一化Wh、kWh、W和kW的单位
- 每个家庭和设施的动态数据点表
- 用于选择数据点的 ioBroker 对象浏览器
- 带有系统磁贴、6 小时计划和模式识别功能的精简版仪表盘
- 用户账户中选择的电价方案，显示前一、当前和下一分钟（15分钟）的电价
- 控制电池的充电、放电和储备电量的指令
- 写保护：命令仅对已配置且可写的数据点执行。

＃＃ 要求
- Node.js 22 或更高版本
- js-controller 6.0.11 或更高版本
- ioBroker 管理员 7.6.20 或更高版本
- 带有适配器令牌的 SmartEnergy 用户帐户
- 为要使用的电表、电池、光伏系统和壁挂式充电桩配置了 ioBroker 数据点

＃＃ 安装
通过 ioBroker 适配器存储库或通过 npm 安装适配器。

＃＃ 配置
在ioBroker管理后台打开适配器配置。

1. 从 SmartEnergy Web 前端插入适配器令牌。
2. 保存配置。
3. 点击**请求配置**。
4. 打开**数据点**选项卡。
5. 通过对象浏览器选择所需的 ioBroker 状态路径。
6. 保存配置。

适配器令牌经过加密，并安全地存储在原生适配器配置中。

## 请求配置
“请求配置”按钮会从后端获取用户当前的系统配置。响应会定义所需的家庭值和可用的系统特定值。然后，适配器会显示一个家庭表，以及每个已安装系统的附加表。

系统数量并非固定不变。如果用户在 Web 界面中添加或删除系统，适配器会在下次检查配置时接收到新的系统结构。

只要逻辑键仍然存在，现有的数据点映射就会被保留。

## 数据点
该适配器使用逻辑数据点，而不是硬连线的 ioBroker 路径。典型的家庭数据点包括：

- 家庭消费
- 电网消耗量计量表
- 并网电表
- 当前网络性能
- Wallbox 能源

典型的植物数据点包括：

- 光伏发电
- 电池电量
- 电池供电
电池容量
- 可控交流输出功率

适配器会在传输前自动对源值进行归一化处理。例如，kWh 数据点可以作为 Wh 遥测数据发送，kW 数据点可以作为 W 遥测数据发送。

## 遥测
适配器读取选定的 ioBroker 状态，并从中生成标准化的遥测数据包。该数据包按配置的时间间隔发送到后端。如果 `sendOnlyChanged` 处于活动状态，则会跳过未更改的数据包以减少数据流量。

后端使用遥测技术用于：

- 日常家庭消费
- 电网消耗和电网馈入
- 光伏发电量
- 可用电池容量
- 充电和放电决策
模式识别
- 控制面板和6小时计划

## 电池和壁挂式电源盒控制
后端可以向允许的逻辑目标发送控制命令。适配器将这些目标映射到用户选择的 ioBroker 数据点。

支持的控制逻辑：

利用多余的光伏电力为电池充电
- 在电价低谷时段通过电网为电池充电
- 利用电池供电或短期电池充电维持市电运行
- 如果套餐包含备用电池，则电池电量耗尽。

适配器绝不会向后端任意状态 ID 写入数据。写入操作仅在以下情况下发生：

- 该目标是服务器配置的一部分
用户已为此目标选择了一个数据点
- ioBroker 对象存在
该对象可写
- 该值与预期类型相符
- 保持配置的写入命令之间的最小间隔。

## 州
适配器会在其实例下方创建内部状态：

- `info.connection`
- `info.lastSync`
- `info.lastError`
- `info.configValid`
- `info.tokenValid`
- `info.detectedFeatures`
- `info.serverConfigVersion`
- `info.serverConfigRevision`
- `info.serverConfigLastRequest`
- `status.backendReachable`
- `status.lastPayload`
- `status.lastCommand`
- `status.lastCommandResult`

适配器令牌永远不会写入状态中。

### 证券交易所的电力价格
通道 `electricityPrices` 提供 SmartEnergy 网络界面也使用的资费价格。这些价格包括用户帐户中选择的资费提供商的附加费，以及为系统配置的网络费用。

- `electricityPrices.last`：前 15 分钟的价格，单位为 `ct/kWh`
- `electricityPrices.current`：当前有效的 15 分钟电价，单位为 `ct/kWh`
- `electricityPrices.next`: 下一个 15 分钟的价格，单位为 `ct/kWh`
- `electricityPrices.status`：当前价格的分类

状态栏使用与网页前端相同的价格区间和颜色：

- `0` — 标准范围或无分类
- `1` — 价格较低的充电槽（黄色）
- `2` — 桥梁装载槽（蓝色）
- `3` — 避免用电/切勿充电（黑色；至少达到 7 天最大用量的 150%）

如果没有当前后端数据可用，则价格状态重置为`0`。

＃＃ 安全
- 适配器令牌以加密方式存储并受到保护。
- 日志中对令牌进行了屏蔽。
后端命令使用逻辑目标而不是直接的 ioBroker 路径。
- 可写数据点必须由用户明确选择。
命令处理完毕后，后端会收到确认信息。
- 后端通信通过 HTTPS 进行。

## 故障排除
如果缺少遥测数据，请在“数据点”选项卡中检查是否已设置所有必需的状态路径。

如果没有后端连接，请检查：

- `info.connection`
- `info.tokenValid`
- `status.backendReachable`
- `info.lastError`

如果命令未执行，请检查所选 ioBroker 状态是否可写，以及值类型是否与状态匹配。

## Changelog

### **WORK IN PROGRESS**

### 0.4.3 (2026-07-28)

- Update dependencies and GitHub Actions.
- Expose account-specific 15-minute electricity prices and the current web price classification.

### 0.4.2 (2026-07-14)

- General adapter improvements

### 0.4.1 (2026-07-06)

- FIX: React state object selector for ioBroker datapoint paths

### 0.4.0 (2026-07-06)

- Code Cleanup
- ioBroker checker changes.
- Update admin dependencies and keep the React/MUI admin UI compatible with the ioBroker Admin runtime.
- Fix ApiClient timer fallback

### 0.2.0 (2026-05-22)

- Initial release of the AI Energy Manager adapter.

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 Christoph Böhrs

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