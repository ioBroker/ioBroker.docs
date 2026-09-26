---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-energy/README.md":{"title":{"en":"Vis 2 Energy widgets"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/README.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/README.md":{"title":{"en":"Energy widgets for vis-2"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/README.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/distribution.md":{"title":{"en":"Distribution"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/distribution.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md":{"title":{"en":"Consumption"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption-comparison.md":{"title":{"en":"Consumption comparison"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/consumption-comparison.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md":{"title":{"en":"Interval selector"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/interval-selector.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/self-sufficiency.md":{"title":{"en":"Self-sufficiency"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/self-sufficiency.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/battery.md":{"title":{"en":"Battery storage"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/battery.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/energy-costs.md":{"title":{"en":"Energy costs"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/energy-costs.md"},"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/dynamic-price.md":{"title":{"en":"Dynamic electricity price"},"content":"en/adapterref/iobroker.vis-2-widgets-energy/docs/en/dynamic-price.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-2-widgets-energy/docs/en/self-sufficiency.md
title: Самодостаточность
hash: BR8dtpjj3JfqQQ04VRN1/xqrFxfGUQKoQ7tR3LZaU8U=
---
# Самодостаточность
![Самодостаточность](../../../../../en/adapterref/iobroker.vis-2-widgets-energy/img/selfSufficiency.png)

Два кольцевых калибра, которые отвечают на два вопроса, которые задает каждый владелец солнечной электростанции:

- **Самодостаточность** - сколько того, что потребляло домохозяйство, *не* поступало из централизованной энергосети.
- **Самостоятельное потребление** - сколько произведенной солнечной энергией энергии было использовано дома, а не продано.

Оба показателя представляют собой соотношения, поэтому они работают как с мощностью (изображением в реальном времени), так и с счетчиками энергии периода - при условии, что все входные данные используют **одну и ту же единицу измерения**.

## Формулы
```
house consumption = production − feed-in + grid import      (unless its own data point is set)
self-consumed     = production − feed-in
self-sufficiency  = (house consumption − grid import) / house consumption
self-consumption  = self-consumed / production
```

Оба результата ограничены диапазоном 0…100 %, а кольцо показывает `--`, в то время как его знаменатель равен 0 (например, отсутствие производства ночью).

## Требования
Только текущие значения. Как минимум, производство электроэнергии и электросеть; потребление домохозяйства затем определяется балансом.

Все данные должны быть в одной и той же единице измерения: не следует смешивать показания фотоэлектрического инвертора в Вт и счетчика в кВт. Используйте **множитель** рядом с идентификатором каждого объекта, чтобы объединить их.

## Конфигурация
### Общий
| Поле | Значение |
| ----------------------- | --------------------------------------------------------------------------- |
| Без рамки / Имя | Карточка и заголовок |
| Показать | Оба кольца, только самодостаточность или только самопотребление |
| Показать значения | В кольцах отображаются данные о производстве, потреблении домохозяйств, импорте и экспорте электроэнергии из сети |
| Единица измерения | Указывается после перечисленных значений, например, `W` или `kWh` |
| Десятичные дроби | Десятичные дроби процентов и указанных значений |
| Толщина кольца | Ширина кольца в пикселях |
| Цвет самодостаточности | Заполненная часть левого кольца |
| Цвет самопоглощения | Заполненная часть правого кольца |
| Цвет трека | Пустая часть кольца. Пустота соответствует теме. |

### Источники данных
| Поле | Значение |
| --------------------------- | --------------------------------------------------------------------------------- |
| Производственный OID | Что производит фотоэлектрическая система |
| Одна точка данных для сетки | Счетчик выдает одно значение со знаком для обоих направлений |
| Идентификатор сетки | Это знаковое значение: положительное значение берется из сетки, отрицательное - подается в нее |
| OID импорта сетки | Что берется из сетки (когда счетчик разделяет направления) |
| OID экспорта сетки | Что передается в сетку |
| Идентификатор потребления электроэнергии в доме | Необязательный. Без него потребление рассчитывается исходя из остальных трех. |
| Множитель (три штуки) | Один для производства, один для сети, один для потребления в доме |

## Рецепт: живая фотография в W
1. *Производственный OID* = мощность переменного тока инвертора.
2. *Одна точка данных для сети*, *Идентификатор сети* = мощность счетчика сети (положительное значение = потребляется из сети).
3. Оставьте поле *Идентификатор потребления домохозяйства* пустым - оно определяется балансом.
4. *Показать значения*, *Единица измерения* = `Вт`.

## Рецепт: суточная норма
Вместо этого используйте суточные счетчики энергии: производство за день, импорт в сеть за день, подача электроэнергии в сеть за день. В этом случае два кольца будут показывать квоту за этот день, а не за эту секунду. Все в кВт·ч, все множители указаны в `1`.

## Поиск неисправностей
- **На кольце изображен символ `--`.** Его знаменатель равен 0. Для самопотребления требуется производство, превышающее 0, и

Для достижения самодостаточности необходимо, чтобы потребление в доме превышало 0.

- **Самодостаточность всегда составляет 100 %.** Импорт данных в сетку не настроен или равен 0. При наличии одного подписанного набора данных в сетке.

В этом случае проверьте, действительно ли ваш измерительный прибор использует положительное значение для обозначения "полученного из сети" - если наоборот, используйте вместо этого два отдельных идентификатора объекта.

- **Числа не совпадают.** Один из входных параметров находится в другой единице измерения. Проверьте три множителя.