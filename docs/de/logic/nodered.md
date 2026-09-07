---
title:       "Node-RED"
lastChanged: "07.09.2026"
---

# Node-RED

Node-RED ist ein eigenständiges Werkzeug zur Ablaufsteuerung, das nicht zu
ioBroker gehört, sich aber gut mit ihm verbindet. Programmiert wird darin mit
*Flows*: Knoten werden auf einer Fläche abgelegt und mit Linien verbunden, an
denen Nachrichten entlanglaufen.

Der Zugang führt über den
[node-red-Adapter](https://www.iobroker.net/#de/adapters/adapterref/iobroker.node-red/README.md).
Er bringt Node-RED mit, startet es und stellt die Verbindung zu den ioBroker-
Zuständen her. Seit Adapterversion 7 ist Node-RED 5 enthalten; es wird zusammen
mit dem Adapter aktualisiert und nicht getrennt davon.

!> Node-RED läuft als **eigener Prozess** neben ioBroker, mit eigenem
   Speicherverbrauch und eigenem Editor. Für einfache Automatisierungen ist das
   ein spürbarer Aufwand - dafür ist
   [Blockly](https://www.iobroker.net/#de/documentation/logic/blockly.md)
   der leichtere Weg.

## Einrichten

1. Den Adapter *node-red* installieren und eine Instanz anlegen.
2. In den Instanzeinstellungen gegebenenfalls Port und Zugangsschutz anpassen.
   Voreingestellt ist Port **1880** auf allen Netzwerkschnittstellen, ohne
   Anmeldung.
3. Der Editor wird über den Instanzknopf im Admin geöffnet oder direkt unter
   `http://<adresse-des-servers>:1880`.

!> Ohne Anmeldung und auf allen Schnittstellen erreichbar heißt: Jeder im
   Netzwerk kann die Flows ändern und damit alles schalten, was ioBroker
   schaltet. Wer Node-RED nutzt, sollte in den Instanzeinstellungen einen
   Zugangsschutz einrichten.

## Die ioBroker-Knoten

In der Palette des Editors erscheint eine eigene Gruppe *ioBroker* mit sechs
Knoten:

| Knoten | Wofür |
|---|---|
| ioBroker in | Auslöser: gibt eine Nachricht aus, sobald sich ein Zustand ändert |
| ioBroker out | Schreibt den Nachrichteninhalt in einen Zustand |
| ioBroker get | Holt den aktuellen Wert eines Zustands, ohne auf eine Änderung zu warten |
| ioBroker get object | Holt das Objekt zu einer ID, also die Beschreibung statt des Werts |
| ioBroker list | Liefert eine Liste von Zuständen zu einem Muster |
| ioBroker sendTo | Schickt einen Befehl an eine Adapterinstanz, etwa an Telegram |

Ein einfacher Flow besteht damit aus zwei Knoten: *ioBroker in* für den Auslöser,
*ioBroker out* für die Reaktion, dazwischen das, was zu entscheiden ist.

## Was in den Instanzeinstellungen wichtig ist

* **Speichergrenze.** Voreingestellt sind 128 MB. Flows, die große Datenmengen
  halten, brauchen mehr - dann bricht Node-RED sonst ohne erkennbaren Grund ab.
* **Zusätzliche Knoten.** Die Verwaltung der Palette ist ab Werk abgeschaltet.
  Wer weitere Knotenpakete installieren möchte, schaltet sie ein oder trägt die
  Pakete in den Einstellungen ein.
* **Fremde Objekte anlegen.** Ebenfalls ab Werk abgeschaltet. Solange sie aus
  bleibt, kann ein Flow nur Zustände unterhalb der eigenen Instanz erzeugen.
* **Ablage des Kontexts.** Node-RED kann Werte über einen Neustart hinweg
  behalten. Ab Adapterversion 7 heißt der dateibasierte Speicher `file` statt
  `default`; wer in einem Knoten ausdrücklich einen Speicher gewählt hatte, muss
  ihn dort einmal neu auswählen.

## Wofür sich Node-RED lohnt

Node-RED ist stark, wo Daten *fließen*: mehrere Quellen zusammenführen,
HTTP-Schnittstellen abfragen und beantworten, MQTT, Umformungen in mehreren
Schritten, Warteschlangen. Für die klassische Haussteuerung - Auslöser,
Bedingung, Aktion - ist es dem javascript-Adapter nicht überlegen, kostet aber
einen zweiten Prozess und einen zweiten Editor.

?> Beides gleichzeitig ist möglich und verbreitet. Die Zustände sind die
   gemeinsame Sprache: Was ein Flow schreibt, sieht ein Skript sofort, und
   umgekehrt.
