---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.harvia-fenix/README.md
title: ioBroker.harvia-fenix
hash: 3RkffmBtNMTrvcFbrdmEzKSKgkJHDo3PjWxBm0u7et0=
---
![Downloads](https://img.shields.io/npm/dm/iobroker.harvia-fenix.svg)
![Knoten](https://img.shields.io/node/v/iobroker.harvia-fenix.svg)
![Lizenz](https://img.shields.io/npm/l/iobroker.harvia-fenix.svg)
![GitHub-Probleme](https://img.shields.io/github/issues/meistermopper/ioBroker.harvia-fenix.svg)
![Anzahl der Installationen](https://iobroker.live/badges/harvia-fenix-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/harvia-fenix-stable.svg)
![NPM](https://nodei.co/npm/iobroker.harvia-fenix.png?downloads=true)

<p align="center"><img src="admin/harvia.png" alt="Logo" width="100" /></p>

# IoBroker.harvia-fenix
**[Hier geht es zur deutschen Version der Dokumentation.](https://github.com/meistermopper/ioBroker.harvia-fenix/blob/main/README_de.md)**

![Test und Freigabe](https://github.com/meistermopper/ioBroker.harvia-fenix/workflows/Test%20and%20Release/badge.svg)

### Ein ioBroker-Adapter zur Integration und Steuerung Ihrer **Harvia Fenix** Sauna-Steuereinheit über die MyHarvia Cloud-Infrastruktur.
Weitere Informationen zu Harvia und deren Sauna-Steuereinheiten finden Sie unter [offizielle Harvia-Website](https://www.harvia.com).

---

## ⚠️ WICHTIGER SICHERHEITSHINWEIS & HAFTUNGSAUSSCHLUSS
**Die Fernsteuerung eines Saunaofens unterliegt strengen Sicherheitsbestimmungen!** Gemäß der europäischen Sicherheitsnorm **EN 60335-2-53** in Verbindung mit **EN 60335-1** sind Brandschutzmaßnahmen für ferngesteuerte Saunaöfen zwingend erforderlich. Die Saunakabine muss mit einem zugelassenen Türsensor oder einer Sicherheitsabschaltung ausgestattet sein. Dadurch wird sichergestellt, dass der Ofen nicht ferngesteuert oder per Zeitschaltuhr gestartet werden kann, wenn sich ein brennbarer Gegenstand (z. B. ein Handtuch) auf oder in der Nähe des Ofens befindet.

* **Haftungsausschluss:** Der Entwickler dieses Adapters übernimmt keinerlei Verantwortung, Gewährleistung oder Haftung für Schäden, Brände, Verletzungen oder rechtliche Probleme, die durch die Verwendung oder Fehlkonfiguration dieser Software entstehen. Die Nutzung dieser Integration erfolgt auf eigenes Risiko.
* **Marken:** Harvia und MyHarvia 2 sind eingetragene Marken der Harvia Group. Dieser Adapter ist ein unabhängiges, von der Community getragenes Open-Source-Projekt und wird weder offiziell von Harvia unterstützt noch gesponsert.

---

## Installation
Der Adapter ist im offiziellen ioBroker-Repository verfügbar. Sie können ihn direkt über die ioBroker-Admin-Weboberfläche installieren.

### Über ioBroker Admin
1. Öffnen Sie Ihre ioBroker-Weboberfläche in einem Browser (z. B. `192.168.1.33:8081`).
2. Klicken Sie auf die Registerkarte **Adapter**.
3. Geben Sie "harvia-fenix" in den Filter ein.
4. Klicken Sie auf die drei Punkte und anschließend auf das "+"-Symbol des **Harvia Fenix**-Adapters, um eine Instanz hinzuzufügen.

---

## Aufstellen
Zusätzlich zur Installation des Adapters müssen Sie die Adapterinstanz mit Ihren MyHarvia-Kontodaten konfigurieren.

### Voraussetzungen
1. **Node.js >= 22**
2. Ein registriertes Konto in der offiziellen Smartphone-Anwendung **MyHarvia 2**.
3. Ihre gültigen Anmeldedaten:
   - **E-Mail-Adresse**
- **Passwort**

*Hinweis: Wir empfehlen, ein separates Konto für ioBroker in der Harvia 2-App einzurichten und diese Anmeldeinformationen in der Instanz zu verwenden.*

### IoBroker-Konfiguration
1. Öffnen Sie Ihre ioBroker-Oberfläche in einem Browser (z. B. `192.168.1.33:8081`).
2. Navigieren Sie zum Tab **Instanzen** und klicken Sie auf das Einstellungssymbol Ihrer `harvia-fenix.0`-Instanz.
3. Geben Sie Ihre **E-Mail-Adresse** und Ihr **Passwort** Ihres MyHarvia-Kontos ein.
4. Wenn Sie das Feld **Geräte-ID** leer lassen, sucht der Adapter beim Start automatisch nach Geräten, die mit Ihrem Konto verknüpft sind. Das erste gefundene Gerät wird als aktive Einheit verwendet.
5. Optionale Parameter anpassen: **Abfrageintervall** (Sekunden), **Minimale/Maximale Zieltemperaturgrenzen** (°C) und **Maximale Heizdauer** (Minuten).
6. Klicken Sie auf **Speichern & Schließen**.

### Gerätekonfiguration & Unterstützung mehrerer Geräte
#### Automatische Erkennung
Wenn Sie das Feld **Geräte-ID** in den Adaptereinstellungen leer lassen, sucht der Adapter beim Start automatisch nach Geräten, die mit Ihrem Konto verknüpft sind. Das erste gefundene Gerät wird als aktive Einheit verwendet. Die erkannte ID wird im ioBroker-Protokoll ausgegeben.

#### Manuelle Geräte-ID
Für die meisten Nutzer mit einer einzelnen Sauna ist die automatische Erkennung ausreichend. Es wird jedoch empfohlen, die erkannte ID aus dem Protokoll zu kopieren und in die Konfiguration einzufügen, um eine stabile Verbindung zur jeweiligen Hardware zu gewährleisten.

#### Mehrere Saunen
Wenn Ihr MyHarvia-Konto mehrere Steuereinheiten verwaltet (z. B. eine zu Hause und eine im Ferienhaus):

1. Erstellen Sie für jede Sauna eine separate Instanz des Adapters (z. B. `harvia-fenix.0` und `harvia-fenix.1`).
2. Geben Sie die spezifische **Geräte-ID** für jede Einheit manuell in deren jeweiliger Instanzkonfiguration ein.

Dies ermöglicht es Ihnen, beide Saunen unabhängig voneinander mit jeweils eigenen Datenpunkten zu überwachen und zu steuern.

### Gemeinsame Konten / Gastkonten & Die Partner-ID
#### 🟢 Standard-Szenario (Hauptkonto / Saunabesitzer)
Wenn Sie den Adapter mit dem primären MyHarvia-Konto konfigurieren (dem Konto, mit dem die Sauna ursprünglich in der mobilen App registriert wurde):

* Lassen Sie sowohl die **Geräte-ID** als auch die **Partner-ID** in der Konfiguration **leer**.
* Der Adapter erkennt Ihre Sauna automatisch und verbindet sich beim Start mit ihr.

#### 🟡 Szenario: Gemeinsam genutztes/Gastkonto (z. B. dediziertes ioBroker-Konto)
Wenn die Sauna vom Konto des Eigentümers über die MyHarvia 2 App auf ein zweites Gastkonto übertragen wurde, gibt der automatische Erkennungsendpunkt von Harvia eine leere Geräteliste (`{"devices":[]}`) für Gasttoken zurück.

In diesem Szenario **müssen Sie sowohl die **Geräte-ID** als auch die **Partner-ID des Besitzers** in den Adaptereinstellungen manuell angeben:

**Die 60-Sekunden-Methode zum Erhalt beider IDs:**

1. Geben Sie in der Adapterkonfiguration vorübergehend die Anmeldeinformationen des **Primären/Besitzer-Kontos** ein und klicken Sie auf **Speichern**.
2. Öffnen Sie das ioBroker-Protokoll. Der Adapter verbindet sich sofort und gibt Zeilen aus, die beide IDs enthalten:
* `Gerät gefunden: ... (ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)` ➡️ Dies ist Ihre **Geräte-ID**.
* `Verwendung der Partner-ID aus dem Benutzertoken: ORG/prod:0:6656` ➡️ Dies ist Ihre **Partner-ID** (typischerweise `ORG/prod:0:6656` oder `ORG/prod:0:6656:0`).
3. Kopieren Sie beide Werte.
4. Öffnen Sie die Konfiguration erneut, wechseln Sie zurück zu Ihren **Gastkonto**-Anmeldeinformationen, fügen Sie die kopierte **Geräte-ID** und **Partner-ID** in die entsprechenden optionalen Felder ein und klicken Sie auf **Speichern & Schließen**.

Das Gastkonto kann die Gemeinschaftssauna nun direkt und zuverlässig steuern!

---

## Kompatibilitätshinweis
* **Unterstützt:** **Harvia Fenix** Steuereinheiten, die über die mobile Anwendung **MyHarvia 2** verwaltet werden.
* **NICHT unterstützt:** **Harvia Xenio**-Serie (z. B. Xenio WiFi / CX001WIFI). Die Xenio-Serie basiert auf einem älteren Hardware-Ökosystem und verwendet die ältere App *„MyHarvia for Xenio“*, die mit der von diesem Adapter verwendeten API nicht kompatibel ist.

---

## Verwendung
Der Adapter bildet die Cloud-Zustände Ihrer Sauna auf strukturierte ioBroker-Datenpunkte unter `harvia-fenix.0.*` ab.

### Verfügbare Datenpunkte
| Datenpunkt | Typ | Rolle | Zugriff | Beschreibung |
|---|---|---|---|---|
| `info.connection` | Boolescher Wert | `indicator` | Schreibgeschützt | Verbindungsstatus des Adapters zur MyHarvia Cloud. |
| `info.maxTemp` | Nummer | `value.temperature` | Schreibgeschützt | Maximale Zieltemperaturgrenze (`110 °C`). |
| `info.avgHeatingRate` | Zahl | `value` | Schreibgeschützt | Gelernte historische durchschnittliche Aufheizrate in °C pro Minute (`°C/min`). |
| `info.heatingAnomaly` | Boolescher Wert | `indicator` | Schreibgeschützt | Aktiviert `true`, wenn die Heizleistung im laufenden Betrieb deutlich unter den historischen Durchschnitt fällt. |
| `estimatedHeatingTimeRemaining` | Zahl | `value.interval` | Schreibgeschützt | Geschätzte verbleibende Aufheizzeit in Minuten bis zum Erreichen der Zieltemperatur (`min`). |
| `online` | Boolescher Wert | `indicator.reachable` | Schreibgeschützt | Verbindungsstatus der Steuereinheit zur Cloud. |
| `doorSafety` | Boolescher Wert | `indicator.safety` | Schreibgeschützt | Status der Sicherheitsschleife (z. B. `true`, wenn die Tür sicher ist / sicher betrieben werden kann). |
| `remoteControl` | Boolescher Wert | `indicator` | Schreibgeschützt | Status der Bereitschaft zum Fernstart. Wenn `false`, ist das Starten der Heizung per Fernzugriff (über den Adapter) blockiert. |
| `errorMsg` | Zeichenkette | `text` | Schreibgeschützt | Aktuelle Fehlermeldungen oder Statusmeldungen des Heizgeräts. |
| `heatOn` | Boolescher Wert | `switch.power` | Lesen/Schreiben | Hauptschalter zum Ein- (`true`) oder Ausschalten (`false`) der Saunaheizung. |
| `heaterPower` | Nummer | `value.power` | Schreibgeschützt | *Hinweis:* Dieses Objekt wird von der MyHarvia-API-Struktur bereitgestellt, wird aber derzeit als `0 kW` (leer) ausgeliefert. Es scheint für zukünftige Hardware- oder App-Updates reserviert zu sein. |
| `lightOn` | Boolescher Wert | `switch.light` | Lesen/Schreiben | Schalter zum Ein- oder Ausschalten der integrierten Saunabeleuchtung. |
| `maxDuration` | Nummer | `level.timer` | Lesen/Schreiben | Maximal zulässige Heizdauer für den Saunagang in Minuten (`min`). |
| `panelTemp` | Nummer | `value.temperature` | Schreibgeschützt | Die am physischen Bedienfeld gemessene Temperatur. |
| `targetTemp` | Nummer | `level.temperature` | Lesen/Schreiben | Sollwert für die Zieltemperatur der Saunakabine (z. B. `90 °C`). |
| `temp` | Zahl | `value.temperature` | Schreibgeschützt | Die aktuelle Umgebungstemperatur in der Saunakabine (z. B. `17 °C`). |
| `readyNotified10Min` | Boolescher Wert | `indicator` | Schreibgeschützt | Wird auf `true` gesetzt, wenn die Sauna noch etwa 10 Minuten von der Zieltemperatur entfernt ist (13 °C unter Zielwert). |
| `targetReachedNotified` | Boolescher Wert | `indicator` | Schreibgeschützt | Wird zu `true`, wenn die Sauna die konfigurierte Zieltemperatur erreicht hat. |
| `totalBathingHours` | Zahl | `value.number` | Schreibgeschützt | Gesamte historische kumulierte Betriebsstunden der Sauna (`h`). |
| `totalOperatingHours` | Nummer | `value.hours` | Schreibgeschützt | Gesamtbetriebsstunden des Systems (`h`). |
| `totalSessions` | Zahl | `value.count` | Schreibgeschützt | Zähler für die Gesamtzahl der durchgeführten Sauna-Heizvorgänge. |
| `totalSessions` | Zahl | `value.count` | Schreibgeschützt | Zähler für die Gesamtzahl der durchgeführten Sauna-Heizvorgänge. |

---

## Intelligente Funktionen und Automatisierungen
### 1. Adaptive Heizungsprognose und Anomalieerkennung
* **Ermittelte Heizdauer (`estimatedHeatingTimeRemaining` & `info.avgHeatingRate`):**

Der Adapter lernt die Aufheizrate Ihrer Kabine (°C pro Minute). Während einer aktiven Sitzung kombiniert er historische Leistungsdaten mit dem aktuellen Temperaturverlauf, um die verbleibende Aufheizzeit präzise zu berechnen.

* **Anomalieerkennung (`info.heatingAnomaly`):**

Wenn die aktuelle Heizrate nach mindestens 10 Minuten aktiver Heizung unter 50 % des historischen Durchschnitts fällt (z. B. bei nicht richtig geöffneter Saunatür oder Ausfall des Heizelements), wird `info.heatingAnomaly` auf `true` umgeschaltet und eine Warnung protokolliert.

### 2. Benachrichtigungen (Push-Trigger)
Der Adapter berechnet automatisch den Heizfortschritt und liefert Indikatordaten, die speziell für das Auslösen von Push-Benachrichtigungen (z. B. über Telegram, Pushover oder Alexa) entwickelt wurden:

```javascript
// Trigger for the 10-minute pre-warning
on({ id: 'harvia-fenix.0.readyNotified10Min', change: 'ne', val: true }, function () {
    const targetTemp = getState('harvia-fenix.0.targetTemp').val;
    sendTo('telegram.0', 'send', { text: `🧖 The sauna will reach its target temperature (${targetTemp}°C) in about 10 minutes.` });
});

// Trigger when the sauna is fully ready
on({ id: 'harvia-fenix.0.targetReachedNotified', change: 'ne', val: true }, function () {
    const targetTemp = getState('harvia-fenix.0.targetTemp').val;
    sendTo('telegram.0', 'send', { text: `♨️ The sauna has reached the target temperature of ${targetTemp}°C and is ready!` });
});

// Trigger on heating anomaly (e.g. door open)
on({ id: 'harvia-fenix.0.info.heatingAnomaly', change: 'ne', val: true }, function () {
    sendTo('telegram.0', 'send', { text: '⚠️ Warning: Sauna is heating unusually slowly! Please check door and heater.' });
});
```

*Hinweis: Diese Zustände werden automatisch auf `false` zurückgesetzt, wenn die Heizung ausgeschaltet wird oder eine neue Heizsitzung beginnt.*

---

## Fehlerbehebung
### Häufige API-Fehler und Statusmeldungen in `errorMsg`
* **`Aktion blockiert (403 Verboten). Die Fernstartberechtigung (Sicherheitsschleife) am Bedienfeld ist möglicherweise nicht aktiv.`**
- **Ursache:** Die europäische Sicherheitsnorm verlangt, dass der Fernstart nur aktiviert werden kann, wenn der Sicherheitskreis/Türsensor geschlossen ist und der Fernstart am Saunabedienfeld physisch aktiviert wurde.
**Lösung:** Schließen Sie die Saunatür und drücken Sie die Taste **Fernstart** an Ihrem Harvia-Bedienfeld. Das Fernbedienungssymbol auf dem Bildschirm muss aktiv sein. Anschließend können Sie die Sauna über den Adapter steuern.
* **`Cloud-Sperre: Gerät belegt, Befehl verworfen.` (Als Debug protokolliert)**
- **Ursache:** Die API von Harvia begrenzt die Anzahl der Befehle, die in schneller Folge gesendet werden (z. B. durch schnelles Klicken in der Benutzeroberfläche), um die Hardware zu schützen.
**Lösung:** Warten Sie einige Sekunden zwischen den Befehlen. Der Adapter verwirft automatisch Befehle, die zu schnell gesendet werden, um eine Blockierung der API zu verhindern.

---

## Aufgaben
* [ ] Warten Sie auf die offizielle Genehmigung von Harvia zur Verwendung ihres Originallogos.
* [ ] Automatische Erinnerung für kalte Getränke programmieren, abgestimmt auf die Abkühlung nach dem Saunagang 🍺❄️
* [ ] Design eines KI-gestützten Roboter-Handtuchwedelassistenten für den ultimativen Aufguss 🧖‍♂️🪣

---

## Changelog
### **WORK IN PROGRESS**
* (meistermopper) Update @alcalzone/release-script-plugin-license to 5.2.2

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

### 0.2.8 (2026-07-26)
* (meistermopper) Note latest repository availability in README installation section
* (meistermopper) Fix doorSafety role to sensor.door for repochecker compliance
* (meistermopper) Add missing CHANGELOG_OLD link to README.md (repochecker S6022)
* (meistermopper) Fix changelog rotation in README_de.md to enforce 5 entries limit

[Older changelog entries](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2026 meistermopper <meister.mopper@gmail.com>