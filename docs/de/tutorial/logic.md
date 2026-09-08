---
title:       "Die erste Automatisierung"
lastChanged: "08.09.2026"
---

# Die erste Automatisierung

Bis hierher sammelt ioBroker Werte. Jetzt soll etwas von selbst passieren. Wir
bauen die einfachste sinnvolle Regel: **wenn ein Zustand sich ändert, tue
etwas**. Alles Weitere ist eine Variation davon.

## Was Sie brauchen

Den **javascript**-Adapter. Er bringt Blockly, Regeln, JavaScript und TypeScript
mit, also alle vier Wege auf einmal.

1. Im Reiter [Adapter](/docs/admin/adapter.md)
   nach `javascript` suchen und eine Instanz anlegen.
2. Danach erscheint links der neue Reiter **Skripte**.

Außerdem brauchen Sie zwei Datenpunkte: einen, der sich ändert, und einen, den
Sie setzen dürfen. Wer noch keine Geräte angebunden hat, legt sich im Reiter
[Objekte](/docs/admin/objects.md) unter
`0_userdata.0` zwei eigene Datenpunkte an, einen vom Typ *Zahl* und einen vom
Typ *Logikwert*. Zum Üben ist das der bequemste Weg, weil Sie beide von Hand
verstellen können.

## Blockly oder Text

| | Blockly | JavaScript |
| --- | --- | --- |
| Bedienung | Bausteine zusammenstecken | Tippen |
| Gut für | Den Einstieg und übersichtliche Regeln | Alles, was länger wird |
| Fehler | Kaum Tippfehler möglich | Schreibfehler sind möglich |

Für die erste Regel nehmen wir Blockly. Der Umstieg später ist einfach: Blockly
erzeugt im Hintergrund JavaScript, und das lässt sich ansehen.

## Die Regel bauen

1. Im Reiter **Skripte** ein neues Blockly-Skript anlegen und ihm einen Namen
   geben, aus dem später hervorgeht, was es tut.
2. Aus der Gruppe **Trigger** den Baustein für die Zustandsänderung nehmen und
   in der Arbeitsfläche ablegen. Er fragt drei Dinge: welcher Zustand, worauf
   reagiert werden soll und bei welcher Art von Änderung.
3. Den zu beobachtenden Datenpunkt auswählen.
4. Aus der Gruppe **Aktionen** den Baustein zum Setzen eines Zustands
   **unterhalb** des Auslösers einhängen und dort den zweiten Datenpunkt und den
   gewünschten Wert eintragen.
5. Speichern und das Skript starten.

Zum Ausprobieren den ersten Datenpunkt im Reiter Objekte von Hand ändern und
sehen, ob der zweite folgt.

?> Bausteine, die **außerhalb** eines Auslösers liegen, laufen genau einmal,
nämlich beim Start des Skripts. Das ist eine der häufigsten Verwirrungen am
Anfang.

## Die drei klassischen Anfängerfehler

**Befehl und Rückmeldung verwechseln.** Jeder Zustand trägt neben dem Wert ein
Kennzeichen: `ack = false` heißt „jemand möchte das", `ack = true` heißt „so ist
es". Ein Auslöser, der auf beides reagiert, feuert doppelt.

**Die Rückkopplung.** Skript A ändert Datenpunkt 1, das löst Skript B aus, das
Datenpunkt 2 ändert, was wieder Skript A auslöst. Im Protokoll sieht man das
daran, dass dieselben Zeilen in schneller Folge erscheinen.

**Zu viel in einem Skript.** Lieber mehrere kleine Skripte mit sprechenden Namen
als eines, das alles kann. In einem halben Jahr wissen Sie sonst nicht mehr,
warum das Licht angeht.

## Wenn es nicht tut

Jedes Skript hat eine eigene Protokollausgabe, und im Reiter
[Protokolle](/docs/admin/log.md) steht,
womit die javascript-Instanz Schwierigkeiten hatte. Ein Baustein zum Schreiben
ins Protokoll ist beim Suchen das nützlichste Werkzeug: er zeigt, ob der
Auslöser überhaupt ausgelöst hat.

## Wie es weitergeht

Die Bausteingruppen im Einzelnen und der Übergang zu JavaScript stehen unter
[Blockly](/docs/logic/blockly.md). Ein
Überblick über alle Wege, Logik zu schreiben, steht unter
[Logik und Automatisierung](/docs/logic/README.md).

Als nächstes im Tutorial:
[Die erste Visualisierung](/docs/tutorial/viz.md).
