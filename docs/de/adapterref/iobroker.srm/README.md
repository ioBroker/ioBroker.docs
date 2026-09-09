---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.srm/README.md
title: ioBroker Synology Router Manager Adapter
hash: L/sDzxFuzO5MrbiD0JsqFaT+X858q6VJQtmg9BUW+Sk=
---
![Logo](../../../en/adapterref/iobroker.srm/admin/srm.png)

![Anzahl der Installationen](http://iobroker.live/badges/srm.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.srm.svg)
![Test und Freigabe](https://github.com/iobroker-community-adapters/iobroker.srm/workflows/Test%20and%20Release/badge.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/srm/svg-badge.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.srm.svg)

# ioBroker Synology Router Manager Adapter

## Beschreibung

Dies ist ein iobroker-Adapter zur Verbindung mit [Synology](https://www.synology.com/) -Routern. Der Adapter nutzt die Synology-API zum Datenabruf. Er wurde mit der SRM-Version 1.3.1 und dem Routermodell RT6600 getestet, sollte aber auch mit anderen Modellen funktionieren.

## Verwendung

### Installation

Erstellen Sie eine neue Instanz des Adapters und geben Sie die IP-Adresse Ihres Routers ein. Der Port ist standardmäßig 8001. Geben Sie Benutzername und Passwort Ihres Routers ein. Stellen Sie sicher, dass der Benutzer keine Zwei-Faktor-Authentifizierung (2FA) verwendet.

### Objekte

Der Adapter erzeugt die folgenden Objekte:

#### Router

- IPv4-Adresse: IPv4-Adresse des Routers
- IPV4\_status: Status der IPV4-Verbindung
- IPv6-IP: IPv6-Adresse des Routers
- IPV6\_status: Status der IPV4-Verbindung

#### Geräte

JSON-Tabelle für die folgenden Gerätezustände:

- alle: Alle bekannten Geräte
- Mesh: Alle Mesh-Geräte
- Online: Alle Online-Geräte
- online\_ethernet: Alle Online-Geräte, die über Ethernet verbunden sind
- Online-WLAN: Alle Online-Geräte sind über WLAN verbunden.

Jede JSON-Tabelle enthält für jedes Gerät die folgenden Objekte:

- Verbindung: Verbindungstyp (Ethernet, WLAN)
- dev\_type: Gerätetyp (Computer, Mobilgerät usw.)
- Hostname: Hostname des Geräts
- ip6\_addr: IP6-Adresse des Geräts
- ip\_addr: IP4-Adresse des Geräts
- is\_banned: Ist das Gerät gesperrt?
- is\_beamforming\_on: Ist Beamforming aktiviert?
- is\_high\_qos\_on: Ist hohes QoS aktiviert?
- is\_low\_qos\_on: Ist niedriges QoS aktiviert?
- is\_manual\_device\_type: Wurde der Gerätetyp manuell eingestellt?
- is\_manual\_hostname: Wurde der Hostname manuell festgelegt?
- is\_online: Ist das Gerät online?
- is\_qos\_on: Ist QoS aktiviert?
- is\_wireless: Ist das Gerät über WLAN verbunden?
- mac: MAC-Adresse des Geräts
- mesh\_node\_id: ID des Mesh-Knotens
- mesh\_node\_name: Name des Mesh-Knotens

#### Info

- Verbindung: Status der Verbindung zum Router

#### Netz

Liste der Netzknoten. Jeder Netzknoten enthält die folgenden Objekte:

- Band: Uplink-Band
- angeschlossene Geräte: Anzahl der angeschlossenen Geräte
- aktuelle\_Übertragungsrate: Aktuelle Übertragungsrate
- aktuelle\_Empfangsrate: Aktuelle Empfangsrate
- Name: Name des Netzknotens
- Netzwerkstatus: Status des Netzwerks
- Knoten-ID: ID des Netzknotens
- Knotenstatus: Status des Netzknotens
- parent\_node\_id: ID des übergeordneten Knotens
- Signalstärke: Signalstärke

#### W-lan

Liste der WLAN-Netzwerke und -Einstellungen. Die WLAN-Einstellungen können nur alle 3 Sekunden geändert werden, um Konflikte zu vermeiden. Jeder Mesh-Knoten verfügt über die folgenden Objekte:

- Aktivieren: WLAN-Netzwerk aktivieren (Lesen/Schreiben)
- enable\_client\_isolation: Clientisolation aktivieren (Lesen/Schreiben)
- hide\_ssid: WLAN-SSID ausblenden (Lesen/Schreiben)
- mac\_filter: MAC-Filter aktivieren (lesen)
- schedule\_enable: Zeitplan für Netzwerk aktivieren (Lesen/Schreiben)

## Credits

Dieser Adapter wäre ohne die großartige Arbeit von @stephan1827 ( <https://github.com/stephan18277> ), der die ursprünglichen Versionen dieses Adapters entwickelt hat, nicht möglich gewesen.

Dank

- [Nocilas,](https://github.com/nioc) die den Konnektor für die Synology-API bereitstellen.
- Die unzähligen iobroker-Adapter, die ich als Vorlage verwendet habe, insbesondere [asuswrt](https://github.com/mcdhrts/ioBroker.asuswrt) .

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

## Changelog

### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (copilot) Adapter requires admin >= 7.6.17 now

### 1.0.0 (2024-12-12)
- (mcm1957) Adapter has been moved into iobroker-community-adapters organization
- (mcm1957) Adapter requires node.js 20 now.
- (mcm1957) Adapter requires js-controller 5 and admin 6 now.
- (mcm1957) Dependencies have been updated.

### 0.2.0 (2023-12-27)
- Added new section for WIFI settings. Some settings can be changed via the adapter.
- Account for different API versions

### 0.1.6 (2023-12-26)
- Account for different API versions

### 0.1.5 (2023-12-10)
- minor bug fixes

### 0.1.3 (2023-12-06)
- minor bug fixes

### 0.1.2 (2023-12-05)
- minor bug fixes

### 0.1.1 (2023-12-05)

- enabled NPM deployment

### 0.1.0 (2023-12-05)

- first public release

### Version 0.0.1

- initial release

## License
MIT License

Copyright (c) 2025-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2024 stephan stricker <stephan.stricker@outlook.com>

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