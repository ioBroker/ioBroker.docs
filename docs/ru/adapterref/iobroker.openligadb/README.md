---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.openligadb/README.md
title: Адаптер ioBroker для получения результатов футбольных матчей из OpenLigaDB.
hash: YrfbY729Ff6oXcaEvK7MjRVrj55++kWS04OdlNVuy74=
---
![Логотип](../../../en/adapterref/iobroker.openligadb/admin/openligadb_n.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.openligadb.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.openligadb.svg)
![Количество установок](https://iobroker.live/badges/openligadb-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/openligadb-stable.svg)
![nycrc config на GitHub](https://img.shields.io/nycrc/oweitman/iobroker.openligadb?preferredThreshold=functions)
![НПМ](https://nodei.co/npm/iobroker.openligadb.png?downloads=true)

# Адаптер ioBroker для получения результатов футбольных матчей из OpenLigaDB
## Обзор
Адаптер для запроса игровых данных для футбола или других игр из формы `openligadb.de`

## Конфигурация
Добавьте экземпляр адаптера и нажмите на значок гаечного ключа. В форме вы можете добавить ярлык из лиги и сезона.
Пожалуйста, посетите `openligadb.de` для получения информации о доступных лигах, сезонах и ярлыках. Если сезон длится два года, пожалуйста, укажите только год начала.

Пример данных для 1-й немецкой Бундлиги: `shortcut = bl1 season = 2023`

Если вы сохранили и закрыли конфигурацию, то вскоре после этого должны появиться новые данные для вашей лиги и сезона.

## Виджеты
На самом деле доступно 5 виджетов. Пожалуйста, введите openligadb в фильтр виджетов.

### Таблица 4
![Таблица виджетов 4](../../../en/adapterref/iobroker.openligadb/widgets/openligadb/img/table.png)

Это классический табличный вид. Таблица содержит несколько столбцов.

- MP = Количество сыгранных игр
- W = Победы
- D = Рисовать
- L = Потери
- Цели = Разница в количестве забитых мячей
- Очки = Количество набранных очков
- T = Тренд

#### Таблица атрибутов
| Атрибуты | Группа | Описание |
| ----------------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| все матчи | | Выберите точку данных `allmatches`. (Примечание: в устаревшем виджете вместо этого использовалась точка данных `table`.) Эта точка данных создается во время настройки после успешной установки лиги/сезона. Она содержит все данные о матчах для выбранной лиги/сезона в формате JSON. Все табличные представления (режимы) формируются на основе этого набора данных. |
| режим | | Определяет режим отображения таблицы. Доступные варианты: Итого (`1total`), Домашняя игра (`2home`), Выездная игра (`3away`), Первая половина (`4round1`), Вторая половина (`5round2`). |
| mode_binding | | Альтернатива `mode`, предназначенная для динамического управления посредством привязки. Принимает те же значения, что и `mode`. Если указано допустимое значение, оно переопределяет атрибут `mode`. Как правило, это поле может оставаться пустым. |
| mode_binding | | Альтернатива `mode`, предназначенная для динамического управления посредством привязки. Принимает те же значения, что и `mode`. Если предоставлено допустимое значение, оно переопределяет атрибут `mode`. Как правило, это поле может оставаться пустым. |
| maxicon | | Максимальный размер значка команды (применяется как к ширине, так и к высоте). |
| короткое название | | Отображает краткое название команды вместо полного названия команды, если оно доступно в наборе данных. |
| highlight | | Выделяет команды, названия которых соответствуют заданным терминам. Несколько терминов могут быть разделены точками с запятой (`;`). Совпадения заключаются в теги `<b>`. Дополнительное оформление можно применить с помощью CSS-класса `favorite` или путем определения пользовательских классов для каждого выделения (см. соответствующий раздел документации). |
| фильтр | | Фильтрует таблицу по названиям команд. Несколько параметров фильтра могут быть разделены точкой с запятой (`;`). |
| фильтр | | Фильтрует таблицу по названиям команд. Несколько параметров фильтра могут быть разделены точкой с запятой (`;`). |
| iconup,icondn,iconst | Группы значков атрибутов | Определяет пользовательские значки для индикаторов тренда (восходящий, нисходящий, стабильный). |
| lastgamecount в группе атрибутов | Расширенные настройки | Ограничивает расчет таблицы определенным количеством последних игровых дней относительно отображаемого игрового дня (`currgameday` или `showgameday`). Пример: `showgameday` = 10 и `lastgamecount` = 5 → учитываются только игровые дни с 6 по 10. |
| lastgamecount в группе атрибутов | Расширенные настройки | Ограничивает расчет таблицы определенным количеством последних игровых дней относительно отображаемого игрового дня (`currgameday` или `showgameday`). Пример: `showgameday` = 10 и `lastgamecount` = 5 → учитываются только игровые дни с 6 по 10. |

### Игры игрового дня v2
![Виджет игрового дня](../../../en/adapterref/iobroker.openligadb/widgets/openligadb/img/gameday.png)

Этот виджет отображает день матча. В зависимости от настроек, он может всегда показывать текущий день матча, день матча относительно текущего дня матча или конкретный день матча.

Кроме того, можно установить количество отображаемых игровых дней.
Некоторые элементы отображения помечены **CSS-классами**, для которых затем можно задать желаемый формат:

| CSS-класс | На какой элемент влияет | Примечания |
| --------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Избранное | Заголовок дня матча (дата/время) | Позволяет форматировать дату и время, когда любимая команда играет в этот день матча. Может быть дополнительно объединен с классом CSS `todaygameheader`. |
| Избранное | Название команды | Позволяет настраивать форматирование названия команды. |
| сегодняшняя игра | Весь список матчей | Применяется, если матч проходит в текущий день. |
| Заголовок дня матча | Дата/время матча | Применяется, когда дата матча совпадает с текущим днем. |

#### Примеры CSS-классов
##### Пример: Отображение заголовка для дня матча (общая дата)
```css
.oldb-tt tr.favorite {
    color: yellow;
}
```

##### Пример названия команды
```css
.oldb-tt b.favorite {
    color: blue;
}
```

##### Пример игровой строки
```css
.oldb-tt .todaygame {
    color: red;
}
```

##### Пример заголовка для дня матча (сегодняшняя дата)
```css
.oldb-tt .todaygameheader {
    color: lightgreen;
}
```

#### Атрибут Игра игровых дней
| Атрибут | Группа | Описание |
| ---------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| все матчи | | Здесь необходимо выбрать точку данных с именем **allmatches**. Эта точка данных создается после настройки лиги/сезона, при условии, что конфигурация действительна. Она содержит все матчи и результаты лиги/сезона в формате JSON. Если игровой день проходит сегодня, дате (**todaygameheader**) и соответствующему матчу (**todaygame**) присваиваются CSS-классы. |
| currgameday | | Здесь необходимо выбрать точку данных с именем **currgameday**. Эта точка данных создается после настройки лиги/сезона, при условии, что конфигурация действительна. Ее значение рассчитывается адаптером на основе текущей даты. Текущий игровой день переключается посередине между последним матчем предыдущего игрового дня и первым матчем следующего игрового дня. |
| maxicon | | Максимальный размер значка команды по осям x и y. |
| короткое имя | | Отображает короткое имя вместо названия команды, если оно доступно в предоставленных данных. |
| showgoals | | Отображает информацию о бомбардирах. |
| Выделить | | Здесь можно ввести один или несколько терминов, разделенных точками с запятой (;), для выделения. Поиск выполняется только по названиям команд. Совпадающие названия заключаются в HTML-теги `<b>`. Более детальное форматирование можно применить с помощью CSS-класса **"favorite"**. Кроме того, для каждого выделения можно определить собственный CSS-класс. См. главу "todo". |
| showgameday | Расширенные настройки | Если это поле пустое, всегда отображается текущий игровой день. Если введено положительное число, отображается указанный игровой день (если он доступен). Если введено отрицательное число, игровой день отображается относительно текущего (например, -1 соответствует предыдущему игровому дню). |
| showgamedaycount | Расширенные настройки | Обычно это поле остается пустым или содержит 1, что означает отображение ровно одного игрового дня. Если введено другое число, будет отображаться это количество игровых дней, начиная с параметра, определенного в **showgameday**. |
| showweekday | Расширенные настройки | При желании отображает день недели перед датой. |

##### Примеры
###### Примеры привязки в атрибуте showgameday
При необходимости это поле также можно рассчитать и заполнить с помощью vis-binding.
Примеры относительно рассчитанного дня матча: |

```text
    Previous matchday
    {a:openligadb.0.bl1.2019.currgameday;a-1} or
    Next matchday
    {a:openligadb.0.bl1.2019.currgameday;a+1}
```

Поскольку привязка не рассчитывается в режиме визуального редактирования,

При использовании привязки в режиме редактирования всегда отображается текущий день матча.

### Игры любимых клубов 2
![Любимые игры](../../../en/adapterref/iobroker.openligadb/widgets/openligadb/img/favgames.png) Этот виджет отображает предстоящие матчи ваших любимых команд из одной или нескольких лиг. При выборе количества отображаемых лиг для каждой лиги отображается отдельная группа настроек, где можно задать следующие параметры.

Если матч состоится сегодня, соответствующий матч (todaygame) будет помечен CSS-классами.

#### Пример
```css
.todaygame {
    color: red;
}

.todaygameheader {
    color: yellow;
}
```

#### Атрибут
| Атрибут | Группа | Описание |
| ---------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Количество лиг | Общие | Указывает количество лиг для запроса. Для каждой лиги отображается отдельная группа настроек. |
| maxicon | Общие | Максимальный размер значка команды по осям x и y. |
| showresult | Общие | Определяет, следует ли отображать результаты матчей, если они доступны. |
| showabbreviation | Общие | Для различения матчей из разных лиг можно задать пользовательское сокращение для каждой конфигурации. Этот параметр определяет, будет ли отображаться это сокращение. |
| showweekday | Общие | При желании отображает день недели перед датой. Следующие атрибуты в группе **League** могут повторяться в зависимости от значения **leaguecount**. |
| все матчи | Лига | Здесь необходимо выбрать точку данных с именем **allmatches**. Эта точка данных создается после настройки лиги/сезона, при условии, что конфигурация действительна. Она содержит все матчи и результаты лиги/сезона в формате JSON. |
| currgameday | Лига | Здесь необходимо выбрать точку данных с именем **currgameday**. Эта точка данных создается после настройки лиги/сезона, при условии, что конфигурация действительна. Ее значение рассчитывается адаптером на основе текущей даты. Текущий игровой день переключается посередине между последним матчем предыдущего игрового дня и первым матчем следующего игрового дня. |
| showgameday | Лига | Если это поле пустое, используется текущий игровой день. Если введено положительное число, используется указанный игровой день (если он доступен). Если введено отрицательное число, игровой день определяется относительно текущего (например, -1 соответствует предыдущему игровому дню). |
| showgamedaycount | Лига | Определяет количество игровых дней, которые должны отображаться. Если оставить поле пустым, отображаются все оставшиеся игровые дни (максимум 9999 игровых дней). Если введено число, отображаются матчи за это количество игровых дней, начиная с параметра, определенного в **showgameday**. |
| короткое название | Лига | Отображает короткое название вместо названия команды, если оно доступно в предоставленных данных. |
| Сокращение | Лига | Сокращение, которое будет отображаться для этой лиги, если включена опция **showabbreviation**. |
| Выделить | Лига | Здесь можно ввести один или несколько терминов, разделенных точками с запятой (;), для обозначения любимых команд. Поиск выполняется только по названиям команд. В отличие от других виджетов, здесь не применяется специальное визуальное выделение. |

#### Примеры игры в «Любимые клубы»
##### Примеры привязки в атрибуте `showgameday` для игры «Любимые клубы»
Это поле также можно рассчитать и заполнить с помощью `vis-binding`.

Примеры относительно продуманного игрового дня:

```css
Previous matchday
{a:openligadb.0.bl1.2019.currgameday;a-1} or
Next matchday
{a:openligadb.0.bl1.2019.currgameday;a+1}
```

Поскольку привязка не рассчитывается в режиме визуального редактирования, при использовании привязки в режиме редактирования всегда отображается текущий день матча.

### Сводная таблица 2
Этот виджет отображает все матчи и результаты в виде сводной таблицы.

| CSS-класс | На какой элемент влияет | Пример |
| --------- | ------------------------------------- | ------- |
| Избранное | Названия команд выбраны с помощью **выделения** | |

#### Примеры сводных таблиц
##### Пример: Название команды выделено с помощью подсветки
```css
.oldb-tt .favorite {
    color: yellow;
}
```

#### Сводная таблица атрибутов
| Атрибут | Группа | Описание |
| ------------------ | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| все матчи | Общие | Здесь необходимо выбрать точку данных с именем **allmatches**. Эта точка данных создается после настройки лиги/сезона, при условии, что конфигурация действительна. Она содержит все матчи и результаты лиги/сезона в формате JSON. |
| currgameday | Общие | Здесь необходимо выбрать точку данных с именем **currgameday**. Эта точка данных создается после настройки лиги/сезона, при условии, что конфигурация действительна. Ее значение рассчитывается адаптером на основе текущей даты. Текущий игровой день переключается посередине между последним матчем предыдущего игрового дня и первым матчем следующего игрового дня. |
| maxicon | | Максимальный размер значка команды по осям x и y. |
| sort4e | | Определяет критерии сортировки, которые будут применяться. |
| короткое имя | | Отображает короткое имя вместо названия команды, если оно доступно в предоставленных данных. |
| Выделение в начале | | Отображает выделенные команды в начале таблицы. |
| выделить | | Здесь можно ввести один или несколько терминов, разделенных точками с запятой (;), для выделения. Поиск выполняется только по названиям команд. Совпадающие названия заключаются в HTML-теги `<b>`. Более детальное форматирование можно применить с помощью CSS-класса **"favorite"**. |

### Голевые нападающие 2
Этот виджет отображает всех лучших бомбардиров.

#### Целевые атрибуты
| Атрибут | Группа | Описание |
| ------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Голы | Общие | Здесь необходимо выбрать точку данных с именем **голы**. Эта точка данных создается после настройки лиги/сезона, при условии, что конфигурация действительна. Она содержит всех лучших бомбардиров текущего сезона. |
| maxcount | | Ограничивает количество отображаемых бомбардиров. |
| порядок сортировки | | Определяет порядок сортировки. |
| onlyhighlight | | Отображает только записи, соответствующие фильтру выделения. |
| выделить | | Здесь можно ввести один или несколько терминов, разделенных точками с запятой (;), для выделения. Поиск выполняется только по именам игроков. Совпадающие имена заключаются в HTML-теги `<b>`. Более детальное форматирование можно применить с помощью CSS-класса **"favorite"**. |

## Рецепты повторного использования
### Управление режимом таблицы с помощью кнопок
1. Создайте виджет **таблица версии 2** и настройте его, как описано в данной документации.
2. В настройках виджета, в группе **Видимость**, назначьте созданную вами точку данных.
3. Скопируйте этот виджет и разместите копии рядом друг с другом так, чтобы

В представлении всего **три экземпляра**.

4. В настройках **Видимости** каждого виджета установите **значение условия**.

присвойте одному из следующих значений (по одному на каждый виджет): `total`, `home`, `away`

5. Создайте новый виджет: **Radiobuttons ValueList**

(входит в стандартную установку vis).

6. В этом виджете, в группе **Общие**, выберите созданный вами идентификатор объекта.
7. В поле **Значения** введите:

`total;home;away` (это значение должно совпадать со значениями, используемыми в настройках видимости виджетов)

8. В поле **Тексты** введите:

`Total;Home;Away`

9. Откройте среду выполнения vis и протестируйте настройку.
10. После того, как всё заработает, расположите виджеты точно друг на друге.

чтобы они отображались как единый виджет.

### Эффект прокрутки (бегущей строки) для ряда виджетов
Наилучший результат достигается при отображении одной или нескольких строк, например, в виджете **FavGame**.

`#w00000` — это идентификатор виджета, который должен быть анимирован.

Расширять

```css
#w00000 .oldb-tt {
    max-width: 100vw; /* iOS needs this */
    overflow: hidden;
}

#w00000 .oldb-tt tbody {
    display: inline-block;
    padding-left: 100%;
    animation: marquee 10s linear infinite;
}

/* Make it move */
@keyframes marquee {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-100%);
    }
}
```

### Нажмите +/- Кнопки управления, чтобы сразу перейти к списку
![Кнопки управления](../../../en/adapterref/iobroker.openligadb/widgets/openligadb/img/controlbuttons.png)

Для этого элемента управления необходимо создать дополнительную точку данных числового типа.
В этом примере она была названа javascript.0.bl1.spieltag.

Благодаря bommel_030, 4 элемента управления для импорта можно найти здесь:

Расширять

```text
    [{"tpl":"_tplGroup","data":{"members":["w00065","w00066","g00001"],"visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","attrCount":"1","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0},"widgetSet":null,"style":{"top":38.28125,"left":"663px","width":"141px","height":"37px"}},{"tpl":"tplIconInc","data":{"oid":"javascript.0.bl1.spieltag","repeat_delay":"800","repeat_interval":"800","src":"","step":"-1","minmax":"1","text":"-","g_last_change":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"name":"spieltag_minus","g_visibility":false,"visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","g_gestures":false,"g_signals":false,"signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false},"style":{"left":"0%","top":"16.22%","background":"#303030","width":"17.73%","height":"67.57%","z-index":"50","font-family":"","background-color":"#303030","font-weight":"bolder","border-width":"2px","border-radius":"10px","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","color":"white","border-style":"solid","border-color":"white","font-size":""},"widgetSet":"jqui","grouped":true,"groupName":"w00065"},{"tpl":"tplIconInc","data":{"oid":"javascript.0.bl1.spieltag","repeat_delay":"800","repeat_interval":"800","src":"","step":"+1","minmax":"34","text":"+","gestures-offsetX":0,"gestures-offsetY":"-1","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis.0/VIS/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis.0/VIS/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis.0/VIS/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"g_last_change":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"name":"spieltag_plus","g_visibility":false,"visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide"},"style":{"left":"82.27%","top":"16.22%","background":"#303030","width":"17.73%","height":"67.57%","z-index":"50","font-family":"","background-color":"#303030","font-weight":"bolder","border-width":"2px","border-radius":"10px","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","color":"white","border-style":"solid","border-color":"white"},"widgetSet":"jqui","grouped":true,"groupName":"w00066"},{"tpl":"_tplGroup","data":{"members":["w00064","w00059"],"visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","attrCount":"1","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0},"widgetSet":null,"style":{"top":"0%","left":"21.99%","width":"56.74%","height":"100%"},"grouped":true,"groupName":"g00001"},{"tpl":"tplJquiSelectList","data":{"oid":"javascript.0.bl1.spieltag","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":true,"g_css_border":true,"g_gestures":false,"g_signals":false,"values":"1;2;3;4;5;6;7;8;9;10;11;12;13;14;15;16;17;18;19;20;21;22;23;24;25;26;27;28;29;30;31;32;33;34","texts":"1. Spieltag;2. Spieltag;3. Spieltag;4. Spieltag;5. Spieltag;6. Spieltag;7. Spieltag;8. Spieltag;9. Spieltag;10. Spieltag;11. Spieltag;12. Spieltag;13. Spieltag;14. Spieltag;15. Spieltag;16. Spieltag;17. Spieltag;18. Spieltag;19. Spieltag;20. Spieltag;21. Spieltag;22. Spieltag;23. Spieltag;24. Spieltag;25. Spieltag;26. Spieltag;27. Spieltag;28. Spieltag;29. Spieltag;30. Spieltag;31. Spieltag;32. Spieltag;33. Spieltag;34. Spieltag","height":"150","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"no_style":true,"class":"","lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"open":false,"name":"spieltag_liste","visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide"},"style":{"left":"0%","top":"54.77%","height":"45.95%","width":"100%","background":"","box-shadow":"","border-radius":"5px","padding-left":"","padding-right":"","margin-right":"","color":"","font-weight":"bolder","border-width":"2px","border-style":"solid","border-color":"white","background-color":""},"widgetSet":"jqui","grouped":true,"groupName":"w00064"},{"tpl":"tplIconState","data":{"oid":"javascript.0.bl1.spieltag","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":false,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"text":"Heute","invert_icon":false,"value":"{openligadb.0.bl1.2019.currgameday}"},"style":{"left":"0%","top":"0%","color":"white","background":"#303030","font-size":"small","font-weight":"normal","height":"45.95%","border-width":"2px","border-style":"solid","border-color":"white","width":"100%"},"widgetSet":"jqui","grouped":true,"groupName":"w00059"}]
```

### Отображение конкретных характеристик, если сегодня играет одна из ваших любимых команд.
**Пример 1** Если сегодня играет «Бавария», HTML-виджет приобретает зеленый фон.

Выражение привязки размещается здесь, в поле background-color на вкладке CSS Background.

```text
    {a:openligadb.0.bl1.2019.currgameday;vis.binds["openligadb"].checkTodayFavorite('openligadb.0.bl1.2019.allmatches','bayern')?'red':'green'}
```

Расширять

```text
    [{"tpl":"tplHtml","data":{"g_fixed":false,"g_visibility":false,"g_css_font_text":false,"g_css_background":true,"g_css_shadow_padding":false,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","refreshInterval":"0","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0},"style":{"left":"445px","top":"589px","background":"{a:openligadb.0.bl1.2019.currgameday;vis.binds[\"openligadb\"].checkTodayFavorite('openligadb.0.bl1.2019.allmatches','bayer')?'red':'green'}","width":"70px","height":"70px","border-radius":"10px"},"widgetSet":"basic"}]
```

### Выбор табличного режима для виджета «Таблица»
![Режим таблицы](../../../en/adapterref/iobroker.openligadb/widgets/openligadb/img/tableselect.png) Этот HTML-виджет управляет режимом работы табличного виджета.
Точка данных, используемая в следующем виджете:

`javascript.0.tablemode`

Это необходимо связать с атрибутом `mode_binding` в табличном виджете следующим образом:

```text
    {javascript.0.tabellemodus}
```

Вот код виджета для импорта.

Расширять

```text
    [{"tpl":"tplJquiRadioList","data":{"oid":"javascript.0.tabellemodus","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":false,"g_css_border":false,"g_gestures":false,"g_signals":false,"g_last_change":false,"visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","values":"1total;2home;3away;4round1;5round2","texts":"Gesamt;Heim;Auswärts;Hinrunde;Rückrunde","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"class":""},"style":{"left":"54px","top":"356px","background":"black","font-size":"xx-small"},"widgetSet":"jqui"}]
```

## Специальные функции
### Vis.binds\["openligadb"\].checkTodayFavorite(ObjectID,Избранное)
Функция JavaScript для проверки наличия сегодня матчей одной или нескольких команд. Эту функцию можно использовать через привязку vis.
В связи с требованиями привязки необходимо учитывать несколько моментов.

Эту функцию можно использовать в привязке, например, следующим образом.

Для целей тестирования в HTML-виджет можно ввести следующую запись.
Результат будет либо «да», либо «нет», в зависимости от того, был ли найден искомый термин в названиях команд сегодня.

Все кавычки (одинарные и двойные) должны быть введены точно так, как показано.

Схема
```text
    {a:oid;vis.binds["openligadb"].checkTodayFavorite('oid_allmatches','clubsuche1,clubsuche2')?'ja':'nein'}
```

#### Пример из реальной жизни
```text
    {a:openligadb.0.bl1.2024.currgameday;vis.binds["openligadb"].checkTodayFavorite('openligadb.0.bl1.2024.allmatches','bayern')?'ja':'nein'}
```

#### Значение параметра
```text
<table><tbody><tr><td>oid</td><td>An arbitrary data point that triggers the update. It is recommended to choose, for example, currgameday,<br>as this is updated simultaneously with allmatches.</td></tr><tr><td>oid_allmatches</td><td>Name of an allmatches data point for the respective league/season.</td></tr><tr><td>clubsuche</td><td>One or more names (can also be partial names), separated by commas (,). Please note:<br>This field corresponds to the highlight field in the widgets. Multiple search terms only need to be separated by commas here, not by semicolons as in the widgets.</td></tr></tbody></table>
```

Документация по виджетам vis доступна внутри vis или [Документация виджета/немецкий](https://htmlpreview.github.io/?https://github.com/oweitman/ioBroker.openligadb/blob/master/widgets/openligadb/doc.html)

## `sendTo` Команды
### `getMatchData`
Запросите данные из OpenLigaDB по лиге, сезону и временному диапазону.

#### Обязательные параметры
| `Parameter` | `Example` | `Type` | `Description` |
| `league` | `bl1` | `string` | `identifier of the league, see openlogadb` |
| `season` | `2024` | `string` | `name of the season, see openlogadb` |
| `datefrom` | `2024-09-01T00:00` | `string` | `date in ISO notation` |
| `datetill` | `2024-09-10T00:00` | `string` | `date in ISO notation` |
| `datetill` | `2024-09-10T00:00` | `string` | `date in ISO notation` |

#### Пример sendTo
```javascript
sendTo(
    'openligadb.0',
    'getMatchData',
    {
        league: 'bl1',
        season: '2024',
        datefrom: '2024-09-01T00:00',
        datetill: '2024-09-10T00:00',
    },
    function (matches) {
        console.log(matches);
    },
);
```

## Todo
- Проверка в виджете, если пользователь выбрал неверную точку данных.
- ~~перевод~~
- ~~документация по новым виджетам pivottable и goalgetters~~
- ~~Расширить режимы игры за столом, добавив 1-й и 2-й раунды~~
- ~~новый виджет: сводная таблица сыгранных игр~~
- ~~новый виджет для ранжирования игроков, забивших голы, с функцией сортировки~~
- ~~дополнить таблицу знаком тренда (стрелка вверх/вниз, точка, означающая отсутствие изменений)~~
- ~~Расширить таблицу для расчета с учетом x последних игр~~
- ~~Расширить таблицу для расчета рейтинга за определенный игровой день~~
- ~~адаптер документации / виджет~~
- ~~исправлена ошибка, связанная с динамическим изменением ширины столбца клуба~~
- ~~новый виджет: следующие x игр клуба~~
- ~~Настройки игрового дня виджета для начала и продолжительности игрового дня (-1,3 = показать предыдущий

(день игры и 3 игровых дня после этого)

- ~~Значение замены для режима редактирования, если параметр showgameday задан с помощью привязки~~
- ~~выделите любимый клуб~~
- ~~Управляемый игровой день в виджете игрового дня~~

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
   ### **WORK IN PROGRESS**
-->
### 1.9.3 (2026-03-29)

- translate widgets
- translate readme
- move widgetscript to dist folder
- remove unused scripts
- release
- fix workflow

### 1.9.1 (2025-08-26)

- test remove node 18,extend to node 24
- fix calcCurrentGameDay if games array is empty

### 1.9.0 (2025-08-04)

- revert to node 18
- move to axios
- use ioUtils
- move to class
- improve currgameday calc if the season didnt start

### 1.8.1 (2025-01-23)

- adjust breakpoints in jsonConfig as a workaround for the new table/card-elements

### 1.8.0 (2024-10-27)

- move widget documentation from html file to readme
- adjust and prove responsive design for jsonconfig
- implement individual color settings for highlite and filters for each widget

### 1.7.0 (2024-09-16)

- fix quotes

### 1.6.0 (2024-09-16)

- reimplement checkTodayFavorite

### 1.5.0 (2024-09-15)

- Addition of a CSS example for the Pivot Table widget
- add `sendTo` command to getMatchData
- remove deprecated widgets
- addition widget option "only logo" to supress the teamname

### 1.4.11 (2024-08-09)

- fix issues from adapter checker

### 1.4.10 (2024-08-02)

- switch to eslint 9
- adjust markdownlint settings to be compatible with prettier

### 1.4.9 (2024-06-13)

- fix if no game exist for team1/team2
- somme prettier changes
- launch config for vscode

### 1.4.8 (2024-06-06)

- release

### 1.4.7 (2024-06-04)

- update dependencies

### 1.4.6 (2024-06-01)

- fix yml structure

### 1.4.5 (2024-06-01)

- fix yml structure

### 1.4.4 (2024-06-01)

- Enable NPM Publish
- Enable dependabot
- fix checks from adapter checker

### 1.4.3 (2024-06-01)

- remove files from eslint check

### 1.4.2 (2024-06-01)

- fix double qoutes
- remove files from eslint check

### 1.4.1 (2024-06-01)

- update package and io-broker files
- fix problems with vis2
- remove vis as a

### 1.2.4

- fix problems reported by adapter-checker

### 1.2.3

- add connectiontype and datasource to io-package.json

### 1.2.2

- fix result calculation

### 1.2.1

- fix object type

### 1.2.0

- fix display of goals if goals are without minutes and playername saved by openligadb

- fixed that sometimed request of states failed

### 1.1.0

- prepare v1.1.0

### 1.0.3

- change setstate/createobject logic

### 1.0.2

- remove deprecated widgets / change widget beta flag

- improve debug messages

### 1.0.1

- improve error message for requests

### 1.0.0

- prepare for stable repository

### 0.11.5

- pivottable: show only results for selected gameday
- table3: icon attributes, add image selection dialog
- table3: add an extra attribute for mode to use with binding
- all widgets: update documentation

### 0.11.4

- fixed build/test problem

### 0.11.3

- pivottable: fix problem with rank number

### 0.11.2

- pivottable: fix problem with sort and highlightontop
- fix problem with goalgetters

### 0.11.1

- change some template settings, goalgetter table get headers,
  add object change sensing
- widget goalgetters: add parameter highlight and showonlyhighlight
- widget pivottable: add sort option and choice to place favorite teams on top
- remove year from date for several widgets

### 0.11.0

- extend table to calculate with x last games and extend table to calculate
  ranking for a defined gameday, to ensure backward compatibility i have to
  create a new table v3 widget
- extend table with trend sign (arrow up/down, point for no change)
- new widget goal getter ranking with sort function
- new widget pivot table of played games
- extend table modes with 1st round,2nd round

### 0.10.3

- change computing and output logic of gameday widget to mark gameday
  header with favorite class
- improve documentation with css-klasses for table widget
- bugfix for calculate gameday.

### 0.10.2

- Add data column goaldiff to table widget, improve more documentation
  (systax highlighting,copy code function), add example to
  control gameday with buttons,

### 0.10.1

- Improve documentation with more recipes and syntax highlighting,
  improve code to get and subscribe states

### 0.10.0

- New widget Table 2 that includes the calculation of the total, home and
  away results. the previous widget is now deprecated, due to the
  different datapoint (allmatches) to be selected.

### 0.9.3

- Remove ES6 features due to compatibility with older browsers

### 0.9.2

- next try to fix the experimental javascript binding function

### 0.9.1

- fix bugs in calculation matchresults and highlight clubs in favgames

### 0.9.0

- new Function for vis Binding to search for games at the actual day for
  favorite clubs, css-classes für games at actual day, fix bug to show
  the right match results,

### 0.8.0

- push version for latest repository. fix some typos. fix a problem with
  date handling on different OS

### 0.0.11

- widget gameday: fix issue with not working gamedaycount

### 0.0.10

- widget gameday: optional you can show informations about the goalgetters

### 0.0.9

- optional weekday for widgets: gameday and gamesoffavclub,highlight the
  clubname in gamesoffavclub

### 0.0.8

- new widget games of favorite clubs with multi league support as
  replacement for the old one

### 0.0.7

- close connections and remove observers (timeouts/intervals)

### 0.0.6

- NPM deployment and preperation for the latest repository

### 0.0.5

- highlight favorite club,
- Replacement value for edit mode if showgameday is set with binding,
- widget gameday setting for start gameday an length (-1,3 = show previous
  gameday and 3 gamedays after that)
- some documentation
- remove unused code
- new widget: next x games of club
- fix issue for dynamic with of club column

### 0.0.4

- fixed more oids in vis runtime

### 0.0.3

- fixed getting oids in vis runtime

### 0.0.2

- add controlable gameday logic to gameday widget and adapter

### 0.0.1

- initial release

## License

MIT License

Copyright (c) 2025-2026 oweitman

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