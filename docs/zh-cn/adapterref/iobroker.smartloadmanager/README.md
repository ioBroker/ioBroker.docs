---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.smartloadmanager.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.smartloadmanager.svg
BADGE-Number of Installations: https://iobroker.live/badges/smartloadmanager-installed.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/smartloadmanager-stable.svg
BADGE-NPM: https://nodei.co/npm/iobroker.smartloadmanager.png?downloads=true
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.smartloadmanager/README.md
title: ioBroker.smartloadmanager
hash: dB1GcMiLj7RO2YvY7TvsRKQzxKb+GmrvjuxNraezEDI=
---
![标识](../../../de/admin/smartloadmanager.png)

# IoBroker.smartloadmanager
## 🔧 描述
**smartloadmanager** 适配器用于根据光伏馈入值动态控制负载。其目标是在本地消耗剩余电力，从而最大限度地减少或完全避免向公共电网馈入。它支持开启/关闭负载、百分比控制设备和电池储能。

---

## 🚀 功能
- ✅ 监控可配置的馈入数据点
- ✅ 过剩时动态连接消费者
- ✅ 电力不足或电网连接时动态关闭
-✅ 支持**二进制**、**百分比**、**加热**和**电池**消费者
-✅ 带延迟的百分比控制（平滑调节），可根据消费者选择配置
-✅ 具有目标 SOC 的电池存储动态充电功率
-✅ 每个消费者的开/关逻辑的时间窗口（包括“仅在关闭时间”）
-✅ 自动创建每个消费者的扩展信息对象
-✅ 控制模式：每个消费者单独关闭/手动开启/自动
- ✅ 通过单独的开启/关闭限制进行滞后控制
-✅ 特定于消费者的切换延迟（覆盖全局）
-✅ 连接（根据功率）和断开（反之亦然）的顺序逻辑
-✅ 全局电池切换延迟（`batteryDelaySeconds`）
-✅ 写入电池控制模式检查（日志中的调试输出）
-✅**通过定时器延迟切换**用于开启和关闭
-✅ **在调试日志中显示正在运行的计时器**以及剩余时间
-✅ 可选的开/关通知、百分比控制和电池通知（Telegram / Gotify）
-✅ 针对具有布尔或数字 0/1 控制的设备优化 0/1 数据点
-✅ 详细记录所有计时器、剩余量和切换操作
-✅ 每种消费者类型（二进制、百分比、电池、加热）的通知，可选择激活
-✅ 加热/加热棒控制，具有温度、释放和心跳测试

---

## ⚙️ 配置
### 🔹 主要设置
| 设置 | 描述 |
| ------------------------------- | -------------------------------------------------------------------------------------- |
| **馈入数据点** | 馈入值的对象 ID（例如 PV 盈余）|
| **基本负载** | 始终从馈入值中扣除（例如待机消耗）|
| **开启阈值** | 以瓦特为单位的阈值，超过该阈值，消费者将开启 |
| **关机限制** | 以瓦特为单位的阈值，超过该阈值，消费者将被关闭 |
| **延迟（秒）** | 二进制关闭延迟（滞后平滑）|
| **百分比延迟（秒）** | 减少百分比消费者（例如壁挂式充电盒）的功耗时的全局延迟 |
| **电池延迟（秒）** | 电池控制的全局延迟 |
| **馈入值负** | 如果有效：负值 = 馈入 / 正值 = 电网购买 |
| **电池控制模式-DP** | 电池模式切换的可选控制数据点（自动/手动/关闭）|
| **通知** | 二进制/百分比/电池/加热的激活，包括 Telegram/Gotify 实例 |

---

###🔹消费者
| 字段 | 描述 |
| -------------------------------------- | ------------------------------------------------------------------------------- |
| **姓名** | 显示名称 |
| **活动** | 激活此消费者的控制 |
| **规则类型** | `"binary"`、`"percent"` 或 `"battery"` |
| **控制数据点** | 用于切换或控制的 ID，也支持 0/1-DP |
| **功率[W]** | 消费者的实际电力 |
| **开启限制 [W]** | 启动所需的剩余电量 |
| **关机限制 [W]** | 停用下限 |
| **最大功率[W]** | 百分比控制的参考值 |
| **延迟百分比 [s]** | 仅适用于该消费者反向调节的可选延迟 |
| **延迟覆盖 [s]** | 消费者特定的切换延迟（例如可以立即切换）|
| **开启时间 (HH:MM)** | 控制可能生效的时间 |
| **关闭时间 (HH:MM)** | 控制终止时间 |
| **仅在关闭时间关闭** | 复选框：仅在配置的时间关闭 |
| **batterySetpoint（仅限电池）** | 写入所需充电功率的数据点 |
| **电池SOC / 目标SOC** | 可选：SOC 和目标SOC，以防止电池充满时充电 |
| **Timer / TimerEnd** | 用于延迟切换的内部计时器，剩余时间在日志中可见 |
| **minTemperature / maxTemperature** | 加热操作的下限和上限 |
| **温度数据点（仅加热）** | 用于检查最小/最大限值的温度数据点 |
| **enableDatapoint（仅加热）** | 可选数据点：仅当为真时加热元件才可运行 |
| **heartbeatDatapoint（仅加热）** | 可选：必须循环返回 true，否则关闭 |

---

## 🔋 电池存储支持
- 使用“ruletype”：“battery”的消费者根据当前的盈余来调节充电设定点。
- 如果设置了“batterySOC”和“batteryTargetSOC”，则充电将不再发生在目标值以上。
- 可选地，可以设置“batteryControlModeDatapoint”：
- `0 = 关闭`, `1 = 手动`, `2 = 自动`
- 控制仅在配置的时间窗口内发生。
- 在配置的延迟（“batteryDelaySeconds”）之后，每次 FeedIn 更新都会重新执行控制。
- 所有电路（二进制、百分比、电池）的延迟可以根据消费者或全局进行调整。
- 电池切换的详细记录和可选通知。

---

##🌡️加热支持
- 具有“规则类型”：“加热”的消费者适用于加热元件或类似的消费者。
- 仅在以下情况下进行控制： - 当前温度低于 maxTemperature - 可选：高于 minTemperature - 可选：enableDatapoint 处于活动状态 - 可选：heartbeatDatapoint 有效
- 如果不满足要求，电路将立即中止，计时器也将停止。
- 支持开/关定时器（onTimerRemaining / offTimerRemaining）并显示剩余时间。
- 为供暖消费者提供详细记录和可选通知。

---

## 🧠 控制逻辑
1.**数据点测量值根据配置进行解释**（正数 = 电网消耗或馈入）
2. **盈余 > 基本负载 + 开启限制**：

→ 根据功率的增加开启消费者（二进制）

3. **短缺<基本负荷-停机极限**：

→ 以相反的顺序关闭耗电设备

4. **百分比消费者监管**：

→ % = 剩余/最大功率 → 通过延迟控制（全局或每个消费者） → 可选的每个消费者覆盖

5. **电池消费者监管**：

→ 充电功率 = 最小（剩余功率，最大功率），如果未达到目标 SOC → 通过`batteryDelaySeconds` 或每个消费者延迟

6. **所有消费者的时间窗口检查**

→ 仅当当前时间在`switchOnTime` 至 `switchOffTime` 范围内时有效

7. **控制仅在控制模式“自动（2）”下进行**

→ 手动干预（模式 1 或 0）保持不变

8. **通过定时器延迟切换**

→ 再次切换前定时器取消，剩余时间可在日志中显示

9. **开/关、百分比和电池通知可选**
10. **针对 0/1 数据点的优化**

→ 自动支持布尔值或数字0/1控制

11. **详细记录所有开关操作、剩余量和计时器**
12. **供暖用户的控制：**

→ 仅在最小/最大温度范围内切换，并具有有效的启用/心跳状态 → 一旦条件不再满足，计时器就会中止

---

## 💡 示例：Wallbox
| 参数 | 值 |
| --------------- | ------- |
| 馈入 | 1000 W |
| 基本负载 | 100 瓦 |
| 最大功率 | 11000 W |

**计算：**

- 剩余：1000 - 100 = 900 W
- 百分比：900 / 11000 ≈ 8.2% → Wallbox 调节至 8%

---

## 📋 对象结构
对于每个消费者，都会创建一个具有以下状态的单独通道：

- `.controlMode` → 0 = 关闭，1 = 手动，2 = 自动
- `.switchOnTime` / `.switchOffTime`
- `.alwaysOffAtTime` → true/false
- `.performance`、`.switchOnPoint`、`.switchOffPoint`
- `.batterySetpoint`（仅适用于“电池”）
- `.temperatureDatapoint`（仅适用于“加热”）
- `.onTimerRemaining / .offTimerRemaining` → 开启/关闭定时器的剩余时间
- `.timer` → 用于延迟切换的内部定时器
- `.timerEnd` → 计时器到期的时间戳（用于日志）

---

## 🚫 限制
- 没有SOC历史，没有长期逻辑
- 禁止多次使用相同的数据点
- 电池控制完全基于馈入，不考虑放电功率
- 无法定义最低百分比限制（例如，壁挂式充电盒最低为 10%）
- 无需直接性能测量的加热 - 仅需限值和释放检查

---

## 🛣️ 未来功能
- 基于光伏预测的控制（测试版）
- 支持联合消费者
- ~~优先级配置文件~~
- 每个设备过热或错误处理
- ~~监管的最小和最大百分比限制~~
- 可配置组或房间逻辑

---

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.0.7 (2025-09-09)

- (quorle) modified Readme
- (quorle) German and English description created
- (quorle) chore: cleanup devDependencies
- (quorle) Add "label" to jsonConfig.json everywhere
- (quorle) Fixed bugs in timeouts in functions
- (quorle) setTimeout/setInterval allowed maximum values ​​implemented
- (quorle) adapter-core 3.2.3 to 3.3.2 updated
- (quorle) eslint-config 2.0.2 to 2.1.0 updated
- (quorle) testing 5.0.4 to 5.1.0 updated

### 0.0.6 (2025-09-03)

- (quorle) Adjustments package.json
- (quorle) Code changed

### 0.0.3 (2025-09-03)

- (quorle) Adjustments package.json
- (quorle) Code changed

### 0.0.2 (2025-09-03)

- (quorle) Adjustments package.json
- (quorle) Code changed

### 0.0.1 (2025-09-02)

- (quorle) Release

## License

MIT License

Copyright (c) 2025 quorle <quorle12@gmail.com>

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