---
chapters: {"pages":{"en/adapterref/iobroker.heizungssteuerung/README.md":{"title":{"en":"ioBroker.heizungssteuerung"},"content":"en/adapterref/iobroker.heizungssteuerung/README.md"},"en/adapterref/iobroker.heizungssteuerung/README_DE.md":{"title":{"en":"ioBroker.heizungssteuerung"},"content":"en/adapterref/iobroker.heizungssteuerung/README_DE.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.heizungssteuerung/README.md
title: ioBroker.heizungssteuerung
hash: wDUNR9HifMy+O3Dz+fFKcxzdl727S3ZfwpgM38V3Kls=
---
# ioBroker.heizungssteuerung

![Версия NPM](https://img.shields.io/npm/v/iobroker.heizungssteuerung.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.heizungssteuerung.svg)
![Статус зависимости](https://img.shields.io/david/jbeenenga/iobroker.heizungssteuerung.svg)
![Известные уязвимости](https://snyk.io/test/github/jbeenenga/ioBroker.heizungssteuerung/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.heizungssteuerung.png?downloads=true)
![Тестирование и выпуск](https://github.com/jbeenenga/ioBroker.heizungssteuerung/actions/workflows/test-and-release.yml/badge.svg)

![Логотип](../../../en/adapterref/iobroker.heizungssteuerung/admin/heizungssteuerung.png)

## Адаптер ioBroker для управления отоплением

Этот адаптер обеспечивает комплексное управление системой отопления для установок ioBroker. Он поддерживает как режим обогрева, так и режим охлаждения, а также обладает расширенными функциями, такими как режим повышения мощности, функция паузы и планирование регулирования температуры по времени.

[🇩🇪 Немецкая версия](/#/docs/adapterref/iobroker.heizungssteuerung/README_DE.md)

## Функции

- **Поддержка двух режимов** : переключение между режимами обогрева и охлаждения.
- **Управление на основе погодных условий** : автоматическое включение/выключение в зависимости от температуры наружного воздуха.
- **Режим повышения мощности** : Временно увеличивает мощность отопления/охлаждения в отдельных комнатах.
- **Режим паузы** : Временно отключает отопление/охлаждение в отдельных комнатах.
- **Планирование по времени** : определение температурных периодов для разного времени и дней.
- **Управление температурой в каждом помещении** : индивидуальная регулировка температуры в каждой комнате.
- **Контроль влажности** : Охлаждение прекращается при достижении пороговых значений влажности.
- **Режим отсутствия** : Установите пониженную температуру во время праздников или длительного отсутствия.
- **Изменение температуры вручную** : при необходимости можно вручную изменить целевую температуру.

## Установка

### Через административный интерфейс ioBroker

1. Откройте административный интерфейс ioBroker.
2. Перейдите на вкладку «Адаптеры».
3. Искать "heizungssteuerung"
4. Нажмите «Установить»

### Через npm

```bash
npm install iobroker.heizungssteuerung
```

## Краткое руководство пользователя

### 1. Организация пространства в помещении

Перед настройкой адаптера необходимо создать структуру комнаты в ioBroker:

1. Перейдите в раздел **Объекты → Перечисления → Комнаты**
2. Создайте отдельные комнаты для каждой зоны, которую вы хотите контролировать (например, «Гостиная», «Спальня», «Кухня»).
3. В каждую комнату следует добавить следующие устройства:
   - Датчики температуры
   - Исполнительные механизмы систем отопления/охлаждения (клапаны, переключатели и т. д.)
   - Датчики влажности (опционально)

### 2. Настройка функций

Настройте необходимые функции в **разделе Объекты → Перечисления → Функции** :

- **Температура** : Сложить все состояния датчиков температуры.
- **Влажность** : Добавить состояния датчика влажности (опционально)
- **Двигатель** : Добавить все состояния исполнительных механизмов отопления/охлаждения

### 3. Конфигурация адаптера

#### Основные настройки

- **Режим работы** : выберите один из режимов — «Обогрев» или «Охлаждение».
- **Интервал проверки** : Как часто адаптер проверяет температуру (в минутах)
- **Температура по умолчанию** : резервная температура, если ни один период не совпадает.
- **Температурный гистерезис** : пороговое значение разницы температур для включения/выключения отопления/охлаждения.

#### Временные периоды

Настройте расписание изменения температуры для каждой комнаты:

1. Выберите номер из выпадающего списка.
2. Установите время начала и окончания.
3. Определите целевую температуру
4. Выберите дни недели
5. Укажите, предназначен ли этот период для режима обогрева или охлаждения.

#### Расширенные настройки

- **Длительность паузы** : Время автоматического сброса в режиме паузы (в минутах)
- **Длительность режима ускорения** : Время автоматического сброса для режима ускорения (в минутах)
- **Порог влажности** : максимальная влажность, при которой прекращается охлаждение.
- **Сброс при запуске** : перезапись всех температур значениями по умолчанию при запуске адаптера.

#### Управление на основе погодных условий (опционально)

Включите интеллектуальное управление в зависимости от внешней температуры:

- **Включить управление в зависимости от погоды** : активировать управление отоплением/охлаждением на основе погодных условий.
- **Источник данных о погоде** : выберите штат, для которого имеются данные о температуре наружного воздуха.
- **Порог включения отопления** : Включайте отопление только в том случае, если температура наружного воздуха ниже этого значения (по умолчанию: 15°C).
- **Порог охлаждения** : Включайте охлаждение только в том случае, если температура наружного воздуха превышает это значение (по умолчанию: 24°C).

**Как это работает:**

- В режиме обогрева: система работает только тогда, когда температура наружного воздуха ниже порогового значения.
- В режиме охлаждения: система работает только тогда, когда температура наружного воздуха превышает пороговое значение.
- Имеет приоритет над всеми остальными настройками (периоды, повышение частоты обновления, отсутствие).
- Если данные о погоде недоступны, система работает в обычном режиме в качестве резервного варианта.

## Использование

### Действия ручного управления

Адаптер создает объекты действий в рамках`heizungssteuerung.0.Actions` :

#### Глобальные действия (все комнаты)

- **absenceUntil** : Установить режим отсутствия до определенной даты/времени
  - Формат:`dd.MM.yyyy HH:mm` (например, "01.01.2024 14:00")
  - Результат: игнорирует периоды и использует температуру по умолчанию.
- **пауза** : Временно приостановить все системы отопления/кондиционирования.
- **режим ускорения** : активировать режим ускорения для всех комнат

#### Действия, специфичные для конкретного помещения

В каждой комнате вы найдете:

- **пауза** : Приостановить отопление/охлаждение только для этого помещения.
- **режим ускорения** : Активируйте режим ускорения только для этой комнаты.
- **targetTemp** : Временно переопределяет целевую температуру

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

1. **Жилые помещения** : 21°C днем, 19°C ночью
2. **Спальни** : 19°C днем, 16°C ночью
3. **В ванных комнатах** : 22°C утром/вечером, 19°C в остальное время.
4. **В офисе** : 21°C в рабочее время, 18°C в остальное время.

### Советы по энергосбережению

- Используйте более низкие ночные температуры (снижение на 2-3°C).
- Установите температуру отсутствия на 3-5°C ниже нормы.
- Настройте режим повышения мощности для быстрого прогрева вместо поддержания постоянной высокой температуры.
- Используйте контроль влажности, чтобы предотвратить чрезмерное охлаждение.

## Поиск неисправностей

### Общие проблемы

**Температура не меняется**

- Проверьте правильность настройки перечислений помещений.
- Убедитесь, что датчики температуры подключены к правильным помещениям.
- Убедитесь, что исполнительные механизмы находятся в перечислении функций "Двигатель".

**Менструация не проходит**

- Проверьте формат времени (24-часовой формат).
- Проверьте, соответствует ли режим работы конфигурации периода.
- Подтвердите выбор комнаты в исторической обстановке.

**Регулятор влажности не работает**

- Добавьте датчики влажности как в перечисления помещений, так и в функциональные перечисления.
- Проверьте настройки порогового значения влажности.
- Убедитесь, что датчики предоставляют актуальные данные.

### Отладочная информация

Включите отладочное логирование в настройках адаптера, чтобы просмотреть подробную информацию о:

- Расчеты температуры
- Соответствие периоду
- решения по управлению исполнительным механизмом
- Условия ошибок

## Кредиты

Иконка создана Freepik ( <https://www.flaticon.com/de/kostenloses-icon/heizung_1295221> )

---

**Поддержите этот проект** ⭐ Поставьте звездочку этому репозиторию, если он вам полезен!

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now

### 2.1.2 (2025-12-10)
- (jbeenenga) fix invalid state roles according to ioBroker documentation
- (jbeenenga) fix repository checker issues (#237)
  - Corrected schema URL in .vscode/settings.json
  - Added jsonConfig schema validation
  - Updated release-script packages to latest versions
- (jbeenenga) fix jsonConfig validation errors - replaced title with label in table items

### 2.1.1 (2025-09-02)
 - (jbeenenga) correct outsite temperature path setting

### 2.1.0 (2025-08-25)

- (jbeenenga) add weather-based heating/cooling control
- (jbeenenga) refactor business logic into service classes
- (jbeenenga) add comprehensive unit tests
- (jbeenenga) update dependencies to latest versions

### 2.0.3 (2025-07-02)

- (jbeenenga) fix absence format issue
- (jbeenenga) fix period matching issue

### 2.0.2 (2025-06-24)

- (jbeenenga) fix build bug

### 2.0.1 (2025-06-24)

- (jbeenenga) fix technical issues

### 2.0.0 (2025-06-18)

- (jbeenenga) update dependencies
- (jbeenenga) add absence mode
- (jbeenenga) fix pause and boost for cooling mode

### 1.7.0 (2023-01-05)

- (jbeenenga) fix bug for end boost or pause mode
- (jbeenenga) provide corrent humidity in temperatures

### 1.6.7 (2022-12-16)

- (jbeenenga) fix date format

### 1.6.5 (2022-12-16)

- (jbeenenga) add possibility to reset temperatures on adapter start

### 1.6.4 (2022-12-16)

- (jbeenenga) add more debug outputs
- (jbeenenga) fixed incorrect period to room mapping

### 1.6.3 (2022-12-15)

- (jbeenenga) removed unnecessary debug output

### 1.6.2 (2022-12-15)

- (jbeenenga) fix for temperature calculation

### 1.5.0 (2022-09-25)

- (jbeenenga) add possibility to overwrite temperature temporarily
- (jbeenenga) add config for temperature offset
- (jbeenenga) add boost and pause function

[Older changelogs can be found there](https://github.com/jbeenenga/ioBroker.heizungssteuerung/blob/main/CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2025-2026 jbeenenga [j.beenenga@gmail.com](mailto:j.beenenga@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.