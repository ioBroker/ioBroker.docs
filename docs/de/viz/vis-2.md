---
title:       "vis-2"
lastChanged: "09.09.2026"
---

# vis-2

**vis-2** ist die Visualisierung von ioBroker: eine Oberfläche, die man sich aus
Bausteinen selbst zusammenstellt, ohne zu programmieren. Sie ist der Nachfolger
von [vis](/docs/viz/vis.md) und die richtige Wahl für jedes neue Projekt.

Was sie von den anderen Oberflächen unterscheidet: vis-2 baut nichts von selbst.
Der [Devices-Adapter](/docs/viz/devices.md) und
[Lovelace](/docs/viz/lovelace.md) erzeugen ihre Seiten aus den Geräten und
Kategorien; hier bestimmt man jede Kachel selbst. Das kostet Zeit und ist der
einzige Weg, wenn die Oberfläche genau so aussehen soll, wie man sie sich
vorstellt.

Fertige Beispiele stehen unter <https://iobroker.click>.

## Lizenz

vis-2 ist der einzige Teil von ioBroker, der eine Lizenz verlangt. Der Quelltext
steht unter CC BY-NC, was bei der Installation zu bestätigen ist, und zusätzlich
braucht der Adapter eine Lizenz. Drei Fassungen gibt es:

| Lizenz | Für wen |
| --- | --- |
| **Community** | Privat, kostenfrei. Ein Konto auf [iobroker.net](https://iobroker.net) genügt. |
| **Offline** | Privat, gegen eine kleine Gebühr. |
| **Kommerziell** | Gewerbliche Nutzung und Weitergabe an Kunden. |

!> Die **Community-Lizenz wird beim Start des Adapters online geprüft**. Genau
in diesem Moment muss die Anlage ins Internet kommen. Wer das nicht will oder
nicht kann, nimmt die Offline-Lizenz; sie verzichtet auf die Prüfung.
Einzelheiten und Preise unter [Adapterlizenzen](/docs/licenses/adapter.md) und
in der [Produktübersicht](/productoverview).

## Installation

Der Adapter heißt [`vis-2`](/adapters/vis-2). Er braucht den
[web-Adapter](/adapters/web) und läuft als **Singleton**: es kann nur eine
Instanz geben.

Danach gibt es zwei Adressen:

| | Adresse |
| --- | --- |
| Anzeige (Runtime) | `http://<server>:8082/vis-2/index.html` |
| Editor | `http://<server>:8082/vis-2/edit.html` |

Eine bestimmte Seite erreicht man mit `index.html#Seitenname`. Beide Adressen
stehen auch als Verweis im Reiter **Instanzen**.

## Der Editor

Der Editor teilt sich in vier Bereiche:

| Bereich | Inhalt |
| --- | --- |
| **Werkzeugleiste** oben | Neue Seite, Seitenliste, Ausschneiden und Einfügen, Rückgängig und Wiederholen, Ausrichten mehrerer Widgets, Vorschau, dazu rechts **Einstell.**, **Projekte**, **Objekte** und **Dateien** |
| **Palette** links | alle verfügbaren Widgets, nach Widgetsatz gruppiert, mit Suchfeld |
| **Arbeitsfläche** Mitte | die geöffneten Seiten als Reiter |
| **Attribute** rechts | die Einstellungen des Gewählten, mit den Reitern **Seite**, **Widget** und **CSS** |

Palette und Attribute lassen sich schmal stellen oder ganz schließen, wenn die
Arbeitsfläche mehr Platz braucht.

?> **Eine Ansicht heißt in vis-2 „Seite".** In vis 1 hieß dasselbe „View"
beziehungsweise „Ansicht", und in vielen Anleitungen im Netz steht es weiterhin
so. Gemeint ist immer dasselbe: eine Bildschirmseite voller Widgets.

## Seiten

Ein Projekt besteht aus mehreren Seiten. Jede Seite hat unter **Attribute →
Seite** ihre eigenen Einstellungen, gruppiert nach Zweck:

* **CSS allgemein**, **CSS-Hintergrund** und **CSS-Schriftart und -Text** für das
  Aussehen,
* **Optionen** für das Verhalten,
* **Navigation** und **Anwendungsleiste** für das Menü,
* **Responsive Einstellungen** für das Verhalten auf schmalen Bildschirmen.

### Navigation

Statt jede Seite von Hand zu verlinken, nimmt man sie in die **Navigation** auf.
vis-2 baut daraus eine Seitenleiste mit Titel und Reihenfolge, dazu wahlweise
eine Anwendungsleiste am oberen Rand. Das ist der schnellste Weg zu einer
Oberfläche, die sich auf dem Telefon bedienen lässt.

### Welche Seite zuerst erscheint

Jeder Seite lässt sich eine **Auflösung** zuordnen und ein Häkchen **Standard**
setzen. Wird `index.html` ohne Seitennamen aufgerufen, öffnet vis-2 die Seite,
die am besten zum Bildschirm passt. So kann man zwei Seiten „Hochkant" und
„Quer" bauen, zwischen denen beim Drehen des Telefons gewechselt wird. Trägt nur
eine einzige Seite das Häkchen, wird immer sie geöffnet.

Die Auflösung ist dabei nur eine Hilfslinie im Editor. In der laufenden Anzeige
ist sie unsichtbar, und Widgets außerhalb davon sind trotzdem zu sehen.

?> Das Widget **basic → Screen Resolution** zeigt die tatsächliche
Bildschirmgröße und die dafür passende Standardseite an. Beim Einrichten ist es
sehr nützlich, danach nimmt man es wieder von der Seite.

## Widgets

Ein Widget wird aus der Palette auf die Seite gezogen und bekommt unter
**Attribute → Widget** seine Datenpunkte zugewiesen. Welche Bausteine zur
Auswahl stehen, hängt davon ab, welche Widgetsätze installiert sind. vis-2
liefert fünf mit, alle weiteren sind eigene Adapter, siehe
[Widgetsätze](/docs/viz/widgetsets.md).

Die klassischen Sätze aus vis 1 lassen sich ebenfalls verwenden. Sie sehen dort
allerdings aus wie in vis 1 und folgen nicht dem Thema von vis-2.

### Position: fest oder fließend

Standardmäßig liegt ein Widget an festen Koordinaten. Setzt man seine Position
auf **relativ**, ordnen sich die Widgets von selbst in Spalten an und laufen auf
einem schmalen Bildschirm untereinander. Für eine Oberfläche, die auf Tablet und
Telefon zugleich funktionieren soll, ist das der einfachere Weg als zwei Seiten
mit festen Koordinaten.

## Bindungen

Fast jedes Widget hat ein Feld für die Objekt-ID. Darüber hinaus lässt sich
**jedes** Attribut an einen Datenpunkt binden: einfach `{objekt.id}` in das Feld
schreiben, etwa `{hm-rpc.0.OEQ1880105.4.ACTUAL_TEMPERATURE}`.

Mit mehreren Werten und einer Formel geht auch mehr:

```
{h:javascript.0.myCustom.height;w:javascript.0.myCustom.width;h*w}
```

Vor dem Doppelpunkt steht der Name, unter dem der Wert in der Formel auftaucht.
Der letzte Abschnitt ist die Formel selbst, in der jede JavaScript-Funktion des
Browsers erlaubt ist.

!> **Alle Werte kommen als Zeichenkette an.** Wer rechnet, packt sie in
`parseFloat()`, sonst hängt vis-2 die Zahlen aneinander, statt sie zu addieren.

Zwei Feinheiten: Ein Doppelpunkt **innerhalb** einer Formel wird als `::`
geschrieben, weil das einfache Zeichen die Namen trennt. Und eine CSS-Angabe wie
`{style: value}` würde als Bindung gelesen; sie gehört deshalb in doppelte
Klammern, `{{style: value}}`.

Neben Datenpunkten gibt es eingebaute Namen:

| Name | Wert |
| --- | --- |
| `username` | der angemeldete Benutzer |
| `view` | Name der aktuellen Seite |
| `wid`, `wname` | Kennung und Name des Widgets |
| `widgetOid` | die Objekt-ID des Widgets, etwa `{t:widgetOid.val;t}` |
| `language` | die eingestellte Sprache |
| `instance` | die Kennung dieses Browsers |
| `login` | ob eine Anmeldung verlangt wird |
| `local_*` | eine Variable, die nur in diesem Browser gilt und nicht nach ioBroker zurückgeschrieben wird |

## Filter

Jedes Widget hat ein Feld **filter**. Trägt man dort einen Begriff ein, etwa
`licht`, lässt sich die Seite mit dem Widget `filter - dropdown` auf diese Gruppe
einschränken. So passen viele Widgets auf eine Seite, ohne dass alle gleichzeitig
zu sehen sind.

Die Einträge tragen die CSS-Klasse `vis-filter-item`, der aktive zusätzlich
`vis-filter-item-active`. Zwei Dinge sind dabei zu wissen: Eine Farbe, die im
Widget selbst eingestellt ist, steht als Inline-Stil und lässt sich vom
Projekt-CSS nicht überschreiben; wer über CSS färben will, lässt sie leer. Und
die Einträge eines Klappfelds werden außerhalb des Widgets gezeichnet, sind also
nur allgemein ansprechbar, nicht über die Kennung eines einzelnen Widgets.

## Von außen steuern

vis-2 legt drei Datenpunkte an, über die sich eine laufende Anzeige fernsteuern
lässt:

| Datenpunkt | Inhalt |
| --- | --- |
| `vis-2.0.control.instance` | die Kennung des Browsers, oder `FFFFFFFF` für alle |
| `vis-2.0.control.data` | der Parameter des Befehls |
| `vis-2.0.control.command` | der Befehl. **Diesen zuletzt schreiben**, er löst aus. |

Befehle: `changeView` (auf eine andere Seite wechseln, wahlweise
`projekt/seite`), `refresh` beziehungsweise `reload`, `alert`
(`Meldung;Titel;Symbol`), `dialog` und `dialogClose`, `popup` (öffnet eine
Adresse in einem neuen Fenster) und `playSound`.

Kürzer geht es als JSON in einem einzigen Schreibvorgang:

```js
setState('vis-2.0.control.command', { instance: '*', command: 'refresh', data: '' });
```

Umgekehrt meldet vis-2 einen Seitenwechsel zurück: `control.command` steht dann
auf `changedView` und `control.data` auf `projekt/seite`, jeweils mit `ack=true`.
Darauf lässt sich in einem Skript reagieren.

?> `playSound` funktioniert erst, nachdem der Benutzer die Seite mindestens
einmal angetippt hat. Das ist eine Regel der Browser, kein Fehler von vis-2. Auf
einem Wandtablet, das nur anzeigt, kommt deshalb kein Ton.

## Rechte

Für jeden ioBroker-Benutzer lassen sich **Lesen** und **Schreiben** getrennt
vergeben, auf drei Ebenen:

* **Projekt**: Lesen heißt, der Benutzer darf die Anzeige öffnen; Schreiben
  heißt, er darf den Editor benutzen.
* **Seite**: dasselbe für einzelne Seiten.
* **Widget**: ohne Leserecht wird das Widget in der Anzeige nicht gezeichnet,
  ohne Schreibrecht nicht im Editor.

Vergeben wird das im Projektdialog. Ein neu angelegter Benutzer hat beide Rechte.
Fehlt ein Recht schon auf Projektebene, hilft es nichts, es auf einer Seite zu
setzen. Wer eine Seite ohne Recht aufruft, landet in der Projektauswahl.

## Einstellungen für den Betrieb

Unter **Einstell.** stehen drei Werte, die vor allem für Wandtablets zählen:

* **Neu laden nach längerem Schlaf**: Wie lange die Verbindung unterbrochen sein
  darf, bevor die Seite vollständig neu geladen wird. Auf „nie" gestellt, wird
  nie neu geladen.
* **Wiederverbindungsintervall**: wie oft ein neuer Verbindungsversuch
  unternommen wird.
* **Dunkler Wiederverbindungsbildschirm**: damit ein Tablet im Schlafzimmer
  nachts nicht plötzlich hell aufleuchtet.

Alle drei gelten nur für das Wiederverbinden, nicht für den ersten Aufbau.

## Wo das Projekt liegt

Ein Projekt ist eine einzige Datei im Dateispeicher von ioBroker:
`vis-2.0/<Projekt>/vis-views.json`, daneben die hochgeladenen Bilder und das
eigene Stylesheet. Über **Projekte** lässt sich ein Projekt anlegen, umbenennen,
als ZIP exportieren und wieder einlesen. Der Export ist der einfachste Weg, eine
Oberfläche auf eine andere Anlage zu bringen.

?> Der Export gehört in die Datensicherung. Ein ioBroker-Backup enthält den
Dateispeicher zwar mit, aber ein einzelnes Projekt daraus zurückzuholen ist
umständlicher als eine ZIP-Datei einzulesen.

## Umstieg von vis 1

Beide Adapter lassen sich nebeneinander betreiben, sie stören sich nicht. Das ist
auch der ruhigste Weg: das alte Projekt in vis stehen lassen, in vis-2 daneben
neu anfangen und erst umschalten, wenn die neue Oberfläche vollständig ist.

Die klassischen Widgetsätze stehen in vis-2 zur Verfügung, an den vertrauten
Bausteinen fehlt es also nicht. Ein exportiertes Projekt lässt sich im
Projektdialog einlesen; wie viel davon ankommt, hängt von den benutzten Widgets
ab. Also erst an einer Kopie versuchen, nicht am laufenden Projekt.
