---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.doorbird/README.md
title: ioBroker.doorbird
hash: WjF6c3YFNfxVzrzgnMCMY1Za3n93R+RMsKUeAj75xd4=
---
![标识](../../../en/adapterref/iobroker.doorbird/admin/doorbird.png)

![NPM版本](https://img.shields.io/npm/v/iobroker.doorbird.svg)
![下载](https://img.shields.io/npm/dm/iobroker.doorbird.svg)
![GitHub](https://img.shields.io/github/license/iobroker-community-adapters/iobroker.doorbird?style=flat-square)
![GitHub 存储库大小](https://img.shields.io/github/repo-size/iobroker-community-adapters/iobroker.doorbird?logo=github&style=flat-square)
![GitHub 提交活动](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/iobroker.doorbird?logo=github&style=flat-square)
![GitHub 最后一次提交](https://img.shields.io/github/last-commit/iobroker-community-adapters/iobroker.doorbird?logo=github&style=flat-square)
![GitHub 问题](https://img.shields.io/github/issues/iobroker-community-adapters/iobroker.doorbird?logo=github&style=flat-square)
![国家公共管理](https://nodei.co/npm/iobroker.doorbird.png?downloads=true)
![贝塔](https://img.shields.io/npm/v/iobroker.doorbird.svg?color=red&label=beta)
![稳定的](http://iobroker.live/badges/doorbird-stable.svg)
![已安装](http://iobroker.live/badges/doorbird-installed.svg)

# IoBroker.doorbird
![测试与发布](https://github.com/iobroker-community-adapters/ioBroker.doorbird/workflows/Test%20and%20Release/badge.svg)

## 版本
## 什么是门鸟？
DoorBird 是一款门对讲机，兼具门铃和安全系统的功能。该产品安装在房子的外面，通常是门铃所在的地方，并配有一个门铃按钮，上面有一个摄像头。

＃＃ 配置
1. 输入适配器应侦听来自 Doorbird 设备的事件的 IP。

（这通常是您的 ioBroker 主机的 IP）。
适配器会尝试为您预先填充正确的 IP 字段。如果预填的 IP 不是您的 ioBroker 主机的 IP，请将其更改为正确的 IP。

2. 端口预定义为“8100”。如果该端口已被其他服务使用，您可以更改它。

   只需尝试使用此端口运行适配器即可。如果端口不可用，您将在启动适配器时收到错误消息。然后回到这里并更改端口即可。

3. 输入 Doorbird 设备的 IP。您可以单击输入字段左侧的“搜索图标”。单击该图标后，配置屏幕顶部会出现一条消息。现在您有 60 秒的时间按下 Doorbird 设备上的响铃按钮。适配器尝试检测 IP 并为您填写所有字段。
4. Doorbird 的设备 ID（不是 IP！）。
5. 用户名需要在 Doorbird 设备上拥有 **API-Operator** 和 **Watch Always** 权限。
6. 在字段 5 中输入的用户名密码。

![截屏](../../../en/adapterref/iobroker.doorbird/img/configscreen.png)

在配置对话框中输入所有必需信息后，单击“保存并关闭”。
适配器现在应该重新启动，您就可以开始了！

## 访问 Motion 和 DoorBell 的快照
使用以下 URL 获取当前快照：

```
http://<ioBroker-IP>:<Port>/files/doorbird.<instance>.Doorbell<number>_1.jpg
http://<ioBroker-IP>:<Port>/files/doorbird.<instance>.Motion_1.jpg
```

或者

```
/opt/iobroker/iobroker-data/files/doorbird.<instance>/Doorbell<number>_1.jpg'
```

＃＃＃＃ 例子：
```
http://192.168.0.2:8081/files/doorbird.0/Doorbell1_1.jpg
```

### 通过 Telegram 发送快照
＃＃＃＃ 例子
```
readFile("doorbird.0", "TakeSnapshot_1.jpg", function (error, data) {
  if (error) {
    console.error(error);
  } else {
    sendTo("telegram.0", {
      text: data,
      type: "photo",
    });
  }
});
```

或者从 js-controller 4.1.x 开始

```
setState('doorbird.0.TakeSnapshot', true);
onFile("doorbird.0", "TakeSnapshot_1.jpg", false, function (id, fileName, size, fileData, mimeType) {
    sendTo('telegram.0', {
        text: fileData,
        type: 'photo'
    });
});
```

## 兼容设备
|设备|硬件版本 |固件版本 |
| -------------------------------- | ---------------- | ---------------- |
| DoorBird 视频门口站 D10x | 1.00 及以上 | 000099 及以上 |
| DoorBird 视频门禁站 D20x | 1.00 及以上 | 000099 及以上 |
| DoorBird 视频门口站 D21x | 1.00 及以上 | 000108 及以上 |
|鸟卫 B10x | 1.00 及以上 | 000099 及以上 |
| DoorBird 视频门禁站 D11x | 1.00 及以上 | 000130及以上|

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.3.0 (2023-10-03)

-   (Schmakus) add debug logs to find out "Maximum call stack size exceeded"
-   (Schmakus) update dependencies

### 1.2.4 (2023-08-31)

-   (Schmakus) tryed to fixed [#73] Maximum call stack size exceeded
-   (Stefan592) fixed 'listen on all interfaces'

### 1.2.3 (2023-08-17)

-   (Schmakus) changed schedule handling. (fix status code 400)

### 1.2.2 (2023-08-17)

-   (Schmakus) some code improvements

### 1.2.1 (2023-08-17)

-   (Schmakus) Issue 'Maximum call stack size exceeded' - try to fix

## License

The MIT License (MIT)

Copyright (c) 2023 iobroker-community-adapters <>

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