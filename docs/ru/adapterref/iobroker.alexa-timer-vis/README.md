---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.alexa-timer-vis/README.md
title: ioBroker.alexa-timer-vis
hash: 4Ij+03Go4FeVDjHwOfuQyBO8lIuVcDAz5t/G/aneARI=
---
![Логотип](../../../en/adapterref/iobroker.alexa-timer-vis/admin/alexa-timer-vis.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.alexa-timer-vis.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.alexa-timer-vis.svg)
![Количество установок](https://iobroker.live/badges/alexa-timer-vis-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/alexa-timer-vis-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.alexa-timer-vis.png?downloads=true)

# IoBroker.alexa-timer-vis
![Тестирование и выпуск](https://github.com/MiRo1310/ioBroker.alexa-timer-vis/workflows/Test%20and%20Release/badge.svg)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Для получения более подробной информации и инструкций по отключению сообщений об ошибках, пожалуйста, обратитесь к разделу [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Использование системы отчетности Sentry начинается с версии js-controller 3.0.

## Адаптер alexa-timer-vis для ioBroker
Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде. Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. в документации по плагину Sentry! Система отчетности Sentry используется начиная с js-controller 3.0.

Вывести таймер Alexa на экран

**Если вам понравилось, пожалуйста, рассмотрите возможность пожертвования:**

[![[paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=7QGL5CXJCUSCE)

### Это пример моей визуализации
![img.png](../../../en/adapterref/iobroker.alexa-timer-vis/admin/timer1.png)

## Функциональность
С помощью голосового ввода через Alexa создается один или несколько таймеров, которые затем обрабатываются адаптером и записываются в состояния, чтобы отобразить их в Vis. Таким образом, вы получаете лучший обзор, если одновременно активно несколько таймеров.

- ---- Требуется адаптер Alexa2 ----
— Виджет Vis пока не интегрирован.
— У каждого таймера есть кнопка для его остановки. Остановка таймера происходит в Alexa и в адаптере.
— С помощью голосовых команд Alexa можно создавать неограниченное количество таймеров.
— При запуске адаптера будут созданы 4 папки со всеми состояниями.
— Дополнительные папки будут созданы, как только появится пятая, а также будут созданы новые таймеры с помощью голосового ввода Alexa.

### Добавление таймера (Примеры)
- Алекса, таймер на 5 минут
- Алекса, картошка фри. Таймер 9 минут.
— Алекса, установи таймер на 1 час 30 минут.
— Алекса, установи таймер на 2 часа.
- Алекса, таймер на 120 минут
- Алекса, таймер 9 минут Спагетти

### Удаление таймера (Примеры)
— Алекса, удали все таймеры
- Алекса, удали картошку фри. Таймер
— Алекса, удали 5-минутный таймер

### Если у вас есть предложения по улучшению чего-либо или добавлению других функций, пожалуйста, свяжитесь с нами.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 3.0.3 (2026-06-12)

- FIX: #295 Extend timer
- CHORE: Update dependencies

### 3.0.2 (2026-05-30)

- CHORE: Repository checker
- FIX: #288 Stop timer

### 3.0.1 (2026-05-23)

- FIX: Update connection state to true when initializing AlexaTimer

### 3.0.0 (2026-05-23)

- (copilot) Adapter requires node.js >= 22 now
- CHORE: Update dependencies
- FIX: #270 Errors has no existing object 
- FEAT: Complete refactored with new logic, it should work with all languages which are supported by Alexa2 adapter
- Chore: Alexa2 adapter version >= 3.28.1

### 2.2.2 (2025-12-12)

- FIX: Errors reported by sentry

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

Copyright (c) 2021-2026 Michael Roling <michael.roling@gmx.de>

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