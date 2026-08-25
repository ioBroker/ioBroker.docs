---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.nut2/README.md
title: <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.nut2@main/admin/nut2.svg" width="48" align="top" /> ioBroker.nut2
hash: xYY+80IZaKrJlUbDx3jQP3LX+iqzct2eiJz9d07DMeI=
---
# <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.nut2@main/admin/nut2.svg" width="48" align="top" /> ioBroker.nut2

![npm-Version](https://img.shields.io/npm/v/iobroker.nut2)
![stabil](https://iobroker.live/badges/nut2-stable.svg)
![Installationen](https://iobroker.live/badges/nut2-installed.svg)
![npm-Downloads](https://img.shields.io/npm/dt/iobroker.nut2)
![Knoten](https://img.shields.io/badge/node-%3E%3D22-brightgreen)
![Typoskript](https://img.shields.io/badge/TypeScript-strict-blue)
![Lizenz](https://img.shields.io/badge/license-MIT-green)
![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi)
![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge)

Überwacht unterbrechungsfreie Stromversorgungen über [Netzwerk-USV-Tools (NUT)](https://networkupstools.org/). Alle an einen NUT-Server angeschlossenen USV-Geräte werden automatisch erkannt und abgefragt.

---

## Merkmale
- Automatische Erkennung aller USV-Geräte auf einem NUT-Server über `LIST UPS`
- Dynamische Zustandserstellung aus `LIST VAR` — was auch immer Ihre UPS-Berichte als ioBroker-Zustände anzeigen
- Korrekte Datentypen: numerische Werte als Zahlen (keine Zeichenketten), mit Einheiten (V, Hz, A, Ah, %, W, VA, s, °C)
- Die `ups.status`-Flags wurden als einzelne boolesche Werte (online, onBattery, lowBattery, charging, ...) plus berechneter Schweregrad (0–4) analysiert.
- Sofortbefehle (INSTCMD) über Tastenzustände – Signaltonsteuerung, Lastmanagement, Selbsttest
- Beschreibbare Variablen (SET VAR) — UPS-Einstellungen direkt über ioBroker ändern
- Permanente TCP-Verbindung mit automatischer Wiederverbindung und exponentiellem Backoff
- Netzwerkschnittstellenauswahl für Server mit mehreren Netzwerkanschlüssen
- Schaltfläche zum Verbindungstest in der Admin-Benutzeroberfläche

---

## Anforderungen
- **Node.js >= 22**
- **ioBroker js-controller >= 7.2.2**
- **ioBroker Admin >= 7.8.23**
- Ein laufender [NUT-Server](https://networkupstools.org/) (upsd) mit mindestens einer konfigurierten USV

---

## Konfiguration
### Verbindung
| Option | Beschreibung | Standard |
| --------------------- | ---------------------------------------------------------------------- | ------- |
| **NUT-Server-Host** | Hostname oder IP-Adresse des NUT-Servers | — |
| **Port** | NUT-Server-Port | `3493` |
| **Abfrageintervall (s)** | Wie oft der NUT-Server abgefragt werden soll (2–300) | `15` |
| **Abfrageintervall (s)** | Wie oft der NUT-Server abgefragt werden soll (2–300) | `15` |
| **Benutzername** | NUT-Benutzername (optional – erforderlich für Befehle und beschreibbare Variablen) | — |
| **Passwort** | NUT-Passwort | — |
| **TLS (STARTTLS) verwenden** | Verbindung über STARTTLS verschlüsseln | Aus |
| **Gültiges Zertifikat erforderlich** | Selbstsignierte/ungültige Zertifikate ablehnen (wird nur angezeigt, wenn TLS aktiviert ist) | aus |

Verwenden Sie die Schaltfläche **Verbindung testen**, um zu überprüfen, ob der Server erreichbar ist und um erkannte USV-Geräte anzuzeigen.

**Über TLS:** Durch Aktivieren von STARTTLS wird die Verbindung verschlüsselt, sodass Ihr NUT-Benutzername und Ihr Passwort nicht mehr im Klartext über das Netzwerk übertragen werden. Mit den Standardeinstellungen schützt dies vor passivem Abhören, jedoch **nicht** vor einem aktiven Man-in-the-Middle-Angriff, da die meisten NUT-Server ein selbstsigniertes Zertifikat verwenden, das nicht verifiziert werden kann. Für vollständigen Schutz konfigurieren Sie ein Zertifikat, das der Client auf dem NUT-Server validieren kann, und aktivieren Sie **Gültiges Zertifikat erforderlich**. Der NUT-Server muss TLS-fähig sein (`upsd` mit `CERTFILE`/`CERTPATH`); andernfalls meldet der Verbindungstest einen TLS-Fehler.

### Fortschrittlich
| Option | Beschreibung | Standard |
| ----------------------- | --------------------------------------------------- | ------- |
| **Befehls-Timeout (s)** | Timeout für einzelne NUT-Protokollbefehle (1–30) | `5` |
| **Befehle aktivieren** | Senden von Sofortbefehlen (INSTCMD) an die USV zulassen | aus |
| **SET VAR aktivieren** | Ändern von beschreibbaren USV-Variablen zulassen | aus |

Beide Befehlsfunktionen erfordern einen NUT-Benutzer mit entsprechenden Berechtigungen, die auf dem NUT-Server konfiguriert sind.

---

## Staatsbaum
Die Bundesstaaten sind nach NUT-Domänen organisiert. Die genaue Zusammenstellung der Bundesstaaten hängt von den Angaben Ihres UPS-Fahrers ab.

```
nut2.0.
├── info.connection                    — Connection to NUT server (bool)
└── {ups_name}/                        — Device (e.g. "ups0")
    ├── info/
    │   └── reachable                  — UPS responds / data is fresh (bool)
    ├── battery/
    │   ├── battery.charge             — Battery level (%, number)
    │   ├── battery.charge-low         — Low battery threshold (%)
    │   ├── battery.runtime            — Remaining runtime (s)
    │   ├── battery.type               — Battery chemistry (string)
    │   └── ...
    ├── device/
    │   ├── device.mfr                 — Manufacturer (string)
    │   ├── device.model               — Model name (string)
    │   ├── device.serial              — Serial number (string)
    │   └── ...
    ├── driver/
    │   ├── driver.name                — NUT driver name
    │   ├── driver.version             — Driver version
    │   └── ...
    ├── input/
    │   ├── input.voltage              — Input voltage (V, number)
    │   ├── input.frequency            — Input frequency (Hz, number)
    │   └── ...
    ├── output/
    │   ├── output.voltage             — Output voltage (V, number)
    │   ├── output.frequency           — Output frequency (Hz, number)
    │   └── ...
    ├── ups/
    │   ├── ups.load                   — UPS load (%, number)
    │   ├── ups.power                  — Apparent power (VA, number)
    │   ├── ups.realpower              — Real power (W, number)
    │   ├── ups.status                 — Raw status string (e.g. "OL CHRG")
    │   └── ...
    ├── status/                        — Parsed status flags
    │   ├── raw                        — Original status string
    │   ├── display                    — Human-readable status (e.g. "Online, Charging")
    │   ├── severity                   — 0=OK, 1=Info, 2=Warning, 3=Critical, 4=Emergency
    │   ├── online                     — On line power (bool)
    │   ├── onBattery                  — Running on battery (bool)
    │   ├── lowBattery                 — Battery is low (bool)
    │   ├── charging                   — Battery is charging (bool)
    │   ├── discharging                — Battery is discharging (bool)
    │   ├── replaceBattery             — Battery needs replacement (bool)
    │   ├── overloaded                 — UPS is overloaded (bool)
    │   ├── forcedShutdown             — Forced shutdown in progress (bool)
    │   ├── alarm                      — Alarm active (bool)
    │   ├── ecoMode                    — ECO / high efficiency mode (bool)
    │   ├── testing                    — Self-test in progress (bool)
    │   ├── overheat                   — UPS overheated (bool)
    │   └── ...                        — (19 flags total)
    └── commands/                      — Instant commands (if enabled)
        ├── beeper-enable              — Button: enable beeper
        ├── beeper-disable             — Button: disable beeper
        ├── test-battery-start         — Button: start battery test
        └── ...                        — (from LIST CMD)
```

**Status-IDs:** Der erste Punkt in einem NUT-Variablennamen dient als Kanaltrennzeichen; alle weiteren Punkte werden zu Bindestrichen. So wird beispielsweise `battery.charge.low` als `battery.charge-low` gespeichert, und der Sofortbefehl `test.battery.start` wird zu `commands.test-battery-start`.

### Status-Schweregrade
| Ebene | Bedeutung | Typische Flaggen |
| ----- | --------- | --------------------------- |
| 0 | OK | OL, OL CHRG, OL HB |
| 1 | Info | TRIM, BOOST, CAL |
| 2 | Warnung | OB (ohne LB), RB, BYPASS |
| 3 | Kritisch | OB + LB |
| 4 | Notfall | FSD |

---

## Fehlerbehebung
### Verbindung fehlgeschlagen
- Überprüfen Sie, ob der NUT-Server vom ioBroker-Host aus erreichbar ist: `nc -zv <Host> 3493`
- Überprüfen Sie die Firewall-Regeln für TCP-Port 3493
- Verwenden Sie die Schaltfläche „Verbindung testen“ in der Admin-Benutzeroberfläche.

### Befehle funktionieren nicht
- Stellen Sie sicher, dass im Tab „Erweitert“ die Option **Befehle aktivieren** ausgewählt ist.
- Ein NUT-Benutzername und ein Passwort mit der Berechtigung `instcmds` müssen konfiguriert werden.
- Überprüfen Sie die `upsd.users`-Konfiguration des NUT-Servers.

### Schreibbare Variablen funktionieren nicht
- Stellen Sie sicher, dass **SET VAR aktivieren** auf der Registerkarte „Erweitert“ aktiviert ist.
- Der NUT-Benutzer benötigt die Berechtigung `actions = SET` auf dem NUT-Server.

### Staaten aktualisieren nicht
- Überprüfen Sie `info.connection` – wenn `false`, ist die TCP-Verbindung unterbrochen.
- Überprüfen Sie das ioBroker-Protokoll auf NUT-Fehlercodes (z. B. bedeutet `DATA-STALE`, dass der USV-Treiber die Verbindung verloren hat).
- Überprüfen Sie, ob das Abfrageintervall für Ihre Konfiguration geeignet ist.

---

## Credits
Die NUT-Unterstützung in ioBroker geht auf [Apollon77](https://github.com/Apollon77) zurück – sein `iobroker.nut`-Adapter brachte das Network UPS Tools-Protokoll 2016 auf die Plattform und wurde bis 2025 unterstützt. Dieser Adapter ist eine unabhängige Neuentwicklung und teilt keinen Code mit ihm.

---

## Unterstützung
- [ioBroker Forum](https://forum.iobroker.net/)
- [GitHub-Probleme](https://github.com/krobipd/ioBroker.nut2/issues)

### Unterstützung der Entwicklungsabteilung
Dieser Adapter ist kostenlos und Open Source. Wenn er Ihnen nützlich ist, würde ich mich über eine kleine Spende freuen:

---

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.7.0 (2026-08-12)

- Improved: more UPS values now carry their dedicated ioBroker role — mains frequency, status severity and humidity — so charts, visualisations and automatic device detection recognise them correctly.
- Fixed: a driver flag reporting an unusual value is now kept as a text state instead of being misread as a number, so its type no longer changes between updates.

### 0.6.0 (2026-08-11)

- UPS readings now carry their correct data type instead of plain text, so numeric values, yes/no fields and status values can be charted, compared and used directly in scripts.
- Security fix: the NUT username and password no longer appear in the ioBroker log, where they could previously show up in plain text while commands were exchanged.
- A UPS whose name contains a space, dot or other special character now appears correctly in the object tree instead of a broken or missing device entry.

### 0.5.3 (2026-07-26)

- The version history shown in the adapter manager now lists only versions that actually exist for this adapter.

### 0.5.2 (2026-07-26)

- The poll interval can now go down to 2 seconds — below that the NUT driver itself has no new readings to give.

### 0.5.1 (2026-07-13)

- Writable yes/no UPS settings (e.g. automatic restart after power returns) can now actually be changed from ioBroker — previously toggling them was silently rejected by the NUT server.

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

_Developed with assistance from Claude.ai_