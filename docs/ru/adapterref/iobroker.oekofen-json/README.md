---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.oekofen-json/README.md
title: ioBroker.oekofen-json
hash: qdFWDJPQY42LrI0UN4dsoIp5T/bhUlZo0IZyJ2RAL+8=
---
![Логотип](../../../en/adapterref/iobroker.oekofen-json/admin/oekofen-json.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.oekofen-json.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.oekofen-json.svg)
![Количество установок](https://iobroker.live/badges/oekofen-json-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/oekofen-json-stable.svg)
![Статус зависимости](https://img.shields.io/david/chaozmc/iobroker.oekofen-json.svg)
![НПМ](https://nodei.co/npm/iobroker.oekofen-json.png?downloads=true)

# IoBroker.oekofen-json
**Тесты:** ![Тестирование и выпуск](https://github.com/chaozmc/ioBroker.oekofen-json/workflows/Test%20and%20Release/badge.svg)

## Адаптер oekofen-json для ioBroker
### Описание
Этот адаптер подключает обогреватель OekoFEN с новым сенсорным интерфейсом (также называемым [Пеллетроник Сенсорный](https://www.oekofen.com/en-gb/pelletronic-touch/)) к ioBroker. Поскольку OekoFEN реализовал JSON-интерфейс поэтапно и без общедоступной документации, он должен работать как минимум с версии 3.10d и новее.
Поскольку существует множество комбинаций обогревателей, солнечных модулей, многослойных хранилищ, двигателей Sterling и т. д., этот адаптер пытается прочитать все доступные точки данных из интерфейса и создаёт объекты «на лету» при запуске.

Точки данных, доступные только для чтения, создаются как таковые, поскольку их имена начинаются с префикса L_. Адаптер также преобразует масштаб числа в соответствии с информацией, предоставленной интерфейсом (атрибут factor). Например, нагреватель обрабатывает температуру в формате XXX с коэффициентом 0,1, и адаптер преобразует её в XX.X при чтении и обратно в XXX при записи.

### Установка
После установки нужно просто ввести

* IP,
* TCP-порт,
* так называемый пароль
* и интервал

при котором адаптер пытается получить обновления.

Адаптер сохраняет состояние подключения, даже если нет постоянного соединения. Если устройство отправляет ошибку или адаптер не может связаться с контроллером OekoFEN, он устанавливает состояние подключения в значение «ложь». Например, это может произойти, если контроллеру поступает слишком много запросов, и он отвечает кодом HTTP 401. В обычных условиях ограничение скорости контроллера не должно быть достигнуто (2,5 секунды между запросами).

## Кредиты
Создание этого адаптера было бы невозможно без выдающейся работы Маркуса Файлера (chaozmc) <https://github.com/chaozmc>, создавшего предыдущие версии этого адаптера.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 2.0.0-alpha.9 (2025-10-13)
* (mcm1957) Adapter has been migrated to iobroker-community-adapters organisation
* (mcm1957) Adapter requires node.js >= 20, js-controller >= 6.0.11 and admin >= 7.6.17 now
* (mcm1957) Dependencies have been updated

### 1.0.5 (2023-09-23)
* (chaozmc) set min node version to 18.x (merge pull request #23)

### 1.0.4 (2023-09-22)
* (chaozmc) Removed Node 16.x from Test-and-release (fix Issue #19)
* (chaozmc) updated dependencies
* (chaozmc) updated protobufjs and google-gax
* (chaozmc) updated word-wrap

### 1.0.3 (2023-05-09)
* (chaozmc) Bump version

### 1.0.2 (2023-05-09)
* (chaozmc) Added missing translations
* (chaozmc) Updated Copyright Year
* (chaozmc) Added .releaseconfig.json for release-script
* (chaozmc) changed github workflow config

### **0.0.3**
* (chaozmc) code cleanup, trigger for update & rescan

### **0.0.2**
* (chaozmc) first working release, fixed 0-value updates

### **0.0.1**
* (chaozmc) initial build phase, much try and error

## License
MIT License

Copyright (c) 2025 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2023 chaozmc <chaozmc@is-jo.org>

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