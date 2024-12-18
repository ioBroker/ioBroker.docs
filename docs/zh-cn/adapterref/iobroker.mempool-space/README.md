---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.mempool-space/README.md
title: ioBroker.mempool-空间
hash: AOtHUDsbZYkGUXfUtfUNExUfo3lKXyOJ32AFfs8AD2g=
---
![NPM 版本](https://img.shields.io/npm/v/iobroker.mempool-space.svg)
![下载](https://img.shields.io/npm/dm/iobroker.mempool-space.svg)
![安装数量](https://iobroker.live/badges/mempool-space-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/mempool-space-stable.svg)
![新平台](https://nodei.co/npm/iobroker.mempool-space.png?downloads=true)

<!-- strg+k dann v Öffnet live Darstellung -->

![标识](../../../en/adapterref/iobroker.mempool-space/admin/mempool-space.png)

# IoBroker.mempool 空间
**测试：**![测试与发布](https://github.com/Hans-Wurst-21/ioBroker.mempool-space/workflows/Test%20and%20Release/badge.svg)

### 在家中近距离体验比特币网络！
来自 mempool.space WebSocket API 的实时数据。

此适配器使用 WebSocket 连接 mempool.space API 提供实时比特币网络信息。它提供各种数据点，包括区块信息、交易费用、网络统计数据和价格转换。

传输所有数据需要几分钟。请至少等待 2 个区块。

**重要提示：适配器或 mempool.space 永远不会要求您提供种子！**

**⚠️ 绝不⚠️**

**如果你分享你的种子，你将失去一切！**

## 实时数据 websocket
＃＃＃ 特征
1. **实时数据**：利用 WebSocket 连接从比特币网络获取实时更新。

2. **价格转换**：

- 比特币与美元和欧元的兑换率
- “莫斯科时间”表示法（每美元/欧元 Satoshis）

3. **交易费用**:

- 最快、半小时、小时、经济和最低费率

4. **区块信息**:

- 最新区块高度、哈希值和时间戳
- 自上一个区块以来的时间
- 开采最后一个区块的矿池

5. **网络统计**：

- 平均出块时间
- 当前和之前的难度调整
- 预计下次难度调整时间
- 预计下次减半时间

6. **内存池信息**:
- 未确认交易的数量

＃＃＃ 配置
在适配器设置中，您可以配置以下选项：

-**WebSocket 网址**：

mempool.space WebSocket API 的 URL（默认值：`wss://mempool.space/api/v1/ws`）

- 您可以使用公共或本地的 mempool.space 实例。
- 对于本地实例，请参阅比特币节点软件的文档。

无需进一步配置。
所有状态和连接均由适配器自动创建。

### 州
适配器自动创建以下通道和状态：

- **转换**

- usd：比特币到美元的兑换率
- 欧元：比特币到欧元的兑换率
- moscowtimeUSD：莫斯科时间美元
- moscowtimeEUR：莫斯科时间欧元
- timestamp：上次转换更新的时间戳

- **费用**

- 最快：最快的交易费率
- halfHour：半小时内确认的费率
- 小时：一小时内确认的费率
- 经济：经济舱费率
- 最低：最低费率

- **堵塞**

- height: 最新区块的高度
- hash: 最新区块的哈希值
- timestamp: 最新区块的时间戳
- miningPool：开采最后一个区块的矿池名称
- timeSinceLastBlock: 自上一个区块以来经过的时间

- **网络**

- averageBlockTime: 平均区块时间
-difficultyChange：当前难度调整（百分比）
- previousDifficultyChange：之前的难度调整（百分比）
- nextDifficultyAdjustment：下一次难度调整的预计时间戳
- remainingTimeToDifficulty: 距离下次难度调整的剩余时间
- remainingTimeToHalving: 距离下一次减半的剩余时间

-**内存池**

- transactionCount：内存池中未确认交易的数量

-**信息**
- connectionn：指示 WebSocket 连接是否处于活动状态

＃＃ 图书馆
- API 文档：https://mempool.space/docs/api/websocket
- npm 模块：https://www.npmjs.com/package/@mempool/mempool.js
- luxon-模块：https://github.com/moment/luxon

## 待办事项
- [ ] 完整翻译
- [ ] 清理代码
- [ ] 添加示例
- [ ] 查询用户自定义地址
- [ ] 自定义交易查询
- [ ] 可能是 telegram-bot

特别感谢
特别感谢 https://einundzwanzig.space 和 https://www.youtube.com/@haus_automation

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- (Hans-Wurst-21) Update version chai, @types/chai, chai-as-promised, @types/node, eslint, sinon-chai

### 0.0.4 (2024-11-27)

- (Hans-Wurst-21) Integrate standard iobroker linter setup
- (Hans-Wurst-21) Change setInterval/clearInterval to this.setInterval/clearInterval
- (Hans-Wurst-21) clean icon and i18n from examples
- (Hans-Wurst-21) change README.md
- (Hans-Wurst-21) add to ioBroker-latest

### 0.0.3 (2024-11-17)

- (Hans-Wurst-21) fix issue from ioBroker-Bot
- (Hans-Wurst-21) add bluefox at npm
- (Hans-Wurst-21) correction readme
- (Hans-Wurst-21) set ioBroker.admin to '>=6.17.14'
- (Hans-Wurst-21) add responsive design for adminconfig

### 0.0.2 (2024-11-16)

- (Hans-Wurst-21) npm release
- (Hans-Wurst-21) fix issue from ioBroker-Bot
- (Hans-Wurst-21) prepare for npm upload

## License

MIT License

Copyright (c) 2024 Hans-Wurst-21 <github+mempool-space@hansmail.net>

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