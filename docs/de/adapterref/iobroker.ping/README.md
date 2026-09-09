---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ping/README.md
title: PING-Adapter
hash: f1oBwZlw077cGSMI9Js2FmSXCNkDcpI9SRK6JkzGKnM=
---
![Logo](../../../en/adapterref/iobroker.ping/admin/ping.png)

![Anzahl der Installationen](http://iobroker.live/badges/ping-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.ping.svg)
![Test und Freigabe](https://github.com/ioBroker/ioBroker.ping/workflows/Test%20and%20Release/badge.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/ping/svg-badge.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.ping.svg)

# PING-Adapter

## Pings konfigurierte IP-Adressen.

Pings an festgelegte IP-Adressen in einem definierten Intervall und Überwachung der Ergebnisse.

Sie können TCP-Ports auch überwachen, indem Sie die Portnummer nach der IP-Adresse mit einem Doppelpunkt angeben (z. B. 1234).`192.168.1.1:80` oder`google.com:443` Hierbei wird geprüft, ob der Port erreichbar ist, anstatt einen ICMP-Ping zu verwenden.

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) . Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Ping vom JavaScript-Adapter

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

- Falls Ihr Linux-Client nicht anpingbar ist, überprüfen Sie Folgendes:`iputils-ping` ist korrekt auf einem Client installiert.

- `ping` Dieser Befehl unter Linux erfordert Root-Berechtigungen.

Sie können dem Adapter die Berechtigung zur Ausführung des folgenden Befehls erteilen:`ping` Befehl als Root ausführen.

Dazu müssen Sie die folgende Zeile hinzufügen:`/etc/sudoers` Datei mit`sudo visudo` Befehl:`iobroker ALL=(ALL) NOPASSWD: /bin/ping` Die

Oder Sie können die Ping-Ausführung zulassen durch`sudo setcap cap_net_raw+ep /bin/ping` Befehl.

Sie müssen installieren`setcap` mit`sudo apt-get install libcap2-bin` vorher wenn`setcup` Nicht gefunden.

## hping3-Unterstützung für Geräte im Ruhemodus (z. B. iPhones)

Manche Geräte, insbesondere iPhones im Tiefschlafmodus, reagieren nicht auf Standard-ICMP-Pings. Um solche Geräte zuverlässig zu erkennen, kann der Adapter Folgendes verwenden:`hping3` Um einen Burst von UDP-Paketen an Port 5353 (mDNS) zu senden, der das Gerät aufweckt, gefolgt von einem regulären Ping, um die Erreichbarkeit zu bestätigen.

Aktivieren Sie **„hping3 verwenden“** für einzelne Geräte in der Gerätetabelle. Der Adapter läuft wie folgt:

```
hping3 -2 -c 10 -p 5353 -i u1 -q <IP>
```

…führt dann sofort einen regulären ICMP-Ping durch. Wenn hping3 nicht installiert ist, greift der Adapter automatisch auf den regulären Ping zurück.

**Installation (nur Linux):** Aktivieren Sie in den Haupteinstellungen **die Option „hping3 installieren, falls nicht verfügbar“** . Der Adapter wird dann ausgeführt.`sudo apt-get install -y hping3` Beim Systemstart, falls hping3 noch nicht vorhanden ist. Alternativ kann es manuell installiert werden:

```bash
sudo apt-get install hping3
```

## TCP-Portprüfung

Ab Version 1.8.0 können Sie auch TCP-Ports überprüfen, indem Sie die Portnummer nach der IP-Adresse mit einem Doppelpunkt angeben (z. B. 1234).`192.168.1.1:80` ).

Der Adapter prüft, ob der TCP-Port erreichbar ist, anstatt ICMP-Ping zu verwenden.

## Wake-on-LAN vom JavaScript-Adapter

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

## Schreiben an lebende Staaten

Jeder Gerätezustand ist beschreibbar und reagiert auf nicht bestätigte Schreibvorgänge:

- **Schreiben`false`** — löst einen sofortigen Ping an dieses Gerät aus, außerhalb des normalen Abfrageintervalls.
- **Schreiben`true`** — sendet ein [Wake-on-LAN](https://en.wikipedia.org/wiki/Wake-on-LAN) Magic Packet, um das Gerät aufzuwecken.

### Wake-on-LAN

Damit Wake-on-LAN funktioniert, muss der Adapter die MAC-Adresse des Geräts kennen. Die Auflösung erfolgt in dieser Reihenfolge:

1. **MAC-Adresse beim Netzwerk-Browsing ermittelt** – wenn das Gerät beim Netzwerk-Browsing gefunden wurde, wird seine MAC-Adresse automatisch zwischengespeichert.
2. **Live-ARP-Lookup** – falls die oben genannte Methode nicht verfügbar ist, versucht der Adapter, die MAC-Adresse zum Zeitpunkt des Schreibvorgangs per ARP aufzulösen.

Kann die MAC-Adresse nicht ermittelt werden, wird eine Warnung protokolliert und das Paket nicht gesendet.

Beispiel aus dem JavaScript-Adapter:

```js
// Trigger immediate ping
setState('ping.0.myHost.192_168_1_1', false);

// Send Wake-on-LAN magic packet
setState('ping.0.myHost.192_168_1_1', true);
```

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### 3.1.1 (2026-09-01)
- (@GermanBluefox) Ping says now when this host may not send ICMP at all instead of reporting every device as offline
- (@GermanBluefox) Added an optional TCP check that keeps the devices monitored on such a host (LXC container)

### 3.0.1 (2026-08-03)
- (copilot) Breaking: Adapter requires node.js >= 22 now
- (@GermanBluefox) Migrated for Admin 8

### 2.2.4 (2026-05-16)
- (@GermanBluefox) Fixing devices widgets

### 2.2.2 (2026-04-30)
- (@GermanBluefox) Added support for device manager
- (@GermanBluefox) Added devices widgets

### 2.1.0 (2026-03-04)
- (@GermanBluefox) Implemented wake-on-lan functionality
- (@GermanBluefox) Implemented pings with hping3 for sleeping devices (e.g. iPhones)

[Older changelogs can be found there](https://github.com/ioBroker/ioBroker.ping/blob/master/CHANGELOG_OLD.md)

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