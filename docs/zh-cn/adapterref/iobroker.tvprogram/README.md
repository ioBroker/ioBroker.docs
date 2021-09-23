---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tvprogram/README.md
title: ioBroker.tvprogram
hash: Ejc4/tay5KbNIvfEFtBNXsgIPONqBTULfy13H9kJPb4=
---
![标识](../../../en/adapterref/iobroker.tvprogram/admin/tvprogram.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.tvprogram.svg)
![下载](https://img.shields.io/npm/dm/iobroker.tvprogram.svg)
![安装数量（最新）](http://iobroker.live/badges/tvprogram-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/tvprogram-stable.svg)
![依赖状态](https://img.shields.io/david/oweitman/iobroker.tvprogram.svg)
![已知漏洞](https://snyk.io/test/github/oweitman/ioBroker.tvprogram/badge.svg)
![新产品管理](https://nodei.co/npm/iobroker.tvprogram.png?downloads=true)
![特拉维斯CI](http://img.shields.io/travis/oweitman/ioBroker.tvprogram/master.svg)
![AppVeyor 构建状态](https://img.shields.io/appveyor/ci/oweitman/iobroker-tvprogram.svg)

# IoBroker.tvprogram
**测试：**

## IoBroker 电视程序适配器
此适配器定期轮询有关电视节目的信息。
数据可以显示在各种小部件中。

要进行设置，适配器必须已经访问并填充了必要的数据。
由于其大小，数据不存储在数据点中，而是存储在文件（Linux 路径：/opt/iobroker/data-files/tvprogram）和适配器的内存中。
在配置中，widget 只需要填充适配器的任何数据点（例如cmd）。
小部件自动搜索所有剩余的数据点。

＃＃ 安装
该适配器可以通过稳定版安装，也可以通过 beta/最新存储库进行测试。

### 适配器配置
您可以配置多少不同的电视，或者至少是不同的配置。

### Iobroker 日志中的警告
警告如

“只读状态“tvprogram.0.tv1.cmd”已被写入，没有带有值为“new|program|2021-01-01”的确认标志

由于适配器和小部件之间的内部信号机制，设计上没问题，它们首先在没有 ack 标志的情况下设置，一段时间后用 ack 标志重置。

###小部件
小部件仅在现代浏览器（Google Chrome、Mozilla Firefox、Opera、Safari）中受支持。
不支持没有 Chromium 的 Internet Explorer 或 Microsoft Edge（版本 <79）。

＃＃＃＃ 时间
此小部件按电视频道在时间线上显示当前电视节目。

如果频道徽标后面的文字显示出来，则必须在小部件中选择背景颜色。
为视图或至少为小部件选择明确的前景色和背景色通常是一种好方法。
标记位置每 15 秒更新一次。

如果安装后出现问题并且小部件没有正确显示，请在shell中尝试以下命令：

iobroker 上传所有

以下属性可用于vis中的配置 最低配置是将datapoint设置为cmd-datapoint。

|属性 |示例 |说明 |
| --------------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| tvprogram_oid | tvprogram.0.tv1.cmd | tvprogram 适配器实例的数据点。 |
|宽度项目 | 120 | 30 分钟段的标准宽度（以像素为单位）|
|高度行 | 35 |每条显示线的高度 |
|显示图片| × |如果可用，在时间线中显示图片 |
|标题字体百分比| 125 |标题（时间）的字符大小百分比 |
|广播字体百分比 | 75 |广播的字符大小百分比 |
|高亮颜色 |黄色 |最喜欢的颜色|
|标记位置百分比 | 25 |标记的位置（以小部件宽度的百分比表示）|
|对话宽度百分比 | 90 |以小部件百分比表示的对话框大小 |
|对话高度百分比 | 90 |以小部件百分比表示的对话框大小 |

##### CSS 类
请将 w00001 更改为您的小部件 ID

更改对话框的格式

```css
#w00001channeldlg {
    background-color: red !important;
}
```

```css
#w00001broadcastdlg {
    background-color: red !important;
}
```

如果您将一些额外的对话框与其他 z-index 设置一起使用，您可以为电视节目对话框设置更高的 z-index。
也许你必须设置一个大于 300 的数字。这取决于重叠或隐藏电视节目（广播信息和频道选择）对话框的其他对话框中的设置

```css
.ui-dialog.w00001 {
   z-index:300 !important;
}
```

更改广播交替背景颜色的格式

```css
#w00001 .scrollcontainer ul.tv-row:nth-child(odd)> li.broadcast:nth-child(odd),#w00001 ul.tv-row:nth-child(odd)> li.time:nth-child(odd) {
   background-color: rgba(128, 128, 128, 0.65);
}
#w00001 .scrollcontainer ul.tv-row:nth-child(odd)> li.broadcast:nth-child(even),#w00001 ul.tv-row:nth-child(odd)> li.time:nth-child(even) {
   background-color: rgba(128, 128, 128, 0.55);
}
#w00001 .scrollcontainer ul.tv-row:nth-child(even)> li.broadcast:nth-child(odd) {
   background-color: rgba(128, 128, 128, 0.45);
}
#w00001 .scrollcontainer ul.tv-row:nth-child(even)> li.broadcast:nth-child(even) {
   background-color: rgba(128, 128, 128, 0.35);
}

```

#### 收藏夹
此小部件显示所选收藏夹的列表，按日期和时间排序。

以下属性可用于vis中的配置 最低配置是将datapoint设置为cmd-datapoint。

|属性 |示例 |说明 |
| -------------- | -------------------- | --------------------------------------------------- |
|类 | tvprogram.0.tv 1.cmd | tvprogram 适配器实例的数据点。 |
|频道名称 |没有|显示徽标（关闭）或频道名称 |
|显示工作日 |是 |显示工作日 |
|最大收藏夹 | 10 |显示的最大收藏夹 |
|高亮颜色 |黄色 |最喜欢的颜色|

＃＃＃＃ 控制
此小部件显示所有实际广播。您可以点击频道标志切换频道。
您可以单击广播以获取有关该广播的详细信息。

以下属性可用于vis中的配置 最低配置是将datapoint设置为cmd-datapoint。

|属性 |示例 |说明 |
| --------------------- | ------------------------ | -------------------------------------------------------------------------------------------------- |
|类 | tvprogram.0.tv1.cmd | tvprogram 适配器实例的数据点。 |
|时间 | |如果为空，则将显示实际广播 |
|时间 | 20:15 |如果时间只显示此时的广播 120 分钟，则显示第二天 |
|时间 | 20:15/200 |如果时间与持续时间，此时的广播将显示 200 分钟 |
|时间 | 2021-02-15T20:15:00.000Z |如果日期字符串有效，则将显示此时的广播。记住时区 |
|高度行 | 35 |每条显示线的高度 |
|显示图片| × |显示图片（如果有）|
|广播字体百分比 | 75 |广播的字符大小百分比 |
|高亮颜色 |黄色 |最喜欢的颜色|
|对话宽度百分比 | 90 |以小部件百分比表示的对话框大小 |
|对话高度百分比 | 90 |以小部件百分比表示的对话框大小 |

##### CSS 类
请将 w00001 更改为您的小部件 ID

更改广播交替背景颜色的格式

```css
#w00001 .tv-control .tv-row:nth-child(odd) {
   background-color: rgba(128, 128, 128, 0.65);
}
#w00001 .tv-control .tv-row:nth-child(even) {
   background-color: rgba(128, 128, 128, 0.55);
}

```

＃＃＃＃ 搜索
使用此小部件，您可以在标题、描述、开始日期和广播类型中搜索广播。
输入字段“From”预先填充了实际日期。如果此字段未更改，则搜索从实际时间开始。
如果您将此字段更改为未来或过去的日期，则搜索将从该日期的 00:00 开始。
必须填写/选择输入字段搜索文本和类别之一或两者。

以下属性可用于vis中的配置 最低配置是将datapoint设置为cmd-datapoint。

|属性 |示例 |说明 |
| --------------------- | ------------------- | ---------------------------------------------------- |
|对象 ID | tvprogram.0.tv1.cmd | tvprogram 适配器实例的数据点。 |
|显示图片| × |显示图片（如果有）|
|最大结果 | 10 |列表中的最大结果 |
|高度行 | 35 |每条显示线的高度 |
|广播字体百分比 | 75 |广播的字符大小百分比 |
|高亮颜色 |黄色 |最喜欢的颜色|
|对话宽度百分比 | 90 |以小部件百分比表示的对话框大小 |
|对话高度百分比 | 90 |以小部件百分比表示的对话框大小 |

##### CSS 类
请将 w00001 更改为您的小部件 ID

更改广播交替背景颜色的格式

```css
#w00001 .tv-search .tv-row:nth-child(odd) {
   background-color: rgba(128, 128, 128, 0.65);
}
#w00001 .tv-search .tv-row:nth-child(even) {
   background-color: rgba(128, 128, 128, 0.55);
}

```

### 提供的数据点
每个创建的电视都存在以下数据点集

**通道过滤器**

此数据点包含在小部件中显示为 JSON 数组的通道

**命令**

此数据点用于小部件和适配器之间的内部通信

**最爱**

此数据点包含选定的收藏夹作为 JSON 数组

**记录**

如果用户单击广播的详细信息视图中的记录按钮，则会设置此数据点。
提供的数据是

|领域|示例 |说明 |
| ----------- | -------------------------- | ---------------------- |
|开始时间 | 2021-01-01T00:10:00+01:00 |开始时间 |
|结束时间 | 2021-01-01T00:10:30+01:00 |结束时间 |
|标题 |节目名称 |广播标题|
|频道 | 7 |唯一频道号 |
|频道ID | zdf |唯一频道 ID |
|频道名称 | ZDF |可读的频道名称 |
|事件ID | 12345678 |唯一广播 ID |

**选择频道**

此数据点用于通过单击详细视图中的通道徽标或切换图标来识别通道切换命令。

**显示**

此数据点包含是否应在小部件 tvprogram 中仅显示收藏夹或所有内容的状态

**配置**

此数据点已弃用，将在下一版本中删除

### 提供了发送命令
可以通过 sendto-commands 从适配器请求所有数据。这可用于开发个人功能

#### 获取服务器数据
从适配器请求基本数据。

**有效参数为**

* 类别
* 流派
* 频道

**退货：**

大批

**例子：**

```javascript
sendTo("tvprogram.0","getServerData","categories",(data)=>console.log(data));
```

#### GetServerTVProgram
从适配器请求程序数据。

**有效参数为**

以下格式的日期字符串：yyyy-mm-dd

**退货：**

大批

**例子：**

```javascript
sendTo("tvprogram.0","getServerTVProgram","2021-02-10",(data)=>console.log(data));
```

#### GetServerBroadcast
请求广播的详细数据。

**有效参数为**

包含以下格式的视图日期的对象 yyyy-mm-dd 广播的 eventid

**退货：**

目的

**例子：**

```javascript
sendTo("tvprogram.0","getServerBroadcast",{viewdate:"2021-02-10",eventid:"10659522"},(data)=>console.log(data));
```

#### GetFavoritesDatax
从现在到保存数据结束请求所有喜欢的广播。

**有效参数为**

收藏夹

**退货：**

大批

**例子：**

```javascript
sendTo("tvprogram.0","getFavoritesDatax",['heute','Tagesschau'],(data)=>console.log(data));

```

#### GetServerBroadcastNow
请求当前正在运行的所有广播

**有效参数为**

您最喜欢的频道的频道 ID 数组

**退货：**

大批

**例子：**

```javascript
sendTo("tvprogram.0","getServerBroadcastNow",[1,6,22,7],(data)=>console.log(data));

```

#### GetServerBroadcastDate
请求在某个日期时间运行的所有广播

**有效参数为**

您最喜欢的频道日期时间的频道 ID 数组

**退货：**

大批

**例子：**

```javascript
sendTo("tvprogram.0","getServerBroadcastDate",{channelfilter:[1,6,22,7],date:"2021-02-10T20:15:00.000Z"},(data)=>console.log(data));

```

#### GetServerBroadcastFind
搜索时间范围内的广播和可选的类别

**有效参数为**

channelfilter：您最喜欢的频道的channelID 数组categoryfilter：可选categoryID 数组datetimefrom：datetime from datetimetill：datetime直到textfilter：可选标题或标题的一部分来搜索 maxresults：可选的最大结果数量。默认值为 10

**退货：**

大批

**例子：**

```javascript
sendTo("tvprogram.0","getServerBroadcastFind",{
    channelfilter:[1,6,22,7],
    categoryfilter:[],
    datefrom:"2021-02-10T10:00:00.000Z",
    datetill:"2021-02-10T23:00:00.000Z",
    textfilter:"",
    maxresults:10
},(data)=>console.log(data));
```

#### 获取服务器信息
请求适配器内存中的可用广播日期

**有效参数为**

空对象

**退货：**

大批

**例子：**

```javascript
sendTo("tvprogram.0","getServerInfo","{}",(data)=>console.log(data));

```

### 社区提供小部件/脚本
#### Harmony 和 MagentaTV
Skript 由 pix 提供 点击频道标志后，脚本将映射的频道 ID 设置为和声数据点

```javascript
/* TV Programm Adapter
{1}
Skripte zur Ausführung von Aktionen, die
mit dem tvprogramm-Adapter zusammenhängen
(z.B. umschalten)
{1}
Adapter von 1/2021 von oweitmann https://github.com/oweitman/ioBroker.tvprogram
{1}
20210503 init
*/

const logging = true;
const idKanalWahl = "tvprogram.0.tv1.selectchannel"; // Dateingabe aus VIS
const fbdelay = 1000; // delay zwischen Tastendrücken der IR_Fernbedienung in ms
const channelList = {  // Ausgabe vom Adapter : Kanalnummer im Receiver
   "ard" : 1,
   "zdf" : 2,
   "rtl" : 3,
   "sat1": 4,
   "pro7": 5,
   "vox" : 6,
   "kaka":7,
   "rtl2":8,
   "superrtl":9,
   "kika":10,
   /* nickelodeon 11 */
   "3sat":12,
   "welt":13,
   "ntv":14,
   "phoenix":15,
   "tele5":16,
   "zdfneo":17,
   /* #dabeiTV 18 */
   /* disneyplus 19 */
   /* lokalTV 20 */
   "bayern3":21,
   "hessen3":25,
   "mdr":27,
   "nord3":29,
   /* "bremen":30, */
   /* "rbb berlin":31, */
   /* "sr":36, */
   "sw3":37, // bw
   /* "sw3":38, // rp */
   "west3":39,
   /* "eurosport1":50, */
   "sport1":51,
   /* sky sport news 52 */
   "arte":55,
   "one":56,
   /* anixe 60 */
   "dmax":64,
   "pro7maxx":69,
   "nitro":70,
   /* sat1 gold 73 */
   "sixx":75,
   /* ard alpha 80 */
   /* DW 85 */
   /* euronews */
   /* Kabel Eins Doku 89 */
   /* N24 Doku 90 */
   "tagesschau24":91,
   /* Welt der Wunder 92 */
   /* zdfinfo 93 */
   "mtv":99,
};

function selectChannel (chNo) {
   // Zerlegen mehrstelliger Zahlen
   let ch_arr = new Array();
   ch_arr = [];
   if (logging) log("Kanalnummer gewählt: " + chNo);
   while (chNo > 0) { // rückwärts
       if (logging) log("erkannte Ziffer: " + chNo % 10 );
       ch_arr.push(chNo % 10); // letzte Ziffer hinten dran hängen
       chNo = chNo / 10;
       chNo = parseInt(chNo);
   }
   // array umdrehen und wieder auslesen und Taste(n) der HARMONY+Fernbedienung drücken
   ch_arr.reverse();
   if (logging) log ("Senderplatz hat " + ch_arr.length + " Ziffern" + ch_arr);
   for (let i = 0; i < ch_arr.length; i++) {
       // passende OID füllen
       setStateDelayed("harmony.0.Harmony_Hub.Telekom-DVR.Number" + ch_arr[i], 1, fbdelay, function() {
           if (logging) log ((i+1) + ". Taste: " + ch_arr[i] + " gedrückt");
       });
   }
}

on(idKanalWahl, function (obj) {
   log("Neues TV Programm: " + obj.state.val + " auf Kanal " + channelList[obj.state.val] + " gewählt");
   selectChannel(channelList[obj.state.val]);
});

```

### 函数未在 Adapter 中实现，但作为 javascript-adapter 的脚本提供
####记录列表
记录数据点记录的所有当前记录时间的列表，每分钟更新一次。
您必须配置 RecorderList 的数据点名称和要观察的数据点的名称。
一旦脚本将记录添加到列表中，记录数据点就会被清空。

```javascript
// datapoint where the List should be saved
var recorderListDP = "0_userdata.0.tvprogram.RecorderList";
// datapoint who should be monitored of new data
var recorderDP ="tvprogram.0.tv1.record";

on(recorderDP, function (obj) {
    var recorderList;
    var index;
        console.log(obj.state.val);
    try {
        var recObj = JSON.parse(obj.state.val);
    } catch {
        return;
    }
    var s = getState(recorderListDP).val;
    s = (s=="") ? s="[]":s;
    recorderList = JSON.parse(s) || [];
    index = recorderList.findIndex(function(el) {
        return JSON.stringify(el)==JSON.stringify(recObj);
    });
    if (index>-1) {
        recorderList.splice(index,1);
    }
    recorderList.push(recObj);
    setState(recorderListDP,JSON.stringify(recorderList));
    setState(recorderDP,"");

});
var timer = setInterval(function() {
    var recorderList;
    var s = getState(recorderListDP).val;
    s = (s=="") ? s="[]":s;
    recorderList = JSON.parse(s) || [];
    recorderList=recorderList.filter( (el) => new Date(el.endTime)>new Date());
    setState(recorderListDP,JSON.stringify(recorderList));
},1000*60);
 ```

为了可视化此数据，来自适配器 myTime 的小部件 JSON 模板可以帮助使用以下模板。
将数据点与记录列表输入为 json_oid，将以下代码输入为 json_template：

```javascript
<% data.sort((a,b)=>new Date(a.startTime) - new Date(b.startTime)) %>
<table>
    <th>Datum</th>
    <th>Start</th>
    <th>Ende</th>
    <th>Titel</th>
<% for (var i=0;i<data.length;i++) {%>
<tr>
<td><%- new Date(data[i].startTime).toLocaleDateString() %>%></td>
<td><%- new Date(data[i].startTime).toLocaleTimeString() %></td>
<td><%- new Date(data[i].endTime).toLocaleTimeString() %></td>
<td><%- data[i].channelname %></td>
<td><%- data[i].title %></td>
</tr>
<% } %>
</table>

```

####目前最喜欢的广播
以下脚本每分钟确定一次喜爱的程序当前是否正在运行。

```javascript
// Favorites datapoint of your tv
var favoritesDP = "tvprogram.0.tv1.favorites";
// channelfilter datapoint of your tv
var channelfilterDP = "tvprogram.0.tv1.channelfilter";
// datapoint where the result should be saved
var favoritesBool ="0_userdata.0.tvprogram.favoriteNow";

var timer = setInterval(function() {
    var favorites = JSON.parse(getState(favoritesDP).val);
    var channelfilter = JSON.parse(getState(channelfilterDP).val);
    sendTo("tvprogram.0","getServerBroadcastNow",channelfilter,(data)=>{
            setState(favoritesBool,data.some((el) => favorites.includes(el.events[0].title)))
    });
},1000*60);

```

#### 位于小部件 tvprogram 的记录列表数据点中的节目的着色
以下模板用于来自适配器 rssfeed 的小部件 JSON 模板。
此模板不会生成任何可见的输出，但会生成为当前程序着色的 css 指令。
它还为详细视图中的记录按钮着色。

要使用此模板，请在小部件属性 json_oid 中选择记录列表数据点并在 json_template 中插入以下模板

```javascript
<%
  // Insert the IDs of your tvprogram widget IDs
  var widgetArray = ["w00001","w00002"];
  recorderList = data || [];
%>
  <style>
<%
  recorderList.map( (rec) => {
        widgetArray.map( (widget) => {
%>
            #<%= widget %> .broadcastelement[data-eventid="<%= rec.eventid %>"] {
                 background-color: rgba(255,0,0,0.1);
            }
            #<%= widget %>broadcastdlg .event-container.tv-dlg-row[data-eventid="<%= rec.eventid %>"] .record  {
                color: red;
            }
<%      });
    }); %>
  </style>
```

＃＃＃ 功能：
- 通过电视频道在时间线上显示电视数据
- 如果可用，显示有关电视广播的详细信息
- 通过自动滚动显示实际位置的标记
- 配置显示的电视频道和顺序，可以通过拖放重新排序。
- 单击徽标后通过数据点切换命令
- 放大/缩小
- 导航未来和前几天
- 播放按钮切换频道数据点
- 中心放大接下来的几天
- 回到今天
- 重置缩放
- 最喜欢的广播
- 从 Detailview 复制文本
- 标记位置是可配置的
- 对话框的宽度和高度是可配置的
- Datenpunkt 唱片，der nach druck auf Knopf mit Aufnahmedaten gefüllt wird
- 收藏夹小工具
- 隐藏非收藏夹

＃＃＃ 去做
小部件电视节目：

- 也许是一个亮点广播小部件
- 其他来源的数据适配器（互联网、硬件，如 Enigma、VU-Box）。由于需求低，目前暂停对此的考虑
- ~~改进配置小部件的文档~~
- ~~在时间小部件的主视图中播放图片~~
- ~~全文搜索也能找到导演和演员~~
- ~~时间小部件中按钮的工具提示~~
- ~~基于现有电视节目脚本的更多小部件的想法~~
- ~~问题：firefox 无限滚动~~
- ~~待讨论：Datenpunkt，mit allen Aufnahmedaten，应该在录像机适配器或单独的脚本中实现~~
- ~~细节视图的响应式设计->jquery对话框没有响应式设计，找到了另一种高度>宽度固定布局的解决方案~~
- ~~问题：如果左侧的滚动窗格完成，则会出现小的像素故障~~

## Changelog

### 1.1.1 (2021-08-10)
* remove dead code / extend doku about the warnings in the iobroker log * change the method of setting for configuration data from widget to datapoint
### 1.1.0 (2021-05-06)
* tooltips for the buttons in the time widget / search through the whole text to also find directors and actors / add showpictures option in time,control and search widget / improve documentation
### 1.0.0
* (oweitman) stable version

## License
MIT License


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

Copyright (c) 2021 oweitman <oweitman@gmx.de>