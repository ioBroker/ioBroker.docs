---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.nuki-extended/README.md
title: ioBroker.nuki-расширенный
hash: gZVj/D9w98YLqH5xqzxzt65Ef4puIsHGMUuDHo5+Krk=
---
![Логотип](../../../en/adapterref/iobroker.nuki-extended/admin/nuki-extended.png)

![Пожертвование PayPal](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![Количество установок](http://iobroker.live/badges/nuki-extended-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.nuki-extended.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.nuki-extended.svg)

# IoBroker.nuki-extended Этот адаптер ioBroker (ранее ioBroker.Nuki2) позволяет контролировать и контролировать [Nuki Smart Lock](https://nuki.io/de/smart-lock/) и/или [Nuki Opener](https://nuki.io/de/opener/) с использованием как [Nuki Bridge API (v1.9.0, 06.05.2019)](https://developer.nuki.io/page/nuki-bridge-http-api-170/4/#heading--introduction) и [Nuki Web API (v1. 2.0, 31.05.2019)](https://developer.nuki.io/page/nuki-web-api-111/3/).
![Тестируйте и выпускайте](https://github.com/iobroker-community-adapters/ioBroker.nuki-extended/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/nuki-extended/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам.** Дополнительные сведения и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

**Оглавление**

1. [Функции](#функции)
2. [Установка](#installation)
   1. [API Nuki Bridge](#nuki-bridge-api)
   2. [Нуки веб-API] (#nuki-web-api)
3. [Каналы и состояния](#channels--states)
4. [Интеграция Smart Home / Alexa с использованием ioBroker.javascript](#smart-home--alexa-integration-using-iobrokerjavascript)
   1. [Запирать дверь в 22:00 вечера](#lock-door-at-22:00-in-the-evening)
   2. [Позвольте Alexa информировать вас об изменениях блокировки](#let-alexa-inform-you-about-lock-changes)
   3. [Пусть Telegram информирует вас об изменении блокировки](#let-telegram-inform-you-about-lock-changes)
   4. [Позвольте Alexa и Telegram сообщить вам о том, что кто-то звонит через Opener](#let-telegram-and-alexa-inform-you-about-somebody-ringing-через-opener)
5. [Журнал изменений](#changelog)
6. [Кредиты](#кредиты)
7. [Лицензия](#license)

## Функции
- Поддержка Nuki Smartlock и Nuki Opener
- Поддержка как Nuki Bridge API, так и Nuki Web API.
- ~~Поддержка хешированного токена на аппаратных мостах (см. https://developer.nuki.io/page/nuki-bridge-http-api-190/4#heading--token)~~
- Возврат к Nuki Web API в случае сбоя примененных действий в Nuki Bridge API, например. из-за ошибки моста 503 (см. https://developer.nuki.io/t/random-http-503-unavailable/909/85?u=zefau)
- Повторите попытку в случае сбоя примененных действий к Nuki Bridge API (когда Nuki Web API не используется)
- Возможность регулярной синхронизации вместо использования обратного вызова API моста (который может быть отложен из-за аппаратного моста).
- Обновление всех состояний Nuki Web API при получении обратного вызова через Nuki Bridge API.
- Получить авторизованных пользователей для Nuki Smartlock и Nuki Opener (см. ниже [Каналы и состояния](#general-information))
- Получить конфигурацию для Nuki Smartlock и Nuki Opener (см. ниже [Каналы и состояния](#general-config))
- Получить настройки Nuki Notifications (см. ниже [Каналы и состояния] (#users))
- Веб-интерфейс, который показывает последние события с вашего Nuki Smartlock и Nuki Opener:

  ![Расширенный веб-интерфейс Nuki](../../../en/adapterref/iobroker.nuki-extended/img/screenshot_adapter-interface.png)

## Монтаж
### API моста Нуки
Как получить токен аппаратного моста (не работает для программных мостов):

1. Вызовите ```http://<bridge_ip>:<bridge_port>/auth``` из любого браузера в вашей сети. Мост включает свой светодиод.
2. Нажмите кнопку моста в течение 30 секунд.
3. Результат вызова браузера должен быть примерно таким:

```
{
   "token":"token123",
   "success":true
}
```

4. Использовать сгенерированный токен в адаптере nuki-extended.

### Веб-API Нуки
Чтобы использовать веб-API Nuki, выполните следующие действия:

1. Получите токен на странице https://web.nuki.io/de/#/admin/web-api.
2. Использовать этот токен в адаптере nuki-extended
3. Убедитесь, что ваши устройства nuki опубликованы в веб-API Nuki (используйте приложение для смартфона через настройки «Активировать Nuki Web»).

## Каналы и состояния
Если вы успешно настроили ioBroker.nuki-extended, будут созданы следующие каналы и состояния:

### Мосты (с Nuki Bridge API)
Мост будет создан как устройство с шаблоном имени ```bridge__<name of bridge>```. В каждом мосту будут созданы следующие каналы/состояния:

| Канал | состояние | Описание |
|:------- |:----- |:----------- |
| - | \_подключено | Флаг, указывающий, подключен ли мост к серверу Nuki |
| - | имя | Имя моста/сервера |
| - | идентификатор моста | ID моста/сервера |
| - | мостIp | IP-адрес моста |
| - | мостПорт | Порт моста |
| - | тип моста | Тип моста |
| - | аппаратный идентификатор | ID аппаратного моста (только аппаратный мост) |
| - | обновленный | Временная метка последнего обновления |
| - | время безотказной работы | Время работы моста в секундах |
| - | версияПрошивка | Версия прошивки мостов (только аппаратный мост) |
| - | версияWi-Fi | Версия прошивки модулей WiFi (только аппаратный мост) |
| - | versApp | Версия приложения моста (только программный мост) |
| обратные вызовы | - | Обратные вызовы моста |
| обратные вызовы | список | Список обратных вызовов |
| обратные вызовы._callbackId_ | \_удалить | Удалить обратный вызов |
| обратные вызовы._callbackId_ | URL-адрес | URL обратного вызова |

### Главная Информация
| Канал | государство | Описание |
|:------- |:----- |:----------- |
| - | соединение | Состояние подключения адаптера |
| - | мостаписинк | Указывает, активирована ли синхронизация через Bridge API |
| - | мостАпиПоследний | Отметка времени последней синхронизации API моста |
| - | веб-аписинк | Указывает, активирована ли синхронизация через веб-API |
| - | webApiПоследний | Отметка времени последней синхронизации веб-API |
| уведомления | - | Уведомления |
| уведомления._notificationIndex_ | - | - |
| уведомления._notificationIndex_.settings | - | Настройки уведомлений |
| уведомления._notificationIndex_.settings._settingsIndex_ | - | - |
| уведомления._notificationIndex_.settings._settingsIndex_ | идентификаторы | Набор идентификаторов аутентификации для фильтрации push-уведомлений для определенных пользователей или клавиатур. Если для всех пользователей и клавиатур не запускаются push-уведомления о входе |
| уведомления._notificationIndex_.settings._settingsIndex_ | smartlockId | Идентификатор смарт-замка, если он не установлен, все смарт-замки учетной записи включены для push-уведомлений |
| уведомления._notificationIndex_.settings._settingsIndex_ | события триггера | Набор, на котором должны срабатывать push-уведомления: блокировка, разблокировка, разблокировка, блокировка, открытие, звонок, дверной датчик, предупреждения, умный замок |
| уведомления._notificationIndex_ | язык | Язык push-сообщений |
| уведомления._notificationIndex_ | последняяактивнаядата | Последняя активная дата |
| уведомления._notificationIndex_ | идентификатор уведомления | Уникальный идентификатор уведомления для уведомления |
| уведомления._notificationIndex_ | ОС | Операционная система<br> `{"0": 'Android', "1": 'iOS', "2": 'Webhook'}` |
| уведомления._notificationIndex_ | идентификатор | Идентификатор push-уведомления или URL-адрес POST для веб-перехватчика |
| уведомления._notificationIndex_ | идентификатор ссылки | Идентификатор ссылки, идентификатор для идентификации внешней системы |
| уведомления._notificationIndex_ | статус | Текущее состояние активации<br> `{"0": 'INIT', "1": 'ACTIVE', "2": 'FAILED'}` |
| уведомления._notificationIndex_ | статус | Текущее состояние активации<br> `{&quot;0&quot;: &#39;INIT&#39;, &quot;1&quot;: &#39;ACTIVE&#39;, &quot;2&quot;: &#39;FAILED&#39;}` |

### Smartlocks и Opener (с Nuki Bridge API)
Замок будет создан как устройство с шаблоном имени ```door__<name of door>```. В каждом замке (при использовании Nuki Bridge API) будут созданы следующие каналы/состояния:

| Канал | состояние | Описание |
|:------- |:----- |:----------- |
| - | \_ДЕЙСТВИЕ | Активировать действие на замке |
| - | идентификатор | ID Нуки |
| - | имя | Имя Нуки |
| - | тип | Тип устройства |
| - | идентификатор моста | Идентификатор моста Нуки |
| статус | - | Текущее состояние замка |
| статус | аккумуляторКритический** | Состояние критического уровня заряда батареи |
| статус | состояние блокировки** | Текущее состояние блокировки Nuki |
| статус | заблокирован** | Индикация, если дверь заперта |
| статус | обновлен** | Временная метка последнего обновления |

_** отмеченные состояния будут обновлены в действии Nuki, если установлен обратный вызов_

### Smartlocks и Opener (с Nuki Web API)
Замок будет создан как устройство с шаблоном имени ```door__<name of door>```. В каждом замке будут созданы следующие каналы/состояния (при использовании Nuki Web API):

| Канал | состояние | Описание (возможные значения) |
|:------- |:----- |:----------------------------- |
| - | \_ДЕЙСТВИЕ | Активировать действие на замке |
| - | идентификатор | ID Нуки |
| - | имя | Имя Нуки |
| - | тип | Тип устройства |
| - | бревна | Журналы / История Нуки |
| - | идентификатор моста | Идентификатор моста Нуки |

#### Информация
| Канал | государство | Описание (возможные значения) |
|:------- |:----- |:----------------------------- |
| информация | - | Дополнительная информация |
| информация | идентификатор аккаунта | Идентификатор аккаунта |
| информация | идентификатор авторизации | Идентификатор авторизации |
| информация | любимый | Любимый флаг |
| информация | Версия прошивки | Версия прошивки |
| информация | аппаратная версия | Аппаратная версия |
| информация | идентификатор операции | Идентификатор операции — если он установлен, устройство заблокировано для другой операции |
| информация | состояние сервера | Состояние сервера<br> `{"0": 'OK', "1": 'UNREGISTERED', "2": 'AUTH UUID INVALID', "3": 'AUTH INVALID', "4": 'OFFLINE'}` |
| информация | adminPinState | Состояние PIN-кода администратора<br> `{&quot;0&quot;: &quot;ОК&quot;, &quot;1&quot;: &quot;ОТСУТСТВУЕТ&quot;, &quot;2&quot;: &quot;НЕДОПУСТИМО&quot;}` |
| информация | виртуальное устройство | Флаг, указывающий на виртуальный Smart Lock |
| информация | Дата Создано | Дата создания |
| информация | датаОбновлено | Дата обновления |

#### Состояние
| Канал | состояние | Описание (возможные значения) |
|:------- |:----- |:----------------------------- |
| государство | - | Текущее состояние замка |
| государство | аккумуляторКритический | Состояние критического уровня заряда батареи |
| состояние | закрытый | Индикация закрытия двери (логическое значение для doorState) |
| состояние | дверьСостояние | Текущее дверное состояние Нуки |
| государство | последнее действие | Последнее инициированное действие |
| состояние | состояние блокировки | Текущее состояние блокировки Nuki |
| состояние | заблокирован | Индикация, если дверь заперта |
| государство | режим | Режим умной блокировки<br> `{"0": 'UNINITIALIZED', "1": 'PAIRING', "2": 'NORMAL', "3": 'UNKNOWN', "4": 'MAINTENANCE'}` |
| государство | RingToOpenTimer | Оставшееся кольцо до открытого времени |
| государство | триггер | Триггер состояния<br> `{"0": 'SYSTEM', "1": 'MANUAL', "2": 'BUTTON', "3": 'AUTOMATIC', "4": 'WEB', "5": 'APP'}` |
| государство | триггер | Триггер состояния<br> `{&quot;0&quot;: &quot;СИСТЕМА&quot;, &quot;1&quot;: &quot;РУЧНОЙ&quot;, &quot;2&quot;: &quot;КНОПКА&quot;, &quot;3&quot;: &quot;АВТОМАТИЧЕСКИЙ&quot;, &quot;4&quot;: &quot;ВЕБ-СИСТЕМА&quot;, &quot;5&quot;: &quot;ПРИЛОЖЕНИЕ&quot;} ` |

#### Общая конфигурация
| Канал | государство | Описание (возможные значения) |
|:------- |:----- |:----------------------------- |
| конфигурация | - | Конфигурация |
| конфигурация | рекламный режим | Рекламный режим (экономия заряда батареи)<br> `{"0": 'AUTOMATIC', "1": 'NORMAL', "2": 'SLOW', "3": 'SLOWEST'}` |
| конфигурация | авторазблокировка | Истинно, если дверь должна быть разблокирована при отпирании (кнопка) |
| конфигурация | кнопка включена | Истинно, если кнопка на умном замке включена |
| конфигурация | возможности | Возможности указывают, возможно ли открытие двери через приложение, RTO или и то, и другое |
| конфигурация | fobAction1 | Действие брелка при однократном нажатии кнопки<br> `{"0": 'NONE', "1": 'UNLOCK', "2": 'LOCK', "3": 'LOCK_N_GO', "4": 'INTELLIGENT'}` |
| конфигурация | fobAction2 | Действие брелока при двойном нажатии кнопки<br> `{"0": 'NONE', "1": 'UNLOCK', "2": 'LOCK', "3": 'LOCK_N_GO', "4": 'INTELLIGENT'}` |
| конфигурация | fobAction3 | Действие брелока при нажатии кнопки 3 раза<br> `{"0": 'NONE', "1": 'UNLOCK', "2": 'LOCK', "3": 'LOCK_N_GO', "4": 'INTELLIGENT'}` |
| конфигурация | fobAction3 | Действие брелока при нажатии кнопки 3 раза<br> `{&quot;0&quot;: &#39;НЕТ&#39;, &quot;1&quot;: &#39;РАЗБЛОКИРОВАТЬ&#39;, &quot;2&quot;: &#39;БЛОКИРОВАТЬ&#39;, &quot;3&quot;: &#39;LOCK_N_GO&#39;, &quot;4&quot;: &#39;ИНТЕЛЛЕКТУАЛЬНЫЙ&#39;}` |
| конфигурация | брелокПарный | Истинно, если брелок сопряжен со смарт-замком |
| конфигурация | gpsширота | Широта |
| конфигурация | домашний комплектсостояние | Состояние домашнего комплекта<br> `{"0": 'UNAVAILABLE', "1": 'DISABLED', "2": 'ENABLED', "3": 'ENABLED & PAIRED'}` |
| конфигурация | домашний комплектсостояние | Состояние домашнего комплекта<br> `{&quot;0&quot;: &quot;НЕДОСТУПНО&quot;, &quot;1&quot;: &quot;ОТКЛЮЧЕНО&quot;, &quot;2&quot;: &quot;ВКЛЮЧЕНО&quot;, &quot;3&quot;: &quot;ВКЛЮЧЕНО И СОПРЯЖЕНО&quot;}` |
| конфигурация | клавиатура Парная | Истинно, если клавиатура сопряжена со смарт-замком |
| конфигурация | светодиодЯркость | Яркость светодиода: от 0 (выкл.) до 5 (макс.) |
| конфигурация | светодиод включен | Истинно, если светодиод на умном замке включен |
| конфигурация | имя | Название смартлока для новых пользователей |
| конфигурация | режим работы | Режим работы открывалки |
| конфигурация | сопряжение включено | Истинно, если сопряжение разрешено с помощью кнопки смарт-замка |
| конфигурация | одиночный замок | Истинно, если смарт-замок должен блокироваться только один раз (а не дважды) |
| конфигурация | часовой пояс | Идентификатор часового пояса |
| конфигурация | часовой поясСмещение | Смещение часового пояса (в минутах) |

#### Расширенная конфигурация
| Канал | государство | Описание (возможные значения) |
|:------- |:----- |:----------------------------- |
| расширенная конфигурация | - | Расширенная конфигурация |
| расширенная конфигурация | автоблокировкатаймаут | Секунды до того, как интеллектуальный замок снова заблокируется после того, как он был разблокирован. Нет автоматической блокировки, если значение равно 0. |
| расширенная конфигурация | автоматическое определение типа батареи | Флаг, указывающий, включено ли автоматическое определение типа батареи |
| расширенная конфигурация | тип батареи | Тип батареек в умном замке<br> `{"0": 'ALKALI', "1": 'ACCUMULATOR', "2": 'LITHIUM'}` |
| расширенная конфигурация | двойная кнопка нажатия кнопки | Желаемое действие, если кнопка нажата дважды<br> `{"0": "NO_ACTION", "1": "INTELLIGENT", "2": "UNLOCK", "3": "LOCK", "4": "UNLATCH", "5": "LOCK_N_GO", "6": "SHOW_STATUS"}` |
| расширенная конфигурация | двойная кнопка нажатия кнопки | Желаемое действие, если кнопка нажата дважды<br> `{&quot;0&quot;: &quot;NO_ACTION&quot;, &quot;1&quot;: &quot;INTELLIGENT&quot;, &quot;2&quot;: &quot;РАЗБЛОКИРОВАТЬ&quot;, &quot;3&quot;: &quot;БЛОКИРОВАТЬ&quot;, &quot;4&quot;: &quot;РАЗБЛОКИРОВАТЬ&quot;, &quot;5&quot;: &quot;LOCK_N_GO&quot;, &quot;6&quot;: &quot;SHOW_STATUS&quot;}` |
| расширенная конфигурация | lngTimeout | Тайм-аут в секундах для lock ‘n’ go |
| расширенная конфигурация | однокнопкаPressAction | Желаемое действие, если кнопка нажата один раз<br> `{"0": "NO_ACTION", "1": "INTELLIGENT", "2": "UNLOCK", "3": "LOCK", "4": "UNLATCH", "5": "LOCK_N_GO", "6": "SHOW_STATUS"}` |
| расширенная конфигурация | однокнопкаPressAction | Желаемое действие, если кнопка нажата один раз<br> `{&quot;0&quot;: &quot;NO_ACTION&quot;, &quot;1&quot;: &quot;INTELLIGENT&quot;, &quot;2&quot;: &quot;РАЗБЛОКИРОВАТЬ&quot;, &quot;3&quot;: &quot;БЛОКИРОВАТЬ&quot;, &quot;4&quot;: &quot;РАЗБЛОКИРОВАТЬ&quot;, &quot;5&quot;: &quot;LOCK_N_GO&quot;, &quot;6&quot;: &quot;SHOW_STATUS&quot;}` |
| расширенная конфигурация | singleLockedPositionOffsetDegrees | Смещение, которое изменяет одно заблокированное положение |
| расширенная конфигурация | всего градусов | Абсолютное общее положение в градусах, которое было достигнуто во время калибровки |
| расширенная конфигурация | unlatchDuration | Продолжительность удержания защелки в незапертом положении в секундах |
| расширенная конфигурация | разблокированоPositionOffsetDegrees | Смещение, изменяющее разблокированное положение |
| расширенная конфигурация | разблокированныйToLockedTransitionOffsetDegrees | Смещение, которое изменяет положение, в котором происходит переход от разблокированного к заблокированному |

#### Расширенная конфигурация открывателя
| Канал | состояние | Описание (возможные значения) |
|:------- |:----- |:----------------------------- |
| openerAdvancedConfig | - | Конфигурация открывателя |
| openerAdvancedConfig | интерком | Идентификатор базы данных подключенного домофона |
| openerAdvancedConfig | переключатель режима шины | Метод переключения между данными и аналоговым режимом<br> `{"0": 'DATA MODE', "1": 'ANALOGUE MODE'}` |
| openerAdvancedConfig | короткая цепьДлительность | Длительность короткого замыкания на переключение режима BUS в мс |
| openerAdvancedConfig | электрическаязадержка забастовки | Задержка срабатывания защёлки в мс (после действия замка 3 -срабатывание защёлки-) |
| openerAdvancedConfig | случайная задержка электрического удара | Random electricStrikeDelay (диапазон 3000 - 7000 мс) для имитации человека внутри, активирующего электрическую защелку |
| openerAdvancedConfig | электрическийПродолжительность забастовки | Продолжительность в мс срабатывания защёлки (действие замка 3 -срабатывание защёлки-) |
| openerAdvancedConfig | отключитьRtoAfterRing | Флаг отключения RTO после звонка |
| openerAdvancedConfig | дверной звонокПодавление | Режим подавления дверного звонка<br> `{"0": 'NEVER', "1": 'ALWAYS', "2": 'RTO', "3": 'CONTINUOUS', "4": 'CONTINUOUS + RTO'}` |
| openerAdvancedConfig | дверной звонокПодавление | Режим подавления дверного звонка<br> `{&quot;0&quot;: &#39;НИКОГДА&#39;, &quot;1&quot;: &#39;ВСЕГДА&#39;, &quot;2&quot;: &#39;RTO&#39;, &quot;3&quot;: &#39;НЕПРЕРЫВНО&#39;, &quot;4&quot;: &#39;НЕПРЕРЫВНО + RTO&#39;}` |
| openerAdvancedConfig | дверной звонокПодавлениеДлительность | Продолжительность подавления дверного звонка в мс (только в режиме работы 2-цифровой Интерком-) |
| openerAdvancedConfig | звуковое кольцо | Звук для кольца |
| openerAdvancedConfig | звукОткрыть | Звук для открытия |
| openerAdvancedConfig | звукRto | Звук для РТО |
| openerAdvancedConfig | звуксм | Звук для СМ |
| openerAdvancedConfig | звукПодтверждение | Звуковое подтверждение |
| openerAdvancedConfig | уровень звука | Уровень звука |
| openerAdvancedConfig | однокнопкаPressAction | Желаемое действие при однократном нажатии кнопки |
| openerAdvancedConfig | тип батареи | Тип батареек в умном замке<br> `{"0": 'ALKALI', "1": 'ACCUMULATOR', "2": 'LITHIUM'}` |
| openerAdvancedConfig | тип батареи | Тип батареек в умном замке<br> `{&quot;0&quot;: &#39;ЩЕЛОЧНОЙ&#39;, &quot;1&quot;: &#39;АККУМУЛЯТОР&#39;, &quot;2&quot;: &#39;ЛИТИЙ&#39;}` |
| openerAdvancedConfig | автоматическое определение типа батареи | Флаг, указывающий, включено ли автоматическое определение типа батареи |
| openerAdvancedConfig | идентификатор операции | Идентификатор операции - если заданное устройство заблокировано для другой операции |

#### Пользователи
| Канал | состояние | Описание (возможные значения) |
|:------- |:----- |:----------------------------- |
| пользователи | - | Пользователи блокировки |
| пользователи._имя_пользователя_ | - | Пользователь _userName_ |
| пользователи._имя_пользователя_ | разрешено с даты | Разрешено с даты |
| пользователи._имя_пользователя_ | разрешено до даты | Разрешено до даты |
| пользователи._имя_пользователя_ | разрешеноДни недели | Разрешенные дни недели<br> `{64: 'Monday', 32: 'Tuesday', 16: 'Wednesday', 8: 'Thursday', 4: 'Friday', 2: 'Saturday', 1: 'Sunday'}` |
| пользователи._имя_пользователя_ | разрешено из времени | Разрешенное время (в минутах от полуночи) |
| пользователи._имя_пользователя_ | разрешено до времени | Разрешенное до времени (в минутах от полуночи) |
| пользователи._имя_пользователя_ | идентификатор авторизации | Идентификатор авторизации смарт-замка |
| пользователи._имя_пользователя_ | Дата Создано | Дата создания |
| пользователи._имя_пользователя_ | датаОбновлено | Дата обновления |
| пользователи._имя_пользователя_ | ДатаПоследняяАктивность | Последняя активная дата |
| пользователи._имя_пользователя_ | включен | Истинно, если пользователь включен |
| пользователи._имя_пользователя_ | идентификатор | Уникальный идентификатор пользователя |
| пользователи._имя_пользователя_ | блокировка | Количество блокировок |
| пользователи._имя_пользователя_ | имя | Имя пользователя |
| пользователи._имя_пользователя_ | удаленно разрешено | Истинно, если авторизация имеет удаленный доступ |
| пользователи._имя_пользователя_ | тип | Тип авторизации<br> `{"0": 'APP', "1": 'BRIDGE', "2": 'FOB', "3": 'KEYPAD', "13": 'KEYPAD CODE', "14": 'Z-KEY', "15": 'VIRTUAL'}` |
| пользователи._имя_пользователя_ | тип | Тип авторизации<br> `{&quot;0&quot;: &quot;ПРИЛОЖЕНИЕ&quot;, &quot;1&quot;: &quot;МОСТ&quot;, &quot;2&quot;: &quot;БРЕЛОК&quot;, &quot;3&quot;: &quot;КЛАВИАТУРА&quot;, &quot;13&quot;: &quot;КОД КЛАВИАТУРЫ&quot;, &quot;14&quot;: &quot;Z- KEY&#39;, &quot;15&quot;: &#39;ВИРТУАЛЬНЫЙ&#39;}` |

## Интеграция Smart Home / Alexa с использованием ioBroker.javascript
Несколько примеров возможной интеграции в ваш умный дом.

### Закрой дверь в 22:00 вечера
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

### Пусть Alexa сообщит вам об изменении блокировки
Для этого требуется адаптер ioBroker ioBroker.alexa2 (https://github.com/Apollon77/ioBroker.alexa2).

Чтобы использовать голосовой вывод Alexa, мы определяем функцию ```say```. Поместите следующую функцию в скрипт в «глобальную» папку ioBroker.javascript. ВАЖНО: замените #YOUR ALEXA ID# (также замените #) на свой Alexa ID. Вы можете найти Alexa ID в дереве объектов ioBroker ```alexa2.0.Echo-Devices```.

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

Вы можете использовать эту функцию в ioBroker.javascript, чтобы произнести фразу, используя Alexa ```say('Hello World')``` или ```say('Hello World', ['#YOUR ALEXA ID 1#', '#YOUR ALEXA ID 2#'])``` для голосового вывода с нескольких устройств.

Создайте скрипт в папке «common» ioBroker.javascript и добавьте к нему следующий слушатель. ВАЖНО: Замените #LOCK STATE ID# (также замените #) на состояние, удерживающее статус блокировки (например, ```nuki-extended.0.door__home_door.status.lockState```):

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

### Пусть Telegram информирует вас об изменении блокировки
Для этого требуется адаптер ioBroker ioBroker.telegram (https://github.com/iobroker-community-adapters/ioBroker.telegram).

Чтобы использовать вывод сообщений Telegram, мы определяем функцию ```msg``` и ```messenger```. Поместите следующую функцию в скрипт в «глобальную» папку ioBroker.javascript:

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

Вы можете использовать эту функцию в ioBroker.javascript для отправки чего-либо в Telegram через ```msg('Hello World')``` (для всех пользователей) или ```msg('Hello World', 'Zefau')``` (для определенных пользователей).

Создайте скрипт в папке «common» ioBroker.javascript и добавьте к нему следующий слушатель. ВАЖНО: Замените #LOCK STATE ID# (также замените #) на состояние, удерживающее статус блокировки (например, ```nuki-extended.0.door__home_door.status.lockState```):

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

ПРИМЕЧАНИЕ. Если вы используете сценарий Alexa и Telegram, вы можете определить только один прослушиватель для обоих действий:

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

### Пусть Telegram и Alexa сообщат вам о звонке через Opener
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
Спасибо [@Mik13](https://github.com/Mik13) для [реализации Nuki Bridge API](https://github.com/Mik13/nuki-bridge-api#nuki-bridge-api).

Иконки, сделанные <a href="https://www.flaticon.com/authors/smashicons" title="Смэшиконы">Smashicons</a> ([Essential Set](https://www.flaticon.com/packs/essential-set-2)) и <a href="https://www.freepik.com/" title="Фрипик">Freepik</a> ([Doors](https://www.flaticon.com/packs/doors)) с <a href="https://www.flaticon.com/" title="Флатикон">сайта www.flaticon.com</a> , имеют лицензию <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a> .

## Changelog

Please see [release page](https://github.com/Zefau/ioBroker.nuki-extended/releases) for changelog and detailed information.

<!-- ### __WORK IN PROGRESS__ -->
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
