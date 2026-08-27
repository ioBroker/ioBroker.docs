---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.leapmotor/README.md
title: ioBroker.leapmotor
hash: 8QA3uSUcwt1tMocORl/MHsGWw3rsaX8QAGTM4T485Cw=
---
![标识](../../../en/adapterref/iobroker.leapmotor/admin/leapmotor.png)

![版本](https://img.shields.io/badge/version-0.6.0-blue.svg)
![许可证：MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

# IoBroker.leapmotor
非官方的 [Leapmotor](https://www.leapmotor.com/) ioBroker 电动汽车集成。已在 T03 上测试。

## ⚠️ 重要提示：请使用第二个账号
**请勿使用您的 Leapmotor 主账号！**

适配器会与 Leapmotor 云端保持永久会话。如果在 Leapmotor 应用中同时使用同一个账户，两个会话将会发生冲突，并导致对方被登出。

**推荐配置：**

1. 创建第二个 Leapmotor 帐户（例如，使用第二个电子邮件地址）
2. 在 Leapmotor 应用中，导航至：

**个人中心 → 我的车辆 → [车辆名称] → 共享成员 → 添加共享成员**

3. 输入第二个帐户的电子邮件地址并授予所有权限
4. 在适配器配置中使用第二个帐户凭据

这样，您的主帐户将始终保持登录状态。

---

＃＃ 特征
- 基于 React 的管理后台，包含仪表盘、消耗量、行程、数据点和诊断标签页
- 车辆状态轮询频率为每 1-60 分钟一次（可配置）
电池电量、续航里程、温度、胎压、GPS、车门、车窗
- 遥控器：空调（制热/制冷/通风）、车门锁/解锁、车窗、遮阳帘、后备箱、查找
- 气候控制日程安排（按工作日循环）和充电限制/充电日程安排
- 车辆支持的舒适性功能：哨兵模式、座椅加热/通风、方向盘加热、限速提示、后视镜加热
- 行程检测，包括每日里程跟踪和个人行程历史记录
- 基于可配置电价的充电成本估算
- 车辆信息和未读信息数量
- 车辆型号特定功能能力系统（不支持的功能会自动隐藏）
- 包含每周历史记录的消费统计数据
- 动态车辆仪表盘（VIS 的复合 HTML 小部件）
- 自动令牌刷新
- 图片缓存（下载一次，存储在本地）

## 测试车辆
- Leapmotor T03 ✅（已全面测试）
Leapmotor B10 / C10 / C16 – 应该可以工作，但舒适性功能的可用性尚未验证

＃＃ 安装
通过ioBroker管理界面安装。

＃＃ 配置
| 设置 | 描述 |
|---------|-------------|
| 电子邮件 | Leapmotor 账户邮箱（建议使用专用的第二个账户） |
| 密码 | Leapmotor 账户密码 |
| 车辆密码 | 4 位车辆密码 – 所有遥控指令均需输入 |
| 轮询间隔 | 状态更新间隔（分钟）（默认值：5） |

## 数据点
```
leapmotor.0.<VIN>.status.*                → Vehicle status (read-only)
leapmotor.0.<VIN>.consumption.*           → Consumption & statistics (read-only)
leapmotor.0.<VIN>.trips.*                 → Daily kilometers and trip history (read-only)
leapmotor.0.<VIN>.charging.*              → Current charging session cost/kWh (read-only)
leapmotor.0.<VIN>.pictures.*              → Vehicle images, including an animated composite image (read-only)
leapmotor.0.<VIN>.cmd.*                   → Commands (writable)
leapmotor.0.<VIN>.info.*                  → Static vehicle info (read-only)
leapmotor.0.messages.*                    → Vehicle messages from the Leapmotor app (read-only)
leapmotor.0.config.*                      → Electricity price / battery capacity used for cost estimation
```

要查看所有可用的数据点（包括所有可写命令状态），最好直接在 ioBroker 对象树中查看，或者通过适配器自身管理 UI 中的 **数据点** 选项卡查看——它列出了每个数据点及其当前值和简短描述。

### 管理员控制面板
该适配器自带基于 React 的管理选项卡（点击实例列表中的适配器图标），其中包含五个子选项卡：**仪表盘**（实时状态和远程控制）、**消耗**（每周能源使用量和成本估算）、**行程**（每日公里数和检测到的单次行程）、**数据点**（完整的数据点浏览器）和**诊断**。

### VIS 的动态车辆图像
`leapmotor.0.<VIN>.pictures.composite_html` 现在包含一个简单的、可嵌入的动画车辆图像（透明背景，无按钮或仪表盘边框——这些已移至管理选项卡）。在 VIS 中添加一个**基本字符串（未转义）**小部件，或通过 `<iframe>` 嵌入，并将对象 ID 设置为：

```
leapmotor.0.<VIN>.pictures.composite_html
```

### 可用命令（选择）
`cmd.*`下的简单开/关按钮（角色`button`，设置为`true`以触发）：

| 命令 | 描述 | 需要PIN码 |
|---------|-------------|:------------:|
| cmd.ac_heat | 开始供暖 | ✅ |
| cmd.ac_cool | 开始制冷 | ✅ |
| cmd.ac_vent | 启动通风 | ✅ |
| cmd.ac_off | 停止空调 | ✅ |
| cmd.defrost | 挡风玻璃除霜 | ✅ |
| cmd.windows_open | 打开窗口 | – |
| cmd.windows_close | 关闭窗口 | – |
| cmd.find | 查找车辆（鸣笛/闪灯） | – |
| cmd.battery_preheat | 电池预热开启 | ✅ |
| cmd.battery_preheat_off | 关闭电池预热 | ✅ |
| cmd.lock | 锁定车辆 | ✅ |
| cmd.unlock | 解锁车辆 | ✅ |
| cmd.trunk_open | 打开主干 | ✅ |
| cmd.trunk_close | 关闭主干 | ✅ |
| cmd.refresh | 触发立即状态更新 | – |

基于值的命令：

| 命令 | 描述 |
|---------|-------------|
| cmd.ac_temp | 目标温度，16–30 °C |
| cmd.ac_fan_speed | 风扇速度，1–7 |
| cmd.ac_position | 空气位置：全部 / 向上 / 向下 / 前 / 后 |
| cmd.windows_set | 窗口位置，0–100% |
| cmd.sunshade_set / sunshade_open / sunshade_close | 遮阳帘位置 (T03)，0–10 |
| cmd.charge_limit_set | 充电限制，50–100% |
| cmd.charge_schedule_enable / start / end / apply | 充电计划 |
| cmd.climate_schedule_enable / mode / time / days / apply / cancel | 循环气候计划 |
| cmd.speed_limit_set | 设置车辆速度限制（如果车辆支持） |

舒适性指令（仅当车辆型号支持该功能时创建/显示）：

| 命令 | 描述 |
|---------|-------------|
| cmd.sentry_mode_on / off | 哨兵模式 |
| cmd.seat_heat_driver / copilot | 座椅加热 |
| cmd.seat_ventilation_driver / copilot | 座椅通风 |
| cmd.steering_wheel_heat_on / off | 方向盘加热 |
| cmd.mirror_heat_on / off | 后视镜加热 |
| cmd.hotspot_on / off | Wi-Fi 热点（对 T03 无影响） |

实际显示哪些舒适性指令取决于检测到的车辆型号——有关每个型号的当前功能矩阵，请参阅存储库中的`admin-tab/src/vehicleCapabilities.js`。

## Changelog

### **WORK IN PROGRESS**
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 0.6.2 (2026-07-08)
- Fix: B10 model now correctly uses the c10 cloud status endpoint (community-confirmed), resolving empty status/trips/charging datapoints
- Fix: enabled full i18n for jsonConfig.json now that admin/i18n translation files cover all keys

### 0.6.1 (2026-07-03)
- Fix: repository checker findings - node: prefix for built-in modules, removed raw setTimeout fallback, included admin-tab i18n source in npm package, trimmed news list to 7 entries

### 0.6.0 (2026-07-03)
- Refactor: moved to standard plain-JS repository layout (main.js at repository root, supporting modules under lib/ instead of build/)
- Fix: removed dead/duplicate code, added VIN sanitization for object IDs, subscribed and acknowledged config.* states
- Fix: enforced upper bound on polling interval in code, switched picture cache from package-directory file to adapter's own file storage
- Fix: translated remaining German backend strings to English, enabled compact mode support, adapter-managed timers used throughout

### 0.5.8 (2026-07-02)
- Fix: repository checker compliance - added missing intermediate object structure (charging/consumption/pictures/trips channels), corrected invalid state roles, added real integration test

### 0.5.7 (2026-06-29)
- Fix: avoid npm transparency log conflict from a previous failed publish attempt (no functional changes vs. 0.5.5)

Older changes can be found in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 Henrik Schönhofen (backfisch88)