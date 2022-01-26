![Logo](admin/tvprogram.png)
# ioBroker.tvprogram

[![NPM version](http://img.shields.io/npm/v/iobroker.tvprogram.svg)](https://www.npmjs.com/package/iobroker.tvprogram)
[![Downloads](https://img.shields.io/npm/dm/iobroker.tvprogram.svg)](https://www.npmjs.com/package/iobroker.tvprogram)
![Number of Installations (latest)](http://iobroker.live/badges/tvprogram-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/tvprogram-stable.svg)
[![Dependency Status](https://img.shields.io/david/oweitman/iobroker.tvprogram.svg)](https://david-dm.org/oweitman/iobroker.tvprogram)
[![Known Vulnerabilities](https://snyk.io/test/github/oweitman/ioBroker.tvprogram/badge.svg)](https://snyk.io/test/github/oweitman/ioBroker.tvprogram)

[![NPM](https://nodei.co/npm/iobroker.tvprogram.png?downloads=true)](https://nodei.co/npm/iobroker.tvprogram/)

**Tests:** 
[![Travis-CI](http://img.shields.io/travis/oweitman/ioBroker.tvprogram/master.svg)](https://travis-ci.com/oweitman/ioBroker.tvprogram)
[![AppVeyor Build Status](https://img.shields.io/appveyor/ci/oweitman/iobroker-tvprogram.svg)](https://ci.appveyor.com/project/oweitman/iobroker-tvprogram)


## tvprogram adapter for ioBroker

This adapter polls information about the television program at regular intervals. 
The data can be displayed in various widgets. 

To set it up, the adapter must have already accessed and filled the necessary data. 
Due to its size, the data is not stored in data points but in files (Linux path: /opt/iobroker/data-files/tvprogram) and in the adapter's memory.
In the configuration, the widget only needs to be filled with any data point of the adapter (e.g.cmd).
The widget searches for all remaining data points automatically.

## Installation
The adapter can be installed via the stable or for testing verions via beta/latest repository.

### Adapter Configuration

You can configure how much different TVs, or at least different configurations you will have.

### Warnings in the iobroker-log

Warnings like 

"Read-only state "tvprogram.0.tv1.cmd" has been written without ack-flag with value "new|program|2021-01-01"

are ok by design, due the internal signalling mechanism between the adapter and the widgets, which are first set without the ack flag and after a while is reset with the ack flag.

### Widgets

Widgets are supported only in modern browsers (Google Chrome, Mozilla Firefox, Opera, Safari).
Not supported Internet Explorer or Microsoft Edge without Chromium (Version <79).

#### Time
This widget shows the current TV program on a timeline by TV channel.

If the text behind the channel logos shows through, a background color must be selected in the widget.
it is generally a good approach to choose an explicit foreground and background color for the view or at least for the widget.
The Marker position ist updated every 15 seconds.

If something goes wrong after installation and the widget isnt diplayed correctly, please try the following command from shell:

iobroker upload all

The following attributes are available for configuration in vis
Minimum configuration is to set the datapoint to the cmd-datapoint.

| Attribute             | Example                  | Description                                                                                                       |
| --------------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| tvprogram_oid         | tvprogram.0.tv1.cmd      | A Datapoint of a instance of the tvprogram adapter.                                                               |
| widthItem             | 120                      | Standard width in pixels for a 30 minute segment                                                                  |
| heightRow             | 35                       | Height for each displayed line                                                                                    |
| showpictures          | x                        | Show pictures in timeline if available                                                                            |
| headerfontpercent     | 125                      | Character size in percent for the heading (time)                                                                  |
| broadcastfontpercent  | 75                       | Character size in percent for the broadcasts                                                                      |
| highlightcolor        | yellow                   | color for the favorites                                                                                           |
| markerpositionpercent | 25                       | Position of the Marker in percent ot the widget width                                                             |
| dialogwidthpercent    | 90                       | size of the dialogs in percent of the widget                                                                      |
| dialogheightpercent   | 90                       | size of the dialogs in percent of the widget                                                                      |

##### CSS-Classes
Please change w00001 to your widget ID

To Change the formatting of the dialogs

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

If you use some extra dialogs with other z-index-setting you can set higher z-index for the tvprogram dialogs. 
Maybe you have to set a higher number than 300. This depends on settings in other dialogs which overlap or hide the tvprogram (broadcast info and channel select) dialogs

```css
.ui-dialog.w00001 {
   z-index:300 !important;
}
```

To Change the formatting of the alternating background colors of the broadcasts
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

#### Favorites
This widget shows a list of the selected favorites, sorted by date and time.

The following attributes are available for configuration in vis
Minimum configuration is to set the datapoint to the cmd-datapoint.

| Attribute      | Example              | Description                                         |
| -------------- | -------------------- | --------------------------------------------------- |
| oid            | tvprogram.0.tv 1.cmd | A Datapoint of a instance of the tvprogram adapter. |
| channelname    | no                   | Show logo (off) or channelname                      |
| showweekday    | yes                  | Show Weekday                                        |
| maxfavorites   | 10                   | Max favorites to show                               |
| highlightcolor | yellow               | color for the favorites                             |

#### Control
This widget shows all actual broadcasts. You can click on the channel logo to switch channel.
you can click on the broadcast to get detailed information about thew broadcast.

The following attributes are available for configuration in vis
Minimum configuration is to set the datapoint to the cmd-datapoint.

| Attribute             | Example                  | Description                                                                                        |
| --------------------- | ------------------------ | -------------------------------------------------------------------------------------------------- |
| oid                   | tvprogram.0.tv1.cmd      | A Datapoint of a instance of the tvprogram adapter.                                                |
| time                  |                          | If empty then the actual broadcasts would be shown                                                 |
| time                  | 20:15                    | if time only the broadcast at this time would be shown for 120 minutes, then the next day is shown |
| time                  | 20:15/200                | if time with duration the broadcast at this time would be shown for 200 minutes                    |
| time                  | 2021-02-15T20:15:00.000Z | If valid Datestring, then the broadcast at this tim would be shown. Remember the timezones         |
| heightRow             | 35                       | Height for each displayed line                                                                     |
| showpictures          | x                        | Show pictures if available                                                                         |
| broadcastfontpercent  | 75                       | Character size in percent for the broadcasts                                                       |
| highlightcolor        | yellow                   | color for the favorites                                                                            |
| dialogwidthpercent    | 90                       | size of the dialogs in percent of the widget                                                       |
| dialogheightpercent   | 90                       | size of the dialogs in percent of the widget                                                       |

##### CSS-Classes

Please change w00001 to your widget ID

To Change the formatting of the alternating background colors of the broadcasts

```css
#w00001 .tv-control .tv-row:nth-child(odd) {
   background-color: rgba(128, 128, 128, 0.65);
}
#w00001 .tv-control .tv-row:nth-child(even) {
   background-color: rgba(128, 128, 128, 0.55);
}

```

#### Search
With this widget you can search for broadcast within the title, description, a start date and for a broadcast type.
The input field "From" ist prefilled with the actual date. if this field is unchanged the search starts with the actual time.
if you change this field to a future or past date, the search starts at 00:00 of this date.
One or both of the inputfields searchtext and category must be filled/selected.

The following attributes are available for configuration in vis
Minimum configuration is to set the datapoint to the cmd-datapoint.

| Attribute             | Example             | Description                                          |
| --------------------- | ------------------- | ---------------------------------------------------- |
| Object ID             | tvprogram.0.tv1.cmd | A Datapoint of a instance of the tvprogram adapter.  |
| showpictures          | x                   | Show pictures if available                           |
| maxresults            | 10                  | max results in the List                              |
| heightRow             | 35                  | Height for each displayed line                       |
| broadcastfontpercent  | 75                  | Character size in percent for the broadcasts         |
| highlightcolor        | yellow              | color for the favorites                              |
| dialogwidthpercent    | 90                  | size of the dialogs in percent of the widget         |
| dialogheightpercent   | 90                  | size of the dialogs in percent of the widget         |

##### CSS-Classes

Please change w00001 to your widget ID

To Change the formatting of the alternating background colors of the broadcasts

```css
#w00001 .tv-search .tv-row:nth-child(odd) {
   background-color: rgba(128, 128, 128, 0.65);
}
#w00001 .tv-search .tv-row:nth-child(even) {
   background-color: rgba(128, 128, 128, 0.55);
}

```


### Provided Datapoints

The following set of datapoint exists for every created TV

**channelfilter**

this datapoint contains the channels shown in the widget as a JSON-Array

**cmd**

this datapoint is used for internal communication between the widgets and the adapter

**favorites**

this datapoint contains the selected favorites as a JSON-Array

**record**

This datapoint is set if the user clicks the record button in the detail view of a broadcast.
The provided data are

| field       | Example                    | Description            |
| ----------- | -------------------------- | ---------------------- |
| startTime   | 2021-01-01T00:10:00+01:00  | Start time             |
| endTime     | 2021-01-01T00:10:30+01:00  | End time               |
| title       | Title of the broadcast     | title of the broadcast |
| channel     | 7                          | Unique channel number  |
| channelid   | zdf                        | Unique channel id      |
| channelname | ZDF                        | Readable channel name  |
| eventid     | 12345678                   | Unique broadcast id    |


**selectchannel**

This datapoint is used to recognize a channel switch command with a click on the channel logo or the switch icon in the detail view.

**show**

this datapoint contains the status of whether only favorites or everything should be displayed in the widget tvprogram

**config**

this datapoint is deprecated and will be removed in the next versions

### Provided Sendto-Commands

All Data can be requested from the adapter by sendto-commands. this can be used to develop individual functionalities

#### getServerData

Request base data from the adapter. 

**Valid parameters are**

* categories
* genres
* channels

**Returns:**

Array

**Example:**

```javascript
sendTo("tvprogram.0","getServerData","categories",(data)=>console.log(data));
```

#### getServerTVProgram

Request program data from the adapter. 

**Valid parameters are**

a datestring in the following format: yyyy-mm-dd

**Returns:**

Array

**Example:**

```javascript
sendTo("tvprogram.0","getServerTVProgram","2021-02-10",(data)=>console.log(data));
```

#### getServerBroadcast

Request the detail data of a broadcast.

**Valid parameters are**

a object that contains an
viewdate in the following format yyyy-mm-dd
the eventid of the broadcast

**Returns:**

Object

**Example:**

```javascript
sendTo("tvprogram.0","getServerBroadcast",{viewdate:"2021-02-10",eventid:"10659522"},(data)=>console.log(data));
```

#### getFavoritesDatax

Request all favorite broadcast from now till end of saved data.

**Valid parameters are**

Array of favorites

**Returns:**

Array

**Example:**

```javascript
sendTo("tvprogram.0","getFavoritesDatax",['heute','Tagesschau'],(data)=>console.log(data));

```

#### getServerBroadcastNow

Requests all broadcasts that are currently running

**Valid parameters are**

Array of channelIDs of your favorite channels 

**Returns:**

Array

**Example:**

```javascript
sendTo("tvprogram.0","getServerBroadcastNow",[1,6,22,7],(data)=>console.log(data));

```

#### getServerBroadcastDate

Requests all broadcasts that are running at a datetime

**Valid parameters are**

Array of channelIDs of your favorite channels
datetime 

**Returns:**

Array

**Example:**

```javascript
sendTo("tvprogram.0","getServerBroadcastDate",{channelfilter:[1,6,22,7],date:"2021-02-10T20:15:00.000Z"},(data)=>console.log(data));

```

#### getServerBroadcastFind

Search for broadcasts in a range of time and optional with categories

**Valid parameters are**

channelfilter: Array of channelIDs of your favorite channels
categoryfilter: Optional Array of categoryIDs
datetimefrom: datetime from
datetimetill: datetime till
textfilter: Optional title or part of a title to search
maxresults: Optional the max amount of results. Default value is 10

**Returns:**

Array

**Example:**

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

#### getServerInfo

Request available dates of broadcast in the adapter memory

**Valid parameters are**

empty object

**Returns:**

Array

**Example:**

```javascript
sendTo("tvprogram.0","getServerInfo","{}",(data)=>console.log(data));

```

### Community provides widgets/scripts

#### Harmony and MagentaTV

Skript provides by pix
After click on the channel logo the script sets the mapped channel-id to the harmony-datapoint

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

### functions not implemented in the Adapter, but provides as scripts for the javascript-adapter

#### Recordlist

List of all current recording times recorded by the recording data point and updated every minute.
You have to configure the data point name of your RecorderList and the name of the data point to be observed.
As soon as the script has added the recording to the list, the record data point is emptied.

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

To visualize this data, the widget JSON template from the adapter myTime can help with the following template.
Enter as json_oid the datapoint with the recordlist and as json_template the following code:

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

#### Favorite broadcast at the moment
The following script determines once a minute whether a favorite program is currently running.

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
#### Coloring of programs that are located in the recordlist data point in the widget tvprogram

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


### Functions:

- show tv data on timeline by tv channel
- show details about a tv broadcast if available
- show a marker of actual position with automatic scrolling
- configure displayed tv channels and order, reordering ist possible via dragNdrop.
- switch command via datapoint after click on logo
- zoomin/zoomout
- navigation next and prev days
- play button to switchchannel datapoint
- center zoom in next days
- return to today
- reset zoom
- favorite broadcasts
- copy text from Detailview
- markerposition is configurable
- dialog width and height is configurable 
- Datenpunkt record, der nach druck auf Knopf mit Aufnahmedaten gefüllt wird
- Widget for Favorites
- hide Non-Favorites 

### Todo

widget tvprogram:
- maybe a highlight broadcasts widget 
- Data adapter for other sources (Internet, hardware such as Enigma, VU-Box). Considerations on this are currently suspended due to the low demand
- ~~improve documentation for configuring the widgets~~
- ~~broadcast pictures if available in the main view of the time widget~~
- ~~search through the whole text to also find directors and actors~~
- ~~tooltips for the buttons in the time widget~~
- ~~Ideas for further widgets based on the existing TV program script~~
- ~~Problem: endless scroll in firefox~~
- ~~to be discussed: Datenpunkt, mit allen Aufnahmedaten, should be implementet at a videorecorder adapter or in a seperate script~~
- ~~responsive design for detail view->no responsive design possible for jquery dialog, found another solution with fixed layouts for height>width~~
- ~~Problem: small Pixel glitch if scroll pane is completle on the left side~~

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