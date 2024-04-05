---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.wireguard/README.md
title: ioBroker.wireguard
hash: qzKZPX9Ht7Wbi3ls/shTj3Gu3kXoErGSeNknoa233rY=
---
![Логотип](../../../en/adapterref/iobroker.wireguard/admin/Logo_of_WireGuard.svg)

![НПМ-версия](https://img.shields.io/npm/v/iobroker.wireguard.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.wireguard.svg)
![Количество установок](https://iobroker.live/badges/wireguard-installed.svg)
![Текущая версия в стабильном репозитории.](https://iobroker.live/badges/wireguard-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.wireguard.png?downloads=true)

# IoBroker.wireguard
![Логотип](../../../en/adapterref/iobroker.wireguard/admin/wireguard.svg)

![Тестирование и выпуск](https://github.com/grizzelbee/ioBroker.wireguard/workflows/Test%20and%20Release/badge.svg) ![КодQL](https://github.com/Grizzelbee/ioBroker.wireguard/actions/workflows/codeQL.yml/badge.svg)

## Адаптер Wireguard для ioBroker
Подключайтесь к хостам WireGuard и получайте информацию о соединениях на узлах. Этот адаптер предназначен для мониторинга ваших хостов WireGuard. Он также поддерживает простые установки и докер.

&gt; Если вам нравится этот адаптер и вы поддержите меня<br/> &gt; [![Пожертвовать через PayPal](admin/paypal-donate-button.png)](https://www.paypal.com/donate/?hosted_button_id=SPUDTXGNG2MYG)

## Предварительные условия
* запуск ssh-сервера на каждом хосте для мониторинга
* Исполняемый файл wg (wg.exe в Windows) должен находиться в пути поиска.
* имя пользователя и пароль пользователя с разрешением на выполнение команды wg

## Этапы установки
* Проверьте, работает ли на вашем хосте WireGuard ssh-сервер. Если нет - установите. Если вы можете открыть командную строку с помощью putty (или чего-то подобного), значит, вы используете ssh-сервер.
* убедитесь, что пользователь, которого вы хотите использовать для этого, может выполнить `wg` (то же самое для Windows и Linux). **Этому пользователю необходимы права администратора!**
* Подводя итог тесту: откройте удаленную командную строку, войдите в систему и выполните команду `wg show`. Если вы получили правильный результат, все готово и вы можете использовать эти данные для запуска адаптера.
* Сделайте это для каждого хоста, который вы хотите отслеживать.
* Установите адаптер и настройте его

## Параметры конфигурации
Поскольку WireGuard внутри использует только открытые ключи для идентификации узлов, но их довольно неудобно читать и распознавать людьми, была добавлена страница перевода. Не стесняйтесь добавлять к нему открытые ключи и имена, чтобы имена были интегрированы в дерево объектов.

* Главная страница
  - Имя: просто символическое имя хоста, поскольку оно удобнее и лучше запоминается, чем IP-адрес.
  - Адрес хоста: IP-адрес хоста. Имя fqdn или DNS также подойдет. Если вы используете WireGuard и ioBroker на одном хосте, вы можете просто использовать «localhost» в качестве IP.
  - Порт: номер порта вашего ssh-сервера. По умолчанию: 22
  - Пользователь: пользователь, который выполняет сценарий на хосте (будет храниться в зашифрованном виде).
  - Пароль: пароль для этого пользователя (будет храниться в зашифрованном виде).
  - sudo: должна ли команда wg выполняться с использованием sudo или нет (требуется действительная конфигурация sudoers! -> см. [советы по безопасности])
  - Docker: выполняет команду docker exec для доступа к серверу Wireguard внутри контейнера Docker. Пожалуйста, проверьте, соответствует ли он вашим потребностям или можете ли вы переключиться на поддерживаемый контейнер.
  - интервал опроса: пауза между каждым опросом в секундах (также будет задерживать первый запуск после запуска адаптера)
  - Контейнер: имя вашего докер-контейнера. Часто «wireguard», но может отличаться, особенно при запуске более одного на одном сервере.
* Страница перевода
    - Открытый ключ: открытый ключ одного из ваших коллег.
    - имя группы: символическое имя для этого узла.
* Страница конфигурационных файлов
  - Имя: должно быть таким же, как на главной странице.
  - Интерфейс: имя интерфейса, хранящееся в этом файле конфигурации (wg0, wg1, ...).
  - файл конфигурации: полный путь и имя файла конфигурации для этого интерфейса (/etc/wireguard/wg0.conf, ...)

### Выполнение командной строки зависит от установленных флажков:
* Флажок не установлен: будет выполнен `wg show all dump` (для пользователей с правами root и использования SetUID-Bit)
* Флажок Sudo установлен: `sudo wg show all dump` будет выполнен (работает с правильной строкой sudoers)
* Флажок Docker установлен: `docker exec -it Wireguard /usr/bin/wg show all dump` будет выполнен
* Флажки Sudo и Docker отмечены: `sudo docker exec -it Wireguard /usr/bin/wg show all dump` будет выполнен

> Если вы используете WireGuard в Docker-контейнере, я предполагаю, что вы достаточно знакомы как с технологиями, так и с концепциями безопасности, чтобы настроить вашу систему для выполнения показанных команд без запроса пароля.

### Докер
По сути, все сказанное об обычных установках применимо и к докеру и работает таким же образом.
За исключением необходимых флажков для выполнения правильной команды и необходимой строки sudoers. Если вы используете WireGuard внутри Docker-контейнера, вам могут понадобиться строки sudoers, подобные этой:

```
<wg-monitoring-user> ALL=NOPASSWD:/usr/bin/docker exec -it wireguard /usr/bin/wg show all dump
<wg-monitoring-user> ALL=NOPASSWD:/usr/bin/docker exec -it wireguard /usr/bin/wg set * peer * remove
<wg-monitoring-user> ALL=NOPASSWD:/usr/bin/docker exec -it wireguard /usr/bin/wg set * peer * allowed-ips *
<wg-monitoring-user> ALL=NOPASSWD:/usr/bin/docker exec -it wireguard /usr/bin/wg syncconf * *
```

Этот адаптер ожидает имя `wireguard` для вашего контейнера WireGuard и команду `wg` в `/usr/bin/` внутри контейнера.
Эти значения в настоящее время нельзя настроить.

## Как это работает
* info.connection адаптера используется для указания того, что хотя бы один интерфейс WireGuard находится в сети, о чем сообщает `wg show all`. Если интерфейс Wireguard не подключен к сети — ничего не сообщается. В этом случае регистрируется ошибка и светофор адаптеров загорается желтым.
* Этот адаптер открывает оболочку ssh на каждом настроенном хосте, выполняет команду `wg show all dump`, удаляет оболочку и анализирует результат.
* Поскольку каждый открытый ключ уникален, адаптер использует их для преобразования открытого ключа в удобные для пользователя, читаемые и узнаваемые имена.
* К сожалению, WireGuard сам по себе не обеспечивает состояние «подключено». Он предоставляет только информацию о последнем рукопожатии.

Поскольку рукопожатия обычно происходят каждые 120 секунд, этот адаптер вычисляет состояние подключения таким образом, что предполагает, что одноранговый узел подключен, когда последнее рукопожатие получено менее чем за 130 секунд до этого.

## Советы по безопасности
> Я настоятельно рекомендую использовать sudoers под Linux!

Эти советы по безопасности в основном основаны на Linux, поскольку его система безопасности более сложна, чем система Windows. На сервере Windows вам просто нужно будет использовать пользователя с правами администратора.
Поскольку команда `wg` (которая выполняется для получения состояния WireGuard) требует административных разрешений, хорошо подумайте, что вы здесь делаете и как вы настраиваете пользователя, которого помещаете в конфигурацию.
Чтобы защитить эти учетные данные как можно лучше, имя пользователя и пароль шифруются.

В основном существует три способа выполнения команды:

* используйте пользователя с правами администратора (root или аналогичный). Это будет работать, но откроет весь ваш сервер на случай, если учетные данные будут потеряны/украдены.
* использование SetUID-Bit: установив этот бит (насколько я понял), каждому пользователю разрешается запускать помеченный файл с правами администратора без необходимости ввода пароля. **Сюда входят хакеры**. Таким образом, установка этого бита в команде wg раскрывает всю команду wg со всей ее мощью. Если вы хотите это сделать, выполните `chmod u+s /usr/bin/wg` от имени администратора.
* использование sudoers: с моей точки зрения, наиболее безопасный способ — создать нового простого пользователя с базовыми привилегиями и добавить в файл sudoers простую строку, которая позволит этому пользователю выполнить необходимую команду без ввода пароля — и ТОЛЬКО ЭТО. команда. Пожалуйста, обратитесь к документации вашего дистрибутива для получения необходимой информации о редактировании файла sudoers и использовании visudo. На скриншоте ниже показано, что необходимо добавить в файл. `wireguard-monitoring-user` — пользователь по вашему выбору. Остальное должно быть именно так, как вы видите.

```
#iobroker.wireguard adapter
wireguard-monitoring-user ALL=NOPASSWD:/usr/bin/wg show all dump
wireguard-monitoring-user ALL=NOPASSWD:/usr/bin/wg set * peer * remove
wireguard-monitoring-user ALL=NOPASSWD:/usr/bin/wg set * peer * allowed-ips *
wireguard-monitoring-user ALL=NOPASSWD:/usr/bin/wg syncconf * *
```

Этот параметр позволяет `<wireguard-monitoring-user>` на хостах `ALL` выполнять команду `wg show all dump` из каталога `/usr/bin/` (возможно, потребуется изменить его в вашем дистрибутиве) без необходимости ввода пароля (§§ SSSSS_4§§).
![Изображение](../../../en/adapterref/iobroker.wireguard/admin/sudoers_config.png)

## Известные вопросы
* никто

##sentry.io
Этот адаптер использует sendry.io для сбора подробностей о сбоях и автоматического сообщения об этом автору.
Для этого используется [Плагин ioBroker.sentry](https://github.com/ioBroker/plugin-sentry). Пожалуйста, обратитесь к [домашняя страница плагина](https://github.com/ioBroker/plugin-sentry) для получения подробной информации о том, что делает плагин, какая информация собирается и как его отключить, если вы не хотите поддерживать автора своей информацией о сбоях.

### Отказ от ответственности
Этот проект никак не связан с WireGuard. Название WireGuard и логотип WireGuard используются только для обозначения этого проекта и являются собственностью их владельцев. Они не являются частью этого проекта.

## Авторские права
Авторские права (c) Grizzelbee, 2024 г. <open.source@hingsen.de>

## Changelog
### **WORK IN PROGRESS**

### 1.6.2 (2024-03-26)
* (grizzelbee) Upd: Dependencies got updated
* (grizzelbee) Fix: fixed sentry issues WIREGUARD-2B & WIREGUARD-2C
* (grizzelbee) Upd: Adapter requires at least node 18.x

### 1.6.1 (2023-09-14)
* (mcm1957) Fix: [#90](https://github.com/Grizzelbee/ioBroker.wireguard/pull/90) adapter-core 3.x.x is known to fail during installation at node 14 as npm 6 fails to install peerDependencies. So this adapter requires node 16 or newer
* (grizzelbee) Upd: Dependencies got updated
* (grizzelbee) Upd: removed some old news entries in io-package file

### 1.5.11 (2023-08-30)
* (grizzelbee) Fix: [#88](https://github.com/Grizzelbee/ioBroker.wireguard/issues/88) Avoid warning: Cannot read properties of undefined (reading 'at') when user- or devicename is empty

### 1.5.10 (2023-08-17)
* (grizzelbee) Fix: Adapter doesn't crash anymore when user or device name is missing in config.

### 1.5.9 (2023-08-12)
* (grizzelbee) Fix: First device of any user was missing in users viewing
* (grizzelbee) New: Added an icon to peers, users, peer and user

### 1.5.8 (2023-08-11)
* (grizzelbee) Fix: Interface is now correctly set to offline if host is not reachable. 

### 1.5.7 (2023-08-10)
* (grizzelbee) Fix: Added missing icon file
* (grizzelbee) Fix: Some fixes to make iobroker.adapterchecker happy
* (grizzelbee) Fix: Another icon fix

### 1.5.2 (2023-08-09)
* (grizzelbee) Fix: Adapter does not crash anymore when host isn't reachable
* (grizzelbee) Fix: Added .releaseconfig file 
* (grizzelbee) Fix: Added icon to interface-device
* (grizzelbee) Fix: Some fixes to make iobroker.adapterchecker happy

### 1.5.1 (2023-08-08)
* (grizzelbee) Fix: [#65](https://github.com/Grizzelbee/ioBroker.wireguard/issues/65) No names in object tree
* (grizzelbee) Fix: [#64](https://github.com/Grizzelbee/ioBroker.wireguard/issues/64) Online state of interface isn't set correctly if more than one server is queried
* (grizzelbee) Upd: Dependencies got updated

### 1.5.0 (2023-06-27)
* (grizzelbee) Deprecated: The current peer name/description will be dropped in one of the next versions. So please move over to Username/Device config.
* (grizzelbee) New: Splitted Peer names in config in user and device names; So that you are able to group devices by user
* (grizzelbee) New: Some new data fields: connectedPeers, connectedPeersCount, connectedUsers, connectedUsersCount and connection states per user
* (grizzelbee) Fix:  [#61](https://github.com/Grizzelbee/ioBroker.wireguard/issues/61) Fixed continuous recreation of objects
* (grizzelbee) Upd: Dependencies got updated
* (grizzelbee) Upd: Dropped support for NodeJS 12
* (grizzelbee) Upd: Added support for NodeJS 18

### 1.4.1 (2022-10-26)
* (grizzelbee) New: Showing number of currently connected peers for each interface

### 1.4.0 (2022-09-09)
* (grizzelbee) New: [#37](https://github.com/Grizzelbee/ioBroker.wireguard/issues/37) Added config options for port and docker container name
* (grizzelbee) Chg: Moved over to new jsonConfig Admin UI

### 1.3.2 (2022-09-07)
* (grizzelbee) New: [#38](https://github.com/Grizzelbee/ioBroker.wireguard/issues/38) Fixed "Adapter doesn't come online" bug caused by pseudo-tty settings 

### 1.3.1 (2022-06-26)
* (grizzelbee) New: [#33](https://github.com/Grizzelbee/ioBroker.wireguard/issues/33) Added button to resume a single peer

### 1.3.0 (2022-06-25)
* (grizzelbee) New: [#33](https://github.com/Grizzelbee/ioBroker.wireguard/issues/33) Added buttons to suspend single and restore all peers of an interface
* (grizzelbee) Chg: Changed polling log entry from info to debug 
* (grizzelbee) Upd: dependencies got updated

### 1.2.1 (2022-04-24)
* (grizzelbee) Fixed: [#20](https://github.com/Grizzelbee/ioBroker.wireguard/issues/20) Fixed a bug in tty linking which prevented docker option to work.

### 1.2.0 (2022-04-21)
* (grizzelbee) New: [#20](https://github.com/Grizzelbee/ioBroker.wireguard/issues/20) Added support for WireGuard inside a docker container

### 1.1.3 (2022-03-31)
* (grizzelbee) New: Fixed sentry error [WIREGUARD-1](https://sentry.io/organizations/grizzelbee/issues/3027754005/events/?project=6215712)
* (grizzelbee) New: Fixed sentry error [WIREGUARD-H](https://sentry.io/organizations/grizzelbee/issues/3129951381/events/?project=6215712)
* (grizzelbee) New: Fixed sentry error [WIREGUARD-C](https://sentry.io/organizations/grizzelbee/issues/3036902024/events/?project=6215712)
* (grizzelbee) Upd: dependencies got updated

### 1.1.2 (2022-03-17)
* (grizzelbee) New: Added donate button
* (grizzelbee) Upd: dependency update

### 1.1.1 (2022-03-13)
* (grizzelbee) Upd: Changed titleLang from WireGuard to WireGuard monitoring
* (grizzelbee) Upd: dependency update

### 1.1.0 (2022-03-06)
* (grizzelbee) New: Added support for sudo when using a proper sudoers rule
* (grizzelbee) Upd: Documentation update regarding security
* (grizzelbee) Upd: dependency update

### 1.0.0 (2022-02-25)
* (grizzelbee) New: Added individual online state indicator for each interface
* (grizzelbee) fix: Improved some data roles
* (grizzelbee) fix: Improved documentation

### v0.9.5 (2022-02-22)
* (grizzelbee) New: dropped use of wg-json script - not needed anymore
* (grizzelbee) New: making internal use of wg show all dump command and self parsing the result
* (grizzelbee) New: Added windows support by using the wg show all command
* (grizzelbee) Upd: moved dependency **admin** to globalDependency as requested during adapter review

### v0.9.2 (2022-02-20)
* (grizzelbee) Fix: removed unnecessary secret from index_m.html file
* (grizzelbee) Fix: Using info.connection of adapter to indicate that at least one interface is online.
* (grizzelbee) Fix: Updated adapter icon

### v0.9.1 (2022-02-19)
* (grizzelbee) New: Improved optical quality of admin page - no technical improvements

### v0.9.0 (2022-02-18)
* (grizzelbee) New: Improved documentation
* (grizzelbee) New: Username and password for WireGuard hosts are getting encrypted now

### v0.8.0 (2022-02-17)
* (grizzelbee) New: admin extended with second page
* (grizzelbee) New: data file is getting parsed
* (grizzelbee) New: data tree is getting populated
* (grizzelbee) New: entire basic functionality is implemented
* (grizzelbee) New: added plugin sentry

### v0.2.0 (2022-02-16)
* (grizzelbee) New: admin is working as expected
* (grizzelbee) New: first steps in backend

### v0.1.0 (2022-02-14)
* (grizzelbee) working on admin

### v0.0.1
* (grizzelbee) initial release

## License
MIT License


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