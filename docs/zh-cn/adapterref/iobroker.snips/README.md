---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.snips/README.md
title: ioBroker.snips ![标志](admin/snips.png)
hash: JpIjjtnNgvaIHPCyi4HJt1SJk61t2dSjkHx2qZsNGRA=
---
# IoBroker.snips ![标识](../../../en/adapterref/iobroker.snips/admin/snips.png)

![安装数量](http://iobroker.live/badges/snips-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.snips.svg)
![下载](https://img.shields.io/npm/dm/iobroker.snips.svg)
![新产品管理](https://nodei.co/npm/iobroker.snips.png?downloads=true)

[![构建状态](https://app.travis-ci.com/unltdnetworx/ioBroker.snips.svg?branch=master)](https://travis-ci.org/unltdnetworx/ioBroker.snips)

注意：适配器不再开发或维护，因为 Sonos 购买了 Snips，并且免费平台已于 2020 年 2 月 1 日停产。适配器和安装的 snips 设备仍然可以工作。

需要 node.js 6.0 或更高版本和 Admin v3！

该适配器通过 MQTT 与 Snips 硬件通信。执行命令需要 text2command 适配器。

Snips 网址：<https://makers.snips.ai/>

## 安装截图
对于 Debian Stretch (x86), Raspbian / Armbian Stretch (RPI3, Odroid) 下的 Snips，请安装以下软件包：

lsb-release apt-transport-https ca-certificates systemd systemd-sysv libttspico-utils alsa-utils dirmngr mosquitto snips-asr snips-audio-server snips-dialogue snips-hotword snips-nlu snips-tts snips-injection

根据您的硬件和 Linux 发行版，您可能已经安装了软件包。

Raspian / Armbian 的安装说明和配置：<https://snips.gitbook.io/documentation/installing-snips/on-a-raspberry-pi>

Debian 安装说明和配置： sudo nano /etc/apt/sources.list 每行附加“non-free”，否则无法安装包“libttspico-utils”。
<https://snips.gitbook.io/documentation/advanced-configuration/advanced-solutions>

登录到 <https://console.snips.ai> 并添加一个新向导。
在复选标记“仅显示具有操作的应用程序”上方添加一个应用程序，然后搜索 iobroker ![ioBroker 剪下应用程序徽标](https://console.snips.ai/images/bundles/bundle-home.svg) 并选择。
完成后，按 Deploy Assistant 下载 ZIP 文件。
zip 文件在 snips 机器上的“/usr/share/snips”下解压，然后重启。

在我们继续这里之前，Snips 应该可以工作：

### 配置 Snips 适配器
Url：Snips-MQTT-Servers 的地址 Port：Snips-MQTT-Servers 的端口 Instanz：Text2Command-Instanz（例如 0） 过滤器：例如了解 ClientID：ID（例如 0）

### 配置 Text2Command 适配器
在 ID snips.X.devices.all.send.say.text 中的 Answer 下插入 Text2Command 适配器的配置。

### 注入（学习新单词）
未知单词可以在 snips.0.send.inject.room 或 device 下学习。
注意：注入服务必须安装在设备/服务器上 sudo apt-get install -y snips-injection

## Changelog

### 1.5.1

* (unltdnetworx) new adapter testing and security update

### 1.5.0

* (unltdnetworx) removal of language support, may come back

### 1.4.0

* (unltdnetworx) multilingualism support for german and english

### 1.3.1

* (unltdnetworx) add multilingual blinds/switch-rule

### 1.3.0

* (unltdnetworx) preparation for multilingualism support

### 1.2.1

* (unltdnetworx) bugfix for multiple devices in stellite's room

### 1.2.0

* (unltdnetworx) possibility to enforce the room for a satellite

### 1.1.7

* (unltdnetworx) security update because of vulnerability in pulled by mqtt-dependency mqtt-package

### 1.1.6

* (unltdnetworx) activation/deactivation of hotword recognition for each satellite (mute)

### 1.1.5

* (unltdnetworx) bugfixes for adapter-testing

### 1.1.4

* (unltdnetworx) control soundfeedback for every satellite

### 1.1.3

* (unltdnetworx) delete states after session ended

### 1.1.2

* (unltdnetworx) create satellites manually

### 1.1.1

* (apollon77) Update CI testing

### 1.1.0

* (unltdnetworx) support for satellites

### 1.0.1

* (wal) bugfix memoryleak

### 1.0.0

* (wal) stable version

### 0.3.1

* (unltdnetworx) bugfix for not recognized slots

### 0.3.0

* (unltdnetworx) slots reduced to two

### 0.2.2

* (unltdnetworx) slot setBoolean changed to setDevice

### 0.2.1

* (unltdnetworx) slot-type names converted to singular

### 0.2.0

* (unltdnetworx) support for compact-mode added

### 0.1.1

* (unltdnetworx) 2 new slots added incl. injection

### 0.1.0

* (wal) add soundfeedback

### 0.0.9

* (unltdnetworx) testadapter and slots added

### 0.0.8

* (wal) adaptation for new snips version

### 0.0.7

* (wal) file corrupt

### 0.0.6

* (wal) add receive.text

### 0.0.5

* (wal) bugfix injection

### 0.0.4

* (wal) add hotword recognize

### 0.0.3

* (wal) add filter and text2command_Instanz

### 0.0.2

* (wal) first working adapter

### 0.0.1

* (wal) initial release

## License

The MIT License (MIT)

Copyright (c) 2020 Michael Schuster <development@unltd-networx.de> & Walter Zengel <w.zengel@gmx.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.