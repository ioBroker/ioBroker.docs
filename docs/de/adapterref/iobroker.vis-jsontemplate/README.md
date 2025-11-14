---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-jsontemplate/README.md
title: JSONTemplate – Adapter zur Visualisierung von JSON-Daten und anderen Daten in Vis/Vis2
hash: BwqvNjiyiApZb5qyTlme+D5LK+b+Cc5DNrCWuXYG8DQ=
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
Sie können die Datenausgabe mithilfe eines Vorlagensystems anpassen.
In den Vorlagen können Sie HTML, CSS und JavaScript einbinden.

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
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| json_template | Mit der Vorlage kann das Erscheinungsbild der JSON-Daten bestimmt werden. Alle gültigen HTML-Tags (einschließlich CSS-Attribute in Style-Tags) können in der Vorlage verwendet werden. Es gibt auch spezielle Tags, innerhalb derer die JSON-Daten angezeigt werden und JavaScript-Anweisungen ausgeführt werden können. |
| json_oid | Auswahl des Datenpunkts mit den entsprechenden JSON-Daten. |
| json_dpCount | Anzahl der Datenpunkte, die in der Vorlage verfügbar gemacht werden sollen. |
| json_dp | Die Datenpunkt-ID soll bereitgestellt werden. |

Einzelheiten zum Vorlagensystem finden Sie im Kapitel „Vorlagen basierend auf Beispielen“.

Die JSON-Daten werden zusammen mit den Präfixdaten an die Vorlage übergeben. Zusätzlich steht die aktuelle Widget-ID als Variable zur Verfügung, sodass sie in einzelnen CSS-Anweisungen angegeben werden kann.

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

#### Anwendungsfall für asynchrone Aufrufe
**Block 1:**

Die Funktion `sendToAsync` wird mit `await` aufgerufen. Dieses Beispiel ruft eine Testfunktion im Admin-Adapter auf.

**Block 2:**

Das Ergebnis in einen String umwandeln und als HTML ausgeben.

**Block 3:**

Definition der Funktion sendToAsync

```ejs
<% req = await sendToAsync("admin.0","selectSendTo",{test:"test"}); %>
<%- JSON.stringify(req) %>
<% async function sendToAsync(instance, command, sendData) {
    console.log(`sendToAsync ${command} ${sendData}`);
    return new Promise((resolve, reject) => {
        try {
            vis.conn.sendTo(instance, command, sendData, function (receiveData) {
                resolve(receiveData);
            });
        } catch (error) {
            reject(error);
        }
    });
} %>
```

**Ergebnis:**

```text
[{"label":"Afghanistan","value":"AF"},{"label":"Åland Islands","value":"AX"},{"label":"Albania","value":"AL"}]
```

#### Anwendungsfall für eine datenbankgestützte Aufgabenliste
##### **Einführung**
Dieser Anwendungsfall beschreibt, wie eine Aufgabenliste aus einer MySQL-Datenbank in `ioBroker` visualisiert und interaktiv bearbeitet werden kann. Der Fokus liegt auf der Implementierung einer einfachen Statusänderung per Knopfdruck. Dieses Konzept dient als **Proof of Concept (PoC)** und kann in zukünftige Dokumentationen aufgenommen werden.

---

##### **Datenbankstruktur (MySQL)**
Zunächst wird eine MySQL-Datenbank mit dem Namen `test` erstellt.

Sie enthält eine Tabelle `test` mit den folgenden Feldern:

- `id`: Eindeutige ID für jeden Eintrag
- `todo`: Titel des Aufgabeneintrags
- `action`: Status des Eintrags (0 = in Bearbeitung, 1 = abgeschlossen)

###### **SQL-Code zur Tabellenerstellung**
<details><summary>Details</summary><pre><code>

```sql

CREATE TABLE `test` (
`id` int(11) NOT NULL,
`todo` varchar(100) NOT NULL,
`action` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `test` (`id`, `todo`, `action`) VALUES
(1, 'Todo 1', 0),
(2, 'Todo 2', 1),
(3, 'Todo 3', 1),
(4, 'Todo 4', 0);

ALTER TABLE `test`
ADD PRIMARY KEY (`id`),
ADD UNIQUE KEY `id` (`id`),
ADD KEY `idx` (`id`);

ALTER TABLE `test`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

```

</code></pre>

</details>

---

##### **Integration in ioBroker**
###### **SQL-Adapter**
Für die Interaktion mit der Datenbank wird der Adapter `ioBroker.sql` benötigt.
Dieser ist entsprechend konfiguriert, um eine Verbindung zur MySQL-Datenbank `test` herzustellen.
Beachten Sie, dass `ioBroker` automatisch eigene Strukturen in der Datenbank erstellt, um Verlaufsdaten zu speichern.

###### **JSONTemplate-Widget**
Zur Visualisierung verwenden wir das Widget `JSONTemplate`.

##### **Integration in VIS**
Wir platzieren das Widget `JSONTemplate` und füllen die folgenden Felder aus:

###### **Vorlagencode**
<details><summary>Details</summary><pre><code>

```html
<style>
    .btn {
        width: 100%;
    }
</style>
<table>
    <tr>
        <th>ID</th>
        <th>Todo</th>
        <th>Action</th>
    </tr>
    <% let todos = await getTodo(); for (let i = 0; i < todos.length; i++) { let todo = todos[i]; %>
    <tr>
        <td><%- todo.id %></td>
        <td><%- todo.todo %></td>
        <td><%- getButton(todo.id, todo.action) %></td>
    </tr>
    <% } %>
</table>

<script>
    window.vis-jsontemplate = { clicktodo: clicktodo };

    function getButton(id, action) {
        let text = action === 0 ? 'In Progress' : 'Completed';
        return `<button class="btn" onclick="window.vis-jsontemplate.clicktodo(this)" data-id="${id}" data-action="${action}">${text}</button>`;
    }

    function clicktodo(el) {
        let id = el.dataset.id;
        let action = el.dataset.action;
        let nextAction = action == 0 ? 1 : 0;
        setAction(id, nextAction);
    }

    async function getTodo() {
        let req = await sendToAsync('sql.0', 'query', 'SELECT * FROM test.test');
        return req.result;
    }

    async function setAction(id, action) {
        await sendToAsync('sql.0', 'query', `UPDATE test.test SET action = ${action} WHERE id = ${id}`);
        vis.setValue('local_trigger', Math.random());
    }

    async function sendToAsync(instance, command, sendData) {
        return new Promise((resolve, reject) => {
            try {
                vis.conn.sendTo(instance, command, sendData, receiveData => resolve(receiveData));
            } catch (error) {
                reject(error);
            }
        });
    }
</script>
```

</code></pre>

</details>

###### **Datenpunkt für die Aktualisierung von Inhalten**
Um sicherzustellen, dass Aktualisierungen nach einer Statusänderung wirksam werden, fügen wir den folgenden lokalen Datenpunkt hinzu:

```text
local_trigger
```

Dieser Datenpunkt **muss nicht explizit erstellt werden**, da `local_?`-Datenpunkte intern innerhalb von VIS verarbeitet werden (siehe `vis`-Dokumentation).

##### **Code-Erklärung**
###### **Vorlagenstruktur**
| Zeile | Inhalt |
| ----- | ---------------------------------------------------------------------- |
| 1-5 | CSS-Stile für das Aussehen von Schaltflächen |
| 6-11 | Tabellenkopf mit Spalten ID, Todo, Aktion |
| 12-16 | Daten aus der MySQL-Datenbank mit `getTodo()` abrufen |
| 23-28 | Globale Referenz der Funktion `clicktodo()` |
| 30-37 | `getButton()` Funktion zum Erstellen einer Schaltfläche mit dem aktuellen Status |
| 38-44 | `clicktodo()` Funktion zum Ändern des Status per Knopfdruck |
| 45-48 | `getTodo()` Funktion zum Abrufen von Daten über den SQL-Adapter |
| 49-52 | `setAction()` Funktion zum Aktualisieren des Datenbankeintrags |
| 53-58 | `sendToAsync()` Funktion zur Verwendung von `async/await` mit `vis.conn.sendTo()` |
| 53-58 | Die Funktion `sendToAsync()` zur Verwendung von `async/await` mit `vis.conn.sendTo()` |

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

### **WORK IN PROGRESS**

- Improve documentation for the object notation in a template

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

Copyright (c) 2021-2025 oweitman <oweitman@gmx.de>

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