---
chapters: {"pages":{"en/adapterref/iobroker.sax-power/README.md":{"title":{"en":"ioBroker.sax-power"},"content":"en/adapterref/iobroker.sax-power/README.md"},"en/adapterref/iobroker.sax-power/docs/OBJECTS.md":{"title":{"en":"ioBroker object structure"},"content":"en/adapterref/iobroker.sax-power/docs/OBJECTS.md"},"en/adapterref/iobroker.sax-power/docs/FIELD_REFERENCE.md":{"title":{"en":"Field reference"},"content":"en/adapterref/iobroker.sax-power/docs/FIELD_REFERENCE.md"},"en/adapterref/iobroker.sax-power/docs/STATISTICS.md":{"title":{"en":"Historical energy statistics"},"content":"en/adapterref/iobroker.sax-power/docs/STATISTICS.md"},"en/adapterref/iobroker.sax-power/docs/BATTERY.md":{"title":{"en":"Battery models, equivalent full cycles and health"},"content":"en/adapterref/iobroker.sax-power/docs/BATTERY.md"},"en/adapterref/iobroker.sax-power/docs/MODBUS.md":{"title":{"en":"Modbus integration roadmap"},"content":"en/adapterref/iobroker.sax-power/docs/MODBUS.md"},"en/adapterref/iobroker.sax-power/docs/API.md":{"title":{"en":"SAX Power Cloud API"},"content":"en/adapterref/iobroker.sax-power/docs/API.md"},"en/adapterref/iobroker.sax-power/docs/ARCHITECTURE.md":{"title":{"en":"Architecture"},"content":"en/adapterref/iobroker.sax-power/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.sax-power/docs/BRANDING.md":{"title":{"en":"Branding and trademarks"},"content":"en/adapterref/iobroker.sax-power/docs/BRANDING.md"},"en/adapterref/iobroker.sax-power/CONTRIBUTING.md":{"title":{"en":"Contributing"},"content":"en/adapterref/iobroker.sax-power/CONTRIBUTING.md"},"en/adapterref/iobroker.sax-power/SECURITY.md":{"title":{"en":"Security policy"},"content":"en/adapterref/iobroker.sax-power/SECURITY.md"},"en/adapterref/iobroker.sax-power/CODE_OF_CONDUCT.md":{"title":{"en":"Code of conduct"},"content":"en/adapterref/iobroker.sax-power/CODE_OF_CONDUCT.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sax-power/docs/OBJECTS.md
title: ioBroker-Objektstruktur
hash: AbIfc6m+QMVoPBZtOHoyJ8+7sCcuP6zKPSxwTR01fdc=
---
# ioBroker-Objektstruktur

## Fortschritte im Batteriezustand

Jede`devices.<serialNumber>.battery.health` Der Kanal legt die Schätzung offen.`value` Verfügbarkeit`status` ,`validRuns` ,`requiredRuns` ,`rejectedRuns` Aktuelle Laufrichtung/Ladezustand/Energie/Zeitstempel, Beginn der Datenerfassung und letzte Auswertung.`progress` Der JSON-Zustand ist der persistente interne Prüfpunkt.`summary.battery.health` Aggregiert die sichtbaren Zähler und das Ergebnis über alle konfigurierten Geräte hinweg.

## Wurzelstruktur

```text
sax-power.0
├── info
├── live
├── devices
│   └── <serialNumber>
│       ├── info
│       ├── live
│       ├── battery
│       └── statistics
│           ├── day
│           ├── week
│           ├── month
│           ├── year
│           └── total
└── summary
    ├── battery
    └── statistics
        ├── info
        ├── day
        ├── week
        ├── month
        ├── year
        └── total
```

`summary` enthält nur installationsweite Werte.`devices.<serialNumber>` Enthält immer die Werte eines einzigen physischen Speichermediums.

## `info`

Die Laufzeitinformationen des Adapters werden unten gespeichert:

```text
info.*
```

Der standardmäßige ioBroker-Verbindungsstatus bleibt der primäre Indikator dafür, ob der Adapter verbunden ist.

Zusätzliche Laufzeitinformationen können Folgendes umfassen:

- letzte Aktualisierung
- letzter Fehler
- diagnostischer Status

## Wurzel`live`

Der Root-Live-Kanal enthält aggregierte Installationswerte:

```text
live
├── pvPower
├── houseConsumptionPower
├── gridPower
├── gridDirection
├── batteryPower
├── batteryDirection
├── soc
├── deviceCount
└── lastUpdate
```

Diese Werte sind für Folgendes vorgesehen:

- das Adapter-Verwaltungs-Dashboard
- VIS
- Skripte
- Grafana oder andere Verlaufs-/Visualisierungsadapter

## `devices`

Jedes erkannte SAX Power-Speichergerät wird durch seine Seriennummer repräsentiert:

```text
devices.<serialNumber>
```

### Geräteinformationen

```text
devices.<serialNumber>.info
```

Typische Staaten sind:

- `name`
- `type`
- `serialNumber`
- `firmware`
- `dataCycle`
- `lastUpdate`

### Geräte-Live-Werte

```text
devices.<serialNumber>.live
```

Staaten:

- `batteryChargePower`
- `batteryDischargePower`
- `batteryPower`
- `batteryDirection`
- `gridImportPower`
- `gridExportPower`
- `gridPower`
- `gridDirection`
- `gridVoltage`
- `pvPower`
- `soc`

Optionale Wolkenfelder bleiben erhalten`null` wenn nicht verfügbar.

## Gerätebatterieanalyse

```text
devices.<serialNumber>.battery
├── model
├── nominalCapacity
├── usableCapacity
├── cycles
│   ├── reported
│   ├── day
│   ├── week
│   ├── month
│   ├── year
│   └── total
├── health
│   ├── value
│   ├── status
│   ├── validRuns
│   ├── requiredRuns
│   ├── rejectedRuns
│   ├── activeRun
│   ├── activeRunDirection
│   ├── activeRunSocStart
│   ├── activeRunSocCurrent
│   ├── activeRunEnergy
│   ├── activeRunStartedAt
│   ├── dataCollectionStartedAt
│   ├── lastEvaluation
│   └── progress
└── info.lastUpdate
```

`cycles.reported` ist das SAX`data_cycle` Wert. Periodenwerte werden berechnet.`health.value` Überreste`null` bis fünf qualifizierte Entladeläufe vorliegen.`progress` ist der persistente interne JSON-Prüfpunkt; alle anderen Gesundheitszustände sind öffentliche, schreibgeschützte Beobachtungen.`activeRun*` beschreibt den aktuell beobachteten Lauf, während`validRuns` ,`requiredRuns` Und`rejectedRuns` Den Auswertungsfortschritt sichtbar machen. Die genaue Formel, die Integrationsmethode, die Validierungsregeln und die Statussemantik finden Sie in [der Datei BATTERY.md](/#/docs/adapterref/iobroker.sax-power/docs/BATTERY.md) .

## Kombinierte Batterieanalyse

```text
summary.battery
├── deviceCount
├── nominalCapacity
├── usableCapacity
├── cycles.<day|week|month|year|total>
├── health.value
├── health.status
├── health.validRuns
├── health.requiredRuns
├── health.rejectedRuns
├── health.activeRun
├── health.activeRunDirection
├── health.activeRunSocStart
├── health.activeRunSocCurrent
├── health.activeRunEnergy
├── health.activeRunStartedAt
├── health.dataCollectionStartedAt
├── health.lastEvaluation
└── info.lastUpdate
```

Die kombinierten Zyklen sind kapazitätsgewichtet und entsprechen nicht der Summe der Gerätezyklusanzahlen. Die zusammenfassenden Gesundheitsindikatoren werden geräteübergreifend summiert. Die Details zu aktiven Läufen sind absichtlich leer oder`mixed` da der Fortschritt für jedes Gerät einzeln überprüft werden muss.`progress` Der Status wird nur unterhalb einzelner Geräte angezeigt. Formeln und Verfügbarkeitsregeln finden Sie in [der Datei BATTERY.md](/#/docs/adapterref/iobroker.sax-power/docs/BATTERY.md) .

## Gerätestatistik

```text
devices.<serialNumber>.statistics.<period>
```

Perioden:

- `day`
- `week`
- `month`
- `year`
- `total`

Jeder Zeitraum enthält:

```text
chargedEnergy
dischargedEnergy
firstTimestamp
lastTimestamp
```

## Aggregierte Statistiken

```text
summary.statistics.<period>
```

Der Baum der zusammenfassenden Statistiken verwendet dieselbe Perioden- und Zustandsstruktur wie jedes Gerät. Die Energiewerte werden über alle erkannten Speichergeräte summiert.

## Statistiken zur Laufzeit

```text
summary.statistics.info
```

Dieser Kanal enthält operative Metadaten für das Verlaufssubsystem, wie z. B. die aktuelle Quelle, die letzte Aktualisierung und den letzten Fehler.

## Technische Zustände entfernt

Die folgenden technischen Zustände werden in der öffentlichen Periodenstruktur der Version 1.0 nicht offengelegt:

```text
samples
source
completeness
```

Vorhandene Objekte aus älteren Entwicklungsversionen werden automatisch entfernt, wenn der Adapter die Periodenobjekte initialisiert.

## Beschreibbare Zustände

Version 1.0 erstellt keine öffentlich beschreibbaren SAX Power- oder Modbus-Steuerungszustände.