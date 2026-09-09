---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.zendure-solarflow/README.md
title: ioBroker.zendure-solarflow
hash: Zoocwnyr9uh94HXm6oj7ls5BjA0YkIMN3hO++ucFueI=
---
![Logo](../../../en/adapterref/iobroker.zendure-solarflow/admin/zendure-solarflow.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.zendure-solarflow.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.zendure-solarflow.svg)
![Anzahl der Installationen](https://iobroker.live/badges/zendure-solarflow-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/zendure-solarflow-stable.svg)
![NPM](https://nodei.co/npm/iobroker.zendure-solarflow.png?downloads=true)
![Spenden](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)

# ioBroker.zendure-solarflow

**Tests:** ![Test und Freigabe](https://github.com/nograx/ioBroker.zendure-solarflow/workflows/Test%20and%20Release/badge.svg)

## Zendure Solarflow-Adapter für ioBroker

Dieses Projekt ist ein ioBroker-Adapter zum Lesen von Daten aus der Zendure Solarflow Cloud API.

## Spenden

Wenn Ihnen der Adapter gefällt und Sie meine Arbeit unterstützen möchten, freue ich mich über eine Spende via PayPal. Vielen Dank! (Dies ist ein persönlicher Spendenlink für Nograx und steht in keiner Verbindung zum ioBroker-Projekt!)<br />

## Merkmale

- Erhalten Sie alle Telemetriedaten Ihrer Solarflow-Geräte, auch solche, die in der offiziellen App nicht angezeigt werden – wie z. B. die Batteriespannung.
- Steuern Sie Ihre Solarflow-Geräte wie in der offiziellen App. Die meisten Einstellungen sind verfügbar.
- Steuern Sie die Ausgangs- und Eingangsgrenzen – Sie sind nicht auf die Verwendung eines Shelly Pro EM beschränkt, um einen Null-Feed-In zu realisieren. Sie können auch komplexere Szenarien per Skript oder Blockly in ioBroker entwerfen.
- Die Eingangsleistung wird unterbrochen, wenn eine Batterie zu wenig Spannung hat (Batterieschutz). Funktioniert nur, wenn die Ausgangsleistung über den Adapter begrenzt wird.
- Mehrere Solarflow-Geräte gleichzeitig steuern!
- Erhalten Sie präzisere Berechnungen!
- Funktioniert mit allen Zendure SolarFlow-Geräten!
- **zenSDK-Integration**Erweiterte Kommunikation für kompatible Geräte über lokale HTTP-Kommunikation
- **MQTT-Nachrichten an die Cloud weiterleiten**Das Gerät verfügt über volle lokale Steuerung, und die Daten werden an Zendure MQTT weitergeleitet. Sie verlieren die Kontrolle auch dann nicht, wenn die Internetverbindung unterbrochen ist oder die Zendure-Server offline sind.

## Unterstützte Geräte

Aktuell werden alle Zendure Solarflow-Geräte über die Cloud unterstützt.

## Modi

- **Authentifizierungs-Cloud-Schlüssel** Offizielle Methode, die von Zendure unterstützt wird. Sie erhalten einen Cloud-Schlüssel über die offizielle App. Standardmäßig wird das zenSDK verwendet (das Gerät muss sich im selben Netzwerk wie die ioBroker-Instanz befinden). **Dies ist die empfohlene Methode zur Steuerung „neuer“ (zenSDK-kompatibler) Geräte, da sie von Zendure selbst offiziell empfohlen wird.** Es bietet volle lokale Kontrolle bei gleichzeitiger Datenübertragung in die Cloud. Sie können auch nur den Cloud-Modus nutzen. Bei älteren Geräten, deren MQTT auf einen lokalen Server eingestellt ist, ist es nun möglich, Daten ohne Nachteile in die Cloud zu übertragen!

- **Lokales MQTT** Alternativ kann auch der lokale Modus verwendet werden. Derzeit ist keine Möglichkeit bekannt, den MQTT-Server bei den neuen Solarflow-Geräten direkt auf dem Gerät einzurichten. Daher muss hierfür ein DNS-Relay verwendet werden.

### mDNS Discovery

Wenn zenSDK aktiviert ist, durchsucht der Adapter nach dem Start kurz das lokale Netzwerk über mDNS/Bonjour, um Zendure-Geräte zu finden, die sich als Zendure-Geräte anmelden. `Zendure-<model>-<serialNumber>`Dies wird verwendet, um:

- **IP-Adressen eintragen oder korrigieren**Wenn ein in der Cloud-Geräteliste bekanntes Gerät keine IP-Adresse hat oder die IP-Adresse in der Cloud-Geräteliste nicht mehr mit der Adresse übereinstimmt, die das Gerät tatsächlich im Netzwerk ankündigt, wird dies automatisch korrigiert.
- **Automatische Erstellung von Zubehör, das nur mit dem zenSDK kompatibel ist**Die Geräte der Mix-Serie und beide Smart Meter (siehe unten) besitzen keinen bekannten Cloud-Produktschlüssel und können daher nicht über die Cloud-Geräteliste erstellt werden. Der Adapter erstellt sie stattdessen direkt anhand ihrer mDNS-Ankündigung und verwendet dabei ihre Seriennummer als internen Geräteschlüssel.

Die Geräte werden immer anhand ihrer vollständigen Seriennummer (aus dem mDNS-Dienstnamen extrahiert) und nicht anhand der IP-Adresse oder eines verkürzten Suffixes identifiziert, da sich manche Zendure-Seriennummern nur in den ersten Zeichen unterscheiden.

Dieses Verhalten kann mit der Einstellung „Über mDNS-Erkennung gefundene Geräte hinzufügen“ deaktiviert werden.

### zenSDK-kompatible Geräte ✅

> **Empfohlen von Zendure:** Für alle unten aufgeführten „neuen“ Geräte empfiehlt Zendure offiziell die Steuerung über das zenSDK (im oben beschriebenen Modus „Authentifizierungs-Cloud-Schlüssel“). So haben Sie die volle lokale Kontrolle über HTTP, während die Cloud-Verbindung aus praktischen Gründen bestehen bleibt – die Geräte müssen nicht von der Cloud getrennt werden.

Diese Geräte unterstützen die erweiterten Automatisierungsfunktionen des zenSDK vollständig. **lokal** Kontrolle über http:

- **Solarflow 1600 AC Plus** - Volle zenSDK-Unterstützung
- **Solarflow 2400 AC** - Volle zenSDK-Unterstützung
- **Solarflow 2400 AC Plus** - Volle zenSDK-Unterstützung
- **Solarflow 2400 Pro** - Volle zenSDK-Unterstützung
- **Solarflow 800** - Volle zenSDK-Unterstützung
- **Solarflow 800 Plus** - Volle zenSDK-Unterstützung
- **Solarflow 800 Pro** - Volle zenSDK-Unterstützung
- **Solarflow 3000 Mix AC+** - Vollständige zenSDK-Unterstützung (noch kein Cloud-Produktschlüssel bekannt, hinzugefügt über [mDNS-Entdeckung](#mdns-discovery) nur)
- **Solarflow 4000 Mix AC+** - Vollständige zenSDK-Unterstützung (noch kein Cloud-Produktschlüssel bekannt, hinzugefügt über [mDNS-Entdeckung](#mdns-discovery) nur)
- **Solarflow 4000 Mix Pro** - Vollständige zenSDK-Unterstützung (noch kein Cloud-Produktschlüssel bekannt, hinzugefügt über [mDNS-Entdeckung](#mdns-discovery) nur)

### Zubehör für Smart Meter 📊

Hierbei handelt es sich um zenSDK-Zubehör mit Lesezugriff, ohne Steuerungszustände und ohne Akkus – sie melden ausschließlich Live-Messwerte. Wie die Mix-Serie besitzen sie keinen bekannten Cloud-Produktschlüssel und werden über … hinzugefügt. [mDNS-Entdeckung](#mdns-discovery) nur:

- **Smart Meter 3CT** - Meldet die Scheinleistung pro Phase (A/B/C) und die Gesamtleistung, gemessen mit drei Stromwandlern
- **Smart Meter D0** - Meldet Live-Messwerte, die vom Stromzähler über dessen optische IEC 62056-21-Schnittstelle abgelesen werden.

### Ältere Geräte 🔄

Diese Geräte werden unterstützt durch **lokal** MQTT-Modus (Zendure Cloud Disconnector):

- **HUB 1200** - Unterstützung des lokalen Modus, kann Nachrichten an die Cloud weiterleiten
- **HUB 2000** - Unterstützung des lokalen Modus, kann Nachrichten an die Cloud weiterleiten
- **Hyper 2000** - Unterstützung des lokalen Modus, kann Nachrichten an die Cloud weiterleiten
- **AIO 2400** - Unterstützung des lokalen Modus, kann Nachrichten an die Cloud weiterleiten
- **ACE 1500** - Unterstützung des lokalen Modus, kann Nachrichten an die Cloud weiterleiten

### Vorteile des lokalen Modus 🏠

„Ältere“ Geräte können vollständig von der Zendure Cloud getrennt werden, wobei die volle Funktionalität erhalten bleibt:

- **Datenschutz**Es wurden keine Daten an die Zendure-Server gesendet.
- **Zuverlässigkeit**: Direkte lokale MQTT-Kommunikation
- **Geschwindigkeit**Schnellere Reaktionszeiten ohne Cloud-Latenz
- **Flexibilität**Kann bei Bedarf Nachrichten an die Cloud weiterleiten
- **Kontrolle**Vollständige lokale Automatisierung ohne Internetabhängigkeit
- **Aktualisierungen**Firmware-Updates können weiterhin über die offizielle Zendure-App via Bluetooth durchgeführt werden.

## Offline-Modus (Verbindung zur Zendure Cloud trennen)

Als neue Funktion können Sie das Zendure-Gerät von der Cloud trennen. Sie können dazu entweder die folgende Methode verwenden: [Solarflow Bluetooth-Manager](https://github.com/reinhard-brandstaedter/solarflow-bt-manager) von Reinhard Brandstätter oder meinem eigenen Windows-Tool [Zendure Cloud Disconnector](https://github.com/nograx/zendure-cloud-disconnector) Um das Gerät von der Cloud zu trennen. Es ist auch möglich, DNS-Anfragen mit Ihrem Router von „mq.zen-iot.com“ an Ihren eigenen MQTT-Server umzuleiten!

**Notiz:** Der Solarflow Bluetooth Manager und der Zendure Cloud Disconnector funktionieren nur für **Ältere Geräte**. Für **zenSDK** Bei diesen Geräten muss stattdessen die DNS-Umleitung verwendet werden, da diese Geräte die MQTT-Servereinstellungen nicht über Bluetooth bereitstellen.

Beide Tools verbinden sich via Bluetooth mit dem Zendure-Gerät und ändern die interne MQTT-URL einfach in eine neue URL/IP-Adresse, die Sie angeben müssen. Aktuell sind Sie gezwungen, den Standard-MQTT-Port 1883 (oder 8883 mit SSL) auf Ihrem Server zu verwenden. Außerdem müssen Sie die Authentifizierung auf dem MQTT-Server deaktivieren, da das Zendure-Gerät ein fest codiertes Passwort verwendet.

Sie können dies in Kombination mit Ihrem Cloud-Authentifizierungsschlüssel verwenden oder den vollständigen lokalen Modus nutzen.

## Wichtig

Wenn Sie das Laden und die Stromversorgung Ihres Geräts mit einem Skript/Blockly steuern möchten, empfehle ich die Verwendung des Steuerungsparameters „“.**setDeviceAutomationInOutLimit**Dadurch wird das Gerät gesteuert, ohne in den Flash-Speicher des Geräts zu schreiben. Negative Werte können verwendet werden, um das Laden über das Stromnetz auszulösen.

## Anmerkungen

Dieser Adapter verwendet den Cloud-Autorisierungscode zur Authentifizierung auf den offiziellen MQTT-Servern, den Sie in der Zendure-App generieren können!

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

## Changelog
### 5.3.0 (2026-09-02)

- Add folder "settings" for zenSDK devices. Here you can turn device polling on/off and control the polling interval for individual devices.
- Round hyperTmp to nearest int.
- Adjust checkVoltage function to take account of the 24V architecture of the new Mix series.
- Start mDNS discovery start after fetching deviceList from Zendure cloud.
- Fix lower case bug in comparing product keys for new mDNS device creation

### 5.2.1 (2026-08-30)

- BREAKING: `setDeviceAutomationInOutLimit` on Hyper 2000 uses simulated HEMS now and requires `hemsState = 1` and `autoModel = 0` to control the device (automatically set by the adapter). Please check your control parameters (e.g. inverseMaxPower) after updating if you use setDeviceAutomationInOutLimit.
- Add support for Solarflow 3000/4000 Mix AC+ and 4000 Mix Pro via mDNS auto-discovery
- Add support for Smart Meter 3CT and Smart Meter D0 (read-only zenSDK accessories, with proper power state names/units and no control or packData states)
- Correct a device's IP via mDNS if it no longer matches the (stale or wrong) IP from the cloud device list
- Process zenSDK measurements reported directly on the response instead of nested under "properties" (affects Smart Meter 3CT/D0)
- Enable "mDNS discovery" by default, including for existing instances that never had this setting saved - you must disable this option in settings if not desired


### 5.1.0 (2026-08-20)

- Fix batCur Reading
- Add control state for inverseMaxPower and gridOffMode (Control AC outlet on 'Plus' Devices)

### 5.0.4 (2026-08-19)

- Fix flickering Save button in Settings.
- Add function to detect zenSDK devices with mDNS and fill missing IP-address if found.

### 5.0.3 (2026-08-18)

- Fix `wifiState` not being created/updated correctly for devices using local zenSDK polling (Solarflow 2400 AC/AC Plus/Pro, 1600 AC Plus), as their local status payload does not report a `wifiState` property

For older changes see [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

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