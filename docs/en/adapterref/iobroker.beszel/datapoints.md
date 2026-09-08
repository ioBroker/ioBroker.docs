---
chapters: {"pages":{"en/adapterref/iobroker.beszel/README.md":{"title":{"en":"ioBroker.beszel — User documentation"},"content":"en/adapterref/iobroker.beszel/README.md"},"en/adapterref/iobroker.beszel/datapoints.md":{"title":{"en":"Datapoints and metric switches"},"content":"en/adapterref/iobroker.beszel/datapoints.md"},"en/adapterref/iobroker.beszel/faq.md":{"title":{"en":"Questions and troubleshooting"},"content":"en/adapterref/iobroker.beszel/faq.md"}}}
---
# Datapoints and metric switches

Every switch on the _Metrics_ tab is global: it applies to all monitored systems. Turning one off
does not just stop the updates — the matching datapoints are removed on the next start, and the
log line `Object tree updated: removed N datapoint(s)` tells you how many. Turning it back on
recreates them.

A category switch also governs its detail switches. With _CPU Usage_ off, per-core usage, the
breakdown and the peak values stay off too, greyed out in the admin and not created in the tree.
Only the System category has no such base switch; its three entries are independent.

## System

| Switch           | Datapoints                                                                                                                                                  | Notes                                                         |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Uptime _(on)_    | `info.uptime`, `info.uptime_text`                                                                                                                           | seconds, plus a readable `3d 4h 12m`                          |
| System info      | `info.hostname`, `info.os`, `info.os_name`, `info.kernel`, `info.cpu_model`, `info.arch`, `info.cores`, `info.threads`, `info.podman`, `info.agent_version` | static data, read once at start and when a new system appears |
| Systemd Services | `info.services_total`, `info.services_failed`                                                                                                               | Linux with systemd only                                       |

`info.os` is the platform family (`Linux`, `macOS`, `Windows`, `FreeBSD`); `info.os_name` is the
distribution or release the agent reports next to it, for example `Ubuntu 24.04.1 LTS`.

Always present, independent of any switch: `info.online` and `info.status`. `info.online` is what
the device icon in the object tree reads: true only while the Hub reports `up`, and false again as
soon as nothing is being read. `info.status` carries the Hub's four values
(`up`, `down`, `paused`, `pending`) plus a fifth of the adapter's own, `unknown`, used while the
adapter is stopped or cannot reach the Hub — claiming one of the Hub's values there would assert
something nobody measured.

## CPU

| Switch              | Datapoints                                                      |
| ------------------- | --------------------------------------------------------------- |
| CPU Usage _(on)_    | `cpu.usage`                                                     |
| Load Average _(on)_ | `cpu.load_1m`, `cpu.load_5m`, `cpu.load_15m`                    |
| CPU Breakdown       | `cpu.user`, `cpu.system`, `cpu.iowait`, `cpu.steal`, `cpu.idle` |
| Per-core usage      | `cpu.cores.core0`, `core1`, …                                   |
| Peak values         | `cpu.peak`                                                      |

The three load averages have no unit: they count the processes using or waiting for the CPU, so
read them against the core count — 4.0 is a busy quad-core and a quiet 32-core machine.

`cpu.steal` is the share of time the hypervisor gave to other guests — on bare metal it stays at
zero, on an oversubscribed VM it is the number that explains why everything feels slow.

## Memory

| Switch              | Datapoints                                      |
| ------------------- | ----------------------------------------------- |
| Memory Usage _(on)_ | `memory.percent`, `memory.used`, `memory.total` |
| Memory Details      | `memory.buffers`, `memory.zfs_arc`              |
| Swap                | `memory.swap_used`, `memory.swap_total`         |
| Peak values         | `memory.peak`                                   |

Buffers and ZFS ARC count as used memory but the system can reclaim them, which is why a machine
can look "full" and still be perfectly healthy.

## Disk

| Switch                  | Datapoints                                                                                                                    |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Disk Usage _(on)_       | `disk.percent`, `disk.used`, `disk.total`, `disk.name`                                                                        |
| Read/Write Speed _(on)_ | `disk.read`, `disk.write`                                                                                                     |
| Additional Filesystems  | `filesystems.<mount>.disk_percent`, `.disk_used`, `.disk_total`, `.read_speed`, `.write_speed`, `.total_read`, `.total_write` |
| I/O load                | `disk.io_util`, `disk.io_await_read`, `disk.io_await_write`, `disk.total_read`, `disk.total_write`                            |
| Peak values             | `disk.read_peak`, `disk.write_peak`                                                                                           |

The `disk.*` values describe the filesystem the agent tracks as root. Anything else you configured
in Beszel appears under `filesystems.`. `io_util` is the share of time the disk had at least one
request in flight; the two `io_await` values are the average duration of a single read or write
operation, the same figures `iostat` prints as `r_await` and `w_await`.

`disk.name` is the custom name you can give the root disk on the agent (`FILESYSTEM=device__name`)
and only appears when one is set. The `total_read` / `total_write` values are volumes, not rates:
how much the device has read or written since it was started. They need Beszel 0.19.0 or newer and
are gone again after a reboot, because the counter starts at zero.

## Network

| Switch                 | Datapoints                                                          |
| ---------------------- | ------------------------------------------------------------------- |
| Network Traffic _(on)_ | `network.sent`, `network.recv`                                      |
| Per interface          | `network.interfaces.<name>.up`, `.down`, `.total_up`, `.total_down` |
| Peak values            | `network.sent_peak`, `network.recv_peak`                            |

`up`/`down` are rates in MB/s; `total_up`/`total_down` are cumulative volumes in GB since the agent
started, so they reset when the agent restarts.

## Temperature and fans

| Switch                         | Datapoints                               |
| ------------------------------ | ---------------------------------------- |
| Temperature _(on)_             | `temperature.average`, `temperature.max` |
| Individual Temperature Sensors | `temperature.sensors.<name>`             |
| Fan Speeds                     | `fans.<name>`                            |

`temperature.average` averages the three hottest sensors, not all of them — a board reporting
twenty sensors would otherwise drown a hot CPU in cool ones. `temperature.max` is the single
hottest reading, which is usually the one worth alarming on.

Fans need Beszel 0.18.8 or newer and are Linux-only, because the agent reads them from hwmon.
They live in their own `fans` channel rather than under temperature: different source, different
meaning. A fan reading 0 rpm is kept — a stopped fan is a measurement, not a missing value.

## ZFS

| Switch    | Datapoints                                                                                       |
| --------- | ------------------------------------------------------------------------------------------------ |
| ZFS Pools | `zfs.<pool>.disk_percent`, `.disk_used`, `.disk_total`, `.read_speed`, `.write_speed`, `.health` |

One channel per pool, named as `zpool list` names it. Capacity is what ZFS reports as allocated
against the pool size, so it is not the same number a `df` inside a dataset shows. Throughput is
what the pool moved in the last collection interval — an idle pool reads 0, not "unknown".
`health` carries zpool's own word (`ONLINE`, `DEGRADED`, `FAULTED`, …); the adapter passes it on
unchanged, so a word from a newer ZFS arrives intact even if it is not in the list the admin offers.

Needs Beszel 0.19.0 or newer. The pool's detail data (scrub state, vdevs, datasets) lives in a
separate collection on the Hub — switch on **ZFS details** for it (see below).

## GPU

| Switch      | Datapoints                                                  |
| ----------- | ----------------------------------------------------------- |
| GPU Metrics | `gpu.<id>.usage`, `.memory_used`, `.memory_total`, `.power` |
| Details     | `gpu.<id>.power_package`, `gpu.<id>.engines.<name>`         |

GPU memory is reported in MB.

## Containers

| Switch               | Datapoints                                                                     |
| -------------------- | ------------------------------------------------------------------------------ |
| Container Monitoring | `containers.<name>.status`, `.health`, `.cpu`, `.memory`, `.image`, `.network` |

`health` is the result of the image's own health check and reads `none` when the image defines
none. `cpu` is the share of the whole host's CPU, so all cores together make 100% — `docker stats`
divides by a single core instead and therefore prints a higher number for the same load. `network`
is sent and received together in bytes per second, and only appears when the Hub provides it.

## Battery

| Switch         | Datapoints                                                        |
| -------------- | ----------------------------------------------------------------- |
| Battery Status | `battery.percent`, `battery.charging`, `battery.batteries.<name>` |

`battery.charging` is true only while the battery is actually charging — not when it is full,
idle or discharging. Per-battery levels need Beszel 0.18.8 or newer; a machine with a single
battery gets that one entry, with no threshold that would delete the children when a second
battery is removed.

## SMART devices

| Switch        | Datapoints                                                                                                                              | Notes                                         |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| SMART devices | `smart.<device>.state`, `.model`, `.serial`, `.firmware`, `.interface`, `.temperature`, `.capacity`, `.power_on_hours`, `.power_cycles` | needs smartctl on the host; read every 15 min |

`state` is the drive's own overall verdict (`PASSED` / `FAILED`) — a failing drive says so
here before it dies. `power_on_hours` and `power_cycles` count over the drive's whole life, not
since the last boot. A column smartctl did not fill stays empty rather than reporting a
zero that looks like a measurement.

## ZFS pool details

| Switch      | Datapoints                                                                           | Notes                                   |
| ----------- | ------------------------------------------------------------------------------------ | --------------------------------------- |
| ZFS details | `zfs.<pool>.scrub_state`, `.scrub_progress`, `.scrub_errors`                         | needs the ZFS switch                    |
| ZFS details | `zfs.<pool>.vdevs.<vdev>.state`, `.read_errors`, `.write_errors`, `.checksum_errors` | counted since the pool was last cleared |
| ZFS details | `zfs.<pool>.datasets.<dataset>.used`, `.avail`, `.mountpoint`                        | GB                                      |

`scrub_errors` is what the last scrub or resilver could not repair; it stays put until the next
run finishes, so a zero there is only as fresh as the last scrub.

The Hub refreshes these details about once an hour, so the adapter reads them every 15
minutes at most — the per-minute pool usage and health stay in the ZFS group above.

## systemd service details

| Switch          | Datapoints                                                                            | Notes                             |
| --------------- | ------------------------------------------------------------------------------------- | --------------------------------- |
| Service details | `services.<unit>.state`, `.sub_state`, `.cpu`, `.cpu_peak`, `.memory`, `.memory_peak` | needs the Systemd Services switch |

One channel per unit — on a busy host that is a lot of datapoints. `state` and `sub_state`
carry the systemd word (`active`, `running`, …), not the Hub's number. `cpu` is measured like the
container one: a share of the whole host, all cores together making 100%.