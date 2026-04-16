---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-jsontemplate/README.md
title: JSONTemplate – Adapter zur Visualisierung von JSON-Daten und anderen Daten in Vis/Vis2
hash: SBqUVc0lqvE6u1MS8iZcarssZkbyaVc4gIRL6fSJsJk=
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
| json_scriptCount | Anzahl der zu ladenden JavaScript-URLs |
| json_script[] | Zu ladende JavaScript-URL. Siehe Beispiel unten. |
| json_cssCount | Anzahl der zu ladenden CSS-URLs. |
| json_css[] | Zu ladende CSS-URL. |

Einzelheiten zum Vorlagensystem finden Sie im Kapitel „Vorlagen basierend auf Beispielen“.

Verfügbare Datenobjekte in der Vorlage:

| Objekt/Variable | Beschreibung |
| --------------- | ------------------------------------------------------------------------ |
| widgetID | widgetID des Widgets. |
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

Beispielausgabe von Daten, Widgets und Stilen in der Vorlage

```ejs
<%- JSON
    .stringify(style, null, 4)
    .replace(/\n/g, '<br>')
    .replace(/ /g, '&nbsp;'); %>
```

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

## Templatesystem
## Wichtiger Hinweis zum Templatesystem in vis
In vis werden alle Objektnotationen der folgenden Form als Bindungen erkannt und ersetzt.

Daher müssen die öffnenden und schließenden Klammern aller Objektbezeichnungen in getrennten Zeilen stehen:

Falsch:

```json
{ "a": 1, "b": 2 }
```

Richtig

```json
{
    "a": 1,
    "b": 2
}
```

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
Ein Beispiel für Arrays mit Objekten wird später gegeben.

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
### 4.4.1 (2026-04-13)

- fix regression
- update packages

### 4.4.0 (2026-03-24)

- optimize lib size
- The ability to load additional JavaScript and CSS files
  has been added (also for vis2).
- Improve react components
- align translation for vis2 widget

### 4.3.11 (2026-01-25)

- check test release workflow

### 4.3.10 (2026-01-25)

- update test and release script

### 4.3.1 (2026-01-24)

- try again to publish

### 4.3.0 (2026-01-24)

- The ability to load additional JavaScript and CSS files has been added.
  This is currently only available for vis1 for testing purposes.

### 4.2.0 (2025-11-14)

- Improve documentation for the object notation in a template
- fix some translations
- align attribute name to vis1
- add widget data to the available template objects in vis2
- add style and widget object to the available template objects in vis1
- improve documentation

### 4.1.3 (2025-11-03)

- fix race condition if more than one widget use the same datapoint
- switch to trusted publishing

### 4.1.2 (2025-09-13)

- new try of publish

### 4.1.0 (2025-09-12)

- rename widgetset of the vis2 widget

### 4.0.2 (2025-08-28)

- remove v4.0.0 from io-package

### 4.0.1 (2025-08-28)

- move vis1 and vis2 widgets to vis-jsontemplate adapter

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