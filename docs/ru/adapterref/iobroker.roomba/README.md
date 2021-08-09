---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.roomba/README.md
title: ioBroker.roomba
hash: aTbrR6flAU9zIqlLYe+UDfALfaeI/rLZi8tOPuCxpmc=
---
![Логотип](../../../en/adapterref/iobroker.roomba/admin/roomba.png)

![Количество установок](http://iobroker.live/badges/roomba-installed.svg)
![Стабильная версия](http://iobroker.live/badges/roomba-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.roomba.svg)
![Совершено с момента последнего выпуска](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.roomba/latest.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.roomba.svg)
![НПМ](https://nodei.co/npm/iobroker.roomba.png?downloads=true)

# IoBroker.roomba Подключите iRobot Roomba к ioBroker.
На основе библиотеки dorita980 https://github.com/koalazak/dorita980#readme

[![Трэвис К.И.] (https://travis-ci.com/iobroker-community-adapters/ioBroker.roomba.svg?branch=master)](https://travis-ci.com/iobroker-community-adapters/ioBroker.roomba)

**Оглавление**

1. [Возможности] (# функций)
2. [Установка] (# установка)
3. [Инструкции по настройке] (# инструкции по настройке)
4. [Поддерживаемые версии Roomba / прошивки] (# supported-roombas - версии прошивки)
5. [Каналы и состояния] (# каналов - состояния)
6. [Описание предпочтений (неполное)] (# описание-предпочтений-неполное)
7. [Интеграция Smart Home / Alexa с использованием ioBroker.javascript] (# smart-home - alexa-integration-using-iobrokerjavascript)
8. [Список изменений] (# список изменений)
9. [Кредиты] (# кредитов)
10. [Лицензия] (# лицензия)

## Функции
С этим адаптером поставляются следующие функции:

- __Отправляйте команды__ («старт», «стоп», «возобновление», «пауза», «док») на ваш Roomba
- Получение __ состояний устройства__, таких как аккумулятор, пристыкованный, полный / вставленный лоток (полный список см. В [Каналы и состояния] (# каналы - состояния))
- Получить __конфигурацию устройства__, такую как предпочтения, настройки сети или расписания (полный список см. В [Каналы и состояния] (# каналы - состояния))
- Получить статистику __устройства__, такую как общее количество миссий, часы на док-станции и т. Д. (Полный список см. В [Каналы и состояния] (# каналы - состояния))
- Получение информации о __ текущей миссии__ (когда ваш Roomba чистит), такую как время начала и окончания, общее время работы, очищенный квадратный метр и т. Д. (Только для поддерживаемых Roomba см. [Поддерживаемые версии Roomba / прошивки] (# supported-roombas - прошивки-версии))
- __ Нарисуйте карту на основе полученных данных о миссии__ (только на поддерживаемых Roomba)
- __Web Interface__, который показывает статус и карту текущих, а также предыдущих / заархивированных миссий:

  ![Интерфейс Roomba](../../../en/adapterref/iobroker.roomba/img/roomba.interface.png)

## Монтаж
ioBroker.roomba нуждается в [холст](https://www.npmjs.com/package/canvas), чтобы рисовать карты миссий Roomba. ioBroker попытается установить эту зависимость при установке ioBroker.roomba.

Хотя вам, вероятно, придется установить пакетные зависимости холста (и самого холста) с помощью следующей команды:

### Linux
```
sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
```

Кроме того, выполните следующую команду __ в каталоге ioBroker.roomba__ (`/opt/iobroker/node_modules/iobroker.roomba`):

```
sudo npm install canvas --unsafe-perm=true
```

### Windows
1. Убедитесь, что у вас установлен `node-gyp` через

```
npm install -g node-gyp
```

2. Убедитесь, что вы установили необходимое для сборки через

```
npm install --global --production windows-build-tools
```

3. Загрузите GTK 2 (для [Win32] (http://ftp.gnome.org/pub/GNOME/binaries/win32/gtk+/2.24/gtk+-bundle_2.24.10-20120208_win32.zip) или [Win64] (http://ftp.gnome.org/pub/GNOME/binaries/win64/gtk+/2.22/gtk+-bundle_2.22.1-20101229_win64.zip)) и разархивируйте его (например, в `C: \ path \ to \ GTK2`)
4. Беги

```
node-gyp rebuild --GTK_Root=C:\path\to\GTK2
```

5. Установите холст из папки iobroker.roomba.

```
cd C:\path\to\iobroker\node_modules\iobroker.roomba
npm install canvas
```

Подробнее см. Https://github.com/Automattic/node-canvas/wiki/Installation:-Windows.

## Инструкции по установке
### Автоматическая настройка
Для автоматической настройки ioBroker.roomba, следуя инструкциям в административной панели ioBroker.roomba.

** ВНИМАНИЕ **: учетные данные для аутентификации отличаются от тех, которые вы используете в приложении для смартфона!

1. Убедитесь, что адаптер ioBroker.roomba запущен.
2. Убедитесь, что ваш робот находится на базе Home Base и включен (горит зеленый свет).
3. Затем нажмите и удерживайте кнопку HOME на вашем роботе, пока он не издаст серию звуковых сигналов (около 2 секунд).
4. Отпустите кнопку, и на вашем роботе загорится индикатор WIFI.
5. Затем вернитесь сюда, нажмите кнопку, чтобы получить IP-адрес и учетные данные.

Если автоматический процесс не может получить ваши учетные данные, используйте ручную настройку.

### Ручная настройка
Для ручной настройки см. Https://github.com/koalazak/dorita980#how-to-get-your-usernameblid-and-password.

## Поддерживаемые версии Roomba / прошивки
### Поддерживаемые версии прошивки
| Версия программного обеспечения | Информация о прошивке | Поддерживается |
| ---------------- | ------------- | --------- |
| v1.4 | [Примечания к выпуску](https://homesupport.irobot.com/app/answers/detail/a_id/19549#rn_PageTitle) | ![# c5f015] (https://placehold.it/15/c5f015/000000?text=+) ** поддерживается (! [# c5f015](https://placehold.it/15/c5f015/000000?text=+), вкл. карта) ** |
| v3.2.xx | [Примечания к выпуску](https://homesupport.irobot.com/app/answers/detail/a_id/541#rn_PageTitle) | ![# c5f015] (https://placehold.it/15/c5f015/000000?text=+) **поддерживается** (! [# f03c15 ](https://placehold.it/15/f03c15/000000?text=+) НЕТ карты) |
| v3.2.xx | [Примечания к выпуску] (https://homesupport.irobot.com/app/answers/detail/a_id/541#rn_PageTitle) | ! [# c5f015] (https://placehold.it/15/c5f015/000000?text=+) **поддерживается** (! [# f03c15] (https://placehold.it/15/f03c15/000000? текст = +) НЕТ карты) |

### Поддерживаемые Roomba
| Серия | Модели _ (неполные) _ | Версия программного обеспечения | Информация о прошивке | Поддерживается |
| ----- | --------------------- | ---------------- | ------------- | --------- |
| Roomba® 6xx | 605, 606, 612, 616, 671, 676, 680, 696 | v3.2.40 | [Примечания к выпуску](https://homesupport.irobot.com/app/answers/detail/a_id/541#rn_PageTitle) | (скорее всего) |
| Roomba® 6xx | [692] (https://github.com/iobroker-community-adapters/ioBroker.roomba/issues/28) | v3.5.62 | [Примечания к выпуску](https://homesupport.irobot.com/app/answers/detail/a_id/541#rn_PageTitle) | ![# c5f015] (https://placehold.it/15/c5f015/000000?text=+) **поддерживается** (! [# f03c15 ](https://placehold.it/15/f03c15/000000?text=+) НЕТ карты) |
| Roomba® 7xx | 774, 785, | - | | ![# f03c15](https://placehold.it/15/f03c15/000000?text=+) _Model не предлагает подключение к Wi-Fi, поэтому нет поддержки_ |
| Roomba® 8xx | 880, 886, 891, 896 | - | [Примечания к выпуску](https://homesupport.irobot.com/app/answers/detail/a_id/541#rn_PageTitle) | (скорее всего) |
| Roomba® 8xx | [895] ((https://forum.iobroker.net/post/245274)) | v3.2.10 / 40/69 | [Примечания к выпуску](https://homesupport.irobot.com/app/answers/detail/a_id/541#rn_PageTitle) | ![# c5f015] (https://placehold.it/15/c5f015/000000?text=+) **поддерживается** (! [# f03c15 ](https://placehold.it/15/f03c15/000000?text=+) НЕТ карты) |
| Roomba® 9xx | 965, 981 | - | [Примечания к выпуску](https://homesupport.irobot.com/app/answers/detail/a_id/529#rn_PageTitle) | (скорее всего) |
| Roomba® 9xx | [960] (https://forum.iobroker.net/user/jb_sullivan), [966] (https://forum.iobroker.net/user/thomaslpz), 980 | v2.4.6-3 | [Примечания к выпуску](https://homesupport.irobot.com/app/answers/detail/a_id/529#rn_PageTitle) | ![# c5f015](https://placehold.it/15/c5f015/000000?text=+) **поддерживается (включая карту)** |
| Roomba® i | [i7 (7150)] (https://forum.iobroker.net/post/240589), i7 + (7550) | v1.4 | [Примечания к выпуску](https://homesupport.irobot.com/app/answers/detail/a_id/19549#rn_PageTitle) | ![# c5f015](https://placehold.it/15/c5f015/000000?text=+) **поддерживается (включая карту)** |
| Roomba® e5 | [e5] (https://forum.iobroker.net/topic/7657/irobot-roomba-adapter/158) | v3.4.42 | [Примечания к выпуску](https://homesupport.irobot.com/app/answers/detail/a_id/6345#rn_PageTitle) | ![# c5f015] (https://placehold.it/15/c5f015/000000?text=+) **поддерживается** (! [# f03c15 ](https://placehold.it/15/f03c15/000000?text=+) НЕТ карты) |
| Roomba® s | [S9 +] (https://github.com/Zefau/ioBroker.roomba/issues/34) | v3.2.4 | [Примечания к выпуску](https://homesupport.irobot.com/app/answers/detail/a_id/26887/kw/s9%2B#rn_PageTitle) | ![# c5f015](https://placehold.it/15/c5f015/000000?text=+) **поддерживается (включая карту)** |
| Roomba® s | [S9 +] (https://github.com/Zefau/ioBroker.roomba/issues/34) | v3.2.4 | [Примечания к выпуску] (https://homesupport.irobot.com/app/answers/detail/a_id/26887/kw/s9%2B#rn_PageTitle) | ! [# c5f015] (https://placehold.it/15/c5f015/000000?text=+) **поддерживается (включая карту)** |

Пожалуйста, помогите нам относительно поддерживаемых устройств и сообщите [знать через проблему](https://github.com/iobroker-community-adapters/ioBroker.roomba/issues), поддерживается ли ваша модель Roomba!

## Каналы и состояния
После успешной настройки будут созданы следующие каналы и состояния:

| Канал | Папка | Государство | Описание |
| ------- | ------ | ----- | ----------- |
| уборка | - | - | Команды и информация о процессе очистки |
| уборка | последний | - | Последние команды отправлены роботу |
| уборка | последний | команда | Последняя команда отправлена роботу |
| уборка | последний | отметка времени | Отметка времени последней отправленной команды |
| уборка | последний | datetime | DateTime последняя команда была отправлена |
| уборка | последний | инициатор | Инициатор последней команды |
| уборка | последний | цикл | Цикл |
| уборка | последний | фаза | Фаза |
| уборка | последний | ошибка | Указывает на ошибку во время последней миссии |
| уборка | расписание | - | Информация о расписании |
| уборка | расписание | цикл | График цикла (с воскресенья по субботу) |
| уборка | расписание | часы | Час начала цикла (с воскресенья по субботу) |
| уборка | расписание | минут | Минуты до начала цикла (с воскресенья по субботу) |
| уборка | - | док | Отправьте робота на док-станцию |
| уборка | - | пауза | Приостановить текущий процесс очистки |
| уборка | - | резюме | Возобновить текущий процесс очистки |
| уборка | - | начало | Начать процесс очистки |
| уборка | - | стоп | Остановить текущий процесс очистки |
| устройство | - | - | Информация об устройстве |
| устройство | сеть | - | Сетевая информация |
| устройство | сеть | dhcp | Укажите, активирован ли DHCP |
| устройство | сеть | маршрутизатор | Mac-адрес роутера |
| устройство | сеть | ip | IP-адрес |
| устройство | сеть | подсеть | Адрес подсети |
| устройство | сеть | шлюз | Адрес шлюза |
| устройство | сеть | dns1 | Первичный адрес DNS |
| устройство | сеть | dns2 | Вторичный DNS-адрес |
| устройство | предпочтения | - | Установить предпочтения |
| устройство | предпочтения | binPause | **НЕИЗВЕСТНО** |
| устройство | предпочтения | carpetBoostAuto | Автоматически: Roomba автоматически увеличивает мощность своего пылесоса для глубокой очистки ковров. |
| устройство | предпочтения | cowboostHigh | Performance Mode: Roomba всегда будет увеличивать свой пылесос, чтобы добиться максимальной эффективности уборки всех поверхностей пола. |
| устройство | предпочтения | ecoCharge | **НЕИЗВЕСТНО** |
| устройство | предпочтения | noAutoPasses | Один проход: Roomba покроет все зоны за один проход. |
| устройство | предпочтения | noPP | **НЕИЗВЕСТНО** |
| устройство | предпочтения | openOnly | **НЕИЗВЕСТНО** |
| устройство | предпочтения | schedHold | **НЕИЗВЕСТНО** |
| устройство | предпочтения | twoPass | Roomba покроет все зоны во второй раз. Это может быть полезно в домах с домашними животными или для периодической генеральной уборки. |
| устройство | версии | - | Информация о версии |
| устройство | версии | hardwareRev | Версия аппаратного обеспечения |
| устройство | версии | batteryType | Тип батареи |
| устройство | версии | soundVer | **НЕИЗВЕСТНО** |
| устройство | версии | uiSwVer | **НЕИЗВЕСТНО** |
| устройство | версии | navSwVer | **НЕИЗВЕСТНО** |
| устройство | версии | wifiSwVer | **НЕИЗВЕСТНО** |
| устройство | версии | мобильностьVer | **НЕИЗВЕСТНО** |
| устройство | версии | bootloaderVer | Версия загрузчика |
| устройство | версии | umiVer | **НЕИЗВЕСТНО** |
| устройство | версии | softwareVer | Версия программного обеспечения |
| устройство | - | \ _rawData | Необработанные данные о предпочтениях в формате json |
| устройство | - | mac | Mac-адрес робота |
| устройство | - | имя | Имя робота |
| устройство | - | тип | Тип робота |
| государства | - | - | Информация о статусе |
| государства | - | \ _connected | Состояние подключения |
| государства | - | аккумулятор | Уровень заряда робота |
| государства | - | binFull | Укажите, заполнен ли статус корзины |
| государства | - | binInserted | Укажите, вставлен ли контейнер |
| государства | - | состыкованный | Укажите, пристыкован ли робот |
| государства | - | сигнал | Мощность сигнала |
| государства | - | статус | Текущее состояние робота |
| статистика | - | - | Статистическая информация |
| статистика | миссии | - | Статистика миссии |
| статистика | миссии | не удалось | Количество неудачных работ по уборке |
| статистика | миссии | добиться успеха | Количество успешных клининговых работ |
| статистика | миссии | всего | Количество уборочных работ |
| статистика | время | - | Статистика времени |
| статистика | время | avgMin | **НЕИЗВЕСТНО** |
| статистика | время | hOnDock | **НЕИЗВЕСТНО** |
| статистика | время | nAvail | **НЕИЗВЕСТНО** |
| статистика | время | estCap | **НЕИЗВЕСТНО** |
| статистика | время | nLithChrg | **НЕИЗВЕСТНО** |
| статистика | время | nNimhChrg | **НЕИЗВЕСТНО** |
| статистика | время | nDocks | **НЕИЗВЕСТНО** |
| - | - | refreshedDateTime | Дата Время последнего обновления |
| - | - | refreshedTimestamp | Отметка времени последнего обновления |

## Описание настроек _ (неполное) _
При вызове ```getPreferences()``` будут получены следующие данные (см. Https://github.com/koalazak/dorita980#getpreferences):

| Объект | Индекс | Тип | Описание | ioBroker State |
| ------ | ----- | ---- | ----------- | -------------- |
| netinfo | - | объект | Сетевая информация о подключении Roomba | - |
| netinfo | .dhcp | логическое | Укажите, активирован ли DHCP | device.network.dhcp |
| netinfo | .addr | ip | IP-адрес | device.network.ip |
| netinfo | .mask | ip | Адрес подсети | device.network.subnet |
| netinfo | .gw | ip | Адрес шлюза | device.network.gateway |
| netinfo | .dns1 | ip | Первичный адрес DNS | device.network.dns1 |
| netinfo | .dns2 | ip | Вторичный DNS-адрес | device.network.dns2 |
| netinfo | .bssid | mac | Mac-адрес роутера | device.network.router |
| netinfo | .sec | целое | Неизвестно | _ (не отображается) _ |
| wifistat | - | объект | Неизвестно | - |
| wifistat | .wifi | целое | Неизвестно | _ (не отображается) _ |
| wifistat | .uap | логическое | Неизвестно | _ (не отображается) _ |
| wifistat | .cloud | целое | Неизвестно | _ (не отображается) _ |
| wlcfg | - | объект | Неизвестно | - |
| wlcfg | .sec | целое | Неизвестно | _ (не отображается) _ |
| wlcfg | .ssid | строка | Неизвестно | _ (не отображается) _ |
| mac | - | mac | Mac-адрес Roomba | - |
| страна | - | строка | Неизвестно | - |
| cloudEnv | - | строка | Неизвестно | - |
| svcEndpoints | .svcDeplId | строка | Неизвестно | - |
| mapUploadAllowed | - | логическое | Неизвестно | - |
| localtimeoffset | - | целое | Неизвестно | - |
| ... | - | ... | ... | - |

Пожалуйста, помогите нам с описанием предпочтений. Если вам известно значение предпочтений, указанных в таблице как неизвестные, позвольте мне [узнать их значение через проблему](https://github.com/iobroker-community-adapters/ioBroker.roomba/issues)!

## Интеграция Smart Home / Alexa с использованием ioBroker.javascript
### Отправить карту через Telegram после завершения миссии
Для этого требуется установить адаптер ioBroker ioBroker.telegram (https://github.com/ioBroker/ioBroker.telegram).

Создайте скрипт в «общей» папке ioBroker.javascript и добавьте к нему следующего слушателя:

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

_2019-05-04 исправлена ошибка, не позволяющая отправить карту_

Вы можете изменить переменную ```message``` на любое уведомление, которое вы хотите получать вместе с картой. Вы можете использовать ```%name-of-state%``` для получения значения состояния в дереве объектов ioBroker.roomba.

## Кредиты
### Неофициальный API
Спасибо [@koalazak] (https://github.com/koalazak) для [неофициальной библиотеки iRobot Roomba 980 node.js (SDK)](https://github.com/koalazak/dorita980#readme).

### Иконки
Иконки, сделанные <a href="https://www.flaticon.com/authors/iconnice" title="Iconnice">Iconnice</a> с <a href="https://www.flaticon.com/" title="Flaticon">сайта www.flaticon.com,</a> имеют лицензию <a href="http://creativecommons.org/licenses/by/3.0/" title="Лицензия Creative Commons BY 3.0" target="_blank">CC 3.0 BY.</a></div>

## Changelog

### ___WORK IN PROGRESS__
* (Apollon77) Adjust some types to prevent js-controller 3.3 warnings
* (thost96) fix hanging state loading in frontend

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

### 0.3.x (2019-01-06)
- (zefau) Bug fixed (```Mission saved``` loop)

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