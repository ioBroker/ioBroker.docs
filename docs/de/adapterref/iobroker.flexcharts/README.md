---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.flexcharts/README.md
title: ioBroker.flexcharts
hash: 76o0DZZcuwEOPU4zsiT6wpiWJ2rU5y77tKq5tDIEEts=
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
Nutzen Sie die volle Leistungsfähigkeit von [Apache ECharts](https://echarts.apache.org/en/index.html) für ioBroker – ohne die Einschränkungen einer grafischen Konfigurationsoberfläche.

**Dieser Adapter richtet sich an erfahrene Benutzer.** Es gibt keine Benutzeroberfläche zur Konfiguration von Diagrammen. Diagramme werden vollständig im Code (JavaScript oder Blockly) oder als JSON-Daten definiert, die in einem ioBroker-Status gespeichert sind.

Werfen Sie einen Blick auf [ECharts-Demogalerie](https://echarts.apache.org/examples/en/index.html), um eine Vorstellung davon zu bekommen, was möglich ist.

Anmerkung: Der Adapter wurde noch nicht unter MacOS getestet.

## Was ist neu in Version 0.7.2?
**Anfängerfreundliche Vorlagen und Schritt-für-Schritt-Anleitung** – so werden Flexcharts auch für ECharts-Neulinge zugänglicher:

- Zwei neue, anfängerfreundliche Vorlagen: [template6](templates/flexchartsTemplate6.js) (Energie-Stapelbalken mit Verlaufsadapterdaten) und [template7](templates/flexchartsTemplate7.js) (reaktives Tachometerdiagramm mit SSE-Auto-Update)
- Verbesserte Kommentare und STEP-Markierungen in allen bestehenden Vorlagen (1–5)
- Neues [Wiki mit Kochbuch](https://github.com/MyHomeMyData/ioBroker.flexcharts/wiki): Schritt-für-Schritt-Anleitungen zum Erstellen von Live-Charts von Grund auf — siehe [Weitere Beispiele und Ressourcen](#further-examples-and-resources)

## Was ist neu in Version 0.7.1?
**SSE-Diagrammaktualisierungen ohne Seitenneuladung** — Bei Verwendung von `&sse` wird das Diagramm nun direkt aktualisiert, anstatt die gesamte Seite neu zu laden:

Die ECharts-Animationen laufen bei jeder Datenaktualisierung reibungslos.
- Kein Flackern oder Neuaufbau des Diagramms beim Aktualisieren
- Funktioniert transparent für alle bestehenden `&sse`-URLs – keine Änderungen erforderlich

## Was ist neu in Version 0.7.0?
**Ereignisgesteuerte Diagrammaktualisierung über SSE** – Diagramme werden nun automatisch aktualisiert, wenn sich ihre Quelldaten ändern, ohne dass ein Polling erforderlich ist:

- Fügen Sie `&sse` zu einer Diagramm-URL hinzu, um [Server-Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events) zu aktivieren.
- Mit `source=state`: Das Diagramm wird immer dann aktualisiert, wenn sich der durch `&id=` angegebene Zustand ändert.
- Bei `source=script`: Fügen Sie `&triggerid=<state_id>` hinzu, um anzugeben, welcher Staat die Aktualisierung auslöst.

Beispiel: `http://localhost:8082/flexcharts/echarts.html?source=state&id=0_userdata.0.echarts.chart1&sse`

Die vollständigen Details finden Sie in [Ereignisgesteuerte Diagrammaktualisierung (SSE)](#event-triggered-chart-refresh-sse).

## So funktioniert es
Andere ioBroker-Chartadapter verwenden eine Benutzeroberfläche zur Konfiguration von Chartinhalten und -optionen – was die Ausdrucksmöglichkeiten in der Regel einschränkt. flexcharts verfolgt einen anderen Ansatz:

1. Sie definieren das Diagramm als JSON-Objekt (die ECharts-Variable `option`) – entweder gespeichert in einem ioBroker-Status oder zurückgegeben von einem JavaScript-Skript.
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

![flexcharts_stacked1](https://github.com/user-attachments/assets/7cf6dfab-ddad-4b2f-a1e1-20fa4b876b4c)

## Voraussetzungen
Flexcharts läuft als Web-Erweiterung. Die Bibliothek [Webadapter](https://www.iobroker.net/#en/adapters/adapterref/iobroker.ws/README.md) (`web.0`) muss installiert sein und ausgeführt werden. Die folgenden Beispiele gehen vom Standardport 8082 aus.

## Erste Schritte
### Installation überprüfen
Öffnen Sie diese URL in einem Browser (ersetzen Sie `localhost` durch Ihre ioBroker-Serveradresse):

`http://localhost:8082/flexcharts/echarts.html?source=state&id=flexcharts.0.info.chart1`

Es sollte ein Demo-Diagramm erscheinen. Wenn dies der Fall ist, funktioniert der Adapter ordnungsgemäß.

### Quelloption 1 — ioBroker-Status
`http://localhost:8082/flexcharts/echarts.html?source=state&id=0_userdata.0.echarts.chart1`

Flexcharts liest den Status `0_userdata.0.echarts.chart1` und stellt ihn als EChart dar. Erstellen Sie diesen Status, fügen Sie das obige JSON-Beispiel als Wert ein und öffnen Sie anschließend die URL.

**Hinweis:** Folgende Zeichen sind in Staatskennungen nicht zulässig: `: / ? # [ ] @ ! $ & ' ( ) * + , ; = %`

### Quelloption 2 — JavaScript-Skript
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

Starten Sie das Skript und öffnen Sie anschließend: `http://localhost:8082/flexcharts/echarts.html?source=script`

Der Standardnachrichtenname lautet `flexcharts`. Um einen anderen Namen zu verwenden, fügen Sie `&message=mycharts` hinzu und passen Sie `onMessage('mycharts', ...)` entsprechend an.

Zusätzliche URL-Parameter werden in `httpParams` an das Skript übergeben:

`http://localhost:8082/flexcharts/echarts.html?source=script&chart=chart1&myjsonparams={"period":"daily"}`

## Erweiterte Funktionen
### JavaScript-Funktionen innerhalb von Diagrammdefinitionen
Standardmäßig werden Funktionen aus Diagrammdefinitionen entfernt. Um Funktionen (z. B. benutzerdefinierte Formatierer) einzuschließen, verwenden Sie das npm-Modul `javascript-stringify`:

1. Fügen Sie `javascript-stringify` zu "Zusätzlichen npm-Modulen" in der JavaScript-Adapterkonfiguration hinzu:

   ![Füge npm-Module hinzu](../../../en/adapterref/iobroker.flexcharts/add_npm_modules.png)

2. In Ihrem Skript: `var strify = require('javascript-stringify');`
3. Ersetzen Sie `callback(option)` durch `callback(strify.stringify(option))`

— oder für einen Staat: `setState('my_chart_id', strify.stringify(option), true)`

Siehe [Vorlage 3](templates/flexchartsTemplate3.js) für ein funktionierendes Beispiel mit einem Tooltip-Formatter.

**Sicherheitshinweis:** `javascript-stringify` ermöglicht die Übermittlung beliebigen Codes an den Browser. Setzen Sie ioBroker bei Verwendung dieses Moduls nicht dem Internet aus.

### Ereignisgesteuerte dynamische Diagramme
ECharts unterstützt interaktive Diagramme, die sich als Reaktion auf Benutzeraktionen aktualisieren. Siehe dazu [ECharts-Beispiel](https://echarts.apache.org/examples/en/editor.html?c=dataset-link) und eine Bildschirmaufnahme mit Flexcharts](dynamic_charts_with_flexcharts.mkv).

Verwenden Sie ein **Skript als Quelle** und übergeben Sie die Diagrammdefinition und die Ereignisbehandler als Array. [Vorlage 4](templates/flexchartsTemplate4.js) veranschaulicht dies. Wichtige Regeln:

- Ereignisbehandler müssen `myChart.on("event", function(e){ ... })` verwenden.
- Der Handler muss ein JavaScript-String sein (verwenden Sie konsistente Anführungszeichen oder minimieren Sie ihn mit einem [JS-Minifier](https://www.toptal.com/developers/javascript-minifier)).
- Übergeben Sie alles als Array: `callback([strify.stringify(option), onEvent1, onEvent2])`

Bei Verwendung eines **Zustands als Quelle** muss der Zustand ein JSON-Array von Zeichenketten sein. Sowohl die Diagrammdefinition als auch die Handler-Zeichenketten müssen gültige JSON-Zeichenketten sein (keine Zeilenumbrüche, nur maskierte Anführungszeichen innerhalb der Zeichenkette). Beispiel: `flexcharts.0.info.chart3`.

**Hinweis für Benutzer, die von Version 0.4.x aktualisieren:** Die Variable für die Diagrammoptionen wurde in Version 0.5.0 von `jsopts` in `option` umbenannt. Passen Sie Ihre Ereignisbehandlungsfunktionen entsprechend an.

> **Sicherheitshinweis:** Wie oben – setzen Sie ioBroker nicht dem Internet aus, wenn Sie `javascript-stringify` verwenden.

### Ereignisgesteuerte Diagrammaktualisierung (SSE)
Fügen Sie `&sse` zu einer beliebigen Diagramm-URL hinzu, um automatische Diagrammaktualisierungen über [Server-Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events) zu aktivieren. Der Browser hält eine dauerhafte Verbindung zum Server aufrecht und aktualisiert das Diagramm sofort, sobald sich die Quelldaten ändern – kein Neuladen der Seite, kein Abfrageintervall erforderlich. ECharts-Animationen laufen bei jeder Aktualisierung flüssig.

**Mit `source=state`:**

Das Diagramm wird automatisch aktualisiert, sobald sich der durch `&id=` angegebene Zustand ändert.

```
http://localhost:8082/flexcharts/echarts.html?source=state&id=0_userdata.0.echarts.chart1&sse
```

**Mit `source=script`:**

Das Skript steuert den Diagramminhalt, daher kann Flexcharts nicht erkennen, welcher Zustand eine Aktualisierung auslöst. Geben Sie ihn explizit mit `&triggerid=<state_id>` an:

```
http://localhost:8082/flexcharts/echarts.html?source=script&message=mycharts&triggerid=0_userdata.0.echarts.trigger&sse
```

Das Diagramm wird aktualisiert, sobald sich `0_userdata.0.echarts.trigger` ändert. Ihr ioBroker-Skript kann diesen Status aktualisieren, um Diagrammaktualisierungen an den Browser zu senden.

**Drossel- und Bestätigungsfilter:**

Standardmäßig (`&sse` ohne Wert) wird das Diagramm höchstens einmal alle 5 Sekunden aktualisiert (Minimum). Geben Sie eine Zahl an, um ein längeres Mindestintervall festzulegen:

```
...&sse=30    → update at most once every 30 seconds
```

Für eine detaillierte Steuerung verwenden Sie ein JSON-Objekt (URL-codiert):

```
...&sse={"refresh":10,"ack":true}   → update only on acknowledged state changes, at most every 10 s
...&sse={"ack":false}               → update only on unacknowledged changes (set by script), default interval
```

Zustandsänderungen während des Drosselungsintervalls gehen nicht verloren – die Aktualisierung wird auf den nächsten zulässigen Zeitpunkt verschoben.

> **Hinweis:** `&sse` und `&refresh` können kombiniert werden — SSE löst bei Zustandsänderung eine Aktualisierung direkt vor Ort aus, `&refresh` bietet einen Fallback mit periodischem Seitenneuladen.

### Designs (ECharts v6)
Verwenden Sie Apache ECharts [Theme-Builder](https://echarts.apache.org/en/theme-builder.html), um Designs zu erstellen oder zu ändern.

**Verwendung eines Skripts als Quelle:**

1. Laden Sie das Design über den Theme Builder herunter → Registerkarte „JSON-Version“ → Kopieren
2. In Ihrem Skript: `const myThemeDefault = <hier einfügen>`
3. Übergeben Sie es als Teil des Callback-Arrays:

`callback([JSON.stringify(option), ['default', JSON.stringify(myThemeDefault)]])`

[Vorlage 5](templates/flexchartsTemplate5.js) zeigt die vollständige Themenumschaltung einschließlich des Dunkelmodus an.

**Verwendung eines Bundesstaates als Quelle:**

Der Statuswert muss ein Array sein: `[<stringified chart>, ['default', <stringified theme>]]`.
Ein funktionierendes Beispiel finden Sie unter `flexcharts.0.info.chart4`.

Andere Themen als `default` und `dark` erfordern eine explizite Aktivierung über `myChart.setTheme(<name>)` innerhalb einer ereignisgesteuerten Funktion.

**Schnell ausprobieren:**

```
callback([JSON.stringify(option), ['default', '{"title":{"left":"left"},"color":["#ff715e","#ffaf51","#ffee51","#8c6ac4","#715c87"],"backgroundColor":"rgba(64,64,64,0.5)"}']]);
```

## Vorlagen
| Vorlage | Beschreibung |
|----------|-------------|
| [Vorlage 1](templates/flexchartsTemplate1.js) | Diagramm mit Daten aus dem Verlaufsadapter |
| [Vorlage 3](templates/flexchartsTemplate3.js) | Gestapeltes Balkendiagramm mit Funktion in der Diagrammdefinition |
| [Vorlage 4](templates/flexchartsTemplate4.js) | Ereignisgesteuertes dynamisches Diagramm |
| [Vorlage 5](templates/flexchartsTemplate5.js) | Benutzerdefinierte Designs mit dynamischer Umschaltung des Dunkelmodus |
| [Vorlage 6](templates/flexchartsTemplate6.js) | **Anfängerfreundlich:** Energieübersicht — gestapeltes Balkendiagramm mit Daten aus dem Verlaufsadapter |
| [Vorlage 7](templates/flexchartsTemplate7.js) | **Anfängerfreundlich:** Anzeigediagramm mit aktuellen Statuswerten (Batterie, PV, Wärmepumpe, Sensoren) — reaktive SSE-Aktualisierungen |
| [template7](templates/flexchartsTemplate7.js) | **Anfängerfreundlich:** Anzeige von aktuellen Statuswerten (Batterie, PV, Wärmepumpe, Sensoren) — reaktive SSE-Aktualisierungen |

## Weitere Beispiele und Ressourcen
### Kochbuch (Schritt-für-Schritt-Anleitungen)
Neu bei Flexcharts oder ECharts? Die **[Flexcharts Wiki](https://github.com/MyHomeMyData/ioBroker.flexcharts/wiki)** bietet Ihnen Schritt-für-Schritt-Anleitungen, die Sie von einem statischen Diagramm zu einem vollständig interaktiven Dashboard führen:

| Artikel | Was Sie lernen |
|---------|---------------|
| [A1 — Gestapeltes Flächendiagramm](https://github.com/MyHomeMyData/ioBroker.flexcharts/wiki/Cookbook-A1-Stacked-Area-Chart) | Erstellen Sie ein Live-Diagramm mit SSE-Auto-Update; verbinden Sie Echtzeitdatenzustände über ein Skript |
| [A3 – Interaktive Diagramme](https://github.com/MyHomeMyData/ioBroker.flexcharts/wiki/Cookbook-A3-Interactive-Charts) | Ereignisgesteuerte Diagramme: Kreisdiagramm reagiert auf Hover; gemeinsam genutzte Datensätze, Ereignisbehandler-Zeichenketten |
| [A3 — Interaktive Diagramme](https://github.com/MyHomeMyData/ioBroker.flexcharts/wiki/Cookbook-A3-Interactive-Charts) | Ereignisgesteuerte Diagramme: Kreisdiagramme reagieren auf Hover; gemeinsam genutzte Datensätze, Ereignisbehandler-Zeichenketten |

Weitere Kochbuchartikel sind geplant.

### Beispiele für Adapter von Drittanbietern
- **tibberLink-Adapter:** Siehe Diskussionen [hier](https://github.com/MyHomeMyData/ioBroker.flexcharts/discussions/67) und [hier](https://github.com/MyHomeMyData/ioBroker.flexcharts/discussions/66) — tibberLink verwendet auch flexcharts nativ, siehe die [Dokumentation](https://github.com/hombach/ioBroker.tibberlink?tab=readme-ov-file#2-using-the-flexcharts-or-fully-featured-echarts-adapter-with-json)
- **sun2000-Adapter:** Native [Integration von Flexcharts](https://github.com/bolliy/ioBroker.sun2000/wiki/Statistk-(statistics)) ist verfügbar
- **Viessmann E3-Serie** (z. B. Wärmepumpe Vitocal 250): [ioBroker.e3oncan-Diskussion](https://github.com/MyHomeMyData/ioBroker.e3oncan/discussions/35)

## Referenz
Basis-URL: `http://localhost:8082/flexcharts/echarts.html`

| Parameter | Werte | Beschreibung |
|-----------|--------|-------------|
| `source=state` | | Liest die Chartdefinition aus einem ioBroker-Status. Erfordert `id`. |
| `id=<state_id>` | | Zu lesende Staats-ID (erforderlich für `source=state`). |
| `message=<name>` | Standard: `flexcharts` | Nachrichtenname für `onMessage()` im Skript. |
| `darkmode` | `on` \| `off` \| `auto` | Dunkelmodus: `on`/kein Wert = immer dunkel, `off` = immer hell, `auto` = Systemeinstellungen folgen. |
| `refresh=<n>` | Sekunden, min. 5, Standard 60 | Automatisches Neuladeintervall. Nur aktiv, wenn der Parameter vorhanden ist. |
| `sse` | kein Wert \| `<n>` \| `<json>` | Aktiviert ereignisgesteuerte Diagrammaktualisierungen über Server-Sent Events. Kein Wert oder `&sse=5`: Aktualisierung maximal alle 5 Sekunden (Minimum). `&sse=<n>`: Mindestintervall zwischen Aktualisierungen. `&sse={"refresh":<n>,"ack":true\|false}`: Zusätzlich Filterung nach Bestätigungsstatus. |
| `triggerid=<state_id>` | | Status-ID, die bei der Verwendung von `source=script` mit `&sse` auf Änderungen überwacht werden soll. |
| `themev5` | | Verwende die Standard- und Dunkel-Themes von Apache ECharts v5 anstelle der Standard-Themes von v6. |
| `<custom>=<value>` | | Alle weiteren Parameter werden an das Skript in `httpParams` weitergeleitet. |
| `<custom>=<value>` | | Alle zusätzlichen Parameter werden in `httpParams` an das Skript weitergeleitet. |

## Spenden
<a href="https://www.paypal.com/donate/?hosted_button_id=WKY6JPYJNCCCQ"><img src="https://raw.githubusercontent.com/MyHomeMyData/ioBroker.flexcharts/main/admin/bluePayPal.svg" height="40"></a> Wenn dir dieses Projekt gefallen hat – oder du einfach nur großzügig sein möchtest –, spendiere mir doch ein Bier. Prost! 😉

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
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

### Older versions

Older changelog entries are available in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

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