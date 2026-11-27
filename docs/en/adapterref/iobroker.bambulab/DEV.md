---
chapters: {"pages":{"en/adapterref/iobroker.bambulab/README.md":{"title":{"en":"ioBroker.bambulab"},"content":"en/adapterref/iobroker.bambulab/README.md"},"en/adapterref/iobroker.bambulab/docs/CLOUD.md":{"title":{"en":"Cloud-Verbindung (Fork / geplanter Upstream)"},"content":"en/adapterref/iobroker.bambulab/docs/CLOUD.md"},"en/adapterref/iobroker.bambulab/DEV.md":{"title":{"en":"Entwicklung (Fork Cloud)"},"content":"en/adapterref/iobroker.bambulab/DEV.md"},"en/adapterref/iobroker.bambulab/MAINTAINER_HANDOFF.md":{"title":{"en":"Nachricht an Maintainer (Issue #186) – zum Kopieren"},"content":"en/adapterref/iobroker.bambulab/MAINTAINER_HANDOFF.md"}}}
---
# Entwicklung (Fork Cloud)

## Lokal (Windows)

- Repo: `C:\Users\oppel\iobroker-dev\ioBroker.bambulab`
- **Prod-ioBroker:** MCP `iobroker-prod` (10.1.1.10)
- **Test-ioBroker:** MCP `iobroker-1` (10.1.1.111, Docker `a466d9d06dba`)

## Auf Test-Container deployen (Unraid Docker)

Vom **GitHub-Fork** installieren, **im ioBroker-Container**:

```bash
iobroker url https://github.com/crunchip77/ioBroker.bambulab/tarball/feature/cloud-mqtt
```

Danach Instanz **bambulab.0** neu starten (bei Cloud-Updates **kein** Token leeren, wenn Login schon ok war).

## Nutzer-Doku Cloud

Siehe [`docs/CLOUD.md`](/#/docs/adapterref/iobroker.bambulab/docs/CLOUD.md) (Login, Token, 2FA, Limits). Maintainer-Kontakt **vor** offiziellem PR: [`MAINTAINER_HANDOFF.md`](/#/docs/adapterref/iobroker.bambulab/MAINTAINER_HANDOFF.md).

## Cloud-Login (Stand Fork)

1. `connectionMode = cloud`, Modell + **Serial** setzen
2. E-Mail, ggf. leeres Token-Feld
3. Instanz starten → Mail mit 6-stelligem Code
4. Code in `cloudVerifyCode` → speichern → **einmal** neu starten
5. Log: `Printer connected` + `Token in lokaler Datei gespeichert`
6. JWT liegt in **`iobroker-data/bambulab.0/cloud-credentials.json`** (Instanz-Datei, **nicht** unter `node_modules`) – Admin-Feld „Cloud access token“ bleibt oft leer (normal)

**Kein neuer Code** bei Neustart oder **`iobroker url`**, solange diese Datei existiert (ab Fork **cloud.18**; ältere Builds speicherten im Adapter-Ordner oder nutzten die ioBroker-Datei-API falsch → Code nach jedem Update).

**Nach dem Login:** einmal Code eintragen → speichern → warten bis Log „Printer connected“ **und** „Token in lokaler Datei gespeichert“ → danach reicht `iobroker url` ohne neue Mail. Beim **ersten** Start nach `url` kann kurz eine Mail kommen, wenn die Token-Datei noch fehlt (Upgrade von älterem Build).

## Phasen-Roadmap (Merge → DrozmotiX #186)

| Phase | Inhalt | Status |
|-------|--------|--------|
| **0** | Fork, Branch, Test-Docker | erledigt |
| **1** | `lib/bambu-cloud.js` Login | erledigt |
| **2** | Cloud-MQTT, H2D pushall | erledigt (Test H2D) |
| **3** | Härtefälle (siehe Checkliste) | **erledigt** |
| **4** | README, upstream merge, WIP-PR | **Draft-PR** (0.5.0) |

### Phase 3 – Checkliste (vor merge-ready PR)

- [x] E-Mail-Code-Login (Google/OAuth)
- [x] Token persistent (Datei + `cloudMqttUsername`)
- [x] JWT-Ablauf-Warnung im Log (~14 Tage vorher)
- [x] Cloud-`user_id` für MQTT-Befehle (keine Hardcodes mehr)
- [x] **Cloud H2D:** Kammer-LED ok; Lüfter/`print.*` → `failed` (Doku + `info.cloudPrintControlBlocked`)
- [x] Log: `pushall` nur **debug**; Cloud-Sperre einmal **info**
- [x] Kosmetik: Legacy `fanSpeedChamber` → `big_fan2_speed`; UI **write=false** bei Cloud-Sperre
- [x] 2FA: **nicht** implementiert – Fehlermeldung in `bambu-cloud.js` + [`docs/CLOUD.md`](/#/docs/adapterref/iobroker.bambulab/docs/CLOUD.md)
- [x] Token-Refresh: **nicht** – Re-Login bei Ablauf ([`docs/CLOUD.md`](/#/docs/adapterref/iobroker.bambulab/docs/CLOUD.md), Admin-Hilfe, Log-Warnung)
- [x] Region **China**: wählbar, **ungetestet** dokumentiert (Admin + [`docs/CLOUD.md`](/#/docs/adapterref/iobroker.bambulab/docs/CLOUD.md))
- [x] **Cloud H2D Pause:** `MQTT → pause` gesendet, Drucker **`print.pause: failed`** (2026-11-02) – Stop/Resume über Cloud nicht extra getestet, gleiche Policy erwartet
- [x] **LAN-Regression H2D** (2026-11-02): LAN `10.1.1.130:8883`, Dev-Modus; alle `set_fan` 1–3 ohne `failed`; Heatbreak bewusst übersprungen; Werklicht schaltet, MQTT `fail` kosmetisch
- [x] Maintainer informiert (Kommentar in [#186](https://github.com/DrozmotiX/ioBroker.bambulab/issues/186), Nov 2026)
- [x] Maintainer-Antwort: @DutchmanNL „Awesome thanks!“ – grünes Licht weiterzumachen, keine Detail-Vorgaben
- [x] Branch auf aktuellem `upstream/main` (Merge-Base ok)

### Phase 4 – danach

- README/Changelog upstream-tauglich (Cloud-Abschnitt verlinkt)
- Offizieller PR an [DrozmotiX/ioBroker.bambulab](https://github.com/DrozmotiX/ioBroker.bambulab), Issue [#186](https://github.com/DrozmotiX/ioBroker.bambulab/issues/186)

## Cloud vs. LAN – was der PR realistisch abdeckt

Gleicher MQTT-Broker-Typ wie Bambu Studio / Handy / [ha-bambulab](https://github.com/greghesp/ha-bambulab): Cloud = `us.mqtt.bambulab.com`, LAN = Drucker-IP `:8883` + Access Code ([Bambu Wiki – Netzwerk](https://wiki.bambulab.com/en/general/printer-network-ports)).

| Funktion | Cloud-MQTT (Account) | LAN-MQTT (IP + Token) |
|----------|----------------------|------------------------|
| Status, Temperaturen, AMS, Airduct, HMS | ja | ja |
| Kammer-LED (`system.ledctrl`) | ja (H2D getestet) | ja |
| Werklicht H2D (`heatbed_light`) | oft **fail** / pulsierend | **schaltet am Gerät**; MQTT meldet oft trotzdem `LED heatbed_light: fail` (LAN-Test) |
| Lüfter Kammer (`big_fan2` / Airduct) | **blockiert** (`set_fan` failed) | **ok** (Raumlüfter + Klappe, LAN-Test) |
| Heatbreak-Lüfter steuern | – | **H2D: absichtlich kein Befehl** (wie HA) |
| Lüfter/Soll-Temp./G-Code sonst | **`failed`** (Cloud) | LAN + Dev-Modus vorgesehen |
| Pause / Stop / Resume | **Pause: failed** (Cloud) | nicht extra getestet (Drucker idle) |

**Kein ioBroker-Bug:** Der Drucker antwortet mit `print.set_fan: failed` / `gcode_line: failed`. HA dokumentiert das als **By Design** bei MQTT-Verschlüsselung / Remote-Sperre ([Issue #1330](https://github.com/greghesp/ha-bambulab/issues/1330)). Es gibt am H2D **keinen** zuverlässigen „Entwicklermodus“-Schalter in der App wie bei manchen P1-Firmwares – **volle Steuerung = LAN-Modus am Drucker + `connectionMode: lan` in der Instanz.**

**PR-Botschaft:** Cloud-Modus = optional für **Monitoring + begrenzte Steuerung**; Schreib-States für Lüfter/G-Code bleiben im Code (LAN + ggf. Cloud ohne Sperre), mit State **`info.cloudPrintControlBlocked`**, UI read-only wenn gesperrt, und Doku statt falschem „es müsste über Cloud gehen“.

## Adapter testen

- State: `bambulab.0.info.connection`
- Log-Level **`info`** im Alltag; **`debug`** nur bei MQTT-Fehlersuche (`pushall` sichtbar)

## H2D Datenpunkte – Audit (Stand cloud.15+)

**Serial-Ordner:** `bambulab.0.<serial>.*` – bei H2D kommen viele Felder unter `device.*` per jsonExplorer automatisch an (575+ States). Nur dokumentierte `state_attr`-Einträge haben schöne Namen/Rollen; der Rest ist lesbar, aber oft generisch benannt.

### Lesen – ok / bekannt

| Bereich | ioBroker-Pfad (Beispiel) | Hinweis |
|---------|--------------------------|---------|
| Druckstatus | `print.gcode_state`, `print.mc_percent`, `print.mc_remaining_time` | `stg_cur` wird als Text-Phase angezeigt (Bug Doppel-Konvertierung in .15 behoben) |
| Dual-Extruder | `device.extruder.info.0/1.temp`, Höhen, Speed | Roh-Temperaturen >500 werden ab .15 in °C umgerechnet |
| Airduct / Lüfter | `device.airduct.*`, `print.big_fan*_speed` | Prozent über `convert.fanSpeed`; H2D-Lüftungslogik liegt in `device.airduct`, nicht nur in `print.*` |
| AMS / Tray | `ams.*`, `vt_tray` | wie P1/X1 |
| HMS / Fehler | `print.hms.*` | Übersetzung wenn JSON geladen |
| Kamera / Laser-Cam | `device.cam.*` | **kein Live-Stream** (Adapter-Limit) |
| **Gesamt-Druckstunden** | `printer.print_time` | H2D getestet: entspricht Display „Nutzungsdauer“ (h); 44→52 nach ~8 h Druck (Nov 2026) |

### Steuern – nach Verbindungsmodus

| State unter `…control.*` | Cloud (H2D Test) | LAN (upstream-Pfad) |
|--------------------------|------------------|---------------------|
| `lightChamber` | ok (`chamber_light` + `chamber_light2`) | ok |
| `lightToolHeadLogo` | H2D: linke Leiste (`chamber_light`); X/P: M960 | wie Cloud |
| `lightWorkHead` | H2D: oft **fail** / pulsierend | Heizbettlicht **ok am Gerät**; Log kann `fail` zeigen (2026-11-02 LAN) |
| `pause`, `stop`, `resume` | **Pause: failed** (Cloud); UI read-only bei `cloudPrintControlBlocked` | print commands |
| `big_fan*_speed`, `cooling_fan_speed` | **blockiert** (`set_fan` failed); UI read-only wenn `cloudPrintControlBlocked` | LAN: **`big_fan2`** Kammer+Klappe; **`big_fan1`** seitlich links; **`cooling_fan_speed`** Düsen-Lüfter (H2D physisch bestätigt) |
| `heatbreak_fan_speed` | H2D: Adapter sendet **nichts** (Log-Hinweis) | **gleich** – Firmware/HA steuern Heatbreak am H2D nicht per MQTT |
| `bed_target_temper`, `nozzle_target_temper` | vermutlich blockiert wie G-Code | M140 / M104 |
| `spd_lvl`, `_customGcode` | `print.*` – ggf. blockiert | wie upstream |

### Kosmetik / Legacy

- **`fanSpeedChamber`:** veralteter State-Name; Handler leitet auf **`big_fan2_speed`** um, einmaliger Log-Hinweis.
- Viele `device.*`-States ohne `state_attr` – Werte stimmen, Namen/Rollen oft „roh“.

### Bewusst nicht / fehlt

- Live-Kamera, Bambu Studio, 2FA-Login (nur Workaround-Doku)
- Getrennte Soll-Temperatur Extruder L/R (nur `nozzle_target_temper` + `device.extruder.info.*.temp` lesen)
- Airduct-Modi schreiben (nur Anzeige der MQTT-Struktur)
- Vollständige H2D-`state_attr`-Map (Phase 4/Doku)

Nach Deploy: Instanz neu starten; optional alte `control.stg_cur`-Werte einmal aktualisieren lassen (pushall).