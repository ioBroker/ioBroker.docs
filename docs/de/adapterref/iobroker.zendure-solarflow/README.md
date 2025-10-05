---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.zendure-solarflow/README.md
title: ioBroker.zendure-solarflow
hash: DuZMTwYVqm7rd5887ZeukvOJr6IJs4sHJJGY7LJY/dc=
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
Wenn Sie den Adapter nützlich finden und meine Arbeit unterstützen möchten, können Sie gerne per Paypal spenden. Vielen Dank! (Dies ist ein persönlicher Spendenlink für Nograx, der in keiner Verbindung zum ioBroker-Projekt steht!)<br />

## Merkmale
- Erhalten Sie alle Telemetriedaten von Ihren Solarflow-Geräten, auch diejenigen, die in der offiziellen App nicht sichtbar sind – wie z. B. die Batteriespannung
- Steuern Sie Ihren Solarflow HUB wie in der offiziellen App. Die meisten Einstellungen sind verfügbar.
- Steuern Sie die Leistungsbegrenzung – Sie sind nicht auf die Verwendung eines Shelly Pro EM beschränkt, um eine Nulleinspeisung zu realisieren. Sie können auch komplexere Szenarien per Skript oder Blockly in ioBroker entwerfen.
- Stoppen Sie den Eingang, wenn eine Batterie auf Unterspannung fällt (Batterieschutz). Funktioniert nur, wenn die Ausgangsbegrenzung über den Adapter eingestellt wird
- Steuern Sie mehr als einen Solarflow gleichzeitig!
- Erhalten Sie präzisere Berechnungen!
- Funktioniert mit allen Zendure SolarFlow-Geräten: HUB1200, Hyper2000, HUB2000 und AIO!

## Offline-Modus (Verbindung zur Zendure Cloud trennen)
Neu ist die Möglichkeit, das Zendure-Gerät von der Cloud zu trennen. Dazu können Sie entweder [Solarflow Bluetooth Manager](https://github.com/reinhard-brandstaedter/solarflow-bt-manager) von Reinhard Brandstätter oder mein eigenes Windows-Tool [Zendure Cloud Disconnector](https://github.com/nograx/zendure-cloud-disconnector) verwenden. Es ist auch möglich, DNS-Anfragen mit Ihrem Router von "mq.zen-iot.com" auf Ihren eigenen MQTT-Server umzuleiten!

Beide Tools verbinden sich per Bluetooth mit dem Zendure-Gerät und setzen die interne MQTT-URL einfach auf eine neue URL/IP, die Sie angeben müssen. Aktuell sind Sie gezwungen, den Standard-MQTT-Port 1883 auf Ihrem Server zu verwenden. Sie müssen außerdem die Authentifizierung auf dem MQTT-Server deaktivieren, da das Zendure-Gerät ein fest codiertes Passwort verwendet.

Wenn das Zendure-Gerät mit Ihrem MQTT-Server kommuniziert, können Sie diesen ioBroker-Adapter mit derselben MQTT-Instanz verbinden. Sie müssen das Gerätemodell und den Geräteschlüssel angeben (der in der Zendure Cloud Disconnector-App angezeigt wird).

Sie können weiterhin Firmware-Updates mit der offiziellen Zendure-App über Bluetooth durchführen und beide Bluetooth-Tools verwenden, um das Gerät wieder mit der Cloud zu verbinden!

## Wichtig
Wenn Sie das Laden und Einspeisen Ihres Geräts über ein Skript/Blockly steuern möchten, empfehle ich die Verwendung des Steuerparameters „**setDeviceAutomationInOutLimit**“, da dieser das Gerät steuert, ohne in den Flash-Speicher zu schreiben. Es ist auch eine gute Idee, den Steuerstatus „**smartMode**“ auf „true“ zu setzen, wenn Sie einen HUB 1200/2000 mit ACE 1500 besitzen, da dies das Gerät auch dazu zwingt, „acMode“-Änderungen in den RAM statt in den Flash-Speicher zu schreiben.

### Hyper 2000, SF 2400 AC oder SF 800 (Pro)
Bei Geräten wie dem Hyper 2000, SF 2400 AC oder SF 800 (pro) können Sie mit negativen Werten die Netzladung auslösen. SF 2400 AC oder SF 800 (pro) ist derzeit **ungetestet**!

### HUB 1200 / HUB 2000 / ACE 1500 Combo
Bei einer HUB 1200 / HUB 2000 / ACE 1500-Kombination müssen Sie '**setDeviceAutomationInOutLimit**' für die Einspeisung verwenden und den acMode sowie '**setInputLimit**' manuell umschalten, wenn Sie vom Netz laden möchten. In diesem Szenario wird dringend empfohlen, den '**smartMode**' auf true zu setzen!

## Hinweise
Dieser Adapter verwendet nun den Cloud-Autorisierungscode zur Authentifizierung auf den offiziellen MQTT-Servern, den Sie in der Zendure-App generieren können!

## Changelog
### 3.0.1 (2025-10-02)

- Update 'lastUpdate' when a battery value changes
- Add deviceKey 'R3mn8U' for Solarflow 800 Pro

### 3.0.0 (2025-09-30)

- Breaking Change: Change authentication to "authentication cloud key". You can generate a key in the official zendure app
- Removed fallback server
- Add deviceKey 'a4ss5P' for Solarflow 800
- Refactor a lot of code

### 2.0.4 (2025-09-12)

- Fix creation of control states on new Hyper 2000 v3
- Updates dependencies

### 2.0.3 (2025-09-09)

- Added 'B3Dxda' as new Hyper 2000 productKey
- Removed parameter 'upTime' and 'pullTime' from 'setDeviceAutomationInOutLimit'
- TEST: Use 'setDeviceAutomationInOutLimit' to let HUB1200/HUB2000 charge with connected ACE 1500

### 2.0.1 (2025-07-22)

- Small fix MQTT service

### 2.0.0 (2025-07-21)

- Breaking Change: Add control parameter 'setDeviceAutomationInOutLimit' which emulates Zendure's Smart Matching mode. I recommend using this device automation instead of 'setInputLimit'/'setOutputLimit' from now on, as there were concerns that setting limits/modes would be stored in the flash memory. You can use negative values for charging and positive for feed in. On HUB 1200/2000 with ACE 1500 you can use "smartMode" to prevent switching AC mode trigger writing to the flash memory. Check you the readme for more details or participate in the ioBroker forum.

### 1.15.4 (2025-07-17)

- Add smart mode control parameter for more devices

### 1.15.3 (2025-07-17)

- Match case sensitive product key for SF 2400 AC and SF 800 in settings if local mode is used
- Add sensor and control of "SmartMode"

### 1.15.2 (2025-07-14)

- Fix missing SF 800 & 2400 AC in local mode settings

### 1.15.1 (2025-07-11)

- Fix missing Solar Input 3 & 4 on Solarflow 800 Pro
- Fix 'packPower' state did not set to 0 if no input/output

### 1.15.0 (2025-06-27)

- Add 'packPower' state, which shows combined power from (packInputPower and outputPackPower). Discharging will be shown with a negative value.
- Add 'hyperTmp' to Solarflow 800 devices in hope this will show the temperature of the Solarflow 800 (can not test it due to lack of test device).

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