---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.lg-ess-home/README.md
title: ioBroker.lg-ess-home
hash: 4GNoYej3oFgZU3Caa/hTX61SFlVk0Tli/uFXc5ZzeE4=
---
![Logo](../../../en/adapterref/iobroker.lg-ess-home/admin/lg-ess-home.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.lg-ess-home.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.lg-ess-home.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/lg-ess-home-installed.svg)
![Anzahl Installationen (stabil)](http://iobroker.live/badges/lg-ess-home-stable.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/Morluktom/ioBroker.lg-ess-home/badge.svg)
![NPM](https://nodei.co/npm/iobroker.lg-ess-home.png?downloads=true)

# IoBroker.lg-ess-home
**Tests:** ![Test und Freigabe](https://github.com/Morluktom/ioBroker.lg-ess-home/workflows/Test%20and%20Release/badge.svg)

## LG ESS Home-Adapter für ioBroker
Ein iobroker-Adapter für einen LG ESS Hybrid-Wechselrichter. Mit diesem Adapter kann der Status des Wechselrichters ausgelesen werden. Es ist auch möglich, den Wechselrichter zu betreiben.

## Aufbau
### Das Passwort erhalten
1. Laden Sie die Datei [LG_Ess_Password.exe] herunter (https://github.com/Morluktom/ioBroker.lg-ess-home/tree/master/tools).
1. Verbinden Sie den Computer mit dem WLAN des LG_ESS-Systems. (WLAN-Passwort steht auf dem Typenschild)
1. Starten Sie LG_Ess_Password.exe (mindestens .Net Framework 4.5 erforderlich)
1. Notieren Sie sich Ihr Passwort

Für diejenigen, die exe nicht mögen: (Danke grex1975)\ Sie können jeden REST-Client verwenden, um das Passwort zu erhalten:

1. Verbinden Sie sich mit dem WLAN des LG_ESS
1. Führen Sie eine POST-Anfrage aus\

URL: https://192.168.23.1/v1/user/setting/read/password \ Header: „Charset“: „UTF-8“, „Content-Type“: „application/json“\ {Body: „key“ : "lgepmsuser!@#"}

Dadurch erhalten Sie im Gegenzug das Passwort und einen Status.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* (Morluktom) Fixed warnings found by adapter checker
* (Morluktom) Added Admin 5 configuration
* (Morluktom) Added Ukrainan language

### 0.2.3 (2022-04-05)
* (Morluktom) Chart widget: Datepicker changed to jquery

### 0.2.2 (2022-04-04)
* (Morluktom) Chart widget updated

### 0.2.1 (2022-04-04)
* (Morluktom) Chart widget updated

### 0.2.0 (2022-03-14)
* (Morluktom) Chart widget added

### 0.1.1 (2022-01-07)
* (Morluktom) replaced deprecated library and login as installer only when needed

### 0.1.0 (2021-11-27)
* (Morluktom) Read chart data and data from the installer settings

### 0.0.10 (2021-05-04)
* (Morluktom) Bugfix boolean value

### 0.0.9 (2021-05-04)
* (Morluktom) Bugfix boolean value

### 0.0.8 (2021-02-06)
* (Morluktom) Code cleanup

### 0.0.7 (2021-02-01)
* (Morluktom) Code cleanup

### 0.0.6 (2020-12-23)
* (Morluktom) Data type recognition fixed

### 0.0.5 (2020-12-15)
* (Morluktom) ScalingFactor moved to nativ
* password encryption => auto encryption (Maybe you have to set the password new)

### 0.0.4
* (Morluktom) W => kW, values confirmed

### 0.0.3
* (Morluktom) Structure of the channel and states changed

### 0.0.2
* (Morluktom) Separate Intervall for Common and Home

### 0.0.1
* (Morluktom) initial release

## License
MIT License

Copyright (c) 2023 Morluktom <strassertom@gmx.de>

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