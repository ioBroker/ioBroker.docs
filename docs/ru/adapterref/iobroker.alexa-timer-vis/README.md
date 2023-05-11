---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.alexa-timer-vis/README.md
title: ioBroker.alexa-таймер-вис
hash: GjBb1bcIYSraH79B262OXDrT4ai8JSWjNqr8uICCI3k=
---
![Логотип](../../../en/adapterref/iobroker.alexa-timer-vis/admin/alexa-timer-vis.png)

![версия NPM](https://img.shields.io/npm/v/iobroker.alexa-timer-vis.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.alexa-timer-vis.svg)
![Количество установок](https://iobroker.live/badges/alexa-timer-vis-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/alexa-timer-vis-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.alexa-timer-vis.png?downloads=true)

# IoBroker.alexa-timer-vis
**Тесты:** ![Тестируйте и выпускайте](https://github.com/MiRo1310/ioBroker.alexa-timer-vis/workflows/Test%20and%20Release/badge.svg)

## Адаптер alexa-timer-vis для ioBroker
Вывод таймера Alexa для отображения в окне

**Если вам это нравится, рассмотрите пожертвование:**

[![PayPal] (https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=7QGL5CXJCUSCE)

### Это пример моего виза
![](../../../en/adapterref/iobroker.alexa-timer-vis/admin/timer.png)

## Функциональность
Таймер или несколько с помощью голосового ввода создается через Alexa, это оценивается адаптером и записывается в состояния, чтобы сделать их видимыми в Vis. Таким образом, у вас будет лучший обзор, если у вас одновременно активны несколько таймеров.

- ---- Требуется адаптер Alexa2 ----
- Виджет Vis еще не интегрирован
- У каждого таймера есть кнопка, чтобы остановить его. Останавливает таймер в Alexa и в адаптере
- С Alexa можно создавать неограниченное количество таймеров с помощью голосовой команды.
- При запуске адаптера создаются 4 папки со всеми состояниями.
- Дополнительные папки будут созданы, как только будет создан 5-й и более таймеров с помощью голосового ввода Alexa.
- Он работает с немецким вводом

### Добавление таймера ( Примеры )
- Алекса, Таймер 5 минут
- Алекса, картофель фри Таймер 9 минут
- Алекса, поставь таймер на 1 час 30 минут.
- Алекса, поставь таймер на 2 часа
- Алекса, Таймер на 120 минут
- Алекса, Таймер 9 минут Спагетти

### Удаление таймера ( Примеры )
- Алекса, удали все таймеры
- Alexa, удалить картофель фри Таймер
- Alexa, удалить 5 минут Таймер

### Если у вас есть какие-либо предложения по улучшению или добавлению других функций, не стесняйтесь обращаться к нам

## Changelog

### 0.1.15 (22.09.2022)

- Include creation time to avoid creating duplicate timers

### 0.1.14 (17.07.2022)

- Added debouncing in the adapter configuration

### 0.0.13 (06.03.2022)

- Delete of Timers with the same value, fixed

### 0.1.12 (15.02.2022)

- Delete of Timer fixed

### 0.1.11 (12.02.2022)

- Delete of Timer with same Inputvalue, fixed
- User can set the Intervall in admin

### 0.1.9 (30.1.2022)

- Bugfix

### 0.1.8 (28.01.2022)

- Bugfix
- Button added to stop the Timer

### 0.1.7 (22.06.2022)

- New State, "Input Device"

### 0.1.6 (17.01.2022)

- numbers from 1-9 are always displayed as two digits, 1 => 01
- When you update to this or a newer Version, please delete the timer folders or delete the whole adapter, otherwise errors will occur

### 0.1.5 (08.01.2022)

- New keywords added

### 0.1.4 (05.01.2022)

- States will be reset on adapter unload
- Bugfix

### 0.1.3 (02.01.2022)

- Start and EndTime added

### 0.1.2 (31.12.2021)

- Bugfix (A double created Intervall, fixed)

### 0.1.1 (29.12.2021)

- Adaptation to the English language (experimental)
- Anpassung an die Englische Sprache (experimentell)

### 0.1.0 (28.12.021)

- Fixed bug when deleting intervals and timeouts after shutdown
- Fehler beim Löschen von Intervallen und Timeouts nach dem Shutdown, behoben

### 0.0.4 (27.12.2021)

- Adaptation to various options for entering a timer
- Anpassung an verschiedener Möglichkeiten der Eingabe eines Timers

### 0.0.3 (26.12.2021)

- (Michael Roling) Bugfix

### 0.0.2 (26.12.2021)

- (Michael Roling) Bugfix

### 0.0.1 (25.12.2021)

- (Michael Roling) initial release

## License

Copyright (c) 2021-2023 Michael Roling <michael.roling@gmx.de>

MIT License

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