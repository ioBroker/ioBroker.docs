---
chapters: {"pages":{"en/adapterref/iobroker.tagesschau/README.md":{"title":{"en":"ioBroker.tagesschau"},"content":"en/adapterref/iobroker.tagesschau/README.md"},"en/adapterref/iobroker.tagesschau/README-GER.md":{"title":{"en":"ioBroker.tagesschau"},"content":"en/adapterref/iobroker.tagesschau/README-GER.md"}}}
---
![Logo](admin/tagesschau.png)
# ioBroker.tagesschau

[![NPM version](https://img.shields.io/npm/v/iobroker.tagesschau.svg)](https://www.npmjs.com/package/iobroker.tagesschau)
[![Downloads](https://img.shields.io/npm/dm/iobroker.tagesschau.svg)](https://www.npmjs.com/package/iobroker.tagesschau)
![Number of Installations](https://iobroker.live/badges/tagesschau-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/tagesschau-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.tagesschau.png?downloads=true)](https://nodei.co/npm/iobroker.tagesschau/)

**Tests:** ![Test and Release](https://github.com/ticaki/ioBroker.tagesschau/workflows/Test%20and%20Release/badge.svg)

## tagesschau adapter for ioBroker

Ruft News und Videolinks von Tagesschau ab.

Installieren - Im Admin gewünschtes einstellen - fertig.

**Laut Tagesschau api sind 60 Abfragen pro Stunde in Ordnung. Jedes Themengebiet und Video sind 1 Abfrage. 30 Minuten pro Aktualisierung passen immer. Keine Ahnung wie genau die das nehmen.**

Beachten: 
1. Wenn nicht Nachrichten aktivieren oder Videonachrichten aktivieren ausgewählt sind pausiert der Adapter
2. Bei aktivieren Nachrichten läuft der Adapter nur, wenn in der Konfiguration 1 Thema und 1 Bundesland ausgewählt sind.
3. Die Schlüsselwörter werden aus den Nachrichten gewonnen und sind erst nach dem ersten Durchlauf verfügbar. Es werden mit der Zeit immer mehr! Diese greifen nur bei den Nachrichten nicht bei Videos.

Die Scrollmöglichkeiten sollten soweit selbsterklärend sein, findet man unter news.controls
- Wenn die bei Benutzung der automatischen Scrollfunktion alle sychron laufen sollen, überall den gleichen Interval einstellen und Adapter neustarten. 
- Beim Einstellen des Intervalls bedenken, dass fast alle States unter News neu geschrieben werden. Das können je nach Auswahl ein paar tausend sein. (min. 2 Sekunden - nicht empfohlen)

Beispiel was mit VIS möglich ist: 
![Videoansicht von Armilar](img/BeispielVideoansicht1.png)
![Videoansicht von bahnuhr](img/BeispielVideoansicht2.png)
Weiteres zu den Bilder: https://forum.iobroker.net/post/1235111