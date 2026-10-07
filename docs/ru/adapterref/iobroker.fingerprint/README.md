---
chapters: {"pages":{"en/adapterref/iobroker.fingerprint/README.md":{"title":{"en":"ioBroker.fingerprint"},"content":"en/adapterref/iobroker.fingerprint/README.md"},"en/adapterref/iobroker.fingerprint/DISCLAIMER.de.md":{"title":{"en":"Haftungsausschluss (Disclaimer) — ioBroker.fingerprint"},"content":"en/adapterref/iobroker.fingerprint/DISCLAIMER.de.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.fingerprint/README.md
title: ioBroker.fingerprint
hash: Kk5+ExG/e5aEtblXjBoKbq93+7YsmLiZs+qGXgMuOwI=
---
<img src="https://raw.githubusercontent.com/sadam6752-tech/ioBroker.fingerprint/main/admin/fingerprint.png" width="120" alt="FingerprintDoorbell logo" />

# ioBroker.fingerprint

Интегрирует устройство [FingerprintDoorbell](https://github.com/sadam6752-tech/FingerprintDoorbell) на базе ESP32 в ioBroker по протоколу HTTP — **без необходимости использования MQTT и адаптера Simple API** .

Адаптер запускает небольшой HTTP-приемник веб-хуков. Дверной звонок звонит ему напрямую при совпадении отпечатка пальца или при нажатии на кнопку неизвестного пальца. Адаптер также опрашивает устройство, чтобы сообщить о его состоянии онлайн/офлайн, и может перезагрузить его или переключить сенсорное кольцо.

## Требования к прошивке

Этот адаптер взаимодействует с прошивкой **FingerprintDoorbell** , работающей на вашем ESP32.

- **Рекомендуется: прошивка версии 0.9.4 или новее** — все перечисленное ниже работает, включая регистрацию через адаптер, управление светодиодным кольцом, сигнал Wi-Fi и надежное резервное копирование/восстановление с помощью нескольких пальцев.
- **Прошивка версии 0.9.3** — надежное резервное копирование/восстановление всех пальцев (полные шаблоны размером 1536 байт).
- **Прошивка версии 0.9.1** — включает _серверный режим_ (адаптер автоматически настраивает устройство, без ручного ввода URL-адресов) плюс `control.ignoreTouchRing` и список отпечатков пальцев.
- **Прошивка версии 0.9** также работает в базовом режиме (вставьте URL-адреса для сопоставления/передачи сигнала вручную).

Обзор функций каждой прошивки:

| Особенность                                                               | Прошивка |
| ------------------------------------------------------------------------- | -------- |
| Матч / Кольцо / Статус / Перезагрузка                                     | v0.9     |
| Серверный режим, игнорировать сенсорное кольцо, список отпечатков пальцев | v0.9.1   |
| Резервное копирование / Восстановление (все пальцы)                       | v0.9.3   |
| Подключение через адаптер, светодиодное кольцо, Wi-Fi RSSI                | v0.9.4   |

Скачать прошивку можно здесь:

- **Проще всего — прошить через браузер (свежая версия ESP32):** [Web Flasher](https://sadam6752-tech.github.io/FingerprintDoorbell/) — подключите ESP32 через USB и нажмите _«Установить»_ (Chrome/Edge/Opera или Firefox 151+).
- **Обновление позже через OTA:** открыто `http://<device-ip>/update` → _Прошивка_ → загрузка `firmware.bin` из раздела ["Релизы"](https://github.com/sadam6752-tech/FingerprintDoorbell/releases) .
- **Загрузка вручную:** последняя версия ZIP-архива из раздела [«Релизы»](https://github.com/sadam6752-tech/FingerprintDoorbell/releases) (содержит) `firmware.bin`, `spiffs.bin` и инструкции по прошивке).

Проверить работающую версию можно по ссылке: `http://<device-ip>/api/status` (поле `version`).

## Как это работает

```
FingerprintDoorbell (ESP32)                 ioBroker.fingerprint
─────────────────────────                   ────────────────────
match  ──► HTTP GET /match?id=..  ─────────►  webhook receiver ──► lastMatch.*
ring   ──► HTTP GET /ring          ─────────►  webhook receiver ──► ring.*
                                    ◄───────  poll GET /debug   ──► info.connection
reboot                              ◄───────  GET /reboot        ◄── control.reboot
touch ring                          ◄───────  GET /set-touch-ring ◄── control.ignoreTouchRing
```

## Настраивать

1. Установите и добавьте экземпляр адаптера.
2. В настройках экземпляра выполните следующие действия:
   - **IP-адрес устройства** / **Порт устройства** — IP-адрес дверного звонка и порт веб-интерфейса (по умолчанию 80).
   - **Имя пользователя администратора / Пароль администратора** — если на устройстве включена базовая HTTP-аутентификация.
   - **IP-адрес/порт веб-перехватчика** — адрес, на котором адаптер прослушивает запросы (по умолчанию). `0.0.0.0:8095`)
3. В **веб-интерфейсе FingerprintDoorbell → Настройки** установите URL-адреса HTTP-действий, указывающие на этот адаптер (скопируйте готовые URL-адреса из настроек экземпляра — они уже содержат токен веб-перехватчика; замените `<iobroker-ip>` с IP-адресом хоста ioBroker):

   ```
   HTTP Match URL: http://<iobroker-ip>:8095/match?id={id}&name={name}&confidence={confidence}&token=<token>
   HTTP Ring URL:  http://<iobroker-ip>:8095/ring?token=<token>
   ```

## Отказ от ответственности

Этот адаптер представляет собой независимую интеграцию, созданную сообществом. Он **не** связан с авторами прошивки FingerprintDoorbell, производителями датчиков или компанией ioBroker GmbH, не одобрен ими и не поддерживается ими. Программное обеспечение предоставляется **«как есть», без каких-либо гарантий** (см. [лицензию](https://github.com/sadam6752-tech/ioBroker.fingerprint/blob/main/LICENSE) MIT); вы используете его на свой страх и риск.

- **Не является сертифицированным средством безопасности.** Бытовые датчики отпечатков пальцев (например, R503) могут давать ложные срабатывания и ложные отказы, а также могут быть подделаны. **Не** полагайтесь на этот адаптер как на единственную защиту дверей, замков, систем сигнализации или любых других средств охраны людей или имущества, и всегда имейте механический или иной независимый способ входа и выхода.
- **Не предназначено для использования в критически важных с точки зрения безопасности местах.** Сбои в сети, Wi-Fi, электропитании или программном обеспечении могут привести к задержке или отмене событий. Никогда не используйте его там, где сбой может представлять опасность для жизни или здоровья (например, на пожарных выходах).
- **Ваша сеть, ваша ответственность.** Веб-интерфейс устройства и веб-перехватчик используют обычный HTTP (базовая аутентификация и общий токен передаются в незашифрованном виде). Используйте их только в доверенной локальной сети/VLAN, никогда не открывайте порт веб-перехватчика или устройство для доступа из интернета и храните токен в секрете.
- **Биометрические данные / конфиденциальность (GDPR).** Шаблоны отпечатков пальцев, имена, временные метки и журналы доступа являются персональными данными. Вы являетесь контроллером: получите согласие зарегистрированных лиц, защитите резервные копии файлов (`fingerprints-backup.json` (содержит необработанные шаблоны, незашифрованные) и соблюдайте законы, применимые к вам (например, GDPR/BDSG, правила трудового совета для сотрудников).
- **Действия выполняются в автоматическом режиме.** Правила отпечатков записывают данные в любой выбранный вами объект ioBroker (освещение, замки, сигнализация, скрипты). Тщательно протестируйте свои правила, прежде чем полагаться на них.
- Авторы не несут ответственности за ущерб, потерю данных, несанкционированный доступ, кражу со взломом или любые другие последствия, возникшие в результате использования или неправильного использования данного программного обеспечения.

Немецкая версия доступна по адресу [DISCLAIMER.de.md](/#/docs/adapterref/iobroker.fingerprint/DISCLAIMER.de.md) .

## Безопасность

Аутентификация связи осуществляется в обоих направлениях:

- **Адаптер → устройство** (проверка состояния, перезагрузка, сенсорное кольцо): базовая HTTP-аутентификация с использованием настроенного имени пользователя администратора / пароля администратора.
- **Устройство → адаптер** (соответствие/отключение веб-хуков): общий **токен веб-хука** . Токен генерируется автоматически при первом запуске и отображается в настройках экземпляра. Запросы без действительного токена (через `token` параметр запроса или `X-Auth-Token` Заголовок) отклоняется с ошибкой HTTP 401. При желании можно включить параметр _"Принимать веб-хуки только с IP-адреса устройства"_ , чтобы отклонять запросы также с любых других хостов.

При использовании прошивки версии < v0.9.1 токен необходимо вставлять вручную в URL-адреса устройства. Начиная с версии v0.9.1 (серверный режим), адаптер автоматически создает URL-адреса и токен.

`adminPassword` и `webhookToken` объявлены как **защищенные** собственные атрибуты (`protectedNative` в `io-package.json`), поэтому другие адаптеры не могут их прочитать. Они хранятся в виде открытого текста внутри конфигурации экземпляра — шифрование осуществляется с помощью `encryptedNative` Он намеренно не используется, поскольку токен веб-перехватчика генерируется самим адаптером.

## Действия с отпечатками пальцев (без написания скриптов)

Вкладка **«Действия с отпечатком пальца»** позволяет запускать объекты ioBroker непосредственно с помощью отпечатка пальца — JavaScript не требуется:

1. Нажмите **«Загрузить отпечатки пальцев с устройства»** , чтобы заполнить таблицу зарегистрированными отпечатками пальцев (идентификатор + имя). Существующие строки сохраняются (объединяются).
2. Для каждой строки выберите **целевой объект** и **действие** (`Set value` или `Toggle`), **значение** и необязательный **минимальный уровень достоверности** (оставьте пустым, чтобы игнорировать).
3. **Значение** имеет произвольный тип и преобразуется в тип целевого объекта:
   - булевый целевой параметр: `true`, `1`, `on`, `yes`, `ja`, `да` → верно; всё остальное → неверно
   - Целевой объект: число, интерпретируется как число (`,` (принимается в качестве десятичного разделителя)
   - целевая строка: используется как есть
4. **Действие «Кольцо»** активирует выбранный объект, когда неизвестный палец звонит (например, играет мелодию колокольчика).

### Интеллектуальные правила (v0.5.0)

- **Отключение дребезга (s)** — игнорирование повторных нажатий одного и того же пальца в течение N секунд.
- Флажок **«Условия»** — устанавливает временные окна доступа для этого пальца. Определите окна на вкладке **«Условия»** : введите один или несколько идентификаторов пальцев (разделенных запятыми, например). `1,2,4`), отметьте дни недели и установите `From` /`To` время (`HH:MM` Несколько строк для одного и того же пальца объединяются с помощью операции ИЛИ; временные диапазоны могут пересекать полночь (например, `22:00` –`06:00` Если параметр «Условия» включен, но ни одна строка не соответствует условию, действие пропускается.
- Флажок **«Тревога»** (палец паники) — помимо обычного действия, устанавливает объект, настроенный в разделе **«Цель тревоги»** . Пример: специальный палец открывает дверь как обычно и одновременно активирует состояние тревоги.
- Флажок **«Снимок»** — помимо обычного действия, задает объект, настроенный в разделе **«Цель снимка»** . Пример: запустить скрипт, который делает снимок ESP32-CAM и отправляет его.

## Управление пальцами (v0.6.0)

Вкладка **«Управление пальцами»** позволяет управлять пальцами, не открывая веб-интерфейс устройства:

- **Переименовать** — введите идентификационный номер отпечатка пальца и новое имя, затем нажмите _«Переименовать»_ .
- **Создание резервной копии** — загружает все шаблоны отпечатков пальцев с датчика и сохраняет их в файле на хосте ioBroker. `<iobroker-data>/fingerprint.0/fingerprints-backup.json`), которая сохраняется после обновления адаптера.
- **Восстановление из резервной копии** — записывает отпечатки пальцев из этого файла обратно на датчик.

Сначала сохраните настройки экземпляра, чтобы обеспечить возможность подключения устройства.

> **Примечание:** для надежного резервного копирования/восстановления _всех_ пальцев требуется прошивка версии **0.9.4** (полные шаблоны размером 1536 байт). Резервные копии, созданные с помощью более старых версий прошивки, являются неполными — создайте их заново после обновления.

## Зарегистрируйте новый палец (v0.7.0, прошивка ≥ v0.9.4)

Вы можете зарегистрировать новый отпечаток пальца непосредственно в ioBroker — нет необходимости открывать веб-интерфейс устройства:

- **Административный интерфейс:** вкладка _«Управление пальцами»_ → _Зарегистрировать новый палец_ → ввести бесплатный идентификатор (1–200) и имя → **Начать регистрацию** .
- **Штаты:** писать `control.enrollId` и `control.enrollName` затем установить `control.enrollStart` =`true`.

Регистрация осуществляется на устройстве и требует от пользователя **пятикратного** прикладывания пальца к датчику. Информация о ходе процесса отображается в режиме реального времени. `enroll` канал:

| Состояние        | Тип        | Описание                                                           |
| ---------------- | ---------- | ------------------------------------------------------------------ |
| `enroll.active`  | логический | `true` пока идёт процесс регистрации.                              |
| `enroll.step`    | число      | Текущий шаг сканирования (0–5)                                     |
| `enroll.status`  | нить       | `idle` /`scanning` /`success` / `error`                            |
| `enroll.message` | нить       | Последняя строка состояния, удобочитаемая для восприятия человеком |

В случае успешного выполнения операции список отпечатков пальцев обновляется автоматически.

## Управление светодиодным кольцом (v0.7.0, прошивка ≥ v0.9.4)

Управляйте RGB-кольцом датчика через ioBroker:

- `control.ledMode` —`0` выключенный, `1` на, `2` дыхание, `3` мигающий
- `control.ledColor` —`1` красный, `2` синий, `3` фиолетовый, `4` зеленый, `5` желтый, `6` голубой, `7` белый

При записи любого из этих состояний кольцо образуется немедленно.

## Штаты

| Состояние                    | Тип                                 | Описание                                                                  |
| ---------------------------- | ----------------------------------- | ------------------------------------------------------------------------- |
| `info.connection`            | логический                          | Устройство доступно (через) `/api/status` или `/debug` голосование)         |
| `info.uptime`                | число                               | Время работы устройства — в секундах                                      |
| `info.freeHeap`              | число                               | Свободная куча в байтах                                                   |
| `info.firmwareVersion`       | нить                                | версия прошивки устройства                                                |
| `info.serverMode`            | логический                          | Устройство отправляет события непосредственно на этот адаптер.            |
| `info.wifiRssi`              | число                               | Уровень сигнала Wi-Fi в дБм (прошивка ≥ v0.9.4)                           |
| `fingerprints.<id>.name`     | нить                                | Имя пальца, зарегистрированного с этим идентификатором.                   |
| `fingerprints.<id>.lastSeen` | число                               | Отметка времени последнего совпадения пальца                              |
| `fingerprints.<id>.count`    | число                               | Как часто совпадало положение пальца                                      |
| `lastAccess.text`            | нить                                | Последняя доступная для чтения запись (разрешено/отказано)                |
| `lastAccess.granted`         | логический                          | Был ли предоставлен последний доступ?                                     |
| `lastAccess.timestamp`       | число                               | Отметка времени последнего доступа                                        |
| `stats.totalMatches`         | число                               | Общее количество совпадений отпечатков пальцев                            |
| `stats.totalRings`           | число                               | Всего звонков в дверь (неизвестный палец)                                 |
| `stats.lastPerson`           | нить                                | Имя последнего опознанного лица                                           |
| `lastMatch.id`               | число                               | Идентификатор последнего совпавшего пальца (1–200)                        |
| `lastMatch.name`             | нить                                | Название последнего совпавшего пальца                                     |
| `lastMatch.confidence`       | число                               | Уверенность в матче                                                       |
| `lastMatch.timestamp`        | число                               | Отметка времени последнего матча                                          |
| `lastMatch.matched`          | логический                          | Установите значение true для каждого события матча.                       |
| `ring.ringing`               | логический                          | Действительно в течение нескольких секунд при звонке в дверь.             |
| `ring.timestamp`             | число                               | Отметка времени последнего звонка                                         |
| `control.reboot`             | логическое значение (кнопка)        | Перезагрузите устройство                                                  |
| `control.ignoreTouchRing`    | логическое значение (переключатель) | Игнорировать сенсорное кольцо (прошивка ≥ v0.9.1)                         |
| `control.enrollId`           | число                               | Идентификатор слота (1–200) для следующей регистрации (прошивка ≥ v0.9.4) |
| `control.enrollName`         | нить                                | Имя для следующей регистрации (прошивка ≥ v0.9.4)                         |
| `control.enrollStart`        | логическое значение (кнопка)        | Начать регистрацию (прошивка ≥ v0.9.4)                                    |
| `control.ledMode`            | число                               | Режимы светодиодного кольца 0–3 (прошивка ≥ v0.9.4)                       |
| `control.ledColor`           | число                               | Цвет светодиодного кольца 1–7 (прошивка ≥ v0.9.4)                         |
| `enroll.active`              | логический                          | Процесс регистрации запущен (прошивка ≥ v0.9.4)                           |
| `enroll.step`                | число                               | Текущий этап сканирования при регистрации 0–5                             |
| `enroll.status`              | нить                                | `idle` /`scanning` /`success` / `error`                                   |
| `enroll.message`             | нить                                | Последняя строка статуса зачисления                                       |

## Примечание к прошивке

- **Функции «Сопоставление» / «Звонок» / «Статус» / «Перезагрузка»** работают с FingerprintDoorbell **v0.9** без изменений.
- ** `control.ignoreTouchRing` ** Для работы в серверном режиме и списка отпечатков пальцев требуется **версия v0.9.1** .
- **Для резервного копирования/восстановления** всех пальцев требуется **версия 0.9.3** (полные шаблоны размером 1536 байт).
- **Подключение через адаптер, светодиодное кольцо, `info.wifiRssi` ** требуется **версия v0.9.4** .

## Changelog

### 0.7.10

- Polling interval is range-checked (5–600 s) even if the config is edited outside the UI
- Removed unused translation keys; translated the `localLinks` name into all languages

### 0.7.9

- New: link to the device WebUI in the instance list of Admin (`localLinks`)

### 0.7.8

- README is English-only (German disclaimer moved to `DISCLAIMER.de.md`), added the 0.7.7 changelog entry, updated `@iobroker/testing` to 6.3.x

### 0.7.7

- Security/stability: errors in the async webhook handlers can no longer crash the adapter; objects are only created for valid finger IDs (1–200); constant-time token comparison; webhook timeouts; name length and device response size limits; LED values are range-checked; fixed an unhandled rejection after a failed backup request
- Added a disclaimer to the README
- Updated `@iobroker/testing` to 6.3.x

### 0.7.6

- **HOTFIX for v0.7.5**: declaring `adminPassword` / `webhookToken` as `encryptedNative`
  made the js-controller transform previously stored plain text values into unusable data
  before the adapter started, so the device login (HTTP Basic auth) and the server-mode
  provisioning failed. `encryptedNative` was removed again — the values are only declared as
  `protectedNative` now, so stored values keep working
- Unusable values are detected automatically: the webhook token is regenerated and the log
  asks to enter the admin password again (this also covers settings that were saved while
  v0.7.5 was active)
- New `lib/secrets.js` with unit tests for the secret repair logic

### 0.7.5

- Repository checker fixes: moved `protectedNative` / `encryptedNative` to the **root** of
  `io-package.json` (inside `common` they were ignored and the schema reported error E1105),
  reduced `common.news` to 7 entries, added the complete MIT license text including the
  copyright line to the README, completed the `.vscode` JSON schema settings, bumped
  `@iobroker/testing` to 6.2.x

### 0.7.4

- Repository review fixes: corrected state roles (`control.enrollId`/`ledColor`
  use `level`, `ring.ringing` uses `sensor`), marked `adminPassword` /
  `webhookToken` as protected & encrypted native, added Node.js 26 to CI,
  bumped `@iobroker/testing` to 6.x, added `.vscode` JSON schema settings

### 0.7.3

- Automated npm publishing via npm Trusted Publishing (OIDC) with provenance;
  removed the npm token from the deploy workflow

### 0.7.2

- Repository compliance for the ioBroker adapter repo: responsive size attributes
  in the admin UI, license copyright line, Ukrainian translations, a deploy
  workflow job, and internal cleanups (no functional change)

### 0.7.1

- The *Enroll a new finger* section (Manage Fingers) now also shows the
  *Available fingers* reference dropdown, so you can pick a free slot ID

### 0.7.0

- **Enroll from the adapter** (firmware ≥ v0.9.4): start enrollment from the *Manage Fingers*
  tab or via `control.enrollStart`; live progress in the `enroll` channel
  (`active` / `step` / `status` / `message`)
- **LED ring control** (firmware ≥ v0.9.4): `control.ledMode` + `control.ledColor`
- **WiFi signal**: new `info.wifiRssi` state (firmware ≥ v0.9.4)
- **Conditions**: added an *Available fingers* reference dropdown (id → name) so you know
  which IDs to enter

### 0.6.1

- Fix invalid jsonConfig: remove unsupported `attr` from the Manage Fingers rename fields (settings page failed to load)

### 0.6.0

- **Manage Fingers** tab: rename a finger, and backup / restore all fingerprints
  (stored in a file on the ioBroker host that survives adapter updates)
- **Snapshot** action: per-rule checkbox + a *Snapshot target* object — set in addition
  to the normal action, e.g. to trigger a script that captures an ESP32-CAM snapshot

### 0.5.1

- Conditions: the Finger field accepts several IDs comma-separated (e.g. `1,2,4`); added a hint/tooltip

Older entries: see CHANGELOG_OLD.md

## License

MIT License

Copyright (c) 2026 sadam6752-tech sadam6752@gmail.com

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