---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.web/README.md
title: ioBroker.web
hash: o5xc+g7/g6wP3/8ROBkVgNHLEDKIK1YPwBJkDMzpcGk=
---
![标识](../../../en/adapterref/iobroker.web/admin/web.png)

![安装数量](http://iobroker.live/badges/web-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.web.svg)
![下载](https://img.shields.io/npm/dm/iobroker.web.svg)

#ioBroker.web
![测试和发布](https://github.com/ioBroker/ioBroker.web/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/web/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

基于 Node.js 的 Web 服务器，用于从 ioBroker DB 读取文件。

**此适配器使用哨兵库自动向开发人员报告异常和代码错误。**有关更多详细信息和如何禁用错误报告的信息，请参阅[哨兵插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用哨兵报告。

## 调整 Web 套接字
在某些网络套接字客户端上，通信存在性能问题。
有时这个问题是由于 socket.io 通信在长轮询机制上的回退。
您可以设置选项 *Force Web-Sockets* 以强制仅使用网络套接字传输。

## 让我们加密证书
阅读 [这里](https://github.com/ioBroker/ioBroker.admin#lets-encrypt-certificates)

## 扩展
Web 驱动程序支持扩展。
扩展是 URL 处理程序，如果出现这样的 URL 请求，它将被调用。
这些扩展看起来像普通的适配器，但它们没有运行进程，将由 Web 服务器调用。

例如。用户可以激活特殊的代理适配器并访问同一网络服务器中的其他设备（如网络摄像头）。
需要让所有的服务都在一个网络服务器下可用。

Web 扩展可以而且应该支持 `unload` 函数，如果卸载操作需要一些时间，该函数可以返回 `promise`。

您可以阅读有关网络扩展的更多信息 [这里](WEB-EXTENSIONS-HOWTO.md)。

## 暴力破解保护
如果启用身份验证并且用户在一分钟内输入了 5 次无效密码，他必须等待至少一分钟直到下一次尝试。
第 15 次错误尝试后，用户必须等待 1 小时。

##“保持登录”选项
如果选择此选项，用户将保持登录状态一个月。
否则，用户将在配置的“登录超时”期间保持登录状态。

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

图片必须写在 javascript 适配器中，例如：

```
createState('javascript.0.picture.png', {type: 'file', name: 'Picture'}, () => {
    setBinaryState('javascript.0.picture.png', fs.readFileSync('/tmp/picture.png'));
});
```

##“基本身份验证”选项
通过发送带有 `WWW-Authenticate` 标头的 `401` Unauthorized 允许通过基本身份验证登录。
这可用于 *FullyBrowser* 等应用程序。一旦输入错误的凭据，您将被重定向到登录页面。

＃＃ 高级选项
### 默认重定向
如果通过打开 web 端口 im 浏览器，不应显示 APP 选择，而是显示某些特定应用程序，可以在此处提供路径（例如 `/vis/`），因此该路径将自动打开。

<!-- 下一个版本的占位符（在行首）：

### **正在进行中** -->

## Changelog
### 5.5.2 (2023-03-03)
* (bluefox) Allowed deletion of fullcalendar objects

### 5.5.1 (2023-02-25)
* (bluefox) Allowed to read projects of vis-2-beta

### 5.5.0 (2023-02-15)
* (bluefox) Added special end-points for app authentication

### 5.4.3 (2023-01-29)
* (bluefox) Corrected error with `publishFileAll` (for future use)

### 5.4.1 (2022-12-23)
* (bluefox) Corrected GUI error

### 5.4.0 (2022-12-22)
* (bluefox) Used new version of socket classes

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