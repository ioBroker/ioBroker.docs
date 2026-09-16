---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tedee/README.md
title: ioBroker.tedee
hash: F03aM0c9NqaCKw/6TSmy4t72zm78EHfeTDQiLSdnAHM=
---
![Логотип](../../../en/adapterref/iobroker.tedee/admin/tedee.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.tedee.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.tedee.svg)
![Количество установок](https://iobroker.live/badges/tedee-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/tedee-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.tedee.png?downloads=true)
![Тестирование и выпуск](https://github.com/TA2k/ioBroker.tedee/workflows/Test%20and%20Release/badge.svg)

# ioBroker.tedee

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

## адаптер tedee для ioBroker

Адаптер для замков Tedee

Этот адаптер использует локальный API моста для управления замком типа "теди".

Поддерживаются все замки производства Tedee.

1. Активируйте бета-тестирование в своем профиле пользователя.
2. Включите API в настройках моста.
3. Скопируйте IP-адрес и токен из настроек экземпляра.

![Логотип](../../../en/adapterref/iobroker.tedee/admin/tedee_api.png)

Адаптер получает все обновления статуса немедленно через веб-хуки. Интервал, указанный в настройках, является лишь резервным вариантом для непрерывного обновления.

Текущее состояние блокировки: tedee.0.id.state

- 0 Некалиброванный
- 1\. Калибровка
- 2 разблокировано
- 3 Полузаблокированные
- 4 Разблокировка
- 5 Запирающих
- 6 Заблокировано
- 7 Вытащено
- 8 Тяга
- 9 Неизвестный
- 18 Обновление

## Использование

Вы можете управлять замком Tedee через tedee.0.id.remote.

- блокировка/разблокировка
- потянуть
- разблокировать разблокировать

Разблокировать режимы:

- 0 - (или параметр не задан) - Нормальный режим. В закрытом положении: только разблокировка или разблокировка с автоматическим открыванием, если включена. В открытом положении: ничего.
- 2 - Сила. Приложите усилие до тех пор, пока замок не упрется в сопротивление.
- 3 - Без автоматического вытягивания. В закрытом положении: только разблокировка без автоматического вытягивания. В открытом положении: ничего.
- 4\. Разблокировка или потяните. Из закрытого положения: только разблокировка или разблокировка с автоматическим потягиванием, если эта функция включена. Из открытого положения: потяните.

## Отказ от ответственности

Tedee — товарный знак компании Tedee. Я никоим образом не являюсь представителем или аффилированным лицом компании Tedee, а также любых связанных с ней дочерних компаний, логотипов или товарных знаков.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.3.2 (2024-04-10)

- add retry when request fails

### 0.3.1 (2023-12-16)

- (TA2k) initial release

## License

MIT License

Copyright (c) 2024-2025 TA2k <tombox2020@gmail.com>

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