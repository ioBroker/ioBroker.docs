---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/config/cli.md
title: Консольные команды
hash: ntIlrfMpR4seVtWD5Zxd17gyji9+GHxkueTwrGLx3JE=
---
# Консольные команды
Есть возможность выполнять некоторые операции, такие как запуск, остановка или обновление через консоль (windows и linux). Вот их описание.

Примечание: все команды, начинающиеся с `iobroker`, можно вызывать из любого каталога, где доступна команда ioBroker. Команда `npm install` должна вызываться из корневого каталога ioBroker.

Возможны следующие команды:

- [npm install iobroker.имя_адаптера](#npm-install-iobrokerимя_адаптера)
- [iobroker start](#iobroker-start)
- [iobroker stop](#iobroker-stop)
- [перезапуск iobroker](#iobroker-restart)
- [iobroker isrun](#iobroker-isrun)
- [iobroker start адаптерИмя.экземпляр](#iobroker-start-adapternameэкземпляр)
- [iobroker stop имя_адаптера.экземпляр](#iobroker-stop-имя_адаптераэкземпляр)
- [iobroker restart адаптерИмя.экземпляр](#iobroker-restart-adapternameэкземпляр)
- [iobroker add имя_адаптера \[--enabled\] \[--host \<хост\>\] \[--port \<порт\>\]](#iobroker-add-имя_адаптера)
- [iobroker install адаптерИмя](#iobroker-install-adaptername)
- [имя_адаптера_загрузки_iobroker](#имя_адаптера_загрузки_iobroker)
- [настройка iobroker](#iobroker-setup)
- [iobroker del adapterName](#iobroker-del-adaptername)
- [iobroker del adapterName.instance](#iobroker-del-adapternameinstance)
- [iobroker update \[url-адрес-репозитория\] \[--updatable\]](#iobroker-update-repository-url)
- [обновление iobroker \[url-адрес репозитория\]](#iobroker-upgrade)
- [iobroker обновить себя \[url-адрес репозитория\]](#iobroker-upgrade-self)
- [iobroker upgrade adapterName \[repository url\]](#iobroker-upgrade-adaptername)
- [iobroker nodejs-обновление](#iobroker-nodejs-обновление)
- [iobroker object get objectId](#iobroker-object-get)
- [объект iobroker chmod \<object-mode\> \[режим-состояния\] \<id\> ](#iobroker-object-chmod)
- [iobroker object chown \<пользователь\> \<группа\> \<id\>](#iobroker-object-chown)
- [список объектов iobroker \<id\>](#iobroker-object-list)
- [iobroker set \<экземпляр\> \[настройки\]](#iobroker-set)
- [iobroker state get objectId](#iobroker-state-get)
- [iobroker state getplain objectId](#iobroker-state-getplain)
- [iobroker state getvalue objectId](#iobroker-state-getvalue)
- [iobroker state set objectId newValue](#iobroker-state-set)
- [iobroker state del objectId](#iobroker-state-del)
- [iobroker message \<adapter\>\[.instanceid\] \<command\> \[\message\]](#iobroker-message)
- [настройка iobroker](#iobroker-setup)
- [iobroker очистить](#iobroker-clean)
- [резервное копирование iobroker](#iobroker-backup)
- [хост iobroker](#iobroker-host)
- [набор хостов iobroker](#iobroker-host-set)
- [удаление хоста iobroker](#iobroker-host-remove)
- [iobroker restore \<имя или путь резервной копии\>](#iobroker-restore)
- [список iobroker \<тип\> \[шаблон\]](#iobroker-list)
- [iobroker chmod \<режим\> \[шаблон\]](#iobroker-chmod)
- [iobroker chown \<пользователь\> \[группа\] \[шаблон\] ](#iobroker-chown)
- [iobroker adduser \<пользователь\> \[--ingroup группа\] \[--password пароль\]](#iobroker-adduser)
- [iobroker deluser \<пользователь\>](#iobroker-deluser)
- [iobroker пароль \<пользователь\> \[--пароль пароль\]](#iobroker-passwd)
- [файл iobroker прочитан \<toRead\> \[toWrite\]](#iobroker-file-read)
- [запись файла iobroker \<toRead\> \<toWrite\>](#iobroker-file-write)
- [версия iobroker \[ИмяАдаптера\]](#версия-iobroker)
- [iobroker uuid](#iobroker-uuid)
- [статус iobroker](#iobroker-status)
- [iobroker repo \[repoName\]](#iobroker-repo)
- [информация о iobroker](#iobroker-info)
- [статус компактного iobroker](#iobroker-compact-status)
- [iobroker compact \[включить|отключить|вкл|выкл\]](#iobroker-compact-enabledisableonoff)
- [iobroker compact имя_адаптера.экземпляр](#iobroker-compact-adapternameэкземпляр)
- [создание сертификата iobroker](#iobroker-cert-create)
- [логи iobroker \[--watch\]](#iobroker-logs)

**Примечание:** есть параметр `--timeout 5000`, который можно использовать с каждой командой. Он указывает таймаут в мс для подключения к БД.

## Npm install iobroker.имя_адаптера
Эту команду необходимо вызывать из корневого каталога ioBroker (обычно `/opt/iobroker` или `C:\Program Files\ioBroker`). Она использует менеджер npm для установки или обновления указанного адаптера или js-controller. Она работает всегда, даже если у "admin" или "js-controller" есть проблемы.

Примеры использования:

- `npm install iobroker.admin` - обновить или установить адаптер «admin»
- `npm install iobroker.js-controller` - обновить или установить сам js-controller
- `npm install https://github.com/husky-koglhof/ioBroker.hmm/tarball/master/` - установить адаптер напрямую с GitHub или из другого места. Это должен быть пакет ZIP или GZ, содержащий `package.json`.

Если адаптер был установлен, то после вызова `npm install ..` необходимо выполнить перезапуск указанного адаптера или всего js-контроллера, чтобы изменения вступили в силу.

Это можно сделать с помощью `iobroker restart adapterName` или просто `iobroker restart`. Подробности см. в [здесь](#iobroker-restart).

***Примечание:*** таким образом можно установить только пакеты с именем `ioBroker.zzz`.

## Запуск iobroker
Запускает iobroker как демон. Если ioBroker уже запущен, вы получите предупреждение:

`ioBroker controller daemon already running. PID: xx`

***Примечание для Windows:*** обычно ioBroker под Windows запускается как служба. Эта команда запустит второй экземпляр ioBroker, что приведет к конфликту. Используйте `serviceIoBroker.bat start` из каталога ioBroker вместо команды `iobroker start`. Для запуска службы у вас должны быть права администратора.

## Остановка iobroker
Останавливает iobroker, если он запущен как демон. Если ioBroker не запущен, вы получите предупреждение:

`ioBroker controller daemon is not running`

***Примечание для Windows:*** обычно ioBroker под Windows запускается как служба. Эта команда не даст никакого эффекта. Используйте `serviceIoBroker.bat stop` из каталога ioBroker вместо команды `iobroker stop`. Для остановки службы у вас должны быть права администратора.

## Перезапуск iobroker
Только команды «стоп» и «старт» вместе. См. выше.

## Iobroker запущен
Возвращает фактический статус ioBroker. Запущен он или нет. Если ioBroker не запущен, код возврата — 100.

То же, что и `iobroker status`.

## Iobroker start адаптерИмя.экземпляр
Вы можете запустить указанный адаптер из консоли. Он будет автоматически включен и запущен.

Если адаптер был запущен, он будет перезапущен.

Вы можете контролировать в «администрировании», включен ли экземпляр адаптера.

Использование:

- `iobroker start email.0` - включает и запускает экземпляр адаптера ioBroker.email.0

Примечание: вы можете вызвать `iobroker start all`, чтобы запустить все отключенные экземпляры, например, после восстановления.

## Iobroker stop адаптерИмя.экземпляр
Вы можете остановить указанный адаптер из консоли. Он будет отключен и остановлен. Он не будет автоматически перезапущен позже.

Вы можете контролировать в «администрировании», что экземпляр адаптера теперь отключен.

Использование:

- `iobroker stop email.0` - включает и запускает экземпляр адаптера ioBroker.email.0

## Iobroker перезапускает адаптерИмя.экземпляр
Он просто перезапускает указанный адаптер. Если он отключен, то он будет включен.

## Iobroker добавить имя_адаптера
Полный синтаксис: `iobroker add adapterName [desiredInstanceNumber] [--enabled] [--host \<host\>] [--port \<port\>]`

Эта команда устанавливает, если не установлен, и создает экземпляр указанного адаптера. Если экземпляр адаптера уже существует, будет использован следующий номер экземпляра.

Есть еще несколько дополнительных параметров:

- включено: экземпляр адаптера будет автоматически включен после создания, в противном случае для этого будет использоваться предопределенное значение адаптера.
- host: Имя хоста, где должен быть создан экземпляр адаптера. Вы можете получить список хостов с помощью команды `iobroker list hosts`. (Пока не реализовано)
- порт: если адаптер имеет настройки native.port, то после установки будет установлено желаемое значение.
- desiredInstanceNumber: вы можете указать желаемый номер экземпляра.

Использование:

- `iobroker add dwd` - Установка и создание экземпляра адаптера DWD.
- `iobroker add admin --enabled --port 80` - Создать второй (обычно) экземпляр адаптера администратора на порту 80 и включить его.

Если эта команда не работает, вы всегда можете использовать команду `npm install iobroker.adapterName` для принудительного обновления или установки. Экземпляр не будет создан, вам следует вызвать команду `iobroker add iobroker.adapterName` после этого еще раз.

## Iobroker install имя_адаптера
Устанавливает только адаптер в ioBroker и не создает экземпляр. Если адаптер уже установлен, вы получите следующее предупреждение:

`adapter "admin" yet installed. Use "upgrade" to install newer version.`

## Iobroker upload адаптерName
Загружайте веб-страницы из папок "www" и "admin" в адаптере в файловое хранилище ioBroker. Обычно используется разработчиками для просмотра изменений, внесенных на страницах конфигурации или на страницах "www".
Вы не можете изменять файлы напрямую в `iobroker/iobroker-data/adapter/file`. Для разработчиков в файле конфигурации (`iobroker-data/iobroker.json`) есть флаг для отключения кэширования файла. Если этот флаг установлен в значение true (конечно, после изменения файла конфигурации требуется новый запуск), изменения в каталоге iobroker-data будут видны в Интернете без команды `iobroker upload adapterName`.

Примечание: вы можете вызвать `iobroker upload all`, чтобы загрузить все адаптеры, например, после восстановления.

## Настройка iobroker
Эту команду необходимо вызвать, если ioBroker был установлен не с помощью npm или установщика Windows (например, просто скопирован с GitHub и распакован). Она создает файл конфигурации по умолчанию и подготавливает каталоги данных.

Вы можете вызвать эту команду с параметром «first», чтобы быть уверенным, что ничего не будет перезаписано, если конфигурация уже существует.

Использование: `iobroker setup first` - создать файлы конфигурации, если они еще не созданы.

## Настройка iobroker на заказ
Для включения конфигурации с несколькими хостами необходимо вызвать эту команду. Необходимо ответить на следующие вопросы:

```
Type of objects DB [file, couch, redis], default [file]:
Host of objects DB(file), default[127.0.0.1]: enter IP address of the main system
Port of objects DB(file), default[9001]:
Type of states DB [file, redis], default [file]:
Host of states DB (file), default[ip]:
Port of states DB (file), default[9000]:
```

Вы можете просто нажать ENTER, чтобы принять значение по умолчанию, показанное в \[\].

**Примечание:** на данный момент поддерживается только тип базы данных *file*. Если вы меняете порты, вы должны быть экспертом.

**Примечание:** Проверьте настройки брандмауэра на основном хосте для определенных портов (9000/9001).

## Iobroker имя_адаптера
Полностью удаляет все экземпляры и состояния этого адаптера из ioBroker и удаляет его с диска.

После удаления восстановить настройки экземпляров адаптера невозможно.

Использование: `iobroker del dwd` - удаляет все экземпляры и код адаптера dwd из ioBroker.

## Iobroker адаптера Имя.instance
Удаляет только указанный экземпляр этого адаптера из ioBroker и **не** удаляет его с диска.

После удаления восстановить настройки экземпляра адаптера невозможно.

Использование: `iobroker del dwd.0` - удаляет экземпляр 0 адаптера dwd из ioBroker.

## Обновление iobroker \[url-адрес репозитория\]
Полный синтаксис: `iobroker update \[repository url\]`

Прочитать информацию из настроенного репозитория ioBroker. Если установлено `\repository url\`, информация будет прочитана из этого репозитория.

Использование:

- `iobroker update` - список доступных версий из настроенного (обычно локального) репозитория.
- `iobroker update https://raw.githubusercontent.com/ioBroker/ioBroker.js-controller/master/conf/sources-dist.json` - Список доступных версий из онлайн-репозитория.

```
>./iobroker.js update
Cannot get version of "virtual".
Cannot get version of "geofency".
update done
Adapter    "zwave"         : 0.1.0
Adapter    "yr"            : 0.1.2    , installed 0.1.2
Adapter    "web"           : 0.2.6    , installed 0.2.6
Adapter    "vis"           : 0.2.9    , installed 0.2.9
Adapter    "virtual"
Adapter    "sonos"         : 0.1.5    , installed 0.1.4 [Updateable]
Adapter    "rickshaw"      : 0.2.1    , installed 0.2.1
Adapter    "pushover"      : 0.1.0
Adapter    "onkyo"         : 0.0.4
Adapter    "telnet"        : 0.0.0
Adapter    "socketio"      : 0.2.3    , installed 0.2.3
Adapter    "simple-api"    : 0.0.3    , installed 0.0.3
Adapter    "sayit"         : 0.3.0    , installed 0.3.0
Adapter    "ping"          : 0.1.3    , installed 0.1.3
Adapter    "node-red"      : 0.1.5    , installed 0.1.5
Adapter    "mqtt"          : 0.1.6    , installed 0.1.5 [Updateable]
Adapter    "mobile"        : 0.0.2
Adapter    "legacy"        : 0.1.12
Adapter    "knx"           : 0.0.1
Controller "js-controller" : 0.5.14   , installed 0.5.14
Adapter    "javascript"    : 0.2.3    , installed 0.2.3
Adapter    "ical"          : 0.0.2    , installed 0.0.1 [Updateable]
Adapter    "hmm"           : 0.0.15   , installed 0.0.16
Adapter    "hue"           : 0.2.0    , installed 0.2.0
Adapter    "hm-rpc"        : 0.3.5    , installed 0.3.4 [Updateable]
Adapter    "hm-rega"       : 0.1.17   , installed 0.1.17
Adapter    "history"       : 0.1.3    , installed 0.1.3
Adapter    "highcharts"    : 0.0.0
Adapter    "graphite"      : 0.1.0
Adapter    "geofency"
Adapter    "example"       : 0.1.1    , installed 0.1.1
Adapter    "email"         : 0.1.0
Adapter    "dwd"           : 0.1.7    , installed 0.1.7
Adapter    "cul"           : 0.0.2    , installed 0.0.3
Adapter    "b-control-em"  : 0.1.1
Adapter    "artnet"        : 0.0.3
Adapter    "admin"         : 0.3.21   , installed 0.3.20 [Updateable]
```

Эта команда ничего не меняет, а просто обновляет внутреннюю информацию о доступной версии адаптера и показывает ее.

Чтобы отобразить только обновляемые адаптеры, используйте фильтр `--updatable`.

## Обновление iobroker
Полный синтаксис: `iobroker upgrade \[repository url\]`

Он обновляет все адаптеры (не js-controller), если они доступны с более новой версией в указанном репозитории. Если ссылка на репозиторий не указана, будет использоваться настроенный репозиторий.

Использование:

- `iobroker upgrade` - обновить все адаптеры.
- `iobroker upgrade https://raw.githubusercontent.com/ioBroker/ioBroker.js-controller/master/conf/sources-dist.json` - обновить все адаптеры из онлайн-репозитория

## Iobroker обновить себя
Полный синтаксис: `iobroker upgrade self \[repository url\]`

Эта команда обновляет ioBroker.js-controller до версии, которая будет найдена в репозитории.

**Примечание:** Если указанный или настроенный репозиторий имеет более низкую версию, он будет понижен до этой версии.

- `iobroker upgrade self` - обновить js-controller до версии в настроенном репозитории.
- `iobroker upgrade self https://raw.githubusercontent.com/ioBroker/ioBroker.js-controller/master/conf/sources-dist.json` - обновить js-controller до версии из онлайн-репозитория.

## Iobroker обновить адаптер Имя
Полный синтаксис: `iobroker upgrade adapterName \[repository url\]`

Эта команда обновляет указанный адаптер до версии, которая будет найдена в репозитории.

**Примечание:** Если указанный или настроенный репозиторий имеет более низкую версию, он будет понижен до этой версии.

- `iobroker upgrade email` - обновить адаптер `ioBroker.email` до версии в настроенном репозитории.
- `iobroker upgrade email https://raw.githubusercontent.com/ioBroker/ioBroker.js-controller/master/conf/sources-dist.json` - обновить адаптер `ioBroker.email` до версии из онлайн-репозитория.

## Iobroker nodejs-обновление
Эта команда обновляет Node.js до версии, которая будет найдена в репозитории.

- `iobroker nodejs-update` - обновить Node.js до версии в настроенном репозитории.

## Объект iobroker получить
Полный синтаксис: `iobroker get objectId`

Команда считывает из командной строки описание объекта: C:\pWork>iobroker object get system.adapter.admin.0.uptime

```
>./iobroker object get system.adapter.admin.0.uptime
{
  "_id":"system.adapter.admin.0.uptime",
  "type":"state",
  "common":{"name":"admin.0.uptime","type":"number","role":"indicator.state","unit":"seconds"},
  "native":{}
}
```

**Примечание:** Обычно выходные данные не форматируются, но вы можете использовать флаг `--pretty` для их форматирования.

## Объект iobroker chmod
Формат: `iobroker object chmod <object-mode> [state-mode] <id>`

Идентификатор может быть шаблоном с '\*'. '\*' может быть только в конце шаблона.

## Объект iobroker chown
Формат: `iobroker object chown <user> <group> <id>`

Идентификатор может быть шаблоном с '\*'. '\*' может быть только в конце шаблона.

## Список объектов iobroker
Формат: `iobroker object list <id>`

Перечислите разрешения объектов, например:

```
>iobroker object list system.adapter.admin.*

ObjectAC | StateAC |     User     |     Group    | ID
---------+---------+--------------+--------------+--------------
rw-r--r-- rw-r--r--          admin  administrator system.adapter.admin.0.uptime
rw-r--r-- rw-r--r--          admin  administrator system.adapter.admin.0.memRss
rw-r--r-- rw-r--r--          admin  administrator system.adapter.admin.0.memHeapTotal
rw-r--r-- rw-r--r--          admin  administrator system.adapter.admin.0.memHeapUsed
rw-r--r-- rw-r--r--          admin  administrator system.adapter.admin.0.connected
rw-r--r-- rw-r--r--          admin  administrator system.adapter.admin.0.alive
rw-r--r--                    admin  administrator system.adapter.admin.0
```

Идентификатор может быть шаблоном с '\*'. '\*' может быть только в конце шаблона.

## Набор iobroker
Полный синтаксис: `iobroker set <instance> [--port value] [--enabled true|false] [--ip address] [--auth true|false] [--secure true|false] [—-ttl value]` Используется для изменения настроек экземпляра из консоли. Могут быть изменены следующие настройки:

- `port` - изменить порт, к которому привязан экземпляр
- `enabled` - включить/отключить экземпляр (можно также с помощью `iobroker start|stop <instance>`)
- `ip` - изменить привязанный IP-адрес
- `auth` - включить или отключить аутентификацию
- `secure` - включить или выключить протокол SSL
- `ttl` - время ожидания входа в систему в секундах

## Iobroker состояние получить
Полный синтаксис: `iobroker state get stateId` Чтение значения JSON состояния:

```
>./iobroker state get system.adapter.admin.0.uptime
{"val":496,"ack":true,"ts":1425925626,"from":"system.adapter.admin.0","lc":1425925626}
```

Для форматирования вывода можно использовать флаг «--pretty»:

```
>./iobroker state get system.adapter.admin.0.uptime --pretty
{
  "val": 496,
  "ack": true,
  "ts": 1425925626,
  "from": "system.adapter.admin.0",
  "lc": 1425925626
}
```

## Состояние iobroker getplain
Полный синтаксис: `iobroker state getplain stateId`

Прочитайте простое значение состояния в виде списка атрибутов:

```
>./iobroker state getplain system.adapter.admin.0.uptime
571
true
system.adapter.admin.0
1425925701
1425925701
```

## Состояние iobroker getvalue
Полный синтаксис: `iobroker state getvalue stateId`

Прочитайте простое значение состояния в виде списка атрибутов:

```
>./iobroker state getvalue system.adapter.admin.0.uptime
571
```

## Состояние iobroker установлено
Полный синтаксис: `iobroker state set stateId newValue ack`

Установите значение состояния. `ack` по умолчанию = `false`.

`>iobroker state set sayit.0.tts.text "Текст сказать"`

`>iobroker state set adapter.0.states.temperature 28.5 true`

Если идентификатор неверен, сообщение об ошибке не выводится.

## Состояние iobroker del
Полный синтаксис: `iobroker state del stateId`

Удалить государство.

## Сообщение iobroker
Полный синтаксис: `iobroker message adapter.instance command message`

Отправить сообщение указанному экземпляру адаптера или всем экземплярам адаптера, если экземпляр не задан.

## Iobroker чистый
Очищает все настройки ioBroker. **Вы не сможете восстановить настройки, если вызовете эту команду.**

```
>iobroker clean yes
Deleted 205 objects.
Restarting ioBroker...
```

## Резервное копирование iobroker
Резервное копирование настроек ioBroker в zip-файле. Резервные файлы будут созданы в каталоге `backups` и будут иметь имена: `2015_02_10-17_49_45_backupIoBroker.tar.gz` с текущей датой и временем.

**Примечание:** еще не закончено

## Восстановление iobroker
Полный синтаксис: `iobroker restore <backup name or path>` Если некоторые резервные копии были созданы с помощью команды `iobroker backup`, то их можно восстановить. Если вы вызовете restore без параметров, вы получите список доступных резервных копий.

```
/>iobroker restore
Please specify one of the backup names:
   2015_07_18-12_20_28_backupIoBroker.tar.gz or 2015_07_18-12_20_28 or 0
   2015_07_17-21_54_01_backupIoBroker.tar.gz or 2015_07_17-21_54_01 or 1
```

Вы можете вызвать `iobroker restore 0`, чтобы использовать последний файл резервной копии или какой-либо другой индекс.
Следующие команды одинаковы для данного примера:

- `iobroker восстановление 0`
- `iobroker 2015_07_18-12_20_28`
- `iobroker 2015_07_17-21_54_01_backupioBroker.tar.gz`
- `iobroker /opt/iobroker/backups/2015_07_17-21_54_01_backupioBroker.tar.gz`

Все адаптеры будут восстановлены как отключенные, за исключением `admin`. Чтобы включить все адаптеры одновременно, вы можете вызвать `iobroker start all`. Если некоторые адаптеры не загружены, вы можете вызвать "iobroker upload all", чтобы загрузить все файлы адаптера одновременно.

## Хост iobroker
Измените имя хоста в объектах.

Иногда при перемещении данных iobroker из одной системы в другую требуется изменить имя хоста. С помощью этой команды это можно выполнить.

Перед этим необходимо остановить ioBroker.

Чтобы изменить конкретное имя хоста в БД на текущее имя хоста, напишите `iobroker host oldHostName`.

Чтобы изменить имя любого хоста (это должна быть только однохостовая система, а не многохостовая), напишите `iobroker host this`.

## Набор хостов iobroker
Вы можете изменить имя хоста на какое-то конкретное (не имя компьютера). Для этого вы должны написать: `iobroker host set newHostName` для переименования с фактического имени компьютера или ранее указанного имени хоста.

## Удаление хоста iobroker
Чтобы удалить хост, просто напишите `iobroker host remove hostNameToRemove`. Пожалуйста, будьте осторожны с этим.

## Список iobroker
С помощью этой команды можно отображать различные типы объектов и состояний в ioBroker. Примеры:

- `iobroker list objects hm-rega.0` - показать все объекты экземпляра hm-rega.0
- `iobroker list states hm-rega.0` - показать все состояния экземпляра hm-rega.0
- `iobroker list files vis.0` - показать все файлы экземпляра vis.0
- `iobroker list instances` - показать все экземпляры
- `iobroker list adapters` - показать все адаптеры
- `iobroker list users` - показать всех пользователей
- `iobroker list groups` - показать все группы
- `iobroker list enums` - показать все перечисления
- `iobroker list hosts` - показать все хосты

Возможно использование кратких названий типов:

- `o` - объекты
- `s` - состояния
- `u` - пользователи
- `e` - перечисления
- `g` - группы
- `i` - экземпляры
- `f` - файлы
- `h` - хосты

Например, `iobroker l u` — список всех пользователей.

С помощью `list instances` вы можете использовать дополнительные фильтры:

- `enabled` - список всех включенных экземпляров
- `disabled` - список всех отключенных экземпляров
- `port` - список всех экземпляров с портом
- `ip` - список всех экземпляров, которые могут быть привязаны к некоторому IP
- `ssl` - список всех случаев, где можно включить SSL

Использование: `iobroker list instances --enabled` для вывода списка всех включенных экземпляров

или `iobroker l i --port` для вывода списка используемых портов.

## Iobroker adduser
Эта команда позволяет создать нового пользователя (по умолчанию в группе "administrator"). Группу можно определить в команде с параметром `--ingroup`. Если пароль не указан, его необходимо ввести с консоли.
Например, создайте пользователя "martin" в группе "user":

`iobroker adduser martin --group user`

Создать пользователя с паролем:

`iobroker adduser martin --group user --password 12345`

## Iobroker deluser
Чтобы удалить существующего пользователя, позвоните:

`iobroker deluser username`

Пользователи также будут автоматически удалены из всех групп. Пользователь `admin` не может быть удален.

## Пароль iobroker
Чтобы изменить пароль существующего пользователя, позвоните:

`iobroker passwd username`

Вам будет предложено ввести пароль и повторить пароль.
Если взаимодействие с консолью нежелательно, вызовите:

`iobroker passwd username --password newPassword`

## Iobroker chmod
Изменить режим файла.

## Iobroker чаун
Изменить владельца файла.

## Файл iobroker прочитан
Прочитать файл из БД и сохранить его в локальной файловой системе.
Использование: `iobroker file read <fileToRead> [storeFile]` storeFile необязателен, но может быть путем к каталогу или к новому файлу.

Пример: `iobroker file read /vis.0/main/img/picture.png /opt/myfile.png`

`file` и `read` можно сократить до `f r`.

## Запись файла iobroker
Записать файл из локальной файловой системы в БД.
Использование: `iobroker file write <fileToRead> <storeFile>` storeFile может быть путем к каталогу в БД или может быть полным именем

Пример: `iobroker file write /opt/myfile.png /vis.0/main/img/picture.png`

`file` и `write` можно сократить до `f w`.

## Версия iobroker
Покажите версию адаптера или js-контроллера.

Версия js-контроллера:

```
>iobroker version
0.11.2
>iobroker -v
0.11.2
>iobroker --version
0.11.2
```

Версия адаптера администратора:

```
>iobroker version admin
1.5.4
>iobroker admin -v
1.5.4
>iobroker admin --version
1.5.4
```

## Iobroker uuid
Показать UUID этой установки ioBroker.

```
>iobroker uuid
8f73s7c9-2fd6-3066-189a-cccccccccc
```

## Статус iobroker
Работает ioBroker или нет.

## Репозиторий iobroker
Показать настроенные репозитории или выбрать один.

```
C:\ioBroker>ioBroker repo
default: conf/sources-dist.json
online: https://raw.githubusercontent.com/ioBroker/ioBroker.js-controller/master/conf/sources-dist.json
fast: http://download.iobroker.net/sources-dist.json

Active repo: fast
```

```
C:\ioBroker>ioBroker repo default
default: conf/sources-dist.json
online: https://raw.githubusercontent.com/ioBroker/ioBroker.js-controller/master/conf/sources-dist.json
fast: http://download.iobroker.net/sources-dist.json

Active repo: default
```

## Информация о iobroker
Соберите информацию об этом хосте.

```
Platform       : Windows
Architecture   : x64
CPUs           : 4
Speed          : 2496 MHz
Model          : Intel(R) Core(TM) i7-7660U CPU @ 2.50GHz
RAM            : 15.9 GB
System uptime  : 13d. 13:18:04
Node.js        : v8.11.1
adapters count : 176
Disk size      : 949.9 GiB
Disk free      : 813.3 GiB
NPM            : v5.8.0
```

## Iobroker компактный статус
Отображает состояние компактного режима для текущего хоста.

`Compact mode for this host is currently enabled`

## Iobroker compact [включить|отключить|вкл|выкл]
Позволяет включить или отключить компактный режим для текущего хоста. Сначала выводится текущий статус, а затем внесенные изменения.

```
Compact mode for this host is currently disabled

Compact mode for this host changed to enabled
```

Folgende Befehle sind möglich:

- `enable/on` - активировать Compact-Modus для ioBroker
- `disable/off` - деактивировать Compact-Modus для ioBroker

## Iobroker compact имя_адаптера.экземпляр
Эта команда позволяет проверить и изменить конфигурацию компактного режима экземпляра адаптера.
Все настройки (см. статус) всегда отображаются, включая внесенные изменения.

Все изменения можно вносить и во время работы ioBroker. Экземпляры адаптера можно перезапускать.

Доступны следующие комбинации:

### Компактный адаптерИмя.статус экземпляра
Отображение текущего состояния и текущих настроек экземпляра.

```
Compact mode supported: true
Compact mode enabled:   true
Compact group:          0
```

Значение полей:

* Поддерживается компактный режим: адаптер обычно поддерживает компактный режим.
* Компактный режим включен: этот экземпляр запускается в компактном режиме.
* Компактная группа: экземпляр запускается в компактной группе, как указано. 0 означает «в основном процессе контроллера js этого хоста» (более высокий риск, требуется меньше оперативной памяти). > 0 означает отдельный процесс хоста (меньше риска, но требуется немного больше оперативной памяти)

### Компактный адаптерИмя.instance группа &lt;group-id&gt;
Устанавливает компактную группу режимов экземпляра

```
Compact mode supported: true
Compact mode enabled:   true
Compact group:          0 --> 1
Instance settings for "simple-api.0" are changed.
```

### Компактный адаптерИмя.экземпляр &lt;disable|off&gt;
Отключает компактный режим для экземпляра.

```
Compact mode supported: true
Compact mode enabled:   true --> false
Compact group:          1
Instance settings for "simple-api.0" are changed.
```

### Compact adapterName.instance group &lt;enable|on&gt; [group-id]
Активирует компактный режим для экземпляра и (опционально) устанавливает группу в том же вызове:

```
Compact mode supported: true
Compact mode enabled:   false --> true
Compact group:          0 --> 1
Instance settings for "simple-api.0" are changed.
```

## Iobroker сертификат создать
Генерирует новый SSL-сертификат для установки ioBroker, вводит его в систему как стандартный сертификат и также выпускает его.

```
-----BEGIN RSA PRIVATE KEY-----
...
-----END RSA PRIVATE KEY-----

-----BEGIN CERTIFICATE-----
...
-----END CERTIFICATE-----

The object "system.certificates" was updated successfully.
```

## Логи iobroker
Покажите последние строки и просмотрите журнал ioBroker.

Эта команда показывает последние 1000 строк журнала и отслеживает журнал:

`iobroker logs --lines 1000`

Для мониторинга журнала добавьте `--watch`, как здесь:

`iobroker logs --lines 100 --watch`