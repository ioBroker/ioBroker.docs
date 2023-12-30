---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tedee/README.md
title: ioBroker.tedee
hash: QIl9g1Oofm6MEZ/uxLhspd4PZDpqRB1eWB6V8eyd6K0=
---
![Логотип](../../../en/adapterref/iobroker.tedee/admin/tedee.png)

![НПМ-версия](https://img.shields.io/npm/v/iobroker.tedee.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.tedee.svg)
![Количество установок](https://iobroker.live/badges/tedee-installed.svg)
![Текущая версия в стабильном репозитории.](https://iobroker.live/badges/tedee-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.tedee.png?downloads=true)

# IoBroker.tedee
**Тесты:** ![Тестирование и выпуск](https://github.com/TA2k/ioBroker.tedee/workflows/Test%20and%20Release/badge.svg)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Для получения более подробной информации и информации о том, как отключить отчеты об ошибках, см. [Документация плагина Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются начиная с js-controller 3.0.

##адаптер tedee для ioBroker
Адаптер для замков Tedee

Этот адаптер использует API локального моста для управления блокировкой tedee.

Поддерживаются все устройства Lock от Tedee.

1. Активируйте бета-тестирование в своем профиле пользователя.
2. Включите API в настройках моста.
3. Скопируйте IP и токен в настройках инстанса.

![Логотип](../../../en/adapterref/iobroker.tedee/admin/tedee_api.png)

Адаптер немедленно получает все обновления статуса через веб-перехватчики. Интервал в настройках является лишь резервным для постоянного обновления.

Текущее состояние блокировки: tedee.0.id.state.

- 0 Некалиброванный
- 1 Калибровка
- 2 разблокировано
- 3 полузакрытых
- 4 разблокировки
- 5 блокировок
- 6 заблокировано
- 7 вытащил
- 8 вытягиваний
- 9 Неизвестно
- 18 Обновление

## Использование
Вы можете управлять блокировкой tedee через tedee.0.id.remote.

- блокировка для блокировки/разблокировки
- тянуть, чтобы тянуть
- разблокировать разблокировать

Режимы разблокировки:

- 0 - (или параметр не установлен) - Нормально. Из закрытого положения: только разблокировка или разблокировка автоматическим вытягиванием, если эта функция включена. В открытом положении: ничего.
- 2 - Сила. Принудительное движение до тех пор, пока замок не встретит сопротивление.
- 3 - Без тяги. Из закрытого положения: только разблокировка без автоматического вытягивания. В открытом положении: ничего.
- 4 - Разблокируйте или потяните. Из закрытого положения: только разблокировка или разблокировка автоматическим вытягиванием, если эта функция включена. В открытом положении: потянуть.

## Отказ от ответственности
Tedee — торговая марка компании tedee. Я никоим образом не одобрен и не связан с tedee или любыми связанными с ней дочерними компаниями, логотипами или товарными знаками.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.3.0 (2023-12-16)

- (TA2k) initial release

## License

MIT License

Copyright (c) 2023 TA2k <tombox2020@gmail.com>

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