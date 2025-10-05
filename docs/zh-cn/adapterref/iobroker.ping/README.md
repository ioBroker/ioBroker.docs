---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.ping/README.md
title: PING适配器
hash: Ik1WbI1tFqu04+qoinEQuD6k2cb0P2D71rgyUPQwaiU=
---
![标识](../../../en/adapterref/iobroker.ping/admin/ping.png)

![安装数量](http://iobroker.live/badges/ping-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.ping.svg)
![下载](https://img.shields.io/npm/dm/iobroker.ping.svg)

# PING 适配器
![测试和发布](https://github.com/ioBroker/ioBroker.ping/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/ping/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

## 对配置的 IP 地址进行 Ping。
在定义的时间间隔内对指定的 IP 地址执行 ping 操作并监控结果。

您还可以通过在 IP 地址后加上冒号指定端口号来监控 TCP 端口（例如，`192.168.1.1:80` 或 `google.com:443`）。这将检查端口是否可访问，而不是使用 ICMP ping。

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-Plugin 文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用 Sentry 报告。

## 从 javascript 适配器进行 Ping
您可以使用命令从 JavaScript 适配器 ping 任何 IP 地址：

```js
sendTo('ping.0', 'ping', '192.168.1.1', res => {
    console.log('Result: ' + JSON.stringify(res)); // Result: {"result": {"host": "192.168.1.1", "alive": true, "ms": 250}}
});
```

您还可以检查 TCP 端口：

```js
sendTo('ping.0', 'ping', '192.168.1.1:80', res => {
    console.log('Result: ' + JSON.stringify(res)); // Result: {"result": {"host": "192.168.1.1:80", "alive": true, "ms": 15}}
});
```

## 已知问题
- 如果无法 ping 通您的 Linux 客户端，请检查客户端上是否正确安装了“iputils-ping”。

- Linux 下的 `ping` 命令需要 root 权限。

您可以授予适配器以 root 身份执行 `ping` 命令的权限。

为此，您需要使用`sudo visudo`命令将以下行添加到`/etc/sudoers`文件：`iobroker ALL=(ALL) NOPASSWD: /bin/ping`。

或者您可以通过`sudo setcap cap_net_raw+ep /bin/ping`命令允许执行 ping。

如果未找到`setcup`，则必须先安装`setcap` 和`sudo apt-get install libcap2-bin`。

## TCP 端口检查
从 1.8.0 版本开始，您还可以通过在 IP 地址后用冒号指定端口号来检查 TCP 端口（例如，`192.168.1.1:80`）。

适配器将检查 TCP 端口是否可达，而不是使用 ICMP ping。

<!-- 下一个版本的占位符（在行首）：

### **工作正在进行** -->

## Changelog
### 1.8.0 (2025-10-05)

- (@GermanBluefox) Removed admin 4,5 support
- (@GermanBluefox) Updated dependencies
- (@GermanBluefox) Added possibility to probe TCP ports

### 1.7.9 (2024-10-01)

- (@GermanBluefox) Small changes the layout of the dynamic messages

### 1.7.8 (2024-09-28)

- (@GermanBluefox) Used `iobroker/eslint-config`
- (@GermanBluefox) Fixed some errors with `setcup`
- (@GermanBluefox) Corrected admin notification

### 1.7.6 (2024-09-21)

- (@GermanBluefox) Corrected notification message

### 1.7.5 (2024-09-18)

- (@GermanBluefox) Corrected small error about range length

### 1.7.4 (2024-09-17)

- (@GermanBluefox) Added support for dynamic notifications
- (@GermanBluefox) Added custom range settings

### 1.7.3 (2024-08-25)

- (@GermanBluefox) Added the functionality to poll the address range periodically

### 1.7.1 (2024-08-25)

- (@GermanBluefox) Added resolution of IP addresses to MAC addresses

### 1.7.0 (2024-08-17)

- (@GermanBluefox) Added possibility to browse the IP ranges

### 1.6.4 (2024-07-17)

- (@GermanBluefox) Added possibility to execute `setcap` command to allow ping without root rights

### 1.6.3 (2024-07-16)

- (@GermanBluefox) Updated the packages

### 1.6.2 (2023-07-19)

- (McM1957) Handling of state updates causing crashes with js-controller 5 has been corrected. (Issue #106)
- (McM1957) Trailing spaces are now removed from ip address and name. Trailing spaces blocked correct operation. (Issue #98)
- (@GermanBluefox) Added JSON config
- (@GermanBluefox) Added different intervals for online and offline devices
- (@GermanBluefox) implemented export/import of devices

### 1.5.3 (2022-02-24)

- (Apollon77) Fix the ping retry logic

### 1.5.2 (2022-01-20)

- (basti4557) Number of retries can be defined if a ping request failed. This should minimize wrong offline detection.

### 1.5.0 (2021-07-14)

- js-controller 2.0 required at least
- (Apollon77) optimize for js-controller 3.3

### 1.4.12 (2020-09-18)

- (Apollon77) Prevented a crash case when no devices are defined (Sentry IOBROKER-PING-R)

### 1.4.11 (2020-08-26)

- (Apollon77) update js-controller dependency to correct version (1.5.8)

### 1.4.8 (2020-06-29)

- (Apollon77) Prevent adapter crashes with invalid state/channel names, see error log! (Sentry IOBROKER-PING-H, IOBROKER-PING-P, IOBROKER-PING-B)

### 1.4.7 (2020-05-02)

- (Apollon77) finally try to catch spawn errors (Sentry IOBROKER-PING-2)

### 1.4.6 (2020-04-29)

- (Apollon77) Make sure the adapter does not crash if ping command cannot be executed (Sentry)
- (Apollon77) Catch error when `ping.probe` could not be started (Sentry IOBROKER-PING-2)

### 1.4.5 (2020-04-23)

- (Apollon77) Fixed a potential crash case (Sentry)

### 1.4.4 (2020-04-17)

- (@GermanBluefox) Added support for Admin3

### 1.4.3 (2020-04-17)

- (Apollon77) Add Sentry for js-controller 3.0
- (Apollon77) update dependencies

### 1.4.2 (2020-01-23)

- (JayVee2) Sort the IP addresses

### 1.4.1 (2019-01-08)

- (simatec) supported compact mode

### 1.4.0 (2018-01-25)

- (vdemidov) refactored, added ping time and roundtrips per second for every host

### 1.3.2 (2017-09-20)

- (ldittmar) object values are converted to the valid type

### 1.3.0 (2017-02-21)

- (@GermanBluefox) allowed removing host name from state's name

### 1.2.0 (2016-12-09)

- (@GermanBluefox) change configuration dialog

### 1.1.3 (2016-11-16)

- (@GermanBluefox) catch error if no IP defined

### 1.1.1 (2016-04-10)

- (@GermanBluefox) remove ms

### 1.1.0 (2016-04-10)

- (@GermanBluefox) rewrite ping for windows

### 1.0.0 (2016-04-03)

- (@GermanBluefox) support for freebsd and all windows languages
- (@GermanBluefox) add tests

### 0.1.3 (2015-01-26)

- (@GermanBluefox) Fixed the error if the configuration changed

### 0.1.2 (2015-01-14)

- (@GermanBluefox) Fixed the configuration page

### 0.1.1 (2015-01-03)

- (@GermanBluefox) Enabled npm install

### 0.1.0 (2014-11-26)

- (@GermanBluefox) Used ping npm module instead of static one

### 0.0.5 (2014-11-21)

- (@GermanBluefox) Made possible to have shorter ping intervals (down to 5 seconds)

### 0.0.4 (2014-11-07)

- (@GermanBluefox) fix ping node

### 0.0.3 (2014-11-03)

- (@GermanBluefox) fix ping node (do not forget to remove package from git when the npm gets the update)

### 0.0.1 (2014-11-02)

- (@GermanBluefox) support of server (actually no authentication)

## License

The MIT License (MIT)

Copyright (c) 2014-2025, @GermanBluefox <dogafox@gmail.com>

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