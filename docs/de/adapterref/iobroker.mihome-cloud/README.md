---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mihome-cloud/README.md
title: ioBroker.mihome-cloud
hash: VVsWVsdGF1A8M5qtOJuvubLxQgPSehFFE9QaiFSt6WI=
---
![Logo](../../../en/adapterref/iobroker.mihome-cloud/admin/mihome-cloud.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.mihome-cloud.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.mihome-cloud.svg)
![Anzahl der Installationen](https://iobroker.live/badges/mihome-cloud-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/mihome-cloud-stable.svg)
![NPM](https://nodei.co/npm/iobroker.mihome-cloud.png?downloads=true)

# IoBroker.mihome-cloud
**Tests:** ![Testen und freigeben](https://github.com/TA2k/ioBroker.mihome-cloud/workflows/Test%20and%20Release/badge.svg)

## Mihome-cloud-Adapter für ioBroker
Adapter für Mi Home Cloud-Geräte

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry-Berichte werden ab js-controller 3.0 verwendet.

# Anmeldeverfahren
Geben Sie die E-Mail-Adresse und das Passwort der App ein.

# Kontrolle
mihome-cloud.0.ID.remote

Kann Befehle senden entweder den Zustand unbestätigt auf wahr setzen.

Wenn ein Befehl Eingaben erwartet, werden diese im Namen aufgeführt und als Standardwert werden die IDs aufgeführt.

Name und ID finden Sie unter Status. Mögliche Werte finden Sie, indem Sie auf den Bleistift drücken und dann unter Zustände.

Eingabewerte könnten z.B. `["10",0,1] `

Ist unter Remote keine Steuerung möglich, können unter mihome-cloud.0.scenes Szenen/Smart-Szenarien erstellt und ausgeführt werden.

Beispiel: Raumreinigung durch Roboter-Staubsauger

mihome-cloud.0.id.remote.set-room-clean benötigt als Eingabe Sweep set-room-clean 7-3 in [Reinraum-IDs, Reinraum-Modus, Reinraum-Oper] [24, 25,26].

Möglicherweise finden Sie Raum-IDs unter:

mihome-cloud.0.id.remote.get-map-room-list

mihome-cloud.0.id.remote.get-preference-ii

beide benötigen [clean-current-map] [33] als Eingabe

mihome-cloud.0.id.status.clean-current-map Sweep clean-current-map 7-33

ist leider null Kann man alternativ verwenden

mihome-cloud.0.id.status.cur-map-id

oder

mihome-cloud.0.id.remote.get-map-list map get-map-list 10-1 out[map-list] Fragen Sie die Kartenliste ab und sehen Sie sich das Ergebnis unter mihome-cloud.0.id.status.map an -Liste Karte Karte-Liste 10-4

Sie können diese ID dann festlegen

mihome-cloud.0.id.remote.get-map-room-list map get-map-room-list 10-13 in[aktuelle-map-id] out[room-id-name-list]

mihome-cloud.0.id.remote.get-preference-ii Sweep get-preference-ii 7-10 in[clean-current-map] out[clean-preference,clean-prefer-on,clean-preference-ii, clean-prefer-on-ii]

Format: [1673811000]

Dann erhalten Sie die Informationen unter:

mihome-cloud.0.id.status.room-id-name-list: [{"name":"room1","id":10}]

oder

mihome-cloud.0.id.status.clean-preference ["1_10_0_1_0_0_1","1_11_0_0_0_0_1","1_12_1_1_2_0_1","1_13_0_0_0_0_1"]

mihome-cloud.0.id.status.clean-prefer-on

mihome-cloud.0.id.status.clean-preference-ii

mihome-cloud.0.id.status.clean-prefer-on-ii

Mit den Informationen können Sie dann verwenden

mihome-cloud.0.id.remote.start-room-sweep format ["10", "11", "12", "13"]

oder

mihome-cloud.0.id.remote.set-room-clean

Format ["10",0,1]

## Diskussion und Fragen
<https://forum.iobroker.net/topic/59636/test-adapter-mihome-cloud>

# Anmeldeablauf
Die App Mail und Passwort eingeben.

#Steuerung
mihome-cloud.0.ID.remote

Können Befehle gesendet entweder den Zustand unbestätigt auf true setzen.

Wenn ein Befehlseingang erwartet wird, werden die im Namen aufgezählt und als Standardwert werden die IDs aufgelistet.

Name und ID findet man unter Status. Mögliche Werte findet man auf den Bleistift drückt und dann unter Staaten.

Eingabewerte könnten z.b. `["10",0,1] `

Falls unter Remote keine Steuerung möglich ist can Szenen/Smart Szenario angelegt Werden und this can unter mihome-cloud.0.scenes ausgeführt Werden.

Bsp: Saugroboter Raumreinigung

mihome-cloud.0.id.remote.set-room-clean benötigt als Eingabe Sweep set-room-clean 7-3 in[clean-room-ids,clean-room-mode,clean-room-oper] [24, 25,26]

Potenziel findet man Room Ids unter:

mihome-cloud.0.id.remote.get-map-room-list

mihome-cloud.0.id.remote.get-preference-ii

beide benötigen [clean-current-map] [33] als Input

mihome-cloud.0.id.status.clean-current-map Sweep clean-current-map 7-33

ist leider null Man kann alternativ

mihome-cloud.0.id.status.cur-map-id

nutzen oder

mihome-cloud.0.id.remote.get-map-list map get-map-list 10-1 out[map-list] die Kartenliste abfragen und sieht das Ergebnis unter mihome-cloud.0.id.status.map -Liste Karte Karte-Liste 10-4

Diese ID kann man dann setzen

mihome-cloud.0.id.remote.get-map-room-list map get-map-room-list 10-13 in[aktuelle-map-id] out[room-id-name-list]

mihome-cloud.0.id.remote.get-preference-ii Sweep get-Preference-ii 7-10 in[clean-current-map] out[clean-preference,clean-prefer-on,clean-preference-ii, clean-prefer-on-ii]

Format: [1673811000]

Dann erhält man die Informationen unter:

mihome-cloud.0.id.status.room-id-name-list: [{"name":"room1","id":10}]

Oder

mihome-cloud.0.id.status.clean-preference ["1_10_0_1_0_0_1","1_11_0_0_0_0_1","1_12_1_1_2_0_1","1_13_0_0_0_0_1"]

mihome-cloud.0.id.status.clean-prefer-on

mihome-cloud.0.id.status.clean-preference-ii

mihome-cloud.0.id.status.clean-prefer-on-ii

Mit den Informationen kann man dann

mihome-cloud.0.id.remote.start-room-sweep Format ["10","11","12","13"]

Oder

mihome-cloud.0.id.remote.set-room-clean

Format ["10",0,1]

##Diskussion und Fragen
<https://forum.iobroker.net/topic/59636/test-adapter-mihome-cloud>

## Changelog

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