---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ping/README.md
title: PING-Adapter
hash: LDbyttY0mdNFu/LDvx8N6gl+/QVaYqWwZ2tlkeqZuQc=
---
![Logo](../../../en/adapterref/iobroker.ping/admin/ping.png)

![Anzahl der Installationen](https://iobroker.live/badges/ping-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.ping.svg)
![Test und Freigabe](https://github.com/ioBroker/ioBroker.ping/workflows/Test%20and%20Release/badge.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/ping/svg-badge.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.ping.svg)

# PING-Adapter

## Pings konfigurierte IP-Adressen.

Pings an festgelegte IP-Adressen in einem definierten Intervall und Überwachung der Ergebnisse.

Sie können TCP-Ports auch überwachen, indem Sie die Portnummer nach der IP-Adresse mit einem Doppelpunkt angeben (z. B. 1234). `192.168.1.1:80` oder `google.com:443` Hierbei wird geprüft, ob der Port erreichbar ist, anstatt einen ICMP-Ping zu verwenden.

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) . Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Ping von `javascript` Adapter

Sie können jede IP-Adresse vom JavaScript-Adapter aus mit folgendem Befehl anpingen:

```js
sendTo('ping.0', 'ping', '192.168.1.1', res => {
    console.log('Result: ' + JSON.stringify(res)); // Result: {"result": {"host": "192.168.1.1", "alive": true, "ms": 250}}
});
```

Sie können auch die TCP-Ports überprüfen:

```js
sendTo('ping.0', 'ping', '192.168.1.1:80', res => {
    console.log('Result: ' + JSON.stringify(res)); // Result: {"result": {"host": "192.168.1.1:80", "alive": true, "ms": 15}}
});
```

## Bekannte Probleme

- Falls Ihr Linux-Client nicht anpingbar ist, überprüfen Sie Folgendes: `iputils-ping` ist korrekt auf einem Client installiert.

- `ping` Dieser Befehl unter Linux erfordert Root-Berechtigungen.

Sie können dem Adapter die Berechtigung zur Ausführung des folgenden Befehls erteilen: `ping` Befehl als Root ausführen.

Dazu müssen Sie die folgende Zeile hinzufügen: `/etc/sudoers` Datei mit `sudo visudo` Befehl: `iobroker ALL=(ALL) NOPASSWD: /bin/ping` Die

Oder Sie können die Ping-Ausführung zulassen durch `sudo setcap cap_net_raw+ep /bin/ping` Befehl.

Sie müssen installieren `setcap` mit `sudo apt-get install libcap2-bin` vorher wenn `setcup` Nicht gefunden.

## Aufwecken von Geräten aus dem Schlafmodus (z. B. iPhones)

Manche Geräte, insbesondere iPhones im Tiefschlafmodus, reagieren nicht auf Standard-ICMP-Pings. Um solche Geräte zuverlässig zu erkennen, kann der Adapter zehn leere UDP-Pakete an Port 5353 (mDNS) senden, wodurch das Gerät aktiviert wird. Anschließend wartet er eine Sekunde und führt dann einen regulären Ping durch, um die Erreichbarkeit zu bestätigen.

Aktivieren Sie **„Vor Ping aufwecken“** für einzelne Geräte in der Gerätetabelle.

Der Impuls wird vom Adapter selbst gesendet (derselbe wie `hping3 -2 -c 10 -p 5353 -i u1 -q <IP>` Daher muss kein zusätzliches Tool installiert werden, und es funktioniert auf jeder Plattform.

## Paketgröße

Manche Geräte beantworten Echoanfragen nur bis zu einer bestimmten Größe. Die KNX-IP-Schnittstelle 730 von Weinzierl beispielsweise beantwortet die von Windows gesendeten 32 Byte Daten, nicht aber die von Linux gesendeten 56 Byte.

Geben Sie die Anzahl der Datenbytes in der Spalte **„Paketgröße“** der Gerätetabelle ein (0–65500). Der Adapter leitet sie weiter als `-s` Zu `ping` auf Linux, macOS und FreeBSD und als `-l` Zu `ping.exe` Unter Windows. Lassen Sie das Feld leer, um die Systemvorgabe beizubehalten.

## TCP-Portprüfung

Ab Version 1.8.0 können Sie auch TCP-Ports überprüfen, indem Sie die Portnummer nach der IP-Adresse mit einem Doppelpunkt angeben (z. B. 1234). `192.168.1.1:80`).

Der Adapter prüft, ob der TCP-Port erreichbar ist, anstatt ICMP-Ping zu verwenden.

Bei einer IPv6-Adresse setzen Sie die Adresse in eckige Klammern (z. B. `[fd00::1]:80` Eine IPv6-Adresse ohne Klammern (z. B. `fd00::1`) wird immer angepingt, ebenso wie eine Adresse in Klammern ohne Portangabe (`[fd00::1]` wird angepingt als `fd00::1` Unter macOS und FreeBSD werden IPv6-Adressen mit folgendem Befehl angepingt: `ping6` Die

Der Port muss zwischen 1 und 65535 liegen. Eine Adresse mit einem anderen Port (z. B. 1, 2, 3, 4, 5, 6 ... `192.168.1.1:0` oder `192.168.1.1:99999`) wird überhaupt nicht geprüft: Der Adapter protokolliert beim Start eine Warnung und meldet das Gerät als offline.

## Wake-on-LAN von `javascript` Adapter

Sie können jedes Gerät aufwecken, indem Sie ein Wake-on-LAN-Magic-Packet unter Verwendung seiner MAC-Adresse senden:

```js
// Send to broadcast (255.255.255.255)
sendTo('ping.0', 'wakeOnLan', '01:23:45:67:89:AB', res => {
    console.log('Result: ' + JSON.stringify(res)); // Result: {"result": {"mac": "01:23:45:67:89:AB"}}
});

// Send to a specific IP (e.g. directed broadcast)
sendTo('ping.0', 'wakeOnLan', { mac: '01:23:45:67:89:AB', ip: '192.168.1.255' }, res => {
    console.log('Result: ' + JSON.stringify(res)); // Result: {"result": {"mac": "01:23:45:67:89:AB", "ip": "192.168.1.255"}}
});
```

## Nachricht `help` für Skripte und KI-Agenten

`sendTo('ping.0', 'help', {})` Antworten `{ help, commands }`: eine Beschreibung der Nachrichten `ping` Und `wakeOnLan` und der Gerätezustände, die für KI-Agenten (z. B. ioBroker.pi-agent) und Skriptautoren geschrieben wurden; `commands` listet jede Nachricht des Adapters auf mit `write: true` Wenn es etwas ändert.

## Schreiben an lebende Staaten

Jeder Gerätezustand ist beschreibbar und reagiert auf nicht bestätigte Schreibvorgänge:

- **Schreiben `false` ** — löst einen sofortigen Ping an dieses Gerät aus, außerhalb des normalen Abfrageintervalls.
- **Schreiben `true` ** — sendet ein [Wake-on-LAN](https://en.wikipedia.org/wiki/Wake-on-LAN) Magic Packet, um das Gerät aufzuwecken.

### Wake-on-LAN

Damit Wake-on-LAN funktioniert, muss der Adapter die MAC-Adresse des Geräts kennen. Die Auflösung erfolgt in dieser Reihenfolge:

1. **MAC-Adresse beim Netzwerk-Browsing ermittelt** – wenn das Gerät beim Netzwerk-Browsing gefunden wurde, wird seine MAC-Adresse automatisch zwischengespeichert.
2. **Live-ARP-Lookup** – falls die oben genannte Option nicht verfügbar ist, versucht der Adapter, die MAC-Adresse zum Zeitpunkt der Erstellung dieses Dokuments per ARP aufzulösen.

Kann die MAC-Adresse nicht ermittelt werden, wird eine Warnung protokolliert und das Paket nicht gesendet.

Beispiel aus dem JavaScript-Adapter:

```js
// Trigger immediate ping
setState('ping.0.myHost.192_168_1_1', false);

// Send Wake-on-LAN magic packet
setState('ping.0.myHost.192_168_1_1', true);
```

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (@GermanBluefox) Fixed: Wake-on-LAN sends the right packet also for a MAC address with "-" or without separators (e.g. `01-23-45-67-89-ab`, `0123456789AB`); only ":" worked before
- (@GermanBluefox) Fixed: the message `wakeOnLan` also accepts a MAC address separated by "." (`01.23.45.67.89.ab`, `0123.4567.89ab`) and answers "Invalid MAC address" for any other input instead of failing without an answer

### 3.4.0 (2026-11-19)
- (@GermanBluefox) Added the message "help": a description of all messages for AI agents (e.g. pi-agent), and common.supportedMessages.help

### 3.3.0 (2026-11-15)
- (@GermanBluefox) Added the optional packet size per device (`ping -s` / `ping.exe -l`) for devices that only answer an echo request of a certain size, e.g. the KNX IP interface 730 of Weinzierl (#387)
- (@GermanBluefox) Updated packages

### 3.2.1 (2026-11-13)
- (@GermanBluefox) Added the short form of the web component manifests (tag, name, icon, size) to `common.webComponents`, so that hosts like Aura can list the components before the adapter is installed; the build writes it with `iob-web-components sync-io-package`
- (@GermanBluefox) Added: alias IDs are accepted in the web component Ping Device (#456)

### 3.2.0 (2026-11-09)
- (@GermanBluefox) Added the web components `iob-ping-device` and `iob-ping-overview` - the devices widgets "Ping Device" and "Ping Overview" for Aura and other hosts (`common.webComponents`)
- (@GermanBluefox) Devices widgets "Ping Device" and "Ping Overview": fixed the state IDs for host names with dots, devices shown by name and disabled devices
- (@GermanBluefox) Devices widget "Ping Device" shows the status of a newly selected device or instance at once instead of only after reloading; "Ping Overview" no longer mixes in devices of the previously selected instance
- (@GermanBluefox) IPv6 addresses ending in digits (e.g. `fd00::1`) are pinged now instead of being checked as a TCP port. Write the TCP port of an IPv6 address in brackets: `[fd00::1]:80`
- (@GermanBluefox) An IPv6 address in brackets without a port (e.g. `[fd00::1]`) is pinged now
- (@GermanBluefox) A TCP port outside 1-65535 (e.g. `192.168.1.1:99999`) no longer stops the adapter: the device is reported as offline and a warning is logged
- (@GermanBluefox) IPv6 addresses are pinged with `ping6` on macOS and FreeBSD, and on Windows a device that answers over IPv6 is no longer reported as offline
- (@GermanBluefox) Devices widget "Ping Device" shows the response time as soon as it is switched on in the settings; "Ping Overview" no longer fails when the instance cannot be read or has no device list

### 3.1.5 (2026-10-30)
- (@ipod86) Fixed crash "Invalid IP" when a device is configured with a host name (#445)

## License

The MIT License (MIT)

Copyright (c) 2014-2026, @GermanBluefox <dogafox@gmail.com>

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