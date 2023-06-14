---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.daswetter/README.md
title: ioBroker.DasWetter。
hash: ddazcFoy+6c5ARBhF+tuZWbxMv1PigKW/hCVWqNuNiw=
---
![标识](../../../en/adapterref/iobroker.daswetter/admin/daswettercom.png)

![安装数量](http://iobroker.live/badges/daswetter-stable.svg)
![下载](https://img.shields.io/npm/dm/iobroker.daswetter.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.daswetter.svg)
![已知漏洞](https://snyk.io/test/github/rg-engineering/ioBroker.daswetter/badge.svg)
![NPM](https://nodei.co/npm/iobroker.daswetter.png?downloads=true)

# IoBroker.DasWetter。
![GitHub 操作](https://github.com/rg-engineering/ioBroker.daswetter/workflows/Test%20and%20Release/badge.svg)

**此适配器使用哨兵库自动向开发人员报告异常和代码错误。**有关更多详细信息和如何禁用错误报告的信息，请参阅[哨兵插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用哨兵报告。

**如果喜欢，请考虑捐款：**

[![贝宝](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=34ESBMJ932QZC)

此适配器从 DasWetter.com 读取天气预报数据。

您需要在 DasWetter.com 上有一个帐户。在 https://www.daswetter.com/api/#/login 注册该帐户在某些条件下是免费的。

在您的帐户中，您会发现四种不同数据模型的三个 URL：

* 未来 7 天的预报和当天的一般信息：高低、风（符号和描述）、日符号和天气状况
* 5 天和每 3 小时的详细信息：一般每日信息如下：高峰、低谷、风、阵风、降水、相对湿度、

海平面气压、雪线、日出和日落、与月亮有关的日期、当地时间

* 每小时预览一次详细数据（仅前 2 天，之后每 3 小时一次）
* 5 天和每 3 小时的预测（JSON 格式）

四种模型都已实现，至少应使用一种。
在设置 URL 中必须使用 http://api.daswetter.com/index.php?api_lang=de&localidad=xxxx。只需从您的帐户中复制完整的 URL。

## 提示
### Vis中使用的图标
* 访问像 `http://ip:8082/adapter/daswetter/icons/tiempo-weather/galeria1/1.png` 这样的图标。
* 在 galerie6 中，原始图标为 svg 格式。 Vis 应用程序可能无法将其可视化。所以转换后的 png 是可用的。只需使用选项“使用 png”
* 在 galerie5 中，原始图标为 svg 和 png 格式。此外还有彩色和白色版本可供选择

### NextHours_Day1 中的“当前”：
* DasWetter.com 不提供真实的当前天气值
* 但有时提供当前时间的预报会很有帮助
* 所以我们添加了“当前”，它只是相关预测小时值的副本
* 请确保您每小时至少调用一次适配器，以确保“当前”更新良好
* 另请参阅 github 功能请求 [issue24](https://github.com/rg-engineering/ioBroker.daswetter/issues/24)

###路径4
* 目前 DasWetter.com 发送的数据与他们自己的规范不同。

现在我们已经实施了一个“自动修复”，将结构更改为记录的形状。

＃＃ 已知的问题
* 如果您发现错误或想要新功能，请在 [github](https://github.com/rg-engineering/ioBroker.daswetter/issues) 创建问题

## Changelog

### 3.1.8 (2023-04-07)
* (René) update dependencies

### 3.1.7 (2023-01-31)
* (René) update dependencies

### 3.1.6 (2022-12-23)
* (René) see issue #153: package Axios downgraded

### 3.1.5 (2022-12-04)
* (René) update dependencies

### 3.1.4 (2022-08-19)
* (René) update dependencies
* (dipts) Added missing / corrected inappropriate icons for galeria 1

### 3.1.3 (2022-05-05)
* (René) see issue #139: bug fix moon icon

### 3.1.2 (2022-03-20)
* (René) see issue #130: bug fix json data

### 3.1.1 (2022-03-19)
* (René) bug fix UV index

### 3.1.0 (2022-03-19)
* (René) replace bent by axios
* (René) dependencies updated
* (René) see issue #128: add UV index

### 3.0.9 (2021-11-09)
* (René) dependencies updated
* (René) see issue #114: "connectionType" and "dataSource" fixed

### 3.0.8 (2021-09-22)
* (DutchmanNL) Warn messages for channels solved
* (DutchmanNL) Optimize log message at adapter termination
* (DutchmanNL) Ensure adapter will always handle data at start

### 3.0.7 (2021-05-03)
* (René) issue #91: remove warnings with js-controller 3.3.

### 3.0.5 (2021-03-21)
* (René) dependencies updated

### 3.0.4 (2020-10-16)
* (René) see issue #76: parse rain values as float instead integer 

### 3.0.3 (2020-09-19)
* (René) see issue #66: parse numbers added 

### 3.0.1 (2020-05-01)
* (René) breaking change: old data structure is not supported anymore
* (René) "request" replaced by "bent"
* (René) "xml2js" replaced by "xml2json"
* (René) manual from DasWetter updated in folder \docs
* (René) see issue #39: create copy of data in hourly data path for next 1, 2, 3 or 6 hours (as an option)
* (René) copy for current can be disabled now

### 2.8.2 (2020-03-20)
* (René) some more logs to find parser errors

### 2.8.1 (2019-09-08)
* (René) bug fix: some datapoints were created as number instead of string

### 2.8.0 (2019-03-19)
* (René) moon and wind icon set added in admin !!path to wind icons changed!!
* (René) path to customized icon set added 
* (René) exit code changed

### 2.7.3 (2019-02-24)
* (René) bug fix: some values are number instead of string

### 2.7.2 (2019-02-14)
* (bluefox) Serialization of the objects deletion

### 2.6.1 (2019-02-10)
* (René) update dependencies

### 2.6.0 (2019-01-20)
* (René) support of compact mode
* (René) new icons for galeria5 (color or white; svg or png) selectable in admin
* (René) auto-repair for path4

### 2.5.0 (2018-11-30)
* (René) since app has problems with svg we can use png instead. svg's are converted to png. In admin a new option is available to use original svg's or converted png's 
* (René) max. 500 datapoints are deleted per call to reduce work load, so it might take a few calls until all old data points are removed

### 2.4.0 (2018-11-26)
* (René) sunshine duration added
* (René) current in NextHours_Day1 and NextHours2_Day1 added

### 2.3.1 (2018-11-04)
* (René) clean up code

### 2.3.0 (2018-08-23)
* (René) support of 4. path (json)

### 2.2.0 (2018-08-20)
* (René) delete unused data structure

### 2.1.3 (2018-08-17)
* (René) typo fixed
* (René) missing Icon-URL's added

### 2.1.2 (2018-08-14)
* (bluefox) Configuration dialog was fixed

### 2.1.1 (2018-08-04)
* (René) parse timeout added
* (René) missing roles and states added
* (René) using of units from data structure

### 2.1.0 (2018-07-30)
* (bluefox) Added URLs to icons
* (bluefox) Added the roles and the names to states
* (bluefox) Icons moved to admin directory



### 2.0.0
* (René) new datastructure !not compatible to version 1.x!
now parsing all data from xml and store them in datapoints
for compatibility: in configuration old data structure can be enabled 
needs also 2.x of vis-weather-widget

## License

MIT License

Copyright (c) 2017-2023 rg-engineering info@rg-engineering.eu

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