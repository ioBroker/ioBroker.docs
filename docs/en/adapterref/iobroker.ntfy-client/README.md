![Logo](admin/ntfy-client.png)

# ioBroker.ntfy-client

[![NPM version](https://img.shields.io/npm/v/iobroker.ntfy-client.svg)](https://www.npmjs.com/package/iobroker.ntfy-client)
[![Downloads](https://img.shields.io/npm/dm/iobroker.ntfy-client.svg)](https://www.npmjs.com/package/iobroker.ntfy-client)
![Number of Installations](https://iobroker.live/badges/ntfy-client-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/ntfy-client-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.ntfy-client.png?downloads=true)](https://nodei.co/npm/iobroker.ntfy-client/)

**Tests:** [![Test and Release](https://github.com/lubepi/ioBroker.ntfy-client/workflows/Test%20and%20Release/badge.svg)](https://github.com/lubepi/ioBroker.ntfy-client/actions?query=workflow%3A%22Test+and+Release%22)

Unofficial ntfy.sh client adapter for ioBroker

Send and receive notifications via [ntfy.sh](https://ntfy.sh) directly from ioBroker. This adapter is a community project and not affiliated with ntfy LLC.

### Features

- **Publish notifications** with full ntfy parameter support
- **Subscribe to topics** and receive messages in real-time via SSE (Server-Sent Events)
- **Account statistics** – view usage stats (messages, emails, calls, attachments, reservations)
- **Server version check** – detect available updates for self-hosted ntfy instances
- **Connection status** – monitor the adapter's connection to the ntfy server with dynamic health checks
- Basic authentication and bearer token support
- Custom server URLs (or the standard ntfy.sh instance)
- **Integrated `sendTo` Blockly blocks** for graphic scripts (send and manage)
- **Dismiss (clear) and delete notifications** by sequence ID
- File upload attachments via PUT

### Supported Notification Parameters

| Parameter      | Description                                                                        |
| -------------- | ---------------------------------------------------------------------------------- |
| `message`      | Notification message text (defaults to "triggered" if empty)                       |
| `topic`        | Target topic (falls back to configured default topic)                              |
| `title`        | Notification title                                                                 |
| `priority`     | Priority level: 1 (min), 2 (low), 3 (default), 4 (high), 5 (max)                   |
| `tags`         | Tags or emoji shortcodes (comma-separated string or array)                         |
| `click`        | URL opened when notification is clicked                                            |
| `attach`       | URL of file to attach                                                              |
| `attach_file`  | Local file path to upload as attachment (uses PUT)                                 |
| `filename`     | Custom filename for the attachment                                                 |
| `actions`      | Action buttons (JSON string or object)                                             |
| `markdown`     | Enable Markdown formatting (`true`/`false`)                                        |
| `delay`        | Delay delivery (e.g. "30s", "5m", "2h")                                            |
| `email`        | Forward notification to this email address                                         |
| `call`         | Phone number to call with TTS (requires ntfy Pro)                                  |
| `icon`         | Icon URL displayed next to the notification                                        |
| `sequence_id`  | Replace/update an existing notification with the same Sequence-ID                  |
| `disable_cache`     | Set to `true`/`yes` to disable server-side caching                                 |
| `disable_firebase`  | Set to `true`/`yes` to disable forwarding to Firebase Cloud Messaging (Android)    |
| `unified_push` | Set to `1` to enable UnifiedPush support                                           |
| `template`     | Use `true`/`yes` for inline templates, or a name like `github` for predefined ones |
| `data`         | JSON data object or string to be used for the template context                     |

### Topic Subscription (Receive Messages)

Configure topics in the adapter settings under the **Topics** tab. The adapter subscribes to these topics via SSE and creates states for each topic under `ntfy-client.0.topics.<topicName>`:

| State                   | Description                               |
| ----------------------- | ----------------------------------------- |
| `lastMessage`           | Last received message text                |
| `lastTitle`             | Last received title                       |
| `lastPriority`          | Last received priority                    |
| `lastTags`              | Last received tags (comma-separated)      |
| `lastClick`             | Last received click URL                   |
| `lastIcon`              | Last received icon URL                    |
| `lastActions`           | Last received actions (JSON)              |
| `lastAttachmentUrl`     | Last received attachment URL              |
| `lastAttachmentName`    | Last received attachment name             |
| `lastAttachmentType`    | Last received attachment MIME type        |
| `lastAttachmentSize`    | Last received attachment size (bytes)     |
| `lastAttachmentExpires` | Last received attachment expiry timestamp |
| `lastTimestamp`         | Last message timestamp                    |
| `lastExpires`           | Last message expiry timestamp             |
| `lastMessageId`         | Last message ID                           |
| `lastSequenceId`        | Last sequence ID (for managing messages)  |
| `lastTopic`             | Last received topic name                  |
| `lastEvent`             | Last received event type                  |
| `lastJson`              | Full JSON of last received message        |
| `subscribed`            | Whether the subscription is active        |

### Account Statistics

When authentication is configured, the adapter fetches account statistics every 15 minutes and stores them under `ntfy-client.0.stats`:

- **Messages**: published, remaining, limit, expiry duration
- **Emails**: sent, remaining, limit
- **Phone calls**: made, remaining, limit
- **Reserved topics**: count, remaining, limit
- **Attachments**: storage used/remaining/limit, expiry duration, file size limit, bandwidth limit
- **Account**: subscription tier

### Connection Status & Health Checks

The adapter monitors the connection to the ntfy server via the `info.connection` state:

| State                  | Description                                 |
| ---------------------- | ------------------------------------------- |
| `info.connection`      | Connection status to the ntfy server        |
| `info.serverVersion`   | Current ntfy server version                 |
| `info.latestVersion`   | Latest available version (self-hosted only) |
| `info.updateAvailable` | Whether a server update is available        |

The health check runs against the `/v1/health` endpoint with **dynamic intervals**:

- **Every 6 hours** when the server is healthy
- **Every 5 minutes** when the last check failed (for faster recovery)

Additionally, the connection status is automatically set to **connected** when:

- A notification is successfully sent
- An SSE subscription connects successfully
- A message is received on a subscribed topic

### Blockly Examples

Under the **Sendto** category, use the following blocks:

#### 1. ntfy-client notification (send)

Dispatch a message with all supported parameters:

1. Set the **Instance**.
2. Set the **Message**.
3. Set the **Topic** (or leave empty to use the default topic).
4. Optionally add more parameters via the **mutator** (gear icon): title, priority, tags, icon, click URL, actions, attachments, delay, email, call, etc.
5. Use **Sequence ID** if you want to update/overwrite an existing notification later.

#### 2. ntfy-client management (manage)

Clear or delete an existing notification:

1. Set the **Instance**.
2. Set the **Action** (mark as read and dismiss, or delete).
3. Set the **Topic**.
4. Set the **Sequence ID** of the message you want to manage.

> **Note on IDs:** Each notification is assigned a unique `id` (Message ID) by the server.
>
> - If you **provide** a `sequence_id` when sending, you **must use this `sequence_id`** for all management actions (dismiss, delete).
> - If you **do not provide** a `sequence_id`, the server-generated `id` (Message ID) serves as the `sequence_id` for management.
>
> Multiple messages sharing the same `sequence_id` form a sequence — only the latest message in a sequence is displayed.

### JavaScript Examples

#### Send a notification

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

#### Send with email forwarding and icon

```javascript
sendTo("ntfy-client.0", "send", {
  message: "Temperature above threshold!",
  topic: "home_alerts_xyz",
  email: "admin@example.com",
  icon: "https://example.com/icon.png",
  priority: "4",
});
```

#### Send with file attachment

```javascript
sendTo("ntfy-client.0", "send", {
  message: "Security camera snapshot",
  topic: "home_alerts_xyz",
  attach_file: "/tmp/snapshot.jpg",
  filename: "camera_snapshot.jpg",
});
```

#### Send with action buttons

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

#### Send with template (Inline / Manual)

Use the `message` field as your template string and provide the JSON context in the `data` field:

```javascript
sendTo("ntfy-client.0", "send", {
  topic: "home_alerts_xyz",
  template: true,
  message: "Current temperature is {{.temp}}°C from {{.sensor}}",
  data: { temp: 42, sensor: "living_room" },
});
```

#### Send with template (Predefined / e.g. GitHub)

For predefined templates like `github`, provide the original webhook JSON data in the `data` field. The data structure must match what the original service sends ([see template source](https://github.com/binwiederhier/ntfy/blob/main/server/templates/github.yml)):

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

> **Note:** Predefined templates expect the **exact data structure** from the original service. Missing or misnamed fields will show as `<no value>`. For full control over formatting, use an inline template (`template: true`) instead.

#### Dismiss a notification

```javascript
sendTo("ntfy-client.0", "dismiss", {
  topic: "home_alerts_xyz",
  sequence_id: "abc123",
});
```

#### Delete a notification

```javascript
sendTo("ntfy-client.0", "delete", {
  topic: "home_alerts_xyz",
  sequence_id: "abc123",
});
```

### Authentication

Ntfy supports a few variations:

- **None**: Suitable for standard ntfy.sh servers (topics are public!).
- **Basic Auth**: Setup a local server with Username and Password.
- **Access Token**: Create tokens and use Bearer token validation for your topic.

### Commands

| Command             | Description                                          |
| ------------------- | ---------------------------------------------------- |
| `send` / `publish`  | Send a notification                                  |
| `dismiss` / `clear` | Dismiss (mark as read) a notification by sequence_id |
| `delete`            | Delete a notification by sequence_id                 |

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

## Legal Notice

This adapter is **NOT** an official product of ntfy LLC. The name **ntfy**, the logo and branding are trademarks of ntfy LLC. This adapter is a community project to provide integration into ioBroker.

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
