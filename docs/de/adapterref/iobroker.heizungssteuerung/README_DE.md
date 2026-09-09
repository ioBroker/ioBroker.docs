---
chapters: {"pages":{"en/adapterref/iobroker.heizungssteuerung/README.md":{"title":{"en":"ioBroker.heizungssteuerung"},"content":"en/adapterref/iobroker.heizungssteuerung/README.md"},"en/adapterref/iobroker.heizungssteuerung/README_DE.md":{"title":{"en":"ioBroker.heizungssteuerung"},"content":"en/adapterref/iobroker.heizungssteuerung/README_DE.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.heizungssteuerung/README_DE.md
title: ioBroker.Heizungssteuerung
hash: O4ik/HOtPgHN8SmuyAIXRRCAQZancMqXX6Kt2Q87kWo=
---
# ioBroker.Heizungssteuerung

![NPM-Version](https://img.shields.io/npm/v/iobroker.heizungssteuerung.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.heizungssteuerung.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/jbeenenga/iobroker.heizungssteuerung.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/jbeenenga/ioBroker.heizungssteuerung/badge.svg)
![NPM](https://nodei.co/npm/iobroker.heizungssteuerung.png?downloads=true)
![Test und Freigabe](https://github.com/jbeenenga/ioBroker.heizungssteuerung/actions/workflows/test-and-release.yml/badge.svg)

![Logo](../../../en/adapterref/iobroker.heizungssteuerung/admin/heizungssteuerung.png)

## ioBroker Adapter für Heizungssteuerung

Dieser Adapter bietet eine umfassende Heizungssteuerung für ioBroker-Installationen. Er unterstützt sowohl Heiz- als auch Kühlmodus mit erweiterten Funktionen wie Boost-Modus, Pause-Funktionalität und zeitbasierter Temperaturplanung.

[🇬🇧 Englische Version](/#/adapters/heizungssteuerung)

## Funktionen

- **Dual-Modus-Unterstützung** : Wechseln zwischen Heiz- und Kühlmodus
- **Wetterbasierte Steuerung** : Automatische Aktivierung/Deaktivierung basierend auf der Außentemperatur
- **Boost-Modus** : Temporäre Erhöhung der Heizung/Kühlung für einzelne Räume
- **Pause-Modus** : Temporäre Deaktivierung der Heizung/Kühlung für bestimmte Räume
- **Zeitbasierte Planung** : Definition von Temperaturperioden für verschiedene Zeiten und Tage
- **Raumbasierte Steuerung** : Individuelle Temperaturverwaltung für jeden Raum
- **Feuchtigkeitssteuerung** : Stopp der Kühlung bei Erreichen von Feuchtigkeitsschwellenwerten
- **Abwesenheitsmodus** : Reduzierte Temperaturen während des Urlaubs oder längerer Abwesenheit
- **Temperatur-Override** : Manuelle Überschreibung der Zieltemperaturen bei Bedarf

## Installation

### Über die ioBroker Admin-Oberfläche

1. Öffnen Sie die ioBroker Admin-Oberfläche
2. Gehen Sie zum Tab "Adapter"
3. Suchen Sie nach „Heizungssteuerung“
4. Klicken Sie auf „Installieren“

### Über npm

```bash
npm install iobroker.heizungssteuerung
```

## Schnellstart-Anleitung

### 1. Raumstruktur einrichten

Bevor Sie den Adapter konfigurieren, müssen Sie Ihre Raumstruktur in ioBroker einrichten:

1. Navigieren Sie zu **Objekte → Aufzählungen → Räume**
2. Schaffen Sie Räume für jeden Bereich, den Sie steuern möchten (zB „Wohnzimmer“, „Schlafzimmer“, „Küche“)
3. Fügen Sie folgende Geräte zu jedem Raum hinzu:
   - Temperatursensoren
   - Heiz-/Kühlstellglieder (Ventile, Schalter, etc.)
   - Feuchtigkeitssensoren (optional)

### 2. Funktionen konfigurieren

Richten Sie die erforderlichen Funktionen unter **Objekten → Aufzählungen → Funktionen** ein:

- **Temperatur** : Alle Temperatursensor-Zustände hinzufügen
- **Feuchtigkeit** : Feuchtigkeitssensor-Zustände hinzufügen (optional)
- **Antrieb** : Alle Heiz-/Kühlstellglied-Zustände hinzufügen

### 3. Adapter-Konfiguration

#### Grundeinstellungen

- **Betriebsmodus** : Wählen Sie zwischen „Heizen“ und „Kühlen“
- **Prüfintervall** : Wie oft die Adaptertemperaturen geprüft werden (in Minuten)
- **Standardtemperatur** : Fallback-Temperatur, wenn keine Periode vergeht
- **Temperatur-Hysterese** : Temperaturdifferenz-Schwellenwert für Ein-/Ausschalten der Heizung/Kühlung

#### Zeitbasierte Perioden

Konfigurieren Sie Temperaturpläne für jeden Raum:

1. Wählen Sie einen Raum aus der Dropdown-Liste
2. Setzen Sie Start- und Endzeiten
3. Definieren Sie die Zieltemperatur
4. Wählen Sie Sie Wochentage
5. Geben Sie an, ob dieser Zeitraum für Heiz- oder Kühlmodus ist

#### Erweiterte Einstellungen

- **Pause-Dauer** : Auto-Reset-Zeit für Pause-Modus (Minuten)
- **Boost-Dauer** : Auto-Reset-Zeit für Boost-Modus (Minuten)
- **Feuchtigkeitsschwellenwert** : Maximale Feuchtigkeit bevor die Kühlung gestoppt wird
- **Reset beim Start** : Überschreibt alle Temperaturen mit Standardwerten beim Adapter-Start

#### Wetterbasierte Steuerung (Optional)

Intelligenter Betrieb basierend auf der Außentemperatur:

- **Wettersteuerung aktivieren** : Wetterbasierte Heiz-/Kühlsteuerung aktivieren
- **Wetterdatenquelle** : Bundesland mit Außentemperaturdaten auswählen
- **Heizschwellenwert** : Heizung nur aktivieren, wenn Außentemperatur unter diesem Wert liegt (Standard: 15°C)
- **Kühlschwellenwert** : Kühlung nur aktivieren, wenn Außentemperatur über diesem Wert liegt (Standard: 24°C)

**So funktioniert es:**

- Im Heizmodus: System arbeitet nur, wenn Außentemperatur < Schwellenwert
- Im Kühlmodus: System arbeitet nur, wenn Außentemperatur > Schwellenwert
- Hat Vorrang vor allen anderen Einstellungen (Zeiträume, Boost, Abwesenheit)
- Bei fehlenden Wetterdaten arbeitet das System normal als Fallback

## Verwendung

### Manuelle Steuerungsaktionen

Der Adapter erstellt Aktions-Objekte unter`heizungssteuerung.0.Actions` :

#### Globale Aktionen (Alle Räume)

- **AbwesenheitUntil** : Abwesenheitsmodus bis zu einem bestimmten Datum/Zeit setzen
  - Format:`dd.MM.yyyy HH:mm` (zB "01.01.2024 14:00")
  - Effekt: Ignoriert Perioden und verwendet Standardtemperatur
- **Pause** : Alle Heizung/Kühlung wird vorübergehend pausiert
- **boost** : Boost-Modus für alle Räume aktivieren

#### Raumspezifische Aktionen

Für jeden Raum finden Sie:

- **Pause** : Heizung/Kühlung nur für diesen Raum pausieren
- **boost** : Boost-Modus nur für diesen Raum aktivieren
- **targetTemp** : Zieltemperatur temporär überschreiben

### Beispielkonfigurationen

#### Basis-Heizplan

```
Raum: Wohnzimmer
Zeit: 06:00 - 22:00
Tage: Montag bis Freitag
Temperatur: 21°C
Modus: Heizen
```

#### Wochenendplan

```
Raum: Wohnzimmer  
Zeit: 08:00 - 24:00
Tage: Samstag, Sonntag
Temperatur: 22°C
Modus: Heizen
```

#### Nachttemperatur

```
Raum: Schlafzimmer
Zeit: 22:00 - 06:00
Tage: Alle Tage
Temperatur: 18°C
Modus: Heizen
```

## Konfigurationsbeispiele

### Typische Heimeinrichtung

1. **Wohnbereich** : 21°C tagsüber, 19°C nachts
2. **Schlafzimmer** : 19°C tagsüber, 16°C nachts
3. **Badezimmer** : 22°C morgens/abends, 19°C sonst
4. **Büro** : 21°C während der Arbeitszeit, 18°C sonst

### Energiespar-Tipps

- Verwenden Sie niedrigere Nachttemperaturen (2-3°C Reduktion)
- Setzen Sie die Abwesenheitstemperatur auf 3-5°C unter normal
- Konfigurieren Sie den Boost-Modus für schnelles Aufheizen statt konstant hoher Temperaturen
- Nutzen Sie die Feuchtigkeitskontrolle zur Vermeidung von Überkühlung

## Implementierung

### e Probleme

**Temperaturen ändern sich nicht**

- Prüfen Sie, ob die Raum-Aufzählungen korrekt konfiguriert sind
- Überprüfen Sie, ob die Temperatursensoren den korrekten Räumen zugeordnet sind
- Stellen Sie sicher, dass Stellglieder in der „Antrieb“-Funktions-Aufzählung sind

**Perioden funktionieren nicht**

- Verifizieren Sie das Zeitformat (24-Stunden-Format)
- Prüfen Sie, ob der Betriebsmodus zur Periodenkonfiguration passt
- Bestätigen Sie die Raumauswahl in den Periodeneinstellungen

**Feuchtigkeitssteuerung funktioniert nicht**

- Fügen Sie Feuchtigkeitssensoren sowohl zu Raum- als auch Funktions-Aufzählungen hinzu
- Überprüfen Sie die Feuchtigkeitsschwellenwert-Einstellungen
- Überprüfen Sie, ob die Sensoren aktuelle Daten liefern

### Debug-Informationen

Aktivieren Sie Debug-Logging in den Adapter-Einstellungen, um detaillierte Informationen zu sehen über:

- Temperaturberechnungen
- Periodenanpassung
- Stellglied-Steuerungsentscheidungen
- Fehlerbedingungen

## Lizenz

MIT-Lizenz

Copyright © 2024 jbeenenga <j.beenenga@gmail.com>

Hiermit wird unentgeltlich jede Person, die eine Kopie der Software und der zugehörigen Dokumentationen (die „Software“) erhält, die Erlaubnis erteilt, sie uneingeschränkt zu nutzen, inklusive und ohne Ausnahme mit dem Recht, sie zu verwenden, zu kopieren, zu verändern, zusammenzufügen, zu veröffentlichen, zu verbreiten, zu unterlizenzieren und/oder zu verkaufen, und Personen, denen diese Software überlassen wird, diese Rechte zu verschaffen, unter den folgenden Bedingungen:

Der obige Urheberrechtsvermerk und dieser Erlaubnisvermerk sind in allen Kopien oder Teilkopien der Software beizulegen.

DIE SOFTWARE WIRD OHNE JEDE AUSDRÜCKLICHE ODER IMPLIZIERTE GARANTIE BEREITGESTELLT, EINSCHLIEẞLICH DER GARANTIE ZUR TAUGLICHKEIT FÜR EINEN BESTIMMTEN ZWECK UND NICHTVERLETZUNG VON RECHTEN DRITTER. DIE AUTOREN ODER COPYRIGHTINHABER SIND NICHT HAFTBAR JEGLICHEN SCHADEN ODER SONSTIGE ANSPRÜCHE, EGAL OB DIESE DURCH DIE ERFÜLLUNG EINES VERTRAGES, UNERLAUBTE HANDLUNGEN ODER ANDERWEITIG ENTSTEHEN ODER IN VERBINDUNG MIT DER SOFTWARE ODER SONSTIGER VERWENDUNG DER SOFTWARE AUFTRETEN.

## Danksagungen

Icon erstellt von Freepik ( <https://www.flaticon.com/de/kostenloses-icon/heizung_1295221> )

---

**Unterstützen Sie dieses Projekt** ⭐ Geben Sie diesem Repository einen Stern, wenn Sie es hilfreich finden!