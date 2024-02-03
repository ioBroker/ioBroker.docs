---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.elgato-key-light/README.md
title: ioBroker.elgato-key-light
hash: 1sJXajz4QdmDmjNSwZtWe8Vq1C3LNTao4eYtTfiUE4Q=
---
![Логотип](../../../en/adapterref/iobroker.elgato-key-light/admin/elgato-key-light.png)

![НПМ-версия](https://img.shields.io/npm/v/iobroker.elgato-key-light.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.elgato-key-light.svg)
![Количество установок](https://iobroker.live/badges/elgato-key-light-installed.svg)
![Текущая версия в стабильном репозитории.](https://iobroker.live/badges/elgato-key-light-stable.svg)

# IoBroker.elgato-key-light
**Тесты:** ![Тестирование и выпуск](https://github.com/xXBJXx/ioBroker.elgato-key-light/workflows/Test%20and%20Release/badge.svg)

## Адаптер elgato-key-light для ioBroker
### ОТКАЗ ОТ ОТВЕТСТВЕННОСТИ
Все названия и логотипы продуктов и компаний являются товарными знаками™ или зарегистрированными® товарными знаками соответствующих владельцев. Их использование не подразумевает какой-либо принадлежности или одобрения со стороны них или связанных с ними аффилированных лиц! Этот личный проект реализуется в развлекательных целях и не преследует никаких деловых целей. **Elgato** является товарным знаком **Corsair GmbH**.

### Часовой
**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.**\ Дополнительные сведения и информацию о том, как отключить отчеты об ошибках, см.
[Документация плагина Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются начиная с версии js-controller 3.0.

### Кредиты
Этот адаптер был бы невозможен без великой работы @xXBJXx (https://github.com/xXBJXx), который создал этот адаптер и, надеюсь, будет поддерживать его в будущем.

### Описание
Этот адаптер позволяет управлять [Ключевые светильники Эльгато](https://www.elgato.com/de/key-light) через ioBroker.\ Адаптер поддерживает следующие функции:

* Включение/выключение питания.
* Яркость ⇨ (доступно для всех основных источников света).
* Цветовая температура ⇨ (доступно только с [Elgato Key Light](https://www.elgato.com/de/key-light), [Elgato Key Light Air](https://www.elgato.com/de/ ключ-свет-воздух),

[Кольцевой светильник Эльгато](https://www.elgato.com/de/ring-light) и [Elgato Key Light мини](https://www.elgato.com/de/key-light-mini) доступны)

* Цвет ⇨ (доступно только с [Elgato Light Strip](https://www.elgato.com/de/light-strip))

### Пользовательский интерфейс адаптера
Классического пользовательского интерфейса адаптера в экземплярах не существует.\ ![Пользовательский интерфейс адаптера](admin/media/instances.png) ![Пользовательский интерфейс адаптера](../../../en/adapterref/iobroker.elgato-key-light/admin/media/elgato-key-light_UI.png)

Что можно сделать в пользовательском интерфейсе?

* №1 задает интервал опроса адаптера (по умолчанию: 60 секунд).

  после изменения интервала адаптер необходимо перезагрузить, это делается с помощью кнопки Сохранить.

* №2 добавить к адаптеру новое устройство.
* № 3 устанавливает цветовую температуру для всех основных источников света (от 2900К до 7000К).
* № 4 устанавливает яркость для всех основных источников света (от 0% до 100%).
* № 5 устанавливает цвет световых полосок\

  ![Пользовательский интерфейс адаптера](../../../en/adapterref/iobroker.elgato-key-light/admin/media/ColorPicker.png)

* № 6 включает и выключает свет

**при изменении №3, №4 и №5 изменение будет выполнено через 1,5 секунды.**

### Предупреждение
**Не обращайтесь к точкам данных слишком часто, иначе устройства будут недоступны в течение нескольких секунд.**

### Точки данных
Точки данных создаются автоматически при обнаружении нового устройства.

#### Точки данных для всех основных источников света/световых полос
![Пользовательский интерфейс адаптера](../../../en/adapterref/iobroker.elgato-key-light/admin/media/ObjectsMain.png)\ Точки данных делятся на:

* **info** ⇨ Информация об устройстве\.

  ![Пользовательский интерфейс адаптера](../../../en/adapterref/iobroker.elgato-key-light/admin/media/objects_Info.png)

* **свет** ⇨ Точки данных для управления устройством. Здесь есть два разных типа точек данных:
  * для управления яркостью и цветовой температурой.

    ![Пользовательский интерфейс адаптера](../../../en/adapterref/iobroker.elgato-key-light/admin/media/objects_light_colorTemp.png)

  * для управления цветом

    ![Пользовательский интерфейс адаптера](../../../en/adapterref/iobroker.elgato-key-light/admin/media/objects_light_color.png)

* **Настройки** ⇨ точки данных для информации из настроек устройства

  ![Пользовательский интерфейс адаптера](../../../en/adapterref/iobroker.elgato-key-light/admin/media/objects_settings.png)

### Примечания
* Данные по цвету доступны только для световых полос.
* Данные о цветовой температуре доступны только для основных источников света.
* Данные по яркости доступны для всех основных светильников и световых полос.
* Сцены из Light Strips не поддерживаются. Так как они недоступны через API.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.0.1 (2024-01-18)
* (mcm1957) Writing states now requires ack flag to be false.
* (mcm1957) Small adaptions to solve review issues have been applied.

### 1.0.0 (2024-01-18)
* (mcm1957) Adapter requires node.js 18 or newer now
* (mcm1957) Adapter has been moved into iobroker-community-adapters area
* (mcm1957) Dependencies have been updated

### 0.2.0 (2023-02-26)
* (xXBJXx) updated dependencies
* (xXBJXx) Updating the UI to the new functions of the iobroker-react library

### 0.1.0 (2023-02-06)
* (xXBJXx) removed the Bonjour search, because it did not work properly
* (xXBJXx) Adding a delete function for devices
* (xXBJXx) Dependency updates
* (xXBJXx) feature request [#2](https://github.com/xXBJXx/ioBroker.elgato-key-light/issues/2) added

### 0.0.3 (2023-01-22)
* (xXBJXx) changed all images to png

## License
MIT License

Copyright (c) 2024 iobroker-community-adapters <mcm57@gmx.at>
Copyright (c) 2023 xXBJXx <issi.dev.iobroker@gmail.com>

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