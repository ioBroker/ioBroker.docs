---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tvprogram/README.md
title: ioBroker.tvпрограмма
hash: D6PEjRUhQ+htZHtYMcpl5ZpppPpnCvz/5zs4H8lC7dc=
---
![Логотип](../../../en/adapterref/iobroker.tvprogram/admin/tvprogram.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.tvprogram.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.tvprogram.svg)
![Количество установок](https://iobroker.live/badges/tvprogram-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/tvprogram-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.tvprogram.png?downloads=true)

# IoBroker.tvprogram
**Тесты:** ![Тест и выпуск](https://github.com/oweitman/ioBroker.tvprogram/workflows/Test%20and%20Release/badge.svg)

## `tvprogram` адаптер для ioBroker
Этот адаптер опрашивает информацию о телевизионной программе через регулярные промежутки времени. Данные могут отображаться в различных виджетах.

Для его настройки адаптер должен уже получить доступ к необходимым данным и заполнить их.
Из-за своего размера данные хранятся не в точках данных, а в файлах (путь Linux: /opt/iobroker/data-files/tvprogram) и в памяти адаптера.
В конфигурации виджету нужно только заполнить любую точку данных адаптера (например, cmd).
Виджет автоматически ищет все оставшиеся точки данных.

## Установка
Адаптер можно установить через стабильную версию или для тестирования через бета-/последнюю версию репозитория.

### Конфигурация адаптера
Вы можете настроить, сколько разных телевизоров или, по крайней мере, разных конфигураций у вас будет.

### Виджеты
Виджеты поддерживаются только в современных браузерах (Google Chrome, Mozilla Firefox, Opera, Safari).
Не поддерживаются Internet Explorer или Microsoft Edge без Chromium (версия <79).

#### Время
Этот виджет показывает текущую телепрограмму на временной шкале по телеканалам.

Если текст за логотипами каналов просвечивает, в виджете необходимо выбрать цвет фона.
Обычно хорошим подходом является выбор явного цвета переднего плана и фона для представления или, по крайней мере, для виджета.
Положение маркера обновляется каждые 15 секунд.

Если после установки что-то пошло не так и виджет отображается неправильно, попробуйте выполнить следующую команду из оболочки:

iobroker загрузить все

Для настройки в vis доступны следующие атрибуты. Минимальная настройка — установить точку данных в cmd-datapoint.

| Атрибут | Пример | Описание |
| ----------------------- | --------------------- | ----------------------------------------------------- |
| `tvprogram_oid` | `tvprogram.0.tv1.cmd` | Точка данных экземпляра адаптера `tvprogram`. |
| `heightRow` | 35 | Высота для каждой отображаемой строки |
| `showpictures` | x | Показывать изображения на временной шкале, если они доступны |
| `headerfontpercent` | 125 | Размер символа в процентах для заголовка (время) |
| `broadcastfontpercent` | 75 | Размер символа в процентах для трансляций |
| `highlightcolor` | желтый | цвет для избранных |
| `markerpositionpercent` | 25 | Положение маркера в процентах от ширины виджета |
| `dialogwidthpercent` | 90 | размер диалогов в процентах от виджета |
| `dialogheightpercent` | 90 | размер диалогов в процентах от виджета |
| `dialogheightpercent` | 90 | размер диалогов в процентах от виджета |

##### CSS-классы
Пожалуйста, измените `w00001` на ваш идентификатор виджета

Чтобы изменить форматирование диалогов

```css
#w00001channeldlg {
  background-color: red !important;
}
```

```css
#w00001broadcastdlg {
  background-color: red !important;
}
```

Если вы используете некоторые дополнительные диалоги с другими настройками z-index, вы можете установить более высокий z-index для диалогов телепрограмм.
Возможно, вам придется установить большее число, чем 300. Это зависит от настроек в других диалогах, которые перекрывают или скрывают диалоги телепрограмм (информация о трансляции и выбор канала)

```css
.ui-dialog.w00001 {
  z-index: 300 !important;
}
```

Чтобы изменить форматирование чередующихся фоновых цветов трансляций

```css
#w00001 .scrollcontainer ul.tv-row:nth-child(odd) > li.broadcast:nth-child(odd),
#w00001 ul.tv-row:nth-child(odd) > li.time:nth-child(odd) {
  background-color: rgba(128, 128, 128, 0.65);
}
#w00001
  .scrollcontainer
  ul.tv-row:nth-child(odd)
  > li.broadcast:nth-child(even),
#w00001 ul.tv-row:nth-child(odd) > li.time:nth-child(even) {
  background-color: rgba(128, 128, 128, 0.55);
}
#w00001
  .scrollcontainer
  ul.tv-row:nth-child(even)
  > li.broadcast:nth-child(odd) {
  background-color: rgba(128, 128, 128, 0.45);
}
#w00001
  .scrollcontainer
  ul.tv-row:nth-child(even)
  > li.broadcast:nth-child(even) {
  background-color: rgba(128, 128, 128, 0.35);
}
```

#### Избранное
Этот виджет отображает список избранного, отсортированный по дате и времени.

Для настройки в vis доступны следующие атрибуты. Минимальная настройка — установить точку данных в cmd-datapoint.

| Атрибут | Пример | Описание |
| ---------------- | ---------------------- | ----------------------------------------------------- |
| `oid` | `tvprogram.0.tv 1.cmd` | Точка данных экземпляра адаптера `tvprogram`. |
| `showweekday` | `yes` | Показать будний день |
| `maxfavorites` | 10 | Максимальное количество избранных для показа |
| `highlightcolor` | `yellow` | цвет для избранного |
| `highlightcolor` | `yellow` | цвет для избранного |

#### Контроль
Этот виджет показывает все актуальные трансляции. Вы можете нажать на логотип канала, чтобы переключить канал.
Вы можете нажать на трансляцию, чтобы получить подробную информацию о ней.

Для настройки в vis доступны следующие атрибуты. Минимальная настройка — установить точку данных в cmd-datapoint.

| Атрибут | Пример | Описание |
| ---------------------- | ------------------------ | -------------------------------------------------------------------------------------------------- |
| `oid` | `tvprogram.0.tv1.cmd` | Точка данных экземпляра адаптера `tvprogram`. |
| `time` | 20:15 | если бы время только трансляция в это время показывалась в течение 120 минут, то показывался бы следующий день |
| `time` | 20:15/200 | если время с продолжительностью, то трансляция в это время будет показана в течение 200 минут |
| `time` | 2021-02-15T20:15:00.000Z | Если допустимая Datestring, то будет показана трансляция в это время. Запомните часовые пояса |
| `heightRow` | 35 | Высота для каждой отображаемой строки |
| `showpictures` | x | Показать фотографии, если они есть |
| `broadcastfontpercent` | 75 | Размер символа в процентах для трансляций |
| `highlightcolor` | `yellow` | цвет для избранного |
| `dialogwidthpercent` | 90 | размер диалогов в процентах от виджета |
| `dialogheightpercent` | 90 | размер диалогов в процентах от виджета |
| `dialogheightpercent` | 90 | размер диалогов в процентах от виджета |

##### CSS-классы
Пожалуйста, измените `w00001` на ваш идентификатор виджета

Чтобы изменить форматирование чередующихся фоновых цветов трансляций

```css
#w00001 .tv-control .tv-row:nth-child(odd) {
  background-color: rgba(128, 128, 128, 0.65);
}
#w00001 .tv-control .tv-row:nth-child(even) {
  background-color: rgba(128, 128, 128, 0.55);
}
```

#### Поиск
С помощью этого виджета вы можете искать трансляцию по названию, описанию, дате начала и типу трансляции.
Поле ввода «От» предварительно заполнено фактической датой. Если это поле не изменено, поиск начинается с фактического времени.
Если вы измените это поле на будущую или прошедшую дату, поиск начнется с 00:00 этой даты.
Одно или оба поля ввода searchtext и category должны быть заполнены/выбраны.

Для настройки в vis доступны следующие атрибуты. Минимальная настройка — установить точку данных в cmd-datapoint.

| Атрибут | Пример | Описание |
| ---------------------- | --------------------- | ----------------------------------------------------- |
| `Object ID` | `tvprogram.0.tv1.cmd` | Точка данных экземпляра адаптера `tvprogram`. |
| `maxresults` | 10 | макс. результатов в списке |
| `heightRow` | 35 | Высота для каждой отображаемой строки |
| `broadcastfontpercent` | 75 | Размер символа в процентах для трансляций |
| `highlightcolor` | `yellow` | цвет для избранного |
| `dialogwidthpercent` | 90 | размер диалогов в процентах от виджета |
| `dialogheightpercent` | 90 | размер диалогов в процентах от виджета |
| `dialogheightpercent` | 90 | размер диалогов в процентах от виджета |

##### CSS-классы
Пожалуйста, измените `w00001` на ваш идентификатор виджета

Чтобы изменить форматирование чередующихся фоновых цветов трансляций

```css
#w00001 .tv-search .tv-row:nth-child(odd) {
  background-color: rgba(128, 128, 128, 0.65);
}
#w00001 .tv-search .tv-row:nth-child(even) {
  background-color: rgba(128, 128, 128, 0.55);
}
```

### Предоставленные точки данных
Следующий набор точек данных существует для каждого созданного телевизора

#### `channelfilter`
эта точка данных содержит каналы, отображаемые в виджете в виде JSON-массива

#### `cmd`
эта точка данных используется для внутренней связи между виджетами и адаптером

#### `favorites`
эта точка данных содержит выбранные избранные элементы в виде JSON-массива

#### `record`
Эта точка данных устанавливается, если пользователь нажимает кнопку записи в подробном представлении трансляции.
Предоставленные данные

| поле | Пример | Описание |
| ------------- | ------------------------- | ---------------------- |
| `startTime` | 2021-01-01T00:10:00+01:00 | Время начала |
| `title` | Название трансляции | название трансляции |
| `channel` | 7 | Уникальный номер канала |
| `channelid` | `zdf` | Уникальный идентификатор канала |
| `channelname` | `ZDF` | Читаемое название канала |
| `eventid` | 12345678 | Уникальный идентификатор трансляции |
| `eventid` | 12345678 | Уникальный идентификатор трансляции |

#### `selectchannel`
Эта точка данных используется для распознавания команды переключения канала при щелчке по логотипу канала или значку переключателя в подробном представлении.

#### `show`
эта точка данных содержит статус того, следует ли отображать в виджете tvprogram только избранное или все

#### `config`
эта точка данных устарела и будет удалена в следующих версиях

### Предоставленные `Sendto`-Команды
Все данные можно запросить у адаптера с помощью команд sendto. Это можно использовать для разработки индивидуальных функций.

#### `getServerData`
Запросить базовые данные у адаптера.

##### Допустимые параметры:
- `категории`
- `жанры`
- `каналы`

**Возвраты:**

`Array`

**Пример:**

```javascript
sendTo("tvprogram.0", "getServerData", "categories", (data) =>
  console.log(data),
);
```

#### `getServerTVProgram`
Запросить данные программы у адаптера.

##### Допустимые параметры:
строка даты в следующем формате: `yyyy-mm-dd`

**Возвраты:**

`Array`

**Пример:**

```javascript
sendTo("tvprogram.0", "getServerTVProgram", "2021-02-10", (data) =>
  console.log(data),
);
```

#### `getServerBroadcast`
Запросите подробные данные трансляции.

##### Допустимые параметры:
объект, содержащий дату просмотра в следующем формате гггг-мм-дд, идентификатор события трансляции

**Возвраты:**

`Object`

**Пример:**

```javascript
sendTo(
  "tvprogram.0",
  "getServerBroadcast",
  { viewdate: "2021-02-10", eventid: "10659522" },
  (data) => console.log(data),
);
```

#### `getFavoritesData`
Запросить все избранные трансляции с текущего момента до окончания сохраненных данных.

##### Допустимые параметры:
`Array` избранного

**Возвраты:**

`Array`

**Пример:**

```javascript
sendTo("tvprogram.0", "getFavoritesData", ["heute", "Tagesschau"], (data) =>
  console.log(data),
);
```

#### `getServerBroadcastNow`
Запрашивает все трансляции, которые в данный момент идут

##### Допустимые параметры:
Массив идентификаторов ваших любимых каналов

**Возвраты:**

`Array`

**Пример:**

```javascript
sendTo("tvprogram.0", "getServerBroadcastNow", [1, 6, 22, 7], (data) =>
  console.log(data),
);
```

#### `getServerBroadcastDate`
Запрашивает все трансляции, запущенные в указанную дату и время

##### Допустимые параметры:
Массив идентификаторов каналов ваших любимых каналов datetime

**Возвраты:**

`Array`

**Пример:**

```javascript
sendTo(
  "tvprogram.0",
  "getServerBroadcastDate",
  { channelfilter: [1, 6, 22, 7], date: "2021-02-10T20:15:00.000Z" },
  (data) => console.log(data),
);
```

#### `getServerBroadcastFind`
Поиск трансляций в определенном диапазоне времени и по желанию с категориями

##### Допустимые параметры:
`channelfilter`: Массив идентификаторов каналов ваших любимых каналов `categoryfilter`: Необязательный массив идентификаторов категорий `datetimefrom`: дата и время от `datetimetill`: дата и время до `textfilter`: Необязательный заголовок или часть заголовка для поиска `maxresults`: Необязательное максимальное количество результатов. Значение по умолчанию — 10

**Возвраты:**

`Array`

**Пример:**

```javascript
sendTo(
  "tvprogram.0",
  "getServerBroadcastFind",
  {
    channelfilter: [1, 6, 22, 7],
    categoryfilter: [],
    datefrom: "2021-02-10T10:00:00.000Z",
    datetill: "2021-02-10T23:00:00.000Z",
    textfilter: "",
    maxresults: 10,
  },
  (data) => console.log(data),
);
```

#### `getServerInfo`
Запросить доступные даты трансляции в памяти адаптера

##### Допустимые параметры:
пустой объект

**Возвраты:**

`Array`

**Пример:**

```javascript
sendTo("tvprogram.0", "getServerInfo", "{}", (data) => console.log(data));
```

### Сообщество предоставляет виджеты/скрипты
#### `Harmony` и `MagentaTV`
Скрипт предоставлен pix После нажатия на логотип канала скрипт устанавливает сопоставленный идентификатор канала в harmonity-datapoint

```javascript
/* TV Programm Adapter
{1}
Skripte zur Ausführung von Aktionen, die
mit dem tvprogramm-Adapter zusammenhängen
(z.B. umschalten)
{1}
Adapter von 1/2021 von oweitmann https://github.com/oweitman/ioBroker.tvprogram
{1}
20210503 init
*/

const logging = true;
const idKanalWahl = "tvprogram.0.tv1.selectchannel"; // Dateingabe aus VIS
const fbdelay = 1000; // delay zwischen Tastendrücken der IR_Fernbedienung in ms
const channelList = {
  // Ausgabe vom Adapter : Kanalnummer im Receiver
  ard: 1,
  zdf: 2,
  rtl: 3,
  sat1: 4,
  pro7: 5,
  vox: 6,
  kaka: 7,
  rtl2: 8,
  superrtl: 9,
  kika: 10,
  /* nickelodeon 11 */
  "3sat": 12,
  welt: 13,
  ntv: 14,
  phoenix: 15,
  tele5: 16,
  zdfneo: 17,
  /* #dabeiTV 18 */
  /* disneyplus 19 */
  /* lokalTV 20 */
  bayern3: 21,
  hessen3: 25,
  mdr: 27,
  nord3: 29,
  /* "bremen":30, */
  /* "rbb berlin":31, */
  /* "sr":36, */
  sw3: 37, // bw
  /* "sw3":38, // rp */
  west3: 39,
  /* "eurosport1":50, */
  sport1: 51,
  /* sky sport news 52 */
  arte: 55,
  one: 56,
  /* anixe 60 */
  dmax: 64,
  pro7maxx: 69,
  nitro: 70,
  /* sat1 gold 73 */
  sixx: 75,
  /* ard alpha 80 */
  /* DW 85 */
  /* euronews */
  /* Kabel Eins Doku 89 */
  /* N24 Doku 90 */
  tagesschau24: 91,
  /* Welt der Wunder 92 */
  /* zdfinfo 93 */
  mtv: 99,
};

function selectChannel(chNo) {
  // Zerlegen mehrstelliger Zahlen
  let ch_arr = new Array();
  ch_arr = [];
  if (logging) log("Kanalnummer gewählt: " + chNo);
  while (chNo > 0) {
    // rückwärts
    if (logging) log("erkannte Ziffer: " + (chNo % 10));
    ch_arr.push(chNo % 10); // letzte Ziffer hinten dran hängen
    chNo = chNo / 10;
    chNo = parseInt(chNo);
  }
  // array umdrehen und wieder auslesen und Taste(n) der HARMONY+Fernbedienung drücken
  ch_arr.reverse();
  if (logging) log("Senderplatz hat " + ch_arr.length + " Ziffern" + ch_arr);
  for (let i = 0; i < ch_arr.length; i++) {
    // passende OID füllen
    setStateDelayed(
      "harmony.0.Harmony_Hub.Telekom-DVR.Number" + ch_arr[i],
      1,
      fbdelay,
      function () {
        if (logging) log(i + 1 + ". Taste: " + ch_arr[i] + " gedrückt");
      },
    );
  }
}

on(idKanalWahl, function (obj) {
  log(
    "Neues TV Programm: " +
      obj.state.val +
      " auf Kanal " +
      channelList[obj.state.val] +
      " gewählt",
  );
  selectChannel(channelList[obj.state.val]);
});
```

### Функции не реализованы в адаптере, но предоставляются в виде скриптов для javascript-adapter
#### `Recordlist`
Список всех текущих времен записи, записанных точкой данных записи и обновляемых каждую минуту.
Вам необходимо настроить имя точки данных вашего RecorderList и имя точки данных, которую нужно отслеживать.
Как только скрипт добавит запись в список, точка данных записи будет очищена.

```javascript
// datapoint where the List should be saved
var recorderListDP = "0_userdata.0.tvprogram.RecorderList";
// datapoint who should be monitored of new data
var recorderDP = "tvprogram.0.tv1.record";

on(recorderDP, function (obj) {
  var recorderList;
  var index;
  console.log(obj.state.val);
  try {
    var recObj = JSON.parse(obj.state.val);
  } catch {
    return;
  }
  var s = getState(recorderListDP).val;
  s = s == "" ? (s = "[]") : s;
  recorderList = JSON.parse(s) || [];
  index = recorderList.findIndex(function (el) {
    return JSON.stringify(el) == JSON.stringify(recObj);
  });
  if (index > -1) {
    recorderList.splice(index, 1);
  }
  recorderList.push(recObj);
  setState(recorderListDP, JSON.stringify(recorderList));
  setState(recorderDP, "");
});
var timer = setInterval(function () {
  var recorderList;
  var s = getState(recorderListDP).val;
  s = s == "" ? (s = "[]") : s;
  recorderList = JSON.parse(s) || [];
  recorderList = recorderList.filter((el) => new Date(el.endTime) > new Date());
  setState(recorderListDP, JSON.stringify(recorderList));
}, 1000 * 60);
```

Для визуализации этих данных шаблон виджета JSON из адаптера myTime может помочь со следующим шаблоном.
Введите как json_oid точку данных с `recordlist` и как json_template следующий код:

```javascript
<% data.sort((a,b)=>new Date(a.startTime) - new Date(b.startTime)) %>
<table>
    <th>Datum</th>
    <th>Start</th>
    <th>Ende</th>
    <th>Titel</th>
<% for (var i=0;i<data.length;i++) {%>
<tr>
<td><%- new Date(data[i].startTime).toLocaleDateString() %>%></td>
<td><%- new Date(data[i].startTime).toLocaleTimeString() %></td>
<td><%- new Date(data[i].endTime).toLocaleTimeString() %></td>
<td><%- data[i].channelname %></td>
<td><%- data[i].title %></td>
</tr>
<% } %>
</table>

```

#### Любимая трансляция на данный момент
Следующий скрипт раз в минуту определяет, запущена ли в данный момент любимая программа.

```javascript
// Favorites datapoint of your tv
var favoritesDP = "tvprogram.0.tv1.favorites";
// channelfilter datapoint of your tv
var channelfilterDP = "tvprogram.0.tv1.channelfilter";
// datapoint where the result should be saved
var favoritesBool = "0_userdata.0.tvprogram.favoriteNow";

var timer = setInterval(function () {
  var favorites = JSON.parse(getState(favoritesDP).val);
  var channelfilter = JSON.parse(getState(channelfilterDP).val);
  sendTo("tvprogram.0", "getServerBroadcastNow", channelfilter, (data) => {
    setState(
      favoritesBool,
      data.some((el) => favorites.includes(el.events[0].title)),
    );
  });
}, 1000 * 60);
```

#### Раскрашивание программ, которые находятся в точке данных `recordlist` в виджете tvprogram
следующий шаблон предназначен для шаблона виджета JSON из адаптера rssfeed.
этот шаблон не генерирует видимый вывод, но генерирует инструкции css, которые окрашивают текущие программы.
он также окрашивает кнопку записи в подробном представлении.

Чтобы использовать этот шаблон, выберите точку данных recordlist в свойствах виджета json_oid и вставьте следующий шаблон в json_template

```javascript
<%
  // Insert the IDs of your tvprogram widget IDs
  var widgetArray = ["w00001","w00002"];
  recorderList = data || [];
%>
  <style>
<%
  recorderList.map( (rec) => {
        widgetArray.map( (widget) => {
%>
            #<%= widget %> .broadcastelement[data-eventid="<%= rec.eventid %>"] {
                 background-color: rgba(255,0,0,0.1);
            }
            #<%= widget %>broadcastdlg .event-container.tv-dlg-row[data-eventid="<%= rec.eventid %>"] .record  {
                color: red;
            }
<%      });
    }); %>
  </style>
```

### Функции
- показывать данные ТВ на временной шкале по ТВ каналу
- показать подробности о телетрансляции, если они доступны
- показывать маркер фактического положения с автоматической прокруткой
- настроить отображаемые телеканалы и порядок, изменение порядка возможно с помощью dragNdrop.
- команда переключения через точку данных после нажатия на логотип
- увеличить/уменьшить масштаб
- навигация по следующим и предыдущим дням
- кнопка воспроизведения для переключения точки данных канала
- центральный зум в ближайшие дни
- вернуться к сегодняшнему дню
- сбросить масштаб
- любимые трансляции
- скопировать текст из Detailview
- положение маркера настраивается
- ширина и высота диалогового окна настраиваются
- Datenpunkt Record, der nach druck auf Knopf mit Aufnahmedaten gefüllt wird.
- Виджет для избранного
- скрыть неизбранное

### То, что нужно сделать
виджет твпрограмма:

- возможно, виджет трансляций лучших моментов
- Адаптер данных для других источников (Интернет, оборудование, такое как Enigma, VU-Box). Рассмотрение этого вопроса в настоящее время приостановлено из-за низкого спроса
- ~~улучшить документацию по настройке виджетов~~
- ~~транслировать изображения, если они доступны в главном окне виджета времени~~
- ~~исследуйте весь текст, чтобы также найти режиссеров и актеров~~
- ~~подсказки для кнопок в виджете времени~~
- ~~Идеи для дальнейших виджетов на основе существующего сценария телепрограммы~~
- ~~Проблема: бесконечная прокрутка в Firefox~~
- ~~на обсуждение: Datenpunkt, mit allen Aufnahmedaten, должен быть реализован на адаптере видеомагнитофона или в отдельном скрипте~~
- ~~адаптивный дизайн для подробного представления->адаптивный дизайн для диалогового окна jquery невозможен, нашел другое решение с фиксированными макетами для высоты>ширины~~
- ~~Проблема: небольшая ошибка пикселей, если панель прокрутки полностью прокручена с левой стороны~~

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- Change sento command from getFavoritesDatax to getFavoritesData

### 2.0.2 (2024-11-17)

- fix jsonconfig
- add node 22 to testing

### 2.0.1 (2024-11-16)

- fix lint errors

### 2.0.0 (2024-11-16)

- fix lint errors
- align structures and files
- switch to jsonconfig
- config translations
- make vis2 compatible (maybe some glitches included, please report)

### 1.1.1 (2021-08-10)

- remove dead code / extend doku about the warnings in the iobroker log \* change the method of setting for configuration data from widget to datapoint

### 1.1.0 (2021-05-06)

- tooltips for the buttons in the time widget / search through the whole text to also find directors and actors / add showpictures option in time,control and search widget / improve documentation

### 1.0.0

- (oweitman) stable version

## License

MIT License

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

Copyright (c) 2024 oweitman <oweitman@gmx.de>