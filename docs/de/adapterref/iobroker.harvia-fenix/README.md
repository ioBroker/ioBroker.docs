---
chapters: {"pages":{"en/adapterref/iobroker.harvia-fenix/README.md":{"title":{"en":"ioBroker.harvia-fenix"},"content":"en/adapterref/iobroker.harvia-fenix/README.md"},"en/adapterref/iobroker.harvia-fenix/README_de.md":{"title":{"en":"ioBroker.harvia-fenix"},"content":"en/adapterref/iobroker.harvia-fenix/README_de.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.harvia-fenix/README.md
title: ioBroker.harvia-fenix
hash: lgsXGtX1IZiRcVY4aN+WxhOiCe86BQRcKxNPJuJ8SPs=
---
![Downloads](https://img.shields.io/npm/dm/iobroker.harvia-fenix.svg)
![Knoten](https://img.shields.io/node/v/iobroker.harvia-fenix.svg)
![Lizenz](https://img.shields.io/npm/l/iobroker.harvia-fenix.svg)
![GitHub-Probleme](https://img.shields.io/github/issues/meistermopper/ioBroker.harvia-fenix.svg)
![Anzahl der Installationen](https://iobroker.live/badges/harvia-fenix-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/harvia-fenix-stable.svg)
![NPM](https://nodei.co/npm/iobroker.harvia-fenix.png?downloads=true)
![Test und Freigabe](https://github.com/meistermopper/ioBroker.harvia-fenix/workflows/Test%20and%20Release/badge.svg)

<p align="center">
  <img src="admin/fenix.png" alt="Logo" width="200" />
</p>

# ioBroker.harvia-fenix

**[Hier geht es zur deutschen Version der Dokumentation.](/#/docs/adapterref/iobroker.harvia-fenix/README_de.md)**

### Ein ioBroker-Adapter zur Integration und Steuerung Ihrer **Harvia Fenix** Sauna-Steuereinheit über die MyHarvia Cloud-Infrastruktur.

Weitere Informationen zu Harvia und deren Sauna-Steuereinheiten finden Sie auf der [offiziellen Harvia-Website](https://www.harvia.com) .

---

## ⚠️ WICHTIGER SICHERHEITSHINWEIS & HAFTUNGSAUSSCHLUSS

**Die Fernsteuerung eines Saunaofens unterliegt strengen Sicherheitsbestimmungen!** Gemäß der europäischen Sicherheitsnorm **EN 60335-2-53** in Verbindung mit **EN 60335-1** sind Brandschutzmaßnahmen für ferngesteuerte Saunaanlagen zwingend erforderlich. Die Saunakabine muss mit einem zugelassenen Türsensor oder einer Sicherheitsabschaltung ausgestattet sein. Dadurch wird sichergestellt, dass der Ofen nicht ferngesteuert oder per Zeitschaltuhr gestartet werden kann, wenn sich ein brennbarer Gegenstand (z. B. ein Handtuch) auf oder in der Nähe des Ofens befindet.

- **Haftungsausschluss:** Der Entwickler dieses Adapters übernimmt keinerlei Verantwortung, Gewährleistung oder Haftung für Schäden, Brände, Verletzungen oder rechtliche Probleme, die durch die Nutzung oder Fehlkonfiguration dieser Software entstehen. Die Nutzung dieser Integration erfolgt auf eigenes Risiko.
- **Markenrechte:** Harvia und MyHarvia 2 sind eingetragene Marken der Harvia Group. Dieser Adapter ist ein unabhängiges, von der Community getragenes Open-Source-Projekt und wird weder offiziell von Harvia unterstützt noch gesponsert.

---

## Installation

Der Adapter ist im offiziellen ioBroker-Repository verfügbar. Sie können ihn direkt über die ioBroker-Admin-Weboberfläche installieren.

### Über ioBroker Admin

1. Öffnen Sie die Weboberfläche Ihres ioBrokers in einem Browser (z. B. `192.168.1.33:8081`).
2. Klicken Sie auf die Registerkarte **Adapter** .
3. Geben Sie "harvia-fenix" in den Filter ein.
4. Klicken Sie auf die drei Punkte und anschließend auf das "+"-Symbol des **Harvia Fenix-** Adapters, um eine Instanz hinzuzufügen.

---

## Aufstellen

Zusätzlich zur Installation des Adapters müssen Sie die Adapterinstanz mit Ihren MyHarvia-Kontodaten konfigurieren.

### Voraussetzungen

1. **Node.js >= 22**
2. Ein registriertes Konto innerhalb der offiziellen **MyHarvia 2** Smartphone-Anwendung.
3. Ihre gültigen Anmeldedaten:
   - **E-Mail-Adresse**
   - **Passwort**

_Hinweis: Wir empfehlen, ein separates Konto für ioBroker in der Harvia 2-App einzurichten und diese Anmeldeinformationen in der Instanz zu verwenden._

### ioBroker-Konfiguration

1. Öffnen Sie Ihre ioBroker-Oberfläche in einem Browser (z. B. `192.168.1.33:8081`).
2. Navigieren Sie zu Tab- **Instanzen** und klicken Sie auf das Einstellungssymbol Ihres `harvia-fenix.0` Beispiel.
3. Geben Sie Ihre **E-Mail-Adresse** und **Ihr Passwort** für Ihr MyHarvia-Konto ein.
4. Wenn Sie das Feld **„Geräte-ID“** leer lassen, sucht der Adapter beim Start automatisch nach Geräten, die mit Ihrem Konto verknüpft sind. Das erste gefundene Gerät wird als aktive Einheit verwendet.
5. Optionale Parameter anpassen: **Abfrageintervall** (Sekunden), **Minimale/Maximale Zieltemperaturgrenzen** (°C) und **Maximale Heizdauer** (Minuten).
6. Klicken Sie auf **Speichern & Schließen** .

### Gerätekonfiguration und Unterstützung mehrerer Geräte

#### Automatische Erkennung

Wenn Sie das Feld **„Geräte-ID“** in den Adaptereinstellungen leer lassen, sucht der Adapter beim Start automatisch nach Geräten, die mit Ihrem Konto verknüpft sind. Das erste gefundene Gerät wird als aktive Einheit verwendet. Die erkannte ID wird im ioBroker-Protokoll ausgegeben.

#### Manuelle Geräte-ID

Für die meisten Nutzer mit einer einzelnen Sauna ist die automatische Erkennung ausreichend. Es wird jedoch empfohlen, die erkannte ID aus dem Protokoll zu kopieren und in die Konfiguration einzufügen, um eine stabile Verbindung zur jeweiligen Hardware zu gewährleisten.

#### Mehrere Saunen

Wenn Ihr MyHarvia-Konto mehrere Steuereinheiten verwaltet (z. B. eine zu Hause und eine im Ferienhaus):

1. Erstellen Sie für jede Sauna eine separate Instanz des Adapters (z. B. `harvia-fenix.0` Und `harvia-fenix.1`).
2. Geben Sie die jeweilige **Geräte-ID** für jede Einheit manuell in der zugehörigen Instanzkonfiguration ein. Dadurch können Sie beide Saunen unabhängig voneinander mit ihren eigenen Datenpunkten überwachen und steuern.

### Gemeinsame Konten / Gastkonten & Die Partner-ID

#### 🟢 Standard-Szenario (Hauptkonto / Saunabesitzer)

Wenn Sie den Adapter mit dem primären MyHarvia-Konto konfigurieren (dem Konto, mit dem die Sauna ursprünglich in der mobilen App registriert wurde):

- Lassen Sie sowohl **die Geräte-ID** als auch **die Partner-ID** in der Konfiguration **leer** .
- Der Adapter erkennt Ihre Sauna automatisch und verbindet sich beim Einschalten.

#### 🟡 Szenario: Gemeinsam genutztes/Gastkonto (z. B. dediziertes ioBroker-Konto)

Wenn die Sauna über die MyHarvia 2-App vom Konto des Besitzers auf ein zweites Gastkonto freigegeben wurde, gibt der automatische Erkennungsendpunkt von Harvia eine leere Geräteliste zurück (`{"devices":[]}`) für Gast-Tokens.

In diesem Szenario müssen Sie sowohl die **Geräte-ID** als auch die **Partner-ID des Besitzers** **manuell in den Adaptereinstellungen angeben** :

**Die 60-Sekunden-Methode, um beide IDs zu erhalten:**

1. Geben Sie in der Adapterkonfiguration vorübergehend die Anmeldeinformationen des **primären/Besitzer-Kontos** ein und klicken Sie auf **Speichern** .
2. Öffnen Sie das ioBroker-Protokoll. Der Adapter verbindet sich sofort und gibt Zeilen aus, die beide IDs enthalten:
   - `Found device: ... (ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)` ➡️ Dies ist Ihre **Geräte-ID** .
   - `Using partner ID from user token: ORG/prod:0:6656` ➡️ Dies ist Ihre **Partner-ID** (in der Regel `ORG/prod:0:6656` oder `ORG/prod:0:6656:0`).
3. Kopiere beide Werte.
4. Öffnen Sie die Konfiguration erneut, wechseln Sie zurück zu Ihren **Gastkonto-** Zugangsdaten, fügen Sie die kopierte **Geräte-ID** und **Partner-ID** in die entsprechenden optionalen Felder ein und klicken Sie auf **Speichern & Schließen** .

Das Gastkonto kann die Gemeinschaftssauna nun direkt und zuverlässig steuern!

---

## Kompatibilitätshinweis

- **Unterstützt:** **Harvia Fenix** Steuereinheiten, die über die mobile Anwendung **MyHarvia 2** verwaltet werden.
- **Nicht unterstützt:** **Harvia Xenio-** Serie (z. B. Xenio WiFi / CX001WIFI). Die Xenio-Serie basiert auf einem älteren Hardware-Ökosystem und verwendet die ältere App _„MyHarvia for Xenio“_ , die mit der von diesem Adapter verwendeten API nicht kompatibel ist.

---

## Verwendung

Der Adapter bildet die Cloud-Zustände Ihrer Sauna auf strukturierte ioBroker-Datenpunkte ab. `harvia-fenix.0.*` Die

### Verfügbare Datenpunkte

| Datenpunkt                      | Typ             | Rolle                 | Zugang          | Beschreibung                                                                                                                                                                                                         |
| ------------------------------- | --------------- | --------------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `info.connection`               | boolescher Wert | `indicator`           | Nur lesbar      | Verbindungsstatus des Adapters zur MyHarvia Cloud.                                                                                                                                                                   |
| `info.minTemp`                  | Nummer          | `value.temperature`   | Nur lesbar      | Mindestzieltemperaturgrenze (`40 °C`).                                                                                                                                                                              |
| `info.maxTemp`                  | Nummer          | `value.temperature`   | Nur lesbar      | Maximale Zieltemperaturgrenze (`110 °C`).                                                                                                                                                                           |
| `info.avgHeatingRate`           | Nummer          | `value`               | Nur lesbar      | Historische durchschnittliche Aufheizrate in °C pro Minute (`°C/min`).                                                                                                                                              |
| `info.heatingAnomaly`           | boolescher Wert | `indicator`           | Nur lesbar      | Kurven `true` wenn die Heizleistung im laufenden Betrieb deutlich vom historischen Durchschnitt abweicht (zu langsam oder zu schnell).                                                                                |
| `info.heatingAnomalyType`       | Zeichenkette    | `text`                | Nur lesbar      | Art der Anomalie: `'none'` (Normal), `'too_slow'` (unter 50 % des Durchschnitts) oder `'too_fast'` (über 180 % des Durchschnitts).                                                                                      |
| `info.heatingAnomalyDesc`       | Zeichenkette    | `text`                | Nur lesbar      | Für Menschen verständliche Diagnosebeschreibung und empfohlene Schritte zur Fehlerbehebung.                                                                                                                          |
| `estimatedHeatingTimeRemaining` | Nummer          | `value.interval`      | Nur lesbar      | Geschätzte verbleibende Aufheizzeit in Minuten bis zum Erreichen der Zieltemperatur (`min`).                                                                                                                        |
| `online`                        | boolescher Wert | `indicator.reachable` | Nur lesbar      | Verbindungsstatus der Steuereinheit zur Cloud.                                                                                                                                                                       |
| `doorSafety`                    | boolescher Wert | `indicator.safety`    | Nur lesbar      | Status der Sicherheitsschleife (z. B. `true` (wenn die Tür sicher ist / sicher zu bedienen).                                                                                                                          |
| `remoteControl`                 | boolescher Wert | `indicator`           | Nur lesbar      | Bereitschaftsstatus für Fernstart. Wenn `false` Das ferngesteuerte Starten der Heizung (über den Adapter) ist blockiert.                                                                                              |
| `errorMsg`                      | Zeichenkette    | `text`                | Nur lesbar      | Aktuelle Fehlermeldungen oder Statusmeldungen vom Heizgerät.                                                                                                                                                         |
| `heatOn`                        | boolescher Wert | `switch.power`        | Lesen/Schreiben | Hauptschalter zum Einschalten der Saunaheizung (`true`) oder AUS (`false`).                                                                                                                                        |
| `heaterPower`                   | Nummer          | `value.power`         | Nur lesbar      | _Hinweis:_ Dieses Objekt wird von der MyHarvia-API-Struktur bereitgestellt, wird aber derzeit wie folgt ausgeliefert: `0 kW` (nicht belegt). Es scheint für zukünftige Hardware- oder App-Updates reserviert zu sein. |
| `lightOn`                       | boolescher Wert | `switch.light`        | Lesen/Schreiben | Mit diesem Schalter kann die integrierte Saunabeleuchtung ein- oder ausgeschaltet werden.                                                                                                                            |
| `maxDuration`                   | Nummer          | `level.timer`         | Lesen/Schreiben | Maximal zulässige Heizdauer für den Saunagang in Minuten (`min`).                                                                                                                                                   |
| `panelTemp`                     | Nummer          | `value.temperature`   | Nur lesbar      | Die Temperaturanzeige erfolgte am physischen Bedienfeld.                                                                                                                                                             |
| `targetTemp`                    | Nummer          | `level.temperature`   | Lesen/Schreiben | Zieltemperaturvorgabe für die Saunakabine (z. B. `90 °C`).                                                                                                                                                           |
| `temp`                          | Nummer          | `value.temperature`   | Nur lesbar      | Die aktuelle Umgebungstemperatur im Inneren der Saunakabine (z. B. `17 °C`).                                                                                                                                         |
| `readyNotified10Min`            | boolescher Wert | `indicator`           | Nur lesbar      | Kurven `true` wenn die Sauna noch etwa 10 Minuten von der Zieltemperatur entfernt ist (13°C unter der Zieltemperatur).                                                                                                |
| `targetReachedNotified`         | boolescher Wert | `indicator`           | Nur lesbar      | Kurven `true` wenn die Sauna die eingestellte Zieltemperatur erfolgreich erreicht hat.                                                                                                                                |
| `totalBathingHours`             | Nummer          | `value.number`        | Nur lesbar      | Gesamte historische kumulierte Betriebsstunden der Sauna (`h`).                                                                                                                                                     |
| `totalOperatingHours`           | Nummer          | `value.hours`         | Nur lesbar      | Gesamtbetriebsstunden des Systems (`h`).                                                                                                                                                                            |
| `totalSessions`                 | Nummer          | `value.count`         | Nur lesbar      | Zähler für die Gesamtzahl der durchgeführten Sauna-Heizvorgänge.                                                                                                                                                     |
| `readyAt`                       | Zeichenkette    | `text`                | Nur lesbar      | Geschätzter Zeitpunkt des Tages, zu dem die Zieltemperatur erreicht wird (z. B. `17:57`).                                                                                                                            |
| `readyAtMessage`                | Zeichenkette    | `text`                | Nur lesbar      | Für Menschen lesbare Bereitschaftsmeldung (z. B. `Ready at 17:57 if turned on now`).                                                                                                                                 |
| `timeToTargetFormatted`         | Zeichenkette    | `text`                | Nur lesbar      | Formatierte Zeit, die benötigt wird, um die Zieltemperatur zu erreichen (z. B. `39 min 30 sec`).                                                                                                                     |
| `heatingCurve`                  | Zeichenkette    | `json`                | Nur lesbar      | JSON-Array mit Intervall-Heizsekunden pro 10°C-Abschnitt für Diagramme/VIS.                                                                                                                                          |
| `profiles`                      | Zeichenkette    | `json`                | Nur lesbar      | JSON-Array mit verfügbaren Saunaprofilen (z. B. Cozy usw.).                                                                                                                                                          |
| `activeProfile`                 | Nummer          | `level`               | Lesen/Schreiben | Übersicht der aktuell aktiven Saunaprofile.                                                                                                                                                                          |

---

## Intelligente Funktionen und Automatisierungen

### 1. Adaptive Heizungsprognose und Anomalieerkennung

- **Gelernte Heizdauer (`estimatedHeatingTimeRemaining` &`info.avgHeatingRate`):**\
  &#x20;Der Adapter lernt die Aufheizrate Ihrer Kabine (°C pro Minute). Während einer aktiven Sitzung kombiniert er historische Leistungsdaten mit dem aktuellen Temperaturverlauf, um die verbleibende Aufheizzeit präzise zu berechnen.
- **Bidirektionale Anomalieerkennung (`info.heatingAnomaly`, `info.heatingAnomalyType`, `info.heatingAnomalyDesc`):**\
  &#x20;Nach mindestens 10 Minuten aktiver Erwärmung vergleicht der Adapter die aktuelle Aufheizrate mit dem gelernten historischen Durchschnitt:
  - **Zu langsam (`too_slow`):** Wenn die Heizleistung unter 50 % des Durchschnittswerts sinkt (z. B. durch eine offene Tür oder einen Ausfall des Heizelements), `info.heatingAnomaly` wechselt zu `true` Die
  - **Zu schnell (`too_fast`):** Wenn die tatsächliche Erwärmung 180 % des Durchschnittswerts übersteigt (z. B. durch einen verschobenen Temperatursensor, eine Wärmeansammlung am Sensor oder ein klemmendes Relais), `info.heatingAnomaly` wechselt zu `true` Die
  - `info.heatingAnomalyDesc` Bietet für Menschen lesbare Diagnosedetails für Push-Benachrichtigungen oder Dashboards.

### 2. Benachrichtigungen (Push-Trigger)

Der Adapter berechnet automatisch den Heizfortschritt und liefert Indikatordatenpunkte, die speziell für das Auslösen von Push-Benachrichtigungen (z. B. über Telegram, Pushover oder Alexa) entwickelt wurden:

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

// Trigger on heating anomaly (too slow or too fast)
on({ id: 'harvia-fenix.0.info.heatingAnomaly', change: 'ne', val: true }, function () {
    const desc = getState('harvia-fenix.0.info.heatingAnomalyDesc').val;
    sendTo('telegram.0', 'send', { text: desc });
});
```

_Hinweis: Diese Zustände werden automatisch zurückgesetzt auf `false` wenn die Heizung ausgeschaltet wird oder wenn eine neue Heizperiode beginnt._

---

## Fehlerbehebung

### Häufige API-Fehler und Statusmeldungen in `errorMsg`

- ** `Action blocked (403 Forbidden). Remote start authorization (Safety Loop) at panel might not be active.` **
  - **Grund:** Die europäische Sicherheitsnorm verlangt, dass der Fernstart nur aktiviert werden kann, wenn der Sicherheitskreis/Türsensor geschlossen ist und der Fernstart am Saunabedienfeld physisch aktiviert wurde.
  - **Lösung:** Schließen Sie die Saunatür und drücken Sie die Taste **„Fernstart“** an Ihrem Harvia-Bedienfeld. Das Fernbedienungssymbol auf dem Bildschirm muss aktiv sein. Anschließend können Sie die Sauna über den Adapter steuern.
- ** `Cloud lock: Device busy, command discarded.`(Als Debug protokolliert)**
  - **Grund:** Die API von Harvia begrenzt die Anzahl der Befehle, die in schneller Folge gesendet werden (z. B. durch schnelles Klicken in der Benutzeroberfläche), um die Hardware zu schützen.
  - **Lösung:** Warten Sie einige Sekunden zwischen den Befehlen. Der Adapter verwirft automatisch Befehle, die zu schnell gesendet werden, um eine Blockierung der API zu verhindern.

---

## Aufgabenliste

- [ ] Automatische Erinnerung an Kaltgetränke programmieren, abgestimmt auf die Abkühlung nach der Sauna 🍺❄️
- [ ] Entwerfen Sie einen KI-gesteuerten, roboterhaften Handtuchwedel-Assistenten für den ultimativen Aufguss 🧖‍♂️🪣

---

## Changelog
### 0.6.0 (2026-09-16)
* (meistermopper) Add readyAt, readyAtMessage, timeToTargetFormatted states
* (meistermopper) Implement Harvia native 13-interval heating curve calculation
* (meistermopper) Add profiles, activeProfile, and standby time prognosis
* (meistermopper) Increase adapter logo display size in README files to 200px
* (meistermopper) Add breaking change callouts and older tag support to release notes
* (meistermopper) Add automated release notes generator for GitHub releases
* (meistermopper) Add check:repo script and integrate repochecker into test:local
* (meistermopper) Restore email in license copyright lines (S4050, S4051)
* (meistermopper) Fix license section in README to satisfy repo-checker rule W6034

### 0.5.1 (2026-09-12)
* (meistermopper) Replace adapter logo with custom MyFenix homage logo
* (meistermopper) Update @iobroker/adapter-core to 3.4.3 and @iobroker/testing to 6.2.1
* (meistermopper) Fix Mocha 12 instantiation in unit test runner on Node 22

### 0.5.0 (2026-09-09)
* (meistermopper) Add bidirectional heating anomaly detection (too slow / fast)
* (meistermopper) Update @alcalzone/release-script-plugin-license to 5.2.2
* (meistermopper) Add Node.js 26 to test matrix

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

## License
MIT License

Copyright (c) 2026 meistermopper <meister.mopper@gmail.com>

See the [LICENSE](https://github.com/meistermopper/ioBroker.harvia-fenix/blob/main/LICENSE) file for the full license text.