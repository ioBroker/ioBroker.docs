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
hash: PiZ4XJCJshjXGglMy02J8onIWW6Y8nsFhwDZoBad/jU=
---
![标识](../../../de/adapterref/iobroker.xsense/admin/xsense.png)

![NPM](https://nodei.co/npm/iobroker.xsense.png?downloads=true)
![NPM 版本](http://img.shields.io/npm/v/iobroker.xsense.svg)
![下载](https://img.shields.io/npm/dm/iobroker.xsense.svg)
![GitHub 最新提交](https://img.shields.io/github/last-commit/arteck/ioBroker.xsense)
![GitHub 问题](https://img.shields.io/github/issues/arteck/ioBroker.xsense)
![执照](https://img.shields.io/badge/License-MIT-blue.svg)
![安装数量](http://iobroker.live/badges/xsense-installed.svg)
![测试版](https://img.shields.io/npm/v/iobroker.xsense.svg?color=red&label=beta)
![稳定的](https://iobroker.live/badges/xsense-stable.svg)

# IoBroker.xsense
=================

版本：

## IoBroker 的 XSense 适配器
这款 ioBroker 适配器可将 [XSense 设备](https://de.x-sense.com/) 集成到 ioBroker 智能家居系统中。

它旨在接收来自 XSense 烟雾探测器、一氧化碳探测器和其他兼容设备的数据，使这些数据可在 ioBroker 中用于自动化和监控。

该适配器与 XSense 云服务器通信，并提供了一种将 XSense 设备轻松集成到现有 ioBroker 设置中的方法。

需要 XSense Bridge SBS50。

## [原始 Python 代码](https://github.com/theosnel/python-xsense) 来自 [theosnel]](https://github.com/theosnel) .. 非常感谢
---

## ❗ 警告
此适配器**并非**设计用于报警功能，其主要用于监测设备电池状态。

若发生火灾，本人概不负责。

---

### 🔧 支持的设备
烟雾探测器
一氧化碳探测器
- 热探测器
- 漏水检测器
湿度计
- 基站（如果支持）

---

### ⚠️ 要求
- 拥有已注册设备的 XSense 帐户
用于云通信的互联网连接

---

### 📦 准备工作
由于 XSense 不允许同时从应用程序和第三方软件登录，建议按照以下步骤操作：

- 在 XSense 应用中创建第二个帐户
使用新帐户登录，然后注销
- 使用您的原始帐户重新登录
- 将主帐户中的所需设备共享到新帐户
- 重新登录新帐户并接受邀请
最后，在适配器设置中输入新帐户凭据。

**或者：**您只能使用一个帐户，缺点是您会不断被登出应用程序。

---

## 🚀 安装 Python（如果尚未安装）
必须是官方公开发布的Python版本。

💻 **Windows**

1. 安装 Python
- 下载：[https://www.python.org/downloads/windows/](https://www.python.org/downloads/windows/)
安装过程中，请启用“将 Python 添加到 PATH”选项。
然后进行核实：

```powershell
python --version
pip --version
```

- 之后，在 `xsense.0.info.callPython` 下的对象中，输入 `python`（默认值为 `python3`）。

🐧 **Linux / Docker**

- 这会自动发生——只需在适配器设置中选择首选版本即可。

---

## ❗ 故障排除
如果已安装正确的版本，但适配器已获取到错误的版本，请先删除环境变量：

```
  rm -Rf /home/iobroker/.cache/autopy/venv/xsense-env
 ```

然后重启适配器。

如果仍然无效，请检查文件 /home/iobroker/.cache/autopy/venv/xsense-env/pyvenv.cfg。

该文件列出了与环境相关的 Python 版本——如有必要，请进行调整。

如果该文件不存在，则说明您等待适配器启动的时间不够长。

安装后出现错误信息

[XSense] 找不到软件包“@mongodb-js/zstd”

请检查您的 Node 版本。zstd 与 Node 24 存在兼容性问题。

或者，如果您在 Proxmox 上运行虚拟机，请检查您的 CPU 设置。 <img width="676" height="140" alt="形象的" src="https://github.com/user-attachments/assets/68658aab-5336-4493-9a51-f833c3238a5a" />

------------------------------------------------------------------------------
------------------------------------------------------------------------------

<img width="1029" height="438" alt="形象的" src="https://github.com/user-attachments/assets/86e4fd1c-1d4e-4234-a2ad-48b8dd9f418e" />

<img width="2028" height="577" alt="形象的" src="https://github.com/user-attachments/assets/65cc5c71-4cd3-4502-b4bd-a4c7241d7708" />

------------------------------------------------------------------------------
<!--

### **正在进行中** -->

## Changelog
### 0.3.6 (2026-01-26)
* (arteck) typo
*

### 0.3.5 (2026-01-26)
* (arteck) check object isLifeEnd

### 0.3.4 (2026-01-25)
* (arteck) fix bridge with hex

### 0.3.3 (2026-01-25)
* (arteck) fix battery state

### 0.3.2 (2026-01-25)
* (arteck) update settings

### 0.3.1 (2026-01-25)
* (arteck) update settings

### 0.3.0 (2026-01-25)
* (arteck) update settings

### 0.2.6 (2026-01-24)
* (arteck) update settings

### 0.2.5 (2026-01-24)
* (arteck) Dependencies have been updated

### 0.2.4 (2026-01-24)
* (arteck) add MQTT communication to Bridge. Xsense app Version > 1.34 is necessary

### 0.2.3 (2026-01-15)
* (arteck) add new smoke detectors

### 0.2.2 (2025-12-03)
* (arteck) add XS0D-MR

### 0.2.1 (2025-10-30)
* (arteck) fix link to readme
* (arteck) fix load bridge as first

### 0.2.0 (2025-10-21)
* (arteck) !!!!!!!!!!!!!!!!!!!!!!!   new tree structure, delete all old devices
* (arteck) fix for more bridges

### 0.1.3 (2025-10-20)
* (arteck) fix for more devices than 15

### 0.1.2 (2025-10-06)
* (arteck) fix error message

### 0.1.1 (2025-10-04)
* (arteck) fix

### 0.1.0 (2025-10-04)
* (arteck) improved query handling
* (arteck) add Test button with answer message
* (arteck) shorter request interval (min 10 sec)

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

Copyright (c) 2025-2026 Arthur Rupp <arteck@outlook.com>,

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