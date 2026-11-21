---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.unifi/README.md
title: ioBroker.unifi
hash: fOohMvM9rkBsyLDQRL76oFAhiZ1eoEWkgJUzh9nehew=
---
![Anzahl der Installationen](https://iobroker.live/badges/unifi-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.unifi.svg)
![Test und Freigabe](https://github.com/iobroker-community-adapters/ioBroker.unifi/workflows/Test%20and%20Release/badge.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/unifi/svg-badge.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.unifi.svg)

<img height="100px" src="admin/unifi.svg" align="left"><br/>

# ioBroker.unifi

> \[!IMPORTANT] Dieser Adapter kann nicht von GitHub installiert werden.

Dieser Adapter zeigt Ihr [UniFi-Netzwerk](https://ui.com/) in ioBroker an: welche Geräte online sind, wie es um Ihr UniFi-Gateway, Ihre Switches und Access Points bestellt ist, wie hoch Ihr Internet-Traffic ist und vieles mehr. Einige Einstellungen lassen sich ebenfalls über ioBroker vornehmen, z. B. WLANs, PoE-Ports, die LEDs der Geräte, das Blockieren von Clients oder das Erstellen von Gastzugängen.

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Anforderungen

- Eine UniFi-Konsole mit UniFi OS (UDM, UDM-Pro, UDM-SE, UCG, UX, Cloud Key Gen2+, UniFi OS Server) oder eine selbstgehostete UniFi Network-Anwendung
- Ein **API-Schlüssel** (nur UniFi OS, empfohlen) oder ein **lokaler Konsolenbenutzer** . Cloud-Konten von ui.com können nicht verwendet werden: Sie erfordern MFA, die Anmeldung schlägt fehl mit `MFA_AUTH_REQUIRED` Die

## Aufstellen

1. **API-Schlüssel erstellen** (empfohlen): Öffnen Sie die UniFi Network-Anwendung → **Integrationen** (in Network 11 in der linken Navigation, zuvor unter Einstellungen → Steuerungsebene → Integrationen) → **Neuen API-Schlüssel erstellen** . Kopieren Sie den Schlüssel; er wird nur einmal angezeigt. _Ohne UniFi OS oder falls Sie einen Benutzer bevorzugen:_ Erstellen Sie einen Benutzer in der Konsole unter „Administratoren & Benutzer“ mit **folgenden Zugriffsrechten: „Nur lokaler Zugriff“** und „Zugriff auf UniFi Network“: „Volle Verwaltung“ zum Umschalten von Einstellungen oder „Nur Anzeige“ zum Lesen.
2. **Installieren Sie den Adapter** in ioBroker (Adapter → UniFi) und öffnen Sie die Einstellungen der Instanz.
3. Registerkarte **Allgemein** :
   - **IP-Adresse** der Konsole, z. B. `192.168.1.1` Lassen Sie den **Port** für UniFi OS-Konsolen leer; eine selbstgehostete Anwendung verwendet normalerweise `8443` Die
   - **Authentifizierung** : _API-Schlüssel (_ Schlüssel einfügen) oder _lokaler Benutzer_ mit Benutzername und Passwort.
   - **Die Option „SSL-Zertifikatfehler ignorieren“** sollte aktiviert bleiben: Die Konsolen verwenden ein selbstsigniertes Zertifikat.
   - Das **Aktualisierungsintervall** von 60 Sekunden ist für die meisten Netzwerke geeignet.
4. Aktivieren Sie in den anderen Registerkarten die benötigten Optionen (siehe unten) und **speichern Sie** . Nach etwa einer Minute werden die Daten in den Objekten unter „Objekte“ angezeigt. `unifi.0` Die

`info.connection` zeigt an, ob der Adapter angeschlossen ist; die Instanz ist dann grün.

## Einstellungen

| Tab             | Was Sie erhalten                                                                                                                              | Empfehlung                                                                     |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Allgemein       | Verbindungs- und Aktualisierungsintervall                                                                                                     | API-Schlüssel, 60 Sekunden                                                     |
| Sysinfo         | Versions- und Aktualisierungsstatus der UniFi Network-Anwendung                                                                               | An                                                                             |
| Kunden          | Alle Geräte in Ihrem Netzwerk: Name, IP-Adresse, Online-Status, WLAN-Status, Signalstärke; blockieren/wiederherstellen                        | An                                                                             |
| Geräte          | Gateways, Switches, Zugangspunkte: Status, Firmware, Temperaturen, Ports mit PoE, Internetverbindungen (`wan1`, `wan2`); Neustart, PoE, LEDs | An                                                                             |
| WLANs           | Ihre drahtlosen Netzwerke; schalten Sie sie ein und aus                                                                                       | An                                                                             |
| Netzwerke       | Netzwerke und VLANs mit ihren Einstellungen                                                                                                   | nach Bedarf                                                                    |
| Gesundheit      | Gesamtstatus von Internet, LAN, WLAN und VPN                                                                                                  | An                                                                             |
| Gutscheine      | Gästegutscheine des Hotspots; neue erstellen                                                                                                  | nur mit Hotspot                                                                |
| Alarm           | Alarmmeldungen                                                                                                                                | Ab UniFi Network 10 und neueren Versionen **deaktiviert** (keine Alarme mehr). |
| DPI             | Datenverkehr pro Anwendung und Kategorie                                                                                                      | Bei Bedarf wird ein Gateway mit Verkehrserkennung benötigt.                    |
| Gateway-Verkehr | Verkehrsaufkommen pro Tag älterer Gateways                                                                                                    | **Ab** UniFi Network 11, WAN verwenden.                                        |
| WAN             | Internetverkehr heute / gestern / monatlich, Anbieter, Verfügbarkeit, Geschwindigkeitstest                                                    | weiter mit UniFi Network 11 und neueren                                        |

**Filterobjekte:** Einträge von Objekten, die nicht erstellt werden sollen. Clients: Name, Hostname, IP- oder MAC-Adresse; die Liste kann auch umgekehrt verwendet werden, um nur die zu erstellenden Clients anzugeben. Geräte: Name, IP- oder MAC-Adresse. WLANs: Name (SSID). Netzwerke: Name. Status: Subsystem, z. B. `wan`, `www`, `lan`, `wlan`, `vpn` Die

**Filterzustände:** Es werden nur die ausgewählten Zustände erstellt; ist nichts ausgewählt, werden alle Zustände erstellt. Neue Instanzen beginnen mit einer empfohlenen Auswahl für Clients und Geräte, sodass die Objektstruktur übersichtlich bleibt. Zustände, die von einem ausgewählten Zustand benötigt werden, werden automatisch hinzugefügt, z. B. `last_seen_by_uap` /`last_seen_by_usw` für `is_online` Die

## Was Sie erhalten

| Ordner                              | Inhalt                                                                                                                                                                                                            |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `unifi.0.<site>.sysinfo`            | Version, Update verfügbar                                                                                                                                                                                         |
| `unifi.0.<site>.clients.<mac>`      | ein Ordner pro Kunde: `name`, `ip`, `is_online`, `essid`, `signal`, `last_seen`, aktueller Verkehr (`tx_bytes-r` /`rx_bytes-r`, verkabelt: `wired-…`), WLAN-Verbindungsgeschwindigkeit (`tx_rate` /`rx_rate`) … |
| `unifi.0.<site>.devices.<mac>`      | ein Ordner pro UniFi-Gerät: `state`, `version`, `upgradable`, `uptime`, Temperaturen, `port_table` (Anschlüsse, PoE), `wan1` /`wan2` (Internetverbindungen des Gateways) …                                          |
| `unifi.0.<site>.wlans.<name>`       | ein Ordner pro WLAN, `enabled`                                                                                                                                                                                    |
| `unifi.0.<site>.networks.<name>`    | ein Ordner pro Netzwerk                                                                                                                                                                                           |
| `unifi.0.<site>.health.<subsystem>` | `wan`, `lan`, `wlan`, `vpn`, `www` mit `status`                                                                                                                                                                    |
| `unifi.0.<site>.wan.<connection>`   | Verkehrs-, Anbieter-, Verfügbarkeits- und Geschwindigkeitstest jeder Internetverbindung                                                                                                                           |
| `unifi.0.<site>.vouchers`           | Gutscheine und der Knopf `create_vouchers`                                                                                                                                                                        |
| `unifi.0.info`                      | Verbindung und Status der letzten Aktualisierung (siehe Fehlerbehebung)                                                                                                                                           |

`<site>` ist der Name des UniFi-Standorts, normalerweise `default` Alle Zustände verfügen über die entsprechende ioBroker-Rolle und werden daher von Visualisierungen und Assistenten erkannt.

### Internetverbindungen (WAN)

Bei einem Gateway (z. B. UDM-Pro, UCG, USG) erhält jede Internetverbindung einen eigenen Ordner unterhalb des Geräts: `wan1`, Und `wan2` Wenn eine zweite Verbindung hergestellt wird, werden die öffentliche IPv4-Adresse, die IPv6-Adressen, der Verbindungsstatus, die Portnummer am Gateway, die Verbindungsgeschwindigkeit sowie, während der Verbindung, die Latenz und die Verfügbarkeit angezeigt.

### WAN-Statistiken (UniFi Network 11 und neuer)

UniFi Network 11 hat auf eine neue Statistik-Engine umgestellt und den Statistikverlauf gelöscht; der Gateway-Bericht wurde verwendet für `gateway_traffic` Seitdem werden keine Daten mehr zurückgegeben. Die Einstellung **„WAN-Statistiken aktualisieren“** liest stattdessen die Daten des Dashboards der Netzwerkanwendung und erstellt daraus Daten. `<site>.wan.<connection>` für jede Internetverbindung (`WAN`, `WAN2`, …):

| Zustand                                                                         | Inhalt                                                            |
| ------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `today_rx_bytes`, `today_tx_bytes`                                              | Empfangen/gesendet seit Mitternacht (Ortszeit des ioBroker-Hosts) |
| `yesterday_rx_bytes`, `yesterday_tx_bytes`                                      | gestern empfangen/gesendet                                        |
| `last24h_rx_bytes`, `last24h_tx_bytes`                                          | In den letzten 24 Stunden empfangen/gesendet                      |
| `monthly_bytes`                                                                 | Datenverkehr des laufenden Monats, wie von der Konsole gezählt.   |
| `rx_rate`, `tx_rate`                                                            | aktuelle Datenraten in Byte pro Sekunde                           |
| `up`, `active`, `interface`, `uptime`                                           | Verbindungsstatus, Verfügbarkeit in %                             |
| `latency`, `packet_loss`                                                        | der letzten Stunde                                                |
| `isp_name`, `isp_asn`, `capacity_download`, `capacity_upload`                   | Anbieter und seine Bandbreite in Mbit/s                           |
| `speedtest_download`, `speedtest_upload`, `speedtest_latency`, `speedtest_time` | letzter Geschwindigkeitstest der Konsole                          |

Die Verkehrswerte werden aus den stündlichen Werten der Konsole summiert und sind daher auf etwa eine Stunde genau. Ein Wert bleibt leer (`null`) solange die Konsole für das gesamte Intervall keine Daten enthält, z. B. `yesterday_*` Am Tag des Updates auf UniFi Network 11. Controller ohne dieses Dashboard werden nach einer Warnung übersprungen.

## Kontrolle

| Zustand                                              | Aktion                                                                                             |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `wlans.<name>.enabled`                               | Schalten Sie das WLAN ein (`true`) oder aus (`false` Die Zugriffspunkte benötigen einige Sekunden |
| `clients.<mac>.blocked`                              | Block (`true`) oder entsperren (`false`) ein Client, drahtlos oder kabelgebunden                 |
| `clients.<mac>.reconnect`                            | Schaltfläche: Trennt die Verbindung eines drahtlosen Clients, damit er sich erneut verbindet.      |
| `devices.<mac>.restart`                              | Taste: Gerät neu starten                                                                           |
| `devices.<mac>.led_override`                         | LEDs `on`, `off` oder `default` (Einrichtung des Standorts)                                          |
| `devices.<mac>.port_table.port_<n>.port_poe_enabled` | Schalten Sie PoE des Ports ein oder aus.                                                           |
| `devices.<mac>.port_table.port_<n>.port_poe_cycle`   | Taste: Schaltet PoE aus und wieder ein, z. B. um eine Kamera neu zu starten.                       |
| `vouchers.create_vouchers`                           | Schaltfläche: Gutscheine mit den Einstellungen des Tabs „Gutscheine“ erstellen.                    |
| `unifi.0.trigger_update`                             | Schaltfläche: Daten jetzt lesen                                                                    |

Für den Wechsel wird ein API-Schlüssel oder ein lokaler Benutzer mit vollständiger Verwaltung des UniFi-Netzwerks benötigt.

## Fehlerbehebung

| Zustand                      | Bedeutung                                                                                                                          |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `info.connection`            | `true` während die Konsole antwortet                                                                                               |
| `info.lastSuccessfulRefresh` | Zeitpunkt der letzten vollständigen Aktualisierung                                                                                 |
| `info.lastError`             | letzte Fehlermeldung, leer lassen, wenn alles in Ordnung ist                                                                       |
| `info.consecutiveErrors`     | Mehrere Aktualisierungen hintereinander fehlgeschlagen; nach Fehlern wartet der Adapter etwas länger, bevor er es erneut versucht. |

| Meldung im Protokoll                                                   | Was zu tun                                                                                                                                                                                                                                                                                                  |
| ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Incorrect username or password`                                       | Benutzername und Passwort prüfen; der Benutzer muss ein lokaler Benutzer sein.                                                                                                                                                                                                                              |
| `The API key was rejected`                                             | Der Schlüssel ist ungültig, abgelaufen oder gelöscht: Erstellen Sie einen neuen in UniFi Network → Integrationen.                                                                                                                                                                                           |
| `The UniFi console blocks the login of the local user`                 | Zu viele Anmeldungen, z. B. weil derselbe Benutzer von anderen Systemen verwendet wird. Der Adapter versucht es nach 15 Minuten erneut. Ein API-Schlüssel verhindert dies.                                                                                                                                  |
| `not available right now`                                              | Die Netzwerkanwendung der Konsole wird neu gestartet, z. B. während eines Updates. Der Adapter läuft nach einigen Minuten von selbst weiter; nur `still not available` benötigt Aufmerksamkeit.                                                                                                              |
| `cannot be reached`, `refused the connection`, `closed the connection` | Die Konsole oder das Netzwerk war kurzzeitig nicht erreichbar (Neustart, Aktualisierung); beim nächsten Aktualisieren wiederholt sich das Problem. Überprüfen Sie direkt nach dem Start oder bei jeder Wiederholung die IP-Adresse und den Port sowie die Erreichbarkeit der Konsole vom ioBroker-Host aus. |
| `did not answer within 10 s`                                           | Die Konsole war kurzzeitig ausgelastet; beim nächsten Aktualisieren wird die Meldung wiederholt. Nur wiederholte Meldungen erfordern Aufmerksamkeit.                                                                                                                                                        |
| `no gateway statistics`                                                | UniFi Network 11 und neuer: _Gateway-Verkehr_ deaktivieren und _WAN_ aktivieren.                                                                                                                                                                                                                            |

## Bekannte Probleme

- Der `is_wired` Der Status der Clients ist fehlerhaft, nachdem ein Client offline gegangen ist. Dies ist ein bekanntes Problem des UniFi Controllers (siehe <https://community.ui.com/questions/Wireless-clients-shown-as-wired-clients/49d49818-4dab-473a-ba7f-d51bc4c067d1> ).
- Die UniFi-Konsole sperrt einen lokalen Benutzer nach zu vielen Anmeldeversuchen vorübergehend. Der Adapter wartet 15 Minuten, bevor er es erneut versucht; für einen API-Schlüssel ist keine Anmeldung erforderlich.
- UniFi Network 10 und neuere Versionen bieten keine Alarme mehr an; schalten Sie diese in den Einstellungen aus.

<details>
<summary>For developers: API endpoints</summary>

Nicht alle API-Daten werden in ioBroker gespiegelt. Um die Rohdaten einzusehen, öffnen Sie diese URLs im Browser, während Sie in der Konsole angemeldet sind (ersetzen Sie \<URL> durch \<URL>). `IP` Und `SITE` Eine selbstgehostete Anwendung hat keine `/proxy/network` und benötigt den Port, z.B. `https://IP:8443/api/s/SITE/stat/sta`):

| Information         | URL                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------ |
| Websites            | `https://IP/proxy/network/api/self/sites`                                            |
| Systeminformationen | `https://IP/proxy/network/api/s/SITE/stat/sysinfo`                                   |
| Kunden              | `https://IP/proxy/network/api/s/SITE/stat/sta`                                       |
| Geräte              | `https://IP/proxy/network/api/s/SITE/stat/device`                                    |
| WLANs               | `https://IP/proxy/network/api/s/SITE/rest/wlanconf`                                  |
| Netzwerke           | `https://IP/proxy/network/api/s/SITE/rest/networkconf`                               |
| Gesundheit          | `https://IP/proxy/network/api/s/SITE/stat/health`                                    |
| Gutscheine          | `https://IP/proxy/network/api/s/SITE/stat/voucher`                                   |
| DPI                 | `https://IP/proxy/network/api/s/SITE/stat/dpi`                                       |
| WAN-Statistiken     | `https://IP/proxy/network/v2/api/site/SITE/aggregated-dashboard?historySeconds=3600` |

</details>

## Referenzen

Dieser Adapter nutzt Funktionen der folgenden Drittanbieter-Node.js-Module:

- [json-logic-js](https://github.com/jwadhams/json-logic-js)

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (@Schimi1983) Clients: current traffic per second (`tx_bytes-r`, `rx_bytes-r`, wired `wired-tx_bytes-r`, `wired-rx_bytes-r`), WLAN link speed in Mbit/s (`tx_rate`, `rx_rate`) and `powersave_enabled` (#71, #531)
- (@Schimi1983) Short network errors (console not reachable, connection refused or closed) after a successful refresh are a warning in plain text instead of an error; an error right after the start (wrong IP address or port) or after 3 failed refreshes in a row
- (@Schimi1983) While the UniFi Network application restarts (e.g. during an update, HTTP 502/503/504) a warning instead of an error with stack; an error only after 3 failed refreshes in a row

### 2.0.0 (2026-11-08)
- (@GermanBluefox) **Breaking change:** 16 states store numbers or booleans instead of text now (PoE power/voltage/current, load average, CPU / memory / uptime of `system-stats`, port settings speed and rates, voucher duration; `full_duplex`, `isolation`, `autoneg` and `stp_port_mode` of the port settings are true/false). History adapters may reject the new type for an existing series (InfluxDB: field type conflict), and scripts that compare these states with text (e.g. `=== 'true'`) have to be adjusted. The object IDs do not change
- (@Schimi1983) Repository checker: `sinon` comes with `@iobroker/testing`, news of versions that are not on npm removed, line breaks of the copyright lines
- (@Schimi1983) Gateway traffic: with UniFi Network 11 and newer (no gateway statistics anymore) the request is skipped after one message until the next start. With the WAN statistics switched on it is only an info, without them a warning that tells which settings to change
- (@Schimi1983) Login of the local user blocked by the UniFi console (account locked, login limit): a clear message instead of the raw answer, and the next attempt only after 15 minutes, so the block is not extended
- (@Schimi1983) Internal errors of the controller (HTTP 500) are logged in one short line instead of the whole HTML page
- (@Schimi1983) A single timeout of the controller is a warning without stack (the next refresh repeats the request), only from 3 failed refreshes in a row an error
- (@Schimi1983) README and settings page for beginners: setup step by step, every tab explained with a recommendation, overview of the folders, control and troubleshooting tables, the API endpoints moved to a section for developers; short explanations on every tab of the settings in 11 languages
- (@Schimi1983) All states have a specific ioBroker role (e.g. `info.ip`, `info.mac`, `indicator.reachable`, `value.temperature`, `switch.enable`, `date`) instead of the generic `state`, so visualizations and assistants recognize them
- (@Schimi1983) Unified units (`B`, `B/s`, `Mbit/s`, `kbit/s`, `min`), numbers are stored as numbers (PoE power/voltage/current, load, CPU, memory, uptime of the devices, voucher duration), and the port settings full duplex, isolation, auto negotiation and spanning tree as true/false
- (@Schimi1983) `rssi` of the clients is the signal-to-noise ratio in dB (unit was dBm)
- (@Schimi1983) Readable names for all folders (e.g. "Ports", "Radios", "Speed test") in 11 languages, the site gets its name from the controller
- (@Schimi1983) New instances: recommended selection of client and device states, alarms off (UniFi Network 10 and newer has no alarms)
- (@hdering) Endpoints removed in newer UniFi Network versions (e.g. alarms, 404 `api.err.NotFound`) are logged once as a warning and skipped instead of logging an error on every refresh
- (@hdering) Added a hint to the settings that a local UniFi OS user or an API key is required, as UI.com accounts require MFA
- (@hdering) A login rejected with `MFA_AUTH_REQUIRED` (UI.com account) is explained in the log instead of logging the response with the MFA cookie
- (@GermanBluefox) Settings: the hint of the object filter names what each tab really filters (clients, devices, WLANs, networks, health), and a separate hint for the client whitelist

### 1.2.1 (2026-11-04)
- (@GermanBluefox) WAN statistics: traffic was counted several times if the history had a gap at its start (e.g. the gateway was offline)

### 1.2.0 (2026-11-04)
- (@Schimi1983) The `blocked` state is created for wired clients too, with role `switch` [#760]
- (@Schimi1983) Gateways: IPv4 and IPv6 addresses, status, port, link speed, latency and availability of every internet connection (`wan1`, `wan2`) [#696]

### 1.1.0 (2026-11-04)
- (@Schimi1983) Authentication with an API key (UniFi OS), as alternative to the local user
- (@Schimi1983) node-unifi was replaced by an own client without dependencies (no axios with known vulnerabilities, one request less per call)
- (@Schimi1983) The session of the local user is ended when the adapter stops
- (@Schimi1983) The default port is empty (UniFi OS) and `common.dataSource` is `poll`
- (@Schimi1983) WAN statistics for UniFi Network 11 and newer: traffic today, yesterday and in the last 24 hours, monthly traffic, state, availability, latency, provider and last speed test of every internet connection [#696]
- (@Schimi1983) Warning when the controller returns no gateway statistics (UniFi Network 11 cleared them)

### 1.0.3 (2026-11-03)
- (@Schimi1983) Settings page: size attributes for all fields of the tabs, as required by the repository checker (W5507)
- (@Schimi1983) Fixed the `blocked` state of the clients: it was not updated when all states were selected (empty states filter), and with several sites the refresh of one site reset the blocked clients of the others
- (@Schimi1983) Fixed commands (restart, LED, PoE, block, ...) failing before the first refresh or after an expired session [#725]
- (@Schimi1983) Switching PoE creates the missing override of a port instead of failing [#658]

## License
The MIT License (MIT)

Copyright (c) 2024-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2016-2023 Jens Maus &lt;mail@jens-maus.de&gt;  
Copyright (c) 2020 braindead1 &lt;os.braindead1@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.