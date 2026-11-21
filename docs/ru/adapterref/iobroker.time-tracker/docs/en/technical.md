---
chapters: {"pages":{"en/adapterref/iobroker.time-tracker/README.md":{"title":{"en":"ioBroker.time-tracker"},"content":"en/adapterref/iobroker.time-tracker/README.md"},"en/adapterref/iobroker.time-tracker/docs/en/test-plan.md":{"title":{"en":"Acceptance and test plan (first real tests)"},"content":"en/adapterref/iobroker.time-tracker/docs/en/test-plan.md"},"en/adapterref/iobroker.time-tracker/docs/en/decisions.md":{"title":{"en":"Decisions and deviations"},"content":"en/adapterref/iobroker.time-tracker/docs/en/decisions.md"},"en/adapterref/iobroker.time-tracker/docs/en/i18n.md":{"title":{"en":"Translations (i18n)"},"content":"en/adapterref/iobroker.time-tracker/docs/en/i18n.md"},"en/adapterref/iobroker.time-tracker/docs/en/getting-started.md":{"title":{"en":"Getting started and first-start test"},"content":"en/adapterref/iobroker.time-tracker/docs/en/getting-started.md"},"en/adapterref/iobroker.time-tracker/docs/en/technical.md":{"title":{"en":"Technical notes (internals)"},"content":"en/adapterref/iobroker.time-tracker/docs/en/technical.md"},"en/adapterref/iobroker.time-tracker/docs/en/development.md":{"title":{"en":"Development"},"content":"en/adapterref/iobroker.time-tracker/docs/en/development.md"},"en/adapterref/iobroker.time-tracker/docs/en/adapter-check.md":{"title":{"en":"Checking the adapter rules"},"content":"en/adapterref/iobroker.time-tracker/docs/en/adapter-check.md"},"en/adapterref/iobroker.time-tracker/CONTRIBUTING.md":{"title":{"en":"Contributing"},"content":"en/adapterref/iobroker.time-tracker/CONTRIBUTING.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.time-tracker/docs/en/technical.md
title: Технические примечания (внутренние)
hash: ovDvKg5XIhpU+nOIacsQYngbbnzFbkOOdPBUXgdG5qU=
---
# Технические примечания (внутренние)

В этом документе собраны технические подробности, которые ранее содержались в [файле README](/#/adapters/time-tracker) : интерфейс HTTP, сессии и безопасность, события в реальном времени, автономная очередь приложения и база данных. Для использования адаптера достаточно файла README; вот как он выглядит внутри.

## HTTP-поверхность

- `/api` Это единственный префикс API — все остальные пути (маршрутизация на стороне клиента) принадлежат веб-приложению.
- Ошибки возникают по мере `application/problem+json` (RFC 9457) со стабильной `code` Приложение переводит коды.
- Загружаемые файлы являются реальными файлами (`content-disposition: attachment`), не JSON: `/api/reports/pdf` и `/api/reports/xls`.
- `/api/stream` WebSocket — это протокол для трансляции событий в реальном времени. Он принимает сессионный cookie, поэтому браузеру не нужен токен в URL-адресе; сотрудник видит только свои собственные события.
- Если `www/` Если ошибка отсутствует, адаптер продолжает работать и предоставляет только API — в логе указывается, какой случай применим.
- Адаптер объявляет о своем переходе в собственный интерфейс следующим образом: `common.localLinks` (`%protocol%://%ip%:%port%/` Администратор отображает соответствующий символ в строке экземпляра и в обзоре. **Администратор** заполняет поля-заполнители —`%ip%` от `bind` (с `0.0.0.0` адрес, который браузер использовал для доступа к административной панели), `%port%` с порта экземпляра; правило обратного прокси для `time-tracker.0` Заменяет ссылку собственным путем.

## Сессии, CSRF и ограничения скорости.

Сессии веб-приложения передаются в `httpOnly` cookie (`SameSite=Lax`, `Secure` (за HTTPS), чтобы скрипт, внедренный на страницу, не мог их прочитать. Само приложение хранит только токен CSRF и данные пользователя. `localStorage`; токен сессии никогда не покидает cookie-файл. Запросы, изменяющие состояние, дополнительно требуют наличия заголовка. `x-csrf-token`, который `GET /api/auth/me` Передача прав доступа осуществляется для собственной сессии (чтобы браузер снова обнаружил её после перезагрузки страницы). Клиенты интеграции продолжают использовать этот заголовок. `x-session-token` Исходя из ответа на запрос авторизации, этот способ не требует токена CSRF, поскольку внешняя страница не может установить собственный заголовок.

Ограничения скорости запросов и журнал аудита работают с адресом клиента. При наличии прокси-сервера данные считываются из этого адреса. `x-forwarded-for` только если включена **опция «Доверять обратному прокси»** , и учитывается самая **правая** запись (`x-forwarded-for: client, proxy`), потому что левая часть предоставлена клиентом.

## Очередь в автономном режиме

Без подключения к сети веб-приложение помещает отметки о времени в локальную очередь. `pending`) и отправляет их при следующем контакте; то, что не может быть однозначно назначено, в конечном итоге становится конфликтом в представлении _синхронизации_ и решается администрацией. Пока есть отметка о времени. `pending` или `conflict` Это не учитывается ни в каких расчетах: пара (`src/lib/domain/punch.ts`) это исключает.

## База данных

SQLite через `better-sqlite3` В режиме WAL — в каталоге данных адаптера. Изменения схемы существуют только в виде версионированных миграций. `src/lib/db/migrations.ts` (`schema_migrations` Миграции выполняются только путем добавления данных, каждое изменение представляет собой новое число. Публикуются агрегаты и команды управления — данные компании. `company.*`), ежемесячные и годовые значения на одного сотрудника, самое новое событие (`events.*`) и действия: правила в `trigger_rules`, на состояния которых подписывается адаптер (при изменении значения или, для каждого правила, при каждой записи; с задержкой), автоматические правила в `automation_rules` /`automation_runs` (регистрация начала и окончания рабочего дня, уведомление, напоминание о перерыве — в выбранные рабочие дни, не более одного раза в день на одного сотрудника или в течение недели по стандарту ISO) и `sendTo` сообщения (`punch`, `present`, `status`, `report`, `backup` Сами перфорации остаются в базе данных.

## Перерывы

Рассвет наступает благодаря `src/lib/domain/breaks.ts`: пробитые паузы — это промежутки между парами отметок, шкала пауз вычитает фиксированное количество минут за блок (от первой до последней отметки), и режим `pause_mode` решает, какой из них применим (`auto` = пробито, иначе шкала). Оплаченной части (`work_profiles.pause_paid_minutes` В лучшем случае начисляется только сам перерыв. Оба значения в итоге составляют в день. `day_aggregates` и, следовательно, в ежемесячной выписке.