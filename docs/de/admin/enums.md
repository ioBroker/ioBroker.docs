---
title:       "Kategorien"
lastChanged: "07.09.2026"
---

# Reiter Kategorien

Kategorien ordnen Datenpunkte nach **Räumen** und **Funktionen**. Ein Datenpunkt
kann in beiden stehen: das Deckenlicht im Wohnzimmer gehört zum Raum
*Wohnzimmer* und zur Funktion *Licht*.

?> Dieser Reiter hieß früher **Aufzählungen**. Intern heißen die Objekte
weiterhin `enum.rooms.*` und `enum.functions.*`.

Der Nutzen liegt bei allem, was darauf aufbaut: Visualisierungen, Sprachsteuerung
über Alexa oder Google Home und Skripte greifen darüber auf Gruppen von Geräten
zu. „Schalte das Licht im Wohnzimmer aus" funktioniert nur, wenn Raum und
Funktion gepflegt sind.

## Funktionen

<img src="media/admin_kategorien_funktionen.png" alt="Der Reiter Kategorien mit den Funktionen" width="900" />

Links stehen die Kategorien mit den zugeordneten Datenpunkten, rechts der
Objektbaum. Ein Datenpunkt wird zugeordnet, indem er aus dem Baum auf die
gewünschte Kategorie gezogen wird.

Über der Liste stehen ein **Filter**, Schaltflächen zum Auf- und Zuklappen aller
Kategorien und ein **+**, mit dem eine neue Kategorie angelegt wird. Das **+**
ganz links oben legt eine Kategorie auf oberster Ebene an.

## Räume

<img src="media/admin_kategorien_raeume.png" alt="Der Reiter Kategorien mit den Raeumen" width="900" />

Die Räume funktionieren genauso. Über das Stiftsymbol neben dem Reiternamen
lassen sich Name, Symbol und Farbe einer Kategorie ändern – die Farbe färbt die
ganze Gruppe ein und macht die Liste übersichtlich.

Räume dürfen verschachtelt werden: *Erdgeschoss* kann *Wohnzimmer* und *Küche*
enthalten.

?> Zuordnen lässt sich ein Datenpunkt auch direkt im Reiter
[Objekte](https://www.iobroker.net/#de/documentation/admin/objects.md) über die
Spalten *Raum* und *Funktion*. Beide Wege ändern dieselben Objekte.

!> Zuordnungen gehören an den **Datenpunkt**, nicht an den Kanal oder das Gerät –
sonst wissen die auswertenden Adapter nicht, welchen Wert sie schalten sollen.
