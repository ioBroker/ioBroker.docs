---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.beszel/README.md
title: <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.beszel@main/admin/beszel.svg" width="48" align="top" /> ioBroker.beszel
hash: 0viDphe7RrsOLxgCrqiuf8RfUmY0gXXvkg3PiRS9vZQ=
---
# <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.beszel@main/admin/beszel.svg" width="48" align="top" /> ioBroker.beszel

![npm-Version](https://img.shields.io/npm/v/iobroker.beszel)
![stabil](https://iobroker.live/badges/beszel-stable.svg)
![Installationen](https://iobroker.live/badges/beszel-installed.svg)
![npm-Downloads](https://img.shields.io/npm/dt/iobroker.beszel)
![Knoten](https://img.shields.io/badge/node-%3E%3D22-brightgreen)
![Typoskript](https://img.shields.io/badge/TypeScript-strict-blue)
![Lizenz](https://img.shields.io/badge/license-MIT-green)
![Posten](https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white)
![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi)
![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge)

Verbindet sich mit einem [Beszel](https://github.com/henrygd/beszel) Hub und stellt Serverüberwachungsmetriken für alle registrierten Systeme gemäß ioBroker-Status bereit.

---

## Merkmale
- Ruft Metriken von allen in Ihrem Beszel Hub registrierten Systemen ab.
- Systemzustände: CPU, Arbeitsspeicher, Festplatte, Netzwerk, Temperatur, durchschnittliche Systemlast
- Optionale Details: CPU-Auslastung pro Kern, Spitzenwerte, Festplatten-E/A-Last, Datenverkehr pro Schnittstelle, GPU-Details, Hardware-/Betriebssysteminformationen, Docker-/Podman-Container, Akku, zusätzliche Dateisysteme, CPU-Aufschlüsselung, systemd-Dienste
Jede Option verfügt über einen Hilfetext, der die erzeugten Zustände erläutert; Detailoptionen bleiben ausgegraut, bis ihre Kategorie aktiviert wird.
- Konfigurierbares Abfrageintervall (10–300 Sekunden)
- Automatische erneute Authentifizierung bei Ablauf des Tokens (auch während der Abfrage)
- Schaltfläche zum Verbindungstest in der Admin-Benutzeroberfläche
- Automatische Bereinigung von Zuständen für entfernte Systeme, veraltete Container und deaktivierte Metriken

---

## Wächter / Fehlerberichterstattung
Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden. Die Meldung erfolgt nur, wenn Sie die Fehlerberichterstattung in den ioBroker-Diagnoseeinstellungen aktiviert haben (Systemeinstellungen → Diagnose und Fehlerberichterstattung). Es wird lediglich eine anonyme Installations-ID übermittelt – kein Name, keine E-Mail-Adresse und keine IP-Adresse.

Einzelheiten und Hinweise zur Deaktivierung finden Sie in Abschnitt [Dokumentation des Sentry-Plugins](https://github.com/ioBroker/plugin-sentry#plugin-sentry). Für die Fehlerberichterstattung ist js-controller 3.0 oder neuer erforderlich.

---

## Anforderungen
- **Node.js >= 22**
- **ioBroker js-controller >= 7.2.2**
- **ioBroker Admin >= 7.8.23**
- Ein laufender [Beszel Hub](https://github.com/henrygd/beszel) mit mindestens einem registrierten System

---

## Konfiguration
### Verbindung
| Option | Beschreibung | Standard |
| ----------------------- | --------------------------------------------------------------------------------------- | ------- |
| **Beszel Hub-URL** | Vollständige URL Ihres Beszel-Hubs (z. B. `http://192.168.1.100:8090`) | — |
| **Benutzername** | Beszel Hub-Anmelde-E-Mail/Benutzername | — |
| **Abfrageintervall (s)** | Wie oft Daten vom Hub abgerufen werden sollen (10–300) | `60` |
| **Anfrage-Timeout (s)** | HTTP-Timeout pro Anfrage. Erhöht sich bei langsamen Hubs oder großen Container-/Statistik-Payloads (5–120). | `15` |
| **Anfrage-Timeout (s)** | HTTP-Timeout pro Anfrage. Erhöht sich bei langsamen Hubs oder großen Container-/Statistik-Payloads (5–120) | `15` |

Verwenden Sie die Schaltfläche **Verbindung testen**, um Ihre Anmeldeinformationen vor dem Speichern zu überprüfen.

### Kennzahlen
Alle Metriken sind globale Schalter, die für **alle** Systeme gelten. Deaktivierte Metriken werden beim nächsten Start des Adapters automatisch aus dem Zustandsbaum entfernt.

Die Detailoptionen bleiben ausgegraut, bis die Hauptmetrik der jeweiligen Kategorie aktiviert ist. Jede Option enthält einen Hilfetext, der genau beschreibt, welche Zustände sie erzeugt.

| Gruppe | Metrik | Standard |
| --------------- | ----------------------------------------------------- | ------- |
| **System** | Betriebszeit | an |
| | Systeminformationen (Hardware, Betriebssystem, Agentenversion) | aus |
| | Systemd-Dienste (gesamt / fehlgeschlagen) | aus |
| **CPU** | CPU-Auslastung (%) | ein |
| | Lastdurchschnitt (1m / 5m / 15m) | ein |
| | CPU-Aufschlüsselung (Benutzer / System / IO-Wartezeit / Stehlen / Leerlauf) | aus |
| | Nutzung pro Kern | aus |
| | Spitzenwerte | aus |
| **Speicher** | Speichernutzung (% und GB) | ein |
| | Speicherdetails (Puffer, ZFS ARC) | aus |
| | Tauschen | aus |
| | Spitzenwerte | aus |
| **Festplatte** | Festplattennutzung (% und GB) | ein |
| | Lese-/Schreibgeschwindigkeit | ein |
| | E/A-Last (Auslastung, Lese-/Schreibwartezeiten) | aus |
| | Zusätzliche Dateisysteme | aus |
| | Spitzenwerte | aus |
| **Netzwerk** | Netzwerkverkehr (Upload/Download MB/s) | an |
| | Pro Schnittstelle | aus |
| | Spitzenwerte | aus |
| **Temperatur** | Temperatur (Durchschnitt der heißesten Sensoren + heißester Einzelwert) | ein |
| | Einzelne Temperatursensoren | aus |
| **GPU** | GPU-Metriken (Auslastung, Speicher, Stromverbrauch) | aus |
| | GPU-Details (Engines, Paketleistung) | aus |
| **Container** | Container-Überwachung inkl. Netzwerk (Docker / Podman) | Aus |
| **Akku** | Akkustatus | aus |

---

## Staatsbaum
Die Zustände sind pro Metrikgruppe in Kanälen organisiert. Optionale Kanäle (mit * gekennzeichnet) werden nur erstellt, wenn die entsprechende Metrik aktiviert ist.

```
beszel.0.
├── info.connection                   — Connection status (bool)
└── systems.
    └── {system_name}/                — Device (sanitized name)
        ├── info/                     — System info
        │   ├── online               — Is system up? (bool, used as device indicator)
        │   ├── status               — Status string (up/down/paused/pending)
        │   ├── uptime               — Uptime in seconds
        │   ├── uptime_text          — Human-readable uptime (e.g. "14d 6h")
        │   ├── agent_version *      — Beszel agent version
        │   ├── hostname *           — Host name (System info)
        │   ├── os *                 — Operating system (Linux/macOS/Windows/FreeBSD)
        │   ├── os_name *            — OS version (e.g. "Ubuntu 22.04")
        │   ├── kernel *             — Kernel version
        │   ├── cpu_model *          — CPU model
        │   ├── arch *               — CPU architecture
        │   ├── cores *              — Physical CPU cores
        │   ├── threads *            — Logical CPU threads
        │   ├── podman *             — Container engine is Podman (bool)
        │   ├── services_total *     — Systemd services total
        │   └── services_failed *    — Systemd services failed
        ├── cpu/                      — CPU metrics
        │   ├── usage                — CPU usage (%)
        │   ├── load_1m              — Load average 1 min
        │   ├── load_5m              — Load average 5 min
        │   ├── load_15m             — Load average 15 min
        │   ├── user *               — CPU user (%)
        │   ├── system *             — CPU system (%)
        │   ├── iowait *             — CPU I/O wait (%)
        │   ├── steal *              — CPU steal (%)
        │   ├── idle *               — CPU idle (%)
        │   ├── peak *               — Peak CPU usage in interval (%)
        │   └── cores/ *             — Per-core usage (core0, core1, …) (%)
        ├── memory/                   — Memory metrics
        │   ├── percent              — RAM usage (%)
        │   ├── used                 — RAM used (GB)
        │   ├── total                — RAM total (GB)
        │   ├── buffers *            — Buffers + cache (GB)
        │   ├── zfs_arc *            — ZFS ARC (GB)
        │   ├── swap_used *          — Swap used (GB)
        │   ├── swap_total *         — Swap total (GB)
        │   └── peak *               — Peak RAM used in interval (GB)
        ├── disk/                     — Disk metrics
        │   ├── percent              — Disk usage (%)
        │   ├── used                 — Disk used (GB)
        │   ├── total                — Disk total (GB)
        │   ├── read                 — Disk read (MB/s)
        │   ├── write                — Disk write (MB/s)
        │   ├── read_peak *          — Peak read in interval (MB/s)
        │   ├── write_peak *         — Peak write in interval (MB/s)
        │   ├── io_util *            — I/O utilization (%)
        │   ├── io_await_read *      — Read wait time (ms)
        │   └── io_await_write *     — Write wait time (ms)
        ├── network/                  — Network metrics
        │   ├── sent                 — Upload (MB/s)
        │   ├── recv                 — Download (MB/s)
        │   ├── sent_peak *          — Peak upload in interval (MB/s)
        │   ├── recv_peak *          — Peak download in interval (MB/s)
        │   └── interfaces/ *        — Per interface: up, down (MB/s) + total_up, total_down (cumulative GB)
        ├── temperature/              — Temperature metrics
        │   ├── average              — Avg of top 3 sensors (°C)
        │   ├── max                  — Hottest single sensor (°C)
        │   └── sensors/ *           — Individual sensor readings
        ├── battery/ *                — Battery metrics
        │   ├── percent              — Battery level (%)
        │   └── charging             — Is charging? (bool)
        ├── gpu/ *                    — GPU metrics (per GPU)
        │   └── {gpu_name}/
        │       ├── usage            — GPU usage (%)
        │       ├── memory_used      — VRAM used (MB)
        │       ├── memory_total     — VRAM total (MB)
        │       ├── power            — Power draw (W)
        │       ├── power_package *  — Package power (W) (GPU details)
        │       └── engines/ *       — Per-engine usage (render, video, …) (%)
        ├── filesystems/ *            — Extra filesystems (per mount)
        │   └── {fs_name}/
        │       ├── disk_percent     — Usage (%)
        │       ├── disk_used        — Used (GB)
        │       ├── disk_total       — Total (GB)
        │       ├── read_speed       — Read (MB/s)
        │       └── write_speed      — Write (MB/s)
        └── containers/ *             — Docker/Podman containers
            └── {container_name}/
                ├── status           — Container status
                ├── health           — Health (none/starting/healthy/unhealthy)
                ├── cpu              — CPU usage (%)
                ├── memory           — Memory (MB)
                ├── image            — Image name
                └── network          — Combined network throughput (bytes/s)
```

**Wichtige Änderung in Version 0.3.0:** Zustände wurden von flachen Pfaden (z. B. `cpu_usage`) zu Kanälen (z. B. `cpu.usage`) verschoben. Alte Zustände werden beim ersten Start automatisch bereinigt.

---

## Fehlerbehebung
### Verbindung fehlgeschlagen
- Überprüfen Sie, ob die Hub-URL vom ioBroker-Host aus erreichbar ist.
- Überprüfen Sie Benutzername und Passwort (verwenden Sie die Schaltfläche "Verbindung testen")
- Stellen Sie sicher, dass keine Firewall den Zugriff auf den Beszel Hub-Port blockiert.

### Staaten aktualisieren nicht
- Überprüfen Sie das ioBroker-Protokoll auf Fehler des `beszel`-Adapters.
- Stellen Sie sicher, dass das Abfrageintervall nicht zu kurz ist (mindestens 10 Sekunden).
- Überprüfen Sie den Status von `info.connection` – falls `false`, ist die Authentifizierung fehlgeschlagen.

### Fehlende Zustände für ein System
Das System ist in Beszel möglicherweise „nicht verfügbar“ oder „pausiert“ – es liegen noch keine Statistikdatensätze vor.
- Überprüfen Sie, ob die Metrik in der Adapterkonfiguration aktiviert ist.

---

## Unterstützung
- [ioBroker Forum](https://forum.iobroker.net/)
- [GitHub-Probleme](https://github.com/krobipd/ioBroker.beszel/issues)

### Unterstützung der Entwicklungsabteilung
Dieser Adapter ist kostenlos und Open Source. Wenn er Ihnen nützlich ist, würde ich mich über eine kleine Spende freuen:

---

## Changelog
### 0.9.0 (2026-07-07)

- The "Test connection" button now correctly reports a failure when the URL, username or password is wrong — it previously showed a green "Ok" even for bad credentials.
- States for a sensor, GPU, filesystem or network interface that disappears from a system are now removed instead of freezing at their last value forever.
- Battery, GPU-power and status states now carry proper roles so VIS widgets and the type detector recognize them correctly; existing states are upgraded on the next start.
- New fleet-overview states (systems total, systems online, all-systems-online) for building a multi-server dashboard at a glance.
- Per-interface network speeds are now shown in MB/s (and totals in GB), matching the overall network values instead of raw bytes.
- A user account without permission to read containers no longer freezes all other system states — container data is skipped with a warning instead.
- The connection settings are reordered and gained help texts explaining that the "Username" is your Beszel web login, plus a hint that polling faster than 60s brings no fresher data.

### 0.8.0 (2026-06-24)

- A brief empty response from the Hub no longer deletes your devices or containers — for example right after a restart — so monitored systems and their history stay intact.
- Server hardware and OS details now recover on their own after a short network problem, instead of staying empty until the adapter is restarted.
- Two systems, filesystems, network interfaces or containers whose names shorten to the same id no longer overwrite each other's values.
- A malformed or oversized response from the Hub can no longer exhaust memory and crash the adapter.
- The adapter now warns when the Hub is reached over an unencrypted http connection to another machine, so you can switch to https.

### 0.7.2 (2026-06-12) — stable

- Much lighter polling: the adapter no longer pages through hours of stats history on every poll and only rewrites device objects when something actually changed
- Disappeared sensors, network interfaces, GPUs, filesystems and CPU cores are now cleaned up automatically instead of keeping frozen values forever
- Turning off "GPU details" now removes the package-power and engine states it created

### 0.7.1 (2026-06-09)

- Improved compact-mode behavior: beszel no longer registers global process error handlers that could interfere with other adapters running in the same process.

### 0.7.0 (2026-06-07)

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