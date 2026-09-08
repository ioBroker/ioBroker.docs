---
title:       "Was ist ein Repository?"
lastChanged: "07.09.2026"
---

# Was ist ein Repository?

Ein Repository ist ein zentraler Aufbewahrungsort für Software. Die Adapter, die
der Admin zur Installation anbietet, stammen aus einem solchen Repository.

ioBroker bringt zwei mit:

| Repository | Inhalt |
| ---------- | ------ |
| **stable** | Adapterversionen, die getestet sind und auf einem produktiven System benutzt werden können. Voreingestellt. |
| **beta** | Versionen, die sich noch in der Testphase befinden und Fehler enthalten können. Dieses Repository hieß früher *latest*. |

!> Für eine Installation, die zuverlässig laufen soll, gehört **immer** das
Stable-Repository eingestellt. Die Versionen im Beta-Repository können Fehler
enthalten, die das ganze System beeinträchtigen.

## Das Repository auswählen

Die Einstellung steht in den
[Systemeinstellungen](https://www.iobroker.net/#de/documentation/admin/settings.md)
im Reiter **Repositories**. Geöffnet werden sie über den Punkt **System** ganz
unten in der Menüleiste des Admin.

<img src="media/repository_einstellungen.png" alt="Der Reiter Repositories in den Basiseinstellungen" width="900" />

| Nr. | Spalte |
| --- | ------ |
| 1 | **Aktiv**: hier wird ausgewählt, welches Repository benutzt wird. |
| 2 | **Stable**: wird beim ersten Einlesen automatisch gesetzt, wenn ioBroker das Repository als stabil erkennt. |
| 3 | **Automatisches Upgrade**: ob Adapter aus diesem Repository selbständig aktualisiert werden dürfen. |
| 4 | **Name**: frei wählbar. |
| 5 | **Link**: die Adresse der Adapterliste. |

Oben links legt das **+** ein weiteres Repository an. Der Knopf mit dem Pfeil
daneben setzt die Pfade von *stable* und *beta* auf die Voreinstellung zurück
und löscht dabei auch selbst hinzugefügte Repositories.

Die Standardpfade lauten:

* stable: `http://download.iobroker.net/sources-dist.json`
* beta: `http://download.iobroker.net/sources-dist-latest.json`

Ist das Beta-Repository aktiv, weist der Reiter
[Adapter](https://www.iobroker.net/#de/documentation/admin/adapter.md) mit einer
Warnung darauf hin:

<img src="media/repository_warnung.png" alt="Die Warnung im Adapter-Reiter, wenn das Beta-Repository aktiv ist" width="900" />

## Einen einzelnen Adapter aus dem Beta-Repository

Früher hieß das: von stable auf beta umstellen, den Adapter installieren und
zurückstellen, wobei das Zurückstellen meistens vergessen wurde. Das ist nicht
mehr nötig.

* Den **Expertenmodus** einschalten (das Zeichen unten links in der Menüleiste).
* Im Reiter **Adapter** auf **Installieren aus eigener Quelle** gehen. Das
  Symbol mit dem Octocat.
* Im Reiter **Von npm** den gewünschten Adapter auswählen.

<img src="media/repository_npm.png" alt="Der Dialog Installieren aus eigener Quelle, Reiter Von npm" width="820" />

So lässt sich die neueste Version eines einzelnen Adapters installieren, ohne
dass das Repository gewechselt werden muss. Alle übrigen Adapter kommen weiterhin
aus stable.

!> **Abhängigkeiten werden bei diesem Weg nicht geprüft.** Und einen Adapter
direkt von GitHub installiert man nur, wenn der Entwickler ausdrücklich darum
bittet, etwa für einen Test oder eine Fehlersuche. Solche Versionen befinden
sich mitten in der Entwicklung und funktionieren zwischenzeitlich womöglich gar
nicht.

## Wie ein Adapter ins Repository kommt

Lange bevor ein Adapter im Admin auftaucht, stellt der Entwickler einen Antrag auf
Aufnahme. Erfahrene Entwickler sehen sich den Quellcode an und melden zurück, was
noch zu tun ist.

Ein neuer Adapter steht zuerst im **Beta**-Repository und wird dort von Testern
ausprobiert. Sind die gemeldeten Fehler behoben, wandert die Version ins
**Stable**-Repository. Nach einer größeren Funktionsänderung geht ein Adapter in
der Regel denselben Weg noch einmal.
