---
title:       "Blockly"
lastChanged: "10.09.2026"
---

# Blockly

Blockly ist ein grafischer Editor: Die Logik wird aus Bausteinen
zusammengesteckt, die nur dort einrasten, wo sie hingehören. Wer einmal einen
Auslöser mit einer Aktion verbunden hat, hat ein lauffähiges Programm
geschrieben, ohne eine Zeile Code getippt zu haben.

Blockly gehört zum
[javascript-Adapter](/adapters/javascript).
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
| Zugangsdaten | Ein Feld aus der zentralen Zugangsdatenverwaltung, siehe unten |
| Logik, Schleifen, Mathematik, Text, Listen, Farbe | Die üblichen Programmierbausteine |
| Variablen und Funktionen | Zwischenwerte und eigene, mehrfach verwendbare Blöcke |

Die vollständige Beschreibung jedes einzelnen Bausteins steht in der
[Blockly-Referenz des javascript-Adapters](/adapters/javascript).

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

## Kennwörter gehören nicht ins Skript

Ein Kennwort, das als Text in einem Baustein steht, steht auch im Export, im
Backup und in jeder Kopie des Skripts. Seit Fassung 10.1.1 des
javascript-Adapters gibt es dafür den Baustein **Zugangsdaten**: er holt ein
einzelnes Feld aus der zentralen Zugangsdatenverwaltung, die im Admin unter
*Basiseinstellungen* → *Zugangsdaten* gepflegt wird. Im Skript steht dann nur
noch, welche Zugangsdaten gemeint sind; der Wert wird beim Ausführen geholt und
zieht sofort mit, wenn er im Admin geändert wird.

In JavaScript entspricht dem das Objekt `SECRETS`, etwa
`SECRETS.Kamerakennwort.key`. Die Werte sind entschlüsselt, aber nur lesbar.

## Blockly in Fassung 13

Mit Fassung 10.1.0 des javascript-Adapters (August 2026) steckt unter dem
Editor Blockly 13 statt Blockly 11. Der erzeugte Code bleibt derselbe, und
vorhandene Skripte laufen unverändert weiter; der Editor sieht an einigen
Stellen anders aus. Zwei Dinge sind dabei eine Ansage wert:

* In den ersten Fassungen danach ließen sich Skripte mit benannten Timeouts,
  Intervallen oder Zeitplänen nicht mehr speichern, und der Kommentar-Baustein
  war unbrauchbar. Beides ist behoben; wer Blockly benutzt, sollte den Adapter
  mindestens auf 10.1.4 heben.
* Der Arbeitsbereich folgt seit 10.1.4 den Farben des gewählten Admin-Themas.
  Vorher war er in jedem dunklen Thema grau.

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
[JavaScript](/docs/logic/javascript.md)
fällig. Ein Skript muss nicht komplett umziehen: Blockly-Skripte und
JavaScript-Skripte laufen nebeneinander und tauschen sich über Zustände aus.

## Hilfe beim Bauen: der KI-Assistent

Der Skripteditor bringt seit Fassung 10 des javascript-Adapters ein Chatfenster
mit, das beim Bauen hilft. Für Blockly heißt das: eine Aufgabe in Worten
beschreiben, und der Assistent antwortet mit Bausteinen. Sie werden zuerst als
Vorschau gezeigt und erst auf Knopfdruck in den Arbeitsbereich übernommen;
Bausteine, die schon dastehen und zum Vorschlag passen, werden ersetzt, alles
Übrige wird angehängt. Ein bestehendes Skript wird also nicht überschrieben.

Was der Assistent im JavaScript-Editor zusätzlich kann, steht unter
[JavaScript](/docs/logic/javascript.md#der-ki-assistent-im-editor).
Dort stehen auch die Bedingungen im Einzelnen; die wichtigste vorweg:

!> **Das Sprachmodell kommt nicht von ioBroker.** Der Assistent braucht einen
   eigenen Zugang, entweder bei einem der unterstützten Anbieter oder zu einem
   Modell im eigenen Netz. Ohne eingetragenen Schlüssel bleibt die Funktion aus.

Und unabhängig davon, wer den Vorschlag geschrieben hat: erzeugte Bausteine sind
ein Vorschlag, kein Ergebnis. Sie gehören angesehen und ausprobiert, bevor sie
auf die Heizung losgelassen werden.
