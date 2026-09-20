---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.zendure-solarflow/README.md
title: ioBroker.zendure-solarflow
hash: tbzhovE99VAe0YBGCC4RDRMWndICk5XHIPZ+2DlEIco=
---
![Logo](../../../en/adapterref/iobroker.zendure-solarflow/admin/zendure-solarflow.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.zendure-solarflow.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.zendure-solarflow.svg)
![Anzahl der Installationen](https://iobroker.live/badges/zendure-solarflow-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/zendure-solarflow-stable.svg)
![NPM](https://nodei.co/npm/iobroker.zendure-solarflow.png?downloads=true)
![Test und Freigabe](https://github.com/nograx/ioBroker.zendure-solarflow/workflows/Test%20and%20Release/badge.svg)
![Spenden](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)

# ioBroker.zendure-solarflow

## Zendure Solarflow-Adapter für ioBroker

Ein ioBroker-Adapter zum Auslesen und Steuern von Zendure Solarflow-Geräten über die Zendure Cloud API sowie lokal über zenSDK (HTTP) oder MQTT für ältere Geräte.

## Spenden

Wenn Ihnen der Adapter gefällt und Sie meine Arbeit unterstützen möchten, freue ich mich über eine Spende via PayPal. Vielen Dank! (Persönlicher Spendenlink für Nograx, unabhängig vom ioBroker-Projekt)

## Merkmale

- Vollständige Telemetriedaten Ihrer Solarflow-Geräte, einschließlich Werte, die in der offiziellen App nicht angezeigt werden (z. B. Batteriespannung).
- Geräte wie mit der offiziellen App steuern – die meisten Einstellungen sind verfügbar.
- Legen Sie Ausgangs-/Eingangsgrenzen für Szenarien ohne Einspeisung ohne Shelly Pro EM fest oder erstellen Sie komplexere Automatisierungen per Skript/Blockly.
- Batterieschutz: Unterbricht die Eingangsleistung, wenn die Batteriespannung zu niedrig ist (erfordert eine über den Adapter einstellbare Ausgangsbegrenzung).
- Mehrere Solarflow-Geräte gleichzeitig steuern, mit präziseren Berechnungen.
- Funktioniert mit allen Zendure Solarflow-Geräten
- **zenSDK** : Lokale HTTP-Steuerung für kompatible Geräte, wobei die Daten weiterhin an die Zendure-Cloud weitergeleitet werden, sodass Sie die volle Kontrolle behalten, falls das Internet oder die Zendure-Server ausfallen.

## Modi

- **Authentifizierung per Cloud-Schlüssel** (empfohlen): die offizielle Zendure-Methode. Sie erhalten einen Cloud-Schlüssel über die App. Standardmäßig wird für kompatible Geräte im selben Netzwerk wie ioBroker das zenSDK verwendet. Dies ermöglicht die volle lokale Kontrolle bei gleichzeitiger Datenübertragung in die Cloud. Auch eine reine Cloud-Nutzung ist möglich. Ältere Geräte, die bereits an einen lokalen MQTT-Server angeschlossen sind, können Daten ebenfalls ohne Nachteile in die Cloud übertragen.
- **Lokal** : Nur lokaler Modus. Verbinden Sie den Adapter mit einem lokalen MQTT-Server für ältere Geräte (siehe unten); zenSDK-Geräte werden über mDNS gefunden.

### mDNS Discovery

Wenn zenSDK aktiviert ist, durchsucht der Adapter beim Start kurz das Netzwerk über mDNS/Bonjour nach Geräten, die sich als solche ankündigen. `Zendure-<model>-<serialNumber>` Diese Funktion ergänzt oder korrigiert IP-Adressen bekannter Cloud-Geräte und erstellt automatisch Zubehör (Mix-Serie, Smart Meter), das keinen Cloud-Produktschlüssel besitzt und daher nicht anderweitig erstellt werden kann. Geräte werden anhand der vollständigen Seriennummer und nicht anhand der IP-Adresse oder eines Kurznamens identifiziert. Die Funktion kann über die Einstellung „Über mDNS-Erkennung gefundene Geräte hinzufügen“ deaktiviert werden.

## Unterstützte Geräte

### zenSDK-kompatible Geräte ✅ (vollständige lokale Steuerung über HTTP)

> **Zendure empfiehlt** : Verwenden Sie den oben beschriebenen Authentifizierungsmodus mit Cloud-Schlüssel. Dieser ermöglicht die volle lokale Kontrolle bei gleichzeitiger Beibehaltung der Cloud-Verbindung. Die Geräte müssen nicht von der Cloud getrennt werden.

- Solarflow 1600 AC Plus, 2400 AC, 2400 AC Plus, 2400 Pro, 800, 800 Plus, 800 Pro
- Solarflow 3000 Mix AC+, 4000 Mix AC+, 4000 Mix Pro _(noch kein Cloud-Produktschlüssel vorhanden – hinzugefügt nur über [mDNS-Erkennung](#mdns-discovery) )_

### Smart-Meter-Zubehör 📊 (nur lesbar, nur zenSDK/mDNS)

- **Intelligenter Zähler 3CT** – Scheinleistung pro Phase (A/B/C) und gesamt, über Stromwandler
- **Smart Meter D0** – Live-Zählerstände über optische IEC 62056-21-Schnittstelle

### Legacy-Geräte 🔄 (lokaler MQTT-Modus über Zendure Cloud Disconnector)

- HUB 1200, HUB 2000, Hyper 2000, AIO 2400, ACE 1500 – alle unterstützen den lokalen Modus und können weiterhin Daten an die Cloud weiterleiten.

**Vorteile des lokalen Modus:** Es werden keine Daten an Zendure-Server gesendet (die Übertragung per Relay wird empfohlen), direkte/schnellere MQTT-Kommunikation, vollständige Offline-Automatisierung und Cloud-Relay kann jederzeit wieder aktiviert werden. Firmware-Updates über die offizielle App/Bluetooth funktionieren weiterhin.

## Offline-Modus (Verbindung zur Zendure Cloud trennen) für ältere Geräte

⚠️ **Garantiehinweis:** Das direkte Ändern des MQTT-Servers auf dem Gerät (über Bluetooth-Tools oder DNS-Umleitung) wird nicht offiziell unterstützt und **führt zum Verlust der Gerätegarantie** . Die Durchführung erfolgt auf eigene Gefahr.

Um ein älteres Gerät von der Cloud zu trennen, verwenden Sie den [Solarflow Bluetooth Manager](https://github.com/reinhard-brandstaedter/solarflow-bt-manager) von Reinhard Brandstätter oder meinen [Zendure Cloud Disconnector](https://github.com/nograx/zendure-cloud-disconnector) – beide legen die MQTT-URL des Geräts per Bluetooth fest. Alternativ können Sie DNS-Anfragen für „mq.zen-iot.com“ über Ihren Router an Ihren eigenen MQTT-Server umleiten.

**Hinweis:** Diese Bluetooth-Tools funktionieren nur für **ältere Geräte** . Verwenden Sie für **zenSDK** -Geräte stattdessen die offizielle Offline-Methode von Zendure.

Beide Tools erzwingen den Standard-MQTT-Port (1883 oder 8883 mit SSL) und erfordern, dass die Authentifizierung auf Ihrem Server deaktiviert ist, da das Gerät ein fest codiertes Passwort verwendet. Sie können dies mit Ihrem Cloud-Authentifizierungsschlüssel kombinieren oder den vollständigen lokalen Modus verwenden.

## Wichtig

Um das Laden/Einspeisen per Skript oder Blockly zu steuern, verwenden Sie di&#x65;** `setDeviceAutomationInOutLimit` ** Steuerparameter – er steuert das Gerät, ohne in den Flash-Speicher zu schreiben. Negative Werte lösen das Laden über das Stromnetz aus.

## Anmerkungen

Dieser Adapter authentifiziert sich auf den offiziellen MQTT-Servern mithilfe des Cloud-Autorisierungscodes, den Sie in der Zendure-App generieren können.

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

For older changes see CHANGELOG_OLD.md.

## License

MIT License

Copyright (c) 2026 Peter Frommert <peter.frommert@outlook.com>

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