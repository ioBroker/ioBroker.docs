---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.web/README.md
title: ioBroker.web
hash: 6NowZOFEYYXknCOlU02YrWap+8V3bm+CRGEhcgozaWg=
---
![标识](../../../en/adapterref/iobroker.web/admin/web.png)

![安装数量](http://iobroker.live/badges/web-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.web.svg)
![下载](https://img.shields.io/npm/dm/iobroker.web.svg)

# IoBroker.web
![测试与发布](https://github.com/ioBroker/ioBroker.web/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/web/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

基于Node.js的Web服务器，用于从ioBroker DB读取文件。

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用 Sentry 报告。

## 调整 Web-Sockets
在某些 Web 套接字客户端上，通信存在性能问题。
有时，此问题是由于长轮询机制上 socket.io 通信的回退造成的。
您可以设置选项 *强制 Web 套接字* 以强制仅使用 Web 套接字传输。

## 让我们加密证书
阅读[这里](https://github.com/ioBroker/ioBroker.admin#lets-encrypt-certificates)

## 扩展
Web 驱动程序支持扩展。
扩展是 URL 处理程序，如果出现此类 URL 请求，它将被调用。
扩展看起来像普通适配器，但它们没有运行进程，将由 Web 服务器调用。

例如，用户可以激活特殊的代理适配器并访问同一 Web 服务器中的其他设备（如网络摄像头）。
需要让所有服务都在一个 Web 服务器下可用。

Web 扩展可以并且应该支持`unload`函数，如果卸载操作需要一些时间，则可以返回`promise`。

您可以阅读有关网络扩展[这里](WEB-EXTENSIONS-HOWTO.md)的更多信息。

## 暴力破解保护
如果启用了身份验证，并且用户在一分钟内输入了 5 次无效密码，则他必须等待至少一分钟才能再次尝试。
第 15 次错误尝试后，用户必须等待 1 小时。

## “保持登录状态”选项
如果选择此选项，用户将保持登录状态一个月。
如果没有，用户将在配置的“登录超时”内保持登录状态。

## 访问状态的值
您可以通过 HTTP get 请求访问正常和二进制状态值。

```
http://IP:8082/state/system.adapter.web.0.alive =>
{"val":true,"ack":true,"ts":1606831924559,"q":0,"from":"system.adapter.web.0","lc":1606777539894}
```

或者

```
http://IP:8082/state/javascript.picture.png =>
[IMAGE]
```

图像必须在 javascript 适配器中像这样写入：

```js
createState('javascript.0.picture.png', {type: 'file', name: 'Picture'}, () => {
    setBinaryState('javascript.0.picture.png', fs.readFileSync('/tmp/picture.png'));
});
```

## “基本身份验证”选项
允许通过基本身份验证登录，方法是发送带有 `WWW-Authenticate` 标头的 `401` Unauthorized。
这可用于 *FullyBrowser* 等应用程序。一旦输入错误的凭据，您将被重定向到登录页面。

## 用户列表
您可以定义可以访问 Web 服务器的用户列表。您可以更改已登录用户的访问权限。

如果用户不在列表中，他就无法访问网络服务器。

为每个对象和每个状态设置特定用户的访问权限更加简单。

## 高级选项
### 默认重定向
如果通过打开 Web 端口 im 浏览器，不应显示 APP 选择，而是显示某些特定应用程序，则可以在此处提供路径（例如 `/vis/`），以便自动打开该路径。

<!-- 下一版本的占位符（在行首）：

### **正在进行中** -->

## Changelog
### **WORK IN PROGRESS**
* (@GermanBluefox) updated packages
* (@GermanBluefox) removed gulp in a build process
* (@GermanBluefox) Migrated GUI ti vite

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

Copyright (c) 2014-2025 Bluefox <dogafox@gmail.com>

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