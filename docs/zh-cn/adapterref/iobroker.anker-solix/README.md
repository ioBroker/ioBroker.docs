---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.anker-solix/README.md
title: ioBroker.anker-solix
hash: AHcAyfPuwFJaONU3Oaj4bvkYMSuVnLhAmixGluKBJC8=
---
# IoBroker.anker-solix

![NPM 版本](https://img.shields.io/npm/v/iobroker.anker-solix.svg)

ioBroker 适配器，适用于 **Anker Solix** 电源系统（太阳能充电宝、智能电表、PPS、电动汽车充电器等）。它基于 Home Assistant 集成 [thomluther/ha-anker-solix](https://github.com/thomluther/ha-anker-solix)，并使用相同的非官方 **solixapi** Python 库。

> **支持的操作系统** > > | 操作系统 | 状态 |

> |----|--------|

> | **Linux** | 主要生产目标 — **已通过持续集成测试**（Docker、NAS、Raspberry Pi 等） |

> | **Windows** | **已在 Windows 版 ioBroker (Python 3.12+) 上进行支持和测试** |

> | **macOS** | **不支持** — 未验证自动 Python/虚拟环境安装 |

> > npm / `package.json` catalog install：仅支持 **`linux`** 和 **`win32`**。详情：[支持的平台](#supported-platforms)。

一个小型**Python桥接程序**（持久守护进程，类似于HA）轮询Anker云和可选的MQTT，然后将值作为ioBroker状态公开。可选的实体组（自v0.9.0起）与HA的作用域相对应：默认情况下仅启用**Core**以限制API负载。

＃＃ 目录
1. [免责声明和使用条款](#disclaimer--usage-terms)
2. [支持的平台](#supported-platforms)
3. [此适配器在 ioBroker 中的工作原理](#how-this-adapter-works-in-iobroker)
4. [系统要求与安装](#requirements--installation)
5. [配置](#configuration)
6. [Anker 账号及登录缓存](#anker-account--login-cache)
7. [局限性](#limitations)
8. [支持的设备](#supported-devices)
9. [状态结构和实体组](#state-structure--entity-groups)
10. [MQTT](#mqtt-managed-devices)
11. [特殊设备说明](#special-device-notes)
12. [登录/轮询故障排除](#troubleshooting-login--poll)
13. [服务](#services)
14. [致谢及延伸阅读](#credits--further-reading)
15. [更新日志](#changelog)
16. [发布](#publishing-npm--iobroker-catalog)

---

## 免责声明和使用条款
此适配器与Anker公司**无**任何关联。商标和产品名称均属于其各自所有者。

该适配器使用非官方的 Python 库与 Anker Power 的云 API（与移动应用相同）通信。该 API 可能随时更改或出现故障。不正确的设置可能会影响设备；用户在启用实例时（“帐户”选项卡）即表示接受这些风险。未来的适配器更新可能会扩展监控或控制功能。

---

支持的平台
| 平台 | 状态 | 备注 |
|----------|--------|-------|
| **Linux**（Debian、Ubuntu、Docker、Proxmox、NAS、RPi） | **主要/持续集成测试** | 推荐用于生产环境；Python 3.12+ 虚拟环境（`python3-venv`, `python3-pip`） |
| **macOS** | **不支持** | 理论上与 Linux 的 Unix 代码路径相同，但自动 Python/venv 引导**未经测试** — 不支持 npm 目录（`package.json` 没有 `darwin`） |
| **macOS** | **不支持** | 理论上与 Linux 的 Unix 代码路径相同，但自动 Python/venv 引导**未经测试** — 不支持 npm 目录（`package.json` 中没有 `darwin`） |

Linux 仍然是 ioBroker 部署的主要目标平台。Windows 系统在代码中已得到全面支持，并经过人工验证；GitHub Actions 会在 **`ubuntu-latest`** 和 **`windows-latest`** 上运行适配器测试。macOS 系统在 Python 安装测试完成之前暂不提供支持。

---

## 此适配器在 ioBroker 中的工作原理
| 层 | 角色 |
|-------|------|
| **Node.js 适配器** | 实例配置、调度、ioBroker 状态、控制队列 |
| **Python桥接器** (`python/bridge.py`) | 长会话：API + 可选MQTT（HA风格） |
| **authcache** | `iobroker-data/<instance>/authcache/<email>.json` — API 登录成功后重用 |
| **authcache** | `iobroker-data/<实例>/authcache/<电子邮件>.json` — API 登录成功后重用 |

轮询间隔应为 **60–180 秒**（与 HA 建议相同）。站点列表每个周期更新；设备/站点详细信息和能源数据以较慢的间隔运行（`deviceDetailMultiplier`，默认每 10 次轮询一次）。

> **重要提示：**云 API 是**必需的**。仅靠 MQTT 不足以获取完整的系统数据。此适配器**不能**替代本地 BLE 或 Modbus 集成——参见 [更多资源](#credits--further-reading)。

---

## 要求和安装
- ioBroker **js-controller >= 6**，**admin >= 7.6**
- **Node.js >= 22**
- ioBroker 主机上的 Python 版本需为 3.12 或更高版本：
- **Linux：** `python3-venv` + `python3-pip`（Debian/Ubuntu）— 主要生产目标
- **Windows：** Python 3.12+（可从 python.org 下载）或使用 `py -3.12`；适配器安装程序会处理虚拟环境和 **`tzdata`**。
- **macOS：** **不支持**（未验证自动安装 Python 的功能）

Python 依赖项安装到适配器文件夹（`python/.venv` 或 `python/site-packages`）。自 v0.2.0 起：启动时自动安装（**选项** → `autoInstallPython`）或点击“安装 Python 依赖项”按钮。

通过 ioBroker 安装（推荐）：

```bash
iobroker install anker-solix
```

在本地修改适配器文件后，上传实例：

```bash
iobroker upload anker-solix
```

**多主机：**如果名称包含特殊字符，请使用带引号的 `--host "PC(SmartHome)"`。

如果存在，请移除旧版符号链接：`rm -f /opt/iobroker/node_modules/iobroker.AnkerSolix`

手动配置 Python（如果需要）：

```bash
cd node_modules/iobroker.anker-solix
python3 -m venv python/.venv && python/.venv/bin/pip install -r python/requirements.txt
```

### 家庭助手（ioBroker 插件）
Home Assistant OS 上的官方 **ioBroker** 应用通常包含 `python3`，但**不包含 `pip`** 和 **不包含 `python3-venv`**。请通过 ioBroker 目录/npm 安装或更新适配器（`iobroker install anker-solix`）。从 **0.10.72** 版本开始，安装程序会检测到此配置文件并尝试：

1. 在 `python/.venv` 中使用 virtualenv（或者在 venv 中使用 `--without-pip` + pip）
2. 当系统 Python 版本为 PEP 668 时，使用 `--break-system-packages` 参数运行 `get-pip.py`。
3. `pip install --target python/site-packages` 作为备用方案

在实例管理界面：**选项** → **安装 Python 依赖项**，或者启用 **autoInstallPython** 并重新启动实例。

如果日志仍然显示 `No module named pip`，请在主机上打开 ioBroker/SSH 终端并运行：

```bash
cd /data/iobroker/node_modules/iobroker.anker-solix
node tools/install-python.js
iobroker restart anker-solix.0
```

将 **`authcache/<email>.json`** 从正在运行的 Anker 设置（例如 ha-anker-solix）复制到 `iobroker-data/anker-solix.0/authcache/`，以避免首次登录时出现验证码。

---

＃＃ 配置
1. 创建实例：`iobroker add anker-solix`
2. **账户信息：** Anker 邮箱、密码、国家代码（例如 `DE`）—— **输入密码后保存**
3. **账户：**接受非官方 API 使用（标签页底部的复选框）
4. **选项：**轮询间隔 60–180 秒，**MQTT**（如果需要），`deviceDetailMultiplier`（HA 默认值：10）
5. **设备：** **加载设备**，可选站点 ID / 设备序列号过滤器
6. **对象**（v0.9.0+）：启用可选组；默认仅启用**核心** → 更改后请**重启适配器**

除非您需要重新登录（例如账户错误、文件损坏），否则**请勿**使用**清除 Anker 登录缓存**功能。清除缓存会强制重新登录云端，并且通常会在服务器主机上触发验证码——请参阅 [故障排除](#troubleshooting-login--poll)。

---

## Anker 账号和登录缓存
首次成功登录 API 后，适配器会将令牌存储在：

`iobroker-data/anker-solix.0/authcache/<your-email>.json`

（文件名必须与**帐户**中的电子邮件地址完全一致。）

自 Anker 应用 **3.10** 版本（2025 年中）起，一个账户通常可以**同时用于多个客户端**（应用 + ioBroker + HA）。之前关于“只能使用一个令牌”的文档如今已不再那么重要，但如果 Anker 返回验证码，ioBroker **重新登录失败**后仍然无法刷新文件。

**共享/成员帐户：**家庭共享帐户可能看到的 API 详细信息比所有者帐户少（与 HA 相同）。

更多账户备注：[HA INFO.md – 账户](https://github.com/thomluther/ha-anker-solix/blob/main/INFO.md)。

---

## 局限性
- **非官方 API** — 无文档；端点随时可能更改。
- **欧盟云与加拿大云** — 配置中国家/地区错误 → 登录成功，但**没有系统/设备连接**。设备配对后请勿切换国家/地区。
- 如果设备 Wi-Fi 离线，则**云数据已过期**；启用后，请使用云/MQTT 连接指示器。
- **MQTT** 更新取决于设备的发布周期；某些值仅在**实时触发**时生效（如果 24/7 全天候运行，则流量会很高）。
- **独立设备**（PPS、充电器、不在电源系统中的冷却器）**几乎没有或根本没有 API 能源数据** — 可能需要 MQTT（[HA 限制](https://github.com/thomluther/ha-anker-solix#limitations)）。
- **动态关税**（Nordpool 除外）：预测/价格实体可能错误或为只读。
- **验证码 (100032)** 在通过 VPS/VPN/数据中心直接登录 API 时出现问题 — 请参阅[故障排除](#troubleshooting-login--poll)。如果 ioBroker 无法登录，请从 HA 或其他可用的配置中复制 `authcache`。

为了帮助添加设备：通过 HA [导出系统](https://github.com/thomluther/ha-anker-solix/blob/main/INFO.md#export-systems-action) 或 [anker-solix-api export_system.py]](https://github.com/thomluther/anker-solix-api#export_systempy)导出匿名数据。

---

## 支持的设备
与 [哈安克索利克斯](https://github.com/thomluther/ha-anker-solix#supported-sensors-and-devices)（通过 solixapi）相同的设备覆盖范围。在 ioBroker 中，数据按设备类型显示在状态 ID 下（`solarbank`、`smartmeter`、`combiner_box`、`system`、…）。

| 设备类型 | 示例/说明 |
|-------------|------------------|
| **系统/站点** | 来自 Anker 应用的电源系统（= API “站点”） |
| **太阳能充电宝** | E1600（第一代）、SB2 Pro/Plus/AC、SB3 E2700 — API + MQTT |
| **combiner_box** | 电源扩展坞（多系统）— 适用时在 ioBroker 中合并控件 |
| **智能电表** | Anker 三相电表，美国电表，Shelly 3EM / 3EM Pro |
| **逆变器** | MI80 独立式（API 中的虚拟站点） |
| **智能插座** | 2500瓦智能插座 |
| **pps** / **solarbank_pps** | 便携式电源站 — 主要基于 MQTT |
| **ev_charger** | V1 智能电动汽车充电器 — 主要支持 MQTT 协议 |
| **车辆** | ioBroker 中面向充电账户的虚拟电动汽车 |
| **powerpanel** / **hes** | 美国电源面板，X1 HES — API 功能有限，统计数据轮询频繁 |
| **充电器** | Prime / 充电站 — MQTT |
| **home_backup** | E10、AX170 — API 功能非常有限 |

设备层次结构（HA 如何构建实体）：[讨论 #239](https://github.com/thomluther/ha-anker-solix/discussions/239)。

---

## 国家结构和实体组
典型路径（实例 `anker-solix.0`）：

- `anker-solix.0.solarbank.<deviceId>.sensors.*` — 功率、SOC 等。
- `anker-solix.0.solarbank.<deviceId>.control.*` — 支持情况下的可写控件
- `anker-solix.0.<device>.<id>.statistics.*` — 每日千瓦时 (启用 **对象** → 能源统计)
- `…statistics.week.*` / `statistics.month.*` / `statistics.year.*` — 日历周、月、年总计（单位：千瓦时）（单独的实体组；在详细信息刷新时轮询，而不是每个周期轮询）
- **合并站点：**统计信息仅存储在 `combiner_box.<id>.statistics.*` 下（不会在 `system.*` 或每个 `solarbank.*` 中重复存储）。**无合并站点：**每个 `solarbank.*`（以及用于电网指标的 `smartmeter.*`）均有统计信息。API 查询仍然**每个站点一次**。
- `anker-solix.0.smartmeter.<deviceId>.sensors.*`
- `anker-solix.0.services.*` — 导出、计划、刷新（按钮状态）
- `anker-solix.0.info.connection`，`anker-solix.0.info.pythonReady`

**实体组**（管理 → **对象**）：映射到 HA 功能集 — 流、诊断、PPS、电动汽车充电器、HES、站点价格、帐户信息等。禁用组将从 API 轮询中排除，以减少负载。

---

## MQTT 管理的设备
当您需要云 API 不提供的实时数据或控制功能时（许多 PPS/EV/充电器功能），请在“选项”中启用 **MQTT**。

- 额外的传感器/控制来自 solixapi 中的 MQTT 映射（每个模型由社区解码）。
- **实时触发**和**状态请求**的行为类似于 HA 按钮——全天候自动化运行会增加流量并保持设备处于唤醒状态（[HA MQTT 部分](https://github.com/thomluther/ha-anker-solix#mqtt-managed-devices)）。
- **混合控制**（站SOC储备、交流限制、多系统电网输出）需要MQTT + API，如HA。
- 处于 **MQTT 本地模式** 的设备（例如 Power Dock 后面的 E10）通过集线器设备进行代理 — 请参阅 [HA INFO – MQTT 本地模式](https://github.com/thomluther/ha-anker-solix/blob/main/INFO.md#devices-in-mqtt-local-mode)。

解码新模型：[MQTT 指南](https://github.com/thomluther/anker-solix-api/discussions/222)，[anker-solix-api] 中的工具 `mqtt_monitor.py`](https://github.com/thomluther/anker-solix-api)。

---

## 特殊设备说明
摘自 [HA集成README](https://github.com/thomluther/ha-anker-solix)；通过 solixapi 的行为相同。

### 独立式逆变器 (MI80)
虽然它不是一个完整的“电力系统”应用程序，但云端会跟踪发电量。API 会创建一个**虚拟站点**。API 中显示的逆变器 Wi-Fi 状态通常不准确；云端连接状态更可靠。**切勿**永久更改逆变器的限制（硬件写入周期）。

### Solarbank 1 (E1600)
云端更新频率在发电/放电期间约为每 **60 秒** 次；待机状态下约为每小时一次。**调度错误：**单个全天 API 槽位可能会将输出功率设置为 **0 瓦**——如果使用输出预设值，请在应用程序中使用 ≥ 2 个槽位。自 2024 年年中以来的每日放电统计数据包含旁路光伏发电（应用程序中的数据也不正确）。可通过 HA v3.4+/3.5+ 进行 MQTT 监控/控制。

### Solarbank 2 + 智能电表
云端更新间隔通常约为 5 分钟；控制更改可能需要长达约 6 分钟才能显示在传感器中。共享帐户历史上存在实体不可用的情况（Anker 方面已修复）。部分输出限制 API 路径仍然未知。

### Solarbank 2 AC
在支持的地区，可通过控件实现按使用时间计费计划；大量使用应用程序后，云更新可能会停滞（[HA #211](https://github.com/thomluther/ha-anker-solix/issues/211)）。

### 组合式 SB2 + 级联式 SB1
Anker 云端的总计/统计数据仅反映 SB2 的数据；SB1 部分处于“黑盒”状态。当 SB2 设置为手动模式时，SB1 会强制执行最低充电计划——部分 ioBroker/HA 控制项会故意显示为“不可用”。为了正确计算充放电能量，请将每个设备的电池电量相加，而不仅仅是系统净电量 ([HA详情](https://github.com/thomluther/ha-anker-solix#combined-solarbank-2-systems-containing-cascaded-solarbank-1-devices))。

### 太阳能银行 3
智能模式、动态定价、时段模式——通常只能通过 API 进行**切换**（需先在应用中配置）。动态定价中的增值税/手续费可能仅为**缓存**设置。Nordpool 的预测最为可靠。

### 多系统电源扩展坞
最多可连接 4 个 SB3 单元；共享站点设置（使用模式、SOC 储备、并网输出）。控制功能整合在集成逻辑中的**汇流箱/电源扩展坞**上。早期部署阶段云数据可能存在延迟。多系统**交流输出限制**可能无法通过 API 更改。

### 车站控制
SOC储备、光伏/交流限制、并网输出通常需要**API+MQTT**（混合模式）。第三方光伏/电动汽车开关通常只需一次性应用设置，无法实现自动化。

### PPS / Solarbank PPS（F3000 + 美国电表）
美国家庭自动化备份；主要通过 MQTT 控制。

### 电动汽车充电器（V1）
大多数指标/控制功能通过 MQTT 传输；支持成员账户。运行模式映射到高可用性 (HA) 风格的状态机——在 ioBroker 中，请在编写脚本之前检查可用的控制选项。会话历史统计功能尚未实现（请使用状态历史记录）。

### 车辆
每个帐户的虚拟设备 EV；不通过适配器创建 — 刷新时发现。

### 配电盘和热交换器 (X1)
API 功能有限；替代方案是使用能源统计信息中的**约 5 分钟平均值**（如果启用，每个系统每天将额外消耗约 80 MB 流量）。如有需要，请在**对象**中禁用高负载类别。X1：请考虑使用本地**Modbus**（[Anker 规格](https://support.ankersolix.com/de/s/download-preview?urlname=Anker-SOLIX-X1-Series-Modbus-Protocol)）——不属于此适配器。

### 家庭备份（E10、AX170）
几乎没有系统能源方面的云端 API；E10 通常通过底座以 MQTT 本地模式运行。

### 其他/独立设备
只有在**电力系统**中才能使用完整的API；否则需要MQTT+社区解码。

---

## 登录/轮询故障排除
### 否 `authcache/<email>.json`
该文件仅在 API 登录成功后创建。如果每次登录都返回验证码，请将 [哈安克索利克斯](https://github.com/thomluther/ha-anker-solix) (`custom_components/anker_solix/solixapi/authcache/`) 中的工作文件复制到 `iobroker-data/anker-solix.0/authcache/`，文件名与 **帐户** 中的文件名相同。

### `(100032) Captcha id empty`
Anker 会屏蔽部分服务器/VPN API 登录。该库无法解决验证码。

1. 确认应用程序在同一局域网内登录；正确的**国家/地区**；ioBroker 主机上没有 VPN。
2. **不要**通过清除登录缓存来“修复”验证码。
3. 从 HA 复制 `authcache` 或在云允许时重新登录。
4. 多次尝试失败后，等待 15-30 分钟。
5. 使用适配器 **≥ 0.9.3**，这样在重启时就不会丢弃有效的缓存。

日志显示了 **0.9.4+** 版本的确切缓存路径。

### 速率限制 (26161 / 429)
增加轮询间隔；减少启用的**对象**组；适配器重试，并可能短暂回退到一次性桥接。

---

## 服务
`anker-solix.0.services.*` 下的状态（设置为 `true` 以触发）：

- `get_schedule`、`clear_schedule`、`export_systems`、`get_system_info`、`refresh_devices`

使用 config 中的 `selectedDeviceId` / `selectedSiteId`。请参阅“管理**对象**”选项卡（服务提示）。

---

## 致谢及延伸阅读
| 资源 | 内容 |
|----------|---------|
| [thomluther/ha-anker-solix](https://github.com/thomluther/ha-anker-solix) | 完整 README 文件，**INFO.md**（配置、MQTT、导出、资费） |
| [HA讨论](https://github.com/thomluther/ha-anker-solix/discussions) | 能源仪表盘，零排放，效率 |
| [SolixBLE](https://github.com/flip-dots/SolixBLE) | 本地 BLE（非云端） |
| [ha-anker-solix-official](https://github.com/anker-charging/ha-anker-solix-official) | 官方 Modbus（本地设备） |
| [ioBroker.pvforecast](https://www.iobroker.net/#en/adapters/adapterref/iobroker.pvforecast/README.md) | 光伏预测（可选输入，用于避免弃风弃光） |
| [ioBroker.pvforecast](https://www.iobroker.net/#en/adapters/adapterref/iobroker.pvforecast/README.md) | 光伏预测（可选输入，用于避免弃风减排） |

从 [HA 自述文件](https://github.com/thomluther/ha-anker-solix#additional-resources) 链接的德语指南/视频在概念上适用于数据和限制；接线是通过 ioBroker 状态而不是 HA 实体。

---

## 避免减产（可选）
**限电避免**选项卡：需要 [ioBroker.pvforecast](https://www.iobroker.net/#en/adapters/adapterref/iobroker.pvforecast/README.md) 适配器。（之前基于 [ioBroker.solarprognose](https://www.iobroker.net/#en/adapters/adapterref/iobroker.pvforecast/README.md)](https://www.iobroker.net/#en/adapters/adapterref/iobroker.solarprognose/README.md) / solarprognose.de — 已切换，因为 **solarprognose.de 即将关闭**，该数据源不再可用。）设置**电站路径**（例如 `pvforecast.0.plants.pv`）；功率值从 `{path}.power.hoursToday.*` 读取。**预测分辨率**（60 / 30 / 15 分钟，默认 **60**）必须与 pvforecast 中配置的间隔匹配。**仅控制：** **手动** 模式 + **`ac_output_limit`**（交流输出/出口）。**不**更改电站基本设置（电网出口上限、`allow_grid_export`、本地负载预设、交流充电限制）。**之前：** `ac_output_limit` = 运行中的光伏系统。 **激活状态：** `missing_charge_wh`, `max_charge_w` = `missing_charge_wh` ÷ `remaining_hours`, `export_w` = `live_pv_w` − `max_charge_w`, `ac_output_limit` = `export_w`。**恢复状态：** 恢复选定模式。状态：`curtailment.live_pv_w`, `missing_charge_wh`, `max_charge_w`, `export_w`, `remaining_hours`。

**管理员：**勾选“组合器”复选框——无组合器：设备 ID + 太阳能板类型 + 电池容量（瓦时）；有组合器：组合器 ID + 最多 4 个太阳能板插槽（每个插槽可以为空）。**组合器：**总交流功率限制 = 各单元功率限制之和（SB2 为 1000 瓦，SB3 Pro 为 1200 瓦，SB4 Pro 为 2500 瓦）。**独立运行：**始终为 800 瓦。

---

## 发布（npm 和 ioBroker 目录）
**npm:** 一旦软件包上线 npm，就通过 git 标签 (`v*`) 发布，并在 [适配器检查结果为绿色（https://adaptercheck.iobroker.in/）。发布使用 **npm 可信发布**（来自 GitHub Actions 的 OIDC，无需长期有效的 npm 令牌）。npm 将于 **2027 年 1 月** 起弃用经典自动化令牌；此适配器已启用可信发布。请在 [ioBroker.repositories](https://adaptercheck.iobroker.in/) 中注册。](https://github.com/ioBroker/ioBroker.repositories) 之后进行 CI 部署。

**每次发布之前**（由`npm run test:package` → `test/io-package-policy.js`强制执行）：

1. 更新 `package.json` 和 `io-package.json` 中的 `version`（必须匹配）。
2. 在此 README 变更日志中添加 `### x.y.z` 部分 (E6006)。
3. 为该版本添加**一条**新的`common.news`条目；保留**最多7条**新闻键——仅包含已在npm上的版本（即将发布的版本除外）。将删除的文本移至[CHANGELOG_OLD.md](CHANGELOG_OLD.md)。
4. 管理员 `jsonConfig.json`：标题 `size` 必须 **≤ 5**（使用 `5` 表示最小标题）。
5. 除非必要，否则不要将根文件添加到 npm `files` 中（`CHANGELOG_OLD.md` 不会包含在包中）。
6. `package.json` `os` 必须与 `test-and-release.yml` 中的操作系统矩阵匹配 (E3027)。保持管理员 `i18n/*.json` 与 `en.json` 同步 (W5604/W5605)。

---

## Changelog

### 0.10.86

- **Solarbank 1 (E1600):** writable `preset_charge_priority` (0–100 %) and `preset_discharge_priority` (switch) via `set_home_load` — not applicable to SB2/SB3

### 0.10.85

- **Admin:** curtailment hint/path labels use new i18n keys so Admin no longer keeps stale solarprognose.de text after the pvforecast switch

### 0.10.84

- **Curtailment:** switch forecast source from solarprognose.de / [ioBroker.solarprognose](https://www.iobroker.net/#en/adapters/adapterref/iobroker.solarprognose/README.md) to [ioBroker.pvforecast](https://www.iobroker.net/#en/adapters/adapterref/iobroker.pvforecast/README.md) because **solarprognose.de is shutting down**. Plant path (`…power.hoursToday`); resolution option 60/30/15 min (default 60). (0.10.82/0.10.83 were not published: CI lint / unpublished news entries.)

### 0.10.83

- **Fix:** CI lint for curtailment/pvforecast (`prettier`, `require-await`, redundant type unions) — not published (see 0.10.84)

### 0.10.82

- **Curtailment:** switch to pvforecast (solarprognose.de shutting down) — not published (CI lint failure; see 0.10.84)

### 0.10.81

- **Repository review (mcm1957):** restore standard `test-and-release` workflow — adapter tests on every push/tag (Linux + Windows matrix), deploy only after all jobs succeed (no `always()` / no skipped-tests workaround); declare **`linux` + `win32`** in `package.json`; README: Windows supported & tested, **macOS not supported**

### 0.10.80

- **Object dump fix:** persist `periodScheduleOffsetSec` via `extendForeignObjectAsync` on `system.adapter.<instance>` (avoids invalid `anker-solix.0.system.adapter.*` object without `type`/`common`, E3004/E3007)

### 0.10.79

- **Repository re-review:** per-instance period energy schedule jitter; sensor-kind state name migration; remove unused `curtailmentModeBefore`; document Linux + **tested Windows** support

### 0.10.78

- **Adapter-check:** use `adapter.setTimeout` instead of plain `setTimeout` (E5005)

### 0.10.77

- **Repository review:** English-only log messages; English default state names and list labels (common.name/common.states)

### 0.10.76

- **Object structure:** list controls use role `state` (`max_total_ac_output`, EV charger mode lists; E1008/E1009)

### 0.10.75

- **Object structure (PR review):** folder → device → channel hierarchy before states (E3009); valid ioBroker roles/types (E1008/E1009/E1011)
- **Dev:** `@alcalzone/release-script` 5.2.1 (E0036)

### 0.10.74

- **TypeScript 6** (W0083); `tsconfig.json` adds mocha types for `tsc --noEmit`
- **CI:** `testing-action-adapter` and `testing-action-deploy` use `@v1` (S3043/S3044); `testing-action-check` stays `@v2.0.0` (no floating `@v2` tag)
- **Tests:** `npm pack` must exclude `CHANGELOG_OLD.md` (S9508)

### 0.10.73

- **README:** removed discouraged GitHub-URL installation section (adapter-check **E6013**)
- **Tests:** `test/io-package-policy.js` guards against GitHub URL install text in README

### 0.10.72

- **Repository checker:** admin i18n synced for all languages (W5604/W5605); `package.json` `os` aligned with Linux CI (E3027)
- **Tests:** `test/i18n-policy.js` and E3027 check in `test/io-package-policy.js`

### 0.10.71

- **Python install:** detects host profile (Linux server, **Home Assistant** ioBroker add-on, **Windows**, container)
- **HA:** venv-first, `get-pip.py` with `--break-system-packages` / `PIP_BREAK_SYSTEM_PACKAGES` for PEP 668
- **Windows:** tries `py -3.13`, `py -3.12`, Program Files paths; parses `--version` (no broken shell `-c` check); adds **`tzdata`** for `Europe/Berlin`
- **Bridge:** uses resolved Python spawn spec (`py -3.12` args) consistently in daemon and one-shot mode
- Deps check: `aiohttp` + `ZoneInfo("Europe/Berlin")` before skipping install

### 0.10.70

- **Repository / CI:** `common.news` capped at 7 npm-published versions; workflow concurrency per ioBroker.example; admin header `size` ≤ 5; automated checks in `test/io-package-policy.js`; `CHANGELOG_OLD.md` excluded from npm package

### 0.10.69

- **Curtailment:** after midnight (Europe/Berlin) phase `inactive` until solarprognose forecast signature changes; then safe `modeAfter` release (no export while waiting)

### 0.10.68

- **Admin:** Python install button at bottom of **Options** tab

### 0.10.67

- **Admin:** removed **Devices** tab and cloud device reload; device filter on **Objects**; **Login cache** tab rightmost

### 0.10.66

- **Admin:** device list and login-cache status via `useNative` responses

### 0.10.65

- **Login cache** tab: backup/restore; auto-backup after first login

### 0.10.64

- **Curtailment admin:** hint text; combiner vs standalone field toggle fix

### 0.10.63

- **Fix** `bat_discharge_power`; admin: terms under **Account**, **Objects** tab, curtailment UI (combiner / solarprognose link)

### 0.10.31

- **Week/month/year statistics:** fetched once per day after **23:00 / 23:15 / 23:30** (Europe/Berlin) on the next detail poll, not every detail refresh

### 0.10.30

- **Week/month statistics:** fetched like Home Assistant (`energy_daily`, `device_sn` empty for site totals); avoids `energy_analysis` 10003 with combiner SN; year still via `energy_analysis`

### 0.10.29

- **Curtailment:** instance setting *Minimum live PV (W)* (`curtailmentMinPvW`, default 50); fix ESLint/Prettier CI failure on 0.10.28

### 0.10.28

- **Curtailment:** manual mode and `ac_output_limit` only when live PV ≥ 50 W — no midnight feed-in from forecast (fixes 4800 W at `livePv=0`)

### 0.10.27

- Period `energy_analysis`: per-call retry on 10003, partial metrics if only some calls fail; uses combiner/solarbank SN; success log only when kWh values exist

### 0.10.26

- **Week/month period stats:** fetched on first detail refresh when only period groups are enabled (not after ~30 min); week interval = every detail refresh (was every 3rd); log line `Period statistics updated (week)`

### 0.10.25

- **Fix:** `curtailment.soc_percent` state object is created on start (was missing since 0.10.16)

### 0.10.24

- **Fix:** `NameError: needs_daily_energy_poll` / missing `PERIOD_YEAR` imports in **0.10.23** (incomplete release)

### 0.10.23

- **Fix:** missing `_update_energy_periods` crashed the bridge daemon (`AttributeError`) → one-shot fallback and extra 429 load
- **Year/month/week only:** skips daily `poll_device_energy` (no “today” entity group); period `energy_analysis` only every Nth detail refresh (year ≈ 8×)
- On 429: no one-shot fallback; period stats back off 30 min; parallel polls skipped

### 0.10.22

- Energy statistics (daily + week/month/year) only on **combiner_box** when a combiner exists; no duplicate states under `system.*` or each `solarbank.*`

### 0.10.21

- **Fix:** `IoBrokerAnkerApiClient` stored no `config` → daemon crashed (`AttributeError`), one-shot bridge fallback, extra API load and **429** rate limits
- Week/month/year `energy_analysis` calls are **rotated** (one period per detail refresh) instead of all three at once

### 0.10.20

- Period energy statistics (week / month / year) use subfolders: `statistics.week.*`, `statistics.month.*`, `statistics.year.*` (instead of flat `week_*` under `statistics.*`)
- Release **0.10.19** tag had no npm deploy (CI lint); install **0.10.20** or newer

### 0.10.18

- Entity groups **Weekly / monthly / yearly energy statistics** (`enableEnergyStatisticsWeek|Month|Year`): kWh totals for current calendar week, month, and year via Anker `energy_analysis` API

### 0.10.17

- **Fix:** Stale `build/` still ran old curtailment code that set **grid export limit** (`grid_export_limit`) to up to **4800 W** on adapter start (App: *Netzeinspeisungs-Leistungsgrenze* → *Anpassen*). Rebuilt `build/` from current TypeScript; tests verify compiled curtailment never touches feed-in controls

### 0.10.16

- Combiner sensor **`total_state_of_charge`**: cloud total or capacity-weighted average of all site solarbanks (poll + ioBroker state)
- Curtailment uses total SOC for `missing_charge_wh`, `max_charge_w`, and `soc_percent`

### 0.10.15

- Curtailment: **`ac_output_limit` via API only** (no MQTT) to avoid station side effects
- Fix SOC handling when combiner had no SOC (`max_charge_w` wrong); ensure `missing_charge_wh` state exists on upgrade

### 0.10.14

- Curtailment: **only** manual mode + **`ac_output_limit`** (no `grid_export_limit`, `allow_grid_export`, home load preset, AC charge limit)
- New state `curtailment.missing_charge_wh`; active phase: export = live PV − calculated max charge

### 0.10.12

- Curtailment combiner: export via **`ac_output_limit`** (`max_load`); home load preset 0 W (superseded by 0.10.14+)

### 0.10.11

- Curtailment: prefer **`system.{siteId}.sensors.total_pv_power`** for live PV

### 0.10.10

- Curtailment combiner: export via `set_output_power` (later replaced); 4800 W cap; more PV sensors for `live_pv_w`

### 0.10.9

- Curtailment active phase: AC output = full PV (intermediate behaviour; refined in 0.10.14+)

### 0.10.8

- Curtailment: **before** = instant export = live PV; **active** = slow battery charge + export surplus

### 0.10.7

- Curtailment: export limit follows live PV; updates when generation sensors change

### 0.10.6

- Curtailment: manual mode, no charge, export limit from hourly forecast (also before curtailment window)

### 0.10.5

- Curtailment: read [ioBroker.solarprognose](https://www.iobroker.net/#en/adapters/adapterref/iobroker.solarprognose/README.md) forecast (kW → W, path `11h.power`)

### 0.10.4

- Curtailment Admin: combiner checkbox, device ID + solarbank type (standalone) or 4 slots with “none” (combiner); no usage-mode change before curtailment window

### 0.10.3

- CI: curtailment unit tests use Mocha/Chai (fixes adapter-check lint)

### 0.10.2

- Curtailment AC limits: standalone 800 W; combiner per unit SB2 1000, SB3 1200, SB4 2500 W

### 0.10.1

- Curtailment: Combiner limit = sum of per-unit profiles (max 4 mixed solarbanks)

### 0.10.0

- Optional **curtailment avoidance** via solarprognose forecast (Admin tab, `curtailment.*` states)

### 0.9.9

- `package.json` keyword `ioBroker`; entity group headers with schema `size` property

### 0.9.8

- Admin UI: all option/entity fields with lg/xl breakpoints; CI release fix

### 0.9.7

- Adapter-check: npm news sync, admin responsive layout, README copyright, npm package excludes Python cache

### 0.9.6

- Adapter-check compliance: Node 22+, admin UI sizes, compact-mode Python install, dependabot

### 0.9.5

- Admin warning before **Clear Anker login cache**; log after clear

### 0.9.4

- Log exact `authcache` path when login cache file is missing

### 0.9.3

- **Fix:** Valid `authcache` no longer treated as failed login after restart (captcha 100032)

### 0.9.2

- Keep `authcache` on re-auth; reload token on 401 before forced login

### 0.9.1

- Captcha error 100032 mapping and README troubleshooting

### 0.9.0

- Configurable **entity groups** (HA-style); API scope follows enabled groups

### 0.8.1

- Fix Python bridge `ApiCategories.device_parm` crash

### 0.8.0

- Daily energy statistics under `statistics.*`

### 0.7.0

- Usage mode `preset_usage_mode`, AC fast charge switch

### 0.6.0

- Persistent bridge daemon, HA-aligned poll, multisystem controls, rate-limit fixes (see [CHANGELOG_OLD.md](CHANGELOG_OLD.md) for 0.6.1–0.6.5)

### 0.5.0

- Python auto-install, device selection, staggered polling, repository rename (see [CHANGELOG_OLD.md](CHANGELOG_OLD.md) for 0.2.0–0.4.2)

Older release notes: [CHANGELOG_OLD.md](CHANGELOG_OLD.md) and git history.

---

## License

Copyright (c) 2026 MatthiasUlrich1 info@my-smart-home-support.de

MIT — see [LICENSE](LICENSE)