---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.wled/README.md
title: ioBroker.wled
hash: ZGr8DVFCltNzqXCLqZuyQfAjFjsiLxvJkqe5kEdcfqo=
---
![标识](../../../en/adapterref/iobroker.wled/admin/wled_logo_akemi.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.wled.svg)
![下载](https://img.shields.io/npm/dm/iobroker.wled.svg)
![安装数量](https://iobroker.live/badges/wled-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/wled-stable.svg)
![依赖状态](https://img.shields.io/david/DrozmotiX/iobroker.wled.svg)
![NPM](https://nodei.co/npm/iobroker.wled.png?downloads=true)

# IoBroker.wled
**测试：** ![测试与发布](https://github.com/DrozmotiX/iobroker.wled/workflows/Test%20and%20Release/badge.svg)

**此适配器使用服务 [Sentry.io](https://sentry.io) 自动向我（开发者）报告异常、代码错误和新的设备架构。** 更多详情请见下文！

## IoBroker 的 wled 适配器
一个快速且功能丰富的 ESP8266/ESP32 网络服务器实现，用于控制 NeoPixel（WS2812B、WS2811、SK6812、APA102）LED 或基于 SPI 的芯片组，如 WS2801！

[WLED - Github 项目](https://github.com/Aircoookie/WLED) 作者：@Aircoookie

＃＃ 指示
该适配器会自动尝试使用 Bonjour 服务在您的网络中查找 WLED 设备。

已知问题：具有 VLAN 隔离的网络通常不会路由广播流量，这意味着自动检测功能将失败。

别担心，这种情况下您可以通过 IP 地址手动添加设备。

1) 确保您的 WLED 设备正在运行且可通过网络访问 2) 安装适配器 3) 配置数据轮询和自动检测周期的间隔时间 4 - A) 启动适配器，设备应自动检测到 4 - B) 如果 A 失败，请使用“添加设备”按钮并提供设备 IP 地址 5) 适配器将立即发送更改，并每隔 x 秒（可配置）轮询一次数据

＃＃ 特征
### 控制方法
该适配器提供多种方式来控制您的WLED设备：

1. **标准状态** - 使用单独的状态来设置亮度、颜色、效果等。
2. **JSON 命令** - 通过 `action` 状态发送完整的 JSON 命令，以实现高级控制
3. **原始 HTTP API 命令** - 通过 `rawCommand` 状态发送旧版 HTTP API 命令

### 使用原始 HTTP API 命令
对于需要发送原始 HTTP API 命令（旧版 `/win` 端点）的高级用户，可以使用 `rawCommand` 状态：

```javascript
// Example: Set brightness to 255, effect to 0, and colors
setState('wled.0.XXXXXXXXXXXX.rawCommand', 'A=255&FX=0&R=255&G=0&B=0');

// Example: Complex command with multiple parameters
setState('wled.0.XXXXXXXXXXXX.rawCommand', 'SM=0&SS=0&SV=2&S=15&S2=299&GP=7&SP=30&RV=0&SB=255&A=255&W=255&R2=0&G2=0&B2=0&W2=&FX=0&T=1');
```

**注意：** `rawCommand` 状态旨在用于高级用例以及与旧版 WLED HTTP API 的兼容性。对于大多数用例，建议使用标准状态或 JSON 命令（通过 `action` 状态）。

常用原始命令参数：

- `A` - 主亮度 (0-255)
- `R`、`G`、`B` - 原色 RGB 值（0-255）
- `R2`、`G2`、`B2` - 辅助颜色 RGB 值（0-255）
- `W`、`W2` - 白色通道值（0-255）
- `FX` - 效果 ID
- `SX` - 效果速度
- `IX` - 效应强度
- `FP` - 调色板 ID
- `T` - 过渡时间

有关参数的完整列表，请参阅 [WLED HTTP API 文档](https://kno.wled.ge/interfaces/http-api/)。

### 通过 sendTo 进行分段管理
该适配器通过 `sendTo` 命令提供强大的段管理功能，允许您动态地从 JavaScript 代码中添加和删除段：

#### 添加段
```javascript
// Add a new segment to a WLED device
sendTo('wled.0', 'addSegment', {
    deviceId: 'AABBCCDDEEFF',  // Device MAC address
    segmentId: 1,              // Segment ID (0-based)
    start: 0,                  // Start LED
    stop: 10,                  // Stop LED (exclusive)
    on: true,                  // Optional: Turn segment on/off
    bri: 255,                  // Optional: Brightness (0-255)
    fx: 0,                     // Optional: Effect ID
    sx: 128,                   // Optional: Effect speed
    ix: 128,                   // Optional: Effect intensity
    pal: 0,                    // Optional: Color palette
    col: [[255,0,0],[0,255,0],[0,0,255]]  // Optional: Colors (RGB arrays)
}, (result) => {
    if (result.success) {
        console.log('Segment added successfully: ' + result.message);
    } else {
        console.error('Failed to add segment: ' + result.error);
    }
});
```

#### 删除片段
```javascript
// Delete a segment from a WLED device
sendTo('wled.0', 'deleteSegment', {
    deviceId: 'AABBCCDDEEFF',  // Device MAC address
    segmentId: 1               // Segment ID to delete
}, (result) => {
    if (result.success) {
        console.log('Segment deleted successfully: ' + result.message);
    } else {
        console.error('Failed to delete segment: ' + result.error);
    }
});
```

**参数：**

- `deviceId`（必填）：您的 WLED 设备的 MAC 地址（例如，'AABBCCDDEEFF'）
- `segmentId`（必填）：段 ID（从 0 开始编号）
- 对于 `addSegment`：
- `start`（可选）：段中的第一个 LED，默认为 0
- `stop`（可选）：段中最后一个 LED（不包含），默认为 1
- `on`（可选）：开启/关闭该段
- `bri`（可选）：亮度（0-255）
- `fx`（可选）：效果 ID
- `sx`（可选）：效果速度（0-255）
- `ix`（可选）：效果强度（0-255）
- `pal`（可选）：调色板 ID
- `col`（可选）：RGB颜色数组数组

**注意：**该适配器会自动处理通过 WebSocket（如果可用）或 HTTP API 进行的通信，并在分段操作后刷新设备状态。

## 支持我
如果您喜欢我的作品，欢迎您进行个人捐赠（这是 DutchmanNL 的个人捐赠链接，与 ioBroker 项目无关！）[![捐赠](https://raw.githubusercontent.com/DrozmotiX/ioBroker.wled/main/admin/button.png)](http://paypal.me/DutchmanNL)

## Sentry.io 是什么？它会向该公司的服务器报告哪些信息？
Sentry.io 是一项面向开发者的服务，用于概览其应用程序中的错误。而这个适配器正是实现了这一功能。

当适配器崩溃或发生其他代码错误时，此错误信息（也会出现在 ioBroker 日志中）会提交给 Sentry。如果您允许 iobroker GmbH 收集诊断数据，则还会包含您的安装 ID（这只是一个唯一的 ID，**不**包含任何关于您的其他信息，例如电子邮件、姓名等）。这使得 Sentry 可以对错误进行分组，并显示有多少个独立用户受到此类错误的影响。所有这些都有助于我提供几乎不会崩溃的无错误适配器。

## 面向开发者
### 自动化部署
此适配器使用 GitHub Actions 和 **NPM Trusted Publishing** 实现自动化部署。

对于维护人员排查部署问题，请参阅 [docs/DEPLOYMENT_SETUP.md](docs/DEPLOYMENT_SETUP.md) 以了解：

- 正在验证 npmjs.com 上的可信发布配置
- 必需的工作流程和作业名称设置
- 排查身份验证错误
- 使用预发布版本测试部署

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### __WORK IN PROGRESS__
* (DutchmanNL) **CI/CD**: Fixed deployment failure by adding missing sentry-version-prefix parameter to GitHub Actions workflow
* (DutchmanNL) **CI/CD**: Updated GitHub Copilot instructions template from v0.4.2 to v0.5.6 - adds ESLint configuration, translation management, lint-first CI/CD workflow guidance

### 0.9.2 (2026-02-16)
* (DutchmanNL) solve auto deployment issues

### 0.9.0 (2026-02-15)
* (DutchmanNL) **NEW**: Added segment management via sendTo commands - dynamically add and delete WLED segments
* (DutchmanNL) **NEW**: Added Hue Sync control - synchronize WLED colors with Philips Hue lights (hp state: 0-99, 0=off)
* (DutchmanNL) **NEW**: Added Reboot control - restart WLED device remotely (rb state: boolean button)
* (DutchmanNL) **NEW**: Added Realtime UDP control - toggle reception of realtime UDP data (rd state: boolean switch)
* (DutchmanNL) **NEW**: Added support for sending raw HTTP API commands via `rawCommand` state (fixes #677)
* (DutchmanNL) **FIXED**: Corrected online/offline state detection - `_online` state now properly contains boolean values resolves #654
* (DutchmanNL) **FIXED**: Ensure backend processes and stop when device is deleted in ioBroker object tree (fixes #615)
* (DutchmanNL) **ENHANCED**: Reduced code complexity by extracting validation helpers to separate module (lib/validation.js) #777
* (DutchmanNL) **TESTING**: Added comprehensive unit tests for validation helpers (49 test cases covering edge cases and error handling)
* (DutchmanNL) **CI/CD**: Fixed automated deployment failure by removing unused build step for JavaScript-only adapter

### 0.8.0 (2026-02-15)
* (ticaki) allow sending of raw json from state
* (DutchmanNL) **FIXED**: Implement proper Bonjour browser cleanup in onUnload() to prevent resource leaks
* (DutchmanNL) **CI/CD**: Migrated deployment workflow to NPM Trusted Publishing (OIDC) for enhanced security

### 0.7.3 (2024-10-26)
* (HaggardFFM) allow write on segments, solves #688 #706
* (DutchmanNL) Fixed error when a device is not available Solves #698

### 0.7.2 (2023-10-31) - Improve online visibility of devices
* (DutchmanNL) Show online state of device in object tree
* (DutchmanNL) Bugfix: Update online state correctly in situation connection is lost, fixes #611
* (DutchmanNL) Reset brightness to 0 and on to false during adapter start and if a device disconnects, fixes #565

## License
MIT License

Copyright (c) 2024-2026 DutchmanNL <oss@drozmotix.eu>

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