---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.cctvql/README.md
title: ioBroker.cctvql
hash: zhl1HEiRIs5r2vb+G2rCYPPqUPRKSl+D4BWY4haQAl8=
---
<p align="center"><img src="docs/assets/cover.svg" alt="ioBroker.cctvql 封面" width="100%"></p>

<p align="center"><img src="docs/assets/logo.svg" alt="ioBroker.cctvql 标志" width="96" height="96"></p>

# IoBroker.cctvql
ioBroker 适配器 [cctvQL](https://github.com/arunrajiah/cctvql) — 闭路电视系统的自然语言查询层。

直接从 ioBroker 脚本和 Blockly 流程中询问诸如“昨晚有人在前门吗？”之类的问题，获取 Frigate、Hikvision、Synology、Dahua、Milestone、ONVIF 等平台的实时检测事件。

---

## 先决条件
正在运行的 [cctvQL 服务器](https://github.com/arunrajiah/cctvql):

```bash
docker run -p 8000:8000 \
  -e CCTVQL_ADAPTER=frigate \
  -e CCTVQL_FRIGATE_HOST=http://192.168.1.100:5000 \
  ghcr.io/arunrajiah/cctvql:latest
```

---

＃＃ 配置
| 字段 | 默认值 | 描述 |
|---|---|---|
| 主机 | `localhost` | cctvQL 服务器主机名或 IP 地址 |
| 协议 | `http` | `http` 或 `https` |
| 协议 | `http` | `http` 或 `https` |
| 轮询间隔 | `30` 秒 | 获取检测事件的频率 |
| 轮询间隔 | `30` 秒 | 获取检测事件的频率 |

---

## 数据点
＃＃＃ 询问
| ID | 类型 | 描述 |
|---|---|---|
| `cctvql.0.query.send` | 字符串（可写） | 在此处输入自然语言问题以触发查询 |
| `cctvql.0.query.intent` | 字符串 | 检测到的意图（例如 `query_events`） |
| `cctvql.0.query.intent` | 字符串 | 检测到的意图（例如 `query_events`） |

### 活动
| ID | 类型 | 描述 |
|---|---|---|
| `cctvql.0.events.latest` | JSON 字符串 | 最近检测事件数组 |
| `cctvql.0.cameras.<id>.lastEvent` | JSON 字符串 | 每个摄像头的最后一个事件（自动创建） |
| `cctvql.0.cameras.<id>.lastEvent` | JSON 字符串 | 每个摄像头的最后一个事件（自动创建） |

＃＃＃ 地位
| ID | 类型 | 描述 |
|---|---|---|
| `cctvql.0.info.connection` | 布尔值 | `true` 当 cctvQL 可达时 |

---

## 示例：脚本中的查询
```javascript
// In an ioBroker JavaScript adapter script:
setState('cctvql.0.query.send', 'Any cars in the driveway today?');

on({ id: 'cctvql.0.query.answer', change: 'any' }, (obj) => {
    log('cctvQL says: ' + obj.state.val);
    // → "Yes, a white SUV was detected at 14:32 and 17:10."
});
```

---

## Changelog

### 1.0.5 (2026-07-20)
* Remove spurious `localhost` key from all 11 i18n translation files
* Align polling interval UI minimum to 15 s (matches code floor)
* Remove PTZ claim from adapter descriptions and README intro

### 1.0.4 (2026-07-11)
* Remove npm-token from deploy step to enable OIDC trusted publishing (E3019)
* Add v1.0.3 and v1.0.4 entries to README changelog (E6029)
* Merge bot PRs: fix schema links, add CHANGELOG_OLD.md, optimize Dependabot config

### 1.0.3 (2026-06-27)
* Use self-rescheduling setTimeout for poll loop to prevent overlapping cycles
* Clamp pollingInterval in code (min 15 s, max 3600 s) independent of UI limits
* Remove unimplemented PTZ state handler
* Require Node.js >= 22; drop Node.js 20 (EOL) from test matrix

### 1.0.2 (2026-06-07)
* Update @alcalzone/release-script* to 5.2.x (checker E0036)
* Require Node.js >= 24; update CI deploy job to node 24 (checker E3022)
* Add i18n key for `placeholder` in jsonConfig host field (checker E5612)

### 1.0.1 (2026-04-27)
* Add bluefox as npm collaborator

### 1.0.0 (2026-04-21)
* Initial release — natural-language queries and event polling

---

## License

MIT License

Copyright (c) 2026 arunrajiah <arunrajiah@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.