---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mihome-vacuum/README.md
title: Адаптер ioBroker mihome-vacuum
hash: bIUbX1gdnh92hTES+t2l/YxK7HMYGxG8DIFdFNWZhbk=
---
![Логотип](../../../en/adapterref/iobroker.mihome-vacuum/admin/mihome-vacuum.png)

![Пожертвование PayPal](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![Количество установок](http://iobroker.live/badges/mihome-vacuum-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.mihome-vacuum.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.mihome-vacuum.svg)

# Адаптер ioBroker mihome-vacuum
![Тестируйте и выпускайте](https://github.com/iobroker-community-adapters/iobroker.mihome-vacuum/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/mihome-vacuum/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

[Deutsche beschreibung Hier](README_de.md)

Этот адаптер позволяет управлять пылесосом Xiaomi.

**Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам.** Дополнительные сведения и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

## Содержание
 - [Известные ошибки](#known_errors)
    - [Ошибка при установке (холст)](#error_at_installation)
    - [Ошибка HTTP при получении токена cookie{}](#http_error_when_getting_token_cookie{})
- [Настройка](#configuration)
    - [Настроить адаптер](#adapter-configuration)
        - [Управление через Alexa](#control-over-alexa)
        - [Второй робот](#second-robot)
    - [Настроить Валетудо](#valetudo-config)
- [Функции](#функции)
    - [Команды S50] (#команды-из-s50)
    - [Перейти](#goto)
- [Очистка зоны](#zoneclean)
    - [комнаты](#комнаты)
    - [таймер](#таймер)
    - [Собственные команды](#отправить-ваши-собственные-команды)
    - [sendTo hook](#send-custom-commands-with-sendto)
- [виджет](#виджет)
- [ошибки](#ошибки)
- [Журнал изменений](#changelog)

## Поддерживаемые устройства и функции
| Устройство | Базовый контроль | история | номера | карта |
|:------------------    |:-------------------:      |:-------------------:  |:-------------------:|:-------------------:|
| виоми.вакуум.v6 | :heavy_check_mark: | :х: |:х: | :х: |
| виоми.вакуум.v7 | :heavy_check_mark: | :х: |:х: | :х: |
| виоми.вакуум.v8 | :heavy_check_mark: | :х: |:х: | :х: |
| рокробо.вакуум.v1 | :heavy_check_mark: | :heavy_check_mark: |:x: |:heavy_check_mark: |
| роборок.вакуум.s4 | :heavy_check_mark: | :heavy_check_mark: |:heavy_check_mark: |:heavy_check_mark: |
| роборок.вакуум.s5 | :heavy_check_mark: | :heavy_check_mark: |:heavy_check_mark: |:heavy_check_mark: |
| роборок.вакуум.s5e | :heavy_check_mark: | :heavy_check_mark: |:heavy_check_mark: |:heavy_check_mark: |
| роборок.вакуум.м1с | :heavy_check_mark: | :heavy_check_mark: |:heavy_check_mark: |:heavy_check_mark: |
| роборок.вакуум.а10 | :heavy_check_mark: | :heavy_check_mark: |:heavy_check_mark: |:heavy_check_mark: |
| роборок.вакуум.а15 | :heavy_check_mark: | :heavy_check_mark: |:heavy_check_mark: |:heavy_check_mark: |
| мечта.вакуум.r2205 | :heavy_check_mark: | :heavy_check_mark: |:x: | :х: |
| мечта.вакуум.r2216o | :heavy_check_mark: | :heavy_check_mark: |:x: | :х: |
| мечта.вакуум.r2228o | :heavy_check_mark: | :heavy_check_mark: |:x: | :х: |
| мечта.вакуум.p2008 | :heavy_check_mark: | :heavy_check_mark: |:x: | :х: |
| мечта.вакуум.p2009 | :heavy_check_mark: | :heavy_check_mark: |:x: | :х: |
| мечта.вакуум.p2027 | :heavy_check_mark: | :heavy_check_mark: |:x: | :х: |
| мечта.вакуум.p2028 | :heavy_check_mark: | :heavy_check_mark: |:x: | :х: |
| мечта.вакуум.p2029 | :heavy_check_mark: | :heavy_check_mark: |:x: | :х: |
| мечта.вакуум.p2036 | :heavy_check_mark: | :heavy_check_mark: |:x: | :х: |
| мечта.вакуум.p2041o | :heavy_check_mark: | :heavy_check_mark: |:x: | :х: |
| мечта.вакуум.p2114a | :heavy_check_mark: | :heavy_check_mark: |:x: | :х: |
| мечта.вакуум.p2148o | :heavy_check_mark: | :heavy_check_mark: |:x: | :х: |
| мечта.вакуум.p2156o | :heavy_check_mark: | :heavy_check_mark: |:x: | :х: |

## Известные ошибки
### Ошибка при установке
если ваша установка выполняется с ошибкой. Не удалось установить пакет холста

``npm ОШИБКА! canvas@2.6.1 установить: node-pre-gyp install --fallback-to-build npm ОШИБКА! Выход из состояния 1``

Пожалуйста, установите холст и библиотеки вручную с помощью: `` sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev ``

переключитесь на: `cd /opt/iobroker/node_modules/iobroker.mihome-vacuum` затем `npm install canvas`

### Ошибка HTTP при получении токена cookie{}
Иногда вы не можете подключиться к облаку xiaomi.
Откройте браузер, перейдите в Mihome и войдите в систему. Введите код, который вы получили по почте. После этого соединение должно работать.

### Получает только сообщение Helo Timeout
ПОЖАЛУЙСТА, убедитесь, что ваш робот подключен к приложению Mihome, а НЕ к приложению Roborock.

### Нет связи с S7
В настоящее время существует проблема, если робот и ioBroker не используют одну и ту же подсеть.

## Конфигурация
В настоящее время найти токен — самая большая проблема.
Одним из вариантов извлечения токена является использование этой утилиты: https://github.com/PiotrMachowski/Xiaomi-cloud-tokens-extractor.

В противном случае следуйте инструкциям по ссылке:

[Учебник по токену](https://www.smarthomeassistent.de/token-auslesen-roborock-s6-roborock-s5-xiaomi-mi-robot-xiaowa/).

### Конфигурация адаптера
- Для IP-адреса IP-адрес робота должен быть введен в формате «192.168.178.XX».
- Порт робота по умолчанию установлен на "54321", его менять не надо
- Собственный порт, следует менять только вторым роботом
- Интервал запроса Время в мс, в течение которого извлекаются значения статуса робота (не должно быть <10000)

#### Контроль над Alexa
Для Alexa будет создано особое состояние управления `clean_home`.
Это коммутатор, который начинается с `true` присоски, а в `false` возвращается домой.
Он автоматически становится интеллектуальным устройством в облачном адаптере, созданном с именем «пылесос», которое можно изменить в облачном адаптере.

#### Возобновить приостановленную очистку зоны с помощью кнопки запуска
Если этот параметр включен, пылесос возобновит очистку зоны при установке состояния «старт» в значение «истина», если он был приостановлен во время выполнения очистки зоны.
Если этот параметр отключен, пылесос начнет новую «нормальную уборку» при отправке команды запуска, даже если он был приостановлен во время выполнения очистки зоны.

- Экспериментальный: С помощью флажка «Отправить собственные команды» создаются объекты, с помощью которых вы можете отправлять и получать собственные команды роботу.

#### Второй робот
Если два робота должны управляться через ioBroker, необходимо создать два экземпляра. Для второго робота необходимо изменить собственный порт (по умолчанию: 53421) для ioBroker, чтобы оба робота могли архивировать ioBroker через разные порты.

## Конфигурация карты
Есть два способа получить карту. Первый получить карту из облака. Поэтому вам необходимо авторизоваться и выбрать нужного робота из списка.

Второй способ — карта от valetudo (только локальное подключение).
Поэтому вам необходимо получить root-права и установить valetudo на свое устройство.
Вы можете использовать [Valetudo RE](https://github.com/rand256/valetudo) или обычный [Valetudo](https://github.com/Hypfer/Valetudo).

![Конфигурация](../../../en/adapterref/iobroker.mihome-vacuum/admin/valetudo_conf.png)

- Чтобы использовать карту, вы должны выбрать valetudo или оригинальную карту в конфигурации.
- Интервал запроса должен быть больше 1000 мс, это интервал для обновления html-карты.
- Интервал карты должен быть более 5000 мс, этот интервал обновляет файл карты png (вы можете использовать это для Telegram, vis или чего-либо еще)
- Цвет здесь вы можете выбрать цвета для примера карты:

```
- #2211FF
- rbg(255,200,190)
- rgba(255,100,100,0.5) //for Transparent
- green
```

- Роботы здесь вы можете выбрать разных роботов или другие транспортные средства для карты

### Использование карты
Карта хранится либо в формате base64-raw, либо в формате PNG.

Вы можете найти изображение карты в следующих точках данных:

- base64: `mihome-vacuum.0.cleanmap.map64`
- PNG: `mihome-vacuum.0.cleanmap.mapURL`

Вы можете использовать оба изображения в качестве источника изображения в желаемой ВИС. В стиле HTML вы можете использовать изображение следующим образом:

`<img src="mihome-vacuum.0.cleanmap.map64">`

С помощью дополнительных тегов стилей вы можете изменять размер и/или форматировать стиль карты.

Чтобы использовать карту в `jarvis`, просто используйте одну из точек данных в качестве URL-адреса DisplayImage-Widget.
Там вы можете изменить размер изображения или всего виджета. В случае адаптивного дизайна jarvis размер карты будет изменяться в зависимости от размера экрана.

Чтобы отобразить карту в `ioBroker VIS`, вы можете использовать обычный HTML-виджет, например:

```
[{"tpl":"tplHtml","data":{"g_fixed":false,"g_visibility":false,"g_css_font_text":false,"g_css_background":false,"g_css_shadow_padding":false,"g_css_border":false,"g_gestures":false,"g_signals":false,"g_last_change":false,"visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","refreshInterval":"0","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"html":"{mihome-vacuum.0.map.map64}"},"style":{"left":"0","top":"0","width":"100%","height":"100%"},"widgetSet":"basic"}]
```

Использование base64-карты быстрее и будет отображать положение робота поблизости в реальном времени.

## Функции
### Команды S50 (второе поколение)
Размер карты всегда составляет 52000 мм x 52000 мм, поэтому возможны значения от 0 до 51999 мм.
К сожалению, положение и расположение карты не может быть запрошено, это может меняться от всасывания к всасыванию. За основу всегда берется последняя всасывающая карта, так же как и в приложении.
Если робот захватывает только одну область и всегда строит карту одинаково, вы можете надежно отправить его в нужное место или очистить область.

#### Идти к
Для того, чтобы довести пылесос до точки, объект «goTo» должен быть заполнен следующим образом:

```
xVal, yval
```

Значения должны удовлетворять указанным выше требованиям и указывать координаты x и y на карте.

Пример:

```
24,850.26500
```

#### Очистка зоны
Чтобы очистить зону, необходимо заполнить ZoneClean следующим образом:

```
[X1, y1, x2, x2, count]
```

Где x и y — координаты прямоугольной области и «счетчик» операций очистки.
Вы также можете позволить сосать сразу нескольким областям:

```
[X1, y1, x2, x2, count], [x3, y3, x4, x4, count2]
```

Пример:

```
[24117,26005,25767,27205,1], [24320,24693,25970,25843,1]
```

#### Номера
более новый пылесос с последним приложением Home App поддерживает определение комнат, см. [видео](https://www.youtube.com/watch?v=vEiUZzoXfPg)

У каждой комнаты на текущей карте есть индекс, который затем назначается комнате из приложения. От робота мы получаем только карту с номером комнаты и индексом. Адаптер запрашивает эти комнаты при каждом запуске адаптера и создает канал для каждой комнаты, который затем знает текущий индекс комнаты. То же самое происходит вручную с помощью кнопки loadRooms. Затем этот канал можно назначить комнатам ioBroker. Если нажата кнопка roomClean, то определяется номер карты и отправляется роботу, чтобы он потом мог пропылесосить эту комнату. До этого мощность ВЕНТИЛЯТОРА устанавливается на всасывание в одном помещении. Если у вас еще нет возможности давать названия комнатам в приложении, также есть возможность создать такой канал вручную, указав индекс карты. Также возможно добавить координаты зоны вместо mapIndex.
Если вы хотите спонтанно очистить несколько комнат, вы можете сделать это с помощью multiRoomClean, назначив комнаты ioBroker этой точке данных, а затем нажав кнопку.

#### Таймер
Поскольку пылесос поддерживает функцию комнаты (см. выше), также можно создавать таймеры, которые затем запускают соответствующие комнатные каналы или определяют их mapIndex.
Таймер может запускаться через комнаты и/или каналы комнаты напрямую.
Сами таймеры создаются через область конфигурации, но затем становятся точкой данных. Там каждый таймер можно активировать/деактивировать или пропустить один раз. Также возможен прямой пуск. Преимущество таймеров ioBroker в том, что их можно отображать и использовать в ВИС, а также можно отключить робота от интернета, потому что таймеры приложения запускаются из Китая.

### Отправляйте свои собственные команды
ПРИМЕЧАНИЕ. Эту функцию должны использовать только специалисты, так как присоска может быть повреждена неправильными командами.

Робот различает команды в методах (methods) и параметрах (params), которые служат для указания методов.
Под объектом `mihome-vacuum.X.control.X_send_command` вы можете отправлять роботу собственные команды.
Структура объекта должна выглядеть следующим образом: метод; [параметры], например ``` app_segment_clean;[18,20] ```

Под объектом `mihome-vacuum.X.control.X_get_response` ответ вводится роботом после отправки.
Если параметры были запрошены, они отображаются здесь в формате JSON. Если была отправлена только одна команда, робот отвечает только «0».

Поддерживаются следующие методы и параметры:

| метод | параметры | Описание |
|-----------      |-------                                                              |-------------------                                                                       |
| получить_таймер | | Возвращает установленное значение таймера Установка времени всасывания BSp. 12 часов 30 через 5 дней |
| установить_таймер | `[["TIME_IN_MS",["30 12 * * 1,2,3,4,5",["start_clean",""]]]]` | Включить / отключить таймер |
| upd_timer | `["1481997713308","вкл/выкл"]` | |
| | | Спасает времена режима «Не беспокоить» |
| get_dnd_timer | | Удалить время «Не беспокоить» |
| set_dnd_timer | `[22,0,8,0]` | |
| set_dnd_timer | `[22,0,8,0]` | |
|                 |                                                                     |                                                                                          |
| приложение_rc_start | | Запустить удаленное управление |
| приложение_rc_move | `[{"seqnum":'0-1000',"velocity":VALUE1,"omega":VALUE2,"duration":VALUE3}]`| Двигаться. Порядковый номер должен быть непрерывным, VALUE1 (скорость) = -0,3–0,3, VALUE2 (вращение) = -3,1–3,1, VALUE3 (длительность)|
| приложение_rc_move | `[{"seqnum":'0-1000',"скорость":VALUE1,"omega":VALUE2,"duration":VALUE3}]`| Двигаться. Порядковый номер должен быть непрерывным, VALUE1 (скорость) = -0,3–0,3, VALUE2 (вращение) = -3,1–3,1, VALUE3 (продолжительность)|
| app_segment_clean | `[12,15]` | чистая комната с индексами 12 и 15 |
| app_segment_clean | `[12,15]` | чистая комната с индексами 12 и 15 |

больше методов и параметров вы можете найти здесь ([Связь](https://github.com/MeisterTR/XiaomiRobotVacuumProtocol)).

### Отправка пользовательских команд с помощью sendTo
Вы также можете отправлять эти пользовательские команды с других адаптеров с помощью `sendTo`. Использование с `method_id` и `params`, как определено выше:

```
sendTo("mihome-vacuum.0", "sendCustomCommand",
    {method: "method_id", params: [...] /* optional*/},
    function (response) { /* do something with the result */}
);
```

Объект `response` имеет два свойства: `error` и (если ошибки не было) `result`.

Пара предопределенных команд также может быть выполнена таким образом:

```
sendTo("mihome-vacuum.0",
    commandName,
    param,
    function (response) { /* do something with the result */}
);
sendTo("mihome-vacuum.0",
    commandName,
    {param1: value1, param2: value2, ...},
    function (response) { /* do something with the result */}
);

```

если возможен только один параметр, вы можете отправить только строку, в противном случае вам придется использовать объект с ожидаемыми параметрами, например:

```
sendTo("mihome-vacuum.0",
    "setFanSpeed",
    "105",
    function (response) { /* do something with the result */}
);
sendTo("mihome-vacuum.0",
    "setFanSpeed",
    {"fanSpeed" : 105},
    function (response) { /* do something with the result */}
);

```

Поддерживаемые команды:

| Описание | `commandName` | Обязательные параметры | Примечания |
| Начать процесс очистки | `startVacuuming` | - нет - | |
| Остановить процесс очистки | `stopVacuuming` | - нет - | |
| Приостановить процесс очистки | `pause` | - нет - | |
| Очистить ожидающие задания | `clearQueue` | - нет - | |
| Очистите небольшую площадь вокруг робота | `cleanSpot` | - нет - | |
| Вернуться на базу | `charge` | - нет - | |
| Скажите "Привет, я здесь!" | `findMe` | - нет - | |
| Проверить состояние расходных материалов (щетки и т. д.) | `getConsumableStatus` | - нет - | |
| Сброс состояния расходных материалов (щетки и т.п.) | `resetConsumables` | `consumable` | Строка: filter_work_time, filter_element_work_time, sensor_dirty_time, main_brush_work_time, side_brush_work_time |
| Получите сводку всех предыдущих процессов очистки | `getCleaningSummary` | - нет - | |
| Получите подробный отчет о предыдущем процессе очистки | `getCleaningRecord` | `recordId` | |
| Получить карту | `getMap` | - нет - | Неизвестно, что делать с результатом |
| Получить текущий статус робота | `getStatus` | - нет - | |
| Получить серийный номер робота | `getSerialNumber` | - нет - | |
| Получить подробную информацию об устройстве | `getDeviceDetails` | - нет - | |
| Получить таймер *не беспокоить* | `getDNDTimer` | - нет - | |
| Установите новый таймер *не беспокоить* | `setDNDTimer` | `startHour`, `startMinute`, `endHour`, `endMinute` | |
| Удалить таймер *не беспокоить* | `deleteDNDTimer` | - нет - | |
| Получить текущую скорость вентилятора | `getFanSpeed` | - нет - | |
| Установить новую скорость вентилятора | `setFanSpeed` | `fanSpeed` | `fanSpeed` — число от 1 до 100 |
| Получить текущий режим водяной камеры | `getWaterBoxMode` | - нет - | |
| Установите режим швабры | `setMopMode` | `mopMode` | `mopMode` — число от 300 до 303 |
| Получить текущий режим швабры | `getMopMode` | - нет - | |
| Установить режим водяной камеры | `setWaterBoxMode` | `waterBoxMode`\| {waterBoxMode:`waterBoxMode`,waterBoxLevel:`waterBoxLevel`} | `waterBoxMode` — это число от 200 до 204 или 207 -> тогда вы также должны указать `waterBoxLevel` как число от 1 до 30 |
| Запустите функцию дистанционного управления | `startRemoteControl` | - нет - | |
| Выдать команду перемещения для удаленного управления | `move` | `velocity`, `angularVelocity`, `duration`, `sequenceNumber` | Порядковый номер должен быть последовательным, продолжительность указана в мс |
| Завершить функцию дистанционного управления | `stopRemoteControl` | - нет - | |
| чистая комната/комнаты | `cleanRooms` | `rooms` | `rooms` — это строка, разделенная запятыми, с перечислением enum.rooms.XXX |
| чистый сегмент | `cleanSegments` | `rooms` \| {комнаты:`rooms`,waterBoxMode:`waterBoxMode`,mopMode:`mopMode`,fanSpeed:`fanSpeed`} | `rooms` — это число или массив с индексом карты или разделенная запятой строка с индексом карты |
| чистая зона | `cleanZone` | `coordinates` \| {координаты:`coordinates`,waterBoxMode:`waterBoxMode`,mopMode:`mopMode`,fanSpeed:`fanSpeed`,повтор:`iterations`} | `coordinates` — это строка с координатами и количеством, см. [зонаЧистота](#zonecleaning) |
| начать сбор пыли | `startDustCollect` | - нет - | |
| остановить сбор пыли | `stopDustCollect` | - нет - | |
| начать мытье шваброй | `startWashMop` | - нет - | |
| остановить мытье шваброй | `stopWashMop` | - нет - | |
| остановить мытье шваброй | `стопWashMop` | - нет - | |

## Виджет
![Виджет](../../../en/adapterref/iobroker.mihome-vacuum/widgets/mihome-vacuum/img/previewControl.png)

## Ошибки
- Периодические отключения, правда, это не из-за адаптера, а в основном из-за собственных сетей
- Виджет на время без функции

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
    * () 
-->
### 4.0.0 (2023-08-15)
* (DemigodCode) inital version of dream support
* (Dirkhe) add Roborock S8 Ultra Pro

### 3.11.0 (2023-05-12)
* (TA2k) fix too much map request to prevent map rate limit in the app

### 3.10.1 (2023-04-10)
* (Dirkhe) fix waterBoxLevel 
* (Dirkhe) fix overwriting of roomStates from global

### 3.10.0 (2023-04-07)
* (Dirkhe) check also stockcommands in onMessage 
* (Dirkhe) add feature waterbox level #755

### 3.9.5 (2023-01-13)
* (Dirkhe) change type of unsupported features
* (Dirkhe) fix button/command loadRooms

### 3.9.4 (2023-01-11)
* (Dirkhe) cleanmap.mapURL typo fixed

### 3.9.3 (2023-01-11)
* (Dirkhe) fix loosing passwort in config
* (Dirkhe) move map Url to userspace instead of admin space #735
* (Dirkhe) change mapUrl to /mihome-vacuum.0.userfiles/actualMap.png

### 3.9.2 (2023-01-06)
* (Dirkhe) add function setUnsupportedFeature; if token changed, all stored unsupported Features will be cleared
* (dirkhe) fix bug from 3.9.1 for supported repeat devices

### 3.9.1 (2023-01-06)
* (Dirkhe) add step property to repeat DP
* (Dirkhe) add Queue Fallback mode for repeat
* (Dirkhe) remove wrong clearQueue button

### 3.9.0 (2023-01-04)
* (Dirkhe) add Mop washing #679
* (Dirkhe) trigger pauseResume only, if correct state is given #623
* (Dirkhe) add multiple clean iterations (repeat) #690
* (Dirkhe) housekeeping

### 3.8.8 (2022-11-30)
* (Dirkhe) fix behaviour of pauseResume #623

### 3.8.7 (2022-11-26)
* (Dirkhe) fix typo from translation for battary_live (based on viomi id) #629
* (Dirkhe) fix crash, if cloud-roomID is empty #702

### 3.8.6 (2022-11-12)
* (Dirkhe) Fix type for roomMopMode

### 3.8.5 (2022-11-10)
* (Dirkhe) move parseErrors to debug level
* (Dirkhe) avoid new instanziierung on reconnect

### 3.8.4 (2022-11-07)
* (Dirkhe) change logging for sendMessage to debug

### 3.8.3 (2022-11-01)
* (Dirkhe) change logging from timeouts
* (Dirkhe) hide parts of token in log

### 3.8.2 (2022-10-31)
* (Dirkhe) Bump canvas to 2.10.2
* (Dirkhe) disable map, if CANVAS not installed #681

### 3.8.1 (2022-10-30)
* (Dirkhe) remove deprecated node 12.x Version for workflow

### 3.8.0 (2022-10-30)
* (Dirkhe) fix missing stock command for mop_mode
* (Dirkhe) add mop mode also for cleanSegments and cleanZone
* (Dirkhe) add mop mode also for rooms
* (MeisterTR) map zooming amd show carpet

### 3.7.0 (2022-10-28)
* (Dirkhe) accept custom commands with single paramter
* (Dirkhe) optional parameter waterboxMode and fanSpeed for cleanSegments and cleanZone 
* (Dirkhe) fix crash on message send (#652)
* (Dirkhe) add mop mode (#670)
* (Dirkhe) adapt fan_power for S7 Ultra(#677)

### 3.6.0 (2022-07-07)
* (Dirkhe) add dust collecting

### 3.5.0 (2022-06-29)
* (Dirkhe) add Roborock S6 Pure model
* (Dirkhe) add/extend some Hints in readme
* (Dirkhe) add additional log info for cleanRooms
* (Dirkhe) fix error for wrong map-dp

### 3.4.2 (2022-06-24)
* (Apollon77) Update dependencies to allow better automatic rebuild

### 3.4.1 (2022-05-31)
* (Dirkhe) add missed Vacuum states
* (Dirkhe) add dock state Waste water tank full

### 3.4.0 (2022-05-28)
* (Apollon77) Fix several potential crash cases reported by Sentry

### 3.3.6 (2022-05-03)
* (Dirkhe) fix spotcleaning

### 3.3.5 (2022-02-07)
* (Dirkhe) fixed some errors
* (lasthead0) fix cyrillic issue RC4 lib#

### 3.3.3 (2022-01-20)
* (Dirkhe) fixed some errors
* (Dirkhe) add RC4

### 3.3.1 (2021-10-02)
* (MeisterTR) fix IOBROKER-MIHOME-VACUUM-Z
* (MeisterTR) fix some errors

### 3.3.0 (2021-10-01)
* (MeisterTR) fix no rooms for S5
* (MeisterTR) fix IOBROKER-MIHOME-VACUUM-4 DB closed
* (MeisterTR) fix connection error

### 3.2.2 (2021-07-16)
* (bluefox) the communication is corrected
* (bluefox) Added roles to be detected by type-detector

### 3.2.1 (2021-07-02)
* (Apollon77) Adjust several crash cases (IOBROKER-MIHOME-VACUUM-K, IOBROKER-MIHOME-VACUUM-J, IOBROKER-MIHOME-VACUUM-F, IOBROKER-MIHOME-VACUUM-7, IOBROKER-MIHOME-VACUUM-A, IOBROKER-MIHOME-VACUUM-4, IOBROKER-MIHOME-VACUUM-G, IOBROKER-MIHOME-VACUUM-C, IOBROKER-MIHOME-VACUUM-B, IOBROKER-MIHOME-VACUUM-Q, IOBROKER-MIHOME-VACUUM-M)

### 3.2.0 (02.06.2021)
* (MeisterTR) release candidate
* (MeisterTR) get consumable after reset

### 3.1.10 (23.05.2021)
* error fixed
* add sentry

### 3.1.6 (05.05.2021)
* minimize Disk write
* minimized Messages 
* changed warn Messages to debug
* extend Debuglog to find error for e2 vacuum
* added getStates when map is changed

### 3.1.5 (03.05.2021)
* try to fix the map error
* Map64 changed. now without img tags
* add Multimap support (get rooms and map when map is changed)
* select Multimaps
* fix error with zone coordinates
* add WiFi
* fix connection Problems
* fix Valetudo map
* add Mop state
* fix some objects

### 3.1.1 (18.4.2021)
 * Full rewrite
 * Fix map bug with multiple vacuums
 * fix performance Problems
 * better connection to vacuum
 * fix bug in ReloadMap button
 * Show Goto and Zone States ti find places
 * and many more...

### 2.2.5 (2021-04-02)
* added S7 Support
* bugfixes for S5 Max and others

### 2.2.4 (2020-09-15)
* (dirkhe) add config for send Pause Before Home

### 2.2.3 (2020-08-20)
* (dirkhe) room DP are not deleted, on map change

### 2.2.0 (2020-08-13)
* (MeisterTR) add test for Viomi and Dreame Api

### 2.1.1 (2020-07-10)
* (bluefox) Refactoring
* (bluefox) Support of compact mode added

### 2.0.10 (2020-07-05)
* try to start the cleaning 3 times, if robot not answers and some fixes

### 2.0.9 (2020-03-05)
* (dirkhe) add state info for room channels and change queue info from number to JSON

### 2.0.8 (2020-02-26)
* (dirkhe) decreased communication with robot

### 2.0.7 (2020-02-25)
* (dirkhe) add Resuming after pause for rooms

### 2.0.6 (2020-02-17)
* (MeisterTR) add rooms for s50 with map (cloud or Valetudo needed)

### 2.0.4 (2020-02-13)
* (MeisterTR) add cloud login to get token
* (MeisterTR) add cloud Map
* (MeisterTR) add new and old Map format
* (MeisterTR) rebuild config page

### 1.10.5 (2020-02-11)
* send Ping only if not connected, otherwise get_status
* set button states to true, if clicked
* move timer manager and room manager to own libs

### 1.10.4 (2020-02-06)
* (MeiserTR) add valetudo map support for gen3 and gen2 2XXX

### 1.10.1 (2020-01-20)
* (dirkhe) added zone as room handling
* (dirkhe) timer could room channels directly

### 1.10.0 (2020-01-17)
* (dirkhe) added room handling
* (dirkhe) added Timer 
* (dirkhe) changed feature handling

### 1.1.6 (2018-12-06)
* (JoJ123) Added fan speed for MOP (S50+).

### 1.1.5 (2018-09-02)
* (BuZZy1337) Added description for Status 16 and 17 (goTo and zone cleaning).
* (BuZZy1337) Added setting for automatic resume of paused zone cleaning.

### 1.1.4 (2018-08-24)
* (BuZZy1337) Added possibility to resume a paused zone clean (State: mihome-vacuum.X.control.resumeZoneClean)

### 1.1.3 (2018-07-11)
* (BuZZy1337) fixed zoneCleanup state not working (vacuum was only leaving the dock, saying "Finished ZoneCleanup", and returned immediately back to the dock)

### 1.1.2 (2018-07-05)
* (BuZZy1337) fixed detection of new Firmware / Second generation Vacuum

### 1.1.1 (2018-04-17)
* (MeisterTR) error caught , added states for new fw

### 1.1.0 (2018-04-10)
* (mswiege) Finished the widget

### 1.0.1 (2018-01-26)
* (MeisterTR) ready for admin3
* (MeisterTR) support SpotClean and voice level (v1)
* (MeisterTR) support second generation (S50)
* (MeisterTR) Speed up data requests

### 0.6.0 (2017-11-17)
* (MeisterTR) use 96 char token from Ios Backup
* (MeisterTR) faster connection on first use

### 0.5.9 (2017-11-03)
* (MeisterTR) fix communication error without i-net
* (AlCalzone) add selection of predefined power levels

### 0.5.7 (2017-08-17)
* (MeisterTR) compare system time and Robot time (fix no connection if system time is different)
* (MeisterTR) update values if robot start by cloud

### 0.5.6 (2017-07-23)
* (MeisterTR) add option for crate switch for Alexa control

### 0.5.5 (2017-06-30)
* (MeisterTR) add states, features, fix communication errors

### 0.3.2 (2017-06-07)
* (MeisterTR) fix no communication after softwareupdate(Vers. 3.3.9)

### 0.3.1 (2017-04-10)
* (MeisterTR) fix setting the fan power
* (bluefox) catch error if port is occupied

### 0.3.0 (2017-04-08)
* (MeisterTR) add more states

### 0.0.2 (2017-04-02)
* (steinwedel) implement better decoding of packets

### 0.0.1 (2017-01-16)
* (bluefox) initial commit

## License
The MIT License (MIT)

Copyright (c) 2017-2022 bluefox <dogafox@gmail.com>

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