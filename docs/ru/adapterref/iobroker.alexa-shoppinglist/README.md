---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.alexa-shoppinglist/README.md
title: ioBroker.alexa-shoppingList
hash: or7jj4BKgLMQAtb9TD415gPeR8SUoLzBJq0i6Me7pzQ=
---
![Логотип](../../../en/adapterref/iobroker.alexa-shoppinglist/admin/alexa-shoppinglist.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.alexa-shoppinglist.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.alexa-shoppinglist.svg)
![Количество установок](https://iobroker.live/badges/alexa-shoppinglist-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/alexa-shoppinglist-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.alexa-shoppinglist.png?downloads=true)

# IoBroker.alexa-shoppingList
**Тесты: ** ![Тестирование и выпуск](https://github.com/MiRo1310/ioBroker.alexa-shoppinglist/workflows/Test%20and%20Release/badge.svg)

## Адаптер alexa-shoppingList для ioBroker
Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода. Подробнее об отключении отправки сообщений об ошибках см. в документации Sentry-Plugin! Отправка сообщений Sentry используется начиная с версии js-controller 3.0.

Генерирует список покупок из Alexa

Вы также можете использовать другие списки Alexa. Настройте их в панели администратора.
С новым интерфейсом администратора всё станет гораздо проще.

Есть состояние для добавления новых элементов. Просто введите текст и нажмите Enter.
Вы можете удалять активные и неактивные списки.
Вы также можете перемещать только один элемент в обоих направлениях.

Надеюсь вам понравится

**Если вам понравилось, пожалуйста, рассмотрите возможность пожертвования:**

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=7QGL5CXJCUSCE)

## Точки данных
| Имя DP | Тип | Описание |
|---------------------|--------|-----------------------------------------------------------------------------------------------------|
| add_position | Строка | Введите текст для вставки в список |
| delete_activ_list | Кнопка | Очищает активный список и перемещает его в неактивный список |
| delete_inactiv_list | Кнопка | Очищает неактивный список |
| position_to_shift | Номер | Вы можете вставить номер позиции перемещения элемента, затем кнопку to_active_list или to_inactive list |
| list_active | JSON | Список актив в формате JSON |
| list_active_sort | Switch | Вы можете сортировать активный список по имени или по времени вставки |
| list_inactive | JSON | Неактивный список в формате JSON |
| list_inactive_sort | Switch | Вы можете сортировать неактивный список по имени или по времени вставки |
| to_activ_list | Кнопка | Сначала вставьте position_to_shift, а затем нажмите кнопку, чтобы перейти к activ_list |
| to_inactive_list | Кнопка | Сначала вставьте position_to_shift, а затем нажмите кнопку, чтобы перейти к inactiv_list |

| Атрибут в JSON | Описание |
|-------------------|-------------------------------------------|
| имя | Название товара |
| время | Временная метка вставки |
| id | id в адаптере Alexa2 |
| pos | Позиция в списке |
| buttonmove | Кнопка перехода к активному или неактивному списку |
| buttondelete | Кнопка полного удаления элемента |

JSON теперь содержит 2 кнопки для перемещения и удаления элементов.
Для этого необходимо вставить код в редактор VIS в разделе «Скрипт» следующим образом:

```
 /* Alexa Einkaufsliste JSON */

function setOnDblClickCustomShop( myvalue) {
    let id = myvalue.slice(0,myvalue.indexOf(","));
    let val = myvalue.slice(myvalue.indexOf(",")+1, myvalue.length);
    if (val=== "true"){
      vis.setValue(id,true);
      return
    }
    vis.setValue(id,false);
  }
```

![](../../../en/adapterref/iobroker.alexa-shoppinglist/admin/Skript.png)

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- CHORE: #145 Update dependencies

### 1.1.1 (2025-08-13)

- FIX: Error reported by sentry

### 1.1.0 (2025-07-14)

- FEAT: Activate sentry
- Breaking change: minimal supported node.js version is 20.x
- FEAT: Add typescript

### 1.0.3 (2024-12-04)

- CHORE: Migration to ESLint 9 and @iobroker/eslint-config

### 1.0.2 (2024-11-09)

- FIX: #97 Add missing attributes to jsonConfig

### 1.0.1 (2024-10-19)

- FEAT: #95 Responsive Design

### 1.0.0 (2024-08-09)

- Js-controller >=5.0.19 is required
- Breaking change: minimal supported node.js version is 18.x

### 0.1.5 (09.01.2023)

- Error when deleting via the JSON list fixed

### 0.1.4 (25.09.2022)

- Its now possible to delete always the inactive list, when you delete an article from the active list
- You only have to check the checkbox

### 0.1.2 ( 09.04.2022)

- Add Buttons in JSON String

### 0.1.1 ( 20.02.2022)

- Error fixed in jsonConfig

### 0.1.0 ( 20.02.2022)

- First complete working Releases

### 0.0.1

- (MiRo1310) initial release

## License

MIT License

Copyright (c) 2025 MiRo1310 <michael.roling@gmx.de>

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