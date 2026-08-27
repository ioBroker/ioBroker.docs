---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.fairland/README.md
title: ioBroker Fairland Adapter
hash: X2QwLc1+dUvRr56EPEdbbWE9NoapNldpVRKI+GskoR0=
---
# Адаптер ioBroker Fairland
Неофициальный адаптер ioBroker для тепловых насосов для бассейнов Fairland и насосов для бассейнов, использующих облачный API Fairland **iGarden**.

Информация о производителе/продукции: https://www.fairland.com.cn/

Этот адаптер взаимодействует напрямую с облаком iGarden. Он не использует Tuya и не поддерживает устройства Fairland, сопряженные через приложение SmartPool.

## Поддерживаемые устройства
- Тепловые насосы для бассейнов Fairland на платформе iGarden
- Насосы для бассейнов Fairland Inverflow Plus на платформе iGarden
- Устройства iGarden под чужими брендами, например, насосы для бассейнов Madimack.

В настоящее время адаптер распознает категории устройств `heatPump` и `waterPump`.
Неизвестные категории регистрируются и пропускаются.

Данный проект не связан с компанией Fairland, Home Assistant, ioBroker или разработчиками проекта ha-fairland, не поддерживается ими и не получает от них одобрения.

## Установка
Адаптер опубликован на npm под номером `iobroker.fairland`.

Запрос на добавление адаптера в официальный репозиторий ioBroker был отправлен. После добавления адаптера в официальный репозиторий ioBroker его можно будет установить непосредственно из списка адаптеров в административной панели ioBroker.

## Требования
- Node.js 22 или более поздняя версия
- ioBroker js-controller 6.0.11 или новее
- ioBroker Admin 7.8.23 или более поздняя версия

Для местного развития:

```bash
npm run build
```

Дополнительные команды разработки:

```bash
npm run lint
npm run translate
npm run release
```

## Конфигурация
Конфигурация экземпляра содержит:

- `адрес электронной почты учетной записи iGarden`: имя учетной записи, используемое в приложении iGarden.
- `Пароль iGarden`: пароль учетной записи
- `Страна входа`: необязательный код страны, используемый для входа в iGarden. Оставить

`Automatic` если ваша учетная запись работает без явного указания кода страны.

- `Интервал сканирования`: интервал опроса в секундах, минимум 10 секунд, максимум

3600 секунд

- `Идентификатор внутреннего двора`: необязательный динамический выбор из облака iGarden. Уйти

`Automatic` использовать первый внутренний двор, возвращенный облаком.

- `Создать необработанные состояния dpId`: необязательные диагностические состояния в разделе

`devices.<device>.raw.dp_<id>`

Адаптер автоматически определяет правильный региональный API-сервер:

- ЕС: `api-eu.fairlandiot.com`
- США: `api-us.fairlandiot.com`
- CN: `api-cn.fairlandiot.com`
- Гонконг: `api-hk.fairlandiot.com`

## Важное ограничение iGarden
Облачная платформа iGarden обычно разрешает только одну активную сессию на учетную запись. Если адаптер подключен, мобильное приложение iGarden может отображать устройство как находящееся в автономном режиме, и может произойти обратное.

Рекомендуемое решение: создайте вторую учетную запись iGarden, предоставьте доступ к устройству этой учетной записи в приложении iGarden и настройте ioBroker с использованием второй учетной записи.

## Структура государства
Ниже представлены устройства, созданные следующим образом:

```text
fairland.0.devices.<deviceId>
```

Общие штаты:

```text
info.name
info.category
info.version
power.switch
```

В число штатов, где используются тепловые насосы, входят:

```text
temperature.current
temperature.target
temperature.outlet
temperature.ambient
power.current
hvac.mode
hvac.presetMode
hvac.action
performance.runningPercentage
config.*
diagnostic.*
```

В число штатов, где установлены водяные насосы, входят:

```text
pump.speedSetpoint
pump.runningRate
pump.backwashDuration
pump.backwashCountdown
power.current
energy.consumption
pump.mode
```

Записываемые состояния сопоставляются с правильным значением Fairland `dpId`. Адаптер сохраняет оптимистичные значения в течение короткого периода после записи, поскольку облаку iGarden может потребоваться несколько секунд, чтобы сообщить о вновь записанных значениях.

## Примечания к разработке
Реализация представляет собой порт логики интеграции Home Assistant Fairland/iGarden на TypeScript:

- Вход в облако и автоматическое определение регионального сервера
- обнаружение двора и устройства
- сопоставление `dpId` для конкретных категорий
- анализ масштаба и единиц измерения из `dpProperty`
- оптимистичная обработка записи

Строить:

```bash
npm run build
```

Точкой входа скомпилированного адаптера является `build/main.js`.

## Атрибуция
Этот адаптер создан на основе интеграции Home Assistant Fairland, распространяемой по лицензии MIT, автором которой является @siedi:

```text
https://github.com/siedi/ha-fairland
```

Оригинальное уведомление о лицензии на проект сохранено в `LICENSE`, а дополнительные уведомления третьих сторон перечислены в `THIRD_PARTY_NOTICES.md`.

## Changelog

### 0.2.16

- Translated the new admin configuration help texts for repository checks.

### 0.2.15

- Replaced the Courtyard ID text field with a dynamic iGarden courtyard dropdown.

### 0.2.14

- Fixed the water pump energy consumption state role.
- Added a configurable iGarden login country dropdown without a Germany default.
- Rescheduled write refresh polling when it overlaps with an active poll.

### 0.2.13

- Removed the reserved `ioBroker` keyword from adapter metadata.

### 0.2.12

- Restored the required default iGarden login country and phone codes.
- Prefer authentication errors over later regional timeout errors during API region detection.

### 0.2.11

- Added an official Fairland manufacturer link to the README.
- Enforced the configured scan interval range in adapter code.
- Reworked polling to schedule the next run after the current run finishes.
- Reused the last detected API region as startup hint.
- Moved mode and running percentage states into grouped channels.
- Cleaned stale channel metadata from upgraded object structures.

### 0.2.10

- Removed unpublished version 0.2.8 from adapter news.
- Added an ioBroker deploy action marker for repository checks while keeping the fixed trusted publishing flow.

### 0.2.9

- Replaced the release deploy step to avoid the broken npm 12 global publish path.
- Kept npm trusted publishing with provenance enabled for release tags.

### 0.2.8

- Added standard ioBroker package and integration tests.
- Updated npm test scripts to run the standard `@iobroker/testing` checks.
- Completed Russian and Ukrainian `io-package.json` news translations.

### 0.2.7

- Fixed the generated ioBroker object hierarchy for device objects.
- Moved the writable power switch to `power.switch` so `power.current` can use a valid channel parent.
- Replaced invalid mode roles with valid ioBroker state roles.

### 0.2.6

- Removed discouraged manual installation instructions from the README.

### 0.2.5

- Updated installation documentation after npm publication.
- Documented the pending official ioBroker adapter repository approval.

### 0.2.4

- Optimized the adapter icon image size.

### 0.2.3

- Converted admin i18n files to the short ioBroker format.
- Added VS Code JSON schema settings for ioBroker development.
- Added the release script manual review plugin.

### 0.2.2

- Removed unpublished historical versions from `io-package.json` news.

### 0.2.1

- Skip the npm deploy job until npm publishing is explicitly enabled for the repository.

### 0.2.0

- Added Dependabot update configuration and Dependabot auto-merge workflow.
- Added Node.js 22 TypeScript base configuration.
- Raised the minimum ioBroker Admin requirement to 7.8.23.

### 0.1.8

- Updated TypeScript to 6.0.3.
- Adjusted the TypeScript configuration for TypeScript 6.
- Added `CHANGELOG_OLD.md` for older changelog entries.

### 0.1.7

- Aligned Node.js type definitions with the supported Node.js 22 runtime.

### 0.1.6

- Completed admin UI i18n files for all standard ioBroker languages.

### 0.1.5

- Added the standard GitHub Actions test and release workflow.
- Added ioBroker development tooling for linting, translations, and releases.
- Replaced plain timers with ioBroker adapter timers or native abort timeouts.
- Removed direct GitHub installation instructions for repository checks.

### 0.1.4

- Added an adapter icon.
- Completed `io-package.json` translations for repository checks.

### 0.1.3

- Raised the minimum Node.js version to 22.
- Added `@iobroker/testing` as a development dependency.
- Updated package keywords for ioBroker repository checks.

### 0.1.2

- Fixed `diagnostic.powerDisplayStatus` state type for boolean Fairland API values.

### 0.1.1

- Fixed ioBroker package schema for GitHub installation.
- Added upstream license attribution and third-party notices.

### 0.1.0

- Initial ioBroker port of the Fairland iGarden integration.

Older changelog entries may be moved to [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License

MIT.

Copyright (c) 2026 dude2k.
Portions derived from ha-fairland: Copyright (c) 2025 @siedi.

See `LICENSE` for details.