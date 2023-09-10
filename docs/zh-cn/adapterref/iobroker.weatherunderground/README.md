---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.weatherunderground/README.md
title: ioBroker.weatherunderground
hash: a5jiLETlcvxJgIyxlf4MfTQHi/MKIdodXzc3k7GgYcw=
---
![标识](../../../en/adapterref/iobroker.weatherunderground/admin/wu.png)

![安装数量](http://iobroker.live/badges/weatherunderground-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.weatherunderground.svg)
![下载](https://img.shields.io/npm/dm/iobroker.weatherunderground.svg)

# IoBroker.weatherunderground
![测试与发布](https://github.com/iobroker-community-adapters/iobroker.weatherunderground/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/weatherunderground/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!从 js-controller 3.0 开始使用 Sentry 报告。

ioBroker 适配器可从 [地下天气](http://www.wunderground.com/) 加载您所在位置的 24 小时天气预报。
适配器加载所有 15 分钟（默认）每日和每小时的预测数据。

## 注释
您可以使用此适配器提供官方“PWS 所有者”API 密钥，或者将 API 密钥留空以使用从 WU 网页中提取的密钥。

## 图标集
使用“旧版 API”时，有一些不同的图标集可用，请参见下文。对于使用新 API 的 usabe，图像名称已更改（请参阅 https://docs.google.com/document/d/1dNCf6nF6cjm4oOxQxjtqNuAvG_iEe5f9MQH1xlCeV4s/edit），并且现在基于数字......它们可以从例如https://drive.google.com/drive/folders/0B6fWQWXuE09OOWtBOXJNX190TDQ 并可用作自定义设置（见下文）。

在适配器设置中，将“Custom Icon-Base-URL”更改为 Weatherunderground 上可用的图标集之一：（来源：https://www.wunderground.com/weather/api/d/docs?d=resources/icon-sets ）

|图标集|网址 |示例|
| ------------- | -------------------------------- | --------------------- 	|
| 1 | https://www.wunderground.com/static/i/c/a/| ![替代文本](https://www.wunderground.com/static/i/c/a/partlycloudy.gif) |
| 3 | https://www.wunderground.com/static/i/c/c/| ![替代文本](https://www.wunderground.com/static/i/c/c/partlycloudy.gif) |
| 4 | https://www.wunderground.com/static/i/c/d/| ![替代文本](https://www.wunderground.com/static/i/c/d/partlycloudy.gif) |
| 5 | https://www.wunderground.com/static/i/c/e/| ![替代文本](https://www.wunderground.com/static/i/c/e/partlycloudy.gif) |
| 6 | https://www.wunderground.com/static/i/c/f/| ![替代文本](https://www.wunderground.com/static/i/c/f/partlycloudy.gif) |
| 7 | https://www.wunderground.com/static/i/c/g/| ![替代文本](https://www.wunderground.com/static/i/c/g/partlycloudy.gif) |
| 8 | https://www.wunderground.com/static/i/c/h/| ![替代文本](https://www.wunderground.com/static/i/c/h/partlycloudy.gif) |
| 9 | https://www.wunderground.com/static/i/c/i/| ![替代文本](https://www.wunderground.com/static/i/c/i/partlycloudy.gif) |
| 10 | 10 https://www.wunderground.com/static/i/c/j/| ![替代文本](https://www.wunderground.com/static/i/c/j/partlycloudy.gif) |
| 11 | 11 https://www.wunderground.com/static/i/c/k/| ![替代文本](https://www.wunderground.com/static/i/c/k/partlycloudy.gif) |
| 11 | 11 https://www.wunderground.com/static/i/c/k/| ![替代文本](https://www.wunderground.com/static/i/c/k/partlycloudy.gif) |

或者您也可以使用自己的“自定义”图标，为此，必须在 Base-URL 目录中提供以下 gif 文件：

|日图标|夜晚的图标|
| -----------------------------	| ----------------------------- |
|机会冰雪.gif | nt_chanceflurries.gif |
|机会雨.gif | nt_chancerain.gif |
|机会雷特.gif | nt_chancesleet.gif |
|机会雷特.gif | nt_chancesleet.gif |
|机会现在.gif | nt_chancesnow.gif |
|机会风暴.gif | nt_chancetstorms.gif |
|机会风暴.gif | nt_chancetstorms.gif |
|清除.gif | nt_clear.gif |
|多云.gif | nt_cloudy.gif |
|雪花.gif | nt_flurries.gif |
|雾.gif | nt_fog.gif |
|朦胧.gif | nt_hazy.gif |
|多云.gif | nt_mostlycloudy.gif |
|大部分是阳光明媚的.gif | nt_mostlysunny.gif |
|晴间多云.gif | nt_partlycloudy.gif |
|部分阳光明媚.gif | nt_partlysunny.gif |
|雨夹雪.gif | nt_sleet.gif |
|雨.gif | nt_rain.gif |
|雨夹雪.gif | nt_sleet.gif |
|晴间多云.gif | nt_partlycloudy.gif |
|阳光明媚.gif | nt_sunny.gif |
| tstorms.gif | nt_tstorms.gif |
|多云.gif | nt_cloudy.gif |

## IoBroker 论坛（德语）
http://forum.iobroker.org/viewtopic.php?f=20&t=2042&sid=a863d19838bc49439759bef89fcad1c3

＃＃ 去做
编码仍然存在问题。带“äüöß”的地址将显示错误。

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 3.6.0 (2023-09-09)
* (mcm1957) Icon urls at admin ui have been adapted to weatherunderground website changes (#158)
* (mcm1957) Forecast periods have been extended

### 3.5.0 (2023-09-08)
* (mcm1957) Adapter now requires node 16 or newer
* (mcm1957) Dependencies have been updated
* (waldmensch1) Cloudcover states have been added (PR #178)
* (mcm1957) Date format has been fixed to avoid incorrect display with newer admin versions (#191)
* (mcm1957) Forecast urls have been adapted to weatherunderground website changes (#158)

### 3.4.3 (2023-08-15)
* (Aplollon77) Translations have been updated (#159)
* (mcm1957) The testenvironment has been updated to use node 16/18/20
* (bluefox) Dependencies have been updated

### 3.4.2 (2022-04-26)
* (Apollon77) Added special logging when no current observation data are available because Station most likely offline to reduce confusion

### 3.4.1 (2022-03-13)
* (bluefox) Use axios for communication
* (bluefox) make sure date states are filled correctly

### 3.4.0 (2022-03-10)
* (Apollon77) If no official API-Key is used: Move schedule if default is used to better spread the requests over time to prevent peaks; Additionally add a random delay in the start minute
* (Apollon77) Further optimizations and additional logging

### 3.3.1 (2021-06-28)
* (Apollon77) Optimize for js-controller 3.3

### 3.3.0 (2021-01-22)
* (Apollon77) Optimize for js-controller 3.2
* (Apollon77) js-controller 2.0 is now required at least

### 3.2.5 (2020-12-27)
* (Apollon77) Prevent crash case (Sentry IOBROKER-WEATHERUNDERGROUND-1, IOBROKER-WEATHERUNDERGROUND-2)

### 3.2.3 (2020-12-26)
* (Apollon77) make sure adapter do not crash when no data could be read
* (Apollon77) Add Sentry error reporting

### 3.2.2 (2020-12-02)
* (Apollon77) icons sometimes did not have a correct extension
* (Apollon77) Correct some cases with different types of locations when reading data

### 3.2.1
* (raintonr) Corrected 'Imperial' terminology.

### 3.2.0 (2019-12-28)
* (StrathCole) fix forecast expiry time
* (StrathCole) add visibility index to objects on hourly forecast

### 3.1.6 (2019-10-16)
* (Bjoern3003) adjust to WU changes, now v3 API for hourly data
* (Apollon77) run once after installation/update

### 3.1.3
* (Apollon77) text correction

### 3.1.2 (2019-07-27)
* (Apollon77) use new parameters to get decimal precision values

### 3.1.1 (2019-07-14)
* (Apollon77) add windDirection as string calculated based on degrees

### 3.1.0 (2019-07-12)
* (Apollon77) remove option for legacy API because disabled by WU

### 3.0.14 (2019-07-11)
* (Apollon77) optimize checking of pws station id

### 3.0.13 (2019-07-10)
* (Apollon77) Fix error in image url handling

### 3.0.11/12 (2019-07-09)
* (Apollon77) Re-Fetch PWS station key on Error 401

### 3.0.10 (2019-05-27)
* (Apollon77) Adopt logic to WU changes

### 3.0.8 (2019-03-23)
* (Apollon77) Add additional guidance when location is not found by WU

### 3.0.7 (2019-03-22)
* (Apollon77) implement to extract used "legacy" API keys out of WU website to allow restore of functionality for now
* (Apollon77) Also extract API keys for newer API version from website to be usable together with real "PWS owner keys" in future
* (Apollon77) optionally get data using the New APIs (as well as the officially available PWS-Owner APIs as also additional ones to restore functionality)
* (Apollon77) Admin 2 support removed and adapted the Admin 3 texts as needed for now

### 2.0.4 (2018-08-19)
* (René) some typos
* (bluefox) Write only numbers and not strings

### 2.0.3 (2018-07-30)
* (bluefox) Warning! Breaking changes! States are renamed.
* (bluefox) Refactoring of states and roles

### 1.1.2 (2017-11-24)
* (Apollon77) Add option to specify image format for custom image urls

### 1.1.1 (2017-11-08)
* (Apollon77) Optimize API usage by getting all data with one call instead of two
* (Apollon77) Add support for multiple API-Keys

### 1.1.0 (2017-10-30)
* (Apollon77) Add option to overwrite Icon Base URL

### 1.0.8 (2017-07-12)
* (DeepCoreSystem) add 2 current observation values, fixes of some datapoint caps.

### 1.0.7 (2017-06-19)
* (Dutchman) add Dutch language suppport

### 1.0.6 (2017-05-16)
* (Rene) bug fixing
	+ all 4 sets are enabled as default
	+ change of checkbox enables saves button

### 1.0.5 (2017-05-14)
* (Rene) hourly forecast extend to 36h

### 1.0.4 (2017-04-09)
* (Rene) parse much more data
   + today's 24 h
   + next 4 days / nights as text
   + next 4 days
   + current values
   each can be enabled or disabled

### 1.0.3 (2016-11-01)
* (bluefox) Catch parse errors

### 1.0.2 (2016-10-29)
* (Apollon77) make sure precip values are always integers

### 1.0.1 (2016-07-21)
* (jens-maus) conversion from feet to meter for observation_location

### 1.0.0 (2016-07-12)
* (Apollon77) add daily rain level forecast

### 0.2.0 (2016-07-01)
* (Apollon77) Add Error handling and station-usage for forcasts

### 0.1.1 (2016-06-07)
* (ploebb) Fix forecast api URL

### 0.1.0 (2016-05-07)
* (bluefox) convert text to floats
* (bluefox) support languages

### 0.0.5
corrected humidity value within current weather info (slice + unit)

### 0.0.4
checking for spaces in location
added current conditions

### 0.0.3
bugfix in summed pop-value.

### 0.0.2
config dialog fixed

### 0.0.1
initial release with all basics to load WU-forecast data

## License

The MIT License (MIT)

Copyright (c) 2015-2023 dschaedl <daniel.schaedler@gmail.com>, iobroker-community-adapters

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