---
chapters: {"pages":{"en/adapterref/iobroker.lovelace/README.md":{"title":{"en":"ioBroker.lovelace"},"content":"en/adapterref/iobroker.lovelace/README.md"},"en/adapterref/iobroker.lovelace/docs/en/README.md":{"title":{"en":"ioBroker.lovelace — Documentation"},"content":"en/adapterref/iobroker.lovelace/docs/en/README.md"},"en/adapterref/iobroker.lovelace/docs/en/entities.md":{"title":{"en":"Entities"},"content":"en/adapterref/iobroker.lovelace/docs/en/entities.md"},"en/adapterref/iobroker.lovelace/docs/en/cards_and_ui.md":{"title":{"en":"Custom cards, themes & UI tips"},"content":"en/adapterref/iobroker.lovelace/docs/en/cards_and_ui.md"},"en/adapterref/iobroker.lovelace/docs/en/features.md":{"title":{"en":"Features"},"content":"en/adapterref/iobroker.lovelace/docs/en/features.md"},"en/adapterref/iobroker.lovelace/docs/en/theme_migration.md":{"title":{"en":"Migrating themes (2026 frontend update)"},"content":"en/adapterref/iobroker.lovelace/docs/en/theme_migration.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.lovelace/README.md
title: ioBroker.lovelace
hash: VC1XPNU05i1xpFKeOVE4onp8DHpqPco7kok22QNOj9I=
---
![Логотип](../../../en/adapterref/iobroker.lovelace/admin/lovelace.png)

![Количество установок](https://iobroker.live/badges/lovelace-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.lovelace.svg)
![Тестирование и выпуск](https://github.com/ioBroker/iobroker.lovelace/workflows/Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/lovelace/svg-badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.lovelace.svg)

# IoBroker.lovelace
## Адаптер Lovelace для ioBroker
С помощью этого адаптера вы можете создавать визуализации для ioBroker с использованием пользовательского интерфейса Home Assistant Lovelace.

## Документация
* 📘 [Документация на английском языке](/#/docs/adapterref/iobroker.lovelace/docs/en/README.md)
* 📗 [Немецкая документация](https://github.com/ioBroker/ioBroker.lovelace/blob/master/docs/de/README.md)

Документация охватывает настройку (автоматические/ручные параметры), панели и специальные элементы (будильник, таймер, погода, карта, видео и т. д.), пользовательские карточки, темы оформления, значки, уведомления, голосовое управление и устранение неполадок.

## Разработка
### Оригинальные источники для Лавлейс
Исходный код использован здесь: https://github.com/GermanBluefox/home-assistant-polymer.

### Todo
Права доступа должны обеспечиваться за счет текущего пользователя, а не за счет default_user.

### Версия
Используемая версия home-assistant-frontend@20260930.3. Версия Browser Mod: 3.3.0

### Как собрать новую версию Lovelace
Прежде всего, необходимо **вручную** объединить репозиторий https://github.com/home-assistant/frontend (ветка разработки) с репозиторием https://github.com/GermanBluefox/home-assistant-polymer.git (ветка ***iob***!).

Все изменения для ioBroker отмечены комментарием `// IoB`.
На данный момент (20260930.3) были изменены следующие файлы:

- `build-scripts/gulp/app.js` - Добавить новую задачу gulp develop-iob
- `build-scripts/gulp/rspack.js` - Добавить новую задачу gulp rspack-dev-app
- `build-scripts/rspack.cjs` - отключить карты исходного кода в сборке продакшена, чтобы уменьшить количество генерируемых файлов.
- `src/data/icons.ts` - пока сохранить старые иконки.
- `src/data/weather.ts` - добавлена поддержка отображения значка погоды по URL-адресу.
- `src/dialogs/more-info/const.ts` - удалить состояние погоды и историю, если это изображение.
- `src/dialogs/more-info/ha-more-info-dialog.ts` - удалить кнопку и вкладку настроек сущности.
- `src/dialogs/more-info/ha-more-info-history.ts` - удалить ссылку `show more` в истории
- `src/dialogs/more-info/ha-more-info-logbook.ts` - удалить ссылку `show more` в логбуке
- `src/dialogs/more-info/controls/more-info-weather.ts` - добавлена поддержка отображения значка погоды по URL-адресу.
- `src/dialogs/voice-command-dialog/ha-voice-command-dialog.ts` - отключить настройку голосовых помощников
- `src/entrypoints/core.ts` - добавить опцию без аутентификации
- `src/panels/lovelace/cards/hui-weather-forecast-card.ts` - добавлена поддержка отображения значка погоды по URL-адресу.
- `src/panels/lovelace/entity-rows/hui-weather-entity-row.ts` - добавлена поддержка отображения значка погоды по URL-адресу с авторизацией.
- `src/panels/lovelace/hui-root.ts` - добавлена кнопка уведомлений, отключена ссылка «Управление панелями мониторинга», скрыта кнопка «Добавить (устройство/автоматизация/область/человек)», открыто диалоговое окно редактирования панели для досок Lovelace, заголовок панели мониторинга в реальном времени из hass.panels
- `src/layouts/hass-router-page.ts` - защита updatePageEl от неопределенного маршрута во время перестройки (сбой при переименовании панели).
- `src/panels/config/dashboard/ha-config-dashboard.ts` - скрыть разделы настроек (автоматизация, приложения, голосовые помощники, система, люди, подсказки).
- `src/panels/config/config-sections.ts` - скрыть вкладку «Интеграции» в разделе «Устройства и службы», разместить плитку «Устройства и службы» в файле /config/devices.
- `src/panels/config/tools/ha-panel-tools.ts` - удалить вкладки YAML, событий и подсказок из инструментов разработчика.
- `src/panels/config/tools/tools-router.ts` - по умолчанию используется вкладка "Состояния" (YAML удален).
- `src/panels/config/info/ha-config-info.ts` - скрыть ссылки doc/credits/community/license в about (сохранить сочетания клавиш).
- `src/panels/config/lovelace/dashboards/ha-config-lovelace-dashboards.ts` - отображать фиксированные панели (включая browser-mod) в списке встроенных панелей мониторинга.
- `src/panels/profile/ha-profile-dashboard.ts` - скрыть вкладку безопасности в профиле пользователя.
- `src/util/documentation-url.ts` - ссылка на справку iobroker вместо Home Assistant.
- `src/html/index.html.template` - удалить интеллектуальный баннер приложения Safari (метаданные apple-itunes-app) для приложения HA iOS (#418).
- `.husky/pre-commit` - удалить хуки для коммитов Git.

После этого загрузите модифицированную версию в папку `./build`. Затем.

1. Перейдите в каталог ./build.
2. `git clone https://github.com/GermanBluefox/home-assistant-polymer.git` - это форк https://github.com/home-assistant/frontend.git, но некоторые вещи в нём изменены (см. список файлов выше).
3. `cd home-assistant-polymer`
4. `git checkout master`
5. `pnpm install` (фронтенд перешёл с Yarn на pnpm; если pnpm отсутствует, выполните `corepack enable` или `npm i -g pnpm@11.28.0`).
6. `pnpm exec gulp build-app` для релизной версии или `pnpm exec gulp develop-iob` для отладочной версии. Для сборки веб-версии после внесения изменений можно вызвать `pnpm exec gulp webpack-dev-app` для более быстрой сборки, но в любом случае необходимо вызвать `build-app` после того, как версия будет готова к использованию.
7. Запустите скрипт `hass_frontend/static_cards/newFrontend.sh` в репозитории адаптера, чтобы обновить фронтенд (предполагается, что два репозитория находятся рядом друг с другом в одной папке; если это не так, пожалуйста, доработайте скрипт, желательно с обработкой параметров, и создайте запрос на слияние, спасибо :smile: )
8. Запустите `npm run rename` (переименовывает и перезаписывает скопированный интерфейс для ioBroker; эта задача заменила предыдущую задачу `gulp rename`).
9. Обновите версию в файле `README.md`.

## Changelog

<!--
	PLACEHOLDER for the next version:
	### **WORK IN PROGRESS**
    ### for next frontend update, update of auto entities card will be necessary!
-->
### 7.4.1 (2026-10-22)
* (Garfonso/Claude) Conditional cards and the `visibility` of cards, badges, sections and views work again: the new frontend asks the server to evaluate the conditions (`subscribe_condition`), which the adapter answered with "Unknown request" before, so everything conditional stayed hidden.

### 7.4.0 (2026-10-21)
* (Garfonso/Claude) A manually mapped `binary_sensor` has a checkbox next to the device class to invert its state, for an ioBroker state that is true when the device is not in the shown state.
* (Garfonso/Claude) A manually mapped `binary_sensor` on a state whose role ends in `.unreach` is inverted, not only on the old role `indicator.unreach`.
* (Garfonso/Claude) The extra entities of a detected device (connectivity, battery, error, maintenance, working, power, energy) are named after the device, so they are no longer all called "UNREACH" or similar.
* (Garfonso/Claude) The labels of those extra entities are translated, and a name you wrote on the ioBroker object yourself is kept.
* (Garfonso/Claude) An `input_datetime` on a state without a date (null) is unknown instead of a dummy date, and no longer warns about it. (#768)

### 7.3.0 (2026-10-18)
* (Garfonso/Claude) Updated the Home Assistant frontend to 20260930.3: the map no longer flickers while loading history and its tiles stay cached, and the digital-clock card can take its font from the theme.
* (Garfonso/Claude) The map tile proxy now checks the access token the frontend sends, instead of serving anyone who can reach the port.
* (Garfonso/Claude) Static files are found again when the frontend asks for them with a cache buster, so the map keeps its style and its icons.
* (Garfonso/Claude) Dropped the map sprite proxy: since the new map style the frontend brings the map icons along itself.
* (Garfonso/Claude) New entity type `image`: an ioBroker state holding a picture can be mapped to it, and the picture can then be picked as a card or view background.
* (Garfonso/Claude) A unit typed into the object settings is kept, and defaults are only filled in for the entity type that uses them.
* (Garfonso/Claude) Blinds that only have up, down and stop buttons keep both arrows usable, and after a stop they report an unknown position instead of staying "opening".
* (Garfonso/Claude) Templates are rendered with the variables a card sends along (needed by `custom:template-entity-row`) and know the area and device functions.
* (Garfonso/Claude) Updated the type detector: a device that is assigned to a function enum as a whole now also detects its channels (a dimmer in the function "Light", for example), and consumption is read from the documented role `value.energy.consumed`.
* (Garfonso/Claude) Updated Browser Mod to 3.3.0: the profile page shows again which browser-specific default dashboard Browser Mod manages.
* (Garfonso/Claude) Templates can format dates: `now()` behaves like a datetime (`strftime`, `hour`, `timestamp()`), plus `as_datetime`, `today_at` and the `timestamp_*` filters.

### 7.2.5 (2026-10-16)
* (Garfonso/Claude) Editing the themes no longer loses the selected theme, and broken theme YAML cannot be saved any more.
* (Garfonso/Claude) Custom cards are cached again, so a dashboard in the ioBroker app loads them without asking the server every time. (#755)

### 7.2.4 (2026-10-09)
* (Garfonso/Claude) Custom cards that consist of several files (like refreshable-picture-card) work again. (#755)

## License

The full license text is in [LICENSE](https://github.com/ioBroker/ioBroker.lovelace/blob/master/LICENSE).

Copyright (c) 2019-2026, bluefox <dogafox@gmail.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.