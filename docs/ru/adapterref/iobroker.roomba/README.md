---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.roomba/README.md
title: ioBroker.roomba
hash: SDZ4tGBkYzHLkxpalcgk8lpf5H7Z68Ldr2zGt2Jmd8w=
---
![Логотип](../../../en/adapterref/iobroker.roomba/admin/roomba.png)

![Количество установок](http://iobroker.live/badges/roomba-installed.svg)
![Стабильная версия](http://iobroker.live/badges/roomba-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.roomba.svg)
![Коммиты с момента последнего релиза](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.roomba/latest.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.roomba.svg)
![НПМ](https://nodei.co/npm/iobroker.roomba.png?downloads=true)

# IoBroker.roomba Подключите iRobot Roomba к ioBroker.
На основе библиотеки dorita980 https://github.com/karlvr/dorita980#readme

[![Travis CI](https://travis-ci.com/iobroker-community-adapters/ioBroker.roomba.svg?branch=master)](https://travis-ci.com/iobroker-community-adapters/ioBroker.roomba)

**Оглавление**

1. [Функции](#функции)
2. [Установка](#installation)
3. [Инструкции по установке](#setup-instructions)
4. [Поддерживаемые версии Roomba/прошивки](#supported-roombas--firmware-versions)
5. [Каналы и состояния](#channels--states)
6. [Описание предпочтений (неполное)](#description-of-preferences-incomplete)
7. [Интеграция Smart Home / Alexa с использованием ioBroker.javascript](#smart-home--alexa-integration-using-iobrokerjavascript)
8. [Журнал изменений](#changelog)
9. [Кредиты](#кредиты)
10. [Лицензия](#license)

## Функции
Этот адаптер обладает следующими функциями:

- __Отправлять команды__ («Пуск», «Стоп», «Возобновить», «Пауза», «Док») на ваш Roomba
- Получить __состояния устройства__, такие как батарея, пристыкован, полный / вставленный лоток (см. [Каналы и состояния](#channels--states) для полного списка)
- Получить __конфигурацию устройства__, например настройки, настройки сети или расписания (полный список см. в разделе [Каналы и состояния](#channels--states)).
- Получить __статистику устройства__, такую как общее количество миссий, часы на док-станции и т. д. (полный список см. в разделе [Каналы и состояния](#channels--states)).
- Получить информацию о __текущей миссии__ (во время уборки Roomba), такую как время начала и окончания, общее время работы, количество убранных квадратных метров и т. д. (только для поддерживаемых Roomba см. [Поддерживаемые версии Roomba/прошивки](#supported-roombas --прошивки-версии))
- __Нарисовать карту на основе полученных данных миссии__ (только для поддерживаемых Roomba)
- __Веб-интерфейс__, который показывает статус и карту текущих, а также предыдущих/архивных миссий:

  ![Интерфейс Roomba](../../../en/adapterref/iobroker.roomba/img/roomba.interface.png)

## Монтаж
ioBroker.roomba требуется [холст](https://www.npmjs.com/package/canvas), чтобы рисовать карты миссий Roomba. ioBroker попытается установить эту зависимость при установке ioBroker.roomba.

Хотя вам, вероятно, придется установить пакетные зависимости холста (и самого холста) с помощью следующей команды:

### Линукс
```
sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
```

Кроме того, выполните следующую команду __в каталоге ioBroker.roomba__ (`/opt/iobroker/node_modules/iobroker.roomba`):

```
sudo npm install canvas --unsafe-perm=true
```

### Окна
1. Убедитесь, что у вас установлен `node-gyp` через

```
npm install -g node-gyp
```

2. Убедитесь, что у вас установлены основные компоненты сборки через

```
npm install --global --production windows-build-tools
```

3. Загрузите GTK 2 (для [Win32](http://ftp.gnome.org/pub/GNOME/binaries/win32/gtk+/2.24/gtk+-bundle_2.24.10-20120208_win32.zip) или [Win64](http://ftp.gnome.org/pub/GNOME/binaries/win64/gtk+/2.22/gtk+-bundle_2.22.1-20101229_win64.zip)) и распакуйте его (например, в `C:\path\to\GTK2`)
4. Беги

```
node-gyp rebuild --GTK_Root=C:\path\to\GTK2
```

5. Установите холст из папки iobroker.roomba.

```
cd C:\path\to\iobroker\node_modules\iobroker.roomba
npm install canvas
```

Подробнее см. https://github.com/Automattic/node-canvas/wiki/Installation:-Windows.

## Инструкции по настройке
### Автоматическая настройка
Для автоматической настройки ioBroker.roomba следуйте инструкциям в панели администратора ioBroker.roomba.

**ВНИМАНИЕ**: учетные данные для аутентификации отличаются от тех, которые вы используете в приложении для смартфона!

1. Убедитесь, что адаптер ioBroker.roomba запущен.
2. Убедитесь, что ваш робот находится на базовой базе и включен (горит зеленый индикатор).
3. Затем нажмите и удерживайте кнопку HOME на роботе, пока он не прозвучит серию сигналов (около 2 секунд).
4. Отпустите кнопку, и ваш робот начнет мигать индикатором WIFI.
5. Затем вернитесь сюда, нажмите кнопку, чтобы получить IP и учетные данные.

Если автоматический процесс не может получить ваши учетные данные, воспользуйтесь ручной настройкой.

### Ручная настройка
Для ручной настройки см. https://github.com/karlvr/dorita980#how-to-get-your-usernameblid-and-password.

## Поддерживаемые версии Roomba/прошивки
### Поддерживаемые версии прошивки
| Версия программного обеспечения | Информация о прошивке | Поддерживается |
| ---------------- | ------------- | --------- |
| v1.4 | [Примечания к выпуску](https://homesupport.irobot.com/app/answers/detail/a_id/19549#rn_PageTitle) | ![#c5f015](https://placehold.it/15/c5f015/000000?text=+) **поддерживается (![#c5f015](https://placehold.it/15/c5f015/000000?text=+) вкл. карта)** |
| v3.2.хх | [Примечания к выпуску](https://homesupport.irobot.com/app/answers/detail/a_id/541#rn_PageTitle) | ![#c5f015](https://placehold.it/15/c5f015/000000?text=+) **поддерживается** (![#f03c15](https://placehold.it/15/f03c15/000000?text=+) НЕТ карты) |
| v3.2.хх | [Примечания к выпуску](https://homesupport.irobot.com/app/answers/detail/a_id/541#rn_PageTitle) | ![#c5f015](https://placehold.it/15/c5f015/000000?text=+) **поддерживается** (![#f03c15](https://placehold.it/15/f03c15/000000? text=+) НЕТ карты) |

### Поддерживаемые Roomba
| Серия | Модели _(неполные)_ | Версия программного обеспечения | Информация о прошивке | Поддерживается |
| ----- | --------------------- | ---------------- | ------------- | --------- |
| Roomba® 6xx | 605, 606, 612, 616, 671, 676, 680, 696 | v3.2.40 | [Примечания к выпуску](https://homesupport.irobot.com/app/answers/detail/a_id/541#rn_PageTitle) | (скорее всего) |
| Roomba® 6xx | [692] (https://github.com/iobroker-community-adapters/ioBroker.roomba/issues/28) | v3.5.62 | [Примечания к выпуску](https://homesupport.irobot.com/app/answers/detail/a_id/541#rn_PageTitle) | ![#c5f015](https://placehold.it/15/c5f015/000000?text=+) **поддерживается** (![#f03c15](https://placehold.it/15/f03c15/000000?text=+) НЕТ карты) |
| Roomba® 7xx | 774, 785, | - | | ![#f03c15](https://placehold.it/15/f03c15/000000?text=+) _Модель не поддерживает подключение к Wi-Fi, поэтому поддержка отсутствует_ |
| Roomba® 8xx | 880, 886, 891, 896 | - | [Примечания к выпуску](https://homesupport.irobot.com/app/answers/detail/a_id/541#rn_PageTitle) | (скорее всего) |
| Roomba® 8xx | [895]((https://forum.iobroker.net/post/245274)) | v3.2.10/40/69 | [Примечания к выпуску](https://homesupport.irobot.com/app/answers/detail/a_id/541#rn_PageTitle) | ![#c5f015](https://placehold.it/15/c5f015/000000?text=+) **поддерживается** (![#f03c15](https://placehold.it/15/f03c15/000000?text=+) НЕТ карты) |
| Roomba® 9xx | 965, 981 | - | [Примечания к выпуску](https://homesupport.irobot.com/app/answers/detail/a_id/529#rn_PageTitle) | (скорее всего) |
| Roomba® 9xx | [960](https://forum.iobroker.net/user/jb_sullivan), [966](https://forum.iobroker.net/user/thomaslpz), 980 | v2.4.6-3 | [Примечания к выпуску](https://homesupport.irobot.com/app/answers/detail/a_id/529#rn_PageTitle) | ![#c5f015](https://placehold.it/15/c5f015/000000?text=+) **поддерживается (включая карту)** |
| Roomba® я | [i7 (7150)] (https://forum.iobroker.net/post/240589), i7+ (7550) | v1.4 | [Примечания к выпуску](https://homesupport.irobot.com/app/answers/detail/a_id/19549#rn_PageTitle) | ![#c5f015](https://placehold.it/15/c5f015/000000?text=+) **поддерживается (включая карту)** |
| Roomba® e5 | [e5] (https://forum.iobroker.net/topic/7657/irobot-roomba-adapter/158) | v3.4.42 | [Примечания к выпуску](https://homesupport.irobot.com/app/answers/detail/a_id/6345#rn_PageTitle) | ![#c5f015](https://placehold.it/15/c5f015/000000?text=+) **поддерживается** (![#f03c15](https://placehold.it/15/f03c15/000000?text=+) НЕТ карты) |
| Roomba® с | [S9+] (https://github.com/Zefau/ioBroker.roomba/issues/34) | v3.2.4 | [Примечания к выпуску](https://homesupport.irobot.com/app/answers/detail/a_id/26887/kw/s9%2B#rn_PageTitle) | ![#c5f015](https://placehold.it/15/c5f015/000000?text=+) **поддерживается (включая карту)** |
| Roomba® с | [S9+] (https://github.com/Zefau/ioBroker.roomba/issues/34) | v3.2.4 | [Примечания к выпуску](https://homesupport.irobot.com/app/answers/detail/a_id/26887/kw/s9%2B#rn_PageTitle) | ![#c5f015](https://placehold.it/15/c5f015/000000?text=+) **поддерживается (включая карту)** |

Пожалуйста, помогите нам относительно поддерживаемых устройств и сообщите мне [узнать через проблему](https://github.com/iobroker-community-adapters/ioBroker.roomba/issues), поддерживается ли ваша модель Roomba!

## Каналы и состояния
После успешной настройки будут созданы следующие каналы и состояния:

| Канал | Папка | состояние | Описание |
| ------- | ------ | ----- | ----------- |
| уборка | - | - | Команды и информация о процессе очистки |
| уборка | последний | - | Последние команды, отправленные роботу |
| уборка | последний | команда | Последняя команда, отправленная роботу |
| уборка | последний | отметка времени | Отметка времени последней отправленной команды |
| уборка | последний | дата и время | DateTime была отправлена последняя команда |
| уборка | последний | инициатор | Инициатор последней команды |
| уборка | последний | цикл | Цикл |
| уборка | последний | фаза | Фаза |
| уборка | последний | ошибка | Указывает на ошибку во время последней миссии |
| уборка | расписание | - | Информация о расписании |
| уборка | расписание | цикл | Цикл расписания (с воскресенья по субботу) |
| уборка | расписание | часы | Час запуска цикла (с воскресенья по субботу) |
| уборка | расписание | минуты | Минуты начала цикла (с воскресенья по субботу) |
| уборка | - | док | Отправить робота на док-станцию |
| уборка | - | пауза | Приостановить текущий процесс очистки |
| уборка | - | резюме | Возобновить текущий процесс очистки |
| уборка | - | начать | Начать процесс очистки |
| уборка | - | остановка | Остановить текущий процесс очистки |
| устройство | - | - | Информация об устройстве |
| устройство | сеть | - | Сетевая информация |
| устройство | сеть | DHCP | Укажите, активирован ли DHCP |
| устройство | сеть | маршрутизатор | Mac-адрес роутера |
| устройство | сеть | IP | IP-адрес |
| устройство | сеть | подсеть | Адрес подсети |
| устройство | сеть | шлюз | Адрес шлюза |
| устройство | сеть | днс1 | Основной DNS-адрес |
| устройство | сеть | днс2 | Дополнительный DNS-адрес |
| устройство | предпочтения | - | Установить предпочтения |
| устройство | предпочтения | бинПауза | **НЕИЗВЕСТНО** |
| устройство | предпочтения | коверBoostAuto | Автоматический: Roomba автоматически увеличивает мощность пылесоса для глубокой очистки ковров. |
| устройство | предпочтения | коверBoostHigh | Режим производительности: Roomba всегда будет повышать мощность пылесоса, чтобы максимально повысить эффективность уборки на всех поверхностях пола. |
| устройство | предпочтения | экозарядка | **НЕИЗВЕСТНО** |
| устройство | предпочтения | нет автопроездов | Один проход: Roomba обработает все зоны за один проход. |
| устройство | предпочтения | нетПП | **НЕИЗВЕСТНО** |
| устройство | предпочтения | открыть только | **НЕИЗВЕСТНО** |
| устройство | предпочтения | планХолд | **НЕИЗВЕСТНО** |
| устройство | предпочтения | два прохода | Roomba обработает все зоны во второй раз. Это может быть полезно в домах с домашними животными или для периодической генеральной уборки. |
| устройство | версии | - | Информация о версии |
| устройство | версии | аппаратная версия | Аппаратная версия |
| устройство | версии | тип батареи | Тип батареи |
| устройство | версии | звук Вер | **НЕИЗВЕСТНО** |
| устройство | версии | uiSwVer | **НЕИЗВЕСТНО** |
| устройство | версии | navSwVer | **НЕИЗВЕСТНО** |
| устройство | версии | Wi-FiSwVer | **НЕИЗВЕСТНО** |
| устройство | версии | мобильностьВер | **НЕИЗВЕСТНО** |
| устройство | версии | загрузчик Вер | Версия загрузчика |
| устройство | версии | umiVer | **НЕИЗВЕСТНО** |
| устройство | версии | программное обеспечение Вер | Версия программного обеспечения |
| устройство | - | \_rawДанные | Необработанные данные о настройках в виде json |
| устройство | - | макинтош | Mac-адрес робота |
| устройство | - | имя | Имя робота |
| устройство | - | тип | Тип робота |
| государства | - | - | Информация о состоянии |
| государства | - | \_подключено | Состояние подключения |
| государства | - | батарея | Уровень заряда батареи робота |
| государства | - | бинПолный | Укажите, заполнен ли статус корзины |
| государства | - | бинВставленный | Укажите, вставлен ли бин |
| государства | - | состыкован | Укажите, пристыкован ли робот |
| государства | - | сигнал | Мощность сигнала |
| государства | - | статус | Текущее состояние робота |
| статистика | - | - | Статистическая информация |
| статистика | миссии | - | Статистика миссии |
| статистика | миссии | не удалось | Количество неудачных заданий по очистке |
| статистика | миссии | преуспеть | Количество успешных работ по уборке |
| статистика | миссии | всего | Количество работ по уборке |
| статистика | время | - | Статистика времени |
| статистика | время | среднее мин | **НЕИЗВЕСТНО** |
| статистика | время | хондок | **НЕИЗВЕСТНО** |
| статистика | время | Доступно | **НЕИЗВЕСТНО** |
| статистика | время | estCap | **НЕИЗВЕСТНО** |
| статистика | время | нЛитхрг | **НЕИЗВЕСТНО** |
| статистика | время | nNimhChrg | **НЕИЗВЕСТНО** |
| статистика | время | нДоки | **НЕИЗВЕСТНО** |
| - | - | обновленнаяДатаВремя | Дата и время последнего обновления |
| - | - | обновленная временная метка | Временная метка последнего обновления |

## Описание настроек _(неполное)_
Следующая полезная нагрузка будет получена при вызове ```getPreferences()``` (см. https://github.com/karlvr/dorita980#getpreferences):

| Объект | Индекс | Тип | Описание | состояние ioBroker |
| ------ | ----- | ---- | ----------- | -------------- |
| нетинформация | - | объект | Сетевая информация о подключении Roomba | - |
| нетинформация | .dhcp | логический | Укажите, активирован ли DHCP | устройство.сеть.dhcp |
| нетинформация | .адрес | IP | IP-адрес | устройство.сеть.ip |
| нетинформация | .маска | IP | Адрес подсети | устройство.сеть.подсеть |
| нетинформация | .gw | IP | Адрес шлюза | устройство.сеть.шлюз |
| нетинформация | .dns1 | IP | Основной DNS-адрес | устройство.сеть.dns1 |
| нетинформация | .dns2 | IP | Дополнительный DNS-адрес | устройство.сеть.dns2 |
| нетинформация | .bssid | макинтош | Mac-адрес роутера | устройство.сеть.маршрутизатор |
| нетинформация | .сек | целое число | Неизвестно | _(не сопоставлено)_ |
| вайфайстат | - | объект | Неизвестно | - |
| вайфайстат | .wi-fi | целое число | Неизвестно | _(не сопоставлено)_ |
| вайфайстат | .уап | логический | Неизвестно | _(не сопоставлено)_ |
| вайфайстат | .облако | целое число | Неизвестно | _(не сопоставлено)_ |
| влкфг | - | объект | Неизвестно | - |
| влкфг | .сек | целое число | Неизвестно | _(не сопоставлено)_ |
| влкфг | .ssid | строка | Неизвестно | _(не сопоставлено)_ |
| макинтош | - | макинтош | Mac-адрес Roomba | - |
| страна | - | строка | Неизвестно | - |
| облачная среда | - | строка | Неизвестно | - |
| конечные точки svc | .svcDeplId | строка | Неизвестно | - |
| картаЗагрузитьРазрешено | - | логический | Неизвестно | - |
| смещение местного времени | - | целое число | Неизвестно | - |
| ... | - | ... | ... | - |

Пожалуйста, помогите нам с описанием настроек. Если вы знаете значение предпочтений, указанных в таблице как неизвестные, дайте мне [знать их значение через проблему](https://github.com/iobroker-community-adapters/ioBroker.roomba/issues)!

## Интеграция Smart Home / Alexa с использованием ioBroker.javascript
### Отправить карту через Telegram, когда миссия завершена
Для этого необходимо установить адаптер ioBroker ioBroker.telegram (https://github.com/ioBroker/ioBroker.telegram).

Создайте скрипт в папке «common» ioBroker.javascript и добавьте в него следующий слушатель:

```javascript
var _fs = require('fs');

/*
 * MISSION END: Send map
 *
 */
var message = "%device.name% finished at %missions.current.endedDateTime% cleaning %missions.current.sqm% sqm in %missions.current.runtime% seconds (%missions.current.error% errors).";
var ns = 'roomba.0';
var imagePath = 'tmp/';

on({id: ns + '.missions.current.ended', change: 'any'}, function(obj)
{
    if (!obj.state || !obj.state.val) return;

    // replace variables with state values
    var pos, variable, state, value;
    while (message.indexOf('%') > -1)
    {
        pos = message.indexOf('%');
        variable = message.substring(pos, message.indexOf('%', pos+1)+1);
        state = getState(ns + '.' + variable.replace(/%/g, ''));

        if (state !== null && state.val !== null)
            value = state.val
        else
        {
            log('State ' + variable.replace(/%/g, '') + ' not found!', 'warn');
            value =  '';
        }

        if (typeof value === "boolean") value = value === true ? 'with' : 'no';
        message = message.replace(RegExp(variable, 'gi'), value);
    }

    // console
    log(message);

    // get image
    var img = getState(ns + '.missions.current.mapImage').val;

    if (img !== null && img.indexOf('data:image/png;base64,') > -1)
    {
        _fs.writeFile(imagePath + 'image.png', img.replace(/^data:image\/png;base64,/, ''), 'base64', function(err)
        {
            if (err !== null)
                log(err.message, 'warn');
            else
                sendTo('telegram', {text: imagePath + 'image.png', message: message});
        });
    }
});
```

_2019-05-04 исправлена ошибка, препятствовавшая отправке карты_

Вы можете отредактировать переменную ```message``` для любого уведомления, которое хотите получать с картой. Вы можете использовать ```%name-of-state%``` для получения значения состояния в дереве объектов ioBroker.roomba.

## Кредиты
### Неофициальный API
Спасибо [@koalazak](https://github.com/koalazak) для [неофициальной библиотеки iRobot Roomba 980 node.js (SDK)](https://github.com/koalazak/dorita980#readme).

### Иконки
Иконки, созданные <a href="https://www.flaticon.com/authors/iconnice" title="Иконница">Iconnice</a> с <a href="https://www.flaticon.com/" title="Флатикон">сайта www.flaticon.com</a> , имеют лицензию <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY.</a></div>

## Changelog
### 1.2.1 (2023-08-09)

* (mcm1957) dorita980 dependency has been upgraded
* (mcm1957) some other dependencies have been upgraded
* (mcm1957) Adapter now requires node 16 or newer and js-controller 4.0.24 or newer

### 1.2.0 (2023-08-09)

* (TheRealArthurDent) dorita980 has been updated (see PR #144)
* (mcm1957) Release script has been updated
* (mcm1957) Several issues reported by adapter checker have been fixed

### 1.1.4 (2021-07-19)
* (Apollon77) Adjust some types to prevent js-controller 3.3 warnings
* (thost96) fix hanging state loading in frontend
* (thost96) fixed link in canvas warning

### 1.1.1 (2020-02-16)
- (Zefau) moved development to Community Repository

### 1.1.0 (2020-02-06)
- (Zefau) added support to change schedule (see [#36](https://github.com/Zefau/ioBroker.roomba/issues/36))
- (Zefau) fixed bug with state `commands.last.dateTime` having incorrect value `NaN`
- (Zefau) fixed error message shown when robot is on a mission but map is not given

### 1.1.0 (2020-02-06)
- (Zefau) acknowledged support for S9+ (see [#34](https://github.com/Zefau/ioBroker.roomba/issues/34))

### 1.0.7 (2019-09-03)
- (Zefau) fixed bugs occurring when Roomba is on a mission
- (Zefau) added additional debug logging

### 1.0.6 (2019-08-19)
- (Zefau) added loading screen to web interface

### 1.0.5 (2019-08-18)
- (Zefau) fixed failing secure connection
- (Zefau) fixed broken credential retrieval
- (Zefau) fixed broken refresh

### 1.0.4 (2019-08-15)
- (Zefau) fixed password retrieval
- (Zefau) fixed German translations
- (Zefau) added donations button
- (Zefau) updated `dorita980` dependency to v3.1.3
- (Zefau) updated `canvas` dependency to v2.6.0

### 1.0.3 (2019-07-23)
- (Zefau) fixed bug _uncaught exception: Cannot read property 'x' of undefined_

### 1.0.2 (2019-07-20)
- (Zefau) reworked placing home icon ([#23](https://github.com/Zefau/ioBroker.roomba/issues/23))
- (Zefau) updated dependencies to fix security vulnerabilities in depending packages

### 1.0.1 (2019-05-15)
- (Zefau) fixed display error in Chrome ([#19](https://github.com/Zefau/ioBroker.roomba/issues/19#issuecomment-492963244))
- ([@Apollon77](https://github.com/Apollon77)) updated testing for Node.js v12 ([#18](https://github.com/Zefau/ioBroker.roomba/pull/18))
- (Zefau) updated dependencies

### 1.0.0 (2019-05-04)
- (zefau) No changes, only bump to stable release

### 0.5.0 (2019-04-21)
- (zefau) Added command buttons to map page / web interface ([#17](https://github.com/Zefau/ioBroker.roomba/issues/17))
- (zefau) Removed button to end mission manually ```missions.current._endMission```
- (zefau) Run ```stop``` command in the background when ```dock``` command is received ([#14](https://github.com/Zefau/ioBroker.roomba/issues/14))
- (zefau) Added Web Adapter as dependency

### 0.4.5 (2019-03-20)
- Zefau) Refactored retrieval of preferences and added debug mode

### 0.4.4 (2019-03-15)
- ([@Apollon77](https://github.com/Apollon77)) Core Files/Testing Update and introduce adapter-core ([#8](https://github.com/Zefau/ioBroker.roomba/pull/8))

### 0.4.3 (2019-02-10)
- (zefau) Improved compatibility for series 600

### 0.4.2 (2019-02-09)
- (zefau) Bug fixing

### 0.4.1 (2019-02-03)
- (zefau) Support for Compact Mode
- (zefau) Bug fixing

### 0.4.0 (2019-01-08)
- (zefau) Support for e5 and 600 series (due to support by [dorita980](https://github.com/koalazak/dorita980#readme))

### 0.3.0 (2019-01-06)
- (zefau) Image / Map of the current cleaning mission will be created
- (zefau) Removed encryption of password

### 0.2.3 (2018-12-03)
- (zefau) Fixed an issue encrypting the password when entered by user (no automated retrieval)

### 0.2.2 (2018-12-02)
- (zefau) Password will now be stored encrypted

Note: If you are coming from an earlier version, you have to (1) empty your settings, (2) save, (3) restart the adapter and (4) enter / fetch credentials again (duo to the fact that password will be stored encrypted now)

### 0.2.1 (2018-11-25)
- (zefau) Fixed / improved automatically retrieving of authentication credentials

### 0.2.0 (2018-11-18)
- (zefau) improved admin interface to automatically retrieve authentication credentials

### 0.1.0 (2018-11-04)
- (zefau) initial version

## License
The MIT License (MIT)

Copyright (c) 2023 iobroker-community-adapters <mcm57@gmx.at>
Copyright (c) 2018-2020 Zefau <zefau@mailbox.org>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.