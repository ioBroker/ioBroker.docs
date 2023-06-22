---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.intex/README.md
title: ioBroker.intex
hash: vidHWdxc5eeX+XnUFQtmFMETAZUYCX6fBRuQxeyaYW0=
---
![Логотип](../../../en/adapterref/iobroker.intex/admin/intex.png)

![версия NPM](https://img.shields.io/npm/v/iobroker.intex.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.intex.svg)
![Количество установок](https://iobroker.live/badges/intex-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/intex-stable.svg)
![Статус зависимости](https://img.shields.io/david/TA2k/iobroker.intex.svg)
![НПМ](https://nodei.co/npm/iobroker.intex.png?downloads=true)

# IoBroker.intex
**Тесты:** ![Тестируйте и выпускайте](https://github.com/TA2k/ioBroker.intex/workflows/Test%20and%20Release/badge.svg)

## Адаптер intex для ioBroker
Адаптер для Intex Whirlpool с модулем Wi-Fi

## Войти в систему:
Die Intex App Mail и пароль автоматически.

## Штойрн
intex.0.<id>.remote auf true setzen steuert den jeweiligen Befehl.
intex.0.<id>.control auf true или false setzen, steuert den Pool Befehl in den Zusstand.

## Локал
Bei Cloudbetrieb versucht das System den Befehl lokal abzusetzen, es sei denn, es ist nur Cloud angegeben. Sollte ein Fehler auftreten, wechselt das System wieder in den Cloudbetrieb bis zum nächsten Start des Adapters.

Im local Betreib werden aktuell auch Funktionen angeboten, die der Pool nicht unterstützt. Он должен передавать адреса DNS-имен пулов на маршрутизаторе или IP-адреса пулов, которые не соответствуют друг другу.
Das Intervall kann Hier auf eine Minute gesetzt werden.

Dieses kann über densuchbutton gesucht werden. Dieses kann allerdings von Router Unterbundnen werden, wenn z. B. WLAN Geräte nicht untereinander kommunizieren dürfen oder in der localen Firewall des Rechners Ports oder Bordcasting gesperrt ist.

## Обсуждение и обсуждение:
https://forum.iobroker.net/topic/47932/test-intext-app-v0-0-x

## Changelog

### 0.1.0
* (PLCHome/rbartl) Unterstützung lokale IP. Sowohl über Cloud als auch nur lokal ohne Cloud. Danke nach Österreich an Robert Bartl.
* (PLCHome) Nach dem Schalten über Control direkt bestätigen.

### 0.0.7
* (PLCHome) Schalten über remote funktioniert wieder.
* (PLCHome) Nach dem Schalten über Control kann von der Cloud der vorherige Staus übermittelt werden. Dadurch kann es zu einem Toggeln des Zutands kommen.

### 0.0.6
* (PLCHome) Definiertes Setzen von Zuständen
* (PLCHome) Ändern Fahrenheit Celsius
* (PLCHome) control.temperatur, nur lesen, Objekt aus 0.0.5 muss einmal gelöscht werden.

### 0.0.5
* (PLCHome) Temperatur setzen hinzugefügt, Objekt muss einmal gelöscht werden.
* (PLCHome) Decodierung der Statusinformationen

### 0.0.1
* (TA2k) initial release

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