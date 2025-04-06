---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.asterisk/README.md
title: ioBroker Asterisk VoIP 适配器
hash: w6+gZownVvRYn+6/93/6nGk42ZMahVIJ7ZfDmtz++1o=
---
![标识](../../../en/adapterref/iobroker.asterisk/admin/asterisk.png)

![Travis CI 构建状态](https://travis-ci.org/schmupu/ioBroker.asterisk.svg?branch=master)
![AppVeyor 构建状态](https://ci.appveyor.com/api/projects/status/github/schmupu/ioBroker.asterisk?branch=master&svg=true)
![安装数量](http://iobroker.live/badges/asterisk-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.asterisk.svg)
![下载](https://img.shields.io/npm/dm/iobroker.asterisk.svg)
![新平台](https://nodei.co/npm/iobroker.asterisk.png?downloads=true)

# IoBroker Asterisk VoIP 适配器
[德语手册 / Deutsche Anleitung](README_DE.md)

Asterisk 适配器将文本消息转换为音频文件，然后通过 Asterisk 通过 VoIP 呼叫您想要的任何电话号码并播放音频消息。

## 安装/配置
Asterisk 必须连接到您的 voip 提供商（如 Telekom 或 Vodfone）或 FritzBox 才能拨打电话！请按照以下安装指南之一进行操作。

### Linux 软件包 / ioBroker 和 asterisk 与 ffmpeg 在同一台服务器上运行
```sh
sudo apt-get install ffmpeg
# if asterisk package is missing, follow the instructions "Install asterisk manual"
sudo apt-get install asterisk
```

### Linux 软件包 / ioBroker 和 asterisk 与 sox 在同一台服务器上运行
如果您在使用 ffmpeg 进行转码时遇到问题，您可以选择 sox 作为转码器。为此，您必须安装以下软件包并在适配器配置中选择 sox。

```sh
sudo apt-get install lame
sudo apt-get install sox
sudo apt-get install libsox-fmt-mp3
# if asterisk package is missing, follow the instructions "Install asterisk manual"
sudo apt-get install asterisk
```

### Linux 软件包 / ioBroker 和 asterisk 使用 ffmpeg 在不同的服务器上运行
```sh
# ioBroker server
sudo apt-get install ffmpeg
sudo apt install openssh-client
```

```sh
# asterisk server
# if asterisk package is missing, follow the instructions "Install asterisk manual"
sudo apt-get install asterisk
sudo apt-get install openssh-server
```

### Linux 软件包 / ioBroker 和 asterisk 使用 sox 在不同的服务器上运行
如果您在使用 ffmpeg 进行转码时遇到问题，您可以选择 sox 作为转码器。为此，您必须安装以下软件包并在适配器配置中选择 sox。

```sh
sudo apt-get install lame
sudo apt-get install sox
sudo apt-get install libsox-fmt-mp3
```

```sh
# asterisk server
# if asterisk package is missing, follow the instructions "Install asterisk manual"
sudo apt-get install asterisk
sudo apt-get install openssh-server
```

### 安装 asterix 手册
如果缺少 apt 包 asterisk，您可以手动安装 asterisk：

```sh
sudo apt install git vim curl wget libnewt-dev libssl-dev libncurses5-dev subversion libsqlite3-dev build-essential libjansson-dev libxml2-dev uuid-dev

cd /usr/src/
sudo wget https://downloads.asterisk.org/pub/telephony/asterisk/old-releases/asterisk-16.30.1.tar.gz
sudo tar xvf asterisk-16*.tar.gz
cd asterisk-16*/
sudo contrib/scripts/get_mp3_source.sh
sudo contrib/scripts/install_prereq install
sudo ./configure
sudo make menuselect

# Choose following packages in the menu:
## Add-ons: chan_ooh323 & format_mp3
## Core Sound Packages: Audio packets CORE-SOUNDS-EN-*
## Music On Hold: MOH-OPSOUND-WAV bis MOH-G729
## Extra Sound: EXTRA-SOUNDS-EN-WAV bis EXTRA-SOUNDS-EN-G729
## Applications: app_macro
## Exit with "Save&Exit".

sudo make
sudo make install
sudo make progdocs # (optional documentation)
sudo make samples
sudo make config
sudo ldconfig

sudo groupadd asterisk
sudo useradd -r -d /var/lib/asterisk -g asterisk asterisk
sudo usermod -aG audio,dialout asterisk
sudo chown -R asterisk:asterisk /etc/asterisk
sudo chown -R asterisk:asterisk /var/{lib,log,spool}/asterisk
sudo chown -R asterisk:asterisk /usr/lib/asterisk

# asterisk as default user for asterisk
sudo nano /etc/default/asterisk
AST_USER="asterisk"
AST_GROUP="asterisk"

# Insert/ replae follwoing in the config file /etc/asterisk/asterisk.conf
sudo nano /etc/asterisk/asterisk.conf
runuser = asterisk ; The user to run as.
rungroup = asterisk ; The group to run as

sudo ufw allow proto tcp from any to any port 5060,5061 # (optional open Firewall, if activ)

sudo systemctl restart asterisk
sudo systemctl enable asterisk

# Check state of asterisk
sudo systemctl status asterisk
sudo asterisk -rvv
```

### 星号的配置
以下文档详细描述了如何配置星号。

- 配置 [Asterisk 通过 SIP 与 FritzBox](docs/SIP_FRITZBOX.md) （最简单的方法）
- 配置 [Asterisk 通过 PJSIP 与 FriztBox](docs/PJSIP_FRITZBOX.md) (pjsip 比 sip 更现代)
- 配置 [Asterisk 通过 PJSIP 与 Telekom 作为提供商](docs/PJSIP_TELEKOM.md)
- 配置 [Asterisk 通过 PJSIP 以 Sipgate 作为提供商](docs/PJSIP_SIPGATE.md)

### 使用 SSH 进行配置
如果 iobroker 和 asterisk 安装在不同的网络用户上，则您需要在 asterisk 服务器上有一个具有 iobroker 服务器访问权限的用户，以便通过 ssh 登录。
用户必须具有 unix 用户权限才能写入文件，而 asterisk 可以读取这些文件。
在 asterisk 服务器上，您使用在 iobroker asterisk 适配器配置中配置的名称在 _'临时音频文件路径'_ 下创建目录。该路径必须可供 asterisk 和 ssh 访问和授权，因为 iobroker 通过 scp 将生成的音频文件（您的文本消息）发送到 asterisk 服务器并将其保存在“临时音频文件路径”中。
之后，ioBroker 将通过 AMI api 向 asterisk 发送一条消息，以拨号并播放保存在给定路径中的生成音频文件。

![远程控制](../../../en/adapterref/iobroker.asterisk/docs/iobroker_ssh.png)

使用星号
### 使用 Asterisk 和对象/状态进行拨出
使用 asterisk 的最简单方法是通过 ioBroker 对象页面。在那里，在 dialout 参数下填写以下值：

- 呼叫：按下按钮发起呼叫
- callerid：显示被叫方的电话号码
- dtmf：被叫方按下键盘上的数字
- telnr：要拨打的号码
- text：将向被叫方播放的文本
- 语言：文本将转换为该语言的音频

![iobroker_dialout](../../../en/adapterref/iobroker.asterisk/docs/iobroker_dialout.png)

### 使用 Asterisk 和对象/状态进行拨号
如果您配置了 SIP 提供商（例如 Fritzbox、Sipgate 等）和 Asterisk 配置以允许拨入呼叫，则可以设置以下参数

- callerid：呼叫 asteriks 的电话号码
- dtmf：呼叫者按下键盘上的数字
- text：将向呼叫者播放的文本
- 语言：文本将转换为该语言的音频

![iobroker_dialin](../../../en/adapterref/iobroker.asterisk/docs/iobroker_dialin.png)

### 使用 Asterisk 和 javascript 或 blocky 拨号
现在您可以在您的 javascript 或块状程序中使用该适配器。

```sh
const number   = '040 666-7766';
const callerid = '040 123 999'; // optional, if not set anonymous call
const msg      = 'Hello, this textmessage will be converted to audio';

// call telephone nummber 040 666-7766 and play text message as audio
sendTo('asterisk.0', 'dial', { telnr: number, callerid: callerid, text:  msg},  (res) => {
      console.log(`Result: ${JSON.stringify(res)}`);
});

// call telephone nummber 040 666-7766 and play mp3 audio file
// mp3 file has to exist on asterix server
sendTo('asterisk.0', 'dial', { telnr: number, callerid: callerid, audiofile: '/tmp/audio.mp3'},  (res) => {
      console.log(`Result: ${JSON.stringify(res)}`);
});

// call telephone nummber 040 666-7766 and play gsm audio file
// gsm file has to exist on asterix server
sendTo('asterisk.0', 'dial', { telnr: number, callerid: callerid, audiofile: '/tmp/audio.gsm'},  (res) => {
      console.log(`Result: ${JSON.stringify(res)}`);
});

// create dial in message
sendTo('asterisk.0', 'dial', { text:  'Please enter PIN after hashtag.' },  (res) => {
      console.log(`Result: ${JSON.stringify(res)}`);
});

// Show entered DTMF code
on({ id: 'asterisk.0.dialin.dtmf'/*DTMF Code*/ },  (obj) => {
    const dtmf = obj.state.val;
    console.log(`DTMF: ${dtmf}`);
});

// Show entered DTMF code
on({ id: 'asterisk.0.dialout.dtmf'/*DTMF Code*/ },  (obj) => {
    const dtmf = obj.state.val;
    console.log(`DTMF: ${dtmf}`);
});

```

> 您可以在 sendTo dial 语句中使用以下参数： > > - **language**：文本转语音 (tts) 功能所采用的语言。（允许的值：'DE'、'EN'，... 默认值为 ioBroker 系统语言） > - **repeat**：音频消息应重复多少次（允许值：1 到 n，默认值为 5） > - **priority**：如果您并行发送多个 sendTo dial 语句，则优先级最小的消息将首先发送（允许值：1 到 n，默认值为 1） > - **text**：将作为音频发送的文本消息 > - **timeout**：等待连接发生的超时时间（以毫秒为单位）（默认为 60000 毫秒） > - **async**：允许在不等待响应的情况下生成多个调用（允许值：false/true，默认值为 false） > - **audiofile**：如果您使用文本参数。转换为音频的文本将保存在音频文件中。如果音频文件存在，它将被覆盖。如果您不使用参数文本，则将播放音频文件。
> - **callerid：** 定义标识符（您的发送方电话号码）。如果缺少 callerid，则转移的电话号码将是匿名的 > - **telnr：** 要拨打的电话号码。

解决问题
如果您在使用 asterisk 时遇到问题，您可以尝试在 /var/log/asterisk 下的日志文件中查找一些内容。启动 asterisk 后，您可以在命令 shell 上使用 asterisk -rvvvvvv 调用 asterisk 进行调试。启动 asterisk -rvvvvvv 后，您可以通过 iobroker 初始化调用并查看会发生什么。

## Changelog
### 2.0.3 (2025-03-30)

- (Stübi) Bugfixing in sendto function
- (Stübi) Add Object repeat
- (Stübi) Fixing @iobroker/adapter-dev 1.0.1 specified. 1.3.0 is required as minimum, 1.3.0 is recommended (Issue #57)
- (Stübi) Fixing dependency (Issue #58)
- (Stübi) Fixing issue with missing template directory (Issue #56 and #65)

### 2.0.2 (2025-02-01)

- (Stübi) Add Create Directory
- (Stübi) Add translation for configuration
- (Stübi) Bugfixing

### 2.0.1 (2025-01-24)

- (Stübi) Fix error by using asterisk and iobroker on the same server
- (Stübi) Add action command for send messages
- (Stübi) Add dial in command for send messages
- (Stübi) Add create butteon for create dial in file

### 2.0.0 (2025-01-24)

- (Stübi) Redesign of Asterisk
- (Stübi) Switching from Javascript to Typescript
- (Stübi) Nodes 20 and 22 are now supported
- (Stübi) js controllers in versions 6 and 7 are supported
- (Stübi) Attention: Passwords must be re-entered from this version!
- (Stübi) Language object added
- (Stübi) Revision of the reconnect if Asterisk is restarted once
- (Stübi) Fixing errors from repository checker (Issue #51)
- (Stübi) Add documentation how to install asterisk manual (Issue #33)

### 1.0.6 ((2019-02-27)

- (Stübi) Update documentation and templates
- (Stübi) Asterisk adapter can create now asterisk configuration files. You have to rename and move them afterwards to the /etc/asterisk directory
- (Stübi) a new documentation for using Sipgate as provide.
- (Stübi) Now you can call internal fritzbox numbers. You must change your extensions.ael if you install the version 1.0.4! (replace **10 => { ... }** with **\_. => { ... }**)
- (Stübi) You can install asterisk on a different server and use scp to transfer audio files from ioBroker to asterisk.
- (Stübi) You can use the service PJSIP instead of SIP now.
- (Stübi) Support js-controller compact mode
- (Stübi) Calling without extension, if you do not use the fritzbox for example (leave sip.conf username in adapter config empty)
- (Stübi) Instead of ffmpeg you can use now sox too
- (Stübi) Update with languages
- (Stübi) Add Callerid to dialin states
- (Stübi) A lot of new features. Now you can call ioBroker / Asterisk by telephone number and enter a DTMF Code.
- (Stübi) You can enter a DTMF Code if you get called by ioBroker / Asterisk
- (Stübi) Bugfixing and password will be saved encrypted and text message size can be unlimited
- (Stübi) First Version

## License

The MIT License (MIT)

Copyright (c) 2025 Thorsten Stueben <thorsten@stueben.de> / <https://github.com/schmupu>

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