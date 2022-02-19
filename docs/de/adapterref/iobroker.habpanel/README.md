---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.habpanel/README.md
title: ioBroker.habpanel
hash: LQ+bSxPyPWV8TE+RtEIB/MJ9/cWlzUQ1dv6yj5LrkU8=
---
![Logo](../../../en/adapterref/iobroker.habpanel/admin/habpanel.png)

![Anzahl der Installationen](http://iobroker.live/badges/habpanel-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.habpanel.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.habpanel.svg)
![NPM](https://nodei.co/npm/iobroker.habpanel.png?downloads=true)

# IoBroker.habpanel
HABPanel ist eine leichtgewichtige Dashboard-Schnittstelle für ioBroker, die auf OpenHAB HABpanel basiert.

Es verfügt insbesondere über einen eingebetteten Dashboard-Designer, mit dem Schnittstellen einfach direkt auf dem Zielgerät erstellt werden können.

## Installation
**Wichtig!** Dieser Adapter kann nicht direkt von GitHub installiert werden. Nur von npm.

## Einstieg
- Wenn Sie zum ersten Mal mit einem neuen Browser oder Gerät auf HABPanel zugreifen, sollte Ihnen ein eher leerer Bildschirm angezeigt werden - folgen Sie dem Tutorial und beginnen Sie, indem Sie auf das Symbol in der oberen rechten Ecke klicken (oder tippen) .
- Sie befinden sich jetzt im Bearbeitungsmodus, ein Link (_"Neues Dashboard hinzufügen"_) wurde angezeigt, ebenso wie ein Link _"Erweiterte Einstellungen"_.
- Wenn Sie zuvor HABPanel verwendet und einige Panel-Konfigurationen auf dem Server gespeichert haben, gehen Sie zu _"Erweiterte Einstellungen"_ und klicken Sie auf Ihre vorherige Konfiguration - sie wird sofort wiederhergestellt. Oder erstellen Sie Ihr erstes Dashboard: Klicken/tippen Sie auf den Link _"Neues Dashboard hinzufügen"_ und geben Sie ihm einen Namen.
- Klicken/tippen Sie auf die Dashboard-Kachel, um den Dashboard-Editor aufzurufen
- Fügen Sie Ihr erstes Widget hinzu: Wählen Sie das Menü _„Widget hinzufügen“_ und wählen Sie einen Widget-Typ aus (sagen wir Dummy – ein einfaches Widget, das den Status eines Elements anzeigt)
- Verschieben Sie das Widget per Drag-and-Drop und ändern Sie die Größe mit dem weißen Chevron - es erscheint, wenn Sie auf das Widget klicken
- Klicken Sie auf die drei Punkte in der oberen rechten Ecke des Widgets, um das Kontextmenü aufzurufen, und wählen Sie _"Bearbeiten..."_
- Passen Sie einige Einstellungen an (Name, openHAB-Element usw.) und bestätigen Sie Ihre Änderungen
- Speichern Sie Ihre Konfiguration, indem Sie auf die Schaltfläche _Speichern_ klicken/tippen
- Klicken/tippen Sie auf _Ausführen_, um Ihr Dashboard in Aktion zu sehen. Verwenden Sie die Zurück-Schaltfläche Ihres Browsers oder den Pfeil, um zum Zeichenbrett zurückzukehren
- Wenn Sie mit Ihren Dashboards zufrieden sind, gehen Sie zurück zu _"Erweiterte Einstellungen"_ und klicken/tippen Sie dann auf _"Aktuelle Konfiguration in einer neuen Panel-Konfiguration speichern"_; Dadurch wird es wie oben beschrieben auf dem openHAB 2-Server gespeichert und zur Wiederverwendung verfügbar gemacht.

## Screenshots
![](../../../en/adapterref/iobroker.habpanel/doc/images/habpanel_screenshot0.png)

![](../../../en/adapterref/iobroker.habpanel/doc/images/habpanel_screenshot1.png)

![](../../../en/adapterref/iobroker.habpanel/doc/images/habpanel_screenshot2.png)

![](../../../en/adapterref/iobroker.habpanel/doc/images/habpanel_screenshot3.png)

![](../../../en/adapterref/iobroker.habpanel/doc/images/habpanel_screenshot4.png)

![](../../../en/adapterref/iobroker.habpanel/doc/images/habpanel_screenshot5.png)

![](../../../en/adapterref/iobroker.habpanel/doc/images/habpanel_screenshot6.png)

<!-- Platzhalter für die nächste Version (am Zeilenanfang):

### __LAUFENDE ARBEIT__ -->

## Changelog
### 0.5.0 (2022-02-16)
* (jogibear9988) added on support for new websockets

### 0.4.3 (2020-08-22)
* (bluefox) The compatibility to socket.io 3.0.13 provided

### 0.4.1 (2020-02-10)
* (Apollon77) compatibility to web 3.0

### 0.3.5 (2019-04-15)
* (yaming116) bugfix i18n

### 0.3.4 (2019-02-04)
* (janfromberlin) button widget did not handle primitive boolean commands
* (matthiasgasser) fix time series query start date, adapted end date

### 0.3.3 (2019-02-02)
* (janfromberlin) fix button toggle functionality for true/false

### 0.3.2 (2019-01-30)
* (foxthefox) chart and timeline functionality fixed

### 0.3.1 (2019-01-27)
* (foxthefox) chart and timeline functionality added

### 0.2.6 (2019-01-14)
* (jogibear9988) bugfix selection element

### 0.2.5 (2019-01-14)
* (jogibear9988) bugfix format strings

### 0.2.4 (2019-01-13)
* (jogibear9988) bugfix template widget

### 0.2.3 (2019-01-11)
* (jogibear9988) upgrade to current openhab version

### 0.1.7 (2017-05-20)
* (bluefox) add to welcome screen

### 0.1.6 (2017-05-15)
* (bluefox) initial commit

## License
Copyright 2017-2022 bluefox <dogafox@gmail.com>

Eclipse Public License