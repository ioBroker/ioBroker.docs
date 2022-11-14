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
title: **Konfiguration**
hash: dfVQu1onk5GZrjjfwS/zm9lJvc7qy6w2j6crpfH8rgY=
---
# **Konfiguration**
- [Initial-Start-up](#initial-start-up) Erstmaliger Zugriff auf das Gerät
- [Adapter einrichten](#door-access-controllers-settings) Richten Sie den ioBroker-Adapter ein
  - [TCP/IP-Netzwerkeinstellungen] (#tcpip-network-settings) Richten Sie das Adapternetzwerk ein
  - [Controller-Einstellungen] (#controllers-settings) Geräteeinrichtung
    - [Sendung](#Sendung)
      - [Seriennummer](#Seriennummer)
    - [Einrichtung eines dedizierten Netzwerks](#dedicated-network-setup)
      - [Seriennummer](#Seriennummer)
      - [Netzwerkadresse des Geräts] (#device-network-address)
      - [Hostadresse des exponierten Servers](#exposed-server-host-address)
      - [Exposed Server Host-Port](#exposed-server-host-port)

## **Erstinbetriebnahme**
Wenn Sie das Gerät zum ersten Mal anschließen, kann es hilfreich sein, die Netzwerkdaten einzugeben.

Diese Schritte sind optional und nur erforderlich, um das Gerät in einem anderen, entfernten Netzwerk außerhalb des lokalen Netzwerks der ioBroker-Instanz zu verwenden

* Um dies zu tun...
  - Verbinden Sie das Gerät mit demselben Netzwerk, in dem sich auch ioBroker befindet. Kein Docker, VPN oder anderes Subnetz. [^1]
  - Installieren und starten Sie den Adapter mit den Standardeinstellungen.
  - Rufen Sie die Konfiguration auf und wechseln Sie auf die Registerkarte "Device Remote Setup".
  - Führen Sie den Gerätescan durch.

![Schaltfläche Gerätescan](../../../en/adapterref/iobroker.wiegand-tcpip/images/device-scan.png) Es gibt zwei mögliche Fehlermeldungen, die dazu führen, dass keine Geräte gefunden werden[^3], [^4]

  - Wenn Sie mehr als ein Gerät aktiv haben, wählen Sie das gewünschte im Dropdown-Feld "Geräte-ID" aus.
  - Tragen Sie die gewünschten Adressdaten in die entsprechenden Eingabefelder ein[^2]
  - Installieren Sie nun das Gerät im Zielnetzwerk

## **Türzugangs-Controller-Einstellungen**
### **TCP/IP-Netzwerkeinstellungen**
#### **Netzwerkschnittstelle**
Wählen Sie aus der Liste den Netzwerk-Hostadapter aus, mit dem Sie Ihr Gerät verbunden haben. [^2]

- Sonderadressen
  - `0.0.0.0` Alle verfügbaren Schnittstellen (Standard)
  - `127.0.0.1` Nur lokales Host-Netzwerk (für den [Simulator](https://github.com/uhppoted/uhppote-simulator))
  - Alle anderen können verwendet werden, wenn Sie wissen, was Sie wollen. z.B. VPN, Docker usw.

#### **Absender-Port**
Default ist 60000. Ohne Fehlermeldung aus dem Netz braucht man das nicht zu ändern.

#### **Empfänger-Port**
Default ist 60001. Ohne Fehlermeldung aus dem Netz braucht man das nicht zu ändern.
Ich habe Port 60099 für den Adapter neu definiert. Wenn etwas nicht funktioniert, ändern Sie dies auf die Standardeinstellung zurück.

#### **Verbindungszeitüberschreitung in Millisekunden**
Standard ist 2500 (2,5 Sekunden).
Timeout für jegliche Kommunikation über das Netzwerk.
Nicht ohne Rücksprache wechseln.
Werte unter 1000 und über 10000 können vorerst funktionieren, führen aber im realen Betrieb immer zu Fehlern.

#### **Heartbeat-Intervall in Millisekunden**
Standard ist 300000 (300 Sekunden == 5 Minuten).
Zeit zwischen zwei Versuchen, eine Standardverbindung zum Gerät herzustellen, um zu entscheiden, ob es aktiv ist.
Werte unter 60000 und über 900000 können unerwünschte Nebenwirkungen verursachen, die schwer zu analysieren sind.

#### **Maximale Zeitabweichung in Millisekunden**
Standard ist 60000 (60 Sekunden == 1 Minute) Maximale Zeitabweichung in Millisekunden.
Ist die Abweichung größer, wird die Regleruhr neu kalibriert.
Werte unter 1200 Millisekunden werden ignoriert und die Kalibrierung abgeschaltet.

#### **Low-Level-Debugging**
Standard aus. Wenn aktiviert, wurde die rohe Netzwerkkommunikation im Debug-Protokoll protokolliert.
Keine Änderung ohne Anfrage eines Entwicklers erforderlich.

### **Controller-Einstellungen**
Geräteeinrichtung für Hin- und Rückkanal über das Netzwerk.
Verwenden Sie das **+ / hinzufügen** und den **Papierkorb** pro verfügbarem Gerät.
Für die Kommunikation zwischen dem Host (ioBroker) und dem Gerät gibt es zwei Möglichkeiten.
Eingeschränkte Broadcast- und dedizierte Netzwerkkonfiguration (Unicast & Directed Broadcast). [^7]

#### **Seriennummer**
Die Seriennummer Ihres Geräts.

#### **Modelltyp**
Geben Sie das Türmodell ein

#### **Eingeschränkte Übertragung** [^7]
Fügen Sie nur die Seriennummer und den Modelltyp hinzu und keine weiteren Adress-/Netzwerkdaten.
>In diesem Fall müssen sich alle Komponenten im selben Subnetz befinden.
>Dazu gehören sowohl der Sender (Controller) als auch der Empfänger (ioBroker).
>Dies ist an der gleichen Gateway-Adresse und Netzmaske auf beiden Komponenten zu erkennen.

>Verwenden Sie in allen anderen Fällen IMMER "dediziertes Netzwerk-Setup".

#### **Dedizierte Netzwerkeinrichtung (Unicast & Directed Broadcast)** [^7]
Bitte geben Sie alle Adressdaten ein...

#### **Netzwerkadresse des Geräts** [^7]
Die öffentlich bekannte IP-Adresse (Unicast) des Geräts im Remotenetzwerk. [^2] [^8]

#### **Offengelegte Serverhostadresse** [^7]
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