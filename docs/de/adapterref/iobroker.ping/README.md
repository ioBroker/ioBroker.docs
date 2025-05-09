---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ping/README.md
title: PING-Adapter
hash: bXQvPvlJp7yu6RLJjh1sQOdaQgMdYeAjfMkI3QwdTSM=
---
![Logo](../../../en/adapterref/iobroker.ping/admin/ping.png)

![Anzahl der Installationen](http://iobroker.live/badges/ping-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.ping.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.ping.svg)

# PING-Adapter
![Testen und Freigeben](https://github.com/ioBroker/ioBroker.ping/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/ping/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

## Pingt konfigurierte IP-Adressen.
Pingt angegebene IP-Adressen in einem definierten Intervall und überwacht die Ergebnisse.

**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Ping vom Javascript-Adapter
Sie können vom JavaScript-Adapter aus mit dem folgenden Befehl eine Ping-Nachricht an jede beliebige IP-Adresse senden:

```js
sendTo('ping.0', 'ping', '192.168.1.1', (res) => {
    console.log('Result: ' + JSON.stringify(res)); // Result: {"result": {"host": "192.168.1.1", "alive": true, "ms": 250}}
});
```

## Bekannte Probleme
- Wenn es nicht möglich ist, Ihren Linux-Client anzupingen, überprüfen Sie, ob „iputils-ping“ auf einem Client korrekt installiert ist.

- Der „Ping“-Befehl unter Linux erfordert Root-Berechtigungen.

Sie können dem Adapter die Rechte geben, den Befehl `ping` als Root auszuführen.

Dazu müssen Sie der Datei `/etc/sudoers` mit dem Befehl `sudo visudo` folgende Zeile hinzufügen: `iobroker ALL=(ALL) NOPASSWD: /bin/ping`.

Oder Sie können die Ping-Ausführung mit dem Befehl `sudo setcap cap_net_raw+ep /bin/ping` zulassen.

Sie müssen `setcap` mit `sudo apt-get install libcap2-bin` installieren, bevor `setcup` nicht gefunden wird.

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **IN ARBEIT** -->
## Aufgaben
- [ ] Implementierung der Möglichkeit zur Überwachung von TCP-Ports

## Changelog
### 1.7.7 (2024-09-28)

-   (bluefox) Used `iobroker/eslint-config`
-   (bluefox) Fixed some errors with `setcup`
-   (bluefox) Corrected admin notification

### 1.7.6 (2024-09-21)

-   (bluefox) Corrected notification message

### 1.7.5 (2024-09-18)

-   (bluefox) Corrected small error about range length

### 1.7.4 (2024-09-17)

-   (bluefox) Added support for dynamic notifications
-   (bluefox) Added custom range settings

### 1.7.3 (2024-08-25)

-   (bluefox) Added the functionality to poll the address range periodically

### 1.7.1 (2024-08-25)

-   (bluefox) Added resolution of IP addresses to MAC addresses

### 1.7.0 (2024-08-17)

-   (bluefox) Added possibility to browse the IP ranges

### 1.6.4 (2024-07-17)

-   (bluefox) Added possibility to execute `setcap` command to allow ping without root rights

### 1.6.3 (2024-07-16)

-   (bluefox) Updated the packages

### 1.6.2 (2023-07-19)

-   (McM1957) Handling of state updates causing crashes with js-controller 5 has been corrected. (Issue #106)
-   (McM1957) Trailing spaces are now removed from ip address and name. Trailing spaces blocked correct operation. (Issue #98)
-   (bluefox) Added JSON config
-   (bluefox) Added different intervals for online and offline devices
-   (bluefox) implemented export/import of devices

### 1.5.3 (2022-02-24)

-   (Apollon77) Fix the ping retry logic

### 1.5.2 (2022-01-20)

-   (basti4557) Number of retries can be defined if a ping request failed. This should minimize wrong offline detection.

### 1.5.0 (2021-07-14)

-   js-controller 2.0 required at least
-   (Apollon77) optimize for js-controller 3.3

### 1.4.12 (2020-09-18)

-   (Apollon77) Prevented a crash case when no devices are defined (Sentry IOBROKER-PING-R)

### 1.4.11 (2020-08-26)

-   (Apollon77) update js-controller dependency to correct version (1.5.8)

### 1.4.8 (2020-06-29)

-   (Apollon77) Prevent adapter crashes with invalid state/channel names, see error log! (Sentry IOBROKER-PING-H, IOBROKER-PING-P, IOBROKER-PING-B)

### 1.4.7 (2020-05-02)

-   (Apollon77) finally try to catch spawn errors (Sentry IOBROKER-PING-2)

### 1.4.6 (2020-04-29)

-   (Apollon77) Make sure the adapter does not crash if ping command cannot be executed (Sentry)
-   (Apollon77) Catch error when `ping.probe` could not be started (Sentry IOBROKER-PING-2)

### 1.4.5 (2020-04-23)

-   (Apollon77) Fixed a potential crash case (Sentry)

### 1.4.4 (2020-04-17)

-   (bluefox) Added support for Admin3

### 1.4.3 (2020-04-17)

-   (Apollon77) Add Sentry for js-controller 3.0
-   (Apollon77) update dependencies

### 1.4.2 (2020-01-23)

-   (JayVee2) Sort the IP addresses

### 1.4.1 (2019-01-08)

-   (simatec) supported compact mode

### 1.4.0 (2018-01-25)

-   (vdemidov) refactored, added ping time and roundtrips per second for every host

### 1.3.2 (2017-09-20)

-   (ldittmar) object values are converted to the valid type

### 1.3.0 (2017-02-21)

-   (bluefox) allowed removing host name from state's name

### 1.2.0 (2016-12-09)

-   (bluefox) change configuration dialog

### 1.1.3 (2016-11-16)

-   (bluefox) catch error if no IP defined

### 1.1.1 (2016-04-10)

-   (bluefox) remove ms

### 1.1.0 (2016-04-10)

-   (bluefox) rewrite ping for windows

### 1.0.0 (2016-04-03)

-   (bluefox) support for freebsd and all windows languages
-   (bluefox) add tests

### 0.1.3 (2015-01-26)

-   (bluefox) Fixed the error if the configuration changed

### 0.1.2 (2015-01-14)

-   (bluefox) Fixed the configuration page

### 0.1.1 (2015-01-03)

-   (bluefox) Enabled npm install

### 0.1.0 (2014-11-26)

-   (bluefox) Used ping npm module instead of static one

### 0.0.5 (2014-11-21)

-   (bluefox) Made possible to have shorter ping intervals (down to 5 seconds)

### 0.0.4 (2014-11-07)

-   (bluefox) fix ping node

### 0.0.3 (2014-11-03)

-   (bluefox) fix ping node (do not forget to remove package from git when the npm gets the update)

### 0.0.1 (2014-11-02)

-   (bluefox) support of server (actually no authentication)

## License

The MIT License (MIT)

Copyright (c) 2014-2024, bluefox <dogafox@gmail.com>

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