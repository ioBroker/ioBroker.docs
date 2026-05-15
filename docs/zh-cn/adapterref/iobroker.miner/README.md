---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.miner/README.md
title: ioBroker.miner
hash: PbsimuJ+Zj1MI5dpVDFZUulmbYCu1eMtI49nE+li5nk=
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
- [ ] 修复 .releaseconfig 中的许可证插件

＃＃ 用法
在实例设置（或管理员设备管理器选项卡）中添加新设备时，您应该会看到类似这样的对话框：

![添加设备.png](../../../en/adapterref/iobroker.miner/docs/AddDevice.png)

这些选项应该很容易理解。每个选项都有工具提示，提供更多详细信息。如果还有任何不清楚的地方，请随时在问题、讨论或论坛中提问。

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
- `miner.0.miner.<minerId>.control.running`
- `miner.0.miner.<minerId>.stats.totalHashrate`
- `miner.0.miner.<minerId>.hardware.gpus.0.stats.temp`
- `miner.0.miner.<minerId>.raw.stats`

### 示例树
这只是一个概述/想法/计划。并非所有内容都已实现，但它应该能让您了解预期的结构和命名。实际实现可能会在某些细节上有所不同，但总体结构应该与此类似。

```
miner.0
  miner
    <minerId>                        (device)
      info                           (channel)
        minerType                    (string)   e.g. xmRig / teamRedMiner / bosMiner
        host                         (string)
        version                      (string)   (maps to feature: version)
        online                        (boolean)  derived from lastSeen
        lastSeen                     (number)   unix ms
      stats                          (channel)
        totalHashrate                (number)   H/s (maps to feature: totalHashrate)
        power                        (number)   W
        efficiency                   (number)   H/W
        acceptedShares               (number)
        rejectedShares               (number)
      control                        (channel)  (writable states only here, top-level)
        running                      (boolean)  start/stop (maps to feature: running)
        reboot                       (boolean)  "button"
        profile                      (string)   performance profile (e.g. low/medium/high)
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
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now
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

### 1.0.0 (2026-04-06)
* (SimonFischer04) **FIXED**: Added missing size attributes (xs, xl) to admin configuration fields
* (SimonFischer04) **ENHANCED**: Updated dependencies to recommended versions (admin 7.6.17, js-controller 6.0.11)
* (SimonFischer04) **ENHANCED**: Added copyright notice to README
* (SimonFischer04) **NEW**: Added support for Avalon (Canaan) devices via CGMiner-compatible socket API (port 4028), including start/stop (softon/softoff) and stats polling
* (SimonFischer04) **ENHANCED**: Restructured object model with dedicated channels for control, info, stats, and raw data (**breaking change** – legacy state paths are auto-cleaned on startup)
* (SimonFischer04) **NEW**: Added info states (minerType, host, online, lastSeen) and stats states (power, efficiency, acceptedShares, rejectedShares) to match the documented object model
* (SimonFischer04) **NEW**: Added reboot control state (button) with wiring in state change handler
* (SimonFischer04) **NEW**: Added running switch control to Device Manager for devices supporting the running feature
* (SimonFischer04) **NEW**: Added performance profile feature with control.profile state and Device Manager dropdown (low/medium/high) — initially for Avalon miners via ascset workmode command
* (SimonFischer04) **ENHANCED**: Renamed SGMiner to CGMiner throughout the codebase to better reflect the underlying API
* (SimonFischer04) **FIXED**: Fixed copyright formatting in README to satisfy ioBroker repository checker (fixes #95)

### 0.0.1 (2026-02-15)
* (SimonFischer04) initial release

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

Copyright (c) 2026 SimonFischer04 <simi.fischa@gmail.com>  

This project is licensed under the GNU General Public License v3.0 - see [LICENSE](https://github.com/SimonFischer04/ioBroker.miner/blob/main/LICENSE) for details.