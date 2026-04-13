---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.hueemu/README.md
title: ioBroker.hueemu
hash: xRmGafv1z08eAddFLKqkMZ4Uo7UHJqH8fT/d0atoxvE=
---
# IoBroker.hueemu

![npm-Version](https://img.shields.io/npm/v/iobroker.hueemu)
![Knoten](https://img.shields.io/badge/node-%3E%3D20-brightgreen)
![Typoskript](https://img.shields.io/badge/TypeScript-strict-blue)
![Lizenz](https://img.shields.io/badge/license-MIT-green)
![npm-Downloads](https://img.shields.io/npm/dt/iobroker.hueemu)
![Installationen](https://iobroker.live/badges/hueemu-installed.svg)
![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi)
![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge)

<img src="https://raw.githubusercontent.com/krobipd/ioBroker.hueemu/main/admin/hue-emu-logo.png" width="100" />

Emuliert eine [Philips Hue](https://www.philips-hue.com) Bridge (v2, BSB002), sodass ioBroker-Geräte über Alexa, Google Home und andere Hue-kompatible Smart-Home-Systeme gesteuert werden können.

---

## Merkmale
- **Hue Bridge-Emulation** — Volle Kompatibilität mit der Hue API v1
- **UPnP/SSDP-Erkennung** – Automatische Erkennung durch Smart-Home-Systeme
- **Moderne Admin-Benutzeroberfläche** — JSON-Konfiguration für einfache Gerätekonfiguration
- **Flexible Gerätetypen** – Ein/Aus, Dimmbar, Farbtemperatur, RGB-Beleuchtung

---

## Anforderungen
- **Node.js >= 20**
- **ioBroker js-controller >= 7.0.0**
- **ioBroker Admin >= 7.6.20**

---

## Anschlüsse
| Anschluss | Protokoll | Zweck | Konfigurierbar |
|------|----------|---------|--------------|
| 8080 | TCP/HTTP | Hue Bridge API | Ja – Clients werden über SSDP informiert |
| 1900 | UDP | SSDP/UPnP-Erkennung | Nein — behoben (alle UPnP-Clients, einschließlich Harmony, Alexa und Google Home, scannen genau diesen Port) |
| — | TCP/HTTPS | Optionales TLS (falls konfiguriert) | Ja |

---

## Konfiguration
### Netzwerkeinstellungen
| Option | Beschreibung | Standard |
|--------|-------------|---------|
| **Host** | IP-Adresse der Bridge (muss eine gültige Netzwerk-IP-Adresse sein) | — |
| **HTTP-Port** | Port für die Hue-API | 8080 |
| **HTTPS-Port** | Optionaler HTTPS-Port | — |
| **MAC-Adresse** | Bridge-MAC-Adresse (automatisch generiert, falls leer) | — |

### Hinzufügen von Geräten
1. Öffnen Sie die Registerkarte **Gerätekonfiguration**.
2. Klicken Sie auf die Schaltfläche „+“.
3. Geben Sie einen **Namen** ein (z. B. "Wohnzimmerleuchte")
4. Wählen Sie einen **Lichttyp** aus.
5. **Zustände** über den Objektbrowser abbilden (`...`)

### Unterstützte Lichtarten
| Typ | Zustände | Hue-Modell |
|------|--------|-----------|
| **Ein/Aus** | `on` | LWB007 |
| **Farbtemperatur** | `on`, `bri`, `ct` | LTW001 |
| **Farblicht** | `on`, `bri`, `ct`, `hue`, `sat`, `xy` | LCT003 |
| **Farblicht** | `on`, `bri`, `ct`, `hue`, `sat`, `xy` | LCT003 |

### Paarung
Bevor sich ein Client (Alexa, Google Home, Harmony Hub usw.) verbinden kann, muss die Kopplung aktiviert werden:

1. ioBroker-Objekte → `hueemu.0` → setze **`startPairing`** auf `true`
2. Starten Sie die Gerätesuche/Kopplung in Ihrer Client-App innerhalb von **50 Sekunden**.
3. Nach erfolgreicher Kopplung erscheint ein neuer Eintrag unter `hueemu.0.clients.*`

### Verbindung mit Alexa herstellen
> **Tipp:** Falls Alexa die Bridge nicht finden kann, versuchen Sie, den HTTP-Port in den Adaptereinstellungen auf **80** zu ändern – einige Alexa-Firmware-Versionen erkennen Bridges nur über Port 80.

1. Kopplung aktivieren (siehe oben)
2. Alexa App → Geräte → `+` → Philips Hue
3. Die Brücke wird automatisch erkannt.

### Verbindung mit Logitech Harmony Hub
1. Kopplung aktivieren (siehe oben)
2. In der Harmony-Einrichtungssoftware: Gerät hinzufügen → Beleuchtung → Philips Hue → Bridge suchen.
3. Bestätigen Sie die Kopplung innerhalb von 50 Sekunden.

---

## Staatsbaum
```
hueemu.0.
├── startPairing         — Enable pairing mode for 50 seconds (button)
├── disableAuth          — Disable authentication (switch)
└── clients/             — Paired client devices (Alexa, Google Home, Harmony Hub, etc.)
    └── {username}       — Client API key (created during pairing)
```

---

## Fehlerbehebung
### Upgrade von 0.x / Legacy-createLight-Modus
Wenn Sie die alte JSON-Zustandsdefinition `createLight` zur Definition von Leuchten verwendet haben, werden Ihre Geräte beim ersten Start **automatisch migriert**. Der Adapter liest Ihre vorhandenen Geräteobjekte, konvertiert sie in das neue Administratorkonfigurationsformat und startet einmal neu. Es ist kein manuelles Eingreifen erforderlich – Ihre bestehenden Skripte und Automatisierungen funktionieren weiterhin wie gewohnt.

**Optionale Verbesserung:** Das alte System nutzte interne Adapterzustände als Zwischenspeicher, wodurch separate Skripte zur Steuerung der eigentlichen Geräte erforderlich waren. Sie können nun die Adaptereinstellungen öffnen und die Zustandszuordnungen so ändern, dass sie **direkt** auf Ihre Gerätezustände verweisen (z. B. `hm-rpc.0.dimmer.LEVEL` statt `hueemu.0.1.state.bri`). Dadurch entfällt die Notwendigkeit von Brückenskripten vollständig.

### Brücke nicht gefunden
- Stellen Sie sicher, dass der UPnP-Port (1900) nicht durch eine Firewall blockiert wird.
- Die **Host-IP** muss die tatsächliche Netzwerk-IP sein, nicht `0.0.0.0`.
- Überprüfen Sie die Firewall-Regeln auf dem ioBroker-Host.

### Client findet keine Geräte / Kopplung schlägt fehl
- Setzen Sie `startPairing` auf `true` in ioBroker Objects → `hueemu.0` **bevor** Sie die Gerätesuche in Ihrem Client starten – Sie haben 50 Sekunden Zeit.
- Stellen Sie sicher, dass mindestens ein Gerät konfiguriert ist.
- Überprüfen Sie die Adapterprotokolle auf Fehler

### Statusänderungen funktionieren nicht
- Überprüfen Sie die Status-IDs in der Gerätekonfiguration
- Wertebereiche prüfen: `bri` 0–100 oder 0–1, `ct` 153–500 (Mireds)

---

## Credits
**Originalautor:** Christopher Holomek ([@holomekc](https://github.com/holomekc))

**Modernisierung (2026):** krobi

---

## Unterstützung
- [ioBroker Forum](https://forum.iobroker.net/)
- [GitHub-Probleme](https://github.com/krobipd/ioBroker.hueemu/issues)

### Unterstützung der Entwicklungsabteilung
Dieser Adapter ist kostenlos und Open Source. Wenn er Ihnen nützlich ist, würde ich mich über eine kleine Spende freuen:

---

## Changelog

### 1.2.3 (2026-04-11)
- Extract shared `sanitizeId` utility module (DRY)
- Add Hue API value range constants for readability
- Add pairing timeout constant
- Improve callback error handling in UserService
- Replace `as any` with type-safe casts in DeviceBindingService
- Enforce `no-floating-promises` as error
- Split monolithic test file into focused modules (146 tests)
- Fix duplicate io-package.json news entry

### 1.2.2 (2026-04-11)
- Remove redundant `actions/checkout@v6` from CI workflow (ioBroker testing actions handle checkout internally)
- Fix `readme` URL in io-package.json (master → main)

### 1.2.1 (2026-04-08)
- Restore standard integration tests (create-adapter compatible)
- Add FORBIDDEN_CHARS sanitization for all external object IDs
- Remove CHANGELOG.md (changelog in README + CHANGELOG_OLD.md)
- Remove dead code, clean up empty JSDoc stubs

### 1.2.0 (2026-04-06)
- Rename `user` folder to `clients` — clearer naming for paired endpoints (Alexa, Harmony, etc.)
- Automatic migration of existing paired clients on startup

### 1.1.4 (2026-04-05)
- Clean up obsolete `info.connection` state, remove empty parent folders after state cleanup

### 1.1.3 (2026-04-05)
- Remove unused `info.connection` state (no external connection to track)

### 1.1.2 (2026-04-05)
- Compact startup log, move detail logs to debug level

Older entries have been moved to [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

---

## License

MIT License

Copyright (c) 2020-2024 Christopher Holomek <holomekc.github@gmail.com>  
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

*Developed with assistance from Claude.ai*