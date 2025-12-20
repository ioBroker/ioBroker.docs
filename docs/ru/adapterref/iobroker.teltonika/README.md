---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.teltonika/README.md
title: ioBroker Teltonika
hash: ITce4FuOuoOrXOpu1ruJf0Z3Zn+Reze1PrwtFoPz3gE=
---
![Количество установок](http://iobroker.live/badges/teltonika-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.teltonika.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.teltonika.svg)

<img src="admin/teltonika.svg" height="100px"/>

# IoBroker Teltonika
![Тестирование и выпуск](https://github.com/ioBroker/ioBroker.teltonika/workflows/Test%20and%20Release/badge.svg) [![[Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/teltonika/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Для получения более подробной информации и сведений о том, как отключить отправку сообщений об ошибках, см. [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отправка сообщений Sentry используется начиная с js-controller 3.0.

Этот адаптер считывает данные с маршрутизаторов Teltonika через протокол MQTT.
Он может считывать следующую информацию:

- температура ('RUT2', 'RUT9', 'RUTX', 'RUT3', 'RUT1', 'TRB2', 'TRB5', 'OTD', 'RUTM', 'RUTC')
- уровень сигнала
- мобильный оператор
- состояние сети
- тип подключения (2G/3G/4G)
- IP-адрес WAN
- время безотказной работы
- имя
- цифровой вход 1 ('RUT9')
- цифровой вход 2 ('RUT9')
- аналоговый вход ('RUT9', 'TRB2', 'TRB141')
- состояние контакта 2 ('TRB2')
- статус контакта 3 ('RUT1', 'RUT2', 'RUT9', 'RUTX', 'RUT3', 'TRB1', 'TRB2', 'TRB5', 'RUTM')
- статус контакта 4 ('RUT1', 'RUT2', 'RUT9', 'RUTX', 'RUT3', 'TRB1', 'TRB2', 'TRB5', 'RUTM')

## Использование
Шаги:

— Сначала запустите экземпляр.
— Зайдите в настройки вашего роутера и откройте настройки MQTT.

  ![Настройки](../../../en/adapterref/iobroker.teltonika/img/settings.png)

- Включить отправителя MQTT
— Установите адрес MQTT-брокера равным адресу вашего экземпляра ioBroker.
- Установите порт MQTT-брокера. Важно: порт по умолчанию для этого адаптера — 1885, чтобы избежать конфликтов с другими MQTT-адаптерами.
- Сохраните настройки
— Для применения настроек некоторым маршрутизаторам требуется перезагрузка.
— Через некоторое время точки данных будут созданы в экземпляре адаптера.

**Внимание**: тестирование проводилось только с устройством `RUTC`.

<!-- Заполнитель для следующей версии (в начале строки):

### **РАБОТА В ПРОЦЕССЕ** -->

## Changelog
### 0.1.0 (2025-12-07)
* (bluefox) Changed roles of the states

### 0.0.2 (2025-12-03)
* (bluefox) initial commit

## License

The MIT License (MIT)

Copyright (c) 2025, bluefox <dogafox@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.