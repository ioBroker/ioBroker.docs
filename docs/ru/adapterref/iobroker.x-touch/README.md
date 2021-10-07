---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.x-touch/README.md
title: ioBroker.x-touch
hash: texWQD4NDKZ038tIOr12wwqEYfOQW69jJmBAaJ88c7k=
---
![Логотип](../../../en/adapterref/iobroker.x-touch/admin/x-touch.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.x-touch.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.x-touch.svg)
![Количество установок (последнее)](http://iobroker.live/badges/x-touch-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/x-touch-stable.svg)
![Статус зависимости](https://img.shields.io/david/Bannsaenger/iobroker.x-touch.svg)
![Известные уязвимости](https://snyk.io/test/github/Bannsaenger/ioBroker.x-touch/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.x-touch.png?downloads=true)

# IoBroker.x-touch
## Адаптер x-touch для ioBroker
Общайтесь с панелью управления Behringer X-Touch (контроллером DAW)

## Делать
- Добавьте кодировщики и их светодиоды -> готово, слева - sync_global и проверяет изменения в базе данных.
- Добавить отображение тайм-кода -> готово
- Добавлена функциональность переключателей каналов банка и фейдера -> готово, требуется дополнительное тестирование
- Добавить функцию syncGlobal

## Окно сообщения
Есть две принятые команды:

* `export` экспортирует фактические значения, хранящиеся в состояниях групп устройств, в папку пользовательских данных x-touch.
* `import` импортирует самый молодой файл из папки userdata. Вы также можете указать путь, файл и / или номер группы устройств для восстановления. Если путь не указан, будет использоваться каталог пользовательских данных.

## Changelog

### 0.0.1
* (Bannsaenger) initial release

### 0.0.2
* (Bannsaenger) prepared for checkin to iobroker.latest

### 0.1.0
* (Bannsaenger) introduced channel and page switching

### 0.2.0
* (Bannsaenger) introduced encoders

### 0.2.1
* (Bannsaenger) changed the way to send data. Added sendDelay

### 0.2.2
* (Bannsaenger) fixed fader handling and data distribution to the device group

### 0.2.3
* (Bannsaenger) fixed setting of display inverted

### 0.2.4
* (Bannsaenger) fixed disabling of encoder display

### 0.2.5
* (Bannsaenger) fixed send back of button and fader values. Now only the affected device group members will be updated

### 0.3.0
* (Bannsaenger) added the timecode display

### 0.4.0
* (Bannsaenger) added the ability to export the actual state values via a message and reimport the states again

## License
MIT License

Copyright (c) 2021 Bannsaenger <bannsaenger@gmx.de>

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