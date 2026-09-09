---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.resol/README.md
title: ioBroker.resol
hash: FVmS2utqelzlesdmNGjTQ233FX1fWXLN1Jpg950AhGg=
---
# ioBroker.resol

![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/resol-installed.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.resol.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/resol-stable.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/Grizzelbee/ioBroker.resol/badge.svg)
![CodeQL](https://github.com/Grizzelbee/ioBroker.resol/actions/workflows/codeql-analysis.yml/badge.svg)
![Test und Freigabe](https://github.com/Grizzelbee/ioBroker.resol/actions/workflows/test-and-release.yml/badge.svg)
![NPM](https://nodei.co/npm/iobroker.resol.svg?downloads=true)
![Lizenz](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![Downloads](https://img.shields.io/npm/dm/iobroker.resol.svg)

![Logo](../../../en/adapterref/iobroker.resol/admin/resol.svg)

## Credits

Dieser Adapter basiert auf dem myVbus-Adapter und der Arbeit von DutchmanNL und pdbjjens. Vielen Dank an beide für ihren Beitrag. Da pdbjjens lediglich Werte vom VBus auslesen wollte und manche Anwender mehr Kontrolle über ihre Geräte benötigen, wurde dieser Adapter entwickelt. Er ermöglicht die Steuerung Ihres VBus-Controllers.

## ioBroker-Adapter für Resol VBus

Dieser Adapter verbindet verschiedene VBus-basierte Geräte mit ioBroker und unterstützt verschiedene Verbindungstypen.

> Wenn Ihnen dieser Adapter gefällt und Sie mich unterstützen möchten<br/>[![Spenden Sie mit PayPal](https://github.com/grizzelbee/ioBroker.resol/blob/master/admin/paypal-donate-button.png)](https://www.paypal.com/donate/?hosted_button_id=SPUDTXGNG2MYG)

Es verwendet resol-vbus, eine JavaScript-Bibliothek von Daniel Wippermann. Weitere Informationen finden Sie unter <https://github.com/danielwippermann/resol-vbus> .

## Merkmale

- Ermöglicht das Auslesen der Messdaten von verschiedenen RESOL(R) VBus(R) Geräten - vorzugsweise Solar- und Systemreglern der DeltaSol(R) Serie einschließlich eingebauter Wärmemengenzähler (HQM) - unter Verwendung von DL3- oder DL2-Datenloggern, KM2-Kommunikationsmodulen, VBus/LAN-Schnittstellenadaptern oder seriellen/LAN-Gateways lokal über TCP/IP.
- Der Gerätezugriff über den seriellen Schnittstellenadapter VBus/USB oder über VBus.net(R) mit DLx/KMx wird ebenfalls unterstützt.
- Verarbeitet Live-VBus-Datenströme und stellt sie als ioBroker-Zustände zur Verfügung.
- Die Werte werden in einem konfigurierbaren Zyklus aktualisiert.
- Das Lesen oder Festlegen der VBus-Gerätekonfigurationsparameter wird nicht unterstützt. Verwenden Sie hierfür die von Resol bereitgestellten Tools, z. B. über VBus.net oder das Parametrierungstool RPT.
- Das Auslesen des DL3-Kanals 0 (Sensoren, die direkt mit dem DL3-Gerät verbunden sind) wird aufgrund von Einschränkungen der DL3-Schnittstelle nicht unterstützt.

## Konfigurationshinweise

- Die Standardeinstellung für den Verbindungstyp ist VBus/LAN, aber auch für VBus/LAN muss er explizit ausgewählt werden, sonst wird keine Verbindung hergestellt.
- Die korrekten Einstellungen für den direkten LAN-Zugriff für VBus/LAN, DL3, DL2, KM2 sind:
  - Verbindungstyp: VBus/LAN oder KM2 oder DL2 oder DL3
  - Verbindungskennung: IP-Adresse (z. B. 192.168.178.188) oder vollqualifizierter Hostname (z. B. host1.example.com)
  - VBus-Passwort: IhrVBusPasswort (Standard: vbus)
  - Anschlussport: Die Standardeinstellung 7053 sollte nicht geändert werden.
  - DL3-Kanal: Nur relevant für DL3 (Werte 1-6, Kanal 0 kann nicht ausgelesen werden)
  - Aktualisierungsintervall: Zeit zwischen den Aktualisierungen der Messwerte (Standardwert: 30 Sekunden)
- Die korrekten Einstellungen für den DL3-, DL2- und KM2-Zugriff über VBus.net lauten:
  - Verbindungstyp: vbus.net
  - Verbindungskennung: leer lassen
  - Anschlussport: Die Standardeinstellung 7053 sollte nicht geändert werden.
  - VBus-Passwort: IhrVBusPasswort (Standard: vbus)
  - DL3-Kanal: Nur relevant für DL3 (Werte: 1-6, Kanal 0 kann nicht ausgelesen werden)
  - Via-Kennung: Ihr Via-Tag (z. B. d1234567890.vbus.io) – ohne http\:// davor
  - Aktualisierungsintervall: Zeit zwischen den Aktualisierungen der Messwerte (Standard: 30 Sekunden)

### Beispiele:

#### Anschluss über USB/Seriell

| Betriebssystem | Verbindungsgerät | Geräteadresse       | Hafen | DL3-Kanal | Via-Tag |
| -------------- | ---------------- | ------------------- | ----- | --------- | ------- |
| Windows        | USB/Seriell      | COMx                |       | Keiner    |         |
| Linux          |                  | /dev/tty.usbserial/ |       | Keiner    |         |

#### Verbindung über LAN

Dies umfasst:

- LAN
- KM2-Geräte
- DL2-Geräte
- DL3-Geräte (Die Kanalauswahl ist wichtig, Kanal 0 wird nicht unterstützt)
- Serielle zu LAN-Gateways

|          | Verbindungsgerät                        | Geräteadresse           | Hafen           | DL3-Kanal                             | Via-Tag     |
| -------- | --------------------------------------- | ----------------------- | --------------- | ------------------------------------- | ----------- |
|          | Wählen Sie Ihr Gerät aus der Liste aus. | IP-Adresse Ihres Geräts | TCP-Port        | DL3-Kanal verwenden, falls zutreffend | leer lassen |
| Beispiel | KM2                                     | 192.168.17x.xxx         | 7053 (Standard) | Keiner                                |             |
| Beispiel | DL2                                     | 192.168.17x.xxx         | 7053 (Standard) | Keiner                                |             |
| Beispiel | DL3                                     | 192.168.17x.xxx         | 7053 (Standard) | Kanal x                               |             |

#### Verbindung über vbus.net durch Resol

Ihr persönliches Via-Tag pro Gerät finden Sie auf der vbus.net-Startseite unter: Mein VBus.net – Meine Geräte. Am besten kopieren Sie es von dort und fügen es ein – **ohne http\://.**

|                    | Verbindungsgerät                 | Geräteadresse | Hafen           | DL3-Kanal | Via-Tag                        |
| ------------------ | -------------------------------- | ------------- | --------------- | --------- | ------------------------------ |
|                    | vbus.net aus der Liste auswählen | leer lassen   | TCP-Port        | Keiner    | Ihr Via-Tag von resol vbus.net |
| Beispiel KM2 / DL2 | vbus.net                         |               | 7053 (Standard) | Keiner    | d01234567890.vbus.net          |
| Beispiel KM2 / DL2 | vbus.net                         |               | 7053 (Standard) | Keiner    | d01234567890.vbus.io           |
| Beispiel Dl3       | vbus.net                         |               | 7053 (Standard) | Kanal x   | d01234567890.vbus.io           |

#### Befehle an das Resol-Gerät senden

Bearbeiten Sie die Datei Ihres Controllers, die Sie im Installationsverzeichnis „lib\resol-setup“ finden.

{"dp": \[{"dpName":"Pumpe1","type":"number","min":0,"max":2}, {"dpName":"Pumpe2","type":"number","min":0,"max":2}, {"dpName":"AutoRueckkuehl","type":"number","min":0,"max":1} ],

"fct": \[{"name":"Pumpe1","cmd":"Handbetrieb1","val":"val"}, {"name":"Pumpe2","cmd":"Handbetrieb2","val":"val"}, {"name":"AutoRueckkuehl","cmds":\[{"cmd":"ORueckkuehlung","val":"val"},{"cmd":"OHolyCool","val":"val"}]} ]}

Die Elemente „dp“ werden nach der Installation des Adapters erstellt. Die Elemente „fct“ und „name“ enthalten die Verknüpfung zu dpName. Beispiel: Wenn Sie den Wert im Objekt „Pumpe1“ ändern, sendet der Adapter den Befehl „Handbetrieb1“ mit dem geänderten Wert an das resol-Gerät. Es sind auch mehrere Befehle möglich, z. B. „AutoRückfahrkuehl“.

#### So fügen Sie einen neuen Befehl hinzu

z.B. Kühlung für Geräteauflösung CS Plus

Bitte beachten Sie die Geräte-ID in den Resol-Objekten (8721). Öffnen Sie die Selektordatei lib/resol-setup/Setup-Resol-Types.js und beachten Sie die Zeile entsprechend der Geräte-ID: {"id":8721,"setup":"setup-resol-deltasol-cs-plus","data":"resol-deltasol-cs-plus-110-data"},

Öffnen Sie die Datei resol-deltasol-cs-plus-110-data.js im Verzeichnis resol-vbus/src/configuration-optimizers. Suchen Sie in dieser Datei nach 'ORueckkuehlung'.

Öffnen Sie die Datei setup-resol-deltasol-cs-plus.js im Verzeichnis lib/resol-setup/. Fügen Sie in "dp" die Zeile {"dpName":"Rueckkuehlung","type":"number","min":0,"max":1} hinzu. Fügen Sie in "fct" die Zeile {"name":"Rueckkuehlung","cmd":"ORueckkuehlung","val":"val"} hinzu.

Die Datei sollte folgendermaßen aussehen:

{"dp": \[{"dpName":"Pumpe1","type":"number","min":0,"max":2}, {"dpName":"Pumpe2","type":"number","min":0,"max":2}, {"dpName":"Rückfahrkuehl","type":"number","min":0,"max":1}, {"dpName":"AutoRückfahrkuehl","type":"number","min":0,"max":1} ],

„fct“: \[{“name“: „Pumpe1“, „cmd“: „Handbetrieb1“, „val“: „val“}, {“name“: „Pumpe2“, „cmd“: „Handbetrieb2“, „val“: „val“}, {"name":"AutoRueckkuehl", "cmds":\[{"cmd": "ORueckkuehl", "val": "val"}, {"cmd": "OHolyCool", "val": "val"}]} ]}

Speichern Sie die Datei und starten Sie den Adapter neu. Sie finden nun ein neues Objekt namens Rückkuehlung.

## Todo

## Rechtliche Hinweise

RESOL, VBus, VBus.net, DeltaSol und andere sind Marken oder eingetragene Marken der RESOL - Elektronische Regelungen GmbH [https://www.resol.de/de](https://www.resol.de/en)

Alle anderen Marken sind Eigentum ihrer jeweiligen Inhaber.

## sentry.io

Dieser Adapter nutzt sentry.io, um Details zu Abstürzen zu erfassen und diese automatisch an den Autor zu melden. Hierfür wird das [Plugin ioBroker.sentry](https://github.com/ioBroker/plugin-sentry) verwendet. Auf der [Homepage des Plugins](https://github.com/ioBroker/plugin-sentry) finden Sie detaillierte Informationen zu dessen Funktionsweise, den erfassten Daten und wie Sie die Erfassung deaktivieren können, falls Sie den Autor nicht mit Ihren Absturzinformationen unterstützen möchten.

## Copyright

Copyright © 2024 grizzelbee <open.source@hingsen.de>

## Changelog
### 1.5.1 (2024-10-18)
* (grizzelbee) Fix: Fixed minor issues in Admin-UI

### 1.5.0 (2024-10-01)
* (grizzelbee) Upd: Fixed some issues mentioned by adapter-checker

### 1.4.2 (2024-10-01)
* (grizzelbee) Upd: Internal update

### 1.4.1 (2024-10-01)
* (grizzelbee) Upd: Dependencies got updated
* (grizzelbee) Fix: Plugin-Sentry removed
* (grizzelbee) Upd: made release script working

### 1.4.0 (2024-07-xx)
* (grizzelbee) Upd: Dependencies got updated
* (grizzelbee) Upd: Translations got updated
* (grizzelbee) Fix: Finished work on new jsonConfig admin-UI
* (grizzelbee) New: Added new option for MX-Controllers to admin-UI
* (grizzelbee) New: Admin-UI now hides options which are invalid for the selected device.
* (gargano)    New: Integrated Actions for MX-Controller (V1 and V2)

### 1.3.0 (2022-11-01)
* (grizzelbee) Fix: [#106](https://github.com/Grizzelbee/ioBroker.resol/issues/106) Attempt to fix errors in log regarding DeltaSol-BX
* (grizzelbee) Fix: [#108](https://github.com/Grizzelbee/ioBroker.resol/issues/106) Attempt to fix errors in log regarding DeltaSol-SLT and others
* (grizzelbee) New: Moved Admin interface to jsonConfig 
* (grizzelbee) Upd: Dependencies got updated
* (grizzelbee) Upd: Translations got updated

### v1.2.0 (2022-05-16)
* (grizzelbee) New: [#106](https://github.com/Grizzelbee/ioBroker.resol/issues/106) Added support for DeltaSol-BX

### v1.1.6 (2022-05-04)
* (grizzelbee) Fix: [#103](https://github.com/Grizzelbee/ioBroker.resol/issues/103) Fixed support for Serial-to-LAN-Gateway connections (Disabled credentials handshake - which is not necessary over serial ports.)

### v1.1.5 (2022-04-29)
* (grizzelbee) New: [#96](https://github.com/Grizzelbee/ioBroker.resol/issues/96) Fixed Cosmo-Multi-2 support (Faking a DeltaSol-E now)

### v1.1.0 (2022-04-28)
* (grizzelbee) New: [#96](https://github.com/Grizzelbee/ioBroker.resol/issues/96) Added support for DeltaSol-E and improved support for Cosmo-Multi-2 controllers

### v1.0.0 (2022-04-25)
* (grizzelbee) New: [#94](https://github.com/Grizzelbee/ioBroker.resol/issues/94) Added support for Cosmo controllers (No Sensor connected = 888°C)
* (grizzelbee) Upd: Pushed version from 0.4.4 to v1.0.0 to be compliant to semver
* (grizzelbee) Upd: Dependencies got updated

### v0.4.4 (2022-03-17)
* (grizzelbee) New: Added donate button to config page and readme
* (grizzelbee) Upd: Dependencies got updated

### v0.4.3 (2022-02-08)
* (grizzelbee) Fix: fixed wrong state role "switch" and changed to "level"

### v0.4.2 (2022-01-05)
* (grizzelbee) Fix: Removed password encryption stuff from admin to avoid double encryption

### v0.4.1 (2022-01-05)
* (grizzelbee) Fix: switched action roles from "indicator" to "switch" to be compliant with ioBroker rules
* (grizzelbee) Fix: Removed password encryption stuff and added dependency Admin >=4.0.9
* (grizzelbee) Fix: Fixed a few code warnings
* (grizzelbee) Fix: Fixed: info.connection has been written w/o ACK 
* (grizzelbee) Upd: updated dependencies

### v0.4.0 (2021-11-08)
* (grizzelbee) Upd: updated dependencies
* (grizzelbee) New: Trying more than one time to connect when network isn't setup properly. E.g. on router startup.

### v0.3.3 (2021-11-04)
* (grizzelbee) Upd: updated dependencies
* (grizzelbee) Upd: Switched from adapter-type climate-control to energy

### v0.3.2 (2021-09-16)
* (grizzelbee) Upd: updated dependencies
* (grizzelbee) Fix: [#27](https://github.com/Grizzelbee/ioBroker.resol/issues/27) Fixed: State value to set for "resol.0.xxx.010221110010002220" has to be type "number" but received type "string" - it may be needed to delete datapoints manually
* (grizzelbee) Upd: set correct tier in io-package
* (grizzelbee) New: Writing value null when received value is <= -999 and >= 999. This is to avoid writing crap when no sensors are connected. 
* (grizzelbee) New: Making use of adapter internal decrypt function (req. at least js-controller >= 3.0)

### v0.3.1 (2021-05-07)
* (gargano)    Fix: wrong object types fixed according JS-Controller 3.x
* (gargano)    Fix: prevent setState if value = undefined
* (gargano)    Upd: Updated resol lib by Daniel Wippermann to v0.22.0
* (grizzelbee) New: Added sentry
* (grizzelbee) Fix: Made eslint happy
* (grizzelbee) Upd: updated dependencies

### v0.3.0 (2021-01-xx)
* (grizzelbee) Upd: Updated dependencies
* (grizzelbee) New: Log connection-losts as info

### v0.2.1 (2021-01-23)
* (gargano)    New: write function to resol device added

### v0.2.0 (2021-01-18)
* (grizzelbee) New: New Icon
* (grizzelbee) Upd: Update resol-Bus lib to V0.21.0 
* (grizzelbee) Upd: Security-Update to lodash lib 
* (grizzelbee) Upd: Reorganized configuration to get it more intuitive  
* (grizzelbee) Upd: Config-page translated via gulp
* (grizzelbee) New: Changed the way to configure access via vbus.net to be more intuitive
* (grizzelbee) New: Extended documentation
* (grizzelbee) Fix: Adapter doesn't crash on connection losts anymore

### v0.1.0 (2020-03-29)
* (grizzelbee) Fix: config page shows current settings now (not default anymore) **May raise the need to reenter the password!**
* (grizzelbee) Fix: "Connected" state is updated correctly now if connection is disrupted.
* (grizzelbee) New: Added Badge for latest(npm) version to readme
* (grizzelbee) Fix: removed default password from config to ensure it's encrypted on first config
* (grizzelbee) Fix: removed Force-ReInit
* (grizzelbee) Fix: sensor maintenance indicators are working booleans now
* (grizzelbee) New: added new activity indicator states for each relais.
* (grizzelbee) New: testing configuration to avoid start with invalid config

### v0.0.6
* (pdbjjens) alpha 6 release updated dependencies

### v0.0.5
* (pdbjjens) alpha 5 release improved type and role mapping of adapter values

### v0.0.4
* (pdbjjens) alpha 4 release updated dependency on resol-vbus library to 0.21.0

### v0.0.3
* (pdbjjens) alpha 3 release tested with DL3 over local LAN and VBus.net and DeltaSol SLT (0x1001) incl. HQM (0x1011)

### v0.0.2
* (pdbjjens) alpha 2 release tested with VBus/LAN, KM2, VBus.net and DeltaSol E (0x7721 & 0x7722), DeltaSol M (0x7311 & 0x716), DeltaSol CS Plus (0x2211), Oventrop RQXXL (0x7541)

### v0.0.1
* (pdbjjens) initial release tested only with VBus/USB (Serial) and DeltaSol(R) BS2009 (0x427B)

## License
MIT License

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