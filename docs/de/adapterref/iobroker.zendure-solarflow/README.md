---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.zendure-solarflow/README.md
title: ioBroker.zendure-solarflow
hash: AVn5YzHd9CTBo8vIgT61hMQK4ryROLtKMXW09AeSWz4=
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
Dieses Projekt ist ein ioBroker-Adapter zum Lesen von Daten aus der Zendure Solarflow Cloud API. Es verwendet die offizielle API von Zendure.
Weitere Informationen zur API finden Sie hier: https://github.com/Zendure/developer-device-data-report

## Merkmale
- Erhalten Sie alle Telemetriedaten von Ihren Solarflow-Geräten, auch die, die in der offiziellen App nicht sichtbar sind - wie z. B. die Batteriespannung
- Steuern Sie Ihren Solarflow HUB wie in der offiziellen App. Die meisten Einstellungen sind verfügbar.
- Kontrollieren Sie die Leistungsbegrenzung - Sie sind nicht darauf beschränkt, einen Shelly Pro EM zu verwenden, um eine Nulleinspeisung zu realisieren. Sie können auch komplexere Szenarien per Skript oder Blockly in ioBroker entwerfen.
- Stoppen Sie die Eingabe, wenn eine Batterie auf Unterspannung fällt (Batterieschutz). Funktioniert nur, wenn die Ausgangsgrenze über den Adapter eingestellt wird
- Steuern Sie mehr als einen Solarflow gleichzeitig!
- Erhalten Sie präzisere Berechnungen!
- Funktioniert mit allen Zendure SolarFlow-Geräten: HUB1200, Hyper2000, HUB2000 und AIO! Ich kann nur auf HUB1200 testen, da ich die anderen Geräte nicht besitze ...

## Hinweise
1. Bitte deaktiviere/entferne alle Häkchen in der Zendure App, sonst ist das Einstellen der Leistungsbegrenzung nicht möglich!

   ![Solarflow-Einstellungsfenster](https://raw.github.com/nograx/ioBroker.zendure-solarflow/master/Screenshots/ZendureSolarflowSettings.png)

2. Sie werden aus der offiziellen iOS- oder Android-App abgemeldet, nachdem Sie sich mit dem ioBroker-Adapter angemeldet haben. Dies ist ein normales Verhalten. Als Workaround können Sie ein zweites Zendure-Konto mit einer anderen E-Mail-Adresse erstellen und diesem Konto Zugriff auf Ihren Solarflow HUB gewähren. Verwenden Sie dann das zweite Konto für ioBroker / den Zendure Solarflow-Adapter.

3. Der Adapter zeigt eine Batterienutzung von +10 W an, wenn kein Solareingang vorhanden ist und das Gerät online ist. Dies spiegelt die Standby-Nutzung des Geräts wider.

## Credits
Credits gehen an https://github.com/reinhard-brandstaedter/solarflow, das mit dem Wissen über den MQTT-Server von Zendure sehr geholfen hat! Danke!

## Spenden
Wenn Sie den Adapter für sich nützlich finden und meine Arbeit unterstützen möchten, können Sie gerne per Paypal spenden. Vielen Dank! (Dies ist ein persönlicher Spendenlink für Nograx und steht in keinem Zusammenhang mit dem ioBroker-Projekt!)<br />

## Changelog
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