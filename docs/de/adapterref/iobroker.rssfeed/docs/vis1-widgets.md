---
chapters: {"pages":{"en/adapterref/iobroker.rssfeed/README.md":{"title":{"en":"ioBroker Adapter to request and show RSS Feeds of different standards (Atom, RSS, RDF)"},"content":"en/adapterref/iobroker.rssfeed/README.md"},"en/adapterref/iobroker.rssfeed/docs/vis1-widgets.md":{"title":{"en":"VIS 1 widgets"},"content":"en/adapterref/iobroker.rssfeed/docs/vis1-widgets.md"},"en/adapterref/iobroker.rssfeed/docs/vis2-widgets.md":{"title":{"en":"VIS 2 widgets"},"content":"en/adapterref/iobroker.rssfeed/docs/vis2-widgets.md"},"en/adapterref/iobroker.rssfeed/docs/ejs-templates.md":{"title":{"en":"EJS template notation"},"content":"en/adapterref/iobroker.rssfeed/docs/ejs-templates.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.rssfeed/docs/vis1-widgets.md
title: VIS 1-Widgets
hash: jrL+DrTBbxa+iMeMuBaJ9iWjy9qq8JZ4Bmb7WUNWbw8=
---
# VIS 1-Widgets

[Zurück zur Haupt-README](/#/adapters/rssfeed#vis-1-widgets)

Das klassische VIS 1-Widget-Set liest die vom RSSFeed-Adapter erzeugten JSON-Zustände. Diese Anleitung beschreibt jedes Widget und jede Option des zugehörigen VIS-Eigenschafteneditors. Die Optionsnamen sind aufgeführt, um das Verständnis und die Migration bestehender Ansichten zu erleichtern.

## RSS-Feed-Widget 2

Dieses Widget für einen einzelnen Feed liest einen RSS-Feed-Status, beschränkt oder filtert optional dessen Artikel und rendert das Ergebnis mit einer bearbeitbaren EJS-Vorlage. Verwenden Sie es, wenn ein Feed ein vollständig individualisiertes Layout haben soll.

| Einstellung       | Standard                 | Beschreibung                                                                                                                                                                                                          |
| ----------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rss_oid`         | Keiner                   | Wählt den Bundesstaat aus, der die RSSFeed-JSON-Daten enthält.                                                                                                                                                        |
| `rss_template`    | Integrierte Feedvorlage  | Steuert die gesamte HTML-Ausgabe. Der Editor öffnet einen größeren EJS-Bearbeitungsdialog.                                                                                                                            |
| `rss_maxarticles` | Alle verfügbaren Artikel | Legt fest, wie viele der ersten Artikel an die Vorlage übergeben werden. Werte unten`1` werden behandelt als`1` Die                                                                                                   |
| `rss_filter`      | Leer                     | Suchbegriffe werden durch Semikolon getrennt. Ein Artikel wird gespeichert, wenn mindestens ein Begriff im Titel, in der Beschreibung oder in den Kategorien vorkommt. Groß- und Kleinschreibung wird nicht beachtet. |

### Vorlagendaten

| Ausdruck       | Beschreibung                                                                                      |
| -------------- | ------------------------------------------------------------------------------------------------- |
| `rss.meta`     | Metadaten des ausgewählten Feeds. Die vom Feed bereitgestellten Felder finden Sie im Meta-Helper. |
| `rss.articles` | Liste der Artikel, die nach Anwendung von Limit und Filter verbleiben.                            |
| `widgetid`     | ID dieses VIS-Widgets. Nützlich für CSS-Selektoren, die nur dieses Widget betreffen sollen.       |
| `style`        | VIS-Stileinstellungen dieses Widgets.                                                             |
| `vis`          | VIS-Laufzeitobjekt, zum Beispiel für`vis.formatDate(...)` Die                                     |

Die Artikelbegrenzung wird vor dem Filter angewendet. Ein Filter kann daher weniger sichtbare Artikel erzeugen als die konfigurierte maximale Anzahl. Template-Fehler werden im Widget rot dargestellt. Das Widget aktualisiert sich automatisch, wenn sich der Status des ausgewählten RSS-Feeds in der Ansicht ändert.

```ejs
<h2><%= meta.title || "" %></h2>
<% articles.forEach(function (item) { %>
    <article>
        <small><%= vis.formatDate(item.pubdate || item.date, "TT.MM.JJJJ SS:mm") %></small>
        <h3><%= item.title || "" %></h3>
        <div><%- item.description || "" %></div>
    </article>
<% }); %>
```

`description` wird emittiert mit`<%-` Da Feed-Beschreibungen häufig HTML enthalten, sollten Sie dies nur für vertrauenswürdige Feeds tun. Informationen zur EJS-Sprache selbst finden Sie unter [EJS-Template-Notation](/#/docs/adapterref/iobroker.rssfeed/docs/ejs-templates.md) .

## RSS-Feed-Multi-Widget 3

Dieses Widget führt mehrere Feeds zu einer Liste zusammen, sortiert alle gesammelten Artikel vom neuesten zum ältesten und stellt sie mit einer EJS-Vorlage dar. Jeder Feed kann einen eigenen Namen, ein eigenes Limit und einen eigenen Filter haben. Zusätzliche ioBroker-Status können ebenfalls in die Vorlage eingebunden werden.

| Einstellung     | Standard                              | Beschreibung                                                                                            |
| --------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `rss_feedCount` | `1`                                   | Anzahl der im Eigenschafteneditor angezeigten Feedgruppen.                                              |
| `rss_template`  | Integrierte Mehrfachzuführungsvorlage | Steuert die vollständige HTML-Ausgabe der kombinierten Liste.                                           |
| `rss_dpCount`   | `1`                                   | Anzahl der im Eigenschafteneditor angezeigten zusätzlichen Datenpunktfelder.                            |
| `rss_dpN`       | Keiner                                | Wählt zusätzliche Bundeslandnummer aus`N` Sein aktueller Wert wird zur Verfügung gestellt durch`dp` Die |

### Einstellungen für jeden Feed RSS-Feed Multi-Widget 3

`N` ist die Zufuhrnummer von`1` durch`rss_feedCount` Die

| Einstellung        | Standard                 | Beschreibung                                                                                                                                                                                        |
| ------------------ | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rss_oidN`         | Keiner                   | Zustand, der die RSSFeed-JSON-Daten für den Feed enthält`N` Die                                                                                                                                     |
| `rss_nameN`        | Leer                     | Optionaler Anzeigename. Er wird jedem Artikel dieses Feeds hinzugefügt als`meta_name` Die                                                                                                           |
| `rss_maxarticlesN` | Alle verfügbaren Artikel | Maximale Anzahl der aus diesem Feed abgerufenen Artikel. Werte unten`1` werden behandelt als`1` Die                                                                                                 |
| `rss_filterN`      | Leer                     | Durch Semikolon getrennte, nicht zwischen Groß- und Kleinschreibung unterscheidende Begriffe werden mit Titel, Beschreibung und Kategorien abgeglichen. Mindestens ein Begriff muss übereinstimmen. |

### Vorlagendaten und Mehrfachfeed-Felder

| Ausdruck                   | Beschreibung                                                                                              |
| -------------------------- | --------------------------------------------------------------------------------------------------------- |
| `rss.articles`             | Kombiniertes Array, sortiert nach`date` vom neuesten zum ältesten.                                        |
| `item.meta_name`           | Name für den Quellfeed eingegeben.                                                                        |
| `item.meta_title`          | Originaltitel aus den Metadaten dieses Feeds.                                                             |
| `item.meta_description`    | Originalbeschreibung aus den Metadaten dieses Feeds.                                                      |
| `dp["state.id"]`           | Aktueller Wert eines zusätzlich konfigurierten Zustands, adressiert durch seine vollständige Zustands-ID. |
| `widgetid` ,`style` ,`vis` | Widget-ID, VIS-Stile und das VIS-Laufzeitobjekt.                                                          |

Im Gegensatz zum Einzelzuführungs-Widget, einem gängigen`rss.meta` Dieses Objekt kann nicht alle Quellfeeds repräsentieren. Verwenden Sie die drei`meta_*` Stattdessen werden jedem Artikel Felder zugeordnet. VIS 1 behält die übrigen ursprünglichen Artikeleigenschaften bei, sodass auch die vom Artikel-Assistenten angezeigten Felder verwendet werden können. Die Beschränkung wird vor dem Filter für jeden Feed angewendet.

```ejs
<% rss.articles.forEach(function (item) { %>
    <article>
        <strong><%= item.meta_name || item.meta_title || "" %></strong>
        <h3><%= item.title || "" %></h3>
        <div><%- item.description || "" %></div>
    </article>
<% }); %>
```

## RSS-Feed-Meta-Helper

Der Meta-Helper ist ein Referenz-Widget. Wählen Sie einen Feed aus, und er zeigt die Metadatenfelder und ihre aktuellen Werte in einer Tabelle an. So erfahren Sie am schnellsten, welche Felder ein bestimmter Feed tatsächlich bereitstellt, bevor Sie diese in einer Vorlage für einen einzelnen Feed verwenden.

| Einstellung | Standard | Beschreibung                                                               |
| ----------- | -------- | -------------------------------------------------------------------------- |
| `rss_oid`   | Keiner   | Wählt den Staat aus, der die zu untersuchenden RSSFeed-JSON-Daten enthält. |

Die Tabelle zeigt`meta.title` ,`description` ,`link` ,`xmlurl` ,`date` ,`pubdate` ,`author` ,`language` ,`image.url` ,`image.title` ,`favicon` ,`copyright` ,`generator` , Und`categories` RSS-Formate und -Anbieter variieren, daher kann ein Feld leer sein, obwohl es in der Hilfsfunktion aufgeführt ist. Die Tabelle wird aktualisiert, sobald sich der ausgewählte Status ändert.

## RSS-Feed-Artikel-Assistent 2

Der Artikel-Assistent zeigt alle bekannten Felder eines Artikels als Tabelle an. Wählen Sie eine Artikelnummer aus, prüfen Sie die verfügbaren Werte und kopieren Sie beim Erstellen einer Vorlage den Feldnamen aus der linken Spalte.

| Einstellung   | Standard | Beschreibung                                                                                                                                        |
| ------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rss_oid`     | Keiner   | Wählt den Staat aus, der die zu untersuchenden RSSFeed-JSON-Daten enthält.                                                                          |
| `rss_prefix`  | `item`   | Präfix, das vor jedem Feldnamen angezeigt wird, zum Beispiel`item.title` Setzen Sie es auf den Variablennamen, der in Ihrer Vorlage verwendet wird. |
| `rss_article` | `1`      | Artikelnummer basierend auf einer Einheit.`1` wählt den ersten Artikel aus; Werte darunter`1` werden behandelt als`1` Die                           |

Die Helferlisten`title` ,`description` ,`summary` ,`link` ,`origlink` ,`permalink` ,`date` ,`pubdate` ,`author` ,`guid` ,`comments` ,`image.url` ,`image.title` ,`categories` ,`source` , Und`enclosures` Die`source` Und`enclosures` Die Ergebnisse werden als JSON angezeigt. Sobald die angeforderte Anzahl das Ende des Feeds überschreitet, meldet der Helfer die Anzahl der verfügbaren Artikel. Das Präfix ändert lediglich die angezeigten Bezeichnungen; die RSS-Daten selbst bleiben unverändert.

## RSS-Feed-Titel-Laufschrift 5

Die Titelleiste kombiniert Artikelüberschriften aus einem oder mehreren Feeds zu einem kontinuierlich laufenden Ticker. Alle Artikel sind vom neuesten zum ältesten sortiert. Der Ticker kann Datum und Quellennamen hinzufügen und Überschriften mit ihrer Quelle öffnen.

| Einstellung        | Standard                  | Beschreibung                                                                                                                                                               |
| ------------------ | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rss_feedCount`    | `1`                       | Anzahl der im Eigenschafteneditor angezeigten Feedgruppen.                                                                                                                 |
| `rss_speed`        | `1` in einem neuen Widget | Steuert die Bewegungsgeschwindigkeit. Die Textlänge wird durch diesen Wert geteilt, um die Animationsdauer zu berechnen; je größer der Wert, desto schneller die Bewegung. |
| `rss_divider`      | `+++`                     | Text, der vor jeder Überschrift eingefügt wird.                                                                                                                            |
| `rss_pauseonhover` | Ermöglicht                | Der Ticker wird angehalten, solange sich der Mauszeiger darüber befindet. Das Verhalten kann je nach Touchscreen variieren.                                                |
| `rss_opentype`     | `none`                    | `none` zeigt Klartext an`link` öffnet den Artikel in einem Browserziel, und`popup` öffnet es in einem iFrame-Dialog.                                                       |
| `rss_withtime`     | Deaktiviert               | Fügt die Artikelzeit hinzu.                                                                                                                                                |
| `rss_withdate`     | Deaktiviert               | Fügt Tag, Monat und Uhrzeit hinzu. Dies hat Vorrang vor`rss_withtime` Die                                                                                                  |
| `rss_withyear`     | Deaktiviert               | Fügt Tag, Monat, zweistellige Jahreszahl und Uhrzeit hinzu. Diese Angabe hat Vorrang vor den anderen Datums-/Uhrzeitoptionen.                                              |
| `rss_withname`     | Deaktiviert               | Fügt hinzu`rss_nameN` oder, falls kein Name eingegeben wurde, der Feed-Titel vor jeder Überschrift.                                                                        |

### Einstellungen für jeden Feed RSS-Feed-Titel Laufschrift 5

| Einstellung        | Standard                 | Beschreibung                                                                                                                                            |
| ------------------ | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rss_oidN`         | Keiner                   | Status, der RSSFeed-JSON-Daten für den Feed enthält`N` Die                                                                                              |
| `rss_nameN`        | Leer                     | Optionaler Quellname, der verwendet wird, wenn`rss_withname` ist aktiviert.                                                                             |
| `rss_maxarticlesN` | Alle verfügbaren Artikel | Maximale Anzahl der aus diesem Feed entnommenen Artikel. Werte unten`1` werden behandelt als`1` Die                                                     |
| `rss_filterN`      | Leer                     | Durch Semikolon getrennte, nicht zwischen Groß- und Kleinschreibung unterscheidende Begriffe wurden mit Titel, Beschreibung und Kategorien abgeglichen. |

Beim Lauftext erfolgt die Filterung vor der Begrenzung. Im Popup-Modus wird der externe Artikel in einem iFrame eingebettet; Herausgeber können dies mithilfe von Browser-Sicherheitsheadern verhindern. Der Ticker verwendet die VIS-Text- und Hintergrundfarben des Widgets und wendet die meisten anderen konfigurierten Textstile auf seinen bewegten Text an.