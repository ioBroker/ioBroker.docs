---
chapters: {"pages":{"en/adapterref/iobroker.zeptrion/README.md":{"title":{"en":"ioBroker.zeptrion"},"content":"en/adapterref/iobroker.zeptrion/README.md"},"en/adapterref/iobroker.zeptrion/README_de.md":{"title":{"en":"ioBroker.zeptrion"},"content":"en/adapterref/iobroker.zeptrion/README_de.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.zeptrion/README.md
title: ioBroker.zeptrion
hash: 9g4xSnFiYGqxY2tMDMkFWtaB+qFdJlfEvMgpO6LYw0U=
---
# ioBroker.zeptrion

![Версия NPM](https://img.shields.io/npm/v/iobroker.zeptrion.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.zeptrion.svg)
![Тесты](https://github.com/bueste/ioBroker.zeptrion/workflows/Test%20and%20Release/badge.svg)
![Лицензия](https://img.shields.io/badge/license-MIT-blue.svg)
![Пожертвовать](https://img.shields.io/badge/Donate-PayPal-blue.svg)
![Купи мне кофе](https://img.shields.io/badge/Buy%20me%20a%20coffee-FFDD00?style=flat&logo=buy-me-a-coffee&logoColor=black)

![Логотип](../../../en/adapterref/iobroker.zeptrion/admin/zeptrion.png)

Адаптер для актуаторов [Feller](https://www.feller.ch/) **[zeptrion/zApp](https://www.feller.ch/de/connected-buildings/zeptrion)** WLAN (WLAN Nebenstelle 4K = шлюз zApp, WLAN Zwischenmodul 2K = усилитель zApp) для управления освещением и рольставнями/жалюзи на основе API веб-сервиса zrap (документ Feller 10.ZEPAPI-E.1612 / версия 1.0, прошивка от 01.08.18).

_(Eine deutsche Version dieser README ist verfügbar unter [README\_de.md](/#/docs/adapterref/iobroker.zeptrion/README_de.md) .)_

## Обзор функций

- **Управление каналами** (`zrap/chctrl` ): вкл/выкл/стоп/переключение, открытие/закрытие, перемещение открытия/перемещение закрытия, увеличение/уменьшение яркости, включая варианты с таймером (`_t` в мс), а также сцены recall\_s1-4 / store\_s1-4 / delete\_s1-4 — как в виде отдельных кнопок, так и в виде свободного текста.`command` поле.
- **Состояние канала** (`zrap/chscan` в качестве периодической пересинхронизации +`zrap/chnotify` в качестве долгосрочного опроса с целью получения обновлений практически в режиме реального времени) и **описание канала** (`zrap/chdes` Чтение/запись: имя, группа, значок, тип, категория).
- **Информация об устройстве** (`zrap/id` ): версия аппаратного/программного обеспечения/загрузчика, серийный номер, имя системы, тип устройства.
- **Уровень сигнала** (`zrap/rssi` (опрос).
- **Состояние сети** (`zrap/net` (только для чтения): SSID, IP, MAC, режим, шифрование, маска, шлюз.
- **Системные команды** (`zrap/sys` ): перезагрузка, сброс к заводским настройкам, возврат в режим точки доступа.
- **Расположение** (`zrap/loc` ), **конфигурация NTP** (`zrap/ntp` ) и **дата/время** (`zrap/date` ) включая синхронизацию часов устройства с хостом ioBroker одним щелчком мыши.
- **Обнаружение mDNS** (глава 4 документации API): сканирует локальную сеть на наличие устройств Zeptrion и добавляет найденные устройства в таблицу конфигурации в отключенном состоянии (обнаружение в сочетании с ручной проверкой/активацией).
- **Массовые команды для оповещений о граде** :`control.closeAllShutters` /`openAllShutters` /`stopAllShutters` Управляйте всеми настроенными каналами на всех активных устройствах одновременно.
  - Благодаря объединению многоадресных запросов (см. ниже), запрос выполняется в виде одного запроса на устройство, а не на канал.
- **Объединение команд многоадресной рассылки** : команды канала для одного и того же устройства, поступающие с интервалом не более 50 мс, автоматически объединяются в одну команду.`zrap/chctrl` Вместо нескольких последовательных отдельных запросов используется многоадресный POST-запрос (раздел 3.6.5 документации API).
- **Оценка положения затвора** (опционально,`posEstimate` ): поскольку оборудование, согласно документации, практически всегда выдает сообщение`-1` (неизвестно) для каналов затвора время перемещения двигателя можно настроить для каждого устройства; адаптер оценивает положение на основе этого значения, исходя из направления движения и прошедшего времени (наилучший вариант, без аппаратной обратной связи, с возможностью ручной калибровки).
- **Поддержка Smartfront** (опционально)`zapi/smartfront/*` ): считывание температуры/яркости/влажности, установка цвета фона светодиода (только для устройств с подключенным выключателем Feller Smartfront, установите флажок в настройках).
- Надежная обработка ошибок: различает ошибки ECONNREFUSED/таймаут/DNS, обеспечивает резервное копирование при повторных сбоях, учитывает состояние соединения для каждого устройства и глобальное состояние соединения. Обнаружение mDNS дополнительно защищено от исключений, вызванных некорректными/несвязанными сетевыми пакетами.

Не реализовано (см. «Известные ограничения»): доступ на запись к`zrap/net` (изменение учетных данных беспроводной сети),`zrap/scheduler` Программирование веб-перехватчика Smartbutton (`zapi/smartbt/*` ).

## Установка

Административный интерфейс -> Адаптеры -> найдите "zeptrion" -> Установить.

## Конфигурация

- **HTTP-таймаут** : время ожидания каждого запроса к устройству (по умолчанию 4000 мс).
- **Кнопка «Обнаружение»** : сканирует локальную сеть через mDNS (тип службы).`_zapp._tcp` , отступать`_http._tcp` для прошивки < 01.08.xx на основе шаблона имени хоста`zapp-YYWWNNNN` Вновь обнаруженные устройства добавляются в таблицу в **отключенном** состоянии.
  - После этого просмотрите строку, присвойте ей идентификатор/имя, проверьте количество каналов (3340-4-x = 4 канала, 3340-2-x = 2 канала) и включите её. mDNS работает только в пределах одного сетевого сегмента/VLAN.
- **Таблица устройств** (может быть заполнена полностью вручную, без обнаружения):
  - `Active` ,`ID` (az 0-9 \_ -),`Name` ,`IP address/hostname` ,`Channels` (1-4),`Kind` (Shutter/Light/unknown - управляет ролями объекта ioBroker, см. ниже),`Shutter motor travel time` (секунд, 0 = отключено - включено)`posEstimate` (см. ниже, действует по умолчанию для всех каналов).`Travel time/channel` (необязательно, разделяя запятыми, например)`22,28` - переопределяет время перемещения по умолчанию для каждого канала отдельно; полезно для устройств с разрешением 2K, где два канала имеют разное время перемещения двигателя; пустые значения возвращаются к времени перемещения по умолчанию.`Smartfront` (флажок, активируется только при подключении выключателя Feller Smartfront),`Poll (s)` (по умолчанию 30, для RSSI + периодическая синхронизация chscan; фактическое обновление каналов происходит независимо через длительный опрос chnotify).

## Дерево объектов для каждого устройства (`zeptrion.0.<id>` )

```
<id>.info.connection / lastError / hw / sw / boot / sn / sys / type / oen / rssi / refresh
<id>.network.ssid / ip / mac / mode / enc / mask / gw / bssid        (read-only)
<id>.system.reboot / unlock / factoryDefault / networkDefault      (buttons; factoryDefault requires unlock within 30s)
<id>.location.name                                                  (read/write)
<id>.ntp.url / per                                                   (read/write)
<id>.date.rfc1123 / tz / dst / syncNow                               (read/write + button)

<id>.channels.chN.val                                    channel state 0-100 / -1 (raw hardware value)
<id>.channels.chN.posEstimate                             only for kind=Shutter: software position estimate
                                                           0=closed/100=open, also manually writable (calibration)
<id>.channels.chN.name / group / icon / type / cat        channel description (read/write)
<id>.channels.chN.command                                 free-text command (string)
<id>.channels.chN.stop / on / off / toggle / open / close /
                  move_open / move_close / dim_up / dim_down        (buttons)
<id>.channels.chN.recall_s1..4 / store_s1..4 / delete_s1..4          (buttons)

<id>.smartfront.temp / lux / hum       only if "Smartfront" is enabled (read)
<id>.smartfront.ledState               current LED status as JSON (read)
<id>.smartfront.ledSet                 set LED(s), JSON array (write)
```

Глобальный:

```
info.connection                at least one device reachable
control.closeAllShutters       button: ALL configured channels -> "close"
control.openAllShutters        button: ALL configured channels -> "open"
control.stopAllShutters        button: ALL configured channels -> "stop"
```

## Роли объектов и «вид»

Сам API zrap не различает световой и затворный каналы — это чисто вопрос проводки/привода. Чтобы визуализации (VIS, возможно, будущая интеграция ioBroker.iot/Alexa) могли осмысленно классифицировать каналы, «тип» можно задать для каждого устройства отдельно:

| Добрый                    | `<ch>.val` роль | `stop` /`open` /`close` роль                             |
| ------------------------- | --------------- | -------------------------------------------------------- |
| Жалюзи/ставни             | `level.blind`   | `button.stop` /`button.open.blind` /`button.close.blind` |
| Свет                      | `level.dimmer`  | общий`button`                                            |
| неизвестно (по умолчанию) | `value`         | общий`button`                                            |

Важный:`level.blind` Согласно документации Feller, система **не** подделывает подлинную информацию о местоположении.`chscan` /`chnotify` для канала затвора почти всегда возвращается`-1` (неизвестно), поскольку само оборудование не сообщает о положении слепых зон. Эта функция лишь улучшает распознавание виджетами VIS; числовое значение, как правило, остается неинформативным.

## Использование оповещений о граде

```javascript
// JavaScript adapter example
on({id: 'weather.0.warnings.hail', val: true}, function () {
    setState('zeptrion.0.control.closeAllShutters', true);
});
```

Сбои на отдельных устройствах (отключение от сети и т. д.) не прерывают работу остальных каналов — каждый неисправный канал регистрируется индивидуально и записывается в журнал.`<id>.info.lastError` .

## Известные ограничения / обдуманные решения

- **Программирование веб-перехватчика Smartbutton** (`zapi/smartbt/prgm` /`prgn` /`prgs` ) не реализовано: в этом случае переключатель будет напрямую вызывать URL-адрес в ioBroker при нажатии кнопки (настоящая push-запрос, без какого-либо опроса). Для этого потребуется входящий HTTP-сервер в адаптере, которого в настоящее время нет — это более масштабное архитектурное расширение, а не небольшое дополнение. Задокументировано как возможное улучшение в будущем.
- **доступ на запись к`zrap/net`** Эта функция не реализована — изменение учетных данных беспроводной сети исполнительного механизма с помощью скрипта рискованно (потеря соединения, требуется перезагрузка). Может быть добавлена при необходимости.
- **Планировщик (`zrap/scheduler` )** и **сервисы zeptrionAir Smartfront** (`zapi/smartfront/*` ,`zapi/smartbt/*` ) не реализованы, поскольку они не имеют отношения к сценарию использования жалюзи/защиты от града. Существующие`zrapGet` /`zrapPost` структура в`main.js` легко расширяем.
- Согласно документации,`chctrl` Возвращает HTTP 302 без тела запроса — перенаправления намеренно не отслеживаются.`maxRedirects: 0` ) чтобы избежать ненужных дополнительных запросов.
- При повторных сбоях устройства интервал опроса увеличивается до максимума в 5 раз (простая отсрочка).

## Разработка / Тестирование

```bash
npm install
npm run lint
npm test              # package consistency + unit tests
npm run test:integration   # starts a real js-controller (takes longer)
```

## Changelog

### 1.0.13 (2026-08-11)

- Fix E5606 (untranslated i18n entries): testDeviceOk was never actually translated for de/es/it/nl/pl/pt (silently kept the English copy). Also fixed the identical issue in fr, missed by the checker's exact-match heuristic due to a spacing difference. Verified with a full sweep of all 11 i18n files against the English source - no other matches found.

### 1.0.12 (2026-08-10)

- Fix a real i18n gap found during independent end-to-end testing of v1.0.11: embedded field-validation messages in the CSV import report stayed English even in the localized report. validateDeviceRow() now returns structured {key, args} entries with two explicit renderers: always-English for logs, I18n.translate() for the UI. Added 13 new i18n keys across all 11 languages. Also added the missing README_de.md to package.json's "files" allowlist - npm auto-includes README.md in every package but NOT README_de.md, so it was silently absent from the published tarball. Verified end-to-end: loaded the real I18n module directly, confirmed log output stays English regardless of active UI language across EN/DE/FR/ZH, and downloaded + extracted the real published npm tarball to confirm packaging.

### 1.0.11 (2026-08-10)

- Fix: v1.0.10 translated all onMessage() UI text to plain English only. Implemented full multi-language support instead, using the official @iobroker/adapter-core I18n module (reads system.config.common.language automatically, falls back to English for unsupported languages). Added a new i18n/ directory with all 11 required languages. ioBroker log entries remain English-only; only the admin-dialog result text is now localized. Also fixed a packaging bug: the new i18n/ folder was missing from package.json's "files" allowlist, which would have excluded it from the published npm package - caught via an actual npm pack + tarball-extraction test before pushing. Verified round-trip in German, English, and French.

### 1.0.10 (2026-08-10)

- Fix all remaining findings from the follow-up review: translated 18 German error messages in validateDeviceRow(), the 5 error-code-to-message translations in handleDeviceError(), 9 German strings in thrown Error objects, and the bonjour-service install-hint rejection message. Per explicit maintainer direction, all UI-facing result text in onMessage (CSV import report, device test results, discovery summary) is now English as well, superseding the earlier decision to keep it German for the target audience. No migration needed - none of these fixes touch persisted object common properties.

### 1.0.9 (2026-08-08)
- Fix: the common.name i18n conversion from 1.0.8 only applied to newly created objects (setObjectNotExistsAsync/ensureState never update existing ones) - any installation upgrading from <=1.0.7 kept the old plain-German name strings forever. migrateObjectRoles() now also force-corrects these on every startup via a value-based lookup table generated from the same translations already used in the object-creation code, plus dedicated regex rules for the two dynamic cases (scene button names, tilt pulse duration). Also fixes two translation gaps that were missed in 1.0.8 (network info fields and the shutter position estimate/move descriptions) which the extraction script used to build the migration table happened to catch. Verified against a live object dump (409 objects, 4 devices): corrects exactly the 385 affected objects, 0 false positives on user-configured device/room names.

### 1.0.8 (2026-08-08)
- Fix all findings from the manual maintainer review (PR #6327): removed the manual npm installation section from README.md/README_de.md (E6012, prohibited regardless of stated intent); added a verified link to the Feller product page; translated all 40+ German log messages to English (UI-facing result text for CSV import/discovery, shown in the admin config dialog, is intentionally kept German and decoupled from the log call); converted all 50 German common.name strings (incl. the CH_BUTTONS constant and dynamic channel/scene names) to full 11-language i18n objects; completed io-package.json instanceObjects translations for 'info' and 'control' (info.connection already had all 11 languages).

### 1.0.7 (2026-07-22)
- Enable global i18n support (jsonConfig i18n: true) with translation files under admin/i18n/ for all 11 supported languages, resolving the checker's i18n warnings the correct way (validatorErrorText stays a plain string per schema; ioBroker resolves the translation via the files, falling back to the English text if no entry is found). Added @iobroker/adapter-dev and @alcalzone/release-script as devDependencies with translate/release npm scripts. (Migrating to @iobroker/eslint-config was evaluated but reverted: its eslint-plugin-import dependency does not yet support eslint 10.x, which broke npm install.)

### 1.0.6 and older

Older changelog entries can be found in [CHANGELOG_OLD.md](https://github.com/bueste/ioBroker.zeptrion/blob/main/CHANGELOG_OLD.md).

## License

MIT License

Copyright (c) 2026 Stefan Bühler

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.