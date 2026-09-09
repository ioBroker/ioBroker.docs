---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.lgtv/README.md
title: ioBroker.lgtv
hash: +NZ+qyMFB0PQXAWHd8lTHH37wCVgh9MIBQLMEheilro=
---
![Логотип](../../../en/adapterref/iobroker.lgtv/admin/lgtv.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.lgtv.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.lgtv.svg)
![Количество установок](https://iobroker.live/badges/lgtv-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/lgtv-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.lgtv.png?downloads=true)

# IoBroker.lgtv
**Тесты:** ![Тестирование и выпуск](https://github.com/SebastianSchultz/ioBroker.lgtv/workflows/Test%20and%20Release/badge.svg)

Адаптер LG WebOS SmartTV для ioBroker

Дистанционное управление смарт-телевизором LG WebOS (модели 2013 года и выше) с помощью [ioBroker](https://www.iobroker.net).

---

## Использование:
Установите адаптер через административный интерфейс ioBroker.
В настройках адаптера введите IP-адрес вашего телевизора LG WebOS.
При первом подключении на экране телевизора появится запрос на сопряжение, в котором необходимо разрешить соединение.

### Опрос
Некоторые телевизоры отключаются от веб-сокета при выключении и некорректно передают эту информацию адаптеру. В этом случае требуется дополнительный опрос. Время опроса можно задать в настройках. Если значение пустое, адаптер пытается определить это автоматически: при перезагрузке адаптера опрос (каждые 60 секунд) активен до тех пор, пока не будет обнаружено первое корректное событие выключения телевизора.

## Несколько примеров:
`setState('lgtv.0.states.popup', 'Some text!');`

В результате на экране телевизора появится всплывающее окно с текстом "Некоторый текст!".
В тексте можно использовать переносы строк HTML (br).

`setState('lgtv.0.states.turnOff', true);`

Выключаю телевизор.

`setState('lgtv.0.states.mute', true);`

Выключите звук на телевизоре.

`setState('lgtv.0.states.mute', false);`

Включите звук на телевизоре.

`setState('lgtv.0.states.volumeUp', true);`

Это увеличит громкость телевизора.

`setState('lgtv.0.states.volumeDown', true);`

Уменьшите громкость телевизора.

`setState('lgtv.0.states.channelUp', true);`

Увеличение количества текущих телеканалов.

`setState('lgtv.0.states.channelDown', true);`

Сокращение количества текущих телеканалов.

`setState('lgtv.0.states.3Dmode', true);`

Активирует 3D-режим на телевизоре.

`setState('lgtv.0.states.3Dmode', false);`

Отключает 3D-режим на телевизоре.

`setState('lgtv.0.states.channel', 7);`

Переключение прямого эфира на канал номер 7.

`setState('lgtv.0.states.launch', 'livetv');`

Переключение в режим просмотра телепередач в прямом эфире.

`setState('lgtv.0.states.launch', 'smartshare');`

Открытие приложения SmartShare на телевизоре.

`setState('lgtv.0.states.launch', 'tvuserguide');`

Запускает приложение «Руководство пользователя телевизора» на телевизоре.

`setState('lgtv.0.states.launch', 'netflix');`

Открытие приложения Netflix на телевизоре.

`setState('lgtv.0.states.launch', 'youtube');`

Открывает приложение YouTube на телевизоре.

`setState('lgtv.0.states.launch', 'prime');`

Открывает приложение Amazon Prime на телевизоре.

`setState('lgtv.0.states.launch', 'amazon');`

На некоторых телевизорах эта команда открывает приложение Amazon Prime.

`setState('lgtv.0.states.openURL', 'http://www.iobroker.net');`

Открывает веб-браузер на телевизоре и переходит на сайт www.iobroker.net.
Также может использоваться для открытия изображений или видео (в браузере).

`setState('lgtv.0.states.input', 'av1');`

Переключает вход на телевизоре на AV1.

`setState('lgtv.0.states.input', 'scart');`

Переключает вход телевизора на Scart.

`setState('lgtv.0.states.input', 'component');`

Переключает вход телевизора на компонентный.

`setState('lgtv.0.states.input', 'hdmi1');`

Переключает вход телевизора на HDMI 1.

`setState('lgtv.0.states.input', 'hdmi2');`

Переключает вход телевизора на HDMI 2.

`setState('lgtv.0.states.input', 'hdmi3');`

Переключает вход телевизора на HDMI 3.

`setState('lgtv.0.states.youtube', 'https://www.youtube.com/watch?v=AjSpMQfRmEo'); OR setState('lgtv.0.states.youtube', 'AjSpMQfRmEo');`

Воспроизвести видео на YouTube.

`setState('lgtv.0.states.raw', '{"url": "ssap://system.launcher/launch", "cmd": "{id: 'netflix'}" }');` `setState('lgtv.0.states.raw', '{"url": "ssap://api/getServiceList", "cmd": ""}');`

Отправка и получение RAW-команд через API.

`setState('lgtv.0.remote.*KEY*', true);`

Отправьте кнопку дистанционного управления на телевизор.

`setState('lgtv.0.states.power', true/false);`

Выключите телевизор и включите его (включите, работает только по локальной сети, с использованием WOL).

`setState('lgtv.0.states.soundOutput', 'external_arc');`

Переключение аудиовыхода через ARC (HDMI).

---

## Штаты
`channel`

содержит текущий канал

`volume`

отображает текущий уровень громкости и может изменять громкость.

`on`

Значение истинно, когда телевизор включен, и ложно, если телевизор выключен. Значение соответствует состоянию питания, которое сообщает сам телевизор (`states.powerState`): `on`, `screen_off` и `screen_saver` считаются включенными, `standby` (режим быстрого запуска, в котором телевизор некоторое время поддерживает сетевое соединение открытым) и `off` считаются выключенными. Телевизоры без этой конечной точки (webOS 3 и более старые версии) считаются включенными, пока они сообщают о наличии приложения на переднем плане.

`powerState`

Состояние питания, сообщаемое телевизором, сопоставляется с `on`, `screen_off`, `screen_saver`, `standby` или `off` (сам телевизор сообщает `Active`, `Screen Off`, `Screen Saver`, `Active Standby` и `Suspend`/`Power Off`)

---

## Виджет дистанционного управления для `ioBroker.devices`
В комплект адаптера входит виджет **Управление ТВ** для адаптера `devices`. Добавьте его туда через *Добавить виджет → Управление ТВ*, выберите экземпляр lgtv, и виджет будет напрямую управлять состояниями `remote.*` этого экземпляра. В строке состояния отображается текущая громкость, состояние отключения звука и запущенное приложение; точка в углу соответствует состоянию `states.on`.

Кнопка питания соответствует `remote.power`: она отправляет сигнал нажатия кнопки POWER, когда телевизор включен, и пакет Wake-on-LAN, когда он выключен.

| Компактный (1x1) | Широкий (2x0,5) | Полноценный пульт дистанционного управления (2x1 / 2x2) |
|--------------------------------------------|--------------------------------------|---------------------------------------------|
| ![[Компактная компоновка](docs/widget-compact.png) | ![Широкая компоновка](docs/widget-wide.png) | ![Полная удаленная компоновка]](../../../en/adapterref/iobroker.lgtv/docs/widget-full.png) |

Клавиши переключения каналов, медиа-клавиши, цветовые клавиши и цифровая клавиатура могут быть отключены в настройках виджета.

## Удаленное управление в административной панели
В настройках экземпляра есть две вкладки. **Настройки** содержат конфигурацию; **Пульт дистанционного управления** - это полноценный пульт для телевизора, поэтому им можно управлять непосредственно из административной панели без скрипта или представления `devices`.

Он записывает те же состояния `remote.*`, что и виджет выше, и отображает состояние питания телевизора, запущенное приложение, текущий вход и громкость, которую также можно перетаскивать. Клавиши действуют немедленно - это запись состояния, а не настроек, поэтому кнопка *Сохранить* в диалоговом окне к ним не имеет никакого отношения.

Экземпляр должен быть запущен: когда он остановлен, клавиши отключены, и об этом сообщается на вкладке.

---
---

## Установка
Установите этот адаптер, используя репозитории ioBroker.

>[!NOTE] > Этот адаптер не поддерживает установку из GitHub.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 3.0.4 (2026-09-07)
- (GermanBluefox) The instance settings have a second tab with a remote control, so the TV can be operated directly from the admin
- (krobipd) `states.scroll` and `states.drag` no longer ignore a movement whose horizontal or vertical part is zero, so plain vertical scrolling (`0,5`) works
- (krobipd) The configuration dialog is fully translated in all eleven languages; the minimum-value hints no longer show up as untranslated raw text
- (krobipd) The adapter no longer creates files in the home directory of the ioBroker user; the client key, the MAC cache and the certificate file all stay in the adapter's data directory
- (krobipd) Two volume changes in quick succession no longer fight over the TV, and an unreadable volume from the TV no longer disables the stepped volume ramp
- (krobipd) Stopping the adapter while the TV was connected no longer logs "setTimeout called, but adapter is shutting down"
- (krobipd) A stopped or crashed instance no longer keeps reporting `info.connection` as connected
- (krobipd) The TV is no longer reported as switched off while it is actually running
- (krobipd) The new state `states.powerState` shows the power state the TV reports itself
- (krobipd) Switching the TV off and on repeatedly no longer piles up connection checks

### 3.0.3 (2026-09-05)
- (GermanBluefox) The WebOS 26 pairing fallback now also asks for the pointer permissions, so the remote buttons, pointer moves, scrolling and clicks work after a fresh pairing
- (GermanBluefox) Older TVs get the signed pairing manifest again; the unsigned manifest is only used after the TV rejected the signed one (ported from lgtv2 2.0.1)
- (GermanBluefox) Adopted the upstream `lgtv2` test suite for the vendored transport

### 3.0.2 (2026-09-05)
- (GermanBluefox) The `lgtv2` library was ported to TypeScript and is now built into the adapter, so the ESM-only npm package is no longer required

### 3.0.1 (2026-09-04)
- (GermanBluefox) Removed a prepare script

### 3.0.0 (2026-09-04)
- (Voodoo2man) Add WebOS 26 compatibility.
- (Voodoo2man) Use the configured MAC address as a fallback for Wake-on-LAN.
- (GermanBluefox) A malformed MAC address or a Wake-on-LAN socket error does not terminate the adapter anymore
- (GermanBluefox) The MAC address is validated in the admin configuration
- (GermanBluefox) Added the missing default value for the `wolwithip` setting
- (GermanBluefox) `remote.power` switches the TV off again instead of only sending Wake-on-LAN
- (GermanBluefox) Migrated the connection options from the deprecated `wsconfig` block to the lgtv2 v2 option names
- (GermanBluefox) Removed the process wide TLS bypass, the certificate check is now relaxed per connection only
- (GermanBluefox) Removed the unused `websocket` dependency
- (GermanBluefox) The adapter was refactored to TypeScript. The sources moved to `src/`, the published code is the compiled `build/`
- (GermanBluefox) The admin translations moved from `admin/i18n/<lang>/translations.json` to the flat `admin/i18n/<lang>.json`
- (GermanBluefox) The unit tests use `node:assert` instead of `chai`
- (GermanBluefox) Added a "Control TV" remote-control widget for the `ioBroker.devices` adapter

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2024-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2023 Sebastian Schultz.

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