## Wie aktualisiere ich Node.js richtig?

Innerhalb einer Hauptversion (z. B. 22.9 auf 22.11) genügt das normale
Systemupdate:

```bash
sudo apt update && sudo apt upgrade
```

Ein Wechsel der **Hauptversion** (z. B. von 20 auf 22) ist etwas anderes. Dabei
müssen die Module neu gebaut werden, sonst starten Adapter nicht mehr. Das
übernimmt der Befehl `iob nodejs-update`.

!> Vorher ein [Backup](/docs/config/backup.md)
anlegen. Und **niemals** eine Hauptversion überspringen oder auf eine ungerade
Version wechseln.

Der vollständige Ablauf steht unter
[Node.js aktualisieren](/docs/install/updatenode.md).

?> Ein Update von ioBroker selbst ist etwas anderes als ein Update von Node.js.
Für ioBroker siehe
[Updaten](/docs/install/update.md).
