---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.flexcharts/README.md
title: ioBroker.flexcharts
hash: mJ2FClZO2G/KuGclhJkGf7D9M9RO3qbL1GzB/mhIDhs=
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
Es gibt mehrere Adapter, um Diagramme in ioBroker anzuzeigen. Soweit ich weiß, verwenden alle eine Benutzeroberfläche, um Inhalt und Optionen der Diagramme zu konfigurieren. Normalerweise können nicht alle Funktionen des verwendeten grafischen Subsystems auf diese Weise genutzt werden. Beispielsweise ist es nicht möglich, voll funktionsfähige gestapelte Diagramme mit dem eChart-Adapter anzuzeigen.

Dieser Adapter verwendet einen anderen Ansatz. Er bietet fast den kompletten Funktionsumfang von [Apache ECharts](https://echarts.apache.org/en/index.html) zu ioBroker. Schauen Sie sich die [Demo-Charts an](https://echarts.apache.org/examples/en/index.html).

Hinweis: Der Adapter wurde noch nicht unter MacOS getestet.

**Es gibt keine Benutzeroberfläche zum Konfigurieren von Diagrammen.** Sie müssen das Diagramm selbst definieren, der Adapter kümmert sich um die Visualisierung. Sie müssen die Definition und den Inhalt des Diagramms angeben, indem Sie den Inhalt als JSON-Objekt bereitstellen - in eCharts-Beispielen entspricht dies dem Inhalt der Variable `option`. Hier ist ein Beispiel zur Verdeutlichung. Um ein gestapeltes Diagramm zu erstellen, speichern Sie seine Definition in einem ioBroker-Status (JSON-Format):

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

Eine weitere Möglichkeit zur direkten Übergabe von eCharts-Daten besteht über eine Callback-Funktion innerhalb von Javascript. Details siehe unten.

Um es klar zu sagen: Dieser Ansatz ist nicht dazu gedacht, schnell ein einfaches Diagramm zu erstellen.
Wenn Sie jedoch eine konkrete Idee für ein komplexeres Diagramm im Kopf haben, bietet Flexcharts die Möglichkeit, diese umzusetzen.

# Erste Schritte
### Verwenden des Adapters
Dieser Adapter bietet die Funktionalität einer Web-Erweiterung. Daher ist es zwingend erforderlich, dass [Webadapter](https://www.iobroker.net/#en/adapters/adapterref/iobroker.ws/README.md) (`web.0`) installiert und ausgeführt wird. In dieser Readme-Datei wird davon ausgegangen, dass Sie den Standardport 8082 für den Web-Adapter verwenden.

Wenn der Flexcharts-Adapter aktiv ist, können Sie über http://localhost:8082/flexcharts/echarts.html darauf zugreifen (ersetzen Sie `localhost` durch die Adresse Ihres ioBroker-Servers).

Sie können diese Adresse in iFrame-Widgets von vis oder jarvis oder anderen Visualisierungen verwenden. Natürlich können Sie sie auch direkt in einem Browser-Tab verwenden.

Damit dies funktioniert, müssen Sie zusätzliche Parameter angeben, um dem Adapter die Datenquelle mitzuteilen. Zwei Optionen stehen zur Verfügung:

* `source=state` => Sie stellen Diagrammdaten in einem ioBroker-Status (json) bereit
* `source=script` => Sie stellen Diagrammdaten über ein Skript (Javascript oder Blockly) bereit.

Es sind weitere Optionen verfügbar, siehe [Referenzabschnitt](#reference)

Um die korrekte Installation des Adapters zu überprüfen, verwenden Sie das integrierte Demodiagramm: http://localhost:8082/flexcharts/echarts.html?source=state&id=flexcharts.0.info.chart1

### Verwenden Sie den ioBroker-Status als Quelle für ein eChart
Beispiel: `http://localhost:8082/flexcharts/echarts.html?source=state&id=0_userdata.0.echarts.chart1`

<!-- Would this be better to read: Example: http://localhost:8082/flexcharts/echarts.html?<mark style="background-color: #ffff00">source=state</mark>&<mark style="background-color: #00c000">&id=0_userdata.0.echarts.chart1</mark> -->

Flexcharts wertet den Status `0_userdata.0.echarts.chart1` als Daten für eChart aus. Probieren Sie es aus: Erstellen Sie einen solchen Status und kopieren Sie die JSON-Daten des oben gezeigten Beispiels (`{ "tooltip": { ...`) als Statusinhalt. Greifen Sie dann mit einem Browser auf die angegebene Adresse zu.

### Verwenden Sie Javascript als Quelle für ein eChart
Dies ist etwas komplizierter, aber wesentlich effizienter und flexibler. Sie stellen die Diagrammdaten direkt über Ihr JS-Skript bereit, das dynamisch vom Flexcharts-Adapter aufgerufen wird. Sie können Ihrem Skript zusätzliche Parameter übergeben, indem Sie der HTTP-Adresse Parameter hinzufügen, z. B. `&chart=chart1`. Alle HTTP-Parameter sind im Skript im Objekt `httpParams` verfügbar (siehe Beispiel unten).

Auch hier ist es am besten, es anhand eines Beispiels zu erklären. Erstellen Sie ein Skript mit diesem Inhalt (nur die erste JS-Instanz (**javascript.0**) wird unterstützt, der Name des Skripts spielt keine Rolle):

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

Starten Sie das Skript und rufen Sie in einem Browser diese Adresse auf: `http://localhost:8082/flexcharts/echarts.html?source=script`

<!-- Would this be better to read: Start the script and access this in a browser: http://localhost:8082/flexcharts/echarts.html?<mark style="background-color: #ffff00">source=script</mark> -->

Es sollte dasselbe Diagramm wie im vorherigen Beispiel angezeigt werden.

Sie sollten zwei Protokolleinträge des Beispielskripts erhalten:

```
httpParams = {"message":"mylinechart","source":"script"}
myJsonParams = {}
```

Zusätzliche Parameter können an das Skript übergeben werden und sind dann im Skript in der Variable `httpParams` verfügbar. Versuchen Sie es mit folgendem Befehl: `http://localhost:8082/flexcharts/echarts.html?source=script&chart=chart1&myjsonparams={"period":"daily"}`

Die Protokolleinträge sollten nun folgendermaßen aussehen:

```
httpParams = {"source":"script","chart":"chart1","myjsonparams":"{\"period\":\"daily\"}"}`
myJsonParams = {"period":"daily"}
```

Bitte beachten Sie, dass Sie die Funktion `onMessage()` verwenden müssen, um den Trigger vom Adapter zu empfangen. Der Standardwert für die Nachricht ist `flexcharts`, wie im obigen Beispiel gezeigt. Sie können verschiedene Nachrichten verwenden, indem Sie einen zusätzlichen Parameter angeben. Um beispielsweise die Nachricht `mycharts` zu verwenden, fügen Sie der HTTP-Adresse `&message=mycharts` hinzu: `http://localhost:8082/flexcharts/echarts.html?source=script&message=mycharts`

### Verwenden von Funktionen innerhalb der Diagrammdefinition
Leider funktionieren Funktionsdefinitionen innerhalb der Diagrammdefinition normalerweise nicht, da sie bei Verwendung von `JSON.stringify(option)` oder `callback(option)` gefiltert werden.

Seit V0.3.0 von Flexcharts ist es jedoch möglich, es zum Laufen zu bringen. Es ist jedoch ein wenig mehr Aufwand erforderlich:

* Fügen Sie das NPM-Modul „javascript-stringify“ zur Instanz 0 des JavaScript-Adapters hinzu. Fügen Sie dazu „javascript-stringify“ zu „Zusätzliche NPM-Module“ in der Konfiguration des Adapters hinzu:

![npm-Module hinzufügen](../../../en/adapterref/iobroker.flexcharts/add_npm_modules.png)

* Fügen Sie in Ihrem Skript am Anfang `var strify = require('javascript-stringify');` hinzu.
* Wenn Sie ein Skript als Datenquelle verwenden: Ersetzen Sie in Ihrer `onMessage()`-Funktionalität `callback(option);` durch `callback(strify.stringify(option));` (vorausgesetzt, `option` enthält Ihre Diagrammdefinition).
* Dann verwenden Sie einen Status als Datenquelle: Ersetzen Sie beim Erstellen des Status `setState('my_chart_id', JSON.stringify(option), true);` durch `setState('my_chart_id', strify.stringify(option), true);`
* Das war's. Jetzt werden Funktionen innerhalb von Diagrammdefinitionen korrekt an Flexcharts weitergeleitet.

Probieren Sie es einfach mit [Vorlage3](templates/flexchartsTemplate3.js). Um Tooltip-Daten mit 2 Dezimalstellen anzuzeigen, wird eine Funktion verwendet: `tooltip: {trigger: "axis", valueFormatter: (value) => '. + value.toFixed(2)}`.

Ein Beispiel für die Verwendung der Diagrammdefinition über den Status finden Sie in `flexcharts.0.info.chart2`. Dies zeigt dasselbe Diagramm wie Vorlage3.

Hinweis: Wenn das npm-Modul `javascript-stringify` installiert ist, könnte seine Funktionalität auch von Schadcode ausgenutzt werden (Cross-Site-Scripting). Daher sollte ioBroker bei Verwendung dieses Moduls nicht über das Internet erreichbar sein.

## Vorlagen
Für einige Anwendungsfälle stehen Javascript-Vorlagen zur Verfügung:

* Diagramm mit Daten vom Verlaufsadapter: [template1](templates/flexchartsTemplate1.js)
* einfaches Diagramm für eine Wärmekurve: [template2](templates/flexchartsTemplate2.js)
* einfaches gestapeltes Balkendiagramm mit Funktion innerhalb der Diagrammdefinition: [template3](templates/flexchartsTemplate3.js)
* Für Viessmann-Geräte der E3-Serie ist ein sehr spezifischer Anwendungsfall verfügbar, z. B. Wärmepumpe Vitocal 250. Siehe https://github.com/MyHomeMyData/ioBroker.e3oncan/discussions/35

## Referenz
**ioBroker-Status** als Datenquelle verwenden: `http://localhost:8082/flexcharts/echarts.html?source=state&id=my_state_id`

Verwenden Sie **Javascript** als Datenquelle: `http://localhost:8082/flexcharts/echarts.html?source=script`

### Optionale Argumente
* `&message=my_message` – sendet „my_message“ an JavaScript. Verwenden Sie `onMessage('my_message', (httpParams, callback) => { callback(mychart); })`, um Diagrammdaten bereitzustellen. Standardmäßig `flexcharts`.
* „&darkmode“ – aktiviert die Dunkelmodus-Visualisierung von ECharts.
* `&refresh=number` – aktualisiert das Diagramm alle "number" Sekunden. Der Standardwert beträgt 60 Sekunden. Der minimal zulässige Wert beträgt 5 Sekunden.
* `&user_defined_arguments` – Fügen Sie je nach Bedarf weitere Parameter hinzu. Alle Argumente sind in der Funktion `onMessage()` im Objekt `httpParams` verfügbar. Weitere Einzelheiten finden Sie in den obigen Beispielen und Vorlagen.

### Verwenden von Funktionen innerhalb der Diagrammdefinition
Verfügbar ab Version 0.3.0. Siehe vorherige [Kapitel](#using-functions-within-definition-of-chart)

### Integriertes Demodiagramm
Es ist ein integriertes Demodiagramm verfügbar: http://localhost:8082/flexcharts/echarts.html?source=state&id=flexcharts.0.info.chart1

Dies sollte ein Demodiagramm aufrufen, wenn Flexcharts und Webadapter ausgeführt werden.

**Hinweis:** Ersetzen Sie `localhost` durch die Adresse Ihres ioBroker-Servers. Ersetzen Sie `8082` durch die von Ihrem Web-Adapter verwendete Portnummer.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
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