---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tvprogram/README.md
title: ioBroker.tv程序
hash: OoTO1/+EPou6/8b6v3kD2t4M8FFmQCTBSPS2oktpsow=
---
![商标](../../../en/adapterref/iobroker.tvprogram/admin/tvprogram.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.tvprogram.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.tvprogram.svg)
![安装数量（最新）](http://iobroker.live/badges/tvprogram-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/tvprogram-stable.svg)
![依赖状态](https://img.shields.io/david/oweitman/iobroker.tvprogram.svg)
![已知漏洞](https://snyk.io/test/github/oweitman/ioBroker.tvprogram/badge.svg)
![NPM](https://nodei.co/npm/iobroker.tvprogram.png?downloads=true)
![特拉维斯](http://img.shields.io/travis/oweitman/ioBroker.tvprogram/master.svg)
![AppVeyor构建状态](https://img.shields.io/appveyor/ci/oweitman/iobroker-tvprogram.svg)

＃ioBroker.tv程序
**测试：**

## IoBroker的电视程序适配器
该适配器定期轮询有关电视节目的信息。
数据可以显示在各种小部件中。

要进行设置，适配器必须已经访问并填充了必要的数据。
由于其大小，数据不会存储在数据点中，而是存储在文件（Linux路径：/ opt / iobroker / data-files / tvprogram）和适配器的内存中。
在配置中，窗口小部件仅需要用适配器的任何数据点（例如cmd）填充。
小部件会自动搜索所有剩余的数据点。

＃＃ 安装
可以通过稳定器安装适配器，也可以通过beta /最新版本信息库测试版本。

###适配器配置
您可以配置多少台不同的电视，或者至少配置不同的电视。

###小部件
窗口小部件仅在现代浏览器（Google Chrome，Mozilla Firefox，Opera，Safari）中受支持。
不支持不带Chromium（版本<79）的Internet Explorer或Microsoft Edge。

＃＃＃＃ 时间
此小部件通过电视频道在时间轴上显示当前的电视节目。

如果通道徽标后面的文本通过显示出来，则必须在小部件中选择背景色。
通常，为视图或至少为小部件选择显式的前景和背景颜色是一种很好的方法。
标记位置ist每15秒更新一次。

如果安装后出现问题，并且未正确显示窗口小部件，请从shell尝试以下命令：

iobroker上传所有

可以在vis中进行配置的以下属性最小配置是将数据点设置为cmd-datapoint。

|属性|例子描述 |
| --------------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| tvprogram_oid | tvprogram.0.tv1.cmd |电视节目适配器实例的数据点。 |
| widthItem | 120 | 30分钟分段的标准宽度（以像素为单位）|
| heightRow | 35 |每行显示的高度|
|展示图片| x |在时间轴上显示图片（如果有）|
| headerfontpercent | 125 |标题的大小（百分比）（时间）|
| broadcastfontpercent | 75 |广播中的字符大小（以百分比为单位）|
| Highlightcolor |黄色|最喜欢的颜色|
| markerpositionpercent | 25 |标记的位置（以小部件宽度的百分比表示）|
| dialogwidthpercent | 90 |对话框的大小（以小部件的百分比为单位）|
| dialogheightpercent | 90 |对话框的大小（以小部件的百分比为单位）|

##### CSS类
请将w00001更改为您的小部件ID

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

如果将其他对话框与其他z-index设置一起使用，则可以为电视节目对话框设置更高的z-index。
也许您必须设置一个大于300的数字。这取决于其他对话框中与电视节目（广播信息和频道选择）对话框重叠或隐藏的设置。

```css
.ui-dialog.w00001 {
   z-index:300 !important;
}
```

更改广播的交替背景色的格式

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

####收藏
该小部件显示了所选收藏夹的列表，按日期和时间排序。

可以在vis中进行配置的以下属性最小配置是将数据点设置为cmd-datapoint。

|属性|例子描述 |
| -------------- | -------------------- | --------------------------------------------------- |
| oid | tvprogram.0.tv 1.cmd |电视节目适配器实例的数据点。 |
|频道名称|没有显示徽标（关闭）或频道名称|
| showweekday |是的显示工作日|
| maxfavorites | 10 |最多可显示的收藏夹|
| Highlightcolor |黄色|最喜欢的颜色|

＃＃＃＃ 控制
此小部件显示所有实际广播。您可以单击频道徽标来切换频道。
您可以单击广播以获取有关广播的详细信息。

可以在vis中进行配置的以下属性最小配置是将数据点设置为cmd-datapoint。

|属性|例子描述 |
| --------------------- | ------------------------ | -------------------------------------------------------------------------------------------------- |
| oid | tvprogram.0.tv1.cmd |电视节目适配器实例的数据点。 |
|时间| |如果为空，则将显示实际广播。 |
|时间| 20:15 |如果仅此时间的广播将显示120分钟，则显示第二天|
|时间| 20：15/200 |如果持续时间，则此时的广播将显示200分钟|
|时间| 2021-02-15T20：15：00.000Z |如果日期字符串有效，则将显示该时间的广播。记住时区|
| heightRow | 35 |每行显示的高度|
|展示图片| x |显示图片（如果有）|
| broadcastfontpercent | 75 |广播中的字符大小（以百分比为单位）|
| Highlightcolor |黄色|最喜欢的颜色|
| dialogwidthpercent | 90 |对话框的大小（以小部件的百分比为单位）|
| dialogheightpercent | 90 |对话框的大小（以小部件的百分比为单位）|

##### CSS类
请将w00001更改为您的小部件ID

更改广播的交替背景色的格式

```css
#w00001 .tv-control .tv-row:nth-child(odd) {
   background-color: rgba(128, 128, 128, 0.65);
}
#w00001 .tv-control .tv-row:nth-child(even) {
   background-color: rgba(128, 128, 128, 0.55);
}

```

＃＃＃＃ 搜索
使用此小部件，您可以在标题，说明，开始日期和广播类型中搜索广播。
输入字段“发件人”预填了实际日期。如果此字段未更改，则搜索从实际时间开始。
如果将此字段更改为将来的日期或过去的日期，则搜索将从该日期的00:00开始。
输入字段searchtext和category中的一个或两个都必须填写/选择。

可以在vis中进行配置的以下属性最小配置是将数据点设置为cmd-datapoint。

|属性|例子描述 |
| --------------------- | ------------------- | ---------------------------------------------------- |
|对象ID | tvprogram.0.tv1.cmd |电视节目适配器实例的数据点。 |
|展示图片| x |显示图片（如果有）|
| maxresults | 10 |列表中的最大结果|
| heightRow | 35 |每行显示的高度|
| broadcastfontpercent | 75 |广播中的字符大小（以百分比为单位）|
| Highlightcolor |黄色|最喜欢的颜色|
| dialogwidthpercent | 90 |对话框的大小（以小部件的百分比为单位）|
| dialogheightpercent | 90 |对话框的大小（以小部件的百分比为单位）|

##### CSS类
请将w00001更改为您的小部件ID

更改广播的交替背景色的格式

```css
#w00001 .tv-search .tv-row:nth-child(odd) {
   background-color: rgba(128, 128, 128, 0.65);
}
#w00001 .tv-search .tv-row:nth-child(even) {
   background-color: rgba(128, 128, 128, 0.55);
}

```

###提供的数据点
每个创建的电视都存在以下数据点集

**频道过滤器**

此数据点包含在小部件中显示为JSON-Array的通道

** cmd **

此数据点用于小部件和适配器之间的内部通信

**最喜欢的**

此数据点包含选定的收藏夹作为JSON-Array

**记录**

如果用户单击广播详细信息视图中的“记录”按钮，则将设置此数据点。
提供的数据是

|领域例子描述 |
| ----------- | -------------------------- | ---------------------- |
| startTime | 2021-01-01T00：10：00 + 01：00 |开始时间 |
| endTime | 2021-01-01T00：10：30 + 01：00 |结束时间|
|标题|广播标题|广播标题|
|频道| 7 |唯一频道号|
| channelid | zdf |唯一频道ID |
|频道名称| ZDF |可读的频道名称|
| eventid | 12345678 |唯一广播ID |

**选择频道**

通过单击详细信息视图中的通道徽标或切换图标，此数据点可用于识别通道切换命令。

**表演**

此数据点包含在小部件电视程序中是否仅显示收藏夹或所有内容的状态

**配置**

不推荐使用此数据点，并将在下一版本中将其删除

###提供的Sendto-Commands
可以通过sendto命令从适配器请求所有数据。这可以用来开发个人功能

#### GetServerData
从适配器请求基本数据。

**有效参数为**

*类别
*类型
*频道

**返回：**

大批

**例子：**

```javascript
sendTo("tvprogram.0","getServerData","categories",(data)=>console.log(data));
```

#### GetServerTVProgram
从适配器请求程序数据。

**有效参数为**

日期字符串，格式如下：yyyy-mm-dd

**返回：**

大批

**例子：**

```javascript
sendTo("tvprogram.0","getServerTVProgram","2021-02-10",(data)=>console.log(data));
```

#### GetServerBroadcast
请求广播的详细数据。

**有效参数为**

包含以下格式的viewdate的对象yyyy-mm-dd广播的eventid

**返回：**

目的

**例子：**

```javascript
sendTo("tvprogram.0","getServerBroadcast",{viewdate:"2021-02-10",eventid:"10659522"},(data)=>console.log(data));
```

#### GetFavoritesDatax
从现在开始请求所有喜欢的广播，直到保存的数据结束。

**有效参数为**

收藏夹数组

**返回：**

大批

**例子：**

```javascript
sendTo("tvprogram.0","getFavoritesDatax",['heute','Tagesschau'],(data)=>console.log(data));

```

#### GetServerBroadcastNow
请求当前正在运行的所有广播

**有效参数为**

您喜欢的频道的channelID数组

**返回：**

大批

**例子：**

```javascript
sendTo("tvprogram.0","getServerBroadcastNow",[1,6,22,7],(data)=>console.log(data));

```

#### GetServerBroadcastDate
请求在某个日期时间运行的所有广播

**有效参数为**

您喜欢的频道datetime的channelID数组

**返回：**

大批

**例子：**

```javascript
sendTo("tvprogram.0","getServerBroadcastDate",{channelfilter:[1,6,22,7],date:"2021-02-10T20:15:00.000Z"},(data)=>console.log(data));

```

#### GetServerBroadcastFind
搜索时间范围内的广播，并且可以选择类别

**有效参数为**

channelfilter：您最喜欢的频道的channelID数组。categoryfilter：可选的categoryID数组datetimefrom：datetime到datetimetill的日期时间：datetime直到textfilter：可选的标题或标题的一部分，以搜索maxresults：可选的最大结果数。预设值为10

**返回：**

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

#### GetServerInfo
在适配器内存中请求广播的可用日期

**有效参数为**

空物体

**返回：**

大批

**例子：**

```javascript
sendTo("tvprogram.0","getServerInfo","{}",(data)=>console.log(data));

```

###社区提供小部件/脚本
####和谐与洋红色电视
Skript由pix提供。单击频道徽标后，脚本将映射的频道ID设置为和声数据点

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

###函数未在适配器中实现，但作为javascript-adapter的脚本提供
####记录列表
记录数据点记录并每分钟更新的所有当前记录时间的列表。
您必须配置RecorderList的数据点名称和要观察的数据点的名称。
脚本将记录添加到列表后，记录数据点将被清空。

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

为了可视化此数据，适配器myTime中的小部件JSON模板可以帮助以下模板。
输入带有记录列表的数据点作为json_oid，并输入以下代码作为json_template：

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
以下脚本每分钟一次确定当前是否正在运行收藏夹程序。

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

####为小程序tvprogram中的记录列表数据点中的程序着色
以下模板适用于适配器rssfeed中的小部件JSON模板。
该模板不会生成任何可见的输出，但会生成使当前程序着色的css指令。
它还会在详细视图中为记录按钮上色。

要使用此模板，请在小部件属性json_oid中选择记录列表数据点，然后在json_template中插入以下模板

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

＃＃＃ 职能：
-通过电视频道在时间轴上显示电视数据
-显示有关电视广播的详细信息（如果有）
-通过自动滚动显示实际位置标记
-配置显示的电视频道和顺序，可以通过dragNdrop重新排序。
-单击徽标后通过数据点切换命令
-放大/缩小
-下一天和上一天的导航
-播放按钮切换频道数据点
-中心放大第二天
-回到今天
-重置缩放
-最喜欢的广播
-从Detailview复制文本
-标记位置是可配置的
-对话框的宽度和高度是可配置的
-Datenpunkt记录，der nach druck auf Knopf mit Aufnahmedatengefülltwird
-收藏夹小部件
-隐藏非收藏夹

＃＃＃ 去做
小部件电视节目：

-也许是精彩片段广播小部件
-其他来源（互联网，Enigma等硬件，VU-Box）的数据适配器。由于需求低，目前暂不考虑此问题
-~~完善用于配置小部件的文档~~
-~~在时间小部件的主视图中有广播图片~~
-~~全文搜索也可以找到导演和演员~~
-~~时间小部件中按钮的工具提示~~
-~~基于现有电视节目脚本的其他小部件的想法~~
-~~问题：firefox中无尽的滚动~~
-~~待讨论：Datenpunkt，mit allen Aufnahmedaten，应该在录像机适配器或单独的脚本中实现~~
-~~用于细节视图的响应设计-> jQuery对话框无法进行响应设计，找到了另一种解决方案，其高度>宽度固定布局
-~~问题：如果滚动窗格在左侧完成，则像素出现小故障~~

## Changelog
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