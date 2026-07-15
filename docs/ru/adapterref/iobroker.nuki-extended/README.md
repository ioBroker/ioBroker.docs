---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.nuki-extended/README.md
title: ioBroker.nuki-extended
hash: qm3x59QZ0BDz3x0aPeUn0+ZcgB2UOqcgecgKvyJcrNU=
---
![Логотип](../../../en/adapterref/iobroker.nuki-extended/admin/nuki-extended.png)

![Количество установок](http://iobroker.live/badges/nuki-extended-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.nuki-extended.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.nuki-extended.svg)

# IoBroker.nuki-extended Этот адаптер ioBroker (ранее ioBroker.Nuki2) позволяет управлять и отслеживать [Nuki Smart Lock](https://nuki.io/de/smart-lock/) и/или [Nuki Opener](https://nuki.io/de/opener/) с использованием как [Nuki Bridge API (v1.9.0, 06.05.2019)](https://developer.nuki.io/page/nuki-bridge-http-api-170/4/#heading--introduction), так и [Nuki Web API (v1.2.0, 31.05.2019)](https://developer.nuki.io/page/nuki-web-api-111/3/).
![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.nuki-extended/workflows/Test%20and%20Release/badge.svg) [![[Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/nuki-extended/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Для получения более подробной информации и сведений о том, как отключить отправку сообщений об ошибках, см. [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отправка сообщений Sentry используется начиная с js-controller 3.0.

**Оглавление**

1. [Особенности](#features)
2. [Установка](#installation)
   1. [Nuki Bridge API](#nuki-bridge-api)
   2. [Nuki Web API](#nuki-web-api)
3. [Каналы и государства](#каналы--государства)
4. [Интеграция «Умный дом» / Alexa с использованием ioBroker.javascript](#smart-home--alexa-integration-using-iobrokerjavascript)
1. [Закройте дверь в 22:00](#закройте-дверь-в-22:00-вечером)
2. [Пусть Alexa сообщит вам об изменениях в блокировке](#let-alexa-inform-you-about-lock-changes)
3. [Пусть Telegram информирует вас об изменениях в блокировке](#let-telegram-inform-you-about-lock-changes)
4. [Пусть Alexa и Telegram сообщат вам о звонке через Opener](#let-telegram-and-alexa-inform-you-about-somebody-ringing-via-opener)
5. [Список изменений](#changelog)
6. [Credits](#credits)
7. [Лицензия](#лицензия)

## Функции
- Поддержка Nuki Smartlock и Nuki Opener
- Поддержка как Nuki Bridge API, так и Nuki Web API.
- ~~Поддержка хешированного токена на аппаратных мостах (см. https://developer.nuki.io/page/nuki-bridge-http-api-190/4#heading--token)~~
- В случае сбоя действий, выполняемых через API Nuki Bridge, например, из-за ошибки моста 503 (см. https://developer.nuki.io/t/random-http-503-unavailable/909/85?u=zefau), используется резервный вариант с Nuki Web API.
— Повторная попытка в случае сбоя действий, выполненных через API Nuki Bridge (если не используется Nuki Web API).
— Возможность регулярной синхронизации вместо использования обратного вызова API Bridge (который может быть с задержкой из-за аппаратного моста).
- Обновление всех состояний Nuki Web API при получении обратного вызова через Nuki Bridge API.
- Получение информации об авторизованных пользователях для Nuki Smartlock и Nuki Opener (см. ниже [Каналы и штаты](#общая-информация))
- Получить конфигурацию для Nuki Smartlock и Nuki Opener (см. ниже [Каналы и состояния](#general-config))
- Получить настройки уведомлений Nuki (см. ниже [Каналы и состояния](#пользователи))
- Веб-интерфейс, отображающий последние события с вашего умного замка Nuki Smartlock и открывателя Nuki Opener:

  ![Расширенный веб-интерфейс Nuki](../../../en/adapterref/iobroker.nuki-extended/img/screenshot_adapter-interface.png)

## Установка
### API моста Nuki
Как получить токен аппаратного моста (не работает для программных мостов):

1. Вызовите ```http://<bridge_ip>:<bridge_port>/auth``` из любого браузера в вашей сети. Мост включит свой светодиод.
2. Нажмите кнопку моста в течение 30 секунд.
3. Результат вызова браузера должен выглядеть примерно так:

```
{
   "token":"token123",
   "success":true
}
```

4. Используйте сгенерированный токен в адаптере nuki-extended.

### Веб-API Nuki
Для использования веб-API Nuki выполните следующие действия:

1. Получите токен по адресу https://web.nuki.io/de/#/admin/web-api
2. Используйте этот токен в адаптере nuki-extended.
3. Убедитесь, что ваши устройства Nuki опубликованы в Nuki Web API (используйте приложение для смартфона через Настройки, выбрав «Активировать Nuki Web»).

## Каналы и штаты
Если вам удастся успешно настроить ioBroker.nuki-extended, будут созданы следующие каналы и состояния:

### Мосты (с использованием API Nuki Bridge)
Будет создан мост как устройство с именем по шаблону ```bridge__<name of bridge>```. В каждом мосте будут созданы следующие каналы/состояния:

| Канал | Штат | Описание |
|:------- |:----- |:----------- |
| - | \_connected | Флаг, указывающий, подключен ли мост к серверу Nuki |
| - | имя | Название моста / сервера |
| - | bridgeId | ID моста/сервера |
| - | bridgeIp | IP-адрес моста |
| - | Порт моста | Порт моста |
| - | bridgeType | Тип моста |
| - | hardwareId | Идентификатор аппаратного моста (только для аппаратного моста) |
| - | обновлено | Отметка времени последнего обновления |
| - | время работы | Время работы моста в секундах |
| - | versFirmware | Версия прошивки моста (только для аппаратного моста) |
| - | versWifi | Версия прошивки модулей WiFi (только аппаратный мост) |
| - | versApp | Версия приложения-моста (только программный мост) |
| Отсылки | - | Отсылки моста |
| обратные вызовы | список | Список обратных вызовов |
| callbacks._callbackId_ | \_delete | Удалить обратный вызов |
| callbacks._callbackId_ | url | URL обратного вызова |

### Общая информация
| Канал | Штат | Описание |
|:------- |:----- |:----------- |
| - | соединение | Состояние подключения адаптера |
| - | bridgeApiSync | Указывает, активирована ли синхронизация через Bridge API |
| - | bridgeApiLast | Временная метка последней синхронизации Bridge API |
| - | webApiSync | Указывает, активирована ли синхронизация через Web API |
| - | webApiLast | Временная метка последней синхронизации Web API |
| уведомления | - | Уведомления |
| notifications._notificationIndex_ | - | - |
| notifications._notificationIndex_.settings | - | Настройки уведомлений |
| notifications._notificationIndex_.settings._settingsIndex_ | - | - |
| notifications._notificationIndex_.settings._settingsIndex_ | authIds | Набор идентификаторов аутентификации для фильтрации push-уведомлений для определенных пользователей или клавиатур. Если ни одна запись не найдена, push-уведомления не отправляются всем пользователям и клавиатурам. |
| notifications._notificationIndex_.settings._settingsIndex_ | smartlockId | Идентификатор смарт-замка. Если он не задан, все смарт-замки учетной записи будут получать push-уведомления. |
| notifications._notificationIndex_.settings._settingsIndex_ | triggerEvents | Набор событий, при которых должны запускаться push-уведомления: lock, unlock, unlatch, lockngo, open, ring, doorsensor, warnings, smartlock |
| notifications._notificationIndex_ | language | Язык push-уведомлений |
| notifications._notificationIndex_ | lastActiveDate | Дата последней активности |
| notifications._notificationIndex_ | notificationId | Уникальный идентификатор уведомления |
| notifications._notificationIndex_ | os | Операционная система<br> `{"0": 'Android', "1": 'iOS', "2": 'Webhook'}` |
| notifications._notificationIndex_ | pushId | Идентификатор push-уведомления или URL POST-запроса для веб-перехватчика |
| notifications._notificationIndex_ | referenceId | Идентификатор ссылки, идентификатор для идентификации внешней системы |
| notifications._notificationIndex_ | status | Текущее состояние активации<br> `{"0": 'INIT', "1": 'ACTIVE', "2": 'FAILED'}` |
| notifications._notificationIndex_ | status | Текущее состояние активации<br> `{&quot;0&quot;: &#39;ИНИЦИАЛИЗАЦИЯ&#39;, &quot;1&quot;: &#39;АКТИВНО&#39;, &quot;2&quot;: &#39;НЕУДАЧА&#39;}` |

### Умные замки и открыватели (с использованием API Nuki Bridge)
Будет создан замок как устройство с именем, заданным шаблоном ```door__<name of door>```. В каждом замке (при использовании API Nuki Bridge) будут созданы следующие каналы/состояния:

| Канал | Штат | Описание |
|:------- |:----- |:----------- |
| - | \_ДЕЙСТВИЕ | Запустить действие на замке |
| - | id | ID Нуки |
| - | имя | Имя Нуки |
| - | тип | Тип устройства |
| - | bridgeId | Идентификатор моста Nuki |
| статус | - | Текущий статус блокировки |
| статус | batteryCritical** | Сообщает о критическом уровне заряда батареи |
| статус | состояние блокировки** | Текущее состояние блокировки Nuki |
| статус | заблокировано** | Индикация, если дверь заблокирована |
| статус | обновлено** | Отметка времени последнего обновления |

**Помеченные состояния будут обновляться в действии Nuki, если установлен обратный вызов.**

### Умные замки и открыватели (с использованием Nuki Web API)
Будет создан замок как устройство с именем, заданным шаблоном ```door__<name of door>```. В каждом замке (при использовании Nuki Web API) будут созданы следующие каналы/состояния:

| Канал | Состояние | Описание (возможные значения) |
|:------- |:----- |:----------------------------- |
| - | \_ДЕЙСТВИЕ | Запустить действие на замке |
| - | id | ID Нуки |
| - | имя | Имя Нуки |
| - | тип | Тип устройства |
| - | журналы | Журналы / История Нуки |
| - | bridgeId | Идентификатор моста Nuki |

#### Информация
| Канал | Состояние | Описание (возможные значения) |
|:------- |:----- |:----------------------------- |
| информация | - | Дополнительная информация |
| информация | accountId | Идентификатор учетной записи |
| info | authId | Идентификатор авторизации |
| информация | избранное | Избранный флаг |
| информация | версия прошивки | Версия прошивки |
| информация | версия оборудования | Версия оборудования |
| информация | operationId | Идентификатор операции - если задан, устройство блокируется для выполнения другой операции |
| информация | serverState | Состояние сервера<br> `{"0": 'OK', "1": 'UNREGISTERED', "2": 'AUTH UUID INVALID', "3": 'AUTH INVALID', "4": 'OFFLINE'}` |
| информация | adminPinState | Состояние PIN-кода администратора<br> `{&quot;0&quot;: &#39;OK&#39;, &quot;1&quot;: &#39;MISSING&#39;, &quot;2&quot;: &#39;INVALID&#39;}` |
| информация | virtualDevice | Флаг, указывающий на виртуальный «умный замок» |
| информация | дата создания | Дата создания |
| информация | дата обновления | Дата обновления |

#### Состояние
| Канал | Состояние | Описание (возможные значения) |
|:------- |:----- |:----------------------------- |
| состояние | - | Текущий статус блокировки |
| состояние | критический уровень заряда батареи | Состояние критического уровня заряда батареи |
| состояние | закрыто | Индикация, закрыта ли дверь (логическое значение параметра doorState) |
| состояние | состояние двери | Текущее состояние двери Нуки |
| состояние | последнее действие | Последнее сработавшее действие |
| состояние | состояние блокировки | Текущее состояние блокировки Nuki |
| состояние | заблокировано | Индикация, если дверь заблокирована |
| состояние | режим | Режим умного замка<br> `{"0": 'UNINITIALIZED', "1": 'PAIRING', "2": 'NORMAL', "3": 'UNKNOWN', "4": 'MAINTENANCE'}` |
| состояние | ringToOpenTimer | Оставшееся время до открытия звонка |
| состояние | триггер | Триггер состояния<br> `{"0": 'SYSTEM', "1": 'MANUAL', "2": 'BUTTON', "3": 'AUTOMATIC', "4": 'WEB', "5": 'APP'}` |
| состояние | триггер | Триггер состояния<br> `{&quot;0&quot;: &#39;СИСТЕМА&#39;, &quot;1&quot;: &#39;РУЧНОЙ&#39;, &quot;2&quot;: &#39;КНОПКА&#39;, &quot;3&quot;: &#39;АВТОМАТИЧЕСКИЙ&#39;, &quot;4&quot;: &#39;ВЕБ&#39;, &quot;5&quot;: &#39;ПРИЛОЖЕНИЕ&#39;}` |

#### Общая конфигурация
| Канал | Состояние | Описание (возможные значения) |
|:------- |:----- |:----------------------------- |
| конфигурация | - | Конфигурация |
| config | advertisingMode | Рекламный режим (экономия заряда батареи)<br> `{"0": 'AUTOMATIC', "1": 'NORMAL', "2": 'SLOW', "3": 'SLOWEST'}` |
| config | autoUnlatch | True, если дверь должна отпираться при разблокировке (ручкой) |
| config | buttonEnabled | True, если кнопка на смарт-замке включена |
| конфигурация | возможности | Возможности указывают, можно ли открыть дверь через приложение, RTO или обоими способами |
| config | fobAction1 | Действие брелока при однократном нажатии кнопки<br> `{"0": 'NONE', "1": 'UNLOCK', "2": 'LOCK', "3": 'LOCK_N_GO', "4": 'INTELLIGENT'}` |
| config | fobAction2 | Действие брелока при двойном нажатии кнопки<br> `{"0": 'NONE', "1": 'UNLOCK', "2": 'LOCK', "3": 'LOCK_N_GO', "4": 'INTELLIGENT'}` |
| config | fobAction3 | Действие брелока при 3-кратном нажатии кнопки<br> `{"0": 'NONE', "1": 'UNLOCK', "2": 'LOCK', "3": 'LOCK_N_GO', "4": 'INTELLIGENT'}` |
| config | fobAction3 | Действие брелока при 3-кратном нажатии кнопки<br> `{&quot;0&quot;: &#39;НЕТ&#39;, &quot;1&quot;: &#39;РАЗБЛОКИРОВАТЬ&#39;, &quot;2&quot;: &#39;ЗАБЛОКИРОВАТЬ&#39;, &quot;3&quot;: &#39;ЗАБЛОКИРОВАТЬ_И_ОТПРАВИТЬ&#39;, &quot;4&quot;: &#39;ИНТЕЛЛЕКТУАЛЬНЫЙ&#39;}` |
| config | fobPaired | True, если брелок сопряжен со смарт-замком |
| конфигурация | gpsLatitude | Широта |
| конфигурация | состояние HomeKit | Состояние HomeKit<br> `{"0": 'UNAVAILABLE', "1": 'DISABLED', "2": 'ENABLED', "3": 'ENABLED & PAIRED'}` |
| конфигурация | состояние HomeKit | Состояние HomeKit<br> `{&quot;0&quot;: &#39;НЕДОСТУПНО&#39;, &quot;1&quot;: &#39;ОТКЛЮЧЕНО&#39;, &quot;2&quot;: &#39;ВКЛЮЧЕНО&#39;, &quot;3&quot;: &#39;ВКЛЮЧЕНО И СОПРЯЖЕНО&#39;}` |
| config | keypadPaired | True, если клавиатура сопряжена со смарт-замком |
| config | ledBrightness | Яркость светодиода: от 0 (выкл.) до 5 (макс.) |
| config | ledEnabled | True, если светодиод на умном замке включен |
| конфигурация | имя | Название умного замка для новых пользователей |
| config | operatingMode | Режим работы открывателя |
| config | pairingEnabled | True, если сопряжение разрешено через кнопку смарт-замка |
| config | singleLock | True, если умный замок должен блокироваться только один раз (вместо двух) |
| config | timezoneId | Идентификатор часового пояса |
| config | timezoneOffset | Смещение часового пояса (в минутах) |

#### Расширенные настройки
| Канал | Состояние | Описание (возможные значения) |
|:------- |:----- |:----------------------------- |
| advancedConfig | - | Расширенная конфигурация |
| advancedConfig | autoLockTimeout | Количество секунд, в течение которых умный замок автоматически заблокируется после разблокировки. Автоматическая блокировка не выполняется, если значение равно 0. |
| advancedConfig | automaticBatteryTypeDetection | Флаг, указывающий, включено ли автоматическое определение типа батареи |
| advancedConfig | batteryType | Тип батарей, используемых в умном замке<br> `{"0": 'ALKALI', "1": 'ACCUMULATOR', "2": 'LITHIUM'}` |
| advancedConfig | doubleButtonPressAction | Желаемое действие при двойном нажатии кнопки<br> `{"0": "NO_ACTION", "1": "INTELLIGENT", "2": "UNLOCK", "3": "LOCK", "4": "UNLATCH", "5": "LOCK_N_GO", "6": "SHOW_STATUS"}` |
| advancedConfig | doubleButtonPressAction | Желаемое действие при двойном нажатии кнопки<br> `{&quot;0&quot;: &quot;NO_ACTION&quot;, &quot;1&quot;: &quot;INTELLIGENT&quot;, &quot;2&quot;: &quot;UNLOCK&quot;, &quot;3&quot;: &quot;LOCK&quot;, &quot;4&quot;: &quot;UNLATCH&quot;, &quot;5&quot;: &quot;LOCK_N_GO&quot;, &quot;6&quot;: &quot;SHOW_STATUS&quot;}` |
| advancedConfig | lngTimeout | Время ожидания в секундах для функции lock ‘n’ go |
| advancedConfig | singleButtonPressAction | Желаемое действие при однократном нажатии кнопки<br> `{"0": "NO_ACTION", "1": "INTELLIGENT", "2": "UNLOCK", "3": "LOCK", "4": "UNLATCH", "5": "LOCK_N_GO", "6": "SHOW_STATUS"}` |
| advancedConfig | singleButtonPressAction | Желаемое действие при однократном нажатии кнопки<br> `{&quot;0&quot;: &quot;NO_ACTION&quot;, &quot;1&quot;: &quot;INTELLIGENT&quot;, &quot;2&quot;: &quot;UNLOCK&quot;, &quot;3&quot;: &quot;LOCK&quot;, &quot;4&quot;: &quot;UNLATCH&quot;, &quot;5&quot;: &quot;LOCK_N_GO&quot;, &quot;6&quot;: &quot;SHOW_STATUS&quot;}` |
| advancedConfig | singleLockedPositionOffsetDegrees | Смещение, изменяющее единственное заблокированное положение |
| advancedConfig | totalDegrees | Абсолютное суммарное положение в градусах, достигнутое во время калибровки |
| advancedConfig | unlatchDuration | Продолжительность в секундах удержания защелки в незащелкнутом положении |
| advancedConfig | unlockedPositionOffsetDegrees | Смещение, изменяющее разблокированное положение |
| advancedConfig | unlockedToLockedTransitionOffsetDegrees | Смещение, изменяющее положение, в котором происходит переход из разблокированного состояния в заблокированное |

#### Расширенные настройки открывателя
| Канал | Состояние | Описание (возможные значения) |
|:------- |:----- |:----------------------------- |
| openerAdvancedConfig | - | Конфигурация открывателя |
| openerAdvancedConfig | intercomId | Идентификатор подключенного домофона в базе данных |
| openerAdvancedConfig | busModeSwitch | Метод переключения между режимами передачи данных и аналогового режима<br> `{"0": 'DATA MODE', "1": 'ANALOGUE MODE'}` |
| openerAdvancedConfig | shortCircuitDuration | Длительность короткого замыкания при переключении режима шины в мс |
| openerAdvancedConfig | electricStrikeDelay | Задержка срабатывания электромагнитного затвора в мс (после действия блокировки 3 - срабатывание электромагнитного затвора-) |
| openerAdvancedConfig | randomElectricStrikeDelay | Случайная задержка срабатывания электрозатвора (диапазон 3000–7000 мс) для имитации присутствия человека внутри, приводящего в действие электрозатвор |
| openerAdvancedConfig | electricStrikeDuration | Длительность срабатывания электромагнитного затвора в мс (действие замка 3 - срабатывание электромагнитного затвора-) |
| openerAdvancedConfig | disableRtoAfterRing | Флаг для отключения RTO после звонка |
| openerAdvancedConfig | doorbellSuppression | Режим подавления дверного звонка<br> `{"0": 'NEVER', "1": 'ALWAYS', "2": 'RTO', "3": 'CONTINUOUS', "4": 'CONTINUOUS + RTO'}` |
| openerAdvancedConfig | doorbellSuppression | Режим подавления дверного звонка<br> `{&quot;0&quot;: &#39;НИКОГДА&#39;, &quot;1&quot;: &#39;ВСЕГДА&#39;, &quot;2&quot;: &#39;RTO&#39;, &quot;3&quot;: &#39;НЕПРЕРЫВНЫЙ&#39;, &quot;4&quot;: &#39;НЕПРЕРЫВНЫЙ + RTO&#39;}` |
| openerAdvancedConfig | doorbellSuppressionDuration | Длительность подавления звонка в мс (только в режиме работы 2 - цифровой домофон) |
| openerAdvancedConfig | soundRing | Звук для звонка |
| openerAdvancedConfig | soundOpen | Звук открытия |
| openerAdvancedConfig | soundRto | Звук для RTO |
| openerAdvancedConfig | soundCm | Звук для CM |
| openerAdvancedConfig | soundConfirmation | Подтверждение звука |
| openerAdvancedConfig | soundLevel | Уровень звука |
| openerAdvancedConfig | singleButtonPressAction | Желаемое действие при однократном нажатии кнопки |
| openerAdvancedConfig | batteryType | Тип батарей, используемых в умном замке<br> `{"0": 'ALKALI', "1": 'ACCUMULATOR', "2": 'LITHIUM'}` |
| openerAdvancedConfig | batteryType | Тип батарей, используемых в умном замке<br> `{&quot;0&quot;: &#39;ЩЕЛОЧЬ&#39;, &quot;1&quot;: &#39;АККУМУЛЯТОР&#39;, &quot;2&quot;: &#39;ЛИТИЙ&#39;}` |
| openerAdvancedConfig | automaticBatteryTypeDetection | Флаг, указывающий, включено ли автоматическое определение типа батареи |
| openerAdvancedConfig | operationId | Идентификатор операции - если заданное устройство заблокировано для другой операции |

#### Пользователи
| Канал | Состояние | Описание (возможные значения) |
|:------- |:----- |:----------------------------- |
| пользователи | - | Пользователи блокировки |
| users._userName_ | - | User _userName_ |
| users._userName_ | allowedFromDate | Дата начала действия разрешения |
| users._userName_ | allowedUntilDate | Дата, до которой разрешено использование |
| users._userName_ | allowedWeekDays | Разрешенные дни недели<br> `{64: 'Monday', 32: 'Tuesday', 16: 'Wednesday', 8: 'Thursday', 4: 'Friday', 2: 'Saturday', 1: 'Sunday'}` |
| users._userName_ | allowedFromTime | Время, с которого разрешено использование (в минутах от полуночи) |
| users._userName_ | allowedUntilTime | Разрешенное время до (в минутах от полуночи) |
| users._userName_ | authId | Идентификатор авторизации смарт-замка |
| users._userName_ | dateCreated | Дата создания |
| users._userName_ | dateUpdated | Дата обновления |
| users._userName_ | dateLastActive | Дата последней активности |
| users._userName_ | enabled | True, если пользователь включен |
| users._userName_ | id | Уникальный идентификатор пользователя |
| users._userName_ | lockCount | Количество блокировок |
| users._userName_ | name | Имя пользователя |
| users._userName_ | remoteAllowed | True, если у пользователя есть удаленный доступ |
| users._userName_ | type | Тип авторизации<br> `{"0": 'APP', "1": 'BRIDGE', "2": 'FOB', "3": 'KEYPAD', "13": 'KEYPAD CODE', "14": 'Z-KEY', "15": 'VIRTUAL'}` |
| users._userName_ | type | Тип авторизации<br> `{&quot;0&quot;: &#39;APP&#39;, &quot;1&quot;: &#39;BRIDGE&#39;, &quot;2&quot;: &#39;FOB&#39;, &quot;3&quot;: &#39;KEYPAD&#39;, &quot;13&quot;: &#39;KEYPAD CODE&#39;, &quot;14&quot;: &#39;Z-KEY&#39;, &quot;15&quot;: &#39;VIRTUAL&#39;}` |

## Интеграция умного дома и Alexa с использованием ioBroker.javascript
Несколько примеров возможной интеграции в вашу систему «умного дома».

### Закройте дверь в 22:00.
```javascript
var states = {
    "0": "uncalibrated",
    "1": "locked",
    "2": "unlocking",
    "3": "unlocked",
    "4": "locking",
    "5": "unlatched",
    "6": "unlocked (lock n go)",
    "7": "unlatching",
    "254": "motor blocked",
    "255": "undefined"
};

schedule('0 22 * * *', function()
{
    var status = (getState('nuki-extended.0.smartlocks.home_door.state.lockState').val);
    var msg = 'Main Door door is ' + (states[status]) + '. ';

    if (status == '3')
    {
        setState('nuki-extended.0.smartlocks.home_door._ACTION', 2);
        msg += 'Locking door..'
    }
    else
        msg += 'No action taken.'

    log(msg, {m: 'Nuki', o: ['msg']});
});
```

Замените `nuki-extended.0.door__home_door.status.lockState` на значение lockState вашего замка!__ Вы также можете настроить сообщение с помощью `msg`.

### Пусть Alexa сообщит вам об изменении настроек замка
Для этого требуется адаптер ioBroker ioBroker.alexa2 (https://github.com/Apollon77/ioBroker.alexa2).

Для использования голосового вывода Alexa мы определяем функцию ```say```. Поместите следующую функцию в скрипт в папке "global" файла ioBroker.javascript. ВАЖНО: Замените #ВАШ ИДЕНТИФИКАТОР ALEXA# (также замените #) на ваш идентификатор Alexa. Вы можете найти идентификатор Alexa в дереве объектов ioBroker ```alexa2.0.Echo-Devices```.

```javascript
/**
 * Say something with Alexa.
 *
 * @param       {string}        message         Message to say
 * @param       {string|array}  alexas          Alexa Device to say the voice message
 * @return      void
 *
 */
function say(message, alexas = '#YOUR ALEXA ID#') // use alexas = ['#YOUR ALEXA ID 1#', '#YOUR ALEXA ID 2#'] for default voice output from multiple devices (also replace #)
{
    alexas = typeof alexas === 'string' ? [alexas] : alexas;
    alexas.forEach(function(alexa)
    {
        setState('alexa2.0.Echo-Devices.' + alexa + '.Commands.speak', message);
    });
}
```

Вы можете использовать эту функцию в файле ioBroker.javascript, чтобы произнести фразу с помощью Alexa ```say('Hello World')``` или ```say('Hello World', ['#YOUR ALEXA ID 1#', '#YOUR ALEXA ID 2#'])``` для голосового вывода с нескольких устройств.

Создайте скрипт в папке "common" файла ioBroker.javascript и добавьте к нему следующий обработчик событий. ВАЖНО: Замените #LOCK STATE ID# (также замените #) на состояние, содержащее статус блокировки (например, ```nuki-extended.0.door__home_door.status.lockState```):

```javascript
const DOOR_STATES = {
    "0": "uncalibrated",
    "1": "locked",
    "2": "unlocking",
    "3": "unlocked",
    "4": "locking",
    "5": "unlatched",
    "6": "unlocked (lock n go)",
    "7": "unlatching",
    "254": "motor blocked",
    "255": "undefined"
};

/*
 * LISTEN TO CHANGES TO LOCK STATE
 *
 */
on({id: 'nuki-extended.0.smartlocks.home_door.state.lockState', change: 'any'}, function(obj)
{
    if (obj !== undefined && obj.state !== undefined)
      say('Door is ' + DOOR_STATES[obj.state.val] + '!')
});
```

### Пусть Telegram информирует вас об изменениях в блокировке
Для этого требуется адаптер ioBroker ioBroker.telegram (https://github.com/iobroker-community-adapters/ioBroker.telegram).

Для использования вывода сообщений Telegram мы определяем функции ```msg``` и ```messenger```. Поместите следующую функцию в скрипт в папке "global" файла ioBroker.javascript:

```javascript
/**
 * Send something via telegram.
 *
 * @param       {string}        message         Message to print
 * @param       {string|array}  receiver        Users to send the message to
 * @return      void
 *
 */
function msg(message, receiver = 'ALL')
{
    if (receiver == 'ALL')
        messenger(message);

    else
    {
        receiver = typeof receiver == 'string' ? [receiver] : receiver;
        receiver.forEach(function(user)
        {
            messenger(message, user);
        });
    }
}
```

```javascript
/**
 * Sends a message / text.
 *
 * @param   {string}            content         Message to send
 * @param   {string}            user            (optional) Specific user to send the message to (defaults to all registered users)
 * @return  void
 *
 */
function messenger(content, user = '')
{
    var config = {
        text: content,
        parse_mode: 'HTML',
        reply_markup: {
            resize_keyboard: true,
            one_time_keyboard: false
        }
    };

    sendTo('telegram', user ? Object.assign({user: user}, config) : config);
}
```

Вы можете использовать эту функцию в файле ioBroker.javascript для отправки чего угодно в Telegram через ```msg('Hello World')``` (всем пользователям) или ```msg('Hello World', 'Zefau')``` (конкретным пользователям).

Создайте скрипт в папке "common" файла ioBroker.javascript и добавьте к нему следующий обработчик событий. ВАЖНО: Замените #LOCK STATE ID# (также замените #) на состояние, содержащее статус блокировки (например, ```nuki-extended.0.door__home_door.status.lockState```):

```javascript
const DOOR_STATES = {
    "0": "uncalibrated",
    "1": "locked",
    "2": "unlocking",
    "3": "unlocked",
    "4": "locking",
    "5": "unlatched",
    "6": "unlocked (lock n go)",
    "7": "unlatching",
    "254": "motor blocked",
    "255": "undefined"
};

/*
 * LISTEN TO CHANGES TO LOCK STATE
 *
 */
on({id: 'nuki-extended.0.smartlocks.home_door.state.lockState', change: 'any'}, function(obj)
{
    if (obj !== undefined && obj.state !== undefined)
      msg('Door is ' + DOOR_STATES[obj.state.val] + '!')
});
```

ПРИМЕЧАНИЕ: Если вы используете скрипты Alexa и Telegram, вы можете определить только один слушатель для каждого действия:

```javascript
const DOOR_STATES = {
    "0": "uncalibrated",
    "1": "locked",
    "2": "unlocking",
    "3": "unlocked",
    "4": "locking",
    "5": "unlatched",
    "6": "unlocked (lock n go)",
    "7": "unlatching",
    "254": "motor blocked",
    "255": "undefined"
};

/*
 * LISTEN TO CHANGES TO LOCK STATE
 *
 */
on({id: 'nuki-extended.0.smartlocks.home_door.state.lockState', change: 'any'}, function(obj)
{
    if (obj !== undefined && obj.state !== undefined)
    {
      say('Door is ' + DOOR_STATES[obj.state.val] + '!')
      msg('Door is ' + DOOR_STATES[obj.state.val] + '!')
    }
});
```

### Пусть Telegram и Alexa сообщат вам о звонке через функцию «Открыть».
Для этого необходимы адаптеры ioBroker ioBroker.telegram (https://github.com/iobroker-community-adapters/ioBroker.telegram) и ioBroker.alexa2 (https://github.com/Apollon77/ioBroker.alexa2).

```javascript
/*
 * Alexa and Telegram to notify on Opener Ringing state
 *
 */
let phrase = 'Somebody is ringing the doorbell.'; // Es hat an der Tür geklingelt
on({id: 'nuki-extended.0.openers.opener.state.ringStateUpdate', change: "any", ack: true}, function (s) {
  let state= s && s.state;

  if (state.val === true) {
    setState("alexa2.0.Echo-Devices.#YOUR ALEXA ID#.Commands.speak"/*speak*/, phrase);
    sendTo("telegram", "send", { text: phrase });
  }
});
```

## Changelog

Please see [release page](https://github.com/Zefau/ioBroker.nuki-extended/releases) for changelog and detailed information.

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.8.2 (2026-05-14)
- (mcm1957) Missing translations have been added.
- (mcm1957) Dependencies have been updated

### 2.8.1 (2026-05-13)
- (copilot) Migrated linting setup to ESLint 9 with the shared `@iobroker/eslint-config`.
- (copilot) Resolved ESLint error findings in adapter core files and aligned linting ignores for legacy frontend scripts.

### 2.8.0 (2026-05-13)
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (VierlingMt) Adding Nuki Smartlock 4.X and Pro Support, "toLowerCase" error fixed
- (sbormann) Added deviceType 5 and fixed empty type variable
- (mcm1957) Dependencies have been updated

### 2.7.0 (2024-04-21)
* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 2.6.5 (2022-06-17)
* (Apollon77) Fix some crash cases reported by Sentry

## License
The MIT License (MIT)

Copyright (c) 2024-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2019-2022 Zefau <zefau@mailbox.org>

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