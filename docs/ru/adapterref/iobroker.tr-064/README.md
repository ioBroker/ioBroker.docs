---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tr-064/README.md
title: ioBroker.tr-064
hash: 3NAmar9gzVTvklMV7BV3G0LPjqC0hxoqiLmlkxDCbjs=
---
![Количество установок](http://iobroker.live/badges/tr-064-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.tr-064.svg)
![Тестирование и выпуск](https://github.com/iobroker-community-adapters/iobroker.tr-064/workflows/Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/tr-064/svg-badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.tr-064.svg)

<img src="admin/tr-064.svg" width="128" height="128">

# ioBroker.tr-064

**Этот адаптер использует библиотеки Sentry. Эти библиотеки автоматически сообщают разработчикам об исключениях и ошибках в коде.** Для получения более подробной информации, а также о том, как отключить отправку сообщений об ошибках, см. [документацию плагина Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry) . Система отчетности Sentry используется начиная с версии js-controller 3.0.

## Информация

Этот адаптер считывает наиболее важную информацию с устройства AVM Fritz!Box. Например, список вызовов и количество сообщений на автоответчике.

Данный адаптер создан на основе [документации по интерфейсу FRITZ!](https://fritz.com/pages/schnittstellen/)

## Необходимые настройки в вашем Fritz!Box

- Измените способ входа в систему на «Использовать имя пользователя и пароль».
- Fritz!Box использует пароль длиной не более 32 символов. Более длинные пароли Fritz!Box сокращает в собственном пользовательском интерфейсе без предупреждения. Поэтому в конфигурации адаптера следует вводить только эти 32 символа.
- Создайте пользователя и предоставьте ему разрешение на управление Fritz!Box и его настройками.
- Включите доступ для приложений на вкладке «Сеть». В немецкой версии пользовательского интерфейса путь следующий: `Netzwerk` ->`Heimnetzfreigaben` ->`Zugriff für Anwendungen` ->`aktiviert`.
- Если вы хотите использовать `ring` Для работы функции необходимо настроить дополнительные параметры. См. раздел [«Звонок (наберите номер)»](#ring-dial-a-number) .

## Функции

### Простые состояния и функции

- Включайте и выключайте Wi-Fi на частотах 2,4 ГГц и 5 ГГц.
- Включайте и выключайте гостевой Wi-Fi.
- Переключите все сети Wi-Fi с помощью `states.wlan` Как и кнопка WLAN на Fritz!Box: снова включаются только те сети Wi-Fi, которые были активны ранее, а не гостевая сеть Wi-Fi или диапазон, который вы отключили.
- Перезагрузите Fritz!Box
- Запустите процесс WPS
- Восстановите интернет-соединение.
- Прочитайте внешний IP-адрес
- Прочитайте информацию о подключении к интернету: `states.wanAccessType` (`DSL`, `Ethernet`, `Fiber`, `Cable`, `LTE`, `UMTS`), `states.wanLinkStatus` (`Up`, `Down`, ...), `states.wanProvider` скорость линии `states.wanDownstreamMax` /`states.wanUpstreamMax` (бит/с) — количество байтов, отправленных и полученных с момента установления соединения. `states.wanBytesSent` /`states.wanBytesReceived` и текущие ставки `states.wanSendRate` /`states.wanReceiveRate` (байт в секунду). Изменение `wanAccessType` показывает, например, резервное подключение к мобильному соединению.

### звонить (набрать номер)

- Если вы используете внутренний номер, например... `**610` государство `ring` позволяет этому внутреннему телефону звонить. Пример: `**610[,timeout]`
- Если вы используете внешний номер, то это будет штат. `ring` Соединяет вас с этим внешним номером. Fritz!Box звонит на внешний номер, и ваш основной телефон звонит, как только вызываемый абонент поднимает трубку.

В устройстве Fritz!Box можно настроить телефон по умолчанию. В немецком пользовательском интерфейсе путь к нему следующий: `Telefonie` ->`Anrufe` ->`Wahlhilfe` ->`Wählhilfe verwenden` Выберите там также эту опцию. `Verbindung mit dem Telefon ISDN- und Schnurlostelefone`.

### toPauseState

- Возможные значения: `ring`, `connect`, `end`
- Это состояние можно использовать для приостановки воспроизведения видео при входящем звонке. `ring`), или когда кто-то поднимает трубку телефона (`connect`).
- Вы можете продолжить воспроизведение с этого значения. `end`.

### Присутствие

Этот адаптер позволяет отслеживать присутствие людей в вашем доме. Таким образом, вы будете видеть, когда член вашей семьи или сосед по комнате покидает дом или возвращается:

- Откройте настройки адаптера и перейдите на вкладку «Устройства».
- Добавьте все устройства членов вашей семьи или соседей по комнате, например, их смартфоны, и подтвердите, нажав кнопку «Сохранить».
- Для каждого устройства адаптер создает структуру папок в объектах адаптера. Обычно это папка. `tr-064.0.devices`.
- Как только кто-то приходит или уходит, адаптер получает эту информацию. Состояние `tr-064.0.devices.xxx.active`, где `xxx` — это название устройства, указывающее, доступно ли это устройство, и, следовательно, находится ли человек дома.

Параметр "Показывать точки доступа устройств" (включен по умолчанию) считывает топологию сети Fritz!Box раз в минуту: `devices.xxx.accessPoint` Это устройство Fritz!Box или ретранслятор, к которому оно подключено? `devices.xxx.connection` группа (`2.4 GHz`, `5 GHz`, `6 GHz`) или `LAN` С его помощью скрипт может реагировать только тогда, когда смартфон подключен к ретранслятору на входе. Вкладка «Сетка» в настройках отображает всю топологию сетки в графическом виде во время работы экземпляра.

По умолчанию `xxx` Это имя устройства в Fritz!Box, а не имя в таблице. Включите параметр «Называть объекты по этой таблице» на вкладке «Устройства», чтобы получить имена из таблицы. Тогда два устройства с одинаковым именем в Fritz!Box получат отдельные объекты, и эти объекты не будут перемещаться при переименовании устройства в Fritz!Box. При включении этой опции объекты, созданные с именем Fritz!Box, будут удалены при следующем запуске, поэтому скрипты, псевдонимы или представления VIS, использующие их, должны быть скорректированы. Имя, которое встречается в таблице дважды, получает число в конце. `Guest`, `Guest_2`).

Смартфон с частным Wi-Fi-адресом имеет еще один MAC-адрес в каждой сети Wi-Fi, например, в гостевой сети Wi-Fi. Введите все его адреса в столбец MAC, разделяя их запятыми: устройство считается присутствующим, как только один из них активен, и `lastMAC-address` показывает, какой именно. Вращающийся частный адрес (iOS 18: "Rotating") регулярно меняется, и отслеживать его таким способом невозможно.

Также можно включить опцию «Использовать mDNS для обнаружения новых устройств». При использовании mDNS адаптеру не нужно опрашивать Fritz!Box, и он быстрее обнаруживает изменения.

Пользователи сообщают, что функция обнаружения также надежно работает на устройствах iOS, например, на iPhone. Что касается iPhone, пользователи сообщают, что Fritz!Box требуется до 10 минут, чтобы обнаружить, что человек ушел и больше не подключен к Wi-Fi. Для повторного обнаружения присутствия Fritz!Box требуется до 1 минуты.

Сообщество ioBroker опубликовало скрипт, который использует эту информацию от адаптера для запуска действий. Примеры: автоматическое отключение всего оборудования после того, как все люди покинут дом, отображение количества людей, находящихся дома, или отображение статуса человека в системе VIS. См. [тему на форуме ioBroker](https://forum.iobroker.net/topic/4538/anwesenheitscontrol-basierend-auf-tr64-adapter-script) (на немецком языке).

### Автоответчик (на немецком языке): `Anrufbeantworter`)

Вы можете включать и выключать автоответчик. В соответствии с законодательством штата `cbIndex` Вы выбираете номер автоответчика.

### Монитор вызовов

Монитор вызовов в режиме реального времени создает состояния для каждого входящего и исходящего вызова. Если телефонная книга включена (что является настройкой по умолчанию), адаптер преобразует номера в имена. Также есть состояние, отображающее звонок телефона.

- `callmonitor.connected` показывает, подключен ли адаптер к монитору вызовов устройства Fritz!Box.
- `extension` Это телефонный порт, через который принимается или совершается звонок. `device` его название, например `Mobilteil Küche` Fritz!Box сообщает только номер порта; адаптер получает имя каждого порта из списков вызовов, поэтому `device` Эта запись заполняется только тогда, когда списки вызовов включены и телефон использовался хотя бы один раз. Fritz!Box определяет номер телефона входящего вызова только тогда, когда с него снята трубка: `callmonitor.connect.device`.
- Устройство Fritz!Box не регистрирует внутренние вызовы, например, звонки от дверного звонка. `**9` ни для монитора вызовов, ни по каналу TR-064.

### Телефонный справочник

- Если телефонная книга включена, адаптер использует её для поиска имени абонента по номеру телефона.
- Для определения номера или имени доступны еще три состояния. Если доступно изображение, вы также получите URL-адрес изображения контакта.

Пример: если вы зададите состояние `phonebook.number` Адаптер устанавливает все 3 состояния. `name`, `number` и `image` к значениям найденного контакта. Примечание: при поиске по имени адаптер сначала сравнивает полное имя. Если контакт не найден, адаптер ищет часть имени.

Если один номер есть в нескольких телефонных книгах с разными названиями, то в настройках таблицы «Телефонная книга для вашего номера» определяется, какое название будет отображаться в мониторе вызовов: введите свой номер (достаточно последних цифр) и название телефонной книги в поле Fritz!Box. При звонке на ваш номер или с вашего номера сначала будет отображаться название из этой телефонной книги.

### Списки звонков

Форматы вывода:

- `json`
- `html`

Существуют следующие списки звонков:

- все звонки
- пропущенные звонки
- входящие звонки
- исходящие звонки

Счетчик звонков: вы можете установить счетчик звонков на 0. Следующий звонок увеличит счетчик на 1.

Вы можете настроить вывод HTML-кода с помощью шаблона.

### Журнал событий

Опция "Чтение журнала событий FRITZ!Box" считывает журнал событий Fritz!Box раз в минуту:

- `deviceLog.json` - Последние 50 событий, начиная с самых новых: `[{"id": 506, "group": "sys", "date": "18.09.26", "time": "10:05:00", "msg": "..."}]`. `group` является `sys`, `net`, `fon`, `wlan` или `usb`.
- `deviceLog.newEvents` - События, произошедшие с момента последнего чтения, записываются только при появлении новых. После перезапуска содержат события, произошедшие с момента последнего запуска.

С помощью этого скрипта можно отправить сообщение о входе в систему в пользовательский интерфейс Fritz!Box («Anmeldung des Benutzers ... an der FRITZ!Box-Benutzeroberfläche»). Текст сообщений зависит от языка Fritz!Box. Действие `GetDeviceLog` из `states.command` Возвращает сокращенный лог без этих событий.

### Запишите неизмененные значения

По умолчанию адаптер записывает значение только при его изменении. При использовании опции "Записывать также неизмененные значения" каждое опрашиваемое значение записывается с новой меткой времени, поэтому скрипт может использовать "было обновлено" вместо "было изменено". Это увеличивает нагрузку на базу данных.

### Виджеты для vis-2 и ioBroker.devices

Адаптер предоставляет виджеты, отображающие состояние Fritz!Box. Щелчок по плитке открывает диалоговое окно с топологией сетки в полноэкранном режиме на телефоне.

vis-2 (набор виджетов "FRITZ!Box"):

- **FRITZ!Box** (`Tr064FritzBox`): плитка, как в ioBroker.devices, с отображением состояния подключения, модели, типа соединения, текущего объема загрузки и выгрузки, внешнего IP-адреса, WLAN и гостевой WLAN, новых сообщений и пропущенных вызовов. Ее макет выбирается размером от маленького квадрата до большой карточки с помощью линии. Опционально чипы WLAN и гостевой WLAN переключаются между собой (`switchWlan`).
- **Сетчатая топология** (`Tr064Mesh`): топология сетки в виде графического изображения или таблицы, заполняющей виджет и обновляющейся, пока она видна.
- **Присутствие** (`Tr064Presence`): сконфигурированные устройства с параметрами "присутствует/отсутствует", "точка доступа" и "диапазон".

ioBroker.devices: виджет **FRITZ!Box** можно добавить в категорию во всех четырех размерах (1x1, 2x0.5, 2x1, 2x2); в настройках виджета выбирается экземпляр адаптера.

Для работы виджетов необходимы состояния версии адаптера, используемой с этими виджетами (`states.boxModel`, `states.wan*`, ...) и запущенный экземпляр для топологии сетки.

### Командование штатов и результат командования

С государством `command` Вы можете вызвать любую команду tr-064 из этой [документации](https://avm.de/service/schnittstellen/) . Пример:

```javascript
command = {
    "service": "urn:dslforum-org:service:WLANConfiguration:1",
    "action": "X_AVM-DE_SetWPSConfig",
    "params": {
        "NewX_AVM-DE_WPSMode": "pbc",
        "NewX_AVM-DE_WPSClientPIN": ""
    }
};
```

Установить состояние `command` В JSON-коде приведенных выше строк это означает следующее: `{ ... }`, без `command =` и без переносов строк. Ответ на звонок записывается в состояние. `commandResult`.

В следующем примере показано, как включать и выключать автоответчик Fritz!Box в зависимости от его состояния. `command` Для проверки вы можете скопировать текст и вставить его в состояние. `tr-064.0.states.command`.

Включите автоответчик:

`{"service": "urn:dslforum-org:service:X_AVM-DE_TAM:1","action": "SetEnable", "params": {"NewIndex": "0","NewEnable": "1"}}`

Выключите автоответчик:

`{"service": "urn:dslforum-org:service:X_AVM-DE_TAM:1","action": "SetEnable", "params": {"NewIndex": "0","NewEnable": "0"}}`

Подробное описание действий и параметров TAM вы найдете здесь: [x\_tam.pdf](https://avm.de/fileadmin/user_upload/Global/Service/Schnittstellen/x_tam.pdf) . Эта ссылка также содержится в документации AVM, указанной выше.

### Включите монитор звонков

Перед использованием функции мониторинга звонков необходимо включить её в устройстве AVM Fritz!Box. Для включения мониторинга звонков наберите `#96*5*` На подключенном телефоне. Затем Fritz!Box открывает TCP/IP-порт 1012. Чтобы закрыть порт, наберите `#96*4*`.

## Первоначальное создание

@soef создал этот адаптер по [адресу https://github.com/soef/ioBroker.tr-064](https://github.com/soef/ioBroker.tr-064) . Поддержка адаптера там больше не ведется. Поэтому он был перенесен в iobroker-community для исправления ошибок. Спасибо @soef за его работу.

## Как выполнить миграцию с версии tr-064-community (промежуточная версия и название)

Если вы перейдете с адаптера tr-064-community, вы сможете скопировать полный список устройств и все настройки:

- Откройте раздел «Объекты» в административной панели и включите экспертный режим.
- Найдите дерево объектов. `system.adapter.tr-064-community.0`, где `0` Это номер экземпляра. Если у вас было несколько экземпляров, выберите правильный.
- Нажмите на кнопку с изображением карандаша справа от этой линии.
- В окне выберите «raw (experts only)» и скопируйте фрагмент. `native` JSON.
- Открыть `system.adapter.tr-064.0`, где `0` Это номер экземпляра. Если у вас было несколько экземпляров, выберите правильный.
- Вставьте скопированное содержимое в соответствующую часть. `native`.
- Сохраните изменения.
- Запустите адаптер.
- Проверьте конфигурацию и убедитесь, что все данные были восстановлены корректно.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 5.1.0 (2026-09-19)
- (@GermanBluefox) New widgets for vis-2 ("FRITZ!Box", "Mesh topology", "Presence") and for ioBroker.devices ("FRITZ!Box"): the state of the box as a tile, a click shows the mesh topology
- (@GermanBluefox) New states `boxModel` and `boxFirmware`
- (@GermanBluefox) The table in the tab "Devices" uses the whole width again: in 5.0.2 it was so narrow that name, IP and MAC could not be read
- (@GermanBluefox) "Search for devices" works with many devices: the adapter reads the list of all devices in one request (`X_AVM-DE_GetHostListPath`) instead of one request per device, which took longer than the 20 seconds of the button. The search is always answered, also when a request fails, the box has no devices or the adapter is not connected
- (@GermanBluefox) Fixed the crash `systemData.save is not a function` on start when a call list is generated: installations which ran an adapter version from 2017 to 2020 still had an invalid attribute `save` in the object `tr-064.<instance>`, which is removed now
- (@GermanBluefox) `wlanGuest` switches the guest WLAN again on boxes with three bands (e.g. FRITZ!Box 5690 Pro, 4060) instead of the third band: the guest WLAN is always the last WLAN configuration of the box
- (@GermanBluefox) New states `wlan60` and `wlan60Password` for the 6 GHz WLAN, and `wlan52` and `wlan52Password` for the second 5 GHz WLAN (e.g. FRITZ!Box 4060). The adapter asks the box which band its third WLAN uses
- (@GermanBluefox) The call lists do not stop updating after some hours any more: the call monitor detects a connection which the box dropped unnoticed (e.g. by a restart) with TCP keepalive and reconnects, and the call lists are also read once a minute - that way they are updated without call monitor, too
- (@GermanBluefox) A call list download which the box does not answer is given up after 10 seconds with a warning
- (@GermanBluefox) `states.wlan` switches all WLANs like the WLAN button of the FRITZ!Box (`X_AVM-DE_SetWLANGlobalEnable`) and shows its state: switching on does not switch on the guest WLAN and bands which were off any more
- (@GermanBluefox) New states for the internet connection: `wanAccessType` (e.g. `LTE` during a fallback to a mobile connection), `wanLinkStatus`, `wanProvider`, `wanDownstreamMax`, `wanUpstreamMax`, and the traffic `wanBytesSent`, `wanBytesReceived` (64 bit counters), `wanSendRate`, `wanReceiveRate`
- (@GermanBluefox) New states `devices.xxx.accessPoint` and `devices.xxx.connection`: the FRITZ!Box or repeater a device is connected to and the band, read from the mesh topology. The new tab "Mesh" in the settings shows the mesh topology as a graphic. Admin 8 is required now
- (@GermanBluefox) New option "Read the event log of the FRITZ!Box": the complete event log including the logins to the user interface in `deviceLog.json`, new events in `deviceLog.newEvents`
- (@GermanBluefox) New state `callmonitor.connected` shows whether the call monitor is connected, and `callmonitor.*.device` the name of the telephone of a call
- (@GermanBluefox) New table "Phone book per own number": a number which is in several phone books gets its name from the phone book of the own number of the call
- (@GermanBluefox) New option "Write unchanged values too": every polled value is written with a new time stamp
- (@GermanBluefox) A single call forwarding of the FRITZ!Box is shown in `callForwarding` now - before, the states were only created from the second call forwarding on. With only one phone number the name of the number is added to the name of the state again, and a box without call forwardings does not delay the poll cycle by 3 seconds any more
- (@GermanBluefox) The call monitor does not lose events any more when the FRITZ!Box sends two of them in one network packet (e.g. `RING` and `DISCONNECT` of a very short call) or one event in two packets: the received data is split into lines now
- (@GermanBluefox) The call lists do not freeze for good any more when the FRITZ!Box numbers its calls from the beginning again, e.g. after exchanging the box, a factory reset or a restart: the adapter asked only for the calls after the last known call ID and got an empty list forever. It now checks an empty answer against the newest call of the box and builds the lists again from the call list of the box; only calls after the newest known call increase the counters. The meta object `tr-064.<instance>` is only written when the lists changed, not with every refresh
- (@GermanBluefox) New state `states.abNewMessages`: number of new (not yet listened) messages on the answering machines
- (@GermanBluefox) The MAC addresses of the configured devices are sent to the box in its own format `AA:BB:CC:DD:EE:FF`, so addresses entered in lower case, with dashes or without separators are found
- (@GermanBluefox) A configured device which the box does not know (or which is offline since the start) is logged once with a hint to check its MAC address and listed as inactive in `jsonDeviceList`, instead of silently being left out
- (@GermanBluefox) New option "Name the objects after this table" in the tab "Devices": the objects below `devices` get the names of the table instead of the names in the Fritz!Box, so two devices with the same name in the box are not mixed up any more. When the option is switched on, the objects which were created with the name of the box are deleted. mDNS writes into the same objects as the poll now - before it created additional objects with the name of the table
- (@GermanBluefox) A device can have several MAC addresses, separated by commas (e.g. a smartphone with a private Wi-Fi address in the home and the guest Wi-Fi): it is present if one of them is active. Changing the spelling of a MAC address does not delete the objects of the device any more, and "Search for devices" does not add a device of the table a second time
- (@GermanBluefox) A device request which the box does not answer does not stop the presence detection and the polling any more
- (@GermanBluefox) An info message tells when "Create JSON device list" is switched on, but no devices are configured
- (@GermanBluefox) The adapter connects to a FRITZ!Box whose WLAN is switched off: the check of the login used the WLAN, which the box answers with an error then, so the adapter restarted (4.x) or retried forever without creating its objects (5.0). A refused login is reported with a hint to check user, password and rights of the user instead of the advice to restart the box
- (@GermanBluefox) The adapter does not hang silently any more when the FRITZ!Box does not deliver the description of a service (e.g. `x_speedtestSCPD.xml` with FRITZ!OS 8.24 Labor): after 10 seconds the service is skipped with a warning, and the connection is limited to 60 seconds and retried
- (@GermanBluefox) The debug log does not contain sensitive data any more, so it can be shared to analyze problems: phone numbers, names, phone book and call data, host names, MAC and IP addresses, values of states and results of `states.command` are only logged with level `silly`, and the session ID in URLs of the box is never logged. The result of `states.command` is no longer logged with level info - it is still written into `states.commandResult`
- (@GermanBluefox) The call monitor does not stop any more when the FRITZ!Box refuses the connection, e.g. while it restarts after a firmware update: it retries every 60 seconds and reconnects on its own. The hint to open port 1012 with `#96*5*` is only logged if the call monitor was never connected

### 5.0.2 (2026-09-10)
- (@GermanBluefox) Fixed the crash `Cannot read properties of undefined (reading 'safe')` in `getWLAN` right after the start: the WLAN states are read again in every poll cycle
- (@GermanBluefox) A box without a separate 5 GHz configuration does not delay the polling by 3 seconds any more

### 5.0.1 (2026-09-09)
- (@GermanBluefox) **Breaking change:** the adapter requires node.js >= 22 now
- (@GermanBluefox) Adapter requires admin >= 7.7.22 now
- (@GermanBluefox) Adapter requires js-controller >= 6.0.11 now
- (@GermanBluefox) The adapter does not stop any more if the Fritz!Box cannot be reached. The connection is retried every 30 seconds, and the new state `info.connection` shows whether the box answers
- (@justr1) Expected disconnects of the call monitor (`ETIMEDOUT`, `ECONNRESET`, `EPIPE`) are logged as info now, because the adapter reconnects on its own
- (@GermanBluefox) The mDNS socket is closed when the adapter stops, so a restart does not leave a listener behind
- (@GermanBluefox) A phone book with only one contact is read now
- (@GermanBluefox) The hint how to open port 1012 is shown again if the call monitor is refused by the Fritz!Box
- (@GermanBluefox) The adapter was refactored to TypeScript. The sources are in `src/`, the adapter runs from `build/`
- (@GermanBluefox) The configuration dialog was rewritten as JsonConfig. Admin 7.7.22 or newer is required for it
- (@GermanBluefox) The adapter can only be installed from npm now, no longer directly from GitHub (`common.nogit`)
- (@GermanBluefox) The options "Use call forwarding options", "Use mDNS" and "Create JSON device list" have a default value in `io-package.json` now
- (@GermanBluefox) The command `dumpservices.fs` writes the file again instead of stopping the adapter

### 4.3.0 (2024-04-30)
* (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 4.2.18 (2023-01-04)
* (Apollon77) Prepare for future js-controller versions

## License
The MIT License (MIT)

Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2015-2023 soef <soef@gmx.net>, ioBroker-Community-Developers

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