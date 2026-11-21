---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.net-tools/README.md
title: ioBroker.net-Tools
hash: SbBOsflLgBbtVCz7AMnPqhsranAWeLx49H+9DHIWcUA=
---
![Logo](../../../en/adapterref/iobroker.net-tools/admin/net-tools.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.net-tools.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.net-tools.svg)
![Anzahl der Installationen](https://iobroker.live/badges/net-tools-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/net-tools-stable.svg)
![NPM](https://nodei.co/npm/iobroker.net-tools.png?downloads=true)
![Test und Freigabe](https://github.com/jey-cee/ioBroker.net-tools/workflows/Test%20and%20Release/badge.svg)

# ioBroker.net-Tools

## net-tools-Adapter für ioBroker

Dieser Adapter fragt zyklisch konfigurierte IPs ab, kann Wake-on-LAN-Pakete senden und nach offenen Ports suchen.

Diese Erkennungsfunktion wird vom Erkennungsadapter bereitgestellt. Das bedeutet, dass die Erkennung installiert wird, falls sie noch nicht vorhanden ist, und ausgeführt werden muss. Hinweis: Diese Funktion ist auf das Subnetz des ioBroker-Hosts beschränkt.

### Wichtig: Sie benötigen eine Lizenz zur Nutzung dieses Adapters. Diese können Sie hier erwerben: <https://www.all-smart.net/produkt/iobroker-net-tools-v1-lizenz/>

### Wichtig: Für die Nutzung dieses Adapters müssen Sie eine Lizenz erwerben. Sie können hier eine kaufen -> <https://www.all-smart.net/produkt/iobroker-net-tools-v1-lizenz/>

### Automatische Erkennung

Es gibt eine automatische Suchfunktion zum Auffinden von Geräten. Diese kann auch zeitgesteuert ausgeführt werden. Hinweis: Wenn Sie ioBroker in einem Docker-Container verwenden, funktioniert diese Funktion je nach Netzwerkkonfiguration möglicherweise nicht.

### Pings konfigurierte IP-Adressen

Pings an festgelegte IP-Adressen in einem definierten Intervall werden durchgeführt und die Ergebnisse überwacht (Aktivität, Anfragen pro Sekunde, Zeit). Das Ping-Intervall kann auf Geräteebene festgelegt werden.

#### Latenz und Paketverlust

Jeder Ping sendet mehrere Pakete (Einstellung „Pakete pro Ping“ des Geräts, Standardwert 4, maximal 20). Aus den Antworten berechnet net-tools Folgendes:

| Zustand                         | Bedeutung                                                             |
| ------------------------------- | --------------------------------------------------------------------- |
| `ping`                          | Laufzeit der letzten Antwort (ms)                                     |
| `pingMin` /`pingMax` /`pingAvg` | Minimale / maximale / durchschnittliche Roundtrip-Zeit des Pings (ms) |
| `packetLoss`                    | Verlust von Ping-Paketen in Prozent                                   |

Ohne Antwort sind die Zeiten ... `null` Und `packetLoss` ist 100. Jeder Ping dauert etwa eine Sekunde pro Paket.

#### Erweiterte Erkennung (Smartphones)

Smartphones wie iPhones antworten im Standby-Modus oft nicht auf Pings und werden als offline angezeigt. Aktivieren Sie in den Geräteeinstellungen (Geräte-Manager) die Option „Erweiterte Erkennung (Smartphones)“. Falls das Gerät nicht auf den Ping antwortet, sendet net-tools ein UDP-Paket an Port 5353 und versucht eine TCP-Verbindung zu Port 62078 herzustellen. Dadurch wird das WLAN des Geräts aktiviert. Anschließend wird geprüft, ob das Gerät per ARP mit seiner MAC-Adresse antwortet. Es sind keine Root-Rechte und keine zusätzlichen Tools (wie hping3) erforderlich.

- Funktioniert nur für Geräte im Subnetz des ioBroker-Hosts (ARP durchdringt keine Router).
- Unter Linux wird der Status des ARP-Eintrags überprüft (`ip neigh` Daher werden veraltete Einträge nicht berücksichtigt. Auf anderen Systemen wird die ARP-Tabelle verwendet, die ein Gerät unter Umständen noch einige Zeit als vorhanden anzeigt, nachdem es das Netzwerk verlassen hat.
- iPhone: Stellen Sie die „Private WLAN-Adresse“ für Ihr Heimnetzwerk auf „Fest“ oder „Aus“. Bei der Einstellung „Rotierend“ ändert sich die MAC-Adresse, und das Gerät kann nicht mehr erkannt werden.

#### Dienstüberwachung (TCP-Ping)

In den Einstellungen eines Geräts (Geräte-Manager) können Sie Dienste in der Tabelle „Dienste (TCP-Ports)“ hinzufügen. Jeder Eintrag hat seine eigenen Einstellungen:

| Spalte            | Bedeutung                                                                                                                               |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Hafen             | TCP-Port des Dienstes, z. B. `80`, `443`, `1883`                                                                                         |
| Intervall (s)     | Wie oft der Port überprüft wird. Leer = Ping-Intervall des Geräts, mindestens 5 Sekunden.                                               |
| Toleranz (Fehler) | Anzahl der fehlgeschlagenen Prüfungen in Folge, die ignoriert werden, bevor der Dienst als nicht erreichbar angezeigt wird. `0` = sofort |

net-tools versucht, unabhängig vom Ping-Ergebnis eine TCP-Verbindung zum Port herzustellen (Timeout 2 s). Der Zustand `net-tools.X.<device>.services.port_<port>` Ist `true` wenn die Verbindung hergestellt wurde und `false` Nach mehr als der im Toleranzbereich festgelegten Anzahl fehlgeschlagener Prüfungen werden die Zustände der aus der Tabelle entfernten Ports gelöscht. Änderungen werden sofort wirksam.

### Wake-on-LAN

Setzen Sie das wol-Objekt auf true. Daraufhin werden 3 WOL-Pakete mit einer Pause von 750 ms an Ihr Gerät gesendet.

### Port-Scan

Sie können in der Konfiguration eine Liste von Ports oder einen Bereich eingeben, die standardmäßig gescannt werden sollen. Wenn dieses Feld leer ist, wird standardmäßig der Bereich 0–65535 verwendet. Es ist auch möglich, für jedes Gerät eine Liste oder einen Bereich anzugeben, der für einen einzelnen Scan verwendet wird.

Geben Sie optional eine Liste oder einen Bereich von Ports im Objekt „portList“ ein. Dadurch wird die Einstellung in der Konfiguration überschrieben. Setzen Sie „scan“ auf „true“, um alle offenen Ports im Bereich von 0 bis 65535 oder den in „portList“ definierten Werten zu durchsuchen. Dieser Vorgang kann einige Zeit dauern. Das Ergebnis wird im Objekt „ports“ gespeichert.

---

### iPhone

iPhones versuchen, Nutzer vor Tracking zu schützen, indem sie die MAC-Adresse ändern. Weitere Informationen dazu und wie Sie diese Funktion in privaten Netzwerken deaktivieren können, finden Sie hier: <https://support.apple.com/en-us/102509>

---

## Für Entwickler

#### Mac für bestimmtes Gerät abrufen

`sendToAsync('net-tools.X, 'getMac', 'IP ADDRESS')`

Hinweis: Diese Funktion ist auf das Subnetz des ioBroker-Hosts beschränkt.

#### Pingen Sie eine bestimmte IP-Adresse

`sendToAsync('net-tools.X, 'ping', 'IP ADDRESS')`

#### Wake-on-LAN

`sendToAsync('net-tools.x', 'wake', 'MAC ADDRESS')`

Der Befehl `'wol'` Funktioniert auch. Rückgabe `true` falls die Pakete versendet wurden.

#### Port-Scan

`sendToAsync('net-tools.x', 'portScan', { ip: 'IP ADDRESS', ports: '22,80,443' })`

`ports` ist optional; ohne diese Angabe wird die Portliste aus den Adaptereinstellungen verwendet. Gibt zurück `{ host, ports: [open ports], error? }` Die

#### Beschreibung aller Nachrichten

`sendToAsync('net-tools.x', 'help', {})`

Rücksendungen `{ help, commands }`: eine Beschreibung aller Nachrichten und Zustände, geschrieben für KI-Agenten (z. B. ioBroker.pi-agent) und Skriptautoren. `commands` listet jede Nachricht auf `write: true` Wenn es etwas ändert.

#### Blockly

Der Adapter stellt Blockly-Blöcke in der Kategorie „SendTo“ des JavaScript-Adapters bereit:

- **Ping (net-tools)** – pingt eine IP-Adresse oder einen Hostnamen an
- **Port-Scan (net-tools)** – scannt die Ports einer IP-Adresse oder eines Hostnamens
- **Wake-on-LAN (net-tools)** – sendet Wake-on-LAN-Pakete an eine MAC-Adresse
- **net-tools device** – wählt ein von net-tools gefundenes Gerät aus und gibt dessen IP- oder MAC-Adresse zurück. Kann an die IP/MAC-Eingänge der oben genannten Blöcke angeschlossen werden. Die IP-Adresse wird beim Ausführen des Skripts ausgelesen, sodass IP-Änderungen berücksichtigt werden.
- **net-tools result** – gibt Erreichbarkeit, Antwortzeit, offene Ports, Host oder Fehler des umgebenden Ping- oder Portscan-Blocks zurück. Verwenden Sie es nur innerhalb des „then“-Teils dieser Blöcke.

---

## Changelog
### **WORK IN PROGRESS**
- (@GermanBluefox) Added the message "help": a description of all messages for AI agents (e.g. pi-agent), and common.supportedMessages.help

### 1.3.0 (2026-10-11)
- (ioBroker-Bot) Adapter requires js-controller >= 6.0.11 now.
- (copilot) Adapter requires node.js >= 22 now
- (iobroker-bot) Adapter requires node.js >= 20 now.
- (Jey Cee) Migrate from oui to oui-data
- (Jey Cee) Add port scan action to device management
- (Jey Cee) Show IP address and open ports in device details
- (Jey Cee) Create quicklinks for web ports found by port scan
- (Jey Cee) Call ping.exe directly on Windows instead of using process.env (compact mode)
- (Jey Cee) Update @all-smart/all-smart-tools to 1.0.16
- (Jey Cee) Fix adapter crash when port scan runs on an offline device (#63)
- (Jey Cee) Use default port list if port list in configuration is missing or empty
- (Jey Cee) Fix sendTo commands (wake/wol, ping, getMac, addDevice, deleteDevice, updateDevice) being ignored (#71)
- (Jey Cee) Fix "Wake-on-LAN with IP" sending packets to localhost (#71)
- (Jey Cee) Wake-on-LAN: also send to the broadcast address of the device subnet, log sent packets, no endless retries on errors
- (Jey Cee) Add sendTo command portScan
- (Jey Cee) Add Blockly blocks for ping, port scan and Wake-on-LAN
- (Jey Cee) Add Blockly block to select a device found by net-tools
- (Jey Cee) Add extended detection for devices that do not answer pings while sleeping (e.g. iPhone)
- (Jey Cee) Fix changed device settings (Wake-on-LAN with IP) not being applied until restart
- (Jey Cee) Add service monitoring via TCP ping for multiple ports per device, with interval and tolerance per port
- (Jey Cee) Device settings dialog uses the available width (multi-column layout)
- (Jey Cee) Add latency (ping, min, max, avg) and packet loss per device, with configurable packets per ping
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 1.2.3 (2025-11-09)
* Change link to license

### 1.2.2 (2025-11-09)
* Fix ip and mac check while add manual new device

### 1.2.1 (2025-11-09)
* Refactor port scan

### 1.2.0 (2025-06-11)
* Added network interface information for localhost to device manager

## License
Attribution-NonCommercial 4.0 (CC BY-NC 4.0)

Copyright (c) 2025-2026 Jey Cee <iobroker@all-smart.net>

http://creativecommons.org/licenses/by-nc/4.0/

The complete license text can be found in the [LICENSE](https://github.com/Jey-Cee/ioBroker.net-tools/blob/master/LICENSE) file.

Short content:
Licensees may copy, distribute, display and perform the work and make derivative works based on it only if they give the author or licensor the credits in the manner specified by these.
Licensees may copy, distribute, display, and perform the work and make derivative works based on it only for noncommercial purposes.
(Free for non-commercial use).