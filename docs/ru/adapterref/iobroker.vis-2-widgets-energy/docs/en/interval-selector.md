---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-energy/README.md":{"title":{"en":"Vis 2 Energy widgets"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/README.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/README.md":{"title":{"en":"Energy widgets for vis-2"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/README.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/distribution.md":{"title":{"en":"Distribution"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/distribution.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md":{"title":{"en":"Consumption"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption-comparison.md":{"title":{"en":"Consumption comparison"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption-comparison.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md":{"title":{"en":"Interval selector"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/self-sufficiency.md":{"title":{"en":"Self-sufficiency"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/self-sufficiency.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/battery.md":{"title":{"en":"Battery storage"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/battery.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/energy-costs.md":{"title":{"en":"Energy costs"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/energy-costs.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/dynamic-price.md":{"title":{"en":"Dynamic electricity price"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/dynamic-price.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md
title: селектор интервала
hash: ROweqoKUUPXy2LVm7ZDmx9aQeJ7JbTGOASdGkS9Hbzc=
---
# селектор интервала

![Выбор времени](../../../../../en/adapterref/iobroker.vis-2-widgets-energy/img/timeSelector.png)

День / неделя / месяц / год, две стрелки для переключения между периодами и кнопка **«Сейчас»** , которая возвращает к текущему периоду. За этим селектором следуют другие виджеты.

## Как другие виджеты его находят

Выберите этот виджет в атрибуте _«Виджет для выбора временного интервала»_ виджета [«Потребление»](/#/docs/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md) или [«Затраты на энергию»](/#/docs/adapterref/iobroker.vis-2-widgets-energy/docs/en/energy-costs.md) . За одним и тем же селектором может следовать несколько виджетов, и селектор может располагаться в любом месте одного и того же представления.

Технически селектор публикует себя через DOM, и потребители подписываются на него. Поскольку порядок монтирования виджетов не фиксирован, потребитель продолжает искать селектор, пока не найдет его, и повторно подписывается, когда селектор перемещается или создается заново. Для этого ничего не нужно настраивать.

Кроме того, независимо от этого, селектор записывает точку в **представление** : каждый виджет представления, который не имеет собственного селектора, также следует за ним.

## Конфигурация

### Общий

| Поле                         | Значение                                                                                   |
| ---------------------------- | ------------------------------------------------------------------------------------------ |
| Без рамки / Имя              | Карточка и заголовок                                                                       |
| Идентификатор начала времени | Необязательно. Здесь указывается выбранная начальная точка периода в виде временной метки. |
| Временной интервал OID       | Необязательно. Выбранная длина указывается здесь: `day`, `week`, `month` или `year`.        |

Два идентификатора объекта предназначены для скриптов и для других представлений: как только один из них задан, селектор считывает и записывает эту точку данных вместо того, чтобы сохранять значение для себя, а скрипт может переместить всю панель мониторинга, записав в нее данные.

### Появление

| Поле                                                         | Значение                                                                         |
| ------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| Предложение действует в течение дня / недели / месяца / года | Какие кнопки есть у селектора. Если ни одна не выбрана, отображаются все четыре. |
| Скрыть кнопку «Сейчас»                                       | Скрывает кнопку, которая возвращает нас к текущему периоду.                      |
| Формат даты                                                  | `24.09.2026`, `09/24/2026`, `2026-09-24` или язык пользователя                   |

## Недели начинаются в понедельник.

Неделя длится с понедельника по воскресенье. Воскресенье относится к неделе, которая заканчивается, а не к той, которая начинается на следующий день.

## Рецепт: один селектор для всей панели инструментов.

1. Разместите селектор в верхней части окна, _без рамки_ , высота около 60 пикселей.
2. Отключите _годовой_ прогноз, если он вам не интересен.
3. На каждом из приведенных ниже графиков выберите в _виджете селектор для выбора временного интервала_ .

## Поиск неисправностей

- **Диаграмма не следует за селектором.** Проверьте _виджет для выбора временного интервала_ на диаграмме. Диаграмма, не указавшая селектор, следует за периодом отображения — который также задается селектором, но только для того представления, в котором он находится.
- **Стрелка справа неактивна (серая).** Вы находитесь в текущем периоде; после него ничего нет.
- **Селектор автоматически возвращается в исходное положение.** При переключении периода всегда происходит переход к текущему, поэтому «неделя», выбранная при просмотре данных за предыдущий день, не попадает в пустое окно.