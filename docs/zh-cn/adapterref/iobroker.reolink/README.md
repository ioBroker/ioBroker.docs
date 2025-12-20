---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.reolink/README.md
title: ioBroker.reolink
hash: 50y3ZeJ3MS1dkRKIpyBd3FY/d1+0pNHJpsSoWBp/fKA=
---
![标识](../../../en/adapterref/iobroker.reolink/admin/reolink.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.reolink.svg)
![下载](https://img.shields.io/npm/dm/iobroker.reolink.svg)
![安装数量](https://iobroker.live/badges/reolink-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/reolink-stable.svg)
![依赖状态](https://img.shields.io/david/aendue/iobroker.reolink.svg)
![NPM](https://nodei.co/npm/iobroker.reolink.png?downloads=true)

# IoBroker.reolink
**测试：** ![测试与发布](https://github.com/aendue/ioBroker.reolink/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 reolink 适配器
用于 ioBroker 平台的适配器，用于获取 [Reolink 相机](https://reolink.com/) 信息。

一般来说，所有较新的Reolink摄像头都支持API命令，只是支持的命令有所不同。

关于密码的提醒。如果密码中只有一个特殊字符，请尝试使用或不使用 URI 编码。为了保证安全性，最好不要使用特殊字符，而是使用更长的密码。请使用 http://cam.ip.add.ress/api.cgi?cmd=GetDevInfo&channel=0&user=username&password=yoursecurity 来检查您的凭据是否有效。

如果您希望添加任何特定的 API 命令……请告诉我。

## 已实现的功能
＃＃＃ 放
- 云台控制/云台防护
推送通知
- 设置自动对焦

值：0,1

- 设置红外灯

值：自动、关闭

- 设置LED灯
- 设置邮件通知

值：0，1

- 播放音频警报
- 变焦对焦

可以通过更改 reolink.<实例>.设置状态来触发功能。

 ＃＃＃ 得到
- 设备信息
- PTZ 信息
- 行车信息
网络信息
- 运动检测
自动对焦
- 快照
- 红外光
- LED灯
- 邮件通知

### 推送通知设置
仅当满足以下条件时，才会向手机发送推送通知：

- 适配器中的推送通知开关已开启。
- 对于 NVR，全局开关和通道开关都已开启。
- 该手机上的 Reolink App 的推送通知已开启。

Reolink 应用中的推送通知独立于适配器设置，也独立于连接到同一摄像头的其他手机上的设置。Reolink 这样设计是为了让您可以针对每部手机单独关闭推送通知。这意味着在 iobroker 中禁用推送通知不会影响应用中的开关按钮。

### 获取图像的示例用法：
```js
sendTo("reolink.0",{action: "snap"}, function(result){
    sendTo("matrix-org.0",{file:result});
});
```

// 结果中的内容为 JSON：

```json
{ "type": "image/png","base64": "iVBORw....askldfj" }
```

对于 Telegram 来说，这行得通。

```js
sendTo("reolink.0",{action: "snap"}, function(result){
    const buffer =Buffer.from(result.base64, "base64");
    sendTo('telegram.0', {
        text: buffer,
        type: "photo",
        caption: 'the image'
    });
});
```

## 已知可用的摄像头（固件版本为 2023 年之后）
- RLC-420-5MP
E1户外
- E1 变焦
- RLC-522
- RLC-810A
- RLC-823A
- 双人组 3 PoE

## 已知无法正常工作的摄像头
E1 Pro
- Argus 4（可能所有 Argus 版本都无法正常工作）

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.3.0 (2025-12-20)
* (agross) AiCfg config
* (oelison) bump some libs #202
* (bluefox) migration to ts
* (bot) revoking classic token #204
* (oelison) state changes from info log to debug #206

### 1.2.3 (2025-06-30)
* (oelison) settings email notification #170
* (oelison) testing node.js 24 #172

### 1.2.2 (2025-05-01)
* (oelison) update readme #141 #155
* (oelison) supress errors with axios timeout #154

### 1.2.1 (2025-02-09)
* (oelison) set some errors to debug logs

### 1.2.0 (2025-02-07)
* (oelison) update disk info
* (oelison) uri enconding is switchable (helps sometimes by one special char)
* (oelison) #28 PTZ check added

### 1.1.2 (2024-09-14)
* (oelison) [#22](https://github.com/aendue/ioBroker.reolink/issues/22) password with some more special chars works now
* (oelison) adapter warnings resolved

### 1.1.1 (2024-08-03)
* (oelison) removed warnings from adapter check
* (olli) added ftp support
* (oelison) channel now distinguishing most requests
* (oelison) [#79](https://github.com/aendue/ioBroker.reolink/issues/79) error messages with more info where

### 1.1.0 (2024-05-16)
* (Nibbels) [#56](https://github.com/aendue/ioBroker.reolink/issues/56) added function to switch scheduled recording on and off
* (Nibbels) [#25](https://github.com/aendue/ioBroker.reolink/issues/25) detach led light from led light mode
* (Nibbels) added setWhiteLedMode function
* (Nibbels) read zoom and focus with POST request (works on RLC-823A v3.1)
* (oelison) removed node 16

### 1.0.3 (2024-01-21)
* (oelison) [#49](https://github.com/aendue/ioBroker.reolink/issues/49)
* (oelison) [#47](https://github.com/aendue/ioBroker.reolink/issues/47)

### 1.0.2 (2023-12-19)
* (oelison) known working cameras added
* (oelison) setIrLights accept "On" now
* (oelison) [#40](https://github.com/aendue/ioBroker.reolink/issues/40)
* (oelison) [#42](https://github.com/aendue/ioBroker.reolink/issues/42)

### 1.0.1 (2023-11-11)
* (oelison) resolve review for latest adapter addition
* (oelison) maybe the last node 16 version
* (oelison) booleans are now false/true and not 0/1

## License
MIT License

Copyright (c) 2025 Andy Grundt <andygrundt@gmail.com>

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