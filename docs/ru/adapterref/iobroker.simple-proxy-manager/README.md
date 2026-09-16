---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.simple-proxy-manager/README.md
title: ioBroker.simple-proxy-manager
hash: UTr88QGjNED57Lb8T4ue3W0L9+s+gBXGYUdLOOyM3mw=
---
![Логотип](../../../en/adapterref/iobroker.simple-proxy-manager/admin/simple-proxy-manager.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.simple-proxy-manager.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.simple-proxy-manager.svg)
![Количество установок](https://iobroker.live/badges/simple-proxy-manager-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/simple-proxy-manager-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.simple-proxy-manager.png?downloads=true)
![Тестирование и выпуск](https://github.com/lubepi/ioBroker.simple-proxy-manager/workflows/Test%20and%20Release/badge.svg)

# ioBroker.simple-proxy-manager

Простой менеджер обратного прокси HTTPS/HTTP для ioBroker.

## Функции

- **HTTPS + HTTP параллельно** – оба сервера работают постоянно.
- **Протокол для каждого хоста** : бэкэнд с сертификатом = HTTPS, без сертификата = HTTP.
- **Сертификат для каждого виртуального хоста** – ACME (Let's Encrypt), самоподписанный или созданный вручную.
- **Настраиваемые бэкэнды** через административный интерфейс.
- **Фильтрация IP-адресов** для внутренних служб (на основе CIDR, IPv4 + IPv6, несколько сетей)
- **Перенаправление HTTP → HTTPS** с использованием переадресации запросов ACME.
- **Автоматическая перезагрузка SSL-сертификата** при продлении сертификата ACME.
- **Предупреждение об истечении срока действия сертификата** в журнале.
- **HSTS** (Строгая транспортная безопасность)
- **Поддержка WebSocket** (например, для административной панели ioBroker)
- **Двойной стек** IPv4 + IPv6
- **Изменить параметр «Источник»**

## Предварительные требования

- **Node.js** >= 22
- **ioBroker** с js-controller >= 6.0.11
- **Адаптер ACME** для автоматического получения SSL-сертификатов (опционально – также может использоваться без сертификатов).
- Настроенные порты должны быть доступны (по умолчанию: 80 для HTTP, 443 для HTTPS).

## Конфигурация

### Вкладка «Общие»

| Параметр                                   | По умолчанию | Описание                                                                                                |
| ------------------------------------------ | ------------ | ------------------------------------------------------------------------------------------------------- |
| Порт HTTPS                                 | 443          | Порт для HTTPS                                                                                          |
| HTTP-порт                                  | 80           | Порт для HTTP — здесь обслуживаются бэкэнды без сертификата; с сертификатом → перенаправление на HTTPS. |
| Порт адаптера ACME                         | 0            | Внутренний порт адаптера ACME (0 = отключен)                                                            |
| Включить HSTS                              | ✓            | Заголовок Strict-Transport-Security (только для HTTPS)                                                  |
| HSTS максимальный возраст                  | 31536000     | Срок действия HSTS в секундах (1 год)                                                                   |
| Контрольный интервал                       | 1            | Как часто проверяются сертификаты (в часах)                                                             |
| Предупреждение об истечении срока действия | 0            | Предупреждение за X дней до истечения срока действия (0 = отключено)                                    |
| Регистрируйте события безопасности.        | ✗            | В логах регистрируются предупреждения о запрете доступа (фильтрация IP-адресов, WebSocket).             |
| Запросы журналов                           | ✗            | Записывайте каждый входящий запрос (IP-адрес, хост, URL) в качестве отладочных записей.                 |

### Вкладка "Бэкенды"

Каждый бэкэнд определяет виртуальный хост:

| Поле                        | Описание                                                                                                                                                                  |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Активный**                | Включение/отключение бэкэнда                                                                                                                                              |
| **Имя хоста**               | Домен, указывающий на этот сервер через DNS                                                                                                                               |
| **Целевой URL**             | Адрес бэкэнда (`http://IP:Port` )                                                                                                                                         |
| **Сертификат**              | Сертификат от`system.certificates` **С сертификатом** = HTTPS + автоматическое перенаправление HTTP→HTTPS. **Без сертификата** = только HTTP (без HTTPS для этого хоста). |
| **Разрешенные сети**        | Сети/IP-адреса CIDR, разделенные запятыми (например)`192.168.0.0/24, fd00::/8` Пусто = доступ из любого разрешенного места.                                               |
| **Изменение происхождения** | Перепишите заголовок Host на целевой IP-адрес.                                                                                                                            |

### Пример конфигурации

| Имя хоста              | Целевой URL             | Сертификат                         | Разрешенные сети             | Изменение происхождения |
| ---------------------- | ----------------------- | ---------------------------------- | ---------------------------- | ----------------------- |
| `website.example.com`  | `http://127.0.0.1:3000` | `acme`                             | –                            | ✗                       |
| `iobroker.example.com` | `http://127.0.0.1:8081` | `default` (Самоподписано ioBroker) | `192.168.0.0/24`             | ✗                       |
| `host.example.com`     | `http://192.168.0.1`    | _(без сертификата)_                | `192.168.0.0/24, 10.0.0.0/8` | ✓                       |

В этом примере:

- `website.example.com` → **HTTPS** с сертификатом Let's Encrypt, HTTP перенаправляет на HTTPS
- `iobroker.example.com` → **HTTPS** с использованием сертификата ioBroker по умолчанию (`default` ), только локальная сеть
- `host.example.com` → **HTTP** (без сертификата), только локальная сеть

## Штаты

| Состояние                      | Тип        | Описание                                                   |
| ------------------------------ | ---------- | ---------------------------------------------------------- |
| `info.connection`              | логический | Прокси-сервер запущен                                      |
| `certificates.<name>.expires`  | нить       | Срок действия сертификата (на каждую выдачу)               |
| `certificates.<name>.daysLeft` | число      | Количество дней до истечения срока действия (за один сбор) |

Состояния сертификатов создаются динамически для каждой используемой коллекции сертификатов (например,`certificates.acme.daysLeft` ,`certificates.default.expires` ).

## Конфигурация адаптера ACME

Если прокси-сервер работает на порту 80 по умолчанию, адаптер ACME должен работать на порту, отличном от 80. Запросы ACME автоматически перенаправляются прокси-сервером на настроенный порт ACME.

1. Установите порт адаптера ACME на **8080** (или любой другой желаемый порт).
2. Установите то же значение, что и для порта адаптера ACME в менеджере прокси.
3. Введите все необходимые домены в адаптер ACME.

## Сертификаты

Адаптер считывает сертификаты из`system.certificates` и предлагает три типа:

### 1. Индивидуальные сертификаты, выдаваемые по системе именования.

Это сертификаты, которые пользователь может добавить вручную через системные настройки ioBroker. Все пары ключ/сертификат хранятся в`system.certificates → native.certificates` их можно использовать при условии соблюдения следующего соглашения об именовании:

| Ключ            | Содержание                                                                 |
| --------------- | -------------------------------------------------------------------------- |
| `{name}Private` | Закрытый ключ (PEM)                                                        |
| `{name}Public`  | Сертификат (PEM)                                                           |
| `{name}Chained` | Предпочтительнее использовать полную цепочку сертификатов (PEM).`Public` ) |

Базовое имя`{name}` Это то, что отображается в выпадающем списке и хранится в конфигурации.

> **Пример:** Если ioBroker сохранил ключи`myCertPrivate` и`myCertChained` ,`myCert` появится в выпадающем списке.

#### Сертификат по умолчанию ioBroker

Самоподписанный сертификат, поставляемый с ioBroker, хранится под именами`defaultPrivate` и`defaultPublic` в`system.certificates` Он соответствует тем же правилам, что и любой другой сертификат:

- Базовое имя:**`default`**
- Отображается в выпадающем списке как`default`
- Идеально подходит для внутренних служб, которым не требуется сертификат, подписанный публичным лицом.

### 2. Коллекции ACME

Сертификаты Let's Encrypt автоматически генерируются адаптером ACME. Они хранятся в`system.certificates → native.collections` под именем, присвоенным коллекции в конфигурации адаптера ACME. Запросы ACME на порту 80 автоматически перенаправляются прокси-сервером на настроенный порт ACME.

### Протокол для каждого хоста

Адаптер определяет **для каждого бэкэнда** , будет ли использоваться HTTPS или HTTP:

| Сертификат бэкэнда | HTTP-запрос                 | HTTPS-запрос                     |
| ------------------ | --------------------------- | -------------------------------- |
| Набор              | Перенаправление 301 → HTTPS | Обслуживался с сертификатом SNI. |
| Пустой             | Подается напрямую (HTTP)    | 302 перенаправление → HTTP       |

Оба сервера работают **параллельно** . Каждый бэкэнд может иметь свой собственный источник сертификатов. **SNI** (Server Name Indication) автоматически выбирает правильный сертификат для запрошенного имени хоста во время рукопожатия TLS.

Сообщения от хостов с неизвестным именем хоста отклоняются на уровне TLS — резервный сертификат не используется.

Подробная информация о загрузке сертификата доступна в журнале отладки.

## Changelog
### 1.0.0 (2026-07-07)
- (copilot) Adapter requires node.js >= 22 now

### 0.1.10 (2026-04-29)

- Harden error handling: certificate loading, renewal, cleanup and adapter teardown are now individually guarded so a single failure no longer aborts the entire operation
- Fix: register server `error`/`close` handlers before calling `listen()` (correct Node.js pattern)
- Code quality: remove inconsistent `typeof this.terminate` guards, rename misleading `certHashes` to `certPemCache`, fix template literal formatting

### 0.1.9 (2026-04-06)

- Optimize logging behavior: request logs now use debug level, transient backend restart errors are logged as debug with details, and startup logs are less noisy
...
- Harden certificate handling: hosts with configured but unavailable certificates now fail closed for HTTPS/WSS instead of falling back silently
- Improve `info.connection` state handling: state is now true only when both HTTP and HTTPS listeners are active

### 0.1.8 (2026-03-26)
- Update GitHub Actions test matrix (Node.js 20, 22, 24)
- Address reviewer suggestions (use `node:` prefix, specific state roles, interval limiting)
- Fix linting errors

### 0.1.7 (2026-03-20)

- Docs: remove generic installation section per S6014

[Older changelogs can be found there](https://github.com/lubepi/ioBroker.simple-proxy-manager/blob/main/CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 lubepi

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