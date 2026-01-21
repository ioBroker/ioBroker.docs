---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.srm/README.md
title: ioBroker Synology Router Manager Adapter
hash: M0CLe8zC9gc+ByUUQoyZ21zktYfOPF7LTy/GWB45jKU=
---
![Logo](../../../en/adapterref/iobroker.srm/admin/srm.png)

![Anzahl der Installationen](http://iobroker.live/badges/srm.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.srm.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.srm.svg)

# IoBroker Synology Router Manager Adapter
![Test und Freigabe](https://github.com/iobroker-community-adapters/iobroker.srm/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/srm/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

## Beschreibung
Dies ist ein iobroker-Adapter zur Verbindung mit Routern der Klasse [Synology](https://www.synology.com/). Der Adapter nutzt die Synology-API zum Datenabruf. Er wurde mit der SRM-Version 1.3.1 und dem Routermodell RT6600 getestet, sollte aber auch mit anderen Modellen funktionieren.

## Verwendung
### Installation
Erstellen Sie eine neue Instanz des Adapters und geben Sie die IP-Adresse Ihres Routers ein. Der Port ist standardmäßig 8001. Geben Sie Benutzername und Passwort Ihres Routers ein. Stellen Sie sicher, dass der Benutzer keine Zwei-Faktor-Authentifizierung (2FA) verwendet.

### Objekte
Der Adapter erzeugt die folgenden Objekte:

#### Router
* IPv4_IP: IPv4-Adresse des Routers
* IPV4_status: Status der IPV4-Verbindung
* IPV6_IP: IPv6-Adresse des Routers
* IPV6_status: Status der IPV4-Verbindung

#### Geräte
JSON-Tabelle für die folgenden Gerätezustände:

* alle: Alle bekannten Geräte
* Mesh: Alle Mesh-Geräte
* online: Alle Online-Geräte
* online_ethernet: Alle Online-Geräte, die über Ethernet verbunden sind
* Online-WLAN: Alle Online-Geräte sind über WLAN verbunden.

Jede JSON-Tabelle enthält für jedes Gerät die folgenden Objekte:

* Verbindung: Verbindungstyp (Ethernet, WLAN)
* dev_type: Gerätetyp (Computer, Mobilgerät usw.)
* Hostname: Hostname des Geräts
* ip6_addr: IP6-Adresse des Geräts
* ip_addr: IP4-Adresse des Geräts
* is_banned: Ist das Gerät gesperrt?
* is_beamforming_on: Ist Beamforming aktiviert?
* is_high_qos_on: Ist hohes QoS aktiviert?
* is_low_qos_on: Ist niedriges QoS aktiviert?
* is_manual_device_type: Wurde der Gerätetyp manuell eingestellt?
* is_manual_hostname: Wurde der Hostname manuell festgelegt?
* is_online: Ist das Gerät online?
* is_qos_on: Ist QoS aktiviert?
* is_wireless: Ist das Gerät über WLAN verbunden?
* mac: MAC-Adresse des Geräts
* mesh_node_id: ID des Mesh-Knotens
* mesh_node_name: Name des Mesh-Knotens

#### Info
* Verbindung: Status der Verbindung zum Router

#### Netz
Liste der Netzknoten. Jeder Netzknoten enthält die folgenden Objekte:

* Band: Uplink-Band
* connected_devices: Anzahl der verbundenen Geräte
* current_tx_rate: Aktuelle Übertragungsrate
* current_rx_rate: Aktuelle Empfangsrate
* Name: Name des Netzknotens
* Netzwerkstatus: Status des Netzwerks
* node_id: ID des Mesh-Knotens
* node_status: Status des Mesh-Knotens
* parent_node_id: ID des übergeordneten Knotens
* signal_strength: Signalstärke

#### W-lan
Liste der WLAN-Netzwerke und -Einstellungen. Die WLAN-Einstellungen können nur alle 3 Sekunden geändert werden, um Konflikte zu vermeiden. Jeder Mesh-Knoten verfügt über die folgenden Objekte:

* aktivieren: WLAN-Netzwerk aktivieren (Lesen/Schreiben)
* enable_client_isolation: Clientisolation aktivieren (Lesen/Schreiben)
* hide_ssid: WLAN-SSID ausblenden (Lesen/Schreiben)
* mac_filter: MAC-Filter aktivieren (lesen)
* schedule_enable: Zeitplan für Netzwerk aktivieren (Lesen/Schreiben)

## Credits
Dieser Adapter wäre ohne die großartige Arbeit von @stephan1827 (https://github.com/stephan18277), der die ursprünglichen Versionen dieses Adapters entwickelt hat, nicht möglich gewesen.

Dank an

* [Nocilas](https://github.com/nioc), die den Konnektor für die Synology API bereitstellen.
* Die unzähligen iobroker-Adapter, die ich als Vorlage verwendet habe, insbesondere [asuswrt](https://github.com/mcdhrts/ioBroker.asuswrt).

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **IN BEARBEITUNG** -->

## Changelog
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

Copyright (c) 2025 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
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