## Wo finde ich die Protokolle?

Im Admin im Reiter
[Protokolle](/docs/admin/log.md). Dort lässt
sich nach Instanz, Stufe und Text filtern.

Auf der Platte liegen sie unter `/opt/iobroker/log/`, eine Datei je Tag. Über den
Knopf **Log herunterladen** holt man sich die vollständige Datei.

Auf der Kommandozeile geht es auch:

```bash
iob logs          # die letzten 100 Zeilen
iob logs --watch  # fortlaufend mitlesen
```

!> In der Anzeige im Browser werden lange Zeilen abgeschnitten. Wer einer Meldung
wirklich nachgehen will, sieht in der heruntergeladenen Datei nach. Oft steht die
Ursache in den Zeilen davor.
