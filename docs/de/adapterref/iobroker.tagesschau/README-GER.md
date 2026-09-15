---
chapters: {"pages":{"en/adapterref/iobroker.tagesschau/README.md":{"title":{"en":"ioBroker.tagesschau"},"content":"en/adapterref/iobroker.tagesschau/README.md"},"en/adapterref/iobroker.tagesschau/README-GER.md":{"title":{"en":"ioBroker.tagesschau"},"content":"en/adapterref/iobroker.tagesschau/README-GER.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tagesschau/README-GER.md
title: ioBroker.tagesschau
hash: EU8FNZ2XwOAJP2KDYI832vBvd5tASEZTmwmrFX6Iik4=
---
![Logo](../../../en/adapterref/iobroker.tagesschau/admin/tagesschau.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.tagesschau.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.tagesschau.svg)
![Anzahl der Installationen](https://iobroker.live/badges/tagesschau-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/tagesschau-stable.svg)
![NPM](https://nodei.co/npm/iobroker.tagesschau.png?downloads=true)
![Test und Freigabe](https://github.com/ticaki/ioBroker.tagesschau/workflows/Test%20and%20Release/badge.svg)

# ioBroker.tagesschau

## tagesschau-Adapter für ioBroker

Ruft News und Videolinks von Tagesschau ab.

Installieren – Im Admin gewünschtes einstellen – fertig.

**Laut Tagesschau api sind 60 Abfragen pro Stunde in Ordnung. Jedes Themengebiet und Video sind 1 Abfrage. 30 Minuten pro Aktualisierung pass immer. Keine Ahnung, wie genau die das nehmen.**

Hinweis:

1. Wenn „Nachrichten aktivieren“ oder „Videonachrichten aktivieren“ nicht ausgewählt ist, wird der Adapter angehalten
2. Bei Nachrichten läuft der Adapter nur, wenn in der Konfiguration 1 Thema und 1 Bundesland ausgewählt sind.
3. Die Schlüsselwörter werden aus den Nachrichten gewonnen und sind erst nach dem ersten Durchlauf verfügbar. Es wird mit der Zeit immer mehr! Diese greifen nur bei den Nachrichten nicht bei Videos.

Die Scrollmöglichkeiten sollten soweit selbsterklärend sein, findet man unter news.controls

- Wenn bei der Benutzung der automatischen Scrollfunktion alle Synchronisierungen ausgeführt werden sollen, überall den gleichen Intervall einstellen und den Adapter neu starten.
- Denken Sie beim Einstellen des Intervalls daran, dass schnell alle Zustände unter Nachrichten neu geschrieben werden. Das kann je nach Auswahl ein paar tausend sein. (min. 2 Sekunden - nicht empfohlen)

Beispiel was mit VIS möglich ist:![Videoansicht von Armilar](img/BeispielVideoansicht1.png)![Videoansicht von bahnuhr](../../../en/adapterref/iobroker.tagesschau/img/BeispielVideoansicht2.png) Weiteres zu den Bildern: <https://forum.iobroker.net/post/1235111>