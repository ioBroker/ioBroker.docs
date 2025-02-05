---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.devices/README.md
title: ioBroker.устройства
hash: +Ck9oiC/SbmbTzLAkZe4+RMCd+bz+FKryVfovfdUNEg=
---
![Логотип](../../../en/adapterref/iobroker.devices/admin/devices.png)

![Количество установок](http://iobroker.live/badges/devices-stable.svg)
![версия НПМ](http://img.shields.io/npm/v/iobroker.devices.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.devices.svg)

# IoBroker.устройства
![Тест и выпуск](https://github.com/ioBroker/iobroker.devices/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/devices/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

## Адаптер устройств для ioBroker
Управляйте и создавайте устройства для использования их в других адаптерах, таких как материалы, интернет вещей,...

**Важно: включите вкладку в админке, например, журнал и скрипты**

![Экран](../../../en/adapterref/iobroker.devices/img/screen.png)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Более подробную информацию и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

## Задача
- добавить описания для состояний

<!-- Заполнитель для следующей версии (в начале строки):

### **РАБОТА В ХОДЕ** -->
### **РАБОТА В ХОДЕ**
* (@GermanBluefox) Обновленные пакеты
* (@GermanBluefox) Использовал vite
* (@GermanBluefox) Использован eslint-config ioBroker

### 1.1.5 (2023-06-06)
* (Garfonso) исправлено: проблема с редактированием импортированных состояний
* (Гарфонсо) исправлено: предупреждение
* (Garfonso) исправлено: повторное включение iot (без установки пользовательского smartName)
* (Garfonso) исправлено: возможный сбой/опечатка в 1.1.3.

### 1.1.4 (2023-06-06)
* (bluefox) Обновленные пакеты

### 1.1.3 (2023-05-16)
* (bluefox) Улучшение поведения выбора категории

### 1.1.2 (2022-11-09)
* (Гарфонсо) исправил двойные состояния в световых приборах
* (Гарфонсо) добавил тип цвета CIE как эквивалент типа `rgbSingle`

### 1.1.1 (2022-11-03)
* (bluefox) Исправлен диалог удаления
* (bluefox) Добавлен украинский перевод

### 1.1.0 (2022-09-27)
* (bluefox) Перенесен графический интерфейс на версию 5

### 1.0.12 (09.06.2022)
* (bluefox) Разрешено работать с устройствами за обратным прокси-сервером
* (bluefox) Заменена иконка функции

### 1.0.11 (2022-06-08)
* (bluefox) Обновлены некоторые библиотеки

### 1.0.10 (13.02.2022)
* (bluefox) Исправлено редактирование папок
* (bluefox) Обновлены некоторые библиотеки

### 1.0.9 (2021-07-11)
* (bluefox) Реализовать узкие ряды

### 1.0.8 (04.07.2021)
* (bluefox) Исправлено создание устройств

### 1.0.7 (2021-06-30)
* (bluefox) Исправлено создание папок

### 1.0.6 (2021-06-27)
* (bluefox) Реализовал фильтры

### 1.0.5 (2021-06-26)
* (bluefox) Реализовано редактирование параметра `states`

### 1.0.4 (2021-06-08)
* (bluefox) Исправлены некоторые ошибки графического интерфейса.

### 1.0.1 (07.06.2021)
* (bluefox) Добавлен часовой

### 1.0.0 (07.06.2021)
* (bluefox) Добавлены новые устройства

### 0.3.16 (2021-03-11)
* (bluefox) Исправлена ошибка для идентификаторов со странными символами

### 0.3.15 (2020-12-13)
* (bluefox) Обновлен диалог выбора идентификатора

### 0.3.13 (2020-08-17)
* (bluefox) Исправлены ошибки по необязательным состояниям

### 0.3.12 (2020-08-16)
* (bluefox) добавил пылесос

### 0.3.10 (2020-08-12)
* (bluefox) добавил кондиционер

### 0.3.6 (2020-04-17)
* (Apollon77) Добавлены сообщения об ошибках Sentry для Frontend/React

### 0.3.5 (2020-04-17)
* (Apollon77) Исправлена опечатка

### 0.3.4 (2020-03-24)
* (bluefox) Исправлена ошибка при создании устройства

### 0.3.2 (2020-02-09)
* (Apollon77) оптимизировано использование со всеми видами административных портов и обратных прокси-серверов

### 0.3.1 (2020-02-09)
* (Apollon77) добавлена совместимость с Admin >4.0.0

### 0.2.0 (2019-12-20)
* (bluefox) Бэкэнд был удален

### 0.1.8 (2019-11-13)
* (bluefox) Разрешено клонирование устройств

### 0.1.7 (2019-09-15)
* (bluefox) работа в процессе

### 0.1.2 (2019-09-04)
* (bluefox) работа в процессе

### 0.1.0 (2019-08-31)
* (bluefox) первоначальный выпуск

## License
MIT License

Copyright (c) 2019-2025 bluefox <dogafox@gmail.com>

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