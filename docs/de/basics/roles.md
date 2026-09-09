---
title:       "Rollen von Datenpunkten"
lastChanged: "08.09.2026"
---

# Rollen von Datenpunkten

Jedes Objekt vom Typ `state` trägt eine Eigenschaft `common.role`. Sie sagt
nicht, **was** der Wert ist, sondern **wofür er steht**: ob er ein Schalter ist,
eine Temperatur, ein Helligkeitswert oder eine Meldung.

Ein Wert allein ist mehrdeutig. `true` kann bedeuten, dass eine Lampe brennt,
dass ein Fenster offen ist oder dass ein Gerät erreichbar ist. Erst die Rolle
macht daraus etwas, mit dem eine Oberfläche oder ein Sprachassistent umgehen
kann.

## Wozu das gut ist

**Visualisierungen** wählen danach ihr Bedienelement. Ein `switch` bekommt einen
Schalter, ein `level.dimmer` einen Schieberegler, ein `value.temperature` eine
Anzeige mit Gradzeichen. Ohne passende Rolle steht dort ein nacktes Eingabefeld.

**Sprachassistenten** erkennen daran, was ein Gerät kann. Alexa kann eine Lampe
nur dimmen, wenn ein Datenpunkt die Rolle `level.dimmer` trägt.

**Die Geräteerkennung** setzt aus mehreren Datenpunkten ein Gerät zusammen. Eine
RGB-Lampe besteht aus drei Werten, die zusammengehören:

* `switch` für ein und aus
* `level.color.rgb` mit dem Farbcode
* `level.brightness` mit der Helligkeit

Erst diese drei Rollen im selben Kanal machen aus drei Zahlen eine Lampe. Welche
Rollen ein Gerätetyp braucht und welche optional sind, steht im
[Typ-Detektor](https://github.com/ioBroker/ioBroker.type-detector/blob/master/DEVICES.md).

## Wie eine Rolle aufgebaut ist

Rollen sind gestuft und mit Punkten geschrieben, vom Allgemeinen zum Genauen:

```
switch
switch.power
level
level.color.temperature
value.temperature
```

Die erste Stufe ist die Art des Werts. Alles dahinter beschreibt ihn genauer.

| Erste Stufe | Bedeutet |
| ----------- | -------- |
| `state` | Unbekannt. Zu benutzen, wenn nichts Genaueres passt. |
| `sensor` | Ein Ja-Nein-Wert, der nur gelesen wird. Fenster offen, Bewegung erkannt. |
| `indicator` | Ein Ja-Nein-Wert für den Zustand des Geräts selbst: Batterie schwach, nicht erreichbar. Wird als kleines Symbol dargestellt. |
| `value` | Eine Zahl, die nur gelesen wird. Temperatur, Verbrauch, Feuchte. |
| `level` | Eine Zahl, die auch gesetzt werden kann. Helligkeit, Solltemperatur, Rollladenstellung. |
| `switch` | Ein Ja-Nein-Wert, der auch gesetzt werden kann. |
| `button` | Ein Auslöser. Wird nur geschrieben, hat keinen sinnvollen Lesewert. |
| `text`, `html`, `json`, `list`, `date` | Werte, die kein Gerät steuern, sondern etwas darstellen. |

?> **Immer die genaueste Rolle nehmen, die passt.** `level.color.temperature`
sagt mehr als `level`, und `switch.power` mehr als `switch`. Innerhalb eines
Kanals darf dieselbe Rolle allerdings nur einmal vorkommen, sonst weiß die
Geräteerkennung nicht, welcher der beiden Werte gemeint ist.

## Wo man die Rolle sieht und ändert

Im Admin im Reiter [Objekte](/docs/admin/objects.md) steht die Rolle in einer
eigenen Spalte. Über den Stift lässt sie sich ändern, im Expertenmodus auch
direkt im Objekt.

!> Die Rolle eines Datenpunkts zu ändern, den ein Adapter selbst anlegt, hält
meist nicht lange: beim nächsten Start schreibt der Adapter sie zurück. Wenn
eine Rolle dauerhaft falsch ist, gehört das als Fehlermeldung zum Adapter. Für
den eigenen Gebrauch ist ein [Alias](/docs/basics/alias.md) der bessere Weg,
denn dort lässt sich die Rolle frei setzen, ohne den Adapter anzufassen.

## Die vollständige Liste

Alle Rollen mit ihren Datentypen, den Pflichtangaben und den veralteten
Schreibweisen stehen unter
[Zustandsrollen](/docs/dev/stateroles.md) im Kapitel Adapterentwicklung. Diese
Liste ist die verbindliche; sie wird zusammen mit dem Typ-Detektor gepflegt.
