---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.frigate/README.md
title: ioBroker.frigate
hash: j0s/xrvbFuZGzEpPCJYqWJqQjZ/SuuGz8QlwiqbVc3s=
---
![标识](../../../en/adapterref/iobroker.frigate/admin/frigate.png)

![NPM版本](https://img.shields.io/npm/v/iobroker.frigate.svg)
![下载](https://img.shields.io/npm/dm/iobroker.frigate.svg)
![安装数量](https://iobroker.live/badges/frigate-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/frigate-stable.svg)
![国家公共管理](https://nodei.co/npm/iobroker.frigate.png?downloads=true)

# IoBroker.frigate
## IoBroker 的护卫舰适配器
Frigate 是一款围绕实时 AI 对象检测构建的开源 NVR。
该适配器解析 Frigate 的 MQTT 消息并从中创建数据对象

＃＃ 指示
MQTT 必须在 Frigate 中激活并集成到 ioBroker 中。
MQTT 数据点（通常为“mqtt.0.frigate”）、frigate url 和 Number of web url 在适配器设置中输入。

_自动创建的对象：_

- Frigate 中的设置对象
- 每个摄像机的运动事件
- 环形缓冲区中最后一个相机快照/剪辑 url

这些对象可以在 ioBroker 中进一步处理，例如在维斯。

＃＃ 关联
- [ioBroker 论坛适配器主题](https://forum.iobroker.net/topic/64928/test-frigate-adapter-v0-0-1-alpha)
- [护卫舰视频项目](https://frigate.video)

## Changelog

### 0.2.6

-   (bettman66) add camid

### 0.2.5

-   (bettman66) fix https

### 0.2.4

-   (bettman66) add v0.2.4 to npm

### 0.2.3

-   (bettman66) merge pull request

### 0.2.2

-   (bettman66) settings translate

### 0.2.1

-   (bettman66) add version

### 0.2.0

-   (bettman66) add uptime and more

### 0.1.9

-   (bettman66) add online

### 0.1.8

-   (bettman66) add storage info

### 0.1.7

-   (bettman66) add switch

### 0.1.6

-   (bettman66) Number of web url

### 0.1.5

-   (bettman66) new npm package

### 0.1.4

-   (bettman66) update readme

### 0.1.3

-   (bettman66) bug web objects

### 0.1.2

-   (bettman66) ready to test

### 0.1.1

-   (bettman66) translate

### 0.1.0

-   (bettman66) objects add

## License

MIT License

Copyright (c) 2023 Bettman66 <w.zengel@gmx.de>

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