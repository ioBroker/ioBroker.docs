---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mihome-cloud/README.md
title: ioBroker.mihome-cloud
hash: EgFNTjhuXL4jCtUWDqmgspUKCYzhPQkzbql0DIzpl1o=
---
![Логотип](../../../en/adapterref/iobroker.mihome-cloud/admin/mihome-cloud.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.mihome-cloud.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.mihome-cloud.svg)
![Количество установок](https://iobroker.live/badges/mihome-cloud-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/mihome-cloud-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.mihome-cloud.png?downloads=true)

# IoBroker.mihome-cloud
**Тесты:** ![Тестирование и выпуск](https://github.com/TA2k/ioBroker.mihome-cloud/workflows/Test%20and%20Release/badge.svg)

## Адаптер mihome-cloud для ioBroker
Адаптер для всех устройств Mi Home Cloud. Подключается к API Xiaomi Cloud и предоставляет информацию о состоянии, управлении и выполнении сценариев для всех устройств, зарегистрированных в вашей учетной записи Mi Home.

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Для получения более подробной информации и сведений о том, как отключить отправку сообщений об ошибках, см. [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отправка сообщений Sentry используется начиная с js-controller 5.0.

## Требования
- Node.js >= 22
- js-controller >= 6.0.11
- Администратор >= 7.6.20

## Конфигурация
В настройках адаптера можно указать следующее:

| Настройки | Описание |
| ------------------- | --------------------------------------------------------------------------------------------------------- |
| **Регион** | Выберите регион Xiaomi Cloud, соответствующий вашему приложению Mi Home (Германия, Китай, Россия, Тайвань, Сингапур, США) |
| **Интервал обновления** | Интервал опроса в минутах для получения обновлений статуса устройства через API Xiaomi Cloud (минимум 1 минута в административном интерфейсе) |
| **Блокировать дополнительные попытки входа в систему во время выполнения** | Если включено, после первой попытки запуска автоматические попытки входа в систему во время выполнения не запускаются. |

## Авторизоваться
Адаптер использует **вход через URL-адрес** (в настройках адаптера не требуется вводить имя пользователя и пароль).

1. Настройте **Регион**, **Интервал обновления** и (при необходимости) **Блокировку дополнительных попыток входа в систему во время выполнения** в настройках адаптера и сохраните изменения.
2. Включите адаптер.
3. Если действительная сохраненная сессия недоступна, адаптер создает **URL-адрес для входа** и предоставляет к нему доступ в двух местах:
- в виде предупреждения в журнале адаптера
- в состоянии `mihome-cloud.0.auth.loginUrl`
4. Откройте URL-адрес в браузере и войдите в свою учетную запись Xiaomi.
5. Адаптер автоматически определяет успешный вход в систему и подключается.

Когда сессия истекает на стороне сервера, адаптер очищает недействительную сессию и переключается в состояние повторной аутентификации (`mihome-cloud.0.auth.status = reauth_required`).

- **Поведение при запуске**: Если при запуске адаптера отсутствует действительная сессия, запускается одна попытка входа в систему (генерация URL-адреса для входа).
- **Поведение во время выполнения**: Автоматические попытки повторного входа в систему запланированы после сбоев аутентификации/истечения срока действия сессии.
- **Дополнительная блокировка во время выполнения**: Если включена опция **Блокировать дополнительные попытки входа в систему во время выполнения**, то во время выполнения автоматические попытки входа в систему не запускаются.

Сессия сохраняется в `auth.session` и может быть повторно использована после перезапуска адаптера, если она все еще действительна.

## Дерево объектов
После запуска и входа в систему адаптер создает следующую структуру объектов:

### `mihome-cloud.0.info.connection`
Индикатор подключения (`true`/`false`) для сессии Xiaomi Cloud.

### `mihome-cloud.0.auth.*`
Состояния среды выполнения и сессии аутентификации:

- `auth.status` - текущее состояние аутентификации (например, `connected`, `qr_login_pending`, `reauth_required`, `cooldown_wait`)
- `auth.loginUrl` - текущий URL-адрес для входа в систему Xiaomi, используемый для авторизации через браузер.
- `auth.session` - сохраненный JSON-файл cookie/сессии для восстановления сессии

Для каждого устройства адаптер создает:

При изменении учетной записи Xiaomi или настроенного региона старые объекты устройств удаляются и создаются заново для текущей учетной записи/региона.

### `mihome-cloud.0.<device-id>.general`
Общая информация об устройстве (модель, название, версия прошивки и т. д.).

### `mihome-cloud.0.<device-id>.status`
Состояния, доступные только для чтения, из свойств спецификации MIoT (опрашиваются с заданным интервалом обновления).

В зависимости от анализа модели/спецификации могут существовать состояния индикаторов событий, но подписка на облачные события в данном адаптере в настоящее время не активна.

### `mihome-cloud.0.<device-id>.remote`
Свойства и действия спецификации MIoT, доступные для записи.

- Записываемые свойства передаются через MIoT `prop/set`.
- Действия отправляются через MIoT `action`.
- Действия с входными аргументами ожидают ввода в формате JSON в значении состояния.

После выполнения команд адаптер автоматически обновляет состояние в соответствии со спецификацией MIoT и пользовательскими состояниями (обновление состояния пылесоса продолжается в обычном цикле опроса).

### `mihome-cloud.0.<device-id>.custom`
Специфические для модели состояния из внутренних отображений `configDes` (например, вакуумные метрики, такие как `clean_area`, `clean_time`, `battery`).

### `mihome-cloud.0.<device-id>.remotePlugins`
Дополнительные команды для записи, извлеченные из пакетов плагинов Xiaomi (по мере возможности, зависит от плагина/модели).

### `mihome-cloud.0.scenes`
Создавайте интеллектуальные сценарии/автоматизации из вашей учетной записи Mi Home. Установите состояние сценария на `true`, чтобы его выполнить.

## Пример: Робот-пылесос для уборки комнаты
1. Найдите идентификаторы комнат:

`mihome-cloud.0.<id>.remote.get-map-room-list` – требует в качестве входных данных `[cur-map-id]`.

Текущий идентификатор карты можно получить из `mihome-cloud.0.<id>.status.cur-map-id`, или запросить список карт с помощью:

`mihome-cloud.0.<id>.remote.get-map-list` (ввод не требуется) → результат отображается в разделе `mihome-cloud.0.<id>.status.map-list`

2. Укажите идентификатор карты и запросите комнаты:

`mihome-cloud.0.<id>.remote.get-map-room-list` с входными данными `[<map-id>]`

→ Результат: `mihome-cloud.0.<id>.status.room-id-name-list`: `[{"name":"room1","id":10}]`

3. Начните уборку комнаты:

`mihome-cloud.0.<id>.remote.start-room-sweep` в формате `["10", "11", "12", "13"]`

   или

`mihome-cloud.0.<id>.remote.set-room-clean` в формате `["10",0,1]`

## Поиск неисправностей
- **Предупреждения типа «БД закрыта»**: Безвредны – теперь их можно предотвратить при завершении работы адаптера с помощью флага корректного завершения.
- **Ошибки «ECONNRESET»**: Временные сбои в сети Xiaomi Cloud. Адаптер автоматически повторит попытку при следующем интервале опроса.
- **"-106 Сеть устройства недоступна"**: Устройство (например, пылесос) в данный момент находится в автономном режиме, отключено от Wi-Fi или выключено. Адаптер запишет это как отладочную информацию и продолжит попытки подключения.
- **Ошибки аутентификации 401/400**: Адаптер очищает недействительную сессию и переходит в режим повторной аутентификации. Новый URL-адрес для входа предоставляется через предупреждение в журнале и `auth.loginUrl`, если включены автоматические попытки входа.
- **Нет нового URL-адреса для входа после истечения срока действия сессии**: Установите флажок **Блокировать дополнительные попытки входа во время выполнения**. Если этот флажок включен, автоматические повторные попытки во время выполнения по умолчанию отключаются.
- **Перестройка дерева устройств после изменения учетной записи/региона**: Ожидаемое поведение. Адаптер удаляет старые объекты устройств и создает их заново для активной учетной записи/региона.
- **Нет свойств для устройства**: Некоторые сенсорные устройства, работающие исключительно по протоколам Zigbee/Bluetooth (например, `lumi.sensor_switch.v2`), не отображают свой статус через облачный API. Рекомендуется использовать локальный адаптер Zigbee.

## Обсуждение и вопросы
<https://forum.iobroker.net/topic/59636/test-adapter-mihome-cloud>

## Changelog
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now

### 1.0.6 (2026-04-29)
- (lubepi) **NEW**: Added admin option to block additional automatic runtime login attempts to reduce log spam
- (lubepi) **ENHANCED**: Exposed Xiaomi login URL in `auth.loginUrl` for automation and easier re-authentication handling
- (lubepi) **ENHANCED**: Updated README
- (lubepi) **FIXED**: Suppress "DB closed" warnings during adapter shutdown and restart by implementing a clean shutdown flag
- (lubepi) **ENHANCED**: Optimized error handling to prevent uncontrolled adapter crashes from expired sessions and missing null guards

### 1.0.5 (2026-04-01)
- (lubepi) improve 401 authentication error handling and session reset
- (lubepi) validate and limit user configurable update interval
- (lubepi) update dependencies to address vulnerabilities

### 1.0.4 (2026-03-14)
- (lubepi) Maintenance update: Consolidated changelog and fixed repository metadata for better standards compliance

### 1.0.3 (2026-03-14)
- (lubepi) Improved error handling for network interruptions
- (lubepi) Migration to external i18n files and Node.js 20+ requirement
- (lubepi) Updated dependencies and fixed known vulnerabilities
- (lubepi) Added missing translations (uk, ru, pt, nl, fr, it, es, pl, zh-cn)
- (lubepi) Migration to ESLint flat config and release-script support

### 0.2.2

- (lubepi) Minor improvements with device handling

### 0.2.1

- (lubepi) Fix login. Check Log after starting Adapter

### 0.2.0

- (lubepi) Fix login

### 0.0.5

- (TA2k) Bugfixes

### 0.0.4

- (TA2k) initial release

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2023-2026 TA2k <tombox2020@gmail.com>

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