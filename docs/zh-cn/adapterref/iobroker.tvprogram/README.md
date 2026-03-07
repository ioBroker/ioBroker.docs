---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tvprogram/README.md
title: ioBroker.tvprogram
hash: HQCNcfKk0ZimHkvdAFc4Ul9MGZEncFjEfpVSBztwIv8=
---
![标识](../../../en/adapterref/iobroker.tvprogram/admin/tvprogram.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.tvprogram.svg)
![下载](https://img.shields.io/npm/dm/iobroker.tvprogram.svg)
![安装数量](https://iobroker.live/badges/tvprogram-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/tvprogram-stable.svg)
![NPM](https://nodei.co/npm/iobroker.tvprogram.png?downloads=true)

# IoBroker.tvprogram
**测试：** ![测试与发布](https://github.com/oweitman/ioBroker.tvprogram/workflows/Test%20and%20Release/badge.svg)

## `tvprogram` ioBroker 适配器
该适配器会定期轮询电视节目信息。

数据可以显示在各种小部件中。

要进行设置，适配器必须已访问并填充必要的数据。

由于数据量较大，数据并非存储在数据点中，而是存储在文件（Linux 路径：/opt/iobroker/data-files/tvprogram）和适配器的内存中。

在配置中，只需在小部件中填写适配器的任意数据点（例如 cmd）。

小部件会自动搜索所有剩余的数据点。

＃＃ 安装
该适配器可通过稳定版安装，也可通过 beta/latest 仓库安装测试版。

## 适配器配置
您可以配置要拥有多少台不同的电视，或者至少要配置不同的电视机组合。

### 小部件
小部件仅在现代浏览器（Google Chrome、Mozilla Firefox、Opera、Safari）中受支持。

不支持未安装 Chromium 内核的 Internet Explorer 或 Microsoft Edge（版本低于 79）。

＃＃＃＃ 时间
此小部件按电视频道以时间轴形式显示当前电视节目。

如果频道徽标后面的文字透出，则必须在组件中选择背景颜色。

通常，为视图或至少为组件选择明确的前景色和背景色是一个好方法。

标记位置每 15 秒更新一次。

如果安装后出现问题，小部件显示不正确，请尝试从 shell 运行以下命令：

iobroker 全部上传

vis 中可配置以下属性。最低配置是将数据点设置为 cmd-datapoint。

| 属性 | 示例 | 描述 |
| ----------------------- | --------------------- | ----------------------------------------------------- |
| `tvprogram_oid` | `tvprogram.0.tv1.cmd` | `tvprogram`适配器实例的数据点。 |
| `heightRow` | 35 | 每行显示高度 |
| `showpictures` | x | 如有图片，请在时间线中显示 |
| `headerfontpercent` | 125 | 标题（时间）的字符大小百分比 |
| `broadcastfontpercent` | 75 | 广播字符大小百分比 |
| `highlightcolor` | 黄色 | 收藏夹颜色 |
| `markerpositionpercent` | 25 | 标记位置占控件宽度的百分比 |
| `dialogwidthpercent` | 90 | 对话框大小占控件大小的百分比 |
| `dialogheightpercent` | 90 | 对话框大小占控件大小的百分比 |
| `dialogheightpercent` | 90 | 对话框高度占控件高度的百分比 |

##### CSS 类
请将 `w00001` 替换为您的组件 ID

更改对话框格式

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

如果您使用了一些具有其他 z-index 设置的额外对话框，则可以为电视节目对话框设置更高的 z-index。

您可能需要设置一个大于 300 的值。这取决于其他对话框的设置，这些对话框可能会与电视节目（广播信息和频道选择）对话框重叠或隐藏。

```css
.ui-dialog.w00001 {
    z-index: 300 !important;
}
```

更改广播节目交替背景颜色的格式

```css
#w00001 .scrollcontainer ul.tv-row:nth-child(odd) > li.broadcast:nth-child(odd),
#w00001 ul.tv-row:nth-child(odd) > li.time:nth-child(odd) {
    background-color: rgba(128, 128, 128, 0.65);
}
#w00001 .scrollcontainer ul.tv-row:nth-child(odd) > li.broadcast:nth-child(even),
#w00001 ul.tv-row:nth-child(odd) > li.time:nth-child(even) {
    background-color: rgba(128, 128, 128, 0.55);
}
#w00001 .scrollcontainer ul.tv-row:nth-child(even) > li.broadcast:nth-child(odd) {
    background-color: rgba(128, 128, 128, 0.45);
}
#w00001 .scrollcontainer ul.tv-row:nth-child(even) > li.broadcast:nth-child(even) {
    background-color: rgba(128, 128, 128, 0.35);
}
```

#### 收藏夹
此小部件显示所选收藏列表，按日期和时间排序。

vis 中可配置以下属性。最低配置是将数据点设置为 cmd-datapoint。

| 属性 | 示例 | 描述 |
| ---------------- | ---------------------- | ----------------------------------------------------- |
| `oid` | `tvprogram.0.tv 1.cmd` | `tvprogram`适配器实例的数据点。 |
| `showweekday` | `yes` | 显示工作日 |
| `maxfavorites` | 10 | 最多显示 10 个收藏 |
| `highlightcolor` | `yellow` | 收藏夹颜色 |
| `高亮颜色` | `黄色` | 收藏夹颜色 |

＃＃＃＃ 控制
此小部件显示所有正在播出的节目。您可以点击频道图标切换频道。

您可以点击节目查看其详细信息。

vis 中可配置以下属性。最低配置是将数据点设置为 cmd-datapoint。

| 属性 | 示例 | 描述 |
| ---------------------- | ------------------------ | -------------------------------------------------------------------------------------------------- |
| `oid` | `tvprogram.0.tv1.cmd` | `tvprogram`适配器实例的数据点。 |
| `time` | 20:15 | 如果只有时间，此时的广播将播出 120 分钟，然后播出第二天的节目 |
| `time` | 20:15/200 | 如果时间带有持续时间，则此时间的广播将持续 200 分钟 |
| `time` | 2021-02-15T20:15:00.000Z | 如果是有效的 UTC 日期字符串，则会显示此时间的广播。请记住时区 |
| `heightRow` | 35 | 每行显示高度 |
| `showpictures` | x | 如有图片，显示图片 |
| `broadcastfontpercent` | 75 | 广播字符大小百分比 |
| `highlightcolor` | `yellow` | 收藏夹颜色 |
| `dialogwidthpercent` | 90 | 对话框大小占控件大小的百分比 |
| `dialogheightpercent` | 90 | 对话框大小占控件大小的百分比 |
| `dialogheightpercent` | 90 | 对话框高度占控件高度的百分比 |

##### CSS 类
请将 `w00001` 替换为您的组件 ID

更改广播节目交替背景颜色的格式

```css
#w00001 .tv-control .tv-row:nth-child(odd) {
    background-color: rgba(128, 128, 128, 0.65);
}
#w00001 .tv-control .tv-row:nth-child(even) {
    background-color: rgba(128, 128, 128, 0.55);
}
```

＃＃＃＃ 搜索
使用此小部件，您可以按标题、描述、开始日期和广播类型搜索广播。

“起始日期”输入框已预先填充实际日期。如果此字段保持不变，搜索将从当前时间开始。

如果您将此字段更改为未来或过去的日期，搜索将从该日期的 00:00 开始。

搜索文本和/或类别输入框必须填写/选中。

vis 中可配置以下属性。最低配置是将数据点设置为 cmd-datapoint。

| 属性 | 示例 | 描述 |
| ---------------------- | --------------------- | ----------------------------------------------------- |
| `Object ID` | `tvprogram.0.tv1.cmd` | `tvprogram`适配器实例的数据点。 |
| `maxresults` | 10 | 列表中的最大结果数 |
| `heightRow` | 35 | 每行显示高度 |
| `broadcastfontpercent` | 75 | 广播字符大小百分比 |
| `highlightcolor` | `yellow` | 收藏夹颜色 |
| `dialogwidthpercent` | 90 | 对话框大小占控件大小的百分比 |
| `dialogheightpercent` | 90 | 对话框大小占控件大小的百分比 |
| `dialogheightpercent` | 90 | 对话框高度占控件高度的百分比 |

##### CSS 类
请将 `w00001` 替换为您的组件 ID

更改广播节目交替背景颜色的格式

```css
#w00001 .tv-search .tv-row:nth-child(odd) {
    background-color: rgba(128, 128, 128, 0.65);
}
#w00001 .tv-search .tv-row:nth-child(even) {
    background-color: rgba(128, 128, 128, 0.55);
}
```

### 提供的数据点
对于每一台创建的电视，都存在以下一组数据点。

#### `channelfilter`
此数据点包含小部件中显示的通道，以 JSON 数组的形式呈现。

#### `cmd`
此数据点用于组件和适配器之间的内部通信。

#### `favorites`
此数据点包含以 JSON 数组形式存储的已选收藏项。

#### `record`
如果用户在广播详情视图中点击录制按钮，则会设置此数据点。

提供的数据如下：

| 字段 | 示例 | 描述 |
| ------------- | ------------------------- | ---------------------- |
| `startTime` | 2021-01-01T00:10:00+01:00 | 开始时间 |
| `title` | 广播标题 | 广播标题 |
| `channel` | 7 | 唯一频道号 |
| `channelid` | `zdf` | 唯一频道 ID |
| `channelname` | `ZDF` | 可读频道名称 |
| `eventid` | 12345678 | 唯一广播 ID |
| `eventid` | 12345678 | 唯一广播 ID |

#### `selectchannel`
该数据点用于识别通过单击频道徽标或详细信息视图中的切换图标发出的频道切换命令。

#### `show`
此数据点包含在小部件电视节目中是仅显示收藏夹还是显示所有内容的状态

#### `config`
此数据点已弃用，将在后续版本中移除。

#### `optchnlogopath`
数据指向一个用于保存备用频道徽标的文件夹。该路径必须可通过浏览器访问。

数据点中必须输入以 http 开头的完整路径，包括末尾的斜杠。

**例子：**

```text
/vis.0/icons/tvlogos/
```

然后可以通过以下方式访问

```text
http://localhost:8082/vis.0/icons/tvlogos/
```

所有图标都应通过 iobroker 文件对话框上传。

例如，请参见第 [备选标志示例](#alternative-channel-logos-by-tino-0) 章

### 提供的 `Sendto`-命令
可以通过 sendto 命令从适配器请求所有数据。这可用于开发个性化功能。

#### `getServerData`
从适配器请求基础数据。

有效参数有
- `类别`
- `类型`
- `频道`

**退货：**

`Array`

**例子：**

```javascript
sendTo('tvprogram.0', 'getServerData', 'categories', data => console.log(data));
```

#### `getServerTVProgram`
从适配器请求程序数据。

有效参数有
日期字符串，格式如下：`yyyy-mm-dd`

**退货：**

`Array`

**例子：**

```javascript
sendTo('tvprogram.0', 'getServerTVProgram', '2021-02-10', data => console.log(data));
```

#### `getServerBroadcast`
请求广播的详细数据。

有效参数有
包含以下格式的查看日期（yyyy-mm-dd）和广播事件 ID 的对象

**退货：**

`Object`

**例子：**

```javascript
sendTo('tvprogram.0', 'getServerBroadcast', { viewdate: '2021-02-10', eventid: '10659522' }, data => console.log(data));
```

#### `getFavoritesData`
从现在到保存数据结束，请求所有您喜欢的广播。

有效参数有
`Array` 收藏夹

**退货：**

`Array`

**例子：**

```javascript
sendTo('tvprogram.0', 'getFavoritesData', ['heute', 'Tagesschau'], data => console.log(data));
```

#### `getServerBroadcastNow`
请求所有当前正在运行的广播

有效参数有
您收藏频道的频道 ID 数组

**退货：**

`Array`

**例子：**

```javascript
sendTo('tvprogram.0', 'getServerBroadcastNow', [1, 6, 22, 7], data => console.log(data));
```

#### `getServerBroadcastDate`
请求在指定日期时间正在运行的所有广播

有效参数有
您收藏频道的频道 ID 数组（日期时间）

**退货：**

`Array`

**例子：**

```javascript
sendTo(
    'tvprogram.0',
    'getServerBroadcastDate',
    { channelfilter: [1, 6, 22, 7], date: '2021-02-10T20:15:00.000Z' },
    data => console.log(data),
);
```

#### `getServerBroadcastFind`
按时间段搜索广播节目，并可选择按类别搜索。

有效参数有
`channelfilter`：您收藏频道的频道 ID 数组 `categoryfilter`：可选的类别 ID 数组 `datetimefrom`：起始日期时间 `datetimetill`：结束日期时间 `textfilter`：可选的搜索标题或部分标题 `maxresults`：可选的最大搜索结果数量。默认值为 10

**退货：**

`Array`

**例子：**

```javascript
sendTo(
    'tvprogram.0',
    'getServerBroadcastFind',
    {
        channelfilter: [1, 6, 22, 7],
        categoryfilter: [],
        datefrom: '2021-02-10T10:00:00.000Z',
        datetill: '2021-02-10T23:00:00.000Z',
        textfilter: '',
        maxresults: 10,
    },
    data => console.log(data),
);
```

#### `getServerInfo`
请求适配器内存中可用的广播日期

有效参数有
空对象

**退货：**

`Array`

**例子：**

```javascript
sendTo('tvprogram.0', 'getServerInfo', '{}', data => console.log(data));
```

社区提供小部件/脚本
#### `Harmony` 和 `MagentaTV`
此脚本由 pix 提供。点击频道徽标后，脚本会将映射的频道 ID 设置为 harmony 数据点。

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
const idKanalWahl = 'tvprogram.0.tv1.selectchannel'; // Dateingabe aus VIS
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
    '3sat': 12,
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
    if (logging) log('Kanalnummer gewählt: ' + chNo);
    while (chNo > 0) {
        // rückwärts
        if (logging) log('erkannte Ziffer: ' + (chNo % 10));
        ch_arr.push(chNo % 10); // letzte Ziffer hinten dran hängen
        chNo = chNo / 10;
        chNo = parseInt(chNo);
    }
    // array umdrehen und wieder auslesen und Taste(n) der HARMONY+Fernbedienung drücken
    ch_arr.reverse();
    if (logging) log('Senderplatz hat ' + ch_arr.length + ' Ziffern' + ch_arr);
    for (let i = 0; i < ch_arr.length; i++) {
        // passende OID füllen
        setStateDelayed('harmony.0.Harmony_Hub.Telekom-DVR.Number' + ch_arr[i], 1, fbdelay, function () {
            if (logging) log(i + 1 + '. Taste: ' + ch_arr[i] + ' gedrückt');
        });
    }
}

on(idKanalWahl, function (obj) {
    log('Neues TV Programm: ' + obj.state.val + ' auf Kanal ' + channelList[obj.state.val] + ' gewählt');
    selectChannel(channelList[obj.state.val]);
});
```

#### Tino 0 设计的备用频道标志
论坛链接及示例截图 <https://forum.iobroker.net/topic/40168/test-adapter-tvprogram/863>

**下载频道标志：**

您必须注册才能下载尺寸为 400x160 的徽标。

<https://vuplus-support.org/wbb4/index.php?thread/64098-mirror-glass-3d-huminator-design-by-stefanbenno6/>

**重命名徽标：**

在下载并解压缩的文件夹中运行以下命令

<details><summary>细节</summary><pre><code> copy 1_0_19_283D_3FB_1_C00000_0_0_0.png ard.png copy 1_0_19_2B66_3F3_1_C00000_0_0_0.png zdf.png copy 1_0_19_EF10_421_1_C00000_0_0_0.png rtl.png copy 1_0_19_EF15_421_1_C00000_0_0_0.png rtl2.png copy 1_0_19_2E9B_411_1_C00000_0_0_0.png srtl.png copy 1_0_19_2EAF_411_1_C00000_0_0_0.png nitro.png copy 1_0_19_EF74_3F9_1_C00000_0_0_0.png sat1.png copy 1_0_19_EF75_3F9_1_C00000_0_0_0.png pro7.png copy 1_0_19_EF78_3F9_1_C00000_0_0_0.png pro7maxx.png copy 1_0_19_EF76_3F9_1_C00000_0_0_0.png kaka.png copy 1_0_19_EF77_3F9_1_C00000_0_0_0.png sixx.png copy 1_0_19_EF11_421_1_C00000_0_0_0.png vox.png copy 1_0_19_1519_455_1_C00000_0_0_0.png tele5.png copy 1_0_19_2B7A_3F3_1_C00000_0_0_0.png zdfneo.png copy 1_0_19_2B98_3F2_1_C00000_0_0_0.png kika.png copy 1_0_19_2B8E_3F2_1_C00000_0_0_0.png 3sat.png copy 1_0_19_285B_401_1_C00000_0_0_0.png phoenix.png copy 1_0_19_157C_41F_1_C00000_0_0_0.png disney.png copy 1_0_19_2871_425_1_C00000_0_0_0.png mdr.png copy 1_0_19_286F_425_1_C00000_0_0_0.png rbb.png copy 1_0_19_283F_3FB_1_C00000_0_0_0.png sw3.png copy 1_0_19_1581_41F_1_C00000_0_0_0.png sport1de.png copy 1_0_19_283E_3FB_1_C00000_0_0_0.png arte.png copy 1_0_19_526C_41D_1_C00000_0_0_0.png anixehd.png copy 1_0_19_151A_455_1_C00000_0_0_0.png dmax.png copy 1_0_19_2855_401_1_C00000_0_0_0.png bayern3.png copy 1_0_19_2873_425_1_C00000_0_0_0.png hessen3.png copy 1_0_1_6EE1_4B1_1_C00000_0_0_0.png radiobremen.png copy 1_0_19_2858_401_1_C00000_0_0_0.png nord3.png copy 1_0_19_2BA2_3F2_1_C00000_0_0_0.png info.png copy 1_0_19_132F_3EF_1_C00000_0_0_0.png orf1.png copy 1_0_19_1330_3EF_1_C00000_0_0_0.png orf2.png copy 1_0_19_2777_409_1_C00000_0_0_0.png mtv.png copy 1_0_19_288A_40F_1_C00000_0_0_0.png sw3.sr.png copy 1_0_1_6F76_457_1_C00000_0_0_0.png west3.png copy 1_0_19_2887_40F_1_C00000_0_0_0.png tagesschau24.png COPY 1_0_16_2EB9_411_1_C00000_0_0_0.png ntv.png copy 1_0_19_2888_40F_1_C00000_0_0_0.png one.png copy 1_0_19_2889_40F_1_C00000_0_0_0.png alpha.png copy 1_0_1_445F_453_1_C00000_0_0_0.png welt.png copy 1_0_1_772D_416_1_C00000_0_0_0.png eurosp.png copy 1_0_1_76C8_40E_1_C00000_0_0_0.png comedycentral.png copy 1_0_1_2F1D_441_1_C00000_0_0_0.png rtlnitro.png</code></pre></details>

在可视化界面中创建新文件夹：

在“文件管理器”对话框中打开。

检查以下路径是否存在，或者在对话框中创建该路径。

```text
/vis.0/icons/tvlogos/
```

**在数据点中输入路径：*

将以下路径输入到电视的数据点 `optchnlogopath` 中。

将 192.1.2.3 替换为您的 iobroker 安装的 IP 地址。

```text
http://192.1.2.3:8082/vis.0/icons/tvlogos/
```

调整图标宽度：

每个组件都有一个属性“通道徽标宽度（像素）”。请为图标集输入合适的宽度。

### 这些函数未在适配器中实现，但作为脚本提供给 javascript-adapter。
#### `Recordlist`
此列表显示记录数据点记录的所有当前录制时间，并每分钟更新一次。

您需要配置 RecorderList 的数据点名称以及要观察的数据点名称。

脚本将录制内容添加到列表后，该记录数据点将被清空。

```javascript
// datapoint where the List should be saved
var recorderListDP = '0_userdata.0.tvprogram.RecorderList';
// datapoint who should be monitored of new data
var recorderDP = 'tvprogram.0.tv1.record';

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
    s = s == '' ? (s = '[]') : s;
    recorderList = JSON.parse(s) || [];
    index = recorderList.findIndex(function (el) {
        return JSON.stringify(el) == JSON.stringify(recObj);
    });
    if (index > -1) {
        recorderList.splice(index, 1);
    }
    recorderList.push(recObj);
    setState(recorderListDP, JSON.stringify(recorderList));
    setState(recorderDP, '');
});
var timer = setInterval(function () {
    var recorderList;
    var s = getState(recorderListDP).val;
    s = s == '' ? (s = '[]') : s;
    recorderList = JSON.parse(s) || [];
    recorderList = recorderList.filter(el => new Date(el.endTime) > new Date());
    setState(recorderListDP, JSON.stringify(recorderList));
}, 1000 * 60);
```

为了可视化这些数据，可以使用 myTime 适配器中的小部件 JSON 模板，模板如下。

将 json_oid 设置为包含 `recordlist` 的数据点，并将以下代码设置为 json_template：

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

#### 目前最喜欢的节目
以下脚本每分钟检查一次用户收藏的程序是否正在运行。

```javascript
// Favorites datapoint of your tv
var favoritesDP = 'tvprogram.0.tv1.favorites';
// channelfilter datapoint of your tv
var channelfilterDP = 'tvprogram.0.tv1.channelfilter';
// datapoint where the result should be saved
var favoritesBool = '0_userdata.0.tvprogram.favoriteNow';

var timer = setInterval(function () {
    var favorites = JSON.parse(getState(favoritesDP).val);
    var channelfilter = JSON.parse(getState(channelfilterDP).val);
    sendTo('tvprogram.0', 'getServerBroadcastNow', channelfilter, data => {
        setState(
            favoritesBool,
            data.some(el => favorites.includes(el.events[0].title)),
        );
    });
}, 1000 * 60);
```

#### 对位于 tvprogram 小部件中 `recordlist` 数据点的节目进行着色
以下模板适用于来自适配器 RSS 源的小部件 JSON 模板。

此模板不会生成任何可见输出，但会生成 CSS 指令，用于为当前节目着色。

它还会为详细视图中的录制按钮着色。

要使用此模板，请在小部件属性 json_oid 中选择记录列表数据点，并将以下模板插入 json_template 中。

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
- 按电视频道在时间轴上显示电视数据
- 显示有关电视广播的详细信息（如有）
- 显示实际位置标记，并自动滚动
- 配置显示的电视频道和顺序，可以通过拖放进行重新排序。
点击徽标后，通过数据点切换命令
放大/缩小
- 导航至上一天和下一天
- 播放按钮切换通道数据点
接下来几天将重点放在中心缩放上
返回今天
- 重置缩放
- 最喜欢的节目
- 从详细信息视图复制文本
- 标记位置可配置
对话框的宽度和高度可配置
- Datenpunkt 记录，由 Knopf 和 Aufnahmedaten gefüllt wird 提供
- 收藏夹小部件
- 隐藏非收藏项

### 待办事项
小部件电视节目：

或许可以添加一个精彩集锦广播小部件
- 用于连接其他来源（互联网、Enigma、VU-Box 等硬件）的数据适配器。由于需求量低，目前暂不考虑此项事宜。
改进组件配置文档
- ~~如果时间控件主视图中有广播图片，则显示这些图片~~
——请通读全文，查找导演和演员信息。
- 时间控件中按钮的工具提示
- ~~基于现有电视节目剧本的更多小部件创意~~
问题：Firefox 中出现无限滚动
- ~~待讨论：Datenpunkt，mit allen Aufnahmedaten，应该在录像机适配器上或在单独的脚本中实现~~
- ~~详情视图的响应式设计->由于 jQuery 对话框无法实现响应式设计，我们找到了另一种解决方案，即使用固定高度>宽度的布局~~
问题：当滚动条完全滚动到左侧时，会出现轻微的像素闪烁。

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 4.0.3 (2026-02-27)

- update dependencies
- improve error handling

### 4.0.2 (2026-01-27)

- improve position of dialogs
- reduce requests to data provider
- test remove node 18,extend to node 24

### 4.0.0 (2025-01-21)

- Breaking Change. fix marker position with flexible width of channel logos. In each widget the property "width channel logo px" have to be set to approbiate width.

### 3.0.5 (2025-01-20)

- upgrade jscontroller dependency

### 3.0.4 (2025-01-20)

- remove check for certifates in axios due to expired certificate of data provider

### 3.0.3 (2025-01-03)

- fix datapoint creation and overwriting states

### 3.0.2 (2025-01-02)

- improve debug messages

### 3.0.1 (2025-01-02)

- fix channel select dialog
- fix css classes

### 3.0.0 (2025-01-02)

- TVs as a device, this is a major change because all data points have to be deleted manually by the user
- improve datapoint creation

### 2.3.1 (2025-01-02)

- little docu fixes

### 2.3.0 (2025-01-02)

- add datapoint for optional channel icons
- add logic in the widgets

### 2.2.0 (2024-12-16)

- remove jquery-ui dependency
- fix dialog is visible on view switch, now it's modal
- fix adapter icon
- fix eslint errors
- switch some callbacks to promises
- remove unused code

### 2.1.0 (2024-11-24)

- Change sento command from getFavoritesDatax to getFavoritesData
- switch to eslint
- complete rework of tvprogram to switch from callback to await
- the widgets are now compatible with vis-2 (minimum vis-2 version ist 2.10)
- due to datapoint management, all datapoints should be deleted.

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

Copyright (c) 2025-2026 oweitman <oweitman@gmx.de>