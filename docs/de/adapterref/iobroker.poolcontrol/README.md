---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.poolcontrol/README.md
title: ioBroker.poolcontrol
hash: nE1zdiOBPnbfSn/KHa2BjgeqquXjhkSUlBpIeAhbkC8=
---
# IoBroker.poolcontrol
![Test und Freigabe](https://github.com/DasBo1975/ioBroker.poolcontrol/actions/workflows/test-and-release.yml/badge.svg)

![npm](https://img.shields.io/npm/v/iobroker.poolcontrol?color=blue)
![Downloads](https://img.shields.io/npm/dm/iobroker.poolcontrol)
![Installationen](https://iobroker.live/badges/poolcontrol-installed.svg)
![Stabil](https://iobroker.live/badges/poolcontrol-stable.svg)
![Lizenz](https://img.shields.io/github/license/DasBo1975/ioBroker.poolcontrol?cacheSeconds=3600)

---

## Beschreibung
Der Adapter ioBroker.poolcontrol dient zur Steuerung, Überwachung und Analyse von Poolsystemen.

Es bietet Automatisierung für Pumpen, Heizung, Solar- und Photovoltaiksteuerung sowie Überwachung, Diagnose, chemische Analyse und Energiebewertung.

---

## Merkmale
### Steuerung und Automatisierung
- **Pumpensteuerung**
Betriebsmodi: Automatik, Automatik (PV), Manuell, Zeitsteuerung, Aus
- Fehlererkennung (kein Stromverbrauch, Strom trotz AUS-Zustand, Überlastung)
- Sicherheitsfunktionen (Frostschutz, Überhitzungsschutz)
- Prioritätsverantwortung und Koordination der Helfer
- Empfehlungen zur Pumpenleistung für drehzahlvariable Pumpen
- Lernfunktionen für Leistungs- und Durchflussverhalten (`pump.learning.*`)

- **Zeitsteuerung**
- Bis zu 3 frei konfigurierbare wöchentliche Zeitfenster
- Permanente Konfigurationswerte
- Schutz vor Überschreiben bei Aktualisierungen

- **Solarstromversorgung**
- Ein-/Ausschaltschwellen des Kollektors mit Hysterese
- Warnschwelle des Sammlers
- Optionale Sprachausgabe für Warnungen
- Automatische Rücksetzlogik

- **Solar Extended**
- Separate Steuerung für externe Solaraktuatoren
- Delta-Ein-/Ausschaltschwellen
- Maximale Pooltemperaturgrenzen
- Diagnose- und Begründungszustände
- Prioritäts- und Blocklogik
- Statusbereich unter `solar.extended.*`

- **Photovoltaik-Steuerung (seit Version 0.6.0)**
- Pumpensteuerung basierend auf PV-Überschuss und Haushaltsverbrauch
- Startlogik unter Verwendung konfigurierbarer Überschussmargen
- Optionaler Überlauf bei Bewölkung
- Ignoriermodus, wenn das Zirkulationsziel erreicht ist
- Unterstützt externe Energieobjekt-IDs
- Pumpenmodus: `Automatisch (PV)`

- **Heizungs-/Wärmepumpensteuerung (Testphase)**
- Automatische Steuerung des Heizstabs oder der Wärmepumpe
- Konfigurierbare Ziel- und Sicherheitstemperaturen
- Optionale Pumpenvorlaufzeit und Nachlaufzeit
- Eigentumsschutz
- Wartungsblockierungslogik
- Unterstützt umschaltbare Ausgänge und boolesche Zustände
- Interner Status und Diagnose unter `heat.*`
- Keine Chemie oder Solarlogik

- **Zusätzliche Aktuatoren**
- Lichtsteuerung
- Zusätzliche Pumpen
- Folgepumpengeräte
- Automatische Ein-/Ausschaltung je nach Pumpenbetrieb
- Validierung externer Zielzustände
- Geeignet für UV-Systeme, Wasserspiele und Hilfssysteme

### Überwachung und Diagnose
- **Temperaturmanagement**
- Bis zu 6 Sensoren:
    - Oberfläche
- Boden
    - fließen
    - zurückkehren
- Sammler
- Außentemperatur
- Tägliche Minimal-/Maximalwerte
- Stündliche Änderungen
- Temperaturunterschiede
- Nachverfolgung des letzten gültigen Werts
- Quellenüberwachung und -diagnose
- Wiederherstellungslogik für fehlende Updates
- Quellenstatusbewertung

- **Laufzeit & Auflage**
- Laufzeitzähler (heute / gesamt)
- Zirkulationsberechnung und Restvolumen
- Selbstheilung zur Laufzeit
- Rückspül-Erinnerungssystem
- Letzte Rückspülverfolgung
- Automatischer Reset nach abgeschlossener Rückspülung
- PV-Integration für Zirkulationsziele

- **Integration eines Drucksensors (ab Version 0.7.x)**
- Echtzeit-Druckmessung
- Trendanalyse
- Lernmittelwerte
- Selbstlernende Minimal-/Maximalbereiche
- Diagnosezustände
- Druckverlauf und -bewertung
- Unterstützung für externe Sensoren und PoolControl PressureBox
- Nur zur Information (keine automatische Steuerung)

- **Systemprüfung**
- Diagnose- und Debug-Bereich
- Überwachung ausgewählter Teilsysteme
- Internes Debug-Protokoll
- Manuelle Protokolllöschung
- Zur Analyse und Fehlerbehebung vorgesehen.

### Analysen und Erkenntnisse
- **Statistiksystem**
- Tägliche / wöchentliche / monatliche Statistiken
- Min-/Max-/Durchschnittsberechnungen
- Laufzeitauswertungen
- Persistente Zustände
- HTML- und JSON-Zusammenfassungen

- **Solar Insights**
- Solarlaufzeitanalyse
- Effizienzberechnungen
- Diagnoseausgaben
- Tagesprotokoll
- HTML-/JSON-/Textausgabe
- Nur zur Information (keine Kontrolle)

- **Einblicke in die Photovoltaik**
- Laufzeitanalyse
- Energiebewertungen
- Einsparungsberechnungen
- Start- und Betriebsstatistik
- HTML-/JSON-Zusammenfassungen

- **VIS-fähige Ausgänge**
- Strukturierte Textausgaben
- HTML-Ausgaben
- JSON-Zusammenfassungen
- Geeignet für VIS / VIS2 / Armaturenbretter

### Chemie & KI
- **Wasserchemische Analyse**

**pH-Wert**

- Manuelle oder externe Quellen
- Messortlogik
- Stabilisierungslogik
- Unterstützung für manuelle Mischvorgänge
- Keine automatische Dosierung

**TDS**

- Manuelle oder externe Quellen
- Trendauswertung (24h / 7d / 30d)
- Referenzwerte
- Messortlogik
- HTML-/JSON-/Textausgabe

**ORP / Redox**

- ORP-Bewertung
- pH-Referenzunterstützung
-Nur zu Informationszwecken
- Keine Chlorkontrolle
- Keine automatische Dosierung

- **KI-System**
- Wetterhinweise (Open-Meteo)
- Poolempfehlungen
- Tageszusammenfassung
- Wochenendbericht
- Wettervorhersage für morgen
- Optionale Sprachausgabe
- Duplikat-Kontextverfolgung

- **Hilfe in Chemie**
- Interaktive Chemie-Hilfe
- Typische Poolproblemauswahl
- Ursachen- und Lösungserklärungen
- Keine automatische Dosierung
- Keine Gerätesteuerung

- **Sprachausgabe**
- Alexa-Unterstützung
- Telegram-Unterstützung
- Benachrichtigungen für Pumpe, Warnungen und Temperaturen

### Informationssystem
- Adapterinformationssystem
- Festliche Grüße
- Versionsinformationen

---

## Konfiguration
Die Konfiguration erfolgt über Registerkarten in der Admin-Oberfläche:

- **Allgemein** → Name des Pools, Größe des Pools, Mindestdurchflussmenge
- **Pumpe** → Pumpenleistung, Leistungsgrenzen, Sicherheitsfunktionen
- **Temperaturen** → Auswahl und Objekt-IDs von Sensoren
- **Solarmanagement** → Ein-/Ausschaltschwellen, Hysterese, Warnschwelle
- **Zeitsteuerung** → Zeitfenster für den Pumpenbetrieb
- **Sprachausgabe** → Aktivierung, Alexa-/Telegram-Integration
- **Verbrauch & Kosten** → externer kWh-Zähler, Strompreis

---

## Geplante Erweiterungen
- Erweiterte PV- und Solareffizienzanalyse (COP-Berechnung, Tagesnutzen, Wetterintegration)
- Statistik-Exportfunktion (CSV/Excel)
- Diagnosehilfsprogramm für automatische Systemprüfungen
- Eigene Widgets für VIS/VIS2 (grafische Visualisierung von Pools und Solaranlagen)
- Spezielle Steuermodule für Ventile und Gegenstromsysteme
- Integration zusätzlicher Sensorboxen (z. B. TempBox, PressureBox, LevelBox)
- Erweiterung für KI und Sprachassistenten (täglicher Poolbericht, Tipps, Sprachbefehle)

---

## Notiz
Der Adapter wird aktiv weiterentwickelt.
Neue Funktionen werden regelmäßig hinzugefügt – bitte beachten Sie das Änderungsprotokoll.

---

## Dokumentation
### Englisch
- [Dokumentation / Hilfe](https://github.com/DasBo1975/ioBroker.poolcontrol/blob/main/docs/en/help.md)
- [Funktionsübersicht](https://github.com/DasBo1975/ioBroker.poolcontrol/blob/main/docs/en/function_overview.md)

### Deutsch
- [Dokumentation / Hilfe](https://github.com/DasBo1975/ioBroker.poolcontrol/blob/main/docs/de/help.md)
- [Funktionsübersicht](https://github.com/DasBo1975/ioBroker.poolcontrol/blob/main/docs/de/funktionsuebersicht.md)

---

## Archivierte Veröffentlichungshistorie
Ältere Versionen und den archivierten Versionsverlauf finden Sie hier:

[CHANGELOG_OLD.md](./CHANGELOG_OLD.md)

---

## Unterstützung
- [ioBroker Forum](https://forum.iobroker.net/)
- [GitHub-Probleme](https://github.com/DasBo1975/ioBroker.poolcontrol/issues)

---

## Unterstützungsadapterentwicklung
Wenn Ihnen **ioBroker.poolcontrol** gefällt, erwägen Sie bitte eine Spende: ➡️ [Unterstützung via PayPal](https://www.paypal.com/donate?business=dirk.bertin@t-online.de)

---

## Haftungsausschluss
Die Verwendung des Adapters erfolgt **auf eigene Gefahr**.
Der Entwickler übernimmt **keine Haftung** für Schäden, die durch Installation, Verwendung oder Fehlfunktionen entstehen.
Dies gilt insbesondere für die direkte Steuerung elektrischer Geräte (z. B. Poolpumpen).
Der Benutzer ist für die **sichere Installation und den sicheren Betrieb seiner Hardware** verantwortlich.

---

## Rechtliche Hinweise
PoolControl ist ein Open-Source-Projekt, das von D. Bertin (DasBo1975) entwickelt wurde.

- Der Name PoolControl und das zugehörige Logo sind Eigenentwicklungen und dürfen im Rahmen der Open-Source-Veröffentlichung (Adapter, GitHub-Repository, Wiki, Dokumentation, Visualisierungen) frei verwendet werden.

Für die kommerzielle Nutzung, Weiterverbreitung oder Veröffentlichung in veränderter Form (insbesondere als Teil eines kommerziellen Produkts oder einer Dienstleistung) ist die ausdrückliche Genehmigung des Autors erforderlich.

Sämtliche entwickelten Sensor-, Hardware- und Gehäusekonstruktionen (z. B. für Temperatur-, Druck-, Füllstands-, Elektronik- oder Steuerkästen) einschließlich Entwürfen, Schaltplänen, 3D-Modellen und internen Konstruktionen unterliegen dem Urheberrecht von D. Bertin (DasBo1975).

Die Veröffentlichung, Vervielfältigung zum Weiterverkauf oder zur kommerziellen Nutzung dieser Hardware-Designs ist nur mit schriftlicher Genehmigung des Autors gestattet.

Der Quellcode dieses Projekts ist unter der MIT-Lizenz lizenziert. Details finden Sie in der Datei LICENSE.

---

## Changelog
### 1.3.25 (2026-05-26)

- Updated README structure and feature overview
- Synchronized German and English function overviews
- Updated repository maintenance dependencies

### 1.3.24 (2026-05-26)

- Updated release-script dependencies to current versions
- Improved README and changelog structure
- Repository checker recommendations reviewed

### 1.3.23 (2026-05-26)

- Added extended temperature diagnostics for all temperature sensors:
  - last valid value
  - last valid value timestamp
  - minutes since last value
  - source status (`ok`, `warning`, `not_received`, `invalid_timestamp`)
- Added automatic recovery mechanism for stalled temperature updates
- Recovery runs only when a sensor enters warning state and uses cooldown protection
- Switched temperature helper timers to ioBroker adapter timers
- Improved visibility and troubleshooting for missing or delayed temperature updates

### 1.3.22 (2026-05-24)

- Improved ORP pH reference synchronization
- ORP helper now updates pH reference independently from ORP value processing
- Immediate update of ORP pH reference when pH enabled state or pH value changes
- Fixed missing pH reference updates when ORP evaluation was blocked, invalid or waiting for measurement conditions

### 1.3.21 (2026-05-17)

NEW: Follow-pump devices

Added a new `actuators.follow_pump_devices` area.

Up to three external devices can now automatically follow the operation of the main pump.

Typical examples:

- UV systems
- Water features
- Auxiliary filters
- Additional circulation devices

Features:

- Automatic ON when the main pump starts
- Automatic OFF when the main pump stops
- Configurable target state per device
- Validation of target states:
  - state exists
  - boolean type required
  - writable required
- Protection against invalid internal follow-pump targets
- Persistent configuration values

## License
Copyright (c) 2026 D. Bertin (DasBo1975) <dasbo1975@outlook.de>  

MIT License