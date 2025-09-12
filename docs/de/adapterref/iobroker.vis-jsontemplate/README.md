---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-jsontemplate/README.md
title: JSONTemplate - Adapter zur Visualisierung von JSON-Daten und anderen Daten in Vis/Vis2
hash: zTK7roAooVi0nFZ7a9E423aplRW1uZfPZZV1uMu0exI=
---
# JSONTemplate - Adapter zur Visualisierung von JSON-Daten und anderen Daten in Vis/Vis2
![Logo](../../../en/adapterref/iobroker.vis-jsontemplate/admin/vis-jsontemplate.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.vis-jsontemplate.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.vis-jsontemplate.svg)
![Anzahl der Installationen](https://iobroker.live/badges/vis-jsontemplate-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/vis-jsontemplate-stable.svg)
![NPM](https://nodei.co/npm/iobroker.vis-jsontemplate.png?downloads=true)

**Tests:** ![Testen und Freigeben](https://github.com/oweitman/ioBroker.vis-jsontemplate/workflows/Test%20and%20Release/badge.svg)

## Übersicht
Adapter zur Visualisierung von JSON-Daten und anderen Daten in Vis/Vis2.
Sie können die Datenausgabe mithilfe eines Vorlagensystems anpassen.
In den Vorlagen können Sie HTML, CSS und Javascript einbinden.

Das Widget „jsontemplate“ war bisher in den Adaptern „rssfeed“ (für vis1) und „vis-2-widgets-ovarious“ verfügbar. Die Widgets werden in Kürze aus diesen Adaptern entfernt.

## Installation
Installieren Sie den Adapter wie gewohnt aus dem stabilen Repository.
Wenn Sie neue Funktionen oder Fehlerbehebungen testen möchten, können Sie den Adapter auch aus dem Beta-Repository installieren. Weitere Informationen zu Funktionen und Neuigkeiten finden Sie im Test- und Support-Thread für diesen Adapter im iobroker-Forum.

Nach der Installation sollte der Adapter dann im Adapterbereich im iobroker angezeigt werden. Manchmal kommt es vor, dass die Änderungen nicht sichtbar sind, insbesondere bei Web-Änderungen (Widgets / Konfigurationsdialog), dann muss ggf. folgender Befehl in der Kommandozeile ausgeführt werden:

```bash
iobroker upload jsontemplate
```

Im rechten Bereich in der Zeile des Adapters kann über den Plus-Button eine Instanz hinzugefügt werden

## Konfiguration
Dieser Adapter verfügt über keinen Konfigurationsdialog im Adminbereich.

## Vis und Widgets
Folgende Widgets gibt es tatsächlich

- [`JSON-Vorlage`](#json-template) – Sie können eine benutzerdefinierte Vorlage definieren

um beliebige JSON-Daten in vis anzuzeigen.

### JSON-Vorlage
Mit diesem Widget können beliebige Datenpunkte mit JSON-Daten nach Wunsch angezeigt werden.
Die Anzeige erfolgt über ein Vorlagenformat, das als Kombination aus HTML-Code, JavaScript, CSS und speziellen Tags zur Steuerung der JSON-Attribute betrachtet werden kann.
JSONTemplate unterstützt jetzt asynchrone Aufrufe mit „await“.

| Einstellung | Beschreibung |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| json_template | Mit dem Template kann das Aussehen der JSON-Daten bestimmt werden. Alle gültigen HTML-Tags (auch CSS-Attribute in Style-Tags) können im Template verwendet werden. Zusätzlich gibt es spezielle Tags, innerhalb derer die JSON-Daten angezeigt und JavaScript-Anweisungen ausgeführt werden können. |
| json_oid | Auswahl des Datenpunkts mit den entsprechenden JSON-Daten. |
| json_dpCount | Anzahl der Datenpunkte, die in der Vorlage verfügbar gemacht werden sollen. |
| json_dp | Datenpunkt-ID soll bereitgestellt werden. |

Details zum Vorlagensystem finden Sie im Kapitel Vorlage anhand von Beispielen

Die JSON-Daten werden mit dem Präfix data an das Template übergeben. Zusätzlich steht die aktuelle WidgetID auch als Variable zur Verfügung, sodass diese in einzelnen CSS-Anweisungen angegeben werden kann.

#### Erweiterter Anwendungsfall
In den obigen Beispielen wurde nur die reine Ausgabe behandelt.
Die Vorlage kann nun auch mit HTML-Tags angereichert werden, um ein spezifisches Layout zu erreichen. Hier ein Beispiel:

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

Rufen Sie die Funktion sendToAsync mit „await“ auf. Dieses Beispiel ruft eine Testfunktion im Admin-Adapter auf.

**Block 2:**

Stringifizieren Sie das Ergebnis und geben Sie es in HTML aus

**Block 3:**

Definition der sendToAsync-Funktion

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
Dieser Anwendungsfall beschreibt die Visualisierung und interaktive Bearbeitung einer To-Do-Liste aus einer MySQL-Datenbank in `ioBroker`.
Der Fokus liegt auf der Implementierung einer einfachen Statusänderung per Knopfdruck. Dieses Konzept dient als **Proof of Concept (PoC)** und kann in zukünftige Dokumentationen aufgenommen werden.

---

##### **Datenbankstruktur (MySQL)**
Zunächst wird eine MySQL-Datenbank mit dem Namen `test` erstellt.
Sie enthält eine Tabelle `test` mit den folgenden Feldern:

- `id`: Eindeutige ID für jeden Eintrag
- `todo`: Titel des To-Do-Eintrags
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
Für die Interaktion mit der Datenbank ist der Adapter `ioBroker.sql` erforderlich.
Er ist entsprechend konfiguriert, um eine Verbindung zur MySQL-Datenbank `test` herzustellen.
Beachten Sie, dass `ioBroker` automatisch eigene Strukturen in der Datenbank erstellt, um Verlaufsdatenpunkte zu speichern.

###### **JSONTemplate-Widget**
Zur Visualisierung verwenden wir das Widget `JSONTemplate`.

##### **Integration in VIS**
Wir platzieren das Widget `JSONTemplate` und füllen folgende Felder aus:

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

###### **Datenpunkt zum Aktualisieren von Inhalten**
Um sicherzustellen, dass Aktualisierungen nach einer Statusänderung berücksichtigt werden, fügen wir den folgenden lokalen Datenpunkt hinzu:

```text
local_trigger
```

Dieser Datenpunkt **muss nicht explizit erstellt werden**, da `local_?`-Datenpunkte intern innerhalb von VIS verarbeitet werden (siehe `vis`-Dokumentation).

##### **Code-Erklärung**
###### **Vorlagenstruktur**
| Zeile | Inhalt |
| ----- | ---------------------------------------------------------------------- |
| 1-5 | CSS-Stile für das Erscheinungsbild von Schaltflächen |
| 6-11 | Tabellenkopf mit Spalten ID, Todo, Aktion |
| 12-16 | Daten aus der MySQL-Datenbank abrufen mit `getTodo()` |
| 23-28 | Globale Referenz der Funktion `clicktodo()` |
| 30-37 | `getButton()` Funktion zum Erstellen einer Schaltfläche mit dem aktuellen Status |
| 38-44 | `clicktodo()` Funktion zum Ändern des Status per Button-Klick |
| 45-48 | `getTodo()` Funktion zum Abrufen von Daten über den SQL-Adapter |
| 49-52 | `setAction()` Funktion zum Aktualisieren des Datenbankeintrags |
| 53-58 | `sendToAsync()`-Funktion zur Verwendung von `async/await` mit `vis.conn.sendTo()` |
| 53-58 | Funktion „sendToAsync()“ zur Verwendung von „async/await“ mit „vis.conn.sendTo()“ |

## Vorlagensystem
## Schlagwörter
Das Vorlagensystem arbeitet mit bestimmten Tags.
Die verwendeten Tags haben folgende Bedeutung:

| `tag` | Beschreibung |
| ----- | ------------------------------------------------------------------- |
| <%= | Der Inhalt des enthaltenen Ausdrucks/der enthaltenen Variable wird maskiert. |
| <%- | Der Inhalt des enthaltenen Ausdrucks/der enthaltenen Variable ist nicht maskiert. |
| <% | Keine Ausgabe, wird für eingeschlossene Javascript-Anweisungen verwendet |
| %> | ist im Allgemeinen ein schließender Tag, um einen der vorherigen zu vervollständigen |

Alles, was außerhalb dieser Tags steht, wird unverändert angezeigt oder, falls es HTML ist, als HTML interpretiert.
In der Vorlage stehen Ihnen zwei vordefinierte Variablen zur Verfügung.

### Beispielobjekt
Für alle folgenden Beispiele wird das folgende JSON verwendet.

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

Auf Arrays kann über einen Index zugegriffen werden. Der Index beginnt immer mit 0. Es gibt jedoch auch Fake-Arrays, bei denen der Index nicht mit 0 beginnt oder sogar aus Text besteht. Hier gelten die Regeln für Objekte.
Im obigen Beispiel wäre dies

**Vorlage:**

```ejs
<%- data.onearray[0] %>
<%- data.onearray[1] %>
```

**Ergebnis:**

```text
    one two
```

Wenn Sie versuchen, ein Array direkt ohne Index auszugeben, gibt die Vorlage alle Elemente durch Kommas getrennt aus

**Vorlage:**

```ejs
<%- data.onearray %>
```

**Ergebnis:**

```text
    one,two
```

Arrays können auch aus einer Sammlung von Objekten bestehen.
Das Beispiel hier enthält nur ein einfaches Array.
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

Attribute eines Objekts können mithilfe der Punktnotation oder der Klammernotation angesprochen werden.
Die Punktnotation funktioniert nur, wenn das Attribut bestimmten Namenskonventionen entspricht (das erste Zeichen muss ein Buchstabe sein, die restlichen Zahlen oder Buchstaben oder ein Unterstrich).
Die Klammernotation funktioniert auch für Attribute, die nicht der Namenskonvention entsprechen.

**Punktnotation:**

**Vorlage:**

```ejs
<%- data.oneobject.attribute1 %>
```

**Klammernotation:**

**Vorlage:**

```ejs
<%- data.oneobject["attribute1"] %>
```

**Ergebnis für beide Beispiele:**

```text
    1
```

Schleife über die Attribute eines Objekts

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

## Entwicklung und Debugging
### Vis1 Widgets
- Installieren Sie den Dev-Server
- Starten Sie den Dev-Server mit der Option --noStart
- Beim ersten Start zusätzlich Adapter Web und Vis1 installieren
- Starten Sie die vscode-Startkonfiguration „vis-1 editor“
- wenn Widgets nicht verfügbar sind, laden Sie den Adapter im Expertenmodus auf der Adapterseite hoch
- jetzt können Sie Haltepunkte in vscode in der Datei jsontemplate.js setzen
- Wenn Sie etwas in der js-Datei ändern, muss die Quelle kompiliert werden, um

den Ordner „dist“ mit dem Befehl „npm run build-vis1widgets“.

- Der Dev-Server lädt die geänderten Dateien auf iobroker hoch, aber für vis1 müssen Sie

um den Befehl iob visdebug auszuführen und die Widgets neu zu laden

- Um zusätzliche Einträge in en.json zu übersetzen, verwenden Sie den Befehl translate-widgets-vis1

### Vis2-Widgets
- Installieren Sie den Dev-Server
- Öffnen Sie ein neues VSCode-Fenster (2. Instanz)
- Vis2-Repository klonen
- Folgen Sie den Anweisungen in der Readme-Datei des Vis2-Repositorys

Im Kapitel Entwicklung und Debugging. Sie müssen das Repository nicht forken.
Wir benötigen lediglich eine laufende Instanz des Vis2-Adapters.

- Starten Sie Vis 2 mit npm run start
- zurück in die VSCode-Instanz dieses Adapters
- Starten Sie den Dev-Server mit der Option --noStart
- Starten Sie die VSCode-Startkonfiguration „Vis-2-Editor“.
- jetzt können Sie Haltepunkte in vscode in der Datei jsontemplate.js setzen
- wenn Sie etwas ändern, müssen Sie nichts weiter tun,

weil vite Hot Reload unterstützt. Manchmal ist es sinnvoll, vis2 mit F5 neu zu laden

- Um zusätzliche Einträge in en.json zu übersetzen, verwenden Sie den Befehl translate-widgets-vis2

## Aufgaben
- tbd

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
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