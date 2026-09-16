---
chapters: {"pages":{"en/adapterref/iobroker.vis-mapwidgets/README.md":{"title":{"en":"ioBroker.mapwidgets"},"content":"en/adapterref/iobroker.vis-mapwidgets/README.md"},"en/adapterref/iobroker.vis-mapwidgets/example/example.md":{"title":{"en":"Examples for mapwidgets"},"content":"en/adapterref/iobroker.vis-mapwidgets/example/example.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-mapwidgets/example/example.md
title: Примеры использования виджетов карт
hash: PgdqwDtG9KdWLfN6IUjQB5v7iHgeC+I5DZibQ7SKuj0=
---
# Примеры использования виджетов карт

Подготовка к тесту.

Пожалуйста, импортируйте изображения из каталога test-images в /vis.0/

![тестовые изображения в визуальном режиме](../../../../en/adapterref/iobroker.vis-mapwidgets/example/test-images/test-images.png)

## Пример каталога Example3MarkersJSON

Данная точка данных содержит 3 маркера в различных конфигурациях.

Для проверки:

- Создать точку данных типа string в userdata.0.3Marker
- Скопируйте содержимое файла datapoint-userdata.0.3Marker.json в точку данных.
- Импортируйте ZIP-файл проекта в Vis и откройте его.

![Example3MarkersJSON](../../../../en/adapterref/iobroker.vis-mapwidgets/example/Example3MarkersJSON/Example3MarkersJSON.png)

## Пример пути к каталогу (ExamplePathJSON)

Данная точка данных содержит путь во Франкфурте-на-Майне.

Для проверки:

- Создайте точку данных типа string в userdata.0.path
- Скопируйте содержимое файла datapoint-userdata.0.path.json в точку данных.
- Импортируйте ZIP-файл проекта в Vis и откройте его.

![ExamplePathJSON](../../../../en/adapterref/iobroker.vis-mapwidgets/example/ExamplePathJSON/ExamplePathJSON.png)

## Пример каталога ExamplePolygonJSON

Данная точка данных содержит прямоугольники, круги и многоугольники различных типов.

Для проверки:

- Создайте точку данных типа string в userdata.0.polygon
- Скопируйте содержимое файла datapoint-userdata.0.polygon.json в точку данных.
- Импортируйте ZIP-файл проекта в Vis и откройте его.

![ExamplePolygonJSON](../../../../en/adapterref/iobroker.vis-mapwidgets/example/ExamplePolygonJSON/ExamplePolygonJSON.png)

## Пример каталога ExampleButtonFlytoScript

В примере содержится скрипт для изменения элементов управления картой с помощью двух кнопок для полета между Франкфуртом и Нью-Йорком. Также прилагается пример использования функции waitFotGlobal и пользовательских элементов управления картой.

Для проверки:

- Импортируйте ZIP-файл проекта в Vis и откройте его.

![ExampleButtonFlytoScript](../../../../en/adapterref/iobroker.vis-mapwidgets/example/ExampleButtonFlytoScript/ExampleButtonFlytoScript.png)

## Пример каталога ExampleCompleteTest

В примере представлены все тесты в сборе.

Для проверки:

- Создайте точку данных типа string в файле userdata.0.leaflet.
- Скопируйте содержимое файла datapoint-userdata.0.leaflet.json в точку данных.
- Импортируйте ZIP-файл проекта в Vis и откройте его.

![ПримерПолныйТест](../../../../en/adapterref/iobroker.vis-mapwidgets/example/ExampleCompleteTest/ExampleCompleteTest.png)

## Пример каталога ExampleFitBoundsJSON

В этом примере демонстрируется функциональность параметра "fitBounds" с использованием пути. В примере проекта центр карты и уровень масштабирования явно установлены на 0. Однако это поведение переопределяется параметром "fitBounds", который центрирует карту по пути и вычисляет оптимальный уровень масштабирования.

Для проверки:

- Создайте точку данных типа string в userdata.0.fitBounds
- Скопируйте содержимое файла datapoint-userdata.0.fitBounds.json в точку данных.
- Импортируйте ZIP-файл проекта в Vis и откройте его.

![ExampleFitBoundsJSON](../../../../en/adapterref/iobroker.vis-mapwidgets/example/ExampleFitBoundsJSON/ExamplefitBounds.png)

## Пример каталогаПримерПлагинГеокодерСкрипт

Этот пример демонстрирует использование плагинов Leaflet, а также`loadCSS` и`loadScript` функции. В частности, показано, как интегрировать [плагин Leaflet Geocoder](https://github.com/perliedman/leaflet-control-geocoder) . В этом примере не используется точка данных; однако в настройках карты необходимо установить флажок "Expose".

Для проверки:

- Импортируйте ZIP-файл проекта в Vis и откройте его.

После импорта на вкладке «Скрипт» вы найдете следующие сведения.

```javascript
// A separate function is required for using the 'await' keyword. Alternatively, the Promise/then notation must be used.
async function load() {
    // Use try/catch to handle errors in await functions
    try {
        // Load the CSS stylesheet as described in the plugin documentation
        await window.iobroker.mapwidgets.loadCSS(
            'https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.css',
        );
        // Load the javascript as described in the plugin documentation
        await window.iobroker.mapwidgets.loadScript(
            'https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.js',
        );
        // Wait for the map object to be created by the widget. The "Expose" option must be checked in the widget settings.
        let map = await window.iobroker.mapwidgets.waitForGlobal('iobroker.mapwidgets.w00001.map', 200, 5000);
        // // Once the map object is available, the geocoder control can be added to the map.
        new L.Control.Geocoder().addTo(map);
    } catch (e) {
        console.log(e.message);
    }
}
load();
```

![ExamplePluginGeocoderScript](../../../../en/adapterref/iobroker.vis-mapwidgets/example/ExamplePluginGeocoderScript/ExamplePluginGeocoderScript.png)

## Пример пути к каталогу

В этом примере показано, как отобразить путь из истории. Используется поле выбора, реализованное с помощью`jsonTemplate` виджет (из одноименного адаптера),

Вы можете выбрать маршрут для определенной даты из расширенной структуры данных JSON и отобразить его в виджете карты Leaflet.

Расширенная структура данных организована следующим образом:

```json
{
    "2026-07-03T12:00:00.000Z": {
        "map": {}
    },
    "2026-07-04T12:00:00.000Z": {
        "map": {}
    },
    "2026-07-05T12:00:00.000Z": {
        "map": {}
    }
}
```

Любое значение, принятое`new Date()` Можно использовать конструктор (с одним параметром). Например, метку времени JavaScript или строку даты в формате ISO. Для лучшей читаемости рекомендуется использовать формат ISO: <https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Date/Date>

Фактические картографические данные, как описано в документации к адаптеру, содержатся в соответствующих файлах.`map` атрибут.

Все пути должны иметь`fitbounds=true` Настройте параметры таким образом, чтобы карта автоматически выбирала правильную область просмотра и уровень масштабирования (см. пример данных).

Полный пример в формате JSON можно найти в этом файле: [ExamplePathHistoryJSON](https://github.com/oweitman/ioBroker.vis-mapwidgets/blob/main/example/ExamplePathHistory/datapoint.userdata.0.pathhistory.json)

Он`jsonTemplate` Для поля выбора использовался виджет: <https://github.com/oweitman/ioBroker.vis-jsontemplate>

Выберите точку данных, содержащую подготовленную структуру данных. Используйте следующий шаблон:

[jsonTemplate](https://github.com/oweitman/ioBroker.vis-mapwidgets/blob/main/example/ExamplePathHistory/jsonTemplate.txt)

В начале этого шаблона находится локальная точка данных с именем`local_map` При желании его можно настроить, однако в данном примере он должен остаться без изменений.

Наконец, просто разместите виджет Mapwidgets Leaflet и настройте его.`local_map` в качестве точки данных.

![ExamplePathHistory](../../../../en/adapterref/iobroker.vis-mapwidgets/example/ExamplePathHistory/ExamplePathHistory.png)