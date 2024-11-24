---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tvprogram/README.md
title: ioBroker.tv节目
hash: vje6in4u5OygjTcNliVGc3zKYI2ic6UbpGGEur3JWQY=
---
![标识](../../../en/adapterref/iobroker.tvprogram/admin/tvprogram.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.tvprogram.svg)
![下载](https://img.shields.io/npm/dm/iobroker.tvprogram.svg)
![安装数量](https://iobroker.live/badges/tvprogram-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/tvprogram-stable.svg)
![新平台](https://nodei.co/npm/iobroker.tvprogram.png?downloads=true)

# IoBroker.tvprogram
**测试：**![测试与发布](https://github.com/oweitman/ioBroker.tvprogram/workflows/Test%20and%20Release/badge.svg)

## `tvprogram` ioBroker 适配器
该适配器定期轮询有关电视节目的信息。
数据可显示在各种小部件中。

要进行设置，适配器必须已经访问并填充了必要的数据。
由于其大小，数据不是存储在数据点中，而是存储在文件（Linux 路径：/opt/iobroker/data-files/tvprogram）和适配器的内存中。
在配置中，小部件只需要填充适配器的任何数据点（例如 cmd）。
小部件会自动搜索所有剩余的数据点。

＃＃ 安装
该适配器可以通过稳定版本安装，也可以通过 beta/latest 存储库安装测试版本。

### 适配器配置
您可以配置多少台不同的电视，或者至少是您将拥有的不同配置。

### 小部件
小部件仅受现代浏览器（Google Chrome、Mozilla Firefox、Opera、Safari）支持。
不支持不带 Chromium 的 Internet Explorer 或 Microsoft Edge（版本 <79）。

＃＃＃＃ 时间
此小部件按电视频道在时间线上显示当前电视节目。

如果频道徽标后面的文本显示出来，则必须在小部件中选择背景颜色。
通常，为视图或至少为小部件选择明确的前景色和背景色是一种好方法。
标记位置每 15 秒更新一次。

如果安装后出现问题并且小部件无法正确显示，请尝试从 shell 中执行以下命令：

iobroker 上传全部

vis 中可配置以下属性最低配置是将数据点设置为 cmd-datapoint。

| 属性 | 示例 | 说明 |
| ----------------------- | --------------------- | ----------------------------------------------------- |
| `tvprogram_oid` | `tvprogram.0.tv1.cmd` | `tvprogram` 适配器实例的数据点。|
| `heightRow` | 35 | 每行显示的高度 |
| `showpictures` | x | 如有图片，在时间线上显示 |
| `headerfontpercent` | 125 | 标题（时间）的字符大小百分比 |
| `broadcastfontpercent` | 75 | 广播的字符大小百分比 |
| `highlightcolor` | 黄色 | 收藏颜色 |
| `markerpositionpercent` | 25 | 标记相对于小部件宽度的百分比位置 |
| `dialogwidthpercent` | 90 | 对话框的大小占小部件的百分比 |
| `dialogheightpercent` | 90 | 对话框的大小占小部件的百分比 |
| `dialogheightpercent` | 90 | 对话框大小占小部件的百分比 |

CSS 类
请将`w00001`更改为您的小部件ID

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

如果您使用一些带有其他 z-index 设置的额外对话框，则可以为电视节目对话框设置更高的 z-index。
也许您必须设置一个高于 300 的数字。这取决于重叠或隐藏电视节目（广播信息和频道选择）对话框的其他对话框中的设置

```css
.ui-dialog.w00001 {
  z-index: 300 !important;
}
```

更改广播交替背景颜色的格式

```css
#w00001 .scrollcontainer ul.tv-row:nth-child(odd) > li.broadcast:nth-child(odd),
#w00001 ul.tv-row:nth-child(odd) > li.time:nth-child(odd) {
  background-color: rgba(128, 128, 128, 0.65);
}
#w00001
  .scrollcontainer
  ul.tv-row:nth-child(odd)
  > li.broadcast:nth-child(even),
#w00001 ul.tv-row:nth-child(odd) > li.time:nth-child(even) {
  background-color: rgba(128, 128, 128, 0.55);
}
#w00001
  .scrollcontainer
  ul.tv-row:nth-child(even)
  > li.broadcast:nth-child(odd) {
  background-color: rgba(128, 128, 128, 0.45);
}
#w00001
  .scrollcontainer
  ul.tv-row:nth-child(even)
  > li.broadcast:nth-child(even) {
  background-color: rgba(128, 128, 128, 0.35);
}
```

#### 收藏
此小部件显示所选收藏夹的列表，按日期和时间排序。

vis 中可配置以下属性最低配置是将数据点设置为 cmd-datapoint。

| 属性 | 示例 | 说明 |
| ---------------- | ---------------------- | ----------------------------------------------------- |
| `oid` | `tvprogram.0.tv 1.cmd` | `tvprogram` 适配器实例的数据点。|
| `showweekday` | `yes` | 显示工作日 |
| `maxfavorites` | 10 | 最多可显示收藏数 |
| `highlightcolor` | `yellow` | 收藏颜色 |
| `highlightcolor` | `yellow` | 收藏颜色 |

＃＃＃＃ 控制
此小部件显示所有实际广播。您可以点击频道徽标来切换频道。
您可以点击广播来获取有关该广播的详细信息。

vis 中可配置以下属性最低配置是将数据点设置为 cmd-datapoint。

| 属性 | 示例 | 说明 |
| ---------------------- | ------------------------ | -------------------------------------------------------------------------------------------------- |
| `oid` | `tvprogram.0.tv1.cmd` | `tvprogram` 适配器实例的数据点。|
| `time` | 20:15 | 如果时间只显示此时的广播 120 分钟，则显示第二天的广播 |
| `time` | 20:15/200 | 如果时间有持续时间，则此时的广播将播放 200 分钟 |
| `time` | 2021-02-15T20:15:00.000Z | 如果 UTC-Datestring 有效，则将显示此时的广播。记住时区 |
| `heightRow` | 35 | 每行显示的高度 |
| `showpictures` | x | 如果有图片则显示 |
| `broadcastfontpercent` | 75 | 广播的字符大小百分比 |
| `highlightcolor` | `yellow` | 收藏颜色 |
| `dialogwidthpercent` | 90 | 对话框的大小占小部件的百分比 |
| `dialogheightpercent` | 90 | 对话框的大小占小部件的百分比 |
| `dialogheightpercent` | 90 | 对话框大小占小部件的百分比 |

CSS 类
请将`w00001`更改为您的小部件ID

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
使用此小部件，您可以搜索标题、说明、开始日期和广播类型内的广播。
输入字段“从”预先填写了实际日期。如果此字段不变，则搜索从实际时间开始。
如果您将此字段更改为未来或过去的日期，则搜索从该日期的 00:00 开始。
必须填写/选择输入字段搜索文本和类别中的一个或两个。

vis 中可配置以下属性最低配置是将数据点设置为 cmd-datapoint。

| 属性 | 示例 | 说明 |
| ---------------------- | --------------------- | ----------------------------------------------------- |
| `Object ID` | `tvprogram.0.tv1.cmd` | `tvprogram` 适配器实例的数据点。|
| `maxresults` | 10 | 列表中的最大结果 |
| `heightRow` | 35 | 每行显示的高度 |
| `broadcastfontpercent` | 75 | 广播的字符大小百分比 |
| `highlightcolor` | `yellow` | 收藏颜色 |
| `dialogwidthpercent` | 90 | 对话框的大小占小部件的百分比 |
| `dialogheightpercent` | 90 | 对话框的大小占小部件的百分比 |
| `dialogheightpercent` | 90 | 对话框大小占小部件的百分比 |

CSS 类
请将`w00001`更改为您的小部件ID

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
每台创建的电视都存在以下数据点集

#### `channelfilter`
该数据点包含小部件中以 JSON 数组形式显示的通道

#### `cmd`
该数据点用于小部件和适配器之间的内部通信

#### `favorites`
该数据点以 JSON 数组的形式包含所选的收藏夹

#### `record`
如果用户点击广播详细视图中的录制按钮，则会设置此数据点。
提供的数据是

| 字段 | 示例 | 说明 |
| ------------- | ------------------------- | ---------------------- |
| `startTime` | 2021-01-01T00:10:00+01:00 | 开始时间 |
| `title` | 广播标题 | 广播标题 |
| `channel` | 7 | 唯一频道编号 |
| `channelid` | `zdf` | 唯一频道 ID |
| `channelname` | `ZDF` | 可读频道名称 |
| `eventid` | 12345678 | 唯一广播 ID |
| `eventid` | 12345678 | 唯一广播 ID |

#### `selectchannel`
该数据点用于通过单击详细视图中的频道徽标或切换图标来识别频道切换命令。

#### `show`
此数据点包含是否只应在小部件 tvprogram 中显示收藏夹或所有内容的状态

#### `config`
此数据点已弃用，将在下一版本中删除

### 提供`Sendto` 命令
可以通过 sendto 命令从适配器请求所有数据。这可用于开发单独的功能

#### `getServerData`
从适配器请求基础数据。

##### 有效参数为
- `类别`
- `类型`
- `频道`

**返回：**

`Array`

**例子：**

```javascript
sendTo("tvprogram.0", "getServerData", "categories", (data) =>
  console.log(data),
);
```

#### `getServerTVProgram`
从适配器请求程序数据。

##### 有效参数是
以下格式的日期字符串：`yyyy-mm-dd`

**返回：**

`Array`

**例子：**

```javascript
sendTo("tvprogram.0", "getServerTVProgram", "2021-02-10", (data) =>
  console.log(data),
);
```

#### `getServerBroadcast`
请求广播的详细数据。

##### 有效参数是
包含以下格式的 viewdate 的对象 yyyy-mm-dd 广播的 eventid

**返回：**

`Object`

**例子：**

```javascript
sendTo(
  "tvprogram.0",
  "getServerBroadcast",
  { viewdate: "2021-02-10", eventid: "10659522" },
  (data) => console.log(data),
);
```

#### `getFavoritesData`
从现在开始直到数据保存结束为止请求所有喜欢的广播。

##### 有效参数是
`Array` 的收藏

**返回：**

`Array`

**例子：**

```javascript
sendTo("tvprogram.0", "getFavoritesData", ["heute", "Tagesschau"], (data) =>
  console.log(data),
);
```

#### `getServerBroadcastNow`
请求当前正在运行的所有广播

##### 有效参数是
您喜欢的频道的 channelID 数组

**返回：**

`Array`

**例子：**

```javascript
sendTo("tvprogram.0", "getServerBroadcastNow", [1, 6, 22, 7], (data) =>
  console.log(data),
);
```

#### `getServerBroadcastDate`
请求在某个日期时间运行的所有广播

##### 有效参数是
您最喜欢的频道的 channelID 数组 datetime

**返回：**

`Array`

**例子：**

```javascript
sendTo(
  "tvprogram.0",
  "getServerBroadcastDate",
  { channelfilter: [1, 6, 22, 7], date: "2021-02-10T20:15:00.000Z" },
  (data) => console.log(data),
);
```

#### `getServerBroadcastFind`
搜索一定时间范围内的广播，并可按类别搜索

##### 有效参数是
`channelfilter`：您最喜爱的频道的频道 ID 数组 `categoryfilter`：可选的类别 ID 数组 `datetimefrom`：日期时间从 `datetimetill`：日期时间到 `textfilter`：可选的要搜索的标题或部分标题 `maxresults`：可选的最大结果数量。默认值为 10

**返回：**

`Array`

**例子：**

```javascript
sendTo(
  "tvprogram.0",
  "getServerBroadcastFind",
  {
    channelfilter: [1, 6, 22, 7],
    categoryfilter: [],
    datefrom: "2021-02-10T10:00:00.000Z",
    datetill: "2021-02-10T23:00:00.000Z",
    textfilter: "",
    maxresults: 10,
  },
  (data) => console.log(data),
);
```

#### `getServerInfo`
请求适配器内存中可用的广播日期

##### 有效参数为
空对象

**返回：**

`Array`

**例子：**

```javascript
sendTo("tvprogram.0", "getServerInfo", "{}", (data) => console.log(data));
```

### 社区提供小部件/脚本
#### `Harmony` 和 `MagentaTV`
由 pix 提供的脚本 点击频道徽标后，脚本将映射的频道 ID 设置为 harmony-datapoint

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
const channelList = {
  // Ausgabe vom Adapter : Kanalnummer im Receiver
  ard: 1,
  zdf: 2,
  rtl: 3,
  sat1: 4,
  pro7: 5,
  vox: 6,
  kaka: 7,
  rtl2: 8,
  superrtl: 9,
  kika: 10,
  /* nickelodeon 11 */
  "3sat": 12,
  welt: 13,
  ntv: 14,
  phoenix: 15,
  tele5: 16,
  zdfneo: 17,
  /* #dabeiTV 18 */
  /* disneyplus 19 */
  /* lokalTV 20 */
  bayern3: 21,
  hessen3: 25,
  mdr: 27,
  nord3: 29,
  /* "bremen":30, */
  /* "rbb berlin":31, */
  /* "sr":36, */
  sw3: 37, // bw
  /* "sw3":38, // rp */
  west3: 39,
  /* "eurosport1":50, */
  sport1: 51,
  /* sky sport news 52 */
  arte: 55,
  one: 56,
  /* anixe 60 */
  dmax: 64,
  pro7maxx: 69,
  nitro: 70,
  /* sat1 gold 73 */
  sixx: 75,
  /* ard alpha 80 */
  /* DW 85 */
  /* euronews */
  /* Kabel Eins Doku 89 */
  /* N24 Doku 90 */
  tagesschau24: 91,
  /* Welt der Wunder 92 */
  /* zdfinfo 93 */
  mtv: 99,
};

function selectChannel(chNo) {
  // Zerlegen mehrstelliger Zahlen
  let ch_arr = new Array();
  ch_arr = [];
  if (logging) log("Kanalnummer gewählt: " + chNo);
  while (chNo > 0) {
    // rückwärts
    if (logging) log("erkannte Ziffer: " + (chNo % 10));
    ch_arr.push(chNo % 10); // letzte Ziffer hinten dran hängen
    chNo = chNo / 10;
    chNo = parseInt(chNo);
  }
  // array umdrehen und wieder auslesen und Taste(n) der HARMONY+Fernbedienung drücken
  ch_arr.reverse();
  if (logging) log("Senderplatz hat " + ch_arr.length + " Ziffern" + ch_arr);
  for (let i = 0; i < ch_arr.length; i++) {
    // passende OID füllen
    setStateDelayed(
      "harmony.0.Harmony_Hub.Telekom-DVR.Number" + ch_arr[i],
      1,
      fbdelay,
      function () {
        if (logging) log(i + 1 + ". Taste: " + ch_arr[i] + " gedrückt");
      },
    );
  }
}

on(idKanalWahl, function (obj) {
  log(
    "Neues TV Programm: " +
      obj.state.val +
      " auf Kanal " +
      channelList[obj.state.val] +
      " gewählt",
  );
  selectChannel(channelList[obj.state.val]);
});
```

### 适配器中未实现的功能，但作为 javascript 适配器的脚本提供
#### `Recordlist`
记录数据点记录的所有当前记录时间的列表，每分钟更新一次。
您必须配置 RecorderList 的数据点名称和要观察的数据点的名称。
脚本将记录添加到列表后，记录数据点将被清空。

```javascript
// datapoint where the List should be saved
var recorderListDP = "0_userdata.0.tvprogram.RecorderList";
// datapoint who should be monitored of new data
var recorderDP = "tvprogram.0.tv1.record";

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
  s = s == "" ? (s = "[]") : s;
  recorderList = JSON.parse(s) || [];
  index = recorderList.findIndex(function (el) {
    return JSON.stringify(el) == JSON.stringify(recObj);
  });
  if (index > -1) {
    recorderList.splice(index, 1);
  }
  recorderList.push(recObj);
  setState(recorderListDP, JSON.stringify(recorderList));
  setState(recorderDP, "");
});
var timer = setInterval(function () {
  var recorderList;
  var s = getState(recorderListDP).val;
  s = s == "" ? (s = "[]") : s;
  recorderList = JSON.parse(s) || [];
  recorderList = recorderList.filter((el) => new Date(el.endTime) > new Date());
  setState(recorderListDP, JSON.stringify(recorderList));
}, 1000 * 60);
```

为了可视化这些数据，适配器 myTime 中的小部件 JSON 模板可以帮助使用以下模板。
将带有`recordlist` 的数据点作为 json_oid 输入，并将以下代码作为 json_template 输入：

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

#### 目前最喜欢的广播
下面的脚本每分钟确定一次你最喜欢的程序当前是否正在运行。

```javascript
// Favorites datapoint of your tv
var favoritesDP = "tvprogram.0.tv1.favorites";
// channelfilter datapoint of your tv
var channelfilterDP = "tvprogram.0.tv1.channelfilter";
// datapoint where the result should be saved
var favoritesBool = "0_userdata.0.tvprogram.favoriteNow";

var timer = setInterval(function () {
  var favorites = JSON.parse(getState(favoritesDP).val);
  var channelfilter = JSON.parse(getState(channelfilterDP).val);
  sendTo("tvprogram.0", "getServerBroadcastNow", channelfilter, (data) => {
    setState(
      favoritesBool,
      data.some((el) => favorites.includes(el.events[0].title)),
    );
  });
}, 1000 * 60);
```

#### 对位于小部件 tvprogram 中的`recordlist`数据点的程序进行着色
以下模板用于来自适配器 rssfeed 的小部件 JSON 模板。
此模板不会生成任何可见输出，但会生成为当前程序着色的 css 指令。
它还会为详细视图中的记录按钮着色。

要使用此模板，请在小部件属性 json_oid 中选择 recordlist 数据点，并在 json_template 中插入以下模板

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

### 函数
- 按电视频道在时间线上显示电视数据
- 显示电视广播的详细信息（如果有）
- 显示自动滚动的实际位置标记
- 配置显示的电视频道和顺序，可以通过拖放重新排序。
- 点击徽标后通过数据点切换命令
- 放大/缩小
- 导航下一天和前一天
- 播放按钮切换频道数据点
- 中心放大未来几天
- 回到今天
- 重置缩放
- 喜爱的广播
- 从详细信息视图复制文本
- 标记位置可配置
- 对话框的宽度和高度可配置
- Datenpunkt 记录，der nach druck auf Knopf mit Aufnahmedaten gefüllt wird
- 收藏夹小部件
- 隐藏非收藏夹

### 待办事项
小部件电视节目：

- 或许是一个精彩集锦广播小部件
- 其他来源的数据适配器（互联网、Enigma、VU-Box 等硬件）。由于需求低，目前暂缓考虑此问题
- ~~改进配置小部件的文档~~
- ~~如果时间小部件的主视图中可用，则广播图片~~
- ~~搜索全文还可以找到导演和演员~~
- ~~时间小部件中按钮的工具提示~~
- ~~基于现有电视节目脚本的更多小部件的想法~~
- ~~问题：Firefox 中无限滚动~~
- ~~待讨论：Datenpunkt，mit allen Aufnahmedaten，应该在录像机适配器上或在单独的脚本中实现~~
- ~~详细视图的响应式设计->jQuery 对话框无法实现响应式设计，已找到另一种解决方案，其高度>宽度具有固定布局~~
- ~~问题：如果滚动窗格在左侧完成，则会出现小像素故障~~

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.1.0 (2024-11-24)

- Change sento command from getFavoritesDatax to getFavoritesData
- switch to eslint
- complete rework of tvprogram to switch from callback to await

### 2.0.2 (2024-11-17)

- fix jsonconfig
- add node 22 to testing

### 2.0.1 (2024-11-16)

- fix lint errors

### 2.0.0 (2024-11-16)

- fix lint errors
- align structures and files
- switch to jsonconfig
- config translations
- make vis2 compatible (maybe some glitches included, please report)

### 1.1.1 (2021-08-10)

- remove dead code / extend doku about the warnings in the iobroker log \* change the method of setting for configuration data from widget to datapoint

### 1.1.0 (2021-05-06)

- tooltips for the buttons in the time widget / search through the whole text to also find directors and actors / add showpictures option in time,control and search widget / improve documentation

### 1.0.0

- (oweitman) stable version

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

Copyright (c) 2024 oweitman <oweitman@gmx.de>