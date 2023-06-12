---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.devices/README.md
title: ioBroker.devices
hash: tHOww4Jc8fb43+J1cDd99cPWkNKcXNOT3uoXjlBBBMA=
---
![Логотип](../../../en/adapterref/iobroker.devices/admin/devices.png)

![Количество установок](http://iobroker.live/badges/devices-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.devices.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.devices.svg)

# IoBroker.devices
![Тестируйте и выпускайте](https://github.com/ioBroker/iobroker.devices/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/devices/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

Адаптер ## устройств для ioBroker
Управляйте и создавайте устройства для использования в других адаптерах, таких как материалы, iot,...

**Важно: включите вкладку в админке, например лог и скрипты**

![Экран](../../../en/adapterref/iobroker.devices/img/screen.png)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам.** Дополнительные сведения и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

## Делать
- добавить описания для состояний

<!-- Заполнитель для следующей версии (в начале строки):

### **В РАБОТЕ** -->
### 1.1.5 (2023-06-06)
* (Garfonso) исправлено: проблема с редактированием импортированных состояний
* (Garfonso) исправлено: предупреждение
* (Garfonso) исправлено: повторное включение iot (без установки пользовательского smartName)
* (Garfonso) исправлено: возможный сбой/опечатка в 1.1.3.

### 1.1.4 (2023-06-06)
* (bluefox) Обновлены пакеты

### 1.1.3 (2023-05-16)
* (bluefox) Лучшее поведение при выборе категории

### 1.1.2 (2022-11-09)
* (Garfonso) исправлено двойное состояние в световых устройствах
* (Garfonso) добавлен тип цвета CIE как эквивалентный типу `rgbSingle`

### 1.1.1 (2022-11-03)
* (bluefox) Исправлен диалог удаления
* (bluefox) Добавлен украинский перевод

### 1.1.0 (27 сентября 2022 г.)
* (bluefox) GUI перенесен на v5

### 1.0.12 (09.06.2022)
* (bluefox) Разрешена работа с устройствами за обратным прокси
* (bluefox) Заменена иконка функции

### 1.0.11 (2022-06-08)
* (bluefox) Обновлены некоторые библиотеки

### 1.0.10 (13 февраля 2022 г.)
* (bluefox) Исправлено редактирование папок
* (bluefox) Обновлены некоторые библиотеки

### 1.0.9 (2021-07-11)
* (bluefox) Реализовать узкие ряды

### 1.0.8 (2021-07-04)
* (bluefox) Исправлено создание устройств

### 1.0.7 (30.06.2021)
* (bluefox) Исправлено создание папок

### 1.0.6 (27 июня 2021 г.)
* (bluefox) Реализованы фильтры

### 1.0.5 (2021-06-26)
* (bluefox) Реализовано редактирование параметра `states`

### 1.0.4 (2021-06-08)
* (bluefox) Исправлены некоторые ошибки графического интерфейса.

### 1.0.1 (2021-06-07)
* (bluefox) Добавлен часовой

### 1.0.0 (2021-06-07)
* (bluefox) Добавлены новые устройства

### 0.3.16 (11 марта 2021 г.)
* (bluefox) Исправлена ошибка для идентификаторов со странными символами

### 0.3.15 (13.12.2020)
* (bluefox) Обновлен диалог выбора идентификатора

### 0.3.13 (2020-08-17)
* (bluefox) Исправлены ошибки по необязательным состояниям

### 0.3.12 (2020-08-16)
* (bluefox) добавлен пылесос

### 0.3.10 (2020-08-12)
* (bluefox) добавлен кондиционер

### 0.3.6 (2020-04-17)
* (Apollon77) Добавлен отчет об ошибках Sentry для Frontend/React.

### 0.3.5 (2020-04-17)
* (Apollon77) Исправлена опечатка

### 0.3.4 (2020-03-24)
* (bluefox) Исправлена ошибка при создании устройства

### 0.3.2 (09.02.2020)
* (Apollon77) оптимизировано использование всех видов портов администратора и обратных прокси

### 0.3.1 (09.02.2020)
* (Apollon77) добавлена совместимость с Admin > 4.0.0

### 0.2.0 (20.12.2019)
* (bluefox) Бэкэнд был удален

### 0.1.8 (13.11.2019)
* (bluefox) Разрешено клонирование устройств

### 0.1.7 (2019-09-15)
* (синий лис) работа в процессе

### 0.1.2 (2019-09-04)
* (синий лис) работа в процессе

### 0.1.0 (31 августа 2019 г.)
* (синий лис) первоначальный выпуск

## License
MIT License

Copyright (c) 2019-2023 bluefox <dogafox@gmail.com>

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