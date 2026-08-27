---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.ultrahuman/README.md
title: ioBroker.ultrahuman
hash: /aUkipe/Y5ppAozHBDSiU8rVgILsWcohBwjlD/NKIC0=
---
![NPM 版本](https://img.shields.io/npm/v/iobroker.ultrahuman.svg)
![下载](https://img.shields.io/npm/dm/iobroker.ultrahuman.svg)
![安装数量](https://iobroker.live/badges/ultrahuman-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/ultrahuman-stable.svg)
![NPM](https://nodei.co/npm/iobroker.ultrahuman.png?downloads=true)
![执照](https://img.shields.io/github/license/SmarterPapa/ioBroker.ultrahuman)
![GitHub 问题](https://img.shields.io/github/issues/SmarterPapa/ioBroker.ultrahuman)

<p align="center"><a href="https://smarterpapa.de"><img src="admin/smarterpapa-logo.png" alt="SmarterPapa" width="120" /></a></p>

<p align="center"><img src="admin/ultrahuman.png" alt="超人类" width="100" /></p>

# IoBroker.ultrahuman
**当前适配器版本：** 0.1.13

![测试与发布](https://github.com/SmarterPapa/ioBroker.ultrahuman/actions/workflows/test-and-release.yml/badge.svg)

## 适用于 ioBroker 的超人戒指适配器
此适配器通过 [超人伙伴 API](https://blog.ultrahuman.com/blog/accessing-the-ultrahuman-partnership-api/) 从您的 **Ultrahuman Ring** 读取健康指标，并创建您可以在可视化、脚本和自动化中使用的 ioBroker 对象。

**详细指南（德语）：** [ioBroker 中的超人戒指 – Schlaf、HRV 和 Gesundheitsdaten](https://smarterpapa.de/ultrahuman-ring-iobroker-adapter-gesundheitsdaten-smart-home/) (SmarterPapa.de) — 安装、所有数据点、自动化示例、常见问题解答。

源代码：[GitHub](https://github.com/SmarterPapa/ioBroker.ultrahuman)

**维护者：**启用[已为 `iobroker.ultrahuman`（此 GitHub 仓库）配置了可信发布者（https://docs.npmjs.com/trusted-publishers）。发布版本在 **Node.js 24** 上使用 `ioBroker/testing-action-deploy@v1`，仅支持 OIDC（不使用 `npm-token`）。参见 [testing-action-deploy#19]](https://github.com/ioBroker/testing-action-deploy/issues/19)。

＃＃＃ 安装
通过ioBroker管理界面安装适配器：

1. 在 ioBroker 管理后台打开**适配器**
2. 寻找**超人**
3. 点击**安装**

### 可用指标
| 通道 | 状态 | 描述 | 单位 |
|-------------------|--------------------|-------------------------------|----------|
| `sleep` | `bedtimeStart` | 就寝时间 | ISO 8601 |
| `sleep` | `timeInBed` | 总卧床时间 | 分钟 |
| `sleep` | `timeAsleep` | 总睡眠时间 | 分钟 |
| `sleep` | `timeToFallAsleep` | 入睡所需时间 | 分钟 |
| `sleep` | `sleepEfficiency` | 睡眠效率 | % |
| `sleep` | `sleepScore` | 睡眠评分 | |
| `sleep` | `sleepQuality` | 睡眠质量（优秀/良好/一般/差） | |
| `sleep` | `remSleep` | 快速眼动睡眠持续时间 | 分钟 |
| `sleep` | `deepSleep` | 深度睡眠持续时间 | 分钟 |
| `sleep` | `lightSleep` | 浅睡眠持续时间 | 分钟 |
| `sleep` | `restorativeSleep` | 恢复性睡眠（快速眼动睡眠 + 深度睡眠） | % |
| `sleep` | `sleepCycles` | 完整睡眠周期 | |
| `heart` | `restingHR` | 静息心率（睡眠） | bpm |
| `heart` | `nightRHR` | 夜间静息心率 | bpm |
| `heart` | `lastReading` | 上次心率读数 | bpm |
| `heart` | `avg` / `min` / `max` | 心率统计 | bpm |
| `heart` | `trend` | 心率趋势 | |
| `hrv` | `average` | 平均心率变异性 | 毫秒 |
| `hrv` | `sleepHRV` | 平均睡眠心率变异性 | 毫秒 |
| `hrv` | `min` / `max` | 心率变异性统计 | 毫秒 |
| `hrv` | `trend` | 心率变异性趋势 | |
| `spo2` | `avg` / `min` / `max` | 血氧统计 | % |
| `temperature` | `lastReading` | 最后皮肤温度 | °C |
| `temperature` | `avg` / `min` / `max` | 温度统计 | °C |
| `activity` | `steps` | 今日总步数 | 步数 |
| `activity` | `stepsAvg` | 平均步数 | 步数 |
| `activity` | `activeMinutes` | 活动分钟数 | 分钟 |
| `activity` | `movementIndex` | 移动指数 | |
| `activity` | `recoveryIndex` | 恢复指数 | |
| `activity` | `vo2Max` | 最大摄氧量 | 毫升/公斤/分钟|
| `info` | `connection` | API 连接状态 | 布尔值 |
| `info` | `lastUpdate` | 上次成功更新 | ISO 8601 |
| `info` | `lastUpdate` | 上次成功更新 | ISO 8601 |

### 先决条件
您需要访问**Ultrahuman Partner API**：

1. 发送电子邮件至 **feedback@ultrahuman.com** 并申请个人使用的 API 访问权限。
2. 您将收到一个**API密钥**和一个**访问代码**。
3. 在 Ultrahuman 应用中，转到**个人资料 > 设置 > 合作伙伴 ID**，然后输入**访问代码**。
4. 在适配器设置中配置**API密钥**和您的帐户电子邮件。

＃＃＃ 配置
| 设置 | 说明 | 默认值 |
|--------------------|----------------------------------------------|---------|
| API密钥 | 您的Ultrahuman Partner API授权密钥 | — |
| 用户邮箱 | 与您的 Ultrahuman 帐户关联的邮箱地址 | — |
| 轮询间隔 | 获取数据的频率（分钟） | 30 |

最小轮询间隔为 5 分钟。由于环路数据是定期同步的（并非实时同步），建议设置为 30 分钟。

＃＃＃ 支持
如果您觉得这个适配器有用，请考虑支持其开发：

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/smarterpapa)

### 致谢
基于 Matt Krainski 的 [超人仪表盘](https://github.com/mt-krainski/ultrahuman-dashboard) 的 API 集成（MIT 许可证）。

## Changelog

### 0.1.13 (2026-04-11)

* Deploy uses **Node.js 24** with `testing-action-deploy@v1`; **Trusted Publishing** only (no `npm-token`), per maintainer note on [testing-action-deploy#19](https://github.com/ioBroker/testing-action-deploy/issues/19)

### 0.1.12 (2026-04-10)

* **0.1.12:** `testing-action-deploy@v1` with **`npm-token`** again (OIDC-only path breaks on `ubuntu-latest` during global npm upgrade); README documents **W3019** trade-off
* `common.news` trimmed to seven entries (W1032); **0.1.3** moved to history only via [CHANGELOG_OLD.md](CHANGELOG_OLD.md)

### 0.1.11 (2026-04-09)

* GitHub Releases: `ioBroker/testing-action-deploy@v1` with granular `NPM_TOKEN` (Bypass 2FA)
* Changelog lists **0.1.11** here; older releases in [CHANGELOG_OLD.md](CHANGELOG_OLD.md)
* Dependabot default cooldown 7 days; includes **0.1.9**–**0.1.10** fixes (integration tests, Admin `jsonConfig`)

### 0.1.8 (2026-03-27)

* `io-package.json` `common.news` reduced to 7 entries (ioBroker repository checker [W1032](https://github.com/ioBroker/ioBroker.repochecker))

### 0.1.7 (2026-03-26)

* Package `homepage` (npm) points to the [detailed German blog guide](https://smarterpapa.de/ultrahuman-ring-iobroker-adapter-gesundheitsdaten-smart-home/) on SmarterPapa.de
* README and ioBroker Admin (About tab) link to the same article; GitHub remains the `repository` URL

Older versions: [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License

MIT License — see [LICENSE](LICENSE) for details.

Copyright (c) 2026 [SmarterPapa](https://smarterpapa.de)