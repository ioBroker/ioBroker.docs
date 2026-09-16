---
chapters: {"pages":{"en/adapterref/iobroker.sax-power/README.md":{"title":{"en":"ioBroker.sax-power"},"content":"en/adapterref/iobroker.sax-power/README.md"},"en/adapterref/iobroker.sax-power/docs/OBJECTS.md":{"title":{"en":"ioBroker object structure"},"content":"en/adapterref/iobroker.sax-power/docs/OBJECTS.md"},"en/adapterref/iobroker.sax-power/docs/FIELD_REFERENCE.md":{"title":{"en":"Field reference"},"content":"en/adapterref/iobroker.sax-power/docs/FIELD_REFERENCE.md"},"en/adapterref/iobroker.sax-power/docs/STATISTICS.md":{"title":{"en":"Historical energy statistics"},"content":"en/adapterref/iobroker.sax-power/docs/STATISTICS.md"},"en/adapterref/iobroker.sax-power/docs/BATTERY.md":{"title":{"en":"Battery models, equivalent full cycles and health"},"content":"en/adapterref/iobroker.sax-power/docs/BATTERY.md"},"en/adapterref/iobroker.sax-power/docs/MODBUS.md":{"title":{"en":"Modbus integration roadmap"},"content":"en/adapterref/iobroker.sax-power/docs/MODBUS.md"},"en/adapterref/iobroker.sax-power/docs/API.md":{"title":{"en":"SAX Power Cloud API"},"content":"en/adapterref/iobroker.sax-power/docs/API.md"},"en/adapterref/iobroker.sax-power/docs/ARCHITECTURE.md":{"title":{"en":"Architecture"},"content":"en/adapterref/iobroker.sax-power/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.sax-power/docs/BRANDING.md":{"title":{"en":"Branding and trademarks"},"content":"en/adapterref/iobroker.sax-power/docs/BRANDING.md"},"en/adapterref/iobroker.sax-power/CONTRIBUTING.md":{"title":{"en":"Contributing"},"content":"en/adapterref/iobroker.sax-power/CONTRIBUTING.md"},"en/adapterref/iobroker.sax-power/SECURITY.md":{"title":{"en":"Security policy"},"content":"en/adapterref/iobroker.sax-power/SECURITY.md"},"en/adapterref/iobroker.sax-power/CODE_OF_CONDUCT.md":{"title":{"en":"Code of conduct"},"content":"en/adapterref/iobroker.sax-power/CODE_OF_CONDUCT.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sax-power/docs/STATISTICS.md
title: Historische Energiestatistik
hash: niADyVhHoeLGBdCI/jMlTQ5IWpfKxy3PDx8vtjnG7eY=
---
# Historische Energiestatistik

## Zweck

Der Adapter liefert Lade- und Entladeenergiewerte für die Batterie über sinnvolle, festgelegte Zeiträume.

Es sind Statistiken verfügbar:

- für jedes erkannte Speichergerät
- als Gesamtsumme über alle erkannten Speichergeräte

## Perioden

```text
day
week
month
year
total
```

### Tag

Werte für den aktuellen Kalendertag.

Die SAX Power Cloud-Tagesdiagrammanfrage wird in Version 1.0 nicht direkt verwendet. Die heutigen Werte werden aus der aktuellen Monatsantwort abgeleitet.

### Woche

Die vom SAX Power-Energiediagramm-Endpunkt zurückgegebenen Werte für die aktuelle Woche.

### Monat

Werte für den aktuellen Kalendermonat.

### Jahr

Werte für das laufende Kalenderjahr.

Der erste Zeitstempel wird auf ein ISO-kompatibles Datum normalisiert, z. B.:

```text
2026-01-01
```

### Gesamt

Alle verfügbaren historischen Batterieenergiewerte.

Die ersten und letzten Zeitstempel spiegeln den historischen Bereich wider, der von der SAX Power-Antwort abgedeckt wird.

## Öffentliche Periodenstaaten

Jede Periode offenbart:

```text
chargedEnergy
dischargedEnergy
firstTimestamp
lastTimestamp
```

### `chargedEnergy`

Batterieenergie, die während des ausgewählten Zeitraums geladen wurde, in kWh.

### `dischargedEnergy`

Entladene Batterieenergie während des ausgewählten Zeitraums in kWh.

### `firstTimestamp`

Zunächst wurde eine historische Messung oder ein normalisierter Periodenbeginn einbezogen.

### `lastTimestamp`

Zuletzt wurden auch historische Messungen einbezogen.

## Aggregation

Die Gerätestatistiken sind unten aufgeführt:

```text
devices.<serialNumber>.statistics.<period>
```

Die zusammengefassten Statistiken sind unten aufgeführt:

```text
summary.statistics.<period>
```

Für mehrere Speichergeräte:

- Die geladene Energie wird summiert.
- Die abgegebene Energie wird summiert
- Der früheste gültige erste Zeitstempel wird verwendet.
- Der letzte gültige Zeitstempel wird verwendet.

Die Akku-Zyklusaggregation unterscheidet sich von der Energieaggregation: Die Zyklenzahlen werden niemals summiert. Die kapazitätsgewichtete Formel finden Sie in der [Datei BATTERY.md](/#/docs/adapterref/iobroker.sax-power/docs/BATTERY.md) .

## Interne Quelle

Das Verlaufssubsystem identifiziert seine aktive Quelle unter:

```text
summary.statistics.info.source
```

Für die aktuelle Implementierung handelt es sich um den SAX Power-Energiediagramm-Endpunkt.

Dieser Betriebszustand wiederholt sich nicht innerhalb jeder Periode.

## Technische Werte entfernt

Frühere Entwicklungsversionen offengelegt:

- `samples`
- periodenspezifisch `source`
- `completeness`

Diese Werte sind nicht Teil des öffentlichen Objektmodells der Version 1.0, da sie für die Benutzer nur wenig praktischen Nutzen boten und vermeidbare Fragen aufwarfen.

Vorhandene Objekte werden bei der Objektinitialisierung automatisch entfernt.

## Aktualisierungsverhalten

Die historischen Statistiken laufen unabhängig von der Live-Datenabfrage.

Eine fehlgeschlagene Aktualisierung des Verlaufs:

- Stoppt keine Live-Messungen
- wird im Verlauf/Fehlerzustand protokolliert
- wird beim nächsten geplanten Verlaufslauf erneut versucht.

## Datenbeschränkungen

Der Adapter kann nur den vom SAX Power-Cloud-Dienst zurückgegebenen Verlauf anzeigen.

Mögliche Einschränkungen sind:

- fehlende historische Epochen
- verzögerte Cloud-Updates
- unvollständige erste oder letzte Periode
- Änderungen an undokumentierten Cloud-Antwortformaten

Der Adapter erfindet keine fehlenden Energiewerte.