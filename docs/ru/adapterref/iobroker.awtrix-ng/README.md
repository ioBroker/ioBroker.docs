---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.awtrix-ng?style=flat-square
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.awtrix-ng?label=npm%20downloads&style=flat-square
BADGE-node-lts: https://img.shields.io/node/v-lts/iobroker.awtrix-ng?style=flat-square
BADGE-Libraries.io dependency status for latest release: https://img.shields.io/librariesio/release/npm/iobroker.awtrix-ng?label=npm%20dependencies&style=flat-square
BADGE-GitHub: https://img.shields.io/github/license/klein0r/iobroker.awtrix-ng?style=flat-square
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/klein0r/iobroker.awtrix-ng?logo=github&style=flat-square
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/klein0r/iobroker.awtrix-ng?logo=github&style=flat-square
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/klein0r/iobroker.awtrix-ng?logo=github&style=flat-square
BADGE-GitHub issues: https://img.shields.io/github/issues/klein0r/iobroker.awtrix-ng?logo=github&style=flat-square
BADGE-GitHub Workflow Status: https://img.shields.io/github/actions/workflow/status/klein0r/iobroker.awtrix-ng/test-and-release.yml?branch=main&logo=github&style=flat-square
BADGE-Beta: https://img.shields.io/npm/v/iobroker.awtrix-ng.svg?color=red&label=beta
BADGE-Stable: http://iobroker.live/badges/awtrix-ng-stable.svg
BADGE-Installed: http://iobroker.live/badges/awtrix-ng-installed.svg
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.awtrix-ng/README.md
title: ioBroker.awtrix-ng
hash: vE67beE37IXfnnTWkNhZytDpPz44H+2UFPKbclhkj3w=
---
![логотип](../../../de/admin/awtrix-ng.png)

# ioBroker.awtrix-ng

## Требования

- Node.js 22 (или более новая версия)

- js-controller 6.0.11 (или более новая версия)

- Административный адаптер 7.6.20 (или более новая версия)

- Устройство _Awtrix NG_ с версией прошивки _1.1.4_ (или новее) — например, Ulanzi TC001, Ulanzi TC002.

- Купить TC001: [Aliexpress.com](https://haus-auto.com/p/ali/UlanziTC001) , [Amazon.de](https://haus-auto.com/p/amz/UlanziTC001) или [ulanzi.de](https://haus-auto.com/p/ula/UlanziTC001) _(партнерские ссылки)_

- Купить TC002: [Amazon.de](https://haus-auto.com/p/amz/UlanziTC002) или [ulanzi.de](https://haus-auto.com/p/ula/UlanziTC002) _(партнерские ссылки)_

## Первые шаги

1. Прошейте микропрограмму на устройство и добавьте его в локальную сеть через Wi-Fi — см. [документацию.](https://blueforcer.github.io/awtrix-ng/getting-started/flashing/)
2. Установите адаптер awtrix-ng в ioBroker (и создайте новый экземпляр).
3. Откройте конфигурацию экземпляра и введите IP-адрес устройства в локальной сети (и порт, если он был изменен на устройстве — по умолчанию 80).

## Часто задаваемые вопросы (FAQ)

**Можно ли использовать адаптер для отключения приложений по умолчанию (например, для отображения уровня заряда батареи или данных с датчиков)?**

Нет, эта функция была удалена из прошивки awtrix-ng. Используйте меню на самом устройстве, чтобы навсегда скрыть эти приложения.

**Можно ли заменить логические значения (истина/ложь) другим текстом?**

Просто создайте псевдоним в `alias.0` типа `string` (строка) и преобразуйте логическое значение в любое другое значение, используя функцию чтения (например) `val ? 'offen' : 'geschlossen'` _Это стандартная функция ioBroker и не имеет прямого отношения к данному адаптеру._

**Устройство нагревается во время зарядки.**

К сожалению, конструкция устройства не оптимальна. Рекомендуется использовать максимально слабый блок питания, способный выдавать максимум 1 А.

**Можно ли указать другой формат чисел?**

Все состояния типа number (common.type) `number` Данные форматируются в соответствии с конфигурацией в ioBroker. Формат системы по умолчанию можно изменить с помощью экспертных настроек (начиная с версии адаптера 0.7.1). Числа могут отображаться в следующих форматах:

- Системный стандарт
- `xx.xxx,xx`
- `xx,xxx.xx` (Формат США)
- `xxxxx,xx`
- `xxxxx.xx` (Формат США)

**Можно ли ограничить доступ к веб-интерфейсу awtrix-ng?**

Да, начиная с версии прошивки 0.82, доступ можно защитить с помощью имени пользователя и пароля. Начиная с версии адаптера 0.8.0, эти пользовательские данные также можно хранить в настройках экземпляра.

**Как работает функция удержания уведомлений?**

Если уведомление содержит опцию `hold: true` После отправки текст остается на экране до тех пор, пока уведомление не будет подтверждено. Это можно сделать либо с помощью средней кнопки на устройстве, либо изменив статус. `notification.dismiss` на `true` установлено.

**Некоторые изменения состояния отображаются не сразу.**

Если состояние изменяется очень часто (например, каждую секунду), некоторые изменения игнорируются и не передаются, чтобы минимизировать нагрузку на устройство. Для этой цели каждое приложение использует собственное «время блокировки», которое можно настроить глобально в параметрах экземпляра. Время по умолчанию составляет 3 секунды. Не рекомендуется устанавливать значение меньше 3.

## Идентичные приложения на нескольких устройствах

Если необходимо управлять несколькими устройствами awtrix-ng с помощью одних и тех же приложений, **для каждого устройства следует создать отдельный экземпляр.** Однако в настройках экземпляра дополнительных устройств можно указать, что приложения должны наследоваться от другого экземпляра.

Пример

1. Настройте все необходимые приложения в экземпляре. `awtrix-ng.0`
2. Создайте еще один экземпляр для второго устройства (`awtrix-ng.1`)
3. Выбирать `awtrix-ng.0` в настройках экземпляра `awtrix-ng.1` чтобы отобразить те же приложения на втором устройстве

Начиная с версии 0.15.0 (и более поздних версий), видимость пользовательских приложений и всего содержимого экспертных приложений также передается на другие устройства, которые копируют настройки приложения. В приведенном выше примере, например, копируются приложения экземпляра. `awtrix-ng.1` Также скрывается, когда видимость приложения снижается в основном экземпляре. `awtrix-ng.0` Это будет изменено. То же самое относится ко всему контенту в приложениях для экспертов.

## Blockly и JavaScript

`sendTo` / messagebox можно использовать для

- Отобразить одноразовое уведомление (с текстом, звуком, символом и т. д.).
- воспроизводить звук

### Уведомления

Отправить одноразовое уведомление на устройство:

```javascript
sendTo(
    'awtrix-ng.0',
    'notification',
    {
        text: 'haus:automation',
        textColor: '#E2671F', // optional
        icon: '37620', // optional
        durationMs: 5000, // optional
        repeat: 1, // optional
        stack: true, // optional
        wakeup: true, // optional
        hold: false // optional
    },
    (res) => {
        if (res && res.error) {
            console.error(res.error);
        }
    }
);
```

Объект сообщения поддерживает все параметры, доступные в микропрограмме. Подробности см. в [документации](https://blueforcer.github.io/awtrix-ng/reference/payload/) .

_Кроме того, для создания уведомления можно использовать блок Blockly (не все доступные там опции)._

### тона

**Звуковые файлы должны быть в формате RTTTL и находиться в папке MELODIES. Расширение файла для этих звуков — .txt. Расширение файла не должно указываться при воспроизведении звуков!**

Для создания (ранее созданного) тона, называемого `beispiel` играть:

```javascript
sendTo('awtrix-ng.0', 'audio', { sound: 'beispiel' }, (res) => {
    if (res && res.error) {
        console.error(res.error);
    }
});
```

Объект сообщения поддерживает все параметры, доступные в микропрограмме. Подробности см. в [документации](https://blueforcer.github.io/awtrix-ng/reference/payload/) .

_Для упрощения этого вызова можно использовать блок Blockly._

Чтобы воспроизвести свой собственный рингтон:

```javascript
sendTo('awtrix-ng.0', 'audio', { rtttl: 'beep:d=4,o=5,b=120:c,e,g' }, (res) => {
    if (res && res.error) {
        console.error(res.error);
    }
});
```

## радио

Устройства с интернет-радио (например, Ulanzi TC002) принимают этот канал. `audio.radio` Функция определяется автоматически (в соответствии с возможностями устройства) — на устройствах без радиомодуля (например, TC001) эти объекты не создаются.

- `audio.radio.<Sender>.playing` -`true` играет на станции, `false` Останавливает воспроизведение (если данная станция в данный момент воспроизводится). Статус также указывает, воспроизводится ли станция в данный момент.
- `audio.radio.<Sender>.url` - URL-адрес трансляции вещателя (только для чтения)
- `audio.radio.playing` /`audio.radio.station` /`audio.radio.title` - Текущий статус воспроизведения (только для чтения)
- `audio.radio.stop` - выключает радио

Управление передатчиками осуществляется через веб-интерфейс устройства. При добавлении или удалении передатчиков через этот интерфейс объекты создаются или удаляются автоматически (проверка производится каждые 60 секунд). В ioBroker добавление или удаление передатчиков невозможно.

## MP3-файлы

Устройства, способные воспроизводить MP3-файлы (например, Ulanzi TC002), принимают этот канал. `audio.mp3` Функция определяется автоматически (в соответствии с возможностями устройства).

- `audio.mp3.<Datei>.playing` -`true` воспроизводит файл, `false` Это останавливает воспроизведение (если файл в данный момент воспроизводится). Статус также указывает, воспроизводится ли файл в данный момент.
- `audio.mp3.<Datei>.size` - Размер файла в байтах (только для чтения)
- `audio.mp3.playing` /`audio.mp3.file` - Текущий статус воспроизведения (только для чтения)
- `audio.mp3.stop` - останавливает воспроизведение

Файлы загружаются и удаляются через веб-интерфейс устройства. Объекты создаются и удаляются автоматически (проверка каждые 60 секунд). Звуки из скриптов не отображаются.

## Мелодии

Устройства со звуковым сигналом принимают этот канал. `audio.melody` со всеми мелодиями, хранящимися на устройстве (RTTTL).

- `audio.melody.<Melodie>.play` - исполняет мелодию
- `audio.melody.<Melodie>.rtttl` /`audio.melody.<Melodie>.duration` - Время жизни (RTTTL) и длительность в мс (только для чтения)
- `audio.melody.stop` - останавливает воспроизведение

Устройство не показывает, воспроизводится ли в данный момент мелодия, поэтому для этого есть кнопка. `play` вместо выключателя `playing` Мелодии управляются через веб-интерфейс устройства (недействительные мелодии не отображаются в списке). Объекты создаются и удаляются автоматически (проверка каждые 60 секунд).

**Примечание:** Остановка воспроизведения мелодии или MP3-файла приводит к остановке всех звуков (мелодий и MP3-файлов).

## Приложения

**Названия приложений должны быть уникальными и могут содержать буквы (AZ, az), цифры (0-9). `_` и `-` Содержит (максимум 32 символа). Без пробелов и других специальных символов.**

Следующие имена зарезервированы внутренними приложениями или устройством и не могут быть использованы: `Time`, `Date`, `Temperature`, `Humidity`, `Battery`, `Status`, `active`, `next`, `prev`, `previous`, `order`.

Каждое приложение имеет следующие состояния:

- `apps.<name>.enabled` - если это условие возникнет `false` Если этот параметр установлен неправильно, приложение будет деактивировано на устройстве и больше не будет отображаться. Это полезно для отображения определенных приложений только в течение дня или в определенные периоды времени.
- `apps.<name>.slot` - Позиция приложения в цикле (0 = первое приложение). Чтобы изменить порядок, просто установите новую позицию приложения — все остальные приложения будут перемещены автоматически (как при перетаскивании). Позиции всех приложений всегда нумеруются последовательно.
- `apps.<name>.activate` - выводит приложение на передний план. Это состояние выполняет следующую роль: `button` и допускает только логическое значение. `true` (Другие значения приведут к предупреждению в журнале)
- `apps.<name>.present` -`true` если приложение установлено на устройстве (только для чтения)
- `apps.<name>.lastError` - Последнее сообщение об ошибке с устройства при передаче или удалении приложения (только для чтения)

Порядок и статус активации приложений управляются ioBroker. Изменения, внесенные в устройство (например, через веб-интерфейс), перезаписываются при следующей синхронизации. Порядок устройств используется только для новых приложений. Экземпляры, использующие настройки другого экземпляра, принимают порядок этого экземпляра.

Если включена опция "Удалять приложения при остановке экземпляра", пользовательские и специализированные приложения с заданным сроком жизни переносятся и повторно отправляются каждые 5 минут. Это гарантирует, что эти приложения исчезнут с устройства даже после завершения работы экземпляра (например, после сбоя).

### Пользовательские приложения

- `%s` является заполнителем для значения состояния.
- `%u` является заполнителем для обозначения государственной единицы (например, `°C`)

Эти заполнители можно использовать в тексте пользовательских приложений (например, `Außentemperatur: %s %u`).

**Пользовательские приложения отображают только проверенные значения! Управляйте значениями с помощью `ack: false` Эти запросы будут проигнорированы (во избежание повторных запросов к устройству и для обеспечения корректности отображаемых значений)!**

Выбранное состояние должно иметь строковый тип данных. `string` или число `number` быть. Другие типы (например) `boolean` Они также поддерживаются, но генерируют предупреждения. Рекомендуется использовать псевдоним с функцией преобразования для замены логических значений текстом (например, `val ? 'an' : 'aus'` или `val ? 'offen' : 'geschlossen'` Подробности см. в документации ioBroker. _Эта стандартная функция не связана с адаптером._

Следующие комбинации приведут к появлению предупреждения в журнале:

- В пользовательском приложении с выбранным идентификатором объекта отсутствует заполнитель. `%s` в тексте
- Создается пользовательское приложение с выбранным идентификатором объекта без указания модуля. `common.unit` создан, но `%u` содержится в тексте
- Идентификатор объекта не выбран, но `%s` используется в тексте

### Исторические приложения / Графики

ЧТО СДЕЛАТЬ

**На графиках отображаются только подтвержденные значения. Контрольные значения с `ack: false` Эти сообщения будут отфильтрованы и проигнорированы!**

### Экспертные приложения

Экспертные приложения доступны начиная с версии адаптера 0.10.0. Эти приложения позволяют вручную устанавливать все значения через состояния и управлять ими с помощью собственной логики. Чтобы создать новое экспертное приложение:

- Откройте вкладку «Экспертные параметры» в настройках экземпляра.
- Создайте новое приложение для экспертов с именем на ваш выбор (например, `test`)
- Сохраните настройки экземпляра.

После этого отобразятся все управляемые состояния приложения. `test` под `awtrix-ng.0.apps.test` создано. Чтобы изменить соответствующие значения приложения, просто измените значение состояний. `icon`, `text`, и т. д. можно установить с помощью пользовательских скриптов (например, JavaScript или Blockly).

#### Основные объекты

Базовый объект представляет собой фундаментальное определение для приложения Awtrix, позволяющее устанавливать все существующие параметры. _Базовый объект расширяется всеми остальными атрибутами экспертного приложения._

См. [документацию](https://blueforcer.github.io/awtrix-ng/reference/payload/) для получения информации обо всех доступных атрибутах.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**

* (@klein0r) **Breaking change:** Renamed settings states to the names of the device settings (e.g. `settings.brightness.value` -> `settings.brightness.brightness`, `settings.apps.transitionSpeed` -> `settings.apps.transitionDurationMs`) - old objects are deleted automatically
* (@klein0r) Sleep mode (`device.sleep`) is blocked on devices without timed sleep (e.g. TC002 would not wake up again)
* (@klein0r) Scroll speed setting (`settings.text.scroll.speed`) allows up to 500 % now
* (@klein0r) Recommended Awtrix NG version is now 1.1.4

### 0.3.0 (2026-09-30)

* (@klein0r) Added playback of MP3 files (`audio.mp3.*`) for devices which support it (e.g. TC002)
* (@klein0r) Added playback of melodies (`audio.melody.*`)
* (@klein0r) Screen content (`display.content`) is a much smaller SVG now (about 95 % less data) and just written when it has changed

### 0.2.0 (2026-09-30)

* (@klein0r) Port of the device is configurable now (default: 80)
* (@klein0r) Apps are transferred again when a reboot of the device has been detected
* (@klein0r) App order (enabled / slot) is transferred to the device on connect
* (@klein0r) Custom apps are transferred even if disabled (visibility is controlled by the device)
* (@klein0r) Fixed custom apps with invalid object ID being transferred as background-only apps
* (@klein0r) History apps keep refreshing after errors and retry if the history instance was unavailable
* (@klein0r) Custom and expert apps get a lifetime if "Delete apps when instance is stopped" is enabled (removed from device if the adapter is not running anymore)
* (@klein0r) App names may contain digits, `_` and `-` now
* (@klein0r) Added states `apps.<name>.present` and `apps.<name>.lastError`
* (@klein0r) Failed steps when transferring data to the device (settings, apps, indicators, ...) are retried with the next refresh
* (@klein0r) Apps which have been removed from the device (e.g. scripts) are cleaned up properly
* (@klein0r) Apps are removed in parallel when the instance is stopped (and not at all if the device is not reachable)
* (@klein0r) Changing `apps.<name>.slot` moves the app to the new position (other apps are shifted) - order and enabled state are managed by ioBroker
* (@klein0r) Added internet radio (`audio.radio.*`) for devices which support it (e.g. TC002)
* (@klein0r) Fixed display duration of custom and history apps (setting was ignored)
* (@klein0r) Scroll speed of custom apps is a percentage of the default speed now (up to 500 %) and does not force scrolling of short texts anymore
* (@klein0r) Improved instance configuration (dependencies between fields, validation, labels and help texts)
* (@klein0r) Migrated all HTTP requests to the new library [awtrix-ng-api](https://www.npmjs.com/package/awtrix-ng-api)
* (@klein0r) Fixed screen content download (`display.content`)
* (@klein0r) Added additional meta information (soc and board type)
* (@klein0r) Recommended Awtrix NG version is now 1.1.2
* (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 0.1.0 (2026-08-11)

* (@klein0r) Used new audio API endpoint for all types of sounds (file, mp3, rtttl)
* (@klein0r) Recommended Awtrix NG version is now 1.1.0

### 0.0.10 (2026-08-07)

* (@klein0r) Updated documentation
* (@klein0r) Recommended Awtrix NG version is now 1.0.15
* (@klein0r) Automatically cast icon value to string in notifications

### 0.0.9 (2026-08-06)

* (@klein0r) Removed option to automatically delete other apps
* (@klein0r) Updated logo

## License

MIT License

Copyright (c) 2026 Matthias Kleine <info@haus-automatisierung.com>

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