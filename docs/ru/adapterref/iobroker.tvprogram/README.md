---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tvprogram/README.md
title: ioBroker.tvprogram
hash: Ejc4/tay5KbNIvfEFtBNXsgIPONqBTULfy13H9kJPb4=
---
![Логотип](../../../en/adapterref/iobroker.tvprogram/admin/tvprogram.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.tvprogram.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.tvprogram.svg)
![Количество установок (последнее)](http://iobroker.live/badges/tvprogram-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/tvprogram-stable.svg)
![Статус зависимости](https://img.shields.io/david/oweitman/iobroker.tvprogram.svg)
![Известные уязвимости](https://snyk.io/test/github/oweitman/ioBroker.tvprogram/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.tvprogram.png?downloads=true)
![Трэвис-Си](http://img.shields.io/travis/oweitman/ioBroker.tvprogram/master.svg)
![Статус сборки AppVeyor](https://img.shields.io/appveyor/ci/oweitman/iobroker-tvprogram.svg)

# IoBroker.tvprogram
** Тесты: **

## Адаптер tvprogram для ioBroker
Этот адаптер регулярно опрашивает информацию о телевизионной программе.
Данные могут отображаться в различных виджетах.

Для его настройки адаптер должен уже получить доступ и заполнить необходимые данные.
Из-за своего размера данные хранятся не в точках данных, а в файлах (путь Linux: / opt / iobroker / data-files / tvprogram) и в памяти адаптера.
В конфигурации виджет должен быть заполнен только любой точкой данных адаптера (например, cmd).
Виджет автоматически ищет все оставшиеся точки данных.

## Монтаж
Адаптер можно установить как в стабильной версии, так и для тестовой версии через репозиторий beta / latest.

### Конфигурация адаптера
Вы можете настроить, сколько разных телевизоров или хотя бы разных конфигураций у вас будет.

### Предупреждения в журнале iobroker
Предупреждения вроде

«Состояние только для чтения» tvprogram.0.tv1.cmd »было записано без флага подтверждения со значением« новая | программа | 2021-01-01 »

все в порядке по дизайну из-за внутреннего механизма сигнализации между адаптером и виджетами, которые сначала устанавливаются без флага ack, а через некоторое время сбрасываются с помощью флага ack.

### Виджеты
Виджеты поддерживаются только в современных браузерах (Google Chrome, Mozilla Firefox, Opera, Safari).
Не поддерживается Internet Explorer или Microsoft Edge без Chromium (версия <79).

#### Время
Этот виджет показывает текущую телепрограмму на шкале времени по телеканалам.

Если текст позади логотипов каналов просвечивает, в виджете необходимо выбрать цвет фона.
обычно хороший подход - выбрать явный цвет переднего плана и фона для представления или, по крайней мере, для виджета.
Положение маркера обновляется каждые 15 секунд.

Если что-то пойдет не так после установки и виджет не отображается правильно, попробуйте следующую команду из оболочки:

iobroker загрузить все

Следующие атрибуты доступны для настройки в vis. Минимальная конфигурация - установить точку данных в cmd-datapoint.

| Атрибут | Пример | Описание |
| --------------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| tvprogram_oid | tvprogram.0.tv1.cmd | Datapoint экземпляра адаптера tvprogram. |
| widthItem | 120 | Стандартная ширина в пикселях для 30-минутного сегмента |
| heightRow | 35 | Высота каждой отображаемой строки |
| showpictures | х | Показывать изображения на шкале времени, если они доступны |
| headerfontpercent | 125 | Размер символа в процентах для заголовка (время) |
| broadcastfontpercent | 75 | Размер символов в процентах для трансляций |
| подсветка | желтый | цвет для фаворитов |
| markerpositionpercent | 25 | Положение маркера в процентах от ширины виджета |
| dialogwidthpercent | 90 | размер диалогов в процентах от виджета |
| dialogheightpercent | 90 | размер диалогов в процентах от виджета |

##### CSS-классы
Пожалуйста, измените w00001 на свой идентификатор виджета

Чтобы изменить форматирование диалоговых окон

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

Если вы используете некоторые дополнительные диалоги с другими настройками z-index, вы можете установить более высокий z-index для диалогов tvprogram.
Возможно, вам нужно установить число больше 300. Это зависит от настроек в других диалоговых окнах, которые перекрывают или скрывают диалоговые окна телепрограммы (информация о трансляции и выбор канала).

```css
.ui-dialog.w00001 {
   z-index:300 !important;
}
```

Чтобы изменить форматирование чередующихся цветов фона трансляций

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
Этот виджет показывает список избранных избранных, отсортированных по дате и времени.

Следующие атрибуты доступны для настройки в vis. Минимальная конфигурация - установить точку данных в cmd-datapoint.

| Атрибут | Пример | Описание |
| -------------- | -------------------- | --------------------------------------------------- |
| oid | tvprogram.0.tv 1.cmd | Datapoint экземпляра адаптера tvprogram. |
| имя канала | нет | Показать логотип (выкл.) Или название канала |
| showweekday | да | Выставочный будний день |
| maxfavorites | 10 | Максимальное количество фаворитов для показа |
| подсветка | желтый | цвет для фаворитов |

#### Контроль
Этот виджет показывает все актуальные трансляции. Вы можете щелкнуть логотип канала, чтобы переключить канал.
вы можете нажать на трансляцию, чтобы получить подробную информацию о трансляции.

Следующие атрибуты доступны для настройки в vis. Минимальная конфигурация - установить точку данных в cmd-datapoint.

| Атрибут | Пример | Описание |
| --------------------- | ------------------------ | -------------------------------------------------------------------------------------------------- |
| oid | tvprogram.0.tv1.cmd | Datapoint экземпляра адаптера tvprogram. |
| время | | Если пусто, то будут показаны фактические трансляции |
| время | 20:15 | если время только трансляции в это время будет отображаться в течение 120 минут, то будет показан следующий день |
| время | 20: 15/200 | если время с длительностью трансляция в это время будет показана на 200 минут |
| время | 2021-02-15T20: 15: 00.000Z | Если верна Datestring, тогда будет показана трансляция в это время. Помните часовые пояса |
| heightRow | 35 | Высота каждой отображаемой строки |
| showpictures | х | Показать картинки, если есть |
| broadcastfontpercent | 75 | Размер символов в процентах для трансляций |
| подсветка | желтый | цвет для фаворитов |
| dialogwidthpercent | 90 | размер диалогов в процентах от виджета |
| dialogheightpercent | 90 | размер диалогов в процентах от виджета |

##### CSS-классы
Пожалуйста, измените w00001 на свой идентификатор виджета

Чтобы изменить форматирование чередующихся цветов фона трансляций

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
Поле ввода «От» предварительно заполняется фактической датой. если это поле не изменилось, поиск начинается с фактического времени.
если вы измените это поле на будущую или прошлую дату, поиск начнется в 00:00 этой даты.
Одно или оба поля ввода, текст поиска и категория должны быть заполнены / выбраны.

Следующие атрибуты доступны для настройки в vis. Минимальная конфигурация - установить точку данных в cmd-datapoint.

| Атрибут | Пример | Описание |
| --------------------- | ------------------- | ---------------------------------------------------- |
| ID объекта | tvprogram.0.tv1.cmd | Datapoint экземпляра адаптера tvprogram. |
| showpictures | х | Показать картинки, если есть |
| maxresults | 10 | max результатов в списке |
| heightRow | 35 | Высота каждой отображаемой строки |
| broadcastfontpercent | 75 | Размер символов в процентах для трансляций |
| подсветка | желтый | цвет для фаворитов |
| dialogwidthpercent | 90 | размер диалогов в процентах от виджета |
| dialogheightpercent | 90 | размер диалогов в процентах от виджета |

##### CSS-классы
Пожалуйста, измените w00001 на свой идентификатор виджета

Чтобы изменить форматирование чередующихся цветов фона трансляций

```css
#w00001 .tv-search .tv-row:nth-child(odd) {
   background-color: rgba(128, 128, 128, 0.65);
}
#w00001 .tv-search .tv-row:nth-child(even) {
   background-color: rgba(128, 128, 128, 0.55);
}

```

### Предоставленные точки данных
Для каждого созданного ТВ существует следующий набор точек данных.

** фильтр каналов **

эта точка данных содержит каналы, показанные в виджете в виде массива JSON.

** cmd **

эта точка данных используется для внутренней связи между виджетами и адаптером

** избранное **

эта точка данных содержит выбранные избранные в виде массива JSON

**записывать**

Эта точка данных устанавливается, если пользователь нажимает кнопку записи в подробном представлении трансляции.
Представленные данные

| поле | Пример | Описание |
| ----------- | -------------------------- | ---------------------- |
| startTime | 2021-01-01T00: 10: 00 + 01: 00 | Время начала |
| endTime | 2021-01-01T00: 10: 30 + 01: 00 | Время окончания |
| название | Название трансляции | название передачи |
| канал | 7 | Уникальный номер канала |
| channelid | zdf | Уникальный идентификатор канала |
| имя канала | ZDF | Читаемое название канала |
| вечерний | 12345678 | Уникальный идентификатор трансляции |

** selectchannel **

Эта точка данных используется для распознавания команды переключения каналов при щелчке по логотипу канала или значку переключателя в подробном представлении.

**показать**

эта точка данных содержит статус того, следует ли отображать в виджете tvprogram только избранное или все

** конфигурация **

эта точка данных устарела и будет удалена в следующих версиях

### Предоставленные команды отправки
Все данные можно запросить у адаптера с помощью команд sendto. это может быть использовано для развития индивидуальных функций

#### GetServerData
Запросить базовые данные у адаптера.

** Допустимые параметры **

* категории
* жанры
* каналы

** Возвращает: **

Множество

**Пример:**

```javascript
sendTo("tvprogram.0","getServerData","categories",(data)=>console.log(data));
```

#### GetServerTVProgram
Запросить данные программы от адаптера.

** Допустимые параметры **

строка даты в следующем формате: гггг-мм-дд

** Возвращает: **

Множество

**Пример:**

```javascript
sendTo("tvprogram.0","getServerTVProgram","2021-02-10",(data)=>console.log(data));
```

#### GetServerBroadcast
Запросите подробные данные о трансляции.

** Допустимые параметры **

объект, который содержит дату просмотра в следующем формате гггг-мм-дд вечер трансляции

** Возвращает: **

Объект

**Пример:**

```javascript
sendTo("tvprogram.0","getServerBroadcast",{viewdate:"2021-02-10",eventid:"10659522"},(data)=>console.log(data));
```

#### GetFavoritesDatax
Запросить все любимые трансляции с этого момента до конца сохраненных данных.

** Допустимые параметры **

Массив избранного

** Возвращает: **

Множество

**Пример:**

```javascript
sendTo("tvprogram.0","getFavoritesDatax",['heute','Tagesschau'],(data)=>console.log(data));

```

#### GetServerBroadcastNow
Запрашивает все текущие трансляции

** Допустимые параметры **

Массив channelID ваших любимых каналов

** Возвращает: **

Множество

**Пример:**

```javascript
sendTo("tvprogram.0","getServerBroadcastNow",[1,6,22,7],(data)=>console.log(data));

```

#### GetServerBroadcastDate
Запрашивает все трансляции, которые выполняются в определенное время

** Допустимые параметры **

Массив channelID ваших любимых каналов datetime

** Возвращает: **

Множество

**Пример:**

```javascript
sendTo("tvprogram.0","getServerBroadcastDate",{channelfilter:[1,6,22,7],date:"2021-02-10T20:15:00.000Z"},(data)=>console.log(data));

```

#### GetServerBroadcastFind
Поиск трансляций по диапазону времени и, по желанию, по категориям

** Допустимые параметры **

channelfilter: массив идентификаторов каналов ваших любимых каналов. categoryfilter: необязательный массив идентификаторов категорий datetimefrom: datetime from datetimetill: datetime до textfilter: необязательный заголовок или часть заголовка для поиска maxresults: необязательно максимальное количество результатов. Значение по умолчанию - 10.

** Возвращает: **

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
Запрашивать доступные даты трансляции в памяти адаптера

** Допустимые параметры **

пустой объект

** Возвращает: **

Множество

**Пример:**

```javascript
sendTo("tvprogram.0","getServerInfo","{}",(data)=>console.log(data));

```

### Сообщество предоставляет виджеты / скрипты
#### Гармония и MagentaTV
Скрипт предоставляет с помощью pix. После щелчка по логотипу канала скрипт устанавливает сопоставленный идентификатор канала в точку данных гармонии.

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
Список всех текущих значений времени записи, записанных по точке данных записи и обновляемых каждую минуту.
Вы должны настроить имя точки данных вашего RecorderList и имя точки данных, которую нужно наблюдать.
Как только сценарий добавит запись в список, точка данных записи очищается.

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

Чтобы визуализировать эти данные, шаблон JSON виджета из адаптера myTime может помочь со следующим шаблоном.
Введите как json_oid точку данных со списком записей и как json_template следующий код:

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
Следующий скрипт раз в минуту определяет, запущена ли любимая программа в данный момент.

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

#### Раскраска программ, которые находятся в точке данных списка записей в виджете tvprogram
следующий шаблон предназначен для шаблона JSON виджета из адаптера rssfeed.
этот шаблон не генерирует видимого вывода, но генерирует инструкции CSS, которые окрашивают текущие программы.
он также окрашивает кнопку записи в подробном обзоре.

чтобы использовать этот шаблон, выберите точку данных списка записей в свойствах виджета json_oid и вставьте следующий шаблон в json_template

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

### Функции:
- показывать телевизионные данные на временной шкале по телеканалу
- показать подробную информацию о телетрансляции, если таковая имеется
- показать маркер фактического положения с автоматической прокруткой
- настроить отображаемые телеканалы и порядок, переупорядочивание возможно с помощью dragNdrop.
- переключить команду через точку данных после нажатия на логотип
- масштабирование / уменьшение
- навигация в следующие и предыдущие дни
- кнопка воспроизведения для переключения точки данных канала
- увеличить центр в следующие дни
- вернуться к сегодняшнему дню
- сбросить зум
- любимые передачи
- копировать текст из Detailview
- положение маркера настраивается
- ширина и высота диалогового окна настраиваются
- Запись Datenpunkt, der nach druck auf Knopf mit Aufnahmedaten gefüllt wird
- Виджет для избранного
- скрыть не избранные

### Сделать
виджет твпрограмма:

- возможно, виджет выделенных трансляций
- Адаптер данных для других источников (Интернет, оборудование, такое как Enigma, VU-Box). Рассмотрение этого вопроса в настоящее время приостановлено из-за низкого спроса.
- ~~ улучшить документацию по настройке виджетов ~~
- ~~ транслируйте изображения, если они доступны в главном окне виджета времени ~~
- ~~ поиск по всему тексту, чтобы также найти режиссеров и актеров ~~
- ~~ всплывающие подсказки для кнопок в виджете времени ~~
- ~~ Идеи для дальнейших виджетов на основе существующего скрипта телепрограммы ~~
- ~~ Проблема: бесконечная прокрутка в firefox ~~
- ~~ подлежит обсуждению: Datenpunkt, mit allen Aufnahmedaten, должен быть реализован на адаптере видеомагнитофона или в отдельном скрипте ~~
- ~~ адаптивный дизайн для детального просмотра-> для диалогового окна jquery невозможно адаптивный дизайн, найдено другое решение с фиксированными макетами для высоты> ширина ~~
- ~~ Проблема: небольшой сбой пикселей, если панель прокрутки слева заполнена ~~

## Changelog

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

Copyright (c) 2021 oweitman <oweitman@gmx.de>