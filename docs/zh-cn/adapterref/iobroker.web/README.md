---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.web/README.md
title: ioBroker.web
hash: dOQpPOEcGT/VCyUB2KTqeOreQjN8EXpe3bmjWcwWxfk=
---
![标识](../../../en/adapterref/iobroker.web/admin/web.png)

![安装数量](http://iobroker.live/badges/web-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.web.svg)
![下载](https://img.shields.io/npm/dm/iobroker.web.svg)

# IoBroker.web
![测试与发布](https://github.com/ioBroker/ioBroker.web/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/web/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

基于 Node.js 和 Express 的 Web 服务器从 ioBroker DB 读取文件。

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!从 js-controller 3.0 开始使用 Sentry 报告。

## 调整 Web 套接字
在某些 Web 套接字客户端上，存在通信性能问题。
有时，此问题是由于 socket.io 通信在长轮询机制上的回退造成的。
您可以设置选项*强制 Web 套接字*以强制仅使用 Web 套接字传输。

## 让我们加密证书
阅读[这里](https://github.com/ioBroker/ioBroker.admin#lets-encrypt-certificates)

## 扩展
Web 驱动程序支持扩展。
该扩展是 URL 处理程序，如果出现此类 URL 请求，将调用该扩展。
这些扩展看起来像普通的适配器，但它们没有运行进程，将由 Web 服务器调用。

例如，用户可以激活特殊的代理适配器并访问同一网络服务器中的其他设备（例如网络摄像头）。
需要让所有服务在一台Web服务器下可用。

Web 扩展可以而且应该支持 `unload` 函数，如果卸载操作需要一些时间，该函数可能会返回 `promise`。

您可以阅读有关网络扩展的更多信息[这里](WEB-EXTENSIONS-HOWTO.md)。

## 暴力保护
如果启用身份验证并且用户在一分钟内输入 5 次无效密码，则他必须至少等待一分钟才能下次尝试。
第 15 次错误尝试后，用户必须等待 1 小时。

## “保持登录状态”选项
如果选择此选项，用户将保持登录状态一个月。
如果没有，用户将在配置的“登录超时”内保持登录状态。

## 访问状态的值
您可以通过 HTTP get 请求访问正常状态值和二进制状态值。

```
http://IP:8082/state/system.adapter.web.0.alive =>
{"val":true,"ack":true,"ts":1606831924559,"q":0,"from":"system.adapter.web.0","lc":1606777539894}
```

或者

```
http://IP:8082/state/javascript.picture.png =>
[IMAGE]
```

图像必须在 javascript 适配器中编写，如下所示：

```
createState('javascript.0.picture.png', {type: 'file', name: 'Picture'}, () => {
    setBinaryState('javascript.0.picture.png', fs.readFileSync('/tmp/picture.png'));
});
```

##“基本身份验证”选项
通过发送带有 `WWW-Authenticate` 标头的 `401` 未经授权，允许通过基本身份验证登录。
这可用于 *FullyBrowser* 等应用程序。一旦输入错误的凭据，您将被重定向到登录页面。

＃＃ 高级选项
### 默认重定向
如果在浏览器中打开网络端口，则不应显示任何应用程序选择，但某些特定应用程序可以在此处提供路径（例如`/vis/`），因此该路径将自动打开。

<!-- 下一个版本的占位符（在行的开头）：

### **正在进行中** -->

## Changelog
### 6.0.2 (2023-07-07)
* (bluefox) Updated packages

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

Copyright (c) 2014-2023 Bluefox <dogafox@gmail.com>

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