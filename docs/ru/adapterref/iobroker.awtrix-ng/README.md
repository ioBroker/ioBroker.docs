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
hash: FJ8Kf5roOXc83tuv9o3f/wIuUbv45uJe+qulwJ6MUCw=
---
![логотип](../../../de/admin/awtrix-ng.png)

# ioBroker.awtrix-ng

## Требования

- Node.js 22 (или более новая версия)
- js-controller 6.0.11 (или более новая версия)
- Административный адаптер 7.6.20 (или более новая версия)
- Устройство _Awtrix NG_ с версией прошивки _1.1.2_ (или новее) — например, Ulanzi TC001.

Купить можно здесь: [Aliexpress.com](https://haus-auto.com/p/ali/UlanziTC001) , здесь: [Amazon.de](https://haus-auto.com/p/amz/UlanziTC001) или здесь: [ulanzi.de](https://haus-auto.com/p/ula/UlanziTC001) (партнерские ссылки)

## Первые шаги

1. Прошейте микропрограмму на устройство и добавьте его в локальную сеть через Wi-Fi — см. [документацию.](https://blueforcer.github.io/awtrix-ng/getting-started/flashing/)
2. Установите адаптер awtrix-ng в ioBroker (и создайте новый экземпляр).
3. Откройте конфигурацию экземпляра и введите IP-адрес устройства в локальной сети.

## Часто задаваемые вопросы (FAQ)

**Можно ли использовать адаптер для отключения приложений по умолчанию (например, для отображения уровня заряда батареи или данных с датчиков)?**

Нет, эта функция была удалена из прошивки awtrix-ng. Используйте меню на самом устройстве, чтобы навсегда скрыть эти приложения.

**Можно ли заменить логические значения (истина/ложь) другим текстом?**

Просто создайте псевдоним в `alias.0` типа `string` (строка) и преобразуйте логическое значение в любое другое значение, используя функцию чтения (например) `val ? 'offen' : 'geschlossen'` _Это стандартная функция ioBroker и не имеет прямого отношения к данному адаптеру._

**Устройство сильно нагревается во время зарядки.**

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

Если состояние изменяется очень часто (например, каждую секунду), некоторые изменения игнорируются и не передаются, чтобы минимизировать нагрузку на устройство. Для этой цели каждое приложение использует собственное «время блокировки», которое можно настроить глобально в параметрах экземпляра. Время по умолчанию составляет 3 секунды. Установка значения меньше 3 не рекомендуется.

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

## Приложения

**Названия приложений должны состоять только из строчных букв (az) и быть уникальными. Не допускаются цифры, специальные символы и пробелы.**

Следующие названия приложений зарезервированы для внутренних приложений и не могут быть использованы: `Time`, `Date`, `Temperature`, `Humidity`, `Battery`.

- С `activate` -Состояние каждого приложения позволяет вывести его на передний план.
- Эти условия играют свою роль. `button` и разрешать только логические значения. `true` (Другие значения приведут к предупреждению в журнале)

Каждое самостоятельно созданное приложение имеет состояние с идентификатором. `apps.<name>.visible` Если это условие возникнет `false` Если эта настройка указана неверно, приложение будет удалено с устройства и больше не будет отображаться. Это полезно для ограничения работы определенных приложений только в дневное время или в определенные периоды времени.

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

### 0.0.8 (2026-08-06)

* (@klein0r) Added more settings
* (@klein0r) Fixed Blockly code generation

### 0.0.7 (2026-08-05)

* (@klein0r) Removed device update state and notification
* (@klein0r) Fixed rtttl endpoint
* (@klein0r) Improved error handling

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