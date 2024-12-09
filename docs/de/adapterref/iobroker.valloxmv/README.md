---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.valloxmv/README.md
title: ohne Titel
hash: 3D+3x+HEJph1NJ57fT3+09oimGIcDc6gwEzlgDEdlDI=
---
![NPM-Version](http://img.shields.io/npm/v/iobroker.valloxmv.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.valloxmv.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/hacki11/iobroker.valloxmv.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/hacki11/ioBroker.valloxmv/badge.svg)
![NPM](https://nodei.co/npm/iobroker.valloxmv.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/hacki11/ioBroker.valloxmv/master.svg)

<h1><img src="admin/valloxmv.png" width="64"/>ioBroker.valloxmv</h1>

## ValloxMV-Adapter für ioBroker
Verbindet Ihr Vallox Air Ventilation-System mit Ihrer ioBroker-Hausautomation.

## Verwendung
* Adapter installieren
* Geräteadresse und Abfrageintervall konfigurieren (60 ist Minimum)
* Zustände wie gewohnt lesen und schreiben

## In Arbeit
* Aktualisierte Abhängigkeiten (iobroker-core & node)
* Benutzeroberfläche in jsconConfig ändern und vom Repository-Checker erkannte Probleme beheben

### 1.2.0
* NodeJS 10.x-Unterstützung entfernen
* Upgrade auf js-controller 3.3 und Admin 5

### 1.1.3
* Falscher Datentyp (Zahl statt Boolescher Wert) in Profil-Einträgen *_ENABLED behoben [#33](https://github.com/hacki11/ioBroker.valloxmv/issues/33).
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
* A_CYC_CELL_STATE auf schreibgeschützt geändert

### 1.0.3
* Probleme mit dem Adapter-Checker beheben

### 1.0.2
* Abonnements eigener Objekte hinzugefügt, um das Schreiben von Werten zu ermöglichen

### 1.0.1
* Das Zurücksetzen der benutzerdefinierten Konfiguration von Objekten wurde behoben
* Abonnement eigener Objekte entfernt

### 1.0.0
* Leere Zustände behoben
* Bool-Zustände für Schalter geändert

### 0.1.3
* Experteneinstellungen hinzugefügt (@williandalton, @hliebscher)
* A_CYC_RH_BASIC_LEVEL
* A_CYC_CO2_SCHWELLE
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

Copyright (c) 2022 hacki11