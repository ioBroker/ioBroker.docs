---
title:       "Devices-Adapter"
lastChanged: "09.09.2026"
---

# Oberfläche aus dem Devices-Adapter

Der Adapter [devices](/adapters/devices) ist eigentlich kein
Visualisierungsadapter. Er ordnet Datenpunkte zu **Geräten**: Aus einem Schalter,
einer Rückmeldung und einem Zähler wird eine Lampe, aus vier Werten ein
Thermostat. Seit Version 4 kann er aus diesen Geräten auch gleich eine fertige
Bedienoberfläche erzeugen, und genau darum geht es auf dieser Seite.

?> Der Adapter läuft nur als Reiter im Admin. Er fragt keine Geräte ab und
braucht praktisch keine Rechenzeit.

## Warum sich der Umweg lohnt

Ein Datenpunkt allein sagt wenig. `hm-rpc.1.00085A49A3F98C.4.STATE` ist ein
`boolean`, mehr weiß das System nicht. Erst wenn daraus ein Gerät vom Typ
`light` wird, wissen die anderen Adapter, was zu tun ist:

* **vis-2** schlägt beim Anlegen eines Widgets die passenden Datenpunkte vor.
* **[Lovelace](/docs/viz/lovelace.md)** baut seine Oberfläche daraus.
* **iot** meldet das Gerät als Lampe an Alexa oder Google, nicht als Schalter.
* **matter** kann es überhaupt erst weitergeben.
* Ein Skript findet das Gerät über seinen Typ statt über eine kryptische
  Kennung.

Dazu kommt ein zweiter Vorteil, der sich erst später zeigt: Die Geräte liegen
unter `alias.0.<Name>`. Wird das Gerät später ausgetauscht, ändert man die
Zuordnung an einer Stelle. Visualisierung, Skripte und Aufzeichnung merken
nichts davon.

## Ein Gerät anlegen

Der Reiter heißt im Admin **Geräte**. Er muss wie Skripte und Protokolle in den
Einstellungen der Admin-Instanz eingeschaltet sein.

1. Auf **+** klicken, einen Namen vergeben und einen **Typ** wählen, etwa
   `light`, `blind`, `thermostat` oder `temperature`.
2. Die Datenpunkte zuordnen. Pflichtfelder sind mit `*` gekennzeichnet,
   optionale Felder wie die Luftfeuchte beim Temperatursensor kann man
   weglassen.
3. Speichern. Das Gerät erscheint unter `alias.0.<Name>` im Objektbaum.

Fast jeder Typ kennt zusätzlich **Anzeigezustände** für Batterie, Verbindung
und Fehler. Sie sind freiwillig, werden von Lovelace und matter aber
ausgewertet.

?> Ein Alias kann mehr, als nur auf einen Datenpunkt zeigen: Lesen und Schreiben
dürfen auf **verschiedene** Datenpunkte gehen, und für beide Richtungen lässt
sich eine Umrechnung hinterlegen. So wird aus einem Rollladen, der 0 für offen
meldet, ein Gerät, das sich wie alle anderen verhält.

## Woher die Geräte kommen

| Herkunft | Beschreibung |
| --- | --- |
| **Automatisch erkannt** | Adapter wie `zigbee` oder `hm-rpc` liefern bereits eine brauchbare Struktur. Der Devices-Adapter erkennt sie von selbst, **aber nur, wenn ein Raum oder eine Funktion zugeordnet ist.** Ohne Zuordnung passiert nichts. |
| **Alias** | Der empfohlene Weg für alles, was von Hand entsteht. Die Geräte liegen unter `alias.0`. |
| **Linked Devices** | Der Vorgänger über den Adapter `linkeddevices`. Für neue Installationen nicht mehr vorgesehen. |

Welche Typen es gibt und welche Datenpunkte sie erwarten, steht in der Liste des
[type-detector](https://github.com/ioBroker/ioBroker.type-detector/blob/master/DEVICES.md).

## Die eingebaute Oberfläche

Sind die Geräte angelegt, entsteht daraus auf Wunsch eine Bedienoberfläche.
Sie ist über die zugehörige `web`-Instanz erreichbar, üblicherweise unter
`http://<adresse>:8082/devices/`.

Was sich einstellen lässt:

* **Welche Geräte erscheinen.** Die Spalte **GUI** in der Geräteliste
  entscheidet darüber. Was nicht angehakt ist, bleibt draußen.
* **Räume.** Sie werden aus den Kategorien übernommen und lassen sich benennen,
  einfärben und mit einem Hintergrundbild versehen.
* **Kacheln.** Größe, Symbol und Beschriftung sind je Gerät änderbar. Wo ein
  Verlauf aufgezeichnet wird, kann die Kachel eine Kurve oder die Höchst- und
  Tiefstwerte des Tages zeigen.
* **Favoriten und Gruppen** für die Geräte, die man ständig braucht.
* **Zusätzliche Kacheln**, die kein Gerät sind: Uhr, Wetter, eine Webseite,
  ein Zeilenumbruch, sogar eine eingebettete vis-2-Ansicht.
* **Farbthemen**, unter anderem „Clean Light" und „Tech Blue".

Die Oberfläche lässt sich außerdem als Browser-Erweiterung einrichten und in die
[ioBroker VisuApp](/docs/cloud/app.md) auf dem Telefon übernehmen.

!> Diese Oberfläche ersetzt **vis-2 nicht**. Sie ist für schnelle, automatisch
erzeugte Raumansichten gedacht. Wer ein Dashboard genau nach eigenen
Vorstellungen bauen will, nimmt [vis-2](/docs/viz/README.md).

## Ein Video dazu

Der ioBroker-Kanal zeigt den ganzen Ablauf in gut zwanzig Minuten, von den
Aliasen über die Raumansicht bis zur App:
[ioBroker Devices/Geräte-Adapter: Automatische Visualisierung für Smart Home](https://www.youtube.com/watch?v=C-e8j8NHdi0)
(Mai 2026).

## Weiterführend

* [Kategorien](/docs/basics/enums.md) und der Reiter
  [Kategorien](/docs/admin/enums.md): die Grundlage für Räume und Funktionen
* [Rollen von Datenpunkten](/docs/basics/roles.md): woran ein Adapter erkennt,
  was ein Datenpunkt ist
* [Alias](/docs/basics/alias.md): was hinter `alias.0` steckt
* [Überblick](/docs/viz/README.md): die anderen Wege zu einer Oberfläche
