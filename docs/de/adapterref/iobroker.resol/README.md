---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.resol/README.md
title: ioBroker.resol
hash: 5KDhA+LkQammqaj6e563W7RHzA1/Ce2QS3Ad3XVu6G8=
---
# IoBroker.resol
![Logo](../../../en/adapterref/iobroker.resol/admin/resol.svg)

![Anzahl der Installationen (neueste)](http://iobroker.live/badges/resol-installed.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.resol.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/resol-stable.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/Grizzelbee/ioBroker.resol/badge.svg)
![NPM](https://nodei.co/npm/iobroker.resol.svg?downloads=true)
![Lizenz](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![Downloads](https://img.shields.io/npm/dm/iobroker.resol.svg)

[![CodeQL](https://github.com/Grizzelbee/ioBroker.resol/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/Grizzelbee/ioBroker.resol/actions/workflows/codeql-analysis.yml) [![Test und Freigabe](https://github.com/Grizzelbee/ioBroker.resol/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/Grizzelbee/ioBroker.resol/actions/workflows/test-and-release.yml)

## Credits
Dieser Adapter ist vom myVbus-Adapter abgeleitet und basiert auf der Arbeit von DutchmanNL und pdbjjens. Beiden herzlichen Dank für ihre Arbeit.
Da pdbjjens nur Werte von vbus lesen wollte und für einige Leute das Bedürfnis besteht, mehr Kontrolle über ihre Geräte zu bekommen, wurde dieser Adapter aufgelegt.
Hier erhalten Sie die Möglichkeit, Ihren VBus-Controller zu steuern.

## IoBroker-Adapter für Resol VBus
Dieser Adapter verbindet verschiedene VBus-basierte Geräte mit ioBroker und unterstützt verschiedene Verbindungstypen.

Es verwendet resol-vbus, eine von Daniel Wippermann bereitgestellte JavaScript-Bibliothek.
Bitte besuchen Sie <https://github.com/danielwippermann/resol-vbus> und <https://www.npmjs.com/package/resol-vbus>, wenn Sie an einem tieferen Tauchgang interessiert sind.

## Merkmale
* Ermöglicht das Auslesen der Messdaten verschiedener RESOL(R) VBus(R)-Geräte - vorzugsweise Solar- und Systemregler der DeltaSol(R)-Serie inkl. eingebautem Wärmemengenzähler (WMZ) - mittels Datenlogger DL3 oder DL2, KM2 Kommunikationsmodule, VBus/LAN-Schnittstellenadapter oder Seriell/LAN-Gateways lokal über TCP/IP.
* Der Gerätezugriff über den seriellen VBus/USB-Schnittstellenadapter oder über VBus.net(R) mit DLx/KMx wird ebenfalls unterstützt.
* Verarbeitet Live-VBus-Datenströme und stellt sie als ioBroker-Zustände zur Verfügung.
* Werte werden mit einer konfigurierbaren Zykluszeit aktualisiert.
* Das Lesen oder Einstellen der VBus-Gerätekonfigurationsparameter wird nicht unterstützt. Hierfür sollten die von Resol bereitgestellten Tools verwendet werden, z. B. über VBus.net oder das Parametriertool RPT.
* Das Lesen von DL3-Kanal 0 (direkt an das DL3-Gerät angeschlossene Sensoren) wird aufgrund von Einschränkungen der DL3-Schnittstelle nicht unterstützt.

## Sentry.io
Dieser Adapter verwendet sentry.io, um Details zu Abstürzen zu sammeln und diese automatisch an den Autor zu melden.
Dafür wird der [ioBroker.sentry-Plugin](https://github.com/ioBroker/plugin-sentry) verwendet. Bitte beachten Sie die [Plugin-Homepage](https://github.com/ioBroker/plugin-sentry) für detaillierte Informationen darüber, was das Plugin tut, welche Informationen gesammelt werden und wie es deaktiviert werden kann, wenn Sie den Autor nicht mit Ihren Informationen zu Abstürzen unterstützen möchten.

## Konfigurationshinweise
* Die Standardeinstellung für die Verbindungsart ist VBus/LAN, muss aber auch für VBus/LAN explizit ausgewählt werden, sonst kommt keine Verbindung zustande.
* Die korrekten Einstellungen für den direkten LAN-Zugriff für VBus/LAN, DL3, DL2, KM2 sind:
  * Verbindungstyp: VBus/LAN oder KM2 oder DL2 oder DL3
  * Verbindungskennung: IP-Adresse (z. B. 192.168.178.188) oder FullyQualifiedHostName (z. B. host1.example.com)
  * VBus-Passwort: YourVBusPassword (Standard: vbus)
  * Verbindungsport: Die Standardeinstellung 7053 sollte nicht geändert werden
  * DL3-Kanal: Nur relevant für DL3 (Werte 1-6, Kanal 0 kann nicht ausgelesen werden)
  * Aktualisierungsintervall: Zeit zwischen Aktualisierungen der Messwerte (Standard 30s)
* Die korrekten Einstellungen für den DL3-, DL2-, KM2-Zugriff über VBus.net sind:
  * Verbindungstyp: vbus.net
  * Verbindungskennung: leer lassen
  * Verbindungsport: Die Standardeinstellung 7053 sollte nicht geändert werden
  * VBus-Passwort: YourVBusPassword (Standard: vbus)
  * DL3-Kanal: Nur für DL3 relevant (Werte: 1-6, Kanal 0 kann nicht ausgelesen werden)
  * Via-Kennung: Ihr Via-Tag (z. B. d1234567890.vbus.io) - ohne http:// davor
  * Aktualisierungsintervall: Zeit zwischen der Aktualisierung der Messwerte (Standard 30s)

### Beispiele:
#### Verbindung über USB/seriell
| Betriebssystem | Verbindungsgerät | Geräteadresse | Hafen | DL3-Kanal | Via-Tag |
|------------------|------------------|---------------------|------|-------------|---------|
| Fenster | USB/seriell | COMx | | Keine        | |
| Linux | | /dev/tty.usbserial/ | | Keine        | |

#### Verbindung über LAN
Das beinhaltet:

  * LAN
  * KM2-Geräte
  * DL2-Geräte
  * DL3-Geräte (Auswahl des Kanals ist wichtig, Kanal 0 wird nicht unterstützt)
  * Seriell-zu-LAN-Gateways

| | Verbindungsgerät | Geräteadresse | Hafen | DL3-Kanal | Via-Tag |
|---------|------------------------------|---------------------------|----------------|-------------------------------------|-------------|
| | Wählen Sie Ihr Gerät aus der Liste | IP-Adresse Ihres Geräts | TCP-Port | Gegebenenfalls zu verwendender DL3-Kanal | leer lassen |
| Beispiel | KM2 | 192.168.17x.xxx | 7053 (Standard) | Keine                                | |
| Beispiel | DL2 | 192.168.17x.xxx | 7053 (Standard) | Keine                                | |
| Beispiel | DL3 | 192.168.17x.xxx | 7053 (Standard) | Kanal x | |

#### Anbindung über vbus.net von Resol
Ihren persönlichen Via-Tag pro Gerät finden Sie auf der vbus.net Homepage unter: Mein VBus.net - Meine Geräte.
Am besten von dort kopieren/einfügen - **ohne http://**

| | Verbindungsgerät | Geräteadresse | Hafen | DL3-Kanal | Via-Tag |
|-------------------|---------------------------|----------------|----------------|-------------|----------------------------------|
| | Wählen Sie vbus.net aus Liste | leer lassen | TCP-Port | Keine        | Ihr Via-Tag von resol vbus.net |
| Beispiel KM2/DL2 | vbus.net | | 7053 (Standard) | Keine        | d01234567890.vbus.net |
| Beispiel KM2/DL2 | vbus.net | | 7053 (Standard) | Keine        | d01234567890.vbus.io |
| Beispiel Dl3 | vbus.net | | 7053 (Standard) | Kanal x | d01234567890.vbus.io |

#### Senden von Befehlen an das Resol-Gerät
Bearbeiten Sie die Datei Ihres Controllers, die Sie im Installationsverzeichnis 'lib\resol-setup' finden.

{"dp": [{"dpName":"Pumpe1","type":"number","min":0,"max":2}, {"dpName":"Pumpe2","type":" number","min":0,"max":2}, {"dpName":"AutoRueckkuehl","type":"number","min":0,"max":1} ],

"fct": [{"name":"Pumpe1","cmd":"Handbetrieb1","val":"val"}, {"name":"Pumpe2","cmd":"Handbetrieb2","val ":"val"}, {"name":"AutoRueckkuehl","cmds":[{"cmd":"ORueckkuehlung","val":"val"},{"cmd":"OHolyCool","val ":"val"}]} ]}

Die Items „dp“ werden nach der Installation des Adapters angelegt. Bei den Items „fct“, „name“ gibt es die Verknüpfung des dpName.
Beispiel: Wenn Sie den Wert im Objekt „Pumpe1“ ändern, sendet der Adapter den Befehl „Handbetrieb1“ mit dem Wert an das resol-Gerät.
Es sind auch mehr als ein Befehl möglich. Z.B. "AutoRückkühl"

#### So fügen Sie einen neuen Befehl hinzu
zB Kühlung für das Gerät resol cs plus

Bitte beachten Sie die Geräte-ID in den Resol-Objekten (8721) Öffnen Sie die Auswahldatei lib/resol-setup/Setup-Resol-Types.js und beachten Sie die Zeile mit der Geräte-ID {"id":8721,"setup":" setup-resol-deltasol-cs-plus","data":"resol-deltasol-cs-plus-110-data"},

Öffnen Sie die Datei resol-deltasol-cs-plus-110-data.js im Verzeichnis resol-vbus/src/configuration-optimizers Suchen Sie in dieser Datei nach 'ORueckkuehlung'

Öffnen Sie die Datei setup-resol-deltasol-cs-plus.js im Verzeichnis lib/resol-setup/ Fügen Sie in "dp" eine Zeile hinzu {"dpName":"Rueckkuehlung","type":"number","min": 0,"max":1} Fügen Sie eine Zeile in "fct" hinzu {"name":"Rueckkuehlung","cmd":"ORueckkuehlung","val":"val"},

Die Datei sollte so aussehen

{"dp": [{"dpName":"Pumpe1","type":"number","min":0,"max":2}, {"dpName":"Pumpe2","type":" number","min":0,"max":2}, {"dpName":"Rückkühlung","type":"number","min":0,"max":1}, {"dpName" :"AutoRueckkuehl","type":"number","min":0,"max":1} ],

"fct": [{"name":"Pumpe1","cmd":"Handbetrieb1","val":"val"}, {"name":"Pumpe2","cmd":"Handbetrieb2","val ":"val"}, {"name":"Rückkuehlung","cmd":"ORueckkuehlung","val":"val"}, {"name":"AutoRueckkuehl","cmds":[{"cmd ":"ORueckkuehlung","val":"val"},{"cmd":"OHolyCool","val":"val"}]} ]}

Speichern Sie die Datei und starten Sie den Adapter neu, Sie finden nun ein neues Objekt Rueckkuehlung.

## Machen
## Rechtliche Hinweise
RESOL, VBus, VBus.net, DeltaSol und andere sind Warenzeichen oder eingetragene Warenzeichen der RESOL - Elektronische Regelungen GmbH <https://www.resol.de/de>

Alle anderen Warenzeichen sind Eigentum ihrer jeweiligen Inhaber.

## Urheberrechte ©
Copyright (c) 2022 grizzelbee <open.source@hingsen.de>

## Changelog

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