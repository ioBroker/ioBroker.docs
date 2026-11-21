---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.energypriceforecast/README.md
title: ioBroker.energypriceforecast
hash: Sczh/9VEn8KFTH5v/wF+Y7HjRQoUsjh6z6hDRMmAO0k=
---
![Logo](../../../en/adapterref/iobroker.energypriceforecast/admin/energypriceforecast.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.energypriceforecast.svg)
![Test und Freigabe](https://github.com/BackupBaTTerY/ioBroker.energypriceforecast/workflows/Test%20and%20Release/badge.svg)

# ioBroker.energypriceforecast

## Energiepreisprognose EU-Adapter für ioBroker

Strompreis- und CO2-Prognose für 37 europäische Gebotszonen von [energypriceforecast.eu](https://energypriceforecast.eu/) .

Die Tagespreise werden nur für den Folgetag veröffentlicht. Dieser Adapter setzt die Reihe mit einer Prognose von bis zu 120 Stunden fort, sodass ein Fahrzeugautomat bereits heute entscheiden kann, ob es heute Nacht geladen oder auf die günstigeren Stunden von morgen gewartet wird. Für jeden Markt wird außerdem die CO₂-Intensität des Stromnetzes angezeigt.

Was Sie erhalten:

- der aktuelle Preis und die CO2-Intensität
- das günstigste und umweltfreundlichste Zeitfenster einer von Ihnen gewählten Länge (z. B. die 3 Stunden, die Ihr Geschirrspüler läuft), mit einer Flagge, die `true` während das Fenster läuft
- eine kombinierte Punktzahl, die die aktuelle Stunde mit den kommenden 24 Stunden vergleicht.
- Die gesamte Kursreihe in 15-Minuten-Intervallen als JSON, für Diagramme und Ihre eigene Logik
- Wie gut die Vorhersage in den letzten 30 Tagen war, damit Sie entscheiden können, wie sehr Sie ihr vertrauen können.

Die gesamte Berechnung erfolgt auf dem Server. Der Adapter fragt Zustände ab, erfasst sie und schreibt sie.

### Märkte

AT, BE, BG, CH, CZ, DE, DK1, DK2, ES, FI, FR, GB, GR, HR, HU, die sieben italienischen Zonen (NORD, CNOR, CSUD, SUD, CALA, SICI, SARD), NL, NO1–NO5, PL, PT, RO, SE1–SE4, SI, SK.

Kroatien (HR) verfügt noch über keine veröffentlichte Day-Ahead-Quelle, daher basieren die Preise – wie in der Slowakei – stets auf Prognosen. In neu hinzugekommenen Märkten bleiben die Statuswerte für CO₂ und Prognosequalität leer, bis die API diese liefert; ein leerer Statuswert entspricht nicht null.

Die Preise werden in der jeweiligen Marktwährung pro kWh angegeben, wie sie von der API gemeldet werden (EUR, DKK, NOK, SEK, GBP usw.). Standardmäßig handelt es sich um Großhandelspreise; den tatsächlichen [Preis für Sie finden Sie unter „Haushaltspreis“](#household-price) .

### Großbritannien (GB, Beta)

Wählen Sie GB in den Instanzeinstellungen. Die Preisangaben verwenden `GBP/kWh` 0,10 bedeutet 10 Pence/kWh, nicht 0,10 Pence/kWh. GB sind stündliche Großhandelsdaten, nicht der exakte halbstündliche Agile-Tarif. Die Viertelstundenausgabe wiederholt den Stundenpreis und berücksichtigt keine gemessenen Halbstundendaten. Es gibt keine GB-Haushaltspreisschätzung. Eigene Tarifformeln verwenden Zuschläge in GBP/kWh. Die Qualität ist erst verfügbar, wenn genügend historische Daten gesammelt wurden; ein leerer Qualitätsstatus bedeutet keinen Fehler von null.

## Konfiguration

| Einstellung              | Bedeutung                                                                                           |
| ------------------------ | --------------------------------------------------------------------------------------------------- |
| Markt                    | Gebotszone. Deutschland und Luxemburg teilen sich eine Zone.                                        |
| Prognosehorizont         | 24, 48, 72 oder 120 Stunden. Der öffentliche Zugang ist bis zu 48 Stunden möglich.                  |
| Fensterlänge             | Stunden, die das günstigste und umweltfreundlichste Zeitfenster abdecken sollte: 1–24.              |
| Aktualisierungsintervall | 15–120 Minuten, Standard 30 Minuten. Die Preise ändern sich höchstens alle 15 Minuten.              |
| Preise anzeigen          | Großhandelspreis, geschätzter Haushaltspreis oder eigener Tarif siehe unten.                        |
| Postleitzahl             | Für die Kostenschätzung in Deutschland (erforderlich) und den Niederlanden (optional).              |
| Faktor, Zuschlag         | Für den eigenen Tarif.                                                                              |
| API-Schlüssel            | Optional. Nur für einen Zeithorizont von mehr als 48 Stunden erforderlich. Verschlüsselt speichern. |

## Haushaltspreis

Der Wechselkurs ist nur ein Teil der Rechnung. Drei Einstellungen bestimmen, was in den Preisangaben angezeigt wird:

| Einstellung                   | Was die Preisangaben beinhalten                                                                                                                                                | Märkte                        |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------- |
| Großhandelspreis              | Tagespreis und Prognose, ohne Gebühren oder Steuern                                                                                                                            | alle                          |
| Schätzung der Haushaltspreise | Großhandelspreis + Lieferantenaufschlag + Netzentgelt + Abgaben, dann Mehrwertsteuer. In Deutschland wird das Netzentgelt vom Netzbetreiber anhand Ihrer Postleitzahl erhoben. | DE, AT, NL, DK1, DK2, NO1–NO5 |
| Eigener Tarif                 | Großhandelspreis × Faktor + Zuschlag, mit Ihren eigenen Zahlen                                                                                                                 | alle                          |

Für Ihren eigenen Tarif nehmen Sie Ihren Vertrag zur Hand: Der Faktor beträgt üblicherweise 1 + MwSt. (1,19 in Deutschland). Der Aufschlag umfasst alle Kosten, die Ihr Anbieter pro kWh zusätzlich zum Börsenpreis berechnet, inklusive MwSt. – Netzentgelt, Abgaben und Marge. Beispiel für einen dynamischen Tarif in Deutschland mit einem Aufschlag von 20 ct/kWh: Faktor `1.19` Zuschlag `0.20` Die

In beiden Fällen bleibt das günstigste Zeitfenster gleich, da jede Stunde denselben Aufschlag erhält; lediglich die Beträge ändern sich. Feste monatliche Gebühren werden nie berücksichtigt, und die Prognosequalität basiert stets auf dem Großhandelspreis. Eine Einstellung, die nicht funktioniert (z. B. die deutsche Schätzung ohne Postleitzahl), greift auf den Großhandelspreis zurück und vermerkt dies im Protokoll.

## Staaten

| Zustand                                                                                                    | Bedeutung                                                                                                                                 |
| ---------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `price.current`                                                                                            | Preis des aktuellen Slots                                                                                                                 |
| `price.currentSource`                                                                                      | `day_ahead` (veröffentlicht) oder `forecast`                                                                                               |
| `price.bestWindow.start` /`.end`                                                                           | Günstigstes Zeitfenster am Horizont (ISO 8601, UTC)                                                                                       |
| `price.bestWindow.average`                                                                                 | Durchschnittspreis in diesem Zeitraum                                                                                                     |
| `price.bestWindow.active`                                                                                  | `true` während das günstigste Fenster läuft                                                                                               |
| `price.bestWindow.remainingMinutes`                                                                        | Noch wenige Minuten bis zum Ablauf, ansonsten `0`                                                                                         |
| `price.bestWindow.status`                                                                                  | `upcoming`, `active` oder `passed`                                                                                                         |
| `co2.current`, `co2.bestWindow.*`                                                                          | Gleiches gilt für die CO2-Intensität (gCO2/kWh).                                                                                          |
| `combined.scoreNow`                                                                                        | Anteil der kommenden 24 Stunden, die hinsichtlich Preis und CO2-Emissionen schlechter sind als jetzt; 100 = jetzt ist der beste Zeitpunkt |
| `combined.bestWindow.start` /`.end`                                                                        | Der beste Kompromiss zwischen günstig und sauber                                                                                          |
| `forecast.json`                                                                                            | Preisreihe als `[{start, end, value, source}]` in 15-Minuten-Slots                                                                         |
| `forecast.lastDayAheadSlot`                                                                                | Wo die veröffentlichten Preise enden und die Prognose beginnt                                                                             |
| `forecast.end`                                                                                             | Ende der Serie                                                                                                                            |
| `quality.windowExactHitDays` /`.windowEvaluatedDays`                                                       | Tage der letzten 30 Tage, an denen die Prognose genau das günstigste Fenster ermittelt hat                                                |
| `quality.windowWithinOneHourDays`                                                                          | An Tagen, an denen es höchstens eine Stunde ausfiel                                                                                       |
| `quality.windowMeanExtraCost`                                                                              | Was kostete nach Ablauf des Prognosezeitraums im Durchschnitt im Vergleich zum tatsächlich günstigsten Angebot?                           |
| `quality.hourlyMeanAbsError`, `quality.hourlyCorrelation`                                                  | Stündliche Genauigkeit über 30 Tage                                                                                                       |
| `retail.basis`                                                                                             | `base`, `estimate` oder `formula` - was die Preisangaben beinhalten                                                                         |
| `retail.gridArea`, `retail.gridFee`, `retail.supplierMarkup`, `retail.leviesAndTaxes`, `retail.vatPercent` | Woraus die Schätzung basiert (ct/kWh, øre/kWh in DK und NO); nur mit der Schätzung                                                        |
| `retail.factor`, `retail.surcharge`                                                                        | Ihr eigener Tarif; nur mit dem eigenen Tarif                                                                                              |
| `info.connection`                                                                                          | Letzte Aktualisierung erfolgreich                                                                                                         |
| `info.apiKeyState`                                                                                         | `missing` für die Öffentlichkeit zugänglich, `valid` mit einem Schlüssel, sonst warum wurde der Schlüssel verweigert?                      |

Die Prognosewerte für eine ganze Stunde werden über ihre vier Viertel wiederholt, niemals interpoliert: Das Modell prognostiziert Stunden, und die Erfindung von Werten dazwischen würde verändern, was eine Automatisierung sieht.

## Beispiel: Starten Sie den Geschirrspüler im günstigsten Fenster.

```js
on({ id: 'energypriceforecast.0.price.bestWindow.active', val: true }, () => {
    setState('shelly.0.dishwasher.Relay0.Switch', true);
});
```

## Rückmeldung

Der Adapter befindet sich in der Testphase. Feedback wird im [offiziellen ioBroker-Tester-Thread](https://forum.iobroker.net/topic/85729/test-adapter-energypriceforecast.eu-v0.1.x) (deutsch) gesammelt; Fehler sollten am besten als [GitHub-Issue](https://github.com/BackupBaTTerY/ioBroker.energypriceforecast/issues) gemeldet werden.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.1.4 (2026-11-20)

- Hungary (HU), Slovenia (SI) and Croatia (HR) as new markets

### 0.1.3 (2026-10-31)

- Great Britain (GB, beta): hourly wholesale prices in GBP/kWh, own tariff with surcharges in GBP/kWh
- README in English only
- Updated test tooling (`@iobroker/testing` 6.3)

### 0.1.2 (2026-10-05)

- State and channel names in all eleven admin languages
- The retail component states only exist for the price basis in use; switching the basis removes the others
- `remainingMinutes` is 0 outside a window and `active` is `false` when there is no window, instead of empty values

Older releases are documented in CHANGELOG_OLD.md.

## License

MIT License

Copyright (c) 2026 BackupBaTTerY <StrompreisVorhersage@proton.me>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.