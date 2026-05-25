---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.mspa.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.mspa.svg
BADGE-Number of Installations: https://iobroker.live/badges/mspa-installed.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/mspa-stable.svg
BADGE-NPM: https://nodei.co/npm/iobroker.mspa.png?downloads=true
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.mspa/README.md
title: ioBroker.mspa
hash: CmEnO/z5jiesdbRrYWG2EYqjYSuYWpmJZyDd5vB3MmA=
---
![NPM 版本](https://img.shields.io/npm/v/iobroker.mspa.svg)
![下载](https://img.shields.io/npm/dm/iobroker.mspa.svg)
![安装数量](https://iobroker.live/badges/mspa-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/mspa-stable.svg)
![NPM](https://nodei.co/npm/iobroker.mspa.png?downloads=true)

<img src="admin/mspa.png" width="200" />

# IoBroker.mspa
**测试：** ![测试与发布](https://github.com/arteck/ioBroker.mspa/workflows/Test%20and%20Release/badge.svg) ![CodeQL](https://github.com/arteck/ioBroker.mspa/actions/workflows/codeql.yml/badge.svg?branch=main)

---

## IoBroker 的 MSpa 适配器
通过 MSpa 云 API 控制 MSpa 热水浴缸。

支持加热、过滤、紫外线杀菌、气泡和喷射控制，并通过定时窗口、光伏余热和防冻保护实现完全自动化。

---

＃＃ 特征
### 设备控制
- 🌡️ 读取/设置水温和目标温度（**20–42 °C**，步长 0.5 °C）– 超出此范围的值将被拒绝，并记录警告日志
- 🔘 打开/关闭**加热器、过滤器、气泡净化器、喷射器、臭氧发生器和紫外线杀菌器**
- 🔗 **自动依赖管理：**
- 打开加热器 → 首先自动启动过滤泵（设备要求）
- 开启**UVC**功能→首先自动启动过滤泵（设备要求）
- 关闭过滤器 → 加热器、紫外线杀菌灯和气泡发生器将自动停止工作（API 要求）
- 📊 自动计算**制热和制冷速率**（摄氏度/小时，移动平均线）

→ 需要 `heat_state = 2 or 3` 或 `heater = on`，以及至少 3 分钟的测量窗口。

- ⏱️ **预计到达时间** 格式为 `hh:mm`，直至达到目标温度 (`status.heat_target_temp_reached`)

→ 根据 `computed.heat_rate_per_hour` 和目标/水温差计算；上限为 48 小时，`00:00` 不加热时

- ⚡ 电源故障检测及可选状态恢复
- 🌍 3 个服务器区域：**欧洲（其他地区）**、**美国**、**中国**
- 🔒 速率限制器（最大 2.5 次请求/秒）
- 🚀 命令发出后快速轮询（15 秒内每 1 秒轮询一次）——轮询计时器立即停止运行，因此 ACK 将在约 2 秒内到达。

---

### 时间窗口控制
- ⏰ 无限可配置时间窗口（支持选择工作日、开始/结束时间、支持夜间范围）
- 📋 每个窗户均可独立控制**加热**（带目标温度）、**过滤泵**和**紫外线杀菌**
- 🔗 UVC 仅在过滤泵运行时激活
- 🕐 可配置窗口结束后**泵的后续运行时间**（泵持续运行 N 分钟）
- **全部关闭窗口：**设置 `action_filter = false` 和 `action_heating = false` → 当窗口启动时，适配器将**主动关闭**加热器、UVC 和过滤器

→ 使用此功能可在特定时间强制关闭所有服务（例如 22:00–06:00）

- 仅当**当前时间和星期几**与配置的窗口匹配时，PV窗口才会激活。

---

### 光伏盈余控制
- ☀️ 当光伏发电盈余超过可配置阈值（瓦）时自动激活
- 🌥️ 可配置的**云保护延迟**（分钟），之后才会停用。
- 📉 滞后设计可防止快速开关切换
- 📋 独立于时间窗口控制 – 可以组合使用
- `computed.pv_active` – 仅当启用 PV 的时间窗口**当前打开**（日期和时间正确）且盈余高于阈值时才为 `true`

→ 当时间窗口结束或夜间时，自动设置为`false`（无需手动重置）

- `computed.pv_deactivate_remaining` – 云保护延迟的剩余分钟数（实时倒计时）
- **分阶段停用** – 当盈余下降时，系统分阶段关闭：
1. **立即关闭加热器** – 如果固件已达到目标温度（`heat_state=4`），则跳过 API 调用。
2. **UVC 关闭**（延迟时间可配置）——但仅当达到每日 UVC 最低运行时间时才会关闭；否则 UVC 将持续运行直至达到最低运行时间。
3. **关闭滤波器**（延迟一段时间后）——但仅当固件未主动加热时（`heat_state 2/3`）
- 如果光伏余量在分阶段停用期间恢复，则所有定时器取消，之前关闭的设备重新激活。

---

### 季节控制
- 📅 在适配器设置中定义一个**季节窗口**（日.月 – 日.月）
- 季节设置可以通过 `control.season_enabled` 在运行时切换（例如，通过 VIS 设置）——重启适配器后仍然有效
- 非赛季期间：投票继续进行，**所有自动化操作暂停**（时间窗口、PV）
- 当 `season_enabled = false` 时：仅允许运行**防霜冻功能**（冬季模式）。

---

### 冬季模式（防冻保护）
- ❄️ 冬季户外放置热水浴缸时，可防止其冻结
- 当水温降至或低于设定的**防冻阈值（°C）**时，自动启动加热器和过滤器。
- 当温度高于阈值 **3 °C** 时再次失效（滞后现象）
- 通过 `control.winter_mode` 启用/禁用（例如，通过 VIS）——适配器重启后仍然有效
- 已在适配器设置中配置霜冻阈值（管理 → 时间控制选项卡）
- 当防冻保护功能激活或关闭时，发送 Telegram 通知
- **独立于 `season_enabled` 运行** – 即使季节已禁用，防霜冻功能仍然有效。

> **`season_enabled` 与 `winter_mode` 的区别：** > > | `season_enabled` | `winter_mode` | 结果 |

> |---|---|---|

> | `true` | `false` | 时间窗口 + 光伏系统激活，无防冻保护 |

> | `true` | `true` | 时间窗口 + 光伏系统 + 防冻保护 |

> | `false` | `false` | 所有自动化暂停 |

> | `false` | `true` | **仅防冻保护** – 所有其他自动化暂停 |

> > 这两个标志是**独立的** – `winter_mode` 不会禁用 `season_enabled`。

---

### 手动覆盖
- 🛑 一键暂停**所有自动化功能**（定时窗口、光伏余热、防冻保护）
- 设置 `control.manual_override = true` 可暂停——适配器将不再向设备发送任何命令。
- **可选自动恢复：** 启用前设置 `control.manual_override_duration`（分钟）——适配器将在配置的时间后自动恢复（`0` = 无限期）
- 当覆盖功能被禁用时，所有自动化操作都会**立即**使用最新的设备数据重新评估。
- 适配器重启后，`control.manual_override` 始终**重置为 `false`**。
- 典型应用场景：暂时通过 MSpa 应用程序控制设备，无需适配器介入。

---

### UVC灯管寿命
- 🔦 在适配器设置中配置安装日期和额定使用寿命（运行小时数）
- **实际运行时间**仅在UVC实际开启时计算。
- 适配器重启后，累计工时仍会保留。
- `status.uvc_hours_used` – UVC 累计运行小时数（**可写** – 数据丢失或灯管更换后可手动设置以进行更正）
- `status.uvc_today_hours` – 今日 UVC 运行时间（午夜重置）
- `status.uvc_hours_remaining` – 距离额定寿命结束的剩余小时数（UVC 开启时每次轮询更新）
- 寿命耗尽时发出警告

> **手动更正 `status.uvc_hours_used`：** > 如果数据丢失后值显示为 `0`： > 1. 停止适配器 > 2. 在 ioBroker 管理后台设置正确的值（例如，连续运行 5 天 × 24 小时，设置为 `120`） > 3. 启动适配器 – 它会读取已保存的值并立即重新计算 `uvc_hours_remaining`

---

### UVC每日保障
- ⏱️ 确保 UVC 每天运行**最低小时数**（可配置）
- 如果尚未达到每日最低值，适配器会在设定的安全时间内自动启动 UVC 紫外线杀菌灯（以及过滤泵）。
- `control.uvc_ensure_skip_today` – 跳过今天的每日清洁（例如，手动清洁时）→ 午夜自动重置

---

### 筛选运行时跟踪
- ⏳ `control.filter_running` – 累计过滤泵运行时间（重启后仍然保留）
- `control.filter_reset` – 瞬时触发：将过滤器运行计数器重置为 `0`（例如，更换滤芯后）

---

### 消费跟踪
- 📈 通过外部电表数据点进行每日千瓦时跟踪
- 午夜自动重置
- 不受季节和时间窗口控制

---

### 通知（Telegram）
- 📨 通过 Telegram 发送通知：
- ☀️ PV 盈余已激活/已停用
- ⏰ 时间窗口开始/结束
- 📅 赛季开始/结束
- 🔦 UVC灯管到期警告
- ❄️ 防冻保护已激活/已关闭
- 🛑 手动覆盖已启用/已禁用（如果设置了持续时间），
- 支持多个收件人（用户名以逗号分隔）

---

## Changelog
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now

### 0.3.7 (2026-05-12)
* (arteck) add warning as text

### 0.3.6 (2026-05-12)
* (arteck) fix daily uvc timer after adapter restart

### 0.3.5 (2026-05-12)
* (arteck) clean code
* (arteck) less notification

### 0.3.4 (2026-05-05)
* (arteck) fix manual override

### 0.3.3 (2026-04-28)
* (arteck) fix heatrate
* (arteck) fix uvc stop

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 Arthur Rupp <arteck@outlook.com>

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