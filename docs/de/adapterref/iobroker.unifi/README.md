---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.unifi/README.md
title: ioBroker.unifi
hash: tyFQ5E7Y9sRhtqHpKh4zs/HV5MOYsU5argoNWrFk7HM=
---
![Anzahl der Installationen](http://iobroker.live/badges/unifi-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.unifi.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.unifi.svg)

<img height="100px" src="admin/unifi.png" align="left"><br/>

# IoBroker.unifi
![Testen und freigeben](https://github.com/iobroker-community-adapters/ioBroker.unifi/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/unifi/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry-Berichte werden ab js-controller 3.0 verwendet.

Dieser ioBroker-Adapter ermöglicht die Überwachung und eingeschränkte Steuerung von [UniFi-Geräte](http://www.ubnt.com/), wie z. B. UniFi WiFi Access Points über die öffentliche UniFi Controller Web-API.

## Aufbau
### Erforderliche Mindestinformationen
Um diesen Adapter zum Laufen zu bringen, sind die folgenden Informationen erforderlich:

* IP-Adresse und Port Ihres UniFi-Controllers (Lassen Sie den Port leer, falls Ihr Controller auf UniFiOS läuft (z. B. UDM-Pro))
* Lokaler Benutzername und Passwort (2FA **kann nicht** unterstützt werden)
* Updateintervall

Standardmäßig werden die Informationen alle 60 Sekunden aktualisiert. Abhängig von Ihrer ioBroker-Hardware und Ihrer Netzwerkgröße (Anzahl der Clients, UniFi-Geräte usw.) wird empfohlen, dieses Intervall beizubehalten und davon abzusehen, es weiter zu verkürzen.

### Objekte filtern
Der Adapter aktualisiert so viele Informationen wie möglich von Ihrem UniFi-Controller, bietet jedoch die Möglichkeit, die aktualisierten Informationen einzuschränken.

Es ist möglich, die Aktualisierung ausgewählter Informationen zu deaktivieren oder bestimmte Objekte dieser Informationen zu filtern.

| Informationen | Objekte filterbar nach |
|-------------|-----------------------------------------|
| Kunden | Name, Hostname, IP-Adresse, MAC-Adresse |
| Geräte | Name, IP-Adresse, MAC-Adresse |
| WLANs | Name |
| Netzwerke | Name |
| Gesundheit | Teilsystem |

## Kontrolle
### WiFis aktivieren/deaktivieren
Durch Ändern des „aktivierten“ Zustands eines WLANs ist es möglich, es zu aktivieren/deaktivieren. Einige Sekunden später wird die Änderung an die Access Points bereitgestellt.

### Gutscheinerstellung
Über die Schaltfläche `vouchers.create_vouchers` ist es möglich, vordefinierte Gutscheine zu erstellen. Es ist möglich, die Anzahl der Gutscheine, die erstellt werden, die Gültigkeitsdauer der Gutscheine zu konfigurieren und auch Limits für Up- und Download festzulegen.

## Fehlende Datenpunkte
Der Adapter verwendet [node-unifi](https://github.com/jens-maus/node-unifi), um sich mit Ihrem UniFi Controller zu verbinden. Der Einfachheit halber werden nicht alle verfügbaren Datenpunkte in Ihren ioBroker gezogen. Falls Ihnen Datenpunkte fehlen, verwenden Sie die folgenden URLs, um die API zu überprüfen. (Hinweis: Sie müssen IP, PORT und SITE durch Ihre Einstellungen ersetzen)

| Informationen | API-URL |
|-------------|---------------------------------------------|
| Websites | https://IP:PORT/api/self/sites |
| SysInfo | https://IP:PORT/api/s/SITE/stat/sysinfo |
| Kunden | https://IP:PORT/api/s/SITE/stat/sta |
| Geräte | https://IP:PORT/api/s/SITE/stat/device |
| WLANs | https://IP:PORT/api/s/SITE/rest/wlanconf |
| Netzwerke | https://IP:PORT/api/s/SITE/rest/networkconf |
| Gesundheit | https://IP:PORT/api/s/SITE/stat/health |
| Gutscheine | https://IP:PORT/api/s/SITE/stat/voucher |
| DPI | https://IP:PORT/api/s/SITE/stat/dpi |
| Alarme | https://IP:PORT/api/s/SITE/stat/alarm |

### UniFiOS (UDM-Pro)-Endpunkte
| Informationen | API-URL |
|-------------|------------------------------------------------------|
| Websites | https://IP/proxy/network/api/self/sites |
| SysInfo | https://IP/proxy/network/api/s/SITE/stat/sysinfo |
| Kunden | https://IP/proxy/network/api/s/SITE/stat/sta |
| Geräte | https://IP/proxy/network/api/s/SITE/stat/device |
| WLANs | https://IP/proxy/network/api/s/SITE/rest/wlanconf |
| Netzwerke | https://IP/proxy/network/api/s/SITE/rest/networkconf |
| Gesundheit | https://IP/proxy/network/api/s/SITE/stat/health |
| Gutscheine | https://IP/proxy/network/api/s/SITE/stat/voucher |
| DPI | https://IP/proxy/network/api/s/SITE/stat/dpi |
| Alarme | https://IP/proxy/network/api/s/SITE/stat/alarm |

## Bekannte Probleme
* Der is_wired-Status von Clients ist falsch, nachdem ein Client offline gegangen ist. Dies ist ein bekanntes Problem des UniFi-Controllers und hängt nicht mit dem Adapter zusammen. (siehe https://community.ui.com/questions/Wireless-clients-shown-as-wired-clients/49d49818-4dab-473a-ba7f-d51bc4c067d1)

## Verweise
Dieser Adapter verwendet die Funktionalität der folgenden nodejs-Module von Drittanbietern:

* [node-unifi](https://github.com/jens-maus/node-unifi)
* [json-logic-js](https://github.com/jwadhams/json-logic-js)

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.6.3 (2022-10-08)
* (jens-maus) Bumped node-unifi to latest 2.2.1 (fixes #613)

### 0.6.2 (2022-10-07)
* (jens-maus) Bumped node-unifi to latest 2.2.0
* (maximilian-1) port-overrides structures added
* (Scrounger) poe power switch added
* (Scrounger) client reconnect added

### 0.6.1 (2022-06-08)
* (jens-maus) Bumped node-unifi to latest 2.1.0
* (jens-maus) updated translations

### 0.6.0 (2022-06-05)
* IMPORTANT: js-controller 2.0 or higher is required
* IMPORTANT: If Login do not work please re-enter the password in the instance configuration
* (Apollon77) Migrate to new version of unifi library
* (Apollon77) Allow to specify if SSL error should be ignored or not  (Default is to ignore errors as in former versions)
* (jens-maus) Fixed more device state object definitions to get rid of state warnings.
* (jens-maus/Apollon77) Updated dependencies, make compatible to newest firmwares

### 0.5.10 (2021-05-27)
* (jens-maus) Changed "Update done" output to be output as debug info.
* (jens-maus) Updated dependencies.

### 0.5.9 (2021-05-07)
* (jens-maus) Fixed all js-controller 3.3 related state warnings
* (kirovilya, jens-maus) Added device state object with dedicated states list.
* (jens-maus) Updated node-unifi to latest version
* (jens-maus) Updated dependencies

### 0.5.8 (2020-08-29)
* (braindead1) Fixed problems related to unused sites
* (braindead1) Fixed some errors reported via Sentry

### 0.5.7 (2020-07-27)
* (braindead1) Fixed Sentry errors caused by not updated configuration after update

### 0.5.6 (2020-07-25)
* (Scrounger, braindead1) Implemented Alarms, DPI & Gateway Traffic
* (braindead1) Prevented creation of ghost clients caused by iOS MAC randomization
* (dklinger) Implemented manual update trigger
* (braindead1) Implemented deletion of used vouchers
* (braindead1) Fixed some errors reported via Sentry

### 0.5.5 (2020-06-13)
* (braindead1) Fixed some errors reported via Sentry

### 0.5.4 (2020-06-06)
* (braindead1) Implemented offset for is_online
* (braindead1) Fixed some issues related to is_online
* (braindead1) Prepared whitelisting of clients etc.

### 0.5.2 (2020-05-23)
* (jens-maus) Implemented UniFiOS/UDM-Pro support
* (braindead1) Implemented possibility to enable/disable WLANs
* (braindead1) Implemented voucher creation
* (braindead1) Implemented online state for clients
* (braindead1) Updated client states
* (braindead1) Updated device states
* (braindead1) Improved error messages

### 0.5.0 (2020-05-09)
* (braindead1) Implemented configuration of updates
* (braindead1) Improved JsonLogic
* (braindead1) Removed legacy code
* (braindead1) Implemented Sentry

### 0.4.3 (2020-04-24)
* (braindead1) fixed configuration issue

### 0.4.2 (2020-04-23)
* (braindead1) subsystem issue fixed

### 0.4.1 (2020-04-16)
* (braindead1) Enhanced refactoring

### 0.4.0 (2020-04-16)
* (bluefox) Refactoring

### 0.3.1
* (jens-maus) added support for multi-site environments.

### 0.3.0
* (jens-maus) added access device data query and moved the client devices to the 'clients' subtree instead

### 0.2.1
* (jens-maus) minor fixes

### 0.2.0
* (jens-maus) moved `lib/unifi.js` to dedicated node-unifi nodejs class and added it as a dependency.

### 0.1.0
* (jens-maus) implemented a first basically working version which can retrieve status information from a UniFi controller.

### 0.0.1
* (jens-maus) initial checkin of non-working development version

## License
The MIT License (MIT)

Copyright (c) 2016-2022 Jens Maus &lt;mail@jens-maus.de&gt;
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