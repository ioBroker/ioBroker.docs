---
chapters: {"pages":{"en/adapterref/iobroker.lovelace/README.md":{"title":{"en":"ioBroker.lovelace"},"content":"en/adapterref/iobroker.lovelace/README.md"},"en/adapterref/iobroker.lovelace/docs/en/README.md":{"title":{"en":"ioBroker.lovelace — Documentation"},"content":"en/adapterref/iobroker.lovelace/docs/en/README.md"},"en/adapterref/iobroker.lovelace/docs/en/entities.md":{"title":{"en":"Entities"},"content":"en/adapterref/iobroker.lovelace/docs/en/entities.md"},"en/adapterref/iobroker.lovelace/docs/en/cards_and_ui.md":{"title":{"en":"Custom cards, themes & UI tips"},"content":"en/adapterref/iobroker.lovelace/docs/en/cards_and_ui.md"},"en/adapterref/iobroker.lovelace/docs/en/features.md":{"title":{"en":"Features"},"content":"en/adapterref/iobroker.lovelace/docs/en/features.md"},"en/adapterref/iobroker.lovelace/docs/en/theme_migration.md":{"title":{"en":"Migrating themes (2026 frontend update)"},"content":"en/adapterref/iobroker.lovelace/docs/en/theme_migration.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.lovelace/README.md
title: ioBroker.lovelace
hash: EO9cuJNYuYhGtpkqPzs1wp8nO+IqMqv+/1dMMVu4GZM=
---
![Логотип](../../../en/adapterref/iobroker.lovelace/admin/lovelace.png)

![Количество установок](http://iobroker.live/badges/lovelace-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.lovelace.svg)
![Тестирование и выпуск](https://github.com/ioBroker/iobroker.lovelace/workflows/Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/lovelace/svg-badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.lovelace.svg)

# IoBroker.lovelace
## Адаптер Lovelace для ioBroker
С помощью этого адаптера вы можете создавать визуализации для ioBroker с использованием пользовательского интерфейса Home Assistant Lovelace.

## Документация
* 📘 [Документация на английском языке](/#/docs/adapterref/iobroker.lovelace/docs/en/README.md)
* 📗 [Немецкая документация](https://github.com/ioBroker/ioBroker.lovelace/blob/master/docs/de/README.md)

В документации рассматриваются вопросы настройки (автоматические/ручные параметры), панели и специальные элементы (будильник, таймер, погода, карта, видео и т. д.), пользовательские карточки, темы оформления, значки, уведомления, голосовое управление и устранение неполадок.

## Разработка
### Оригинальные источники для Лавлейс
Исходный код использован здесь: https://github.com/GermanBluefox/home-assistant-polymer.

### Todo
Права доступа должны обеспечиваться за счет текущего пользователя, а не за счет default_user.

### Версия
Используемая версия home-assistant-frontend@20260527.7. Версия Browser Mod: 2.13.5

### Как собрать новую версию Lovelace
Прежде всего, необходимо **вручную** объединить репозиторий https://github.com/home-assistant/frontend (ветка разработки) с репозиторием https://github.com/GermanBluefox/home-assistant-polymer.git (ветка ***iob***!).

Все изменения для ioBroker отмечены комментарием `// IoB`.
На данный момент (20260527.1) были изменены следующие файлы:

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
- `src/panels/config/ha-panel-config.ts` - скрыть вкладку интеграций в разделе «Устройства и службы», разместить плитку «Устройства и службы» в файле /config/devices.
- `src/panels/config/developer-tools/ha-panel-developer-tools.ts` - удалить вкладки YAML, событий и подсказок из инструментов разработчика.
- `src/panels/config/developer-tools/developer-tools-router.ts` - по умолчанию используется вкладка "Состояния" (YAML удален).
- `src/panels/config/info/ha-config-info.ts` - скрыть ссылки doc/credits/community/license в about (сохранить сочетания клавиш).
- `src/panels/config/lovelace/dashboards/ha-config-lovelace-dashboards.ts` - отображать фиксированные панели (включая browser-mod) в списке встроенных панелей мониторинга.
- `src/panels/profile/ha-panel-profile.ts` - скрыть вкладку безопасности в профиле пользователя.
- `src/util/documentation-url.ts` - ссылка на справку iobroker вместо Home Assistant.
- `src/html/index.html.template` - удалить интеллектуальный баннер приложения Safari (метаданные apple-itunes-app) для приложения HA iOS (#418).
- `.husky/pre-commit` - удалить хуки для коммитов Git.

После этого загрузите модифицированную версию в папку `./build`. Затем.

1. Перейдите в каталог ./build.
2. `git clone https://github.com/GermanBluefox/home-assistant-polymer.git` - это форк https://github.com/home-assistant/frontend.git, но некоторые вещи в нём изменены (см. список файлов выше).
3. `cd home-assistant-polymer`
4. `git checkout master`
5. `yarn install`
6. `gulp build-app` для релизной версии или `gulp develop-iob` для отладочной. Для сборки веб-версии после внесения изменений можно вызвать `webpack-dev-app` для более быстрой сборки, но в любом случае необходимо вызвать `build-app` после того, как версия будет готова к использованию.
7. Запустите скрипт `hass_frontend/static_cards/newFrontend.sh` в репозитории адаптера, чтобы обновить фронтенд (предполагается, что два репозитория находятся рядом друг с другом в одной папке; если это не так, пожалуйста, доработайте скрипт, желательно с обработкой параметров, и создайте запрос на слияние, спасибо :smile: )
8. Запустите задачу `gulp rename`.
9. Обновите версию в файле `README.md`.

## Changelog

<!--
	PLACEHOLDER for the next version:
	### **WORK IN PROGRESS**
    ### for next frontend update, update of auto entities card will be necessary!
-->
### **WORK IN PROGRESS**
* (Garfonso/Claude) Fixed custom cards that fetch history directly (e.g. the windrose card) crashing with "TypeError: t.callback is not a function": a one-shot history request was answered like a subscription. (#722)

### 6.1.3 (2026-09-01)
* (Garfonso/Claude) Fixed auto-generated entity_ids growing longer and longer within a single start for devices sharing a generated display name and having no own readable state (e.g. several buttons named the same): they no longer collapse onto the same internal registry key and overwrite each other's name.
* (Garfonso/Claude) Fixed the energy dashboard's power graph showing "no data" for the whole day on some history backends: the "5minute" statistics period used a 30-second bucket step instead of 5 minutes, requesting 10x more buckets than needed.
* (Garfonso/Claude) Fixed the current power missing in the energy dashboard ("Stromquellen" on the summary tab and the "Jetzt" tab) while all other cards showed it: the power sensor picked for a grid/battery source was not passed on to those cards. Existing configurations are fixed automatically on start.
* (Garfonso/Claude) Devices that report a battery level (`value.battery`) now get a battery sensor entity, so the charge level is visible and can be graphed - previously only the low-battery warning was used. This also removes the "Unknown state BATTERY" log message. (#718)

### 6.1.2 (2026-07-20)
* (Garfonso/Claude) History and logbook no longer show duplicate adjacent entries when the history backend re-logs unchanged values (e.g. InfluxDB "still record the same values"). (#711)
* (Garfonso/Claude) Energy/statistics graphs no longer draw a phantom line into the future when the requested range ends after now (e.g. History carrying the last value forward).
* (Garfonso/Claude) A browser with a broken browser_mod id (e.g. `[object Object]` in its localStorage) no longer spams "Used invalid characters" warnings: the id is sanitized, the client is asked to pick a fresh id, and leftover invalid instance objects are cleaned up on start.
* (Garfonso/Claude) Fixed simple on/off lights with a separate read-only state (`ON_ACTUAL`): the real device state is subscribed again and pushed to the UI.

### 6.1.1 (2026-06-25)
* (Garfonso/Claude) Fixed a crash (adapter restart loop) when a room enum has no name; the area list no longer brings the adapter down.
* (Garfonso/Claude) Custom dialog: device classes are sorted with clearer labels (id + unit), missing classes were added, device/state class can be cleared, and `has_time`/`has_date` no longer cause spurious "unsaved changes".
* (Garfonso/Claude) Auto-detected temperature/humidity/illuminance sensors now report `state_class: measurement` (for HA statistics).
* (Garfonso/Claude) Custom dialog: device class is suggested from the state's unit, and state class from the unit, when unambiguous.

### 6.1.0 (2026-06-23)
* (Garfonso/Claude) Remove HA-App Banner on iPhone (#418).
* (Garfonso/Claude) New manual entity types `device_tracker` and `person` to show presence/GPS on the map, with object pickers for the presence and location states.
* (Garfonso/Claude) Manual `cover` entities can now be configured with object pickers (e.g. an automatic window), reusing the full cover logic.
* (Garfonso/Claude) Reorganized the user documentation into matching English and German pages under `docs/en` / `docs/de` (entities, cards & UI, features), linked from the README; development/build notes stay in the README.
* (Garfonso/Claude) Fixed history/logbook stopping to load after a while (a hung history request could permanently block all following ones).
* (Garfonso/Claude) Manual `lock` and `media_player` entities can now be configured with object pickers for their states.
* (Garfonso/Claude) Vacuum cleaners are now supported (auto-detection + manual object pickers): start/stop/pause, fan speed and battery.
* (Garfonso/Claude) New manual entity types `humidifier` and `water_heater`, configurable with object pickers.
* (Garfonso/Claude) Manual `light` and `climate` (thermostat) entities can now be configured with object pickers (brightness/colour/temperature, target/mode/…), reusing the full converters.
* (Garfonso/Claude) Fixed room and function being swapped in the auto-generated name of advanced lights.
* (Garfonso/Claude) Manual `device_tracker`/`person` entities can get a picture (entity_picture) from a fixed URL or a state, plus a battery level and (device_tracker) a source type.
* (Garfonso/Claude) More manual-entity options: cover tilt open/close/stop, light white/RGBW/CIE colour states, sensor state class, humidifier device class.
* (Garfonso/Claude) Manual `fan` entities now have object pickers (on/off, speed/preset, oscillation, direction).
* (Garfonso/Claude) Vacuum can show its map (URL or base64 state) as the entity picture.
* (Garfonso/Claude) Removed `plant`, `weblink` and `history_graph` from the manual entity types (no longer Home Assistant entity domains).

### 6.0.4 (2026-06-18)
* (Garfonso/Claude) Bound the number of history points fetched per request, so a large history graph can no longer overload the states database.
* (Garfonso/Claude) Manual entities on `system.*`/`script.*` objects (e.g. a JavaScript adapter state) no longer disappear after a restart. (#709)
* (Garfonso/Claude) Manual entities now honor the friendly name and icon set via the frontend's entity settings, and editing them no longer briefly reverts the change.

[Older changelogs can be found there](https://github.com/ioBroker/ioBroker.lovelace/blob/master/CHANGELOG_OLD.md)

## License

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