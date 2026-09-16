---
title:       "Fehlersuche"
lastChanged: "08.09.2026"
---

# Fehlersuche

Wenn etwas nicht funktioniert, ist die Versuchung groß, sofort etwas zu ändern:
Instanz neu starten, Adapter neu installieren, System neu aufsetzen. Meistens
kostet das nur Zeit, weil die Ursache dabei unbekannt bleibt und der Fehler
wiederkommt. Diese Seite beschreibt die Reihenfolge, mit der man ihn stattdessen
findet.

## Erst eingrenzen, dann ändern

Vier Fragen klären in wenigen Minuten, wo der Fehler überhaupt sitzt:

1. **Läuft ioBroker überhaupt?** `iobroker status` auf der Kommandozeile, oder
   ob der Admin sich öffnen lässt. Wenn nicht, geht es unter
   [ioBroker läuft nicht mehr](/docs/trouble/RunsNoMore.md)
   weiter.
2. **Läuft die betroffene Instanz?** Im Reiter
   [Instanzen](/docs/admin/instances.md)
   zeigt der farbige Punkt den Zustand. Rot heißt: sie läuft nicht.
3. **Kommen Werte an?** Im Reiter
   [Objekte](/docs/admin/objects.md) den
   fraglichen Datenpunkt suchen und auf den Zeitstempel sehen. Ist er alt,
   liefert der Adapter nichts. Ist er aktuell, liegt der Fehler weiter hinten,
   etwa im Skript oder in der Visualisierung.
4. **Seit wann?** Was wurde zuletzt geändert: ein Update, ein neuer Adapter, ein
   neues Skript, ein Stromausfall. Der zeitliche Zusammenhang ist oft die halbe
   Antwort.

## Das Protokoll lesen

Das [Protokoll](/docs/admin/log.md) ist die
wichtigste Quelle. Zwei Dinge sind dabei wichtig:

**Nach oben lesen, nicht nach unten.** Die auffällige rote Fehlermeldung ist oft
die Folge, nicht die Ursache. Die eigentliche Ursache steht meist einige Zeilen
darüber.

**Die Datei nehmen, nicht die Anzeige.** In der Ansicht im Browser werden lange
Zeilen abgeschnitten, und sie enthält nur die Meldungen des aktuellen Tages ab
dem Öffnen der Seite. Die vollständige Tagesdatei liegt unter
`/opt/iobroker/log` und lässt sich im Reiter Protokolle herunterladen. Auf der
Kommandozeile geht auch:

```bash
iobroker logs --lines 200
iobroker logs --lines 100 --watch
```

Mit `--watch` läuft die Ausgabe mit. Das ist der bequemste Weg, um zu sehen, was
beim Start einer Instanz tatsächlich passiert.

## Mehr Protokoll anfordern

Reicht das nicht, wird die Protokollebene der betroffenen Instanz vorübergehend
auf `debug` gestellt. Das geht im Reiter Instanzen an der Instanz selbst. Danach
die Instanz neu starten, den Fehler noch einmal auslösen und die Datei ansehen.

!> Danach wieder auf `info` zurückstellen. `debug` erzeugt sehr viel Text, kostet
Schreibzugriffe und ist auf einer SD-Karte keine gute Idee.

## Weitere Stellen, an denen etwas steht

| Wo | Was dort steht |
| --- | --- |
| [Hosts](/docs/admin/hosts.md) | Benachrichtigungen des Systems: zu wenig Speicher, abgestürzte Instanzen, anstehende Updates. |
| [Übersicht](/docs/admin/overview.md) | Systemstatus, RAM, freier Speicherplatz. Ein volles Dateisystem verursacht die merkwürdigsten Fehler. |
| Detailzeile einer Instanz | Anzahl der Neustarts. Eine Instanz, die sich dauernd neu startet, protokolliert immer wieder denselben Anfang. |
| [Leistung](/docs/trouble/monitoring.md) | Wenn nichts kaputt ist, sondern nur alles langsam. |

## Die häufigsten Ursachen

* **Zu wenig Speicherplatz.** `df -h` auf der Kommandozeile. Läuft die Platte
  voll, lassen sich Datenbanken nicht mehr schreiben.
* **Zu wenig Arbeitsspeicher.** Instanzen werden dann vom Betriebssystem
  beendet, im Protokoll steht davon oft nichts.
* **Eine sterbende SD-Karte.** Sprunghafte, wechselnde Fehler ohne erkennbares
  Muster sind ein typisches Zeichen.
* **Falsche Node.js-Version.** Ungerade Versionen werden nicht unterstützt.
  `iobroker version` und
  [Node.js aktualisieren](/docs/install/updatenode.md).
* **Ein Adapter aus GitHub**, der neuer ist als das übrige System.

## Wenn es nicht weitergeht

Dann ist die Frage im Forum dran, oder ein Fehlerbericht beim Entwickler. Beides
lebt davon, dass die Vorarbeit von dieser Seite bereits gemacht ist. Wie eine
Frage aussehen sollte, damit sie beantwortet werden kann, steht unter
[Forum](/docs/trouble/forum.md), wie ein
Fehlerbericht aussehen muss unter
[Fehler melden](/docs/trouble/issue.md).
