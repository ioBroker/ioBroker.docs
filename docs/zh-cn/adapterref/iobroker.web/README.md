---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.web/README.md
title: ioBroker.web
hash: o2CrQOuwEBgQrUCXNjJa36BOvwjgITQON2IfS/Jqeuw=
---
![标识](../../../en/adapterref/iobroker.web/admin/web.png)

![安装数量](http://iobroker.live/badges/web-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.web.svg)
![下载](https://img.shields.io/npm/dm/iobroker.web.svg)

# IoBroker.web
![测试与发布](https://github.com/ioBroker/ioBroker.web/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/web/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

基于Node.js和express的Web服务器，用于从ioBroker数据库读取文件。

**此适配器使用 Sentry 库自动向开发者报告异常和代码错误。** 更多详情以及如何禁用错误报告，请参阅 [Sentry插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！Sentry 报告功能从 js-controller 3.0 开始使用。

## 调整 WebSocket
某些 WebSocket 客户端存在通信性能问题。

有时，此问题是由于 socket.io 通信回退到长轮询机制所致。

您可以设置“强制使用 WebSocket”选项，强制仅使用 WebSocket 传输。

## Let's Encrypt 证书
阅读 [这里](https://github.com/ioBroker/ioBroker.admin#lets-encrypt-certificates)

## 扩展
WebDriver 支持扩展。

扩展是 URL 处理程序，当出现 URL 请求时会被调用。

扩展程序看起来与普通适配器类似，但它们没有运行进程，而是由 Web 服务器调用。

例如，用户可以激活一个特殊的代理适配器，从而访问同一台网络服务器上的其他设备（例如网络摄像头）。

必须确保所有服务都在同一台网络服务器上可用。

Web 扩展可以而且应该支持 `unload` 函数，如果卸载操作需要一些时间，该函数可以返回 `promise`。

您可以阅读更多关于网络扩展的信息 [这里](WEB-EXTENSIONS-HOWTO.md)。

## 暴力防御
如果启用了身份验证，用户在一分钟内输入错误密码 5 次，则必须至少等待一分钟才能再次尝试。

如果用户连续输入错误密码 15 次，则必须等待一小时。

## “保持登录状态”选项
如果选择此选项，用户将保持登录状态一个月。

否则，用户将保持登录状态直至达到配置的“登录超时”时间。

## 访问状态值
您可以通过 HTTP GET 请求访问正常状态值。

```
http://IP:8082/state/system.adapter.web.0.alive =>
{"val":true,"ack":true,"ts":1606831924559,"q":0,"from":"system.adapter.web.0","lc":1606777539894}
```

或访问类似以下的文件：

```
http://IP:8082/vis-2.0/javascript.picture.png =>
[IMAGE]
```

从 8.0.0 版本开始，您还可以通过 HTTP POST 请求写入值：

```
[POST] http://IP:8082/state/javascript.0.myVariable => true
```

或者以带有附加参数的 JSON 对象形式表示：

```
[POST] http://IP:8082/state/javascript.0.myVariable =>
{"val": true, "ack": false}
```

注意：要使用此功能，必须在 Web 适配器设置中禁用“禁用状态和套接字信息”选项。

## 访问对象
您可以通过 HTTP GET 请求读取对象（包括带通配符的模式）。响应**始终是 JSON 数组**，因为模式可能匹配多个对象。

默认情况下，每个返回的对象仅包含 `_id`、`type` 和 `common`。使用 `extended` 和/或 `native` 查询标志来请求更多信息。

当使用 `depth` 查询并且匹配对象位于比请求的级别更深的层级时，将返回一个位于该层级的合成占位符：

```json
{ "_id": "0_userdata.0", "type": "virtual" }
```

这样，即使中间路径本身没有实际的 ioBroker 对象，树状浏览器也能看到该路径下存在内容。虚拟对象会特意省略 `common` 以保持有效负载较小——显示名称可以从 `_id` 派生而来。同一 ID 下的实际对象始终优先于其虚拟占位符。

```
http://IP:8082/object/0_userdata.0.branch.* =>
[ { "_id": "0_userdata.0.branch.a", "type": "state", "common": { ... } }, ... ]
```

支持的查询参数：

| 参数 | 描述 |
|--------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type` | 按对象类型筛选（例如 `state`、`channel`、`device`、`folder`、`enum`、`instance` 等）。**省略时默认为 `state`**。传递 `all` 可查询所有类型的对象。 |
| `depth` | 对象 ID 中以点分隔的部分的最大数量。例如，要仅获取 `0_userdata.0.branch`（包含 3 个部分）的直接子项，请请求 `/object/0_userdata.0.branch.*?depth=4`。`depth=1` 会被静默限制为 `depth=2`（ioBroker 对象存在于 1 级或 3 级及以上——根级树状浏览器实际需要的是像 `0_userdata.0` 这样的 2 级“实例”条目）。出于同样的原因，任何实际的单段对象都会从响应中丢弃。 |
| `extended` | 传递 `?extended` 或 `?extended=true` 以额外包含系统属性，例如 `acl`、`from`、`ts`、`user`、`enums`、`_rev`。 |
| `native` | 传递 `?native` 或 `?native=true` 以额外包含每个对象的 `native` 部分。 |
| `system` | 默认情况下，`system.*` 和 `script.*` 下的对象是**隐藏的**。传递 `?system` 或 `?system=true` 以包含它们。 |
| `system` | 默认情况下，`system.*` 和 `script.*` 下的对象是**隐藏的**。传递 `?system` 或 `?system=true` 参数可以显示它们。 |

例如：

```
[GET] http://IP:8082/object/0_userdata.0.branch.*?depth=4&type=all
[GET] http://IP:8082/object/0_userdata.0.*?type=state
[GET] http://IP:8082/object/0_userdata.0.*?type=state&commonType=boolean
[GET] http://IP:8082/object/system.adapter.web.0?native=true
[GET] http://IP:8082/object/system.adapter.web.0?extended=true&native=true
[GET] http://IP:8082/object/system.adapter.web.0
```

注意：要使用此功能，必须在 Web 适配器设置中禁用“禁用对象传递”选项。

## “基本身份验证”选项
允许通过发送带有 `WWW-Authenticate` 标头的 `401` Unauthorized 信息，使用基本身份验证进行登录。

这可用于类似 *FullyBrowser* 的应用程序。如果输入错误的凭据一次，您将被重定向到登录页面。

用户列表
您可以定义可以访问Web服务器的用户列表。您可以更改已登录用户的访问权限。

如果用户不在列表中，则无法访问 Web 服务器。

更简单的方法是为每个对象和每个状态设置特定用户的访问权限。

高级选项
### 默认重定向
如果通过浏览器打开网页端口不应该显示应用程序选择，而是显示某个特定的应用程序，则可以在此处提供路径（例如 `/vis/`），这样该路径将自动打开。

## OAuth2 身份验证
Web适配器支持OAuth2身份验证。

要获取令牌，用户必须调用以下 URL：

```
http://ip:8082//oauth/token?grant_type=password&username=<user>&password=<password>&client_id=ioBroker&stayloggedin=<false/true>
```

`stayloggedin=true` 表示令牌将存储在浏览器中，并将用于后续请求，并且是可选的。

答案是：

```json
{
    "access_token": "21f89e3eee32d3af08a71c1cc44ec72e0e3014a9",
    "expires_in": "2025-02-23T11:39:32.208Z",
    "refresh_token": "66d35faa5d53ca8242cfe57367210e76b7ffded7",
    "refresh_token_expires_in": "2025-03-25T10:39:32.208Z",
    "token_type": "Bearer"
}
```

更多信息请参见：https://github.com/ioBroker/webserver?tab=readme-ov-file#oauth2-support

<!-- 下一版本的占位符（位于行首）：

### **正在进行中** -->
### 8.2.0 (2026-05-21)
* (@GermanBluefox) 新增了 `/object/<ID>` GET 端点，支持 `type`、`commonType`、`depth`、`extended`、`native` 和 `system` 查询参数，用于读取对象（支持通配符）。默认情况下，仅返回 `_id`、`type` 和 `common`，`type` 默认为 `state`，`system.*` / `script.*` 下的对象会被隐藏。使用 `depth` 参数时，更深层的匹配会生成合成的 `type: "virtual"` 占位符，以便树状浏览器能够看到其下方存在的内容。
* (@GermanBluefox) 添加了“禁用对象传递”设置，用于启用/禁用“/object/<ID>”端点

### 8.1.0 (2026-04-13)
* (@GermanBluefox) 已更新软件包。
* (@GermanBluefox) 修正了潜在错误

### 8.0.0 (2026-02-18)
* (@GermanBluefox) 已更新软件包。最低 Node.js 版本现为 20.0.0
* (@GermanBluefox) 移除二进制状态
* (@GermanBluefox) 添加了通过 `/state/` 端点使用 `POST` 发送值的功能

### 7.0.9 (2025-03-28)
* (@GermanBluefox) 修正了材质适配器的加载问题

### 7.0.8 (2025-03-18)
* (@GermanBluefox) 添加了自定义 CORS 标头的设置
* (@GermanBluefox) 添加了在网页欢迎页面上显示管理员实例的功能
* (@GermanBluefox) 实现了新的索引页面

### 7.0.7 (2025-03-15)
* (@GermanBluefox) 尝试通过 Web 扩展程序捕获错误

### 7.0.6 (2025-03-09)
* (@GermanBluefox) 已更正 iobroker.visu 应用的登录信息
* (@GermanBluefox) 已修正 TypeScript Web 扩展的加载问题。

### 7.0.4 (2025-03-04)
* (@GermanBluefox) 已修正登录页面
* (@GermanBluefox) 移除了频繁的调试输出

### 7.0.3 (2025-03-03)
* (@GermanBluefox) 已修复用户权限问题

### 7.0.1 (2025-03-02)
* (@GermanBluefox) [重大变更] 移除了 simple-api，因为它可能被连接为 Web 扩展。
* (@GermanBluefox) 更新了软件包
* (@GermanBluefox) 在构建过程中移除了 Gulp
* (@GermanBluefox) 将 GUI 迁移到 vite
* (@GermanBluefox) 使用 TypeScript 重写
* (@GermanBluefox) 添加了 OAuth2 支持
* (@GermanBluefox) 添加了新的 404 页面和目录列表页面

### 6.3.1 (2024-09-23)
* (@foxriver76) 添加了新的管理员图标（svg）

### 6.3.0 (2024-06-27)
* (bluefox) 修正了带有空参数的 getObjectView 调用
* (bluefox) 更新软件包
* (bluefox) GUI 已迁移到非样式框架

### 6.2.6 (2024-05-25)
* (bluefox) 自定义加载背景的准备工作
* (bluefox) 更新软件包

### 6.2.5 (2024-02-22)
* (bluefox) 仅部分软件包已更新

### 6.2.4 (2024-02-17)
* (klein0r) 扩展程序可能会阻止 Web 实例
* (klein0r) 修复了目录列表

### 6.2.3 (2023-12-18)
* (foxriver76) 更新了 WebSocket 库，将最大文件大小从 100 MB 增加到 500 MB

### 6.2.2 (2023-12-14)
* (joltcoke) 修复了启用身份验证时发生的崩溃问题

### 6.2.1 (2023-12-04)
* (bluefox) 添加了用户访问列表选项

### 6.1.10 (2023-10-16)
* (bluefox) 修正了开始屏幕

### 6.1.7 (2023-10-16)
* (bluefox) 添加了公共可访问性检查

### 6.1.6 (2023-10-13)
* (bluefox) 修正了别名没有目标时的适配器终止问题
* (bluefox) 已修正 socket.io 连接

### 6.1.4 (2023-10-08)
* (foxriver76) 升级 socketio 和 ws 依赖项以修复 vis 订阅问题

### 6.1.3 (2023-09-28)
* (bluefox) 升级了 socketio 和 ws 依赖项，通过在客户端断开连接时取消订阅来修复错误

### 6.1.2 (2023-09-14)
* (foxriver76) 升级了 socketio 和 ws 依赖项

### 6.1.1 (2023-09-05)
* (mcm1957) 添加了缺失的 node16 要求

### 6.1.0 (2023-08-01)
* (bluefox) 添加了对特定实例消息的订阅

### 6.0.3 (2023-07-27)
* (bluefox) 更新软件包
* (bluefox) 实现了查看文件夹内容的功能

### 6.0.1 (2023-03-20)
* (bluefox) 从 Web 适配器中移除了 Let's Encrypt 处理

### 5.5.3 (2023-03-17)
* (bluefox) 通过 socket.io 上传文件的最大大小从 10MB 增加到 200MB

### 5.5.2 (2023-03-03)
* (bluefox) 允许删除 fullcalendar 对象

### 5.5.1 (2023-02-25)
* (bluefox) 允许阅读 vis-2-beta 的项目

### 5.5.0 (2023-02-15)
* (bluefox) 为应用程序身份验证添加了特殊端点

### 5.4.3 (2023-01-29)
* (bluefox) 已修正 `publishFileAll` 的错误（供将来使用）

### 5.4.1 (2022-12-23)
* (bluefox) 已修正 GUI 错误

### 5.4.0 (2022-12-22)
* (bluefox) 使用了新版本的套接字类

## License
The MIT License (MIT)

Copyright (c) 2014-2026 Bluefox <dogafox@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.