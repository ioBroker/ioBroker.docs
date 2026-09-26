---
chapters: {"pages":{"en/adapterref/iobroker.hoymiles/README.md":{"title":{"en":"ioBroker.hoymiles"},"content":"en/adapterref/iobroker.hoymiles/README.md"},"en/adapterref/iobroker.hoymiles/docs/en/README.md":{"title":{"en":"ioBroker.hoymiles — Hoymiles HMS microinverters and HAT hybrid inverters"},"content":"en/adapterref/iobroker.hoymiles/docs/en/README.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.hoymiles/README.md
title: ioBroker.hymiles
hash: wbXYszzn/9E8KsEImOoPrxPK+ITlhq/pekorPXjOwlk=
---
![Logo](../../../en/adapterref/iobroker.hoymiles/admin/hoymiles.png)

![Anzahl der Installationen](https://iobroker.live/badges/hoymiles-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/hoymiles-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.hoymiles.svg)
![Test und Freigabe](https://github.com/Eistee82/ioBroker.hoymiles/actions/workflows/test-and-release.yml/badge.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.hoymiles.svg)
![Lizenz](https://img.shields.io/github/license/Eistee82/ioBroker.hoymiles)
![Spenden](https://img.shields.io/badge/Donate-PayPal-blue.svg)

# ioBroker.hymiles

**Wenn Ihnen dieser Adapter gefällt, erwägen Sie bitte eine Spende:**

[![PayPal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://paypal.me/eistee)

## Haftungsausschluss

**Alle Produkt- und Firmennamen sowie Logos sind Marken™ oder eingetragene® Marken ihrer jeweiligen Inhaber. Ihre Verwendung impliziert weder eine Zugehörigkeit zu noch eine Unterstützung durch diese oder verbundene Tochtergesellschaften! Dieses private Projekt wird in der Freizeit betrieben und verfolgt keine geschäftlichen Ziele.**

**Die Software wird ohne jegliche Gewährleistung bereitgestellt.** Die Nutzung erfolgt auf eigene Gefahr. Die Autoren haften nicht für Schäden an Ihrem Wechselrichter, Ihrer DTU oder anderen Geräten. Dieser Adapter kommuniziert direkt mit Ihrer Hardware – eine falsche Verwendung der Befehle (Leistungsbegrenzung, Neustart, Ein-/Ausschalten) kann Ihre Solaranlage beeinträchtigen.

Dieser Adapter steht in keiner Verbindung zu Hoymiles Power Electronics Inc., wird von diesem Unternehmen weder unterstützt noch empfohlen und ist in keiner Weise mit diesem verbunden.

## Beschreibung

ioBroker-Adapter für [**Hoymiles**](https://www.hoymiles.com/) **HMS-xxxW-xT** und **HMS-xxx-xWB** Mikro-Wechselrichter mit integriertem WiFi/Bluetooth DTU (DTUBI) – lokal oder über die S-Miles Cloud – und über die Cloud für **HAT** Hybrid-Wechselrichter mit Batterie.

Zwei Verbindungsmodi (unabhängig konfigurierbar):

- **Lokal:** Direkte TCP/Protobuf-Kommunikation über Port 10081 – keine Cloud, kein Gateway erforderlich
- **Cloud:** Hoymiles S-Miles Cloud API – monatliche/jährliche Energie-, CO2-Einsparungen, Einkommensberechnung

## Dokumentation

- 🇺🇸 [Englische Dokumentation](/#/docs/adapterref/iobroker.hoymiles/docs/en/README.md)
- 🇩🇪 [Deutsche Dokumentation](https://github.com/Eistee82/ioBroker.hoymiles/blob/main/docs/de/README.md)

## Merkmale

- Drei Verbindungswege: lokales TCP/Protobuf, lokales Bluetooth (BLE) über einen ESPHome Bluetooth-Proxy und/oder die S-Miles Cloud-API.
- Lokales BLE für die WB-Serie (z. B. HMS-800-2WB, kein lokaler TCP-Port): automatische Gateway-Erkennung (mDNS), automatische Auswahl des Gateways mit dem besten Signal und Importfunktion „Gefundene Wechselrichter hinzufügen“ mit einem Klick
- Permanente TCP-Verbindung mit Protobuf-Heartbeat (automatische Keepalive-Funktion im Leerlauf alle 20 Sekunden)
- Konfigurierbares Datenintervall (0 = schnellstmöglich, \~1 Sekunde pro Zyklus)
- Cloud Relay: Leitet Wechselrichterdaten im Auftrag der DTU an die Hoymiles Cloud weiter, sodass die lokale Verbindung Cloud-Uploads nicht mehr blockiert.
- Automatische Cloud-Abfragezeit, abgeleitet von der sendTime-Konfiguration der DTU
- Sequenznummern im Protokollrahmen (0-60000 fortlaufend, entsprechend der Originalanwendung)
- Unterstützung für AES-128-CBC-Verschlüsselung für neuere DTU-Firmware (SHA-256-Schlüsselableitung aus encRand)
- Echtzeitdaten: Leistung, Spannung, Stromstärke, Frequenz, Energie, Temperatur
- Überwachung pro Panel (PV0/PV1) – lokal und Cloud
- Daten pro Wechselrichter in der Cloud: Leistung, Spannung, Frequenz, Temperatur (Protobuf Chart API)
- Energieaggregate: täglich, monatlich, jährlich, gesamt (kWh)
- Einkommensberechnung auf Basis des Strompreises (Cloud)
- CO2-Einsparungsverfolgung (Cloud)
- Befehle: Leistungsbegrenzung (2–100 %), Wechselrichter ein/aus/neu starten, DTU-Neustart, Leistungsfaktorbegrenzung, Blindleistungsbegrenzung, Warnungen bereinigen, Erdschluss beheben, Wechselrichter sperren/entsperren
- Alarm- und Warnüberwachung (223 Codes, lokalisiert in allen 11 Sprachen)
- Staatsqualität (`q`): Markiert Daten bei Verbindungsabbruch als veraltet, dient als Ersatz für Cloud-Fallback und wird bei erneuter Verbindung automatisch zurückgesetzt.
- 5-minütige Leerlaufzeitüberschreitung mit automatischer Wiederverbindung
- Netzwerkerkennungsmodul für ioBroker.discovery
- TypeScript, ESLint, Prettier, GitHub CI/CD
- Vollständiger i18n: en, de, ru, pt, nl, fr, it, es, pl, uk, zh-cn

## Konfiguration

Öffnen Sie die Adapterkonfiguration in der ioBroker-Admin-Oberfläche.

### Lokale Verbindung (TCP)

| Einstellung                                  | Standard   | Beschreibung                                                                                                                                          |
| -------------------------------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Lokal aktivieren**                         | An         | Direkte TCP/Protobuf-Verbindung aktivieren                                                                                                            |
| **DTU-Geräte**                               | (leer)     | Tabelle der DTU-IP-Adressen/Hostnamen. Fügen Sie pro DTU eine Zeile hinzu.                                                                            |
| **Datenabfrageintervall**                    | 5s         | Sekunden zwischen Datenanfragen (0-300). Stellen Sie 0 für die schnellstmögliche Verbindung ein (keine Verzögerung zwischen den Anfragen).            |
| **Konfigurations-/Alarmabfragefaktor**       | 6          | Konfiguration und Alarme werden in jedem N-ten Datenzyklus abgefragt.                                                                                 |
| **Totzone der Leistungsbegrenzung**          | 1 %        | Kleinere Änderungen der Leistungsbegrenzung werden nicht an das Gerät gesendet. Jeder Schreibvorgang löscht zwei Flash-Sektoren im Inverter. 0 = aus. |
| **Mindestintervall für Leistungsbegrenzung** | 60er Jahre | Kürzester Abstand zwischen zwei Leistungsbegrenzungsschreibvorgängen. Schützt den Flash-Speicher des Inverters. 0 = Aus.                              |
| **Cloud Relay**                              | An         | Leitet im Auftrag der DTU Echtzeitdaten an die Hoymiles Cloud weiter. Verhindert, dass die lokale Verbindung Cloud-Uploads blockiert.                 |

### Cloud-Verbindung (S-Miles)

| Einstellung          | Standard | Beschreibung                                          |
| -------------------- | -------- | ----------------------------------------------------- |
| **Cloud aktivieren** | aus      | Hoymiles S-Miles Cloud-API aktivieren                 |
| **S-Miles-E-Mail**   | —        | Ihre S-Miles-Konto-E-Mail                             |
| **S-Miles-Passwort** | —        | Ihr S-Miles-Kontopasswort (verschlüsselt gespeichert) |

Alle Wechselrichter in Ihrem Cloud-Konto werden automatisch erkannt. Eine manuelle Konfiguration der Seriennummern ist nicht erforderlich.

### BLE-Gateway (ESPHome)

Für Wechselrichter **der WB-Serie** (z. B. HMS-800-2WB), die nur über Bluetooth erreichbar sind, fügen Sie Ihrem Netzwerk eine kleine, kostengünstige Bluetooth-Bridge (einen [ESPHome Bluetooth Proxy](https://esphome.io/projects/?type=bluetooth) ) hinzu. Der Adapter erreicht Ihren Wechselrichter dann über diese Bridge – ohne Cloud.

Öffnen Sie den **BLE-** Tab, aktivieren Sie **„BLE-Gateway aktivieren“** und speichern Sie die Einstellungen. Klicken Sie anschließend auf **„Gefundene Wechselrichter hinzufügen“** , geben Sie **die PIN** jedes Wechselrichters ein, setzen Sie ein Häkchen bei **„Aktiv“** und speichern Sie die Einstellungen. Eine detaillierte Schritt-für-Schritt-Anleitung finden Sie in der [Dokumentation](/#/docs/adapterref/iobroker.hoymiles/docs/en/README.md#ble-gateway-esphome) .

Die Einstellungen sind in die Registerkarten **Lokal / Cloud / BLE** unterteilt; jede beliebige Kombination kann gleichzeitig aktiviert werden.

## Unterstützte Wechselrichter

Dieser Adapter ist für **Hoymiles HMS Mikro-Wechselrichter mit integriertem WiFi (oder WiFi + Bluetooth) DTU** (DTUBI) konzipiert.

**Lokal (TCP)** = direkte TCP/Protobuf-Verbindung über Port 10081 (WLAN-Modelle). **Lokal (BLE)** = lokale Bluetooth-Verbindung über einen [ESPHome Bluetooth-Proxy](https://esphome.io/projects/?type=bluetooth) (WB-Serie). **Cloud** = S-Miles Cloud API – automatische Erkennung, Echtzeitdaten (schneller Burst-Kanal \~1,5–3 s), Energieaggregate, Netzprofil, Wechselrichter ein-/ausschalten + Neustart, DTU-Neustart.

| Modell        | Saiten | Lokal (TCP) | Lokal (BLE)² | Wolke | Status                                                  |
| ------------- | :----: | :---------: | :----------: | :---: | ------------------------------------------------------- |
| HMS-300W-1T   |    1   |      ✅      |       —      |   ✅   | Ungetestet                                              |
| HMS-350W-1T   |    1   |      ✅      |       —      |   ✅   | Ungetestet                                              |
| HMS-400W-1T   |    1   |      ✅      |       —      |   ✅   | Ungetestet                                              |
| HMS-450W-1T   |    1   |      ✅      |       —      |   ✅   | Ungetestet                                              |
| HMS-500W-1T   |    1   |      ✅      |       —      |   ✅   | Ungetestet                                              |
| HMS-600W-2T   |    2   |      ✅      |       —      |   ✅   | Ungetestet                                              |
| HMS-700W-2T   |    2   |      ✅      |       —      |   ✅   | Ungetestet                                              |
| HMS-800W-2T   |    2   |      ✅      |       —      |   ✅   | **Getestet** (lokal + Cloud)                            |
| HMS-900W-2T   |    2   |      ✅      |       —      |   ✅   | Ungetestet                                              |
| HMS-1000W-2T  |    2   |      ✅      |       —      |   ✅   | **Getestet** (lokal)                                    |
| HMS-1600DW-4T |    4   |      ✅      |       —      |   ✅   | Ungetestet                                              |
| HMS-1800DW-4T |    4   |      ✅      |       —      |   ✅   | Ungetestet                                              |
| HMS-2000DW-4T |    4   |      ✅      |       —      |   ✅   | Ungetestet                                              |
| HMS-600-2WB   |    2   |      ❌¹     |       ✅      |   ✅   | Ungetestet                                              |
| HMS-700-2WB   |    2   |      ❌¹     |       ✅      |   ✅   | Ungetestet                                              |
| HMS-800-2WB   |    2   |      ❌¹     |       ✅      |   ✅   | **Getestet** (Cloud; BLE-Gateway-Pfad in der Testphase) |
| HMS-900-2WB   |    2   |      ❌¹     |       ✅      |   ✅   | Ungetestet                                              |
| HMS-1000-2WB  |    2   |      ❌¹     |       ✅      |   ✅   | Ungetestet                                              |
| HMS-1600-4WB  |    4   |      ❌¹     |       ✅      |   ✅   | Ungetestet                                              |
| HMS-1800-4WB  |    4   |      ❌¹     |       ✅      |   ✅   | Ungetestet                                              |
| HMS-2000-4WB  |    4   |      ❌¹     |       ✅      |   ✅   | Ungetestet                                              |

¹ Die **WB-Serie** (verkauft als **„HiFlow Pro“** ) verfügt über keinen lokalen TCP-Port – ihr einziger lokaler Kanal ist Bluetooth LE. Sie erreichen sie entweder **lokal über Bluetooth** (siehe Spalte _„Lokal (BLE)“_ ) oder über die **Cloud** . Alle WB-Modelle basieren auf derselben Plattform; bisher wurde nur das Modell HMS-800-2WB getestet.

² **Für die lokale BLE-Variante** benötigen Sie einen [ESPHome Bluetooth-Proxy](https://esphome.io/projects/?type=bluetooth) (einen günstigen ESP32) in Ihrem Netzwerk. Der Adapter liest und steuert den Wechselrichter dann lokal über Bluetooth, ohne Cloud-Anbindung. WLAN-Modelle (T) benötigen dies nicht – sie nutzen den lokalen TCP-Pfad. Weitere Informationen finden Sie im Abschnitt _„BLE-Gateway (ESPHome)“_ der [Dokumentation](/#/docs/adapterref/iobroker.hoymiles/docs/en/README.md#ble-gateway-esphome) .

**Betrieb ausschließlich über die Cloud:** Jeder unterstützte Wechselrichter in Ihrem S-Miles-Konto funktioniert auch ohne lokale Verbindung. Der Adapter erkennt ihn automatisch und stellt Echtzeit-Leistungsdaten (Burst-Kanal), Energieaggregate, Netzprofil sowie Befehle zum Ein-/Ausschalten und Neustarten des Wechselrichters und der DTU über die Cloud bereit. Die übrigen Befehle (Leistungsbegrenzung, Sperren, Warnungen löschen usw.) erfordern die lokale TCP-Verbindung.

> **Wichtig:** Dieser Adapter funktioniert **nur** mit HMS-Modellen, die über **integriertes WLAN** verfügen. Er funktioniert **NICHT** mit:
>
> - HMS-1600/1800/2000-4T **ohne** "DW" (diese verwenden Sub-1G RF und benötigen eine externe DTU)
> - HM-Serie (kein WLAN, nur Funk)
> - MI-Serie (kein WLAN, nur Funk)
> - HMS/HMT mit externen DTU-Pro- oder DTU-WLite-Sticks
> - HMT-Dreiphasenmodelle

## Mehrere Wechselrichter

Dieser Adapter unterstützt mehrere Wechselrichter in einer einzigen Instanz:

- **Lokal:** Mehrere DTU-IP-Adressen in der Gerätetabelle hinzufügen
- **Cloud:** Alle Wechselrichter und Stationen in Ihrem Konto werden automatisch erkannt

Jede DTU erstellt einen Geräteknoten, indem sie ihre Seriennummer als ID verwendet (z. B. `hoymiles.0.4143A01CEDE4.*` Cloud-Stationen erstellen aggregierte Geräteknoten (z. B. `hoymiles.0.station-12345.*`).

## Changelog
### 0.5.0 (2026-09-25)

- (@Eistee82) **DTUs with firmware V01.01.01 work locally again.** That firmware encrypts the local connection and moves the DTU's cloud link to TLS on port 10083; the adapter now speaks both. DTUs with older firmware are unaffected
- (@Eistee82) **Hybrid inverters with a battery (HAT series, e.g. HAT-6.0HV-EUG1) can be read through the cloud** — experimental, needs an installer-type S-Miles account. Everything about the battery is in one place below the inverter (`<dtuSerial>.battery.*`); the plant gets its live power flow, its energy balance for today, month, year and lifetime including the self-sufficiency rate (the figures of the app's "Production & Consumption" tab), income and cost, its measuring points (grid meter, loads, PV meter, generator), day curves, the cloud's alarm list and the relay settings. Read-only; power on/off and reboot are sent in the form such a device expects. Many thanks to BastiBerlin for providing access to a real system for development and testing
- (@Eistee82) **WB-series inverters (e.g. HMS-800-2WB) can be used locally over Bluetooth** through a cheap ESP32 running an ESPHome Bluetooth Proxy, found automatically. A Shelly or ecotracker meter can be connected to such an inverter, either to read it out or so the inverter itself keeps the grid feed-in at zero. Nightly reconnect attempts no longer flood the log
- (@Eistee82) **Your inverters and plants appear on the Config Manager tab** with live values, controls and a settings dialog, and the adapter settings are split into Local, Cloud and Bluetooth tabs with links to the S-Miles portal and the Bluetooth-proxy instructions. In the adapter list it now appears as "Hoymiles Inverters"
- (@Eistee82) **More accurate readings, less wear:** the inverter's full daily power curve (`history.powerJson`) is read locally, the plant total keeps up with the individual inverters, energy counters no longer jump backwards after a restart, `inverter.activePowerLimit` no longer shows 0 % while producing, and the DTU's network, meter, zero-export and lock settings become states. Power-limit writes are rate-limited because every write wears the inverter's flash memory, and a single setting no longer overwrites the rest of the configuration
- (@Eistee82) **Renamed and removed states:** the WiFi signal is a 0–100 quality, not dBm, and is now called `dtu.signalQuality` / `config.wifiSignalQuality` (was "rssi"). `inverter.modulationIndexSignal`, `dtu.searchResult` and `pvN.errorCode` never held usable data and disappear from existing installations by themselves

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

Older entries: see CHANGELOG_OLD.md.

## License

MIT License

Copyright (c) 2026 Eistee82 (t.me/AMEistee)

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