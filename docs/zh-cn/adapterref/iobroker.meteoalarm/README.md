---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.meteoalarm/README.md
title: ioBroker.meteoalarm
hash: wEB5tSyq3+CQ1EsgcxXp5ZXHWgy8bt+gMyPh5KpkZaM=
---
![标识](../../../en/adapterref/iobroker.meteoalarm/admin/meteoalarm.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.meteoalarm.svg)
![下载](https://img.shields.io/npm/dm/iobroker.meteoalarm.svg)
![安装数量](http://iobroker.live/badges/meteoalarm-stable.svg)
![新产品管理](https://nodei.co/npm/iobroker.meteoalarm.png?downloads=true)

# IoBroker.meteoalarm
**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅 [Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!从 js-controller 3.0 开始使用哨兵报告。

ioBroker的meteoalarm适配器---------------------------------------------- -------------------------------- 此适配器从 https://meteoalarm.org 拉天气警报，其中包括风、雪、雨、高低温等。此信息以当地语言提供，适用于详细地区。

免责声明：本网站与 www.meteoalarm.org 网站之间可能存在时间延迟，有关参与国家气象服务部门发布的有关警报级别的最新信息，请使用 https://www.meteoalarm.org。

＃＃ 如何使用它
选择您的国家，然后选择您想要警告的地区。如果您不确定您的地区名称是什么，请访问 https://meteoalarm.org 并尝试在地图上找到它。

## 将其添加到您的 vis
将它添加到您的 vis 的最简单方法是使用小部件基本 - 字符串，然后选择数据点 htmlToday。这为您提供了一个预先设计的 HTML 小部件，您可以在设置中对其进行调整。

## 警报类型
|报警类型|说明|
|:---:|:---:|
|1|风|
|2|雪/冰|
|3|雷电|
|4|雾|
|5|高温|
|6|低温|
|7|海岸事件|
|8|福雷斯特火|
|9|雪崩|
|10|雨|
|11|未知|
|12|洪水|
|13|雨洪|

＃＃ 设置
“HTML 小部件中无背景颜色”：能够使用没有背景颜色的 HTML 小部件（例如，如果您想使用颜色对象来填充整个小部件，而不仅仅是 html 小部件）

“定义警告颜色”：能够以十六进制代码定义各种警报级别的颜色。用于 HTML 小部件以及颜色对象以手动将其分配给另一个小部件

“使用白色图标”：使用白色图标而不是黑色图标

“图标”：定义 HTML 小部件中图标的大小

“小部件中没有符号”：不要在 HTML 小部件中使用符号。您仍然可以在对象中访问它。如果您想与小部件分开显示图标，则这是有用的 - 例如在更大的尺寸。

“今天而不是工作日” 显示在小部件的标题中，而不是工作日“今天”、“明天”或“昨天”。

## 警报级别
|报警级别|说明|
|:---:|:---:|
|绿色|目前没有可用的警告。|
|黄色|天气有潜在危险。预测的天气现象并不少见，但应更加关注面临气象风险的活动。随时了解预期的气象条件，不要冒任何可避免的风险。|
|橙色|天气很危险。已经预测到不寻常的气象现象。损坏和事故是可能的。要非常细心和小心，并及时了解预期的气象条件。 |
|红色|天气非常危险。预测到异常强烈的气象现象。严重的破坏和事故，通常是大面积的，威胁着生命和财产。 |

## 支持的国家
* 奥地利
* 德国
* 比利时
* 波斯尼亚黑塞哥维那
* 克罗地亚
* 塞浦路斯
* 捷克共和国
* 丹麦
* 爱沙尼亚
* 芬兰
* 法国
* 希腊
* 匈牙利
* 冰岛
* 以色列
* 意大利
* 拉脱维亚
* 立陶宛
* 卢森堡
* 马耳他
* 荷兰
* 挪威
* 波兰
* 罗马尼亚
* 塞尔维亚
* 斯洛伐克
* 斯洛文尼亚
* 西班牙
* 瑞典
* 英国

如果你没有找到你的国家，请在github上创建一个问题，我很乐意添加它

## 不可能的国家
* 瑞士（来自meteoalarm.org 的地理编码文件可能不正确）
* 葡萄牙（来自meteoalarm.org 的地理编码文件可能不正确）
* 保加利亚（来自meteoalarm.org 的地理编码文件可能不正确）

## 2.0.9 (2021-11-27)
* (jack-blackson) 正确计算日期——这次是真的:)

## 2.0.8 (2021-11-26)
* (jack-blackson) 添加了新的数据点“活动警报数”
* (jack-blackson) 调整包信息
* (jack-blackson) 修正 HTML Widget 中的日期显示提前 2 天发出警告

## 2.0.7 (2021-10-01)
*（杰克布莱克森）修正

## 2.0.6 (2021-09-29)
* (jack-blackson) 添加北马其顿
* (jack-blackson) 修正“result.feed.entry.forEach is not a function”错误

## 2.0.5 (2021-08-15)
* (jack-blackson) 用文字修正日期

## 2.0.4 (2021-08-13)
* (jack-blackson) 修正自述链接

## 2.0.3 (2021-08-09)
* (jack-blackson) 在 HTML 小部件中以文字显示日期而不是日期
* (jack-blackson) 添加了比利时的语言代码

## 2.0.2 (2021-07-15)
*（杰克布莱克森）修正

## 2.0.1 (2021-07-08)
* (jack-blackson) 将警报文件夹名称更改为 Alarm_X
* (jack-blackson) 在设置中定义您想要查看的警报
* (jack-blackson) 按生效日期排序警报

## 2.0.0 (2021-07-06)
* (jack-blackson) 切换到 Meteoalarm.org，完成重建

## 1.2.1 (2021-06-05)
* (jack-blackson) 修正错误以处理不正确的 XML（如果使用国家而不是地区）
* (jack-blackson) 添加卢森堡

## 1.2.0 (2021-05-16)
* (jack-blackson) 新设置：“HTML 小部件中无背景颜色”、“定义警告颜色”和“使用白色图标”
* (jack-blackson) 新图标

## 1.1.11 (2021-05-09)
* (jack-blackson) 软件包更新

## 1.1.9 (2021-05-07)
* (jack-blackson) 软件包更新

## 1.1.5 (2021-05-02)
* (jack-blackson) 修正 JS-Controller 3.3.1 错误，错误处理未定义语言

## 1.1.4 (2021-04-05)
* (jack-blackson) 处理 ENOTFOUND 错误消息，添加了 Sentry

## 1.1.3 (2021-03-29)
* (jack-blackson) 错误修复了适配器检查器

## 1.1.2 (2021-03-29)
* (jack-blackson) 数据更新不工作的修正，删除了由于 CORS 错误导致的链接自动生成

## 1.1.1 (2020-10-28)
* (jack-blackson) 修正 HTML 数据

## 1.1.0 (2020-03-29)
* (jack-blackson) 修正德国

## 1.0.9 (2020-02-06)
* (jack-blackson) 修正德国

## 1.0.8 (2019-11-15)
* (jack-blackson) 添加了波兰、摩尔多瓦、希腊、罗马尼亚
* (jack-blackson) 添加了新的数据点以获取天气图的链接

## 1.0.7 (2019-11-13)
* (jack-blackson) 添加了捷克共和国、爱尔兰、以色列、立陶宛、拉脱维亚、黑山、马耳他、塞尔维亚、瑞典

## 1.0.6 (2019-10-19)
* (jack-blackson) 添加了瑞士和斯洛拉基亚

## 1.0.5 (2019-09-22)
* (jack-blackson) 小日志调整

## 1.0.4 (2019-09-11)
*（杰克布莱克森）特拉维斯错误

## 1.0.3 (2019-09-09)
* (jack-blackson) 小错误修正，从类型“deamon”更改为“schedule”

## 1.0.2 (2019-08-25)
* (jack-blackson) 重新排序的发布信息

### 1.0.1 (2019-08-18)
* (jack-blackson) 修正没有警报图标

### 1.0.0 (2019-08-12)
* (jack-blackson) 发布版本

### 0.6.0 (2019-08-05)
* (jack-blackson) 在适配器中本地存储天气图标

### 0.5.0 (2019-07-21)
* (jack-blackson) 处理超时
* (jack-blackson) 所有语言的翻译
* (jack-blackson) URL 检查

### 0.4.0 (2019-07-20)
* (jack-blackson) 添加了 NL、NO、HR、FI、ES 的数据
* (jack-blackson) 添加了类型文本，如果级别为 1，则类型现在为空（无警告）
* (jack-blackson) 调整颜色

### 0.3.0 (2019-07-13)
* (jack-blackson) 添加了 HTML 小部件
* (jack-blackson) 修正图标

### 0.2.0 (2019-07-12)
* (jack-blackson) 添加“明天”数据

### 0.1.0 (2019-07-11)
* (jack-blackson) 初始版本

##学分
由来自 www.flaticon.com 的 Freepik 设计的钟形图标

## Changelog

## License
The MIT License (MIT)

Copyright (c) 2019-2021 jack-blackson <blacksonj7@gmail.com>

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