---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.srm/README.md
title: ioBroker Synology Router Manager Adapter
hash: YFS3n/Q8ayDhk8BKLmS4F+wW3GgcS/oBIPlGbrPADXQ=
---
![Logo](../../../en/adapterref/iobroker.srm/admin/synology.png)

![Anzahl der Installationen](http://iobroker.live/badges/srm.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.srm.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.srm.svg)

# IoBroker Synology Router Manager Adapter
![Testen und Freigeben](https://github.com/iobroker-community-adapters/iobroker.srm/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/srm/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

## Beschreibung
Dies ist ein iobroker-Adapter zum Verbinden mit [Synology](https://www.synology.com/)-Routern. Der Adapter verwendet die Synology-API, um die Daten abzurufen. Der Adapter wurde mit der SRM-Version 1.3.1 und dem Routermodell RT6600 getestet, sollte aber auch mit anderen Modellen funktionieren.

## Verwendung
### Installation
Erstellen Sie eine neue Instanz des Adapters und geben Sie die IP-Adresse Ihres Routers ein. Der Port ist standardmäßig 8001. Geben Sie den Benutzernamen und das Passwort Ihres Routers ein. Stellen Sie sicher, dass der Benutzer keine 2FA verwendet.

### Objekte
Der Adapter erstellt die folgenden Objekte:

#### Router
* IPV4_IP: IP4-Adresse des Routers
* IPV4_status: Status der IPV4-Verbindung
* IPV6_IP: IP6-Adresse des Routers
* IPV6_status: Status der IPV4-Verbindung

#### Geräte
JSON-Tabelle für folgende Gerätezustände:

* all: Alle bekannten Geräte
* Mesh: Alle Mesh-Geräte
* online: Alle Online-Geräte
* online_ethernet: Alle über Ethernet verbundenen Online-Geräte
* Online-WLAN: Alle Online-Geräte sind über WLAN verbunden

Jede JSON-Tabelle enthält für jedes Gerät die folgenden Objekte:

* Verbindung: Verbindungstyp (Ethernet, WLAN)
* dev_type: Gerätetyp (Computer, Mobilgerät usw.)
* Hostname: Hostname des Geräts
* ip6_addr: IP6-Adresse des Geräts
* ip_addr: IP4-Adresse des Geräts
* is_banned: Ist das Gerät gesperrt
* is_beamforming_on: Ist Beamforming aktiviert
* is_high_qos_on: Ist hohe QOS aktiviert
* is_low_qos_on: Ist niedrige QOS aktiviert
* is_manual_device_type: Ist der Gerätetyp manuell eingestellt
* is_manual_hostname: Ist der Hostname manuell festgelegt
* is_online: Ist das Gerät online
* is_qos_on: Ist QOS aktiviert
* is_wireless: Ist das Gerät über WLAN verbunden
* mac: MAC-Adresse des Geräts
* mesh_node_id: ID des Mesh-Knotens
* mesh_node_name: Name des Mesh-Knotens

#### Informationen
* Verbindung: Status der Verbindung zum Router

#### Masche
Liste der Mesh-Knoten. Jeder Mesh-Knoten hat die folgenden Objekte:

* Band: Uplink-Band
* connected_devices: Anzahl der verbundenen Geräte
* current_tx_rate: Aktuelle Übertragungsrate
* current_rx_rate: Aktuelle Empfangsrate
* Name: Name des Mesh-Knotens
* network_status: Status des Netzwerks
* node_id: ID des Mesh-Knotens
* node_status: Status des Mesh-Knotens
* parent_node_id: ID des übergeordneten Knotens
* signal_strength: Signalstärke

#### W-lan
Liste der WLAN-Netzwerke und -Einstellungen. WLAN-Einstellungen können nur alle 3 Sekunden geändert werden, um widersprüchliche Änderungen zu vermeiden. Jeder Mesh-Knoten hat die folgenden Objekte:

* enable: WLAN-Netzwerk aktivieren (Lesen/Schreiben)
* enable_client_isolation: Client-Isolierung aktivieren (Lesen/Schreiben)
* hide_ssid: Verbergen der WLAN-SSID (lesen/schreiben)
* mac_filter: MAC-Filter aktivieren (lesen)
* schedule_enable: Zeitplan für Netzwerk aktivieren (lesen/schreiben)

## Credits
Dieser Adapter wäre ohne die großartige Arbeit von @stephan1827 (https://github.com/stephan18277) nicht möglich gewesen, der die Originalversionen dieses Adapters entwickelt hat.

Dank an

* [Nocilas](https://github.com/nioc), Anbieter des Connectors für die Synology-API.
* Die unzähligen Iobroker-Adapter, die ich als Vorlage verwendet habe, insbesondere [asuswrt](https://github.com/mcdhrts/ioBroker.asuswrt).

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **IN ARBEIT** -->

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