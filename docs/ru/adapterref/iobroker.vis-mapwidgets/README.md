---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-mapwidgets/README.md
title: ioBroker.mapwidgets
hash: RIhavMcA2pv6ER/MXw8Xoui90+vgMlusoFOzBMBPwEU=
---
# IoBroker.mapwidgets
![Логотип](../../../en/adapterref/iobroker.vis-mapwidgets/admin/mapwidgets-small.svg)

![Версия NPM](https://img.shields.io/npm/v/iobroker.vis-mapwidgets.svg)
![Загрузки](https://img.shields.io/npm/dm/ioBroker.vis-mapwidgets.svg)
![Количество установок](https://iobroker.live/badges/vis-mapwidgets-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/vis-mapwidgets-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.vis-mapwidgets.png?downloads=true)

**Тесты:** ![Тестирование и выпуск](https://github.com/oweitman/ioBroker.vis-mapwidgets/workflows/Test%20and%20Release/badge.svg)

## Адаптер mapwidgets для ioBroker
С помощью этого адаптера вы можете отображать различные элементы на карте, используя виджет Leaflet.
Эти элементы можно настроить с помощью структуры данных JSON.

![Полное тестовое изображение](../../../en/adapterref/iobroker.vis-mapwidgets/example/ExampleCompleteTest/ExampleCompleteTest.png) **Пример из полного тестового примера**

В настоящее время поддерживаются следующие элементы:

- Маркеры (пользовательские значки могут быть указаны по ID)
- Иконки
- Полилинии (например, для железнодорожных путей)
- Многоугольники (геометрические фигуры)
- Прямоугольники
- Круги

Для более сложных сценариев использования доступ к объекту карты можно получить через специальную переменную и манипулировать им с помощью JavaScript.

Примеры использования см. в [примеры](./example/example.md)

Дополнительные функции могут быть добавлены по запросу в зависимости от их актуальности и осуществимости.

## Конфигурация
Сам адаптер не имеет никаких параметров конфигурации.

Конфигурация виджета описана ниже.

## Визуализация и виджеты
Следующие виджеты действительно существуют.

- [`Map Leaflet`](#map-leaflet) - Отображает данные карты с помощью библиотеки Leaflet <https://leafletjs.com/>.

### Карта-памятка
Отображение различных элементов на карте.

#### Настройка виджета
| Имя | Описание |
| -------------------------------- | ----------------------------------------------------------------------- |
| `mapwidgets_oid` | Точка данных, содержащая конфигурацию элемента |
| `mapwidgets_lon` | Долгота центра карты |
| `mapwidgets_zoom` | Начальный уровень масштабирования |
| `mapwidgets_expose` | Отобразить объект карты в разделе `window.iobroker.mapwidgets.<widgetID>.map` |
| `mapwidgets_maptheme` | Цветовая схема карты: автоматическая, светлая или темная (по умолчанию: автоматическая) |
| `mapwidgets_daynightenabled` | Включить дневной/ночной режим |
| `mapwidgets_daynightcolor` | Цвет рамки для дневной/ночной зоны |
| `mapwidgets_daynightopacity` | Прозрачность для дневной/ночной зоны |
| `mapwidgets_daynightfillcolor` | Цвет заливки для дневной/ночной зоны |
| `mapwidgets_daynightfillopacity` | Непрозрачность заливки для дневной/ночной зоны |
| `mapwidgets_daynightfillopacity` | Прозрачность заливки для дневной/ночной зоны |

Цветовая схема карты изменяет только отображение тайлов OpenStreetMap. `auto` следует настройкам браузера `prefers-color-scheme` и обновляется при изменении этих настроек. `light` отображает исходные тайлы, а `dark` применяет фильтр темной карты. Маркеры, пути, полигоны и другие наложения Leaflet не фильтруются.

#### Конфигурация карты
Объект карты состоит из нескольких основных компонентов, каждый из которых может быть настроен независимо:

```json
{
    "marker": [],
    "icons": {},
    "polyline": [],
    "polygon": [],
    "rectangle": [],
    "circle": []
}
```

Для целей тестирования см. также [пример\пример.md](example/example.md) для получения дополнительной информации о тестировании.

Для всех конфигураций действует принцип, согласно которому для отображения элемента требуется только необходимый объем информации.

Данные карты проверяются в режиме редактирования. Любые ошибки можно просмотреть с помощью кнопки с красным восклицательным знаком.
Эта кнопка видна только при наличии ошибок.

В Vis диалоговое окно можно открыть обычным способом одним щелчком мыши. В Vis-2 используйте 2 нажатия SHIFT + щелчок.

Кнопка

![Кнопка восклицательного знака](../../../en/adapterref/iobroker.vis-mapwidgets/example/Exclamationmark.png)

Диалог

![Диалоговое окно ошибки](../../../en/adapterref/iobroker.vis-mapwidgets/example/ErrorDialog.png)

Ниже описано присвоение отдельных атрибутов:

##### Маркер
Этот массив содержит информацию об отдельных маркерах.

```json
[
    {
        "latlng": [50.182, 8.682],
        "options": {
            "title": "Default"
        },
        "popup": "<b>Default Marker</b>",
        "tooltip": "Hover me"
    },
    {
        "lat": 50.176,
        "lng": 8.69,
        "options": {
            "draggable": true,
            "title": "Draggable"
        },
        "popup": "Drag me!"
    }
]
```

Широта и долгота обязательны; все остальные параметры необязательны.
Для широты и долготы возможны 2 альтернативных обозначения, см. пример выше.

Для пользовательской иконки уникальный идентификатор указывается в виде строки (см. конфигурацию `icons`).

Для всплывающих подсказок и всплывающих окон см. [[Всплывающая подсказка](#всплывающая подсказка) и [Всплывающее окно]](#popup).

Подробное описание параметров можно найти здесь:

<https://leafletjs.com/reference.html#marker>

##### Икона
Здесь содержится массив объектов, содержащих информацию об отдельных значках.

```json
{
    "greenleaf": {
        "iconUrl": "/vis.0/leaf-green.png",
        "iconSize": [25, 41],
        "iconAnchor": [12, 41],
        "popupAnchor": [1, -34],
        "shadowUrl": "/vis.0/leaf-shadow.png",
        "shadowSize": [41, 41],
        "shadowAnchor": [12, 41]
    },
    "orangeleaf": {
        "iconUrl": "/vis.0/leaf-orange.png",
        "iconSize": [32, 48],
        "iconAnchor": [16, 48],
        "popupAnchor": [0, -40],
        "shadowUrl": "/vis.0/leaf-shadow.png",
        "shadowSize": [50, 50],
        "shadowAnchor": [16, 48]
    }
}
```

`iconURL` является обязательным параметром; все остальные параметры являются необязательными.

Ключевое имя значка (в примере `greenleaf`) чувствительно к регистру, должно быть уникальным в наборе значков и используется в качестве ссылки в маркерах.

Допустимые символы: `a–z, 0–9, _, -.`

Подробное описание параметров можно найти здесь:

<https://leafletjs.com/reference.html#icon>

##### Сломанная линия / Многоугольник / Прямоугольник / Круг
Здесь представлен массив информации об отдельных полилиниях/многоугольниках/прямоугольниках/кругах.
Схема одинакова для всех типов. Различия указаны ниже.

**Полилиния:**

```json
[
    {
        "latlng": [
            [50.2, 8.7],
            [50.2, 8.8],
            [50.3, 8.75]
        ],
        "options": {
            "color": "green",
            "weight": 10
        }
    },
    {
        "latlng": [
            [50.2, 8.8],
            [50.2, 8.9],
            [50.3, 8.85]
        ],
        "options": {
            "color": "blue",
            "weight": 5
        }
    }
]
```

**Многоугольник:**

```json
[
    {
        "latlng": [
            [50.1, 8.7],
            [50.1, 8.8],
            [50.2, 8.75]
        ],
        "options": {
            "color": "green",
            "weight": 10
        }
    }
]
```

**Прямоугольник:**

```json
[
    {
        "latlng": [
            [50.3, 8.7],
            [50.4, 8.8]
        ],
        "options": {
            "color": "yellow",
            "weight": 10
        }
    }
]
```

**Круг:**

```json
[
    {
        "latlng": [50.3, 8.6],
        "options": {
            "radius": 10000,
            "weight": 10,
            "color": "black"
        }
    }
]
```

###### `latlng`
Наличие этого параметра является обязательным для всех типов.

Широта и долгота всегда представляют собой массив из двух элементов [широта, долгота], которые ниже называются координатами (координата в верхнем левом углу и координата в нижнем правом углу).

Полилиния, многоугольник, прямоугольник — это массив координат.
Круг — это всего лишь одна координата.

Полилиния должна состоять как минимум из 2 элементов, многоугольник — как минимум из 3 элементов, а прямоугольник — ровно из 2 элементов.

###### `options`
За исключением объекта Circle, параметр "options" всегда является необязательным.
Для объекта Circle параметр "radius" является обязательным.
Возможность использования отдельного параметра "radius" на уровнях latlng и options, как описано в документации Leaflet, здесь недоступна.

Для всплывающих подсказок и всплывающих окон см. [[Всплывающая подсказка](#всплывающая подсказка) и [Всплывающее окно]](#popup).

Подробное описание параметров можно найти здесь:

<https://leafletjs.com/reference.html#polyline>

<https://leafletjs.com/reference.html#polygon>

<https://leafletjs.com/reference.html#polygon>

<https://leafletjs.com/reference.html#circle>

##### Всплывающая подсказка
Всплывающая подсказка для маркера, многоугольника, прямоугольника, круга.

```json
[
    {
        "lat": 50.182,
        "lng": 8.682,
        "options": {
            "title": "Default"
        },
        "popup": "<b>Default Marker</b>",
        "tooltip": "Hover me"
    },
    {
        "lat": 50.171,
        "lng": 8.695,
        "options": {
            "icon": "orangeleaf",
            "draggable": true,
            "title": "Orange dot (draggable)"
        },
        "tooltip": {
            "text": "Permanent tooltip",
            "options": {
                "permanent": true,
                "offset": [0, -12]
            }
        }
    }
]
```

Всплывающая подсказка может быть определена либо как простая строка, либо как объект с атрибутами "text" и "options".

Подробное описание параметров можно найти здесь:

<https://leafletjs.com/reference.html#tooltip>

##### Неожиданно возникнуть
Всплывающее окно для маркера, многоугольника, прямоугольника, круга.

```json
[
    {
        "lat": 50.182,
        "lng": 8.682,
        "options": {
            "title": "Default"
        },
        "popup": "<b>Default Marker</b>"
    },
    {
        "lat": 50.171,
        "lng": 8.695,
        "options": {
            "icon": "orangeleaf",
            "draggable": true,
            "title": "Orange dot (draggable)"
        },
        "popup": {
            "text": "Popup with offset",
            "options": {
                "offset": [0, -12]
            }
        }
    }
]
```

Всплывающее окно может быть определено либо как простая строка, либо как объект с атрибутами "text" и "options".

Подробное описание параметров можно найти здесь:

<https://leafletjs.com/reference.html#popup>

##### Специальные опции iobroker
Специальные параметры, поддерживаемые только версией Leaflet в ioBroker, реализованы с помощью дополнительного объекта параметров "iobOptions".
Этот объект недействителен для всех типов объектов. Какие параметры действительны для какого типа объекта, описано в соответствующем разделе.

###### FitBounds
Это относится к следующим типам объектов: маркер, многоугольник, ломаная линия, прямоугольник, круг.

Система собирает все точки объектов, определяет минимальную/максимальную ограничивающую рамку вокруг них, вычисляет соответствующий уровень масштабирования, центрирует и масштабирует изображение таким образом, чтобы все выбранные объекты были видны.

**Пример использования функции fitBounds с 3 маркерами:**

```json
{
    "marker": [
        {
            "latlng": [50.2, 8.7],
            "iobOptions": {
                "fitBounds": true
            }
        },
        {
            "latlng": [50.2, 8.6],
            "options": {
                "title": "Default"
            },
            "tooltip": {
                "text": "Default",
                "options": {
                    "permanent": true,
                    "direction": "top"
                }
            },
            "iobOptions": {
                "fitBounds": true
            }
        },
        {
            "latlng": [50.2, 8.8],
            "options": {
                "title": "with Custom Icon",
                "icon": "redleaf"
            },
            "tooltip": {
                "text": "with Custom Icon",
                "options": {
                    "permanent": true,
                    "direction": "bottom"
                }
            },
            "iobOptions": {
                "fitBounds": true
            }
        }
    ],
    "icons": {
        "redleaf": {
            "iconUrl": "/vis.0/leaf-red.png",
            "iconSize": [25, 41],
            "shadowUrl": "/vis.0/leaf-shadow.png",
            "shadowSize": [25, 41],
            "iconAnchor": [14, 39],
            "shadowAnchor": [3, 39],
            "popupAnchor": [50, 50]
        }
    }
}
```

### Хронология местоположения
Виджет **Хронология местоположения** отображает историю местоположения до пяти человек за каждый день. Его дизайн вдохновлен взаимодействием карты и временной шкалы, используемым в мобильных картографических приложениях, но не является копией дизайна какого-либо конкретного приложения.

Каждая настроенная точка отслеживания должна содержать одно объединенное положение в системе координат WGS84:

```text
50.11552,8.68417
```

Для тестирования скопируйте [`example/LocationTimeline/create-example-track.js`](example/LocationTimeline/create-example-track.js) в скрипт адаптера JavaScript. Он создаст настраиваемый примерный день и сохранит исходные позиции в `history.0` – `storeState`.

Для выбранного дня местного календаря виджет запрашивает неагрегированные значения из `history.0`. Границы дня и изменения летнего времени соответствуют часовому поясу браузера. Если история за сегодняшний день недоступна, текущее состояние отображается в виде одного маркера. Данные за предыдущие дни, для которых история отсутствует, остаются пустыми.

Этот виджет удаляет отдельные неправдоподобные скачки GPS-сигнала и группирует расположенные поблизости образцы в группы. Следующие параметры управляют этой обработкой:

- **Расположение временной шкалы**: автоматический режим, рядом с картой или под картой.
- **Цветовая схема** (`timeline_theme`): автоматическая, светлая или темная для

Элементы управления временной шкалой, списки и диалоговые окна.

- **Цветовая схема карты** (`mapwidgets_maptheme`): автоматическая, светлая или темная для

только фрагменты OpenStreetMap

- **Радиус пребывания**: максимальное расстояние между образцами, относящимися к периоду пребывания (по умолчанию 75 м)
- **Минимальный срок пребывания**: минимальная продолжительность пребывания (по умолчанию 10 минут)
- **Максимально допустимая скорость**: пороговое значение для отдельных скачков GPS-сигнала.

(по умолчанию 300 км/ч; `0` отключает фильтр)

Оба варианта цветовой схемы по умолчанию имеют значение `auto` и соответствуют настройке браузера `prefers-color-scheme`. Их можно выбирать независимо, например, для сочетания темного интерфейса временной шкалы со светлыми фрагментами карты. Тема карты не фильтрует линии маршрута, маркеры или другие наложения Leaflet.

В этих состояниях, создаваемых во время установки адаптера, сохраняются известные места и результаты обратного геокодирования:

```text
vis-mapwidgets.0.timeline.places
vis-mapwidgets.0.timeline.geocodingCache
```

В качестве быстрого локального кэша используется IndexedDB. Запись состояния осуществляется в фоновом режиме. Зафиксированное пребывание может быть сохранено как известное место с редактируемой меткой и радиусом.

Найденные места отображаются в виде названия и более короткой строки адреса. Стрелки маршрута указывают направление движения, а маркеры мест стоянки и участки маршрута при нажатии выбирают соответствующую запись в хронологии.

Внешнее обратное геокодирование по умолчанию отключено. При включении конечная точка по умолчанию использует общедоступный API обратного геокодирования Nominatim. Запросы дедуплицируются и сериализуются с интервалом не менее 1,1 секунды между вызовами. Настройте адрес электронной почты контакта и обратите внимание на [Политика использования Nominatim](https://operations.osmfoundation.org/policies/nominatim/).
Координаты местоположения отправляются в настроенный внешний сервис.

### Документация по вспомогательным функциям
В разделе `window.iobroker.mapwidgets` доступны следующие функции. Например:

```js
window.iobroker.mapwidgets.waitForGlobal(...)
window.iobroker.mapwidgets.loadScript(...)
window.iobroker.mapwidgets.loadCSS(...)
```

`loadScript` и `loadCSS` можно использовать для динамической загрузки файлов JavaScript и таблиц стилей CSS, которые могут потребоваться для использования виджетов карты.

`waitForGlobal` можно использовать для ожидания глобальной переменной в `window.`.
Это необходимо, поскольку переменная карты становится доступной только после инициализации виджета карты с помощью vis.js.

#### `loadScript(src, { attrs = {}, timeout = 15000 } = {})`
Динамически загружает внешний JavaScript-файл в текущий документ.

##### Параметры loadScript
- **src** (`string`)

URL-адрес загружаемого JavaScript-файла.

- **attrs** (`object`, optional)

Дополнительные атрибуты для элемента `<script>`. Поддерживаемые ключи:

- `type`: например, `"module"` для загрузки в качестве модуля ES.
- `integrity`: Хэш целостности подресурса (SRI).
- `crossOrigin`: Параметр междоменного доступа (`"anonymous"` или `"use-credentials"`).
- **тайм-аут** (`число`, необязательно, по умолчанию: `15000`)

Максимальное время в миллисекундах, по истечении которого попытка загрузки завершится неудачей.

##### Возвращает loadScript
- **Обещать**

Решает проблему при успешной загрузке скрипта, отклоняет при ошибке или истечении времени ожидания.
Если скрипт уже присутствует в документе, разрешает проблему с помощью `"already-loaded"`.

##### Пример скрипта загрузки
```js
loadScript('https://cdn.example.com/lib.min.js')
    .then(() => {
        console.log('Script loaded!');
    })
    .catch(console.error);
```

#### `loadCSS(href, { attrs = {}, timeout = 15000 } = {})`
Динамически загружает внешнюю таблицу стилей CSS в текущий документ.

##### Параметры загрузки CSS
- **href** (`string`)

URL-адрес загружаемого CSS-файла.

- **attrs** (`object`, optional)

Дополнительные атрибуты для элемента `<link>`. Поддерживаемые ключи:

- `integrity`: Хэш целостности подресурса (SRI).
- `crossOrigin`: Параметр междоменного доступа.
- `media`: Медиа-запрос для условной загрузки

      (например, `"print"`, `"(min-width: 768px)"`).

- **тайм-аут** (`число`, необязательно, по умолчанию: `15000`)

Максимальное время в миллисекундах, по истечении которого попытка загрузки завершится неудачей.

##### Возвращает loadCSS
- **Обещать**

Соответствует условиям успешной загрузки таблицы стилей, отклоняется при ошибке или истечении времени ожидания.
Если таблица стилей уже присутствует в документе, используется значение `"already-loaded"`.

##### Пример загрузки CSS
```js
loadCSS('https://cdn.example.com/theme.css').catch(console.error);
```

#### `waitForGlobal(path, interval = 100, timeout = 0)`
Ожидает, пока станет доступна глобальная переменная (или вложенное свойство `window`).

##### Параметры waitForGlobal
- **путь** (`строка`)

Путь к глобальной переменной, разделённый точками (например, `"jQuery"`, `"MyLib.utils.helper"`).

- **интервал** (`число`, необязательно, по умолчанию: `100`)

Интервал в миллисекундах для проверки переменной.

- **тайм-аут** (`число`, необязательно, по умолчанию: `0`)

Максимальное время ожидания в миллисекундах. `0` означает ожидание бесконечно.

##### Возвращает waitForGlobal
- **Обещать**

После обнаружения объекта процесс завершается с его найденным результатом.
Отклоняется, если время ожидания истекло до того, как объект был найден.

##### Пример waitForGlobal
```html
<script>
    waitForGlobal('iobroker.mapwidgets.w00001.map', 200, 5000)
        .then(map => {
            // map is now available
        })
        .catch(err => console.error(err.message));
</script>
```

## Todo
- будет определено

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.3.3 (2026-08-11)

- remove vis dependency

### 0.3.2 (2026-08-10)

- switch support link to short link service

### 0.3.1 (2026-08-09)

- fix review problems

### 0.3.0 (2026-08-05)

- Added an independent automatic, light, or dark map color scheme to the Map
  Leaflet and Location Timeline widgets.

### 0.2.5 (2026-08-04)

- The dark theme has been adjusted to make the dialog easier to read.

Older entries are in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License

MIT License

Copyright (c) 2026 oweitman <oweitman@gmx.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.