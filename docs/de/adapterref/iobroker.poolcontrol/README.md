---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.poolcontrol/README.md
title: ioBroker.poolcontrol
hash: AUZm+yNMfbmjhuKgqNXr2p7rtC4oa5hyZ0yUVgZgxuQ=
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
Der Adapter ioBroker.poolcontrol dient zur Steuerung und Überwachung von Poolsystemen.
Er ermöglicht die Automatisierung von Pumpen-, Temperatur- und Solarsteuerung sowie die Analyse des Energieverbrauchs.

---

## Merkmale
- **Pumpensteuerung**
Betriebsmodi: Automatik, Automatik (PV), Manuell, Zeitsteuerung, Aus
Die automatische (PV-)Steuerung regelt die Pumpe in Abhängigkeit vom Photovoltaik-Überschuss.
- Fehlererkennung (kein Stromverbrauch, Stromaufnahme trotz „AUS“, Überlastung)
- Sicherheitsfunktionen (Frostschutz, Überhitzungsschutz)
- Pumpenleistungsempfehlung für drehzahlvariable Pumpen

- **Temperaturmanagement**
- Bis zu 6 Sensoren (Oberfläche, Boden, Durchfluss, Rücklauf, Sammler, Außentemperatur)
- Tägliches Minimum / Maximum
- Stündliche Änderung
- Unterschiede (z. B. Kollektor – Luft, Oberfläche – Boden, Vorlauf – Rücklauf)

- **Solarstromversorgung**
- Ein-/Ausschaltschwellen mit Hysterese
- Warnung des Datensammlers (mit automatischer Rücksetzung bei 10 % unterhalb des Schwellenwerts)
- Optionale Sprachausgabe bei Warnung

- **Heizungs-/Wärmepumpensteuerung (neu, Testphase)**
- Automatische Steuerung des Heizstabs oder der Wärmepumpe in Abhängigkeit von der Pooltemperatur
- Zieltemperatur und maximale Sicherheitstemperatur konfigurierbar
- Nur aktiv, wenn:
Die Poolsaison ist aktiv
- Pumpenmodus **Automatisch**
- Der Wartungsmodus ist nicht aktiv
- Prioritätslogik:
- Der Wartungsmodus blockiert die Heizungssteuerung vollständig.
Die Heizung beeinträchtigt weder den manuellen noch den zeitgesteuerten Pumpenbetrieb.
- Konfigurierbare Nachlaufzeit der Pumpe nach Ende der Aufheizphase
- Eigentumsschutz:
Die Pumpe schaltet sich nur dann ab, wenn sie zuvor vom HeatHelper selbst eingeschaltet wurde.
- Unterstützt:
- schaltbare Steckdosen **oder**
- Boolesche Steuerungszustände externer Heizsysteme
- Interner Status- und Diagnosebereich unter `heat.*`
- Rein kontrollierend, **ohne Chemie oder Solarlogik**

**Hinweis:** Diese Funktion befindet sich derzeit in der Testphase.
Die Logik ist vollständig implementiert, sollte aber zunächst nur von interessierten Testnutzern verwendet werden.

- **Photovoltaik-Steuerung (seit Version 0.6.0)**
- Automatische Pumpensteuerung basierend auf PV-Erzeugung und Haushaltsverbrauch
- Startlogik: Überschuss ≥ (Pumpennennleistung + Sicherheitsmarge)
- Optionaler Überlauf bei Bewölkung
- Ignorieren, wenn das tägliche Auflagenziel erreicht wurde
- Konfiguration über zwei Fremdobjekt-IDs (power_generated_id, power_house_id)
- Neuer Pumpenmodus „Automatisch (PV)“

- **Zeitsteuerung**
- Bis zu 3 frei konfigurierbare Zeitfenster pro Woche

- **Laufzeit & Auflage**
- Zählt die Laufzeit (heute, gesamt)
- Berechnet den täglichen Umlauf und das verbleibende Volumen
- Rückspülerinnerung mit konfigurierbarem Intervall (z. B. alle 7 Tage)
- Anzeige der letzten Rückspülung einschließlich Datum
- Automatischer Reset nach abgeschlossener Rückspülung
- Der PV-Modus berücksichtigt den Zirkulationsstatus (z. B. „Ignorieren, wenn Zirkulation erreicht ist“)

- **Verbrauch & Kosten**
- Bewertung eines externen kWh-Zählers
- Täglicher, wöchentlicher, monatlicher und jährlicher Verbrauch
- Berechnung der Stromkosten auf Basis eines konfigurierbaren Preises

**Hinweis:** Einzelheiten zum Verhalten der Verbrauchs- und Kostenwerte (z. B. nach Neustarts oder beim Austausch des Stromzählers) finden Sie hier:

- [Dokumentation (Englisch)](https://github.com/DasBo1975/ioBroker.poolcontrol/blob/main/docs/en/help.md)
- [Dokumentation (Deutsch)](https://github.com/DasBo1975/ioBroker.poolcontrol/blob/main/docs/de/help.md)

- **Statistiksystem**
- Abschnitt `analytics.statistics.*` mit täglichen, wöchentlichen und monatlichen Werten
- Automatische Berechnung von Minimal-, Maximal-, Durchschnitts- und Laufzeitwerten
- Vollständig persistente Datenpunkte (Überinstallationsschutz)
- HTML- und JSON-Zusammenfassungen pro Sensor und Gesamtübersicht

- **Integration eines Drucksensors (ab Version 0.7.x)**
- Echtzeit-Filterdruckmessung
- Trendanalyse: steigend / fallend / stabil
- Gleitender Lerndurchschnitt (avg_bar)
- Selbstlernende minimale/maximale Druckwerte
- Diagnosetext + letzte Aktualisierung
- Keine automatische Steuerung – rein informativ
- Normaler Druckbereich, vom Benutzer konfigurierbar

- **KI-System (ab Version 0.8.0)**
- Module: Wetterhinweise (Open-Meteo), Pool-Tipps, Tageszusammenfassung, Wochenendbericht
- Automatische Textausgabe mit optionaler Sprachausgabe
- Stündliche Wetteraktualisierungen für ständige Aktualisierung
- Anti-Spam-System zur Vermeidung doppelter Hinweise

- **Vorhersage für morgen (aiForecastHelper, ab Version 0.8.0)**
- Erstellt automatisch eine tägliche Wettervorhersage für den nächsten Tag
- Analyse von Temperatur, Wetterlage, Regenwahrscheinlichkeit und Windstärke
- Erstellt Poolempfehlungen für den folgenden Tag (z. B. Abdeckung schließen, geringe Sonneneinstrahlung zu erwarten)
- Vollständig ereignisbasiert und benötigt lediglich Open-Meteo-Daten von ioBroker Geodata
- Separate Schalter unter `ai.weather.switches.*` zum Aktivieren/Deaktivieren einzelner Vorhersagefunktionen
- Ergebnisse gespeichert unter `ai.weather.outputs.forecast_text`

- **Chemiehilfe (aiChemistryHelpHelper, ab Version 0.8.x)**
- Interaktive, rein informative KI-Hilfe für die Wasserchemie
- Auswahl typischer Poolprobleme über ein Auswahlfeld (z. B. pH-Wert zu hoch/niedrig, Chlor unwirksam, grünes/trübes Wasser)
- Klare Ursachen- und Lösungsbeschreibungen als Textausgabe
- Keine automatische Dosierung
Keine Produktempfehlungen
- Keine Gerätesteuerung
- Keine Sprachausgabe (rein visuelle Information)
- Ziel: Ursachen verstehen und systematisch vorgehen (messen → korrigieren → filtern → erneut messen)
- Datenpunkte unter `ai.chemistry_help.*`

- **Info-System (seit Version 0.7.x)**
- Adapterinformationssystem
- Festliche Grüße (Weihnachten, Silvester, Neujahr, Ostern)
- Anzeige der installierten Adapterversion

- **Sprachausgabe**
- Ausgabe über Alexa oder Telegram
- Durchsagen zum Starten/Stoppen der Pumpe, zu Fehlern oder Temperaturschwellenwerten

- **SystemCheck (Diagnosebereich)**
- Interner Diagnosebereich für Debugging- und Überwachungsfunktionen
- Auswahl des zu überwachenden Bereichs (z. B. Pumpe, Solaranlage, Temperatur)
- Kontinuierliches Protokoll der letzten Änderungen
- Manuelle Protokolllöschung möglich

Dieser Abschnitt dient ausschließlich der Analyse und Fehlerbehebung. Im Normalbetrieb sollte die Überwachung deaktiviert bleiben.

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
- Steuerung der Poolbeleuchtung, Ventile und Gegenstromanlagen
- Integration zusätzlicher Sensorboxen (z. B. TempBox, PressureBox, LevelBox)
- Erweiterung für KI und Sprachassistenten (täglicher Poolbericht, Tipps, Sprachbefehle)

---

## Notiz
Der Adapter wird aktiv weiterentwickelt.
Neue Funktionen werden regelmäßig hinzugefügt – bitte beachten Sie das Änderungsprotokoll.

---

## Dokumentation
- [help.md (ausführliche Beschreibung und Hinweise)](./help.md)

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

## Changelog

### 1.2.20
Release: 11.04.2026
- (DasBo) Reduced unnecessary state writes in status and photovoltaic helpers. Summary and PV timestamps are now only updated when the functional result actually changes, making the adapter quieter without affecting existing logic.

### 1.2.19
Release: 10.04.2026
- Fixed an interaction issue between `photovoltaicHelper` and `controlHelper` where automatic follow-up pumping could be stopped unexpectedly
- photovoltaicHelper now respects controlHelper priority and no longer stops the pump while automatic follow-up pumping is active
- Fixed an issue where `controlHelper` could remain in "nachpumpen" state if the pump was stopped externally
- `photovoltaic.threshold_w` is now correctly synchronized with the instance configuration
- Changes to the PV surplus threshold in adapter settings are now reliably reflected in the corresponding read-only datapoint

### 1.2.18
Release: 07.04.2026
- Fixed persistence issue for `status.season_active` (no longer overwritten on adapter start)
- Improved persistence for frost protection settings

### 1.2.17
Release: 07.04.2026
- Fix: Resolved an issue where the pressure learning reset button did not trigger reliably. The pumpHelper4 now explicitly subscribes to its relevant internal states to ensure proper event handling.

### 1.2.15
Release: 22.03.2026
- Fix i18n usage (replace I18n.t with I18n.translate) to resolve adapter startup crash and restart loop on certain systems.


*(older versions are automatically moved to CHANGELOG_OLD.md)*

---

## License

PoolControl is an open-source project developed by D. Bertin (DasBo1975).

- The name PoolControl and the associated logo are original developments and may be freely used within the scope of the open-source publication (adapter, GitHub repository, wiki, documentation, visualizations).

- Commercial use, redistribution or publication in modified form (especially as part of a commercial product or service) requires the explicit permission of the author.

- All developed sensor, hardware and enclosure constructions (e.g., temperature, pressure, level, electronics or control boxes) including designs, schematics, 3D models and internal constructions are subject to the copyright of D. Bertin (DasBo1975).

- Publication, reproduction for resale or commercial use of these hardware designs is only permitted with written authorization from the author.

The software source code of this project is licensed under the MIT License. See LICENSE for details.

---

## License
Copyright (c) 2026 D. Bertin (DasBo1975) <dasbo1975@outlook.de>  

MIT License