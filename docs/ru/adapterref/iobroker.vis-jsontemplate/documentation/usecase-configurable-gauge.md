---
chapters: {"pages":{"en/adapterref/iobroker.vis-jsontemplate/README.md":{"title":{"en":"JSONTemplate - Adapter to visualize JSON data and other data in Vis/Vis2"},"content":"en/adapterref/iobroker.vis-jsontemplate/README.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-asynccall.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-asynccall.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-loadingscripts.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-loadingscripts.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-tasklist.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-tasklist.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-public-transport.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-public-transport.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-simplegauge.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-simplegauge.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-configurable-gauge.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-configurable-gauge.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-githubissues.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-githubissues.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-fritzbox-call-list.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-fritzbox-call-list.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/AI-EN.md":{"title":{"en":"Creating Templates with AI"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/AI-EN.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/KI-DE.md":{"title":{"en":"Templates mit KI erstellen"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/KI-DE.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-jsontemplate/documentation/usecase-configurable-gauge.md
title: без названия
hash: VsMjsTPOGBpRKa1EggxylPppzakBUxaTI/jqiIhM2Ik=
---
#### Пример использования настраиваемого сегментированного индикатора

##### **Введение**

В этом примере использования создается адаптивный SVG-индикатор с помощью `JSON Template` Виджет. Он создан по образцу следующего изображения; фоновое изображение намеренно не воспроизводится, поскольку сам шаблон прозрачный.

![Настраиваемый сегментированный индикатор](../../../../en/adapterref/iobroker.vis-jsontemplate/documentation/gauge.jpeg)

Шаблон предоставляет:

- Настраиваемые абсолютные минимальные и максимальные значения
- Настраиваемые углы начала и окончания, а также ширина грифа.
- цветная или прозрачная фоновая дуга
- любое количество секторов с использованием абсолютных или процентных границ
- сплошной цвет или градиент цвета, следующий за дугой, для каждого сектора
- необязательные абсолютные или процентные обозначения границ
- Абсолютное или процентное значение, расположенное точно в центре SVG-изображения.
- Настраиваемый типографический формат значений и опциональное поле для значений.
- настраиваемый внешний защитный край для длинных граничных меток
- Числовой ввод осуществляется либо в виде числа, либо в виде числовой строки.

Внешняя библиотека не требуется. Индикатор предназначен только для отображения.

---

##### **Интеграция в VIS или VIS-2**

1. Добавить `JSON Template` виджет для представления.
2. Установите количество дополнительных точек данных равным `1`.
3. Выберите числовую точку исходных данных в разделе **«Точки данных»\[1]** .
4. Входить `gaugevalue` в качестве имени переменной для этой точки данных.
5. Откройте редактор шаблонов и вставьте всё содержимое.[`configurable-gauge-template.ejs`](https://github.com/oweitman/ioBroker.vis-jsontemplate/blob/main/documentation/configurable-gauge-template.ejs) .
6. Предоставьте виджету достаточно места, например, 500 x 310 пикселей.
7. Если цвет фона виджета VIS задан вне шаблона, установите для него прозрачный фон.

С именем переменной `gaugevalue` Идентификатор точки данных доступен в следующем виде: `gaugevalue`, при этом его текущая стоимость доступна как `gaugevalue_value` В шаблоне используется `gaugevalue_value` и принимает число или числовую строку. Основная точка данных JSON и переменная EJS. `data` не используются.

---

##### **Конфигурация**

Все параметры расположены в начале шаблона.

| Вариант                             | Описание                                                                           |
| ----------------------------------- | ---------------------------------------------------------------------------------- |
| `gaugeMin`, `gaugeMax`              | Абсолютный диапазон входных значений представлен значениями от 0 до 100 процентов. |
| `gaugeStartAngle`, `gaugeStopAngle` | Углы дуги: 0 — верхний, 90 — правый, -90 — левый.                                  |
| `gaugeBarWidth`                     | Ширина дуги SVG                                                                    |
| `gaugeBackgroundColor`              | Цвет CSS для неактивной дуги, или `transparent`                                    |
| `gaugeMargin`                       | Свободное пространство вокруг шкалы для обозначения длинных границ.                |
| `gaugeSectors`                      | Массив, содержащий любое количество цветовых диапазонов.                           |
| `showSectorLabels`                  | Отображает или скрывает метки границ секторов.                                     |
| `labelMode`                         | Отображает границы как `absolute` или `percent` ценности                             |
| `gaugeEndLabelGap`                  | Расстояние между горизонтальной дугой и ее обозначениями Min/Max.                  |
| `gaugeMinLabelOffsetX/Y`            | Точная настройка абсолютного минимума метки                                        |
| `gaugeMaxLabelOffsetX/Y`            | Точная настройка абсолютного максимального значения метки                          |
| `showValue`                         | Отображает или скрывает текущее значение.                                          |
| `valueMode`                         | Отображает текущее значение как `absolute` или `percent`                            |
| `valueBoxEnabled`                   | Включает или отключает поле, расположенное за значением.                           |
| `gradientSegments`                  | Количество SVG-элементов, используемых для каждого цветового градиента             |

Каждый сектор имеет `type`, `start`, и `stop` Его тип либо `absolute` или `percent`. Использовать `color` для сплошного сектора или использовать `colorFrom` и `colorTo` для градиента:

```javascript
const gaugeSectors = [
    {
        type: 'absolute',
        start: 0,
        stop: 1280,
        colorFrom: '#70df00',
        colorTo: '#c6ff26',
    },
    {
        type: 'percent',
        start: 25,
        stop: 60,
        color: '#ff9700',
    },
];
```

Отображаются только участки сектора до текущего значения. Остальная часть индикатора использует `gaugeBackgroundColor` Значения в секторе, выходящие за пределы диапазона измерения, безопасно обрезаются.

Когда начальный и конечный углы точно равны `-90` и `90` Абсолютные значения минимального и максимального параметров всегда располагаются непосредственно под левым и правым концами дуги. Эти две метки всегда используют абсолютные значения и форматирование абсолютных меток. Увеличение `gaugeMargin` если для длинных значений или суффиксов требуется больше места по краям виджета.

Использовать `gaugeEndLabelGap` Переместить обе метки ближе или дальше от полосы. Четыре `gaugeMinLabelOffset...` и `gaugeMaxLabelOffset...` Настройки позволяют производить независимую точную регулировку по горизонтали и вертикали. Отрицательные значения Y перемещают метку вверх, положительные значения Y — вниз.

---

##### **форматирование значений**

Использовать `valueDecimals`, `valuePrefix`, `valueSuffixAbsolute`, и `valueSuffixPercent` Для форматирования отображаемого значения. Семейство шрифтов, размер, толщина и цвет управляются соответствующими параметрами. `valueFont...` настройки.

Текущее значение всегда располагается точно по горизонтальному и вертикальному центру всего SVG-изображения. Отдельного режима позиционирования значения нет. Цвет значения по умолчанию — белый. Изменить `valueColor` к темному цвету, например `#222222` когда прозрачный датчик размещен на светлом фоне.

Набор `valueBoxEnabled` к `true` Для отображения значения в настраиваемом поле. Заливка, граница, радиус скругления углов и отступы управляются этим элементом. `valueBox...` настройки.

Для меток границ предусмотрены отдельные настройки шрифта, цвета, десятичных знаков и суффикса.

---

##### **Технические примечания**

- Полная реализация поддерживается в[`configurable-gauge-template.ejs`](https://github.com/oweitman/ioBroker.vis-jsontemplate/blob/main/documentation/configurable-gauge-template.ejs) .
- В выходных данных используется только формат SVG; ни canvas, ни внешние библиотеки не задействованы.
- CSS-селекторы находятся в области видимости ниже. `#<%- widgetid %>`.
- Безопасность скрепления VIS обеспечивается размещением открывающих и закрывающих фигурных скобок на отдельных строках.
- Нет `setInterval()` При этом сериализация данных на стороне клиента не используется.
- В одном представлении можно разместить несколько экземпляров.
- Этот шаблон предназначен только для отображения и не записывает данные в исходную точку данных.