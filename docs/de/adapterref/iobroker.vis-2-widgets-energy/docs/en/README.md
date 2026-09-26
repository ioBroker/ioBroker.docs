---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-energy/README.md":{"title":{"en":"Vis 2 Energy widgets"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/README.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/README.md":{"title":{"en":"Energy widgets for vis-2"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/README.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/distribution.md":{"title":{"en":"Distribution"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/distribution.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md":{"title":{"en":"Consumption"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption-comparison.md":{"title":{"en":"Consumption comparison"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption-comparison.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md":{"title":{"en":"Interval selector"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/self-sufficiency.md":{"title":{"en":"Self-sufficiency"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/self-sufficiency.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/battery.md":{"title":{"en":"Battery storage"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/battery.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/energy-costs.md":{"title":{"en":"Energy costs"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/energy-costs.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/dynamic-price.md":{"title":{"en":"Dynamic electricity price"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/dynamic-price.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-2-widgets-energy/docs/en/README.md
title: Energie-Widgets für vis-2
hash: jFm3W1h2p+usZwBOEyL1VVMvoZnmT37hN6CEs2KKU+I=
---
# Energie-Widgets für vis-2

Acht Widgets für Energie-Dashboards: ein animiertes Energieflussdiagramm, drei Diagramme mit historischen und aktuellen Werten, ein Periodenwähler, dem die Diagramme folgen, zwei Anzeigen für die Selbstversorgung, eine Batteriespeicheranzeige und ein stündliches Börsenpreisdiagramm.

| Widget                                                                                                    | Wozu dient es?                                                                             |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [Verteilung](/#/docs/adapterref/iobroker.vis-2-widgets-energy/docs/en/distribution.md)                    | Animiertes Flussdiagramm: Stromnetz, Photovoltaikanlage, Wandbox, Wärmepumpe rund ums Haus |
| [Verbrauch](/#/docs/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md)                      | Balken-/Liniendiagramm einer Periode, ausgelesen aus einer Verlaufsinstanz                 |
| [Verbrauchsvergleich](/#/docs/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption-comparison.md) | Balken- oder Kreisdiagramm zum Vergleich der Live-Werte mehrerer Geräte                    |
| [Intervallwähler](/#/docs/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md)          | Tages-/Wochen-/Monats-/Jahresauswahl; die anderen Widgets folgen.                          |
| [Selbstversorgung](/#/docs/adapterref/iobroker.vis-2-widgets-energy/docs/en/self-sufficiency.md)          | Zwei Messinstrumente: Selbstversorgung und Selbstverbrauch                                 |
| [Batteriespeicher](/#/docs/adapterref/iobroker.vis-2-widgets-energy/docs/en/battery.md)                   | Ladezustand, Lade-/Entladeleistung, verbleibende Zeit                                      |
| [Energiekosten](/#/docs/adapterref/iobroker.vis-2-widgets-energy/docs/en/energy-costs.md)                 | kWh × Preis, Grundgebühr und Einspeisevergütung für den dargestellten Zeitraum             |
| [Dynamischer Strompreis](/#/docs/adapterref/iobroker.vis-2-widgets-energy/docs/en/dynamic-price.md)       | Stündliche Wechselkurse, wobei die günstigsten Stunden hervorgehoben sind                  |

## Anforderungen

- **Ein vis-2-Adapter, der unter React 19 (Version 2.20.1 und neuer) läuft** . Dieses Widget-Set wurde mit React 19 erstellt, daher müssen die beiden Versionen kompatibel sein: Ein React-19-vis-2-Adapter überspringt Widget-Sets, die für React 18 erstellt wurden (mit entsprechender Meldung im Log), und ein React-18-vis-2-Adapter kann dieses Widget-Set nicht darstellen. Aktualisieren Sie vis-2 zusammen mit diesem Adapter.
- Ein **Verlaufsinstanz** (`history`, `sql` oder `influxdb` Nur für [Verbrauch](/#/docs/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md) und [Energiekosten](/#/docs/adapterref/iobroker.vis-2-widgets-energy/docs/en/energy-costs.md) im Modus „Summe aus dem Verlauf“. Alle anderen Werte basieren auf Echtzeitdaten. Es wird die Standard-Verlaufsinstanz der Systemeinstellungen verwendet.

## Konzepte, die in mehreren Widgets wiederkehren

### Multiplikator

Nahezu jede Objekt-ID hat einen **Multiplikator** daneben. Die Widgets erraten keine Einheiten: Ein Datenpunkt in Watt bleibt in Watt. Verwenden Sie den Multiplikator, um einen Datenpunkt in die Einheit umzurechnen, die der Rest des Widgets verwendet. `0.001` wandelt W in kW um, `1000` wandelt kW in W um, `100` wandelt Euro in Cent um.

> Seit Version 2.0.0 rechnet das Vergleichs-Widget W nicht mehr in Wh um und teilt Wh nicht mehr durch 1000. Falls nach einem Update im Dashboard Werte angezeigt werden, die um den Faktor 1000 zu hoch sind, stellen Sie den Multiplikator des Geräts entsprechend ein. `0.001` Die

### Eine Objekt-ID, die nie festgelegt wurde.

Ein `id` Ein Feld, das nie berührt wurde, kommt nicht leer an, sondern als die entsprechende Zeichenkette. `nothing_selected` Alle Widgets behandeln dies als „nicht konfiguriert“, daher wird eine halb ausgefüllte Konfiguration nicht angezeigt. `0` Die

### Der Zeitraum

[Verbrauchs-](/#/docs/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md) und [Energiekosten](/#/docs/adapterref/iobroker.vis-2-widgets-energy/docs/en/energy-costs.md) benötigen einen Zeitraum. Es gibt drei Möglichkeiten, ihnen einen solchen Zeitraum zu geben, und sie werden in dieser Reihenfolge ausprobiert:

1. **Ein Widget** – wählen Sie im Attribut „Widget“ einen [Intervallselektor](/#/docs/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md) _für die Zeitintervallauswahl_ . Dies ist der Normalfall, und mehrere Diagramme können denselben Selektor verwenden.
2. **Zwei Objekt-IDs** – _die Start-OID_ enthält den Beginn als Zeitstempel, _die Intervall-OID_ ist eine von `day`, `week`, `month`, `year` Nützlich, wenn ein Skript die Periode festlegt.
3. **Nichts** — das Widget folgt dann der Periode der gesamten Ansicht, die vis-2 für alle darin enthaltenen Widgets beibehält.

### Ohne Rahmen

Jedes Widget kann ohne seine Karte gezeichnet werden (`Without frame` Verwenden Sie diese Option, wenn sich das Widget innerhalb eines anderen Widgets oder auf einem Hintergrund befindet, der bereits einen Rahmen bildet. Der Titel verschwindet dann ebenfalls.

## Woher die Werte kommen

Keines dieser Widgets berechnet den Energieverbrauch aus der Leistung über die Zeit. Sie zeigen lediglich den bereits vorhandenen Wert eines Datenpunkts an, daher sind die Zahlen nur so genau wie der zugrunde liegende Adapter. Typische Datenquellen in ioBroker:

- Wechselrichteradapter (`sma-em`, `fronius`, `e3dc`, `solax`, `growatt`, `modbus`, …) für Produktion, Netz und Batterie,
- Smart-Meter-Adapter (`smartmeter`, `tibberlink`, `shelly` mit einem 3EM) für Netzimport und -export,
- `tibberlink`, `awattar`, `epex-spot`, `smartenergy` zu Stundenpreisen,
- Die `statistics` Adapter, falls Sie Tages-/Monatssummen als fertige Datenpunkte benötigen.