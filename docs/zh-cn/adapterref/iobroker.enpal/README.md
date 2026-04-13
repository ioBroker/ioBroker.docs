---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.enpal/README.md
title: 无标题
hash: vKO+Q2VLzuldwLkkQcycfuE09hl4BBMfd8Wbup5+i+A=
---
![标识](../../../en/adapterref/iobroker.enpal/admin/enpal_logo.svg)

![安装数量](https://iobroker.live/badges/enpal-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/enpal-stable.svg)
![NPM 版本](https://nodei.co/npm/iobroker.enpal.svg?style=shields&data=v,u,d&color=orange)
![下载](https://img.shields.io/npm/dm/iobroker.enpal.svg)
![PayPal捐赠](https://img.shields.io/badge/paypal-donate%20|%20spenden-green.svg)

## Enpal Solar 的 ioBroker 适配器
## 此适配器的功能
从 Enpal 太阳能系统提供的本地 InfluxDB 2.x 实例读取能源数据，并公开 ioBroker 状态以用于家庭自动化：

- 监测太阳能发电量
- 跟踪电池电量状态 (SoC)
- 分析电网消耗和馈入功率
- 基于发电量的自动化
- 在 ioBroker 控制面板中可视化能量流

＃＃ 特征
该适配器直接连接到 Enpal 设备写入的**本地 InfluxDB**——无需云帐户或互联网访问。

- 自动发现存储在 InfluxDB 存储桶中的所有测量值、设备和字段
- 在 `enpal.0.<measurement>.<device>.<field>` 下动态创建状态
- 可配置轮询间隔（默认值：60 秒）
- 通过 `info.connection` 获取连接状态——当数据库无法访问时，适配器实例会变为红色。

## 数据点
数据点会根据 InfluxDB 存储桶的内容动态创建。其结构遵循以下模式：

```
enpal.0.<measurement>.<device>.<field>
```

典型示例（取决于您的逆变器和 Enpal 配置）：

- `enpal.0.solar.inverter.power` — 当前光伏发电功率 (W)
- `enpal.0.solar.inverter.energy` — 今日发电量 (Wh)
- `enpal.0.battery.storage.soc` — 电池电量 (%)
- `enpal.0.grid.meter.power` — 电网导入/导出功率 (W)
- `enpal.0.info.connection` — 与 InfluxDB 的连接状态

实际字段名称取决于您的 Enpal 系统版本和硬件配置。

＃＃ 安装
1. 从 ioBroker 管理界面安装适配器
2. 创建一个新实例
3. 配置以下设置：
- **InfluxDB URL**：本地 InfluxDB 的地址（例如 `http://192.168.1.100:8086`）
- **API令牌**：您的InfluxDB API令牌（读取权限即可）
- **组织 ID**：您的 InfluxDB 组织
- **存储桶**：Enpal 写入数据的存储桶（通常为 `enpal` 或类似名称）
- **更新间隔**：数据刷新间隔，单位为秒（默认值：`60`）
4. 保存并启动实例

### 如何查找您的 InfluxDB 凭据
1. 登录您的 Enpal 设备 Web 管理界面或通过 SSH 连接到该设备。
2. 打开 InfluxDB UI，地址为 `http://<enpal-box-ip>:8086`
3. 转到**数据 → API 令牌**并创建一个只读令牌
4. 记下“数据 → 存储桶”下的组织名称和存储桶信息。

## 隐私与数据处理
此适配器仅连接到您的**本地 InfluxDB**，不会将任何数据发送到任何云服务。
您的 API 令牌以加密形式存储在 ioBroker 数据库中。
- 不连接任何外部服务器。

## Changelog
<!--
	### **WORK IN PROGRESS**
-->
### 0.2.0 (2026-04-06)
- (skvarel) Updated minimum Node.js version requirement to >=22
- (skvarel) Normalize unit display: "Percent" is now shown as "%"

### 0.1.10 (2026-04-04)
- (skvarel) Fix prettier formatting in main.js

### 0.1.9 (2026-04-04)
- (skvarel) Update node version to 24.x for check-and-lint workflow

### 0.1.8 (2026-04-04)
- (skvarel) Fixed display of unit "None" in data points - now hidden for cleaner UI

### 0.1.7 (2026-04-04)
- (skvarel) Title and description edited

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