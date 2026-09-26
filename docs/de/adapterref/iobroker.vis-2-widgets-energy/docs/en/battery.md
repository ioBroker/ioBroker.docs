---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-energy/README.md":{"title":{"en":"Vis 2 Energy widgets"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/README.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/README.md":{"title":{"en":"Energy widgets for vis-2"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/README.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/distribution.md":{"title":{"en":"Distribution"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/distribution.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md":{"title":{"en":"Consumption"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption-comparison.md":{"title":{"en":"Consumption comparison"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption-comparison.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md":{"title":{"en":"Interval selector"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/self-sufficiency.md":{"title":{"en":"Self-sufficiency"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/self-sufficiency.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/battery.md":{"title":{"en":"Battery storage"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/battery.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/energy-costs.md":{"title":{"en":"Energy costs"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/energy-costs.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/dynamic-price.md":{"title":{"en":"Dynamic electricity price"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/dynamic-price.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-2-widgets-energy/docs/en/battery.md
title: Batteriespeicher
hash: XDx2AUm8CqDZC3pp3tK/wiiuVyK1HAXOhaNhWWMv6Ws=
---
# Batteriespeicher

![Batteriespeicher](../../../../../en/adapterref/iobroker.vis-2-widgets-energy/img/battery.png)

Ein Batteriesymbol, das je nach Ladezustand gefüllt ist und die Lade- oder Entladeleistung, eine Schätzung der verbleibenden Laufzeit und die gespeicherte Energie anzeigt.

## Anforderungen

Nur Live-Werte. Der Ladezustand genügt für das Symbol; Leistung und Kapazität ergänzen den Rest.

## Konfiguration

### Gemeinsam

| Feld                       | Bedeutung                                                |
| -------------------------- | -------------------------------------------------------- |
| Ohne Rahmen / Name         | Karte und Titel                                          |
| Orientierung               | Das Symbol steht aufrecht oder liegt auf der Seite       |
| Zeigen Sie Ihre Stärke     | Die Linie mit dem Pfeil unter dem Prozentsatz            |
| Verbleibende Zeit anzeigen | "Voll gefüllt" / "Leer gefüllt". Benötigt die Kapazität. |
| Dezimalzahlen              | Dezimalstellen des Prozentsatzes und der Potenz          |

### Werte

| Feld                          | Bedeutung                                                                                                                        |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Anklagepunkt OID              | Der SoC in Prozent                                                                                                               |
| Multiplikator                 | `100` wenn der Datenpunkt 0 … 1 anstatt 0 … 100 liefert                                                                          |
| Getrenntes Laden und Entladen | Der Wechselrichter hat einen Datenpunkt pro Richtung anstelle eines einzelnen Vorzeichenwerts.                                   |
| Batterieleistung OID          | Die unterzeichnete Macht                                                                                                         |
| Ein positiver Wert bedeutet   | Laden oder Entladen – die Wechselrichter sind sich hier uneinig.                                                                 |
| Ladeleistung OID              | Größer als Null, solange die Batterie geladen wird                                                                               |
| Entladeleistung OID           | Größer als Null, solange die Batterie entladen wird.                                                                             |
| Multiplikator                 | Skalierung der Leistung                                                                                                          |
| Netzteil                      | Normalerweise `W` oder `kW`                                                                                                        |
| Kapazität                     | Nutzbare Kapazität als feste Zahl                                                                                                |
| Kapazität OID                 | …oder anhand eines Datenpunkts, falls der Wechselrichter diesen meldet. Dieser Wert ist ausschlaggebender als die absolute Zahl. |
| Kapazitätseinheit             | Normalerweise `kWh`                                                                                                               |

### Farben

| Feld                                  | Bedeutung                                                                                    |
| ------------------------------------- | -------------------------------------------------------------------------------------------- |
| Farbe nach Stufe                      | Ändern Sie die Farbe an den beiden Schwellenwerten, anstatt eine einzige Farbe zu verwenden. |
| Niedrige Schwelle / Mittlere Schwelle | In Prozent                                                                                   |
| Niedrige / Mittlere / Hohe Farbe      | Bis zur unteren Schwelle, bis zur mittleren, darüber                                         |
| Füllfarbe                             | Die einzelne Farbe, wenn _„Farbe nach Stufe“_ deaktiviert ist.                               |

## Die verbleibende Zeit

```
charging:    (100 % − SoC) × capacity / |power|
discharging:          SoC  × capacity / |power|
```

Die Kapazität ist eine Energieeinheit (kWh) und die Leistung eine Leistungseinheit (W oder kW), daher müssen die beiden übereinstimmen: eine _Leistungseinheit_ von `W` wird vor der Division durch 1000 geteilt, alle anderen Einheiten bleiben unverändert. Bei einer Kapazität in kWh stellen Sie die Leistungseinheit also auf ein. `W` oder `kW` — alles andere führt zu einer falschen Schätzung.

Die Zahl stellt eine Momentaufnahme der aktuellen Leistung dar, keine Prognose: Sie ändert sich, sobald sich die Last ändert.

## Rezept: ein 10-kWh-Speicher an einem Hybrid-Wechselrichter

1. _Ladezustands-OID_ = der SoC-Datenpunkt, _Multiplikator_ =`1` Die
2. _Batterieleistung OID_ = die Batterieleistung, _ein positiver Wert bedeutet_ =`Charging` (versuchen `Discharging` (wenn der Pfeil in die falsche Richtung zeigt), _Leistungseinheit_ =`W` Die
3. _Kapazität_ =`10`, _Kapazitätseinheit_ =`kWh` Die
4. _Farbgebung nach Pegel_ mit den Standardeinstellungen: Rot bis 20 %, Orange bis 50 %, Grün darüber.

## Fehlerbehebung

- **Der Pfeil zeigt in die falsche Richtung.** _Ein positiver Wert bedeutet,_ dass Sie zur anderen Option wechseln oder die beiden Objekt-IDs im separaten Modus vertauschen können.
- **Es wird keine Restzeit angezeigt.** Die Kapazität fehlt oder die Leistung beträgt exakt 0 – es gibt nichts zu schätzen, solange sich der Akku im Ruhezustand befindet.
- **Die verbleibende Zeit ist 1000-mal falsch.** _Leistungseinheit_ und _Kapazitätseinheit_ stimmen nicht überein. Bei einer Kapazität in kWh muss die Leistungseinheit … sein. `W` oder `kW` Die
- **Der Balken ist immer voll.** Der SoC-Datenpunkt liefert 0 … 1. _Multiplikator_ einstellen auf `100` Die