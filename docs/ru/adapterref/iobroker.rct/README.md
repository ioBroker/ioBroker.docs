---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.rct/README.md
title: ioBroker.rct
hash: AlKRmYasfBycJy5YJg3NhoAqPLgCf85oGa8eJHY2Sv8=
---
![Версия NPM](https://img.shields.io/npm/v/iobroker.rct.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.rct?label=npm%20downloads&style=flat-square)
![node-lts](https://img.shields.io/node/v-lts/iobroker.rct?style=flat-square)
![Статус зависимостей Libraries.io для последней версии](https://img.shields.io/librariesio/release/npm/iobroker.rct?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/aruttkamp/iobroker.rct?style=flat-square)
![размер репозитория GitHub](https://img.shields.io/github/repo-size/aruttkamp/iobroker.rct?logo=github&style=flat-square)
![активность коммитов на GitHub](https://img.shields.io/github/commit-activity/m/aruttkamp/iobroker.rct?logo=github&style=flat-square)
![Последний коммит на GitHub](https://img.shields.io/github/last-commit/aruttkamp/iobroker.rct?logo=github&style=flat-square)
![Проблемы на GitHub](https://img.shields.io/github/issues/aruttkamp/iobroker.rct?logo=github&style=flat-square)
![Стабильный](http://iobroker.live/badges/rct-stable.svg)
![Установлено](https://iobroker.live/badges/rct-installed.svg)
![НПМ](https://nodei.co/npm/iobroker.rct.png?downloads=true)

[![Логотип](https://github.com/aruttkamp/ioBroker.rct/blob/main/admin/rct.png)](https://www.rct-power.com/de)

# ioBroker.rct

## Версии

## Адаптер RCT для ioBroker

Обратите внимание, что это частный проект, и я (Андреас Рутткамп) никак не связан с компанией RCT. Прочитайте значения параметров преобразователя мощности фотоэлектрических элементов RCT Power.

## ЗАМЕЧАНИЯ

**ВАЖНО: Инвертор RCT не может различать запросы данных от разных клиентов.** Открытие приложения «RCT Power App» на смартфоне/планшете или запуск других адаптеров, отправляющих запросы инвертору (например, EVCC), всегда приводит к тому, что адаптер получает незапрошенные данные (это видно в режиме отладки). Эти данные будут отброшены, и будут обрабатываться только запрошенные данные.

В поле "Элементы RCT" можно выбрать, какие данные будут считываться с преобразователя мощности. Если здесь ничего не указано, будут использоваться значения по умолчанию:

"battery.bat\_status,battery.soc,battery.soc\_target,battery.soc\_target\_high,battery.soc\_target\_low,dc\_conv.dc\_conv\_struct\[0].p\_dc\_lp,dc\_conv.dc\_conv\_struct\[1].p\_dc\_lp,fault\[0].flt,fault\[1].flt,fault\[2].flt,fault\[3].flt,g\_syn c.p\_ac\_grid\_sum\_lp,g\_sync.p\_ac\_load\_sum\_lp,g\_sync.p\_ac\_sum\_lp,g\_sync.p\_acc\_lp,g\_sync.u\_sg\_avg\[0],g\_sync.u\_sg\_avg\[1],io\_board.s0\_external\_power,power\_mng.is\_heiphoss,power\_mng.state,power\_mng.u\_acc\_mix\_lp,prim\_sm.island\_flag"

Другие элементы можно найти в коде (файл "rct/rc\_core2.js"). Поскольку это описание не является самодостаточным, используйте его на свой страх и риск!

Объект "battery.bat\_status" указывает состояние подключенной батареи:

- 0 -> зарядка/разрядка (нормальный режим работы)
- 1 -> холостой ход (нет подключения CAN, инвертор -> батарея)
- 3 -> подключение (инвертор -> батарея)
- 5 -> синхронизация (инвертор -> батарея)
- 8 -> калибровка - фаза зарядки (0% --> 100%)
- 1024 -> калибровка - фаза разряда (xx% --> 0%)
- 2048 -> балансировка

Объект "prim\_sm.state" указывает состояние инвертора.

- 0 -> 'Режим ожидания'
- 1 -> 'Инициализация'
- 2 -> 'Режим ожидания'
- 3 -> 'Эффективность (состояние отладки для целей разработки)'
- 4 -> 'Проверка изоляции'
- 5 -> «Проверка на острове (решение, куда ехать — подключенный к сети или на остров)»
- 6 -> «Проверка мощности (решение о наличии или отсутствии достаточной энергии для запуска)»
- 7 -> 'Симметрия (выравнивание звена постоянного тока)'
- 8 -> 'Проверка реле'
- 9 -> 'Сетевой пассивный источник питания (инвертор получает питание от сети без синхронизации моста)'
- 10 -> 'Подготовка пассивных элементов батареи'
- 11 -> 'Пассальный аккумулятор (автономный режим работы)'
- 12 -> 'Тест оборудования'
- 13 -> 'Подача электроэнергии в сеть'

## Известные проблемы

Никто

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 1.2.29 (2026-08-10)
- (Andreas Ruttkamp) Update dependencies

### 1.2.28 (2026-06-18)
Improve Logging Consistency and Debug Handling
#320

### 1.2.27 (2026-05-19)
- (copilot) Adapter requires node.js >= 22 now
- (Andreas Ruttkamp) dependencies updated
- (Andreas Ruttkamp) minimum version for admin now 7.6.20

### 1.2.26 (2026-02-22)
* (Andreas Ruttkamp) correct handling for parameter without "." ( grid_offset / android_description ) [#262](https://github.com/aruttkamp/ioBroker.rct/issues/262)

### 1.2.25 (2025-10-16)
* (Andreas Ruttkamp) repro checker issues resolved
* (Andreas Ruttkamp) npm trusted publishing integrated

[Older changelogs can be found there](https://github.com/aruttkamp/ioBroker.rct/blob/main/CHANGELOG_OLD.md)

## License
MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Copyright (c) 2025-2026 Andreas Ruttkamp ioBroker.rct@ruttkamp.com