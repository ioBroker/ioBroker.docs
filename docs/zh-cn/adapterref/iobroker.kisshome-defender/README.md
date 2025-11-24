---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.kisshome-defender/README.md
title: ioBroker KISSHome 防御者
hash: 50h0m5iXAkiRNs6IQJaZ2xmqGFmaMeU05ZBQJbeHGLQ=
---
![标识](../../../en/adapterref/iobroker.kisshome-defender/admin/kisshome-defender.png)

![安装数量](http://iobroker.live/badges/kisshome-defender-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.kisshome-defender.svg)
![下载](https://img.shields.io/npm/dm/iobroker.kisshome-defender.svg)

# IoBroker KISSHome 捍卫者
![测试与发布](https://github.com/ioBroker/ioBroker.kisshome-defender/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/kisshome-defender/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用 Sentry 库自动向开发者报告异常和代码错误。** 更多详情以及如何禁用错误报告，请参阅 [Sentry插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！Sentry 报告功能从 js-controller 3.0 开始使用。

这款专用适配器是为 KISSHome 防御项目开发的，不适用于一般用途。

要使用此适配器，您必须先在 [KISSHome 防守队员](https://kisshome-defender.if-is.net) 网站上注册并获得确认电子邮件。

要运行此适配器，您需要：

- 超过 3 台智能家居设备
- Fritz!Box 路由器。如果没有 Fritz!Box，适配器将无法工作。
- iobroker 必须运行在 debian/raspbian 系统上（或者至少运行在 linux 系统上，因为 linux 系统可以使用以下命令：`which`、`rsync`）。
- 用户 `iobroker` 必须安装并启用 Docker 才能运行 IDS 容器

### 为用户 iobroker 启用 Docker
要在较旧的 Linux 系统上安装 Docker，您必须执行以下操作 [步骤](https://docs.docker.com/engine/install/debian/)

对于较新的系统（Debian 12、Ubuntu 22.04 及更高版本），您可以使用以下命令安装 Docker：

```bash
sudo apt update
sudo apt install -y docker-ce
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker iobroker
```

将 docker 命令添加到 sudoers 文件中：

```bash
sudo visudo /etc/sudoers.d/iobroker
```

添加以下行：

```text
iobroker ALL=(ALL) NOPASSWD: /usr/bin/docker
```

<!-- 下一版本的占位符（位于行首）：

### **正在进行中** -->

## Changelog
### 1.1.12 (2025-11-12)
-   (@GermanBluefox) Changed german name of adapter
-   (@GermanBluefox) Sync names of PCAP files

### 1.1.10 (2025-11-09)
-   (@GermanBluefox) Showed progress devices that have only IP address

### 1.1.9 (2025-11-06)
-   (@GermanBluefox) Try to handle 127.0.0.1 as no bind given
-   (@GermanBluefox) Recreate IDS container on error if self-hosted
-   (@GermanBluefox) Limit minimal interval for sending PCAPs to 10 minutes

### 1.1.8 (2025-11-05)
-   (@GermanBluefox) Allowed only selection IPv4 addresses and not loopback for communication with docker

### 1.1.7 (2025-11-05)
-   (@GermanBluefox) Corrected error if device is offline
-   (@GermanBluefox) Show error codes 400-499 as warning and not as error

### 1.1.6 (2025-11-04)
-   (@GermanBluefox) Showed error message if IDS has an error

### 1.1.5 (2025-11-04)
-   (@GermanBluefox) Destroy docker container on adapter stop
-   (@GermanBluefox) Required admin 7.7.19 as dependency

### 1.1.3 (2025-11-01)
-   (@GermanBluefox) Disabled by default self-hosted docker option
-   (@GermanBluefox) Changed default threshold value

### 1.1.1 (2025-10-31)
-   (@GermanBluefox) Changed the calculation of the first occurrence time
-   (@GermanBluefox) Added link to FAQ in email

### 1.1.0 (2025-10-30)
-   (@GermanBluefox) Corrected JSON config

### 1.0.20 (2025-10-29)
-   (@GermanBluefox) Do not send empty error log
-   (@GermanBluefox) Do not send config too often
-   (@GermanBluefox) Changed wording

### 1.0.16 (2025-10-28)
-   (@GermanBluefox) Added error log proxying

### 1.0.15 (2025-10-27)
-   (@GermanBluefox) Reset the file upload state if IDS restarting
-   (@GermanBluefox) Hide some control elements if instance is offline
-   (@GermanBluefox) Added countdown to the manual trigger button
-   (@GermanBluefox) Send configuration to the container at start

### 1.0.11 (2025-10-23)
-   (@GermanBluefox) Disable docker settings if not possible

### 1.0.10 (2025-10-21)
-   (@GermanBluefox) Increased the saving data threshold

### 1.0.9 (2025-10-20)
-   (@GermanBluefox) Show digits after comma in charts

### 1.0.7 (2025-10-15)
-   (@GermanBluefox) Corrected the volume for docker
-   (@GermanBluefox) Added min,max,step for questionnaire (number)

### 1.0.6 (2025-10-08)
-   (@GermanBluefox) Improved selection of IP address

### 1.0.5 (2025-10-08)
-   (@GermanBluefox) Packages were updated
-   (@GermanBluefox) Corrected questionnaire
-   (@GermanBluefox) Send `save_threshold_seconds` to the container

### 1.0.4 (2025-09-24)
-   (@GermanBluefox) Allowed setting of the port and the bind address for Docker

### 1.0.1 (2025-09-22)
-   (@GermanBluefox) Fixing questionnaire under Firefox

### 1.0.0 (2025-09-19)
-   (@GermanBluefox) Removed sensitivity parameter
-   (@GermanBluefox) Corrected colors in the chart

### 0.3.2 (2025-09-11)

-   (@GermanBluefox) Corrected callback URL

### 0.3.1 (2025-09-10)

-   (@GermanBluefox) Implemented mobile view

### 0.3.0 (2025-09-08)

-   (@GermanBluefox) Implemented the daily status report

### 0.2.1 (2025-09-05)

-   (@GermanBluefox) Showed names of the devices in the chart legend

### 0.2.0 (2025-09-04)

-   (@GermanBluefox) Added direct link to the alarm in the widget

### 0.1.9 (2025-09-03)

-   (@GermanBluefox) Look for vis-(2) project with kisshome widget

### 0.1.8 (2025-09-03)

-   (@GermanBluefox) Fixed GUI issues
-   (@GermanBluefox) Send results to cloud sync folder

### 0.1.6 (2025-08-30)

-   (@GermanBluefox) Do not show scores for later time

### 0.1.5 (2025-08-29)

-   (@GermanBluefox) Fixing the detections in GUI

### 0.1.4 (2025-08-28)

-   (@GermanBluefox) Corrected message sending

### 0.1.3 (2025-08-28)

-   (@GermanBluefox) Removed test cases

### 0.1.1 (2025-08-27)

-   (@GermanBluefox) Initial commit

## License

The MIT License (MIT)

Copyright (c) 2025 Denis Haev <dogafox@gmail.com>

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