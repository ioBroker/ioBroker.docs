---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.simple-proxy-manager/README.md
title: ioBroker.simple-proxy-manager
hash: AXJ5+qdVDCaAJSme9gf8iiT473qK0tuzbMm7Q84d4h4=
---
![Логотип](../../../en/adapterref/iobroker.simple-proxy-manager/admin/simple-proxy-manager.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.simple-proxy-manager.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.simple-proxy-manager.svg)
![Количество установок](https://iobroker.live/badges/simple-proxy-manager-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/simple-proxy-manager-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.simple-proxy-manager.png?downloads=true)

# IoBroker.simple-proxy-manager
**Тесты:** [![Тестирование и выпуск](https://github.com/lubepi/ioBroker.simple-proxy-manager/workflows/Test%20and%20Release/badge.svg)](https://github.com/lubepi/ioBroker.simple-proxy-manager/actions?query=workflow%3A%22Test+and+Release%22)

Простой менеджер обратного прокси HTTPS/HTTP для ioBroker.

## Функции
- **Параллельное использование HTTPS и HTTP** – оба сервера работают постоянно.
- **Протокол для каждого хоста** – бэкэнд с сертификатом = HTTPS, без сертификата = HTTP
- **Сертификат на каждый виртуальный хост** – ACME (Let's Encrypt), самоподписанный или созданный вручную.
- **Настраиваемые бэкэнды** через административный интерфейс
- **Фильтрация IP-адресов** для внутренних сервисов (на основе CIDR, IPv4 + IPv6, несколько сетей)
- **Перенаправление HTTP → HTTPS** с переадресацией запросов ACME
- **Автоматическая перезагрузка SSL-сертификата** при продлении сертификата ACME.
- **Предупреждение об истечении срока действия сертификата** в журнале
- **HSTS** (Строгая транспортная безопасность)
- **Поддержка WebSocket** (например, для административной панели ioBroker)
- **Двойной стек** IPv4 + IPv6
- Опция **Изменить источник**

## Предварительные условия
- **Node.js** >= 22
- **ioBroker** с js-контроллером >= 6.0.11
- **Адаптер ACME** для автоматического получения SSL-сертификатов (опционально – также может использоваться без сертификатов)
— Настроенные порты должны быть доступны (по умолчанию: 80 для HTTP, 443 для HTTPS).

## Конфигурация
### Вкладка «Общие»
| Настройки | По умолчанию | Описание |
| ------------------- | -------- | ---------------------------------------------------------------------------------------------------- |
| Порт HTTPS | 443 | Порт для HTTPS |
| HTTP-порт | 80 | Порт для HTTP – здесь обслуживаются бэкэнды без сертификата; с сертификатом → перенаправление на HTTPS |
| Порт адаптера ACME | 0 | Внутренний порт адаптера ACME (0 = отключен) |
| Включить HSTS | ✓ | Заголовок Strict-Transport-Security (только для HTTPS) |
| Максимальный срок действия HSTS | 31536000 | Срок действия HSTS в секундах (1 год) |
| Интервал проверки | 1 | Как часто проверяются сертификаты (часы) |
| Предупреждение об истечении срока действия | 0 | Предупреждение за X дней до истечения срока действия (0 = отключено) |
| Регистрировать события безопасности | ✗ | Регистрировать отказ в доступе (фильтрация IP-адресов, WebSocket) как предупреждения |
| Регистрировать запросы | ✗ | Регистрировать каждый входящий запрос (IP-адрес, хост, URL) в виде отладочных записей |

### Вкладка "Бэкенды"
Каждый бэкэнд определяет виртуальный хост:

| Поле | Описание |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Активно** | Включить/отключить бэкэнд |
| **Имя хоста** | Домен, указывающий на этот сервер через DNS |
| **Целевой URL** | Адрес бэкэнда (`http://IP:Port`) |
| **Разрешенные сети** | Сети/IP-адреса CIDR, разделенные запятыми (например, `192.168.0.0/24, fd00::/8`). Пустое поле означает, что доступ разрешен из любого места. |
| **Разрешенные сети** | Сети/IP-адреса CIDR, разделенные запятыми (например, `192.168.0.0/24, fd00::/8`). Пустое поле означает, что доступ разрешен из любого места. |
| **Изменить источник** | Переписать заголовок Host на целевой IP-адрес |

### Пример конфигурации
| Имя хоста | Целевой URL | Сертификат | Разрешенные сети | Изменить источник |
| ---------------------- | ----------------------- | -------------------------------- | ---------------------------- | ------------- |
| `website.example.com` | `http://127.0.0.1:3000` | `acme` | – | ✗ |
| `host.example.com` | `http://192.168.0.1` | _(нет сертификата)_ | `192.168.0.0/24, 10.0.0.0/8` | ✓ |
| `host.example.com` | `http://192.168.0.1` | _(нет сертификата)_ | `192.168.0.0/24, 10.0.0.0/8` | ✓ |

В этом примере:

- `website.example.com` → **HTTPS** с сертификатом Let's Encrypt, HTTP-перенаправление на HTTPS
- `iobroker.example.com` → **HTTPS** с сертификатом ioBroker по умолчанию (`default`), только в локальной сети
- `host.example.com` → **HTTP** (без сертификата), только локальная сеть

## Штаты
| Штат | Тип | Описание |
| ------------------------------ | ------- | ----------------------------------------------- |
| `info.connection` | логическое значение | Прокси запущен |
| `certificates.<name>.daysLeft` | число | Дней до истечения срока действия (за один сбор) |
| `certificates.<name>.daysLeft` | число | Количество дней до истечения срока действия (за одну выдачу) |

Состояния сертификатов создаются динамически для каждой используемой коллекции сертификатов (например, `certificates.acme.daysLeft`, `certificates.default.expires`).

## Конфигурация адаптера ACME
Если прокси-сервер работает на порту 80 по умолчанию, адаптер ACME должен работать на порту, отличном от 80.
Запросы ACME автоматически перенаправляются прокси-сервером на настроенный порт ACME.

1. Установите порт адаптера ACME на **8080** (или любой другой желаемый порт).
2. Установите то же значение, что и для порта адаптера ACME в менеджере прокси.
3. Введите все необходимые домены в адаптер ACME.

## Сертификаты
Адаптер считывает сертификаты из `system.certificates` и предлагает три типа:

### 1. Индивидуальные сертификаты по системе именования
Это сертификаты, которые пользователь может добавить вручную через системные настройки ioBroker. Все пары ключ/сертификат, хранящиеся в `system.certificates → native.certificates`, могут быть использованы при условии соблюдения следующего соглашения об именовании:

| Ключевые слова | Содержание |
| --------------- | ----------------------------------------------------- |
| `{name}Private` | Закрытый ключ (PEM) |
| `{name}Chained` | Полная цепочка сертификатов (PEM, предпочтительнее, чем `Public`) |
| `{name}Chained` | Полная цепочка сертификатов (PEM, предпочтительнее, чем `Public`) |

Базовое имя `{name}` — это то, что отображается в выпадающем списке и хранится в конфигурационном файле.

> **Пример:** Если ioBroker сохранил ключи `myCertPrivate` и `myCertChained`, то в выпадающем списке появится `myCert`.

#### Сертификат ioBroker по умолчанию
Самоподписанный сертификат, поставляемый с ioBroker, хранится под именами `defaultPrivate` и `defaultPublic` в `system.certificates`. Он соответствует тем же правилам, что и любой другой сертификат:

- Базовое имя: **`default`**
— Отображается в выпадающем списке как «по умолчанию»
- Идеально подходит для внутренних служб, которым не требуется сертификат, подписанный публичным лицом.

### 2. Коллекции ACME
Сертификаты Let's Encrypt автоматически генерируются адаптером ACME. Они хранятся в `system.certificates → native.collections` под именем, присвоенным коллекции в конфигурации адаптера ACME. Запросы ACME на порту 80 автоматически перенаправляются прокси-сервером на настроенный порт ACME.

### Протокол для каждого хоста
Адаптер определяет **для каждого бэкэнда**, будет ли использоваться HTTPS или HTTP:

| Сертификат бэкэнда | HTTP-запрос | HTTPS-запрос |
| ------------------- | ---------------------- | --------------------------- |
| Установить | Перенаправление 301 → HTTPS | Обслуживается с использованием сертификата SNI |
| Пусто | Обработано напрямую (HTTP) | Перенаправление 302 → HTTP |

Оба сервера работают **параллельно**. Каждый бэкэнд может иметь свой собственный источник сертификатов. **SNI** (Server Name Indication) автоматически выбирает правильный сертификат для запрошенного имени хоста во время рукопожатия TLS.

Сообщения от хостов с неизвестным именем хоста отклоняются на уровне TLS — резервный сертификат не используется.

Подробная информация о загрузке сертификата доступна в журнале отладки.

## Changelog
### **WORK IN PROGRESS**
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

### 0.1.6 (2026-03-16)

- Add rich README header with badges and logo
- Update release workflow documentation
- Switch to NPM Trusted Publishing

[Older changelogs can be found there](CHANGELOG_OLD.md)

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