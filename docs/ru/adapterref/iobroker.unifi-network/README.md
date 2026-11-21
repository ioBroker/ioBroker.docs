---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.unifi-network/README.md
title: ioBroker.unifi-network
hash: bm6V3SyL09+erkK6OpwVpHZAmZdJ/5pZsbmCF0BI8ng=
---
![Логотип](../../../en/adapterref/iobroker.unifi-network/admin/unifi-network.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.unifi-network.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.unifi-network.svg)
![Количество установок](https://iobroker.live/badges/unifi-network-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/unifi-network-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.unifi-network.png?downloads=true)
![Тестирование и выпуск](https://github.com/Scrounger/ioBroker.unifi-network/workflows/Test%20and%20Release/badge.svg)
![Покрытие](https://img.shields.io/badge/coverage-96%25-brightgreen)

# ioBroker.unifi-network

## адаптер unifi-network для ioBroker

Компания Unifi Network использует интерфейс WebSocket для получения информации в режиме реального времени от приложения unifi-network.

## Важный

1. Адаптер разработан исключительно на базе операционной системы UniFi. Совместимость с самостоятельно установленным сетевым контроллером должна быть обеспечена, но гарантировать её не удаётся.

2. **Этот адаптер может потреблять очень много ресурсов!**<br> Это зависит от вашей среды, то есть от количества устройств и клиентов UniFi в вашей сети. На это можно частично повлиять с помощью API реального времени. `debounce time [s]` Этот параметр находится в настройках адаптера. События в реальном времени не затрагиваются этой настройкой, только «циклическое» обновление устройств, клиентов и т. д. в реальном времени.

3. **Не все состояния становятся доступны сразу после запуска адаптера.**<br> Состояния создаются и обновляются только тогда, когда данные отправляются сетевым контроллером; это может занять некоторое время до первой отправки данных.

## Конфигурация

### Локальный пользователь (UniFi OS)

Для входа в систему вам потребуется локальный пользователь, созданный в консоли UniFi OS. Пользователи Ubiquiti SSO Cloud не подойдут. Рекомендуется использовать администратора или пользователя с полными правами на чтение/запись, чтобы максимально эффективно использовать интеграцию, но это не обязательно.

1. Войдите в локальный портал на вашем устройстве UniFi OS и нажмите «Пользователи».\
   &#x20;**Примечание** : Это **необходимо** сделать из операционной системы UniFi, получив доступ к ней напрямую по IP-адресу (например, 192.168.1.1), а не через unifi.ui.com или приложение UniFi Network.

2. В меню слева перейдите в раздел **«Администраторы и пользователи»** и выберите вкладку «Администраторы» или перейдите по адресу \[IP-адрес]/admins/ (например, 192.168.1.1/admins/).

3. Нажмите на значок **«+»** в правом верхнем углу и выберите **«Добавить администратора»** .

4. Выберите **«Ограничить доступ только для локального доступа»** и введите новое имя пользователя и пароль.

5. Для роли в сети выберите **«Оператор точки доступа»** и **«Администратор сайта»** .\
   &#x20;**Примечание:** Это не является абсолютно необходимым. Если прав доступа недостаточно, вы получите уведомление в журнале событий.

![информация об изображении](../../../en/adapterref/iobroker.unifi-network/doc/config_local_user.png)

## Сообщения для скриптов и агентов искусственного интеллекта.

`sendTo('unifi-network.0', 'help', {})` ответы `{ help, commands }`: описание всех сообщений (`clientList`, `deviceList`, `wlanList`, `lanList`, `firewallGroupList`...) и состояний для управления сетью, написанных для агентов ИИ (например, ioBroker.pi-agent) и авторов скриптов. `commands` перечисляет все сообщения с `write: true` Если это что-то изменит.

## Разработка

Тестирование проводилось с использованием реального контроллера и записанных тестовых стендов:

1. Создайте git-ignored `.env` в корне проекта:

   ```env
   UNIFI_HOST=192.168.1.1
   UNIFI_USER=your-local-user
   UNIFI_PASSWORD=your-password
   # optional
   UNIFI_PORT=443
   UNIFI_SITE=default
   ```

   - `UNIFI_HOST`, `UNIFI_USER`, `UNIFI_PASSWORD`: необходимый
   - `UNIFI_PORT`: Порт HTTPS, по умолчанию `443`
   - `UNIFI_SITE`: название сайта, по умолчанию `default`

2. Запишите ответы API (только для чтения, один файл на каждую конечную точку):

   ```bash
   npm run record:api
   ```

   - `-- --dry-run`: показывает только, какие файлы будут записаны или удалены
   - `-- --no-anonymize`: хранит исходные данные без анонимизации

3. Запись событий в реальном времени (интерактивный режим):

   ```bash
   npm run record:events
   ```

   - `-- --only=<ids>`: только перечисленные сценарии, разделенные запятыми (идентификаторы в `tools/eventScenarios.ts`)
   - `-- --missing`: сохраняются только сценарии без фикстуры;
   - `-- --destructive` Также возможны сценарии удаления данных на контроллере.
   - `-- --dry-run`: показывает только, какие файлы будут записаны.
   - `-- --no-anonymize`: хранит исходные данные без анонимизации

4. Запись неизвестных событий (интерактивная, `q` (Нажатие Enter сохраняет, Ctrl+C прерывает сохранение):

   ```bash
   npm run record:events:unknown
   ```

   - `-- --dry-run`: показывает только, какие файлы будут записаны.
   - `-- --no-anonymize`: хранит исходные данные без анонимизации

5. Запустите тесты:

   ```bash
   npm run test:ts        # offline, uses recorded fixtures
   npm run test:live      # against the controller
   npm run test:all       # all of the above
   npm run test:coverage  # runs test:all with coverage report (src/) in coverage/index.html
   ```

Оборудование хранится в `test/fixtures/local/` и игнорируются Git, поскольку содержат данные контроллера. Для реальных тестов требуются учетные данные контроллера, содержащиеся в игнорируемых Git файлах. `.env` файл. Отчет о покрытии кода составляется в `coverage/` (git-ignored).

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.6.1 (2026-11-20)

- (Scrounger) bug fixes found by adapter checker
- (Scrounger) bug fixes
- (@GermanBluefox) Added the message "help": a description of all messages for AI agents (e.g. pi-agent), and common.supportedMessages.help

### 1.6.0 (2026-11-17)

- (Scrounger) enable / disable ports added #150
- (Scrounger) momment replaced with day.js
- (Scrounger) dependencies updated #116
- (Scrounger) revert bug fix for expired token #124
- (Scrounger) channel / device name undefined bug fix #116
- (Scrounger) vpn client handling optimized
- (Scrounger) event messages improved #122 #115

### 1.5.0 (2026-06-23)

- (Scrounger) vpn event handler for network >= 10.3.x added #89
- (Scrounger) event messages improved #109, #91
- (Scrounger) typescript 6.x bug fixes
- (Scrounger) dependencies updated
- (ioBrokerTranslator) spanish language added #98
- (Scrounger) bug fix for expired token since v10.4.57 #108
- (copilot) Adapter requires node.js >= 22 now

### 1.4.0 (2026-04-08)

- (Scrounger) bug fix for speed test event spamming since v.10.2.105
- (Scrounger) event messages improved #68 #54
- (Scrounger) dependencies updated
- (Scrounger) support for Unifi OS on custom port added (e.g. UniFi OS Server) #65
- (Scrounger) bug fix: vpn is wrongly shown as lan
- (Scrounger) system informations added #63
- (Scrounger) port states up, rx/tx error and rx/tx dropped added
- (Scrounger) event messages improved #64
- (Scrounger) read controller version added #59
- (Scrounger) option to set debug level for client connection events added #61
- (Scrounger) property version for devices added
- (Scrounger) satisfaction object create condition removed to prevent create and deletion of object
- (Scrounger) event messages for dream machines compatibility < v10.x added #72
- (Scrounger) weblate translation added
- (Scrounger) downgrade @iobroker/adapter-core to v3.3.1 to prevent conflicts with js-controller < v7.1.0 in rare cases #56

### 1.3.1 (2025-12-01)

- (Scrounger) null bug fix #48
- (Scrounger) dependencies updated
- (Scrounger) event messages improved #46
- (Scrounger) bug fixes

## License

MIT License

Copyright (c) 2025-2026 Scrounger <scrounger@gmx.net>

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