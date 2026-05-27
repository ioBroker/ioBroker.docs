---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.foxesscloud/README.md
title: FoxESS Cloud 的 ioBroker 适配器
hash: NGU6JXedkBMtdUikAU5X0+04Q7QPIytB5IzX6ONtG7M=
---
![标识](../../../en/adapterref/iobroker.foxesscloud/admin/foxesscloud-logo.png)

![安装数量](https://iobroker.live/badges/foxesscloud-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/foxesscloud-stable.svg)
![NPM 版本](https://nodei.co/npm/iobroker.foxesscloud.svg?style=shields&data=v,u,d&color=orange)
![下载](https://img.shields.io/npm/dm/iobroker.foxesscloud.svg)
![社区](https://img.shields.io/badge/community%20-ioBroker%20|%20forum-blue.svg)
![维护者](https://img.shields.io/badge/maintainer-skvarel%20@%20inventwo-yellowgreen.svg)
![人工智能](https://img.shields.io/badge/ai%20assisted-copilot-blue.svg)
![PayPal捐赠](https://img.shields.io/badge/paypal-donate%20|%20spenden-green.svg)

# FoxESS Cloud 的 ioBroker 适配器
---

## 此适配器的功能
从 FoxESS Cloud API 获取太阳能逆变器（例如，Enpal 系统中使用的逆变器）的数据，并公开 ioBroker 状态以用于家庭自动化：

- 监测太阳能发电量
- 跟踪电池电量状态 (SoC)
- 分析电网消耗和馈入功率
- 基于发电量的自动化
- 在ioBroker仪表盘中可视化能量流

＃＃ 特征
### 功率值
- **`pvPower`**：当前光伏发电量（千瓦）
- **`generationPower`**: 总发电/输出功率 (kW)
- **`负载`**：当前负载/消耗功率（千瓦）
- **`gridConsumption`**: 从电网输入的功率 (kW)
- **`feedinPower`**：输出到电网的功率（千瓦）

＃＃＃ 电池
- **`soc`**：电池剩余电量 (%)
- **`batCharge`**：电池充电功率（kW）
- **`batDischarge`**：电池放电功率（kW）

### 连接状态
- **`info.connection`**: 连接状态，每天调用 1440 次。以 60 秒为间隔，此限制得到了充分利用（1440 分钟 = 24 小时）。

## 数据点
适配器会创建以下数据点：

- `foxesscloud.0.pvPower` - 光伏发电功率 (kW)
- `foxesscloud.0.pv1Power` - 光伏组串 1 功率 (kW)
- `foxesscloud.0.pv2Power` - 光伏串 2 功率 (kW)
- `foxesscloud.0.generationPower` - 发电功率/输出功率 (kW)
- `foxesscloud.0.soc` - 电池电量 (%)
- `foxesscloud.0.load` - 负载功率 (kW)
- `foxesscloud.0.gridConsumption` - 电网消耗/进口 (kW)
- `foxesscloud.0.feedinPower` - 馈入/输出功率 (kW)
- `foxesscloud.0.batCharge` - 电池充电功率 (kW)
- `foxesscloud.0.batDischarge` - 电池放电功率 (kW)
- `foxesscloud.0.batTemperature` - 电池温度（摄氏度）
- `foxesscloud.0.invTemperature` - 逆变器内部温度 (°C)
- `foxesscloud.0.runningState` - 逆变器运行状态
- `foxesscloud.0.info.connection` - 连接状态

### 光伏发电JSON统计信息（如果已启用）
- `foxesscloud.0.pvPowerJSON.daily` - 每日能源统计数据（JSON 格式） - 本周从周一到周日
- `foxesscloud.0.pvPowerJSON.weekly` - 每周能源统计数据（JSON 格式） - 包含过去 4 周（含本周）
- `foxesscloud.0.pvPowerJSON.monthly` - 月度能源统计数据（JSON 格式） - 包含当月在内的全部 12 个月

＃＃ 安装
1. 从 ioBroker 管理界面安装适配器
2. 创建一个新实例
3. 配置：
- **API令牌**：您从FoxESS云门户获得的API密钥
- **序列号 (SN)**：逆变器的序列号。
- **更新间隔**：数据刷新间隔，单位为秒（默认值：60，最小值：60）
4. （可选）启用光伏发电JSON统计信息：
- **启用光伏发电JSON生成**：激活VIS组件的JSON表格生成功能
- **每日统计**：生成本周（周一至周日）的每日能源数据
- **每周统计数据**：生成每周能源数据（包括本周在内的过去 4 周）
- **月度统计**：生成月度能源数据（包括当月在内的所有 12 个月）
- **每千瓦时电价**：可选 - 输入您的每千瓦时电价以进行成本计算
- **每日/每周/每月初始值**：如果适配器在生产开始后启用，则可设置运行周期的初始千瓦时值（可选）。
5. 保存并启动实例

### 如何获取您的 API 凭证
1. 登录 [FoxESS Cloud](https://www.foxesscloud.com)
2. 前往您的个人资料/设置
3. 生成 API 密钥（令牌）
4. 在设备列表中查找逆变器序列号

## 用于 VIS 仪表板的光伏发电 JSON 统计数据
在配置中启用后，适配器会生成包含能源统计信息的 JSON 表格，这些表格可以使用诸如 **inventwo JSON Widget** 之类的控件在 ioBroker VIS 中显示。

### JSON 格式
JSON 表格包含能量数据，其结构如下：

```json
[
  {"date": "Monday", "value": "1.904", "price": "0.58"},
  {"date": "Tuesday", "value": "4.653", "price": "1.42"},
   {"date": "Wednesday", "value": "0.417", "price": "0.13"},
   {"date": "Thursday", "value": "0", "price": "0"},
   {"date": "Friday", "value": "0", "price": "0"},
   {"date": "Saturday", "value": "0", "price": "0"},
   {"date": "Sunday", "value": "0", "price": "0"},
  {"date": "Total", "value": "6.843", "price": "2.09"}
]
```

- **日期**：星期名称（本地化）、周数（KW XX）或月份名称
- **数值**：发电量，单位为千瓦时（保留三位小数）
- **价格**：以欧元为单位的成本（仅当配置了每千瓦时价格时，保留两位小数）

### 数据收集
- **每日显示**：显示当前一周的日历，从星期一到星期日，并实时更新当天信息。
- **每周**：累计每周数据（周一至周日），保留最近 4 周的数据，并包含当前周的数据。
- **按月统计**：累计每月数据（每月1日至最后一天），保留全部12个月的数据，并包含当月数据。

如果在生产环境运行期间启用适配器，您可以配置当前日期、当前周和当前月份的可选起始值。这些值会在相应运行周期开始时添加一次。

日期标签（日/周/月名称）的语言会自动适应您的ioBroker系统语言：

- **德语** (de)：Montag、Dienstag、January、Februar 等。
- **English** (en): Monday, Tuesday, Januar, Februar, etc.

### 与 VIS 一起使用
1. 在适配器配置中启用光伏发电 JSON 生成
2. 将 JSON 小部件添加到您的 VIS 仪表板
3. 将小部件绑定到以下状态之一：
- `foxesscloud.0.pvPowerJSON.daily` 用于每日统计数据
- `foxesscloud.0.pvPowerJSON.weekly` 用于获取每周统计数据
- `foxesscloud.0.pvPowerJSON.monthly` 用于获取月度统计数据
4. 配置小部件以表格形式显示能源/价格数据

## 隐私与数据处理
此适配器仅使用您的个人 API 令牌从 **FoxESS Cloud API** 读取数据。
您的 API 令牌以加密形式存储在 ioBroker 数据库中。

## 较早的更改
- [CHANGELOG_OLD.md](CHANGELOG_OLD.md)

## Changelog
<!--
	### **WORK IN PROGRESS**
-->
### 0.5.1 (2026-05-25)
- (skvarel) Replaced process.env and process.exit usage in tools/api-test.js to fix compatibility issues reported by ioBroker repository checker (E5049, E5050)
- (skvarel) Downgraded @types/node from ^25 to ^22 to match supported Node.js version (W0066)

### 0.5.0 (2026-05-23)
- (skvarel) Added PV Power JSON statistics (daily, weekly, monthly) for VIS widget integration with optional cost calculation per kWh

### 0.4.0 (2026-05-19)
- (skvarel) Added PV string 1 and string 2 power datapoints (pv1Power, pv2Power)
- (skvarel) Added battery temperature datapoint (batTemperature)
- (skvarel) Added inverter running state datapoint (runningState)

### 0.3.1 (2026-05-19)
- (skvarel) Adjusted real-time API parsing to keep the typecheck green without changing runtime behavior

### 0.3.0 (2026-05-19)
- (skvarel) Added inverter internal temperature datapoint in °C

## License

MIT License

Copyright (c) 2026 skvarel <skvarel@inventwo.com>

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