---
chapters: {"pages":{"en/adapterref/iobroker.sax-power/README.md":{"title":{"en":"ioBroker.sax-power"},"content":"en/adapterref/iobroker.sax-power/README.md"},"en/adapterref/iobroker.sax-power/docs/OBJECTS.md":{"title":{"en":"ioBroker object structure"},"content":"en/adapterref/iobroker.sax-power/docs/OBJECTS.md"},"en/adapterref/iobroker.sax-power/docs/FIELD_REFERENCE.md":{"title":{"en":"Field reference"},"content":"en/adapterref/iobroker.sax-power/docs/FIELD_REFERENCE.md"},"en/adapterref/iobroker.sax-power/docs/STATISTICS.md":{"title":{"en":"Historical energy statistics"},"content":"en/adapterref/iobroker.sax-power/docs/STATISTICS.md"},"en/adapterref/iobroker.sax-power/docs/BATTERY.md":{"title":{"en":"Battery models, equivalent full cycles and health"},"content":"en/adapterref/iobroker.sax-power/docs/BATTERY.md"},"en/adapterref/iobroker.sax-power/docs/MODBUS.md":{"title":{"en":"Modbus integration roadmap"},"content":"en/adapterref/iobroker.sax-power/docs/MODBUS.md"},"en/adapterref/iobroker.sax-power/docs/API.md":{"title":{"en":"SAX Power Cloud API"},"content":"en/adapterref/iobroker.sax-power/docs/API.md"},"en/adapterref/iobroker.sax-power/docs/ARCHITECTURE.md":{"title":{"en":"Architecture"},"content":"en/adapterref/iobroker.sax-power/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.sax-power/docs/BRANDING.md":{"title":{"en":"Branding and trademarks"},"content":"en/adapterref/iobroker.sax-power/docs/BRANDING.md"},"en/adapterref/iobroker.sax-power/CONTRIBUTING.md":{"title":{"en":"Contributing"},"content":"en/adapterref/iobroker.sax-power/CONTRIBUTING.md"},"en/adapterref/iobroker.sax-power/SECURITY.md":{"title":{"en":"Security policy"},"content":"en/adapterref/iobroker.sax-power/SECURITY.md"},"en/adapterref/iobroker.sax-power/CODE_OF_CONDUCT.md":{"title":{"en":"Code of conduct"},"content":"en/adapterref/iobroker.sax-power/CODE_OF_CONDUCT.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sax-power/docs/STATISTICS.md
title: Исторические статистические данные по энергетике
hash: niADyVhHoeLGBdCI/jMlTQ5IWpfKxy3PDx8vtjnG7eY=
---
# Исторические статистические данные по энергетике

## Цель

Адаптер обеспечивает заданные значения энергии для зарядки и разрядки аккумулятора в течение полезных фиксированных периодов времени.

Статистические данные доступны:

- для каждого обнаруженного устройства хранения
- в совокупности по всем обнаруженным устройствам хранения данных.

## Периоды

```text
day
week
month
year
total
```

### День

Значения за текущий календарный день.

Запрос на создание ежедневного графика в облаке SAX Power не используется напрямую в версии 1.0. Сегодняшние значения получены из ответа за текущий месяц.

### Неделя

Значения за текущую неделю, возвращаемые конечной точкой графика энергопотребления SAX Power.

### Месяц

Значения за текущий календарный месяц.

### Год

Значения за текущий календарный год.

Первая метка времени нормализуется до даты, совместимой со стандартом ISO, например:

```text
2026-01-01
```

### Общий

Все доступные исторические значения энергии батареи.

Первая и последняя временные метки отражают исторический диапазон, охватываемый откликом SAX Power.

## Общедоступные периоды состояний

Каждая менструация обнажает:

```text
chargedEnergy
dischargedEnergy
firstTimestamp
lastTimestamp
```

### `chargedEnergy`

Заряженная энергия аккумулятора за выбранный период, в кВт·ч.

### `dischargedEnergy`

Количество энергии, разряженной батареей за выбранный период, в кВт·ч.

### `firstTimestamp`

В первую очередь были включены исторические данные или нормализованный период начала.

### `lastTimestamp`

Последнее включенное историческое измерение.

## Агрегация

Ниже приведены статистические данные об устройстве:

```text
devices.<serialNumber>.statistics.<period>
```

Сводные статистические данные приведены ниже:

```text
summary.statistics.<period>
```

Для нескольких устройств хранения данных:

- Заряженная энергия суммируется
- Выделяемая энергия суммируется.
- Используется самая ранняя действительная первая метка времени.
- Используется последняя действительная метка времени.

Агрегирование циклов зарядки/разрядки батареи отличается от агрегирования энергии: количество циклов никогда не суммируется. Формулу для расчета с учетом емкости см. в [файле BATTERY.md](/#/docs/adapterref/iobroker.sax-power/docs/BATTERY.md) .

## Внутренний источник

Подсистема истории идентифицирует свой активный источник следующим образом:

```text
summary.statistics.info.source
```

В текущей реализации это конечная точка для отображения графика энергопотребления SAX Power.

Данное рабочее состояние не повторяется в каждом периоде.

## Удалены технические значения

В более ранних сборках для разработчиков были обнаружены уязвимые места:

- `samples`
- конкретный период `source`
- `completeness`

Эти значения не входят в общедоступную объектную модель версии 1.0, поскольку они представляют небольшую практическую ценность для пользователей и вызывают вопросы, которых можно было бы избежать.

Существующие объекты автоматически удаляются во время инициализации объектов.

## Обновление поведения

Исторические статистические данные обрабатываются независимо от цикла опроса данных в реальном времени.

Неудачное обновление истории:

- не прекращает измерения в реальном времени
- регистрируется в истории состояния/состояний ошибок.
- Повторная попытка будет предпринята при следующем запланированном запуске истории изменений.

## Ограничения данных

Адаптер может отображать только историю, полученную из облака SAX Power.

Возможные ограничения включают:

- отсутствующие исторические периоды
- отложенные обновления облака
- неполные первый или последний периоды
- изменения в недокументированных форматах ответов облачных сервисов

Адаптер не создает недостающие значения энергии.