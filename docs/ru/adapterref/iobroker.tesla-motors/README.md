---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tesla-motors/README.md
title: ioBroker.tesla-motors
hash: o04OO9LDv6ceGFyCmuMYEXkwyoaesyhuZY70xjz9wE4=
---
![Логотип](../../../en/adapterref/iobroker.tesla-motors/admin/tesla-motors.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.tesla-motors.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.tesla-motors.svg)
![Количество установок (последнее)](https://iobroker.live/badges/tesla-motors-installed.svg)
![Количество установок (стабильно)](https://iobroker.live/badges/tesla-motors-stable.svg)
![Статус зависимости](https://img.shields.io/david/iobroker-community-adapters/iobroker.tesla-motors.svg)
![НПМ](https://nodei.co/npm/iobroker.tesla-motors.png?downloads=true)

# IoBroker.tesla-motors
** Тесты: ** ![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.tesla-motors/workflows/Test%20and%20Release/badge.svg)

## Адаптер Tesla для ioBroker
Все модели Tesla Modelle и Powerwalls от Tesla App angezeigt and aktualisiert.

** Дистанционное управление Tesla и Powerwall без ущерба для двигателя ** tesla-motors.0.id.remote

** Loginablauf: **

- In den Instanzoptionen den Auth Link klicken.
- Die Logindaten eingeben und gegebenenfalls Captcha / reCaptcha и MFA eingeben.
- Страница не найдена. Найдите полный URL-адрес в браузере, скопированном и в Instanzoptionen einfügen und auf Speichen und Schließen klicken.
- Die ersten Daten kommen unter Umständen erst nach der ersten Fahrt

** Описание поля **

- передний водительский df
- др водитель сзади
- пф пассажирский передний
- пр пассажирский задний
- фут передний багажник
- задний багажник пт

[Коды опций Erklärung](https://tesla-api.timdorr.com/vehicle/optioncodes)

## Fragen und Diskussionen:
https://forum.iobroker.net/topic/47203/test-tesla-motors-v1-0-0

## Changelog

### 1.0.2
* (iobroker-community-adapters) ALLE DATENPUNKTE SIND NEU, Vis muss angepasst werden. Neue Version mit neuen Zuständen für Tesla und Powerwalls.

## License
MIT License

Copyright (c) 2021 iobroker-community

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