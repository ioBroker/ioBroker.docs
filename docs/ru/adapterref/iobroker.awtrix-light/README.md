---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.awtrix-light?style=flat-square
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.awtrix-light?label=npm%20downloads&style=flat-square
BADGE-node-lts: https://img.shields.io/node/v-lts/iobroker.awtrix-light?style=flat-square
BADGE-Libraries.io dependency status for latest release: https://img.shields.io/librariesio/release/npm/iobroker.awtrix-light?label=npm%20dependencies&style=flat-square
BADGE-GitHub: https://img.shields.io/github/license/klein0r/iobroker.awtrix-light?style=flat-square
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/klein0r/iobroker.awtrix-light?logo=github&style=flat-square
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/klein0r/iobroker.awtrix-light?logo=github&style=flat-square
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/klein0r/iobroker.awtrix-light?logo=github&style=flat-square
BADGE-GitHub issues: https://img.shields.io/github/issues/klein0r/iobroker.awtrix-light?logo=github&style=flat-square
BADGE-GitHub Workflow Status: https://img.shields.io/github/actions/workflow/status/klein0r/iobroker.awtrix-light/test-and-release.yml?branch=master&logo=github&style=flat-square
BADGE-Beta: https://img.shields.io/npm/v/iobroker.awtrix-light.svg?color=red&label=beta
BADGE-Stable: http://iobroker.live/badges/awtrix-light-stable.svg
BADGE-Installed: http://iobroker.live/badges/awtrix-light-installed.svg
chapters: {"pages":{"de/adapterref/iobroker.awtrix-light/README.md":{"title":{"de":"ioBroker.awtrix-light"},"content":"de/adapterref/iobroker.awtrix-light/README.md"},"de/adapterref/iobroker.awtrix-light/weather-app.md":{"title":{"de":"ioBroker.awtrix-light"},"content":"de/adapterref/iobroker.awtrix-light/weather-app.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.awtrix-light/README.md
title: ioBroker.awtrix-light
hash: X0FH0AAyrKizVzTfpVwNLsTbw4D1qeGSFk0nawRnlys=
---
![логотип](../../../de/admin/awtrix-light.png)

# IoBroker.awtrix-light
## Требования
- nodejs 18 (или новее)
- js-контроллер 5.0.0 (или новее)
- Адаптер администратора 6.6.0 (или новее)
- Устройство _Awtrix 3_ с версией прошивки _0.96_ (или новее) - например, Ulanzi TC001.

Купить здесь: [Aliexpress.com](https://haus-auto.com/p/ali/UlanziTC001) или здесь: [ulanzi.de](https://haus-auto.com/p/ula/UlanziTC001) (партнерские ссылки)

## Первые шаги
1. Прошейте прошивку на устройство и добавьте его в локальную сеть через WiFi - см. [Документацию](https://blueforcer.github.io/awtrix3/#/quickstart)
2. Установите адаптер awtrix-light в ioBroker (и создайте новый экземпляр)
3. Откройте конфигурацию экземпляра и сохраните IP-адрес устройства в локальной сети.

## FAQ (часто задаваемые вопросы)
**Могу ли я использовать адаптер для отключения приложений по умолчанию (например, уровня заряда батареи или данных датчиков)?**

Нет, эта функция удалена из прошивки awtrix-light. Используйте меню на самом устройстве, чтобы навсегда скрыть эти приложения.

**Можно ли заменить логические значения (истина/ложь) другим текстом?**

Для этого просто создайте псевдоним в `alias.0` типа `string` (строка) и преобразуйте логическое значение в любое другое значение (например, `val ? 'offen' : 'geschlossen'`) с помощью функции чтения. *Это стандартная функция ioBroker и не имеет прямого отношения к этому адаптеру.*

**Как мне перейти на последнюю версию прошивки?**

Просто используйте [Меню на устройстве](https://blueforcer.github.io/awtrix3/#/onscreen), чтобы перейти к точке `update`. Дальше часы сделают все остальное сами. Нет необходимости снова использовать веб-прошивальщик (если только обновление прошивки явно не требует этого).

**Устройство нагревается во время зарядки.**

К сожалению, аппаратная конструкция не оптимальна. Рекомендуется использовать максимально слабый источник питания, способный выдавать максимум 1 А.

**Можно ли вынуть аккумулятор из устройства?**

Да, есть такой вариант. Однако устройство необходимо открывать с помощью фена с горячим воздухом, поскольку переднее окно приклеено. Вам также понадобится [Паяный понижающий преобразователь](https://github.com/Blueforcer/awtrix3/issues/67#issuecomment-1595418765), чтобы все работало.

**Можно ли по-другому отсортировать приложения на устройстве?**

По умолчанию приложения отображаются в том же порядке, в котором они были созданы в настройках экземпляра. Просто переместите приложения вверх или вниз, чтобы изменить положение. Приложения с историческими данными/графиками располагаются позади других пользовательских приложений.

Если вы хотите определить свои собственные позиции, пользовательские позиции можно активировать в настройках эксперта. Затем можно назначить числовую позицию для каждого приложения.

**Можно ли сохранить другой числовой формат?**

Все состояния номера типа (common.type `number`) форматируются так, как настроено в ioBroker. Стандартный формат системы можно перезаписать экспертной настройкой (начиная с версии адаптера 0.7.1). Числа могут быть представлены в следующих форматах:

- Системные установки по умолчанию
- `хх.ххх,хх`
- `xx,xxx.xx` (формат США)
- `ххххх,хх`
- `xxxxx.xx` (формат США)

**Можете ли вы ограничить доступ к веб-интерфейсу awtrix-light?**

Да, начиная с версии прошивки 0.82 доступ может быть защищен именем пользователя и паролем. Начиная с версии адаптера 0.8.0, эти пользовательские данные также можно хранить в настройках экземпляра.

**Как работает опция удержания уведомлений?**

Когда уведомление отправляется с опцией `hold: true`, текст на дисплее остается до тех пор, пока уведомление не будет подтверждено. Это можно сделать либо с помощью средней кнопки на устройстве, либо установив состояние `notification.dismiss` на `true`.

**Некоторые изменения состояния отображаются не сразу.**

Если состояние меняется очень часто (например, каждую секунду), некоторые изменения будут игнорироваться и не передаваться, чтобы снизить нагрузку на устройство. У каждого приложения есть свое «время блокировки», которое можно настроить глобально в настройках экземпляра. Время по умолчанию составляет 3 секунды. Не рекомендуется устанавливать значение меньше 3.

## Идентичные приложения на нескольких устройствах
Если необходимо управлять несколькими устройствами awtrix-light с помощью одних и тех же приложений, **для каждого устройства необходимо создать отдельный экземпляр.** Однако затем вы можете указать в настройках экземпляра других устройств, что приложения должны быть переданы под контроль. из другого экземпляра.

Пример

1. Настройте все нужные приложения в экземпляре awtrix-light.0.
2. Создайте еще один экземпляр для второго устройства («awtrix-light.1»).
3. Выберите «awtrix-light.0» в настройках экземпляра «awtrix-light.1», чтобы отобразить те же приложения на втором устройстве.

Начиная с версии 0.15.0 (и более поздних), видимость пользовательских приложений и всего контента экспертных приложений также переносится на другие устройства, которые копируют настройки приложения. Например, в приведенном выше примере приложения экземпляра `awtrix-light.1` также скрываются, как только изменяется видимость приложения в основном экземпляре `awtrix-light.0`. То же самое относится ко всему содержимому экспертных приложений.

## Блокли и JavaScript
`sendTo` / ящик сообщений можно использовать для

- отображение одноразового уведомления (с текстом, звуком, символом, ...)
- воспроизвести звук

### Уведомления
Отправьте одноразовое уведомление на устройство:

```javascript
sendTo('awtrix-light.0', 'notification', { text: 'haus-automatisierung.com', repeat: 1, stack: true, wakeup: true, hold: false }, (res) => {
    if (res && res.error) {
        console.error(res.error);
    }
});
```

Объект сообщения поддерживает все параметры, доступные во встроенном ПО. Подробности см. в [документация](https://blueforcer.github.io/awtrix3/#/api?id=json-properties).

*Для создания уведомления также можно использовать блок Blockly (там предлагаются не все доступные варианты).*

### Тоны
Чтобы воспроизвести (ранее созданный) звуковой файл:

```javascript
sendTo('awtrix-light.0', 'sound', { sound: 'beispiel' }, (res) => {
    if (res && res.error) {
        console.error(res.error);
    }
});
```

Объект сообщения поддерживает все параметры, доступные во встроенном ПО. Подробности см. в [документация](https://blueforcer.github.io/awtrix3/#/api?id=sound-playback).

*Блок Blockly можно использовать, чтобы сделать этот вызов еще проще.*

Чтобы воспроизвести собственную мелодию звонка:

```javascript
sendTo('awtrix-light.0', 'rtttl', 'Beep: d=32,o=7,b=120: a,P,c#', (res) => {
    if (res && res.error) {
        console.error(res.error);
    }
});
```

##Программы
**Имена приложений могут содержать только строчные буквы (a–z) и должны быть уникальными. Никаких цифр, специальных символов и пробелов.**

Следующие имена приложений зарезервированы внутренними приложениями и не могут быть использованы: `Time`, `Date`, `Temperature`, `Humidity`, `Battery`.

- В состоянии «активировать» каждое приложение его можно вывести на передний план.
- Эти состояния имеют роль «кнопка» и допускают только логическое значение «истина» (другие значения приводят к предупреждению в журнале)

Каждое самостоятельно созданное приложение имеет состояние с идентификатором `apps.<name>.visible`. Если для этого состояния установлено значение `false` (ложь), приложение будет удалено с устройства и больше не будет отображаться. Это полезно для отображения определенных приложений, например, только в течение дня или в определенные периоды времени.

### Пользовательские приложения
- `%s` является заполнителем для значения состояния.
- `%u` — это заполнитель для единицы измерения состояния (например, `°C`)

Эти заполнители можно использовать в тексте пользовательских приложений (например, `Außentemperatur: %s %u`).

**Пользовательские приложения отображают только подтвержденные значения! Управляющие значения с `ack: false` игнорируются (во избежание дублирования запросов к устройству и для обеспечения достоверности отображаемых значений)!**

Выбранное состояние должно иметь тип данных `string` или номер `number`. Другие типы (например, `boolean`) также поддерживаются, но генерируют предупреждения. Рекомендуется использовать псевдоним с функцией преобразования для замены логических значений текстом (например, `val ? 'an' : 'aus'` или `val ? 'offen' : 'geschlossen'`). Подробности смотрите в документации ioBroker. *Эта стандартная функция не имеет никакого отношения к адаптеру.*

Следующие комбинации приводят к появлению предупреждения в журнале:

- Пользовательское приложение с выбранным идентификатором объекта не содержит заполнителя `%s` в тексте.
- Пользовательское приложение создается с выбранным идентификатором объекта без модуля в `common.unit`, но `%u` включен в тело.
- Идентификатор объекта не выбран, но в тексте используется `%s`

### Исторические приложения/графики
ДЕЛАТЬ

**На графиках показаны только подтвержденные значения. Значения налогов с `ack: false` фильтруются и игнорируются!**

### Экспертные приложения
Экспертные приложения доступны начиная с версии адаптера 0.10.0. Эти приложения позволяют вам устанавливать все значения вручную через состояния и управлять ими с помощью собственной логики. Чтобы создать новое экспертное приложение:

- Откройте вкладку «Параметры эксперта» в настройках экземпляра.
- Создайте новое экспертное приложение со свободно выбираемым именем (например, «тест»).
- Сохраните настройки экземпляра

После этого все управляемые состояния приложения `test` создаются в `awtrix-light.0.apps.test`. Чтобы изменить соответствующие значения приложения, вы можете просто установить значения состояний `icon`, `text` и т. д., используя свои собственные скрипты (например, JavaScript или Blockly).

Пример: [Приложение Погода](weather-app.md)

## Скрыть родные приложения
Чтобы скрыть на устройстве приложения по умолчанию (например, температуру или влажность): используйте меню на самом устройстве! Подробности см. в [документация](https://blueforcer.github.io/awtrix3/#/onscreen).

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.1.0 (2024-05-11)

* (klein0r) Sync app activations (if enabled)

### 1.0.1 (2024-04-28)

* (klein0r) Keep text case of expert apps (ignore system settings)

### 1.0.0 (2024-04-04)

NodeJS >= 18.x and js-controller >= 5 is required

Updated recommended firmware version to 0.96

### 0.16.0 (2024-03-12)

Updated recommended firmware version to 0.95

* (klein0r) Added notification for firmware update
* (klein0r) Added setting state for volume
* (klein0r) Rebranding Awtrix Light to Awtrix 3

### 0.15.1 (2024-03-12)

* (klein0r) Fixed default values of color states

## License
MIT License

Copyright (c) 2024 Matthias Kleine <info@haus-automatisierung.com>

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