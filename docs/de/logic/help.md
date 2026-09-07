---
title:       "Fehlersuche"
lastChanged: "07.09.2026"
---

# Fehlersuche bei Skripten

Die meisten Fehler in der Logik sind keine Abstürze, sondern etwas, das
schweigend nicht passiert. Diese Seite geht die häufigsten Fälle in der
Reihenfolge durch, in der sie sich prüfen lassen.

## Das Skript tut nichts

**Läuft es überhaupt?** Ein Skript wird erst ausgeführt, wenn es in der Liste
links über den Play-Knopf aktiviert wurde. Ein aktives Skript ist in der Liste
hervorgehoben. Denselben Zustand zeigt
`javascript.<Instanz>.scriptEnabled.<Skriptname>`.

**Läuft die Instanz?** Unter *Instanzen* muss die javascript-Instanz grün sein.
Ein Skript in einer gestoppten Instanz ist aktiviert und läuft trotzdem nicht.

**Stimmt die Zustands-ID?** Eine ID, die es nicht gibt, ist kein Fehler - der
Auslöser wartet einfach für immer. Die ID im Objektbaum suchen und von dort
kopieren, nicht abtippen.

**Ist der Auslöser zu eng?** `change: 'ne'` löst nur bei einem *anderen* Wert
aus. Ein Taster, der jedes Mal `true` sendet, ändert seinen Wert nie und löst
damit nie aus. Für solche Geräte ist die Aktualisierung (`any`) der richtige
Auslöser.

## Das Skript löst zu oft aus

Meist ist das ack-Flag die Ursache. Wenn ein Skript einen Zustand schreibt, das
Gerät die Ausführung bestätigt und das Skript auch auf diese Bestätigung
reagiert, läuft es zweimal - und wenn es dabei erneut schreibt, endlos.

?> Faustregel: Der Auslöser hört auf **Rückmeldungen** (`ack: true`), geschrieben
   wird als **Befehl** (`ack: false`). In Blockly und in den Regeln ist das eine
   Auswahl im Auslöserblock, in JavaScript der dritte Parameter von `setState`.

Die zweite häufige Ursache ist ein Auslöser auf *Aktualisierung* statt auf
*Änderung* bei einem Sensor, der im festen Takt meldet.

## Fehler im Protokoll finden

Unter dem Editor liegt ein Protokollfenster, das nur die Meldungen des gerade
geöffneten Skripts zeigt. Es füllt sich ab dem Zeitpunkt, an dem das Skript
gestartet wurde - wer eine Meldung sucht, die schon vorbei ist, schaut im
allgemeinen Log unter *Protokoll*.

Bei Blockly-Skripten nennt eine Fehlermeldung die Zeile des **erzeugten** Codes.
Über die Registerkarte über dem Arbeitsbereich lässt sich dieser Code anzeigen
und die Zeile nachschlagen.

Meldungen der Stufe `debug` erscheinen nur, wenn das Protokollniveau der Instanz
entsprechend eingestellt ist - unter *Instanzen* im Expertenmodus.

## Eine Testinstanz anlegen

Ein Skript mit einem schweren Fehler kann die ganze Instanz beenden. Läuft die
Heizungssteuerung in derselben Instanz, steht sie mit.

Deshalb: eine zweite javascript-Instanz anlegen und neue oder größere Skripte
zuerst dort laufen lassen. Die Instanz wird im Editor über dem Skript
ausgewählt. Sie sieht dieselben Zustände - die Trennung betrifft nur den
Prozess, nicht die Daten.

## Typische Stolpersteine

**Zwei Skripte teilen keine Variablen.** Auch nicht in derselben Instanz, auch
nicht über den Ordner *global*. Der Ordner *global* teilt Funktionen, nicht
Werte. Wer Werte weitergeben will, legt einen Zustand an.

**`getState` direkt nach `setState` liefert den alten Wert.** Das Schreiben ist
nicht sofort abgeschlossen. Entweder mit dem Wert weiterarbeiten, den man
ohnehin schon hat, oder die Variante mit `Async` verwenden.

**Ein Wert kann `null` sein.** Ein Adapter, der noch keine Daten hat, liefert
keinen Zahlenwert. Eine Rechnung damit ergibt `NaN` und schreibt still Unsinn in
den Zustand.

**Zeitpläne häufen sich an.** Wird ein Skript geändert und neu gestartet, räumt
der Adapter dessen eigene Zeitpläne auf. Zeitpläne, die ein Skript in einem
anderen angelegt hat, nicht.

**Der Wert ist eine Zeichenkette.** Manche Adapter liefern `"22.5"` statt `22.5`.
Ein Vergleich mit `>` arbeitet dann anders als erwartet.

## Wenn nichts hilft

* Das Skript auf den kleinsten Fall zusammenstreichen, der den Fehler noch
  zeigt - meist findet sich die Ursache dabei von selbst.
* Eine Ausgabe direkt in den Auslöser setzen, um zu sehen, ob er überhaupt
  feuert.
* Im [ioBroker-Forum](https://forum.iobroker.net) nachfragen. Dazu gehören: das
  Skript, die Fehlermeldung im Wortlaut, die Adapterversion und die
  js-controller-Version.

Für Probleme, die nicht am Skript liegen, sondern am System, siehe
[Adapterfehler](https://www.iobroker.net/#de/documentation/trouble/adapter.md)
und [ioBroker läuft nicht mehr](https://www.iobroker.net/#de/documentation/trouble/RunsNoMore.md).
