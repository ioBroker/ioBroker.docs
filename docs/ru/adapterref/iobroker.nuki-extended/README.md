---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.nuki-extended/README.md
title: ioBroker.nuki-расширенный
hash: IVEO70qXQFzBzkaqwGTHYYQSEshHQEIvPLCGNOEHYyY=
---
![Логотип](../../../en/adapterref/iobroker.nuki-extended/admin/nuki-extended.png)

![Количество установок](http://iobroker.live/badges/nuki-extended-stable.svg)
![версия НПМ](http://img.shields.io/npm/v/iobroker.nuki-extended.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.nuki-extended.svg)

# IoBroker.nuki-extended Этот адаптер ioBroker (ранее ioBroker.Nuki2) позволяет контролировать и контролировать [Nuki Smart Lock](https://nuki.io/de/smart-lock/) и/или [Nuki Opener](https://nuki.io/de/opener/) с использованием как [Nuki Bridge API (v1.9.0, 06.05.2019)](https://developer.nuki.io/page/nuki-bridge-http-api-170/4/#heading--introduction), так и [Nuki Web API (v1.2.0, 31.05.2019)](https://developer.nuki.io/page/nuki-web-api-111/3/).
![Тест и выпуск](https://github.com/iobroker-community-adapters/ioBroker.nuki-extended/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/nuki-extended/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Более подробную информацию и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

**Оглавление**

1. [Особенности](#особенности)
2. [Установка](#установка)
   1. [Nuki Bridge API](#nuki-bridge-api)
   2. [Nuki Web API](#nuki-web-api)
3. [Каналы и состояния](#каналы--состояния)
4. [Интеграция умного дома и Alexa с использованием ioBroker.javascript](#smart-home--alexa-integration-using-iobrokerjavascript)
1. [Запирать дверь в 22:00 вечера](#запирать-дверь-в-10-вечера)
2. [Позвольте Alexa информировать вас об изменениях блокировки](#let-alexa-inform-you-about-lock-changes)
3. [Позвольте Telegram информировать вас об изменениях в блокировках](#let-telegram-inform-you-about-lock-changes)
4. [Позвольте Alexa и Telegram информировать вас о звонке через Opener](#let-telegram-and-alexa-inform-you-about-somebody-ringing-via-opener)
5. [Журнал изменений](#журнал изменений)
6. [Кредиты](#кредиты)
7. [Лицензия](#лицензия)

## Функции
- Поддержка Nuki Smartlock и Nuki Opener
- Поддержка Nuki Bridge API и Nuki Web API
- ~~Поддержка хэшированного токена на аппаратных мостах (см. https://developer.nuki.io/page/nuki-bridge-http-api-190/4#heading--token)~~
- Возврат к Nuki Web API в случае сбоя примененных действий в Nuki Bridge API, например, из-за ошибки моста 503 (см. https://developer.nuki.io/t/random-http-503-unavailable/909/85?u=zefau)
- Повторите попытку в случае сбоя примененных действий в API Nuki Bridge (когда API Nuki Web не используется)
- Возможность регулярной синхронизации вместо использования обратного вызова API Bridge (который может быть задержан из-за аппаратного моста)
- Обновление всех состояний Nuki Web API при получении обратного вызова через Nuki Bridge API
- Получить авторизованных пользователей для Nuki Smartlock и Nuki Opener (см. ниже [Каналы и состояния](#general-information))
- Получите конфигурацию для Nuki Smartlock и Nuki Opener (см. ниже [Каналы и состояния](#general-config))
- Восстановите настройки уведомлений Nuki (см. ниже [Каналы и состояния](#пользователи))
- Веб-интерфейс, отображающий последние события вашего Nuki Smartlock и Nuki Opener:

  ![Расширенный веб-интерфейс Nuki](../../../en/adapterref/iobroker.nuki-extended/img/screenshot_adapter-interface.png)

## Установка
### API моста Nuki
Как получить токен аппаратного моста (не работает для программных мостов):

1. Вызовите ```http://<bridge_ip>:<bridge_port>/auth``` из любого браузера в вашей сети. Мост включит свой светодиод.
2. Нажмите кнопку моста в течение 30 секунд.
3. Результат вызова браузера должен быть примерно таким:

```
{
   "token":"token123",
   "success":true
}
```

4. Используйте сгенерированный токен в адаптере nuki-extended.

### Nuki Web API
Чтобы использовать Nuki Web API, выполните следующие действия:

1. Получите токен по адресу https://web.nuki.io/de/#/admin/web-api
2. Используйте этот токен в адаптере nuki-extended
3. Убедитесь, что ваши устройства Nuki опубликованы в Nuki Web API (используйте приложение для смартфона через настройки «Активировать Nuki Web»).

## Каналы и состояния
При успешной настройке ioBroker.nuki-extended создаются следующие каналы и состояния:

### Мосты (с API Nuki Bridge)
Мост будет создан как устройство с шаблоном имени ```bridge__<name of bridge>```. В каждом мосте будут созданы следующие каналы/состояния:

| Канал | Состояние | Описание |
|:------- |:----- |:----------- |
| - | \_connected | Флаг, указывающий, подключен ли мост к серверу Nuki |
| - | имя | Имя моста/сервера |
| - | bridgeId | ID моста/сервера |
| - | bridgeIp | IP-адрес моста |
| - | bridgePort | Порт моста |
| - | bridgeType | Тип моста |
| - | hardwareId | Идентификатор аппаратного моста (только аппаратный мост) |
| - | обновлено | Временная метка последнего обновления |
| - | время безотказной работы | Время безотказной работы моста в секундах |
| - | versFirmware | Версия прошивки мостов (только аппаратный мост) |
| - | versWifi | Версия прошивки модулей WiFi (только аппаратный мост) |
| - | versApp | Версия приложения-моста (только программный мост) |
| обратные вызовы | - | Обратные вызовы моста |
| обратные вызовы | список | Список обратных вызовов |
| callbacks._callbackId_ | \_delete | Удалить обратный вызов |
| callbacks._callbackId_ | url | URL обратного вызова |

### Общая информация
| Канал | Состояние | Описание |
|:------- |:----- |:----------- |
| - | подключение | Состояние подключения адаптера |
| - | bridgeApiSync | Указывает, активирована ли синхронизация через Bridge API |
| - | bridgeApiLast | Временная метка последней синхронизации API Bridge |
| - | webApiSync | Указывает, активирована ли синхронизация через Web API |
| - | webApiLast | Временная метка последней синхронизации Web API |
| уведомления | - | Уведомления |
| уведомления._индекс_уведомления_ | - | - |
| notifications._notificationIndex_.settings | - | Настройки уведомлений |
| уведомления._индекс_уведомлений_.настройки._индекс_настроек_ | - | - |
| notifications._notificationIndex_.settings._settingsIndex_ | authIds | Набор идентификаторов аутентификации для фильтрации push-уведомлений для определенных пользователей или клавиатур. Если нет записи, push-уведомления срабатывают для всех пользователей и клавиатур |
| notifications._notificationIndex_.settings._settingsIndex_ | smartlockId | Идентификатор Smartlock. Если не задан, все Smart Locks учетной записи будут включены для push-уведомлений |
| notifications._notificationIndex_.settings._settingsIndex_ | triggerEvents | Набор, при котором должны срабатывать push-уведомления: lock, unlock, unlatch, lockngo, open, ring, doorsensor, warnings, smartlock |
| notifications._notificationIndex_ | language | Язык push-сообщений |
| notifications._notificationIndex_ | lastActiveDate | Последняя активная дата |
| notifications._notificationIndex_ | notificationId | Уникальный notificationId для уведомления |
| notifications._notificationIndex_ | os | Операционная система<br> `{"0": 'Android', "1": 'iOS', "2": 'Webhook'}` |
| notifications._notificationIndex_ | pushId | Идентификатор push-уведомления или URL-адрес POST для веб-хука |
| notifications._notificationIndex_ | referenceId | Идентификатор ссылки, идентификатор для идентификации внешней системы |
| notifications._notificationIndex_ | status | Текущее состояние активации<br> `{"0": 'INIT', "1": 'ACTIVE', "2": 'FAILED'}` |
| notifications._notificationIndex_ | status | Текущее состояние активации<br> `{&quot;0&quot;: &#39;INIT&#39;, &quot;1&quot;: &#39;ACTIVE&#39;, &quot;2&quot;: &#39;FAILED&#39;}` |

### Умные замки и открывалки (с API Nuki Bridge)
Будет создан замок как устройство с шаблоном имени ```door__<name of door>```. В каждом замке будут созданы следующие каналы/состояния (при использовании API Nuki Bridge):

| Канал | Состояние | Описание |
|:------- |:----- |:----------- |
| - | \_ACTION | Вызвать действие на замке |
| - | id | ID Нуки |
| - | имя | Имя Нуки |
| - | тип | Тип устройства |
| - | bridgeId | Идентификатор моста Nuki |
| статус | - | Текущее состояние замка |
| status | batteryCritical** | Критический уровень заряда батареи |
| status | lockState** | Текущее состояние блокировки Nuki |
| статус | заблокировано** | Индикация того, что дверь заблокирована |
| статус | обновлено** | Временная метка последнего обновления |

_** отмеченные состояния будут обновлены при действии Nuki, если установлен обратный вызов_

### Умные замки и открывалки (с Nuki Web API)
Будет создан замок как устройство с шаблоном имени ```door__<name of door>```. В каждом замке будут созданы следующие каналы/состояния (при использовании Nuki Web API):

| Канал | Состояние | Описание (возможные значения) |
|:------- |:----- |:----------------------------- |
| - | \_ACTION | Вызвать действие на замке |
| - | id | ID Нуки |
| - | имя | Имя Нуки |
| - | тип | Тип устройства |
| - | журналы | Журналы / История Нуки |
| - | bridgeId | Идентификатор моста Nuki |

#### Информация
| Канал | Состояние | Описание (возможные значения) |
|:------- |:----- |:----------------------------- |
| информация | - | Дополнительная информация |
| info | accountId | Идентификатор учетной записи |
| info | authId | Идентификатор авторизации |
| информация | избранное | Любимый флаг |
| info | firmwareVersion | Версия прошивки |
| info | hardwareVersion | Версия оборудования |
| info | operationId | Идентификатор операции — если установлен, устройство заблокировано для другой операции |
| info | serverState | Состояние сервера<br> `{"0": 'OK', "1": 'UNREGISTERED', "2": 'AUTH UUID INVALID', "3": 'AUTH INVALID', "4": 'OFFLINE'}` |
| info | adminPinState | Состояние административного пин-кода<br> `{&quot;0&quot;: &#39;ОК&#39;, &quot;1&quot;: &#39;ОТСУТСТВУЕТ&#39;, &quot;2&quot;: &#39;НЕДЕЙСТВИТЕЛЬНО&#39;}` |
| info | virtualDevice | Флаг, указывающий на виртуальный Smart Lock |
| info | dateCreated | Дата создания |
| info | dateUpdated | Дата обновления |

#### Состояние
| Канал | Состояние | Описание (возможные значения) |
|:------- |:----- |:----------------------------- |
| состояние | - | Текущее состояние замка |
| state | batteryCritical | Сообщает о критическом уровне заряда батареи |
| состояние | закрыто | Индикация того, закрыта ли дверь (логическое значение doorState) |
| state | doorState | Текущее состояние двери Nuki |
| state | lastAction | Последнее вызванное действие |
| state | lockState | Текущее состояние блокировки Nuki |
| состояние | заблокировано | Индикация того, заблокирована ли дверь |
| состояние | режим | Режим smartlock<br> `{"0": 'UNINITIALIZED', "1": 'PAIRING', "2": 'NORMAL', "3": 'UNKNOWN', "4": 'MAINTENANCE'}` |
| state | ringToOpenTimer | Оставшееся время звонка до открытия |
| состояние | триггер | Триггер состояния<br> `{"0": 'SYSTEM', "1": 'MANUAL', "2": 'BUTTON', "3": 'AUTOMATIC', "4": 'WEB', "5": 'APP'}` |
| состояние | триггер | Триггер состояния<br> `{&quot;0&quot;: &#39;СИСТЕМА&#39;, &quot;1&quot;: &#39;РУЧНОЙ&#39;, &quot;2&quot;: &#39;КНОПКА&#39;, &quot;3&quot;: &#39;АВТОМАТИЧЕСКИЙ&#39;, &quot;4&quot;: &#39;ВЕБ&#39;, &quot;5&quot;: &#39;ПРИЛОЖЕНИЕ&#39;}` |

#### Общая конфигурация
| Канал | Состояние | Описание (возможные значения) |
|:------- |:----- |:----------------------------- |
| конфигурация | - | Конфигурация |
| config | advertisingMode | Рекламный режим (экономия заряда батареи)<br> `{"0": 'AUTOMATIC', "1": 'NORMAL', "2": 'SLOW', "3": 'SLOWEST'}` |
| config | autoUnlatch | True, если дверь должна быть отперта при разблокировке (ручка) |
| config | buttonEnabled | True, если кнопка на смарт-замке включена |
| конфигурация | возможности | Возможности указывают, возможно ли открытие двери через приложение, RTO или обоими способами |
| config | fobAction1 | Действие брелока при однократном нажатии кнопки<br> `{"0": 'NONE', "1": 'UNLOCK', "2": 'LOCK', "3": 'LOCK_N_GO', "4": 'INTELLIGENT'}` |
| config | fobAction2 | Действие брелока при двойном нажатии кнопки<br> `{"0": 'NONE', "1": 'UNLOCK', "2": 'LOCK', "3": 'LOCK_N_GO', "4": 'INTELLIGENT'}` |
| config | fobAction3 | Действие брелока при нажатии кнопки 3 раза<br> `{"0": 'NONE', "1": 'UNLOCK', "2": 'LOCK', "3": 'LOCK_N_GO', "4": 'INTELLIGENT'}` |
| config | fobAction3 | Действие брелока при нажатии кнопки 3 раза<br> `{&quot;0&quot;: &#39;НЕТ&#39;, &quot;1&quot;: &#39;РАЗБЛОКИРОВАТЬ&#39;, &quot;2&quot;: &#39;БЛОКИРОВАТЬ&#39;, &quot;3&quot;: &#39;БЛОКИРОВАТЬ_И_ИДТИ&#39;, &quot;4&quot;: &#39;ИНТЕЛЛЕКТУАЛЬНЫЙ&#39;}` |
| config | fobPaired | True, если брелок сопряжен с умным замком |
| конфигурация | gpsLatitude | Широта |
| config | homekitState | Состояние homekit<br> `{"0": 'UNAVAILABLE', "1": 'DISABLED', "2": 'ENABLED', "3": 'ENABLED & PAIRED'}` |
| config | homekitState | Состояние homekit<br> `{&quot;0&quot;: &#39;НЕТОДОСТУПНО&#39;, &quot;1&quot;: &#39;ОТКЛЮЧЕНО&#39;, &quot;2&quot;: &#39;ВКЛЮЧЕНО&#39;, &quot;3&quot;: &#39;ВКЛЮЧЕНО И СОПРЯЖЕНО&#39;}` |
| config | keypadPaired | True, если клавиатура сопряжена с замком Smartlock |
| config | ledBrightness | Яркость светодиода: от 0 (выкл.) до 5 (макс.) |
| config | ledEnabled | True, если светодиод на смарт-замке включен |
| config | name | Имя смарт-замка для новых пользователей |
| config | OperatingMode | Режим работы открывателя |
| config | pairingEnabled | True, если сопряжение разрешено с помощью кнопки smartlock |
| config | singleLock | True, если смарт-замок должен блокироваться только один раз (а не дважды) |
| config | timezoneId | Идентификатор часового пояса |
| config | timezoneOffset | Смещение часового пояса (в минутах) |

#### Расширенная конфигурация
| Канал | Состояние | Описание (возможные значения) |
|:------- |:----- |:----------------------------- |
| advancedConfig | - | Расширенная конфигурация |
| advancedConfig | autoLockTimeout | Секунды, в течение которых умный замок повторно заблокируется после разблокировки. Если значение равно 0, повторной автоматической блокировки не будет. |
| advancedConfig | automaticBatteryTypeDetection | Флаг, указывающий, включено ли автоматическое определение типа батареи |
| advancedConfig | batteryType | Тип батарей, имеющихся в интеллектуальном замке<br> `{"0": 'ALKALI', "1": 'ACCUMULATOR', "2": 'LITHIUM'}` |
| advancedConfig | doubleButtonPressAction | Желаемое действие, если кнопка нажата дважды<br> `{"0": "NO_ACTION", "1": "INTELLIGENT", "2": "UNLOCK", "3": "LOCK", "4": "UNLATCH", "5": "LOCK_N_GO", "6": "SHOW_STATUS"}` |
| advancedConfig | doubleButtonPressAction | Желаемое действие, если кнопка нажата дважды<br> `{&quot;0&quot;: &quot;NO_ACTION&quot;, &quot;1&quot;: &quot;INTELLIGENT&quot;, &quot;2&quot;: &quot;UNLOCK&quot;, &quot;3&quot;: &quot;LOCK&quot;, &quot;4&quot;: &quot;UNLATCH&quot;, &quot;5&quot;: &quot;LOCK_N_GO&quot;, &quot;6&quot;: &quot;SHOW_STATUS&quot;}` |
| advancedConfig | lngTimeout | Время ожидания в секундах для lock ‘n’ go |
| advancedConfig | singleButtonPressAction | Желаемое действие, если кнопка нажата один раз<br> `{"0": "NO_ACTION", "1": "INTELLIGENT", "2": "UNLOCK", "3": "LOCK", "4": "UNLATCH", "5": "LOCK_N_GO", "6": "SHOW_STATUS"}` |
| advancedConfig | singleButtonPressAction | Желаемое действие, если кнопка нажата один раз<br> `{&quot;0&quot;: &quot;NO_ACTION&quot;, &quot;1&quot;: &quot;INTELLIGENT&quot;, &quot;2&quot;: &quot;UNLOCK&quot;, &quot;3&quot;: &quot;LOCK&quot;, &quot;4&quot;: &quot;UNLATCH&quot;, &quot;5&quot;: &quot;LOCK_N_GO&quot;, &quot;6&quot;: &quot;SHOW_STATUS&quot;}` |
| advancedConfig | singleLockedPositionOffsetDegrees | Смещение, изменяющее единственную заблокированную позицию |
| advancedConfig | totalDegrees | Абсолютное общее положение в градусах, достигнутое во время калибровки |
| advancedConfig | unlatchDuration | Длительность в секундах удержания защелки в открытом положении |
| advancedConfig | unlockedPositionOffsetDegrees | Смещение, изменяющее разблокированное положение |
| advancedConfig | unlockedToLockedTransitionOffsetDegrees | Смещение, изменяющее положение, в котором происходит переход из разблокированного состояния в заблокированное |

#### Расширенная конфигурация открывателя
| Канал | Состояние | Описание (возможные значения) |
|:------- |:----- |:----------------------------- |
| openerAdvancedConfig | - | Конфигурация открывателя |
| openerAdvancedConfig | intercomId | Идентификатор базы данных подключенного домофона |
| openerAdvancedConfig | busModeSwitch | Метод переключения между режимом данных и аналоговым режимом<br> `{"0": 'DATA MODE', "1": 'ANALOGUE MODE'}` |
| openerAdvancedConfig | shortCircuitDuration | Длительность короткого замыкания для переключения режима BUS в мс |
| openerAdvancedConfig | electricStrikeDelay | Задержка активации электрозащелки в мс (после действия замка 3 -активация электрозащелки-) |
| openerAdvancedConfig | randomElectricStrikeDelay | Случайная задержка electricStrike (диапазон 3000–7000 мс) для имитации нахождения человека внутри и приведения в действие электрозащелки |
| openerAdvancedConfig | electricStrikeDuration | Длительность срабатывания электрозащелки в мс (действие замка 3 -срабатывание электрозащелки-) |
| openerAdvancedConfig | disableRtoAfterRing | Флаг для отключения RTO после звонка |
| openerAdvancedConfig | doorbellSuppression | Режим подавления дверного звонка<br> `{"0": 'NEVER', "1": 'ALWAYS', "2": 'RTO', "3": 'CONTINUOUS', "4": 'CONTINUOUS + RTO'}` |
| openerAdvancedConfig | doorbellSuppression | Режим подавления дверного звонка<br> `{&quot;0&quot;: &#39;НИКОГДА&#39;, &quot;1&quot;: &#39;ВСЕГДА&#39;, &quot;2&quot;: &#39;RTO&#39;, &quot;3&quot;: &#39;ПРОДОЛЖИТЕЛЬНО&#39;, &quot;4&quot;: &#39;ПРОДОЛЖИТЕЛЬНО + RTO&#39;}` |
| openerAdvancedConfig | doorbellSuppressionDuration | Длительность подавления дверного звонка в мс (только в режиме работы 2 -цифровой интерком-) |
| openerAdvancedConfig | soundRing | Звук для звонка |
| openerAdvancedConfig | soundOpen | Звук для открытия |
| openerAdvancedConfig | soundRto | Звук для RTO |
| openerAdvancedConfig | soundCm | Звук для CM |
| openerAdvancedConfig | soundConfirmation | Звуковое подтверждение |
| openerAdvancedConfig | soundLevel | Уровень звука |
| openerAdvancedConfig | singleButtonPressAction | Желаемое действие, если кнопка нажата один раз |
| openerAdvancedConfig | batteryType | Тип батарей, имеющихся в интеллектуальном замке<br> `{"0": 'ALKALI', "1": 'ACCUMULATOR', "2": 'LITHIUM'}` |
| openerAdvancedConfig | batteryType | Тип батарей, имеющихся в интеллектуальном замке<br> `{&quot;0&quot;: &#39;ЩЕЛОЧНОЙ&#39;, &quot;1&quot;: &#39;АККУМУЛЯТОР&#39;, &quot;2&quot;: &#39;ЛИТИЙ&#39;}` |
| openerAdvancedConfig | automaticBatteryTypeDetection | Флаг, указывающий, включено ли автоматическое определение типа батареи |
| openerAdvancedConfig | operationId | Идентификатор операции — если установлено, устройство заблокировано для другой операции |

#### Пользователи
| Канал | Состояние | Описание (возможные значения) |
|:------- |:----- |:----------------------------- |
| пользователи | - | Пользователи замка |
| users._имя_пользователя_ | - | Пользователь _имя_пользователя_ |
| users._userName_ | allowedFromDate | Разрешенная дата |
| users._userName_ | allowedUntilDate | Разрешенная дата до |
| users._userName_ | allowedWeekDays | Разрешенные дни недели<br> `{64: 'Monday', 32: 'Tuesday', 16: 'Wednesday', 8: 'Thursday', 4: 'Friday', 2: 'Saturday', 1: 'Sunday'}` |
| users._userName_ | allowedFromTime | Разрешенное время (в минутах от полуночи) |
| users._userName_ | allowedUntilTime | Разрешенное время до (в минутах от полуночи) |
| users._userName_ | authId | Идентификатор авторизации Smartlock |
| users._userName_ | dateCreated | Дата создания |
| users._userName_ | dateUpdated | Дата обновления |
| users._userName_ | dateLastActive | Последняя активная дата |
| users._userName_ | enabled | True, если пользователь включен |
| users._userName_ | id | Уникальный идентификатор пользователя |
| users._userName_ | lockCount | Количество блокировок |
| users._userName_ | имя | Имя пользователя |
| users._userName_ | remoteAllowed | True, если у аутентификатора есть удаленный доступ |
| users._userName_ | type | Тип авторизации<br> `{"0": 'APP', "1": 'BRIDGE', "2": 'FOB', "3": 'KEYPAD', "13": 'KEYPAD CODE', "14": 'Z-KEY', "15": 'VIRTUAL'}` |
| users._userName_ | type | Тип авторизации<br> `{&quot;0&quot;: &#39;ПРИЛОЖЕНИЕ&#39;, &quot;1&quot;: &#39;МОСТ&#39;, &quot;2&quot;: &#39;БРЕЛОК&#39;, &quot;3&quot;: &#39;КЛАВИАТУРА&#39;, &quot;13&quot;: &#39;КОД КЛАВИАТУРЫ&#39;, &quot;14&quot;: &#39;Z-КЛЮЧ&#39;, &quot;15&quot;: &#39;ВИРТУАЛЬНЫЙ&#39;}` |

## Интеграция умного дома и Alexa с использованием ioBroker.javascript
Несколько примеров возможной интеграции в ваш умный дом.

### Запирайте дверь в 22:00 вечера.
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

__Замените `nuki-extended.0.door__home_door.status.lockState` на lockState вашего замка!__ Вы также можете настроить сообщение с помощью `msg`.

### Позвольте Alexa информировать вас об изменениях в блокировках
Для этого требуется адаптер ioBroker ioBroker.alexa2 (https://github.com/Apollon77/ioBroker.alexa2).

Для использования голосового вывода Alexa мы определяем функцию ```say```. Поместите следующую функцию в скрипт в папке "global" ioBroker.javascript. ВАЖНО: Замените #ВАШ ALEXA ID# (также замените #) на ваш Alexa ID. Вы можете найти Alexa ID в дереве объектов ioBroker ```alexa2.0.Echo-Devices```.

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

Эту функцию можно использовать в ioBroker.javascript, чтобы произнести фразу с помощью Alexa ```say('Hello World')``` или ```say('Hello World', ['#YOUR ALEXA ID 1#', '#YOUR ALEXA ID 2#'])``` для голосового вывода с нескольких устройств.

Создайте скрипт в папке "common" ioBroker.javascript и добавьте в него следующий прослушиватель. ВАЖНО: Замените #LOCK STATE ID# (также замените #) на состояние, удерживающее статус блокировки (например, ```nuki-extended.0.door__home_door.status.lockState```):

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

### Позвольте Telegram информировать вас об изменениях в блокировках
Для этого требуется адаптер ioBroker ioBroker.telegram (https://github.com/iobroker-community-adapters/ioBroker.telegram).

Для использования вывода сообщений Telegram мы определяем функцию ```msg``` и ```messenger```. Поместите следующую функцию в скрипт в папке "global" ioBroker.javascript:

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

Вы можете использовать эту функцию в ioBroker.javascript для отправки чего-либо в Telegram через ```msg('Hello World')``` (всем пользователям) или ```msg('Hello World', 'Zefau')``` (определенным пользователям).

Создайте скрипт в папке "common" ioBroker.javascript и добавьте в него следующий прослушиватель. ВАЖНО: Замените #LOCK STATE ID# (также замените #) на состояние, удерживающее статус блокировки (например, ```nuki-extended.0.door__home_door.status.lockState```):

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

ПРИМЕЧАНИЕ: Если вы используете оба скрипта Alexa и Telegram, вы можете определить только один прослушиватель для обоих действий:

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

### Позвольте Telegram и Alexa информировать вас о звонке через Opener
Для этого требуется адаптер ioBroker ioBroker.telegram (https://github.com/iobroker-community-adapters/ioBroker.telegram) и адаптер ioBroker ioBroker.alexa2 (https://github.com/Apollon77/ioBroker.alexa2).

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

## Кредиты
Спасибо [@Mik13](https://github.com/Mik13) для [реализации API Nuki Bridge](https://github.com/Mik13/nuki-bridge-api#nuki-bridge-api).

Иконки, созданные <a href="https://www.flaticon.com/authors/smashicons" title="Смашиконы">Smashicons</a> ([Essential Set](https://www.flaticon.com/packs/essential-set-2)) и <a href="https://www.freepik.com/" title="Freepik">Freepik</a> ([Двери](https://www.flaticon.com/packs/doors)) с сайта <a href="https://www.flaticon.com/" title="Флатикон">www.flaticon.com,</a> лицензированы по лицензии <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>

## Changelog

Please see [release page](https://github.com/Zefau/ioBroker.nuki-extended/releases) for changelog and detailed information.

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.7.0 (2024-04-21)
* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 2.6.5 (2022-06-17)
* (Apollon77) Fix some crash cases reported by Sentry

### 2.6.4 (2022-06-16)
* (Apollon77) Fix some crash cases reported by Sentry

### 2.6.3 (2022-06-13)
* (theimo1221) Fix Web Api SetAction Call

### 2.6.2 (2022-06-13)
* (theimo1221) Fix Web Api Polling

### 2.6.1 (2022-06-09)
* (Apollon77) Fix Bridge functionality
* (simatec) Fix Admin display in dark mode

### 2.6.0 (2022-06-03)
* (Matze2010) Make additional refresh after callback configurable
* (theimo1221) Optimizations and fixes

### 2.5.0 (2022-05-27)
- (StrathCole) Allow web-api-only operation
- (Apollon77) Make compatible with Node.js 18.x
- (Apollon77) Add Sentry for crash reporting

### 2.4.0 (2021-12-13)
- (smaragdschlange) added support for Nuki Smart Door and Nuki Smart Lock 3.0 (Pro)

### v2.3.1 (2021-07-20)
- (Apollon77) Optimize for js-controller 3.3 and warnings prevented

### v2.3.0 (2020-08-10)
- (Zefau) added support for the door sensor of the Nuki Smartlock ([introduced with Bridge firmware 2.6.0 / 1.16.0](https://developer.nuki.io/t/bridge-beta-fw-2-6-0-1-16-0-with-door-sensor-state/6159))
- (Zefau) added support for the ring bell action of the Nuki Opener ([introduced with Bridge firmware 2.7.0 / 1.17.0](https://developer.nuki.io/t/bridge-beta-fw-2-7-0-1-17-0/6792))

### v2.2.6 (2020-07-14)
- (Zefau) fixed Web API not refreshing correctly (see [#59](https://github.com/Zefau/ioBroker.nuki-extended/issues/59))
- (Zefau) updated dependencies

### v2.2.5 (2020-03-19)
- (Zefau) fixed incorrect versioning

### v2.2.4 (2020-03-18)
- (Zefau) fixed incorrect dates of version history (see [#60](https://github.com/Zefau/ioBroker.nuki-extended/issues/60))

### v2.2.3 (2020-03-04)
- (Zefau) added refresh of configuration (via Nuki Web API) when any config item has been changed in ioBroker

### v2.2.2 (2020-03-04)
- (Zefau) fixed incorrect error message `Error triggering action via Nuki Bridge API: No Nuki Hex ID given!`
- (Zefau) added new error message if too many callbacks are already attached to Nuki Bridge (`Callback not attached because too many Callbacks attached to the Nuki Bridge already! Please delete a callback!`)

### v2.2.1 (2020-03-03)
- (Zefau) fixed incorrect state mapping of state `openerAdvancedConfig.doorbellSuppression`

  **Note:** Please delete the state `openerAdvancedConfig.doorbellSuppression` once manually and restart the adapter to take affect!
  
- (Zefau) updated dependencies

### v2.2.0 (2020-02-16)
- (Zefau) added possibility to change configuration of Nuki Smartlock or Nuki Opener (when using Web API)
- (Zefau) updated dependencies

### v2.1.0 (2020-02-03)
- (Zefau) added (optional) callback IP for Bridge API events (e.g. when ioBroker is run in docker; see [#51](https://github.com/Zefau/ioBroker.nuki-extended/issues/51))
- (Zefau) added dedicated buttons for each lock / opener action
- (Zefau) replaced `state.timestamp` with `state.lastDataUpdate` (indicates last data refresh from the APIs) and `state.lastStateUpdate` (indicates the last actual state change)

### v2.0.3 (2019-10-31)
- (Zefau) reintroduced support for hashed token on hardware bridges (see https://developer.nuki.io/page/nuki-bridge-http-api-190/4#heading--token)

### v2.0.2 (2019-10-31)
- (Zefau) added support for newly introduced nightmode (see https://nuki.io/de/blog/nuki-news-de/nuki-update-2019-der-winter-naht-sei-vorbereitet/)
- (Zefau) fixed incorrect behavior when bridges are defined insufficiently (no name, ip or token provided)

### v2.0.1 (2019-10-26)
- (Zefau) fixed missing `bridge_name`

### v2.0.0 (2019-10-24)
- (Zefau) added support for new Nuki Opener
- (Zefau) added support for hashed token on hardware bridges (see https://developer.nuki.io/page/nuki-bridge-http-api-190/4#heading--token)
- (Zefau) added fallback to Nuki Web API in case applied actions on Nuki Bridge API fail, e.g. due to bridge error 503 (see https://developer.nuki.io/t/random-http-503-unavailable/909/85?u=zefau)
- (Zefau) added retry in case applied actions on Nuki Bridge API fail (when Nuki Web API is not used)
- (Zefau) added option to regularly synchronise instead of using Bridge API callback
- (Zefau) added refreshing all states of Nuki Web API when callback is received via Nuki Bridge API
- (Zefau) added states for Nuki Notifications
- (Zefau) added support for multiple devices (including Nuki Opener) on adapter web interface
- (Zefau) added option to not retrieve all information (by deselecting `config` or `users`) via Nuki Web API

## License
The MIT License (MIT)

Copyright (c) 2024 iobroker-community-adapters <iobroker-community-adapters@gmx.de>
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