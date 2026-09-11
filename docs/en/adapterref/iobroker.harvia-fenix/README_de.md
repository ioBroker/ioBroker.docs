---
chapters: {"pages":{"en/adapterref/iobroker.harvia-fenix/README.md":{"title":{"en":"ioBroker.harvia-fenix"},"content":"en/adapterref/iobroker.harvia-fenix/README.md"},"en/adapterref/iobroker.harvia-fenix/README_de.md":{"title":{"en":"ioBroker.harvia-fenix"},"content":"en/adapterref/iobroker.harvia-fenix/README_de.md"}}}
---
<p align="center">
  <img src="admin/harvia.png" alt="Logo" width="100" />
</p>

# ioBroker.harvia-fenix

**[Click here for the English version of the documentation.](/#/adapters/harvia-fenix)**

[![Downloads](https://img.shields.io/npm/dm/iobroker.harvia-fenix.svg)](https://www.npmjs.com/package/iobroker.harvia-fenix)
[![node](https://img.shields.io/node/v/iobroker.harvia-fenix.svg)](https://www.npmjs.com/package/iobroker.harvia-fenix)
[![License](https://img.shields.io/npm/l/iobroker.harvia-fenix.svg)](https://github.com/meistermopper/ioBroker.harvia-fenix/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/meistermopper/ioBroker.harvia-fenix.svg)](https://github.com/meistermopper/ioBroker.harvia-fenix/issues)
![Number of Installations](https://iobroker.live/badges/harvia-fenix-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/harvia-fenix-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.harvia-fenix.png?downloads=true)](https://nodei.co/npm/iobroker.harvia-fenix/)
![Test and Release](https://github.com/meistermopper/ioBroker.harvia-fenix/workflows/Test%20and%20Release/badge.svg)

### Ein ioBroker-Adapter zur Integration und Steuerung der **Harvia Fenix** Saunasteuerung über die MyHarvia Cloud-Infrastruktur.

Für weitere Informationen über Harvia und deren Saunasteuerungen besuche bitte die [offizielle Harvia-Website](https://www.harvia.com).

---

## ⚠️ KRITISCHER SICHERHEITSHINWEIS & HAFTUNGSAUSSCHLUSS
**Der Fernbetrieb eines Saunaofens unterliegt strengen Sicherheitsvorschriften!** Gemäß der europäischen Sicherheitsnorm **EN 60335-2-53** in Verbindung mit **EN 60335-1** sind Brandschutzmaßnahmen für Fernsteuerungssysteme zwingend erforderlich. Die Saunakabine muss mit einem zugelassenen Türsensor oder einem Sicherheits-Abschaltsystem ausgestattet sein. Dies stellt sicher, dass der Ofen nicht aus der Ferne oder per Timer gestartet werden kann, wenn ein brennbarer Gegenstand (z. B. ein Handtuch) auf oder in der Nähe des Ofens vergessen wurde.

* **Keine Haftung:** Der Entwickler dieses Adapters übernimmt absolut keine Verantwortung, Gewährleistung oder Haftung für Schäden, Brände, Verletzungen oder rechtliche Probleme, die aus der Nutzung oder Fehlkonfiguration dieser Software resultieren. Du betreibst diese Integration vollständig auf eigenes Risiko.
* **Markenhinweis:** Harvia und MyHarvia 2 sind eingetragene Marken der Harvia Group. Dieser Adapter ist ein unabhängiges, gemeinschaftsbasiertes Open-Source-Projekt und wird weder offiziell von Harvia unterstützt, gesponsert noch betreut.

---

## Installation
Der Adapter ist im offiziellen ioBroker-Repository verfügbar. Du kannst ihn direkt über die ioBroker Admin-Weboberfläche installieren.

### Über ioBroker Admin
1. Öffne deine ioBroker-Weboberfläche in einem Browser (z. B. `192.168.1.33:8081`).
2. Klicke auf den Reiter **Adapter**.
3. Gib "harvia-fenix" in den Filter ein.
4. Klicke auf die drei Punkte und dann auf das "+"-Symbol des **Harvia Fenix** Adapters, um eine Instanz hinzuzufügen.

---

## Einrichtung (Setup)
Zusätzlich zur Adapterinstallation musst du die Adapterinstanz mit deinen MyHarvia-Kontodaten konfigurieren.

### Voraussetzungen
1. **Node.js >= 22**
2. Ein registriertes Konto in der offiziellen **MyHarvia 2** Smartphone-App.
3. Gültige Login-Daten:
   - **E-Mail-Adresse**
   - **Passwort**

*Hinweis: Es wird ein separates Konto für ioBroker in der Harvia 2 App empfohlen und diese Zugangsdaten in der Instanz zu verwenden.*

### ioBroker-Konfiguration
1. Öffne deine ioBroker-Oberfläche in einem Browser (z. B. `192.168.1.33:8081`).
2. Navigiere zum Reiter **Instanzen** und klicke auf das Einstellungs-Symbol deiner `harvia-fenix.0`-Instanz.
3. Gib die **E-Mail-Adresse** und das **Passwort** deines MyHarvia-Kontos ein.
4. Wenn du das Feld **Geräte-ID** leer lässt, sucht der Adapter beim Start automatisch nach Geräten, die mit deinem Konto verknüpft sind. Er verwendet das erste gefundene Gerät als aktive Einheit.
5. Passe bei Bedarf optionale Parameter an: **Abfrageintervall** (Sekunden), **Mindest-/Maximal-Zieltemperatur** (°C) und **Maximale Heizdauer** (Minuten).
6. Klicke auf **Speichern & Schließen**.

---

## Gerätekonfiguration & Multi-Geräte-Unterstützung

#### Automatische Erkennung (Discovery)
Wenn du das Feld **Geräte-ID** in den Adapter-Einstellungen leer lässt, sucht der Adapter beim Start automatisch nach Geräten, die mit deinem Konto verknüpft sind. Er verwendet das erste gefundene Gerät als aktive Einheit. Die erkannte ID wird im ioBroker-Log ausgegeben.

#### Manuelle Geräte-ID
Für die meisten Benutzer mit einer einzelnen Sauna ist die automatische Erkennung ausreichend. Es wird jedoch empfohlen, die erkannte ID aus dem Log zu kopieren und in die Konfiguration einzufügen, um eine dauerhaft stabile Verbindung zur spezifischen Hardware zu gewährleisten.

#### Mehrere Saunen
Wenn dein MyHarvia-Konto meherere Steuereinheiten verwaltet (z. B. eine zu Hause und eine im Ferienhaus):
1. Erstelle für jede Sauna eine eigene Instanz des Adapters (z. B. `harvia-fenix.0` und `harvia-fenix.1`).
2. Trage die jeweilige **Device ID** manuell in der Konfiguration der entsprechenden Instanz ein.
Dadurch kannst du beide Saunen unabhängig voneinander mit eigenen Datenpunkten überwachen und steuern.

### Geteilte Konten / Gast-Zugänge & Die Partner-ID

#### 🟢 Normalfall (Hauptkonto / Besitzer der Sauna)
Wenn du die Login-Daten des MyHarvia-Hauptkontos verwendest (mit dem die Sauna ursprünglich in der App eingerichtet wurde):
* Lasse sowohl die **Geräte-ID** als auch die **Partner-ID** in den Einstellungen **leer**.
* Der Adapter findet deine Sauna beim Start vollautomatisch.

#### 🟡 Sonderfall: Geteiltes Konto / Gast-Zugang (z. B. separates ioBroker-Konto)
Wurde die Sauna in der MyHarvia 2 App vom Besitzer für ein zweites Konto (Gast-Konto) freigegeben, liefert die automatische Suche der Cloud-API für dieses Gast-Konto grundsätzlich keine Geräte (`{"devices":[]}`). 

In diesem Fall **müssen** die **Geräte-ID (Device ID)** und die **Partner-ID des Hauptkontos** manuell in den Einstellungen eingetragen werden:

**Der 60-Sekunden-Trick, um an beide Werte zu kommen:**
1. Trage in der Adapter-Konfiguration kurz die Login-Daten des **Hauptkontos** (des Besitzers) ein und klicke auf **Speichern**.
2. Öffne das ioBroker-Log. Der Adapter findet die Sauna sofort und gibt folgende Zeilen aus:
   * `Found device: ... (ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)` ➡️ Das ist deine **Geräte-ID**.
   * `Using partner ID from user token: ORG/prod:0:6656` ➡️ Das ist deine **Partner-ID** (Standard: `ORG/prod:0:6656` oder `ORG/prod:0:6656:0`).
3. Kopiere beide Werte in die Zwischenablage.
4. Öffne die Einstellungen erneut, trage wieder die Zugangsdaten deines **Gast-Kontos** ein, füge die kopierte **Geräte-ID** und **Partner-ID** in die optionalen Felder ein und klicke auf **Speichern & Schließen**.

Danach steuert das Gast-Konto die Sauna dauerhaft und zuverlässig an!

---

## Kompatibilitätshinweis
* **Unterstützt:** **Harvia Fenix** Steuereinheiten, die über die **MyHarvia 2** App verwaltet werden.
* **NICHT unterstützt:** **Harvia Xenio** Serie (z. B. Xenio WiFi / CX001WIFI). Die Xenio-Serie basiert auf einem älteren Hardware-Ökosystem und verwendet die ältere *"MyHarvia for Xenio"* App, die grundlegend inkompatibel mit der von diesem Adapter verwendeten API ist.

---

## Verwendung (Usage)
### Verfügbare Datenpunkte
| Datenpunkt | Typ | Rolle | Zugriff | Beschreibung |
|---|---|---|---|---|
| `info.connection` | boolean | `indicator` | Nur Lesen | Verbindungsstatus des Adapters zur MyHarvia-Cloud. |
| `info.minTemp` | number | `value.temperature` | Nur Lesen | Mindest-Zieltemperaturgrenze (`40 °C`). |
| `info.maxTemp` | number | `value.temperature` | Nur Lesen | Maximal-Zieltemperaturgrenze (`110 °C`). |
| `info.avgHeatingRate` | number | `value` | Nur Lesen | Gelerntes durchschnittliche Aufheizrate in °C pro Minute (`°C/min`). |
| `info.heatingAnomaly` | boolean | `indicator` | Nur Lesen | Wechselt auf `true`, wenn die aktuelle Heizleistung deutlich vom historischen Durchschnitt abweicht (zu langsam oder zu schnell). |
| `info.heatingAnomalyType` | string | `text` | Nur Lesen | Art der Anomalie: `'none'` (Normalbetrieb), `'too_slow'` (< 50 % des Schnitts) oder `'too_fast'` (> 180 % des Schnitts). |
| `info.heatingAnomalyDesc` | string | `text` | Nur Lesen | Klartext-Diagnose und empfohlene Prüfschritte für Visualisierungen oder Benachrichtigungen. |
| `estimatedHeatingTimeRemaining` | number | `value.interval` | Nur Lesen | Geschätzte verbleibende Aufheizzeit in Minuten bis zur Zieltemperatur (`min`). |
| `online` | boolean | `indicator.reachable` | Nur Lesen | Verbindungsstatus der Steuereinheit zur Cloud. |
| `doorSafety` | boolean | `indicator.safety` | Nur Lesen | Status der Türsicherung (z. B. `true`, wenn die Tür sicher geschlossen ist). |
| `remoteControl` | boolean | `indicator` | Nur Lesen | Status der Fernstart-Bereitschaft. Wenn `false`, ist das Starten des Ofens aus der Ferne (über den Adapter) blockiert. |
| `errorMsg` | string | `text` | Nur Lesen | Aktuelle Fehlermeldungen oder Statustexte des Ofens. |
| `heatOn` | boolean | `switch.power` | Lesen/Schreiben | Hauptschalter, um den Saunaofen EIN (`true`) oder AUS (`false`) zu schalten. |
| `heaterPower` | number | `value.power` | Nur Lesen | *Hinweis:* Dieses Objekt wird von der API bereitgestellt, liefert aber derzeit oft `0 kW` (nicht ausgefüllt). Es ist vermutlich für zukünftige Updates reserviert. |
| `lightOn` | boolean | `switch.light` | Lesen/Schreiben | Schalter für die integrierte Saunabeleuchtung. |
| `maxDuration` | number | `level.timer` | Lesen/Schreiben | Maximale Heizdauer für die Saunasitzung in Minuten (`min`). |
| `panelTemp` | number | `value.temperature` | Nur Lesen | Temperaturmesswert direkt an der physischen Steuereinheit / Panel. |
| `targetTemp` | number | `level.temperature` | Lesen/Schreiben | Zieltemperatur-Sollwert für die Saunakabine (z. B. `90 °C`). |
| `temp` | number | `value.temperature` | Nur Lesen | Die aktuelle Umgebungstemperatur in der Saunakabine (z. B. `17 °C`). |
| `readyNotified10Min` | boolean | `indicator` | Nur Lesen | Wird `true`, wenn die Sauna noch ca. 10 Minuten von der Zieltemperatur entfernt ist (13°C unter Ziel). |
| `targetReachedNotified` | boolean | `indicator` | Nur Lesen | Wird `true`, wenn die Sauna die eingestellte Zieltemperatur erfolgreich erreicht hat. |
| `totalBathingHours` | number | `value.number` | Nur Lesen | Historische kumulierte Betriebsstunden der Saunanutzung (`h`). |
| `totalOperatingHours` | number | `value.hours` | Nur Lesen | Gesamte Betriebsstunden des Systems (`h`). |
| `totalSessions` | number | `value.count` | Nur Lesen | Zähler für die Gesamtzahl der durchgeführten Heizvorgänge. |

---

## Intelligente Funktionen & Automatisierungen

### 1. Adaptive Aufheizzeit-Prognose & Anomalie-Erkennung
* **Lernende Aufheizdauer (`estimatedHeatingTimeRemaining` & `info.avgHeatingRate`):**  
  Der Adapter lernt mit jedem Heizvorgang die typische Heizrate deiner Saunakabine (°C pro Minute). Während des Aufheizens kombiniert er historische Erfahrungswerte mit dem aktuellen Live-Temperaturanstieg, um die verbleibende Restzeit bis zur Zieltemperatur minutengenau zu prognostizieren.
* **Beidseitige Anomalie-Erkennung (`info.heatingAnomaly`, `info.heatingAnomalyType`, `info.heatingAnomalyDesc`):**  
  Nach mindestens 10 Minuten aktivem Heizen vergleicht der Adapter die reale Aufheizrate mit dem gelernten Durchschnitt:
  - **Zu langsam (`too_slow`):** Fällt die Heizrate unter 50 % des Schnitts (z. B. Saunatür angelehnt oder Ausfall eines Heizstabs), wird `info.heatingAnomaly` auf `true` gesetzt.
  - **Zu schnell (`too_fast`):** Steigt die Heizrate über 180 % des Schnitts (z. B. Temperaturfühler verrutscht, Hitzestau am Sensor oder klebendes Schütz), wird `info.heatingAnomaly` auf `true` gesetzt.
  - `info.heatingAnomalyDesc` liefert eine verständliche Fehlerbeschreibung für Push-Benachrichtigungen oder Visualisierungen.

### 2. Benachrichtigungen (Push-Trigger)
Der Adapter stellt zwei Indikator-Datenpunkte zur Verfügung, die speziell für das Auslösen von Push-Benachrichtigungen (z. B. via Telegram, Pushover oder Alexa) konzipiert wurden:

```javascript
// Trigger für die 10-Minuten-Vorwarnung
on({ id: 'harvia-fenix.0.readyNotified10Min', change: 'ne', val: true }, function () {
    const targetTemp = getState('harvia-fenix.0.targetTemp').val;
    sendTo('telegram.0', 'send', { text: `🧖 Die Sauna erreicht in ca. 10 Minuten ihre Zieltemperatur (${targetTemp}°C).` });
});

// Trigger wenn die Sauna vollständig bereit ist
on({ id: 'harvia-fenix.0.targetReachedNotified', change: 'ne', val: true }, function () {
    const targetTemp = getState('harvia-fenix.0.targetTemp').val;
    sendTo('telegram.0', 'send', { text: `♨️ Die Sauna hat ihre Zieltemperatur von ${targetTemp}°C erreicht und ist bereit!` });
});

// Trigger bei Heiz-Anomalie (zu langsam oder zu schnell)
on({ id: 'harvia-fenix.0.info.heatingAnomaly', change: 'ne', val: true }, function () {
    const desc = getState('harvia-fenix.0.info.heatingAnomalyDesc').val;
    sendTo('telegram.0', 'send', { text: desc });
});
```

*Hinweis: Diese Zustände werden automatisch auf `false` zurückgesetzt, wenn der Ofen ausgeschaltet wird oder ein neuer Heizvorgang beginnt.*

---

## Fehlerbehebung (Troubleshooting)

### Häufige API-Fehler & Statusmeldungen in `errorMsg`

* **`Action blocked (403 Forbidden). Remote start authorization (Safety Loop) at panel might not be active.`**
  - **Ursache:** Die europäische Sicherheitsnorm schreibt vor, dass ein Fernstart nur aktiv sein darf, wenn der Sicherheitskreis/Türsensor geschlossen ist und der Fernstart physisch am Saunapanel scharf geschaltet wurde.
  - **Lösung:** Schließe die Saunatür und drücke am physischen Harvia-Bedienfeld die **Fernstart**-Taste. Das Fernstart-Symbol auf dem Display muss leuchten. Erst danach ist die Steuerung über den Adapter freigegeben.
* **`Cloud lock: Device busy, command discarded.` (Als Debug-Log)**
  - **Ursache:** Die Harvia-API blockiert Befehle, wenn sie in zu schneller Folge gesendet werden (z. B. durch schnelles Klicken in der Vis), um die Hardware zu schützen.
  - **Lösung:** Warte einige Sekunden zwischen den Befehlen. Der Adapter verwirft zu schnelle Klicks automatisch, um eine API-Sperre zu verhindern.

---

## To-Do
* [ ] Auf offizielle Erlaubnis von Harvia zur Nutzung des Original-Logos warten
* [ ] Automatische Kaltgetränke-Bereitstellungs-Erinnerung für den Saunagang 🍺❄️
* [ ] KI-gestützten Handtuch-Wurf-Roboter für den perfekten Aufguss entwickeln 🧖‍♂️🪣

---

## Änderungsprotokoll (Changelog)

### **WORK IN PROGRESS**
* (meistermopper) Aktualisiere @iobroker/adapter-core auf 3.4.3 und @iobroker/testing auf 6.2.1
* (meistermopper) Behebe Mocha 12 Instanziierung im Unit-Test Runner unter Node 22

### 0.5.0 (2026-09-09)
* (meistermopper) Beidseitige Heizanomalie-Erkennung hinzugefügt (zu langsam/schnell)
* (meistermopper) Update @alcalzone/release-script-plugin-license to 5.2.2
* (meistermopper) Node.js 26 zur Testmatrix hinzugefügt

### 0.4.0 (2026-08-13)
* (meistermopper) Add adaptive heating duration prognosis and anomaly detection
* (meistermopper) Add dev script shortcut for dev-server watch in package.json
* (meistermopper) Clarify Partner ID and guest account setup instructions
* (meistermopper) Document adaptive heating prognosis and anomaly detection
* (meistermopper) Add strict privacy and anonymization rule to AGENTS.md
* (meistermopper) Clean up To-Do list and add fun future wishlist items

### 0.3.2 (2026-08-11)
* (meistermopper) Use absolute GitHub URLs for language switching links in README files
* (meistermopper) Remove latest repository and translation badges from README files
* (meistermopper) Mark stable repository addition as completed in To-Do list
* (meistermopper) Remove direct npm installation instructions from README files
* (dependabot) Bump axios from 1.18.1 to 1.19.0
* (meistermopper) Center adapter logo in README files
* (meistermopper) Add Weblate translation status badge to README files
* (meistermopper) Add npm run translate step to release-before-commit script
* (meistermopper) Replace static latest badge with dynamic iobroker.live badge

### 0.3.1 (2026-08-04)
* (meistermopper) Update GitHub Actions in auto-translate workflow to v7
* (meistermopper) Add Git commit and push authorization rule to AGENTS.md
* (meistermopper) Add auto-translate workflow for automatic i18n translations
* (meistermopper) Add missing CHANGELOG_OLD link to README files
* (meistermopper) Fix untranslated news entries for 0.2.8 in io-package.json
* (meistermopper) Add common.news translation rule to AGENTS.md
* (meistermopper) Remove redundant npm badge and move Test and Release badge after NPM banner

### 0.3.0 (2026-07-29)
* (meistermopper) Add configurable min/max temperature limits and maxDuration in Admin UI

---

## Lizenz
MIT License

Copyright (c) 2026 meistermopper <meister.mopper@gmail.com>