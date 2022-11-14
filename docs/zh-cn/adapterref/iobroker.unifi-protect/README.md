---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.unifi-protect/README.md
title: ioBroker.unifi-保护
hash: w7zo2bNe6JcYU812u6HwTJcS0GsV17BV7u9LbcNJcNs=
---
![标识](../../../en/adapterref/iobroker.unifi-protect/admin/unifi-protect.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.unifi-protect.svg)
![下载](https://img.shields.io/npm/dm/iobroker.unifi-protect.svg)
![安装数量（最新）](http://iobroker.live/badges/unifi-protect-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/unifi-protect-stable.svg)
![依赖状态](https://img.shields.io/david/peterbaumert/iobroker.unifi-protect.svg)
![已知漏洞](https://snyk.io/test/github/peterbaumert/ioBroker.unifi-protect/badge.svg)
![新PM](https://nodei.co/npm/iobroker.unifi-protect.png?downloads=true)

# IoBroker.unifi-protect
**此适配器使用服务[哨兵.io](https://sentry.io)自动向我作为开发者报告异常和代码错误以及新的设备架构。**更多细节见下文！

## IoBroker 的 unifi-protect 适配器
连接到 Unifi Protect 控制器并从添加的摄像机中提取所有数据。

标准端口（如果不自行更改）：

 - Cloud Key Plus Gen2：7443
 - UDM 专业版：443

## GetThumbnail 和 getSnapshot 的示例
```
// Settings
const path = '/opt/iobroker/tmp/temp.jpg';
const threshold = 50;

// Send to Telegram ( or what you prefer )
function sendImage(path) {
    sendTo('telegram.0', path);
}

//Trigger Script
on({ id: 'unifi-protect.0.motions.lastMotion.thumbnail', change: "ne" }, function () {
    const thumb = getState('unifi-protect.0.motions.lastMotion.thumbnail'/*thumbnail*/).val;
    const end = getState('unifi-protect.0.motions.lastMotion.end'/*thumbnail*/).val;
    const cameraid = getState('unifi-protect.0.motions.lastMotion.camera'/*thumbnail*/).val;
    const score = getState('unifi-protect.0.motions.lastMotion.score'/*thumbnail*/).val;
    if (score < threshold) { return; }
    // if Event has ended send the Thumbnail otherwise get current Snapshot
    if (end != null) {
        sendTo('unifi-protect.0', 'getThumbnail', { "thumbnail": thumb, "path": path }, function (res) {
            sendImage(path);
        });
    } else {
        sendTo('unifi-protect.0', 'getSnapshot', { "cameraid": cameraid, "path": path }, function (res) {
            sendImage(path);
        });
    }
});
```

```
sendTo('unifi-protect.0', 'getSnapshot', { "cameraid": "5e4a861c01d12503870003f9", "path": path }, function (res) {
    sendImage(path);
});
```

## Sentry.io 是什么以及向该公司的服务器报告什么？
Sentry.io 是一项服务，供开发人员从他们的应用程序中获取有关错误的概述。而这正是在这个适配器中实现的。

当适配器崩溃或发生其他代码错误时，也会出现在 ioBroker 日志中的此错误消息将提交给 Sentry。当您允许 iobroker GmbH 收集诊断数据时，还包括您的安装 ID（这只是一个唯一 ID **没有**关于您的任何其他信息、电子邮件、姓名等）。这允许 Sentry 对错误进行分组并显示有多少唯一用户受到此类错误的影响。所有这些都帮助我提供了基本上不会崩溃的无错误适配器。

＃＃ **工作正在进行中**
* 依赖更新
* 首次实现实时更新 api
* 实时事件中的 lastMotion、lastRing、lcdMessage 和 smartDetectZone
*（Scrounger）添加手动快照按钮
*（Scrounger）添加的每个凸轮的实时事件数据点
*（Scrounger）为添加的实时事件拍摄快照和缩略图（base64 图像）
* (Scrounger) 添加的运动事件列表的缩略图（base64 图像）
* (Scrounger) 添加了运动事件列表和实时事件的小缩略图（base64 图像）
* (Scrounger) 添加了运动事件列表的摄像机名称

### 0.0.12 (2021-03-14)
* 添加智能检测
* 修复了一些 lastMotion 的东西
* 添加了对 CloudKey 的 UnifiOs 支持

### 0.0.11 (2020-02-27)
* 稍微改变了管理界面
* 添加端口说明
* 修复 UDM Pro 可写状态

### 0.0.10 (2020-02-26)
* 用于集成测试的 travis ci 已修复
* 实际使用最后 x 运动设置

### 0.0.9 (2020-02-21)
* 相机的 lastMotion 仅在必要时更新
* 首次 UDM 集成，更改设置尚未生效

### 0.0.8 (2020-02-17)
*使运动事件可选（始终存储最后的运动）
* 使间隔和“最后 x 秒的动作”可调
* 正确删除旧动作

### 0.0.7 (2020-02-09)
*不断刷新运动事件
* 改变数据结构
* 为每个摄像机添加了 lastMotion 数据点

### 0.0.6 (2020-02-08)
* 使某些设置可更改（名称、osdSettings.*、recordingSettings.mode、ledSettings.isEnabled）

### 0.0.5 (2020-02-07)
* 新标志
* 添加运动事件数据点

### 0.0.4 (2020-02-05)
* 发布脚本测试和一些自述文件更改

### 0.0.3 (03.02.2020)
* (Peter Baumert) 第一次在 npm 上工作 rls

### 0.0.1
*（彼得鲍默特）初始版本

## 代码用法
[protect_api](./protect_api) 主要是从 [hjdhjd 的 homebridge-unifi-protect 复制而来的](https://github.com/hjdhjd/homebridge-unifi-protect)中的代码。
非常感谢您提供此代码。你可以找到他的代码许可证[这里](https://github.com/hjdhjd/homebridge-unifi-protect/blob/master/LICENSE.md)。

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ## **WORK IN PROGRESS**
-->

## License
MIT License

Copyright (c) 2020-2022 Peter Baumert

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