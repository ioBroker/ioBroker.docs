---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.anelhut/README.md
title: ioBroker.anelhut
hash: qHBX938Mot0bWfSeEQ4Kd+eulVmZYcY0xj3AYvIKCvg=
---
![Logo](../../../en/adapterref/iobroker.anelhut/admin/anelhut.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.anelhut.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.anelhut.svg)
![Anzahl der Installationen (spätestens)](http://iobroker.live/badges/anelhut-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/anelhut-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/dan1-de/iobroker.anelhut.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/dan1-de/ioBroker.anelhut/badge.svg)
![NPM](https://nodei.co/npm/iobroker.anelhut.png?downloads=true)

#ioBroker.anelhut
**Tests:** ![Testen und freigeben](https://github.com/dan1-de/ioBroker.anelhut/workflows/Test%20and%20Release/badge.svg)

## Anelhut-Adapter für ioBroker
Adapter für die NET-PwrCrtl-Geräte der ANEL Electronic AG.
Hersteller: https://shop.anel.eu/

## Dieser Adapter funktioniert mit den folgenden Anel-Geräten:
- NET-PwrCtrl HUT
- NET-PwrCtrl IO
-   HEIMAT
-   PROFI
-   ENERGIE
- ADV

## Verwendungszweck
- Adapter installieren

- Geräte konfigurieren

    - Aktivieren Sie die UDP-Kommunikation auf Ihrem Anel-Gerät
    - Geben Sie die Eigenschaften Ihres Anel-Geräts ein

        - DeviceName: Benutzerdefinierter Name Ihres Geräts. Dieser Name wird verwendet, um das Gerät in der Objektliste anzuzeigen. Beispiel: anelhut.0.DeviceName
        - DeviceIP: IP-Adresse Ihres Gerätes (bitte keinen Hostnamen verwenden)
        - UDPSendPort: Geben Sie den Port ein, der im Webinterface Ihres Anel-Geräts angezeigt wird. Dies ist der Empfangsport aus der Sicht des Anel-Geräts (Standard: 75).
        - UDPRecievePort: Geben Sie den Port ein, der im Webinterface Ihres Anel-Geräts angezeigt wird. Dies ist der Sendeport aus Sicht des anel-Geräts (Standard: 77).

Wichtiger Hinweis: Wenn Sie mehrere Geräte steuern möchten, verwenden Sie bitte für jedes Gerät einen anderen Empfangsport.
Sie können beispielsweise Port 77 für das erste Gerät und 78 für das zweite und 79 für das dritte verwenden und so weiter.
Wenn Sie nur ein Gerät verwenden, können Sie den Standardport 77 verwenden.
Als Sendeport kann für alle Geräte der Standardport 75 verwendet werden.
Sie können die Ports auf der Weboberfläche des Geräts ändern.

- Docker
    - Vergessen Sie nicht die Portweiterleitung, wenn Sie diesen Adapter mit einer Docker-Umgebung verwenden möchten:
        - 77:77/udp #portweiterleitung erstes anel gerät
        - 78:78/udp #Portweiterleitung zweites anel-Gerät

## Notiz
Dieser Adapter wurde mit allen Anel-Geräten getestet. Danke an den anel-Entwickler :).
Bitte melden Sie alle Probleme.

## Changelog

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

Copyright (c) 2021 dan1-de <dan1-de@gmx.de>

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