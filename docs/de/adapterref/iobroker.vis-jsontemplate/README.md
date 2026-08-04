---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-jsontemplate/README.md
title: JSONTemplate – Adapter zur Visualisierung von JSON-Daten und anderen Daten in Vis/Vis2
hash: 7s1xM16/ov++kLeyabOPEYxwmmmrH0q/c1R+KDa8iRI=
---
# JSONTemplate – Adapter zur Visualisierung von JSON-Daten und anderen Daten in Vis/Vis2
![Logo](../../../en/adapterref/iobroker.vis-jsontemplate/admin/vis-jsontemplate.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.vis-jsontemplate.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.vis-jsontemplate.svg)
![Anzahl der Installationen](https://iobroker.live/badges/vis-jsontemplate-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/vis-jsontemplate-stable.svg)
![NPM](https://nodei.co/npm/iobroker.vis-jsontemplate.png?downloads=true)

**Tests:** ![Test und Freigabe](https://github.com/oweitman/ioBroker.vis-jsontemplate/workflows/Test%20and%20Release/badge.svg)

## Übersicht
Adapter zur Visualisierung von JSON-Daten und anderen Daten in Vis/Vis2.
Sie können die Datenausgabe mithilfe eines Templatesystems anpassen.
In den Templates können Sie HTML, CSS und JavaScript einbinden.
Das verwendete Templatesystem war `ejs`.
Sie können die grundlegenden Funktionen hier im Online-Spielplatz ausprobieren.

<https://ionicabizau.github.io/ejs-playground>

Das jsontemplate-Widget war zuvor in den Adaptern rssfeed (für vis1) und vis-2-widgets-ovarious verfügbar. Die Widgets werden in Kürze aus diesen Adaptern entfernt.

## Inhaltsverzeichnis
- [Übersicht](#overview)
- [Installation](#installation)
- [Konfiguration](#configuration)
- [vis and widgets](#vis-and-widgets)
- [JSON-Vorlage](#json-template)
- [Erweiterter Anwendungsfall](#advanced-use-case)
- [Weitere Anwendungsfälle](#more-use-cases)
- [Templatesystem](#templatesystem)
- [Sehr wichtiger Hinweis zur Verwendung in vis / vis-2](#very-important-note-for-use-in-vis--vis-2)
- [Geschweifte Klammern in CSS und JSON](#curly-braces-in-css-and-json)
- [Verwendung von setInterval](#use-of-setinterval)
- [Entwicklung von Vorlagen mit KI](#developing-templates-with-ai)
- [Tags](#tags)
- [Beispielobjekt](#example-object)
- [Entwicklung und Debugging](#development-and-debugging)
- [Vis1 Widgets](#vis1-widgets)
- [Vis2 Widgets](#vis2-widgets)
- [Todo](#todo)
- [Änderungsprotokoll](#changelog)
- [Lizenz](#Lizenz)

## Installation
Installieren Sie den Adapter wie gewohnt aus dem stabilen Repository.
Wenn Sie neue Funktionen oder Fehlerbehebungen testen möchten, können Sie den Adapter auch aus dem Beta-Repository installieren. Informationen zu Funktionen und Neuigkeiten finden Sie im Thread „Test und Support“ für diesen Adapter im iobroker-Forum.

Nach der Installation sollte der Adapter im Adapterbereich des iobroker angezeigt werden. Manchmal sind die Änderungen nicht sichtbar, insbesondere bei webbasierten Änderungen (Widgets/Konfigurationsdialog). In diesem Fall muss möglicherweise folgender Befehl in der Kommandozeile ausgeführt werden:

```bash
iobroker upload jsontemplate
```

Im rechten Bereich der Adapterzeile kann mithilfe der Plus-Schaltfläche eine Instanz hinzugefügt werden.

## Konfiguration
Dieser Adapter verfügt über keinen Konfigurationsdialog im Administrationsbereich.

## Vis und Widgets
Folgende Widgets existieren tatsächlich

- [`JSON-Vorlage`](#json-template) - Sie können eine benutzerdefinierte Vorlage definieren

um beliebige JSON-Daten in vis anzuzeigen.

### JSON-Vorlage
Mit diesem Widget lassen sich beliebige Datenpunkte mit JSON-Daten wie gewünscht darstellen. Die Darstellung erfolgt mithilfe eines Template-Formats, das sich als Kombination aus HTML-Code, JavaScript, CSS und speziellen Tags zur Steuerung der JSON-Attribute verstehen lässt. JSONTemplate unterstützt nun asynchrone Aufrufe mit `await`.

| Schauplatz | Beschreibung |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| json_template | Die Vorlage kann verwendet werden, um das Erscheinungsbild der JSON-Daten festzulegen. Alle gültigen HTML-Tags (einschließlich CSS-Attribute in Style-Tags) können in der Vorlage verwendet werden. Es gibt auch spezielle Tags, innerhalb derer die JSON-Daten angezeigt werden und JavaScript-Anweisungen ausgeführt werden können. |
| json_oid | Auswahl des Datenpunkts mit den entsprechenden JSON-Daten. |
| json_dpCount | Anzahl der Datenpunkte, die in der Vorlage verfügbar gemacht werden sollen. |
| json_dp | Die Datenpunkt-ID soll bereitgestellt werden. |
| json_dp_variable | Optionaler JavaScript-Variablenname. Die Variable enthält die Datenpunkt-ID; der gleiche Name mit angehängtem `_value` enthält ihren aktuellen Wert. |
| json_scriptCount | Anzahl der zu ladenden JavaScript-URLs |
| json_script[] | Zu ladende JavaScript-URL. Siehe Beispiel unten. |
| json_cssCount | Anzahl der zu ladenden CSS-URLs. |
| json_css[] | Zu ladende CSS-URL. |

Einzelheiten zum Vorlagensystem finden Sie im Kapitel „Vorlagen basierend auf Beispielen“.

Verfügbare Datenobjekte in der Vorlage:

| Objekt/Variable | Beschreibung |
| --------------- | ------------------------------------------------------------------------ |
| widgetid | widgetid des Widgets. |
| widgetID | widgetid des Widgets. |
| data | JSON-Objekt, auf das der Datenpunkt in json_oid verweist. |
| dp | Array der Datenpunktdaten, auf die die zusätzlichen Datenpunkte verweisen |
| Widget | Interne Widget-Daten. Objekt mit allen verfügbaren Widget-Einstellungen |
| Stil | Interne Stildaten. Objekt mit allen verfügbaren Widget-Stilinformationen |

Die zusätzlichen Datenpunkte können über A) den Namen des Datenpunkts aufgerufen werden.

```javascript
<%- dp["0_userdata.0.test"] %>
<%- dp["0_userdata.0.abc"] %>
```

B) Indexnummer des Datenpunkts (die Nummerierung beginnt immer mit 0)

```javascript
<%- dp[Object.keys(dp)[0]] %>
<%- dp[Object.keys(dp)[1]] %>
```

C) Ein optionaler Variablenname, der für den Datenpunkt konfiguriert ist. Für einen Datenpunkt `0_userdata.0.selectwrite`, Variablennamen `dpwrite` und Wert `abc`:

```javascript
<%- dpwrite %>          <!-- 0_userdata.0.selectwrite -->
<%- dpwrite_value %>    <!-- abc -->
<%- dp[dpwrite] %>      <!-- abc -->
```

Beispielausgabe von Daten, Widgets und Stilen in der Vorlage

```ejs
<%- JSON
    .stringify(style, null, 4)
    .replace(/\n/g, '<br>')
    .replace(/ /g, '&nbsp;'); %>
```

Im Fehlerfall wird dieser im Widget angezeigt und in der Browserkonsole (F12) ausgegeben.

#### Erweiterter Anwendungsfall
In den obigen Beispielen wurde nur die reine Ausgabe betrachtet.
Die Vorlage kann nun auch mit HTML-Tags angereichert werden, um ein bestimmtes Layout zu erzielen. Hier ist ein Beispiel:

```html
<h3>Output</h3>
<style>
    .mycssclassproperty {
        color: green;
    }
    .mycssclassdata {
        color: red;
    }
</style>
<% for (var prop in data.oneobject) { %>
<div>
    <span class="mycssclassproperty"><%- "data.oneobject." + prop + " = " %></span>
    <span class="mycssclassdata"><%- data.oneobject[prop] %></span>
</div>
<% } %>
```

**Ergebnis:**

```text
    data.oneobject.attribute1 = 1
    data.oneobject.attribute2 = 2
```

(In Markdown sind Farben nicht sichtbar)

#### Weitere Anwendungsfälle
- [Anwendungsfall Asynchrone Aufrufe](documentation/usecase-asynccall.md)
- [Anwendungsfall-Ladeskripte](documentation/usecase-loadingscripts.md)
- [Anwendungsfall-Aufgabenliste](documentation/usecase-tasklist.md)
- [Anwendungsfall öffentlicher Verkehr](documentation/usecase-public-transport.md)
- [Anwendungsfall einfaches Messgerät](documentation/usecase-simplegauge.md)
- [Anwendungsfall-GitHub-Issues und PRs](documentation/usecase-githubissues.md)
- [Anwendungsfall FRITZ!Box-Aufrufliste](documentation/usecase-fritzbox-call-list.md)

## Templatesystem
### Sehr wichtiger Hinweis zur Verwendung in vis / vis-2
#### Geschweifte Klammern in CSS und JSON
Der Bindungsmechanismus in vis / vis-2 verwendet das Muster `{ ... }`, um Bindungsausdrücke in HTML zu erkennen.
Daher müssen geschweifte Klammern bei der Angabe von CSS oder JSON immer in separaten Zeilen stehen. Andernfalls wird der Inhalt des vis-Widgets mit `undefined` überschrieben.

##### Beispiel
```text
#<%- widgetid %> { height: 100%; display: flex; flex-direction: column; overflow: hidden; }
```

muss wie folgt geschrieben werden:

```text
#<%- widgetid %> {
    height: 100%; display: flex; flex-direction: column; overflow: hidden;
}
```

#### Verwendung von setInterval
Bitte verwenden Sie nicht `setInterval`. Da die Vorlage bei jeder Datenpunktänderung neu aufgerufen wird, können vorhandene `setInterval`-Aufrufe nicht ordnungsgemäß gelöscht werden. Dadurch häufen sich mit der Zeit immer mehr überlappende `setInterval`-Aufrufe an, was RAM verbraucht und zu unvorhersehbaren Nebenwirkungen führen kann. Zwar lässt sich das Problem durch Neuladen der Seite beheben, der Code sollte jedoch nicht auf diese Weise implementiert werden.
Alternativ sollten solche Szenarien mit `setTimeout` implementiert werden.

#### Entwicklung von Vorlagen mit KI
Um die Erstellung von Vorlagen für alle zu vereinfachen, habe ich eine detaillierte Dokumentation mit Anleitungen und Beschreibungen vorbereitet:

- [Englisch](documentation/AI-EN.md)
- [German](documentation/KI-DE.md)

## Tags
Das Templatesystem arbeitet mit bestimmten Tags.
Die verwendeten Tags haben folgende Bedeutung:

| `tag` | Beschreibung |
| ----- | ------------------------------------------------------------------- |
| <%= | Der Inhalt des enthaltenen Ausdrucks / der Variablen wird maskiert. |
| <%- | Der Inhalt des enthaltenen Ausdrucks / der Variablen ist nicht maskiert. |
| <% | Keine Ausgabe, wird für eingeschlossene JavaScript-Anweisungen verwendet |
| %> | ist im Allgemeinen ein schließendes Tag, um eines der vorhergehenden zu vervollständigen |

Alles außerhalb dieser Tags wird unverändert angezeigt, bzw. HTML wird als HTML interpretiert.
Innerhalb der Vorlage stehen Ihnen zwei vordefinierte Variablen zur Verfügung.

### Beispielobjekt
Für alle nachfolgenden Beispiele wird das folgende JSON verwendet.

```json
{
    "onearray": ["one", "two"],
    "oneobject": {
        "attribute1": 1,
        "attribute2": 2
    },
    "onenumber": 123,
    "onetext": "onetwothree"
}
```

Attribute könnten wie folgt ausgegeben werden

**Vorlage:**

```ejs
<%- data.onenumber %>
<%- data.onetext %>
```

**Ergebnis:**

```text
    123 onetwothree
```

Auf Arrays kann über einen Index zugegriffen werden. Der Index beginnt immer mit 0. Es gibt jedoch auch sogenannte „Dummy-Arrays“, bei denen der Index nicht mit 0 beginnt oder sogar aus Text besteht. Hier gelten die Regeln für Objekte.

Im obigen Beispiel wäre das so:

**Vorlage:**

```ejs
<%- data.onearray[0] %>
<%- data.onearray[1] %>
```

**Ergebnis:**

```text
    one two
```

Wenn Sie versuchen, ein Array direkt ohne Index auszugeben, gibt die Vorlage alle Elemente durch Kommas getrennt aus.

**Vorlage:**

```ejs
<%- data.onearray %>
```

**Ergebnis:**

```text
    one,two
```

Arrays können auch aus einer Sammlung von Objekten bestehen.
Das hier gezeigte Beispiel enthält nur ein einfaches Array.
Ein Beispiel für Arrays mit Objekten folgt später.

**Vorlage:**

```ejs
<% for (var i = 0; i < data.onearray.length ; i++ ) { %>
<%- data.onearray[i] %>
<% } %>
```

**Ergebnis:**

```text
    one two
```

**Objekte** können einzelne Attribute, Arrays oder wiederum Objekte enthalten.

Das bedeutet, dass JSON-Daten beliebig tief verschachtelt werden können.

Attribute eines Objekts können mit der Punktnotation oder der Klammernotation angesprochen werden.
Die Punktnotation funktioniert nur, wenn das Attribut bestimmten Namenskonventionen entspricht (erster Buchstabe, gefolgt von Zahlen, Buchstaben oder Unterstrichen).
Die Klammernotation funktioniert auch für Attribute, die dieser Namenskonvention nicht entsprechen.

**Punktnotation:**

**Vorlage:**

```ejs
<%- data.oneobject.attribute1 %>
```

**Notation in Klammern:**

**Vorlage:**

```ejs
<%- data.oneobject["attribute1"] %>
```

**Ergebnis für beide Beispiele:**

```text
    1
```

Iteriere über die Attribute eines Objekts

**Vorlage:**

```ejs
<% for (var prop in data.oneobject) { %>
<%- "data.oneobject." + prop + " = " + data.oneobject[prop] %>
<% } %>
```

**Ergebnis:**

```text
    data.oneobject.attribute1 = 1
    data.oneobject.attribute2 = 2
```

## Entwicklung und Fehlersuche
### Vis1-Widgets
- Installiere den Entwicklungsserver
- Starten Sie den Entwicklungsserver mit der Option --noStart
- Installieren Sie beim ersten Start die zusätzlichen Adapter web und vis1.
- Starten Sie VS Code mit der Startkonfiguration "vis-1 editor"
- Falls keine Widgets verfügbar sind, laden Sie den Adapter im Expertenmodus auf der Adapterseite hoch.
- Jetzt können Sie in VS Code Haltepunkte in der Datei jsontemplate.js setzen.
- Wenn Sie etwas in der JS-Datei ändern, muss der Quellcode kompiliert werden zu

den Ordner „dist“ mit dem Befehl „npm run build-vis1widgets“.

- Der Entwicklungsserver lädt die geänderten Dateien zu iobroker hoch, aber für vis1 haben Sie

den Befehl iob visdebug ausführen, um die Widgets neu zu laden

- Um weitere Einträge in en.json zu übersetzen, verwenden Sie den Befehl translate-widgets-vis1.

### Vis2-Widgets
- Installiere den Entwicklungsserver
- Öffnen Sie ein neues VS Code-Fenster (2. Instanz)
- vis2-Repository klonen
- Befolgen Sie die Anweisungen in der Readme-Datei des Vis2-Repositorys.

Im Kapitel „Entwicklung und Debugging“ ist es nicht nötig, das Repository zu forken.
Wir benötigen lediglich eine laufende Instanz des vis2-Adapters.

- Starten Sie Vis 2 mit npm run start
- zurück in der VS Code-Instanz dieses Adapters
- Starten Sie den Entwicklungsserver mit der Option --noStart
- Starten Sie VS Code mit der Startkonfiguration "vis-2 editor"
- Jetzt können Sie in VS Code Haltepunkte in der Datei jsontemplate.js setzen.
- Wenn du etwas änderst, musst du nichts anderes tun.

Da Vite Hot Reload unterstützt, ist es manchmal nützlich, Vis2 mit F5 neu zu laden.

- Um weitere Einträge in en.json zu übersetzen, verwenden Sie den Befehl translate-widgets-vis2.

## Todo
- tbd

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 4.6.1 (2026-07-31)

- Improved error output.

### 4.6.0 (2026-07-30)

- some changes. see readme/below

#### Changes 2026-07-30

- add optional variable names to extra datapoints

### 4.5.0 (2026-07-29)

- some changes. see readme/below

#### Changes 2026-07-29

- repair widget rendering
- add search and fullscreen to ejs-edit for vis-2 widget
- improve ki documentation for regex expressions
- improve vis-2 ejs edit theme for dark mode

### 4.4.5 (2026-07-22)

- fix packages for vis-2

### 4.4.4 (2026-07-22)

- some changes. see readme/below

#### Changes 2026-07.22

- change documentation that in the template the widgetid is available and not widgetID
- add documentation for the usecase simple gauge
- add documentation for a responsive FRITZ!Box call list
- Due to an inconsistency between the vis1 and vis2 widgets,
  both `widgetid` and `widgetID` are now passed to the template.

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2021-2026 oweitman <oweitman@gmx.de>

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