---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.zendure-solarflow/README.md
title: ioBroker.zendure-solarflow
hash: ZaI98Yxp8NiVcO5OwHOuC6Ynvrv3E/0D/eli8t9RiZ8=
---
![Logo](../../../en/adapterref/iobroker.zendure-solarflow/admin/zendure-solarflow.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.zendure-solarflow.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.zendure-solarflow.svg)
![Anzahl der Installationen](https://iobroker.live/badges/zendure-solarflow-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/zendure-solarflow-stable.svg)
![NPM](https://nodei.co/npm/iobroker.zendure-solarflow.png?downloads=true)
![Spenden](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)

# IoBroker.zendure-solarflow
**Tests:** ![Testen und Freigeben](https://github.com/nograx/ioBroker.zendure-solarflow/workflows/Test%20and%20Release/badge.svg)

## Zendure Solarflow-Adapter für ioBroker
Dieses Projekt ist ein ioBroker-Adapter zum Lesen von Daten aus der Zendure Solarflow Cloud API.

## Spenden
Wenn Sie den Adapter nützlich finden und meine Arbeit unterstützen möchten, können Sie gerne per Paypal spenden. Vielen Dank! (Dies ist ein persönlicher Spendenlink für Nograx und steht in keiner Verbindung zum ioBroker-Projekt!)<br />

## Merkmale
- Erhalten Sie alle Telemetriedaten von Ihren Solarflow-Geräten, auch diejenigen, die in der offiziellen App nicht sichtbar sind – wie die Batteriespannung
- Steuern Sie Ihren Solarflow HUB wie in der offiziellen App. Die meisten Einstellungen sind verfügbar.
- Steuern Sie die Leistungsbegrenzung – Sie sind nicht auf die Verwendung eines Shelly Pro EM beschränkt, um eine Nulleinspeisung zu realisieren. Sie können auch komplexere Szenarien per Skript oder Blockly in ioBroker entwerfen.
- Stoppen Sie den Eingang, wenn eine Batterie unter Spannung fällt (Batterieschutz). Funktioniert nur, wenn die Ausgangsbegrenzung über den Adapter eingestellt wird.
- Steuern Sie mehr als einen Solarflow gleichzeitig!
- Erhalten Sie präzisere Berechnungen!
- Funktioniert mit allen Zendure SolarFlow-Geräten: HUB1200, Hyper2000, HUB2000 und AIO!

## Offline-Modus (Verbindung zur Zendure Cloud trennen)
Neu ist die Möglichkeit, das Zendure-Gerät von der Cloud zu trennen. Verwenden Sie dazu entweder den [Solarflow Bluetooth Manager](https://github.com/reinhard-brandstaedter/solarflow-bt-manager) von Reinhard Brandstätter oder mein eigenes Windows-Tool [Zendure Cloud Disconnector](https://github.com/nograx/zendure-cloud-disconnector). Außerdem können Sie DNS-Anfragen Ihres Routers von "mq.zen-iot.com" auf Ihren eigenen MQTT-Server umleiten!

Beide Tools verbinden sich per Bluetooth mit dem Zendure-Gerät und setzen die interne MQTT-URL einfach auf eine neue URL/IP, die Sie angeben müssen. Aktuell müssen Sie den Standard-MQTT-Port 1883 auf Ihrem Server verwenden. Sie müssen außerdem die Authentifizierung auf dem MQTT-Server deaktivieren, da das Zendure-Gerät ein fest codiertes Passwort verwendet.

Wenn das Zendure-Gerät mit Ihrem MQTT-Server kommuniziert, können Sie diesen ioBroker-Adapter mit derselben MQTT-Instanz verbinden. Sie müssen das Gerätemodell und den Geräteschlüssel angeben (der in der Zendure Cloud Disconnector App angezeigt wird).

Sie können weiterhin Firmware-Updates mit der offiziellen Zendure-App über Bluetooth durchführen und beide Bluetooth-Tools verwenden, um das Gerät wieder mit der Cloud zu verbinden!

## Hinweise
1. Bitte deaktivieren/entfernen Sie alle Modi in der Zendure App, da sonst die Einstellung der Leistungsbegrenzung nicht möglich ist!

   ![Solarflow-Einstellungsfenster](https://raw.github.com/nograx/ioBroker.zendure-solarflow/master/Screenshots/ZendureSolarflowSettings.png)

2. Sie werden nach der Anmeldung mit dem ioBroker-Adapter von der offiziellen iOS- oder Android-App abgemeldet. Dies ist normal. Um dieses Problem zu umgehen, können Sie ein zweites Zendure-Konto mit einer anderen E-Mail-Adresse erstellen und diesem Konto Zugriff auf Ihren Solarflow HUB gewähren. Verwenden Sie dann das zweite Konto für ioBroker / den Zendure Solarflow-Adapter.

3. Der Adapter zeigt einen Batterieverbrauch von +7 W an, wenn kein Solarstrom zugeführt wird und das Gerät online ist. Dies entspricht dem Standby-Betrieb des Geräts.

## Credits
Dank geht an https://github.com/reinhard-brandstaedter/solarflow, das mir mit seinem Wissen über den MQTT-Server von Zendure sehr geholfen hat! Danke!

## Changelog
### 1.12.7 (2025-03-24)

- Add productKey "gDa3tb" for Hyper 2000

### 1.12.6 (2025-03-21)

- Fix onMessage Debug message

### 1.12.5 (2025-03-21)

- Add Debug messages on log level debug
- Add schedule for adapter refresh on local mode
- Fix Change of Discharge limit to 0

### 1.12.4 (2025-03-19)

- Fix calculation of SOC if "local" mode is used

### 1.12.3 (2025-03-19)

- Add 2 more devices if "local" mode is used
- Fix mqtt subscription of 2. device in "local" mode

### 1.12.2 (2025-03-18)

- Fix reset of calculation values on "local" mode

### 1.12.1 (2025-03-17)

- Fix IOT subscription

### 1.12.0 (2025-03-17)

- Added possibility to use "local" mode. You have to either route dns request to your own MQTT server or use a tool to modify the Zendure device
- Some improvements on value calculation
- Some improvements on AIO 2400 device

### 1.11.0 (2025-02-11)

- Drop Standby usage to 7W and 14W if HUB connected with ACE as it is more accurate
- Added heatState and autoModel (system operation mode) state
- Added possibility to set the operation mode (autoModel)
- Fix gridPower state

### 1.10.7 (2025-01-21)

- Fix reset calculation values of ACE if connected to HUB

### 1.10.6 (2025-01-16)

- Fix start of calculation if HUB is connected with Ace

### 1.10.4 (2025-01-14)

- Fix "Grid Input Power" state if connected with Ace

### 1.10.1 (2025-01-06)

- Fix input limit when hub is bundled with ace
- Fix calculation when low voltage block is activated

### 1.10.0 (2024-12-02)

- Add setting to perform a full charge if SOC from Zendure is greater than 50% when on low voltage
- Bugfixes

### 1.9.3 (2024-11-22)

- Fix for Low Voltage Block not deactivated

### 1.9.2 (2024-11-21)

- Fix some state definitions

### 1.9.1 (2024-11-21)

- Improvement for 'Low Voltage Block'.
- Changed the state "hubState" a an option value.

### 1.9.0 (2024-11-20)

- New option to force Solarflow device to go offline when "Low Voltage Block"-option is used.

## License

MIT License

Copyright (c) 2025 Peter Frommert

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