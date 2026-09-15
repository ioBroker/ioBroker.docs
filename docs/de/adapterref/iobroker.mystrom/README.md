---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mystrom/README.md
title: ioBroker.mystrom
hash: bRYTsCanapQAhTYMJD6OiVMyVqP98ci/pCxbRRT+hg8=
---
![Logo](../../../en/adapterref/iobroker.mystrom/admin/mystrom.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.mystrom.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.mystrom.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/mystrom-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/mystrom-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/TA2k/iobroker.mystrom.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/TA2k/ioBroker.mystrom/badge.svg)
![NPM](https://nodei.co/npm/iobroker.mystrom.png?downloads=true)
![Test und Freigabe](https://github.com/TA2k/ioBroker.mystrom/workflows/Test%20and%20Release/badge.svg)

# ioBroker.mystrom

## Mystrom-Adapter für ioBroker

myStrom-Adapter

Der Adapter liest alle Daten aus der myStrom App und aktualisiert sie alle 30 Minuten. Er liest außerdem die lokalen Daten der Geräte, sofern diese online sind und ihnen über die App oder manuell eine IP-Adresse zugewiesen wurde. Dafür müssen alle Geräte beim Start des Adapters online sein. Falls die Tasten nicht immer sofort verfügbar sind, versuchen Sie Folgendes: Drücken Sie die Taste zweimal und halten Sie sie anschließend 8 Sekunden lang gedrückt. Alternativ können Sie den Adapter zurücksetzen, indem Sie die Taste 10 Sekunden lang gedrückt halten, bis sie rot blinkt, und sie dann einmal drücken. Nach dem Zurücksetzen ist eine erneute WLAN-Verbindung erforderlich. Stellen Sie die Verbindung manuell her, indem Sie die Taste dreimal drücken und sich dann manuell im WLAN anmelden. Folgen Sie erst dann den Anweisungen in der App. Die Taste ist nun wieder verfügbar und kann ausgelesen werden.

Für die jeweiligen Aktionen der Tasten und Bewegungsmelder können URLs eingegeben werden. Die Schalter können auch über den ioBroker-Status geschaltet werden.

#### WLAN-Schalter

Um zwischen den Geräten zu wechseln, verwenden Sie den LocalCommand mystrom.0.XXXXXXX.localCommands.

#### Tasten

Die [SimpleAPI](https://github.com/ioBroker/ioBroker.simple-api) muss verwendet werden, um zwischen ioBroker-Zuständen zu wechseln.

Die SimpleAPI kann über eine ioBroker web.0-Instanz aktiviert werden. Aktivieren Sie dazu die Option „Integrierte 'Simple API'“ in der web.0-Instanz.

Anschließend kann Folgendes verwendet werden, um einen Status festzulegen: Legen Sie den folgenden Status unter Objekte mystrom.0.XXX.localData.api/v1/device.XXXX.single oder long oder double fest (Geräte müssen online sein, wenn der Adapter gestartet wird, zweimal drücken und dann 8 Sekunden lang gedrückt halten. Starten Sie dann den Adapter neu, bis der Ordner localData gefüllt ist).

##### get://ioBrokerIP:8082/toggle/javascript.0.test

<br />

#### PIR-Bewegungsmelder

Setzen Sie den folgenden Status unter Objekte mystrom.0.XXXXX.localData.api/v1/action.pir

##### get://ioBrokerIP:8082/toggle/javascript.0.test

   <br />

Weitere Details zur gleichzeitigen Änderung zweier Zustände finden Sie beispielsweise unter <https://api.mystrom.ch/#d74e63de-9e48-4d02-8164-cd8d7ed67332>

DE:

Der Adapter liest alle Daten aus der myStrom App und aktualisiert diese alle 30min. Er liest außerdem die lokalen Daten der Geräte, wenn sie online sind und über die App oder manuell eine IP vergeben wurden. Dazu müssen alle Geräte bei Adapterstart online sein. Button sind nicht immer online, entweder über 2x drücken und dann 8 Sekunden gedrückt halten oder über 10 Sekunden zurücksetzen, bis er rot blinkt und dann einmal gedrückt wird. Nach dem Reset ist ein erneutes Verbinden über WLAN notwendig. Manuell verbinden über 3 mal drücken und dann manuell bei dem WLAN anmelden und dann erst den Weg in der App folgen. Danach ist der Button online und kann ausgelesen werden.

Es können URLs für die jeweiligen Aktionen der Buttons und Bewegungsmelder eingegeben werden. Außerdem kann der Switch über ioBroker State geschaltet werden.

#### WLAN-Schalter

Zum Schalten der Geräte die localCommand benutzen mystrom.0.XXXXXXX.localCommands.

#### Tasten

Zum Schalten von ioBroker heißt es, man muss die [SimpleAPI](https://github.com/ioBroker/ioBroker.simple-api) verwenden.

Die SimpleAPI kann über eine ioBroker web.0 Instanz aktiviert werden. In der Instanz web.0 Optionen „Eingebautes ‚Simple-API‘“ aktivieren.

Zum Setzen eines Staates kann dann folgende URL verwendet werden<br />

Unter Objekten folgenden Status setzen mystrom.0.XXX.localData.api/v1/device.XXXX.single oder long oder double (Geräte müssen bei Adapterstart online sein, Zweimal drücken und dann für 8 Sekunden halten. Danach Adapter neustarten bis der Ordner localData gefüllt ist.):

##### get://ioBrokerIP:8082/toggle/javascript.0.test

<br />

#### PIR-Bewegungsmelder

Unter Objekten folgenden State setzen mystrom.0.XXXXX.localData.api/v1/action.pir

##### get://ioBrokerIP:8082/toggle/javascript.0.test

   <br />

Mehr Details wie man zB zwei Staaten gleichzeitig ändert: <https://api.mystrom.ch/#d74e63de-9e48-4d02-8164-cd8d7ed67332>

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