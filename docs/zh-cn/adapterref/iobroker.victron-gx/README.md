---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.victron-gx/README.md
title: ioBroker Victron GX 适配器
hash: ZorZ0inPZcPuRq5wrvs3VsENRaPumg1NqMa4PgrBtTc=
---
# IoBroker Victron GX 适配器

![NPM 版本](https://img.shields.io/npm/v/iobroker.victron-gx.svg)
![下载](https://img.shields.io/npm/dm/iobroker.victron-gx.svg)
![安装](https://iobroker.live/badges/victron-gx-installed.svg)
![执照](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/node-%3E%3D22-brightgreen)

<img src="admin/victron-gx.png" width="100" align="right">

此适配器将 ioBroker **直接且本地**连接到 [Victron Energy GX 系列设备（包括 Cerbo GX、Venus GX 和 Ekrano GX）](https://www.victronenergy.com/communication-centres)) – 无需通过 Home Assistant 或 VRM Cloud 进行任何绕行。

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/sefinads)

🇩🇪 [德语说明书](docs/README_de.md)

---

这个适配器是做什么用的？
ioBroker 通过本地 MQTT 协议直接连接到 Victron GX 设备。支持读取所有设备数据，并通过 Modbus TCP 实现完整的 ESS/逆变器控制。

所有设备数据点均**自动发现**并按 ioBroker 状态创建
可写数据点直接位于 `devices.*` 目录下——`common.write` 反映了匹配的控制开关（Modbus/MQTT）当前是否启用。
- 适用于单相和三相系统
- 自动发现 Modbus 单元 ID
- **低内存占用**：稳定占用约 130 MB
- 完全支持通过 Node-RED (`dbus-victron-virtual`) 连接的虚拟设备

---

＃＃ 要求
**在 GX 设备上：**

- 启用 MQTT：`设置 → 集成 → MQTT 访问 → 开启`
- 对于 Modbus 控制：`设置 → 集成 → Modbus TCP 服务器 → 启用`
- 写入权限：`访问级别 → 允许写入访问`

在 ioBroker 中：

- Node.js 版本 >= 22
- 管理员版本 >= 7.7.28

---

＃＃ 安装
### 通过 ioBroker 管理员界面（推荐）
由于此适配器尚未收录到官方 ioBroker 仓库中，请通过管理界面中的 npm 选项卡进行安装：

1. 打开 ioBroker 管理后台
2. 转到**适配器**
3. 点击 **GitHub/Cat 图标**（右上角）
4. 选择 **npm** 选项卡
5. 输入 `iobroker.victron-gx` 并点击“安装”。

### 安装后
1. 配置实例：
- 输入 GX 设备的 **IP 地址**
- MQTT 端口：`1883`（默认）
- 可选：**Modbus 控制**（通过 Modbus TCP 可写入 ESS/逆变器寄存器）
- 可选：**MQTT 控制**（开关、电动汽车充电器、温度设定点可通过 MQTT 写入）

> **注意：** 需要 Node.js 版本 >= 22。如果您的 ioBroker 运行在 Node.js 20 上，请先进行更新。

---

＃＃ 配置
![配置](../../../en/adapterref/iobroker.victron-gx/docs/img/victron-gx-einstellungen.png)

| 字段 | 描述 |
|-------|-------------|
| GX 设备的 IP 地址 | Cerbo/Venus/Ekrano GX 的本地 IP 地址 |
| MQTT 端口 | 默认值：1883 |
| MQTT 用户名/密码 | 仅当 GX 上配置了 MQTT 身份验证时才需要 |
| Modbus 控制 | 通过 Modbus TCP 使 ESS/逆变器（vebus、系统）数据点可写入 |
| Modbus 端口 | 默认值：502 |
| MQTT 控制 | 通过 MQTT 实现开关、电动汽车充电器和温度设定点的可写入 |

---

支持的设备
适配器会自动发现所有连接到 GX 设备的设备：

![GX设备](../../../en/adapterref/iobroker.victron-gx/docs/img/victron-gx-GX-Geräte.png)

| 设备类型 | 描述 |
|-------------|-------------|
| `battery` | 电池系统（例如 SerialBattery/LLT/JBD） |
| `grid` | 网格计量表（例如 Shelly 3EM、Carlo Gavazzi） |
| `pvinverter` | 光伏逆变器 |
| `acload` | 交流负载（包括 Shelly 1PM，带可切换输出） |
| `switch` | 可切换输出（Node-RED 虚拟开关、Shelly Pro3/Pro4/1PM、GX 内部继电器） |
| `evcharger` | 电动汽车充电器（读取 + 控制） |
| `temperature` | 温度传感器 |
| `meteo` | 气象站 |
| `tank` | 液位传感器 |
| `system` | 系统概览 |
| `系统` | 系统概览 |

---

## 对象结构
![对象结构](../../../en/adapterref/iobroker.victron-gx/docs/img/victron-gx-Objektstruktur.png)

```
victron-gx.0
├── devices.*          → All discovered devices - common.write on the individual datapoint tells
│   │                     you whether it's currently writable (see "Writable Data Points" below)
│   ├── battery.*
│   ├── vebus.*                      → Mode, Ac.In1.CurrentLimit, Hub4.* writable (Modbus control)
│   ├── grid.*
│   ├── pvinverter.*
│   ├── acload.<Group>.<Serial>.
│   │   ├── Ac.*                     → measurements (unchanged)
│   │   └── outputs.<N>.             → switchable output, if the device has one (e.g. Shelly 1PM)
│   │       ├── State                    bool, writable (MQTT control)
│   │       ├── Status                   bool, read-only
│   │       ├── Name / CustomName        string
│   │       └── Group                    string
│   ├── switch.<Group>.<Serial>.
│   │   └── outputs.<N>.             → one sub-channel per output (Node-RED: one, Shelly Pro3/4: up to four)
│   │       ├── State / Status / Name / CustomName / Group   (same as above)
│   ├── evcharger.<Serial>.          → SetCurrent, StartStop, Mode writable (MQTT control)
│   ├── temperature.<Serial>.        → Offset, Scale, FilterLength writable (MQTT control)
│   ├── meteo.*
│   ├── tank.*
│   └── system.<Serial>.             → GridSetpoint, EssMode, MinimumSoc, ... writable (Modbus control);
│                                       also carries outputs.0.* for the GX internal relay (MQTT control)
├── overview.*         → System overview (from system/0), read-only
└── info.*             → Connection status
```

`<Group>` 是一个可选的中间文件夹——仅当为该通道/设备配置了组名称时才存在。有关详细信息，请参见下文 [Shelly 集成和多渠道支持](#shelly-integration--multi-channel-support)。

---

## 设备列表（管理员）
![设备白名单](../../../en/adapterref/iobroker.victron-gx/docs/img/victron-gx-Geräte.png)

“设备”选项卡显示所有已发现的设备，包括类型、序列号、名称和数据点数量。该列表可以下载为 JSON 文件，方便您提交支持请求。

---

## 主题目录（管理员）
![所有主题](../../../en/adapterref/iobroker.victron-gx/docs/img/victron-gx-AlleTopics.png)

“所有主题”选项卡显示自上次适配器启动以来 GX 设备发送的所有 MQTT 主题。适配器处理过的主题会以 ✓ 标记。该目录可以下载为 JSON 文件。

---

## 可写数据点
自 **0.10.0** 版本起，不再存在单独的 `control.*` 树。所有可写数据点都直接位于 `devices.*` 下，紧邻其只读同级对象——对象本身的 `common.write` 会告知您（以及管理界面/可视化界面）该对象当前是否可写。此行为由两个独立的配置开关控制：

- **Modbus 控制** – `devices.vebus.*` 和 `devices.system.*` 上的 ESS/逆变器寄存器
- **MQTT 控制** – 开关（`devices.switch.*`/`devices.acload.*`/`devices.system.*` 输出），

电动汽车充电器和温度传感器校准设定点

如果开关关闭，数据点仍然存在（因此 History/Vis 绑定和脚本继续工作），但 `common.write` 变为 `false`，写入操作将被忽略，并发出日志警告 - 不会再静默地吞掉对看起来可写但实际上不可写的数据点的写入操作。

### 升级前后对比（从 0.9.x 版本升级）
| 旧版（control.\*，已在 0.10.0 版本中移除） | 新版（devices.\*） |
|---|---|
| `control.inverter.Mode` | `devices.vebus.<Serial>.Mode` |
| `control.inverter.AcIn1CurrentLimit` | `devices.vebus.<Serial>.Ac.In1.CurrentLimit` |
| `control.inverter.DisableCharge` | `devices.vebus.<Serial>.Hub4.DisableCharge` |
| `control.inverter.DisableFeedIn` | `devices.vebus.<Serial>.Hub4.DisableFeedIn` |
| `control.system.GridSetpoint` | `devices.system.<Serial>.GridSetpoint` |
| `control.system.EssMode` | `devices.system.<Serial>.EssMode` |
| `control.system.MinimumSoc` | `devices.system.<Serial>.MinimumSoc` |
| `control.system.BatteryLifeState` | `devices.system.<Serial>.BatteryLifeState` |
| `control.system.MaxFeedInPower` | `devices.system.<Serial>.MaxFeedInPower` |
| `control.system.AcFeedInEnabled` | `devices.system.<Serial>.AcFeedInEnabled` |
| `control.system.DcFeedInEnabled` | `devices.system.<Serial>.DcFeedInEnabled` |
| `control.system.DvccMaxChargeCurrent` | `devices.system.<Serial>.DvccMaxChargeCurrent` |
| `control.system.MaxDischargePower` | `devices.system.<Serial>.MaxDischargePower` |
| `control.evcharger.<Instance>.SetCurrent` | `devices.evcharger.<Serial>.SetCurrent` |
| `control.evcharger.<Instance>.StartStop` | `devices.evcharger.<Serial>.StartStop` |
| `control.evcharger.<Instance>.Mode` | `devices.evcharger.<Serial>.Mode` |
| `control.evcharger.<Instance>.Mode` | `devices.evcharger.<Serial>.Mode` |

**操作步骤：** 更新所有直接引用 `control.*` 的脚本、Vis 小部件或 Blockly 规则，如果您依赖于写入这些对象，请确保在实例设置中启用相应的切换开关（Modbus 控制/MQTT 控制）。适配器会在 0.10.0 版本首次启动时自动将配置键 `controlEnabled` 重命名为 `modbusControlEnabled`（您的设置将被保留）——`mqttControlEnabled` 保持不变。一次性清理操作会移除所有残留的 `control.*` 对象，并且在 0.10.x/0.11.x 版本中每次启动时都会记录一条警告日志作为提醒（0.12.0 版本中已移除）。

**开关现在也受到门控：** `outputs.<N>.State` 以前是无条件可写的；现在需要启用 **MQTT 控制**，与此开关下的其他所有内容一样。

### 示例
**ESS 电网设定点**（最简方法）– 写入 `devices.system.<Serial>.GridSetpoint` [W]:

- `0` → 零馈入（Victron ESS 算法将电网功率保持在 0W）
- `-3000` → 向电网输送 3000W 电力（电池放电）
- `+500` → 从电网汲取 500W 功率（电池充电）

无需保持连接——值将持久化存储。

**ESS实时设定点**（直接控制）–写入`devices.vebus.<Serial>.Hub4.L1.AcPowerSetpoint` [W]：

- 需要 `devices.system.<Serial>.EssMode = 3`（外部控制）
- 当该值不为 0 时，适配器每隔 800 毫秒重新发送该值（Victron 看门狗）。
- 设置为“0”可将控制权交还给 Victron ESS 算法

**禁用充电/馈入：**

- `devices.vebus.<Serial>.Hub4.DisableCharge = 1` → 电池将无法充电
- `devices.vebus.<Serial>.Hub4.DisableFeedIn = 1` → 逆变器将不会并网。

**DVCC 限制**（需要在 GX 上启用 DVCC）：

- `devices.system.<Serial>.DvccMaxChargeCurrent` [A]: 系统级充电电流限制（-1 = 禁用）
- `devices.system.<Serial>.MaxDischargePower` [W]：放电功率限制

**虚拟开关**（Node-RED）– 将 `outputs.<N>.State` 设置为 `true`/`false` → MQTT 写入 → GX → Node-RED → 中继

**电动汽车充电器** – 写入 `devices.evcharger.<Serial>.SetCurrent` [A] / `StartStop` [bool] / `Mode` (0=手动，1=自动，2=定时)

**温度传感器校准** – 写入 `devices.temperature.<Serial>.Offset` [°C] / `Scale` / `FilterLength`

---

## 虚拟设备（Node-RED）
该适配器完全支持使用 Node-RED 和 `dbus-victron-virtual` 包创建的虚拟设备：

- 虚拟光伏逆变器
- 虚拟交流负载
- 虚拟交换机（带组名和单个名称）
- 虚拟温度传感器
虚拟气象站
虚拟储罐传感器

---

## Shelly 集成和多渠道支持
现在已完全支持连接到 GX（Cerbo/Venus/Ekrano）集成的 Shelly 设备以及 Node-RED 虚拟交换机：

- **Shelly Pro3 / Pro4**：每个物理设备将其通道报告为共享相同序列号的独立 MQTT 设备实例。适配器会自动将它们合并到单个对象树中（`devices.switch.<Group>.<Serial>.outputs.<0..3>.*`）。
- **Shelly 下午 1 点**：测量值 (`Ac.*`) 和可切换输出 (`outputs.0.*`) 位于同一设备树的 `devices.acload.<Group>.<Serial>` 下。
- **GX 内部继电器**：一旦启用 **MQTT 控制**（请参阅[可写数据点](#writable-data-points)），内置于 GX 设备本身 (`system/0`) 中的继电器即可在 `devices.system.<Serial>.outputs.0.State` 下切换。

所有可切换输出（无论设备类型如何）都共享相同的子结构，因此通配符选择器适用于您的整个安装：

```javascript
// Every switchable output, any device type, any group
'victron-gx.0.devices.*.*.*.outputs.*.State'

// Just the custom names, for a device overview
'victron-gx.0.devices.*.*.*.outputs.*.CustomName'
```

### ⚠️ 重大变更 (v0.9.x)
开关输出以前直接位于设备通道下；现在它们位于 `outputs.<N>` 子通道下。Node-RED 的 `output_1` 被归一化为 `outputs.1`：

| 旧版本 (v0.8.x) | 新版本 (v0.9.x) |
|---|---|
| `devices.switch.<Group>.<Serial>.State` | `devices.switch.<Group>.<Serial>.outputs.1.State` |
| `devices.switch.<Group>.<Serial>.Status` | `devices.switch.<Group>.<Serial>.outputs.1.Status` |

更新所有直接引用旧路径的脚本、Vis 小部件或 Blockly 规则。

如果要删除剩余的旧对象，请在 ioBroker CLI 中运行以下命令（末尾的循环可以绕过通过管理界面删除时已知的“无效 ID：未定义”错误）：

```bash
iobroker object list | grep -oP 'victron-gx\.0\.devices\.switch\.[^.]+\.[^.]+\.(State|Status)$' \
  | while read id; do iobroker object del "$id"; done
```

### 自动清理孤立通道（可选）
如果您将通道移动到不同的组、禁用 Shelly 通道或删除 Node-RED 开关，其 MQTT 主题将消失，但 ioBroker 对象仍然存在。启用“启动时删除孤立通道”（主设置选项卡，默认关闭）可使适配器自动删除它们：

- 每次适配器启动时运行一次，仅在约 30 秒内没有发现新通道后运行（因此像 Shelly Pro3 这样的多通道设备，其实例报告的时间略有不同，不会在启动过程中受到影响）。
- 仅修改 `outputs.<N>` 通道。设备级元数据、`Ac.*` 测量值和 `overview.*` 永远不会被此操作删除。
- 如果您的设备经常离线，请将其关闭 - 在扫描运行时，尚未报告的频道将被视为孤立频道，并会被删除。

---

## Changelog

### 0.10.0 (2026-08-01)
- **BREAKING:** the `control.*` branch has been removed - writable datapoints now live directly under `devices.*`, with `common.write` gated by two config toggles (Modbus control / MQTT control). See README section "Writable Data Points" for the full old→new mapping and migration steps.
- **BREAKING:** switches (`outputs.<N>.State`) now require MQTT control to stay writable (previously unconditional).
- **BREAKING:** the config key `controlEnabled` was renamed to `modbusControlEnabled` (value preserved automatically on first start).
- EV charger control is no longer experimental - treated the same as any other device type now.
- Temperature sensor calibration (`Offset`/`Scale`/`FilterLength`) is now writable.
- A migration warning with the full old→new mapping is logged on every start in 0.10.x/0.11.x and will be removed in 0.12.0.

### 0.9.4 (2026-07-29)
- Semantic change: control datapoints (control.system.*, control.inverter.*, control.evcharger.*) are now only created when the matching control switch (controlEnabled / mqttControlEnabled) is active, and are then always writable (no more silently ignored writes). Existing objects are automatically removed when the switch is disabled. If you have scripts targeting control.*, check that the matching switch is enabled in the adapter settings. Note: disabling the switch discards the last known value of the affected control state - relevant for History adapter users (gap in the log).

### 0.9.3 (2026-07-28)
- Fixed race condition during initial object creation that caused 'no existing object' warnings after fresh installs affecting all device types.

### 0.9.2 (2026-07-28)
- Fix: control.evcharger states became writable but stateChange events were never delivered (subscribe only reacted to controlEnabled, not mqttControlEnabled)

### 0.9.1 (2026-07-27)
- Added support for EV chargers (read + experimental control) and generic temperature inputs (dbus-adc). Thanks to Samson71 for the catalog. Community testing appreciated.


### 0.9.0 (2026-07-19)

**⚠️ BREAKING CHANGES**
- Switch and AC-load outputs now live under `outputs.<N>.State/Status` instead of directly at the device folder
- Node-RED virtual switches: previously `.State`, now `.outputs.1.State`
- Anyone referencing these paths in Vis or scripts needs to update them
- Migration guide: see README section "Shelly integration & multi-channel support"

**New: Shelly device integration**
- Full multi-channel support for Shelly devices connected via Cerbo/Venus/Ekrano GX (via dbus-shelly bridge, Venus OS 3.60+)
- Tested with Shelly Plus series (Plus 1/1PM/2PM/Plug S), Shelly Plugs, Shelly Pro3 as switch, Shelly 1PM as acload
- Shelly PM devices: supported from model version 3 onward (in line with Victron's own compatibility list); older models are not supported by Victron's bridge and therefore also not reachable via this adapter
- Multi-instance merging: channels of one Shelly device are automatically merged into a single object tree via their common serial
- Shelly devices with measurement (e.g. 1PM as acload): measurement values and switchable output coexist on the same object
- GX internal relay (system/0) is now switchable as well

**New: Extended AC-load datapoints**
- `Ac.Power` (total power)
- `Ac.Energy.Reverse`, `Ac.L*.Energy.Reverse`
- `Ac.L*.PowerFactor`
- Metadata: `Role`, `IsGenericEnergyMeter`, `PhaseSetting`, `ProductId`

**New: Cleanup toggle**
- New option "Remove orphaned channels on startup" (default off)
- Cleans up leftover objects after group changes or channel deactivation
- Conservative: only removes objects whose serial is still active under another group (no data loss for offline devices)
- Available in all 11 UI languages

**Fixes**
- Object store race during parallel channel/state creation (previously caused occasional invalid-type objects invisible to the sweep)
- Group migration zombies are now removed (channel moved between groups at the GX)
- Instance tile IP address and web UI link now show the configured GX IP of the respective instance (previously showed server IP or IP from instance 0)
- Various smaller log and cosmetic fixes

### 0.8.10 (2026-07-04)
- Review fixes for official repository inclusion: English-only log messages, admin tabs and state labels; sanitized serial numbers in object IDs; completed news and localLinks translations; removed unused pollingInterval; docs cleanup; updated @iobroker/types to 7.2.2

### 0.8.9 (2026-07-02)
- chore: bump @iobroker/adapter-core to 3.4.1

### 0.8.8 (2026-06-14)
- Release 0.8.8

### 0.8.6 (2026-06-14)
- Fix: add Ac.Power to RELEVANT_PATHS for pvinverter, acload and grid devices

### 0.8.5 (2026-06-12)
- docs: add Ko-fi button and improved installation instructions

### 0.8.4 (2026-06-11)
- docs: add Ko-fi support badge

### 0.8.3 (2026-06-11)
- docs: improved installation instructions, added npm download badge

### 0.8.2 (2026-06-11)
- Fix: memory leak caused by stale device timer using native clearTimeout instead of this.clearTimeout; fix: topic catalog now only stores new topics instead of re-allocating on every MQTT message

### 0.8.1 (2026-06-10)
- Fix: remove invalid nodeVersion from io-package.json; add localLinks; add i18n for admin config

### 0.8.0 (2026-06-10)
- Topic Map and Topic Catalog as Admin tabs; dynamic device discovery without timer; Switch CustomName from Node-RED; Node.js >= 22, Admin >= 7.7.28 required

### 0.7.7 (2026-06-09)
- Add localLink to instance overview for direct GX access

### 0.7.5 – 0.7.6
- Fix: remove invalid supportedMessages from io-package.json
- Add localLink to instance overview for direct GX access

### 0.7.3 – 0.7.4
- Performance: static fast-path after 60s discovery reduces RAM to ~100MB stable
- Add meteo device support
- Fix temperature device (Humidity/Pressure)
- Fix CustomName for all devices

### 0.7.0 – 0.7.2
- Performance: state object cache reduces RAM from ~660MB to ~155MB
- Full i18n support for all state names
- Fix object structure (folder/channel hierarchy)

### 0.6.0
- Breaking: `ess.*` renamed to `control.system.*`
- `control.inverter.*` added
- All device datapoints are strictly read-only
- AcPowerSetpoint keepalive every 800ms

### 0.1.0
- Complete read support for all device types

---

[Older changelogs](CHANGELOG_OLD.md)

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 Sefina-DS