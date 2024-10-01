---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.resol/README.md
title: ioBroker.resol
hash: 9HCa9stLdL1IsFVVCVRtsPGj20vxrIdve7AmpWJjKZQ=
---
# IoBroker.resol
![Logo](../../../en/adapterref/iobroker.resol/admin/resol.svg)

![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/resol-installed.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.resol.svg)
![Anzahl Installationen (stabil)](http://iobroker.live/badges/resol-stable.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/Grizzelbee/ioBroker.resol/badge.svg)
![NPM](https://nodei.co/npm/iobroker.resol.svg?downloads=true)
![Lizenz](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![Downloads](https://img.shields.io/npm/dm/iobroker.resol.svg)

[![CodeQL](https://github.com/Grizzelbee/ioBroker.resol/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/Grizzelbee/ioBroker.resol/actions/workflows/codeql-analysis.yml) [![Testen und Freigeben](https://github.com/Grizzelbee/ioBroker.resol/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/Grizzelbee/ioBroker.resol/actions/workflows/test-and-release.yml)

## Credits
Dieser Adapter ist vom myVbus-Adapter abgeleitet und basiert auf der Arbeit von DutchmanNL und pdbjjens. Vielen Dank an beide für ihre Arbeit.
Da pdbjjens nur Werte vom Vbus lesen wollte und manche Leute mehr Kontrolle über ihre Geräte haben möchten, wurde dieser Adapter entwickelt.
Hiermit erhalten Sie die Möglichkeit, Ihren Vbus-Controller zu steuern.

## IoBroker-Adapter für Resol VBus
Dieser Adapter verbindet verschiedene VBus-basierte Geräte mit ioBroker und unterstützt verschiedene Verbindungstypen.

&gt; Wenn Ihnen dieser Adapter gefällt und Sie erwägen, mich zu unterstützen<br/> &gt; [![Spenden mit PayPal](admin/paypal-donate-button.png)](https://www.paypal.com/donate/?hosted_button_id=SPUDTXGNG2MYG)

Es verwendet resol-vbus, eine JavaScript-Bibliothek von Daniel Wippermann.
Besuchen Sie <https://github.com/danielwippermann/resol-vbus>, wenn Sie tiefer in die Materie eintauchen möchten.

## Merkmale
* Ermöglicht das Auslesen der Messdaten verschiedener RESOL(R) VBus(R)-Geräte - vorzugsweise Solar- und Systemregler der DeltaSol(R)-Reihe inkl. eingebautem Wärmemengenzähler (HQM) - mittels DL3- oder DL2-Datenloggern, KM2-Kommunikationsmodulen, VBus/LAN-Schnittstellenadaptern oder Seriell/LAN-Gateways lokal über TCP/IP.
* Der Gerätezugriff über den seriellen Schnittstellenadapter VBus/USB oder über VBus.net(R) mit DLx/KMx wird ebenfalls unterstützt.
* Verarbeitet Live-VBus-Datenströme und stellt sie als ioBroker-Status zur Verfügung.
* Werte werden mit einer konfigurierbaren Zykluszeit aktualisiert.
* Das Lesen oder Setzen der VBus-Gerätekonfigurationsparameter wird nicht unterstützt. Hierzu sollten die von Resol bereitgestellten Tools verwendet werden, z.B. über VBus.net oder das Parametriertool RPT.
* Das Lesen von DL3-Kanal 0 (Sensoren, die direkt an das DL3-Gerät angeschlossen sind) wird aufgrund von Einschränkungen der DL3-Schnittstelle nicht unterstützt.

## Konfigurationshinweise
* Die Verbindungsart ist standardmäßig auf VBus/LAN eingestellt, muss aber auch bei VBus/LAN explizit ausgewählt werden, da sonst keine Verbindung aufgebaut wird.
* Die richtigen Einstellungen für den direkten LAN-Zugriff für VBus/LAN, DL3, DL2, KM2 sind:
* Anschlussart: VBus/LAN oder KM2 oder DL2 oder DL3
* Verbindungskennung: IP-Adresse (z. B. 192.168.178.188) oder FullyQualifiedHostName (z. B. host1.example.com)
* VBus-Passwort: IhrVBus-Passwort (Standard: vbus)
* Anschlussport: Standardeinstellung 7053 sollte nicht geändert werden
* DL3-Kanal: Nur für DL3 relevant (Werte 1-6, Kanal 0 kann nicht ausgelesen werden)
* Aktualisierungsintervall: Zeit zwischen den Aktualisierungen der Messwerte (Standard 30s)
* Die richtigen Einstellungen für den DL3, DL2, KM2 Zugriff über VBus.net sind:
* Verbindungstyp: vbus.net
* Verbindungskennung: leer lassen
* Anschlussport: Standardeinstellung 7053 sollte nicht geändert werden
* VBus-Passwort: IhrVBus-Passwort (Standard: vbus)
* DL3-Kanal: Nur für DL3 relevant (Werte: 1-6, Kanal 0 kann nicht ausgelesen werden)
* Via-Kennung: Ihr Via-Tag (z.B. d1234567890.vbus.io) - ohne http:// davor
* Updateintervall: Zeit zwischen der Aktualisierung der Messwerte (Standard 30s)

### Beispiele:
#### Verbindung über USB/Seriell
| Betriebssystem | Anschlussgerät | Geräteadresse | Port | DL3-Kanal | Via-Tag |
|------------------|------------------|---------------------|------|-------------|---------|
| Windows | USB/Seriell | COMx | | Keine | |
| Linux | | /dev/tty.usbserial/ | | Keine | |

#### Verbindung über LAN
Hierzu gehören:

* LAN
* KM2-Geräte
* DL2-Geräte
* DL3-Geräte (Kanalauswahl ist wichtig, Kanal 0 wird nicht unterstützt)
* Seriell zu LAN-Gateways

| | Anschlussgerät | Geräteadresse | Port | DL3-Kanal | Via-Tag |
|---------|------------------------------|---------------------------|----------------|-------------------------------------|-------------|
| | Wählen Sie Ihr Gerät aus der Liste | IP-Adresse Ihres Geräts | TCP-Port | Zu verwendender DL3-Kanal, falls zutreffend | leer lassen |
| Beispiel | KM2 | 192.168.17x.xxx | 7053 (Standard) | Keine | |
| Beispiel | DL2 | 192.168.17x.xxx | 7053 (Standard) | Keine | |
| Beispiel | DL3 | 192.168.17x.xxx | 7053 (Standard) | Kanal x | |

#### Verbindung über vbus.net von Resol
Deinen persönlichen Via-Tag pro Gerät findest du auf der vbus.net Homepage unter: Mein VBus.net - Meine Geräte.
Am besten kopierst/fügst du ihn von dort ein - **ohne http://**

| | Anschlussgerät | Geräteadresse | Port | DL3-Kanal | Via-Tag |
|-------------------|---------------------------|----------------|----------------|-------------|----------------------------------|
| | vbus.net aus Liste auswählen | leer lassen | TCP-Port | Keiner | Ihr Via-Tag von resol vbus.net |
| Beispiel KM2 / DL2 | vbus.net | | 7053 (Standard) | Keine | d01234567890.vbus.net |
| Beispiel KM2 / DL2 | vbus.net | | 7053 (Standard) | Keine | d01234567890.vbus.io |
| Beispiel Dl3 | vbus.net | | 7053 (Standard) | Kanal x | d01234567890.vbus.io |

#### Senden von Befehlen an das Resol-Gerät
Bearbeiten Sie die Datei Ihres Controllers, die Sie im installierten Verzeichnis 'lib\resol-setup' finden.

{"dp": [{"dpName":"Pumpe1","typ":"Anzahl","min":0,"max":2}, {"dpName":"Pumpe2","typ":"Anzahl","min":0,"max":2}, {"dpName":"AutoRueckkuehl","typ":"Anzahl","min":0,"max":1} ],

"fct": [{"name":"Pumpe1","cmd":"Handbetrieb1","val":"val"}, {"name":"Pumpe2","cmd":"Handbetrieb2","val":"val"}, {"name":"AutoRückkuehl","cmds":[{"cmd":"ORueckkuehlung","val":"val"},{"cmd":"OHolyCool","val":"val"}]} ]}

Die Einträge "dp" werden nach der Installation des Adapters angelegt. Die Einträge "fct", "name" sind die Verknüpfung des dpName.
Beispiel: Ändert man den Wert im Objekt "Pumpe1", dann sendet der Adapter den Befehl "Handbetrieb1" mit dem Wert an das Resol-Gerät.
Auch mehrere Befehle sind möglich. Z.B. "AutoRückkuehl"

#### So fügen Sie einen neuen Befehl hinzu
z.B. Kühlung für Geräte resol cs plus

Bitte beachten Sie die Geräte-ID in den Resol-Objekten (8721). Öffnen Sie die Auswahldatei lib/resol-setup/Setup-Resol-Types.js und beachten Sie die Zeile entsprechend der Gerätekennung {"id":8721,"setup":"setup-resol-deltasol-cs-plus","data":"resol-deltasol-cs-plus-110-data"},

Öffnen Sie die Datei resol-deltasol-cs-plus-110-data.js im Verzeichnis resol-vbus/src/configuration-optimizers Suchen Sie in dieser Datei nach 'ORueckkuehlung'

Öffnen Sie die Datei setup-resol-deltasol-cs-plus.js im Verzeichnis lib/resol-setup/ Fügen Sie eine Zeile in "dp" {"dpName":"Rueckkuehlung","type":"number","min":0,"max":1} hinzu Fügen Sie eine Zeile in "fct" {"name":"Rueckkuehlung","cmd":"ORueckkuehlung","val":"val"} hinzu,

Die Datei sollte so aussehen

{"dp": [{"dpName":"Pumpe1","type":"Nummer","min":0,"max":2}, {"dpName":"Pumpe2","type":"Nummer","min":0,"max":2}, {"dpName":"Rückkühlung","type":"Nummer","min":0,"max":1}, {"dpName":"AutoRückkühlung","type":"Nummer","min":0,"max":1} ],

"fct": [{"name":"Pumpe1","cmd":"Handbetrieb1","val":"val"}, {"name":"Pumpe2","cmd":"Handbetrieb2","val":"val"}, {"name":"Rückkühlung","cmd":"ORueckkuehlung","val":"val"}, {"name":"AutoRückkühlung","cmds":[{"cmd":"ORueckkuehlung","val":"val"},{"cmd":"OHolyCool","val":"val"}]} ]}

Speichern Sie die Datei und starten Sie den Adapter neu. Sie finden nun ein neues Objekt „Rückkühlung“.

## Aufgaben
## Rechtliche Hinweise
RESOL, VBus, VBus.net, DeltaSol und andere sind Marken oder eingetragene Marken der RESOL - Elektronische Regelungen GmbH <https://www.resol.de/de>

Alle anderen Marken sind Eigentum ihrer jeweiligen Inhaber.

## Sentry.io
Dieser Adapter verwendet sentry.io, um Details zu Abstürzen zu sammeln und diese automatisch dem Autor zu melden.

Hierfür wird [ioBroker.sentry-Plugin](https://github.com/ioBroker/plugin-sentry) verwendet. Detaillierte Informationen dazu, was das Plugin macht, welche Informationen gesammelt werden und wie man es deaktivieren kann, wenn man den Autor nicht mit Informationen zu Abstürzen unterstützen möchte, finden Sie unter [Plugin-Startseite](https://github.com/ioBroker/plugin-sentry).

## Urheberrecht
Copyright (c) 2024 grizzelbee <open.source@hingsen.de>

## Changelog
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