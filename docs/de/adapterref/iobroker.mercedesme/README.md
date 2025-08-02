---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mercedesme/README.md
title: ioBroker.mercedesme
hash: n8+F9aionWvJttL+oYB/zYoVebpcNqcuFjIWXPh7mLQ=
---
![Logo](../../../en/adapterref/iobroker.mercedesme/admin/mercedesme.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.mercedesme.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.mercedesme.svg)
![Anzahl der Installationen](https://iobroker.live/badges/mercedesme-installed.svg)
![NPM](https://nodei.co/npm/iobroker.mercedesme.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/TA2k/ioBroker.mercedesme/master.svg)

# IoBroker.mercedesme
## Mercedesme-Adapter für ioBroker
Mercedes me Adapter für ioBroker

Unter commands das commando auf klappen und den button neben start drücken, wenn das command verfügbar ist.

Remote sind vorgefertigte Remote-Befehle

## Changelog

### 0.1.6

- fix login

### 0.1.1

- fix login

### 0.0.56

- fix vehicle list while login
  
### 0.0.55

- fix refresh login
### 0.0.55

- fix refresh login
  
### 0.0.54

- fix login
  
### 0.0.52

- fix js-controller 3.3 warnings
  
### 0.0.51

- improve handling of failing logins

### 0.0.50

- fix refresh token
  
### 0.0.47

- fix new login
  
### 0.0.45

- Small improvments

### 0.0.42

- Fix Fueling history

### 0.0.41

- Fix reconnect

### 0.0.40

- Add windowLock and precond for old models

### 0.0.39

- Add remote functionality

### 0.0.38

- Add commands functionality

### 0.0.36

- Fix connection and gas price fetching

### 0.0.35

- Support for new app

### 0.0.22

- Rework fuel history, fix js-controller 3 issues

### 0.0.21

- Removed Socket.io connection

### 0.0.19

- Improve Error handling

### 0.0.18

- Bugfixing

### 0.0.17

- add connection via ODB Adapter (Adapter App)

### 0.0.16

- fix fueling will not recording probably

### 0.0.15

- fix soc history bug, add basic price and  adapter restart every 6h

### 0.0.14

- fix when webpage streams are not reachable

### 0.0.13

- add hard reconnect after 6h for stream data

### 0.0.12

- add gas prices via tankerkönig

### 0.0.11

- minor fixes

### 0.0.10

- fix socket refresh

### 0.0.9

- move code base to app add auxheat.
- Auf App API umgestellt. Standheizung jetzt möglich.

### 0.0.8

- decrease reconnect for all sockets

### 0.0.7

- improve door open functionality add detailed state for door status

### 0.0.6

- fix issue with door data

### 0.0.5

- fix issue no data after 1h

### 0.0.4

- relogin every hour, field to enter vin manually
- Relogin jede Stunde, Feld zum manuellen eintragen der FIN

### 0.0.3

- fix no values after 1h bug, add realtime values like preconditioning
- Keine Daten nach 1h Bug gefixt. Echtzeitwerte hinzugefügt wie Vorklimatisierung

### 0.0.2

- add remote control for Door lock, Window lock and preconditioning
- Tür und Fenster öffnen und Vorklimatisierung hinzugefügt.

### 0.0.1

- (tombox) initial release

## License

MIT License

Copyright (c) 2022 TA2k <tombox2020@gmail.com>

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