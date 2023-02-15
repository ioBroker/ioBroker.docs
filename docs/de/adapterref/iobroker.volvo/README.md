---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.volvo/README.md
title: ioBroker.volvo
hash: KQNQQ/Rzgeeh5MCvgqbVVuW6Sf/ZXmF8cDEFXZYqaJc=
---
![Logo](../../../en/adapterref/iobroker.volvo/admin/volvo.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.volvo.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.volvo.svg)
![Anzahl der Installationen (neueste)](http://iobroker.live/badges/volvo-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/volvo-stable.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/TA2k/ioBroker.volvo/badge.svg)
![NPM](https://nodei.co/npm/iobroker.volvo.png?downloads=true)

# IoBroker.volvo
**Tests:** ![Testen und freigeben](https://github.com/TA2k/ioBroker.volvo/workflows/Test%20and%20Release/badge.svg)

## Volvo-Adapter für ioBroker
Volvo On Call und neue Electric API für Android Automotive Cars Adapter

## Login für Nicht-Elektroautos
Nicht-Elektroautos können sich über Benutzername und Passwort anmelden.

## Elektrische Android-Automobile benötigen einen VCC-API-Schlüssel
Registrieren/Anmelden bei <https://developer.volvocars.com/account/>

Sie benötigen ein Google- oder Github-Konto, das nichts mit Ihren APP-Anmeldeinformationen zu tun hat

Erstellen Sie eine Anwendung

Kopieren Sie den primären VCC-API-Schlüssel

![VCC-ApiKey](../../../en/adapterref/iobroker.volvo/vccapikey.png)

Fügen Sie den API-Schlüssel in die Instanzeinstellungen ein

Geben Sie den Benutzernamen und das Passwort der Volvoe-App ein.

## Elektrisches Android steuern
Die Steuerung von Eletric Android mit der volvo.0.id.remote ist derzeit nicht möglich. Die Befehle werden erfolgreich an die API gesendet und akzeptiert, aber es sieht so aus, als ob die API nicht vollständig ist, um das Auto zu steuern.

## Einstieg
Verwenden Sie Objekte unter der Fernbedienung, um das Fahrzeug zu steuern

## Changelog

### 0.1.0

* (TA2k) add new api for electric cars
### 0.0.6

* (TA2k) fix trip object naming
  
### 0.0.5

* (TA2k) fix receiving data

### 0.0.4

* (TA2k) fix jscontroller
  
### 0.0.3

* (TA2k) fix preclimate

### 0.0.2

* (TA2k) initial release

## License

MIT License

Copyright (c) 2020 TA2k <tombox2020@gmail.com>

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