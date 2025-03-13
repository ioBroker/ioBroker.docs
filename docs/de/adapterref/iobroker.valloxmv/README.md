---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.valloxmv/README.md
title: kein Titel
hash: /KlW44vUuW6HwukABQM0FnDr1Hfo0C9q6ARHvBvzjzk=
---
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/valloxmv-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.valloxmv.svg)
![Anzahl der Installationen](https://iobroker.live/badges/valloxmv-installed.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.valloxmv.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/hacki11/ioBroker.valloxmv/badge.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/hacki11/iobroker.valloxmv.svg)
![NPM](https://nodei.co/npm/iobroker.valloxmv.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/hacki11/ioBroker.valloxmv/master.svg)

<h1><img src="admin/valloxmv.png" width="64"/>ioBroker.valloxmv</h1>

![Testen und Freigeben](https://github.com/hacki11/ioBroker.valloxmv/workflows/Test%20and%20Release/badge.svg)

## ValloxMV-Adapter für ioBroker
Verbindet Ihr Vallox Air Ventilation-System mit Ihrer ioBroker-Hausautomation.

## Verwendung
* Adapter installieren
* Geräteadresse und Abfrageintervall konfigurieren (60 ist Minimum)
* Zustände wie gewohnt lesen und schreiben

## 1.4.0
* Wartungsversion
* Erhöhen Sie die Engines auf NodeJS 20 als Mindestversion

## 1.3.0
* Wartungsversion
* Aktualisierte Abhängigkeiten (iobroker-core & node)
* Ändern Sie die Benutzeroberfläche in jsconConfig und beheben Sie die vom Repository-Checker erkannten Probleme
* Übersetzung mit i18n von iobroker/adapter-dev aktualisieren
* Aktualisierungsjahr in Lizenz und Readme

### 1.2.0
* NodeJS 10.x-Unterstützung entfernen
* Upgrade auf js-controller 3.3 und Admin 5

### 1.1.3
* Falscher Datentyp (Zahl statt Boolescher Wert) in Profil-Einträgen *_ENABLED [#33](https://github.com/hacki11/ioBroker.valloxmv/issues/33) behoben.
* Festlegen der Verbindungsinformationen ohne Bestätigungswert behoben.

### 1.1.2
* Falscher Datentyp (String) in Temperaturzuständen anstelle von Zahlen behoben

### 1.1.1
* Probleme mit dem Adapter-Checker beheben

### 1.1.0
* A_CYC_BYPASS_LOCKED hinzugefügt
* A_CYC_SUPP_FAN_BALANCE_BASE hinzugefügt
* A_CYC_EXTR_FAN_BALANCE_BASE hinzugefügt
* A_CYC_IP_ADDRESS hinzugefügt
* A_CYC_CELL_STATE wurde auf schreibgeschützt geändert

### 1.0.3
* Probleme mit dem Adapter-Checker beheben

### 1.0.2
* Abonnements eigener Objekte hinzugefügt, um das Schreiben von Werten zu ermöglichen

### 1.0.1
* Das Zurücksetzen der benutzerdefinierten Konfiguration von Objekten wurde behoben
* Abonnement eigener Objekte entfernt

### 1.0.0
* Leere Zustände behoben
* Geänderte boolesche Zustände für Schalter

### 0.1.3
* Experteneinstellungen hinzugefügt (@williandalton, @hliebscher)
* A_CYC_RH_BASIC_LEVEL
* A_CYC_CO2_THRESHOLD
* A_CYC_RH_LEVEL_MODE
* A_CYC_SUPPLY_HEATING_ADJUST_MODE
* A_CYC_OPT_TEMP_SENSOR_MODE

### 0.1.2
* füge den Status „NORMAL“ zu A_CYC_MODE hinzu (@williandalton)

### 0.1.1
* io-package.json-Versionsnummer korrigieren

### 0.1.0
* Profilwechsel und -bearbeitung hinzugefügt

### 0.0.1
* (hacki11) Erstveröffentlichung

## Changelog

## License
MIT License

Copyright (c) 2025 hacki11