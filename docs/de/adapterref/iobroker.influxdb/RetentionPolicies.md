---
chapters: {"pages":{"en/adapterref/iobroker.influxdb/README.md":{"title":{"en":"ioBroker.influxdb"},"content":"en/adapterref/iobroker.influxdb/README.md"},"en/adapterref/iobroker.influxdb/RetentionPolicies.md":{"title":{"en":"Understanding retention policies"},"content":"en/adapterref/iobroker.influxdb/RetentionPolicies.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.influxdb/RetentionPolicies.md
title: Aufbewahrungsrichtlinien verstehen
hash: 5XhuDfhwCEwfWACVVa2Iftzd6aztdtd6Nzruj+mBTSM=
---
# Aufbewahrungsrichtlinien verstehen

Um zu bestimmen, wie lange Daten in InfluxDB aufbewahrt werden, ist es wichtig zu verstehen, wie **Aufbewahrungsrichtlinien** und **Shard-Gruppendauern** zusammenhängen.

Influx speichert alle Messwerte innerhalb eines bestimmten Zeitraums im selben **Shard** , der wiederum Teil einer **Shard-Gruppe** ist. Die Shard-Gruppe erzwingt einen definierten Zeitraum.`Shard Group Duration` für alle Shards, aber die Einstellungen variieren je nach Influx-Version.

Wenn der konfigurierte Wert überschritten wird`Shard Group Duration` ,

- Es wird ein neuer Shard erstellt, der ab diesem Zeitpunkt neuere Messdaten speichert.
- Der alte Shard mit allen Messdaten wird zwar noch in der Datenbank gespeichert, aber gelöscht, sobald die Aufbewahrungsfrist für die Messung abgelaufen ist.

Influx löscht Messdatenpunkte nicht einzeln anhand ihrer Aufbewahrungsrichtlinien, sondern prüft den gesamten Shard auf Einhaltung der Aufbewahrungsrichtlinien. Wird diese überschritten, wird der Shard gelöscht. Diese Prüfung erfolgt jedoch nur bei älteren Shards. Aktive Shards werden nicht geprüft, da sie weiterhin neue Messdatenpunkte empfangen können.

_Weitere Erläuterungen und Beispiele finden Sie unter <https://docs.influxdata.com/influxdb/v1.4/concepts/schema_and_data_layout/#shard-group-duration-management> ._

Die folgenden zwei Beispiele veranschaulichen, wie die gleiche Aufbewahrungsfrist je nach konfigurierter Shard-Gruppendauer unterschiedlich durchgesetzt wird.

|                                                | Beispiel 1                                                                                                                                                  | Beispiel 2                                                                                                                                                                                                                                                                                                                                                                      |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Aufbewahrungsfrist                             | 2 Stunden                                                                                                                                                   | 2 Stunden                                                                                                                                                                                                                                                                                                                                                                       |
| Dauer der Scherbengruppe                       | 1 Stunde                                                                                                                                                    | 1 Tag                                                                                                                                                                                                                                                                                                                                                                           |
| Wie lange werden die Daten maximal aufbewahrt? | 2 Stunden                                                                                                                                                   | 1 Tag                                                                                                                                                                                                                                                                                                                                                                           |
| Warum?                                         | Der Shard wird stündlich umgeschaltet, daher erzwingt Influx einmal **pro Stunde** die konfigurierte RP und behält nur Daten der **letzten 2 Stunden** bei. | Der Shard wird einmal täglich gewechselt, und Influx erzwingt anschließend die konfigurierte RP, d. h. es werden nur Daten der letzten **zwei Stunden** gespeichert. Aus diesem Grund sollten Messdaten, die zu Beginn der Shard-Lebensdauer eingefügt wurden, theoretisch nur zwei Stunden lang gespeichert werden, werden aber effektiv einen **ganzen Tag lang** aufbewahrt. |

## iobroker.influxdb Adapter

Der Influx Adapter erlaubt lediglich die Auswahl einer **Aufbewahrungsdauer** und wählt die **Dauer der Shard-Gruppe** automatisch gemäß den [offiziellen Empfehlungen von InfluxDB](https://docs.influxdata.com/influxdb/v2.0/reference/internals/shards/#shard-group-duration) aus.

| Aufbewahrungsdauer des Eimers  | Standardmäßige Dauer der Shard-Gruppe |
| ------------------------------ | ------------------------------------- |
| weniger als 2 Tage             | 1 Stunde                              |
| zwischen 2 Tagen und 6 Monaten | 1d                                    |
| mehr als 6 Monate              | 7d                                    |

Die Dauer der Shard-Gruppe kann weiterhin manuell in der Datenbank selbst geändert werden, aber um die Adapterkonfiguration überschaubar zu halten, kann sie nicht direkt in ioBroker geändert werden.

Der Adapter erzwingt systembedingt nur eine globale Aufbewahrungsrichtlinie, die für alle Messungen gilt – unabhängig von der verwendeten Datenbankversion. Die Richtlinie kann jederzeit geändert werden, es kann jedoch aus den zuvor genannten Gründen einige Zeit dauern, bis die Änderungen wirksam werden.

## Weitere Überlegungen

- Die Dauer von Shard-Gruppen wird häufig kürzer als die Aufbewahrungsfrist konfiguriert, um eine effektive Durchsetzung zu gewährleisten. Dies lässt sich jedoch nicht allgemein empfehlen, da auch andere Faktoren wie die Performance berücksichtigt werden müssen. Extrem kurze Dauern von Shard-Gruppen können zwar die Speicherverwaltung vereinfachen, aber die Performance beeinträchtigen, beispielsweise durch längere Abfragezeiten oder langsamere Schreibgeschwindigkeiten.
- Die Aufbewahrungsrichtlinie darf nicht kürzer als eine Stunde sein. Dies ist eine Entscheidung der Influx-Entwickler ( <https://github.com/influxdata/influxdb/issues/5198#issuecomment-166629531> ) und kann nur umgangen werden, indem InfluxDB direkt aus dem neuesten Quellcode mit geänderten Werten erstellt wird.
- Die Aufbewahrungsrichtlinien werden standardmäßig alle 30 Minuten überprüft. Dies kann jedoch in [der Serverkonfiguration für Influx 1.x](https://docs.influxdata.com/influxdb/v1.8/administration/config/#retention-policy-settings) und [Influx 2.x](https://docs.influxdata.com/influxdb/v2.0/reference/config-options/#storage-retention-check-interval) geändert werden. Die zuvor erläuterten Prinzipien bleiben davon **unberührt** .
- **Influx 1.x** : Bei bestehenden Datenbanken erkennt der Adapter die aktuelle Standardaufbewahrungsrichtlinie und aktualisiert sie. Falls Sie Aufbewahrungsrichtlinien manuell geändert haben und nun weiterhin Daten im Adapter fehlen, könnte dies mit der geänderten Standardrichtlinie zusammenhängen. Weitere Informationen finden Sie hier: <https://docs.influxdata.com/influxdb/v1.7/troubleshooting/frequently-asked-questions/#why-am-i-missing-data-after-creating-a-new-default-retention-policy>