---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.waterkotte-easycon/README.md
title: ioBroker.waterkotte-easycon
hash: gJTFiVh+z0nOIaX8RzK9TVzOyEugyIiDOPAs2EF88ng=
---
![标识](../../../en/adapterref/iobroker.waterkotte-easycon/docs/banner.jpg)

![NPM 版本](https://img.shields.io/npm/v/iobroker.waterkotte-easycon.svg)
![下载](https://img.shields.io/npm/dm/iobroker.waterkotte-easycon.svg)
![安装数量](https://iobroker.live/badges/waterkotte-easycon-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/waterkotte-easycon-stable.svg)
![新平台](https://nodei.co/npm/iobroker.waterkotte-easycon.png?downloads=true)

# IoBroker.waterkotte-easycon
[![ko-fi]（https://ko-fi.com/img/githubbutton_sm.svg）](https://ko-fi.com/O4O8U5J2B)

## Waterkotte-easycon ioBroker 适配器
通过 CGI 请求读取和写入 Waterkotte EasyCon 热泵的参数。使用 [Waterkotte EcoTouch Ai1 Geo](https://www.waterkotte.de/waermepumpen/ecotouch-ai1-geo-erdwaermepumpe-6-18kw)（2017 年型号）进行测试。

＃＃ 特征
＃＃＃ 实施的
- 根据所使用的功能（水、加热、冷却、光伏、太阳能......）自动读取热泵的数值

### 计划中
- 通知热泵警报
- 写入值
- 阅读和管理日程安排
- SG-ready 类似目标值控制

＃＃ 用法
＃＃＃ 安装
从 ioBroker 存储库安装适配器`waterkotte-easycon`。

### 连接至热泵
触摸屏底部有两个 RJ45 端口。使用提供的工具卸下热泵的前盖即可访问它们。从下向上看，将以太网电缆连接到右侧端口。

![从下面看ö](../../../en/adapterref/iobroker.waterkotte-easycon/docs/display.jpg)

检查您的路由器，找出热泵的IP地址，并启用静态IP地址，这样热泵地址就不会改变。

＃＃＃ 配置
| 参数 | 说明 |
| ------------------------------- | ------------------------------------------------------------------------------------- |
| IP 地址 | 热泵的 IP 地址（参见[连接至热泵](#Connection-to-heat-pump)）|
| 密码 | 默认 `waterkotte` |
|密码 |默认`waterkotte` |
| 从状态 ID 中删除空格 | 如果 `State format` 是 `Path + Description`，则所有空格将被替换为 `_` |
| 从状态 ID 中删除空格 | 如果 `状态格式` 是 `路径 + 描述`，所有空格将被 `_` 替换 |

#### 状态格式
|价值 |说明 |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Path + ID` | 所有州名称都将使用标签 id，例如 `Heating.A32`，其中 `A32` 是地板采暖标签 `Target temperatur` 的内部 id |
| `路径 + 名称` | 所有状态名称都将使用标签的名称，例如 `加热.目标值`。启用`从状态 ID 中删除空格`以避免状态 ID 中出现空格（例如 `加热.目标值`）|

> 更改`State format` 或 `Remove whitespace from state ID` 将删除实例的所有状态并创建新的结构。

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.0.3 (2024-04-12)

-   (theknut) change update interval from milliseconds to seconds
-   (theknut) add axios timeout
-   (theknut) remove unused onStateChange handler
-   (theknut) logoff when adapter is unloaded

### 0.0.2 (2024-03-11)

-   (theknut) prepare for release

### 0.0.1 (2024-03-01)

-   (theknut) initial release

## License

MIT License

Copyright (c) 2024 theknut <theknutcoding@gmail.com>

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