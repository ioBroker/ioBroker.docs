---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.zendure-solarflow/README.md
title: ioBroker.zendure-solarflow
hash: NVvuNG/1GXEw/ohtnb5LWEtYsvkNdkchQH2aE8Wxjp8=
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
- Funktioniert mit allen Zendure SolarFlow-Geräten: HUB1200 (getestet), HUB2000 und AIO (beide ungetestet)!

## Anmerkungen
1. Bitte deaktiviere/entferne alle Häkchen in der Zendure App, sonst ist das Einstellen der Leistungsbegrenzung nicht möglich!

   ![Solarflow-Einstellungsfenster](https://raw.github.com/nograx/ioBroker.zendure-solarflow/master/Screenshots/ZendureSolarflowSettings.png)

2. Sie werden aus der offiziellen iOS- oder Android-App abgemeldet, nachdem Sie sich mit dem ioBroker-Adapter angemeldet haben. Dies ist ein normales Verhalten. Als Workaround können Sie ein zweites Zendure-Konto mit einer anderen E-Mail-Adresse erstellen und diesem Konto Zugriff auf Ihren Solarflow HUB gewähren. Verwenden Sie dann das zweite Konto für ioBroker / den Zendure Solarflow-Adapter.

## Credits
Credits gehen an https://github.com/reinhard-brandstaedter/solarflow, das mit dem Wissen über den MQTT-Server von Zendure sehr geholfen hat! Danke!

## Spenden
Wenn Sie den Adapter für sich nützlich finden und meine Arbeit unterstützen möchten, können Sie gerne per Paypal spenden. Vielen Dank! (Dies ist ein persönlicher Spendenlink für Nograx und steht in keinem Zusammenhang mit dem ioBroker-Projekt!)<br />

## Changelog
### 1.4.0 (2024-04-03)

- Add calculation states for solar input 1 & 2
- Add states for wifiState, hubState, pvBrand and inverseMaxPower
- Rename missleading title for input field 'Username' in settings to 'E-Mail'
- Fix energyWh, energyWhMax and SOC in calculations if "Low Voltage Check" is not used, it will set the calculation soc to 0 if minSoc (discharge limit) is reached
- Fix password input in settings

### 1.3.0 (2024-03-26)

- Fix calculation for outputPackEnergy and packInputEnergy
- Trigger full telemetry update on adapter start
- Add state and control for buzzer switch
- Add state and control for bypass mode and automatic reset of bypass mode next day
- Add states for pass (Bypass on/off), autoRecover (auto-mode for Bypass next day) and passMode (current bypass mode)
- Add efficiency factor for calculations (96% charging, 92%-98%\* for discharging - based on measuring from VoltAmpereLux Youtube channel - THANKS!)
- Changed calculations timeframe from 10secs to 30secs (performance related)

### 1.2.5 (2024-03-19)

- Fix error "Read-only" state written without ack-flag

### 1.2.4 (2024-03-18)

- Use setInterval instead of cronjob for refreshing access token

### 1.2.3 (2024-03-15)

- Fix ACK on onStateChange
- Update Readme

### 1.2.2 (2024-03-14)

- Fix issue that renamed devices could not be found.
- Add states for name, product name, serial ID and configured server.
- Make "energyWhMax" State writable, so you can adjust the max Value.
- Sent a warning if a device is configured for a server not in use.

### 1.2.1 (2024-03-13)

- Fix calculation of soc: Set energyMaxWh to current energyWh if Zendures SOC is 100%
- Round SOC to max 1 digit after comma.

### 1.2.0 (2024-03-13)

- EU server is working now.
- Fix calculation errors in log when calculation is not used
- More Debug Output
- Filter SolarFlow devices, so no other devices (e.g. SmartPlugs) will be added.
- Clear password when settings loaded, as encrypted password is loaded into input and leads to a wrong password.

### 1.1.23 (2024-03-11)

- Fix calculation of "energy in batteries"
- Try to implement EU server - untested -

### 1.1.22 (2024-03-09)

- Try to fix reset values at midnight

### 1.1.21 (2024-03-08)

- Fix calculation timeframe

### 1.1.17 (2024-03-08)

- Improve calculations
- No autocomplete on settings

### 1.1.15 (2024-03-06)

- Calculations improved
- Stop energy input on low voltage is now an option in settings

### 1.1.14 (2024-03-04)

- Reorganize Code
- Calculations are now optional and have to be enabled in settings
- Calculation of SOC from voltage and energy go in and out of batteries
- Stop energy feed if voltage drops under limit

### 1.1.11 (2024-03-01)

- Fix Solar Input 1 and 2 from the new Zendure firmware
- Fix remaining charging time
- Fix calculations overwritten when data with 0 value comes in.

### 1.1.8 (2024-02-29)

- Fix calculation error

### 1.1.7 (2024-02-29)

- Add energy calculations for 'today'
- Fix minutes display bug for remaining charge and discharge time

### 1.1.4 (2024-02-28)

- Fix timeout issues

### 1.1.0 (2024-02-27)

- Switched solar input 1 und 2 to adjust the behavior like the offical app
- Added Calculations folder, remaining charge and discharge time is now available as formatted time
- Added a note in the settings that this adapter only works with the global server

### 1.0.7 (2024-01-16)

- Add control for charge and discharge limit
- Update Readme Screenshot

### 1.0.6 (2024-01-16)

- Update Readme

### 1.0.5 (2024-01-15)

- Added state for both Solarflow PV inputs

### 1.0.4 (2023-12-16)

- Added Timeout for axios

### 1.0.3 (2023-12-12)

- Password is now encrypted. NOTE: You have to re-enter the password after adapter update!

### 1.0.2 (2023-12-12)

- Adapter improvements suggested by iobroker team
- Fixed battery pack temperature (data is in kelvin, so now converting to celcius)

### 1.0.1 (2023-11-03)

- Fix translationscd so
- Use 'extendObjectAsync' instead of 'setObjectNotExistsAsync'
- First official release version

### 0.1.0-alpha.2 (2023-10-27)

- Don't stop the adapter when no login information is provided!

### 0.1.0-alpha.1 (2023-10-27)

- Fix Typescript typos

### 0.1.0-alpha.0 (2023-10-26)

- Get battery information
- Reset states if no new data comes in (e.g. when Hub goes offline). Currently the last value still persist when Hub goes offline, so you may have 'pseudo' data in your states.

### 0.0.2 (2023-10-25)

- Initital Release, retrieving Hub data, telemetry and setting the output limit works!

### 0.0.1 (2023-10-24)

- First test

## License

MIT License

Copyright (c) 2024 Peter Frommert

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