---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.unifi/README.md
title: ioBroker.unifi
hash: TTW2nHsM7XdfqKl3Pj83+8zqiccTDN6PF2+tYNSbctA=
---
![Anzahl der Installationen](http://iobroker.live/badges/unifi-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.unifi.svg)
![Test und Freigabe](https://github.com/iobroker-community-adapters/ioBroker.unifi/workflows/Test%20and%20Release/badge.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/unifi/svg-badge.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.unifi.svg)

<img height="100px" src="admin/unifi.svg" align="left"><br/>

# ioBroker.unifi

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

Dieser ioBroker-Adapter ermöglicht die Überwachung und eingeschränkte Steuerung von [UniFi-Geräten](http://www.ubnt.com/) , wie z. B. UniFi WiFi Access Points, mithilfe der öffentlichen UniFi Controller Web-API.

## Konfiguration

### Mindestens erforderliche Informationen

Um diesen Adapter in Betrieb zu nehmen, werden folgende Informationen benötigt:

- IP-Adresse und Port Ihres UniFi-Controllers (Lassen Sie das Portfeld leer, falls Ihr Controller unter UniFiOS läuft (z. B. UDM-Pro)).
- Lokaler Benutzername und lokales Passwort (2FA wird **nicht** unterstützt)
- Aktualisierungsintervall

Die Informationen werden standardmäßig alle 60 Sekunden aktualisiert. Abhängig von Ihrer ioBroker-Hardware und der Größe Ihres Netzwerks (Anzahl der Clients, UniFi-Geräte usw.) wird empfohlen, dieses Intervall beizubehalten und nicht weiter zu verringern.

### Filterobjekte

Der Adapter aktualisiert so viele Informationen wie möglich von Ihrem UniFi-Controller, bietet aber auch die Möglichkeit, die aktualisierten Informationen einzuschränken.

Es ist möglich, die Aktualisierung ausgewählter Informationen zu deaktivieren oder bestimmte Objekte dieser Informationen zu filtern.

| Information | Objekte, die nach folgenden Kriterien gefiltert werden können: |
| ----------- | -------------------------------------------------------------- |
| Kunden      | Name, Hostname, IP-Adresse, MAC-Adresse                        |
| Geräte      | Name, IP-Adresse, MAC-Adresse                                  |
| WLANs       | Name                                                           |
| Netzwerke   | Name                                                           |
| Gesundheit  | Teilsystem                                                     |

### Filterzustände

Für jede Art von Information können die zu erstellenden Zustände ausgewählt werden. Wenn nichts ausgewählt wird, werden alle Zustände erstellt. Zustände, die von einem ausgewählten Zustand benötigt werden, werden automatisch hinzugefügt, z. B. `last_seen_by_uap` Und `last_seen_by_usw` für `is_online` Die

## Kontrolle

### WLAN aktivieren/deaktivieren

Durch Ändern des Aktivierungsstatus eines WLAN-Netzwerks kann dieses aktiviert oder deaktiviert werden. Die Änderung wird einige Sekunden später an die Zugangspunkte übermittelt.

### Gutscheinerstellung

Verwendung der `vouchers.create_vouchers` Über diese Schaltfläche können vordefinierte Gutscheine erstellt werden. Es ist möglich, die Anzahl der zu erstellenden Gutscheine, deren Gültigkeitsdauer sowie Upload- und Downloadlimits festzulegen.

## Fehlende Datenpunkte

Der Adapter verwendet [node-unifi,](https://github.com/jens-maus/node-unifi) um eine Verbindung zu Ihrem UniFi Controller herzustellen. Um die Einrichtung zu vereinfachen, werden nicht alle verfügbaren Datenpunkte in Ihren ioBroker übernommen. Falls Datenpunkte fehlen, verwenden Sie die folgenden URLs, um die API zu überprüfen. (Hinweis: Ersetzen Sie IP, PORT und SITE durch Ihre Einstellungen.)

| Information | API-URL                                       |
| ----------- | --------------------------------------------- |
| Websites    | <https://IP:PORT/api/self/sites>              |
| SysInfo     | <https://IP:PORT/api/s/SITE/stat/sysinfo>     |
| Kunden      | <https://IP:PORT/api/s/SITE/stat/sta>         |
| Geräte      | <https://IP:PORT/api/s/SITE/stat/device>      |
| WLANs       | <https://IP:PORT/api/s/SITE/rest/wlanconf>    |
| Netzwerke   | <https://IP:PORT/api/s/SITE/rest/networkconf> |
| Gesundheit  | <https://IP:PORT/api/s/SITE/stat/health>      |
| Gutscheine  | <https://IP:PORT/api/s/SITE/stat/voucher>     |
| DPI         | <https://IP:PORT/api/s/SITE/stat/dpi>         |
| Alarm       | <https://IP:PORT/api/s/SITE/stat/alarm>       |

### UniFiOS (UDM-Pro)-Endpunkte

| Information | API-URL                                                |
| ----------- | ------------------------------------------------------ |
| Websites    | <https://IP/proxy/network/api/self/sites>              |
| SysInfo     | <https://IP/proxy/network/api/s/SITE/stat/sysinfo>     |
| Kunden      | <https://IP/proxy/network/api/s/SITE/stat/sta>         |
| Geräte      | <https://IP/proxy/network/api/s/SITE/stat/device>      |
| WLANs       | <https://IP/proxy/network/api/s/SITE/rest/wlanconf>    |
| Netzwerke   | <https://IP/proxy/network/api/s/SITE/rest/networkconf> |
| Gesundheit  | <https://IP/proxy/network/api/s/SITE/stat/health>      |
| Gutscheine  | <https://IP/proxy/network/api/s/SITE/stat/voucher>     |
| DPI         | <https://IP/proxy/network/api/s/SITE/stat/dpi>         |
| Alarm       | <https://IP/proxy/network/api/s/SITE/stat/alarm>       |

## Bekannte Probleme

- Der Verbindungsstatus (is\_wired) von Clients ist nach dem Offline-Gehen eines Clients fehlerhaft. Dies ist ein bekanntes Problem des UniFi-Controllers und steht nicht im Zusammenhang mit dem Adapter. (Siehe <https://community.ui.com/questions/Wireless-clients-shown-as-wired-clients/49d49818-4dab-473a-ba7f-d51bc4c067d1> )

## Referenzen

Dieser Adapter nutzt Funktionen der folgenden Drittanbieter-Node.js-Module:

- [node-unifi](https://github.com/jens-maus/node-unifi)
- [json-logic-js](https://github.com/jwadhams/json-logic-js)

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.0.2 (2026-09-24)
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (@FiraSenax) Controller sessions are reused and the polling loop keeps running after errors, new diagnostic states in `info` [#989]
- (@GermanBluefox) A failing endpoint or site no longer aborts the whole refresh
- (@GermanBluefox) Fixed polling stopping after `trigger_update` overlapped a scheduled refresh
- (@GermanBluefox) Migrated the settings page to JSON config
- (@GermanBluefox) Fixed creating vouchers: the settings were passed in the wrong order since node-unifi 2
- (@GermanBluefox) The adapter was refactored to TypeScript. It can be installed from npm only, not from GitHub

### 0.7.0 (2024-04-13)
* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 0.6.7 (2023-12-10)
* (jens-maus) updated node-unifi to 2.5.1 to fix UDMpro v3.2.x auth issues
* (jens-maus) updated dependencies

### 0.6.6 (2023-06-20)
* (pafade89) fixed broken client status updates (#672)

### 0.6.5 (2023-06-20)
* (jens-maus) Bumped node-unifi to latest 2.4.1

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