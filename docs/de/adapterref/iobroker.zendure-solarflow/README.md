---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.zendure-solarflow/README.md
title: ioBroker.zendure-solarflow
hash: BT6fq8xLzzR6Bd5pWDJ1gjLaIyPhg+Q15p/ibrt8wCo=
---
![Logo](../../../en/adapterref/iobroker.zendure-solarflow/admin/zendure-solarflow.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.zendure-solarflow.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.zendure-solarflow.svg)
![Anzahl der Installationen](https://iobroker.live/badges/zendure-solarflow-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/zendure-solarflow-stable.svg)
![NPM](https://nodei.co/npm/iobroker.zendure-solarflow.png?downloads=true)
![Spenden](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)

# IoBroker.zendure-solarflow
**Tests:** ![Test und Freigabe](https://github.com/nograx/ioBroker.zendure-solarflow/workflows/Test%20and%20Release/badge.svg)

## Zendure Solarflow-Adapter für ioBroker
Dieses Projekt ist ein ioBroker-Adapter zum Lesen von Daten aus der Zendure Solarflow Cloud API.

## Spenden
Wenn Ihnen der Adapter gefällt und Sie meine Arbeit unterstützen möchten, freue ich mich über eine Spende via PayPal. Vielen Dank! (Dies ist ein persönlicher Spendenlink für Nograx und steht in keiner Verbindung zum ioBroker-Projekt!)<br />

## Merkmale
- Erhalten Sie alle Telemetriedaten Ihrer Solarflow-Geräte, auch solche, die in der offiziellen App nicht angezeigt werden – wie z. B. die Batteriespannung.
- Steuern Sie Ihre Solarflow-Geräte wie in der offiziellen App. Die meisten Einstellungen sind verfügbar.
- Steuern Sie die Ausgangs- und Eingangsgrenzen – Sie sind nicht auf die Verwendung eines Shelly Pro EM beschränkt, um einen Null-Feed-In zu realisieren. Sie können auch komplexere Szenarien per Skript oder Blockly in ioBroker entwerfen.
- Unterbricht die Eingangsleistung, wenn eine Batterie zu wenig Spannung hat (Batterieschutz). Funktioniert nur, wenn die Ausgangsleistung über den Adapter begrenzt wird.
- Steuern Sie mehrere Solarflow-Geräte gleichzeitig!
- Erhalten Sie präzisere Berechnungen!
- Funktioniert mit allen Zendure SolarFlow-Geräten!
- **zenSDK-Integration**: Erweiterte Kommunikation für kompatible Geräte über lokale HTTP-Kommunikation
**MQTT-Nachrichten an die Cloud weiterleiten**: Das Gerät behält die volle Kontrolle lokal, und die Daten werden an Zendure MQTT weitergeleitet. Sie behalten die Kontrolle auch bei Internetausfällen oder wenn die Zendure-Server offline sind.

## Unterstützte Geräte
Aktuell werden alle Zendure Solarflow-Geräte über die Cloud unterstützt.

## Modi
**Authentifizierung per Cloud-Schlüssel:** Offizielle Methode, die von Zendure unterstützt wird. Sie erhalten einen Cloud-Schlüssel über die offizielle App. Standardmäßig wird das zenSDK verwendet (das Gerät muss sich im selben Netzwerk wie die ioBroker-Instanz befinden). Sie können auch den reinen Cloud-Modus aktivieren. Bei älteren Geräten, bei denen MQTT auf einen lokalen Server eingestellt ist, können Daten nun ohne Nachteile in die Cloud übertragen werden!

**Lokales MQTT** Es ist auch möglich, den rein lokalen Modus zu verwenden. Derzeit gibt es keine bekannte Möglichkeit, den MQTT-Server bei den neuen Solarflow-Geräten direkt auf dem Gerät einzurichten. Daher muss hierfür ein DNS-Relay verwendet werden.

### ZenSDK-kompatible Geräte ✅
Diese Geräte unterstützen die erweiterten Automatisierungsfunktionen des zenSDK mit vollständiger **lokaler** Kontrolle über http:

- **Solarflow 1600 AC Plus** - Volle zenSDK-Unterstützung
- **Solarflow 2400 AC** - Volle zenSDK-Unterstützung
- **Solarflow 2400 AC Plus** - Volle zenSDK-Unterstützung
- **Solarflow 2400 Pro** - Volle zenSDK-Unterstützung
- **Solarflow 800** - Volle zenSDK-Unterstützung
- **Solarflow 800 Plus** - Volle zenSDK-Unterstützung
- **Solarflow 800 Pro** - Volle zenSDK-Unterstützung

### Ältere Geräte 🔄
Diese Geräte werden über den **lokalen** MQTT-Modus unterstützt (Zendure Cloud Disconnector):

- **HUB 1200** - Unterstützung des lokalen Modus, kann Nachrichten an die Cloud weiterleiten
- **HUB 2000** - Unterstützung des lokalen Modus, kann Nachrichten an die Cloud weiterleiten
- **Hyper 2000** - Unterstützung für den lokalen Modus, kann Nachrichten an die Cloud weiterleiten
- **AIO 2400** - Unterstützung des lokalen Modus, kann Nachrichten an die Cloud weiterleiten
- **ACE 1500** - Unterstützung des lokalen Modus, kann Nachrichten an die Cloud weiterleiten

### Vorteile des lokalen Modus 🏠
„Ältere“ Geräte können vollständig von der Zendure Cloud getrennt werden, wobei die volle Funktionalität erhalten bleibt:

- **Datenschutz**: Es werden keine Daten an Zendure-Server gesendet.
- **Zuverlässigkeit**: Direkte lokale MQTT-Kommunikation
- **Geschwindigkeit**: Schnellere Reaktionszeiten ohne Cloud-Latenz
- **Flexibilität**: Kann bei Bedarf Nachrichten an die Cloud weiterleiten.
- **Steuerung**: Vollständige lokale Automatisierung ohne Internetabhängigkeit
**Aktualisierungen**: Firmware-Updates können weiterhin über die offizielle Zendure-App via Bluetooth durchgeführt werden.

## Offline-Modus (Verbindung zur Zendure Cloud trennen)
Neu ist die Möglichkeit, das Zendure-Gerät von der Cloud zu trennen. Verwenden Sie dazu entweder die Taste [Solarflow Bluetooth Manager](https://github.com/reinhard-brandstaedter/solarflow-bt-manager) von Reinhard Brandstätter oder mein eigenes Windows-Tool [Zendure Cloud Disconnector](https://github.com/reinhard-brandstaedter/solarflow-bt-manager)](https://github.com/nograx/zendure-cloud-disconnector) oder leiten Sie DNS-Anfragen über Ihren Router von „mq.zen-iot.com“ an Ihren eigenen MQTT-Server um.

Beide Tools verbinden sich via Bluetooth mit dem Zendure-Gerät und ändern die interne MQTT-URL einfach in eine neue URL/IP-Adresse, die Sie angeben müssen. Aktuell sind Sie gezwungen, den Standard-MQTT-Port 1883 auf Ihrem Server zu verwenden. Außerdem müssen Sie die Authentifizierung auf dem MQTT-Server deaktivieren, da das Zendure-Gerät ein fest codiertes Passwort verwendet.

Sie können dies in Kombination mit Ihrem Cloud-Authentifizierungsschlüssel verwenden oder den vollständigen lokalen Modus nutzen.

## Wichtig
Wenn Sie das Laden und die Stromversorgung Ihres Geräts per Skript/Blockly steuern möchten, empfehle ich die Verwendung des Steuerungsparameters '**setDeviceAutomationInOutLimit**'. Dieser steuert das Gerät, ohne in den Flash-Speicher zu schreiben. Negative Werte können verwendet werden, um das Laden über das Stromnetz auszulösen.

## Notizen
Dieser Adapter verwendet den Cloud-Autorisierungscode zur Authentifizierung auf den offiziellen MQTT-Servern, den Sie in der Zendure-App generieren können!

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

## **IN BEARBEITUNG** -->

## Changelog

### **WORK IN PROGRESS**

- (copilot) Adapter requires node.js >= 22 now

### 4.0.4 (2026-04-14)

- Update dependencies

### 4.0.3 (2026-03-31)

- Fix missing ip address field in settings for local mode
- Add retry loop for zenSDK requests (retry 3 times if connection failed)
- Update battery detection

### 4.0.2 (2026-03-24)

- Re-add new SF devices to local mode settings
- Add product key '64174u' for Solarflow 1600 AC+

### 4.0.1 (2026-03-20)

- Fix missing smartMode state for Solarflow AC 2400 and Solarflow 800

### 4.0.0 (2026-03-17)

- Add support for zenSDK! All devices can now communicate in the local network (with full cloud support for backup and maintenance)
- Add possibility to relay local MQTT messages to Zendure cloud!
- Save device list from Zendure Cloud as a local backup if cloud is unavailable
- Major refactor and improvements
- Fix 'packPower' not correctly set (resetting to 0 every new data package)

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 Peter Frommert

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