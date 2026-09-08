---
title:       "Die erste Visualisierung"
lastChanged: "08.09.2026"
---

# Die erste Visualisierung

Eine Visualisierung ist die Seite, die am Ende jemand bedient, der vom Admin
nichts wissen will. Diese Seite zeigt den kürzesten Weg zu einer solchen Seite.

## Erst die Kategorien

Bevor Sie irgendetwas zeichnen: pflegen Sie Räume und Funktionen im Reiter
[Kategorien](/docs/admin/enums.md). Jeder
Datenpunkt, der später auftauchen soll, gehört einem **Raum** und einer
**Funktion** an.

Der Grund: mehrere Visualisierungsadapter bauen ihre Oberfläche daraus ganz
allein. Eine halbe Stunde Zuordnen erspart unter Umständen einen ganzen Abend
Zeichnen. Und selbst wenn Sie später selbst gestalten, brauchen Sprachsteuerung
und die automatische Geräteerkennung dieselben Angaben.

!> Zugeordnet wird der **Datenpunkt**, nicht das Gerät und nicht der Kanal.

## Den einfachen Weg zuerst probieren

Installieren Sie einen Adapter, der die Oberfläche selbst aufbaut, etwa
[Material](/docs/viz/material.md), und
sehen Sie sich das Ergebnis an. Das kostet fünf Minuten. Wenn es reicht, sind
Sie fertig.

Ein Vergleich der Adapter steht in der
[Einleitung](/docs/viz/README.md) des
Kapitels Visualisierung.

## Selbst gestalten mit vis-2

Reicht es nicht, kommt **vis-2**, der Nachfolger von vis. Der Ablauf:

1. Den Adapter `vis-2` installieren und eine Instanz anlegen. Nötige
   Widgetsätze kommen als eigene Adapter dazu.
2. Den Editor öffnen. Er ist über die Kachel im
   [Schnellzugriff](/docs/admin/overview.md)
   oder über den Instanzlink im Reiter Instanzen erreichbar.
3. Eine **Ansicht** anlegen. Eine Ansicht entspricht einer Seite. Fangen Sie mit
   einer an, nicht mit dem ganzen Haus.
4. Ein **Widget** aus der Leiste auf die Fläche ziehen, etwa einen Schalter.
5. Das Widget mit einem **Datenpunkt verbinden**. Das ist der eigentliche
   Schritt: erst dadurch wird aus einem Bild eine Bedienung.
6. Speichern und die Ansicht über die Laufzeitadresse aufrufen, nicht im Editor.
   Nur so sehen Sie, was andere sehen.

?> Legen Sie die Größe der Ansicht auf das Gerät fest, auf dem sie später läuft.
Eine Seite, die für den großen Bildschirm gebaut wurde, ist auf dem Telefon
unbenutzbar, und das nachträglich zu ändern ist mühsam.

## Worauf zu achten ist

* **Ein Widget, ein Datenpunkt.** Wenn ein Schalter nichts tut, ist fast immer
  die Verbindung zum Datenpunkt nicht gesetzt oder zeigt auf den falschen.
* **Lesen und Schreiben unterscheiden.** Ein Anzeigefeld liest, ein Schalter
  schreibt. Ein Datenpunkt, der nur gelesen werden darf, lässt sich nicht
  schalten, egal welches Widget davorsteht.
* **Nicht alles auf eine Seite.** Lieber mehrere Ansichten mit einer Navigation
  dazwischen.
* **Lizenzbedingungen ansehen.** vis-2 braucht eine Lizenz, privat kostenfrei,
  gewerblich kostenpflichtig. Siehe
  [Adapterlizenzen](/docs/licenses/adapter.md).

## Von unterwegs

Die fertige Oberfläche ist zunächst nur im eigenen Netz erreichbar. Der Weg nach
draußen steht unter
[Visualisierungen über die Cloud](/docs/cloud/viz.md).
Vorher gehört an der zugehörigen `web`-Instanz die
[Anmeldung](/docs/config/login.md)
eingeschaltet.

## Wie es weitergeht

Auf einer Visualisierung will man meist auch Verläufe sehen. Dafür müssen Werte
aufgezeichnet werden:
[Werte aufzeichnen](/docs/tutorial/history.md).
