<p align="center">
  <a href="https://smarterpapa.de">
    <img src="admin/smarterpapa-logo.png" alt="SmarterPapa" width="120" />
  </a>
</p>

<p align="center">
  <img src="admin/ultrahuman.png" alt="Ultrahuman" width="100" />
</p>

# ioBroker.ultrahuman

**Current adapter version:** 0.1.13

[![NPM version](https://img.shields.io/npm/v/iobroker.ultrahuman.svg)](https://www.npmjs.com/package/iobroker.ultrahuman)
[![Downloads](https://img.shields.io/npm/dm/iobroker.ultrahuman.svg)](https://www.npmjs.com/package/iobroker.ultrahuman)
![Number of Installations](https://iobroker.live/badges/ultrahuman-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/ultrahuman-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.ultrahuman.png?downloads=true)](https://nodei.co/npm/iobroker.ultrahuman/)

![Test and Release](https://github.com/SmarterPapa/ioBroker.ultrahuman/actions/workflows/test-and-release.yml/badge.svg)
[![License](https://img.shields.io/github/license/SmarterPapa/ioBroker.ultrahuman)](https://github.com/SmarterPapa/ioBroker.ultrahuman/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/SmarterPapa/ioBroker.ultrahuman)](https://github.com/SmarterPapa/ioBroker.ultrahuman/issues)

## Ultrahuman Ring Adapter for ioBroker

This adapter reads health metrics from your **Ultrahuman Ring** via the [Ultrahuman Partner API](https://blog.ultrahuman.com/blog/accessing-the-ultrahuman-partnership-api/) and creates ioBroker objects you can use in visualizations, scripts, and automations.

**Detailed guide (German):** [Ultrahuman Ring im ioBroker – Schlaf, HRV & Gesundheitsdaten](https://smarterpapa.de/ultrahuman-ring-iobroker-adapter-gesundheitsdaten-smart-home/) (SmarterPapa.de) — installation, all data points, automation examples, FAQ.

Source code: [GitHub](https://github.com/SmarterPapa/ioBroker.ultrahuman)

**Maintainers:** Enable [Trusted Publishers](https://docs.npmjs.com/trusted-publishers) for `iobroker.ultrahuman` (this GitHub repo). Releases use `ioBroker/testing-action-deploy@v1` on **Node.js 24** with OIDC only (no `npm-token`). See [testing-action-deploy#19](https://github.com/ioBroker/testing-action-deploy/issues/19).

### Installation

Install the adapter via the ioBroker Admin interface:

1. Open **Adapters** in ioBroker Admin
2. Search for **ultrahuman**
3. Click **Install**

### Available metrics

| Channel           | State              | Description                   | Unit     |
|-------------------|--------------------|-------------------------------|----------|
| `sleep`           | `bedtimeStart`     | Time you went to bed          | ISO 8601 |
| `sleep`           | `bedtimeEnd`       | Time you got up               | ISO 8601 |
| `sleep`           | `timeInBed`        | Total time in bed             | min      |
| `sleep`           | `timeAsleep`       | Total time asleep             | min      |
| `sleep`           | `timeToFallAsleep` | How long it took to fall asleep | min    |
| `sleep`           | `sleepEfficiency`  | Sleep efficiency              | %        |
| `sleep`           | `sleepScore`       | Sleep score                   |          |
| `sleep`           | `sleepQuality`     | Sleep quality (excellent/good/fair/poor) |  |
| `sleep`           | `remSleep`         | REM sleep duration            | min      |
| `sleep`           | `deepSleep`        | Deep sleep duration           | min      |
| `sleep`           | `lightSleep`       | Light sleep duration          | min      |
| `sleep`           | `restorativeSleep` | Restorative sleep (REM + deep) | %       |
| `sleep`           | `sleepCycles`      | Full sleep cycles             |          |
| `heart`           | `restingHR`        | Resting heart rate (sleep)    | bpm      |
| `heart`           | `nightRHR`         | Night resting heart rate      | bpm      |
| `heart`           | `lastReading`      | Last HR reading               | bpm      |
| `heart`           | `avg` / `min` / `max` | Heart rate statistics      | bpm      |
| `heart`           | `trend`            | Heart rate trend              |          |
| `hrv`             | `average`          | Average HRV                   | ms       |
| `hrv`             | `sleepHRV`         | Average sleep HRV             | ms       |
| `hrv`             | `min` / `max`      | HRV statistics                | ms       |
| `hrv`             | `trend`            | HRV trend                     |          |
| `spo2`            | `avg` / `min` / `max` | Blood oxygen statistics    | %        |
| `temperature`     | `lastReading`      | Last skin temperature         | °C       |
| `temperature`     | `avg` / `min` / `max` | Temperature statistics     | °C       |
| `activity`        | `steps`            | Total steps today             | steps    |
| `activity`        | `stepsAvg`         | Average steps                 | steps    |
| `activity`        | `activeMinutes`    | Active minutes                | min      |
| `activity`        | `movementIndex`    | Movement index                |          |
| `activity`        | `recoveryIndex`    | Recovery index                |          |
| `activity`        | `vo2Max`           | VO2 max                       | ml/kg/min|
| `info`            | `connection`       | API connection status         | boolean  |
| `info`            | `lastUpdate`       | Last successful update        | ISO 8601 |

### Prerequisites

You need access to the **Ultrahuman Partner API**:

1. Send an email to **feedback@ultrahuman.com** and request API access for personal use.
2. You will receive an **API Key** and an **Access Code**.
3. In the Ultrahuman app, go to **Profile > Settings > Partner ID** and enter the **Access Code**.
4. Configure the **API Key** and your account email in the adapter settings.

### Configuration

| Setting            | Description                                  | Default |
|--------------------|----------------------------------------------|---------|
| API Secret         | Your Ultrahuman Partner API authorization key | —       |
| User Email         | Email address linked to your Ultrahuman account | —    |
| Polling Interval   | How often to fetch data (minutes)            | 30      |

The minimum polling interval is 5 minutes. Since ring data syncs periodically (not in real-time), 30 minutes is recommended.

### Support

If you find this adapter useful, consider supporting the development:

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/smarterpapa)

### Acknowledgments

API integration based on [ultrahuman-dashboard](https://github.com/mt-krainski/ultrahuman-dashboard) by Matt Krainski (MIT License).

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
