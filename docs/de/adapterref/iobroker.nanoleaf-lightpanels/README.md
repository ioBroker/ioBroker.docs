---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.nanoleaf-lightpanels/README.md
title: ioBroker.nanoleaf-lightpanels Adapter
hash: EYavG70Hk24uclNC64ybkY58+MhOFmOsttwlvkDW74Q=
---
![Logo](../../../en/adapterref/iobroker.nanoleaf-lightpanels/admin/nanoleaf-lightpanels.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.nanoleaf-lightpanels.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.nanoleaf-lightpanels.svg)
![NPM](https://nodei.co/npm/iobroker.nanoleaf-lightpanels.png?downloads=true)

# IoBroker.nanoleaf-lightpanels Adapter
=================

[![Test und Release](https://github.com/daniel-2k/ioBroker.nanoleaf-lightpanels/actions/workflows/test-and-release.yml/badge.svg?branch=master)](https://github.com/daniel-2k/ioBroker.nanoleaf-lightpanels/actions/workflows/test-and-release.yml)

Dies ist ein ioBroker-Adapter zur Steuerung der nanoleaf Light Panels (ehemals nanoleaf Aurora) oder nanoleaf Canvas und Shapes über die nanoleaf OpenAPI.

## Verbindung zu den nanoleaf Light Panels/Canvas Controller:
1. In den Adaptereinstellungen müssen Sie die IP-Adresse oder den Hostnamen und den Port des nanoleaf Controllers einstellen. Sie können die Suchfunktion verwenden, um alle Nanoleaf-Geräte in Ihrem Netzwerk zu finden.
2. Die Nanoleaf-OpenAPI benötigt ein Autorisierungstoken, um Zugriff auf die OpenAPI zu gewähren. Wenn Sie bereits einen besitzen, können Sie den Token hier eingeben und den nächsten Schritt überspringen.
3. Wenn Sie kein Autorisierungstoken haben, müssen Sie es von der nanoleaf OpenAPI anfordern.

Versetzen Sie dazu den nanoleaf Controller in den Pairing-Modus, indem Sie den Power-Button am Gerät 5-7 Sekunden lang gedrückt halten, bis die LEDs abwechselnd blinken.
Klicken Sie dann innerhalb von 30 Sekunden auf den Button 'Autorisierungstoken beziehen' (der Pairing-Modus stoppt nach 30 Sekunden). Der Adapter muss laufen! Wenn es erfolgreich war, sollte das Autorisierungstoken im Feld 'Authentifizierungstoken' zu sehen sein. Wenn ein Fehler aufgetreten ist, erhalten Sie ein Popup mit der Fehlermeldung (Details können Sie dem Protokoll entnehmen).

4. Speichern Sie die Einstellungen.
5. Viel Spaß!

### Direkte Statusaktualisierung über Server Sent Events (SSE)
Seit Light Panels Firmware-Version > 3.1.0 und Canvas-Firmware-Version > 1.1.0 können Server Sent Events (SSE) für direkte Status-Updates verwendet werden. Für Canvas- und Shapes-Geräte werden Touch-Ereignisse unterstützt.

_Bitte beachten:_ Um zu erkennen, ob das Nanoleaf-Gerät noch am Leben ist, wurden alle 60 Sekunden SSDP-Benachrichtigungen vom Nanoleaf-Gerät gesendet. Bitte stellen Sie sicher, dass Sie UDP-Multicast-Nachrichten auf Port 1900 empfangen können (überprüfen Sie Firewall und Routing). Andernfalls erhalten Sie im Adapter Fehlermeldungen, dass die Verbindung unterbrochen wurde. Wenn Sie Probleme mit Keep Alive haben, stellen Sie bitte die richtige Adapterschnittstelle in den Admin-Einstellungen für den Nanoleaf-Adapter ein.
Stellen Sie bei der Suche nach Geräten sicher, dass Sie Datenverkehr auf UDP-Port 5000 empfangen können.
Mir ist aufgefallen, dass einige Nanoleaf-Geräte plötzlich aufhören, die SSDP-Benachrichtigungsnachrichten zu senden, sodass die Verbindung nicht mehr erkannt wird. Dies ist ein Problem mit dem Nanoleaf-Gerät selbst. Personen, die dieses Problem haben, können die Verwendung des Keep-Alive-Abrufmechanismus anstelle von SSDP-Benachrichtigungsnachrichten in den zusätzlichen Adaptereinstellungen aktivieren.

Die Einstellung des Abfrageintervalls für Statusupdates betrifft nur Geräte mit niedrigeren Firmware-Versionen, bei denen Polling für Statusupdates verwendet wird oder wenn die SSE-Funktion in den zusätzlichen Adaptereinstellungen deaktiviert ist.

## Alexa
Sie können die nanoleaf Light Panels/Canvas mit Alexa über ioBroker (Cloud-Adapter) steuern.
Ein-/Ausschalten, Helligkeit, Farbe und Farbtemperatur werden unterstützt.
Sie müssen die Datenpunkte einrichten

* Zustand (für Ein-/Ausschalten)
* Farbton (für Farbe)
* Sättigung (für Farbe)
* Helligkeit (für Farbe)
* colorTemp (für Farbtemperatur)

im Cloud-Adapter unter demselben Smartnamen.

## IoBroker-Visualisierung
Die Nanoleaf Light Panels/Canvas können in ioBroker Visualization gesteuert werden, indem grundlegende Widgets wie "Radiobuttons on/off" oder Schieberegler zur Steuerung des Energiestatus, der Helligkeit, des Farbtons, der Sättigung und der Farbtemperatur verwendet werden.

Für Effekte können Sie das Widget "Select ValueList" verwenden, um es als Dropdown-Liste zu verwenden, und dann den effectList-Status der value- und text-Eigenschaft des Widgets zuordnen (Typ: "{nanoleaf-lightpanels.0.LightPanels.effectsList}" -> die geschweiften Klammern sind wichtig!)

Um die Farbe zu steuern und zu visualisieren, müssen Sie die Widgets im Farbauswahlstil installieren. Sie können die RGB-ID dem colorRGB-Zustand zuordnen oder auch die drei HSV-Zustände verwenden.

Sie können das nanoleaf vis-Demoprojekt verwenden, das sich im Unterordner /vis auf github befindet.

## Changelog

### 1.2.1 (2021-06-20)
* (daniel_2k) fixed: get a new authorization token is not possible when the current token is already invalid
* (daniel_2k) fixed: device search in admin settings fixed
* (daniel_2k) changed: obtaining an authorization token is also possible when field is already filled

### 1.2.0 (2021-01-03)
* (daniel_2k) new: possibility to use polling for keep alive detection instead of SSDP notify messages (for nanoleaf devices which stop sending SSDP notify packages)
* (daniel_2k) changed: small internal adjustments

### 1.1.1 (2020-12-27)
* (daniel_2k) fixed: error in device detection

### 1.1.0 (2020-12-27)
* (daniel_2k) new: support nanoleaf Shapes

### 1.0.6 (2020-09-14)
* (daniel_2k) changed: force status update for Canvas touch events
* (daniel_2k) new: added debug logging of received data via SSE

### 1.0.5 (2020-09-13)
* (daniel_2k) fixed: touch channel was not created for nanoleaf devices (bug since 1.0.3)

### 1.0.4 (2020-09-06)
* (daniel_2k) new: adapter address can be choosen in adapter settings for interfacing binding issues
* (daniel_2k) changed: use fixed port 5000 for MSEARCH replies for easy setup in firewall

### 1.0.3 (2020-08-30)
* (daniel_2k) fixed: search nanoleaf devices does not work on clean install of adapter
* (daniel_2k) new: added update of effectsList via SSE
* (daniel_2k) new: ability to disable of using SSE (for nanoleaf devices that stops sending ssdp:alive messages)
* (daniel_2k) changed: display nanoleaf device name in admin search result list
* (daniel_2k) changed: using forked "node-upnp-ssdp" for fixing interface binding

### 1.0.2 (2020-07-06)
* (daniel_2k) fixed: detection of ssdp:alive notify message for Canvas (fix disconnect/connect issue)
* (daniel_2k) fixed: sending correct service type for discovery of Canvas devices (fixes no devices found for Canvas devices)
* (daniel_2k) changed: if unknown nanoleaf device is detected Canvas will be used as fallback and warning will be logged
* (daniel_2k) fixed: setting rhythmMode was not working

### 1.0.1 (2020-07-05)
* (daniel_2k) fixed: detection of firmware version for Canvas for enabling SSE (Canvas firmware > 1.1.0 required)

### 1.0.0 (2020-06-18)
* (daniel_2k) new: using server sent events (SSE) for getting updates instead of polling (firmware > 3.1.0 required)
* (daniel_2k) new: support touch events for Canvas
* (daniel_2k) new: searching devices in Admin is now possible
* (daniel_2k) changed: moved duration for brightness state to separate state (please note: duration of in native part of brightness state will no longer work)
* (daniel_2k) changed: some minor internal adjustments
* (daniel_2k) changed: removed Admin2 configuration page

### 0.8.2 (2019-08-02)
* (daniel_2k) fixed: effects with special characters (german umlauts) can now be set (fixes HTTP error code 422)
* (daniel_2k) changed: removed fixed effects *Solid* and *Dynamic* for all devices (works also no longer with Light Panels since firmware update)

### 0.8.1 (2019-01-31)
* (daniel_2k) new: rhythm module mode (microphone/AUX input) can be changed
* (daniel_2k) changed: removed fixed effects *Solid* and *Dynamic* for Canvas because not supported
* (daniel_2k) fixed: Rhythm module information depending of connect state

### 0.8.0 (2019-01-27)
* (daniel_2k) changed: adapter has own nanoleaf-api lib (no dependency), because the nanoleaf-aurora-client module does not implement the nanoleaf API correctly (will be changed until this is fixed in the module)
* (daniel_2k) fixed: should now work properly with Canvas
* (daniel_2k) new: duration for brightness changes added (can be set in native part of brightness state)
* (daniel_2k) new: added compact mode
* (daniel_2k) changed: handling of device states
* (daniel_2k) fixed: command queue will not process when states are written which cannot be processed
* (daniel_2k) changed: some small code adjustments

### 0.7.0 (2019-01-20)
* (daniel_2k) new: compatible with nanoleaf Canvas
* (daniel_2k) changed: Rhythm module information is now obtained depended if it is connected or not (only Light Panels)
* (daniel_2k) changed: some small adjustments

### 0.6.1 (2018-10-13)
* (daniel_2k) fixed: command processing stopping when invalid RGB value is written to 'colorRGB'
* (daniel_2k) changed: more error logging of invalid values send to controller
* (daniel_2k) changed: adjusted types and roles

### 0.6.0 (2018-09-02)
* (daniel_2k) changed: processing commands in sequence (FIFO) ensuring that all commands are executed and avoiding hanging of the nanoleaf-controller sometimes

### 0.5.0 (2018-08-10)
* (daniel_2k) changed: automatically reconnect attemps will be done in any case of connection failures (fixes no reconnect when device hung and was restarted)
* (daniel_2k) new: default minimum values for polling intervals in adapter
* (daniel_2k) new: static effects 'Solid' and 'Dynamic' added to effect states
* (daniel_2k) changed: save settings in admin is only possible when all fields filled
* (daniel_2k) changed: optimized debug logging

### 0.4.1 (2018-07-13)
* (daniel_2k) added automatic testing via Travis and Appveyor
* (daniel_2k) preparations for official repository

### 0.4.0 (2018-06-11)
* (daniel_2k) changed: Authorization token will be obtained now in the adapter settings (not on adapter start)
* (daniel_2k) fixed: some texts in the old adapter settings (Admin2)
* (daniel_2k) new: State 'effect' now contains all possible states (auto updated)
* (daniel_2k) changed: updated AuroraAPI version to 1.2.2

### 0.3.0 (2018-05-12)
* (daniel_2k) new: state "ColorRGB" for controlling color with hex RGB values
* (daniel_2k) changed: updating states from API only when value changed
* (daniel_2k) changed: state effectsList will now be written as a semicolon seperated list to use it with "Select ValueList" widget in ioBroker visualization
* (daniel_2k) new: debug logging
* (daniel_2k) changed: set units for states "saturation" and "hue"

### 0.2.0 (2018-05-03)
* (daniel_2k) adjusted types and roles of states according API JSON response data types
* (daniel_2k) compatible with node.js 4.x

### 0.1.0 (2018-04-23)
* (daniel_2k) initial release

## License
The MIT License (MIT)
Copyright (c) 2020 daniel_2k <daniel_2k@outlook.com>