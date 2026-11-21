---
chapters: {"pages":{"en/adapterref/iobroker.time-tracker/README.md":{"title":{"en":"ioBroker.time-tracker"},"content":"en/adapterref/iobroker.time-tracker/README.md"},"en/adapterref/iobroker.time-tracker/docs/en/test-plan.md":{"title":{"en":"Acceptance and test plan (first real tests)"},"content":"en/adapterref/iobroker.time-tracker/docs/en/test-plan.md"},"en/adapterref/iobroker.time-tracker/docs/en/decisions.md":{"title":{"en":"Decisions and deviations"},"content":"en/adapterref/iobroker.time-tracker/docs/en/decisions.md"},"en/adapterref/iobroker.time-tracker/docs/en/i18n.md":{"title":{"en":"Translations (i18n)"},"content":"en/adapterref/iobroker.time-tracker/docs/en/i18n.md"},"en/adapterref/iobroker.time-tracker/docs/en/getting-started.md":{"title":{"en":"Getting started and first-start test"},"content":"en/adapterref/iobroker.time-tracker/docs/en/getting-started.md"},"en/adapterref/iobroker.time-tracker/docs/en/technical.md":{"title":{"en":"Technical notes (internals)"},"content":"en/adapterref/iobroker.time-tracker/docs/en/technical.md"},"en/adapterref/iobroker.time-tracker/docs/en/development.md":{"title":{"en":"Development"},"content":"en/adapterref/iobroker.time-tracker/docs/en/development.md"},"en/adapterref/iobroker.time-tracker/docs/en/adapter-check.md":{"title":{"en":"Checking the adapter rules"},"content":"en/adapterref/iobroker.time-tracker/docs/en/adapter-check.md"},"en/adapterref/iobroker.time-tracker/CONTRIBUTING.md":{"title":{"en":"Contributing"},"content":"en/adapterref/iobroker.time-tracker/CONTRIBUTING.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.time-tracker/docs/en/adapter-check.md
title: Проверка правил адаптера
hash: sSg9cuaTgSzygLnLbMFubS5OlgHxAXSHxKY5zyFjmDU=
---
# Проверка правил адаптера

Два этапа: `npm run check:adapter` (локальный, офлайн) и официальный проверяющий (`npx @iobroker/repochecker`) как только репозиторий появится на GitHub.

## 1. Локальная предварительная проверка (в автономном режиме)

```powershell
npm run check:adapter
```

`tools/check-adapter.ps1` Проверяет правила официального средства проверки, которые можно оценить **без** GitHub, и присваивает имя применяемому правилу:

| Правило            | Проверки                                                                                                                |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| W0066/S0067        | `@types/node` охватывает минимальную версию Node. `package.json` →`engines.node`                                         |
| (tsconfig)         | `@tsconfig/nodeNN` соответствует минимальной версии Node.                                                               |
| (generate-adapter) | `.create-adapter.json` →`nodeVersion` матчи `engines.node`                                                               |
| W5052/W5053        | каждый `"type": "password"` в `admin/jsonConfig.json` находится в `protectedNative` **и** `encryptedNative`                 |
| E5049/E5050        | нет `process.env` /`process.exit` в исходном коде (адаптер может использовать один и тот же процесс в компактном режиме) |
| W8918              | Нет действия рабочего процесса ioBroker без тега версии (`@main` /`@master`)                                           |
| W6021              | `## License` это **последний** раздел `README.md`                                                                        |
| E510               | `common.news` Новейшая версия содержит все 11 языков.                                                                   |
| W438               | `.vscode/settings.json` содержит `json.schemas`                                                                          |

Код выхода 1 (с `-FailOnIssue`) об ошибках; предупреждения и примечания позволяют выполнить программу без ошибок.

На этом этапе проверка не выполняется, поскольку средство проверки считывает **список файлов репозитория** и **настройки проекта** из GitHub: номера опубликованных версий, примечания к релизам и т. д. `package-lock.json` против `engines.node` конфигурация Dependabot, сравнение лицензионного файла, права действий и структура `objects` /`instanceObjects` Именно поэтому второй этап остается обязательным.

Программа проверки анализирует состояние кнопок (`role: "button"` с `read: false`, `write: true` структурно; в этом проекте модульные тесты в `src/lib/adapter/states.test.ts` Они также обеспечивают безопасность **структуры объектов** : каждому состоянию необходимы родительские каналы. Функция «Проверка структуры объектов» бота ioBroker проверяет это по списку объектов работающей системы и сообщает о результатах. `E3009` («отсутствует промежуточный объект») — в запросе на слияние #6697 это были **126 сообщений из одного отсутствующего канала** (`users` Корневой канал создается в `createUserChannel` сейчас.

## 2. Официальный инструмент проверки (с опубликованным репозиторием)

Программа проверки всегда считывает данные проекта через API GitHub и останавливается, если репозиторий не найден. `[E0000] FATAL: cannot access repository https://api.github.com/repos/…` - так `--local` В одиночку это не сработает. Как только `https://github.com/sadam6752-tech/ioBroker.time-tracker` существует:

```powershell
npx @iobroker/repochecker@latest https://github.com/sadam6752-tech/ioBroker.time-tracker --local
```

`--local` Считывает файлы из рабочей директории (локальное состояние, а не из отправленного); метаданные репозитория по-прежнему поступают из GitHub. Для более высоких лимитов запросов GitHub можно передать токен. `--env <file>` содержащий `GITHUB_TOKEN=…`.

## Преднамеренные отклонения

- `common.compact: true` с 20.11.2026 (до `false` (см. решение D2): компактная группа экземпляра определяет, будет ли адаптер совместно использовать процесс; группа `0` продолжает этот процесс самостоятельно.
- Нет `process.env` /`process.exit` В исходном коде: конфигурация поступает исключительно из `adapter.config` И жизненный цикл адаптера завершает процесс. В совместно используемом процессе выход из программы также завершит работу других адаптеров.