---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.pondpump/README.md
title: ioBroker.pondpump
hash: 7nZvGqyFhkU7WKkes9h0x0HW3MPW88FZnAbT2JqHK8I=
---
![Logo](../../../en/adapterref/iobroker.pondpump/admin/pondpump.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.pondpump.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.pondpump.svg)
![Anzahl der Installationen](https://iobroker.live/badges/pondpump-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/pondpump-stable.svg)
![NPM](https://nodei.co/npm/iobroker.pondpump.png?downloads=true)

# IoBroker.pondpump
**Tests:** ![Test und Freigabe](https://github.com/ssbingo/ioBroker.pondpump/workflows/Test%20and%20Release/badge.svg)

---

<p align="center"> <a href="https://www.buymeacoffee.com/ssbingo"><img src="https://img.buymeacoffee.com/button-api/?text=Buy%20me%20a%20coffee&emoji=&slug=ssbingo&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" /></a> </p>

---

## Teichpumpenadapter für ioBroker
Steuern und überwachen Sie **OASE AquaMax Eco Titanium** Teichpumpen über die **OASE Garden Controller Cloud (EGC)** – lokal und über die Cloud.

Produktseiten der Hersteller:

- [OASE AquaMax Eco Titanium](https://www.oase.com/) (Teichpumpe, Artikel 73656)
- [OASE Garden Controller Cloud](https://www.oase.com/) (EGC-Gateway, Artikel 55317)

### Haftungsausschluss
Dies ist ein **inoffizielles Community-Projekt**. Es steht in keiner Verbindung zu OASE GmbH und wird weder von dieser unterstützt noch empfohlen.

„OASE“, „AquaMax“ und ähnliche Produktnamen sind Marken der OASE GmbH und werden hier ausschließlich zur Beschreibung der Gerätekompatibilität verwendet.
Das Kommunikationsprotokoll wurde unabhängig analysiert – die Verwendung dieses Adapters erfolgt auf eigene Gefahr.

Danksagung: [mr-suw/ioBroker.oasecontrol](https://github.com/mr-suw/ioBroker.oasecontrol) (Adapter für die EGC-Sockelsteuerungen, FM-Master EGC) diente als wertvolle Protokollreferenz. Es wurde kein Code kopiert; dieser Adapter ist für intelligente Teichpumpen konzipiert und wurde von Grund auf neu entwickelt.

### Unterstützte Hardware
| Gerät | Artikelnummer | Rolle |
| --- | --- | --- |
| OASE Garden Controller Cloud (EGC) | 55317 | Gateway (`GatewayCloud`) |
| OASE AquaMax Eco Titanium | 73656 | Teichpumpe (Gartenpumpe) |

### Projektstatus
- **Phase 1 – Cloud-Nur-Lesezugriff** ✓ Abfrage des OASE-Cloud-Inventars; Gateway und beide Pumpen mit Live-Status
- **Phase 2 – Cloud-Steuerung** ✓ Pumpenein/aus und Drehzahl sind über den Cloud-Tunnel beschreibbar
- **Phase 4 – Live-Telemetrie** ✓ Leistung, Motordrehzahl, Temperatur und Netzspannung werden bei jeder Abfrage live ausgelesen.
- **Phase 3 – Lokaler (LAN-)Transport** ✓ Der Verbindungsmodus „lokal“ betreibt den gesamten Adapter über das lokale Netzwerk.

Ohne Cloud: Inventarisierung, Live-Telemetrie und Ein-/Ausschalten sowie Geschwindigkeitsregelung – alles über das LAN.

**Cloud-Authentifizierung:** Die OASE-Cloud verwendet **Azure AD B2C** (`account.oase.com`). Der Adapter authentifiziert sich mit dem Headless-freundlichen **Refresh-Token-Grant**: Erfasst einmalig ein Refresh-Token bei der Anmeldung in einer OASE-App und fügt es (verschlüsselt) in die Adaptereinstellungen ein. Der Adapter tauscht es gegen kurzlebige Zugriffstoken aus und rotiert das Refresh-Token transparent. **Ihr Kontopasswort wird vom Adapter weder eingegeben noch gespeichert.** Ohne Refresh-Token startet der Adapter, meldet jedoch `info.connection = false` mit einer deutlichen Warnung.

### Konfiguration
Alle Einstellungen sind in der Admin-Benutzeroberfläche (JSON-Konfiguration) verfügbar:

| Schauplatz | Beschreibung |
| --- | --- |
| Verbindungsmodus | `cloud` oder `local` (sich gegenseitig ausschließend) |
| Abfrageintervall | Abfrageintervall in Sekunden (Standard 30) |
| Cloud-Benutzername / Passwort | OASE-Cloud-Kontodaten (Passwort verschlüsselt gespeichert) |
| Controller-IP | IP-Adresse des EGC-Gateways (lokaler Modus) |
| Gerätepasswort | Gerätepasswort für die lokale Authentifizierung (verschlüsselt gespeichert) |
| Bindungsadresse / Port | Lokaler TLS-Server, mit dem der Controller eine Verbindung herstellt |

## Dokumentation
📖 **Handbuch für Anfänger:** [Englisch](doc/handbook/en/manual.md) ([PDF](doc/handbook/en/manual.pdf)) · [Deutsch](doc/handbook/de/manual.md) ([PDF](doc/handbook/de/manual.pdf))

Übersetzte Dokumentation:

- 🇩🇪 [Deutsche Dokumentation](doc/de/README.md)
- 🇷🇺 [Dokumente auf Russisch](doc/ru/README.md)
- 🇳🇱 [Niederländische Dokumentation](doc/nl/README.md)
- 🇫🇷 [Documentation française](doc/fr/README.md)
- 🇮🇹 [Documentazione Italiana](doc/it/README.md)
- 🇪🇸 [Documentación en español](doc/es/README.md)
- 🇵🇱 [Dokumentacja polska](doc/pl/README.md)
- 🇵🇹 [Portugiesische Dokumentation](doc/pt/README.md)
- 🇺🇦 [Документація українською](doc/uk/README.md)
- 🇨🇳 [简体中文文档](doc/zh-cn/README.md)

Ältere Änderungsprotokolle finden Sie in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.2.1 (2026-08-14)

- (ssbingo) Maintenance: synced the auto-merged repository updates — Dependabot bumps (`@iobroker/json-config` 9.0.18, `@iobroker/gui-components` 10.1.0, `@module-federation/vite` 1.20.4) with the admin and widget bundles rebuilt to match, plus ioBroker template updates (`node:` import prefixes, `CHANGELOG_OLD.md`, Dependabot/CI tuning)

### 0.2.0 (2026-08-05)

- (ssbingo) **Requires ioBroker admin ≥ 8.0.0.** The admin scheduler component is migrated to the admin-8 UI stack — **React 19 + MUI 9** via `@iobroker/gui-components` and `@iobroker/json-config` 9 (replacing `@iobroker/adapter-react-v5`, which has no React 19 release). The vis-2 widgets stay on the vis-2 host stack (React 18 / MUI 6)
- (ssbingo) Minimum requirements raised: **js-controller ≥ 6.0.11, admin ≥ 8.0.0, Node.js ≥ 22**

### 0.1.0 (2026-07-26)

- (ssbingo) **Milestone release.** Consolidates the full feature set — cloud & local control with live telemetry, **SFC** (Seasonal Flow Control), two **vis-2 widgets**, and **per-pump time schedules** — into the first **0.1.x** milestone
- (ssbingo) Maintenance: the ioBroker adapter checker is clean (no errors, no suggestions) — Dependabot now uses randomised cron schedules and the deploy action is pinned to its major version (`@v1`)

### 0.0.9 (2026-07-26)

- (ssbingo) **Phase 9 — per-pump time schedules.** The adapter settings gain a **Schedules** section (bottom of the Connection tab) that lists the detected pumps; enable a pump and it gets its own **“Scheduler – &lt;pump&gt;” tab** where you set a **base power** (applied outside all windows) and a sorted list of **time windows**, each setting a power % or switching **SFC** on/off. The adapter runs the schedule and applies the target at the window boundaries. **Overlapping windows are rejected** — the editor validates live and the backend re-checks before applying

### 0.0.8 (2026-07-25)

- (ssbingo) Control widget: a dropdown next to the power slider lets you set the power in precise **5 % steps** (0–100 %). It writes the same setpoint as the quick buttons and is disabled while SFC controls the flow; it can be hidden via the new “Show 5 % dropdown” option

### 0.0.7 (2026-07-24)

- (ssbingo) Widgets: during Seasonal Flow Control (SFC) the pump visualization now reflects the **real** pump speed — the ice crystal spins by the actual (SFC-driven) speed like the impeller, the “Power” value shows the real output, and the control widget’s power slider shows the actual output (disabled while SFC controls the flow). Uses a live rpm-per-percent calibration learned during normal operation
- (ssbingo) Dependencies: processed the pending Dependabot updates — `@iobroker/adapter-react-v5` → 8.3.2 and `@module-federation/vite` → 1.19.1 (a leaner widget bundle), plus CI action bumps. Major bumps that would break vis-2 host compatibility (React 19, MUI 9, Vite 8, plugin-react 6, TypeScript 7) are pinned via Dependabot ignore rules, because the vis-2 host shares React 18 + MUI 6 as module-federation singletons

### 0.0.6 (2026-07-24)

- (ssbingo) Maintenance: updated the CI deploy action (`testing-action-deploy` 1.5.1 → 1.5.2) and tidied up the repository (removed stale/merged and open Dependabot branches). No functional changes to the adapter

### 0.0.5 (2026-07-24)

- (ssbingo) Phase 6 — the adapter now ships two **vis-2 widgets**. *Pump visualization* shows an impeller that spins with the pump speed (in 10 % steps), a rotating ice crystal while frost-protection (SFC) mode is active, and a red cross with a still impeller when the pump is off, plus live power (W), motor speed (rpm) and the “Power” setpoint (%). *Pump control* offers on/off, a speed slider and quick presets. Both widgets have an instance and pump selector and derive their state IDs themselves; vis-2 is restarted automatically on install so the widgets appear immediately
- (ssbingo) Seasonal Flow Control (SFC) can now be switched from the adapter: the SFC on/off command (ONet `0x5000`) was reverse-engineered, exposed as a new writable `control.sfc` state, and wired into the control widget's SFC button; the pump visualization reflects the active SFC state. SFC is OASE's temperature-dependent seasonal throughput reduction (up to −50 %), not frost protection
- (ssbingo) Hardening: all transport timers are now adapter-managed (auto-cancelled on unload — compact-mode safe), and a batch of ioBroker adapter-checker findings were resolved (CI/deploy on Node 24, dependabot cooldown + auto-merge migration, `io-package.json` metadata)

### 0.0.4 (2026-07-24)

- (ssbingo) Phase 7 — cloud and local are now mutually exclusive: the `both` connection mode was removed (a saved `both` is migrated to `cloud`). When you switch between `cloud` and `local`, the device objects are rebuilt cleanly so the two never mix, and the new `info.connectionType` state shows which data source is active

### 0.0.3 (2026-07-23)

- (ssbingo) Phase 3 — local (LAN) transport is complete: connection mode `local` runs the whole adapter over the local network without the cloud. The adapter wakes the controller over UDP, the controller connects back over TLS (legacy cipher, self-signed certificate), authenticates with the device password, then reads the gateway and pumps, polls live telemetry (power, speed, temperature, voltage) and controls on/off and speed — all over the LAN. The poll and command path is transport-agnostic (local preferred, cloud fallback), and on/off is derived from live telemetry. Note: the speed setpoint value is not read back over the local channel yet
- (ssbingo) Documentation: multilingual README docs in 11 languages (under `doc/<lang>/`), beginner handbooks in English and German with a step-by-step mitmproxy guide (available as PDF), a Documentation section and CHANGELOG_OLD.md

### 0.0.2 (2026-07-23)

- (ssbingo) Phase 1 – cloud read-only: connects to the OASE Garden Controller Cloud (Azure AD B2C refresh-token auth), discovers the gateway and pumps, and polls live speed and status
- (ssbingo) Phase 2 – cloud control: pump on/off and speed (0–100 %) are writable and sent through the cloud SendONetPacket tunnel, verified byte-for-byte against the app
- (ssbingo) Phase 4 – live telemetry: power (W), motor speed (rpm), temperature (°C) and mains voltage (V) are read live each poll; still-unmapped sensors are exposed as raw values for classification
- (ssbingo) Pumps are named after their controller name; new stylized adapter icon (own illustration, not the product photo)
- (ssbingo) Extensive, component-tagged logging so any failure can be pinpointed from the logs, with secrets never logged

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2026 ssbingo <s.sternitzke@online.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.