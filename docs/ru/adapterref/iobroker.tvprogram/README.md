---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tvprogram/README.md
title: ioBroker.tvprogram
hash: HQCNcfKk0ZimHkvdAFc4Ul9MGZEncFjEfpVSBztwIv8=
---
![Логотип](../../../en/adapterref/iobroker.tvprogram/admin/tvprogram.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.tvprogram.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.tvprogram.svg)
![Количество установок](https://iobroker.live/badges/tvprogram-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/tvprogram-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.tvprogram.png?downloads=true)

# IoBroker.tvprogram
**Тесты:** ![Тестирование и выпуск](https://github.com/oweitman/ioBroker.tvprogram/workflows/Test%20and%20Release/badge.svg)

## `tvprogram` адаптер для ioBroker
Этот адаптер регулярно опрашивает информацию о телевизионной программе.
Данные могут отображаться в различных виджетах.

Для настройки адаптер должен предварительно получить доступ к необходимым данным и заполнить их.
Из-за своего размера данные хранятся не в виде отдельных точек данных, а в файлах (путь в Linux: /opt/iobroker/data-files/tvprogram) и в памяти адаптера.
В конфигурации виджет необходимо заполнить только любыми точками данных адаптера (например, cmd).
Виджет автоматически ищет все оставшиеся точки данных.

## Установка
Адаптер можно установить через стабильную версию, а для тестирования — через репозиторий beta/latest.

## Конфигурация адаптера
Вы можете настроить количество различных телевизоров или, по крайней мере, различные конфигурации, которые у вас будут.

### Виджеты
Виджеты поддерживаются только в современных браузерах (Google Chrome, Mozilla Firefox, Opera, Safari).
Не поддерживаются в Internet Explorer и Microsoft Edge без Chromium (версия <79).

#### Время
Этот виджет отображает текущую телепрограмму на временной шкале по телеканалам.

Если текст за логотипами каналов просвечивает, в виджете необходимо выбрать цвет фона.
Как правило, рекомендуется явно выбрать цвет переднего и заднего плана для представления или, по крайней мере, для виджета.
Положение маркера обновляется каждые 15 секунд.

Если после установки что-то пойдёт не так и виджет будет отображаться некорректно, попробуйте выполнить следующую команду в командной строке:

iobroker загрузить все

В vis для настройки доступны следующие атрибуты. Минимальная конфигурация заключается в установке точки данных в значение cmd-datapoint.

| Атрибут | Пример | Описание |
| ----------------------- | --------------------- | ----------------------------------------------------- |
| `tvprogram_oid` | `tvprogram.0.tv1.cmd` | Точка данных экземпляра адаптера `tvprogram`. |
| `heightRow` | 35 | Высота каждой отображаемой строки |
| `showpictures` | x | Отображать изображения на временной шкале, если они доступны |
| `headerfontpercent` | 125 | Размер символов в процентах для заголовка (время) |
| `broadcastfontpercent` | 75 | Размер символов в процентах для трансляций |
| `highlightcolor` | желтый | цвет для избранных |
| `markerpositionpercent` | 25 | Положение маркера в процентах от ширины виджета |
| `dialogwidthpercent` | 90 | размер диалоговых окон в процентах от размера виджета |
| `dialogheightpercent` | 90 | размер диалоговых окон в процентах от размера виджета |
| `dialogheightpercent` | 90 | размер диалоговых окон в процентах от размера виджета |

##### CSS-классы
Пожалуйста, замените `w00001` на идентификатор вашего виджета.

Изменить форматирование диалоговых окон

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

Если вы используете дополнительные диалоговые окна с другими настройками z-index, вы можете установить более высокое значение z-index для диалоговых окон телепрограммы.
Возможно, вам потребуется установить значение больше 300. Это зависит от настроек в других диалоговых окнах, которые перекрывают или скрывают диалоговые окна телепрограммы (информация о трансляции и выбор канала).

```css
.ui-dialog.w00001 {
    z-index: 300 !important;
}
```

Изменить формат чередования цветов фона в трансляциях.

```css
#w00001 .scrollcontainer ul.tv-row:nth-child(odd) > li.broadcast:nth-child(odd),
#w00001 ul.tv-row:nth-child(odd) > li.time:nth-child(odd) {
    background-color: rgba(128, 128, 128, 0.65);
}
#w00001 .scrollcontainer ul.tv-row:nth-child(odd) > li.broadcast:nth-child(even),
#w00001 ul.tv-row:nth-child(odd) > li.time:nth-child(even) {
    background-color: rgba(128, 128, 128, 0.55);
}
#w00001 .scrollcontainer ul.tv-row:nth-child(even) > li.broadcast:nth-child(odd) {
    background-color: rgba(128, 128, 128, 0.45);
}
#w00001 .scrollcontainer ul.tv-row:nth-child(even) > li.broadcast:nth-child(even) {
    background-color: rgba(128, 128, 128, 0.35);
}
```

#### Избранное
Этот виджет отображает список выбранных избранных элементов, отсортированных по дате и времени.

В vis для настройки доступны следующие атрибуты. Минимальная конфигурация заключается в установке точки данных в значение cmd-datapoint.

| Атрибут | Пример | Описание |
| ---------------- | ---------------------- | ----------------------------------------------------- |
| `oid` | `tvprogram.0.tv 1.cmd` | Точка данных экземпляра адаптера `tvprogram`. |
| `showweekday` | `yes` | Показывать в будние дни |
| `maxfavorites` | 10 | Максимальное количество избранных для отображения |
| `highlightcolor` | `yellow` | цвет для избранных |
| `highlightcolor` | `yellow` | цвет для избранного |

#### Контроль
Этот виджет отображает все актуальные трансляции. Вы можете нажать на логотип канала, чтобы переключиться на другой канал.
Вы также можете нажать на трансляцию, чтобы получить подробную информацию о ней.

В vis для настройки доступны следующие атрибуты. Минимальная конфигурация заключается в установке точки данных в значение cmd-datapoint.

| Атрибут | Пример | Описание |
| ---------------------- | ------------------------ | -------------------------------------------------------------------------------------------------- |
| `oid` | `tvprogram.0.tv1.cmd` | Точка данных экземпляра адаптера `tvprogram`. |
| `time` | 20:15 | Если бы трансляция в это время длилась 120 минут, то показывалась бы трансляция на следующий день |
| `time` | 20:15/200 | Если указать время с указанием продолжительности, трансляция в это время будет длиться 200 минут |
| `time` | 2021-02-15T20:15:00.000Z | Если строка даты в формате UTC действительна, то будет показана трансляция в это время. Не забудьте про часовые пояса |
| `heightRow` | 35 | Высота каждой отображаемой строки |
| `showpictures` | x | Показать изображения, если они есть |
| `broadcastfontpercent` | 75 | Размер символов в процентах для трансляций |
| `highlightcolor` | `yellow` | цвет для избранных |
| `dialogwidthpercent` | 90 | размер диалоговых окон в процентах от размера виджета |
| `dialogheightpercent` | 90 | размер диалоговых окон в процентах от размера виджета |
| `dialogheightpercent` | 90 | размер диалоговых окон в процентах от размера виджета |

##### CSS-классы
Пожалуйста, замените `w00001` на идентификатор вашего виджета.

Изменить формат чередования цветов фона в трансляциях.

```css
#w00001 .tv-control .tv-row:nth-child(odd) {
    background-color: rgba(128, 128, 128, 0.65);
}
#w00001 .tv-control .tv-row:nth-child(even) {
    background-color: rgba(128, 128, 128, 0.55);
}
```

#### Поиск
С помощью этого виджета вы можете искать трансляции по названию, описанию, дате начала и типу трансляции.
Поле ввода «От» предварительно заполняется фактической датой. Если это поле не изменяется, поиск начинается с фактического времени.
Если вы измените это поле на будущую или прошлую дату, поиск начнется с 00:00 этой даты.
Одно или оба поля ввода — текст поиска и категория — должны быть заполнены/выбраны.

В vis для настройки доступны следующие атрибуты. Минимальная конфигурация заключается в установке точки данных в значение cmd-datapoint.

| Атрибут | Пример | Описание |
| ---------------------- | --------------------- | ----------------------------------------------------- |
| `Object ID` | `tvprogram.0.tv1.cmd` | Точка данных экземпляра адаптера `tvprogram`. |
| `maxresults` | 10 | максимальное количество результатов в списке |
| `heightRow` | 35 | Высота каждой отображаемой строки |
| `broadcastfontpercent` | 75 | Размер символов в процентах для трансляций |
| `highlightcolor` | `yellow` | цвет для избранных |
| `dialogwidthpercent` | 90 | размер диалоговых окон в процентах от размера виджета |
| `dialogheightpercent` | 90 | размер диалоговых окон в процентах от размера виджета |
| `dialogheightpercent` | 90 | размер диалоговых окон в процентах от размера виджета |

##### CSS-классы
Пожалуйста, замените `w00001` на идентификатор вашего виджета.

Изменить формат чередующихся цветов фона в трансляциях.

```css
#w00001 .tv-search .tv-row:nth-child(odd) {
    background-color: rgba(128, 128, 128, 0.65);
}
#w00001 .tv-search .tv-row:nth-child(even) {
    background-color: rgba(128, 128, 128, 0.55);
}
```

### Предоставленные точки данных
Для каждого созданного телевизора существует следующий набор данных.

#### `channelfilter`
Эта точка данных содержит каналы, отображаемые в виджете, в виде JSON-массива.

#### `cmd`
Эта точка данных используется для внутренней связи между виджетами и адаптером.

#### `favorites`
Эта точка данных содержит выбранные избранные элементы в виде JSON-массива.

#### `record`
Этот параметр устанавливается, если пользователь нажимает кнопку записи в подробном представлении трансляции.
Предоставленные данные:

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
Этот параметр используется для распознавания команды переключения канала при щелчке по логотипу канала или значку переключения в подробном представлении.

#### `show`
Этот параметр содержит информацию о том, следует ли отображать в виджете tvprogram только избранное или все элементы.

#### `config`
Этот параметр устарел и будет удален в следующих версиях.

#### `optchnlogopath`
Указанные данные ведут в папку, где можно сохранить альтернативные логотипы каналов. Путь должен быть доступен через браузер.

В поле данных необходимо указать полный путь, начинающийся с http, включая завершающую косую черту.

**Пример:**

```text
/vis.0/icons/tvlogos/
```

затем становится доступен через

```text
http://localhost:8082/vis.0/icons/tvlogos/
```

Все значки следует загружать через диалоговое окно выбора файла в iobroker.

Пример см. в главе [Пример альтернативных логотипов](#alternative-channel-logos-by-tino-0)

### Предоставлены `Sendto`-команды
Все данные можно запросить у адаптера с помощью команд sendto. Это можно использовать для разработки индивидуальных функциональных возможностей.

#### `getServerData`
Запросите базовые данные у адаптера.

##### Допустимые параметры
- `категории`
- `жанры`
- `каналы`

**Возвраты:**

`Array`

**Пример:**

```javascript
sendTo('tvprogram.0', 'getServerData', 'categories', data => console.log(data));
```

#### `getServerTVProgram`
Запросите программные данные у адаптера.

##### Допустимые параметры
строка даты в следующем формате: `yyyy-mm-dd`

**Возвраты:**

`Array`

**Пример:**

```javascript
sendTo('tvprogram.0', 'getServerTVProgram', '2021-02-10', data => console.log(data));
```

#### `getServerBroadcast`
Запросите подробные данные о трансляции.

##### Допустимые параметры
Объект, содержащий дату просмотра в формате yyyy-mm-dd, идентификатор события трансляции.

**Возвраты:**

`Object`

**Пример:**

```javascript
sendTo('tvprogram.0', 'getServerBroadcast', { viewdate: '2021-02-10', eventid: '10659522' }, data => console.log(data));
```

#### `getFavoritesData`
Запросить все любимые трансляции с настоящего момента до конца сохраненных данных.

##### Допустимые параметры
`Array` избранных

**Возвраты:**

`Array`

**Пример:**

```javascript
sendTo('tvprogram.0', 'getFavoritesData', ['heute', 'Tagesschau'], data => console.log(data));
```

#### `getServerBroadcastNow`
Запрашивает все текущие трансляции.

##### Допустимые параметры
Массив идентификаторов каналов (channelID) ваших любимых каналов.

**Возвраты:**

`Array`

**Пример:**

```javascript
sendTo('tvprogram.0', 'getServerBroadcastNow', [1, 6, 22, 7], data => console.log(data));
```

#### `getServerBroadcastDate`
Запрашивает все трансляции, которые идут в указанное время.

##### Допустимые параметры
Массив идентификаторов каналов ваших любимых каналов (дата и время).

**Возвраты:**

`Array`

**Пример:**

```javascript
sendTo(
    'tvprogram.0',
    'getServerBroadcastDate',
    { channelfilter: [1, 6, 22, 7], date: '2021-02-10T20:15:00.000Z' },
    data => console.log(data),
);
```

#### `getServerBroadcastFind`
Поиск трансляций в заданном временном диапазоне с возможностью выбора категорий.

##### Допустимые параметры
`channelfilter`: Массив идентификаторов каналов (channelID) ваших любимых каналов `categoryfilter`: Необязательный массив идентификаторов категорий (categoryID) `datetimefrom`: дата и время от `datetimetill`: дата и время до `textfilter`: Необязательный заголовок или часть заголовка для поиска `maxresults`: Необязательное максимальное количество результатов. Значение по умолчанию — 10

**Возвраты:**

`Array`

**Пример:**

```javascript
sendTo(
    'tvprogram.0',
    'getServerBroadcastFind',
    {
        channelfilter: [1, 6, 22, 7],
        categoryfilter: [],
        datefrom: '2021-02-10T10:00:00.000Z',
        datetill: '2021-02-10T23:00:00.000Z',
        textfilter: '',
        maxresults: 10,
    },
    data => console.log(data),
);
```

#### `getServerInfo`
Запросите доступные даты трансляций в памяти адаптера.

##### Допустимые параметры
пустой объект

**Возвраты:**

`Array`

**Пример:**

```javascript
sendTo('tvprogram.0', 'getServerInfo', '{}', data => console.log(data));
```

### Сообщество предоставляет виджеты/скрипты
#### `Harmony` и `MagentaTV`
Скрипт предоставлен компанией pix. После нажатия на логотип канала скрипт устанавливает сопоставленный идентификатор канала в значение harmony-datapoint.

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
const idKanalWahl = 'tvprogram.0.tv1.selectchannel'; // Dateingabe aus VIS
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
    '3sat': 12,
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
    if (logging) log('Kanalnummer gewählt: ' + chNo);
    while (chNo > 0) {
        // rückwärts
        if (logging) log('erkannte Ziffer: ' + (chNo % 10));
        ch_arr.push(chNo % 10); // letzte Ziffer hinten dran hängen
        chNo = chNo / 10;
        chNo = parseInt(chNo);
    }
    // array umdrehen und wieder auslesen und Taste(n) der HARMONY+Fernbedienung drücken
    ch_arr.reverse();
    if (logging) log('Senderplatz hat ' + ch_arr.length + ' Ziffern' + ch_arr);
    for (let i = 0; i < ch_arr.length; i++) {
        // passende OID füllen
        setStateDelayed('harmony.0.Harmony_Hub.Telekom-DVR.Number' + ch_arr[i], 1, fbdelay, function () {
            if (logging) log(i + 1 + '. Taste: ' + ch_arr[i] + ' gedrückt');
        });
    }
}

on(idKanalWahl, function (obj) {
    log('Neues TV Programm: ' + obj.state.val + ' auf Kanal ' + channelList[obj.state.val] + ' gewählt');
    selectChannel(channelList[obj.state.val]);
});
```

#### Альтернативные логотипы канала от Тино 0
Ссылка на форум с примерами скриншотов: <https://forum.iobroker.net/topic/40168/test-adapter-tvprogram/863>

**Скачать логотипы канала:**

Для скачивания логотипов размером 400x160 пикселей необходимо зарегистрироваться.

<https://vuplus-support.org/wbb4/index.php?thread/64098-mirror-glass-3d-huminator-design-by-stefanbenno6/>

**Переименуйте логотипы:**

Выполните следующие команды в загруженной и распакованной папке.

<details><summary>Подробности</summary><pre><code> copy 1_0_19_283D_3FB_1_C00000_0_0_0.png ard.png copy 1_0_19_2B66_3F3_1_C00000_0_0_0.png zdf.png copy 1_0_19_EF10_421_1_C00000_0_0_0.png rtl.png copy 1_0_19_EF15_421_1_C00000_0_0_0.png rtl2.png copy 1_0_19_2E9B_411_1_C00000_0_0_0.png srtl.png copy 1_0_19_2EAF_411_1_C00000_0_0_0.png nitro.png copy 1_0_19_EF74_3F9_1_C00000_0_0_0.png sat1.png copy 1_0_19_EF75_3F9_1_C00000_0_0_0.png pro7.png copy 1_0_19_EF78_3F9_1_C00000_0_0_0.png pro7maxx.png copy 1_0_19_EF76_3F9_1_C00000_0_0_0.png kaka.png copy 1_0_19_EF77_3F9_1_C00000_0_0_0.png sixx.png copy 1_0_19_EF11_421_1_C00000_0_0_0.png vox.png copy 1_0_19_1519_455_1_C00000_0_0_0.png tele5.png copy 1_0_19_2B7A_3F3_1_C00000_0_0_0.png zdfneo.png copy 1_0_19_2B98_3F2_1_C00000_0_0_0.png kika.png copy 1_0_19_2B8E_3F2_1_C00000_0_0_0.png 3sat.png copy 1_0_19_285B_401_1_C00000_0_0_0.png phoenix.png copy 1_0_19_157C_41F_1_C00000_0_0_0.png disney.png copy 1_0_19_2871_425_1_C00000_0_0_0.png mdr.png copy 1_0_19_286F_425_1_C00000_0_0_0.png rbb.png copy 1_0_19_283F_3FB_1_C00000_0_0_0.png sw3.png copy 1_0_19_1581_41F_1_C00000_0_0_0.png sport1de.png copy 1_0_19_283E_3FB_1_C00000_0_0_0.png arte.png copy 1_0_19_526C_41D_1_C00000_0_0_0.png anixehd.png copy 1_0_19_151A_455_1_C00000_0_0_0.png dmax.png copy 1_0_19_2855_401_1_C00000_0_0_0.png bayern3.png copy 1_0_19_2873_425_1_C00000_0_0_0.png hessen3.png copy 1_0_1_6EE1_4B1_1_C00000_0_0_0.png radiobremen.png copy 1_0_19_2858_401_1_C00000_0_0_0.png nord3.png copy 1_0_19_2BA2_3F2_1_C00000_0_0_0.png info.png copy 1_0_19_132F_3EF_1_C00000_0_0_0.png orf1.png copy 1_0_19_1330_3EF_1_C00000_0_0_0.png orf2.png copy 1_0_19_2777_409_1_C00000_0_0_0.png mtv.png copy 1_0_19_288A_40F_1_C00000_0_0_0.png sw3.sr.png copy 1_0_1_6F76_457_1_C00000_0_0_0.png west3.png copy 1_0_19_2887_40F_1_C00000_0_0_0.png tagesschau24.png COPY 1_0_16_2EB9_411_1_C00000_0_0_0.png ntv.png copy 1_0_19_2888_40F_1_C00000_0_0_0.png one.png copy 1_0_19_2889_40F_1_C00000_0_0_0.png alpha.png copy 1_0_1_445F_453_1_C00000_0_0_0.png welt.png copy 1_0_1_772D_416_1_C00000_0_0_0.png eurosp.png copy 1_0_1_76C8_40E_1_C00000_0_0_0.png comedycentral.png copy 1_0_1_2F1D_441_1_C00000_0_0_0.png rtlnitro.png</code></pre></details>

**Создайте новую папку в vis:**

Открыть через диалоговое окно «Файловый менеджер».

Проверьте, существует ли следующий путь, или создайте его в диалоговом окне.

```text
/vis.0/icons/tvlogos/
```

**Введите путь в точке данных:**

Введите следующий путь в поле данных `optchnlogopath` вашего телевизора.

Замените 192.1.2.3 на IP-адрес вашей установки iobroker.

```text
http://192.1.2.3:8082/vis.0/icons/tvlogos/
```

**Настройте ширину значка:**

Каждый виджет имеет атрибут "Ширина канала логотипа, пиксели". Пожалуйста, укажите подходящую ширину для набора иконок.

### Функции, не реализованные в адаптере, но предоставляемые в виде скриптов для javascript-адаптера
#### `Recordlist`
Список всех текущих времен записи, зафиксированных точкой данных записи и обновляемых каждую минуту.
Необходимо указать имя точки данных вашего списка RecorderList и имя точки данных, за которой необходимо наблюдать.
Как только скрипт добавит запись в список, точка данных записи будет очищена.

```javascript
// datapoint where the List should be saved
var recorderListDP = '0_userdata.0.tvprogram.RecorderList';
// datapoint who should be monitored of new data
var recorderDP = 'tvprogram.0.tv1.record';

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
    s = s == '' ? (s = '[]') : s;
    recorderList = JSON.parse(s) || [];
    index = recorderList.findIndex(function (el) {
        return JSON.stringify(el) == JSON.stringify(recObj);
    });
    if (index > -1) {
        recorderList.splice(index, 1);
    }
    recorderList.push(recObj);
    setState(recorderListDP, JSON.stringify(recorderList));
    setState(recorderDP, '');
});
var timer = setInterval(function () {
    var recorderList;
    var s = getState(recorderListDP).val;
    s = s == '' ? (s = '[]') : s;
    recorderList = JSON.parse(s) || [];
    recorderList = recorderList.filter(el => new Date(el.endTime) > new Date());
    setState(recorderListDP, JSON.stringify(recorderList));
}, 1000 * 60);
```

Для визуализации этих данных может помочь виджет JSON-шаблон из адаптера myTime, используя следующий шаблон.
В качестве параметра json_oid введите точку данных с `recordlist`, а в качестве параметра json_template — следующий код:

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

#### Моя любимая трансляция на данный момент
Следующий скрипт раз в минуту определяет, запущена ли в данный момент выбранная вами программа.

```javascript
// Favorites datapoint of your tv
var favoritesDP = 'tvprogram.0.tv1.favorites';
// channelfilter datapoint of your tv
var channelfilterDP = 'tvprogram.0.tv1.channelfilter';
// datapoint where the result should be saved
var favoritesBool = '0_userdata.0.tvprogram.favoriteNow';

var timer = setInterval(function () {
    var favorites = JSON.parse(getState(favoritesDP).val);
    var channelfilter = JSON.parse(getState(channelfilterDP).val);
    sendTo('tvprogram.0', 'getServerBroadcastNow', channelfilter, data => {
        setState(
            favoritesBool,
            data.some(el => favorites.includes(el.events[0].title)),
        );
    });
}, 1000 * 60);
```

#### Раскраска программ, расположенных в точке данных `recordlist` в виджете tvprogram
Следующий шаблон предназначен для JSON-шаблона виджета из адаптера RSS-ленты.
Этот шаблон не генерирует никакого видимого вывода, но генерирует инструкции CSS, которые раскрашивают текущие программы.
Он также раскрашивает кнопку записи в подробном представлении.

Чтобы использовать этот шаблон, выберите точку данных recordlist в свойствах виджета json_oid и вставьте следующий шаблон в json_template.

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
- Отображение данных о телепередачах на временной шкале по телеканалам
- показать подробную информацию о телетрансляции, если таковая имеется
- Отображение маркера фактического положения с автоматической прокруткой
— Настройте отображаемые телеканалы и порядок их отображения; изменение порядка возможно с помощью перетаскивания (dragNdrop).
- переключение команды через точку данных после нажатия на логотип
- увеличение/уменьшение масштаба
- навигация по следующим и предыдущим дням
- кнопка воспроизведения для переключения каналов (точка данных)
- увеличение масштаба в ближайшие дни
- вернуться к сегодняшнему дню
- сбросить масштаб
- любимые трансляции
- скопировать текст из Detailview
- положение маркера можно настроить
- Ширина и высота диалогового окна настраиваются.
- Datenpunkt Record, der nach druck auf Knopf mit Aufnahmedaten gefüllt wird.
- Виджет для избранных
- скрыть неизбранное

### Todo
виджет телепрограммы:

- возможно, виджет для трансляций лучших моментов
— Адаптер данных для других источников (интернет, оборудование, такое как Enigma, VU-Box). Рассмотрение этого вопроса в настоящее время приостановлено из-за низкого спроса.
- ~~Улучшить документацию по настройке виджетов~~
- ~~транслировать изображения, если они доступны в основном окне виджета времени~~
— ~~просмотрите весь текст, чтобы найти также режиссеров и актеров~~
- ~~всплывающие подсказки для кнопок в виджете времени~~
- ~~Идеи для дальнейших виджетов на основе существующего сценария телепрограммы~~
- ~~Проблема: бесконечная прокрутка в Firefox~~
- ~~обсуждается: Datenpunkt, mit allen Aufnahmedaten, должен быть реализован на адаптере видеомагнитофона или в отдельном скрипте~~
- ~~Адаптивный дизайн для просмотра подробной информации -> адаптивный дизайн для диалогового окна jQuery невозможен, найдено другое решение с фиксированными параметрами высоты и ширины~~
- ~~Проблема: небольшой пиксельный сбой, если панель прокрутки полностью заполнена слева~~

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 4.0.3 (2026-02-27)

- update dependencies
- improve error handling

### 4.0.2 (2026-01-27)

- improve position of dialogs
- reduce requests to data provider
- test remove node 18,extend to node 24

### 4.0.0 (2025-01-21)

- Breaking Change. fix marker position with flexible width of channel logos. In each widget the property "width channel logo px" have to be set to approbiate width.

### 3.0.5 (2025-01-20)

- upgrade jscontroller dependency

### 3.0.4 (2025-01-20)

- remove check for certifates in axios due to expired certificate of data provider

### 3.0.3 (2025-01-03)

- fix datapoint creation and overwriting states

### 3.0.2 (2025-01-02)

- improve debug messages

### 3.0.1 (2025-01-02)

- fix channel select dialog
- fix css classes

### 3.0.0 (2025-01-02)

- TVs as a device, this is a major change because all data points have to be deleted manually by the user
- improve datapoint creation

### 2.3.1 (2025-01-02)

- little docu fixes

### 2.3.0 (2025-01-02)

- add datapoint for optional channel icons
- add logic in the widgets

### 2.2.0 (2024-12-16)

- remove jquery-ui dependency
- fix dialog is visible on view switch, now it's modal
- fix adapter icon
- fix eslint errors
- switch some callbacks to promises
- remove unused code

### 2.1.0 (2024-11-24)

- Change sento command from getFavoritesDatax to getFavoritesData
- switch to eslint
- complete rework of tvprogram to switch from callback to await
- the widgets are now compatible with vis-2 (minimum vis-2 version ist 2.10)
- due to datapoint management, all datapoints should be deleted.

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

Copyright (c) 2025-2026 oweitman <oweitman@gmx.de>