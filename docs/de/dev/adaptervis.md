---
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/dev/adaptervis.md
title: VIS-Widgets debuggen
lastChanged: "09.09.2026"
---

# VIS-Widgets debuggen

Ein Widget läuft im Browser, nicht in Node.js. Der Debugger ist also der des
Browsers, nicht der von [Debugging](/docs/dev/adapterdebug.md). Der Weg dorthin
hängt davon ab, ob das Widget für **vis-2** oder für das ältere **vis 1**
gebaut ist.

## vis-2

Widgets für vis-2 sind React-Komponenten und werden in einem eigenen Paket
entwickelt. Als Ausgangspunkt dient die Vorlage
[ioBroker.vis-2-widgets-react-template](https://github.com/ioBroker/ioBroker.vis-2-widgets-react-template).

### Ohne laufenden ioBroker

Für die Arbeit am Aussehen und an der Logik genügt der eigene
Entwicklungsserver. Im Quellverzeichnis der Widgets:

```bash
npm run start
```

Danach liegt das Widget unter `http://localhost:4173`. Es wird in einer
Demo-Umgebung angezeigt, Änderungen erscheinen sofort, und die
Entwicklerwerkzeuge des Browsers zeigen den ungebauten Quelltext mit
Haltepunkten und lesbaren Namen.

### Mit laufendem ioBroker

Sobald das Widget echte Zustände braucht, kommt der
[dev-server](/docs/dev/devserver.md) dazu:

1. `dev-server watch --noStart` im Adapterverzeichnis starten.
2. `npm run start` im Quellverzeichnis der Widgets starten.
3. Im Objekt `system.adapter.<adaptername>.0` das Feld
   `common.visWidgets.<widgetname>.url` auf
   `http://localhost:4173/customWidgets.js` setzen.
4. `dev-server upload` aufrufen.
5. Den vis-2-Editor im Browser neu laden.

vis-2 lädt die Widgets dann vom Entwicklungsserver statt aus dem installierten
Adapter. Ein Neuladen der Seite genügt nach jeder Änderung.

!> Den geänderten Wert von `common.visWidgets…url` vor der Veröffentlichung
wieder zurücksetzen. Sonst sucht die Installation beim Benutzer nach
`localhost:4173`.

?> Hilfsklassen und die Migration älterer Widgets beschreibt das Paket
[@iobroker/vis-2-widgets-react-dev](https://www.npmjs.com/package/@iobroker/vis-2-widgets-react-dev).

## vis 1

Widgets für vis 1 sind HTML-Dateien mit jQuery. Sie liegen im Datenspeicher
unter `vis/widgets/` und werden von dort ausgeliefert, nicht aus dem
Adapterverzeichnis. Deshalb reicht es nicht, die Datei im Paket zu ändern.

Der Weg:

1. Im Adapter `web` in der Instanzkonfiguration den Cache abschalten. Er ist
   von Haus aus aus.
2. In `iobroker-data/iobroker.json` unter `objects` das Attribut
   `noFileCache` auf `true` setzen und ioBroker mit `iobroker restart` neu
   starten.
3. Die geänderte Widget-Datei mit `iobroker upload vis` in den Datenspeicher
   schieben.
4. Die Seite im Browser mit gedrückter Umschalttaste neu laden.

Widgets werden dynamisch nachgeladen, deshalb taucht die Datei in den
Browser-Quellen zunächst nicht auf. Ein `console.log` oder eine
[`debugger`-Anweisung](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Statements/debugger)
im Widget hilft: Über die Ausgabe in der Konsole springt man in die Datei und
kann dort Haltepunkte setzen.

!> Anleitungen, die das Ersetzen von `index.html` durch `index.html.original`
und das Ändern von `vis/cache.manifest` beschreiben, sind überholt. Der
dahinterliegende Browser-Zwischenspeicher (Application Cache) wurde 2021 aus
allen Browsern entfernt.

## Weiterführend

* [vis](/docs/viz/vis.md) und [Widgets](/docs/viz/widgets.md) aus Sicht der Benutzer
* [dev-server](/docs/dev/devserver.md)
* [Debugging](/docs/dev/adapterdebug.md) für den Node.js-Teil eines Adapters
