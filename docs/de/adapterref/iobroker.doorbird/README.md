---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.doorbird/README.md
title: ioBroker.doorbird
hash: zbejmqSBx6zSdGTk14KEC5BhMxHrKABP/OtBbL2wL5w=
---
![Logo](../../../en/adapterref/iobroker.doorbird/admin/doorbird.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.doorbird.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.doorbird.svg)
![Prüfungen](https://travis-ci.org/BuZZy1337/ioBroker.doorbird.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.doorbird.png?downloads=true)

# IoBroker.doorbird
## Aufbau
1. Geben Sie die IP ein, auf der der Adapter auf Ereignisse vom Doorbird-Gerät lauschen soll.

(Dies ist normalerweise die IP Ihres ioBroker-Hosts).
Der Adapter versucht, das Feld mit der richtigen IP für Sie vorauszufüllen. Wenn die vorausgefüllte IP nicht die IP Ihres ioBroker-Hosts ist, ändern Sie sie bitte auf die richtige IP.

2. Der Port ist auf „8100“ vordefiniert. Sie können ihn ändern, wenn der Port bereits von einem anderen Dienst verwendet wird.

Versuchen Sie einfach, den Adapter mit diesem Port zu betreiben. Wenn der Port nicht verfügbar ist, erhalten Sie beim Starten des Adapters eine Fehlermeldung. Dann komm einfach hierher zurück und ändere den Port.

3. Geben Sie die IP Ihres Doorbird-Geräts ein. Sie können auf das "Suchsymbol" links neben dem Eingabefeld klicken. Nachdem Sie auf das Symbol geklickt haben, wird oben im Konfigurationsbildschirm eine Meldung angezeigt. Jetzt haben Sie 60 Sekunden Zeit, um die Klingeltaste auf Ihrem Doorbird-Gerät zu drücken. Der Adapter versucht die IP zu erkennen und alle Felder für Sie auszufüllen.
4. Die Geräte-ID (NICHT IP!) Ihres Doorbird.
5. Der Benutzername, der die API-Berechtigung auf dem Doorbird-Gerät haben muss.
6. Das Passwort für den in Feld 5 eingegebenen Benutzernamen.

![Bildschirmfoto](../../../en/adapterref/iobroker.doorbird/img/configscreen.png)

Nachdem Sie alle erforderlichen Informationen in den Konfigurationsdialog eingegeben haben, klicken Sie auf "Speichern und schließen".
Der Adapter sollte jetzt neu starten und Sie können loslegen!

## Changelog
### 0.1.5 (2018-09-18)
* (BuZZy1337) Check response of Doorbird when triggering relays
* (BuZZy1337) Check if any favorite has to be updated (For example when adapter address or port changes)
* (BuZZy1337) Added state for restarting DoorBird Device (There is a bug in DoorBird Firmware. DoorBird will fix it with next FW Update!)
* (BuZZy1337) Change some Code for working more with responses from DoorBird

### 0.1.0 (2018-09-08)
* (BuZZy1337) "public release"
* (BuZZy1337) Changed Adapter address option from dropdown list to input field
* (BuZZy1337) Added Support for triggering Doorbird-Relays

### 0.0.4
* (BuZZy1337) DO A COMPLETE REINSTALL OF THE ADAPTER (DELETE AND INSTALL THE ADAPTER AGAIN!)
DELETE ALL IOBROKER SCHEDULES AND THEN ALL IOBROKER FAVORITES IN YOUR DOORBIRD APP BEFORE STARTING 0.0.4!
* (BuZZy1337) Added support for more than one Doorbell Button
* (BuZZy1337) Encrypted saving of Doorbird Password
* (BuZZy1337) Detect and create Favorites & Schedules on the Doorbird Device.
* There is a Bug in the Doorbird Firmware for the Motion schedule! You can delete and set the Schedule for the Motion sensor in the App - that's a workaround for now.

### 0.0.3
* (BuZZy1337) Added possibility to choose the AdapterIP Address

### 0.0.2
* (BuZZy1337) Just added the info that the Adapter is not ready yet .. just to be sure! ;)

### 0.0.1
* (BuZZy1337) initial release

## License
The MIT License (MIT)

Copyright (c) 2018-2022 BuZZy1337 <buzzy1337@outlook.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.