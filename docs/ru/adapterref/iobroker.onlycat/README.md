---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.onlycat/README.md
title: ioBroker.onlycat
hash: kpSbfAe9D4coZUjPmQ+JhNEK13XZWOy3TnIcs/UfvBI=
---
![Логотип](../../../en/adapterref/iobroker.onlycat/admin/onlycat.png)

![Текущая версия в стабильном репозитории](https://iobroker.live/badges/onlycat-stable.svg)
![версия НПМ](https://img.shields.io/npm/v/iobroker.onlycat.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.onlycat.svg)
![Количество установок](https://iobroker.live/badges/onlycat-installed.svg)
![НПМ](https://nodei.co/npm/iobroker.onlycat.png?downloads=true)

# IoBroker.onlycat
**Тесты:** ![Тест и выпуск](https://github.com/Author/ioBroker.onlycat/workflows/Test%20and%20Release/badge.svg)

## Адаптер для кошачьих дверец OnlyCat® с функцией обнаружения добычи
Адаптер для кошачьих дверец OnlyCat® с функцией обнаружения добычи.

<p align="center"> <img src="/admin/onlycat-flap.webp" /> </p> <p align="center"> <img style="max-width: 300px" src="/admin/screenshot.jpg" /> </p>

## Конфигурация
Добавьте токен устройства на странице конфигурации адаптера.
Токен можно найти в приложении OnlyCat на странице «Учетная запись».

## Описание
Адаптер передает события от кошачьей дверцы OnlyCat, т. е. входы, выходы и обнаружение добычи.

Для адаптера требуется Node 20 или более новая версия.

## Примечания
OnlyCat® является зарегистрированной торговой маркой [VirtualV Trading Ltd.](https://www.onlycat.com/)

## Changelog

### 0.3.0 (2025-06-04)

* (Sickboy78) code improvements from review

### 0.2.0 (2025-05-09)

* (Sickboy78) use pet names from RFID profiles

### 0.1.0 (2025-05-03)

* (Sickboy78) event classification and trigger source schema updated
* (Sickboy78) dependency updates

### 0.0.1 (2025-04-18)

* (Sickboy78) initial release

## License

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

Copyright (c) 2025 Sickboy78 <asmoday_666@gmx.de>