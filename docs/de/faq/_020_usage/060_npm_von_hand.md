## Wann sollte ich von Hand mit npm etwas installieren?

Im Normalfall: **gar nicht.**

ioBroker verwaltet seine Adapter selbst. Ein `npm install` von Hand im
Verzeichnis `/opt/iobroker` legt Dateien an, von denen ioBroker nichts weiß.
Beim nächsten Update ist die Änderung weg, im schlechteren Fall ist die
Installation beschädigt.

Alles, was man braucht, geht über den Admin oder über `iob` auf der Kommandozeile.
Die Befehle stehen unter
[Kommandozeile](/docs/config/cli.md).

?> Eine Ausnahme sind zusätzliche Node-Module, die ein eigenes JavaScript-Skript
benötigt. Die werden nicht von Hand installiert, sondern in der Konfiguration der
javascript-Instanz eingetragen, dann kümmert sich ioBroker darum.
