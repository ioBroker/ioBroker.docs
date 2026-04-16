---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.rssfeed/README.md
title: ioBroker-Adapter zum Anfordern und Anzeigen von RSS-Feeds verschiedener Standards (Atom, RSS, RDF)
hash: lyXFXr3Ju6dg0BPZZRhneQ+hOP4x0mGTAy7vzr/kM5E=
---
# IoBroker-Adapter zum Anfordern und Anzeigen von RSS-Feeds verschiedener Standards (Atom, RSS, RDF)
![Logo](../../../en/adapterref/iobroker.rssfeed/admin/rssfeed.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.rssfeed.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.rssfeed.svg)
![Anzahl der Installationen](https://iobroker.live/badges/rssfeed-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/rssfeed-stable.svg)
![NPM](https://nodei.co/npm/iobroker.rssfeed.png?downloads=true)

**Tests:** ![Test und Freigabe](https://github.com/oweitman/ioBroker.rssfeed/workflows/Test%20and%20Release/badge.svg)

## Übersicht
Adapter zum Anfordern und Anzeigen von RSS-Feeds verschiedener Standards (Atom, RSS, RDF).
Sie können die Ausgabe des Feeds mithilfe eines Templatesystems anpassen. In den Templates können Sie HTML, CSS und JavaScript einbinden.

Wichtig: Aufgrund von Fehlern in den automatischen Übersetzungen von iobroker in andere Sprachen ist nur die englische Übersetzung gültig.

## Konfiguration
Installieren Sie den Adapter wie gewohnt aus dem stabilen Repository. Wenn Sie neue Funktionen oder Fehlerbehebungen testen möchten, können Sie den Adapter auch aus dem Beta-Repository installieren. Informationen zu Funktionen und Neuigkeiten finden Sie im Thread „Test und Support“ für diesen Adapter im iobroker-Forum.

Nach der Installation sollte der Adapter im Adapterbereich des iobroker angezeigt werden.
Manchmal sind die Änderungen nicht sichtbar, insbesondere bei webbasierten Änderungen (Widgets/Konfigurationsdialog). In diesem Fall muss möglicherweise folgender Befehl in der Kommandozeile ausgeführt werden:

```bash
iobroker upload rssfeed
```

Im rechten Bereich der Adapterzeile kann mithilfe der Plus-Schaltfläche eine Instanz hinzugefügt werden.

Die Konfiguration ist einfach. Es gibt nur wenige Felder.

| Schauplatz | Beschreibung |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Standardaktualisierungsintervall (Min.) | Dies ist die allgemeine Angabe, wie oft der Feed in Minuten erneut aufgerufen werden soll. Der Standardwert beträgt 60 Minuten. |
| Max Artikel (Standard) | Die Gesamtmenge der zu verarbeitenden Daten kann hier begrenzt werden. |

Dann für jeden neuen Feed:

| Schauplatz | Beschreibung |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Name | Ein Name für den Datenpunkt. Innerhalb eines Ordners darf ein Name nicht zweimal vorkommen. |
| Kategorie | Name für einen Unterordner, in dem der Datenpunkt erscheinen soll. |
| URL | Die vollständige Adresse des Feeds (mit http:// oder https://, siehe Beispiele unten) |
| Aktualisierung (Min.) | Zeit zum Aktualisieren/Laden des Feeds. Für diesen Feed kann ein anderer Wert angegeben werden. Andernfalls wird die allgemeine Vorgabe verwendet. |
| Maximale Anzahl Artikel | Anzahl der Artikel, die im Datenpunkt gespeichert werden sollen. Für diesen Feed kann ein anderer Wert angegeben werden. Andernfalls wird die allgemeine Spezifikation verwendet. |

Wenn Sie die Konfiguration gespeichert und geschlossen haben, finden Sie die Feed-Daten als JSON-Datenpunkt in der Objektstruktur.
Wenn Sie einen Eintrag löschen, werden die Datenpunkte nicht automatisch gelöscht.

## Vis und Widgets
Folgende Widgets existieren tatsächlich

- [`RSS Feed widget 2`](#rss-feed-widget-2) - zur Anzeige eines einzelnen Feeds
- [`RSS Feed Multi widget 3`](#rss-feed-multi-widget-3) - um mehrere aggregierte Feeds in einem Widget anzuzeigen.
- [`RSS Feed Meta Helper`](#rss-feed-meta-helper) - ein Hilfs-Widget zum Untersuchen der Metadaten eines Feeds
- [`RSS Feed Article Helper 2`](#rss-feed-article-helper) - ein Hilfs-Widget zum Untersuchen der Artikeldaten eines Feeds.
- [`RSS Feed Title marquee 4 (deprecated)`](#rss-feed-title-marquee-4-deprecated) - ein Widget zur Anzeige der Überschriften eines Feeds als Laufschrift
- [`RSS Feed Title marquee 5`](#rss-feed-title-marquee-5) - ein Widget zur Anzeige der Überschriften eines Feeds als Laufschrift
- [`JSON Template 3`](#json-template3) - ein Widget, das nichts mit RSS-Feeds zu tun hat, aber die gleiche Technologie verwendet, und mit dem Sie eine benutzerdefinierte Vorlage definieren können, um beliebige JSON-Daten in der Ansicht anzuzeigen.

### RSS-Feed-Widget 2
Dieses Widget zeigt die im Konfigurationsdialog des Adapters abonnierten RSS-Feeds an.
Mithilfe eines Templatesystems lässt sich die Ausgabe nach Bedarf anpassen. Ein einfaches Standardtemplate ist bereits vorhanden.
Beschreibungen der Formatierung und Syntax finden Sie auf den folgenden Seiten.

| Schauplatz | Beschreibung |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rss_oid | Auswahl des Datenpunkts mit dem entsprechenden RSS-Feed. |
| rss_template | Die Vorlage bestimmt das Erscheinungsbild des RSS-Feeds. Alle gültigen HTML-Tags (einschließlich CSS-Attribute in Style-Tags) können in der Vorlage verwendet werden. Zusätzlich gibt es spezielle Tags, in denen die Feed-Daten angezeigt und JavaScript-Anweisungen ausgeführt werden können. Um die Daten und die verwendeten Attributnamen besser identifizieren zu können, gibt es zwei Widgets: den rssfeed Meta Helper und den rssfeed Article Helper. |
| rss_maxarticles | Die maximale Anzahl der aus dem RSS-Feed angezeigten Einzelartikel |
| rss_filter | Für die Filterfunktion können ein oder mehrere Filterkriterien durch Semikolons (;) getrennt in das Feld eingegeben werden. Folgende Artikelattribute werden durchsucht: Titel, Beschreibung, Kategorien. Es werden nur Artikel angezeigt, die einen dieser Begriffe enthalten. |

**Verfügbarkeit der Variable:**

- rss.meta: die Metainformationen des Feeds
- rss.articles: ein Array aller Artikel
- widgetid: die widgetID des Widgets
- Stil: Das Stilobjekt, falls Sie zusätzliche Stilinformationen konfigurieren

Weitere Einzelheiten zu diesen Variablen finden Sie im Kapitel **Verfügbare Variablen**.

Einzelheiten zum Vorlagensystem finden Sie im Kapitel „Vorlagen basierend auf Beispielen“.

### RSS-Feed-Multi-Widget 3
Mit diesem Widget lassen sich mehrere Feeds zu einem einzigen Feed zusammenfassen.
Aufgrund der mehreren Feeds gibt es einige Unterschiede in der Datenverfügbarkeit der Vorlage im Vergleich zum normalen RSS-Feed-Widget.
Die Meta-Variable ist in der Vorlage nicht verfügbar. Allerdings stehen in jedem einzelnen Artikel die drei Meta-Attribute „Titel“ und „Beschreibung“ unter den Namen „meta_title“ und „meta_description“ zur Verfügung.
Zusätzlich kann jedem Feed in den Einstellungen ein allgemeiner Name zugewiesen werden, der in der Vorlage unter dem Namen „meta_name“ in jedem Artikel verfügbar ist, um die Herkunft eines Artikels zu identifizieren.
Ansonsten gelten für die Vorlage dieselben Regeln wie für das RSS-Feed-Widget.

| Setting | Gruppe | Beschreibung |
| --------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rss_feedCount | Allgemeine Gruppe | Hier können Sie die Anzahl der zu konfigurierenden Feeds festlegen. Für jeden Feed wird in vis eine separate Konfigurationsgruppe erstellt. |
| rss_template | | Die Vorlage bestimmt das Erscheinungsbild des RSS-Feeds. Alle gültigen HTML-Tags (einschließlich CSS-Attribute in Style-Tags) können in der Vorlage verwendet werden. Zusätzlich gibt es spezielle Tags, in denen die Feed-Daten angezeigt und JavaScript-Anweisungen ausgeführt werden können. Zur besseren Identifizierung der Daten und der verwendeten Attributnamen stehen zwei Widgets zur Verfügung: der rssfeed Meta Helper und der rssfeed Article Helper. Details zum Vorlagensystem finden Sie im Kapitel „Vorlagen anhand von Beispielen“. |
| rss_dpCount | Allgemeine Gruppe | Hier können Sie die Anzahl der zusätzlichen Datenpunkte angeben, die in der Vorlage verfügbar gemacht werden sollen. |
| rss_dp[Nummer] | Allgemeine Gruppe | Hier können Sie den jeweiligen Datenpunkt auswählen. Der Datenpunkt ist innerhalb der Vorlage unter der Variablen dp verfügbar. Das bedeutet, dass ein Datenpunkt innerhalb der Vorlage wie folgt abgerufen werden kann. Weitere Informationen zu diesen Variablen finden Sie im Kapitel Verfügbare Variablen. |
| rss_oid | Gruppenfeeds[Anzahl] | Auswahl des Datenpunkts mit dem entsprechenden RSS-Feed. |
| rss_name | Gruppenfeeds[Anzahl] | Hier können Sie einen Namen eingeben, der in der Vorlage für jeden Artikel unter dem Attributnamen meta_name verfügbar sein wird. |
| rss_maxarticles | Gruppenfeeds[Anzahl] | Die maximale Anzahl der einzelnen Artikel, die aus dem RSS-Feed angezeigt werden |
| rss_filter | Gruppenfeeds[Anzahl] | Weitere Informationen zu diesen Variablen finden Sie im Kapitel Verfügbare Variablen. Für die Filterfunktion können ein oder mehrere Filterkriterien durch Semikolons (;) getrennt in das Feld eingegeben werden. Die folgenden Artikelattribute werden durchsucht: Titel, Beschreibung, Kategorien. Es werden nur Artikel angezeigt, die einen dieser Begriffe enthalten. |

**Verfügbarkeit der Variable:**

- rss.articles: ein Array aller Artikel.

- Ein Teil der Metainformationen eines Eintrags ist im Artikel als **meta_name**, **meta_title** und **meta_description** verfügbar.

- dp[] als Array, wenn Sie zusätzliche Datenpunkte konfigurieren
- widgetid: die widgetID des Widgets
- Stil: Das Stilobjekt, falls Sie zusätzliche Stilinformationen konfigurieren

### RSS-Feed-Meta-Helper
Dieses Widget dient zur Anzeige der Meta-Attribute eines bestimmten Feeds. Es wird lediglich als Hilfs-Widget verwendet, um eine Vorlage zu erstellen, mit der die Inhalte der RSS-Feed-Daten schnell und einfach angezeigt werden können.
Attribute

| Schauplatz | Beschreibung |
| ------- | ------------------------------------------------------------ |
| rss_oid | Auswahl des Datenpunkts mit dem entsprechenden RSS-Feed. |

### RSS-Feed-Artikelhelfer
Dieses Widget dient zur Anzeige der Artikelattribute eines bestimmten Feeds. Es wird lediglich als Hilfs-Widget verwendet, um eine Vorlage zu erstellen, mit der die Inhalte der RSS-Feed-Daten schnell und einfach angezeigt werden können.

| Schauplatz | Beschreibung |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| rss_oid | Auswahl des Datenpunkts mit dem entsprechenden RSS-Feed. |
| rss_prefix | Um die Verwendung der Attributnamen per Kopieren/Einfügen zu vereinfachen, kann hier der im Template für einen Artikel verwendete Variablenname angegeben werden. |
| rss_article | Mit diesem Attribut kann zwischen den verschiedenen Artikeln im RSS-Feed gewechselt werden. |

### RSS-Feed-Titel-Laufschrift 4 (veraltet)
Mit diesem Widget werden alle Titelattribute als Lauftext angezeigt. Im Zuge der Umstellung von Lauftext-Widget 2 auf 3 handelt es sich nun um ein Multi-Widget, mit dem Sie mehrere RSS-Feeds zusammenfassen können.

| Setting | Gruppe | Beschreibung |
| ---------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rss_feedCount | Allgemeine Gruppe | Hier können Sie die Anzahl der zu konfigurierenden Feeds festlegen. Für jeden zu konfigurierenden Feed wird in vis eine separate Gruppe erstellt. |
| rss_speed | Allgemeine Gruppe | Die Scrollgeschwindigkeit des scrollenden Textes Attribut rss_divider - Allgemeine Gruppe Hier können Sie die Zeichen eingeben, die zur Trennung der Überschriften verwendet werden. Der Standardwert ist +++. |
| rss_pauseonhover | Allgemeine Gruppe | Wenn diese Option aktiviert ist, stoppt der Scrolltext, sobald Sie mit der Maus über den Text fahren. |
| rss_link | Allgemeine Gruppe | Wenn diese Option aktiviert ist, werden die Überschriften als Link angezeigt. Wenn Sie auf eine Überschrift klicken oder tippen, öffnet sich der Link zum Artikel in einem neuen Fenster oder Tab. |
| rss_withtime | Allgemeine Gruppe | Wenn diese Option aktiviert ist, wird die Uhrzeit vor der jeweiligen Überschrift angezeigt. Attribut rss_withdate - Allgemeine Gruppe Wenn diese Option aktiviert ist, werden das Datum ohne Jahr und die Uhrzeit vor der jeweiligen Überschrift angezeigt. |
| rss_withyear | Allgemeine Gruppe | Wenn diese Option aktiviert ist, werden Datum, Jahr und Uhrzeit vor der jeweiligen Überschrift angezeigt. |
| rss_oid | Feeds[Anzahl] Gruppe | Wählen Sie den Datenpunkt mit dem entsprechenden RSS-Feed aus. |
| rss_maxarticles | Feeds[Anzahl] Gruppe | Die maximale Anzahl der einzelnen Artikel, die aus dem RSS-Feed angezeigt werden |
| rss_filter | Feeds[Anzahl] Gruppe | Für die Filterfunktion können ein oder mehrere Filterkriterien durch Semikolons (;) getrennt in das Feld eingegeben werden. Folgende Artikelattribute werden durchsucht: Titel, Beschreibung, Kategorien. Es werden nur Artikel angezeigt, die einen dieser Begriffe enthalten. |

### RSS-Feed-Titel-Laufschrift 5
Mit diesem Widget werden alle Titelattribute als Lauftext angezeigt. Im Zuge der Umstellung von Lauftext-Widget 2 auf 3 handelt es sich nun um ein Multi-Widget, mit dem Sie mehrere RSS-Feeds zusammenfassen können.

| Setting | Gruppe | Beschreibung |
| ---------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rss_feedCount | Allgemeine Gruppe | Hier können Sie die Anzahl der zu konfigurierenden Feeds festlegen. Für jeden zu konfigurierenden Feed wird in vis eine separate Gruppe erstellt. |
| rss_speed | Allgemeine Gruppe | Die Scrollgeschwindigkeit des scrollenden Textes Attribut rss_divider - Allgemeine Gruppe Hier können Sie die Zeichen eingeben, die zur Trennung der Überschriften verwendet werden. Der Standardwert ist +++. |
| rss_pauseonhover | Allgemeine Gruppe | Wenn diese Option aktiviert ist, stoppt der Scrolltext, sobald Sie mit der Maus über den Text fahren. |
| rss_opentype | Allgemeine Gruppe | Auswahl der Art und Weise, wie der Link geöffnet wird: `none`, `link`, `popup` |
| rss_withtime | Allgemeine Gruppe | Wenn diese Option aktiviert ist, wird die Uhrzeit vor der jeweiligen Überschrift angezeigt. Attribut rss_withdate - Allgemeine Gruppe Wenn diese Option aktiviert ist, werden das Datum ohne Jahr und die Uhrzeit vor der jeweiligen Überschrift angezeigt. |
| rss_withyear | Allgemeine Gruppe | Wenn diese Option aktiviert ist, werden Datum, Jahr und Uhrzeit vor der jeweiligen Überschrift angezeigt. |
| rss_oid | Feeds[Anzahl] Gruppe | Wählen Sie den Datenpunkt mit dem entsprechenden RSS-Feed aus. |
| rss_maxarticles | Feeds[Anzahl] Gruppe | Die maximale Anzahl der einzelnen Artikel, die aus dem RSS-Feed angezeigt werden |
| rss_filter | Feeds[Anzahl] Gruppe | Für die Filterfunktion können ein oder mehrere Filterkriterien durch Semikolons (;) getrennt in das Feld eingegeben werden. Folgende Artikelattribute werden durchsucht: Titel, Beschreibung, Kategorien. Es werden nur Artikel angezeigt, die einen dieser Begriffe enthalten. |

### JSON-Vorlage 3
Mit diesem Widget lassen sich beliebige Datenpunkte mit JSON-Daten wie gewünscht darstellen. Die Darstellung erfolgt mithilfe eines Template-Formats, das sich als Kombination aus HTML-Code, JavaScript und speziellen Tags zur Steuerung der JSON-Attribute verstehen lässt. JSON Template 3 unterstützt nun asynchrone Aufrufe mit `await`. JSON Template 2 wird zukünftig nicht mehr unterstützt.

| Schauplatz | Beschreibung |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rss_template | Mit der Vorlage kann das Erscheinungsbild der JSON-Daten bestimmt werden. Alle gültigen HTML-Tags (einschließlich CSS-Attribute in Style-Tags) können in der Vorlage verwendet werden. Es gibt auch spezielle Tags, innerhalb derer die JSON-Daten angezeigt und JavaScript-Anweisungen ausgeführt werden können. |
| json_oid | Auswahl des Datenpunkts mit den entsprechenden JSON-Daten. |

Einzelheiten zum Vorlagensystem finden Sie im Kapitel „Vorlagen basierend auf Beispielen“.

Die JSON-Daten werden zusammen mit den Präfixdaten an die Vorlage übergeben. Zusätzlich steht die aktuelle Widget-ID als Variable zur Verfügung, sodass sie in einzelnen CSS-Anweisungen angegeben werden kann.

#### Erweiterter Anwendungsfall
In den obigen Beispielen wurde nur die reine Ausgabe betrachtet. Die Vorlage kann nun auch mit HTML-Tags angereichert werden, um ein bestimmtes Layout zu erzielen. Hier ist ein Beispiel:

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

```html
<% req = await sendToAsync("admin.0","selectSendTo",{test:"test"}); %> <%- JSON.stringify(req) %> <% async function
sendToAsync(instance, command, sendData) { console.log(`sendToAsync ${command} ${sendData}`); return new
Promise((resolve, reject) => { try { vis.conn.sendTo(instance, command, sendData, function (receiveData) {
resolve(receiveData); }); } catch (error) { reject(error); } }); } %>
```

**Ergebnis:**

```text
[{"label":"Afghanistan","value":"AF"},{"label":"Åland Islands","value":"AX"},{"label":"Albania","value":"AL"}]
```

#### Anwendungsfall für eine datenbankgestützte Aufgabenliste
##### **Einführung**
Dieser Anwendungsfall beschreibt, wie eine Aufgabenliste aus einer MySQL-Datenbank in `ioBroker` mithilfe des `>=rssfeed 3.5.0`-Adapters visualisiert und interaktiv bearbeitet werden kann. Der Fokus liegt auf der Implementierung einer einfachen Statusänderung per Knopfdruck. Dieses Konzept dient als **Proof of Concept (PoC)** und kann in zukünftige Dokumentationen aufgenommen werden.

---

##### **Datenbankstruktur (MySQL)**
Zunächst wird eine MySQL-Datenbank mit dem Namen `test` erstellt. Sie enthält eine Tabelle `test` mit den folgenden Feldern:

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

###### **RSSFeed-Adapter & JSONTemplate-Widget**
Zur Visualisierung verwenden wir das Widget `JSONTemplate`.

**Wichtige Hinweise:**

- In `vis 2` ist das Widget im Adapter `vis-2-widget-ovarious` enthalten.
- Zukünftig soll dieses Widget in `ioBroker.jsontemplate` integriert werden, sobald `bluefox` die Build-Kette stabilisiert hat.

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
    window.jsontemplate = { clicktodo: clicktodo };

    function getButton(id, action) {
        let text = action === 0 ? 'In Progress' : 'Completed';
        return `<button class="btn" onclick="window.jsontemplate.clicktodo(this)" data-id="${id}" data-action="${action}">${text}</button>`;
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

```html
<%- data.onenumber %> <%- data.onetext %>
```

**Ergebnis:**

```text
    123 onetwothree
```

Auf Arrays kann über einen Index zugegriffen werden. Der Index beginnt immer mit 0. Es gibt jedoch auch sogenannte „Dummy-Arrays“, bei denen der Index nicht mit 0 beginnt oder sogar aus Text besteht. Hier gelten die Regeln für Objekte. Im obigen Beispiel wäre das:

**Vorlage:**

```html
<%- data.onearray[0] %> <%- data.onearray[1] %>
```

**Ergebnis:**

```text
    one two
```

Wenn Sie versuchen, ein Array direkt ohne Index auszugeben, gibt die Vorlage alle Elemente durch Kommas getrennt aus.

**Vorlage:**

```html
<%- data.onearray %>
```

**Ergebnis:**

```text
    one,two
```

Arrays können auch aus einer Sammlung von Objekten bestehen. Das hier gezeigte Beispiel enthält nur ein einfaches Array. Ein Beispiel für Arrays mit Objekten wird später gegeben.

**Vorlage:**

```html
<% for (var i = 0; i < data.onearray.length ; i++ ) { %> <%- data.onearray[i] %> <% } %>
```

**Ergebnis:**

```text
    one two
```

**Objekte** können einzelne Attribute, Arrays oder wiederum Objekte enthalten. Das bedeutet, dass JSON-Daten beliebig tief verschachtelt werden können.

Attribute eines Objekts können mit der Punktnotation oder der Klammernotation angesprochen werden. Die Punktnotation funktioniert nur, wenn das Attribut bestimmten Namenskonventionen entspricht (erster Buchstabe, gefolgt von Zahlen, Buchstaben oder Unterstrichen). Die Klammernotation funktioniert auch für Attribute, die dieser Namenskonvention nicht entsprechen.

**Punktnotation:**

**Vorlage:**

```html
<%- data.oneobject.attribute1 %>
```

**Notation in Klammern:**

**Vorlage:**

```html
<%- data.oneobject["attribute1"] %>
```

**Ergebnis für beide Beispiele:**

```text
    1
```

Iteriere über die Attribute eines Objekts

**Vorlage:**

```html
<% for (var prop in data.oneobject) { %> <%- "data.oneobject." + prop + " = " + data.oneobject[prop] %> <% } %>
```

**Ergebnis:**

```text
    data.oneobject.attribute1 = 1
    data.oneobject.attribute2 = 2
```

## Verfügbare Variablen in Vorlagen
### `rss.meta`
Hier sind alle Metainformationen zum Feed enthalten. Folgende Inhalte stehen zur Verfügung. Die Kennungen sind vermutlich selbsterklärend. In der Hilfe beschreibe ich sie genauer. Alternativ können Sie den Inhalt angeben (teilweise als Array). Nur im RSS-Feed-Widget 2 ist ein vollständiger Satz der Metainformationen verfügbar.

Die Verwendung im Template ist unter **Vorlage basierend auf einem Beispiel** zu sehen.

- `meta.title`
- `meta.description`
- `meta.link`
- `meta.xmlurl`
- `meta.date`
- `meta.pubdate`
- `meta.author`
- `meta.language`
- `meta.image`
- `meta.favicon`
- `meta.copyright`
- `meta.generator`
- `meta.categories`

### `rss.articles or articles`
Es handelt sich um ein Array mit einzelnen Elementen (JavaScript-Array). Jedes Element besitzt die folgenden Eigenschaften.
Damit es beispielsweise passt, setze ich das Präfix „item“ davor. Sie können dies aber auch selbst wählen. Es muss lediglich in der Schleife (forEach) entsprechend benannt werden. Auch hier sind die Bezeichner selbsterklärend. Nicht alle Attribute werden in jedem Feed ausgefüllt. Die wichtigsten sind bereits in der obigen Vorlage enthalten.

Die Artikel sind als rss.articles im RSS-Feed-Widget 2 und als Artikel im RSS-Feed-Multi-Widget 3 verfügbar.

Die Verwendung im Template ist unter **Vorlage basierend auf einem Beispiel** zu sehen.

- `item.title`
- `item.description`
- `item.summary`
- `item.link`
- `item.origlink`
- `item.permalink`
- `item.date`
- `item.pubdate`
- `item.author`
- `item.guid`
- `item.comments`
- `item.image`
- `item.categories`
- `item.source`
- `item.enclosures`

## Vorlage basierend auf Beispielen
### Basisvorlage RSS-Feed-Widget 2
Die folgende Vorlage wird aktuell standardmäßig im RSS-Feed-Widget 2 verwendet. Sie wurde mit den folgenden Feeds getestet.

- <http://www.tagesschau.de/xml/rss2> oder
- <https://www.bild.de/rssfeeds/rss3-20745882,feed=alles.bild.html>

```html
<!--
    available variables:
    widgetid      ->  id of the widget
    rss.meta      ->  all meta informations of an feed, details see Meta Helper widget
    rss.articles  ->  all articles as array, details see Article Helper widget
    style         ->  all style settings for the widget

    all variables are read only
    -->
<style>
    #<%- widgetid % > img {
        width: calc(<%- style.width %> - 15px);
        height: auto;
    }
    #<%- widgetid % > img.rssfeed {
        width: auto;
        height: auto;
    }
</style>
<p><%- rss.meta.title %></p>
<% rss.articles.forEach(function(item){ %>
<div class="article">
    <p><small><%- vis.formatDate(item.pubdate, "TT.MM.JJJJ SS:mm") %></small></p>
    <h3><%- item.title %></h3>
    <p><%- item.description %></p>
    <div style="clear:both;"></div>
</div>
<% }); %>
```

### Basisvorlage RSS-Feed Multi-Widget 3
Die folgende Vorlage wird aktuell standardmäßig im RSS-Feed-Multi-Widget 3 verwendet. Bitte beachten Sie geringfügige Unterschiede in der Verwendung der Variablen. Sie wurde mit den folgenden Feeds getestet.

```html
<!--
    available variables:
    widgetid      ->  id of the widget
    articles      ->  all articles as array, details see Article Helper widget
                      only subset of meta information of the feed is available as
                      articles[0].meta_name
                      articles[0].meta_title
                      articles[0].meta_description
    style         ->  all style settings for the widget
    dp[]          ->  array of addition configured datapoints

    all variables are read only
    -->
<style>
    #<%- widgetid % > img {
        width: calc(<%- style.width || '230px' %> - 15px);
        height: auto;
    }
    #<%- widgetid % > img.rssfeed {
        width: auto;
        height: auto;
    }
</style>
<% rss.articles.forEach(function(item){ %>
<p><%- item.meta_name || item.meta_title || '' %></p>
<p><small><%- vis.formatDate(item.pubdate, "TT.MM.JJJJ SS:mm") %></small></p>
<h3><%- item.title %></h3>
<p><%- item.description %></p>
<div style="clear:both;" />
<% }); %>
```

### Beispielvorlage für RSS-Feed-Multi-Widget 3 mit Artikeln als Diashow und Zurück-/Weiter-Schaltflächen
```html
<!--
 available variables:
 widgetid      ->  id of the widget
 rss.articles  ->  all articles as array, details see Article Helper widget
 style         ->  all style settings for the widget

 all variables are read only
-->

<style>
    #<%- widgetid % > img {
        width: calc(<%- style.width || '230px' %> - 15px);
        height: auto;
    }
    #<%- widgetid % > img.rssfeed {
        width: auto;
        height: auto;
    }

    .container {
        overflow: hidden;
        height: 100%;
    }
    .content {
        position: relative;
        border: 1px solid #ccc;
        overflow: scroll;
        height: 90%;
    }

    .slide {
        position: absolute;
        display: none;
    }

    .slide.active {
        display: contents;
    }

    .controls {
        margin-top: 10px;
    }
</style>

<div class="container">
    <div class="content">
        <% rss.articles.forEach(function(item){ %>
        <div class="article slide">
            <p>
                <small><%- vis.formatDate(item.pubdate, "TT.MM.JJJJ SS:mm") %></small>
            </p>
            <h3><%- item.title %></h3>
            <p><%- item.description %></p>
            <div style="clear:both;"></div>
        </div>
        <% }); %>
    </div>
    <div class="controls">
        <button onclick="prevSlide()">Zurück</button>
        <button onclick="nextSlide()">Weiter</button>
    </div>
</div>

<script>
    currentSlide = 0;
    slides = document.querySelectorAll('.slide');

    function showSlide(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
    }

    function prevSlide() {
        currentSlide = currentSlide > 0 ? currentSlide - 1 : slides.length - 1;
        showSlide(currentSlide);
    }

    function nextSlide() {
        currentSlide = currentSlide < slides.length - 1 ? currentSlide + 1 : 0;
        showSlide(currentSlide);
    }
    showSlide(currentSlide);
</script>
```

### Beispielvorlage und detaillierte Beschreibung
```html
<%= meta.title %> <% articles.forEach(function(item){ %>
<p><small><%- vis.formatDate(item.pubdate, "TT.MM.JJJJ SS:mm") %></small></p>
<h3><%- item.title %></h3>
<p><%- item.description %></p>
<div style="clear:both;" />
<% }); %>
```

Kurzbeschreibung der einzelnen Zeilen: Z1: Ausgabe des Feed-Titels. Z2: Keine Ausgabe. JavaScript-Befehl zum Durchlaufen aller Artikel. Bei jedem Durchlauf wird das aktuelle Element der Variablen `item` zugewiesen.

Z3: Ausgabe von Datum und Uhrzeit. Formatiert mit einem `<p>`-Tag. Die Datumsformatierungsfunktion von `vis` wird verwendet. Eine Beschreibung finden Sie im Adapter `vis`.

Z4: Ausgabe des Artikel-Titels. Formatiert mit einem `<head>`-Tag.

Z5: Ausgabe des Artikel-Inhalts. Eingeschlossen mit einem `<p>`-Tag. Hier wird, zumindest in den beiden Beispielen, HTML-Code eingebunden, der üblicherweise ein Bild und einen beschreibenden Text enthält.
Z6: Ausgabe eines `<div>`-Tags, der die spezielle Formatierung im `feed-html` entfernt (in den Beispielen für `tagesschau` und `bild` erforderlich; bei anderen Feeds möglicherweise nicht).

Z7: Keine Ausgabe. Diese Zeile schließt die JavaScript-Schleife. Alles, was zwischen Z2 und Z7 definiert wurde, wird für jeden einzelnen Artikel wiederholt.

## Todo
- Nicht verwendete Einträge im Datenpunkt info.lastRequest werden durch Speichern im Admin-Dialog bereinigt.
- Schaltfläche zum Bereinigen nicht verwendeter Datenpunkte im Admin-Dialog
- ~~RSS-Feeds für mehrere Widgets~~
- ~~Multi-Widget-Laufschrift~~
- ~~Weitere Datenpunkte im Template verfügbar machen.~~
- ~~Widget für Laufschrift mit den Titeln <https://forum.iobroker.net/topic/31242/nachrichten-ticker-newsticker-via-php-in-vis-einbinden/2>~~

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 4.0.3 (2026-03-26)

- Update packages
- fix repochecker

### 4.0.2 (2026-03-07)

- fix repochecker

### 4.0.1 (2026-03-07)

- fix repochecker

### 4.0.0 (2026-03-05)

- update packages
- remove deprecated widgets

### 3.6.1 (2025-09-22)

- remove dist/ folder from lint

### 3.6.0 (2025-09-22)

- revert to node 18
- remove deprecated marquee4 widget
- improve widget build
- integrate translations and css into build process
- remove unused css
- deprecate JSON-Template widgets, please use new adapter iobroker.vis-jsontemplate
- add message for the update to inform users

### 3.5.2 (2025-03-20)

- improve build

### 3.5.1 (2025-03-20)

- improve build

### 3.5.0 (2025-03-18)

- make async function calls available in templates

### 3.4.1 (2025-02-18)

- fix eslint
- introducing a new attribute opentype to open the links in the marquee widget

### 3.3.1 (2025-01-23)

- add an accept request header, because axios send only application/json

### 3.3.0 (2025-01-21)

- upgrade version js-controller
- switch from request to axios

### 3.2.0 (2024-11-27)

- update jsonconfig responsive
- switch to iobroker/eslint
- improver adapter code
- improve widget code

### 3.1.0 (2024-08-11)

- adjust dependency to js-controller in a minor release

### 3.0.2 (2024-08-09)

- add keyword in package.json

### 3.0.1 (2024-08-09)

- add template example for articles as a Diashow
- adjust dependency to js-controller

### 3.0.0 (2024-07-24)

- update multifeed widget 3 and deprecate multifeed widget 2
- breaking change: in rssfeed widget 2: articles and meta have to be changed to rss.articles and rss.meta

### 2.10.0 (2024-07-11)

- fine tuning on templates and available variables
- fine tuning on format and translation
- move widget documentation form doc.html to readme

### 2.9.10 (2024-07-11)

- update images for dark and light theme

### 2.9.9 (2024-07-11)

- update packages
- update formating and improve error logging
- remove detailed sentry status reporting
- fix subscribing states

### 2.9.8 (2024-07-09)

- ignore widgets in vis-2
- add restart vis/vis2

### 2.9.7 (2024-06-22)

- formating code
- remove common.main from io-package.json

### 2.9.6 (2024-06-06)

- fix branch name in link

### 2.9.4 (2024-06-05)

- test release after rename branch from master to main

### 2.9.3 (2024-06-05)

- switch branchname from master to main
- add node 22 to tests

### 2.9.2 (2024-06-04)

- add some translations
- fix warning from adapter checker

### 2.9.1 (2024-06-03)

- update iobroker files and settings

### 2.8.2 (2024-04-21)

- (bluefox) Fixed loading of words.js in vis

### 2.8.1 (2023-03-15)

- (bluefox) Corrected vis widget
- admin changed to jsonConfig, dev-environment now devcontainer

### 2.7.0 (2022-12-11)

### 2.6.1 (2022-07-30)

- added more information to sentry

### 2.6.0 (2022-07-26)

- added sentry

### 2.4.0 (2022-07-25)

- added name option to marquee widget

### 2.0.0

- Rework of the admin dialog
- Fix some errors and glitches

### 1.0.0

- Released in stable

### 0.9.0

- fixed/extended json template

### 0.8.0

- adapted configuration pages to react.
- Prepared for stable release

### 0.0.30

- added some template examples to the widget documentation

### 0.0.29

- improved error messages
- removed deprecated widget / change widget beta flag
- changed createObject/setState logic due iobroker-controller >3.0

### 0.0.28

- removed customtab

### 0.0.27

- adapter configuration is now editable

### 0.0.26

- corrected changelog size

### 0.0.25

- the error messages for the template are improved

### 0.0.24

- errors in the request of feeds are now real errors in the iobroker log
- loading of rules for ejs in the editor is improved
- marquee3 widget: options to show time and date

### 0.0.23

- republish to npm

### 0.0.22

- improvements in the configuration dialog
- remove unused admintab
- new RSS Feed multi widget. in this widget you can add your one or more datapoints, that are available in the template.
- New marquee widget 3 replaces the existing marquee widget 2.The marquee widget 3 is now a multi widget and can handle more than one feed. The Headlines are now aggregated.
- the existing widget JSON template is improved. in this widget you can add your one or more datapoints, that are available in the template.
- Remove several deprecated widgets (RSS Feed widget 1, Article Helper 1, Marquee 1, JSON template 1)

### 0.0.21

- add link option to marquee widget
- widget help added
- marquee widget: the divider characters (default: +++) are configurable

### 0.0.20

- add ejs syntax to template editor

### 0.0.19

- try to fix marquee widget.

### 0.0.18

- try to fix the wrong NoSave dialog

### 0.0.17

- rework setting objects and states

### 0.0.16

- improve logic adding rssfeed in configuration dialog
- fix wrong icon for marquee widget
- define default template for rssfeed widget
- deprecate existing and replace with new version of widgets to improve naming of the attributes in case of translation
- widget rss marquee: replace duration attribute with speed attribute and improved the calculation algorithm. now same number is same speed regardless of the length of the titles

### 0.0.15

- fix bug saving last request in adapter configuration / improve debug messages

### 0.0.14

- update package.json and install new tools for stream encoding/decoding detection
- implement encoding detection and stream encoding
- change the ejs lib with a real browserified lib

### 0.0.13

- new widget as a guest, because it is not directly related to the rssfeed functionality, but reuse the same code base. maybe later i transfer it to an own adapter. the new widget can take a json datapoint and you can visualize the data with the ejs template system.

### 0.0.12

- now you can download the adapter configuration in the admin dialog. upload is not possible due to security restrictions in modern browsers.

### 0.0.11

- improve admin layout
- implement a forceRefresh button

### 0.0.10

- fix bug a bug in marquee widget. not all styles should applied to the span tag.

### 0.0.9

- apply widget styles also to the inner span element, because they had not any effect on the marquee.
- renew the package-lock.json
- add categories to save feeds in subfolders
- improve mechanism to write only updated feeds to datapoint. the feed has new data if comparision of articles in title and description is different.

### 0.0.8

- improve lasrequest logic of the adapter
- fix problem with datapoint naming

### 0.0.7

- test with encapsulation of ejs.js, because of error in some browsers

### 0.0.6

- add attribute duration for widget marquee to control animation duration

### 0.0.5

- new widget marquee for article titles
- add filter function for articles. the filter searches in title,description and categories, several filter criteria can be seperated by semicolon

### 0.0.4

- some adjustments in readme, io-package

### 0.0.3

- add addveyor build

### 0.0.2

- added widgets meta helper and article helper

### 0.0.1

- initial release

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