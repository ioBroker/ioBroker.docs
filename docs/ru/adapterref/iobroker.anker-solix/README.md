---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.anker-solix/README.md
title: ioBroker.anker-solix
hash: AHcAyfPuwFJaONU3Oaj4bvkYMSuVnLhAmixGluKBJC8=
---
# IoBroker.anker-solix

![Версия NPM](https://img.shields.io/npm/v/iobroker.anker-solix.svg)

Адаптер ioBroker для энергетических систем **Anker Solix** (солнечные батареи, умные счетчики, PPS, зарядные устройства для электромобилей и многое другое). Он основан на интеграции с Home Assistant [thomluther/ha-anker-solix](https://github.com/thomluther/ha-anker-solix) и использует ту же неофициальную библиотеку Python **solixapi**.

> **Поддерживаемые операционные системы** > > | ОС | Статус |

> |----|--------|
> | **Linux** | Основная целевая платформа для производства — **протестировано в CI** (Docker, NAS, Raspberry Pi, …) |
> | **Windows** | **Поддерживается и протестировано** на ioBroker для Windows (Python 3.12+) |
> | **macOS** | **Не поддерживается** — автоматическая установка Python/venv не была проверена |
> > Установка из каталога npm / `package.json`: только **`linux`** и **`win32`**. Подробности: [Поддерживаемые платформы](#supported-platforms).

Небольшой **мост на Python** (постоянный демон, как в Home Assistant) опрашивает облако Anker и, при необходимости, MQTT, а затем предоставляет значения в виде состояний ioBroker. Дополнительные группы сущностей (начиная с версии 0.9.0) повторяют область действия Home Assistant: по умолчанию включен только **Core** для ограничения нагрузки на API.

## Оглавление
1. [Отказ от ответственности и условия использования](#disclaimer--usage-terms)
2. [Поддерживаемые платформы](#supported-platforms)
3. [Как работает этот адаптер в ioBroker](#how-this-adapter-works-in-iobroker)
4. [Требования и установка](#requirements--installation)
5. [Конфигурация](#configuration)
6. [Кэш учетной записи Anker и входа в систему](#anker-account--login-cache)
7. [Ограничения](#ограничения)
8. [Поддерживаемые устройства](#supported-devices)
9. [Государственная структура и группы сущностей](#state-structure--entity-groups)
10. [MQTT](#mqtt-managed-devices)
11. [Примечания к специальному устройству](#special-device-notes)
12. [Устранение неполадок при входе в систему / опрос](#troubleshooting-login--poll)
13. [Услуги](#услуги)
14. [Благодарности и дополнительная литература](#credits--further-reading)
15. [Список изменений](#changelog)
16. [Издательское дело](#publishing-npm--iobroker-catalog)

---

## Отказ от ответственности и условия использования
Данный адаптер **не** связан с компанией Anker. Торговые марки и названия продуктов принадлежат их соответствующим владельцам.

Адаптер использует **неофициальную** библиотеку Python для взаимодействия с **облачным API** Anker Power (аналогичным API мобильного приложения). Этот API может измениться или перестать работать в любое время. Неправильные настройки могут повлиять на устройства; пользователь принимает на себя эти риски, активируя экземпляр (вкладка **Учетная запись**). В будущих обновлениях адаптера могут быть расширены возможности мониторинга или управления.

---

## Поддерживаемые платформы
| Платформа | Статус | Примечания |
|----------|--------|-------|
| **Linux** (Debian, Ubuntu, Docker, Proxmox, NAS, RPi) | **Основной / протестирован в CI** | Рекомендуется для продакшена; Python 3.12+ venv (`python3-venv`, `python3-pip`) |
| **macOS** | **Не поддерживается** | Теоретически тот же путь выполнения кода Unix, что и в Linux, но автоматическая загрузка Python/venv **не тестировалась** — отсутствует поддержка каталога npm (`package.json` не имеет `darwin`) |
| **macOS** | **Не поддерживается** | Теоретически, путь выполнения кода Unix совпадает с путем выполнения кода Linux, но автоматическая загрузка Python/venv **не тестировалась** — отсутствует поддержка каталога npm (в файле `package.json` отсутствует `darwin`) |

**Linux** остается основной целевой платформой для развертывания ioBroker. **Windows** полностью поддерживается в коде и проверена вручную; GitHub Actions запускает тесты адаптера на **`ubuntu-latest`** и **`windows-latest`**. **macOS** исключена из списка поддерживаемых платформ до тех пор, пока не будет протестирована установка Python.

---

## Как работает этот адаптер в ioBroker
| Слой | Роль |
|-------|------|
| **Адаптер Node.js** | Конфигурация экземпляра, планирование, состояния ioBroker, очередь управления |
| **Мост Python** (`python/bridge.py`) | Длительная сессия: API + опционально MQTT (в стиле Home Assistant) |
| **кэш аутентификации** | `iobroker-data/<instance>/authcache/<email>.json` — используется повторно после успешного входа через API |
| **authcache** | `iobroker-data/<instance>/authcache/<email>.json` — повторно используется после успешного входа через API |

Интервал опроса должен составлять **60–180 с** (та же рекомендация, что и для HA). Список сайтов обновляется каждый цикл; данные об устройствах/сайтах и данные об энергопотреблении обновляются с более медленным интервалом (`deviceDetailMultiplier`, по умолчанию каждые 10 опросов).

> **Важно:** Использование облачного API **обязательно**. Одного MQTT недостаточно для получения полных системных данных. Этот адаптер **не** заменяет локальные интеграции BLE или Modbus — см. [Дополнительные ресурсы](#credits--further-reading).

---

## Требования и установка
- ioBroker **js-controller >= 6**, **admin >= 7.6**
- **Node.js >= 22**
- **Python 3.12+** на хосте ioBroker:
- **Linux:** `python3-venv` + `python3-pip` (Debian/Ubuntu) — основная целевая платформа для производства.
- **Windows:** Python 3.12+ с python.org или `py -3.12`; установщик адаптера поддерживает venv и **`tzdata`**
- **macOS:** **не поддерживается** (автоматическая установка Python не проверена)

Зависимости Python устанавливаются в папку адаптера (`python/.venv` или `python/site-packages`). Начиная с версии 0.2.0: автоматически при запуске (**Параметры** → `autoInstallPython`) или при нажатии кнопки **Установить зависимости Python**.

Установка через ioBroker (рекомендуется):

```bash
iobroker install anker-solix
```

После внесения изменений в файлы адаптера локально, загрузите экземпляр:

```bash
iobroker upload anker-solix
```

**Многохостовый режим:** используйте `--host "PC(SmartHome)"` в кавычках, если имя содержит специальные символы.

Удалите устаревшую символическую ссылку, если она присутствует: `rm -f /opt/iobroker/node_modules/iobroker.AnkerSolix`

Ручная настройка Python (при необходимости):

```bash
cd node_modules/iobroker.anker-solix
python3 -m venv python/.venv && python/.venv/bin/pip install -r python/requirements.txt
```

### Home Assistant (дополнение для ioBroker)
В официальном приложении **ioBroker** для Home Assistant OS часто присутствует профиль `python3`, но **нет профилей `pip`** и **нет профилей `python3-venv`**. Установите или обновите адаптер через каталог ioBroker / npm (`iobroker install anker-solix`). Начиная с версии **0.10.72**, установщик обнаруживает этот профиль и пытается:

1. virtualenv в `python/.venv` (или `--without-pip` + pip внутри venv)
2. Используйте `get-pip.py` с параметром `--break-system-packages`, если системный Python соответствует PEP 668.
3. В качестве запасного варианта используйте `pip install --target python/site-packages`.

В административной панели экземпляра: **Параметры** → **Установить зависимости Python** или перезапустите экземпляр с включенной опцией **autoInstallPython**.

Если в логах по-прежнему отображается `No module named pip`, откройте терминал ioBroker/SSH на хосте и выполните следующую команду:

```bash
cd /data/iobroker/node_modules/iobroker.anker-solix
node tools/install-python.js
iobroker restart anker-solix.0
```

Скопируйте **`authcache/<email>.json`** из работающей конфигурации Anker (например, ha-anker-solix) в `iobroker-data/anker-solix.0/authcache/`, чтобы избежать капчи при первом входе в систему.

---

## Конфигурация
1. Создайте экземпляр: `iobroker add anker-solix`
2. **Учетная запись:** Электронная почта Anker, пароль, код страны (например, `DE`) — **сохраните после ввода пароля**
3. **Учетная запись:** разрешить использование неофициального API (флажок внизу вкладки)
4. **Параметры:** интервал опроса 60–180 с, **MQTT** при необходимости, `deviceDetailMultiplier` (по умолчанию в Home Assistant: 10)
5. **Устройства:** **Загрузка устройств**, дополнительный фильтр идентификатора сайта / серийного номера устройства.
6. **Объекты** (v0.9.0+): включить необязательные группы; по умолчанию включен только **ядро** → **перезапустить адаптер** после внесения изменений

Не используйте функцию **Очистка кэша входа в Anker**, если вам не требуется преднамеренный повторный вход (неверная учетная запись, поврежденный файл). Очистка принудительно выполняет новый вход в облако и часто запускает капчу на серверах — см. [Поиск неисправностей](#troubleshooting-login--poll).

---

## Кэш учетных записей и входа в Anker
После **первого успешного входа через API** адаптер сохраняет токены в:

`iobroker-data/anker-solix.0/authcache/<your-email>.json`

(Имя файла должно точно совпадать с адресом электронной почты в **Учетной записи**.)

Начиная с приложения Anker **3.10** (середина 2025 года), одну учетную запись часто можно использовать на **нескольких клиентах параллельно** (приложение + ioBroker + HA). Более старые документы о «только одном токене» сегодня менее критичны, но **неудачная повторная авторизация** через ioBroker по-прежнему не сможет обновить файл, если Anker вернет капчу.

**Учетные записи общего доступа / учетные записи участников:** Учетная запись, используемая членами семьи, может отображать меньше информации API, чем учетная запись владельца (аналогично Home Assistant).

Дополнительные примечания к учетной записи: [HA INFO.md – счета](https://github.com/thomluther/ha-anker-solix/blob/main/INFO.md).

---

## Ограничения
- **Неофициальный API** — отсутствует документация; конечные точки могут измениться в любое время.
- **Облако ЕС против COM** — неправильная **страна** в конфигурации → вход в систему работает, но **системы/устройства не отображаются**. Не меняйте страну после сопряжения устройств.
- **Устаревшие облачные данные**, если Wi-Fi устройства отключен; используйте индикаторы подключения к облаку/MQTT, если они включены.
- Обновления **MQTT** зависят от цикла публикации устройства; некоторые значения доступны только при **триггере в реальном времени** (при высокой нагрузке, если соединение круглосуточное).
- **Автономные устройства** (блоки питания, зарядные устройства, кулеры, не входящие в систему электропитания) **имеют мало или совсем не имеют данных об энергопотреблении по API** — может потребоваться MQTT ([ограничения Home Assistant](https://github.com/thomluther/ha-anker-solix#limitations)).
- **Динамический тариф** за пределами Nordpool: прогнозы/ценовые параметры могут быть неверными или доступны только для чтения.
- **Каптча (100032)** при прямом входе через API с VPS/VPN/датацентра — см. [Устранение неполадок](#troubleshooting-login--poll). Скопируйте `authcache` из HA или другой работающей конфигурации, если ioBroker не может войти в систему.

Для добавления устройств: экспортируйте анонимизированные данные через HA [экспорт систем](https://github.com/thomluther/ha-anker-solix/blob/main/INFO.md#export-systems-action) или [anker-solix-api export_system.py]](https://github.com/thomluther/anker-solix-api#export_systempy).

---

## Поддерживаемые устройства
Покрытие устройств такое же, как в [ха-анкер-соликс](https://github.com/thomluther/ha-anker-solix#supported-sensors-and-devices) (через solixapi). В ioBroker данные отображаются по идентификаторам состояний в зависимости от типа устройства (`solarbank`, `smartmeter`, `combiner_box`, `system`, …).

| Тип устройства | Примеры / примечания |
|-------------|------------------|
| **система / сайт** | Система электропитания из приложения Anker (= API “сайт”) |
| **солнечная батарея** | E1600 (Gen1), SB2 Pro/Plus/AC, SB3 E2700 — API + MQTT |
| **combiner_box** | Power Dock (мультисистемный) — объединенные элементы управления в ioBroker, если применимо |
| **умный счетчик** | Трехфазный счетчик Anker, США, Shelly 3EM / 3EM Pro |
| **инвертор** | Автономный MI80 (виртуальный сайт в API) |
| **Умная розетка** | Умная розетка 2500 Вт |
| **pps** / **solarbank_pps** | Портативные электростанции — в основном MQTT |
| **ev_charger** | Интеллектуальное зарядное устройство для электромобилей V1 — в основном использует MQTT |
| **транспортное средство** | Виртуальные электромобили для учетных записей зарядных устройств — ориентированы на чтение в ioBroker |
| **PowerPanel** / **HES** | US Power Panel, X1 HES — ограниченный API, интенсивное использование опроса статистики |
| **зарядное устройство** | Prime / зарядные станции — MQTT |
| **home_backup** | E10, AX170 — очень ограниченный API |

Иерархия устройств (как HA структурирует сущности): [обсуждение № 239](https://github.com/thomluther/ha-anker-solix/discussions/239).

---

## Государственная структура и группы субъектов
Типичные пути (экземпляр `anker-solix.0`):

- `anker-solix.0.solarbank.<deviceId>.sensors.*` — мощность, уровень заряда батареи и т. д.
- `anker-solix.0.solarbank.<deviceId>.control.*` — доступные для записи элементы управления там, где это поддерживается.
- `anker-solix.0.<device>.<id>.statistics.*` — суточная выработка кВт·ч (включить **Объекты** → статистика энергопотребления)
- `…statistics.week.*` / `statistics.month.*` / `statistics.year.*` — итоговые данные за календарную неделю, месяц и год в кВт·ч (отдельные группы объектов; опрос производится при обновлении подробных данных, а не в каждом цикле)
- Статистика **сайта-комбинатора:** доступна только в `combiner_box.<id>.statistics.*` (не дублируется в `system.*` или каждом `solarbank.*`). **Без combiner:** для каждого `solarbank.*` (и `smartmeter.*` для метрик сетки). Запросы к API выполняются **один раз для каждого сайта**.
- `anker-solix.0.smartmeter.<deviceId>.sensors.*`
- `anker-solix.0.services.*` — экспорт, планирование, обновление (состояния кнопок)
- `anker-solix.0.info.connection`, `anker-solix.0.info.pythonReady`

**Группы сущностей** (Администрирование → **Объекты**): сопоставляются с наборами функций высокой доступности — потоки электроэнергии, диагностика, PPS, зарядное устройство для электромобилей, HES, цена объекта, информация об учетной записи и т. д. Отключенные группы исключаются из опросов API для снижения нагрузки.

---

## Устройства, управляемые по протоколу MQTT
Включите **MQTT** в **Настройках**, если вам нужны данные в реальном времени или элементы управления, которые не предоставляются облачным API (многие функции PPS/EV/зарядных устройств).

- Дополнительные датчики/элементы управления загружаются из MQTT-карт в solixapi (декодируются сообществом для каждой модели).
- **Триггер в реальном времени** и **запрос статуса** работают как кнопки Home Assistant — автоматизация их круглосуточного использования увеличивает трафик и поддерживает устройства в активном состоянии ([раздел Home Assistant MQTT](https://github.com/thomluther/ha-anker-solix#mqtt-managed-devices)).
- Для **гибридного управления** (резерв SOC станции, ограничения переменного тока, экспорт электроэнергии из сети в многосистемном режиме) требуется MQTT + API, как в Home Assistant.
- Устройства в режиме локального подключения MQTT (например, E10 за Power Dock) подключаются через центральный блок управления — см. [ИНФОРМАЦИЯ О HA – Локальный режим MQTT](https://github.com/thomluther/ha-anker-solix/blob/main/INFO.md#devices-in-mqtt-local-mode).

Расшифровка новых моделей: [[Рекомендации MQTT](https://github.com/thomluther/anker-solix-api/discussions/222), инструмент `mqtt_monitor.py` в [anker-solix-api]](https://github.com/thomluther/anker-solix-api).

---

## Специальные примечания к устройству
Сокращенная версия из [README интеграции HA](https://github.com/thomluther/ha-anker-solix); поведение аналогично при использовании solixapi.

### Автономные инверторы (МИ80)
Это не полноценная «энергетическая система» в виде приложения, а данные, отслеживаемые облаком. API создает **виртуальный объект**. Состояние Wi-Fi инвертора в API часто бывает неверным; состояние подключения к облаку более надежно. **Не** изменяйте ограничения инвертора навсегда (циклы записи на оборудование).

### Солнечная батарея 1 (E1600)
Облачные обновления происходят примерно каждые **60 секунд** во время производства/разрядки; примерно каждый час в режиме ожидания. **Ошибка расписания:** один слот API на весь день может установить экспорт на **0 Вт** — используйте ≥2 слота в приложении, если используете предустановленные параметры вывода. Ежедневная статистика разрядки с середины 2024 года включает в себя пропущенные солнечные батареи (также некорректно в приложении). Мониторинг/управление по MQTT из Home Assistant версии 3.4+/3.5+.

### Солнечная батарея 2 + интеллектуальные счетчики
Интервал обновления облачных сервисов часто составляет **~5 минут**; изменения в настройках могут отображаться в датчиках до **~6 минут**. В общих учетных записях исторически были недоступные объекты (исправлено на стороне Anker). Некоторые пути API для **ограничений вывода** до сих пор неизвестны.

### Солнечная батарея 2 AC
Планы использования по времени суток управляются там, где это поддерживается; обновления облака могут зависать после интенсивного использования приложения ([HA #211](https://github.com/thomluther/ha-anker-solix/issues/211)).

### Комбинированный SB2 + каскадный SB1
Итоговые данные/статистика в облаке Anker отражают только **SB2**; SB1 частично является «черным ящиком». При ручном управлении SB2 на SB1 устанавливается минимальное расписание — некоторые элементы управления ioBroker/HA намеренно показывают **недоступность**. Для корректной зарядки/разрядки суммируйте мощность батареи **для каждого устройства**, а не только общую мощность системы ([подробности HA](https://github.com/thomluther/ha-anker-solix#combined-solarbank-2-systems-containing-cascaded-solarbank-1-devices)).

### Солнечная батарея 3
Интеллектуальный режим, динамическое ценообразование, режимы с временными интервалами — часто **только переключение** через API (предварительно настройте в приложении). Динамическое ценообразование НДС/сборов может быть **только кэшируемой** настройкой. Прогноз Nordpool наиболее надежен.

### Мультисистема с док-станцией питания
До 4 блоков SB3; общие настройки станции (режим использования, резерв SOC, экспорт в сеть). Управление объединено на **комбинаторе / Power Dock** в логике интеграции. Облачные данные могут передаваться с задержкой на начальных этапах развертывания. **Ограничение выходной мощности переменного тока** для нескольких систем может быть недоступно для изменения через API.

### Управление станцией
Резерв SOC, ограничения PV/AC, экспорт в сеть часто требуют **API + MQTT** (гибридные системы). Сторонние переключатели, поддерживающие PV/EV, обычно требуют однократной настройки приложения — они не доступны для автоматизации.

### PPS / Solarbank PPS (F3000 + американский счетчик)
В США используется автоматизированная система резервного копирования данных на дому; управление осуществляется преимущественно через MQTT.

### Зарядное устройство для электромобилей (V1)
Большинство метрик/элементов управления передаются через MQTT; поддерживаются учетные записи участников. Режимы работы соответствуют конечному автомату в стиле Home Assistant — в ioBroker проверьте доступные параметры управления перед запуском скриптов. Статистика истории сессий не реализована (используйте историю состояний).

### Транспортные средства
Виртуальные устройства на учетную запись EV; создание через адаптер не требуется — обнаружено при обновлении.

### Панель питания и HES (X1)
Ограниченные возможности API; обходное решение использует **~5-минутные средние значения** из статистики энергопотребления (**~80 МБ/день** дополнительного трафика на систему, если включено). При необходимости отключите категории с высокой нагрузкой в **объектах**. X1: рассмотрите локальный **Modbus** ([Спецификация Анкер](https://support.ankersolix.com/de/s/download-preview?urlname=Anker-SOLIX-X1-Series-Modbus-Protocol)) — не является частью этого адаптера.

### Резервное копирование домашней сети (E10, AX170)
Практически отсутствует облачный API для управления энергопотреблением системы; E10 часто работает в локальном режиме MQTT через док-станцию.

### Другие / автономные устройства
Полный API доступен только в **энергетической системе**; в противном случае требуется MQTT + декодирование сообщества.

---

## Устранение неполадок при входе в систему / опросе
### Нет `authcache/<email>.json`
Файл создается только после **успешного** входа через API. Если при каждом входе возвращается капча, скопируйте рабочий файл из [ха-анкер-соликс](https://github.com/thomluther/ha-anker-solix) (`custom_components/anker_solix/solixapi/authcache/`) в `iobroker-data/anker-solix.0/authcache/`, используя то же имя файла, что и в **Учетной записи**.

### `(100032) Captcha id empty`
Anker блокирует некоторые входы через API **серверов/VPN**. Библиотека не может обработать капчу.

1. Подтвердите вход в приложение в той же локальной сети; укажите правильную **страну**; отключите VPN на хосте ioBroker.
2. **Не** очищайте кэш при входе в систему, чтобы «исправить» капчу.
3. Скопируйте `authcache` из Home Assistant или войдите в систему заново, когда облако позволит это сделать.
4. После многочисленных неудачных попыток подождите 15–30 минут.
5. Используйте адаптер **≥ 0.9.3**, чтобы при перезапуске не удалялся действительный кэш.

В логе указан точный путь к кэшу из версии **0.9.4+**.

### Лимиты скорости (26161 / 429)
Увеличьте интервал опроса; уменьшите количество включенных групп **объектов**; адаптер будет повторять попытки и может на короткое время переключиться на одноразовый мост.

---

## Услуги
Штаты, указанные в `anker-solix.0.services.*` (для срабатывания установите значение `true`):

- `get_schedule`, `clear_schedule`, `export_systems`, `get_system_info`, `refresh_devices`

Использует `selectedDeviceId` / `selectedSiteId` из конфигурации. См. вкладку «Объекты» в разделе «Администрирование» (подсказка по службам).

---

## Благодарности и дополнительная информация
| Ресурс | Содержание |
|----------|---------|
| [thomluther/ha-anker-solix](https://github.com/thomluther/ha-anker-solix) | Полный файл README, **INFO.md** (конфигурация, MQTT, экспорт, тарифы) |
| [Обсуждения HA](https://github.com/thomluther/ha-anker-solix/discussions) | Панель мониторинга энергопотребления, нулевой экспорт, эффективность |
| [SolixBLE](https://github.com/flip-dots/SolixBLE) | Локальный BLE (не облачный) |
| [ha-anker-solix-official](https://github.com/anker-charging/ha-anker-solix-official) | Официальный Modbus (локальные устройства) |
| [ioBroker.pvforecast](https://www.iobroker.net/#en/adapters/adapterref/iobroker.pvforecast/README.md) | Прогноз PV (необязательный параметр для предотвращения сокращения производства) |
| [ioBroker.pvforecast](https://www.iobroker.net/#en/adapters/adapterref/iobroker.pvforecast/README.md) | Прогноз PV (необязательный параметр для предотвращения сокращения) |

Немецкие руководства/видеоролики, ссылки на которые приведены в разделе [HA README](https://github.com/thomluther/ha-anker-solix#additional-resources), концептуально относятся к данным и ограничениям; подключение осуществляется через состояния ioBroker, а не через сущности HA.

---

## Предотвращение ограничений (необязательно)
Вкладка **Abregelungsvermeidung** / **Curtailment avoidance**: требует [[ioBroker.pvforecast](https://www.iobroker.net/#en/adapters/adapterref/iobroker.pvforecast/README.md) адаптер. (Ранее основан на [ioBroker.solarprognose]](https://www.iobroker.net/#en/adapters/adapterref/iobroker.solarprognose/README.md) / solarprognose.de — переключено, потому что **solarprognose.de закрывается** и этот источник данных больше не является жизнеспособным.) Установите **путь работы электростанции** (например, `pvforecast.0.plants.pv`); значения мощности считываются из `{path}.power.hoursToday.*`. **Разрешение прогноза** (60 / 30 / 15 минут, по умолчанию **60**) должно соответствовать интервалу, настроенному в pvforecast. **Только для управления:** **ручной** режим + **`ac_output_limit`** (выход/экспорт переменного тока). **Не** изменяет базовые настройки станции (ограничение экспорта из сети, `allow_grid_export`, предустановка домашней нагрузки, ограничение зарядки переменного тока). **До:** `ac_output_limit` = активный PV. **Активно:** `missing_charge_wh`, `max_charge_w` = `missing_charge_wh` ÷ `remaining_hours`, `export_w` = `live_pv_w` − `max_charge_w`, `ac_output_limit` = `export_w`. **После:** восстановить выбранный режим. Штаты: `curtailment.live_pv_w`, `missing_charge_wh`, `max_charge_w`, `export_w`, `remaining_hours`.

**Администратор:** установите флажок *Присутствует поле «Комбинатор»* — без комбинирования: идентификатор устройства + тип солнечной батареи + мощность батареи в Вт·ч; с комбинированием: идентификатор комбинирования + до **4** слотов для солнечных батарей (каждый слот может быть *отсутствующим*). **Комбинатор:** общий лимит переменного тока = **сумма** лимитов для каждого устройства (SB2 **1000** Вт, SB3 Pro **1200** Вт, SB4 Pro **2500** Вт). **Автономный режим:** всегда **800** Вт.

---

## Публикации (каталог npm и ioBroker)
**npm:** Выпуск через git-тег (`v*`) и развертывание в CI после [Проверка адаптера прошла успешно (https://adaptercheck.iobroker.in/). Публикация осуществляется с использованием **доверенной публикации npm** (OIDC из GitHub Actions — без долгосрочного токена npm). Классические токены автоматизации устарели в npm с **января 2027 года**; этот адаптер уже использует доверенную публикацию. Зарегистрируйтесь в [ioBroker.repositories]](https://github.com/ioBroker/ioBroker.repositories), как только пакет появится в npm.

**Перед каждым релизом** (обеспечивается правилами `npm run test:package` → `test/io-package-policy.js`):

1. Увеличьте значение параметра `version` в файлах `package.json` и `io-package.json` (они должны совпадать).
2. Добавьте раздел `### x.y.z` в этот список изменений README (E6006).
3. Добавьте **одну** новую запись в файл `common.news` для этой версии; сохраните **не более 7** ключей новостей — только для версий, уже размещенных в npm (кроме той, которую вы собираетесь опубликовать). Переместите удаленный текст в [CHANGELOG_OLD.md](CHANGELOG_OLD.md).
4. Администрирование `jsonConfig.json`: размер заголовка `size` должен быть **≤ 5** (используйте `5` для самого маленького заголовка).
5. Не добавляйте корневые файлы в npm `files`, если это не требуется (файл `CHANGELOG_OLD.md` не входит в состав пакета).
6. Файл `package.json` с параметром `os` должен соответствовать матрице ОС в файле `test-and-release.yml` (E3027). Поддерживайте синхронизацию файла `i18n/*.json` в административной панели с файлом `en.json` (W5604/W5605).

---

## Changelog

### 0.10.86

- **Solarbank 1 (E1600):** writable `preset_charge_priority` (0–100 %) and `preset_discharge_priority` (switch) via `set_home_load` — not applicable to SB2/SB3

### 0.10.85

- **Admin:** curtailment hint/path labels use new i18n keys so Admin no longer keeps stale solarprognose.de text after the pvforecast switch

### 0.10.84

- **Curtailment:** switch forecast source from solarprognose.de / [ioBroker.solarprognose](https://www.iobroker.net/#en/adapters/adapterref/iobroker.solarprognose/README.md) to [ioBroker.pvforecast](https://www.iobroker.net/#en/adapters/adapterref/iobroker.pvforecast/README.md) because **solarprognose.de is shutting down**. Plant path (`…power.hoursToday`); resolution option 60/30/15 min (default 60). (0.10.82/0.10.83 were not published: CI lint / unpublished news entries.)

### 0.10.83

- **Fix:** CI lint for curtailment/pvforecast (`prettier`, `require-await`, redundant type unions) — not published (see 0.10.84)

### 0.10.82

- **Curtailment:** switch to pvforecast (solarprognose.de shutting down) — not published (CI lint failure; see 0.10.84)

### 0.10.81

- **Repository review (mcm1957):** restore standard `test-and-release` workflow — adapter tests on every push/tag (Linux + Windows matrix), deploy only after all jobs succeed (no `always()` / no skipped-tests workaround); declare **`linux` + `win32`** in `package.json`; README: Windows supported & tested, **macOS not supported**

### 0.10.80

- **Object dump fix:** persist `periodScheduleOffsetSec` via `extendForeignObjectAsync` on `system.adapter.<instance>` (avoids invalid `anker-solix.0.system.adapter.*` object without `type`/`common`, E3004/E3007)

### 0.10.79

- **Repository re-review:** per-instance period energy schedule jitter; sensor-kind state name migration; remove unused `curtailmentModeBefore`; document Linux + **tested Windows** support

### 0.10.78

- **Adapter-check:** use `adapter.setTimeout` instead of plain `setTimeout` (E5005)

### 0.10.77

- **Repository review:** English-only log messages; English default state names and list labels (common.name/common.states)

### 0.10.76

- **Object structure:** list controls use role `state` (`max_total_ac_output`, EV charger mode lists; E1008/E1009)

### 0.10.75

- **Object structure (PR review):** folder → device → channel hierarchy before states (E3009); valid ioBroker roles/types (E1008/E1009/E1011)
- **Dev:** `@alcalzone/release-script` 5.2.1 (E0036)

### 0.10.74

- **TypeScript 6** (W0083); `tsconfig.json` adds mocha types for `tsc --noEmit`
- **CI:** `testing-action-adapter` and `testing-action-deploy` use `@v1` (S3043/S3044); `testing-action-check` stays `@v2.0.0` (no floating `@v2` tag)
- **Tests:** `npm pack` must exclude `CHANGELOG_OLD.md` (S9508)

### 0.10.73

- **README:** removed discouraged GitHub-URL installation section (adapter-check **E6013**)
- **Tests:** `test/io-package-policy.js` guards against GitHub URL install text in README

### 0.10.72

- **Repository checker:** admin i18n synced for all languages (W5604/W5605); `package.json` `os` aligned with Linux CI (E3027)
- **Tests:** `test/i18n-policy.js` and E3027 check in `test/io-package-policy.js`

### 0.10.71

- **Python install:** detects host profile (Linux server, **Home Assistant** ioBroker add-on, **Windows**, container)
- **HA:** venv-first, `get-pip.py` with `--break-system-packages` / `PIP_BREAK_SYSTEM_PACKAGES` for PEP 668
- **Windows:** tries `py -3.13`, `py -3.12`, Program Files paths; parses `--version` (no broken shell `-c` check); adds **`tzdata`** for `Europe/Berlin`
- **Bridge:** uses resolved Python spawn spec (`py -3.12` args) consistently in daemon and one-shot mode
- Deps check: `aiohttp` + `ZoneInfo("Europe/Berlin")` before skipping install

### 0.10.70

- **Repository / CI:** `common.news` capped at 7 npm-published versions; workflow concurrency per ioBroker.example; admin header `size` ≤ 5; automated checks in `test/io-package-policy.js`; `CHANGELOG_OLD.md` excluded from npm package

### 0.10.69

- **Curtailment:** after midnight (Europe/Berlin) phase `inactive` until solarprognose forecast signature changes; then safe `modeAfter` release (no export while waiting)

### 0.10.68

- **Admin:** Python install button at bottom of **Options** tab

### 0.10.67

- **Admin:** removed **Devices** tab and cloud device reload; device filter on **Objects**; **Login cache** tab rightmost

### 0.10.66

- **Admin:** device list and login-cache status via `useNative` responses

### 0.10.65

- **Login cache** tab: backup/restore; auto-backup after first login

### 0.10.64

- **Curtailment admin:** hint text; combiner vs standalone field toggle fix

### 0.10.63

- **Fix** `bat_discharge_power`; admin: terms under **Account**, **Objects** tab, curtailment UI (combiner / solarprognose link)

### 0.10.31

- **Week/month/year statistics:** fetched once per day after **23:00 / 23:15 / 23:30** (Europe/Berlin) on the next detail poll, not every detail refresh

### 0.10.30

- **Week/month statistics:** fetched like Home Assistant (`energy_daily`, `device_sn` empty for site totals); avoids `energy_analysis` 10003 with combiner SN; year still via `energy_analysis`

### 0.10.29

- **Curtailment:** instance setting *Minimum live PV (W)* (`curtailmentMinPvW`, default 50); fix ESLint/Prettier CI failure on 0.10.28

### 0.10.28

- **Curtailment:** manual mode and `ac_output_limit` only when live PV ≥ 50 W — no midnight feed-in from forecast (fixes 4800 W at `livePv=0`)

### 0.10.27

- Period `energy_analysis`: per-call retry on 10003, partial metrics if only some calls fail; uses combiner/solarbank SN; success log only when kWh values exist

### 0.10.26

- **Week/month period stats:** fetched on first detail refresh when only period groups are enabled (not after ~30 min); week interval = every detail refresh (was every 3rd); log line `Period statistics updated (week)`

### 0.10.25

- **Fix:** `curtailment.soc_percent` state object is created on start (was missing since 0.10.16)

### 0.10.24

- **Fix:** `NameError: needs_daily_energy_poll` / missing `PERIOD_YEAR` imports in **0.10.23** (incomplete release)

### 0.10.23

- **Fix:** missing `_update_energy_periods` crashed the bridge daemon (`AttributeError`) → one-shot fallback and extra 429 load
- **Year/month/week only:** skips daily `poll_device_energy` (no “today” entity group); period `energy_analysis` only every Nth detail refresh (year ≈ 8×)
- On 429: no one-shot fallback; period stats back off 30 min; parallel polls skipped

### 0.10.22

- Energy statistics (daily + week/month/year) only on **combiner_box** when a combiner exists; no duplicate states under `system.*` or each `solarbank.*`

### 0.10.21

- **Fix:** `IoBrokerAnkerApiClient` stored no `config` → daemon crashed (`AttributeError`), one-shot bridge fallback, extra API load and **429** rate limits
- Week/month/year `energy_analysis` calls are **rotated** (one period per detail refresh) instead of all three at once

### 0.10.20

- Period energy statistics (week / month / year) use subfolders: `statistics.week.*`, `statistics.month.*`, `statistics.year.*` (instead of flat `week_*` under `statistics.*`)
- Release **0.10.19** tag had no npm deploy (CI lint); install **0.10.20** or newer

### 0.10.18

- Entity groups **Weekly / monthly / yearly energy statistics** (`enableEnergyStatisticsWeek|Month|Year`): kWh totals for current calendar week, month, and year via Anker `energy_analysis` API

### 0.10.17

- **Fix:** Stale `build/` still ran old curtailment code that set **grid export limit** (`grid_export_limit`) to up to **4800 W** on adapter start (App: *Netzeinspeisungs-Leistungsgrenze* → *Anpassen*). Rebuilt `build/` from current TypeScript; tests verify compiled curtailment never touches feed-in controls

### 0.10.16

- Combiner sensor **`total_state_of_charge`**: cloud total or capacity-weighted average of all site solarbanks (poll + ioBroker state)
- Curtailment uses total SOC for `missing_charge_wh`, `max_charge_w`, and `soc_percent`

### 0.10.15

- Curtailment: **`ac_output_limit` via API only** (no MQTT) to avoid station side effects
- Fix SOC handling when combiner had no SOC (`max_charge_w` wrong); ensure `missing_charge_wh` state exists on upgrade

### 0.10.14

- Curtailment: **only** manual mode + **`ac_output_limit`** (no `grid_export_limit`, `allow_grid_export`, home load preset, AC charge limit)
- New state `curtailment.missing_charge_wh`; active phase: export = live PV − calculated max charge

### 0.10.12

- Curtailment combiner: export via **`ac_output_limit`** (`max_load`); home load preset 0 W (superseded by 0.10.14+)

### 0.10.11

- Curtailment: prefer **`system.{siteId}.sensors.total_pv_power`** for live PV

### 0.10.10

- Curtailment combiner: export via `set_output_power` (later replaced); 4800 W cap; more PV sensors for `live_pv_w`

### 0.10.9

- Curtailment active phase: AC output = full PV (intermediate behaviour; refined in 0.10.14+)

### 0.10.8

- Curtailment: **before** = instant export = live PV; **active** = slow battery charge + export surplus

### 0.10.7

- Curtailment: export limit follows live PV; updates when generation sensors change

### 0.10.6

- Curtailment: manual mode, no charge, export limit from hourly forecast (also before curtailment window)

### 0.10.5

- Curtailment: read [ioBroker.solarprognose](https://www.iobroker.net/#en/adapters/adapterref/iobroker.solarprognose/README.md) forecast (kW → W, path `11h.power`)

### 0.10.4

- Curtailment Admin: combiner checkbox, device ID + solarbank type (standalone) or 4 slots with “none” (combiner); no usage-mode change before curtailment window

### 0.10.3

- CI: curtailment unit tests use Mocha/Chai (fixes adapter-check lint)

### 0.10.2

- Curtailment AC limits: standalone 800 W; combiner per unit SB2 1000, SB3 1200, SB4 2500 W

### 0.10.1

- Curtailment: Combiner limit = sum of per-unit profiles (max 4 mixed solarbanks)

### 0.10.0

- Optional **curtailment avoidance** via solarprognose forecast (Admin tab, `curtailment.*` states)

### 0.9.9

- `package.json` keyword `ioBroker`; entity group headers with schema `size` property

### 0.9.8

- Admin UI: all option/entity fields with lg/xl breakpoints; CI release fix

### 0.9.7

- Adapter-check: npm news sync, admin responsive layout, README copyright, npm package excludes Python cache

### 0.9.6

- Adapter-check compliance: Node 22+, admin UI sizes, compact-mode Python install, dependabot

### 0.9.5

- Admin warning before **Clear Anker login cache**; log after clear

### 0.9.4

- Log exact `authcache` path when login cache file is missing

### 0.9.3

- **Fix:** Valid `authcache` no longer treated as failed login after restart (captcha 100032)

### 0.9.2

- Keep `authcache` on re-auth; reload token on 401 before forced login

### 0.9.1

- Captcha error 100032 mapping and README troubleshooting

### 0.9.0

- Configurable **entity groups** (HA-style); API scope follows enabled groups

### 0.8.1

- Fix Python bridge `ApiCategories.device_parm` crash

### 0.8.0

- Daily energy statistics under `statistics.*`

### 0.7.0

- Usage mode `preset_usage_mode`, AC fast charge switch

### 0.6.0

- Persistent bridge daemon, HA-aligned poll, multisystem controls, rate-limit fixes (see [CHANGELOG_OLD.md](CHANGELOG_OLD.md) for 0.6.1–0.6.5)

### 0.5.0

- Python auto-install, device selection, staggered polling, repository rename (see [CHANGELOG_OLD.md](CHANGELOG_OLD.md) for 0.2.0–0.4.2)

Older release notes: [CHANGELOG_OLD.md](CHANGELOG_OLD.md) and git history.

---

## License

Copyright (c) 2026 MatthiasUlrich1 info@my-smart-home-support.de

MIT — see [LICENSE](LICENSE)