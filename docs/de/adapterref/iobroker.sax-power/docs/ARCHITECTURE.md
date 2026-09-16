---
chapters: {"pages":{"en/adapterref/iobroker.sax-power/README.md":{"title":{"en":"ioBroker.sax-power"},"content":"en/adapterref/iobroker.sax-power/README.md"},"en/adapterref/iobroker.sax-power/docs/OBJECTS.md":{"title":{"en":"ioBroker object structure"},"content":"en/adapterref/iobroker.sax-power/docs/OBJECTS.md"},"en/adapterref/iobroker.sax-power/docs/FIELD_REFERENCE.md":{"title":{"en":"Field reference"},"content":"en/adapterref/iobroker.sax-power/docs/FIELD_REFERENCE.md"},"en/adapterref/iobroker.sax-power/docs/STATISTICS.md":{"title":{"en":"Historical energy statistics"},"content":"en/adapterref/iobroker.sax-power/docs/STATISTICS.md"},"en/adapterref/iobroker.sax-power/docs/BATTERY.md":{"title":{"en":"Battery models, equivalent full cycles and health"},"content":"en/adapterref/iobroker.sax-power/docs/BATTERY.md"},"en/adapterref/iobroker.sax-power/docs/MODBUS.md":{"title":{"en":"Modbus integration roadmap"},"content":"en/adapterref/iobroker.sax-power/docs/MODBUS.md"},"en/adapterref/iobroker.sax-power/docs/API.md":{"title":{"en":"SAX Power Cloud API"},"content":"en/adapterref/iobroker.sax-power/docs/API.md"},"en/adapterref/iobroker.sax-power/docs/ARCHITECTURE.md":{"title":{"en":"Architecture"},"content":"en/adapterref/iobroker.sax-power/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.sax-power/docs/BRANDING.md":{"title":{"en":"Branding and trademarks"},"content":"en/adapterref/iobroker.sax-power/docs/BRANDING.md"},"en/adapterref/iobroker.sax-power/CONTRIBUTING.md":{"title":{"en":"Contributing"},"content":"en/adapterref/iobroker.sax-power/CONTRIBUTING.md"},"en/adapterref/iobroker.sax-power/SECURITY.md":{"title":{"en":"Security policy"},"content":"en/adapterref/iobroker.sax-power/SECURITY.md"},"en/adapterref/iobroker.sax-power/CODE_OF_CONDUCT.md":{"title":{"en":"Code of conduct"},"content":"en/adapterref/iobroker.sax-power/CODE_OF_CONDUCT.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sax-power/docs/ARCHITECTURE.md
title: Architektur
hash: UJIlPetw17FicA5Xfts/pWCaE8beno8SgMyNIzSRMzI=
---
# Architektur

## Überblick

Der Adapter ist unterteilt in einen Cloud-Client, Parser, Zustandsmaschinen, Laufzeitplanung und eine React-basierte Verwaltungsschnittstelle.

```text
SAX Power Cloud
      │
      ▼
SaxPowerApiClient
      │
      ├── live data
      └── energy chart history
      │
      ▼
Parsers
      │
      ├── SaxPowerParser
      └── SaxPowerHistoryParser
      │
      ▼
State engines
      │
      ├── StateEngine
      └── StatisticsStateEngine
      │
      ▼
ioBroker object database
      │
      ▼
React administration interface
```

## Laufzeitablauf

1. Der Adapter überprüft seine Konfiguration.
2. Es authentifiziert sich gegenüber der SAX Power Cloud.
3. Es erkennt alle dem Konto zugewiesenen Speichergeräte.
4. Es fordert aktuelle Live-Daten im konfigurierten Abfrageintervall an.
5. Es normalisiert Cloud-Werte in ein stabiles internes Gerätemodell.
6. Es schreibt gerätespezifische Zustände.
7. Es schreibt aggregierte Root-Live-Zustände.
8. Es aktualisiert historische Statistiken im entsprechenden Verlaufskalender.
9. Die Administrationsschnittstelle liest ioBroker-Zustände über den vorhandenen ioBroker-Admin-Socket.

## Cloud-Abfrage

Das minimal unterstützte Intervall beträgt 60 Sekunden.

Das Administrations-Dashboard aktualisiert die angezeigten ioBroker-Status häufiger, dies verursacht jedoch **keine** zusätzlichen Cloud-Anfragen. Der Cloud-Abfrageplan und der Aktualisierungsplan der Benutzeroberfläche sind unabhängig voneinander.

## Gerätespezifisches Zustandsmodell

Die erkannten Speichergeräte werden im Folgenden dargestellt:

```text
devices.<serialNumber>
```

Der Gerätebaum enthält:

- statische und sich langsam ändernde Informationen
- Aktuelle Live-Messungen
- historische Statistiken

## Aggregiertes Live-Modell

Der Adapter schreibt die kombinierten Live-Werte unten aus:

```text
live
```

Aggregationsregeln:

- Batterieleistung: Summe aller verfügbaren Batterieleistungswerte
- Ladezustand: arithmetisches Mittel aller verfügbaren Speicherladewerte
- PV-Leistung: erster verfügbarer Wert auf Anlagenebene
- Netzstrom: erster verfügbarer Wert auf Installationsebene
- Hausverbrauch: wird nur berechnet, wenn PV-, Netz- und Batteriestrom vollständig verfügbar sind.

PV- und Netzwerte werden als Messungen auf Anlagenebene behandelt, da die SAX Power Cloud für mehrere Speichergeräte denselben Wert liefern kann. Sie werden daher nicht summiert.

## Konvention für Stromzeichen

Das normalisierte Modell verwendet:

### Netzstrom

- positiv: Grid-Import
- negativ: Netzexport
- Null: Leerlauf

### Batteriebetrieb

- Positiv: Batterieentladung
- Negativ: Batterieladung
- Null: Leerlauf

Der Haushaltsverbrauch wird wie folgt berechnet:

```text
houseConsumptionPower =
    pvPower + gridPower + batteryPower
```

Das Ergebnis ist auf mindestens Null begrenzt. Falls eine erforderliche Eingabe nicht verfügbar ist, wird der berechnete Wert gespeichert als`null` Die

## Historische Statistiken

Der Statistikparser normalisiert die Antworten der Energiediagramme in fünf Perioden:

- Tag
- Woche
- Monat
- Jahr
- gesamt

Statistiken werden geschrieben:

- unterhalb jedes Geräts
- unterhalb des Adapter-Roots als Aggregat über alle Geräte

## Administrationsschnittstelle

Der Adapter verwendet eine benutzerdefinierte React-Verwaltungsschnittstelle, die auf dem ioBroker React-Adapter-Framework und Material UI basiert.

Die Benutzeroberfläche:

- folgt dem hellen oder dunklen Design von ioBroker
- hat keinen separaten Designschalter
- reagiert
- unterstützt das Scrollen auf kleineren Bildschirmen
- Liest Laufzeitwerte aus ioBroker-Zuständen
- Kommuniziert niemals direkt mit der SAX Power Cloud

## Fehlerbehandlung

Der Adapter trennt:

- Konfigurationsfehler
- Authentifizierungsfehler
- Live-Abfragefehler
- Fehler bei der historischen Abfrage
- Parsingfehler

Sensible Informationen wie Passwörter und Bearer-Token dürfen niemals in Protokolldateien geschrieben werden.

## Grenzen der Version 1.0

Version 1.0 ist bezüglich SAX Power und Modbus schreibgeschützt.

Folgende Elemente sind noch nicht Teil der Laufzeitarchitektur:

- beschreibbare Steuerungszustände
- Ladesteuerungslogik
- Modbus-Schreibvorgänge
- konfigurierbare Automatisierungsabhängigkeiten