---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.sevenio/README.md
title: ioBroker.sevenio
hash: fVC94uHk32BrzxkvGGvqSOFaItPhWtl303RIrqnfcOI=
---
![标识](../../../en/adapterref/iobroker.sevenio/admin/sevenio.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.sevenio.svg)
![下载](https://img.shields.io/npm/dm/iobroker.sevenio.svg)
![安装数量](https://iobroker.live/badges/sevenio-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/sevenio-stable.svg)

# IoBroker.sevenio
**测试：** ![测试与发布](https://github.com/ipod86/ioBroker.sevenio/workflows/Test%20and%20Release/badge.svg)

## Seven.io 的 ioBroker 适配器
此适配器将 ioBroker 连接到 [七.io](https://www.seven.io) 短信和通信 API。您可以直接从自动化流程、Blockly 脚本或 JavaScript 发送短信并触发文本转语音通话，同时还包含联系人管理、送达跟踪、入站短信轮询和账户余额监控功能。

---

＃＃ 特征
- **发送短信** — 通过数据点、Blockly 代码块或 `sendTo()` 函数触发
- **闪信** — 信息直接显示在收件人的屏幕上
- **语音通话（TTS）** — 通过自动通话朗读任何文本
- **投递状态** — 发送后约 60 秒自动检查，并写入专用状态
- **联系人管理** — 将 seven.io 中的联系人作为独立数据点同步；直接从 ioBroker 创建新联系人
- **按姓名联系收件人** — 输入联系人姓名而不是电话号码；适配器会自动解析。
- **账户余额轮询** — 可配置的轮询间隔，结果以可读状态的形式提供
- **接收短信轮询** — 接收收到的短信（需要租用虚拟号码，详见下文）
- **Blockly 模块** — 一个可直接使用的发送模块，属于 sendTo 类别，带有用于发送短信和/或语音通话的复选框
- **`sendTo()` API** — 为 JavaScript 适配器提供完整的脚本支持

---

＃＃ 要求
- 在 [seven.io](https://www.seven.io) 上拥有一个帐户
- 有效的 API 密钥（可在 seven.io 控制面板的“开发者 → API 密钥”下找到）

成本模型：

发送短信和拨打语音电话是**按次付费**——您只需为每条短信或每次通话付费，没有月费。
- **接收短信**需要从 seven.io 租用虚拟电话号码（约 20 欧元/月）。如果没有租用号码，则无法进行入站轮询。

> **个人用户：** seven.io 主要面向企业用户。注册时，必须填写公司名称。个人用户可以在该栏中直接填写自己的名字或“Privat”字样——seven.io 已确认此方式可接受。

---

＃＃ 配置
| 设置 | 说明 | 默认值 |
|---|---|---|
| **API密钥** | 您的 seven.io API 密钥 | *（必填）* |
| **默认发件人 ID** | 向收件人显示的发件人姓名或号码。最多 11 个字母数字字符 **或** 16 个数字字符。留空则使用 seven.io 帐户的默认值。要允许回复，请在每条消息中使用 `getReplies: true`（Blockly 或 `sendTo()`）——参见 [收到的短信](#inbound-sms)。 | *(空)* |
| **入站短信轮询间隔** | 适配器检查新入站短信的频率（以分钟为单位）。设置为 `0` 可禁用。 | `0` |
| **国家/地区定价代码** | ISO 国家/地区代码（例如 `DE`、`US`）用于仅加载该国家/地区的短信定价。留空则加载所有国家/地区的定价。 | *(空)* |
| **国家/地区定价代码** | ISO 国家/地区代码（例如 `DE`、`US`）用于仅加载该国家/地区的短信定价。留空则加载所有国家/地区的定价。 | *(空)* |

---

## 数据点
### `info`
| 状态 | 类型 | 描述 |
| `info.connection` | 布尔值 | `true` 适配器何时可以访问 seven.io API |
| `info.connection` | 布尔值 | 当适配器可以连接到 seven.io API 时为 `true` |

### `account`
| 状态 | 类型 | 描述 |
| `account.balance` | 数字 | 当前账户余额 |
| `account.currency` | 字符串 | 货币（例如 `EUR`） |
| `account.lastCheck` | 字符串 | 上次余额轮询的 ISO 时间戳 |
| `account.lastCheck` | 字符串 | 上次余额轮询的 ISO 时间戳 |

### `contacts`
| 状态 | 类型 | 描述 |
| `contacts.json` | 字符串（JSON） | 完整的联系人列表（JSON 数组） |
| `contacts.count` | 数字 | 联系人数量 |
| `contacts.refresh` | 布尔值 | 设置为 `true` 可立即触发联系人刷新 |
| `contacts.new.name` | 字符串 | 要创建的新联系人的名称 |
| `contacts.new.number` | 字符串 | 新联系人的电话号码（格式：`491234567890`，不包含 `+`） |
| `contacts.new.save` | 布尔值 | 设置为 `true` 以创建联系人并刷新列表 |
| `contacts.list.<Name>` | 字符串 | 每个联系人一个状态 — 状态名称是联系人的显示名称（例如 `contacts.list.Max_Mustermann`），值为电话号码 |
| `contacts.list.<Name>` | 字符串 | 每个联系人一个状态 — 状态名称是联系人的显示名称（例如 `contacts.list.Max_Mustermann`），值为电话号码 |

### `sms`
| 状态 | 类型 | 读/写 | 描述 |
| `sms.to` | 字符串 | 读写 | 收件人 — 电话号码 (`+491234567890`) **或联系人姓名** (例如 `Max Mustermann`) |
| `sms.from` | 字符串 | 读写 | 发件人 ID 覆盖 — 空 = 使用设置中的默认值 |
| `sms.text` | 字符串 | 读写 | 消息文本（最多 1520 个字符 / 约 10 条短信） |
| `sms.flash` | 布尔值 | 读写 | 以闪信形式发送（消息直接显示在屏幕上） |
| `sms.getReplies` | 布尔值 | 读写 | 启用共享池，以便收件人可以回复 — 每条消息选择加入，默认值 `false` |
| `sms.send` | 布尔值 | 读写 | 设置为 `true` 以发送 — 自动重置为 `false` |
| `sms.lastResult` | 字符串（JSON） | r | 最后一次发送尝试的完整 API 响应，包括 `statusText` |
| `sms.lastStatus` | 字符串 | r | 最后一次发送的人类可读状态（例如 `Success`、`Insufficient credits`） |
| `sms.lastDelivery` | 字符串 (JSON) | r | 发送后约 60 秒获取投递报告 — 包含 `id`、`to`、`status`（例如 `DELIVERED`） |
| `sms.lastDelivery` | 字符串（JSON） | r | 发送后约 60 秒获取的投递报告 — 包含 `id`、`to`、`status`（例如 `DELIVERED`） |

### `sms.inbound`
| 状态 | 类型 | 描述 |
| `sms.inbound.id` | 字符串 | 最后收到的短信的消息 ID |
| `sms.inbound.from` | 字符串 | 最后收到的短信的发送者号码 |
| `sms.inbound.text` | 字符串 | 最后收到的短信的文本内容 |
| `sms.inbound.timestamp` | 字符串 | 短信接收时间戳 |
| `sms.inbound.timestamp` | 字符串 | 收到短信的时间戳 |

### `voice`
| 状态 | 类型 | 读/写 | 描述 |
| `voice.to` | 字符串 | 读写 | 收件人电话号码 |
| `voice.from` | 字符串 | 读写 | 已验证的来电号码（必须在您的 seven.io 帐户中注册） |
| `voice.text` | 字符串 | rw | 要朗读的文本（TTS），最多 10000 个字符 |
| `voice.ringtime` | 号码 | rw | 挂断前响铃的时长（5-60 秒，默认 30 秒） |
| `voice.send` | 布尔值 | 读写 | 设置为 `true` 以启动调用 — 自动重置为 `false` |
| `voice.lastResult` | 字符串（JSON） | r | 最后一次调用尝试的完整 API 响应 |
| `voice.lastStatus` | 字符串 | r | 最后一次调用的人类可读状态（例如 `Success`、`Call failed`） |
| `voice.lastStatus` | 字符串 | r | 上次通话的易读状态（例如，`成功`、`通话失败`） |

### `pricing`
| 状态 | 类型 | 描述 |
| `pricing.json` | 字符串 (JSON) | 来自 seven.io 的完整定价数据 — 已配置国家/地区或所有国家/地区的每个网络的短信价格 |
| `pricing.price` | 号码 (€) | 已配置国家/地区的短信价格 — 仅当配置了国家/地区代码时设置 |
| `pricing.lastUpdate` | 字符串 | 上次获取价格信息的 ISO 时间戳 |
| `pricing.refresh` | 布尔值 | 设置为 `true` 可立即刷新价格数据 |
| `pricing.refresh` | 布尔值 | 设置为 `true` 可立即刷新价格数据 |

### `stats` *(滚动30天)*
统计数据始终涵盖从今天 - 30 天到今天这段滚动时间。它们会在适配器启动时以及手动触发时获取一次——没有自动刷新定时器。

| 状态 | 类型 | 描述 |
|---|---|---|
| `stats.smsSent` | 数字 | 过去 30 天内发送的短信总数 |
| `stats.inbound` | 数字 | 过去 30 天内收到的短信总数 |
| `stats.totalCost` | 数字 | 过去 30 天的总费用（欧元） |
| `stats.lastUpdate` | 字符串 | 上次统计信息获取的 ISO 时间戳 |
| `stats.json` | 字符串（JSON） | 按天分组的原始分析数据 |
| `stats.refresh` | 布尔值 | 设置为 `true` 可立即刷新统计信息 |
| `stats.refresh` | 布尔值 | 设置为 `true` 可立即刷新统计信息 |

---

## 收到的短信
要接收短信回复，您需要使用**数字发件人**——字母数字组合的名称（例如 `MyCompany`）无法直接接收回复。您有两种选择：

### 选项 1 — 共享池（免费，用于测试和轻度使用）
每条消息传递 `getReplies: true`（Blockly 复选框或 `sendTo()` 参数）。seven.io 会自动分配一个临时共享池编号作为发件人，因此即使发件人 ID 为字母数字组合，回复也能正常工作。

| | |
|---|---|
| **费用** | 免费 — 仅需支付常规短信发送费用 |
| **回复窗口** | 发送后 48 小时 |
| **号码稳定性** | 两周内会尝试使用同一号码——但不保证一定有效 |
| **适用国家/地区** | DE 🇩🇪 AT 🇦🇹 CH 🇨🇭 US 🇺🇸 PL 🇵🇱 |
| **适用场景** | 测试、小批量、非关键性通知 |

### 方案二——自建来电号码（约20欧元/月）
直接在您的 seven.io 控制面板中租用虚拟来电号码。回复将可靠且永久地送达。

| | |
|---|---|
| **费用** | 约20欧元/月 |
| 回复窗口 | 无限制 |
| **号码稳定性** | 固定号码，始终保持不变 |
| **适用国家/地区** | 众多 — 请查看 seven.io 控制面板 |
| **适用范围** | 持续的客户沟通、生产用途 |

在适配器设置中配置轮询间隔。设置为`0`可禁用入站轮询（例如，如果您改用 webhook）。

> **每个周期多条消息：** 如果在两次轮询之间收到多条短信，适配器会按时间顺序处理所有消息（最早的先处理）。每条消息都会触发 `sms.inbound.text` 的单独状态更改，因此，每个监视此状态的 Blockly 规则或 JavaScript 自动化脚本都会因收到每条消息而触发一次。周期结束后，数据点始终反映最新消息。

---

## Blockly
安装适配器后，ioBroker Blockly 编辑器的 **sendTo** 类别中会出现一个可直接使用的模块。

```
┌─ seven.io  |  SMS ☑  Voice call ☐ ─────────────┐
│  sender (optional)  [ ""                  ]      │
│  recipient          [ "+491234567890"     ]      │
│  message            [ "Alarm!"            ]      │
│  flash SMS ☐  replies (shared pool) ☐           │
│  ring time (s)  30                               │
│  instance  sevenio.0 ▼                           │
└──────────────────────────────────────────────────┘
```

- 勾选**短信**发送短信
- 勾选“语音通话”以触发自动 TTS 通话
- 勾选**两者**即可同时发送短信和拨打电话（并行，无额外延迟）
- **回复（共享池）** — 选中此项后，seven.io 将使用共享池号码作为发件人，以便收件人可以回复（参见[入站短信](#inbound-sms)）。
- **收件人**输入框可接受来自 seven.io 联系人列表的电话号码或联系人姓名。

---

## SendTo() 脚本
所有功能均可通过 JavaScript 适配器中的 `sendTo()` 获取。

**发送短信：**

```javascript
sendTo('sevenio.0', 'send', {
    to: '+491234567890',   // or a contact name: 'Max Mustermann'
    text: 'Door opened!',
    flash: false,          // optional
    getReplies: true,      // optional — enable shared pool so recipient can reply
}, result => {
    console.log(result.statusText); // e.g. 'Success'
});
```

**触发语音通话：**

```javascript
sendTo('sevenio.0', 'voice', {
    to: '+491234567890',
    text: 'Attention! Motion detected in the garage.',
    ringtime: 30,          // optional, 5–60 s
});
```

获取账户余额：

```javascript
sendTo('sevenio.0', 'get_balance', {}, result => {
    console.log(result.amount, result.currency);
});
```

获取联系人列表：

```javascript
sendTo('sevenio.0', 'get_contacts', {}, contacts => {
    console.log(JSON.stringify(contacts));
});
```

创建联系人：

```javascript
sendTo('sevenio.0', 'create_contact', {
    name: 'Max Mustermann',
    number: '491234567890',   // without +
});
```

**测试短信（发送测试短信以验证 API 密钥）：**

```javascript
sendTo('sevenio.0', 'test_sms', { to: '+491234567890' }, result => {
    console.log(result.statusText);
});
```

**测试语音通话：**

```javascript
sendTo('sevenio.0', 'test_voice', { to: '+491234567890' }, result => {
    console.log(result);
});
```

立即刷新统计数据：

```javascript
sendTo('sevenio.0', 'get_stats', {}, result => {
    console.log(result); // raw analytics data
});
```

或者，将 `sevenio.0.stats.refresh` 数据点设置为 `true` — 适配器会自动获取新的统计信息并将状态重置为 `false`。

**延迟短信（定时发送）：**

```javascript
sendTo('sevenio.0', 'send', {
    to: '+491234567890',
    text: 'Good morning!',
    delay: '2026-12-24 08:00:00', // ISO datetime or Unix timestamp (seconds)
}, result => {
    console.log(result.statusText);
});
```

`delay` 参数将直接转发至 seven.io API。请使用 ISO 日期时间字符串 (`YYYY-MM-DD HH:MM:SS`) 或以秒为单位的 Unix 时间戳。消息将由 seven.io 排队，并在指定时间发送。

---

## 短信状态码
`sms.lastStatus` 状态包含 seven.io 状态码的人类可读翻译：

| 代码 | 含义 |
|---|---|
| 100 | 成功 |
| 101 | 转接至短信中心失败 |
| 201 | 无效的收件人号码 |
| 202 | 无效的发件人 ID |
| 301 | 学分不足 |
| 403 | 发件人已被列入黑名单 |
| 500 | 未知错误 |
| 700 | 网络传输超时 |

---

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.1.2 (2026-07-22)
* (ipod86) Maintenance: fix io-package.json structure, improve CI and dependabot configuration

### 0.1.1 (2026-07-22)
* (ipod86) Fix: multiple inbound SMS per poll cycle now each trigger automations (processed oldest-first)

### 0.1.0 (2026-07-22)
* (ipod86) SMS sending via state, Blockly, and sendTo()
* (ipod86) Voice calls (TTS) via state, Blockly, and sendTo()
* (ipod86) Contact management — sync, create, send by name
* (ipod86) Inbound SMS polling with shared pool and own number support
* (ipod86) Delivery status check ~60 s after sending
* (ipod86) Account balance polling
* (ipod86) SMS pricing data with per-country price state
* (ipod86) Usage statistics (rolling 30-day window)

---

## License
MIT License

Copyright (c) 2026 ipod86 <david@graef.email>

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