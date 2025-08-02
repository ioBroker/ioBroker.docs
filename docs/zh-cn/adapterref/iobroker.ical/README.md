---
BADGE-Number of Installations: http://iobroker.live/badges/ical-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.ical.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.ical.svg
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.ical/README.md
title: ioBroker.ical
hash: XMJ+FeNh7dJ1gBzgxlvrjtPSYfofVGsJS2n/10J4n+E=
---
![标识](../../../en/adapterref/iobroker.ical/ical.png)

# IoBroker.ical ioBroker.ical 是 ioBroker 自动化平台的一个适配器，专注于 iCalendar 文件，广泛用于存储和共享日历数据。它允许用户在本地或从指定的 URL 读取和解析 iCalendar 文件。
使用 ioBroker.ical，您可以根据日历事件执行各种操作，例如触发智能家居设备、发送通知或执行特定脚本或例程。例如，您可以创建自动化规则，在特定事件即将开始时打开灯或发送即将到来的约会的提醒通知。

Sentry 报告功能从 js-controller 3.0 开始，这意味着此适配器可以使用 Sentry 库自动向开发人员报告异常和代码错误。有关更多详细信息以及如何禁用错误报告，请参阅[Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)。

＃＃ 用法
ioBroker.ical 读取 `.ics` 格式的日历文件，并在预定义的时间间隔内将事件写入 ioBroker 变量。或者，可以使用文件的绝对路径而不是 URL 来使用本地 .ics 文件。它们可以使用 `basic html - String (unescaped)` 显示在 VIS 中。

创建了两个变量：

1. `iCalReadTrigger`
1. `iCalEvents`

变量 `iCalReadTrigger` 触发读入过程。
变量 iCalReadTrigger 触发读入过程。日历将依次从设置中读取，用户可以在其中存放多个 URL，然后汇总结果。
或者，用户也可以向读取命令提供一个 URL，例如临时读取另一个日历。

要读取默认 URL，字符串 `read` 必须写入变量 `iCalReadTrigger`

字符串`read https: // ...`必须写入变量 iCalReadTrigger 才能从默认 URL 中读取。

结果返回变量`iCalEvents`中的 iCal 适配器。

通过将`check`写入` iCalReadTrigger`，事件检查将触发读取数据，而无需重新读取数据。

或者，适配器可以按可定义的间隔自动查询日历（仅限`default URL`）。
为此，请使用变量 runEveryMinutes 在设置中设置轮询间隔（以分钟为单位）。

## 配置文件选项
- `preview`: 7 # 表示预约将提前 7 天显示
- `runEveryMinutes`: 30 # 表示适配器每 30 分钟自动重新访问日历。如果为 0，则不会自动读取。
- `colorize`: true # 今天的约会和当前正在进行的约会将以红色显示，明天的约会将以橙色显示。此选项将覆盖 everyCalOneColor 选项
- `debug`: false # 如果为 true，则扩展输出写入 ioBroker 日志
- `defColor`:`white` # 设置日历条目的默认颜色
- `fulltime`：``# 确定哪个字符串将替换全天约会的 00:00。对于空格（引号之间），全天约会的时间将省略。
- `replaceDates`: true # 如果为 true，则今天的日期将通过字符串 todayString 替换（例如，今天）。明天的约会将通过字符串 tomorrowString
- `everyCalOneColor`: false # 如果为 true，多个日历将分别以指定的颜色着色。这在设置了 colorize 选项的情况下不起作用！
- `日历1`：
    - “calURL”：“http://11111.ics”，日历的 URL
    - “calColor”：如果设置了选项“everyCalOneColor”，则日历的颜色为“白色”。

  用户可以输入任意数量的日历。标准配置文件包含两个日历。

- `事件`：
  - `name`:" 假期 ":
  - `enabled`: true # 确定事件是否将被编辑
  - `设置 ID`：可以输入附加状态，该状态在事件活跃时更新
  - `开/关`：可以为“设置 ID”下存储的状态写入替代值
  - `display`: false # 确定事件是否也显示在 iCalEvents 中，或者仅进行评估
  - `Set Ack`: false # Ack“off”控制状态，例如切换某些东西。#true Ack“on”更新值。

通过设置事件（本例中为“vacation”），日历会搜索字符串“vacation”。
如果日历中有一个带有关键字“vacation”的约会，则名称为 holiday 的状态将自动设置为 True。如果约会结束，状态将重置为 false。
预览期间的每一天都会创建一个状态。危险！它将搜索子字符串，即日历中的条目“vacation”和条目“holiday parents”都会被识别。在设置事件时必须考虑到这一点。

- ical.0.events.0 下状态的解释：
- 如果路径 ical.0.events.0.later 中的事件今天仍在发生但尚未开始，则将其设置为 true
- 如果路径 ical.0.events.0.now 中的事件当前处于活动状态，则将其设置为 true
- 如果事件今天有效，则路径 ical.0.events.0.today 中的事件设置为 true
- 注意：不会显示前几天的事件

通过调整VIS中的CSS，可以设置今天的日期（标准红色）和明天的日期（标准橙色）的样式：

- `iCalWarn` - 今天的换行日历条目
- `iCalPreWarn` - 明天日历条目的开头
- `iCalNormal` - 从今天开始结束
- `iCalNormal2` - 明天的行尾

### 日历
#### 苹果 iCloud 日历
如果之前共享过，Apple iCloud 日历是可查看的。最好为 Homematic 创建自己的日历，因为日历将与所有人共享。
为此，右键单击日历应用中的日历并选择共享设置。现在选中“公共日历”并复制显示的 URL。重要提示：URL 以 webcal://p0X-cale 开头......
` http` 必须替换 `webcal`。然后在 defaultURL 的设置中输入此 URL，或在 `read URL` 中指定它，例如 `readURL http: // p-03-calendarws.icloud.com / xxxxxxxxx`

Google 日历
要添加 Google 日历，请转到 Google 日历设置（用鼠标单击日历旁边的“向下箭头”）。单击“私人地址”字段旁边的 `ICAL` 符号找到日历网址。然后在 defaultURL 的设置中输入此网址，或在 `read URL` 中指定它，例如 `readURL https: // www.google.com / calendar / ical / xxxxxxxx / basic.ics`。

#### OwnCloud 日历
要包含 OwnCloud 的硬核日历，您必须在 OwnCloud 的日历视图中将此日历批准为硬核日历并共享链接。在 ioBroker.ical 适配器中添加 URL（https://&lt;DOMAIN&gt;/remote.php/dav/calendars/USER/xxxxxxx_shared_by_xxxxxx?export）以及用户名和密码。

#### NextCloud 日历
要包含 NextCloud 日历，请在 NextCloud 的日历视图中复制所需用户日历的下载链接。
为此，请以用户身份登录 NextCloud 并转到“日历”。在左栏中，单击带有三个点的圆圈旁边的所需日历。
在出现的菜单中，将鼠标悬停在“下载”上，然后右键单击以复制链接。
示例：https://&lt;DOMAN&gt;/remote.php/dav/calendars/MYCALENDAR/personal/?export（链接必须包含“?export”）。

将此 URL 与用户名和密码一起输入到 ioBroker.ical 适配器中，这是所有用户的所有单独所需日历所必需的。

#### Baikal轻量级CalDAV+CardDAV服务器
Baikal 服务器提供“ics-export”插件，允许将日历导出为单个 ICal 文件。此导出插件通过 URL 进行选择，并允许与此 ioBroker 适配器无缝集成。请将导出过滤器添加到日历的 URL（`https://SERVER/baikal/cal.php/calendars/path/to/calendar?export&accept=ical`）。如果您遇到身份验证问题，请在 Baikal 服务器 WebUI 的管理设置中将 `WebDAV authentication type` 从 `DIGEST` 更改为 `BASIC`。

### CSS
生成的 HTML 包含两种 CSS 类，以允许设计自由。

基于时间的 CSS 类
* _iCalNormal_/_iCalNormal2_：事件在今天之前开始（并且仍在运行）或 3 天后，没有 CSS 和日历颜色的默认颜色是配置的适配器颜色
* _iCalWarn_/_iCalWarn2_：活动今天开始，没有 CSS 和日历颜色的默认颜色为“红色”
* _iCalPreWarn_/_iCalPreWarn2_：活动明天开始，无 CSS 和日历颜色的默认颜色为“橙色”
* _iCalPrePreWarn_/_iCalPrePreWarn2_：活动后天开始，没有 CSS 和日历的默认颜色是“黄色”

使用第一个 CSS 类（例如 iCalNormal）作为 HTML 的日期和时间部分，第二个 CSS 类（例如 iCalNormal2）用于事件名称。

这些 CSS 类的 CSS 示例使输出格式略有不同（例如，日期/时间左+粗体和事件名称右...）：

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
每个 span 还根据日历的名称分配了一个 CSS 类。事件位于适配器配置中定义的“日历名称”中（下划线代替空格）。

* _iCal-<calendername>_：HTML 的日期和时间部分使用此类。
* _iCal->calendername2>_：事件名称使用此类。

要设置这些 CSS 类，您也需要使用基于时间的 CSS 类，例如 _.icalNormal2.iCal-<calendername>2_：

```
.icalNormal2.iCal-Google2{
    color:white;
    float:right;
    font-size:12px;
    font-weight:normal;
}
```

#### 生成的 html 示例
```
<span style="font-weight: bold; color:white"><span class="icalNormal iCal-calendar-today">&#8594; 3.1.2018 2:00</span></span><span style="font-weight: normal; color:white"><span class='icalNormal2 iCal-calendar-today2'> TestEvent</span></span><br/>
<span style="font-weight: bold; color: red"><span class="icalWarn iCal-calendar-today">1.1.2018  ganzer Tag</span></span><span style="font-weight:normal;color:red"><span class='icalWarn2 iCal-calendar-today2'> Today Event</span></span><br/>
```

＃＃ 筛选
在实例选项中，可以为每个日历维护一个过滤器，该过滤器必须是以分号分隔的列表。启用选项`Filter as regular expression`将把过滤器解释为正则表达式。日历刷新将排除所有符合描述、位置或摘要的事件。

搜索模式是：

```
SUMMARY:MySummary
DESCRIPTION:MyDescription
LOCATION:MyLocation
```

黑名单：如果要排除特定位置的所有事件，请使用`LOCATION:MyLocation`或简单的`MyLocation`或2个位置`LOCATION:MyLocation;LOCATION:SomewhereElse`。
白名单：如果只想包含特定位置的事件，请使用正则表达式，如`/^(SUMMARY:.*)\s*(DESCRIPTION:.*)\s*(LOCATION:(?!MyLocation).*)$/`或2个位置`/^(SUMMARY:.*)\s*(DESCRIPTION:.*)\s*(LOCATION:(?!((MyHomeLocation)|(MyWorkLocation))).*)$/`

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.16.1 (2024-11-01)
* (jens-maus) fix issue with handling rrule timezones incorrect with latest node-ical (#708).
* (jens-maus) update node-ical to latest 0.20.1
* (jens-maus) save cached files to os tmpdir instead.

### 1.16.0 (2024-10-29)
* (cvoelkel76) add checkbox to allow to exactly match a calender event.
* (jens-maus) update node-ical to latest 0.20.0
* (klein0r) Breaking change: Removed trigger state (subscribe is deprecated in js-controller 6.x)
* (simatec) Responsive design added

### 1.15.0 (2024-04-30)
* (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 1.14.3 (2024-02-28)
* (jens-maus) update node-ical to latest 0.18.0

### 1.14.2 (2024-01-29)
* (jens-maus) update node-ical to latest 0.17.2

## License

The MIT License (MIT)

Copyright (c) 2014-2024, bluefox <dogafox@gmail.com>

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