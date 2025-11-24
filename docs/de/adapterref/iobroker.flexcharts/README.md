---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.flexcharts/README.md
title: ioBroker.flexcharts
hash: B0rBGSntv+Ju2U5qKM7ggjfK+HoJx55myfnP3C/Ghc4=
---
![Logo](../../../en/adapterref/iobroker.flexcharts/admin/flexcharts-icon-small.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.flexcharts.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.flexcharts.svg)
![Anzahl der Installationen](https://iobroker.live/badges/flexcharts-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/flexcharts-stable.svg)
![NPM](https://nodei.co/npm/iobroker.flexcharts.png?downloads=true)

# IoBroker.flexcharts
**Tests:** ![Test und Freigabe](https://github.com/MyHomeMyData/ioBroker.flexcharts/workflows/Test%20and%20Release/badge.svg)

## Flexcharts-Adapter für ioBroker
# Eilmeldung
Apache ECharts wurde in Version 6.0.0 mit 12 wichtigen Aktualisierungen veröffentlicht. Weitere Informationen finden Sie unter https://echarts.apache.org/handbook/en/basics/release-note/v6-feature.

Flexcharts v0.6.0 basiert auf dieser neuen Version und bietet neue Funktionen:

* brandneues Standarddesign
* Möglichkeit, eine unbegrenzte Anzahl eigener Designs zu übergeben
* Dynamischer Themenwechsel, ein typisches Szenario ist das Abhören des Dunkelmodus des Systems und die dynamische Anpassung des Diagrammthemas (fügen Sie den HTTP-Parameter `&darkmode=auto` hinzu, um ihn zu aktivieren).
* neue Diagrammtypen
* Möglichkeit, eine unbegrenzte Anzahl ereignisgesteuerter Funktionen zu übergeben

**Hinweis:** Sie können die **ECharts v5-Themes** (Standard und Dunkel) beibehalten, indem Sie einfach den HTTP-Parameter `&themev5` hinzufügen, z. B. `http://localhost:8082/flexcharts/echarts.html?source=state&id=flexcharts.0.info.chart1&themev5`. Apache bietet zwar ein helles v5-Theme an, aber kein dunkles – ich habe das Problem bereits gemeldet. Ich habe daher vorerst selbst ein dunkles v5-Theme basierend auf dem dunklen Apache-Theme für Version 5.6.0 erstellt. Sollten Sie Unterschiede zwischen den v5-Themes feststellen, melden Sie bitte ein Problem für Flexcharts.

# Grundkonzept
Es gibt verschiedene Adapter zur Anzeige von Charts in ioBroker. Soweit ich weiß, verwenden alle eine Benutzeroberfläche zur Konfiguration von Chartinhalten und -optionen. Typischerweise lassen sich nicht alle Funktionen des verwendeten Grafiksystems auf diese Weise nutzen. Beispielsweise ist es mit dem eChart-Adapter nicht möglich, vollumfängliche gestapelte Charts anzuzeigen.

Dieser Adapter verfolgt einen anderen Ansatz. Er bietet nahezu den gesamten Funktionsumfang von [Apache ECharts](https://echarts.apache.org/en/index.html) zu ioBroker. Schauen Sie sich die [Demo-Charts] an.](https://echarts.apache.org/examples/en/index.html).

Anmerkung: Der Adapter wurde noch nicht unter MacOS getestet.

**Es gibt keine Benutzeroberfläche zur Konfiguration von Diagrammen.** Sie müssen das Diagramm selbst definieren; die Visualisierung übernimmt der Adapter. Sie müssen die Definition und den Inhalt des Diagramms als JSON-Objekt angeben – in den eCharts-Beispielen entspricht dies dem Inhalt der Variablen `option`. Hier ist ein Beispiel zur Verdeutlichung. Um ein gestapeltes Diagramm zu erstellen, speichern Sie dessen Definition in einem ioBroker-Status (im JSON-Format):

```
{ "tooltip": {"trigger": "axis","axisPointer": {"type": "shadow"}},
  "legend": {},
  "xAxis": [{"type": "category","data": ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]}],
  "yAxis": [{"type": "value"}],
  "dataZoom": [{"show": true,"start": 0, "end": 100}],
  "series": [
    { "name": "Grid", "type": "bar", "color": "#a30000", "stack": "Supply",
      "data": [8,19,21,50,26,0,36]},
    { "name": "PV", "type": "bar", "color": "#00a300", "stack": "Supply",
      "data": [30,32,20,8,33,21,36]},
    { "name": "Household", "type": "bar", "color": "#0000a3", "stack": "Consumption",
      "data": [16,12,11,13,14,9,12]},
    { "name": "Heat pump", "type": "bar", "color": "#0000ff", "stack": "Consumption",
      "data": [22,24,30,20,22,12,25]},
    { "name": "Wallbox", "type": "bar", "color": "#00a3a3", "stack": "Consumption",
      "data": [0,15,0,25,23,0,35]}
  ]
}
```

Der Flexchart-Adapter zeigt dann dieses Diagramm an:

![flexcharts_stacked1](https://github.com/user-attachments/assets/7cf6dfab-ddad-4b2f-a1e1-20fa4b876b4c)

Normalerweise verwendet man Blockly oder JavaScript, um Inhalte dieses Zustands zu erstellen und zu aktualisieren.

Es besteht noch eine weitere Möglichkeit, eCharts-Daten direkt über eine Callback-Funktion in JavaScript zu übergeben. Details dazu finden Sie weiter unten.

Um es klarzustellen: Diese Methode ist nicht dafür gedacht, schnell ein einfaches Diagramm zu erstellen.
Wenn Sie jedoch eine konkrete Idee für ein komplexeres Diagramm haben, bietet Ihnen flexcharts die Möglichkeit, diese umzusetzen.

# Erste Schritte
### Verwendung des Adapters
Dieser Adapter stellt seine Funktionalität als Web-Erweiterung bereit. Daher ist es zwingend erforderlich, dass [Webadapter](https://www.iobroker.net/#en/adapters/adapterref/iobroker.ws/README.md) (`web.0`) installiert und ausgeführt wird. In dieser Readme-Datei wird davon ausgegangen, dass Sie den Standardport 8082 für den Web-Adapter verwenden.

Wenn der Flexcharts-Adapter aktiv ist, können Sie ihn über http://localhost:8082/flexcharts/echarts.html aufrufen (ersetzen Sie `localhost` durch die Adresse Ihres ioBroker-Servers).

Sie können diese Adresse in iFrame-Widgets von vis oder jarvis oder anderen Visualisierungen verwenden. Selbstverständlich können Sie sie auch direkt in einem Browsertab verwenden.

Damit dies funktioniert, müssen Sie zusätzliche Parameter angeben, um dem Adapter die Datenquelle mitzuteilen. Zwei Optionen stehen zur Verfügung:

* `source=state` => Sie stellen Chartdaten in einem ioBroker-Status (JSON) bereit
* `source=script` => Sie stellen Diagrammdaten über ein Skript (JavaScript oder Blockly) bereit

Es stehen weitere Optionen zur Verfügung, siehe [Referenzabschnitt](#reference)

Um die korrekte Installation des Adapters zu überprüfen, verwenden Sie das integrierte Demo-Diagramm: http://localhost:8082/flexcharts/echarts.html?source=state&id=flexcharts.0.info.chart1

### IoBroker-Status als Quelle für ein eChart verwenden
Beispiel: `http://localhost:8082/flexcharts/echarts.html?source=state&id=0_userdata.0.echarts.chart1`

<!-- Would this be better to read: Example: http://localhost:8082/flexcharts/echarts.html?<mark style="background-color: #ffff00">source=state</mark>&<mark style="background-color: #00c000">&id=0_userdata.0.echarts.chart1</mark> -->

Flexcharts wertet den Zustand `0_userdata.0.echarts.chart1` als Daten für eChart aus. Probieren Sie es aus: Erstellen Sie einen solchen Zustand und kopieren Sie die JSON-Daten des oben gezeigten Beispiels (`{ "tooltip": { ...`) als Zustandsinhalt. Rufen Sie anschließend die angegebene Adresse mit einem Browser auf.

Folgende Zeichen dürfen in der Statuskennung nicht verwendet werden: `: / ? # [ ] @ ! $ & ' ( ) * + , ; = %`

### JavaScript als Quelle für ein eChart verwenden
Dies ist etwas komplexer, aber deutlich effizienter und flexibler. Die Diagrammdaten werden direkt über Ihr JavaScript-Skript bereitgestellt, das dynamisch vom Flexcharts-Adapter aufgerufen wird. Sie können Ihrem Skript zusätzliche Parameter übergeben, indem Sie diese der HTTP-Adresse hinzufügen, z. B. `&chart=chart1`. Alle HTTP-Parameter sind innerhalb des Skripts im Objekt `httpParams` verfügbar (siehe Beispiel unten).

Auch hier ist es am besten, dies anhand eines Beispiels zu erklären. Erstellen Sie ein Skript mit folgendem Inhalt (nur die erste JS-Instanz (**javascript.0**) wird unterstützt, der Name des Skripts ist irrelevant):

```
onMessage('flexcharts', (httpParams, callback) => {
    const myJsonParams  = (httpParams.myjsonparams ? JSON.parse(httpParams.myjsonparams) : {} );
    console.log(`httpParams = ${JSON.stringify(httpParams)}`);
    console.log(`myJsonParams = ${JSON.stringify(myJsonParams)}`);
    chart1(result => callback(result));
});

function chart1(callback) {
    const option = {
        tooltip: {trigger: "axis", axisPointer: {type: "shadow"}},
        legend: {},
        xAxis: [{type: "category", data: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]}],
        yAxis: [{type: "value"}],
        dataZoom: [{show: true, start: 0, end: 100}],
        series: [
            { name: "Grid", type: "bar", color: "#a30000", stack: "Supply",
              data: [8,19,21,50,26,0,36]},
            { name: "PV", type: "bar", color: "#00a300", stack: "Supply",
            data: [30,32,20,8,33,21,36]},
            { name: "Household", type: "bar", color: "#0000a3", stack: "Consumption",
            data: [16,12,11,13,14,9,12]},
            { name: "Heat pump", type: "bar", color: "#0000ff", stack: "Consumption",
            data: [22,24,30,20,22,12,25]},
            { name: "Wallbox", type: "bar", color: "#00a3a3", stack: "Consumption",
            data: [0,15,0,25,23,0,35]}
        ]
    };
    callback(option);
}
```

Starten Sie das Skript und rufen Sie diese Adresse in einem Browser auf: `http://localhost:8082/flexcharts/echarts.html?source=script`

<!-- Would this be better to read: Start the script and access this in a browser: http://localhost:8082/flexcharts/echarts.html?<mark style="background-color: #ffff00">source=script</mark> -->

Es sollte dasselbe Diagramm wie im vorherigen Beispiel angezeigt werden.

Sie sollten zwei Logeinträge des Beispielskripts erhalten:

```
httpParams = {"message":"mylinechart","source":"script"}
myJsonParams = {}
```

Weitere Parameter können an das Skript übergeben werden und stehen innerhalb des Skripts in der Variablen `httpParams` zur Verfügung. Versuchen Sie folgenden Befehl: `http://localhost:8082/flexcharts/echarts.html?source=script&chart=chart1&myjsonparams={"period":"daily"}`

Die Logeinträge sollten nun folgendermaßen aussehen:

```
httpParams = {"source":"script","chart":"chart1","myjsonparams":"{\"period\":\"daily\"}"}`
myJsonParams = {"period":"daily"}
```

Bitte beachten Sie: **Sie müssen die Funktionalität `onMessage()` verwenden, um den Trigger vom Adapter zu empfangen.** Der Standardwert für die Nachricht ist `flexcharts`, wie im obigen Beispiel gezeigt. Sie können andere Nachrichten verwenden, indem Sie einen zusätzlichen Parameter angeben. Um beispielsweise die Nachricht `mycharts` zu verwenden, fügen Sie `&message=mycharts` zur HTTP-Adresse hinzu: `http://localhost:8082/flexcharts/echarts.html?source=script&message=mycharts`

### Verwendung von Funktionen innerhalb der Definition eines Diagramms
Leider funktionieren Funktionsdefinitionen innerhalb der Diagrammdefinition in der Regel nicht, da sie bei Verwendung von `JSON.stringify(option)` oder `callback(option)` gefiltert werden.

Seit Version 0.3.0 von flexcharts ist dies jedoch möglich. Es ist etwas mehr Aufwand erforderlich:

* Fügen Sie das npm-Modul `javascript-stringify` zur Instanz 0 des JavaScript-Adapters hinzu. Fügen Sie dazu `javascript-stringify` in der Konfiguration des Adapters unter „Zusätzliche npm-Module“ hinzu:

![Füge npm-Module hinzu](../../../en/adapterref/iobroker.flexcharts/add_npm_modules.png)

* Fügen Sie in Ihrem Skript am Anfang `var strify = require('javascript-stringify');` hinzu.
* Bei Verwendung eines Skripts als Datenquelle: Ersetzen Sie innerhalb Ihrer `onMessage()`-Funktionalität `callback(option);` durch `callback(strify.stringify(option));` (vorausgesetzt, `option` enthält Ihre Diagrammdefinition).
* Dann verwenden Sie einen Zustand als Datenquelle: Ersetzen Sie beim Erstellen des Zustands `setState('my_chart_id', JSON.stringify(option), true);` durch `setState('my_chart_id', strify.stringify(option), true);`
Das war's. Funktionen innerhalb von Diagrammdefinitionen werden nun korrekt an Flexcharts weitergeleitet.

Probieren Sie es einfach mit [Vorlage 3](templates/flexchartsTemplate3.js). Eine Funktion wird verwendet, um die Daten des Tooltips mit 2 Dezimalstellen anzuzeigen: `tooltip: {trigger: "axis", valueFormatter: (value) => '. + value.toFixed(2)}`.

Ein Beispiel für die Verwendung der Diagrammdefinition über den Zustand finden Sie in `flexcharts.0.info.chart2`. Dieses Diagramm entspricht dem von Vorlage 3.

Hinweis: Wenn das npm-Modul `javascript-stringify` installiert ist, kann dessen Funktionalität auch von Schadcode missbraucht werden (Cross-Site-Scripting). Daher sollte ioBroker bei Verwendung dieses Moduls nicht über das Internet erreichbar sein.

### Verwendung ereignisgesteuerter Funktionen zur Erstellung dynamisch veränderlicher Diagramme
Apache ECharts unterstützt dynamisch anpassbare Diagramme. Sehen Sie sich dieses Beispiel an: [Beispiel](https://echarts.apache.org/examples/en/editor.html?c=dataset-link). Wenn Sie den Mauszeiger über einen Datenpunkt im Liniendiagramm bewegen, wird das Kreisdiagramm entsprechend aktualisiert.
Hier ist eine Bildschirmaufnahme dieses Diagramms, dargestellt mit Flexcharts: [dynamisch veränderliches Diagramm](dynamic_charts_with_flexcharts.mkv)

**Wichtiger Hinweis** für das Update auf Version **0.5.0** von Flexcharts: Wenn Sie diese Funktion nutzen und Diagrammoptionen innerhalb Ihrer ereignisgesteuerten Funktion dynamisch ändern möchten, mussten Sie die Option bisher über die Variable `jsopts` ansprechen. Ab Version 0.5.0 heißt diese nun `option`. Bitte passen Sie die Benennung in Ihrer Funktion entsprechend an, d. h. ersetzen Sie `jsopts` durch `option`.

Um ereignisgesteuerte Funktionen für Ihre eigenen Diagramme zu verwenden, empfehle ich die Verwendung eines **Skripts als Quelle**. [Vorlage 4](templates/flexchartsTemplate4.js) veranschaulicht die Implementierung. Bitte beachten Sie Folgendes:

Um das Diagramm dynamisch zu gestalten, müssen Sie Funktionen definieren, die Ereignisse innerhalb des Diagramms verarbeiten. Dies geschieht durch die Definition von Funktionen wie `myChart.on("event",function(e){ ... });`
* Es ist zwingend erforderlich, jede dieser Funktionen mit `myChart.on()` zu benennen.
Um die Funktionsdefinition an Flexcharts zu übergeben, muss sie in einen **JavaScript-String** umgewandelt werden. Dies kann durch die Verwendung von Anführungszeichen (`"`) innerhalb der Funktion und anschließendes Einschließen in Apostrophe (`'`) – oder umgekehrt – erfolgen. Zur Reduzierung des benötigten Speicherplatzes können Sie einen Komprimierungsdienst wie beispielsweise [diesen hier](https://www.toptal.com/developers/javascript-minifier) verwenden.
Abschließend müssen Sie alle Bestandteile – die Diagrammdefinition und die Definition der Ereignisfunktion(en) – als **Array von JavaScript-Strings** über den Callback bereitstellen. In Template 4 geschieht dies mit `callback([strify.stringify(option), onEvent]);`, wobei `option` die Diagrammdefinition und `onEvent` die Definition der Ereignisfunktion als JavaScript-String enthält. Falls Sie mehrere Funktionen definieren, können Sie diese entweder dem String `onEvent` hinzufügen oder als zusätzliches Array-Element einfügen, z. B. `callback([strify.stringify(option), onEvent1, onEvent2, onEvent3]);`. Die Anzahl der Funktionsdefinitionen ist unbegrenzt.
* Um die Definition des Diagramms (`option`) in einen String umzuwandeln, müssen Sie `javascript-stringify` verwenden, wie im vorherigen Kapitel beschrieben.

Hinweis: Wenn das npm-Modul `javascript-stringify` installiert ist, kann dessen Funktionalität auch von Schadcode missbraucht werden (Cross-Site-Scripting). Daher sollte ioBroker bei Verwendung dieses Moduls nicht über das Internet erreichbar sein.

Diese Funktion kann auch mit einem **Bundesland als Datenquelle** verwendet werden. Das ist allerdings noch komplizierter:

Der Zustand muss als **Array von JSON-Strings** erstellt werden. Die beiden Elemente des Arrays bestehen aus der Definition des Diagramms und der Definition der Ereignisfunktion(en).
* Nun müssen jedoch beide Strings gültige **JSON-Strings** sein. Dies unterscheidet sich von JavaScript-Strings und bringt zusätzliche Einschränkungen mit sich:
* Um eine Zeichenkette einzuschließen, müssen Anführungszeichen verwendet werden. Daher sind innerhalb der Zeichenkette nur Apostrophe oder maskierte Anführungszeichen (`\"`) zulässig.
* Innerhalb eines Strings sind keine Zeilenumbrüche erlaubt.
* Es empfiehlt sich, die Gültigkeit des Arrays mithilfe eines JSON-Validators zu überprüfen, z. B. [diesem hier](https://jsonformatter.curiousconcept.com/#).
Natürlich möchten Sie die Daten des Diagramms bearbeiten. Da die Daten jedoch Teil der Diagrammdefinition sind, müssen Sie das Array von JSON-Strings mithilfe von JavaScript lesen und schreiben. Daher empfehle ich, wie oben beschrieben, ein Skript als Datenquelle zu verwenden.
Ein Beispiel ist jedoch im Info-Bereich von Flexcharts verfügbar: `flexcharts.0.info.chart3`. Zur Anzeige im Browser verwenden Sie `http://localhost:8082/flexcharts/echarts.html?source=state&id=flexcharts.0.info.chart3`.

### Arbeiten mit Apache EChart-Themes (v6-Funktion)
ECharts bietet verschiedene Möglichkeiten zur Diagrammanpassung. Eine leistungsstarke Methode ist die Verwendung von Designs. Standardmäßig wird im Normalmodus das Design „default“ und im Dunkelmodus das Design „dark“ verwendet. Diese Designs sind vordefiniert, können aber angepasst werden. Flexcharts Version 0.6.0 und höher unterstützt die Definition von Designs. In Kombination mit der Definition ereignisgesteuerter Funktionen (siehe vorheriges Kapitel) ist es zudem möglich, dynamisch zwischen Designs zu wechseln. Designs lassen sich am besten mit Apache ECharts [Theme-Builder](https://echarts.apache.org/en/theme-builder.html) erstellen oder bearbeiten.

Um ein Design mithilfe eines **Skripts als Quelle** an Flexcharts zu übergeben, befolgen Sie diese Schritte:

* Wählen Sie auf der Website im „Theme Builder“ ein Design aus oder bearbeiten Sie es, und klicken Sie anschließend auf die Schaltfläche „Herunterladen“.
* Wählen Sie den Tab „JSON-Version“ aus und kopieren Sie den Inhalt durch Drücken der Schaltfläche „Kopieren“ in die Zwischenablage.
* Füge etwas wie `const myThemeDefault = ` zu deinem Skript hinzu und füge den Inhalt der Zwischenablage dahinter ein.
* Übergeben Sie das Theme an Flexcharts mithilfe eines Arrays, wie für ereignisgesteuerte Funktionen gezeigt: `callback([JSON.stringify(option), ['default', JSON.stringify(myThemeDefault)]]);`
* Hinweis: Sie müssen das Theme als String-Array `[<Name des Themes>, <String-Definition des Themes>]` übergeben.

[Vorlage 5](templates/flexchartsTemplate5.js) demonstriert die Implementierung der Übergabe neuer Designs für den Standardmodus (Design „default“) und den Dunkelmodus (Design „dark“). Das dynamische Umschalten zwischen beiden Designs basierend auf den Systemeinstellungen ist aktiviert.

Um einen **Zustand als Quelle** für die Übergabe von Themen zu verwenden:

* Erstelle den Zustand im Format 'Array'
* Füge die Diagrammdefinition als erstes Element des Arrays hinzu.
* Bereiten Sie das/die Thema(en) als JSON-String vor. Verwenden Sie dazu einen JSON-Formatter, z. B. https://jsonformatter.curiousconcept.com/ mit der Vorlage „compact“, um das JSON-Objekt in einen String zu komprimieren.
* Füge das Theme als zweites Element als Array zum Zustand hinzu (siehe oben): `[<Name des Themes>, <Definition des Themes>]`
* Schließlich sollte der Zustand wie folgt aussehen: `[<stringified definition of chart>,['default', <stringified definition of default theme>]]`.
* Ein Beispiel ist unter `flexcharts.0.info.chart4` verfügbar (nur auf neu installierten Instanzen).

Die Anzahl der Designdefinitionen ist unbegrenzt. Um jedoch Designs mit anderen Namen als „Standard“ oder „Dunkel“ zu aktivieren, müssen Sie eine eigene Funktionalität definieren, die den Ausdruck `myChart.setTheme(<name of theme>);` enthält, sowie Code, der diese unter bestimmten Bedingungen aufruft.

**Probieren Sie es aus:**

* Erstellen Sie ein einfaches Diagramm basierend auf [diesem Beispiel](https://echarts.apache.org/examples/en/editor.html?c=area-stack)
* Um Daten an Flexcharts zu übergeben, verwenden Sie `callback(JSON.stringify(option));`
Nehmen Sie nun einige Änderungen am Standarddesign vor. Ersetzen Sie die Callback-Funktion durch diese Version:

`callback([JSON.stringify(option), ['default', '{"title":{"left":"left"},"color":["#ff715e","#ffaf51","#ffee51","#8c6ac4","#715c87"],"backgroundColor":"rgba(64,64,64,0.5)"}']]);`

* Sie sollten einen linksbündigen Titel und geänderte Farben für die Daten und den Hintergrund sehen.

## Vorlagen
Für einige Anwendungsfälle stehen JavaScript-Vorlagen zur Verfügung:

* Diagramm mit Daten aus dem Verlaufsadapter: [template1](templates/flexchartsTemplate1.js)
* Einfaches Diagramm für eine Wärmekurve: [template2](templates/flexchartsTemplate2.js)
* Einfaches gestapeltes Balkendiagramm unter Verwendung einer Funktion innerhalb der Diagrammdefinition: [template3](templates/flexchartsTemplate3.js)
* Diagramm für Daten des **tibberLink-Adapters**: siehe Diskussionen [hier](https://github.com/MyHomeMyData/ioBroker.flexcharts/discussions/67) und [hier](https://github.com/MyHomeMyData/ioBroker.flexcharts/discussions/66)
* Für Viessmann-Geräte der E3-Serie, z. B. die Wärmepumpe Vitocal 250, gibt es einen sehr spezifischen Anwendungsfall. Siehe https://github.com/MyHomeMyData/ioBroker.e3oncan/discussions/35
* Implementierung dynamisch veränderlicher Diagramme: [template4](templates/flexchartsTemplate4.js)
* Eigene Designs für den Standard- und Dunkelmodus implementieren und dynamisches Umschalten basierend auf den Systemeinstellungen verwenden: [template5](templates/flexchartsTemplate5.js)
Der Adapter [tibberLink](https://github.com/hombach/ioBroker.tibberlink) nutzt Flexcharts zur grafischen Datenverarbeitung. Er ist derzeit im Beta-Repository von ioBroker verfügbar. Weitere Informationen finden Sie in der [Dokumentation](https://github.com/hombach/ioBroker.tibberlink?tab=readme-ov-file#2-using-the-flexcharts-or-fully-featured-echarts-adapter-with-json).

## Referenz
Verwenden Sie den **ioBroker-Status** als Datenquelle: `http://localhost:8082/flexcharts/echarts.html?source=state&id=my_state_id`

Verwenden Sie **JavaScript** als Datenquelle: `http://localhost:8082/flexcharts/echarts.html?source=script`

### Optionale Argumente
* `&message=my_message` sendet "my_message" an JavaScript. Verwenden Sie `onMessage('my_message', (httpParams, callback) => { callback(mychart); })`, um Diagrammdaten bereitzustellen. Standardmäßig wird `flexcharts` verwendet.
* `&darkmode[=on|off|auto]` - legt die Dunkelmodus-Visualisierung von ECharts fest: 'off' => Dunkelmodus dauerhaft deaktiviert; 'on' oder kein Wert => Dunkelmodus dauerhaft aktiviert; 'auto' => Berücksichtigung der Dunkelmodus-Einstellung des Systems.
* `&refresh=number` – Aktualisiert das Diagramm alle „number“ Sekunden. Standardwert: 60 Sekunden. Der Mindestwert beträgt 5 Sekunden.
* `&themev5` – Legt das Standarddesign des Diagramms auf das Apache ECharts-Design „v5“ fest – siehe https://echarts.apache.org/handbook/en/basics/release-note/v6-upgrade-guide/ Kapitel „Standarddesign“
* `&user_defined_arguments` – Fügen Sie nach Bedarf weitere Parameter hinzu. Alle Argumente sind in der Funktion `onMessage()` im Objekt `httpParams` verfügbar. Weitere Details finden Sie in den obigen Beispielen und Vorlagen.

### Verwendung von Funktionen innerhalb der Definition von Diagrammen
Verfügbar ab Version 0.3.0. Siehe vorheriger Abschnitt [Kapitel](#using-functions-within-definition-of-chart)

### Eingebautes Demo-Diagramm
Es ist ein integriertes Demo-Diagramm verfügbar: http://localhost:8082/flexcharts/echarts.html?source=state&id=flexcharts.0.info.chart1

Dies sollte ein Demo-Diagramm anzeigen, wenn flexcharts- und web-adapter ausgeführt werden.

**Hinweis:** Ersetzen Sie `localhost` durch die Adresse Ihres ioBroker-Servers. Ersetzen Sie `8082` durch die Portnummer Ihres Web-Adapters.

## Spenden
<a href="https://www.paypal.com/donate/?hosted_button_id=WKY6JPYJNCCCQ"><img src="https://raw.githubusercontent.com/MyHomeMyData/ioBroker.flexcharts/main/admin/bluePayPal.svg" height="40"></a> Wenn dir dieses Projekt gefallen hat – oder du einfach nur großzügig sein möchtest –, spendiere mir doch ein Bier. Prost! 😉

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.6.1 (2025-11-01)
* (MyHomeMyData) Added support for dark mode theme of ECharts version 5.6.0 (when using paramter themev5). Based on Apache ECharts 6.

### 0.6.0 (2025-10-19)
* (MyHomeMyData) Updated Apache ECharts to version 6.0.0 using brand new default theme - please take a look to Readme! Ref. issue #125
* (MyHomeMyData) Added option to dynamically switch dark mode by listening to the system's setting. Based on Apache ECharts 6.
* (MyHomeMyData) Added possibility to add self defined themes. Based on Apache ECharts 6.
* (MyHomeMyData) Extended support for definition of onEvent functions. Now an unlimited number of functions can be defined instead of just one.
* (MyHomeMyData) Fixes for issue #132 (repository checker)

### 0.5.0 (2025-09-17)
* (MyHomeMyData) Changed internal naming of chart's options from 'jsopts' to 'option'. If you're using event driven functions within your charts, you may need to adapt the naming accordingly. Pls. refer to Readme.
* (MyHomeMyData) Migration to ESLint 9. Fixes issues #107 (Migration to ESLint 9) and #114 (findings of repository checker)

### 0.4.1 (2025-05-22)
* (MyHomeMyData) Fix for issue #96 (findings of repository checker)

### 0.4.0 (2025-03-24)
* (MyHomeMyData) Added functionality to support event driven functions within charts, ref. issue #85
* (MyHomeMyData) Added timeout for script as source
* (MyHomeMyData) Added test cases for integration testing

### 0.3.2 (2025-02-09)
* (MyHomeMyData) Added hint for use of flexcharts by adapter tibberLink

### 0.3.1 (2025-02-02)
* (MyHomeMyData) Updated Apache ECharts to version 5.6.0
* (MyHomeMyData) Added support for 3D charts using extension echarts-gl, see issue #68
* (MyHomeMyData) Added templates for tibberLink Adapter

### 0.3.0 (2025-01-08)
* (MyHomeMyData) Enhancement for usage of functions within echart definitions.
* (MyHomeMyData) Fix for issue #56 (findings of repository checker)

### 0.2.0 (2024-11-06)
* (MyHomeMyData) Updated readme. Added sections Templates and Reference.
* (MyHomeMyData) Fix for issue #41 (findings of repository checker)
* (MyHomeMyData) Updated ECharts to version 5.5.1, see issue #40
* (MyHomeMyData) Fix for issue #39 (html warnings)
* (MyHomeMyData) Added option 'refresh' to enable auto update of chart

### 0.1.6 (2024-10-19)
* (MyHomeMyData) Fix for issue #37

### 0.1.5 (2024-10-11)
* (MyHomeMyData) Fixes for issue #36

### 0.1.4 (2024-10-06)
* (MyHomeMyData) Fixes for issue #34
* (MyHomeMyData) Fixes for issue #33

### 0.1.3 (2024-10-05)
* (MyHomeMyData) Fixed issue on windows systems (handling of file path)

### 0.1.2 (2024-10-01)
* (MyHomeMyData) Adapted adapter configurations

### 0.1.1 (2024-10-01)
* (MyHomeMyData) Removed main.js from package.json since it's obsolete

### 0.1.0 (2024-10-01)
* (MyHomeMyData) Use web extension instead of creating own web server. Use http://localhost:8082/flexcharts/echarts.html instead of http://localhost:3100/echarts.html

### 0.0.4 (2024-09-13)
* (MyHomeMyData) Changed default port to 3100 to avoid conflict with camera adapter
* (MyHomeMyData) Check for conflicting port usage during start of instance
* (MyHomeMyData) Added option to select dark mode
* (MyHomeMyData) Fixed missing 404-page

### 0.0.3 (2024-08-25)
* (MyHomeMyData) Disabled sinon should interface
* (MyHomeMyData) Update of npm dependencies

### 0.0.2 (2024-08-05)
* (MyHomeMyData) initial release

## License
MIT License

Copyright (c) 2025 MyHomeMyData <juergen.bonfert@gmail.com>

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

Additional remark:
Source code of [Apache ECharts](https://echarts.apache.org/en/index.html) is used according to [Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0)