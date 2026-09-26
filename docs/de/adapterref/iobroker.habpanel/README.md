---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.habpanel/README.md
title: ioBroker.habpanel
hash: aSH9A13YJXwEXrBNweRSbqssJr9w/v5FtYlP+DSpb6w=
---
![Logo](../../../en/adapterref/iobroker.habpanel/admin/habpanel.svg)

![Anzahl der Installationen](http://iobroker.live/badges/habpanel-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.habpanel.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.habpanel.svg)
![NPM](https://nodei.co/npm/iobroker.habpanel.png?downloads=true)

# ioBroker.habpanel

HABPanel ist eine leichtgewichtige Dashboard-Oberfläche für ioBroker, die auf OpenHAB HABpanel basiert.

Es verfügt insbesondere über einen integrierten Dashboard-Designer, der es ermöglicht, Benutzeroberflächen direkt auf dem Zielgerät einfach zu erstellen.

## Installation

**Wichtig!** Dieser Adapter kann nicht direkt von GitHub installiert werden. Nur über npm.

## Erste Schritte

- Wenn Sie HABPanel zum ersten Mal über einen neuen Browser oder ein neues Gerät aufrufen, sollte Ihnen ein ziemlich leerer Bildschirm angezeigt werden. Folgen Sie dem Tutorial und beginnen Sie, indem Sie auf das Symbol in der oberen rechten Ecke klicken (oder tippen).
- Sie befinden sich nun im Bearbeitungsmodus. Es erscheint ein Link ( _„Neues Dashboard hinzufügen“_ ) sowie ein Link _„Erweiterte Einstellungen“_ .
- Wenn Sie HABPanel zuvor verwendet und Panel-Konfigurationen auf dem Server gespeichert haben, gehen Sie zu _„Erweiterte Einstellungen“_ und klicken Sie auf Ihre vorherige Konfiguration – diese wird sofort wiederhergestellt. Alternativ können Sie Ihr erstes Dashboard erstellen: Klicken/Tippen Sie auf den Link _„Neues Dashboard hinzufügen“_ und geben Sie ihm einen Namen.
- Klicken/Tippen Sie auf die Dashboard-Kachel, um den Dashboard-Editor zu öffnen.
- Fügen Sie Ihr erstes Widget hinzu: Wählen Sie das Menü _„Widget hinzufügen“_ und wählen Sie einen Widget-Typ (sagen wir Dummy – ein einfaches Widget, das den Status eines Elements anzeigt).
- Verschieben Sie das Widget per Drag & Drop und ändern Sie seine Größe mit dem weißen Pfeil – dieser erscheint, wenn Sie auf das Widget klicken.
- Tippen Sie auf die drei Punkte in der oberen rechten Ecke des Widgets, um das Kontextmenü aufzurufen, und wählen Sie _„Bearbeiten…“._
- Passen Sie einige Einstellungen an (Name, openHAB-Element usw.) und bestätigen Sie Ihre Änderungen.
- Speichern Sie Ihre Konfiguration durch Klicken/Tippen auf die Schaltfläche _„Speichern“_ .
- Klicken/Tippen Sie auf _„Ausführen“_ , um Ihr Dashboard in Aktion zu sehen – verwenden Sie die Zurück-Schaltfläche Ihres Browsers oder den Pfeil, um zum Anfang zurückzukehren.
- Sobald Sie mit Ihren Dashboards zufrieden sind, gehen Sie zurück zu _„Erweiterte Einstellungen“_ und klicken/tippen Sie dann auf _„Aktuelle Konfiguration in neuer Panelkonfiguration speichern“_ . Dadurch wird sie wie oben beschrieben auf dem openHAB 2-Server gespeichert und steht zur Wiederverwendung zur Verfügung.

## Screenshots

![](../../../en/adapterref/iobroker.habpanel/doc/images/habpanel_screenshot0.png)

![](../../../en/adapterref/iobroker.habpanel/doc/images/habpanel_screenshot1.png)

![](../../../en/adapterref/iobroker.habpanel/doc/images/habpanel_screenshot2.png)

![](../../../en/adapterref/iobroker.habpanel/doc/images/habpanel_screenshot3.png)

![](../../../en/adapterref/iobroker.habpanel/doc/images/habpanel_screenshot4.png)

![](../../../en/adapterref/iobroker.habpanel/doc/images/habpanel_screenshot5.png)

![](../../../en/adapterref/iobroker.habpanel/doc/images/habpanel_screenshot6.png)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### 1.0.0 (2026-09-25)
- (nowrap) Chart series are no longer truncated to 500 values (#149)
- (nowrap) getHistory no longer invokes its callback twice on a late answer
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (copilot) Adapter requires admin >= 7.6.17 now
- (mcm1957) Dependencies have been updated.
- (@GermanBluefox) SVG Logo

### 0.5.0 (2022-02-16)
* (jogibear9988) added on support for new websockets

### 0.4.3 (2020-08-22)
* (bluefox) The compatibility to socket.io 3.0.13 provided

### 0.4.1 (2020-02-10)
* (Apollon77) compatibility to web 3.0

### 0.3.5 (2019-04-15)
* (yaming116) bugfix i18n

## License
Copyright (c) 2024-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>
Copyright 2017-2022 bluefox <dogafox@gmail.com>

Eclipse Public License