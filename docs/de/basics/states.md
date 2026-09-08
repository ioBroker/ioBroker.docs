---
title:       "Zustände"
lastChanged: "07.09.2026"
---

# Zustände und Datenpunkte

Ein **Datenpunkt** ist die Stelle, an der ein Wert steht: die Temperatur eines
Raums, der Schaltzustand einer Lampe, der Name des laufenden Titels.

Er besteht aus zwei Teilen:

* dem **Objekt** vom Typ `state` - der Beschreibung, die sich selten ändert
  (siehe [Objekte](https://www.iobroker.net/#de/documentation/basics/objects.md)),
* dem **Zustand** - dem Wert selbst, der sich ständig ändert.

Umgangssprachlich meint „Datenpunkt" meistens beides zusammen.

?> Nur Objekte vom Typ `state` haben einen Zustand. Und die Richtung ist
   eindeutig: Wird das Objekt gelöscht, verschwindet der Zustand mit ihm -
   umgekehrt bleibt das Objekt stehen, wenn nur der Wert entfernt wird.

## Der Zustand

Ein Zustand ist nicht nur eine Zahl. Er bringt mit, woher er kommt und wann er
entstanden ist:

| Feld | Bedeutung |
|---|---|
| `val` | der Wert |
| `ack` | ob es ein **Befehl** oder eine **Rückmeldung** ist - siehe unten |
| `ts` | wann der Wert zuletzt geschrieben wurde |
| `lc` | wann er sich zuletzt tatsächlich geändert hat |
| `from` | welche Adapterinstanz ihn geschrieben hat |
| `q` | die Qualität - ungleich 0 heißt: mit diesem Wert stimmt etwas nicht |
| `user` | wer ihn geschrieben hat, sofern über eine Anmeldung |
| `expire` | nach wie vielen Sekunden der Wert auf `null` fällt |

<img src="media/zustand_details.png" alt="Die Zustandsdaten eines Datenpunkts im Objekt-Editor" width="660" />

Im Objekt-Editor steht das alles im Reiter *Zustand*. „Bestätigt" ist dort das
ack-Flag - im Bild rot, weil der Wert ein **Befehl** ist und noch keine
Rückmeldung.

Der Unterschied zwischen `ts` und `lc` ist nützlicher, als er aussieht: Ein
Fühler, der alle 30 Sekunden denselben Wert meldet, aktualisiert `ts` jedes Mal,
`lc` aber nur bei einer echten Änderung. Wer wissen will, seit wann eine Tür
offen ist, schaut auf `lc`.

## Das ack-Flag

Das ist der Begriff, an dem die meisten hängen bleiben - und der wichtigste auf
dieser Seite.

* **`ack: false` ist ein Befehl.** „Lampe, geh an." So schreibt eine
  Automatisierung, ein Schalter in der Visualisierung, ein Skript.
* **`ack: true` ist eine Rückmeldung.** „Lampe ist an." So schreibt der Adapter,
  nachdem das Gerät bestätigt hat.

Der Ablauf ist also: Ein Skript setzt den Wert mit `ack: false`, der Adapter
sieht das, schickt den Befehl an das Gerät, und wenn das Gerät antwortet,
schreibt er denselben Datenpunkt noch einmal - diesmal mit `ack: true`.

!> Wer beim Auslösen einer Automatisierung nicht zwischen beidem unterscheidet,
   baut sich eine Rückkopplung: Das Skript schaltet, das Gerät bestätigt, die
   Bestätigung löst das Skript erneut aus. Faustregel: **auf Rückmeldungen
   hören, Befehle senden.** Näheres unter
   [Logik und Automatisierung](https://www.iobroker.net/#de/documentation/logic/README.md).

?> Im Admin lässt sich das sehen: In der Objektliste steht der Wert eines
   unbestätigten Zustands hervorgehoben. Ein Datenpunkt, der dauerhaft
   unbestätigt bleibt, ist ein Hinweis darauf, dass ein Befehl beim Gerät nicht
   angekommen ist.

## Die Beschreibung dazu

Das Objekt zum Datenpunkt sagt, wie mit dem Wert umzugehen ist. Die Felder, die
im Alltag zählen, stehen in `common`:

| Feld | Wofür |
|---|---|
| `type` | `number`, `string`, `boolean`, `array`, `object`, `json`, `mixed`, `file` |
| `name` | der angezeigte Name, ein- oder mehrsprachig |
| `unit` | die Einheit, etwa `°C` oder `%` |
| `min`, `max`, `step` | der zulässige Bereich und die Schrittweite, z. B. für einen Regler |
| `read`, `write` | ob gelesen und ob geschrieben werden darf - beide Pflicht |
| `role` | wofür der Datenpunkt steht; die Oberflächen wählen danach ihre Bedienelemente aus, siehe [Rollen](https://www.iobroker.net/#de/documentation/basics/roles.md) |
| `states` | eine Liste möglicher Werte mit Klartext, etwa `{0: "AUS", 1: "EIN"}` |
| `def` | der Vorgabewert |
| `custom` | Einstellungen anderer Adapter zu diesem Datenpunkt - hier trägt sich zum Beispiel die Aufzeichnung ein |

`read` und `write` sind keine Rechte, sondern eine Aussage über das Gerät: Ein
Temperaturfühler ist `read: true, write: false`. Wer trotzdem hineinschreibt,
bekommt keinen Fehler - der Wert steht dann eben da und bedeutet nichts.

?> `common.custom` ist die Stelle, an der die Aufzeichnung eines Werts
   eingeschaltet wird. Im Admin geschieht das über das Zahnrad am Datenpunkt;
   dahinter steht ein Eintrag wie `{"influxdb.0": {"enabled": true}}`.

## Werte von Hand setzen

Im Admin unter *Objekte* lässt sich der Wert eines beschreibbaren Datenpunkts
über den Stift ändern. Beim Schreiben gibt es dort die Wahl zwischen Befehl und
Rückmeldung - dieselbe Unterscheidung wie oben. Zum Ausprobieren ist der Befehl
das Richtige; eine Rückmeldung von Hand zu setzen täuscht dem System einen
Gerätezustand vor, den es nicht gibt.

## Weiterlesen

* [Objekte](https://www.iobroker.net/#de/documentation/basics/objects.md) - Aufbau, IDs und Namensräume
* [Rollen](https://www.iobroker.net/#de/documentation/basics/roles.md) - die vollständige Liste von `common.role`
* [Aliase](https://www.iobroker.net/#de/documentation/basics/alias.md) - eigene, stabile Namen für fremde Datenpunkte
* [Objektstruktur](https://www.iobroker.net/#de/documentation/dev/objectsschema.md) - alle Felder, für Entwickler
