---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.pi-hole/README.md
title: ioBroker.pi-hole ![Logo](admin/pi-hole.png)
hash: zCjt4T3wLEz5S5KXUAHye39RlUmcbDMKsxvc6X1H+v0=
---
# IoBroker.pi-hole ![Логотип](../../../en/adapterref/iobroker.pi-hole/admin/pi-hole.png)

![Количество установок](http://iobroker.live/badges/pi-hole-stable.svg)
![Статус сборки](https://api.travis-ci.org/unltdnetworx/ioBroker.pi-hole.svg?branch=master)
![версия НПМ](https://img.shields.io/npm/v/iobroker.pi-hole.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.pi-hole.svg)
![НПМ](https://nodei.co/npm/iobroker.pi-hole.png?downloads=true)

=================

Этот адаптер предназначен для считывания значений с работающего Pi-Hole и управления устройством (запуск/остановка).

>[!ПРЕДУПРЕЖДЕНИЕ] >Этот адаптер работает только с версиями Pi-Hole < 6.0.0. Для версий Pi-Hole 6 и новее используйте адаптер [ioBroker.pi-hole2](https://github.com/oweitman/ioBroker.pi-hole2).

> >Техническое обслуживание этого адаптера будет ограничено, так как поддержка Pi-Hole 5 и более ранних версий прекращена.

## Шаги
1. Установите адаптер.

2. Заполните поля администратора адаптера. Укажите IP-адрес устройства Pi-hole, API-токен, который можно получить в веб-интерфейсе администратора устройства Pi-hole (Настройки/API/Получить токен), и обязательный интервал обновления значений Pi-hole (статистика обновления в iobroker).

3. Некоторые из объектов представляют собой JSON-таблицы, которые можно использовать внутри vis.

4. Активируйте фильтр, нажав кнопку «activate pi-hole», деактивируйте фильтр, изменив значение параметра «dactivate pi-hole» (0 — навсегда, число — количество секунд).

## Требования
* работающее устройство Pi-Hole

## Благодарности
Создание этого адаптера было бы невозможно без замечательной работы Михаэля Шустера <development@unltd-networx.de>, который разработал предыдущие версии этого адаптера.

<!-- Заполнитель для следующей версии (в начале строки):

### **РАБОТА В ПРОЦЕССЕ** -->
## Пожертвовать
Kaffee потратить/подать кофе <https://paypal.me/unltdnetworx>

## Changelog
### 2.0.0 (2025-12-04)

* (mcm1957) Adapter has been migrated to iobroker-community-adapters organisation
* (mcm1957) Adapter requires node.js >= 20, js-controller >= 6.0.11 and admin >= 7.6.17 now
* (mcm1957) Dependencies have been updated

### 1.3.6

* (unltdnetworx) support for controller v5

### 1.3.4

* (unltdnetworx) disabled "getQueryTypes" for creating lots of spam entries

### 1.3.2

* (unltdnetworx) ready for Admin 5 and NodeJS 16

### 1.3.1

* (unltdnetworx) new adapter testing and security update

## License

MIT License

Copyright (c) 2025 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2023 Michael Schuster

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