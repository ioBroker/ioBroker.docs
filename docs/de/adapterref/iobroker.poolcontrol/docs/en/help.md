---
chapters: {"pages":{"en/adapterref/iobroker.poolcontrol/README.md":{"title":{"en":"ioBroker.poolcontrol"},"content":"en/adapterref/iobroker.poolcontrol/README.md"},"en/adapterref/iobroker.poolcontrol/docs/en/help.md":{"title":{"en":"PoolControl – Help & Documentation"},"content":"en/adapterref/iobroker.poolcontrol/docs/en/help.md"},"en/adapterref/iobroker.poolcontrol/docs/en/function_overview.md":{"title":{"en":"PoolControl – Function Overview"},"content":"en/adapterref/iobroker.poolcontrol/docs/en/function_overview.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.poolcontrol/docs/en/help.md
title: PoolControl - Hilfe & Dokumentation
hash: ov/UJJjt7SR8BRGNek/qpa2wpld1NdWmCBs/Rpc3/Gw=
---
<!-- PoolControl Help File – maintained manually. Do NOT remove this header. -->

# PoolControl – Hilfe & Dokumentation

Willkommen zur Hilfedatei des Adapters **ioBroker.poolcontrol** .\
&#x20;Diese Dokumentation erläutert alle Einstellungen, Datenpunkte und automatischen Funktionen des Adapters in einer Mischung aus verständlichen Erklärungen und technischen Details.

---

# 📚 Inhaltsverzeichnis

1. [Einführung und Grundprinzipien](#introduction--basic-principles)
2. [Überblick – Was bewirkt der Adapter?](#overview--what-does-the-adapter-do)
3. [Administratorkonfiguration (Registerkarten)](#admin-configuration-tabs)
   - [3.1 Allgemeine Einstellungen](#31-general-settings)
   - [3.2 Pumpe](#32-pump)
   - [3.3 Temperaturmanagement](#33-temperature-management)
   - [3.4 Solarmanagement](#34-solar-management)
   - [3.5 Photovoltaik (PV)](#35-photovoltaics-pv)
   - [3.6 KI-System](#36-ai-system)
   - [3.7 Sprachausgabe](#37-speech-outputs)
   - [3.8 Zeitkontrolle](#38-time-control)
   - [3.9 Debuggen & Systemprüfung](#39-debug--systemcheck)
4. [Objektbaum – Erläuterung der Datenpunkte](#object-tree--data-points-explained)
5. [Automatische Logiken und Hilfsfunktionen](#automatic-logics--helpers)
6. [Fehlererkennung und Warnungen](#error-detection--warnings)
7. [Sprachausgabe und Benachrichtigungen](#speech-outputs--notifications)
8. [Häufig gestellte Fragen & Tipps](#faq--tips)

---

# 1. Einleitung und Grundprinzipien

Der PoolControl-Adapter automatisiert und überwacht Ihr gesamtes Poolsystem:

- Pumpensteuerung
- Temperaturmanagement
- Solarkontrolle
- Photovoltaik-Unterstützung
- Analyse von Drucksensoren
- Verbrauchs- und Kostenverfolgung
- Status- und Diagnosefunktionen
- KI-basierte Wetter- und Pool-Tipps
- Rückspülung, Wartungsmodus und Nachpumpen

Alle Datenpunkte sind im Objektbaum strukturiert und stehen für VIS, Blockly und andere Adapter zur Verfügung.

---

# 2. Überblick – Was leistet der Adapter?

### ✔ Vollautomatische Pumpensteuerung

Solar, PV, Frost, Zeitmodus, Wartung, Rückspülung, Nachpumpen.

### ✔ Temperaturauswertung

Bis zu 6 Sensoren mit Minimal-/Maximalwerten und Differenzen.

### ✔ Solarsteuerung mit Hysterese

Automatisches Ein-/Ausschalten der Pumpe.

### ✔ Photovoltaik-Modus

Die Pumpe läuft, wenn ein PV-Überschuss vorhanden ist.

### ✔ Anpassbarer Zirkulationsfaktor

`general.min_circulation_per_day` ist der beschreibbare und persistente Basiszirkulationsfaktor (0,5 bis 3,0). Der Admin-Wert ist nur ein Anfangswert; Änderungen wirken sich aus`circulation.daily_required` Und`circulation.daily_remaining` Die

Optional,`control.circulation.temperature_factor.*` erhöht den Effektivwert ab einem festgelegten Temperaturschwellenwert. Der Basiswert bleibt unverändert, der Effektivwert wird wie folgt angezeigt:`general.min_circulation_effective_per_day` und ist auf begrenzt`3.0` Der ausgewählte Temperatursensor muss aktiviert sein und einen gültigen Wert liefern.

### ✔ Integration eines Drucksensors

Trend, Lernwerte, Normalbereich, Diagnostik.

### ✔ Pumpenlernwerte zurücksetzen

`pump.learning.reset` Setzt gelernte Pumpenwerte nach Pumpenwechseln oder fehlerhafter Anlernung zurück.`pump.learning.tolerance_percent` wird beibehalten; das Lernen bleibt passiv und schaltet die Pumpe nicht um.

### ✔ KI-System

Tageszusammenfassungen, Wetterhinweise, Pooltipps, Wochenendberichte.

### ✔ Verbrauch & Kosten

Automatische tägliche, wöchentliche, monatliche und jährliche Statistiken.

### ✔ Statussystem

Zentrale Übersicht zur Visualisierung.

---

# 3. Administratorkonfiguration (Registerkarten)

Die Konfiguration erfolgt über mehrere Registerkarten in der Instanz.

---

## 3.1 Allgemeine Einstellungen

**Poolname**\
&#x20;Reiner Displaytext.

**Poolgröße (Liter)**\
&#x20;Wird zur Zirkulationsberechnung verwendet.

**Minimaler Zirkulationsfaktor pro Tag**\
&#x20;Beispiel: 2 bedeutet, dass das gesamte Poolvolumen zweimal täglich umgewälzt werden soll.

**Saison aktiv**\
&#x20;Wichtig für automatische Funktionen:

- **wahr** : Alle Automatisierungen aktiv
- **Falsch** : Automatisierung deaktiviert, nur der Frostschutz bleibt aktiv

Der tatsächliche Zustand befindet sich im Objektbaum unter`status.season_active` Die

---

## 3.2 Pumpe

**Ein/Aus:**\
&#x20;→`pump.pump_switch`

**Modus:**\
&#x20;→`pump.mode`

Mögliche Werte:

- `auto`
- `manual`
- `time`
- `off`
- `controlHelper` (wird automatisch vom Adapter eingestellt)
- `pv` (Photovoltaik-Modus)

**Zusätzliche Einstellungen:**

- Maximale Leistung (Watt)
- Maximaler Durchfluss (l/h)
- Objekt-ID des Sockets
- Frostschutz aktiv + Temperaturwert

---

## 3.3 Temperaturmanagement

Bis zu 6 Sensoren:

- Oberfläche
- Unten
- Fließen
- Zurückkehren
- Kollektor
- Außentemperatur

Für jeden Sensor:

- Kontrollkästchen „verwenden“
- Objekt-ID auswählen

Temperaturwerte werden verwendet für:

- Solarkontrolle
- Frostschutz
- Diagnostik
- KI-Texte

---

## 3.4 Solarmanagement

Einstellungen:

- Solarsteuerung aktivieren
- Hysterese aktivieren
- Einschaltschwelle (`temp_on` )
- Abschaltschwelle (`temp_off` )
- Sonnenwarnungen aktivieren

Die Solarsteuerung funktioniert nur im **Automatikmodus** .

Weitere Live-Datenpunkte zeigen den aktuellen Unterschied auf`solar.collector_surface_delta` für Standard-Solar- und`solar.extended.collector_pool_reference_delta` für Solar Extended. Diese Werte sind für VIS, Skripte, Dashboards und Auswertungen vorgesehen.

Hinweis: Änderungen an der Referenz für Solar Extended-Pools (`solar.extended.pool_temperature_source` ) werden automatisch zur Laufzeit angewendet. Ein Neustart des Adapters ist nicht erforderlich. Da Solar Extended mit einem zyklischen Prüfintervall arbeitet, werden Aktualisierungen der Berechnung, der Steuerlogik und der`solar.extended.collector_pool_reference_delta` Der Vorgang kann bis zu etwa 60 Sekunden dauern.

---

## 3.5 Photovoltaik (PV)

Einstellungen:

- PV-Automatisierung aktiv
- Objekt-ID der aktuellen PV-Leistung
- Einschaltschwelle (z. B. 150 W Überschuss)

Falls aktiv:

- Pumpenmodus zeigt „Automatisch (PV)“ an
- Die Pumpe läuft mit PV-Überschuss.
- Schaltet sich automatisch ab, wenn der Schwellenwert unterschritten wird.

---

## 3.6 KI-System

### **Hauptschalter (ai.aktiviert)**

| Datenpunkt   | Bedeutung                               |
| ------------ | --------------------------------------- |
| KI aktiviert | Hauptschalter für das gesamte KI-System |

Das KI-System besteht derzeit aus zwei Modulen:

- aiHelper (Wetter- und Alltagsfunktionen)
- aiForecastHelper (Vorhersage für morgen)

Das KI-System generiert automatisch täglich:

- Wettervorhersage
- Tageszusammenfassungen
- Pool-Tipps
- Wochenendberichte
- Wettervorhersage für morgen

### **Schalter (ai.weather.switches.)**

| Datenpunkt                                      | Bedeutung                      |
| ----------------------------------------------- | ------------------------------ |
| ai.weather.switches.allow\_speech               | Gibt auch aus an`speech.queue` |
| ai.weather.switches.daily\_summary\_enabled     | Tageszusammenfassung           |
| ai.weather.switches.daily\_pool\_tips\_enabled  | Pool-Tipps                     |
| ai.weather.switches.weather\_advice\_enabled    | Wettervorhersage               |
| ai.weather.switches.weekend\_summary\_enabled   | Wochenendbericht               |
| ai.weather.switches.debug\_mode                 | Zusätzliche Protokolleinträge  |
| ai.weather.switches.tomorrow\_forecast\_enabled | Prognose für morgen aktiv      |

### **Zeitpläne (ai.weather.schedule.)**

- tägliche Zusammenfassung
- tägliche Pool-Tipps
- Wettervorhersagezeit
- Wochenendzusammenfassung
- morgen\_vorhersagezeit

Alle Werte im Format HH:MM.

### **Ausgaben (ai.weather.outputs.)**

Hier erscheinen Texte, die von VIS oder anderen Adaptern verwendet werden können.

Das KI-System benötigt Geodaten aus **der Datei system.config** .

---

## 3.7 Sprachausgabe

- Sprachausgabe aktivieren
- Textnachrichten für Pumpenstart/-stopp
- Letzte Sprachausgabe
- Optional: E-Mail-Benachrichtigung aktivieren
- Alle Ausgaben werden über **speech.queue** gesendet.

---

## 3.8 Zeitkontrolle

Bis zu **drei Zeitfenster** :

- Startzeit
- Endzeit
- Wochentage
- optionaler Intervallbetrieb mit Intervallperiode und Laufzeit

Nur aktiv, wenn`pump.mode = time` Die

Der Intervallbetrieb wird für jedes Fenster separat aktiviert durch`timecontrol.timeX_interval_active` Standardmäßig startet die Pumpe alle 60 Minuten und läuft 15 Minuten lang; der Zyklus ist stets an den Startzeitpunkt im Zeitfenster gekoppelt. Bei deaktiviertem Intervallbetrieb bleibt der bestehende Dauerbetrieb unverändert.

Überlappende Zeitfenster verwenden eine ODER-Verknüpfung: Die Pumpe bleibt so lange in Betrieb, wie mindestens ein Zeitfenster aktuell einen Betrieb anfordert. Ein Intervall endet logisch spätestens zum festgelegten Endzeitpunkt; da die bestehende 60-Sekunden-Prüfung unverändert bleibt, kann sich der physische Schalter um fast 60 Sekunden verzögern. Ungültige Intervallwerte werden nicht geändert und führen zu einem kontinuierlichen Betrieb innerhalb des Zeitfensters.`timecontrol.status_text` zeigt den aktuellen Diagnosestatus an.

---

## 3.9 Debuggen & Systemprüfung

Der Abschnitt`systemcheck.debug_logs` bietet:

- Auswahl eines Zielbereichs (Pumpe, Solar, Laufzeit, Steuerung usw.).
- Kontinuierliches Protokoll
- Protokoll löschen

Diese Funktion dient der Diagnose, sollte aber im Normalbetrieb deaktiviert bleiben.

---

# 4. Objektbaum – Erläuterung der Datenpunkte

### Die wichtigsten Hauptbereiche:

- `pump.*`
- `pump.pressure.*`
- `temperature.*`
- `solar.*`
- `photovoltaic.*`
- `runtime.*`
- `circulation.*`
- `consumption.*`
- `control.*`
- `status.*`
- `info.*`
- `ai.*`
- `systemcheck.*`

Die Struktur ist so gestaltet, dass sie im Objektbaum selbsterklärend ist.\
&#x20;Alle Bundesstaaten haben beschreibende Namen und Beschreibungen.

### **Plausibilitätsprüfung für die Zirkulationsberechnung**

Der Kanal`circulation.plausibility` Enthält Diagnosewerte für die Zirkulationsberechnung. PoolControl prüft, ob die gemessene Pumpenleistung, die berechnete Durchflussrate oder Sprünge im täglichen Zirkulationsvolumen unplausibel erscheinen.

Dieses Diagnosemodul dient ausschließlich der Analyse. Es korrigiert keine Werte automatisch und ändert weder die Pumpensteuerung, die PV-Logik, die Solarlogik noch die Zirkulationsberechnung. Die gespeicherten Zustände helfen bei der Fehlersuche bei ungewöhnlichen Zirkulationswerten, wie z. B. plötzlichen Sprüngen in der Tagesgesamtmenge.

---

# 5. Automatische Logiken und Hilfsfunktionen

Der Adapter enthält verschiedene Hilfsdateien, die für spezifische Aufgaben zuständig sind.

### **PumpHelper**

Steuert grundlegende Pumpenfunktionen.

### **PumpHelper4 (Drucksensor)**

Prozesse:

- Aktueller Druck
- Vorheriger Wert
- Trend (steigend/fallend/stabil)
- Lernsystem für Min/Max
- Diagnosetext

### **SolarHelper**

Steuert den Solarbetrieb einschließlich der Hysterese.

### **Photovoltaik-Helfer**

Automatische Pumpensteuerung basierend auf PV-Überschuss.

### **FrostHelper**

Die Pumpe schaltet sich automatisch ein, wenn die eingestellte Temperatur unterschritten wird.

### **RuntimeHelper**

Berechnet Laufzeit und Umlauf. Außerdem werden unter „Diagnosewerte, die nur für die Analyse verwendet werden, ausgegeben“ ein Eintrag erstellt.`circulation.plausibility` um unplausible Eingabe- oder Berechnungswerte sichtbar zu machen.

### **Konsumhelfer**

Täglicher, wöchentlicher, monatlicher und jährlicher Verbrauch.

### **ControlHelper**

Funktionen:

- Rückspülung
- Wartungsmodus
- Nach dem Abpumpen (Zirkulationskontrolle)
- Benachrichtigungen

Die automatische Zusatzpumpfunktion dient dazu, das tägliche Umwälzziel zu erreichen. Sie benötigt in der Regel keine Temperaturwerte. Ist die Solarsteuerung aktiv und liegen sowohl die Kollektor- als auch die Pooltemperatur im zulässigen Bereich, wird die Zusatzpumpfunktion deaktiviert, solange der Kollektor nicht wärmer als der Pool ist.

### **InfoHelper**

- Adapterversion
- Saisonale Grüße einschließlich Osterberechnung

### **KI-Helfer**

- Wetterabruf (Open-Meteo)
- Textgenerierung
- Zeitpläne
- Anti-Spam-Logik

### **DebugLogHelper**

- Echtzeitüberwachung bestimmter Bereiche

---

# 6. Fehlererkennung und Warnungen

Der Adapter erkennt automatisch:

- Trockenübung
- Überlast
- Strom trotz AUS
- Druckabweichungen
- Sonnenwarnungen
- Rückspülerinnerungen

Fehler werden angezeigt in`pump.error` Und`pump.status` Die

---

# 7. Sprachausgabe und Benachrichtigungen

Alle Sprachausgaben werden gesendet über`speech.queue` Die\
&#x20;Je nach Konfiguration können auch E-Mails versendet werden.

---

## Zweistufige begrenzte Chemiegeschichte

Die bestehenden pH-, TDS- und ORP-Probenzustände (samples\_json) bilden weiterhin den 15-minütigen Kurzzeitverlauf: maximal 7 Tage, 672 Proben und 64 KB UTF-8-Daten pro Zustand. Für die bestehenden 30-tägigen Auswertungen speichert der Adapter zusätzlich einen internen Ringpuffer (daily\_json) mit den lokalen Kalendertagen pro Chemietyp. Dieser enthält Minimum, Maximum, Durchschnitt, letzten Wert und Anzahl der Messwerte und umfasst maximal 32 Einträge (8 KB).

Die 24-Stunden- und 7-Tage-Vergleiche verwenden samples\_json; der 30-Tage-Vergleich verwendet vorzugsweise den letzten Wert aus dem entsprechenden daily\_json-Aggregat. Alle vorhandenen Referenz-, Delta-, Trend- und Zusammenfassungszustände bleiben erhalten. Bei der Ersteinrichtung werden ein noch gültiger, vorhandener skalarer 30-Tage-Referenzwert und sicher lesbare Legacy-Werte in den Tagespuffer eingefügt; anschließend wird dieser für jeden neu gespeicherten gültigen Wert aktualisiert. Zu große Legacy-Werte werden vor dem JSON-Parsing verworfen. Die kompakten Tagesaggregate ersetzen nicht die Rohdaten. Rohdaten über einen längeren Zeitraum gehören in eine ioBroker-Historien- oder Zeitreihendatenbank.

Falls eine bereits zu große states.jsonl-Datei den Start des js-Controllers verhindert, muss diese zunächst manuell oder mithilfe externer Wiederherstellungstools repariert werden. Der Adapter kann diesen Zustand erst behandeln, nachdem der Controller erfolgreich gestartet wurde.

# 8. Häufig gestellte Fragen & Tipps

**1. Warum passiert nichts, obwohl die KI aktiv ist?**\
&#x20;→ Prüfen Sie, ob die Datei system.config Breiten- und Längengradangaben enthält.

**2. Warum schaltet sich die Pumpe trotz Solaranlage nicht ein?**\
&#x20;→ Der Modus muss auf **„Auto“** eingestellt sein.

**3. Warum läuft PV nicht?**\
&#x20;→ Schwellenwert prüfen → Der PV-Wert muss über diesem Wert liegen.

**4. Warum zeigt der Drucksensor 0 bar an?**\
&#x20;→ Überprüfen Sie die Objekt-ID in der Admin-Konfiguration.

---

**Dateiende**