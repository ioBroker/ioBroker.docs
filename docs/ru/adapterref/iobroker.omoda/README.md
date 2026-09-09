---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.omoda/README.md
title: ioBroker.omoda
hash: IhDF1K4N07n4m8GL7DNfVUfHAUMZ2yeSnw1ZrICgKdM=
---
![Версия NPM](https://img.shields.io/npm/v/iobroker.omoda.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.omoda.svg)
![Количество установок](https://iobroker.live/badges/omoda-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/omoda-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.omoda.png?downloads=true)

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="admin/omoda-lockup-dark.png">
  <img src="admin/omoda-lockup.png" alt="OMODA | JAECOO" width="300">
</picture>
# ioBroker.omoda

**Тесты:** ![Тестирование и выпуск](https://github.com/AlanSRU/ioBroker.omoda/workflows/Test%20and%20Release/badge.svg)

## Адаптер Omoda для ioBroker

Приносит ваш **Омода / Джеку** Подключение автомобиля к ioBroker: состояние транспортного средства, местоположение по GPS, состояние батареи/зарядки и пульт дистанционного управления. **замок** и **климат** — используя ту же облачную серверную часть, что и официальная. [Приложение Omoda / Jaecoo](https://www.omoda.com/).

> ⚠️ **Неофициальное программное обеспечение, полученное методом обратного проектирования.** Не имеет отношения к компаниям Omoda, Jaecoo или Chery, не получает от них поддержки и не связана с ними. Предоставляется «как есть». **на свой страх и риск и только на собственном транспортном средстве.**&#x41D;азвания и товарные знаки принадлежат их соответствующим владельцам. См.
> [ЛИЦЕНЗИЯ](LICENSE).

### Что это делает

- **Статус** — двери, окна, люк, замок, двигатель, климат-контроль, давление/температура в шинах.
- **Расположение** — Координаты GPS: широта/долгота, скорость, направление.
- **Аккумулятор и зарядка** — уровень заряда, запас хода (электрический/общий), состояние заряда, мощность зарядки, подключен зарядный кабель, оставшееся время зарядки.
- **Команды** — блокировка/разблокировка, включение/выключение климат-контроля с настраиваемой целевой температурой, запрос местоположения по GPS и «пробуждение и обновление полного статуса».

Дополнительные функции автомобильного приложения (индивидуальный подогрев/вентиляция сидений, обогрев лобового стекла, запуск/остановка зарядки электромобиля и планирование зарядки, управление окнами/люком/багажником, противоугонная сигнализация) планируется добавить в более поздней версии.

### Требования

- Ан **Аккаунт Omoda / Jaecoo** с соответствующим транспортным средством (владелец или уполномоченный представитель).
- Счет **электронная почта** и **командный PIN-код**.
- Регион: по умолчанию — **Европа** (Также подтверждено, что работает в Великобритании). Другие рынки можно настроить в разделе **Регион и опросы общественного мнения** в настройках адаптера.

> **Кончик:** рассмотрите возможность использования **делегированный второй счет** Что касается адаптера. При входе в систему с одной и той же учетной записью здесь и в официальном приложении происходит постоянный выход из системы.

### Настраивать

1. Установите **Омода / Джеку** адаптер из административной панели ioBroker **Адаптеры** Перейдите в вкладку и создайте экземпляр.
2. На **Счет** вкладка, введите свой **электронная почта** и **командный PIN-код** и сохранить.
3. На **Вход (OTP)** вкладка, нажмите **Запросить код OTP** — Вам будет выслан одноразовый код по электронной почте.
4. Введите код и нажмите **Подтвердите OTP**Адаптер подключается и обнаруживает ваш автомобиль (или автомобили), создавая устройство для каждого VIN-номера. `omoda.0.<VIN>`.

Новый одноразовый пароль (OTP) требуется только в том случае, если сессия впоследствии истекает (обычно из-за открытия официального приложения); в противном случае сессия обновляется автоматически.

### Примечания и правила техники безопасности

- Он **командный PIN-код** Это ваш PIN-код учетной записи. Ввод... **Повторные ошибки при вводе PIN-кода могут привести к блокировке аккаунта.**&#x41F;оэтому адаптер перестает работать после нескольких неудачных попыток — проверьте PIN-код в настройках перед повторной попыткой.
- Многие ценности прочитаны `null` Пока автомобиль находится в режиме ожидания, обновляются данные о заряде батареи, скорости и пробеге.
  **вождение или зарядка**или после нажатия **Обновить полный статус** (что на короткое время приводит машину в движение).
- Разбудить машину — это **ограниченная скорость** на стороне бэкэнда, поэтому адаптер обеспечивает задержку.
- Соединение телеметрии MQTT использует **взаимный TLS**Сертификат/ключ клиента и закреплённый центр сертификации поставляются вместе с адаптером. `data/certs-store.json` (зашифровано, как это было восстановлено интеграцией HA из вышестоящего источника), поэтому адаптер работает в автономном режиме без повторной инициализации. Если Chery когда-либо обновит сертификаты центра сертификации MQTT или клиентские сертификаты, этот файл необходимо будет сгенерировать заново и выпустить новую версию адаптера — до тех пор телеметрия не сможет подключиться.

## Кредиты

Этот адаптер является результатом превосходной работы по обратной разработке интеграции с Home Assistant. **[омода-джекоо-ха](https://github.com/JackRonan/omoda-jaecoo-ha)** к
**Каслинович** и **Джек Ронан**Константы протокола, формулы подписи запросов, вывод учетных данных MQTT и рецепты конечных точек были получены ими и используются здесь в соответствии с лицензией MIT — этот проект не существовал бы без их усилий. Пожалуйста, поставьте звездочку и поддержите основной проект. Все ошибки в этом порте ioBroker — мои, а не их.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.2.0 (2026-08-10)
* (Alan Paris) **BREAKING:** `commands.lock` now follows the ioBroker `switch.lock` spec — **true UNLOCKS** the car, false locks it. Any script writing `true` to lock must be inverted. This is the polarity Alexa/Google (via ioBroker.iot), VIS lock widgets and type-detector already assume, so the old behaviour unlocked the car when the user asked to lock it
* (Alan Paris) Fixed telemetry fields the car reports as `null` being stored as real values: `doors.locked` no longer reads "locked" when nothing was reported, and GPS no longer jumps to latitude/longitude 0
* (Alan Paris) `info.connection` now returns to false when the session expires (e.g. the official app logs in on the same account) instead of staying true while every poll silently failed
* (Alan Paris) Corrected the "Dept ID" help text in all 11 languages — the default is 44 (UK), not 39
* (Alan Paris) The OTP code is now encrypted at rest, not only marked protected
* (Alan Paris) `location.heading` uses a plain `value` role (`value.direction` is an up/down/opening enum, not a compass bearing)
* (Alan Paris) Car MQTT reconnects back off from 10 s to 2 min and stop repeating the same warning, instead of retrying every 10 s forever when the broker keeps rejecting us
* (Alan Paris) The captcha solver yields to the event loop, so it can no longer stall other adapters sharing a compact host process
* (Alan Paris) Removed unused constants, token-store helpers and the placeholder test file
* (Alan Paris) Default "Dept ID" is now 44 (UK) instead of 39 (IT) — existing instances keep the value they already have (upstream 37f8f2b)
* (Alan Paris) Fixed a stale "charge remaining time": the field vanishes from the payload when charging ends, so the state now clears instead of showing the last value for hours (upstream a0f61ed)
* (Alan Paris) Command confirmations no longer cry "check failed" when the car reports only the climate module — the backend includes it on nearly every successful OFF command (upstream 2cc7d56)
* (Alan Paris) Backend rejections caused by vehicle permissions or a malformed request (A00374/A00554/A00567/A00604/A00643/A00757) no longer count towards the wrong-PIN anti-lockout (upstream 8aa4176)
* (Alan Paris) Correct state roles for info.model and info.brand; account email marked as protected
* (Alan Paris) The charging/driving fast-follow poll now self-schedules, so a slow probe can no longer overlap the next one

### 0.1.1 (2026-07-18)
* (Alan Paris) Security: never log the VIN or MQTT user id in cleartext (masked to a short suffix)
* (Alan Paris) Fixed a leak of the car MQTT client and polling timers when re-logging in after a session drop
* (Alan Paris) Added credit to the upstream Home Assistant integration (JackRonan/omoda-jaecoo-ha) in the README and LICENSE
* (Alan Paris) Added full admin UI translations for all 11 languages
* (Alan Paris) Config: clearer "Dept ID" help — it must match your account country's dialing code (UK=44, IT=39, …)
* (Alan Paris) Require Node.js >= 22 and admin >= 7.6.17; enabled automated npm publishing via trusted publishing (OIDC)
* (Alan Paris) Marked the OTP code as protected; various adapter-checker compliance fixes

### 0.1.0 (2026-07-18)
* (Alan Paris) initial release

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2026 Alan Paris <alan.paris@scottish.rugby>

Portions Copyright (c) 2026 Caslinovich and the omoda-jaecoo-ha contributors (JackRonan),
ported from https://github.com/JackRonan/omoda-jaecoo-ha (MIT) and retained under its terms.

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