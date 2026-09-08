---
title:       "Visualisierung"
lastChanged: "08.09.2026"
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

**Erzeugen lassen.** Der Adapter baut die Oberfläche selbst, und zwar aus den
[Kategorien](/docs/basics/enums.md): Räume
werden zu Seiten, Funktionen zu Gruppen darauf. Gestalten lässt sich wenig, aber
ein neues Gerät erscheint von selbst an der richtigen Stelle, sobald es
zugeordnet ist.

?> Wer den zweiten Weg gehen will, pflegt zuerst Räume und Funktionen. Ohne
saubere Zuordnungen bleibt die Oberfläche leer, egal welcher Adapter.

## Die verbreiteten Adapter

| Adapter | Ansatz | Anmerkung |
| --- | --- | --- |
| **[vis-2](/adapters/vis-2)** | Selbst gestalten | Der Nachfolger von vis. Für neue Projekte die erste Wahl. |
| **[vis](/docs/viz/vis.md)** | Selbst gestalten | Die ältere Fassung. Sehr verbreitet, viele Widgetsätze. |
| **[Material](/docs/viz/material.md)** | Erzeugen lassen | Baut die Oberfläche aus Räumen und Funktionen. |
| **[Lovelace](/adapters/lovelace)** | Erzeugen lassen | Bringt die Oberfläche von Home Assistant nach ioBroker. |
| **[iQontrol](/adapters/iqontrol)** | Gemischt | Geräteorientiert, mit wenig Aufwand zu einem brauchbaren Ergebnis. |
| **[jarvis](/adapters/jarvis)** | Gemischt | Ebenfalls geräteorientiert, stark konfigurierbar. |

Mehrere davon lassen sich parallel betreiben. Das ist beim Ausprobieren
praktisch: eine Oberfläche für das Tablet an der Wand, eine andere für das
Telefon.

## Was dazugehört

**Ein Webserver.** vis und Material haben keinen eigenen. Sie werden über eine
Instanz des `web`-Adapters ausgeliefert, und dort wird auch die
[Anmeldung](/docs/config/login.md)
eingeschaltet.

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
2. Einen erzeugenden Adapter installieren und ansehen, wie weit das trägt.
3. Erst wenn das nicht reicht, mit vis-2 selbst gestalten.

Diese Reihenfolge erspart viel Arbeit. Viele Installationen kommen ohne eine
einzige selbst gezeichnete Seite aus.
