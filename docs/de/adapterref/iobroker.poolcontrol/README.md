---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.poolcontrol/README.md
title: ioBroker.poolcontrol
hash: eIqeTqHW3nUxOeSsKahRRpawR5LYEU09UCdSTpXrdSw=
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

## 1.2.19 (2026-04-10)
- Es wurde ein Interaktionsproblem zwischen `photovoltaicHelper` und `controlHelper` behoben, bei dem die automatische Nachpumpfunktion unerwartet gestoppt werden konnte.
- photovoltaicHelper berücksichtigt nun die Priorität von controlHelper und stoppt die Pumpe nicht mehr, solange die automatische Nachpumpfunktion aktiv ist.
- Es wurde ein Problem behoben, bei dem `controlHelper` im Zustand "nachpumpen" verbleiben konnte, wenn die Pumpe extern gestoppt wurde.
- `photovoltaic.threshold_w` ist nun korrekt mit der Instanzkonfiguration synchronisiert.
- Änderungen des PV-Überschussschwellenwerts in den Adaptereinstellungen werden nun zuverlässig im entsprechenden schreibgeschützten Datenpunkt widergespiegelt.

### 1.2.18
Veröffentlichung: 07.04.2026

- Problem mit der Persistenz von `status.season_active` behoben (wird beim Start des Adapters nicht mehr überschrieben)
- Verbesserte Beibehaltung der Frostschutzeinstellungen

### 1.2.17
Veröffentlichung: 07.04.2026

- Behoben: Ein Problem wurde behoben, bei dem die Reset-Taste für die Drucklernfunktion nicht zuverlässig funktionierte. Der pumpHelper4 abonniert nun explizit seine relevanten internen Zustände, um eine korrekte Ereignisbehandlung sicherzustellen.

### 1.2.15
Veröffentlichung: 22.03.2026

- Korrektur der i18n-Nutzung (Ersetzen von I18n.t durch I18n.translate) zur Behebung von Adapterstartabstürzen und Neustartschleifen auf bestimmten Systemen.

### 1.2.14
Veröffentlichung: 22.03.2026

- ### i18n-Unterstützung für Chemie-Hilfetexte hinzufügen

### 1.2.13
Veröffentlichung: 22.03.2026

- Mehrsprachige Ländernamen und -beschreibungen hinzugefügt (DE/EN)
- Verbesserte Einheitlichkeit aller staatlichen Texte
- Kleinere Text- und Strukturverbesserungen

### 1.2.12
Veröffentlichung: 21.03.2026

- Bereinigung und Fehlerbehebung des Repositorys für den ioBroker-Repository-Checker
- Das erforderliche native Objekt in io-package.json wurde wiederhergestellt.
- Ungültige Eigenschaften und veraltete Einträge entfernt
- Aktualisierte README-Datei

### 1.2.11
- Repository-Bereinigung (Probleme mit dem ioBroker-Checker behoben)
- Ungültige Eigenschaften aus io-package.json entfernt
- README aktualisiert

### 1.2.10 (2026-03-20)
- Verbesserte deutsche Übersetzungen in der Admin-Benutzeroberfläche (jsonConfig)
- Falsche und irreführende Terminologie korrigiert (z. B. Durchfluss- vs. Temperatursensoren)
- Verbesserte Konsistenz und Formulierung bei allen Konfigurationsoptionen

### 1.2.9
Veröffentlichung: 19.03.2026

- Fehlerbehebung: Fehlerhaftes gemeinsames Objekt im Laufzeitkanal korrigiert.

### 1.2.7
Veröffentlicht: 16.03.2026

- Korrigierte Rollendefinitionen für beschreibbare Zustände gemäß den ioBroker-Richtlinien
- Mehrere interne Lern- und Diagnosezustände sind auf schreibgeschützt eingestellt
- Veraltete Dateien aus dem Repository entfernt

### 1.2.6
Veröffentlicht: 12.03.2026

- Verbleibende Probleme mit der Adapterprüfung behoben
- Die Release-Skript-Plugins wurden auf die neuesten Versionen aktualisiert.
- Die verbleibenden Protokollmeldungen wurden ins Englische konvertiert.
- Dependabot-Konfiguration aktualisiert (GitHub-Actions-Ökosystem hinzugefügt)
- Reduzierung der `common.news`-Einträge in io-package.json, um den Repository-Anforderungen zu entsprechen

### 1.2.5
Veröffentlicht: 07.03.2026

- Es wurde ein Problem in `actuatorsHelper` behoben, bei dem Zustandsänderungen in bestimmten Situationen nicht korrekt verarbeitet wurden.
- Kleinere interne Verbesserungen und Stabilitätskorrekturen

### 1.2.4
Veröffentlichung: 07.03.2026

- Behoben: actuatorsHelper synchronisierte die Instanzkonfiguration nicht mit den internen Zuständen (aktiv/Name). Zusätzliche Aktoren konnten nicht aktiviert werden.

### 1.2.3
Veröffentlicht: 06.03.2026

- Native Timer (setTimeout / setInterval) wurden durch Adapter-Timer (adapter.setTimeout / adapter.setInterval) ersetzt.
- Korrekte Bereinigung der Timer beim Entladen des Adapters hinzugefügt.
- Interne Codebereinigung und Wartungsverbesserungen

### 1.2.2
Veröffentlicht: 06.03.2026

- Die erforderliche Administratorversion wurde auf >=7.6.20 angehoben.
- Aktualisierte Übersetzungen nach dem i18n-Refactoring von jsonConfig
- Wartungsupdate (keine funktionalen Änderungen)

### 1.2.1
Veröffentlicht: 06.03.2026

- Migration der Administratorkonfiguration in die i18n-Übersetzungsumgebung
- jsonConfig verwendet jetzt englische Bezeichnungen, deren Übersetzungen unter admin/i18n verwaltet werden.
- Übersetzungen, die mit `npm run translate` generiert wurden

### 1.2.0
Veröffentlicht: 15.02.2026

- Aktivierung der mehrsprachigen Unterstützung (i18n) in jsonConfig
- Zweisprachige Beschriftung (Deutsch/Englisch) der Instanzkonfiguration
- Keine funktionalen Änderungen am Adapter

## V1.1.0 Empfehlung zur Pumpenleistung (23.01.2026)
- **Empfehlung zur Pumpenleistung (ab Version 1.1.0)**
- Neuer passiver Abschnitt `pump.speed`
- Leitet einen klaren logischen Leistungszustand der laufenden Pumpe ab:
- `aus`, `frost`, `niedrig`, `normal`, `hoch`, `boost`
Der Leistungsstatus basiert ausschließlich auf Folgendem:
- bestehende Pumpenlogik
- aktiver Helfer (z. B. Frostschutz, Solarschutz, Wartung)
- aktueller Pumpenstatus
- Zusätzlich wird eine **empfohlene Pumpenleistung in Prozent (0–100%)** angegeben.
Die Prozentwerte sind **frei konfigurierbar** und **vor Überinstallation geschützt**.
- **Keine aktive Geschwindigkeitsregelung**
- **Keine Beeinträchtigung der bestehenden Pumpensteuerung**
- Zur Anbindung an externe Systeme vorgesehen, wie zum Beispiel:
- Shelly 0–10 V
- Frequenzumrichter
- Blockly / Skripte

## V1.0.0 Zusätzliche Aktuatoren (Beleuchtung & Hilfspumpen) (02.01.2026)
- Steuerung optionaler Poolaktuatoren:
- Poolbeleuchtung (bis zu 3 Kanäle)
- Zusatzpumpen / Attraktionen (bis zu 3 Kanäle)
- Vollständige Konfiguration über die Admin-Oberfläche:
- Aktivierung pro Aktor über Kontrollkästchen
- Zuweisung einer **externen Objekt-ID**

(z. B. umschaltbarer Socket oder boolescher Steuerungszustand)

- Unterstützte Betriebsarten:
- Ein/Aus
- Zeitgesteuerte Operation (Laufzeit in Minuten)
- Kontinuierlicher Betrieb
- Interne Status- und Kontrollzustände:
- aktueller Betriebszustand
- verbleibende Laufzeit
- Schaltzustand und Betriebsmodus
- Klare Systemtrennung:
- Zusätzliche Aktuatoren **nicht**

Pumpen-, Solar-, Heizungs- oder KI-Logik beeinflussen

- Rein optionale Systemerweiterung

## V0.9.0
- Einführung der Heizungs-/Wärmepumpensteuerung (`heatHelper`)
- Automatische Heizanforderung basierend auf der Pooltemperatur
- Ziel- und Maximaltemperatur konfigurierbar
- Unterstützung für:
- schaltbare Steckdosen
- boolesche Kontrollzustände
- Nachlaufzeit der Pumpe nach Ende der Aufheizung
- Prioritätensystem:
- Der Wartungsmodus blockiert die Heizungssteuerung
- Nur im Automatikmodus aktiv
- Berücksichtigt den Saisonstatus
- Eigentumsschutz für die Pumpensteuerung
- Neuer interner Status `heat.heating_request` zur externen Auswertung

## V0.8.2 (2025-12-25)
- Neues KI-Modul **Chemiehilfe** (`aiChemistryHelpHelper`)
- Rein informatives Unterstützungssystem für die Poolwasserchemie
- Auswahl typischer Poolprobleme (z. B. zu hoher/niedriger pH-Wert, unwirksames Chlor, grünes/trübes Wasser)
- Klare Hinweise zu Ursache und Lösung als Textausgabe
- Keine automatische Dosierung
Keine Produktempfehlungen
- Keine Geräte- oder Pumpensteuerung
- Keine Sprachausgabe (rein visuelle Information)
- Neue Datenpunkte unter `ai.chemistry_help.*`

## V0.8.0 (08.12.2025)
- Module: Wetterhinweise (Open-Meteo), Pool-Tipps, Tageszusammenfassung, Wochenendbericht
- Automatische Textausgabe mit optionaler Sprachausgabe
- Stündliche Wetteraktualisierungen für ständige Aktualisierung
- Anti-Spam-System zur Vermeidung doppelter Hinweise
- Das neue KI-Prognosesystem `aiForecastHelper` wurde integriert
- Erstellt täglich automatisch eine „Vorhersage für morgen“, die Folgendes beinhaltet:
- Temperaturbereich
- Wetterbeschreibung
- Regenwahrscheinlichkeit
- Windanalyse (leicht / mittel / stark)
- Poolempfehlungen für den folgenden Tag
- Neue Schalter, Zeitpläne und Ausgaben unter `ai.weather.*`
- Sofortige erste Ausführung nach Instanzstart hinzugefügt
- Erweiterte Administratorübersicht unter „Hilfe & Info“ mit wichtigen KI-Hinweisen
- Verbesserte interne Struktur des KI-Systems (aiHelper + aiForecastHelper)

## V0.7.4 (03.12.2025)
- Fehler in ControlHelper behoben. Permanenter Schutz für control.circulation.mode

## V0.7.0 (2025-11-29)
- Einführung eines neuen Drucksensorsystems unter `pump.pressure.*`
- Unterstützung für die Objekt-ID eines externen Drucksensors (bar-Wert von ioBroker)
- Trenderkennung (steigend/fallend/stabil) und gleitender Druckdurchschnitt
- Selbstlernende Minimal-/Maximaldruckwerte mit manueller Rücksetzfunktion
- Neuer Diagnosetext („status_text_diagnostic“) mit erweiterten Analyseinformationen
- Erweiterte Pumpenüberwachung ohne automatische Steuerungslogik (rein informativ)

## V0.6.2 (2025-11-07)
- Überarbeitung der Instanzübersicht mit neuen Kopfzeilenstrukturen für eine übersichtlichere Bedienung
- Neues Startseitenbild „Egon in Arbeitskleidung“ in die Admin-Oberfläche integriert
- Erweiterung des Sprachsystems um konfigurierbare Alexa-Ausgabezeiten
- Anpassungen und Bereinigungen in jsonConfig, speechHelper und speechStates

## V0.6.0 (03.11.2025)
- Einführung einer vollständigen Photovoltaik-Steuerung mit automatischer Pumpenlogik

(neuer Pumpenmodus `Automatic (PV)` unter `pump.mode`)

- Der Adapter reagiert auf PV-Überschuss basierend auf konfigurierbarem Haushaltsverbrauch und erzeugter Leistung
- Startlogik: Pumpe EIN, wenn Überschuss ≥ (Nennleistung + Schwellenwert)
- Berücksichtigt den Saisonstatus, die Überlaufzeit und den optionalen Schutz „Auflauf erreicht“.
- Die automatische Migration fügt bestehenden Installationen den neuen Modus `auto_pv` hinzu.
- Verbesserte interne Logik, Persistenz und Debug-Protokollierung

## V0.5.5 (2025-11-01)
- Endlosschleife in den wöchentlichen und monatlichen Statistiken behoben

## V0.5.3 (30.10.2025)
- Auswahlmöglichkeit für Telegram-Nutzer hinzugefügt

## V0.5.2 (30.10.2025)
## V0.5.0 (2025-10-28)
### **0.4.0 (26.10.2025)**
**Neue Funktionen**

- Einführung des neuen Statistiksystems unter `analytics.statistics.temperature.today`
- Automatische Erfassung von **Minimal-, Maximal- und Durchschnittswerten** aller aktiven Temperatursensoren
- Pro Sensor: JSON- und HTML-Zusammenfassungen mit kontinuierlichen Aktualisierungen
- Gesamtausgabe aller Sensoren (Tabelle) unter

`analytics.statistics.temperature.today.outputs.summary_all_html`

- Vollständig **persistente Datenpunkte** mit Überinstallationsschutz
- **Automatische Mitternachts-Zurücksetzung** für die tägliche Zurücksetzung inklusive Zeitstempel
- Vorbereitung auf zukünftige wöchentliche, monatliche und saisonale Statistiken

**Verbesserungen**

- Einheitliche Struktur durch neuen Hauptordner `analytics`
- Keine permanenten Schleifen oder Timerlast – reine Ereignisverarbeitung
- Verbesserte Leistung und Speicherstabilität
- Überarbeitete Initialisierung aller Statistikzustände beim Systemstart

**Hinweis:** Diese Version bildet die stabile Grundlage für alle nachfolgenden Statistik- und Analysefunktionen (z. B. wöchentliche und monatliche Statistiken, historische Daten und Effizienzbewertungen).

*(Ältere Versionen siehe [io-package.json](./io-package.json))*

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