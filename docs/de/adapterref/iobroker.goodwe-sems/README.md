---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.goodwe-sems/README.md
title: ioBroker.goodwe-sems
hash: MlCH7nZyW47tswu+Z/QBJgqqK91CEhQAUdG6M3MVUbs=
---
![Logo](../../../en/adapterref/iobroker.goodwe-sems/admin/goodwe-sems.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.goodwe-sems.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.goodwe-sems.svg)
![Spenden](https://img.shields.io/badge/Donate-PayPal-00457C?style=flat&logo=paypal&logoColor=white)
![Kauf mir einen Kaffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-FFDD00?style=flat&logo=buy-me-a-coffee&logoColor=black)

*[Auf Deutsch lesen](README.de.md)*

# IoBroker.goodwe-sems
![Test und Freigabe](https://github.com/bueste/ioBroker.goodwe-sems/actions/workflows/test-and-release.yml/badge.svg)

Liest Wechselrichter-, Batterie- und Leistungsflussdaten vom **[GoodWe](https://www.goodwe.com) [SEMS Portal](https://www.semsportal.com) (Cloud)** – für Installationen, die (z. B. weil kein LAN-Zugang zum Wechselrichter besteht) **nicht** mit dem lokalen [ioBroker.goodwe abgefragt werden können.](https://github.com/FossyTom/ioBroker.goodwe) Adapter (Modbus/UDP, Port 8899).

Die Anmeldung erfolgt mit Ihrem **normalen SEMS-Portal-Konto** (dem gleichen, das Sie auf semsportal.com / in der SEMS-App verwenden). Ein GoodWe-Organisations-/OpenAPI-Konto ist **nicht** erforderlich.

## Inhaltsverzeichnis
- [Warum dieser Adapter?](#why-this-adapter)
- [API-Ursprung und -Beschränkungen (bitte lesen)](#api-origin-and-limitations-please-read)
- [Installation](#installation)
- [Konfiguration](#configuration)
- [Objekt-/Zustandsstruktur](#objectstate-structure)
- [Fehlerbehandlung, Backoff und Ratenbegrenzungen](#error-handling-backoff-and-rate-limits)
- [Pushover-Benachrichtigungen](#pushover-notifications)
- [Sicherheit & Datenschutz](#security--privacy)
- [Entwicklung](#Entwicklung)
- [Änderungsprotokoll](#changelog)
- [Lizenz](#Lizenz)

## Warum dieser Adapter?
GoodWe ET/EH/BH/BT Wechselrichter können normalerweise lokal über Modbus/UDP ausgelesen werden (siehe [ioBroker.goodwe](https://github.com/FossyTom/ioBroker.goodwe)). Wenn kein LAN-Zugang zum Wechselrichter besteht (z. B. weil nur ein WLAN/LTE-Stick mit dem SEMS-Portal verbunden ist und das Zielnetzwerk anderweitig nicht erreichbar ist), bleibt als einzige Option der Umweg über die Cloud via **[SEMS-Portal](https://www.semsportal.com)** ([GoodWe](https://www.goodwe.com)), über das die Anlage ohnehin schon überwacht wird.

## API-Ursprung und -Beschränkungen (bitte lesen)
GoodWe bietet offiziell drei APIs an (siehe [Technisches Dokument zur GoodWe API](https://community.goodwe.com/solution/API)):

- **OpenAPI** - nur für SEMS *Organisations*-Konten, Aktivierung durch GoodWe erforderlich.
- **Echtzeit-Datenüberwachungs-API** - für Drittanbieter, erfordert eine Lizenzvereinbarung sowie eine Geräte-Whitelist.
- **Batch-Fernsteuerungsschnittstelle** - Kafka-basiert, nur Fernsteuerung.

Keiner dieser Dienste ist mit einem **normalen** SEMS-Portal-Konto (wie es die meisten Privatanwender haben) zugänglich. Dieser Adapter nutzt stattdessen dieselbe **undokumentierte HTTPS-API**, die auch die offizielle SEMS-App/Website verwendet (Anmeldung über `CrossLogin`/`SEMS+ cross-login`, Datenabruf über `GetMonitorDetailByPowerstationId`). Diese Endpunkte wurden von GoodWe nicht für die Nutzung durch Dritte freigegeben oder dokumentiert; die Implementierung basiert auf unabhängiger Verkehrsanalyse sowie den folgenden Open-Source-Referenzprojekten:

- [pygoodwe](https://github.com/yaleman/pygoodwe) (MIT)
- [goodwe-sems-home-assistant](https://github.com/TimSoethout/goodwe-sems-home-assistant)
- [openHAB SEMSPortal-Bindung](https://www.openhab.org/addons/bindings/semsportal/)

**Folgen:**

- Gut: Wir können die API jederzeit ohne Vorankündigung ändern - der Adapter kann dadurch (vorübergehend) nicht mehr funktionieren.
Es existiert **kein dokumentierter Echtzeit-/Push-Mechanismus** (WebSocket/SignalR) für Drittanbieter. Das Feld `msgSocketAdr` taucht zwar in einigen älteren Anmeldeantworten auf, wird aber von keinem der oben genannten Referenzprojekte verwendet. Seine Verwendung wäre reines Reverse Engineering ohne verlässliche Dokumentation und mit einem deutlich höheren Risiko verbunden (Kontosperrung, instabile Verbindung). Dieser Adapter fragt daher bewusst in einem konfigurierbaren Intervall (standardmäßig 5 Minuten) über HTTPS ab, anstatt eine ungetestete WebSocket-Verbindung zu simulieren.
Es wurde ein **Ratenbegrenzungscode (`GY0429`)** festgestellt (dokumentiert unter anderem in der Home Assistant-Integration). Der Adapter erkennt diesen Code und pausiert die Anfragen automatisch (standardmäßig 5 Minuten), anstatt das Konto durch wiederholte Anfragen zu gefährden.
- Die Nutzung erfolgt auf eigene Gefahr, siehe [LICENSE](LICENSE) (MIT, keine Gewährleistung).

**Von diesem Endpunkt nicht zurückgegebene Felder:** Bei Überprüfung anhand einer Live-Tagesantwort enthält die von diesem Adapter verwendete Gateway-Antwort `GetMonitorDetailByPowerstationId` weder einen Stationszeitstempel (`info.time`) noch monatsbezogene Erzeugungs-/Einkommens-/Währungsfelder (`kpi.month_generation`, `kpi.day_income`, `kpi.total_income`, `kpi.currency`). Die entsprechenden Zustände (`Station.PortalTimestamp`, `KPI.MonthGeneration`, `KPI.TodayIncome`, `KPI.TotalIncome`, `KPI.Currency`) werden daher für kein Konto und keine Tageszeit erstellt – dies ist eine permanente Lücke in der Gateway-API selbst und kein vorübergehendes Fehlen während Zeiten geringer Stromerzeugung. Zustände der Art `PowerFlow.*` werden nur dann erstellt, wenn das Portal tatsächlich Lastflussdaten für das Kraftwerk zurückgibt.

**Batteriedaten (optional, experimentell):** Der oben genannte Gateway-Endpunkt enthält keine Batteriedaten (Ladezustand/Leistung/Spannung usw.), selbst nicht für Anlagen mit Batterie. Das Webportal von GoodWe (`semsplus.goodwe.com`) ruft diese Daten über eine *separate*, völlig andere und undokumentierte API ab (Sitzungserstellung über `cross-login`, Geräteerkennung über `relatedDevices`, Daten über den `telemetry`-Endpunkt eines Geräts vom Typ `BAT_SYS`). Dies wurde durch Reverse Engineering analysiert und Feld für Feld anhand von aufgezeichnetem Browserverkehr (HAR) eines GW8K-ET + LX-Batteriesystems verifiziert. Wenn Sie die Option **"Batteriedaten abrufen"** in der Instanzkonfiguration aktivieren, ruft der Adapter zusätzlich diese zweite API für jeden Wechselrichter auf, der ein angeschlossenes `BAT_SYS`-Gerät meldet, wobei die *gleichen* bereits konfigurierten SEMS-Anmeldeinformationen verwendet werden (keine separate Anmeldung erforderlich) - und `Inverters.<sn>.Battery.SOC/Power/Voltage/Current/Temperature/MaxChargeCurrent/MaxDischargeCurrent` erstellt wird.

Diese API ist **unzuverlässiger und weniger zuverlässig als der Rest des Adapters**: Es handelt sich um eine zweite, unabhängig authentifizierte, undokumentierte und signierte API, die GoodWe ohne Vorwarnung ändern, drosseln oder blockieren kann – völlig unabhängig von der oben genannten Hauptüberwachungs-API. Daher ist sie standardmäßig deaktiviert. Sollte sie ausfallen, ist der Rest des Adapters (PV-Erzeugung, KPIs, Wechselrichter-Telemetrie) nicht beeinträchtigt. Ein Fehler in der Batterietelemetrie wird zwar erkannt und pro Wechselrichter auf Debug-Ebene protokolliert, aber nicht ausgelöst.

## Installation
Sobald dieser Adapter im offiziellen ioBroker-Adapter-Repository aufgeführt ist, installieren Sie ihn auf die übliche Weise: **Admin -> Adapter -> Suche nach "goodwe-sems" -> installieren**.

Bis dahin kann ein ioBroker-Administrator es manuell auf dem ioBroker-Host hinzufügen:

```
iobroker url iobroker.goodwe-sems
```

## Konfiguration
| Feld | Beschreibung |
|---|---|
| SEMS-Konto / Passwort | Dieselben Zugangsdaten wie bei semsportal.com. Das Passwort wird von ioBroker verschlüsselt gespeichert. |
| Pflanzen-ID (optional) | Für automatische Erkennung leer lassen (`GetPowerStationIdByOwner`). Bei Konten mit mehreren Pflanzen: ID manuell aus der Portal-URL kopieren (`.../powerstation/powerstatussnmin/<ID>`). |
| Leichtgläubig | Siehe [Pushover-Benachrichtigungen](#pushover-notifications). |
| Pushover | Siehe [Pushover-Benachrichtigungen](#pushover-notifications). |

## Objekt-/Zustandsstruktur
```
goodwe-sems.0.info.connection              SEMS Portal reachable (bool)
goodwe-sems.0.info.lastSuccess             Timestamp of the last successful poll
goodwe-sems.0.info.lastError               Last error message
goodwe-sems.0.info.consecutiveErrors       Number of consecutive failed attempts
goodwe-sems.0.info.rateLimited             SEMS Portal is currently rate-limiting (bool)
goodwe-sems.0.info.activePollInterval      Currently effective interval incl. backoff (s)
goodwe-sems.0.info.rawResponse             Raw JSON response (only when the debug option is enabled)

goodwe-sems.0.Station.Name / .Capacity / .Address / .Latitude / .Longitude / .PortalTimestamp / .Status / .StationId
goodwe-sems.0.KPI.CurrentPower / .TodayGeneration / .MonthGeneration / .TotalGeneration / .TodayIncome / .TotalIncome / .Currency
goodwe-sems.0.PowerFlow.PV / .Load / .Grid / .Battery / .LoadStatus / .GridStatus / .PvStatus / .BatteryStatus
goodwe-sems.0.EVCharger.*                  (only if reported by the portal)

goodwe-sems.0.Inverters.<serial>.Name / .Model / .Status / .WarningCode
goodwe-sems.0.Inverters.<serial>.CurrentPower / .TodayGeneration / .TotalGeneration / .Temperature
goodwe-sems.0.Inverters.<serial>.PV1..4.Voltage / .Current
goodwe-sems.0.Inverters.<serial>.AC_L1..3.Voltage / .Current / .Frequency
goodwe-sems.0.Inverters.<serial>.Battery.SOC / .Power / .Voltage / .Current / .Temperature / .MaxChargeCurrent / .MaxDischargeCurrent
                                            (only with the "Fetch battery data" option enabled AND an attached battery)
```

Bei zwei Wechselrichtern (wie in der ursprünglichen Anforderung, für die dieser Adapter entwickelt wurde) werden automatisch zwei `Inverters.<serial>.*` Zweige erstellt - die Anzahl ist nicht fest codiert, sondern wird ausschließlich durch das bestimmt, was das Portal für das konfigurierte Konto zurückgibt.

Felder, die das Portal liefert, die dieser Adapter aber (noch) nicht kennt, gehen nicht verloren: Bei aktivierter Debug-Option landet die vollständige Rohantwort in `info.rawResponse` (JSON), sodass sie überprüft und bei Bedarf per Pull Request hinzugefügt werden kann.

## Fehlerbehandlung, Backoff und Ratenbegrenzungen
- Jeder Abfragezyklus ist vollständig in try/catch eingeschlossen; ein einzelner Fehler kann die Abfrageschleife niemals dauerhaft stoppen.
- Spezielle Fehlerklassen (`SemsAuthError`, `SemsRateLimitError`, `SemsNetworkError`, `SemsProtocolError`) steuern das gewünschte Verhalten:
- **Ratenbegrenzung (`GY0429`)** -> sofortige Pause (Standard 300 s), `info.rateLimited = true`.
- **Anmeldefehler** -> exponentieller Backoff (maximal 1 Stunde), damit falsche Anmeldeinformationen das Konto nicht zusätzlich belasten.
- **Netzwerk-/Protokollfehler** -> moderater Backoff.
- Nach einer konfigurierbaren Anzahl aufeinanderfolgender Ausfälle (Standard 3) wird die Anlage als "offline" betrachtet und, falls aktiviert, eine Pushover-Benachrichtigung ausgelöst.
Zusätzlich wird alles strukturiert in das ioBroker-Protokoll geschrieben (`error`/`warn`/`debug` je nach Schweregrad).

## Pushover-Benachrichtigungen
Konfigurierbar in drei Modi:

1. **Über eine bestehende `ioBroker.pushover`-Instanz** (`sendTo`) - empfohlen, keine doppelte Verwaltung von Anmeldeinformationen.
2. **Direkt über die Pushover-API** (Ihr eigener Benutzerschlüssel + API-/App-Token, verschlüsselt gespeichert) - funktioniert auch ohne eine separate Pushover-Instanz.
3. **Beide gleichzeitig.**

Ausgelöst durch: SEMS-Anmeldefehler, SEMS-Ratenbegrenzung, längeren Ausfall, unerwarteten Adapterfehler – jeweils einzeln deaktivierbar. Eine interne Wartezeit (standardmäßig 1 Stunde pro Kategorie) verhindert Spam während bestehender Probleme.

## Sicherheit und Datenschutz
- Das SEMS-Passwort und das Pushover-API-Token sind im Stammverzeichnis von `io-package.json` als `encryptedNative`/`protectedNative` gekennzeichnet und werden von ioBroker verschlüsselt gespeichert; sie werden niemals im Klartext protokolliert (der Kontoname wird in den Protokollmeldungen maskiert, z. B. `st***@gmail.com`).
Der Adapter ermöglicht ausschließlich Lesezugriffe (`GetMonitorDetailByPowerstationId`, `GetPowerStationIdByOwner`). Eine Fernsteuerungs-/Schreibfunktion (`SaveRemoteControlInverter`) ist bewusst nicht vorgesehen, da dies ein deutlich höheres Sicherheits- und Haftungsrisiko darstellen würde und nicht zu den Anforderungen gehörte.
- Keine Abhängigkeit von Drittanbietern für den HTTP-Zugriff: Die in Node.js >=22 integrierte `fetch`-Funktion wird anstelle einer zusätzlichen HTTP-Bibliothek verwendet - eine kleinere Angriffsfläche, geringeres Lieferkettenrisiko.
- Die von der Login-Antwort zurückgegebene API-Basis-URL wird validiert (nur HTTPS auf Domains im Besitz von GoodWe), bevor sie von weiteren Anfragen verwendet wird, sodass eine manipulierte Login-Antwort das Session-Token nicht an einen fremden Host umleiten kann.
- Alle Netzwerkfehler werden typisiert abgefangen; ungeprüfte Daten aus der API-Antwort werden niemals ausgeführt (`eval`, `Function` und ähnliches werden nirgends verwendet).

## Entwicklung
```
npm install
npm run lint
npm test          # unit tests (lib/mapping.js, lib/semsApi.js, lib/notify.js) + package consistency check
```

Zusätzlich wird vor jeder Veröffentlichung empfohlen:

```
npx @iobroker/repochecker@latest .
```

Pull-Anfragen sind willkommen, insbesondere um weitere vom Portal bereitgestellte Felder hinzuzufügen (siehe `info.rawResponse` mit aktivierter Debug-Option) oder um Übersetzungen zu verbessern.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 1.0.8 (2026-08-25)

- New (opt-in, experimental): battery telemetry via GoodWe's separate, undocumented web-portal API (own login/session, device discovery via relatedDevices(), data via a BAT_SYS device's telemetry() endpoint). Reverse-engineered and verified field-by-field against real captured browser traffic (thanks to a tester's HAR capture!) from a GW8K-ET + LX battery system, including the gateway's SHA-256 signature scheme. Enable "Fetch battery data" to create Inverters.<sn>.Battery.SOC/Power/Voltage/Current/Temperature/MaxChargeCurrent/MaxDischargeCurrent - uses the same SEMS credentials already configured. Off by default, fully isolated from core monitoring. Also fixed the previous always-empty top-level Battery.SOC/Status states and the guessed-but-wrong per-inverter field names - no migration needed since these states were never actually created.

### 1.0.7 (2026-08-11)

- Fix E1009: Station.Latitude/Longitude used role "value.gps" (reserved for a combined "lon;lat" string) instead of the correct "value.gps.latitude"/"value.gps.longitude" roles, which support numeric values. Added an explicit startup migration so already-running installations get the corrected role, not just fresh installs.

### 1.0.6 (2026-08-11)

- Fix both findings from the follow-up review: added a default ("en") for the notificationLanguage select (was blank on fresh installs) and added pushoverUserKey to encryptedNative/protectedNative alongside pushoverApiToken for encryption at rest. No code changes needed - js-controller handles the encryption migration automatically.

### 1.0.5 (2026-08-09)

- Fix E5005 (false positive): a log message describing why the poll interval was capped contained the literal text "setTimeout(" as part of an explanatory sentence, which the checker's text-based scan flagged as if it were real code. The only actual setTimeout() call in the codebase was already this.setTimeout() (adapter-managed) - verified by running the checker's exact detection regex against every source file. Reworded the log message without changing its meaning. No functional changes.

### 1.0.4 (2026-08-09)

- Fix E3009 (26 errors from the automated Object Structure Check): the per-inverter AC_L1-3, PV1-4 and Battery sub-groups were missing their required intermediate channel object. _applyMonitorDetail() now ensures a channel for each sub-group that actually has at least one mapped state. No migration needed - these are new objects and self-heal on the next poll cycle after upgrading. Verified against a live daytime API response: 0 missing intermediate objects (was 26). No functional regressions.

### 1.0.3 (2026-08-09)

- Docs only: documented, based on a live daytime API response, that the SEMS+ gateway endpoint used by this adapter (GetMonitorDetailByPowerstationId) never returns a station timestamp or month-to-date generation/income/currency fields for any account - these are a permanent gap in the API itself, not a symptom of an incomplete/nighttime object dump as previously assumed during review. Battery/PowerFlow states are correctly created only when the portal actually reports that data for the plant. No code changes.

### 1.0.2 (2026-08-09)

- Fix all findings from the follow-up manual review: translated 6 previously missed German log messages in lib/semsApi.js, fixed a second duplicate German error message, and made _maskAccount() always return English. Implemented proper multi-language support for Pushover notification text (new notificationLanguage config option, English/German, default English). Added a hard ceiling (86400s) on the poll interval to prevent a setTimeout() integer overflow. Corrected the unit of info.activePollInterval from "s" to "sec" as required by the value.interval role. Since js-controller does not reliably re-sync instanceObjects common properties on every adapter update across all versions in the field (see https://github.com/ioBroker/ioBroker.js-controller/issues/769), the unit fix is also applied via an explicit migration on every adapter start, so already-running installations get the corrected value, not just fresh installs. No functional regressions.

### 1.0.1 (2026-08-08)

- Fix: translated all German log messages to English (this.log.*() calls in main.js, the internal log callback in lib/semsApi.js, and lib/notify.js). The internal Pushover notification log line in Notifier.notify() no longer embeds the (intentionally German-language) push title/message into the log entry. Also translated the underlying SemsAuthError/SemsProtocolError/SemsNetworkError messages to English, since those flow into log lines via error.message. The actual Pushover push notification text intentionally stays German. No functional changes.

### 1.0.0 (2026-07-22)

- (Stefan Bühler) First stable release: the adapter has been running reliably against the SEMS+ gateway API in production for several release cycles. This release is metadata only - fixed `common.news` translations for 0.1.15-0.1.19 (some languages were untranslated copies of the English text - flagged by the repochecker as E1144), added a Buy Me a Coffee link next to the PayPal donate badge, and standardized copyright/author metadata. No functional changes.

### 0.1.19 (2026-07-20)

- (Stefan Bühler) removed the classic, version-prefixed `GetMonitorDetailByPowerstationId` endpoint (tried as `/v3`, `/v2`, `/v1` since 0.1.14/0.1.15) entirely - GoodWe has retired it, every account observed during development 404s on all three versions unconditionally. `getMonitorDetail()` now calls the SEMS+ gateway API (introduced in 0.1.16) directly, making every poll cycle faster and avoiding pointless failing requests
- (Stefan Bühler) fix: the gateway session was never automatically refreshed once it expired server-side - the adapter creates a single long-lived API client at startup and reuses its session indefinitely, and unlike the (now removed) classic path, the gateway request helper never re-logged in on a stale session. This caused the adapter to fail permanently after a few hours (confirmed by a real account: worked in the evening, failed every single poll cycle the entire next day) until manually restarted. Every gateway call now automatically re-logs in once and retries on any error before giving up
- (Stefan Bühler) 5 updated/new regression tests (45 unit tests in total) covering the simplified direct-gateway call and the automatic re-login-and-retry behavior (including giving up correctly after exactly one retry)

### 0.1.18 (2026-07-19)

- (Stefan Bühler) fix: SEMS+ login still got rejected with `code=C0602 "account_login_abnormal"` even after the host fix in 0.1.17, because the adapter identified itself as the iOS app (`User-Agent: PVMaster/...`, token `client: "ios"`) - but the called endpoint (`eu-semsplus.goodwe.com`) is, per the real browser capture, only ever used by the SEMS+ *web* client, sending `client: "semsPlusWeb"`, a browser User-Agent, and `Origin`/`Referer` headers. The login call now builds its own matching header identity for just that one request; every other (classic/legacy) endpoint keeps using the established iOS identity, unchanged
- (Stefan Bühler) 1 tightened regression test verifying the login call's client identity and headers

### 0.1.17 (2026-07-19)

- (Stefan Bühler) fix: SEMS+ login failed for some accounts (`code=C0602 "account_login_abnormal"`) because the adapter called the global endpoint (`semsplus.goodwe.com`) instead of the EU-regional one (`eu-semsplus.goodwe.com`). Confirmed via a real browser HAR capture: the identical request body and password hash succeeded against the regional host. Deliberately implemented **without** a host-fallback loop - repeatedly retrying the same credentials against multiple hosts looks like credential stuffing to the backend and risks a real account lockout
- (Stefan Bühler) the login request now also sends the `x-signature` header (matching real browser traffic exactly), and a genuine SEMS+ session token is now correctly accepted by the gateway API introduced in 0.1.16 - previously, the gateway fallback only ever received a Legacy-CrossLogin-derived token, which the gateway rejected with the same C0602 error since it isn't a real SEMS+ session
- (Stefan Bühler) 1 updated regression test verifying the exact login URL and the presence of the login-time signature header

### 0.1.16 (2026-07-19)

- (Stefan Bühler) major finding: some accounts whose SEMS+ login is rejected and fall back to the legacy CrossLogin API do not end up on the classic `semsportal.com`-style backend at all - they get a session for a completely different, modern microservice API ("SEMS+ gateway", `eu-gateway.semsportal.com`), which explains why `GetMonitorDetailByPowerstationId` could never succeed under any of the `v1`/`v2`/`v3` paths tried in 0.1.14/0.1.15. Confirmed via a real account's browser HAR capture (`eu-semsplus.goodwe.com`) showing the actual endpoints in use (`sems-plant/api/stations/...`, `sems-plant/api/equipments/<sn>/telemetry`, etc.)
- (Stefan Bühler) the gateway API additionally requires every request to carry a computed `x-signature` header or it is silently rejected. The signature scheme (`base64(sha256(`${ts}@${uid}@${token}`) + "@" + ts)`) was reverse-engineered empirically from ~230 real request/response pairs captured from the web app - 100% match, no exceptions
- (Stefan Bühler) `getMonitorDetail()` now automatically falls back to this gateway API (station basic info, device list, per-device telemetry/telecounting) when all three classic paths 404, and reshapes the result into the same `info`/`kpi`/`inverter[]` shape the rest of the adapter already expects - no changes needed in the mapping/state-creation layer
- (Stefan Bühler) deliberately conservative first version: only fields with a confirmed unit/shape are populated (current power, today's/total generation, per-inverter AC/PV/temperature values); the station-level power-flow split (PV/load/grid/battery) is not populated yet, since every real-account capture so far happened at night and returned an empty object for it
- (Stefan Bühler) 2 new regression tests (47 unit tests in total), including one that verifies the actual signature computation against the real, reverse-engineered formula

### 0.1.15 (2026-07-19)

- (Stefan Bühler) fix: 0.1.14's v3→v2 fallback for `GetMonitorDetailByPowerstationId` was insufficient - a real-world account's legacy-login backend returned `404 Route Not Found` for **both** the `v2` and `v3` paths. Community references disagree on which version is correct (pygoodwe hardcodes `v2`, a separate 2023 write-up uses `v1`, our own traffic inspection observed `v3`), so `getMonitorDetail()` now tries all three versions in sequence (`v3` → `v2` → `v1`) and uses whichever one doesn't 404
- (Stefan Bühler) diagnostics: debug logs now include the full request URL (including the resolved API base) instead of just the relative path, and the login success log now also prints the resolved API base, making it possible to see exactly which host+path combination is failing
- (Stefan Bühler) 2 updated/new regression tests (45 unit tests in total) covering the three-way version fallback and the case where all three paths fail

### 0.1.14 (2026-07-19)

- (Stefan Bühler) fix: `GetMonitorDetailByPowerstationId` returned `404 Route Not Found` for accounts whose SEMS+ login is rejected (observed: `code=C0602`) and that fall back to the legacy CrossLogin API - that backend serves the endpoint under the `v2` API path, not `v3`. Root cause found via a real account's debug log plus the community reference implementation [pygoodwe](https://github.com/yaleman/pygoodwe), whose legacy-only client hardcodes the `v2` path. `getMonitorDetail()` now tries `v3` first and automatically retries once with `v2` on a detected 404, so both backend variants work without any user-facing configuration change
- (Stefan Bühler) fix: error messages now also surface the API's `error_msg` field (previously silently dropped, resulting in an uninformative "unbekannter Fehler" even when the response body contained a clear error description)
- (Stefan Bühler) 2 new regression tests (44 unit tests in total) covering the v3→v2 fallback and the case where both paths fail

### 0.1.13 (2026-07-19)

- (Stefan Bühler) diagnostics: log the raw JSON envelope of every SEMS API call at debug level, not just the monitor-detail call. Real-account testing surfaced a `SEMS-API-Fehler: ... GetPowerStationIdByOwner ... unbekannter Fehler (code=undefined)` report - the success/error code convention this adapter assumes (`code: 0`/`"0"`/`"00000"`) was only ever validated against test fixtures, not this specific endpoint on a live account. This logging is the fastest way to see the actual response shape and fix the real bug without needing access to anyone's SEMS credentials

### 0.1.12 (2026-07-19)

Further fixes from a repochecker recheck on the `ioBroker.repositories` listing PR:

- (Stefan Bühler) **[E2004]** removed the `0.1.10` entry from `common.news` in `io-package.json` - that version's CI failed before the deploy step, so it was never actually published to npm
- (Stefan Bühler) **[S3014]** declared `needs: check-and-lint` on the `adapter-tests` job so it only runs after linting succeeds
- (Stefan Bühler) **[W0066]** pinned `@types/node` to `^22` (was the open-ended `>=22`, which could resolve to a newer major with mismatched typings)
- (Stefan Bühler) **[W4040]/[W4042]** fixed the JSON schema associations in `.vscode/settings.json`: `fileMatch` entries must not have a leading slash, and the jsonConfig schema must also match `admin/jsonCustom.json` and `admin/jsonTab.json`
- (Stefan Bühler) **[S8913]** added `.github/workflows/automerge-dependabot.yml` (using `iobroker-bot-orga/action-automerge-dependabot@v1`) and `.github/auto-merge.yml` so patch updates (and minor updates for dev dependencies) from Dependabot are merged automatically

### 0.1.11 (2026-07-19)

- (Stefan Bühler) fixed a real CI break introduced in 0.1.10: removed Node.js 20.x from the `adapter-tests` matrix in `.github/workflows/test-and-release.yml`. It is incompatible with `engines.node >=22` (also introduced in 0.1.10) once the official `ioBroker/testing-action-adapter@v1` action runs `npm ci` with `engine-strict` enabled, which crashed that matrix job and cancelled every other job via fail-fast

### 0.1.10 (2026-07-19)

Second round of fixes, addressing further findings from a stricter automated `@iobroker/repochecker` recheck on the `ioBroker.repositories` listing PR:

- (Stefan Bühler) **[W0028]** raised `engines.node` to `>=22`
- (Stefan Bühler) **[W0063]** removed `chai`, `chai-as-promised`, `mocha`, `sinon` from devDependencies (already provided by `@iobroker/testing`)
- (Stefan Bühler) **[S0065]/[S0085]/[S0087]** added `@types/node`, `@tsconfig/node22` and `/tsconfig.json` for editor type-checking support
- (Stefan Bühler) **[S5026]** added the `@alcalzone/release-script-plugin-manual-review` release plugin
- (Stefan Bühler) **[W3013]/[W3015]/[W3017]** rewrote `.github/workflows/test-and-release.yml` to use the official shared `ioBroker/testing-action-check@v1`, `ioBroker/testing-action-adapter@v1` and `ioBroker/testing-action-deploy@v1` GitHub Actions instead of hand-written steps
- (Stefan Bühler) added `test/integration.js` (adapter startup smoke test via `@iobroker/testing`'s integration harness) so `npm run test:integration` succeeds
- (Stefan Bühler) **[E1032]** trimmed `common.news` in `io-package.json` to the 7 entries kept by the repository builder
- (Stefan Bühler) **[E5512]** added the required `size` property to the Pushover section header in `admin/jsonConfig.json`
- (Stefan Bühler) **[S5601]** migrated `admin/i18n` from the long `{lang}/translations.json` format to the short `{lang}.json` format
- (Stefan Bühler) **[S4036]** added `.vscode/settings.json` with JSON schema associations for `io-package.json` and `admin/jsonConfig.json`
- (Stefan Bühler) **[S8901]** added `.github/dependabot.yml` (npm + github-actions, weekly, with a cooldown and an `@types/node` major/minor ignore rule)

### 0.1.9 (2026-07-19)

Addressed the stricter automated `@iobroker/repochecker` findings surfaced on the `ioBroker.repositories` listing PR:

- (Stefan Bühler) **[E1057]** moved `encryptedNative`/`protectedNative` from `common` to the `io-package.json` root, matching the current schema
- (Stefan Bühler) **[E3009]/[E3010]/[E3011]/[E3012]** raised `engines.node` to `>=20`, `@iobroker/adapter-core` to `^3.4.1`, `js-controller` dependency to `>=6.0.11`, `admin` globalDependency to `>=7.6.20`
- (Stefan Bühler) **[E3040]** updated devDependencies (`@iobroker/adapter-dev`, `@iobroker/testing`, mocha, esbuild and others) to current major versions
- (Stefan Bühler) **[E3000-series]** rewrote `.github/workflows/test-and-release.yml` to the current official template: renamed jobs (`check-and-lint`, `adapter-tests`, `adapter-check`, `deploy`), full OS/Node test matrix (ubuntu/windows/macos x 20/22/24), `concurrency` group, deploy job pinned to Node 24
- (Stefan Bühler) **[E5005]** replaced global `setTimeout`/`clearTimeout` with adapter-managed timers (`adapter.setTimeout`/`adapter.clearTimeout`) in `lib/notify.js` and `lib/semsApi.js`
- (Stefan Bühler) **[E5043]** switched to `require("node:crypto")`
- (Stefan Bühler) **[E5507]/[E5510]/[E5512]/[E5612]** fixed `admin/jsonConfig.json`: added missing `lg`/`xl` responsive sizes on every item, replaced a literal label string with a proper i18n key (`loginTab`, added to all 11 translation files)
- (Stefan Bühler) **[E6004]/[E6015]/[W0037]/[W0076]** translated `README.md` to English (required language), moved the previous German content to `README.de.md`, added `CHANGELOG_OLD.md` for older entries
- (Stefan Bühler) **[W9501]** removed the redundant `.npmignore` (superseded by package.json `files`)
- (Stefan Bühler) **[E9006]** added `.commitinfo` to `.gitignore`
- (Stefan Bühler) **[S4036]/[S5026]** added `prettier.config.mjs`, re-formatted the codebase, disabled `jsdoc/reject-any-type` for the opaque Node timer-handle type with a justifying comment

### 0.1.8 (2026-07-19)

Addressed ioBroker adapter-check findings:

- (Stefan Bühler) **[E254]** removed changelog entries for 0.1.1/0.1.2 - those tags were pushed but their npm-publish CI job failed at the time (missing `NPM_TOKEN` / npm CLI too old for OIDC), so the versions never existed on npm
- (Stefan Bühler) **[W132]** this automatically brought the entry count under the repository builder's 7-entry truncation limit for `common.news`
- (Stefan Bühler) **[W184]** removed deprecated `common.title` (superseded by `common.titleLang`) and deprecated/ignored `common.main` (the entry point comes from `package.json`)
- (Stefan Bühler) **[W034]** raised `@iobroker/adapter-core` from ^3.1.6 to ^3.2.2
- (Stefan Bühler) **[W173]/[W174]/[E999]/[W401]**: `password` was already correctly listed in `encryptedNative`/`protectedNative` (verified against the published tarball) - these findings, together with the global axios 404 when fetching `sources-dist-latest.json`, are side effects of the adapter not yet being listed in the official ioBroker repository

### 0.1.7 (2026-07-19)

- (Stefan Bühler) branding: replaced the placeholder icon with the official GoodWe logo (used with permission from GoodWe)

### 0.1.6 (2026-07-18)

- (Stefan Bühler) updated the dev toolchain: mocha 11, sinon 22, @alcalzone/release-script 5, @iobroker/eslint-config 2; remaining transitive CVEs (adm-zip, diff, esbuild, serialize-javascript) resolved via npm `overrides` - `npm audit`: 0 vulnerabilities (including dev dependencies)

Security/quality audit (security tester, maintainer review, fuzzing of the mapping layer):

- (Stefan Bühler) **Security:** inverter serial numbers from the (untrusted) portal response are sanitized before becoming part of ioBroker object IDs (prevents broken/unexpectedly nested object trees caused by special characters such as `.` `*` `]`)
- (Stefan Bühler) **Security:** the API base URL returned by the login server is validated - HTTPS on GoodWe-owned domains only (`*.semsportal.com`, `*.goodwe.com`), otherwise falls back to the known regional URL. A manipulated login response can no longer redirect the session token to a foreign host
- (Stefan Bühler) **Fix:** `null`/broken entries in the portal's `inverter[]` array crashed the entire poll cycle - now skipped, healthy inverters from the same response are still processed
- (Stefan Bühler) **Fix:** numbers in scientific notation (`"1e5"`) were parsed incorrectly (yielded 15 instead of 100000)
- (Stefan Bühler) **Fix:** obviously invalid portal timestamps (`99/99/9999 ...`) produced absurd epoch values via JavaScript's `Date` rollover behaviour - now rejected
- (Stefan Bühler) **Fix:** automatic plant discovery now filters out entries without a usable ID (previously caused permanently failing poll cycles)
- (Stefan Bühler) **Robustness:** no more state writes after adapter unload; the `adapterError` notification dedupe window is also reset after recovery
- (Stefan Bühler) 14 new regression tests (42 unit tests in total); `npm audit`: 0 vulnerabilities in production dependencies (remaining findings were dev-toolchain only)

### 0.1.5 (2026-07-18)

- (Stefan Bühler) fix: corrected the PayPal donation link in the README (button link instead of the old donate link)

Older changelog entries can be found in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License

MIT License

Copyright (c) 2026 Stefan Bühler

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