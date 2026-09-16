---
chapters: {"pages":{"en/adapterref/iobroker.sax-power/README.md":{"title":{"en":"ioBroker.sax-power"},"content":"en/adapterref/iobroker.sax-power/README.md"},"en/adapterref/iobroker.sax-power/docs/OBJECTS.md":{"title":{"en":"ioBroker object structure"},"content":"en/adapterref/iobroker.sax-power/docs/OBJECTS.md"},"en/adapterref/iobroker.sax-power/docs/FIELD_REFERENCE.md":{"title":{"en":"Field reference"},"content":"en/adapterref/iobroker.sax-power/docs/FIELD_REFERENCE.md"},"en/adapterref/iobroker.sax-power/docs/STATISTICS.md":{"title":{"en":"Historical energy statistics"},"content":"en/adapterref/iobroker.sax-power/docs/STATISTICS.md"},"en/adapterref/iobroker.sax-power/docs/BATTERY.md":{"title":{"en":"Battery models, equivalent full cycles and health"},"content":"en/adapterref/iobroker.sax-power/docs/BATTERY.md"},"en/adapterref/iobroker.sax-power/docs/MODBUS.md":{"title":{"en":"Modbus integration roadmap"},"content":"en/adapterref/iobroker.sax-power/docs/MODBUS.md"},"en/adapterref/iobroker.sax-power/docs/API.md":{"title":{"en":"SAX Power Cloud API"},"content":"en/adapterref/iobroker.sax-power/docs/API.md"},"en/adapterref/iobroker.sax-power/docs/ARCHITECTURE.md":{"title":{"en":"Architecture"},"content":"en/adapterref/iobroker.sax-power/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.sax-power/docs/BRANDING.md":{"title":{"en":"Branding and trademarks"},"content":"en/adapterref/iobroker.sax-power/docs/BRANDING.md"},"en/adapterref/iobroker.sax-power/CONTRIBUTING.md":{"title":{"en":"Contributing"},"content":"en/adapterref/iobroker.sax-power/CONTRIBUTING.md"},"en/adapterref/iobroker.sax-power/SECURITY.md":{"title":{"en":"Security policy"},"content":"en/adapterref/iobroker.sax-power/SECURITY.md"},"en/adapterref/iobroker.sax-power/CODE_OF_CONDUCT.md":{"title":{"en":"Code of conduct"},"content":"en/adapterref/iobroker.sax-power/CODE_OF_CONDUCT.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sax-power/docs/ARCHITECTURE.md
title: Архитектура
hash: UJIlPetw17FicA5Xfts/pWCaE8beno8SgMyNIzSRMzI=
---
# Архитектура

## Обзор

Адаптер состоит из облачного клиента, парсеров, механизмов состояний, планировщика задач во время выполнения и административного интерфейса на основе React.

```text
SAX Power Cloud
      │
      ▼
SaxPowerApiClient
      │
      ├── live data
      └── energy chart history
      │
      ▼
Parsers
      │
      ├── SaxPowerParser
      └── SaxPowerHistoryParser
      │
      ▼
State engines
      │
      ├── StateEngine
      └── StatisticsStateEngine
      │
      ▼
ioBroker object database
      │
      ▼
React administration interface
```

## Поток выполнения

1. Адаптер проверяет свою конфигурацию.
2. Аутентификация осуществляется через облако SAX Power.
3. Программа обнаруживает все устройства хранения данных, назначенные учетной записи.
4. Программа запрашивает актуальные данные в режиме реального времени с заданным интервалом опроса.
5. Это приводит к нормализации значений в облаке и их преобразованию в стабильную внутреннюю модель устройства.
6. Она записывает состояния, специфичные для данного устройства.
7. Она записывает агрегированные состояния корневого узла.
8. В нем обновляются исторические статистические данные в рамках специальной исторической программы.
9. Административный интерфейс считывает состояния ioBroker через существующий административный сокет ioBroker.

## Облачный опрос

Минимальный поддерживаемый интервал составляет 60 секунд.

Административная панель чаще обновляет отображаемые состояния ioBroker, но это **не** приводит к дополнительным запросам к облаку. Расписание опроса облака и расписание обновления пользовательского интерфейса независимы друг от друга.

## Модель состояния, специфичная для устройства

Ниже представлено каждое обнаруженное устройство хранения данных:

```text
devices.<serialNumber>
```

Дерево устройств содержит:

- статичная и медленно меняющаяся информация
- текущие измерения в реальном времени
- историческая статистика

## Агрегированная модель в реальном времени

Ниже адаптер записывает объединенные значения в реальном времени:

```text
live
```

Правила агрегирования:

- Заряд батареи: сумма всех доступных значений заряда батареи.
- Уровень заряда: среднее арифметическое всех доступных значений уровня заряда накопителя.
- Фотоэлектрическая энергия: первое доступное значение на уровне установки.
- Электроэнергия из сети: первое доступное значение на уровне установки.
- Потребление электроэнергии в доме: рассчитывается только при одновременном использовании солнечной энергии, энергии из сети и энергии аккумуляторов.

Значения, полученные от фотоэлектрических систем и сети, рассматриваются как измерения на уровне установки, поскольку облачная платформа SAX Power может возвращать одно и то же значение для нескольких устройств хранения данных. Поэтому они не суммируются.

## Соглашение о знаках силы

В нормализованной модели используются:

### Электроэнергия из сети

- положительный: импорт сетки
- отрицательный: экспорт сетки
- ноль: холостой ход

### Питание от батареи

- положительный полюс: разряд батареи
- отрицательный полюс: заряд батареи
- ноль: холостой ход

Потребление электроэнергии в домохозяйстве рассчитывается следующим образом:

```text
houseConsumptionPower =
    pvPower + gridPower + batteryPower
```

Результат ограничен как минимум нулем. Если один из необходимых входных параметров недоступен, вычисленное значение сохраняется как`null` .

## Историческая статистика

Анализатор статистики нормализует ответы на энергетические диаграммы, разделяя их на пять периодов:

- день
- неделя
- месяц
- год
- общий

Статистические данные записываются:

- под каждым устройством
- ниже корневого каталога адаптера в виде совокупного значения для всех устройств.

## Административный интерфейс

Адаптер использует собственный административный интерфейс React, основанный на фреймворке ioBroker React adapter и Material UI.

Интерфейс:

- соответствует светлой или темной теме оформления ioBroker.
- нет отдельной кнопки переключения тем
- отзывчивый
- поддерживает прокрутку на экранах меньшего размера.
- считывает значения, полученные во время выполнения, из состояний ioBroker.
- никогда не взаимодействует напрямую с облаком SAX Power.

## Обработка ошибок

Адаптер состоит из двух частей:

- ошибки конфигурации
- ошибки аутентификации
- ошибки опроса в реальном времени
- ошибки опроса истории
- ошибки синтаксического анализа

Конфиденциальная информация, такая как пароли и токены доступа, ни в коем случае не должна записываться в журналы.

## Границы версии 1.0

Версия 1.0 доступна только для чтения в отношении SAX Power и Modbus.

Следующие компоненты пока не являются частью архитектуры среды выполнения:

- записываемые управляющие состояния
- логика управления зарядкой
- операции записи Modbus
- настраиваемые зависимости автоматизации