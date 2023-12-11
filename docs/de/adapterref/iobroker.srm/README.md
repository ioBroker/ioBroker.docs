---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.srm/README.md
title: kein Titel
hash: Z754eEYNc+LCvrZm8MGpNvLzRr0F2kQSVxk8KV13bgI=
---
![](../../../en/adapterref/iobroker.srm/admin/synology.png)

## Inhaltsverzeichnis
- [Einführung](#Einführung)
- [Nutzung](#Nutzung)
- [Revisionsverlauf](#Revision-History)

<a name="Introduction"></a>

## Einführung
Dies ist ein iobroker-Adapter zur Verbindung mit [Synologie](https://www.synology.com/) Routern. Der Adapter nutzt die Synology API, um die Daten abzurufen. Der Adapter wurde mit der SRM-Version 1.3.1 getestet. und Router-Modell RT6600, sollte aber auch mit anderen Modellen funktionieren.

Dank an

* [Nocilas](https://github.com/nioc), der den Connector für die Synology API bereitstellt.
* Die unzähligen iobroker-Adapter, die ich als Vorlage verwendet habe, insbesondere [asuswrt](https://github.com/mcdhrts/ioBroker.asuswrt).

<a name="Requirements"></a>

## Verwendung
### Installation
Erstellen Sie eine neue Instanz des Adapters und geben Sie die IP-Adresse Ihres Routers ein. Der Port ist standardmäßig 8001. Geben Sie den Benutzernamen und das Passwort Ihres Routers ein. Stellen Sie sicher, dass der Benutzer nicht 2FA verwendet.

### Objekte
Der Adapter erstellt die folgenden Objekte:

## Router
* IPV4_IP: IP4-Adresse des Routers
* IPV4_status: Status der IPV4-Verbindung
* IPV6_IP: IP6-Adresse des Routers
* IPV6_status: Status der IPV4-Verbindung

## Geräte
JSON-Tabelle für die folgenden Gerätezustände:

* alle: Alle bekannten Geräte
* Mesh: Alle Mesh-Geräte
* online: Alle Online-Geräte
* online_ethernet: Alle über Ethernet verbundenen Online-Geräte
* Online-WLAN: Alle Online-Geräte, die über WLAN verbunden sind

Jede JSON-Tabelle enthält die folgenden Objekte für jedes Gerät:

* Verbindung: Verbindungstyp (Eternet, WLAN)
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
* is_wireless: Ist das Gerät über WLAN verbunden?
* mac: MAC-Adresse des Geräts
* mesh_node_id: ID des Mesh-Knotens
* mesh_node_name: Name des Mesh-Knotens

## Die Info
* Verbindung: Status der Verbindung zum Router

## Gittergewebe
Liste der Mesh-Knoten. Jeder Mesh-Knoten verfügt über die folgenden Objekte:

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

### Wachposten
Was ist Sentry.io und was wird an die Server dieses Unternehmens gemeldet? `Sentry.io` ist ein Dienst für Entwickler, um einen Überblick über Fehler in ihren Anwendungen zu erhalten. Und genau das ist in diesem Adapter umgesetzt.

Wenn der Adapter abstürzt oder ein anderer Codefehler auftritt, wird diese Fehlermeldung, die auch im ioBroker-Protokoll erscheint, an Sentry übermittelt. Wenn Sie der iobroker GmbH erlaubt haben, Diagnosedaten zu sammeln, ist auch Ihre Installations-ID (dies ist nur eine eindeutige ID **ohne** zusätzliche Informationen über Sie, E-Mail, Name oder ähnliches) enthalten. Dadurch kann Sentry Fehler gruppieren und anzeigen, wie viele einzelne Benutzer von einem solchen Fehler betroffen sind.

<a name="Revision-History"></a>

## Changelog
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

Copyright (c) 2023 stephan stricker <stephan.stricker@outlook.com>

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