---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.km200/README.md
title: 该适配器已弃用，不会进一步开发
hash: Ddot5xcNC6sREnW6nGImZAmdi9FoTlYzZ74ir13C2YE=
---
# 该适配器已弃用，不会进一步开发

![NPM版本](http://img.shields.io/npm/v/iobroker.km200.svg)
![下载](https://img.shields.io/npm/dm/iobroker.km200.svg)
![安装数量](http://iobroker.live/badges/km200-installed.svg)
![特拉维斯-CI](http://img.shields.io/travis/frankjoke/ioBroker.km200/master.svg)
![国家公共管理](https://nodei.co/npm/iobroker.km200.png?downloads=true)

-----

目前没有计划进一步开发该适配器。 __请迁移到已维护的 ioBroker.ems-esp 适配器__。
如果您错过了 ioBroker.ems-esp 的任何功能，请在该存储库中提出问题 (https://github.com/tp1de/ioBroker.ems-esp/issues)。

ioBroker.km200 将保持可用一段时间，但请记住，它不会适应节点 20 和即将推出的 js-controller v5。

-----

# IoBroker.km200
## 适用于布德鲁斯 KM50/KM100/KM200/KM300 和 Junkers/博世 MB LANi
![标识](../../../en/adapterref/iobroker.km200/admin/km200.png)

[德语手册](README_DE.md)

该适配器支持以下加热系统：

*布德鲁斯与[网络适配器](https://www.buderus.de/de/produkte/catalogue/alle-produkte/7719_gateway-logamatic-web-km200-km100-km50)KM50、KM100、KM200和KM300
* Junkers 带有 [网络适配器](https://www.bosch-smarthome.com/de/mblani) MB LANi
* 博世配备 [网络适配器](https://www.bosch-smarthome.com/en/mblani) MB LANi

为了访问系统，代码最初由 Andreas Hahn 开发，并在他的博客[此处输入](https://www.andreashahn.info/2014/07/kernthema-am-eigenen-leibe) 和 [此处输入](https://www.andreashahn.info/2014/08/easycontrol-pro-unter-der-lupe-oder-m)中进行了描述。

加热系统可以通过布德鲁斯网站 ([https://www.buderus-connect.de]) 或通过手机上的“EasyControl”应用程序进行控制。应用程序和布德鲁斯网站也适用于容克斯和博世供暖系统。

现在这在两个方向上都取得了成功，并且适配器已经完全可用。

为此，必须首先在手机上安装该应用程序并设置私人密码。
该应用程序要求提供设备密码和设备登录名。

适配器仍然需要 IP（或网络名称，例如“BuderusKM200.fritz.box”）和端口地址（设备上的端口 80，但如果您通过路由器更改它......）。

如果添加一个“！”在地址末尾，适配器将在调试模式下工作并提供大量信息！

由于适配器必须从系统查询数据，因此您必须指定更新间隔。
由于每次更新都需要单独的查询，因此该时间设置为至少 5 分钟。

您可以使用黑色/推送列表来隐藏或显示某些数据并减少状态数量。
该列表由类似于 RegExp 的字符串组成（它们由适配器转换为），然后使用它们过滤加热器中的服务。

语法是，最开始的 `+` 意味着该字段不应被跳过，即使另一个规则会阻止它。
`-` 就像什么都没有一样，会导致数学状态被阻止。
每场匹配由 `,` 分隔，并且可以包含 `/` 或 `^` 作为开头，`*` 匹配所有内容，以及 `语法是，最开始的 `+` 意味着该字段不应被跳过，即使另一个规则会阻止它。
`-` 就像什么都没有一样，会导致数学状态被阻止。
每场匹配由 `,` 分隔，并且可以包含 `/` 或 `^` 作为开头，`*` 匹配所有内容，以及  匹配结尾。

字符串区分大小写。如果您想知道找到哪些状态，请打开调试模式并删除所有阻止，然后您将看到创建的所有状态，并可以使用阻止列表阻止一些不需要的数据。
示例：使用 `+*temp*`，您可以淡入所有包含“temp”的内容，使用 `_Hourly字符串区分大小写。如果您想知道找到哪些状态，请打开调试模式并删除所有阻止，然后您将看到创建的所有状态，并可以使用阻止列表阻止一些不需要的数据。
示例：使用 `+*temp*`，您可以淡入所有包含“temp”的内容，使用 ，您可以阻止所有末尾有“_Hourly”的内容，两者组合将阻止所有结尾处没有“_Hourly”的内容temp 以他们的名义。

示例列表类似于 `/gateway*, /recordings*,*SwitchPrograms*,/HeatSource*, *HolidayModes*`，隐藏了约 180 条记录中的大约 90 条。

现在还有另外两种可用的时间表，快速（适用于轮询速度快于每 30 分钟的州）和慢速（适用于按小时或多小时周期轮询的州）。

这使您可以跟踪一些信息，例如 1-5 分钟周期的温度和正常 20 分钟周期的其他项目。通常一小时内也不会改变的数据（例如 _Daily$ 或 _Monthly$ 以及其他一些一般数据）甚至不需要每 30 分钟读取一次，因为它们不会改变。此策略有助于更快地读取重要数据，并减慢读取不那么重要的数据。

用于记录的数据是加热系统内的（小）历史数据。有 3 种不同的可用方式：_每小时、_每日和每月。
每小时通常涵盖过去 48 小时。 _最近2个月的每日和不超过一年的每月，均从当前读出时间开始。某些数据点确实显示较少的数据点。
您必须了解适配器从每个记录数据点的 3 个单独调用中收集数据。

`switchPrograms` 现在也可以读取和写入，它是一个反映工作日数组的 JSON 字符串。上传时请不要更改格式，仅更改数字。数字似乎是分钟，只能设置为 15 分钟增量。

从 V 1.1.2 开始，括号和逗号可以省略，并且阻塞/推送的值只能用逗号写入。

### 如果 km200 是从 1.1 版本更新的，则很重要。*
如果您输入了 64 个字符的访问密钥，则不需要密码，但不应留空，只需填写任何内容即可。

＃＃ 重要的
* 适配器需要节点 >= v16.*.*

＃＃ 去做
* 额外的语言支持和文本翻译

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.0.5 (2023-07-09)
* (McM1957) Missing dependy to iobroker/adapter-core has been added
* (McM1957) Eslint has been activated and required adaptions to code have been done.
* (McM1957) dependencies have been updated

### 2.0.4
* fixed issue with js-controller version 5

### 2.0.3

* Adapter config update
* Blacklist is working now for any combination
* Added option not to delete unsused states

### 1.9.9

* Beta for v2.0.0
* Implemented recordings for hourly, daily and monthly data
* Changed readout for 'mins' units to enable these fields for read/write
* Implemented 2 additional time schedule where you can define fast cycle (1-30 minutes), normal with 30-60 minutes and slow with 1-24 hours. You define the lists whjich go to fast or slow in a similar way than the blocklist.
* Blocklist syntax changed sligly. `/` or `^` first is for from beginning, `*` can now be everywhere and `$` can be the end
* `switchPrograms` are supported now for read and write!

### 1.2.4

* Beta for next version, recordings supported

### 1.2.3 
* Implemented a correction to show also switchPrograms

### 1.2.2
* Adapter works also only with accesskey iin old 64 digit hex format without private passwort.

### 1.2.1 
* Adapter supports now compact mopde
* Adapter uses other module and removes need for mcrypt which makes it working on all platforms
* Adapter can now have debug mode set via '!' at end of address
* Adapter needs node >=v6

### 1.2.0
* Integrating Schupu's changes and also make the adapter ready for compact mode
* Update of adapter should continue to work with old settings

### 1.1.7
* (Schmupu) Supports Admin3
* (Schmupu) Only device password and own password needed. You do not have to get the access code anymore.

### 1.1.6
Adapter communication and retries more often to catch more errors.
* Writes are also retried
Added blocklist text in config screen

### 1.1.2
* Adapter handles better communication and retries if he got an error.
* you can set debug-mode by adding 'debug!' in front of host.
* Host port is not required and can be added to hostname with: xxx at end.
* Simpler blocklist handling, which does not ask for device which services are blocked

### 0.4.3
* Renamed repository to ioBroker.km200

### 0.4.3
Cleaning of objects / states for current adapters instance which are not part of scanned services anymore.

### 0.4.2
* Some small bug fixes and added some debug logs. Removed so dependency of 'request' and 'async' modules.

### 0.4.1
  Have only 'request' and 'async' with --save now also registered in the package.json ... Remember: Nuícht --save forget :(!

### 0.4.0
  Strings with allowedValues ​​are now converted to ioBroker states in both directions (read & write)

### 0.3.0
  Setting variables with numbers or strings now works.
  Thus, e.g. Target temperatures are changed.
  TODO: Enums and set tables

### 0.2.0
  Adapter now works with blacklist and in read-only mode.
  TODO: Implement setting values ​​in the heating system
  TODO: Implement variables with ENUMS (value lists)

### 0.1.0
  First test

## License
The MIT License (MIT)

Copyright (c) 2023 iobroker-community-adapters
Includes code copyright (c) 2016-2019 Frank Joke (frankjoke@hotmail.com)
Includes communications and crypto routines copyright (c) 2014 Andreas Hahn km200@andreashahn.info

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