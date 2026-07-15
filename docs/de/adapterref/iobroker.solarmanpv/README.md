---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.solarmanpv/README.md
title: ioBroker.solarmanpv
hash: QEmnX/veJh16zAHkvrteP/h5/cifw+VnHqwPi9K30i0=
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

## Kompatibilität
- Getestet mit Node.js 22
- Getestet mit js-controller 7
- Vorhandene, fehlerhaft typisierte ioBroker-Zustände werden beim nächsten Adapterlauf automatisch korrigiert.
- Das manuelle Löschen vorhandener Objekte ist nicht erforderlich

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- Fix dynamic state type handling
- Automatically repair incorrect ioBroker state types
- Improved compatibility with js-controller 7
- Better handling of string based Solarman values

### 0.7.4 (2026-05-29)

- (raschy) Bump axios from 1.13.6 to 1.16.1
- (raschy) Removed the unused 'paket' module
- (raschy) NodeJS >= 22.x is required

### 0.7.3 (2025-11-04)

- (raschy) Bump axios from 1.12.2 to 1.13.1
- (raschy) Token encryption revoked
- (raschy) Dependencies updated according to Dependabot on November 24

### 0.7.2 (2025-10-01)

- (raschy) Bump axios from 1.11.0 to 1.12.2

### 0.7.1 (2025-04-25)

- (raschy) jsonConfig customized

### 0.7.0 (2025-04-23)

- (raschy) NodeJS >= 20.x and js-controller >= 6 is required
- (raschy) email and appsecret is now encrypted, please re-enter!

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2022-2026 raschy <raschy@gmx.de>

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