---
chapters: {"pages":{"en/adapterref/iobroker.harvia-fenix/README.md":{"title":{"en":"ioBroker.harvia-fenix"},"content":"en/adapterref/iobroker.harvia-fenix/README.md"},"en/adapterref/iobroker.harvia-fenix/README_de.md":{"title":{"en":"ioBroker.harvia-fenix"},"content":"en/adapterref/iobroker.harvia-fenix/README_de.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.harvia-fenix/README_de.md
title: ioBroker.harvia-fenix
hash: JqgWxA+eyJ1GHTqHP/RbIZUzc71leL0sNDO3yjYBfQM=
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
  <img src="admin/harvia.png" alt="Logo" width="100" />
</p>

# ioBroker.harvia-fenix

**[Klicken Sie hier, um zur englischen Version der Dokumentation zu gelangen.](/#/adapters/harvia-fenix)**

### Ein ioBroker-Adapter zur Integration und Steuerung der **Harvia Fenix** Saunasteuerung über die MyHarvia Cloud-Infrastruktur.

Für weitere Informationen über Harvia und deren Saunasteuerungen besuchen Sie bitte die [offizielle Harvia-Website](https://www.harvia.com) .

---

## ⚠️ KRITISCHER SICHERHEITSHINWEIS & HAFTUNGSAUSSCHLUSS

**Der Fernbetrieb eines Saunaofens unterliegt strengen Sicherheitsvorschriften!** Gemäß der europäischen Sicherheitsnorm **EN 60335-2-53** in Verbindung mit **EN 60335-1** sind Brandschutzmaßnahmen für Fernsteuerungssysteme zwingend erforderlich. Die Saunakabine muss mit einem zugelassenen Türsensor oder einem Sicherheits-Abschaltsystem ausgestattet sein. Dies stellt sicher, dass der Ofen nicht aus der Ferne oder per Timer gestartet werden kann, wenn ein brennbarer Gegenstand (z. B. ein Handtuch) auf oder in der Nähe des Ofens vergessen wurde.

- **Keine Haftung:** Der Entwickler dieses Adapters übernimmt keinerlei Verantwortung, Gewährleistung oder Haftung für Schäden, Brände, Verletzungen oder rechtliche Probleme, die aus der Nutzung oder Fehlkonfiguration dieser Software resultieren. Du betreibst diese Integration vollständig auf eigenes Risiko.
- **Markenhinweis:** Harvia und MyHarvia 2 sind eingetragene Marken der Harvia Group. Dieser Adapter ist ein unabhängiges, gemeinschaftsbasiertes Open-Source-Projekt und wird weder offiziell von Harvia unterstützt, gesponsert noch betreut.

---

## Installation

Der Adapter ist im offiziellen ioBroker-Repository verfügbar. Du kannst ihn direkt über die ioBroker Admin-Weboberfläche installieren.

### Über ioBroker Admin

1. Öffne deine ioBroker-Weboberfläche in einem Browser (z. B.`192.168.1.33:8081` ).
2. Klicken Sie auf den Reiter **Adapter** .
3. Geben Sie „harvia-fenix“ in den Filter ein.
4. Klicken Sie auf die drei Punkte und dann auf das „+“-Symbol des **Harvia Fenix** Adapters, um eine Instanz hinzuzufügen.

---

## Einrichtung (Aufbau)

Zusätzlich zur Adapterinstallation müssen Sie die Adapterinstanz mit Ihren MyHarvia-Kontodaten konfigurieren.

### Voraussetzungen

1. **Node.js >= 22**
2. Ein registriertes Konto in der offiziellen **MyHarvia 2** Smartphone-App.
3. Gültige Login-Daten:
   - **E-Mail-Adresse**
   - **Passwort**

_Hinweis: Es wird ein separates Konto für ioBroker in der Harvia 2 App empfohlen und diese Zugangsdaten in der Instanz zu verwenden._

### ioBroker-Konfiguration

1. Öffne deine ioBroker-Oberfläche in einem Browser (z. B.`192.168.1.33:8081` ).
2. Navigiere zum Reiter **Instanzen** und klicke auf das Einstellungs-Symbol deiner`harvia-fenix.0` -Instanz.
3. Geben Sie die **E-Mail-Adresse** und das **Passwort** Ihres MyHarvia-Kontos ein.
4. Wenn Sie das Feld **Geräte-ID** leer lassen, sucht der Adapter beim Start automatisch nach Geräten, die mit Ihrem Konto verknüpft sind. Er verwendet das zuerst gefundene Gerät als aktive Einheit.
5. Passen Sie bei Bedarf optionale Parameter an: **Abfrageintervall** (Sekunden), **Mindest-/Maximal-Zieltemperatur** (°C) und **Maximale Heizdauer** (Minuten).
6. Klicken Sie auf **Speichern & Schließen** .

---

## Gerätekonfiguration & Multi-Geräte-Unterstützung

#### Automatische Erkennung (Discovery)

Wenn Sie das Feld **Geräte-ID** in den Adapter-Einstellungen leer lassen, sucht der Adapter beim Start automatisch nach Geräten, die mit Ihrem Konto verknüpft sind. Er verwendet das zuerst gefundene Gerät als aktive Einheit. Die erkannte ID wird im ioBroker-Log ausgegeben.

#### Manuelle Geräte-ID

Für die meisten Benutzer mit einer einzelnen Sauna ist die automatische Erkennung ausreichend. Es wird jedoch empfohlen, die erkannte ID aus dem Log zu kopieren und in die Konfiguration einzufügen, um eine dauerhaft stabile Verbindung zur spezifischen Hardware zu gewährleisten.

#### Mehrere Saunen

Wenn Ihr MyHarvia-Konto mehrere Steuereinheiten verwaltet (z. B. eine zu Hause und eine im Ferienhaus):

1. Erstelle für jede Sauna eine eigene Instanz des Adapters (z. B.`harvia-fenix.0` und`harvia-fenix.1` ).
2. Tragen Sie die jeweilige **Geräte-ID** manuell in der Konfiguration der entsprechenden Instanz ein. Dadurch kannst du beide Saunen unabhängig voneinander mit eigenen Datenpunkten überwachen und steuern.

### Geteilte Konten / Gast-Zugänge & Die Partner-ID

#### 🟢 Normalfall (Hauptkonto / Besitzer der Sauna)

Wenn Sie die Login-Daten des MyHarvia-Hauptkontos verwenden (mit dem die Sauna ursprünglich in der App eingerichtet wurde):

- Lassen Sie sowohl die **Geräte-ID** als auch die **Partner-ID** in den Einstellungen **leer** .
- Der Adapter findet deine Sauna beim Start vollautomatisch.

#### 🟡 Sonderfall: Geteiltes Konto / Gast-Zugang (z. B. trennt ioBroker-Konto)

Wurde die Sauna in der MyHarvia 2 App vom Besitzer für ein zweites Konto (Gast-Konto) freigegeben, liefert die automatische Suche der Cloud-API für dieses Gast-Konto grundsätzlich keine Geräte (`{"devices":[]}` ).

In diesem Fall **müssen** die **Geräte-ID (Device ID)** und die **Partner-ID des Hauptkontos** manuell in den Einstellungen eingetragen werden:

**Der 60-Sekunden-Trick, um an beide Werte zu kommen:**

1. Tragen Sie in der Adapter-Konfiguration kurz die Login-Daten des **Hauptkontos** (des Besitzers) ein und klicken Sie auf **Speichern** .
2. Öffnet das ioBroker-Log. Der Adapter findet die Sauna sofort und gibt folgende Zeilen aus:
   - `Found device: ... (ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)` ➡️ Das ist deine **Geräte-ID** .
   - `Using partner ID from user token: ORG/prod:0:6656` ➡️ Das ist deine **Partner-ID** (Standard:`ORG/prod:0:6656` Oder`ORG/prod:0:6656:0` ).
3. Kopieren Sie beide Werte in die Zwischenablage.
4. Öffne die Einstellungen erneut, trage wieder die Zugangsdaten deines **Gast-Kontos** ein, füge die kopierte **Geräte-ID** und **Partner-ID** in die optionalen Felder ein und klicke auf **Speichern & Schließen** .

Danach steuert das Gast-Konto die Sauna dauerhaft und zuverlässig an!

---

## Kompatibilitätshinweis

- **Unterstützt:** **Harvia Fenix** Steuereinheiten, die über die **MyHarvia 2** App verwaltet werden.
- **NICHT unterstützt:** **Harvia Xenio** Serie (z. B. Xenio WiFi / CX001WIFI). Die Xenio-Serie basiert auf einem älteren Hardware-Ökosystem und verwendet die ältere _„MyHarvia for Xenio“_ App, die grundsätzlich inkompatibel mit der von diesem Adapter verwendeten API ist.

---

## Verwendung (Usage)

### Verfügbare Datenpunkte

| Datenpunkt                      | Typ             | Rolle                 | Zugriff         | Beschreibung                                                                                                                                                      |
| ------------------------------- | --------------- | --------------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `info.connection`               | boolescher Wert | `indicator`           | Nur Lesen       | Verbindungsstatus des Adapters zur MyHarvia-Cloud.                                                                                                                |
| `info.minTemp`                  | Nummer          | `value.temperature`   | Nur Lesen       | Mindest-Zieltemperaturgrenze (`40 °C` ).                                                                                                                          |
| `info.maxTemp`                  | Nummer          | `value.temperature`   | Nur Lesen       | Maximal-Zieltemperaturgrenze (`110 °C` ).                                                                                                                         |
| `info.avgHeatingRate`           | Nummer          | `value`               | Nur Lesen       | Gelerntes durchschnittliche Aufheizrate in °C pro Minute (`°C/min` ).                                                                                             |
| `info.heatingAnomaly`           | boolescher Wert | `indicator`           | Nur Lesen       | Wechselt auf`true` , wenn die aktuelle Heizleistung deutlich vom historischen Durchschnitt abweicht (zu langsam oder zu schnell).                                 |
| `info.heatingAnomalyType`       | Zeichenkette    | `text`                | Nur Lesen       | Art der Anomalie:`'none'` (Normalbetrieb),`'too_slow'` (< 50 % des Schnitts) oder`'too_fast'` (> 180 % des Schnitts).                                             |
| `info.heatingAnomalyDesc`       | Zeichenkette    | `text`                | Nur Lesen       | Klartext-Diagnose und empfohlene Prüfschritte für Visualisierungen oder Benachrichtigungen.                                                                       |
| `estimatedHeatingTimeRemaining` | Nummer          | `value.interval`      | Nur Lesen       | Verbleibende Aufheizzeit in Minuten bis zur Zieltemperatur (`min` ).                                                                                              |
| `online`                        | boolescher Wert | `indicator.reachable` | Nur Lesen       | Verbindungsstatus der Steuereinheit zur Cloud.                                                                                                                    |
| `doorSafety`                    | boolescher Wert | `indicator.safety`    | Nur Lesen       | Status der Türsicherung (z. B.`true` , wenn die Tür sicher geschlossen ist).                                                                                      |
| `remoteControl`                 | boolescher Wert | `indicator`           | Nur Lesen       | Status der Fernstart-Bereitschaft. Wenn`false` , ist das Starten des Ofens aus der Ferne (über den Adapter) blockiert.                                            |
| `errorMsg`                      | Zeichenkette    | `text`                | Nur Lesen       | Aktuelle Fehlermeldungen oder Statustexte des Ofens.                                                                                                              |
| `heatOn`                        | boolescher Wert | `switch.power`        | Lesen/Schreiben | Hauptschalter, um den Saunaofen EIN (`true` ) oder AUS (`false` ) zu schalten.                                                                                    |
| `heaterPower`                   | Nummer          | `value.power`         | Nur Lesen       | _Hinweis:_ Dieses Objekt wird von der API bereitgestellt, liefert aber derzeit oft`0 kW` (nicht ausgefüllt). Es ist vermutlich für zukünftige Updates reserviert. |
| `lightOn`                       | boolescher Wert | `switch.light`        | Lesen/Schreiben | Schalter für die integrierte Saunabeleuchtung.                                                                                                                    |
| `maxDuration`                   | Nummer          | `level.timer`         | Lesen/Schreiben | Maximale Heizdauer für die Saunasitzung in Minuten (`min` ).                                                                                                      |
| `panelTemp`                     | Nummer          | `value.temperature`   | Nur Lesen       | Temperaturmesswert direkt an der physischen Steuereinheit / Panel.                                                                                                |
| `targetTemp`                    | Nummer          | `level.temperature`   | Lesen/Schreiben | Zieltemperatur-Sollwert für die Saunakabine (z. B.`90 °C` ).                                                                                                      |
| `temp`                          | Nummer          | `value.temperature`   | Nur Lesen       | Die aktuelle Umgebungstemperatur in der Saunakabine (z. B.`17 °C` ).                                                                                              |
| `readyNotified10Min`            | boolescher Wert | `indicator`           | Nur Lesen       | Wird`true` , wenn die Sauna noch ca. 10 Minuten von der Zieltemperatur entfernt ist (13°C unter Ziel).                                                            |
| `targetReachedNotified`         | boolescher Wert | `indicator`           | Nur Lesen       | Wird`true` , wenn die Sauna die eingestellte Zieltemperatur erfolgreich erreicht hat.                                                                             |
| `totalBathingHours`             | Nummer          | `value.number`        | Nur Lesen       | Historische kumulierte Betriebsstunden der Saunanutzung (`h` ).                                                                                                   |
| `totalOperatingHours`           | Nummer          | `value.hours`         | Nur Lesen       | Gesamte Betriebsstunden des Systems (`h` ).                                                                                                                       |
| `totalSessions`                 | Nummer          | `value.count`         | Nur Lesen       | Zähler für die Gesamtzahl der durchgeführten Heizvorgänge.                                                                                                        |

---

## Intelligente Funktionen und Automatisierungen

### 1. Adaptive Aufheizzeit-Prognose & Anomalie-Erkennung

- **Lernende Aufheizdauer (`estimatedHeatingTimeRemaining` &`info.avgHeatingRate` ):**\
  &#x20;Der Adapter lernt bei jedem Heizvorgang die typische Heizrate Ihrer Saunakabine (°C pro Minute). Während des Aufheizens kombiniert er historische Erfahrungswerte mit dem aktuellen Live-Temperaturanstieg, um die verbleibende Ruhezeit bis zur Zieltemperatur minutengenau zu prognostizieren.
- **Beidseitige Anomalie-Erkennung (`info.heatingAnomaly` ,`info.heatingAnomalyType` ,`info.heatingAnomalyDesc` ):**\
  &#x20;Nach mindestens 10 Minuten aktivem Heizen vergleicht der Adapter die reale Aufheizrate mit dem gelernten Durchschnitt:
  - **Zu langsam (`too_slow` ):** Fällt die Heizrate unter 50 % des Schnitts (z. B. Saunatür angelehnt oder Ausfall eines Heizstabs), wird`info.heatingAnomaly` auf`true` gesetzt.
  - **Zu schnell (`too_fast` ):** Steigt die Heizrate über 180 % des Schnitts (z. B. Temperaturfühler verrutscht, Hitzestau am Sensor oder klebendes Schütz), wird`info.heatingAnomaly` auf`true` gesetzt.
  - `info.heatingAnomalyDesc` Liefert eine verständliche Fehlerbeschreibung für Push-Benachrichtigungen oder Visualisierungen.

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

_Hinweis: Diese Zustände werden automatisch aktiviert`false` zurückgesetzt, wenn der Ofen ausgeschaltet wird oder ein neuer Heizvorgang beginnt._

---

## Fehlerbehebung

### Häufige API-Fehler & Statusmeldungen in`errorMsg`

- **`Action blocked (403 Forbidden). Remote start authorization (Safety Loop) at panel might not be active.`**
  - **Ursache:** Die europäische Sicherheitsnorm schreibt vor, dass ein Fernstart nur aktiv sein darf, wenn der Sicherheitskreis/Türsensor geschlossen ist und der Fernstart physisch am Saunapanel scharf geschaltet wurde.
  - **Lösung:** Schließe die Saunatür und drücke am physischen Harvia-Bedienfeld den **Fernstart** -Taste. Das Fernstart-Symbol auf dem Display muss leuchten. Erst danach ist die Steuerung über den Adapter freigegeben.
- **`Cloud lock: Device busy, command discarded.`(Auch Debug-Protokoll)**
  - **Ursache:** Die Harvia-API-Befehle blockieren, wenn sie in zu schneller Folge gesendet werden (z. B. durch schnelles Klicken in der Vis), um die Hardware zu schützen.
  - **Lösung:** Warten Sie einige Sekunden zwischen den Befehlen. Der Adapter verwirft zu schnelle Klicks automatisch, um eine API-Sperre zu verhindern.

---

## Aufgabenliste

- [ ] Auf offizielle Erlaubnis von Harvia zur Nutzung des Original-Logos warten
- [ ] Automatische Kaltgetränke-Bereitstellungs-Erinnerung für den Saunagang 🍺❄️
- [ ] KI-gestützter Handtuch-Wurf-Roboter für den perfekten Aufguss entwickeln 🧖‍♂️🪣

---

## Änderungsprotokoll (Changelog)

### **IN BEARBEITUNG**

### 0.5.0 (2026-09-09)

- (meistermopper) Beidseitige Heizanomalie-Erkennung hinzugefügt (zu langsam/schnell)
- (meistermopper) Aktualisiere @alcalzone/release-script-plugin-license auf 5.2.2
- (meistermopper) Node.js 26 zur Testmatrix hinzugefügt

### 0.4.0 (2026-08-13)

- (meistermopper) Adaptive Heizdauerprognose und Anomalieerkennung hinzufügen
- (meistermopper) Füge eine Verknüpfung für das Entwickler-Skript „dev-server watch“ in package.json hinzu.
- (meistermopper) Partner-ID und Einrichtungsanweisungen präzisieren
- (meistermopper) Dokumentierte adaptive Heizungsprognose und Anomalieerkennung
- (meistermopper) Füge der AGENTS.md-Datei eine strenge Datenschutz- und Anonymisierungsregel hinzu.
- (meistermopper) Die To-Do-Liste aufräumen und lustige Wunschlistenpunkte hinzufügen

### 0.3.2 (2026-08-11)

- (meistermopper) Verwenden Sie absolute GitHub-URLs für Sprachumschaltlinks in README-Dateien.
- (meistermopper) Entferne die Badges für das neueste Repository und die Übersetzung aus den README-Dateien
- (meistermopper) Hinzufügen des stabilen Repositorys in der Aufgabenliste als abgeschlossen markieren
- (meistermopper) Direkte npm-Installationsanweisungen aus den README-Dateien entfernen
- (dependabot) Axios von 1.18.1 auf 1.19.0 aktualisieren.
- (meistermopper) Logo des Mitteladapters in den README-Dateien
- (meistermopper) Weblate-Übersetzungsstatus-Badge zu README-Dateien hinzufügen
- (meistermopper) Füge den Schritt „npm run translate“ zum release-before-commit-Skript hinzu.
- (meistermopper) Statisches „latest“-Badge durch dynamisches iobroker.live-Badge ersetzen

### 0.3.1 (2026-08-04)

- (meistermopper) GitHub Actions im automatischen Übersetzungs-Workflow auf Version 7 aktualisieren
- (meistermopper) Füge eine Autorisierungsregel für Git-Commits und -Pushes zu AGENTS.md hinzu.
- (meistermopper) Automatischer Übersetzungs-Workflow für automatische i18n-Übersetzungen hinzugefügt
- (meistermopper) Fehlenden Link CHANGELOG\_OLD zu den README-Dateien hinzufügen
- (meistermopper) Nicht übersetzte News-Einträge für Version 0.2.8 in io-package.json korrigiert.
- (meistermopper) Füge die Übersetzungsregel common.news zu AGENTS.md hinzu.
- (meistermopper) Überflüssiges npm-Badge entfernen und Test- und Release-Badge hinter das npm-Banner verschieben

### 0.3.0 (2026-07-29)

- (meistermopper) Konfigurierbare Mindest-/Maximaltemperaturgrenzen und maximale Dauer in der Admin-Oberfläche hinzufügen.

[Ältere Einträge können hier gefunden werden](https://github.com/meistermopper/ioBroker.harvia-fenix/blob/main/CHANGELOG_OLD.md)

---

## Lizenz

MIT-Lizenz

Copyright © 2026 meistermopper <meister.mopper@gmail.com>