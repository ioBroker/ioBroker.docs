---
chapters: {"pages":{"en/adapterref/iobroker.grohe-smarthome/README.md":{"title":{"en":"ioBroker.grohe-smarthome"},"content":"en/adapterref/iobroker.grohe-smarthome/README.md"},"en/adapterref/iobroker.grohe-smarthome/docs/en/README.md":{"title":{"en":"ioBroker Grohe Smarthome Adapter"},"content":"en/adapterref/iobroker.grohe-smarthome/docs/en/README.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.grohe-smarthome/docs/en/README.md
title: Адаптер ioBroker Grohe для умного дома
hash: 3ZJorsCs1wuZnr/O235TZKV4TgaQZc0DMZUZ2ZdmPR4=
---
# IoBroker Адаптер Grohe для умного дома
Этот адаптер подключает ioBroker к облаку **Grohe Smarthome / Ondus** и предоставляет доступ к устройствам Grohe в виде состояний и элементов управления внутри ioBroker.

Поддерживаемые устройства:

| Устройство | Тип |
|---|---|
| **Grohe Sense** | `101` |
| **Grohe Blue Home** | `104` |
| **Grohe Blue Professional** | `105` |
| **Grohe Blue Professional** | `105` |

Адаптер выполняет вход через поток OIDC/Keycloak от Grohe, сохраняет **зашифрованный токен обновления** в определенном состоянии и опрашивает облачный API Grohe с настраиваемым интервалом.

Идеи и концепция были почерпнуты из интеграции Home Assistant **ha-grohe_smarthome**. Особая благодарность **Flo-Schilli**.

---

## Конфигурация
Настройки адаптера разделены на две вкладки.

### Вкладка «Настройки»
| Настройки | Описание |
|---|---|
| **Электронная почта** | Адрес электронной почты вашей учетной записи Grohe / Ondus |
| **Пароль** | Пароль от вашей учетной записи Grohe / Ondus |
| **Интервал опроса (секунды)** | Интервал опроса - минимум **60 с**, по умолчанию **300 с** |
| **Необработанные состояния** | Выводит полную структуру ответа API в лог для диагностики. Опрос прекращается после 3 циклов. Отключите и перезапустите для нормальной работы. |

> Адаптер хранит токен обновления в состоянии `auth.refreshToken` (зашифрованном), **а не** в конфигурации. Запись в конфигурацию вызовет перезапуск и нарушит поток токенов.

### Вкладка «Уведомления»
Включите push-уведомления, чтобы получать информацию о событиях на устройстве. Сообщения будут отправляться на языке, настроенном в вашей системе ioBroker.

#### Категории уведомлений
| # | Категория | Примеры |
|---|---|---|
| 1 | **Критические тревоги** | Обнаружено затопление, ошибки датчиков, системные ошибки |
| 2 | **Предупреждения** | Низкий заряд батареи, температура/влажность вне допустимого диапазона, потеря Wi-Fi, устройство подключено/отключено, низкий уровень синего фильтра/CO₂ |
| 3 | **События, связанные с клапанами и управлением** | Клапан открыт/закрыт, подача воды |
| 4 | **Ошибки подключения** | Сбои HTTP-опроса (например, HTTP 403), отправляются при каждом сбое |

#### Значки уведомлений
| Иконка | Значение |
|---|---|
| 🚨 | Критическая тревога (категория Grohe 30) |
| ⚠️ | Предупреждение (категория Grohe 20), устройство отключено, ошибка опроса |
| ✅ | Устройство подключено, опрос восстановлен |
| 🔓 | Клапан открыт |
| 🔒 | Клапан закрыт |
| 💧 | Вода подана |
| ℹ️ | Последнее уведомление изменено |

#### Поддерживаемые поставщики
| Поставщик | Примечания |
|---|---|
| **Телеграм** | Экземпляр; при желании идентификатор пользователя или чата |
| **Pushover** | Экземпляр; опционально название, устройство |
| **WhatsApp** (`whatsapp-cmb`) | Экземпляр; номер телефона (по желанию) |
| **Сигнал** (`signal-cmb`) | Экземпляр; номер телефона (необязательно) |
| **Матрица** (`matrix-org`) | Экземпляр |
| **Матрица** (`matrix-org`) | Экземпляр |
| **Чат Synology** | Экземпляр; название канала (обязательно) |

---

## Диспетчер устройств
Адаптер интегрируется с **Диспетчером устройств** ioBroker. Выберите зарегистрированное устройство Grohe, чтобы открыть его плитку.

### Плитка устройства
На каждом блоке отображаются индикаторы состояния в реальном времени и ключевые показатели, которые можно быстро просмотреть.

| Устройство | Индикаторы состояния | Значения плиток |
|---|---|---|
| **Grohe Sense** | Онлайн, качество Wi-Fi, батарея | Температура, влажность, батарея |
| **Grohe Sense Guard** | Онлайн, качество Wi-Fi, предупреждение клапана | Температура воды, расход, давление, суточный расход, открытие/закрытие клапана |
| **Grohe Blue** | Онлайн, качество Wi-Fi | Остаток CO₂, остаток фильтра, последнее измерение |

### Подробный просмотр (вкладка «Информация»)
Щелкните по плитке, чтобы открыть подробное представление. На вкладке **Информация** отображается:

- Идентификатор устройства, тип устройства, статус подключения к сети, доступные обновления, качество Wi-Fi.
- Последнее уведомление и отметка времени
- Измерения, специфичные для конкретного устройства (см. разделы по каждому устройству ниже)

### Подробный просмотр (вкладка «Управление»)
Вкладка **Управление** доступна для устройств Grohe Sense Guard и Grohe Blue. Она организована в функциональные группы, каждая из которых отделена разделителем.

**Grohe Sense Guard - вкладка «Управление»:**

| Группа | Управление |
|---|---|
| **Управление клапаном** | Кнопка открытия клапана, кнопка закрытия клапана |
| **Измерение давления** | Кнопка запуска *(клапан должен быть закрыт - см. примечание ниже)* |
| **Отложить** | Индикатор активности (только для чтения), ввод продолжительности (1-240 мин), кнопка запуска отложенного сигнала, кнопка остановки отложенного сигнала |
| **Ограничения по водопотреблению** | Ввод лимита объема забора воды (0-2000 л) |
| **Режим полива** | Время начала (ч + мин), Время окончания (ч + мин), Активные дни (пн-вс), Кнопка сохранения |

> **Примечание по измерению давления:** Проверка трубопровода (Leitungscheck) выполняется устройством автоматически - обычно ночью, когда вода не течет. Нажатие кнопки запуска отправляет команду `measure_now`, которую устройство выполнит только тогда, когда **клапан закрыт** и вода не течет. Результаты всегда отображаются в состояниях `pressureMeasurement.*` независимо от того, был ли тест запущен вручную или автоматически.

> **Примечание по настройкам системы полива:** Изменения отдельных полей системы полива (время, переключение дней) подтверждаются локально, но **не** немедленно отправляются в API. Нажмите **Сохранить настройки системы полива**, чтобы отправить все значения одним вызовом API. Это позволит избежать выполнения более 7 вызовов API при пошаговом переключении дней недели.

> **Примечание об ограничении суммы снятия средств и настройках системы полива:** Эти значения считываются из API Grohe каждые 10 циклов опроса (примерно 50 минут с интервалом 300 секунд, всегда при первом опросе). Изменения, внесенные в приложение Grohe, будут отражены в ioBroker в течение этого периода.

**Grohe Blue Home / Professional - вкладка «Управление»:**

| Группа | Управление |
|---|---|
| **Дозировка** | Тип крана (негазированный / среднегазированный / газированный), Количество (мл), Кнопка дозирования |
| **Сервис** | Кнопка сброса CO₂, кнопка сброса фильтра |

---

## Структура состояния ioBroker
Устройства создаются в пространстве имен адаптера:

```
grohe-smarthome.0.<applianceId>.*
```

### Состояния, общие для всех устройств
```
<applianceId>.status.online                 boolean
<applianceId>.status.updateAvailable        boolean
<applianceId>.status.wifiQuality            number (if available)

<applianceId>.notifications.latestMessage       string
<applianceId>.notifications.latestTimestamp     string (date)
<applianceId>.notifications.latestCategory      number
<applianceId>.notifications.latestCategoryName  string
<applianceId>.notifications.latestType          number
```

Категории уведомлений Grohe: `0` Реклама · `10` Информация · `20` Предупреждение · `30` Тревога · `40` WebURL

---

## Grohe Sense (тип 101)
### Измерения
```
<applianceId>.temperature           °C
<applianceId>.humidity              %
<applianceId>.battery               %
<applianceId>.lastMeasurement       date string
```

---

## Grohe Sense Guard (тип 103)
### Измерения
```
<applianceId>.temperature           °C    water temperature
<applianceId>.flowRate              l/min
<applianceId>.pressure              bar
<applianceId>.lastMeasurement       date string
<applianceId>.valveOpen             boolean (indicator – read only)
```

### Канал потребления
```
<applianceId>.consumption.daily                  l
<applianceId>.consumption.averageDaily           l
<applianceId>.consumption.averageMonthly         l
<applianceId>.consumption.totalWaterConsumption  l   (calculated, see note)
<applianceId>.consumption.lastWaterConsumption   l
<applianceId>.consumption.lastMaxFlowRate        l/min
```

> **`totalWaterConsumption`:** API панели управления Grohe не предоставляет надежных итоговых данных. Адаптер вычисляет их на основе `/data/aggregated`: один раз в день извлекается историческая сумма (дата установки → сегодняшний день, сгруппированная по годам); каждые 5 опросов к ней добавляется потребление за текущий день.

### Канал измерения давления
Обновляется после каждого 10-го опроса. Отображается только при наличии данных от API (изначально может отсутствовать).

```
<applianceId>.pressureMeasurement.dropOfPressure   bar
<applianceId>.pressureMeasurement.isLeakage        boolean
<applianceId>.pressureMeasurement.leakageLevel     string
<applianceId>.pressureMeasurement.startTime        date string
```

> Проверка трубопровода выполняется автоматически (обычно в течение ночи). Кнопка `startPressureMeasurement` может запустить её вручную, но **клапан должен быть закрыт**, и вода не должна течь, чтобы устройство приняло и выполнило команду. Уведомление `20_333` (Проверка трубопровода завершена) отправляется после завершения теста.

### Элементы управления
Элементы управления доступны на вкладке **Элементы управления** в подробном представлении диспетчера устройств, а также в виде записываемых состояний ioBroker.

**Клапан:**

```
<applianceId>.controls.valveOpen       boolean button – opens the valve
<applianceId>.controls.valveClose      boolean button – closes the valve
```

**Измерение давления:**

```
<applianceId>.controls.startPressureMeasurement   boolean button
```

> Перед срабатыванием клапана его необходимо закрыть. Устройство автоматически выполняет проверку при выполнении условий.

**Отложить** - временно отключает будильник:

```
<applianceId>.controls.snooze.active     boolean (read-only) – snooze currently active
<applianceId>.controls.snooze.duration   number  1–240 min
<applianceId>.controls.snooze.start      boolean button – activates snooze for the set duration
<applianceId>.controls.snooze.stop       boolean button – deactivates snooze immediately
```

Состояние `active` считывается из API Grohe каждые 3 опроса и обновляется сразу после запуска/остановки.

**Ограничения по водопотреблению:**

```
<applianceId>.controls.withdrawalAmountLimit   number  0–2000 l
```

Установка этого значения немедленно записывает данные в API Grohe. Значение повторно считывается из API каждые 10 запросов.

**Режим полива** - график полива/орошения:

```
<applianceId>.controls.sprinkler.startHour      number  0–23 h
<applianceId>.controls.sprinkler.startMinute    number  0–59 min
<applianceId>.controls.sprinkler.stopHour       number  0–23 h
<applianceId>.controls.sprinkler.stopMinute     number  0–59 min

<applianceId>.controls.sprinkler.activeMonday     boolean switch
<applianceId>.controls.sprinkler.activeTuesday    boolean switch
<applianceId>.controls.sprinkler.activeWednesday  boolean switch
<applianceId>.controls.sprinkler.activeThursday   boolean switch
<applianceId>.controls.sprinkler.activeFriday     boolean switch
<applianceId>.controls.sprinkler.activeSaturday   boolean switch
<applianceId>.controls.sprinkler.activeSunday     boolean switch

<applianceId>.controls.sprinkler.save   boolean button – sends all sprinkler values to the API
```

> Время начала и окончания хранится как отдельные значения в часах (0-23) и минутах (0-59). Адаптер внутренне объединяет их в минуты от полуночи при отправке в API. Изменения в отдельных полях подтверждаются локально, но **не** отправляются в API до тех пор, пока не будет нажата кнопка **Сохранить**.

График полива считывается из API Grohe каждые 10 опросов.

---

## Grohe Blue Home / Professional (тип 104 / 105)
### Измерения
```
<applianceId>.remainingCo2              %
<applianceId>.remainingFilter           %
<applianceId>.remainingFilterApp        %
<applianceId>.remainingCo2Liters        l
<applianceId>.remainingFilterLiters     l

<applianceId>.cyclesCarbonated
<applianceId>.cyclesStill

<applianceId>.operatingTime             min
<applianceId>.pumpRunningTime           min
<applianceId>.maxIdleTime               min
<applianceId>.timeSinceRestart          min

<applianceId>.waterRunningCarbonated    min
<applianceId>.waterRunningMedium        min
<applianceId>.waterRunningStill         min

<applianceId>.dateCleaning              date string
<applianceId>.dateCo2Replacement        date string
<applianceId>.dateFilterReplacement     date string
<applianceId>.lastMeasurement           date string

<applianceId>.cleaningCount
<applianceId>.filterChangeCount
<applianceId>.powerCutCount
<applianceId>.pumpCount
```

> **Актуальность измерений:** Устройства Grohe Blue **не** передают измерения автоматически. Адаптер отправляет команду `get_current_measurement` каждые 3 цикла опроса. Затем фоновый цикл проверки повторно опрашивает `/details` каждые 10 секунд (до 3 попыток / всего 30 секунд), пока не появится новая метка времени. После запуска адаптера может потребоваться 1-2 цикла опроса, прежде чем отобразятся текущие значения.

> **`remainingFilter` против `remainingFilterApp`:** Приложение Grohe не отображает исходное значение API, основанное на потреблении (`remainingFilter`), для фильтра. Кроме того, оно ограничивает его, исходя из фиксированного срока службы в 360 дней с момента последней замены фильтра (`dateFilterReplacement`), поэтому пользователям предлагается заменить фильтр примерно через год независимо от фактического использования. `remainingFilterApp` отражает это поведение (минимум значения, основанного на потреблении и времени) и соответствует тому, что отображает приложение Grohe.

### Элементы управления
```
<applianceId>.controls.tapType        number  1 = still · 2 = medium · 3 = carbonated
<applianceId>.controls.tapAmount      number  ml, 50–2000 in steps of 50
<applianceId>.controls.dispenseTrigger  boolean button

<applianceId>.controls.resetCo2       boolean button
<applianceId>.controls.resetFilter    boolean button
```

Установка `dispenseTrigger` в `true` считывает `tapType` и `tapAmount`, выполняет выдачу, а затем сбрасывает все три состояния обратно в `false` / `0`.

---

## Стратегия проведения опросов
Чтобы свести к минимуму количество вызовов API и избежать ограничения скорости (HTTP 403), опрос различных конечных точек осуществляется с разной частотой:

| Конечная точка | Частота | Устройства | Примечания |
|---|---|---|---|
| `/dashboard` | каждый опрос | Все | Основные данные датчика |
| `/command` (чтение) | каждый 3-й опрос | Sense Guard | Состояние клапана; также считывать данные сразу после команд |
| `/snooze` (чтение) | каждый 3-й опрос | Sense Guard | Статус отложенного сигнала; HTTP 404 = нет активного отложенного сигнала |
| `/command` (`get_current_measurement`) | каждый 3-й опрос | Синий | Запускает новое измерение на устройстве |
| `/details` (проверка) | до 3 раз после обновления | Синий | Фоновый опрос для получения актуальных данных (интервалы 10 с, максимум 30 с) |
| `/details` (конфигурация) | каждые 10 опросов | Sense Guard | График работы спринклеров, лимит отключения; всегда при первом опросе |
| `/data/aggregated` (сегодня) | каждый 5-й опрос | Sense Guard | Сегодняшнее потребление для `totalWaterConsumption` |
| `/data/aggregated` (исторический) | один раз в день | Защита чувств | Историческая база для `totalWaterConsumption` |
| `/pressuremeasurement` | каждый 10-й опрос | Sense Guard | Изменения происходят только после проверки трубы |
| `/pressuremeasurement` | каждые 10 опросов | Sense Guard | Изменения происходят только после проверки трубы |

**Совет:** Если возникают ошибки HTTP 403, увеличьте интервал опроса. API облака Grohe имеет ограничения по количеству запросов.

### Экспоненциальная задержка
При возникновении ошибок опроса адаптер автоматически увеличивает интервал:

1. Каждая последующая неудача **удваивает** интервал (300 → 600 → 1200 → 2400 → 3600 с).
2. Максимум: **1 час**.
3. По истечении 1 часа: пауза до **12:00** дня, или, если уже прошло 12:00, до **00:00** полуночи.
4. После **успешного** опроса интервал сбрасывается до заданного значения.

---

## Аутентификация
При запуске:

1. Сохраненный токен обновления считывается из `auth.refreshToken`.
2. При наличии такой возможности адаптер автоматически обновляет токены.
3. Если обновление не удается или токен отсутствует, выполняется полный вход в систему с использованием адреса электронной почты и пароля.
4. Новый токен обновления хранится в **зашифрованном виде** (`enc:<...>`) в `auth.refreshToken`.

Незашифрованные токены из более старых версий автоматически переносятся в зашифрованное хранилище.

При ошибке **HTTP 401** запрос повторяется один раз после обновления токена.

---

## Обнаружение резервного варианта
Если `/dashboard` возвращает HTTP 404 (для некоторых старых учетных записей), адаптер переключается на резервный способ обнаружения:

1. Извлекает идентификатор пользователя из токена доступа JWT.
2. Вызывает `/users/{userId}` для получения местоположения.
3. Получает `/rooms` → `/appliances` + `/details` + `/notifications` для каждого устройства.

Резервный режим определяется один раз при запуске и сохраняется на протяжении всего времени работы экземпляра.

---

## Обработка ошибок
| Ситуация | Поведение |
|---|---|
| Сбой опроса | `info.connection` → `false`; экспоненциальная задержка |
| HTTP 401 | Токен обновлен, запрос повторен один раз |
| HTTP 404 на `/pressuremeasurement` | Только отладочный журнал (отсутствие данных измерений - нормальное явление) |
| HTTP 404 на `/dashboard` | Переключение на резервный механизм обнаружения |
| HTTP 404 на `/dashboard` | Переключение на резервный механизм обнаружения |

---

## Обзор модуля
| Файл | Назначение |
|---|---|
| `main.js` | Ядро адаптера: опрос, управление состоянием, обработка команд, сообщения диспетчера устройств |
| `lib/groheClient.js` | Клиент API Grohe: аутентифицированные запросы, автоматическое обновление при ошибке 401 |
| `lib/auth.js` | Вход через OAuth / Keycloak и обновление токена |
| `lib/notificationManager.js` | Отправляет push-уведомления настроенным поставщикам |
| `lib/notificationMessages.js` | Локализованные шаблоны сообщений и тексты уведомлений Grohe (11 языков) |
| `lib/apiDump.js` | Полный дамп структуры API для диагностики (запускается опцией "Необработанные состояния") |
| `lib/apiDump.js` | Полный дамп структуры API для диагностики (запускается опцией Raw states) |