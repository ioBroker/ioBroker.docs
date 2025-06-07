---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.reolink/README.md
title: ioBroker.reolink
hash: bCECbY+7o5yZYlBaXtv4wK0ptJJLg07amF9aEUMVku8=
---
![标识](../../../en/adapterref/iobroker.reolink/admin/reolink_logo.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.reolink.svg)
![下载](https://img.shields.io/npm/dm/iobroker.reolink.svg)
![安装数量](https://iobroker.live/badges/reolink-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/reolink-stable.svg)
![依赖状态](https://img.shields.io/david/aendue/iobroker.reolink.svg)
![新公共管理](https://nodei.co/npm/iobroker.reolink.png?downloads=true)

# IoBroker.reolink
**测试：**![测试和发布](https://github.com/aendue/ioBroker.reolink/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 reolink 适配器
ioBroker 平台适配器用于获取[Reolink相机](https://reolink.com/) 信息。

一般来说，所有较新的 Reolink 相机都支持 API 命令。它们支持的命令有所不同。

关于密码，有一点提醒。如果只有一个特殊字符，请尝试使用或不使用 URI 编码。为了达到同样的安全性，最好不使用特殊字符，而使用更长的密码。请使用 http://cam.ip.add.ress/api.cgi?cmd=GetDevInfo&channel=0&user=username&password=yoursecurity 检查您的凭据是否有效。

如果您希望包含任何特定的 API 命令...请立即告诉我。

## 实现的功能
＃＃＃ 放
- PTZ 控制 / PTZ 防护
- 推送通知
- 设置自动对焦

值：0,1

- 设置红外灯

值：自动、关闭

- 设置LED灯
- 设置邮件通知

值：0、1

- 播放音频警报
- 变焦对焦

可以通过改变 reolink.<Instanze>.settings 状态来触发功能。

 ＃＃＃ 得到
- 设备信息
- 云台信息
- 驱动器信息
- 网络信息
- 运动检测
- 自动对焦
- 快照
红外灯
LED灯
- 邮件通知

### 推送通知设置
仅当满足以下条件时才会向手机提供推送通知：

- 适配器中的推送通知开关已打开。
- 对于 NVR，全局和通道开关都处于打开状态。
- 该手机的 Reolink 应用程序中的推送通知已打开。

Reolink 应用程序中的推送通知与适配器设置无关，也与连接到同一摄像头的其他手机的设置无关。Reolink 的这种设计让您可以独立地关闭每部手机的推送通知。这意味着在 iobroker 上停用推送通知根本不会影响应用程序中的切换按钮。

### 获取图像的示例用法：
```
sendTo("reolink.0",{action: "snap"}, function(result){
    sendTo("matrix-org.0",{file:result});
});
```

// **result** 的内容是 JSON：

```
{type:"image/png",base64:"iVBORw....askldfj"}
```

对于电报来说这是有效的

```
sendTo("reolink.0",{action: "snap"}, function(result){
    const buffer =Buffer.from(result.base64, "base64");
    sendTo('telegram.0', {
        text: buffer,
        type: "photo",
        caption: 'the image'
    });
});
```

## 已知可运行的相机（2023 年以前的固件）
RLC-420-5MP
E1户外
E1变焦
RLC-522
RLC-810A
RLC-823A
Duo 3 PoE

## 已知*不*工作的相机
E1专业版
- Argus 4（可能所有 Argus 均无法正常工作）

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
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