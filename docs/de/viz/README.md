---
title:       "Visualisierung"
lastChanged: "09.09.2026"
---

# Visualisierung

Eine Visualisierung ist die Oberfläche, die am Ende jemand bedient: eine Seite
im Browser oder auf dem Tablet, auf der Räume, Geräte und Messwerte zu sehen
sind und geschaltet werden kann. ioBroker selbst bringt keine mit. Sie entsteht
durch einen Adapter, und davon gibt es mehrere mit sehr unterschiedlichem
Ansatz.

## Zwei Wege

**Selbst gestalten.** Sie legen Seiten an und ziehen Bedienelemente darauf,
verbinden jedes mit einem Datenpunkt und bestimmen Größe, Farbe und Verhalten.
Das Ergebnis sieht genau so aus, wie Sie es wollen, und die Arbeit dafür fällt
auch genau bei Ihnen an.

**Erzeugen lassen.** Der Adapter baut die Oberfläche selbst, aus dem, was das
System über die Geräte weiß: aus den angelegten
[Geräten](/docs/viz/devices.md) und aus den
[Kategorien](/docs/basics/enums.md). Räume werden zu Seiten, Funktionen zu
Gruppen darauf. Gestalten lässt sich wenig, aber ein neues Gerät erscheint von
selbst an der richtigen Stelle, sobald es zugeordnet ist.

?> Wer den zweiten Weg gehen will, pflegt zuerst Räume und Funktionen. Ohne
saubere Zuordnungen bleibt die Oberfläche leer, egal welcher Adapter.

## Die verbreiteten Adapter

| Adapter | Ansatz | Anmerkung |
| --- | --- | --- |
| **[vis-2](/docs/viz/vis-2.md)** | Selbst gestalten | Der Nachfolger von vis und für neue Projekte die erste Wahl. |
| **[vis](/docs/viz/vis.md)** | Selbst gestalten | Die ältere Fassung. Sehr verbreitet, wird aber nur noch gepflegt. |
| **[webui](/docs/viz/webui.md)** | Selbst gestalten | Ein eigenständiges System aus Web Components. Mächtig, verlangt aber HTML-Kenntnisse. |
| **[Devices-Adapter](/docs/viz/devices.md)** | Erzeugen lassen | Baut die Oberfläche aus den angelegten Geräten. Der kürzeste Weg zu einer brauchbaren Ansicht. |
| **[Lovelace](/docs/viz/lovelace.md)** | Erzeugen lassen | Bringt die Oberfläche von Home Assistant nach ioBroker. Fertige Karten, eingebauter Editor. |

Mehrere davon lassen sich parallel betreiben. Das ist beim Ausprobieren
praktisch: eine Oberfläche für das Tablet an der Wand, eine andere für das
Telefon.

?> Bei vis und vis-2 kommt es weniger auf den Adapter selbst an als darauf,
welche **Widgetsätze** installiert sind. Davon gibt es über dreißig, siehe
[Widgetsätze](/docs/viz/widgetsets.md).

?> Im Repository stehen fast siebzig Adapter vom Typ Visualisierung, dazu
Widgetsätze und Symbolsammlungen. Die Tabelle nennt die vier, die gepflegt
werden. Wer etwas Bestimmtes sucht, filtert im Reiter
[Adapter](/docs/admin/adapter.md) nach der Gruppe **Visualisierung**. Dabei
lohnt ein Blick auf das Datum der letzten Veröffentlichung: Bei einigen
bekannten Namen liegt es Jahre zurück.

## Was dazugehört

**Ein Webserver.** vis, vis-2 und webui haben keinen eigenen. Sie werden über
eine Instanz des `web`-Adapters ausgeliefert, und dort wird auch die
[Anmeldung](/docs/config/login.md) eingeschaltet. Lovelace bringt einen eigenen
mit.

**Aufgezeichnete Werte**, wenn Diagramme gezeigt werden sollen. Ein Datenpunkt
kennt nur seinen aktuellen Wert. Den Verlauf liefern `history`, `influxdb` oder
`sql`, dargestellt wird er mit `echarts` oder `flot`.

**Zugriff von unterwegs**, falls die Oberfläche nicht nur zu Hause erreichbar
sein soll. Der Weg dorthin steht unter
[Visualisierungen über die Cloud](/docs/cloud/viz.md).

## Der Einstieg

1. Räume und Funktionen im Reiter
   [Kategorien](/docs/admin/enums.md)
   pflegen. Das zahlt sich bei jedem Adapter aus.
2. Die Datenpunkte im Reiter **Geräte** zu Geräten zusammenfassen. Damit weiß
   das System, was eine Lampe und was ein Rollladen ist, und alle folgenden
   Schritte werden leichter. Siehe
   [Devices-Adapter](/docs/viz/devices.md).
3. Die Oberfläche erzeugen lassen und ansehen, wie weit das trägt: mit dem
   Devices-Adapter oder mit [Lovelace](/docs/viz/lovelace.md).
4. Erst wenn das nicht reicht, mit vis-2 selbst gestalten.

Diese Reihenfolge erspart viel Arbeit. Viele Installationen kommen ohne eine
einzige selbst gezeichnete Seite aus.
