![Logo](admin/weishaupt-wem.png)

# ioBroker.weishaupt-wem

[![NPM version](http://img.shields.io/npm/v/iobroker.weishaupt-wem.svg)](https://www.npmjs.com/package/iobroker.weishaupt-wem)
[![Downloads](https://img.shields.io/npm/dm/iobroker.weishaupt-wem.svg)](https://www.npmjs.com/package/iobroker.weishaupt-wem)
[![Dependency Status](https://img.shields.io/david/ta2k/iobroker.weishaupt-wem.svg)](https://david-dm.org/ta2k/iobroker.weishaupt-wem)
[![Known Vulnerabilities](https://snyk.io/test/github/ta2k/ioBroker.weishaupt-wem/badge.svg)](https://snyk.io/test/github/ta2k/ioBroker.weishaupt-wem)

[![NPM](https://nodei.co/npm/iobroker.weishaupt-wem.png?downloads=true)](https://nodei.co/npm/iobroker.weishaupt-wem/)

**Tests:**: [![Travis-CI](http://img.shields.io/travis/ta2k/ioBroker.weishaupt-wem/master.svg)](https://travis-ci.org/ta2k/ioBroker.weishaupt-wem)

## weishaupt-wem adapter for ioBroker

Adapter for weishaupt WEM Portal

## WEM Portal Domain

Das WEM Portal wird je nach Region unter unterschiedlichen Domains ausgeliefert (`www.wemportal.com` oder `www.wemportal.de`). Wenn der manuelle Login im Browser auf `www.wemportal.de` landet oder der Adapter beim ersten Login-Schritt ein `403 Forbidden` (Azure Application Gateway) bekommt, in den Adapter-Einstellungen die passende Domain unter "WEM Portal Domain" auswählen. Standard ist `www.wemportal.com`.

## Custom Befehl

Für ein Custom Befehl benötigst du die URL und den gewünschten Wert.
Für die URL einfach die Option im WEM Portal mit Chrome aufrufen und dann rechte Maustate Untersuchen dann unter Elements/Elemente mit STRG+F nach iframe suchen mit dem name="RDWWriteParameter" die URL nach src mit rechts Klick Link kopieren raus kopieren.
Für den Werte nach <option suchen und den gewünschten Wert unter value kopieren und als state Wert eintragen.
z.B.: <https://www.wemportal.com/Web/UControls...,> 208557

## App Support
Der Adapter liest auch die Daten aus der App aus.

**weishaupt-wem.0.20999** "Name via App"

**weishaupt-wem.0.20999.1-3.parameters** Hier findest du den aktuellen Status und kann via **NumericValue** oder **StringValue** geändert werden. Du findest dort auch die Min Max Werte und unter **EnumValues** findet man die Beschreibung für NumericValue


## Changelog

### 0.0.21

* (ta2k) Fix Statistics/Read 400 "Mindestens ein Parameter ist ungültig" (JobID aus Statistics/Refresh wird jetzt mitgesendet, verifiziert gegen APK v3.0.1)
* (ta2k) Optionale App-Endpunkte (Statistics) loggen Fehler nur noch als debug statt error

### 0.0.20

* (ta2k) Abgeschaltete Leistungs-/Prozentwerte (Aus/off/--) werden als numerische 0 gespeichert (kWh-Zähler bleiben unberührt)

### 0.0.19

* (ta2k) Fix Absturz "Canvas.Image is not a constructor" mit jsdom 30 / Node 24 (Canvas-Stub meldet sich jetzt als nicht installiert)

### 0.0.18

* (ta2k) Backoff bei 403 vom Azure Gateway (Rate-Limit / Bot-Schutz) statt Relogin-Sturm
* (ta2k) Anfragen entzerrt (Throttling zwischen App-Requests) analog hass-WEM-Portal
* (ta2k) Zentrale App-API-Anfrage mit einmaligem Relogin-Retry und Session-Ablauf-Erkennung
* (ta2k) Neue App-Daten: Geräte-Status/Fehler (DeviceStatus), Energiestatistik (Statistics, stündlich), Heizzeiten (CircuitTimes)
* (ta2k) Heizzeiten schreibbar über `circuitTimes.PARAMETERID.setSchedule` (CircuitTimes/Write)
* (ta2k) App-Header und Login gegen die App-APK v3.0.1 verifiziert (X-Api-Version 2.0.0.0, AppVersion 3.0.1, Android)
* (ta2k) Auswählbare Portal-Domain (.com / .de)
* (ta2k) Login/Status-Fehler beenden nicht mehr die Instanz (kein Crash bei fehlenden Parametern oder Status)

### 0.0.16

* (ta2k) Improve error and login handling
  
### 0.0.15

* (ta2k) add app support

### 0.0.14

* (ta2k) fix command sends
### 0.0.13

* (ta2k) update dependencies

### 0.0.9

* (ta2k) fix for Status label

### 0.0.5

* (ta2k) fix remote for WWP

### 0.0.4

* (ta2k) remove spaces in ids

### 0.0.3

* (ta2k) Fix remote control

### 0.0.2

* (ta2k) Möglichkeit Parameter zu ändern
* Nummerische Werte als Zahlen in ioBroker geschrieben

### 0.0.1

* (ta2k) initial release

## License

MIT License

Copyright (c) 2019 ta2k <tombox2020@gmail.com>

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
