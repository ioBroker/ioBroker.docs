---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.awtrix-light?style=flat-square
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.awtrix-light?label=npm%20downloads&style=flat-square
BADGE-Snyk Vulnerabilities for npm package: https://img.shields.io/snyk/vulnerabilities/npm/iobroker.awtrix-light?label=npm%20vulnerabilities&style=flat-square
BADGE-node-lts: https://img.shields.io/node/v-lts/iobroker.awtrix-light?style=flat-square
BADGE-Libraries.io dependency status for latest release: https://img.shields.io/librariesio/release/npm/iobroker.awtrix-light?label=npm%20dependencies&style=flat-square
BADGE-GitHub: https://img.shields.io/github/license/klein0r/iobroker.awtrix-light?style=flat-square
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/klein0r/iobroker.awtrix-light?logo=github&style=flat-square
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/klein0r/iobroker.awtrix-light?logo=github&style=flat-square
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/klein0r/iobroker.awtrix-light?logo=github&style=flat-square
BADGE-GitHub issues: https://img.shields.io/github/issues/klein0r/iobroker.awtrix-light?logo=github&style=flat-square
BADGE-GitHub Workflow Status: https://img.shields.io/github/actions/workflow/status/klein0r/iobroker.awtrix-light/test-and-release.yml?branch=master&logo=github&style=flat-square
BADGE-Snyk Vulnerabilities for GitHub Repo: https://img.shields.io/snyk/vulnerabilities/github/klein0r/iobroker.awtrix-light?label=repo%20vulnerabilities&logo=github&style=flat-square
BADGE-Beta: https://img.shields.io/npm/v/iobroker.awtrix-light.svg?color=red&label=beta
BADGE-Stable: http://iobroker.live/badges/awtrix-light-stable.svg
BADGE-Installed: http://iobroker.live/badges/awtrix-light-installed.svg
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.awtrix-light/README.md
title: ioBroker.awtrix-light
hash: 5C1Z+MP29CrscOkXs4nzVIvudBHKKvF/95auMm9hAgI=
---
![логотип](../../../de/admin/awtrix-light.png)

# IoBroker.awtrix-light
## Требования
- nodejs 14.5 (или новее)
- js-контроллер 4.0.15 (или новее)
- Адаптер администратора 6.0.0 (или новее)
- Устройство _Awtrix Light_ с версией прошивки _0.84_ (или новее) - например, Ulanzi TC001

Купить здесь: [Aliexpress.com](https://haus-auto.com/p/ali/UlanziTC001) или здесь: [ulanzi.de](https://haus-auto.com/p/ula/UlanziTC001) (партнерские ссылки)

## Первые шаги
1. Прошейте прошивку на устройство и добавьте его в локальную сеть через WiFi - см. [Документацию](https://blueforcer.github.io/awtrix-light/#/quickstart)
2. Установите адаптер awtrix-light в ioBroker (и создайте новый экземпляр)
3. Откройте конфигурацию экземпляра и сохраните IP-адрес устройства в локальной сети.

## FAQ (часто задаваемые вопросы)
**Могу ли я использовать адаптер для отключения приложений по умолчанию (например, уровня заряда батареи или данных датчиков)?**

Нет, эта функция удалена из прошивки awtrix-light. Используйте меню на самом устройстве, чтобы навсегда скрыть эти приложения.

**Можно ли заменить логические значения (истина/ложь) другим текстом?**

Для этого просто создайте псевдоним в `alias.0` типа `string` (строка) и преобразуйте логическое значение в любое другое значение (например, `val ? 'offen' : 'geschlossen'`) с помощью функции чтения. *Это стандартная функция ioBroker и не имеет прямого отношения к этому адаптеру.*

**Как мне перейти на последнюю версию прошивки?**

Просто используйте [Меню на устройстве](https://blueforcer.github.io/awtrix-light/#/onscreen), чтобы перейти к точке `update`. Дальше часы сделают все остальное сами, нет необходимости повторно использовать веб-прошивальщик (если только обновление прошивки явно не требует этого).

**Во время зарядки устройство нагревается.**

К сожалению, аппаратная конструкция не оптимальна. Рекомендуется использовать как можно более слабый блок питания, способный выдавать ток не более 1 А.

**Можно ли вынуть аккумулятор из устройства?**

Да, есть такой вариант. Однако открывать устройство приходится с помощью термофена, поскольку передняя панель приклеена. Вам также понадобится [Припой понижающий преобразователь](https://github.com/Blueforcer/awtrix-light/issues/67#issuecomment-1595418765), чтобы все работало.

**Можно ли по-другому отсортировать приложения на устройстве?**

По умолчанию приложения отображаются в том же порядке, в котором они были созданы в настройках экземпляра. Просто переместите приложения вверх или вниз, чтобы изменить положение. Приложения с историческими данными/графиками располагаются позади других пользовательских приложений.

Если вы хотите определить свои собственные позиции, пользовательские позиции можно активировать в экспертных настройках. Затем можно назначить числовую позицию для каждого приложения.

**Можно ли сохранить другой числовой формат?**

Все состояния номера типа (common.type `number`) форматируются так, как настроено в ioBroker. Стандартный формат системы можно перезаписать экспертной настройкой (начиная с версии адаптера 0.7.1). Числа могут быть представлены в следующих форматах:

- Системные установки по умолчанию
- `хх.ххх,хх`
- `xx,xxx.xx` (формат США)
- `ххххх,хх`
- `xxxxx.xx` (формат США)

**Можете ли вы ограничить доступ к веб-интерфейсу awtrix-light?**

Да, начиная с версии прошивки 0.82 доступ может быть защищен именем пользователя и паролем. Начиная с версии адаптера 0.8.0, эти пользовательские данные также можно хранить в настройках экземпляра.

## Идентичные приложения на нескольких устройствах
Если необходимо управлять несколькими устройствами awtrix-light с помощью одних и тех же приложений, для каждого устройства необходимо создать отдельный экземпляр. Однако затем в настройках экземпляра других устройств можно указать, что приложения должны быть перенесены из другого экземпляра.

Пример

1. Настройте все нужные приложения в экземпляре awtrix-light.0.
2. Создайте еще один экземпляр для второго устройства (awtrix-light.1).
3. Выберите «awtrix-light.0» в настройках экземпляра «awtrix-light.1», чтобы отобразить те же приложения на втором устройстве.

## Блокли и JavaScript
`sendTo` / ящик сообщений можно использовать для

- отображать одноразовое уведомление (с текстом, звуком, символом, ...)
- воспроизвести звук

### Уведомления
Отправьте одноразовое уведомление на устройство:

```javascript
sendTo('awtrix-light', 'notification', { text: 'haus-automatisierung.com', repeat: 1, stack: true, wakeup: true }, (res) => {
    if (res && res.error) {
        console.error(res.error);
    }
});
```

Объект сообщения поддерживает все опции, доступные в прошивке. Подробности см. в [документация](https://blueforcer.github.io/awtrix-light/#/api?id=json-properties).

*Для создания уведомления также можно использовать блок Blockly (там предлагаются не все доступные варианты).*

### Тоны
Чтобы воспроизвести (ранее созданный) звуковой файл:

```javascript
sendTo('awtrix-light', 'sound', { sound: 'beispiel' }, (res) => {
    if (res && res.error) {
        console.error(res.error);
    }
});
```

Объект сообщения поддерживает все параметры, доступные во встроенном ПО. Подробности см. в [документация](https://blueforcer.github.io/awtrix-light/#/api?id=sound-playback).

*Блок Blockly можно использовать, чтобы сделать этот вызов еще проще.*

## Пользовательские приложения
**Имена приложений могут содержать только строчные буквы (a–z) и должны быть уникальными. Никаких цифр, специальных символов и пробелов.**

Следующие имена приложений зарезервированы внутренними приложениями и не могут быть использованы: `time`, `date`, `temp`, `hum`, `bat`.

- `%s` является заполнителем для значения состояния.
- `%u` — это заполнитель для единицы измерения состояния (например, `°C`)

Эти заполнители можно использовать в текстах пользовательских приложений (например, `Außentemperatur: %s %u`).

**Пользовательские приложения отображают только подтвержденные значения! Управляющие значения с `ack: false` игнорируются (во избежание дублирования запросов к устройству и для обеспечения корректности отображаемых значений)!**

Выбранное состояние должно иметь тип данных `string` или номер `number`. Другие типы (например, `boolean`) также поддерживаются, но генерируют предупреждения. Рекомендуется использовать псевдоним с функцией преобразования для замены логических значений текстом (например, `val ? 'an' : 'aus'` или `val ? 'offen' : 'geschlossen'`). Подробности смотрите в документации ioBroker. *Эта стандартная функция не имеет никакого отношения к адаптеру.*

Следующие комбинации приводят к появлению предупреждения в журнале:

- Пользовательское приложение с выбранным идентификатором объекта не содержит заполнителя `%s` в тексте.
- Пользовательское приложение создается с выбранным идентификатором объекта без модуля в `common.unit`, но `%u` включен в тело.
- Идентификатор объекта не выбран, но в тексте используется `%s`

## Исторические приложения/графики
**Имена приложений могут содержать только строчные буквы (a–z) и должны быть уникальными. Никаких цифр, специальных символов и пробелов.**

Следующие имена приложений зарезервированы внутренними приложениями и не могут быть использованы: `time`, `date`, `temp`, `hum`, `bat`.

**На графиках показаны только подтвержденные значения. Значения налогов с `ack: false` фильтруются и игнорируются!**

## Состояния приложения
- В состоянии «активировать» каждое приложение его можно вывести на передний план.
- Эти состояния имеют роль «кнопка» и допускают только логическое значение «истина» (другие значения приводят к предупреждению в журнале)

## Скрыть пользовательские приложения
Каждое самостоятельно созданное приложение имеет статус с идентификатором `apps.<name>.visible`. Если для этого состояния установлено значение `false` (ложь), приложение будет удалено с устройства и больше не будет отображаться. Это полезно, например, для отображения определенных приложений только в течение дня или в определенные периоды времени.

## Скрыть родные приложения
Чтобы скрыть на устройстве приложения по умолчанию (например, температуру или влажность): используйте меню на самом устройстве! Подробности см. в [документация](https://blueforcer.github.io/awtrix-light/#/onscreen).

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**

Updated recommended firmware version to 0.84

* (klein0r) Added expert apps

### 0.8.0 (2023-09-04)

Updated recommended firmware version to 0.83

* (klein0r) Allow to set custom app positions (expert options)
* (klein0r) Unsubscribe from all states if device is not reachable
* (klein0r) Added options basic auth
* (klein0r) Get background effects via API
* (klein0r) Fixed 0 decimals setting
* (klein0r) Changed log level of some messages
* (klein0r) Added states for transitions

### 0.7.1 (2023-08-09)

* (klein0r) Added option for number format

### 0.7.0 (2023-08-03)

Updated recommended firmware version to 0.72

* (klein0r) Added MovingLine effect
* (klein0r) Added settings for time style and transition effect
* (klein0r) Setting repeat to 1 in blockly notifications

### 0.6.2 (2023-07-30)

* (klein0r) Fixed handling of state cache when object has been changed

### 0.6.1 (2023-07-28)

* (klein0r) Remove background effect in threshold overrides
* (klein0r) Minor fixes in admin config
* (klein0r) Fixed missing icon in history apps

## License
MIT License

Copyright (c) 2023 Matthias Kleine <info@haus-automatisierung.com>

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