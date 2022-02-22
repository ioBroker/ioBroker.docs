![Logo](https://github.com/Newan/ioBroker.webuntis/admin/webuntis.png)
# ioBroker.webuntis

[![NPM version](https://img.shields.io/npm/v/iobroker.webuntis.svg)](https://www.npmjs.com/package/iobroker.webuntis)
[![Downloads](https://img.shields.io/npm/dm/iobroker.webuntis.svg)](https://www.npmjs.com/package/iobroker.webuntis)
![Number of Installations](https://iobroker.live/badges/webuntis-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/webuntis-stable.svg)
[![Dependency Status](https://img.shields.io/david/Newan/iobroker.webuntis.svg)](https://david-dm.org/Newan/iobroker.webuntis)

[![NPM](https://nodei.co/npm/iobroker.webuntis.png?downloads=true)](https://nodei.co/npm/iobroker.webuntis/)

**Tests:** ![Test and Release](https://github.com/Newan/ioBroker.webuntis/workflows/Test%20and%20Release/badge.svg)

## webuntis adapter for ioBroker


Dieser Adapter bezieht Daten aus Webuntis. Für eine deutsche Anleitung

This Adapter get data from WebUntis. For english-tutorial ![click here](https://github.com/Newan/ioBroker.webuntis/readme.md)

## Konfiguration
Nach der Installation des Adapters in Iobroker und dem erstellen einer Instanz, erscheint automatisch
das Konfigurationsfenster.

Zur Vorbereitung, geht man in einem Webbrowser auf die Seite ![webuntis.com](https://webuntis.com)
Im Suchfeld auf der Seite gibt man den gewünschten Schulnamen ein.
Daraufhin öffnet sich eine Webseite. In der Adresszeile des Browsers stehen nun die gewünschten Daten.

![webuntis_start](img/webuntis_start.png)


Wir benötigen folgende Strings aus der Adresszeile

- the base-url 
- the school-secret

Im Beispiel-Screenshot sind dies folgende Daten als Beispiel:
https://hepta.webuntis.com/WebUntis/?school=hbs-F%C3%BCrth#/basic/login
        
- hepta.webuntis.com    => the schoolbase-URL
- hbs-F%C3%BCrth        => the school-secret

**Sollte im school-Sercet ein __+__ vorhanden sein. Muss dieses im folgenden Schritt durch ein Leerzeichen ersetzt werden**

Nun wechselt man in Iobroker-Konfigurationsfenster des Adapters

![webuntis_config](img/webuntis_config.png)

- Unter Username (Kind oder Elternteil) gibt man den Benutzernamen ein.
- Unter Passwort, das Passwort des Users
- Unter school-secret gibt man den Teil der Webadresse ein, der zwischen "/?school" und "#/" steht
- Unter schoolbase-URL gibt man den Teil der Webadresse ein, der zwischen "https://" und "/webuntes/" steht

Speichern und nun erhält man alle Daten die der Adapter abrufen kann.

Wer Anregungen zur Verbesserung des Adapters hat, kann gerne einen hier oder im Iobroker-Forum an uns weiterleiten:
https://forum.iobroker.net/topic/51690/tester-neuer-adapter-webuntis

