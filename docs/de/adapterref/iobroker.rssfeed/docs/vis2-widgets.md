---
chapters: {"pages":{"en/adapterref/iobroker.rssfeed/README.md":{"title":{"en":"ioBroker Adapter to request and show RSS Feeds of different standards (Atom, RSS, RDF)"},"content":"en/adapterref/iobroker.rssfeed/README.md"},"en/adapterref/iobroker.rssfeed/docs/vis1-widgets.md":{"title":{"en":"VIS 1 widgets"},"content":"en/adapterref/iobroker.rssfeed/docs/vis1-widgets.md"},"en/adapterref/iobroker.rssfeed/docs/vis2-widgets.md":{"title":{"en":"VIS 2 widgets"},"content":"en/adapterref/iobroker.rssfeed/docs/vis2-widgets.md"},"en/adapterref/iobroker.rssfeed/docs/ejs-templates.md":{"title":{"en":"EJS template notation"},"content":"en/adapterref/iobroker.rssfeed/docs/ejs-templates.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.rssfeed/docs/vis2-widgets.md
title: VIS 2-Widgets
hash: Ab4qy72OtDCrs34C/cOxAzFtGxvNxh10JXfaWqzCyRQ=
---
# VIS 2-Widgets

[Zurück zur Haupt-README](/#/adapters/rssfeed#vis-2-widgets)

Das VIS 2-Widget-Set stellt fünf Komponenten bereit, die die vom RSSFeed-Adapter erzeugten JSON-Zustände auslesen. Dieser Leitfaden beschreibt alle im VIS 2-Eigenschafteneditor sichtbaren Optionen sowie die verfügbaren Daten, wenn eine Komponente eine EJS-Vorlage unterstützt.

## RSSWidget

Diese Single-Feed-Komponente liest einen RSSFeed-Status, schränkt optional dessen Artikel ein oder filtert sie und rendert den Feed mit einer editierbaren EJS-Vorlage.

| Einstellung | Standard                | Auswahlmöglichkeiten | Beschreibung                                                                                                                                                                                                                                   |
| ----------- | ----------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `oid`       | Keiner                  | RSSFeed-Status       | Wählt den Bundesstaat aus, der die RSSFeed-JSON-Daten enthält.                                                                                                                                                                                 |
| `template`  | Integrierte Feedvorlage | EJS-Vorlage          | Steuert die gesamte HTML-Ausgabe. Über die Schaltfläche „Bearbeiten“ wird ein größerer Vorlageneditor geöffnet.                                                                                                                                |
| `max`       | `5`                     | `1` Zu`9999`         | Maximale Anzahl der an die Vorlage übergebenen ersten Artikel.                                                                                                                                                                                 |
| `filter`    | Leer                    | Text                 | Durch Semikolon getrennte Begriffe. Ein Artikel wird beibehalten, wenn mindestens ein Begriff in seinem Titel, seiner Beschreibung oder seinen Kategorien vorkommt. Bei der Suche wird nicht zwischen Groß- und Kleinschreibung unterschieden. |

### Vorlagendaten

| Ausdruck       | Beschreibung                                                                            |
| -------------- | --------------------------------------------------------------------------------------- |
| `rss.meta`     | Metadaten des ausgewählten Feeds. Verwenden Sie RSSMetaHelper, um diese zu untersuchen. |
| `rss.articles` | Artikel, die nach Anwendung von Limit und Filter übrig bleiben.                         |
| `widgetid`     | ID dieses VIS 2-Widgets, nützlich für bereichsbezogenes CSS.                            |
| `style`        | VIS-Stileinstellungen dieses Widgets.                                                   |
| `vis`          | VIS-Laufzeitobjekt, einschließlich Funktionen wie`vis.formatDate(...)` Die              |

Die Begrenzung wird vor dem Filter angewendet, sodass das Ergebnis weniger Artikel enthalten kann als`max` Vorlagenfehler werden rot angezeigt. Wenn kein Status ausgewählt ist, werden anstelle einer leeren Komponente mitgelieferte Beispieldaten angezeigt.

```ejs
<h2><%= rss.meta.title || "" %></h2>
<% rss.articles.forEach(function (item) { %>
    <article>
        <h3><%= item.title || "" %></h3>
        <div><%- item.description || "" %></div>
    </article>
<% }); %>
```

Für die EJS-Syntax und die Regeln für sichere Ausgaben siehe [EJS-Template-Notation](/#/docs/adapterref/iobroker.rssfeed/docs/ejs-templates.md) .

## RSSMultiWidget

Diese Komponente kombiniert mehrere Feeds, sortiert deren Artikel vom neuesten zum ältesten und rendert eine gemeinsame EJS-Vorlage. Jeder Feed kann einen eigenen Namen, ein eigenes Artikellimit und einen eigenen Filter verwenden.

| Einstellung | Standard                              | Reichweite    | Beschreibung                                                                                                 |
| ----------- | ------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------ |
| `feedcount` | `1`                                   | `1` oder mehr | Anzahl der im Eigenschafteneditor angezeigten Feedgruppen.                                                   |
| `template`  | Integrierte Mehrfachzuführungsvorlage | EJS-Vorlage   | Steuert die vollständige HTML-Ausgabe der kombinierten Liste.                                                |
| `dpcount`   | `1`                                   | `1` oder mehr | Anzahl der zusätzlich im Editor angezeigten Datenpunktfelder. Beachten Sie die unten stehende Einschränkung. |

### Einstellungen für jeden Feed RSSMultiWidget

| Einstellung        | Standard | Reichweite     | Beschreibung                                                                                                                                                                                        |
| ------------------ | -------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `feed-oid`         | Keiner   | RSSFeed-Status | Wählt den RSSFeed-Status für diese Gruppe aus.                                                                                                                                                      |
| `feed-name`        | Leer     | Text           | Optionaler Quellenname, der jedem gesammelten Artikel hinzugefügt wird als`meta_name` Die                                                                                                           |
| `feed-maxarticles` | `10`     | `1` oder mehr  | Maximale Anzahl der aus diesem Feed entnommenen Artikel.                                                                                                                                            |
| `feed-filter`      | Leer     | Text           | Durch Semikolon getrennte, nicht zwischen Groß- und Kleinschreibung unterscheidende Begriffe werden mit Titel, Beschreibung und Kategorien abgeglichen. Mindestens ein Begriff muss übereinstimmen. |

### Zusätzliche Datenpunktgruppe

| Einstellung     | Standard | Beschreibung                                                                                                                                                                                                                         |
| --------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `datapoint_oid` | Keiner   | Dieses Textfeld ist für eine zusätzliche ioBroker-Status-ID vorgesehen. In der aktuellen VIS 2-Implementierung werden diese Werte nicht an die EJS-Vorlage übergeben und sollten daher noch nicht in einer Vorlage verwendet werden. |

### Vorlagendaten und gesammelte Artikelfelder

Die Vorlage empfängt`rss.articles` ,`widgetid` ,`style` , Und`vis` Es erhält keine sinnvolle Bewertung.`rss.meta` Da die Artikel aus verschiedenen Feeds stammen, enthält jeder gesammelte Artikel ausschließlich Folgendes:

- `title` ,`description` ,`categories` ,`date` , Und`link` aus dem Originalartikel;
- `meta_name` aus den Widget-Einstellungen;
- `meta_title` Und`meta_description` aus dem Quellfeed.

Andere ursprüngliche Fachgebiete wie zum Beispiel`author` ,`guid` ,`image` ,`pubdate` , oder`enclosures` Diese Artikel werden derzeit von dieser Komponente nicht kopiert. Die Filterung erfolgt vor Erreichen des Limits pro Feed. Falls noch keine Feedgruppe existiert, werden gebündelte Beispielartikel verwendet.

```ejs
<% rss.articles.forEach(function (item) { %>
    <article>
        <strong><%= item.meta_name || item.meta_title || "" %></strong>
        <h3><%= item.title || "" %></h3>
        <div><%- item.description || "" %></div>
    </article>
<% }); %>
```

## RSSMetaHelper

Diese Referenzkomponente zeigt die Metadaten eines Feeds als Tabelle an. Sie hilft Benutzern, vor dem Erstellen einer Vorlage herauszufinden, welche Werte ihr gewählter Herausgeber tatsächlich bereitstellt.

| Einstellung | Standard | Beschreibung                                                               |
| ----------- | -------- | -------------------------------------------------------------------------- |
| `oid`       | Keiner   | Wählt den Staat aus, der die zu untersuchenden RSSFeed-JSON-Daten enthält. |

Die Tabelle zeigt`meta.title` ,`description` ,`link` ,`xmlurl` ,`date` ,`pubdate` ,`author` ,`language` ,`image.url` ,`image.title` ,`favicon` ,`copyright` ,`generator` , Und`categories` Eine aufgeführte Eigenschaft kann dennoch leer sein, da RSS-Formate und Herausgeber unterschiedliche Metadaten liefern. Wenn kein Status ausgewählt ist, werden mitgelieferte Beispieldaten angezeigt.

## RSSArticleHelper

Diese Referenzkomponente zeigt die bekannten Eigenschaften eines ausgewählten Artikels an. Sie ist nützlich, um Feldnamen zu finden und die von einem Feed gelieferten tatsächlichen Werte zu überprüfen.

| Einstellung | Standard | Reichweite     | Beschreibung                                                                                                                      |
| ----------- | -------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `oid`       | Keiner   | RSSFeed-Status | Wählt den Staat aus, der die zu untersuchenden RSSFeed-JSON-Daten enthält.                                                        |
| `prefix`    | `item`   | Text           | Vor jeder Eigenschaft wird ein Präfix angezeigt, zum Beispiel`item.title` Es ändert lediglich die Bezeichnungen im Hilfsprogramm. |
| `article`   | `1`      | `1` Zu`9999`   | Artikelnummer basierend auf einer Einheit;`1` wählt den ersten Artikel aus.                                                       |

Die Helferlisten`title` ,`description` ,`summary` ,`link` ,`origlink` ,`permalink` ,`date` ,`pubdate` ,`author` ,`guid` ,`comments` ,`image.url` ,`image.title` ,`categories` ,`source` , Und`enclosures` Die`source` Und`enclosures` Die Daten werden als JSON angezeigt. Bei zu großer Anzahl ausgewählter Zahlen wird das Ende der Liste gemeldet. Ist keine Zahl ausgewählt, werden Beispieldaten angezeigt.

Der Helfer beschreibt den vollständigen Quellartikel. RSSMultiWidget kopiert derzeit nur die kleinere, in einem eigenen Abschnitt aufgeführte Auswahl.

## RSSArticleMarquee5

Die Titelleiste kombiniert Überschriften aus verschiedenen Feeds zu einem kontinuierlich laufenden Ticker. Die Artikel sind vom neuesten zum ältesten sortiert. Optional können Zeitstempel und Quellennamen hinzugefügt werden, und Überschriften können den zugehörigen Quellartikel öffnen.

| Einstellung    | Standard    | Auswahlmöglichkeiten    | Beschreibung                                                                                                    |
| -------------- | ----------- | ----------------------- | --------------------------------------------------------------------------------------------------------------- |
| `count`        | `1`         | `1` oder mehr           | Anzahl der im Eigenschafteneditor angezeigten Feedgruppen.                                                      |
| `speed`        | `200`       | `1` oder mehr           | Bewegungsgeschwindigkeit in Pixel pro Sekunde; höhere Werte bedeuten schnellere Bewegung.                       |
| `divider`      | `+++`       | Text                    | Vor jeder Überschrift wird ein Trennzeichen eingefügt.                                                          |
| `pauseonhover` | Ermöglicht  | Ein/Aus                 | Hält den Ticker an, solange sich der Mauszeiger darüber befindet.                                               |
| `opentype`     | `none`      | `none` ,`link` ,`popup` | Einfacher Text, ein Link, der sich in einem neuen Tab/Fenster öffnet, oder ein iFrame-Dialog innerhalb von VIS. |
| `withtime`     | Deaktiviert | Ein/Aus                 | Fügt die Artikelzeit hinzu.                                                                                     |
| `withdate`     | Deaktiviert | Ein/Aus                 | Fügt Tag und Monat hinzu.                                                                                       |
| `withyear`     | Deaktiviert | Ein/Aus                 | Fügt nach Tag und Monat eine zweistellige Jahreszahl hinzu.                                                     |
| `withname`     | Deaktiviert | Ein/Aus                 | Fügt den konfigurierten Feed-Namen oder, falls der Name leer ist, den Feed-Titel hinzu.                         |

### Einstellungen für jeden Feed RSSArticleMarquee5

| Einstellung        | Standard | Reichweite     | Beschreibung                                                                                                                                            |
| ------------------ | -------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `feed-oid`         | Keiner   | RSSFeed-Status | Wählt den RSSFeed-Status für diese Gruppe aus.                                                                                                          |
| `feed-name`        | Leer     | Text           | Optionaler Quellname, der verwendet wird, wenn`withname` ist aktiviert.                                                                                 |
| `feed-maxarticles` | `1`      | `1` oder mehr  | Maximale Anzahl der aus diesem Feed entnommenen Artikel.                                                                                                |
| `feed-filter`      | Leer     | Text           | Durch Semikolon getrennte, nicht zwischen Groß- und Kleinschreibung unterscheidende Begriffe wurden mit Titel, Beschreibung und Kategorien abgeglichen. |

Das Limit pro Feed wird vor dem Filter angewendet. Im Popup-Modus wird die Seite des Herausgebers in einem iFrame geladen; Herausgeber können dies über Browser-Sicherheitsheader verhindern. Falls noch keine Feed-Gruppe existiert, werden mitgelieferte Beispieldaten verwendet.