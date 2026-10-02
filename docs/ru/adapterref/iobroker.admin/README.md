---
BADGE-Number of Installations: http://iobroker.live/badges/admin-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.admin.svg
BADGE-Test and Release: https://github.com/ioBroker/ioBroker.admin/workflows/Test%20and%20Release/badge.svg
BADGE-Translation status: https://weblate.iobroker.net/widgets/adapters/-/admin/svg-badge.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.admin.svg
---
## Описание

Драйвер используется для обслуживания и настройки системы ioBroker и всех установленных драйверов. 
Он представляет собой WEB-интерфейс по адресу `<IP-Адрес сервера>:8081` и устанавливается вместе с ioBroker.

С помощью WEB-интерфейса, предоставляемого драйвером **admin**, реализуются следующие функции:

*   Установка дополнительных драйверов
*   Обзор объектов
*   Обзор состояний объектов
*   Управление пользователями и группами
*   Просмотр журнал (лог-файл) работы системы
*   Управление хостами (работа с распределенной системой - более одного хоста)

## Установка

Этот драйвер устанавливается вместе с ioBroker, ручная установка не требуется.

## Настройка

### Параметры конфигурации

![iobroker.admin - driver settings](img/admin_img_002.jpg)

#### IP

IP-адрес с которого доступен драйвер (поддерживаются IPv4 и IPv6). Значение по-умолчанию 0.0.0.0, то есть 
возможно соединение на любой IP-адрес. 

<span style="color: #ff0000;">**Изменять не желательно, можно потерять досуп!**</span>

#### Port

Порт, по которому доступен интерфейс драйвера. На сервере может быть запущено 
несколько WEB-сервисов и порт 8081 (настройка по-умолчанию) может быть занят, 
необходимо исключить конфликт занятого порта. Значение можно изменять.

#### Шифрование

Если необходимо использовать протокол HTTPS, необходимо отметить данную опцию.

#### Аутентификация

Если необходима аутентификация пользователя для работы с драйвером, 
необходимо отметить данную опцию (автоматически включится опция HTTPS).

#### Кэш

Необходимо отметить данную опцию, если планируется использовать кэш браузера.

#### Пользователь по-умолчанию

Если опция аутентификации отключена, то драйвер admin будет работать от имени пользователя по-умолчанию (выбирается из списка), в противном случае, от имени пользователя при аутентификации.

#### Проверка обновлений

Периодичность автоматической проверки обновлений системы и установленных драйверов. 
Можно выбрать опцию "ручное" и тогда проверка будет осуществляться только по запросу пользователя.

## Использование

В адресной строке WEB-браузера наберите: `<IP-Адрес сервера>:8081`

### Вкладки

Главное окно интерфейса состоит из нескольких вкладок. 

![ioBroker.admin - general view](img/admin_img_001.jpg)

#### Вкладка "Драйвера"

Здесь можно установить или удалить экземпляры драйверов. В списке отображаются доступные для установки драйвера 
и их версии, а так же версии установленных. Обновить информацию по версиям можно с помощью кнопки в левом 
верхнем углу. В столбце **Версия** предусмотрена цветовая маркировка релиза драйвера 
(красный = в планах, желтый = бета-версия, оранжевый = альфа-версия, зеленый = финальная версия). 
Если установленная версия драйвера ниже версии на сервере (имеются обновления), то заголовок 
станет зеленым и появится в строке драйвера кнопка обновления. Если кнопка со знаком вопроса 
в последнем столбце активная, то нажав по ней, можно перейти на сайт **Github** для ознакомления с информацией об драйвере.

#### Вкладка "Настройки драйверов"

Здесь отображаются установленные экземпляры драйверов и осуществляется настройка/конфигурирование. 
Слева сверху находится кнопка включения режима эксперта - для отображения дополнительных настроек. 

Настройки драйверов:

*   Запуск/станов экземпляра драйвера
*   Открытие всплывающего окна с настройками драйвера
*   Кнопка перезапуска экземпляра драйвера
*   Кнопка удаления экземпляра драйвера
*   Если драйвер подразумевает собственный WEB-сервис, будет доступна кнопка перехода в новом окне.

Если щелкнуть на название драйвера в столбце **Заголовок**, можно изменить название экземпляра. 
В режиме эксперта появляются еще два столбца справа:

*   Столбец **Уровень** - выбор из списка уровень подробности ведения журнала работы адаптера (debug, error, warn, info)
*   Столбец **Max. RAM** - при необходимости можно ограничить выделение памяти ОЗУ для работы драйвера

#### Вкладка "Объекты"

На этой вкладке отображаются объекты системы (переменные, программы, устройства и пр.). 
По-умолчанию, системные объекты скрыты, их можно отобразить нажав кнопку **Показать системные объекты** 
слева сверху. С помощью кнопок со стрелками вверх/вниз можно загрузить/выгрузить объект(-ы) файлом JSON. 
В столбце справа можно нажатием кнопки вызвать окно настроек конкретного объекта (отдельной кнопкой настройки хранения истории) 
и удалить объекты. Если значения отображаются красным цветом, значит они еще не подтверждены - флаг `ack = false`.

#### Вкладка "Состояния"

Отображение в табличной форме состояний всех объектов системы. В шапке таблицы поля для ввода - фильтры для поиска объекта или группы объектов.

#### Вкладка "События"

Отображение в табличной форме изменений состояний объектов в режиме реального времени (можно приостановить, нажав справа сверху соответствующую кнопку).

#### Вкладки "Группы" и "Пользователи"

Добавление пользователей и групп, редактирование привилегий.

#### Вкладка "Категории"

Добавление/редактирование/удаление категорий (к примеру комнат для работы с адаптером **<span class="fancytree-node"><span class="fancytree-title">Scenes</span></span>**).

#### Вкладка "Сервера"

Список серверов с установленным ioBroker, так же здесь отображается версия js-controller на каждом хосте. 
Если имеется новая версия, то заголовок вкладки будет отображаться зеленым цветом и появится кнопка 
обновления версии js-controller до актуальной. Запросить текущую версию (если отключено автоматическое обновление) 
можно с помощью кнопки **Обновить информацию драйвера** в левом нижнем углу окна. 
Так же возле имени хоста имеется кнопка перезагрузки js-controller (не OS).

#### Вкладка "Лог"

Здесь отображается журнал работы сервера. Сверху слева доступны поля для фильтрации записей. 
Можно отображать записи только указанного драйвера, либо всех (включая системный js-controller); 
можно выбрать уровень отображения лога (отладка, инфо, предупреждения, ошибки) и фильтровать по значениям. 

Справа сверху находятся кнопки:

*   Кнопка **Задержать вывод сообщений** - вывод сообщений на странице временно приостанавливается (например, когда сообщения появляются слишком быстро, чтобы не пропустить искомое)
*   Кнопка **Обновить протокол** - обновить журнал вручную (сообщения должны выводиться в режиме онлайн при активной вкладке)
*   Кнопка **Скопировать протокол** - сообщения на экране копируются в буфер обмена для дальнейшего использования (например, для вставки на форум, чтобы описать ошибку)
*   Кнопки **Очистить протокол на экране** и **Очистить протокол на сервере** - соответственно очищает вывод сообщений на вкладке **Лог** и полностью удаляет сообщения из журнала на сервере (применять осторожно).

#### Вкладка "Скрипты"

Эта вкладка активна только если установлен драйвер **Javascript/Coffescript Script Engine**. 
Здесь можно создавать/удалять/редактировать скрипты для автоматизации. 
Более подробно смотри описание данного драйвера.

#### Вкладка "Node-red" и вкладки других драйверов

Эти вкладки видны только если включен соответствующие драйвер (см. пункт ниже).

### Общие настройки

Справа сверху находятся кнопки общих настроек драйвера **Admin**:

*   Кнопка **Видимость вкладок** - можно включать и отключать вкладки, а так же, при установке определенных драйверов, для которых существуют свои вкладки - добавлять их на страницу
*   Кнопка **Системные настройки** - дополнительные настройки работы системы такие как: язык интерфейса, формат даты, единицы измерений, активный репозиторий и пр. (группа основные настройки); редактирование, добавление/удаление ссылок на репозитории (группа репозитории); добавление/удаление собственных сертификатов при использовании HTTPS (группа сертификаты); настройка анонимного сбора статистики (группа статистика)
*   Кнопка **Выйти** - выход из системы.

![ioBroker.admin - system settings](img/admin_img_006.jpg)

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (@GermanBluefox) Fixed: the link of an adapter that runs as a web extension lost everything behind the host. `energiefluss-erweitert` points at `.../energiefluss-erweitert/?instance=%instance%`, and the quick access offered `.../energiefluss-erweitert/` - without the page and without the instance. Such an adapter has no own port, so the origin of its link has to come from the web instance that serves it, but the whole address was built anew instead of only its origin being exchanged. The same happened to `habpanel`, whose `index.html` disappeared, and to a second link of an adapter that pointed at its documentation on a foreign host: it ended up on the own web server (#3661)
- (@GermanBluefox) Fixed: a card of the quick access belonged to whichever adapter was processed first. Every vis-2 widget adapter registers a link to the vis-2 runtime, and because the instance IDs decide the order, `vis-2` itself lost its own card to one of them, together with its name, its icon and its color. The card now belongs to the adapter that serves the page
- (@GermanBluefox) Added: the admin recognizes that it was opened through the remote access of ioBroker Cloud/Pro and moves the links onto the service. The quick access, the instance list and the tabs of the left menu pointed into the local network, which is of no use to somebody who is not in it. Which instances the service publishes is read from the configuration of the `cloud` or `iot` adapter, so nothing is guessed: the web instance is reachable at `/`, the admin at `/admin/` and lovelace at `/lovelace/`. A page the service does not publish - Node-RED or a second admin, for example - is no longer offered as a dead link but shown dimmed with a note that it only works in the local network
- (@GermanBluefox) Added: the identity provider for the single sign-on can be configured. The issuer, the client ID, an optional client secret and the scopes are set in the new "Single sign-on" tab of the admin settings, and the endpoints are read from the discovery document of the issuer, so every provider that follows the standard works. Without a complete configuration the SSO stays off and the login page does not offer it (needs `@iobroker/webserver` 3.3.0)
- (@GermanBluefox) Changed: `mime` was replaced by `mime-types`. `mime` 4 is ESM only, and version 3 is no longer maintained; `mime-types` uses the same database, is already part of the dependency tree through express, and three duplicated copies of it disappear from the lockfile. A JavaScript file is now served as `text/javascript` instead of the deprecated `application/javascript`

### 8.0.21 (2026-09-29)
- (@GermanBluefox) Fixed: on a grown installation, the start of the GUI ran into "Detected slow connection!" and the dialog offering a longer read timeout, on a fast local network as well. The start page read the whole object database only to count the objects and the states for its tile - 32 MB on a system with 10,000 objects - which blocked the admin process for seconds, so every other request of the start waited for it and ran into its own timeout. The counting is now done by the server, which answers with two numbers instead (needs `@iobroker/socket-classes` 2.6.0 and `@iobroker/socket-client` 5.4.0; an older backend still reads all objects, but delayed until the start is through). The whole start now transfers 2.4 MB, and the object database is no longer part of it (#3656)
- (@GermanBluefox) Fixed: the news check read all objects a second time, right after the start page had read them
- (@GermanBluefox) Fixed: the admin stayed on its logo and only came up after the page was reloaded. The start reads its own settings, the easy mode and the GUI settings one after the other, and each of them with a timeout of five seconds - which is less than a busy host needs for the first requests. Those reads no longer end the start, and whatever else goes wrong, the app is shown instead of the loader: the menu, the error message and the reconnect are more use than a logo that never goes away (#3641)
- (@GermanBluefox) Changed: the read timeout starts at 30 seconds instead of 15 (60 instead of 40 in the cloud), and it now applies to every request of the start instead of only to the repository and the installed versions
- (@GermanBluefox) Changed: the dialog about a slow connection only appears for a read the user asked for - switching the host or retrying from the dialog itself. Nothing waits for the read of the start any more, so a dialog there interrupted a start that was going perfectly well otherwise
- (@GermanBluefox) Added: the "Resource usage" card has a button that first stops the recording of CPU and RAM by the history instance, then collapses the card, which gives the system log room for 16 lines instead of 6. A collapsed card reads nothing at all until it is opened again, and it stays collapsed after a reload (needs `@iobroker/gui-components` 10.3.7)
- (@GermanBluefox) Fixed: a timeout while reading `guiSettings` at the start overwrote the stored GUI settings of the user with the defaults
- (@GermanBluefox) Fixed: the system log of the start page was left empty by "Cannot get logs: TypeError: e.pop is not a function" when the host answered with anything but its log lines

### 8.0.20 (2026-09-26)
- (@GermanBluefox) Fixed: in the credentials of the system settings, a long translation of the type - "Benutzerdefiniert" in German - ran into the ID next to it, because the column had a fixed width that the text did not fit into. The column is wider now, and a translation that is longer still is cut with an ellipsis and shown in full as a tooltip (#3642)
- (@GermanBluefox) Changed: an object of an adapter can only be deleted in the expert mode now - the delete button in the row, the entry in the context menu and the `Delete` key are gone without it. Deleting such an object can stop the adapter from working, and it is created again at its next start anyway. Objects a user creates themselves (`0_userdata.*` and `alias.*`) can still be deleted without the expert mode (#3639)
- (@GermanBluefox) Fixed: an object whose ID contains a "/" - e.g. `ocpp.0./TACW1142021G1543.1.meterValues.Power_Active_Import` - could not be opened from the object tree. The ID went into the URL unencoded, so it was read back cut off at its first slash: the dialog showed the wrong title, the history settings started at 1 January 1970, the "Chart" tab disappeared and switching the tab ended in `can't access property "ocpp.0."`. The ID now survives the round trip through the URL (#3634). Needs `@iobroker/gui-components` 10.3.5
- (@GermanBluefox) Fixed: in a multihost system, the Log tab asked its own controller whether `getLogs` understands a log level, but sent the request to the selected host. If that host still ran an older js-controller, it answered with the complete log file. The question now goes to the host whose log is shown
- (@GermanBluefox) Fixed: if a host knows the command `searchLogs` but cannot carry it out - e.g. because it writes no log file at all - the Log tab showed its error. Its files are now read the way those of an older controller are read
- (@GermanBluefox) The assistant is shown only on admin tabs, not on the config pages of other adapters.

### 8.0.18 (2026-09-23)
- (@krobipd) Fixed: the admin showed its start screen for half a minute when the host could not reach the repository server (no internet, firewall). The start no longer waits for the repository and the installed versions; only the adapters tab needs them, and it fills itself as soon as they arrive
- (@krobipd) Fixed: on a slow or busy host, the admin start ended with "Cannot get hosts: Error: timeout" and an empty menu column until the page was reloaded. The menu and the host selector now try again (after 2 s, 5 s, then every 10 s) and after a reconnect, without an alert for each failed attempt; a missing permission is still reported once
- (@krobipd) Fixed: when the instance objects could not be read, the pinned config manager entries were deleted from the menu
- (@krobipd) Changed: several instance changes in a row rebuild the menu only once, and an older rebuild can no longer overwrite a newer one
- (@GermanBluefox) Changed: in the categories, an object dragged from one room or function onto another one is moved there; it is copied only if Shift, Ctrl or Alt is held while dropping (formerly only Alt, and the object often appeared to be copied anyway). The preview at the pointer shows whether it will be moved or copied, and a hint below the members explains the keys
- (@GermanBluefox) Fixed: after an object was moved to another room or function, it was still shown in the old one until the page was reloaded
- (@GermanBluefox) Added: the "Default History" selection in the base settings shows the icons of the history adapters, in the list and in the field
- (@GermanBluefox) Added: the base settings open with the tab that was used last, unless the link names a tab

### 8.0.17 (2026-09-20)
- (@BenAhrdt) Added: a config manager instance can be pinned to the menu. The pin sits in the toolbar of the device list and creates an entry that opens exactly this instance, so an adapter no longer needs an `adminTab` of its own just to lead there. The pinned instances are stored per browser (or in the GUI settings, if they are switched on), and an instance that is deleted or no longer offers a device manager loses its entry
- (@GermanBluefox) Added: a quick filter in the menu. From 11 entries on, a magnifier appears next to the logo; it turns the header into a text field and hides the menu entries that do not match. Both the translated and the English name are searched, so the English name of a tab finds it in every language; Enter opens the first hit, Escape closes the filter
- (@GermanBluefox) Added: the "Used by" column of the credentials now lists the scripts, too. Admin searches the sources of all scripts for `SECRETS.<ID>` (also `SECRETS['<ID>']`) and shows the scripts that read the credential; hovering an entry shows the full script ID. The engine of the script provides the icon, so `script.js.*` and `script.py.*` are treated alike

### 8.0.16 (2026-09-18)
- (@GermanBluefox) Fixed: once the order of the menu was saved, the tab of a newly installed adapter always came last and its `common.adminTab.order` had no effect. The tab is now placed after the tab that precedes it by order; the tabs the user has arranged keep their position
- (@GermanBluefox) Fixed: admin wrote the system config each time the menu was loaded or an instance changed, even though nothing had changed
- (@GermanBluefox) Added: with HTTPS enabled, admin speaks HTTP/2 - the browser loads the page and all its files over a single connection. Clients without HTTP/2 fall back to HTTP/1.1 automatically; the new option "Use HTTP/2" in the instance settings turns it off
- (@GermanBluefox) Fixed: the MCP endpoint built into admin (`/mcp`) always answered with the 404 page, so MCP clients could not connect to it
- (@GermanBluefox) Changed: the "page not found" page has the look of admin 8, follows its light or dark theme and is shown in the language of admin

## License

The MIT License (MIT)

Copyright (c) 2014-2026 bluefox <dogafox@gmail.com>