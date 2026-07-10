---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.sunenergyxt500/README.md
title: ioBroker.sunenergyxt500
hash: qNrNH04U1gZ07RGJvsZJUnseMJ7UchU0mY3+gqiBJ/M=
---
![标识](../../../en/adapterref/iobroker.sunenergyxt500/admin/sunenergyxt500.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.sunenergyxt500.svg)
![下载](https://img.shields.io/npm/dm/iobroker.sunenergyxt500.svg)
![安装数量](https://iobroker.live/badges/sunenergyxt500-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/sunenergyxt500-stable.svg)
![NPM](https://nodei.co/npm/iobroker.sunenergyxt500.png?downloads=true)

# IoBroker.sunenergyxt500
**测试：** ![测试与发布](https://github.com/Creekhail/ioBroker.sunenergyxt500/workflows/Test%20and%20Release/badge.svg)

## Sunenergyxt500 ioBroker 适配器
通过设备的**本地HTTP API**实现**[SunEnergyXT 500 / 500 PRO 交流耦合混合电池储能系统（制造商：SunEnergyXT）](https://www.sunenergyxt.com/))的集成和自主消费控制——无需云账户。一个实例最多可管理三个存储头（存储塔）。

## 语言 / Sprache
- [英文](README.en.md) (默认)
- [德语](README.de.md)

＃＃ 特征
* 在单个实例中管理 **一到三个头**，每个头在其自己的子树 `heads.<n>.*` 下，加上组合的 `total.*` 聚合。
* 轮询本地 API (`GET /read`) 并将所有稳定字段镜像到状态：SoC、电池/电网/负载/光伏功率、每个 MPPT 电流/电压、每日能量计数器、每个电池组的 SoC、设备/固件信息和电表状态。
* 可写控制字段（`POST /write`，需重新读取确认），与官方集成控制界面一致，但API文档中标记为*保留*的字段除外：电网设定点`GS`、最大馈入量`IS`、SoC限制`SI`/`SA`/`SO`、自用模式`MM`、电表配置`MD`、时区`TZ`、重启`RT`、最大电网输出`MG`、`LFB`/`LPS`/`PM`开关以及本地模式`LM`（⚠️ `LM=1`会阻止云端/应用程序控制，直到重置）。保留字段（例如`PT`、`SI1`、`SA1`）仅以只读方式公开。
* 两种可切换的**控制模式**：适配器侧自用**控制器**（从*任何* ioBroker 计量状态写入 `GS`，前馈 + P，带看门狗/故障保护），**将一个电网设定点分配到所有电网头**，或**设备自调节**（将支持的计量表绑定到单个存储中，并让设备自行控制）——此外还有一个用于纯粹监控的**关闭**模式。
* 管理后台中的“测试所有头”按钮会在保存之前检查每个已配置头（型号 + SoC）的可达性。
* 连接指示器（`info.connection`）加上`info.lastUpdate`，以及每个头部的`online`/`lastError`。
* 每个 head 的完整、未经修改的 `/read` 响应都保存在 `heads.<n>.info.rawResponse` (JSON) 中，因此适配器未映射到专用状态的任何字段仍然可以从那里读取。

## 此适配器的工作原理
此适配器在**本地**控制存储，无需使用厂商云。单个实例可管理**一到三个存储头**（存储塔）。自用存储可通过**两种互斥的方式**进行管理——您可以通过**控制模式**设置选择其中一种：

**模式 B — 适配器控制器（默认推荐，适用于任何电表，1-3 个表头）。** ioBroker 从**您指定的任意状态**（`gridPowerStateId`）读取当前电网功率，适配器写入电网设定值 `GS`（前馈 + P 校正，带看门狗）。电表可以是 ioBroker 支持的*任何*电表——Shelly、Tasmota、智能电表/Modbus 适配器——**包括存储设备无法读取的电表**。您需要提供一个状态来保存**以瓦特为单位的净电网功率**（`>0` = 消耗，`<0` = 馈入；如果源符号相反，请启用*反转源符号*；对于千瓦/分相导入/导出/单相电表，请先在 ioBroker 的一个小状态中计算出干净的净值）。如果使用多个充电头，控制器会计算**一个**总设定值，并将其**平均分配给所有在线充电头**——分配量均等，但每个充电头的分配量都受到其功率限制。如果充电头已满（正在充电）或未满（正在放电），则跳过该充电头；其分配的功率将重新分配给其他充电头。适配器会强制每个充电头执行`MM=0`，以便设备执行`GS`，从而使电表在ioBroker中保持完全可用。

**模式 A — 设备自调节（支持的电表，仅限单头）。** 适配器将支持的电表**绑定到存储**（`MM=1` + `MD`），并允许**设备自调节**——即制造商自身的能耗，其反应速度可能比外部回路更快。此模式**仅适用于单头**；如果配置了两个或三个电表，则无法选择此模式——请改用适配器控制器。仅支持四种电表类型（EcoTracker、Shelly 3EM、Shelly Pro 3EM、Tasmota），并且电表必须可通过 LAN 上的存储访问。在此模式下，适配器**不会**写入 `GS`。绑定仅通过 mDNS/HTTP 轮询实现，因此电表**在 ioBroker 中仍然可用**——这与制造商应用程序的电表设置不同，后者可以重新配置电表并将其从 ioBroker 中移除；此适配器直接绑定，避免了这个问题。

**关闭（默认，仅监控）。** 适配器不会写入 `MM`/`MD`/`GS` 状态；它只会轮询。您仍然可以手动控制 `control.*` 状态。

在两种控制模式下，适配器**拥有`MM`**：每次轮询时，它都会检查每个控制头的`MM`是否与所选模式相符，如果其他因素更改了该模式，则会重新确认（并发出警告）——因此，意外的计量器绑定或外部脚本无法静默地禁用控制。注意：控制头仅在`MM=0`时才会执行已写入的`GS`；如果绑定了计量器（`MM=1`），则会进行自我调节并忽略`GS`。

**多个电源头必须连接在不同的相上。**这是运营商的电气责任——适配器不会（也无法）进行验证。控制器调节电表显示的**净（总和）电网功率，这是德国标准双向净计量电表计费的方式；逐相优化不在考虑范围内。

**必须启用本地模式 (`LM=1`)。** 仅当启用本地模式时，每个设备才会提供其本地 HTTP API (`/read` / `/write`)。如果本地模式关闭，`/read` 将不会返回任何数据（已在测试固件上确认）。启用本地模式还会关闭云端/应用程序远程控制；因此，制造商的手机应用程序将无法再控制该设备。

＃＃ 要求
* 本地网络中可连接 1 至 3 个 SunEnergyXT 500 (`PK=1`, 800 W) 或 500 PRO (`PK=2`, 2400 W) 灯头（混合型号也可以）。
* **每台设备均已启用本地模式 (`LM=1`)**——本地 HTTP API 需要此模式才能传递值（请参阅“此适配器的工作原理”）。此操作还会禁用云端/应用远程控制。
* 根据控制模式的不同，需要一个电表：**模式 B**（适配器控制器）使用任何电网功率可通过 **ioBroker 状态** 获取的电表；**模式 A**（设备自调节，单头）使用 LAN 存储可访问的四种受支持的电表之一（EcoTracker、Shelly 3EM、Shelly Pro 3EM、Tasmota）。在 *关闭* 模式下不需要。

＃＃ 安装
1. 在 ioBroker 管理界面打开 **适配器**，搜索 **sunenergyxt500** 并安装它。
2. 安装完成后，将创建一个名为 `sunenergyxt500.0` 的实例。打开其设置，输入**Head 1 的 IP 地址/主机名**（如果有多个 Head 节点，请添加**Head 2 / Head 3**）。将**控制模式**设置为*关闭*，以进行纯粹的监控。
3. 保存并关闭 — 适配器开始轮询并填充 `sunenergyxt500.0.heads.*`（和 `total.*`）下的对象树。

＃＃ 配置
**联系**

* **存储头 1 IP 地址/主机名**（必填）和 **存储头 2 / 存储头 3**（可选）——存储头的本地地址，每个存储头可添加标签（可选）。此实例最多可管理三个存储头。请将多个存储头连接到**不同的相**上（由运营商负责）；适配器会调节**总和**电网功率。同一地址不能输入两次。
* **测试所有磁头** — 探测每个已配置的磁头并报告型号 + SoC（或错误），以便您在保存之前验证地址。
* **轮询间隔（秒）** — 通过 `/read` 查询每个头部的频率（默认 5 秒）。
* **请求超时（毫秒）** — HTTP 超时（默认 8000 毫秒）。

**控制** — 选择一种**控制模式**：

*关闭*（默认）— 仅监视；适配器永远不会写入 `MM`/`MD`/`GS`。

*适配器控制器*（模式 B）— 字段：

* **电网电源状态** — 代表您家电表所连接电网电源的外部状态。约定：`>0` 表示从电网取电，`<0` 表示从电网接入。如果您的电表采用相反的约定，请启用**反转电源符号**。
* **自适应控制**（默认开启）：采用制造商验证过的三个等级进行调节——小幅偏差缓慢调节（每 7 秒，步长 20 瓦），中等偏差每 2.5 秒调节（120 瓦），大负载步长立即调节（450 瓦），并设有 5 瓦的固定死区。禁用此功能后，可通过增益/死区/写入间隔/步长限制字段手动调节控制器（这些字段仅在禁用后显示）。
* **目标电网功率**（W，默认值 0）：0 = 零馈入；正值保持少量有意的电网汲取（从不馈入），负值保持少量有意的馈入 — 与源状态相同的符号约定（`>0` = 汲取）。
* **每次校正的最大调整量**（W，默认值 500，0 = 无限制）：限制每次控制步长设定点移动的距离，因此高增益不会在仪表尖峰时过冲。
* **增益**（默认值 0.3），**死区**（瓦），**最小写入间隔**（毫秒），**单头写入死区**（瓦——单头设定值被重新写入前的最小变化量，以避免分频偏移时出现抖动）。每个磁头的最大功率由设备**自动检测**（500 型号为 800 瓦，500 PRO 型号为 2400 瓦），因此混合配置无需额外配置即可正常工作。
* **看门狗警告/故障保护** — 如果电网源失效，控制器会记录一条警告，并最终强制所有磁头的 GS 设置为 0（安全中立），直到电网源恢复。看门狗遥测数据在 `controller.*` 下公开。

控制器在校正之前会读取每个设备的实际电网功率（`GP`），这样当设备内部限制（例如通过 SoC）时，就能提供自然的防饱和功能。

*设备自调节*（模式 A，**仅限单头**）— 字段：

* **仪表类型** — EcoTracker / Shelly 3EM / Shelly Pro 3EM / Tasmota。
* **电表序列号/IP地址** — Shelly/Tasmota 的序列号（通过 mDNS 解析），或 EcoTracker 的 LAN IP 地址（直接解析）。对于 Tasmota，请使用序列号前缀，但去掉最后 4 个字符，并将**电源密钥**设置为与您的能源监控器子类型相匹配的值。

适配器绑定计量表（`MM=1` + `MD`），设备自行调节；适配器不会写入 `GS`。绑定的计量表在 ioBroker 中仍然可用。一旦配置了第二个或第三个表头，此模式将被隐藏/禁用。

> **安全须知：** 在*关闭*模式下，适配器为只读模式——它仅轮询`/read`状态，除非您发出`control.*`状态指令，否则不会写入任何数据。在控制模式下，适配器**强制该模式下的每个磁头使用`MM`状态**，并在外部更改该状态时重新置位；**请勿**同时运行第二个`GS`写入器（例如您自己的脚本，或带有不同仪表的设备的`MM`写入器），否则它们会争用电池。

## 控制行为、精度和限制
**预期效果：** 控制器会将电网功率保持在零功率附近**±10–20 W**的范围内，并根据设置，在**约1–3秒至约30秒**内校正负载阶跃。**根据设计，任何控制器都无法在此硬件上实现永久、精确的0.0 W：**

* **仪表精度和噪声：** 外部仪表本身的测量误差和噪声在几瓦以内——低于此值的调节毫无意义。（“GS”设定点的分辨率为1瓦，因此设定点的精细度并非限制因素。）
* **测量链延迟：** 仪表测量 → ioBroker 状态 → 控制器 → `/write` → 设备斜坡。在负载阶跃及其修正之间，不可避免地会间隔约 1-3 秒。
* **负载动态：**压缩机或电水壶的切换发生在毫秒级——所有控制器随后才会做出反应。图表中出现的短暂功率尖峰是正常的，并且在能量上没有意义（以瓦秒为单位）。
控制器会根据设定的**目标电网功率**（默认值为 0）进行调节，并围绕该目标功率**对称**振荡——短暂的小幅并网瞬间属于零并网状态。如果您绝对不能并网，请将目标功率设置为一个较小的预期值（例如 +10 W）。

**设置的作用方式：**

| 设置 | 效果 | 较小值 | 较大值 |
|---|---|---|---|
| **增益** | 每步校正偏差的比例 | 缓慢、平滑（0.3 ≈ 7 步到 ~0） | 快速（1.0 = 一次校正），但对仪表噪声的反应较差；>1 可能过冲 |
| **目标电网功率 (W)** | 电网功率调节至的值 | <0 = 主动馈入 | >0 = 主动消耗（“从不馈入”） |
| **每次校正最大调整量 (W)** | 限制每步设定点的移动幅度 | 抑制高增益下的仪表峰值 | 数值越大（或 0 = 无限制），对巨大的负载阶跃反应越快 |
| **死区 (W)** | 低于死区的偏差将被忽略 | 更精确，写入更多（0 = 全部正确） | 更稳定，留下较小的永久偏差 |
| **最小写入间隔** | 校正频率 | 更快的稳定速度（最低 1000 毫秒） | 更少的设备写入次数，更慢的跟踪速度 |
| **单头写入死区** | 抑制磁头间的微小重新分配（多磁头） | 更精确 | 更少抖动 |

**自适应控制**（默认设置）会根据不同的功率等级自动调整功率。手动模式下，提供两种经过验证的配置文件：*放松模式*（默认设置——平稳运行，设备写入量极少，功率范围±20–30 W）和*精确模式*（增益0.8–1.0，死区0，间隔1000毫秒，写入死区0——功率范围±10–20 W，稳定时间为1–3秒）。一天下来，两种模式的能量平衡几乎相同——区别仅在于图表显示效果，而非实际成本。

## 符号约定
* `GP`（电网功率）：`>0` = 馈入，`<0` = 消耗 — **与 Shelly 电表相反** (`api.GP ≈ −shelly.gridPower`)。
* `BP`（电池电量）：`>0` = 充电，`<0` = 放电。
* `GS`（电网设定点）：`>0` = 馈入/放电，`<0` = 电网充电（Pro 上为 ±2400 W，分辨率为 1 W）。

## 对象树
每个头部在 **`heads.<n>.*`** (`n` = 1…3) 下都有自己的子树，此外还包括组合的 **`total.*`** 聚合以及适配器级别的 `controller.*` / `info.*`。在头部内部，状态被分组到主题通道中；**每个对象 ID 的叶子节点是设备的 API 字段代码**（来自官方字段参考的实体 ID），双语对象名称对其进行描述——因此，该树与设备文档中的字段一一对应。

| 频道 | 内容 |
|---|---|
| `heads.<n>.battery.*` | SoC (`SC`)、电池功率 (`BP`)、单包 SoC (`SC0`–`SC5`)、在线包 (`ON`)、SoC 滞后 (`SI1`/`SA1`) |
| `heads.<n>.load.*` | 负载功率（`LP`），每日离网负载能量（`LD`） |
| `heads.<n>.pv.*` | 总光伏发电量 (`PV`) 和每个 MPPT 的功率/电流/电压 (`mppt1`–`mppt4`) |
| `heads.<n>.system.*` | 总输入/输出功率 (`IW`/`OP`) |
| `heads.<n>.device.*` | 类型/型号/序列号/状态；`network.*`（IP、端口、Wi-Fi）；`firmware.*`（`ES`/`AS`/`DS` 软件，`EH`/`AH`/`DH` 硬件，`BS0`–`BS5` 电池管理系统） |
| `heads.<n>.meter.*` | 外部计量表状态 (`MS`) |
| `heads.<n>.ups.*` | UPS 模式 / 电网充电 / 旁路 (`UO`/`UG`/`FP`) |
| `heads.<n>.fault.*` | 故障位掩码 (`TF`/`EF`/`DF1`/`DF2`/`AF1`/`AF2`/`BF`) — 仅在故障处于活动状态时填充 |
| `heads.<n>.control.*` | 所有**可写**字段（见下文） |
| `heads.<n>.info.*` | 每人 `online`, `lastError`, `rawResponse` (完整原始数据 `/read`) |
| `total.*` | 综合视图：容量加权 `soc`，总和 `batteryPower` / `gridPower` / `maxPower`，`onlineCount` |
| `controller.*` | 自用控制器遥测数据（`status`，电网电源老化） |
| `info.*` | `connection`（任何可达的头部）和 `lastUpdate` |
| `info.*` | `connection`（任何可达的头部）和 `lastUpdate` |

### 可写控件 (`heads.<n>.control.*`)
根据 ioBroker 的约定，所有可写字段都位于每个标题的 `control.*` 下。由于这样可以简化它们的主题，下表显示了每个字段所关联的内容：

| 对象 | 字段 | 相关 | 描述 |
|---|---|---|---|
| `control.GS` | GS | 电网 | 电网功率设定点（`>0` 馈入 / `<0` 电网收费） |
| `control.MG` | MG | 电网 | 最大并网输出功率 |
| `control.SI` | SI | 电池 | 最小放电荷电状态（网格模式） |
| `control.SA` | SA | 电池 | 最大充电状态 (网格模式) |
| `control.SO` | SO | 电池 | 最小放电荷电状态（离网模式） |
| `control.MM` | MM | 模式 | 本地零馈入/自消耗模式（与 `MD` 耦合） |
| `control.MD` | MD | meter | 电表连接 JSON（与 `MM` 结合使用） |
| `control.LM` | LM | 模式 | 本地模式（⚠️ `1` 阻止云端/应用控制） |
| `control.LFB` | LFB | 模式 | 负载优先级开关 |
| `control.LPS` | LPS | 模式 | 离网输出开关 |
| `control.PM` | PM | 模式 | 并行模式 |
| `control.TZ` | TZ | 设备 | POSIX 时区 |
| `control.RT` | RT | 设备 | 重启设备（按钮 — 软重启，**不是**完全断电重启） |
| `control.RT` | RT | 设备 | 重启设备（按钮 — 软重启，**不是**完全断电重启） |

提示：在 ioBroker 管理后台，您还可以按 *writable* 标志筛选对象列表，一次性找到所有控件。

`device.PK`源自不再报告`PK`的固件上的`DevType`。保留字段（`PT`、`SI1`、`SA1`）以只读方式公开。制造商已删除的字段（`PD`、`UP`）或仅供文档使用的字段（`WT`、`BN`）未公开；任何未映射的内容仍可在`heads.<n>.info.rawResponse`中找到。

## 手动计量/模式字段（MM/MD）
`MM`/`MD` 是每个灯头基于计量表计算的自耗电量。当您选择**控制模式**时，适配器会自动管理这些耗电量（模式 A 会将 `MM=1` + `MD` 设置为单个灯头；模式 B 会强制所有灯头使用 `MM=0`），并且其保护机制会在下次轮询时重新设置与模式对应的 `MM`——因此，任何手动更改控制模式的操作都是暂时的。

原始字段保持可写状态，供专家/手动使用（例如，在*关闭*模式下）。它们遵循官方的关联规则：关闭 `MM` 也会清除 `MD`，写入 `MD` 会启用 `MM`（非空）或禁用它（为空）。四种受支持仪表的 `MD` JSON 格式位于设备的本地 API 参考文档中；在*设备自调节*模式下，适配器会根据仪表类型和序列号/IP 地址自动构建这些格式。

## 局限性
* **每个实例最多可连接三个喷头。** 单喷头操作已在实际硬件上验证；多喷头分割功能已通过单元测试覆盖，但截至撰写本文时，**尚未在实际的 2-3 喷头安装环境中进行测试**——非常欢迎来自多喷头设置的反馈。*设备自调节* 仅适用于单喷头。
* **电源头必须位于不同的相位上**（操作人员的责任）。适配器调节的是**总电网功率**，而不是每相功率。
* 每个电池组的均衡由每个电池头自身的 BMS 处理——适配器仅控制电池头的整体功率，并读取 `battery.SC`（总计）进行控制；它不管理单个电池组。
* 每日能量计数器（`GD1`/`GD2`/`LD`）是原始的**瓦时**，而不是千瓦时。
* `MD` 和 `TZ` 会立即生效，但不保证设备会逐字逐句地回放——请根据效果确认，而不是根据回放确认。
* **光伏输入未经硬件测试**（参考安装未连接光伏组件，因此`PV1–4`始终为0）。集成和控制器与光伏组件无关且功能齐全，但光伏固件的极端情况（例如电池满电+光伏剩余电量、UPS/旁路字段`FP`/`UG`）未经验证——欢迎反馈。

## 故障排除
* **`info.connection` 保持 `false` / 无数据：** 首先确保设备上已启用**本地模式 (`LM=1`)** - 如果没有启用，本地 API 将不会返回任何值。然后验证是否可以从 ioBroker 主机访问 `http://<设备 IP>/read`（使用浏览器或 `curl` 进行测试）。对于每个请求头，`heads.<n>.info.online` 和 `heads.<n>.info.lastError` 分别显示哪个请求失败。
* **未进行任何控制：**检查**控制模式**——*关闭* 不会写入任何数据。在*适配器控制器*中设置有效的**电网电源状态**；在*设备自调节*中设置支持的**电表类型**和**序列号/IP地址**。
* **设备忽略 `GS` / 电池无响应：** 磁头仅在 `MM=0` 时执行写入的 `GS`。在*适配器控制器*模式下，适配器会强制执行此设置；如果您手动写入 `GS`，请确保未绑定任何计量器（`MM=0`）。如果绑定了计量器（`MM=1`），设备将进行自我调节并忽略 `GS`。
* **控制器响应速度过慢/无法精确达到 0：** 请参阅“控制行为、精度和限制”——测量链会增加约 1-3 秒的延迟，且仪表本身的精度有限，因此目标值周围 ±10-20 W 的范围内是物理上的最佳设置。为了获得最快的响应速度，请使用“精确”模式（增益 0.8-1.0，死区 0，最小写入间隔 1000 毫秒）；为了避免馈入，请将**目标电网功率**设置为一个较小的正值。
* **状态时间戳看起来过时 / 质量标志 32：** 适配器仅在状态值发生变化时才写入状态（标准做法——防止状态数据库被数百万次重复写入）。因此，状态的时间戳显示的是上次值*变化*的时间，而不是上次轮询的时间。可通过 `info.lastUpdate`（每次成功轮询后更新）和 `heads.<n>.info.online` 检查数据新鲜度。质量标志 32（“替换初始值”）仅保留在设备从未提供的状态上（例如，未安装的扩展包的 SoC）；每次适配器启动后，所有已提供的值都会被写入一次，因此它们的时间戳至少与启动时一样新。
* **两个控制器会争用电池：**请只运行一个。适配器会强制在所选模式下使用 `MM` 模式——在使用控制模式之前，请禁用任何外部 `GS` 脚本（或设备自身使用不同计量器的 `MM` 脚本）。
* **某些状态为空（`0` / `""`）：**设备仅返回其固件/拓扑实际提供的字段（例如，额外的数据包 `SC2`–`SC5`，或仅在发生故障时返回的故障位掩码）。完整的原始响应始终可在 `heads.<n>.info.rawResponse` 中找到。
* **从单头版本更新后，树看起来不对劲：** 0.2.0 版本中，对象树被重构为 `heads.<n>.*`。适配器会在启动时自动删除过时的对象；如果还有残留，请删除旧对象（或重新添加实例）。

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 0.2.7 (2026-07-05)
* (Creekhail) New **adaptive control** (enabled by default): the controller regulates in three manufacturer-proven tiers — small deviations gently (every 7 s, 20 W steps), medium ones every 2.5 s (120 W), large load steps immediately (450 W), with a fixed 5 W dead band. Disable the new checkbox to keep tuning gain, dead band, write interval and step limit manually. **Existing installations are switched to adaptive by this update** (uncheck to return to your manual tuning).
* (Creekhail) Admin: help texts for gain, dead band and min. write interval; requires admin >= 7.8.23; CHANGELOG_OLD.md added and the Dependabot auto-merge workflow aligned with the canonical template (iobroker-bot).

### 0.2.6 (2026-07-04)
* (Creekhail) Controller: new **target grid power** (deliberate small draw or feed-in — e.g. +10 W to never feed in; the manufacturer's HA blueprint offers the same option) and a **maximum adjustment per correction** step (default 500 W) that allows a high gain without overshoot on meter spikes.
* (Creekhail) Documentation: corrected the setpoint-granularity statement — the device accepts `GS` with 1 W resolution (previously documented as 10 W steps); the practical accuracy limits are measurement-chain latency and meter noise.

### 0.2.5 (2026-07-02)
* (Creekhail) Review follow-up: added the manufacturer/product link to the README, and the controller now only accepts acknowledged grid-power values (`ack=true`) from the configured meter state (a manually written test value can no longer drive the battery).

### 0.2.4 (2026-07-02)
* (Creekhail) State names are now provided in all ioBroker languages: English and German stay hand-written, the other languages are machine-translated (generated file, merged at object creation; existing installations are updated in place).

### 0.2.3 (2026-07-02)
* (Creekhail) Object-tree compliance for the repository review:
  * The `heads` container is now a **folder** so the hierarchy follows the required device→channel→state order.
  * The switch states `control.MM` / `LM` / `LFB` / `LPS` / `PM` are now real **booleans** (previously 0/1 numbers) — adjust scripts that read or write them; the device still receives 0/1.
  * Corrected roles: `GS`/`IS`/`MG` use `level`, `ups.UO` uses `value`.
  * Object definitions are merged onto existing objects on start, so role/type/name updates reach existing installations (user settings like history configs are preserved).

### 0.2.2 (2026-07-02)
* (Creekhail) Repository-checker compliance: complete admin translations in all languages (including the validator messages), release notes translated into all languages, removed an unknown jsonConfig property from the test button and use the adapter-managed timer during unload.

### 0.2.1 (2026-07-01)
* (Creekhail) Controller robustness and hardening:
  * Config values of 0 are respected (gain / dead bands) instead of silently becoming defaults.
  * A failing GS write on one head no longer aborts the setpoints of the other heads.
  * Anti-windup: when a device visibly limits internally (SoC/temperature), the controller adopts the reported grid power as its feed-forward base.
  * GS is neutralized to 0 on all reachable heads when the controller stops (adapter stop/restart or leaving controller mode), so no head keeps executing a stale setpoint unwatched.
  * Heads are polled in parallel (one unreachable head no longer stretches the poll cycle); fewer state-DB reads per poll.
  * The startup object cleanup only touches adapter-managed subtrees; user-created states in the namespace survive.
  * Missing MG falls back to the model's power limit (500 → 800 W) instead of assuming a PRO; device responses are size-capped.
  * Manual GS writes are rejected (with a warning) while the controller is active; failsafe no longer retries offline heads every tick.
  * New unit tests for the controller (regulation, dead bands, throttling, failsafe, anti-windup).

### 0.2.0 (2026-06-30)
* (Creekhail) Multi-head support: manage up to three SunEnergyXT heads in one instance. The adapter controller now computes one grid setpoint and splits it across all online heads (equal split, gated by each head's SoC headroom, with per-head power caps and overflow redistribution). New per-head object tree `heads.<n>.*` and combined `total.*` aggregates; a "Test all heads" connectivity button; device self-regulation is restricted to a single head. **The object tree was restructured — existing single-head instances should be re-created (delete the old objects / re-add the instance).**

### 0.1.1 (2026-06-29)
* (Creekhail) Released via npm trusted publishing (provenance) and a package metadata fix.

### 0.1.0 (2026-06-28)
* (Creekhail) Initial release: local-API polling to states; writable control fields; two switchable control modes — an adapter-side self-consumption controller (any ioBroker meter state, feed-forward + P, with watchdog/failsafe) and device self-regulation (binds a supported meter: EcoTracker / Shelly 3EM / Shelly Pro 3EM / Tasmota); plus a monitoring-only mode, with an MM-mode guard.

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2026 Marcus Bortel (Creekhail)

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