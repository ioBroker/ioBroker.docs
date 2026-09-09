---
chapters: {"pages":{"en/adapterref/iobroker.poolcontrol/README.md":{"title":{"en":"ioBroker.poolcontrol"},"content":"en/adapterref/iobroker.poolcontrol/README.md"},"en/adapterref/iobroker.poolcontrol/docs/en/help.md":{"title":{"en":"PoolControl – Help & Documentation"},"content":"en/adapterref/iobroker.poolcontrol/docs/en/help.md"},"en/adapterref/iobroker.poolcontrol/docs/en/function_overview.md":{"title":{"en":"PoolControl – Function Overview"},"content":"en/adapterref/iobroker.poolcontrol/docs/en/function_overview.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.poolcontrol/README.md
title: ioBroker.poolcontrol
hash: JfSshCtfJViJrI3Xg1q5mExAG7PNUR/wkGU+fUOiVgQ=
---
# ioBroker.poolcontrol

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
  - Betriebsarten: Automatik, Automatik (PV), Manuell, Zeitsteuerung, Aus
  - Fehlererkennung (kein Stromverbrauch, Strom trotz AUS-Zustand, Überlastung)
  - Sicherheitsfunktionen (Frostschutz, Überhitzungsschutz)
  - Prioritätsverantwortung und Helferkoordination
  - Leistungsempfehlungen für drehzahlvariable Pumpen
  - Lernfunktionen für Leistungs- und Flussverhalten (`pump.learning.*` )

- **Zeitsteuerung**
  - Bis zu 3 frei konfigurierbare wöchentliche Zeitfenster
  - Persistente Konfigurationswerte
  - Schutz vor Überschreiben bei Aktualisierungen

- **Solar Control**
  - Ein-/Ausschaltschwellen des Kollektors mit Hysterese
  - Live-Kollektor-Oberflächen-Delta für Dashboards und Skripte
  - Warnschwelle des Sammlers
  - Optionale Sprachausgabe für Warnungen
  - Automatische Rücksetzlogik

- **Solar Extended**
  - Separate Steuerung für externe Solaraktuatoren
  - Delta-Ein-/Ausschaltschwellen
  - Live-Referenzdelta des Collector-Pools für Dashboards und Skripte
  - Maximale Pooltemperaturgrenzen
  - Diagnose- und Begründungszustände
  - Prioritäts- und Blocklogik
  - Statusabschnitt unter`solar.extended.*`
  - Laufzeitänderungen an`solar.extended.pool_temperature_source` werden automatisch angewendet; da Solar Extended ein zyklisches Prüfintervall, Berechnungslogik und Steuerlogik verwendet,`solar.extended.collector_pool_reference_delta` Die Aktualisierung kann bis zu etwa 60 Sekunden dauern.

- **Photovoltaiksteuerung**
  - Pumpensteuerung basierend auf PV-Überschuss und Haushaltsverbrauch
  - Startlogik unter Verwendung konfigurierbarer Überschussmargen
  - Optionaler Überlauf bei Bewölkung
  - Ignoriermodus aktivieren, wenn das Zirkulationsziel erreicht ist
  - Unterstützt externe Energieobjekt-IDs
  - Pumpenmodus:`Automatic (PV)`

- **Heizungs-/Wärmepumpensteuerung**
  - Automatische Steuerung von Heizstab oder Wärmepumpe
  - Konfigurierbare Ziel- und Sicherheitstemperaturen
  - Optionale Pumpenvorlaufzeit und Nachlaufzeit
  - Eigentumsschutz
  - Wartungsblockierungslogik
  - Unterstützt umschaltbare Ausgänge und boolesche Zustände
  - Interner Status und Diagnose unter`heat.*`
  - Keine Chemie oder Solarlogik

- **Zusätzliche Aktuatoren**
  - Lichtsteuerung
  - Zusätzliche Pumpen
  - Folgepumpengeräte
  - Automatisches Ein-/Ausschalten je nach Pumpenbetrieb
  - Validierung externer Zielzustände
  - Geeignet für UV-Systeme, Wasserspiele und Hilfssysteme

### Überwachung und Diagnose

- **Temperaturmanagement**
  - Bis zu 6 Sensoren:
    - Oberfläche
    - Boden / Unterseite
    - fließen
    - zurückkehren
    - Kollektor
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
  - Letzte Rückspülungsverfolgung
  - Automatischer Reset nach abgeschlossener Rückspülung
  - PV-Integration für Zirkulationsziele

- **Integration eines Drucksensors**
  - Echtzeit-Druckmessung
  - Trendanalyse
  - Lernmittelwerte
  - Selbstlernende Minimal-/Maximalbereiche
  - Diagnosezustände
  - Druckverlauf und -bewertung
  - Unterstützung für externe Sensoren und PoolControl PressureBox
  - Nur zur Information (keine automatische Steuerung)

- **SystemCheck**
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

- **Pool Insights**
  - Regelbasierte Gesamtpoolanalyse unter analytics.insights.pool.\*
  - Liest nur vorhandene PoolControl-Daten
  - Keine automatische Steuerung, Dosierung, Pumpenumschaltung oder Aktuatorumschaltung
  - Standardmäßig deaktiviert
  - Optionale Übergabe der Zusammenfassung an speech.queue
  - HTML-/JSON-/Textausgabe

- **VIS-fähige Ausgänge**
  - Strukturierte Textausgaben
  - HTML-Ausgaben
  - JSON-Zusammenfassungen
  - Geeignet für VIS / VIS2 / Armaturenbretter

### Chemie & KI

- **Wasserchemische Analyse**

  **pH**

  - Manuelle oder externe Quellen
  - Messortlogik
  - Stabilisierungslogik
  - Unterstützung für manuelle Mischläufe
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
  - Nur zur Information
  - Keine Chlorkontrolle
  - Keine automatische Dosierung

  **Zweistufige begrenzte Chemiegeschichte**

  - Die bestehenden samples\_json-Zustände enthalten weiterhin den 7-tägigen, 15-minütigen Kurzzeitverlauf: maximal 672 Samples und jeweils 64 KB.
  - Neue interne daily\_json-Zustände speichern kompakte lokale Kalendertag-Aggregate mit min/max/avg/last/count: maximal 32 Einträge und jeweils 8 KB.
  - Für 24-Stunden- und 7-Tage-Trends wird samples\_json verwendet; für 30-Tage-Trends wird der letzte Wert des entsprechenden Tagesaggregats verwendet.
  - Die bestehenden Trendstatistiken für 24 Stunden, 7 Tage und 30 Tage sowie die Berichte im Text-/HTML-/JSON-Format behalten ihre API und Bedeutung.
  - Die täglichen Aggregatwerte ergänzen, ersetzen aber nicht die Rohdaten; gültige Altdaten werden während der Migration normalisiert und zu große JSON-Daten werden vor dem Parsen abgelehnt.
  - Rohdaten langfristiger Historien gehören in eine separate ioBroker-Historien-/Zeitreihendatenbank.
  - Falls eine zu große states.jsonl-Datei den Start des js-Controllers bereits verhindert, muss sie extern repariert werden, bevor PoolControl ausgeführt werden kann.

  **Chemiewerkzeuge**

  - pH Plus Rechner
  - pH-Minus-Rechner
  - Salzrechner
  - Hilfsmittel für manuelle Berechnungen
  - Unterstützung für die Vorbefüllung des Poolvolumens
  - Optionale manuelle Wertüberschreibung
  - Ergebnistexte mit Validierung und Fehlerbehandlung – Keine automatische Chemikaliendosierung
  - Nur zur Information

- **KI-System**
  - Wettervorhersage (Open-Meteo)
  - Poolempfehlungen
  - Tageszusammenfassung
  - Wochenendbericht
  - Wettervorhersage für morgen
  - Optionale Sprachausgänge
  - Doppelte Kontextverfolgung

- **Chemiehilfe**
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
- **Solarmanagement** → Ein-/Ausschaltschwellenwerte, Hysterese, Warnschwelle
- **Zeitsteuerung** → Zeitfenster für den Pumpenbetrieb
- **Sprachausgabe** → Aktivierung, Alexa-/Telegram-Integration
- **Verbrauch & Kosten** → externer kWh-Zähler, Strompreis

---

## Geplante Erweiterungen

- Erweiterte PV- und Solareffizienzanalyse (COP-Berechnung, Tagesnutzen, Wetterintegration)
- Statistik-Exportfunktion (CSV/Excel)
- Diagnosehilfe für automatische Systemprüfungen
- Eigene Widgets für VIS/VIS2 (grafische Pool- und Solarvisualisierung)
- Spezielle Steuermodule für Ventile und Gegenstromsysteme
- Integration zusätzlicher Sensorboxen (z. B. TempBox, PressureBox, LevelBox)
- Erweiterung für KI und Sprachassistenten (täglicher Poolbericht, Tipps, Sprachbefehle)

---

## Notiz

Der Adapter befindet sich in aktiver Entwicklung.\
&#x20;Es werden regelmäßig neue Funktionen hinzugefügt – bitte beachten Sie das Änderungsprotokoll.

---

## Dokumentation

### Englisch

- [Dokumentation / Hilfe](/#/docs/adapterref/iobroker.poolcontrol/docs/en/help.md)
- [Funktionsübersicht](/#/docs/adapterref/iobroker.poolcontrol/docs/en/function_overview.md)

### Deutsch

- [Dokumentation / Hilfe](https://github.com/DasBo1975/ioBroker.poolcontrol/blob/main/docs/de/help.md)
- [Funktionsübersicht](https://github.com/DasBo1975/ioBroker.poolcontrol/blob/main/docs/de/funktionsuebersicht.md)

---

## Archivierte Veröffentlichungshistorie

Ältere Versionen und den archivierten Versionsverlauf finden Sie hier:

[CHANGELOG\_OLD.md](https://github.com/DasBo1975/ioBroker.poolcontrol/blob/main/CHANGELOG_OLD.md)

---

## Unterstützung

- [ioBroker-Forum](https://forum.iobroker.net/)
- [GitHub-Probleme](https://github.com/DasBo1975/ioBroker.poolcontrol/issues)

---

## Unterstützung der Adapterentwicklung

Wenn Ihnen **ioBroker.poolcontrol** gefällt, erwägen Sie bitte eine Spende:\
&#x20;➡️ [Unterstützung via PayPal](https://www.paypal.com/donate?business=dirk.bertin@t-online.de)

---

## Haftungsausschluss

Die Verwendung des Adapters erfolgt **auf eigene Gefahr** .\
&#x20;Der Entwickler übernimmt **keine Haftung** für Schäden, die durch Installation, Verwendung oder Fehlfunktionen entstehen.\
&#x20;Dies gilt insbesondere für die direkte Steuerung elektrischer Geräte (z. B. Poolpumpen).\
&#x20;Der Benutzer ist für die **sichere Installation und den sicheren Betrieb seiner Hardware** verantwortlich.

---

## Rechtlicher Hinweis

PoolControl ist ein Open-Source-Projekt, das von D. Bertin (DasBo1975) entwickelt wurde.

- Der Name PoolControl und das zugehörige Logo sind Eigenentwicklungen und dürfen im Rahmen der Open-Source-Veröffentlichung (Adapter, GitHub-Repository, Wiki, Dokumentation, Visualisierungen) frei verwendet werden.

- Für die kommerzielle Nutzung, Weiterverbreitung oder Veröffentlichung in veränderter Form (insbesondere als Teil eines kommerziellen Produkts oder einer Dienstleistung) ist die ausdrückliche Genehmigung des Autors erforderlich.

- Sämtliche entwickelten Sensor-, Hardware- und Gehäusekonstruktionen (z. B. Temperatur-, Druck-, Füllstands-, Elektronik- oder Steuerkästen) einschließlich Entwürfen, Schaltplänen, 3D-Modellen und internen Konstruktionen unterliegen dem Urheberrecht von D. Bertin (DasBo1975).

- Die Veröffentlichung, Vervielfältigung zum Weiterverkauf oder zur kommerziellen Nutzung dieser Hardware-Designs ist nur mit schriftlicher Genehmigung des Autors gestattet.

Der Quellcode dieses Projekts ist unter der MIT-Lizenz lizenziert. Details finden Sie in der Datei LICENSE.

---

## Changelog
### 1.4.5 (2026-08-11)

- Fixed a conflict between Auto-PV and Extended Solar control.
- Extended Solar could incorrectly switch off the main pump while the pump was being controlled by Auto-PV and sufficient PV surplus was still available.
- Extended Solar now only writes to the main pump switch when `pump.mode = auto`.
- Auto-PV operation is no longer interrupted by the Extended Solar control cycle.
- Existing Extended Solar pump control in normal `auto` mode remains unchanged.

### 1.4.4 (2026-07-31)

- Fixed a race condition in the Auto-PV helper that could occur during rapid updates of PV generation and household power values.
- Added a short debounce for PV and household power events to ensure calculations always use the latest matching values.
- Replaced the previous throttle mechanism with a serialized recalculation workflow to prevent overlapping asynchronous recalculations.
- Added an internal "latest run wins" protection so outdated recalculations can no longer overwrite newer results or trigger outdated pump decisions.
- The existing Auto-PV holding logic introduced in v1.4.1 remains unchanged.
- `photovoltaic.power_surplus_w` continues to represent the real remaining PV surplus (`PV generation - household consumption`).
- Existing Auto-PV features such as afterrun, circulation handling, solar overheating protection and controlHelper priority remain fully compatible.

### 1.4.3 (2026-07-25)

- Fixed restoration of the previous pump mode after maintenance mode and automatic circulation catch-up runs.
- Maintenance mode now restores the previous valid user mode even after an adapter restart.
- Maintenance mode and automatic catch-up runs now use separate restore values and can no longer overwrite each other.
- Invalid values such as `null`, empty values, or internal helper modes are no longer written back to `pump.mode`.
- Automatic circulation catch-up runs no longer start while maintenance mode is active.
- Starting maintenance mode during an active catch-up run now stops the catch-up process cleanly before maintenance takes control.
- Added validation to the pump-mode restoration after backwashing.
- The existing overload protection remains unchanged and continues to switch `pump.mode` to `off` when an overload is detected.

### 1.4.2 (2026-07-01)

- Fixed monthly temperature statistics reset scheduling
  - Monthly reset no longer uses long timeouts above the Node.js/ioBroker limit
  - Added persistent monthly period tracking
  - Missed month changes after adapter downtime are detected safely
  - Monthly reset is now checked daily and executed only once per period

- Improved solar logbook logging
  - Oversized solar logbook entries are now logged as debug instead of warning
  - This avoids unnecessary warning noise for non-critical diagnostic information

### 1.4.1 (2026-06-30)

- Fixed Auto-PV holding logic for already running pumps.
- When Auto-PV already controls the pump, the current pump power is now considered for the holding decision.
- This prevents a running pump from triggering its own Auto-PV afterrun/stop cycle after startup.
- The displayed PV surplus (`photovoltaic.power_surplus_w`) remains the real remaining surplus and is not artificially adjusted.

## License
Copyright (c) 2026 D. Bertin (DasBo1975) <dasbo1975@outlook.de>  

MIT License