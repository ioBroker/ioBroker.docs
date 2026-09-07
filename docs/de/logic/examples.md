---
title:       "Bewährte Vorgehensweisen"
lastChanged: "07.09.2026"
---

# Bewährte Vorgehensweisen

Die folgenden Punkte gelten für alle Wege, Logik zu bauen - für Regeln und
Blockly ebenso wie für JavaScript. Sie stammen aus den Fehlern, die im Forum am
häufigsten auftauchen.

## Reagieren statt fragen

Ein Skript, das im Sekundentakt nachschaut, ob sich etwas geändert hat, ist fast
immer der falsche Weg. ioBroker meldet jede Änderung von sich aus. Ein Auslöser
auf den Zustand ist sparsamer, genauer und kürzer als jede Schleife.

Ausnahmen gibt es: Geräte, die von sich aus nichts melden, müssen abgefragt
werden. Dann aber im Takt des Geräts und nicht schneller.

## Befehl und Rückmeldung auseinanderhalten

Das `ack`-Flag ist der wichtigste Begriff der ganzen Seite.

* `ack: false` - ein **Befehl**: "Lampe, geh an." So schreibt Logik.
* `ack: true` - eine **Rückmeldung**: "Lampe ist an." So schreiben Adapter.

Wer auf beides reagiert, baut sich Rückkopplungen, die je nach Gerät als
Flackern, als Dauerlast oder gar nicht auffallen. Auslöser hören auf
Rückmeldungen, geschrieben wird als Befehl.

## Nur schreiben, wenn sich etwas ändert

`setStateChanged` schreibt nur, wenn der neue Wert vom alten abweicht. Bei
Werten, die im Takt berechnet werden, spart das den größten Teil aller
Schreibvorgänge - und damit Einträge in der Historie, ausgelöste Skripte anderer
Leute und Last auf der Datenbank.

## Zustände sind das gemeinsame Gedächtnis

Skripte teilen keine Variablen, auch nicht innerhalb einer Instanz. Wenn ein
Skript einem anderen etwas mitteilen soll, geschieht das über einen eigenen
Zustand. Solche Zustände gehören unter die eigene Instanz - über `createState`
in JavaScript oder den entsprechenden Baustein in Blockly - und bekommen einen
sprechenden Namen.

## Geräte nicht direkt ansprechen

Ein Skript, das `hm-rpc.0.LEQ1234567.1.STATE` schaltet, ist an genau dieses Gerät
gebunden. Wird der Aktor getauscht, müssen alle Skripte nachgezogen werden, in
denen die ID vorkommt.

Ein
[Alias](https://www.iobroker.net/#de/documentation/basics/alias.md)
löst das: `alias.0.Wohnzimmer.Deckenlicht` bleibt gleich, auch wenn dahinter ein
anderes Gerät steckt. Ein Gerätetausch ist dann eine Änderung an einer Stelle
statt an zwanzig.

## Keine Zugangsdaten im Skript

Passwörter, Zugangsschlüssel und Ähnliches gehören nicht in den Skripttext. Ein
Skript wird kopiert, ins Forum gestellt und gesichert - die Zugangsdaten reisen
mit.

Der javascript-Adapter hat dafür eine zentrale Ablage: Zugangsdaten werden in
den Instanzeinstellungen unter *Zugangsdaten* hinterlegt und stehen im Skript
über `SECRETS` zur Verfügung, etwa `SECRETS.Kamera.key`. Die Werte sind dort
entschlüsselt und nur lesbar, und der Editor schlägt beim Tippen vor, welche es
gibt. In Blockly gibt es dafür einen eigenen Baustein.

## Klein anfangen, groß trennen

* Ein Skript, eine Aufgabe. "Beschattung" und "Heizung" gehören nicht in
  dieselbe Datei, auch wenn beide auf dieselbe Temperatur schauen.
* Wiederkehrende Funktionen in ein Skript im Ordner **global** legen. Sein
  Inhalt steht allen anderen Skripten zur Verfügung.
* Ordner nach Räumen oder Gewerken anlegen. Der Speicherort hat keine Wirkung
  auf die Ausführung, aber viel auf das Wiederfinden nach einem halben Jahr.

## Erst in einer Testinstanz

Ein schwerer Fehler beendet die Instanz, in der das Skript läuft - und damit
alle anderen Skripte darin. Deshalb: eine zweite javascript-Instanz anlegen und
neue Skripte zuerst dort betreiben. Die Instanz wird im Editor über dem Skript
gewählt.

## Sichern

Skripte liegen in der ioBroker-Datenbank und sind damit Teil des normalen
Backups. Wer sie zusätzlich als Dateien haben möchte, kann in den
Instanzeinstellungen ein Spiegelverzeichnis angeben; die Skripte werden dann
laufend als `.js`-Dateien dorthin geschrieben und lassen sich versionieren.

## Verständlich schreiben

* Namen, die den Zweck nennen: `Beschattung Süd` statt `Skript 3`.
* Eine Zeile Kommentar an den Anfang: Was tut es, worauf reagiert es.
* In Blockly den Kommentarbaustein nutzen, statt sich auf die Anordnung der
  Bausteine zu verlassen.

## Beispiele

Fertige Lösungen und Beispiele sammeln sich im
[ioBroker-Forum](https://forum.iobroker.net) und in der
[Lösungsbibliothek](https://www.iobroker.net/#de/documentation/lib/README.md).
Die Blockly-Referenz des javascript-Adapters enthält außerdem drei
durchgerechnete Beispiele vom ersten Baustein bis zum fertigen Skript:
[Blockly-Referenz](https://www.iobroker.net/#de/adapters/adapterref/iobroker.javascript/blockly.md).
