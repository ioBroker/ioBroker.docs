---
chapters: {"pages":{"en/adapterref/iobroker.homepilot/README.md":{"title":{"en":"ioBroker.homepilot"},"content":"en/adapterref/iobroker.homepilot/README.md"},"en/adapterref/iobroker.homepilot/docs/en/doc_homepilot_en.md":{"title":{"en":"ioBroker.homepilot"},"content":"en/adapterref/iobroker.homepilot/docs/en/doc_homepilot_en.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.homepilot/docs/en/doc_homepilot_en.md
title: ioBroker.homepilot
hash: P310Rs695JTh7E93Tlw9HR4BIacwTHcKlXGlF6IMK0Y=
---
![Логотип](../../../../../en/adapterref/iobroker.homepilot/admin/homepilot.png)

# IoBroker.homepilot
## Описание
Этот адаптер соединяет ioBroker и станцию Homepilot 9496 (1/2 с прошивкой ниже версии 5.0) Rademacher по протоколу TCP/IP для управления радиоуправляемыми устройствами Rademacher DuoFern. Кроме того, DuoFern работает на частоте 434,5 МГц. Homepilot по умолчанию синхронизируется с ioBroker каждые 12 секунд. С другой стороны, ioBroker передает свои команды точно в срок. Поэтому этот адаптер следует использовать для управления исполнительными механизмами Homepilot из ioBroker, а не для считывания данных с датчиков Homepilot в ioBroker.

### Поддерживаемые устройства
| Код | Название продукта | Примечание | Точка данных | Номер продукта |
|:----:|:---------------------------:|:--------------------------------------:|:------------:|:----------------------:|
| 40 | RolloTron Standard | Gurtwickler / устройство для намотки ленты жалюзи | уровень | |
| 41 | RolloTron Comfort | Gurtwickler / устройство для намотки ремня жалюзи | уровень | |
| 42 | Рормотор-Актор |                                        |  уровень | [9471-1](https://www.rademacher.de/fileadmin/rad-daten/pdf/2_VBD_621-1-_09.14_-D_DuoFern_Rohrmotor-Aktor_Druckfreigabe.pdf) |
| 43 | Шальтактор 2-канальный |  Универсактор |  состояние | 9470-2 |
| 46 | Шальтактор 1-канал |  Стекдосенактор |  состояние | 9470-1 |
| 47 | Рормотор-Штойерунг |  Рормотор Steuerung |  уровень |                        |
| 48 | Диммер |  Диммактор |  уровень |                        |
| 49 | Ротормотор | | уровень | |
| 70 | Troll Comfort DuoFern | (спасибо homecineplexx) | | |
|  4 | Z-ВЕЙВ | Хайцкёрперстеллатриб |  температура |                        |
| 4B | Connect-Aktor | | | |

Привод Duofern с кодом 43 поддерживает режим подсветки и режим устройства. В каждом режиме при нажатии кнопки «Вверх» происходит либо включение (режим устройства), либо выключение (режим подсветки). При нажатии кнопки «Вниз» происходит обратное.

#### Пока не поддерживается (Спасибо [мхоп](https://github.com/mhop/fhem-mirror/blob/master/fhem/FHEM/30_DUOFERN.pm))
| Код | Название продукта | Примечание | Точка данных | Номер продукта |
|:----:|:---------------------------:|:--------------------------------------:|:------------:|:----------------------:|
| 4C | Основа троллинга | | | |
| 4Е | SX5 |                                        |              |                        |
| 61 | RolloTron Comfort Master | | | |
| 62 | Устройство SuperFake | | | |
| 65 | Bewegungsmelder |                                        |              |                        |
| 69 | Умвельтсенсор |                                        |              |                        |
| 70 | Troll Comfort DuoFern | | | |
| 71 | Тролль Комфорт ДуоПапоротник<br/>(Лихтмодус)|                                        |              |                        |      | (Лихтмодус) |                                        |              |                        |
| 73 | Раумтермостат |                                        |              |                        |
| 74 | Wandtaster 6fach 230В |                                        |              |                        |
| А0 | Handsender<br/>(6 Gruppen-48 Geraete)|                                        |              |                        |      | (6 Групп-48 Герэте) |                                        |              |                        |
| А1 | Handsender<br/>(1 группа-48 Гераете) |                                        |              |                        |      | (1 группа-48 Герэте) |                                        |              |                        |
| А2 | Handsender<br/>(6 Gruppen-1 Geraet) |                                        |              |                        |      | (6 Группен-1 Герат) |                                        |              |                        |
| А3 | Handsender<br/>(1 группа-1 Герат) |                                        |              |                        |      | (1 группа-1 Герат) |                                        |              |                        |
| А4 | Ванддегустатор |                                        |              |                        |
| A5 | Зонненсенсор | | | |
| А7 | Фанксендер ВВЕРХ |                                        |              |                        |
| A8 | HomeTimer | | | |
| АА | Маркизенвахтер |                                        |              |                        |
| АБ | Раухмельдер |                                        |              |                        |
| АД | Wandtaster 6fach Летучая мышь |                                        |              |                        |

## Конфигурация
### IP / Порт
IP-адрес станции Homepilot в локальной сети. Если ничего не указано, адаптер будет использовать __homepilot.local__. Номер порта необязателен и будет учитываться только в том случае, если IP-адрес был задан ранее.

### Синхронизация
В syctime можно выбрать частоту подключений к базовой станции Homepilot в секундах. По умолчанию - 12 секунд, ввод необязателен.

## Точки данных
Есть два основных канала: один для станции, а другой - для всех найденных устройств (приводы для намотки ремней затвора и т. д.):

homepilot.0.__station__ (данные со станции Homepilot)

homepilot.0.__devices.product__ (устройства сортируются по типу продукта)

В файле *devices.product* каждое найденное устройство создает новый канал с *devicedID*, например, homepilot.0.devices.rollotron.__10001__.balcony

homepilot.0.devices.product.*deviceID*.__name__ (string)

homepilot.0.devices.product.*deviceID*.__description__ (string)

homepilot.0.devices.product.*deviceID*.__productName__ (string)

homepilot.0.devices.product.*deviceID*.__duofernCode__ (string)

homepilot.0.devices.product.*deviceID*.__hasErrors__ (number)

homepilot.0.devices.product.*deviceID*.__status_changed__ (number, timecode)

homepilot.0.devices.product.*deviceID*.__cid__ (строка, доступна для записи) !!! ТОЛЬКО ДЛЯ ЗАПИСИ СТРОКИ

homepilot.0.devices.product.*deviceID*.__level__ (number)

homepilot.0.devices.product.*deviceID*.__level_inverted__ (number)

homepilot.0.devices.product.*deviceID*.__temperature__ (число, или другое значение)

homepilot.0.devices.product.*deviceID*.__state__ (логическое значение, только если продукт - switch)

homepilot.0.devices.__json__ (*JSON* файл *json* Точка данных, заполненная возвращенным JSON )

homepilot.0.station.__ip__ (string)

homepilot.0.station.__UNREACH__ (логическое значение) (true, если станция Homepilot недоступна)

Точки данных *cid*, *level* и в некоторых случаях *state* доступны для записи и подписываются на изменения, указанные другими адаптерами (например, VIS, Javascript, Scenes).

### Контроль
#### Level и level_inverted
Жалюзи можно управлять с помощью JavaScript, виджетов VIS или сцен двумя способами.
Например, вы можете управлять жалюзи с помощью DeviceID 10002 («Правая гостиная»), установив homepilot.0.devices.product.*10002*.__level__ равным "30".
Этот параметр принимает только целые числа от 0 до 100. Кроме того, вы можете использовать идентификатор команды Homepilot. Просто укажите одну из строк, указанных в следующей таблице, для homepilot.0.devices.product.*deviceID*.__cid__. Если вы предпочитаете внешний вид, похожий на "Homematic" (0% - темно/вниз, 100% - светло/вверх), выберите параметр __level_inverted__.

#### Идентификатор команды
Кроме того, точка данных *состояние* может использоваться для управления переключателями. Она создается только в том случае, если название продукта - "Universal-Aktor"/"Steckdosenaktor" или его серийный номер равен 43 или 46. Просто используйте виджет состояния управления VIS, чтобы написать *true*/*false*. Это логическое значение будет преобразовано в уровень 100, если *true*, или в уровень 0, если *false*.
Вы можете использовать эти команды для управления Homepilot с помощью cid в homepilot.0.devices.product.*deviceID*.__cid__

| CID | Команды |
| :--:|:---------------------------------|
| 1 | ВВЕРХ, вверх, ХОЧ, хох, РАУФ, рауф |
| 2 | СТОП, стоп, стоп |
| 3 | ВНИЗ, вниз, БЕГ, бегун |
| 4 | POSITION_0, position_0, 0% |
| 5 | POSITION_25, position_25, 25% |
| 6 | POSITION_50, position_50, 50% |
| 7 | POSITION_75, position_75, 75% |
| 8 | POSITION_100, position_100, 100% |
| 9 | *POSITION_N (пока нет)* |
| 10 | ЕН, эйн, АН, ан, НА, на |
| 11 | AUS, AUS, ВЫКЛ, ВЫКЛ |
| 23 | ПРИРОСТ, прирост, + |
| 24 | УМЕНЬШЕНИЕ, уменьшение, - |

## Виджеты VIS
### Пример для ставней
```
[{"tpl":"tplValueFloat","data":{"oid":"homepilot.0.devices.RolloTronStandard.10002.level","visibility-cond":"==","visibility-val":1,"is_comma":true,"is_tdp":"false","factor":"1","gestures-offsetX":0,"gestures-offsetY":0,"signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"digits":"0","html_append_singular":" %","html_append_plural":" %","name":"RolloTron Percent","label":"{homepilot.0.devices.RolloTronStandard.10002.name}"},"style":{"left":"519px","top":"555px","color":"lightblue","text-align":"right","z-index":"20"},"widgetSet":"basic"},{"tpl":"tplValueLastchange","data":{"oid":"homepilot.0.devices.RolloTronStandard.10002.status_changed","visibility-cond":"==","visibility-val":1,"gestures-offsetX":0,"gestures-offsetY":0,"signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"format_date":"DD.MM.YYYY hh:mm:ss"},"style":{"left":"432px","top":"582px","z-index":"20","color":"lightblue","width":"148px","height":"15px","font-size":"80%","text-align":"right"},"widgetSet":"basic"},{"tpl":"tplMetroTileShutter","data":{"oid":"homepilot.0.devices.RolloTronStandard.10002.level","visibility-cond":"==","visibility-val":1,"step":"-1","bg_class":"bg-darkCobalt","brand_bg_class":"bg-mauve","gestures-offsetX":0,"gestures-offsetY":0,"signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"min":"100","max":"1","oid-working":"homepilot.0.devices.RolloTronStandard.10002.level","name":"Rollotron Metro","label":"{homepilot.0.devices.RolloTronStandard.10002.name}","sliderColor":"","sliderMarkerColor":"","sliderCompleteColor":"#c19fb9"},"style":{"left":"301px","top":"439px","z-index":"15"},"widgetSet":"metro"}]
```

В правом нижнем углу отображается числовое значение уровня. Под прозрачным виджетом Metro расположен виджет lastchange-widget, который отображает любое движение затвора.

![альтернативный текст](../../../../../en/adapterref/iobroker.homepilot/docs/en/img/homepilot_vis_widgets.jpg "Виджеты VIS для создания скриншотов")

![альтернативный текст](../../../../../en/adapterref/iobroker.homepilot/docs/en/img/homepilot_vis_widgets_settings.jpg "Скриншот настроек виджетов VIS")