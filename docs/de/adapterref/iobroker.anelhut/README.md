---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.anelhut/README.md
title: ioBroker.anelhut
hash: Tt3XZOsTupdqnAYaTHo7nssjzMRY++Zk6YfQzQ/8Rq4=
---
![Logo](../../../en/adapterref/iobroker.anelhut/admin/anelhut.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.anelhut.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.anelhut.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/anelhut-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/anelhut-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/dan1-de/iobroker.anelhut.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/dan1-de/ioBroker.anelhut/badge.svg)
![NPM](https://nodei.co/npm/iobroker.anelhut.png?downloads=true)
![Test und Freigabe](https://github.com/dan1-de/ioBroker.anelhut/workflows/Test%20and%20Release/badge.svg)

# ioBroker.anelhut

## anelhut Adapter für ioBroker

Adapter für die NET-PwrCrtl-Geräte der ANEL Electronic AG. Hersteller: <https://shop.anel.eu/>

## Dieser Adapter ist mit folgenden Anel-Geräten kompatibel:

- NET-PwrCtrl HUT
- NET-PwrCtrl IO
- HEIM
- PRO
- LEISTUNG
- ADV

## Verwendung

- Adapter installieren

- Geräte konfigurieren

  - Aktivieren Sie die UDP-Kommunikation auf Ihrem Anel-Gerät.
  - Geben Sie die Eigenschaften Ihres Anel-Geräts ein.

    - Gerätename: Benutzerdefinierter Name Ihres Geräts. Dieser Name wird verwendet, um das Gerät in der Objektliste anzuzeigen. Beispiel: anelhut.0.Gerätename
    - Geräte-IP: IP-Adresse Ihres Geräts (bitte keinen Hostnamen verwenden)
    - UDPSendPort: Geben Sie den Port ein, der in der Weboberfläche Ihres Anel-Geräts angezeigt wird. Dies ist der Empfangsport aus Sicht des Anel-Geräts (Standard: 75).
    - UDPRecievePort: Geben Sie den Port ein, der in der Weboberfläche Ihres Anel-Geräts angezeigt wird. Dies ist der Sendeport aus Sicht des Anel-Geräts (Standard: 77).
    - XOR-Benutzer & Passwort: Standardmäßig deaktiviert. Für mehr Sicherheit können Sie die XOR-Verschlüsselung von Benutzername und Passwort aktivieren. Nicht alle Anel-Geräte unterstützen XOR-Benutzer & Passwort. Bitte prüfen Sie vor der Aktivierung dieser Funktion, ob Ihr Gerät diese Funktion unterstützt. Sie können dies in der erstellten Objektstruktur überprüfen (Gerät -> Allgemein -> XOR\_USER\_Password). Wenn der Wert „true“ lautet, wird XOR-Benutzer & Passwort von Ihrem Gerät unterstützt.

    Wichtiger Hinweis: Wenn Sie mehrere Geräte steuern möchten, verwenden Sie bitte für jedes Gerät einen anderen Empfangsport. Sie können beispielsweise Port 77 für das erste Gerät, Port 78 für das zweite, Port 79 für das dritte usw. verwenden. Wenn Sie nur ein Gerät verwenden, können Sie den Standardport 77 nutzen. Als Sendeport kann für alle Geräte der Standardport 75 verwendet werden. Sie können die Ports in der Weboberfläche des Geräts ändern.

- Docker
  - Vergessen Sie nicht die Portweiterleitung, wenn Sie diesen Adapter in einer Docker-Umgebung verwenden möchten:
    - 77:77/udp #Portweiterleitung erstes analoges Gerät
    - 78:78/udp #Portweiterleitung zweites analoges Gerät
  - Ein funktionierendes docker-compose-Beispiel finden Sie in diesem Repository (examples/docker-compose.yml).

## Notiz

Dieser Adapter wurde mit allen Anel-Geräten getestet. Vielen Dank an den Anel-Entwickler! Bitte melden Sie alle auftretenden Probleme.

## Bekannte Probleme

### NET-PwrCtrl PRO

Bitte verwenden Sie die neueste Firmware (4.2). Sie können sie unter <https://de.anel.eu/index.htm?src=support/hut/hut.htm> herunterladen.

## Changelog

### 1.0.15

-   (dan1-de) Bugfix for new jscontroller 5

### 1.0.14

-   (dan1-de) Added new Logs messages for Relais Switch Command in Debug Mode

### 1.0.13

-   (dan1-de) Improved error message for user/password missing. Added new Testcase for Message decode of NET-PWRCTRL_07.1

### 1.0.12

-   (dan1-de) Cosmetic change in index_m.html

### 1.0.11

-   (dan1-de) Implemented fix for Relais Status "You are assigning a number to the state which expects a boolean" Github issue/26

### 1.0.10

-   (dan1-de) Implemented XOR User/Password encryption; improved logging/log levels;

### 1.0.9

-   (dan1-de) Corrected bug for Pro v3

### 1.0.8

-   (dan1-de) Quick Fix: Corrected bug in io control

### 1.0.7

-   (dan1-de) Added possibility to control IO's; Code restructure

### 1.0.6

-   (dan1-de) Fixed issues with sensor; display only 3 relais at anel home device; display type code instead of only letter; fixed temperature

### 1.0.4

-   (dan1-de) New Icon; Improved object structure

### 1.0.3

-   (dan1-de) Improvements: logging, udp broadcast adress, configuration

### 1.0.0

-   (dan1-de) initial release

## License

MIT License

Copyright (c) 2023 dan1-de dan1-de@gmx.de

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