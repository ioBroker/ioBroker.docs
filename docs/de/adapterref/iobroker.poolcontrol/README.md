---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.poolcontrol/README.md
title: ioBroker.poolcontrol
hash: fvwFfs4ZipzQ1yq3AF5UcGKRPl2iRj9HGabHVEobors=
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
- Live-Kollektorflächen-Delta für Dashboards und Skripte
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
- Statusbereich unter `solar.extended.*`
- Laufzeitänderungen an `solar.extended.pool_temperature_source` werden automatisch angewendet; da Solar Extended ein zyklisches Prüfintervall verwendet, kann die Aktualisierung von Berechnung, Steuerlogik und `solar.extended.collector_pool_reference_delta` bis zu etwa 60 Sekunden dauern.

- **Photovoltaik-Steuerung**
- Pumpensteuerung basierend auf PV-Überschuss und Haushaltsverbrauch
- Startlogik unter Verwendung konfigurierbarer Überschussmargen
- Optionaler Überlauf bei Bewölkung
- Ignoriermodus, wenn das Zirkulationsziel erreicht ist
- Unterstützt externe Energieobjekt-IDs
- Pumpenmodus: `Automatisch (PV)`

- **Heizungs- / Wärmepumpensteuerung**
- Automatische Steuerung des Heizstabs oder der Wärmepumpe
- Konfigurierbare Ziel- und Sicherheitstemperaturen
- Optionale Pumpenvorlaufzeit und Nachlaufzeit
- Eigentumsschutz
- Wartungsblockierungslogik
- Unterstützt umschaltbare Ausgänge und boolesche Zustände
- Interner Status und Diagnose unter `heat.*`
Keine Chemie oder Solarlogik

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

- **Integration von Drucksensoren**
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

- **Pool-Einblicke**
- Regelbasierte Gesamtpoolanalyse unter analytics.insights.pool.*
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
Nur zur Information
- Keine Chlorkontrolle
- Keine automatische Dosierung

**Zweistufige, begrenzte Chemiegeschichte**

Die vorhandenen samples_json-Zustände enthalten weiterhin den 7-tägigen, 15-minütigen Kurzzeitverlauf: maximal 672 Samples und jeweils 64 KB.
- Neue interne daily_json-Zustände speichern kompakte lokale Kalendertag-Aggregate mit min/max/avg/last/count: maximal 32 Einträge und jeweils 8 KB.
- Für 24-Stunden- und 7-Tage-Trends wird samples_json verwendet; für 30-Tage-Trends wird der letzte Wert des entsprechenden Tagesaggregats verwendet.
- Die bestehenden Trendstatistiken für 24 Stunden, 7 Tage und 30 Tage sowie die Berichte im Text-/HTML-/JSON-Format behalten ihre API und Bedeutung.
Die täglichen Aggregatwerte ergänzen, ersetzen aber nicht die Rohdaten; gültige Altdaten werden während der Migration normalisiert und zu große JSON-Daten werden vor dem Parsen abgelehnt.
- Rohdaten langfristiger Historien gehören in eine separate ioBroker-Historien-/Zeitreihendatenbank.
- Falls eine zu große states.jsonl-Datei den Start des js-Controllers bereits verhindert, muss sie extern repariert werden, bevor PoolControl ausgeführt werden kann.

**Chemie-Werkzeuge**

- pH Plus Rechner
pH-Minus-Rechner
- Salzrechner
- Manuelle Berechnungshilfen
- Unterstützung für das Vorfüllen des Poolvolumens
- Optionale manuelle Wertüberschreibung
- Ergebnistexte mit Validierung und Fehlerbehandlung

-Keine automatische Chemikaliendosierung

Nur zur Information

- **KI-System**
- Wetterhinweise (Open-Meteo)
- Poolempfehlungen
- Tageszusammenfassung
- Wochenendbericht
- Wettervorhersage für morgen
- Optionale Sprachausgabe
- Duplikat-Kontextverfolgung

- **Hilfe im Fach Chemie**
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

### 1.4.0 (2026-06-29)

- Added a reset button for pump learning to quickly clear learned values after a pump replacement or incorrect learning while keeping user settings intact.
- Made the daily circulation factor writable and persistent. The adapter configuration is now only used as the initial value, allowing adjustments directly via states (e.g. VIS or HomePanel).
- Added an optional temperature-dependent circulation factor that automatically increases the required daily circulation based on a selectable temperature sensor and configurable threshold.
- Extended the existing time control with an optional interval mode. Each time window can now operate either continuously or in configurable intervals without introducing a new pump mode.
- Added new diagnostic states and multilingual status messages to improve transparency and troubleshooting for the new circulation and time control features.

### 1.3.35 (2026-06-29)

- Fixed an inconsistency in the daily circulation calculation.
- `circulation.daily_remaining` is now recalculated together with `circulation.daily_required`.
- Changing the pool size or minimum daily circulation now produces consistent values immediately after adapter restart.
- The remaining daily circulation is no longer blocked by zero flow or a stopped pump.

### 1.3.34 (2026-06-27)

- **Major stability improvement:** Completely redesigned the internal chemistry history (pH, ORP and TDS) to prevent unbounded JSON state growth. This significantly reduces the risk of oversized `states.jsonl` files and potential js-controller startup failures.
- **New two-stage history architecture:** Chemistry history now uses a compact short-term history for recent measurements together with a dedicated daily history for long-term trends. All existing 24-hour, 7-day and 30-day trend calculations and reports remain fully available.
- **Protected history storage:** Added strict limits for chemistry history sample count and JSON size. Oversized or invalid history states are now safely detected, validated and handled before being processed.
- **Daily aggregates introduced:** Added compact daily aggregates for pH, ORP and TDS containing minimum, maximum, average and last measurement together with the number of valid samples. This preserves long-term trend analysis without storing large raw histories.
- **Additional safeguards:** Added size protection for the solar logbook and debug log to prevent uncontrolled state growth.
- **Maintenance:** Updated the `@iobroker/adapter-core` dependency to the latest recommended version.

## License
Copyright (c) 2026 D. Bertin (DasBo1975) <dasbo1975@outlook.de>  

MIT License