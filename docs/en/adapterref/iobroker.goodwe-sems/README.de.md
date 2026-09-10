---
chapters: {"pages":{"en/adapterref/iobroker.goodwe-sems/README.md":{"title":{"en":"ioBroker.goodwe-sems"},"content":"en/adapterref/iobroker.goodwe-sems/README.md"},"en/adapterref/iobroker.goodwe-sems/README.de.md":{"title":{"en":"ioBroker.goodwe-sems"},"content":"en/adapterref/iobroker.goodwe-sems/README.de.md"}}}
---
![Logo](admin/goodwe-sems.png)

*[Read this in English](/#/adapters/goodwe-sems)*

# ioBroker.goodwe-sems

[![NPM version](https://img.shields.io/npm/v/iobroker.goodwe-sems.svg)](https://www.npmjs.com/package/iobroker.goodwe-sems)
[![Downloads](https://img.shields.io/npm/dm/iobroker.goodwe-sems.svg)](https://www.npmjs.com/package/iobroker.goodwe-sems)
![Test and Release](https://github.com/bueste/ioBroker.goodwe-sems/actions/workflows/test-and-release.yml/badge.svg)
[![Donate](https://img.shields.io/badge/Spenden-PayPal-00457C?style=flat&logo=paypal&logoColor=white)](https://www.paypal.com/ncp/payment/TT6MTBLXX9L9U)
[![Buy me a coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-FFDD00?style=flat&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/stefanbuehler)

Liest Wechselrichter-, Batterie- und Energiefluss-Daten aus dem **[GoodWe](https://www.goodwe.com) [SEMS Portal](https://www.semsportal.com) (Cloud)** – für Anlagen, die (z. B. weil kein LAN-Zugriff auf den Wechselrichter besteht) **nicht** mit dem lokalen [ioBroker.goodwe](https://github.com/FossyTom/ioBroker.goodwe)-Adapter (Modbus/UDP, Port 8899) abgefragt werden können.

Login erfolgt mit dem **ganz normalen SEMS-Portal-Konto** (dasselbe wie unter semsportal.com / in der SEMS-App). Ein GoodWe-„Organization“/OpenAPI-Konto wird **nicht** benötigt.

## Inhaltsverzeichnis

- [Warum dieser Adapter?](#warum-dieser-adapter)
- [API-Herkunft und Grenzen (bitte lesen)](#api-herkunft-und-grenzen-bitte-lesen)
- [Installation](#installation)
- [Konfiguration](#konfiguration)
- [Objekt-/State-Struktur](#objekt-state-struktur)
- [Fehlerbehandlung, Backoff und Rate-Limits](#fehlerbehandlung-backoff-und-rate-limits)
- [Pushover-Benachrichtigungen](#pushover-benachrichtigungen)
- [Sicherheit & Datenschutz](#sicherheit--datenschutz)
- [Entwicklung](#entwicklung)
- [Changelog](#changelog)
- [Lizenz](#lizenz)

## Warum dieser Adapter?

GoodWe ET/EH/BH/BT-Wechselrichter lassen sich normalerweise lokal per Modbus/UDP auslesen (siehe [ioBroker.goodwe](https://github.com/FossyTom/ioBroker.goodwe)). Steht kein LAN-Zugriff auf den Wechselrichter zur Verfügung (z. B. weil nur ein WLAN/LTE-Stick mit dem SEMS-Portal verbunden ist und das Zielnetz nicht erreichbar ist), bleibt nur der Umweg über die Cloud: das **[SEMS Portal](https://www.semsportal.com)** ([GoodWe](https://www.goodwe.com)), über das die Anlage ohnehin schon überwacht wird.

## API-Herkunft und Grenzen (bitte lesen)

GoodWe bietet offiziell drei APIs an (siehe [GoodWe API Technical Document](https://community.goodwe.com/solution/API)):

- **OpenAPI** – nur für SEMS-*Organization*-Konten, erfordert Freischaltung durch GoodWe.
- **Real-time Data Monitoring API** – für Drittanbieter, erfordert Lizenzvertrag + Geräte-Whitelist.
- **Batch Remote Control Interface** – Kafka-basiert, nur Fernsteuerung.

Für ein **normales** SEMS-Portal-Konto (wie es die meisten Privatanwender haben) ist keine davon zugänglich. Dieser Adapter spricht stattdessen dieselbe **undokumentierte HTTPS-API**, die auch die offizielle SEMS-App/Webseite verwendet (Login via `CrossLogin`/`SEMS+ cross-login`, Datenabfrage via `GetMonitorDetailByPowerstationId`). Diese Endpunkte wurden nicht von GoodWe für Drittnutzung freigegeben oder dokumentiert; die Implementierung basiert auf eigener Analyse sowie den quelloffenen Referenzprojekten:

- [pygoodwe](https://github.com/yaleman/pygoodwe) (MIT)
- [goodwe-sems-home-assistant](https://github.com/TimSoethout/goodwe-sems-home-assistant)
- [openHAB SEMSPortal-Binding](https://www.openhab.org/addons/bindings/semsportal/)

**Konsequenzen:**

- GoodWe kann die API jederzeit ohne Vorankündigung ändern - der Adapter kann dadurch (temporär) ausfallen.
- Es gibt **kein dokumentiertes Echtzeit-/Push-Verfahren** (Websocket/SignalR) für Drittanbieter. Ein `msgSocketAdr`-Feld taucht in älteren Login-Antworten auf, wird aber von keinem der oben genannten Referenzprojekte tatsächlich genutzt - es wäre reines Reverse-Engineering ohne belastbare Dokumentation und ein deutlich höheres Risiko (Kontosperrung, instabile Verbindung). Dieser Adapter pollt daher bewusst per HTTPS in konfigurierbarem Intervall (Default 5 Minuten) statt eine ungetestete Websocket-Verbindung vorzutäuschen.
- Es wurde ein **Rate-Limit-Code (`GY0429`)** beobachtet (u. a. in der Home-Assistant-Integration dokumentiert). Der Adapter erkennt diesen Code und pausiert automatisch (Default 5 Minuten Cool-down), statt das Konto durch wiederholte Anfragen zu gefährden.
- Nutzung erfolgt auf eigenes Risiko, siehe [LICENSE](https://github.com/bueste/ioBroker.goodwe-sems/blob/main/LICENSE) (MIT, ohne Gewährleistung).

**Von diesem Endpunkt nicht gelieferte Felder:** gegen eine echte Tages-Antwort verifiziert, liefert die von diesem Adapter genutzte `GetMonitorDetailByPowerstationId`-Gateway-Antwort weder einen Stations-Zeitstempel (`info.time`) noch Monats-Erzeugungs-/Einkommens-/Währungsfelder (`kpi.month_generation`, `kpi.day_income`, `kpi.total_income`, `kpi.currency`). Die entsprechenden States (`Station.PortalTimestamp`, `KPI.MonthGeneration`, `KPI.TodayIncome`, `KPI.TotalIncome`, `KPI.Currency`) werden daher bei keinem Konto und zu keiner Tageszeit erzeugt - das ist eine dauerhafte Lücke der Gateway-API selbst, keine vorübergehende Abwesenheit bei geringer Erzeugung. `Battery.*`- und `PowerFlow.*`-States werden nur erzeugt, wenn das Portal tatsächlich Batterie-/Leistungsfluss-Daten für die Anlage liefert (z. B. fehlt der `powerflow`-Schlüssel komplett bei Anlagen ohne Batterie).

## Installation

Sobald dieser Adapter im offiziellen ioBroker-Adapter-Repository gelistet ist, wird er ganz normal installiert: **Admin -> Adapter -> nach „goodwe-sems“ suchen -> installieren**.

Bis dahin kann ein ioBroker-Administrator ihn manuell auf dem ioBroker-Host hinzufügen:

```
iobroker url iobroker.goodwe-sems
```

## Konfiguration

| Feld | Beschreibung |
|---|---|
| SEMS-Konto / Passwort | Dieselben Zugangsdaten wie auf semsportal.com. Passwort wird von ioBroker verschlüsselt gespeichert. |
| Anlagen-ID (optional) | Leer lassen für automatische Erkennung (`GetPowerStationIdByOwner`). Bei mehreren Anlagen pro Konto: ID manuell aus der Portal-URL übernehmen (`.../powerstation/powerstatussnmin/<ID>`). |
| Poll-Intervall | Default 300 s. Der Adapter erzwingt ein Minimum von 60 s, unabhängig von der Konfiguration. |
| Pushover | Siehe [Pushover-Benachrichtigungen](#pushover-benachrichtigungen). |

## Objekt-/State-Struktur

```
goodwe-sems.0.info.connection              SEMS Portal erreichbar (bool)
goodwe-sems.0.info.lastSuccess             Zeitstempel letzter erfolgreicher Poll
goodwe-sems.0.info.lastError               Letzte Fehlermeldung
goodwe-sems.0.info.consecutiveErrors       Anzahl aufeinanderfolgender Fehlversuche
goodwe-sems.0.info.rateLimited             SEMS Portal limitiert aktuell (bool)
goodwe-sems.0.info.activePollInterval      Aktuell wirksames Intervall inkl. Backoff (s)
goodwe-sems.0.info.rawResponse             Rohe JSON-Antwort (nur wenn Debug-Option aktiv)

goodwe-sems.0.Station.Name / .Capacity / .Address / .Latitude / .Longitude / .PortalTimestamp / .Status / .StationId
goodwe-sems.0.KPI.CurrentPower / .TodayGeneration / .MonthGeneration / .TotalGeneration / .TodayIncome / .TotalIncome / .Currency
goodwe-sems.0.PowerFlow.PV / .Load / .Grid / .Battery / .LoadStatus / .GridStatus / .PvStatus / .BatteryStatus
goodwe-sems.0.Battery.SOC / .Status
goodwe-sems.0.EVCharger.*                  (nur wenn vom Portal gemeldet)

goodwe-sems.0.Inverters.<Seriennummer>.Name / .Model / .Status / .WarningCode
goodwe-sems.0.Inverters.<Seriennummer>.CurrentPower / .TodayGeneration / .TotalGeneration / .Temperature
goodwe-sems.0.Inverters.<Seriennummer>.PV1..4.Voltage / .Current
goodwe-sems.0.Inverters.<Seriennummer>.AC_L1..3.Voltage / .Current / .Frequency
goodwe-sems.0.Inverters.<Seriennummer>.Battery.SOC / .Voltage / .Current
```

Bei zwei Wechselrichtern (wie in der ursprünglichen Anforderung) entstehen automatisch zwei `Inverters.<SN>.*`-Zweige - die Anzahl ist nicht fest codiert, sondern richtet sich nach dem, was das Portal für das jeweilige Konto zurückliefert.

Felder, die das Portal liefert, aber dieser Adapter (noch) nicht kennt, gehen nicht verloren: Mit aktivierter Debug-Option landet die komplette Rohantwort in `info.rawResponse` (JSON), sodass sie inspiziert und bei Bedarf per PR ergänzt werden können.

## Fehlerbehandlung, Backoff und Rate-Limits

- Jeder Poll-Zyklus ist vollständig try/catch-abgesichert; ein einzelner Fehler kann die Polling-Schleife nicht dauerhaft stoppen.
- Fehlerklassen (`SemsAuthError`, `SemsRateLimitError`, `SemsNetworkError`, `SemsProtocolError`) steuern das Verhalten gezielt:
  - **Rate-Limit (`GY0429`)** → sofortige Pause (Default 300 s), `info.rateLimited = true`.
  - **Login-Fehler** → exponentielles Backoff (bis 1 h Deckel), damit falsche Zugangsdaten das Konto nicht zusätzlich belasten.
  - **Netzwerk-/Protokollfehler** → moderates Backoff.
- Nach konfigurierbar vielen aufeinanderfolgenden Fehlversuchen (Default 3) gilt die Anlage als „offline“ und es wird - falls aktiviert - eine Pushover-Meldung ausgelöst.
- Alles wird zusätzlich strukturiert ins ioBroker-Log geschrieben (`error`/`warn`/`debug` je nach Schweregrad).

## Pushover-Benachrichtigungen

Konfigurierbar in drei Modi:

1. **Über eine bestehende `ioBroker.pushover`-Instanz** (`sendTo`) - empfohlen, keine doppelte Zugangsdatenverwaltung.
2. **Direkt über die Pushover-API** (eigener User-Key + API-/App-Token, verschlüsselt gespeichert) - funktioniert auch ohne separate Pushover-Instanz.
3. **Beides gleichzeitig.**

Ausgelöst wird bei: SEMS-Login-Fehler, SEMS-Rate-Limit, länger andauerndem Ausfall, unerwartetem Adapterfehler - jeweils einzeln aktivierbar. Eine interne Sperrfrist (Default 1 h pro Kategorie) verhindert Spam bei andauernden Störungen.

## Sicherheit & Datenschutz

- SEMS-Passwort und Pushover-API-Token sind an der Wurzel von `io-package.json` als `encryptedNative`/`protectedNative` markiert und werden von ioBroker verschlüsselt abgelegt, nicht im Klartext geloggt (Kontoname wird in Log-Meldungen maskiert, z. B. `st***@gmail.com`).
- Der Adapter führt **ausschließlich lesende** Zugriffe aus (`GetMonitorDetailByPowerstationId`, `GetPowerStationIdByOwner`). Es gibt bewusst **keine** Fernsteuerungs-/Schreibfunktion (`SaveRemoteControlInverter`) - das wäre ein deutlich größeres Sicherheits- und Haftungsrisiko und war nicht Teil der Anforderung.
- Keine Drittanbieter-Abhängigkeiten für den HTTP-Zugriff: Es wird das in Node.js ≥22 eingebaute `fetch` verwendet statt einer zusätzlichen HTTP-Bibliothek - kleinere Angriffsfläche, weniger Supply-Chain-Risiko.
- Die vom Login-Server gelieferte API-Basis-URL wird validiert (nur HTTPS auf GoodWe-eigenen Domains), bevor sie für weitere Anfragen genutzt wird - eine manipulierte Login-Antwort kann das Session-Token dadurch nicht an einen fremden Host umleiten.
- Alle Netzwerkfehler werden typisiert abgefangen; es werden keine ungeprüften Daten aus der API-Antwort ausgeführt (`eval`, `Function`, o. ä. werden nirgends verwendet).

## Entwicklung

```
npm install
npm run lint
npm test          # Unit-Tests (lib/mapping.js, lib/semsApi.js, lib/notify.js) + Package-Konsistenz-Check
```

Empfehlung vor jedem Release zusätzlich lokal:

```
npx @iobroker/repochecker@latest .
```

Pull Requests willkommen, insbesondere um zusätzliche, vom Portal gelieferte Felder zu ergänzen (siehe `info.rawResponse` mit aktivierter Debug-Option) oder Übersetzungen zu verbessern.

## Changelog

<!--
    Platzhalter für die nächste Version (am Zeilenanfang):
    ### **WORK IN PROGRESS**
-->

### 1.0.0 (2026-07-22)

- (Stefan Bühler) Erstes stabiles Release: Der Adapter läuft seit mehreren Release-Zyklen zuverlässig mit der SEMS+-Gateway-API im produktiven Einsatz. Dieses Release enthält nur Metadaten-Änderungen - `common.news`-Übersetzungen für 0.1.15-0.1.19 korrigiert (einige Sprachen waren unübersetzte Kopien des englischen Texts - vom Repochecker als E1144 gemeldet), einen Buy-Me-a-Coffee-Link neben dem PayPal-Spenden-Badge ergänzt und Copyright-/Autoren-Metadaten vereinheitlicht. Keine funktionalen Änderungen.

### 0.1.19 (2026-07-20)

- (Stefan Bühler) Den klassischen, versionierten `GetMonitorDetailByPowerstationId`-Endpunkt (seit 0.1.14/0.1.15 als `/v3`, `/v2`, `/v1` versucht) komplett entfernt - GoodWe hat ihn abgeschaltet, jedes während der Entwicklung beobachtete Konto bekommt bei allen drei Versionen ausnahmslos 404. `getMonitorDetail()` ruft jetzt direkt die in 0.1.16 eingeführte SEMS+-Gateway-API auf, was jeden Poll-Zyklus schneller macht und unnötige, garantiert scheiternde Anfragen vermeidet
- (Stefan Bühler) Fix: Die Gateway-Session wurde nie automatisch erneuert, wenn sie serverseitig ablief - der Adapter erzeugt beim Start eine einzige, langlebige API-Client-Instanz und nutzt deren Session unbegrenzt weiter, und anders als der (jetzt entfernte) klassische Pfad hat der Gateway-Request-Helfer nie bei einer abgelaufenen Session neu eingeloggt. Das führte dazu, dass der Adapter nach einigen Stunden dauerhaft ausfiel (bestätigt an einem echten Konto: abends funktionierend, den gesamten nächsten Tag bei jedem einzelnen Poll-Zyklus fehlgeschlagen), bis er manuell neu gestartet wurde. Jeder Gateway-Aufruf loggt sich jetzt bei jedem Fehler automatisch einmalig neu ein und wiederholt den Aufruf, bevor aufgegeben wird
- (Stefan Bühler) 5 aktualisierte/neue Regressionstests (45 Unit-Tests insgesamt) für den vereinfachten direkten Gateway-Aufruf und das automatische Re-Login-und-Wiederholen-Verhalten (inklusive korrektem Aufgeben nach genau einem Versuch)

### 0.1.18 (2026-07-19)

- (Stefan Bühler) Fix: Der SEMS+-Login wurde trotz des Host-Fixes in 0.1.17 weiterhin mit `code=C0602 "account_login_abnormal"` abgelehnt, weil sich der Adapter als iOS-App ausgab (`User-Agent: PVMaster/...`, Token-`client: "ios"`) - der aufgerufene Endpunkt (`eu-semsplus.goodwe.com`) wird laut echtem Browser-Mitschnitt aber ausschließlich vom SEMS+-*Web*-Client genutzt, der `client: "semsPlusWeb"`, einen Browser-User-Agent sowie `Origin`/`Referer`-Header sendet. Der Login-Call baut jetzt eine eigene, passende Header-Identität nur für diesen einen Aufruf; alle anderen (klassischen/Legacy-)Endpunkte nutzen unverändert weiterhin die etablierte iOS-Identität
- (Stefan Bühler) 1 verschärfter Regressionstest, der die Client-Identität und Header des Login-Calls prüft

### 0.1.17 (2026-07-19)

- (Stefan Bühler) Fix: Der SEMS+-Login schlug für manche Konten fehl (`code=C0602 "account_login_abnormal"`), weil der Adapter den globalen Endpunkt (`semsplus.goodwe.com`) statt des EU-regionalen (`eu-semsplus.goodwe.com`) aufrief. Bestätigt durch einen echten Browser-HAR-Mitschnitt: derselbe Request-Body und Passwort-Hash war gegen den regionalen Host erfolgreich. Bewusst **ohne** Host-Fallback-Schleife umgesetzt - mehrere Login-Versuche mit denselben Zugangsdaten gegen verschiedene Hosts sehen für das Backend wie Credential-Stuffing aus und riskieren eine echte Kontosperre
- (Stefan Bühler) Der Login-Request sendet jetzt zusätzlich den `x-signature`-Header (exakt wie im echten Browser-Traffic), und ein echtes SEMS+-Session-Token wird von der in 0.1.16 eingeführten Gateway-API jetzt korrekt akzeptiert - zuvor bekam der Gateway-Fallback nur ein aus dem Legacy-CrossLogin abgeleitetes Token, das vom Gateway mit demselben C0602-Fehler abgelehnt wurde, da es keine echte SEMS+-Session ist
- (Stefan Bühler) 1 aktualisierter Regressionstest, der die exakte Login-URL und das Vorhandensein des Signatur-Headers beim Login prüft

### 0.1.16 (2026-07-19)

- (Stefan Bühler) Großer Fund: Manche Konten, deren SEMS+-Login abgelehnt wird und die auf die Legacy-CrossLogin-API zurückfallen, landen gar nicht auf dem klassischen `semsportal.com`-artigen Backend - sie bekommen eine Session für eine komplett andere, moderne Microservice-API ("SEMS+-Gateway", `eu-gateway.semsportal.com`). Das erklärt, warum `GetMonitorDetailByPowerstationId` unter keinem der in 0.1.14/0.1.15 versuchten Pfade (`v1`/`v2`/`v3`) je funktionieren konnte. Bestätigt durch einen echten Browser-HAR-Mitschnitt (`eu-semsplus.goodwe.com`), der die tatsächlich genutzten Endpunkte zeigt (`sems-plant/api/stations/...`, `sems-plant/api/equipments/<sn>/telemetry` usw.)
- (Stefan Bühler) Die Gateway-API verlangt zusätzlich einen berechneten `x-signature`-Header bei jedem Request, sonst wird er stillschweigend abgelehnt. Das Signatur-Schema (`base64(sha256(`${ts}@${uid}@${token}`) + "@" + ts)`) wurde empirisch aus ~230 echten Request/Response-Paaren rekonstruiert - 100 % Treffer, keine Ausnahmen
- (Stefan Bühler) `getMonitorDetail()` fällt jetzt automatisch auf diese Gateway-API zurück (Stations-Basisdaten, Geräteliste, Telemetrie/Telecounting pro Gerät), wenn alle drei klassischen Pfade 404 liefern, und wandelt das Ergebnis in dieselbe `info`/`kpi`/`inverter[]`-Struktur um, die der Rest des Adapters bereits erwartet - keine Änderungen in der Mapping-/State-Erzeugungs-Schicht nötig
- (Stefan Bühler) Bewusst konservative erste Version: Nur Felder mit gesichertem Einheiten-/Format-Nachweis werden befüllt (aktuelle Leistung, Tages-/Gesamtertrag, Wechselrichter-Werte für AC/PV/Temperatur); der stationsweite Leistungsfluss (PV/Verbrauch/Netz/Batterie) wird noch nicht befüllt, da alle bisherigen Mitschnitte nachts erfolgten und dafür ein leeres Objekt lieferten
- (Stefan Bühler) 2 neue Regressionstests (47 Unit-Tests insgesamt), darunter einer, der die tatsächliche Signaturberechnung gegen die echte, reverse-engineerte Formel verifiziert

### 0.1.15 (2026-07-19)

- (Stefan Bühler) Fix: Der v3→v2-Fallback aus 0.1.14 für `GetMonitorDetailByPowerstationId` reichte nicht aus - bei einem echten Konto lieferte das Legacy-Login-Backend `404 Route Not Found` für **beide** Pfade, `v2` und `v3`. Community-Referenzen widersprechen sich, welche Version korrekt ist (pygoodwe verwendet fest `v2`, ein separater Artikel von 2023 nutzt `v1`, unsere eigene Traffic-Analyse beobachtete `v3`) - `getMonitorDetail()` probiert jetzt alle drei Versionen der Reihe nach durch (`v3` → `v2` → `v1`) und nutzt die erste, die keinen 404 liefert
- (Stefan Bühler) Diagnose: Debug-Logs enthalten jetzt die vollständige Request-URL (inkl. aufgelöster API-Basis) statt nur des relativen Pfads, und der Login-Erfolgs-Log gibt jetzt ebenfalls die aufgelöste API-Basis aus - so lässt sich genau erkennen, welche Host+Pfad-Kombination fehlschlägt
- (Stefan Bühler) 2 aktualisierte/neue Regressionstests (45 Unit-Tests insgesamt) für den dreistufigen Versions-Fallback und den Fall, dass alle drei Pfade fehlschlagen

### 0.1.14 (2026-07-19)

- (Stefan Bühler) Fix: `GetMonitorDetailByPowerstationId` lieferte `404 Route Not Found` für Konten, deren SEMS+-Login abgelehnt wird (beobachtet: `code=C0602`) und die auf die Legacy-CrossLogin-API zurückfallen - dieses Backend stellt den Endpunkt unter dem `v2`-API-Pfad bereit, nicht `v3`. Root Cause gefunden anhand des Debug-Logs eines echten Kontos sowie der Referenzimplementierung [pygoodwe](https://github.com/yaleman/pygoodwe), deren rein-legacy-Client den `v2`-Pfad fest verdrahtet. `getMonitorDetail()` versucht jetzt zuerst `v3` und wiederholt bei erkanntem 404 automatisch einmal mit `v2` - beide Backend-Varianten funktionieren damit ohne jede Konfigurationsänderung durch den Nutzer
- (Stefan Bühler) Fix: Fehlermeldungen zeigen jetzt auch das `error_msg`-Feld der API an (wurde bisher stillschweigend verworfen, was selbst bei aussagekräftiger Fehlerbeschreibung in der Antwort nur zu einem nichtssagenden „unbekannter Fehler" führte)
- (Stefan Bühler) 2 neue Regressionstests (44 Unit-Tests gesamt) für den v3→v2-Fallback sowie den Fall, dass beide Pfade fehlschlagen

### 0.1.13 (2026-07-19)

- (Stefan Bühler) Diagnose: rohe JSON-Antwort jedes SEMS-API-Aufrufs wird jetzt auf Debug-Level geloggt, nicht mehr nur beim Monitor-Detail-Aufruf. Tests mit einem echten Konto zeigten eine Meldung `SEMS-API-Fehler: ... GetPowerStationIdByOwner ... unbekannter Fehler (code=undefined)` - die vom Adapter angenommene Erfolgs-/Fehler-Code-Konvention (`code: 0`/`"0"`/`"00000"`) wurde bisher nur gegen selbst geschriebene Testfixtures geprüft, nicht gegen diesen konkreten Endpunkt auf einem echten Konto. Dieses Logging ist der schnellste Weg, die tatsächliche Antwortstruktur zu sehen und den echten Fehler zu beheben, ohne dass Zugangsdaten von irgendjemandem benötigt werden

### 0.1.12 (2026-07-19)

Weitere Fixes aus einem Repochecker-Recheck der `ioBroker.repositories`-Listing-PR:

- (Stefan Bühler) **[E2004]** Eintrag `0.1.10` aus `common.news` in `io-package.json` entfernt - die CI dieser Version schlug vor dem Deploy-Schritt fehl, sie wurde also nie tatsächlich auf npm veröffentlicht
- (Stefan Bühler) **[S3014]** `needs: check-and-lint` beim `adapter-tests`-Job ergänzt, damit dieser erst nach erfolgreichem Linting läuft
- (Stefan Bühler) **[W0066]** `@types/node` auf `^22` fixiert (war das offene `>=22`, das auf eine neuere Major-Version mit unpassenden Typdefinitionen auflösen könnte)
- (Stefan Bühler) **[W4040]/[W4042]** JSON-Schema-Zuordnungen in `.vscode/settings.json` korrigiert: `fileMatch`-Einträge dürfen keinen führenden Slash haben, und das jsonConfig-Schema muss zusätzlich auf `admin/jsonCustom.json` und `admin/jsonTab.json` passen
- (Stefan Bühler) **[S8913]** `.github/workflows/automerge-dependabot.yml` (mit `iobroker-bot-orga/action-automerge-dependabot@v1`) und `.github/auto-merge.yml` ergänzt, damit Patch-Updates (und Minor-Updates bei Dev-Dependencies) von Dependabot automatisch gemerged werden

### 0.1.11 (2026-07-19)

- (Stefan Bühler) einen echten CI-Fehler aus 0.1.10 behoben: Node.js 20.x aus der `adapter-tests`-Matrix in `.github/workflows/test-and-release.yml` entfernt. Diese Version ist inkompatibel mit `engines.node >=22` (ebenfalls seit 0.1.10), sobald die offizielle `ioBroker/testing-action-adapter@v1`-Action `npm ci` mit aktiviertem `engine-strict` ausführt - das ließ diesen Matrix-Job abstürzen und brach per Fail-Fast alle anderen Jobs ab

### 0.1.10 (2026-07-19)

Zweite Runde von Fixes für weitere Befunde eines strengeren automatisierten `@iobroker/repochecker`-Rechecks der `ioBroker.repositories`-Listing-PR:

- (Stefan Bühler) **[W0028]** `engines.node` auf `>=22` angehoben
- (Stefan Bühler) **[W0063]** `chai`, `chai-as-promised`, `mocha`, `sinon` aus devDependencies entfernt (bereits in `@iobroker/testing` enthalten)
- (Stefan Bühler) **[S0065]/[S0085]/[S0087]** `@types/node`, `@tsconfig/node22` und `/tsconfig.json` für Editor-Typprüfung ergänzt
- (Stefan Bühler) **[S5026]** Release-Plugin `@alcalzone/release-script-plugin-manual-review` ergänzt
- (Stefan Bühler) **[W3013]/[W3015]/[W3017]** `.github/workflows/test-and-release.yml` neu geschrieben: nutzt jetzt die offiziellen geteilten Actions `ioBroker/testing-action-check@v1`, `ioBroker/testing-action-adapter@v1` und `ioBroker/testing-action-deploy@v1` statt handgeschriebener Steps
- (Stefan Bühler) `test/integration.js` ergänzt (Adapter-Start-Smoke-Test über den Integrations-Harness von `@iobroker/testing`), damit `npm run test:integration` erfolgreich läuft
- (Stefan Bühler) **[E1032]** `common.news` in `io-package.json` auf die vom Repository-Builder verwendeten 7 Einträge gekürzt
- (Stefan Bühler) **[E5512]** fehlende Pflicht-Eigenschaft `size` beim Pushover-Abschnitts-Header in `admin/jsonConfig.json` ergänzt
- (Stefan Bühler) **[S5601]** `admin/i18n` vom langen `{lang}/translations.json`-Format auf das kurze `{lang}.json`-Format migriert
- (Stefan Bühler) **[S4036]** `.vscode/settings.json` mit JSON-Schema-Zuordnungen für `io-package.json` und `admin/jsonConfig.json` ergänzt
- (Stefan Bühler) **[S8901]** `.github/dependabot.yml` ergänzt (npm + github-actions, wöchentlich, mit Cooldown und einer Ignore-Regel für Major-/Minor-Updates von `@types/node`)

### 0.1.9 (2026-07-19)

Behebt die strengeren Befunde des automatisierten `@iobroker/repochecker`, die bei der `ioBroker.repositories`-Listing-PR aufgetreten sind:

- (Stefan Bühler) **[E1057]** `encryptedNative`/`protectedNative` von `common` an die Wurzel von `io-package.json` verschoben, entsprechend dem aktuellen Schema
- (Stefan Bühler) **[E3009]/[E3010]/[E3011]/[E3012]** `engines.node` auf `>=20`, `@iobroker/adapter-core` auf `^3.4.1`, die `js-controller`-Abhängigkeit auf `>=6.0.11`, die `admin`-GlobalDependency auf `>=7.6.20` angehoben
- (Stefan Bühler) **[E3040]** devDependencies aktualisiert (`@iobroker/adapter-dev`, `@iobroker/testing`, mocha, esbuild u. a.) auf aktuelle Major-Versionen
- (Stefan Bühler) **[E3000er-Serie]** `.github/workflows/test-and-release.yml` auf das aktuelle offizielle Template umgestellt: Jobs umbenannt (`check-and-lint`, `adapter-tests`, `adapter-check`, `deploy`), volle OS/Node-Testmatrix (ubuntu/windows/macos x 20/22/24), `concurrency`-Gruppe, Deploy-Job auf Node 24 fixiert
- (Stefan Bühler) **[E5005]** globale `setTimeout`/`clearTimeout` durch adapter-verwaltete Timer (`adapter.setTimeout`/`adapter.clearTimeout`) in `lib/notify.js` und `lib/semsApi.js` ersetzt
- (Stefan Bühler) **[E5043]** auf `require("node:crypto")` umgestellt
- (Stefan Bühler) **[E5507]/[E5510]/[E5512]/[E5612]** `admin/jsonConfig.json` korrigiert: fehlende `lg`/`xl`-Responsive-Größen bei allen Items ergänzt, einen literalen Label-String durch einen echten i18n-Key ersetzt (`loginTab`, in allen 11 Übersetzungsdateien ergänzt)
- (Stefan Bühler) **[E6004]/[E6015]/[W0037]/[W0076]** `README.md` ins Englische übersetzt (Pflichtsprache), bisherigen deutschen Inhalt nach `README.de.md` verschoben, `CHANGELOG_OLD.md` für ältere Einträge ergänzt
- (Stefan Bühler) **[W9501]** überflüssige `.npmignore` entfernt (durch `files` in package.json ersetzt)
- (Stefan Bühler) **[E9006]** `.commitinfo` zur `.gitignore` ergänzt
- (Stefan Bühler) **[S4036]/[S5026]** `prettier.config.mjs` ergänzt, Codebasis neu formatiert, `jsdoc/reject-any-type` für den opaken Node-Timer-Handle-Typ mit begründendem Kommentar deaktiviert

### 0.1.8 (2026-07-19)

ioBroker-Adapter-Check-Befunde behoben:

- (Stefan Bühler) **[E254]** News-Einträge für 0.1.1/0.1.2 entfernt - diese Tags wurden zwar gepusht, aber der zugehörige npm-Publish-Job schlug damals fehl (fehlendes NPM_TOKEN bzw. zu alte npm-CLI für OIDC), die Versionen existieren nie auf npm
- (Stefan Bühler) **[W132]** dadurch automatisch unter dem 7-Einträge-Limit des Repository-Builders für `common.news`
- (Stefan Bühler) **[W184]** veraltetes `common.title` entfernt (durch `common.titleLang` ersetzt) und veraltetes/ignoriertes `common.main` entfernt (Entry-Point kommt aus `package.json`)
- (Stefan Bühler) **[W034]** `@iobroker/adapter-core` von ^3.1.6 auf ^3.2.2 angehoben
- (Stefan Bühler) **[W173]/[W174]/[E999]/[W401]**: `password` ist bereits korrekt in `encryptedNative`/`protectedNative` gelistet (per Tarball-Inspektion verifiziert) - diese Meldungen sowie der globale Axios-404-Fehler beim Abruf von `sources-dist-latest.json` sind Nebenwirkungen davon, dass der Adapter noch nicht im offiziellen ioBroker-Repository gelistet war

### 0.1.7 (2026-07-19)

- (Stefan Bühler) Branding: Platzhalter-Icon durch das offizielle GoodWe-Logo ersetzt (mit Genehmigung von GoodWe verwendet)

### 0.1.6 (2026-07-18)

- (Stefan Bühler) Dev-Toolchain aktualisiert: mocha 11, sinon 22, @alcalzone/release-script 5, @iobroker/eslint-config 2; verbleibende transitive CVEs (adm-zip, diff, esbuild, serialize-javascript) per npm-`overrides` erzwungen behoben - `npm audit`: 0 Schwachstellen (auch inkl. Dev-Dependencies)

Sicherheits-/Qualitätsaudit (Security-Tester, Maintainer-Review, Fuzzing der Mapping-Schicht):

- (Stefan Bühler) **Security:** Wechselrichter-Seriennummern aus der (nicht vertrauenswürdigen) Portal-Antwort werden bereinigt, bevor sie Teil von ioBroker-Objekt-IDs werden (verhindert kaputte/unerwartet verschachtelte Objektbäume durch Sonderzeichen wie `.` `*` `]`)
- (Stefan Bühler) **Security:** die vom Login-Server gelieferte API-Basis-URL wird validiert - nur HTTPS auf GoodWe-eigenen Domains (`*.semsportal.com`, `*.goodwe.com`), sonst Fallback auf die bekannte Regional-URL. Eine manipulierte Login-Antwort kann das Session-Token damit nicht mehr an fremde Hosts umleiten
- (Stefan Bühler) **Fix:** `null`/defekte Einträge im `inverter[]`-Array des Portals ließen den kompletten Poll-Zyklus abstürzen - werden jetzt übersprungen, gesunde Wechselrichter derselben Antwort werden weiter verarbeitet
- (Stefan Bühler) **Fix:** Zahlen in Exponentialschreibweise (`"1e5"`) wurden falsch geparst (ergab 15 statt 100000)
- (Stefan Bühler) **Fix:** offensichtlich ungültige Portal-Zeitstempel (`99/99/9999 …`) erzeugten durch JS-Date-Rollover absurde Epochen-Werte - werden jetzt verworfen
- (Stefan Bühler) **Fix:** automatische Anlagen-Erkennung filtert Einträge ohne verwertbare ID (verhinderte sonst dauerhafte Fehlzyklen)
- (Stefan Bühler) **Robustheit:** keine State-Writes mehr nach Adapter-Unload; `adapterError`-Dedupe wird nach Erholung ebenfalls zurückgesetzt
- (Stefan Bühler) 14 neue Regressionstests (42 Unit-Tests gesamt); `npm audit`: 0 Schwachstellen in Produktions-Dependencies (verbleibende betreffen ausschließlich Dev-Toolchain)

### 0.1.5 (2026-07-18)

- (Stefan Bühler) fix: PayPal-Spendenlink im README korrigiert (Button-Link statt Donate-Link)

Ältere Changelog-Einträge stehen in CHANGELOG_OLD.md (Englisch).

## Lizenz

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