---
title:       "Installation Fixer"
lastChanged: "08.09.2026"
---

# Rechteprobleme beheben

ioBroker läuft unter einem eigenen Benutzer namens `iobroker`, nicht als `root`.
Dieser Benutzer braucht bestimmte Rechte auf das Verzeichnis
`/opt/iobroker`, auf npm und auf einige Systemdienste. Stimmen die nicht,
äußert sich das in Fehlern, die auf den ersten Blick nach etwas ganz anderem
aussehen: Adapter lassen sich nicht installieren, Dateien nicht schreiben,
Instanzen starten nicht.

Der **Fixer** stellt diese Rechte wieder her.

```bash
curl -sLf https://iobroker.net/fix.sh | bash -
```

Das Skript wird wie das Installationsskript von GitHub geladen und ist damit
immer auf dem aktuellen Stand.

## Wann er hilft

* Nach einer Installation, die mit `sudo` oder als `root` durchgeführt wurde.
* Wenn Adapter sich nicht installieren lassen und das Log auf Rechte zeigt
  (`EACCES`, `permission denied`).
* Nachdem **Redis** nachträglich installiert wurde. Der Fixer setzt die Rechte,
  die ioBroker für den Zugriff braucht.
* Nach einem Umzug des Verzeichnisses oder einer Wiederherstellung, bei der die
  Besitzverhältnisse durcheinandergeraten sind.
* Vorbeugend, bevor man im Forum um Hilfe bittet. Ein System, auf dem der Fixer
  gelaufen ist, lässt sich leichter unterstützen.

Er darf **beliebig oft** ausgeführt werden. Genau dafür ist er gedacht: Wenn das
Installationsskript weiterentwickelt wird, bringt der Fixer eine bestehende
Installation auf denselben Stand.

## Was er tut und was nicht

**Er tut**: den Benutzer `iobroker` anlegen, falls er fehlt, die Datei- und
Verzeichnisrechte unter `/opt/iobroker` setzen, die nötigen sudo-Rechte
einrichten und die Sonderfälle für Redis und BackItUp behandeln.

**Er tut nicht**: Node.js, npm, den js-controller oder irgendeinen Adapter
aktualisieren. Er fasst ausschließlich Rechte und Besitzverhältnisse an. Wer ein
Update sucht, ist unter
[Updates einspielen](/docs/tutorial/updates.md) richtig.

## Ausführen

Als **normaler Benutzer**, nicht als `root` und ohne `sudo` davor. Das
Verzeichnis, aus dem heraus man ihn aufruft, ist gleichgültig; der Fixer
erwartet die Installation in `/opt/iobroker`.

Er gilt für alle Linux-Systeme. Windows deckt er nicht ab.

!> **Unter Docker nicht anwenden.** Im Container läuft ohnehin alles als `root`,
die Rechte sind dort anders gedacht, und der Fixer kann mehr zerstören als
richten. Bei Problemen mit dem Docker-Abbild führt der Weg über dessen
[eigene Dokumentation](https://docs.buanet.de/de/iobroker-docker-image/).

?> Wer unsicher ist: Der Fixer ändert nichts am Inhalt, nur an den Rechten. Eine
Kopie des Verzeichnisses vorher schadet trotzdem nie, und eine
[Sicherung](/docs/config/backup.md) sollte ohnehin vorhanden sein.

## Was er geändert hat

Beide Skripte führen ein Änderungsprotokoll:

* [Installationsskript](https://github.com/ioBroker/ioBroker/blob/master/CHANGELOG_INSTALLER_LINUX.md)
* [Fixer](https://github.com/ioBroker/ioBroker/blob/master/CHANGELOG_FIXER_LINUX.md)

Wer Shell lesen kann, sieht im Skript selbst nach, bevor er es ausführt. Das ist
bei jedem Befehl, der mit `curl ... | bash` endet, eine gute Gewohnheit.
