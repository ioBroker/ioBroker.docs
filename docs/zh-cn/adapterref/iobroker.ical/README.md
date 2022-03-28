---
BADGE-Number of Installations: http://iobroker.live/badges/ical-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.ical.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.ical.svg
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.ical/README.md
title: ioBroker iCal 适配器
hash: +mnwgLPvuDjTlPP0gTLncrtpZFm7vI691ok3L9AJzos=
---
![商标](../../../en/adapterref/iobroker.ical/ical.png)

# ioBroker iCal 适配器 此适配器允许从特定 URL 读取 .ics 文件并对其进行解析（Google 日历或 iCal）。
或者，可以使用本地 `.ics` 文件（使用文件的绝对路径而不是 URL）
＃＃ 用法
基于来自 vader722 的 (CCU.IO)[https://github.com/hobbyquaker/ccu.io/tree/master/adapter/ical] 的 iCal 适配器

### 适配器 iCal
ioBroker 的 iCal 适配器从指定的 URL 读取 `.ics` 格式的日历文件，并将位于预定义时间间隔内的事件写入 ioBroker 变量。或者，可以使用本地 .ics 文件（使用文件的绝对路径而不是 URL）。
它们可以使用 `basic html - String (unescaped)` 小部件在 VIS 中显示。

创建了两个变量：

-`iCalReadTrigger`
- `iCalEvents`

变量`iCalReadTrigger`用于触发读入过程。
在设置中可以存放几个 URL，从中读取日历。
然后依次读取日历并汇总结果。
或者，也可以给读取命令一个 URL，例如暂时阅读另一个日历。

要读取默认 URL，必须将字符串 `read` 写入变量 `iCalReadTrigger`。

要从任何 URL 读取，必须将字符串 `read https: // ...` 写入变量 `iCalReadTrigger`。

结果返回变量`iCalEvents`中的 iCal 适配器。

通过将`check`写入` iCalReadTrigger`，事件检查会在读取的数据上触发，而无需重新读取数据。

或者，适配器也可以在可定义的时间间隔内自动查询日历（仅使用 `defaultURL`）。
为此，请在设置中使用变量 runEveryMinutes 设置轮询间隔（以分钟为单位）。

配置文件中选项的含义：

- `preview`: 7 # 表示提前7天显示约会
- `runEveryMinutes`: 30 # 表示适配器每 30 分钟自动重新编写一次日历。如果不自动读取 0
- `colorize`: true # 今天的约会和当前正在运行的约会会被涂成红色，明天的约会会被涂成橙色，这个选项会覆盖选项everyCalOneColor
- `debug`: false # 如果为真，则将扩展输出写入 CCU.IO 日志
- `defColor`:` white` # 设置日历条目的默认颜色
- `fulltime`: ` ` # 确定用哪个字符串替换全天约会的时间 00:00。对于空格（引号之间），全天约会的时间被省略
- `replaceDates`: true # 如果为 true，则将今天的日期替换为字符串 todayString（例如 Today）。明天的约会通过字符串明天字符串
- `everyCalOneColor`: false # 如果为 true，则多个日历会将每个日历着色为要指定的颜色。如果设置了 colorize 选项，这将不起作用！
- `日历1`：
- "calURL": "http://11111.ics", 日历的 URL
- “calColor”：日历的“白色”颜色，如果设置了选项“everyCalOneColor”。

可以输入任意数量的日历。标准配置文件包含 2 个日历。

- `事件`：
- `名称`：“假期”：
- `enabled`: true # 确定是否编辑事件
- `Set ID`：可以在这里输入一个额外的状态，当事件激活时更新
- `On / Off`：在这里，可以将替代值写入存储在“Set ID”下的状态
- `display`: false # 确定事件是否也显示在 iCalEvents 中，或者仅评估
- `Set Ack`: false # Ack "off" 控制状态，例如切换某些东西。 #true Ack "on" 更新值

通过设置一个事件（在本例中为“vacation”），在日历中搜索字符串“vacation”。
如果带有关键字“假期”的约会在日历中，则自动将“假期名称”设置为“真”的状态。如果约会结束，则状态重置为假。
为预览期间的每一天创建一个状态。危险！它被搜索一个子字符串，i。日历“假期”中的条目以及条目“假期父母”被识别。设置事件时必须考虑到这一点。

- 说明 ical.0.events.0 下的状态
  - 如果路径 ical.0.events.0.later 中的事件今天仍在发生但尚未开始，则将其设置为 true
  - 如果路径 ical.0.events.0.now 中的事件当前处于活动状态，则将其设置为 true
  - 如果事件今天处于活动状态，则路径 ical.0.events.0.today 中的事件设置为 true
  - 注意：不显示前几天的事件

通过调整VIS中的CSS，可以设置今天（标准红色）和明天（标准橙色）的样式：

- `iCalWarn` - 今天换行日历条目
- `iCalPreWarn` - 明天开始行日历条目
- `iCalNormal` - 从今天开始的行尾
- `iCalNormal2` - 明天的行尾

＃＃＃ 日历
#### Apple iCloud 日历
如果之前共享过 Apple iCloud 日历，则可以查看。最好为 Homematic 创建自己的日历，因为日历将与所有人共享。
为此，请右键单击日历应用程序中的日历，然后选择共享设置。现在检查“公共日历”并复制显示的 URL。重要提示：网址以 webcal 开头：// p0X-cale .....
`webcal`必须替换为` http`。然后在 defaultURL 的设置中输入此 URL，或在 `read URL` 中指定它，例如。 `readURL http: // p-03-calendarws.icloud.com / xxxxxxxxx`

#### 谷歌日历
要包含 Google 日历，您必须转到 Google 日历日历设置（鼠标单击日历旁边的“向下箭头”）。单击“私人地址”字段旁边的 `ICAL` 符号可以找到日历的 URL。然后在 defaultURL 的设置中输入此 URL，或在 `read URL` 中指定它，例如。 `readURL https: // www.google.com / calendar / ical / xxxxxxxx / basic.ics`。

#### OwnCloud 日历
要包含 OwnCloud 的硬式日历，您必须在 OwnCloud 的日历视图中将此日历批准为硬式日历并共享链接。此 URL (https://&lt;DOMAIN&gt;/remote.php/dav/calendars/USER/xxxxxxx_shared_by_xxxxxx?export) 必须使用用户名和密码添加到 ioBroker.ical 适配器中。

#### NextCloud 日历
要包含 NextCloud 日历，必须将用户的单个所需日历的下载链接复制到 NextCloud 的日历视图中。
为此，请以用户身份登录 NextCloud，然后转到“日历”。在左栏中，单击带有三个点的圆圈旁的所需日历。
在出现的菜单中，将鼠标悬停在“下载”上，然后右键单击以复制链接。
示例：https://&lt;DOMAN&gt;/remote.php/dav/calendars/MYCALENDAR/personal/?export（链接包含“?export”很重要）。

使用用户名和密码将此 URL 输入 ioBroker.ical 适配器。这必须为所有用户的所有所需日历单独完成。

#### Baikal 轻量级 CalDAV+CardDAV 服务器
Baikal 服务器提供“ics-export”插件，允许将日历导出为单个 ICal 文件。使用 URL 选择此导出插件，并允许与此 ioBroker 适配器无缝集成。请将导出过滤器添加到您日历的 URL (`https://SERVER/baikal/cal.php/calendars/path/to/calendar?export&accept=ical`)。如果您遇到身份验证问题，请在 Baikal 服务器的 WebUI 的管理设置中将 `WebDAV authentication type` 从 `DIGEST` 更改为 `BASIC`。

### CSS
在生成的 HTML 中包含两种 css 类以允许设计自由。

#### 基于时间的 CSS 类
* _iCalNormal_/_iCalNormal2_：事件在今天之前开始（并且仍在运行）或在 3 天内开始，没有 CSS 和没有日历颜色的默认颜色是配置的适配器颜色
* _iCalWarn_/_iCalWarn2_：活动从今天开始，没有CSS和没有calendercolor的默认颜色是`red`
* _iCalPreWarn_/_iCalPreWarn2_：活动明天开始，没有CSS和没有calendercolor的默认颜色是`orange`
* _iCalPrePrePreWarn_/_iCalPrePrePreWarn2_：活动后天开始，没有CSS和没有calendercolor的默认颜色是`yellow`

第一个 CSS 类（例如 iCalNormal）用于 HTML 的日期和时间部分，第二个 CSS 类（例如 iCalNormal2）用于事件名称。

这些 CSS 类的 CSS 示例以格式化输出有点不同（例如，日期/时间左+粗体和 Eventname 右...）：

```
.icalWarn{
    color:red;
    float:left;
    font-size:12px;
    font-weight:bold;
}
.icalWarn2{
    color:white;
    float:right;
    font-size:12px;
    font-weight:normal;
}
.icalPreWarn{
    color:yellow;
    float:left;
    font-size:12px;
    font-weight:bold;
}
.icalPreWarn2{
    color:white;
    float:right;
    font-size:12px;
    font-weight:normal;
}
.icalPrePreWarn{
    color:white;
    float:left;
    font-size:12px;
    font-weight:bold;
}
.icalPrePreWarn2{
    color:white;
    float:right;
    font-size:12px;
    font-weight:normal;
}
.icalNormal{
    color:green;
    float:left;
    font-size:12px;
    font-weight:bold;
}
.icalNormal2{
    color:white;
    float:right;
    font-size:12px;
    font-weight:normal;
}
```

#### 基于日历的 CSS 类
每个跨度还具有一个基于事件所在日历的名称分配的 CSS 类。适配器配置中定义的“日历名称”用于此目的（空格替换为下划线）。

* _iCal-<calendername>_：此类用于 HTML 的日期和时间部分
* _iCal->calendername2>_：该类用于事件名称

要设置这些 CSS 类，您还需要使用基于时间的 CSS 类，例如_.icalNormal2.iCal-<日历名称>2_：

```
.icalNormal2.iCal-Google2{
    color:white;
    float:right;
    font-size:12px;
    font-weight:normal;
}
```

#### 生成的html示例
```
<span style="font-weight: bold; color:white"><span class="icalNormal iCal-calendar-today">&#8594; 3.1.2018 2:00</span></span><span style="font-weight: normal; color:white"><span class='icalNormal2 iCal-calendar-today2'> TestEvent</span></span><br/>
<span style="font-weight: bold; color: red"><span class="icalWarn iCal-calendar-today">1.1.2018  ganzer Tag</span></span><span style="font-weight:normal;color:red"><span class='icalWarn2 iCal-calendar-today2'> Today Event</span></span><br/>
```

＃＃ 筛选
在实例选项中，可以为每个日历维护一个过滤器。它必须是一个分号分隔的列表。如果启用选项`Filter as regular expression`，过滤器将被解释为正则表达式。在日历刷新期间，所有与描述、位置或摘要匹配的事件都将被排除。

搜索模式是：

```
SUMMARY:MySummary
DESCRIPTION:MyDescription
LOCATION:MyLocation
```

黑名单：如果要排除特定位置的所有事件，请使用 `LOCATION:MyLocation` 或简单的 `MyLocation` 或 2 个位置 `LOCATION:MyLocation;LOCATION:SomewhereElse`。
白名单：如果您只想包含特定位置的事件，请使用正则表达式，如 `/^(SUMMARY:.*)\s*(DESCRIPTION:.*)\s*(LOCATION:(?!MyLocation).*)$/` 或 2 个位置 `/^(SUMMARY:.*)\s*(DESCRIPTION:.*)\s*(LOCATION:(?!((MyHomeLocation)|(MyWorkLocation))).*)$/`

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.12.1 (2022-03-22)
* (Apollon77) Adjust colorize of dates to also show dates started in the past with todays color

### 1.12.0 (2022-03-21)
* (Apollon77/Scrounger) Add option to choose the ack flag set when updating foreign objects on events
* (HSE83) use a color field from the calendar entry as color for display
* (Apollon77) When no Arrow for already running events is shown and dates are not replaced with words display the start date in the list and not the end date
* (Apollon77) When not replacing date with words and entry ends at 0:0:0 show the day before as end
* (Apollon77) Fix issues when no end date is provided in the calendar entry (start and end are the same)
* (Apollon77) Correctly calculate length of multi day events
* (Apollon77) Respect DST changes in some calculations to prevent strange effects
* (Apollon77) Parse ics Files with different line endings again

### 1.11.6 (2021-12-17)
* (jens-maus) fixed incorrect recurrence event processing

### 1.11.5 (2021-11-09)
* (jens-maus) updated node-ical to latest 0.14.1
* (jens-maus) fix another issue where an already ended event is still listed

### 1.11.4 (2021-09-02)
* (Apollon77) fix cases where already ended entries where still listed
* (Apollon77) fix reported sentry crash cases (IOBROKER-ICAL-S, IOBROKER-ICAL-N)

### 1.11.3 (2021-08-04)
* (jens-maus) fixed timezone related handling

### 1.11.2 (2021-08-01)
* (Apollon77) Change one logline to debug

### 1.11.1 (2021-07-30)
* (Apollon77) Adjust date length for full day events to the full day

### 1.11.0 (2021-07-30)
* (Apollon77) Locally cache remote calendars to be used in case of request errors

### 1.10.4 (2021-07-30)
* (Apollon77) Make sure daysPast is correctly initialized if not provided
* (Apollon77) When no calendar could be read then no events are updated/cleanup
* (Apollon77) Respect HTTP statuscode from server response too to detect errors

### 1.10.3 (2021-07-30)
* (Apollon77/Feuersturm) Fix other timezone issues
* (Apollon77) Fix setting external States when events are active
* (Apollon77) Also list recurring entries from the past
* (Apollon77) Fix the event states for the days in future

### 1.10.2 (2021-07-25)
* (Apollon77/Feuersturm) Fix wrong times and dates introduced in 1.7.5.
* (Feuersturm) Allow Setting daysPast to be decreased to zero with button again

### 1.10.1 (2021-07-22)
* (Apollon77) Make sure all Event objects are created before values are written

### 1.10.0 (2021-07-16)
* IMPORTANT: data.table is now a stringified array!! Consider when using this value!
* (Apollon77) Optimize for js-controller 3.3
* (BasGo) added analysis for events marked as private in Google Calendar
* (jens-maus) updated dependencies

### 1.9.3 (2021-04-01)
* (Apollon77) Better handling of some ical cases

### 1.9.2 (2021-03-07)
* (Apollon77) Prevent crash case when summary is not provided (Sentry IOBROKER-ICAL-K)

### 1.9.1 (2021-01-30)
* (Apollon77) try to make sure all code is executed before adapter is ended

### 1.9.0 (2021-01-12)
* (christofkac) Added option to ignore case when events are searched in calendars
* (Apollon77) Prevent crash case (Sentry IOBROKER-ICAL-F)

### 1.8.5 (2021-01-01)
* (Apollon77) update ical library to prevent problems with RRULE parsing

### 1.8.4 (2020-12-27)
* (Apollon77) Prevent crash case (Sentry IOBROKER-ICAL-D)

### 1.8.3 (2020-12-24)
* (Apollon77) Prevent crash case (Sentry IOBROKER-ICAL-C)
* (Apollon77) Upgrade node-ical

### 1.8.2 (2020-11-29)
* (klein0r) Several fixes and optimizations

### 1.8.1 (2020-11-20)
* (klein0r) Fixed past event calculation in html view

### 1.8.0 (2020-11-14)
* (klein0r) Moved html options to separate tab
* (klein0r) Added option to hide "arrow" on for running events
* (klein0r) Added feature to include past events (in days)

### 1.7.5 (2020-11-08)
* (Apollon77) Only handle events with a start date (Sentry IOBROKER-ICAL-1, IOBROKER-ICAL-2, IOBROKER-ICAL-4)
* (jens-maus) Update dependencies, fix some more issues

### 1.7.4 (2020-08-26)
* (Apollon77) Fix multiple parsing

### 1.7.3 (2020-08-26)
* (foxriver76) we pin a specific dependency version, because "rrule" package broken
* (foxriver76) added eslint

### 1.7.2 (2019-12-02)
* (bluefox) Documentation was changed

### 1.7.1 (2019-01-08)
* (twonky4) Fixed issue with UTC of until in recurring appointments
* (twonky4) Fixed possible empty color

### 1.7.0 (2018-11-27)
* (twonky4) Add filter option
* (twonky4) Add support of events for configured date period; changed state names from `events.*` to `events.0.today.*`
* (twonky4) Add Count of events for tomorrow - state `data.countTomorrow`
* (twonky4) Events without time part and same start and end are interpreted as full day events
* (twonky4) Remove special chars from event states

### 1.6.6 (2018-10-22)
* (twonky4) Fixed html for disabled colorize
* (twonky4) Fixed timezone handling for events during change from daylight saving time back to standard time
* (twonky4) Fixed events without end date moved to different day

### 1.6.5 (2018-10-13)
* (twonky4) Simplify timezone solution
* (twonky4) Fix calendars without timezones

### 1.6.4 (2018-10-12)
* (twonky4) Support windows timezones
* (twonky4) Don't fail on invalid timezones

### 1.6.3 (2018-10-10)
* (twonky4) Fixes timezone issue in fullday recurring appointments

### 1.6.2 (2018-10-08)
* (twonky4) Fixes timezone issue in recurring appointments

### 1.6.1 (2018-06-04)
* (Apollon77) Several fixes and optimizations

### 1.6.0 (2018-04-13)
* (Apollon77) Several fixes and optimizations
* (Apollon77) Upgrade node-ical library to allow big files to work
* (Apollon77) Better handling of full day events
* (Apollon77) Allow "Replace 0:00" to have 30 characters

### 1.5.3 (2018-03-24)
* (Apollon77) Also make location available in data table

### 1.5.2 (2018-03-23)
* (Apollon77/BuZZy1337) Fix several display issues

### 1.5.0 (2018-03-07)
* (bluefox) ready for Admin3

### 1.4.2 (2018-02-21)
* (Apollon77) Also display events that started before today

### 1.4.1 (2018-02-05)
* (Apollon77) also allow events without end parameter and assume an 0minute event then and set end = start

### 1.4.0 (2018-01-01)
* (Apollon77) allow multiple Events to be contained in one calendar entry. Make sure the names are unique enough because the search only checks for existance of the event name in the text.
* (Apollon77) correctly detect events that started before 0:00
* (Apollon77) also show events with no duration (sometimes used as reminders)
* (Apollon77) correctly show end times for events that are longer then 1 day (including "+x" to show day duration)
* (Apollon77) many enhancements and optimizations in formatting the infos (especially when event has already started but not ended)
* (Apollon77) add option to hide year numbers
* (Apollon77) add own CSS classes to each entry with the names iCal-<calendername> and iCal-<calendername>2 to be able to really design it as needed
* (Apollon77) Known issue: For recurring events it works to delete single events, but it do not work to move them

### 1.3.3 (2017-10-30)
* (DutchmanNL) Translate to Netherlands

### 1.3.2 (2017-02-24)
* (jens-maus) added singular form for 'days'

### 1.3.1 (2017-02-20)
* (jens-maus) implemented support for date excludes for recurring events

### 1.3.0 (2017-02-17)
* (jens-maus) switched ical module to use 'node-ical' which should improve ics format compatibility

### 1.2.2 (2017-02-17)
* (jens-maus) added changes to show "Noch X Tage" for fullday events (e.g. school holidays)

### 1.2.1 (2017-02-11)
* (jens-maus) applied workaround of ics files with TZID before DATE in DTSTART/DTEND

### 1.2.0 (2016-07-23)
* (bluefox) allow read from files
* (bluefox) add tests
* (bluefox) fix all day indication

### 1.1.3 (2016-07-19)
* (bluefox) fix error if entry is invalid
* (bluefox) use newer ical packet version

### 1.1.2 (2015-06-30)
* (jens-maus) implemented some more text replacement terms
* (jens-maus) we only colorize the date+time for imminent appointments
* (jens-maus) added cloneextend dependency definition and fix for dayafter mods
* (jens-maus) ported the "dayafter" change of the ccu.io ical adapter to the iobroker

### 1.1.1 (2015-08-16)
* (bluefox) enable auth only if user set.

### 1.1.0 (2015-08-13)
* (elmars) Added ability to provide username/password to authenticate against protected ics files. Tested with owncloud.

### 1.0.2 (2015-07-21)
* (bluefox) fix error if ICS file has empty lines

### 1.0.1 (2015-07-21)
* (bluefox) change readme title

### 1.0.0 (2015-07-21)
* (bluefox) fix error with set event to false

### 0.1.1 (2015-06-14)
* (bluefox) add additional fields for ioBroker.occ

### 0.1.0 (2015-03-24)
* (bluefox) make it compatible with new concept

### 0.0.2 (2015-02-22)
* (bluefox) fix error with configuration
* (bluefox) fix error with event object creation

### 0.0.1 (2015-02-17)
* (bluefox) initial commit

## License

The MIT License (MIT)

Copyright (c) 2014-2022, bluefox <dogafox@gmail.com>

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