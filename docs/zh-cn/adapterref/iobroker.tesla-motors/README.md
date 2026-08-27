---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tesla-motors/README.md
title: ioBroker.tesla-motors
hash: ic2xztq3rX24UELsVZ/w+vk71x5uNctv7vzyjQB9ZQc=
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

**此适配器使用 Sentry 库自动向开发者报告异常和代码错误。** 更多详情以及如何禁用错误报告的信息，请参阅 [Sentry插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！Sentry 报告功能从 js-controller 3.0 开始使用。

＃＃＃ 要求
- 特斯拉账户，包含车辆或能源产品
- Node.js 版本 >= 22
- 已从 [developer.tesla.com](https://developer.tesla.com) 注册的 Tesla Fleet API 应用程序（客户端 ID + 客户端密钥）
- 车队密钥域（用于在车辆上安装虚拟密钥）

### 设置（分步指南）
适配器管理界面将引导您完成以下 4 个步骤：

#### 第一步：生成密钥对
1. 在适配器设置中点击**生成密钥对**，创建 EC 密钥对 (prime256v1)
2. 点击**复制公钥**，然后访问[fleetkey.net](https://fleetkey.net)，将其粘贴到“托管公钥”下方，并创建一个子域名（例如`abc123.fleetkey.net`）。
3. 保存后，您的公钥将托管在 FleetKey.net 上。特斯拉会在注册过程中从那里下载密钥。

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

#### 更改特斯拉示波器后重新授权
如果您之后在 Tesla Developer App 中添加或更改权限范围，现有的刷新令牌将不会自动获得这些权限。请先重置已存储的 Fleet 会话，然后再次运行 OAuth 流程：

1. 在适配器设置中启用**重置登录/令牌信息**。
2. 保存并关闭设置。适配器会删除已存储的舰队。

会话和代码 URL 以及重启。

3. 再次打开设置，生成新的授权链接并授权特斯拉

所需范围。

4. 将新的回调 URL 粘贴到 **代码 URL** 中，然后再次保存。

如果未重置已存储的会话，则新的回调 URL 将被忽略，而旧会话仍然可以刷新。

#### 第四步：安装虚拟密钥
虚拟钥匙是向您的车辆发送指令（例如锁定/解锁、控制空调、充电等）所必需的。没有虚拟钥匙，您只能读取车辆数据。您可以在适配器运行后执行此步骤。

1. 打开手机适配器设置中显示的虚拟密钥网址（或扫描二维码）
2. 特斯拉应用程序会要求您确认添加“第三方钥匙”。
3. 前往您的车辆，并将您的钥匙卡靠近中控台以确认安装。

### 远程命令
远程命令可在 `tesla-motors.0.<VIN>.remote` 下使用。

支持的命令包括：

- **锁定/解锁**: `door_lock`, `door_unlock`
- **气候控制**：`auto_conditioning_start`、`auto_conditioning_stop`、`set_temps`、`set_preconditioning_max`、`remote_seat_heater_request`、`remote_auto_seat_climate_request`、`remote_steering_wheel_heater_request`
- **充电**：`charge_start`、`charge_stop`、`set_charge_limit`、`set_charging_amps`、`charge_port_door_open`、`charge_port_door_close`、`set_scheduled_charging`
- **行李箱**: `actuate_trunk`（前/后）
- **窗口**: `window_control` (通风/关闭)
- **安全**: `set_sentry_mode`, `remote_start_drive`
- **媒体**: `media_toggle_playback`, `media_next_track`, `media_prev_track`
- **其他**：`flash_lights`、`honk_horn`、`trigger_homelink`、`schedule_software_update`

包括 `remote_auto_seat_climate_request` 在内的与空调相关的座椅和方向盘指令需要开启预热功能或启用气候控制功能。请先使用 `auto_conditioning_start` 启动空调（或启用气候控制功能），然后再发送这些指令。如果空调已关闭，特斯拉将使用 `cabin comfort remote settings not enabled` 拒绝该指令。

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

### 管理员界面和迁移说明
适配器设置使用 ioBroker 的 `jsonConfig` 管理 UI。现有适配器实例保留其保存的配置，但设置页面已重新组织，以便更轻松地维护 Fleet API 设置、Fleet 遥测桥接和字段选择。

从较旧的 2.x 版本更新时，请先打开适配器设置，验证 Fleet API 凭据、虚拟密钥域和可选的 Fleet 遥测设置，然后再开始新的 Fleet 遥测配置。

### 可选的舰队遥测模式（MQTT桥接）
从 Fleet API 迁移开始，该适配器还可以与 Tesla 的 **Fleet Telemetry** 服务配合使用，以降低轮询成本。

Fleet Telemetry 服务是可选的。如果禁用该服务，适配器将保持现有的轮询行为不变。

第一种实现方式使用**MQTT桥接器**，并特意将Fleet遥测接收器放在适配器之外：

1. 特斯拉车辆将遥测数据传输到自托管服务器

[舰队遥测](https://github.com/teslamotors/fleet-telemetry) 服务器。

2. 服务器将选定的车辆字段发布到 MQTT。
3. 适配器订阅 MQTT 主题并将数据写回。

现有的特斯拉状态树。

这样既能保持当前脚本和别名正常工作，又能减少常规的 `vehicle_data` 请求。

有关 Docker Compose、证书、TCP 直通、适配器设置和故障排除的实用、适合初学者的设置演练，请参阅 [docs/fleet-telemetry-setup.md](docs/fleet-telemetry-setup.md)。

＃＃＃＃ 要求
- 一个可访问的特斯拉车队遥测服务器

`transmit_decoded_records=true`。

- ioBroker 主机可访问的 MQTT 代理。
- 一位当地人

[车辆指令](https://github.com/teslamotors/vehicle-command) 舰队遥测配置调用的代理。

- 公共舰队遥测端点的服务器证书/CA链。
- 具备车队遥测功能和配对虚拟钥匙的车辆。

车辆必须能够通过配置的公共主机和端口访问车队遥测服务器。在许多情况下，这需要使用 TCP 直通而不是普通的 HTTPS 反向代理，因为特斯拉会直接连接到车队遥测服务器。

其他适配器设置选项如下：

- 启用遥测模式
- 用于配置车辆遥测功能的本地“车辆命令”代理 URL
- 遥测服务器主机名/端口/证书链
- MQTT 代理、主题库和凭据
- 舰队遥测字段选择和每个字段的`interval_seconds` /

可选 `minimum_delta`

- 可选的定期 Fleet API 同步，用于同步遥测数据未涵盖的数据。

#### 适配器设置
1. 运行并公开舰队遥测服务器。
2. 配置其 MQTT 数据存储，将解码后的记录发布到您的 MQTT 代理。
3. 在与 ioBroker 相同的受信任网络中运行 `vehicle-command` 代理。
4. 配置适配器设置：
- 启用**舰队遥测模式**
- 输入 `vehicle-command` 代理 URL
- 输入公共舰队遥测主机名、端口和 CA/全链 PEM
- 输入 MQTT 代理、可选凭据和主题库
5. 选择所需的字段、间隔和可选的最小增量。

**舰队遥测字段**选项卡。

6. 首先使用管理员操作**检查车队状态**。
7. 使用 **配置车队遥测** 将配置发送到车辆。
8. 使用“读取车队配置”功能验证车辆是否报告了以下信息：

配置已同步。

管理员操作会发现常见的错误原因，例如缺少虚拟密钥、固件不受支持、流媒体已禁用或达到 Fleet Telemetry 配置限制。

#### MQTT 主题格式
适配器订阅了管理界面中配置的 MQTT 主题库。使用默认主题库 `tesla-telemetry` 时，预期主题如下：

- `tesla-telemetry/<VIN>/v/<FieldName>` 用于遥测值
- `tesla-telemetry/<VIN>/connectivity` 用于连接事件
- `tesla-telemetry/<VIN>/errors/<Type>` 用于遥测错误
- `tesla-telemetry/<VIN>/alerts/<Type>/current` 用于查看当前警报

管理界面包含一个专门的“车队遥测字段”选项卡。特斯拉字段目录被拆分为可折叠的类别组，因此管理页面一次只需渲染/打开较小的部分。您可以在此启用/禁用各个特斯拉遥测字段，并设置每个字段的更新间隔（以秒为单位）。对于特斯拉支持的数值字段，可以配置可选的 `minimum_delta` 值。如果字段为空且管理界面显示占位符，则适配器在构建车辆配置时会使用该默认值。对于 `Location`、`OriginLocation` 和 `DestinationLocation`，特斯拉将 `minimum_delta` 解释为以米为单位，因此默认值 `100 m` 大致对应于 `0.001°` 的纬度/经度，从而避免微小的 GPS 抖动更新。此外，还为常用的百分比、续航里程、速度、温度、电流、电压、功率和能量字段提供了其他有用的默认值。适配器已映射的字段将写回现有的 Tesla 状态树。其他选定的字段将以原始值的形式存储在 `<VIN>.telemetry.fields.<FieldName>` 下，以便脚本仍然可以使用它们。

目前已映射的字段包括最常用的充电状态、电池状态、位置状态和锁定状态：

- `Soc` -> `charge_state.battery_level`
- `ChargeState` -> `charge_state.telemetry_charge_state`
- `DetailedChargeState` -> `charge_state.charging_state` 和

`charge_state.detailed_charge_state`

- `ChargeLimitSoc` -> `charge_state.charge_limit_soc`
- `ChargeAmps` -> `charge_state.charge_amps` 和

`charge_state.charger_actual_current`

- `ChargeCurrentRequest` -> `charge_state.charge_current_request`
- `ChargeCurrentRequestMax` -> `charge_state.charge_current_request_max`
- `ChargingCableType` -> `charge_state.conn_charge_cable`
- `ChargePortDoorOpen` -> `charge_state.charge_port_door_open`
- `EstBatteryRange` -> `charge_state.est_battery_range`
- `VehicleSpeed` -> `drive_state.speed`
- `Gear` -> `drive_state.shift_state`
- `位置` -> `drive_state.latitude` 和 `drive_state.longitude`
- `锁定` -> `vehicle_state.locked`
- `里程表` -> `vehicle_state.odometer`
- `VehicleName` -> `vehicle_state.vehicle_name`

内部将选择值存储为 JSON 格式，以向后兼容旧版管理后台。手动输入的 JSON 值可以是纯秒数，也可以是完整的 Tesla 字段选项：

```json
{
  "Soc": { "interval_seconds": 1, "minimum_delta": 1 },
  "ChargeState": 1,
  "DetailedChargeState": 1,
  "ChargeAmps": 1,
  "Location": { "interval_seconds": 10, "minimum_delta": 100 },
  "Locked": 1
}
```

车队遥测数据基于变化：字段仅在其 `interval_seconds` 时间过后**且**值发生变化时才会发送。如果已配置，`minimum_delta` 还会抑制较小的数值变化，然后再发送。因此，默认预设使用 `Soc` 以及 `interval_seconds=1` 和 `minimum_delta=1`，以便快速报告电池电量更新，但仅在至少变化 1 个百分点后才会报告。将字段设置为 `false` 会将其从车辆配置中排除。

启用遥测模式后，Fleet Telemetry 将作为主要实时数据源。可选的定期 Fleet API 同步仍会按照配置的**正常更新间隔**轮询常规 `vehicle_data` 端点，以便持续刷新未包含在所选遥测字段中的状态。将正常更新间隔设置为 `0` 可完全禁用此计划的 Fleet API 同步。逗号分隔的排除列表也适用于定期 API 同步轮询，并且可以包含 `vehicle_data` 端点，例如 `charge_state`、`climate_state`、`drive_state`、`vehicle_state`、`vehicle_config`、`location_data` 以及专用端点，例如 `charge_history`。

诊断状态可在 `tesla-motors.0.info.*` 下找到：

- `telemetryConnected`
- `telemetryConfigured`
- `遥测同步`
- `telemetryLastMessage`
- `telemetryLastError`
- `telemetryLastApiSync`
- `telemetryLastVehicleDataSync`
- `telemetryLastChargeHistorySync`

### 问题与讨论
<https://forum.iobroker.net/topic/47203/test-tesla-motors-v1-0-0>

<!-- 下一版本的占位符（位于行首）：

### **正在进行中** -->

## Changelog
### 3.2.1 (2026-06-05)

- (ChrMaass) Update the release tooling dependency to satisfy the ioBroker repository checker.

### 3.2.0 (2026-06-01)

- (ChrMaass) Reduce routine Fleet API polling log noise by moving frequent vehicle state and vehicle_data messages to debug while keeping anomalies as warnings.

### 3.1.1 (2026-06-01)

- (ChrMaass) Clarify Tesla OAuth re-authorization after scope changes and log missing-scope errors with a reset hint.

### 3.1.0 (2026-05-31)

- (ChrMaass) Support the normal Fleet command endpoint for vehicles that do not support or do not require the Tesla Vehicle Command Protocol.

### 3.0.1 (2026-05-31)

- (ChrMaass) Fix the Sentry README notice to match the repository checker standard wording.

[Older changelogs can be found there](CHANGELOG_OLD.md)

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