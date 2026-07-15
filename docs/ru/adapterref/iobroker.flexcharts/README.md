---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.flexcharts/README.md
title: ioBroker.flexcharts
hash: 76o0DZZcuwEOPU4zsiT6wpiWJ2rU5y77tKq5tDIEEts=
---
![Логотип](../../../en/adapterref/iobroker.flexcharts/admin/flexcharts-icon-small.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.flexcharts.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.flexcharts.svg)
![Количество установок](https://iobroker.live/badges/flexcharts-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/flexcharts-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.flexcharts.png?downloads=true)

# IoBroker.flexcharts
**Тесты:** ![Тестирование и выпуск](https://github.com/MyHomeMyData/ioBroker.flexcharts/workflows/Test%20and%20Release/badge.svg)

## Адаптер flexcharts для ioBroker
Раскройте весь потенциал [Apache ECharts](https://echarts.apache.org/en/index.html) в ioBroker — без каких-либо ограничений, накладываемых графическим интерфейсом настройки.

**Этот адаптер предназначен для опытных пользователей.** В нем нет пользовательского интерфейса для настройки графиков. Вы определяете графики полностью в коде (JavaScript или Blockly) или в формате JSON, хранящемся в состоянии ioBroker.

Взгляните на [Демонстрационная галерея ECharts](https://echarts.apache.org/examples/en/index.html), чтобы получить представление о том, что возможно.

Примечание: Адаптер еще не тестировался на MacOS.

## Что нового в версии 0.7.2
**Шаблоны, удобные для начинающих, и пошаговое руководство** — делают гибкие диаграммы более доступными для пользователей, которые только начинают работать с ECharts:

— Два новых шаблона, удобных для начинающих: [template6](templates/flexchartsTemplate6.js) (энергетический столбчатый график с данными адаптера истории) и [template7](templates/flexchartsTemplate7.js) (реактивный индикаторный график с автоматическим обновлением SSE)
- Улучшены комментарии и маркеры STEP во всех существующих шаблонах (1–5)
- Новая [вики с пошаговыми инструкциями](https://github.com/MyHomeMyData/ioBroker.flexcharts/wiki): пошаговые инструкции по созданию графиков в реальном времени с нуля — см. [Дополнительные примеры и ресурсы](#further-examples-and-resources)

## Что нового в версии 0.7.1
**Обновление диаграммы SSE без перезагрузки страницы** — при использовании `&sse` диаграмма теперь обновляется на месте, а не перезагружает всю страницу:

- Анимация ECharts плавно работает при каждом обновлении данных.
- Отсутствие мерцания и перестроения графика при обновлении
- Прозрачно работает со всеми существующими URL-адресами `&sse` — никаких изменений не требуется.

## Что нового в версии 0.7.0
**Обновление диаграмм по событию через SSE** — теперь диаграммы обновляются автоматически при изменении исходных данных без необходимости повторного опроса:

— Добавьте `&sse` к URL-адресу диаграммы, чтобы активировать [события, отправляемые сервером](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)
- При использовании `source=state` диаграмма обновляется всякий раз, когда изменяется состояние, указанное параметром `&id=`.
- При использовании `source=script`: добавьте `&triggered=<state_id>`, чтобы указать, какое состояние запускает обновление.

Пример: `http://localhost:8082/flexcharts/echarts.html?source=state&id=0_userdata.0.echarts.chart1&sse`

Полную информацию см. в [Обновление диаграммы по событию (SSE)](#event-triggered-chart-refresh-sse).

## Как это работает
Другие адаптеры графиков ioBroker используют пользовательский интерфейс для настройки содержимого и параметров графика, что обычно ограничивает возможности его отображения. flexcharts использует другой подход:

1. Вы определяете диаграмму как объект JSON (переменная `option` в ECharts) — либо хранящийся в состоянии ioBroker, либо возвращаемый из скрипта JavaScript.
2. Flexcharts передает это определение в Apache ECharts в браузере и отображает его.

Пример — столбчатая диаграмма с накоплением, хранящаяся в качестве значения состояния:

```json
{ "tooltip": {"trigger": "axis","axisPointer": {"type": "shadow"}},
  "legend": {},
  "xAxis": [{"type": "category","data": ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]}],
  "yAxis": [{"type": "value"}],
  "dataZoom": [{"show": true,"start": 0, "end": 100}],
  "series": [
    { "name": "Grid",      "type": "bar", "color": "#a30000", "stack": "Supply",      "data": [8,19,21,50,26,0,36]},
    { "name": "PV",        "type": "bar", "color": "#00a300", "stack": "Supply",      "data": [30,32,20,8,33,21,36]},
    { "name": "Household", "type": "bar", "color": "#0000a3", "stack": "Consumption", "data": [16,12,11,13,14,9,12]},
    { "name": "Heat pump", "type": "bar", "color": "#0000ff", "stack": "Consumption", "data": [22,24,30,20,22,12,25]},
    { "name": "Wallbox",   "type": "bar", "color": "#00a3a3", "stack": "Consumption", "data": [0,15,0,25,23,0,35]}
  ]
}
```

Результат:

![flexcharts_stacked1](https://github.com/user-attachments/assets/7cf6dfab-ddad-4b2f-a1e1-20fa4b876b4c)

## Предварительные условия
Flexcharts работает как веб-расширение. Необходимо установить и запустить [веб-адаптер](https://www.iobroker.net/#en/adapters/adapterref/iobroker.ws/README.md) (`web.0`). В приведенных ниже примерах предполагается использование порта по умолчанию 8082.

## Начиная
### Проверка установки
Откройте этот URL в браузере (замените `localhost` на адрес вашего сервера ioBroker):

`http://localhost:8082/flexcharts/echarts.html?source=state&id=flexcharts.0.info.chart1`

Должна появиться демонстрационная диаграмма. Если это произошло, значит, адаптер работает правильно.

### Вариант источника 1 — состояние ioBroker
`http://localhost:8082/flexcharts/echarts.html?source=state&id=0_userdata.0.echarts.chart1`

flexcharts считывает состояние `0_userdata.0.echarts.chart1` и отображает его как EChart. Создайте это состояние, вставьте приведенный выше пример JSON в качестве его значения, затем откройте URL-адрес.

> **Примечание:** Следующие символы не допускаются в идентификаторах штатов: `: / ? # [ ] @ ! $ & ' ( ) * + , ; = %`

### Вариант источника 2 — JavaScript-скрипт
Это более гибкий подход. flexcharts вызывает ваш скрипт при каждом запросе, и ваш скрипт возвращает определение диаграммы. Дополнительные параметры URL передаются скрипту.

Поддерживается только **javascript.0** (первый экземпляр адаптера JavaScript).

Создайте скрипт:

```javascript
onMessage('flexcharts', (httpParams, callback) => {
    const myJsonParams = (httpParams.myjsonparams ? JSON.parse(httpParams.myjsonparams) : {});
    console.log(`httpParams = ${JSON.stringify(httpParams)}`);
    chart1(result => callback(result));
});

function chart1(callback) {
    const option = {
        tooltip: {trigger: "axis", axisPointer: {type: "shadow"}},
        legend: {},
        xAxis: [{type: "category", data: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]}],
        yAxis: [{type: "value"}],
        dataZoom: [{show: true, start: 0, end: 100}],
        series: [
            {name: "Grid",      type: "bar", color: "#a30000", stack: "Supply",      data: [8,19,21,50,26,0,36]},
            {name: "PV",        type: "bar", color: "#00a300", stack: "Supply",      data: [30,32,20,8,33,21,36]},
            {name: "Household", type: "bar", color: "#0000a3", stack: "Consumption", data: [16,12,11,13,14,9,12]},
            {name: "Heat pump", type: "bar", color: "#0000ff", stack: "Consumption", data: [22,24,30,20,22,12,25]},
            {name: "Wallbox",   type: "bar", color: "#00a3a3", stack: "Consumption", data: [0,15,0,25,23,0,35]}
        ]
    };
    callback(option);
}
```

Запустите скрипт, затем откройте: `http://localhost:8082/flexcharts/echarts.html?source=script`

Имя сообщения по умолчанию — `flexcharts`. Чтобы использовать другое имя, добавьте `&message=mycharts` и соответствующим образом измените `onMessage('mycharts', ...)`.

Дополнительные параметры URL передаются скрипту в разделе `httpParams`:

`http://localhost:8082/flexcharts/echarts.html?source=script&chart=chart1&myjsonparams={"period":"daily"}`

## Расширенные функции
### Функции JavaScript внутри определений диаграмм
Стандарт `JSON.stringify()` удаляет функции из определений диаграмм. Для включения функций (например, пользовательских форматтеров) используйте модуль npm `javascript-stringify`:

1. Добавьте `javascript-stringify` в раздел "Дополнительные модули npm" в конфигурации адаптера JavaScript:

   ![добавить модули npm](../../../en/adapterref/iobroker.flexcharts/add_npm_modules.png)

2. В вашем скрипте: `var strify = require('javascript-stringify');`
3. Замените `callback(option)` на `callback(strify.stringify(option))`

— или для штата: `setState('my_chart_id', strify.stringify(option), true)`

См. [шаблон3](templates/flexchartsTemplate3.js) для рабочего примера использования форматировщика всплывающих подсказок.

> **Примечание по безопасности:** `javascript-stringify` позволяет передавать произвольный код в браузер. Не предоставляйте доступ к ioBroker из Интернета при использовании этого модуля.

### Динамические диаграммы, управляемые событиями
ECharts поддерживает интерактивные диаграммы, которые обновляются в ответ на действия пользователя. См. [Пример использования ECharts (https://echarts.apache.org/examples/en/editor.html?c=dataset-link) и запись экрана с использованием Flexcharts.](dynamic_charts_with_flexcharts.mkv).

Используйте **скрипт в качестве источника** и передавайте определение диаграммы и обработчики событий в виде массива. Пример [Шаблон 4](templates/flexchartsTemplate4.js) демонстрирует это. Ключевые правила:

- Обработчики событий должны использовать `myChart.on("event", function(e){ ... })`
— Обработчик должен быть строкой JavaScript (используйте согласованные кавычки или минифицируйте с помощью [минификатора JS](https://www.toptal.com/developers/javascript-minifier)).
- Передайте все в виде массива: `callback([strify.stringify(option), onEvent1, onEvent2])`

При использовании **состояния в качестве источника** состояние должно представлять собой массив строк в формате JSON. И определение диаграммы, и строки обработчика должны быть допустимыми строками JSON (без переносов строк, только экранированные кавычки внутри). Пример: `flexcharts.0.info.chart3`.

> **Примечание для пользователей, обновляющих версию с v0.4.x:** В версии v0.5.0 переменная параметров диаграммы была переименована с `jsopts` на `option`. Обновите функции обработчика событий соответствующим образом.

> **Примечание по безопасности:** То же, что и выше — не предоставляйте доступ к ioBroker из Интернета при использовании `javascript-stringify`.

### Обновление диаграммы по событию (SSE)
Добавьте `&sse` к любому URL-адресу диаграммы, чтобы включить автоматическое обновление диаграммы через [События, отправляемые сервером](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events). Браузер поддерживает постоянное соединение с сервером и обновляет диаграмму на месте при каждом изменении исходных данных — перезагрузка страницы не требуется, интервал опроса не нужен. Анимация ECharts плавно работает при каждом обновлении.

**С `source=state`:**

Диаграмма обновляется автоматически при каждом изменении состояния, указанного в `&id=`.

```
http://localhost:8082/flexcharts/echarts.html?source=state&id=0_userdata.0.echarts.chart1&sse
```

**С `source=script`:**

Скрипт управляет содержимым диаграммы, поэтому flexcharts не может знать, какое состояние запускает обновление. Укажите это явно с помощью `&triggerid=<state_id>`:

```
http://localhost:8082/flexcharts/echarts.html?source=script&message=mycharts&triggerid=0_userdata.0.echarts.trigger&sse
```

График обновляется всякий раз, когда изменяется `0_userdata.0.echarts.trigger`. Ваш скрипт ioBroker может обновлять это состояние, чтобы отправлять обновления графика в браузер.

**Фильтр дроссельной заслонки и обратной связи:**

По умолчанию (`&sse` без значения) график обновляется не чаще одного раза в 5 секунд (минимум). Передайте число, чтобы установить более длительный минимальный интервал:

```
...&sse=30    → update at most once every 30 seconds
```

Для более точного управления используйте JSON-объект (в формате URL):

```
...&sse={"refresh":10,"ack":true}   → update only on acknowledged state changes, at most every 10 s
...&sse={"ack":false}               → update only on unacknowledged changes (set by script), default interval
```

Изменения состояния, произошедшие в течение интервала регулирования, не теряются — обновление откладывается до следующего допустимого момента.

> **Примечание:** `&sse` и `&refresh` можно комбинировать — SSE запускает обновление на месте при изменении состояния, `&refresh` обеспечивает резервную периодическую перезагрузку страницы.

### Темы оформления (ECharts v6)
Используйте Apache ECharts [Конструктор тем](https://echarts.apache.org/en/theme-builder.html) для создания или изменения тем оформления.

**Использование скрипта в качестве источника:**

1. Скачайте тему из конструктора тем → вкладка "Версия JSON" → Скопировать
2. В вашем скрипте: `const myThemeDefault = <вставьте сюда>`
3. Передайте его как часть массива обратных вызовов:

`callback([JSON.stringify(option), ['default', JSON.stringify(myThemeDefault)]])`

[Шаблон 5](templates/flexchartsTemplate5.js) демонстрирует полное переключение тем оформления, включая темный режим.

**Использование штата в качестве источника:**

Значение состояния должно быть массивом: `[<stringified chart>, ['default', <stringified theme>]]`.
Рабочий пример см. в `flexcharts.0.info.chart4`.

Для тем, отличных от `default` и `dark`, требуется явная активация через `myChart.setTheme(<name>)` внутри функции, управляемой событиями.

**Быстрая попытка:**

```
callback([JSON.stringify(option), ['default', '{"title":{"left":"left"},"color":["#ff715e","#ffaf51","#ffee51","#8c6ac4","#715c87"],"backgroundColor":"rgba(64,64,64,0.5)"}']]);
```

## Шаблоны
| Шаблон | Описание |
|----------|-------------|
| [шаблон1](templates/flexchartsTemplate1.js) | Диаграмма с данными из адаптера истории |
| [шаблон3](templates/flexchartsTemplate3.js) | Столбчатая диаграмма с накоплением, созданная с помощью функции в определении диаграммы |
| [шаблон4](templates/flexchartsTemplate4.js) | Динамическая диаграмма, управляемая событиями |
| [шаблон5](templates/flexchartsTemplate5.js) | Пользовательские темы с динамическим переключением темного режима |
| [шаблон6](templates/flexchartsTemplate6.js) | **Удобно для начинающих:** Обзор энергопотребления — столбчатая диаграмма с накоплением данных из адаптера истории |
| [шаблон7](templates/flexchartsTemplate7.js) | **Удобно для начинающих:** Диаграмма, отображающая текущие значения состояния (аккумулятор, фотоэлектрическая система, тепловой насос, датчики) — реактивные обновления SSE |
| [template7](templates/flexchartsTemplate7.js) | **Удобно для начинающих:** Диаграмма, отображающая текущие значения состояния (аккумулятор, фотоэлектрическая система, тепловой насос, датчики) — реактивные обновления SSE |

## Дополнительные примеры и ресурсы
### Кулинарная книга (пошаговые инструкции)
Впервые работаете с Flexcharts или ECharts? В **[Википедия flexcharts](https://github.com/MyHomeMyData/ioBroker.flexcharts/wiki)** представлены пошаговые инструкции, которые помогут вам создать от статического графика до полностью интерактивной панели мониторинга:

| Статья | Чему вы научитесь |
|---------|---------------|
| [A1 — Диаграмма с областями, расположенными друг над другом](https://github.com/MyHomeMyData/ioBroker.flexcharts/wiki/Cookbook-A1-Stacked-Area-Chart) | Создайте динамический график с автоматическим обновлением SSE; подключите реальные состояния данных с помощью скрипта |
| [A3 — Интерактивные диаграммы](https://github.com/MyHomeMyData/ioBroker.flexcharts/wiki/Cookbook-A3-Interactive-Charts) | Диаграммы, управляемые событиями: круговая диаграмма реагирует на наведение курсора; общие наборы данных, строки обработчиков событий |
| [A3 — Интерактивные диаграммы](https://github.com/MyHomeMyData/ioBroker.flexcharts/wiki/Cookbook-A3-Interactive-Charts) | Диаграммы, управляемые событиями: круговая диаграмма реагирует на наведение курсора; общие наборы данных, строки обработчиков событий |

Планируется публикация новых статей о кулинарных книгах.

### Примеры адаптеров сторонних производителей
- **Адаптер tibberLink:** см. обсуждения [здесь](https://github.com/MyHomeMyData/ioBroker.flexcharts/discussions/67) и [здесь](https://github.com/MyHomeMyData/ioBroker.flexcharts/discussions/66) — tibberLink также использует flexcharts нативно, см. его [документацию](https://github.com/hombach/ioBroker.tibberlink?tab=readme-ov-file#2-using-the-flexcharts-or-fully-featured-echarts-adapter-with-json)
- **адаптер sun2000:** доступна встроенная [интеграция flexcharts](https://github.com/bolliy/ioBroker.sun2000/wiki/Statistk-(statistics)).
- **Серия Viessmann E3** (например, тепловой насос Vitocal 250): [обсуждение на ioBroker.e3oncan](https://github.com/MyHomeMyData/ioBroker.e3oncan/discussions/35)

## Ссылка
Базовый URL: `http://localhost:8082/flexcharts/echarts.html`

| Параметр | Значения | Описание |
|-----------|--------|-------------|
| `source=state` | | Чтение определения диаграммы из состояния ioBroker. Требуется `id`. |
| `id=<state_id>` | | Идентификатор штата для чтения (требуется для `source=state`). |
| `message=<name>` | по умолчанию: `flexcharts` | Название сообщения для `onMessage()` в скрипте. |
| `darkmode` | `on` \| `off` \| `auto` | Темный режим: `on`/без значения = всегда темный, `off` = всегда светлый, `auto` = следовать системным настройкам. |
| `refresh=<n>` | секунд, мин. 5, по умолчанию 60 | Интервал автоматической перезагрузки. Активно только при наличии параметра. |
| `sse` | нет значения | `<n>` | `<json>` | Активировать обновления диаграмм, запускаемые событиями, через Server-Sent Events. Нет значения или `&sse=5`: обновление не чаще, чем каждые 5 секунд (минимум). `&sse=<n>`: минимальное количество секунд между обновлениями. `&sse={"refresh":<n>,"ack":true\|false}`: дополнительная фильтрация по состоянию подтверждения. |
| `triggerid=<state_id>` | | Идентификатор штата, изменения которого следует отслеживать при использовании `source=script` с `&sse`. |
| `themev5` | | Используйте стандартные и темные темы Apache ECharts версии 5 вместо стандартных тем версии 6. |
| `<custom>=<value>` | | Все дополнительные параметры передаются скрипту в `httpParams`. |
| `<custom>=<value>` | | Любые дополнительные параметры передаются скрипту в `httpParams`. |

## Пожертвовать
<a href="https://www.paypal.com/donate/?hosted_button_id=WKY6JPYJNCCCQ"><img src="https://raw.githubusercontent.com/MyHomeMyData/ioBroker.flexcharts/main/admin/bluePayPal.svg" height="40"></a> Если вам понравился этот проект — или вы просто чувствуете себя щедрым, — подумайте о том, чтобы угостить меня пивом. За ваше здоровье! :beers:

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.7.2 (2026-05-07)
* (MyHomeMyData) Added beginner-friendly templates 6 (energy stacked bar chart with history adapter) and 7 (reactive gauge chart with SSE auto-update)
* (MyHomeMyData) Improved comments and STEP markers in templates 1–5
* (MyHomeMyData) Added Wiki with Cookbook articles A1–A3 (step-by-step guides for building live charts)

### 0.7.1 (2026-05-05)
* (MyHomeMyData) Adapter requires node.js >= 22 now
* (MyHomeMyData) SSE now updates chart in place via setOption instead of reloading the page — ECharts animations work correctly on data updates

### 0.7.0 (2026-04-15)
* (MyHomeMyData) Implemented SSE (Server-Sent Events) to support event driven updating of chart

### 0.6.2 (2026-04-13)
* (MyHomeMyData) Restructuring of code for better readability and improved performance.
* (MyHomeMyData) Restructuring of Readme for better readability.

### 0.6.1 (2025-11-01)
* (MyHomeMyData) Added support for dark mode theme of ECharts version 5.6.0 (when using paramter themev5). Based on Apache ECharts 6.

### 0.6.0 (2025-10-19)
* (MyHomeMyData) Updated Apache ECharts to version 6.0.0 using brand new default theme - please take a look to Readme! Ref. issue #125
* (MyHomeMyData) Added option to dynamically switch dark mode by listening to the system's setting. Based on Apache ECharts 6.
* (MyHomeMyData) Added possibility to add self defined themes. Based on Apache ECharts 6.
* (MyHomeMyData) Extended support for definition of onEvent functions. Now an unlimited number of functions can be defined instead of just one.
* (MyHomeMyData) Fixes for issue #132 (repository checker)

### 0.5.0 (2025-09-17)
* (MyHomeMyData) Changed internal naming of chart's options from 'jsopts' to 'option'. If you're using event driven functions within your charts, you may need to adapt the naming accordingly. Pls. refer to Readme.
* (MyHomeMyData) Migration to ESLint 9. Fixes issues #107 (Migration to ESLint 9) and #114 (findings of repository checker)

### Older versions

Older changelog entries are available in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License
MIT License

Copyright (c) 2024-2026 MyHomeMyData <juergen.bonfert@gmail.com>

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

Additional remark:
Source code of [Apache ECharts](https://echarts.apache.org/en/index.html) is used according to [Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0)