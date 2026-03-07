---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.web/README.md
title: ioBroker.web
hash: vQHzTP8mzOS9nXXWF81cYazOfJVkP7pz+Z+g89oG6vo=
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

例如，用户可以启用一个特殊的代理适配器，从而访问同一台网络服务器上的其他设备（例如网络摄像头）。

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

## Changelog
### 8.0.0 (2026-02-18)
* (@GermanBluefox) Updated packages. Minimal Node.js version is now 20.0.0
* (@GermanBluefox) Removed binary states
* (@GermanBluefox) Added possibility to write values via `/state/` endpoint with `POST`

### 7.0.9 (2025-03-28)
* (@GermanBluefox) Corrected the loading of the material adapter

### 7.0.8 (2025-03-18)
* (@GermanBluefox) Added settings for custom CORS headers
* (@GermanBluefox) Added the possibility to show admin instances on the web welcome page
* (@GermanBluefox) Implemented the new index page

### 7.0.7 (2025-03-15)
* (@GermanBluefox) Trying to catch an error by the web extension

### 7.0.6 (2025-03-09)
* (@GermanBluefox) Corrected the login for iobroker.visu app
* (@GermanBluefox) Corrected load of TypeScript Web extensions

### 7.0.4 (2025-03-04)
* (@GermanBluefox) Corrected the login page
* (@GermanBluefox) Removed the frequent debug output

### 7.0.3 (2025-03-03)
* (@GermanBluefox) Corrected the problem with the user rights

### 7.0.1 (2025-03-02)
* (@GermanBluefox) [Breaking change] Removed simple-api as it could be connected as web-extension
* (@GermanBluefox) updated packages
* (@GermanBluefox) removed gulp in a build process
* (@GermanBluefox) Migrated GUI to vite
* (@GermanBluefox) Rewritten in TypeScript
* (@GermanBluefox) Added OAuth2 support
* (@GermanBluefox) Added new 404 and the directory list pages

### 6.3.1 (2024-09-23)
* (@foxriver76) added new admin icon (svg)

### 6.3.0 (2024-06-27)
* (bluefox) Corrected call of getObjectView with null parameter
* (bluefox) updated packages
* (bluefox) GUI was migrated to a non-style framework

### 6.2.6 (2024-05-25)
* (bluefox) Preparations for a custom loading background
* (bluefox) updated packages

### 6.2.5 (2024-02-22)
* (bluefox) Just some packages were updates

### 6.2.4 (2024-02-17)
* (klein0r) Extensions may block the web instance
* (klein0r) Fixed directory listing

### 6.2.3 (2023-12-18)
* (foxriver76) updated the websocket library to increase the maximum file size from 100 MB to 500 MB

### 6.2.2 (2023-12-14)
* (joltcoke) Corrected the crash if authentication is enabled

### 6.2.1 (2023-12-04)
* (bluefox) Added the user access list option

### 6.1.10 (2023-10-16)
* (bluefox) Corrected the start screen

### 6.1.7 (2023-10-16)
* (bluefox) Added the public accessibility check

### 6.1.6 (2023-10-13)
* (bluefox) Corrected adapter termination if the alias has no target
* (bluefox) Corrected socket.io connection

### 6.1.4 (2023-10-08)
* (foxriver76) upgrade socketio and ws dependencies to fix a vis subscribe problem

### 6.1.3 (2023-09-28)
* (bluefox) upgraded socketio and ws dependencies to correct the error by unsubscribing on client disconnect

### 6.1.2 (2023-09-14)
* (foxriver76) upgraded socketio and ws dependencies

### 6.1.1 (2023-09-05)
* (mcm1957) Added missing node16 requirement

### 6.1.0 (2023-08-01)
* (bluefox) Added the subscribing on the specific instance messages

### 6.0.3 (2023-07-27)
* (bluefox) Updated packages
* (bluefox) Implemented the possibility to view folder content

### 6.0.1 (2023-03-20)
* (bluefox) Removed letsencrypt handling from web adapter

### 5.5.3 (2023-03-17)
* (bluefox) Increased max size of the uploaded file via socket.io to 200MB (from 10MB)

### 5.5.2 (2023-03-03)
* (bluefox) Allowed deletion of fullcalendar objects

### 5.5.1 (2023-02-25)
* (bluefox) Allowed reading projects of vis-2-beta

### 5.5.0 (2023-02-15)
* (bluefox) Added special end-points for app authentication

### 5.4.3 (2023-01-29)
* (bluefox) Corrected error with `publishFileAll` (for future use)

### 5.4.1 (2022-12-23)
* (bluefox) Corrected GUI error

### 5.4.0 (2022-12-22)
* (bluefox) Used a new version of socket classes

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