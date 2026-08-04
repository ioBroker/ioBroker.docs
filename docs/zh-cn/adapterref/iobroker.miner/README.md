---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.miner/README.md
title: ioBroker.miner
hash: N6VVMr5r7l3q/UR60Pfkh8RpqILAlgq0AO/KxXvGNZ8=
---
![标识](../../../en/adapterref/iobroker.miner/admin/miner.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.miner.svg)
![下载](https://img.shields.io/npm/dm/iobroker.miner.svg)
![安装数量](https://iobroker.live/badges/miner-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/miner-stable.svg)
![NPM](https://nodei.co/npm/iobroker.miner.png?downloads=true)

# IoBroker.miner
**测试：** ![测试与发布](https://github.com/SimonFischer04/ioBroker.miner/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的挖矿适配器
与不同的加密货币挖矿API进行交互

## 路线图
- [X] v0.1：设备管理，trm 实现
- [X] 更多矿工支持：bos+、xmrig、avalon……？
- [ ] 实现更多功能（控制 + 来自设备的信息）
- [ ] 池支持
- [ ] 设备发现
- [ ] 哨兵
- [ ] 更多信息：请参阅 Todo.md / issues

＃＃ 用法
在实例设置（或管理员设备管理器选项卡）中添加新设备时，您应该会看到类似这样的对话框：

![添加设备.png](../../../en/adapterref/iobroker.miner/docs/AddDevice.png)

这些选项应该很容易理解。每个选项都有工具提示，提供更多详细信息。如果还有任何不清楚的地方，请随时在问题、讨论或论坛中提问。

### Brains OS 挖矿类型
由于 Braiins 在固件迭代过程中更改了 API 堆栈，因此存在两种 Braiins 挖矿程序实现：

- `bos`：用于官方 Braiins OS 固件版本 `>= 23.03`，通常适用于 Antminer S19 系列及更新机型。此实现通过 gRPC 使用 Braiins OS 公共 API (PAPI)。
- `bosMiner`：用于版本低于 23.03 的旧版 Braiins OS 固件，通常指 S19 之前的设备，例如 Antminer S9 和 S17 系列。它将继续使用旧版的 CGMiner 兼容 API。

`bosMiner` 也支持 `control.powerTarget` 状态。旧版 Braiins OS 未通过 CGMiner 兼容的 API 公开此状态，因此适配器使用 SSH 变通方案：它登录到矿机，更新 `/etc/bosminer.toml` 中 `[autotuning]` 部分的 `power_target` 和 §§SSSSS_6§§ 中 `[format]` 部分的 `timestamp`，在 `/etc/bosminer.toml.iobroker-power-target.bak` 处存储备份，停止 `bosminer`，写入配置，然后重新启动 `bosminer`。为 `bosMiner` 设备配置有效的 SSH 凭据；默认用户名是 `root`，无密码。

警告：在旧款设备上更改 `control.powerTarget`需要执行完整的 `bosminer` 停止/启动循环。请勿频繁更改此值；仅用于有意更改目标值，不可用于快速自动化循环。

如果您不确定该选择哪一个，请先查看固件版本/设备系列：

- S19/S21/T19 及更新的 Braiins OS 镜像已列入当前固件下载流程，通常应使用 `bos` 命令。
- S17 镜像在 Braiins 下载页面上以 `v 23.01` 版本发布，S9 镜像以 `v 22.08.1` 版本发布，因此这些旧版本应该使用 `bosMiner`。

参考：

- Braiins 操作系统公共 API：https://academy.braiins.com/braiins-os/papi-about
- Braiins OS 固件下载：https://braiins.com/os-firmware/download

## 对象模型
所有对象均在以下环境下创建：

`miner.<instance>.miner.<minerId>`

`<minerId>` 是设备配置 (`settings.id`) 中的稳定 ID。这允许在同一主机上运行多个挖矿进程。

### 群组（频道）
- `info`: 身份/配置/固件/连接元数据
- `stats`：实时性能指标（算力、份额、功耗、温度等）
- `control`：可写控件（启动/停止、重启等）
- `raw`：原始 API 有效负载（专家）

### 实体（可选子树）
部分矿工会暴露子实体。如果存在子实体，它们会放置在矿工下方：

- `pools.<index>...`
- `hardware.gpus.<index>...`
- `hardware.hashboards.<index>...`

### 示例
- `miner.0.miner.<minerId>.enabled`
- `miner.0.miner.<minerId>.control.running`
- `miner.0.miner.<minerId>.stats.totalHashrate`
- `miner.0.miner.<minerId>.hardware.gpus.0.stats.temp`
- `miner.0.miner.<minerId>.raw.stats`

### 启用/禁用挖矿程序
每个矿机设备都有一个可写的顶层状态 `enabled`：

`miner.<instance>.miner.<minerId>.enabled`

将此状态设置为 `false` 可在运行时禁用适配器中的挖矿程序。禁用的挖矿程序将被卸载，并且不会对其进行任何轮询/控制处理。将其设置回 `true` 可在不重启适配器的情况下重新初始化挖矿程序。

这与 `control.running` 不同：`enabled` 控制适配器是否管理矿工，而 `control.running` 请求受支持的矿工开始或停止挖矿。

### 示例树
这只是一个概述/想法/计划。并非所有内容都已实现，但它应该能让您了解预期的结构和命名。实际实现可能会在某些细节上有所不同，但总体结构应该与此类似。

```
miner.0
  miner
    <minerId>                        (device)
      enabled                        (boolean)  enable/disable adapter handling for this miner
      info                           (channel)
        minerType                    (string)   e.g. xmRig / teamRedMiner / bosMiner
        host                         (string)
        version                      (string)   (maps to feature: version)
        online                        (boolean)  derived from lastSeen
        lastSeen                     (number)   unix ms
      stats                          (channel)
        totalHashrate                (number)   H/s (maps to feature: totalHashrate)
        power                        (number)   W
        dynamicPowerTarget           (number)   W, current dynamic target reported by miner
        efficiency                   (number)   H/W
        acceptedShares               (number)
        rejectedShares               (number)
      control                        (channel)  (writable states only here, top-level)
        running                      (boolean)  start/stop (maps to feature: running)
        reboot                       (boolean)  "button"
        profile                      (string)   performance profile (e.g. low/medium/high)
        powerTarget                  (number)   W, configured target to write to miner
      pools                          (channel)
        0                            (channel)
          info
            url                      (string)
            user                     (string)
          stats
            status                   (string)
            acceptedShares           (number)
            rejectedShares           (number)
        1 ...
      hardware                       (channel)
        gpus                         (channel)
          0                          (channel)
            info
              name                   (string)
            stats
              hashrate               (number)
              temp                   (number)   °C
              fanRpm                 (number)
              power                  (number)
          1 ...
        hashboards                   (channel)  (ASICs)
          0
            stats
              hashrate               (number)
              temp                   (number)
      raw                            (channel)
        stats                        (object/string) raw miner payload (maps to feature: rawStats)
```

## 鸣谢
该徽标是使用 ChatGPT 创建的。

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.1.0 (2026-07-12)
- (copilot) Adapter requires node.js >= 22 now
* (SimonFischer04) **NEW**: Added a new `bos` miner type for newer Braiins OS firmware using the Braiins Public API
* (SimonFischer04) **ENHANCED**: Extended legacy `bosMiner` devices with writable `control.powerTarget` support for deliberate power target changes
* (SimonFischer04) **NEW**: Added top-level `enabled` state to dynamically enable or disable miner handling at runtime
* (SimonFischer04) **FIXED**: Removed example configuration (option1, option2) from native section and code (fixes #126 / E5040)

### 1.0.4 (2026-04-07)
* (SimonFischer04) fix repo url in package-json

### 1.0.3 (2026-04-07)
* (SimonFischer04) increase admin requirement to fix DM (does not work at all with current stable 7.7.22)

### 1.0.2 (2026-04-07)
* (SimonFischer04) **CI/CD**: Migrated deploy workflow from NPM classic tokens to Trusted Publishing (OIDC) (fixes #80)
* (SimonFischer04) cleanup readme

### 1.0.1 (2026-04-06)
* (SimonFischer04) fix release

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

Copyright (c) 2026 SimonFischer04 <simi.fischa@gmail.com>  

This project is licensed under the GNU General Public License v3.0 - see [LICENSE](https://github.com/SimonFischer04/ioBroker.miner/blob/main/LICENSE) for details.