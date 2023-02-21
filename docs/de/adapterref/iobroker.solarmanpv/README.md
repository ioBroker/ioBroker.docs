---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.solarmanpv/README.md
title: ioBroker.solarmanpv
hash: 7hTeqs7cFSPhIFgo6aIioWPKCwa7Wkbv7FuSaXezEks=
---
![Logo](../../../en/adapterref/iobroker.solarmanpv/admin/solarmanpv.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.solarmanpv.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.solarmanpv.svg)
![Anzahl der Installationen](https://iobroker.live/badges/solarmanpv-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/solarmanpv-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/raschy/iobroker.solarmanpv.svg)
![NPM](https://nodei.co/npm/iobroker.solarmanpv.png?downloads=true)

# IoBroker.solarmanpv
**Tests:** ![Testen und freigeben](https://github.com/raschy/ioBroker.solarmanpv/workflows/Test%20and%20Release/badge.svg)

## Solarmanpv-Adapter für ioBroker
Auslesen von Daten aus dem Balkonkraftwerk

### Einstieg
Dieser Adapter dient dazu, Daten eines Balkonkraftwerks anzuzeigen, die von einem Wechselrichter „Bosswerk MI600“ in ioBroker bereitgestellt werden. Dieser Wechselrichter ist mit anderen in der Deye-Familie kompatibel.

Ich gehe davon aus, dass die Anlage bisher von der App „Solarman“ überwacht wird.
Dieser Adapter bezieht die Daten aus dieser Cloud.

Zuerst müssen Sie den Solarman-Support <service@solarmanpv.com> fragen, um die benötigten Zugangsdaten (app_id & app_secret) anzufordern.
Es kann immer noch eine Abfrage des Typs „Ich muss fragen, welche Plattform Sie verwenden? Was ist Ihre Rolle? Sind Sie eine Einzelperson, O&M-Anbieter, Hersteller oder Händler? Können Sie mir Ihre E-Mail-Adresse für die API geben? ". In meinem Fall kam dann eine weitere Abfrage: „Warum bewirbst du dich für API?“. Auch diese Frage beantwortete ich höflich und bekam am nächsten Tag die nötigen Daten zugeschickt.

Auf der Admin-Seite müssen die 4 Felder der Beschreibung entsprechen.
Dieser Adapter wird als "geplanter" Adapter erstellt.
Da die Daten in der Cloud nur etwa alle 6 Minuten aktualisiert werden, macht es keinen Sinn, den Adapter häufiger zu starten.

Seit Version 0.3.0 wird im Gegensatz zu den Vorgängerversionen eine Blacklist ermöglicht. Das bedeutet, dass „alle“ von der Api gelieferten Werte eingelesen werden und der Nutzer die nicht benötigten Werte über die Blacklist herausfiltern kann. Die entsprechenden Datenpunkte können gelöscht werden, was die Anzahl der Objekte übersichtlicher macht.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
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

### 0.0.1 (2022-06-16

* (raschy) initial release

## License
MIT License

Copyright (c) 2023 raschy <raschy@gmx.de>

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