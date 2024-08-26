---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.minuaru/README.md
title: ioBroker.minuaru
hash: FcP6n5IGihVpfpDGmfcy4xmu9IwO+tIKJtQniwuseCQ=
---
![Логотип](../../../en/adapterref/iobroker.minuaru/admin/minuaru.png)

![версия NPM](https://img.shields.io/npm/v/iobroker.minuaru.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.minuaru.svg)
![НПМ](https://nodei.co/npm/iobroker.minuaru.png?downloads=true)

# IoBroker.minuaru
[!Количество установок](https://iobroker.live/badges/minuaru-installed.svg) [!Текущая версия в стабильном репозитории](https://iobroker.live/badges/minuaru-stable.svg)

## Адаптер minuaru для ioBroker
сигнализация для ioBroker и minuvis

## Инструкции
- установить адаптер как обычно
- создать экземпляр минуару
- настройка параметров адаптера

- выберите экземпляр телеграммы и установите имя пользователя, если хотите отправлять сигналы тревоги в телеграмму

![minuaruTelegramНастройки](https://user-images.githubusercontent.com/20790635/151257135-3b8e335f-9510-4531-9452-a982426011ab.png)

- при необходимости скорректировать текст сообщения телеграммы

![minuaruTelegramMessageНастройки](https://user-images.githubusercontent.com/20790635/151257507-b882a3ec-88b3-4c91-bc24-c774db30908f.png)

- при необходимости перевести заголовок столбца таблицы аварийных сигналов

![minuaruAlarmtableSettingsheader](https://user-images.githubusercontent.com/20790635/151255365-4613045d-c868-4e5e-b428-9077b7ae6f99.png)

- изменить цвета строк сообщений и цвет текста при необходимости

![minuaruСигналТаблицаНастройкиЦвет](https://user-images.githubusercontent.com/20790635/151256690-ee9bead9-9277-4438-998b-c04d8c566124.png)

- активировать минуару на желаемых объектах

![активировать Minuaru](https://user-images.githubusercontent.com/20790635/151258456-58e99565-8af5-4200-a1f0-c6c75f4351d2.png)

- активировать Минуару и задать настройки объекта

![setSettingsObjects](https://user-images.githubusercontent.com/20790635/151258700-4d3ca8ca-5df0-4c3d-9638-968b97d788eb.png)

> для пользователей **ioBroker.minuvis** (нужна версия >= 2.3.0):

- активировать страницу будильника и экземпляр minuaru.0 в билдере

![активировать страницу будильника](https://user-images.githubusercontent.com/20790635/151258040-6bb074e3-bd35-45b5-9888-5e826a7d3edc.png)

- номер в шапке minuvis ссылается на алармпейдж

![useNewAlarmPage](https://user-images.githubusercontent.com/20790635/151259455-c8d5a676-027a-4651-813b-211ca2083fd9.png)

- подтверждать тревоги, чтобы уменьшить количество ожидающих тревог

![подтверждение тревог](https://user-images.githubusercontent.com/20790635/151259642-4daec6cf-35fa-4e68-9d92-0000c2d41c25.png)

- использовать объекты html или json для интеграции в другие визуализации

![другиеОбъекты](https://user-images.githubusercontent.com/20790635/151259992-61758c9c-e102-4f38-ae0e-931721d04a17.png)

## Changelog
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

Copyright (c) 2023 svallant <svallant@gmx.eu>

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
