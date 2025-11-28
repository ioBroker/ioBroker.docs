![Logo](admin/mihome-cloud.png)

# ioBroker.mihome-cloud

[![NPM version](https://img.shields.io/npm/v/iobroker.mihome-cloud.svg)](https://www.npmjs.com/package/iobroker.mihome-cloud)
[![Downloads](https://img.shields.io/npm/dm/iobroker.mihome-cloud.svg)](https://www.npmjs.com/package/iobroker.mihome-cloud)
![Number of Installations](https://iobroker.live/badges/mihome-cloud-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/mihome-cloud-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.mihome-cloud.png?downloads=true)](https://nodei.co/npm/iobroker.mihome-cloud/)

**Tests:** ![Test and Release](https://github.com/TA2k/ioBroker.mihome-cloud/workflows/Test%20and%20Release/badge.svg)

## mihome-cloud adapter for ioBroker

Adapter for Mi Home Cloud devices

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

# Login procedure

Enter the app mail and password.

# Control

mihome-cloud.0.ID.remote

Can send commands either set the state unconfirmed to true.

If a command expects input those are listed in the name and as default value the IDs are listed.

Name and ID can be found under status. Possible values can be found by pressing the pencil and then under states.

Input values could be e.g. `["10",0,1] `

If no control is possible under remote, scenes/smart scenarios can be created and executed under mihome-cloud.0.scenes.

Example: Robot vacuum cleaner room cleaning

mihome-cloud.0.id.remote.set-room-clean needs as input
sweep set-room-clean 7-3 in[clean-room-ids,clean-room-mode,clean-room-oper] [24,25,26].

Potentially, room ids can be found at:

mihome-cloud.0.id.remote.get-map-room-list

mihome-cloud.0.id.remote.get-preference-ii

both require
[clean-current-map] [33] as input

mihome-cloud.0.id.status.clean-current-map sweep clean-current-map 7-33

is unfortunately null
You can alternatively use

mihome-cloud.0.id.status.cur-map-id

or

mihome-cloud.0.id.remote.get-map-list map get-map-list 10-1 out[map-list]
query the map list and see the result under mihome-cloud.0.id.status.map-list map map-list 10-4

You can then set this id

mihome-cloud.0.id.remote.get-map-room-list map get-map-room-list 10-13 in[cur-map-id] out[room-id-name-list]

mihome-cloud.0.id.remote.get-preference-ii sweep get-preference-ii 7-10 in[clean-current-map] out[clean-preference,clean-prefer-on,clean-preference-ii,clean-prefer-on-ii]

Format: [1673811000]

Then you get the information under:

mihome-cloud.0.id.status.room-id-name-list: [{"name":"room1","id":10}]

or

mihome-cloud.0.id.status.clean-preference ["1_10_0_1_0_0_1","1_11_0_0_0_0_1","1_12_1_1_2_0_1","1_13_0_0_0_0_1"]

mihome-cloud.0.id.status.clean-prefer-on

mihome-cloud.0.id.status.clean-preference-ii

mihome-cloud.0.id.status.clean-prefer-on-ii

With the information you can then use

mihome-cloud.0.id.remote.start-room-sweep
format ["10", "11", "12", "13"]

or

mihome-cloud.0.id.remote.set-room-clean

Format ["10",0,1]

## Discussion and questions

<https://forum.iobroker.net/topic/59636/test-adapter-mihome-cloud>

# Loginablauf

Die App Mail und Passwort eingeben.

# Steuerung

mihome-cloud.0.ID.remote

Können Befehle gesendet entweder den State unbestätigt auf true setzen.

Wenn ein Befehl Input erwartet werden die im Namen aufgezählt und als default Wert werden die IDs aufgelistet.

Name und ID findet man unter status. Mögliche Werte findet man auf den Bleistift drückt und dann unter states.

Eingabewerte könnte z.b. `["10",0,1] `

Falls unter Remote keine Steuerung möglich ist können Szenen/Smart Szenario angelegt werden und diese können unter mihome-cloud.0.scenes ausgeführt werden.

Bsp: Saugroboter Raumreinigung

mihome-cloud.0.id.remote.set-room-clean benötigt als Input
sweep set-room-clean 7-3 in[clean-room-ids,clean-room-mode,clean-room-oper] [24,25,26]

Potenziel findet man Room Ids unter:

mihome-cloud.0.id.remote.get-map-room-list

mihome-cloud.0.id.remote.get-preference-ii

beide benötigen
[clean-current-map] [33] als Input

mihome-cloud.0.id.status.clean-current-map sweep clean-current-map 7-33

ist leider null
Man kann alternativ

mihome-cloud.0.id.status.cur-map-id

nutzen oder

mihome-cloud.0.id.remote.get-map-list map get-map-list 10-1 out[map-list]
die Kartenliste abfragen und sieht das result unter unter mihome-cloud.0.id.status.map-list map map-list 10-4

Diese Id kann man dann setzen

mihome-cloud.0.id.remote.get-map-room-list map get-map-room-list 10-13 in[cur-map-id] out[room-id-name-list]

mihome-cloud.0.id.remote.get-preference-ii sweep get-preference-ii 7-10 in[clean-current-map] out[clean-preference,clean-prefer-on,clean-preference-ii,clean-prefer-on-ii]

Format: [1673811000]

Dann erhält man die Informationen unter:

mihome-cloud.0.id.status.room-id-name-list: [{"name":"room1","id":10}]

oder

mihome-cloud.0.id.status.clean-preference ["1_10_0_1_0_0_1","1_11_0_0_0_0_1","1_12_1_1_2_0_1","1_13_0_0_0_0_1"]

mihome-cloud.0.id.status.clean-prefer-on

mihome-cloud.0.id.status.clean-preference-ii

mihome-cloud.0.id.status.clean-prefer-on-ii

Mit den Informationen kann man dann

mihome-cloud.0.id.remote.start-room-sweep
Format ["10","11","12","13"]

oder

mihome-cloud.0.id.remote.set-room-clean

Format ["10",0,1]

## Diskussion und Fragen

<https://forum.iobroker.net/topic/59636/test-adapter-mihome-cloud>

## Changelog

### 0.2.0

- (lubepi) Fix login

### 0.0.5

- (TA2k) Bugfixes

### 0.0.3

- (TA2k) initial release

## License

MIT License

Copyright (c) 2023 TA2k <tombox2020@gmail.com>

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
