---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-energy/README.md":{"title":{"en":"Vis 2 Energy widgets"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/README.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/README.md":{"title":{"en":"Energy widgets for vis-2"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/README.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/distribution.md":{"title":{"en":"Distribution"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/distribution.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md":{"title":{"en":"Consumption"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption-comparison.md":{"title":{"en":"Consumption comparison"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption-comparison.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md":{"title":{"en":"Interval selector"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/self-sufficiency.md":{"title":{"en":"Self-sufficiency"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/self-sufficiency.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/battery.md":{"title":{"en":"Battery storage"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/battery.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/energy-costs.md":{"title":{"en":"Energy costs"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/energy-costs.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/dynamic-price.md":{"title":{"en":"Dynamic electricity price"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/dynamic-price.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md
title: Verbrauch
hash: J+ZoQzHB3orgnaMiimyfde0IguTInuJ0rd+seRHC/sM=
---
# Verbrauch

![Energieverbrauch](../../../../../en/adapterref/iobroker.vis-2-widgets-energy/img/consumption.png)

Pro Stunde, Tag, Wochentag oder Monat des ausgewählten Zeitraums wird ein Balken (oder eine Linie) für bis zu n Datenpunkte gleichzeitig angezeigt. Die Daten stammen aus einer Verlaufsspeicherung; daher ist dies das einzige Widget im Set, das eine solche benötigt.

## Anforderungen

- Ein **Verlaufsinstanz** (`history`, `sql`, `influxdb` Das Widget verwendet die standardmäßige Verlaufsinstanz aus den ioBroker-Systemeinstellungen.
- Die Datenpunkte müssen von dieser Instanz **protokolliert** werden – schalten Sie die Protokollierung in den Objekteinstellungen ein.
- Ein Zeitraum, siehe [Zeitraum](/#/docs/adapterref/iobroker.vis-2-widgets-energy/docs/en/README.md#the-period) .

## Wie aus einem Punkt Balken werden

| Zeitraum | Barren                | Etikett |
| -------- | --------------------- | ------- |
| Tag      | 24, einer pro Stunde  | `HH:00` |
| Woche    | 7, einer pro Tag      | `Mon` … |
| Monat    | 28–31, einmal pro Tag | `DD.MM` |
| Jahr     | 12, einer pro Monat   | `Jan` … |

Die Verlaufsinstanz fragt genau so viele aggregierte Werte ab. Was in einem Balken angezeigt wird, wird durch _Aggregate_ bestimmt.

## Zähler oder Verbrauch?

Die meisten Energiedatenpunkte in ioBroker sind **Zähler** : eine Zahl, die nur wächst, z. B. `1234.5 kWh` Gesamtverbrauch seit der Installation. Ein Diagramm davon ist eine Treppenstufe, kein Verbrauchsdiagramm.

Aktivieren Sie für diese Werte die Option **„Differenz berechnen“** . Das Widget liest dann einen zusätzlichen Messwert vor dem Zeitraum und zeigt die Differenz zwischen zwei aufeinanderfolgenden Messwerten an – dies entspricht dem Verbrauch der jeweiligen Stunde oder des jeweiligen Tages. Verwenden Sie diese Funktion zusammen mit _„Aggregieren_ =“. `max` Die

Lassen Sie es weg, wenn der Datenpunkt bereits den Verbrauch eines Zeitraums enthält (zum Beispiel etwas, das `statistics` (Adapter hergestellt).

## Konfiguration

### Gemeinsam

| Feld                                    | Bedeutung                                                                                                                       |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Ohne Rahmen / Name                      | Karte und Titel                                                                                                                 |
| Diagrammtyp                             | Balken, Linien oder ausgefüllte Linien                                                                                          |
| Gestapelte Stangen                      | Stapeln Sie die Serien, anstatt sie nebeneinander zu zeichnen.                                                                  |
| Legende anzeigen                        | Die Namen der Serien oberhalb der Grafik                                                                                        |
| Werkzeugkasten anzeigen                 | Die kleinen Symbole, die das Stapeln umschalten und die Datentabelle öffnen                                                     |
| Dezimalzahlen                           | Dezimalzahlen in der QuickInfo                                                                                                  |
| Geräteanzahl                            | Wie viele Datenpunkte werden gezeichnet?                                                                                        |
| Widget zur Auswahl eines Zeitintervalls | Der [Intervallwähler, dem](/#/docs/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md) dieses Diagramm folgt |
| Start-OID / Intervall-OID               | Zeitraum zwischen zwei Datenpunkten, wenn kein Auswahl-Widget verwendet wird                                                    |

### Aggregation

| Feld                  | Bedeutung                                                                                            |
| --------------------- | ---------------------------------------------------------------------------------------------------- |
| Aggregat              | Wie die Verlaufsinstanz einen Balken komprimiert: `max`, `min`, `average`, `total`, `integral`, …    |
| Differenz berechnen   | Siehe [oben](#counter-or-consumption) . Nur angeboten für `max`, `min`, `average`, `none`, `integral` |
| Perzentil / Quantil   | Parameter der passenden Aggregation                                                                  |
| Integraleinheit       | Zeiteinheit des Integrals in Sekunden, z. B. `3600` für eine Stunde                                   |
| Integralinterpolation | Wie die Lücken zwischen zwei Proben während der Integration gefüllt werden                           |

### Wert 1 … n

| Feld          | Bedeutung                                                                                    |
| ------------- | -------------------------------------------------------------------------------------------- |
| OID           | Der protokollierte Datenpunkt. Name, Farbe und Einheit werden vom Objekt übernommen.         |
| Name          | Wird in der Legende und im Tooltip angezeigt                                                 |
| Farbe         | Farbe der Serie                                                                              |
| Einheit       | Wie in der QuickInfo angezeigt; die erste konfigurierte Einheit beschriftet auch die y-Achse |
| Multiplikator | Skalierung, z.B. `0.001` Umrechnung von Wh in kWh                                             |

## Rezept: Haushalt, Wärmepumpe und Wandbox pro Tag

1. _Geräteanzahl_ = 3, _Gestapelte Balken_ aktiviert.
2. _Aggregat_ =`max`, _Differenz berechnen_ — alle drei sind Messwerte.
3. Wert 1 = Haushaltszähler, Wert 2 = Wärmepumpenzähler, Wert 3 = Wandkastenzähler.
4. Platzieren Sie darüber einen [Intervallselektor](/#/docs/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md) und wählen Sie ihn im _Widget zur Zeitintervallauswahl_ aus.

## Fehlerbehebung

- **Das Diagramm bleibt leer.** Die Verlaufsinstanz protokolliert diesen Datenpunkt nicht, oder es ist keine Standard-Verlaufsinstanz in den Systemeinstellungen hinterlegt. Das Widget wartet 10 Sekunden auf eine Antwort und zeigt dann nichts an – eine fehlende Verlaufsinstanz antwortet überhaupt nicht.
- **Eine Treppe statt eines Verbrauchs.** Schalter „ _Differenz berechnen“_ aktivieren.
- **Ein Balken ist viel zu groß.** Der Zähler wurde zurückgesetzt, daher ist die Differenz zum vorherigen Messwert enorm. Das Widget begrenzt eine negative Differenz auf 0, aber selbst ein Zurücksetzen auf einen niedrigeren Wert führt im nachfolgenden Bereich noch zu einem falschen Balken.
- **Die aktuelle Stunde fehlte.** Dies war ein Fehler bis Version 2.0.1: Im Differenzmodus wurde der letzte Bucket des Zeitraums verworfen. Behoben.
- **Der Februar hatte 31 Balken.** Außerdem wurde die Monatslänge vom Vormonat übernommen.