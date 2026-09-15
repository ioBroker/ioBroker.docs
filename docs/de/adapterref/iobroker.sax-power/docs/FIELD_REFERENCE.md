---
chapters: {"pages":{"en/adapterref/iobroker.sax-power/README.md":{"title":{"en":"ioBroker.sax-power"},"content":"en/adapterref/iobroker.sax-power/README.md"},"en/adapterref/iobroker.sax-power/docs/OBJECTS.md":{"title":{"en":"ioBroker object structure"},"content":"en/adapterref/iobroker.sax-power/docs/OBJECTS.md"},"en/adapterref/iobroker.sax-power/docs/FIELD_REFERENCE.md":{"title":{"en":"Field reference"},"content":"en/adapterref/iobroker.sax-power/docs/FIELD_REFERENCE.md"},"en/adapterref/iobroker.sax-power/docs/STATISTICS.md":{"title":{"en":"Historical energy statistics"},"content":"en/adapterref/iobroker.sax-power/docs/STATISTICS.md"},"en/adapterref/iobroker.sax-power/docs/BATTERY.md":{"title":{"en":"Battery models, equivalent full cycles and health"},"content":"en/adapterref/iobroker.sax-power/docs/BATTERY.md"},"en/adapterref/iobroker.sax-power/docs/MODBUS.md":{"title":{"en":"Modbus integration roadmap"},"content":"en/adapterref/iobroker.sax-power/docs/MODBUS.md"},"en/adapterref/iobroker.sax-power/docs/API.md":{"title":{"en":"SAX Power Cloud API"},"content":"en/adapterref/iobroker.sax-power/docs/API.md"},"en/adapterref/iobroker.sax-power/docs/ARCHITECTURE.md":{"title":{"en":"Architecture"},"content":"en/adapterref/iobroker.sax-power/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.sax-power/docs/BRANDING.md":{"title":{"en":"Branding and trademarks"},"content":"en/adapterref/iobroker.sax-power/docs/BRANDING.md"},"en/adapterref/iobroker.sax-power/CONTRIBUTING.md":{"title":{"en":"Contributing"},"content":"en/adapterref/iobroker.sax-power/CONTRIBUTING.md"},"en/adapterref/iobroker.sax-power/SECURITY.md":{"title":{"en":"Security policy"},"content":"en/adapterref/iobroker.sax-power/SECURITY.md"},"en/adapterref/iobroker.sax-power/CODE_OF_CONDUCT.md":{"title":{"en":"Code of conduct"},"content":"en/adapterref/iobroker.sax-power/CODE_OF_CONDUCT.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sax-power/docs/FIELD_REFERENCE.md
title: Feldreferenz
hash: IE/tkFj4hvW6pybM2x4JgivwLSxu9+v1yoPjcVMhs6c=
---
# Feldreferenz

## Allgemeine Regeln

- Leistungswerte werden in Watt angegeben (`W` ).
- Energiewerte werden in Kilowattstunden angegeben (`kWh` ).
- Der Staat verwendet Prozent (`%` ).
- Die Zeitstempel werden im ISO-kompatiblen Format gespeichert.
- Fehlende optionale Messwerte werden wie folgt dargestellt:`null` Die
- Unbekannte Werte werden nicht auf Null gesetzt.

## Geräteinformationen

Typische Pfade:

```text
devices.<serialNumber>.info.*
```

| Zustand        |                Typ | Beschreibung                                 |
| -------------- | -----------------: | -------------------------------------------- |
| `name`         |       Zeichenkette | Vom Cloud-Anbieter gemeldeter Gerätename     |
| `type`         |       Zeichenkette | Geräte- oder Speichertyp                     |
| `serialNumber` |       Zeichenkette | SAX Power Seriennummer                       |
| `firmware`     |       Zeichenkette | Gemeldete Firmware-Version                   |
| `dataCycle`    |             Nummer | Gemeldeter Datenzyklus, sofern verfügbar     |
| `lastUpdate`   | Zeichenkette/Datum | Letzte Aktualisierung für das Gerät gemeldet |

Welche Informationen genau verfügbar sind, hängt von der Antwort der Cloud ab.

## Geräte-Live-Werte

Typische Pfade:

```text
devices.<serialNumber>.live.*
```

| Zustand                 | Einheit | Bedeutung                                                 |
| ----------------------- | ------: | --------------------------------------------------------- |
| `batteryChargePower`    |       W | Positiver Betrag der aktuellen Batterieladeleistung       |
| `batteryDischargePower` |       W | Positiver Betrag der aktuellen Batterieentladeleistung    |
| `batteryPower`          |       W | Signierte Batterieleistung                                |
| `batteryDirection`      |    Text | `charging` ,`discharging` , oder `idle`                   |
| `gridImportPower`       |       W | Positive Größe des Netzimports                            |
| `gridExportPower`       |       W | Positive Größe des Netzexports                            |
| `gridPower`             |       W | Signierte Netzleistung                                    |
| `gridDirection`         |    Text | `import` ,`export` , oder `idle`                          |
| `gridVoltage`           |       V | Netzspannung                                              |
| `pvPower`               |       W | PV-Produktion, wenn sie von der Wolke bereitgestellt wird |
| `soc`                   |       % | Anklagepunkt                                              |

### Batterieleistungsanzeige

- negativ: Aufladung
- positiv: Entladung
- Null: Leerlauf

### Netzstromzeichen

- negativ: Export
- positiv: Import
- Null: Leerlauf

## Aggregierte Root-Live-Werte

Pfade:

```text
live.*
```

| Zustand                 |    Einheit | Bedeutung                                                 |
| ----------------------- | ---------: | --------------------------------------------------------- |
| `pvPower`               |          W | Erster verfügbarer PV-Wert auf Installationsebene         |
| `houseConsumptionPower` |          W | Berechneter Hausverbrauch                                 |
| `gridPower`             |          W | Erster verfügbarer Netzwert auf Installationsebene        |
| `gridDirection`         |       Text | `import` ,`export` , oder `idle`                          |
| `batteryPower`          |          W | Summe aller verfügbaren Speicherbatterie-Leistungswerte   |
| `batteryDirection`      |       Text | Richtung abgeleitet von der kombinierten Batterieleistung |
| `soc`                   |          % | Arithmetisches Mittel der verfügbaren Speicher-SOC-Werte  |
| `deviceCount`           |     Nummer | Anzahl der erkannten Speichergeräte                       |
| `lastUpdate`            | Datum/Text | Letzte erfolgreiche Live-Aggregation                      |

## Berechnung des Hausverbrauchs

```text
houseConsumptionPower =
    pvPower + gridPower + batteryPower
```

Die Berechnung wird nur durchgeführt, wenn alle drei Werte vorliegen.

Wann`pvPower` ist nicht verfügbar:

- `live.pvPower` Überreste`null`
- `live.houseConsumptionPower` Überreste`null`
- Die Verwaltungsschnittstelle zeigt „Nicht verfügbar“ an.

## Statistiken

Periodenpfade:

```text
summary.statistics.<period>.*
devices.<serialNumber>.statistics.<period>.*
```

Unterstützte Periodennamen:

- `day`
- `week`
- `month`
- `year`
- `total`

Öffentliche Staaten:

| Zustand            | Einheit | Bedeutung                                               |
| ------------------ | ------: | ------------------------------------------------------- |
| `chargedEnergy`    |     kWh | Die Batterieenergie wurde in diesem Zeitraum geladen.   |
| `dischargedEnergy` |     kWh | im Zeitraum entladene Batterieenergie                   |
| `firstTimestamp`   |   Datum | Zunächst wurde der historische Wert berücksichtigt.     |
| `lastTimestamp`    |   Datum | Zuletzt wurde auch der historische Wert berücksichtigt. |

Die folgenden ehemaligen technischen Felder sind nicht Teil des öffentlichen Objektmodells Version 1.0:

- `samples`
- pro Periode `source`
- `completeness`

## Statistikinformationen

Der Adapter kann unter folgenden Bedingungen Betriebsinformationen offenlegen:

```text
summary.statistics.info.*
```

Dies umfasst Statusinformationen wie:

- aktive historische Quelle
- letzte Statistikaktualisierung
- letzter Verlaufsfehler

Diese Zustände beschreiben den Betrieb des Adapters und sind von den öffentlichen Periodenwerten getrennt.

## Batterieanalyse

| Zustand                                                   |         Einheit | Bedeutung                                                                                                    |
| --------------------------------------------------------- | --------------: | ------------------------------------------------------------------------------------------------------------ |
| `devices.<serial>.battery.model`                          |            Text | Konfigurierter Modellname oder `notConfigured`                                                               |
| `devices.<serial>.battery.nominalCapacity`                |             kWh | Nennkapazität, die von der EFC-Formel verwendet wird                                                         |
| `devices.<serial>.battery.usableCapacity`                 |             kWh | Die nutzbare Wechselstromkapazität bleibt für spätere Funktionen erhalten                                    |
| `devices.<serial>.battery.cycles.reported`                |          Zyklen | Unverändertes SAX-Live-Feld `data_cycle`                                                                     |
| `devices.<serial>.battery.cycles.<period>`                |          Zyklen | Lokal berechnete äquivalente Vollzyklen                                                                      |
| `summary.battery.cycles.<period>`                         |          Zyklen | Kapazitätsgewichteter kombinierter EFC                                                                       |
| `devices.<serial>.battery.health.value`                   |               % | Mittlere geschätzte Kapazität der Klimaanlagenseite nach fünf qualifizierten Entladungen; andernfalls `null` |
| `summary.battery.health.value`                            |               % | Kombinierte Schätzung, wenn jedes konfigurierte Gerät ein Ergebnis hat                                       |
| `devices.<serial>.battery.health.status`                  |            Text | `collectingData` ,`insufficientData` oder `available`                                                        |
| `summary.battery.health.status`                           |            Text | Kombinierter Verfügbarkeitsstatus                                                                            |
| `devices.<serial>.battery.health.validRuns`               |          zählen | Qualifizierte Entladevorgänge                                                                                |
| `devices.<serial>.battery.health.requiredRuns`            |          zählen | Erforderliche qualifizierte Läufe, derzeit 5                                                                 |
| `devices.<serial>.battery.health.rejectedRuns`            |          zählen | Kurze, unterbrochene oder unplausible abgeschlossene Läufe                                                   |
| `devices.<serial>.battery.health.activeRun`               |            Text | `active` während eines Lade- oder Entladevorgangs; andernfalls `idle`                                        |
| `devices.<serial>.battery.health.activeRunDirection`      |            Text | `charging`,`discharging` oder `idle`                                                                         |
| `devices.<serial>.battery.health.activeRunSocStart`       |               % | SOC zu Beginn des aktiven Laufs                                                                              |
| `devices.<serial>.battery.health.activeRunSocCurrent`     |               % | Zuletzt beobachteter SOC des aktiven Laufs                                                                   |
| `devices.<serial>.battery.health.activeRunEnergy`         |             kWh | Während des aktiven Laufs wurde Energie aus der Batterieleistung integriert.                                 |
| `devices.<serial>.battery.health.activeRunStartedAt`      | ISO-Zeitstempel | Start des aktiven Laufs                                                                                      |
| `devices.<serial>.battery.health.dataCollectionStartedAt` | ISO-Zeitstempel | Beginn der kontinuierlichen Erfassung von Gesundheitsdaten                                                   |
| `devices.<serial>.battery.health.lastEvaluation`          | ISO-Zeitstempel | Zeitpunkt, zu dem der letzte abgeschlossene Lauf akzeptiert oder abgelehnt wurde                             |
| `devices.<serial>.battery.health.progress`                |            JSON | Interner, persistenter Tracker-Checkpoint; nicht bearbeiten                                                  |
| `summary.battery.health.validRuns`                        |          zählen | Summe der gültigen Durchläufe auf allen konfigurierten Geräten                                               |
| `summary.battery.health.requiredRuns`                     |          zählen | Summe der erforderlichen Durchläufe auf allen konfigurierten Geräten                                         |
| `summary.battery.health.rejectedRuns`                     |          zählen | Summe der abgelehnten Durchläufe über alle konfigurierten Geräte                                             |
| `summary.battery.health.activeRun`                        |            Text | `active` wenn ein Gerät gerade aktiv ausgeführt wird; andernfalls `idle`                                     |
| `summary.battery.health.activeRunDirection`               |            Text | `mixed` ; Gerätezustände auf die tatsächliche Richtung prüfen                                                |
| `summary.battery.health.activeRunSocStart`                |               % | Stets`null` Der Fortschritt bei SoCs ist gerätespezifisch.                                                   |
| `summary.battery.health.activeRunSocCurrent`              |               % | Stets`null` Der Fortschritt bei SoCs ist gerätespezifisch.                                                   |
| `summary.battery.health.activeRunEnergy`                  |             kWh | Stets`null` Der Energiefortschritt ist gerätespezifisch                                                      |
| `summary.battery.health.activeRunStartedAt`               | ISO-Zeitstempel | Leer; Startzeit ist gerätespezifisch                                                                         |
| `summary.battery.health.dataCollectionStartedAt`          | ISO-Zeitstempel | Frühester Erfassungsbeginn auf allen konfigurierten Geräten                                                  |
| `summary.battery.health.lastEvaluation`                   | ISO-Zeitstempel | Die letzte Auswertung über alle konfigurierten Geräte hinweg                                                 |

Die vollständigen Formeln, die Modelltabelle, die Quellenunterscheidung, die Aggregation mehrerer Geräte und die Einschränkungen sind in [BATTERY.md](/#/docs/adapterref/iobroker.sax-power/docs/BATTERY.md) dokumentiert.