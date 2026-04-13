---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ultrahuman/README.md
title: ioBroker.ultrahuman
hash: /aUkipe/Y5ppAozHBDSiU8rVgILsWcohBwjlD/NKIC0=
---
![NPM-Version](https://img.shields.io/npm/v/iobroker.ultrahuman.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.ultrahuman.svg)
![Anzahl der Installationen](https://iobroker.live/badges/ultrahuman-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/ultrahuman-stable.svg)
![NPM](https://nodei.co/npm/iobroker.ultrahuman.png?downloads=true)
![Lizenz](https://img.shields.io/github/license/SmarterPapa/ioBroker.ultrahuman)
![GitHub-Probleme](https://img.shields.io/github/issues/SmarterPapa/ioBroker.ultrahuman)

<p align="center"><a href="https://smarterpapa.de"><img src="admin/smarterpapa-logo.png" alt="SmarterPapa" width="120" /></a></p>

<p align="center"><img src="admin/ultrahuman.png" alt="Übermenschlich" width="100" /></p>

# IoBroker.ultrahuman
**Aktuelle Adapterversion:** 0.1.13

![Test und Freigabe](https://github.com/SmarterPapa/ioBroker.ultrahuman/actions/workflows/test-and-release.yml/badge.svg)

## Ultrahuman Ringadapter für ioBroker
Dieser Adapter liest Gesundheitsmetriken von Ihrem **Ultrahuman Ring** über [Ultrahuman Partner API](https://blog.ultrahuman.com/blog/accessing-the-ultrahuman-partnership-api/) und erstellt ioBroker-Objekte, die Sie in Visualisierungen, Skripten und Automatisierungen verwenden können.

**Ausführliche Anleitung (Deutsch):** [Ultrahuman Ring im ioBroker – Schlaf, HRV & Gesundheitsdaten](https://smarterpapa.de/ultrahuman-ring-iobroker-adapter-gesundheitsdaten-smart-home/) (SmarterPapa.de) — Installation, alle Datenpunkte, Automatisierungsbeispiele, FAQ.

Quellcode: [GitHub](https://github.com/SmarterPapa/ioBroker.ultrahuman)

**Maintainers:** Enable [Trusted Publishers](https://docs.npmjs.com/trusted-publishers) für `iobroker.ultrahuman` (dieses GitHub-Repository). Releases verwenden `ioBroker/testing-action-deploy@v1` auf **Node.js 24** mit OIDC (ohne `npm-token`). Siehe [testing-action-deploy#19]](https://github.com/ioBroker/testing-action-deploy/issues/19).

### Installation
Installieren Sie den Adapter über die ioBroker-Admin-Oberfläche:

1. Öffnen Sie **Adapter** in der ioBroker-Administration.
2. Suche nach **ultrahuman**
3. Klicken Sie auf **Installieren**

### Verfügbare Metriken
| Kanal | Bundesland | Beschreibung | Einheit |
|-------------------|--------------------|-------------------------------|----------|
| `sleep` | `bedtimeStart` | Uhrzeit, zu der du ins Bett gegangen bist | ISO 8601 |
| `sleep` | `timeInBed` | Gesamtzeit im Bett | min |
| `sleep` | `timeAsleep` | Gesamtschlafzeit | min |
| `sleep` | `timeToFallAsleep` | Wie lange es dauerte, einzuschlafen | min |
| `sleep` | `sleepEfficiency` | Schlafeffizienz | % |
| `sleep` | `sleepScore` | Schlaf-Score | |
| `sleep` | `sleepQuality` | Schlafqualität (ausgezeichnet/gut/mittelmäßig/schlecht) | |
| `sleep` | `remSleep` | REM-Schlafdauer | min |
| `sleep` | `deepSleep` | Tiefschlafdauer | min |
| `sleep` | `lightSleep` | Dauer des leichten Schlafs | min |
| `sleep` | `restorativeSleep` | Erholungsschlaf (REM + Tiefschlaf) | % |
| `sleep` | `sleepCycles` | Vollständige Schlafzyklen | |
| `heart` | `restingHR` | Ruhepuls (Schlaf) | bpm |
| `heart` | `nightRHR` | Ruhepuls in der Nacht | bpm |
| `heart` | `lastReading` | Letzter Herzfrequenzwert | Schläge pro Minute |
| `heart` | `avg` / `min` / `max` | Herzfrequenzstatistik | bpm |
| `heart` | `trend` | Herzfrequenzverlauf | |
| `hrv` | `average` | Durchschnittliche Herzfrequenzvariabilität (HRV) | ms |
| `hrv` | `sleepHRV` | Durchschnittliche Schlaf-HRV | ms |
| `hrv` | `min` / `max` | HRV-Statistiken | ms |
| `hrv` | `trend` | HRV-Trend | |
| `spo2` | `avg` / `min` / `max` | Blutsauerstoffstatistik | % |
| `temperature` | `lastReading` | Letzte Hauttemperatur | °C |
| `temperature` | `avg` / `min` / `max` | Temperaturstatistik | °C |
| `activity` | `steps` | Gesamtschritte heute | Schritte |
| `activity` | `stepsAvg` | Durchschnittliche Schritte | Schritte |
| `activity` | `activeMinutes` | Aktive Minuten | Min. |
| `activity` | `movementIndex` | Bewegungsindex | |
| `activity` | `recoveryIndex` | Wiederherstellungsindex | |
| `activity` | `vo2Max` | VO2 max | ml/kg/min|
| `info` | `connection` | API-Verbindungsstatus | Boolescher Wert |
| `info` | `lastUpdate` | Letzte erfolgreiche Aktualisierung | ISO 8601 |
| `info` | `lastUpdate` | Letzte erfolgreiche Aktualisierung | ISO 8601 |

### Voraussetzungen
Sie benötigen Zugriff auf die **Ultrahuman Partner API**:

1. Senden Sie eine E-Mail an **feedback@ultrahuman.com** und beantragen Sie API-Zugriff für den persönlichen Gebrauch.
2. Sie erhalten einen **API-Schlüssel** und einen **Zugangscode**.
3. Gehen Sie in der Ultrahuman-App zu **Profil > Einstellungen > Partner-ID** und geben Sie den **Zugangscode** ein.
4. Konfigurieren Sie den **API-Schlüssel** und Ihre Konto-E-Mail-Adresse in den Adaptereinstellungen.

### Konfiguration
| Einstellungen | Beschreibung | Standardwerte |
|--------------------|----------------------------------------------|---------|
| API-Geheimnis | Ihr Ultrahuman-Partner-API-Autorisierungsschlüssel | — |
| Benutzer-E-Mail | Mit Ihrem Ultrahuman-Konto verknüpfte E-Mail-Adresse | — |
| Abfrageintervall | Wie oft Daten abgerufen werden sollen (Minuten) | 30 |

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
* `common.news` trimmed to seven entries (W1032); **0.1.3** moved to history only via [CHANGELOG_OLD.md](CHANGELOG_OLD.md)

### 0.1.11 (2026-04-09)

* GitHub Releases: `ioBroker/testing-action-deploy@v1` with granular `NPM_TOKEN` (Bypass 2FA)
* Changelog lists **0.1.11** here; older releases in [CHANGELOG_OLD.md](CHANGELOG_OLD.md)
* Dependabot default cooldown 7 days; includes **0.1.9**–**0.1.10** fixes (integration tests, Admin `jsonConfig`)

### 0.1.8 (2026-03-27)

* `io-package.json` `common.news` reduced to 7 entries (ioBroker repository checker [W1032](https://github.com/ioBroker/ioBroker.repochecker))

### 0.1.7 (2026-03-26)

* Package `homepage` (npm) points to the [detailed German blog guide](https://smarterpapa.de/ultrahuman-ring-iobroker-adapter-gesundheitsdaten-smart-home/) on SmarterPapa.de
* README and ioBroker Admin (About tab) link to the same article; GitHub remains the `repository` URL

Older versions: [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License

MIT License — see [LICENSE](LICENSE) for details.

Copyright (c) 2026 [SmarterPapa](https://smarterpapa.de)