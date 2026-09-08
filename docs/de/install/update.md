---
title:       "Updaten"
lastChanged: "07.09.2026"
---

# Updates durchführen

Eine ioBroker-Installation besteht aus drei Schichten, die getrennt voneinander
aktualisiert werden. Diese Reihenfolge hat sich bewährt:

| | Was | Wie oft |
|---|---|---|
| 1 | [Adapter](https://www.iobroker.net/#de/documentation/install/updateadapter.md) | häufig - jede Woche kommt etwas |
| 2 | [js-controller](https://www.iobroker.net/#de/documentation/install/updateself.md) | selten - wenige Male im Jahr |
| 3 | [Node.js](https://www.iobroker.net/#de/documentation/install/updatenode.md) | selten - wenn eine Version ihr Lebensende erreicht |

Dazu kommt das Betriebssystem selbst, das nach seinen eigenen Regeln versorgt
wird (`sudo apt update && sudo apt full-upgrade`).

## Vor jedem Update: sichern

!> Ein Update, das schiefgeht, kostet ohne Sicherung Tage. Mit Sicherung
   kostet es eine halbe Stunde.

```bash
iob stop
iob backup
iob start
```

Die Sicherung landet als ZIP-Datei mit Datum im Verzeichnis `backups` unterhalb
des ioBroker-Ordners. Wer den Adapter *backitup* einsetzt, hat das ohnehin
geplant laufen - dann lohnt ein Blick, ob die letzte Sicherung wirklich frisch
ist und ob sie auch außerhalb des Geräts liegt.

Auf einer Virtualisierung ist ein Schnappschuss vor dem Update die bequemste
Absicherung; im Zweifel ist der Stand von vorhin in einer Minute zurück.

## Die Reihenfolge

**Erst die Adapter, dann der js-controller.** Ein neuer js-controller verlangt
mitunter neuere Adapter; die umgekehrte Richtung ist verträglicher.

**Node.js zuletzt und nur bewusst.** Ein Wechsel der Node.js-Hauptversion ist
der Eingriff mit der größten Wirkung. Er hat eigene Voraussetzungen und eine
eigene Seite:
[Node.js & npm aktualisieren](https://www.iobroker.net/#de/documentation/install/updatenode.md).

**Nicht alles am selben Abend.** Wenn nach drei gleichzeitigen Updates etwas
klemmt, ist die Ursache schwer zu finden. Ein Schritt, kurz beobachten, dann
der nächste.

## Wo Updates angezeigt werden

Im Admin steht unter *Adapter* an jedem Eintrag, ob eine neuere Version im
Repository liegt. Auf der Konsole zeigt

```bash
iob update --updatable
```

dasselbe für alles auf einmal, ohne etwas zu verändern.

## Stable und Latest

Es gibt zwei Repositories. **Stable** enthält Versionen, die sich in der Breite
bewährt haben; **Latest** enthält alles, sobald es veröffentlicht ist. Für eine
Anlage, die verlässlich laufen soll, ist Stable die richtige Einstellung -
Latest ist für Leute gedacht, die Fehler finden und melden wollen. Näheres unter
[Repositories](https://www.iobroker.net/#de/documentation/basics/repositories.md).

## Wenn nach einem Update etwas klemmt

* [ioBroker läuft nicht mehr](https://www.iobroker.net/#de/documentation/trouble/RunsNoMore.md)
* [Adapterfehler](https://www.iobroker.net/#de/documentation/trouble/adapter.md)
* `iob diag` fasst den Zustand zusammen - Repository, Node-Version,
  Systemstand, die letzten Protokolleinträge.
