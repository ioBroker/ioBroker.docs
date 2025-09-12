---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.heizungssteuerung/README.md
title: ioBroker.heizungssteuerung
hash: 2m3mBBpG9Jdf9hmobcyYS54GbWl+7rC6ZwLPYuOOYXQ=
---
# IoBroker.heizungssteuerung
![Logo](../../../en/adapterref/iobroker.heizungssteuerung/admin/heizungssteuerung.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.heizungssteuerung.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.heizungssteuerung.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/jbeenenga/iobroker.heizungssteuerung.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/jbeenenga/ioBroker.heizungssteuerung/badge.svg)
![NPM](https://nodei.co/npm/iobroker.heizungssteuerung.png?downloads=true)

**Tests:** [![Test und Release](https://github.com/jbeenenga/ioBroker.heizungssteuerung/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/jbeenenga/ioBroker.heizungssteuerung/actions/workflows/test-and-release.yml)

## IoBroker Adapter zur Heizungssteuerung
Dieser Adapter bietet umfassendes Heizsystemmanagement für ioBroker-Installationen. Er unterstützt sowohl Heiz- als auch Kühlmodus mit erweiterten Funktionen wie Boost-Modus, Pausenfunktion und zeitbasierter Temperaturplanung.

[🇩🇪 English Version](README_DE.md)

## Merkmale
**Dual-Mode-Unterstützung**: Wechseln Sie zwischen Heiz- und Kühlmodus
- **Wetterbasierte Steuerung**: Automatische Aktivierung/Deaktivierung basierend auf der Außentemperatur
- **Boost-Modus**: Heizen/Kühlen für einzelne Räume vorübergehend erhöhen
- **Pausenmodus**: Heizung/Kühlung für bestimmte Räume vorübergehend deaktivieren
- **Zeitbasierte Planung**: Definieren Sie Temperaturperioden für verschiedene Uhrzeiten und Tage
- **Raumbasierte Steuerung**: Individuelles Temperaturmanagement für jeden Raum
**Feuchtigkeitskontrolle**: Stoppen Sie die Kühlung, wenn die Feuchtigkeitsschwellenwerte erreicht sind
- **Abwesenheitsmodus**: Stellen Sie während der Ferien oder längerer Abwesenheit reduzierte Temperaturen ein
- **Temperaturüberschreibung**: Manuelles Überschreiben der Zieltemperaturen bei Bedarf

## Installation
### Über die ioBroker-Admin-Schnittstelle
1. Öffnen Sie die ioBroker-Admin-Oberfläche
2. Gehen Sie zur Registerkarte „Adapter“
3. Suche nach „heizungssteuerung“
4. Klicken Sie auf „Installieren“

### Über npm
```bash
npm install iobroker.heizungssteuerung
```

## Kurzanleitung
### 1. Raumstruktur einrichten
Bevor Sie den Adapter konfigurieren, müssen Sie Ihre Raumstruktur in ioBroker einrichten:

1. Navigieren Sie zu **Objekte → Enumerationen → Räume**
2. Erstellen Sie Räume für jeden Bereich, den Sie steuern möchten (z. B. „Wohnzimmer“, „Schlafzimmer“, „Küche“)
3. Fügen Sie jedem Raum die folgenden Geräte hinzu:
Temperatursensoren
- Heiz-/Kühlaktoren (Ventile, Schalter usw.)
- Feuchtigkeitssensoren (optional)

### 2. Funktionen konfigurieren
Richten Sie die erforderlichen Funktionen in **Objekte → Enumerationen → Funktionen** ein:

- **Temperatur**: Alle Temperatursensorzustände hinzufügen
- **Feuchtigkeit**: Feuchtigkeitssensorzustände hinzufügen (optional)
- **Engine**: Alle Heiz-/Kühlaktorzustände hinzufügen

### 3. Adapterkonfiguration
#### Grundeinstellungen
- **Betriebsart**: Wählen Sie zwischen „Heizen“ und „Kühlen“
- **Prüfintervall**: Wie oft der Adapter die Temperaturen prüft (in Minuten)
- **Standardtemperatur**: Fallback-Temperatur, wenn kein Zeitraum übereinstimmt
- **Temperaturhysterese**: Temperaturdifferenzschwelle zum Ein-/Ausschalten von Heizung/Kühlung

#### Zeitbasierte Zeiträume
Konfigurieren Sie Temperaturpläne für jeden Raum:

1. Wählen Sie ein Zimmer aus der Dropdown-Liste
2. Start- und Endzeiten festlegen
3. Zieltemperatur festlegen
4. Wählen Sie Wochentage
5. Geben Sie an, ob dieser Zeitraum für den Heiz- oder Kühlbetrieb gilt

#### Erweiterte Einstellungen
- **Pausendauer**: Automatische Rücksetzzeit für den Pausenmodus (Minuten)
- **Boost-Dauer**: Automatische Rücksetzzeit für den Boost-Modus (Minuten)
**Feuchtigkeitsschwelle**: Maximale Luftfeuchtigkeit, bevor die Kühlung stoppt
- **Reset beim Start**: Überschreibt alle Temperaturen mit Standardwerten beim Adapterstart

#### Wetterbasierte Steuerung (optional)
Intelligenten Betrieb basierend auf der Außentemperatur ermöglichen:

- **Wettersteuerung aktivieren**: Wetterbasierte Heiz-/Kühlsteuerung aktivieren
- **Wetterdatenquelle**: Wählen Sie den Staat aus, der Daten zur Außentemperatur enthält
- **Heizschwelle**: Heizung nur aktivieren, wenn die Außentemperatur unter diesem Wert liegt (Standard: 15°C)
- **Kühlschwelle**: Kühlung nur aktivieren, wenn die Außentemperatur über diesem Wert liegt (Standard: 24 °C)

**So funktioniert es:**

- Im Heizbetrieb: Anlage arbeitet nur, wenn Außentemperatur < Grenzwert
- Im Kühlbetrieb: Anlage arbeitet nur, wenn Außentemperatur > Grenzwert
- Hat Vorrang vor allen anderen Einstellungen (Stunden, Boost, Abwesenheit)
- Wenn keine Wetterdaten verfügbar sind, arbeitet das System normal als Fallback

## Verwendung
### Manuelle Steuerungsaktionen
Der Adapter erstellt Aktionsobjekte unter `heizungssteuerung.0.Actions`:

#### Globale Aktionen (Alle Räume)
- **absenceUntil**: Abwesenheitsmodus bis zu einem bestimmten Datum/einer bestimmten Uhrzeit festlegen
- Format: `dd.MM.yyyy HH:mm` (z.B. "01.01.2024 14:00")
- Effekt: Ignoriert Perioden und verwendet die Standardtemperatur
- **Pause**: Alle Heiz-/Kühlvorgänge vorübergehend unterbrechen
- **Boost**: Boost-Modus für alle Räume aktivieren

#### Raumspezifische Aktionen
Für jedes Zimmer finden Sie:

- **Pause**: Heizen/Kühlen nur für diesen Raum pausieren
- **Boost**: Aktiviere den Boost-Modus nur für diesen Raum
- **targetTemp**: Zieltemperatur vorübergehend außer Kraft setzen

### Beispielkonfigurationen
#### Grundlegender Heizplan
```
Room: Living Room
Time: 06:00 - 22:00
Days: Monday to Friday
Temperature: 21°C
Mode: Heating
```

#### Wochenendplan
```
Room: Living Room
Time: 08:00 - 24:00
Days: Saturday, Sunday
Temperature: 22°C
Mode: Heating
```

#### Nachttemperatur
```
Room: Bedroom
Time: 22:00 - 06:00
Days: All days
Temperature: 18°C
Mode: Heating
```

## Konfigurationsbeispiele
### Typische Heimeinrichtung
1. **Wohnbereiche**: 21°C tagsüber, 19°C nachts
2. **Schlafzimmer**: 19°C tagsüber, 16°C nachts
3. **Badezimmer**: 22°C morgens/abends, sonst 19°C
4. **Büro**: 21°C während der Arbeitszeit, sonst 18°C

### Energiespartipps
- Verwenden Sie niedrigere Nachttemperaturen (2-3 °C Reduzierung)
- Stellen Sie Abwesenheitstemperaturen 3-5 °C unter dem Normalwert ein
- Konfigurieren Sie den Boost-Modus für schnelles Aufwärmen anstelle konstant hoher Temperaturen
- Verwenden Sie eine Feuchtigkeitskontrolle, um eine Überkühlung zu verhindern

## Fehlerbehebung
### Häufige Probleme
**Temperaturen ändern sich nicht**

- Überprüfen Sie, ob die Raumaufzählungen richtig konfiguriert sind
- Überprüfen Sie, ob die Temperatursensoren den richtigen Räumen zugewiesen sind
- Stellen Sie sicher, dass sich die Aktoren in der Funktionsaufzählung „Engine“ befinden

**Perioden funktionieren nicht**

- Zeitformat überprüfen (24-Stunden-Format)
- Prüfen, ob Betriebsart mit Periodenkonfiguration übereinstimmt
- Bestätigen Sie die Zimmerauswahl in den Zeitraumeinstellungen

**Feuchtigkeitsregelung funktioniert nicht**

- Fügen Sie Feuchtigkeitssensoren sowohl zu Raum- als auch zu Funktionsaufzählungen hinzu
- Überprüfen Sie die Einstellungen für den Feuchtigkeitsschwellenwert
- Überprüfen Sie, ob die Sensoren aktuelle Daten liefern

### Debug-Informationen
Aktivieren Sie die Debug-Protokollierung in den Adaptereinstellungen, um detaillierte Informationen zu folgenden Themen anzuzeigen:

- Temperaturberechnungen
- Periodenabgleich
- Aktuatorsteuerungsentscheidungen
- Fehlerbedingungen

## Credits
Symbol erstellt von Freepik ([https://www.flaticon.com/de/kostenloses-icon/heizung_1295221](https://www.flaticon.com/de/kostenloses-icon/heizung_1295221))

---

**Unterstützen Sie dieses Projekt** ⭐ Markieren Sie dieses Repository mit einem Stern, wenn Sie es hilfreich finden!

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (jbeenenga) fix invalid state roles according to ioBroker documentation
- (jbeenenga) fix repository checker issues

### 2.1.1 (2025-09-02)
 - (jbeenenga) correct outsite temperature path setting

### 2.1.0 (2025-08-25)

- (jbeenenga) add weather-based heating/cooling control
- (jbeenenga) refactor business logic into service classes
- (jbeenenga) add comprehensive unit tests
- (jbeenenga) update dependencies to latest versions

### 2.0.3 (2025-07-02)

- (jbeenenga) fix absence format issue
- (jbeenenga) fix period matching issue

### 2.0.2 (2025-06-24)

- (jbeenenga) fix build bug

### 2.0.1 (2025-06-24)

- (jbeenenga) fix technical issues

### 2.0.0 (2025-06-18)

- (jbeenenga) update dependencies
- (jbeenenga) add absence mode
- (jbeenenga) fix pause and boost for cooling mode

### 1.7.0 (2023-01-05)

- (jbeenenga) fix bug for end boost or pause mode
- (jbeenenga) provide corrent humidity in temperatures

### 1.6.7 (2022-12-16)

- (jbeenenga) fix date format

### 1.6.5 (2022-12-16)

- (jbeenenga) add possibility to reset temperatures on adapter start

### 1.6.4 (2022-12-16)

- (jbeenenga) add more debug outputs
- (jbeenenga) fixed incorrect period to room mapping

### 1.6.3 (2022-12-15)

- (jbeenenga) removed unnecessary debug output

### 1.6.2 (2022-12-15)

- (jbeenenga) fix for temperature calculation

### 1.5.0 (2022-09-25)

- (jbeenenga) add possibility to overwrite temperature temporarily
- (jbeenenga) add config for temperature offset
- (jbeenenga) add boost and pause function

## License

MIT License

Copyright (c) 2025 jbeenenga [j.beenenga@gmail.com](mailto:j.beenenga@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.