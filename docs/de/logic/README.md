---
title:       "Logik & Automatisierung"
lastChanged: "07.09.2026"
---

# Logik und Automatisierung

ioBroker sammelt Zustände: eine Temperatur, ein Schaltzustand, eine Uhrzeit.
Erst die Logik macht daraus ein Smart Home. Sie beobachtet Zustände, entscheidet
und setzt andere Zustände - "wenn die Balkontür länger als fünf Minuten offen
ist und die Heizung läuft, dann Heizung aus und Nachricht aufs Telefon".

Es gibt mehrere Wege, diese Logik zu schreiben. Sie schließen sich nicht aus:
in einer gewachsenen Installation stehen grafische Regeln und JavaScript
nebeneinander, jedes dort, wo es am wenigsten Aufwand macht.

## Wo die Logik läuft

Die meisten Wege gehören zu **einem** Adapter, dem
[javascript-Adapter](/adapters/javascript).
Er bringt nach der Installation den Reiter *Skripte* in die Admin-Oberfläche und
führt dort Blockly, Regeln, JavaScript und TypeScript aus. Wer eines dieser vier
nutzen möchte, installiert also nur diesen einen Adapter.

Zwei weitere Wege sind eigene Adapter:
[node-red](/adapters/node-red)
bringt den Flow-Editor von Node-RED mit, und
[scenes](/adapters/scenes)
speichert Szenen, ohne dass dafür programmiert werden muss.

## Die Wege im Überblick

| Weg | Was es ist | Adapter |
|---|---|---|
| [Blockly](/docs/logic/blockly.md) | Grafische Bausteine, die ineinandergesteckt werden | javascript |
| Regeln | Ein Formular nach dem Muster *wenn - dann*, ohne Bausteine | javascript |
| [JavaScript](/docs/logic/javascript.md) | Die volle Programmiersprache mit der ioBroker-Skript-API | javascript |
| [TypeScript](/docs/logic/typescript.md) | JavaScript mit Typprüfung vor dem Start | javascript |
| [Node-RED](/docs/logic/nodered.md) | Ein eigener Editor, in dem Knoten mit Linien verbunden werden | node-red |
| Szenen | Eine Liste von Zuständen und ihren Sollwerten, kein Programm | scenes |

## Welcher Weg wofür

**Szenen** sind kein Programm, sondern eine gespeicherte Situation: "Fernsehen"
setzt fünf Lampen auf bestimmte Werte. Wer nur solche Situationen braucht,
braucht keine Logik, sondern den scenes-Adapter. Szenen lassen sich später aus
jedem der anderen Wege heraus aufrufen.

**Regeln** sind der kürzeste Einstieg, wenn eine Automatisierung wirklich dem
Muster *wenn dieser Zustand, dann jene Aktion* folgt. Es wird nichts
zusammengesteckt, sondern ausgewählt.

**Blockly** ist der richtige Weg, sobald mehrere Bedingungen, Verzögerungen
oder Schleifen ins Spiel kommen und trotzdem niemand Code schreiben möchte. Es
ist keine Spielzeugversion: die Bausteine decken den größten Teil der
Skript-API ab, und aus jedem Blockly-Skript lässt sich der erzeugte
JavaScript-Code anzeigen.

**JavaScript** lohnt sich, sobald ein Skript unübersichtlich wird - viele
gleichartige Fälle, eigene Funktionen, Datenstrukturen, npm-Module. Ein
Blockly-Skript mit dreißig Bausteinen ist meist zehn Zeilen JavaScript.

**TypeScript** ist JavaScript mit einer Prüfung vor dem Start. Es lohnt sich bei
längeren Skripten, die man selten anfasst und deshalb nicht mehr im Kopf hat.

**Node-RED** spielt seine Stärke dort aus, wo Daten von vielen Quellen
zusammenlaufen und weiterverarbeitet werden - Protokolle, HTTP-Aufrufe,
Warteschlangen. Für "wenn Bewegung, dann Licht" ist es der aufwendigere Weg,
denn es läuft als eigener Prozess neben ioBroker.

?> Ein Weg schließt den anderen nicht aus. Es ist üblich, die einfachen
   Automatisierungen als Regeln oder in Blockly zu halten und nur das zu
   JavaScript zu machen, was dort mühsam würde.

## Was für alle Wege gilt

Egal welcher Weg gewählt wird, drei Dinge sind immer gleich.

**Logik reagiert, sie fragt nicht.** Ein Skript, das jede Sekunde nachschaut, ob
sich etwas geändert hat, ist fast immer falsch. ioBroker meldet jede Änderung
von sich aus; die Logik hängt sich an diese Meldung. Das ist nicht nur
sparsamer, es ist auch genauer.

**Das ack-Flag trennt Befehl und Rückmeldung.** Jeder Zustand trägt neben dem
Wert ein Flag `ack`. `ack: false` heißt "das ist ein Befehl an das Gerät",
`ack: true` heißt "das Gerät meldet, dass es so ist". Wer beim Auslöser nicht
unterscheidet, baut sich Schleifen: das Skript schaltet, das Gerät bestätigt,
die Bestätigung löst das Skript erneut aus. Näheres unter
[Zustände](/docs/basics/states.md).

**Zustände sind das gemeinsame Gedächtnis.** Skripte teilen keine Variablen -
auch nicht zwei Skripte derselben Instanz. Wenn ein Skript einem anderen etwas
mitteilen soll, geschieht das über einen Zustand.

## Anfangen

1. Im Admin unter *Adapter* den javascript-Adapter installieren und eine
   Instanz anlegen.
2. In den Instanzeinstellungen die Geo-Koordinaten eintragen. Ohne sie sind
   Sonnenauf- und -untergang nicht berechenbar, und genau die braucht man
   schnell.
3. Der neue Reiter *Skripte* erscheint. Dort links über das Blatt-Symbol ein
   neues Skript anlegen und dabei den Typ wählen - Regeln, Blockly, JavaScript
   oder TypeScript.
4. Das Skript wird erst ausgeführt, wenn es über den Play-Knopf aktiviert wird.

?> Für die ersten Versuche empfiehlt sich eine zweite javascript-Instanz. Ein
   schwerer Fehler beendet dann nur diese Testinstanz und nicht die, in der die
   Heizungssteuerung läuft. Mehr dazu unter
   [Fehlersuche](/docs/logic/help.md).

## Weiter

* [Blockly](/docs/logic/blockly.md)
* [JavaScript](/docs/logic/javascript.md)
* [TypeScript](/docs/logic/typescript.md)
* [Node-RED](/docs/logic/nodered.md)
* [Fehlersuche](/docs/logic/help.md)
* [Bewährte Vorgehensweisen](/docs/logic/examples.md)
