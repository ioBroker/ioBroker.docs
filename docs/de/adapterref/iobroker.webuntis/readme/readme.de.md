---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.webuntis/readme/readme.de.md
title: ioBroker.webuntis
hash: 2zyXQ+eth4PsBxl3M8+AAEMZhT4Nfg3Erk9UW8e503M=
---
![Logo](https://github.com/Newan/ioBroker.webuntis/admin/webuntis.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.webuntis.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.webuntis.svg)
![Anzahl der Installationen](https://iobroker.live/badges/webuntis-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/webuntis-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/Newan/iobroker.webuntis.svg)
![NPM](https://nodei.co/npm/iobroker.webuntis.png?downloads=true)

# IoBroker.webuntis
**Tests:** ![Testen und Freigeben](https://github.com/Newan/ioBroker.webuntis/workflows/Test%20and%20Release/badge.svg)

## Webuntis-Adapter für ioBroker
Dieser Adapter bezieht Daten von Webuntis. Für eine deutsche Anleitung

Dieser Adapter bezieht die Daten von WebUntis. Für das Englisch-Tutorial ![klicken Sie hier](https://github.com/Newan/ioBroker.webuntis/readme.md)

## Konfiguration
Nach der Installation des Adapters in Iobroker und dem Erstellen einer Instanz erscheint automatisch das Konfigurationsfenster.

Zur Vorbereitung geht man in einem Webbrowser auf die Seite ![webuntis.com](https://webuntis.com) Im Suchfeld auf der Seite gibt man den gewünschten Schulnamen ein.
Daraufhin öffnet sich eine Webseite. In der Adresszeile des Browsers stehen nun die gewünschten Daten.

![webuntis_start](../../../../en/adapterref/iobroker.webuntis/readme/img/webuntis_start.png)

Wir benötigen folgende Strings aus der Adresszeile

- die Basis-URL
- das Schulgeheimnis

Im Beispiel-Screenshot sind dies folgende Daten als Beispiel: https://hepta.webuntis.com/WebUntis/?school=hbs-F%C3%BCrth#/basic/login

- hepta.webuntis.com => die Schoolbase-URL
- hbs-F%C3%BCrth => das Schulgeheimnis

**Sollte im Schul-Sercet ein __+__ vorhanden sein. Muss dieses im folgenden Schritt durch ein Leerzeichen ersetzt werden**

Nun wechselt man im Iobroker-Konfigurationsfenster des Adapters

![webuntis_config](../../../../en/adapterref/iobroker.webuntis/readme/img/webuntis_config.png)

- Unter Benutzername (Kind oder Elternteil) gibt man den Benutzernamen ein.
- Unter Passwort, das Passwort des Users
- Unter school-secret gibt man den Teil der Webadresse ein, der zwischen „/?school“ und „#/“ steht
- Unter schoolbase-URL gibt man den Teil der Webadresse ein, der zwischen „https://“ und „/webuntes/“ steht

Speichern und nun erhält man alle Daten, die der Adapter abrufen kann.

Wer Anregungen zur Verbesserung des Adapters hat, kann gerne einen hier oder im Iobroker-Forum an uns weiterleiten: https://forum.iobroker.net/topic/51690/tester-neuer-adapter-webuntis