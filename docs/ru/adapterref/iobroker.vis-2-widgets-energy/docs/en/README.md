---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-energy/README.md":{"title":{"en":"Vis 2 Energy widgets"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/README.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/README.md":{"title":{"en":"Energy widgets for vis-2"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/README.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/distribution.md":{"title":{"en":"Distribution"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/distribution.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md":{"title":{"en":"Consumption"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption-comparison.md":{"title":{"en":"Consumption comparison"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption-comparison.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md":{"title":{"en":"Interval selector"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/self-sufficiency.md":{"title":{"en":"Self-sufficiency"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/self-sufficiency.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/battery.md":{"title":{"en":"Battery storage"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/battery.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/energy-costs.md":{"title":{"en":"Energy costs"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/energy-costs.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/dynamic-price.md":{"title":{"en":"Dynamic electricity price"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/dynamic-price.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-2-widgets-energy/docs/en/README.md
title: Энергетические виджеты для vis-2
hash: jFm3W1h2p+usZwBOEyL1VVMvoZnmT37hN6CEs2KKU+I=
---
# Энергетические виджеты для vis-2

Восемь виджетов для энергетических панелей мониторинга: анимированная диаграмма потока энергии, три графика с историческими и текущими значениями, селектор периода, в течение которого отображаются графики, два индикатора самообеспеченности, индикатор емкости аккумулятора и почасовой график обменных курсов.

| Виджет                                                                                                                      | Для чего это нужно                                                                                         |
| --------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| [Распределение](/#/docs/adapterref/iobroker.vis-2-widgets-energy/docs/en/distribution.md)                                   | Анимированная блок-схема: сеть, фотоэлектрические панели, настенная батарея, тепловой насос по всему дому. |
| [Потребление](/#/docs/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md)                                      | Гистограмма/линейный график одного периода, взятый из исторического примера.                               |
| [Сравнение потребления](/#/docs/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption-comparison.md)                 | Гистограмма или круговая диаграмма, сравнивающая текущие значения нескольких устройств.                    |
| [селектор интервала](/#/docs/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md)                         | Выбор дня/недели/месяца/года, остальные виджеты следуют далее.                                             |
| [Самодостаточность](/#/docs/adapterref/iobroker.vis-2-widgets-energy/docs/en/self-sufficiency.md)                           | Два кольцевых индикатора: самообеспеченность и самопотребление.                                            |
| [Аккумуляторное хранилище](/#/docs/adapterref/iobroker.vis-2-widgets-energy/docs/en/battery.md)                             | Уровень заряда, мощность заряда/разряда, оставшееся время                                                  |
| [затраты на электроэнергию](/#/docs/adapterref/iobroker.vis-2-widgets-energy/docs/en/energy-costs.md)                       | кВтч × цена, базовая плата и доход от продажи электроэнергии за указанный период                           |
| [Динамическое ценообразование на электроэнергию](/#/docs/adapterref/iobroker.vis-2-widgets-energy/docs/en/dynamic-price.md) | Почасовые обменные курсы с выделением самых дешевых часов.                                                 |

## Требования

- **Адаптер vis-2, работающий на React 19** (версия 2.20.1 и новее). Этот набор виджетов создан с использованием React 19, и эти два компонента должны совпадать: vis-2 для React 19 пропускает наборы виджетов, созданные для React 18 (с сообщением в логе), а vis-2 для React 18 не может отобразить этот набор. Обновите vis-2 вместе с этим адаптером.
- **Пример из истории** (`history`, `sql` или `influxdb`) только для [потребления](/#/docs/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md) и [затрат на электроэнергию](/#/docs/adapterref/iobroker.vis-2-widgets-energy/docs/en/energy-costs.md) в режиме «Суммирование из истории». Все остальное работает с текущими значениями. Используется экземпляр истории по умолчанию из настроек системы.

## Концепции, которые повторяются в нескольких виджетах.

### Множитель

Практически у каждого идентификатора объекта есть **множитель** . Виджеты не определяют единицы измерения: точка данных в ваттах остается в ваттах. Используйте множитель, чтобы перевести точку данных в ту же единицу измерения, что и остальная часть виджета. `0.001` преобразует Вт в кВт. `1000` преобразует кВт в Вт. `100` превращает евро в центы.

> Начиная с версии 2.0.0, виджет сравнения больше не преобразует Вт в Вт·ч и не делит Вт·ч на 1000. Если после обновления на панели мониторинга отображаются значения, в 1000 раз превышающие допустимые, установите множитель устройства равным `0.001`.

### Идентификатор объекта, который так и не был установлен.

Ан `id` Поле, к которому никогда не прикасались, поступает не пустым, а в виде буквальной строки. `nothing_selected` Все виджеты рассматривают это как "не настроено", поэтому наполовину заполненная конфигурация не отображается. `0`.

### Период

[Потребление](/#/docs/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md) энергии и [энергозатраты](/#/docs/adapterref/iobroker.vis-2-widgets-energy/docs/en/energy-costs.md) требуют определенного периода времени. Существует три способа установить этот период, и они опробуются в следующем порядке:

1. **В виджете** выберите [селектор «Интервал»](/#/docs/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md) в атрибуте _«Виджет для выбора временного интервала»_ . Это типичная ситуация, и несколько диаграмм могут использовать один и тот же селектор.
2. **Два идентификатора объекта** — _Start OID_ содержит начало в виде метки времени, _Interval OID —_ один из `day`, `week`, `month`, `year` Полезно, когда сценарием определяет точку.
3. **Ничего** — виджет затем следует периоду всего представления, который vis-2 сохраняет для всех виджетов в нем.

### Без рамки

Любой виджет можно отобразить без его карточки (`Without frame` Используйте это, когда виджет находится внутри другого виджета или на фоне, который уже обеспечивает обрамление. В этом случае заголовок тоже исчезнет.

## Откуда берутся ценности

Ни один из этих виджетов не вычисляет энергию из мощности с течением времени. Они показывают, что уже содержится в точке данных, поэтому точность цифр зависит от адаптера, который за ними стоит. Типичные источники в ioBroker:

- адаптеры инвертора (`sma-em`, `fronius`, `e3dc`, `solax`, `growatt`, `modbus` …) для производства, электросетей и аккумуляторов.
- адаптеры для интеллектуальных счетчиков (`smartmeter`, `tibberlink`, `shelly` с использованием 3EM) для импорта и экспорта в сеть,
- `tibberlink`, `awattar`, `epex-spot`, `smartenergy` почасовая оплата,
- тот `statistics` Адаптер, если вам нужны ежедневные/ежемесячные итоговые данные в виде готовых точек данных.