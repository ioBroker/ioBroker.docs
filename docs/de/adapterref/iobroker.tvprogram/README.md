---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tvprogram/README.md
title: ioBroker.tvprogramm
hash: Ejc4/tay5KbNIvfEFtBNXsgIPONqBTULfy13H9kJPb4=
---
![Logo](../../../en/adapterref/iobroker.tvprogram/admin/tvprogram.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.tvprogram.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.tvprogram.svg)
![Anzahl der Installationen (spätestens)](http://iobroker.live/badges/tvprogram-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/tvprogram-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/oweitman/iobroker.tvprogram.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/oweitman/ioBroker.tvprogram/badge.svg)
![NPM](https://nodei.co/npm/iobroker.tvprogram.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/oweitman/ioBroker.tvprogram/master.svg)
![AppVeyor-Build-Status](https://img.shields.io/appveyor/ci/oweitman/iobroker-tvprogram.svg)

# IoBroker.tvprogramm
**Tests:**

## TV-Programmadapter für ioBroker
Dieser Adapter fragt in regelmäßigen Abständen Informationen über das Fernsehprogramm ab.
Die Daten können in verschiedenen Widgets angezeigt werden.

Zur Einrichtung muss der Adapter bereits auf die erforderlichen Daten zugegriffen und diese ausgefüllt haben.
Die Daten werden aufgrund ihrer Größe nicht in Datenpunkten, sondern in Dateien (Linux-Pfad: /opt/iobroker/data-files/tvprogram) und im Speicher des Adapters gespeichert.
In der Konfiguration muss das Widget lediglich mit einem beliebigen Datenpunkt des Adapters (z.B.cmd) gefüllt werden.
Das Widget sucht automatisch nach allen verbleibenden Datenpunkten.

## Installation
Der Adapter kann über das Stable oder zum Testen von Versionen über das Beta/neueste Repository installiert werden.

### Adapterkonfiguration
Sie können konfigurieren, wie viele verschiedene Fernseher oder zumindest verschiedene Konfigurationen Sie haben werden.

### Warnungen im iobroker-log
Warnungen wie

"Schreibgeschützter Zustand "tvprogram.0.tv1.cmd" wurde ohne Ack-Flag mit Wert "new|program|2021-01-01" geschrieben

sind vom Design her in Ordnung, aufgrund des internen Signalisierungsmechanismus zwischen dem Adapter und den Widgets, die zuerst ohne das ack-Flag gesetzt und nach einer Weile mit dem ack-Flag zurückgesetzt werden.

###Widgets
Widgets werden nur in modernen Browsern (Google Chrome, Mozilla Firefox, Opera, Safari) unterstützt.
Nicht unterstützt Internet Explorer oder Microsoft Edge ohne Chromium (Version <79).

#### Zeit
Dieses Widget zeigt das aktuelle TV-Programm auf einer Zeitleiste nach TV-Sendern an.

Wenn der Text hinter den Kanallogos durchscheint, muss im Widget eine Hintergrundfarbe ausgewählt werden.
Generell ist es sinnvoll, eine explizite Vordergrund- und Hintergrundfarbe für die Ansicht oder zumindest für das Widget zu wählen.
Die Markerposition wird alle 15 Sekunden aktualisiert.

Wenn nach der Installation etwas schief geht und das Widget nicht richtig angezeigt wird, versuchen Sie bitte den folgenden Befehl von der Shell:

iobroker alles hochladen

Die folgenden Attribute stehen für die Konfiguration in vis zur Verfügung Minimalkonfiguration ist, den Datenpunkt auf den cmd-Datenpunkt zu setzen.

| Attribut | Beispiel | Beschreibung |
| --------------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| tvprogram_oid | tvprogram.0.tv1.cmd | Ein Datenpunkt einer Instanz des tvprogram-Adapters. |
| widthItem | 120 | Standardbreite in Pixeln für ein 30-Minuten-Segment |
| HöheReihe | 35 | Höhe für jede angezeigte Zeile |
| Showbilder | x | Bilder in der Zeitleiste anzeigen, falls verfügbar |
| headerfontpercent | 125 | Zeichengröße in Prozent für die Überschrift (Zeit) |
| Broadcastfontpercent | 75 | Zeichengröße in Prozent für die Sendungen |
| Highlightfarbe | gelb | Farbe für die Favoriten |
| MarkerpositionProzent | 25 | Position des Markers in Prozent der Widgetbreite |
| DialogbreiteProzent | 90 | Größe der Dialoge in Prozent des Widgets |
| DialoghöheProzent | 90 | Größe der Dialoge in Prozent des Widgets |

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

Wenn Sie einige zusätzliche Dialoge mit anderen Z-Index-Einstellungen verwenden, können Sie einen höheren Z-Index für die tv-Programmdialoge einstellen.
Möglicherweise müssen Sie eine höhere Zahl als 300 einstellen. Dies hängt von Einstellungen in anderen Dialogen ab, die die Dialoge für das Fernsehprogramm (Sendeinformationen und Kanalauswahl) überlappen oder ausblenden

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

Die folgenden Attribute stehen für die Konfiguration in vis zur Verfügung Minimalkonfiguration ist, den Datenpunkt auf den cmd-Datenpunkt zu setzen.

| Attribut | Beispiel | Beschreibung |
| -------------- | -------------------- | --------------------------------------------------- |
| oid | tvprogram.0.tv 1.cmd | Ein Datenpunkt einer Instanz des tvprogram-Adapters. |
| Kanalname | nein | Logo anzeigen (aus) oder Kanalnamen |
| Wochentag anzeigen | ja | Wochentag anzeigen |
| maxfavoriten | 10 | Max. Favoriten zum Anzeigen |
| Highlightfarbe | gelb | Farbe für die Favoriten |

#### Steuerung
Dieses Widget zeigt alle aktuellen Sendungen an. Sie können auf das Kanallogo klicken, um den Kanal zu wechseln.
Sie können auf die Sendung klicken, um detaillierte Informationen über die Sendung zu erhalten.

Die folgenden Attribute stehen für die Konfiguration in vis zur Verfügung Minimalkonfiguration ist, den Datenpunkt auf den cmd-Datenpunkt zu setzen.

| Attribut | Beispiel | Beschreibung |
| --------------------- | ------------------------ | -------------------------------------------------------------------------------------------------- |
| oid | tvprogram.0.tv1.cmd | Ein Datenpunkt einer Instanz des tvprogram-Adapters. |
| Zeit | | Wenn leer, werden die tatsächlichen Sendungen angezeigt |
| Zeit | 20:15 | wenn nur die Sendung zu diesem Zeitpunkt 120 Minuten lang gezeigt würde, dann wird der nächste Tag angezeigt |
| Zeit | 20:15/200 | wenn Zeit mit Dauer die Sendung zu diesem Zeitpunkt 200 Minuten lang gezeigt würde |
| Zeit | 2021-02-15T20:15:00.000Z | Wenn ein gültiger Datumsstring, dann wird die Sendung zu diesem Zeitpunkt angezeigt. Erinnere dich an die Zeitzonen |
| HöheReihe | 35 | Höhe für jede angezeigte Zeile |
| Showbilder | x | Bilder anzeigen falls vorhanden |
| Broadcastfontpercent | 75 | Zeichengröße in Prozent für die Sendungen |
| Highlightfarbe | gelb | Farbe für die Favoriten |
| DialogbreiteProzent | 90 | Größe der Dialoge in Prozent des Widgets |
| DialoghöheProzent | 90 | Größe der Dialoge in Prozent des Widgets |

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
Mit diesem Widget können Sie nach Sendungen innerhalb des Titels, der Beschreibung, eines Startdatums und nach einer Sendungsart suchen.
Das Eingabefeld "Von" ist mit dem aktuellen Datum vorbelegt. bleibt dieses Feld unverändert, beginnt die Suche mit der aktuellen Uhrzeit.
Wenn Sie dieses Feld in ein zukünftiges oder vergangenes Datum ändern, beginnt die Suche um 00:00 Uhr dieses Datums.
Eines oder beide Eingabefelder Suchtext und Kategorie müssen ausgefüllt/ausgewählt sein.

Die folgenden Attribute stehen für die Konfiguration in vis zur Verfügung Minimalkonfiguration ist, den Datenpunkt auf den cmd-Datenpunkt zu setzen.

| Attribut | Beispiel | Beschreibung |
| --------------------- | ------------------- | ---------------------------------------------------- |
| Objekt-ID | tvprogram.0.tv1.cmd | Ein Datenpunkt einer Instanz des tvprogram-Adapters. |
| Showbilder | x | Bilder anzeigen falls vorhanden |
| maxresults | 10 | max Ergebnisse in der Liste |
| HöheReihe | 35 | Höhe für jede angezeigte Zeile |
| Broadcastfontpercent | 75 | Zeichengröße in Prozent für die Sendungen |
| Highlightfarbe | gelb | Farbe für die Favoriten |
| DialogbreiteProzent | 90 | Größe der Dialoge in Prozent des Widgets |
| DialoghöheProzent | 90 | Größe der Dialoge in Prozent des Widgets |

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
Der folgende Satz von Datenpunkten existiert für jeden erstellten Fernseher

**Kanalfilter**

dieser Datenpunkt enthält die im Widget angezeigten Kanäle als JSON-Array

**cmd**

dieser Datenpunkt wird für die interne Kommunikation zwischen den Widgets und dem Adapter verwendet

**Favoriten**

dieser Datenpunkt enthält die ausgewählten Favoriten als JSON-Array

**aufzeichnen**

Dieser Datenpunkt wird gesetzt, wenn der Benutzer in der Detailansicht einer Sendung auf die Aufnahmeschaltfläche klickt.
Die bereitgestellten Daten sind

| Feld | Beispiel | Beschreibung |
| ----------- | -------------------------- | ---------------------- |
| Startzeit | 2021-01-01T00:10:00+01:00 | Startzeit |
| endTime | 2021-01-01T00:10:30+01:00 | Endzeit |
| Titel | Titel der Sendung | Titel der Sendung |
| Kanal | 7 | Eindeutige Kanalnummer |
| Kanalid | zdf | Eindeutige Kanal-ID |
| Kanalname | ZDF | Lesbarer Kanalname |
| Eventid | 12345678 | Eindeutige Broadcast-ID |

**Kanal auswählen**

Dieser Datenpunkt dient dazu, einen Kanalschaltbefehl durch einen Klick auf das Kanallogo oder das Schaltersymbol in der Detailansicht zu erkennen.

**Show**

dieser Datenpunkt enthält den Status ob nur Favoriten oder alles im Widget tvprogramm angezeigt werden soll

**Konfiguration**

Dieser Datenpunkt ist veraltet und wird in den nächsten Versionen entfernt

### Bereitgestellte Sendto-Befehle
Alle Daten können mit sendto-Befehlen vom Adapter angefordert werden. daraus lassen sich individuelle Funktionalitäten entwickeln

#### GetServerData
Basisdaten vom Adapter anfordern.

**Gültige Parameter sind**

* Kategorien
* Genres
* Kanäle

**Kehrt zurück:**

Array

**Beispiel:**

```javascript
sendTo("tvprogram.0","getServerData","categories",(data)=>console.log(data));
```

#### GetServerTVProgramm
Programmdaten vom Adapter anfordern.

**Gültige Parameter sind**

ein Datumsstring im folgenden Format: jjjj-mm-tt

**Kehrt zurück:**

Array

**Beispiel:**

```javascript
sendTo("tvprogram.0","getServerTVProgram","2021-02-10",(data)=>console.log(data));
```

#### GetServerBroadcast
Fordern Sie die Detaildaten einer Sendung an.

**Gültige Parameter sind**

ein Objekt, das ein Anzeigedatum im folgenden Format enthält yyyy-mm-dd die Ereignis-ID der Sendung

**Kehrt zurück:**

Objekt

**Beispiel:**

```javascript
sendTo("tvprogram.0","getServerBroadcast",{viewdate:"2021-02-10",eventid:"10659522"},(data)=>console.log(data));
```

#### GetFavoritesDatax
Fordern Sie alle Lieblingssendungen von jetzt bis zum Ende der gespeicherten Daten an.

**Gültige Parameter sind**

Favoritenliste

**Kehrt zurück:**

Array

**Beispiel:**

```javascript
sendTo("tvprogram.0","getFavoritesDatax",['heute','Tagesschau'],(data)=>console.log(data));

```

#### GetServerBroadcastNow
Fordert alle laufenden Sendungen an

**Gültige Parameter sind**

Array von Kanal-IDs Ihrer Lieblingskanäle

**Kehrt zurück:**

Array

**Beispiel:**

```javascript
sendTo("tvprogram.0","getServerBroadcastNow",[1,6,22,7],(data)=>console.log(data));

```

#### GetServerBroadcastDate
Fordert alle Sendungen an, die zu einem Datum/Uhrzeit laufen

**Gültige Parameter sind**

Array von Kanal-IDs Ihrer Lieblingskanäle Datum/Uhrzeit

**Kehrt zurück:**

Array

**Beispiel:**

```javascript
sendTo("tvprogram.0","getServerBroadcastDate",{channelfilter:[1,6,22,7],date:"2021-02-10T20:15:00.000Z"},(data)=>console.log(data));

```

#### GetServerBroadcastFind
Suche nach Sendungen in einem bestimmten Zeitraum und optional mit Kategorien

**Gültige Parameter sind**

channelfilter: Array von ChannelIDs Ihrer Lieblingskanäle categoryfilter: Optional Array von CategoryIDs datetimefrom: datetime from datetimetill: datetime to textfilter: Optionaler Titel oder Teil eines Titels, um maxresults zu suchen: Optional die maximale Anzahl von Ergebnissen. Standardwert ist 10

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

#### ServerInfo abrufen
Anfrage verfügbarer Sendetermine im Adapterspeicher

**Gültige Parameter sind**

leeres Objekt

**Kehrt zurück:**

Array

**Beispiel:**

```javascript
sendTo("tvprogram.0","getServerInfo","{}",(data)=>console.log(data));

```

### Community stellt Widgets/Skripte zur Verfügung
#### Harmony und MagentaTV
Skript liefert per pix Nach Klick auf das Kanallogo setzt das Skript die gemappte Kanal-ID auf den Harmonie-Datenpunkt

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

### Funktionen nicht im Adapter implementiert, aber als Skripte für den Javascript-Adapter zur Verfügung gestellt
#### Aufnahmeliste
Liste aller aktuellen Aufnahmezeiten, die vom Aufnahmedatenpunkt aufgezeichnet und jede Minute aktualisiert werden.
Sie müssen den Datenpunktnamen Ihrer RecorderList und den Namen des zu beobachtenden Datenpunkts konfigurieren.
Sobald das Skript die Aufzeichnung zur Liste hinzugefügt hat, wird der Aufzeichnungsdatenpunkt geleert.

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

Um diese Daten zu visualisieren, kann das Widget JSON Template aus dem Adapter myTime mit folgendem Template helfen.
Geben Sie als json_oid den Datenpunkt mit der recordlist ein und als json_template folgenden Code:

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

#### Momentan beliebteste Sendung
Das folgende Skript ermittelt einmal pro Minute, ob gerade ein Lieblingsprogramm läuft.

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

#### Einfärbung von Programmen, die sich im Datensatzlisten-Datenpunkt im Widget-TV-Programm befinden
Die folgende Vorlage ist für die JSON-Vorlage des Widgets aus dem RSSfeed des Adapters.
Diese Vorlage erzeugt keine sichtbare Ausgabe, sondern generiert CSS-Anweisungen, die die aktuellen Programme einfärben.
es färbt auch die Aufnahmeschaltfläche in der Detailansicht ein.

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
- Details zu einer TV-Sendung anzeigen, falls verfügbar
- Zeigen Sie eine Markierung der aktuellen Position mit automatischem Scrollen an
- Angezeigte TV-Sender konfigurieren und sortieren, Neuordnung ist per DragNdrop möglich.
- Schaltbefehl über Datenpunkt nach Klick auf Logo
- hineinzoomen herauszoomen
- Navigation nächste und vorherige Tage
- Play-Taste zum Umschalten des Kanaldatenpunktes
- Zoom in der Mitte nächste Tage
- zurück ins Heute
- Zoom zurücksetzen
- Lieblingssendungen
- Text aus der Detailansicht kopieren
- Markerposition ist konfigurierbar
- Dialogbreite und -höhe ist konfigurierbar
- Datenpunkt record, der nach druck auf Knopf mit Aufnahmedaten gefüllt WIRD
- Widget für Favoriten
- Nicht-Favoriten ausblenden

### Machen
Widget-TV-Programm:

- vielleicht ein Highlight-Broadcast-Widget
- Datenadapter für andere Quellen (Internet, Hardware wie Enigma, VU-Box). Überlegungen hierzu sind derzeit aufgrund der geringen Nachfrage ausgesetzt
- ~~Dokumentation zur Konfiguration der Widgets verbessern~~
- ~~Bilder senden, falls verfügbar in der Hauptansicht des Zeit-Widgets~~
- ~~Durchsuchen Sie den gesamten Text, um auch Regisseure und Schauspieler zu finden~~
- ~~Tooltips für die Schaltflächen im Zeit-Widget~~
- ~~Ideen für weitere Widgets basierend auf dem bestehenden TV-Programmskript~~
- ~~Problem: endloses Scrollen in Firefox~~
- ~~zu besprechen: Datenpunkt, mit allen Aufnahmedaten, sollte an einem Videorecorder-Adapter oder in einem separaten Skript implementiert werden~~
- ~~responsives Design für Detailansicht->kein responsives Design für jquery-Dialog möglich, eine andere Lösung mit festen Layouts für Höhe>Breite gefunden~~
- ~~Problem: kleiner Pixelfehler, wenn der Scrollbereich auf der linken Seite vollständig ist~~

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