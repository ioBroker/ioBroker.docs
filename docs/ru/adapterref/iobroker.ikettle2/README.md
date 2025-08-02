---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ikettle2/README.md
title: ioBroker.ikettle2
hash: cMO+RpaDdkvLmHNr84/MJCvLPK2UqsoTCBY2kHS/22s=
---
![Логотип](../../../en/adapterref/iobroker.ikettle2/admin/ikettle2.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.ikettle2.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.ikettle2.svg)
![Количество установок (последнее)](https://iobroker.live/badges/ikettle2-installed.svg)
![Количество установок (стабильно)](https://iobroker.live/badges/ikettle2-stable.svg)
![Статус зависимости](https://img.shields.io/david/jey-cee/iobroker.ikettle2.svg)
![НПМ](https://nodei.co/npm/iobroker.ikettle2.png?downloads=true)

# IoBroker.ikettle2
**Тесты:** ![Тест и выпуск](https://github.com/jey-cee/ioBroker.ikettle2/workflows/Test%20and%20Release/badge.svg)

##адаптер ikettle2 для ioBroker
Управляйте своим Smarter iKettle 2.0 с помощью ioBroker.

## Присоединяйтесь к серверу Discord, чтобы обсудить все, что касается ioBroker!
<a href="https://discord.gg/HwUCwsH"><img src="https://discordapp.com/api/guilds/743167951875604501/widget.png?style=banner2" width="25%"></a>

Если вам понравилась моя работа, пожалуйста, не стесняйтесь сделать личное пожертвование (это личная ссылка для пожертвований для Jey Cee, никакого отношения к проекту ioBroker не имеет!) [![Пожертвовать](https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.wled/master/admin/button.png)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=95YZN2LR59Q64&source=url)

---

## Руководство
### Описание объекта **on** - Включает чайник. Перед этим необходимо установить set_temperature.
**on_formula** - Включает чайник, нагревает и поддерживает температуру_формулы в течение времени_подогрева.
температура_формулы и время_подогрева должны быть установлены заранее.

**калибровать** - начать базовую калибровку.

**on_plate** — указывает, находится ли чайник на подставке.

**set_temperature** - Целевая температура для нагрева воды.

**formula_temperature** - Целевая температура после нагрева воды до заданной температуры.

**температура_воды** - Фактическая температура воды.

**water_level** - Фактическое количество воды в чайнике. Примечание: точность не очень высокая и может быть полностью ложной, поэтому проверяйте наличие воды в чайнике глазами.

**warming_time** — время, в течение которого чайник будет поддерживать температуру воды, заданную формулой, перед выключением.
Примечание: 0 = не используется, минимальное время — 5 минут, максимальное — 30 минут.

**get_preset** - Считывание предустановленных значений для ручного управления (без приложения) с чайника.

**set_preset** - Установите предустановленные значения на чайнике для ручного управления (без приложения).
Formula_temperature, температура и warming_time в папке preset должны быть установлены заранее.

---

### Калибровка Снимите чайник с базы, затем установите калибровку объекта на значение true.
После звукового сигнала от базы вы можете вернуть чайник на базу и использовать его.
---

## Changelog

### **WORK IN PROGRESS**
* (Jey Cee) Correct size of ip input on xl displays

### 1.0.2
* (Jey Cee) Add watchdog for connection to prevent adapter freeze
* (Jey Cee) Migrate config to JSON Config
* (Jey Cee) Update dependencies 
* (Jey Cee) Fix issues found by adapter checker

### 1.0.1
* (Jey Cee) fixes for Beta release

### 1.0.0
* (Jey Cee) initial release

## License
MIT License

Copyright (c) 2021-2025 Jey Cee <jey-cee@live.com>

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