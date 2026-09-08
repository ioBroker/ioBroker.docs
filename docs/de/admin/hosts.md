---
title:       "Hosts"
lastChanged: "07.09.2026"
---

# Reiter Hosts

Hier stehen die Rechner, auf denen ioBroker läuft. Bei einer normalen
Installation ist das genau einer; in einem
[Multihost-System](https://www.iobroker.net/#de/documentation/config/multihost.md)
sind es der Master und alle weiteren Hosts.

<img src="media/admin_hosts.png" alt="Der Reiter Hosts mit aufgeklappter Detailzeile" width="900" />

| Nr. | Bedeutung |
| --- | --------- |
| 1 | **Benachrichtigungen** des Hosts. Die Zahl nennt die ungelesenen Meldungen. Dort stehen etwa Hinweise auf zu wenig Speicher. |
| 2 | Der **Name** des Hosts. |
| 3 | Die aktuelle **CPU**-Last. |
| 4 | Die **RAM**-Auslastung. |
| 5 | Die **Betriebszeit** des js-controllers. |
| 6 | Die **installierte** Version des js-controllers. |
| 7 | Die **verfügbare** Version. Ist sie höher als die installierte, steht hier ein Update an. |
| 8 | **Ereignisse**: ein- und ausgehende Nachrichten pro Sekunde. |
| 9 | Den **Namen ändern**. |
| 10 | **Host-Basiseinstellungen.** |
| 11 | **Host neu starten.** |
| 12 | Die **Log-Stufe** des Hosts. |
| 13 | Klappt die **Detailzeile** auf. |

Die Detailzeile nennt Plattform, Betriebssystem, Architektur, Anzahl und
Geschwindigkeit der Prozessoren, Modell, RAM, System-Betriebszeit, Node.js- und
NPM-Version, Uhrzeit und Zeitversatz des Hosts sowie die Zahl der bekannten
Adapter, die Größe des Datenträgers, den freien Speicherplatz, die Zahl der
aktiven Instanzen und das Installationsverzeichnis.

?> **Zeit und Zeitversatz** lohnen einen Blick: Läuft die Uhr des Hosts falsch,
stimmen alle Zeitstempel der Datenpunkte nicht, und zeitgesteuerte Abläufe
starten zur falschen Zeit.

## js-controller aktualisieren

Der js-controller ist der Kern von ioBroker. Sein Update wird hier angeboten,
sobald eine neuere Version im Repository steht. Wie es abläuft und was vorher zu
tun ist, steht unter
[ioBroker updaten](https://www.iobroker.net/#de/documentation/install/updateself.md).

!> Vor einem Update des js-controllers gehört ein
[Backup](https://www.iobroker.net/#de/documentation/config/backup.md) angelegt.
