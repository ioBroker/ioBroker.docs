---
title:       "Blockly"
lastChanged: "07.09.2026"
---

# Blockly

Blockly ist ein grafischer Editor: Die Logik wird aus Bausteinen
zusammengesteckt, die nur dort einrasten, wo sie hingehören. Wer einmal einen
Auslöser mit einer Aktion verbunden hat, hat ein lauffähiges Programm
geschrieben, ohne eine Zeile Code getippt zu haben.

Blockly gehört zum
[javascript-Adapter](https://www.iobroker.net/#de/adapters/adapterref/iobroker.javascript/README.md).
Ein neues Skript vom Typ *Blockly* wird im Admin unter *Skripte* angelegt.

## Wie ein Blockly-Skript aufgebaut ist

Fast jedes Skript beginnt mit einem **Auslöser** und hängt darunter, was
geschehen soll. Der häufigste Auslöser ist die Änderung eines Zustands, der
zweithäufigste eine Uhrzeit.

Ein Skript kann mehrere Auslöser haben. Bausteine, die außerhalb eines
Auslösers liegen, werden genau einmal ausgeführt: beim Start des Skripts. Das
ist die übliche Stelle für Startwerte.

## Die Baustein-Gruppen

Die Palette links ist nach Aufgaben sortiert. Die wichtigsten Gruppen:

| Gruppe | Wofür |
|---|---|
| Trigger | Auslöser: Zustandsänderung, Zeitplan, Astro-Zeiten wie Sonnenuntergang |
| Systemblöcke | Zustände lesen und schreiben, Objekte anlegen, Zustände abfragen |
| Aktionsblöcke | Protokollausgabe, HTTP-Aufrufe, Betriebssystembefehle, E-Mail |
| SendTo | Nachrichten an andere Adapter, etwa Telegram, Pushover oder Signal |
| Timeouts | Verzögerungen, wiederkehrende Ausführung, Abbrüche |
| Datum und Zeit | Zeitpunkte vergleichen, formatieren, Zeitdifferenzen bilden |
| Konvertierung | Text in Zahl, Zahl in Text, Rundung, Zeitformate |
| Logik, Schleifen, Mathematik, Text, Listen, Farbe | Die üblichen Programmierbausteine |
| Variablen und Funktionen | Zwischenwerte und eigene, mehrfach verwendbare Blöcke |

Die vollständige Beschreibung jedes einzelnen Bausteins steht in der
[Blockly-Referenz des javascript-Adapters](https://www.iobroker.net/#de/adapters/adapterref/iobroker.javascript/blockly.md).

## Der wichtigste Baustein: der Auslöser

Der Trigger-Baustein für Zustände fragt drei Dinge ab: **welcher Zustand**,
**worauf** reagiert werden soll und **wann**.

Bei "worauf" ist die Unterscheidung zwischen *Änderung* und *Aktualisierung*
entscheidend. Eine Aktualisierung tritt jedes Mal ein, wenn ein Adapter den Wert
schreibt - auch wenn er derselbe geblieben ist. Eine Änderung nur dann, wenn
sich der Wert wirklich unterscheidet. Ein Temperaturfühler, der alle 30 Sekunden
denselben Wert meldet, löst bei *Aktualisierung* 2880-mal am Tag aus und bei
*Änderung* nur, wenn sich die Temperatur bewegt.

!> Der Trigger unterscheidet außerdem zwischen **ack = false** (ein Befehl an
   ein Gerät) und **ack = true** (die Rückmeldung des Geräts). Wer auf beides
   reagiert, baut sich Rückkopplungen. Als Faustregel: auf Rückmeldungen
   (`ack = true`) reagieren, Befehle (`ack = false`) selbst senden.

## Vom Baustein zum Code

Über die Registerkarte über dem Arbeitsbereich lässt sich zu jedem
Blockly-Skript der erzeugte JavaScript-Code anzeigen. Das ist mehr als eine
Spielerei:

* Bei einer Fehlermeldung im Protokoll steht dort die Zeilennummer des
  erzeugten Codes, nicht der Baustein.
* Wer ein Blockly-Skript später in JavaScript weiterführen will, hat damit die
  Vorlage. Der umgekehrte Weg ist nicht möglich - aus JavaScript entstehen keine
  Bausteine zurück.

## Wenn Blockly nicht mehr trägt

Blockly wird unhandlich, sobald

* dieselbe Kette für zehn Lampen wiederholt werden müsste,
* Daten in Listen oder Tabellen gehalten werden,
* der Arbeitsbereich nur noch mit starkem Zoom zu überblicken ist.

Dann ist der Wechsel zu
[JavaScript](https://www.iobroker.net/#de/documentation/logic/javascript.md)
fällig. Ein Skript muss nicht komplett umziehen: Blockly-Skripte und
JavaScript-Skripte laufen nebeneinander und tauschen sich über Zustände aus.

## Hilfe beim Bauen

Der javascript-Adapter enthält einen KI-Codegenerator, der auch Blockly-Skripte
erzeugen kann. Er benötigt einen Zugang zu einem Sprachmodell, der in den
Instanzeinstellungen eingetragen wird; neben OpenAI lassen sich auch andere
Anbieter und lokal betriebene Modelle verwenden. Die Einrichtung ist in der
[Adapterdokumentation](https://www.iobroker.net/#de/adapters/adapterref/iobroker.javascript/README.md)
beschrieben.

?> Erzeugter Code ist ein Vorschlag, kein Ergebnis. Er gehört gelesen und in
   einer Testinstanz ausprobiert, bevor er auf die Heizung losgelassen wird.
