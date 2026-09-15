---
chapters: {"pages":{"en/adapterref/iobroker.heizungssteuerung/README.md":{"title":{"en":"ioBroker.heizungssteuerung"},"content":"en/adapterref/iobroker.heizungssteuerung/README.md"},"en/adapterref/iobroker.heizungssteuerung/README_DE.md":{"title":{"en":"ioBroker.heizungssteuerung"},"content":"en/adapterref/iobroker.heizungssteuerung/README_DE.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.heizungssteuerung/README.md
title: ioBroker.Heizungssteuerung
hash: wDUNR9HifMy+O3Dz+fFKcxzdl727S3ZfwpgM38V3Kls=
---
# ioBroker.Heizungssteuerung

![NPM-Version](https://img.shields.io/npm/v/iobroker.heizungssteuerung.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.heizungssteuerung.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/jbeenenga/iobroker.heizungssteuerung.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/jbeenenga/ioBroker.heizungssteuerung/badge.svg)
![NPM](https://nodei.co/npm/iobroker.heizungssteuerung.png?downloads=true)
![Test und Freigabe](https://github.com/jbeenenga/ioBroker.heizungssteuerung/actions/workflows/test-and-release.yml/badge.svg)

![Logo](../../../en/adapterref/iobroker.heizungssteuerung/admin/heizungssteuerung.png)

## ioBroker-Adapter für die Heizungssteuerung

Dieser Adapter ermöglicht die umfassende Verwaltung von Heizungsanlagen für ioBroker-Installationen. Er unterstützt sowohl Heiz- als auch Kühlbetrieb mit erweiterten Funktionen wie Boost-Modus, Pausenfunktion und zeitbasierter Temperaturplanung.

[🇩🇪 Deutsche Version](/#/docs/adapterref/iobroker.heizungssteuerung/README_DE.md)

## Merkmale

- **Dual-Modus-Unterstützung** : Umschalten zwischen Heiz- und Kühlmodus
- **Wetterbasierte Steuerung** : Automatische Aktivierung/Deaktivierung je nach Außentemperatur
- **Boost-Modus** : Erhöht vorübergehend die Heizung/Kühlung einzelner Räume
- **Pausenmodus** : Heizung/Kühlung für bestimmte Räume vorübergehend deaktivieren
- **Zeitbasierte Planung** : Temperaturperioden für verschiedene Zeiten und Tage definieren.
- **Raumbasierte Steuerung** : Individuelle Temperaturregelung für jeden Raum
- **Feuchtigkeitsregelung** : Kühlung wird gestoppt, sobald die festgelegten Feuchtigkeitsschwellenwerte erreicht sind.
- **Abwesenheitsmodus** : Reduzierte Temperaturen während Urlaubszeiten oder längerer Abwesenheit einstellen
- **Temperaturüberschreibung** : Zieltemperaturen bei Bedarf manuell überschreiben

## Installation

### Über die ioBroker-Admin-Oberfläche

1. ioBroker-Admin-Oberfläche öffnen
2. Wechseln Sie zum Tab „Adapter“.
3. Suche nach „heizungssteuerung“
4. Klicken Sie auf „Installieren“.

### Über npm

```bash
npm install iobroker.heizungssteuerung
```

## Schnellstartanleitung

### 1. Raumstruktur einrichten

Bevor Sie den Adapter konfigurieren, müssen Sie Ihre Raumstruktur in ioBroker einrichten:

1. Navigieren Sie zu **Objekte → Aufzählungen → Räume**
2. Erstellen Sie Räume für jeden Bereich, den Sie steuern möchten (z. B. „Wohnzimmer“, „Schlafzimmer“, „Küche“).
3. Fügen Sie jedem Raum die folgenden Geräte hinzu:
   - Temperatursensoren
   - Heizungs-/Kühlantriebe (Ventile, Schalter usw.)
   - Feuchtigkeitssensoren (optional)

### 2. Funktionen konfigurieren

Richten Sie die erforderlichen Funktionen unter **Objekte → Aufzählungen → Funktionen** ein:

- **Temperatur** : Alle Zustände des Temperatursensors hinzufügen
- **Luftfeuchtigkeit** : Füge Zustände des Feuchtigkeitssensors hinzu (optional)
- **Motor** : Alle Zustände der Heiz-/Kühlungsaktuatoren hinzufügen

### 3. Adapterkonfiguration

#### Grundeinstellungen

- **Betriebsmodus** : Wählen Sie zwischen „Heizen“ und „Kühlen“.
- **Prüfintervall** : Wie oft der Adapter die Temperaturen prüft (in Minuten).
- **Standardtemperatur** : Ausweichtemperatur, wenn kein Zeitraum übereinstimmt
- **Temperaturhysterese** : Temperaturdifferenzschwelle für das Ein-/Ausschalten von Heizung/Kühlung

#### Zeitbasierte Perioden

Konfigurieren Sie Temperaturpläne für jeden Raum:

1. Wählen Sie einen Raum aus der Dropdown-Liste aus.
2. Start- und Endzeiten festlegen
3. Zieltemperatur definieren
4. Wähle Wochentage aus
5. Geben Sie an, ob dieser Zeitraum für den Heiz- oder Kühlmodus gilt.

#### Erweiterte Einstellungen

- **Pausendauer** : Automatische Rücksetzzeit für den Pausenmodus (Minuten)
- **Boost-Dauer** : Automatische Rücksetzzeit für den Boost-Modus (Minuten)
- **Feuchtigkeitsschwelle** : Maximale Luftfeuchtigkeit, bevor die Kühlung stoppt
- **Zurücksetzen beim Start** : Alle Temperaturen werden beim Start des Adapters mit den Standardwerten überschrieben.

#### Wetterbasierte Steuerung (optional)

Intelligenten Betrieb basierend auf der Außentemperatur ermöglichen:

- **Wettersteuerung aktivieren** : Wetterbasierte Heizungs-/Kühlungssteuerung aktivieren
- **Wetterdatenquelle** : Wählen Sie das Bundesland mit den Außentemperaturdaten aus.
- **Heizschwelle** : Die Heizung wird nur aktiviert, wenn die Außentemperatur unter diesem Wert liegt (Standard: 15°C).
- **Kühlschwelle** : Die Kühlung wird nur aktiviert, wenn die Außentemperatur über diesem Wert liegt (Standard: 24 °C).

**So funktioniert es:**

- Im Heizbetrieb: Das System arbeitet nur, wenn die Außentemperatur unter dem Schwellenwert liegt.
- Im Kühlmodus: Das System arbeitet nur, wenn die Außentemperatur den Schwellenwert überschreitet.
- Hat Vorrang vor allen anderen Einstellungen (Zeiträume, Verstärkung, Abwesenheit).
- Falls keine Wetterdaten verfügbar sind, arbeitet das System als Ausweichlösung normal.

## Verwendung

### Manuelle Steuerungsmaßnahmen

Der Adapter erstellt Aktionsobjekte unter`heizungssteuerung.0.Actions` :

#### Globale Aktionen (Alle Räume)

- **Abwesenheitsmodus bis** : Abwesenheitsmodus bis zu einem bestimmten Datum/einer bestimmten Uhrzeit festlegen
  - Format:`dd.MM.yyyy HH:mm` (z. B. „01.01.2024 14:00“)
  - Effekt: Ignoriert Perioden und verwendet die Standardtemperatur
- **Pause** : Heizung/Kühlung vorübergehend anhalten
- **Boost** : Boost-Modus für alle Räume aktivieren

#### Raumspezifische Aktionen

In jedem Zimmer finden Sie:

- **Pause** : Heizung/Kühlung nur für diesen Raum anhalten
- **Boost** : Aktiviere den Boost-Modus nur für diesen Raum.
- **Zieltemperatur** : Zieltemperatur vorübergehend überschreiben

### Beispielkonfigurationen

#### Grundlegender Heizplan

```
Room: Living Room
Time: 06:00 - 22:00
Days: Monday to Friday
Temperature: 21°C
Mode: Heating
```

#### Wochenendprogramm

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

### Typische Heimkonfiguration

1. **Wohnbereiche** : 21 °C tagsüber, 19 °C nachts
2. **Schlafzimmer** : 19 °C tagsüber, 16 °C nachts
3. **Badezimmer** : 22 °C morgens/abends, 19 °C sonst
4. **Büro** : 21 °C während der Arbeitszeit, 18 °C außerhalb der Arbeitszeit.

### Energiespartipps

- Niedrigere Nachttemperaturen verwenden (Reduzierung um 2-3 °C).
- Stellen Sie die Abwesenheitstemperaturen 3-5°C unter den Normalwert ein.
- Konfigurieren Sie den Boost-Modus für schnelles Aufwärmen anstelle von konstant hohen Temperaturen.
- Um eine Überkühlung zu vermeiden, sollte die Luftfeuchtigkeit reguliert werden.

## Fehlerbehebung

### Häufige Probleme

**Die Temperaturen ändern sich nicht**

- Prüfen Sie, ob die Raumaufzählungen korrekt konfiguriert sind.
- Überprüfen Sie, ob die Temperatursensoren den richtigen Räumen zugeordnet sind.
- Stellen Sie sicher, dass sich die Aktoren im Funktions-Enum „Engine“ befinden.

**Periode funktioniert nicht**

- Zeitformat prüfen (24-Stunden-Format)
- Prüfen Sie, ob der Betriebsmodus mit der Periodenkonfiguration übereinstimmt.
- Zimmerauswahl in den historischen Einstellungen bestätigen

**Die Feuchtigkeitsregelung funktioniert nicht.**

- Füge Feuchtigkeitssensoren sowohl zu den Raum- als auch zu den Funktionsaufzählungen hinzu.
- Überprüfen Sie die Einstellungen für den Feuchtigkeitsschwellenwert.
- Prüfen Sie, ob die Sensoren aktuelle Daten liefern.

### Debug-Informationen

Aktivieren Sie die Debug-Protokollierung in den Adaptereinstellungen, um detaillierte Informationen zu erhalten über:

- Temperaturberechnungen
- Periodenübereinstimmung
- Aktuatorsteuerungsentscheidungen
- Fehlerbedingungen

## Credits

Symbol erstellt von Freepik ( <https://www.flaticon.com/de/kostenloses-icon/heizung_1295221> )

---

**Unterstütze dieses Projekt** ⭐ Gib diesem Repository einen Stern, wenn du es hilfreich findest!

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now

### 2.1.2 (2025-12-10)
- (jbeenenga) fix invalid state roles according to ioBroker documentation
- (jbeenenga) fix repository checker issues (#237)
  - Corrected schema URL in .vscode/settings.json
  - Added jsonConfig schema validation
  - Updated release-script packages to latest versions
- (jbeenenga) fix jsonConfig validation errors - replaced title with label in table items

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

[Older changelogs can be found there](https://github.com/jbeenenga/ioBroker.heizungssteuerung/blob/main/CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2025-2026 jbeenenga [j.beenenga@gmail.com](mailto:j.beenenga@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.