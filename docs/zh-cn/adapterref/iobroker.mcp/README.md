---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.mcp/README.md
title: ioBroker.mcp
hash: biPH4rPRb+GHsloLOCfhsQ6SiuWpblvywj7w39BIzOU=
---
<img src="admin/mcp.png" alt="ioBroker.mcp" width="200"/>

# IoBroker.mcp
ioBroker 的 MCP 服务器

＃＃ 描述
此适配器将 ioBroker 公开为 [MCP（模型上下文协议）](https://modelcontextprotocol.io) 服务器，以便支持 MCP 的客户端（例如 Claude Desktop）可以通过一套定义完善的工具读取和控制您的安装。

＃＃ 特征
- 通过 **Streamable HTTP** 传输方式的 MCP 服务器（`/mcp` 端点）
- 可配置的 HTTP/HTTPS Web 服务器
- 可配置端口和绑定地址
- 可选身份验证
- 可选的 SSL/TLS 支持
- 使用网络诊断（ICMP ping / TCP 探测）排查适配器连接故障
- 适配器**存储库**搜索，以推荐可安装的适配器

## 操作模式
该适配器可以通过两种方式运行：

1. **独立运行**（默认）——它会在配置的端口上启动自己的 Web 服务器。MCP 端点是

`http(s)://<host>:<port>/mcp`。

2. **Web 扩展** – 它运行在现有的 [`web`](https://github.com/ioBroker/ioBroker.web) 适配器中

实例并共享其 Web 服务器（端口、身份验证、SSL）。在管理配置中选择目标 Web 实例（“扩展 Web 适配器”）。然后，MCP 端点将在 Web 适配器下提供服务，例如：

`http(s)://<host>:8082/mcp/`。

选择 Web 实例时，独立服务器设置（端口、绑定地址、身份验证、SSL）将被隐藏，因为它们是从选定的 `web` 实例继承的。

＃＃ 配置
可以通过 ioBroker 管理界面使用 JSONConfig 配置适配器：

### 服务器配置
- **扩展 WEB 适配器**：选择一个 `web` 实例作为其扩展运行。留空则独立运行。
- **端口**：Web 服务器监听的端口（默认值：8093）——仅限独立模式
- **绑定地址**：服务器绑定的 IP 地址（所有接口均为 0.0.0.0）——仅限独立模式

＃＃＃ 验证
- **启用身份验证**：为 Web 服务器启用 ioBroker 用户身份验证
- **默认用户**：每个 MCP 请求运行所用权限的 ioBroker 用户（默认值：`admin`）。

所有工具执行的对象/状态读取和写入操作均以该用户的名义执行，因此会强制执行该用户的访问控制列表 (ACL)。例如，纯文本名称 `operator` 会自动扩展为 `system.user.operator`。

当作为 Web 扩展运行时，如果未在此处设置用户，则使用主机 `web` 实例的默认用户。

### 权限
- **允许设置状态**：允许 MCP 客户端写入状态值（`set_state` 和 `set_states` 工具）。

默认值：**开启**。

- **允许对象/文件更改**：允许 MCP 客户端创建/修改/删除对象和文件（`set_object`，

`delete_object`、`create_state`、`create_scene`、`write_file`、`delete_file`、`rename_file` 和 `mkdir` 工具）。默认值：**关闭**。关闭后，这些工具将完全隐藏。

### SSL/TLS 配置
- **启用 HTTPS**：启用 HTTPS/SSL 以建立安全连接
- **公钥证书**：公钥证书文件的路径
- **私钥**：私钥文件的路径
- **链式证书**：链式证书文件的路径（可选）

## MCP 端点
MCP 服务器位于 `POST/GET/DELETE /mcp`，使用 Streamable HTTP 传输协议，并采用会话状态跟踪（通过 `Mcp-Session-Id` 标头跟踪）。请将您的 MCP 客户端指向：

- standalone: `http(s)://<host>:<port>/mcp`
- web 扩展名：`http(s)://<host>:<webPort>/mcp/`

### 可用工具
| 工具 | 描述 |
|-----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `get_states` | 获取一个或多个状态的当前值；ID 可以包含通配符（例如 `hue.0.*.brightness`） |
| `search_objects` | 按关键字搜索对象/状态（与 ID 和名称匹配）；可选对象过滤器 `type`、`role`、`room` 和源实例 `adapter` |
| `list_devices` | 按房间分组列出检测到的设备（使用 ioBroker 类型检测器显示带有命名控件的功能设备）；可选 `language` 和 `room` 过滤器 |
| `list_instances` | 列出适配器实例及其状态 |
| `list_adapters` | 列出已安装的适配器及其元数据（版本、标题、描述、关键字） |
| `search_adapter_repository` | 按关键字搜索 ioBroker 适配器**存储库**（所有*可安装*的适配器，而不仅仅是已安装的适配器）；可选的 `type` 类别、`onlyNotInstalled` 和 `language` 过滤器 — 用于推荐要为设备/服务安装的适配器 |
| `list_hosts` | 列出 ioBroker 主机及其状态 |
| `list_rooms` | 列出房间（`enum.rooms.*`），包含本地化名称和成员详细信息；可选 `language` 和 `withIcons` |
| `list_functions` | 列出具有本地化名称和成员详细信息的函数（`enum.functions.*`）；可选 `language` 和 `withIcons` |
| `history_query` | 查询历史值（需要历史适配器）；聚合：`raw`、`min`、`max`、`avg`、`sum`、`count`、`minmax`、`percentile`、`quantile`、`integral` |
| `read_file` | 从适配器文件存储读取文件（可选 base64 编码） |
| `list_files` | 列出适配器文件存储中的目录 |
| `file_exists` | 检查适配器文件存储中是否存在文件 |
| `get_logs` | 检索最近的 ioBroker 日志行；可选按 `level`（错误/警告/信息/调试）、来源 `adapter` 和开始时间 (`from_ts`) 进行筛选 |
| `write_log` | 向 ioBroker 日志写入消息 |
| `system_info` | 获取系统和 js 控制器信息 |
| `ping_host` | 诊断与网络设备的连接：向 `host` 发送 ICMP ping 请求，并可选择向 `port` 发送 TCP 连接请求 — 可用于调查适配器 `ETIMEDOUT`/连接错误 |
| `set_state` | 设置状态值（值强制转换为状态类型）— 需要 *允许设置状态* |
| `set_states` | 在一次调用中设置多个状态（用于场景/组操作，例如“所有灯都关掉”）— 需要 *允许设置状态* |
| `set_object` | 创建/更新对象（合并通用/原生对象）— 需要 *允许对象/文件更改* |
| `delete_object` | 删除对象，可选择删除所有子对象 — 需要启用 *允许对象/文件更改* |
| `create_state` | 创建一个新的状态对象，包含类型/角色/单位/最小值/最大值以及可选的初始值 — 需要 *允许对象/文件更改* |
| `create_scene` | 为 ioBroker `scenes` 适配器创建或更新场景（状态/值对一起应用）— 需要 *允许对象/文件更改* |
| `write_file` | 将文件写入适配器文件存储 — 需要 *允许对象/文件更改* |
| `delete_file` | 从适配器文件存储中删除文件 — 需要 *允许对象/文件更改* |
| `rename_file` | 在同一适配器文件存储中重命名/移动文件 — 需要 *允许对象/文件更改* |
| `mkdir` | 在适配器文件存储中创建目录 — 需要 *允许对象/文件更改* |
| `mkdir` | 在适配器文件存储中创建目录 — 需要 *允许对象/文件更改* |

所有对象/状态访问均以配置的**默认用户**的权限运行。写入工具仅在启用其相应的权限选项时才会注册。

### 资源与实时更新 (SSE)
状态和对象也以 MCP **资源** 的形式，使用规范的 ioBroker URI 方案公开，以便客户端可以读取和**订阅**它们。服务器通过 Streamable HTTP SSE 流（`notifications/resources/updated`）推送更改。

- 状态：`iobstate://<id>`（例如 `iobstate://javascript.0.temperature`）– `resources/read` 返回

`{ id, val, ack, ts, lc, q }`。

- 对象：`iobobject://<id>`（例如 `iobobject://system.adapter.admin.0`）– `resources/read` 返回对象。
- 日志：`ioblog://all`（所有来源）或`ioblog://`<source> `（例如 `ioblog://admin.0`）– `resources/read`

返回最近的日志行（`{ source, logs: [{ ts, level, source, message }] }`）。订阅后即可为适配器启用日志转发；每条新的匹配行都会触发 `notifications/resources/updated`。

- `resources/subscribe` 订阅底层 ioBroker 的状态/对象/日志；每次更改时，客户端都会收到通知。

收到该 URI 的 `notifications/resources/updated` 并重新读取它。`resources/unsubscribe` 停止它。

订阅是按会话跟踪并进行引用计数的，因此无论有多少客户端/会话监视某个状态/对象，适配器都只会订阅一次，并在最后一个客户端/会话离开时取消订阅。

（文件使用相同的方案中的 `iobfile://<adapter>/<path>`；它们可通过 `read_file`/`write_file` 工具获取，而不是作为可订阅资源。）

### 健康终点（非 MCP）
- `GET /` - 服务器基本信息
- `GET /status` - 服务器状态、运行时间和活动会话数
- `GET /api/info` - 适配器信息

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.0.11 (2026-07-02)
* (@GermanBluefox) Default port was changed to 8011
* (@GermanBluefox) Corrected the issue with authentication

### 1.0.8 (2026-06-18)
* (@GermanBluefox) Used `@iobroker/mcp-server` package

### 1.0.5 (2026-06-17)
* (@GermanBluefox) Added debug for ICMP ping and TCP probe in `ping_host` tool

### 1.0.2 (2026-06-13)
* (@GermanBluefox) Some repo checker errors were fixed

### 1.0.0 (2026-06-12)
* (@GermanBluefox) Allowed node 18

### 0.3.1 (2026-06-11)
* (@GermanBluefox) Added `search_adapter_repository` tool to search the whole adapter repository (not only installed adapters)
* (@GermanBluefox) Added `ping_host` tool (ICMP ping + optional TCP probe) for network diagnostics

### 0.2.5 (2026-06-11)
* (@GermanBluefox) Supported direct import of MCP server

### 0.2.0 (2026-06-11)
* (@GermanBluefox) Many changes: see the previous changelog entry

### 0.1.5 (2026-06-11)
* (@GermanBluefox) Added wildcard support to `get_states` (e.g. `hue.0.*.brightness`)
* (@GermanBluefox) Added `set_states` for writing multiple states in one call (scenes/group actions)
* (@GermanBluefox) Added `delete_object` and `create_state` tools (gated by *Allow object/file changes*)
* (@GermanBluefox) Added `create_scene` tool that creates scenes for the ioBroker `scenes` adapter
* (@GermanBluefox) Added file management tools: `list_files`, `file_exists`, `delete_file`, `rename_file`, `mkdir`
* (@GermanBluefox) Added `list_adapters` to list installed adapters with metadata
* (@GermanBluefox) Extended `search_objects` with `type` and `adapter` filters; the keyword now also matches object names
* (@GermanBluefox) Extended `history_query` with the aggregations `count`, `minmax`, `percentile`, `quantile` and `integral`

### 0.1.4 (2026-05-28)
* (@GermanBluefox) Initial development

### 0.0.1 (2025-01-03)
* Initial release with basic web server functionality
*Configurable port, bind address, authentication, and SSL

## License

MIT License

Copyright (c) 2025-2026 ioBroker

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