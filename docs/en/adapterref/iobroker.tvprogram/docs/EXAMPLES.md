---
chapters: {"pages":{"en/adapterref/iobroker.tvprogram/README.md":{"title":{"en":"ioBroker.tvprogram"},"content":"en/adapterref/iobroker.tvprogram/README.md"},"en/adapterref/iobroker.tvprogram/docs/EXAMPLES.md":{"title":{"en":"Examples"},"content":"en/adapterref/iobroker.tvprogram/docs/EXAMPLES.md"}}}
---
# Examples

This document contains extended examples for ioBroker.tvprogram. Adjust
instance numbers, TV IDs, widget IDs, data points and channel mappings to
match your installation. The main documentation is in the
[README](/#/adapters/tvprogram).

## Widget styling

Replace `w00001` with the ID of your widget.

### Timetable

Change the dialog backgrounds:

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

If other dialogs overlap the programme or channel dialogs, increase their
`z-index`. The required value depends on the other dialogs in the view.

```css
.ui-dialog.w00001 {
    z-index: 300 !important;
}
```

Change the alternating programme background colors:

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

### TV Control

Change the alternating programme background colors:

```css
#w00001 .tv-control .tv-row:nth-child(odd) {
    background-color: rgba(128, 128, 128, 0.65);
}
#w00001 .tv-control .tv-row:nth-child(even) {
    background-color: rgba(128, 128, 128, 0.55);
}
```

### Search

Change the alternating programme background colors:

```css
#w00001 .tv-search .tv-row:nth-child(odd) {
    background-color: rgba(128, 128, 128, 0.65);
}
#w00001 .tv-search .tv-row:nth-child(even) {
    background-color: rgba(128, 128, 128, 0.55);
}
```

## `sendTo` command examples

### `getServerData`

Request base data from the adapter.

#### Valid parameters

- `categories`
- `genres`
- `channels`

**Returns:**

`Array`

**Example:**

```javascript
sendTo('tvprogram.0', 'getServerData', 'categories', data => console.log(data));
```

### `getServerTVProgram`

Request program data from the adapter.

#### Valid parameters

a datestring in the following format: `yyyy-mm-dd`

**Returns:**

`Array`

**Example:**

```javascript
sendTo('tvprogram.0', 'getServerTVProgram', '2021-02-10', data => console.log(data));
```

### `getServerBroadcast`

Request the detail data of a broadcast.

#### Valid parameters

a object that contains an
viewdate in the following format yyyy-mm-dd
the eventid of the broadcast

**Returns:**

`Object`

**Example:**

```javascript
sendTo('tvprogram.0', 'getServerBroadcast', { viewdate: '2021-02-10', eventid: '10659522' }, data => console.log(data));
```

### `getFavoritesData`

Request all favorite broadcast from now till end of saved data.

#### Valid parameters

`Array` of favorites

**Returns:**

`Array`

**Example:**

```javascript
sendTo('tvprogram.0', 'getFavoritesData', ['heute', 'Tagesschau'], data => console.log(data));
```

### `getServerBroadcastNow`

Requests all broadcasts that are currently running

#### Valid parameters

Array of channelIDs of your favorite channels

**Returns:**

`Array`

**Example:**

```javascript
sendTo('tvprogram.0', 'getServerBroadcastNow', [1, 6, 22, 7], data => console.log(data));
```

### `getServerBroadcastDate`

Requests all broadcasts that are running at a datetime

#### Valid parameters

Array of channelIDs of your favorite channels
datetime

**Returns:**

`Array`

**Example:**

```javascript
sendTo(
    'tvprogram.0',
    'getServerBroadcastDate',
    { channelfilter: [1, 6, 22, 7], date: '2021-02-10T20:15:00.000Z' },
    data => console.log(data),
);
```

### `getServerBroadcastFind`

Search for broadcasts in a range of time and optional with categories

#### Valid parameters

`channelfilter`: Array of channelIDs of your favorite channels
`categoryfilter`: Optional Array of categoryIDs
`datetimefrom`: datetime from
`datetimetill`: datetime till
`textfilter`: Optional title or part of a title to search
`maxresults`: Optional the max amount of results. Default value is 10

**Returns:**

`Array`

**Example:**

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

### `getServerInfo`

Request available dates of broadcast in the adapter memory

#### Valid parameters

empty object

**Returns:**

`Array`

**Example:**

```javascript
sendTo('tvprogram.0', 'getServerInfo', '{}', data => console.log(data));
```

## Community integrations

### `Harmony` and `MagentaTV`

Skript provided by pix
After click on the channel logo the script sets the mapped channel-id to the harmony-datapoint.
Actual only valid for the tv fuer alle datasource. for source iptv-epg the channel ids must be adapted.

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

### Alternative channel logos

Forumlink with examples screenshots
<https://forum.iobroker.net/topic/40168/test-adapter-tvprogram/863>

**Download Channel Logos:**

You have to register to download the logos with following size 400x160

<https://vuplus-support.org/wbb4/index.php?thread/64098-mirror-glass-3d-huminator-design-by-stefanbenno6/>

**Rename the Logos:**

start the follwing commands in the downloaded and unziped folder

<details>
  <summary>Details</summary>
  <pre><code>
copy 1_0_19_283D_3FB_1_C00000_0_0_0.png ard.png
copy 1_0_19_2B66_3F3_1_C00000_0_0_0.png zdf.png
copy 1_0_19_EF10_421_1_C00000_0_0_0.png rtl.png
copy 1_0_19_EF15_421_1_C00000_0_0_0.png rtl2.png
copy 1_0_19_2E9B_411_1_C00000_0_0_0.png srtl.png
copy 1_0_19_2EAF_411_1_C00000_0_0_0.png nitro.png
copy 1_0_19_EF74_3F9_1_C00000_0_0_0.png sat1.png
copy 1_0_19_EF75_3F9_1_C00000_0_0_0.png pro7.png
copy 1_0_19_EF78_3F9_1_C00000_0_0_0.png pro7maxx.png
copy 1_0_19_EF76_3F9_1_C00000_0_0_0.png kaka.png
copy 1_0_19_EF77_3F9_1_C00000_0_0_0.png sixx.png
copy 1_0_19_EF11_421_1_C00000_0_0_0.png vox.png
copy 1_0_19_1519_455_1_C00000_0_0_0.png tele5.png
copy 1_0_19_2B7A_3F3_1_C00000_0_0_0.png zdfneo.png
copy 1_0_19_2B98_3F2_1_C00000_0_0_0.png kika.png
copy 1_0_19_2B8E_3F2_1_C00000_0_0_0.png 3sat.png
copy 1_0_19_285B_401_1_C00000_0_0_0.png phoenix.png
copy 1_0_19_157C_41F_1_C00000_0_0_0.png disney.png
copy 1_0_19_2871_425_1_C00000_0_0_0.png mdr.png
copy 1_0_19_286F_425_1_C00000_0_0_0.png rbb.png
copy 1_0_19_283F_3FB_1_C00000_0_0_0.png sw3.png
copy 1_0_19_1581_41F_1_C00000_0_0_0.png sport1de.png
copy 1_0_19_283E_3FB_1_C00000_0_0_0.png arte.png
copy 1_0_19_526C_41D_1_C00000_0_0_0.png anixehd.png
copy 1_0_19_151A_455_1_C00000_0_0_0.png dmax.png
copy 1_0_19_2855_401_1_C00000_0_0_0.png bayern3.png
copy 1_0_19_2873_425_1_C00000_0_0_0.png hessen3.png
copy 1_0_1_6EE1_4B1_1_C00000_0_0_0.png radiobremen.png
copy 1_0_19_2858_401_1_C00000_0_0_0.png nord3.png
copy 1_0_19_2BA2_3F2_1_C00000_0_0_0.png info.png
copy 1_0_19_132F_3EF_1_C00000_0_0_0.png orf1.png
copy 1_0_19_1330_3EF_1_C00000_0_0_0.png orf2.png
copy 1_0_19_2777_409_1_C00000_0_0_0.png mtv.png
copy 1_0_19_288A_40F_1_C00000_0_0_0.png sw3.sr.png
copy 1_0_1_6F76_457_1_C00000_0_0_0.png west3.png
copy 1_0_19_2887_40F_1_C00000_0_0_0.png tagesschau24.png
COPY 1_0_16_2EB9_411_1_C00000_0_0_0.png ntv.png
copy 1_0_19_2888_40F_1_C00000_0_0_0.png one.png
copy 1_0_19_2889_40F_1_C00000_0_0_0.png alpha.png
copy 1_0_1_445F_453_1_C00000_0_0_0.png welt.png
copy 1_0_1_772D_416_1_C00000_0_0_0.png eurosp.png
copy 1_0_1_76C8_40E_1_C00000_0_0_0.png comedycentral.png  
copy 1_0_1_2F1D_441_1_C00000_0_0_0.png rtlnitro.png  
  </code></pre>
</details>

**Create new Folder in the vis:**

Open in vis the File Manager dialog.

Check if the following path exists or create the path in the dialog.

```text
/vis.0/icons/tvlogos/
```

**Enter path in datapoint:**

Enter the following path in to the datapoint `optchnlogopath` of your tv.
Replace 192.1.2.3 with the ip address of your iobroker installation.

```text
http://192.1.2.3:8082/vis.0/icons/tvlogos/
```

**Adjust Icon width:**

Each widget has an attribute "Width channel logo px". Please enter an approbiate width for the icon set.

## JavaScript adapter examples

### `Recordlist`

List of all current recording times recorded by the recording data point and updated every minute.
You have to configure the data point name of your RecorderList and the name of the data point to be observed.
As soon as the script has added the recording to the list, the record data point is emptied.

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

To visualize this data, the widget JSON template from the adapter myTime can help with the following template.
Enter as json_oid the datapoint with the `recordlist` and as json_template the following code:

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

### Favorite broadcast at the moment

The following script determines once a minute whether a favorite program is currently running.

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

### Coloring of programs that are located in the `recordlist` data point in the widget tvprogram

the following template is for the widget JSON template from the adapter rssfeed.
this template does not generate any visible output, but generates css instructions that color the current programs.
it also colors the record button in the detailed view.

to use this template, please select the recordlist datapoint in the widget properties json_oid
and insert the following template in json_template

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