---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.ntfy-client/README.md
title: ioBroker.ntfy-client
hash: T6o4lKkNpKm22ELPVEGcrI8UXHtzheamg4I7ub8IpQU=
---
![标识](../../../en/adapterref/iobroker.ntfy-client/admin/ntfy-client.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.ntfy-client.svg)
![下载](https://img.shields.io/npm/dm/iobroker.ntfy-client.svg)
![安装数量](https://iobroker.live/badges/ntfy-client-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/ntfy-client-stable.svg)
![NPM](https://nodei.co/npm/iobroker.ntfy-client.png?downloads=true)

# IoBroker.ntfy-client
**测试：** [![测试和发布](https://github.com/lubepi/ioBroker.ntfy-client/workflows/Test%20and%20Release/badge.svg)](https://github.com/lubepi/ioBroker.ntfy-client/actions?query=workflow%3A%22Test+and+Release%22)

适用于 ioBroker 的非官方 ntfy.sh 客户端适配器

通过 [ntfy.sh](https://ntfy.sh) 直接从 ioBroker 发送和接收通知。此适配器为社区项目，与 ntfy LLC 无关。

＃＃＃ 特征
- **发布通知**，并完全支持ntfy参数
- **订阅主题**并通过 SSE（服务器发送事件）实时接收消息
- **账户统计信息** – 查看使用统计信息（消息、电子邮件、通话、附件、预订）
- **服务器版本检查** – 检测自托管 ntfy 实例的可用更新
- **连接状态** – 通过动态健康检查监控适配器与 ntfy 服务器的连接
- 支持基本身份验证和持有者令牌
- 自定义服务器 URL（或标准 ntfy.sh 实例）
- **集成了用于图形脚本的 `sendTo` Blockly 模块**（发送和管理）
- 按序列 ID 清除和删除通知
- 通过 PUT 上传文件附件

### 支持的通知参数
| 参数 | 描述 |
| -------------- | ---------------------------------------------------------------------------------- |
| `message` | 通知消息文本（如果为空，则默认为“已触发”） |
| `title` | 通知标题 |
| `priority` | 优先级：1（最低），2（低），3（默认），4（高），5（最高） |
| `tags` | 标签或表情符号短代码（逗号分隔的字符串或数组） |
| `click` | 点击通知时打开的 URL |
| `attach` | 要附加的文件的 URL |
| `attach_file` | 要作为附件上传的本地文件路径（使用 PUT 请求） |
| `filename` | 附件的自定义文件名 |
| `actions` | 操作按钮（JSON 字符串或对象） |
| `markdown` | 启用 Markdown 格式（`true`/`false`） |
| `delay` | 延迟交付（例如“30秒”、“5分钟”、“2小时”） |
| `email` | 将通知转发至此邮箱地址 |
| `call` | 用于TTS通话的电话号码（需要ntfy Pro） |
| `icon` | 通知旁边的图标 URL |
| `sequence_id` | 替换/更新具有相同序列 ID 的现有通知 |
| `disable_cache` | 设置为 `true`/`yes` 可禁用服务器端缓存 |
| `disable_firebase` | 设置为 `true`/`yes` 可禁用转发至 Firebase 云消息传递（Android） |
| `unified_push` | 设置为 `1` 以启用 UnifiedPush 支持 |
| `template` | 对于内联模板，请使用 `true`/`yes`；对于预定义模板，请使用类似 `github` 的名称。 |
| `data` | 用于模板上下文的 JSON 数据对象或字符串 |
| `data` | 用于模板上下文的 JSON 数据对象或字符串 |

### 主题订阅（接收消息）
在适配器设置的“主题”选项卡下配置主题。适配器通过 SSE 订阅这些主题，并在 `ntfy-client.0.topics.<topicName>` 下为每个主题创建状态：

| 状态 | 描述 |
| ----------------------- | ----------------------------------------- |
| `lastMessage` | 最后收到的消息文本 |
| `lastPriority` | 最后接收优先级 |
| `lastTags` | 最后接收到的标签（逗号分隔） |
| `lastClick` | 最后收到的点击 URL |
| `lastIcon` | 最后接收到的图标 URL |
| `lastActions` | 最后接收到的操作（JSON） |
| `lastAttachmentUrl` | 最后接收到的附件 URL |
| `lastAttachmentName` | 最后收到的附件名称 |
| `lastAttachmentType` | 最后接收到的附件 MIME 类型 |
| `lastAttachmentSize` | 最后接收到的附件大小（字节） |
| `lastAttachmentExpires` | 最后接收附件的过期时间戳 |
| `lastTimestamp` | 最后一条消息时间戳 |
| `lastExpires` | 最后一条消息的过期时间戳 |
| `lastMessageId` | 最后一条消息 ID |
| `lastSequenceId` | 最后一个序列 ID（用于管理消息） |
| `lastTopic` | 最后接收到的主题名称 |
| `lastEvent` | 最后接收到的事件类型 |
| `lastJson` | 最后接收到的消息的完整 JSON 数据 |
| `subscribed` | 订阅是否有效 |
| `subscribed` | 订阅是否有效 |

### 账户统计
配置身份验证后，适配器每 15 分钟获取一次帐户统计信息，并将其存储在 `ntfy-client.0.stats` 下：

- **消息**：已发布、剩余、限制、过期时间
- **邮件数量**：已发送、剩余、限制
- **电话通话**：已拨、剩余、限额
- **预留主题**：计数、剩余、限制
- **附件**：已用/剩余/限制存储空间、过期时间、文件大小限制、带宽限制
- **账户**：订阅级别

### 连接状态和健康检查
适配器通过 `info.connection` 状态监控与 ntfy 服务器的连接：

| 状态 | 描述 |
| ---------------------- | ------------------------------------------- |
| `info.connection` | 与ntfy服务器的连接状态 |
| `info.latestVersion` | 最新可用版本（仅限自托管） |
| `info.updateAvailable` | 服务器是否有可用更新 |
| `info.updateAvailable` | 服务器是否有可用更新 |

健康检查针对 `/v1/health` 端点运行，**动态间隔**：

- **每 6 小时** 服务器运行正常时
- **每 5 分钟**一次，当上次检查失败时（为了更快恢复）

此外，当满足以下条件时，连接状态会自动设置为**已连接**：

通知已成功发送
- SSE订阅连接成功
- 收到一条关于已订阅主题的消息

### Blockly 示例
在“发送到”类别下，使用以下代码块：

#### 1. ntfy-client 通知（发送）
发送一条包含所有支持参数的消息：

1. 设置**实例**。
2. 设置**消息**。
3. 设置**主题**（或留空以使用默认主题）。
4. （可选）通过**修改器**（齿轮图标）添加更多参数：标题、优先级、标签、图标、点击 URL、操作、附件、延迟、电子邮件、通话等。
5. 如果以后想要更新/覆盖现有通知，请使用**序列 ID**。

#### 2. ntfy-client 管理（管理）
清除或删除现有通知：

1. 设置**实例**。
2. 设置**操作**（标记为已读并关闭，或删除）。
3. 设定**主题**。
4. 设置要管理的消息的**序列 ID**。

> **关于 ID 的说明：** 服务器会为每条通知分配一个唯一的 `id`（消息 ID）。

> > - 如果您在发送时**提供了** `sequence_id`，则**您必须使用此 `sequence_id`**进行所有管理操作（例如，忽略、删除）。

> - 如果您**未提供** `sequence_id`，则服务器生成的 `id`（消息 ID）将用作管理的 `sequence_id`。

> > 多条消息共享同一个 `sequence_id` 将构成一个序列——序列中仅显示最后一条消息。

### JavaScript 示例
#### 发送通知
```javascript
sendTo("ntfy-client.0", "send", {
  message: "Motion detected in the backyard!",
  title: "Security Alert",
  topic: "home_alerts_xyz",
  priority: "high",
  tags: "warning,motion",
  click: "https://example.com",
  markdown: true,
});
```

#### 通过电子邮件转发和图标发送
```javascript
sendTo("ntfy-client.0", "send", {
  message: "Temperature above threshold!",
  topic: "home_alerts_xyz",
  email: "admin@example.com",
  icon: "https://example.com/icon.png",
  priority: "4",
});
```

#### 发送附件
```javascript
sendTo("ntfy-client.0", "send", {
  message: "Security camera snapshot",
  topic: "home_alerts_xyz",
  attach_file: "/tmp/snapshot.jpg",
  filename: "camera_snapshot.jpg",
});
```

#### 发送并附带操作按钮
```javascript
sendTo("ntfy-client.0", "send", {
  message: "Doorbell rang!",
  topic: "home_alerts_xyz",
  actions: [
    { action: "view", label: "Open Camera", url: "https://camera.example.com" },
    {
      action: "http",
      label: "Turn on Light",
      url: "https://ha.example.com/api/light/on",
      method: "POST",
    },
  ],
});
```

#### 使用模板发送（内嵌/手动）
使用 `message` 字段作为模板字符串，并在 `data` 字段中提供 JSON 上下文：

```javascript
sendTo("ntfy-client.0", "send", {
  topic: "home_alerts_xyz",
  template: true,
  message: "Current temperature is {{.temp}}°C from {{.sensor}}",
  data: { temp: 42, sensor: "living_room" },
});
```

#### 使用模板发送（预定义模板/例如 GitHub 模板）
对于预定义的模板（例如 `github`），请在 `data` 字段中提供原始 webhook JSON 数据。数据结构必须与原始服务发送的数据（[请参阅模板源](https://github.com/binwiederhier/ntfy/blob/main/server/templates/github.yml)）相匹配：

```javascript
sendTo("ntfy-client.0", "send", {
  topic: "github_webhooks",
  template: "github",
  data: {
    action: "opened",
    issue: {
      number: 42,
      title: "Found a bug",
      html_url: "https://github.com/my/repo/issues/42",
      user: { html_url: "https://github.com/octocat" },
    },
    repository: {
      full_name: "my/repo",
      html_url: "https://github.com/my/repo",
    },
  },
});
```

> **注意：**预定义模板需要与原始服务**完全一致的数据结构**。缺失或命名错误的字段将显示为`<no value>`。如需完全控制格式，请改用内联模板（`template: true`）。

#### 关闭通知
```javascript
sendTo("ntfy-client.0", "dismiss", {
  topic: "home_alerts_xyz",
  sequence_id: "abc123",
});
```

#### 删除通知
```javascript
sendTo("ntfy-client.0", "delete", {
  topic: "home_alerts_xyz",
  sequence_id: "abc123",
});
```

＃＃＃ 验证
Ntfy 支持以下几种变体：

- **无**：适用于标准的 ntfy.sh 服务器（主题是公开的！）。
- **基本身份验证**：使用用户名和密码设置本地服务器。
- **访问令牌**：创建令牌并为您的主题使用 Bearer 令牌验证。

### 命令
| 命令 | 描述 |
| ------------------- | ---------------------------------------------------- |
| `send` / `publish` | 发送通知 |
| `delete` | 按 sequence_id 删除通知 |
| `删除` | 根据 sequence_id 删除通知 |

## 法律声明
此适配器并非ntfy LLC的官方产品。ntfy名称、徽标和品牌均为ntfy LLC的商标。此适配器是一个社区项目，旨在提供与ioBroker的集成。

## Changelog

### **WORK IN PROGRESS**
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 0.1.4 (2026-06-07)

- (lubepi) **FIXED**: Adapter now creates missing parent folder objects (stats, topics) so they appear correctly in the object tree
- (lubepi) **FIXED**: Corrected state roles for attachment-related states (storage, file size, bandwidth)
- (lubepi) **ENHANCED**: Hardened error handling throughout the adapter and extracted reusable helper methods
- (lubepi) **ENHANCED**: Cleaned up orphaned translation keys from all language files

### 0.1.3 (2026-04-12)
- (lubepi) Refactor: Move internal config signature to local file storage (remove useless object from tree)

### 0.1.2 (2026-04-12)
- (lubepi) Update axios due to critical security fixes (SSRF, Header Injection)

### 0.1.1 (2026-04-12)
- (lubepi) Reset runtime states on server or account configuration changes
- (lubepi) Mask credentials in logs and only log the configured authentication type

### 0.1.0 (2026-04-12)
- (lubepi) Initial release with full ntfy.sh support
- Subscribe to topics via SSE (receive messages in real-time)
- Publish notifications with all ntfy parameters (title, priority, tags, click, attach, actions, markdown, delay, email, call, icon, sequence_id, disable_cache, disable_firebase, unified_push, template)
- File upload attachments via PUT
- Dismiss and delete notifications by sequence_id
- Account statistics (messages, emails, calls, attachments, reservations)
- Server version check for self-hosted instances
- Dynamic connection status monitoring with health checks
- Blockly blocks for sending and managing notifications
- Full i18n support (en, de, ru, pt, nl, fr, it, es, pl, uk, zh-cn)

[Older changes can be found here](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 lubepi

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