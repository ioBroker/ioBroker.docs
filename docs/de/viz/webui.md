---
title:       "webui"
lastChanged: "09.09.2026"
---

# webui

[webui](/adapters/webui) ist ein vollständiges eigenes Visualisierungssystem,
entwickelt von jogibear9988 in der ioBroker-Gemeinschaft. Es geht einen anderen
Weg als vis: Was man im Editor zusammenstellt, ist echtes HTML aus
**Web Components**, und der Editor ist ein Werkzeug zum Zeichnen von HTML, kein
Kasten mit fertigen Bausteinen.

?> Das macht webui mächtig und gleichzeitig anspruchsvoller als die anderen
Oberflächen. Wer HTML und CSS kennt, kommt sehr weit. Wer das nicht will, ist
mit [vis-2](/docs/viz/README.md) oder dem
[Devices-Adapter](/docs/viz/devices.md) besser bedient.

## Was es kann

* Bindungen an ioBroker-Objekte, wahlweise mit Umrechnung oder einem
  JavaScript-Ausdruck dazwischen.
* Ein Objekt aus dem Baum in die Zeichenfläche ziehen, und die Bindung entsteht
  von selbst. Dasselbe funktioniert auf eine einzelne Eigenschaft.
* Bilder aus der Zwischenablage einfügen oder von außen hineinziehen.
* Geteilte Ansicht: links die Zeichenfläche, rechts der HTML-Code, beides
  gleichzeitig.
* Eigene wiederverwendbare Bausteine mit eigenen Eigenschaften, eigenem
  Aussehen und eigenem JavaScript.
* Bildschirme in Bildschirmen, ein globales Stylesheet, npm-Pakete mit
  Web Components, die Symbolsammlungen von ioBroker und die Diagramme aus
  ioBroker.
* Eine einfache Skriptsprache für Abläufe innerhalb einer Seite.

## Einrichten

webui braucht den Adapter **web**; ohne ihn läuft es nicht. Eine eigene
Konfigurationsseite hat der Adapter nicht, alles passiert im Editor.

1. Den Adapter `webui` im Reiter [Adapter](/docs/admin/adapter.md) installieren
   und eine Instanz anlegen.
2. Den Editor aufrufen: `http://<adresse>:8082/webui/`.
3. Einen Bildschirm anlegen und ihn **`start`** nennen. Das ist der Bildschirm,
   den die fertige Oberfläche zuerst zeigt.
4. Die fertige Oberfläche liegt unter
   `http://<adresse>:8082/webui/runtime.html`.

?> Ein anderer Bildschirm lässt sich über die Adresse aufrufen:
`runtime.html?screenName=zweiterbildschirm`.

## Was man wissen muss, bevor man anfängt

Alles, was man zeichnet, liegt im Schattenbaum einer Web Component. Daraus
folgen zwei Regeln, an denen sonst jeder einmal hängen bleibt:

* **`<body>` und `<html>` lassen sich im Stylesheet nicht ansprechen.** Für das
  äußere Aussehen nimmt man den Selektor `:host`.
* **Ereignisse werden nicht mit `onclick` gebunden, sondern mit `@click`.**
  Die `on…`-Schreibweise funktioniert dort nicht.

Ein eigener Baustein kann eine Funktion `init(instance)` bereitstellen, die
beim Anlegen aufgerufen wird, dazu `connected()` und `disconnected()`.

## Wo es weitergeht

Der Adapter hat ein eigenes [Wiki](https://github.com/iobroker-community-adapters/ioBroker.webui/wiki);
der deutsche Teil ist ausführlicher als der englische. Dazu gibt es
Videoanleitungen des Entwicklers auf
[YouTube](https://www.youtube.com/@jogibear9988), ebenfalls auf Deutsch.

Unter der Oberfläche steckt der
[web-component-designer](https://github.com/node-projects/web-component-designer),
ein eigenständiges Projekt desselben Entwicklers.

## Weiterführend

* [Überblick](/docs/viz/README.md): die anderen Wege zu einer Oberfläche
* [vis-2](/docs/viz/vis-2.md) und
  [Widgetsätze](/docs/viz/widgetsets.md): der Weg mit fertigen Bausteinen
