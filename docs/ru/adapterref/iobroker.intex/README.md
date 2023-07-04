---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.intex/README.md
title: ioBroker.intex
hash: DWJJsbfonhXBf24vSS1kcAhLpPQuHcc7m3av2X8T3yA=
---
![Логотип](../../../en/adapterref/iobroker.intex/admin/intex.png)

![версия NPM](https://img.shields.io/npm/v/iobroker.intex.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.intex.svg)
![Количество установок](https://iobroker.live/badges/intex-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/intex-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.intex.png?downloads=true)

# IoBroker.intex
**Тесты:** ![Тестируйте и выпускайте](https://github.com/TA2k/ioBroker.intex/workflows/Test%20and%20Release/badge.svg)

## Адаптер intex для ioBroker
Адаптер для Intex Whirlpool с модулем Wi-Fi

## Стратегия взаимодействия с пулом и облаком
### Об облаках
#### Облако вторично; Локальный пул, если он доступен
В этом режиме система пытается выдать команду управления и команду обновления локально. В случае ошибки локальной связи система переключается в облачный режим до повторного запуска адаптера.

IP-адрес и порт взяты из облака. Если IP-адрес тот же, пул необходимо заново зарегистрировать в приложении. Нажмите и удерживайте кнопку подключения и найдите пул. Удалять его из приложения обычно не нужно.

#### Облако вторично; Бассейн только местный
В этом режиме система выдает команду управления и команду обновления локально. При ошибке локальной связи система не переключается на работу в облаке.

Здесь можно установить интервал 0,5 минуты.

IP-адрес и порт взяты из облака. Если IP-адрес тот же, пул необходимо заново зарегистрировать в приложении. Нажмите и удерживайте кнопку подключения и найдите пул. Удалять его из приложения обычно не нужно.

#### Только облако
В этом режиме система отправляет только команду управления и команду обновления через облако.

##### Авторизоваться
Введите почту и пароль приложения Intex.

### Местный
#### Только локально
В локальной эксплуатации в настоящее время также предлагаются функции, которые пул не поддерживает. В поле Адрес необходимо указать либо DNS-имя пула на маршрутизаторе, либо IP-адрес пула.

Интервал также может быть установлен на 0,5 минуты здесь.

IP-адрес пула можно найти с помощью кнопки поиска. Однако это может быть предотвращено маршрутизаторами, если, например. B. Устройствам WLAN не разрешено взаимодействовать друг с другом или порты или трансляция на плате заблокированы в локальном брандмауэре компьютера.

## Управление функциями спа
"intex.0.-id-.remote.-command-" со значением true управляет соответствующей командой.

"intex.0.-id-.control.-command-" со значением true или false управляет состоянием команды пула.

## Обсуждение и вопросы на немецком
https://forum.iobroker.net/topic/47932/test-intext-app-v0-0-x

## Changelog

### 0.1.0
* (rbartl/PLCHome) Support local IP. Both via cloud and only locally without cloud. Thanks to Austria to Robert Bartl.
* (PLCHome) Confirm directly after switching via Control.

### 0.0.7
* (PLCHome) Switching via remote works again.
* (PLCHome) After switching via Control, the previous traffic status can be transmitted from the cloud. This can lead to a toggling of the status.

### 0.0.6
* (PLCHome) Defined setting of states
* (PLCHome) Change Fahrenheit Celsius
* (PLCHome) "control.temperature", read only, object from 0.0.5 must be deleted once.

### 0.0.5
* (PLCHome) Set temperature added, object must be deleted once.
* (PLCHome) Decoding of status information

### 0.0.1
* (TA2k) initial release

## License
MIT License

Copyright (c) 2021 - 2023 TA2k <tombox2020@gmail.com>

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