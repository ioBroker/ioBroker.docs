---
BADGE-Number of Installations: https://iobroker.live/badges/admin-stable.svg
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.admin.svg
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
- (@GermanBluefox) Changed: the dialog "Update all adapters" shows the overall progress and the result of each adapter

### 8.3.8 (2026-11-04)
- (@GermanBluefox) Added: menu badges jump when their number grows; a ring turns around the adapter icon while it is installed or updated
- (@GermanBluefox) Changed: instance rows fade into the color of the new status; all elements of a row are centered vertically
- (@GermanBluefox) Updated `@iobroker/gui-components` to 10.3.16: arrow up/down at changed numbers in the object browser, check mark after saving
- (@GermanBluefox) Added: admin serves React 19 and 18 as ES modules under `lib/esm/` for web components (`@iobroker/web-components`)
- (@GermanBluefox) Updated packages (`node-forge` 1.4.3, `@module-federation/vite` 1.23.9)

### 8.3.7 (2026-11-03)
- (@GermanBluefox) The `checkDocker` control showed the Docker of the admin host for an instance on that host, also if the instance uses another Docker - e.g. one on a NAS that the adapter names in `iobDockerApi` of its plugin config, or that is chosen in the instance settings. Now admin asks the js-controller of its host as well, if it can check Docker (`CONTROLLER_CHECK_DOCKER`): it checks the Docker connection of the instance, with the `@iobroker/plugin-docker` of the adapter. If it cannot - an older js-controller, an adapter without the plugin - admin checks the Docker of its host itself, as before
- (@GermanBluefox) Updated `@iobroker/json-config` to 10.1.11: `validatorErrorText` is shown below the element instead of the help text, also in the cells of a table (#1911)
- (@GermanBluefox) History data: live values are marked and replaced with the stored ones every 10 seconds; added a reload button (ioBroker.sql#600)
- (@GermanBluefox) An update can be ignored also if its dependencies are not met (#3713)
- (@GermanBluefox) Added: animated icons for start/stop, status, notifications, menu, reload, delete, connection and the result of a command
- (@GermanBluefox) Added: the start/stop button of an instance shows a ring until the instance really runs or stopped
- (@GermanBluefox) Changed: new expert mode symbol (mortarboard)
- (@GermanBluefox) Added: animated folders in the object browser; the restart button of an instance turns until the instance is alive again
- (@GermanBluefox) Changed: the pause button of the log shows the number of new lines as a badge
- (@GermanBluefox) Fixed: the access control dialog crashed with "Error in GUI" and the owner or group could not be changed, if the children had different owners or groups (#3711)

### 8.3.6 (2026-10-29)
- (@GermanBluefox) Fixed: the `checkDocker` control of a configuration dialog showed the Docker of the host admin runs on, also for an instance on another host. Admin asks the host of the instance now; that host needs a js-controller with `CONTROLLER_CHECK_DOCKER`. With an older js-controller there, the dialog says that Docker cannot be checked instead of showing the wrong host
- (@GermanBluefox) Updated `@iobroker/json-config` to 10.1.9: the `checkDocker` control names the host of the instance
- (@GermanBluefox) Updated `@iobroker/json-config` to 10.1.10: the new option `allowReorder` of `table` lets the rows be reordered with `noDelete: true` (#3707); the export/import buttons of the instance settings do not cover the last tabs any more (#3613, #3657)
- (@GermanBluefox) Added: OpenRouter as provider in the AI settings of the system settings (`@iobroker/ai-core` 0.0.6, `@iobroker/ai-gui` 0.0.5)
- (@GermanBluefox) Added: the "Resource usage" chart of the overview can show any recorded data points, not only CPU and RAM - with own name, color and history instance. Each data point is read from the history instance that records it, so values recorded by InfluxDB or SQL are shown too, also CPU and RAM if the default history instance does not record them (#3705)

### 8.3.5 (2026-10-26)
- (@GermanBluefox) Fixed: after a single sign-on the access and refresh token were put into the address (`?ssoLoginResponse=`), so they ended up in the browser history and in the logs of a reverse proxy. Only a one-time code is there now, admin fetches the tokens with it. The ID token that came back after connecting an identity (`?id_token=`, with name and e-mail) is not kept any more, nothing used it
- (@GermanBluefox) Fixed: the session cookie of a single sign-on was readable by scripts and sent along cross-site requests, unlike the one of a password login
- (@GermanBluefox) Fixed: behind a reverse proxy with https the single sign-on sent `http://.../sso-callback` to the identity provider, which did not match the registered redirect URI. The protocol now comes from `X-Forwarded-Proto`, and the external address of admin can be set in the SSO settings
- (@GermanBluefox) Important for everybody who had the single sign-on switched on with an admin before 8.3.4: an identity that somebody else connected with a user stays connected after the update. Check on the "Users" page that every user with single sign-on is connected with the right account, and disconnect the others
- (@GermanBluefox) Fixed: the device manager crashed if a slider of a device got a value that is not a number (#3699)
- (@GermanBluefox) Added: the system settings have an "AI" tab to set up the AI provider, its API key and the model once for the whole system; only one provider can be active
- (@GermanBluefox) Changed: the tabs of the system settings stand on the left with icons, on a phone on top
- (@GermanBluefox) Changed: the AI assistant takes provider, key and model from the "AI" tab of the system settings

### 8.3.4 (2026-10-25)
- (@typhosj) Fixed: the license dialog of a paid adapter stayed empty and could not be accepted, so the adapter could not be installed. The dialog loaded `licenseInformation.link` as the license text, but that link names the page with prices and where to buy, which the browser may not read. The license text comes from the repository of the adapter again, and the link is shown next to it. A license text that cannot be loaded no longer blocks the dialog, and a short Markdown text that needs no scrolling can be accepted (#3311, ioBroker/ioBroker.vis-2#707)
- (@agross) Improved the English wording of the active repository warning.
- (@GermanBluefox) Fixed: "Add Single-Sign On" in the user dialog sent the display name of the user instead of the user ID, so connecting failed for every user whose name differs from the ID

## License

The MIT License (MIT)

Copyright (c) 2014-2026 bluefox <dogafox@gmail.com>

[Full license text](LICENSE)