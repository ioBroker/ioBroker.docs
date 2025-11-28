---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.solarmanpv/README.md
title: ioBroker.solarmanpv
hash: MVx2YA8/8Z7GmDgVctbBhh6XT1v1DNHQrMTnApG3rqE=
---
![Logo](../../../en/adapterref/iobroker.solarmanpv/admin/solarmanpv.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.solarmanpv.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.solarmanpv.svg)
![Anzahl der Installationen](https://iobroker.live/badges/solarmanpv-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/solarmanpv-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/raschy/iobroker.solarmanpv.svg)
![NPM](https://nodei.co/npm/iobroker.solarmanpv.png?downloads=true)

# IoBroker.solarmanpv
**Tests:** ![Test und Freigabe](https://github.com/raschy/ioBroker.solarmanpv/workflows/Test%20and%20Release/badge.svg)

## Solarmanpv-Adapter für ioBroker
Daten vom Balkonkraftwerk ablesen

### Erste Schritte
Dieser Adapter dient zur Anzeige der Daten einer Balkonstromanlage, die von einem Wechselrichter vom Typ „Bosswerk MI600“ in ioBroker bereitgestellt wird. Dieser Wechselrichter ist mit anderen Wechselrichtern der Deye-Familie kompatibel.

Ich gehe davon aus, dass die Anlage bisher von der App „Solarman“ überwacht wird.
Dieser Adapter bezieht die Daten aus dieser Cloud.

Zuerst müssen Sie den Solarman-Support unter service@solarmanpv.com kontaktieren, um die benötigten Zugangsdaten (App-ID und App-Geheimnis) anzufordern.
Es kann sein, dass Sie nach Ihrer Plattform, Ihrer Rolle (Einzelperson, Wartungsdienstleister, Hersteller oder Händler) und Ihrer E-Mail-Adresse für die API gefragt werden. In meinem Fall kam dann noch die Frage: „Warum beantragen Sie die API?“ Ich beantwortete diese Frage höflich und erhielt die benötigten Daten am nächsten Tag.

Auf der Admin-Seite müssen die vier Felder der Beschreibung entsprechen.

Dieser Adapter ist als „geplanter“ Adapter erstellt.

Da die Daten in der Cloud nur etwa alle sechs Minuten aktualisiert werden, ist ein häufigerer Start des Adapters nicht erforderlich.

Seit Version 0.3.0 ist im Gegensatz zu den Vorgängerversionen eine Blacklist möglich. Das bedeutet, dass alle von der API gelieferten Werte eingelesen werden und der Benutzer die nicht benötigten Werte mithilfe der Blacklist herausfiltern kann. Die entsprechenden Datenpunkte können gelöscht werden, wodurch die Anzahl der Objekte übersichtlicher wird.

Seit dem 16.04.2023 nutzt Solarman eine neue Plattform – Version 0.4.0.
Weitere Anpassungen der API wurden, soweit vorhanden, nicht vorgenommen.

In den Versionen 0.5.2 bis 0.6.x wurden ausschließlich Entwickleranpassungen vorgenommen.

In Version 0.7.0 wurde node-js auf die empfohlene Version 20.x aktualisiert und js-controller >6 zur Voraussetzung gemacht. E-Mail-Adresse und App-Geheimnis werden verschlüsselt. Daher müssen beide Werte nach einem Update erneut eingegeben werden!

In Version 0.7.1 wurden nur geringfügige Anpassungen an der Instanzansicht vorgenommen.

Potenziell sensible Daten wie „activeToken“ sollten verschlüsselt werden, dies funktioniert jedoch nicht zuverlässig. Daher wurde diese Funktion in Version 0.7.3 wieder entfernt.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.7.3 (2025-11-04)
* (raschy) Bump axios from 1.12.2 to 1.13.1
* (raschy) Token encryption revoked
* (raschy) Dependencies updated according to Dependabot on November 24

### 0.7.2 (2025-10-01)
* (raschy) Bump axios from 1.11.0 to 1.12.2

### 0.7.1 (2025-04-25)
* (raschy) jsonConfig customized

### 0.7.0 (2025-04-23)
* (raschy) NodeJS >= 20.x and js-controller >= 6 is required
* (raschy) email and appsecret is now encrypted, please re-enter!

### 0.6.4 (2025-02-06)
* (raschy) Developer system to nodejs 22.x updated

### 0.6.3 (2025-01-02)
* (raschy) Design edited
* (raschy) Migration from ESLint 8.x to 9.x

### 0.6.2 (2024-11-08)
* (raschy) responsive-design customized
* (raschy) updated to adapter-core 3.2.2

### 0.6.1 (2024-08-15)
* (raschy)  renewed version without changes
* (raschy) 	Dependencies require minor releases

### 0.6.0 (2024-08-15)
* (raschy) 	Dependencies require minor releases

### 0.5.3 (2024-08-14)
* (raschy) 	Warning in schema corrected

### 0.5.2 (2024-08-10)
* (raschy) 	updated dependencies
* (raschy)  NodeJS >= 18.x and js-controller >= 5 is required

### 0.5.1 (2023-09-04)
* (raschy) Expanded number of modules

### 0.5.0 (2023-06-16)
* (raschy) Set selected values to zero

### 0.4.3 (2023-06-12)
* (raschy) Blacklist also deletes data points
* (raschy) Fixed error with multiple inverters

### 0.4.2 (2023-05-31)
* (raschy) Module selection activated

### 0.4.1 (2023-05-27)
* (raschy) Do not display devices that are not required

### 0.4.0 (2023-04-16)
* (raschy) Solarman has switched to a new platform

### 0.3.2 (2023-03-28)
* (raschy) Error 'DB-closed' fixed

### 0.3.1 (2023-02-19)
* (raschy) Inverter-Filter deactivated

### 0.3.0 (2023-02-17)
* (raschy) Blacklist added

### 0.2.2 (2023-02-08)
* (raschy) Release for github/npm

### 0.2.1 (2023-02-08)
* (raschy) Timeout extended, type error fixed during setup, some data added from BMS

### 0.2.0 (2022-11-07)
* (raschy) Adding the battery data from hybrid inverters

### 0.1.5 (2022-10-17)
* (raschy) Added support for hybrid inverters and 4 MPPTs

### 0.1.4 (2022-09-17)
* (raschy) Corrections after first review

### 0.1.3 (2022-08-19)
* (raschy) Adapter termination code changed

### 0.1.2 (2022-07-30)
* (raschy) Added device status, structure reduced

### 0.1.1 (2022-07-27)
* (raschy) Clean up the code and start delay

### 0.1.0 (2022-07-26)
* (raschy) Also for multiple inverter per station

### 0.0.14 (2022-07-13)
* (raschy) Extension for multiple plants

### 0.0.13 (2022-07-11)
* (raschy) Clean up the debug values

### 0.0.13-alpha.0 (2022-07-10)
* (raschy) ApiClient swapped to separate file

### 0.0.12 (2022-07-04)
* (raschy) test and release workflow for npm activated

### 0.0.11 (2022-07-03)
* (raschy) Create to release

### 0.0.10 (2022-07-03)
* (raschy) User warnings addet

### 0.0.9 (2022-06-20)
* (raschy) Errorhandling addet

### 0.0.8 (2022-06-19)
* (raschy) Try after clearing folder

### 0.0.7 (2022-06-19)
* (raschy) Try first release

### 0.0.6 (2022-06-19)
* (raschy) Crypto version corrected

### 0.0.5 (2022-06-19)
* (raschy) Crypto version changed

### 0.0.4 (2022-06-19)
* (raschy) Dependecies addet

### 0.0.3 (2022-06-19)
* (raschy) ReadMe changed

### 0.0.2 (2022-06-19)
* (raschy) changed to jsonConfig

### 0.0.1 (2022-06-16)
* (raschy) initial release

## License
MIT License

Copyright (c) 2022-2025 raschy <raschy@gmx.de>

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