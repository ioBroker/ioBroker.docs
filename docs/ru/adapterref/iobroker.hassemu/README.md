---
BADGE-npm version: https://img.shields.io/npm/v/iobroker.hassemu
BADGE-stable: https://iobroker.live/badges/hassemu-stable.svg
BADGE-Installations: https://iobroker.live/badges/hassemu-installed.svg
BADGE-npm downloads: https://img.shields.io/npm/dt/iobroker.hassemu
BADGE-Node: https://img.shields.io/badge/node-%3E%3D22-brightgreen
BADGE-TypeScript: https://img.shields.io/badge/TypeScript-strict-blue
BADGE-License: https://img.shields.io/badge/license-MIT-green
BADGE-Sentry: https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white
BADGE-Ko-fi: https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi
BADGE-PayPal: https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.hassemu/README.md
title: hassemu - отображает любую веб-страницу на экране, который принимает только Home Assistant.
hash: dtz/7/IwmtejH6KCRvB+mnkW4ngMF+j6swW0VZ20t3I=
---
# hassemu — отображает любую веб-страницу на экране, который принимает только Home Assistant.

Некоторые настенные дисплеи взаимодействуют только с сервером Home Assistant. Они проходят процедуру подключения к HA, после чего отображают панель управления HA — и ничего больше. hassemu отвечает на запросы протокола HA, которые запрашивают эти дисплеи, поэтому подключение завершается, а затем дисплей отправляет на выбранную вами веб-страницу: представление VIS, панель управления Aura, Grafana, Node-RED, страницу, которую вы написали сами.

Это не мост Home Assistant. Ничего не импортируется из HA, и никакие состояния ioBroker не отображаются как сущности HA. Адаптер эмулирует ровно столько, сколько нужно серверу HA, чтобы дисплей мог его принять, а затем не мешает работе.

Эта страница содержит подробное руководство. [README](../../README.md) Это краткая версия.

## Требования

- Node.js 22 или новее
- ioBroker js-controller 7.2.2 или новее
- ioBroker Admin 8.0.11 или более поздняя версия
- Дисплей и ioBroker находятся в одной сети.

В сети может быть только один экземпляр Hassemu. Адаптер прослушивает порт 8123, поскольку именно этот порт ожидают клиенты HA, и он не подлежит настройке — два экземпляра будут конкурировать за него.

## Настройка

### 1. Создайте экземпляр.

Установите адаптер и запустите экземпляр 0. В настройках экземпляра обычно ничего не нужно менять: mDNS включен, аутентификация отключена, и адаптер подключается ко всем интерфейсам.

Если ваш хост ioBroker имеет несколько сетевых карт, настройте... **Привязать к интерфейсу** к тому адресу, к которому подключены ваши дисплеи. Адаптер объявляет себя по этому адресу, поэтому объявление адреса, к которому дисплей не может подключиться, является наиболее распространенной причиной того, что обнаружение «работает», но дисплей затем не может подключиться.

### 2. Добавьте сервер на экран.

На экране добавьте сервер Home Assistant.

- **При включенном mDNS** Дисплей самостоятельно находит сервер. Он отображается под именем в
  **Название услуги** (по умолчанию `ioBroker`).
- **Без mDNS**Или, если поиск не удаётся, введите адрес вручную:
  `http://<ip-of-your-ioBroker>:8123`. Так должно быть `http` - видеть
  [Аутентификация и ваша сеть](#authentication-and-your-network).

### 3. Завершите процесс адаптации.

Теперь на экране отображается процесс входа в систему Home Assistant. При отключенной аутентификации вы просто переходите по ссылке. При включенной аутентификации введите имя пользователя и пароль из настроек экземпляра.

После этого щелчка дисплей и адаптер обмениваются токеном, и адаптер сохраняет cookie-файл на дисплее. Этот cookie-файл является идентификатором дисплея с этого момента: он сохраняется после перезагрузки, изменения адреса и переименования, поэтому дисплей сохраняет свою страницу без повторной настройки.

### 4. Теперь дисплей ожидает

После завершения процесса подключения на экране отображается небольшая страница с идентификатором устройства. Эта страница означает: подключение установлено, но страница еще не выбрана. Идентификатор определяет местоположение данного устройства в дереве объектов.

### 5. Укажите на дисплее, что нужно показать.

Откройте обозреватель объектов ioBroker и найдите элемент display в разделе
`hassemu.0.clients.<id>`. Набор **режим**:

- выберите одну из найденных панелей мониторинга из выпадающего списка, или
- выбирать `Manual URL` и введите адрес в **manualUrl** рядом с ним.

Экран перезагружается примерно через 30 секунд.

Чтобы отобразить на всех экранах одну и ту же страницу, используйте `hassemu.0.global.mode` (и `global.manualUrl`) и включить `global.enabled` вместо того, чтобы настраивать каждый дисплей отдельно.

## Выбор того, что будет отображаться на экране.

Каждый стенд имеет свой собственный **режим**Адаптер решает эту проблему при каждом запросе:

| режим              | Что показывает дисплей                           |
| ------------------ | ------------------------------------------------ |
| URL                | та страница                                      |
| `Manual URL`       | что бы ни находилось на этом дисплее `manualUrl` |
| `Global URL`       | что бы ни `global.mode` решает                   |
| `---` (нет выбора) | страница ожидания с идентификатором устройства   |

`global.mode` разрешается таким же образом, за исключением того, что само по себе оно не может быть `Global URL` — это укажет на самого себя, и адаптер отклонит запись.

### Главный выключатель

`global.enabled` Это не режим работы дисплея; это пакетное действие для всех дисплеев:

- переключить его **на** устанавливает для каждого дисплея `Global URL`
- переключить его **выключенный** возвращает все дисплеи в исходное состояние. `---`

Поэтому выключение главного дисплея не восстанавливает предыдущие настройки каждого из них — оно очищает их все. После этого настройте нужные дисплеи по отдельности. Новые дисплеи всегда начинаются с... `---`Никогда не на странице, которую вы для них не выбрали.

## Что находится в дереве объектов?

```
hassemu.0.
├── info.
│   ├── connection      the adapter is running
│   ├── serverUuid      the identity the displays remember the server by
│   └── refreshUrls     button: search for dashboards again
├── global.
│   ├── enabled         master switch (see above)
│   ├── mode            the page for every display set to Global URL
│   └── manualUrl       free address, used when global.mode is Manual URL
└── clients.
    └── <id>            one entry per display, named after its host name or address
        ├── mode        what this display shows
        ├── manualUrl   free address, used when mode is Manual URL
        ├── resolvedUrl the address this display was actually sent to
        ├── ip          the address this display was last seen at
        └── remove      button: forget this display
```

**serverUuid** Стоит знать следующее: дисплеи распознают сервер по этому идентификатору. Он создается один раз и сохраняется, поэтому перезапуск адаптера не воспринимается дисплеем как изменение сервера. Если бы он изменился, каждый дисплей потребовал бы повторной настройки.

**удалять** Удаляет запись, а вместе с ней идентификационные данные дисплея. При следующем подключении этого дисплея будет установлено новое соединение, и он начнет работу с того же места. `---`Используйте его для удаленных дисплеев; адаптер также автоматически удаляет записи, если они не отображались в течение 30 дней.

**resolvedUrl** Это ответ на вопрос «где же в итоге оказался этот дисплей?». Он доступен только для чтения и отслеживает каждое изменение: выберите панель управления, и она будет содержать этот адрес; переключите дисплей на глобальный URL, и он будет содержать то, на что указывает глобальная настройка; верните выбор, и он окажется пустым, потому что дисплей находится на своей целевой странице. Удобно, когда для дисплея установлен глобальный URL, и в противном случае вам пришлось бы работать с двумя настройками, чтобы увидеть результат.

**IP** Это информационный документ. Дисплеи идентифицируются по их cookie-файлу, а не по адресу, поэтому новый адрес от вашего маршрутизатора не создаст вторую запись.

## Три страницы, которые может отображать дисплей.

Помимо панели управления, на дисплее может отображаться одна из трех страниц самого адаптера.

**Страница ожидания** — Идентификатор устройства и подсказка. Означает: подключено, страница не выбрана. Обновляется каждые 15 секунд, поэтому исчезает автоматически после выбора режима.

**"hassemu offline"** — Адаптер отключился или недоступен. Примерно через 1,5 минуты дисплей это отобразит и предложит кнопку перезагрузки, после чего автоматически вернется к отображению панели управления, как только адаптер снова заработает. Одно ограничение: дисплей, который включается автоматически. _пока_ Адаптер недоступен, не удается загрузить эту страницу, вместо этого отображается ошибка подключения.

**"Цель перенаправления недоступна"** — Адаптер работает, но страница, на которую вы отправили изображение, не отвечает. Без этого вы бы получили просто черный экран. Карта присваивает целевому адресу имя и предлагает перезагрузку; дисплей автоматически возвращается к панели управления, как только целевой адрес снова отвечает.

Адаптер оценивает ситуацию как "недоступную" с запасом: _любой_ HTTP-ответ считается доступным, включая страницу входа или страницу ошибки — это означает, что сервер работает. Карточку отображают только в случае отказа в соединении или превышения таймаута. Проверка сертификатов не выполняется, поскольку самоподписанные сертификаты являются обычным явлением на главной панели управления.

## Откуда берется выпадающий список

Адаптер выполняет поиск на хосте ioBroker страниц, заслуживающих внимания:

- **ВИС и ВИС-2** — одна запись на проект и одна на каждое представление внутри него, для каждого `web`
  экземпляр, который у вас есть
- **Аура** — одна запись на каждый запущенный экземпляр, использующая порт, фактически настроенный для этого экземпляра.
- **Административные плитки** — всё, что адаптер рекламирует для стартовой страницы ioBroker (Grafana, Jarvis, Material, ваш собственный веб-интерфейс…).

Поиск выполняется при запуске и всякий раз, когда добавляется, удаляется или перенастраивается экземпляр адаптера. После создания или переименования проекта или представления VIS-2 установите **info.refreshUrls**
к `true` повторить поиск без перезагрузки адаптера.

Если что-то не найдено, это не потеряно: выбирайте `Manual URL` и вставьте адрес. Адреса, использующие `javascript:`, `data:` или `file:` Отклонено — это не страницы, это код.

## Аутентификация и ваша сеть

**Все данные на порту 8123 передаются по протоколу HTTP без шифрования.** Это не обходной путь, это то, что требуется клиентам HA в этом процессе; они не будут использовать HTTPS здесь. Стоит четко понимать два следствия:

- Рассматривайте порт 8123 как локальный для вашей сети. Не перенаправляйте на него трафик из интернета.
- При включенной аутентификации имя пользователя, пароль и токены передаются по вашей сети в незашифрованном виде. Аутентификация предотвращает использование интерфейса высокой доступности другими устройствами в вашей сети — она не обеспечивает защиту от доступа из интернета.

**Доверенный прокси** Следует оставить отключенным, если перед адаптером действительно не находится обратный прокси-сервер, который завершает TLS и удаляет `X-Forwarded-*` Заголовки, отправленные клиентом. При включении без них любое устройство может запрашивать разный адрес при каждом запросе. В этом случае адаптер регистрирует неверные адреса, и его ограничение на количество новых записей о дисплеях для каждого адреса больше ничего не ограничивает. Начиная с версии 1.40.0, существует второе ограничение, которое не зависит от адреса — максимум 100 новых записей о дисплеях в час в общей сложности — поэтому неправильная конфигурация больше не может заполнить базу данных. Дисплеи продолжают работать, пока действует это ограничение; они просто не получают сохраненный идентификатор до тех пор, пока не закончится всплеск активности. Ограничение ограничивает ущерб, но не делает настройку безопасной.

## Порты

| Порт       | Направление | Для чего нужен этот адаптер?                         |
| ---------- | ----------- | ---------------------------------------------------- |
| 8123 / TCP | входящий    | интерфейс HA, с которым взаимодействует дисплей      |
| 5353 / UDP | входящий    | mDNS, поэтому дисплеи самостоятельно находят сервер. |

## Возникающие вопросы

**Можно ли запустить два экземпляра?** Нет. Порт 8123 занят клиентами HA, поэтому Hassemu работает только на одном хосте в сети.

**Обязательно ли оставлять дисплей подключенным к адаптеру?** Да. Страница загружается через адаптер, и от него зависят офлайн-страница и проверка целевого объекта. Если адаптер останавливается, на экране продолжает отображаться последняя загруженная страница, пока не будет предпринята повторная попытка.

**Можно ли переименовать дисплей?** Да — переименовать `clients.<id>` Объект отображается в обозревателе объектов. Адаптер сохраняет ваше имя и не перезаписывает его, даже если изменяется адрес отображения или имя хоста.

**Почему для одного и того же дисплея есть вторая запись?** Дисплей не отправил обратно свой cookie-файл — обычно это происходит при сбросе до заводских настроек, очистке кэша браузера или включении режима конфиденциальности, который удаляет cookie-файлы. Удалите старую запись с её содержимым. `remove` кнопка. Причина в дисплее, а не в адаптере.

**Нужно ли устанавливать Home Assistant?** Нет. Адаптер отвечает на запросы самого протокола Home Assistant. В этой конфигурации нет никакого Home Assistant.

**Может ли дисплей управлять ioBroker?** Нет. Соединение передает информацию о регистрации и адрес страницы, больше ничего. Никакие состояния не передаются, и никакие команды не принимаются.

## Выяснение причин произошедшего.

Установите уровень ведения журнала экземпляра на `debug`Затем адаптер отслеживает каждое принятое решение: какой дисплей был распознан, как произошел вход в систему, какие панели мониторинга были найдены и как он преобразовал режим в адрес для каждого запроса. Большинство проблем можно прочитать прямо из этого журнала.

Если mDNS включен, но в журнале нет `mDNS: Broadcasting` Сообщение не дошло до адресата — обычно потому, что что-то другое занимает порт 5353. Отключите mDNS и введите адрес на дисплее вручную; всё остальное работает так же.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 1.43.1 (2026-09-07)

- Changed: the button that removes a display now carries a description — it deletes the display's folder and all its states, and the display returns as a new entry on its next request

### 1.43.0 (2026-09-06)

- Fixed: taking a display's choice back (mode `---`, or turning the master switch off) now reaches the display — until now it kept the dashboard it had until someone reloaded it by hand
- Fixed: a display that lost power no longer holds up the adapter's shutdown for 30 seconds
- Fixed: VIS projects are found on every VIS instance, not only on `vis.0` / `vis-2.0`
- Fixed: upgrading from a pre-1.1.1 version no longer overwrites the whole instance configuration while removing the old URL setting
- New: every display now shows the address it was actually sent to, so you can see at a glance where a display landed without walking through the global and per-display settings yourself
- Changed: `info.serverUuid` and `global.enabled` carry clearer labels, and the per-display manual URL now has a description

### 1.42.0 (2026-09-04)

- Fixed: a leftover setting from older versions is now removed from the instance completely instead of only being switched off — switched off, it stayed behind for good

### 1.41.0 (2026-09-03)

- Fixed: renamed datapoints now reach installations that already exist — until now a changed name or description only ever showed up on a fresh install
- Fixed: the object tree kept outdated labels ("Known display clients", "Client IP", "Forget this client") and showed a developer note in the global manual URL name
- Changed: datapoint names now appear in your ioBroker language throughout the object tree, including the names the displays report for themselves
- New: full user documentation in English and German covering setup, the object tree and troubleshooting, shown by the ioBroker documentation portal

### 1.40.0 (2026-09-02)

- Fixed: with trustProxy enabled but no sanitising reverse proxy in front, a single device could create unlimited display entries — a global ceiling now caps this

[Older changelogs can be found there](CHANGELOG_OLD.md)

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

<!-- prettier-ignore -->
*Developed with assistance from Claude.ai*