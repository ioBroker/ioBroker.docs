---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.beszel/README.md
title: <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.beszel@main/admin/beszel.svg" width="48" align="top" /> ioBroker.beszel
hash: 0viDphe7RrsOLxgCrqiuf8RfUmY0gXXvkg3PiRS9vZQ=
---
# <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.beszel@main/admin/beszel.svg" width="48" align="top" /> ioBroker.beszel

![npm 版本](https://img.shields.io/npm/v/iobroker.beszel)
![稳定的](https://iobroker.live/badges/beszel-stable.svg)
![安装](https://iobroker.live/badges/beszel-installed.svg)
![npm 下载](https://img.shields.io/npm/dt/iobroker.beszel)
![节点](https://img.shields.io/badge/node-%3E%3D22-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)
![执照](https://img.shields.io/badge/license-MIT-green)
![哨兵](https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white)
![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi)
![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge)

连接到 [贝塞尔](https://github.com/henrygd/beszel) Hub，并公开 ioBroker 所述的所有已注册系统的服务器监控指标。

---

＃＃ 特征
- 从您 Beszel Hub 中注册的所有系统中获取指标
- 系统状态：CPU、内存、磁盘、网络、温度、平均负载
- 可选详情：单核 CPU、峰值、磁盘 I/O 负载、单接口流量、GPU 详情、硬件/操作系统信息、Docker/Podman 容器、电池、额外文件系统、CPU 细分、systemd 服务
每个选项都有帮助文本解释其创建的状态；详细选项在其所属类别启用之前会保持灰色显示。
- 可配置轮询间隔（10-300 秒）
- 令牌过期时自动重新认证（包括轮询过程中）
- 管理界面中的连接测试按钮
- 自动清理已移除系统、过期容器和已禁用指标的状态

---

## 哨兵/错误报告
**此适配器使用 Sentry 库自动向开发者报告异常和代码错误。** 仅当您在 ioBroker 诊断中启用错误报告功能（**系统设置 → 诊断和错误报告**）时，才会进行报告。仅传输匿名安装 ID，不包含姓名、电子邮件地址或 IP 地址。

有关详细信息以及如何禁用此功能，请参阅 [Sentry 插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)。错误报告需要 js-controller 3.0 或更高版本。

---

＃＃ 要求
- **Node.js >= 22**
- **ioBroker js-controller >= 7.2.2**
- **ioBroker 管理员 >= 7.8.23**
- 一个正在运行的 [Beszel Hub](https://github.com/henrygd/beszel)，且至少有一个已注册的系统

---

＃＃ 配置
＃＃＃ 联系
| 选项 | 描述 | 默认值 |
| ----------------------- | --------------------------------------------------------------------------------------- | ------- |
| **Beszel 中心 URL** | Beszel Hub 的完整 URL（例如 `http://192.168.1.100:8090`）| — |
| **用户名** | Beszel Hub 登录电子邮件/用户名 | — |
| **轮询间隔（秒）** | 从 Hub 获取数据的频率（10–300） | `60` |
| **请求超时（秒）** | 每个请求的 HTTP 超时时间。对于响应缓慢的 Hub 或大型容器/统计信息有效负载，超时时间会相应增加（5–120 秒） | `15` |
| **请求超时（秒）** | 每个请求的 HTTP 超时时间。对于速度较慢的 Hub 或大型容器/统计信息有效负载，超时时间会相应增加（5–120 秒） | `15` |

保存前，请使用**测试连接**按钮验证您的凭据。

### 指标
所有指标均为全局开关，适用于**所有**系统。禁用的指标会在下次适配器启动时自动从状态树中移除。

详细信息选项在其所属类别的主要指标启用之前一直处于灰色显示状态，并且每个选项都附带帮助文本，准确描述它创建的状态。

| 组 | 指标 | 默认值 |
| --------------- | ----------------------------------------------------- | ------- |
| **系统** | 运行时间 | 开启 |
| | 系统信息（硬件、操作系统、代理版本） | 关闭 |
| | Systemd 服务（总计/失败） | 关闭 |
| **CPU** | CPU 使用率 (%) | 开启 |
| | 平均负载（1分钟/5分钟/15分钟） | 开启 |
| | CPU 细分（用户/系统/IO等待/窃取/空闲） | 关闭 |
| | 单核使用率 | 关闭 |
| | 峰值 | 关闭 |
| **内存** | 内存使用情况（% 和 GB） | 开启 |
| | 内存详情（缓冲区、ZFS ARC） | 关闭 |
| | 交换 | 关闭 |
| | 峰值 | 关闭 |
| **磁盘** | 磁盘使用情况（% 和 GB） | 开启 |
| | 读/写速度 | 开启 |
| | I/O 负载（利用率、读/写等待时间） | 关闭 |
| | 附加文件系统 | 关闭 |
| | 峰值 | 关闭 |
| **网络** | 网络流量（上传/下载 MB/s） | 开启 |
| | 每个接口 | 关闭 |
| | 峰值 | 关闭 |
| **温度** | 温度（最高传感器平均值 + 最高单次温度） | 开启 |
| | 独立温度传感器 | 关闭 |
| **GPU** | GPU 指标（使用率、内存、功耗） | 关闭 |
| | GPU 详情（引擎、封装功耗） | 关闭 |
| **容器** | 容器监控（含网络）（Docker / Podman） | 关闭 |
| **电池** | 电池状态 | 关闭 |

---

## 州树
状态按指标组组织成通道。可选通道（标记为 *）仅在启用相应指标时创建。

```
beszel.0.
├── info.connection                   — Connection status (bool)
└── systems.
    └── {system_name}/                — Device (sanitized name)
        ├── info/                     — System info
        │   ├── online               — Is system up? (bool, used as device indicator)
        │   ├── status               — Status string (up/down/paused/pending)
        │   ├── uptime               — Uptime in seconds
        │   ├── uptime_text          — Human-readable uptime (e.g. "14d 6h")
        │   ├── agent_version *      — Beszel agent version
        │   ├── hostname *           — Host name (System info)
        │   ├── os *                 — Operating system (Linux/macOS/Windows/FreeBSD)
        │   ├── os_name *            — OS version (e.g. "Ubuntu 22.04")
        │   ├── kernel *             — Kernel version
        │   ├── cpu_model *          — CPU model
        │   ├── arch *               — CPU architecture
        │   ├── cores *              — Physical CPU cores
        │   ├── threads *            — Logical CPU threads
        │   ├── podman *             — Container engine is Podman (bool)
        │   ├── services_total *     — Systemd services total
        │   └── services_failed *    — Systemd services failed
        ├── cpu/                      — CPU metrics
        │   ├── usage                — CPU usage (%)
        │   ├── load_1m              — Load average 1 min
        │   ├── load_5m              — Load average 5 min
        │   ├── load_15m             — Load average 15 min
        │   ├── user *               — CPU user (%)
        │   ├── system *             — CPU system (%)
        │   ├── iowait *             — CPU I/O wait (%)
        │   ├── steal *              — CPU steal (%)
        │   ├── idle *               — CPU idle (%)
        │   ├── peak *               — Peak CPU usage in interval (%)
        │   └── cores/ *             — Per-core usage (core0, core1, …) (%)
        ├── memory/                   — Memory metrics
        │   ├── percent              — RAM usage (%)
        │   ├── used                 — RAM used (GB)
        │   ├── total                — RAM total (GB)
        │   ├── buffers *            — Buffers + cache (GB)
        │   ├── zfs_arc *            — ZFS ARC (GB)
        │   ├── swap_used *          — Swap used (GB)
        │   ├── swap_total *         — Swap total (GB)
        │   └── peak *               — Peak RAM used in interval (GB)
        ├── disk/                     — Disk metrics
        │   ├── percent              — Disk usage (%)
        │   ├── used                 — Disk used (GB)
        │   ├── total                — Disk total (GB)
        │   ├── read                 — Disk read (MB/s)
        │   ├── write                — Disk write (MB/s)
        │   ├── read_peak *          — Peak read in interval (MB/s)
        │   ├── write_peak *         — Peak write in interval (MB/s)
        │   ├── io_util *            — I/O utilization (%)
        │   ├── io_await_read *      — Read wait time (ms)
        │   └── io_await_write *     — Write wait time (ms)
        ├── network/                  — Network metrics
        │   ├── sent                 — Upload (MB/s)
        │   ├── recv                 — Download (MB/s)
        │   ├── sent_peak *          — Peak upload in interval (MB/s)
        │   ├── recv_peak *          — Peak download in interval (MB/s)
        │   └── interfaces/ *        — Per interface: up, down (MB/s) + total_up, total_down (cumulative GB)
        ├── temperature/              — Temperature metrics
        │   ├── average              — Avg of top 3 sensors (°C)
        │   ├── max                  — Hottest single sensor (°C)
        │   └── sensors/ *           — Individual sensor readings
        ├── battery/ *                — Battery metrics
        │   ├── percent              — Battery level (%)
        │   └── charging             — Is charging? (bool)
        ├── gpu/ *                    — GPU metrics (per GPU)
        │   └── {gpu_name}/
        │       ├── usage            — GPU usage (%)
        │       ├── memory_used      — VRAM used (MB)
        │       ├── memory_total     — VRAM total (MB)
        │       ├── power            — Power draw (W)
        │       ├── power_package *  — Package power (W) (GPU details)
        │       └── engines/ *       — Per-engine usage (render, video, …) (%)
        ├── filesystems/ *            — Extra filesystems (per mount)
        │   └── {fs_name}/
        │       ├── disk_percent     — Usage (%)
        │       ├── disk_used        — Used (GB)
        │       ├── disk_total       — Total (GB)
        │       ├── read_speed       — Read (MB/s)
        │       └── write_speed      — Write (MB/s)
        └── containers/ *             — Docker/Podman containers
            └── {container_name}/
                ├── status           — Container status
                ├── health           — Health (none/starting/healthy/unhealthy)
                ├── cpu              — CPU usage (%)
                ├── memory           — Memory (MB)
                ├── image            — Image name
                └── network          — Combined network throughput (bytes/s)
```

> **0.3.0 版本重大变更：** 状态从扁平路径（例如 `cpu_usage`）移至通道（例如 `cpu.usage`）。旧状态会在首次启动时自动清理。

---

## 故障排除
连接失败
- 验证 Hub URL 是否可以从 ioBroker 主机访问
- 检查用户名和密码（使用“测试连接”按钮）
- 检查防火墙是否阻止了对 Beszel Hub 端口的访问

### 未更新的州
- 检查 ioBroker 日志中是否存在来自 `beszel` 适配器的错误
- 确保轮询间隔不要太短（至少 10 秒）
- 检查 `info.connection` 状态 — 如果为 `false`，则表示身份验证失败

### 系统缺失状态
- 贝塞尔的系统可能已“宕机”或“暂停”——目前尚无统计记录。
- 确认适配器配置中已启用该指标

---

＃＃ 支持
- [ioBroker 论坛](https://forum.iobroker.net/)
- [GitHub Issues](https://github.com/krobipd/ioBroker.beszel/issues)

### 支持开发
这个适配器是免费开源的。如果您觉得它有用，可以考虑请我喝杯咖啡：

---

## Changelog
### 0.9.0 (2026-07-07)

- The "Test connection" button now correctly reports a failure when the URL, username or password is wrong — it previously showed a green "Ok" even for bad credentials.
- States for a sensor, GPU, filesystem or network interface that disappears from a system are now removed instead of freezing at their last value forever.
- Battery, GPU-power and status states now carry proper roles so VIS widgets and the type detector recognize them correctly; existing states are upgraded on the next start.
- New fleet-overview states (systems total, systems online, all-systems-online) for building a multi-server dashboard at a glance.
- Per-interface network speeds are now shown in MB/s (and totals in GB), matching the overall network values instead of raw bytes.
- A user account without permission to read containers no longer freezes all other system states — container data is skipped with a warning instead.
- The connection settings are reordered and gained help texts explaining that the "Username" is your Beszel web login, plus a hint that polling faster than 60s brings no fresher data.

### 0.8.0 (2026-06-24)

- A brief empty response from the Hub no longer deletes your devices or containers — for example right after a restart — so monitored systems and their history stay intact.
- Server hardware and OS details now recover on their own after a short network problem, instead of staying empty until the adapter is restarted.
- Two systems, filesystems, network interfaces or containers whose names shorten to the same id no longer overwrite each other's values.
- A malformed or oversized response from the Hub can no longer exhaust memory and crash the adapter.
- The adapter now warns when the Hub is reached over an unencrypted http connection to another machine, so you can switch to https.

### 0.7.2 (2026-06-12) — stable

- Much lighter polling: the adapter no longer pages through hours of stats history on every poll and only rewrites device objects when something actually changed
- Disappeared sensors, network interfaces, GPUs, filesystems and CPU cores are now cleaned up automatically instead of keeping frozen values forever
- Turning off "GPU details" now removes the package-power and engine states it created

### 0.7.1 (2026-06-09)

- Improved compact-mode behavior: beszel no longer registers global process error handlers that could interfere with other adapters running in the same process.

### 0.7.0 (2026-06-07)

- Added optional Sentry error reporting: crashes are sent to the developer so issues get fixed faster. Active only with ioBroker diagnostics enabled; anonymous.

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 krobi <krobi@power-dreams.com>

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

---

_Developed with assistance from Claude.ai_