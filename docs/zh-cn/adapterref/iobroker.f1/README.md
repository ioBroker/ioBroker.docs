---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.f1/README.md
title: ioBroker.f1
hash: /pTewFoFkbMdbk4wPfZAkag8T4Jx0mXXXVRWdrN30Zw=
---
# IoBroker.f1

![NPM 版本](https://img.shields.io/npm/v/iobroker.f1.svg)
![下载](https://img.shields.io/npm/dm/iobroker.f1.svg)
![执照](https://img.shields.io/github/license/bloop16/ioBroker.f1.svg)

ioBroker 的一级方程式实时数据集成——通过 [官方 F1 实时计时源](https://www.formula1.com/) 和 [Jolpica API]](https://api.jolpi.ca/) 提供比赛日历、锦标赛积分榜、比赛结果和实时比赛数据。

＃＃ 特征
- **赛事日历** — 下一场比赛及赛程信息，包含倒计时（天/小时）
- **完整赛季赛程表** — 本赛季所有轮次的赛程表（JSON 格式）。
- **锦标赛积分榜** — 车手和车队积分榜，包含积分和胜场数
- **赛段成绩** — 正赛、排位赛、冲刺赛和练习赛成绩
- **实时赛段数据** — 通过 F1 实时计时 SignalR WebSocket 获取实时数据
- 赛道状态（全速前进/黄旗/安全车/车辆稳定控制/红旗）
- 会话状态和名称
- 当前圈数和总圈数
剩余时间/已用时间
- 赛道天气（气温、赛道温度、降雨量、风力、湿度）
- 车手位置及差距、单圈时间和轮胎信息
- 前三名实时排行榜
- 赛车控制信息
- 维修站
- 每位驾驶员的轮胎配方
- 车队无线电

## 数据点
有关完整的对象层次结构和更新间隔，请参阅下面的“**使用方法**”部分。

## 数据来源
| 频道 | 来源 | 更新 |
|---|---|---|
| `schedule/` | Jolpica API | 小时 |
| `results/` | Jolpica API | 每小时 + 会话后 |
| `live/` | F1 实时计时 SignalR WebSocket | 实时推送 |
| `live/` | F1 实时计时 SignalR WebSocket | 实时推送 |

＃＃ 要求
- ioBroker >= 5.0.19
- Node.js 版本 >= 22
- 互联网连接
- 与 [Jolpica API](https://api.jolpi.ca/) 的连接稳定

## 安装与配置
1. 通过 ioBroker 管理面板或命令行安装适配器
2. 打开适配器设置（默认情况下无需用户配置）
3. 适配器自动：
- 每小时获取当前F1赛季赛程
- 每节比赛结束后更新锦标赛积分榜。
- 提供会话活动期间的实时会话数据
4. （可选） 如有需要，可在适配器设置中调整更新间隔

### 数据来源与一致性
该适配器使用多个数据源，并具有自动回退功能：

| 通道 | 主要 | 备用 | 行为 |
|---------|---------|----------|----------|
| 赛程与积分榜 | [Jolpica API](https://api.jolpi.ca/) | 每小时更新一次，赛后更新 |
| 实时数据 | [F1实时计时信号R](https://www.formula1.com/) | OpenF1 API | 比赛期间实时推送 |
| 实时数据 | [F1 实时计时信号R](https://www.formula1.com/) | OpenF1 API | 比赛期间实时推送 |

**注意：**比赛周末期间，上游 API 可能会临时提供混杂的轮次数据（例如，排名在比赛结果公布前更新）。适配器包含重试逻辑（6 次尝试，每次间隔 10 分钟），以确保数据一致性。

＃＃ 用法
安装并启动后，该适配器会在对象路径 `f1.0` 下公开 ioBroker 状态：

```
f1.0
├── info.connection           (adapter connection status)
├── schedule/
│   ├── next_race_name / round / circuit / country / date
│   ├── next_session_name / type / date / countdown_*
│   ├── weekend_json          (all sessions of current weekend)
│   └── calendar              (full season as JSON)
├── standings/
│   ├── drivers               (JSON array with positions & points)
│   ├── teams                 (JSON array with constructor standings)
│   └── last_update
├── results/
│   ├── race / qualifying / sprint   (JSON arrays)
│   └── last_update
└── live/                     (only during session ±30 min)
    ├── is_live / session_status / track_status
    ├── laps_current / laps_total / time_remaining / time_elapsed
    ├── weather / race_control / top_three
    ├── drivers / tyres / pit_stops / team_radio
    └── last_update
```

各州信息已更新：

- 按小时更新赛程、排名和结果
- **按场次**查看成绩详情（正赛、排位赛、冲刺赛）
- **实时** 用于实时会话数据（在会话进行期间）

## 故障排除
### 比赛结束窗口期的“积分差距”
比赛结束后最初的 60 分钟内，排名和成绩可能会短暂显示不同的整数数字。这是正常现象——上游 API 会异步刷新。适配器会自动轮询以确保数据一致性（尝试 6 次，每次间隔 10 分钟）。

### 没有实时数据显示
1. 检查当前是否有比赛正在进行（F1 实时计时通常在练习赛、排位赛和正赛期间进行直播）
2. 检查网络连接
3. 检查适配器日志（ioBroker 管理 → 实例 → F1 → 日志）

### 过时数据
数据会被缓存并按计划更新。如果数据显示已过时：

1. 手动触发：重启适配器实例
2. 自动：下一个小时刷新周期将获取最新数据
3. 会话结束后：会话结束后 2 分钟内将触发自动刷新

## 数据来源与归因
此适配器依赖于以下数据源：

- **[Jolpica API](https://api.jolpi.ca/)** — Ergast API 镜像，F1 赛事日历、积分榜和成绩的主要来源
- **[Ergast API](https://ergast.com/mwapi/)** — 历史 F1 数据，在 Jolpica 不可用时用作备用数据
- **[F1 实时计时](https://www.formula1.com/)** — 通过 SignalR WebSocket 提供官方实时赛段数据
- **[OpenF1 API](https://openf1.org/)** — 实时会话检测的备用方案

## 免责声明
本项目与一级方程式赛车、国际汽联或其任何子公司或附属公司**没有任何关联**，也未获得其认可或以任何方式与其官方联系。

**F1®**、**FORMULA ONE®**、**FORMULA 1®**、**FIA FORMULA ONE WORLD CHAMPIONSHIP®**、**GRAND PRIX®** 及相关标志均为 Formula One Licensing B.V. 的商标。

此适配器仅供个人非商业用途。

## Changelog


### **WORK IN PROGRESS**
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 0.1.11 (2026-06-10)

- (bloop) Live data quality: fixed truncated outputs for `live.race_control` and `live.team_radio`
- (bloop) Live ranking quality: corrected top-three ordering by position
- (bloop) Live cache consistency: improved tyre and driver merge logic for partial incremental updates
- (bloop) Session-end flow: unified handling path to avoid inconsistent post-session states

### 0.1.10 (2026-06-05)

- (bloop) Fixed live sessions by migrating from legacy SignalR to SignalR Core transport
- (bloop) Reduced repeated 401 reconnect warnings from F1 Live Timing legacy endpoint
- (bloop) Improved live connection stability with handshake-aware subscription flow

For older changelog entries, see [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 Martin (bloop) <bloop16@hotmail.com>

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