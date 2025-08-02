---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.minuaru/README.md
title: ioBroker.minuaru
hash: V2vH7QJArTkThTgfrZTERi5mG6lqmvW1RWVMmfG2ZtQ=
---
![Логотип](../../../en/adapterref/iobroker.minuaru/admin/minuaru.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.minuaru.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.minuaru.svg)

# IoBroker.minuaru
[!Количество установок](https://iobroker.live/badges/minuaru-installe.svg) [!Текущая версия в стабильном репозитории](https://iobroker.live/badges/minuaru-stable.svg)

## Адаптер minuaru для ioBroker
система сигнализации для ioBroker и minuvis

> **КРАЙНЕЕ ИЗМЕНЕНИЕ в V2.0.0: Существующие сигналы тревоги версии 1.x будут удалены**

## Инструкции
- установите адаптер как обычно
- создать экземпляр minuaru
- настройка параметров адаптера

- выберите экземпляр Telegram и задайте имя пользователя, если хотите отправлять сигналы тревоги в Telegram

![minuaruНастройки Telegram](https://user-images.githubusercontent.com/20790635/151257135-3b8e335f-9510-4531-9452-a982426011ab.png)

- при необходимости откорректируйте текст сообщения телеграммы

![minuaruTelegramMessageSettings](https://user-images.githubusercontent.com/20790635/151257507-b882a3ec-88b3-4c91-bc24-c774db30908f.png)

- при необходимости переведите заголовки столбцов таблицы тревог

![minuaruAlarmtableSettingsheader](https://user-images.githubusercontent.com/20790635/151255365-4613045d-c868-4e5e-b428-9077b7ae6f99.png)

- при необходимости измените цвета строк сообщений и цвет текста

![minuaruТаблица будильниковНастройкиЦвет](https://user-images.githubusercontent.com/20790635/151256690-ee9bead9-9277-4438-998b-c04d8c566124.png)

- активировать минуару на желаемых объектах

![активироватьMinuaru](https://user-images.githubusercontent.com/20790635/151258456-58e99565-8af5-4200-a1f0-c6c75f4351d2.png)

- активировать Minuaru и задать настройки объекта

![setSettingsObjects](https://user-images.githubusercontent.com/20790635/151258700-4d3ca8ca-5df0-4c3d-9638-968b97d788eb.png)

> для пользователей **ioBroker.minuvis** (вам нужна версия >= 2.3.0):

- активировать alarmpage и minuaru.0-instance в конструкторе

![активироватьAlarmpage](https://user-images.githubusercontent.com/20790635/151258040-6bb074e3-bd35-45b5-9888-5e826a7d3edc.png)

- число в заголовке minuvis ссылается на страницу тревоги

![использоватьNewAlarmPage](https://user-images.githubusercontent.com/20790635/151259455-c8d5a676-027a-4651-813b-211ca2083fd9.png)

- подтверждайте сигналы тревоги, чтобы сократить количество ожидающих обработки сигналов тревоги

![подтвердитьСигнализации](https://user-images.githubusercontent.com/20790635/151259642-4daec6cf-35fa-4e68-9d92-0000c2d41c25.png)

- используйте объекты html или json для интеграции в другие визуализации

![другиеОбъекты](https://user-images.githubusercontent.com/20790635/151259992-61758c9c-e102-4f38-ae0e-931721d04a17.png)

## Changelog
### 2.0.2 (2024-12-03)
* (svallant) update jsonConfig for responsive design

### 2.0.1 (2024-11-29)
* (svallant) minor changes

### 2.0.0 (2024-11-15)
* BREAKING CHANGE: Existings alarms of version 1.x will be deleted
* (svallant) release of version 2
* (svallant) fixing issues detected by repository checker
* (svallant) switch to duckdb

### 1.1.0 (2023-03-19)
* (svallant) respect ack-flag at control-states

### 1.0.1 (2022-11-25)
* (svallant) fix translation

### 1.0.0 (2022-11-24)
* (svallant) several bugfixes

### 0.9.0 (2022-01-29)
* (svallant) beta release

### 0.0.1 (2022-01-16)
* (svallant) initial release

## License
MIT License

Copyright (c) 2024 svallant <svallant@gmx.eu>

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