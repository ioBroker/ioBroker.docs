---
title:       "Konfiguration wiederherstellen"
lastChanged: "08.09.2026"
---

# Konfiguration wiederherstellen

Nicht jeder Schaden braucht die große Lösung. Bevor eine ganze Installation
zurückgespielt wird, lohnt sich der Blick auf die kleineren Stufen: oft reicht
es, ein einzelnes Objekt oder die Objektdatenbank von vor einer Stunde
zurückzuholen.

## Vier Stufen

| Stufe | Wann | Womit |
| --- | --- | --- |
| **Ein einzelnes Objekt** | Ein Datenpunkt wurde versehentlich geändert oder gelöscht. | Reiter Objekte, JSON einfügen |
| **Eine Instanz** | Eine Konfiguration wurde verstellt. | Instanz löschen und neu anlegen |
| **Die Objektdatenbank** | Nach einem Absturz sind Objekte weg oder unbrauchbar. | Die automatischen Sicherungen im Datenverzeichnis |
| **Die ganze Installation** | Hardwarewechsel, defekte Karte, misslungenes Update. | `iobroker restore` oder BackItUp |

## Ein einzelnes Objekt

Im Reiter [Objekte](/docs/admin/objects.md)
lässt sich ein Objekt als JSON ansehen und bearbeiten. Wer den vorherigen Stand
noch hat, etwa aus einer Sicherung oder aus der Zwischenablage, fügt ihn dort
wieder ein.

Auf der Kommandozeile geht dasselbe:

```bash
iobroker object get <id> --pretty
```

Die Ausgabe lässt sich sichern, bevor an einem Objekt etwas verändert wird. Das
ist der billigste Weg, sich abzusichern, bevor man an Rollen oder Rechten
schraubt.

## Eine Instanz

Ist nur die Konfiguration einer Instanz verstellt und der ursprüngliche Zustand
unbekannt, ist Löschen und neu Anlegen meistens schneller als das Suchen. Die
von der Instanz erzeugten Datenpunkte gehen dabei allerdings verloren, samt
ihrer Zuordnungen zu Räumen und Funktionen.

?> Vorher im Reiter Objekte den Namensraum der Instanz ansehen und notieren, was
darunter hängt. Aufgezeichnete Werte in `history`, `influxdb` oder `sql` sind
davon nicht betroffen, die liegen außerhalb.

## Die automatischen Sicherungen der Datenbank

ioBroker legt selbständig Kopien der Objektdatenbank an, unabhängig von jedem
Sicherungsadapter. Sie liegen unter:

```
/opt/iobroker/iobroker-data/backup-objects
```

Nach einem Absturz mit beschädigter Datenbank ist das die erste Stelle, an der
man nachsieht. Das Vorgehen dazu, zusammen mit den übrigen Startproblemen, steht
unter
[ioBroker läuft nicht mehr](/docs/trouble/RunsNoMore.md).

!> Vor jedem Eingriff in `iobroker-data` den ioBroker stoppen und das
Verzeichnis vorher kopieren. Ein zweiter Fehlversuch auf einem bereits
veränderten Datenbestand ist die häufigste Art, aus einem Problem zwei zu
machen.

## Die ganze Installation

Dafür gibt es zwei Wege, beide setzen ein vorhandenes Backup voraus:

```bash
iobroker stop
iobroker restore <Name oder Pfad der Sicherung>
iobroker start
```

Ohne Parameter listet `iobroker restore` die vorhandenen Sicherungen auf. Der
bequemere Weg führt über BackItUp im Reiter **Backup**. Beides ist unter
[Datensicherung](/docs/config/backup.md)
beschrieben.

Der vollständige Ablauf für ein neu aufgesetztes System, einschließlich Redis
und Homematic, steht Schritt für Schritt unter
[Restore](/docs/tutorial/restore.md).

## Wenn keine Sicherung da ist

Dann bleibt der Neuaufbau. Das ist ärgerlich, aber selten so schlimm wie
befürchtet: die Adapterliste lässt sich aus dem Gedächtnis rekonstruieren, die
Geräte melden sich beim Einrichten wieder. Verloren sind die Feinheiten, also
Skripte, Visualisierungen und die Zuordnungen zu Räumen und Funktionen.

Der erste Schritt nach dem Neuaufbau ist deshalb immer derselbe: eine
[Datensicherung einrichten](/docs/config/backup.md).
