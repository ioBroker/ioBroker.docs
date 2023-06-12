---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.meteoalarm/README.md
title: ioBroker.meteoalarm
hash: suv+UdbX4a72rDz8cV39J/tDHYHU6fNSBxHtpluWEyU=
---
![标识](../../../en/adapterref/iobroker.meteoalarm/admin/meteoalarm.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.meteoalarm.svg)
![下载](https://img.shields.io/npm/dm/iobroker.meteoalarm.svg)
![安装数量](http://iobroker.live/badges/meteoalarm-stable.svg)
![NPM](https://nodei.co/npm/iobroker.meteoalarm.png?downloads=true)

# IoBroker.meteoalarm
**此适配器使用哨兵库自动向开发人员报告异常和代码错误。**有关更多详细信息和如何禁用错误报告的信息，请参阅[哨兵插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用哨兵报告。

ioBroker 的 meteoalarm 适配器-------------------------------------------- ------------------------------ 该适配器从 https://meteoalarm.org 提取天气警报，其中包括风、雪、雨、高低温等。此信息以当地语言和详细区域提供。

免责声明：本网站和 www.meteoalarm.org 网站之间可能存在时间延迟，有关参与国家气象服务发布的有关警报级别的最新信息，请使用 https://www.meteoalarm.org。

开发者不能保证警告被及时处理或者出现错误和问题导致根本不处理警告！

＃＃ 如何使用它
选择您所在的国家/地区，然后选择您想要警告的地区。如果您不确定您的区域名称是什么，请访问 https://meteoalarm.org 并尝试在地图上找到它。

[英文说明](docs/en/meteoalarm.md)

[德国新闻报](docs/de/meteoalarm.md)

##学分
Bell in 图标由 Freepik 设计，来自 www.flaticon.com

## Changelog

### 2.3.6 (2023-05-27)
* (jack-blackson) Bugfix "No Alarm" Message

### 2.3.5 (2023-03-27)
* (jack-blackson) IOBROKER-METEOALARM-47 & IOBROKER-METEOALARM-48

### 2.3.4 (2023-03-26)
* (jack-blackson) IOBROKER-METEOALARM-4A

### 2.3.3 (2023-02-09)
* (jack-blackson) Added possibility to define the alarm levels for the widget, JSON and notification
* (jack-blackson) Added ukrainian language 

### 2.3.2 (2023-01-07)
* (jack-blackson) Bugfix to clean up alerts correctly
* (jack-blackson) Bugfix for pushover if multiple instances are used

### 2.3.1 (2022-09-15)
* (jack-blackson) Ability to send alarms to other adapters (Telegramm, eMail, Pushover, Signal,Synochat
* (jack-blackson) Fix link in alarms folder

### 2.2.1 (2022-07-28)
* (jack-blackson) Bugfix noOfAlarms and numbering of objects

### 2.2.0 (2022-07-05)
* (jack-blackson) Added Object JSON that contains all activ errors in JSON format (e.g. for users of iqontrol)
* (jack-blackson) First step to get rid of duplicate error messages

### 2.1.5 (2022-06-13)
* (jack-blackson) Fixed Error "Error from InMemDB: Error: Not exists"

### 2.1.4 (2022-05-26)
* (jack-blackson) Added breadcrumb for Sentry to see what location created an error
* (jack-blackson) Start tracking in Sentry when XMLs without geocode are sent

### 2.1.3 (2022-05-23)
* (jack-blackson) Handle Warnings that are sent without a geocode -> Sentry IOBROKER-METEOALARM-3B

### 2.1.2 (2022-05-16)
* (jack-blackson) Bugfix for change in xml (wrong link for warning was used) -> Sentry IOBROKER-METEOALARM-2Y and IOBROKER-METEOALARM-31

### 2.1.1 (2022-02-08)
* (jack-blackson) Updated License Info
* (jack-blackson) Fixed errors for js-controller 4.x

### 2.1.0 (2022-02-03)
* (jack-blackson) Added Switzerland

### 2.0.10 (2021-12-10)
* (jack-blackson) Bugfix Sentry IOBROKER-METEOALARM-2K
* (jack-blackson) Bugfix for Ireland

### 2.0.9 (2021-11-27)
* (jack-blackson) Calculate date in words correctly - this time for real :)

### 2.0.10 (2021-12-10)
* (jack-blackson) Bugfix Sentry IOBROKER-METEOALARM-2K
* (jack-blackson) BUgfix for Ireland

### 2.0.9 (2021-11-27)
* (jack-blackson) Calculate date in words correctly - this time for real :)
* (jack-blackson) Bugfix Sentry IOBROKER-METEOALARM-2N

### 2.0.8 (2021-11-26)
* (jack-blackson) Added new datapoint "No. of active alarms"
* (jack-blackson) Adjusted package information
* (jack-blackson) Bugfix date-presentation in HTML Widget for warnings 2 days in advance

### 2.0.7 (2021-10-01)
* (jack-blackson) Bugfix

### 2.0.6 (2021-09-29)
* (jack-blackson) Added North Macedonia
* (jack-blackson) Bugfix for "result.feed.entry.forEach is not a function" error

### 2.0.5 (2021-08-15)
* (jack-blackson) Bugfix date in words

### 2.0.4 (2021-08-13)
* (jack-blackson) Bugfix readme link

### 2.0.3 (2021-08-09)
* (jack-blackson) Show date in words instead of day in HTML widget
* (jack-blackson) Added language code for Belgium

### 2.0.2 (2021-07-15)
* (jack-blackson) Bugfix

### 2.0.1 (2021-07-08)
* (jack-blackson) Changed Alarm Folder Name to Alarm_X
* (jack-blackson) Define in setup which Alarms you want to see
* (jack-blackson) Sort Alarms by effective date
### 2.0.0 (2021-07-06)
* (jack-blackson) Switch to Meteoalarm.org, complete rebuild
### 1.2.1 (2021-06-05)
* (jack-blackson) Bugfix to handle incorrect XML (if country instead of region is used)
* (jack-blackson) Added Luxembourg
### 1.2.0 (2021-05-16)
* (jack-blackson) New Setup: "No Background Color in HTML Widget", "Define Warning colors" and "Use white icons"
* (jack-blackson) New Icons
### 1.1.11 (2021-05-09)
* (jack-blackson) Package Updates
### 1.1.9 (2021-05-07)
* (jack-blackson) Package Updates
### 1.1.5 (2021-05-02)
* (jack-blackson) Bugfix JS-Controller 3.3.1 errors, error handling no language defined
### 1.1.4 (2021-04-05)
* (jack-blackson) Handle ENOTFOUND error message, added Sentry
### 1.1.3 (2021-03-29)
* (jack-blackson) Error fixes adapter checker
### 1.1.2 (2021-03-29)
* (jack-blackson) Bugfix for not working data update, removed link autogeneration due to CORS errors
### 1.1.1 (2020-10-28)
* (jack-blackson) Bugfix HTML Data
### 1.1.0 (2020-03-29)
* (jack-blackson) Bugfix Germany
### 1.0.9 (2020-02-06)
* (jack-blackson) Bugfix Germany
### 1.0.8 (2019-11-15)
* (jack-blackson) Added Poland, Moldova, Greece, Romania
* (jack-blackson) Added new Datapoint to get Link to Weather Map
### 1.0.7 (2019-11-13)
* (jack-blackson) Added Czech Republic, Ireland, Israel, Lithuania, Latvia, Montenegro, Malta, Serbia, Sweden
### 1.0.6 (2019-10-19)
* (jack-blackson) Added Switzerland & Slowakia
### 1.0.5 (2019-09-22)
* (jack-blackson) Small logging adjustments
### 1.0.4 (2019-09-11)
* (jack-blackson) Travis error
### 1.0.3 (2019-09-09)
* (jack-blackson) Small bugfixes, change from type "deamon" to "schedule"
### 1.0.2 (2019-08-25)
* (jack-blackson) Reordered release infos
### 1.0.1 (2019-08-18)
* (jack-blackson) Bugfix no alarm icon
### 1.0.0 (2019-08-12)
* (jack-blackson) Release version
### 0.6.0 (2019-08-05)
* (jack-blackson) Store weather icons local in adapter
### 0.5.0 (2019-07-21)
* (jack-blackson) Handle Timeouts
* (jack-blackson) Translations for all languages
* (jack-blackson) URL checks
### 0.4.0 (2019-07-20)
* (jack-blackson) Added data for NL,NO,HR,FI,ES
* (jack-blackson) Added Type Text, Type is now empty if Level is 1 (No Warning)
* (jack-blackson) Adjusted colors
### 0.3.0 (2019-07-13)
* (jack-blackson) Added HTML Widget
* (jack-blackson) Bugfix icon
### 0.2.0 (2019-07-12)
* (jack-blackson) Added "Tomorrow" data
### 0.1.0 (2019-07-11)
* (jack-blackson) initial version

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