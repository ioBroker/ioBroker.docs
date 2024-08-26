---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-2-widgets-ovarious/README.md
title: Vis 2 (o)verschiedene Widgets
hash: 9kE+Av1tIRAcEsL/crz1sRamAiY2YQUNh6SxcJx9+/k=
---
![Anzahl der Installationen](http://iobroker.live/badges/vis-2-widgets-ovarious-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.vis-2-widgets-ovarious.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.vis-2-widgets-ovarious.svg)
![NPM](https://nodei.co/npm/iobroker.vis-2-widgets-ovarious.png?downloads=true)

<!-- markdownlint-disable MD036 -->

# Vis 2 (o)verschiedene Widgets
![Logo](../../../en/adapterref/iobroker.vis-2-widgets-ovarious/admin/vis-2-widgets-ovarious.png)

Dieser Adapter enthält verschiedene Vis-2-Widgets.

ok, eigentlich gibt es nur ein Vis-2-Widget, aber es sind noch einige weitere auf meiner Roadmap.

## JSON-Vorlagen-Widget
Mit diesem Widget können beliebige Datenpunkte mit JSON-Daten nach Wunsch angezeigt werden.
Die Anzeige erfolgt über ein Vorlagenformat, das man sich als eine kombinierte Form aus HTML-Code + JavaScript + speziellen Tags vorstellen kann, die die Anzeige der JSON-Attribute steuern.

### Attribut JSON-Datenpunkt
Auswahl des Datenpunkts mit den entsprechenden JSON-Daten.

#### Attributvorlage
Über die Vorlage kann das Aussehen der JSON-Daten bestimmt werden. Dabei können alle gültigen HTML-Tags (auch CSS-Attribute in Style-Tags) in der Vorlage verwendet werden.

Darüber hinaus gibt es spezielle Tags, innerhalb derer die JSON-Daten angezeigt werden und JavaScript-Anweisungen ausgeführt werden können.

Das Template-System arbeitet mit bestimmten Tags.
Die verwendeten Tags haben folgende Bedeutung

| `tag` | Beschreibung |
| ----- | ------------------------------------------------------------------- |
| <%= | Der Inhalt des enthaltenen Ausdrucks/der enthaltenen Variable wird maskiert. |
| <%- | Der Inhalt des enthaltenen Ausdrucks/der enthaltenen Variable wird nicht maskiert. |
| <% | Keine Ausgabe, wird für eingeschlossene Javascript-Anweisungen verwendet |
| %> | ist im Allgemeinen ein schließendes Tag, das eines der vorherigen vervollständigt |

Alles was außerhalb dieser Tags steht wird genauso dargestellt wie es ist oder als HTML interpretiert. (siehe z.B. das p-Tag, div-Tag, small-Tag) Innerhalb des Templates stehen dir 2 vordefinierte Variablen zur Verfügung

Mit dem Präfix data werden die JSON-Daten an das Template übergeben. Zusätzlich steht die aktuelle widgetID auch als Variable zur Verfügung, um diese in einzelnen CSS-Anweisungen angeben zu können.

##### Beispielobjekt
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

Mit dem obigen Beispiel könnten Attribute wie folgt ausgegeben werden

```html
<%- data.onenumber %> <%- data.onetext %>
```

**Ergebnis**

```html
123 onetwothree
```

Auf Arrays kann über einen Index zugegriffen werden. Der Index beginnt immer mit 0. Es gibt jedoch auch Fake-Arrays, bei denen der Index nicht mit 0 beginnt oder sogar aus Text besteht. Hier gelten die Regeln für Objekte. Im obigen Beispiel wäre dies

```html
<%- data.onearray[0] %> <%- data.onearray[1] %>
```

##### Ergebnis
```html
one two
```

Wenn Sie versuchen, ein Array direkt ohne Index auszugeben, gibt die Vorlage alle Elemente durch Kommas getrennt aus

```html
<%- data.onearray %>
```

**Ergebnis**

```html
one,two
```

Arrays können auch aus einer Sammlung von Objekten bestehen. Das Beispiel hier enthält nur ein einfaches Array. Ein Beispiel für Arrays mit Objekten folgt später.

```html
<% for (var i = 0; i < data.onearray.length ; i++ ) { %> <%- data.onearray[i] %> <% } %>
```

**Ergebnis**

```html
one two
```

**Objekte** können einzelne Attribute, Arrays oder wiederum Objekte enthalten. Das bedeutet, dass JSON-Daten beliebig tief verschachtelt werden können.

Attribute eines Objekts können mit Punktnotation oder Klammernotation angesprochen werden. Die Punktnotation funktioniert nur, wenn das Attribut bestimmten Namenskonventionen entspricht (erstes Zeichen muss ein Buchstabe sein, Rest Zahlen oder Buchstaben bzw. Unterstrich).
Die Klammernotation funktioniert auch für Attribute, die nicht der Namenskonvention entsprechen.

**Punktnotation**

```html
<%- data.oneobject.attribute1 %>
```

**Klammernotation**

```html
<%- data.oneobject["attribute1"] %>
```

**Ergebnis für beide Beispiele**

```html
1
```

Schleife über die Attribute eines Objekts

```html
<% for (var prop in data.oneobject) { %> <%- "data.oneobject." + prop + " = " + data.oneobject[prop] %> <% } %>
```

**Ergebnis**

```html
data.oneobject.attribute1 = 1 data.oneobject.attribute2 = 2
```

**Erweiterter Anwendungsfall**

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
  <span class="mycssclassproperty"><%- "data.oneobject." + prop + " = " %></span>
  <span class="mycssclassdata"><%- data.oneobject[prop] %></span>
</div>
<% } %>
```

**Ergebnis**

```html
data.oneobject.attribute1 = 1 data.oneobject.attribute2 = 2
```

## Changelog

<!--
	Placeholder for next versions:
	### __WORK IN PROGRESS__
-->
### 0.1.8 (2024-07-28)

- improve icon
- remove versions from io-package.json

### 0.1.7 (2024-07-28)

- fix widget addressing

### 0.1.6 (2024-07-28)

- fix widget addressing

### 0.1.5 (2024-07-28)

- fix adapter checker issues

### 0.1.4 (2024-07-28)

- fix things from adapter checker

### 0.1.3 (2024-07-27)

- add icon
- add documentation

### 0.1.2 (2024-07-27)

- prepare release

### 0.1.1 (2024-07-27)

- fix widget addressing

### 0.1.0 (2024-07-27)

- initial Release

## License

The MIT License (MIT)

Copyright (c) 2024 oweitman <oweitman@gmx.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.