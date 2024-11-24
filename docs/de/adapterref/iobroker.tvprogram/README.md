---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tvprogram/README.md
title: ioBroker.tvProgramm
hash: D6PEjRUhQ+htZHtYMcpl5ZpppPpnCvz/5zs4H8lC7dc=
---
![Logo](../../../en/adapterref/iobroker.tvprogram/admin/tvprogram.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.tvprogram.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.tvprogram.svg)
![Anzahl der Installationen](https://iobroker.live/badges/tvprogram-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/tvprogram-stable.svg)
![NPM](https://nodei.co/npm/iobroker.tvprogram.png?downloads=true)

# IoBroker.tv-Programm
**Tests:** ![Testen und Freigeben](https://github.com/oweitman/ioBroker.tvprogram/workflows/Test%20and%20Release/badge.svg)

## `tvprogram`-Adapter für ioBroker
Dieser Adapter fragt in regelmäßigen Abständen Informationen zum Fernsehprogramm ab.
Die Daten können in verschiedenen Widgets angezeigt werden.

Zur Einrichtung muss der Adapter bereits die notwendigen Daten abgerufen und befüllt haben.

Aufgrund der Größe werden die Daten nicht in Datenpunkten, sondern in Dateien (Linux-Pfad: /opt/iobroker/data-files/tvprogram) und im Speicher des Adapters abgelegt.

In der Konfiguration muss das Widget dann nur noch mit einem beliebigen Datenpunkt des Adapters befüllt werden (z.B.cmd).

Alle restlichen Datenpunkte sucht das Widget automatisch heraus.

## Installation
Der Adapter kann über die stabile Version oder zum Testen über das Beta-/Neueste-Repository installiert werden.

### Adapterkonfiguration
Sie können konfigurieren, wie viele verschiedene Fernseher oder zumindest verschiedene Konfigurationen Sie haben möchten.

### Widgets
Widgets werden nur in modernen Browsern (Google Chrome, Mozilla Firefox, Opera, Safari) unterstützt.
Internet Explorer oder Microsoft Edge ohne Chromium (Version <79) werden nicht unterstützt.

#### Zeit
Dieses Widget zeigt das aktuelle Fernsehprogramm auf einer Zeitleiste nach Fernsehsendern.

Wenn der Text hinter den Kanallogos durchscheint, muss im Widget eine Hintergrundfarbe ausgewählt werden.

Grundsätzlich ist es ein guter Ansatz, eine explizite Vordergrund- und Hintergrundfarbe für die Ansicht oder zumindest für das Widget zu wählen.

Die Markerposition wird alle 15 Sekunden aktualisiert.

Wenn nach der Installation etwas schief geht und das Widget nicht richtig angezeigt wird, versuchen Sie bitte den folgenden Befehl von der Shell aus:

iobroker lädt alles hoch

Die folgenden Attribute stehen zur Konfiguration in vis zur Verfügung. Die Mindestkonfiguration besteht darin, den Datenpunkt auf den Befehlsdatenpunkt festzulegen.

| Attribut | Beispiel | Beschreibung |
| ----------------------- | --------------------- | ----------------------------------------------------- |
| `tvprogram_oid` | `tvprogram.0.tv1.cmd` | Ein Datenpunkt einer Instanz des `tvprogram`-Adapters. |
| `heightRow` | 35 | Höhe für jede angezeigte Zeile |
| `showpictures` | x | Bilder in der Timeline anzeigen, falls verfügbar |
| `headerfontpercent` | 125 | Zeichengröße in Prozent für die Überschrift (Uhrzeit) |
| `broadcastfontpercent` | 75 | Zeichengröße in Prozent für die Sendungen |
| `highlightcolor` | gelb | Farbe für die Favoriten |
| `markerpositionpercent` | 25 | Position des Markers in Prozent der Widgetbreite |
| `dialogwidthpercent` | 90 | Größe der Dialoge in Prozent des Widgets |
| `dialogheightpercent` | 90 | Größe der Dialoge in Prozent des Widgets |
| `dialogheightpercent` | 90 | Größe der Dialoge in Prozent des Widgets |

##### CSS-Klassen
Bitte ändern Sie `w00001` in Ihre Widget-ID

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

Wenn Sie zusätzliche Dialoge mit anderen Z-Index-Einstellungen verwenden, können Sie einen höheren Z-Index für die TV-Programmdialoge festlegen.
Möglicherweise müssen Sie eine höhere Zahl als 300 festlegen. Dies hängt von Einstellungen in anderen Dialogen ab, die die TV-Programmdialoge (Sendeinformationen und Kanalauswahl) überlappen oder verbergen.

```css
.ui-dialog.w00001 {
  z-index: 300 !important;
}
```

So ändern Sie die Formatierung der wechselnden Hintergrundfarben der Sendungen

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

#### Favoriten
Dieses Widget zeigt eine Liste der ausgewählten Favoriten, sortiert nach Datum und Uhrzeit.

Die folgenden Attribute stehen zur Konfiguration in vis zur Verfügung. Die Mindestkonfiguration besteht darin, den Datenpunkt auf den Befehlsdatenpunkt festzulegen.

| Attribut | Beispiel | Beschreibung |
| ---------------- | ---------------------- | ----------------------------------------------------- |
| `oid` | `tvprogram.0.tv 1.cmd` | Ein Datenpunkt einer Instanz des `tvprogram`-Adapters. |
| `showweekday` | `yes` | Wochentag anzeigen |
| `maxfavorites` | 10 | Max. anzuzeigende Favoriten |
| `highlightcolor` | `yellow` | Farbe für die Favoriten |
| `Highlightcolor` | `Yellow` | Farbe für die Favoriten |

#### Kontrolle
Dieses Widget zeigt alle aktuellen Sendungen. Sie können auf das Kanallogo klicken, um den Kanal zu wechseln.
Sie können auf die Sendung klicken, um detaillierte Informationen zur Sendung zu erhalten.

Die folgenden Attribute stehen zur Konfiguration in vis zur Verfügung. Die Mindestkonfiguration besteht darin, den Datenpunkt auf den Befehlsdatenpunkt festzulegen.

| Attribut | Beispiel | Beschreibung |
| ---------------------- | ------------------------ | -------------------------------------------------------------------------------------------------- |
| `oid` | `tvprogram.0.tv1.cmd` | Ein Datenpunkt einer Instanz des `tvprogram`-Adapters. |
| `time` | 20:15 | wenn Uhrzeit nur die Sendung zu dieser Uhrzeit für 120 Minuten gezeigt werden soll, dann wird die Sendung vom nächsten Tag gezeigt |
| `time` | 20:15/200 | wenn Uhrzeit mit Dauer angegeben wird, würde die Sendung zu dieser Uhrzeit 200 Minuten lang gezeigt werden |
| `time` | 2021-02-15T20:15:00.000Z | Wenn es sich um eine gültige Datumszeichenfolge handelt, wird die Sendung zu diesem Zeitpunkt angezeigt. Denken Sie an die Zeitzonen |
| `heightRow` | 35 | Höhe für jede angezeigte Zeile |
| `showpictures` | x | Bilder anzeigen, falls verfügbar |
| `broadcastfontpercent` | 75 | Zeichengröße in Prozent für die Sendungen |
| `highlightcolor` | `yellow` | Farbe für die Favoriten |
| `dialogwidthpercent` | 90 | Größe der Dialoge in Prozent des Widgets |
| `dialogheightpercent` | 90 | Größe der Dialoge in Prozent des Widgets |
| `dialogheightpercent` | 90 | Größe der Dialoge in Prozent des Widgets |

##### CSS-Klassen
Bitte ändern Sie `w00001` in Ihre Widget-ID

So ändern Sie die Formatierung der wechselnden Hintergrundfarben der Sendungen

```css
#w00001 .tv-control .tv-row:nth-child(odd) {
  background-color: rgba(128, 128, 128, 0.65);
}
#w00001 .tv-control .tv-row:nth-child(even) {
  background-color: rgba(128, 128, 128, 0.55);
}
```

#### Suchen
Mit diesem Widget können Sie nach Sendungen mit Titel, Beschreibung, Startdatum und Sendungstyp suchen.

Das Eingabefeld „Von“ ist mit dem aktuellen Datum vorbefüllt. Wenn dieses Feld unverändert bleibt, beginnt die Suche mit der aktuellen Uhrzeit.

Wenn Sie dieses Feld auf ein zukünftiges oder vergangenes Datum ändern, beginnt die Suche um 00:00 dieses Datums.

Eines oder beide der Eingabefelder Suchtext und Kategorie müssen ausgefüllt/ausgewählt sein.

Die folgenden Attribute stehen zur Konfiguration in vis zur Verfügung. Die Mindestkonfiguration besteht darin, den Datenpunkt auf den Befehlsdatenpunkt festzulegen.

| Attribut | Beispiel | Beschreibung |
| ---------------------- | --------------------- | ----------------------------------------------------- |
| `Object ID` | `tvprogram.0.tv1.cmd` | Ein Datenpunkt einer Instanz des `tvprogram`-Adapters. |
| `maxresults` | 10 | max. Ergebnisse in der Liste |
| `heightRow` | 35 | Höhe für jede angezeigte Zeile |
| `broadcastfontpercent` | 75 | Zeichengröße in Prozent für die Sendungen |
| `highlightcolor` | `yellow` | Farbe für die Favoriten |
| `dialogwidthpercent` | 90 | Größe der Dialoge in Prozent des Widgets |
| `dialogheightpercent` | 90 | Größe der Dialoge in Prozent des Widgets |
| `dialogheightpercent` | 90 | Größe der Dialoge in Prozent des Widgets |

##### CSS-Klassen
Bitte ändern Sie `w00001` in Ihre Widget-ID

So ändern Sie die Formatierung der wechselnden Hintergrundfarben der Sendungen

```css
#w00001 .tv-search .tv-row:nth-child(odd) {
  background-color: rgba(128, 128, 128, 0.65);
}
#w00001 .tv-search .tv-row:nth-child(even) {
  background-color: rgba(128, 128, 128, 0.55);
}
```

### Bereitgestellte Datenpunkte
Für jedes angelegte Fernsehgerät gibt es den folgenden Datenpunktsatz

#### `channelfilter`
Dieser Datenpunkt enthält die im Widget angezeigten Kanäle als JSON-Array

#### `cmd`
Dieser Datenpunkt wird für die interne Kommunikation zwischen den Widgets und dem Adapter verwendet

#### `favorites`
Dieser Datenpunkt enthält die ausgewählten Favoriten als JSON-Array

#### `record`
Dieser Datenpunkt wird gesetzt, wenn der Benutzer in der Detailansicht einer Sendung auf die Schaltfläche „Aufzeichnen“ klickt.
Die bereitgestellten Daten sind

| Feld | Beispiel | Beschreibung |
| ------------- | ------------------------- | ---------------------- |
| `startTime` | 2021-01-01T00:10:00+01:00 | Startzeit |
| `title` | Titel der Sendung | Titel der Sendung |
| `channel` | 7 | Eindeutige Kanalnummer |
| `channelid` | `zdf` | Eindeutige Kanal-ID |
| `channelname` | `ZDF` | Lesbarer Kanalname |
| `eventid` | 12345678 | Eindeutige Broadcast-ID |
| `eventid` | 12345678 | Eindeutige Broadcast-ID |

#### `selectchannel`
Dieser Datenpunkt dient der Erkennung eines Kanalwechselbefehls bei Klick auf das Kanallogo oder das Umschaltsymbol in der Detailansicht.

#### `show`
Dieser Datenpunkt enthält den Status, ob nur Favoriten oder alles im Widget TV-Programm angezeigt werden soll

#### `config`
dieser Datenpunkt ist veraltet und wird in den nächsten Versionen entfernt

### Bereitgestellte `Sendto`-Befehle
Alle Daten können über Sendto-Befehle vom Adapter abgefragt werden. Dies kann zur Entwicklung individueller Funktionalitäten genutzt werden

#### `getServerData`
Fordern Sie Basisdaten vom Adapter an.

##### Gültige Parameter sind
- `Kategorien`
- `Genres`
- `Kanäle`

**Rücksendungen:**

`Array`

**Beispiel:**

```javascript
sendTo("tvprogram.0", "getServerData", "categories", (data) =>
  console.log(data),
);
```

#### `getServerTVProgram`
Programmdaten vom Adapter anfordern.

##### Gültige Parameter sind
eine Datumszeichenfolge im folgenden Format: `yyyy-mm-dd`

**Rücksendungen:**

`Array`

**Beispiel:**

```javascript
sendTo("tvprogram.0", "getServerTVProgram", "2021-02-10", (data) =>
  console.log(data),
);
```

#### `getServerBroadcast`
Detaildaten einer Sendung anfordern.

##### Gültige Parameter sind
ein Objekt, das ein Anzeigedatum im folgenden Format enthält: jjjj-mm-tt die Ereignis-ID der Übertragung

**Rücksendungen:**

`Object`

**Beispiel:**

```javascript
sendTo(
  "tvprogram.0",
  "getServerBroadcast",
  { viewdate: "2021-02-10", eventid: "10659522" },
  (data) => console.log(data),
);
```

#### `getFavoritesData`
Fordern Sie von jetzt an alle Lieblingssendungen an, bis das gespeicherte Datenvolumen aufgebraucht ist.

##### Gültige Parameter sind
`Array` Favoriten

**Rücksendungen:**

`Array`

**Beispiel:**

```javascript
sendTo("tvprogram.0", "getFavoritesData", ["heute", "Tagesschau"], (data) =>
  console.log(data),
);
```

#### `getServerBroadcastNow`
Fordert alle aktuell laufenden Sendungen an

##### Gültige Parameter sind
Array von Kanal-IDs Ihrer Lieblingskanäle

**Rücksendungen:**

`Array`

**Beispiel:**

```javascript
sendTo("tvprogram.0", "getServerBroadcastNow", [1, 6, 22, 7], (data) =>
  console.log(data),
);
```

#### `getServerBroadcastDate`
Fordert alle Übertragungen an, die zu einem bestimmten Zeitpunkt ausgeführt werden

##### Gültige Parameter sind
Array von Kanal-IDs Ihrer Lieblingskanäle datetime

**Rücksendungen:**

`Array`

**Beispiel:**

```javascript
sendTo(
  "tvprogram.0",
  "getServerBroadcastDate",
  { channelfilter: [1, 6, 22, 7], date: "2021-02-10T20:15:00.000Z" },
  (data) => console.log(data),
);
```

#### `getServerBroadcastFind`
Suche nach Sendungen in einem Zeitbereich und optional mit Kategorien

##### Gültige Parameter sind
`channelfilter`: Array von Kanal-IDs Ihrer Lieblingskanäle `categoryfilter`: Optionales Array von Kategorie-IDs `datetimefrom`: Datum/Uhrzeit von `datetimetill`: Datum/Uhrzeit bis `textfilter`: Optionaler Titel oder Teil eines zu suchenden Titels `maxresults`: Optional die maximale Anzahl der Ergebnisse. Der Standardwert ist 10

**Rücksendungen:**

`Array`

**Beispiel:**

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
Verfügbare Sendetermine im Adapterspeicher abfragen

##### Gültige Parameter sind
leeres Objekt

**Rücksendungen:**

`Array`

**Beispiel:**

```javascript
sendTo("tvprogram.0", "getServerInfo", "{}", (data) => console.log(data));
```

### Community stellt Widgets/Skripte bereit
#### `Harmony` und `MagentaTV`
Skript bereitgestellt von pix Nach dem Klick auf das Kanallogo setzt das Skript die zugeordnete Kanal-ID auf den Harmony-Datenpunkt

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

### Funktionen sind nicht im Adapter implementiert, werden aber als Skripte für den JavaScript-Adapter bereitgestellt
#### `Recordlist`
Liste aller aktuellen Aufnahmezeiten, die vom Aufnahmedatenpunkt erfasst und minütlich aktualisiert werden.

Sie müssen den Datenpunktnamen Ihrer RecorderList und den Namen des zu beobachtenden Datenpunkts konfigurieren.

Sobald das Skript die Aufnahme zur Liste hinzugefügt hat, wird der Aufnahmedatenpunkt geleert.

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

Zur Visualisierung dieser Daten kann das Widget JSON Template vom Adapter myTime mit folgender Vorlage helfen.

Gebt als json_oid den Datenpunkt mit dem `recordlist` ein und als json_template folgenden Code:

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

#### Aktuelle Lieblingssendung
Das folgende Skript ermittelt einmal pro Minute, ob ein Lieblingsprogramm gerade ausgeführt wird.

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

#### Einfärbung von Sendungen, die sich im Datenpunkt `recordlist` im Widget tvprogram befinden
die folgende Vorlage ist für die Widget-JSON-Vorlage vom Adapter RSS-Feed.
Diese Vorlage erzeugt keine sichtbare Ausgabe, sondern generiert CSS-Anweisungen, die die aktuellen Programme einfärben.
Sie färbt auch die Aufnahmeschaltfläche in der Detailansicht ein.

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

### Funktionen
- TV-Daten auf der Zeitleiste nach TV-Kanal anzeigen
- Details zu einer Fernsehsendung anzeigen, sofern verfügbar
- Anzeige einer Markierung der aktuellen Position mit automatischem Scrollen
- Angezeigte TV-Sender konfigurieren und anordnen, Neusortierung per Drag & Drop möglich.
- Schaltbefehl über Datenpunkt nach Klick auf Logo
- Vergrößern/Verkleinern
- Navigation nächster und vorheriger Tag
- Wiedergabetaste zum Umschalten des Kanaldatenpunkts
- Zoom in der Mitte der nächsten Tage
- zurück in die Gegenwart
- Zoom zurücksetzen
- Lieblingssendungen
- Text aus der Detailansicht kopieren
- Markerposition ist konfigurierbar
- Dialogbreite und -höhe sind konfigurierbar
- Datenpunkt-Aufzeichnung, die nach Druck auf Knopf mit Aufnahmedaten gefüllt wird
- Widget für Favoriten
- Nicht-Favoriten ausblenden

### Aufgaben
Widget TV-Programm:

- vielleicht ein Highlight-Sendungs-Widget
- Datenadapter für andere Quellen (Internet, Hardware wie Enigma, VU-Box). Überlegungen hierzu sind derzeit aufgrund der geringen Nachfrage ausgesetzt
- ~~Dokumentation zur Konfiguration der Widgets verbessern~~
- ~~Bilder übertragen, sofern verfügbar, in der Hauptansicht des Zeit-Widgets~~
- ~~Suche im gesamten Text, um auch Regisseure und Schauspieler zu finden~~
- ~~Tooltips für die Schaltflächen im Zeit-Widget~~
- ~~Ideen für weitere Widgets basierend auf dem bestehenden TV-Programmskript~~
- ~~Problem: Endloses Scrollen in Firefox~~
- ~~zu besprechen: Datenpunkt, mit allen Aufnahmedaten, sollte an einem Videorecorder-Adapter oder in einem separaten Skript implementiert werden~~
- ~~Responsive Design für Detailansicht->kein Responsive Design für jQuery-Dialog möglich, andere Lösung mit festen Layouts für Höhe>Breite gefunden~~
- ~~Problem: kleiner Pixelfehler, wenn der Scrollbereich auf der linken Seite vollständig ist~~

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- Change sento command from getFavoritesDatax to getFavoritesData

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