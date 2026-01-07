---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.ford/README.md
title: ioBroker.ford
hash: SwGh8ZuY/WUsnCeKE3ij6c8GDYf4Vseu3KQ/2C5ivuE=
---
![标识](../../../en/adapterref/iobroker.ford/admin/ford.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.ford.svg)
![下载](https://img.shields.io/npm/dm/iobroker.ford.svg)
![安装数量（最新）](https://iobroker.live/badges/ford-installed.svg)
![安装数量（稳定版）](https://iobroker.live/badges/ford-stable.svg)
![依赖状态](https://img.shields.io/david/TA2k/iobroker.ford.svg)
![NPM](https://nodei.co/npm/iobroker.ford.png?downloads=true)

# IoBroker.ford
**测试：** ![测试与发布](https://github.com/TA2k/ioBroker.ford/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的福特适配器
FordPass适配器

＃＃ 用法
### OAuth 2.0 登录
该适配器使用 OAuth 2.0 身份验证。请按照以下步骤进行身份验证：

1. 启动适配器 - 日志中将显示身份验证 URL
2. **重要提示：请在点击登录链接前打开开发者工具（F12）**
3. 转到开发者工具中的“网络”选项卡。
4. 从日志中复制 OAuth URL 并将其粘贴到浏览器中。
5. 使用您的福特账户凭据登录
6. 登录后，浏览器会显示“无法打开页面”——这是正常现象。
7. 在“网络”选项卡中，找到 URL 以 `fordapp://userauthorized/?code=` 开头的红色失败请求。
8. 从“网络”选项卡复制完整的 URL。
9. 将其粘贴到适配器设置中的“v2 代码 URL”字段中
10. 保存并重启适配器

### 遥控器
该适配器为 `{VIN}.remote.*` 下的每辆车创建遥控按钮：

- **engine/start**：启动或停止发动机（true = 启动，false = 停止）
- **门/锁**：锁定或解锁门（true = 锁定，false = 解锁）
- **状态**：请求车辆的最新状态更新（发送 statusRefresh 命令）
- **刷新**：无需向车辆发送指令即可刷新缓存数据

### 配置选项
- **更新间隔**：自动数据更新之间的时间间隔（以分钟为单位）（默认值：5 分钟）
- **位置更新**：启用/禁用位置更新。禁用此功能可缩短更新间隔并减少电池消耗。
- **强制更新**：启用自动状态刷新命令，按固定时间间隔刷新状态（警告：可能会耗尽 12V 电池电量。仅当您的车辆支持此命令时才启用）。
- **跳过 12V 检查**：使用强制更新时禁用 12V 电池检查

### 电池保护
默认情况下，适配器会定期查询缓存的车辆数据。要从车辆请求最新数据，可以：

- 启用“强制更新”选项（仅当您的车辆支持此功能时）
- 手动使用 `{VIN}.remote.status` 按钮

**注意：**部分车辆可能不支持`statusRefresh`命令，并会返回404错误——这是正常现象。在这种情况下，请禁用“强制更新”，并改用`refresh`按钮。

## Changelog

### 1.1.5 (2025-12-29)

- update API headers to match latest FordPass app
- fix checkbox display in adapter configuration UI

### 1.1.4 (2025-12-27)

- fix login flow

### 1.0.5 (2024-07-09)

- Add location update option to reduce update requests

### 1.0.3 (2024-06-22)

- improve help text

### 1.0.2 (2024-05-24)

- improved failed login

### 1.0.0 (2024-05-24)

- added new login flow and public api. All new Datapoints

### 0.2.3 (2024-05-17)

- reverted domain ending setting to fix login

### 0.2.1 (2024-05-10)

- fixed login and added domain ending in settings

### 0.2.0

- Login Fix

### 0.0.14

- Improvements to prevent blocking from Ford

### 0.0.13

- removed not working detail api

### 0.0.12

- fix login

### 0.0.11

- fix login

### 0.0.8

- (TA2k) add remote control for refresh

### 0.0.7

- (TA2k) initial release

## License

MIT License

Copyright (c) 2021-2030 TA2k <tombox2020@gmail.com>

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