---
title:       "Updaten"
lastChanged: "23.11.2026"
---

# Updates durchführen

Eine ioBroker-Installation besteht aus drei Schichten, die getrennt voneinander
aktualisiert werden. Diese Reihenfolge hat sich bewährt:

| | Was | Wie oft |
|---|---|---|
| 1 | [Adapter](/docs/install/updateadapter.md) | häufig - jede Woche kommt etwas |
| 2 | [js-controller](/docs/install/updateself.md) | selten - wenige Male im Jahr |
| 3 | [Node.js](/docs/install/updatenode.md) | selten - wenn eine Version ihr Lebensende erreicht |

Dazu kommt das Betriebssystem selbst, das nach seinen eigenen Regeln versorgt
wird (`sudo apt update && sudo apt full-upgrade`).

?> **Unter Docker** (Abbild von buanet) kommen Node.js und Betriebssystem mit dem
   Abbild. Statt `iobroker nodejs-update` bzw. `apt` wird ein neues Abbild
   gezogen und der Container neu angelegt (`docker pull` und Container neu
   erstellen bzw. `docker compose pull && docker compose up -d`). Die Daten
   bleiben im Volume unter `/opt/iobroker` - vorher trotzdem sichern. Adapter
   und js-controller werden wie gewohnt im Admin bzw. auf der Konsole im
   Container aktualisiert. Siehe [Docker](/docs/install/docker.md) und die
   [buanet-Dokumentation](https://docs.buanet.de/de/iobroker-docker-image/).

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
[Node.js & npm aktualisieren](/docs/install/updatenode.md).

**Nicht alles am selben Abend.** Wenn nach drei gleichzeitigen Updates etwas
klemmt, ist die Ursache schwer zu finden. Ein Schritt, kurz beobachten, dann
der nächste.

## Wenn ein Adapter eine neuere Node.js-Version verlangt

Manche Adapterversionen setzen eine neuere Node.js- oder js-controller-Version
voraus. Das steht in der Änderungsliste des Adapters bzw. in seinem README unter
den Anforderungen. Dann gibt es zwei Wege:

* **Node.js bewusst vorziehen** - vorher sichern, dann wie unter
  [Node.js & npm aktualisieren](/docs/install/updatenode.md) beschrieben.
* **Vorerst bei der bisherigen Adapterversion bleiben** oder gezielt eine
  ältere, passende Version installieren: im Admin im Expertenmodus über
  *Eine bestimmte Version installieren*
  (siehe [Adapter](/docs/tutorial/adapter.md)) oder auf der Konsole:

```bash
iobroker upgrade <adaptername>@<version>
```

Ab js-controller 6 lässt sich eine unpassende Version ausblenden, damit sie
nicht ständig als Update angeboten wird, und später wieder einblenden:

```bash
iobroker version <adaptername> --ignore <version>
iobroker version <adaptername> --recognize
```

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
[Repositories](/docs/basics/repositories.md).

## Wenn nach einem Update etwas klemmt

* [ioBroker läuft nicht mehr](/docs/trouble/RunsNoMore.md)
* [Adapterfehler](/docs/trouble/adapter.md)
* `iob diag` fasst den Zustand zusammen - Repository, Node-Version,
  Systemstand, die letzten Protokolleinträge.
