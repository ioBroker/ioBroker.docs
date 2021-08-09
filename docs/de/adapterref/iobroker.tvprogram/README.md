---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tvprogram/README.md
title: ioBroker.tvprogram
hash: OoTO1/+EPou6/8b6v3kD2t4M8FFmQCTBSPS2oktpsow=
---
![Logo](../../../en/adapterref/iobroker.tvprogram/admin/tvprogram.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.tvprogram.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.tvprogram.svg)
![Anzahl der Installationen (spätestens)](http://iobroker.live/badges/tvprogram-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/tvprogram-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/oweitman/iobroker.tvprogram.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/oweitman/ioBroker.tvprogram/badge.svg)
![NPM](https://nodei.co/npm/iobroker.tvprogram.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/oweitman/ioBroker.tvprogram/master.svg)
![AppVeyor-Build-Status](https://img.shields.io/appveyor/ci/oweitman/iobroker-tvprogram.svg)

# IoBroker.tvprogram
** Tests: **

## Tvprogram Adapter für ioBroker
Dieser Adapter fragt in regelmäßigen Abständen Informationen über das Fernsehprogramm ab.
Die Daten können in verschiedenen Widgets angezeigt werden.

Zum Einrichten muss der Adapter bereits auf die erforderlichen Daten zugegriffen und diese ausgefüllt haben.
Aufgrund ihrer Größe werden die Daten nicht in Datenpunkten, sondern in Dateien (Linux-Pfad: / opt / iobroker / data-files / tvprogram) und im Speicher des Adapters gespeichert.
In der Konfiguration muss das Widget nur mit einem Datenpunkt des Adapters (z. B. cmd) gefüllt werden.
Das Widget sucht automatisch nach allen verbleibenden Datenpunkten.

## Installation
Der Adapter kann über den Stable oder zum Testen von Versionen über das Beta / neueste Repository installiert werden.

### Adapterkonfiguration
Sie können konfigurieren, wie viele verschiedene Fernsehgeräte oder zumindest verschiedene Konfigurationen Sie haben werden.

### Widgets
Widgets werden nur in modernen Browsern (Google Chrome, Mozilla Firefox, Opera, Safari) unterstützt.
Nicht unterstützt Internet Explorer oder Microsoft Edge ohne Chromium (Version <79).

#### Zeit
Dieses Widget zeigt das aktuelle TV-Programm auf einer Timeline nach TV-Kanal.

Wenn der Text hinter den Kanallogos durchscheint, muss im Widget eine Hintergrundfarbe ausgewählt werden.
Im Allgemeinen ist es ein guter Ansatz, eine explizite Vordergrund- und Hintergrundfarbe für die Ansicht oder zumindest für das Widget auszuwählen.
Die Markerposition wird alle 15 Sekunden aktualisiert.

Wenn nach der Installation etwas schief geht und das Widget nicht korrekt angezeigt wird, versuchen Sie bitte den folgenden Befehl von der Shell:

iobroker lade alle hoch

Die folgenden Attribute stehen für die Konfiguration in vis zur Verfügung. Die Mindestkonfiguration besteht darin, den Datenpunkt auf den cmd-Datenpunkt zu setzen.

| Attribut | Beispiel | Beschreibung |
| --------------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| tvprogram_oid | tvprogram.0.tv1.cmd | Ein Datenpunkt einer Instanz des TV-Programmadapters. |
| widthItem | 120 | Standardbreite in Pixel für ein 30-Minuten-Segment |
| heightRow | 35 | Höhe für jede angezeigte Linie |
| Bilder | x | Bilder in der Timeline anzeigen, falls verfügbar |
| headerfontpercent | 125 | Zeichengröße in Prozent für die Überschrift (Zeit) |
| Rundfunkanteil | 75 | Zeichengröße in Prozent für die Sendungen |
| Highlightfarbe | gelb | Farbe für die Favoriten |
| markerpositionpercent | 25 | Position des Markers in Prozent der Widgetbreite |
| dialogwidthpercent | 90 | Größe der Dialoge in Prozent des Widgets |
| dialogheightpercent | 90 | Größe der Dialoge in Prozent des Widgets |

##### CSS-Klassen
Bitte ändern Sie w00001 in Ihre Widget-ID

So ändern Sie die Formatierung der Dialoge

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

Wenn Sie einige zusätzliche Dialoge mit anderen Z-Index-Einstellungen verwenden, können Sie einen höheren Z-Index für die TV-Programm-Dialoge festlegen.
Möglicherweise müssen Sie eine höhere Zahl als 300 festlegen. Dies hängt von den Einstellungen in anderen Dialogen ab, die die Dialogfelder des Fernsehprogramms (Broadcast-Informationen und Kanalauswahl) überlappen oder ausblenden

```css
.ui-dialog.w00001 {
   z-index:300 !important;
}
```

So ändern Sie die Formatierung der abwechselnden Hintergrundfarben der Sendungen

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

#### Favoriten
Dieses Widget zeigt eine Liste der ausgewählten Favoriten, sortiert nach Datum und Uhrzeit.

Die folgenden Attribute stehen für die Konfiguration in vis zur Verfügung. Die Mindestkonfiguration besteht darin, den Datenpunkt auf den cmd-Datenpunkt zu setzen.

| Attribut | Beispiel | Beschreibung |
| -------------- | -------------------- | --------------------------------------------------- |
| oid | tvprogram.0.tv 1.cmd | Ein Datenpunkt einer Instanz des TV-Programmadapters. |
| Kanalname | nein | Logo (aus) oder Kanalnamen anzeigen |
| Showweekday | ja | Wochentag anzeigen |
| maxfavorites | 10 | Max Favoriten zu zeigen |
| Highlightfarbe | gelb | Farbe für die Favoriten |

#### Steuerung
Dieses Widget zeigt alle aktuellen Sendungen an. Sie können auf das Kanallogo klicken, um den Kanal zu wechseln.
Sie können auf die Sendung klicken, um detaillierte Informationen über die Sendung zu erhalten.

Die folgenden Attribute stehen für die Konfiguration in vis zur Verfügung. Die Mindestkonfiguration besteht darin, den Datenpunkt auf den cmd-Datenpunkt zu setzen.

| Attribut | Beispiel | Beschreibung |
| --------------------- | ------------------------ | -------------------------------------------------------------------------------------------------- |
| oid | tvprogram.0.tv1.cmd | Ein Datenpunkt einer Instanz des TV-Programmadapters. |
| Zeit | | Wenn leer, werden die tatsächlichen Sendungen angezeigt |
| Zeit | 20:15 | Wenn nur die Sendung zu diesem Zeitpunkt 120 Minuten lang angezeigt wird, wird der nächste Tag angezeigt |
| Zeit | 20: 15/200 | Wenn Zeit mit Dauer, würde die Sendung zu diesem Zeitpunkt für 200 Minuten angezeigt |
| Zeit | 2021-02-15T20: 15: 00.000Z | Wenn ein gültiger Datestring vorhanden ist, wird die Sendung zu diesem Zeitpunkt angezeigt. Erinnere dich an die Zeitzonen |
| heightRow | 35 | Höhe für jede angezeigte Linie |
| Bilder | x | Bilder anzeigen, falls verfügbar |
| Rundfunkanteil | 75 | Zeichengröße in Prozent für die Sendungen |
| Highlightfarbe | gelb | Farbe für die Favoriten |
| dialogwidthpercent | 90 | Größe der Dialoge in Prozent des Widgets |
| dialogheightpercent | 90 | Größe der Dialoge in Prozent des Widgets |

##### CSS-Klassen
Bitte ändern Sie w00001 in Ihre Widget-ID

So ändern Sie die Formatierung der abwechselnden Hintergrundfarben der Sendungen

```css
#w00001 .tv-control .tv-row:nth-child(odd) {
   background-color: rgba(128, 128, 128, 0.65);
}
#w00001 .tv-control .tv-row:nth-child(even) {
   background-color: rgba(128, 128, 128, 0.55);
}

```

#### Suche
Mit diesem Widget können Sie nach Sendung innerhalb des Titels, der Beschreibung, eines Startdatums und nach einem Sendetyp suchen.
Das Eingabefeld "Von" ist mit dem aktuellen Datum vorgefüllt. Wenn dieses Feld unverändert bleibt, beginnt die Suche mit der tatsächlichen Zeit.
Wenn Sie dieses Feld in ein zukünftiges oder vergangenes Datum ändern, beginnt die Suche um 00:00 Uhr dieses Datums.
Eines oder beide der Suchfelder Suchtext und Kategorie müssen ausgefüllt / ausgewählt sein.

Die folgenden Attribute stehen für die Konfiguration in vis zur Verfügung. Die Mindestkonfiguration besteht darin, den Datenpunkt auf den cmd-Datenpunkt zu setzen.

| Attribut | Beispiel | Beschreibung |
| --------------------- | ------------------- | ---------------------------------------------------- |
| Objekt ID | tvprogram.0.tv1.cmd | Ein Datenpunkt einer Instanz des TV-Programmadapters. |
| Bilder | x | Bilder anzeigen, falls verfügbar |
| maxresults | 10 | max Ergebnisse in der Liste |
| heightRow | 35 | Höhe für jede angezeigte Linie |
| Rundfunkanteil | 75 | Zeichengröße in Prozent für die Sendungen |
| Highlightfarbe | gelb | Farbe für die Favoriten |
| dialogwidthpercent | 90 | Größe der Dialoge in Prozent des Widgets |
| dialogheightpercent | 90 | Größe der Dialoge in Prozent des Widgets |

##### CSS-Klassen
Bitte ändern Sie w00001 in Ihre Widget-ID

So ändern Sie die Formatierung der abwechselnden Hintergrundfarben der Sendungen

```css
#w00001 .tv-search .tv-row:nth-child(odd) {
   background-color: rgba(128, 128, 128, 0.65);
}
#w00001 .tv-search .tv-row:nth-child(even) {
   background-color: rgba(128, 128, 128, 0.55);
}

```

### Bereitgestellte Datenpunkte
Der folgende Satz von Datenpunkten ist für jedes erstellte Fernsehgerät vorhanden

** Kanalfilter **

Dieser Datenpunkt enthält die im Widget als JSON-Array angezeigten Kanäle

** cmd **

Dieser Datenpunkt wird für die interne Kommunikation zwischen den Widgets und dem Adapter verwendet

** Favoriten **

Dieser Datenpunkt enthält die ausgewählten Favoriten als JSON-Array

**Aufzeichnung**

Dieser Datenpunkt wird festgelegt, wenn der Benutzer in der Detailansicht einer Sendung auf die Schaltfläche Aufzeichnen klickt.
Die angegebenen Daten sind

| Feld | Beispiel | Beschreibung |
| ----------- | -------------------------- | ---------------------- |
| startTime | 2021-01-01T00: 10: 00 + 01: 00 | Startzeit |
| endTime | 2021-01-01T00: 10: 30 + 01: 00 | Endzeit |
| Titel | Titel der Sendung | Titel der Sendung |
| Kanal | 7 | Eindeutige Kanalnummer |
| channelid | zdf | Eindeutige Kanal-ID |
| Kanalname | ZDF | Lesbarer Kanalname |
| eventid | 12345678 | Eindeutige Broadcast-ID |

** selectchannel **

Dieser Datenpunkt wird verwendet, um einen Kanalwechselbefehl durch Klicken auf das Kanallogo oder das Schaltersymbol in der Detailansicht zu erkennen.

**Show**

Dieser Datenpunkt enthält den Status, ob nur Favoriten oder alles im Widget-TV-Programm angezeigt werden soll

** config **

Dieser Datenpunkt ist veraltet und wird in den nächsten Versionen entfernt

### Bereitgestellte Sendto-Befehle
Alle Daten können per Sendto-Befehl vom Adapter angefordert werden. Damit können individuelle Funktionalitäten entwickelt werden

#### GetServerData
Fordern Sie Basisdaten vom Adapter an.

** Gültige Parameter sind **

* Kategorien
* Genres
* Kanäle

**Kehrt zurück:**

Array

**Beispiel:**

```javascript
sendTo("tvprogram.0","getServerData","categories",(data)=>console.log(data));
```

#### GetServerTVProgram
Programmdaten vom Adapter anfordern.

** Gültige Parameter sind **

ein Datenstring im folgenden Format: JJJJ-MM-TT

**Kehrt zurück:**

Array

**Beispiel:**

```javascript
sendTo("tvprogram.0","getServerTVProgram","2021-02-10",(data)=>console.log(data));
```

#### GetServerBroadcast
Fordern Sie die Detaildaten einer Sendung an.

** Gültige Parameter sind **

Ein Objekt, das ein Ansichtsdatum im folgenden Format enthält: JJJJ-MM-TT Die Ereignis-ID der Sendung

**Kehrt zurück:**

Objekt

**Beispiel:**

```javascript
sendTo("tvprogram.0","getServerBroadcast",{viewdate:"2021-02-10",eventid:"10659522"},(data)=>console.log(data));
```

#### GetFavoritesDatax
Fordern Sie ab sofort alle Lieblingssendungen bis zum Ende der gespeicherten Daten an.

** Gültige Parameter sind **

Array von Favoriten

**Kehrt zurück:**

Array

**Beispiel:**

```javascript
sendTo("tvprogram.0","getFavoritesDatax",['heute','Tagesschau'],(data)=>console.log(data));

```

#### GetServerBroadcastNow
Fordert alle aktuell ausgeführten Broadcasts an

** Gültige Parameter sind **

Array von Kanal-IDs Ihrer Lieblingskanäle

**Kehrt zurück:**

Array

**Beispiel:**

```javascript
sendTo("tvprogram.0","getServerBroadcastNow",[1,6,22,7],(data)=>console.log(data));

```

#### GetServerBroadcastDate
Fordert alle Broadcasts an, die zu einem bestimmten Zeitpunkt ausgeführt werden

** Gültige Parameter sind **

Array von Kanal-IDs Ihrer Lieblingskanäle datetime

**Kehrt zurück:**

Array

**Beispiel:**

```javascript
sendTo("tvprogram.0","getServerBroadcastDate",{channelfilter:[1,6,22,7],date:"2021-02-10T20:15:00.000Z"},(data)=>console.log(data));

```

#### GetServerBroadcastFind
Suchen Sie nach Sendungen in einem bestimmten Zeitraum und optional mit Kategorien

** Gültige Parameter sind **

Kanalfilter: Array von Kanal-IDs Ihrer Lieblingskanäle Kategoriefilter: Optional Array von Kategorie-IDs Datum / Uhrzeit von: Datum / Uhrzeit von Datenzeit bis: Datum / Uhrzeit bis Textfilter: Optionaler Titel oder Teil eines Titels zur Suche nach Maximalergebnissen: Optional die maximale Anzahl von Ergebnissen. Der Standardwert ist 10

**Kehrt zurück:**

Array

**Beispiel:**

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
Fordern Sie verfügbare Sendetermine im Adapterspeicher an

** Gültige Parameter sind **

leeres Objekt

**Kehrt zurück:**

Array

**Beispiel:**

```javascript
sendTo("tvprogram.0","getServerInfo","{}",(data)=>console.log(data));

```

### Community bietet Widgets / Skripte
#### Harmony und MagentaTV
Skript liefert per Bild Nach dem Klicken auf das Kanallogo setzt das Skript die zugeordnete Kanal-ID auf den Harmony-Datenpunkt

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

### Funktionen sind nicht im Adapter implementiert, sondern dienen als Skripte für den Javascript-Adapter
#### Aufnahmeliste
Liste aller aktuellen Aufnahmezeiten, die vom Aufzeichnungsdatenpunkt aufgezeichnet und jede Minute aktualisiert wurden.
Sie müssen den Datenpunktnamen Ihrer RecorderList und den Namen des zu beobachtenden Datenpunkts konfigurieren.
Sobald das Skript die Aufzeichnung zur Liste hinzugefügt hat, wird der Datensatzdatenpunkt geleert.

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

Um diese Daten zu visualisieren, kann die Widget-JSON-Vorlage des Adapters myTime bei der folgenden Vorlage hilfreich sein.
Geben Sie als json_oid den Datenpunkt mit der Aufzeichnungsliste und als json_template den folgenden Code ein:

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

#### Momentan Lieblingssendung
Das folgende Skript bestimmt einmal pro Minute, ob gerade ein Lieblingsprogramm ausgeführt wird.

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

#### Färbung von Programmen, die sich im Datenpunkt der Aufnahmeliste im Widget-Fernsehprogramm befinden
Die folgende Vorlage bezieht sich auf die Widget-JSON-Vorlage aus dem Adapter-RSS-Feed.
Diese Vorlage generiert keine sichtbare Ausgabe, sondern CSS-Anweisungen, die die aktuellen Programme färben.
Außerdem wird die Aufnahmetaste in der Detailansicht eingefärbt.

Um diese Vorlage zu verwenden, wählen Sie bitte den Datensatzlisten-Datenpunkt in den Widget-Eigenschaften json_oid aus und fügen Sie die folgende Vorlage in json_template ein

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

### Funktionen:
- TV-Daten auf der Timeline nach TV-Kanal anzeigen
- Details zu einer Fernsehsendung anzeigen, falls verfügbar
- Zeigen Sie eine Markierung der tatsächlichen Position mit automatischem Bildlauf an
- Angezeigte TV-Kanäle konfigurieren und bestellen, Nachbestellung über DragNdrop möglich.
- Befehl über Datenpunkt wechseln, nachdem auf das Logo geklickt wurde
- hineinzoomen herauszoomen
- Navigation am nächsten und vorherigen Tag
- Wiedergabetaste zum Wechseln des Kanaldatenpunkts
- Zoom in den nächsten Tagen zentrieren
- Kehre zu heute zurück
- Zoom zurücksetzen
- Lieblingssendungen
- Kopieren Sie den Text aus der Detailansicht
- Die Markerposition ist konfigurierbar
- Dialogbreite und -höhe sind konfigurierbar
- Datenpunkt Rekord, der nach Druck auf Knopf mit Aufnahmedaten wird wird
- Widget für Favoriten
- Nicht-Favoriten ausblenden

### Machen
Widget-Fernsehprogramm:

- Vielleicht sendet ein Highlight-Widget
- Datenadapter für andere Quellen (Internet, Hardware wie Enigma, VU-Box). Überlegungen hierzu werden derzeit aufgrund der geringen Nachfrage ausgesetzt
- ~~ Verbesserung der Dokumentation zur Konfiguration der Widgets ~~
- ~~ Bilder senden, falls in der Hauptansicht des Zeit-Widgets verfügbar ~~
- ~~ Durchsuche den gesamten Text, um auch Regisseure und Schauspieler zu finden ~~
- ~~ Tooltips für die Schaltflächen im Zeit-Widget ~~
- ~~ Ideen für weitere Widgets basierend auf dem vorhandenen TV-Programm-Skript ~~
- ~~ Problem: endlose Schriftrolle in Firefox ~~
- ~~ zu besprechen: Datenpunkt, mit allen Aufnahmedaten, sollte auf einem Videorecorder-Adapter oder in einem separaten Skript ~~ implementiert werden
- ~~ Responsive Design für Detailansicht-> Kein Responsive Design für JQuery-Dialog möglich. Es wurde eine andere Lösung mit festen Layouts für Höhe> Breite ~~ gefunden
- ~~ Problem: kleiner Pixelfehler, wenn der Bildlaufbereich auf der linken Seite vollständig ist ~~

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