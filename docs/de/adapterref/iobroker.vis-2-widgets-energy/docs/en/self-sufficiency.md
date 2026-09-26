---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-energy/README.md":{"title":{"en":"Vis 2 Energy widgets"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/README.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/README.md":{"title":{"en":"Energy widgets for vis-2"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/README.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/distribution.md":{"title":{"en":"Distribution"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/distribution.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md":{"title":{"en":"Consumption"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption-comparison.md":{"title":{"en":"Consumption comparison"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption-comparison.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md":{"title":{"en":"Interval selector"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/self-sufficiency.md":{"title":{"en":"Self-sufficiency"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/self-sufficiency.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/battery.md":{"title":{"en":"Battery storage"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/battery.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/energy-costs.md":{"title":{"en":"Energy costs"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/energy-costs.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/dynamic-price.md":{"title":{"en":"Dynamic electricity price"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/dynamic-price.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-2-widgets-energy/docs/en/self-sufficiency.md
title: Selbstversorgung
hash: BR8dtpjj3JfqQQ04VRN1/xqrFxfGUQKoQ7tR3LZaU8U=
---
# Selbstversorgung
![Selbstversorgung](../../../../../en/adapterref/iobroker.vis-2-widgets-energy/img/selfSufficiency.png)

Zwei Ringlehren, die die zwei Fragen beantworten, die sich jeder PV-Besitzer stellt:

- **Selbstversorgung** - wie viel von dem, was das Haus nutzte, *nicht* aus dem Stromnetz stammte.
- **Eigenverbrauch** - wie viel von dem, was die Photovoltaikanlage produziert hat, im eigenen Haushalt verbraucht statt verkauft wurde.

Beide sind Verhältnisse, daher funktionieren sie sowohl mit Leistung (einem Live-Bild) als auch mit Energiezählern einer Periode - vorausgesetzt, alle Eingaben verwenden die **gleiche Einheit**.

## Die Formeln
```
house consumption = production − feed-in + grid import      (unless its own data point is set)
self-consumed     = production − feed-in
self-sufficiency  = (house consumption − grid import) / house consumption
self-consumption  = self-consumed / production
```

Beide Ergebnisse sind auf 0…100 % begrenzt, und ein Ring zeigt `--` an, während sein Nenner 0 ist (z. B. keine Produktion in der Nacht).

## Anforderungen
Nur Echtzeitwerte. Mindestens die Produktion und das Netz; der Eigenverbrauch ergibt sich dann aus der Bilanz.

Alle Datenpunkte müssen in derselben Einheit angegeben werden: Mischen Sie beispielsweise nicht einen PV-Wechselrichter in Watt mit einem Zähler in Kilowatt. Verwenden Sie den **Multiplikator** neben jeder Objekt-ID, um die Daten zusammenzuführen.

## Konfiguration
### Gemeinsam
| Feld | Bedeutung |
| ----------------------- | --------------------------------------------------------------------------- |
| Ohne Rahmen / Name | Karte und Titel |
| Anzeigen | Beide Ringe, nur Selbstversorgung oder nur Selbstverbrauch |
| Werte anzeigen | Listet Produktion, Eigenverbrauch, Netzimport und -export unter den Ringen auf |
| Einheit | Wird nach den aufgeführten Werten geschrieben, z. B. `W` oder `kWh` |
| Dezimalzahlen | Dezimalzahlen der Prozentsätze und der aufgeführten Werte |
| Ringdicke | Breite des Rings in Pixeln |
| Farbe der Selbstversorgung | Ausgefüllter Teil des linken Rings |
| Farbe für den Eigenverbrauch | Ausgefüllter Teil des rechten Rings |
| Spurfarbe | Der leere Teil des Rings. Leer folgt dem Thema. |

### Datenquellen
| Feld | Bedeutung |
| --------------------------- | --------------------------------------------------------------------------------- |
| Produktions-OID | Was die PV-Anlage produziert |
| Ein Datenpunkt für das Netz | Der Zähler liefert einen vorzeichenbehafteten Wert für beide Richtungen |
| Grid-OID | Dieser vorzeichenbehaftete Wert: Positive Werte werden aus dem Grid entnommen, negative Werte werden hineingespeist |
| Grid-Import-OID | Was wird aus dem Netz entnommen (wenn der Zähler die Richtungen trennt)? |
| Grid-Export-OID | Was wird in das Grid eingespeist? |
| Haushaltsverbrauchs-OID | Optional. Ohne diese Angabe wird der Verbrauch anhand der anderen drei berechnet. |
| Multiplikator (drei Stück) | Einer für die Produktion, einer für das Netz, einer für den Eigenverbrauch |

## Rezept: ein Live-Bild in W
1. *Produktions-OID* = die Wechselstromleistung des Wechselrichters.
2. *Ein Datenpunkt für das Netz* eingeschaltet, *Netz-OID* = die Leistung des Netzzählers (positiv = aus dem Netz entnommen).
3. Lassen Sie *House consumption OID* leer - das ergibt sich aus der Bilanz.
4. *Werte anzeigen* bei *Einheit* = `W`.

## Rezept: die Tagesration
Verwenden Sie stattdessen Tagesenergiezähler: Produktion, Netzbezug und Einspeisung des Tages. Die beiden Ringe zeigen dann die Tagesquote an, nicht die der aktuellen Sekunde. Alle Angaben in kWh, alle Multiplikatoren bei `1`.

## Fehlerbehebung
- **Ein Ring zeigt `--` an.** Sein Nenner ist 0. Für den Eigenverbrauch ist eine Produktion größer als 0 erforderlich.

Für Selbstversorgung ist ein Haushaltsverbrauch von mehr als 0 erforderlich.

- **Die Selbstversorgung beträgt immer 100 %.** Der Grid-Import ist nicht konfiguriert oder hat den Wert 0. Mit einem signierten Grid-Datensatz

Punkt, überprüfen Sie, ob Ihr Zähler tatsächlich ein positives Signal für „vom Netz entnommen“ verwendet - falls es umgekehrt ist, verwenden Sie stattdessen die beiden separaten Objekt-IDs.

Die Zahlen passen nicht zusammen. Ein Eingang hat eine andere Einheit. Überprüfen Sie die drei Multiplikatoren.