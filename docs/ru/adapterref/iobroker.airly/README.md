---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.airly/README.md
title: ioBroker.airly
hash: popgyRv90eUL1n150zCAJ7SCNdSjdN37qDGQZVEbte8=
---
# IoBroker.airly
Адаптер считывает данные о качестве воздуха (PM2.5, PM10, индекс CAQI) для вашего местоположения из [Эйрли](https://airly.org).

## Конфигурация
| Обстановка | Смысл |
| ---------------- | --------------------------------------------------------------- |
| `apikey` | Ключ API Airly (developer.airly.org) |
| `longitude` | Ваша долгота |
| `mode` | `point` — интерполировано для ваших точных координат (по умолчанию); `nearest` — данные с ближайшей физической станции |
| `maxDistanceKM` | Радиус поиска ближайшей станции (км); используется только в режиме `nearest` |
| `pollInterval` | Как часто получать измерения (в минутах) |
| `pollInterval` | Как часто получать данные измерений (в минутах) |

Каждый опрос отправляет один запрос к конечной точке Airly `measurements/point` (или `measurements/nearest`), которая получает ваши координаты напрямую — отдельного поиска станции не требуется.

Airly ограничивает количество вызовов своего бесплатного публичного API до **100 в день** — примерно один вызов каждые 15 минут. Чтобы комфортно оставаться в пределах квоты, поддерживайте значение `pollInterval` на уровне **20 минут или дольше** (≈72 вызова в день). Оставшаяся суточная квота записывается в отладочный журнал при каждом опросе.

## Штаты
| Штат | Описание |
| ----------------------- | ---------------------------------------- |
| `pm25.value` | Концентрация PM2.5 (мкг/м³) |
| `pm10.value` | Концентрация PM10 (мкг/м³) |
| `pm10.limitPercent` | PM10 в % от нормы |
| `caqi.value` | Значение индекса CAQI |
| `caqi.level` | Уровень CAQI (например, `LOW`, `MEDIUM`) |
| `caqi.description` | Удобочитаемое описание качества воздуха |
| `info.connection` | API доступен / данные действительны |
| `info.lastUpdate` | Отметка времени последнего измерения |
| `info.lastUpdate` | Отметка времени последнего измерения |

`caqi.level` и `caqi.description` — это текстовые значения, возвращаемые непосредственно API Airly. Их язык выбирается Airly (на основе запроса/API по умолчанию, обычно английский) и **не** переводится адаптером, поэтому он может не совпадать с языком пользовательского интерфейса ioBroker.

## Установка
Откройте вкладку **Адаптеры** в административной панели ioBroker, найдите **Airly** и нажмите кнопку **+**, чтобы установить его и добавить экземпляр. Затем откройте настройки экземпляра и введите свой API-ключ Airly и координаты.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.3.7 (2026-08-07)
* (tnowak) Review feedback: removed the incomplete Sentry plugin configuration, enforced the poll-interval minimum (5 min) in code, and documented that caqi.level/description are API-provided and not translated

### 0.3.6 (2026-07-11)
* (tnowak) Read coordinates fresh on every poll and skip the request (instead of sending NaN) when they are invalid, logging the offending value; set info.connection = false on stop

### 0.3.5 (2026-07-08)
* (tnowak) Fixed the jsonConfig schema URL in .vscode/settings.json and bumped @iobroker/adapter-dev

### 0.3.4 (2026-07-08)
* (tnowak) Addressed repochecker suggestions: short-format i18n, CHANGELOG_OLD.md, .vscode settings, Dependabot automerge + higher PR limit, and @iobroker/adapter-dev

### 0.3.3 (2026-07-08)
* (tnowak) Removed chai and mocha from devDependencies (provided by @iobroker/testing) to satisfy the repository checker

Older entries are kept in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License

The MIT License (MIT)

Copyright (c) 2026 tnowak <tnowak@netventure.pl>

See [LICENSE](LICENSE) for the full text.