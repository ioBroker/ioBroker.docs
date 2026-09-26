---
chapters: {"pages":{"en/adapterref/iobroker.tvprogram/README.md":{"title":{"en":"ioBroker.tvprogram"},"content":"en/adapterref/iobroker.tvprogram/README.md"},"en/adapterref/iobroker.tvprogram/docs/EXAMPLES.md":{"title":{"en":"Examples"},"content":"en/adapterref/iobroker.tvprogram/docs/EXAMPLES.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tvprogram/docs/EXAMPLES.md
title: Beispiele
hash: j9fV0rV0hRG7TX7TTrjAZ7rAIvxnqrnv+wCAyjfOPws=
---
# Beispiele

Dieses Dokument enthält erweiterte Beispiele für ioBroker.tvprogram. Passen Sie Instanznummern, TV-IDs, Widget-IDs, Datenpunkte und Kanalzuordnungen an Ihre Installation an. Die Hauptdokumentation finden Sie in der [README-Datei](/#/adapters/tvprogram) .

## Widget-Styling

Ersetzen `w00001` mit der ID Ihres Widgets.

### Zeitplan

Ändern Sie die Dialoghintergründe:

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

Falls andere Dialoge die Programm- oder Kanaldialoge überlappen, erhöhen Sie deren Anzahl. `z-index` Der erforderliche Wert hängt von den anderen Dialogen in der Ansicht ab.

```css
.ui-dialog.w00001 {
    z-index: 300 !important;
}
```

Ändern der abwechselnden Hintergrundfarben des Programms:

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

### TV-Steuerung

Ändern der abwechselnden Hintergrundfarben des Programms:

```css
#w00001 .tv-control .tv-row:nth-child(odd) {
    background-color: rgba(128, 128, 128, 0.65);
}
#w00001 .tv-control .tv-row:nth-child(even) {
    background-color: rgba(128, 128, 128, 0.55);
}
```

### Suchen

Ändern der abwechselnden Hintergrundfarben des Programms:

```css
#w00001 .tv-search .tv-row:nth-child(odd) {
    background-color: rgba(128, 128, 128, 0.65);
}
#w00001 .tv-search .tv-row:nth-child(even) {
    background-color: rgba(128, 128, 128, 0.55);
}
```

## `sendTo` Befehlsbeispiele

### `getServerData`

Basisdaten vom Adapter anfordern.

#### Gültige Parameter

- `categories`
- `genres`
- `channels`

**Rückgabe:**

`Array`

**Beispiel:**

```javascript
sendTo('tvprogram.0', 'getServerData', 'categories', data => console.log(data));
```

### `getServerTVProgram`

Programmdaten vom Adapter anfordern.

#### Gültige Parameter

eine Datumszeichenfolge im folgenden Format: `yyyy-mm-dd`

**Rückgabe:**

`Array`

**Beispiel:**

```javascript
sendTo('tvprogram.0', 'getServerTVProgram', '2021-02-10', data => console.log(data));
```

### `getServerBroadcast`

Fordern Sie die Detaildaten einer Sendung an.

#### Gültige Parameter

Ein Objekt, das ein Ansichtsdatum im folgenden Format enthält: JJJJ-MM-TT; die Ereignis-ID der Übertragung

**Rückgabe:**

`Object`

**Beispiel:**

```javascript
sendTo('tvprogram.0', 'getServerBroadcast', { viewdate: '2021-02-10', eventid: '10659522' }, data => console.log(data));
```

### `getFavoritesData`

Fordern Sie alle Ihre Lieblingssendungen ab sofort bis zum Ende der gespeicherten Daten an.

#### Gültige Parameter

`Array` Favoriten

**Rückgabe:**

`Array`

**Beispiel:**

```javascript
sendTo('tvprogram.0', 'getFavoritesData', ['heute', 'Tagesschau'], data => console.log(data));
```

### `getServerBroadcastNow`

Fordert alle aktuell laufenden Übertragungen an.

#### Gültige Parameter

Array von Kanal-IDs Ihrer Lieblingskanäle

**Rückgabe:**

`Array`

**Beispiel:**

```javascript
sendTo('tvprogram.0', 'getServerBroadcastNow', [1, 6, 22, 7], data => console.log(data));
```

### `getServerBroadcastDate`

Fordert alle Sendungen an, die zu einem bestimmten Datum/einer bestimmten Uhrzeit laufen.

#### Gültige Parameter

Array von Kanal-IDs Ihrer Lieblingskanäle Datum/Uhrzeit

**Rückgabe:**

`Array`

**Beispiel:**

```javascript
sendTo(
    'tvprogram.0',
    'getServerBroadcastDate',
    { channelfilter: [1, 6, 22, 7], date: '2021-02-10T20:15:00.000Z' },
    data => console.log(data),
);
```

### `getServerBroadcastFind`

Suchen Sie nach Sendungen in einem bestimmten Zeitraum und optional nach Kategorien.

#### Gültige Parameter

`channelfilter`: Array von Kanal-IDs Ihrer Lieblingskanäle `categoryfilter` Optionales Array von Kategorie-IDs `datetimefrom`: Datum/Uhrzeit von `datetimetill`: datetime till `textfilter`: Optionaler Titel oder Teil eines Titels für die Suche `maxresults` Optional: Die maximale Anzahl der Ergebnisse. Standardwert: 10.

**Rückgabe:**

`Array`

**Beispiel:**

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

Verfügbare Sendetermine im Adapterspeicher anfordern

#### Gültige Parameter

leeres Objekt

**Rückgabe:**

`Array`

**Beispiel:**

```javascript
sendTo('tvprogram.0', 'getServerInfo', '{}', data => console.log(data));
```

## Gemeinschaftsintegrationen

### `Harmony` Und `MagentaTV`

Das von PIX bereitgestellte Skript weist nach dem Klicken auf das Kanallogo dem Harmony-Datenpunkt die zugeordnete Kanal-ID zu. Dies gilt aktuell nur für die Datenquelle „TV für alle“. Für die Quelle „IPTV-EPG“ müssen die Kanal-IDs angepasst werden.

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

### Alternative Kanallogos

Forumlink mit Beispiel-Screenshots [: https://forum.iobroker.net/topic/40168/test-adapter-tvprogram/863](https://forum.iobroker.net/topic/40168/test-adapter-tvprogram/863)

**Kanallogos herunterladen:**

Sie müssen sich registrieren, um die Logos in der Größe 400x160 herunterzuladen.

<https://vuplus-support.org/wbb4/index.php?thread/64098-mirror-glass-3d-huminator-design-by-stefanbenno6/>

**Benennen Sie die Logos um:**

Führen Sie die folgenden Befehle im heruntergeladenen und entpackten Ordner aus.

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

**Neuen Ordner in der Ansicht erstellen:**

Öffnen Sie den Dateimanager-Dialog.

Prüfen Sie, ob der folgende Pfad existiert, oder erstellen Sie den Pfad im Dialogfeld.

```text
/vis.0/icons/tvlogos/
```

**Pfad im Datenpunkt eingeben:**

Geben Sie den folgenden Pfad in den Datenpunkt ein. `optchnlogopath` Ersetzen Sie 192.1.2.3 durch die IP-Adresse Ihrer iobroker-Installation.

```text
http://192.1.2.3:8082/vis.0/icons/tvlogos/
```

**Symbolbreite anpassen:**

Jedes Widget verfügt über das Attribut „Breite Kanallogo px“. Bitte geben Sie eine geeignete Breite für das Symbolset ein.

## Beispiele für JavaScript-Adapter

### `Recordlist`

Liste aller aktuell vom Aufzeichnungsdatenpunkt erfassten Aufzeichnungszeiten, die minütlich aktualisiert wird. Sie müssen den Namen des Datenpunkts Ihrer Aufzeichnungsliste und den Namen des anzuzeigenden Datenpunkts konfigurieren. Sobald das Skript die Aufzeichnung zur Liste hinzugefügt hat, wird der entsprechende Datenpunkt geleert.

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

Um diese Daten zu visualisieren, kann die Widget-JSON-Vorlage des Adapters „myTime“ mit der folgenden Vorlage helfen. Geben Sie als „json\_oid“ den Datenpunkt mit der `recordlist` und als json\_template den folgenden Code:

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

### Meine Lieblingssendung im Moment

Das folgende Skript prüft einmal pro Minute, ob ein bevorzugtes Programm gerade ausgeführt wird.

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

### Farbgebung von Programmen, die sich im `recordlist` Datenpunkt im Widget tvprogram

Die folgende Vorlage dient als Widget-JSON-Vorlage für den Adapter RSS-Feed. Diese Vorlage erzeugt keine sichtbare Ausgabe, sondern CSS-Anweisungen, die die aktuellen Programme farblich hervorheben. Auch die Aufnahmetaste in der Detailansicht wird farblich markiert.

Um diese Vorlage zu verwenden, wählen Sie bitte den Datenpunkt „recordlist“ in den Widget-Eigenschaften unter „json\_oid“ aus und fügen Sie die folgende Vorlage in „json\_template“ ein.

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