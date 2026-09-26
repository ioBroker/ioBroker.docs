---
chapters: {"pages":{"en/adapterref/iobroker.beszel/README.md":{"title":{"en":"ioBroker.beszel — User documentation"},"content":"en/adapterref/iobroker.beszel/README.md"},"en/adapterref/iobroker.beszel/datapoints.md":{"title":{"en":"Datapoints and metric switches"},"content":"en/adapterref/iobroker.beszel/datapoints.md"},"en/adapterref/iobroker.beszel/faq.md":{"title":{"en":"Questions and troubleshooting"},"content":"en/adapterref/iobroker.beszel/faq.md"}}}
---
# Datapoints and metric switches

Every switch on the _Metrics_ tab is global: it applies to all monitored systems. Turning one off
does not just stop the updates — the matching datapoints are removed on the next start, and the
log line `Object tree updated: removed N datapoint(s)` tells you how many. Turning it back on
recreates them.

A category switch also governs its detail switches. With _CPU Usage_ off, the load average, the
breakdown and per-core usage stay off too, greyed out in the admin and not created in the tree.
The System category has no such base switch: uptime, system info and systemd services are
independent, and only the service details hang on the services switch. Groups without a detail
level — fans, battery, containers, SMART, network monitors — are single switches.

## System

| Switch           | Datapoints                                                                                                                                                  | Notes                                                                                         |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Uptime _(on)_    | `info.uptime`                                                                                                                                               | seconds since the last boot                                                                   |
| System info      | `info.hostname`, `info.os`, `info.os_name`, `info.kernel`, `info.cpu_model`, `info.arch`, `info.cores`, `info.threads`, `info.podman`, `info.agent_version` | read at start, for a new system and when one comes back up; the agent version with every poll |
| Systemd Services | `info.services_total`, `info.services_failed`                                                                                                               | Linux with systemd only                                                                       |

`info.os` is the platform family (`Linux`, `macOS`, `Windows`, `FreeBSD`); `info.os_name` is the
distribution or release the agent reports next to it, for example `Ubuntu 24.04.1 LTS`.

Uptime and agent version appear once a system has connected for the first time — a system that
is still `pending` has neither, and the Hub keeps both from the last contact while it is down.
While a system is paused, the Hub sends its system values as zeros; the adapter keeps the last
real ones instead.

`info.services_total` counts the systemd units the agent watches — by default every service that
has been active at least once — and `info.services_failed` how many of those are in a failed
state.

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

The three load averages have no unit: they count the processes using or waiting for the CPU, so
read them against the core count — 4.0 is a busy quad-core and a quiet 32-core machine. They
exist only for systems whose agent reports one: an agent too old to do so gets no `load_*`
datapoints, and ones an older adapter version created for it are removed.

`cpu.steal` is the share of time the hypervisor gave to other guests — on bare metal it stays at
zero, on an oversubscribed VM it is the number that explains why everything feels slow.

## Memory

| Switch              | Datapoints                                      |
| ------------------- | ----------------------------------------------- |
| Memory Usage _(on)_ | `memory.percent`, `memory.used`, `memory.total` |
| Memory Details      | `memory.buffers`, `memory.zfs_arc`              |
| Swap                | `memory.swap_used`, `memory.swap_total`         |

Buffers, file cache and the ZFS ARC are not part of `memory.used`: the system can reclaim them,
and the agent reports them separately. `memory.zfs_arc` exists only on hosts whose ZFS cache
holds memory, and the two swap datapoints only where swap is configured — `swap_used` reads 0
while it is unused.

## Disk

| Switch                  | Datapoints                                                                                                                   |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Disk Usage _(on)_       | `disk.percent`, `disk.used`, `disk.total`, `disk.name`                                                                       |
| Read/Write Speed _(on)_ | `disk.read`, `disk.write`                                                                                                    |
| Additional Filesystems  | `filesystems.<name>.disk_percent`, `.disk_used`, `.disk_total`, `.read_speed`, `.write_speed`, `.total_read`, `.total_write` |
| I/O load                | `disk.io_util`, `disk.io_await_read`, `disk.io_await_write`, `disk.total_read`, `disk.total_write`                           |

The `disk.*` values describe the filesystem the agent tracks as root. Anything else you configured
in Beszel appears under `filesystems.`, named after the device or the custom name set on the agent
(`EXTRA_FILESYSTEMS=device__name`). `io_util` is the share of time the disk had at least one
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

`up`/`down` are rates in MB/s; `total_up`/`total_down` are the operating system's cumulative
counters in GB since the interface came up — usually since boot — so they reset with a reboot, not
with an agent restart. `network.sent`/`network.recv` read 0 while the link is idle — the Hub omits
an idle rate from the record, and idle is a value, not a gap.

## Temperature and fans

| Switch                         | Datapoints                               |
| ------------------------------ | ---------------------------------------- |
| Temperature _(on)_             | `temperature.average`, `temperature.max` |
| Individual Temperature Sensors | `temperature.sensors.<name>`             |
| Fan Speeds                     | `fans.<name>`                            |

`temperature.average` averages the three hottest sensors, not all of them — a board reporting
twenty sensors would otherwise drown a hot CPU in cool ones. `temperature.max` is the single
hottest reading, which is usually the one worth alarming on. Both exist only on hosts whose agent
reports sensors — a VM or a container host without hwmon data gets no temperature channel, and one
whose sensors stop being reported loses the two datapoints after two polls instead of keeping an
empty value.

Fans need Beszel 0.18.8 or newer and are Linux-only, because the agent reads them from hwmon.
They live in their own `fans` channel rather than under temperature: different source, different
meaning. A fan reading 0 rpm is kept — a stopped fan is a measurement, not a missing value.

## Storage pools (ZFS and btrfs)

| Switch        | Datapoints                                                                                                             |
| ------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Storage pools | `zfs.<pool>.pool_type`, `.disk_percent`, `.disk_used`, `.disk_total`, `.raw`, `.read_speed`, `.write_speed`, `.health` |

One channel per pool. ZFS pools need Beszel 0.19.0 or newer and are named as `zpool list` names
them; btrfs filesystems need Beszel 0.20.0 and carry the agent's name for them (the label, else
the mount point, else the UUID) while their channel id stays the filesystem's UUID, so a new label
does not move the channel. The internal names (`zfs.`, the switch) stayed from the time only ZFS existed.
`pool_type` says which of the two it is.

Capacity is what the pool reports as allocated against its size, so it is not the same number a
`df` inside a dataset shows. When `raw` is true, size and usage are raw physical bytes across all
member devices (a btrfs filesystem whose usable space the agent could not read) — then there is
no `disk_percent`, because that figure would be misleading. Throughput is what the pool moved in
the last collection interval — an idle pool reads 0, not "unknown". `health` carries the pool's
own word (`ONLINE`, `DEGRADED`, `FAULTED`, …, `UNKNOWN`); the adapter passes it on unchanged, so a
word from a newer version arrives intact even if it is not in the list the admin offers.

A btrfs root can also appear under Disk or Additional Filesystems — the agent reports it in both
places. The pool's detail data (scrub state, vdevs, datasets) lives in a separate collection on
the Hub — switch on **Pool details** for it (see below).

## GPU

| Switch      | Datapoints                                                  |
| ----------- | ----------------------------------------------------------- |
| GPU Metrics | `gpu.<id>.usage`, `.memory_used`, `.memory_total`, `.power` |
| Details     | `gpu.<id>.power_package`, `gpu.<id>.engines.<name>`         |

GPU memory is reported in MB and only exists on GPUs that report it — an integrated GPU usually
does not, and gets no memory datapoints. `power_package` (GPU details) likewise only exists on
GPUs with a package power sensor, such as Intel GPUs read through `intel_gpu_top`; an NVIDIA card
has none.

## Containers

| Switch               | Datapoints                                                                                          |
| -------------------- | --------------------------------------------------------------------------------------------------- |
| Container Monitoring | `containers.<name>.status`, `.health`, `.cpu`, `.memory`, `.image`, `.network`, `.update_available` |

`health` is the result of the image's own health check and reads `none` when the image defines
none. `cpu` is the share of the whole host's CPU, so all cores together make 100% — `docker stats`
divides by a single core instead and therefore prints a higher number for the same load. `network`
is sent and received together in bytes per second, and only appears when the Hub provides it.

`update_available` (Beszel 0.20.0) is true when the registry holds a newer image under the
container's tag than the one it runs. False means no update is known — also when the image is pinned or excluded from the check,
the check failed or has not run yet. It only appears when the Hub carries the column.

## Battery

| Switch         | Datapoints                                                        |
| -------------- | ----------------------------------------------------------------- |
| Battery Status | `battery.percent`, `battery.charging`, `battery.batteries.<name>` |

`battery.charging` is true only while the battery is actually charging — not when it is full,
idle or discharging. Per-battery levels need Beszel 0.18.8 or newer; a machine with a single
battery gets that one entry, with no threshold that would delete the children when a second
battery is removed. A host without a battery gets no battery channel at all.

## SMART devices

| Switch        | Datapoints                                                                                                                              | Notes                                         |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| SMART devices | `smart.<device>.state`, `.model`, `.serial`, `.firmware`, `.interface`, `.temperature`, `.capacity`, `.power_on_hours`, `.power_cycles` | needs smartctl on the host; read every 15 min |

`state` is the overall verdict: the drive's own SMART self-assessment (`PASSED` / `FAILED`), or
for eMMC storage and Linux md RAID arrays — which the agent reads without smartctl — the wear or
array state, which can also say `WARNING`. `UNKNOWN` means the agent could not judge the drive.
`power_on_hours` and `power_cycles` count over the drive's whole life, not since the last boot.
`temperature` and `capacity` only exist for drives that report them, and a text column the
drive did not fill stays empty rather than reporting something that looks like a measurement.

The Hub refreshes SMART data once an hour by default (the agent setting `SMART_INTERVAL` changes
that); the adapter reads it every 15 minutes, so a new verdict shows within a quarter of an hour
of the Hub's refresh.

## Storage pool details

| Switch       | Datapoints                                                                           | Notes                                   |
| ------------ | ------------------------------------------------------------------------------------ | --------------------------------------- |
| Pool details | `zfs.<pool>.scrub_state`, `.scrub_progress`, `.scrub_errors`                         | needs the storage pools switch          |
| Pool details | `zfs.<pool>.vdevs.<vdev>.state`, `.read_errors`, `.write_errors`, `.checksum_errors` | counted since the pool was last cleared |
| Pool details | `zfs.<pool>.datasets.<dataset>.used`, `.avail`, `.mountpoint`                        | GB                                      |

The scrub datapoints only exist once a pool has been scrubbed — a ZFS pool that never was, and
every btrfs filesystem (the agent reads no btrfs scrub), has none. `scrub_state` is `SCANNING`,
`FINISHED` or `CANCELED`, `scrub_progress` the share done while a scrub runs (for example
`42.10%`). `scrub_errors` is what the last scrub or resilver could not repair; it stays put until
the next run finishes, so a zero there is only as fresh as the last scrub.

A btrfs filesystem lists its member devices as vdevs and has no datasets. A vdev `state` of
`MISSING` means a member device is gone.

The Hub refreshes these details about once an hour, so the adapter reads them every 15
minutes at most — the per-minute pool usage and health stay in the storage pools group above.
Details only reach pools the storage pools group currently shows.

## systemd service details

| Switch          | Datapoints                                                                            | Notes                             |
| --------------- | ------------------------------------------------------------------------------------- | --------------------------------- |
| Service details | `services.<unit>.state`, `.sub_state`, `.cpu`, `.cpu_peak`, `.memory`, `.memory_peak` | needs the Systemd Services switch |

One channel per unit — on a busy host that is a lot of datapoints. `state` and `sub_state`
carry the systemd word (`active`, `running`, …), not the Hub's number. The agent reads the units
every 10 minutes: `cpu` is the average over those 10 minutes as a share of the whole host, all
cores together making 100%. `cpu_peak` and `memory_peak` are the highest values since the agent
started watching the unit; for memory, systemd's own peak since the unit started counts too.

## Network monitors

| Switch           | Datapoints                                                                                                                                                                                                    | Notes                  |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| Network monitors | `monitors.<id>.protocol`, `.target`, `.port`, `.interval`, `.enabled`, `.response`, `.response_avg_1h`, `.response_min_1h`, `.response_max_1h`, `.loss_1h`, `.last_probe_loss`, `.last_probe`, `.last_update` | Beszel 0.20.0 or newer |

One channel per monitor you set up for the system on the Hub — the agent probes the target by
ping (`icmp`), `tcp`, `http` or `dns` at the configured interval. The channel id is made of the
protocol and the target (plus the port for tcp), so a monitor whose target changes moves to a new
channel and the old one goes. `port` exists for tcp monitors only.

`response` is the latest response time in ms, `response_avg_1h`, `response_min_1h` and
`response_max_1h` cover the last hour; all four stay empty while there has been no successful
probe. `loss_1h` is the share of failed probes over the last hour in %. `last_probe_loss` and
`last_probe` come from the newest probe record: its loss and its time — with a long interval that
record can be up to an interval old, which is why it is not called "last minute". `last_update`
is when the Hub last updated the monitor; it stays empty for a monitor that has never been
measured, and its values then stay empty too. A monitor switched off on the Hub keeps its last
values with `enabled` false.