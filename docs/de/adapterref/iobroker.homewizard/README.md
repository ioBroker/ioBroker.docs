---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.homewizard/README.md
title: <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.homewizard@main/admin/homewizard.svg" width="48" align="top" /> ioBroker.homewizard
hash: Q2t+0YiBYUr835clE8viz19RW8bpanXF/ZD4mSYj9zo=
---
# <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.homewizard@main/admin/homewizard.svg" width="48" align="top" /> ioBroker.homewizard

![npm-Version](https://img.shields.io/npm/v/iobroker.homewizard)
![stabil](https://iobroker.live/badges/homewizard-stable.svg)
![Installationen](https://iobroker.live/badges/homewizard-installed.svg)
![npm-Downloads](https://img.shields.io/npm/dt/iobroker.homewizard)
![Knoten](https://img.shields.io/badge/node-%3E%3D22-brightgreen)
![Typoskript](https://img.shields.io/badge/TypeScript-strict-blue)
![Lizenz](https://img.shields.io/badge/license-MIT-green)
![Posten](https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white)
![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi)
![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge)

Echtzeit-Energiemonitoring für [HomeWizard](https://www.homewizard.com) Energiegeräte mit API v2.

---

## Merkmale
- **HomeWizard API v2** — HTTPS + WebSocket, Bearer-Token-Authentifizierung
- **mDNS-Kopplung** – Erkennung von `_homewizard._tcp`, zum Koppeln die Gerätetaste drücken.
- **WebSocket-Push** – Messwerte treffen etwa einmal pro Sekunde ein, System- und Batterieänderungen werden in Echtzeit übertragen; REST-Polling übernimmt, während die WebSocket-Verbindung wiederhergestellt wird
- **Steuerung der Steckdosenbatterie** – Lade-/Entlademodus (einschließlich prognosebasierter „vorausschauender“ und einmaliger Vollladung) und Netzeinspeisungsberechtigungen über den zugehörigen P1/kWh-Zähler
- **Adaptive Wiederverbindung** – Geräte mit schwachem WLAN schalten auf ein kürzeres Wiederverbindungsintervall um und halten die REST-Abfrage aufrecht, damit der Datenfluss erhalten bleibt.
- **Verschlüsselte Gerätetoken** – werden pro Geräteobjekt gespeichert, kein Neustart des Adapters beim Koppeln oder Entfernen erforderlich.

---

## Wächter / Fehlerberichterstattung
Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden. Die Meldung erfolgt nur, wenn Sie die Fehlerberichterstattung in den ioBroker-Diagnoseeinstellungen aktiviert haben (Systemeinstellungen → Diagnose und Fehlerberichterstattung). Es wird lediglich eine anonyme Installations-ID übermittelt – kein Name, keine E-Mail-Adresse und keine IP-Adresse.

Einzelheiten und Hinweise zur Deaktivierung finden Sie in Abschnitt [Dokumentation des Sentry-Plugins](https://github.com/ioBroker/plugin-sentry#plugin-sentry). Für die Fehlerberichterstattung ist js-controller 3.0 oder neuer erforderlich.

---

## Anforderungen
- **Node.js >= 22**
- **ioBroker js-controller >= 7.2.2**
- **ioBroker Admin >= 7.8.23**
- **HomeWizard-Gerät mit API v2-Unterstützung** (Firmware 4.x+ mit aktivierter lokaler API)

---

## Unterstützte Geräte
| Gerät | Produkttyp |
| ----------------- | ------------------------------ |
| P1-Meter | HWE-P1 |
| kWh-Zähler 1-phasig | HWE-KWH1 (auch als SDM230 erhältlich) |
| 3-phasiger kWh-Zähler | HWE-KWH3 (auch als SDM630 erhältlich) |
| Netzbatterie | HWE-BAT |

Der Akku wird separat gekoppelt und als eigenes Gerät angezeigt. Um den Lade-/Entlademodus und die Netzeinspeisungsberechtigungen zu steuern, beschreiben Sie die Datenpunkte `battery.*` des P1- oder kWh-Zählers – dort stellt HomeWizard die Akkubefehle bereit. Der Modus `predictive` und der Schalter `charge_to_full` erfordern aktuelle Geräte-Firmware (Akku-API 2.3.0+); ältere Firmware lehnt diese ab und der Wert wird nicht angewendet.

---

## Konfiguration
### Voraussetzungen
Die **lokale API** muss auf Ihrem HomeWizard-Gerät aktiviert sein:

1. Öffnen Sie die **HomeWizard-App** auf Ihrem Smartphone.
2. Gehen Sie zu **Einstellungen** > **Zähler** > wählen Sie Ihr Gerät aus > **Lokale API** > **Aktivieren**

### Hinzufügen eines Geräts (automatisch über mDNS)
1. Wechseln Sie im ioBroker-Adminbereich zum Tab **Objekte**.
2. Setzen Sie `homewizard.0.startPairing` auf `true`.
3. **Drücken Sie innerhalb von 60 Sekunden die physische Taste** an Ihrem HomeWizard-Gerät.
4. Das Gerät wird automatisch erkannt und erscheint unter „homewizard.0“.

### Hinzufügen eines Geräts (manuelle IP-Adresse)
Falls mDNS nicht verfügbar ist (z. B. aufgrund eines anderen VLANs, Docker oder einer Firewall, die Multicast blockiert):

1. Setzen Sie `homewizard.0.pairingIp` auf die IP-Adresse Ihres Geräts.
2. Setzen Sie `homewizard.0.startPairing` auf `true`.
3. **Drücken Sie innerhalb von 60 Sekunden die physische Taste** am Gerät.

### Geräteverwaltung
Alle gekoppelten Geräte sind im Reiter **Objekte** unter `homewizard.0` aufgelistet. Jedes Gerät hat seinen eigenen Ordner (z. B. `hwe-p1_5c2fafaabbcc`) mit Messdaten, Systemeinstellungen und Geräteinformationen.

- **Gerät entfernen:** Setzen Sie den Datenpunkt `remove` auf `true` – das Gerät und alle zugehörigen Datenpunkte werden sofort gelöscht.
- **IP-Änderungen:** Automatische Erkennung – nach drei fehlgeschlagenen Verbindungsversuchen sucht mDNS nach der neuen IP-Adresse. Wird diese nicht gefunden, wird das Gerät als offline markiert.

---

## Staatsbaum
```
homewizard.0.
├── info.connection              — Overall connection status (bool)
├── startPairing                 — Activate pairing mode (button)
├── pairingIp                    — Device IP for manual pairing (string)
└── {productType}_{serial}/      — e.g. hwe-p1_5c2fafaabbcc
    ├── info/
    │   ├── productName          — Device name (string)
    │   ├── productType          — Product type (string)
    │   ├── firmware             — Firmware version (string)
    │   ├── connected            — WebSocket connection status (bool)
    │   ├── wifi_ssid            — WiFi network name / SSID (string)
    │   ├── wifi_rssi_db         — WiFi signal strength (number, dBm)
    │   └── uptime_s             — Device uptime (number, s)
    ├── measurement/             — Measurement data
    │   ├── power_w              — Total power (number, W)
    │   ├── power_l1_w .. l3_w   — Power per phase (number, W)
    │   ├── voltage_v            — Voltage single-phase (number, V)
    │   ├── voltage_l1_v .. l3_v — Voltage per phase (number, V)
    │   ├── current_a            — Current single-phase (number, A)
    │   ├── current_l1_a .. l3_a — Current per phase (number, A)
    │   ├── frequency_hz         — Grid frequency (number, Hz)
    │   ├── energy_import_kwh    — Total import (number, kWh)
    │   ├── energy_import_t1..t4_kwh — Import per tariff (number, kWh)
    │   ├── energy_export_kwh    — Total export (number, kWh)
    │   ├── energy_export_t1..t4_kwh — Export per tariff (number, kWh)
    │   ├── tariff               — Active tariff (number)
    │   ├── state_of_charge_pct  — Battery charge level (number, %)
    │   ├── cycles               — Battery charge cycles (number)
    │   ├── average_power_15m_w  — 15-min average power (number, W, Belgium)
    │   ├── monthly_power_peak_w — Monthly power peak (number, W, Belgium)
    │   ├── monthly_power_peak_timestamp — Monthly peak timestamp (string)
    │   ├── meter_model          — Meter model identifier (string)
    │   ├── timestamp            — Measurement timestamp (string)
    │   ├── quality/             — Power quality counters
    │   │   ├── voltage_sag_l1..l3_count
    │   │   ├── voltage_swell_l1..l3_count
    │   │   ├── power_fail_count
    │   │   └── long_power_fail_count
    │   └── external/            — External meters (gas, water, heat)
    │       └── {type}_{id}/
    │           ├── value        — Meter reading (number)
    │           ├── unit         — Unit (string)
    │           └── timestamp    — Last update (string)
    ├── battery/                 — Battery control (if batteries connected)
    │   ├── mode                 — zero / to_full / standby / predictive (string, R/W)
    │   ├── charge_to_full       — One-shot charge to 100% (bool, R/W)
    │   ├── permissions          — JSON array (string, R/W)
    │   ├── battery_count        — Connected batteries (number)
    │   ├── power_w              — Battery power (number, W)
    │   ├── target_power_w       — Target power (number, W)
    │   ├── max_consumption_w    — Max consumption (number, W)
    │   └── max_production_w     — Max production (number, W)
    ├── remove                   — Remove device (button)
    └── system/                  — System settings
        ├── cloud_enabled        — Cloud communication (bool; R/W on meters, read-only on the Plug-In Battery)
        ├── status_led_brightness_pct — LED brightness 0-100 (number, R/W)
        ├── api_v1_enabled       — Toggle the device's deprecated v1 API (bool, R/W — leave off)
        ├── reboot               — Reboot device (button)
        └── identify             — Blink LED (button)
```

Die Zustände werden dynamisch anhand der Gerätedaten erstellt. Nicht alle Geräte verfügen über alle Zustände. kWh-Zähler liefern zusätzlich die Zustände Schein-/Blindstrom, Schein-/Blindleistung und Leistungsfaktor.

---

## Fehlerbehebung
### Gerät während des Koppelvorgangs nicht gefunden
- Stellen Sie sicher, dass sich das Gerät im selben Netzwerk/VLAN wie der ioBroker-Server befindet.
- Überprüfen Sie, ob die **lokale API** in der HomeWizard-App aktiviert ist (Einstellungen > Zähler > Ihr Gerät > Lokale API).
- Prüfen Sie, ob Multicast-/mDNS-Datenverkehr nicht von Ihrem Router/Ihrer Firewall blockiert wird.

### WebSocket trennt ständig die Verbindung
- Überprüfen Sie `info.wifi_rssi_db` – Werte über -75 dBm sind angenehm, Werte unter -85 dBm erklären häufige Verbindungsabbrüche.
- Bei Geräten mit schwachem WLAN schaltet der Adapter auf ein schnelleres Wiederverbindungsintervall um (60 Sekunden statt 5 Minuten) und führt im Hintergrund weiterhin REST-Abfragen durch, damit keine Daten verloren gehen.
Ein Ping/Pong-Heartbeat auf WebSocket-Ebene (ca. 30 s Ping, 10 s Pong-Fenster) erkennt Verbindungen, die teilweise ausgefallen sind, wenn der TCP-Stream zwar gepuffert wird, das Gerät aber nicht mehr reagiert. Solche Verbindungen werden automatisch getrennt und wiederhergestellt – so vermeiden Sie einen veralteten „Verbunden“-Status, während Messwerte nicht mehr aktualisiert werden.
IP-Änderungen werden über mDNS erkannt – eine manuelle Neukonfiguration ist nicht erforderlich.

### Token nach Werksreset ungültig
- Setzen Sie den Datenpunkt `remove` des Geräts auf `true` und koppeln Sie es anschließend erneut.

---

## Unterstützung der Entwicklung
Dieser Adapter ist kostenlos und Open Source. Wenn er Ihnen nützlich ist, würde ich mich über eine kleine Spende freuen:

---

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.14.0 (2026-07-07)

- A brief WiFi dropout no longer makes the adapter wrongly treat a device as having a permanently unstable connection after a single outage
- Power-quality values (voltage sag/swell and power-fail counts) now sit in a named "quality" sub-folder under measurement instead of loose
- The Plug-In Battery's cloud-connection state is now a read-only indicator instead of a switch that could never be toggled
- Corrected state roles (grid frequency, reactive power) and 0–100 bounds (LED brightness, charge level); existing devices pick these up automatically on the next start and keep any names you changed
- Security: after an update, an older device is verified by its serial from the very first connection — its access token no longer briefly crosses a not-fully-verified connection
- Security: device and network-discovery names are cleaned before they reach the log, and pairing now cross-checks the device's serial against its certificate

### 0.13.0 (2026-06-24)

- Security: the adapter now checks each device's certificate, so it only ever talks to your real device
- Pairing a device by manual IP no longer leaves repeated pairing attempts and throwaway tokens behind on the device
- The manual pairing IP field now rejects addresses that are not on your home network
- Fixed a rare crash while a device was connecting or disconnecting
- Meter identifier and protocol version are now available as states

### 0.12.2 (2026-06-11) — stable

- Reboot and identify buttons reset themselves after the action, so they stay clickable in the admin UI
- Re-pairing a removed device no longer inherits the old device's log cooldown — its first connection warning shows up immediately again

### 0.12.1 (2026-06-09)

- Internal refactoring. No user-facing changes.

### 0.12.0 (2026-06-07)

- Added optional Sentry error reporting: crashes are sent to the developer so issues get fixed faster. Active only with ioBroker diagnostics enabled; anonymous.

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 krobi <krobi@power-dreams.com>

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

---

_Developed with assistance from Claude.ai_