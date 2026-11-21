---
chapters: {"pages":{"en/adapterref/iobroker.fingerprint/README.md":{"title":{"en":"ioBroker.fingerprint"},"content":"en/adapterref/iobroker.fingerprint/README.md"},"en/adapterref/iobroker.fingerprint/DISCLAIMER.de.md":{"title":{"en":"Haftungsausschluss (Disclaimer) — ioBroker.fingerprint"},"content":"en/adapterref/iobroker.fingerprint/DISCLAIMER.de.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.fingerprint/README.md
title: ioBroker.fingerprint
hash: 99wXQMkIBykzoE0jCJouqLb7XrETk4ClVjwKGlE84w0=
---
![Стабильный](https://iobroker.live/badges/fingerprint-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.fingerprint.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.fingerprint.svg)
![Лицензия](https://img.shields.io/github/license/sadam6752-tech/ioBroker.fingerprint.svg)
![НПМ](https://nodei.co/npm/iobroker.fingerprint.png?downloads=true)
![Тестирование и выпуск](https://github.com/sadam6752-tech/ioBroker.fingerprint/actions/workflows/test-and-release.yml/badge.svg)
![Количество установок](https://iobroker.live/badges/fingerprint-installed.svg)

<img src="https://raw.githubusercontent.com/sadam6752-tech/ioBroker.fingerprint/main/admin/fingerprint.png" width="120" alt="FingerprintDoorbell logo" />

# ioBroker.fingerprint

Интегрирует устройство [FingerprintDoorbell](https://github.com/sadam6752-tech/FingerprintDoorbell) на базе ESP32 в ioBroker по протоколу HTTP **без использования MQTT и адаптера Simple API** .

Адаптер запускает небольшой HTTP-приемник веб-хуков. Дверной звонок звонит ему напрямую при совпадении отпечатка пальца или при нажатии на кнопку неизвестного пальца. Адаптер также опрашивает устройство, чтобы сообщить о его состоянии онлайн/офлайн, и может перезагрузить его или переключить сенсорное кольцо.

## Требования к прошивке

Этот адаптер взаимодействует с прошивкой **FingerprintDoorbell** , работающей на вашем ESP32.

- **Рекомендуется: прошивка версии 0.9.4 или новее** — все перечисленное ниже работает, включая регистрацию через адаптер, управление светодиодным кольцом, сигнал Wi-Fi и надежное резервное копирование/восстановление с помощью нескольких пальцев.
- **Прошивка версии 0.9.3** — надежное резервное копирование/восстановление всех пальцев (полные шаблоны размером 1536 байт).
- **Прошивка версии 0.9.1** — включает _серверный режим_ (адаптер автоматически настраивает устройство, без ручного ввода URL-адресов) `control.ignoreTouchRing` и список отпечатков пальцев.
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
- **Не предназначено для использования в критически важных целях.** Сбои в сети, Wi-Fi, электропитании или программном обеспечении могут привести к задержке или отмене событий. Никогда не используйте его там, где сбой может представлять опасность для жизни или здоровья (например, на пожарных выходах).
- **Ваша сеть, ваша ответственность.** Веб-интерфейс устройства и веб-перехватчик используют обычный HTTP (базовая аутентификация и общий токен передаются в незашифрованном виде). Используйте их только в доверенной локальной сети/VLAN, никогда не открывайте порт веб-перехватчика или устройство для доступа из интернета и храните токен в секрете.
- **Биометрические данные / конфиденциальность (GDPR).** Шаблоны отпечатков пальцев, имена, временные метки и журналы доступа являются персональными данными. Вы являетесь контроллером: получите согласие зарегистрированных лиц, защитите резервные файлы (они содержат исходные шаблоны, не зашифрованные — в папке хранения). `fingerprint.0.storage` читаемый для каждого администратора и, возможно, через `web` Например, а также на внешнем SFTP-сервере (см. _раздел «Резервное копирование»_ ) и соблюдайте применимые к вам законы (например, GDPR/BDSG, правила трудового совета для сотрудников).
- **Действия выполняются в автоматическом режиме.** Правила отпечатков записывают данные в любой выбранный вами объект ioBroker (освещение, замки, сигнализация, скрипты). Тщательно протестируйте свои правила, прежде чем полагаться на них.
- Авторы не несут ответственности за ущерб, потерю данных, несанкционированный доступ, кражу со взломом или любые другие последствия, возникшие в результате использования или неправильного использования данного программного обеспечения.

Немецкая версия доступна по адресу [DISCLAIMER.de.md](/#/docs/adapterref/iobroker.fingerprint/DISCLAIMER.de.md) .

## Безопасность

Аутентификация связи осуществляется в обоих направлениях:

- **Адаптер → устройство** (проверка состояния, перезагрузка, сенсорное кольцо): базовая HTTP-аутентификация с использованием настроенного имени пользователя администратора / пароля администратора.
- **Устройство → адаптер** (соответствие/отключение веб-хуков): общий **токен веб-хука** . Токен генерируется автоматически при первом запуске и отображается в настройках экземпляра. Запросы без действительного токена (через `token` параметр запроса или `X-Auth-Token` Заголовок) отклоняется с ошибкой HTTP 401. При желании можно включить параметр _"Принимать веб-хуки только с IP-адреса устройства"_ , чтобы отклонять запросы также с любых других хостов.

При использовании прошивки версии < v0.9.1 токен необходимо вставлять вручную в URL-адреса устройства. Начиная с версии v0.9.1 (серверный режим), адаптер автоматически создает URL-адреса и токен.

`adminPassword` и `webhookToken` хранятся **в зашифрованном виде** в конфигурации экземпляра (`encryptedNative`) и **защищены** (`protectedNative`), поэтому другие адаптеры не могут их прочитать. Значения, хранящиеся в виде открытого текста в версиях 0.7.12 и более ранних, автоматически шифруются при первом запуске версии 0.7.13: в журнале отображается следующее: `… is now stored encrypted (one-time migration)` И экземпляр перезапускается один раз — это ожидаемое поведение, а не сбой.

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
- **Зарегистрируйте новый палец** — см. ниже.

Резервное копирование и восстановление находятся на вкладке **«Резервное копирование»** (см. _раздел «Резервное копирование»_ ).

Сначала сохраните настройки экземпляра, чтобы обеспечить возможность подключения устройства.

## Резервное копирование (v0.8.0, папка хранения и восстановление v0.8.1)

Вся информация о резервном копировании находится на вкладке **«Резервное копирование»** в настройках экземпляра: **Создать резервную копию** , **Резервное копирование для восстановления** + **Восстановить выбранную резервную копию** , автоматическое резервное копирование, копирование на внешний сервер и восстановление с этого сервера.

> **Примечание:** для надежного резервного копирования/восстановления _всех_ пальцев требуется прошивка версии **0.9.4** (полные шаблоны размером 1536 байт). Резервные копии, созданные с помощью более старых версий прошивки, являются неполными — создайте их заново после обновления.

### Папка хранения

Каждая резервная копия (сделанная вручную, автоматическая, полученная с сервера, резервная копия) представляет собой файл в файловом хранилище ioBroker, в папке. `fingerprint.0.storage/backups/`:

| Файл                                 | Сделано                                                                 | Удалено автоматически                                                                                              |
| ------------------------------------ | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `fingerprint-backup-<time>.json`     | _Создать резервную копию_                                               | никогда                                                                                                            |
| `fingerprint-auto-<time>.json`       | автоматическое резервное копирование                                    | Самые старые из существующих. _Автоматические резервные копии для сохранения_ (по умолчанию 7, 0 = сохранить все). |
| `fingerprint-prerestore-<time>.json` | Сделайте резервную копию датчика непосредственно перед восстановлением. | никогда                                                                                                            |

- В административной панели, во вкладке **«Файлы»** , откройте `fingerprint.0.storage` →`backups` Чтобы **загрузить** резервную копию или **выгрузить** её (например, копию с вашего NAS-сервера), загружаемые файлы должны соответствовать указанному выше шаблону имени.
- Точка крепления имеет следующий тип: `meta.user` Таким образом, резервные копии ioBroker (BackItUp: включают этот экземпляр и его файлы) переносят эту папку вместе с собой.
- Резервная копия файла версии 0.8.0 и более ранних версий (`<iobroker-data>/fingerprint.0/fingerprints-backup.json`) перемещается в папку один раз как `fingerprint-backup-<time of the file>.json`; старый файл переименован в `fingerprints-backup.json.migrated`.
- Как и все данные в файловом хранилище, резервные копии доступны для чтения каждому администратору, и когда... `web` Этот экземпляр предоставляет доступ к файловому хранилищу без авторизации, возможно, через браузер. Он содержит необработанные шаблоны отпечатков пальцев (биометрические данные): защитите свои административные и веб-экземпляры соответствующим образом.

### Восстановить

Вкладка **«Резервное копирование»** → **«Резервная копия для восстановления»** : выберите резервную копию (сначала самую новую; откройте настройки, чтобы обновить список) → **Восстановить выбранную резервную копию** → подтвердить. Адаптер проверяет файл (действительный JSON, идентификаторы пальцев 1–200, отсутствие дубликатов, наличие шаблонов), сохраняет текущее содержимое датчика как `fingerprint-prerestore-<time>.json` Затем записывает резервную копию на датчик. Если текущее содержимое не может быть считано с устройства, восстановление прерывается.

### Восстановление после новой установки ioBroker

1. Установите адаптер и введите настройки устройства (IP-адрес, имя пользователя/пароль администратора). Сохраните изменения.
2. Верните резервную копию — одну из следующих:
   - **Из резервной копии ioBroker/BackItUp** : после восстановления папка хранения снова отображается;
   - **Загрузка** : администратор → **Файлы** →`fingerprint.0.storage` →`backups` → загрузить файл;
   - **С SFTP-сервера** : вкладка **«Резервное копирование»** → введите настройки SFTP, включите копирование, сохраните → **Резервное копирование на сервере** → выберите → **Загрузить с сервера и восстановить** . Файл будет загружен в папку хранения и восстановлен за один шаг.
3. Для первых двух способов: вкладка **«Резервное копирование»** → **«Резервная копия для восстановления»** → **«Восстановить выбранную резервную копию»** .

### Автоматическое резервное копирование

Вкладка **«Резервное копирование»** в настройках экземпляра позволяет создавать резервные копии отпечатков пальцев автоматически, **ежедневно** или **еженедельно** — по умолчанию эта функция **отключена** . Каждая автоматическая резервная копия представляет собой новый файл в папке хранения; устройство должно быть доступно.

- Отсчет интервала начинается с последнего резервного копирования (ручного или автоматического), в том числе после перезагрузки адаптера. Просроченное резервное копирование запускается через пять минут после начала.
- Устройство, **не** распознающее отпечатки пальцев, не создает резервную копию (автоматическое резервное копирование пропускается и записывается в журнал).
- Если устройство недоступно, следующая попытка будет предпринята через час. При активной регистрации резервное копирование откладывается на десять минут.
- Время последнего резервного копирования указано в `info.lastBackup`.

### Копирование на внешний сервер (SFTP)

Резервная копия, находящаяся на том же компьютере, что и ioBroker, не сохранится после потери этого компьютера. Вкладка **«Резервное копирование»** позволяет скопировать **каждую резервную копию** (автоматическую и ручную) на другой компьютер, например, NAS, по **протоколу SFTP** . Адаптер сам открывает SSH-соединение: без монтирования, без... `sudo` Команда оболочки отсутствует.

1. На сервере создайте пользователя, которому разрешено только записывать данные в целевой каталог (не администратора), и включите SFTP (на Synology: _Панель управления → Файловые службы → FTP → Включить службу SFTP_ ).
2. На вкладке **«Резервное копирование** » включите копирование и введите хост, пользователя, пароль и каталог (он создается, если отсутствует). Пароль хранится в зашифрованном виде и никогда не записывается в журнал.
3. Нажмите _«Проверить соединение»_ : адаптер подключается, создает каталог, записывает и удаляет небольшой тестовый файл и отображает **отпечаток** сервера. Введите этот отпечаток в настройках, чтобы доверять только этому серверу — другой сервер будет отклонен до отправки пароля. Без отпечатка копирование тоже работает, но сервер не проверяется (в журнале появляется предупреждение при каждом копировании с отпечатком).

Как оно себя ведёт:

- Сначала создается локальная резервная копия. Если копирование не удается, резервная копия остается, ошибка регистрируется и отображается в журнале. `info.remoteBackupError`; последняя успешная копия находится в `info.lastRemoteBackup` В случае неудачной попытки копирования повторная **попытка не предпринимается** : сначала копируется следующая резервная копия.
- Названия файлов: `fingerprint-backup-<time>.json` (вручную) и `fingerprint-auto-<time>.json` (автоматически), время в формате UTC.
- Копия появляется под своим окончательным названием только после завершения работы (загрузки в виде файла). `.part` (размер проверен, переименовано). Время копирования ограничено десятью минутами. Остатки прерванных загрузок этого адаптера удаляются следующей работоспособной копией.
- При выборе _количества копий для хранения на сервере_ удаляются самые старые **автоматические** копии, начиная с указанного числа (0 = сохранить все). Резервные копии, созданные вручную, и все остальные файлы в каталоге никогда не удаляются.
- Поддерживается только вход по паролю. Файл **не шифруется** на сервере — шифруется передача. Он содержит необработанные шаблоны отпечатков пальцев (биометрические данные): храните его на томе, доступном для чтения только вам.

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

| Состояние                    | Тип                                 | Описание                                                                               |
| ---------------------------- | ----------------------------------- | -------------------------------------------------------------------------------------- |
| `info.connection`            | логический                          | Устройство доступно (через) `/api/status` или `/debug` голосование)                      |
| `info.uptime`                | число                               | Время работы устройства — в секундах                                                   |
| `info.freeHeap`              | число                               | Свободная куча в байтах                                                                |
| `info.firmwareVersion`       | нить                                | версия прошивки устройства                                                             |
| `info.serverMode`            | логический                          | Устройство отправляет события непосредственно на этот адаптер.                         |
| `info.wifiRssi`              | число                               | Уровень сигнала Wi-Fi в дБм (прошивка ≥ v0.9.4)                                        |
| `info.lastBackup`            | число                               | Время последнего резервного копирования отпечатков пальцев (вручную или автоматически) |
| `info.lastRemoteBackup`      | нить                                | Путь к последней копии на внешнем SFTP-сервере                                         |
| `info.remoteBackupError`     | нить                                | Ошибка при последней копии на внешнем сервере (пусто = нормально)                      |
| `fingerprints.<id>.name`     | нить                                | Имя пальца, зарегистрированного с этим идентификатором.                                |
| `fingerprints.<id>.lastSeen` | число                               | Отметка времени последнего совпадения пальца                                           |
| `fingerprints.<id>.count`    | число                               | Как часто совпадало положение пальца                                                   |
| `lastAccess.text`            | нить                                | Последняя доступная для чтения запись (разрешено/отказано)                             |
| `lastAccess.granted`         | логический                          | Был ли предоставлен последний доступ?                                                  |
| `lastAccess.timestamp`       | число                               | Отметка времени последнего доступа                                                     |
| `stats.totalMatches`         | число                               | Общее количество совпадений отпечатков пальцев                                         |
| `stats.totalRings`           | число                               | Всего звонков в дверь (неизвестный палец)                                              |
| `stats.lastPerson`           | нить                                | Имя последнего опознанного лица                                                        |
| `lastMatch.id`               | число                               | Идентификатор последнего совпавшего пальца (1–200)                                     |
| `lastMatch.name`             | нить                                | Название последнего совпавшего пальца                                                  |
| `lastMatch.confidence`       | число                               | Уверенность в матче                                                                    |
| `lastMatch.timestamp`        | число                               | Отметка времени последнего матча                                                       |
| `lastMatch.matched`          | логический                          | Установите значение true для каждого события матча.                                    |
| `ring.ringing`               | логический                          | Действительно в течение нескольких секунд при звонке в дверь.                          |
| `ring.timestamp`             | число                               | Отметка времени последнего звонка                                                      |
| `control.reboot`             | логическое значение (кнопка)        | Перезагрузите устройство                                                               |
| `control.ignoreTouchRing`    | логическое значение (переключатель) | Игнорировать сенсорное кольцо (прошивка ≥ v0.9.1)                                      |
| `control.enrollId`           | число                               | Идентификатор слота (1–200) для следующей регистрации (прошивка ≥ v0.9.4)              |
| `control.enrollName`         | нить                                | Имя для следующей регистрации (прошивка ≥ v0.9.4)                                      |
| `control.enrollStart`        | логическое значение (кнопка)        | Начать регистрацию (прошивка ≥ v0.9.4)                                                 |
| `control.ledMode`            | число                               | Режимы светодиодного кольца 0–3 (прошивка ≥ v0.9.4)                                    |
| `control.ledColor`           | число                               | Цвет светодиодного кольца 1–7 (прошивка ≥ v0.9.4)                                      |
| `enroll.active`              | логический                          | Процесс регистрации запущен (прошивка ≥ v0.9.4)                                        |
| `enroll.step`                | число                               | Текущий этап сканирования при регистрации 0–5                                          |
| `enroll.status`              | нить                                | `idle` /`scanning` /`success` / `error`                                                |
| `enroll.message`             | нить                                | Последняя строка статуса зачисления                                                    |

## Примечание к прошивке

- **Функции «Сопоставление» / «Звонок» / «Статус» / «Перезагрузка»** работают с FingerprintDoorbell **v0.9** без изменений.
- ** `control.ignoreTouchRing` ** Для работы в серверном режиме и списка отпечатков пальцев требуется **версия v0.9.1** .
- **Для резервного копирования/восстановления** всех пальцев требуется **версия 0.9.3** (полные шаблоны размером 1536 байт).
- **Подключение через адаптер, светодиодное кольцо, `info.wifiRssi` ** требуется **версия v0.9.4** .

## Changelog

### **WORK IN PROGRESS**

- `@iobroker/testing` 6.3.2 (repository checker W0037)

### 0.8.3

- The webhook port is declared in the used resources registry of js-controller (js-controller 8 and newer), and a warning is logged when another instance already uses it; nothing changes on older controllers

### 0.8.2

- Admin UI: *Create backup* and *Restore* moved from *Manage Fingers* to the **Backup** tab, so everything about backups is on one page

### 0.8.1

- New **storage folder** `fingerprint.0.storage/backups/` (`meta.user`): every backup is a file there — download and upload it in the admin tab *Files*; ioBroker/BackItUp backups take it along. The backup file of 0.8.0 is moved there once
- New: **restore a chosen backup** (list newest first, confirmation). Before every restore the current content of the sensor is saved as a safety copy (`fingerprint-prerestore-…`); the file is checked first (JSON, ids 1–200, no duplicates, templates)
- New: **restore from the external SFTP server** — list the backups on the server, fetch one into the storage folder and restore it (for a new installation of ioBroker)
- New setting *Automatic backups to keep* (default 7); backups made by hand and safety copies are never deleted
- Tests: storage, restore, safety copy and SFTP restore against a real js-controller, a simulated device and an SFTP server inside the test

### 0.8.0

- New **Backup** tab: automatic fingerprint backup (off, daily, weekly; off by default). The interval counts from the last backup, also after a restart; an empty device never replaces an existing backup
- New: every backup (by hand and automatic) can be copied to an external server over **SFTP** (e.g. a NAS) — upload as `.part` with size check and rename, optional host key fingerprint, test button, cleanup of old automatic copies. The password is stored encrypted (`encryptedNative`)
- New states `info.lastBackup`, `info.lastRemoteBackup`, `info.remoteBackupError`
- Admin buttons wait until the adapter has finished its start
- New dependency `ssh2`; tests against an SFTP server inside the test and an integration test with a simulated device

### 0.7.13

- Security: `adminPassword` and `webhookToken` are stored encrypted (`encryptedNative`), resolving repository checker warning W1074
- Values stored as plain text by older versions are encrypted automatically on the first start (`lib/secrets.js`). The log shows `… is now stored encrypted (one-time migration)` and the instance restarts once; nothing has to be entered again
- A newly generated webhook token is stored encrypted
- Tests: unit tests against the encryption of js-controller 7.2.2 and integration tests with a real js-controller

### 0.7.12

- Security: the webhook token no longer appears in error messages; the backup file is only readable by its owner (`0600`); match events with invalid finger IDs are ignored; device-supplied names are sanitized (control characters, length); rejected webhook requests are logged rate-limited; removed the unused `getWebhookInfo` message command
- Stability: the webhook start is retried every 30 s if the port is busy
- Admin UI: quotes and backslashes in the rename/enroll name fields are rejected (they broke the request)

### 0.7.11

- Fix: `lastMatch.matched` is reset after 3 s, so every match is a state change for scripts
- Fix: `info.connection` is correct when status polling is disabled (one initial poll is always done)
- Fix: match/ring counters no longer lose concurrent events
- Faster adapter stop (idle webhook connections are closed)
- README: added badges

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