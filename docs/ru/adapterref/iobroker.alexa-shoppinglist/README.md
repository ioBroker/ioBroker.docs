---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.alexa-shoppinglist/README.md
title: ioBroker.alexa-список покупок
hash: r5nDQXWStgnd8CQzQtUDbON4qebgQ6aQ6/Nol4aY2Yk=
---
![Логотип](../../../en/adapterref/iobroker.alexa-shoppinglist/admin/alexa-shoppinglist.png)

![версия NPM](https://img.shields.io/npm/v/iobroker.alexa-shoppinglist.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.alexa-shoppinglist.svg)
![Количество установок](https://iobroker.live/badges/alexa-shoppinglist-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/alexa-shoppinglist-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.alexa-shoppinglist.png?downloads=true)

# IoBroker.alexa-список покупок
**Тесты:** ![Тестируйте и выпускайте](https://github.com/MiRo1310/ioBroker.alexa-shoppinglist/workflows/Test%20and%20Release/badge.svg)

## Адаптер alexa-shoppinglist для ioBroker
Генерирует список покупок из Alexa

Вы также можете использовать другие списки Alexa. Настройте его в админке.
Когда вы используете новый пользовательский интерфейс администратора, вам будет намного проще.

Существует состояние для вставки новых элементов. Просто напишите текст и введите.
Вы можете удалить активные и неактивные списки.
Вы также можете перемещать только один элемент в обоих направлениях.

надеюсь вам нравится

## Точки данных
| Имя DP | Тип | Описание |
| ------------------- | ------ | --------------------------------------------------------------------------------------------------- |
| add_position | Строка | Введите текст для вставки в список |
| удалить_актив_список | Кнопка | Очищает активный список и перемещает его в неактивный список |
| удалить_inactiv_list | Кнопка | Очищает неактивный список |
| position_to_shift | Номер | Вы можете вставить номер позиции перемещения элемента, чем кнопка to_active_list или to_inactive list |
| список_активный | JSON | Активный список в формате JSON |
| list_active_sort | Переключатель | Вы можете отсортировать активный список по имени или по времени вставки |
| список_неактивный | JSON | Неактивный список в формате JSON |
| list_inactive_sort | Переключатель | Вы можете отсортировать неактивный список по имени или по времени вставки |
| to_activ_list | Кнопка | Сначала вставьте position_to_shift, а затем нажмите кнопку, чтобы перейти к activ_list |
| to_inactive_list | Кнопка | Сначала вставьте position_to_shift, а затем нажмите кнопку, чтобы перейти к inactiv_list |

| Атрибут в формате JSON | Описание |
| ----------------- | ----------------------------------------- |
| имя | Название товара |
| время | Отметка времени вставки |
| идентификатор | id в адаптере Alexa2 |
| поз | Позиция в списке |
| кнопка двигаться | Кнопка для перехода к активному или неактивному списку |
| кнопкаудалить | Кнопка для полного удаления элемента |

JSON теперь содержит 2 кнопки для перемещения или удаления элементов.
Для этого вам нужно вставить код в VIS Editor под Skript, вставьте это:

```
 /* Alexa Einkaufsliste JSON */

function setOnDblClickCustomShop( myvalue) {
    let id = myvalue.slice(0,myvalue.indexOf(","));
    let val = myvalue.slice(myvalue.indexOf(",")+1, myvalue.length);
    if (val){
      vis.setValue(id,val);
    }
  }
```

![](../../../en/adapterref/iobroker.alexa-shoppinglist/admin/Skript.png)

## Changelog

### 0.1.5 (09.01.2023)

- Error when deleting via the JSON list fixed

### 0.1.4 (25.09.2022)

- Its now possible to delete always the Inactiv list, when you delete an Articel from the Activ list
- You only have to check the Checkbox

### 0.1.2 ( 09.04.2022)

- Add Buttons in JSON String

### 0.1.1 ( 20.02.2022)

- Error fixed in jsonConfig

### 0.1.0 ( 20.02.2022)

- First complete working Release

### 0.0.1

- (MiRo1310) initial release

## License

MIT License

Copyright (c) 2023 MiRo1310 <michael.roling@gmx.de>

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