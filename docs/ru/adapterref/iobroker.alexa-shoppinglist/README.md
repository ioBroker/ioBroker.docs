---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.alexa-shoppinglist/README.md
title: ioBroker.alexa-shoppingList
hash: ldEMbB39aTHrj0g0nfj/LqO6422ANlU9mz3N+7pun3A=
---
![Логотип](../../../en/adapterref/iobroker.alexa-shoppinglist/admin/alexa-shoppinglist.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.alexa-shoppinglist.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.alexa-shoppinglist.svg)
![Количество установок](https://iobroker.live/badges/alexa-shoppinglist-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/alexa-shoppinglist-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.alexa-shoppinglist.png?downloads=true)

# IoBroker.alexa-shoppingList
**Тесты:** ![Тестирование и выпуск](https://github.com/MiRo1310/ioBroker.alexa-shoppinglist/workflows/Test%20and%20Release/badge.svg)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Для получения более подробной информации и инструкций по отключению сообщений об ошибках, пожалуйста, обратитесь к разделу [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Использование системы отчетности Sentry начинается с версии js-controller 3.0.

## Адаптер alexa-shoppingList для ioBroker
Генерирует список покупок с помощью Alexa.

Вы также можете использовать другие списки из Alexa — настройте это в параметрах администратора.
Использование нового административного интерфейса значительно упрощает этот процесс.

Есть режим для добавления новых элементов: просто введите текст и нажмите Enter.
Вы можете удалять активные и неактивные списки.
Вы также можете перемещать отдельные элементы в обоих направлениях.

Надеюсь, вам понравится.

**Если вам понравилось, пожалуйста, рассмотрите возможность пожертвования:**

[![[paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=7QGL5CXJCUSCE)

## Точки данных
| Название DP | Тип | Описание |
|---------------------|--------|-----------------------------------------------------------------------------------------------------|
| add_position | String | Введите текст для вставки в список |
| delete_activ_list | Кнопка | Очищает список активных элементов и перемещает его в список неактивных элементов |
| delete_inactiv_list | Кнопка | Очищает список неактивных пользователей |
| position_to_shift | Number | Вы можете ввести номер позиции перемещения элемента, а затем нажать кнопку to_active_list или to_inactive list |
| list_active | JSON | Список активных объектов в формате JSON |
| list_active_sort | Переключатель | Вы можете отсортировать список активных элементов по имени или по времени вставки |
| list_inactive | JSON | Список неактивных пользователей в формате JSON |
| list_inactive_sort | Переключатель | Вы можете отсортировать список неактивных пользователей по имени или по времени добавления |
| to_activ_list | Кнопка | Сначала вставьте position_to_shift, а затем нажмите кнопку, чтобы перейти к activ_list |
| to_inactive_list | Кнопка | Сначала вставьте position_to_shift, а затем нажмите кнопку, чтобы перейти в список неактивных пользователей |

| Атрибут в JSON | Дескриптон |
|-------------------|-------------------------------------------|
| имя | Название товара |
| время | Отметка времени вставки |
| id | id в адаптере Alexa2 |
| поз | Позиция в списке |
| buttonmove | Кнопка для перемещения в список активных или неактивных пользователей |
| buttondelete | Кнопка для полного удаления элемента |

Теперь JSON содержит 2 кнопки для перемещения элементов или удаления.
Для этого вам нужно вставить код в редактор VIS в разделе Skript, вот что:

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
### 1.1.5 (2026-06-04)

- CHORE: Update dependencies

### 1.1.4 (2026-06-04)

- CHORE: Add unit tests
- (copilot) Adapter requires node.js >= 22 now
- CHORE: Update dependencies
- CHORE: #203 Issues reported by repository checker
- CHORE: #193-Repository-Checker

### 1.1.3 (2025-11-29)

- CHORE: Update dependencies
- FIX: Error reported by sentry

### 1.1.2 (2025-09-20)

- CHORE: #145 Update dependencies

### 1.1.1 (2025-08-13)

- FIX: Error reported by sentry

## License

## License

MIT License

Copyright (c) 2021-2026 MiRo1310 <michael.roling@gmx.de>

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