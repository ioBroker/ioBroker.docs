---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.zwift/README.md
title: ioBroker.zwift
hash: S8apDFfbEgcwgr5LFt4CrRJ/PkngguUVgLtoq+SI7tI=
---
![标识](../../../en/adapterref/iobroker.zwift/admin/zwift.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.zwift.svg)
![下载](https://img.shields.io/npm/dm/iobroker.zwift.svg)
![安装数量](https://iobroker.live/badges/zwift-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/zwift-stable.svg)
![NPM](https://nodei.co/npm/iobroker.zwift.png?downloads=true)

# IoBroker.zwift
**测试：** ![测试与发布](https://github.com/Flixhummel/ioBroker.zwift/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 Zwift 适配器
ioBroker 会轮询 Zwift API 获取实时训练数据并将其提供给用户。在 Zwift 上骑行时，您可以实时查看功率、心率、踏频、速度等数据。

＃＃＃ 特征
- 实时骑手数据每 5 秒更新一次（可配置）
- 实时功率区间计算（Coggan 6 区间模型，FTP 值从您的 Zwift 个人资料自动读取）
- 完整的 Zwift 个人资料数据：身份信息、骑行统计数据、跑步统计数据、骑行服、掉落次数、连胜/连败记录
- 连接状态指示器（`info.connection`）
- 自动令牌刷新并回退到重新身份验证
- 加密凭证存储
- 适配器重启后自动应用元数据更新（单位更正、新增字段）

＃＃＃ 配置
| 设置 | 说明 | 默认值 |
|---------|-------------|---------|
| **Zwift 邮箱** | 您的 Zwift 帐户邮箱 | — |
| **Zwift 密码** | 您的 Zwift 帐户密码（加密存储） | — |
| **轮询间隔** | 获取数据的频率，以秒为单位（3–300） | 5 |

### 各州
#### 骑手数据（每次民调周期更新）
| 状态 | 单位 | 描述 |
|-------|------|-------------|
| `isRiding` | — | `true` 当在 Zwift 世界中活跃时 |
| `powerZone` | — | 当前功率区（1-6，Coggan 模型，见下文） |
| `heartrate` | bpm | 当前心率 |
| `cadence` | rpm | 当前踏频 |
| `speed` | 公里/小时 | 当前速度 |
| `distance` | 公里 | 当前活动中行进的距离 |
| `altitude` | 米 | 当前海拔 |
| `climbing` | 米 | 当前活动的总海拔增益 |
| `gradient` | % | 当前坡度/斜率（正值 = 上坡，负值 = 下坡） |
| `calories` | 千焦 | 卡路里消耗量（与 Zwift 游戏内显示一致） |
| `time` | 秒 | 已用骑行时间 |
| `laps` | — | 已完成圈数 |
| `progress` | — | 路线进度（来自 Zwift 的原始值） |
| `sport` | — | 运动类型（0 = 自行车） |
| `groupId` | — | 组/事件 ID（0 = 无组） |
| `x`, `y` | — | 世界位置坐标 |
| `heading` | — | 行进方向 |
| `lean` | — | 倾斜角度 |
| `watchingRiderId` | — | 被监控骑手的 ID |
| `rideOns` | — | 继续骑行计数 |
| `courseId` | — | 当前课程 ID |
| `roadId` | — | 当前道路 ID |
| `roadId` | — | 当前道路 ID |

#### 能量区
`powerZone` 状态采用 Coggan 六区模型，并根据您当前的功率和 FTP 自动计算。FTP 值从您的 Zwift 个人资料中读取——无需手动配置。

| 区域 | 名称 | FTP 使用率百分比 |
|------|------|----------|
| 1 | 主动恢复 | < 55% |
| 2 | 耐力 | 55-75% |
| 3 | 节奏 | 76-90% |
| 4 | 乳酸阈值 | 91-105% |
| 5 | 最大摄氧量 | 106-120% |
| 6 | 无氧能力 | > 120% |

如果您的 Zwift 个人资料中未设置 FTP，则 `powerZone` 状态将不会更新。

#### 个人资料数据（连接时获取一次）
| 状态 | 单位 | 描述 |
|-------|------|-------------|
| `profile.id` | — | Zwift 玩家 ID |
| `profile.lastName` | — | 姓氏 |
| `profile.weight` | 千克 | 重量 |
| `profile.height` | 厘米 | 身高 |
| `profile.age` | — | 年龄 |
| `profile.male` | — | 性别指示符 |
| `profile.countryCode` | — | 国家代码 |
| `profile.ftp` | W | 功能阈值功率 |
| `profile.totalDistance` | 公里 | 总距离 |
| `profile.totalDistanceClimbed` | 米 | 总海拔增益 |
| `profile.totalTimeInMinutes` | 分钟 | 总骑行时间 |
| `profile.totalWattHours` | 瓦时 | 总瓦时 |
| `profile.totalExperiencePoints` | — | 总经验值 |
| `profile.targetExperiencePoints` | — | 升到下一等级所需的经验值 |
| `profile.achievementLevel` | — | 当前级别 |
| `profile.totalGold` | — | 总掉落数（游戏内货币） |
| `profile.totalInKomJersey` | — | 多次穿过的 KOM 骑行服 |
| `profile.totalInSprintersJersey` | — | 多次穿过的短跑运动员球衣 |
| `profile.totalInOrangeJersey` | — | 穿过的橙色球衣次数 |
| `profile.runAchievementLevel` | — | 当前运行级别 |
| `profile.totalRunDistance` | 公里 | 总跑步距离 |
| `profile.totalRunTimeInMinutes` | 分钟 | 总运行时间 |
| `profile.totalRunExperiencePoints` | — | 总运行经验值 |
| `profile.targetRunExperiencePoints` | — | 升级需要运行 XP |
| `profile.totalRunCalories` | 千焦 | 总跑步卡路里 |
| `profile.streaksCurrentLength` | — | 当前活动连续长度 |
| `profile.streaksMaxLength` | — | 最长连续活动记录 |
| `profile.streaksLastRideTimestamp` | — | 连胜期间最后一次骑行的时间戳 |
| `profile.currentActivityId` | — | 当前活动 ID |
| `profile.powerSource` | — | 电源类型 |
| `profile.powerSource` | — | 电源类型 |

### 工作原理
该适配器使用与 Zwift Companion 应用相同的端点 (`client_id=Zwift_Mobile_Link`) 向 Zwift API 进行身份验证。启动时，它会获取您的 Zwift 个人资料（包括 FTP），然后通过游戏中继服务器轮询骑手状态，解码 protobuf 响应，将原始值转换为人类可读的单位，并更新 ioBroker 状态树。

如果您的配置文件中设置了 FTP 值，则适配器会在每个轮询周期中使用 Coggan 功率区模型计算一个实时 `powerZone` (1-6) 值。无需手动配置 FTP。

当您不在 Zwift 中积极骑行时，适配器会将 `isRiding` 设置为 `false` 并继续轮询而不会出错。

**技术说明：** 状态对象使用 `extendObjectAsync` 而非 `setObjectNotExistsAsync` 创建。这意味着，每当适配器重启时，元数据更改（例如，更正单位、重命名状态、新增字段）都会自动应用。更新后，您无需删除并重新创建对象。

### 智能家居创意
正如 ioBroker 所说，有了你的 Zwift 数据，你就可以创建自动化程序，让你的室内训练在家中的各个角落都能生动起来。

沉浸式照明

- 根据心率区间切换 LED 灯带或 Hue 灯的颜色——蓝色代表恢复，绿色代表耐力，黄色代表节奏，红色代表阈值，红色闪烁代表最大摄氧量
- 使用 `powerZone` 状态（1-6）直接控制配色方案——无需编写脚本自行计算区域。
- 灯光颜色会随着你的功率输出而变化——你用力推得越用力，灯光就越亮
- 通过灯光亮度模拟海拔高度——爬升时调暗，下降时调亮
- 当你收到骑乘玩具时，闪一下房间的灯

自适应音频

- 根据您的心率区间或功率自动切换播放列表——热身时播放舒缓的音乐，间歇训练时播放高 BPM 的歌曲
- 当你跑完一圈或达到卡路里里程碑时，播放音效
- 定期通过文本转语音功能播报您的最新统计数据

**仪表盘和显示屏**

- 在壁挂式平板电脑或智能显示屏上实时显示功率、心率、速度和踏频。
- 在你的痛苦洞穴的信息面板上显示距离、爬升和卡路里消耗量
- 根据个人资料数据（总公里数、总海拔、经验值等级）构建可视化仪表盘，显示您的所有统计数据。

**气候控制**

- 当心率超过阈值时开启智能风扇，休息期间关闭风扇
- 根据功率输出成比例提高风扇转速
- 当消耗的卡路里超过一定数值时，启动空调

**DIY五金配件**

- 利用海拔/坡度数据驱动自制训练台的摇杆或倾斜机构——打造你自己的爬坡模拟器，类似于 Wahoo KICKR CLIMB。
- 通过 ioBroker 控制伺服电机或线性执行器，使自行车车架随着游戏内坡度的变化实时倾斜

**激励与游戏化**

- 完成骑行或刷新个人最佳成绩时，触发彩带机或派对灯光。
- 当 `isRiding` 变为 `false` 时，向您的 Telegram 或 Pushover 发送包含行程总结的通知。
- 在走廊的七段数码管或电子墨水屏上追踪您每周的跑步距离
- 点亮进度条（LED灯条），显示您的路线完成百分比

家庭和住户

- 当 `isRiding` 为 `true` 时，在房间外设置一个“请勿打扰”指示灯。
- 在 Zwift 训练期间自动将门铃静音
- 向家里的智能音箱发送消息：“爸爸正在骑 Zwift，预计 X 分钟后完成”

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.1.3 (2026-04-19)
* Add `gradient` state (current slope in %, computed from altitude/distance deltas with a 5 m threshold, clamped to ±50 %)

### 0.1.2 (2026-03-03)
* Set up trusted publishing via OIDC for GitHub Actions deploy

### 0.1.1 (2026-03-03)
* Fix ESLint curly and prettier errors for CI

### 0.1.0 (2026-03-03)
* Poll Zwift API for live ride data (power, heartrate, cadence, speed, distance, altitude, climbing)
* Zwift profile data (FTP, weight, height, level, total stats)
* Power zone calculation based on FTP (Coggan 6-zone model)
* Configurable polling interval

### 0.0.1 (2026-03-02)
* (Flixhummel) initial release

## License
MIT License

Copyright (c) 2026 Flixhummel <hummelimages@googlemail.com>

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