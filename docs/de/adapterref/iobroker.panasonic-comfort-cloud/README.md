---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.panasonic-comfort-cloud/README.md
title: ioBroker.panasonic-comfort-cloud
hash: sqfABqA6wA52wyawmJ7WzSskxwfKPBinc1h0pkkzClE=
---
![NPM-Version](http://img.shields.io/npm/v/iobroker.panasonic-comfort-cloud.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.panasonic-comfort-cloud.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/marc2016/iobroker.panasonic-comfort-cloud.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/marc2016/ioBroker.panasonic-comfort-cloud/badge.svg)
![NPM](https://nodei.co/npm/iobroker.panasonic-comfort-cloud.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/marc2016/ioBroker.panasonic-comfort-cloud/master.svg)

| :Warnung: WARNUNG |
|:---------------------------|
| Neue App-Version in den Adaptereinstellungen ist 1.17.0 |

![Logo](../../../en/adapterref/iobroker.panasonic-comfort-cloud/admin/panasonic-comfort-cloud.png)

# IoBroker.panasonic-comfort-cloud
## Panasonic-Comfort-Cloud-Adapter für ioBroker
Adapter zur Steuerung von Geräten in der Panasonic Comfort Cloud. Es verwendet REST-Aufrufe, die aus der offiziellen Comfort Cloud-App extrahiert werden.
Um den Adapter zu verwenden, müssen Sie Ihren Benutzernamen und Ihr Passwort in der Konfiguration eingeben. Sie werden verwendet, um den Zugriff auf die Comfort Cloud zu authentifizieren. Informationen aller Geräte werden automatisch abgerufen und als Objekt eingefügt. Der Adapter pollt die Geräteinformationen zyklisch (siehe Intervall in den Einstellungen) und sendet Befehle direkt an die Cloud.

Bei der verwendeten Methode kann immer nur ein Client mit dem Konto angemeldet sein.
Es wird empfohlen, ein zweites Konto zu verwenden, für das die Geräte freigegeben wurden.

## Changelog

### 2.1.0
* Added app version to settings.

### 2.0.6
* panasonic-comfort-cloud-client updated to new version. (appVersion changed again)

### 2.0.5
* Translation for news added.

### 2.0.4
* New version of dependencies installed.

### 2.0.3
* panasonic-comfort-cloud-client updated to new version. (appVersion changed again)

### 2.0.2
* panasonic-comfort-cloud-client updated to new version.

### 2.0.1
* Changed the type of some states from string to number.

### 2.0.0
* Added js-controller 3 dependency.
* Added username and password to protectedNative and password to encryptedNative.
* Added connection info.
* Changed schdule to timeout for refresh.
* Fixes for async await pattern.

### 1.2.9
* Error handling for get device added.

### 1.2.8
* Fixed bug in Comfort Cloud client.

### 1.2.7
* Comfort Cloud client updated.

### 1.2.6
* Fixed bug that guid is null in device creation.

### 1.2.5
* *Comfort Cloud client updated.

### 1.2.4
* Fixed bug with undefined guid. Log messages added.

### 1.2.3
* Set parameters only for writable states.

### 1.2.2
* *Fixed error handling and added stack info.

### 1.2.1
* Fixed bug in refesh device method.

### 1.2.0
* States insideTemperature, outTemperature and Nanoe added.

## License
MIT License

Copyright (c) 2022 marc <marc@lammers.dev>

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