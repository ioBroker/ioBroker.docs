---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.alpha2/README.md
title: ioBroker.alpha2
hash: /6vetXymLtvFQbJ39PxNSgcMHo2tB2PEPZwtWaBsPlI=
---
![Логотип](../../../en/adapterref/iobroker.alpha2/admin/mh-logo.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.alpha2.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.alpha2.svg)
![Количество установок](https://iobroker.live/badges/alpha2-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/alpha2-stable.svg)
![Тестирование и выпуск](https://github.com/Eisbaeeer/ioBroker.alpha2/actions/workflows/test-and-release.yml/badge.svg)

# ioBroker.alpha2

Локальное управление системой управления подогревом пола **[Möhlenhoff](https://www.moehlenhoff.de) Alpha 2** (базовая станция EZR) в ioBroker. Адаптер взаимодействует с XML API базовой станции в вашей сети. Облачная учетная запись не требуется.

Версия 2 — это переписанная версия. **Это полноценное обновление для версии 1.x** : имя адаптера, все идентификаторы состояний и их типы остаются прежними, поэтому псевдонимы, скрипты, визуализации и история (InfluxDB, SQL, History) продолжают работать.

## Что нового в версии 2.0?

- Обрабатывайте **только один запрос за раз.** Веб-сервер базовой станции может обрабатывать только одно соединение; параллельные запросы прерываются. `Error: aborted` Теперь адаптер ставит каждый запрос в очередь, как это делает веб-интерфейс базовой станции, с таймаутом для каждого запроса и более длительной паузой, пока базовая станция не отвечает.
- **Опросы проводятся в упрощенном формате.** Актуальные данные поступают от небольших групп людей. `cyclic.xml` (по умолчанию каждые 10 секунд). Полный текст `static.xml` В версии 1.x чтение данных об исполнительных механизмах и настройках происходит каждые 30 секунд и после каждого изменения. В версии 1.x полный файл считывается каждые 10 секунд.
- ** `info.connection` ** Показывает, отвечает ли базовая станция; одно предупреждение в журнале, когда она перестает отвечать, одно информационное сообщение, когда она снова начинает отвечать.
- **Дополнительные параметры:** режим вечеринки и присутствия, диапазон заданных значений, заданное значение программы, смещение, состояние зоны обогрева. `HEATING` на единицу тепловой площади (привод в этой области открыт), `LOWBAT` и `UNREACH` на каждый комнатный блок, версии прошивки, счетчик ошибок, реле, охлаждение, вход ECO, защита от замерзания, состояние подключения к облаку.
- **Запись с проверкой:** записываются только указанные ниже параметры. Значения проверяются (диапазон, четверть часа, даты) перед отправкой, температура ограничена диапазоном зоны обогрева. Отклоненное значение регистрируется, и в состоянии снова отображается значение базовой станции. При быстрой последовательности значений (например, с помощью ползунка) отправляется только последнее значение.
- **В ioBroker нет ничего секретного:** учетные данные облака, сетевые настройки, код эксперта и коды замков номеров никогда не считываются в состояние системы.
- Температура, при которой можно писать, повышается. `min` /`max` их тепловой зоны, поэтому ползунки в визуализациях имеют правильный диапазон.
- Кроме этого, никаких зависимостей нет. `@iobroker/adapter-core` Страница настроек представлена в формате JSON-конфигурации на всех 11 языках ioBroker.

## Требования

- Базовая станция Alpha 2 с сетевым подключением, доступная через ioBroker (для доступа к XML API не требуется авторизация).
- Node.js 22 или более поздняя версия
- js-controller 6.0.11 или новее, Admin 7.6.20 или новее

## Установка

Установите адаптер в административной панели в разделе « _Адаптеры»_ . Адаптер обнаружения (`iobroker.discovery` Версия 5.4.1 (или более поздняя) обнаруживает базовые станции Alpha 2 в сети и предлагает этот адаптер. В противном случае создайте экземпляр и введите IP-адрес базовой станции в ее настройках.

## Настройки

| Параметр                                        | По умолчанию | Значение                                                                    |
| ----------------------------------------------- | ------------ | --------------------------------------------------------------------------- |
| IP-адрес базовой станции                        | –            | например `192.168.1.100`, опционально с `:port`                              |
| Значения в реальном времени каждые (мс)         | 10000        | температуры, заданные значения, насос (`cyclic.xml`), по крайней мере 2000 |
| Исполнительные механизмы и настройки каждые (с) | 30           | полные данные (`static.xml`), дополнительно после каждой смены             |
| Время ожидания на один запрос (мс)              | 5000         | Запрос, на который не был дан ответ, отменяется по истечении этого времени. |
| Установить часы автоматически                   | выключенный  | см. ниже                                                                    |

Если вы используете более одной базовой станции, добавьте по одному экземпляру на каждую базовую станцию.

### Только одна программа одновременно.

Базовая станция отвечает только на один запрос за раз. Другие скрипты, адаптеры или инструменты, которые одновременно обращаются к ней, могут привести к сбою запросов. `aborted`) с обеих сторон. Пусть этот адаптер будет единственным, который опрашивает базовую станцию и использует её состояния в скриптах. Отдельный скрипт для установки часов базовой станции больше не нужен (см. ниже). Периодическое открытие веб-интерфейса базовой станции вполне допустимо: один неудачный запрос регистрируется только на уровне отладки и повторяется при следующем опросе; предупреждение и `info.connection` =`false` последующие действия предпринимаются только после трех неудач подряд.

### Часы базовой станции

Базовая станция устанавливает время переключения по собственным часам. Синхронизация по NTP часто отключается, и тогда часы начинают сбиваться. При _использовании функции автоматической установки времени_ адаптер сравнивает часы базовой станции с ioBroker раз в час и устанавливает их на время ioBroker, если разница превышает 30 секунд. Ничего не устанавливается, пока базовая станция синхронизируется по NTP самостоятельно. `DEVICE.NTPSYNC`) и в часы, предшествующие и следующие за переходом от летнего к зимнему времени. ioBroker и базовая станция должны использовать один и тот же часовой пояс. `DEVICE.DATETIME` Отображает часы базовой станции.

## Штаты

`HEATAREA.<n>` (площадь обогрева / помещение), `HEATCTRL.<n>` (выходной сигнал исполнительного механизма), `IODEVICE.<n>` (комнатный блок / датчик), `PROGRAM.<program>.<period>`, `VACATION`, `DEVICE` (базовая станция) и `info.connection`.

### Записываемый

| Состояние                                      | Ценности                                                                 |
| ---------------------------------------------- | ------------------------------------------------------------------------ |
| `HEATAREA.<n>.T_TARGET`                        | заданное значение в °C, округлено до 0,1, ограничено `T_TARGET_MIN…MAX`   |
| `HEATAREA.<n>.T_HEAT_DAY` /`T_HEAT_NIGHT`      | дневная/ночная температура для отопления в °C                            |
| `HEATAREA.<n>.T_COOL_DAY` /`T_COOL_NIGHT`      | дневная/ночная температура для охлаждения в °C                           |
| `HEATAREA.<n>.HEATAREA_MODE`                   | `0` Авто, `1` День, `2` Ночь                                               |
| `HEATAREA.<n>.PROGRAM_WEEK` /`PROGRAM_WEEKEND` | программа `0` …`3`                                                        |
| `HEATAREA.<n>.PARTY` /`PRESENCE`               | `true` / `false`                                                         |
| `HEATAREA.<n>.ISLOCKED`                        | `0` разблокировано, `1` заблокировано (детская блокировка блока в номере) |
| `PROGRAM.<p>.<period>.START` /`END`            | `hh:mm` за четверть часа, `END` также `24:00`                              |
| `VACATION.START_DATE` / `END_DATE`             | `YYYY-MM-DD`                                                             |
| `VACATION.STATE`                               | `false` завершает отпуск                                                 |
| `DEVICE.T_HEAT_VACATION`                       | температура во время отпуска в °C                                        |
| `DEVICE.LOCK_MODE`                             | `0` /`1` (режим отеля)                                                   |

Целевая температура устанавливается с помощью `T_TARGET` Действует до следующего переключения программы.

Чтобы спланировать отпуск, сначала нужно установить... `DEVICE.T_HEAT_VACATION`, затем `VACATION.START_DATE` и `VACATION.END_DATE`. `VACATION.STATE` показывает, активен ли отпуск.

Данный адаптер не может передавать системные команды базовой станции (сброс к заводским настройкам, сетевые или облачные настройки, удаление данных).

### Форматы значений

Для обеспечения совместимости с версией 1.x некоторые значения остаются текстовыми: `HEATAREA_MODE`, `PROGRAM_WEEK`, `PROGRAM_WEEKEND`, `ISLOCKED`, `HEATAREA_NR` и все `IODEVICE` значения, за исключением `LOWBAT` /`UNREACH` (например `BATTERY` =`"0"` красный, `"1"` желтый, `"2"` зеленый). Новые значения используют числа и логические значения.

## Обновление с версии 1.x

Установите новую версию поверх старой; экземпляр и его настройки останутся. Объекты расширяются, а не заменяются, поэтому пользовательские настройки, такие как ведение истории, остаются неизменными. Состояния версии 1.x, которые базовая станция не предоставляет (например, неиспользуемые слоты программ), остаются без изменений.

## Разработка

| Командование                          | Что это делает                                                                                                    |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `npm test`                            | модульные тесты и пакетные тесты                                                                                  |
| `npm run test:integration`            | Запускает адаптер в тестовом ioBroker, взаимодействуя с имитированной базовой станцией.                           |
| `npm run check`                       | Проверка типов исходного кода JavaScript с использованием их типов JSDoc (`tsconfig.json`)                       |
| `npm run lint`                        | ESLint и Prettier                                                                                                 |
| `npm run translate`                   | переводит новые тексты `io-package.json` и `admin/i18n/en.json` на все языки                                        |
| `node tools/read-device.js <address>` | Считывает данные с базовой станции один раз и выводит состояния, которые создал бы адаптер; ничего не отправляет. |
| `npm run release`                     | Новая версия с журналом изменений и тегом; публикация в npm через GitHub Actions (доверенная публикация).         |

Для интеграционных тестов необходим путь без пробелов. В тестах используется вымышленная базовая станция. `test/fixtures`), нет данных о реальной установке.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- (djlex83) Settings page translated into all 11 ioBroker languages
- (djlex83) Requires admin 7.6.20 or newer
- (djlex83) Findings of the repository checker fixed (#80)
- (djlex83) Link to the manufacturer added to the README; a connection that breaks off during an answer is detected without the deprecated `aborted` event; contact address instead of the GitHub noreply address (#82)
- (djlex83) Type check of the sources (`npm run check`, also in CI), `@iobroker/adapter-dev` for translations (`npm run translate`), manual review step in the release script (#83)
- (djlex83) README: badges, requirements, installation with discovery (`iobroker.discovery` 5.4.1 or newer), note on other programs polling the base station, development

### 2.1.0 (2026-11-18)

- (djlex83) Optional: sets the clock of the base station when it is more than 30 s wrong (checked every hour)
- (djlex83) Requires Node.js 22 or newer
- (djlex83) Tested on Node.js 22, 24 and 26; release workflow with npm trusted publishing
- (djlex83) Roles of text, date and time states corrected (`text`, `date`); old 1.x changelog moved to `CHANGELOG_OLD.md`

### 2.0.0 (2026-11-17)

- (djlex83) Rewrite: one request at a time with timeout and back-off, `info.connection`
- (djlex83) Polls the small `cyclic.xml` for live values, `static.xml` only every 30 s and after changes
- (djlex83) New values: party, presence, set point range, program set point, offset, `HEATING`, `LOWBAT`, `UNREACH`,
  firmware, error counter, relay, cooling, ECO input, frost protection, cloud state
- (djlex83) Checked writing with whitelist, ranges and quarter hours; only the last value of a quick series is sent
- (djlex83) Cloud credentials, network settings and codes are no longer read
- (djlex83) Objects are extended instead of replaced (keeps history settings); state IDs and types unchanged
- (djlex83) JSON config, current adapter-core, tests with a simulated base station, no `request`/`xml2js`

### 1.0.4

- (bigluke26) Added PUMP status issue #26

### 1.0.3

- (Eisbaeeer) Fixed error messages in log

### 1.0.2

- (oHa510) Fixed an issue if you don't use all 4/8/12 heat areas, then heat areas could get assigned to the wrong
  heat area object in ioBroker
- (oHa510) Expanded heat areas and heat controls to the maximum of 12
- (oHa510) Changed heat area and heat control indexing to 1–12 (old 0–11 was very confusing)
- (oHa510) Added support for locking controllers (kids mode)
- (oHa510) Added support for locking set temperature (hotel mode)
- (oHa510) Added some new objects and infos like IODEVICEs etc.

### 1.0.1

- (Eisbaeeer) Fixed issues

### 1.0.0 (2019-06-24)

- (Eisbaeeer) Fixed issue #6 (HEATAREA_NAME)

## License

The MIT License (MIT)

Copyright (c) 2026 djlex83 <dj-lex@gmx.de>  
Copyright (c) 2018-2021 Eisbaeeer <eisbaeeer@gmail.com>

See [LICENSE](https://github.com/Eisbaeeer/ioBroker.alpha2/blob/master/LICENSE). Möhlenhoff and Alpha 2 are trademarks of their owners; this project is not
affiliated with Möhlenhoff GmbH.