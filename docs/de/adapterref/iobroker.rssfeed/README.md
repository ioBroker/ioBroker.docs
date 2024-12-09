---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.rssfeed/README.md
title: ioBroker-Adapter zum Anfordern und Anzeigen von RSS-Feeds verschiedener Standards (Atom, RSS, RDF)
hash: has9xS5uJI8QfTDwC7Q+OTCPNtY8AVMvFoIMJCYS1Rk=
---
# IoBroker-Adapter zum Anfordern und Anzeigen von RSS-Feeds verschiedener Standards (Atom, RSS, RDF)
![Logo](../../../en/adapterref/iobroker.rssfeed/admin/rssfeed.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.rssfeed.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.rssfeed.svg)
![Anzahl der Installationen](https://iobroker.live/badges/rssfeed-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/rssfeed-stable.svg)
![NPM](https://nodei.co/npm/iobroker.rssfeed.png?downloads=true)

**Tests:** ![Testen und Freigeben](https://github.com/oweitman/ioBroker.rssfeed/workflows/Test%20and%20Release/badge.svg)

## Übersicht
Adapter zum Anfordern und Anzeigen von RSS-Feeds verschiedener Standards (Atom, RSS, RDF).
Die Ausgabe des Feeds können Sie über ein Vorlagensystem individuell anpassen. In die Vorlagen können Sie HTML, CSS und Javascript einbinden.

Wichtig: Aufgrund von Fehlern bei automatischen Übersetzungen in andere Sprachen durch iobroker ist nur die englische Übersetzung gültig.

## Installation
Installieren Sie den Adapter wie gewohnt aus dem stabilen Repository. Wenn Sie neue Funktionen oder Fehlerbehebungen testen möchten, können Sie den Adapter auch aus dem Beta-Repository installieren. Informationen zu Funktionen und Neuigkeiten finden Sie im Test- und Support-Thread für diesen Adapter im iobroker-Forum.

Nach der Installation sollte der Adapter dann im Adapterbereich im iobroker angezeigt werden.

Manchmal kommt es vor, dass die Änderungen nicht sichtbar sind, insbesondere bei Web-Änderungen (Widgets / Konfigurationsdialog), ggf. muss folgender Befehl auf der Kommandozeile ausgeführt werden:

```bash
iobroker upload rssfeed
```

Im rechten Bereich in der Zeile des Adapters kann über den Plus-Button eine Instanz hinzugefügt werden

## Konfiguration
Die Konfiguration ist einfach. Es gibt nur wenige Felder

| Einstellung | Beschreibung |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Standardmäßig wird die Aktualisierung (min) | ist die allgemeine Angabe in Minuten, wie oft der Feed erneut aufgerufen werden soll. Der Standardwert liegt bei 60 Minuten |
| Max Artikel (Standard) | Die Gesamtmenge der zu verarbeitenden Daten kann hier begrenzt werden. |

Dann für jeden neuen Feed:

| Einstellung | Beschreibung |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Name | Ein Name für den Datenpunkt. Innerhalb eines Ordners darf ein Name nicht zweimal vorkommen. |
| Kategorie | Name für einen Unterordner, in dem der Datenpunkt erscheinen soll. |
| URL | Die vollständige Adresse des Feeds (mit http:// oder https://, siehe Beispiele unten) |
| Aktualisieren (min) | Zeit zum Aktualisieren/Laden des Feeds. Für diesen Feed kann ein anderer Wert angegeben werden. Ansonsten wird die allgemeine Angabe übernommen |
| Max Artikel | Anzahl der Artikel die im Datenpunkt gespeichert werden sollen. Für diesen Feed kann ein anderer Wert angegeben werden. Ansonsten wird die allgemeine Angabe übernommen |

Wenn Sie die Konfiguration gespeichert und geschlossen haben, sind die Feed-Daten als JSON-Datenpunkt im Objektbaum zu finden.
Wenn Sie einen Eintrag löschen, werden die Datenpunkte nicht automatisch gelöscht.

## Vis und Widgets
Folgende Widgets gibt es aktuell

- [`RSS-Feed-Widget 2`](#rss-feed-widget-2) - um einen einzelnen Feed anzuzeigen
- [`RSS Feed Multi widget 3`](#rss-feed-multi-widget-3) – um mehrere aggregierte Feeds in einem Widget anzuzeigen.
- [`RSS Feed Meta Helper`](#rss-feed-meta-helper) - ein Hilfs-Widget zum Überprüfen der Metadaten eines Feeds
- [`RSS Feed Article Helper 2`](#rss-feed-article-helper) - ein Hilfs-Widget zum Überprüfen der Artikeldaten eines Feeds
- [`RSS Feed Title marquee 3`](#rss-feed-title-marquee-3) - ein Widget, um die Überschriften eines Feeds als Laufschrift anzuzeigen
- [`JSON-Vorlage`(#json-template)] – ein Widget, das nichts mit RSS-Feeds zu tun hat, aber die gleiche Technologie verwendet, und Sie können eine benutzerdefinierte Vorlage definieren, um beliebige JSON-Daten in vis anzuzeigen.

### RSS-Feed-Widget 2
Mit diesem Widget können im Konfigurationsdialog des Adapters die abonnierten RSS-Feeds angezeigt werden.

Mit einem Template-System kann die Ausgabe beliebig angepasst werden. Ein einfaches Standard-Template ist bereits vorhanden.

Beschreibungen der Formatierung und Syntax finden Sie auf den folgenden Seiten.

| Einstellung | Beschreibung |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rss_oid | Auswahl des Datenpunkts mit dem entsprechenden RSS-Feed. |
| rss_template | Das Template bestimmt das Aussehen des RSS-Feeds. Im Template können alle gültigen HTML-Tags (auch CSS-Attribute in Style-Tags) verwendet werden. Darüber hinaus gibt es spezielle Tags, innerhalb derer die Feed-Daten angezeigt werden und JavaScript-Anweisungen ausgeführt werden können. Um die Daten und die verwendeten Attributnamen besser identifizieren zu können, gibt es zwei Widgets, rssfeed Meta Helper und rssfeed Article Helper. |
| rss_maxarticles | Die maximale Anzahl angezeigter einzelner Artikel aus dem RSS-Feed |
| rss_filter | Für die Filterfunktion können in das Feld ein oder mehrere Filterkriterien, getrennt durch Semikolon (;), eingegeben werden. Bei der Suche werden folgende Artikelattribute durchsucht: Titel, Beschreibung, Kategorien. Es werden nur Artikel angezeigt, die einen dieser Begriffe enthalten. |

**Verfügbarkeit der Variable:**

- rss.meta: die Metainformationen des Feeds
- rss.articles: ein Array aller Artikel
- widgetid: die Widget-ID des Widgets
- style: das Stilobjekt, wenn Sie zusätzliche Stilinformationen konfigurieren

Weitere Einzelheiten zu diesen Variablen finden Sie im Kapitel **Verfügbare Variablen**

Einzelheiten zum Vorlagensystem finden Sie im Kapitel Vorlage anhand von Beispielen

### RSS-Feed Multi-Widget 3
Mit diesem Widget können mehrere Feeds in einem Feed aggregiert werden.
Aufgrund der mehreren Feeds gibt es ein paar Unterschiede in der Datenverfügbarkeit im Template im Vergleich zum normalen RSS-Feed-Widget.
Die Meta-Variable ist im Template nicht verfügbar. Allerdings stehen in jedem einzelnen Artikel 3 Meta-Attribute title und description unter den Namen meta_title und meta_description zur Verfügung.
Zusätzlich kann jedem Feed in den Einstellungen ein allgemeiner Name zugewiesen werden, der innerhalb des Templates unter dem Namen meta_name in jedem Artikel zur Verfügung steht, sodass die Herkunft eines Artikels erkennbar ist.
Ansonsten gelten für das Template die gleichen Regeln wie für das RSS-Feed-Widget.

| Einstellung | Gruppe | Beschreibung |
| --------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rss_feedCount | Allgemeine Gruppe | Hier kann die Anzahl der zu konfigurierenden Feeds eingestellt werden. Für jeden Feed wird in vis eine eigene Gruppe zur Konfiguration angelegt. |
| rss_template | | Das Template bestimmt das Aussehen des RSS-Feeds. Im Template können alle gültigen HTML-Tags (auch CSS-Attribute in Style-Tags) verwendet werden. Darüber hinaus gibt es spezielle Tags, innerhalb derer die Feed-Daten angezeigt werden und JavaScript-Anweisungen ausgeführt werden können. Um die Daten und die verwendeten Attributnamen besser identifizieren zu können, gibt es zwei Widgets, rssfeed Meta helper und rssfeed Article helper. Details zum Template-System finden Sie im Kapitel Template anhand von Beispielen |
| rss_dpCount | Allgemeine Gruppe | Hier können Sie die Anzahl der zusätzlichen Datenpunkte angeben, die innerhalb der Vorlage zur Verfügung gestellt werden sollen. |
| rss_dp[Nummer] | Allgemeine Gruppe | Hier können Sie den jeweiligen Datenpunkt auswählen. Der Datenpunkt ist innerhalb der Vorlage unter der Variable dp verfügbar. Das bedeutet, dass ein Datenpunkt innerhalb der Vorlage wie folgt abgerufen werden kann. Details zu diesen Variablen finden Sie im Kapitel Verfügbare Variablen |
| rss_oid | Gruppe feeds[Anzahl] | Auswahl des Datenpunkts mit dem entsprechenden RSS-Feed. |
| rss_name | Gruppe feeds[Anzahl] | Hier können Sie einen Namen eingeben, der in der Vorlage bei jedem Artikel unter dem Attributnamen meta_name zur Verfügung gestellt wird. |
| rss_maxarticles | Gruppen-Feeds[Anzahl] | Die maximale Anzahl angezeigter Einzelartikel aus dem RSS-Feed |
| rss_filter | Gruppen-Feeds[Anzahl] | Näheres zu diesen Variablen finden Sie im Kapitel Verfügbare VariablenFür die Filterfunktion können in das Feld ein oder mehrere Filterkriterien, getrennt durch Semikolon (;), eingegeben werden. Für die Suche werden folgende Artikelattribute durchsucht: Titel, Beschreibung, Kategorien. Es werden nur Artikel angezeigt, die einen dieser Begriffe enthalten. |

**Verfügbarkeit der Variable:**

- rss.articles: ein Array aller Artikel.

- Eine Teilmenge der Metainformationen eines Artikels ist im Artikel als **Metaname**, **Metatitel** und **Metabeschreibung** verfügbar.

- dp[] als Array, wenn Sie zusätzliche Datenpunkte konfigurieren
- widgetid: die Widget-ID des Widgets
- style: das Stilobjekt, wenn Sie zusätzliche Stilinformationen konfigurieren

### RSS-Feed-Meta-Helfer
Mit diesem Widget können die Metaattribute eines bestimmten Feeds angezeigt werden. Es dient lediglich als Hilfe-Widget zum Erstellen einer Vorlage, um den Inhalt der RSS-Feed-Daten schnell und einfach anzuzeigen.
Attribute

| Einstellung | Beschreibung |
| ------- | ------------------------------------------------------------ |
| rss_oid | Auswahl des Datenpunkts mit dem dazugehörigen RSS-Feed. |

### RSS-Feed-Artikel-Helfer
Mit diesem Widget können die Artikelattribute eines bestimmten Feeds angezeigt werden. Es dient lediglich als Hilfe-Widget zum Erstellen einer Vorlage, um den Inhalt der RSS-Feed-Daten schnell und einfach anzuzeigen.

| Einstellung | Beschreibung |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| rss_oid | Auswahl des Datenpunkts mit dem dazugehörigen RSS-Feed. |
| rss_prefix | Um die Verwendung der Attributnamen per Copy/Paste zu erleichtern, kann hier der in der Vorlage für einen Artikel verwendete Variablenname angegeben werden. |
| rss_article | Mit diesem Attribut kann zwischen den verschiedenen vorhandenen Artikeln im RSS-Feed gewechselt werden. |

### RSS-Feed-Titel-Laufschrift 3
Bei diesem Widget werden alle Titelattribute als Lauftext angezeigt. Im Zuge der Umstellung von Laufschrift-Widget 2 auf 3 ist dieses Widget nun ein Multi-Widget, in dem mehrere RSS-Feeds zusammengefasst werden können.

| Einstellung | Gruppe | Beschreibung |
| ---------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rss_feedCount | Allgemeine Gruppe | Hier kann die Anzahl der zu konfigurierenden Feeds eingestellt werden. Für jeden zu konfigurierenden Feed wird in vis eine eigene Gruppe angelegt. |
| rss_speed | Gruppe allgemein | Die Scrollgeschwindigkeit des Lauftextes Attribut rss_divider - Gruppe allgemein Hier können Sie die Zeichen eingeben, die zur Trennung der Überschriften verwendet werden. Der Standardwert ist +++. |
| rss_pauseonhover | Gruppe „Allgemein“ | Ist diese Option eingeschaltet, stoppt der Lauftext, sobald Sie mit der Maus über den Text fahren. |
| rss_link | Gruppe Allgemein | Ist diese Option eingeschaltet, werden die Überschriften als Link angezeigt. Klickt oder tippt man auf eine Überschrift, öffnet sich der Link zum Artikel in einem neuen Fenster bzw. Tab. |
| rss_withtime | Gruppe allgemein | Ist diese Option eingeschaltet, wird vor der jeweiligen Überschrift die Uhrzeit angezeigt. Attribut rss_withdate - Gruppe allgemein Ist diese Option aktiviert, wird vor der jeweiligen Überschrift das Datum ohne Jahr und die Uhrzeit angezeigt. |
| rss_withyear | Gruppe „Allgemein“ | Ist diese Option aktiviert, wird vor der jeweiligen Überschrift das Datum mit Jahr und Uhrzeit angezeigt. |
| rss_oid | Feeds[Nummer]-Gruppe | Wählen Sie den Datenpunkt mit dem entsprechenden RSS-Feed aus. |
| rss_maxarticles | Feeds[Anzahl]-Gruppe | Die maximale Anzahl angezeigter einzelner Artikel aus dem RSS-Feed |
| rss_filter | Feeds[Nummer] Gruppe | Für die Filterfunktion können in das Feld ein oder mehrere Filterkriterien, getrennt durch Semikolon (;), eingegeben werden. Bei der Suche werden folgende Artikelattribute durchsucht: Titel, Beschreibung, Kategorien. Es werden nur Artikel angezeigt, die einen dieser Begriffe enthalten. |

### JSON-Vorlage2
Mit diesem Widget können beliebige Datenpunkte mit JSON-Daten nach Wunsch angezeigt werden.
Die Anzeige erfolgt über ein Vorlagenformat, das man sich als eine kombinierte Form aus HTML-Code + JavaScript + speziellen Tags vorstellen kann, die die Anzeige der JSON-Attribute steuern.

| Einstellung | Beschreibung |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rss_template | Über das Template kann das Aussehen der JSON-Daten bestimmt werden. Im Template können alle gültigen HTML-Tags (auch CSS-Attribute in Style-Tags) verwendet werden. Zudem gibt es spezielle Tags innerhalb derer die JSON-Daten angezeigt werden und JavaScript-Anweisungen ausgeführt werden können. |
| json_oid | Auswahl des Datenpunkts mit den entsprechenden JSON-Daten. |

Einzelheiten zum Vorlagensystem finden Sie im Kapitel Vorlage anhand von Beispielen

Mit dem Präfix data werden die JSON-Daten an das Template übergeben. Zusätzlich steht die aktuelle widgetID auch als Variable zur Verfügung, um diese in einzelnen CSS-Anweisungen angeben zu können.

**Erweiterter Anwendungsfall:**

In den obigen Beispielen wurde nur die reine Ausgabe behandelt. Das Template kann nun zusätzlich mit HTML-Tags angereichert werden, um ein bestimmtes Layout zu erreichen. Hier ein Beispiel:

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
  <span class="mycssclassproperty"
    ><%- "data.oneobject." + prop + " = " %></span
  >
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

## Vorlagensystem
## Stichworte
Das Vorlagensystem arbeitet mit bestimmten Tags.
Die verwendeten Tags bedeuten Folgendes

| `tag` | Beschreibung |
| ----- | ------------------------------------------------------------------- |
| <%= | Der Inhalt des enthaltenen Ausdrucks/der enthaltenen Variable wird maskiert. |
| <%- | Der Inhalt des enthaltenen Ausdrucks/der enthaltenen Variable wird nicht maskiert. |
| <% | Keine Ausgabe, wird für eingeschlossene Javascript-Anweisungen verwendet |
| %> | ist im Allgemeinen ein schließendes Tag, um eines der vorherigen zu vervollständigen |

Alles was außerhalb dieser Tags steht wird genauso angezeigt wie es ist oder als HTML interpretiert.
Innerhalb der Vorlage stehen dir 2 vordefinierte Variablen zur Verfügung

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

```html
<%- data.onenumber %> <%- data.onetext %>
```

**Ergebnis:**

```text
    123 onetwothree
```

Auf Arrays kann über einen Index zugegriffen werden. Der Index beginnt immer mit 0. Es gibt jedoch auch Fake-Arrays, bei denen der Index nicht mit 0 beginnt oder sogar aus Text besteht. Hier gelten die Regeln für Objekte. Im obigen Beispiel wäre dies

**Vorlage:**

```html
<%- data.onearray[0] %> <%- data.onearray[1] %>
```

**Ergebnis:**

```text
    one two
```

Wenn Sie versuchen, ein Array direkt ohne Index auszugeben, gibt die Vorlage alle Elemente durch Kommas getrennt aus

**Vorlage:**

```html
<%- data.onearray %>
```

**Ergebnis:**

```text
    one,two
```

Arrays können auch aus einer Sammlung von Objekten bestehen. Das Beispiel hier enthält nur ein einfaches Array. Ein Beispiel für Arrays mit Objekten folgt später.

**Vorlage:**

```html
<% for (var i = 0; i < data.onearray.length ; i++ ) { %> <%- data.onearray[i] %>
<% } %>
```

**Ergebnis:**

```text
    one two
```

**Objekte** können einzelne Attribute, Arrays oder wiederum Objekte enthalten. Das bedeutet, dass JSON-Daten beliebig tief verschachtelt werden können.

Attribute eines Objekts können mit Punktnotation oder Klammernotation angesprochen werden. Die Punktnotation funktioniert nur, wenn das Attribut bestimmten Namenskonventionen entspricht (erstes Zeichen muss ein Buchstabe sein, Rest Zahlen oder Buchstaben bzw. Unterstrich).
Die Klammernotation funktioniert auch für Attribute, die nicht der Namenskonvention entsprechen.

**Punktnotation:**

**Vorlage:**

```html
<%- data.oneobject.attribute1 %>
```

**Klammernotation:**

**Vorlage:**

```html
<%- data.oneobject["attribute1"] %>
```

**Ergebnis für beide Beispiele:**

```text
    1
```

Schleife über die Attribute eines Objekts

**Vorlage:**

```html
<% for (var prop in data.oneobject) { %> <%- "data.oneobject." + prop + " = " +
data.oneobject[prop] %> <% } %>
```

**Ergebnis:**

```text
    data.oneobject.attribute1 = 1
    data.oneobject.attribute2 = 2
```

## Verfügbare Variablen in Vorlagen
### `rss.meta`
Hier sind alle Metainformationen zum Feed enthalten. Folgende Inhalte sind verfügbar. Ich denke, die Bezeichner sind selbsterklärend. In der Hilfe werde ich sie genauer beschreiben. oder den Inhalt angeben (einige sind Arrays) Nur im RSS-Feed-Widget 2 ist ein vollständiger Satz der Metainformationen verfügbar

Die Verwendung in der Vorlage finden Sie unter **Vorlage basierend auf Beispiel**

- `Meta.Titel`
- `Meta.Beschreibung`
- `Meta.Link`
- `meta.xmlurl`
- `meta.datum`
- `meta.pubdate`
- `meta.author`
- `Metasprache`
- `Meta.Bild`
- `meta.favicon`
- `meta.copyright`
- `Metagenerator`
- `meta.kategorien`

### `rss.articles or articles`
Ist ein Array mit einzelnen Elementen (Javascript-Array). Jedes Element hat folgende Eigenschaften.
Damit es passt, werde ich z.B. das Präfix item davor setzen. Aber wer möchte kann das auch selbst wählen. Es muss nur in der Schleife entsprechend benannt werden (forEach). Auch hier sind die Bezeichner selbsterklärend. Nicht in jedem Feed sind alle Attribute ausgefüllt. Die wichtigsten sind im Template oben schon enthalten.

Die Artikel sind als rss.articles im RSS-Feed-Widget 2 und als Artikel im RSS-Feed-Multi-Widget 3 verfügbar.

Die Verwendung in der Vorlage finden Sie unter **Vorlage basierend auf Beispiel**

- `Artikeltitel`
- `Artikelbeschreibung`
- `Artikelzusammenfassung`
- `Artikel.Link`
- `item.origlink`
- `Artikel.permalink`
- `Artikel.Datum`
- `Artikel.Veröffentlichungsdatum`
- `Artikel.Autor`
- `item.guid`
- `Artikel.Kommentare`
- `Artikel.Bild`
- `Artikel.Kategorien`
- `Artikel.Quelle`
- `Artikel.Anlagen`

## Vorlage basierend auf Beispielen
### Basisvorlage RSS-Feed-Widget 2
Die folgende Vorlage wird derzeit standardmäßig im RSS-Feed-Widget 2 verwendet.
Sie wurde mit den folgenden Feeds getestet

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
Die folgende Vorlage wird derzeit standardmäßig im RSS-Feed Multi-Widget 3 verwendet.
Bitte beachten Sie kleine Unterschiede in der Verwendung der Variablen. Es wurde mit den folgenden Feeds getestet

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
  #<%- widgetid %> img {
    width: calc(<%- style.width || "230px" %> - 15px);
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

### Beispiel Template für RSS-Feed Multi-Widget 3 mit Artikeln als Slideshow und Prev/Next-Buttons
```html
<!--
 available variables:
 widgetid      ->  id of the widget
 rss.articles  ->  all articles as array, details see Article Helper widget
 style         ->  all style settings for the widget

 all variables are read only
-->

<style>
  #<%- widgetid %> img {
    width: calc(<%- style.width || "230px" %> - 15px);
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
  slides = document.querySelectorAll(".slide");

  function showSlide(index) {
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add("active");
      } else {
        slide.classList.remove("active");
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

### Vorlagenbeispiel und ausführliche Beschreibung
```html
<%= meta.title %> <% articles.forEach(function(item){ %>
<p><small><%- vis.formatDate(item.pubdate, "TT.MM.JJJJ SS:mm") %></small></p>
<h3><%- item.title %></h3>
<p><%- item.description %></p>
<div style="clear:both;" />
<% }); %>
```

Kurzbeschreibung was in den einzelnen Zeilen passiert Z1: Die Ausgabe des Feedtitels Z2: Ohne Ausgabe. Javascriptbefehl zum Loopen über alle Artikel, bei jedem Turn wird das aktuelle Element der Variable item zugewiesen.
Z3: Ausgabe von Datum und Uhrzeit. Wird mit einem p/small-Tag zur Formatierung umschlossen. Zur Formatierung wird die vis-eigene Datumsformatfunktion verwendet. Beschreibung findet sich im Adapter vis.
Z4: Die Ausgabe des Artikeltitels. Zur Formatierung wird ein Header3-Tag verwendet.
Z5: Ausgabe des Inhalts des Artikels. Wird mit einem p-Tag umschlossen. Hier wird, zumindest in den beiden Beispielen, HTML-Code eingebunden, der meist mit Bild und Beschreibungstext daherkommt Z6: Ausgabe eines div-Tags, der spezielle Formatierungen im Feed-html aufhebt (in beiden Beispielen für tagesschau und bild wird das benötigt. Andere Feeds brauchen das vielleicht nicht.
Z7: Ohne Ausgabe. Mit dieser Zeile wird die Javascript-Schleife geschlossen. Alles was zwischen Z2 und Z7 definiert wurde, wird für jeden einzelnen Artikel wiederholt.

## Aufgaben
- Bereinigen Sie nicht verwendete Einträge im Datenpunkt info.lastRequest, indem Sie sie im Admin-Dialog speichern.
- Button zum Bereinigen nicht genutzter Datenpunkte im Admin-Dialog
- ~~RSS-Feeds mit mehreren Widgets~~
- ~~Multi-Widget-Laufschrift~~
- ~~Weitere Datenpunkte im Template verfügbar machen.~~
- ~~Widget für Laufschrift mit den Titeln <https://forum.iobroker.net/topic/31242/nachrichten-ticker-newsticker-via-php-in-vis-einbinden/2>~~

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
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

Copyright (c) 2021-2024 oweitman <oweitman@gmx.de>

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