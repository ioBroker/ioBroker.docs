---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.unifi-network/README.md
title: ioBroker.unifi-Netzwerk
hash: hO/Usw4gISR0Mq4L5WELhWY8t4hA2lTLct4tFu7Q5/4=
---
![Logo](../../../en/adapterref/iobroker.unifi-network/admin/unifi-network.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.unifi-network.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.unifi-network.svg)
![Anzahl der Installationen](https://iobroker.live/badges/unifi-network-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/unifi-network-stable.svg)
![NPM](https://nodei.co/npm/iobroker.unifi-network.png?downloads=true)

# IoBroker.unifi-Netzwerk
**Tests:** ![Testen und Freigeben](https://github.com/Scrounger/ioBroker.unifi-network/workflows/Test%20and%20Release/badge.svg)

## Unifi-Netzwerkadapter für ioBroker
Unifi Network verwendet die WebSocket-Schnittstelle, um Echtzeitinformationen von der Unifi-Network-Anwendung zu empfangen

## Wichtig
1. Der Adapter wird ausschließlich auf Basis des UniFi OS entwickelt. Die Kompatibilität mit einem selbstgehosteten Netzwerkcontroller sollte gegeben sein, kann aber nicht garantiert werden.

2. **Dieser Adapter kann sehr ressourcenintensiv sein!**<br> Dies hängt von Ihrer Umgebung ab, d. h. davon, wie viele Unifi-Geräte und Clients sich in Ihrem Netzwerk befinden. Dies kann über den Parameter „Debounce Time [s]“ der Echtzeit-API in den Adaptereinstellungen etwas beeinflusst werden. Echtzeit-Ereignisse sind von dieser Einstellung nicht betroffen, nur die „zyklische“ Echtzeit-Aktualisierung von Geräten, Clients usw.

3. **Nicht alle Zustände sind direkt nach dem Start des Adapters verfügbar**<br> Zustände werden erst erstellt und aktualisiert, wenn die Daten vom Netzwerkcontroller gesendet werden. Dies kann einige Zeit dauern, bis die Daten zum ersten Mal gesendet werden

## Konfiguration
### Lokaler Benutzer (UniFi OS)
Sie benötigen einen lokalen Benutzer, der in Ihrer UniFi OS-Konsole erstellt wurde, um sich anzumelden. Ubiquiti SSO Cloud-Benutzer funktionieren nicht. Es wird empfohlen, den Administrator oder einen Benutzer mit vollem Lese-/Schreibzugriff zu verwenden, um die Integration optimal zu nutzen. Dies ist jedoch nicht erforderlich.

1. Melden Sie sich auf Ihrem UniFi OS-Gerät bei Ihrem lokalen Portal an und klicken Sie auf „Benutzer“.

**Hinweis**: Dies **muss** vom UniFi-Betriebssystem aus erfolgen, indem Sie direkt über die IP-Adresse (z. B. 192.168.1.1) darauf zugreifen, nicht über unifi.ui.com oder innerhalb der UniFi Network-App.

2. Gehen Sie im Menü auf der linken Seite zu **Admins & Benutzer** und wählen Sie die Registerkarte „Admins“ oder gehen Sie zu [IP-Adresse]/admins/ (z. B. 192.168.1.1/admins/).

3. Klicken Sie oben rechts auf **+** und wählen Sie **Administrator hinzufügen**.

4. Wählen Sie **Nur auf lokalen Zugriff beschränken** und geben Sie einen neuen Benutzernamen und ein neues Passwort ein.

5. Wählen Sie **Hotspot-Operator** und **Site-Admin** für die Netzwerkrolle.

**Hinweis** Dies ist nicht zwingend notwendig, falls die Berechtigungen nicht ausreichen, wirst du per Log-Meldung informiert

![Bildinformationen](../../../en/adapterref/iobroker.unifi-network/doc/config_local_user.png)

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.1.7 (2025-10-19)

- (Scrounger) event 'UpgradeScheduled' added to ignore list
- (DEV2DEV-DE) german translation updated

### 1.1.6 (2025-10-08)

- (Scrounger) dependencies updated #22
- (Scrounger) firewall channel added #29
- (Scrounger) bug fix #28

### 1.1.5 (2025-10-06)

- (Scrounger) check site exist on self hosted controller
- (Scrounger) login bug fixes #27

### 1.1.4 (2025-10-06)

- (Scrounger) logging improved
- (Scrounger) auto detect UniFi OS or self hosted controller
- (Scrounger) auto translation bug fix
- (Scrounger) image downloading improved
- (Scrounger) bug fixes

### 1.1.3 (2025-10-03)

- (Scrounger) login bug fix for self hosted controllers v9.x.x

### 1.1.2 (2025-10-02)

- (Scrounger) login bug fix for self hosted controllers
- (Scrounger) dependencies updated
- (Scrounger) bug fixes

### 1.1.1 (2025-09-30)

- (Scrounger) bug fixes
- (Scrounger) roles added
- (Scrounger) reponsiv adapter config implemented

### 1.1.0 (2025-09-21)

- (Scrounger) dependencies updated
- (Scrounger) check adapter settings for timeout and interval implemented
- (Scrounger) translation optimized
- (Scrounger) bug fixes

### 1.1.0-beta.0 (2025-09-03)

- (Scrounger) replaced fetch with undici
- (Scrounger) firewall group added
- (Scrounger) more network events handler added
- (Scrounger) bug fixes

### 1.0.0-beta.0 (2025-04-25)

- (Scrounger) initial release

## License

MIT License

Copyright (c) 2025 Scrounger <scrounger@gmx.net>

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