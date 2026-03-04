---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.foxesscloud/README.md
title: 无标题
hash: RqMV8EnSC6IFUOtQBbkiYdIvCJmEOg0WY/uNku/rb7E=
---
![标识](../../../en/adapterref/iobroker.foxesscloud/admin/foxesscloud-logo.png)

![安装数量](https://iobroker.live/badges/foxesscloud-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/foxesscloud-stable.svg)
![NPM 版本](https://nodei.co/npm/iobroker.foxesscloud.svg?style=shields&data=v,u,d&color=orange)
![下载](https://img.shields.io/npm/dm/iobroker.foxesscloud.svg)
![PayPal捐赠](https://img.shields.io/badge/paypal-donate%20|%20spenden-green.svg)

## FoxESS Cloud 的 ioBroker 适配器
## 此适配器的功能
从 FoxESS 云 API 获取太阳能逆变器（例如，Enpal 系统中使用的逆变器）的实时数据，并公开 ioBroker 状态以用于家庭自动化：

- 实时监测太阳能发电量
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
- **`batDischarge`**: 电池放电功率 (kW)

### 连接状态
- **`info.connection`**: 连接状态，每天调用 1440 次。以 60 秒为间隔，此限制得到了充分利用（1440 分钟 = 24 小时）。

## 数据点
适配器会创建以下数据点：

- `foxesscloud.0.pvPower` - 光伏发电功率 (kW)
- `foxesscloud.0.generationPower` - 发电功率/输出功率 (kW)
- `foxesscloud.0.soc` - 电池电量 (%)
- `foxesscloud.0.load` - 负载功率 (kW)
- `foxesscloud.0.gridConsumption` - 电网消耗/进口 (kW)
- `foxesscloud.0.feedinPower` - 馈入/输出功率 (kW)
- `foxesscloud.0.batCharge` - 电池充电功率 (kW)
- `foxesscloud.0.batDischarge` - 电池放电功率 (kW)
- `foxesscloud.0.info.connection` - 连接状态

＃＃ 安装
1. 从 ioBroker 管理界面安装适配器
2. 创建一个新实例
3. 配置：
- **API令牌**：您从FoxESS云门户获得的API密钥
- **序列号 (SN)**：逆变器的序列号。
- **更新间隔**：数据刷新间隔，单位为秒（默认值：60，最小值：60）
4. 保存并启动实例

### 如何获取您的 API 凭证
1. 登录 [FoxESS Cloud](https://www.foxesscloud.com)
2. 前往您的个人资料/设置
3. 生成 API 密钥（令牌）
4. 在设备列表中查找逆变器序列号

## 隐私与数据处理
此适配器仅使用您的个人 API 令牌从 **FoxESS Cloud API** 读取数据。
您的 API 令牌以加密形式存储在 ioBroker 数据库中。

## 较早的更改
- [CHANGELOG_OLD.md](CHANGELOG_OLD.md)

## Changelog
<!--
	### **WORK IN PROGRESS**
-->
### 0.1.7 (2026-02-28)
- (skvarel) Fixed: Issue detected by repository checker.

### 0.1.6 (2026-02-01)
- (skvarel) Improved: Use node: prefix for core modules and adapter timer wrappers for better compatibility
- (skvarel) Fixed: Added .env.example to .gitignore

### 0.1.5 (2026-01-31)
- (skvarel) Improved: Removed unnecessary devDependencies (eslint, should, dotenv) to follow ioBroker best practices.
- (skvarel) Improved: Updated test scripts to use standard mocha command instead of hardcoded paths.
- (skvarel) Improved: Switched Node.js core module imports to node:xxx format where applicable.
- (skvarel) Improved: Enforced minimum and maximum interval limits for data polling to comply with Node.js timer restrictions.
- (skvarel) Improved: Code formatting and configuration files updated for consistency with ioBroker standards.
- (skvarel) Fixed: Addressed review feedback for ioBroker latest repository inclusion.
- (skvarel) Added: Full multi-language support for all state names (EN, DE, RU, PT, NL, FR, IT, ES, PL, UK, ZH-CN).

### 0.1.2 (2026-01-23)
- (skvarel) Fix .vscode/settings.json

### 0.1.1 (2026-01-23)
- (skvarel) Remove mocha from devDependencies (included in @iobroker/testing)
- (skvarel) Add .vscode/settings.json with JSON schema definitions

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