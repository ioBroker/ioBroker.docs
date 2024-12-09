---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.alexa-timer-vis/README.md
title: ioBroker.alexa-таймер-vis
hash: +phsT6UnSqZaibOikL3Ty7tE2efk+cNrV3aD/DNSxG8=
---
![Логотип](../../../en/adapterref/iobroker.alexa-timer-vis/admin/alexa-timer-vis.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.alexa-timer-vis.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.alexa-timer-vis.svg)
![Количество установок](https://iobroker.live/badges/alexa-timer-vis-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/alexa-timer-vis-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.alexa-timer-vis.png?downloads=true)

# IoBroker.alexa-таймер-vis
**Тесты: ** ![Тест и выпуск](https://github.com/MiRo1310/ioBroker.alexa-timer-vis/workflows/Test%20and%20Release/badge.svg)

## Alexa-timer-vis адаптер для ioBroker
Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам. Для получения более подробной информации и информации о том, как отключить отчет об ошибках, см. документацию Sentry-Plugin! Отчеты Sentry используются, начиная с js-controller 3.0.

Вывод таймера Alexa для отображения в vis

**Если вам понравилось, пожалуйста, рассмотрите возможность пожертвования:**

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=7QGL5CXJCUSCE)

### Это пример моего виз
![](../../../en/adapterref/iobroker.alexa-timer-vis/admin/timer.png)

## Функциональность
Таймер или несколько таймеров, заданных голосовым вводом, создаются с помощью Alexa, оцениваются адаптером и записываются в состояния, чтобы сделать их видимыми в Vis. Таким образом, у вас будет лучший обзор, если у вас одновременно активны несколько таймеров.

- ---- Необходим адаптер Alexa2 ----
- Виджет Vis пока не интегрирован
- У каждого таймера есть кнопка, чтобы остановить его. Останавливает таймер в Alexa и в адаптере
- С помощью голосовой команды Alexa можно создавать неограниченное количество таймеров.
- При запуске адаптера создаются 4 папки со всеми состояниями.
- Дополнительные папки будут созданы, как только будет создано 5-й и более таймеров с помощью голосового ввода Alexa.
- Работает с немецким вводом

### Добавление таймера ( Примеры )
- Алекса, Таймер 5 минут
- Алекса, фри Таймер 9 минут
- Алекса, поставь таймер на 1 час 30 минут.
- Алекса, поставь таймер на 2 часа.
- Alexa, Таймер на 120 минут
- Alexa, Таймер 9 минут Спагетти

### Удаление таймера ( Примеры )
- Алекса, удали все таймеры
- Алекса, удали таймер картошки фри
- Алекса, удали 5-минутный таймер

### Если у вас есть предложения по улучшению чего-либо или добавлению других функций, свяжитесь с нами.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 2.0.8 (2024-12-04)

- CHORE: Update dependencies
- CHORE: Migration to ESLint 9 and @iobroker/eslint-config

### 2.0.7 (2024-11-19)

- FIX: #157 Add size attribute xl for text in jsonConfig
- FIX: #156 Error in decomposeInputValue

### 2.0.6 (2024-10-19)

- FEAT: #151 Responsive Design

### 2.0.5 (2024-09-26)

- FIX: #142 Timeout error
- FIX: #137 Reset timer name
- FEAT: Add json state

### 2.0.4 (2024-09-18)

- FIX: #132 Second timer button reset deletes timer one

### 2.0.3 (2024-09-13)

- FIX: #133 Timer names are not correct
- FIX: #134 All timer alive at start

### 2.0.2 (2024-09-12)

- FIX: #130 Sting_2 remains empty

### 2.0.1 (2024-09-10)

- FIX: #128 Timer creating error

### 2.0.0 (2024-09-08)

- FIX: #119 Error "has no existing object" on first start
- FEAT: Use Typescript
- FEAT: #118 get name from activeTimerList
- FIX: #117 createDevice is deprecated

### 1.0.0 (2024-08-09)

- Js-controller >=5.0.19 is required

### 0.3.0 (2023-12-23)

- FIX: #82 Delete Timer by Button
- FIX: #74 Start time
- FEAT: #71 Name of Echo in data tree
- FEAT: #75 Percent from 0% to 100%
- Breaking change: minimal supported node.js version is 16.x
- FEAT: #58 Another String Variation

### 0.2.0 (2023-07-27)

- create Timer with Alexa2 TextCommand, fixed
- lengthen and shorten timers

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
- When you update to this or a newer Version, please delete the timer folders or delete the whole adapter, otherwise
  errors will occur

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

- Bugfix

### 0.0.2 (26.12.2021)

- Bugfix

### 0.0.1 (25.12.2021)

- initial release

## License

Copyright (c) 2021-2024 Michael Roling <michael.roling@gmx.de>

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