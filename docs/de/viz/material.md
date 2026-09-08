---
title:       "Material"
lastChanged: "08.09.2026"
---

# Visualisierung mit Material

Der Adapter
[material](/adapters/material)
erzeugt eine Bedienoberfläche, ohne dass eine einzige Seite gezeichnet werden
muss. Er liest die
[Kategorien](/docs/basics/enums.md) und
baut daraus die Ansicht: **Räume** werden zu Seiten, **Funktionen** zu Gruppen
darauf.

Damit ist er das Gegenstück zu vis: kaum Gestaltungsfreiheit, dafür ist die
Oberfläche in Minuten fertig und bleibt ohne Zutun aktuell.

## Voraussetzung

Der Adapter zeigt **nur** Datenpunkte an, die einem Raum oder einer Funktion
zugeordnet sind. Ohne Zuordnungen bleibt die Oberfläche leer.

?> Am besten gehört jeder Datenpunkt **beiden** Kategorien an, also einem Raum
und einer Funktion. Erst dann weiß der Adapter, wo etwas ist und was es tut, und
kann es richtig einsortieren und passend darstellen.

Wie zugeordnet wird, steht im Reiter
[Kategorien](/docs/admin/enums.md).

## Einrichten

1. Den Adapter `material` im Reiter
   [Adapter](/docs/admin/adapter.md)
   installieren und eine Instanz anlegen.
2. In den Kategorien Räume und Funktionen pflegen, falls noch nicht geschehen.
3. Die Oberfläche über die zugehörige `web`-Instanz aufrufen, üblicherweise
   `http://<adresse>:8082/material/`.

!> Der Adapter lässt sich nur aus npm installieren, nicht direkt aus GitHub.

## Wenn etwas fehlt

Zeigt die Oberfläche ein Gerät nicht oder falsch an, liegt es fast immer an den
Kategorien oder an der **Rolle** des Datenpunkts. Der Adapter erkennt an der
Rolle, ob etwas ein Schalter, ein Dimmer oder ein Messwert ist. Welche Rollen es
gibt und wofür sie stehen, steht unter
[Rollen](/docs/basics/roles.md).

Die vollständige Beschreibung mit allen Einstellungen steht in der
[Dokumentation des Adapters](/adapters/material).

?> Material ist eine von mehreren Oberflächen, die sich selbst aufbauen. Ein
Vergleich der Möglichkeiten steht in der
[Einleitung](/docs/viz/README.md) des
Kapitels.
