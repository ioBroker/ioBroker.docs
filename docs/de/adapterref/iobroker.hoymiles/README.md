---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.hoymiles/README.md
title: ioBroker.hymiles
hash: bzPkVlLsQxO7KBYl6EGif5/PSYkFchixsbRQIHxr6EQ=
---
![Logo](../../../en/adapterref/iobroker.hoymiles/admin/hoymiles.png)

![Anzahl der Installationen](https://iobroker.live/badges/hoymiles-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/hoymiles-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.hoymiles.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.hoymiles.svg)
![Lizenz](https://img.shields.io/github/license/Eistee82/ioBroker.hoymiles)
![Spenden](https://img.shields.io/badge/Donate-PayPal-blue.svg)

# IoBroker.hoymiles
[![Test und Release](https://github.com/Eistee82/ioBroker.hoymiles/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/Eistee82/ioBroker.hoymiles/actions/workflows/test-and-release.yml)

**Wenn Ihnen dieser Adapter gefällt, würden wir uns über eine Spende freuen:**

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://paypal.me/eistee)

## Haftungsausschluss
Alle Produkt- und Firmennamen sowie Logos sind Marken™ oder eingetragene® Marken ihrer jeweiligen Inhaber. Ihre Verwendung impliziert weder eine Zugehörigkeit zu noch eine Unterstützung durch diese oder verbundene Tochtergesellschaften! Dieses private Projekt wird in der Freizeit betrieben und verfolgt keine geschäftlichen Ziele.

**DIE SOFTWARE WIRD OHNE JEGLICHE GEWÄHRLEISTUNG BEREITGESTELLT.** Die Nutzung erfolgt auf eigene Gefahr. Die Autoren haften nicht für Schäden an Ihrem Wechselrichter, Ihrer DTU oder anderen Geräten. Dieser Adapter kommuniziert direkt mit Ihrer Hardware – eine falsche Verwendung der Befehle (Leistungsbegrenzung, Neustart, Ein-/Ausschalten) kann Ihre Solaranlage beeinträchtigen.

Dieser Adapter steht in keiner Verbindung zu Hoymiles Power Electronics Inc., wird von diesem Unternehmen weder unterstützt noch empfohlen und ist in keiner Weise mit diesem verbunden.

## Beschreibung
ioBroker-Adapter für [**Hoymiles**](https://www.hoymiles.com/) **HMS-xxxW-xT** Mikro-Wechselrichter mit integriertem WiFi DTU (DTUBI).

Zwei Verbindungsmodi (unabhängig konfigurierbar):

- **Lokal:** Direkte TCP/Protobuf-Kommunikation über Port 10081 – keine Cloud, kein Gateway erforderlich
- **Cloud:** Hoymiles S-Miles Cloud API – monatliche/jährliche Energie-, CO2-Einsparungen und Einkommensberechnung

## Dokumentation
- 🇺🇸 [Englische Dokumentation](docs/en/README.md)
- 🇩🇪 [Deutsche Dokumentation](docs/de/README.md)

## Merkmale
- Dualmodus: lokales TCP/Protobuf und/oder S-Miles Cloud-API
- Permanente TCP-Verbindung mit Protobuf-Heartbeat (automatische Keepalive-Funktion im Leerlauf alle 20 Sekunden)
- Konfigurierbares Datenintervall (0 = schnellstmöglich, ~1 Sekunde pro Zyklus)
- Cloud Relay: Leitet Wechselrichterdaten im Auftrag der DTU an die Hoymiles Cloud weiter, sodass die lokale Verbindung Cloud-Uploads nicht mehr blockiert.
- Automatische Cloud-Abfragezeit, abgeleitet von der sendTime-Konfiguration der DTU
- Sequenznummern in Protokollrahmen (0-60000 fortlaufend, entsprechend der Originalanwendung)
- Unterstützung für AES-128-CBC-Verschlüsselung für neuere DTU-Firmware (SHA-256-Schlüsselableitung aus encRand)
- Echtzeitdaten: Leistung, Spannung, Stromstärke, Frequenz, Energie, Temperatur
- Überwachung pro Panel (PV0/PV1) – lokal und Cloud
- Cloud-Daten pro Wechselrichter: Leistung, Spannung, Frequenz, Temperatur (Protobuf Chart API)
- Energieaggregate: täglich, monatlich, jährlich, gesamt (kWh)
- Einkommensberechnung auf Basis des Strompreises (Cloud)
- CO2-Einsparungsverfolgung (Cloud)
- Befehle: Leistungsbegrenzung (2–100 %), Wechselrichter ein/aus/neu starten, DTU-Neustart, Leistungsfaktorbegrenzung, Blindleistungsbegrenzung, Warnungen bereinigen, Erdschluss beheben, Wechselrichter sperren/entsperren
- Alarm- und Warnüberwachung (109 Codes DE/EN)
- Statusqualität (`q`): Markiert Daten bei Verbindungsabbruch als veraltet, dient als Ersatz für Cloud-Fallback und wird bei Wiederherstellung der Verbindung automatisch zurückgesetzt.
- 5-minütige Leerlaufzeitüberschreitung mit automatischer Wiederverbindung
- Netzwerkerkennungsmodul für ioBroker.discovery
- TypeScript, ESLint, Prettier, GitHub CI/CD
- Vollständiger i18n: en, de, ru, pt, nl, fr, it, es, pl, uk, zh-cn

## Konfiguration
Öffnen Sie die Adapterkonfiguration in der ioBroker-Admin-Oberfläche.

### Lokale Verbindung (TCP)
| Einstellung | Standard | Beschreibung |
|---------|---------|-------------|
| **Lokale Verbindung aktivieren** | ein | Direkte TCP/Protobuf-Verbindung aktivieren |
| **DTU-Geräte** | (leer) | Tabelle der DTU-IP-Adressen/Hostnamen. Fügen Sie pro DTU eine Zeile hinzu. |
| **Datenabfrageintervall** | 5 s | Sekunden zwischen Datenanfragen (0-300). 0 für schnellstmögliche Abfrage (keine Verzögerung zwischen den Anfragen). |
| **Abfragefaktor für Konfiguration/Alarme** | 6 | Konfiguration und Alarme werden in jedem N-ten Datenzyklus abgefragt. |
| **Cloud Relay** | ein | Leitet Echtzeitdaten im Auftrag der DTU an die Hoymiles Cloud weiter. Verhindert, dass die lokale Verbindung Cloud-Uploads blockiert. |

### Cloud-Verbindung (S-Miles)
| Einstellung | Standard | Beschreibung |
|---------|---------|-------------|
| **Cloud aktivieren** | Aus | Hoymiles S-Miles Cloud API aktivieren |
| **S-Miles-E-Mail** | — | Die E-Mail-Adresse Ihres S-Miles-Kontos |
| **S-Miles-Passwort** | — | Ihr S-Miles-Kontopasswort (verschlüsselt gespeichert) |

Alle Wechselrichter in Ihrem Cloud-Konto werden automatisch erkannt. Eine manuelle Konfiguration der Seriennummern ist nicht erforderlich.

Beide Verbindungen können gleichzeitig aktiviert werden. Lokale Daten haben Priorität – Cloud-Daten werden verwendet, wenn die DTU offline ist (z. B. nachts).

## Unterstützte Wechselrichter
Dieser Adapter ist für **Hoymiles HMS Mikro-Wechselrichter mit integriertem WiFi DTU** (DTUBI) konzipiert:

**1 Saite (1T):**

| Modell | Status |
|-------|--------|
| HMS-300W-1T | Ungetestet |
| HMS-350W-1T | Ungetestet |
| HMS-400W-1T | Ungetestet |
| HMS-450W-1T | Ungetestet |
| HMS-500W-1T | Ungetestet |

**2 Saiten (2T):**

| Modell | Status |
|-------|--------|
| HMS-600W-2T | Ungetestet |
| HMS-700W-2T | Ungetestet |
| HMS-800W-2T | **Getestet** (Lokal + Cloud) |
| HMS-900W-2T | Ungetestet |
| HMS-1000W-2T | **Geprüft** (Lokal) |

**4 Saiten (4T) — nur DW-Variante:**

| Modell | Status |
|-------|--------|
| HMS-1600DW-4T | Ungetestet |
| HMS-1800DW-4T | Ungetestet |
| HMS-2000DW-4T | Ungetestet |

**Wichtig:** Dieser Adapter funktioniert **nur** mit HMS-Modellen, die über **integriertes WLAN** verfügen. Er funktioniert **NICHT** mit: > - HMS-1600/1800/2000-4T **ohne** „DW“ (diese verwenden Sub-1G-Funk und benötigen eine externe DTU) > - HM-Serie (kein WLAN, nur Funk) > - MI-Serie (kein WLAN, nur Funk) > - HMS/HMT mit externen DTU-Pro- oder DTU-WLite-Sticks > - HMT-Drehstrommodelle

## Mehrere Wechselrichter
Dieser Adapter unterstützt mehrere Wechselrichter in einer einzigen Instanz:

- **Lokal:** Fügen Sie mehrere DTU-IP-Adressen in der Gerätetabelle hinzu.
- **Cloud:** Alle Wechselrichter und Stationen in Ihrem Konto werden automatisch erkannt

Jede DTU erstellt einen Geräteknoten anhand ihrer Seriennummer als ID (z. B. `hoymiles.0.4143A01CEDE4.*`). Cloud-Stationen erstellen aggregierte Geräteknoten (z. B. `hoymiles.0.station-12345.*`).

## Changelog
### 0.3.5 (2026-05-13)
- (copilot) Adapter requires node.js >= 22 now
- (@Eistee82) Stop retry loop on permanent cloud auth errors to prevent Hoymiles account lockout
- (@Eistee82) Add `info.cloudLastError` state and raise an ioBroker alert notification with reset instructions on permanent cloud auth errors
- (@Eistee82) Bump axios to 1.15.0 and protobufjs to 8.0.1
- (@Eistee82) Add S-Miles Home account support (Argon2id login + `/pvmc/.../*_c` data API)
- (@Eistee82) Decide cloud profile (installer / home) via a post-login probe against `/pvm/.../select_by_page` instead of `pre-insp.v` — Hoymiles unified all accounts onto Argon2id in 2026
- (@Eistee82) Drop the dead v0 auth fallback
- (@Eistee82) Skip cloud-station states for fields the home-profile API doesn't provide (no empty placeholders for `latitude`/`longitude`/firmware version strings)
- (@Eistee82) Add a "Test cloud login" diagnostic button to the admin UI with per-phase results (`region_c`, `pre-insp`, `login`, `probe`) for forum bug reports
- (@Eistee82) Bump `protobufjs` to 8.2.0 to address seven security advisories (4 high, 3 medium — code injection, prototype pollution, DoS variants) affecting 8.0.0–8.0.1
- (dependabot) Bump dev-only transitive `follow-redirects` to 1.16.0 (security: leaked auth headers on cross-domain redirects) and `deepl-node` to 1.27.0 (drops the unused `uuid` dependency)

### 0.3.4 (2026-04-08)
- (@Eistee82) Fix disabled property type in jsonConfig table items (string, not boolean)
- (@Eistee82) Add local repochecker script (`npm run test:repo`)

### 0.3.3 (2026-04-08)
- (@Eistee82) Fix jsonConfig schema warnings: button color, remove unsupported table properties

### 0.3.2 (2026-04-03)
- (@Eistee82) Fix remaining responsive layout issues for repochecker (staticText, header, divider)

### 0.3.1 (2026-04-03)
- (@Eistee82) Fix admin UI responsive layout (add missing size attributes for repochecker)
- (@Eistee82) Fix news translations in io-package.json for repochecker E2004

## License

MIT License

Copyright (c) 2026 Eistee82

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