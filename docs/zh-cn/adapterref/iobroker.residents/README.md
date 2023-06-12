---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.residents.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.residents.svg
BADGE-Number of Installations: https://iobroker.live/badges/residents-installed.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/residents-stable.svg
BADGE-NPM: https://nodei.co/npm/iobroker.residents.png?downloads=true
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.residents/README.md
title: 居民
hash: ZTA45eYXfVkiwThISlNrnOQqoQYoEAF1v93Rk/ct5OQ=
---
# 居民
此适配器有助于映射每个室友的存在和活动状态。由此，形成所有室友的合乎逻辑的整体状态以及他们在家中的存在或当前活动。居民由他们自己的室友、客人或宠物类型的虚拟设备表示。

我们可以区分短期缺勤和长期缺勤，并对预期回报具有一定的预测能力。根据此信息，在长时间缺席期间，可以比平时略微或更多地减少供暖。当居民在回家的路上时，房子知道为即将到来的人做好准备。

除了简单的在场/不在逻辑之外，在家醒着或睡着这一事实也增强了在场感。这里支持一个相当复杂的睡眠和醒来过程，为每个人和房子本身提供舒适的醒来程序。

该适配器还旨在_在未来_支持复杂的通知路由系统。这允许将消息从您自己的脚本发送给特定的人，而不管传输介质如何。实际传输介质可以根据存在和活动状态动态确定。所以例如B. 通过将消息重定向到另一个 ioBroker 适配器，在外出时用文本消息替换家里的语音通知。消息也可以路由到居民所在房间的特定设备，例如扬声器或显示器。

＃＃ 配置

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.1.0-beta.2 (2023-03-12)

-   (jpawlowski) Pets are now allowed to follow the presence of guest residents

## License

MIT License

Copyright (c) 2022-2023 Julian Pawlowski <metres_topaz.0v@icloud.com>

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