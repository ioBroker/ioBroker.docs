---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.alias-manager/README.md
title: ioBroker.alias-менеджер
hash: aUc414CIMut6wnYAOryCvRI4FFgqYw9itq8ND7gTWEk=
---
![Логотип](../../../en/adapterref/iobroker.alias-manager/admin/alias-manager.png)

![версия НПМ](http://img.shields.io/npm/v/iobroker.alias-manager.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.alias-manager.svg)
![Количество установок (последнее)](http://iobroker.live/badges/alias-manager-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/alias-manager-stable.svg)
![Статус зависимости](https://img.shields.io/david/sbormann/iobroker.alias-manager.svg)
![Известные уязвимости](https://snyk.io/test/github/sbormann/ioBroker.alias-manager/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.alias-manager.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/sbormann/ioBroker.alias-manager/master.svg)

# IoBroker.alias-менеджер
## Адаптер alias-manager для ioBroker
Управляет и создает псевдонимы.

## Кредиты
Этот адаптер был бы невозможен без большой работы @sbormann (https://github.com/sbormann), который разработал предыдущие версии этого адаптера.

## Как сообщать о проблемах и запрашивать новые функции
В идеале, пожалуйста, используйте для этого GitHub issues, а лучший метод достигается путем установки адаптера в режим Debug log (Instances -> Expert mode -> Column Log level). Затем извлеките файл журнала с диска через подкаталог ioBroker 'log', **не** из Admin, что приведет к сокращению строк.

## Краткое введение
### Управление псевдонимами
![Скриншот](../../../en/adapterref/iobroker.alias-manager/img/manual_screenshot_1.png)

* (1) Нажмите «УПРАВЛЕНИЕ ПСЕВДОНИМАМИ»
* (2) Чтобы создать новый псевдоним, нажмите «НОВЫЙ ПСЕВДОНИМ» или
* (3) Выберите существующий псевдоним для редактирования

![Скриншот](../../../en/adapterref/iobroker.alias-manager/img/manual_screenshot_2b.png)

* (1) Затем вы найдете область с общими настройками этого псевдонима, такими как имя или общая роль.
* (2) Ниже вы найдете список всех точек данных псевдонима.
* (3) Вы можете добавить alias-datapoints в этот список, либо добавив пустой, либо выбрав существующий iobroker-datapoint и скопировав его настройки в новый alias-datapoint
* (4) Вы можете удалить точки данных, нажав на значок мусора.
* Каждая точка данных имеет несколько полей для настройки:
* В серой области вы можете задать имя или удалить точку данных.
* В синей области вы можете настроить роль, тип и - опционально - блок
* В зеленой области вы можете задать необязательные минимум и максимум, а также определить, должна ли точка данных быть доступна только для чтения (common.write отключена) и можно ли получить доступ к ее значению (common.read включена — что будет правильной настройкой для большинства случаев)
* В красной зоне вы можете:
* (5) Настройте исходную точку данных ioBroker, с которой связана эта точка данных alias-datapoint. Обе (исходная точка данных и точка данных alias-datapoint) будут синхронизированы.
* (6) Кроме того, вы можете настроить функции преобразования для чтения и записи.
* Пример: если вы установите ``val / 10`` как «Read-Function», значение aias-datapoint всегда будет составлять 10 процентов от исходной точки данных.
* В большинстве случаев вам затем захочется настроить ``val * 10`` как «Write-Function», чтобы также сохранить это соотношение при записи в alias-datapoint.
* Подробнее об этом читайте в документации ioBroker о псевдонимах по адресу https://www.iobroker.net/#en/documentation/dev/aliases.md

![Скриншот](../../../en/adapterref/iobroker.alias-manager/img/manual_screenshot_3.png)

* (1) При нажатии на «КОПИРОВАТЬ ПСЕВДОНИМ» для копирования или
* (2) при выборе «ПЕРЕИМЕНОВАТЬ ПСЕВДОНИМ» для переименования псевдонима откроется следующее диалоговое поле:

![Скриншот](../../../en/adapterref/iobroker.alias-manager/img/manual_screenshot_4.png) \ Здесь вы можете:

* (1) Установите новый идентификатор и
* (2) Установите новое общее имя для псевдонима
* (3) Нажав «ДОБАВИТЬ ЗАМЕНУ», вы можете добавить строки в следующий список, где вы можете:
* (4) Введите строку, которая будет найдена и заменена (5) этой строкой
* С помощью этой функции вы можете быстро изменить исходные точки данных ioBroker, с которыми связаны ваши псевдонимы точек данных.
	* Пример:
* У вас есть вентилятор с несколькими точками данных, такими как ``SET``, ``ERROR`` и ``UNREACH``
* Эти псевдонимы-точки данных связаны с исходными точками данных, такими как ``hm-rpc.0.JEQ0698034.1.STATE``, ``hm-rpc.0.JEQ0698034.0.ERROR`` и ``hm-rpc.0.JEQ0698034.0.UNREACH``
* Теперь, если ваше устройство сломалось и его необходимо заменить на новое, его серийный номер изменится, например, на ASDF1234
* Чтобы обновить все ссылки во всех ваших псевдонимах-точках данных за один раз, вы можете выполнить поиск по ``hm-rpc.0.JEQ0698034`` и заменить его на ``hm-rpc.0.ASDF1234``
* Это также полезно при создании новых псевдонимов, похожих на старый. Просто скопируйте псевдоним, установите новый идентификатор и имя и используйте функцию замены, чтобы настроить связанные точки данных

![Скриншот](../../../en/adapterref/iobroker.alias-manager/img/manual_screenshot_5.png)

* После изменения настроек вы можете:
* (1) Сохраните все измененные псевдонимы-точки данных за один раз, нажав «СОХРАНИТЬ ВСЕ ИЗМЕНЕНИЯ» или
* (2) Сохраните только одну точку данных, нажав «СОХРАНИТЬ ИЗМЕНЕНИЯ»
* (3) Наконец, вы можете удалить весь псевдоним, нажав «УДАЛИТЬ ПСЕВДОНИМ».

### Автоматическое создание псевдонима
![Скриншот](../../../en/adapterref/iobroker.alias-manager/img/manual_screenshot_6b.png)

* (1) Нажмите «АВТОСОЗДАТЬ ПСЕВДОНИМ»

![Скриншот](../../../en/adapterref/iobroker.alias-manager/img/manual_screenshot_7b.png)

* (1) Сначала выберите идентификатор устройства из дерева объектов ioBroker.
* (2) Затем нажмите «ПОПРОБУЙТЕ СОЗДАТЬ ПСЕВДОНИМ С ЭТОГО УСТРОЙСТВА»
* (3) После этого вы найдете определенные настройки для псевдонима и
* (4) Список всех точек данных выбранного устройства
* Все автоматически распознанные точки данных будут проверены (будут сохранены только проверенные строки)
* При автоматическом распознавании точка данных будет иметь установленный «Идентификатор назначения». Это будет соответствующая точка данных псевдонима (исходная точка данных будет связана с этим новым псевдонимом-точкой данных). Функция autocreate-function пытается сопоставить стандартизированные идентификаторы точек данных в зависимости от типа распознанного устройства. Однако вы можете изменить настройки по своему усмотрению, но каждый «Идентификатор назначения» должен быть уникальным.
* И наконец, вы можете ввести имя для целевого псевдонима-точки данных
* Все НЕ автоматически распознанные точки данных отображаются в списке неотмеченными. Вы можете вручную настроить параметры и активировать флажок.
* (5) Вы также можете вручную добавить другие точки данных в этот список или очистить весь список.
* (6) Затем вы можете сохранить новый псевдоним со всеми отмеченными(!) точками данных (неотмеченные точки данных будут отброшены)
* После этого вы будете автоматически переведены на вкладку «УПРАВЛЕНИЕ ПСЕВДОНИМАМИ», где будет открыт новый псевдоним, для настройки его параметров по мере необходимости.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 2.0.0 (2024-10-20)
- (mcm1957) Adapter has been moved to iobroker-community-adapter organisation.
- (mcm1957) Adapter requires js-controller 5, admin 6 and node.js 20 now.
- (mcm1957) Dependencies have been updated.

### 1.2.6 (2022-03-02)
* (sbormann) Updated dependencies.
* (sbormann) Fixed saving of common.custom.

### 1.2.5 (2022-03-02)
* (sbormann) Added All and None Buttons to select Datapoint while autocreating alias.
* (sbormann) Some GUI-Enhancements and fixes for dark mode.

### 1.2.4 (2021-08-25)
* (sbormann) Fixed autocreate not working after renaming destination id.

### 1.2.3 (2021-06-05)
* (sbormann) Fixed autocreate not working after deleting or renaming alias.

## License
MIT License

Copyright (c) 2024 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2022 Sebastian Bormann <sebastian@bormann.net>

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