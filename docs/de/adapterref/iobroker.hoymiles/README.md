---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.hoymiles/README.md
title: ioBroker.hymiles
hash: FtJh55Z2gjr0Hh112SdEK6wS2PH9dp+pYzWggw2Pq8s=
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
ioBroker-Adapter für [**Hoymiles**](https://www.hoymiles.com/) **HMS-xxxW-xT** und **HMS-xxx-xWB** Mikro-Wechselrichter mit integriertem WiFi/Bluetooth DTU (DTUBI).

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
- Alarm- und Warnüberwachung (223 Codes, lokalisiert in allen 11 Sprachen)
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
Dieser Adapter ist für **Hoymiles HMS Mikro-Wechselrichter mit integriertem WiFi (oder WiFi + Bluetooth) DTU** (DTUBI) konzipiert.

**Lokal** = direkte TCP/Protobuf-Verbindung über Port 10081. **Cloud** = S-Miles Cloud API — automatische Erkennung, Echtzeitdaten (schneller Burst-Kanal ~1,5–3 s), Energieaggregate, Netzprofil, Wechselrichter ein/aus + Neustart, DTU-Neustart.

| Modell | Zeichenketten | Lokal (TCP) | Cloud | Status |
|-------|:---:|:---:|:---:|--------|
| HMS-300W-1T | 1 | ✅ | ✅ | Ungetestet |
| HMS-350W-1T | 1 | ✅ | ✅ | Ungetestet |
| HMS-400W-1T | 1 | ✅ | ✅ | Ungetestet |
| HMS-450W-1T | 1 | ✅ | ✅ | Ungetestet |
| HMS-500W-1T | 1 | ✅ | ✅ | Ungetestet |
| HMS-600W-2T | 2 | ✅ | ✅ | Ungetestet |
| HMS-700W-2T | 2 | ✅ | ✅ | Ungetestet |
| HMS-800W-2T | 2 | ✅ | ✅ | **Getestet** (Lokal + Cloud) |
| HMS-900W-2T | 2 | ✅ | ✅ | Ungetestet |
| HMS-1000W-2T | 2 | ✅ | ✅ | **Geprüft** (Lokal) |
| HMS-1600DW-4T | 4 | ✅ | ✅ | Ungetestet |
| HMS-1800DW-4T | 4 | ✅ | ✅ | Ungetestet |
| HMS-2000DW-4T | 4 | ✅ | ✅ | Ungetestet |
| HMS-600-2WB | 2 | ❌¹ | ✅ | Ungetestet |
| HMS-700-2WB | 2 | ❌¹ | ✅ | Ungetestet |
| HMS-800-2WB | 2 | ❌¹ | ✅ | **Getestet** (Cloud: Echtzeit-Burst, Grid-Profil, Ein/Aus + Neustart, DTU-Neustart) |
| HMS-900-2WB | 2 | ❌¹ | ✅ | Ungetestet |
| HMS-1000-2WB | 2 | ❌¹ | ✅ | Ungetestet |
| HMS-1600-4WB | 4 | ❌¹ | ✅ | Ungetestet |
| HMS-1800-4WB | 4 | ❌¹ | ✅ | Ungetestet |
| HMS-2000-4WB | 4 | ❌¹ | ✅ | Ungetestet |

¹ Die **WB-Serie** (verkauft als **"HiFlow Pro"**) verfügt über keinen lokalen TCP-Port – ihr einziger lokaler Kanal ist Bluetooth LE, und alle Daten werden an die Hoymiles-Cloud übertragen. Diese Wechselrichter funktionieren daher **ausschließlich über die Cloud**: Nach Aktivierung der Cloud-Verbindung liest der Adapter die Daten über die S-Miles-API (Echtzeit-Burst, Energie, Netzprofil) und kann Befehle zum Ein-/Ausschalten, Neustarten und Neustarten des DTU senden. Alle WB-Modelle basieren auf derselben Plattform; bisher wurde nur das Modell HMS-800-2WB getestet.

**Nur-Cloud-Betrieb:** Jeder unterstützte Wechselrichter in Ihrem S-Miles-Konto funktioniert auch ohne lokale Verbindung. Der Adapter erkennt ihn automatisch und stellt Echtzeit-Leistungsdaten (Burst-Kanal), Energieaggregate, Netzprofil sowie Befehle zum Ein-/Ausschalten und Neustarten des Wechselrichters und der DTU über die Cloud bereit. Die übrigen Befehle (Leistungsbegrenzung, Sperren, Warnungen löschen usw.) erfordern die lokale TCP-Verbindung.

**Wichtig:** Dieser Adapter funktioniert **nur** mit HMS-Modellen, die über **integriertes WLAN** verfügen. Er funktioniert **NICHT** mit: > - HMS-1600/1800/2000-4T **ohne** „DW“ (diese verwenden Sub-1G-Funk und benötigen eine externe DTU) > - HM-Serie (kein WLAN, nur Funk) > - MI-Serie (kein WLAN, nur Funk) > - HMS/HMT mit externen DTU-Pro- oder DTU-WLite-Sticks > - HMT-Drehstrommodelle

## Mehrere Wechselrichter
Dieser Adapter unterstützt mehrere Wechselrichter in einer einzigen Instanz:

- **Lokal:** Fügen Sie mehrere DTU-IP-Adressen in der Gerätetabelle hinzu.
- **Cloud:** Alle Wechselrichter und Stationen in Ihrem Konto werden automatisch erkannt

Jede DTU erstellt einen Geräteknoten anhand ihrer Seriennummer als ID (z. B. `hoymiles.0.4143A01CEDE4.*`). Cloud-Stationen erstellen aggregierte Geräteknoten (z. B. `hoymiles.0.station-12345.*`).

## Changelog

### **WORK IN PROGRESS**
- (@Eistee82) Cloud: inverters whose model name does not end in "T" (e.g. HMS-2000-4WB) no longer lose their extra PV strings — voltage and current were only polled for the first two strings, so strings 3 and 4 showed power but nothing else. The number of PV inputs is now taken from Hoymiles' own rule dictionary, looked up by inverter serial number prefix, which is the same source the S-Miles app uses; the model name and the number of strings seen in the live data remain as fallbacks
- (@Eistee82) Cloud: support inverters with more than six PV strings (up to 12), matching the port counts the cloud actually publishes
- (@Eistee82) CI/tests: upgraded the coverage tool (c8 11 → 12) so the unit-test coverage step runs on Node 26 as well, and added Node 26 to the test matrix (now 22 / 24 / 26)
- (@Eistee82) Security (dev dependencies only): cleared several advisories in the development toolchain — js-yaml and brace-expansion via `npm audit fix`, plus targeted same-major overrides for brace-expansion (1.1.16) and adm-zip (0.6.0). No change to the shipped adapter (these packages are not part of the published npm package)
- (@Eistee82) Device Manager: inverters and cloud stations now appear on the ioBroker Device Manager tab, each inverter titled after its cloud station (the name given in the S-Miles app) plus its DTU serial, with live status, original per-type device icons (also used for the device objects in the object tree, replacing the generic adapter icon), live values right on the card (current power, today's energy, per-PV-string power and inverter temperature), per-device controls (on/off, power limit, power factor, reactive power, lock, reboot inverter/DTU, clear warnings/grounding fault, persistent power limit, cloud send interval), a settings dialog and a read-only details view. Cloud-only inverters show just the cloud-actuatable controls; instance actions cover network scan and cloud-login test. Controls reuse the existing command path, so no behaviour changes for the underlying states

### 0.4.1 (2026-07-18)
- (@Eistee82) Packaging: removed the npm `prepare` install script — installs from GitHub now use the committed `build/` output directly, so no dev dependencies are downloaded onto the target system; npm releases are still built freshly via `prepublishOnly`
- (@Eistee82) CI/test reliability: added a global Mocha timeout and switched the test TLS certificates to fast EC keys, so the adapter-tests no longer time out on loaded CI runners

### 0.4.0 (2026-07-17)
- (@Eistee82) Cloud-only support for WB inverters ("HiFlow Pro", e.g. HMS-800-2WB): read power and energy over the S-Miles cloud and switch the inverter on/off, reboot it or reboot the DTU — no local connection needed
- (@Eistee82) Faster live values: new realtime channel updates power every few seconds instead of every ~80 s, like the app's live view
- (@Eistee82) More local data: inverter grid profile, a persistent power limit, per-string error codes and complete alarm lists
- (@Eistee82) More reliable and readable: alarm texts in your ioBroker language, fixed offline/online detection, S-Miles Home account support, and better data quality handling
- (@Eistee82) Maintenance and security: dependency and GitHub Actions updates that close known security advisories, admin translations migrated to the current i18n file format, and connection timers are now managed by ioBroker so they are reliably cleaned up on stop/restart

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

Older entries: see [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

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