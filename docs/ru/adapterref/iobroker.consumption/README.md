---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.consumption/README.md
title: ioBroker.consumption
hash: PtcwnNZx9+3u0/ZklKIRGknfGy+cH7yKo+iZU8jeTYQ=
---
![Логотип](../../../en/adapterref/iobroker.consumption/admin/consumption.png)

![НПМ-версия](http://img.shields.io/npm/v/iobroker.consumption.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.consumption.svg)
![Статус зависимости](https://img.shields.io/david/bluefox/iobroker.consumption.svg)
![Известные уязвимости](https://snyk.io/test/github/bluefox/ioBroker.consumption/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.consumption.png?downloads=true)

# IoBroker.consumption
##Адаптер потребления для ioBroker
Рассчитывает потребление для определенных датчиков и ресурсов.

Вы можете определить различные ресурсы, такие как вода, отопление, электричество, и провести с их помощью анализ.

Реализованы 4 различных типа анализа:

- План - Фактическое потребление в евро/$ в этом году по сравнению с плановыми значениями и по сравнению с предыдущим годом.
- Кольцевая диаграмма. Сравнение датчиков или ресурсов в виде круговой диаграммы.
- Стек - Ежемесячное потребление каждого датчика и ресурса по сравнению с данными за предыдущий год в виде гистограммы стека.
- Тепловая карта - Почасовое потребление ресурсов в этом году.
- Таблица - Ежемесячное потребление каждого датчика и ресурса по сравнению с предыдущим годом в виде таблицы.

## Требования
Адаптер требует установки базы данных my-SQL или postgres SQL и адаптера ioBroker.sql (он будет установлен автоматически). Он также должен работать с SQLite, но это не рекомендуется из-за производительности.

MS-SQL пока не поддерживается, но при необходимости его можно легко реализовать.

**Адаптер все еще находится на стадии бета-тестирования.**

**Бесплатная версия поддерживает только четыре датчика и только одну станцию.** Для поддержки большего количества датчиков или станций необходима действующая лицензия. Запросите его по адресу info@iobroker.com.

## Использование
У вас есть ресурсы (например, вода, энергия, отопление, газ и т. д.), станции (например, дом, дача, деревенская вилла и т. д.) и датчики.

Датчик – это счетчик, который всегда увеличивает свое значение, как счетчик электроэнергии, который всегда растет.

Вы должны распределить все эти датчики сначала по определенным ресурсам, а затем по станциям.

**На самом деле поддерживается только одна станция!**

После этого вы сможете проанализировать свое потребление по времени и ресурсам по годам.

Вы можете сравнить текущий год с предыдущим и построить некоторый прогноз потребления.

Запланируйте все расходы на текущий год.
![Прогноз](../../../en/adapterref/iobroker.consumption/img/planAll.png)

Распределение затрат по ресурсам.
![Прогноз](../../../en/adapterref/iobroker.consumption/img/pieAll.png)

Распределение потребления по датчикам одного ресурса.
![Прогноз](../../../en/adapterref/iobroker.consumption/img/pieHeating.png)

Распределение потребления по датчикам и месяцам одного ресурса.
![Прогноз](../../../en/adapterref/iobroker.consumption/img/stackBarWater.png)

Тепловая карта потребления одного ресурса за текущий год.
![Прогноз](../../../en/adapterref/iobroker.consumption/img/heatmap.png)

Таблица потребления одного ресурса за текущий год по каждому месяцу.
![Прогноз](../../../en/adapterref/iobroker.consumption/img/tableHeating.png)

### Скрытая функция
Данные датчика можно преобразовать, но формула должна быть линейной.
Вы можете написать формулу на JavaScript, но будьте осторожны, чтобы результат был числом (с плавающей запятой).
Примеры:

- Втч => кВтч: `val / 1000`
- кВтч => Втч: `val * 1000`
- °F => °C: `(val - 32) / 1,8`
- °C => °F: `val * 1,8 + 32`

## Обновление электронных карт (только для разработчиков)
Перейдите на https://echarts.apache.org/en/builder.html. Выберите:

- Диаграмма: гистограмма, линия, круговая диаграмма, тепловая карта,
- Системы координат: сетка
- Компонент: заголовок, легенда, всплывающая подсказка, MarkPoint, MarkArea, VisualMap, Toolbox.
- Прочее: SVG-рендерер, утилиты, сжатие кода.

## Делать
- Цена за каждый возможный датчик
- Изменение цен:
  - убрать все цены по ресурсам,
  - добавить флажок для каждого датчика: своя цена
  - скрыть станцию=>цену ресурса, если у каждого датчика своя цена
  - пишите напрямую в штаты и не сохраняйте цену в объекте

- Тепловая карта
  - Показать по годам
- Графики

- Экспорт данных в формате PDF
- Более одной станции.
- Стиль выбирается в зависимости от темы (единица, начало, конец)

<!-- Заполнитель следующей версии (в начале строки):

### **РАБОТА В ПРОГРЕССЕ** -->
## Разрешенное использование
Одна лицензия дает право на выполнение одной установки Программного обеспечения.
Каждая дополнительная установка Программного обеспечения требует приобретения дополнительной лицензии.

## Changelog
### 1.0.0 (2023-09-13)
* (bluefox) Fixed pie chart

### 0.8.0 (2023-05-12)
* (bluefox) Do not take the price of sensor if it is empty or 0
* (bluefox) Refactoring (async/await)

### 0.7.0 (2023-02-08)
* (bluefox) Added offset and factor to sensors

### 0.6.7 (2023-02-06)
* (bluefox) Added new features to table

### 0.6.0 (2023-01-30)
* (bluefox) Activated ignoring of null values by SQL

### 0.5.0 (2022-11-15)
* (bluefox) Charts were corrected

### 0.4.20 (2022-09-30)
* (bluefox) GUI was improved

### 0.4.18 (2021-07-09)
* (bluefox) The warnings were corrected

### 0.4.17 (2021-01-16)
* (bluefox) Corrected the conversion of values

### 0.4.15 (2021-01-06)
* (bluefox) Corrected forecast calculation based on current second of the month
* (bluefox) Added convert function

### 0.4.14 (2021-01-05)
* (bluefox) Corrected price calculation

### 0.4.13 (2020-12-13)
* (bluefox) Updated the select ID dialog

### 0.4.12 (2020-12-12)
* (bluefox) Added stations editor

### 0.4.11 (2020-12-10)
* (bluefox) Corrected the widget errors

### 0.4.9 (2020-12-06)
* (bluefox) Corrected error with the pie chart

### 0.4.7 (2020-11-16)
* (bluefox) Implemented the combine by unit

### 0.4.3 (2020-09-11)
* (bluefox) Fixed the layout in firefox

### 0.4.1 (2020-06-13)
* (bluefox) Ignore nulls and zeros

### 0.3.4 (2020-06-05)
* (bluefox) Added possibility to define the station

### 0.3.2 (2020-05-29)
* (bluefox) Fixed the units for heat-map

### 0.3.0 (2020-05-18)
* (bluefox) Calculate plan only in euro

### 0.2.7 (2020-05-16)
* (bluefox) Set index for every sensor

### 0.1.6 (2020-05-03)
* (bluefox) Implement planning start from

### 0.1.4 (2020-05-03)
* (bluefox) Make widget compatible with older devices
* (bluefox) Added price for every sensor

### 0.1.2
* (bluefox) finished

### 0.0.2
* (bluefox) initial release

## License

Commercial license.

(c) Copyright 2020-2023 Bluefox <dogafox@gmail.com>, all rights reserved.

This license is a legal agreement between you and ioBroker GmbH (“ioBroker”) for the use of `ioBroker.consumption` adapter (the “Software”).
By downloading of `ioBroker.consumption` adapter you agree to be bound by the terms and conditions of this license.
ioBroker GmbH reserves the right to alter this agreement at any time, for any reason, without notice.