---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.mihome-cloud/README.md
title: ioBroker.mihome-cloud
hash: EgFNTjhuXL4jCtUWDqmgspUKCYzhPQkzbql0DIzpl1o=
---
![标识](../../../en/adapterref/iobroker.mihome-cloud/admin/mihome-cloud.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.mihome-cloud.svg)
![下载](https://img.shields.io/npm/dm/iobroker.mihome-cloud.svg)
![安装数量](https://iobroker.live/badges/mihome-cloud-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/mihome-cloud-stable.svg)
![NPM](https://nodei.co/npm/iobroker.mihome-cloud.png?downloads=true)

# IoBroker.mihome-cloud
**测试：** ![测试与发布](https://github.com/TA2k/ioBroker.mihome-cloud/workflows/Test%20and%20Release/badge.svg)

## Mihome-cloud ioBroker 适配器
适用于所有米家云设备的适配器。连接小米云API，提供您米家账号中所有注册设备的状态、控制和场景执行功能。

**此适配器使用 Sentry 库自动向开发者报告异常和代码错误。** 更多详情以及如何禁用错误报告，请参阅 [Sentry插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！Sentry 报告功能从 js-controller 5.0 开始使用。

＃＃ 要求
- Node.js 版本 >= 22
- js-controller >= 6.0.11
- 管理员版本 >= 7.6.20

＃＃ 配置
您可以在适配器设置中配置：

| 设置 | 描述 |
| ------------------- | --------------------------------------------------------------------------------------------------------- |
| **地区** | 选择与您的米家 App 相匹配的小米云地区（德国、中国、俄罗斯、台湾、新加坡、美国） |
| **更新间隔** | 通过小米云 API 轮询设备状态更新的间隔时间（以分钟为单位，管理界面中最小值为 1 分钟） |
| **阻止额外的运行时登录尝试** | 如果启用此功能，则在初始启动尝试之后，运行时不会再进行任何额外的自动登录尝试。 |

＃＃ 登录
该适配器使用**基于 URL 的登录**（适配器设置中不需要用户名/密码）。

1. 在适配器设置中配置**区域**、**更新间隔**和（可选）**阻止额外的运行时登录尝试**，然后保存。
2. 启动适配器。
3. 如果没有有效的持久会话，适配器将创建一个**登录 URL**，并将其公开在两个地方：
- 作为适配器日志中的警告
- 作为状态 `mihome-cloud.0.auth.loginUrl`
4. 在浏览器中打开网址，并使用小米账号登录。
5. 适配器自动检测到登录成功并连接。

当会话在服务器端过期时，适配器会清除无效会话并切换到重新认证状态（`mihome-cloud.0.auth.status = reauth_required`）。

- **启动行为**：如果在适配器启动时不存在有效的会话，则会触发一次登录尝试（登录 URL 生成）。
- **运行时行为**：身份验证失败/会话过期后，将安排自动重新登录尝试。
- **可选运行时阻止**：如果启用**阻止额外的运行时登录尝试**，则在运行时不会启动进一步的自动登录尝试。

会话保存在 `auth.session` 中，并且在适配器重启后仍然有效时可以重新使用。

## 对象树
启动并登录后，适配器会创建以下对象结构：

### `mihome-cloud.0.info.connection`
小米云会话的连接指示器（`true`/`false`）。

### `mihome-cloud.0.auth.*`
身份验证运行时和会话状态：

- `auth.status` - 当前身份验证状态（例如 `connected`、`qr_login_pending`、`reauth_required`、`cooldown_wait`）
- `auth.loginUrl` - 当前小米浏览器登录使用的登录 URL
- `auth.session` - 用于会话恢复的持久化 cookie/会话 JSON

每个设备，适配器都会创建：

如果小米账号或配置的地区发生更改，旧的设备对象将被删除，并为当前账号/地区重新创建。

### `mihome-cloud.0.<device-id>.general`
设备一般信息（型号、名称、固件版本等）。

### `mihome-cloud.0.<device-id>.status`
MIoT 规范属性中的只读状态（按配置的更新间隔轮询）。

根据模型/规范解析，事件指示器状态可能存在，但此适配器中目前未激活云事件订阅。

### `mihome-cloud.0.<device-id>.remote`
可写入的MIoT规范属性和操作。

- 可写属性通过 MIoT `prop/set` 发送
- 操作通过 MIoT `action` 发送
- 带有输入参数的操作需要状态值中包含 JSON 输入。

命令发出后，适配器会自动刷新 MIoT 规范和自定义状态（真空状态更新通过正常的轮询周期继续）。

### `mihome-cloud.0.<device-id>.custom`
来自内部 `configDes` 映射的模型特定状态（例如真空度规，如 `clean_area`、`clean_time`、`battery`）。

### `mihome-cloud.0.<device-id>.remotePlugins`
从小米插件包中提取的其他可写命令（尽力而为，取决于插件/型号）。

### `mihome-cloud.0.scenes`
从您的米家账号设置智能场景/自动化。将场景状态设置为`true`即可执行。

## 示例：机器人吸尘器房间清洁
1. 查找房间 ID：

`mihome-cloud.0.<id>.remote.get-map-room-list` – 需要 `[cur-map-id]` 作为输入。

您可以从 `mihome-cloud.0.<id>.status.cur-map-id` 获取当前地图 ID，或者通过以下方式查询地图列表：

`mihome-cloud.0.<id>.remote.get-map-list`（无需输入）→ 结果显示在 `mihome-cloud.0.<id>.status.map-list` 下方

2. 设置地图 ID 并查询房间：

`mihome-cloud.0.<id>.remote.get-map-room-list` 输入 `[<map-id>]`

→ 结果：`mihome-cloud.0.<id>.status.room-id-name-list`：`[{"name":"room1","id":10}]`

3. 开始打扫房间：

`mihome-cloud.0.<id>.remote.start-room-sweep` 格式为 `["10", "11", "12", "13"]`

   或者

`mihome-cloud.0.<id>.remote.set-room-clean` 格式为 `["10",0,1]`

## 故障排除
- **“DB 关闭”警告**：无害 - 现在通过干净的终止标志在适配器关闭期间主动防止这些警告。
- **“ECONNRESET”错误**：小米云网络暂时中断。适配器会在下一个轮询间隔自动重试。
- **“-106 设备网络不可达”**：设备（例如吸尘器）当前处于离线状态、已断开 Wi-Fi 连接或已关闭电源。适配器会将此信息记录为调试信息并继续尝试连接。
- **401/400 身份验证错误**：适配器会清除无效会话并进入重新身份验证模式。如果启用了自动登录尝试，则会通过日志警告和 `auth.loginUrl` 提供新的登录 URL。
- **会话过期后不再提供新的登录 URL**：选中“阻止额外的运行时登录尝试”。如果启用此选项，运行时自动重试将被禁止。
- **账户/区域更改后设备树重建**：预期行为。适配器会移除旧的设备对象，并为当前账户/区域重新创建它们。
- **设备无属性**：某些纯 Zigbee/蓝牙传感器设备（例如 `lumi.sensor_switch.v2`）不会通过云 API 公开其状态。请考虑改用本地 Zigbee 适配器。

## 讨论和提问
<https://forum.iobroker.net/topic/59636/test-adapter-mihome-cloud>

## Changelog
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now

### 1.0.6 (2026-04-29)
- (lubepi) **NEW**: Added admin option to block additional automatic runtime login attempts to reduce log spam
- (lubepi) **ENHANCED**: Exposed Xiaomi login URL in `auth.loginUrl` for automation and easier re-authentication handling
- (lubepi) **ENHANCED**: Updated README
- (lubepi) **FIXED**: Suppress "DB closed" warnings during adapter shutdown and restart by implementing a clean shutdown flag
- (lubepi) **ENHANCED**: Optimized error handling to prevent uncontrolled adapter crashes from expired sessions and missing null guards

### 1.0.5 (2026-04-01)
- (lubepi) improve 401 authentication error handling and session reset
- (lubepi) validate and limit user configurable update interval
- (lubepi) update dependencies to address vulnerabilities

### 1.0.4 (2026-03-14)
- (lubepi) Maintenance update: Consolidated changelog and fixed repository metadata for better standards compliance

### 1.0.3 (2026-03-14)
- (lubepi) Improved error handling for network interruptions
- (lubepi) Migration to external i18n files and Node.js 20+ requirement
- (lubepi) Updated dependencies and fixed known vulnerabilities
- (lubepi) Added missing translations (uk, ru, pt, nl, fr, it, es, pl, zh-cn)
- (lubepi) Migration to ESLint flat config and release-script support

### 0.2.2

- (lubepi) Minor improvements with device handling

### 0.2.1

- (lubepi) Fix login. Check Log after starting Adapter

### 0.2.0

- (lubepi) Fix login

### 0.0.5

- (TA2k) Bugfixes

### 0.0.4

- (TA2k) initial release

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2023-2026 TA2k <tombox2020@gmail.com>

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