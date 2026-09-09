---
chapters: {"pages":{"en/adapterref/iobroker.bluetti/README.md":{"title":{"en":"ioBroker.bluetti"},"content":"en/adapterref/iobroker.bluetti/README.md"},"en/adapterref/iobroker.bluetti/docs/research/bluetti-ha-api-notes.md":{"title":{"en":"BLUETTI Home Assistant API Notes"},"content":"en/adapterref/iobroker.bluetti/docs/research/bluetti-ha-api-notes.md"},"en/adapterref/iobroker.bluetti/docs/auth-flow.md":{"title":{"en":"BLUETTI Auth, Token and Device Selection Flow"},"content":"en/adapterref/iobroker.bluetti/docs/auth-flow.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.bluetti/README.md
title: ioBroker.bluetti
hash: uI+BFfJ2SYXmUQCf5W64Wxb9A4Be2xErsV3D+sMqZBs=
---
![Версия NPM](https://img.shields.io/npm/v/iobroker.bluetti.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.bluetti.svg)
![Количество установок](https://iobroker.live/badges/bluetti-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/bluetti-stable.svg)
![Тестирование и выпуск](https://github.com/Percy2Live/ioBroker.bluetti/workflows/Test%20and%20Release/badge.svg)

<div align="center">

<img src="admin/bluetti.png" alt="BLUETTI" width="120" />

# ioBroker.bluetti

**Адаптер ioBroker только для чтения для электростанций [BLUETTI](https://www.bluettipower.com) — телеметрия аккумуляторов, солнечных батарей, сети и нагрузки из облака BLUETTI.**

<!-- Badges removed until adapter is in ioBroker repository (#81) -->

</div>

---

Перенесите данные с вашей электростанции BLUETTI в режиме реального времени в ioBroker: состояние заряда, входное напряжение от солнечных панелей/сети и выходная мощность переменного/постоянного тока, а также индикаторы подключения и состояния для автоматизации в стиле ИБП. Аутентификация использует тот же облачный вход BLUETTI, что и официальная интеграция с Home Assistant — никаких паролей от приложений, никакого сбора данных.

> **Статус:** работает и проверено от начала до конца на реальном аккаунте BLUETTI (Elite 30 V2) на js-controller 7.0.7. Пока не опубликовано в репозиториях ioBroker. Основная телеметрия стабильна; более подробная телеметрия для каждой модели все еще проверяется на реальных данных.

## ✨ Особенности

- 🔋 **Телеметрия батареи и источника питания** — уровень заряда, входное напряжение от фотоэлектрических панелей, входное напряжение от сети, выходная мощность переменного/постоянного тока.
- 🔐 **Безопасный вход в облако** — BLUETTI OAuth со встроенными учетными данными; токен хранится в зашифрованном виде и автоматически обновляется.
- 🔎 **Обнаружение устройств** — выберите свое устройство из списка после входа в систему.
- 🩺 **Состояние работоспособности и подключения** — доступность, последовательные сбои и консервативный сигнал подозрения на отключение для автоматизированных систем ИБП
- 👀 **Только для чтения и безопасно** — адаптер никогда не записывает данные на ваше устройство (никаких изменений режима работы/переменного тока/постоянного тока/прошивки).

## 🔌 Поддерживаемые устройства

| Модель              | Коды товаров       | Статус         |
| ------------------- | ------------------ | -------------- |
| BLUETTI Elite 30 V2 | `EL30V2` ,`PR30V2` | ✅ Подтверждено |

Другие модели BLUETTI, использующие тот же облачный API, вероятно, тоже будут работать, но пока не прошли проверку. Приветствуются проверенные на практике полезные нагрузки, чтобы расширить поддержку.

## 📦 Требования

- ioBroker с **js-controller ≥ 6.0.11** и **admin ≥ 7.6.20**
- Учетная запись BLUETTI, привязанная к вашему устройству в приложении BLUETTI.
- Устройство подключено к облаку BLUETTI (в режиме онлайн через приложение).

## 🚀 Установка и настройка

> Адаптер пока отсутствует в репозитории ioBroker. После его принятия вы сможете установить его непосредственно из административного интерфейса ioBroker ( **Адаптер** → найдите "bluetti").

1. Установите адаптер и создайте`bluetti.0` пример.
2. Откройте конфигурацию экземпляра в административной панели ioBroker.
3. Нажмите **«Аутентификация с помощью BLUETTI»** и завершите вход в систему в открывшемся окне браузера. Адаптер использует встроенные учетные данные клиента BLUETTI, поэтому поля идентификатора/секрета клиента в административном интерфейсе не отображаются.
4. Выберите своё устройство в меню **выбора устройств** .
5. **Сохранить.** Опрос начнётся автоматически;`info.connection` повороты`true` как только первый опрос пройдет успешно.

Аутентификация выполняется только один раз — токен хранится в зашифрованном виде.`auth.tokenJson` Состояние обновляется в фоновом режиме.

> **Примечание по безопасности:** токен OAuth хранится в зашифрованном состоянии ioBroker.`auth.tokenJson` ) с`read: false, write: false` Шифрование защищает от случайного доступа и доступа к резервным копиям/файловой системе. Любой администратор ioBroker по-прежнему может читать и расшифровывать состояние с помощью скриптов или REST API, поскольку ключ шифрования является общим для всего экземпляра. Это приемлемый компромисс: администраторы ioBroker уже имеют полный доступ к системе, поэтому зашифрованное состояние не ослабляет общую безопасность.

Если вам необходимо переопределить встроенные учетные данные клиента для использования в режиме эксперта/отладки, отредактируйте собственный объект экземпляра непосредственно в ioBroker. Адаптер по-прежнему будет использовать свои стандартные настройки, если эти собственные значения пусты.

## 📊 Объекты и состояния

Все данные доступны **только для чтения** .

### `info`

| Состояние         | Тип       | Описание                                                                                                                     |
| ----------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `info.connection` | `boolean` | Возвращает значение true, если аутентификация пройдена и выбранное устройство возвращает пригодные для использования данные. |

### `device`

| Состояние         | Тип       | Описание                                                                                           |
| ----------------- | --------- | -------------------------------------------------------------------------------------------------- |
| `device.serial`   | `string`  | серийный номер устройства                                                                          |
| `device.model`    | `string`  | модель устройства                                                                                  |
| `device.name`     | `string`  | Название устройства                                                                                |
| `device.online`   | `boolean` | Проверяет, подключено ли устройство к облаку BLUETTI.                                              |
| `device.workMode` | `string`  | Текущий режим работы, сообщаемый устройством (необработанное перечисление, например)`workmode_3` ) |

### `battery`

| Состояние                    | Тип          | Описание                                                                         |
| ---------------------------- | ------------ | -------------------------------------------------------------------------------- |
| `battery.soc`                | `number %`   | Уровень заряда батареи                                                           |
| `battery.dischargeRemaining` | `number min` | Примерное время до опустошения при текущей нагрузке (в минутах)                  |
| `battery.chargeRemaining`    | `number min` | Примерное время до полной зарядки (в минутах); 0, когда зарядка не производится. |

### `power`

| Состояние              | Тип        | Описание                                               |
| ---------------------- | ---------- | ------------------------------------------------------ |
| `power.pvInput`        | `number W` | Входная мощность фотоэлектрической (солнечной) энергии |
| `power.gridInput`      | `number W` | Входная мощность сети                                  |
| `power.acOutput`       | `number W` | Выходная мощность переменного тока (нагрузка)          |
| `power.dcOutput`       | `number W` | Выходная мощность постоянного тока (нагрузка)          |
| `power.acOutputActive` | `boolean`  | Включен ли в данный момент выход переменного тока?     |
| `power.dcOutputActive` | `boolean`  | Включен ли в данный момент выход постоянного тока?     |
| `power.acEco`          | `boolean`  | Включен ли режим энергосбережения AC ECO?              |
| `power.dcEco`          | `boolean`  | Включен ли режим энергосбережения DC ECO?              |

### `health`

| Состояние                    | Тип       | Описание                                                       |
| ---------------------------- | --------- | -------------------------------------------------------------- |
| `health.outageSuspected`     | `boolean` | Консервативный триггер подозрения на отключение электроэнергии |
| `health.consecutiveFailures` | `number`  | Последовательные сбои при проведении опросов                   |
| `health.authFailed`          | `boolean` | Была ли последняя ошибка связана с проблемой аутентификации?   |

### `status`

| Состояние           | Тип      | Описание                                    |
| ------------------- | -------- | ------------------------------------------- |
| `status.lastUpdate` | `string` | Отметка времени последнего успешного опроса |
| `status.lastError`  | `string` | Последнее очищенное сообщение об ошибке     |

## ⚙️ Конфигурация

| Вариант                            | По умолчанию | Описание                                                                                                                      |
| ---------------------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| Интервал опроса                    | `300 s`      | Как часто облако BLUETTI опрашивается для получения новых телеметрических данных?                                             |
| Идентификатор/секрет клиента OAuth | встроенный   | В административной панели это не отображается; экспертные настройки остаются доступными через прямое редактирование объектов. |

## ⚠️ Предупреждение о зависимости от облачных сервисов и наличии источников бесперебойного питания

Этот адаптер считывает данные из **облака BLUETTI** , поэтому его работа зависит от вашего интернет-соединения и доступности серверов BLUETTI.

Адаптер, работающий только с облаком, **сам по себе не может доказать отключение электроэнергии** . Он может лишь предоставить доказательства — устаревшие данные телеметрии, доступность облака/устройства и повторяющиеся сбои опроса. Для надежной автоматизации действий при отключении электроэнергии необходимо объединить эти состояния как минимум с одним **локальным** сигналом, таким как проверка маршрутизатора/ping, интеллектуальный счетчик, счетчик Shelly/энергопотребления или выделенный сигнал ИБП.

## 🛠️ Развитие

Адаптер представляет собой TypeScript-адаптер ioBroker на основе классов с JSON-конфигурацией администратора, созданный с помощью генератора кода.`@iobroker/create-adapter` .

| Сценарий                   | Цель                                                       |
| -------------------------- | ---------------------------------------------------------- |
| `npm run build`            | Компиляция исходных файлов TypeScript                      |
| `npm run check`            | Проверка типов без вывода кода                             |
| `npm run lint`             | Запустите ESLint                                           |
| `npm test`                 | Запустите модульные и пакетные тесты.                      |
| `npm run test:integration` | Запустите тест интеграции запуска ioBroker.                |
| `npm run test:repo`        | Запустите средство проверки репозитория ioBroker локально. |

Заметки по архитектуре и исследованиям:

- [Примечания к API BLUETTI Home Assistant](/#/docs/adapterref/iobroker.bluetti/docs/research/bluetti-ha-api-notes.md) — результаты проверки исходного кода, включая OAuth, токены, устройства и телеметрию.
- [Процесс аутентификации, выбора токена и устройства](/#/docs/adapterref/iobroker.bluetti/docs/auth-flow.md) — архитектура OAuth/токен/устройство, с указанием текущего состояния реализации вверху.

> До тех пор, пока адаптер не будет опубликован и помечен тегами,`npm run test:repo` Сообщается об ожидаемых результатах предварительного тестирования (пакет отсутствует в npm, релиз не помечен тегом, адаптер еще не добавлен в репозиторий ioBroker).

## Changelog

<!-- markdownlint-disable-next-line MD024 -->

### **WORK IN PROGRESS**
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 1.0.0

- First stable release: full repochecker compliance, OIDC trusted publishing with provenance signing.
- All pre-release repochecker findings resolved (#103–#107, #123, #124).
- Object structure dump validated and attached to ioBroker repository submission (#108).
- Adapter submitted to ioBroker latest repository (#81).

### 0.0.2

- Trusted publishing setup: OIDC-based npm publish with provenance signing, registry-url and npm 11 in CI.
- Populate `device.model` and `device.name` from `getUserProducts` cache; resolve `workMode` labels via `supportModeValues`.
- Device selector always visible; empty list signals unauthenticated state.
- Degrade gracefully when persisted OAuth token is corrupt instead of crashing the adapter.
- Refresh device list after OAuth completes without reopening the config dialog.
- Redact device serial in info-level polling log line.
- Repo cleanup: remove non-adapter files, redundant `publishConfig`, and GitHub/npm install instructions from README.
- Remove `prepare` lifecycle script and set `common.nogit` to suppress repochecker warnings.
- Add local repochecker audit results and prepare `ioBroker.repositories` submission entry.

### 0.0.1

- Initial release: BLUETTI cloud OAuth login, device discovery/selection, and read-only telemetry polling for the Elite 30 V2.
- Added verified Elite 30 V2 telemetry from a real `deviceStates` payload: battery discharge/charge time remaining, AC/DC output and ECO status, and working mode.

Older entries are kept in [CHANGELOG_OLD.md](https://github.com/Percy2Live/ioBroker.bluetti/blob/main/CHANGELOG_OLD.md).

[Older changelogs can be found there](https://github.com/Percy2Live/ioBroker.bluetti/blob/main/CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 Percy2Live