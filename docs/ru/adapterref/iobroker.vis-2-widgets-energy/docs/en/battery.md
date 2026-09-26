---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-energy/README.md":{"title":{"en":"Vis 2 Energy widgets"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/README.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/README.md":{"title":{"en":"Energy widgets for vis-2"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/README.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/distribution.md":{"title":{"en":"Distribution"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/distribution.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md":{"title":{"en":"Consumption"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption-comparison.md":{"title":{"en":"Consumption comparison"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption-comparison.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md":{"title":{"en":"Interval selector"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/self-sufficiency.md":{"title":{"en":"Self-sufficiency"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/self-sufficiency.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/battery.md":{"title":{"en":"Battery storage"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/battery.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/energy-costs.md":{"title":{"en":"Energy costs"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/energy-costs.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/dynamic-price.md":{"title":{"en":"Dynamic electricity price"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/dynamic-price.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-2-widgets-energy/docs/en/battery.md
title: Аккумуляторное хранилище
hash: XDx2AUm8CqDZC3pp3tK/wiiuVyK1HAXOhaNhWWMv6Ws=
---
# Аккумуляторное хранилище

![Аккумуляторное хранилище](../../../../../en/adapterref/iobroker.vis-2-widgets-energy/img/battery.png)

На изображении показана батарея, заполненная в соответствии с уровнем заряда, с указанием мощности зарядки или разрядки, приблизительного времени работы и накопленной энергии.

## Требования

Только текущие значения. Для отображения символа достаточно уровня заряда; мощность и емкость суммируются.

## Конфигурация

### Общий

| Поле                      | Значение                                                                        |
| ------------------------- | ------------------------------------------------------------------------------- |
| Без рамки / Имя           | Карточка и заголовок                                                            |
| Ориентация                | Символ, стоящий вертикально или лежащий на боку.                                |
| Проявите силу             | Строка со стрелкой под процентом                                                |
| Показать оставшееся время | "Полностью заполнено" / "Полностью заполнено". Требуется указанная вместимость. |
| Десятичные дроби          | Десятичные дроби процента и степени                                             |

### Ценности

| Поле                            | Значение                                                                                  |
| ------------------------------- | ----------------------------------------------------------------------------------------- |
| Состояние заряда OID            | Уровень заряда батареи в процентах                                                        |
| Множитель                       | `100` если точка данных выдает значения 0…1 вместо 0…100                                  |
| Раздельная зарядка и разрядка   | Инвертор имеет одну точку данных на каждое направление вместо одного знакового значения.  |
| ОИД питания батареи             | Подписанная власть                                                                        |
| Положительное значение означает | По вопросу зарядки или разрядки инверторы расходятся во мнениях.                          |
| ОИД зарядной мощности           | Значение больше нуля во время зарядки батареи.                                            |
| Разрядная мощность OID          | Значение больше нуля, пока батарея разряжается.                                           |
| Множитель                       | Масштабирование мощности                                                                  |
| Силовой агрегат                 | Обычно `W` или `kW`                                                                         |
| Емкость                         | Полезная вместимость в виде фиксированного числа                                          |
| Емкость OID                     | …или на основе данных, если инвертор их предоставляет. Это важнее, чем числовое значение. |
| Единица измерения мощности      | Обычно `kWh`                                                                               |

### Цвета

| Поле                                     | Значение                                                                      |
| ---------------------------------------- | ----------------------------------------------------------------------------- |
| Раскраска по уровню                      | Вместо использования одного цвета, измените цвет на двух пороговых значениях. |
| Низкий порог / Средний порог             | В процентах                                                                   |
| Низкий / Средний / Высокий уровень цвета | Вплоть до нижнего порога, до среднего, выше него                              |
| Цвет заливки                             | Одноцветный режим при отключенной _функции «Цвет по уровням»_ .               |

## оставшееся время

```
charging:    (100 % − SoC) × capacity / |power|
discharging:          SoC  × capacity / |power|
```

Емкость выражается в единицах энергии (кВт·ч), а мощность — в единицах мощности (Вт или кВт), поэтому они должны соответствовать следующим условиям: _единица мощности_ равна... `W` Если значение делится на 1000 перед делением, то каждая вторая единица используется как есть. Таким образом, при мощности в кВт·ч установите единицу измерения мощности равной... `W` или `kW` — В противном случае это даст неверную оценку.

Это число отражает текущий уровень мощности, а не является прогнозом: оно меняется, как только изменяется нагрузка.

## Рецепт: накопитель энергии на 10 кВт⋅ч на гибридном инверторе

1. _Идентификатор состояния заряда (OID)_ = точка данных SoC, _Множитель_ =`1`.
2. _Идентификатор мощности батареи (OID)_ = мощность батареи. _Положительное значение означает_ =`Charging` (пытаться `Discharging` (если стрелка указывает в неправильном направлении), _Силовой агрегат_ =`W`.
3. _Вместимость_ =`10` _Единица измерения вместимости_ =`kWh`.
4. _Цвет по уровням_ включен, настройки по умолчанию: красный до 20 %, оранжевый до 50 %, зеленый выше.

## Поиск неисправностей

- **Стрелка указывает в неправильном направлении.** Переключитесь на другой вариант, _указав положительное значение_ , или поменяйте местами идентификаторы двух объектов в отдельном режиме.
- **Оставшееся время не отображается.** Емкость отсутствует, или мощность равна нулю — оценить состояние батареи в состоянии покоя не из чего.
- **Оставшееся время в 1000 раз меньше.** _Единицы измерения мощности_ и _емкости_ не совпадают. При емкости в кВт·ч единица измерения мощности должна быть... `W` или `kW`.
- **Индикатор всегда полон.** Точка данных SoC выдает 0…1. Установите _множитель_ на `100`.