---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.victron-cerbo/README.md
title: ioBroker Victron Cerbo
hash: 4GamJ7PCeP6dCYznEVNNOIiLTjNxS1145UhK0McuAC8=
---
![Logo](../../../en/adapterref/iobroker.victron-cerbo/admin/victron-cerbo.svg)

![Anzahl der Installationen](https://iobroker.live/badges/victron-cerbo-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.victron-cerbo.svg)
![Test und Freigabe](https://github.com/ioBroker/ioBroker.victron-cerbo/workflows/Test%20and%20Release/badge.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.victron-cerbo.svg)

# ioBroker Victron Cerbo

## Beschreibung

Dieser Adapter verbindet Victron Cerbo GX-Geräte über MQTT mit ioBroker.

Der Victron Cerbo GX ist eine fortschrittliche Überwachungs- und Steuerungszentrale für Victron Energy-Systeme, einschließlich Solarladegeräte, Batteriemonitore, Wechselrichter und andere Energiekomponenten.

## Konfiguration

- **IP** : IP-Adresse des MQTT-Brokers
- **Port** : MQTT-Broker-Port (Standard: 1883)
- **Benutzername/Passwort** : MQTT-Authentifizierungsdaten
- **Client-Timeout** : Timeout in Sekunden für MQTT-Clientverbindungen

## Web-Oberfläche von Cerbo

Die Weboberfläche von Cerbo (GUI v2, `http://<cerbo>/gui-v2/`) kann über ioBroker, hinter dem ioBroker-Login und auch mit HTTPS oder über den Fernzugriff von ioBroker geöffnet werden:

- **Registerkarte „Admin“** : Der Adapter startet einen kleinen Webserver (Standardeinstellung). `127.0.0.1:8098`), und Admin (>= 8.2.1) übergibt die Registerkarte `Victron Cerbo GX` weiter unten `/proxy/victron-cerbo.0/` Nur Administratoren können es öffnen. `127.0.0.1` Es genügt, wenn der Administrator auf demselben Host läuft; andernfalls wählen Sie eine Adresse, die der Administrator-Host erreichen kann.
- **ioBroker.web** : Wählen Sie in den Einstellungen eine Webinstanz aus, und Cerbo ist erreichbar unter `http://<iobroker>:8082/victron-cerbo.0/`, ohne eigenen Hafen.

GUI v2 verbindet sich mit dem MQTT-Websocket im Stammverzeichnis des Hosts (`/websocket-mqtt` Der Adapter überschreibt diese Adresse auf der Seite, sodass die Verbindung über denselben Pfad hergestellt wird.

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

## Changelog
### 1.0.2 (2026-11-05)
- (copilot) Adapter requires node.js >= 22.19.0 now
- (@GermanBluefox) ioBroker.web can stop the web extension and start it again with new settings instead of restarting itself (`supportsHotReload`, with a version of web that supports it). When it is stopped, the web extension now also closes the connections of GUI v2 to the Cerbo

### 1.0.1 (2026-10-15)
* (@GermanBluefox) Fixed: the keepalive no longer makes the Cerbo publish all values again
* (@GermanBluefox) Unchanged values are not written again

### 1.0.0 (2026-10-14)
* (iobroker-bot) Adapter requires node.js >= 22 now.
* (@GermanBluefox) Added: the web interface of the Cerbo (GUI v2) as a tab in admin (`adminTab.proxy`) and as a web extension of ioBroker.web
* (@GermanBluefox) The port of the own web server for the admin tab is reported to js-controller 8 (`declareUsedResources`, `registerUsedResource`)
* (@GermanBluefox) Added the missing translations, the tests run on Windows and macOS too

### 0.2.1 (2026-04-12)
* (@GermanBluefox) Implemented the tests

### 0.1.0 (2026-04-11)
* (@GermanBluefox) Corrected some states

## License

The MIT License (MIT)

Copyright (c) 2026, Denis Haev <dogafox@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.