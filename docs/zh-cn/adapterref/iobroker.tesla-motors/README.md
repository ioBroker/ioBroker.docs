---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tesla-motors/README.md
title: ioBroker.tesla-motors
hash: 0ADka5jwLgihOKMHvKhc7X9AqeXOVpljg3x9oxgDcBo=
---
![标识](../../../en/adapterref/iobroker.tesla-motors/admin/tesla-motors.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.tesla-motors.svg)
![下载](https://img.shields.io/npm/dm/iobroker.tesla-motors.svg)
![安装数量（最新）](https://iobroker.live/badges/tesla-motors-installed.svg)
![安装数量（稳定版）](https://iobroker.live/badges/tesla-motors-stable.svg)
![依赖状态](https://img.shields.io/david/iobroker-community-adapters/iobroker.tesla-motors.svg)
![NPM](https://nodei.co/npm/iobroker.tesla-motors.png?downloads=true)

# IoBroker.tesla-motors
**测试：** ![测试与发布](https://github.com/iobroker-community-adapters/ioBroker.tesla-motors/workflows/Test%20and%20Release/badge.svg)

## 适用于 ioBroker 的 Tesla 适配器
通过特斯拉应用程序显示和更新所有特斯拉车辆和 Powerwall，这得益于官方的 **特斯拉车队 API**。

车辆指令（锁定、解锁、空调、充电等）适用于所有车型，包括 2021 年以后需要**端到端指令签名**（车辆指令协议）的车辆。

＃＃＃ 要求
- 特斯拉账户，包含车辆或能源产品
- Node.js 版本 >= 20
- 已从 [developer.tesla.com](https://developer.tesla.com) 注册的 Tesla Fleet API 应用程序（客户端 ID + 客户端密钥）
- 车队密钥域（用于在车辆上安装虚拟密钥）

### 设置（分步指南）
适配器管理界面将引导您完成以下 4 个步骤：

#### 步骤 1：生成密钥对
1. 在适配器设置中点击**生成密钥对**，创建 EC 密钥对 (prime256v1)
2. 点击**复制公钥**，然后访问[fleetkey.net](https://fleetkey.net) - 创建一个帐户并获取您的子域名（例如`abc123.fleetkey.net`）。
3. 将公钥上传到您的 FleetKey.net 帐户。特斯拉将在注册过程中从该帐户下载密钥。

#### 第二步：特斯拉开发者应用程序
1. 在 [developer.tesla.com](https://developer.tesla.com/request) 创建车队 API 应用程序
2. 将 **Origin** 设置为您的完整 FleetKey 子域名（例如 `https://abc123.fleetkey.net`）
3. 将**重定向 URL**设置为 `https://auth.tesla.com/void/callback`
4. 从创建的应用程序中复制**客户端 ID**和**客户端密钥**，并将它们与您的 FleetKey 域名（例如 `abc123.fleetkey.net`）一起输入到下方。

#### 第三步：身份验证（OAuth2）
1. 点击“生成授权链接”——浏览器将打开一个新的标签页，显示特斯拉登录页面。
2. 使用您的特斯拉账户登录并授权该应用程序
3. 登录后您会看到“页面未找到”的提示——这是正常现象！请从浏览器地址栏复制完整的网址。
4. 将 URL 粘贴到代码 URL 字段中，然后单击“保存并关闭”。

**警告：**切勿与任何人分享此网址！它会泄露您的特斯拉账户信息。

#### 第四步：安装虚拟密钥
虚拟钥匙是向您的车辆发送指令（例如锁定/解锁、控制空调、充电等）所必需的。没有虚拟钥匙，您只能读取车辆数据。您可以在适配器运行后执行此步骤。

1. 打开手机适配器设置中显示的虚拟密钥网址（或扫描二维码）
2. 特斯拉应用程序会要求您确认添加“第三方钥匙”。
3. 前往您的车辆，并将您的钥匙卡靠近中控台以确认安装。

### 远程命令
远程命令可在 `tesla-motors.0.<VIN>.remote` 下使用。

支持的命令包括：

- **锁定/解锁**: `door_lock`, `door_unlock`
- **气候控制**：`auto_conditioning_start`、`auto_conditioning_stop`、`set_temps`、`set_preconditioning_max`、`remote_seat_heater_request`、`remote_steering_wheel_heater_request`
- **充电**：`charge_start`、`charge_stop`、`set_charge_limit`、`set_charging_amps`、`charge_port_door_open`、`charge_port_door_close`、`set_scheduled_charging`
- **行李箱**: `actuate_trunk`（前/后）
- **窗口**: `window_control` (通风/关闭)
- **安全**: `set_sentry_mode`, `remote_start_drive`
- **媒体**: `media_toggle_playback`, `media_next_track`, `media_prev_track`
- **其他**：`flash_lights`、`honk_horn`、`trigger_homelink`、`schedule_software_update`

### 字段描述
- df：驾驶员侧
- dr：驾驶员后部
- pf：乘客前部
- pr：乘客后部
- 英尺：前行李箱
- rt：后备箱

### 技术细节
- **Fleet API**：区域端点（欧盟/北美/中国），可通过 JWT 令牌自动检测区域
- **命令签名**：ECDSA P-256 + HMAC-SHA256 通过 protobuf（车辆命令协议）
- **两个域**：DOMAIN_INFOTAINMENT（空调、充电、媒体）和 DOMAIN_VEHICLE_SECURITY（锁定、解锁、后备箱）
- **会话管理**：基于域的 ECDH 握手，基于纪元和计数器，存储在 ioBroker 状态中
- **令牌刷新**：过期前自动刷新

### 问题与讨论
<https://forum.iobroker.net/topic/47203/test-tesla-motors-v1-0-0>

<!-- 下一版本的占位符（位于行首）：

### **正在进行中** -->

## Changelog
### 2.0.0 (2026-04-12)

- (TA2k) Migrate to Tesla Fleet API with OAuth2
- (TA2k) Add Vehicle Command Protocol signing (ECDSA P-256) for post-2021 vehicles
- (TA2k) Add admin UI for Fleet API setup (key generation, credentials, virtual key)
- (TA2k) Add regional endpoint detection (EU/NA/CN) from JWT token
- (TA2k) Store session in ioBroker state to avoid restart loops
- (copilot) Adapter requires admin >= 7.7.22 now

### 1.5.0 (2025-12-28)

- (mcm1957) Adapter requires node.js >= 20, js-controller >= 6.0.11 and admin >= 6.17.14 now.
- (TA2k) powerwall backup history has been fixed
- (TA2k) Dependencies have been updated.

### 1.4.5 (2024-04-19)

- cleaned up token folder to reduce state objects

### 1.4.4 (2024-04-10)

- improve energy history data

### 1.4.3 (2024-04-10)

- fix for too many state in the powerwall energy history

## License

MIT License

Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2021-2025 iobroker-community

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