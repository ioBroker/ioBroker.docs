---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ankersolix2/README.md
title: ioBroker.ankersolix2
hash: SLi2rDlaXAw4B4c4s+1uBJLdCVtAMj6cKNEMD9deld0=
---
![Logo](../../../en/adapterref/iobroker.ankersolix2/admin/ankersolix2.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.ankersolix2.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.ankersolix2.svg)
![Anzahl der Installationen](https://iobroker.live/badges/ankersolix2-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/ankersolix2-stable.svg)
![NPM](https://nodei.co/npm/iobroker.ankersolix2.png?downloads=true)

# IoBroker.ankersolix2
**Tests:** ![Testen und Freigeben](https://github.com/ronny130286/ioBroker.ankersolix2/workflows/Test%20and%20Release/badge.svg)

## Ankersolix2-Adapter für ioBroker
Anker Solix 2 integrieren

## Beschreibung
Dieses Projekt stammt von https://github.com/tomquist/solix2mqtt und bringt Informationen von der Anker-API direkt in ioBroker.

## Unterstützte Geräte
Ich habe nicht alle [Anker Hardware](https://www.ankersolix.com/) steht zum Testen zur Verfügung. Ich kann nur die Hardware auflisten, die ich getestet habe. Es ist möglich, dass alle anderen [Anker Hardware](https://www.ankersolix.com/) ist auch kompatibel

| Gerät | Beschreibung |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `Solarbank` | - A17C0: Solarbank E1600 (Gen 1)<br> - A17C1: Solarbank 2 E1600 Pro<br> - A17C3: Solarbank 2 E1600 Plus<br> - A17C5: Solarbank 3 E2700 Plus<br> |
| `Smartmeter` | - A17X7: Anker 3-Phasen-WLAN-Smartmeter<br> - SHEM3: Shelly 3EM Smart Meter<br> - SHEMP3: Shelly 3EM Pro Smart Meter |

## Wichtige Änderung
Wenn Sie von v1.x auf 2.x aktualisieren, müssen Sie Ihr Passwort erneut eingeben! Andernfalls wird Ihr Konto gesperrt!!!

## Konfiguration
1. ~~Erstellen Sie ein Familienkonto in der Anker-App und fügen Sie es Ihrem Hauptkonto hinzu~~ Seit Ende Juli 2025 können Sie dasselbe Konto in der App und im Adapter verwenden.
2. Installieren Sie den Adapter
3. Gehen Sie zu den Adaptereinstellungen und legen Sie Ihre Anmeldeinformationen fest
4. Bitte verwenden Sie beim ersten Mal eine hohe Abfragezeit (180 Sekunden), damit Sie genügend Zeit haben, den Adapter zu stoppen, wenn alles schief geht.

Normalerweise können Sie in der Protokolldatei sehen, dass Sie eine Site-ID haben und die Meldung „Veröffentlicht“ erhalten haben.

## Steuerung mit Adapter
1. Sie müssen sich in Ihrem Administratorkonto anmelden
2. Gehen Sie zu den Adaptereinstellungen, Registerkarte Steuerung und aktivieren Sie die Steuerung
3. Wählen Sie die Site-ID aus, die Sie steuern möchten.
4. Kontrolloptionen

4.1. Wählen Sie einen Datenpunkt aus, den Sie zur Steuerung verwenden möchten. Dies kann ein manueller Datenpunkt sein, der per Skript festgelegt wurde, oder ein Smartmeter-Datenpunkt. (Wichtig: Es muss ein numerischer Wert sein.) 4.2. Sie können einen benutzerdefinierten Energiesparplan festlegen. Wenn Sie den Energiesparplan erneut aktivieren möchten, können Sie dies über den Datenpunkt ankersolix2.x.control.SetPowerplan steuern (auf „true“ und „ack“ setzen). 4.3. Sie können das Laden von Wechselstrom aktivieren. Wenn es aktiviert ist, können Sie es über den Datenpunkt ankersolix2.x.control.ACLoading\ steuern (auf „true“ und „ack“ setzen = aktiv (aktuelle Zeit + 12 Stunden), auf „false“ und „ack“ setzen = inaktiv, der benutzerdefinierte Energiesparplan wird ausgewählt).

5. Klicken Sie auf Speichern und starten Sie den Adapter neu

Hinweis: Der Adapter überschreibt die Einstellungen in der App. Wenn Sie die App wieder nutzen möchten, müssen Sie den Adapter bzw. die Steuerungsfunktion deaktivieren.

## Hilft
Wenn Sie Fehler wie 401 haben, überprüfen Sie bitte Ihre Anmeldeinformationen.
Wenn Sie erneut Fehler haben und sich nicht anmelden können, stoppen Sie den Adapter und löschen Sie die Sitzungsdaten unter iobroker-data/ankersolix2.0 (z. B. /opt/iobroker/iobroker-data/ankersolix2/). Starten Sie den Adapter anschließend erneut.

## Doku
- de: [zur Dokumentation](docs/de/README.md)
- de: [zur Dokumentation](docs/en/README.md)

## Du willst mich unterstützen?
[!["Kauf mir einen Kaffee"](https://cdn.buymeacoffee.com/buttons/v2/default-red.png)](https://www.buymeacoffee.com/ronny130286)

## Danksagungen

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.4.0 (2025-09-20)

- (ronny130286) add timeplan (schedule) and userdefine energyplan
- (ronny130286) add Powerplan and AC Loading (for AC devices)

### 2.3.0 (2025-08-16)

- (ronny130286) you can use now same account in app and adapter
- (ronny130286) now you can control the solarbank with adapter (if you use adminaccount)

### 2.2.0 (2025-06-30)

- (ronny130286) battery types and number are adjustable in the instance

### 2.1.2 (2025-05-28)

- (ronny130286) fix for Solix 3

### 2.1.1 (2025-05-15)

- (ronny130286) bugfix

### 2.1.0 (2025-04-17)

- (ronny130286) reorganized analysis option (now selectable in adminconsole)
- (ronny130286) add battery energy to solix devices
- (ronny130286) update packages

### 2.0.0 (2025-03-09)

- (ronny130286) update packages
- (ronny130286) decrypt password in adminui
- (ronny130286) add more language codes
- (ronny130286) reorganized some DP

### 1.1.0 (2025-02-08)

- (ronny130286) add analysis data for week/day
- (ronny130286) update packages

### 1.0.3 (2024-12-06)

- (ronny130286) edit refreshtimer
- (ronny130286) add to repo

### 1.0.2 (2024-12-04)

- (ronny130286) bugfix

### 1.0.1 (2024-12-01)

- (ronny130286) ESLint 9.x

### 1.0.0 (2024-11-29)

- (ronny130286) stable release
- (ronny130286) fixed backup_info object

### 0.1.0-beta.0 (2024-10-02)

- (ronny130286) beta release

### 0.0.3-alpha.0 (2024-09-25)

- (ronny130286) fix session.data
- (ronny130286) npm release

### 0.0.2-alpha.0 (2024-09-20)

- (ronny130286) initial release

## License

MIT License

Copyright (c) 2025 ronny130286 <ronnymatthei@gmx.de>

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