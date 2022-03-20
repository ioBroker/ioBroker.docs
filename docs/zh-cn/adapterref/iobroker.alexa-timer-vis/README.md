---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.alexa-timer-vis/README.md
title: ioBroker.alexa-timer-vis
hash: qK2vCk0Xr00VkH9SH6WvNfXP/NlYo+M7fIyb48aYTXY=
---
![标识](../../../en/adapterref/iobroker.alexa-timer-vis/admin/alexa-timer-vis.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.alexa-timer-vis.svg)
![下载](https://img.shields.io/npm/dm/iobroker.alexa-timer-vis.svg)
![安装数量](https://iobroker.live/badges/alexa-timer-vis-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/alexa-timer-vis-stable.svg)
![新PM](https://nodei.co/npm/iobroker.alexa-timer-vis.png?downloads=true)

# IoBroker.alexa-timer-vis
**测试：** ![测试和发布](https://github.com/MiRo1310/ioBroker.alexa-timer-vis/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 alexa-timer-vis 适配器
输出 Alexa 计时器以显示在 vis 中

### 这是我的 vis 的一个例子
![](../../../en/adapterref/iobroker.alexa-timer-vis/admin/timer.png)

## 功能
通过 Alexa 创建一个或多个通过语音输入的计时器，由适配器评估并写入状态，以使它们在 Vis 中可见。因此，如果您同时有多个计时器处于活动状态，您将获得更好的概览。

* ---- 需要 Alexa2 适配器 ----
* Vis Widget 尚未集成
* 每个定时器都有一个按钮，用来停止它。停止 Alexa 和适配器中的计时器
* 可以通过语音命令使用 Alexa 创建无限计时器。
* 启动适配器时，将创建 4 个文件夹，其中包含所有状态。
* 通过 Alexa 的语音输入创建第 5 个或更多计时器后，将立即创建其他文件夹。
* 它适用于德语输入
* 配置为德语语音输入，英语（实验性）

### 定时器添加（示例）
* Alexa，定时器 5 分钟
* Alexa，薯条定时器 9 分钟
* Alexa，设置一个 1 小时 30 分钟的计时器
* Alexa，设置一个 2 小时的计时器
* Alexa，定时器 120 分钟
* Alexa，定时器 9 分钟意大利面

### 定时器删除（示例）
* Alexa，删除所有计时器
* Alexa，删除薯条定时器
* Alexa，删除 5 分钟计时器

###如果您有任何改进或添加其他功能的建议，请随时与我们联系

## Changelog
### 0.1.12 (15.02.2022)
* Delete of Timer fixed
### 0.1.11 (12.02.2022)
* Delete of Timer with same Inputvalue, fixed
* User can set the Intervall in admin
### 0.1.9 (30.1.2022)
* Bugfix
### 0.1.8 (28.01.2022)
* Bugfix
* Button added to stop the Timer
### 0.1.7 (22.06.2022)
* New State, "Input Device"
### 0.1.6 (17.01.2022)
* numbers from 1-9 are always displayed as two digits, 1 => 01
* When you update to this or a newer Version, please delete the timer folders or delete the whole adapter, otherwise errors will occur
### 0.1.5 (08.01.2022)
* New keywords added
### 0.1.4 (05.01.2022)
* States will be reset on adapter unload
* Bugfix
### 0.1.3 (02.01.2022)
* Start and EndTime added
### 0.1.2 (31.12.2021)
* Bugfix (A double created Intervall, fixed)
### 0.1.1 (29.12.2021)
* Adaptation to the English language (experimental)
* Anpassung an die Englische Sprache (experimentell)
### 0.1.0 (28.12.021)
* Fixed bug when deleting intervals and timeouts after shutdown
* Fehler beim Löschen von Intervallen und Timeouts nach dem Shutdown, behoben
### 0.0.4 (27.12.2021)
* Adaptation to various options for entering a timer
* Anpassung an verschiedener Möglichkeiten der Eingabe eines Timers
### 0.0.3 (26.12.2021)
* (Michael Roling) Bugfix
### 0.0.2 (26.12.2021)
* (Michael Roling) Bugfix
### 0.0.1 (25.12.2021)
* (Michael Roling) initial release

## License
MIT License

Copyright (c) 2021-2022 Michael Roling <michael.roling@gmx.de>

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