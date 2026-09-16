---
chapters: {"pages":{"en/adapterref/iobroker.rssfeed/README.md":{"title":{"en":"ioBroker Adapter to request and show RSS Feeds of different standards (Atom, RSS, RDF)"},"content":"en/adapterref/iobroker.rssfeed/README.md"},"en/adapterref/iobroker.rssfeed/docs/vis1-widgets.md":{"title":{"en":"VIS 1 widgets"},"content":"en/adapterref/iobroker.rssfeed/docs/vis1-widgets.md"},"en/adapterref/iobroker.rssfeed/docs/vis2-widgets.md":{"title":{"en":"VIS 2 widgets"},"content":"en/adapterref/iobroker.rssfeed/docs/vis2-widgets.md"},"en/adapterref/iobroker.rssfeed/docs/ejs-templates.md":{"title":{"en":"EJS template notation"},"content":"en/adapterref/iobroker.rssfeed/docs/ejs-templates.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.rssfeed/docs/ejs-templates.md
title: EJS-Template-Notation
hash: Mb38FRo9psbJZuvxmB603f5lR+iFODMYVfND26NXfOM=
---
# EJS-Template-Notation

[Zurück zur Haupt-README](/#/adapters/rssfeed#ejs-template-notation)

EJS ist eine Template-Sprache, die normales HTML mit JavaScript-Ausdrücken und Kontrollstrukturen kombiniert. Diese Seite erläutert die Notation selbst. Die Variablen und das spezielle Verhalten der einzelnen RSSFeed-Widgets sind in den Anleitungen [VIS 1](/#/docs/adapterref/iobroker.rssfeed/docs/vis1-widgets.md) und [VIS 2](/#/docs/adapterref/iobroker.rssfeed/docs/vis2-widgets.md) dokumentiert.

## Wie eine Vorlage bewertet wird

Text außerhalb eines EJS-Tags wird direkt in das Ergebnis kopiert. Code innerhalb eines EJS-Tags wird beim Rendern des Widgets ausgewertet. Das Ergebnis wird dann als HTML in das Widget eingefügt.

```ejs
<p>This is ordinary HTML.</p>
<p>The value is <%= value %>.</p>
```

## EJS-Tags

| Etikett             | Zweck                                                                                                                        |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `<%= expression %>` | Wertet einen Ausdruck aus und maskiert dessen Ergebnis in HTML. Diese Methode eignet sich besonders für Text.                |
| `<%- expression %>` | Wertet einen Ausdruck aus, ohne HTML zu maskieren. Nur verwenden, wenn der Wert absichtlich vertrauenswürdiges HTML enthält. |
| `<% code %>`        | Führt JavaScript aus, ohne direkt eine Ausgabe hinzuzufügen. Verwenden Sie es für Bedingungen, Schleifen und Variablen.      |
| `<%# comment %>`    | Fügt einen Template-Kommentar hinzu, der im gerenderten HTML-Code nicht erscheint.                                           |
| `<%%`               | Gibt die Literalzeichen aus`<%` statt ein EJS-Tag zu starten.                                                                |
| `<%_ code %>`       | Führt JavaScript aus und entfernt Leerzeichen vor dem öffnenden Tag.                                                         |
| `<% code -%>`       | Führt JavaScript aus und entfernt den folgenden Zeilenumbruch.                                                               |
| `<% code _%>`       | Führt JavaScript aus und entfernt nachfolgende Leerzeichen.                                                                  |

Durch Escape-Sequenzen werden Zeichen wie z. B. umgewandelt`<` ,`>` ,`&` Verwenden Sie Anführungszeichen, um textsichere HTML-Entitäten zu kennzeichnen. Dadurch wird verhindert, dass ein Wert unerwartet zu Markup oder Skript wird. Feed-Beschreibungen enthalten manchmal absichtlich HTML-Code; verwenden Sie nur Anführungszeichen, um dies zu verhindern.`<%- ... %>` für solche Inhalte, wenn die Quelle vertrauenswürdig ist.

## Werte und Fallback-Text

Ein Ausdruck kann normalen JavaScript-Code enthalten.`||` um eine einfache Ausweichlösung für fehlende, leere oder falsche Werte bereitzustellen:

```ejs
<h2><%= title || "Untitled" %></h2>
```

Verwenden Sie optionale Verkettung, wenn ein Zwischenobjekt fehlen kann:

```ejs
<%= image?.title || "No image title" %>
```

Verwenden Sie den Nullish-Koaleszenzoperator, wenn`0` oder`false` sind gültige Werte, die nicht ersetzt werden dürfen:

```ejs
<%= count ?? "Unknown" %>
```

## Bedingungen

Ein`if` Ein Block kann vollständige HTML-Abschnitte ein- oder ausschließen:

```ejs
<% if (link) { %>
    <a href="<%= link %>" target="_blank" rel="noopener">Open article</a>
<% } else { %>
    <span>No link available</span>
<% } %>
```

Ein`else if` oder`else` Die Verzweigung folgt der normalen JavaScript-Syntax. Ein ternärer Ausdruck ist für kurze Auswahlen nützlich:

```ejs
<span class="<%= active ? "active" : "inactive" %>"><%= label %></span>
```

## Schleifen

Verwenden`forEach` Markup für jedes Element in einem Array wiederholen:

```ejs
<ul>
<% items.forEach(function (item) { %>
    <li><%= item.title || "Untitled" %></li>
<% }); %>
</ul>
```

Optionale Arrays sollten vor der Iteration überprüft werden:

```ejs
<% if (Array.isArray(items) && items.length) { %>
    <% items.forEach(function (item) { %>
        <p><%= item.title || "" %></p>
    <% }); %>
<% } else { %>
    <p>No entries available.</p>
<% } %>
```

Die Schleifenvariable (`item` (hier) existiert nur innerhalb der Schleife. Die Widget-Anleitungen zeigen, welche Arrays und Eigenschaften ihre Vorlagen bereitstellen.

## Lokale Variablen und Formatierung

Temporäre Variablen können eine Vorlage lesbarer machen:

```ejs
<%
    const heading = title || "Untitled";
    const cssClass = important ? "important" : "normal";
%>
<h2 class="<%= cssClass %>"><%= heading %></h2>
```

Methoden wie zum Beispiel`join` ,`map` , Und`toLocaleString` können verwendet werden, wenn der Wert sie unterstützt. Testen Sie den Typ zuerst, wenn die Daten variieren können:

```ejs
<%= Array.isArray(categories) ? categories.join(", ") : "" %>
```

## HTML-Attribute und Links

In Attributen platzierte Escape-Werte:

```ejs
<a href="<%= link || "#" %>" title="<%= title || "" %>"><%= title || "Open" %></a>
```

Wenn ein Link einen neuen Tab öffnet, fügen Sie Folgendes hinzu`rel="noopener"` Vermeiden Sie es, Ereignisbehandler-JavaScript aus Feedwerten zu erstellen.

## CSS innerhalb einer Vorlage

Eine Vorlage kann Folgendes enthalten:`<style>` Block. Bereichsselektoren werden auf das aktuelle Widget beschränkt, wenn dieses eine ID bereitstellt; andernfalls könnte das CSS jedes Widget in der Ansicht beeinflussen.

VIS kann ein Paar geschweifter Klammern als Bindung interpretieren. Mehrzeiliges CSS ist die sicherste Notation:

```css
.article {
    display: flex;
    gap: 0.5rem;
}
```

Vermeiden Sie es, eine Regel zu komprimieren in`.article { display: flex; }` innerhalb einer VIS-Vorlage. Die gleiche Vorsicht ist bei in eine Vorlage eingebetteten JSON- oder JavaScript-Objektliteralen geboten.

Bei responsiven Bildern sollte die Größe anhand des Containers und nicht anhand der geschätzten Scrollleistenbreite angepasst werden:

```css
img {
    width: 100%;
    max-width: 100%;
    height: auto;
    box-sizing: border-box;
}
```

## Überlegungen zu Skripten, Ereignissen und Timern

Templates können Skripte enthalten, das Widget kann jedoch bei jeder Zustands- oder Einstellungsänderung wiederholt gerendert werden. Bei jedem Rendern kann alternativ ein weiterer Ereignishandler oder Timer registriert werden. Markup und CSS sind vorzuziehen. Falls Skripte erforderlich sind:

- DOM-Abfragen auf das aktuelle Widget beschränken;
- Vermeiden Sie globale Variablen- und Funktionsnamen;
- Starten Sie kein unkontrolliertes System.`setInterval` ;
- sicherstellen, dass Timer und Ereignisbehandler eines früheren Renderings abgebrochen oder ersetzt werden können;
- Das Skript soll auch dann sicher sein, wenn mehr als eine Instanz des Widgets existiert.

## Fehlerbehebung bei einer Vorlage

- Beginnen Sie mit einem kleinen HTML-Code und fügen Sie die Felder nacheinander hinzu.
- Verwenden Sie den in den Widget-Anleitungen beschriebenen Meta-Helper oder Artikel-Helper, um die tatsächlichen Daten anzuzeigen.
- Behandeln Sie jedes Feld als optional, da RSS-Formate und Herausgeber unterschiedlich sind.
- Verwenden`<%=` für Text und Reservierung`<%-` für absichtlich gerendertes, vertrauenswürdiges HTML.
- Überprüfen`Array.isArray(...)` bevor Daten durchlaufen werden, die möglicherweise fehlen.
- Achten Sie darauf, dass die HTML-Elemente korrekt verschachtelt sind und schließen Sie jeden EJS-Steuerungsblock.
- Legen Sie den Gültigkeitsbereich von CSS-Selektoren und Element-IDs so fest, dass sich mehrere Widget-Instanzen nicht gegenseitig beeinträchtigen.