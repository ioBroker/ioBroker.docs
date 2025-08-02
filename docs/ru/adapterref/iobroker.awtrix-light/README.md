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
title: ioBroker.awtrix-легкий
hash: FxNpFW8FV46EXb0cCMmvKwSo6/M3PV9mN/5GKvkM03Q=
---
![логотип](../../../de/admin/awtrix-light.png)

# IoBroker.awtrix-light
## Требования
- nodejs 20 (или новее)
- js-controller 6.0.0 (или новее)
- Административный адаптер 7.4.10 (или новее)
- Устройство Awtrix 3 с версией прошивки 0.98 (или новее) - например, Ulanzi TC001

Купить здесь: [Aliexpress.com](https://haus-auto.com/p/ali/UlanziTC001) или здесь: [ulanzi.de](https://haus-auto.com/p/ula/UlanziTC001) (Партнерские ссылки)

## Первые шаги
1. Прошейте прошивку на устройство и добавьте его в локальную сеть через Wi-Fi - см. [документацию](https://blueforcer.github.io/awtrix3/#/quickstart)
2. Установите адаптер awtrix-light в ioBroker (и создайте новый экземпляр)
3. Откройте конфигурацию экземпляра и введите IP-адрес устройства в локальной сети.

## FAQ (часто задаваемые вопросы)
**Могу ли я использовать адаптер для отключения приложений по умолчанию (например, уровня заряда батареи или данных датчиков)?**

Нет, эта функция была удалена из прошивки awtrix-light. Используйте меню на самом устройстве, чтобы навсегда скрыть эти приложения.

**Можно ли заменить логические значения (истина/ложь) другим текстом?**

Для этого просто создайте псевдоним в `alias.0` типа `string` (строка) и преобразуйте логическое значение в любое другое значение с помощью функции чтения (например, `val ? 'offen' : 'geschlossen'`). *Это стандартная функция ioBroker, которая не имеет ничего общего с этим адаптером.*

**Как мне обновить прошивку до последней версии?**

Просто используйте [Меню на устройстве](https://blueforcer.github.io/awtrix3/#/onscreen) для перехода к точке `update`. Затем часы сделают все остальное сами. Нет необходимости снова использовать веб-флешер (если только обновление прошивки явно не требует этого).

**Во время зарядки устройство нагревается.**

К сожалению, конструкция оборудования не оптимальна. Рекомендуется использовать как можно более слабый блок питания, способный выдавать максимум 1 А.

**Можно ли извлечь аккумулятор из устройства?**

Да, это возможно. Однако устройство нужно будет открыть с помощью термофена, так как передняя панель приклеена. Вам также понадобится [Понижающий преобразователь для припоя](https://github.com/Blueforcer/awtrix3/issues/67#issuecomment-1595418765), чтобы все заработало.

**Могу ли я сортировать приложения на устройстве по-другому?**

По умолчанию приложения отображаются в том же порядке, в котором они были настроены в настройках экземпляра. Просто перетащите приложения вверх или вниз, чтобы изменить их положение. Приложения с историческими данными/графиками располагаются позади других пользовательских приложений.

Если вы хотите определить свои собственные позиции, вы можете включить пользовательские позиции в опциях эксперта. Затем вы можете назначить числовую позицию для каждого приложения.

**Можно ли сохранить другой числовой формат?**

Все состояния типа number (common.type `number`) форматируются в соответствии с настройкой в ioBroker. Системный формат по умолчанию может быть переопределен с помощью экспертной настройки (начиная с версии адаптера 0.7.1). Числа могут быть представлены в следующих форматах:

- Системный стандарт
- `xx.xxx,xx`
- `xx,xxx.xx` (формат США)
- `xxxxx,xx`
- `xxxxx.xx` (формат США)

**Можно ли ограничить доступ к веб-интерфейсу awtrix-light?**

Да, начиная с версии прошивки 0.82, доступ можно защитить с помощью имени пользователя и пароля. Начиная с версии адаптера 0.8.0, эти учетные данные пользователя также можно хранить в настройках экземпляра.

**Как работает опция удержания уведомлений?**

При отправке уведомления с опцией `hold: true` текст остается на дисплее до тех пор, пока уведомление не будет подтверждено. Это можно сделать либо с помощью средней кнопки на устройстве, либо установив состояние `notification.dismiss` на `true`.

**Некоторые изменения состояния отображаются не сразу.**

Если состояние меняется очень часто (например, каждую секунду), некоторые изменения будут игнорироваться и не передаваться, чтобы поддерживать низкую нагрузку на устройство. Для этого каждое приложение имеет свое собственное «время блокировки», которое можно настроить глобально в настройках экземпляра. Время по умолчанию — 3 секунды. Установка значения меньше 3 не рекомендуется.

## Одинаковые приложения на нескольких устройствах
Если необходимо управлять несколькими устройствами awtrix-light с помощью одних и тех же приложений, **необходимо создать отдельный экземпляр для каждого устройства**. Однако в настройках экземпляра других устройств можно указать, что приложения следует брать из другого экземпляра.

Пример

1. Настройте все нужные приложения в экземпляре `awtrix-light.0`
2. Создайте еще один экземпляр для второго устройства (`awtrix-light.1`)
3. Выберите `awtrix-light.0` в настройках экземпляра `awtrix-light.1`, чтобы отобразить те же приложения на втором устройстве.

Начиная с версии 0.15.0 (и более поздних версий) видимость пользовательских приложений и всего содержимого экспертных приложений также переносится на другие устройства, которые копируют настройки приложения. Например, в приведенном выше примере приложения в экземпляре `awtrix-light.1` также скрываются, как только видимость приложения изменяется в основном экземпляре `awtrix-light.0`. То же самое относится ко всему содержимому экспертных приложений.

## Блочный и JavaScript
`sendTo` / messagebox можно использовать для

- отобразить одноразовое уведомление (с текстом, звуком, значком, ...)
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

Объект сообщения поддерживает все доступные в прошивке опции. Подробности см. в [документация](https://blueforcer.github.io/awtrix3/#/api?id=json-properties).

*Вы также можете использовать блок Blockly для создания уведомления (там предлагаются не все доступные варианты).*

### Звуки
**Звуковые файлы должны быть сохранены в формате RTTTL в папке MELODIES. Расширение файла для этих звуков — .txt. Расширение файла не должно быть включено при воспроизведении звуков!**

Чтобы воспроизвести (ранее созданный) звуковой файл `beispiel.txt`:

```javascript
sendTo('awtrix-light.0', 'sound', { sound: 'beispiel' }, (res) => {
    if (res && res.error) {
        console.error(res.error);
    }
});
```

Объект сообщения поддерживает все доступные в прошивке опции. Подробности см. в [документация](https://blueforcer.github.io/awtrix3/#/api?id=sound-playback).

*Для еще большего упрощения использования этого вызова можно использовать блок Blockly.*

Чтобы воспроизвести свой собственный рингтон:

```javascript
sendTo('awtrix-light.0', 'rtttl', 'Beep: d=32,o=7,b=120: a,P,c#', (res) => {
    if (res && res.error) {
        console.error(res.error);
    }
});
```

## Приложения
**Имена приложений могут содержать только строчные буквы (a-z) и должны быть уникальными. Никаких цифр, никаких специальных символов, никаких пробелов.**

Следующие имена приложений зарезервированы внутренними приложениями и не могут быть использованы: `Time`, `Date`, `Temperature`, `Humidity`, `Battery`.

- При активации каждого приложения его можно вывести на передний план.
- Эти состояния имеют роль `button` и допускают только логическое значение `true` (другие значения приводят к предупреждению в журнале)

Каждое пользовательское приложение имеет состояние с идентификатором `apps.<name>.visible`. Если это состояние установлено на `false` (false), приложение удаляется с устройства и больше не отображается. Это полезно для отображения определенных приложений только в течение дня или в определенные периоды.

### Пользовательские приложения
- `%s` — это заполнитель для значения состояния
- `%u` — это заполнитель для единицы измерения состояния (например, `°C`)

Эти заполнители можно использовать в текстах пользовательских приложений (например, `Außentemperatur: %s %u`).

**Пользовательские приложения отображают только подтвержденные значения! Значения управления с `ack: false` игнорируются (чтобы избежать дублирования запросов к устройству и гарантировать, что отображаемые значения являются действительными)!**

Выбранное состояние должно иметь тип данных String `string` или Number `number`. Другие типы (например, `boolean`) также поддерживаются, но будут генерировать предупреждения. Рекомендуется использовать псевдоним с функцией преобразования для замены логических значений текстом (например, `val ? 'an' : 'aus'` или `val ? 'offen' : 'geschlossen'`). Подробности см. в документации ioBroker. *Эта стандартная функция не имеет ничего общего с адаптером.*

Следующие комбинации приводят к появлению предупреждения в журнале:

- Пользовательское приложение с выбранным идентификатором объекта не содержит заполнитель `%s` в тексте
- Пользовательское приложение создано с выбранным идентификатором объекта без единицы измерения в `common.unit`, но `%u` включено в текст
- Идентификатор объекта не выбран, но `%s` используется в тексте

### Исторические приложения / Графики
ДЕЛАТЬ

**В графиках отображаются только подтвержденные значения. Контрольные значения с `ack: false` фильтруются и игнорируются!**

### Экспертные приложения
Экспертные приложения доступны с версии адаптера 0.10.0. Эти приложения позволяют вручную устанавливать все значения через состояния и управлять ими с помощью пользовательской логики. Чтобы создать новое экспертное приложение:

- Откройте вкладку «Параметры эксперта» в настройках экземпляра.
- Создайте новое экспертное приложение с произвольно выбираемым именем (например, `test`)
- Сохраните настройки экземпляра

После этого все контролируемые состояния приложения `test` создаются в `awtrix-light.0.apps.test`. Чтобы изменить соответствующие значения приложения, вы можете просто установить значение состояний `icon`, `text` и т. д., используя собственные скрипты (например, JavaScript или Blockly).

Пример: [Приложение «Погода»](weather-app.md)

#### Базовые объекты
*Требуется адаптер версии 2.0.0 (и новее)*

Базовый объект — это фундаментальное определение для приложения Awtrix, позволяющее устанавливать все существующие параметры. *Базовый объект расширяется всеми другими атрибутами экспертного приложения.*

Например, вы хотите использовать эффект радуги в экспертном приложении, но нет предопределенной точки данных для прямого использования этой функции. В этом случае атрибут может быть определен в базовом объекте (как JSON): `{ "rainbow": true }`.

Все доступные атрибуты см. в [документация](https://blueforcer.github.io/awtrix3/#/api?id=custom-apps-and-notifications).

## Скрыть собственные приложения
Чтобы скрыть приложения по умолчанию на устройстве (например, температура или влажность): используйте меню на самом устройстве! Подробности см. в [документация](https://blueforcer.github.io/awtrix3/#/onscreen).

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.0.0 (2025-05-02)

* (@klein0r) Added base object for expert apps to allow all options
* (@klein0r) Added responsive design for admin config

### 1.7.0 (2025-04-08)

* (@klein0r) Improved error handling when adapter is not ready (starting)
* (@klein0r) Added scroll speed to expert apps
* (@klein0r) Added icons for custom apps in object tree

### 1.6.0 (2025-01-27)

Updated recommended firmware version to 0.98

* (@klein0r) Updated dependencies

### 1.5.0 (2025-01-07)

Updated recommended firmware version to 0.97

* (@klein0r) Updated dependencies

### 1.4.1 (2024-11-20)

NodeJS >= 20.x and js-controller >= 6 is required

## License

MIT License

Copyright (c) 2025 Matthias Kleine <info@haus-automatisierung.com>

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