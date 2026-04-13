---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mihome-cloud/README.md
title: ioBroker.mihome-cloud
hash: MAZ2H0yS5SFp1zG4VizqNi3Wndc4JrvDqZerO2GB6U0=
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
- Node.js >= 20
- js-controller >= 6.0.11
- Администратор >= 7.6.20

## Конфигурация
В настройках адаптера можно указать следующее:

| Настройки | Описание |
| ------------------- | --------------------------------------------------------------------------------------------------------- |
| **Регион** | Выберите регион Xiaomi Cloud, соответствующий вашему приложению Mi Home (Германия, Китай, Россия, Тайвань, Сингапур, США) |
| **Интервал обновления** | Интервал опроса в минутах (минимум 1 минута) |

## Авторизоваться
Адаптер использует **вход через URL-адрес** (в настройках адаптера не требуется вводить имя пользователя и пароль).

1. Настройте **Регион** и **Интервал** в параметрах адаптера и сохраните изменения.
2. Включите адаптер.
3. Проверьте журнал адаптера – там появится **URL-адрес для входа**:

```
XIAOMI CLOUD LOGIN REQUIRED
Please visit this URL in your browser and log in: https://account.xiaomi.com/...
```

4. Откройте URL-адрес в браузере и войдите в свою учетную запись Xiaomi.
5. Адаптер автоматически определяет успешный вход в систему и подключается.

Сессия сохраняется и остается активной после перезапуска адаптера. Новый вход в систему требуется только в том случае, если сессия истекает на стороне сервера.

## Дерево объектов
После успешного входа в систему адаптер создает для каждого устройства следующую структуру объектов:

### `mihome-cloud.0.<device-id>.general`
Общая информация об устройстве (модель, название, версия прошивки и т. д.).

### `mihome-cloud.0.<device-id>.status`
Значения состояния, доступные только для чтения, из спецификации MIoT (например, состояние питания, яркость, температура). Они опрашиваются с заданным интервалом.

### `mihome-cloud.0.<device-id>.remote`
Команды управления с возможностью записи из спецификации MIoT. Для отправки команды установите состояние (неподтверждено) в `true` или в требуемое значение.

Если команда ожидает входные параметры, они указываются в названии состояния, а ожидаемые идентификаторы отображаются в качестве значений по умолчанию.

### `mihome-cloud.0.<device-id>.custom`
Специфические для устройства свойства из внутренней базы данных `configDes` (например, для пылесосов: `clean_area`, `clean_time`, `battery`). Они опрашиваются через `get_prop` / `get_status`.

### `mihome-cloud.0.<device-id>.remotePlugins`
Дополнительные команды, извлеченные из облачных плагинов Xiaomi. Они автоматически обнаруживаются при запуске путем анализа пакетов плагинов для каждой модели устройства.

### `mihome-cloud.0.scenes`
Создавайте интеллектуальные сценарии/автоматизации из вашей учетной записи Mi Home. Установите сценарий на `true`, чтобы он был выполнен.

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
- **Ошибки "DB closed"**: Безвредны – возникают, когда адаптер останавливается, пока запрос еще ожидает обработки. Эти ошибки автоматически подавляются.
- **Ошибки «ECONNRESET»**: Временные сбои в сети Xiaomi Cloud. Адаптер автоматически повторит попытку при следующем интервале опроса.
- **"-106 Сеть устройства недоступна"**: Устройство (например, пылесос) в данный момент находится в автономном режиме, отключено от Wi-Fi или выключено. Адаптер запишет это как отладочную информацию и продолжит попытки подключения.
- **Ошибка 401**: Срок действия сессии истек на стороне сервера. Перезапустите адаптер, чтобы активировать новую авторизацию с помощью QR-кода.
- **Нет свойств для устройства**: Некоторые сенсорные устройства, работающие исключительно по протоколам Zigbee/Bluetooth (например, `lumi.sensor_switch.v2`), не отображают свой статус через облачный API. Рекомендуется использовать локальный адаптер Zigbee.

## Обсуждение и вопросы
<https://forum.iobroker.net/topic/59636/test-adapter-mihome-cloud>

## Changelog
### 1.0.5 (2026-04-01)
- (fix) improve 401 authentication error handling and session reset
- (fix) validate and limit user configurable update interval
- (fix) update dependencies to address vulnerabilities

### 1.0.4 (2026-03-14)
- Maintenance update: Consolidated changelog and fixed repository metadata for better standards compliance

### 1.0.3 (2026-03-14)
- **Major update with complete rewrite:**
  - New QR-code based login flow
  - Support for many new Xiaomi device models (Air Purifiers 4 series, newer fans/heaters, robot vacuums)
  - Added environment properties (Temperature, Humidity) to many device configurations
  - Improved error handling for network interruptions
  - Migration to external i18n files and Node.js 20+ requirement
  - Updated dependencies and fixed known vulnerabilities
  - Added missing translations (uk, ru, pt, nl, fr, it, es, pl, zh-cn)
  - Migration to ESLint flat config and release-script support

### 0.2.2

- Minor improvements with device handling

### 0.2.1

- Fix login. Check Log after starting Adapter

### 0.2.0

- (lubepi) Fix login

### 0.0.5

- (TA2k) Bugfixes

### 0.0.4

- (TA2k) initial release

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