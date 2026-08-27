---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.rssfeed/README.md
title: ioBroker-Adapter zum Anfordern und Anzeigen von RSS-Feeds verschiedener Standards (Atom, RSS, RDF)
hash: gYPr8Us8B9sbVLLHR2QerYrdr30P2BiUih3NRe3LRBk=
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

## Inhaltsverzeichnis
- [Übersicht](#overview)
- [Konfiguration](#configuration)
- [vis and widgets](#vis-and-widgets)
- [RSS-Feed-Widget 2](#rss-feed-widget-2)
- [RSS Feed Multi Widget 3](#rss-feed-multi-widget-3)
- [RSS Feed Meta Helper](#rss-feed-meta-helper)
- [RSS-Feed-Artikel-Helper](#rss-feed-article-helper)
- [RSS Feed Title marquee 4 (deprecated)](#rss-feed-title-marquee-4-deprecated)
- [RSS Feed Title marquee 5](#rss-feed-title-marquee-5)
- [Templatesystem](#templatesystem)
- [Sehr wichtiger Hinweis zur Verwendung in vis / vis-2](#very-important-note-for-use-in-vis--vis-2)
- [Tags](#tags)
- [Verfügbare Variablen in Vorlagen](#available-variables-in-templates)
- [Vorlage basierend auf Beispielen](#template-based-on-examples)
- [Todo](#todo)
- [Änderungsprotokoll](#changelog)
- [Lizenz](#Lizenz)

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
| User-Agent | Optional, aber empfohlen. Dies ist der User-Agent, der beim Anfordern des Feeds verwendet wird. |

Zum Zeitpunkt der Veröffentlichung ist dies der Standardwert. Sie können diesen jährlich aktualisieren, falls Probleme mit RSS-Feed-Anfragen auftreten.

```text
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36
```

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
Dieser Anwendungsfall beschreibt, wie man eine Aufgabenliste aus einer MySQL-Datenbank in `ioBroker` mithilfe des `>=rssfeed 3.5.0`-Adapters visualisiert und interaktiv bearbeitet. Der Fokus liegt auf der Implementierung einer einfachen Statusänderung per Knopfdruck. Dieses Konzept dient als **Proof of Concept (PoC)** und kann in zukünftige Dokumentationen aufgenommen werden.

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
### Sehr wichtiger Hinweis zur Verwendung in vis / vis-2
#### Geschweifte Klammern in CSS und JSON
Der Bindungsmechanismus in vis / vis-2 verwendet das Muster `{ ... }`, um Bindungsausdrücke in HTML zu erkennen.
Daher müssen geschweifte Klammern bei der Angabe von CSS oder JSON immer in separaten Zeilen stehen. Andernfalls wird der Inhalt des vis-Widgets mit `undefined` überschrieben.

##### Beispiel
```text
#w_id_<%- widgetid %> { height: 100%; display: flex; flex-direction: column; overflow: hidden; }
```

muss wie folgt geschrieben werden:

```text
#w_id_<%- widgetid %> {
    height: 100%; display: flex; flex-direction: column; overflow: hidden;
}
```

#### Verwendung von setInterval
Bitte verwenden Sie nicht `setInterval`. Da die Vorlage bei jeder Datenpunktänderung neu aufgerufen wird, können vorhandene `setInterval`-Aufrufe nicht ordnungsgemäß gelöscht werden. Dadurch häufen sich mit der Zeit immer mehr überlappende `setInterval`-Aufrufe an, was RAM verbraucht und zu unvorhersehbaren Nebenwirkungen führen kann. Zwar lässt sich das Problem durch Neuladen der Seite beheben, der Code sollte jedoch nicht auf diese Weise implementiert werden.
Alternativ sollten solche Szenarien mit `setTimeout` implementiert werden.

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

```ejs
<!--
    available variables:
    widgetid      ->  id of the widget
    rss.meta      ->  all meta informations of an feed, details see Meta Helper widget
    rss.articles  ->  all articles as array, details see Article Helper widget
    style         ->  all style settings for the widget

    all variables are read only
    -->
<style>
    #<%- widgetid %> img {
        width: calc(<%- style.width %> - 15px);
        height: auto;
    }
    #<%- widgetid %> img.rssfeed {
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

```ejs
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
    #<%- widgetid %> img {
        width: calc(<%- style.width || '230px' %> - 15px);
        height: auto;
    }
    #<%- widgetid %> img.rssfeed {
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
```ejs
<!--
 available variables:
 widgetid      ->  id of the widget
 rss.articles  ->  all articles as array, details see Article Helper widget
 style         ->  all style settings for the widget

 all variables are read only
-->

<style>
    #<%- widgetid %> img {
        width: calc(<%- style.width || '230px' %> - 15px);
        height: auto;
    }
    #<%- widgetid %> img.rssfeed {
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

[Older changelogs can be found there](CHANGELOG_OLD.md)

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- update ejs and update prepare mechanism

### 4.1.2 (2026-06-10)

- fix package lock

### 4.1.0 (2026-06-10)

- fix repochecker

### 4.0.4-alpha.0 (2026-06-09)

- add user agent to settings and axios request

### 4.0.3 (2026-03-26)

- Update packages
- fix repochecker

### 4.0.2 (2026-03-07)

- fix repochecker

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