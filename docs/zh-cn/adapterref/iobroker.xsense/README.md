---
BADGE-NPM: https://nodei.co/npm/iobroker.xsense.png?downloads=true
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.xsense.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.xsense.svg
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/arteck/ioBroker.xsense
BADGE-GitHub issues: https://img.shields.io/github/issues/arteck/ioBroker.xsense
BADGE-License: https://img.shields.io/badge/License-MIT-blue.svg
BADGE-Number of Installations: http://iobroker.live/badges/xsense-installed.svg
BADGE-Beta: https://img.shields.io/npm/v/iobroker.xsense.svg?color=red&label=beta
BADGE-Stable: https://iobroker.live/badges/xsense-stable.svg
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.xsense/README.md
title: ioBroker.xsense
hash: lXYKPeJrq1REyGDcyi6qzSM4N0/S0n2sjBJ8GuUJ3Gc=
---
![标识](../../../de/adapterref/iobroker.xsense/admin/xsense.png)

![新公共管理](https://nodei.co/npm/iobroker.xsense.png?downloads=true)
![NPM 版本](http://img.shields.io/npm/v/iobroker.xsense.svg)
![下载](https://img.shields.io/npm/dm/iobroker.xsense.svg)
![GitHub 上次提交](https://img.shields.io/github/last-commit/arteck/ioBroker.xsense)
![GitHub 问题](https://img.shields.io/github/issues/arteck/ioBroker.xsense)
![执照](https://img.shields.io/badge/License-MIT-blue.svg)
![安装数量](http://iobroker.live/badges/xsense-installed.svg)
![测试版](https://img.shields.io/npm/v/iobroker.xsense.svg?color=red&label=beta)
![稳定的](https://iobroker.live/badges/xsense-stable.svg)

# IoBroker.xsense
=================

**版本：** </br>

## IoBroker 的 XSense 适配器
此 ioBroker 适配器可将 [XSense 设备](https://de.x-sense.com/) 集成到 ioBroker 智能家居系统中。
它旨在接收来自 XSense 烟雾探测器、一氧化碳探测器和其他兼容设备的数据，并将其用于 ioBroker 的自动化和监控。
该适配器与 XSense 云服务器通信，并提供一种将 XSense 设备轻松集成到现有 ioBroker 设置中的方法。
需要 XSense Bridge SBS50。

---

## ❗ 警告
轮询间隔过短（默认值：5 分钟）会缩短设备电池寿命，因为设备**总是**被明确唤醒。
该适配器**不**用于警报目的——它主要用于监控设备电池状态。

---

### 🔧 支持的设备
- 烟雾探测器
- 一氧化碳探测器
- 热探测器
- 漏水探测器
- 湿度计
- 基站（如果支持）

---

###⚠️ 要求
- 一个已注册设备的 XSense 帐户
- 互联网连接，实现云通信

---

###📦准备
由于 XSense 不允许同时从应用程序和第三方软件登录，因此建议遵循以下步骤：

- 在 XSense 应用程序中创建第二个帐户
- 使用新帐户登录，然后注销
- 使用您原来的帐户重新登录
- 将主帐户中的所需设备与新帐户共享
- 重新登录新帐户并接受邀请
- 最后，在适配器设置中输入新的帐户凭据

**或者**：您只能使用一个帐户，但缺点是您将不断从应用程序中注销。

---

## 🚀 安装 Python（如果尚未安装）
它必须是官方公开发布的 Python 版本。

💻 **Windows**

1. **安装 Python**
- 下载：[https://www.python.org/downloads/windows/](https://www.python.org/downloads/windows/)
- 在安装过程中，**启用“将 Python 添加到 PATH”**
- 然后验证：

```powershell
python --version
pip --version
```

- 随后，在“xsense.0.info.callPython”下的对象中输入“python”（默认值为“python3”）。

🐧 **Linux / Docker**

- 这会自动发生 - 只需在适配器设置中选择首选版本即可。

---

## ❗ 故障排除
如果安装了正确的版本，但适配器已经获取了错误的版本，请首先删除环境：

```
  rm -Rf /home/iobroker/.cache/autopy/venv/xsense-env
 ```

然后重新启动适配器。
如果仍然无法正常工作，请检查文件 /home/iobroker/.cache/autopy/venv/xsense-env/pyvenv.cfg。
该文件列出了与环境相关的 Python 版本——如有需要，请进行调整。
如果该文件不存在，则表示您等待适配器启动的时间不够长。

------------------------------------------------------------------------------
------------------------------------------------------------------------------

<img width="1029" height="438" alt="形象的" src="https://github.com/user-attachments/assets/86e4fd1c-1d4e-4234-a2ad-48b8dd9f418e" />

<img width="1387" height="779" alt="形象的" src="https://github.com/user-attachments/assets/f065c43d-125b-4ca4-a053-bbf4b926e1f6" />

------------------------------------------------------------------------------

## Changelog
### 0.0.18 (2025-09-06)
* (arteck) fix time state from device

### 0.0.17 (2025-09-06)
* (arteck) Dependencies have been updated

### 0.0.16 (2025-09-06)
* (arteck) Dependencies have been updated

### 0.0.15 (2025-08-17)
* (arteck) add forceRefresh button for manual refresh of device data

### 0.0.14 (2025-08-16)
* (arteck) add checkbox for windows
* (arteck) add timeout for python
* (arteck) fix state roles

### 0.0.13 (2025-08-03)
* (arteck) fix io-package

### 0.0.12 (2025-07-30)
* (arteck) fix util

### 0.0.11 (2025-07-30)
* (arteck) fix util missing

### 0.0.10 (2025-07-30)
* (arteck) pip auto install for linux

### 0.0.9 (2025-07-30)
* (arteck) fix callPython Object

### 0.0.8 (2025-07-30)
* (arteck) add callPython Object

### 0.0.6 (2025-07-29)
* (arteck) new error message

### 0.0.5 (2025-07-29)
* (arteck) serialnumber is a string

### 0.0.4 (2025-07-28)
* (arteck) fix language

### 0.0.3 (2025-07-28)
* (arteck) modify Debug method

### 0.0.2 (2025-07-28)
* (arteck) initial release

### 0.0.1 (2025-07-27)
* (arteck) initial release

## License

MIT License

Copyright (c) 2025 Arthur Rupp <arteck@outlook.com>,

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