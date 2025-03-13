---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.flexcharts/README.md
title: ioBroker.flexcharts
hash: 2LBfixSvSCkyVG94QWAOMrwzR0WZOl4Sq6qt3IOsjxw=
---
![Logo](../../../en/adapterref/iobroker.flexcharts/admin/flexcharts-icon-small.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.flexcharts.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.flexcharts.svg)
![Anzahl der Installationen](https://iobroker.live/badges/flexcharts-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/flexcharts-stable.svg)
![NPM](https://nodei.co/npm/iobroker.flexcharts.png?downloads=true)

# IoBroker.flexcharts
**Tests:** ![Testen und Freigeben](https://github.com/MyHomeMyData/ioBroker.flexcharts/workflows/Test%20and%20Release/badge.svg)

## Flexcharts-Adapter für ioBroker
# Grundkonzept
Es gibt verschiedene Adapter zur Anzeige von Diagrammen in ioBroker. Soweit mir bekannt ist, verwenden alle eine Benutzeroberfläche zur Konfiguration von Inhalt und Optionen der Diagramme. Typischerweise können nicht alle Funktionen des verwendeten grafischen Subsystems auf diese Weise genutzt werden. Beispielsweise ist es mit dem eChart-Adapter nicht möglich, voll funktionsfähige gestapelte Diagramme anzuzeigen.

Dieser Adapter verwendet einen anderen Ansatz. Er bietet fast den kompletten Funktionsumfang von [Apache ECharts](https://echarts.apache.org/en/index.html) zu ioBroker. Schauen Sie sich die [Demo-Charts an](https://echarts.apache.org/examples/en/index.html).

Hinweis: Der Adapter wurde noch nicht unter MacOS getestet.

**Es gibt keine Benutzeroberfläche zur Konfiguration von Diagrammen.** Sie müssen das Diagramm selbst definieren, der Adapter übernimmt die Visualisierung. Sie müssen Definition und Inhalt des Diagramms angeben, indem Sie den Inhalt als JSON-Objekt bereitstellen – in eCharts-Beispielen entspricht dies dem Inhalt der Variable `option`. Hier ein Beispiel zur Verdeutlichung. Um ein gestapeltes Diagramm zu erstellen, speichern Sie dessen Definition in einem ioBroker-Status (JSON-Format):

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

Normalerweise verwenden Sie Blockly oder JavaScript, um Inhalte dieses Status zu erstellen und zu aktualisieren.

Es besteht außerdem die Möglichkeit, eCharts-Daten direkt über eine Callback-Funktion in JavaScript zu übergeben. Details dazu finden Sie weiter unten.

Um es klarzustellen: Dieser Ansatz ist nicht dazu gedacht, schnell ein einfaches Diagramm zu erstellen.
Wenn Sie jedoch eine konkrete Idee für ein komplexeres Diagramm haben, bietet Flexcharts die Möglichkeit, diese umzusetzen.

# Erste Schritte
### Verwenden des Adapters
Dieser Adapter dient als Web-Erweiterung. Daher ist die Installation und Ausführung von [Webadapter](https://www.iobroker.net/#en/adapters/adapterref/iobroker.ws/README.md) (`web.0`) zwingend erforderlich. In dieser Readme-Datei wird davon ausgegangen, dass Sie den Standardport 8082 für den Web-Adapter verwenden.

Wenn der Flexcharts-Adapter aktiv ist, können Sie über http://localhost:8082/flexcharts/echarts.html darauf zugreifen (ersetzen Sie `localhost` durch die Adresse Ihres ioBroker-Servers).

Sie können diese Adresse in iFrame-Widgets von vis, jarvis oder anderen Visualisierungen verwenden. Natürlich können Sie sie auch direkt in einem Browser-Tab verwenden.

Damit dies funktioniert, müssen Sie zusätzliche Parameter angeben, um dem Adapter die Datenquelle mitzuteilen. Zwei Optionen stehen zur Verfügung:

* `source=state` => Sie stellen Diagrammdaten in einem ioBroker-Status (json) bereit
* `source=script` => Sie stellen Diagrammdaten über ein Skript (Javascript oder Blockly) bereit

Es stehen weitere Optionen zur Verfügung, siehe [Referenzabschnitt](#reference)

Um die korrekte Installation des Adapters zu überprüfen, verwenden Sie das integrierte Demodiagramm: http://localhost:8082/flexcharts/echarts.html?source=state&id=flexcharts.0.info.chart1

### Verwenden Sie den ioBroker-Status als Quelle für ein eChart
Beispiel: `http://localhost:8082/flexcharts/echarts.html?source=state&id=0_userdata.0.echarts.chart1`

<!-- Would this be better to read: Example: http://localhost:8082/flexcharts/echarts.html?<mark style="background-color: #ffff00">source=state</mark>&<mark style="background-color: #00c000">&id=0_userdata.0.echarts.chart1</mark> -->

Flexcharts wertet den Status `0_userdata.0.echarts.chart1` als Daten für eChart aus. Probieren Sie es aus: Erstellen Sie einen solchen Status und kopieren Sie die JSON-Daten des oben gezeigten Beispiels (`{ "tooltip": { ...`) als Statusinhalt. Greifen Sie anschließend mit einem Browser auf die angegebene Adresse zu.

Die folgenden Zeichen dürfen in der Status-ID nicht verwendet werden: `: / ? # [ ] @ ! $ & ' ( ) * + , ; = %`

### Verwenden Sie Javascript als Quelle für ein eChart
Dies ist etwas aufwendiger, aber deutlich effizienter und flexibler. Die Diagrammdaten werden direkt über Ihr JS-Skript bereitgestellt, das dynamisch vom Flexcharts-Adapter aufgerufen wird. Sie können Ihrem Skript zusätzliche Parameter übergeben, indem Sie Parameter an die HTTP-Adresse anhängen, z. B. `&chart=chart1`. Alle HTTP-Parameter sind im Skript im Objekt `httpParams` verfügbar (siehe Beispiel unten).

Auch hier ist es am besten, dies anhand eines Beispiels zu erklären. Erstellen Sie ein Skript mit diesem Inhalt (nur die erste JS-Instanz (**javascript.0**) wird unterstützt, der Name des Skripts spielt keine Rolle):

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

Sie sollten zwei Protokolleinträge des Beispielskripts erhalten:

```
httpParams = {"message":"mylinechart","source":"script"}
myJsonParams = {}
```

Zusätzliche Parameter können an das Skript übergeben werden und stehen dort in der Variable `httpParams` zur Verfügung. Versuchen Sie dazu folgenden Befehl: `http://localhost:8082/flexcharts/echarts.html?source=script&chart=chart1&myjsonparams={"period":"daily"}`

Die Protokolleinträge sollten nun folgendermaßen aussehen:

```
httpParams = {"source":"script","chart":"chart1","myjsonparams":"{\"period\":\"daily\"}"}`
myJsonParams = {"period":"daily"}
```

Bitte beachten Sie, dass Sie die Funktion `onMessage()` verwenden müssen, um den Trigger vom Adapter zu empfangen. Der Standardwert für die Nachricht ist `flexcharts`, wie im obigen Beispiel gezeigt. Sie können verschiedene Nachrichten verwenden, indem Sie einen zusätzlichen Parameter angeben. Beispielsweise fügen Sie für die Nachricht `mycharts` `&message=mycharts` zur HTTP-Adresse `http://localhost:8082/flexcharts/echarts.html?source=script&message=mycharts` hinzu.

### Verwenden von Funktionen innerhalb der Diagrammdefinition
Leider funktionieren Funktionsdefinitionen innerhalb der Diagrammdefinition normalerweise nicht, da sie bei Verwendung von `JSON.stringify(option)` oder `callback(option)` gefiltert werden.

Seit V0.3.0 von Flexcharts ist es jedoch möglich, es zum Laufen zu bringen. Es ist jedoch etwas mehr Aufwand erforderlich:

* Fügen Sie das NPM-Modul „javascript-stringify“ zur Instanz 0 des JavaScript-Adapters hinzu. Fügen Sie dazu „javascript-stringify“ in der Adapterkonfiguration unter „Zusätzliche NPM-Module“ hinzu:

![npm-Module hinzufügen](../../../en/adapterref/iobroker.flexcharts/add_npm_modules.png)

* Fügen Sie in Ihrem Skript am Anfang `var strify = require('javascript-stringify');` hinzu
* Wenn Sie ein Skript als Datenquelle verwenden: Ersetzen Sie innerhalb Ihrer „onMessage()“-Funktionalität „callback(option);“ durch „callback(strify.stringify(option));“ (vorausgesetzt, „option“ enthält Ihre Diagrammdefinition).
* Dann verwenden Sie einen Status als Datenquelle: Ersetzen Sie beim Erstellen des Status `setState('my_chart_id', JSON.stringify(option), true);` durch `setState('my_chart_id', strify.stringify(option), true);`
* Das war's. Jetzt werden Funktionen innerhalb von Diagrammdefinitionen korrekt an Flexcharts weitergeleitet.

Probieren Sie es einfach mit [Vorlage3](templates/flexchartsTemplate3.js). Eine Funktion wird verwendet, um Daten des Tooltips mit 2 Dezimalstellen anzuzeigen: `tooltip: {trigger: "axis", valueFormatter: (value) => '. + value.toFixed(2)}`.

Ein Beispiel für die Verwendung der Diagrammdefinition über den Status finden Sie in `flexcharts.0.info.chart2`. Es wird dasselbe Diagramm wie in Vorlage 3 angezeigt.

Hinweis: Wenn das npm-Modul `javascript-stringify` installiert ist, könnte dessen Funktionalität auch von Schadcode (Cross-Site-Scripting) ausgenutzt werden. Daher sollte ioBroker bei Verwendung dieses Moduls nicht über das Internet erreichbar sein.

## Vorlagen
Für einige Anwendungsfälle stehen Javascript-Vorlagen zur Verfügung:

* Diagramm mit Daten aus dem Verlaufsadapter: [template1](templates/flexchartsTemplate1.js)
* einfaches Diagramm für eine Wärmekurve: [template2](templates/flexchartsTemplate2.js)
* einfaches gestapeltes Balkendiagramm mithilfe der Funktion innerhalb der Diagrammdefinition: [template3](templates/flexchartsTemplate3.js)
* Diagramm für Daten des **TibberLink-Adapters**: siehe Diskussionen [hier](https://github.com/MyHomeMyData/ioBroker.flexcharts/discussions/67) und [hier](https://github.com/MyHomeMyData/ioBroker.flexcharts/discussions/66)
* Für Viessmann-Geräte der E3-Serie, z. B. die Wärmepumpe Vitocal 250, ist ein sehr spezifischer Anwendungsfall verfügbar. Siehe https://github.com/MyHomeMyData/ioBroker.e3oncan/discussions/35
* Der Adapter [tibberLink](https://github.com/hombach/ioBroker.tibberlink) nutzt Flexcharts als Option zur grafischen Aufbereitung der Daten. Derzeit im Beta-Repo von ioBroker verfügbar. Siehe die [Dokumentation](https://github.com/hombach/ioBroker.tibberlink?tab=readme-ov-file#2-using-the-flexcharts-or-fully-featured-echarts-adapter-with-json).

## Referenz
**ioBroker-Status** als Datenquelle verwenden: `http://localhost:8082/flexcharts/echarts.html?source=state&id=my_state_id`

Verwenden Sie **Javascript** als Datenquelle: `http://localhost:8082/flexcharts/echarts.html?source=script`

### Optionale Argumente
* `&message=my_message` – sendet „my_message“ an JavaScript. Verwenden Sie `onMessage('my_message', (httpParams, callback) => { callback(mychart); })`, um Diagrammdaten bereitzustellen. Standardmäßig wird `flexcharts` verwendet.
* „&darkmode“ – aktiviert die Dunkelmodus-Visualisierung von ECharts.
* `&refresh=number` – aktualisiert das Diagramm alle "number" Sekunden. Standardmäßig 60 Sekunden. Der Mindestwert beträgt 5 Sekunden.
* `&user_defined_arguments` – Fügen Sie je nach Bedarf weitere Parameter hinzu. Alle Argumente sind in der Funktion `onMessage()` im Objekt `httpParams` verfügbar. Weitere Details finden Sie in den obigen Beispielen und Vorlagen.

### Verwenden von Funktionen innerhalb der Diagrammdefinition
Verfügbar ab Version 0.3.0. Siehe vorherige [Kapitel](#using-functions-within-definition-of-chart)

### Integriertes Demo-Diagramm
Es ist ein integriertes Demodiagramm verfügbar: http://localhost:8082/flexcharts/echarts.html?source=state&id=flexcharts.0.info.chart1

Dies sollte ein Demodiagramm aufrufen, wenn Flexcharts und Webadapter ausgeführt werden.

**Hinweis:** Ersetzen Sie `localhost` durch die Adresse Ihres ioBroker-Servers. Ersetzen Sie `8082` durch die von Ihrem Web-Adapter verwendete Portnummer.

## Spenden
<a href="https://www.paypal.com/donate/?hosted_button_id=WKY6JPYJNCCCQ"><img src="https://raw.githubusercontent.com/MyHomeMyData/ioBroker.flexcharts/main/admin/bluePayPal.svg" height="40"></a> Wenn dir dieses Projekt gefallen hat – oder du einfach nur großzügig bist –, überlege doch, mir ein Bier auszugeben. Prost! :Bier:

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
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