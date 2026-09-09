---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ultrahuman/README.md
title: ioBroker.ultrahuman
hash: R1YcZ1BZ5ycyrc+uVpXAhqUMGoj61l8x8+LvBwmnAZA=
---
![NPM-Version](https://img.shields.io/npm/v/iobroker.ultrahuman.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.ultrahuman.svg)
![Anzahl der Installationen](https://iobroker.live/badges/ultrahuman-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/ultrahuman-stable.svg)
![NPM](https://nodei.co/npm/iobroker.ultrahuman.png?downloads=true)
![Test und Freigabe](https://github.com/SmarterPapa/ioBroker.ultrahuman/actions/workflows/test-and-release.yml/badge.svg)
![Lizenz](https://img.shields.io/github/license/SmarterPapa/ioBroker.ultrahuman)
![GitHub-Probleme](https://img.shields.io/github/issues/SmarterPapa/ioBroker.ultrahuman)

<p align="center">
  <a href="https://smarterpapa.de">
    <img src="admin/smarterpapa-logo.png" alt="SmarterPapa" width="120" />
  </a>
</p>

<p align="center">
  <img src="admin/ultrahuman.png" alt="Ultrahuman" width="100" />
</p>

# ioBroker.ultrahuman

**Aktuelle Adapterversion:** 0.1.13

## Ultrahuman Ringadapter für ioBroker

Dieser Adapter liest Gesundheitsmetriken von Ihrem **Ultrahuman Ring** über die [Ultrahuman Partner API](https://blog.ultrahuman.com/blog/accessing-the-ultrahuman-partnership-api/) und erstellt ioBroker-Objekte, die Sie in Visualisierungen, Skripten und Automatisierungen verwenden können.

**Ausführlicher Leitfaden (deutsch):** [Ultrahuman Ring im ioBroker – Schlaf, HRV & Gesundheitsdaten](https://smarterpapa.de/ultrahuman-ring-iobroker-adapter-gesundheitsdaten-smart-home/) (SmarterPapa.de) – Installation, alle Datenpunkte, Automatisierungsbeispiele, FAQ.

Quellcode: [GitHub](https://github.com/SmarterPapa/ioBroker.ultrahuman)

**Betreuer:** [Vertrauenswürdige Herausgeber](https://docs.npmjs.com/trusted-publishers) aktivieren für`iobroker.ultrahuman` (dieses GitHub-Repository). Releases verwenden`ioBroker/testing-action-deploy@v1` auf **Node.js 24** nur mit OIDC (kein`npm-token` Siehe [testing-action-deploy#19](https://github.com/ioBroker/testing-action-deploy/issues/19) .

### Installation

Installieren Sie den Adapter über die ioBroker-Admin-Oberfläche:

1. **Adapter** in ioBroker Admin öffnen
2. Suche nach **Übermenschen**
3. Klicken Sie auf **Installieren.**

### Verfügbare Metriken

| Kanal         | Zustand             | Beschreibung                                            | Einheit         |
| ------------- | ------------------- | ------------------------------------------------------- | --------------- |
| `sleep`       | `bedtimeStart`      | Zeit, dass du ins Bett gegangen bist                    | ISO 8601        |
| `sleep`       | `bedtimeEnd`        | Zeit, dass du aufgestanden bist                         | ISO 8601        |
| `sleep`       | `timeInBed`         | Gesamte Zeit im Bett                                    | min             |
| `sleep`       | `timeAsleep`        | Gesamtschlafzeit                                        | min             |
| `sleep`       | `timeToFallAsleep`  | Wie lange es dauerte, bis ich einschlief                | min             |
| `sleep`       | `sleepEfficiency`   | Schlafeffizienz                                         | %               |
| `sleep`       | `sleepScore`        | Schlafbewertung                                         |                 |
| `sleep`       | `sleepQuality`      | Schlafqualität (ausgezeichnet/gut/mittelmäßig/schlecht) |                 |
| `sleep`       | `remSleep`          | REM-Schlafdauer                                         | min             |
| `sleep`       | `deepSleep`         | Tiefschlafdauer                                         | min             |
| `sleep`       | `lightSleep`        | Dauer des leichten Schlafs                              | min             |
| `sleep`       | `restorativeSleep`  | Erholungsschlaf (REM + Tiefschlaf)                      | %               |
| `sleep`       | `sleepCycles`       | Vollständige Schlafzyklen                               |                 |
| `heart`       | `restingHR`         | Ruhepuls (Schlaf)                                       | bpm             |
| `heart`       | `nightRHR`          | Ruhepuls in der Nacht                                   | bpm             |
| `heart`       | `lastReading`       | Letzter HR-Wert                                         | bpm             |
| `heart`       | `avg` /`min` /`max` | Herzfrequenzstatistik                                   | bpm             |
| `heart`       | `trend`             | Herzfrequenztrend                                       |                 |
| `hrv`         | `average`           | Durchschnittliche HRV                                   | MS              |
| `hrv`         | `sleepHRV`          | Durchschnittliche Schlaf-HRV                            | MS              |
| `hrv`         | `min` /`max`        | HRV-Statistiken                                         | MS              |
| `hrv`         | `trend`             | HRV-Trend                                               |                 |
| `spo2`        | `avg` /`min` /`max` | Blutsauerstoffstatistik                                 | %               |
| `temperature` | `lastReading`       | Letzte Hauttemperatur                                   | °C              |
| `temperature` | `avg` /`min` /`max` | Temperaturstatistik                                     | °C              |
| `activity`    | `steps`             | Schritte heute insgesamt                                | Schritte        |
| `activity`    | `stepsAvg`          | Durchschnittliche Schritte                              | Schritte        |
| `activity`    | `activeMinutes`     | Aktive Minuten                                          | min             |
| `activity`    | `movementIndex`     | Bewegungsindex                                          |                 |
| `activity`    | `recoveryIndex`     | Erholungsindex                                          |                 |
| `activity`    | `vo2Max`            | VO2 max                                                 | ml/kg/min       |
| `info`        | `connection`        | API-Verbindungsstatus                                   | boolescher Wert |
| `info`        | `lastUpdate`        | Letzte erfolgreiche Aktualisierung                      | ISO 8601        |

### Voraussetzungen

Sie benötigen Zugriff auf die **Ultrahuman Partner API** :

1. Senden Sie eine E-Mail an **<feedback@ultrahuman.com>** und beantragen Sie API-Zugriff für den persönlichen Gebrauch.
2. Sie erhalten einen **API-Schlüssel** und einen **Zugriffscode** .
3. In der Ultrahuman-App gehen Sie zu **Profil > Einstellungen > Partner-ID** und geben den **Zugangscode** ein.
4. Konfigurieren Sie den **API-Schlüssel** und Ihre Konto-E-Mail-Adresse in den Adaptereinstellungen.

### Konfiguration

| Einstellung          | Beschreibung                                                 | Standard |
| -------------------- | ------------------------------------------------------------ | -------- |
| API-Geheimnis        | Ihr Ultrahuman Partner API-Autorisierungsschlüssel           | —        |
| Benutzer-E-Mail      | E-Mail-Adresse, die mit Ihrem Ultrahuman-Konto verknüpft ist | —        |
| Abstimmungsintervall | Wie oft sollen die Daten abgerufen werden (Minuten)?         | 30       |

Das minimale Abfrageintervall beträgt 5 Minuten. Da die Ringdaten periodisch (nicht in Echtzeit) synchronisiert werden, werden 30 Minuten empfohlen.

### Unterstützung

Wenn Sie diesen Adapter nützlich finden, erwägen Sie, die Entwicklung zu unterstützen:

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/smarterpapa)

### Danksagungen

API-Integration basierend auf [ultrahuman-dashboard](https://github.com/mt-krainski/ultrahuman-dashboard) von Matt Krainski (MIT-Lizenz).

## Changelog

### 0.1.13 (2026-04-11)

* Deploy uses **Node.js 24** with `testing-action-deploy@v1`; **Trusted Publishing** only (no `npm-token`), per maintainer note on [testing-action-deploy#19](https://github.com/ioBroker/testing-action-deploy/issues/19)

### 0.1.12 (2026-04-10)

* **0.1.12:** `testing-action-deploy@v1` with **`npm-token`** again (OIDC-only path breaks on `ubuntu-latest` during global npm upgrade); README documents **W3019** trade-off
* `common.news` trimmed to seven entries (W1032); **0.1.3** moved to history only via [CHANGELOG_OLD.md](https://github.com/SmarterPapa/ioBroker.ultrahuman/blob/main/CHANGELOG_OLD.md)

### 0.1.11 (2026-04-09)

* GitHub Releases: `ioBroker/testing-action-deploy@v1` with granular `NPM_TOKEN` (Bypass 2FA)
* Changelog lists **0.1.11** here; older releases in [CHANGELOG_OLD.md](https://github.com/SmarterPapa/ioBroker.ultrahuman/blob/main/CHANGELOG_OLD.md)
* Dependabot default cooldown 7 days; includes **0.1.9**–**0.1.10** fixes (integration tests, Admin `jsonConfig`)

### 0.1.8 (2026-03-27)

* `io-package.json` `common.news` reduced to 7 entries (ioBroker repository checker [W1032](https://github.com/ioBroker/ioBroker.repochecker))

### 0.1.7 (2026-03-26)

* Package `homepage` (npm) points to the [detailed German blog guide](https://smarterpapa.de/ultrahuman-ring-iobroker-adapter-gesundheitsdaten-smart-home/) on SmarterPapa.de
* README and ioBroker Admin (About tab) link to the same article; GitHub remains the `repository` URL

Older versions: [CHANGELOG_OLD.md](https://github.com/SmarterPapa/ioBroker.ultrahuman/blob/main/CHANGELOG_OLD.md).

## License

MIT License — see [LICENSE](https://github.com/SmarterPapa/ioBroker.ultrahuman/blob/main/LICENSE) for details.

Copyright (c) 2026 [SmarterPapa](https://smarterpapa.de)