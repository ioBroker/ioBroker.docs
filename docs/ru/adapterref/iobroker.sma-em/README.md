---
BADGE-Number of Installations: http://iobroker.live/badges/sma-em-installed.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.sma-em.svg
BADGE-Stable version: http://iobroker.live/badges/sma-em-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.sma-em.svg
BADGE-NPM: https://nodei.co/npm/iobroker.sma-em.png?downloads=true
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sma-em/README.md
title: Документация по адаптеру счетчика энергии SMA
hash: JYOczVv4WHkgpzr0qUX+rTgxvi+M7KfhoBpM/5kJfAo=
---
# Документация по адаптеру счетчика энергии SMA
## Общая информация
Адаптер счетчика энергии SMA получает многоадресные дейтаграммы от счетчика энергии или Sunny Home Manager. Они отправляют пакеты данных со своими данными измерений в сеть каждую секунду или чаще. Интервал передачи 200 мс, 600 мс или 1000 мс можно установить в Sunny Portal.

## Страница администрирования / администратора
![Адаптер_admin_config](img/adminpage1-en.png) ![Адаптер_admin_config2](../../../en/adapterref/iobroker.sma-em/img/adminpage2-en.png)

- Вкладка Настройки многоадресной рассылки
  - IP-адрес многоадресной рассылки: настройка по умолчанию, предварительно заданная SMA, — это IP-адрес 239.12.255.254.
  - Порт многоадресной рассылки: настройка по умолчанию, предопределенная SMA, — это порт UDP 9522.

- Параметры вкладки
  - Расширенный режим: предоставляет более подробную информацию, такую как реактивная мощность, полная мощность, cosph, напряжения, сила тока и т. д. По умолчанию этот параметр отключен.
  - Детали L1 - L3: Эти точки выбора можно использовать для отображения деталей каждой фазы.
  - Интервал обновления в реальном времени: здесь устанавливается интервал обновления для данных в реальном времени, таких как мгновенная мощность или частота сети. Это служит для снижения нагрузки на систему. Пример: при скорости передачи пакетов данных 5/с (интервал передачи 200 мс) все значения суммируются в течение интервала обновления в реальном времени в одну секунду, и только в конце интервала выводится среднее значение или медиана частоты и фаза обновляется в соответствующей точке данных ioBroker.
  - Интервал обновления не в реальном времени: здесь устанавливается интервал обновления для данных не в реальном времени, таких как показания счетчика. Здесь последнее полученное значение обновляется в соответствующей точке данных ioBroker только в конце интервала.

## Структура папок/объекты
![Adapter_overview](../../../en/adapterref/iobroker.sma-em/img/overview-en.png)

После установки и запуска адаптера создается структура папок, показанная на картинке. Все данные счетчика энергии находятся в корневой папке. Если они были сконфигурированы, значения отдельных фаз находятся в подпапках L1-L3.
Если в сети есть несколько счетчиков энергии или Sunny Home Manager, папки объектов для каждого устройства создаются в одном и том же экземпляре sma-em.

## Объяснение идентификаторов объектов
Буквы p, q и s заимствованы из электротехники и обозначают:

- Р - Активная мощность
- Q - Реактивная мощность
- S - Полная мощность

- Слово «уважение» здесь означает «потребление». (мощность, полученная из сети)
- Слово «излишек» здесь означает «подпитка». (мощность подается в сеть)
- Слово «счетчик» здесь означает «счетчик энергии».

Отсюда составляются имена объектов, например.

- pregard - активная мощность, полученная из сети
- psurplus - активная мощность, отдаваемая в сеть
- pregardcounter - электросчетчик активной мощности полученной из сети
- qregard - реактивная мощность, полученная из сети
- ...

## Changelog
### 0.7.0 (2023-03-14)

- (pdbjjens) New: Configurable data point update intervals to reduce system load
- (pdbjjens) New: Use JSON config

### 0.6.6 (2023-02-28)  2023 maintenance release

- (pdbjjens) Updated dependencies
- (pdbjjens) New: Use adapter-dev instead of gulp translate

### 0.6.5 (2022-02-19)

- Updated dependencies
- Compatibility check for js-controller 4.0
- Prevent onUnload warnings

### 0.6.4 (2021-08-19)

- (TGuybrush) Bug fixes
- Prevent warnings regarding non-existent objects upon adapter instance creation and start-up under js-controller 3.2.x
- Improved check of SMA Energy Meter multicast messages to prevent ghost devices and warnings regarding unknown OBIS values.

### 0.6.3 (2021-03-04)

- (TGuybrush) The adapter binds now to all external IPv4 addresses.

## License

The MIT License (MIT)

Copyright (c) 2023 IoBroker-Community

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