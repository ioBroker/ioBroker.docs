---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-energy/README.md":{"title":{"en":"Vis 2 Energy widgets"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/README.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/README.md":{"title":{"en":"Energy widgets for vis-2"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/README.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/distribution.md":{"title":{"en":"Distribution"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/distribution.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md":{"title":{"en":"Consumption"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption-comparison.md":{"title":{"en":"Consumption comparison"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption-comparison.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md":{"title":{"en":"Interval selector"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/self-sufficiency.md":{"title":{"en":"Self-sufficiency"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/self-sufficiency.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/battery.md":{"title":{"en":"Battery storage"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/battery.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/energy-costs.md":{"title":{"en":"Energy costs"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/energy-costs.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/dynamic-price.md":{"title":{"en":"Dynamic electricity price"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/dynamic-price.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-2-widgets-energy/docs/en/dynamic-price.md
title: Dynamischer Strompreis
hash: C/D4j32ohzZtwC9HBUUGUcVgLKykCUVu60C9nX0tDxQ=
---
# Dynamischer Strompreis

![Dynamischer Strompreis](../../../../../en/adapterref/iobroker.vis-2-widgets-energy/img/dynamicPrice.png)

Der stündliche Wechselkurs als Balkendiagramm. Die günstigsten Stunden sind grün, die teuersten rot, die aktuelle Stunde blau und eine gestrichelte Linie markiert den Durchschnitt der angezeigten Stunden.

## Anforderungen

Ein Datenpunkt, der die Preise als **JSON-Array** enthält. Die Adapter, die Wechselkurse liefern, tun dies alle, aber jeder von ihnen benennt die Felder unterschiedlich – das Widget erkennt die üblichen Namen von selbst:

| Adapter       | Typischer Datenpunkt | Zeitfeld          | Preisfeld     |
| ------------- | -------------------- | ----------------- | ------------- |
| `tibberlink`  | `…PricesToday.json`  | `startsAt`        | `total`       |
| `awattar`     | `…prices.json`       | `start_timestamp` | `marketprice` |
| `epex-spot`   | `…prices`            | `start`           | `price`       |
| `smartenergy` | `…prices`            | `date`            | `value`       |

Akzeptiert werden:

- ein Array von Datensätzen, z.B. `[{ "startsAt": "2026-09-24T12:00:00+02:00", "total": 0.246 }, …]`,
- ein in ein Objekt eingebettetes Array, z. B. `{ "prices": [ … ] }` (Auch `today`, `data`, `values`, `result`),
- eine einfache Anordnung von 24 Zahlen – die man dann als die Stunden des heutigen Tages liest, beginnend um Mitternacht.

Die Zeitangabe kann eine ISO-Zeichenkette, ein Zeitstempel in Millisekunden oder ein Zeitstempel in Sekunden sein.

Falls keine dieser Optionen passt, geben Sie für **die Felder „Zeit“** und **„Preis“** die Namen an, die Ihr Adapter verwendet.

## Konfiguration

### Gemeinsam

| Feld                     | Bedeutung                                                                        |
| ------------------------ | -------------------------------------------------------------------------------- |
| Ohne Rahmen / Name       | Karte und Titel                                                                  |
| Preise OID               | Der Datenpunkt mit dem JSON-Array                                                |
| Zeitfeld                 | Lassen Sie dieses Feld leer; die üblichen Namen werden automatisch erkannt.      |
| Preisfeld                | Lassen Sie dieses Feld leer; die üblichen Namen werden automatisch erkannt.      |
| Multiplikator            | `100` wandelt €/kWh in Cent pro kWh um. `1` Die Preise bleiben unverändert.       |
| Einheit                  | Wird nach jedem Preis geschrieben, z. B. `ct/kWh`                                 |
| Dezimalzahlen            | Dezimalstellen der Preise                                                        |
| Anzahl der Stunden       | Wie viele Stunden wurden gezeichnet? `0` zeigt alles, was der Datenpunkt enthält. |
| Erst ab jetzt            | Lassen Sie die Stunden aus, die überfällig sind.                                 |
| Aktuellen Preis anzeigen | Der Preis der laufenden Stunde über dem Chart                                    |
| Durchschnitt anzeigen    | Die gestrichelte Linie                                                           |

### Farben

| Feld                                  | Bedeutung                                                                                 |
| ------------------------------------- | ----------------------------------------------------------------------------------------- |
| Hervorhebung                          | Wie günstig und teuer definiert werden, siehe unten.                                      |
| Günstigste Stunden / Teuerste Stunden | Wie viele Stunden benötigt man, um die günstige/teure Farbe zu erhalten (Modus "der n …") |
| Toleranz                              | Prozentuale Abweichung vom Mittelwert (Modalwert „Abstand zum Mittelwert“)                |
| Günstige / Normale / Teure Farbe      | Die drei Farben                                                                           |
| Farbe der aktuellen Stunde            | Die aktuelle Stunde ist wichtiger als die Hervorhebung.                                   |

## Die beiden Hervorhebungsmodi

**Die n günstigsten und teuersten** Stunden werden nach ihrer Häufigkeit geordnet und die ersten n und letzten Stunden farblich markiert. Verwenden Sie dies, um die Frage „Wann sollte der Geschirrspüler heute Abend laufen?“ zu beantworten.

**Abweichungen von den durchschnittlichen** Farben pro Stunde, wenn diese mehr als einen _Toleranzprozentsatz_ unter oder über dem Durchschnitt der angezeigten Stunden liegen, können zur Bestimmung der Abweichung genutzt werden.

**Keiner** der Balken wird in der normalen Farbe dargestellt; die aktuelle Stunde wird weiterhin hervorgehoben.

## Rezept: Wann sollte man das Auto aufladen?

1. _Preise OID_ = das Preisarray Ihres Tarifadapters, _Multiplikator_ =`100`, _Einheit_ =`ct/kWh` Die
2. _Ab sofort_ gilt: _Anzahl der Stunden_ =`12` Die
3. _Hervorhebung_ =`The n cheapest and most expensive` _Günstigste Stunden_ =`4` _Teuerste Stunden_ =`0` Die

Die vier grünen Balken zeigen die vier günstigsten Kurse der nächsten zwölf Stunden an.

## Fehlerbehebung

- **„Keine Preise gefunden.“** Der Datenpunkt ist leer, kein gültiges JSON oder die Datensätze verwenden Feldnamen, die das Widget nicht kennt. Überprüfen Sie den Wert im Objektbrowser und legen Sie die Felder _„Zeit“_ und _„Preis“_ fest.
- **Die Preise sind um den Faktor 100 reduziert.** Ihr Adapter liefert €/kWh, Sie benötigen aber Cent, oder umgekehrt. _Multiplikator_ einstellen.
- **Alle Balken sind grau.** _Hervorhebung_ ist `None` oder, bei „Abstand zum Mittelwert“, ist die _Toleranz_ so groß, dass keine Stunde sie erreicht.
- **Abends ist das Diagramm leer.** _Erst ab jetzt_ werden vergangene Daten ausgeblendet, und die Kurse von morgen werden üblicherweise am frühen Nachmittag veröffentlicht. Sobald keine Daten mehr vorhanden sind, zeigt das Widget wieder alle Daten an.
- **Die aktuelle Stunde ist nicht hervorgehoben.** Der Balken ist nur blau, solange die laufende Stunde im angezeigten Fenster angezeigt wird – _ab jetzt_ ist es die erste Stunde.