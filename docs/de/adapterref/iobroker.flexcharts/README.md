---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.flexcharts/README.md
title: ioBroker.flexcharts
hash: s0KkPOkIdm+ZL3Z7qz3BmdJg5fbyuO0+OQR9sMRvEXE=
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
# Aktuelle Nachrichten
**Apache ECharts hat Version 6.0.0 mit 12 wichtigen Updates veröffentlicht.** Weitere Informationen finden Sie unter https://echarts.apache.org/handbook/en/basics/release-note/v6-feature.

Flexcharts v0.6.0 basiert auf dieser neuen Version und bietet neue Funktionen:

* brandneues Standarddesign
* Möglichkeit zur Übergabe einer unbegrenzten Anzahl eigener Themen
* Dynamischer Themenwechsel. Ein typisches Szenario besteht darin, auf den Dunkelmodus des Systems zu hören und das Diagrammthema dynamisch anzupassen (zum Aktivieren den HTTP-Parameter „&darkmode=auto“ hinzufügen).
* neue Diagrammtypen
* Möglichkeit, eine unbegrenzte Anzahl ereignisgesteuerter Funktionen zu übergeben

**Anmerkung:** Sie können das **ECharts v5-Standarddesign** beibehalten, indem Sie einfach den HTTP-Parameter `&themev5` hinzufügen, z. B. `http://localhost:8082/flexcharts/echarts.html?source=state&id=flexcharts.0.info.chart1&themev5`

# Grundkonzept
Es gibt verschiedene Adapter zur Anzeige von Diagrammen in ioBroker. Soweit mir bekannt ist, verwenden alle Adapter eine Benutzeroberfläche zur Konfiguration von Inhalt und Optionen der Diagramme. Typischerweise können nicht alle Funktionen des verwendeten grafischen Subsystems auf diese Weise genutzt werden. Beispielsweise ist es mit dem eChart-Adapter nicht möglich, voll funktionsfähige gestapelte Diagramme anzuzeigen.

Dieser Adapter verwendet einen anderen Ansatz. Er bietet fast den kompletten Funktionsumfang von [Apache ECharts](https://echarts.apache.org/en/index.html) zu ioBroker. Werfen Sie einen Blick auf die [Demo-Charts](https://echarts.apache.org/examples/en/index.html).

Hinweis: Der Adapter wurde noch nicht unter MacOS getestet.

**Es gibt keine Benutzeroberfläche zum Konfigurieren von Diagrammen.** Sie müssen das Diagramm selbst definieren, der Adapter kümmert sich um die Visualisierung. Sie müssen Definition und Inhalt des Diagramms bereitstellen, indem Sie den Inhalt als JSON-Objekt bereitstellen – in eCharts-Beispielen entspricht dies dem Inhalt der Variable `option`. Hier ein Beispiel zur Verdeutlichung. Um ein gestapeltes Diagramm zu erstellen, speichern Sie dessen Definition in einem ioBroker-Status (JSON-Format):

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

Es besteht eine weitere Möglichkeit, eCharts-Daten direkt per Callback-Funktion innerhalb von Javascript zu übergeben. Details siehe unten.

Um es klarzustellen: Dieser Ansatz ist nicht dazu gedacht, schnell ein einfaches Diagramm zu erstellen.
Wenn Sie jedoch eine konkrete Idee für ein komplexeres Diagramm haben, bietet Flexcharts die Möglichkeit, diese umzusetzen.

# Erste Schritte
### Verwenden des Adapters
Dieser Adapter dient als Web-Erweiterung. Daher ist die Installation und Ausführung von [Webadapter](https://www.iobroker.net/#en/adapters/adapterref/iobroker.ws/README.md) (`web.0`) zwingend erforderlich. In dieser Readme wird davon ausgegangen, dass Sie den Standardport 8082 für den Web-Adapter verwenden.

Wenn der Flexcharts-Adapter aktiv ist, können Sie über http://localhost:8082/flexcharts/echarts.html darauf zugreifen (ersetzen Sie `localhost` durch die Adresse Ihres ioBroker-Servers).

Sie können diese Adresse in iFrame-Widgets von vis oder jarvis oder anderen Visualisierungen verwenden. Natürlich können Sie sie auch direkt in einem Browser-Tab verwenden.

Damit dies funktioniert, müssen Sie zusätzliche Parameter angeben, um dem Adapter die Datenquelle mitzuteilen. Zwei Optionen stehen zur Verfügung:

* `source=state` => Sie stellen Diagrammdaten in einem ioBroker-Status (json) bereit
* `source=script` => Sie stellen Diagrammdaten über ein Skript (Javascript oder Blockly) bereit

Es sind weitere Optionen verfügbar, siehe [Referenzabschnitt](#reference)

Um die korrekte Installation des Adapters zu überprüfen, verwenden Sie das integrierte Demodiagramm: http://localhost:8082/flexcharts/echarts.html?source=state&id=flexcharts.0.info.chart1

### Verwenden Sie den ioBroker-Status als Quelle für ein eChart
Beispiel: `http://localhost:8082/flexcharts/echarts.html?source=state&id=0_userdata.0.echarts.chart1`

<!-- Would this be better to read: Example: http://localhost:8082/flexcharts/echarts.html?<mark style="background-color: #ffff00">source=state</mark>&<mark style="background-color: #00c000">&id=0_userdata.0.echarts.chart1</mark> -->

Flexcharts wertet den Status `0_userdata.0.echarts.chart1` als Daten für eChart aus. Probieren Sie es aus: Erstellen Sie einen solchen Status und kopieren Sie die JSON-Daten des oben gezeigten Beispiels (`{ "tooltip": { ...`) als Statusinhalt. Greifen Sie dann mit einem Browser auf die angegebene Adresse zu.

Die folgenden Zeichen dürfen in der Status-ID nicht verwendet werden: `: / ? # [ ] @ ! $ & ' ( ) * + , ; = %`

### Verwenden Sie Javascript als Quelle für ein eChart
Dies ist zwar etwas aufwendiger, aber deutlich effizienter und flexibler. Die Diagrammdaten werden direkt über das JS-Skript bereitgestellt, das dynamisch vom Flexcharts-Adapter aufgerufen wird. Zusätzliche Parameter können an das Skript übergeben werden, indem Parameter an die HTTP-Adresse angehängt werden, z. B. `&chart=chart1`. Alle HTTP-Parameter sind im Skript im Objekt `httpParams` verfügbar (siehe Beispiel unten).

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

Bitte beachten Sie, dass Sie die Funktion `onMessage()` verwenden müssen, um den Trigger vom Adapter zu empfangen. Der Standardwert für die Nachricht ist `flexcharts`, wie im obigen Beispiel gezeigt. Sie können verschiedene Nachrichten verwenden, indem Sie einen zusätzlichen Parameter angeben. Um beispielsweise die Nachricht `mycharts` zu verwenden, fügen Sie `&message=mycharts` zur http-Adresse hinzu: `http://localhost:8082/flexcharts/echarts.html?source=script&message=mycharts`

### Verwenden von Funktionen innerhalb der Diagrammdefinition
Leider funktionieren Funktionsdefinitionen innerhalb der Diagrammdefinition normalerweise nicht, da sie bei Verwendung von `JSON.stringify(option)` oder `callback(option)` gefiltert werden.

Seit V0.3.0 von Flexcharts ist es jedoch möglich, es zum Laufen zu bringen. Es ist jedoch etwas mehr Aufwand erforderlich:

* Fügen Sie das NPM-Modul „javascript-stringify“ zur Instanz 0 des JavaScript-Adapters hinzu. Fügen Sie dazu „javascript-stringify“ in der Adapterkonfiguration unter „Zusätzliche NPM-Module“ hinzu:

![npm-Module hinzufügen](../../../en/adapterref/iobroker.flexcharts/add_npm_modules.png)

* Fügen Sie in Ihrem Skript am Anfang `var strify = require('javascript-stringify');` hinzu
* Wenn Sie ein Skript als Datenquelle verwenden: Ersetzen Sie in Ihrer „onMessage()“-Funktionalität „callback(option);“ durch „callback(strify.stringify(option));“ (vorausgesetzt, „option“ enthält Ihre Diagrammdefinition).
* Dann einen Status als Datenquelle verwenden: Beim Erstellen des Status ersetzen Sie `setState('my_chart_id', JSON.stringify(option), true);` durch `setState('my_chart_id', strify.stringify(option), true);`
* Das war's. Jetzt werden Funktionen innerhalb von Diagrammdefinitionen korrekt an Flexcharts weitergeleitet.

Probieren Sie es einfach mit [Vorlage3](templates/flexchartsTemplate3.js). Es wird eine Funktion verwendet, um Daten des Tooltips mit 2 Dezimalstellen anzuzeigen: `tooltip: {trigger: "axis", valueFormatter: (value) => '. + value.toFixed(2)}`.

Ein Beispiel für die Verwendung der Diagrammdefinition über den Status finden Sie in `flexcharts.0.info.chart2`. Hier wird dasselbe Diagramm wie in Vorlage 3 angezeigt.

Hinweis: Wenn das npm-Modul `javascript-stringify` installiert ist, kann dessen Funktionalität auch von Schadcode (Cross-Site-Scripting) ausgenutzt werden. Daher sollte ioBroker bei Verwendung dieses Moduls nicht über das Internet erreichbar sein.

### Verwenden ereignisgesteuerter Funktionen zum Erstellen dynamischer Diagramme
Apache ECharts unterstützt dynamisch veränderliche Diagramme. Sehen Sie sich das hier an: [Beispiel](https://echarts.apache.org/examples/en/editor.html?c=dataset-link). Wenn die Maus über einen Datenpunkt des Liniendiagramms bewegt wird, wird das Kreisdiagramm entsprechend aktualisiert.
Hier ist eine Bildschirmaufnahme dieses von Flexcharts gesteuerten Diagramms: [dynamisch änderndes Diagramm](dynamic_charts_with_flexcharts.mkv)

**Wichtiger Hinweis** zum Update auf Version **0.5.0** von Flexcharts: Wenn Sie diese Funktion nutzen und die Optionen des Diagramms innerhalb Ihrer ereignisgesteuerten Funktion dynamisch ändern möchten, mussten Sie die Option über die Variable `jsopts` ansprechen. Ab Version 0.5.0 und höher wurde diese in `option` geändert. Bitte passen Sie die Benennung innerhalb Ihrer Funktion entsprechend an, d. h. ersetzen Sie `jsopts` durch `option`.

Um ereignisgesteuerte Funktionen für eigene Diagramme zu nutzen, empfehle ich die Verwendung eines **Skripts als Quelle**. [Vorlage 4](templates/flexchartsTemplate4.js) demonstriert die Implementierung. Bitte beachten Sie Folgendes:

* Um das Diagramm dynamisch zu gestalten, müssen Sie Funktionen zur Verarbeitung von Ereignissen innerhalb des Diagramms definieren. Dies geschieht durch die Definition von Funktionen wie `myChart.on("event",function(e){ ... });`
* Es ist zwingend erforderlich, jede dieser Funktionen mit `myChart.on()` zu benennen.
* Um die Funktionsdefinition an Flexcharts zu übergeben, muss sie in einen **Javascript-String** konvertiert werden. Dies kann durch konsequentes Setzen von Anführungszeichen (`"`) innerhalb der Funktion und anschließendes Einschließen in Apostrophe (`'`) erfolgen – oder umgekehrt. Sie können einen Kompaktor, z. B. [diesen](https://www.toptal.com/developers/javascript-minifier), verwenden, um den benötigten Platz zu reduzieren.
* Abschließend müssen Sie alle Teile, die Diagrammdefinition und die Definition der Ereignisfunktion(en), als **Array von Javascript-Strings** über den Rückruf bereitstellen. In Vorlage 4 geschieht dies als `callback([strify.stringify(option), onEvent]);`, wobei `option` die Diagrammdefinition und `onEvent` die Definition der Ereignisfunktion als Javascript-String enthält. Wenn Sie mehr als eine Funktion definieren, können Sie diese in den String `onEvent` aufnehmen oder als zusätzliches Array-Element hinzufügen, z. B. `callback([strify.stringify(option), onEvent1, onEvent2, onEvent3]);`. Die Anzahl der Funktionsdefinitionen ist nicht begrenzt.
* Um die Definition des Diagramms in eine Zeichenfolge zu konvertieren („Option“), müssen Sie „javascript-stringify“ verwenden, wie im vorherigen Kapitel beschrieben.

Hinweis: Wenn das npm-Modul `javascript-stringify` installiert ist, kann dessen Funktionalität auch von Schadcode (Cross-Site-Scripting) ausgenutzt werden. Daher sollte ioBroker bei Verwendung dieses Moduls nicht über das Internet erreichbar sein.

Es ist auch möglich, diese Funktion mit einem **Bundesstaat als Datenquelle** zu verwenden. Allerdings ist es noch schwieriger:

* Der Status muss als **Array von JSON-Strings** erstellt werden. Die beiden Elemente des Arrays bestehen aus der Definition des Diagramms und der Definition der Ereignisfunktion(en).
* Nun müssen beide Strings gültige **JSON-Strings** sein. Dies unterscheidet sich von Javascript-Strings und bringt zusätzliche Einschränkungen mit sich:
* Um einen String einzuschließen, müssen Anführungszeichen verwendet werden. Daher sind innerhalb des Strings nur Apostrophe oder maskierte Anführungszeichen (`\"`) zulässig.
* Innerhalb eines Strings ist keine neue Zeile zulässig.
* Es ist eine gute Idee, die Gültigkeit des Arrays mithilfe eines JSON-Validators sicherzustellen, z. B. [diesen](https://jsonformatter.curiousconcept.com/#).
* Natürlich möchten Sie die Daten des Diagramms manipulieren. Die Daten sind jedoch Teil der Diagrammdefinition. Daher müssen Sie das Array der JSON-Strings mit Javascript lesen und schreiben. Daher empfehle ich, wie oben beschrieben ein Skript als Datenquelle zu verwenden.
* Ein Beispiel ist jedoch im Info-Teil von Flexcharts verfügbar: `flexcharts.0.info.chart3`. Zur Anzeige in einem Browser verwenden Sie `http://localhost:8082/flexcharts/echarts.html?source=state&id=flexcharts.0.info.chart3`

### Arbeiten mit Apache EChart-Themen (v6-Funktion)
ECharts bietet verschiedene Optionen zur individuellen Gestaltung von Diagrammen. Eine leistungsstarke Methode ist die Verwendung von Designs. Standardmäßig wird im Normalmodus das Design „default“ und im Dunkelmodus das Design „dark“ verwendet. Diese Designs sind vordefiniert, können aber angepasst werden.

Flexcharts Version 0.6.0 und höher unterstützt die Definition von Designs. Darüber hinaus ist in Kombination mit der Definition ereignisgesteuerter Funktionen – siehe vorheriges Kapitel – ein dynamischer Wechsel zwischen Designs möglich.

Designs lassen sich am besten mit Apache ECharts [Themen-Builder](https://echarts.apache.org/en/theme-builder.html) erstellen oder anpassen.

Um ein Design an Flexcharts zu übergeben, indem Sie ein **Skript als Quelle** verwenden, gehen Sie folgendermaßen vor:

* Wählen Sie auf der Site „Theme Builder“ ein Thema aus oder ändern Sie es und drücken Sie dann die Schaltfläche „Herunterladen“.
* Wählen Sie die Registerkarte „JSON-Version“ und kopieren Sie den Inhalt in die Zwischenablage, indem Sie auf die Schaltfläche „Kopieren“ klicken
* Fügen Sie etwas wie `const myThemeDefault = ` zu Ihrem Skript hinzu und fügen Sie die Zwischenablage dahinter ein
* Übergeben Sie das Design mithilfe eines Arrays an Flexcharts, wie für ereignisgesteuerte Funktionen gezeigt: `callback([JSON.stringify(option), ['default', JSON.stringify(myThemeDefault)]]);`
* Bitte beachten: Sie müssen das Design als Array von Zeichenfolgen übergeben: `[<Name des Designs>, <Zeichenfolgendefinition des Designs>]`

[Vorlage 5](templates/flexchartsTemplate5.js) demonstriert die Implementierung der Übergabe neuer Themes für den Standardmodus (Theme 'default') und den Dunkelmodus (Theme 'dark'). Die dynamische Umschaltung zwischen beiden Themes basierend auf den Systemeinstellungen ist aktiviert.

So verwenden Sie einen **Status als Quelle** zum Übergeben von Themen:

* Erstellen Sie den Status mit dem Format „Array“.
* Fügen Sie die Diagrammdefinition als erstes Element des Arrays hinzu
* Bereiten Sie das/die Design(s) als stringifiziertes JSON-Objekt vor. Sie verwenden einen JSON-Formatierer, z. B. https://jsonformatter.curiousconcept.com/ mit der Vorlage „compact“, um das JSON-Objekt in einen String zu komprimieren.
* füge das Thema als 2. Element zum Status als Array hinzu (siehe oben): `[<Name des Themas>, <Definition des Themas>]`
* Schließlich sollte der Status wie folgt aussehen: „[<stringifizierte Definition des Diagramms>,[‚Standard‘, <stringifizierte Definition des Standarddesigns>]]“.
* Ein Beispiel ist unter „flexcharts.0.info.chart4“ verfügbar (nur auf neu installierten Instanzen).

Die Anzahl der Designdefinitionen ist nicht begrenzt. Um jedoch Designs mit anderen Namen als „Standard“ oder „Dunkel“ zu aktivieren, müssen Sie eine eigene Funktionalität mit dem Ausdruck `myChart.setTheme(<name of theme>);` und Code definieren, um diese unter bestimmten Bedingungen aufzurufen.

**Probieren Sie es aus:**

* Erstellen Sie ein einfaches Diagramm basierend auf [diesem Beispiel](https://echarts.apache.org/examples/en/editor.html?c=area-stack)
* Um Daten an Flexcharts zu übergeben, verwenden Sie `callback(JSON.stringify(option));`
* Nehmen Sie nun einige Änderungen am Standarddesign vor. Ersetzen Sie den Rückruf durch diese Version:

`callback([JSON.stringify(option), ['default', '{"title":{"left":"left"},"color":["#ff715e","#ffaf51","#ffee51","#8c6ac4","#715c87"],"backgroundColor":"rgba(64,64,64,0.5)"}']]);`

* Sie sollten einen linksbündigen Titel und geänderte Farben für die Daten und den Hintergrund sehen.

## Vorlagen
Für einige Anwendungsfälle stehen Javascript-Vorlagen zur Verfügung:

* Diagramm mit Daten aus dem Verlaufsadapter: [template1](templates/flexchartsTemplate1.js)
* einfaches Diagramm für eine Wärmekurve: [template2](templates/flexchartsTemplate2.js)
* einfaches gestapeltes Balkendiagramm mit Funktion innerhalb der Diagrammdefinition: [template3](templates/flexchartsTemplate3.js)
* Diagramm für Daten des **TibberLink-Adapters**: siehe Diskussionen [hier](https://github.com/MyHomeMyData/ioBroker.flexcharts/discussions/67) und [hier](https://github.com/MyHomeMyData/ioBroker.flexcharts/discussions/66)
* Für Viessmann-Geräte der E3-Serie, z. B. Wärmepumpe Vitocal 250, ist ein sehr spezifischer Anwendungsfall verfügbar. Siehe https://github.com/MyHomeMyData/ioBroker.e3oncan/discussions/35
* Implementierung dynamisch wechselnder Diagramme: [template4](templates/flexchartsTemplate4.js)
* Implementierung eigener Designs für den Standard- und Dunkelmodus und Verwendung dynamischer Umschaltung basierend auf den Systemeinstellungen: [template5](templates/flexchartsTemplate5.js)
* Adapter [tibberLink](https://github.com/hombach/ioBroker.tibberlink) nutzt Flexcharts als Option zur grafischen Aufbereitung der Daten. Derzeit im Beta-Repo von ioBroker verfügbar. Siehe die [Dokumentation](https://github.com/hombach/ioBroker.tibberlink?tab=readme-ov-file#2-using-the-flexcharts-or-fully-featured-echarts-adapter-with-json).

## Referenz
**ioBroker-Status** als Datenquelle verwenden: `http://localhost:8082/flexcharts/echarts.html?source=state&id=my_state_id`

Verwenden Sie **Javascript** als Datenquelle: `http://localhost:8082/flexcharts/echarts.html?source=script`

### Optionale Argumente
* `&message=my_message` – sendet „my_message“ an JavaScript. Verwenden Sie `onMessage('my_message', (httpParams, callback) => { callback(mychart); })`, um Diagrammdaten bereitzustellen. Standardmäßig wird „flexcharts“ verwendet.
* `&darkmode[=on|off|auto]` – gibt die Dunkelmodus-Visualisierung von ECharts an: „off“ => Dunkelmodus dauerhaft ausgeschaltet; „on“ oder kein Wert => Dunkelmodus dauerhaft eingeschaltet; „auto“ => achtet auf die Dunkelmodus-Einstellung des Systems.
* `&refresh=number` – aktualisiert das Diagramm alle "number" Sekunden. Der Standardwert beträgt 60 Sekunden. Der Mindestwert beträgt 5 Sekunden.
* `&themev5` – Standarddesign des Diagramms auf Apache ECharts-Design „v5“ festlegen – siehe https://echarts.apache.org/handbook/en/basics/release-note/v6-upgrade-guide/, Kapitel „Standarddesign“
* `&user_defined_arguments` – Fügen Sie je nach Bedarf weitere Parameter hinzu. Alle Argumente sind in der Funktion `onMessage()` im Objekt `httpParams` verfügbar. Weitere Details finden Sie in den obigen Beispielen und Vorlagen.

### Verwenden von Funktionen innerhalb der Diagrammdefinition
Verfügbar ab Version 0.3.0. Siehe vorherige [Kapitel](#using-functions-within-definition-of-chart)

### Integriertes Demodiagramm
Es ist ein integriertes Demodiagramm verfügbar: http://localhost:8082/flexcharts/echarts.html?source=state&id=flexcharts.0.info.chart1

Dies sollte ein Demodiagramm aufrufen, wenn Flexcharts und Webadapter ausgeführt werden.

**Hinweis:** Ersetzen Sie `localhost` durch die Adresse Ihres ioBroker-Servers. Ersetzen Sie `8082` durch die von Ihrem Web-Adapter verwendete Portnummer.

## Spenden
<a href="https://www.paypal.com/donate/?hosted_button_id=WKY6JPYJNCCCQ"><img src="https://raw.githubusercontent.com/MyHomeMyData/ioBroker.flexcharts/main/admin/bluePayPal.svg" height="40"></a> Wenn Ihnen dieses Projekt gefallen hat – oder Sie einfach nur großzügig sind –, geben Sie mir doch ein Bier aus. Prost! :Bier:

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
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