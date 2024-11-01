---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.nuki/README.md
title: ioBroker.nuki
hash: tssDUVscG1a2RiJ4PrJZeRDf+6LBX3lQOGdshxvJA8E=
---
![Logo](../../../en/adapterref/iobroker.nuki/admin/nuki-logo.png)

![Anzahl der Installationen](http://iobroker.live/badges/nuki-installed.svg)
![Stabile Version](http://iobroker.live/badges/nuki-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.nuki.svg)
![Commits seit der letzten Veröffentlichung](https://img.shields.io/github/commits-since/smaragdschlange/ioBroker.nuki/latest.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.nuki.svg)
![NPM](https://nodei.co/npm/iobroker.nuki.png?downloads=true)

# IoBroker.nuki [![Travis CI](https://travis-ci.com/smaragdschlange/ioBroker.nuki.svg?branch=master)](https://travis-ci.com/smaragdschlange/ioBroker.nuki)
Dieser ioBroker-Adapter ermöglicht die Steuerung und Überwachung des [Nuki Smart Lock](https://nuki.io/de/) mithilfe der API der Nuki Bridge.

## Anforderungen
* Eine Nuki (Hardware oder Software) Bridge.
* Ein Nuki Smart Lock und/oder ein Nuki Opener.
* Eine laufende Instanz von ioBroker.

## Verwendung
Jede Instanz des Nuki-Adapters stellt eine Nuki-Bridge dar. Beim Anlegen einer Instanz gibst du einfach IP-Adresse, Port und Token deiner Nuki-Bridge ein. Der Name ist optional und wird automatisch generiert, wenn er leer gelassen wird. Die Checkbox „Callback verwenden“ und der Wert „Callback-Port in ioBroker“ sind optional und können gesetzt werden, um die Callback-Funktion des Nuki zu nutzen. Nach dem Speichern einer Instanz wird für jedes Nuki-Schloss, das mit der angegebenen Nuki-Bridge verbunden ist, ein Bridge-Gerät mit einem Kanal erstellt. Die Kanäle liefern den aktuellen Zustand des Nuki-Schlosses als Ausgabeparameter:

* batteryCritical: Anzeige für schwache Batterie
* deviceType: Typ des Nuki-Gerätes (Smart Lock oder Opener)
* mode: Betriebsmodus des Nuki Gerätes
* doorState: Aktueller (numerischer) Türsensorstatus (Nuki nativ)
* lockState: Anzeige ob Nuki gesperrt ist (nur Nuki Smart Lock)
* Status: Aktueller (numerischer) Sperrstatus (Nuki nativ)
* Zeitstempel: Zuletzt aktualisiert

Darüber hinaus stellen die Kanäle Eingabeparameter zur Verfügung, welche eine grundlegende Steuerung des Nuki-Schlosses ermöglichen:

* Aktion: Numerischer Aktionscode zum Setzen des Nuki Status (Nuki native)

Gültige Eingabewerte für Sperren sind:

0 (keine Aktion) 1 (entsperren) 2 (sperren) 3 (entriegeln) 4 (sperren und los) 5 (sperren und los mit entriegeln)

* lockAction: Schalter zum Sperren/Entsperren des Nuki (true = entsperren; false = sperren)
* openAction: Button zum Entriegeln des Nuki
* openLocknGoAction: Button zum Entriegeln und nach einigen Sekunden Sperren des Nuki
* unlockLocknGoAction: Button zum Entsperren und nach einigen Sekunden Sperren des Nuki

Gültige Eingabewerte für Öffner sind:

0 (keine Aktion) 1 (rto aktivieren) 2 (rto deaktivieren) 3 (Öffneransteuerung) 4 (Dauerbetrieb aktivieren) 5 (Dauerbetrieb deaktivieren)

* rtoAction: Schalter zum Aktivieren/Deaktivieren der Ring to Open Funktion (true = aktivieren; false = deaktivieren)
* openAction: Taster zur Türöffnerbetätigung
* cmActiveAction: Button zum Aktivieren des Continous Mode
* cmDeactiveAction: Button zum Deaktivieren des Continous Mode

## Weitere Informationen
So erhalten Sie Ihr Brücken-Token:

* Rufen Sie http://<bridge_ip>:<bridge_port>/auth von einem beliebigen Browser in Ihrem LAN aus auf -> die Bridge schaltet ihre LED ein
* Drücken Sie innerhalb von 30 Sekunden die Taste der Brücke
* Das Ergebnis des Browseraufrufs sollte ungefähr so aussehen:

{ "token": “token123”, "success": true } Rückruffunktion:

Wird die Callback-Funktion genutzt, versucht der Adapter beim Speichern der Instanz automatisch den Callback auf der Nuki Bridge zu setzen. Beim Entladen der Instanz wird der Callback wieder gelöscht. Alle Nuki-Zustände werden von der Nuki Bridge bei aktiviertem Callback aktuell gehalten.
Callbacks können von jedem Browser aus mit folgenden URLs gesetzt und entfernt werden:

Satz:

* http://<Bridge-IP>:<Bridge-Port>/callback/add?url=http%3A%2F%2F<Host-IP>%3A<Host-Port>%2Fapi%2Fnuki&token=<BridgeToken>

Entfernen:

* http://<Bridge-IP>:<Bridge-Port>/callback/remove?id=<Callback-ID>&token=<BridgeToken>

## Aktualisieren
Beim Update von 1.0.x auf 1.1.0 oder höher wird empfohlen, vor der Installation der neuen Version alle Instanzen der alten Version zu löschen. Bitte beachten Sie, dass Versionsänderungen, die größer sind als auf Patch-Ebene (-> Änderung nur der letzten Ziffer), immer Änderungen an Datenpunkten enthalten können, z. B. 1.1.2 auf 1.1.4.
Beim Update auf 2.x muss das Token erneut eingegeben werden.

## Changelog

### 2.0.1
* (smaragdschlange) update: dependencie updates

### 2.0.0
* (simatec) jsonConfig added
* (simatec) dependency updated
* (simatec) devdependency updated
* (simatec) translate added
* (simatec) test and release added
* (simatec) Release Script added
* (simatec) Remove Travis

### 1.7.0
* (smaragdschlange) update: implementation of latest bridge API changes (battery charge state)

### 1.6.0
* (smaragdschlange) improvement: support for Nuki Smart Door and Nuki Smart Lock 3.0 (Pro)

### 1.5.0
* (smaragdschlange) bug fix: compatibility with jscontroller 3.3.13

### 1.4.4
* (smaragdschlange) update: changes to comply with admin 5.x.x requirements

### 1.4.3
* (smaragdschlange) update: dependency axios to >=0.21.1

### 1.4.2
* (smaragdschlange) bug fix: common.dataSource type had an invalid type

### 1.4.1
* (smaragdschlange) bug fix: references fixed

### 1.4.0
* (smaragdschlange) improvement: support of keypad battery state 
* (smaragdschlange) improvement: support of ring action states for opener

### 1.3.1
* (smaragdschlange) bug fix: some objects did not get updated

### 1.3.0
* (smaragdschlange) improvement: support of doorsensor states

### 1.2.3
* (smaragdschlange) bug fix: convert to template strings

### 1.2.2
* (smaragdschlange) bug fix: get device type by state name when not provided by bridge (software bridge)

### 1.2.0
* (smaragdschlange) improvement: support of hashed token (set to standard)
* (smaragdschlange) improvement: better use of delay before requests in order to prevent null messages

### 1.1.5
* (smaragdschlange) bug fix: clear all timeouts on unload

### 1.1.4
* (smaragdschlange) bug fix: object was not defined

### 1.1.3
* (smaragdschlange) bug fix: deviceType was undefined in case of Opener
* (smaragdschlange) bug fix: Opener action was not set

### 1.1.2
* (smaragdschlange) improvement: added bridge type as object
* (smaragdschlange) bug fix: force reset deviceType on adapter restart

### 1.1.1
* (smaragdschlange) bug fix: default to Nuki Lock when deviceType unknown

### 1.1.0
* (smaragdschlange) improvement: support for Nuki Opener

### 1.0.7
* (smaragdschlange) bug fix: impact on other Nuki-connected gateways

### 1.0.6
* (smaragdschlange) dependencies update

### 1.0.5
* (ldittmar81) add gulp auto translation
* (smaragdschlange) add license

### 1.0.4
* (smaragdschlange) improvement: added Support for Compact mode (js-Controller 2.0 Feature)

### 1.0.3
* (smaragdschlange) bug fix: action buttons were not working properly

### 1.0.1
* (smaragdschlange) version synch

### 1.0.0
* (smaragdschlange) initial release on npm

### 0.2.0
* (smaragdschlange) periodic state updates added
* (smaragdschlange) restructure objects

### 0.1.3
* (smaragdschlange) timestamp bug fixed

### 0.1.2
* (smaragdschlange) minor bugfixes
* (smaragdschlange) added delay before each Nuki request to avoid null responses

### 0.1.1
* (smaragdschlange) callback will be removed when instance is unloading

### 0.1.0
* (smaragdschlange) callback finally working
* (smaragdschlange) added another State

### 0.0.6
* (smaragdschlange) additional states/actions and improved compatibility (callback still not completely working)

### 0.0.5
* (smaragdschlange) added support for nuki bridge callback (web server still to be added)

### 0.0.4
* (smaragdschlange) added input parameter for lock actions

### 0.0.3
* (smaragdschlange) bug fixes and restructure

### 0.0.2
* (smaragdschlange) added input parameters

### 0.0.1
* (smaragdschlange) initial release

## License
The MIT License (MIT)

Copyright (c) 2018-2024 Smaragdschlange <smaragdschlange@gmx.de>

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