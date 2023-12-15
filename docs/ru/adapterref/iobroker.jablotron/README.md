---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.jablotron/README.md
title: ioBroker.jablotron
hash: qctzaG/RCZ8xUR4rJSCEsSNUyHYJ3zmEZcUEnomQM2o=
---
![Логотип](../../../en/adapterref/iobroker.jablotron/admin/jablotron.png)

![НПМ-версия](https://img.shields.io/npm/v/iobroker.jablotron.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.jablotron.svg)
![Количество установок](https://iobroker.live/badges/jablotron-installed.svg)
![Текущая версия в стабильном репозитории.](https://iobroker.live/badges/jablotron-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.jablotron.png?downloads=true)

# IoBroker.jablotron
**Тесты:** ![Тестирование и выпуск](https://github.com/DEV2DEV-DE/ioBroker.jablotron/workflows/Test%20and%20Release/badge.svg)

## Адаптер Jablotron для ioBroker
Подключается к облаку Jablotron для доступа к вашей системе безопасности.

В настоящее время адаптер доступен **только для чтения**!

Можно только прочитать штаты. Переключение будет реализовано позже!

Адаптер подключается только к облаку производителя. В настоящее время невозможно подключиться к центральному блоку только по локальной сети, поскольку производитель закрыл локальный API.

### Форум
Обсудите свой опыт тестирования здесь: https://forum.iobroker.net/topic/70798

## Известные вопросы
* Насколько известно на данный момент, датчики, переключатели и другие устройства должны быть настроены как «программируемые ворота», чтобы их можно было прочитать.
* Некоторые устройства должны быть указаны как «thermoDevice», но список на данный момент пуст и поэтому еще не может быть протестирован.

Сообщайте о любой ошибке, проблеме или запросе как о проблеме GitHub: https://github.com/DEV2DEV-DE/ioBroker.jablotron/issues.

## Производитель
https://www.jablotron.com/de/katalog-produktu/alarme/jablotron-100/

## Важное замечание
### Версия 0.0.5
Изменено хранение конфиденциальных данных в конфигурации экземпляра.
Вам необходимо повторно ввести пароль в настройках экземпляра, если вы уже использовали более старую версию < 0.0.5.

## Использованная литература
* https://github.com/ioBroker/AdapterRequests/issues/755
* https://github.com/hajekmi/myjablotron
* https://github.com/fdegier/homebridge-jablotron-alarm
* https://github.com/plaksnor/HASS-JablotronSystem
* https://github.com/kukulich/home-assistant-jablotron100

## Changelog
### 0.1.1 (2023-12-13)
* Improved readability
* Select data segments read from server
* Changed User-Agent in requests

### 0.1.0 (2023-12-10)
* Fixed issue with restarts due to timeouts

### 0.0.7 (2023-12-08)
* Fixed wrong structure in readme

### 0.0.5 (2023-12-06)
* Fixed typo
* Encrypt sensitive data in instance config
* Add min and max for poll interval
* Removed unused code
* Do not create static states in code

### 0.0.4 (2023-12-03)
* Fixed wrong state type for data type 'object'

### 0.0.3 (2023-12-03)
* Implemented improvements mentioned in review

### 0.0.2 (2023-11-30)
* Provide an appropriate role for any state
* Readme extended
* Output 'thermoDevices' in debug log

## License
MIT License

Copyright (c) 2023 DEV2DEV-DE

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