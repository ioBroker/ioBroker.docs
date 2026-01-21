---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.volumio/README.md
title: ioBroker.volumio
hash: 0vHVTyX+WBHXZeJc4qalwJaA20eNyJgyhR1I2pgwrSU=
---
![标识](../../../en/adapterref/iobroker.volumio/admin/volumio.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.volumio.svg)
![下载](https://img.shields.io/npm/dm/iobroker.volumio.svg)
![安装数量（最新）](http://iobroker.live/badges/volumio-installed.svg)
![安装数量（稳定版）](http://iobroker.live/badges/volumio-stable.svg)
![依赖状态](https://img.shields.io/david/a-i-ks/iobroker.volumio.svg)
![已知漏洞](https://snyk.io/test/github/a-i-ks/ioBroker.volumio/badge.svg)
![NPM](https://nodei.co/npm/iobroker.volumio.png?downloads=true)

# IoBroker.volumio
**测试：** ![测试与发布](https://github.com/a-i-ks/ioBroker.volumio/workflows/Test%20and%20Release/badge.svg)

### 支持我
如果这款适配器帮助您在智能家居中实现了炫酷的自动化功能，并缩短了开发时间，欢迎请我喝杯咖啡 :)

[![捐赠](https://raw.githubusercontent.com/a-i-ks/ioBroker.volumio/master/donate_button.png)](http://paypal.me/iske)

## IoBroker 的 Volumio 适配器
Volumio ioBroker适配器

这是一个用于远程控制 Volumio 实例的适配器。

### ✨ 版本 0.9.0 - 双 API 支持
该适配器现在支持与 Volumio 的**两种通信模式**：

#### 🚀 WebSocket 模式（推荐 - 默认）
- 通过 Socket.IO 实现**实时更新**
- 无需轮询即可立即改变状态
- 降低网络开销
- 连接中断时自动重新连接
- 非常适合响应式智能家居自动化

#### 📡 REST API 模式
- 基于轮询的状态更新（可配置间隔）
- 兼容旧版 Volumio
- 可选的 HTTP 推送通知支持（已弃用）
- WebSocket 被阻止的网络的备用方案

### 🎛️ 配置
请在适配器设置中选择您偏好的 API 模式：

- **API模式**：选择“WebSocket”（推荐）或“REST API”
- **轮询间隔**（REST 模式）：检查状态更改的频率（默认值：2 秒）
- **重连设置**（WebSocket 模式）：配置连接断开时的重试行为

### 🎵 已实现的功能
* **播放控制**
播放/暂停/停止
* 切换播放/暂停
* 下一首/上一首曲目
* 播放播放列表中的第 n 首歌曲
* **音量控制**
* 设置为特定值（0-100）
* 音量阶梯式升降
* 静音/取消静音
* 切换静音
* **队列管理**
* 清空队列
* **播放选项**
* 随机播放（随机播放）
* 重复模式
* 重复单曲
* **州信息**
* 实时玩家状态（WebSocket）或轮询（REST）
* 曲目信息（标题、艺术家、专辑、封面）
* 系统信息
* 连接状态

### 📚 API 文档
此适配器使用官方 Volumio API：

- **WebSocket API**：https://developers.volumio.com/api/websocket-api
- **REST API**：https://developers.volumio.com/api/rest-api

### 🔮 计划功能（未来版本）
- [ ] 浏览音乐库
- [ ] 播放列表管理（列表、创建、删除）
- [ ] 搜索功能
- [ ] 多房间音频支持

## Changelog
<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 0.9.0 (2025-12-22)
**Major Release - Milestone before 1.0.0**

#### 🎉 New Features
* **Dual API Support**: Choose between WebSocket (real-time) or REST API (polling) mode
* **WebSocket Mode** (NEW - Default):
  - Real-time state updates via Socket.IO
  - Automatic reconnection with configurable retry settings
  - Lower network overhead and better responsiveness
* **REST API Mode** (Enhanced):
  - Improved polling mechanism with configurable interval
  - Better error handling and connection management
* **Client Abstraction Layer**: Clean architecture for API communication
* **Configurable API Settings**:
  - API mode selection in adapter configuration
  - Poll interval for REST mode (default: 2 seconds)
  - Reconnection attempts and delay for WebSocket mode

#### 🔧 Improvements
* Complete refactoring of API communication layer
* Unified interface for both REST and WebSocket clients
* Better connection state management
* Improved error handling across all operations
* Enhanced logging for debugging

#### 📦 Dependencies
* Added `socket.io-client` v4.8.1 for WebSocket support
* Updated all dependencies to latest secure versions
* Migrated to ESLint 9 with @iobroker/eslint-config
* Updated to NPM Trusted Publishing via OIDC

#### 🏗️ Architecture
* New modular client structure:
  - `IVolumioClient` - Common interface
  - `RestVolumioClient` - REST API implementation
  - `WebSocketVolumioClient` - WebSocket implementation
  - `VolumioClientFactory` - Dynamic client creation

#### ⚠️ Deprecations
* HTTP push notifications marked as deprecated (REST-only feature)
* WebSocket mode provides superior real-time updates

#### ✅ Testing
* Added comprehensive unit tests for client implementations
* All 72 tests passing (15 unit tests + 57 package validation tests)
* Build and type-checking successful

### 0.2.0 (2024-05-21)
* (André Iske)
  - Updated to newest ioBroker adapter structure
  - Fixed adapter crashes

### 0.1.3
* (André Iske) Security patches

### 0.1.2
* (André Iske) Minor bug fixes

### 0.1.0
* (André Iske) Complete reworked adapter
    * Switched codebase to typescript
    * Changed License to MIT

### 0.0.1
* (André Iske) initial release

## License
MIT License

Copyright (c) 2024-2025 André Iske <andre.iske@mailbox.org>

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