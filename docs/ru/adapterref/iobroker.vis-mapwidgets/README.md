---
chapters: {"pages":{"en/adapterref/iobroker.vis-mapwidgets/README.md":{"title":{"en":"ioBroker.mapwidgets"},"content":"en/adapterref/iobroker.vis-mapwidgets/README.md"},"en/adapterref/iobroker.vis-mapwidgets/example/example.md":{"title":{"en":"Examples for mapwidgets"},"content":"en/adapterref/iobroker.vis-mapwidgets/example/example.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-mapwidgets/README.md
title: ioBroker.mapwidgets
hash: VouHFWGUKV6ZV4NnQoC0NkMeECQ0yHrju9vFfukmSkc=
---
# ioBroker.mapwidgets

![Версия NPM](https://img.shields.io/npm/v/iobroker.vis-mapwidgets.svg)
![Загрузки](https://img.shields.io/npm/dm/ioBroker.vis-mapwidgets.svg)
![Количество установок](https://iobroker.live/badges/vis-mapwidgets-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/vis-mapwidgets-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.vis-mapwidgets.png?downloads=true)
![Тестирование и выпуск](https://github.com/oweitman/ioBroker.vis-mapwidgets/workflows/Test%20and%20Release/badge.svg)

![Логотип](../../../en/adapterref/iobroker.vis-mapwidgets/admin/mapwidgets-small.svg)

## адаптер mapwidgets для ioBroker

С помощью этого адаптера вы можете отображать различные элементы на карте, используя виджет Leaflet. Эти элементы можно настроить, используя структуру данных JSON.

![Полное тестовое изображение](../../../en/adapterref/iobroker.vis-mapwidgets/example/ExampleCompleteTest/ExampleCompleteTest.png) **Пример из полного тестового примера**

В настоящее время поддерживаются следующие элементы:

- Маркеры (пользовательские значки могут быть указаны по ID)
- Иконки
- Полилинии (например, для обозначения путей)
- Многоугольники (геометрические фигуры)
- Прямоугольники
- Круги

Для более сложных сценариев использования доступ к объекту карты можно получить через специальную переменную и манипулировать им с помощью JavaScript.

Примеры использования см. [в документации.](/#/docs/adapterref/iobroker.vis-mapwidgets/example/example.md)

Дополнительные функции могут быть добавлены по запросу в зависимости от их актуальности и осуществимости.

## Конфигурация

Сам адаптер не имеет никаких параметров конфигурации.

Конфигурация виджета описана ниже.

## визуализация и виджеты

Следующие виджеты действительно существуют.

- [`Map Leaflet`](#map-leaflet) - Отображает данные карты с помощью библиотеки Leaflet <https://leafletjs.com/> .

### Информационный буклет с картой

Отображение различных элементов на карте.

#### Настройка виджета

| Имя                              | Описание                                                                                |
| -------------------------------- | --------------------------------------------------------------------------------------- |
| `mapwidgets_oid`                 | Точка данных, содержащая конфигурацию элемента.                                         |
| `mapwidgets_lat`                 | Широта центра карты                                                                     |
| `mapwidgets_lon`                 | Долгота центра карты                                                                    |
| `mapwidgets_zoom`                | Начальный уровень масштабирования                                                       |
| `mapwidgets_expose`              | Отобразить объект карты под `window.iobroker.mapwidgets.<widgetID>.map`                 |
| `mapwidgets_maptheme`            | Цветовая схема карты: автоматическая, светлая или темная (по умолчанию: автоматическая) |
| `mapwidgets_daynightenabled`     | Включить дневной/ночной режим                                                           |
| `mapwidgets_daynightcolor`       | Цвет рамки для дневной/ночной зоны                                                      |
| `mapwidgets_daynightopacity`     | Непрозрачность для дневной/ночной зоны                                                  |
| `mapwidgets_daynightfillcolor`   | Цвет заливки для зоны дня/ночи                                                          |
| `mapwidgets_daynightfillopacity` | Непрозрачность заливки для дневной/ночной зоны                                          |

Изменение цветовой схемы карты влияет только на отображение тайлов OpenStreetMap.`auto` соответствует настройкам браузера`prefers-color-scheme` Эта настройка обновляется при её изменении.`light` отображает оригинальные плитки, в то время как`dark` Применяется фильтр «темная карта». Маркеры, пути, полигоны и другие элементы наложения Leaflet не фильтруются.

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

Для целей тестирования также см. [файл example\example.md](/#/docs/adapterref/iobroker.vis-mapwidgets/example/example.md) , содержащий дополнительные тестовые материалы.

Для всех конфигураций действует принцип, согласно которому для отображения элемента требуется только необходимый объем информации.

Проверка картографических данных осуществляется в режиме редактирования. Любые ошибки можно просмотреть с помощью кнопки с красным восклицательным знаком. Эта кнопка видна только при наличии ошибок.

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

Широта и долгота обязательны; все остальные параметры необязательны. Возможны 2 альтернативных варианта обозначения широты и долготы, см. пример выше.

Для пользовательской иконки уникальный идентификатор указывается в виде строки (см.`icons` конфигурация).

Информацию о всплывающих подсказках и всплывающих окнах см. в разделе «Всплывающие [подсказки](#tooltip) и [всплывающие окна»](#popup) .

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

`iconURL` Этот параметр является обязательным; все остальные параметры являются необязательными.

Ключевое имя значка (в примере,`greenleaf` ) чувствителен к регистру, должен быть уникальным в наборе значков и используется в качестве ссылки в маркерах.

Допустимые символы:`a–z, 0–9, _, -.`

Подробное описание параметров можно найти здесь:

<https://leafletjs.com/reference.html#icon>

##### Сломанная линия / Многоугольник / Прямоугольник / Круг

Этот массив содержит информацию об отдельных полилиниях, многоугольниках, прямоугольниках и окружностях. Схема одинакова для всех типов. Различия указаны ниже.

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

Широта и долгота всегда представляют собой массив из двух элементов \[широта, долгота], которые ниже называются координатами (координата в верхнем левом углу и координата в нижнем правом углу).

Полилиния, многоугольник, прямоугольник — это массив координат. Круг — это всего лишь одна координата.

Полилиния должна состоять как минимум из 2 элементов, многоугольник — как минимум из 3 элементов, а прямоугольник — ровно из 2 элементов.

###### `options`

За исключением объекта Circle, параметр "options" всегда является необязательным. Для объекта Circle параметр "radius" является обязательным. Возможность использования отдельного параметра "radius" на уровнях latlng и options, как описано в документации Leaflet, здесь недоступна.

Информацию о всплывающих подсказках и всплывающих окнах см. в разделе «Всплывающие [подсказки](#tooltip) и [всплывающие окна»](#popup) .

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

##### специальные опции iobroker

Специальные параметры, поддерживаемые только версией Leaflet в ioBroker, реализованы с помощью дополнительного объекта параметров "iobOptions". Этот объект недействителен для всех типов объектов. Какие параметры действительны для какого типа объекта, описано в соответствующем разделе.

###### fitBounds

Это относится к следующим типам объектов: маркер, многоугольник, ломаная линия, прямоугольник, круг.

Система собирает все точки объектов, определяет минимальную/максимальную ограничивающую рамку вокруг них, вычисляет соответствующий уровень масштабирования, центрирует и масштабирует изображение таким образом, чтобы все выбранные объекты были видны.

**Пример использования функции fitBounds с тремя маркерами:**

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

Виджет **«Хронология местоположения»** отображает историю местоположения до пяти человек за каждый день. Его дизайн вдохновлен взаимодействием карты и временной шкалы, используемым в мобильных картографических приложениях, но не является копией дизайна какого-либо конкретного приложения.

Каждая настроенная точка отслеживания должна содержать одно объединенное положение в системе координат WGS84:

```text
50.11552,8.68417
```

Для тестирования скопируйте[`example/LocationTimeline/create-example-track.js`](https://github.com/oweitman/ioBroker.vis-mapwidgets/blob/main/example/LocationTimeline/create-example-track.js) в JavaScript-адаптерный скрипт. Он создает настраиваемый примерный день и сохраняет исходные позиции в`history.0` через`storeState` .

Для выбранного местного календарного дня виджет запрашивает неагрегированные значения из`history.0` Границы дня и переход на летнее время соответствуют часовому поясу браузера. Если история за сегодняшний день отсутствует, текущее состояние отображается в виде одного маркера. Данные за предыдущие дни, для которых отсутствует история, остаются пустыми.

Этот виджет удаляет отдельные неправдоподобные скачки GPS-сигнала и группирует расположенные поблизости образцы в группы. Следующие параметры управляют этой обработкой:

- **Расположение временной шкалы** : автоматическое, рядом с картой или под картой.
- **Цветовая схема** (`timeline_theme` ): автоматический, светлый или темный режим для элементов управления временной шкалой, списка и диалоговых окон.
- **Цветовая схема карты** (`mapwidgets_maptheme` ): автоматический, светлый или темный режим только для тайлов OpenStreetMap
- **Радиус пребывания** : максимальное расстояние между образцами, относящимися к периоду пребывания (по умолчанию 75 м).
- **Минимальный срок пребывания** : минимальная продолжительность пребывания (по умолчанию 10 минут).
- **Максимальная допустимая скорость** : пороговое значение для отдельных скачков GPS (по умолчанию 300 км/ч;`0` (отключает фильтр)

В обоих вариантах цветовой схемы по умолчанию используется...`auto` и следуйте инструкциям браузера.`prefers-color-scheme` Настройки. Их можно выбирать независимо, например, для сочетания темного интерфейса временной шкалы со светлыми фрагментами карты. Тема карты не фильтрует линии маршрута, маркеры или другие наложения Leaflet.

В этих состояниях, создаваемых во время установки адаптера, сохраняются известные места и результаты обратного геокодирования:

```text
vis-mapwidgets.0.timeline.places
vis-mapwidgets.0.timeline.geocodingCache
```

В качестве быстрого локального кэша используется IndexedDB. Запись состояния осуществляется в фоновом режиме. Зафиксированное пребывание может быть сохранено как известное место с редактируемой меткой и радиусом.

Найденные места отображаются в виде названия и более короткой строки адреса. Стрелки маршрута указывают направление движения, а маркеры мест стоянки и участки маршрута при нажатии выбирают соответствующую запись в хронологии.

Внешнее обратное геокодирование по умолчанию отключено. При включении конечная точка по умолчанию использует общедоступный API обратного геокодирования Nominatim. Запросы дедуплицируются и сериализуются с интервалом не менее 1,1 секунды между вызовами. Настройте адрес электронной почты контакта и соблюдайте [политику использования Nominatim](https://operations.osmfoundation.org/policies/nominatim/) . Координаты местоположения отправляются в настроенный внешний сервис.

### Документация по вспомогательным функциям

В рамках данного пакета доступны следующие функции.`window.iobroker.mapwidgets` . Например:

```js
window.iobroker.mapwidgets.waitForGlobal(...)
window.iobroker.mapwidgets.loadScript(...)
window.iobroker.mapwidgets.loadCSS(...)
```

`loadScript` и`loadCSS` Его можно использовать для динамической загрузки файлов JavaScript и таблиц стилей CSS, что может потребоваться для использования виджетов карты.

`waitForGlobal` можно использовать для ожидания глобальной переменной в`window.` Это необходимо, поскольку переменная map становится доступной только после инициализации виджета map с помощью vis.js.

#### `loadScript(src, { attrs = {}, timeout = 15000 } = {})`

Динамически загружает внешний JavaScript-файл в текущий документ.

##### Параметры loadScript

- **src** (`string` )\
  &#x20;URL-адрес загружаемого JavaScript-файла.
- **атрибуты** (`object` , необязательный)\
  &#x20;Дополнительные атрибуты для`<script>` элемент. Поддерживаемые ключи:
  - `type` например`"module"` загрузить как модуль ES.
  - `integrity` : Хэш целостности подресурса (SRI).
  - `crossOrigin` : Настройка междоменных запросов (`"anonymous"` или`"use-credentials"` ).
- **таймаут** (`number` , необязательно, по умолчанию:`15000` )\
  &#x20;Максимальное время в миллисекундах, по истечении которого попытка загрузки завершится неудачей.

##### Возвращает loadScript

- **Обещать**\
  &#x20;Решает проблему при успешной загрузке скрипта, отклоняет при ошибке или истечении времени ожидания. Если скрипт уже присутствует в документе, разрешает проблему следующим образом:`"already-loaded"` .

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

- **href** (`string` )\
  &#x20;URL-адрес загружаемого CSS-файла.
- **атрибуты** (`object` , необязательный)\
  &#x20;Дополнительные атрибуты для`<link>` элемент. Поддерживаемые ключи:
  - `integrity` : Хэш целостности подресурса (SRI).
  - `crossOrigin` : Настройка междоменных запросов.
  - `media` : Медиа-запрос для условной загрузки (например)`"print"` ,`"(min-width: 768px)"` ).
- **таймаут** (`number` , необязательно, по умолчанию:`15000` )\
  &#x20;Максимальное время в миллисекундах, по истечении которого попытка загрузки завершится неудачей.

##### Возвращает loadCSS

- **Обещать**\
  &#x20;Решает проблему при успешной загрузке таблицы стилей, отклоняет при ошибке или истечении времени ожидания. Если таблица стилей уже присутствует в документе, разрешает проблему с помощью`"already-loaded"` .

##### Пример загрузки CSS

```js
loadCSS('https://cdn.example.com/theme.css').catch(console.error);
```

#### `waitForGlobal(path, interval = 100, timeout = 0)`

Ожидает подтверждения глобальной переменной (или вложенного свойства).`window` ) станет доступен.

##### Параметры waitForGlobal

- **путь** (`string` )\
  &#x20;Путь к глобальной переменной, разделённый точками (например)`"jQuery"` ,`"MyLib.utils.helper"` ).
- **интервал** (`number` , необязательно, по умолчанию:`100` )\
  &#x20;Интервал в миллисекундах для проверки переменной.
- **таймаут** (`number` , необязательно, по умолчанию:`0` )\
  &#x20;Максимальное время ожидания в миллисекундах.`0` Это означает ждать неопределенное время.

##### Возвращает waitForGlobal

- **Обещать**\
  &#x20;После обнаружения объекта происходит его обработка.\
  &#x20;Отклоняет запрос, если время ожидания истекло до того, как объект был найден.

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

## Все

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

Older entries are in [CHANGELOG_OLD.md](https://github.com/oweitman/ioBroker.vis-mapwidgets/blob/main/CHANGELOG_OLD.md).

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