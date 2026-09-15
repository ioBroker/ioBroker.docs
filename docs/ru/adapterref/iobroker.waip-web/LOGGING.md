---
chapters: {"pages":{"en/adapterref/iobroker.waip-web/README.md":{"title":{"en":"ioBroker.waip-web"},"content":"en/adapterref/iobroker.waip-web/README.md"},"en/adapterref/iobroker.waip-web/README.de.md":{"title":{"en":"ioBroker.waip-web"},"content":"en/adapterref/iobroker.waip-web/README.de.md"},"en/adapterref/iobroker.waip-web/LOGGING.md":{"title":{"en":"Logging reference"},"content":"en/adapterref/iobroker.waip-web/LOGGING.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.waip-web/LOGGING.md
title: Справочник по ведению журнала
hash: 68UQtc7B0d9mf0Z1mVPMZh7CvqRS2K4aqfw6driNIn4=
---
# Справочник по ведению журнала
Это полный справочник всех сообщений журнала, которые может генерировать этот адаптер, сгруппированных по уровню, с указанием причины и примером текста. Он создан для того, чтобы вы могли быстро найти информацию о сообщении в журнале ioBroker - что его вызвало, требуется ли какое-либо действие и что (если что-либо) происходит автоматически после этого.

Ссылка на основной раздел [README](/#/adapters/waip-web#logging).

## Условные обозначения, которым следует этот адаптер
- Весь текст логов отображается на **английском языке**, независимо от используемой системы ioBroker.

язык (переводится только текст, отображаемый в пользовательском интерфейсе, например, метки администратора) - согласно [официальные правила ведения журналов ioBroker](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/adapterdev.md#logging).

- Для ситуаций, которые могут **повторяться** во время работы адаптера.

(обновление сессионного cookie, регистрация WAIP, само соединение Socket.IO и поток событий, поступающих через некорректный монитор), адаптер следует рекомендованному шаблону, описанному в тех же рекомендациях, вместо того, чтобы регистрировать каждое событие на одном и том же уровне:

- **первое появление** → `warn` (или `error`, в случае ошибки)

из `handler.exec`/`wrapHandlerWithMonitorCheck`)

- **каждое событие, пока оно продолжается** → `debug` (видно с помощью

Уровень логирования `debug`/`silly`, поэтому ничего не теряется, но больше не будет засоряться стандартный лог `info`)

- **восстановление** → `информация`, записано ровно один раз, плюс

`<key>_recovered` запись в `debug.monitorAudit`

- Дублирующиеся сообщения (идентичный текст в течение 5 секунд) подавляются с помощью

внутренний кэш дедупликации (`safeLog()`), поэтому серия идентичных ошибок, вызванных одним и тем же сбоем, приводит к появлению только одной строки в логе.

- Конфиденциальные данные (значение сессионного cookie, полные URL-адреса с учетными данными) не передаются.

Зарегистрированы только коды состояния, метки времени истечения срока действия и сообщения об ошибках.

## Ошибка
Что-то было утеряно или не удалось обработать - всегда стоит это проверить.

| Источник | Причина | Пример |
| --- | --- | --- |
| `handler.exec` | Полученное событие (`io.new_waip`/`io.new_rmld`/`io.routes`/`io.playtts`/`io.standby`) соответствовало зарегистрированному монитору, но его обработчик выдал ошибку при обработке - данные события не были применены. | `handler.exec: Cannot read properties of undefined (reading 'lat')` |
| `handleAlarm` | Событие `io.new_waip` (новый инцидент) не может быть обработано. | `handleAlarm: <error message>` |
| `handleRueckmeldung` | Событие `io.new_rmld` (обратная связь от респондента) не может быть обработано. | `handleRueckmeldung: <error message>` |
| `handleStandby` | Событие `io.standby` не может быть обработано - история инцидентов/состояния активности теперь могут быть несогласованными. | `handleStandby: <error message>` |
| `handleRoutes` | Событие `io.routes` не может быть обработано. | `handleRoutes: <error message>` |
| `handleTTS` | Событие `io.playtts` не может быть обработано. | `handleTTS: <error message>` |
| `handleTTS` | Не удалось обработать событие `io.playtts`. | `handleTTS: <сообщение об ошибке>` |

## Предупреждать
Что-то не так или устройство работает некорректно, но адаптер продолжает работать и обычно восстанавливается самостоятельно; стоит проверить, если проблема повторяется.

| Источник | Причина | Пример |
| --- | --- | --- |
| `refreshSessionCookie` *(первое появление, затем `debug`; восстанавливается до `info` через `logRecovered`)* | Запрос на поддержание сессии не удался, или в ответе сервера отсутствовал заголовок `Set-Cookie`. | `refreshSessionCookie: keepalive response had no Set-Cookie header (status 200)` |
| `socket.emit.WAIP` *(первое появление, затем `debug`; восстанавливается до `info`)* | Сам вызов регистрации `socket.emit('WAIP', …)` вызвал ошибку (например, сокет уже закрывается). | `socket.emit.WAIP: <error message>` |
| `connect` *(первое появление, затем `debug`; восстанавливается до `info`)* | Установление соединения Socket.IO (`io(...)` / прикрепление слушателей) завершилось с ошибкой. | `connect: <error message>` |
| `ignoredEvent.wrongMonitor` *(повышается с `info` только после достижения порогового значения скорости; возвращается к `info` после снижения скорости)* | Более 20 событий с другим идентификатором монитора поступили в течение 5 минут - обычно это просто фильтр шума (см. `info` ниже), но устойчиво высокая скорость обычно означает, что настроенный идентификатор монитора неверен. | `ignoredEvent.wrongMonitor: Repeatedly receiving events for a different monitor (current=0, 20 in the last 5min) - check the configured monitor ID` |
| *(прямой, без дедупликации/эскалации)* `checkMissedStandby` | `einsatz.restzeit` застрял на 0 более чем на 60 секунд, в то время как инцидент все еще отслеживается как активный - `io.standby` с большой вероятностью был пропущен (например, отключение в неподходящий момент); инцидент автоматически завершается сразу после этой строки журнала. | `Likely missed io.standby detected (ablaufzeit exceeded by more than 60s) - finalizing incident 3fa2...c19 automatically.` |
| `resetAllStates` / `initStateIfMissing <id>` / `clearCurrentEinsatzStates` / `persistEinsatzSnapshot` / `pushEinsatzToHistory` / `updateRueckmeldungCounts` / `einsatz.*.setState` / `handleAlarm.setFields` / `handleServerVersion` / `<id>.setState` (через `setField`) | Один вызов `setStateAsync()` отклонен (редко - например, объект еще не создан или произошел сбой в базе данных ioBroker). Каждый сайт регистрирует свой собственный контекст, поэтому состояние сбоя можно идентифицировать. | `einsatz.routenGesamt.setState: <error message>` |
| `initObjects channel <id>` / `initObjects state <id>` | Один вызов `setObjectNotExistsAsync()` во время создания объекта запуска был отклонен - чаще всего из-за того, что адаптер был остановлен (например, быстрая перезагрузка во время/сразу после обновления), пока он еще работал, поэтому соединение с базой данных разорвалось в середине цикла. Остальные определения каналов/состояний пропускаются для этого запуска (возобновляются при следующем запуске) вместо того, чтобы каждое из них завершалось с ошибкой по отдельности. | `initObjects state einsatz.rueckmeldungAnzahl: Cannot check object existence of "waip-web.0.einsatz.rueckmeldungAnzahl": Connection is closed.` |
| `io.error (Server)` *(только для нераспознанного текста ошибки - см. `info` ниже для известного случая самовосстановления)* | Сервер отправил событие `io.error`, текст которого **не** соответствует известному шаблону «обновления сессии» с самовосстановлением - неясно, не приведет ли это к каким-либо последствиям. | `io.error (Server): Unbekannter interner Fehler` |
| `buildEinsatzMapImage.tile <zoom>/<x>/<y>` | При создании [изображение карты инцидентов](/#/adapters/waip-web#incident-map-image) (например, ошибка 404/тайм-аут) произошла ошибка загрузки/декодирования одного тайла OpenStreetMap - допустимо, затронутая область тайла просто сохраняет цвет фона холста, остальная часть изображения остается неизменной. | `buildEinsatzMapImage.tile 16/35205/21493: tile 16/35205/21493 -> HTTP 503` |
| `generateEinsatzMapImage` | Генерация изображения карты инцидента завершилась неудачей (например, не удалось создать все тайлы, не удалось создать каталог карт или не удалось записать PNG-файл) - `einsatz.kartenbildPfad` явно очищается (не остается с устаревшим предыдущим значением); сам инцидент обрабатывается нормально, отсутствует только изображение карты для этого инцидента. | `generateEinsatzMapImage: no tiles to fetch for lat=52.52 lon=13.405 zoom=16` |
| `generateEinsatzMapImage.timeout` | [изображение карты инцидентов](/#/adapters/waip-web#incident-map-image) не был готов в течение заданного **тайм-аута OSM** (1-60 с, по умолчанию 10 с) - обработка тревоги продолжается без него (`einsatz.kartenbildPfad` остается пустым для этого инцидента); сама загрузка/составление продолжается в фоновом режиме, но ее результат отбрасывается, как только она завершается с задержкой. | `generateEinsatzMapImage.timeout: image was not ready within the configured OSM timeout of 10s - leaving einsatz.kartenbildPfad empty for this incident` |
| `pruneMapImages` / `pruneMapImages <filename>` | Не удалось выполнить ограничение на хранение 10 изображений для [изображения карт происшествий](/#/adapters/waip-web#incident-map-image) - либо был получен список каталога карт (`pruneMapImages`), либо удален один конкретный старый файл (`pruneMapImages <filename>`). Не критично: до следующего успешного запуска на диске останется максимум несколько лишних старых изображений. | `pruneMapImages einsatz_1787571373962_BIGCIRC0.png: EBUSY: resource busy or locked` |
| `pruneMapImages` / `pruneMapImages <filename>` | Не удалось выполнить ограничение на хранение 10 изображений для [изображений карт инцидентов](/#/adapters/waip-web#incident-map-image) - либо отображается содержимое каталога карт (`pruneMapImages`), либо удаляется один конкретный старый файл (`pruneMapImages <filename>`). Не критично: до следующего успешного запуска на диске остается максимум несколько лишних старых изображений. | `pruneMapImages einsatz_1787571373962_BIGCIRC0.png: EBUSY: ресурс занят или заблокирован` |

## Информация
Нормальный режим работы - жизненный цикл подключения/регистрации, ожидаемые восстановления и ожидаемые события фильтрации. Отображается на уровне логирования ioBroker по умолчанию.

| Источник | Причина | Пример |
| --- | --- | --- |
| *(очистка при запуске адаптера)* `cleanupObsoleteObjects` | В процессе миграции при запуске был обнаружен и удален остаточный объект состояния от предыдущей версии адаптера (по идентификатору объекта). | `Removed obsolete state object from a previous version: tts.last` |
| `refreshSessionCookie` | Сервер выдал совершенно новый сессионный cookie, поскольку предыдущий больше недействителен - это часть нормального самовосстанавливающегося цикла сессии; запускает автоматическое переподключение. | `Session cookie was reissued by the server (old session was invalid) – forcing reconnect` |
| *(через `logRecovered`)* восстановление сессионного cookie | Ранее зарегистрированная ошибка обновления сессионного cookie (см. `warn` выше) снова успешно устранена. | `Session cookie refresh recovered` |
| `forceReconnect` | Соединение Socket.IO перестраивается намеренно (сессионный cookie-файл заменен или сервер сообщил о новой версии/идентификаторе экземпляра). | `Rebuilding the Socket.IO connection (session cookie rotated)` |
| `handleServerVersion` | Версия/идентификатор экземпляра сервера, указанная в отчете, изменилась во время выполнения - обычно это происходит при перезапуске сервера; обрабатывается автоматически (обновление сессии + переподключение). | `WAIP server reports a new version/instance ID (a1b2 -> c3d4) - likely a server restart` |
| `ignoredEvent.wrongMonitor` *(нормальная частота; см. `warn` выше, когда она резко возрастет)* | Пришло событие, полезная нагрузка которого явно указывает на другой идентификатор монитора, отличный от того, к которому зарегистрирован данный экземпляр - ожидаемая фильтрация, а не ошибка. | `ignoredEvent.wrongMonitor: Received an event for a different monitor (current=0)` |
| `wrapHandlerWithMonitorCheck` (через `logRecovered`) | Регистрация WAIP была (повторно) подтверждена полученным событием. | `WAIP registration recovered` |
| *(handleStandby)* | Получено событие `io.standby` - инцидент завершен или монитор находится в режиме ожидания. | `Standby received - incident ended, or monitor idle` |
| `io.error (Server)` *(только известный случай)* | Сервер отправил хорошо известный текст «ошибка обновления сессии», который является частью собственного самовосстанавливающегося цикла сессии адаптера (~10 минут) и разрешается самостоятельно. | `io.error (Server): Fehler beim Erneuern der Session` |
| *(onSocketConnect)* | Сообщение о регистрации было отправлено на сервер. | `socket.emit('WAIP', 12345)` |
| *(onSocketConnect)* | Установлено соединение Socket.IO с пространством имен `/waip`, отправлен сигнал регистрации. | `Connected monitor 12345 -> namespace /waip (registered via WAIP emit)` |
| *(через `logRecovered`)* восстановление соединения | Ранее зарегистрированная ошибка при установлении соединения (см. `warn` выше) была успешно устранена при последующей попытке. | `Socket.IO connection recovered` |
| *(onSocketDisconnect, via `logDisconnect`, deduped)* | Сокет отключен; запланировано ручное переподключение (`reconnection: false`, встроенного автоматического переподключения нет). | `Socket disconnected: transport close` |
| *(срабатывает таймер переподключения)* | Запущено запланированное ручное переподключение после отключения. | `manual reconnect triggered for monitor '12345'` |
| `onSocketConnectError` *(через `logDisconnect`, дедуплицировано)* | Первая попытка подключения завершилась неудачей (в отличие от разрыва соединения после установления соединения). | `connect_error: Error: xhr poll error` |
| *(срабатывает таймер переподключения)* | Запланированное ручное переподключение после `connect_error` запущено. | `manual reconnect after connect_error for monitor '12345'` |
| *(срабатывает таймер переподключения)* | Запланированное ручное переподключение после ошибки `connect_error` запущено. | `ручное переподключение после ошибки connect_error для монитора '12345'` |

## Отладка
Подробная диагностическая информация - видна только при уровне логирования `debug`/`silly`. Включает каждое повторное возникновение условий повторяющихся сбоев, перечисленных в `warn` выше (сессионный cookie, регистрация, соединение), после того, как они были зарегистрированы хотя бы один раз на уровне `warn`.

| Источник | Причина | Пример |
| --- | --- | --- |
| `refreshMonitorName` / `getMonitorList` | Не удалось получить/разобрать страницу обзора `/waip/` (для отображаемого имени монитора или выпадающего списка администратора) - не критично, оба варианта имеют резервные. | `getMonitorList: <error message>` |
| `forceReconnect(<reason>)` | Запрос на переподключение был отправлен, но пропущен, поскольку `connect()` уже выполнялся или в данный момент нет соединения (следующий вызов `connect()` в любом случае определит причину). | `forceReconnect(session cookie rotated): connect() is already running, skipping the forced reconnect` |
| `appendMonitorAudit` | Запись в `debug.monitorAudit` не удалась - затрагивает только внутренний журнал аудита, а не реальные данные об инциденте. | `appendMonitorAudit: <error message>` |
| *(handleRueckmeldung)* | Событие обратной связи для UUID инцидента, отличного от отслеживаемого в данный момент (уже завершенного), было проигнорировано. | `Ignoring feedback for a different incident 9a1b...e02 (current=3fa2...c19)` |
| `connect()` настройка | Регистрирует согласованный интервал пинга/таймаут механизма Socket.IO один раз для каждого соединения. | `engine pingInterval=25000 pingTimeout=20000` |
| `connect()` пакеты движка *(ограничено 10 пакетами на соединение)* | Необработанные пакеты ping/pong/open/close на уровне движка Socket.IO - ограничены, поскольку они повторяются в течение всего времени существования соединения и не имеют дополнительной диагностической ценности после первых нескольких. | `engine.packet: {"type":"ping"}` |
| `connect()` пакеты движка | Необработанное содержимое пакета сообщения движка, не использующего протокол ping/pong (усеченное до 200 символов). | `engine.packet.message preview: 42/waip,["io.new_waip",{"stichwort":"B2"...` |
| `connect()` Предварительный просмотр входящих событий *(только первые 6 событий на одно соединение)* | Предварительный просмотр первых нескольких входящих событий Socket.IO после подключения для диагностики того, что фактически отправляет сервер. | `incoming event 'io.new_waip' preview: {"stichwort":"B2","ort":"Musterstadt"...` |
| *(handleAlarm, до изменения любого состояния)* | Входящее событие `io.new_waip` было идентифицировано как инцидент службы спасения (через `einsatzart`) и полностью проигнорировано, поскольку флажок **Обрабатывать инциденты службы спасения** на вкладке [Спасательная служба](/#/adapters/waip-web#rescue-service) снят. | `Ignoring rescue-service incident (einsatzart="Rettungseinsatz") - rdAlarmierungEnabled is disabled` |
| `buildEinsatzMapImage` | Уровень масштабирования, заданный в [изображение карты инцидентов](/#/adapters/waip-web#incident-map-image), не позволял полностью разместить полигон области попадания в изображение, поэтому адаптер автоматически уменьшил масштаб до уровня, показанного здесь, прежде чем загрузить тайлы. | `buildEinsatzMapImage: zooming out from 16 to 10 so the incident area fits in the image` |
| `buildEinsatzMapImage` | Уровень масштабирования, заданный для [изображения карты инцидента](/#/adapters/waip-web#incident-map-image), не позволял полностью разместить полигон зоны инцидента на изображении, поэтому адаптер автоматически уменьшил масштаб до уровня, показанного здесь, перед загрузкой тайлов. | `buildEinsatzMapImage: уменьшение масштаба с 16 до 10, чтобы зона инцидента поместилась на изображении` |

## Журнал аудита (`debug.monitorAudit`)
Независимо от указанного выше уровня логирования, в состоянии `debug.monitorAudit` также хранится скользящий JSON-массив последних 200 событий жизненного цикла (см. [README](/#/adapters/waip-web#debug)), включая `emit_WAIP`, `registration_timeout`, `session_cookie_rotated`, `server_version_changed`, `standby`, `missed_standby_timeout`, `manual_reconnect_triggered`, `manual_reconnect_after_error` и запись `<key>_recovered` для каждого восстановления, описанного выше (`sessionCookie_recovered`, `registration_recovered`, `connection_recovered`, `wrongMonitor_recovered`). Полезно для восстановления истории соединения без необходимости включения журналов отладки.