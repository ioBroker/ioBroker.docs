---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.flexcharts/README.md
title: ioBroker.flexcharts
hash: QS5E626cO05p6/jS6+3yipodDprkwuyZDgu9lrpokfc=
---
![Логотип](../../../en/adapterref/iobroker.flexcharts/admin/flexcharts-icon-small.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.flexcharts.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.flexcharts.svg)
![Количество установок](https://iobroker.live/badges/flexcharts-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/flexcharts-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.flexcharts.png?downloads=true)

# IoBroker.flexcharts
**Тесты:** ![Тест и выпуск](https://github.com/MyHomeMyData/ioBroker.flexcharts/workflows/Test%20and%20Release/badge.svg)

## Адаптер flexcharts для ioBroker
# Основная концепция
Для просмотра диаграмм в ioBroker доступно несколько адаптеров. Насколько мне известно, все они используют пользовательский интерфейс для настройки содержимого и параметров диаграмм. Обычно не все функции используемой графической подсистемы могут быть использованы таким образом. Например, невозможно просматривать полнофункциональные стековые диаграммы с помощью eChart-Adapter.

Этот адаптер использует другой подход. Он приносит почти полный набор функций [Apache ECharts](https://echarts.apache.org/en/index.html) в ioBroker. Взгляните на [демонстрационные графики](https://echarts.apache.org/examples/en/index.html).

Примечание: Адаптер пока не тестировался на MacOS.

**Нет пользовательского интерфейса для настройки любой диаграммы.** Вам нужно определить диаграмму самостоятельно, адаптер позаботится о визуализации. Вам нужно предоставить определение и содержимое диаграммы, предоставив содержимое как json-объект - в примерах eCharts это соответствует содержимому переменной `option`. Вот пример, чтобы было понятнее. Чтобы создать стековую диаграмму, вы сохраняете ее определение в состоянии ioBroker (формат json):

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

Адаптер flexchart затем отобразит следующую диаграмму:

![flexcharts_stacked1](https://github.com/user-attachments/assets/7cf6dfab-ddad-4b2f-a1e1-20fa4b876b4c)

Обычно для создания и обновления контента этого состояния используется Blockly или JavaScript.

Есть еще одна возможность напрямую передавать данные eCharts через функцию обратного вызова в javascript. Подробности см. ниже.

Для ясности: этот подход не предназначен для быстрого создания простой диаграммы.
Но если у вас есть конкретная идея для более сложной диаграммы, flexcharts предлагает возможность ее реализовать.

# Начиная
### Использование адаптера
Этот адаптер предоставляет свою функциональность в качестве веб-расширения. Поэтому обязательно иметь установленный и работающий [веб-адаптер](https://www.iobroker.net/#en/adapters/adapterref/iobroker.ws/README.md) (`web.0`). В этом файле readme предполагается, что вы используете стандартный порт 8082 для веб-адаптера.

Когда адаптер flexcharts активен, вы можете получить к нему доступ через http://localhost:8082/flexcharts/echarts.html (замените `localhost` на адрес вашего сервера ioBroker).

Вы можете использовать этот адрес в виджетах iFrame vis или jarvis или других визуализациях. Конечно, вы также можете использовать его непосредственно во вкладке браузера.

Чтобы это заработало, необходимо предоставить дополнительные параметры, чтобы сообщить адаптеру об источнике данных. Доступны два варианта:

* `source=state` => Вы предоставляете данные диаграммы в состоянии ioBroker (json)
* `source=script` => Вы предоставляете данные диаграммы через скрипт (javascript или блочный)

Доступны дополнительные опции, пожалуйста, обратитесь к [справочный раздел](#reference)

Для проверки правильности установки адаптера используйте встроенную демонстрационную диаграмму: http://localhost:8082/flexcharts/echarts.html?source=state&id=flexcharts.0.info.chart1

### Использовать состояние ioBroker как источник для eChart
Пример: `http://localhost:8082/flexcharts/echarts.html?source=state&id=0_userdata.0.echarts.chart1`

<!-- Would this be better to read: Example: http://localhost:8082/flexcharts/echarts.html?<mark style="background-color: #ffff00">source=state</mark>&<mark style="background-color: #00c000">&id=0_userdata.0.echarts.chart1</mark> -->

Flexcharts оценит состояние `0_userdata.0.echarts.chart1` как данные для eChart. Попробуйте: создайте такое состояние и скопируйте данные json из примера, показанного выше (`{ "tooltip": { ...`) как содержимое состояния, затем получите доступ к указанному адресу с помощью браузера.

В идентификаторе штата не допускается использование следующих символов: `: / ? # [ ] @ ! $ & ' ( ) * + , ; = %`

### Используйте JavaScript в качестве источника для eChart
Это немного сложнее, но гораздо эффективнее и гибче. Вы предоставляете данные диаграмм напрямую вашим скриптом JS, который динамически вызывается адаптером flexcharts. Вы можете передать дополнительные параметры вашему скрипту, добавив параметры к http-адресу, например, `&chart=chart1`. Все http-параметры доступны внутри скрипта в объекте `httpParams` (см. пример ниже).

Опять же, лучше всего объяснить на примере. Создайте скрипт с этим содержимым (поддерживается только первый экземпляр JS (**javascript.0**), имя скрипта не имеет значения):

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

Дополнительные параметры могут быть переданы в скрипт и будут доступны в скрипте в переменной `httpParams`. Попробуйте следующую команду: `http://localhost:8082/flexcharts/echarts.html?source=script&chart=chart1&myjsonparams={"period":"daily"}`

Записи журнала теперь должны выглядеть так:

```
httpParams = {"source":"script","chart":"chart1","myjsonparams":"{\"period\":\"daily\"}"}`
myJsonParams = {"period":"daily"}
```

Пожалуйста, обратите внимание, **вам необходимо использовать функциональность `onMessage()` для получения триггера от адаптера**. Значение по умолчанию для сообщения — `flexcharts`, как показано в примере выше. Вы можете использовать другие сообщения, указав дополнительный параметр, например, чтобы использовать сообщение `mycharts`, добавьте `&message=mycharts` к http-адресу: `http://localhost:8082/flexcharts/echarts.html?source=script&message=mycharts`

### Использование функций в определении диаграммы
К сожалению, определения функций в определении диаграммы обычно не работают, поскольку они фильтруются при использовании `JSON.stringify(option)` или `callback(option)`.

Однако, начиная с версии flexcharts V0.3.0, это стало возможным. Нужно приложить немного больше усилий:

* Добавьте модуль npm `javascript-stringify` в экземпляр 0 адаптера javascript. Для этого добавьте `javascript-stringify` в "Дополнительные модули npm" в конфигурации адаптера:

![добавить модули npm](../../../en/adapterref/iobroker.flexcharts/add_npm_modules.png)

* В вашем скрипте добавьте `var strify = require('javascript-stringify');` в начале
* При использовании скрипта в качестве источника данных: в функциональности `onMessage()` замените `callback(option);` на `callback(strify.stringify(option));` (предполагается, что `option` содержит определение вашей диаграммы).
* Затем используйте состояние в качестве источника данных: при создании состояния замените `setState('my_chart_id', JSON.stringify(option), true);` на `setState('my_chart_id', strify.stringify(option), true);`
* Вот и все. Теперь функции в определениях диаграмм будут корректно перенаправляться в flexcharts.

Просто попробуйте использовать [шаблон3](templates/flexchartsTemplate3.js). Функция используется для отображения данных подсказки с 2 десятичными знаками: `tooltip: {trigger: "axis", valueFormatter: (value) => '. + value.toFixed(2)}`.

Пример использования определения диаграммы через состояние приведен в `flexcharts.0.info.chart2`. Это покажет ту же диаграмму, что и template3.

Примечание: Если установлен модуль npm `javascript-stringify`, его функциональность может также использоваться вредоносным кодом (Cross-Site-Scripting). Поэтому ioBroker не должен быть доступен из Интернета при использовании этого модуля.

## Шаблоны
Шаблоны Javascript доступны для некоторых вариантов использования:

* диаграмма с использованием данных из адаптера истории: [template1](templates/flexchartsTemplate1.js)
* простая диаграмма для тепловой кривой: [template2](templates/flexchartsTemplate2.js)
* простая столбчатая диаграмма с накоплением, использующая функцию в определении диаграммы: [template3](templates/flexchartsTemplate3.js)
* диаграмма для данных **адаптера tibberLink**: см. обсуждения [здесь](https://github.com/MyHomeMyData/ioBroker.flexcharts/discussions/67) и [здесь](https://github.com/MyHomeMyData/ioBroker.flexcharts/discussions/66)
* Для устройств Viessmann серии E3 доступен очень специфический вариант использования, например, тепловой насос Vitocal 250. См. https://github.com/MyHomeMyData/ioBroker.e3oncan/discussions/35

## Ссылка
Использовать **состояние ioBroker** в качестве источника данных: `http://localhost:8082/flexcharts/echarts.html?source=state&id=my_state_id`

Использовать **javascript** в качестве источника данных: `http://localhost:8082/flexcharts/echarts.html?source=script`

### Необязательные аргументы
* `&message=my_message` - отправляет "my_message" в javascript. Используйте `onMessage('my_message', (httpParams, callback) => { callback(mychart); })` для предоставления данных диаграммы. По умолчанию `flexcharts`.
* `&darkmode` - активирует темный режим визуализации ECharts.
* `&refresh=number` - обновлять график каждые "number" секунд. По умолчанию 60 секунд. Минимально допустимое значение 5 секунд.
* `&user_defined_arguments` - Добавьте больше параметров по мере необходимости. Все аргументы доступны в функции `onMessage()` в объекте `httpParams`. См. примеры выше и шаблоны для получения более подробной информации.

### Использование функций в определении диаграмм
Доступно с версии 0.3.0 или новее. Пожалуйста, обратитесь к предыдущему [глава](#using-functions-within-definition-of-chart)

### Встроенная демонстрационная диаграмма
Доступна встроенная демонстрационная диаграмма: http://localhost:8082/flexcharts/echarts.html?source=state&id=flexcharts.0.info.chart1

Это должно открыть демонстрационную диаграмму при запуске flexcharts- и web-адаптера.

**Примечание:** Замените `localhost` на адрес вашего сервера ioBroker. Замените `8082` на номер порта, используемый вашим веб-адаптером.

## Пожертвовать
<a href="https://www.paypal.com/donate/?hosted_button_id=WKY6JPYJNCCCQ"><img src="https://raw.githubusercontent.com/MyHomeMyData/ioBroker.flexcharts/main/admin/bluePayPal.svg" height="40"></a> Если вам понравился этот проект — или вы просто чувствуете щедрость, подумайте о том, чтобы угостить меня пивом. Ура! :beers:

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
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