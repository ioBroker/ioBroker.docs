---
chapters: {"pages":{"en/adapterref/iobroker.cloud/README.md":{"title":{"en":"ioBroker cloud adapter"},"content":"en/adapterref/iobroker.cloud/README.md"},"en/adapterref/iobroker.cloud/doc/ifttt.md":{"title":{"en":"How to use IFTTT with ioBroker"},"content":"en/adapterref/iobroker.cloud/doc/ifttt.md"},"en/adapterref/iobroker.cloud/doc/tasker.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.cloud/doc/tasker.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.cloud/README.md
title: облачный адаптер ioBroker
hash: O1e25HdQqdwUOxkcQgeXtotAsysHeauu4N30s+pBTlI=
---
![Логотип](../../../en/adapterref/iobroker.cloud/admin/cloud.png)

![Количество установок](http://iobroker.live/badges/cloud-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.cloud.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.cloud.svg)
![НПМ](https://nodei.co/npm/iobroker.cloud.png?downloads=true)

# облачный адаптер ioBroker

Этот адаптер позволяет подключаться из интернета через облако ioBroker к локальной установке ioBroker.

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках, см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

## Настройки

### КЛЮЧ ПРИЛОЖЕНИЯ

Для использования облачного адаптера сначала необходимо получить ключ приложения на [сайте https://iobroker.net](https://iobroker.net) .

Это ключ приложения, который пользователь может получить на сайте <https://iobroker.net> . Пожалуйста, получите ключ там и введите его здесь.

![Введение](../../../en/adapterref/iobroker.cloud/img/intro.png)

### Пример

Все запросы от облачного адаптера будут направляться на конкретный веб-экземпляр. Пользователь должен указать здесь веб-экземпляр; он будет показан пользователю при входе на сайт <https://iobroker.net> .

### Разрешить использование самоподписанных сертификатов

Если вы используете стандартное облако iobroker.net, вы можете его отключить. Эта опция важна только в том случае, если вы используете собственное облако.

### Настройки Alexa

_**Alexa не поддерживается в `cloud` Больше не нужен адаптер. Используйте для этого адаптер ioBroker.iot.**_

## IFTTT

[инструкции](/#/docs/adapterref/iobroker.cloud/doc/ifttt.md)

## Услуги

Есть возможность отправлять сообщения в облачный адаптер. Если вы позвоните... `[POST]https://iobroker.net/service/custom_<NAME>/<user-app-key>` и ценность в качестве полезной нагрузки.

```bash
curl --data "myString" https://iobroker.net/service/custom_test/<user-app-key>
```

Если в настройках в поле «Белый список для сервисов» указать имя _custom\_test_ и вызвать сервис, указав в качестве имени "custom\_test", то состояние `cloud.0.services.custom_test` будет установлено на `myString`.

Вы можете добавить символ "\*" в белый список, и все сервисы будут разрешены.

Начиная с версии 2.0.5, вы можете использовать GET-запросы в форме. `[GET]https://iobroker.net/service/custom_<NAME>/<user-app-key>/<data>` разместить `\<data\>` в `cloud.0.services.custom_\<NAME\>`.

Здесь вы найдете инструкции по использованию [Tasker](/#/docs/adapterref/iobroker.cloud/doc/tasker.md) .

Использование сервиса IFTTT разрешено только при наличии установленного ключа IFTTT.

Зарезервированные имена `ifttt`, `text2command`, `simpleApi`, `swagger` Их необходимо использовать без `"custom_"` префикс.

### текст2команда

Вы можете написать `text2command` В белом списке можно отправлять POST-запросы. `https://iobroker.net/service/text2command/<user-app-key>` записывать данные в `text2command.X.text` переменная.

Параметр "X" можно задать в настройках с помощью опции "Использовать экземпляр text2command".

### simpleApi

Вы можете использовать следующие команды (только в версии Pro):

- `[GET]https://iobroker.pro/service/simpleApi/<user-app-key>/get/stateID` - для чтения значения состояния =>`{"val":103.516,"ack":true,"ts":1604132484682,"q":0,"from":"system.adapter.admin.0","lc":1604132469672,"result":"OK"}`
- `[GET]https://iobroker.pro/service/simpleApi/<user-app-key>/getPlainValue/stateID` - для чтения значения состояния =>`103.641`
- `[GET]https://iobroker.pro/service/simpleApi/<user-app-key>/set/stateID?value=1` - установить значение состояния =>`{"result":"OK"}`

**Не забудьте добавить `simpleApi` к разрешенным службам в конфигурации.**

### Ограничения

Если на определенном веб-экземпляре включен HTTPS (безопасность) или аутентификация, это не будет работать.

Вы можете отключить HTTPS и аутентификацию на этом экземпляре веб-сайта, но лучше создать новый экземпляр веб-сайта, привязанный к... `localhost` и выберите этот экземпляр в настройках облака.

## Удалённая оболочка (SSH)

В версии **Pro** облако может выступать в качестве SSH-сервера, поэтому вы можете получить доступ к командной оболочке (или любой службе TCP) на этой машине из любой точки мира, авторизовавшись с помощью своего облачного адреса электронной почты и пароля. Внутреннее SSH-соединение между вашим клиентом и локальным сервером зашифровано сквозным шифрованием. `sshd` Таким образом, облако пересылает только байты.

Включите эту функцию в разделе **«Удалённая оболочка»** в настройках адаптера:

- **Включить удалённую оболочку** — по умолчанию отключено.
- **Разрешенные адреса** — таблица правил; адрес разрешен, если ему соответствует хотя бы одна строка. Это авторитетный список разрешенных адресов, облако не открывает ничего, что адаптер не разрешает. Каждая строка содержит:

  - **Хост** — отдельный IP-адрес или имя хоста (`127.0.0.1`, `localhost`), подстановочный знак (`192.168.*`), CIDR (`192.168.1.0/24`), или диапазон (`192.168.1.10-192.168.1.50`).
  - **Порты** — список и/или диапазоны (`22`, `22, 8081`, `8000-8100`), или пустой /`*` /`all` для любого порта.

  По умолчанию: `127.0.0.1` и `localhost` любой порт (только на этом устройстве). Таким образом, одна строка может открывать только SSH на устройстве ioBroker, в то время как другая открывает целую подсеть, например. `127.0.0.1 → 22` плюс `192.168.1.0/24 → *`.

Затем подключитесь (с помощью вашего собственного sshd, переместив его с порта 22) и `pi` являясь пользователем этого компьютера:

```bash
ssh -J <email>@iobroker.pro pi@localhost
```

`-L 8081:localhost:8081` туннелирует административный интерфейс. `scp` /`sftp` копирование файлов и так далее. UDP не передается (поэтому для KNXnet/IP по UDP требуется шлюз с поддержкой TCP или VPN).

При запуске адаптер проверяет, доступен ли SSH-сервер. `127.0.0.1:22` и публикует результат в штат&#x435;** `info.sshAvailable` ** На странице настроек это состояние отображается в режиме реального времени: если SSH-сервер не найден (или учетная запись не является профессиональной), отображается подсказка, и **настройки удаленной оболочки полностью скрываются** , поэтому они появляются только тогда, когда их включение позволяет фактически получить доступ к оболочке.

## Android-приложение

В новом приложении для Android изменено расположение переменных, отвечающих за яркость и местоположение.

Теперь их можно было найти в `cloud.X.devices.NAME`:

- `cloud.X.devices.NAME.brightness`
- `cloud.X.devices.NAME.currentLocation`.
- `cloud.X.devices.NAME.batteryLevel`
- `cloud.X.devices.NAME.batteryState`.

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### 6.2.5 (2026-09-24)
* (@GermanBluefox) A POST body that arrives as a buffer is decoded instead of stringified, so the telemetry of the visu apps is no longer lost on its way through the cloud
* (@GermanBluefox) An empty body for a reported value, and a command without `deviceName`/`name`, are logged instead of being dropped silently

### 6.2.4 (2026-09-21)
* (@GermanBluefox) Updated packages

### 6.2.1 (2026-09-17)
* (@GermanBluefox) Updated packages
* (@GermanBluefox) Clear subscriptions on cloud disconnection

### 6.1.3 (2026-08-26)
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Migrated blockly to TypeScript

### 6.1.2 (2026-06-13)
* (@GermanBluefox) Added support of credentials manager

## License
The MIT License (MIT)

Copyright (c) 2016-2026 bluefox <dogafox@gmail.com>

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