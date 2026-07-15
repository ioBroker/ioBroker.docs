# <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.beszel@main/admin/beszel.svg" width="48" align="top" /> ioBroker.beszel

**Release:** [![npm version](https://img.shields.io/npm/v/iobroker.beszel)](https://www.npmjs.com/package/iobroker.beszel) ![stable](https://iobroker.live/badges/beszel-stable.svg) ![Installations](https://iobroker.live/badges/beszel-installed.svg) [![npm downloads](https://img.shields.io/npm/dt/iobroker.beszel)](https://www.npmjs.com/package/iobroker.beszel)

**Build:** [![Test and Release](https://github.com/krobipd/ioBroker.beszel/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/krobipd/ioBroker.beszel/actions/workflows/test-and-release.yml) ![Node](https://img.shields.io/badge/node-%3E%3D22-brightgreen) ![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue) [![License](https://img.shields.io/badge/license-MIT-green)](LICENSE) [![Sentry](https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white)](https://github.com/ioBroker/plugin-sentry#plugin-sentry)

**Support:** [![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?logo=ko-fi)](https://ko-fi.com/krobipd) [![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg)](https://paypal.me/krobipd)

Connects to a [Beszel](https://github.com/henrygd/beszel) Hub and exposes server monitoring metrics for all registered systems as ioBroker states.

---

## Features

- Fetches metrics from all systems registered in your Beszel Hub
- Per-system states: CPU, memory, disk, network, temperature, load average
- Optional detail: per-core CPU, peak values, disk I/O load, per-interface traffic, GPU details, hardware/OS info, Docker/Podman containers, battery, extra filesystems, CPU breakdown, systemd services
- Each option has a help text explaining the states it creates; detail options stay greyed out until their category is enabled
- Configurable poll interval (10–300 seconds)
- Automatic re-authentication when the token expires (including mid-poll)
- Connection test button in the admin UI
- Automatic cleanup of states for removed systems, stale containers and disabled metrics

---

## Sentry / Error reporting

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** Reporting only happens if you have enabled error reporting in the ioBroker diagnostics (**System settings → Diagnostics and error reporting**). Only an anonymous installation ID is transmitted — no name, e-mail address or IP address.

For details and how to disable it, see the [Sentry plugin documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry). Error reporting requires js-controller 3.0 or newer.

---

## Requirements

- **Node.js >= 22**
- **ioBroker js-controller >= 7.2.2**
- **ioBroker Admin >= 7.8.23**
- A running [Beszel Hub](https://github.com/henrygd/beszel) with at least one registered system

---

## Configuration

### Connection

| Option                  | Description                                                                             | Default |
| ----------------------- | --------------------------------------------------------------------------------------- | ------- |
| **Beszel Hub URL**      | Full URL of your Beszel Hub (e.g. `http://192.168.1.100:8090`)                          | —       |
| **Username**            | Beszel Hub login email/username                                                         | —       |
| **Password**            | Beszel Hub password                                                                     | —       |
| **Poll Interval (s)**   | How often to fetch data from the Hub (10–300)                                           | `60`    |
| **Request Timeout (s)** | Per-request HTTP timeout. Raise for slow Hubs or large container/stats payloads (5–120) | `15`    |

Use the **Test Connection** button to verify your credentials before saving.

### Metrics

All metrics are global toggles that apply to **all** systems. Disabled metrics are automatically removed from the state tree on the next adapter start.

Detail options stay greyed out until their category's main metric is enabled, and each option carries a help text describing exactly which states it creates.

| Group           | Metric                                                | Default |
| --------------- | ----------------------------------------------------- | ------- |
| **System**      | Uptime                                                | on      |
|                 | System info (hardware, OS, agent version)             | off     |
|                 | Systemd Services (total / failed)                     | off     |
| **CPU**         | CPU Usage (%)                                         | on      |
|                 | Load Average (1m / 5m / 15m)                          | on      |
|                 | CPU Breakdown (User / System / IOWait / Steal / Idle) | off     |
|                 | Per-core usage                                        | off     |
|                 | Peak values                                           | off     |
| **Memory**      | Memory Usage (% and GB)                               | on      |
|                 | Memory Details (Buffers, ZFS ARC)                     | off     |
|                 | Swap                                                  | off     |
|                 | Peak values                                           | off     |
| **Disk**        | Disk Usage (% and GB)                                 | on      |
|                 | Read/Write Speed                                      | on      |
|                 | I/O load (utilization, read/write wait times)         | off     |
|                 | Additional Filesystems                                | off     |
|                 | Peak values                                           | off     |
| **Network**     | Network Traffic (Upload / Download MB/s)              | on      |
|                 | Per interface                                         | off     |
|                 | Peak values                                           | off     |
| **Temperature** | Temperature (hottest sensors avg + hottest single)    | on      |
|                 | Individual Temperature Sensors                        | off     |
| **GPU**         | GPU Metrics (Usage, Memory, Power)                    | off     |
|                 | GPU details (engines, package power)                  | off     |
| **Containers**  | Container Monitoring incl. network (Docker / Podman)  | off     |
| **Battery**     | Battery Status                                        | off     |

---

## State Tree

States are organized into channels per metric group. Optional channels (marked \*) are only created when the corresponding metric is enabled.

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

> **Breaking change in 0.3.0:** States moved from flat paths (e.g. `cpu_usage`) to channels (e.g. `cpu.usage`). Legacy states are automatically cleaned up on first start.

---

## Troubleshooting

### Connection failed

- Verify the Hub URL is reachable from the ioBroker host
- Check username and password (use the Test Connection button)
- Check that no firewall blocks access to the Beszel Hub port

### States not updating

- Check the ioBroker log for errors from the `beszel` adapter
- Ensure the poll interval is not too short (minimum 10 seconds)
- Check `info.connection` state — if `false`, authentication failed

### Missing states for a system

- The system may be `down` or `paused` in Beszel — no stats records exist yet
- Verify the metric is enabled in the adapter configuration

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

## Support

- [ioBroker Forum](https://forum.iobroker.net/)
- [GitHub Issues](https://github.com/krobipd/ioBroker.beszel/issues)

### Support Development

This adapter is free and open source. If you find it useful, consider buying me a coffee:

[![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi)](https://ko-fi.com/krobipd)
[![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge)](https://paypal.me/krobipd)

---

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
