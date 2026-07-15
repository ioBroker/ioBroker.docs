---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.heishamon/README.md
title: ioBroker.heishamon
hash: g5Xgi5fLyaYC2rdWwxbDz4ddvnPoKNdQJmvrHYANf5Q=
---
# IoBroker.heishamon
ioBroker 适配器可直接通过串口线传输 **Panasonic Aquarea CN-CNT** 协议，无需 HeishaMon 模块或 MQTT 服务器等中间环节。该热泵的 CN-CNT 连接器采用 **5V TTL UART 逻辑电平**。若要将其连接到 3.3V UART（例如 Raspberry Pi GPIO UART），则需要使用合适的电平转换器。由于该协议为半双工，因此对于长距离布线，可以添加可选的 TTL/RS485 转换器。协议解码基于 [黑沙门项目](https://github.com/Egyras/HeishaMon) 的解析。

> **状态：** 早期版本。协议库、模拟器和适配器逻辑正在开发中；下一步是对实际热泵进行现场测试。

支持的热泵
松下 Aquarea 空气源热泵，包括 **H、J、K 和 L 系列**。

＃＃ 安装
通过管理界面从官方 ioBroker 仓库安装：打开“适配器”选项卡，搜索“heishamon”，然后点击“安装”。然后在“实例”下添加一个实例。

### 串口先决条件
这些是主机端的操作步骤，管理员界面无法为您执行：

- ioBroker 进程用户（在标准 Linux 系统中为 `iobroker`）必须被允许打开串口设备。在 Debian/Raspberry Pi 操作系统中，这意味着需要 `dialout` 用户组：

```bash
groups iobroker                     # must contain 'dialout'
sudo usermod -aG dialout iobroker   # if not — then restart the whole ioBroker service
```

- 使用稳定的设备路径，以确保端口在重启和重新插拔后仍然有效。优先使用 `/dev/serial/by-id/...` 而不是 `/dev/ttyUSB0`：

```bash
ls -l /dev/serial/by-id/
```

在树莓派 GPIO UART 上，路径无论如何都是静态的（例如 `/dev/ttyAMA2`）。

有关热泵的接线，请参阅下面的[接线](#wiring)。

＃＃ 配置
| 设置 | 默认值 | 说明 |
|---|---|---|
| `device` | `/dev/ttyUSB0` | 适配器打开的串口设备的路径。必须对 ioBroker 进程可读。 |
| `pollIntervalSec` | `5` | 适配器轮询热泵的频率（秒）。 |
| `extraPollEnabled` | `false` | 轮询额外的能量数据块（仅限 K/L 系列）。默认关闭 — 仅在 K/L 泵上启用；在 H/J 型号上，额外的轮询会超时。 |
| `readOnlyMode` | `false` | 仅被动监听：不发送任何轮询或设置命令，仅解码总线上其他主设备的帧。 |
| `readOnlyMode` | `false` | 仅被动监听：不发送任何轮询或设置命令，仅解码总线上其他主设备的帧。 |

＃＃ 特征
- 通过 CN-CNT 端口与 Panasonic Aquarea 热泵进行**直接串行通信**。无需 HeishaMon 硬件或 MQTT 服务器。
- **157 个数据点** 以 ioBroker 状态的形式公开，具有适当的角色、类型和单位。
- **设置命令** CN-CNT 协议支持的所有可写参数。
- **只读模式**，可与现有的 HeishaMon 安装安全地并行运行（第四阶段切换）。
- **连接质量统计信息**（帧输入/输出、CRC 错误、超时），位于 `info.*` 通道下。
- **K/L 系列热泵的可选附加数据块**（6 个额外的能源数据点）。

## ⚠️ 稿酬考量
松下 Aquarea 控制器的内部设置存储机制没有相关文档说明。正常使用情况下（例如手动更改设置、偶尔使用智能家居自动化功能），不太可能造成磨损；HeishaMon 社区拥有多年的运行经验，至今未报告过故障。然而，如果控制器未使用 FRAM、MRAM 或具有断电刷新功能的 RAM 设计，那么高频写入（例如 PID 循环每隔几秒调整一次设定值）理论上可能会随着时间的推移耗尽 EEPROM 单元。

除非您确切知道您的控制器版本允许，否则请避免每隔几分钟就写入一次相同的数据点。对于闭环调节，最好使用驱动热泵内部控制器的慢速外环，而不是直接控制执行器。

你需要什么
> **无需 HeishaMon 设备、ESP 或 MQTT 服务器。** 此适配器直接使用 Panasonic CN-CNT 协议进行通信。您只需在热泵和运行 ioBroker 的设备（PC、家用服务器、NAS、树莓派等）之间建立一条串口连接即可。

**技能等级——请先阅读此说明。** 安装此装置需要打开热泵的电子元件盖，并将两根数据线和一根地线连接到内部连接器上。您应该熟悉细线径电线和基本电子知识（逻辑电平、接地回路、RS485）。此装置为低压（5V信号），**并非**市电工作——但错误的连接器或反接的线路仍然可能干扰热泵的正常工作。如果您对此感到不安，那么这可能不是一个适合您的第一个电子项目。

⚠️ **所有风险和责任均由您自行承担——不提供任何保修。** 打开设备可能会使您的制造商保修失效。接线前请关闭热泵电源。

**测量两次，连接一次。**

### 信号和构建模块
其本质只是 ioBroker 主机和热泵之间的**串行连接**——没什么特别的。问题仅仅在于如何实现这条物理连接。

热泵通过其连接器输出普通的 **5V TTL UART** 信号。最简单的连接方式是使用 **5V USB 转 TTL UART 适配器**：仅需三根线——**GND ↔ GND** 和两条数据线**交叉**（热泵 TX → 适配器 RX，热泵 RX → 适配器 TX）——这样 +5V 和 +12V 电源就无需连接。预先连接好的 `PHR-4` 尾线连接到 **CN-NMODE** 接口，通常无需焊接。

**电气隔离是可选的——但务必了解其后果。** 热泵的 RX/TX 引脚可能**直接连接到其微控制器**，中间几乎没有任何保护措施。这些线路上的过电压或过电流——例如接地/均衡电流回路、接线松动、+12V 引脚与信号线接触——都可能**损坏微控制器，导致热泵主板报废**。如果您不确定热泵和主机之间的接地/均衡电流情况，可以在 USB 端使用一个廉价的**USB 隔离器**来消除该路径。

或者，您也可以采用其他方式保护线路（例如串联电阻或 PTC 保险丝）——许多装置在没有任何隔离的情况下也能正常运行，但这需要您在充分了解情况后做出决定。

仅当 ioBroker 主机确实位于热泵旁边时，裸适配器才没问题——例如，台式测试，或者将小型 SBC 直接安装在设备旁边。

### 推荐设置 — 两线 RS485 远距离通信
实际上，ioBroker 主机位于另一个房间或另一层楼，而不是距离热泵 2 米远。因此，合理的实际连接方式是**通过屏蔽双绞线连接的 RS485**，这也符合该协议的半双工特性：

```
heat pump (5 V TTL, CN-NMODE)
   └─ TTL↔RS485 converter        ← near the heat pump
        └─ shielded twisted pair, 120 Ω termination at BOTH ends, mind A/B
             └─ RS485↔USB adapter ← at the ioBroker host
                  └─ USB → ioBroker host  →  /dev/serial/by-id/…
```

您可以搭建与上述相同的TTL前端，但无需使用USB连接全程，而是在热泵端直接转换为RS485，然后用两根线连接到主机。这种小型的**TTL↔RS485转换器**板在常见的在线零售商处售价仅几美元，而且通常已经具备**基本的线路保护**（TVS二极管/偏置电阻）——这为热泵端提供了额外的安全裕度。

电气隔离是可选的，如果需要使用，最简单的方法是在主机USB端进行隔离。

无论你选择哪条路径，适配器都只能看到**本地串行设备路径**——继续从[配置](#configuration)。

### 其他变体（高级）
<details><summary>树莓派 GPIO UART（ioBroker 运行在树莓派本身上）</summary>

树莓派的 GPIO UART 输出为 **3.3V**，而热泵输出为 5V TTL，因此**必须使用逻辑电平转换器**。GPIO 也是 RS485 连接线的自然主机端（RS485↔UART 转换器 → 电平转换器 → GPIO）。三个步骤：

1. **选择一个硬件 UART 及其引脚。** 使用真正的 PL011，而不是 mini-UART。

`ttyS0`（其波特率随内核时钟漂移）。在树莓派 4/5 上，额外的 PL011 引脚映射到固定的 GPIO 对（TXD/RXD），例如 `uart2`→GPIO0/1、`uart3`→GPIO4/5、`uart4`→GPIO8/9、`uart5`→GPIO12/13。将热泵链路（通过电平转换器）连接到其中一对 GPIO 对——交叉连接，并接地。

2. **在启动配置中启用该 UART。** 添加 `dtoverlay=uart3`（或其他任何值）。

（您选择的）到 `/boot/firmware/config.txt`（旧版 Raspberry Pi OS：`/boot/config.txt`）并重新启动。

3. **找到匹配的设备节点。** 重启后，UART 将显示为

`/dev/ttyAMAx`; 使用 `dmesg | grep ttyAMA` 或 `ls -l /dev/serial*` 确认哪个节点属于您的覆盖网络，然后在适配器配置中输入该稳定路径。

有关连接器引脚排列（CN-CNT 和 CN-NMODE），请参阅 [接线](#wiring)。

</details>

## 接线
> ⚠️ **请仔细测量两次，确保连接无误。** 此处所有商品均**不提供任何担保**，使用风险和责任**完全由您自行承担。**

☠️ **错误的连接可能会损坏热泵。** CN-CNT / CN-NMODE 的 RX/TX 引脚可能**直接连接到热泵的微控制器**，中间几乎没有任何保护措施。请注意下表中**紧邻信号线的 +5V 和 +12V 引脚**：将 +12V 电压直接施加到信号引脚上、接反了导线，或者接地/均衡电流浪涌都可能**损坏微控制器，导致主板无法工作。** 通电前，请务必仔细检查每个引脚。

热泵主板上有两个等效的连接器，此适配器可以使用它们：**CN-CNT** 和 **CN-NMODE**。两者均可使用，选择更容易够到的那个即可。

![松下 Aquarea 主板，图中显示了 CN-CNT 和 CN-NMODE 连接器](../../../en/adapterref/iobroker.heishamon/docs/images/mainboard-connectors.jpg)

`CN-CNT` 是通常用于 **CZ-TAW1 云模块** 或 **可选 PCB** 的连接器：

- 如果连接了 **CZ-TAW1** 模块，请以 **只读模式** 运行此适配器，使其仅监听而不驱动总线。
- 如果安装了**可选PCB**，则存在两个总线主控器，因此可能会发生冲突——但通常情况下仍能正常工作。发生CRC错误后，适配器会在下一次总线访问之前等待一段随机时间，以打破冲突锁定（请参阅变更日志中的响应驱动总线说明）。

两个连接器都传输 **5V TTL UART** 信号，因此对于 3.3V 主机（例如 Raspberry Pi GPIO），需要一个电平转换器。以下信号名称是从**热泵的角度**给出的——在适配器端交叉连接（热泵 TX → 适配器 RX，热泵 RX → 适配器 TX）。

### CN-CNT — JST `B05B-XASK-1`（配套连接器 `PAP-05V-S`）
| 引脚 | 信号 |
|---|---|
| 1 | +5 V |
| 2 | TX，5V电平（来自热泵） |
| 3 | RX，5V电平（至热泵） |
| 4 | +12 伏 |
| 5 | 接地 |

### CN-NMODE — JST PH 系列（配套连接器 `PHR-4`，可从常见的大型在线零售商处购买预接线产品）
| 引脚 | 信号 |
|---|---|
| 1 | 接地 |
| 2 | RX，5V电平（至热泵） |
| 3 | TX，5V电平（来自热泵） |
| 4 | +5 V |

例如——一个 UART 转 RS485 转换器连接到 `CN-NMODE` 连接器（RS485 长距离版本的热泵端）：

![UART 转 RS485 转换器连接到 CN-CNT 连接器](../../../en/adapterref/iobroker.heishamon/docs/images/cn-cnt-rs485-converter.jpg)

## 故障排除
- **串口设备上的 `EACCES` 权限错误** — ioBroker 进程用户不在 `dialout` 组中。执行 `sudo usermod -aG dialout iobroker` 后，需要重启整个 ioBroker 服务（`sudo systemctl restart iobroker`），而不仅仅是实例——组成员身份仅在新会话中生效。
- **适配器启动但未显示数据点** — 检查 CN-CNT 端口的接线（交叉 TX↔RX，连接 GND，注意 5V TTL 电平，参见 [接线](#wiring)）。如果使用 TTL↔RS485 转换器，还要检查 A/B 极性和终端电阻。正常的连接会在几秒钟内填充 `heishamon.0.main.*` 下的约 157 个数据点，并将 `heishamon.0.info.connection` 设置为 `true`。
- **设置命令无效** — `readOnlyMode` 是首次启动时特意设置的安全默认值。只有在读取路径运行正常后才应禁用它。
- **通过 CZ-TAW1 总线连接** — 将适配器保持在“只读模式”，否则会导致与松下云模块的总线冲突。

## 文档
项目文档位于 [文档/](docs/) 目录下：

- [docs/plan/](docs/plan/) — 阶段计划和路线图。
- [docs/protocol/](docs/protocol/) — CN-CNT 协议分析。
- [docs/decisions/](docs/decisions/) — 架构决策记录。

## 版权信息和上游许可
协议解码建立在[黑沙门社区](https://github.com/Egyras/HeishaMon)的工作之上。CN-CNT寄存器映射和许多实现提示都源自于此。

截至撰写本文时，HeishaMon 代码库**没有明确的许可文件**——没有 `LICENSE`，源代码中没有许可头，README 文件中也没有明确的许可声明。根据美国和欧盟的版权法，这默认是“保留所有权利”，因此我们不能复制或直接移植原始代码。为了保持代码的规范性：

- HeishaMon C++ 源代码**仅供参考**，用于理解 Panasonic CN-CNT 协议。
- 此适配器是 **全新 TypeScript 实现**：我们阅读了上游源代码，将协议提炼到 [docs/protocol/](docs/protocol/) 中，并根据该文档（而不是原始代码）进行了实现。
- HeishaMon 存储库的协议文档文件（`MQTT-Topics.md`、`OptionalPCB.md`、`ProtocolByteDecrypt.md`）描述了一个可观察的物理协议——即事实信息，不受版权保护；它们在相关的地方被引用为来源。

CN-CNT协议本身并非由松下公司公开；HeishaMon的发现属于经验观察。事实本身不受版权保护，但这些发现的具体C++实现则受版权保护。

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.0.14 (2026-06-29)
* (Tobias Hanss) Corrected the maintainer email address in the package metadata (`package.json`, `io-package.json`)
* (Tobias Hanss) `extraPollEnabled` now defaults to **off** (opt-in) — the K/L-series extra data block is only polled when explicitly enabled, so a fresh install never polls datapoints that H/J pumps cannot provide. Existing instances keep their current setting
* (Tobias Hanss) Documentation: reworked the hardware/wiring section — clarified that only a plain serial link is needed (no HeishaMon device), made 2-wire RS485 the recommended real-world path, added a Raspberry Pi GPIO UART step-by-step, and a dead-mainboard warning at the wiring pinouts

### 0.0.13 (2026-06-28)
* (Tobias Hanss) Release now uses npm trusted publishing (provenance via OIDC) on Node 24 — fixes repository-checker E2008/E3019/E3022
* (Tobias Hanss) Removed the redundant `mocha` dev-dependency (it ships with `@iobroker/testing`) — E0063; the CI `adapter-tests` job now declares `needs: check-and-lint` — E3014
* (Tobias Hanss) Lint-config cleanup: dropped `.prettierignore` in favour of `// prettier-ignore` markers on the datapoint tables — W0084/W5048. No functional change

### 0.0.12 (2026-06-28)
* (Tobias Hanss) Resilient startup: a failed serial open no longer terminates the adapter — it stays alive, sets `info.connection=false` and retries
* (Tobias Hanss) Polling reworked to a setTimeout-at-end-of-tick scheme so poll ticks can never overrun or pile up in the wire queue, even under sustained communication failure
* (Tobias Hanss) `validateConfig()` now validates and safely clamps the user-configurable timeouts/gaps (`responseTimeoutMs`, `setCommandGapMs`, `sendMaxRetries`) to the Node.js timer ceiling
* (Tobias Hanss) `info` channel name fully translated (all 11 languages); setup help texts clarified
* (Tobias Hanss) Documentation: folded the install notes into the README and removed the separate INSTALL.md
* (Tobias Hanss) Tooling: adopted the standard ioBroker test-and-release workflow (testing-action-check / -adapter / -deploy) and migrated to `@iobroker/eslint-config`. No change to the heat-pump protocol

### 0.0.11 (2026-06-21)
* (Tobias Hanss) Object state roles for writable datapoints are now `level` instead of `value` (the `value` role requires `write=false`), fixing the repository checker's object-structure errors (E1011)
* (Tobias Hanss) State objects are now updated on upgrade (`extendObject`) so existing installations pick up the corrected roles
* (Tobias Hanss) Added the recommended i18n translations for the `info.connection` state name (W1001)

### 0.0.10 (2026-06-21)
* (Tobias Hanss) Published from CI with npm provenance (signed build attestation). No change to the adapter itself

### 0.0.9 (2026-06-21)
* (Tobias Hanss) CI: the release workflow's npm-publish step is now idempotent — it skips publishing when the version is already on npm, so a manual publish no longer makes the tagged release run fail. No change to the adapter itself

### 0.0.8 (2026-06-20)
* (Tobias Hanss) Maintenance for ioBroker repository acceptance: adapter-managed timers for clean shutdown, Node.js >=22 required, CI runs the adapter tests on Linux, Windows and macOS. No functional change to the heat-pump communication

### 0.0.7 (2026-05-30)
* (Tobias Hanss) Response-driven half-duplex bus: every send now waits for the heat pump's reply (or a timeout) before the next frame goes out, and retries up to 3 times on timeout or CRC error
* (Tobias Hanss) After a CRC error a randomised backoff precedes the next bus access to avoid lock-step collisions with a second master (Option-PCB)
* (Tobias Hanss) New "Diagnostics" setting toggles the set-command response logging (off by default)

### 0.0.6 (2026-05-30)
* (Tobias Hanss) Diagnostic logging to reverse-engineer the heat pump's SET acknowledgement: logs the sent frame and the heat pump's reply (frame type, timing, hexdump) at info level

### 0.0.5 (2026-05-30)
* (Tobias Hanss) Wire-queue gap is now enforced between every pair of sends, including across idle periods (previously the gap only applied while multiple tasks were already stacked in the queue — so polls and isolated sets bypassed it entirely)
* (Tobias Hanss) Queue is hard-capped at 100 pending entries; overflows are logged at warn level and the dropped send is skipped instead of silently piling up

### 0.0.3 (2026-05-26)
* (Tobias Hanss) Serialize all wire writes through a FIFO queue with a configurable inter-frame gap (default 200 ms). Fixes lost set commands when a script writes several datapoints at once
* (Tobias Hanss) Pump_Duty / Max_Pump_Duty unit removed (raw value 65-254, no physical unit)

### 0.0.2 (2026-05-25)
* (Tobias Hanss) Lower Node.js engine requirement to >= 20 (was 22) so the adapter installs on current ioBroker LTS hosts

### 0.0.1 (2026-05-25)
* (Tobias Hanss) Initial adapter release

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 Tobias Hanss <t.dev@familie-hanss.de>

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
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE DEALINGS IN THE SOFTWARE.