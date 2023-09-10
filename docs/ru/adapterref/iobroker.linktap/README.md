---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.linktap/README.md
title: ioBroker.LinkTap
hash: 3fxXNSl3Q46kwluuppMYZNwqFjy+3v/cFiVl/7t3+lg=
---
![Логотип](../../../en/adapterref/iobroker.linktap/admin/Logo_small.png)

![НПМ-версия](http://img.shields.io/npm/v/iobroker.linktap.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.linktap.svg)
![НПМ](https://nodei.co/npm/iobroker.linktap.png?downloads=true)

# IoBroker.LinkTap
## IoBroker.linktap
Контролируйте полив вашего сада с помощью беспроводного таймера подачи воды LinkTap. Производитель: https://www.link-tap.com/

## Монтаж
Используйте Node.js 16 или выше.

## Настройки
Создайте ключ API по адресу https://www.link-tap.com/#!/api-for-developers, используя свои учетные данные LinkTap.

Пожалуйста, введите имя пользователя и ключ API в конфигурации.
Все подключенные шлюзы и ответвители будут восстановлены после запуска адаптера. Производитель разрешает опрос всех шлюзов и устройств каждые 5 минут. Адаптер выполняет извлечение автоматически каждый час или при каждом перезапуске адаптера.

Получение статуса полива можно настроить индивидуально в конфигурации по минутам. Веб-сервису LinkTap может потребоваться до одной минуты, чтобы предоставить обновленную информацию о поливе.

Все функции орошения, предоставляемые API, реализованы.

Важно: перед использованием необходимо настроить в приложении нужные расписания. Затем их можно включить/отключить через адаптер. Для этого необходимо дополнительно установить соответствующие состояния роли «Аргумент в».

## Changelog

### 0.2.3
* (Smart-Gang) Added support for new devices (ValveLinker and multiple-outlet water timer) with 18-digit IDs.

### 0.2.1
* (Smart-Gang) Updated CI testing & dependencies.

### 0.2.0
* (Smart-Gang) Changed types of state 'signal' to number and of button 'StartEcoInstantMode' to boolean.

### 0.1.9
* (Smart-Gang) Community suggestion: The trigger data points (buttons) now have the status set to false by default.

### 0.1.8
* (Smart-Gang) Retrieve historical data (API update from manufacturer) and optimize data point settings.

### 0.1.7
* (Smart-Gang) First public release

## License
MIT License

Copyright (c) 2021 Author <gangrulez@gmail.com>

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