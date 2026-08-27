---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.ford/README.md
title: ioBroker.ford
hash: oqlZLeXYRDuTAUgs++9W9xJncNE80NKLRBmsWfBtE/8=
---
![标识](../../../en/adapterref/iobroker.ford/admin/ford.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.ford.svg)
![下载](https://img.shields.io/npm/dm/iobroker.ford.svg)
![安装数量（最新）](https://iobroker.live/badges/ford-installed.svg)
![安装数量（稳定版）](https://iobroker.live/badges/ford-stable.svg)
![依赖状态](https://img.shields.io/david/TA2k/iobroker.ford.svg)
![NPM](https://nodei.co/npm/iobroker.ford.png?downloads=true)

# IoBroker.ford
**测试：** ![测试与发布](https://github.com/TA2k/ioBroker.ford/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的福特适配器
适用于福特车辆的适配器，使用福特官方的 FordConnect 查询 API（欧盟数据法案）。

＃＃ 用法
### 先决条件
在福特开发者门户网站 <https://developer.ford.com/developer-eu> 上创建一个应用。

使用与您的 FordPass 帐户相同的电子邮件地址，设置重定向 URI（例如：

`http://localhost:8080/callback`），并记下生成的客户端 ID 和客户端密钥。

＃＃＃ 登录
1. 在适配器设置中输入客户端 ID、客户端密钥和重定向 URI 并保存。
2. 启动适配器 - 它会在日志中打印登录 URL。
3. 在浏览器中打开 URL，使用您的 FordPass 帐户登录并授权该应用程序。
4. 您将被重定向到带有 `?code=...` 参数的重定向 URI。
5. 从浏览器地址栏复制完整的重定向 URL。
6. 将其粘贴到适配器设置中的“代码 URL”字段中，保存并重新启动适配器。

适配器将代码与令牌交换，存储会话并自动刷新会话。

＃＃＃ 数据
- `{VIN}.general` - 来自车库端点的车辆信息
- `{VIN}.telemetry` - 遥测数据（SoC、续航里程、里程表读数、位置、轮胎压力等）
- `{VIN}.vehicleHealthAlerts` - 车辆健康警报
- `{VIN}.wallbox` - 壁挂式显示器数据（仅限电动汽车，如有）
- `{VIN}.departureTimes` - 电动车辆出发时间（仅限电动车辆，如有）
- `{VIN}.chargeSchedules` - 电动汽车充电计划（仅限电动汽车，如有）
- `{VIN}.remote.refresh` - 用于立即获取数据的按钮

对于车辆不可用的端点，系统会静默跳过。

FordConnect 查询 API 为只读，因此不存在发动机/锁止/充电命令。

### 配置选项
- **客户端 ID / 客户端密钥**：来自福特开发者门户的凭据
- **重定向 URI**：必须与开发者门户中注册的 URI 匹配。
- **轮询间隔**：自动遥测查询之间的时间间隔（以分钟为单位）（默认值：15）

## Sentry.io 是什么？它会向该公司的服务器报告哪些信息？
Sentry.io 是一项面向开发者的服务，用于概览其应用程序中的错误。而这个适配器正是实现了这一功能。

当适配器崩溃或发生其他代码错误时，此错误消息（也会出现在 ioBroker 日志中）会提交给 Sentry。如果您允许 iobroker GmbH 收集诊断数据，则还会包含您的安装 ID（这只是一个随机生成的唯一 ID，不包含任何其他信息）。这使得 Sentry 可以对错误进行分组，并显示有多少个独立用户受到此类错误的影响。所有这些都有助于我提供几乎不会崩溃的无错误适配器。

## Changelog

### 2.0.1 (2026-07-25)

- Switch to Ford's official FordConnect Query API (EU Data Act)
- Remove reverse-engineered FordPass login, Autonomic token and WebSocket to avoid account blocking
- Read-only telemetry: remote commands removed

### 1.1.5 (2025-12-29)

- update API headers to match latest FordPass app
- fix checkbox display in adapter configuration UI

### 1.1.4 (2025-12-27)

- fix login flow

### 1.0.5 (2024-07-09)

- Add location update option to reduce update requests

### 1.0.3 (2024-06-22)

- improve help text

### 1.0.2 (2024-05-24)

- improved failed login

### 1.0.0 (2024-05-24)

- added new login flow and public api. All new Datapoints

### 0.2.3 (2024-05-17)

- reverted domain ending setting to fix login

### 0.2.1 (2024-05-10)

- fixed login and added domain ending in settings

### 0.2.0

- Login Fix

### 0.0.14

- Improvements to prevent blocking from Ford

### 0.0.13

- removed not working detail api

### 0.0.12

- fix login

### 0.0.11

- fix login

### 0.0.8

- (TA2k) add remote control for refresh

### 0.0.7

- (TA2k) initial release

## License

MIT License

Copyright (c) 2021-2026 TA2k <tombox2020@gmail.com>

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