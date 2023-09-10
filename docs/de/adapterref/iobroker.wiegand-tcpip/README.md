---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.wiegand-tcpip.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.wiegand-tcpip.svg
BADGE-Number of Installations: https://iobroker.live/badges/wiegand-tcpip-installed.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/wiegand-tcpip-stable.svg
BADGE-Dependency Status: https://img.shields.io/david/kbrausew/iobroker.wiegand-tcpip.svg
BADGE-NPM: https://nodei.co/npm/iobroker.wiegand-tcpip.png?downloads=true
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.wiegand-tcpip/README.md
title: **Aufstellen**
hash: dfVQu1onk5GZrjjfwS/zm9lJvc7qy6w2j6crpfH8rgY=
---
# **Aufstellen**
- [Initial start-up](#initial-start-up) Erstmaliger Zugriff auf das Gerät
- [Adapter einrichten](#door-access-controllers-settings) Richten Sie den ioBroker-Adapter ein
  - [TCP/IP-Netzwerkeinstellungen](#tcpip-network-settings) Richten Sie das Adapternetzwerk ein
  - [Controller-Einstellungen](#controllers-settings) Geräteeinrichtung
    - [Broadcast](#broadcast)
      - [Seriennummer](#serial-number)
    - [Dediziertes Netzwerk-Setup](#dedicated-network-setup)
      - [Seriennummer](#serial-number)
      - [Gerätenetzwerkadresse](#device-network-address)
      - [Offengelegte Server-Host-Adresse](#exposed-server-host-address)
      - [Offengelegter Server-Host-Port](#exposed-server-host-port)

## **Erstinbetriebnahme**
Wenn Sie das Gerät zum ersten Mal anschließen, kann es sinnvoll sein, die Netzwerkdaten einzugeben.

Diese Schritte sind optional und nur erforderlich, um das Gerät in einem anderen, entfernten Netzwerk außerhalb des lokalen Netzwerks der ioBroker-Instanz zu verwenden

* Um dies zu tun...
  - Verbinden Sie das Gerät mit demselben Netzwerk, in dem sich auch ioBroker befindet. Kein Docker, VPN oder anderes Subnetz. [^1]
  - Installieren und starten Sie den Adapter mit den Standardeinstellungen.
  - Gehen Sie zur Konfiguration und wechseln Sie zur Registerkarte „Device Remote Setup“.
  - Führen Sie den Gerätescan durch.

![Schaltfläche Gerätescan](../../../en/adapterref/iobroker.wiegand-tcpip/images/device-scan.png) Es gibt zwei mögliche Fehlermeldungen, die dazu führen, dass keine Geräte gefunden werden[^3], [^4]

  - Wenn mehr als ein Gerät aktiv ist, wählen Sie das gewünschte Gerät im Dropdown-Feld „Geräte-ID“ aus.
  - Tragen Sie die gewünschten Adressdaten in die entsprechenden Eingabefelder ein[^2]
  - Installieren Sie nun das Gerät im Zielnetzwerk

## **Einstellungen für Türzugangscontroller**
### **TCP/IP-Netzwerkeinstellungen**
#### **Netzwerkschnittstelle**
Wählen Sie aus der Liste den Netzwerk-Host-Adapter aus, mit dem Sie Ihr Gerät verbunden haben. [^2]

- Spezielle Adressen
  - „0.0.0.0“ Alle verfügbaren Schnittstellen (Standard)
  - „127.0.0.1“ Nur lokales Hostnetzwerk (für den [Simulator](https://github.com/uhppoted/uhppote-simulator))
  - Alle anderen können verwendet werden, wenn Sie wissen, was Sie wollen. z.B. VPN, Docker usw...

#### **Absender-Port**
Der Standardwert ist 60000. Ohne Fehlermeldung vom Netzwerk besteht keine Notwendigkeit, dies zu ändern.

#### **Empfänger-Port**
Der Standardwert ist 60001. Ohne Fehlermeldung vom Netzwerk besteht keine Notwendigkeit, dies zu ändern.
Ich habe Port 60099 für den Adapter neu definiert. Wenn etwas nicht funktioniert, ändern Sie dies wieder auf die Standardeinstellung.

#### **Verbindungs-Timeout in Millisekunden**
Der Standardwert ist 2500 (2,5 Sekunden).
Timeout für jegliche Kommunikation über das Netzwerk.
Ändern Sie nicht ohne Rücksprache.
Werte unter 1000 und über 10000 können vorerst funktionieren, führen aber im realen Betrieb immer zu Fehlern.

#### **Heartbeat-Intervall in Millisekunden**
Der Standardwert ist 300000 (300 Sekunden == 5 Minuten).
Zeit zwischen zwei Versuchen, eine Standardverbindung zum Gerät herzustellen, um zu entscheiden, ob es aktiv ist.
Werte unter 60.000 und über 900.000 können unerwünschte Nebenwirkungen verursachen, die schwer zu analysieren sind.

#### **Maximale Zeitabweichung in Millisekunden**
Der Standardwert ist 60000 (60 Sekunden == 1 Minute). Maximale Zeitabweichung in Millisekunden.
Ist die Abweichung größer, wird die Regleruhr neu kalibriert.
Werte unter 1200 Millisekunden werden ignoriert und die Kalibrierung wird abgeschaltet.

#### **Low-Level-Debug**
Standardmäßig deaktiviert. Wenn aktiviert, wurde die rohe Netzwerkkommunikation im Debug-Protokoll protokolliert.
Keine Änderung ohne Anfrage eines Entwicklers erforderlich.

### **Controller-Einstellungen**
Geräteeinrichtung für Vorwärts- und Rückwärtskanal über das Netzwerk.
Verwenden Sie **+ / Hinzufügen** und den **Papierkorb** pro verfügbarem Gerät.
Für die Kommunikation zwischen dem Host (ioBroker) und dem Gerät gibt es zwei Möglichkeiten.
Begrenzter Broadcast und dedizierter Netzwerkaufbau (Unicast & Directed Broadcast). [^7]

#### **Seriennummer**
Die Seriennummer Ihres Geräts.

#### **Modelltyp**
Geben Sie das Türmodell ein

#### **Eingeschränkte Ausstrahlung** [^7]
Fügen Sie nur die Seriennummer und den Modelltyp und keine weiteren Adress-/Netzwerkdaten hinzu.
>In diesem Fall müssen sich alle Komponenten im gleichen Subnetz befinden.
>Dazu gehören sowohl der Sender (Controller) als auch der Empfänger (ioBroker).
>Erkennbar ist dies an der gleichen Gateway-Adresse und Netzwerkmaske auf beiden Komponenten.

>In allen anderen Fällen verwenden Sie IMMER die „dedizierte Netzwerkeinrichtung“.

#### **Dedizierte Netzwerkeinrichtung (Unicast und Directed Broadcast)** [^7]
Bitte geben Sie alle Adressdaten ein...

#### **Netzwerkadresse des Geräts** [^7]
Die öffentlich bekannte IP-Adresse (Unicast) des Geräts im Remote-Netzwerk. [^2] [^8]

#### **Offengelegte Server-Host-Adresse** [^7]
Die öffentlich bekannte IP-Adresse (Unicast) der ioBroker-Instanz im Remote-Netzwerk. [^2] [^8]

#### **Offengelegter Server-Host-Port** [^7]
Der öffentlich bekannte IP-Port der ioBroker-Instanz im Remote-Netzwerk nach NAT [^5] und Docker-Exposed [^6] .

[^1]: If you are unable to connect the device to the same local network as the ioBroker instance,

  Sie müssen die IP-Adressen auf andere Weise festlegen

[^2]: The device only allows IPv4 addresses.

[^3]: ![Error message: No Device found](../../../en/adapterref/iobroker.wiegand-tcpip/images/no-devices-found.png)

[^4]: ![Error message: Adapter not started](../../../en/adapterref/iobroker.wiegand-tcpip/images/adapter-not-run.png)

[^5]: [NAT RFC#2663](https://datatracker.ietf.org/doc/html/rfc2663)

[^6]: [Docker CLI: Port](https://docs.docker.com/engine/reference/commandline/port/)

[^7]: ![Network Setup](../../../en/adapterref/iobroker.wiegand-tcpip/images/network-setup.png)

[^8]: You can replace the "Unicast Address" with the "Directed Broadcast Address" in the configuration.

## Changelog
[Changelog](CHANGELOG.md)

## License
GPL-3.0-only