---
BADGE-npm version: https://img.shields.io/npm/v/iobroker.dl-manager
BADGE-stable: https://iobroker.live/badges/dl-manager-stable.svg
BADGE-Installations: https://iobroker.live/badges/dl-manager-installed.svg
BADGE-npm downloads: https://img.shields.io/npm/dt/iobroker.dl-manager
BADGE-Test and Release: https://github.com/krobipd/ioBroker.dl-manager/actions/workflows/test-and-release.yml/badge.svg
BADGE-Node: https://img.shields.io/badge/node-%3E%3D22-brightgreen
BADGE-TypeScript: https://img.shields.io/badge/TypeScript-strict-blue
BADGE-License: https://img.shields.io/badge/license-MIT-green
BADGE-Sentry: https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white
BADGE-Ko-fi: https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi
BADGE-PayPal: https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge
chapters: {"pages":{"de/adapterref/iobroker.dl-manager/README.md":{"title":{"de":"ioBroker.dl-manager — Benutzerdokumentation"},"content":"de/adapterref/iobroker.dl-manager/README.md"},"de/adapterref/iobroker.dl-manager/datapoints.md":{"title":{"de":"Datenpunkte"},"content":"de/adapterref/iobroker.dl-manager/datapoints.md"},"de/adapterref/iobroker.dl-manager/faq.md":{"title":{"de":"Häufige Fragen"},"content":"de/adapterref/iobroker.dl-manager/faq.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.dl-manager/README.md
title: ioBroker.dl-manager - Пользовательская документация
hash: vBG8ZWQ+wAKlSaaOsEPdLb2rVn5a1od/tCTUD/crtd8=
---
# ioBroker.dl-manager — Пользовательская документация

Адаптер подключает ioBroker к вашим программам для загрузки. Каждая добавленная вами программа становится устройством, а каждая из её загрузок — каналом со своими собственными точками данных. Всё, что отображает адаптер, поступает от самой программы; адаптер никогда ничего не загружает сам и запрашивает у программы удаление файлов только в том случае, если переключатель _«Удалять файлы при удалении»_ это указывает.

## Поддерживаемые программы

| программа                        | Доступ                                                         | Что вам нужно                                                                                                                                                                                                                                                        |
| -------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| JDownloader 2 (локальная версия) | локальный интерфейс, порт 3128                                 | В JDownloader: Настройки → Расширенные настройки →`DeprecatedApiEnabled` включено; если ioBroker работает на другом компьютере или в другом контейнере, дополнительно `DeprecatedApiLocalhostOnly` из                                                                 |
| JDownloader 2 (My.JDownloader)   | облако My.JDownloader                                          | Ваш адрес электронной почты и пароль My.JDownloader — выберите JDownloader в своей учетной записи.                                                                                                                                                                   |
| qBittorrent                      | Веб-интерфейс, порт 8080                                       | Имя пользователя и пароль для веб-интерфейса или ключ API (начиная с qBittorrent 5.2)                                                                                                                                                                                |
| передача инфекции                | RPC, порт 9091                                                 | Имя пользователя и пароль (если заданы); компьютер ioBroker должен быть подключен к `rpc-whitelist` разрешено                                                                                                                                                         |
| Потоп                            | Веб-интерфейс, порт 8112                                       | пароль для веб-интерфейса                                                                                                                                                                                                                                            |
| SABnzbd                          | API, порт 8080                                                 | Ключ API (Настройки → Общие)                                                                                                                                                                                                                                         |
| NZBGet                           | API, порт 6789                                                 | Имя пользователя и пароль для налоговых операций                                                                                                                                                                                                                     |
| aria2                            | JSON-RPC, порт 6800                                            | Секрет RPC (`--rpc-secret`)                                                                                                                                                                                                                                         |
| pyLoad                           | API, порт 8000                                                 | Ключ API (начиная с pyLoad 0.5.0b3.dev97) или имя пользователя и пароль.                                                                                                                                                                                             |
| rqbit                            | HTTP API, порт 3030                                            | Имя пользователя и пароль только при использовании rqbit. `RQBIT_HTTP_BASIC_AUTH_USERPASS` Программа запущена; rqbit отвечает только на 127.0.0.1, если только адрес не начинается с `--http-api-listen-addr 0.0.0.0:3030` (Это можно сделать с помощью образа Docker) |
| rTorrent                         | XML-RPC через веб-сервер, порт 8080, путь `/RPC2`               | Адрес веб-сервера, предшествующего rTorrent (nginx, lighttpd, образ rTorrent), и его HTTP-адрес для входа, если он требуется.                                                                                                                                        |
| Триблер                          | REST API, порт 20100                                           | Ключ API; фиксированный порт (`CORE_API_PORT` или `api.http_port` в племенах `configuration.json`) и `api.http_host` 0.0.0.0, если ioBroker запущен на другом компьютере.                                                                                              |
| Наводнение                       | REST API, порт 3000                                            | Пользователь, которого вы используете для входа в Flood, — это не логин торрент-программы, стоящей за ним; если Flood подключен, то это не ваш логин. `--auth none` бег                                                                                               |
| Вузе                             | Плагин Web Remote, порт 9091                                   | Имя пользователя и пароль плагина — как пользователь его устанавливает. `vuze` и код доступа для сопряжения                                                                                                                                                           |
| µTorrent                         | Веб-интерфейс, порт 8080 (µTorrent Server)                     | Имя пользователя и пароль для доступа к веб-интерфейсу (Настройки → Дополнительно → Доступ к веб-интерфейсу); компьютер ioBroker в списке разрешенных IP-адресов, если таковой существует.                                                                           |
| Хадукен                          | JSON-RPC, порт 7070, путь `/api`                                | Имя пользователя и пароль из `http.auth.basic` в `hadouken.json` — admin и admin, если ни один из них не указан                                                                                                                                                        |
| Станция загрузки                 | DSM Web API, порт 5000 (HTTPS 5001)                            | Для использования Download Station требуется учетная запись DSM с правом доступа и без двухфакторной аутентификации; только одна учетная запись, управляющая Download Station, может считывать и устанавливать лимит загрузки.                                       |
| NZBVortex                        | Сетевой API, HTTPS, порт 4321                                  | Настройки → Удаленный доступ → Веб-интерфейс и ключ API; адрес ioBroker в его белом списке IP-адресов, если он включен.                                                                                                                                              |
| Freebox                          | API операционной системы Freebox, HTTPS, `mafreebox.freebox.fr` | Ничего вводить не нужно: при сохранении карты адаптер запрашивает доступ у Freebox, а вы подтверждаете его на дисплее Freebox — из собственной сети Freebox.                                                                                                         |

**Что касается локального интерфейса JDownloader:** у него нет пароля. Любой пользователь сети, имеющий доступ к порту, может изменять настройки JDownloader или завершать его работу. Используйте его только в том случае, если JDownloader запущен на машине ioBroker или в той же сети Docker; в противном случае используйте My.JDownloader.

**Что касается NZBVortex:** он использует HTTPS со своим собственным самоподписанным сертификатом, который адаптер принимает без проверки. Если SSL отключен в NZBVortex, отключите также HTTPS на его сетевой карте.

**Что касается Freebox:** Пусть `mafreebox.freebox.fr` Сетевой адаптер проверяет сертификат Freebox на соответствие собственным корневым сертификатам, и это относится к имени, а не к IP-адресу устройства. При отключенном HTTPS Freebox отвечает через порт 80. Доступ, предоставленный Freebox, шифруется и хранится как пароль. Если у приложения _ioBroker dl-manager_ отсутствуют разрешения на загрузку, предоставьте их в Freebox OS (Настройки Freebox > Управление доступом > Приложения), а затем отключите и снова включите сетевой адаптер Freebox. Если вы удалили приложение с Freebox, установите флажок _«Переподключиться к Freebox»_ в диалоговом окне адаптера и подтвердите на экране.

## Обстановка

1. Установите адаптер и откройте настройки экземпляра. Программы отображаются в Диспетчере устройств в виде карточек; они видны, пока работает экземпляр.
2. Нажмите **+** , выберите программу. В диалоговом окне будет запрошена только необходимая для этой программы информация: имя, адрес и порт (пустое поле означает порт по умолчанию), а также логин. Для JDownloader выберите _«Локальный в сети»_ или _«Через My.JDownloader»_ ; в случае с My.JDownloader вы входите в систему и выбираете свой JDownloader из списка.
3. Применить. Программа немедленно отобразится в виде карты и устройства в меню. `dl-manager.0` — экземпляр не перезапускается. Имя — это всего лишь метка для карты и устройства. Идентификатор объекта назначается адаптером: программой и компьютером, на котором она запущена. `qbittorrent-nas`, `transmission-192-168-1-20`; в `localhost` имя хоста ioBroker), для My.JDownloader — последние четыре символа идентификатора, который учетная запись использует для этого JDownloader (`jdownloader-7f11` Второй программе на том же компьютере назначается свой порт, а затем счетчик. Идентификатор после этого никогда не меняется — ни с новым именем, ни с новым адресом, ни с переключением между локальной установкой и My.JDownloader — поэтому комнаты, функции и скрипты продолжают работать корректно. Подробная информация о них содержится на карточке.
4. Кнопка тестирования на карточке один раз запрашивает информацию у программы и отображает ее версию или причину недоступности.

Каждую программу можно добавлять неограниченное количество раз. Вторая запись для той же программы — с тем же адресом или тем же JDownloader из учетной записи My.JDownloader — будет отклонена. Переключатель на карте памяти отключает программу, не удаляя её устройство; удаление удаляет устройство, но никогда не файл. Программы находятся в `programs.json` в папке данных экземпляра (`iobroker-data/dl-manager.0/` (является частью каждой резервной копии ioBroker), а не находится в дереве объектов; пароли и ключи API шифруются с помощью секретного ключа установки.

## Что вы найдете в дереве объектов

- `info.*` — Сколько программ настроено и доступно.
- `summary.*` — по всем программам: активна ли какая-либо загрузка, общая скорость, переключатель, приостанавливающий работу всех программ; `summary.last.*` Последняя успешная и последняя неудачная загрузка (с отметками времени).
- `<programm>-<stück>.*` — Программа: доступность, причина, версия, скорость, ограничения, свободная память, кнопка паузы, поле ввода для новых ссылок, счетчик; `last.*` Ваша последняя завершенная/неудачная загрузка.
- `<programm>-<stück>.downloads.<download>.*` — Один канал для каждой загрузки с указанием статуса, хода выполнения, размера, скорости, оставшегося времени, ошибок и действий, предлагаемых программой (пауза, удаление, повторная проверка в некоторых программах, немедленный запуск или повторная попытка).

Список статусов одинаков для всех программ: ожидание, загрузка, не выполняется, приостановлено, проверяется, перерабатывается, перераспределяется, завершено, сбой.

## Какие файлы для скачивания находятся в дереве объектов?

Две настройки определяют, какие загрузки получат свой собственный канал. Программа всегда отслеживает все загрузки и их общее количество (`summary.*` счетчики программы и `last.finished`) всегда засчитывает каждое скачивание.

- **В дереве объектов доступны следующие параметры загрузки:** _Все_ (по умолчанию), _Исключить завершенные загрузки_ или _Только незавершенные загрузки (исключая завершенные и раздающие)_ — последний вариант также исключает распространяемые торренты. Неудачные загрузки всегда остаются; им нужна ваша помощь.
- **Максимальное количество загрузок на программу в дереве объектов:** по умолчанию 100, 0 = все. Если у программы больше загрузок, то сначала сохраняются каналы для выполняющихся загрузок, затем для неудачных, приостановленных и ожидающих загрузки, затем для загрузок в очереди, перераспределенных загрузок и завершенных загрузок — при этом приоритет отдается самым новым загрузкам в каждой группе. Загрузка, потерявшая свой канал, восстанавливает его, как только освобождается место.

Каждая загрузка создает до 15 объектов, значения которых могут меняться при каждом запросе. При количестве загрузок от 0 до более 200 на программу это быстро накапливается до тысяч; это создает нагрузку на базу данных ioBroker и замедляет работу дерева объектов в панели администратора. В этом случае на странице настроек отобразится предупреждение, а в журнале будет выдаваться предупреждение один раз для каждой программы, если в дереве объектов действительно окажется более 200 загрузок.

## Новая ссылка, пока программа приостановлена.

**Новая ссылка возобновляет приостановленную программу** (по умолчанию отключено) и определяет, что будет делать созданная вами ссылка. `add` Когда вы пишете программу, пока она приостановлена: Выкл.: Пауза остается активной для всех программ, и ссылка ожидает возобновления программы; JDownloader, который запускается автоматически при каждой новой ссылке, немедленно снова приостанавливается. Вкл.: Добавление ссылки сначала возобновляет программу; все ее загрузки продолжаются.

## Удалить загрузку

`remove` Во время загрузки программа удаляет файл из своего списка. Удаляет ли программа также загруженные файлы, если загрузка завершена, и загруженные данные, если она прервана или завершилась с ошибкой, определяется **переключателем «Удалять файлы при удалении», который** по умолчанию выключен. Этот переключатель находится на странице настроек всех программ; пока он выключен, карточка для каждой программы, которая может удалять файлы, имеет тот же переключатель, но только для этой программы, и пока он включен, все карточки следуют его действиям. Точки данных загрузки не учитываются — они контролируются настройками в разделе _«Удалять точки данных_ ».

Загрузка, которую программа не может удалить в соответствии с указанными параметрами, не имеет `remove` — он забирает его обратно, как только снова становится возможным его извлечение, например, когда он заканчивает или переключатель включен:

| программа               | Чего оно не может сделать                                                                                           |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------- |
| aria2, pyLoad, rTorrent | Удалите файлы — на их картах нет переключателя.                                                                     |
| SABnzbd                 | Удалить файлы после завершения загрузки; удалить загруженный файл во время его обработки.                           |
| NZBGet                  | Удалите файлы, загрузка которых завершилась успешно; сохраните файлы, загрузка которых не удалась или была удалена. |
| Станция загрузки        | Удалите файлы, загрузка которых завершилась; сохраните файлы, загруженные после завершения загрузки.                |

## Удаление точек данных

Если адаптер больше не предоставляет точку данных — загрузка исчезла из списка программ или из дерева настроек, или карточка программы была удалена — он удаляет её. Две настройки внизу страницы настроек определяют, что происходит с записанной вами точкой данных (история, SQL, InfluxDB):

- **Удаление точек данных при записи** (настройка по умолчанию): Включено — такая точка данных удаляется как любая другая. Выключено — она остается вместе с каналом и устройством выше, а в журнале отображается строка, указывающая, сколько точек данных было сохранено и какие экземпляры их записывают — пожалуйста, проверьте вручную.
- **Также удалять записанные данные** (по умолчанию отключено, отображается только при включении первой настройки): каждый экземпляр записи сначала удаляет записанные данные точки данных. Точка данных, данные которой экземпляр не удаляет, остается.

Перенос устройства на новый идентификатор не означает его удаление: переносятся его данные, а также их значения и записи.

## Обновление с версии 0.2

При первом запуске версии 0.3 программы перемещаются из настроек экземпляра в программную память адаптера (экземпляр перезапускается один раз), их пароли шифруются, и каждой программе присваивается новый идентификатор объекта. Каждое устройство перемещается вместе со своими значениями, пробелами, функциями и псевдонимами; история записи сохраняется под старым идентификатором. Программа My.JDownloader перемещается, как только учетная запись указывает свой идентификатор JDownloader (первое успешное подключение). В канал перемещаются самые последние завершенные и неудачные загрузки. `last`: `lastFinished` →`last.finished`, `lastFinishedTime` →`last.finishedTime`, `lastFailed` →`last.failed`, `lastFailedTime` →`last.failedTime` — в рамках каждой программы и в рамках `summary`.

Например, **корректировка старых идентификаторов в скриптах и визуальных модулях** . `dl-manager.0.jdownloader-cloud` →`dl-manager.0.jdownloader-7f11` и `dl-manager.0.summary.lastFinished` →`dl-manager.0.summary.last.finished` Не возвращайтесь к значению 0,2: в противном случае она больше не сможет найти свои программы.

## Более

- [Все точки данных по каждой программе.](/#/docs/adapterref/iobroker.dl-manager/datapoints.md)
- [Часто задаваемые вопросы](/#/docs/adapterref/iobroker.dl-manager/faq.md)

## Сообщение об ошибке

Сообщение об ошибке, отправляемое через Sentry, включено по умолчанию; что именно оно отправляет и как его отключить, описано в [разделе Sentry основного файла README](https://github.com/krobipd/ioBroker.dl-manager/blob/main/README.md#sentry--error-reporting) .

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- New: the switch "Also delete the files when removing" on the settings page and on the card of each program that can delete files, off by default
- Changed: a download has no remove datapoint while its program cannot remove it as the switch says
- Fixed: the debug log no longer shows a password or API key typed into a program's dialog
- Fixed: pausing all no longer stops halfway when a download ended meanwhile (rqbit, rTorrent, Tribler)
- Fixed: when the connection breaks off during pause all or resume all, the downloads already paused are resumed later
- Fixed: a link added during a pause is held on the next poll when its first hold did not reach the program
- Fixed: an rqbit 9 torrent paused during its check no longer ends the pause and shows as paused
- Fixed: with rqbit 8, adding a link whose files are already there during a pause no longer fails; it is paused after its check
- Fixed: Flood shows the infinite ratio of Deluge and qBittorrent instead of none
- Fixed: the log line of pause all names a program that refused apart from one that was not reachable
- Fixed: a script testing a connection gets the error as its answer when the test itself fails

### 0.5.0 (2026-11-19)

- New: rqbit can be added as a program
- New: rTorrent can be added as a program, through the web server in front of it
- New: Tribler can be added as a program
- New: Flood can be added as a program
- New: Vuze can be added as a program, through its Web Remote plugin
- New: µTorrent can be added as a program
- New: Hadouken can be added as a program
- New: Synology Download Station can be added as a program
- New: NZBVortex can be added as a program
- New: the downloads of a Freebox can be added as a program, paired once on the Freebox's display
- New: a setting lets a new link resume a paused program
- New: two settings decide whether a datapoint with a recording is deleted, and whether its recorded data goes too
- New: scripts can test a program's connection
- Fixed: the e-mail address of a My.JDownloader account no longer appears in the device object or an object export
- Fixed: a link added while downloads are paused now resumes together with them
- Fixed: aria2 shows seeding torrents and their ratio correctly
- Fixed: an infinite seed ratio shows ∞ instead of staying empty
- Fixed: size and time left stay empty while the program does not know them
- Fixed: NZBGet and pyLoad show their new version after an update
- Fixed: pyLoad shows a decrypting package as queued
- Fixed: pyLoad's speed limit keeps its value when pyLoad does not tell it, instead of emptying
- Fixed: a small speed, limit or size shows its value instead of 0
- Fixed: a program on an IPv6 address is reachable
- Fixed: the last finished and last failed download are named correctly
- Fixed: a finished SABnzbd job keeps its added time
- Fixed: a pressed button resets once the program took the command
- Fixed: the error shows the program's real problem
- Fixed: a programs.json without a program list stops the start instead of removing every device
- Fixed: the program dialog no longer stores invalid fields
- Fixed: the program dialog no longer overwrites changes made in another tab
- Fixed: an unreachable program keeps its last download values
- Fixed: an unexpected answer from a program no longer deletes its downloads
- Fixed: Deluge no longer stops as if its password were wrong
- Fixed: pause all is confirmed only once a program has paused
- Changed: every datapoint of a download starts with the download's name
- Changed: a busy or unreachable program is asked less often
- Changed: passwords and API keys use the platform's encryption; one that cannot be read stops the start instead of being emptied
- Changed: a start that cannot get going ends the adapter instead of running without function
- Changed: a poll interval that is no number ends the start with a notification in the admin instead of running at 10 s
- Improved: the adapter keeps every program's and My.JDownloader's request limit, also across a restart
- Improved: every datapoint has a short description
- Changed: requires js-controller 7.2.5 and admin 8.3.5

### 0.4.0 (2026-10-02)

- Fixed: saving a card while a second admin tab changed the programs could bring back a deleted card or undo a learned My.JDownloader connection
- Fixed: a switched-off program no longer blocks its address when you add the same program again
- Fixed: an updated JDownloader, qBittorrent or aria2 shows its new version without restarting the adapter
- Fixed: the details of a card open even when the program settings cannot be read
- Fixed: an empty entry in a Transmission or SABnzbd list no longer stops the query
- Fixed: a download added while JDownloader is paused no longer starts all its downloads again
- Changed: a card that cannot run shows what is wrong on the card; its `error` datapoint says `Unknown`
- Changed: a program that is down behind a reverse proxy counts as not reachable
- Changed: a new instance starts switched off until you set it up

### 0.3.2 (2026-09-30)

- Changed: your programs and their access data moved out of the object tree into a file of the instance, which every ioBroker backup includes — an object export no longer shows them

### 0.3.1 (2026-09-30)

- Changed: after adding, editing, switching or deleting a program on its card you now see at once whether it worked — the program answers, is not reachable, or is gone
- Fixed: the warning for a rejected login names what to check on the card and says so when the card holds no login at all, as with Transmission's login switch
- Changed: the query interval now starts at 10 seconds; a smaller value stored before keeps working and simply runs at 10 seconds from now on
- Fixed: when several programs answered at the same moment, the totals could briefly show an older speed or count

### 0.3.0 (2026-09-29)

- Fixed: saving a program card no longer hangs, and the settings page can no longer undo a change made on a card
- Changed: a change on a card applies at once without restarting the adapter; passwords are no longer kept in plain text
- Changed: device IDs follow the program and machine (My.JDownloader: its id) and never change; the name is a label
- Changed: the last finished and failed download moved into a `last` channel below each program and the summary
- Changed: the card shows the object ID in its details and has no pause switch; the `paused` datapoint stays
- Fixed: a JDownloader renamed in its own settings keeps its My.JDownloader connection

## License

MIT License

Copyright (c) 2026 krobi <krobi@power-dreams.com>

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

---

_Developed with assistance from Claude.ai_