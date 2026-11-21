---
BADGE-npm version: https://img.shields.io/npm/v/iobroker.hassemu
BADGE-stable: https://iobroker.live/badges/hassemu-stable.svg
BADGE-Installations: https://iobroker.live/badges/hassemu-installed.svg
BADGE-npm downloads: https://img.shields.io/npm/dt/iobroker.hassemu
BADGE-Test and Release: https://github.com/krobipd/ioBroker.hassemu/actions/workflows/test-and-release.yml/badge.svg
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
hash: UHGcrbkmrJLhW2Y8RE8VukhKmBzPOkXo387S+cic8YU=
---
# hassemu — отображает любую веб-страницу на экране, который принимает только Home Assistant.

Некоторые настенные дисплеи взаимодействуют только с сервером Home Assistant. Они проходят процедуру подключения к HA, после чего отображают панель управления HA — и ничего больше. hassemu отвечает на запросы протокола HA, которые запрашивают эти дисплеи, поэтому подключение завершается, а затем дисплей отправляет на выбранную вами веб-страницу: представление VIS, панель управления Aura, Grafana, Node-RED, страницу, которую вы написали сами.

Это не мост Home Assistant. Ничего не импортируется из HA, и никакие состояния ioBroker не отображаются как сущности HA. Адаптер эмулирует ровно столько, сколько нужно серверу HA, чтобы дисплей мог его принять, а затем не мешает работе.

Эта страница содержит подробное руководство. [Файл README](https://github.com/krobipd/ioBroker.hassemu/blob/main/README.md) — это краткая версия.

## Требования

- Node.js 22 или более поздняя версия
- ioBroker js-controller 7.2.5 или новее
- ioBroker Admin 8.3.5 или более поздняя версия
- Дисплей и ioBroker находятся в одной сети.

По умолчанию адаптер прослушивает порт 8123, тот же порт, который использует Home Assistant; приложения Home Assistant берут порт из адреса, объявленного сервером, или из того, который вы вводите. Другой порт позволяет Hassemu работать на хосте, где порт 8123 уже занят, а второму экземпляру на том же хосте требуется собственный порт или собственный интерфейс. Несколько хостов ioBroker в сети могут запускать по одному такому адаптеру; в этом случае дисплеи видят отдельные серверы.

## Настенная витрина Shelly

Семейство настенных дисплеев Shelly включает в себя как устаревшие модели (Stargate, X2), так и современные (XL, X2i, X1i, U1, D1). Дисплей можно приобрести у Hassemu двумя способами:

- **Встроенная страница Home Assistant** — оригинальный способ; в прошивке 2.7.0 эта функция была снята с поддержки.
- **Приложение Home Assistant, установленное на устройстве и** имеющее прошивку версии 2.6.0 и выше, проходит ту же процедуру регистрации, что и сопутствующее приложение на телефоне.

hassemu обслуживает оба варианта. В прошивке 2.7.0 также добавлена _функция очистки кэша WebView_ (Настройки → Home Assistant). Это удаляет cookie-файл, по которому идентифицируется дисплей: после этого он отображается один раз под новым идентификатором и снова запускается процесс регистрации. Удалите старую запись с ее идентификатором. `remove` кнопка.

## Настройка

### 1. Создайте экземпляр.

Установите адаптер и запустите экземпляр 0. В настройках экземпляра обычно ничего не нужно менять: mDNS включен, аутентификация отключена, и адаптер подключается ко всем интерфейсам.

Если ваш хост ioBroker находится в нескольких сетях, это не требует настройки: на всех интерфейсах адаптер объявляет о себе в каждой сети с адресом этой сети, и каждому дисплею присваивается адрес его собственной сети — в объявлении, при входе в систему и в адресах панели управления. Устанавливайте параметр **«Привязать к интерфейсу»** только тогда, когда hassemu должен обслуживать только одну сеть; в этом случае он будет прослушивать, объявлять и отвечать только в этой сети.

### 2. Добавьте сервер на экран.

На экране добавьте сервер Home Assistant.

- **При включенном mDNS** сервер обнаруживается автоматически. Он отображается под именем в поле **«Имя службы»** (по умолчанию). `ioBroker`).
- **Без mDNS** или если поиск на экране не выполняется, введите адрес вручную: `http://<ip-of-your-ioBroker>:8123` (с другим портом, этим же портом). При включенном HTTPS это `https://<name in the certificate>:8123` — См. раздел [«Аутентификация и ваша сеть»](#authentication-and-your-network) .

**В Android 17 и более новых версиях:** разрешите _доступ к локальной сети,_ когда приложение Home Assistant запросит это. Без этого приложение не найдет hassemu и не сможет связаться с ним в вашей сети — hassemu работает только по локальной сети, резервного копирования в облако нет.

### 3. Завершите процесс адаптации.

Теперь на экране отображается процесс входа в систему Home Assistant. При отключенной аутентификации вы просто переходите по ссылке. При включенной аутентификации введите имя пользователя и пароль из настроек экземпляра.

После этого щелчка дисплей и адаптер обмениваются токеном, и адаптер сохраняет cookie-файл на дисплее. Этот cookie-файл является идентификатором дисплея с этого момента: он сохраняется после перезагрузки, изменения адреса и имени, поэтому дисплей сохраняет свою страницу без повторной настройки.

### 4. Теперь дисплей ожидает

После завершения процесса подключения на экране отображается небольшая страница с идентификатором устройства. Эта страница означает: подключение установлено, но страница еще не выбрана. Идентификатор определяет местоположение данного устройства в дереве объектов.

### 5. Укажите на дисплее, что нужно показать.

Откройте обозреватель объектов ioBroker и найдите элемент display в разделе `hassemu.0.clients.<id>`. Установить **режим** :

- выберите одну из найденных панелей мониторинга из выпадающего списка, или
- выбирать `Manual URL` и укажите адрес в **поле manualUrl** рядом с ним.

Экран перезагружается примерно через 30 секунд.

Чтобы отобразить на всех экранах одну и ту же страницу, используйте `hassemu.0.global.mode` (и `global.manualUrl`) и включить `global.enabled` вместо того, чтобы настраивать каждый дисплей отдельно.

## Выбор того, что будет отображаться на экране.

Каждый дисплей имеет свой собственный **режим работы** . Адаптер определяет его при каждом запросе:

| режим              | Что показывает дисплей                           |
| ------------------ | ------------------------------------------------ |
| URL                | та страница                                      |
| `Manual URL`       | что бы ни находилось на этом дисплее `manualUrl` |
| `Global URL`       | что бы ни `global.mode` решает                    |
| `---` (нет выбора) | страница ожидания с идентификатором устройства   |

`global.mode` разрешается таким же образом, за исключением того, что само по себе оно не может быть `Global URL` — это укажет на самого себя, и адаптер отклонит запись.

### Главный выключатель

`global.enabled` Это не режим работы дисплея; это пакетное действие для всех дисплеев:

- Включение этой функции **приводит** к тому, что все дисплеи начинают работать. `Global URL`
- **Отключение** этой функции возвращает все дисплеи в исходное состояние. `---`

Поэтому выключение главного дисплея не восстанавливает предыдущие настройки каждого из них — оно очищает их все. После этого настройте нужные дисплеи по отдельности. Новые дисплеи всегда начинаются с... `---` Никогда не на странице, которую вы для них не выбрали.

## Что находится в дереве объектов?

```
hassemu.0.
├── info.
│   ├── connection      the adapter is running
│   └── refreshUrls     button: search for dashboards again
├── global.
│   ├── enabled         master switch (see above)
│   ├── mode            the page for every display set to Global URL
│   └── manualUrl       free address, used when global.mode is Manual URL
└── clients.
    └── <id>            one entry per display, named after the app's device name, its host name or address
        ├── mode        what this display shows
        ├── manualUrl   free address, used when mode is Manual URL
        ├── resolvedUrl the address this display was actually sent to
        ├── ip          the address this display was last seen at
        └── remove      button: forget this display
```

**Идентификатор сервера** не указан в дереве: дисплеи распознают сервер по идентификатору, который создается один раз и хранится в файле в папке данных экземпляра вместе с cookie и токенами каждого дисплея. Перезапуск адаптера не меняет его, поэтому после перезапуска дисплей не воспринимает его как другой сервер. Если бы он изменился, каждый дисплей потребовал бы повторной настройки.

**Удаление** удаляет запись, а вместе с ней и идентификатор дисплея. Открытое соединение с дисплеем немедленно завершается; при следующем подключении дисплея устанавливается новое соединение, и оно начинается с этого момента. `---` Используйте его для дисплеев, от которых вы избавились. При запуске адаптер также удаляет все дисплеи, которые последний раз отображались более чем за 30 дней до последнего отображения — измерение производится по этому дисплею, а не по часам, поэтому после длительного простоя всей системы ни один дисплей не удаляется.

Параметр **resolvedUrl** отвечает на вопрос "куда же на самом деле переместился этот дисплей?". Он доступен только для чтения и отслеживает каждое изменение: выберите панель управления — и она будет содержать этот адрес, переключитесь на отображение по глобальному URL — и она будет содержать то, на что указывает глобальная настройка, верните выбор — и она будет пустой, потому что дисплей находится на своей целевой странице. Это удобно, когда для отображения установлен глобальный URL, и в противном случае вам пришлось бы работать с двумя настройками, чтобы увидеть результат.

**IP-адрес** носит информационный характер. Дисплеи идентифицируются по их cookie-файлу, а не по адресу, поэтому новый адрес от вашего маршрутизатора не создаст вторую запись.

## Три страницы, которые может отображать дисплей.

Помимо панели управления, на дисплее может отображаться одна из трех страниц самого адаптера.

**Страница ожидания** — идентификатор устройства и подсказка. Означает: подключение установлено, страница не выбрана. Она обновляется каждые 15 секунд, поэтому исчезает сама по себе, как только вы выберете режим.

**"hassemu offline"** — адаптер остановлен или недоступен. Примерно через 1,5 минуты на дисплее появится сообщение об ошибке, затем, после восстановления работы адаптера, панель управления автоматически вернется. Одно ограничение: если дисплей запускается _во время_ простоя адаптера, страница не загружается, и вместо этого отображается ошибка подключения.

**«Цель перенаправления недоступна»** — адаптер работает, но страница, на которую вы перенаправили вывод, не отвечает. Без этого вы бы получили просто черный экран. Карточка указывает целевой адрес и предлагает перезагрузить страницу; вывод автоматически возвращается на панель управления, как только целевой адрес снова ответит.

Адаптер оценивает доступность как "недоступную" консервативно: _любой_ HTTP-ответ считается доступным, включая страницу входа или страницу ошибки — это означает, что сервер работает. Только отказ в соединении или истечение времени ожидания приводят к появлению соответствующей карточки. Он не проверяет сертификаты, поскольку самоподписанные сертификаты являются обычным явлением на главной панели управления.

## Откуда берется выпадающий список

Адаптер выполняет поиск на хосте ioBroker страниц, заслуживающих внимания:

- **VIS и VIS-2** — одна запись на проект и одна на каждое представление внутри него, для каждого `web` экземпляр, который у вас есть
- **Aura** — одна запись на каждый запущенный экземпляр, использующая порт, фактически настроенный для этого экземпляра; Aura обслуживается `web` экземпляры указывают туда (или на собственный порт Aura, пока это `web` экземпляр прослушивает только на своей собственной машине), а Aura, которая прослушивает только на своей собственной машине, не получает доступа, потому что ни один дисплей не может до нее дотянуться.
- **Административные плитки** — это плитки, отображаемые на стартовой странице ioBroker: страница устройств, Grafana, Jarvis, Material, ваш собственный веб-интерфейс и карточки ссылок, добавленные вами на стартовую страницу. Плитка, скрытая на стартовой странице, не отображается в списке, а две плитки с одинаковым адресом считаются одной записью.

Адрес, работающий только на самом хосте ioBroker (`127.0.0.1`, `::1`, `localhost`) никогда не становится записью, независимо от источника: дисплей всегда является другим устройством, и оттуда такой адрес никуда не ведёт.

Поиск выполняется при запуске и всякий раз, когда добавляется, удаляется или перенастраивается экземпляр адаптера, или изменяются настройки стартовой страницы. Экран сохраняет свою страницу даже после того, как она исчезает из списка. После создания или переименования проекта или представления VIS-2 установите **параметр info.refreshUrls** в значение `true` повторить поиск без перезагрузки адаптера.

Если что-то не найдено, это не потеряно: выбирайте `Manual URL` и вставьте адрес. Адреса, использующие `javascript:`, `data:` или `file:` Отклонено — это не страницы, это код.

## Аутентификация и ваша сеть

**По умолчанию используется обычный HTTP** , как и в Home Assistant, и без HTTPS всё, что находится на этом порту, не зашифровано. Стоит чётко понимать два следствия:

- Рассматривайте порт как локальный для вашей сети. Не перенаправляйте на него трафик из интернета.
- При включенной аутентификации имя пользователя, пароль и токены передаются по вашей сети в незашифрованном виде. Аутентификация предотвращает использование интерфейса высокой доступности другими устройствами в вашей сети — она не обеспечивает защиту от доступа из интернета.

**Использование HTTPS** в настройках экземпляра шифрует логин, пароль и токены с помощью сертификата от ioBroker. У HTTPS свои правила:

- При использовании HTTPS дисплеи обращаются к Hassemu по имени, указанному в сертификате, а не по IP-адресу — это имя должно разрешаться на каждом дисплее.
- При использовании сертификата ioBroker по умолчанию (самоподписанного, выданного для имени компьютера) дисплею Android необходимы оба условия: сертификат, установленный как доверенный, и сеть, которая разрешает имя компьютера.
- Панель управления, работающая по протоколу HTTP без ограничений, не может отображаться на странице с протоколом HTTPS — для этого следует выбрать адрес HTTPS.
- Включение HTTPS изменяет адрес Hassemu: каждый дисплей отображается один раз как новое устройство и должен быть направлен на новый адрес.

**Заголовки Trust Reverse Proxy Headers** должны оставаться отключенными, если перед адаптером действительно не находится обратный прокси-сервер, который завершает TLS и удаляет эти заголовки. `X-Forwarded-*` Заголовки, отправленные клиентом. При включении без них любое устройство может запрашивать разный адрес при каждом запросе. В этом случае адаптер регистрирует неверные адреса, и его ограничение на количество новых записей о дисплеях для каждого адреса больше ничего не ограничивает. Начиная с версии 1.40.0, существует второе ограничение, которое не зависит от адреса — максимум 100 новых записей о дисплеях в час в общей сложности — поэтому неправильная конфигурация больше не может заполнить базу данных. Дисплеи продолжают работать, пока действует это ограничение; они просто не получают сохраненный идентификатор до тех пор, пока не закончится всплеск активности. Ограничение ограничивает ущерб, но не делает настройку безопасной.

## Порты

| Порт       | Направление | Для чего нужен этот адаптер?                                                                     |
| ---------- | ----------- | ------------------------------------------------------------------------------------------------ |
| 8123 / TCP | входящий    | Интерфейс Home Assistant, с которым взаимодействует дисплей (порт по умолчанию, можно изменить). |
| 5353 / UDP | входящий    | mDNS, поэтому дисплеи самостоятельно находят сервер.                                             |

Для мониторинга времени безотказной работы и проверки работоспособности контейнеров используйте `http://<ip-of-your-ioBroker>:8123/health` (с HTTPS) `https://` (с другим портом, через этот порт). Он отвечает, ничего не создавая. `GET /` Это то, что дисплей отправляет при первом посещении, поэтому монитор, направленный на него, отобразится как новый дисплей; `HEAD /` ничего не создает.

## Обновление с версии 1.x

В версии 2.0.0 каждому дисплею присваивается новый идентификатор объекта один раз: `clients.61c3a1` становится `clients.display-c3a1` —`display` Затем следуют последние четыре символа старого идентификатора. Перемещение происходит автоматически при первом запуске: значения, комнаты, функции и псевдонимы перемещаются, записанная история продолжается в старой последовательности, а отображение остается распознанным, поэтому ничего не нужно настраивать заново. В журнале указывается имя каждого перемещения. Скрипты и визуализации, использующие старые идентификаторы, необходимо обновить. После этого не возвращайтесь к версии 1.x.

Точка данных `info.serverUuid` исчезло: идентификатор сервера перемещается в папку данных экземпляра в тот же момент запуска, поэтому дисплеи продолжают распознавать сервер.

Например, при первом подключении дисплея приложение Home Assistant сообщает модель, за которой следуют четыре символа, которые выбирает сама программа hassemu. `clients.pixel-tablet-02b7`; если на дисплее не отображается модель, идентификатор начинается с `display` Идентификационный номер (ID) никогда не меняется после его присвоения.

Каждому дисплею присваивается имя, соответствующее имени устройства приложения, имени хоста или адресу; имя, введенное в обозреватель объектов, определяет его местоположение. Дисплей, названный по имени хоста, отображает свой адрес до первого подключения после обновления.

## Возникающие вопросы

**Можно ли запустить два экземпляра?** Да, на одном хосте, каждый со своим портом или интерфейсом. На двух хостах ioBroker можно запустить по одному экземпляру; в этом случае дисплеи будут видеть два отдельных сервера.

**Обязательно ли постоянно подключать дисплей к адаптеру?** Да. Он получает страницу через адаптер, и от этого зависят страница с информацией об отключенном устройстве и проверка целевого объекта. Если адаптер отключается, панель управления остается на экране около 1,5 минут; затем дисплей отображает страницу с информацией об отключенном устройстве и самостоятельно возвращается к панели управления, как только адаптер снова подключается.

**Можно ли переименовать дисплей?** Имя берется самим дисплеем: это имя устройства, заданное в приложении Home Assistant, или его имя хоста в сети, или его адрес. Чтобы изменить его, переименуйте устройство в приложении или укажите имя хоста в маршрутизаторе. Имя, введенное в обозревателе объектов, не сохраняется — адаптер записывает имя дисплея обратно при следующем запуске или изменении.

**Почему для одного и того же дисплея появилась вторая запись?** Дисплей не отправил обратно свой cookie — обычно это происходит из-за сброса к заводским настройкам, очистки кэша браузера или WebView (прошивка Shelly 2.7.0 и новее: Настройки → Home Assistant) или режима конфиденциальности, который удаляет cookie. Удалите старую запись вместе с ней. `remove` кнопка. Причина в дисплее, а не в адаптере.

**Нужно ли устанавливать Home Assistant?** Нет. Адаптер сам отвечает на запросы протокола HA. В этой конфигурации Home Assistant отсутствует.

**Может ли дисплей управлять ioBroker?** Нет. Соединение передает информацию о регистрации и адрес страницы, больше ничего. Никакие состояния не отображаются, и никакие команды не принимаются.

## Выяснение причин произошедшего.

Установите уровень ведения журнала экземпляра на `debug` Затем адаптер отслеживает каждое принятое решение: какой дисплей был распознан, как произошел вход в систему, какие панели мониторинга были найдены и как он преобразовал режим в адрес для каждого запроса. Большинство проблем можно прочитать прямо из этого журнала.

Если mDNS включен, но в журнале нет `mDNS: Broadcasting` Сообщение не дошло до адресата — обычно потому, что что-то другое занимает порт 5353. Отключите mDNS и введите адрес на дисплее вручную; всё остальное работает так же.

Если приложение Home Assistant на Android 17 или более поздних версиях ничего не находит и не может подключиться даже с адресом, введенным вручную, значит, у него отсутствует _доступ к локальной сети_ — разрешите его в настройках приложения.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- Changed: every display gets a new object ID once — `clients.61c3a1` becomes `clients.display-c3a1`; values, rooms, functions and aliases move along
- Changed: a new display gets the model its app reports plus four characters as its ID, for example `clients.pixel-tablet-02b7`
- Changed: a display is named after the device name set in its Home Assistant app, otherwise its host name or address; a name typed into the object browser gives way
- New: the port is configurable, 8123 stays the default
- New: optional HTTPS with a certificate from ioBroker
- New: hassemu reports Home Assistant 2026.8.0 — the apps keep their loading screen until the dashboard is there, and the iPhone app shows it edge to edge
- Changed: only displays in the host's own networks get an answer, and a chosen address is the only one hassemu listens, announces and connects on
- Changed: on a host with several networks, every display finds and reaches hassemu at the address of its own network
- Changed: the server ID and each display's cookie and tokens live in a file in the instance data folder; the datapoint `info.serverUuid` is gone
- Changed: the redirect mode datapoints are of type text
- New: every display carries a display pictogram in the object tree
- Changed: a new instance is created disabled
- New: two settings decide whether a datapoint you record is deleted when hassemu no longer needs it, and whether its recorded data goes too
- Improved: a start puts less load on the ioBroker database
- Fixed: an update from 1.0 or 1.1 removes the empty hostname and visUrl datapoints a display kept until now
- Fixed: the dashboard list takes the page of the devices adapter and other admin tiles it used to drop
- Changed: the dashboard list follows the admin start page — its link cards come in, a tile hidden there drops out; a display keeps a target that drops out
- Fixed: aura served by a web instance is listed at that address; an aura that only listens on its own machine is no longer listed
- Fixed: an address of this machine only (127.x, ::1, localhost) is no longer listed; a display keeps such a target it already chose
- Fixed: the password of a rejected address with credentials no longer appears in the log
- Fixed: the sign-in pages show their text in the language set in ioBroker
- Fixed: an update from 1.0 or 1.1 with several displays keeps the room and function assignments of every display
- Fixed: removing a display ends its running app connection at once, not only at its next message
- Fixed: known security advisories in bundled libraries are closed

### 1.46.1 (2026-09-25) — stable

- Improved: switching the master switch and refreshing the dashboard list now log their result — how many displays changed and how many dashboards were found

### 1.46.0 (2026-09-25)

- Fixed: a start that fails (port briefly in use, database not up yet) now restarts after 30 seconds instead of leaving the instance off until someone starts it by hand
- Fixed: displays are no longer all removed after the adapter or its host was off for more than 30 days — the cleanup now counts from the most recently seen display
- Fixed: an update from 1.0 or 1.1 no longer resets the global URL choice on every start — the URL you had set before the update stays in place for good
- Fixed: on iOS the Home Assistant app no longer keeps its loading screen over the dashboard, and on Android the bottom of the dashboard no longer hides behind the navigation bar
- Fixed: uptime monitors and container health checks no longer create display entries, and the adapter settings name the /health address meant for them
- Fixed: stopping the adapter no longer waits on open connections or hangs while a display is mid-request, and a stop during the start no longer brings the server up
- Fixed: room and function assignments move along reliably when an old datapoint is replaced, and a read error no longer gives the server a new identity
- Changed: the sign-in hands its code to an unknown address only after a click on Continue, and a signed-in app is disconnected when its display is removed
- Improved: mDNS announces an address the displays can reach — no link-local, container or VPN address — and announces again when the host's address changes
- Improved: the reverse proxy option in the settings and the offline card on the display explain themselves in plain words, in all eleven languages

### 1.45.0 (2026-09-17) — stable

- Fixed: refreshing the dashboard list no longer removes a display's mode datapoint from its rooms and functions, and the datapoint no longer disappears for a moment while it is rewritten
- Fixed: a failed request or migration now names its cause instead of "[object Object]", and an unexpected error inside the web server no longer breaks its own error answer to the display
- Improved: when updating from a version before 1.37.0, the room and function assignments of the renamed URL datapoints move to their successors instead of being lost

### 1.44.0 (2026-09-15)

- Fixed: writing the master switch with the value it already has (a script re-asserting it) no longer resets every display's own choice — only a real change reaches the displays
- Fixed: a disabled web instance no longer adds dashboard entries pointing at a port nobody listens on, and labels get an instance suffix only when more than one web server runs
- Fixed: a display that signed in while the new-display throttle was active got a login that failed on its next request — the sign-in is now refused and works once the throttle lifts
- Improved: a restart no longer rewrites every display's last-seen stamp and target address, and an instance with many displays comes up faster
- Changed: the listen address moved to the standard setting key; an existing value is carried over automatically and the instance restarts once after the update
- Changed: the instance settings now show the fixed port 8123, so the admin can warn when another instance on the same host already holds it

### 1.43.1 (2026-09-07)

- Changed: the button that removes a display now carries a description — it deletes the display's folder and all its states, and the display returns as a new entry on its next request

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