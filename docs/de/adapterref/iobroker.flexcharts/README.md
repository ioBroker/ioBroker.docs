---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.flexcharts/README.md
title: ioBroker.flexcharts
hash: nHTlQfdjQGjC5c/NQgW3KY1lc12Tjkz2z5oIwgINA7E=
---
![Logo](../../../en/adapterref/iobroker.flexcharts/admin/flexcharts-icon-small.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.flexcharts.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.flexcharts.svg)
![Anzahl der Installationen](https://iobroker.live/badges/flexcharts-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/flexcharts-stable.svg)
![NPM](https://nodei.co/npm/iobroker.flexcharts.png?downloads=true)
![Test und Freigabe](https://github.com/MyHomeMyData/ioBroker.flexcharts/workflows/Test%20and%20Release/badge.svg)

# ioBroker.flexcharts

## Flexcharts-Adapter für ioBroker

Nutzen Sie die volle Leistungsfähigkeit von [Apache ECharts](https://echarts.apache.org/en/index.html) für ioBroker – ohne die Einschränkungen einer grafischen Konfigurationsoberfläche.

> **Dieser Adapter richtet sich an erfahrene Benutzer.** Es gibt keine Benutzeroberfläche zur Konfiguration von Diagrammen. Diagramme werden vollständig im Code (JavaScript oder Blockly) oder als JSON-Daten definiert, die in einem ioBroker-Status gespeichert sind.

Werfen Sie einen Blick in die [ECharts-Demogalerie](https://echarts.apache.org/examples/en/index.html) , um sich einen Eindruck von den Möglichkeiten zu verschaffen.

Anmerkung: Der Adapter wurde noch nicht unter MacOS getestet.

## Was ist neu in Version 0.7.3?

**Konfigurierbares Timeout für`source=script` Widgets** – vermeidet fälschliche Timeout-Fehler bei rechenintensiven oder koordinierten/seriellen Diagrammkonfigurationen:

- Neu optional`&requestTimeout=<ms>` Dieser Parameter überschreibt die standardmäßige Wartezeit von 2000 ms für das Skript.`onMessage()` Antwort
- Das Standardverhalten bleibt unverändert – relevant nur, wenn tatsächlich ein Timeout auftritt.

## Was ist neu in Version 0.7.2?

**Anfängerfreundliche Vorlagen und ein Schritt-für-Schritt-Kochbuch** – so werden Flexcharts auch für ECharts-Neulinge zugänglicher:

- Zwei neue, anfängerfreundliche Vorlagen: [Vorlage 6](https://github.com/MyHomeMyData/ioBroker.flexcharts/blob/main/templates/flexchartsTemplate6.js) (Energie-Stacked-Bar-Chart mit History-Adapter-Daten) und [Vorlage 7](https://github.com/MyHomeMyData/ioBroker.flexcharts/blob/main/templates/flexchartsTemplate7.js) (reaktives Gauge-Chart mit SSE-Auto-Update).
- Verbesserte Kommentare und STEP-Markierungen in allen bestehenden Vorlagen (1–5)
- Neues [Wiki mit Kochbuch](https://github.com/MyHomeMyData/ioBroker.flexcharts/wiki) : Schritt-für-Schritt-Anleitungen zum Erstellen von Live-Diagrammen von Grund auf – siehe [Weitere Beispiele und Ressourcen](#further-examples-and-resources)

## Was ist neu in Version 0.7.1?

**SSE-Chartaktualisierungen ohne Seitenneuladen** – bei Verwendung`&sse` Das Diagramm wird nun direkt aktualisiert, anstatt die gesamte Seite neu zu laden:

- ECharts-Animationen laufen bei jeder Datenaktualisierung reibungslos.
- Kein Flackern oder Diagrammneuaufbau beim Aktualisieren
- Funktioniert transparent für alle bestehenden`&sse` URLs – keine Änderungen erforderlich

## So funktioniert es

Andere ioBroker-Chartadapter verwenden eine Benutzeroberfläche zur Konfiguration von Chartinhalten und -optionen – was die Ausdrucksmöglichkeiten in der Regel einschränkt. flexcharts verfolgt einen anderen Ansatz:

1. Sie definieren das Diagramm als JSON-Objekt (das ECharts).`option` Variable) — entweder im ioBroker-Status gespeichert oder von einem JavaScript-Skript zurückgegeben.
2. Flexcharts übergibt diese Definition an Apache ECharts im Browser und rendert sie.

Beispiel – ein als Zustandswert gespeichertes gestapeltes Balkendiagramm:

```json
{ "tooltip": {"trigger": "axis","axisPointer": {"type": "shadow"}},
  "legend": {},
  "xAxis": [{"type": "category","data": ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]}],
  "yAxis": [{"type": "value"}],
  "dataZoom": [{"show": true,"start": 0, "end": 100}],
  "series": [
    { "name": "Grid",      "type": "bar", "color": "#a30000", "stack": "Supply",      "data": [8,19,21,50,26,0,36]},
    { "name": "PV",        "type": "bar", "color": "#00a300", "stack": "Supply",      "data": [30,32,20,8,33,21,36]},
    { "name": "Household", "type": "bar", "color": "#0000a3", "stack": "Consumption", "data": [16,12,11,13,14,9,12]},
    { "name": "Heat pump", "type": "bar", "color": "#0000ff", "stack": "Consumption", "data": [22,24,30,20,22,12,25]},
    { "name": "Wallbox",   "type": "bar", "color": "#00a3a3", "stack": "Consumption", "data": [0,15,0,25,23,0,35]}
  ]
}
```

Ergebnis:

![flexcharts\_stacked1](https://github.com/user-attachments/assets/7cf6dfab-ddad-4b2f-a1e1-20fa4b876b4c)

## Voraussetzungen

Flexcharts läuft als Web-Erweiterung. Der [Webadapter](https://www.iobroker.net/#en/adapters/adapterref/iobroker.ws/README.md) (`web.0` ) muss installiert sein und ausgeführt werden. Die folgenden Beispiele gehen vom Standardport 8082 aus.

## Erste Schritte

### Installation überprüfen

Öffnen Sie diese URL in einem Browser (ersetzen Sie`localhost` (mit Ihrer ioBroker-Serveradresse):

`http://localhost:8082/flexcharts/echarts.html?source=state&id=flexcharts.0.info.chart1`

Es sollte ein Demo-Diagramm erscheinen. Wenn dies der Fall ist, funktioniert der Adapter ordnungsgemäß.

### Quelloption 1 – ioBroker-Status

`http://localhost:8082/flexcharts/echarts.html?source=state&id=0_userdata.0.echarts.chart1`

flexcharts liest den Zustand`0_userdata.0.echarts.chart1` und stellt es als EChart dar. Erstellen Sie diesen Zustand, fügen Sie das obige JSON-Beispiel als Wert ein und öffnen Sie dann die URL.

> **Hinweis:** Diese Zeichen sind in Staatskennungen nicht zulässig:`: / ? # [ ] @ ! $ & ' ( ) * + , ; = %`

### Quelloption 2 – JavaScript-Skript

Dies bietet mehr Flexibilität. Flexcharts ruft Ihr Skript bei jeder Anfrage auf, und Ihr Skript gibt die Diagrammdefinition zurück. Zusätzliche URL-Parameter werden an das Skript weitergeleitet.

Es wird ausschließlich **javascript.0** (die erste JS-Adapterinstanz) unterstützt.

Erstelle ein Skript:

```javascript
onMessage('flexcharts', (httpParams, callback) => {
    const myJsonParams = (httpParams.myjsonparams ? JSON.parse(httpParams.myjsonparams) : {});
    console.log(`httpParams = ${JSON.stringify(httpParams)}`);
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
            {name: "Grid",      type: "bar", color: "#a30000", stack: "Supply",      data: [8,19,21,50,26,0,36]},
            {name: "PV",        type: "bar", color: "#00a300", stack: "Supply",      data: [30,32,20,8,33,21,36]},
            {name: "Household", type: "bar", color: "#0000a3", stack: "Consumption", data: [16,12,11,13,14,9,12]},
            {name: "Heat pump", type: "bar", color: "#0000ff", stack: "Consumption", data: [22,24,30,20,22,12,25]},
            {name: "Wallbox",   type: "bar", color: "#00a3a3", stack: "Consumption", data: [0,15,0,25,23,0,35]}
        ]
    };
    callback(option);
}
```

Starten Sie das Skript und öffnen Sie anschließend Folgendes:`http://localhost:8082/flexcharts/echarts.html?source=script`

Der Standardnachrichtenname lautet:`flexcharts` Um einen anderen Namen zu verwenden, fügen Sie hinzu`&message=mycharts` und anpassen`onMessage('mycharts', ...)` entsprechend.

Zusätzliche URL-Parameter werden an das Skript übergeben.`httpParams` :

`http://localhost:8082/flexcharts/echarts.html?source=script&chart=chart1&myjsonparams={"period":"daily"}`

## Erweiterte Funktionen

### JavaScript-Funktionen innerhalb von Diagrammdefinitionen

Standard`JSON.stringify()` Entfernt Funktionen aus Diagrammdefinitionen. Um Funktionen (z. B. benutzerdefinierte Formatierer) einzubinden, verwenden Sie das npm-Modul.`javascript-stringify` :

1. Hinzufügen`javascript-stringify` zu „Zusätzliche npm-Module“ in der JavaScript-Adapterkonfiguration:![Füge npm-Module hinzu](../../../en/adapterref/iobroker.flexcharts/add_npm_modules.png)
2. In Ihrem Skript:`var strify = require('javascript-stringify');`
3. Ersetzen`callback(option)` mit`callback(strify.stringify(option))` — oder für einen Bundesstaat:`setState('my_chart_id', strify.stringify(option), true)`

Siehe [Vorlage 3](https://github.com/MyHomeMyData/ioBroker.flexcharts/blob/main/templates/flexchartsTemplate3.js) für ein funktionierendes Beispiel mit einem Tooltip-Formatter.

> **Sicherheitshinweis:**`javascript-stringify` Ermöglicht das Übergeben beliebigen Codes an den Browser. Achten Sie darauf, ioBroker bei Verwendung dieses Moduls nicht über das Internet zugänglich zu machen.

### Ereignisgesteuerte dynamische Diagramme

ECharts unterstützt interaktive Diagramme, die sich als Reaktion auf Benutzeraktionen aktualisieren. Sehen Sie sich dieses [ECharts-Beispiel](https://echarts.apache.org/examples/en/editor.html?c=dataset-link) und eine [Bildschirmaufnahme mit flexcharts](https://github.com/MyHomeMyData/ioBroker.flexcharts/blob/main/dynamic_charts_with_flexcharts.mkv) an.

Verwenden Sie ein **Skript als Quelle** und übergeben Sie die Diagrammdefinition und die Ereignisbehandler als Array. [Vorlage 4](https://github.com/MyHomeMyData/ioBroker.flexcharts/blob/main/templates/flexchartsTemplate4.js) veranschaulicht dies. Wichtige Regeln:

- Ereignisbehandler müssen verwenden`myChart.on("event", function(e){ ... })`
- Der Handler muss ein JavaScript-String sein (verwenden Sie konsistente Anführungszeichen oder minimieren Sie ihn mit einem [JS-Minifier](https://www.toptal.com/developers/javascript-minifier) ).
- Übergeben Sie alles als Array:`callback([strify.stringify(option), onEvent1, onEvent2])`

Bei Verwendung eines **Zustands als Quelle** muss der Zustand ein JSON-Array von Zeichenketten sein. Sowohl die Diagrammdefinition als auch die Handler-Zeichenketten müssen gültige JSON-Zeichenketten sein (keine Zeilenumbrüche, nur maskierte Anführungszeichen innerhalb). Beispiel:`flexcharts.0.info.chart3` Die

> **Hinweis für Benutzer, die von Version 0.4.x aktualisieren:** Die Variable für die Diagrammoptionen wurde umbenannt von`jsopts` Zu`option` in Version 0.5.0. Aktualisieren Sie Ihre Ereignisbehandlungsfunktionen entsprechend.

> **Sicherheitshinweis:** Wie oben – ioBroker darf bei der Verwendung nicht mit dem Internet verbunden werden.`javascript-stringify` Die

### Ereignisgesteuerte Diagrammaktualisierung (SSE)

Hinzufügen`&sse` Um automatische Diagrammaktualisierungen per [Server-Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events) zu aktivieren, kann eine beliebige Diagramm-URL hinzugefügt werden. Der Browser hält eine permanente Verbindung zum Server aufrecht und aktualisiert das Diagramm bei jeder Änderung der Quelldaten – ein Neuladen der Seite oder ein Abfrageintervall sind nicht erforderlich. ECharts-Animationen laufen bei jeder Aktualisierung flüssig.

**Mit`source=state` :**

Das Diagramm aktualisiert sich automatisch, sobald der angegebene Zustand erreicht ist.`&id=` Änderungen.

```
http://localhost:8082/flexcharts/echarts.html?source=state&id=0_userdata.0.echarts.chart1&sse
```

**Mit`source=script` :**

Das Skript steuert den Diagramminhalt, daher kann Flexcharts nicht erkennen, welcher Zustand eine Aktualisierung auslöst. Geben Sie dies explizit an mit`&triggerid=<state_id>` :

```
http://localhost:8082/flexcharts/echarts.html?source=script&message=mycharts&triggerid=0_userdata.0.echarts.trigger&sse
```

Das Diagramm wird immer dann aktualisiert, wenn`0_userdata.0.echarts.trigger` Änderungen. Ihr ioBroker-Skript kann diesen Status aktualisieren, um Chart-Aktualisierungen an den Browser zu senden.

**Drossel- und Bestätigungsfilter:**

Standardmäßig (`&sse` Ohne Wert wird das Diagramm höchstens einmal alle 5 Sekunden aktualisiert (Minimum). Geben Sie eine Zahl an, um ein längeres Mindestintervall festzulegen:

```
...&sse=30    → update at most once every 30 seconds
```

Für eine detaillierte Steuerung verwenden Sie ein JSON-Objekt (URL-codiert):

```
...&sse={"refresh":10,"ack":true}   → update only on acknowledged state changes, at most every 10 s
...&sse={"ack":false}               → update only on unacknowledged changes (set by script), default interval
```

Zustandsänderungen während des Drosselungsintervalls gehen nicht verloren – die Aktualisierung wird auf den nächsten zulässigen Zeitpunkt verschoben.

> **Notiz:**`&sse` Und`&refresh` kann kombiniert werden — SSE löst bei Zustandsänderung eine Aktualisierung direkt vor Ort aus.`&refresh` bietet eine Ausweichlösung mit regelmäßigem Seitenneuladen.

### Designs (ECharts v6)

Verwenden Sie den Apache ECharts [Theme Builder](https://echarts.apache.org/en/theme-builder.html) , um Designs zu erstellen oder zu ändern.

**Verwendung eines Skripts als Quelle:**

1. Design aus dem Theme Builder herunterladen → Registerkarte „JSON-Version“ → Kopieren
2. In Ihrem Skript:`const myThemeDefault = <paste here>`
3. Übergeben Sie es als Teil des Callback-Arrays:`callback([JSON.stringify(option), ['default', JSON.stringify(myThemeDefault)]])`

[Vorlage 5](https://github.com/MyHomeMyData/ioBroker.flexcharts/blob/main/templates/flexchartsTemplate5.js) zeigt den kompletten Designwechsel inklusive Dunkelmodus.

**Verwendung eines Bundesstaates als Quelle:**

Der Statuswert muss ein Array sein:`[<stringified chart>, ['default', <stringified theme>]]` . Sehen`flexcharts.0.info.chart4` für ein praktisches Beispiel.

Andere Themen als`default` Und`dark` erfordern eine explizite Aktivierung über`myChart.setTheme(<name>)` innerhalb einer ereignisgesteuerten Funktion.

**Schnell ausprobieren:**

```
callback([JSON.stringify(option), ['default', '{"title":{"left":"left"},"color":["#ff715e","#ffaf51","#ffee51","#8c6ac4","#715c87"],"backgroundColor":"rgba(64,64,64,0.5)"}']]);
```

## Vorlagen

| Vorlage                                                                                                     | Beschreibung                                                                                                                                        |
| ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Vorlage 1](https://github.com/MyHomeMyData/ioBroker.flexcharts/blob/main/templates/flexchartsTemplate1.js) | Diagramm mit Daten aus dem Verlaufsadapter                                                                                                          |
| [Vorlage2](https://github.com/MyHomeMyData/ioBroker.flexcharts/blob/main/templates/flexchartsTemplate2.js)  | Einfaches Liniendiagramm mit Daten aus dem Verlaufsadapter – reaktive SSE-Aktualisierungen                                                          |
| [Vorlage 3](https://github.com/MyHomeMyData/ioBroker.flexcharts/blob/main/templates/flexchartsTemplate3.js) | Gestapeltes Balkendiagramm mit Funktion in der Diagrammdefinition                                                                                   |
| [Vorlage 4](https://github.com/MyHomeMyData/ioBroker.flexcharts/blob/main/templates/flexchartsTemplate4.js) | Ereignisgesteuertes dynamisches Diagramm                                                                                                            |
| [Vorlage 5](https://github.com/MyHomeMyData/ioBroker.flexcharts/blob/main/templates/flexchartsTemplate5.js) | Benutzerdefinierte Designs mit dynamischer Umschaltung des Dunkelmodus                                                                              |
| [Vorlage 6](https://github.com/MyHomeMyData/ioBroker.flexcharts/blob/main/templates/flexchartsTemplate6.js) | **Anfängerfreundlich:** Energieübersicht – gestapeltes Balkendiagramm mit Daten aus dem Verlaufsadapter                                             |
| [Vorlage 7](https://github.com/MyHomeMyData/ioBroker.flexcharts/blob/main/templates/flexchartsTemplate7.js) | **Anfängerfreundlich:** Anzeigediagramm mit aktuellen Statuswerten (Batterie, PV, Wärmepumpe, Sensoren) – reaktive SSE-Updates                      |
| [Vorlage 8](https://github.com/MyHomeMyData/ioBroker.flexcharts/blob/main/templates/flexchartsTemplate8.js) | Kartendiagramm – Tortendiagramme, die über eine geografische Karte (Island) gelegt wurden, unter Verwendung einer benutzerdefinierten GeoJSON-Karte |

## Weitere Beispiele und Ressourcen

### Kochbuch (Schritt-für-Schritt-Anleitungen)

Neu bei Flexcharts oder ECharts? Das **[Flexcharts-Wiki](https://github.com/MyHomeMyData/ioBroker.flexcharts/wiki)** bietet Ihnen Schritt-für-Schritt-Anleitungen, die Sie von einem statischen Diagramm zu einem vollständig interaktiven Dashboard führen:

| Artikel                                                                                                                          | Was Sie lernen                                                                                                                            |
| -------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| [A1 — Gestapeltes Flächendiagramm](https://github.com/MyHomeMyData/ioBroker.flexcharts/wiki/Cookbook-A1-Stacked-Area-Chart)      | Erstellen Sie ein Live-Diagramm mit automatischer SSE-Aktualisierung; verbinden Sie Echtzeitdaten über ein Skript.                        |
| [A2 – Hinzufügen eines Tortendiagramms](https://github.com/MyHomeMyData/ioBroker.flexcharts/wiki/Cookbook-A2-Adding-a-Pie-Chart) | Ergänzen Sie das Diagramm um ein Tortendiagramm, das die wöchentliche Energieverteilung darstellt.                                        |
| [A3 – Interaktive Diagramme](https://github.com/MyHomeMyData/ioBroker.flexcharts/wiki/Cookbook-A3-Interactive-Charts)            | Ereignisgesteuerte Diagramme: Kreisdiagramme reagieren auf Mausbewegungen; gemeinsam genutzte Datensätze, Ereignisbehandler-Zeichenketten |

Weitere Kochbuchartikel sind geplant.

### Beispiele für Adapter von Drittanbietern

- **tibberLink-Adapter:** Siehe Diskussionen [hier](https://github.com/MyHomeMyData/ioBroker.flexcharts/discussions/67) und [hier](https://github.com/MyHomeMyData/ioBroker.flexcharts/discussions/66) – tibberLink verwendet außerdem flexcharts nativ, siehe die zugehörige [Dokumentation.](https://github.com/hombach/ioBroker.tibberlink?tab=readme-ov-file#2-using-the-flexcharts-or-fully-featured-echarts-adapter-with-json)
- **sun2000-Adapter:** Native [Integration von Flexcharts](https://github.com/bolliy/ioBroker.sun2000/wiki/Statistk-\(statistics\)) verfügbar
- **Viessmann E3-Serie** (z. B. Wärmepumpe Vitocal 250): [Diskussion auf ioBroker.e3oncan](https://github.com/MyHomeMyData/ioBroker.e3oncan/discussions/35)

## Referenz

Basis-URL:`http://localhost:8082/flexcharts/echarts.html`

| Parameter              | Werte                             | Beschreibung                                                                                                                                                                                                                                                                                                        |
| ---------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `source=state`         |                                   | Liest die Chartdefinition aus einem ioBroker-Status. Erforderlich`id` Die                                                                                                                                                                                                                                           |
| `source=script`        |                                   | Rufen Sie ein JavaScript-Skript auf über`onMessage()` Die                                                                                                                                                                                                                                                           |
| `id=<state_id>`        |                                   | Staatlicher Ausweis zum Lesen (erforderlich für`source=state` ).                                                                                                                                                                                                                                                    |
| `message=<name>`       | Standard:`flexcharts`             | Nachrichtenname für`onMessage()` im Skript.                                                                                                                                                                                                                                                                         |
| `darkmode`             | `on` \|`off` \|`auto`             | Dunkelmodus:`on` /kein Wert = immer dunkel,`off` = immer Licht`auto` = Systemeinstellungen befolgen.                                                                                                                                                                                                                |
| `refresh=<n>`          | Sekunden, min. 5, Standardwert 60 | Automatisches Neuladeintervall. Nur aktiv, wenn der Parameter vorhanden ist.                                                                                                                                                                                                                                        |
| `sse`                  | kein Wert \|`<n>` \|`<json>`      | Aktivieren Sie ereignisgesteuerte Diagrammaktualisierungen über Server-Sent Events. Kein Wert oder`&sse=5` Aktualisierung höchstens alle 5 Sekunden (Minimum).`&sse=<n>` : Mindestanzahl an Sekunden zwischen Aktualisierungen.`&sse={"refresh":<n>,"ack":true\|false}` Zusätzlich nach Bestätigungsstatus filtern. |
| `triggerid=<state_id>` |                                   | Staatliche ID, auf Änderungen beim Verwenden zu achten`source=script` mit`&sse` Die                                                                                                                                                                                                                                 |
| `themev5`              |                                   | Verwenden Sie die Standard- und Dunkelmodus-Themes von Apache ECharts v5 anstelle der Standard-Themes von v6.                                                                                                                                                                                                       |
| `<custom>=<value>`     |                                   | Alle zusätzlichen Parameter werden an das Skript weitergeleitet in`httpParams` Die                                                                                                                                                                                                                                  |
| `requestTimeout=<n>`   | ms, Standardwert 2000             | Zeitüberschreitung für`source=script` Warten auf die Antwort des Skripts. Erhöhen Sie den Wert, wenn die Berechnung des Skripts (oder einer gemeinsam genutzten/seriellen Warteschlange) regelmäßig länger als der Standardwert dauert.                                                                             |

## Spenden

<a href="https://www.paypal.com/donate/?hosted_button_id=WKY6JPYJNCCCQ"><img src="https://raw.githubusercontent.com/MyHomeMyData/ioBroker.flexcharts/main/admin/bluePayPal.svg" height="40"></a>\
&#x20;Wenn dir dieses Projekt gefallen hat – oder du einfach nur großzügig sein möchtest –, spendiere mir doch ein Bier. Prost! 😉

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.7.3 (2026-08-24)
* (MyHomeMyData) Added optional `requestTimeout` parameter for `source=script` widgets to configure the timeout waiting on the script's response (default 2000 ms, unchanged). Ref. issue #205

### 0.7.2 (2026-05-07)
* (MyHomeMyData) Added beginner-friendly templates 6 (energy stacked bar chart with history adapter) and 7 (reactive gauge chart with SSE auto-update)
* (MyHomeMyData) Improved comments and STEP markers in templates 1–5
* (MyHomeMyData) Added Wiki with Cookbook articles A1–A3 (step-by-step guides for building live charts)

### 0.7.1 (2026-05-05)
* (MyHomeMyData) Adapter requires node.js >= 22 now
* (MyHomeMyData) SSE now updates chart in place via setOption instead of reloading the page — ECharts animations work correctly on data updates

### 0.7.0 (2026-04-15)
* (MyHomeMyData) Implemented SSE (Server-Sent Events) to support event driven updating of chart

### 0.6.2 (2026-04-13)
* (MyHomeMyData) Restructuring of code for better readability and improved performance.
* (MyHomeMyData) Restructuring of Readme for better readability.

### Older versions

Older changelog entries are available in [CHANGELOG_OLD.md](https://github.com/MyHomeMyData/ioBroker.flexcharts/blob/main/CHANGELOG_OLD.md).

## License
MIT License

Copyright (c) 2024-2026 MyHomeMyData <juergen.bonfert@gmail.com>

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