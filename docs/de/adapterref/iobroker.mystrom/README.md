---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mystrom/README.md
title: ioBroker.mystrom
hash: C0fa0+X9Dn85ihw8WkIQQjMOmXkSRXHBS2mT9x8s+34=
---
![Logo](../../../en/adapterref/iobroker.mystrom/admin/mystrom.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.mystrom.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.mystrom.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/mystrom-installed.svg)
![Anzahl Installationen (stabil)](http://iobroker.live/badges/mystrom-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/TA2k/iobroker.mystrom.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/TA2k/ioBroker.mystrom/badge.svg)
![NPM](https://nodei.co/npm/iobroker.mystrom.png?downloads=true)

# IoBroker.mystrom
**Tests:** ![Testen und Freigeben](https://github.com/TA2k/ioBroker.mystrom/workflows/Test%20and%20Release/badge.svg)

## Mystrom-Adapter für ioBroker
myStrom-Adapter

Der Adapter liest alle Daten aus der myStrom App und aktualisiert diese alle 30 Minuten. Ebenso liest er die lokalen Daten der Geräte wenn diese online sind und eine IP über die App oder manuell vergeben wurde. Dazu müssen alle Geräte beim Start des Adapters online sein. Taster sind nicht immer online entweder versuchen durch 2x drücken und dann 8 Sekunden gedrückt halten oder zurücksetzen durch 10 Sekunden drücken bis es rot blinkt und dann 1x drücken. Nach dem Zurücksetzen ist ein erneutes Verbinden über WLAN notwendig. Manuell verbinden durch 3x drücken und danach manuell im WLAN anmelden und erst dann dem Pfad in der App folgen. Der Taster ist dann online und kann ausgelesen werden.

Für die jeweiligen Aktionen der Taster und Bewegungsmelder können URLs eingetragen werden. Auch das Schalten der Schalter ist über ioBroker State möglich.

#### WLAN-Schalter
Verwenden Sie zum Schalten der Geräte den LocalCommand mystrom.0.XXXXXXX.localCommands.

#### Tasten
Zum Wechseln der ioBroker-Zustände muss [SimpleAPI](https://github.com/ioBroker/ioBroker.simple-api) verwendet werden.

Die SimpleAPI kann über eine ioBroker web.0-Instanz aktiviert werden. Aktivieren Sie die Option „Integrierte ‚Simple API‘“ in der web.0-Instanz.

Um dann einen Zustand zu setzen kann folgender Wert verwendet werden: Unter Objekte mystrom.0.XXX.localData.api/v1/device.XXXX.single oder long oder double folgenden Zustand setzen (Geräte müssen beim Start des Adapters online sein, 2x drücken und dann 8 Sekunden gedrückt halten. Anschließend den Adapter neu starten bis der Ordner localData gefüllt ist).

##### Get://ioBrokerIP:8082/toggle/javascript.0.test
<br />

#### PIR-Bewegungsmelder
Legen Sie unter den Objekten mystrom.0.XXXXX.localData.api/v1/action.pir den folgenden Status fest.

##### Get://ioBrokerIP:8082/toggle/javascript.0.test
   <br />

Weitere Einzelheiten zum gleichzeitigen Ändern zweier Zustände, zum Beispiel [https://api.mystrom.ch/#d74e63de-9e48-4d02-8164-cd8d7ed67332](https://api.mystrom.ch/#d74e63de-9e48-4d02-8164-cd8d7ed67332)

DE:

Der Adapter liest alle Daten aus der myStrom App und aktualisiert diese alle 30min. Er liest außerdem die lokalen Daten des Geräts, wenn Sie online sind und über die App oder manuell eine IP vergeben wurde. Dazu müssen alle Geräte beim Adapterstart online sein. Die Schaltfläche „+“ ist immer online verfügbar. Sie können sie entweder über 2x drücken und dann 8 Sekunden gedrückt halten oder über 10 Sekunden zurücksetzen, bis sie rot blinkt und dann einmal drücken. Nach dem Reset ist ein erneutes Anmelden über WLAN notwendig. Manuell verbinden durch 3 mal drücken und dann manuell bei dem WLAN anmelden und dann erst den Weg in der App folgen. Danach ist der Button online und kann ausgelesen werden.

Es können URLs für die jeweiligen Aktionen der Buttons und Bewegungsmelder eingegeben werden. Außerdem können die Switches über den ioBroker-Status geschaltet werden.

#### WLAN-Schalter
Zum Schalten der Geräte verwenden Sie localCommand mystrom.0.XXXXXXX.localCommands.

#### Tasten
Zum Schalten von ioBroker-Status muss man die [SimpleAPI](https://github.com/ioBroker/ioBroker.simple-api) verwenden.

Die SimpleAPI kann über eine ioBroker web.0 Instanz aktiviert werden. In der Instanz web.0 Optionen "Eingebautes ‚Simple-API‘" aktivieren.

Zum Setzen eines States kann dann folgende URL<br />

Setzen Sie unter den Objekten den folgenden Status: mystrom.0.XXX.localData.api/v1/device.XXXX.single oder long oder double (Das Gerät muss beim Adapterstart online sein, zweimal drücken und dann 8 Sekunden lang halten. Danach den Adapter neustarten, bis der Ordner localData gefüllt ist.):

##### Get://ioBrokerIP:8082/toggle/javascript.0.test
<br />

#### PIR-Bewegungsmelder
Unter Objekten folgenden Status setzen mystrom.0.XXXXX.localData.api/v1/action.pir

##### Get://ioBrokerIP:8082/toggle/javascript.0.test
   <br />

Mehr Details wie man z.B. zwei Staaten gleichzeitig ändert: [https://api.mystrom.ch/#d74e63de-9e48-4d02-8164-cd8d7ed67332](https://api.mystrom.ch/#d74e63de-9e48-4d02-8164-cd8d7ed67332)

## Changelog
### 0.1.0 (2024-04-21)

- improve cpu usage

## License

MIT License

Copyright (c) 2020-2030 TA2k <tombox2020@gmail.com>

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