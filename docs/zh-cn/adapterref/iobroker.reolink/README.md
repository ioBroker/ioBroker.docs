---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.reolink/README.md
title: ioBroker.reolink
hash: /bm8PbcKUsNovM9dM+o7AdtO37eijmF0pbO4vbW2PaU=
---
![标识](../../../en/adapterref/iobroker.reolink/admin/reolink_logo.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.reolink.svg)
![下载](https://img.shields.io/npm/dm/iobroker.reolink.svg)
![安装数量](https://iobroker.live/badges/reolink-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/reolink-stable.svg)
![依赖状态](https://img.shields.io/david/aendue/iobroker.reolink.svg)
![新平台](https://nodei.co/npm/iobroker.reolink.png?downloads=true)

# IoBroker.reolink
**测试：**![测试与发布](https://github.com/aendue/ioBroker.reolink/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 reolink 适配器
ioBroker 平台适配器用于获取[Reolink 相机](https://reolink.com/) 信息。

一般而言，所有较新的 Reolink 相机都支持 API 命令。它们只是支持的命令有所不同。

提醒一下密码。如果只有一个特殊字符，请尝试使用或不使用 URI 编码。最好不使用特殊字符，而使用更长的密码以获得相同的安全性。

如果您希望包含任何特定的 API 命令...请现在告诉我。

## 实现的功能
＃＃＃ 放
- PTZ 控制 / PTZ 防护
- 推送通知
- 设置自动对焦

值： 0,1

- 设置红外灯

值：自动、关闭

- 设置LED灯
- 设置邮件通知

值： 0、1

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

### 获取图像的示例用法：
```
sendTo("reolink.0",{action: "snap"}, function(result){
    sendTo("matrix-org.0",{file:result});
});
```

// **result** 的内容是 JSON ：

```
{type:"image/png",base64:"iVBORw....askldfj"}
```

## 已知可工作的相机（2023 年以前的固件）
产品编号：RLC-420-5MP
- E1户外
RLC-522 型
RLC-810A 型
RLC-823A 型
- 双 3 PoE

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
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

### 0.1.2 (2023-11-03)
* (oelison) ptz patrol added
* (oelison) node 12 tests removed
* (aendue) added getAiState

### 0.1.1 (2022-11-03)
* (aendue) ssl validation included
* (aendue) fixed issue with ack-flag not set
* (aendue) changed datatypes of disk.free and RAW.Email
* (aendue) enabled getAutoFocus again
* (aendue) name change on state EmailNotification (state gets created dynamically now)

### 0.1.0 (2022-10-25)
* (aendue) fixed asynchron functions (Axios Errors)
* (aendue) added getAutoFocus funktion
* (aendue) added getIrLight funktion
* (aendue) added getWhiteLED function
* (aendue) added getMailNotification function
* (aendue) added setMailNotification function
* (aendue) cleanup code

### 0.0.5 (2022-09-28)

* (oelison) guard point (new info)

### 0.0.4 (2022-09-27)

* (oelison) ptz preset tested
* (oelison) change protocol (http/https) possible
* (oelison) led on/off and brightness
* (oelison) push on/off
* (oelison) auto focus on/off
* (oelison) set zoom
* (oelison) play alarm (n times)
* (oelison) motion detection enabled again

### 0.0.3 (2022-09-05)

* (aendue) npm release prepare
* (oelison) ptz preset (untested, missing ptz cam)

### 0.0.2 (2022-09-05)

* (aendue) added languages
* (oelison) added get image function (snap)

### 0.0.1 (2022-07-05)

* (aendue) initial release

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