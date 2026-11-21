---
chapters: {"pages":{"en/adapterref/iobroker.sehybrid/README.md":{"title":{"en":"ioBroker adapter for SolarEdge hybrid inverters"},"content":"en/adapterref/iobroker.sehybrid/README.md"},"en/adapterref/iobroker.sehybrid/README_dev.md":{"title":{"en":"ioBroker.sehybrid — Developer Guide"},"content":"en/adapterref/iobroker.sehybrid/README_dev.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sehybrid/README_dev.md
title: ioBroker.sehybrid - Руководство для разработчиков
hash: SIA+tJeIFy8BLcbDPSo3Zq9sx0ayF00fjQB5tgaPy20=
---
# ioBroker.sehybrid — Руководство для разработчиков

Разработайте, протестируйте и выпустите документацию для адаптера **sehybrid** . Документацию для пользователей см. в [файле README.md](/#/adapters/sehybrid) .

## Планировка проекта

Адаптер состоит из двух частей:

- **Бэкенд** (сам адаптер) — TypeScript `src/`, скомпилировано с `build-adapter ts` в `build/`.
- **Административный интерфейс** (страница конфигурации) — декларативный диалог [jsonConfig](https://github.com/ioBroker/ioBroker.admin/tree/master/packages/jsonConfig) в `admin/jsonConfig.json` с постраничными метками/текстами ошибок для каждого языка. `admin/i18n/<lang>.json` В данном случае отсутствует приложение на React/Vite/TypeScript и этап сборки для административного интерфейса — административная панель ioBroker отображает диалоговое окно непосредственно из зафиксированного JSON-файла.

`npm run lint` и `npm run check` Это касается только бэкэнда; административный интерфейс представляет собой обычный JSON и не требует компиляции.

> `build/` Это сгенерированный результат, который **не** был добавлен в Git. Он создан с помощью `npm run build` Исходный код административного интерфейса (`admin/jsonConfig.json`, `admin/i18n/*.json`, `admin/sehybrid.png`) добавляется напрямую. Оба включены в опубликованный npm-пакет через `files` поле в `package.json`.

## Предварительные требования

- Node.js >= 22
- Локальная среда ioBroker предоставляется через `@iobroker/dev-server` (Установлено как зависимость для разработки).

## Начиная

Установите зависимости:

```bash
npm install
```

Соберите бэкэнд (для административного интерфейса этап сборки не требуется):

```bash
npm run build
```

## Работает в стадии разработки.

Запустите ioBroker локально с помощью `dev-server` (администратор на <http://localhost:8081> ):

```bash
npm run dev-server        # admin-UI work: admin only, adapter not started
npm run dev-server:watch  # backend work: runs the adapter and restarts it on src/ changes
```

Использовать `dev-server:watch` при изменении кода бэкэнда в `src/` Таким образом, перекомпилированный адаптер автоматически перезапускается. Простой `dev-server` Запускается только административная панель (более лёгкий режим при работе на странице администрирования).

> Административный интерфейс не требует этапа сборки. После редактирования `admin/jsonConfig.json` или `admin/i18n/*.json` внесите изменения с помощью `npm run dev-server:upload` и обновите страницу в браузере — ничего перестраивать не нужно.

> Он `dev-server` скрипт запускается с `--noBrowserSync` Это сделано намеренно. BrowserSync (автоматическая перезагрузка браузера) мешает подключению административной панели через socket.io, из-за чего пользовательский интерфейс постоянно переподключается. Без него административный WebSocket подключается напрямую и надежно; вам просто нужно вручную обновить браузер после внесения изменений. Чтобы попробовать вариант с автоматической перезагрузкой, используйте `npm run dev-server:sync`.

## npm скрипты

Беги с `npm run <name>`.

| Сценарий            | Описание                                                                                                                              |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `build`             | Встройте бэкенд (TypeScript) в `build/`.                                                                                              |
| `build:ts`          | Встраивайте в систему только бэкэнд. `build/`.                                                                                        |
| `watch:ts`          | При внесении изменений необходимо перестраивать бэкэнд.                                                                               |
| `dev-server`        | Запустите административную панель ioBroker для разработки административного интерфейса (адаптер не запущен, BrowserSync не работает). |
| `dev-server:sync`   | То же самое, что и `dev-server` с автоматической перезагрузкой через BrowserSync.                                                      |
| `dev-server:watch`  | Запустите ioBroker **и** адаптер в режиме наблюдения (адаптер перезапускается при...). `src/` изменения).                              |
| `dev-server:upload` | Загрузите адаптер (необходим после этого). `io-package.json`, `admin/jsonConfig.json`, или `admin/i18n/*.json` изменения).             |
| `test:ts`           | Запустите `*.test.ts` модульные тесты.                                                                                                 |
| `test:package`      | Проверить `package.json` и `io-package.json`.                                                                                          |
| `test:integration`  | Проверьте запуск адаптера на реальном экземпляре ioBroker.                                                                            |
| `test`              | Запустите модульные тесты и проверку пакетов.                                                                                         |
| `check`             | Проверка типов бэкэнда (без компиляции).                                                                                              |
| `lint`              | Проверьте бэкэнд с помощью ESLint.                                                                                                    |
| `translate`         | Перевод административного текста, см.[`@iobroker/adapter-dev`](https://github.com/ioBroker/adapter-dev#manage-translations) .         |
| `release`           | Создайте новый релиз, см.[`@alcalzone/release-script`](https://github.com/AlCalzone/release-script#usage) .                           |

## Конфигурация компиляции

Бэкенд компилируется с помощью [esbuild.](https://esbuild.github.io/) `@iobroker/adapter-dev`; отрегулируйте настройки в `tsconfig.json` /`tsconfig.build.json` Административный интерфейс не включает этап компиляции: он декларативный. `admin/jsonConfig.json` плюс `admin/i18n/<lang>.json` файлы перевода, которые администратор ioBroker отображает напрямую. Чтобы изменить диалоговое окно конфигурации, отредактируйте эти JSON-файлы напрямую и отправьте их с помощью `npm run dev-server:upload`.

## Тестирование

- **Модульные тесты** (`npm run test:ts`) — быстро, вопреки чистой логике в `src/lib`.
- **Проверка пакета** (`npm run test:package`) — чеки `package.json` /`io-package.json` последовательность.
- **Интеграционный тест** (`npm run test:integration`) — запускает настоящий js-контроллер и проверяет запуск адаптера. Работает медленнее (\~30 с).

Чтобы выполнить локальную проверку CI перед отправкой изменений:

```bash
npm ci && npm run lint && npm run check && npm run build && npm run test:ts && npm run test:package && npm run test:integration
```

При добавлении новых функций или исправлении ошибок добавляйте соответствующие модульные тесты. Для получения дополнительной информации см. раздел [«Разработка через тестирование»](https://hackernoon.com/introduction-to-test-driven-development-tdd-61a13bc92d92) .

### Государственные роли

Используйте правильную [роль](https://www.iobroker.net/#en/documentation/dev/stateroles.md) для каждого штата. Не придумывайте собственные названия ролей; если вам нужна роль, которой нет в официальном списке, обратитесь к сообществу разработчиков ioBroker.

## Рабочий процесс Git

- Работа над `dev` ветка; открыть запрос на слияние в `main`.
- `main` Это ветка релиза. Отправка изменений в... `main` запросы на слияние и `v*` теги запускают CI (`.github/workflows/test-and-release.yml`).
- Только теги версий (`v<major>.<minor>.<patch>`) запустить `deploy` Задача, которая публикует контент в npm.

## Выпуск

Создайте релиз с помощью [скрипта релиза](https://github.com/AlCalzone/release-script#usage) из чистой копии. `main`:

```bash
npm run release
```

Это повышает версию, обновляет `io-package.json` а также список изменений, коммиты, теги. `v<version>` и нажимает. Нажатие тега запускает `deploy` задача, которая собирает и публикует проект в npm.

### npm trusted publishing (OIDC)

Релизы публикуются в npm с использованием **доверенной публикации** (OIDC) — нет `NPM_TOKEN` хранится. `deploy` работа имеет `id-token: write` При публикации npm обменивает кратковременный токен, а также генерирует подписанное подтверждение происхождения.

Настройка доверенной публикации выполняется один раз на странице настроек пакета npm. `https://www.npmjs.com/package/iobroker.sehybrid` → Настройки → Доверенный издатель) с помощью:

- Организация или пользователь: `heresiarch`
- Репозиторий: `ioBroker.sehybrid`
- Имя файла рабочего процесса: `test-and-release.yml`
- Название среды: _(пусто)_
- Для прямой публикации необходимо установить флажок **«Разрешить публикацию через npm»** (и сохранить изменения).

> Для настройки доверенного издателя npm требует, чтобы пакет уже существовал, поэтому самую первую версию необходимо опубликовать один раз из командной строки.

Чтобы добавить адаптер в репозиторий ioBroker, следуйте [инструкциям в файле requirements.txt ioBroker.repositories](https://github.com/ioBroker/ioBroker.repositories#requirements-for-adapter-to-get-added-to-the-latest-repository) .

## Передовые методы

Ознакомьтесь с [рекомендациями по разработке](https://github.com/ioBroker/ioBroker.repositories#development-and-coding-best-practices) ioBroker.

## Отказ от ответственности

При использовании названий или логотипов компаний соблюдайте авторские права и права на товарные знаки. «SolarEdge» является товарным знаком соответствующего владельца; данный адаптер — независимый, неофициальный проект, не связанный с компанией SolarEdge и не одобренный ею.