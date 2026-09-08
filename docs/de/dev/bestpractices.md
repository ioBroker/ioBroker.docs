---
title:       "Best Practices"
lastChanged: "08.09.2026"
---

# Best Practices für Adapter

Ein Adapter läuft auf fremden Systemen, jahrelang, ohne dass jemand zusieht.
Vieles von dem, was hier steht, merkt man deshalb erst dann, wenn es fehlt. Die
Punkte sind nach dem Ärger sortiert, den sie ersparen.

## Nicht bei null anfangen

Der [Adapter Creator](https://adapter-creator.iobroker.in/) erzeugt ein Gerüst
mit der üblichen Verzeichnisstruktur, Tests und Übersetzungsdateien. Das ist
kein Anfängerwerkzeug, sondern der schnellste Weg zu einer Struktur, die andere
wiedererkennen. Weitere Werkzeuge stehen unter
[Eigener Adapter](/docs/dev/adapterdev.md).

Für den Zugriff auf ioBroker immer `@iobroker/adapter-core` verwenden, nie
direkt die Datenbanken.

## Aufräumen beim Beenden

Jeder Zeitgeber, jedes Abonnement und jede offene Verbindung wird beim Beenden
der Instanz wieder abgeräumt. Wird das versäumt, lässt sich die Instanz nicht
sauber neu starten, sie verbraucht bei jedem Neustart mehr Speicher, und
irgendwann steht das System des Anwenders.

Das ist der häufigste Fehler in Adaptern und der, den Anwender am schwersten
selbst finden können.

## Sparsam mit Zugriffen umgehen

* Ein Gerät nur so oft abfragen, wie es sich tatsächlich ändert. Ein Zählerstand
  braucht keine Sekundenauflösung.
* Werte nur schreiben, wenn sie sich geändert haben. Jeder Schreibvorgang kostet
  Last und, bei aktivierter Aufzeichnung, Speicherplatz.
* Objekte einmal anlegen, nicht bei jedem Durchlauf neu schreiben. Objekt und
  Zustand sind zwei Dinge, siehe
  [JS-Controller](/docs/dev/controller.md).

Der Anwender merkt einen verschwenderischen Adapter daran, dass sein Raspberry
Pi warm wird und die SD-Karte stirbt.

## Rollen und Einheiten richtig setzen

Die [Rolle](/docs/dev/stateroles.md) eines
Datenpunkts entscheidet darüber, ob Visualisierungen, Sprachassistenten und die
automatische Geräteerkennung damit etwas anfangen können. `state` ist erlaubt,
aber es ist die Antwort für den Fall, dass man es nicht besser weiß.

Ebenso gehören `type`, `unit`, `min`, `max`, `read` und `write` gepflegt. Ein
Datenpunkt ohne Einheit ist eine Zahl ohne Bedeutung.

## Geheimnisse schützen

Passwörter und Zugangsschlüssel gehören verschlüsselt in die Konfiguration und
über `protectedNative` vor anderen Adaptern geschützt. Wie das geht, steht unter
[Sicherheit](/docs/dev/adaptersecurity.md).

!> Zugangsdaten niemals ins Protokoll schreiben, auch nicht auf der Stufe
`debug`. Protokollauszüge landen in Forenbeiträgen.

## Vernünftig protokollieren

`info` ist für den Normalbetrieb: Start, Stopp, Verbindung aufgebaut oder
verloren. Alles Weitere gehört nach `debug`. Ein Adapter, der im Normalbetrieb
jede Sekunde eine Zeile schreibt, macht das Protokoll für alle anderen
unbrauchbar. Einzelheiten unter
[Logging](/docs/dev/logging.md).

Fehlermeldungen sollen sagen, was zu tun ist. `Error: undefined` hilft
niemandem.

## Dateien an der richtigen Stelle ablegen

Eigene Dateien gehören in den
[Dateispeicher](/docs/dev/filestorage.md)
von ioBroker, nicht in ein selbst angelegtes Verzeichnis unter
`/opt/iobroker`. Nur so sind sie in einer
[Datensicherung](/docs/config/backup.md)
enthalten und überstehen ein Update.

## Übersetzen

Die Texte der Konfigurationsoberfläche und die Namen der Objekte werden
übersetzt. Der [Translator](https://translator.iobroker.in/) nimmt einen
englischen Text und liefert die übrigen Sprachen. Einzelheiten unter
[Übersetzungen](/docs/dev/adaptertranslate.md).

## Testen lassen

Automatische Tests fangen genau die Fehler ab, die man beim eigenen Ausprobieren
nicht sieht, weil das eigene Gerät antwortet und die eigene Konfiguration
stimmt. Siehe
[Adapter testen](/docs/dev/adaptertesting.md).

## Bevor der Adapter veröffentlicht wird

Die Bedingungen für die Aufnahme in das offizielle Repository, samt Kategorie,
Verbindungstyp und den Angaben in der `io-package.json`, stehen unter
[Adapter veröffentlichen](/docs/dev/adapterpublish.md).
Eine Liste gewünschter Adapter führt das Projekt unter
[AdapterRequests](https://github.com/ioBroker/AdapterRequests/issues).
