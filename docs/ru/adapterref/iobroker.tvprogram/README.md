---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tvprogram/README.md
title: ioBroker.tvпрограмма
hash: bh7exE/7l1zvVL/9jArdjpqy6TDsyLcE4vuJkJzH3gE=
---
![Логотип](../../../en/adapterref/iobroker.tvprogram/admin/tvprogram.png)

![НПМ-версия](https://img.shields.io/npm/v/iobroker.tvprogram1.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.tvprogram1.svg)
![Количество установок](https://iobroker.live/badges/tvprogram1-installed.svg)
![Текущая версия в стабильном репозитории.](https://iobroker.live/badges/tvprogram1-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.tvprogram1.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/oweitman/ioBroker.tvprogram/master.svg)
![Статус сборки AppVeyor](https://img.shields.io/appveyor/ci/oweitman/iobroker-tvprogram.svg)

# IoBroker.tvprogram
**Тесты:** ![Тестирование и выпуск](https://github.com/oweitman/ioBroker.tvprogram1/workflows/Test%20and%20Release/badge.svg)

**Тесты:**

## Адаптер tvprogram для ioBroker
Этот адаптер регулярно запрашивает информацию о телевизионной программе.
Данные могут отображаться в различных виджетах.

Для его настройки адаптер должен уже получить доступ и заполнить необходимые данные.
Из-за своего размера данные хранятся не в точках данных, а в файлах (путь Linux: /opt/iobroker/data-files/tvprogram) и в памяти адаптера.
В конфигурации виджет должен быть заполнен только любой точкой данных адаптера (например, cmd).
Виджет автоматически ищет все оставшиеся точки данных.

## Монтаж
Адаптер можно установить через стабильную версию или для тестирования через репозиторий beta/latest.

### Конфигурация адаптера
Вы можете настроить, сколько разных телевизоров или хотя бы разных конфигураций у вас будет.

### Предупреждения в журнале iobroker-log
Предупреждения типа

«Состояние «tvprogram.0.tv1.cmd» только для чтения записано без флага подтверждения со значением «new|program|2021-01-01»

по своей конструкции это нормально, благодаря внутреннему механизму сигнализации между адаптером и виджетами, которые сначала устанавливаются без флага подтверждения, а через некоторое время сбрасываются с флагом подтверждения.

### Виджеты
Виджеты поддерживаются только в современных браузерах (Google Chrome, Mozilla Firefox, Opera, Safari).
Не поддерживается Internet Explorer или Microsoft Edge без Chromium (версия <79).

#### Время
Этот виджет показывает текущую телепрограмму на временной шкале по телеканалам.

Если текст за логотипами каналов просвечивает, в виджете необходимо выбрать цвет фона.
Как правило, хорошим подходом является выбор явного цвета переднего плана и фона для представления или, по крайней мере, для виджета.
Положение маркера обновляется каждые 15 секунд.

Если после установки что-то пошло не так и виджет отображается неправильно, попробуйте выполнить следующую команду из оболочки:

iobroker загрузить все

Следующие атрибуты доступны для настройки в vis. Минимальная конфигурация — установить точку данных в cmd-datapoint.

| Атрибут | Пример | Описание |
| --------------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| tvprogram_oid | tvprogram.0.tv1.cmd | Точка данных экземпляра адаптера телепрограммы.                                                               |
| ширинаItem | 120 | Стандартная ширина в пикселях для 30-минутного сегмента |
| высотаСтрока | 35 | Высота каждой отображаемой строки |
| показатькартинки | х | Показывать изображения на временной шкале, если они доступны |
| заголовокшрифтпроцент | 125 | Размер символов в процентах для заголовка (время) |
| трансляцияфонтпроцент | 75 | Размер символов в процентах для трансляций |
| цвет выделения | желтый | цвет для избранных |
| маркерпозицияпроцент | 25 | Положение Маркера в процентах от ширины виджета |
| ширина диалогапроцент | 90 | размер диалогов в процентах от виджета |
| диалоговая высотапроцент | 90 | размер диалогов в процентах от виджета |

##### CSS-классы
Пожалуйста, измените w00001 на идентификатор вашего виджета.

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

Если вы используете некоторые дополнительные диалоги с другими настройками z-индекса, вы можете установить более высокий z-индекс для диалогов телепрограмм.
Возможно, вам придется установить большее число, чем 300. Это зависит от настроек в других диалоговых окнах, которые перекрывают или скрывают диалоговые окна телепрограммы (информация о трансляции и выбор канала).

```css
.ui-dialog.w00001 {
   z-index:300 !important;
}
```

Изменить форматирование чередующихся цветов фона трансляций

```css
#w00001 .scrollcontainer ul.tv-row:nth-child(odd)> li.broadcast:nth-child(odd),#w00001 ul.tv-row:nth-child(odd)> li.time:nth-child(odd) {
   background-color: rgba(128, 128, 128, 0.65);
}
#w00001 .scrollcontainer ul.tv-row:nth-child(odd)> li.broadcast:nth-child(even),#w00001 ul.tv-row:nth-child(odd)> li.time:nth-child(even) {
   background-color: rgba(128, 128, 128, 0.55);
}
#w00001 .scrollcontainer ul.tv-row:nth-child(even)> li.broadcast:nth-child(odd) {
   background-color: rgba(128, 128, 128, 0.45);
}
#w00001 .scrollcontainer ul.tv-row:nth-child(even)> li.broadcast:nth-child(even) {
   background-color: rgba(128, 128, 128, 0.35);
}

```

#### Избранное
Этот виджет показывает список выбранных избранных, отсортированный по дате и времени.

Следующие атрибуты доступны для настройки в vis. Минимальная конфигурация — установить точку данных в cmd-datapoint.

| Атрибут | Пример | Описание |
| -------------- | -------------------- | --------------------------------------------------- |
| оид | tvprogram.0.tv 1.cmd | Точка данных экземпляра адаптера телепрограммы. |
| название канала | нет | Показать логотип (выключено) или название канала |
| шоу-будний день | да | Шоу Будний день |
| максфавориты | 10 | Макс. фаворитов |
| цвет выделения | желтый | цвет для избранных |

#### Контроль
Этот виджет показывает все актуальные трансляции. Вы можете нажать на логотип канала, чтобы переключить канал.
Вы можете нажать на трансляцию, чтобы получить подробную информацию о ней.

Следующие атрибуты доступны для настройки в vis. Минимальная конфигурация — установить точку данных в cmd-datapoint.

| Атрибут | Пример | Описание |
| --------------------- | ------------------------ | -------------------------------------------------------------------------------------------------- |
| оид | tvprogram.0.tv1.cmd | Точка данных экземпляра адаптера телепрограммы.                                                |
| время |                          | Если пусто, то будут показаны фактические трансляции |
| время | 20:15 | если бы показывалось время только трансляция в это время 120 минут, то показывается следующий день |
| время | 20:15/200 | если время с длительностью, то трансляция в это время показывалась бы 200 минут |
| время | 2021-02-15T20:15:00.000Z | Если строка даты действительна, то трансляция в это время будет показана. Помните часовые пояса |
| высотаСтрока | 35 | Высота каждой отображаемой строки |
| показатькартинки | х | Покажите фотографии, если они есть |
| трансляцияфонтпроцент | 75 | Размер символов в процентах для трансляций |
| цвет выделения | желтый | цвет для избранных |
| ширина диалогапроцент | 90 | размер диалогов в процентах от виджета |
| диалоговая высотапроцент | 90 | размер диалогов в процентах от виджета |

##### CSS-классы
Пожалуйста, измените w00001 на идентификатор вашего виджета.

Изменить форматирование чередующихся цветов фона трансляций

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
Поле ввода «От» предварительно заполняется фактической датой. если это поле не изменено, поиск начинается с фактического времени.
если вы измените это поле на будущую или прошлую дату, поиск начнется в 00:00 этой даты.
Одно или оба поля ввода: текст поиска и категория должны быть заполнены/выбраны.

Следующие атрибуты доступны для настройки в vis. Минимальная конфигурация — установить точку данных в cmd-datapoint.

| Атрибут | Пример | Описание |
| --------------------- | ------------------- | ---------------------------------------------------- |
| Идентификатор объекта | tvprogram.0.tv1.cmd | Точка данных экземпляра адаптера телепрограммы.  |
| показатькартинки | х | Покажите фотографии, если они есть |
| Максрезультат | 10 | максимальное количество результатов в списке |
| высотаСтрока | 35 | Высота каждой отображаемой строки |
| трансляцияфонтпроцент | 75 | Размер символов в процентах для трансляций |
| цвет выделения | желтый | цвет для избранных |
| ширина диалогапроцент | 90 | размер диалогов в процентах от виджета |
| диалоговая высотапроцент | 90 | размер диалогов в процентах от виджета |

##### CSS-классы
Пожалуйста, измените w00001 на идентификатор вашего виджета.

Изменить форматирование чередующихся цветов фона трансляций

```css
#w00001 .tv-search .tv-row:nth-child(odd) {
   background-color: rgba(128, 128, 128, 0.65);
}
#w00001 .tv-search .tv-row:nth-child(even) {
   background-color: rgba(128, 128, 128, 0.55);
}

```

### Предоставленные точки данных
Следующий набор данных существует для каждого созданного телевизора.

####фильтр каналов
эта точка данных содержит каналы, показанные в виджете в виде массива JSON.

#### Командная строка
эта точка данных используется для внутренней связи между виджетами и адаптером

#### Избранное
эта точка данных содержит выбранные избранные в виде JSON-массива

#### Записывать
Эта точка данных устанавливается, если пользователь нажимает кнопку записи в подробном представлении трансляции.
Предоставленные данные

| поле | Пример | Описание |
| ----------- | -------------------------- | ---------------------- |
| время начала | 2021-01-01T00:10:00+01:00 | Время начала |
| время окончания | 2021-01-01T00:10:30+01:00 | Время окончания |
| титул | Название передачи | название передачи |
| канал | 7 | Уникальный номер канала |
| идентификатор канала | здф | Уникальный идентификатор канала |
| название канала | ЗДФ | Читабельное название канала |
| событие | 12345678 | Уникальный идентификатор трансляции |

#### Выбор канала
Эта точка данных используется для распознавания команды переключения канала при щелчке по логотипу канала или значку переключателя в подробном представлении.

#### Показывать
эта точка данных содержит статус того, должно ли отображаться только избранное или все в виджете tvprogram

#### Конфигурация
эта точка данных устарела и будет удалена в следующих версиях.

### Предоставленные команды отправки
Все данные можно запросить у адаптера с помощью sendto-команд. это можно использовать для разработки отдельных функций

#### GetServerData
Запросить базовые данные у адаптера.

##### Допустимые параметры:
* категории
* жанры
* каналы

**Возвраты:**

Множество

**Пример:**

```javascript
sendTo("tvprogram.0","getServerData","categories",(data)=>console.log(data));
```

#### GetServerTVProgram
Запросить данные программы у адаптера.

##### Допустимые параметры:
строка даты в следующем формате: гггг-мм-дд

**Возвраты:**

Множество

**Пример:**

```javascript
sendTo("tvprogram.0","getServerTVProgram","2021-02-10",(data)=>console.log(data));
```

#### GetServerBroadcast
Запросите подробные данные трансляции.

##### Допустимые параметры:
объект, который содержит дату просмотра в следующем формате гггг-мм-дд — идентификатор события трансляции

**Возвраты:**

Объект

**Пример:**

```javascript
sendTo("tvprogram.0","getServerBroadcast",{viewdate:"2021-02-10",eventid:"10659522"},(data)=>console.log(data));
```

#### GetFavoritesDatax
Запросите все любимые трансляции с этого момента и до конца сохраненных данных.

##### Допустимые параметры:
Массив избранного

**Возвраты:**

Множество

**Пример:**

```javascript
sendTo("tvprogram.0","getFavoritesDatax",['heute','Tagesschau'],(data)=>console.log(data));

```

#### GetServerBroadcastNow
Запрашивает все трансляции, которые в данный момент идут.

##### Допустимые параметры:
Массив идентификаторов ваших любимых каналов.

**Возвраты:**

Множество

**Пример:**

```javascript
sendTo("tvprogram.0","getServerBroadcastNow",[1,6,22,7],(data)=>console.log(data));

```

#### GetServerBroadcastDate
Запрашивает все трансляции, которые выполняются в определенное время.

##### Допустимые параметры:
Массив идентификаторов каналов ваших любимых каналов datetime

**Возвраты:**

Множество

**Пример:**

```javascript
sendTo("tvprogram.0","getServerBroadcastDate",{channelfilter:[1,6,22,7],date:"2021-02-10T20:15:00.000Z"},(data)=>console.log(data));

```

#### GetServerBroadcastFind
Поиск трансляций за разное время и по категориям (по желанию).

##### Допустимые параметры:
Channelfilter: массив идентификаторов каналов ваших любимых каналов. Categoryfilter: необязательно. Массив идентификаторов категорий. datetimefrom: datetime от datetimetill: datetime до textfilter: необязательный заголовок или часть заголовка для поиска максимального количества результатов: необязательно максимальное количество результатов. Значение по умолчанию — 10.

**Возвраты:**

Множество

**Пример:**

```javascript
sendTo("tvprogram.0","getServerBroadcastFind",{
    channelfilter:[1,6,22,7],
    categoryfilter:[],
    datefrom:"2021-02-10T10:00:00.000Z",
    datetill:"2021-02-10T23:00:00.000Z",
    textfilter:"",
    maxresults:10
},(data)=>console.log(data));
```

#### GetServerInfo
Запросить доступные даты трансляции в памяти адаптера

##### Допустимые параметры:
пустой объект

**Возвраты:**

Множество

**Пример:**

```javascript
sendTo("tvprogram.0","getServerInfo","{}",(data)=>console.log(data));

```

### Сообщество предоставляет виджеты и скрипты
#### Гармония и MagentaTV
Скрипт предоставляет пиксель. После щелчка по логотипу канала скрипт устанавливает сопоставленный идентификатор канала в точку данных гармонии.

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
const channelList = {  // Ausgabe vom Adapter : Kanalnummer im Receiver
   "ard" : 1,
   "zdf" : 2,
   "rtl" : 3,
   "sat1": 4,
   "pro7": 5,
   "vox" : 6,
   "kaka":7,
   "rtl2":8,
   "superrtl":9,
   "kika":10,
   /* nickelodeon 11 */
   "3sat":12,
   "welt":13,
   "ntv":14,
   "phoenix":15,
   "tele5":16,
   "zdfneo":17,
   /* #dabeiTV 18 */
   /* disneyplus 19 */
   /* lokalTV 20 */
   "bayern3":21,
   "hessen3":25,
   "mdr":27,
   "nord3":29,
   /* "bremen":30, */
   /* "rbb berlin":31, */
   /* "sr":36, */
   "sw3":37, // bw
   /* "sw3":38, // rp */
   "west3":39,
   /* "eurosport1":50, */
   "sport1":51,
   /* sky sport news 52 */
   "arte":55,
   "one":56,
   /* anixe 60 */
   "dmax":64,
   "pro7maxx":69,
   "nitro":70,
   /* sat1 gold 73 */
   "sixx":75,
   /* ard alpha 80 */
   /* DW 85 */
   /* euronews */
   /* Kabel Eins Doku 89 */
   /* N24 Doku 90 */
   "tagesschau24":91,
   /* Welt der Wunder 92 */
   /* zdfinfo 93 */
   "mtv":99,
};

function selectChannel (chNo) {
   // Zerlegen mehrstelliger Zahlen
   let ch_arr = new Array();
   ch_arr = [];
   if (logging) log("Kanalnummer gewählt: " + chNo);
   while (chNo > 0) { // rückwärts
       if (logging) log("erkannte Ziffer: " + chNo % 10 );
       ch_arr.push(chNo % 10); // letzte Ziffer hinten dran hängen
       chNo = chNo / 10;
       chNo = parseInt(chNo);
   }
   // array umdrehen und wieder auslesen und Taste(n) der HARMONY+Fernbedienung drücken
   ch_arr.reverse();
   if (logging) log ("Senderplatz hat " + ch_arr.length + " Ziffern" + ch_arr);
   for (let i = 0; i < ch_arr.length; i++) {
       // passende OID füllen
       setStateDelayed("harmony.0.Harmony_Hub.Telekom-DVR.Number" + ch_arr[i], 1, fbdelay, function() {
           if (logging) log ((i+1) + ". Taste: " + ch_arr[i] + " gedrückt");
       });
   }
}

on(idKanalWahl, function (obj) {
   log("Neues TV Programm: " + obj.state.val + " auf Kanal " + channelList[obj.state.val] + " gewählt");
   selectChannel(channelList[obj.state.val]);
});

```

### Функции не реализованы в адаптере, но предоставляются в виде скриптов для javascript-адаптера
#### Список записей
Список всех текущих времен записи, записанных точкой данных записи и обновляемых каждую минуту.
Вам необходимо настроить имя точки данных вашего RecorderList и имя точки данных, которую нужно наблюдать.
Как только сценарий добавляет запись в список, точка данных записи очищается.

```javascript
// datapoint where the List should be saved
var recorderListDP = "0_userdata.0.tvprogram.RecorderList";
// datapoint who should be monitored of new data
var recorderDP ="tvprogram.0.tv1.record";

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
    s = (s=="") ? s="[]":s;
    recorderList = JSON.parse(s) || [];
    index = recorderList.findIndex(function(el) {
        return JSON.stringify(el)==JSON.stringify(recObj);
    });
    if (index>-1) {
        recorderList.splice(index,1);
    }
    recorderList.push(recObj);
    setState(recorderListDP,JSON.stringify(recorderList));
    setState(recorderDP,"");

});
var timer = setInterval(function() {
    var recorderList;
    var s = getState(recorderListDP).val;
    s = (s=="") ? s="[]":s;
    recorderList = JSON.parse(s) || [];
    recorderList=recorderList.filter( (el) => new Date(el.endTime)>new Date());
    setState(recorderListDP,JSON.stringify(recorderList));
},1000*60);
 ```

Визуализировать эти данные поможет JSON-шаблон виджета из адаптера myTime со следующим шаблоном.
Введите в качестве json_oid точку данных со списком записей и в качестве json_template следующий код:

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

####Любимая трансляция на данный момент
Следующий скрипт раз в минуту определяет, запущена ли в данный момент любимая программа.

```javascript
// Favorites datapoint of your tv
var favoritesDP = "tvprogram.0.tv1.favorites";
// channelfilter datapoint of your tv
var channelfilterDP = "tvprogram.0.tv1.channelfilter";
// datapoint where the result should be saved
var favoritesBool ="0_userdata.0.tvprogram.favoriteNow";

var timer = setInterval(function() {
    var favorites = JSON.parse(getState(favoritesDP).val);
    var channelfilter = JSON.parse(getState(channelfilterDP).val);
    sendTo("tvprogram.0","getServerBroadcastNow",channelfilter,(data)=>{
            setState(favoritesBool,data.some((el) => favorites.includes(el.events[0].title)))
    });
},1000*60);

```

#### Раскраска программ, которые расположены в точке данных списка записей в виджете tvprogram
Следующий шаблон предназначен для шаблона JSON виджета из адаптера rssfeed.
этот шаблон не генерирует никаких видимых результатов, но генерирует инструкции CSS, которые раскрашивают текущие программы.
он также окрашивает кнопку записи в подробном представлении.

Чтобы использовать этот шаблон, выберите точку данных списка записей в свойствах виджета json_oid и вставьте следующий шаблон в json_template.

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
* показывать телевизионные данные на временной шкале по телеканалам
* показать подробную информацию о телетрансляции, если она доступна
* показывать маркер фактического положения с автоматической прокруткой
* настроить и упорядочить отображаемые телеканалы, изменение порядка возможно с помощью перетаскивания.
* команда переключения через точку данных после нажатия на логотип
* увеличение/уменьшение масштаба
* навигация на следующий и предыдущий дни
* кнопка воспроизведения для переключения точки данных канала
* центральное увеличение в ближайшие дни
* вернуться в сегодняшний день
* сбросить масштаб
* любимые передачи
* скопировать текст из Detailview
* положение маркера настраивается
* ширина и высота диалога настраивается
* Запись Datenpunkt, которую нужно выпить с Knopf mit Aufnahmedaten gefüllt wird
* Виджет для избранного
* скрыть неизбранное

### Делать
виджет телепрограммы:

* возможно, виджет основных трансляций
* Адаптер данных для других источников (Интернет, оборудование типа Enigma, VU-Box). В настоящее время рассмотрение этого вопроса приостановлено из-за низкого спроса.
* ~~улучшение документации по настройке виджетов~~
* ~~транслировать изображения, если они доступны на главном экране виджета времени~~
* ~~ищите по всему тексту, чтобы найти режиссёров и актёров~~
* ~~подсказки для кнопок виджета времени~~
* ~~Идеи дальнейших виджетов на основе существующего сценария телепрограммы~~
* ~~Проблема: бесконечная прокрутка в Firefox~~
* ~~обсуждается: Datenpunkt, mit allen Aufnahmedaten, должен быть реализован на адаптере видеомагнитофона или в отдельном скрипте~~
* ~~адаптивный дизайн для детального просмотра->нет возможности адаптивного дизайна для диалогового окна jquery, найдено другое решение с фиксированными макетами для высоты>ширины~~
* ~~Проблема: небольшой сбой пикселей, если панель прокрутки слева заполнена~~

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.1.3-alpha.1 (2024-06-04)

* fix lint errors

### 1.1.3-alpha.0 (2024-06-04)

* align structures and files

### 1.1.1 (2021-08-10)

* remove dead code / extend doku about the warnings in the iobroker log * change the method of setting for configuration data from widget to datapoint

### 1.1.0 (2021-05-06)

* tooltips for the buttons in the time widget / search through the whole text to also find directors and actors / add showpictures option in time,control and search widget / improve documentation

### 1.0.0

* (oweitman) stable version

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
