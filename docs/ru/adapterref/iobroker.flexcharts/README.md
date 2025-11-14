---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.flexcharts/README.md
title: ioBroker.flexcharts
hash: B0rBGSntv+Ju2U5qKM7ggjfK+HoJx55myfnP3C/Ghc4=
---
![Логотип](../../../en/adapterref/iobroker.flexcharts/admin/flexcharts-icon-small.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.flexcharts.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.flexcharts.svg)
![Количество установок](https://iobroker.live/badges/flexcharts-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/flexcharts-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.flexcharts.png?downloads=true)

# IoBroker.flexcharts
**Тесты:** ![Тестирование и выпуск](https://github.com/MyHomeMyData/ioBroker.flexcharts/workflows/Test%20and%20Release/badge.svg)

## Адаптер flexcharts для ioBroker
# Срочные новости
**Выпущена версия Apache ECharts 6.0.0 с 12 крупными обновлениями.** Подробности см. по адресу https://echarts.apache.org/handbook/en/basics/release-note/v6-feature.

Flexcharts v0.6.0 основан на этой новой версии и предлагает новые функции:

* совершенно новая тема по умолчанию
* возможность передавать неограниченное количество собственных тем
* динамическое переключение тем, типичный сценарий — прослушивание темного режима системы и динамическая настройка темы диаграммы (для активации добавьте http-параметр `&darkmode=auto`)
* новые типы диаграмм
* возможность передачи неограниченного количества событийно-управляемых функций

**Примечание:** Вы можете использовать **темы ECharts v5** (стандартную и тёмную), просто добавив http-параметр `&themev5`, например, `http://localhost:8082/flexcharts/echarts.html?source=state&id=flexcharts.0.info.chart1&themev5`. Apache предлагает светлую тему v5, но нет тёмной — я уже сообщал о проблеме. На данный момент я сам создал тёмную тему v5 на основе тёмной темы Apache для версии 5.6.0. Если вы заметили разницу между темами v5, пожалуйста, сообщите о проблеме для flexcharts.

# Основная концепция
Для просмотра диаграмм в ioBroker доступно несколько адаптеров. Насколько мне известно, все они используют пользовательский интерфейс для настройки содержимого и параметров диаграмм. Как правило, не все функции используемой графической подсистемы можно использовать таким образом. Например, с помощью eChart-Adapter невозможно просматривать полнофункциональные диаграммы с накоплением.

Этот адаптер использует другой подход. Он реализует практически весь набор функций [Apache ECharts](https://echarts.apache.org/en/index.html) для ioBroker. Взгляните на [демонстрационные графики]](https://echarts.apache.org/examples/en/index.html).

Примечание: Адаптер пока не тестировался на MacOS.

**Интерфейс для настройки диаграммы отсутствует.** Вам необходимо определить диаграмму самостоятельно, а адаптер позаботится о визуализации. Необходимо предоставить определение и содержимое диаграммы в виде JSON-объекта — в примерах eCharts это соответствует содержимому переменной `option`. Вот пример для наглядности. Чтобы создать диаграмму с накоплением, её определение сохраняется в состоянии ioBroker (формат JSON):

```
{ "tooltip": {"trigger": "axis","axisPointer": {"type": "shadow"}},
  "legend": {},
  "xAxis": [{"type": "category","data": ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]}],
  "yAxis": [{"type": "value"}],
  "dataZoom": [{"show": true,"start": 0, "end": 100}],
  "series": [
    { "name": "Grid", "type": "bar", "color": "#a30000", "stack": "Supply",
      "data": [8,19,21,50,26,0,36]},
    { "name": "PV", "type": "bar", "color": "#00a300", "stack": "Supply",
      "data": [30,32,20,8,33,21,36]},
    { "name": "Household", "type": "bar", "color": "#0000a3", "stack": "Consumption",
      "data": [16,12,11,13,14,9,12]},
    { "name": "Heat pump", "type": "bar", "color": "#0000ff", "stack": "Consumption",
      "data": [22,24,30,20,22,12,25]},
    { "name": "Wallbox", "type": "bar", "color": "#00a3a3", "stack": "Consumption",
      "data": [0,15,0,25,23,0,35]}
  ]
}
```

Затем адаптер flexchart отобразит следующую диаграмму:

![flexcharts_stacked1](https://github.com/user-attachments/assets/7cf6dfab-ddad-4b2f-a1e1-20fa4b876b4c)

Обычно для создания и обновления содержимого этого состояния используется Blockly или JavaScript.

Существует ещё один способ передать данные eCharts напрямую через функцию обратного вызова в JavaScript. Подробнее см. ниже.

Для ясности: этот подход не предназначен для быстрого создания простой диаграммы.
Но если у вас есть идея для более сложной диаграммы, Flexcharts предлагает возможность её реализовать.

# Начиная
### Использование адаптера
Этот адаптер реализует свою функциональность как веб-расширение. Поэтому обязательно установите и запустите [веб-адаптер](https://www.iobroker.net/#en/adapters/adapterref/iobroker.ws/README.md) (`web.0`). В этом файле readme предполагается, что вы используете стандартный порт 8082 для веб-адаптера.

Когда адаптер flexcharts активен, вы можете получить к нему доступ через http://localhost:8082/flexcharts/echarts.html (замените `localhost` на адрес вашего сервера ioBroker).

Вы можете использовать этот адрес в виджетах iFrame vis, jarvis или других визуализациях. Конечно, вы также можете использовать его непосредственно во вкладке браузера.

Для этого необходимо предоставить адаптеру дополнительные параметры, указывающие источник данных. Доступны два варианта:

* `source=state` => Вы предоставляете данные диаграммы в состоянии ioBroker (json)
* `source=script` => Вы предоставляете данные диаграммы через скрипт (javascript или блочный)

Доступны дополнительные опции, см. [справочный раздел](#reference)

Для проверки правильности установки адаптера используйте встроенную демонстрационную диаграмму: http://localhost:8082/flexcharts/echarts.html?source=state&id=flexcharts.0.info.chart1

### Использовать состояние ioBroker как источник для eChart
Пример: `http://localhost:8082/flexcharts/echarts.html?source=state&id=0_userdata.0.echarts.chart1`

<!-- Would this be better to read: Example: http://localhost:8082/flexcharts/echarts.html?<mark style="background-color: #ffff00">source=state</mark>&<mark style="background-color: #00c000">&id=0_userdata.0.echarts.chart1</mark> -->

Flexcharts будет оценивать состояние `0_userdata.0.echarts.chart1` как данные для eChart. Попробуйте: создайте такое состояние и скопируйте JSON-данные из примера выше (`{ "tooltip": { ...`) в качестве содержимого состояния, а затем откройте указанный адрес в браузере.

В идентификаторе штата не допускается использование следующих символов: `: / ? # [ ] @ ! $ & ' ( ) * + , ; = %`

### Используйте JavaScript в качестве источника для электронной диаграммы
Это немного сложнее, но гораздо эффективнее и гибче. Данные для диаграмм предоставляются непосредственно вашим JS-скриптом, который динамически вызывается адаптером Flexcharts. Вы можете передать скрипту дополнительные параметры, добавив их к http-адресу, например, `&chart=chart1`. Все http-параметры доступны внутри скрипта в объекте `httpParams` (см. пример ниже).

Опять же, лучше объяснить на примере. Создайте скрипт со следующим содержимым (поддерживается только первый экземпляр JS (**javascript.0**), имя скрипта не имеет значения):

```
onMessage('flexcharts', (httpParams, callback) => {
    const myJsonParams  = (httpParams.myjsonparams ? JSON.parse(httpParams.myjsonparams) : {} );
    console.log(`httpParams = ${JSON.stringify(httpParams)}`);
    console.log(`myJsonParams = ${JSON.stringify(myJsonParams)}`);
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
            { name: "Grid", type: "bar", color: "#a30000", stack: "Supply",
              data: [8,19,21,50,26,0,36]},
            { name: "PV", type: "bar", color: "#00a300", stack: "Supply",
            data: [30,32,20,8,33,21,36]},
            { name: "Household", type: "bar", color: "#0000a3", stack: "Consumption",
            data: [16,12,11,13,14,9,12]},
            { name: "Heat pump", type: "bar", color: "#0000ff", stack: "Consumption",
            data: [22,24,30,20,22,12,25]},
            { name: "Wallbox", type: "bar", color: "#00a3a3", stack: "Consumption",
            data: [0,15,0,25,23,0,35]}
        ]
    };
    callback(option);
}
```

Запустите скрипт и перейдите по этому адресу в браузере: `http://localhost:8082/flexcharts/echarts.html?source=script`

<!-- Would this be better to read: Start the script and access this in a browser: http://localhost:8082/flexcharts/echarts.html?<mark style="background-color: #ffff00">source=script</mark> -->

Должна появиться та же диаграмма, что и в предыдущем примере.

Вы должны получить две записи в журнале примера скрипта:

```
httpParams = {"message":"mylinechart","source":"script"}
myJsonParams = {}
```

Дополнительные параметры можно передать в скрипт. Они будут доступны в нём в переменной `httpParams`. Попробуйте следующую команду: `http://localhost:8082/flexcharts/echarts.html?source=script&chart=chart1&myjsonparams={"period":"daily"}`

Теперь записи журнала должны выглядеть так:

```
httpParams = {"source":"script","chart":"chart1","myjsonparams":"{\"period\":\"daily\"}"}`
myJsonParams = {"period":"daily"}
```

Обратите внимание: **для получения триггера от адаптера необходимо использовать функцию `onMessage()`**. Значение по умолчанию для сообщения — `flexcharts`, как показано в примере выше. Вы можете использовать другие сообщения, указав дополнительный параметр. Например, чтобы использовать сообщение `mycharts`, добавьте `&message=mycharts` к http-адресу: `http://localhost:8082/flexcharts/echarts.html?source=script&message=mycharts`

### Использование функций в определении диаграммы
К сожалению, определения функций в определении диаграммы обычно не работают, поскольку они фильтруются при использовании `JSON.stringify(option)` или `callback(option)`.

Однако, начиная с версии flexcharts V0.3.0, это стало возможным. Потребуется немного больше усилий:

* Добавьте модуль npm `javascript-stringify` к экземпляру 0 адаптера JavaScript. Для этого добавьте `javascript-stringify` в раздел «Дополнительные модули npm» в настройках адаптера:

![добавить модули npm](../../../en/adapterref/iobroker.flexcharts/add_npm_modules.png)

* В вашем скрипте добавьте `var strify = require('javascript-stringify');` в начале
* При использовании скрипта в качестве источника данных: в функциональности `onMessage()` замените `callback(option);` на `callback(strify.stringify(option));` (предполагая, что `option` содержит определение вашей диаграммы).
* Затем используйте состояние в качестве источника данных: при создании состояния замените `setState('my_chart_id', JSON.stringify(option), true);` на `setState('my_chart_id', strify.stringify(option), true);`
* Вот и всё. Теперь функции в определениях диаграмм будут корректно перенаправляться во flexcharts.

Попробуйте использовать [шаблон3](templates/flexchartsTemplate3.js). Функция используется для отображения данных подсказки с двумя знаками после запятой: `tooltip: {trigger: "axis", valueFormatter: (value) => '. + value.toFixed(2)}`.

Пример определения диаграммы через состояние приведён в `flexcharts.0.info.chart2`. В этом случае будет показана та же диаграмма, что и в template3.

Примечание: При установке модуля npm `javascript-stringify` его функционал может быть использован вредоносным кодом (Cross-Site-Scripting). Поэтому при использовании этого модуля ioBroker не должен быть доступен из Интернета.

### Использование событийно-управляемых функций для создания динамически изменяющихся диаграмм
Apache ECharts поддерживает динамически изменяемые диаграммы. Взгляните на это [пример](https://echarts.apache.org/examples/en/editor.html?c=dataset-link). При наведении указателя мыши на точку данных линейной диаграммы круговая диаграмма обновляется соответствующим образом.
Вот запись экрана этой диаграммы, созданной с помощью Flexcharts: [динамически меняющийся график](dynamic_charts_with_flexcharts.mkv)

**Важное замечание** при обновлении Flexcharts до версии **0.5.0**: если вы используете эту функцию и хотите динамически изменять параметры диаграммы в своей событийно-управляемой функции, вам необходимо обратиться к этой переменной через переменную `jsopts`. Начиная с версии 0.5.0 и выше, это имя изменилось на `option`. Пожалуйста, измените название функции соответствующим образом, например, замените `jsopts` на `option`.

Чтобы использовать функции, управляемые событиями, в ваших собственных диаграммах, рекомендую использовать **скрипт в качестве источника**. [Шаблон 4](templates/flexchartsTemplate4.js) демонстрирует реализацию. Обратите внимание на следующее:

* Чтобы сделать диаграмму динамической, необходимо определить функциональность для обработки событий внутри диаграммы. Это делается с помощью определения функций типа `myChart.on("event",function(e){ ... });`
* Обязательно называть каждую из этих функций `myChart.on()`
* Для передачи определения функции во flexcharts его необходимо преобразовать в **строку Javascript**. Это можно сделать, последовательно используя кавычки (`"`) внутри функции, а затем заключив её в апострофы (`'`) — или наоборот. Для уменьшения занимаемого пространства можно использовать компактификатор, например [этот](https://www.toptal.com/developers/javascript-minifier).
* Наконец, необходимо предоставить все части, определение диаграммы и определение функции(й) события, в виде **массива строк Javascript** через функцию обратного вызова. В шаблоне 4 это реализовано как `callback([strify.stringify(option), onEvent]);`, где `option` содержит определение диаграммы, а `onEvent` — определение функции события в виде строки Javascript. Если вы определяете более одной функции, вы можете включить её в строку `onEvent` или добавить как дополнительный элемент массива, например, `callback([strify.stringify(option), onEvent1, onEvent2, onEvent3]);`. Количество определений функций не ограничено.
* Чтобы преобразовать определение диаграммы в строку (`option`), необходимо использовать `javascript-stringify`, как описано в предыдущей главе.

Примечание: При установке модуля npm `javascript-stringify` его функционал может быть использован вредоносным кодом (Cross-Site-Scripting). Поэтому при использовании этого модуля ioBroker не должен быть доступен из Интернета.

Эту функцию также можно использовать, используя **штат как источник** данных. Однако это ещё сложнее:

* Состояние должно быть представлено в виде **массива строк JSON**. Два элемента массива включают определение диаграммы и определение функций событий.
* Но теперь обе строки должны быть корректными **строками JSON**. Это отличается от строк Javascript и накладывает дополнительные ограничения:
* Для заключения строки в кавычки необходимо использовать кавычки. Поэтому внутри строки допускаются только апострофы или экранированные кавычки (`\"`).
* Внутри строки не допускается новая строка.
* Рекомендуется убедиться в корректности массива, используя JSON-валидатор, например [этот](https://jsonformatter.curiousconcept.com/#).
* Конечно, вы хотите манипулировать данными диаграммы. Но данные являются частью определения диаграммы. Поэтому вам придётся читать и записывать массив строк JSON с помощью JavaScript. Поэтому я рекомендую использовать скрипт в качестве источника данных, как описано выше.
* Однако пример доступен в разделе информации flexcharts: `flexcharts.0.info.chart3`. Для просмотра в браузере используйте `http://localhost:8082/flexcharts/echarts.html?source=state&id=flexcharts.0.info.chart3`

### Работа с темами Apache EChart (функция v6)
ECharts предлагает несколько вариантов настройки диаграмм. Эффективным методом является использование тем. По умолчанию в обычном режиме используется тема «default», а в тёмном — тема «dark». Эти темы предопределены, но их можно изменить.
Flexcharts версии 0.6.0 и более поздних версий поддерживает определение тем. Кроме того, в сочетании с определением событийно-управляемых функций (см. предыдущую главу) возможно динамическое переключение между темами.
Лучший способ создания или изменения тем — использовать Apache ECharts [Конструктор тем](https://echarts.apache.org/en/theme-builder.html).

Чтобы передать тему во Flexcharts, используя **скрипт в качестве источника**, выполните следующие действия:

* на сайте «Конструктор тем» выберите или измените тему, затем нажмите кнопку «Загрузить»
* выберите вкладку «Версия JSON» и скопируйте содержимое в буфер обмена, нажав кнопку «Копировать»
* добавьте что-то вроде `const myThemeDefault = ` в ваш скрипт и вставьте буфер обмена позади
* передайте тему в flexcharts, используя массив, как показано для функций, управляемых событиями: `callback([JSON.stringify(option), ['default', JSON.stringify(myThemeDefault)]]);`
* пожалуйста, обратите внимание: тему необходимо передать как массив строк `[<название темы>, <строковое определение темы>]`

[Шаблон 5](templates/flexchartsTemplate5.js) демонстрирует реализацию передачи новых тем для стандартного (тема «default») и тёмного режима (тема «dark»). Активировано динамическое переключение между темами в зависимости от системных настроек.

Чтобы использовать **государство как источник** для передачи тем:

* создать состояние в формате «массив»
* добавить определение диаграммы как первый элемент массива
* Подготовьте тему(ы) как строковый JSON-объект. Используйте JSON-форматер, например https://jsonformatter.curiousconcept.com/ с шаблоном 'compact', чтобы сжать JSON-объект до строки.
* добавить тему как 2-й элемент к состоянию как массив (см. выше): `[<название темы>, <определение темы>]`
* Наконец, состояние должно выглядеть так: `[<строковое определение диаграммы>,['default', <строковое определение темы по умолчанию>]]`.
* пример доступен по адресу `flexcharts.0.info.chart4` (только на вновь установленном экземпляре).

Количество определений тем не ограничено. Однако для активации тем с названиями, отличными от «default» или «dark», необходимо определить собственную функциональность, содержащую выражение `myChart.setTheme(<name of theme>);` и код для её вызова при определённом условии.

**Попробуйте:**

* Создайте простую диаграмму на основе [этого примера](https://echarts.apache.org/examples/en/editor.html?c=area-stack)
* для передачи данных в Flexcharts используйте `callback(JSON.stringify(option));`
* Теперь внесем некоторые изменения в тему по умолчанию. Замените обратный вызов на эту версию:

`callback([JSON.stringify(option), ['default', '{"title":{"left":"left"},"color":["#ff715e","#ffaf51","#ffee51","#8c6ac4","#715c87"],"backgroundColor":"rgba(64,64,64,0.5)"}']]);`

* Вы должны увидеть выровненный по левому краю заголовок и измененные цвета данных и фона.

## Шаблоны
Шаблоны Javascript доступны для некоторых случаев использования:

* диаграмма с использованием данных из адаптера истории: [template1](templates/flexchartsTemplate1.js)
* простая диаграмма для тепловой кривой: [template2](templates/flexchartsTemplate2.js)
* простая столбчатая диаграмма с накоплением, использующая функцию в определении диаграммы: [template3](templates/flexchartsTemplate3.js)
* диаграмма для данных **адаптера tibberLink**: см. обсуждения [здесь](https://github.com/MyHomeMyData/ioBroker.flexcharts/discussions/67) и [здесь](https://github.com/MyHomeMyData/ioBroker.flexcharts/discussions/66)
* Для устройств Viessmann серии E3 доступен очень специфический вариант использования, например, тепловой насос Vitocal 250. См. https://github.com/MyHomeMyData/ioBroker.e3oncan/discussions/35
* реализация динамически изменяющихся диаграмм: [template4](templates/flexchartsTemplate4.js)
* реализация собственных тем для стандартного и темного режима и использование динамического переключения на основе системных настроек: [template5](templates/flexchartsTemplate5.js)
* Адаптер [tibberLink](https://github.com/hombach/ioBroker.tibberlink) использует flexcharts как вариант графической обработки данных. В настоящее время доступен в бета-репозитории ioBroker. См. [документацию](https://github.com/hombach/ioBroker.tibberlink?tab=readme-ov-file#2-using-the-flexcharts-or-fully-featured-echarts-adapter-with-json).

## Ссылка
Использовать **состояние ioBroker** в качестве источника данных: `http://localhost:8082/flexcharts/echarts.html?source=state&id=my_state_id`

Использовать **javascript** в качестве источника данных: `http://localhost:8082/flexcharts/echarts.html?source=script`

### Необязательные аргументы
* `&message=my_message` — отправляет "my_message" в JavaScript. Используйте `onMessage('my_message', (httpParams, callback) => { callback(mychart); })` для предоставления данных диаграммы. По умолчанию `flexcharts`.
* `&darkmode[=on|off|auto]` — задает темный режим визуализации ECharts: 'off' => темный режим постоянно выключен; 'on' или отсутствие значения => темный режим постоянно включен; 'auto' => учитывает системные настройки темного режима.
* `&refresh=число` — обновлять график каждые «число» секунд. Значение по умолчанию — 60 секунд. Минимально допустимое значение — 5 секунд.
* `&themev5` - установить тему Apache ECharts 'v5' в качестве темы по умолчанию для диаграммы - см. главу «Тема по умолчанию» в https://echarts.apache.org/handbook/en/basics/release-note/v6-upgrade-guide/
* `&user_defined_arguments` — добавьте дополнительные параметры по мере необходимости. Все аргументы доступны в функции `onMessage()` объекта `httpParams`. Подробнее см. примеры выше и шаблоны.

### Использование функций в определении диаграмм
Доступно с версии 0.3.0 и новее. См. предыдущий [глава](#using-functions-within-definition-of-chart)

### Встроенная демонстрационная диаграмма
Доступна встроенная демонстрационная диаграмма: http://localhost:8082/flexcharts/echarts.html?source=state&id=flexcharts.0.info.chart1

Это должно открыть демонстрационную диаграмму при запуске flexcharts- и web-adapter.

**Примечание:** Замените `localhost` на адрес вашего сервера ioBroker. Замените `8082` на номер порта, используемый вашим веб-адаптером.

## Пожертвовать
<a href="https://www.paypal.com/donate/?hosted_button_id=WKY6JPYJNCCCQ"><img src="https://raw.githubusercontent.com/MyHomeMyData/ioBroker.flexcharts/main/admin/bluePayPal.svg" height="40"></a> Если вам понравился этот проект — или вы просто проявили щедрость, — угостите меня пивом. За здоровье! :beers:

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
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

### 0.4.1 (2025-05-22)
* (MyHomeMyData) Fix for issue #96 (findings of repository checker)

### 0.4.0 (2025-03-24)
* (MyHomeMyData) Added functionality to support event driven functions within charts, ref. issue #85
* (MyHomeMyData) Added timeout for script as source
* (MyHomeMyData) Added test cases for integration testing

### 0.3.2 (2025-02-09)
* (MyHomeMyData) Added hint for use of flexcharts by adapter tibberLink

### 0.3.1 (2025-02-02)
* (MyHomeMyData) Updated Apache ECharts to version 5.6.0
* (MyHomeMyData) Added support for 3D charts using extension echarts-gl, see issue #68
* (MyHomeMyData) Added templates for tibberLink Adapter

### 0.3.0 (2025-01-08)
* (MyHomeMyData) Enhancement for usage of functions within echart definitions.
* (MyHomeMyData) Fix for issue #56 (findings of repository checker)

### 0.2.0 (2024-11-06)
* (MyHomeMyData) Updated readme. Added sections Templates and Reference.
* (MyHomeMyData) Fix for issue #41 (findings of repository checker)
* (MyHomeMyData) Updated ECharts to version 5.5.1, see issue #40
* (MyHomeMyData) Fix for issue #39 (html warnings)
* (MyHomeMyData) Added option 'refresh' to enable auto update of chart

### 0.1.6 (2024-10-19)
* (MyHomeMyData) Fix for issue #37

### 0.1.5 (2024-10-11)
* (MyHomeMyData) Fixes for issue #36

### 0.1.4 (2024-10-06)
* (MyHomeMyData) Fixes for issue #34
* (MyHomeMyData) Fixes for issue #33

### 0.1.3 (2024-10-05)
* (MyHomeMyData) Fixed issue on windows systems (handling of file path)

### 0.1.2 (2024-10-01)
* (MyHomeMyData) Adapted adapter configurations

### 0.1.1 (2024-10-01)
* (MyHomeMyData) Removed main.js from package.json since it's obsolete

### 0.1.0 (2024-10-01)
* (MyHomeMyData) Use web extension instead of creating own web server. Use http://localhost:8082/flexcharts/echarts.html instead of http://localhost:3100/echarts.html

### 0.0.4 (2024-09-13)
* (MyHomeMyData) Changed default port to 3100 to avoid conflict with camera adapter
* (MyHomeMyData) Check for conflicting port usage during start of instance
* (MyHomeMyData) Added option to select dark mode
* (MyHomeMyData) Fixed missing 404-page

### 0.0.3 (2024-08-25)
* (MyHomeMyData) Disabled sinon should interface
* (MyHomeMyData) Update of npm dependencies

### 0.0.2 (2024-08-05)
* (MyHomeMyData) initial release

## License
MIT License

Copyright (c) 2025 MyHomeMyData <juergen.bonfert@gmail.com>

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