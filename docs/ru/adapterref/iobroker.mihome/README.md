---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mihome/README.md
title: mihome Gateway
hash: VQpv9I7wuuzK9GjB3Iss7RQqQwkZm/KkqUN7e3oNqD4=
---
![Логотип](../../../en/adapterref/iobroker.mihome/admin/mihome.png)

![Количество установок](http://iobroker.live/badges/mihome-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.mihome.svg)
![Тестирование и выпуск](https://github.com/ioBroker/ioBroker.mihome/workflows/Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/mihome/svg-badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.mihome.svg)

# mihome Gateway

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также сведения о том, как отключить отправку сообщений об ошибках, см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

С помощью адаптера Mi Home в систему ioBroker интегрируется Mi Control Hub (шлюз), обеспечивающий связь различных датчиков, выключателей и т. д. Xiaomi с ioBroker. Например, освещением и колонкой шлюза можно управлять через ioBroker.

## Требования

- Приложение Mi Home на устройстве Android или iOS с активированной функцией локальной сети.
- Подключенный шлюз Mi Home
- Готовая к использованию система ioBroker

### Установка приложения Mi Home и активация функции локальной сети.

Сначала необходимо включить функцию локальной сети, поскольку адаптер взаимодействует со шлюзом только по локальной сети.

#### Android

- Загрузите [приложение для Android](https://play.google.com/store/apps/details?id=com.xiaomi.smarthome) на ваше устройство Android, установите его, откройте и примите условия использования.
- Выбирать`Mainland China` как страна (в рамках`settings -> Locale` ) — на момент написания этого текста, похоже, это необходимо. Язык по-прежнему можно установить на английский.
- Создайте учетную запись через _Войти_
- После успешной регистрации добавьте устройство через`+`
- В разделе _«Безопасность домохозяйства»_ выберите`MI Control Hub` и следуйте инструкциям.
- После успешной интеграции шлюза нажмите на три точки в правом верхнем углу экрана, а затем _выберите «О программе»._
- Нажмите 10 раз на текст _«Версия плагина»_ внизу экрана (в более старых версиях приложения: номер версии). Это включит режим разработчика, и через некоторое время появятся 2 дополнительных пункта меню. \[Если это не поможет, повторите все шаги!]
- Выберите пункт меню`Wireless communication protocol` (первая новая запись в более старых версиях приложения)
- Включите ползунковый переключатель вверху, запишите пароль (`29p9i40jeypwck38` (на скриншоте) и подтвердите с`OK` (справа от кнопки «Отмена»), чтобы сохранить изменения.

> Пароль потребуется позже, во время настройки адаптера ioBroker. Если вы что-то измените здесь, будет сгенерирован новый пароль, а старый будет утерян!

![андроид](../../../en/adapterref/iobroker.mihome/img/mihome-settings.png)

Теперь с помощью этого инструмента можно обучать работе с дополнительными устройствами.`+` символ.

#### iOS

- Загрузите [приложение для iOS](https://itunes.apple.com/de/app/mi-home-xiaomi-smarthome/id957323480?mt=8) на устройство iOS, установите его, откройте и примите условия политики конфиденциальности.
- Выберите страну _«Материковый Китай»_ в разделе «Профиль/Настройки/Настройки страны» — это необходимо на данный момент. Язык по-прежнему можно установить на английский.
- Создайте учетную запись через _Войти_
- После успешной регистрации добавьте устройство через`+`
- В разделе _«Безопасность домохозяйства»_ выберите`MI Control Hub` и следуйте инструкциям.
- После успешной интеграции шлюза нажмите на три точки в правом верхнем углу экрана, а затем _выберите «О программе»._
- Нажмите несколько раз на пустое место под меню _«Учебное пособие»_ . Это включит режим разработчика, и через некоторое время появятся дополнительные пункты меню (на китайском языке в старых версиях приложения). \[Если это не сработает сразу, повторите шаги!]
- Выберите 4-й пункт меню (второй новый пункт в более старых версиях приложения).
- Включите ползунковый переключатель вверху, запишите пароль и подтвердите его.`OK` (справа от кнопки «Отмена»), чтобы сохранить изменения.

> Пароль потребуется позже, во время настройки адаптера ioBroker. Если вы что-то измените здесь, будет сгенерирован новый пароль, а старый будет утерян!

Теперь с помощью этого инструмента можно обучать работе с дополнительными устройствами.`+` символ.

### Настройки роутера

В разделе «О программе/Информация о хабе» IP-адрес, используемый шлюзом, можно определить по тексту после _localip_ . Этот IP-адрес должен быть постоянно назначен шлюзу в используемом маршрутизаторе. Если вы больше не хотите управлять подключенными устройствами через приложение, вы также можете отключить доступ шлюза в интернет в маршрутизаторе после того, как все устройства будут подключены.

### Используя партнера

Адаптер версии 1.3.xx или выше позволяет управлять кондиционером, подключенным к ioBroker, с помощью acpartner.v3 (KTBL11LM) (вероятно, он будет работать и с версией v2, но у разработчика не было оборудования для тестирования, если кто-то попробует, сообщите нам).

Для управления кондиционером добавлены следующие состояния:![состояния переменного тока](../../../en/adapterref/iobroker.mihome/img/Air-Conditioning-Controller.png)

Процесс включения доступа к локальной сети и получения ключа шлюза может быть несколько сложным, он описан ниже.

Для начала использования:

- Установите приложение Aqara Home на свой смартфон ( <https://play.google.com/store/apps/details?id=com.lumiunited.aqarahome> ).
- зарегистрируйтесь в приложении Aqara Home.
- В настройках выберите регион «Материковый Китай».
- добавить партнера в приложение Aqara Home.
- Обновите прошивку acpartner (нажмите на значок кондиционера, затем на три точки в правом верхнем углу, затем нажмите на самую нижнюю точку «Версия программного обеспечения»), в результате на acpartner будет установлена прошивка Aqara (при использовании приложения MiHome она была от Xiaomi).
- Зарегистрируйтесь на сайте <https://opencloud.aqara.cn/> с тем же паролем и логином, что и в приложении Aqara Home (подтверждение регистрации может занять некоторое время, у меня это заняло около 6 часов).
- Войдите в консоль по адресу <https://opencloud.aqara.cn/console/>
- Создайте приложение на вкладке <https://opencloud.aqara.cn/console/app-management> с типом "Доступ к устройству" (я не уверен в необходимости этого пункта (поскольку я его еще не добавил), поэтому можете попробовать его пропустить).
- Затем перейдите в консоль <https://opencloud.aqara.cn/console> и выберите Gateway LAN слева, заполните поля «Учетная запись Aqara» и «Пароль» и нажмите кнопку «Отправить» — вы увидите свой контроллер кондиционирования воздуха и кнопку включения сетевого протокола, нажав на которую вы разрешите доступ к локальной сети, а также сетевой ключ, необходимый для настройки адаптера в ioBroker.
- В настройках адаптера введите полученный выше ключ.![ключ шлюза](../../../en/adapterref/iobroker.mihome/img/Gateway-LAN.png)

## Установка адаптера ioBroker Mi Home

Дополнительные настройки выполняются только через административный интерфейс ioBroker. Найдите адаптер в разделе _«Адаптеры»_ и установите его, используя...`+` символ.

![адаптер](../../../en/adapterref/iobroker.mihome/img/Adapter.png)

После этого откроется следующее окно настроек:

![конфигурация адаптера](../../../en/adapterref/iobroker.mihome/img/Adapterconfig1.PNG)

Введите указанный выше пароль в следующем поле:`Default Gateway Key` и закройте окно, нажав _«Сохранить и закрыть»_ . После этого в _разделе «Экземпляры»_ должен отобразиться работающий адаптер зеленым цветом:

![пример](../../../en/adapterref/iobroker.mihome/img/Instanz.PNG)

Теперь шлюз и подключенные к нему устройства отображаются в разделе _«Объекты»_ :

![объекты](../../../en/adapterref/iobroker.mihome/img/Objekte.PNG)

Данное руководство подготовлено, исходя из наших наилучших знаний и убеждений.

## Использование

Для срабатывания можно использовать маленькую кнопку на датчике температуры.`double Press` Событие. Просто нажмите дважды в течение 5 секунд. Вы можете установить этот интервал в настройках, но не устанавливайте его более чем на 10 секунд.

### Добавить устройство по SID

В случае, если устройство не распознается по названию модели, можно попробовать добавить устройство, используя SID. В настоящее время это применимо к **двухканальному модулю управления реле Aqara** , у которого отсутствует название модели из-за проблем в прошивке шлюза.

Чтобы добавить устройство по SID, откройте`DEVICE SID` В настройках адаптера перейдите на вкладку SID и укажите имя устройства из списка поддерживаемых устройств ниже.

Для релейного модуля Aqara это следует указывать следующим образом:![сбоку](../../../en/adapterref/iobroker.mihome/img/device-sid-settings.png)

### Поддерживаемые устройства

Приведенный ниже список не является исчерпывающим:

- `gateway` - Xiaomi RGB Gateway
- `acpartner.v3` - Партнер Aqara AC (KTBL11LM)
- `sensor_ht` - Датчик температуры/влажности Xiaomi
- `weather.v1` - Датчики температуры/влажности/давления Xiaomi
- `switch` - Беспроводной переключатель Xiaomi
- `sensor_switch.aq2` - Беспроводной датчик-переключатель Xiaomi Aqara
- `sensor_switch.aq3` - Беспроводной датчик-переключатель Xiaomi Aqara
- `plug` - Умная розетка Xiaomi
- `86plug` - Умная сетевая розетка Xiaomi
- `86sw2` - Беспроводной настенный выключатель Xiaomi
- `86sw1` - Беспроводной настенный выключатель Xiaomi
- `natgas` - Газовый детектор Xiaomi Mijia Honeywell
- `smoke` - Детектор пожарной сигнализации Xiaomi Mijia Honeywell
- `ctrl_ln1` - Xiaomi Aqara 86 Fire Wall Switch One Button
- `ctrl_ln1.aq1` - Настенный выключатель Xiaomi Aqara LN
- `ctrl_ln2` - Настенный выключатель Xiaomi 86-zero-fire с двумя кнопками
- `ctrl_ln2.aq1` - Настенный выключатель Xiaomi Aqara LN с двойной кнопкой
- `ctrl_neutral2` - Проводной настенный выключатель Xiaomi
- `ctrl_neutral1` - Проводной настенный выключатель Xiaomi
- `cube` - Кубик Xiaomi
- `sensor_cube.aqgl01` - Кубик Xiaomi
- `magnet` - Датчик двери Xiaomi
- `sensor_magnet.aq2` - Датчик открытия двери Xiaomi Aqara
- `curtain` - Умные шторы Xiaomi Aqara
- `motion` - Датчик движения Xiaomi
- `sensor_motion.aq2` - Датчик движения Xiaomi Aqara
- `sensor_wleak.aq1` - Датчик воды Xiaomi Aqara
- `ctrl_ln2.aq1` - Настенный выключатель Xiaomi Aqara LN (двойной)
- `remote.b186acn01` - Беспроводной дистанционный выключатель Xiaomi Aqara
- `remote.b186acn02` - Беспроводной дистанционный выключатель Xiaomi Aqara
- `remote.b286acn01` - Беспроводной пульт дистанционного управления Xiaomi Aqara (двойной переключатель)
- `remote.b286acn02` - Беспроводной пульт дистанционного управления Xiaomi Aqara (двойной переключатель)
- `remote.b1acn01` - Беспроводной дистанционный выключатель Xiaomi Aqara
- `vibration` - Датчик вибрации Xiaomi
- `wleak1` - Датчик воды Xiaomi Aqara
- `lock_aq1` - Блокировка Xiaomi
- `relay.c2acn01` - Модуль управления реле Aqara с 2 каналами ( **с использованием номера SID** )

<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->

## Changelog
### 2.0.0 (2026-09-10)
* (bluefox) The adapter was refactored to TypeScript and the configuration was migrated to JsonConfig
* (bluefox) __Breaking:__ Node.js >= 22, js-controller >= 6.0.11 and admin >= 7 are required now
* (bluefox) The reports of the curtain are no longer written into a `state` object that does not exist
* (bluefox) Fixed the `open`, `close` and `stop` states of the curtain: the reported status was never evaluated

### 1.4.0 (2022-03-10)
* (drtsb) Added two new aqara devices and some missing icons
* (VLGorskij) fixed the error messages for some states
* (Apollon77) Catch some errors reported by Sentry and users

### 1.3.7 (2021-01-22)
* (Apollon77) Prevent a crash case (Sentry IOBROKER-MIHOME-A)

### 1.3.6 (2020-09-25)
* (VLGorskij) Added new device QBKG24LM

### 1.3.5 (2020-09-17)
* (Apollon77) Fix crash cases (Sentry IOBROKER-MIHOME-1..4)

[Older changelogs can be found there](https://github.com/ioBroker/ioBroker.mihome/blob/master/CHANGELOG_OLD.md)

## License
The MIT License (MIT)

Copyright (c) 2017-2026 bluefox <dogafox@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.