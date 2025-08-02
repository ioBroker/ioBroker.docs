---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.govee-local/README.md
title: kein Titel
hash: 0+ORttMM0E5A5h+aitNGmGMC97RYQQ4WFXIfEaZsbJY=
---
![Logo](../../../en/adapterref/iobroker.govee-local/admin/govee-local.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.govee-local.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.govee-local.svg)
![Anzahl der Installationen](https://iobroker.live/badges/govee-local-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/govee-local-stable.svg)
![NPM](https://nodei.co/npm/iobroker.govee-local.png?downloads=true)

## Govee-local-Adapter für ioBroker
**Tests:** ![Test und Freigabe](https://github.com/boergegrunicke/ioBroker.govee-local/workflows/Test%20and%20Release/badge.svg)

Steuern Sie Govee-Geräte über lokalen Zugriff (keine Cloud)

Um das Govee-Gerät lokal steuern zu können, muss die Funktion explizit in den Einstellungen der Govve-Anwendungseinstellungen aktiviert werden, wie in deren [Dokumentation](<https://app-h5.govee.com/user-manual/wlan-guide#:~:text=Supported%20Product%20Models%20(continually%20updated)> beschrieben. Da ich derzeit nur die H6051-Lampe habe, ist dies das einzige Gerät Ich kann mit testen.

Für **Windows**-Benutzer: Bitte gehen Sie zu den Einstellungen und stellen Sie sicher, dass Sie die richtige Netzwerkschnittstelle auswählen, sonst erhält der Adapter keine Antwort von Govee Devices.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.2.5 (2024-01-13)

-   create only one socket, as the second seems not to be necessary
-   refactoring the code for better structure
-   possibility to choose listen interface in settings

### 0.2.4 (2024-01-05)

-   fix access

### 0.2.2 (2024-01-05)

-   fix color temperature messsage

### 0.2.1 (2023-12-24)

-   repair onOff / all other actions Fixes: [#65](https://github.com/boergegrunicke/ioBroker.govee-local/issues/65)
-   fix log spamming because of wildcard

### 0.2.0 (2023-12-17)

-   support controlling the color
-   extended logging mode

### 0.1.2 (2023-09-06)

-   change icon path and resolution

### 0.1.1 (2023-08-21)

-   fix image

### 0.1.0 (2023-08-09)

-   make search intervals configurable
-   clear all timeouts, when adapter is stopped
-   replace forbidden characters in names
-   update translations
-   update dependecies

### 0.0.6 (2023-05-18)

-   update dependencies

### 0.0.5 (2023-04-02)

-   make pipeline run

### 0.0.4 (2023-04-02)

-   make device status refresh invertal indepentent from device search interval

### 0.0.3 (2023-04-01)

-   update dependecies

### 0.0.2

-   frequently searching for devices and requesting their specific state
-   on / off state, brightness and and color temperature can be controlled

## License

MIT License

Copyright (c) 2024 Børge Grunicke

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