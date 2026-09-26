---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.xtream-monitor/README.md
title: ioBroker.xtream-monitor
hash: p62IrAbDJCtPI5BQEKjdU1x/rSCnW9gJbl3/q9EmaiU=
---
# ioBroker.xtream-monitor

Отслеживает доступность и метаданные учетных записей пользовательских API-интерфейсов, совместимых с Xtream.

Адаптер является исключительно инструментом мониторинга. Он **не** предоставляет, не обнаруживает, не выступает в качестве прокси-сервера, не воспроизводит и не распространяет медиапотоки. Пользователи несут ответственность за конечные точки и службы, которые они настраивают.

## Функции

- Отслеживайте состояние нескольких конечных точек в одном экземпляре адаптера.
- Онлайн/офлайн и статус учетной записи
- Время отклика
- Количество активных и максимальное количество подключений
- Срок действия и оставшееся количество дней
- Отметки времени последней проверки, последнего подключения к сети и отключения от сети.
- Классификация ошибок, связанных с таймаутом, DNS, HTTP, недействительным ответом и неактивными учетными записями.
- Ведение журнала является необязательным и происходит только при фактическом изменении состояния онлайн/офлайн.
- Сводные данные о состоянии визуализаций для VIS, Grafana и других приложений ioBroker.

## Требования

- Node.js 22 или новее
- js-controller 7.0.7 или более поздняя версия
- Администратор 7.8.23 или более поздняя версия

## Конфигурация

Добавьте одну или несколько конечных точек в настройки адаптера. Каждая строка содержит:

- **Включено** — включить конечную точку в мониторинг.
- **Название** — удобная для пользователя метка
- **URL хоста/сервера** — базовый URL-адрес конечной точки, совместимой с Xtream.
- **Имя пользователя** - имя учетной записи
- **Пароль** — пароль учетной записи; в конфигурации таблицы для этого столбца запрашивается зашифрованное хранение данных.

Также можно настроить интервал опроса, время ожидания запроса и, при необходимости, ведение журнала изменений статуса.

Технические идентификаторы серверов (`server1`, `server2`, ...) управляются внутри системы и не отображаются в административном интерфейсе.

## Структура объекта

```text
xtream-monitor.0
├── info
│   ├── connection
│   ├── allOnline
│   ├── enabledCount
│   ├── onlineCount
│   ├── offlineCount
│   └── lastCheck
└── servers
    ├── server1
    │   ├── online
    │   ├── status
    │   ├── responseMs
    │   ├── activeConnections
    │   ├── maxConnections
    │   ├── expiration
    │   ├── expirationText
    │   ├── daysRemaining
    │   ├── lastCheck
    │   ├── lastOnline
    │   ├── offlineSince
    │   └── errorType
    └── ...
```

## Конфиденциальность и безопасность

- Адаптер взаимодействует только с конечными точками, явно указанными пользователем.
- Учетные данные никогда намеренно не записываются в журнал ioBroker.
- В таблице Admin столбцы с паролями настроены для зашифрованного хранения.
- Полная конфигурация сервера защищена от доступа со стороны других сетевых адаптеров. `protectedNative`.
- Для мониторинга медиаконтент не загружается; адаптер запрашивает метаданные учетной записи/статуса через совместимую конечную точку API.

## Разработка

```bash
npm install
npm run build
npm run check
npm run lint
npm run test:package
npm run test:integration
```

Проверки репозитория можно выполнить с помощью следующих команд:

```bash
npx @iobroker/repochecker https://github.com/chrvidal/ioBroker.xtream-monitor main
```

## Changelog

### 0.2.11 (2026-09-11)

- Prevented request error states from exposing credentials.
- Added regression coverage for credential-safe request errors.
- Added Node.js 26 to the GitHub Actions test matrix.
### 0.2.10 (2026-09-02)

- Added a compatibility fallback for passwords affected by the ioBroker JSON Config table-encryption regression.
- Automatically remove stale server objects after the corresponding server is deleted from the configuration.
- Added regression tests for password compatibility and deleted-server cleanup.

### 0.2.9 (2026-09-01)

- Fixed startup handling during persistent server ID migration.
- Added regression coverage for password preservation and scheduled multi-server polling.
- Corrected protected configuration metadata for multi-server credentials.

### 0.2.8 (2026-08-31)

- Changed polling to schedule the next check only after the current cycle has finished, preventing overlapping API requests.
- Abort active HTTP requests during adapter unload for clean Compact Mode shutdown.
- Preserve `offlineSince` across adapter restarts while an endpoint remains offline.
- Added the explicit `info` channel and corrected per-server ioBroker state roles.
- Changed `expirationText` to a language-neutral ISO timestamp.
- Protected the configured server table from access by other adapters.
- Added integration tests with local mock API endpoints, including clean-shutdown behavior.

### 0.2.7 (2026-08-30)

- Fixed repository metadata reported by the ioBroker repository checker.
- Added valid `common.news` metadata for the current release.
- Relaxed the `@iobroker/testing` devDependency to a compatible semver range.
- Added Dependabot cooldown configuration.
- Added the required license copyright line.

### 0.2.6 (2026-08-30)

- Prepared repository metadata for ioBroker public repository review.
- Added all required metadata translations and Admin translations.
- Added a responsive Admin layout and table-level password encryption configuration.
- Added package and integration test scaffolding plus GitHub Actions CI.
- Replaced unmanaged JavaScript timers with ioBroker adapter-managed timers.
- Added adapter icon, Dependabot configuration and editor JSON schemas.

### 0.2.5 (2026-08-30)

- Removed the technical server ID column from the Admin UI while keeping persistent internal IDs.

### 0.2.4 (2026-08-30)

- Improved persistent internal server-ID assignment and Admin compatibility.

### 0.2.3 (2026-08-30)

- Fixed GitHub installation by including the compiled adapter entry point.

### 0.2.2 (2026-08-30)

- Simplified server-ID handling in the Admin UI.

### 0.2.1 (2026-08-30)

- Added automatic technical server IDs.

### 0.2.0 (2026-08-30)

- Added monitoring of multiple endpoints in one adapter instance.

## License

MIT License. See [LICENSE](https://github.com/chrvidal/ioBroker.xtream-monitor/blob/main/LICENSE).

Copyright (c) 2026 Christian Vidal <christian_vidal@icloud.com>