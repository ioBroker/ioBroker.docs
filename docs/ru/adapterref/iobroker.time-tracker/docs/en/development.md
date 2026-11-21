---
chapters: {"pages":{"en/adapterref/iobroker.time-tracker/README.md":{"title":{"en":"ioBroker.time-tracker"},"content":"en/adapterref/iobroker.time-tracker/README.md"},"en/adapterref/iobroker.time-tracker/docs/en/test-plan.md":{"title":{"en":"Acceptance and test plan (first real tests)"},"content":"en/adapterref/iobroker.time-tracker/docs/en/test-plan.md"},"en/adapterref/iobroker.time-tracker/docs/en/decisions.md":{"title":{"en":"Decisions and deviations"},"content":"en/adapterref/iobroker.time-tracker/docs/en/decisions.md"},"en/adapterref/iobroker.time-tracker/docs/en/i18n.md":{"title":{"en":"Translations (i18n)"},"content":"en/adapterref/iobroker.time-tracker/docs/en/i18n.md"},"en/adapterref/iobroker.time-tracker/docs/en/getting-started.md":{"title":{"en":"Getting started and first-start test"},"content":"en/adapterref/iobroker.time-tracker/docs/en/getting-started.md"},"en/adapterref/iobroker.time-tracker/docs/en/technical.md":{"title":{"en":"Technical notes (internals)"},"content":"en/adapterref/iobroker.time-tracker/docs/en/technical.md"},"en/adapterref/iobroker.time-tracker/docs/en/development.md":{"title":{"en":"Development"},"content":"en/adapterref/iobroker.time-tracker/docs/en/development.md"},"en/adapterref/iobroker.time-tracker/docs/en/adapter-check.md":{"title":{"en":"Checking the adapter rules"},"content":"en/adapterref/iobroker.time-tracker/docs/en/adapter-check.md"},"en/adapterref/iobroker.time-tracker/CONTRIBUTING.md":{"title":{"en":"Contributing"},"content":"en/adapterref/iobroker.time-tracker/CONTRIBUTING.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.time-tracker/docs/en/development.md
title: Разработка
hash: 4xH4LrTat/7kGIPzcrhH0bVwMSjPvFq64iGq7gkwqrM=
---
# Разработка

Репозиторий, скрипты, тесты и релиз. Правила привязки находятся в[`CONTRIBUTING.md`](/#/docs/adapterref/iobroker.time-tracker/CONTRIBUTING.md) В файле [README](/#/adapters/time-tracker) описан адаптер для пользователей.

## Макет

```
src/          adapter sources (TypeScript)
src-www/      progressive web app (Vite + React + MUI) — built into www/
src-shared/   types and checks that adapter and web app share
admin/        jsonConfig of the instance and translations (11 languages)
test/         package and integration tests (@iobroker/testing)
test/e2e/     browser tests (Playwright, own server without ioBroker)
docs/en/      documentation in English
docs/de/      documentation in German (the original text)
```

## Сценарии

| Сценарий                   | Описание                                                                                                                                      |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run build`            | скомпилируйте исходный код TypeScript                                                                                                         |
| `npm run watch`            | скомпилируйте и дождитесь изменений.                                                                                                          |
| `npm run install:pwa`      | установите зависимости веб-приложения (`src-www`, собственный `node_modules`)                                                                |
| `npm run build:pwa`        | собрать веб-приложение, прошедшее проверку типов, в `www/`                                                                                    |
| `npm run dev:pwa`          | Сервер разработки Vite с `/api` прокси для запущенного экземпляра                                                                              |
| `npm run lint`             | ESLint (`@iobroker/eslint-config`) для адаптера и веб-приложения                                                                             |
| `npm run check`            | Проверка типов TypeScript (адаптер и веб-приложение)                                                                                          |
| `npm run test:ts`          | модульные тесты исходных кодов адаптера                                                                                                       |
| `npm run test:package`     | проверять `package.json` / `io-package.json`                                                                                                   |
| `npm run test:integration` | Запуск адаптера осуществляется с использованием реального js-контроллера (пакетов). `build/` и `www/`)                                         |
| `npm run e2e`              | браузерные тесты (Playwright) против `test/e2e/server.mjs`                                                                                    |
| `npm run coverage`         | модульные тесты с отчетом о покрытии кода                                                                                                     |
| `npm run translate`        | выровнять 11 файлов перевода                                                                                                                  |
| `npm run check:i18n`       | Проверьте, что все 11 языков пройдены полностью.                                                                                              |
| `npm run check:adapter`    | локальная предварительная проверка правил ioBroker ([`adapter-check.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/adapter-check.md) ) |
| `npm run version:bump`     | повышать версию, поддерживать список изменений и `common.news`                                                                                |
| `npm run version:check`    | Проверьте версию, список изменений и ограничения по длине списков.                                                                            |
| `npm run push:approve`     | Утвердите текущий коммит для отправки (предварительно спросите разрешения у владельца).                                                       |
| `npm run release`          | Создать релиз (версия, список изменений, тег)                                                                                                 |
| `dev-server watch`         | Запустите и отладьте адаптер локально.                                                                                                        |

## Здание

Для выпуска продукта необходимы **оба** варианта результата. `build/` (адаптер) и `www/` (веб-приложение):

```bash
npm run install:pwa
npm run build:pwa
npm run build
```

`node tools/make-pwa-icons.mjs` Перегенерирует значки приложения (они являются частью репозитория, библиотека изображений не требуется).

## Открыть

- **Приёмочный запуск на реальном оборудовании:** выполнен — рендеринг PDF-файла для `ru`, `uk`, `zh-cn` и польские работы (шрифт Unicode через `report_font_path` (проверено владельцем 01.10.2026). **Импорт старых данных** из предшествующей системы не входит в задачи — обоснование приведено в[`decisions.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/decisions.md) .
- **Публикация:** пакет размещен на npm (CI публикует его через npm trusted publishing with provenance); запись в `ioBroker.repositories` Запрос был отправлен ( [PR #6702](https://github.com/ioBroker/ioBroker.repositories/pull/6702) ) и ожидает рассмотрения.
- **Небольшие пробелы:** языковые файлы веб-приложения, переведенные машинным способом, ожидают проверки носителями языка. Предыдущее пожелание «удобство NFC в административной панели» **выполнено** — вместо мобильного приложения NFC (которое может реализовать только Android Chrome) каждое состояние ioBroker теперь запускает действие (см. README, «Действия»): адаптер подписывается на состояния таблицы, срабатывает при изменении значения (по каждому правилу также при каждой записи) и подтверждает, округляет или устанавливает присутствие.

## Границы пакетов (и что говорит о них средство проверки репозиториев ioBroker)

Адаптер имеет **два** `package.json` файлы: корневая директория самого адаптера (зависимости времени выполнения, такие как `better-sqlite3`, `pdfkit`, `exceljs`, `luxon`, `ws`) и `src-www/` для веб-приложения (React, MUI, i18next, `qrcode` Веб-приложение **предварительно настроено** с использованием `npm run build:pwa` а затем лежит в `www/` в виде готового пакета; во время работы адаптера ничего из него не загружается.

Программа проверки репозитория считывает исходные коды импортированных пакетов и пропускает только **фиксированный** список папок. `excludedSourceDirs` в `lib/M5000_Code.js`: `/admin`, `/build`, `/docs`, `/test`, `/tools`, `/www`, `/src-www`, `/src-vis`, `/src-widgets`, …). Предыдущее название папки `src-pwa/` Его там не было, сообщил проверяющий. `W5042` («Пакет … используется в исходном файле(ах), но не найден в зависимостях package.json») для react, MUI и i18next — пакетов, принадлежащих веб-приложению (`src-www/package.json`) и что установка адаптера не должна сопровождаться. С `src-www/` Папка есть в списке, но сообщения исчезли; только `dependencies` считать, `@types/*` и `@iobroker/types` являются исключением. `W5049` (`process.env` в `test/e2e/server.mjs` Это касается **тестового сервера** браузерных тестов, а не адаптера. `S1039` Предлагается компактный режим — с 20.11.2026 адаптер его поддерживает. `common.compact: true` (решение D2).

**Информация о лицензии:** `common.licenseInformation` (`{ type: "free", license: "MIT" }`) установлен — и **нет** `common.license` рядом с ним может стоять: тест пакета ioBroker (`npm run test:package`) отклоняет оба варианта одновременно («common.license не должен существовать вместе с common.licenseInformation»). Запись о лицензии в `package.json` (`"license": "MIT"`) не затрагивается этим и должен совпадать. Конвейер 0.1.7 дал сбой именно по этой причине. `npm run test:package` это обязательно должно быть в контрольном списке перед каждым релизом.

## Структура объекта (E3009, E1011, E6001)

Бот ioBroker проверяет список объектов работающей системы («Проверка структуры объектов» —`time-tracker.0.json` %). Для **каждого** состояния требуются родительские объекты: `users.<id>.todayWorkedMinutes` нужен канал `users.<id>` **и** канал `users` Если один из них отсутствует, в отчете о проверке указывается, что он отсутствует. `E3009` («отсутствующий промежуточный объект») для каждого затронутого объекта — в запросе на слияние #6697 это было **126 сообщений из одного отсутствующего канала** (`users`).

Поэтому `createUserChannel` (`src/lib/adapter/states.ts`) создает корневой канал `users` а также, идемпотентно через `setObjectNotExists` другие каналы (`info`, `company`, `events`, `commands`) создаются в своих соответствующих `create…States` функции.

Ещё два результата той же проверки:

- ** `E1011` ** —`common.write` должен соответствовать роли: `value` Это роль **для чтения** , поэтому она подходит для записи. `commands.punchUserId` несет `level` сейчас.
- ** `E6001` ** — каждое имя объекта должно содержать **одиннадцать** языков, которые `common.titleLang` И новости уже это сделали. Тексты собраны в **одном** месте. `src/lib/adapter/stateNames.ts`), и `src/lib/adapter/states.test.ts` Ошибка возникает, как только у имени отсутствует язык.

Потому что `setObjectNotExists` оставляет существующие объекты нетронутыми. `ensureObject` в `states.ts` обновляет поля **, принадлежащие адаптеру,** с помощью `extendObject` после их создания (`name`, `type`, `role`, `read`, `write`, `unit`) — без этого работающие установки сохраняли бы свое старое определение: дамп объектов, считываемый программой проверки, по-прежнему показывал бы `role: "value"` (`E1011`) и старый `en` /`de` имена (`E6001`). `common.custom` опущено, оно содержит настройки пользователя (например, для `history`).

## События (`events.*`)

`events.lastType`, `lastUser`, `lastDirection` и `lastSource` Отражает **самое новое** событие. Данные поступают из **шины событий** API: `onReady` подписан на него (`api.events.subscribe`) и записывает каждое событие в дерево объектов через `publishEventState` — это также обновляет данные, когда событие касается цифр (`FIGURES_EVENT_TYPES`).

Таким образом, **каждый** канал связи передает данные в шину: REST API, терминал киоска, состояния команд (`commands.*`), а `sendTo` сообщение (`punch`, `present`), правила действий/триггеров, автоматические правила и состояние присутствия (`users.<id>.present` Чистые слои выдают результат, а слой-адаптер формирует событие на его основе. `punchEvent` в `commands.ts`, `presenceEvent` в `presence.ts`) — новый способ, исключающий этот шаг, появляется именно здесь: бронирование находится в базе данных, но `events.*` остается на предыдущем мероприятии.

## После переименования: еще два правила

Изменение на `ioBroker.time-tracker` Сделали видимыми две вещи, которые раньше были недоступны:

- ** `common.news` применяется к каждому пакету npm** (repochecker) `E2004` Каждая версия, указанная здесь, должна быть доступна в npm под **этим** именем. Версии 0.1.x существуют только в предыдущем пакете. `iobroker.zeiterfassung` Именно поэтому список новостей начинается с 0.2.0 —`CHANGELOG_OLD.md` объясняет историю.
- ** `bluefox` должен быть совладельцем пакета npm** (repochecker). `E2001`):`npm owner add bluefox
  iobroker.time-tracker ` или пригласите на npmjs.com — без этого ни один адаптер не будет принят.` latest `.` npm run version:check` Это служит напоминанием в качестве **предупреждения** (синелицый должен сам принять приглашение, поэтому этот пункт не блокирует толчок).

`npm run version:check` Проверяет версии новостей по npm (ошибка) и списку владельцев пакета (предупреждение); в автономном режиме оба пункта пропускаются, поэтому проверка продолжается.