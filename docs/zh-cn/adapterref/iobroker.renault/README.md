---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.renault/README.md
title: ioBroker.renault
hash: aXQPKLCE2XR/P6nxBntUGKsKjZWvkRgqrKV+VolMvhI=
---
![标识](../../../en/adapterref/iobroker.renault/admin/renault.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.renault.svg)
![下载](https://img.shields.io/npm/dm/iobroker.renault.svg)
![安装数量](https://iobroker.live/badges/renault-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/renault-stable.svg)

# IoBroker.renault
**测试：** ![测试与发布](https://github.com/TA2k/ioBroker.renault/workflows/Test%20and%20Release/badge.svg)

## 适用于 ioBroker 的雷诺/达契亚适配器
该适配器将 ioBroker 连接到 My Renault / My Dacia 云，并公开车辆状态数据（电池、充电、HVAC、里程等）以及远程命令（HVAC 启动、充电启动/停止、强制刷新），适用于兼容的雷诺和达契亚车型，例如雷诺 Zoe、梅甘娜 E-Tech、Kangoo E-Tech 和达契亚 Spring。

## 安装/登录
1. 通过 ioBroker 管理界面安装适配器。
2. 打开适配器配置，输入您的 **My Renault**（或 **My Dacia**）帐户凭据：应用程序电子邮件和应用程序密码。
3. 将 **country** 设置为与您的帐户匹配的两位字母国家/地区代码（例如 `de`、`fr`、`it`、`es`）。
4. （可选）设置轮询**间隔**（以分钟为单位）和**API密钥**（留空则自动检测）。
5. 保存后，实例将开始轮询。

＃＃ 遥控
每辆车都根据其车辆识别码 (VIN) 创建为一个设备。远程命令以状态的形式公开，位于 `renault.0.<VIN>.remote.*` 下：

| 状态 | 类型 | 操作 |
| --------------------------- | ------- | ------ |
| `actions/hvac-start` | 布尔值 | `true` = 开始预处理，`false` = 停止预处理 |
| `actions/charging-start` | 布尔值 | `true` = 开始充电，`false` = 停止充电 |
| `charge/pause-resume` | 布尔值 | `true` = 开始，`false` = 暂停 |
| `charge/start` | 布尔值 | `true` = 开始充电，`false` = 停止充电（旧版端点） |
| `refresh` | 布尔值 | `true` = 强制刷新车辆数据 |
| `refresh` | 布尔值 | `true` = 强制刷新车辆数据 |

将相应状态设置为`true`以触发该命令。

## 讨论/提问
ioBroker 论坛：<https://forum.iobroker.net/topic/48074/test-adapter-renault-v0-0-x>

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

### 0.0.23

- (TA2k) align API headers with My Renault Android app, drop EOL Node 18/20, migrate admin UI to jsonConfig

### 0.0.22

- (TA2k) update dependencies, migrate to ESLint 10, fix repochecker findings

### 0.0.7

- (TA2k) initial release

[Older changelogs can be found here](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2021-2026 TA2k <tombox2020@gmail.com>

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