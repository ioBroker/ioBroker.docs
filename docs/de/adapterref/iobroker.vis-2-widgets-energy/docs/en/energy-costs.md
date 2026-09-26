---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-energy/README.md":{"title":{"en":"Vis 2 Energy widgets"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/README.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/README.md":{"title":{"en":"Energy widgets for vis-2"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/README.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/distribution.md":{"title":{"en":"Distribution"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/distribution.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md":{"title":{"en":"Consumption"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption-comparison.md":{"title":{"en":"Consumption comparison"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption-comparison.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md":{"title":{"en":"Interval selector"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/self-sufficiency.md":{"title":{"en":"Self-sufficiency"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/self-sufficiency.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/battery.md":{"title":{"en":"Battery storage"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/battery.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/energy-costs.md":{"title":{"en":"Energy costs"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/energy-costs.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/dynamic-price.md":{"title":{"en":"Dynamic electricity price"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/dynamic-price.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-2-widgets-energy/docs/en/energy-costs.md
title: Energiekosten
hash: k4saleVKONWoExYpqAZLor8ODHa97LSdn97nmAggwA8=
---
# Energiekosten

![Energiekosten](../../../../../en/adapterref/iobroker.vis-2-widgets-energy/img/energyCosts.png)

Die Energiekosten des dargestellten Zeitraums setzen sich wie folgt zusammen: Verbrauch × Preis, zuzüglich des Anteils der monatlichen Grundgebühr, abzüglich der Einspeisevergütung. Das Ergebnis ist eine große Zahl mit der Aufschlüsselung darunter.

## Woher die Energie kommt

Das Attribut **„Woher die Energie kommt“** entscheidet darüber, und es ist die einzige Einstellung, die richtig vorgenommen werden muss:

### Wert des Datenpunkts

Der Wert im Datenpunkt wird unverändert verwendet. Der Datenpunkt selbst muss die Menge des angezeigten Zeitraums enthalten – einen „heutigen Verbrauch“ aus dem `statistics` Adapter zum Beispiel.

Die Periodenauswahl _kennzeichnet_ lediglich das Ergebnis und legt fest, wie die monatliche Grundgebühr aufgeteilt wird. Der Energieverbrauch ändert sich dadurch nicht. Die Anzeige des Jahres mit einem Datenpunkt, der den heutigen Verbrauch enthält, führt zu einem falschen Ergebnis.

### Zusammenfassung aus der Geschichte

Das Widget liest den Zeitraum direkt aus dem Verlaufsspeicher, genau wie das [Verbrauchs](/#/docs/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md) -Widget, und addiert die Werte. Richten Sie _das Energie-OID_ auf den **Zählerstand** und lassen Sie _die Differenzberechnung aktiviert_ ; die Summe der Differenzen ergibt den Verbrauch des Zeitraums.

Dies ist der Modus, in dem die Periodenauswahl tatsächlich funktioniert: Durch Umschalten von Tag auf Monat ändert sich die Zahl.

## Anforderungen

- Für „Summe aus dem Verlauf“: eine Verlaufsinstanz, die die beiden Messwerte protokolliert.
- Für "Wert des Datenpunkts": nichts jenseits der Datenpunkte.
- Ein Zeitraum, siehe [Zeitraum](/#/docs/adapterref/iobroker.vis-2-widgets-energy/docs/en/README.md#the-period) .

## Konfiguration

### Gemeinsam

| Feld                                 | Bedeutung                                                                    |
| ------------------------------------ | ---------------------------------------------------------------------------- |
| Ohne Rahmen / Name                   | Karte und Titel                                                              |
| Woher die Energie kommt              | Siehe oben                                                                   |
| Währung                              | Wird nach jedem Betrag geschrieben, z. B. `€`                                 |
| Energieeinheit                       | Energieeinheit. Der Preis ist ein Preis _pro dieser Einheit_ .               |
| Dezimalzahlen / Energiedezimalzahlen | Dezimalzahlen der Mengen und der Energie                                     |
| Show-Aufschlüsselung                 | Die Tabelle unter der großen Zahl                                            |
| Zeig auch Energie                    | Fügt der Tabelle die kWh-Werte hinzu, aus denen die Mengen berechnet wurden. |
| Kostenfarbe / Kreditfarbe            | Farbe der großen Zahl beim Bezahlen / beim Empfangen                         |

### Verbrauch

| Feld                   | Bedeutung                                                                                         |
| ---------------------- | ------------------------------------------------------------------------------------------------- |
| Energie OID            | Der Energieverbrauch bzw. der Zählerstand im Verlaufsmodus                                        |
| Multiplikator          | Skalierung, z.B. `0.001` für Wh → kWh                                                              |
| Preis                  | Preis pro Energieeinheit, z.B. `0.30`                                                              |
| Preis OID              | Ein Datenpunkt mit dem aktuellen Preis für einen dynamischen Tarif. Er ist _dem Preis_ überlegen. |
| Monatliche Grundgebühr | Fester Betrag pro Monat, verteilt auf den angegebenen Zeitraum                                    |

### Einspeisung

| Feld                   | Bedeutung                                                                               |
| ---------------------- | --------------------------------------------------------------------------------------- |
| Feed-in OID            | Energie, die ins Netz eingespeist wird. Falls keine Energie vorhanden ist, leer lassen. |
| Multiplikator          | Skalierung                                                                              |
| Einspeisevergütung     | Womit eine Einheit bezahlt wird, z. B. `0.08`                                            |
| Einspeisevergütung OID | …oder ausgehend von einem Datenpunkt. Es setzt sich gegen den festen Wert durch.        |

### Zeitraum

| Feld                                    | Bedeutung                                                                                                        |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Widget zur Auswahl eines Zeitintervalls | Der folgende [Intervallwähler](/#/docs/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md)    |
| Start-OID / Intervall-OID               | Zeitraum aus zwei Datenpunkten stattdessen                                                                       |
| Aggregat                                | Nur im Verlaufsmodus, siehe [Verbrauch](/#/docs/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md) |
| Differenz berechnen                     | Nur im Verlaufsmodus. Für Zählerstände aktiviert.                                                                |

## Die Grundgebühr

Die Grundgebühr wird **pro Monat** eingegeben und auf den angezeigten Zeitraum verteilt: ein Tag erhält ein Dreißigstel davon (genau: eins geteilt durch die Anzahl der Tage dieses Monats), eine Woche sieben dieser Tage, ein Monat die gesamte Gebühr und ein Jahr das Zwölffache.

## Das Gleichgewicht

```
balance = consumption × price + share of the base fee − feed-in × feed-in tariff
```

Ein positiver Saldo wird als **Kosten** in der Kostenfarbe, ein negativer Saldo als **Guthaben** in der Guthabenfarbe angezeigt.

## Rezept: die Kosten des laufenden Monats

1. _Woher die Energie kommt_ =`Sum from the history`, _Berechne die Differenz_ für.
2. _Energy OID_ = Zählerstand des Hauses, _Feed-in OID_ = Einspeisezähler.
3. _Preis_ =`0.32` _Einspeisevergütung_ =`0.082` _Monatliche Grundgebühr_ =`12.90` Die
4. Folgen Sie dem [Intervallauswahlfeld](/#/docs/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md) und stellen Sie es auf „Monat“ ein.

## Rezept: ein dynamischer Tarif

Geben Sie den aktuellen Preis Ihres Tarifadapters (Tibberlink, Awattar usw.) als Punktpreis _-OID ein_ und verknüpfen Sie das Widget mit dem [dynamischen Strompreisdiagramm](/#/docs/adapterref/iobroker.vis-2-widgets-energy/docs/en/dynamic-price.md) . Beachten Sie, dass die Kosten anhand des _aktuellen_ Preises für den gesamten Zeitraum berechnet werden – die genaue stündliche Abrechnung erfolgt durch den Tarifadapter selbst.

## Fehlerbehebung

- **Die Zahl ändert sich nicht, wenn ich den Zeitraum ändere.** Sie befinden sich im Modus „Wert des Datenpunkts“, in dem der Zeitraum lediglich das Ergebnis angibt. Wechseln Sie zu „Summe aus dem Verlauf“.
- **Die Kosten im Verlaufsmodus sind viel zu hoch.** _Die Differenzberechnung_ ist deaktiviert, obwohl es sich bei dem Datenpunkt um einen Zählerstand handelt; daher wurden Zählerstände anstatt Verbrauchswerte summiert.
- **Es wird überhaupt nichts angezeigt.** Die Verlaufsinstanz protokolliert diesen Datenpunkt nicht, oder _die Energie-OID_ ist nicht festgelegt.
- **Die Grundgebühr scheint falsch zu sein.** Sie gilt pro Monat, nicht pro Periode. Ein Tag wird absichtlich nur mit einem Dreißigstel angezeigt.