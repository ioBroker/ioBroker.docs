---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.meteoalarm/README.md
title: ioBroker.meteoalarm
hash: qZsUdgSA1n9hKFanlSNmETnt5p466TIomOYyLipZQts=
---
![商标](../../../en/adapterref/iobroker.meteoalarm/admin/meteoalarm.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.meteoalarm.svg)
![下载](https://img.shields.io/npm/dm/iobroker.meteoalarm.svg)
![安装数量](http://iobroker.live/badges/meteoalarm-stable.svg)
![NPM](https://nodei.co/npm/iobroker.meteoalarm.png?downloads=true)

# IoBroker.meteoalarm
**此适配器使用哨兵库自动向开发人员报告异常和代码错误。**有关更多详细信息和如何禁用错误报告的信息，请参阅[哨兵插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用哨兵报告。

ioBroker 的 meteoalarm 适配器-------------------------------------------- ------------------------------ 该适配器从 https://meteoalarm.org 提取天气警报，其中包括风、雪、雨、高低温等。此信息以当地语言和详细区域提供。

免责声明：本网站和 www.meteoalarm.org 网站之间可能存在时间延迟，有关参与国家气象服务发布的有关警报级别的最新信息，请使用 https://www.meteoalarm.org。

开发者不能保证警告被及时处理或出现错误和问题导致根本不处理警告！

＃＃ 如何使用它
选择您所在的国家/地区，然后选择您想要警告的地区。如果您不确定您的区域名称是什么，请访问 https://meteoalarm.org 并尝试在地图上找到它。

## 添加到你的vis
将它添加到您的 vis 的最简单方法是使用小部件 basic - html，然后输入 {meteoalarm.0.htmlToday}。这为您提供了一个预先设计的 HTML 小部件，您可以在设置中对其进行调整。

## 警报类型
|报警类型|说明|
|:---:|:---:|
|1|风|
|2|雪/冰|
|3|雷与电|
|4|雾|
|5|高温|
|6|低温|
|7|海岸活动|
|8|阿甘大火|
|9|雪崩|
|10|雨|
|11|未知|
|12|洪水|
|13|雨洪|

＃＃ 设置
“HTML Widget 中没有背景颜色”：能够在没有背景颜色的情况下使用 HTML Widget（例如，如果您想使用颜色对象填充整个小部件，而不仅仅是 html 小部件）

“定义警告颜色”：能够以十六进制代码为各种警报级别定义颜色。用于 HTML 小部件，也用于颜色对象以手动将其分配给另一个小部件

“使用白色图标”：使用白色图标而不是黑色图标

“图标”：定义 HTML 小部件中图标的大小

“小部件中没有符号”：不要在 HTML 小部件中使用该符号。您仍然可以在对象中访问它。如果你想从小部件中单独显示图标，这是 usefill - 例如在更大的尺寸。

“今天而不是工作日” 在小部件的标题中显示而不是工作日“今天”、“明天”或“昨天”。

## 对象
一般对象：

|对象名称|描述|
|:---:|:---:|
|JSON|包含所有警报的 JSON。结构：事件、描述、级别、开始日期、图标、报警类型|
|颜色|最高可用警报级别的颜色代码|
|htmlToday|HTML 小部件代码（可在设置中调整）|
|lastUpdate|来自 Meteoalarm 的最后更新|
|级别|可用警报的最大级别|
|链接|提要链接|
|位置|位置名称|
|noOfAlarms|可用警报计数|
|notification|添加新警报时更改的对象。可用于通知。|

每个警报的对象：

|对象名称|描述|
|:---:|:---:|
|颜色|警报的十六进制代码 - 可以在不同级别的设置中进行调整|
|描述|报警的详细描述|
|有效|报警事件的开始日期/时间|
|事件|事件类型|
|到期|警报事件的结束日期/时间|
|标题|报警的简短描述|
|图标|图标链接|
|level|级别编号（参见下面的警报级别）|
|levelText|文字级别|
|链接|链接到 xml|
|发件人|谁发出了警报（例如 Deutscher Wetterdienst）|
|发送|发送警报的日期/时间|
|type|报警类型为数字（参见上面的报警类型|
|typeText|文字报警类型（参见上面的报警类型|
|updateIdentifier|不相关|

## 警报级别
|报警级别|编号|说明|
|:---:|:---:|:---:|
|绿色|1|目前没有可用的警告。|
|黄色|2|天气有潜在危险。预测的天气现象并不少见，但应更加注意暴露于气象风险的活动。随时了解预期的气象条件，不要冒任何可避免的风险。|
|橙色|3|天气很危险。已经预测到不寻常的气象现象。可能会造成损坏和事故。要非常细心和小心，并及时了解预期的气象条件。 |
|Red|4|天气非常危险。预测异常强烈的气象现象。极端破坏和事故通常发生在大范围内，威胁着生命和财产。 |

## 通知
可以让适配器通过邮件、电报、信号或推送方式向您发送通知。

* 信号
* 邮件
* 俯卧撑
*电报
*同步聊天

可用设置：

*显示位置：如果激活此设置，位置名称将添加到通知中
* 文字警示级别：在警示符号上附加文字警示级别
* 无详细信息：不要将警告的描述添加到通知中 - 例如对于 Alexa
* 发送“无警告”：如果所有警报结束且此时没有警告，则发送通知
*警告级别符号：选择应添加到通知中的符号

## 支持的国家
* 奥地利
* 德国
* 比利时
*波斯尼亚黑塞哥维那
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
* 瑞士
* 英国

如果你没有找到你的国家，请在 github 上创建一个问题，我很乐意添加它

## 不可能的国家
* 葡萄牙（来自 meteoalarm.org 的地理编码文件可能不正确）
* 保加利亚（来自 meteoalarm.org 的地理编码文件可能不正确）

## 2.3.2 (2023-01-07)
* (jack-blackson) 错误修复以正确清理警报
* (jack-blackson) 如果使用多个实例，则用于 pushover 的错误修复

## 2.3.0 (2022-09-15)
* (jack-blackson) 能够向其他适配器发送警报（Telegramm、eMail、Pushover、Signal、Synochat
* (jack-blackson) 修复警报文件夹中的链接

## 2.2.1 (2022-07-28)
* (jack-blackson) 错误修复 noOfAlarms 和对象编号

## 2.2.0 (2022-07-05)
* (jack-blackson) 添加了对象 JSON，其中包含 JSON 格式的所有活动错误（例如，对于 iqontrol 的用户）
* (jack-blackson) 摆脱重复错误信息的第一步

## 2.1.5 (2022-06-13)
* (jack-blackson) 修复了错误“来自 InMemDB 的错误：错误：不存在”

## 2.1.4 (2022-05-26)
* (jack-blackson) 为 Sentry 添加了面包屑以查看哪个位置产生了错误
* (jack-blackson) 在发送没有地理编码的 XML 时开始在 Sentry 中进行跟踪

## 2.1.3 (2022-05-23)
* (jack-blackson) 处理没有地理编码发送的警告 -> Sentry IOBROKER-METEOALARM-3B

## 2.1.2 (2022-05-16)
* (jack-blackson) 修改 xml 的错误修正（使用了错误的警告链接）-> Sentry IOBROKER-METEOALARM-2Y 和 IOBROKER-METEOALARM-31

## 2.1.1 (2022-02-08)
* (jack-blackson) 更新的许可证信息
* (jack-blackson) 修复了 js-controller 4.x 的错误

## 2.1.0 (2022-02-03)
* (jack-blackson) 添加瑞士

## 2.0.10 (2021-12-10)
* (jack-blackson) Bugfix Sentry IOBROKER-METEOALARM-2K
* (jack-blackson) 爱尔兰错误修正

## 2.0.9 (2021-11-27)
* (jack-blackson) 正确计算日期 - 这次是真的 :)

## 2.0.10 (2021-12-10)
* (jack-blackson) Bugfix Sentry IOBROKER-METEOALARM-2K
* (jack-blackson) 爱尔兰的 BUgfix

## 2.0.9 (2021-11-27)
* (jack-blackson) 正确计算日期 - 这次是真的 :)
* (jack-blackson) 修正哨兵 IOBROKER-METEOALARM-2N

## 2.0.8 (2021-11-26)
* (jack-blackson) 添加了新的数据点“No. of active alarms”
* (jack-blackson) 调整后的包裹信息
* (jack-blackson) 在 HTML Widget 中修正日期显示提前 2 天发出警告

## 2.0.7 (2021-10-01)
* (jack-blackson) 修正

## 2.0.6 (2021-09-29)
* (jack-blackson) 添加北马其顿
* (jack-blackson) “result.feed.entry.forEach is not a function”错误修正

## 2.0.5 (2021-08-15)
* (jack-blackson) 文字中的错误修复日期

## 2.0.4 (2021-08-13)
* (jack-blackson) 修正自述文件链接

## 2.0.3 (2021-08-09)
* (jack-blackson) 在 HTML 小部件中用单词而不是天显示日期
* (jack-blackson) 添加了比利时的语言代码

## 2.0.2 (2021-07-15)
* (jack-blackson) 修正

## 2.0.1 (2021-07-08)
* (jack-blackson) 将警报文件夹名称更改为 Alarm_X
* (jack-blackson) 在设置中定义您想查看的警报
* (jack-blackson) 按生效日期排序警报

## 2.0.0 (2021-07-06)
* (jack-blackson) 切换到 Meteoalarm.org，完成重建

## 1.2.1 (2021-06-05)
* (jack-blackson) 处理不正确 XML 的错误修正（如果使用国家而不是地区）
* (jack-blackson) 添加了卢森堡

## 1.2.0 (2021-05-16)
* (jack-blackson) 新设置：“HTML 小部件中无背景颜色”、“定义警告颜色”和“使用白色图标”
* (jack-blackson) 新图标

## 1.1.11 (2021-05-09)
* (jack-blackson) 包更新

## 1.1.9 (2021-05-07)
* (jack-blackson) 包更新

## 1.1.5 (2021-05-02)
* (jack-blackson) 修正 JS-Controller 3.3.1 错误，错误处理未定义语言

## 1.1.4 (2021-04-05)
* (jack-blackson) 处理 ENOTFOUND 错误消息，添加哨兵

## 1.1.3 (2021-03-29)
* (jack-blackson) 错误修复适配器检查器

## 1.1.2 (2021-03-29)
* (jack-blackson) 数据更新不工作的错误修复，由于 CORS 错误删除了链接自动生成

## 1.1.1 (2020-10-28)
* (jack-blackson) 错误修复 HTML 数据

## 1.1.0 (2020-03-29)
* (jack-blackson) 德国修正

## 1.0.9 (2020-02-06)
* (jack-blackson) 德国修正

## 1.0.8 (2019-11-15)
* (jack-blackson) 添加了波兰、摩尔多瓦、希腊、罗马尼亚
* (jack-blackson) 添加了新的数据点以获取天气图的链接

## 1.0.7 (2019-11-13)
* (jack-blackson) 添加了捷克共和国、爱尔兰、以色列、立陶宛、拉脱维亚、黑山、马耳他、塞尔维亚、瑞典

## 1.0.6 (2019-10-19)
* (jack-blackson) 添加了瑞士和斯洛伐克

## 1.0.5 (2019-09-22)
* (jack-blackson) 小日志调整

## 1.0.4 (2019-09-11)
* (jack-blackson) 特拉维斯错误

## 1.0.3 (2019-09-09)
* (jack-blackson) 小错误修复，从类型“守护进程”更改为“调度”

## 1.0.2 (2019-08-25)
* (jack-blackson) 重新排序的发布信息

### 1.0.1 (2019-08-18)
* (jack-blackson) 错误修复没有警报图标

### 1.0.0 (2019-08-12)
* (jack-blackson) 发行版

### 0.6.0 (2019-08-05)
* (jack-blackson) 在适配器本地存储天气图标

### 0.5.0 (2019-07-21)
* (jack-blackson) 处理超时
* (jack-blackson) 所有语言的翻译
* (jack-blackson) URL 检查

### 0.4.0 (2019-07-20)
* (jack-blackson) 添加了 NL、NO、HR、FI、ES 的数据
* (jack-blackson) 添加了类型文本，如果级别为 1（无警告），类型现在为空
* (jack-blackson) 调整后的颜色

### 0.3.0 (2019-07-13)
* (jack-blackson) 添加了 HTML 小部件
* (jack-blackson) 修正图标

### 0.2.0 (2019-07-12)
* (jack-blackson) 添加了“明天”数据

### 0.1.0 (2019-07-11)
* (jack-blackson) 初始版本

##学分
Bell in 图标由 Freepik 设计，来自 www.flaticon.com

## Changelog

## License
The MIT License (MIT)

Copyright (c) 2019-2023 jack-blackson <blacksonj7@gmail.com>

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