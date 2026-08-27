---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.omoda/README.md
title: ioBroker.omoda
hash: A9vHKEqmtsrZqWaz5ie+qeb/ZUIFhwzOWRk0TnruWsg=
---
![Логотип](../../../en/adapterref/iobroker.omoda/admin/omoda.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.omoda.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.omoda.svg)
![Количество установок](https://iobroker.live/badges/omoda-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/omoda-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.omoda.png?downloads=true)

# IoBroker.omoda
**Тесты:** ![Тестирование и выпуск](https://github.com/AlanSRU/ioBroker.omoda/workflows/Test%20and%20Release/badge.svg)

## Адаптер omoda для ioBroker
Интегрирует ваш автомобиль **Omoda / Jaecoo** в ioBroker: состояние автомобиля, местоположение по GPS, состояние батареи/зарядки, а также дистанционная **блокировка** и **климат-контроль** — используя ту же облачную платформу, что и официальный [Приложение Omoda / Jaecoo](https://www.omoda.com/).

> ⚠️ **Неофициальное программное обеспечение, полученное методом обратного проектирования.** Не связано, не одобрено и не имеет отношения к Omoda, Jaecoo или Chery. Предоставляется «как есть», используйте **на свой страх и риск и только на своем автомобиле**. Названия и товарные знаки принадлежат их соответствующим владельцам. См. > [ЛИЦЕНЗИЯ](LICENSE).

### Что это делает
- **Состояние** — двери, окна, люк, замок, двигатель, климат-контроль, давление/температура в шинах.
— **Местоположение** — Координаты GPS: широта/долгота, скорость, направление.
- **Аккумулятор и зарядка** — уровень заряда, запас хода (электрический/общий), уровень заряда, мощность зарядки,

Зарядное устройство подключено, оставшееся время зарядки.

- **Команды** — блокировка/разблокировка, включение/выключение климат-контроля с настраиваемой целевой температурой, запрос GPS

местоположение и статус "полного пробуждения и обновления".

Дополнительные функции автомобильного приложения (индивидуальный подогрев/вентиляция сидений, обогрев лобового стекла, запуск/остановка зарядки электромобиля и планирование зарядки, управление окнами/люком/багажником, противоугонная сигнализация) планируется добавить в более поздней версии.

### Требования
- Учетная запись **Omoda / Jaecoo**, связанная с транспортным средством (владелец или лицо, которому предоставлен делегированный доступ).
- Адрес электронной почты учетной записи и PIN-код команды.
- Регион: по умолчанию — **Европа** (также подтверждено, что работает в Великобритании). Могут быть и другие рынки.

Настраивается в разделе **Регион и опрос** в параметрах адаптера.

> **Совет:** рекомендуется использовать **делегированную вторую учетную запись** для адаптера. Вход в систему с одной и той же учетной записью здесь и в официальном приложении приводит к постоянному выходу из системы друг друга.

### Настраивать
1. Установите адаптер **Omoda / Jaecoo** из вкладки **Адаптеры** в административной панели ioBroker и создайте

пример.

2. На вкладке **Учетная запись** введите свой **адрес электронной почты** и **PIN-код команды** и сохраните.
3. На вкладке **Вход (OTP)** нажмите **Запросить код OTP** — одноразовый код будет отправлен вам по электронной почте.
4. Введите код и нажмите **Подтвердить OTP**. Адаптер войдет в систему и обнаружит ваш автомобиль (автомобили).

создание устройства для каждого VIN в соответствии с `omoda.0.<VIN>`.

Новый одноразовый пароль (OTP) требуется только в том случае, если сессия впоследствии истекает (обычно из-за открытия официального приложения); в противном случае сессия обновляется автоматически.

### Примечания и правила техники безопасности
- **PIN-код команды** — это ваш PIN-код учетной записи. Многократный ввод **неправильного PIN-кода** может привести к блокировке.

учетная запись**, поэтому адаптер останавливается после нескольких неудачных попыток — перепроверьте PIN-код в настройках перед повторной попыткой.

- Многие значения отображаются как «null», пока автомобиль находится в режиме ожидания; при этом обновляются данные о заряде батареи, скорости и пробеге.

**во время движения или зарядки**, или после нажатия кнопки **Обновить полный статус** (которая ненадолго активирует автомобиль).

- Пробуждение автомобиля **ограничивается скоростью** серверной части, поэтому адаптер устанавливает период ожидания.
- Для установления телеметрического соединения MQTT используется **взаимный TLS**. В качестве клиентского сертификата/ключа используются следующие данные:

Закрепленный CA поставляется вместе с адаптером в `data/certs-store.json` (зашифрованный, как это было восстановлено интеграцией HA из вышестоящего источника), поэтому адаптер работает в автономном режиме без повторного обмена данными для инициализации. Если Chery когда-либо обновит MQTT CA или клиентские сертификаты, этот файл необходимо будет сгенерировать заново и выпустить новую версию адаптера — до тех пор телеметрия не сможет подключиться.

## Благодарности
Этот адаптер — это порт превосходной работы по реверс-инжинирингу интеграции Home Assistant **[омода-джекоо-ха](https://github.com/JackRonan/omoda-jaecoo-ha)**, проделанной **Caslinovich** и **JackRonan**. Константы протокола, формулы подписи запросов, вывод учетных данных MQTT и рецепты конечных точек были восстановлены ими и используются здесь под лицензией MIT — этот проект не существовал бы без их усилий. Пожалуйста, поставьте звездочку и поддержите основной проект. Все ошибки в этом порте ioBroker — мои, а не их.

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