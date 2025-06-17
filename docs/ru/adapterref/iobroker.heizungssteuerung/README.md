---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.heizungssteuerung/README.md
title: ioBroker.управление.
hash: Pc2vT2/oU2hjpLvmV5g1O4ShZPkhlOcRqfm3IE1UwKk=
---
# IoBroker.управление.
![Логотип](../../../en/adapterref/iobroker.heizungssteuerung/admin/heizungssteuerung.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.heizungssteuerung.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.heizungssteuerung.svg)
![Статус зависимости](https://img.shields.io/david/jbeenenga/iobroker.heizungssteuerung.svg)
![Известные уязвимости](https://snyk.io/test/github/jbeenenga/ioBroker.heizungssteuerung/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.heizungssteuerung.png?downloads=true)

**Тесты:** [![Тестирование и выпуск](https://github.com/jbeenenga/ioBroker.heizungssteuerung/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/jbeenenga/ioBroker.heizungssteuerung/actions/workflows/test-and-release.yml)

## Адаптер ioBroker для управления отоплением
Этот адаптер обеспечивает комплексное управление системой отопления для установок ioBroker. Он поддерживает как режимы нагрева, так и охлаждения с расширенными функциями, такими как режим усиления, функция паузы и планирование температуры на основе времени.

[🇩🇪 Немецкая версия](README_DE.md)

## Функции
- **Поддержка двух режимов**: переключение между режимами нагрева и охлаждения
- **Режим усиления**: временное увеличение мощности обогрева/охлаждения для отдельных комнат.
- **Режим паузы**: временное отключение отопления/охлаждения для определенных комнат.
- **Планирование по времени**: определение периодов температуры для разного времени и дней.
- **Управление по помещениям**: индивидуальное управление температурой в каждой комнате
- **Контроль влажности**: прекращение охлаждения при достижении пороговых значений влажности
- **Режим отсутствия**: установите пониженную температуру во время праздников или длительного отсутствия.
- **Переопределение температуры**: ручное изменение целевых температур при необходимости.

## Установка
### Через интерфейс администратора ioBroker
1. Откройте интерфейс администратора ioBroker.
2. Перейдите на вкладку «Адаптеры»
3. Найдите «heizungssteuerung».
4. Нажмите «Установить».

### Через npm
```bash
npm install iobroker.heizungssteuerung
```

## Краткое руководство пользователя
### 1. Структура комнаты настройки
Перед настройкой адаптера необходимо настроить структуру комнаты в ioBroker:

1. Перейдите в **Объекты → Перечисления → Комнаты**
2. Создайте комнаты для каждой зоны, которую вы хотите контролировать (например, «Гостиная», «Спальня», «Кухня»).
3. Добавьте в каждую комнату следующие устройства:
- Датчики температуры
- Приводы отопления/охлаждения (клапаны, переключатели и т. д.)
- Датчики влажности (опционально)

### 2. Настройка функций
Настройте необходимые функции в **Объекты → Перечисления → Функции**:

- **Температура**: Добавить все состояния датчика температуры
- **Влажность**: добавьте состояния датчика влажности (необязательно)
- **Двигатель**: Добавить все состояния привода отопления/охлаждения

### 3. Конфигурация адаптера
#### Основные настройки
- **Режим работы**: выберите «Обогрев» или «Охлаждение»
- **Интервал проверки**: как часто адаптер проверяет температуру (в минутах)
- **Температура по умолчанию**: Резервная температура, если не совпадает ни один период
- **Температурный гистерезис**: пороговое значение разницы температур для включения/выключения нагрева/охлаждения

#### Периоды, основанные на времени
Настройте графики температуры для каждой комнаты:

1. Выберите комнату из выпадающего списка.
2. Установите время начала и окончания.
3. Определите целевую температуру
4. Выберите дни недели
5. Укажите, относится ли этот период к режиму отопления или охлаждения.

#### Расширенные настройки
- **Длительность паузы**: время автоматического сброса для режима паузы (минуты)
- **Длительность режима Boost**: время автоматического сброса для режима Boost (минуты)
- **Порог влажности**: максимальная влажность, при которой охлаждение прекращается
- **Сброс при запуске**: перезапись всех температур значениями по умолчанию при запуске адаптера

## Использование
### Действия ручного управления
Адаптер создает объекты действий в `heizungssteuerung.0.Actions`:

#### Глобальные действия (все комнаты)
- **absenceUntil**: Установить режим отсутствия до определенной даты/времени
- Формат: `dd.MM.yyyy HH:mm` (например, "01.01.2024 14:00")
- Эффект: игнорирует менструации и использует температуру по умолчанию.
- **пауза**: Временно приостановить весь нагрев/охлаждение
- **boost**: активировать режим усиления для всех комнат

#### Действия, специфичные для комнаты
В каждой комнате вы найдете:

- **пауза**: приостановка отопления/охлаждения только для этой комнаты
- **boost**: активировать режим усиления только для этой комнаты
- **targetTemp**: временно переопределить целевую температуру

### Примеры конфигураций
#### Основной график отопления
```
Room: Living Room
Time: 06:00 - 22:00
Days: Monday to Friday
Temperature: 21°C
Mode: Heating
```

#### Расписание на выходные
```
Room: Living Room
Time: 08:00 - 24:00
Days: Saturday, Sunday
Temperature: 22°C
Mode: Heating
```

#### Ночная температура
```
Room: Bedroom
Time: 22:00 - 06:00
Days: All days
Temperature: 18°C
Mode: Heating
```

## Примеры конфигурации
### Типичная домашняя обстановка
1. **Жилые помещения**: 21°C днем, 19°C ночью.
2. **Спальни**: 19°C днем, 16°C ночью
3. **Ванные комнаты**: 22°C утром/вечером, 19°C в остальное время
4. **Офис**: 21°C в рабочее время, 18°C в остальное время

### Советы по экономии энергии
- Используйте более низкие ночные температуры (снижение на 2–3 °C)
- Установите температуру отсутствия на 3–5 °C ниже нормы
- Настройте режим Boost для быстрого прогрева вместо постоянных высоких температур
- Используйте контроль влажности, чтобы предотвратить переохлаждение.

## Поиск неисправностей
### Распространенные проблемы
**Температура не меняется**

- Проверьте правильность настройки перечислений комнат.
- Убедитесь, что датчики температуры закреплены за правильными помещениями.
- Убедитесь, что приводы находятся в перечислении функций «Двигатель»

**Месячные не работают**

- Проверьте формат времени (24-часовой формат)
- Проверьте, соответствует ли режим работы конфигурации периода
- Подтвердите выбор комнаты в настройках периода

**Контроль влажности не работает**

- Добавьте датчики влажности в перечисления комнат и функций.
- Проверьте настройки порога влажности
- Убедитесь, что датчики предоставляют актуальные данные.

### Отладочная информация
Включите ведение журнала отладки в настройках адаптера, чтобы увидеть подробную информацию о:

- Расчеты температуры
- Сопоставление периодов
- Решения по управлению исполнительными механизмами
- Ошибочные состояния

## Кредиты
Значок создан Freepik ([https://www.flaticon.com/de/kostenloses-icon/heizung_1295221](https://www.flaticon.com/de/kostenloses-icon/heizung_1295221))

---

**Поддержите этот проект** ⭐ Поставьте звездочку этому репозиторию, если он оказался для вас полезным!

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 2.0.0 (2024-09-17)
* (jbeenenga) update dependencies
* (jbeenenga) add absence mode
* (jbeenenga) fix pause and boost for cooling mode

### 1.7.0 (2023-01-05)
* (jbeenenga) fix bug for end boost or pause mode
* (jbeenenga) provide corrent humidity in temperatures

### 1.6.7 (2022-12-16)
* (jbeenenga) fix date format

### 1.6.5 (2022-12-16)
* (jbeenenga) add possibility to reset temperatures on adapter start

### 1.6.4 (2022-12-16)
* (jbeenenga) add more debug outputs
* (jbeenenga) fixed incorrect period to room mapping

### 1.6.3 (2022-12-15)
* (jbeenenga) removed unnecessary debug output

### 1.6.2 (2022-12-15)
* (jbeenenga) fix for temperature calculation

### 1.5.0 (2022-09-25)
* (jbeenenga) add possibility to overwrite temperature temporarily
* (jbeenenga) add config for temperature offset
* (jbeenenga) add boost and pause function

## License

MIT License

Copyright (c) 2024 jbeenenga [j.beenenga@gmail.com](mailto:j.beenenga@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.