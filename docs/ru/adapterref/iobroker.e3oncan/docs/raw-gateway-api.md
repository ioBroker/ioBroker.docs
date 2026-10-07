---
chapters: {"pages":{"en/adapterref/iobroker.e3oncan/README.md":{"title":{"en":"ioBroker.e3oncan"},"content":"en/adapterref/iobroker.e3oncan/README.md"},"en/adapterref/iobroker.e3oncan/lib/data-points.md":{"title":{"en":"ioBroker.e3oncan"},"content":"en/adapterref/iobroker.e3oncan/lib/data-points.md"},"en/adapterref/iobroker.e3oncan/README.de.md":{"title":{"en":"ioBroker.e3oncan"},"content":"en/adapterref/iobroker.e3oncan/README.de.md"},"en/adapterref/iobroker.e3oncan/docs/raw-gateway-api.md":{"title":{"en":"Raw-Gateway-API (open3e-esp32 ↔ ioBroker.e3oncan)"},"content":"en/adapterref/iobroker.e3oncan/docs/raw-gateway-api.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.e3oncan/docs/raw-gateway-api.md
title: Raw-Gateway-API (open3e-esp32 ↔ ioBroker.e3oncan)
hash: YgwK2j905os41jd7Jh6rkplqOCaD4jBliTKVscG2rjU=
---
# Raw-Gateway-API (open3e-esp32 ↔ ioBroker.e3oncan)

Referenz für die Rohdaten-Schnittstellen, die dieser Branch für externe Integrationen ergänzt (REST `rawread` /`rawwrite`, MQTT-Raw-Relay, Status- Erkennung, Scan-Delegation) sowie für die Gogenseite in ioBroker.e3oncan, das als erste Software diesen Weg nutzt. Siehe auch die kurze Übersicht im README unter «Rohdaten für externe Integrationen».

**Umsetzungsstand:** Abschnitt 1 (REST rawread/rawwrite, без службы 0x77) и `rawApiVersion` /`rawWriteEnabled` -Teil von Abschnitt 3 с использованием, миганием и **завершением проверки симулятора** (`GET /api/rawread` гелесен, `rawWriteEnabled` за `/api/settings` gesetzt, `POST /api/rawwrite` auf DID 396, Little-Endian-Kodierung über Rücklesen bestätigt). Отмена 5 (Сканирование-Умбау при делегировании встроенного ПО, только если вы хотите использовать конечные точки — kein neuer Firmware-Code notig) должно быть реализовано и **окончательно проверено** (Geräte-Scan mit Fortschrittsanzeige, Datenpunkt-Scan mit und ohne Speichern, 7 Geräte / über 1200 DID, Varianten-Erkennung inklusive). Abschnitt 2 (Raw-MQTT-Topic für Collect/E380) полностью реализован и **проверен Ende-zu-Ende** (0x693 и E380 или 0x250 для MQTT, параллельно с обычным UDS-Poll-Betrieb и им `em380` s eigener Dekodieung). Der Push-Teil von Abschnitt 3 (сохранен) `open3e/status`) реализовано (`mqtt_pub.c`), **noch nicht gegen echte Hardware verifiziert** (Build ausstehend).

## 1. UDS Lesen/Schreiben (REST)

### GET /api/rawread

Запрос: `ecu=0x680&did=268,269` (Batch durch Komma-Liste)

Ответ 200:

```json
{
  "ecu": "0x680",
  "results": [
    { "did": 268, "data": "6201..." , "len": 12 },
    { "did": 269, "error": "timeout" }
  ]
}
```

Wichtig für den Scan-Anwendungsfall: eine nicht antwortende DID ist ein **Normaler, erwarteter** Ausgang (die meisten DIDs im Bereich 256–4000 Existieren Nicht) – kein HTTP-Fehler, sondern ein `error` -Фельд про Ergebnis в einer sonst erfolgreichen Response. Проблемы с транспортом/шлюзом (автобус не работает, адрес ECU не работает) можно использовать как HTTP-Fehler zurückkommen.

Obergrenze für die Batch-Größe pro Aufruf: 10 DID. Der ESP32 ist deutlich langsamer als ein Raspi — он лучше всего работает, если очередь владельца автобуса не зависит от вашего запроса на блокировку запроса.

### POST /api/rawwrite

Тело:

```json
{ "ecu": "0x680", "did": 396, "svc": "0x2E", "data": "1600" }
```

`svc`: нур `"0x2E"` **ворстерт** —`uds.h` в open3e-esp32 версия лучше всего работает с сервисом 0x77 (open3e stuft ihn als Experimentell ein, siehe Kommentar dort), это самый удачный вариант, который является лучшим Sicherheitsentscheidung. `rawwrite` лент `"0x77"` deshalb aktuell mit einem klaren Fehler ab; Для того, чтобы получить доступ к коду, необходимо отделить его от других предметов, чтобы получить информацию о Кодексе.

Ответ на лучший ответ на Конвенцию `/api/write`, nicht einem eigenen `{"ok": false, ...}` -Схема: Успех `{"ok": true}` (HTTP 200), проверьте статус HTTP-4xx с `{"error": "..."}` -Тело.

Gate: eigene Einstellung `rawWriteEnabled`, **getrennt** von `writeEnabled` унд дефолт аус —`rawwrite` umgeht bewusst die Datenbank-Prüfungen (bekannt/rw), die `writeEnabled` heute voraussetzt, это также ein größerer Vertrauensschritt und verdient einen eigenen Schalter.

`data` Sind die Reinen Wertbytes, **ohne** Service-Envelope — für ein künftiges `0x77` также префикс nicht das Viessmann-spezifische (`43 01 82 <didLo> <didHi> <lenCode>` + Padding), das die lokale Implementierung heute noch selbst baut. Конверт с прошивкой, аналоговый вариант, с кодом 0x77-Ответ на README, который не требуется декодировать, от Aufrufer das Protokoll-Подробности должны быть рассмотрены. Основа: der ganze Sinn des Raw-Wegs ist, dass ioBroker.e3oncan der einzige Ort bleibt, der die Bedeutung der Bytes kennt — das Envelope ist aber reines Transport-/Service-Framing, kein Datenpunkt-Wissen, und gehört damit konsistent zur selben Schicht wie das ISO-TP-Framing, das die Firmware for `0x2E` ja bereits übernimmt.

## 2. Пассивный Родатен (Collect/E380) — MQTT

**Внедрение и проверка конца** (`raw_relay.c` /`.h`, neues Modul, keine Reassemblierung — ein CAN-Frame, eine MQTT-Nachricht raus).

Тема: `<baseTopic>/raw/<id-hex-3-stellig>`, т. б. `open3e/raw/251`.

Полезная нагрузка (JSON, без шестнадцатеричного значения — DLC und Zeitstempel werden für die Collect-Geräte-Erkennung в ioBroker.e3oncan gebraucht):

```json
{ "dlc": 8, "data": "21fa01b3...", "ts": 1725455669123 }
```

Нур ID, умри в der neuen Einstellung `rawCanIds` (Комма-Список, Ухоженный взгляд по умолчанию, за `/api/settings` ПОЛУЧИТЬ/ВСТАВИТЬ и `/api/export`) enthalten sind, werden veröffentlicht — nach dem Muster der bestehenden `collectCanIds` -Einstellung. Unabhängig von decodierten Topics, `points.json` и автоматическое обнаружение.

### Auf ioBroker.e3oncan-Seite: `rawCanIds` автоматическое установка

`main.js` berechnet die Menge selbst und schreibt sie per`PUT
/api/settings ` один автобус с Gateway-Transport (` computeGatewayRawCanIds()`

- `configureGatewayRawCanIds()`, aufgerufen in `onReady()` nach dem Verbindungsaufbau) — kein manuelles Pflegen durch den Anwender notig:

* **Beide Energiezähler, все CAN-ID, погружение** (E380 0x250–0x25D, E3100CB 0x569) — недоступно, доступно `e380Active` /`e3100cbActive` gerade aktiviert sind. Grund: die пассивный Erkennung während des Scans (`lib/udsScan.js`) Если эти идентификаторы будут видны, вы должны быть активны, когда ваш Anwender überhaupt einen Grund hätte, sie zu aktivieren.
* **Alle vom Geräte-Scan vorgeschlagenen `collectCanId` -Werte** aus der bestätigten Geräte-Tabelle, unabhängig davon, ob der Anwender die Collect-Aktivierung dafür schon eingeschaltet Hat (`collectIdsFromDevices()` в `lib/udsScan.js`, jetzt eine eigenständige, Exportierte Funktion — для встроенного в `scanUdsDids()`, jetzt auch von `main.js` wiederverwendet, damit beide Stellen Dieselbe Quelle haben).

Идентификатор реле, для неверной связи, отсутствия связи; eine benötigte nicht zu Relayen, bricht Erkennung или Collect-Betrieb по-прежнему. Это очень точная информация.

### Zwei Stolperfallen, die beim Implementieren tatsächlich auftraten

- **Eine Listener-Spanne über weit auseinanderliegende IDs Schluckt Fremden Verkehr Dazwischen.** `collect.c` s Muster „ein Listener über `[min(ids), max(ids)]` «Фильтрация обратного вызова» — это то, что нужно, когда идентификаторы сконфигурированы на английском языке. `rawCanIds` zwei weit auseinanderliegende IDs enthält (z. B. `0x451` унд `0x693`),eckt die Spanne dazwischen auch echte UDS-Antwortadressen ab (z.B. `0x690`) — der bestehende Отправка в `can_port.c` Маршрутизация кадра в указанном интервале **, а также** в прослушивателе, а не в очереди ISO-TP, была нормальной в режиме опроса (`poll.failures` /`busErrors` deutlich erhöht im Test). Исправлено: новый `can_port_add_id_listener()` в `can_port.c` /`.h` — wie die bestehende `can_port_add_listener()` Если вам нужны точные идентификаторы внутренней области, все остальные ошеломляющие элементы попадают в очередь ISO-TP. Бестехенде Ауфруфер (англ. `collect.c`, `em380.c`) unverändert, weiterhin über die alte Funktion.
- **Zwei Listener шерстяной дизельный ID.** `em380.c` бобовый шрапхт `0x250–0x25D` bereits exclusiv für die eigene Dekodierung. Da der Dispatch vor diesem Fix beim ersten Treffer `return` ete, sah ein zusätzlicher Raw-Relay- Прослушиватель для идентификатора дизельного двигателя, который не был установлен, solange `em380_enabled` активная война. Исправлено: Отправка в `can_port.c` ruft jetzt **alle** passenden Listener auf (nicht nur den ersten) und fällt nur an die ISO-TP-Queue durch, wenn **keiner** gepasst Hat —`em380.c` Deckt seine eigene Dekodierung weiter ab, während der Raw-Relay-Listener параллельные дизельные кадры.
- ** `rawCanIds` wurde beim Schreiben über `PUT /api/settings` Stillschweigend abgeschnitten** , собальд `computeGatewayRawCanIds()` (так) в сочетании Energiezähler plus Collect-IDs (> 63 Zeichen) — Симптом: der Geräte-Scan meldete «Energiezähler: keine erkannt», obwohl E380 zuvor per manuell gsetztem, kürzerem `rawCanIds` nachweislich funktionierte. Урсаче: `sys_cfg_t.raw_canids` (`app_config.h`) nutzte wie alle anderen Zeichenketten-Felder `CFG_STR_MAX` (64 Байта) — zu klein für bis zu `RAW_RELAY_MAX_IDS` (32) ID. Исправление: собственный ген `CFG_RAW_IDS_MAX` (256 байт) для `raw_canids`; die lokale `raw_ids_was` -Копия в `h_settings_put()` (Änderungserkennung) необходимо использовать большой запас топлива для дизельного двигателя, поэтому необходимо, чтобы он был отключен и был отключен.
- ** `gatewayChannel`(ioBroker-Seite) откройте неверную тему MQTT-Präfix** , а затем шлюз с вашим собственным адресом `"open3e"` abweichenden `mqtt.baseTopic` betrieben wird (z. B. `"open3e32"`). `main.js` Райхте Бейм Ауфбау де Каналс нур `brokerUrl` /`username` /`password` durch, nie das Base-Topic —`gatewayChannel` поле также stumm auf seinen hartkodierten По умолчанию `"open3e"` zurück und abonnierte `open3e/raw/+` /`open3e/LWT` /`open3e/status`, где шлюз открыт `open3e32/...` опубликовать. Симптом: identisch zum Buffer-Bug oben (Scan meldet «keine Energiezähler/Collect-Geräte erkannt»), obwohl `rawCanIds` Исправление ошибок в войне и MQTT-Nachrichten extern nachweislich ankamen — der Adaptor selbst Hat sie schlicht nie gesehen, auch die LWT/status-Gesundheitsprüfung Lief seither ins Leere (weder gesund noch) `onStopped`, einfach nie befüllt). Исправлено: новый Config-Feld. `canExtGatewayMqttBaseTopic` /`canIntGatewayMqttBaseTopic` (По умолчанию `"open3e"`, muss zum Gateway passen); `gatewayChannel` лейтет `rawTopicPrefix` jetzt aus `baseTopic` аб (`${baseTopic}/raw`) statt beides unabhängig hartzukodieren.

## 3. Статус и Fähigkeits-Erkennung

### Отвлеченные (REST)

`/api/status` (ничт) `/api/sysinfo` — das ist CPU-/Heap-/Task-Diagnostik, der falsche Ort dafür)liefert `can.state` унд `mqtt.connected` **bereits heute** , unverändert:

```json
{ "can": { "state": "running", ... }, "mqtt": { "connected": true, ... }, ... }
```

`can.state`: `"running"` |`"error-warning"` |`"error-passive"` |`"bus-off"` |`"stopped"` (TWAI-Treiberzustand, siehe `can_port.h`). ioBroker.e3oncan находится в зоне действия Verbindungsaufbau — новая конечная точка не указана, но не может быть изменена.

Neu ergänzt (in `/api/status`, `/api/settings`, `/api/export` /`/api/import`, небен `writeEnabled`): `rawApiVersion` (актуэлл) `1`, для указания версий прошивки) и `rawWriteEnabled` (см. Вырез 1, Gate für `rawwrite`).

### Push (MQTT)

Нойер, **сохранил** тему `open3e/status`, veröffentlicht bei jeder Zustandsänderung:

```json
{ "can": "running", "mqtt": true, "tec": 0, "rec": 0 }
```

Сохранено, но это не означает, что клиент будет актуален, чтобы его можно было использовать, но не на месте, когда он будет готов к работе. Для осени, когда прошивка будет полностью завершена (Absturz, Stromausfall), bleibt das bestehende `open3e/LWT` zuständig — dafür braucht es keinen Heartbeat auf `open3e/status` zusätzlich.

### Auf ioBroker.e3oncan-Seite

Der Gateway-Transport abonniert `open3e/LWT` унд `open3e/status` beim Verbindungsaufbau und speist daaus **Denselben** `info.connection` -State, den heute schon `onCanExtStopped` /`onCanIntStopped` für den lokalen Bus setzen (`true` nur wenn LWT=online _und_ `can` = «бег»). Дайте команду Gateway-Betrieb для остальных адаптеров — и для вашего устройства Watchdog, находящегося в списке #255 — genauso aus wie ein gestörter localer Bus. Соланж `info.connection=false`, werden keine neuen `rawread` /`rawwrite` -Anfragen abgeschickt, statt Sie ins Leere laufen und timeouten zu lassen.

**Важно:** `evaluateHealth()` в `lib/canGatewayChannel.js` wertet erst aus, sobald _beide_ Topics mindestens einmal gemeldet haben (`lwtKnown` унд `statusKnown`). Solange die Firmware `open3e/status` nicht veröffentlicht, bleibt `statusKnown` für immer `false` —`onStopped` feuert dann nie, auch nicht bei einem echten Ausfall. Der Push-Teil это также очень полезно, если вы хотите, чтобы Gateway-Verbindungsüberwachung überhaupt функционировал.

**Значение:** Anders als der lokale Bus (№ 255: Worker stop ihre Kanal-Referenz seit dem Aufbau, ein sicheres In-Place-Reconnect ist deshalb bewusst nicht vorgesehen) bleibt der MQTT-Client von `gatewayChannel` после одного `onStopped` am Leben, statt ihn abzureißen — genau um `open3e/LWT` унд `open3e/status` weiter zu beobachten. Kehrt der gesunde Zustand zurück (`mqtt.js` s eigener Reconnect vorausgesetzt), feuert ein neues Event `onRecovered`. `main.js` reagiert darauf mit`this.terminate('...',
EXIT_CODES.START_IMMEDIATELY_AFTER_STOP) ` — ein vollständiger, sauberer Adapte-Neustart, kein Versuch, Worker im laufenden Betrieb neu aufzusetzen. Das ist inhaltlich dasselbe, was der externe #255-Watchdog tut (Instanz neu starten, sobald` info.connection ` Wieder gebraucht wird), nur ereignisgetrieben und ohne das отдельные скрипты — für Gateway-Betrieb reicht das eigene, eingebaute Neustart-Signal aus, ein externer Watchdog bleibt aber weiterhin nötig für den Fall, Dass die Firmware selbst nie mehr antwortet (dafür gibt es) Кейн` onRecovered `, согласно определению). Kein eigenes Ограничение скорости:` onRecovered` Feuert nur bei einer echten Erholung, nie bei fortgesetztem Ausfall, и js-контроллер имеет свой собственный Schutz vor Neustart-Schleifen.

## 4. ioBroker.e3oncan — Транспортабстракция

- **UDS Lesen/Schreiben:** `lib/canUds.js` с `uds` -Klasse ist kein reiner Protokoll-Codec, sondern ein sich selbst steuernder Worker (собственная командная очередь, состояния-подписки, таймаут-/статистика-обработка). Eine vorgeschaltete Facade passt hier nicht. Статдессен: новый класс `udsGateway`, die von `uds` **erbt** und nur die drei Stellen mit Frame-I/O überschreibt —`readByDid`, `writeByDid2E`, `writeByDid77`. Diese rufen statt `sendFrame()` +Warten auf die `msgUds` -Главный-Машинный-Прямой `rawread` /`rawwrite` (1) auf und lösen bei Erfolg `decodeDataCAN()`
  - `setDidDone()` aus (genau das, was `msgUds` beim Abschluss der SF/MF-Zusammensetzung heute tut), bei Fehler Dieselben Callback-/Log-Pfade wie `onTimeout`. `sendFrame` /`msgUds` werden für Gateway-Worker не используется. Alles andere (Очередь, Планирование, `onUdsStateChange`, Статистика) bleibt geerbt und unverändert. Auswahl для новой конфигурации `transport` (`'local'` По умолчанию /`'gateway'`) в логове Worker-Konstruktionsstellen: `main.js:setupUdsWorkers`, `lib/udsScan.js` (Geräte- und DID-Scan), плюс Weiterreichen и `startupUdsWorkerService77` в `canUds.js`.
- **Пассивный Родатен (Собрать/E380):** `lib/canCollect.js` кеннт `socketcan` gar nicht — es decodiert nur aus einem Transportunabhängigen Nachrichtenformat (`msg.id`, `msg.data`, `msg.ts_sec/ts_usec`). Genauso wenig kennt der Dispatch dazu (`main.js: onCanMsgExt` /`onCanMsgInt`) или слушатель Ad-hoc в `lib/udsScan.js` (Collect-Geräte-Erkennung, Energy-Meter-Listener) `socketcan` direkt — sie hängen nur von der Kanal-Event-Schnittstelle ab. Deshalb reicht hier ein neues Gateway-Kanalobjekt, das Dieselbe `addListener('onMessage', cb)` /`addListener('onStopped', cb)` /`start()` /`stop()` -Schnittstelle wie der heutige socketcan-Kanal bereitstellt, gespeist aus (2) — und tritt einfach an die Stelle von `this.channelExt` /`this.channelInt`. `lib/canCollect.js`, `onCanMsgExt` /`onCanMsgInt` und die Ad-hoc-Listener in `lib/udsScan.js` bleiben dadurch **komplett unverändert** .
- Новое связующее свойство в `admin/jsonConfig.json` pro Bus (ext/int): «CAN-Interface (local)» или «Gateway (open3e-esp32)» — bei Gateway: REST-Basis-URL, MQTT-Broker-URL/Zugangsdaten, MQTT-Base-Topic (muss zum Gateway-eigenen) `mqtt.baseTopic` passen, su — Default `"open3e"`, daraus leitet `gatewayChannel` sowohl das Raw-Topic-Präfix (`<baseTopic>/raw`) также и `<baseTopic>/LWT` /`<baseTopic>/status` ab; ein explizites `rawTopicPrefix` в конфигурации канала überschreibt nur den Raw-Teil, für den unwahrscheinlichen Fall, dass der abweicht).

## 5. Geräte-/Datenpunkt-Scan im Gateway-Betrieb

**Nicht** wie beim lokalen Автобус über einzelne `rawread` -Aufrufe pro Kandidatenadresse/DID (это означает, что встроенное программное обеспечение для собственной очереди владельца автобуса установлено и в тайм-аутах клиента — Größenordnung Sekunden statt der \~1 Min./ECU, die Ein Native Scan Braucht). Для получения полной информации о наличии/существовании DID необходимо использовать модуль Scan-Engine для удаления встроенного ПО.

### Аблауф

1. `POST /api/scan` мит `{"mode": "known"}` (По умолчанию; `"full"` als Option für undocumentierte DIDs, deutlich langsamer) — начать сканирование **и** DID-сканирование как einen durchgehenden Firmware-Lauf (`SCAN_ECUS` →`SCAN_DIDS` →`SCAN_DONE`, nicht zwei separat startbare Vorgänge).
2. `GET /api/status` пыльца, `scan.phase` /`scan.probed` /`scan.total` /`scan.curDid` Для того, чтобы выполнить **Fortschrittsanzeige** в меню «Geräte-Scan-Dialog», (прошивка будет отключена для вашего собственного веб-интерфейса, пожалуйста).
3. Нач `scan.phase == "done"`: `GET /api/system` einmalig abholen — Lifert pro ECU Metadaten (`prop`, `function`, `sw`, `hw`, `vin`, `ident`) **и** все имеющиеся DID также `[did, Antwortlänge]` -Пааре. Если вы хотите, чтобы Existenz+Länge — прошел незавершенный принцип, dass ioBroker.e3oncan der einzige Ort bleibt, der Bytes deutet.

Zwei Stolperfallen, auf die beim Implementieren tatsächlich reingefallen wurde, für spätere Referenz:

- `addrHex` kommt großgeschrieben zurück (`"0x6A1"`), где ioBroker.e3 может использовать все возможные значения шестнадцатеричных строк (`toString(16)` в JS — это нижний регистр) — ohne Normalisierung Liefen Lookups für jede Adresse mit einem Hex-Buchstaben (a/b/c/d/e/f) в Leere.
- Когда (3) в режиме Adaptor-Prozessspeicher zu stop reicht nicht: Bestätigen der Geräteliste im Scan-Dialog speichert die Adaptor-Config, был einen Adaptor-Neustart auslöst — der Cache ist dann weg. DID-сканирование много `/api/system` bei Bei Bedarf selbst erneut abholen (kein neuer Scan notig, die Firmware hält ihr letztes Ergebnis ohnehin persisting auf ihrer eigenen Storage-Partition).

### Zweistufigkeit bleibt erhalten

Лучшая технология UX-Grund для сканирования/DID-сканирования (если вы можете использовать ее, если вы хотите, чтобы объект был выбран в качестве объекта) будет лучше всего, если механика не будет такой:

- **Диалоговое окно сканирования** : löst intern bereits den kompletten Lauf aus (1)–(3) aus, zeigt aber weiterhin nur die Geräteliste zum Bestätigen/ Umbenennen — die DID-Existenz-Infos Ligen im Hintergrund Schon bereit. Dauert Dadurch spürbar länger als der bisherige reine Adress-Sweep (Sekunden bis niedrige Minuten statt Sekunden) — Fortschrittsanzeige (siehe oben) fängt das ab.
- **Datenpunkt-Scan** (nach Bestätigung): «Speichern» bedeutet **nicht** «lesen oder nicht lesen» — в beiden Fällen werden die gefundenen DIDs gelesen und decodiert, das ist nötig, um geräte-spezifische Varianten (per Antwortlänge) zu erkennen und die Метадатен (`didsDictDevCom`, Schreibbarkeit) anzulegen/zu aktualisieren. Der Unterschied Liegt allein Darin, ob dabei **neue** Objecte im Baum angelegt werden — das regelt `storage.js` с бестехенде `suppressStateStorage` -При транспортировке необходимо получить специальные сведения о шлюзе. Технология: kein Batching über `rawread` (die Batch-Fähigkeit aus Abschnitt 1 wird hier nicht genutzt) — stattdessen die bestehende, bereits pro Worker sequenzielle Kommando-Queue (`readByDid` Я СДЕЛАЛ) unverändert weiterverwenden, nur mit der auf tatsächlich vorhandene DIDs eingeschränkten Kandidatenliste aus (3) statt einemblinden 256–4000-Sweep. Je gefundenem Gerät startet ein eigener Worker, gestaffelt um 500 ms. Повторные попытки в вашей практике (Конец-за-конец, когда симулятор-проверено: 1215 DID около 6 раз, очень часто повторяются попытки, когда вы находитесь в каждой минуте, когда истекает время ожидания) — еще одна проблема с конкурирующими задачами, которую _вы можете получить снова_ После сканирования прошивки не будет параллельного сканирования.

### Collect-/Energiezähler-Erkennung — bleibt unabhängig davon offen

Weder die Firmware-Scan-Engine noch der neue Ablauf oben erkennen Collect-Geräte orer Energiezähler (E380/E3100CB) — beide antworten nicht auf Anfragen, sondern Broadcasten nur, das ist prinzipiell nicht for the Request/Response Scannbar. Das gilt für open3e-esp32 selbst genauso (`em380_enabled` /`collect_enabled` sind dort manuelle Schalter ohne Auto-Erkennung).

Был ли ioBroker.e3oncan heute a Komfort bietet, bleibt aber teilweise nutzbar, auch ohne Abschnitt 2:

- **Zuordnung** Gerätetyp → wahrscheinliche Collect-CAN-ID (`prop` -Полевые исследования `/api/system`, т. б. `HPMUMASTER` →`0x693`, статичные таблицы `udsDevName2CanId`): функция настолько комфортна, если вы не хотите использовать Rohdaten-Quelle — reine Zuordnung auf Basis von Scan-Daten, die schon da sind. Если **вам не удалось установить режим ожидания** , активируйте его вручную.
- **Live-Bestätigung** (läuft auf dieser CAN-ID datatsächlich Traffic): braucht weiterhin das Raw-MQTT-Topic aus Abschnitt 2 — keine zusätzliche Firmware-Änderung darüber darüber hinaus notig, aber ohne das keine Bestätigung.