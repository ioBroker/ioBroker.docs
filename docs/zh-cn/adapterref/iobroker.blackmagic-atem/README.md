---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.blackmagic-atem/README.md
title: ioBroker.blackmagic-atem
hash: +KN6rToFPh+F/0T4I7QVCCnqccNiLeLb3bkuizXYdzg=
---
# IoBroker.blackmagic-atem

![NPM 版本](https://img.shields.io/npm/v/iobroker.blackmagic-atem.svg)
![下载](https://img.shields.io/npm/dm/iobroker.blackmagic-atem.svg)
![安装数量](https://iobroker.live/badges/blackmagic-atem-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/blackmagic-atem-stable.svg)
![执照](https://img.shields.io/npm/l/iobroker.blackmagic-atem.svg)

**测试：** ![测试与发布](https://github.com/AlanSRU/ioBroker.blackmagic-atem/workflows/Test%20and%20Release/badge.svg)

通过 ioBroker 控制 Blackmagic ATEM 视频混合器 — 支持从 Mini 到 Constellation 4K+ 的所有 21+ 款 ATEM 型号。

＃＃ 描述
该适配器控制 [Blackmagic Design ATEM（https://www.blackmagicdesign.com/products/atem）视频混合器通过网络进行连接。它使用逆向工程的 ATEM UDP 协议，通过 [atem-connection] 进行连接。](https://github.com/Sofie-Automation/sofie-atem-connection) 库，并支持 21 种以上的型号变体——从 ATEM Mini 到 Television Studio 再到 Constellation 4K+——具有基于功能的创建状态，可适应连接的设备。

＃＃ 特征
- **节目/预览切换** — 更改节目和预览输入
- **转场效果** — 剪切、自动、手动 T 型杆；混合/浸入/擦除/DVE/刺眼等多种转场效果，每种效果均有相应的费率。
- **淡入黑屏** — 切换和配置 FTB 速率
- **上游键控器**（每位 M/E 最多 4 个）— 开启、类型、填充/键控源、掩码、飞行
- **下游键控器**（最多 4 个）— 播出、同步、自动、速率、填充/键控源
- **辅助输出**（最多 48 个）— 音源路由
- **音频混音器** — 主增益/平衡、监听、每个输入增益/平衡/混音（经典 + Fairlight）
- **颜色生成器** — 色相/饱和度/亮度
- **流媒体播放** — 开始/停止、状态、缓存使用情况（支持的型号）
- **录制** — 开始/停止、切换磁盘、录制时长、剩余空间（支持的型号）
- **媒体播放器** — 源类型、静态/视频索引、播放控制
- **统计** — 程序/预览统计状态
- **宏** — 运行、停止、继续、循环、命名槽（最多 100 个）
- **输入元数据** — 短名称/长名称、端口类型
- **自动型号检测** — 从已连接的设备中发现的功能

＃＃ 要求
- js-controller >= 6.0.11
- ioBroker 管理员 >= 7.6.20
- Node.js 版本 >= 22
- 具备网络连接功能的 Blackmagic ATEM 切换台

＃＃ 安装
通过 ioBroker 管理界面安装：**适配器 → 搜索 `blackmagic-atem` → 安装**。

＃＃ 配置
1. 在 ioBroker 管理后台打开适配器实例配置
2. 输入您的 ATEM 设备的 IP 地址
3. 选择型号（或保持自动检测）
4. 如有需要，调整重连间隔
5. 保存并启动适配器

## 州树
```
info.connection
device.{modelName, productId, videoMode, capabilities}
me[0-3].{programInput, previewInput, inTransition, transitionPosition}
me[0-3].transition.{style, mixRate, dipRate, wipeRate, dveRate, wipePattern}
me[0-3].fadeToBlack.{isFullyBlack, inTransition, rate}
me[0-3].usk[0-3].{onAir, type, fillSource, keySource, maskEnabled, flyEnabled}
commands.{cut, auto, ftb}
dsk[0-3].{onAir, tie, inTransition, rate, fillSource, keySource, auto}
aux[0-47].source
audio.master.{gain, balance, afv}
audio.monitor.{enabled, gain, mute, solo, dim}
audio.inputs.input[N].{gain, balance, mixOption}
audio.commands.resetPeaks
colorGenerator[0-1].{hue, saturation, luminance}
streaming.{status, start, stop, duration, cacheUsed}
recording.{status, start, stop, switchDisk, duration, remainingDiskSpace}
mediaPlayer[0-3].{sourceType, stillIndex, clipIndex, playing, loop, atBeginning}
tally.{programInputs, previewInputs}
macros.{run, stop, continue, isRunning, isWaiting, loop, runningIndex, recordedCount}
macros.slots[0-99].{name, isUsed, trigger}
inputs.input[N].{shortName, longName, inputId, portType}
```

状态是根据检测到/选择的模型功能有条件地创建的。当模型发生变化时，孤立状态会被清理。

## 用法示例
```javascript
// Switch program to camera 1
setState('blackmagic-atem.0.me0.programInput', 1);

// Perform a cut
setState('blackmagic-atem.0.commands.cut', true);

// Start streaming (supported models only)
setState('blackmagic-atem.0.streaming.start', true);

// Run macro 5
setState('blackmagic-atem.0.macros.run', 5);
```

## 输入 ID 参考
| ID | 来源 |
| ------------- | ----------------------- |
| 1–8 | 摄像头输入 |
| 0 | 黑色 |
| 1000 | 彩条 |
| 2001–2002 | 颜色生成器 1、2 |
| 3010、3011 | 媒体播放器 1、2 |
| 3020、3021 | 媒体播放器 1、2 密钥 |
| 7001–7002 | 清洁饲料 1、2 |
| 10010、10011 | 程序、预览 |

## 协议说明
该适配器使用开源社区记录的逆向工程 ATEM UDP 协议（端口 9910）：

- [OpenSwitcher 文档](https://docs.openswitcher.org/)
- [atem-connection 库](https://github.com/Sofie-Automation/sofie-atem-connection)

ATEM 协议没有身份验证——请将 ATEM 设备放在受信任的私有网络上。

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### 0.2.9 (2026-07-12)
- (Alan Paris) Made macros.run write-only (it no longer retains the last-triggered index); use macros.runningIndex to read the active macro
- (Alan Paris) Renamed recording.remainingDiskSpace to "Remaining Recording Time" and documented that its value is seconds of available recording capacity, not bytes
- (Alan Paris) Stopped writing audio.master.afvCrossfade on Fairlight models, where the state does not exist

### 0.2.8 (2026-07-05)
- (Alan Paris) Fixed upstream-keyer mask/fly enable and downstream-key pre-multiplied controls, which were writable but ignored, so they now apply to the switcher
- (Alan Paris) Master audio gain now controls Fairlight mixers correctly (previously it sent a Classic-audio command that Fairlight models ignored)
- (Alan Paris) Hid Classic-only audio controls (master balance/AFV crossfade, monitor enable/solo/dim) on Fairlight models, where they had no effect
- (Alan Paris) Added default values to all dynamically created states

### 0.2.7 (2026-07-04)
- (Alan Paris) Added a link to the Blackmagic Design ATEM product page in the README
- (Alan Paris) Clamp the reconnect interval in code so out-of-range config values cannot break the timer
- (Alan Paris) Removed the unused `pollInterval` config option (the adapter is fully push-based)
- (Alan Paris) Removed the unused `audio.master.programOutGain` state

### 0.2.6 (2026-07-04)
- (Alan Paris) Updated atem-connection to 3.9.0 and dev dependencies (@iobroker/types, rimraf)
- (Alan Paris) Extended tsconfig from @tsconfig/node22 for standardized type checking
- (Alan Paris) Switched Dependabot to cron schedules to distribute update load

### 0.2.5 (2026-07-04)
- (Alan Paris) Resolved all ESLint warnings (unawaited promises, JSDoc parameter descriptions)

### 0.2.4 (2026-07-04)
- (Alan Paris) Fixed state roles so writable transition, keyer and media-player selectors, macro run and input info states pass the ioBroker object checker
- (Alan Paris) Removed the legacy flat `transitionStyle` state on upgrade
- (Alan Paris) Use adapter-managed timers for the reconnect timeout
- (Alan Paris) Updated dependencies for repochecker compliance

### 0.2.3 (2026-05-21)
- (Alan Paris) Bump minimum Node.js to 22 and CI matrix to 22/24 for ioBroker community submission compliance
- (Alan Paris) Set `common.noGit: true` so the gitignored `build/` tree does not trip the repochecker
- (Alan Paris) Trim `common.news` to only versions published to npm

### 0.2.2 (2026-05-20)
- (Alan Paris) Switched CI publish to npm trusted publishing (OIDC)

### 0.2.1 (2026-05-20)
- (Alan Paris) Initial publication to npm registry

### 0.2.0 (2025-02-04)
- (Alan Paris) Added model selection, transition rates, auxiliary outputs, tally, audio per-input, color generators

### 0.1.0 (2025-01-29)
- (Alan Paris) Initial release: program/preview switching, DSK/USK, streaming and recording, media players, macros

## License

MIT License — see [LICENSE](LICENSE) for details.

Copyright (c) 2024-2026 Alan Paris <alan.paris@scottish.rugby>