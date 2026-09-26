---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-energy/README.md":{"title":{"en":"Vis 2 Energy widgets"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/README.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/README.md":{"title":{"en":"Energy widgets for vis-2"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/README.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/distribution.md":{"title":{"en":"Distribution"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/distribution.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md":{"title":{"en":"Consumption"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption-comparison.md":{"title":{"en":"Consumption comparison"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption-comparison.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md":{"title":{"en":"Interval selector"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/self-sufficiency.md":{"title":{"en":"Self-sufficiency"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/self-sufficiency.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/battery.md":{"title":{"en":"Battery storage"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/battery.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/energy-costs.md":{"title":{"en":"Energy costs"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/energy-costs.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/dynamic-price.md":{"title":{"en":"Dynamic electricity price"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/dynamic-price.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md
title: Intervallwähler
hash: ROweqoKUUPXy2LVm7ZDmx9aQeJ7JbTGOASdGkS9Hbzc=
---
# Intervallwähler

![Zeitauswahl](../../../../../en/adapterref/iobroker.vis-2-widgets-energy/img/timeSelector.png)

Tag / Woche / Monat / Jahr, zwei Pfeile zum Durchblättern der Zeiträume und eine Schaltfläche **„Jetzt“** , die zum aktuellen Zeitraum zurückspringt. Weitere Widgets folgen dieser Auswahl.

## Wie andere Widgets es finden

Wählen Sie dieses Widget im Attribut _„Widget“ für die Zeitintervallauswahl_ eines [Verbrauchs-](/#/docs/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md) oder [Energiekosten](/#/docs/adapterref/iobroker.vis-2-widgets-energy/docs/en/energy-costs.md) -Widgets aus. Mehrere Widgets können demselben Selektor folgen, und der Selektor kann sich an beliebiger Position in derselben Ansicht befinden.

Technisch gesehen veröffentlicht sich der Selektor über das DOM, und die Nutzer abonnieren ihn. Da die Reihenfolge, in der Widgets eingebunden werden, nicht festgelegt ist, sucht ein Nutzer so lange nach dem Selektor, bis er ihn findet, und abonniert ihn erneut, wenn der Selektor verschoben oder neu erstellt wird. Dafür ist keine Konfiguration erforderlich.

Darüber hinaus und unabhängig davon schreibt der Selektor den Punkt in die **Ansicht** : Jedes Widget der Ansicht, das keinen eigenen Selektor angibt, folgt ihm ebenfalls.

## Konfiguration

### Gemeinsam

| Feld               | Bedeutung                                                                                |
| ------------------ | ---------------------------------------------------------------------------------------- |
| Ohne Rahmen / Name | Karte und Titel                                                                          |
| Zeitstart-OID      | Optional. Der gewählte Beginn des Zeitraums wird hier als Zeitstempel eingetragen.       |
| Zeitintervall OID  | Optional. Die gewählte Länge wird hier eingetragen: `day`, `week`, `month` oder `year` Die |

Die beiden Objekt-IDs dienen der Verwendung in Skripten und anderen Ansichten: Sobald eine ID festgelegt ist, liest und schreibt der Selektor den entsprechenden Datenpunkt, anstatt den Wert für sich selbst zu behalten, und ein Skript kann das gesamte Dashboard durch Schreiben in dieses verschieben.

### Aussehen

| Feld                                  | Bedeutung                                                                                          |
| ------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Angebotstag / -woche / -monat / -jahr | Welche Schaltflächen der Auswahlwähler hat. Wenn keine ausgewählt ist, werden alle vier angezeigt. |
| „Jetzt“-Schaltfläche ausblenden       | Blendet die Schaltfläche aus, die zurück zum laufenden Zeitraum springt.                           |
| Datumsformat                          | `24.09.2026`, `09/24/2026`, `2026-09-24` oder die Sprache des Benutzers                            |

## Die Wochen beginnen am Montag.

Eine Woche dauert von Montag bis Sonntag. Der Sonntag gehört zu der Woche, die endet, nicht zu der, die am nächsten Tag beginnt.

## Rezept: Ein Selektor für ein ganzes Dashboard

1. Platzieren Sie den Selektor am oberen Rand der Ansicht, _ohne Rahmen_ , Höhe ca. 60 px.
2. Deaktivieren Sie _das Jahresangebot,_ falls Sie keine Jahresansicht wünschen.
3. Wählen Sie in jedem der darunter stehenden Diagramme den Selektor im _Widget für die Zeitintervallauswahl_ aus.

## Fehlerbehebung

- **Ein Diagramm richtet sich nicht nach dem Selektor.** Überprüfen Sie _das Widget auf die Zeitintervallauswahl_ im Diagramm. Ein Diagramm ohne Selektor richtet sich nach dem Zeitraum der Ansicht – der zwar auch vom Selektor festgelegt wird, aber nur für die jeweilige Ansicht.
- **Der Pfeil nach rechts ist ausgegraut.** Sie befinden sich im laufenden Zeitraum; danach kommt nichts mehr.
- **Der Selektor springt automatisch zurück.** Beim Wechsel des Zeitraums wird immer der aktuelle Zeitraum ausgewählt, sodass eine „Woche“, die für einen Tag in der Vergangenheit ausgewählt wurde, nicht in einem leeren Fenster landet.