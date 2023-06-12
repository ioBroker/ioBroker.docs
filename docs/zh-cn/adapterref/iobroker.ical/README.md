---
BADGE-Number of Installations: http://iobroker.live/badges/ical-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.ical.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.ical.svg
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.ical/README.md
title: ioBroker.ical
hash: n+aSV0Lm+AD52tM6N/ad25Fz91tkPXGsOgGDB5JOcxw=
---
![标识](../../../en/adapterref/iobroker.ical/ical.png)

# IoBroker.ical ioBroker.ical 是ioBroker 自动化平台的适配器，专注于iCalendar 文件，广泛用于存储和共享日历数据。它允许用户在本地或从指定的 URL 读取和解析 iCalendar 文件。
借助 ioBroker.ical，您可以根据日历事件执行各种操作，例如触发智能家居设备、发送通知或执行特定脚本或例程。例如，您可以创建自动化规则，在特定事件即将开始时打开灯，或为即将到来的约会发送提醒通知。

Sentry 报告，从 js-controller 3.0 开始，意味着这个适配器可以使用 Sentry 库自动向开发人员报告异常和代码错误。有关详细信息以及如何禁用错误报告，请参阅[哨兵插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)。

＃＃ 用法
ioBroker.ical 以 `.ics` 格式读取日历文件，并以预定义的时间间隔将事件写入 ioBroker 变量。或者，可以通过使用文件的绝对路径而不是 URL 来使用本地 .ics 文件。它们可以使用 `basic html - String (unescaped)` 在 VIS 中显示。

创建了两个变量：

1.`iCalReadTrigger`
1.`iCalEvents`

变量 `iCalReadTrigger` 触发读入过程。
变量 iCalReadTrigger 触发读入过程。随后，Calendars 将从设置中读取，用户可以在其中存放多个 URL，并汇总结果。
或者，用户也可以给读取命令一个 URL，例如暂时看另一个日历。

要读取默认 URL，字符串 `read` 必须写入变量 `iCalReadTrigger`

字符串 `read https: // ...` 必须写入变量 iCalReadTrigger 才能从默认 URL 中读取。

结果返回变量 `iCalEvents` 中的 iCal 适配器。

通过将 `check` 写入 ` iCalReadTrigger`，对事件的检查将触发读取数据，而无需重新读取数据。

或者，适配器可以在可定义的时间间隔内自动查询日历（仅使用 `default URL`）。
为此，请在设置中使用变量 runEveryMinutes 设置轮询间隔（以分钟为单位）。

## 配置文件选项
- `preview`: 7 # 表示约会将提前 7 天显示
- `runEveryMinutes`: 30 # 表示适配器每 30 分钟自动重新访问一次日历。如果为 0，则不会自动读取。
- `colorize`: true # 今天的约会和当前正在运行的约会将显示为红色，明天的约会将显示为橙色。此选项覆盖选项 everyCalOneColor
- `debug`: false # 如果为真，扩展输出将写入 CCU.IO 日志
- `defColor`:` white` # 设置日历条目的默认颜色
- `fulltime`: ` ` # 确定哪个字符串将替换全天约会的 00:00。对于空格（引号之间），全天约会的时间将被省略。
- `replaceDates`: true # 如果为 true，则今天的日期将替换为字符串 todayString（例如，today）。通过字符串 tomorrowString 明天的约会
- `everyCalOneColor`: false # 如果为 true，多个日历将以指定的颜色为每个日历着色。这不适用于着色选项集！
-`日历1`：
- "calURL": "http://11111.ics", 日历的URL
- “calColor”：日历的“白色”颜色，如果设置了“everyCalOneColor”选项。

用户可以输入任意数量的日历。标准配置文件包含两个日历。

- `事件`：
- `名字`：“假期”：
- `enabled`: true # 确定事件是否被编辑
- `Set ID`：可以进入一个额外的状态，当事件激活时更新
- `On / Off`：可以将替代值写入存储在“设置 ID”下的状态
- `display`: false # 确定事件是否也显示在 iCalEvents 中，或仅被评估
- `Set Ack`: false # Ack "off" 控制状态，例如切换一些东西。 #true Ack "on" 更新值。

通过设置事件（在本例中为“假期”），日历会搜索字符串“假期”。
如果日历中有关键字“假期”的约会，则名称为 holiday 的状态会自动设置为 True。如果约会结束，状态将重置为假。
将为预览期间的每一天创建一个状态。危险！它将搜索一个子串，i。日历“假期”中的条目以及条目“假期父母”被识别。设置事件时必须考虑到这一点。

- ical.0.events.0下的状态说明：
  - 路径 ical.0.events.0.later 中的事件如果今天仍在发生但尚未开始则设置为 true
  - 路径 ical.0.events.0.now 中的事件如果当前处于活动状态则设置为 true
  - 如果事件在今天激活，路径 ical.0.events.0.today 中的事件设置为 true
  - 注意：不显示前几天的事件

通过调整VIS中的CSS，可以设置今天（标准红色）和明天日期（标准橙色）的样式：

- `iCalWarn` - 今天换行日历条目
- `iCalPreWarn` - 明天行日历条目的开始
- `iCalNormal` - 今天结束
- `iCalNormal2` - 明天的行尾

### 日历
#### 苹果 iCloud 日历
如果以前共享过 Apple iCloud 日历，则可以查看。最好为 Homematic 创建您自己的日历，因为日历会与所有人共享。
为此，请右键单击日历应用程序中的日历，然后选择共享设置。现在检查“公共日历”并复制显示的 URL。重要提示：URL 以 webcal 开头：// p0X-cale .....
` http` 必须替换 `webcal`。然后在 defaultURL 的设置中输入此 URL，或在 `read URL` 中指定它，例如。 `readURL http: // p-03-calendarws.icloud.com / xxxxxxxxx`

#### 谷歌日历
要包含 Google 日历，请转到 Google 日历日历设置（鼠标单击日历旁边的“向下箭头”）。通过单击“私人地址”字段旁边的 `ICAL` 符号找到日历 URL。然后在 defaultURL 的设置中输入此 URL 或在 `read URL` 中指定它，例如。 `readURL https: // www.google.com / calendar / ical / xxxxxxxx / basic.ics`。

#### OwnCloud 日历
要包含 OwnCloud 的硬日历，您必须在 OwnCloud 的日历视图中批准此日历作为硬日历并共享链接。使用用户名和密码在 ioBroker.ical 适配器中添加 URL (https://<DOMAIN>/remote.php/dav/calendars/USER/xxxxxxx_shared_by_xxxxxx?export)。

#### NextCloud 日历
要包含 NextCloud 日历，请在 NextCloud 的日历视图中复制所需用户日历的下载链接。
为此，请以用户身份登录 NextCloud 并转到“日历”。在左列中，单击带有三个点的圆圈旁边的所需日历。
在出现的菜单中，将鼠标悬停在“下载”上，然后右键单击以复制链接。
示例：https://<DOMAN>/remote.php/dav/calendars/MYCALENDAR/personal/?export（链接必须包含“?export”）。

使用用户名和密码将此 URL 输入到 ioBroker.ical 适配器中，对于所有用户的所有个人所需日历都是强制性的。

#### Baikal轻量级CalDAV+CardDAV Server
Baikal 服务器提供“ics-export”插件，允许将日历导出为单个 ICal 文件。此导出插件使用 URL 选择并允许与此 ioBroker 适配器无缝集成。请将导出过滤器添加到日历的 URL (`https://SERVER/baikal/cal.php/calendars/path/to/calendar?export&accept=ical`)。如果您遇到身份验证问题，请在贝加尔湖服务器 WebUI 的管理设置中将 `WebDAV authentication type` 从 `DIGEST` 更改为 `BASIC`。

### CSS
生成的 HTML 包括两种 CSS 类以允许设计自由。

#### 基于时间的 CSS 类
* _iCalNormal_/_iCalNormal2_：事件在今天之前开始（并且仍在运行）或 3 天内更晚，没有 CSS 且没有日历颜色的默认颜色是配置的适配器颜色
* _iCalWarn_/_iCalWarn2_：活动今天开始，没有 CSS 和日历颜色的默认颜色是“红色”
* _iCalPreWarn_/_iCalPreWarn2_：活动明天开始，没有 CSS 的默认颜色，日历颜色为“橙色”
* _iCalPrePreWarn_/_iCalPrePreWarn2_：活动后天开始，默认颜色没有 CSS 和没有 calendercolor 是“黄色”

将第一个 CSS 类（例如 iCalNormal）用于 HTML 的日期和时间部分，第二个 CSS 类（例如 iCalNormal2）用于事件名称。

这些 CSS 类的 CSS 示例格式化输出有点不同（例如日期/时间左+粗体和 Eventname 右...）：

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
每个跨度还有一个基于日历名称分配的 CSS 类。该事件位于为此适配器配置中定义的“日历名称”中（下划线替换空格）。

* _iCal-<calendername>_：HTML 的日期和时间部分使用此类。
* _iCal->calendername2>_：事件名称使用此类。

要设置这些 CSS 类，您还需要使用基于时间的 CSS 类，例如_.icalNormal2.iCal-<日历名称>2_:

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
在实例选项中，可以为每个日历维护一个过滤器，它必须是一个以分号分隔的列表。启用选项 `Filter as regular expression`，会将过滤器解释为正则表达式。日历刷新将排除所有按描述、位置或摘要匹配的事件。

搜索模式是：

```
SUMMARY:MySummary
DESCRIPTION:MyDescription
LOCATION:MyLocation
```

黑名单：如果您想排除特定位置的所有事件，请使用 `LOCATION:MyLocation` 或简单的 `MyLocation` 或 2 个位置 `LOCATION:MyLocation;LOCATION:SomewhereElse`。
白名单：如果您只想包含特定位置的事件，请使用正则表达式，如 `/^(SUMMARY:.*)\s*(DESCRIPTION:.*)\s*(LOCATION:(?!MyLocation).*)$/` 或 2 个位置 `/^(SUMMARY:.*)\s*(DESCRIPTION:.*)\s*(LOCATION:(?!((MyHomeLocation)|(MyWorkLocation))).*)$/`

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
* (klein0r) Use color picker in adapter settings
* (klein0r) Dropped Admin 4 UI
* (klein0r) Added Ukrainian language

### 1.13.2 (2022-08-29)
* (Apollon77) fix strange log messages by downgrading RRule again

### 1.13.1 (2022-06-27)
* (klein0r) Changed request library

### 1.13.0 (2022-06-17)
* (klein0r) Added Admin 5 UI
* (klein0r) Translated all object names

### 1.12.2 (2022-06-03)
* (Apollon77) Fix displaying rest-time of event in one case

### 1.12.1 (2022-03-22)
* (Apollon77) Adjust colorize of dates to also show dates started in the past with today's color

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