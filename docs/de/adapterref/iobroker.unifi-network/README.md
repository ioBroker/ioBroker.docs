---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.unifi-network/README.md
title: ioBroker.unifi-network
hash: K0yyQgCkjgvZosbOxzd5r9leu47BkOSV9lKtPgVGp7g=
---
![Logo](../../../en/adapterref/iobroker.unifi-network/admin/unifi-network.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.unifi-network.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.unifi-network.svg)
![Anzahl der Installationen](https://iobroker.live/badges/unifi-network-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/unifi-network-stable.svg)
![NPM](https://nodei.co/npm/iobroker.unifi-network.png?downloads=true)
![Test und Freigabe](https://github.com/Scrounger/ioBroker.unifi-network/workflows/Test%20and%20Release/badge.svg)

# ioBroker.unifi-network

## UniFi-Netzwerkadapter für ioBroker

Unifi Network nutzt die WebSocket-Schnittstelle, um Echtzeitinformationen von der Unifi-Netzwerk-Anwendung zu empfangen.

## Wichtig

1. Der Adapter wurde ausschließlich auf Basis des UniFi OS entwickelt. Kompatibilität mit einem selbst gehosteten Netzwerkcontroller ist zwar gegeben, kann aber nicht garantiert werden.

2. **Dieser Adapter kann sehr ressourcenintensiv sein!**<br> Dies hängt von Ihrer Umgebung ab, d. h. von der Anzahl der UniFi-Geräte und Clients in Ihrem Netzwerk. Dies lässt sich teilweise über die Echtzeit-API beeinflussen.`debounce time [s]` Dieser Parameter befindet sich in den Adaptereinstellungen. Echtzeitereignisse werden von dieser Einstellung nicht beeinflusst, sondern nur die „zyklische“ Echtzeitaktualisierung von Geräten, Clients usw.

3. **Nicht alle Zustände sind direkt verfügbar, nachdem der Adapter gestartet wurde.**<br> Zustände werden nur erstellt und aktualisiert, wenn die Daten vom Netzwerkcontroller gesendet werden; dies kann einige Zeit dauern, bis die Daten zum ersten Mal gesendet werden.

## Konfiguration

### Lokaler Benutzer (UniFi OS)

Sie benötigen einen lokalen Benutzer, der in Ihrer UniFi OS-Konsole erstellt wurde, um sich anzumelden. Ubiquiti SSO Cloud-Benutzer funktionieren nicht. Es wird empfohlen, den Administrator oder einen Benutzer mit vollständigen Lese-/Schreibrechten zu verwenden, um die Integration optimal zu nutzen; dies ist jedoch nicht zwingend erforderlich.

1. Melden Sie sich auf Ihrem UniFi OS-Gerät im lokalen Portal an und klicken Sie auf Benutzer.\
   &#x20;**Hinweis** : Dies **muss** über das UniFi-Betriebssystem erfolgen, indem Sie direkt über die IP-Adresse (z. B. 192.168.1.1) darauf zugreifen, nicht über unifi.ui.com oder innerhalb der UniFi Network App.

2. Gehen Sie im Menü auf der linken Seite zu **„Admins & Benutzer“** und wählen Sie die Registerkarte „Admins“ aus oder gehen Sie zu \[IP-Adresse]/admins/ (z. B. 192.168.1.1/admins/).

3. Klicken Sie oben rechts auf das Pluszeichen **(+)** und wählen Sie **„Administrator hinzufügen“** .

4. Wählen Sie **„Nur lokalen Zugriff“** und geben Sie einen neuen Benutzernamen und ein neues Passwort ein.

5. Wählen Sie für die Netzwerkrolle **„Hotspot-Operator“** und **„Standortadministrator“** aus.\
   &#x20;**Hinweis:** Dies ist nicht unbedingt erforderlich. Sollten die Berechtigungen nicht ausreichen, werden Sie per Protokollmeldung benachrichtigt.

![Bildinformationen](../../../en/adapterref/iobroker.unifi-network/doc/config_local_user.png)

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
- (Scrounger) channel / device name undefined bug fix #116
- (Scrounger) vpn client handling optimized
- (Scrounger) event messages improved #122 #115

### 1.5.0 (2026-06-23)

- (Scrounger) vpn event handler for network >= 10.3.x added #89
- (Scrounger) event messages improved #109, #91
- (Scrounger) typescript 6.x bug fixes
- (Scrounger) dependencies updated
- (ioBrokerTranslator) spanish language added #98
- (Scrounger) bug fix for expired token since v10.4.57 #108
- (copilot) Adapter requires node.js >= 22 now

### 1.4.0 (2026-04-08)

- (Scrounger) bug fix for speed test event spamming since v.10.2.105
- (Scrounger) event messages improved #68 #54
- (Scrounger) dependencies updated
- (Scrounger) support for Unifi OS on custom port added (e.g. UniFi OS Server) #65
- (Scrounger) bug fix: vpn is wrongly shown as lan
- (Scrounger) system informations added #63
- (Scrounger) port states up, rx/tx error and rx/tx dropped added
- (Scrounger) event messages improved #64
- (Scrounger) read controller version added #59
- (Scrounger) option to set debug level for client connection events added #61
- (Scrounger) property version for devices added
- (Scrounger) satisfaction object create condition removed to prevent create and deletion of object
- (Scrounger) event messages for dream machines compatibility < v10.x added #72
- (Scrounger) weblate translation added
- (Scrounger) downgrade @iobroker/adapter-core to v3.3.1 to prevent conflicts with js-controller < v7.1.0 in rare cases #56

### 1.3.1 (2025-12-01)

- (Scrounger) null bug fix #48
- (Scrounger) dependencies updated
- (Scrounger) event messages improved #46
- (Scrounger) bug fixes

### 1.3.0 (2025-11-24)

- (Scrounger) event messages improved #46
- (Scrounger) option to change tx power mode of access point channels
- (Scrounger) dependencies updated
- (Scrounger) code optimized
- (Scrounger) logging optimized

### 1.2.2 (2025-11-14)

- (Scrounger) delete device event added
- (Scrounger) event messages improved #43

[Older changelogs can be found there](https://github.com/Scrounger/ioBroker.unifi-network/blob/main/CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2025-2026 Scrounger <scrounger@gmx.net>

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